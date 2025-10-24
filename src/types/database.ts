// =============================================
// PHASE 1 DATABASE TYPES
// EdFellow Connect Hub - Complete TypeScript Interfaces
// =============================================

export interface Database {
  public: {
    Tables: {
      // Core Users Table
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
          avatar?: string;
          cv_url?: string;
          cv_file_name?: string;
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
          portfolio?: Array<{
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
            github_url?: string;
            live_url?: string;
            image_url?: string;
            date: string;
            status?: 'completed' | 'in-progress' | 'planned';
            is_public: boolean;
          }>;
          privacy_settings?: {
            profile_visibility: 'public' | 'connections' | 'private';
            contact_info_visibility: 'public' | 'connections' | 'private';
            portfolio_visibility: 'public' | 'connections' | 'private';
            academic_info_visibility: 'public' | 'connections' | 'private';
            experience_visibility: 'public' | 'connections' | 'private';
            allow_messages: boolean;
            allow_connection_requests: boolean;
            show_online_status: boolean;
          };
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
          avatar?: string;
          cv_url?: string;
          cv_file_name?: string;
          social_links?: any;
          work_experience?: any;
          education?: any;
          certifications?: any;
          publications?: any;
          projects?: any;
          portfolio?: any;
          privacy_settings?: any;
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
          avatar?: string;
          cv_url?: string;
          cv_file_name?: string;
          social_links?: any;
          work_experience?: any;
          education?: any;
          certifications?: any;
          publications?: any;
          projects?: any;
          portfolio?: any;
          privacy_settings?: any;
          created_at?: string;
          updated_at?: string;
          email_verified?: boolean;
          profile_completed?: boolean;
          verification_status?: 'pending' | 'verified' | 'rejected';
        };
      };

      // Programs Table
      programs: {
        Row: {
          id: string;
          university_id: string;
          title: string;
          description?: string;
          degree_level?: string;
          duration?: string;
          location?: string;
          cost?: string;
          capacity?: number;
          rating?: number;
          applications_count?: number;
          image_url?: string;
          logo_url?: string;
          tags?: string[];
          is_featured: boolean;
          is_active: boolean;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          university_id: string;
          title: string;
          description?: string;
          degree_level?: string;
          duration?: string;
          location?: string;
          cost?: string;
          capacity?: number;
          rating?: number;
          applications_count?: number;
          image_url?: string;
          logo_url?: string;
          tags?: string[];
          is_featured?: boolean;
          is_active?: boolean;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          university_id?: string;
          title?: string;
          description?: string;
          degree_level?: string;
          duration?: string;
          location?: string;
          cost?: string;
          capacity?: number;
          rating?: number;
          applications_count?: number;
          image_url?: string;
          logo_url?: string;
          tags?: string[];
          is_featured?: boolean;
          is_active?: boolean;
          created_at?: string;
          updated_at?: string;
        };
      };

      // Job Opportunities Table
      job_opportunities: {
        Row: {
          id: string;
          posted_by: string;
          title: string;
          description?: string;
          company_name?: string;
          location?: string;
          job_type:
            | 'full-time'
            | 'part-time'
            | 'internship'
            | 'research'
            | 'contract';
          salary_range?: string;
          requirements?: string[];
          benefits?: string[];
          application_deadline?: string;
          is_active: boolean;
          created_at: string;
        };
        Insert: {
          id?: string;
          posted_by: string;
          title: string;
          description?: string;
          company_name?: string;
          location?: string;
          job_type:
            | 'full-time'
            | 'part-time'
            | 'internship'
            | 'research'
            | 'contract';
          salary_range?: string;
          requirements?: string[];
          benefits?: string[];
          application_deadline?: string;
          is_active?: boolean;
          created_at?: string;
        };
        Update: {
          id?: string;
          posted_by?: string;
          title?: string;
          description?: string;
          company_name?: string;
          location?: string;
          job_type?:
            | 'full-time'
            | 'part-time'
            | 'internship'
            | 'research'
            | 'contract';
          salary_range?: string;
          requirements?: string[];
          benefits?: string[];
          application_deadline?: string;
          is_active?: boolean;
          created_at?: string;
        };
      };

      // Scholarships Table
      scholarships: {
        Row: {
          id: string;
          university_id: string;
          title: string;
          description?: string;
          amount?: string;
          eligibility_criteria?: string;
          application_deadline?: string;
          is_active: boolean;
          created_at: string;
        };
        Insert: {
          id?: string;
          university_id: string;
          title: string;
          description?: string;
          amount?: string;
          eligibility_criteria?: string;
          application_deadline?: string;
          is_active?: boolean;
          created_at?: string;
        };
        Update: {
          id?: string;
          university_id?: string;
          title?: string;
          description?: string;
          amount?: string;
          eligibility_criteria?: string;
          application_deadline?: string;
          is_active?: boolean;
          created_at?: string;
        };
      };

      // Study Groups Table
      study_groups: {
        Row: {
          id: string;
          name: string;
          description?: string;
          category?: string;
          created_by: string;
          image_url?: string;
          member_count: number;
          post_count: number;
          is_public: boolean;
          tags?: string[];
          last_activity: string;
          created_at: string;
        };
        Insert: {
          id?: string;
          name: string;
          description?: string;
          category?: string;
          created_by: string;
          image_url?: string;
          member_count?: number;
          post_count?: number;
          is_public?: boolean;
          tags?: string[];
          last_activity?: string;
          created_at?: string;
        };
        Update: {
          id?: string;
          name?: string;
          description?: string;
          category?: string;
          created_by?: string;
          image_url?: string;
          member_count?: number;
          post_count?: number;
          is_public?: boolean;
          tags?: string[];
          last_activity?: string;
          created_at?: string;
        };
      };

      // Group Memberships Table
      group_memberships: {
        Row: {
          id: string;
          group_id: string;
          user_id: string;
          role: 'admin' | 'moderator' | 'member';
          joined_at: string;
        };
        Insert: {
          id?: string;
          group_id: string;
          user_id: string;
          role?: 'admin' | 'moderator' | 'member';
          joined_at?: string;
        };
        Update: {
          id?: string;
          group_id?: string;
          user_id?: string;
          role?: 'admin' | 'moderator' | 'member';
          joined_at?: string;
        };
      };

      // Group Posts Table
      group_posts: {
        Row: {
          id: string;
          group_id: string;
          author_id: string;
          content: string;
          post_type: 'text' | 'media' | 'article' | 'event' | 'poll';
          media_urls?: string[];
          like_count: number;
          comment_count: number;
          created_at: string;
        };
        Insert: {
          id?: string;
          group_id: string;
          author_id: string;
          content: string;
          post_type?: 'text' | 'media' | 'article' | 'event' | 'poll';
          media_urls?: string[];
          like_count?: number;
          comment_count?: number;
          created_at?: string;
        };
        Update: {
          id?: string;
          group_id?: string;
          author_id?: string;
          content?: string;
          post_type?: 'text' | 'media' | 'article' | 'event' | 'poll';
          media_urls?: string[];
          like_count?: number;
          comment_count?: number;
          created_at?: string;
        };
      };

      // Mentorship Sessions Table
      mentorship_sessions: {
        Row: {
          id: string;
          student_id: string;
          professor_id: string;
          title: string;
          description?: string;
          session_type:
            | 'consultation'
            | 'mentorship'
            | 'advisory'
            | 'research_guidance';
          duration_minutes: number;
          hourly_rate?: number;
          status:
            | 'pending'
            | 'confirmed'
            | 'completed'
            | 'cancelled'
            | 'no_show';
          scheduled_at?: string;
          meeting_link?: string;
          notes?: string;
          student_rating?: number;
          professor_rating?: number;
          student_feedback?: string;
          professor_feedback?: string;
          created_at: string;
        };
        Insert: {
          id?: string;
          student_id: string;
          professor_id: string;
          title: string;
          description?: string;
          session_type:
            | 'consultation'
            | 'mentorship'
            | 'advisory'
            | 'research_guidance';
          duration_minutes?: number;
          hourly_rate?: number;
          status?:
            | 'pending'
            | 'confirmed'
            | 'completed'
            | 'cancelled'
            | 'no_show';
          scheduled_at?: string;
          meeting_link?: string;
          notes?: string;
          student_rating?: number;
          professor_rating?: number;
          student_feedback?: string;
          professor_feedback?: string;
          created_at?: string;
        };
        Update: {
          id?: string;
          student_id?: string;
          professor_id?: string;
          title?: string;
          description?: string;
          session_type?:
            | 'consultation'
            | 'mentorship'
            | 'advisory'
            | 'research_guidance';
          duration_minutes?: number;
          hourly_rate?: number;
          status?:
            | 'pending'
            | 'confirmed'
            | 'completed'
            | 'cancelled'
            | 'no_show';
          scheduled_at?: string;
          meeting_link?: string;
          notes?: string;
          student_rating?: number;
          professor_rating?: number;
          student_feedback?: string;
          professor_feedback?: string;
          created_at?: string;
        };
      };

      // Mentorship Packages Table
      mentorship_packages: {
        Row: {
          id: string;
          professor_id: string;
          title: string;
          description?: string;
          package_type: 'single' | 'package' | 'ongoing';
          sessions_included?: number;
          total_price?: number;
          is_active: boolean;
          created_at: string;
        };
        Insert: {
          id?: string;
          professor_id: string;
          title: string;
          description?: string;
          package_type: 'single' | 'package' | 'ongoing';
          sessions_included?: number;
          total_price?: number;
          is_active?: boolean;
          created_at?: string;
        };
        Update: {
          id?: string;
          professor_id?: string;
          title?: string;
          description?: string;
          package_type?: 'single' | 'package' | 'ongoing';
          sessions_included?: number;
          total_price?: number;
          is_active?: boolean;
          created_at?: string;
        };
      };

      // Professor Availability Table
      professor_availability: {
        Row: {
          id: string;
          professor_id: string;
          day_of_week: number;
          start_time?: string;
          end_time?: string;
          timezone: string;
          is_available: boolean;
          created_at: string;
        };
        Insert: {
          id?: string;
          professor_id: string;
          day_of_week: number;
          start_time?: string;
          end_time?: string;
          timezone?: string;
          is_available?: boolean;
          created_at?: string;
        };
        Update: {
          id?: string;
          professor_id?: string;
          day_of_week?: number;
          start_time?: string;
          end_time?: string;
          timezone?: string;
          is_available?: boolean;
          created_at?: string;
        };
      };

      // User Connections Table
      user_connections: {
        Row: {
          id: string;
          requester_id: string;
          addressee_id: string;
          status: 'pending' | 'accepted' | 'declined' | 'blocked';
          created_at: string;
        };
        Insert: {
          id?: string;
          requester_id: string;
          addressee_id: string;
          status?: 'pending' | 'accepted' | 'declined' | 'blocked';
          created_at?: string;
        };
        Update: {
          id?: string;
          requester_id?: string;
          addressee_id?: string;
          status?: 'pending' | 'accepted' | 'declined' | 'blocked';
          created_at?: string;
        };
      };

      // Connection Requests Table
      connection_requests: {
        Row: {
          id: string;
          from_user_id: string;
          to_user_id: string;
          message?: string;
          status: 'pending' | 'accepted' | 'declined';
          created_at: string;
        };
        Insert: {
          id?: string;
          from_user_id: string;
          to_user_id: string;
          message?: string;
          status?: 'pending' | 'accepted' | 'declined';
          created_at?: string;
        };
        Update: {
          id?: string;
          from_user_id?: string;
          to_user_id?: string;
          message?: string;
          status?: 'pending' | 'accepted' | 'declined';
          created_at?: string;
        };
      };

      // Notifications Table
      notifications: {
        Row: {
          id: string;
          user_id: string;
          type:
            | 'connection_request'
            | 'connection_accepted'
            | 'mentorship_booking'
            | 'mentorship_confirmed'
            | 'group_invite'
            | 'group_post'
            | 'job_application'
            | 'program_application'
            | 'scholarship_application'
            | 'message_received'
            | 'post_liked'
            | 'post_commented'
            | 'post_shared';
          title: string;
          message?: string;
          data?: any;
          is_read: boolean;
          created_at: string;
        };
        Insert: {
          id?: string;
          user_id: string;
          type:
            | 'connection_request'
            | 'connection_accepted'
            | 'mentorship_booking'
            | 'mentorship_confirmed'
            | 'group_invite'
            | 'group_post'
            | 'job_application'
            | 'program_application'
            | 'scholarship_application'
            | 'message_received'
            | 'post_liked'
            | 'post_commented'
            | 'post_shared';
          title: string;
          message?: string;
          data?: any;
          is_read?: boolean;
          created_at?: string;
        };
        Update: {
          id?: string;
          user_id?: string;
          type?:
            | 'connection_request'
            | 'connection_accepted'
            | 'mentorship_booking'
            | 'mentorship_confirmed'
            | 'group_invite'
            | 'group_post'
            | 'job_application'
            | 'program_application'
            | 'scholarship_application'
            | 'message_received'
            | 'post_liked'
            | 'post_commented'
            | 'post_shared';
          title?: string;
          message?: string;
          data?: any;
          is_read?: boolean;
          created_at?: string;
        };
      };

      // Job Applications Table
      job_applications: {
        Row: {
          id: string;
          job_id: string;
          applicant_id: string;
          cover_letter?: string;
          resume_url?: string;
          status:
            | 'pending'
            | 'reviewed'
            | 'shortlisted'
            | 'interviewed'
            | 'accepted'
            | 'rejected';
          applied_at: string;
        };
        Insert: {
          id?: string;
          job_id: string;
          applicant_id: string;
          cover_letter?: string;
          resume_url?: string;
          status?:
            | 'pending'
            | 'reviewed'
            | 'shortlisted'
            | 'interviewed'
            | 'accepted'
            | 'rejected';
          applied_at?: string;
        };
        Update: {
          id?: string;
          job_id?: string;
          applicant_id?: string;
          cover_letter?: string;
          resume_url?: string;
          status?:
            | 'pending'
            | 'reviewed'
            | 'shortlisted'
            | 'interviewed'
            | 'accepted'
            | 'rejected';
          applied_at?: string;
        };
      };

      // Program Applications Table
      program_applications: {
        Row: {
          id: string;
          program_id: string;
          applicant_id: string;
          motivation_letter?: string;
          documents_urls?: string[];
          status:
            | 'pending'
            | 'reviewed'
            | 'shortlisted'
            | 'accepted'
            | 'rejected';
          applied_at: string;
        };
        Insert: {
          id?: string;
          program_id: string;
          applicant_id: string;
          motivation_letter?: string;
          documents_urls?: string[];
          status?:
            | 'pending'
            | 'reviewed'
            | 'shortlisted'
            | 'accepted'
            | 'rejected';
          applied_at?: string;
        };
        Update: {
          id?: string;
          program_id?: string;
          applicant_id?: string;
          motivation_letter?: string;
          documents_urls?: string[];
          status?:
            | 'pending'
            | 'reviewed'
            | 'shortlisted'
            | 'accepted'
            | 'rejected';
          applied_at?: string;
        };
      };

      // Scholarship Applications Table
      scholarship_applications: {
        Row: {
          id: string;
          scholarship_id: string;
          applicant_id: string;
          motivation_letter?: string;
          documents_urls?: string[];
          status:
            | 'pending'
            | 'reviewed'
            | 'shortlisted'
            | 'accepted'
            | 'rejected';
          applied_at: string;
        };
        Insert: {
          id?: string;
          scholarship_id: string;
          applicant_id: string;
          motivation_letter?: string;
          documents_urls?: string[];
          status?:
            | 'pending'
            | 'reviewed'
            | 'shortlisted'
            | 'accepted'
            | 'rejected';
          applied_at?: string;
        };
        Update: {
          id?: string;
          scholarship_id?: string;
          applicant_id?: string;
          motivation_letter?: string;
          documents_urls?: string[];
          status?:
            | 'pending'
            | 'reviewed'
            | 'shortlisted'
            | 'accepted'
            | 'rejected';
          applied_at?: string;
        };
      };

      // Payments Table
      payments: {
        Row: {
          id: string;
          user_id: string;
          session_id: string;
          amount: number;
          currency: string;
          payment_method?: string;
          payment_intent_id?: string;
          status: 'pending' | 'completed' | 'failed' | 'refunded';
          created_at: string;
        };
        Insert: {
          id?: string;
          user_id: string;
          session_id: string;
          amount: number;
          currency?: string;
          payment_method?: string;
          payment_intent_id?: string;
          status?: 'pending' | 'completed' | 'failed' | 'refunded';
          created_at?: string;
        };
        Update: {
          id?: string;
          user_id?: string;
          session_id?: string;
          amount?: number;
          currency?: string;
          payment_method?: string;
          payment_intent_id?: string;
          status?: 'pending' | 'completed' | 'failed' | 'refunded';
          created_at?: string;
        };
      };

      // Posts Table (Feed System)
      posts: {
        Row: {
          id: string;
          author_id: string;
          content: string;
          post_type: 'text' | 'media' | 'article' | 'event' | 'poll';
          media_urls: string[];
          article_data?: any;
          event_data?: any;
          poll_data?: any;
          tags: string[];
          visibility: 'public' | 'connections' | 'private';
          is_pinned: boolean;
          is_highlighted: boolean;
          like_count: number;
          comment_count: number;
          share_count: number;
          view_count: number;
          created_at: string;
          updated_at: string;
          deleted_at?: string;
        };
        Insert: {
          id?: string;
          author_id: string;
          content: string;
          post_type?: 'text' | 'media' | 'article' | 'event' | 'poll';
          media_urls?: string[];
          article_data?: any;
          event_data?: any;
          poll_data?: any;
          tags?: string[];
          visibility?: 'public' | 'connections' | 'private';
          is_pinned?: boolean;
          is_highlighted?: boolean;
          like_count?: number;
          comment_count?: number;
          share_count?: number;
          view_count?: number;
          created_at?: string;
          updated_at?: string;
          deleted_at?: string;
        };
        Update: {
          id?: string;
          author_id?: string;
          content?: string;
          post_type?: 'text' | 'media' | 'article' | 'event' | 'poll';
          media_urls?: string[];
          article_data?: any;
          event_data?: any;
          poll_data?: any;
          tags?: string[];
          visibility?: 'public' | 'connections' | 'private';
          is_pinned?: boolean;
          is_highlighted?: boolean;
          like_count?: number;
          comment_count?: number;
          share_count?: number;
          view_count?: number;
          created_at?: string;
          updated_at?: string;
          deleted_at?: string;
        };
      };

      // Comments Table
      comments: {
        Row: {
          id: string;
          post_id: string;
          author_id: string;
          parent_comment_id?: string;
          content: string;
          media_urls: string[];
          like_count: number;
          reply_count: number;
          created_at: string;
          updated_at: string;
          deleted_at?: string;
        };
        Insert: {
          id?: string;
          post_id: string;
          author_id: string;
          parent_comment_id?: string;
          content: string;
          media_urls?: string[];
          like_count?: number;
          reply_count?: number;
          created_at?: string;
          updated_at?: string;
          deleted_at?: string;
        };
        Update: {
          id?: string;
          post_id?: string;
          author_id?: string;
          parent_comment_id?: string;
          content?: string;
          media_urls?: string[];
          like_count?: number;
          reply_count?: number;
          created_at?: string;
          updated_at?: string;
          deleted_at?: string;
        };
      };

      // Post Likes Table
      post_likes: {
        Row: {
          id: string;
          post_id: string;
          user_id: string;
          created_at: string;
        };
        Insert: {
          id?: string;
          post_id: string;
          user_id: string;
          created_at?: string;
        };
        Update: {
          id?: string;
          post_id?: string;
          user_id?: string;
          created_at?: string;
        };
      };
    };
  };
}

// =============================================
// HELPER TYPES FOR COMMON OPERATIONS
// =============================================

export type Tables<T extends keyof Database['public']['Tables']> =
  Database['public']['Tables'][T]['Row'];
// Note: Enums are not currently defined in the Database interface
// export type Enums<T extends keyof Database['public']['Enums']> =
//   Database['public']['Enums'][T];

// User types
export type User = Tables<'users'>;
export type UserInsert = Database['public']['Tables']['users']['Insert'];
export type UserUpdate = Database['public']['Tables']['users']['Update'];

// Program types
export type Program = Tables<'programs'>;
export type ProgramInsert = Database['public']['Tables']['programs']['Insert'];
export type ProgramUpdate = Database['public']['Tables']['programs']['Update'];

// Job opportunity types
export type JobOpportunity = Tables<'job_opportunities'>;
export type JobOpportunityInsert =
  Database['public']['Tables']['job_opportunities']['Insert'];
export type JobOpportunityUpdate =
  Database['public']['Tables']['job_opportunities']['Update'];

// Study group types
export type StudyGroup = Tables<'study_groups'>;
export type StudyGroupInsert =
  Database['public']['Tables']['study_groups']['Insert'];
export type StudyGroupUpdate =
  Database['public']['Tables']['study_groups']['Update'];

// Mentorship session types
export type MentorshipSession = Tables<'mentorship_sessions'>;
export type MentorshipSessionInsert =
  Database['public']['Tables']['mentorship_sessions']['Insert'];
export type MentorshipSessionUpdate =
  Database['public']['Tables']['mentorship_sessions']['Update'];

// Post types
export type Post = Tables<'posts'>;
export type PostInsert = Database['public']['Tables']['posts']['Insert'];
export type PostUpdate = Database['public']['Tables']['posts']['Update'];

// Comment types
export type Comment = Tables<'comments'>;
export type CommentInsert = Database['public']['Tables']['comments']['Insert'];
export type CommentUpdate = Database['public']['Tables']['comments']['Update'];

// Notification types
export type Notification = Tables<'notifications'>;
export type NotificationInsert =
  Database['public']['Tables']['notifications']['Insert'];
export type NotificationUpdate =
  Database['public']['Tables']['notifications']['Update'];

// =============================================
// EXTENDED TYPES WITH RELATIONSHIPS
// =============================================

export interface ProgramWithUniversity extends Program {
  university: User;
}

export interface JobOpportunityWithPoster extends JobOpportunity {
  posted_by_user: User;
}

export interface StudyGroupWithCreator extends StudyGroup {
  created_by_user: User;
}

export interface MentorshipSessionWithUsers extends MentorshipSession {
  student: User;
  professor: User;
}

export interface PostWithAuthor extends Post {
  author: User;
}

export interface CommentWithAuthor extends Comment {
  author: User;
}

export interface NotificationWithData extends Notification {
  related_user?: User;
  related_post?: Post;
  related_group?: StudyGroup;
}
