import { supabase } from '../supabase';
import { Database } from '../../types/database';

// Type definitions
export type Scholarship = Database['public']['Tables']['scholarships']['Row'];
export type ScholarshipInsert =
  Database['public']['Tables']['scholarships']['Insert'];
export type ScholarshipUpdate =
  Database['public']['Tables']['scholarships']['Update'];

export interface ScholarshipWithProvider extends Scholarship {
  provider: {
    name: string;
    type: string;
    country: string;
    logo_url?: string;
  };
}

export interface ScholarshipFilters {
  provider_id?: string;
  country?: string;
  degree_level?: string;
  field_of_study?: string;
  amount_min?: number;
  amount_max?: number;
  deadline_after?: string;
  deadline_before?: string;
  is_active?: boolean;
  tags?: string[];
}

export interface ScholarshipSearchParams {
  query?: string;
  filters?: ScholarshipFilters;
  limit?: number;
  offset?: number;
  sort_by?: 'created_at' | 'name' | 'amount' | 'deadline';
  sort_order?: 'asc' | 'desc';
}

// =============================================
// SCHOLARSHIPS API FUNCTIONS
// =============================================

/**
 * Get all scholarships with optional filtering and pagination
 */
export const getScholarships = async (
  params: ScholarshipSearchParams = {}
): Promise<{
  data: ScholarshipWithProvider[] | null;
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

    let supabaseQuery = supabase.from('scholarships').select(
      `
        *,
        provider:scholarship_providers!inner(
          name,
          type,
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
    if (filters.provider_id) {
      supabaseQuery = supabaseQuery.eq('provider_id', filters.provider_id);
    }
    if (filters.country) {
      supabaseQuery = supabaseQuery.eq('country', filters.country);
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
    if (filters.amount_min !== undefined) {
      supabaseQuery = supabaseQuery.gte('amount', filters.amount_min);
    }
    if (filters.amount_max !== undefined) {
      supabaseQuery = supabaseQuery.lte('amount', filters.amount_max);
    }
    if (filters.deadline_after) {
      supabaseQuery = supabaseQuery.gte('deadline', filters.deadline_after);
    }
    if (filters.deadline_before) {
      supabaseQuery = supabaseQuery.lte('deadline', filters.deadline_before);
    }
    if (filters.is_active !== undefined) {
      supabaseQuery = supabaseQuery.eq('is_active', filters.is_active);
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
      console.error('Error fetching scholarships:', error);
      return { data: null, error: error.message };
    }

    return {
      data: data as ScholarshipWithProvider[],
      error: null,
      total: count || 0,
    };
  } catch (error) {
    console.error('Unexpected error fetching scholarships:', error);
    return { data: null, error: 'An unexpected error occurred' };
  }
};

/**
 * Get a single scholarship by ID
 */
export const getScholarship = async (
  scholarshipId: string
): Promise<{
  data: ScholarshipWithProvider | null;
  error: string | null;
}> => {
  try {
    const { data, error } = await supabase
      .from('scholarships')
      .select(
        `
        *,
        provider:scholarship_providers!inner(
          name,
          type,
          country,
          logo_url
        )
      `
      )
      .eq('id', scholarshipId)
      .single();

    if (error) {
      console.error('Error fetching scholarship:', error);
      return { data: null, error: error.message };
    }

    return { data: data as ScholarshipWithProvider, error: null };
  } catch (error) {
    console.error('Unexpected error fetching scholarship:', error);
    return { data: null, error: 'An unexpected error occurred' };
  }
};

/**
 * Get featured scholarships
 */
export const getFeaturedScholarships = async (
  limit: number = 6
): Promise<{
  data: ScholarshipWithProvider[] | null;
  error: string | null;
}> => {
  try {
    const { data, error } = await supabase
      .from('scholarships')
      .select(
        `
        *,
        provider:scholarship_providers!inner(
          name,
          type,
          country,
          logo_url
        )
      `
      )
      .eq('is_featured', true)
      .eq('is_active', true)
      .order('amount', { ascending: false })
      .limit(limit);

    if (error) {
      console.error('Error fetching featured scholarships:', error);
      return { data: null, error: error.message };
    }

    return { data: data as ScholarshipWithProvider[], error: null };
  } catch (error) {
    console.error('Unexpected error fetching featured scholarships:', error);
    return { data: null, error: 'An unexpected error occurred' };
  }
};

/**
 * Get scholarships by deadline (upcoming)
 */
export const getUpcomingScholarships = async (
  limit: number = 10
): Promise<{
  data: ScholarshipWithProvider[] | null;
  error: string | null;
}> => {
  try {
    const { data, error } = await supabase
      .from('scholarships')
      .select(
        `
        *,
        provider:scholarship_providers!inner(
          name,
          type,
          country,
          logo_url
        )
      `
      )
      .eq('is_active', true)
      .gte('deadline', new Date().toISOString())
      .order('deadline', { ascending: true })
      .limit(limit);

    if (error) {
      console.error('Error fetching upcoming scholarships:', error);
      return { data: null, error: error.message };
    }

    return { data: data as ScholarshipWithProvider[], error: null };
  } catch (error) {
    console.error('Unexpected error fetching upcoming scholarships:', error);
    return { data: null, error: 'An unexpected error occurred' };
  }
};

/**
 * Create a new scholarship
 */
export const createScholarship = async (
  scholarshipData: ScholarshipInsert
): Promise<{
  data: Scholarship | null;
  error: string | null;
}> => {
  try {
    const { data, error } = await supabase
      .from('scholarships')
      .insert(scholarshipData)
      .select()
      .single();

    if (error) {
      console.error('Error creating scholarship:', error);
      return { data: null, error: error.message };
    }

    return { data, error: null };
  } catch (error) {
    console.error('Unexpected error creating scholarship:', error);
    return { data: null, error: 'An unexpected error occurred' };
  }
};

/**
 * Update a scholarship
 */
export const updateScholarship = async (
  scholarshipId: string,
  updates: ScholarshipUpdate
): Promise<{
  data: Scholarship | null;
  error: string | null;
}> => {
  try {
    const { data, error } = await supabase
      .from('scholarships')
      .update(updates)
      .eq('id', scholarshipId)
      .select()
      .single();

    if (error) {
      console.error('Error updating scholarship:', error);
      return { data: null, error: error.message };
    }

    return { data, error: null };
  } catch (error) {
    console.error('Unexpected error updating scholarship:', error);
    return { data: null, error: 'An unexpected error occurred' };
  }
};

/**
 * Delete a scholarship
 */
export const deleteScholarship = async (
  scholarshipId: string
): Promise<{
  error: string | null;
}> => {
  try {
    const { error } = await supabase
      .from('scholarships')
      .delete()
      .eq('id', scholarshipId);

    if (error) {
      console.error('Error deleting scholarship:', error);
      return { error: error.message };
    }

    return { error: null };
  } catch (error) {
    console.error('Unexpected error deleting scholarship:', error);
    return { error: 'An unexpected error occurred' };
  }
};

/**
 * Get scholarships by provider
 */
export const getScholarshipsByProvider = async (
  providerId: string,
  limit: number = 20,
  offset: number = 0
): Promise<{
  data: ScholarshipWithProvider[] | null;
  error: string | null;
  total?: number;
}> => {
  try {
    const { data, error, count } = await supabase
      .from('scholarships')
      .select(
        `
        *,
        provider:scholarship_providers!inner(
          name,
          type,
          country,
          logo_url
        )
      `,
        { count: 'exact' }
      )
      .eq('provider_id', providerId)
      .order('created_at', { ascending: false })
      .range(offset, offset + limit - 1);

    if (error) {
      console.error('Error fetching scholarships by provider:', error);
      return { data: null, error: error.message };
    }

    return {
      data: data as ScholarshipWithProvider[],
      error: null,
      total: count || 0,
    };
  } catch (error) {
    console.error('Unexpected error fetching scholarships by provider:', error);
    return { data: null, error: 'An unexpected error occurred' };
  }
};

/**
 * Search scholarships with advanced filters
 */
export const searchScholarships = async (
  params: ScholarshipSearchParams
): Promise<{
  data: ScholarshipWithProvider[] | null;
  error: string | null;
  total?: number;
}> => {
  return getScholarships(params);
};

/**
 * Get scholarship statistics
 */
export const getScholarshipStats = async (): Promise<{
  data: {
    totalScholarships: number;
    totalAmount: number;
    averageAmount: number;
    totalApplications: number;
    activeScholarships: number;
  } | null;
  error: string | null;
}> => {
  try {
    // Get total scholarships
    const { count: totalScholarships } = await supabase
      .from('scholarships')
      .select('*', { count: 'exact', head: true });

    // Get active scholarships
    const { count: activeScholarships } = await supabase
      .from('scholarships')
      .select('*', { count: 'exact', head: true })
      .eq('is_active', true);

    // Get total amount and average
    const { data: amountData } = await supabase
      .from('scholarships')
      .select('amount')
      .not('amount', 'is', null);

    const totalAmount =
      amountData?.reduce((sum, s) => sum + (s.amount || 0), 0) || 0;
    const averageAmount =
      amountData && amountData.length > 0 ? totalAmount / amountData.length : 0;

    // Get total applications
    const { count: totalApplications } = await supabase
      .from('scholarship_applications')
      .select('*', { count: 'exact', head: true });

    return {
      data: {
        totalScholarships: totalScholarships || 0,
        totalAmount,
        averageAmount: Math.round(averageAmount),
        totalApplications: totalApplications || 0,
        activeScholarships: activeScholarships || 0,
      },
      error: null,
    };
  } catch (error) {
    console.error('Unexpected error fetching scholarship stats:', error);
    return { data: null, error: 'An unexpected error occurred' };
  }
};

/**
 * Get scholarships by field of study
 */
export const getScholarshipsByField = async (
  fieldOfStudy: string,
  limit: number = 20,
  offset: number = 0
): Promise<{
  data: ScholarshipWithProvider[] | null;
  error: string | null;
  total?: number;
}> => {
  try {
    const { data, error, count } = await supabase
      .from('scholarships')
      .select(
        `
        *,
        provider:scholarship_providers!inner(
          name,
          type,
          country,
          logo_url
        )
      `,
        { count: 'exact' }
      )
      .eq('field_of_study', fieldOfStudy)
      .eq('is_active', true)
      .order('amount', { ascending: false })
      .range(offset, offset + limit - 1);

    if (error) {
      console.error('Error fetching scholarships by field:', error);
      return { data: null, error: error.message };
    }

    return {
      data: data as ScholarshipWithProvider[],
      error: null,
      total: count || 0,
    };
  } catch (error) {
    console.error('Unexpected error fetching scholarships by field:', error);
    return { data: null, error: 'An unexpected error occurred' };
  }
};

/**
 * Get scholarships by country
 */
export const getScholarshipsByCountry = async (
  country: string,
  limit: number = 20,
  offset: number = 0
): Promise<{
  data: ScholarshipWithProvider[] | null;
  error: string | null;
  total?: number;
}> => {
  try {
    const { data, error, count } = await supabase
      .from('scholarships')
      .select(
        `
        *,
        provider:scholarship_providers!inner(
          name,
          type,
          country,
          logo_url
        )
      `,
        { count: 'exact' }
      )
      .eq('country', country)
      .eq('is_active', true)
      .order('amount', { ascending: false })
      .range(offset, offset + limit - 1);

    if (error) {
      console.error('Error fetching scholarships by country:', error);
      return { data: null, error: error.message };
    }

    return {
      data: data as ScholarshipWithProvider[],
      error: null,
      total: count || 0,
    };
  } catch (error) {
    console.error('Unexpected error fetching scholarships by country:', error);
    return { data: null, error: 'An unexpected error occurred' };
  }
};

/**
 * Get high-value scholarships
 */
export const getHighValueScholarships = async (
  minAmount: number = 10000,
  limit: number = 10
): Promise<{
  data: ScholarshipWithProvider[] | null;
  error: string | null;
}> => {
  try {
    const { data, error } = await supabase
      .from('scholarships')
      .select(
        `
        *,
        provider:scholarship_providers!inner(
          name,
          type,
          country,
          logo_url
        )
      `
      )
      .gte('amount', minAmount)
      .eq('is_active', true)
      .order('amount', { ascending: false })
      .limit(limit);

    if (error) {
      console.error('Error fetching high-value scholarships:', error);
      return { data: null, error: error.message };
    }

    return { data: data as ScholarshipWithProvider[], error: null };
  } catch (error) {
    console.error('Unexpected error fetching high-value scholarships:', error);
    return { data: null, error: 'An unexpected error occurred' };
  }
};

/**
 * Increment scholarship view count
 */
export const incrementScholarshipViews = async (
  scholarshipId: string
): Promise<{
  error: string | null;
}> => {
  try {
    const { error } = await supabase.rpc('increment_scholarship_views', {
      scholarship_id: scholarshipId,
    });

    if (error) {
      console.error('Error incrementing scholarship views:', error);
      return { error: error.message };
    }

    return { error: null };
  } catch (error) {
    console.error('Unexpected error incrementing scholarship views:', error);
    return { error: 'An unexpected error occurred' };
  }
};

/**
 * Subscribe to scholarship updates
 */
export const subscribeToScholarships = (
  callback: (payload: any) => void,
  filters?: { provider_id?: string; country?: string; is_active?: boolean }
) => {
  let subscription = supabase
    .channel('scholarships_changes')
    .on(
      'postgres_changes',
      {
        event: '*',
        schema: 'public',
        table: 'scholarships',
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
