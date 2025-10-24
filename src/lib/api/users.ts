import { supabase } from '../supabase';

export interface UserProfileData {
  id: string;
  display_name: string;
  email: string;
  role: 'student' | 'professor' | 'university';
  avatar?: string;
  university?: string;
  department?: string;
  position?: string;
  major?: string;
  city?: string;
  country?: string;
  bio?: string;
  profile_views?: number;
  rating?: number;
  created_at?: string;
  first_name?: string;
  last_name?: string;
  phone_number?: string;
  institution?: string;
  subjects_taught?: string[];
  academic_interests?: string[];
  skills?: string[];
  languages?: string[];
  experience?: string;
  mentorship_interests?: string[];
  institution_affiliation?: string;
  official_university_name?: string;
  accreditation_number?: string;
  website_url?: string;
  contact_person?: string;
  areas_of_interest?: string[];
  research_interests?: string[];
  degree_level?: string;
  connections?: number;
  endorsements?: number;
  social_links?: {
    linkedin?: string;
    github?: string;
    twitter?: string;
    website?: string;
  };
  work_experience?: Array<{
    id: string;
    title: string;
    company: string;
    location: string;
    start_date: string;
    end_date: string;
    description: string;
    skills: string[];
  }>;
  education?: Array<{
    id: string;
    degree: string;
    institution: string;
    location: string;
    start_date: string;
    end_date: string;
    gpa?: string;
    description?: string;
    courses?: string[];
  }>;
  certifications?: Array<{
    id: string;
    name: string;
    issuer: string;
    issue_date: string;
    expiry_date?: string;
    credential_id?: string;
    url?: string;
  }>;
  publications?: Array<{
    id: string;
    title: string;
    authors: string[];
    journal: string;
    publication_date: string;
    doi?: string;
    abstract?: string;
    citations?: number;
  }>;
  projects?: Array<{
    id: string;
    name: string;
    description: string;
    technologies: string[];
    github_url?: string;
    live_url?: string;
    status: 'completed' | 'in-progress' | 'planned';
  }>;
  email_verified?: boolean;
  profile_completed?: boolean;
  verification_status?: 'pending' | 'verified' | 'rejected';
}

/**
 * Get user profile by ID
 */
export const getUserProfileById = async (
  userId: string
): Promise<{
  data: UserProfileData | null;
  error: string | null;
}> => {
  try {
    const { data, error } = await supabase
      .from('users')
      .select('*')
      .eq('id', userId)
      .single();

    if (error) {
      console.error('Error fetching user profile:', error);
      return { data: null, error: error.message };
    }

    if (!data) {
      return { data: null, error: 'User not found' };
    }

    return { data: data as UserProfileData, error: null };
  } catch (error) {
    console.error('Unexpected error fetching user profile:', error);
    return { data: null, error: 'An unexpected error occurred' };
  }
};

/**
 * Update user profile views
 */
export const updateProfileViews = async (
  userId: string
): Promise<{
  error: string | null;
}> => {
  try {
    const { error } = await supabase.rpc('increment_profile_views', {
      user_id: userId,
    });

    if (error) {
      console.error('Error updating profile views:', error);
      return { error: error.message };
    }

    return { error: null };
  } catch (error) {
    console.error('Unexpected error updating profile views:', error);
    return { error: 'An unexpected error occurred' };
  }
};
