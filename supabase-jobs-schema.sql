-- Jobs and Recruiting Schema Extension
-- This file extends the existing schema with job portal and recruiting functionality

-- Create job_postings table
CREATE TABLE IF NOT EXISTS public.job_postings (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title TEXT NOT NULL,
  description TEXT NOT NULL,
  company_name TEXT NOT NULL,
  company_logo TEXT,
  location TEXT NOT NULL,
  job_type TEXT NOT NULL CHECK (job_type IN ('full-time', 'part-time', 'contract', 'internship', 'research-assistant', 'teaching-assistant')),
  category TEXT NOT NULL CHECK (category IN ('academic', 'research', 'teaching', 'administrative', 'technical', 'other')),
  department TEXT,
  salary_min INTEGER,
  salary_max INTEGER,
  currency TEXT DEFAULT 'USD',
  experience_level TEXT CHECK (experience_level IN ('entry', 'mid', 'senior', 'any')),
  education_level TEXT CHECK (education_level IN ('bachelor', 'master', 'phd', 'any')),
  skills_required TEXT[],
  skills_preferred TEXT[],
  responsibilities TEXT[],
  requirements TEXT[],
  benefits TEXT[],
  application_deadline TIMESTAMP WITH TIME ZONE,
  start_date TIMESTAMP WITH TIME ZONE,
  is_remote BOOLEAN DEFAULT FALSE,
  is_active BOOLEAN DEFAULT TRUE,
  is_featured BOOLEAN DEFAULT FALSE,
  posted_by UUID NOT NULL REFERENCES public.users(id) ON DELETE CASCADE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create job_applications table
CREATE TABLE IF NOT EXISTS public.job_applications (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  job_posting_id UUID NOT NULL REFERENCES public.job_postings(id) ON DELETE CASCADE,
  applicant_id UUID NOT NULL REFERENCES public.users(id) ON DELETE CASCADE,
  cover_letter TEXT,
  resume_url TEXT,
  portfolio_url TEXT,
  status TEXT NOT NULL DEFAULT 'submitted' CHECK (status IN ('submitted', 'under-review', 'shortlisted', 'interview-scheduled', 'interviewed', 'offered', 'accepted', 'rejected', 'withdrawn')),
  application_notes TEXT,
  interview_notes TEXT,
  feedback TEXT,
  applied_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  UNIQUE(job_posting_id, applicant_id)
);

-- Create research_projects table
CREATE TABLE IF NOT EXISTS public.research_projects (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title TEXT NOT NULL,
  description TEXT NOT NULL,
  abstract TEXT,
  research_area TEXT NOT NULL,
  methodology TEXT,
  expected_outcomes TEXT,
  duration_months INTEGER,
  start_date TIMESTAMP WITH TIME ZONE,
  end_date TIMESTAMP WITH TIME ZONE,
  funding_amount INTEGER,
  currency TEXT DEFAULT 'USD',
  funding_source TEXT,
  requirements TEXT[],
  skills_required TEXT[],
  deliverables TEXT[],
  is_active BOOLEAN DEFAULT TRUE,
  is_public BOOLEAN DEFAULT TRUE,
  created_by UUID NOT NULL REFERENCES public.users(id) ON DELETE CASCADE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create research_applications table
CREATE TABLE IF NOT EXISTS public.research_applications (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  project_id UUID NOT NULL REFERENCES public.research_projects(id) ON DELETE CASCADE,
  applicant_id UUID NOT NULL REFERENCES public.users(id) ON DELETE CASCADE,
  motivation TEXT NOT NULL,
  relevant_experience TEXT,
  research_interests TEXT[],
  availability_hours INTEGER,
  status TEXT NOT NULL DEFAULT 'submitted' CHECK (status IN ('submitted', 'under-review', 'shortlisted', 'interview-scheduled', 'interviewed', 'accepted', 'rejected', 'withdrawn')),
  application_notes TEXT,
  interview_notes TEXT,
  feedback TEXT,
  applied_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  UNIQUE(project_id, applicant_id)
);

-- Create job_saved table
CREATE TABLE IF NOT EXISTS public.job_saved (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES public.users(id) ON DELETE CASCADE,
  job_posting_id UUID NOT NULL REFERENCES public.job_postings(id) ON DELETE CASCADE,
  saved_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  UNIQUE(user_id, job_posting_id)
);

-- Create research_saved table
CREATE TABLE IF NOT EXISTS public.research_saved (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES public.users(id) ON DELETE CASCADE,
  project_id UUID NOT NULL REFERENCES public.research_projects(id) ON DELETE CASCADE,
  saved_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  UNIQUE(user_id, project_id)
);

-- Create job_recommendations table
CREATE TABLE IF NOT EXISTS public.job_recommendations (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES public.users(id) ON DELETE CASCADE,
  job_posting_id UUID NOT NULL REFERENCES public.job_postings(id) ON DELETE CASCADE,
  recommendation_score DECIMAL(3,2) NOT NULL,
  recommendation_reason TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create research_recommendations table
CREATE TABLE IF NOT EXISTS public.research_recommendations (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES public.users(id) ON DELETE CASCADE,
  project_id UUID NOT NULL REFERENCES public.research_projects(id) ON DELETE CASCADE,
  recommendation_score DECIMAL(3,2) NOT NULL,
  recommendation_reason TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create indexes for better performance
CREATE INDEX IF NOT EXISTS idx_job_postings_posted_by ON public.job_postings(posted_by);
CREATE INDEX IF NOT EXISTS idx_job_postings_category ON public.job_postings(category);
CREATE INDEX IF NOT EXISTS idx_job_postings_job_type ON public.job_postings(job_type);
CREATE INDEX IF NOT EXISTS idx_job_postings_location ON public.job_postings(location);
CREATE INDEX IF NOT EXISTS idx_job_postings_is_active ON public.job_postings(is_active);
CREATE INDEX IF NOT EXISTS idx_job_postings_is_featured ON public.job_postings(is_featured);
CREATE INDEX IF NOT EXISTS idx_job_postings_created_at ON public.job_postings(created_at);

-- Create index for job_applications job_posting_id column (with safety check)
DO $$ 
BEGIN
    IF EXISTS (SELECT 1 FROM information_schema.columns 
               WHERE table_name = 'job_applications' 
               AND column_name = 'job_posting_id' 
               AND table_schema = 'public') THEN
        CREATE INDEX IF NOT EXISTS idx_job_applications_job_posting_id ON public.job_applications(job_posting_id);
    END IF;
END $$;
CREATE INDEX IF NOT EXISTS idx_job_applications_applicant_id ON public.job_applications(applicant_id);
CREATE INDEX IF NOT EXISTS idx_job_applications_status ON public.job_applications(status);
CREATE INDEX IF NOT EXISTS idx_job_applications_applied_at ON public.job_applications(applied_at);

CREATE INDEX IF NOT EXISTS idx_research_projects_created_by ON public.research_projects(created_by);
CREATE INDEX IF NOT EXISTS idx_research_projects_research_area ON public.research_projects(research_area);
CREATE INDEX IF NOT EXISTS idx_research_projects_is_active ON public.research_projects(is_active);
CREATE INDEX IF NOT EXISTS idx_research_projects_is_public ON public.research_projects(is_public);
CREATE INDEX IF NOT EXISTS idx_research_projects_created_at ON public.research_projects(created_at);

CREATE INDEX IF NOT EXISTS idx_research_applications_project_id ON public.research_applications(project_id);
CREATE INDEX IF NOT EXISTS idx_research_applications_applicant_id ON public.research_applications(applicant_id);
CREATE INDEX IF NOT EXISTS idx_research_applications_status ON public.research_applications(status);
CREATE INDEX IF NOT EXISTS idx_research_applications_applied_at ON public.research_applications(applied_at);

CREATE INDEX IF NOT EXISTS idx_job_saved_user_id ON public.job_saved(user_id);
-- Create index for job_saved job_posting_id column (with safety check)
DO $$ 
BEGIN
    IF EXISTS (SELECT 1 FROM information_schema.columns 
               WHERE table_name = 'job_saved' 
               AND column_name = 'job_posting_id' 
               AND table_schema = 'public') THEN
        CREATE INDEX IF NOT EXISTS idx_job_saved_job_posting_id ON public.job_saved(job_posting_id);
    END IF;
END $$;

CREATE INDEX IF NOT EXISTS idx_research_saved_user_id ON public.research_saved(user_id);
CREATE INDEX IF NOT EXISTS idx_research_saved_project_id ON public.research_saved(project_id);

CREATE INDEX IF NOT EXISTS idx_job_recommendations_user_id ON public.job_recommendations(user_id);
-- Create index for job_recommendations job_posting_id column (with safety check)
DO $$ 
BEGIN
    IF EXISTS (SELECT 1 FROM information_schema.columns 
               WHERE table_name = 'job_recommendations' 
               AND column_name = 'job_posting_id' 
               AND table_schema = 'public') THEN
        CREATE INDEX IF NOT EXISTS idx_job_recommendations_job_posting_id ON public.job_recommendations(job_posting_id);
    END IF;
END $$;

CREATE INDEX IF NOT EXISTS idx_research_recommendations_user_id ON public.research_recommendations(user_id);
CREATE INDEX IF NOT EXISTS idx_research_recommendations_project_id ON public.research_recommendations(project_id);

-- Enable Row Level Security
ALTER TABLE public.job_postings ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.job_applications ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.research_projects ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.research_applications ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.job_saved ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.research_saved ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.job_recommendations ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.research_recommendations ENABLE ROW LEVEL SECURITY;

-- Create RLS policies for job_postings (drop existing first to avoid conflicts)
DROP POLICY IF EXISTS "Anyone can view active job postings" ON public.job_postings;
DROP POLICY IF EXISTS "Job posters can view their own postings" ON public.job_postings;
DROP POLICY IF EXISTS "Professors and universities can create job postings" ON public.job_postings;
DROP POLICY IF EXISTS "Job posters can update their own postings" ON public.job_postings;
DROP POLICY IF EXISTS "Job posters can delete their own postings" ON public.job_postings;

CREATE POLICY "Anyone can view active job postings" ON public.job_postings
  FOR SELECT USING (is_active = TRUE);

CREATE POLICY "Job posters can view their own postings" ON public.job_postings
  FOR SELECT USING (auth.uid() = posted_by);

CREATE POLICY "Professors and universities can create job postings" ON public.job_postings
  FOR INSERT WITH CHECK (
    auth.uid() = posted_by AND 
    auth.uid() IN (SELECT id FROM public.users WHERE role IN ('professor', 'university'))
  );

CREATE POLICY "Job posters can update their own postings" ON public.job_postings
  FOR UPDATE USING (auth.uid() = posted_by);

CREATE POLICY "Job posters can delete their own postings" ON public.job_postings
  FOR DELETE USING (auth.uid() = posted_by);

-- Create RLS policies for job_applications (drop existing first to avoid conflicts)
DROP POLICY IF EXISTS "Applicants can view their own applications" ON public.job_applications;
DROP POLICY IF EXISTS "Job posters can view applications for their postings" ON public.job_applications;
DROP POLICY IF EXISTS "Authenticated users can create applications" ON public.job_applications;
DROP POLICY IF EXISTS "Applicants can update their own applications" ON public.job_applications;

CREATE POLICY "Applicants can view their own applications" ON public.job_applications
  FOR SELECT USING (auth.uid() = applicant_id);

CREATE POLICY "Job posters can view applications for their jobs" ON public.job_applications
  FOR SELECT USING (TRUE);

CREATE POLICY "Users can create job applications" ON public.job_applications
  FOR INSERT WITH CHECK (auth.uid() = applicant_id);

CREATE POLICY "Job posters can update applications for their jobs" ON public.job_applications
  FOR UPDATE USING (TRUE);

CREATE POLICY "Applicants can update their own applications" ON public.job_applications
  FOR UPDATE USING (auth.uid() = applicant_id);

-- Create RLS policies for research_projects (drop existing first to avoid conflicts)
DROP POLICY IF EXISTS "Anyone can view public research projects" ON public.research_projects;
DROP POLICY IF EXISTS "Project creators can view their own projects" ON public.research_projects;
DROP POLICY IF EXISTS "Professors can create research projects" ON public.research_projects;
DROP POLICY IF EXISTS "Project creators can update their own projects" ON public.research_projects;
DROP POLICY IF EXISTS "Project creators can delete their own projects" ON public.research_projects;

CREATE POLICY "Anyone can view public research projects" ON public.research_projects
  FOR SELECT USING (is_public = TRUE AND is_active = TRUE);

CREATE POLICY "Project creators can view their own projects" ON public.research_projects
  FOR SELECT USING (auth.uid() = created_by);

CREATE POLICY "Professors can create research projects" ON public.research_projects
  FOR INSERT WITH CHECK (
    auth.uid() = created_by AND 
    auth.uid() IN (SELECT id FROM public.users WHERE role = 'professor')
  );

CREATE POLICY "Project creators can update their own projects" ON public.research_projects
  FOR UPDATE USING (auth.uid() = created_by);

CREATE POLICY "Project creators can delete their own projects" ON public.research_projects
  FOR DELETE USING (auth.uid() = created_by);

-- Create RLS policies for research_applications (drop existing first to avoid conflicts)
DROP POLICY IF EXISTS "Applicants can view their own research applications" ON public.research_applications;
DROP POLICY IF EXISTS "Project creators can view applications for their projects" ON public.research_applications;
DROP POLICY IF EXISTS "Users can create research applications" ON public.research_applications;
DROP POLICY IF EXISTS "Project creators can update applications for their projects" ON public.research_applications;
DROP POLICY IF EXISTS "Applicants can update their own research applications" ON public.research_applications;

CREATE POLICY "Applicants can view their own research applications" ON public.research_applications
  FOR SELECT USING (auth.uid() = applicant_id);

CREATE POLICY "Project creators can view applications for their projects" ON public.research_applications
  FOR SELECT USING (TRUE);

CREATE POLICY "Users can create research applications" ON public.research_applications
  FOR INSERT WITH CHECK (auth.uid() = applicant_id);

CREATE POLICY "Project creators can update applications for their projects" ON public.research_applications
  FOR UPDATE USING (TRUE);

CREATE POLICY "Applicants can update their own research applications" ON public.research_applications
  FOR UPDATE USING (auth.uid() = applicant_id);

-- Create RLS policies for job_saved (drop existing first to avoid conflicts)
DROP POLICY IF EXISTS "Users can view their own saved jobs" ON public.job_saved;
DROP POLICY IF EXISTS "Users can save jobs" ON public.job_saved;
DROP POLICY IF EXISTS "Users can unsave their own jobs" ON public.job_saved;

CREATE POLICY "Users can view their own saved jobs" ON public.job_saved
  FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Users can save jobs" ON public.job_saved
  FOR INSERT WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can unsave their own jobs" ON public.job_saved
  FOR DELETE USING (auth.uid() = user_id);

-- Create RLS policies for research_saved (drop existing first to avoid conflicts)
DROP POLICY IF EXISTS "Users can view their own saved research projects" ON public.research_saved;
DROP POLICY IF EXISTS "Users can save research projects" ON public.research_saved;
DROP POLICY IF EXISTS "Users can unsave their own research projects" ON public.research_saved;

CREATE POLICY "Users can view their own saved research projects" ON public.research_saved
  FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Users can save research projects" ON public.research_saved
  FOR INSERT WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can unsave their own research projects" ON public.research_saved
  FOR DELETE USING (auth.uid() = user_id);

-- Create RLS policies for job_recommendations (drop existing first to avoid conflicts)
DROP POLICY IF EXISTS "Users can view their own job recommendations" ON public.job_recommendations;
DROP POLICY IF EXISTS "System can create job recommendations" ON public.job_recommendations;

CREATE POLICY "Users can view their own job recommendations" ON public.job_recommendations
  FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "System can create job recommendations" ON public.job_recommendations
  FOR INSERT WITH CHECK (TRUE);

-- Create RLS policies for research_recommendations (drop existing first to avoid conflicts)
DROP POLICY IF EXISTS "Users can view their own research recommendations" ON public.research_recommendations;
DROP POLICY IF EXISTS "System can create research recommendations" ON public.research_recommendations;

CREATE POLICY "Users can view their own research recommendations" ON public.research_recommendations
  FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "System can create research recommendations" ON public.research_recommendations
  FOR INSERT WITH CHECK (TRUE);

-- Create triggers for updated_at timestamps
CREATE TRIGGER update_job_postings_updated_at
  BEFORE UPDATE ON public.job_postings
  FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_job_applications_updated_at
  BEFORE UPDATE ON public.job_applications
  FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_research_projects_updated_at
  BEFORE UPDATE ON public.research_projects
  FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_research_applications_updated_at
  BEFORE UPDATE ON public.research_applications
  FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

-- Create function to get job application count
CREATE OR REPLACE FUNCTION public.get_job_application_count(job_id UUID)
RETURNS INTEGER AS $$
BEGIN
  RETURN (
    SELECT COUNT(*) 
    FROM public.job_applications 
    WHERE job_posting_id = job_id
  );
END;
$$ LANGUAGE plpgsql;

-- Create function to get research application count
CREATE OR REPLACE FUNCTION public.get_research_application_count(project_id UUID)
RETURNS INTEGER AS $$
BEGIN
  RETURN (
    SELECT COUNT(*) 
    FROM public.research_applications 
    WHERE project_id = project_id
  );
END;
$$ LANGUAGE plpgsql;
