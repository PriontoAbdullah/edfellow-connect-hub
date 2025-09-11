-- =============================================
-- PHASE 1 COMPLETE DATABASE SCHEMA
-- EdFellow Connect Hub - All Phase 1 Features
-- =============================================

-- Drop existing triggers and functions that might cause issues
DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;
DROP FUNCTION IF EXISTS public.handle_new_user();

-- =============================================
-- CORE USERS TABLE (Already exists, but adding missing columns)
-- =============================================
CREATE TABLE IF NOT EXISTS public.users (
  id UUID PRIMARY KEY,
  email TEXT NOT NULL,
  display_name TEXT NOT NULL,
  role TEXT NOT NULL CHECK (role IN ('student', 'professor', 'university')),
  first_name TEXT NOT NULL,
  last_name TEXT NOT NULL,
  phone_number TEXT,
  bio TEXT,
  country TEXT NOT NULL,
  city TEXT,
  university TEXT,
  institution TEXT,
  department TEXT,
  position TEXT,
  major TEXT,
  subjects_taught TEXT[],
  academic_interests TEXT[],
  skills TEXT[],
  languages TEXT[],
  experience TEXT,
  mentorship_interests TEXT[],
  institution_affiliation TEXT,
  official_university_name TEXT,
  accreditation_number TEXT,
  website_url TEXT,
  contact_person TEXT,
  areas_of_interest TEXT[],
  research_interests TEXT[],
  degree_level TEXT,
  profile_views INTEGER DEFAULT 0,
  connections INTEGER DEFAULT 0,
  endorsements INTEGER DEFAULT 0,
  avatar TEXT,
  social_links JSONB,
  work_experience JSONB,
  education JSONB,
  certifications JSONB,
  publications JSONB,
  projects JSONB,
  portfolio JSONB,
  privacy_settings JSONB,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  email_verified BOOLEAN DEFAULT FALSE,
  profile_completed BOOLEAN DEFAULT FALSE,
  verification_status TEXT CHECK (verification_status IN ('pending', 'verified', 'rejected'))
);

-- Add foreign key constraint after table creation (if it doesn't exist)
DO $$
BEGIN
    IF NOT EXISTS (
        SELECT 1 FROM information_schema.table_constraints 
        WHERE constraint_name = 'fk_users_auth_id' 
        AND table_name = 'users' 
        AND table_schema = 'public'
    ) THEN
        ALTER TABLE public.users 
        ADD CONSTRAINT fk_users_auth_id 
        FOREIGN KEY (id) REFERENCES auth.users(id) ON DELETE CASCADE;
    END IF;
END $$;

-- =============================================
-- PROGRAMS & OPPORTUNITIES
-- =============================================

-- Featured programs for landing page and university management
CREATE TABLE IF NOT EXISTS public.programs (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  university_id UUID REFERENCES users(id) ON DELETE CASCADE,
  title TEXT NOT NULL,
  description TEXT,
  degree_level TEXT,
  duration TEXT,
  location TEXT,
  cost TEXT,
  capacity INTEGER,
  rating DECIMAL(3,2) DEFAULT 0,
  applications_count INTEGER DEFAULT 0,
  image_url TEXT,
  logo_url TEXT,
  tags TEXT[],
  is_featured BOOLEAN DEFAULT FALSE,
  is_active BOOLEAN DEFAULT TRUE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Job opportunities posted by professors and universities
CREATE TABLE IF NOT EXISTS public.job_opportunities (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  posted_by UUID REFERENCES users(id) ON DELETE CASCADE,
  title TEXT NOT NULL,
  description TEXT,
  company_name TEXT,
  location TEXT,
  job_type TEXT CHECK (job_type IN ('full-time', 'part-time', 'internship', 'research', 'contract')),
  salary_range TEXT,
  requirements TEXT[],
  benefits TEXT[],
  application_deadline DATE,
  is_active BOOLEAN DEFAULT TRUE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Scholarships offered by universities
CREATE TABLE IF NOT EXISTS public.scholarships (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  university_id UUID REFERENCES users(id) ON DELETE CASCADE,
  title TEXT NOT NULL,
  description TEXT,
  amount TEXT,
  eligibility_criteria TEXT,
  application_deadline DATE,
  is_active BOOLEAN DEFAULT TRUE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- =============================================
-- GROUPS & FORUMS
-- =============================================

-- Study groups (created by professors only)
CREATE TABLE IF NOT EXISTS public.study_groups (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  description TEXT,
  category TEXT,
  created_by UUID REFERENCES users(id) ON DELETE CASCADE,
  image_url TEXT,
  member_count INTEGER DEFAULT 0,
  post_count INTEGER DEFAULT 0,
  is_public BOOLEAN DEFAULT TRUE,
  tags TEXT[],
  last_activity TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Group memberships
CREATE TABLE IF NOT EXISTS public.group_memberships (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  group_id UUID REFERENCES study_groups(id) ON DELETE CASCADE,
  user_id UUID REFERENCES users(id) ON DELETE CASCADE,
  role TEXT DEFAULT 'member' CHECK (role IN ('admin', 'moderator', 'member')),
  joined_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  UNIQUE(group_id, user_id)
);

-- Group posts (separate from main feed)
CREATE TABLE IF NOT EXISTS public.group_posts (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  group_id UUID REFERENCES study_groups(id) ON DELETE CASCADE,
  author_id UUID REFERENCES users(id) ON DELETE CASCADE,
  content TEXT NOT NULL,
  post_type TEXT DEFAULT 'text' CHECK (post_type IN ('text', 'media', 'article', 'event', 'poll')),
  media_urls TEXT[],
  like_count INTEGER DEFAULT 0,
  comment_count INTEGER DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- =============================================
-- MENTORSHIP SYSTEM
-- =============================================

-- Mentorship sessions
CREATE TABLE IF NOT EXISTS public.mentorship_sessions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  student_id UUID REFERENCES users(id) ON DELETE CASCADE,
  professor_id UUID REFERENCES users(id) ON DELETE CASCADE,
  title TEXT NOT NULL,
  description TEXT,
  session_type TEXT CHECK (session_type IN ('consultation', 'mentorship', 'advisory', 'research_guidance')),
  duration_minutes INTEGER DEFAULT 60,
  hourly_rate DECIMAL(10,2),
  status TEXT DEFAULT 'pending' CHECK (status IN ('pending', 'confirmed', 'completed', 'cancelled', 'no_show')),
  scheduled_at TIMESTAMP WITH TIME ZONE,
  meeting_link TEXT,
  notes TEXT,
  student_rating INTEGER CHECK (student_rating >= 1 AND student_rating <= 5),
  professor_rating INTEGER CHECK (professor_rating >= 1 AND professor_rating <= 5),
  student_feedback TEXT,
  professor_feedback TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Mentorship packages
CREATE TABLE IF NOT EXISTS public.mentorship_packages (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  professor_id UUID REFERENCES users(id) ON DELETE CASCADE,
  title TEXT NOT NULL,
  description TEXT,
  package_type TEXT CHECK (package_type IN ('single', 'package', 'ongoing')),
  sessions_included INTEGER,
  total_price DECIMAL(10,2),
  is_active BOOLEAN DEFAULT TRUE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Professor availability
CREATE TABLE IF NOT EXISTS public.professor_availability (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  professor_id UUID REFERENCES users(id) ON DELETE CASCADE,
  day_of_week INTEGER CHECK (day_of_week >= 0 AND day_of_week <= 6), -- 0 = Sunday
  start_time TIME,
  end_time TIME,
  timezone TEXT DEFAULT 'UTC',
  is_available BOOLEAN DEFAULT TRUE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- =============================================
-- CONNECTIONS & NETWORKING
-- =============================================

-- User connections
CREATE TABLE IF NOT EXISTS public.user_connections (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  requester_id UUID REFERENCES users(id) ON DELETE CASCADE,
  addressee_id UUID REFERENCES users(id) ON DELETE CASCADE,
  status TEXT DEFAULT 'pending' CHECK (status IN ('pending', 'accepted', 'declined', 'blocked')),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  UNIQUE(requester_id, addressee_id),
  CHECK (requester_id != addressee_id)
);

-- Connection requests
CREATE TABLE IF NOT EXISTS public.connection_requests (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  from_user_id UUID REFERENCES users(id) ON DELETE CASCADE,
  to_user_id UUID REFERENCES users(id) ON DELETE CASCADE,
  message TEXT,
  status TEXT DEFAULT 'pending' CHECK (status IN ('pending', 'accepted', 'declined')),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  UNIQUE(from_user_id, to_user_id),
  CHECK (from_user_id != to_user_id)
);

-- =============================================
-- NOTIFICATIONS
-- =============================================

-- User notifications
CREATE TABLE IF NOT EXISTS public.notifications (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES users(id) ON DELETE CASCADE,
  type TEXT NOT NULL CHECK (type IN (
    'connection_request', 
    'connection_accepted', 
    'mentorship_booking', 
    'mentorship_confirmed',
    'group_invite', 
    'group_post', 
    'job_application',
    'program_application',
    'scholarship_application',
    'message_received',
    'post_liked',
    'post_commented',
    'post_shared'
  )),
  title TEXT NOT NULL,
  message TEXT,
  data JSONB, -- Additional data for the notification
  is_read BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- =============================================
-- APPLICATIONS & TRACKING
-- =============================================

-- Job applications
CREATE TABLE IF NOT EXISTS public.job_applications (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  job_id UUID REFERENCES job_opportunities(id) ON DELETE CASCADE,
  applicant_id UUID REFERENCES users(id) ON DELETE CASCADE,
  cover_letter TEXT,
  resume_url TEXT,
  status TEXT DEFAULT 'pending' CHECK (status IN ('pending', 'reviewed', 'shortlisted', 'interviewed', 'accepted', 'rejected')),
  applied_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  UNIQUE(job_id, applicant_id)
);

-- Program applications
CREATE TABLE IF NOT EXISTS public.program_applications (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  program_id UUID REFERENCES programs(id) ON DELETE CASCADE,
  applicant_id UUID REFERENCES users(id) ON DELETE CASCADE,
  motivation_letter TEXT,
  documents_urls TEXT[],
  status TEXT DEFAULT 'pending' CHECK (status IN ('pending', 'reviewed', 'shortlisted', 'accepted', 'rejected')),
  applied_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  UNIQUE(program_id, applicant_id)
);

-- Scholarship applications
CREATE TABLE IF NOT EXISTS public.scholarship_applications (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  scholarship_id UUID REFERENCES scholarships(id) ON DELETE CASCADE,
  applicant_id UUID REFERENCES users(id) ON DELETE CASCADE,
  motivation_letter TEXT,
  documents_urls TEXT[],
  status TEXT DEFAULT 'pending' CHECK (status IN ('pending', 'reviewed', 'shortlisted', 'accepted', 'rejected')),
  applied_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  UNIQUE(scholarship_id, applicant_id)
);

-- =============================================
-- PAYMENT & TRANSACTIONS
-- =============================================

-- Payment transactions
CREATE TABLE IF NOT EXISTS public.payments (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES users(id) ON DELETE CASCADE,
  session_id UUID REFERENCES mentorship_sessions(id) ON DELETE CASCADE,
  amount DECIMAL(10,2) NOT NULL,
  currency TEXT DEFAULT 'USD',
  payment_method TEXT,
  payment_intent_id TEXT, -- Stripe payment intent ID
  status TEXT CHECK (status IN ('pending', 'completed', 'failed', 'refunded')),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- =============================================
-- FEED SYSTEM (Already exists, but ensuring completeness)
-- =============================================

-- Posts table (if not exists)
CREATE TABLE IF NOT EXISTS public.posts (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  author_id UUID NOT NULL REFERENCES public.users(id) ON DELETE CASCADE,
  content TEXT NOT NULL,
  post_type TEXT NOT NULL DEFAULT 'text' CHECK (post_type IN ('text', 'media', 'article', 'event', 'poll')),
  media_urls TEXT[] DEFAULT '{}',
  article_data JSONB,
  event_data JSONB,
  poll_data JSONB,
  tags TEXT[] DEFAULT '{}',
  visibility TEXT NOT NULL DEFAULT 'public' CHECK (visibility IN ('public', 'connections', 'private')),
  is_pinned BOOLEAN DEFAULT FALSE,
  is_highlighted BOOLEAN DEFAULT FALSE,
  like_count INTEGER DEFAULT 0,
  comment_count INTEGER DEFAULT 0,
  share_count INTEGER DEFAULT 0,
  view_count INTEGER DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  deleted_at TIMESTAMP WITH TIME ZONE
);

-- Comments table (if not exists)
CREATE TABLE IF NOT EXISTS public.comments (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  post_id UUID NOT NULL REFERENCES public.posts(id) ON DELETE CASCADE,
  author_id UUID NOT NULL REFERENCES public.users(id) ON DELETE CASCADE,
  parent_comment_id UUID REFERENCES public.comments(id) ON DELETE CASCADE,
  content TEXT NOT NULL,
  media_urls TEXT[] DEFAULT '{}',
  like_count INTEGER DEFAULT 0,
  reply_count INTEGER DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  deleted_at TIMESTAMP WITH TIME ZONE
);

-- Post likes table (if not exists)
CREATE TABLE IF NOT EXISTS public.post_likes (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  post_id UUID NOT NULL REFERENCES public.posts(id) ON DELETE CASCADE,
  user_id UUID NOT NULL REFERENCES public.users(id) ON DELETE CASCADE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  UNIQUE(post_id, user_id)
);

-- =============================================
-- INDEXES FOR PERFORMANCE
-- =============================================

-- Users table indexes
CREATE INDEX IF NOT EXISTS idx_users_role ON public.users(role);
CREATE INDEX IF NOT EXISTS idx_users_country ON public.users(country);
CREATE INDEX IF NOT EXISTS idx_users_major ON public.users(major);
CREATE INDEX IF NOT EXISTS idx_users_verification_status ON public.users(verification_status);

-- Programs indexes
CREATE INDEX IF NOT EXISTS idx_programs_university_id ON public.programs(university_id);
CREATE INDEX IF NOT EXISTS idx_programs_is_featured ON public.programs(is_featured);
CREATE INDEX IF NOT EXISTS idx_programs_tags ON public.programs USING GIN(tags);

-- Job opportunities indexes
CREATE INDEX IF NOT EXISTS idx_job_opportunities_posted_by ON public.job_opportunities(posted_by);
CREATE INDEX IF NOT EXISTS idx_job_opportunities_job_type ON public.job_opportunities(job_type);
CREATE INDEX IF NOT EXISTS idx_job_opportunities_location ON public.job_opportunities(location);

-- Study groups indexes
CREATE INDEX IF NOT EXISTS idx_study_groups_created_by ON public.study_groups(created_by);
CREATE INDEX IF NOT EXISTS idx_study_groups_category ON public.study_groups(category);
CREATE INDEX IF NOT EXISTS idx_study_groups_tags ON public.study_groups USING GIN(tags);

-- Group memberships indexes
CREATE INDEX IF NOT EXISTS idx_group_memberships_group_id ON public.group_memberships(group_id);
CREATE INDEX IF NOT EXISTS idx_group_memberships_user_id ON public.group_memberships(user_id);

-- Mentorship sessions indexes
CREATE INDEX IF NOT EXISTS idx_mentorship_sessions_student_id ON public.mentorship_sessions(student_id);
CREATE INDEX IF NOT EXISTS idx_mentorship_sessions_professor_id ON public.mentorship_sessions(professor_id);
CREATE INDEX IF NOT EXISTS idx_mentorship_sessions_status ON public.mentorship_sessions(status);
CREATE INDEX IF NOT EXISTS idx_mentorship_sessions_scheduled_at ON public.mentorship_sessions(scheduled_at);

-- User connections indexes
CREATE INDEX IF NOT EXISTS idx_user_connections_requester_id ON public.user_connections(requester_id);
CREATE INDEX IF NOT EXISTS idx_user_connections_addressee_id ON public.user_connections(addressee_id);
CREATE INDEX IF NOT EXISTS idx_user_connections_status ON public.user_connections(status);

-- Notifications indexes
CREATE INDEX IF NOT EXISTS idx_notifications_user_id ON public.notifications(user_id);
CREATE INDEX IF NOT EXISTS idx_notifications_is_read ON public.notifications(is_read);
CREATE INDEX IF NOT EXISTS idx_notifications_created_at ON public.notifications(created_at);

-- Posts indexes
CREATE INDEX IF NOT EXISTS idx_posts_author_id ON public.posts(author_id);
CREATE INDEX IF NOT EXISTS idx_posts_created_at ON public.posts(created_at);
CREATE INDEX IF NOT EXISTS idx_posts_visibility ON public.posts(visibility);
CREATE INDEX IF NOT EXISTS idx_posts_tags ON public.posts USING GIN(tags);

-- =============================================
-- ROW LEVEL SECURITY (RLS) POLICIES
-- =============================================

-- Enable RLS on all tables
ALTER TABLE public.users ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.programs ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.job_opportunities ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.scholarships ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.study_groups ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.group_memberships ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.group_posts ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.mentorship_sessions ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.mentorship_packages ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.professor_availability ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.user_connections ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.connection_requests ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.notifications ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.job_applications ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.program_applications ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.scholarship_applications ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.payments ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.posts ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.comments ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.post_likes ENABLE ROW LEVEL SECURITY;

-- Users table policies
DROP POLICY IF EXISTS "Users can view their own profile" ON public.users;
CREATE POLICY "Users can view their own profile" ON public.users
  FOR SELECT USING (auth.uid() = id);

DROP POLICY IF EXISTS "Users can update their own profile" ON public.users;
CREATE POLICY "Users can update their own profile" ON public.users
  FOR UPDATE USING (auth.uid() = id);

DROP POLICY IF EXISTS "Users can view public profiles" ON public.users;
CREATE POLICY "Users can view public profiles" ON public.users
  FOR SELECT USING (true);

-- Programs policies
DROP POLICY IF EXISTS "Anyone can view active programs" ON public.programs;
CREATE POLICY "Anyone can view active programs" ON public.programs
  FOR SELECT USING (is_active = true);

DROP POLICY IF EXISTS "Universities can manage their own programs" ON public.programs;
CREATE POLICY "Universities can manage their own programs" ON public.programs
  FOR ALL USING (auth.uid() = university_id);

-- Job opportunities policies
DROP POLICY IF EXISTS "Anyone can view active job opportunities" ON public.job_opportunities;
CREATE POLICY "Anyone can view active job opportunities" ON public.job_opportunities
  FOR SELECT USING (is_active = true);

DROP POLICY IF EXISTS "Users can manage their own job postings" ON public.job_opportunities;
CREATE POLICY "Users can manage their own job postings" ON public.job_opportunities
  FOR ALL USING (auth.uid() = posted_by);

-- Study groups policies
DROP POLICY IF EXISTS "Anyone can view public study groups" ON public.study_groups;
CREATE POLICY "Anyone can view public study groups" ON public.study_groups
  FOR SELECT USING (is_public = true);

DROP POLICY IF EXISTS "Group creators can manage their groups" ON public.study_groups;
CREATE POLICY "Group creators can manage their groups" ON public.study_groups
  FOR ALL USING (auth.uid() = created_by);

-- Group memberships policies
DROP POLICY IF EXISTS "Users can view group memberships" ON public.group_memberships;
CREATE POLICY "Users can view group memberships" ON public.group_memberships
  FOR SELECT USING (true);

DROP POLICY IF EXISTS "Users can join/leave groups" ON public.group_memberships;
CREATE POLICY "Users can join/leave groups" ON public.group_memberships
  FOR ALL USING (auth.uid() = user_id);

-- Mentorship sessions policies
DROP POLICY IF EXISTS "Users can view their own mentorship sessions" ON public.mentorship_sessions;
CREATE POLICY "Users can view their own mentorship sessions" ON public.mentorship_sessions
  FOR SELECT USING (auth.uid() = student_id OR auth.uid() = professor_id);

DROP POLICY IF EXISTS "Users can create mentorship sessions" ON public.mentorship_sessions;
CREATE POLICY "Users can create mentorship sessions" ON public.mentorship_sessions
  FOR INSERT WITH CHECK (auth.uid() = student_id);

DROP POLICY IF EXISTS "Users can update their own mentorship sessions" ON public.mentorship_sessions;
CREATE POLICY "Users can update their own mentorship sessions" ON public.mentorship_sessions
  FOR UPDATE USING (auth.uid() = student_id OR auth.uid() = professor_id);

-- User connections policies
DROP POLICY IF EXISTS "Users can view their own connections" ON public.user_connections;
CREATE POLICY "Users can view their own connections" ON public.user_connections
  FOR SELECT USING (auth.uid() = requester_id OR auth.uid() = addressee_id);

DROP POLICY IF EXISTS "Users can manage their own connections" ON public.user_connections;
CREATE POLICY "Users can manage their own connections" ON public.user_connections
  FOR ALL USING (auth.uid() = requester_id OR auth.uid() = addressee_id);

-- Notifications policies
DROP POLICY IF EXISTS "Users can view their own notifications" ON public.notifications;
CREATE POLICY "Users can view their own notifications" ON public.notifications
  FOR SELECT USING (auth.uid() = user_id);

DROP POLICY IF EXISTS "Users can update their own notifications" ON public.notifications;
CREATE POLICY "Users can update their own notifications" ON public.notifications
  FOR UPDATE USING (auth.uid() = user_id);

-- Posts policies
DROP POLICY IF EXISTS "Users can view public posts" ON public.posts;
CREATE POLICY "Users can view public posts" ON public.posts
  FOR SELECT USING (visibility = 'public' OR deleted_at IS NULL);

DROP POLICY IF EXISTS "Users can view connection posts" ON public.posts;
CREATE POLICY "Users can view connection posts" ON public.posts
  FOR SELECT USING (
    visibility = 'connections' AND 
    author_id IN (
      SELECT CASE 
        WHEN requester_id = auth.uid() THEN addressee_id 
        ELSE requester_id 
      END 
      FROM public.user_connections 
      WHERE (requester_id = auth.uid() OR addressee_id = auth.uid()) 
      AND status = 'accepted'
    )
  );

DROP POLICY IF EXISTS "Users can create posts" ON public.posts;
CREATE POLICY "Users can create posts" ON public.posts
  FOR INSERT WITH CHECK (auth.uid() = author_id);

DROP POLICY IF EXISTS "Users can update their own posts" ON public.posts;
CREATE POLICY "Users can update their own posts" ON public.posts
  FOR UPDATE USING (auth.uid() = author_id);

-- Comments policies
DROP POLICY IF EXISTS "Users can view comments on visible posts" ON public.comments;
CREATE POLICY "Users can view comments on visible posts" ON public.comments
  FOR SELECT USING (
    post_id IN (
      SELECT id FROM public.posts 
      WHERE visibility = 'public' OR deleted_at IS NULL
    )
  );

DROP POLICY IF EXISTS "Users can create comments" ON public.comments;
CREATE POLICY "Users can create comments" ON public.comments
  FOR INSERT WITH CHECK (auth.uid() = author_id);

DROP POLICY IF EXISTS "Users can update their own comments" ON public.comments;
CREATE POLICY "Users can update their own comments" ON public.comments
  FOR UPDATE USING (auth.uid() = author_id);

-- =============================================
-- TRIGGERS FOR AUTOMATIC UPDATES
-- =============================================

-- Function to update user connections count
CREATE OR REPLACE FUNCTION update_user_connections_count()
RETURNS TRIGGER AS $$
BEGIN
  IF TG_OP = 'INSERT' AND NEW.status = 'accepted' THEN
    UPDATE public.users 
    SET connections = connections + 1 
    WHERE id = NEW.requester_id OR id = NEW.addressee_id;
  ELSIF TG_OP = 'DELETE' AND OLD.status = 'accepted' THEN
    UPDATE public.users 
    SET connections = connections - 1 
    WHERE id = OLD.requester_id OR id = OLD.addressee_id;
  ELSIF TG_OP = 'UPDATE' THEN
    IF OLD.status != 'accepted' AND NEW.status = 'accepted' THEN
      UPDATE public.users 
      SET connections = connections + 1 
      WHERE id = NEW.requester_id OR id = NEW.addressee_id;
    ELSIF OLD.status = 'accepted' AND NEW.status != 'accepted' THEN
      UPDATE public.users 
      SET connections = connections - 1 
      WHERE id = NEW.requester_id OR id = NEW.addressee_id;
    END IF;
  END IF;
  RETURN COALESCE(NEW, OLD);
END;
$$ LANGUAGE plpgsql;

-- Trigger for user connections count
CREATE TRIGGER trigger_update_user_connections_count
  AFTER INSERT OR UPDATE OR DELETE ON public.user_connections
  FOR EACH ROW EXECUTE FUNCTION update_user_connections_count();

-- Function to update group member count
CREATE OR REPLACE FUNCTION update_group_member_count()
RETURNS TRIGGER AS $$
BEGIN
  IF TG_OP = 'INSERT' THEN
    UPDATE public.study_groups 
    SET member_count = member_count + 1 
    WHERE id = NEW.group_id;
  ELSIF TG_OP = 'DELETE' THEN
    UPDATE public.study_groups 
    SET member_count = member_count - 1 
    WHERE id = OLD.group_id;
  END IF;
  RETURN COALESCE(NEW, OLD);
END;
$$ LANGUAGE plpgsql;

-- Trigger for group member count
CREATE TRIGGER trigger_update_group_member_count
  AFTER INSERT OR DELETE ON public.group_memberships
  FOR EACH ROW EXECUTE FUNCTION update_group_member_count();

-- Function to update group post count
CREATE OR REPLACE FUNCTION update_group_post_count()
RETURNS TRIGGER AS $$
BEGIN
  IF TG_OP = 'INSERT' THEN
    UPDATE public.study_groups 
    SET post_count = post_count + 1,
        last_activity = NOW()
    WHERE id = NEW.group_id;
  ELSIF TG_OP = 'DELETE' THEN
    UPDATE public.study_groups 
    SET post_count = post_count - 1 
    WHERE id = OLD.group_id;
  END IF;
  RETURN COALESCE(NEW, OLD);
END;
$$ LANGUAGE plpgsql;

-- Trigger for group post count
CREATE TRIGGER trigger_update_group_post_count
  AFTER INSERT OR DELETE ON public.group_posts
  FOR EACH ROW EXECUTE FUNCTION update_group_post_count();

-- Function to update post like count
CREATE OR REPLACE FUNCTION update_post_like_count()
RETURNS TRIGGER AS $$
BEGIN
  IF TG_OP = 'INSERT' THEN
    UPDATE public.posts 
    SET like_count = like_count + 1 
    WHERE id = NEW.post_id;
  ELSIF TG_OP = 'DELETE' THEN
    UPDATE public.posts 
    SET like_count = like_count - 1 
    WHERE id = OLD.post_id;
  END IF;
  RETURN COALESCE(NEW, OLD);
END;
$$ LANGUAGE plpgsql;

-- Trigger for post like count
CREATE TRIGGER trigger_update_post_like_count
  AFTER INSERT OR DELETE ON public.post_likes
  FOR EACH ROW EXECUTE FUNCTION update_post_like_count();

-- Function to update post comment count
CREATE OR REPLACE FUNCTION update_post_comment_count()
RETURNS TRIGGER AS $$
BEGIN
  IF TG_OP = 'INSERT' THEN
    UPDATE public.posts 
    SET comment_count = comment_count + 1 
    WHERE id = NEW.post_id;
  ELSIF TG_OP = 'DELETE' THEN
    UPDATE public.posts 
    SET comment_count = comment_count - 1 
    WHERE id = OLD.post_id;
  END IF;
  RETURN COALESCE(NEW, OLD);
END;
$$ LANGUAGE plpgsql;

-- Trigger for post comment count
CREATE TRIGGER trigger_update_post_comment_count
  AFTER INSERT OR DELETE ON public.comments
  FOR EACH ROW EXECUTE FUNCTION update_post_comment_count();

-- =============================================
-- SAMPLE DATA FOR TESTING
-- =============================================

-- Insert sample programs (for landing page) - only if no programs exist
INSERT INTO public.programs (university_id, title, description, degree_level, duration, location, cost, capacity, rating, applications_count, image_url, logo_url, tags, is_featured)
SELECT 
  (SELECT id FROM public.users WHERE role = 'university' LIMIT 1),
  'Master of Computer Science',
  'Advanced computer science program with global research opportunities.',
  'Masters',
  '2 years',
  'Stanford, CA',
  '$58,000/year',
  2500,
  4.9,
  1200,
  'https://images.unsplash.com/photo-1517077304055-6e89abbf09b0?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80',
  'https://images.unsplash.com/photo-1562774053-701939374585?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80',
  ARRAY['Technology', 'Programming', 'AI'],
  true
WHERE NOT EXISTS (SELECT 1 FROM public.programs WHERE title = 'Master of Computer Science');

-- Insert sample study groups - only if no groups exist
INSERT INTO public.study_groups (name, description, category, created_by, image_url, member_count, post_count, is_public, tags)
SELECT 
  'Computer Science Students',
  'Connect and collaborate on coding challenges, projects, and career opportunities.',
  'Technology',
  (SELECT id FROM public.users WHERE role = 'professor' LIMIT 1),
  'https://images.unsplash.com/photo-1517077304055-6e89abbf09b0?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80',
  2847,
  156,
  true,
  ARRAY['Programming', 'AI/ML', 'Web Dev']
WHERE NOT EXISTS (SELECT 1 FROM public.study_groups WHERE name = 'Computer Science Students');

-- Insert sample job opportunities - only if no jobs exist
INSERT INTO public.job_opportunities (posted_by, title, description, company_name, location, job_type, salary_range, requirements, benefits, application_deadline)
SELECT 
  (SELECT id FROM public.users WHERE role = 'professor' LIMIT 1),
  'AI Research Assistant',
  'Join our cutting-edge AI research team working on machine learning algorithms.',
  'MIT Computer Science',
  'Cambridge, MA',
  'research',
  '$45K/year',
  ARRAY['Python', 'Machine Learning', 'Research Experience'],
  ARRAY['Health Insurance', 'Flexible Hours', 'Conference Travel'],
  '2024-12-31'
WHERE NOT EXISTS (SELECT 1 FROM public.job_opportunities WHERE title = 'AI Research Assistant');

-- =============================================
-- COMPLETION MESSAGE
-- =============================================

DO $$
BEGIN
  RAISE NOTICE 'Phase 1 Complete Database Schema Created Successfully!';
  RAISE NOTICE 'Tables created: users, programs, job_opportunities, scholarships, study_groups, group_memberships, group_posts, mentorship_sessions, mentorship_packages, professor_availability, user_connections, connection_requests, notifications, job_applications, program_applications, scholarship_applications, payments, posts, comments, post_likes';
  RAISE NOTICE 'Indexes created for optimal performance';
  RAISE NOTICE 'Row Level Security policies configured';
  RAISE NOTICE 'Triggers set up for automatic counter updates';
  RAISE NOTICE 'Sample data inserted for testing';
END $$;
