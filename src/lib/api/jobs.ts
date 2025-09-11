import { supabase } from '@/lib/supabase';

export interface JobPosting {
  id: string;
  title: string;
  description: string;
  company_name: string;
  company_logo?: string;
  location: string;
  job_type:
    | 'full-time'
    | 'part-time'
    | 'contract'
    | 'internship'
    | 'research-assistant'
    | 'teaching-assistant';
  category:
    | 'academic'
    | 'research'
    | 'teaching'
    | 'administrative'
    | 'technical'
    | 'other';
  department?: string;
  salary_min?: number;
  salary_max?: number;
  currency: string;
  experience_level?: 'entry' | 'mid' | 'senior' | 'any';
  education_level?: 'bachelor' | 'master' | 'phd' | 'any';
  skills_required?: string[];
  skills_preferred?: string[];
  responsibilities?: string[];
  requirements?: string[];
  benefits?: string[];
  application_deadline?: string;
  start_date?: string;
  is_remote: boolean;
  is_active: boolean;
  is_featured: boolean;
  posted_by: string;
  created_at: string;
  updated_at: string;
  application_count?: number;
  poster?: {
    id: string;
    display_name: string;
    avatar?: string;
    role: string;
    university?: string;
  };
}

export interface JobApplication {
  id: string;
  job_posting_id: string;
  applicant_id: string;
  cover_letter?: string;
  resume_url?: string;
  portfolio_url?: string;
  status:
    | 'submitted'
    | 'under-review'
    | 'shortlisted'
    | 'interview-scheduled'
    | 'interviewed'
    | 'offered'
    | 'accepted'
    | 'rejected'
    | 'withdrawn';
  application_notes?: string;
  interview_notes?: string;
  feedback?: string;
  applied_at: string;
  updated_at: string;
  job_posting?: JobPosting;
  applicant?: {
    id: string;
    display_name: string;
    avatar?: string;
    role: string;
    university?: string;
    email?: string;
  };
}

export interface ResearchProject {
  id: string;
  title: string;
  description: string;
  abstract?: string;
  research_area: string;
  methodology?: string;
  expected_outcomes?: string;
  duration_months?: number;
  start_date?: string;
  end_date?: string;
  funding_amount?: number;
  currency: string;
  funding_source?: string;
  requirements?: string[];
  skills_required?: string[];
  deliverables?: string[];
  is_active: boolean;
  is_public: boolean;
  created_by: string;
  created_at: string;
  updated_at: string;
  application_count?: number;
  creator?: {
    id: string;
    display_name: string;
    avatar?: string;
    role: string;
    university?: string;
  };
}

export interface ResearchApplication {
  id: string;
  project_id: string;
  applicant_id: string;
  motivation: string;
  relevant_experience?: string;
  research_interests?: string[];
  availability_hours?: number;
  status:
    | 'submitted'
    | 'under-review'
    | 'shortlisted'
    | 'interview-scheduled'
    | 'interviewed'
    | 'accepted'
    | 'rejected'
    | 'withdrawn';
  application_notes?: string;
  interview_notes?: string;
  feedback?: string;
  applied_at: string;
  updated_at: string;
  project?: ResearchProject;
  applicant?: {
    id: string;
    display_name: string;
    avatar?: string;
    role: string;
    university?: string;
    email?: string;
  };
}

// Job Posting Functions
export const createJobPosting = async (jobData: {
  title: string;
  description: string;
  company_name: string;
  company_logo?: string;
  location: string;
  job_type:
    | 'full-time'
    | 'part-time'
    | 'contract'
    | 'internship'
    | 'research-assistant'
    | 'teaching-assistant';
  category:
    | 'academic'
    | 'research'
    | 'teaching'
    | 'administrative'
    | 'technical'
    | 'other';
  department?: string;
  salary_min?: number;
  salary_max?: number;
  currency?: string;
  experience_level?: 'entry' | 'mid' | 'senior' | 'any';
  education_level?: 'bachelor' | 'master' | 'phd' | 'any';
  skills_required?: string[];
  skills_preferred?: string[];
  responsibilities?: string[];
  requirements?: string[];
  benefits?: string[];
  application_deadline?: string;
  start_date?: string;
  is_remote?: boolean;
}): Promise<{ data: JobPosting | null; error: string | null }> => {
  try {
    const {
      data: { user },
    } = await supabase.auth.getUser();
    if (!user) {
      return { data: null, error: 'User not authenticated' };
    }

    const { data, error } = await supabase
      .from('job_postings')
      .insert({
        ...jobData,
        posted_by: user.id,
        currency: jobData.currency || 'USD',
        is_remote: jobData.is_remote || false,
      })
      .select(
        `
        *,
        poster:posted_by(id, display_name, avatar, role, university)
      `
      )
      .single();

    if (error) {
      return { data: null, error: error.message };
    }

    return { data, error: null };
  } catch (error) {
    return { data: null, error: 'Failed to create job posting' };
  }
};

export const getJobPostings = async (filters?: {
  category?: string;
  job_type?: string;
  location?: string;
  experience_level?: string;
  education_level?: string;
  is_remote?: boolean;
  search?: string;
  posted_by?: string;
}): Promise<{ data: JobPosting[] | null; error: string | null }> => {
  try {
    let query = supabase
      .from('job_postings')
      .select(
        `
        *,
        poster:posted_by(id, display_name, avatar, role, university),
        application_count:job_applications(count)
      `
      )
      .eq('is_active', true)
      .order('is_featured', { ascending: false })
      .order('created_at', { ascending: false });

    if (filters?.category) {
      query = query.eq('category', filters.category);
    }

    if (filters?.job_type) {
      query = query.eq('job_type', filters.job_type);
    }

    if (filters?.location) {
      query = query.ilike('location', `%${filters.location}%`);
    }

    if (filters?.experience_level) {
      query = query.eq('experience_level', filters.experience_level);
    }

    if (filters?.education_level) {
      query = query.eq('education_level', filters.education_level);
    }

    if (filters?.is_remote !== undefined) {
      query = query.eq('is_remote', filters.is_remote);
    }

    if (filters?.search) {
      query = query.or(
        `title.ilike.%${filters.search}%,description.ilike.%${filters.search}%,company_name.ilike.%${filters.search}%`
      );
    }

    if (filters?.posted_by) {
      query = query.eq('posted_by', filters.posted_by);
    }

    const { data, error } = await query;

    if (error) {
      return { data: null, error: error.message };
    }

    return { data, error: null };
  } catch (error) {
    return { data: null, error: 'Failed to fetch job postings' };
  }
};

export const getJobPosting = async (
  jobId: string
): Promise<{ data: JobPosting | null; error: string | null }> => {
  try {
    const { data, error } = await supabase
      .from('job_postings')
      .select(
        `
        *,
        poster:posted_by(id, display_name, avatar, role, university),
        application_count:job_applications(count)
      `
      )
      .eq('id', jobId)
      .single();

    if (error) {
      return { data: null, error: error.message };
    }

    return { data, error: null };
  } catch (error) {
    return { data: null, error: 'Failed to fetch job posting' };
  }
};

export const updateJobPosting = async (
  jobId: string,
  updates: Partial<JobPosting>
): Promise<{ data: JobPosting | null; error: string | null }> => {
  try {
    const { data, error } = await supabase
      .from('job_postings')
      .update(updates)
      .eq('id', jobId)
      .select(
        `
        *,
        poster:posted_by(id, display_name, avatar, role, university),
        application_count:job_applications(count)
      `
      )
      .single();

    if (error) {
      return { data: null, error: error.message };
    }

    return { data, error: null };
  } catch (error) {
    return { data: null, error: 'Failed to update job posting' };
  }
};

export const deleteJobPosting = async (
  jobId: string
): Promise<{ error: string | null }> => {
  try {
    const { error } = await supabase
      .from('job_postings')
      .delete()
      .eq('id', jobId);

    if (error) {
      return { error: error.message };
    }

    return { error: null };
  } catch (error) {
    return { error: 'Failed to delete job posting' };
  }
};

// Job Application Functions
export const applyToJob = async (
  jobId: string,
  applicationData: {
    cover_letter?: string;
    resume_url?: string;
    portfolio_url?: string;
  }
): Promise<{ data: JobApplication | null; error: string | null }> => {
  try {
    const {
      data: { user },
    } = await supabase.auth.getUser();
    if (!user) {
      return { data: null, error: 'User not authenticated' };
    }

    const { data, error } = await supabase
      .from('job_applications')
      .insert({
        job_posting_id: jobId,
        applicant_id: user.id,
        ...applicationData,
      })
      .select(
        `
        *,
        job_posting:job_posting_id(*),
        applicant:applicant_id(id, display_name, avatar, role, university, email)
      `
      )
      .single();

    if (error) {
      return { data: null, error: error.message };
    }

    return { data, error: null };
  } catch (error) {
    return { data: null, error: 'Failed to apply to job' };
  }
};

export const getJobApplications = async (
  jobId?: string,
  applicantId?: string
): Promise<{ data: JobApplication[] | null; error: string | null }> => {
  try {
    let query = supabase
      .from('job_applications')
      .select(
        `
        *,
        job_posting:job_posting_id(*, poster:posted_by(id, display_name, avatar, role, university)),
        applicant:applicant_id(id, display_name, avatar, role, university, email)
      `
      )
      .order('applied_at', { ascending: false });

    if (jobId) {
      query = query.eq('job_posting_id', jobId);
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
    return { data: null, error: 'Failed to fetch job applications' };
  }
};

export const updateJobApplication = async (
  applicationId: string,
  updates: Partial<JobApplication>
): Promise<{ data: JobApplication | null; error: string | null }> => {
  try {
    const { data, error } = await supabase
      .from('job_applications')
      .update(updates)
      .eq('id', applicationId)
      .select(
        `
        *,
        job_posting:job_posting_id(*),
        applicant:applicant_id(id, display_name, avatar, role, university, email)
      `
      )
      .single();

    if (error) {
      return { data: null, error: error.message };
    }

    return { data, error: null };
  } catch (error) {
    return { data: null, error: 'Failed to update job application' };
  }
};

// Research Project Functions
export const createResearchProject = async (projectData: {
  title: string;
  description: string;
  abstract?: string;
  research_area: string;
  methodology?: string;
  expected_outcomes?: string;
  duration_months?: number;
  start_date?: string;
  end_date?: string;
  funding_amount?: number;
  currency?: string;
  funding_source?: string;
  requirements?: string[];
  skills_required?: string[];
  deliverables?: string[];
  is_public?: boolean;
}): Promise<{ data: ResearchProject | null; error: string | null }> => {
  try {
    const {
      data: { user },
    } = await supabase.auth.getUser();
    if (!user) {
      return { data: null, error: 'User not authenticated' };
    }

    const { data, error } = await supabase
      .from('research_projects')
      .insert({
        ...projectData,
        created_by: user.id,
        currency: projectData.currency || 'USD',
        is_public:
          projectData.is_public !== undefined ? projectData.is_public : true,
      })
      .select(
        `
        *,
        creator:created_by(id, display_name, avatar, role, university)
      `
      )
      .single();

    if (error) {
      return { data: null, error: error.message };
    }

    return { data, error: null };
  } catch (error) {
    return { data: null, error: 'Failed to create research project' };
  }
};

export const getResearchProjects = async (filters?: {
  research_area?: string;
  created_by?: string;
  is_public?: boolean;
  search?: string;
}): Promise<{ data: ResearchProject[] | null; error: string | null }> => {
  try {
    let query = supabase
      .from('research_projects')
      .select(
        `
        *,
        creator:created_by(id, display_name, avatar, role, university),
        application_count:research_applications(count)
      `
      )
      .eq('is_active', true)
      .order('created_at', { ascending: false });

    if (filters?.research_area) {
      query = query.eq('research_area', filters.research_area);
    }

    if (filters?.created_by) {
      query = query.eq('created_by', filters.created_by);
    }

    if (filters?.is_public !== undefined) {
      query = query.eq('is_public', filters.is_public);
    }

    if (filters?.search) {
      query = query.or(
        `title.ilike.%${filters.search}%,description.ilike.%${filters.search}%,research_area.ilike.%${filters.search}%`
      );
    }

    const { data, error } = await query;

    if (error) {
      return { data: null, error: error.message };
    }

    return { data, error: null };
  } catch (error) {
    return { data: null, error: 'Failed to fetch research projects' };
  }
};

export const getResearchProject = async (
  projectId: string
): Promise<{ data: ResearchProject | null; error: string | null }> => {
  try {
    const { data, error } = await supabase
      .from('research_projects')
      .select(
        `
        *,
        creator:created_by(id, display_name, avatar, role, university),
        application_count:research_applications(count)
      `
      )
      .eq('id', projectId)
      .single();

    if (error) {
      return { data: null, error: error.message };
    }

    return { data, error: null };
  } catch (error) {
    return { data: null, error: 'Failed to fetch research project' };
  }
};

// Research Application Functions
export const applyToResearchProject = async (
  projectId: string,
  applicationData: {
    motivation: string;
    relevant_experience?: string;
    research_interests?: string[];
    availability_hours?: number;
  }
): Promise<{ data: ResearchApplication | null; error: string | null }> => {
  try {
    const {
      data: { user },
    } = await supabase.auth.getUser();
    if (!user) {
      return { data: null, error: 'User not authenticated' };
    }

    const { data, error } = await supabase
      .from('research_applications')
      .insert({
        project_id: projectId,
        applicant_id: user.id,
        ...applicationData,
      })
      .select(
        `
        *,
        project:project_id(*),
        applicant:applicant_id(id, display_name, avatar, role, university, email)
      `
      )
      .single();

    if (error) {
      return { data: null, error: error.message };
    }

    return { data, error: null };
  } catch (error) {
    return { data: null, error: 'Failed to apply to research project' };
  }
};

export const getResearchApplications = async (
  projectId?: string,
  applicantId?: string
): Promise<{ data: ResearchApplication[] | null; error: string | null }> => {
  try {
    let query = supabase
      .from('research_applications')
      .select(
        `
        *,
        project:project_id(*, creator:created_by(id, display_name, avatar, role, university)),
        applicant:applicant_id(id, display_name, avatar, role, university, email)
      `
      )
      .order('applied_at', { ascending: false });

    if (projectId) {
      query = query.eq('project_id', projectId);
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
    return { data: null, error: 'Failed to fetch research applications' };
  }
};

// Saved Jobs/Projects Functions
export const saveJob = async (
  jobId: string
): Promise<{ error: string | null }> => {
  try {
    const {
      data: { user },
    } = await supabase.auth.getUser();
    if (!user) {
      return { error: 'User not authenticated' };
    }

    const { error } = await supabase.from('job_saved').insert({
      user_id: user.id,
      job_posting_id: jobId,
    });

    if (error) {
      return { error: error.message };
    }

    return { error: null };
  } catch (error) {
    return { error: 'Failed to save job' };
  }
};

export const unsaveJob = async (
  jobId: string
): Promise<{ error: string | null }> => {
  try {
    const {
      data: { user },
    } = await supabase.auth.getUser();
    if (!user) {
      return { error: 'User not authenticated' };
    }

    const { error } = await supabase
      .from('job_saved')
      .delete()
      .eq('user_id', user.id)
      .eq('job_posting_id', jobId);

    if (error) {
      return { error: error.message };
    }

    return { error: null };
  } catch (error) {
    return { error: 'Failed to unsave job' };
  }
};

export const getSavedJobs = async (): Promise<{
  data: JobPosting[] | null;
  error: string | null;
}> => {
  try {
    const {
      data: { user },
    } = await supabase.auth.getUser();
    if (!user) {
      return { data: null, error: 'User not authenticated' };
    }

    const { data, error } = await supabase
      .from('job_saved')
      .select(
        `
        job_posting:job_posting_id(
          *,
          poster:posted_by(id, display_name, avatar, role, university),
          application_count:job_applications(count)
        )
      `
      )
      .eq('user_id', user.id)
      .order('saved_at', { ascending: false });

    if (error) {
      return { data: null, error: error.message };
    }

    const jobs = data?.map((item) => item.job_posting).filter(Boolean) || [];
    return { data: jobs, error: null };
  } catch (error) {
    return { data: null, error: 'Failed to fetch saved jobs' };
  }
};

export const saveResearchProject = async (
  projectId: string
): Promise<{ error: string | null }> => {
  try {
    const {
      data: { user },
    } = await supabase.auth.getUser();
    if (!user) {
      return { error: 'User not authenticated' };
    }

    const { error } = await supabase.from('research_saved').insert({
      user_id: user.id,
      project_id: projectId,
    });

    if (error) {
      return { error: error.message };
    }

    return { error: null };
  } catch (error) {
    return { error: 'Failed to save research project' };
  }
};

export const unsaveResearchProject = async (
  projectId: string
): Promise<{ error: string | null }> => {
  try {
    const {
      data: { user },
    } = await supabase.auth.getUser();
    if (!user) {
      return { error: 'User not authenticated' };
    }

    const { error } = await supabase
      .from('research_saved')
      .delete()
      .eq('user_id', user.id)
      .eq('project_id', projectId);

    if (error) {
      return { error: error.message };
    }

    return { error: null };
  } catch (error) {
    return { error: 'Failed to unsave research project' };
  }
};

export const getSavedResearchProjects = async (): Promise<{
  data: ResearchProject[] | null;
  error: string | null;
}> => {
  try {
    const {
      data: { user },
    } = await supabase.auth.getUser();
    if (!user) {
      return { data: null, error: 'User not authenticated' };
    }

    const { data, error } = await supabase
      .from('research_saved')
      .select(
        `
        project:project_id(
          *,
          creator:created_by(id, display_name, avatar, role, university),
          application_count:research_applications(count)
        )
      `
      )
      .eq('user_id', user.id)
      .order('saved_at', { ascending: false });

    if (error) {
      return { data: null, error: error.message };
    }

    const projects = data?.map((item) => item.project).filter(Boolean) || [];
    return { data: projects, error: null };
  } catch (error) {
    return { data: null, error: 'Failed to fetch saved research projects' };
  }
};
