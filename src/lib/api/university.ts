import { supabase } from '@/lib/supabase';

export interface UniversityProgram {
  id: string;
  title: string;
  description: string;
  program_type:
    | 'undergraduate'
    | 'graduate'
    | 'phd'
    | 'certificate'
    | 'diploma'
    | 'online'
    | 'hybrid';
  department: string;
  duration_months?: number;
  credits_required?: number;
  tuition_fee?: number;
  currency: string;
  language: string;
  start_dates?: string[];
  application_deadline?: string;
  requirements?: string[];
  curriculum?: string[];
  career_outcomes?: string[];
  admission_criteria?: string[];
  is_active: boolean;
  is_featured: boolean;
  created_by: string;
  university_id: string;
  created_at: string;
  updated_at: string;
  application_count?: number;
  creator?: {
    id: string;
    display_name: string;
    avatar?: string;
    role: string;
  };
  university?: {
    id: string;
    display_name: string;
    avatar?: string;
    role: string;
  };
}

export interface ProgramApplication {
  id: string;
  program_id: string;
  applicant_id: string;
  application_data: any;
  status:
    | 'submitted'
    | 'under-review'
    | 'shortlisted'
    | 'interview-scheduled'
    | 'interviewed'
    | 'accepted'
    | 'rejected'
    | 'waitlisted'
    | 'withdrawn';
  application_notes?: string;
  admission_decision?: string;
  decision_date?: string;
  enrollment_deadline?: string;
  applied_at: string;
  updated_at: string;
  program?: UniversityProgram;
  applicant?: {
    id: string;
    display_name: string;
    avatar?: string;
    role: string;
    email?: string;
  };
}

export interface Scholarship {
  id: string;
  title: string;
  description: string;
  amount: number;
  currency: string;
  scholarship_type:
    | 'merit-based'
    | 'need-based'
    | 'academic'
    | 'athletic'
    | 'research'
    | 'international'
    | 'minority'
    | 'other';
  eligibility_criteria?: string[];
  application_requirements?: string[];
  application_deadline?: string;
  award_date?: string;
  renewable: boolean;
  renewal_criteria?: string;
  max_recipients?: number;
  current_recipients: number;
  is_active: boolean;
  is_featured: boolean;
  created_by: string;
  university_id: string;
  created_at: string;
  updated_at: string;
  application_count?: number;
  creator?: {
    id: string;
    display_name: string;
    avatar?: string;
    role: string;
  };
  university?: {
    id: string;
    display_name: string;
    avatar?: string;
    role: string;
  };
}

export interface ScholarshipApplication {
  id: string;
  scholarship_id: string;
  applicant_id: string;
  application_data: any;
  status:
    | 'submitted'
    | 'under-review'
    | 'shortlisted'
    | 'awarded'
    | 'rejected'
    | 'withdrawn';
  application_notes?: string;
  award_decision?: string;
  decision_date?: string;
  award_amount?: number;
  disbursement_schedule?: any;
  applied_at: string;
  updated_at: string;
  scholarship?: Scholarship;
  applicant?: {
    id: string;
    display_name: string;
    avatar?: string;
    role: string;
    email?: string;
  };
}

export interface ProgramPromotion {
  id: string;
  program_id: string;
  promotion_type:
    | 'social_media'
    | 'email'
    | 'website'
    | 'event'
    | 'partnership'
    | 'other';
  title: string;
  content: string;
  target_audience?: string[];
  start_date?: string;
  end_date?: string;
  budget?: number;
  currency: string;
  metrics?: any;
  is_active: boolean;
  created_by: string;
  created_at: string;
  updated_at: string;
  program?: UniversityProgram;
  creator?: {
    id: string;
    display_name: string;
    avatar?: string;
    role: string;
  };
}

export interface ProgramAnalytics {
  id: string;
  program_id: string;
  date: string;
  views: number;
  applications: number;
  inquiries: number;
  conversions: number;
  demographics?: any;
  traffic_sources?: any;
  created_at: string;
}

export interface ScholarshipAnalytics {
  id: string;
  scholarship_id: string;
  date: string;
  views: number;
  applications: number;
  inquiries: number;
  conversions: number;
  demographics?: any;
  traffic_sources?: any;
  created_at: string;
}

// University Program Functions
export const createUniversityProgram = async (programData: {
  title: string;
  description: string;
  program_type:
    | 'undergraduate'
    | 'graduate'
    | 'phd'
    | 'certificate'
    | 'diploma'
    | 'online'
    | 'hybrid';
  department: string;
  duration_months?: number;
  credits_required?: number;
  tuition_fee?: number;
  currency?: string;
  language?: string;
  start_dates?: string[];
  application_deadline?: string;
  requirements?: string[];
  curriculum?: string[];
  career_outcomes?: string[];
  admission_criteria?: string[];
}): Promise<{ data: UniversityProgram | null; error: string | null }> => {
  try {
    const {
      data: { user },
    } = await supabase.auth.getUser();
    if (!user) {
      return { data: null, error: 'User not authenticated' };
    }

    const { data, error } = await supabase
      .from('university_programs')
      .insert({
        ...programData,
        created_by: user.id,
        university_id: user.id,
        currency: programData.currency || 'USD',
        language: programData.language || 'English',
      })
      .select(
        `
        *,
        creator:created_by(id, display_name, avatar, role),
        university:university_id(id, display_name, avatar, role)
      `
      )
      .single();

    if (error) {
      return { data: null, error: error.message };
    }

    return { data, error: null };
  } catch (error) {
    return { data: null, error: 'Failed to create university program' };
  }
};

export const getUniversityPrograms = async (filters?: {
  program_type?: string;
  department?: string;
  university_id?: string;
  is_active?: boolean;
  is_featured?: boolean;
  search?: string;
}): Promise<{ data: UniversityProgram[] | null; error: string | null }> => {
  try {
    let query = supabase
      .from('university_programs')
      .select(
        `
        *,
        creator:created_by(id, display_name, avatar, role),
        university:university_id(id, display_name, avatar, role),
        application_count:program_applications(count)
      `
      )
      .order('is_featured', { ascending: false })
      .order('created_at', { ascending: false });

    if (filters?.program_type) {
      query = query.eq('program_type', filters.program_type);
    }

    if (filters?.department) {
      query = query.eq('department', filters.department);
    }

    if (filters?.university_id) {
      query = query.eq('university_id', filters.university_id);
    }

    if (filters?.is_active !== undefined) {
      query = query.eq('is_active', filters.is_active);
    }

    if (filters?.is_featured !== undefined) {
      query = query.eq('is_featured', filters.is_featured);
    }

    if (filters?.search) {
      query = query.or(
        `title.ilike.%${filters.search}%,description.ilike.%${filters.search}%,department.ilike.%${filters.search}%`
      );
    }

    const { data, error } = await query;

    if (error) {
      return { data: null, error: error.message };
    }

    return { data, error: null };
  } catch (error) {
    return { data: null, error: 'Failed to fetch university programs' };
  }
};

export const getUniversityProgram = async (
  programId: string
): Promise<{ data: UniversityProgram | null; error: string | null }> => {
  try {
    const { data, error } = await supabase
      .from('university_programs')
      .select(
        `
        *,
        creator:created_by(id, display_name, avatar, role),
        university:university_id(id, display_name, avatar, role),
        application_count:program_applications(count)
      `
      )
      .eq('id', programId)
      .single();

    if (error) {
      return { data: null, error: error.message };
    }

    return { data, error: null };
  } catch (error) {
    return { data: null, error: 'Failed to fetch university program' };
  }
};

export const updateUniversityProgram = async (
  programId: string,
  updates: Partial<UniversityProgram>
): Promise<{ data: UniversityProgram | null; error: string | null }> => {
  try {
    const { data, error } = await supabase
      .from('university_programs')
      .update(updates)
      .eq('id', programId)
      .select(
        `
        *,
        creator:created_by(id, display_name, avatar, role),
        university:university_id(id, display_name, avatar, role),
        application_count:program_applications(count)
      `
      )
      .single();

    if (error) {
      return { data: null, error: error.message };
    }

    return { data, error: null };
  } catch (error) {
    return { data: null, error: 'Failed to update university program' };
  }
};

export const deleteUniversityProgram = async (
  programId: string
): Promise<{ error: string | null }> => {
  try {
    const { error } = await supabase
      .from('university_programs')
      .delete()
      .eq('id', programId);

    if (error) {
      return { error: error.message };
    }

    return { error: null };
  } catch (error) {
    return { error: 'Failed to delete university program' };
  }
};

// Program Application Functions
export const applyToProgram = async (
  programId: string,
  applicationData: any
): Promise<{ data: ProgramApplication | null; error: string | null }> => {
  try {
    const {
      data: { user },
    } = await supabase.auth.getUser();
    if (!user) {
      return { data: null, error: 'User not authenticated' };
    }

    const { data, error } = await supabase
      .from('program_applications')
      .insert({
        program_id: programId,
        applicant_id: user.id,
        application_data: applicationData,
      })
      .select(
        `
        *,
        program:program_id(*),
        applicant:applicant_id(id, display_name, avatar, role, email)
      `
      )
      .single();

    if (error) {
      return { data: null, error: error.message };
    }

    return { data, error: null };
  } catch (error) {
    return { data: null, error: 'Failed to apply to program' };
  }
};

export const getProgramApplications = async (
  programId?: string,
  applicantId?: string
): Promise<{ data: ProgramApplication[] | null; error: string | null }> => {
  try {
    let query = supabase
      .from('program_applications')
      .select(
        `
        *,
        program:program_id(*, creator:created_by(id, display_name, avatar, role), university:university_id(id, display_name, avatar, role)),
        applicant:applicant_id(id, display_name, avatar, role, email)
      `
      )
      .order('applied_at', { ascending: false });

    if (programId) {
      query = query.eq('program_id', programId);
    }

    if (applicantId) {
      query = query.eq('applicant_id', applicantId);
    }

    const { data, error } = await query;

    if (error) {
      return { data: null, error: error.message };
    }

    return { data, error: null };
  } catch (error) {
    return { data: null, error: 'Failed to fetch program applications' };
  }
};

export const updateProgramApplication = async (
  applicationId: string,
  updates: Partial<ProgramApplication>
): Promise<{ data: ProgramApplication | null; error: string | null }> => {
  try {
    const { data, error } = await supabase
      .from('program_applications')
      .update(updates)
      .eq('id', applicationId)
      .select(
        `
        *,
        program:program_id(*),
        applicant:applicant_id(id, display_name, avatar, role, email)
      `
      )
      .single();

    if (error) {
      return { data: null, error: error.message };
    }

    return { data, error: null };
  } catch (error) {
    return { data: null, error: 'Failed to update program application' };
  }
};

// Scholarship Functions
export const createScholarship = async (scholarshipData: {
  title: string;
  description: string;
  amount: number;
  currency?: string;
  scholarship_type:
    | 'merit-based'
    | 'need-based'
    | 'academic'
    | 'athletic'
    | 'research'
    | 'international'
    | 'minority'
    | 'other';
  eligibility_criteria?: string[];
  application_requirements?: string[];
  application_deadline?: string;
  award_date?: string;
  renewable?: boolean;
  renewal_criteria?: string;
  max_recipients?: number;
}): Promise<{ data: Scholarship | null; error: string | null }> => {
  try {
    const {
      data: { user },
    } = await supabase.auth.getUser();
    if (!user) {
      return { data: null, error: 'User not authenticated' };
    }

    const { data, error } = await supabase
      .from('scholarships')
      .insert({
        ...scholarshipData,
        created_by: user.id,
        university_id: user.id,
        currency: scholarshipData.currency || 'USD',
        renewable: scholarshipData.renewable || false,
      })
      .select(
        `
        *,
        creator:created_by(id, display_name, avatar, role),
        university:university_id(id, display_name, avatar, role)
      `
      )
      .single();

    if (error) {
      return { data: null, error: error.message };
    }

    return { data, error: null };
  } catch (error) {
    return { data: null, error: 'Failed to create scholarship' };
  }
};

export const getScholarships = async (filters?: {
  scholarship_type?: string;
  university_id?: string;
  is_active?: boolean;
  is_featured?: boolean;
  search?: string;
}): Promise<{ data: Scholarship[] | null; error: string | null }> => {
  try {
    let query = supabase
      .from('scholarships')
      .select(
        `
        *,
        creator:created_by(id, display_name, avatar, role),
        university:university_id(id, display_name, avatar, role),
        application_count:scholarship_applications(count)
      `
      )
      .order('is_featured', { ascending: false })
      .order('created_at', { ascending: false });

    if (filters?.scholarship_type) {
      query = query.eq('scholarship_type', filters.scholarship_type);
    }

    if (filters?.university_id) {
      query = query.eq('university_id', filters.university_id);
    }

    if (filters?.is_active !== undefined) {
      query = query.eq('is_active', filters.is_active);
    }

    if (filters?.is_featured !== undefined) {
      query = query.eq('is_featured', filters.is_featured);
    }

    if (filters?.search) {
      query = query.or(
        `title.ilike.%${filters.search}%,description.ilike.%${filters.search}%`
      );
    }

    const { data, error } = await query;

    if (error) {
      return { data: null, error: error.message };
    }

    return { data, error: null };
  } catch (error) {
    return { data: null, error: 'Failed to fetch scholarships' };
  }
};

export const getScholarship = async (
  scholarshipId: string
): Promise<{ data: Scholarship | null; error: string | null }> => {
  try {
    const { data, error } = await supabase
      .from('scholarships')
      .select(
        `
        *,
        creator:created_by(id, display_name, avatar, role),
        university:university_id(id, display_name, avatar, role),
        application_count:scholarship_applications(count)
      `
      )
      .eq('id', scholarshipId)
      .single();

    if (error) {
      return { data: null, error: error.message };
    }

    return { data, error: null };
  } catch (error) {
    return { data: null, error: 'Failed to fetch scholarship' };
  }
};

// Scholarship Application Functions
export const applyToScholarship = async (
  scholarshipId: string,
  applicationData: any
): Promise<{ data: ScholarshipApplication | null; error: string | null }> => {
  try {
    const {
      data: { user },
    } = await supabase.auth.getUser();
    if (!user) {
      return { data: null, error: 'User not authenticated' };
    }

    const { data, error } = await supabase
      .from('scholarship_applications')
      .insert({
        scholarship_id: scholarshipId,
        applicant_id: user.id,
        application_data: applicationData,
      })
      .select(
        `
        *,
        scholarship:scholarship_id(*),
        applicant:applicant_id(id, display_name, avatar, role, email)
      `
      )
      .single();

    if (error) {
      return { data: null, error: error.message };
    }

    return { data, error: null };
  } catch (error) {
    return { data: null, error: 'Failed to apply to scholarship' };
  }
};

export const getScholarshipApplications = async (
  scholarshipId?: string,
  applicantId?: string
): Promise<{ data: ScholarshipApplication[] | null; error: string | null }> => {
  try {
    let query = supabase
      .from('scholarship_applications')
      .select(
        `
        *,
        scholarship:scholarship_id(*, creator:created_by(id, display_name, avatar, role), university:university_id(id, display_name, avatar, role)),
        applicant:applicant_id(id, display_name, avatar, role, email)
      `
      )
      .order('applied_at', { ascending: false });

    if (scholarshipId) {
      query = query.eq('scholarship_id', scholarshipId);
    }

    if (applicantId) {
      query = query.eq('applicant_id', applicantId);
    }

    const { data, error } = await query;

    if (error) {
      return { data: null, error: error.message };
    }

    return { data, error: null };
  } catch (error) {
    return { data: null, error: 'Failed to fetch scholarship applications' };
  }
};

export const updateScholarshipApplication = async (
  applicationId: string,
  updates: Partial<ScholarshipApplication>
): Promise<{ data: ScholarshipApplication | null; error: string | null }> => {
  try {
    const { data, error } = await supabase
      .from('scholarship_applications')
      .update(updates)
      .eq('id', applicationId)
      .select(
        `
        *,
        scholarship:scholarship_id(*),
        applicant:applicant_id(id, display_name, avatar, role, email)
      `
      )
      .single();

    if (error) {
      return { data: null, error: error.message };
    }

    return { data, error: null };
  } catch (error) {
    return { data: null, error: 'Failed to update scholarship application' };
  }
};

// Program Promotion Functions
export const createProgramPromotion = async (promotionData: {
  program_id: string;
  promotion_type:
    | 'social_media'
    | 'email'
    | 'website'
    | 'event'
    | 'partnership'
    | 'other';
  title: string;
  content: string;
  target_audience?: string[];
  start_date?: string;
  end_date?: string;
  budget?: number;
  currency?: string;
}): Promise<{ data: ProgramPromotion | null; error: string | null }> => {
  try {
    const {
      data: { user },
    } = await supabase.auth.getUser();
    if (!user) {
      return { data: null, error: 'User not authenticated' };
    }

    const { data, error } = await supabase
      .from('program_promotions')
      .insert({
        ...promotionData,
        created_by: user.id,
        currency: promotionData.currency || 'USD',
      })
      .select(
        `
        *,
        program:program_id(*),
        creator:created_by(id, display_name, avatar, role)
      `
      )
      .single();

    if (error) {
      return { data: null, error: error.message };
    }

    return { data, error: null };
  } catch (error) {
    return { data: null, error: 'Failed to create program promotion' };
  }
};

export const getProgramPromotions = async (
  programId?: string
): Promise<{ data: ProgramPromotion[] | null; error: string | null }> => {
  try {
    let query = supabase
      .from('program_promotions')
      .select(
        `
        *,
        program:program_id(*),
        creator:created_by(id, display_name, avatar, role)
      `
      )
      .order('created_at', { ascending: false });

    if (programId) {
      query = query.eq('program_id', programId);
    }

    const { data, error } = await query;

    if (error) {
      return { data: null, error: error.message };
    }

    return { data, error: null };
  } catch (error) {
    return { data: null, error: 'Failed to fetch program promotions' };
  }
};

// Analytics Functions
export const getProgramAnalytics = async (
  programId: string,
  dateRange?: { start: string; end: string }
): Promise<{ data: ProgramAnalytics[] | null; error: string | null }> => {
  try {
    let query = supabase
      .from('program_analytics')
      .select('*')
      .eq('program_id', programId)
      .order('date', { ascending: false });

    if (dateRange) {
      query = query.gte('date', dateRange.start).lte('date', dateRange.end);
    }

    const { data, error } = await query;

    if (error) {
      return { data: null, error: error.message };
    }

    return { data, error: null };
  } catch (error) {
    return { data: null, error: 'Failed to fetch program analytics' };
  }
};

export const getScholarshipAnalytics = async (
  scholarshipId: string,
  dateRange?: { start: string; end: string }
): Promise<{ data: ScholarshipAnalytics[] | null; error: string | null }> => {
  try {
    let query = supabase
      .from('scholarship_analytics')
      .select('*')
      .eq('scholarship_id', scholarshipId)
      .order('date', { ascending: false });

    if (dateRange) {
      query = query.gte('date', dateRange.start).lte('date', dateRange.end);
    }

    const { data, error } = await query;

    if (error) {
      return { data: null, error: error.message };
    }

    return { data, error: null };
  } catch (error) {
    return { data: null, error: 'Failed to fetch scholarship analytics' };
  }
};
