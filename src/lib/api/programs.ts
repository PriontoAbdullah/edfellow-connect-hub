import { supabase } from '../supabase';
import { Database } from '../../types/database';

// Type definitions
export type Program = Database['public']['Tables']['programs']['Row'];
export type ProgramInsert = Database['public']['Tables']['programs']['Insert'];
export type ProgramUpdate = Database['public']['Tables']['programs']['Update'];

export interface ProgramWithUniversity extends Program {
  university: {
    name: string;
    country: string;
    logo_url?: string;
  };
}

export interface ProgramFilters {
  university_id?: string;
  degree_level?: string;
  field_of_study?: string;
  country?: string;
  duration?: string;
  cost_min?: number;
  cost_max?: number;
  is_featured?: boolean;
  tags?: string[];
}

export interface ProgramSearchParams {
  query?: string;
  filters?: ProgramFilters;
  limit?: number;
  offset?: number;
  sort_by?: 'created_at' | 'name' | 'rating' | 'applications_count';
  sort_order?: 'asc' | 'desc';
}

// =============================================
// PROGRAMS API FUNCTIONS
// =============================================

/**
 * Get all programs with optional filtering and pagination
 */
export const getPrograms = async (
  params: ProgramSearchParams = {}
): Promise<{
  data: ProgramWithUniversity[] | null;
  error: string | null;
  total?: number;
}> => {
  try {
    const {
      query,
      filters = {},
      limit = 20,
      offset = 0,
      sort_by = 'created_at',
      sort_order = 'desc',
    } = params;

    let supabaseQuery = supabase.from('programs').select(
      `
        *,
        university:universities!inner(
          name,
          country,
          logo_url
        )
      `,
      { count: 'exact' }
    );

    // Apply text search
    if (query) {
      supabaseQuery = supabaseQuery.or(
        `name.ilike.%${query}%,description.ilike.%${query}%,field_of_study.ilike.%${query}%`
      );
    }

    // Apply filters
    if (filters.university_id) {
      supabaseQuery = supabaseQuery.eq('university_id', filters.university_id);
    }
    if (filters.degree_level) {
      supabaseQuery = supabaseQuery.eq('degree_level', filters.degree_level);
    }
    if (filters.field_of_study) {
      supabaseQuery = supabaseQuery.eq(
        'field_of_study',
        filters.field_of_study
      );
    }
    if (filters.country) {
      supabaseQuery = supabaseQuery.eq('country', filters.country);
    }
    if (filters.duration) {
      supabaseQuery = supabaseQuery.eq('duration', filters.duration);
    }
    if (filters.cost_min !== undefined) {
      supabaseQuery = supabaseQuery.gte('cost', filters.cost_min);
    }
    if (filters.cost_max !== undefined) {
      supabaseQuery = supabaseQuery.lte('cost', filters.cost_max);
    }
    if (filters.is_featured !== undefined) {
      supabaseQuery = supabaseQuery.eq('is_featured', filters.is_featured);
    }
    if (filters.tags && filters.tags.length > 0) {
      supabaseQuery = supabaseQuery.overlaps('tags', filters.tags);
    }

    // Apply sorting
    supabaseQuery = supabaseQuery.order(sort_by, {
      ascending: sort_order === 'asc',
    });

    // Apply pagination
    supabaseQuery = supabaseQuery.range(offset, offset + limit - 1);

    const { data, error, count } = await supabaseQuery;

    if (error) {
      console.error('Error fetching programs:', error);
      return { data: null, error: error.message };
    }

    return {
      data: data as ProgramWithUniversity[],
      error: null,
      total: count || 0,
    };
  } catch (error) {
    console.error('Unexpected error fetching programs:', error);
    return { data: null, error: 'An unexpected error occurred' };
  }
};

/**
 * Get a single program by ID
 */
export const getProgram = async (
  programId: string
): Promise<{
  data: ProgramWithUniversity | null;
  error: string | null;
}> => {
  try {
    const { data, error } = await supabase
      .from('programs')
      .select(
        `
        *,
        university:universities!inner(
          name,
          country,
          logo_url
        )
      `
      )
      .eq('id', programId)
      .single();

    if (error) {
      console.error('Error fetching program:', error);
      return { data: null, error: error.message };
    }

    return { data: data as ProgramWithUniversity, error: null };
  } catch (error) {
    console.error('Unexpected error fetching program:', error);
    return { data: null, error: 'An unexpected error occurred' };
  }
};

/**
 * Get featured programs
 */
export const getFeaturedPrograms = async (
  limit: number = 6
): Promise<{
  data: ProgramWithUniversity[] | null;
  error: string | null;
}> => {
  try {
    const { data, error } = await supabase
      .from('programs')
      .select(
        `
        *,
        university:universities!inner(
          name,
          country,
          logo_url
        )
      `
      )
      .eq('is_featured', true)
      .order('rating', { ascending: false })
      .limit(limit);

    if (error) {
      console.error('Error fetching featured programs:', error);
      return { data: null, error: error.message };
    }

    return { data: data as ProgramWithUniversity[], error: null };
  } catch (error) {
    console.error('Unexpected error fetching featured programs:', error);
    return { data: null, error: 'An unexpected error occurred' };
  }
};

/**
 * Create a new program (university users only)
 */
export const createProgram = async (
  programData: ProgramInsert
): Promise<{
  data: Program | null;
  error: string | null;
}> => {
  try {
    const { data, error } = await supabase
      .from('programs')
      .insert(programData)
      .select()
      .single();

    if (error) {
      console.error('Error creating program:', error);
      return { data: null, error: error.message };
    }

    return { data, error: null };
  } catch (error) {
    console.error('Unexpected error creating program:', error);
    return { data: null, error: 'An unexpected error occurred' };
  }
};

/**
 * Update a program (university users only)
 */
export const updateProgram = async (
  programId: string,
  updates: ProgramUpdate
): Promise<{
  data: Program | null;
  error: string | null;
}> => {
  try {
    const { data, error } = await supabase
      .from('programs')
      .update(updates)
      .eq('id', programId)
      .select()
      .single();

    if (error) {
      console.error('Error updating program:', error);
      return { data: null, error: error.message };
    }

    return { data, error: null };
  } catch (error) {
    console.error('Unexpected error updating program:', error);
    return { data: null, error: 'An unexpected error occurred' };
  }
};

/**
 * Delete a program (university users only)
 */
export const deleteProgram = async (
  programId: string
): Promise<{
  error: string | null;
}> => {
  try {
    const { error } = await supabase
      .from('programs')
      .delete()
      .eq('id', programId);

    if (error) {
      console.error('Error deleting program:', error);
      return { error: error.message };
    }

    return { error: null };
  } catch (error) {
    console.error('Unexpected error deleting program:', error);
    return { error: 'An unexpected error occurred' };
  }
};

/**
 * Get programs by university
 */
export const getProgramsByUniversity = async (
  universityId: string,
  limit: number = 20,
  offset: number = 0
): Promise<{
  data: ProgramWithUniversity[] | null;
  error: string | null;
  total?: number;
}> => {
  try {
    const { data, error, count } = await supabase
      .from('programs')
      .select(
        `
        *,
        university:universities!inner(
          name,
          country,
          logo_url
        )
      `,
        { count: 'exact' }
      )
      .eq('university_id', universityId)
      .order('created_at', { ascending: false })
      .range(offset, offset + limit - 1);

    if (error) {
      console.error('Error fetching university programs:', error);
      return { data: null, error: error.message };
    }

    return {
      data: data as ProgramWithUniversity[],
      error: null,
      total: count || 0,
    };
  } catch (error) {
    console.error('Unexpected error fetching university programs:', error);
    return { data: null, error: 'An unexpected error occurred' };
  }
};

/**
 * Search programs with advanced filters
 */
export const searchPrograms = async (
  params: ProgramSearchParams
): Promise<{
  data: ProgramWithUniversity[] | null;
  error: string | null;
  total?: number;
}> => {
  return getPrograms(params);
};

/**
 * Get program statistics
 */
export const getProgramStats = async (): Promise<{
  data: {
    totalPrograms: number;
    totalUniversities: number;
    averageRating: number;
    totalApplications: number;
  } | null;
  error: string | null;
}> => {
  try {
    // Get total programs
    const { count: totalPrograms } = await supabase
      .from('programs')
      .select('*', { count: 'exact', head: true });

    // Get total universities
    const { count: totalUniversities } = await supabase
      .from('universities')
      .select('*', { count: 'exact', head: true });

    // Get average rating
    const { data: ratingData } = await supabase
      .from('programs')
      .select('rating')
      .not('rating', 'is', null);

    const averageRating =
      ratingData && ratingData.length > 0
        ? ratingData.reduce((sum, p) => sum + (p.rating || 0), 0) /
          ratingData.length
        : 0;

    // Get total applications
    const { count: totalApplications } = await supabase
      .from('program_applications')
      .select('*', { count: 'exact', head: true });

    return {
      data: {
        totalPrograms: totalPrograms || 0,
        totalUniversities: totalUniversities || 0,
        averageRating: Math.round(averageRating * 10) / 10,
        totalApplications: totalApplications || 0,
      },
      error: null,
    };
  } catch (error) {
    console.error('Unexpected error fetching program stats:', error);
    return { data: null, error: 'An unexpected error occurred' };
  }
};

/**
 * Increment program view count
 */
export const incrementProgramViews = async (
  programId: string
): Promise<{
  error: string | null;
}> => {
  try {
    const { error } = await supabase.rpc('increment_program_views', {
      program_id: programId,
    });

    if (error) {
      console.error('Error incrementing program views:', error);
      return { error: error.message };
    }

    return { error: null };
  } catch (error) {
    console.error('Unexpected error incrementing program views:', error);
    return { error: 'An unexpected error occurred' };
  }
};

/**
 * Subscribe to program updates
 */
export const subscribeToPrograms = (
  callback: (payload: any) => void,
  filters?: { university_id?: string; is_featured?: boolean }
) => {
  let subscription = supabase
    .channel('programs_changes')
    .on(
      'postgres_changes',
      {
        event: '*',
        schema: 'public',
        table: 'programs',
        filter: filters
          ? Object.entries(filters)
              .map(([key, value]) => `${key}=eq.${value}`)
              .join(',')
          : undefined,
      },
      callback
    )
    .subscribe();

  return () => {
    subscription.unsubscribe();
  };
};
