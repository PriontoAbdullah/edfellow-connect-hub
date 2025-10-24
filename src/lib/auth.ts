import { supabase } from './supabase';
import type { User } from '@supabase/supabase-js';

// Portfolio item interface
export interface PortfolioItem {
  id: string;
  title: string;
  description: string;
  type:
    | 'project'
    | 'achievement'
    | 'certification'
    | 'publication'
    | 'document';
  category: string;
  technologies?: string[];
  url?: string;
  githubUrl?: string;
  liveUrl?: string;
  imageUrl?: string;
  date: string;
  status?: 'completed' | 'in-progress' | 'planned';
  isPublic: boolean;
}

// Privacy settings interface
export interface PrivacySettings {
  profileVisibility: 'public' | 'connections' | 'private';
  contactInfoVisibility: 'public' | 'connections' | 'private';
  portfolioVisibility: 'public' | 'connections' | 'private';
  academicInfoVisibility: 'public' | 'connections' | 'private';
  experienceVisibility: 'public' | 'connections' | 'private';
  allowMessages: boolean;
  allowConnectionRequests: boolean;
  showOnlineStatus: boolean;
}

// User data interface
export interface UserData {
  uid: string;
  email: string;
  displayName: string;
  role: 'student' | 'professor' | 'university';
  firstName: string;
  lastName: string;
  phoneNumber?: string;
  bio?: string;
  country: string;
  city?: string;
  university?: string;
  institution?: string;
  department?: string;
  position?: string;
  major?: string;
  subjectsTaught?: string[];
  academicInterests?: string[];
  skills?: string[];
  languages?: string[];
  experience?: string;
  mentorshipInterests?: string[];
  institutionAffiliation?: string;
  officialUniversityName?: string;
  accreditationNumber?: string;
  websiteUrl?: string;
  contactPerson?: string;
  areasOfInterest?: string[];
  researchInterests?: string[];
  degreeLevel?: string;
  portfolio?: PortfolioItem[];
  privacySettings?: PrivacySettings;
  profileViews?: number;
  connections?: number;
  endorsements?: number;
  avatar?: string;
  rating?: number;
  socialLinks?: {
    linkedin?: string;
    github?: string;
    twitter?: string;
    website?: string;
  };
  cvUrl?: string;
  cvFileName?: string;
  // Extended portfolio sections
  workExperience?: Array<{
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
  createdAt: string;
  updatedAt: string;
  emailVerified: boolean;
  profileCompleted: boolean;
  verificationStatus?: 'pending' | 'verified' | 'rejected';
}

// Convert Supabase user data to our UserData format
const convertSupabaseUserToUserData = (supabaseUser: any): UserData => {
  return {
    uid: supabaseUser.id,
    email: supabaseUser.email,
    displayName: supabaseUser.display_name,
    role: supabaseUser.role,
    firstName: supabaseUser.first_name,
    lastName: supabaseUser.last_name,
    phoneNumber: supabaseUser.phone_number,
    bio: supabaseUser.bio,
    country: supabaseUser.country,
    city: supabaseUser.city,
    university: supabaseUser.university,
    institution: supabaseUser.institution,
    department: supabaseUser.department,
    position: supabaseUser.position,
    major: supabaseUser.major,
    subjectsTaught: supabaseUser.subjects_taught,
    academicInterests: supabaseUser.academic_interests,
    skills: supabaseUser.skills,
    languages: supabaseUser.languages,
    experience: supabaseUser.experience,
    mentorshipInterests: supabaseUser.mentorship_interests,
    institutionAffiliation: supabaseUser.institution_affiliation,
    officialUniversityName: supabaseUser.official_university_name,
    accreditationNumber: supabaseUser.accreditation_number,
    websiteUrl: supabaseUser.website_url,
    contactPerson: supabaseUser.contact_person,
    areasOfInterest: supabaseUser.areas_of_interest,
    researchInterests: supabaseUser.research_interests,
    degreeLevel: supabaseUser.degree_level,
    profileViews: supabaseUser.profile_views,
    connections: supabaseUser.connections,
    endorsements: supabaseUser.endorsements,
    avatar: supabaseUser.avatar,
    socialLinks: supabaseUser.social_links,
    cvUrl: supabaseUser.cv_url,
    cvFileName: supabaseUser.cv_file_name,
    workExperience: supabaseUser.work_experience,
    education: supabaseUser.education,
    certifications: supabaseUser.certifications,
    publications: supabaseUser.publications,
    projects: supabaseUser.projects,
    portfolio: supabaseUser.portfolio,
    privacySettings: supabaseUser.privacy_settings,
    createdAt: supabaseUser.created_at,
    updatedAt: supabaseUser.updated_at,
    emailVerified: supabaseUser.email_verified,
    profileCompleted: supabaseUser.profile_completed,
    verificationStatus: supabaseUser.verification_status,
  };
};

// Convert our UserData format to Supabase format
const convertUserDataToSupabase = (userData: Partial<UserData>): any => {
  return {
    id: userData.uid,
    email: userData.email,
    display_name: userData.displayName,
    role: userData.role,
    first_name: userData.firstName,
    last_name: userData.lastName,
    phone_number: userData.phoneNumber,
    bio: userData.bio,
    country: userData.country,
    city: userData.city,
    university: userData.university,
    institution: userData.institution,
    department: userData.department,
    position: userData.position,
    major: userData.major,
    subjects_taught: userData.subjectsTaught,
    academic_interests: userData.academicInterests,
    skills: userData.skills,
    languages: userData.languages,
    experience: userData.experience,
    mentorship_interests: userData.mentorshipInterests,
    institution_affiliation: userData.institutionAffiliation,
    official_university_name: userData.officialUniversityName,
    accreditation_number: userData.accreditationNumber,
    website_url: userData.websiteUrl,
    contact_person: userData.contactPerson,
    areas_of_interest: userData.areasOfInterest,
    research_interests: userData.researchInterests,
    degree_level: userData.degreeLevel,
    profile_views: userData.profileViews,
    connections: userData.connections,
    endorsements: userData.endorsements,
    avatar: userData.avatar,
    social_links: userData.socialLinks,
    cv_url: userData.cvUrl,
    cv_file_name: userData.cvFileName,
    work_experience: userData.workExperience,
    education: userData.education,
    certifications: userData.certifications,
    publications: userData.publications,
    projects: userData.projects,
    portfolio: userData.portfolio,
    privacy_settings: userData.privacySettings,
    created_at: userData.createdAt,
    updated_at: userData.updatedAt,
    email_verified: userData.emailVerified,
    profile_completed: userData.profileCompleted,
    verification_status: userData.verificationStatus,
  };
};

// Register a new user
export const registerUser = async (
  email: string,
  password: string,
  userData: Partial<UserData>
): Promise<{ user: User | null; error: any }> => {
  try {
    // Sign up user with Supabase Auth (without metadata to avoid trigger issues)
    const { data, error } = await supabase.auth.signUp({
      email,
      password,
    });

    if (error) {
      throw error;
    }

    if (data.user) {
      // Create user profile in the users table
      const supabaseUserData = convertUserDataToSupabase({
        uid: data.user.id,
        email: data.user.email!,
        displayName: `${userData.firstName} ${userData.lastName}`,
        role: userData.role!,
        firstName: userData.firstName!,
        lastName: userData.lastName!,
        phoneNumber: userData.phoneNumber,
        country: userData.country!,
        city: userData.city,
        university: userData.university,
        institution: userData.institution,
        department: userData.department,
        position: userData.position,
        major: userData.major,
        subjectsTaught: userData.subjectsTaught || [],
        institutionAffiliation: userData.institutionAffiliation,
        officialUniversityName: userData.officialUniversityName,
        accreditationNumber: userData.accreditationNumber,
        websiteUrl: userData.websiteUrl,
        contactPerson: userData.contactPerson,
        areasOfInterest: userData.areasOfInterest || [],
        researchInterests: userData.researchInterests || [],
        degreeLevel: userData.degreeLevel,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
        emailVerified: false,
        profileCompleted: false,
        verificationStatus:
          userData.role === 'student' ? 'verified' : 'pending',
      });

      const { error: insertError } = await supabase
        .from('users')
        .insert([supabaseUserData]);

      if (insertError) {
        console.error('Error creating user profile:', insertError);
        throw insertError;
      }
    }

    return { user: data.user, error: null };
  } catch (error) {
    console.error('Error registering user:', error);
    return { user: null, error };
  }
};

// Sign in user
export const signInUser = async (
  email: string,
  password: string
): Promise<{ user: User | null; error: any }> => {
  try {
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    return { user: data.user, error };
  } catch (error) {
    console.error('Error signing in user:', error);
    return { user: null, error };
  }
};

// Sign out user
export const signOutUser = async (): Promise<{ error: any }> => {
  try {
    console.log('Calling supabase.auth.signOut()...');
    const { error } = await supabase.auth.signOut();

    if (error) {
      console.error('Supabase signOut error:', error);
      return { error };
    }

    console.log('Supabase signOut successful');
    return { error: null };
  } catch (error) {
    console.error('Error signing out user:', error);
    return { error };
  }
};

// Get user data from Supabase
export const getUserData = async (uid: string): Promise<UserData | null> => {
  try {
    const { data, error } = await supabase
      .from('users')
      .select('*')
      .eq('id', uid)
      .single();

    if (error) {
      console.error('Error getting user data:', error);
      return null;
    }

    return convertSupabaseUserToUserData(data);
  } catch (error) {
    console.error('Error getting user data:', error);
    return null;
  }
};

// Update user data in Supabase
export const updateUserData = async (
  uid: string,
  userData: Partial<UserData>
): Promise<{ error: any }> => {
  try {
    const supabaseUserData = convertUserDataToSupabase({
      ...userData,
      updatedAt: new Date().toISOString(),
    });

    const { error } = await supabase
      .from('users')
      .update(supabaseUserData)
      .eq('id', uid);

    return { error };
  } catch (error) {
    console.error('Error updating user data:', error);
    return { error };
  }
};

// Send password reset email
export const resetPassword = async (email: string): Promise<{ error: any }> => {
  try {
    const { error } = await supabase.auth.resetPasswordForEmail(email);
    return { error };
  } catch (error) {
    console.error('Error sending password reset email:', error);
    return { error };
  }
};

// Check if user has completed profile
export const checkProfileCompletion = async (uid: string): Promise<boolean> => {
  try {
    const userData = await getUserData(uid);
    return userData?.profileCompleted || false;
  } catch (error) {
    console.error('Error checking profile completion:', error);
    return false;
  }
};

// Get current user
export const getCurrentUser = async (): Promise<User | null> => {
  try {
    const {
      data: { user },
    } = await supabase.auth.getUser();
    return user;
  } catch (error) {
    console.error('Error getting current user:', error);
    return null;
  }
};

// Listen to auth state changes
export const onAuthStateChange = (callback: (user: User | null) => void) => {
  return supabase.auth.onAuthStateChange((event, session) => {
    callback(session?.user ?? null);
  });
};
