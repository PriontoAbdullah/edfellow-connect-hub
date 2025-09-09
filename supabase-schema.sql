-- Drop existing triggers and functions that might cause issues
DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;
DROP FUNCTION IF EXISTS public.handle_new_user();

-- Create users table
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

-- Add foreign key constraint after table creation
ALTER TABLE public.users 
ADD CONSTRAINT fk_users_auth_id 
FOREIGN KEY (id) REFERENCES auth.users(id) ON DELETE CASCADE;

-- Enable Row Level Security on users table
ALTER TABLE public.users ENABLE ROW LEVEL SECURITY;

-- Create policies for users table
CREATE POLICY "Users can view their own profile" ON public.users
  FOR SELECT USING (auth.uid() = id);

CREATE POLICY "Users can update their own profile" ON public.users
  FOR UPDATE USING (auth.uid() = id);

-- Allow user profile creation (both during signup and after authentication)
CREATE POLICY "Users can insert their own profile" ON public.users
  FOR INSERT WITH CHECK (auth.uid() = id OR auth.uid() IS NULL);

-- Note: User profile creation is handled manually in the application
-- This provides better error handling and control

-- Create function to update updated_at timestamp
CREATE OR REPLACE FUNCTION public.update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Create trigger to update updated_at timestamp
DROP TRIGGER IF EXISTS update_users_updated_at ON public.users;
CREATE TRIGGER update_users_updated_at
  BEFORE UPDATE ON public.users
  FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

-- Create indexes for better performance
CREATE INDEX IF NOT EXISTS idx_users_email ON public.users(email);
CREATE INDEX IF NOT EXISTS idx_users_role ON public.users(role);
CREATE INDEX IF NOT EXISTS idx_users_country ON public.users(country);
CREATE INDEX IF NOT EXISTS idx_users_university ON public.users(university);
CREATE INDEX IF NOT EXISTS idx_users_institution ON public.users(institution);
CREATE INDEX IF NOT EXISTS idx_users_verification_status ON public.users(verification_status);
