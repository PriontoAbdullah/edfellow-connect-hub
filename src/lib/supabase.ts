import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseKey) {
  throw new Error('Missing Supabase environment variables');
}

export const supabase = createClient(supabaseUrl, supabaseKey);

// Database types
export interface Database {
  public: {
    Tables: {
      users: {
        Row: {
          id: string;
          email: string;
          display_name: string;
          role: 'student' | 'professor' | 'university';
          first_name: string;
          last_name: string;
          phone_number?: string;
          bio?: string;
          country: string;
          city?: string;
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
          profile_views?: number;
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
          created_at: string;
          updated_at: string;
          email_verified: boolean;
          profile_completed: boolean;
          verification_status?: 'pending' | 'verified' | 'rejected';
        };
        Insert: {
          id: string;
          email: string;
          display_name: string;
          role: 'student' | 'professor' | 'university';
          first_name: string;
          last_name: string;
          phone_number?: string;
          bio?: string;
          country: string;
          city?: string;
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
          profile_views?: number;
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
          created_at?: string;
          updated_at?: string;
          email_verified?: boolean;
          profile_completed?: boolean;
          verification_status?: 'pending' | 'verified' | 'rejected';
        };
        Update: {
          id?: string;
          email?: string;
          display_name?: string;
          role?: 'student' | 'professor' | 'university';
          first_name?: string;
          last_name?: string;
          phone_number?: string;
          bio?: string;
          country?: string;
          city?: string;
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
          profile_views?: number;
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
          created_at?: string;
          updated_at?: string;
          email_verified?: boolean;
          profile_completed?: boolean;
          verification_status?: 'pending' | 'verified' | 'rejected';
        };
      };
    };
  };
}
