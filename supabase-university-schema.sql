-- University Features Schema Extension
-- This file extends the existing schema with university program and scholarship management functionality

-- Create university_programs table
CREATE TABLE IF NOT EXISTS public.university_programs (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title TEXT NOT NULL,
  description TEXT NOT NULL,
  program_type TEXT NOT NULL CHECK (program_type IN ('undergraduate', 'graduate', 'phd', 'certificate', 'diploma', 'online', 'hybrid')),
  department TEXT NOT NULL,
  duration_months INTEGER,
  credits_required INTEGER,
  tuition_fee DECIMAL(10,2),
  currency TEXT DEFAULT 'USD',
  language TEXT DEFAULT 'English',
  start_dates TEXT[], -- Array of available start dates
  application_deadline TIMESTAMP WITH TIME ZONE,
  requirements TEXT[],
  curriculum TEXT[],
  career_outcomes TEXT[],
  admission_criteria TEXT[],
  is_active BOOLEAN DEFAULT TRUE,
  is_featured BOOLEAN DEFAULT FALSE,
  created_by UUID NOT NULL REFERENCES public.users(id) ON DELETE CASCADE,
  university_id UUID NOT NULL REFERENCES public.users(id) ON DELETE CASCADE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create program_applications table
CREATE TABLE IF NOT EXISTS public.program_applications (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  program_id UUID NOT NULL REFERENCES public.university_programs(id) ON DELETE CASCADE,
  applicant_id UUID NOT NULL REFERENCES public.users(id) ON DELETE CASCADE,
  application_data JSONB NOT NULL, -- Store all application form data
  status TEXT NOT NULL DEFAULT 'submitted' CHECK (status IN ('submitted', 'under-review', 'shortlisted', 'interview-scheduled', 'interviewed', 'accepted', 'rejected', 'waitlisted', 'withdrawn')),
  application_notes TEXT,
  admission_decision TEXT,
  decision_date TIMESTAMP WITH TIME ZONE,
  enrollment_deadline TIMESTAMP WITH TIME ZONE,
  applied_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  UNIQUE(program_id, applicant_id)
);

-- Create scholarships table
CREATE TABLE IF NOT EXISTS public.scholarships (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title TEXT NOT NULL,
  description TEXT NOT NULL,
  amount DECIMAL(10,2) NOT NULL,
  currency TEXT DEFAULT 'USD',
  scholarship_type TEXT NOT NULL CHECK (scholarship_type IN ('merit-based', 'need-based', 'academic', 'athletic', 'research', 'international', 'minority', 'other')),
  eligibility_criteria TEXT[],
  application_requirements TEXT[],
  application_deadline TIMESTAMP WITH TIME ZONE,
  award_date TIMESTAMP WITH TIME ZONE,
  renewable BOOLEAN DEFAULT FALSE,
  renewal_criteria TEXT,
  max_recipients INTEGER,
  current_recipients INTEGER DEFAULT 0,
  is_active BOOLEAN DEFAULT TRUE,
  is_featured BOOLEAN DEFAULT FALSE,
  created_by UUID NOT NULL REFERENCES public.users(id) ON DELETE CASCADE,
  university_id UUID NOT NULL REFERENCES public.users(id) ON DELETE CASCADE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create scholarship_applications table
CREATE TABLE IF NOT EXISTS public.scholarship_applications (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  scholarship_id UUID NOT NULL REFERENCES public.scholarships(id) ON DELETE CASCADE,
  applicant_id UUID NOT NULL REFERENCES public.users(id) ON DELETE CASCADE,
  application_data JSONB NOT NULL, -- Store all application form data
  status TEXT NOT NULL DEFAULT 'submitted' CHECK (status IN ('submitted', 'under-review', 'shortlisted', 'awarded', 'rejected', 'withdrawn')),
  application_notes TEXT,
  award_decision TEXT,
  decision_date TIMESTAMP WITH TIME ZONE,
  award_amount DECIMAL(10,2),
  disbursement_schedule JSONB, -- Store disbursement dates and amounts
  applied_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  UNIQUE(scholarship_id, applicant_id)
);

-- Create program_promotions table
CREATE TABLE IF NOT EXISTS public.program_promotions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  program_id UUID NOT NULL REFERENCES public.university_programs(id) ON DELETE CASCADE,
  promotion_type TEXT NOT NULL CHECK (promotion_type IN ('social_media', 'email', 'website', 'event', 'partnership', 'other')),
  title TEXT NOT NULL,
  content TEXT NOT NULL,
  target_audience TEXT[],
  start_date TIMESTAMP WITH TIME ZONE,
  end_date TIMESTAMP WITH TIME ZONE,
  budget DECIMAL(10,2),
  currency TEXT DEFAULT 'USD',
  metrics JSONB, -- Store engagement metrics
  is_active BOOLEAN DEFAULT TRUE,
  created_by UUID NOT NULL REFERENCES public.users(id) ON DELETE CASCADE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create program_analytics table
CREATE TABLE IF NOT EXISTS public.program_analytics (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  program_id UUID NOT NULL REFERENCES public.university_programs(id) ON DELETE CASCADE,
  date DATE NOT NULL,
  views INTEGER DEFAULT 0,
  applications INTEGER DEFAULT 0,
  inquiries INTEGER DEFAULT 0,
  conversions DECIMAL(5,2) DEFAULT 0, -- Conversion rate
  demographics JSONB, -- Store demographic data
  traffic_sources JSONB, -- Store traffic source data
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  UNIQUE(program_id, date)
);

-- Create scholarship_analytics table
CREATE TABLE IF NOT EXISTS public.scholarship_analytics (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  scholarship_id UUID NOT NULL REFERENCES public.scholarships(id) ON DELETE CASCADE,
  date DATE NOT NULL,
  views INTEGER DEFAULT 0,
  applications INTEGER DEFAULT 0,
  inquiries INTEGER DEFAULT 0,
  conversions DECIMAL(5,2) DEFAULT 0, -- Conversion rate
  demographics JSONB, -- Store demographic data
  traffic_sources JSONB, -- Store traffic source data
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  UNIQUE(scholarship_id, date)
);

-- Create indexes for better performance
CREATE INDEX IF NOT EXISTS idx_university_programs_university_id ON public.university_programs(university_id);
-- CREATE INDEX IF NOT EXISTS idx_university_programs_created_by ON public.university_programs(created_by);
-- CREATE INDEX IF NOT EXISTS idx_university_programs_program_type ON public.university_programs(program_type);
-- CREATE INDEX IF NOT EXISTS idx_university_programs_department ON public.university_programs(department);
-- CREATE INDEX IF NOT EXISTS idx_university_programs_is_active ON public.university_programs(is_active);
-- CREATE INDEX IF NOT EXISTS idx_university_programs_is_featured ON public.university_programs(is_featured);
-- CREATE INDEX IF NOT EXISTS idx_university_programs_created_at ON public.university_programs(created_at);

-- CREATE INDEX IF NOT EXISTS idx_program_applications_program_id ON public.program_applications(program_id);
-- CREATE INDEX IF NOT EXISTS idx_program_applications_applicant_id ON public.program_applications(applicant_id);
-- CREATE INDEX IF NOT EXISTS idx_program_applications_status ON public.program_applications(status);
-- CREATE INDEX IF NOT EXISTS idx_program_applications_applied_at ON public.program_applications(applied_at);

CREATE INDEX IF NOT EXISTS idx_scholarships_university_id ON public.scholarships(university_id);
-- CREATE INDEX IF NOT EXISTS idx_scholarships_created_by ON public.scholarships(created_by);
-- CREATE INDEX IF NOT EXISTS idx_scholarships_scholarship_type ON public.scholarships(scholarship_type);
-- CREATE INDEX IF NOT EXISTS idx_scholarships_is_active ON public.scholarships(is_active);
-- CREATE INDEX IF NOT EXISTS idx_scholarships_is_featured ON public.scholarships(is_featured);
-- CREATE INDEX IF NOT EXISTS idx_scholarships_created_at ON public.scholarships(created_at);

-- CREATE INDEX IF NOT EXISTS idx_scholarship_applications_scholarship_id ON public.scholarship_applications(scholarship_id);
-- CREATE INDEX IF NOT EXISTS idx_scholarship_applications_applicant_id ON public.scholarship_applications(applicant_id);
-- CREATE INDEX IF NOT EXISTS idx_scholarship_applications_status ON public.scholarship_applications(status);
-- CREATE INDEX IF NOT EXISTS idx_scholarship_applications_applied_at ON public.scholarship_applications(applied_at);

-- CREATE INDEX IF NOT EXISTS idx_program_promotions_program_id ON public.program_promotions(program_id);
-- CREATE INDEX IF NOT EXISTS idx_program_promotions_created_by ON public.program_promotions(created_by);
-- CREATE INDEX IF NOT EXISTS idx_program_promotions_promotion_type ON public.program_promotions(promotion_type);
-- CREATE INDEX IF NOT EXISTS idx_program_promotions_is_active ON public.program_promotions(is_active);

-- CREATE INDEX IF NOT EXISTS idx_program_analytics_program_id ON public.program_analytics(program_id);
-- CREATE INDEX IF NOT EXISTS idx_program_analytics_date ON public.program_analytics(date);

-- CREATE INDEX IF NOT EXISTS idx_scholarship_analytics_scholarship_id ON public.scholarship_analytics(scholarship_id);
-- CREATE INDEX IF NOT EXISTS idx_scholarship_analytics_date ON public.scholarship_analytics(date);

-- Enable Row Level Security
ALTER TABLE public.university_programs ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.program_applications ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.scholarships ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.scholarship_applications ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.program_promotions ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.program_analytics ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.scholarship_analytics ENABLE ROW LEVEL SECURITY;

-- Create RLS policies for university_programs (drop existing first to avoid conflicts)
DROP POLICY IF EXISTS "Anyone can view active university programs" ON public.university_programs;
DROP POLICY IF EXISTS "University members can view their programs" ON public.university_programs;
DROP POLICY IF EXISTS "Universities can create programs" ON public.university_programs;
DROP POLICY IF EXISTS "University members can update their programs" ON public.university_programs;
DROP POLICY IF EXISTS "University members can delete their programs" ON public.university_programs;

CREATE POLICY "Anyone can view active university programs" ON public.university_programs
  FOR SELECT USING (is_active = TRUE);

CREATE POLICY "University members can view their programs" ON public.university_programs
  FOR SELECT USING (auth.uid() = university_id);

CREATE POLICY "Universities can create programs" ON public.university_programs
  FOR INSERT WITH CHECK (
    auth.uid() = university_id AND
    auth.uid() IN (SELECT id FROM public.users WHERE role = 'university')
  );

CREATE POLICY "University members can update their programs" ON public.university_programs
  FOR UPDATE USING (auth.uid() = university_id);

CREATE POLICY "University members can delete their programs" ON public.university_programs
  FOR DELETE USING (auth.uid() = university_id);

-- Create RLS policies for program_applications (drop existing first to avoid conflicts)
DROP POLICY IF EXISTS "Applicants can view their own applications" ON public.program_applications;
DROP POLICY IF EXISTS "University members can view applications for their programs" ON public.program_applications;
DROP POLICY IF EXISTS "Users can create program applications" ON public.program_applications;
DROP POLICY IF EXISTS "University members can update applications for their programs" ON public.program_applications;

CREATE POLICY "Applicants can view their own applications" ON public.program_applications
  FOR SELECT USING (auth.uid() = applicant_id);

CREATE POLICY "University members can view applications for their programs" ON public.program_applications
  FOR SELECT USING (TRUE);

CREATE POLICY "Users can create program applications" ON public.program_applications
  FOR INSERT WITH CHECK (auth.uid() = applicant_id);

CREATE POLICY "University members can update applications for their programs" ON public.program_applications
  FOR UPDATE USING (TRUE);

-- Create RLS policies for scholarships (drop existing first to avoid conflicts)
DROP POLICY IF EXISTS "Anyone can view active scholarships" ON public.scholarships;
DROP POLICY IF EXISTS "University members can view their scholarships" ON public.scholarships;
DROP POLICY IF EXISTS "Universities can create scholarships" ON public.scholarships;
DROP POLICY IF EXISTS "University members can update their scholarships" ON public.scholarships;
DROP POLICY IF EXISTS "University members can delete their scholarships" ON public.scholarships;

CREATE POLICY "Anyone can view active scholarships" ON public.scholarships
  FOR SELECT USING (is_active = TRUE);

CREATE POLICY "University members can view their scholarships" ON public.scholarships
  FOR SELECT USING (auth.uid() = university_id);

CREATE POLICY "Universities can create scholarships" ON public.scholarships
  FOR INSERT WITH CHECK (
    auth.uid() = university_id AND
    auth.uid() IN (SELECT id FROM public.users WHERE role = 'university')
  );

CREATE POLICY "University members can update their scholarships" ON public.scholarships
  FOR UPDATE USING (auth.uid() = university_id);

CREATE POLICY "University members can delete their scholarships" ON public.scholarships
  FOR DELETE USING (auth.uid() = university_id);

-- Create RLS policies for scholarship_applications (drop existing first to avoid conflicts)
DROP POLICY IF EXISTS "Applicants can view their own scholarship applications" ON public.scholarship_applications;
DROP POLICY IF EXISTS "University members can view scholarship applications" ON public.scholarship_applications;
DROP POLICY IF EXISTS "Users can create scholarship applications" ON public.scholarship_applications;
DROP POLICY IF EXISTS "University members can update scholarship applications" ON public.scholarship_applications;

CREATE POLICY "Applicants can view their own scholarship applications" ON public.scholarship_applications
  FOR SELECT USING (auth.uid() = applicant_id);

CREATE POLICY "University members can view scholarship applications" ON public.scholarship_applications
  FOR SELECT USING (TRUE);

CREATE POLICY "Users can create scholarship applications" ON public.scholarship_applications
  FOR INSERT WITH CHECK (auth.uid() = applicant_id);

CREATE POLICY "University members can update scholarship applications" ON public.scholarship_applications
  FOR UPDATE USING (TRUE);

-- Create RLS policies for program_promotions (drop existing first to avoid conflicts)
DROP POLICY IF EXISTS "University members can view their program promotions" ON public.program_promotions;
DROP POLICY IF EXISTS "University members can create program promotions" ON public.program_promotions;
DROP POLICY IF EXISTS "University members can update their program promotions" ON public.program_promotions;
DROP POLICY IF EXISTS "University members can delete their program promotions" ON public.program_promotions;

CREATE POLICY "University members can view their program promotions" ON public.program_promotions
  FOR SELECT USING (TRUE);

CREATE POLICY "University members can create program promotions" ON public.program_promotions
  FOR INSERT WITH CHECK (
    auth.uid() IN (SELECT id FROM public.users WHERE role = 'university')
  );

CREATE POLICY "University members can update their program promotions" ON public.program_promotions
  FOR UPDATE USING (TRUE);

CREATE POLICY "University members can delete their program promotions" ON public.program_promotions
  FOR DELETE USING (TRUE);

-- Create RLS policies for analytics tables (drop existing first to avoid conflicts)
DROP POLICY IF EXISTS "University members can view their program analytics" ON public.program_analytics;
DROP POLICY IF EXISTS "System can create program analytics" ON public.program_analytics;
DROP POLICY IF EXISTS "University members can view their scholarship analytics" ON public.scholarship_analytics;
DROP POLICY IF EXISTS "System can create scholarship analytics" ON public.scholarship_analytics;

CREATE POLICY "University members can view their program analytics" ON public.program_analytics
  FOR SELECT USING (TRUE);

CREATE POLICY "System can create program analytics" ON public.program_analytics
  FOR INSERT WITH CHECK (TRUE);

CREATE POLICY "University members can view their scholarship analytics" ON public.scholarship_analytics
  FOR SELECT USING (TRUE);

CREATE POLICY "System can create scholarship analytics" ON public.scholarship_analytics
  FOR INSERT WITH CHECK (TRUE);

-- Create triggers for updated_at timestamps
CREATE TRIGGER update_university_programs_updated_at
  BEFORE UPDATE ON public.university_programs
  FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_program_applications_updated_at
  BEFORE UPDATE ON public.program_applications
  FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_scholarships_updated_at
  BEFORE UPDATE ON public.scholarships
  FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_scholarship_applications_updated_at
  BEFORE UPDATE ON public.scholarship_applications
  FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_program_promotions_updated_at
  BEFORE UPDATE ON public.program_promotions
  FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

-- Create function to get program application count
CREATE OR REPLACE FUNCTION public.get_program_application_count(program_id UUID)
RETURNS INTEGER AS $$
BEGIN
  RETURN (
    SELECT COUNT(*) 
    FROM public.program_applications 
    WHERE program_id = program_id
  );
END;
$$ LANGUAGE plpgsql;

-- Create function to get scholarship application count
CREATE OR REPLACE FUNCTION public.get_scholarship_application_count(scholarship_id UUID)
RETURNS INTEGER AS $$
BEGIN
  RETURN (
    SELECT COUNT(*) 
    FROM public.scholarship_applications 
    WHERE scholarship_id = scholarship_id
  );
END;
$$ LANGUAGE plpgsql;

-- Create function to update scholarship recipient count
CREATE OR REPLACE FUNCTION public.update_scholarship_recipient_count()
RETURNS TRIGGER AS $$
BEGIN
  IF TG_OP = 'INSERT' AND NEW.status = 'awarded' THEN
    UPDATE public.scholarships 
    SET current_recipients = current_recipients + 1 
    WHERE id = NEW.scholarship_id;
  ELSIF TG_OP = 'UPDATE' THEN
    IF OLD.status != 'awarded' AND NEW.status = 'awarded' THEN
      UPDATE public.scholarships 
      SET current_recipients = current_recipients + 1 
      WHERE id = NEW.scholarship_id;
    ELSIF OLD.status = 'awarded' AND NEW.status != 'awarded' THEN
      UPDATE public.scholarships 
      SET current_recipients = current_recipients - 1 
      WHERE id = NEW.scholarship_id;
    END IF;
  ELSIF TG_OP = 'DELETE' AND OLD.status = 'awarded' THEN
    UPDATE public.scholarships 
    SET current_recipients = current_recipients - 1 
    WHERE id = OLD.scholarship_id;
  END IF;
  
  RETURN COALESCE(NEW, OLD);
END;
$$ LANGUAGE plpgsql;

-- Create trigger to update scholarship recipient count
CREATE TRIGGER update_scholarship_recipient_count_trigger
  AFTER INSERT OR UPDATE OR DELETE ON public.scholarship_applications
  FOR EACH ROW EXECUTE FUNCTION public.update_scholarship_recipient_count();
