import { supabase } from '../supabase';
import { UserData, PrivacySettings } from '../auth';
import { Database } from '../../types/database';

// Type definitions for profile operations
export interface ProfileUpdateData {
  // Basic info
  display_name?: string;
  first_name?: string;
  last_name?: string;
  phone_number?: string;
  bio?: string;
  country?: string;
  city?: string;

  // Role-specific fields
  university?: string;
  institution?: string;
  department?: string;
  position?: string;
  major?: string;
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

  // Extended portfolio sections
  work_experience?: Array<{
    id: string;
    title: string;
    company: string;
    location: string;
    startDate: string;
    endDate: string;
    description: string;
    skills: string[];
  }>;
  education?: Array<{
    id: string;
    degree: string;
    institution: string;
    location: string;
    startDate: string;
    endDate: string;
    gpa?: string;
    description?: string;
    courses?: string[];
  }>;
  certifications?: Array<{
    id: string;
    name: string;
    issuer: string;
    issueDate: string;
    expiryDate?: string;
    credentialId?: string;
    url?: string;
  }>;
  publications?: Array<{
    id: string;
    title: string;
    authors: string[];
    journal: string;
    publicationDate: string;
    doi?: string;
    abstract?: string;
    citations?: number;
  }>;
  projects?: Array<{
    id: string;
    name: string;
    description: string;
    technologies: string[];
    githubUrl?: string;
    liveUrl?: string;
    status: 'completed' | 'in-progress' | 'planned';
  }>;

  // Social links
  social_links?: {
    linkedin?: string;
    github?: string;
    twitter?: string;
    website?: string;
  };

  // Privacy settings
  privacy_settings?: PrivacySettings;

  // Profile completion
  profile_completed?: boolean;
}

export interface ProfileStats {
  profile_views: number;
  connections: number;
  endorsements: number;
  posts_count?: number;
  programs_applied?: number;
  mentorship_sessions?: number;
}

export interface PublicProfile {
  id: string;
  display_name: string;
  first_name: string;
  last_name: string;
  role: 'student' | 'professor' | 'university';
  bio?: string;
  country: string;
  city?: string;
  university?: string;
  institution?: string;
  department?: string;
  position?: string;
  major?: string;
  avatar?: string;
  skills?: string[];
  academic_interests?: string[];
  research_interests?: string[];
  social_links?: {
    linkedin?: string;
    github?: string;
    twitter?: string;
    website?: string;
  };
  profile_views: number;
  connections: number;
  endorsements: number;
  created_at: string;
  verification_status?: 'pending' | 'verified' | 'rejected';
}

// =============================================
// PROFILE CRUD OPERATIONS
// =============================================

/**
 * Get complete user profile data
 */
export const getProfile = async (userId: string): Promise<UserData | null> => {
  try {
    const { data, error } = await supabase
      .from('users')
      .select('*')
      .eq('id', userId)
      .single();

    if (error) {
      console.error('Error fetching profile:', error);
      return null;
    }

    return convertSupabaseUserToUserData(data);
  } catch (error) {
    console.error('Error fetching profile:', error);
    return null;
  }
};

/**
 * Update user profile data
 */
export const updateProfile = async (
  userId: string,
  profileData: ProfileUpdateData
): Promise<{ success: boolean; error?: any }> => {
  try {
    const updateData = {
      ...profileData,
      updated_at: new Date().toISOString(),
    };

    const { error } = await supabase
      .from('users')
      .update(updateData)
      .eq('id', userId);

    if (error) {
      console.error('Error updating profile:', error);
      return { success: false, error };
    }

    return { success: true };
  } catch (error) {
    console.error('Error updating profile:', error);
    return { success: false, error };
  }
};

/**
 * Get public profile data (respects privacy settings)
 */
export const getPublicProfile = async (
  userId: string
): Promise<PublicProfile | null> => {
  try {
    const { data, error } = await supabase
      .from('users')
      .select(
        `
        id,
        display_name,
        first_name,
        last_name,
        role,
        bio,
        country,
        city,
        university,
        institution,
        department,
        position,
        major,
        avatar,
        skills,
        academic_interests,
        research_interests,
        social_links,
        profile_views,
        connections,
        endorsements,
        created_at,
        verification_status,
        privacy_settings
      `
      )
      .eq('id', userId)
      .single();

    if (error) {
      console.error('Error fetching public profile:', error);
      return null;
    }

    // Filter data based on privacy settings
    const privacySettings = data.privacy_settings as PrivacySettings;

    return {
      id: data.id,
      display_name: data.display_name,
      first_name: data.first_name,
      last_name: data.last_name,
      role: data.role,
      bio:
        privacySettings?.profileVisibility === 'public' ? data.bio : undefined,
      country: data.country,
      city:
        privacySettings?.contactInfoVisibility === 'public'
          ? data.city
          : undefined,
      university:
        privacySettings?.academicInfoVisibility === 'public'
          ? data.university
          : undefined,
      institution:
        privacySettings?.academicInfoVisibility === 'public'
          ? data.institution
          : undefined,
      department:
        privacySettings?.academicInfoVisibility === 'public'
          ? data.department
          : undefined,
      position:
        privacySettings?.academicInfoVisibility === 'public'
          ? data.position
          : undefined,
      major:
        privacySettings?.academicInfoVisibility === 'public'
          ? data.major
          : undefined,
      avatar: data.avatar,
      skills:
        privacySettings?.portfolioVisibility === 'public'
          ? data.skills
          : undefined,
      academic_interests:
        privacySettings?.academicInfoVisibility === 'public'
          ? data.academic_interests
          : undefined,
      research_interests:
        privacySettings?.academicInfoVisibility === 'public'
          ? data.research_interests
          : undefined,
      social_links:
        privacySettings?.contactInfoVisibility === 'public'
          ? data.social_links
          : undefined,
      profile_views: data.profile_views,
      connections: data.connections,
      endorsements: data.endorsements,
      created_at: data.created_at,
      verification_status: data.verification_status,
    };
  } catch (error) {
    console.error('Error fetching public profile:', error);
    return null;
  }
};

/**
 * Get profile statistics
 */
export const getProfileStats = async (
  userId: string
): Promise<ProfileStats | null> => {
  try {
    const { data, error } = await supabase
      .from('users')
      .select('profile_views, connections, endorsements')
      .eq('id', userId)
      .single();

    if (error) {
      console.error('Error fetching profile stats:', error);
      return null;
    }

    // Get additional stats from other tables
    const [postsResult, applicationsResult, sessionsResult] = await Promise.all(
      [
        supabase
          .from('posts')
          .select('id', { count: 'exact' })
          .eq('author_id', userId),
        supabase
          .from('applications')
          .select('id', { count: 'exact' })
          .eq('applicant_id', userId),
        supabase
          .from('mentorship_sessions')
          .select('id', { count: 'exact' })
          .eq('mentor_id', userId)
          .or(`mentee_id.eq.${userId}`),
      ]
    );

    return {
      profile_views: data.profile_views,
      connections: data.connections,
      endorsements: data.endorsements,
      posts_count: postsResult.count || 0,
      programs_applied: applicationsResult.count || 0,
      mentorship_sessions: sessionsResult.count || 0,
    };
  } catch (error) {
    console.error('Error fetching profile stats:', error);
    return null;
  }
};

/**
 * Increment profile views
 */
export const incrementProfileViews = async (
  userId: string
): Promise<{ success: boolean; error?: any }> => {
  try {
    const { error } = await supabase.rpc('increment_profile_views', {
      user_id: userId,
    });

    if (error) {
      console.error('Error incrementing profile views:', error);
      return { success: false, error };
    }

    return { success: true };
  } catch (error) {
    console.error('Error incrementing profile views:', error);
    return { success: false, error };
  }
};

// =============================================
// AVATAR & FILE UPLOAD
// =============================================

/**
 * Upload avatar image
 */
export const uploadAvatar = async (
  userId: string,
  file: File
): Promise<{ success: boolean; url?: string; error?: any }> => {
  try {
    const fileExt = file.name.split('.').pop();
    const fileName = `${userId}/avatar.${fileExt}`;
    const filePath = `avatars/${fileName}`;

    // Upload file to Supabase Storage
    const { error: uploadError } = await supabase.storage
      .from('profile-images')
      .upload(filePath, file, {
        cacheControl: '3600',
        upsert: true,
      });

    if (uploadError) {
      console.error('Error uploading avatar:', uploadError);
      return { success: false, error: uploadError };
    }

    // Get public URL
    const { data } = supabase.storage
      .from('profile-images')
      .getPublicUrl(filePath);

    // Update user profile with new avatar URL
    const { error: updateError } = await supabase
      .from('users')
      .update({ avatar: data.publicUrl })
      .eq('id', userId);

    if (updateError) {
      console.error('Error updating avatar URL:', updateError);
      return { success: false, error: updateError };
    }

    return { success: true, url: data.publicUrl };
  } catch (error) {
    console.error('Error uploading avatar:', error);
    return { success: false, error };
  }
};

/**
 * Delete avatar
 */
export const deleteAvatar = async (
  userId: string
): Promise<{ success: boolean; error?: any }> => {
  try {
    // Get current avatar URL
    const { data: userData, error: fetchError } = await supabase
      .from('users')
      .select('avatar')
      .eq('id', userId)
      .single();

    if (fetchError) {
      console.error('Error fetching user avatar:', fetchError);
      return { success: false, error: fetchError };
    }

    if (userData.avatar) {
      // Extract file path from URL
      const urlParts = userData.avatar.split('/');
      const fileName = urlParts[urlParts.length - 1];
      const filePath = `avatars/${userId}/${fileName}`;

      // Delete from storage
      const { error: deleteError } = await supabase.storage
        .from('profile-images')
        .remove([filePath]);

      if (deleteError) {
        console.error('Error deleting avatar from storage:', deleteError);
        // Continue with database update even if storage deletion fails
      }
    }

    // Update user profile to remove avatar URL
    const { error: updateError } = await supabase
      .from('users')
      .update({ avatar: null })
      .eq('id', userId);

    if (updateError) {
      console.error('Error removing avatar URL:', updateError);
      return { success: false, error: updateError };
    }

    return { success: true };
  } catch (error) {
    console.error('Error deleting avatar:', error);
    return { success: false, error };
  }
};

// =============================================
// PROFILE SEARCH & DISCOVERY
// =============================================

/**
 * Search profiles by various criteria
 */
export const searchProfiles = async (params: {
  query?: string;
  role?: 'student' | 'professor' | 'university';
  country?: string;
  university?: string;
  skills?: string[];
  academic_interests?: string[];
  limit?: number;
  offset?: number;
}): Promise<{ profiles: PublicProfile[]; total: number; error?: any }> => {
  try {
    let query = supabase.from('users').select(
      `
        id,
        display_name,
        first_name,
        last_name,
        role,
        bio,
        country,
        city,
        university,
        institution,
        department,
        position,
        major,
        avatar,
        skills,
        academic_interests,
        research_interests,
        social_links,
        profile_views,
        connections,
        endorsements,
        created_at,
        verification_status,
        privacy_settings
      `,
      { count: 'exact' }
    );

    // Apply filters
    if (params.role) {
      query = query.eq('role', params.role);
    }

    if (params.country) {
      query = query.eq('country', params.country);
    }

    if (params.university) {
      query = query.ilike('university', `%${params.university}%`);
    }

    if (params.skills && params.skills.length > 0) {
      query = query.overlaps('skills', params.skills);
    }

    if (params.academic_interests && params.academic_interests.length > 0) {
      query = query.overlaps('academic_interests', params.academic_interests);
    }

    // Text search
    if (params.query) {
      query = query.or(`
        display_name.ilike.%${params.query}%,
        bio.ilike.%${params.query}%,
        university.ilike.%${params.query}%,
        institution.ilike.%${params.query}%,
        department.ilike.%${params.query}%,
        position.ilike.%${params.query}%,
        major.ilike.%${params.query}%
      `);
    }

    // Pagination
    const limit = params.limit || 20;
    const offset = params.offset || 0;
    query = query.range(offset, offset + limit - 1);

    // Order by profile views and creation date
    query = query.order('profile_views', { ascending: false });
    query = query.order('created_at', { ascending: false });

    const { data, error, count } = await query;

    if (error) {
      console.error('Error searching profiles:', error);
      return { profiles: [], total: 0, error };
    }

    // Filter data based on privacy settings
    const profiles: PublicProfile[] = (data || []).map((user) => {
      const privacySettings = user.privacy_settings as PrivacySettings;

      return {
        id: user.id,
        display_name: user.display_name,
        first_name: user.first_name,
        last_name: user.last_name,
        role: user.role,
        bio:
          privacySettings?.profileVisibility === 'public'
            ? user.bio
            : undefined,
        country: user.country,
        city:
          privacySettings?.contactInfoVisibility === 'public'
            ? user.city
            : undefined,
        university:
          privacySettings?.academicInfoVisibility === 'public'
            ? user.university
            : undefined,
        institution:
          privacySettings?.academicInfoVisibility === 'public'
            ? user.institution
            : undefined,
        department:
          privacySettings?.academicInfoVisibility === 'public'
            ? user.department
            : undefined,
        position:
          privacySettings?.academicInfoVisibility === 'public'
            ? user.position
            : undefined,
        major:
          privacySettings?.academicInfoVisibility === 'public'
            ? user.major
            : undefined,
        avatar: user.avatar,
        skills:
          privacySettings?.portfolioVisibility === 'public'
            ? user.skills
            : undefined,
        academic_interests:
          privacySettings?.academicInfoVisibility === 'public'
            ? user.academic_interests
            : undefined,
        research_interests:
          privacySettings?.academicInfoVisibility === 'public'
            ? user.research_interests
            : undefined,
        social_links:
          privacySettings?.contactInfoVisibility === 'public'
            ? user.social_links
            : undefined,
        profile_views: user.profile_views,
        connections: user.connections,
        endorsements: user.endorsements,
        created_at: user.created_at,
        verification_status: user.verification_status,
      };
    });

    return { profiles, total: count || 0 };
  } catch (error) {
    console.error('Error searching profiles:', error);
    return { profiles: [], total: 0, error };
  }
};

/**
 * Get featured profiles (high-profile users)
 */
export const getFeaturedProfiles = async (
  limit: number = 10
): Promise<PublicProfile[]> => {
  try {
    const { data, error } = await supabase
      .from('users')
      .select(
        `
        id,
        display_name,
        first_name,
        last_name,
        role,
        bio,
        country,
        city,
        university,
        institution,
        department,
        position,
        major,
        avatar,
        skills,
        academic_interests,
        research_interests,
        social_links,
        profile_views,
        connections,
        endorsements,
        created_at,
        verification_status,
        privacy_settings
      `
      )
      .eq('verification_status', 'verified')
      .gte('profile_views', 100)
      .order('profile_views', { ascending: false })
      .limit(limit);

    if (error) {
      console.error('Error fetching featured profiles:', error);
      return [];
    }

    // Filter data based on privacy settings
    return (data || []).map((user) => {
      const privacySettings = user.privacy_settings as PrivacySettings;

      return {
        id: user.id,
        display_name: user.display_name,
        first_name: user.first_name,
        last_name: user.last_name,
        role: user.role,
        bio:
          privacySettings?.profileVisibility === 'public'
            ? user.bio
            : undefined,
        country: user.country,
        city:
          privacySettings?.contactInfoVisibility === 'public'
            ? user.city
            : undefined,
        university:
          privacySettings?.academicInfoVisibility === 'public'
            ? user.university
            : undefined,
        institution:
          privacySettings?.academicInfoVisibility === 'public'
            ? user.institution
            : undefined,
        department:
          privacySettings?.academicInfoVisibility === 'public'
            ? user.department
            : undefined,
        position:
          privacySettings?.academicInfoVisibility === 'public'
            ? user.position
            : undefined,
        major:
          privacySettings?.academicInfoVisibility === 'public'
            ? user.major
            : undefined,
        avatar: user.avatar,
        skills:
          privacySettings?.portfolioVisibility === 'public'
            ? user.skills
            : undefined,
        academic_interests:
          privacySettings?.academicInfoVisibility === 'public'
            ? user.academic_interests
            : undefined,
        research_interests:
          privacySettings?.academicInfoVisibility === 'public'
            ? user.research_interests
            : undefined,
        social_links:
          privacySettings?.contactInfoVisibility === 'public'
            ? user.social_links
            : undefined,
        profile_views: user.profile_views,
        connections: user.connections,
        endorsements: user.endorsements,
        created_at: user.created_at,
        verification_status: user.verification_status,
      };
    });
  } catch (error) {
    console.error('Error fetching featured profiles:', error);
    return [];
  }
};

// =============================================
// UTILITY FUNCTIONS
// =============================================

/**
 * Convert Supabase user data to UserData interface
 */
const convertSupabaseUserToUserData = (data: any): UserData => {
  return {
    uid: data.id,
    email: data.email,
    displayName: data.display_name,
    role: data.role,
    firstName: data.first_name,
    lastName: data.last_name,
    phoneNumber: data.phone_number,
    bio: data.bio,
    country: data.country,
    city: data.city,
    university: data.university,
    institution: data.institution,
    department: data.department,
    position: data.position,
    major: data.major,
    subjectsTaught: data.subjects_taught,
    academicInterests: data.academic_interests,
    skills: data.skills,
    languages: data.languages,
    experience: data.experience,
    mentorshipInterests: data.mentorship_interests,
    institutionAffiliation: data.institution_affiliation,
    officialUniversityName: data.official_university_name,
    accreditationNumber: data.accreditation_number,
    websiteUrl: data.website_url,
    contactPerson: data.contact_person,
    areasOfInterest: data.areas_of_interest,
    researchInterests: data.research_interests,
    degreeLevel: data.degree_level,
    profileViews: data.profile_views,
    connections: data.connections,
    endorsements: data.endorsements,
    avatar: data.avatar,
    socialLinks: data.social_links,
    workExperience: data.work_experience,
    education: data.education,
    certifications: data.certifications,
    publications: data.publications,
    projects: data.projects,
    portfolio: data.portfolio,
    privacySettings: data.privacy_settings,
    createdAt: data.created_at,
    updatedAt: data.updated_at,
    emailVerified: data.email_verified,
    profileCompleted: data.profile_completed,
  };
};

/**
 * Calculate profile completion percentage
 */
export const calculateProfileCompletion = (userData: UserData): number => {
  const fields = [
    'displayName',
    'firstName',
    'lastName',
    'bio',
    'country',
    'avatar',
    'skills',
    'academicInterests',
  ];

  const roleSpecificFields = {
    student: ['university', 'major', 'degreeLevel'],
    professor: ['institution', 'department', 'position', 'subjectsTaught'],
    university: ['officialUniversityName', 'websiteUrl', 'contactPerson'],
  };

  const roleFields = roleSpecificFields[userData.role] || [];
  const allFields = [...fields, ...roleFields];

  const completedFields = allFields.filter((field) => {
    const value = userData[field as keyof UserData];
    if (Array.isArray(value)) {
      return value.length > 0;
    }
    return value && value.toString().trim() !== '';
  });

  return Math.round((completedFields.length / allFields.length) * 100);
};

/**
 * Get profile completion suggestions
 */
export const getProfileCompletionSuggestions = (
  userData: UserData
): string[] => {
  const suggestions: string[] = [];

  if (!userData.bio) {
    suggestions.push('Add a bio to tell others about yourself');
  }

  if (!userData.avatar) {
    suggestions.push('Upload a profile picture');
  }

  if (!userData.skills || userData.skills.length === 0) {
    suggestions.push('Add your skills and expertise');
  }

  if (!userData.academicInterests || userData.academicInterests.length === 0) {
    suggestions.push('Add your academic interests');
  }

  if (userData.role === 'student') {
    if (!userData.university) {
      suggestions.push('Add your university');
    }
    if (!userData.major) {
      suggestions.push('Add your major/field of study');
    }
  }

  if (userData.role === 'professor') {
    if (!userData.institution) {
      suggestions.push('Add your institution');
    }
    if (!userData.department) {
      suggestions.push('Add your department');
    }
    if (!userData.subjectsTaught || userData.subjectsTaught.length === 0) {
      suggestions.push('Add subjects you teach');
    }
  }

  if (userData.role === 'university') {
    if (!userData.officialUniversityName) {
      suggestions.push('Add your official university name');
    }
    if (!userData.websiteUrl) {
      suggestions.push('Add your website URL');
    }
  }

  return suggestions;
};
