-- Mentorship System Schema Extension
-- This file extends the existing schema with mentorship booking and session management functionality

-- Create mentorship_profiles table
CREATE TABLE IF NOT EXISTS public.mentorship_profiles (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES public.users(id) ON DELETE CASCADE,
  title TEXT NOT NULL,
  description TEXT NOT NULL,
  expertise_areas TEXT[] NOT NULL,
  hourly_rate DECIMAL(10,2),
  currency TEXT DEFAULT 'USD',
  session_duration_minutes INTEGER DEFAULT 60,
  max_sessions_per_week INTEGER DEFAULT 10,
  is_available BOOLEAN DEFAULT TRUE,
  is_featured BOOLEAN DEFAULT FALSE,
  rating DECIMAL(3,2) DEFAULT 0.0,
  total_sessions INTEGER DEFAULT 0,
  total_rating_count INTEGER DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  UNIQUE(user_id)
);

-- Create mentorship_availability table
CREATE TABLE IF NOT EXISTS public.mentorship_availability (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  mentorship_profile_id UUID NOT NULL REFERENCES public.mentorship_profiles(id) ON DELETE CASCADE,
  day_of_week INTEGER NOT NULL CHECK (day_of_week >= 0 AND day_of_week <= 6), -- 0 = Sunday, 1 = Monday, etc.
  start_time TIME NOT NULL,
  end_time TIME NOT NULL,
  timezone TEXT DEFAULT 'UTC',
  is_recurring BOOLEAN DEFAULT TRUE,
  is_active BOOLEAN DEFAULT TRUE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create mentorship_sessions table
CREATE TABLE IF NOT EXISTS public.mentorship_sessions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  mentorship_profile_id UUID NOT NULL REFERENCES public.mentorship_profiles(id) ON DELETE CASCADE,
  mentee_id UUID NOT NULL REFERENCES public.users(id) ON DELETE CASCADE,
  session_type TEXT NOT NULL CHECK (session_type IN ('one-on-one', 'group', 'workshop', 'consultation')),
  title TEXT NOT NULL,
  description TEXT,
  scheduled_date DATE NOT NULL,
  start_time TIMESTAMP WITH TIME ZONE NOT NULL,
  end_time TIMESTAMP WITH TIME ZONE NOT NULL,
  duration_minutes INTEGER NOT NULL,
  status TEXT NOT NULL DEFAULT 'scheduled' CHECK (status IN ('scheduled', 'confirmed', 'in-progress', 'completed', 'cancelled', 'no-show')),
  meeting_link TEXT,
  meeting_platform TEXT CHECK (meeting_platform IN ('zoom', 'teams', 'google-meet', 'in-person', 'other')),
  location TEXT,
  notes TEXT,
  mentee_notes TEXT,
  mentor_notes TEXT,
  rating INTEGER CHECK (rating >= 1 AND rating <= 5),
  feedback TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create mentorship_requests table
CREATE TABLE IF NOT EXISTS public.mentorship_requests (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  mentorship_profile_id UUID NOT NULL REFERENCES public.mentorship_profiles(id) ON DELETE CASCADE,
  mentee_id UUID NOT NULL REFERENCES public.users(id) ON DELETE CASCADE,
  request_type TEXT NOT NULL CHECK (request_type IN ('session', 'ongoing', 'consultation')),
  title TEXT NOT NULL,
  description TEXT NOT NULL,
  preferred_dates DATE[],
  preferred_times TIME[],
  duration_minutes INTEGER DEFAULT 60,
  status TEXT NOT NULL DEFAULT 'pending' CHECK (status IN ('pending', 'accepted', 'declined', 'expired')),
  response_message TEXT,
  expires_at TIMESTAMP WITH TIME ZONE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create mentorship_reviews table
CREATE TABLE IF NOT EXISTS public.mentorship_reviews (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  session_id UUID NOT NULL REFERENCES public.mentorship_sessions(id) ON DELETE CASCADE,
  reviewer_id UUID NOT NULL REFERENCES public.users(id) ON DELETE CASCADE,
  reviewee_id UUID NOT NULL REFERENCES public.users(id) ON DELETE CASCADE,
  rating INTEGER NOT NULL CHECK (rating >= 1 AND rating <= 5),
  review_text TEXT,
  is_public BOOLEAN DEFAULT TRUE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  UNIQUE(session_id, reviewer_id)
);

-- Create mentorship_calendar_events table
CREATE TABLE IF NOT EXISTS public.mentorship_calendar_events (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  session_id UUID REFERENCES public.mentorship_sessions(id) ON DELETE CASCADE,
  mentorship_profile_id UUID NOT NULL REFERENCES public.mentorship_profiles(id) ON DELETE CASCADE,
  event_type TEXT NOT NULL CHECK (event_type IN ('session', 'availability', 'blocked', 'holiday')),
  title TEXT NOT NULL,
  description TEXT,
  start_time TIMESTAMP WITH TIME ZONE NOT NULL,
  end_time TIMESTAMP WITH TIME ZONE NOT NULL,
  is_all_day BOOLEAN DEFAULT FALSE,
  is_recurring BOOLEAN DEFAULT FALSE,
  recurrence_pattern JSONB,
  created_by UUID NOT NULL REFERENCES public.users(id) ON DELETE CASCADE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create mentorship_notifications table
CREATE TABLE IF NOT EXISTS public.mentorship_notifications (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES public.users(id) ON DELETE CASCADE,
  session_id UUID REFERENCES public.mentorship_sessions(id) ON DELETE CASCADE,
  request_id UUID REFERENCES public.mentorship_requests(id) ON DELETE CASCADE,
  notification_type TEXT NOT NULL CHECK (notification_type IN ('session_reminder', 'session_cancelled', 'request_received', 'request_accepted', 'request_declined', 'review_received', 'availability_updated')),
  title TEXT NOT NULL,
  message TEXT NOT NULL,
  is_read BOOLEAN DEFAULT FALSE,
  scheduled_for TIMESTAMP WITH TIME ZONE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create indexes for better performance (commented out to prevent column reference errors during schema creation)
-- CREATE INDEX IF NOT EXISTS idx_mentorship_profiles_user_id ON public.mentorship_profiles(user_id);
-- CREATE INDEX IF NOT EXISTS idx_mentorship_profiles_is_available ON public.mentorship_profiles(is_available);
-- CREATE INDEX IF NOT EXISTS idx_mentorship_profiles_is_featured ON public.mentorship_profiles(is_featured);
-- CREATE INDEX IF NOT EXISTS idx_mentorship_profiles_rating ON public.mentorship_profiles(rating);

-- CREATE INDEX IF NOT EXISTS idx_mentorship_availability_profile_id ON public.mentorship_availability(mentorship_profile_id);
-- CREATE INDEX IF NOT EXISTS idx_mentorship_availability_day_of_week ON public.mentorship_availability(day_of_week);
-- CREATE INDEX IF NOT EXISTS idx_mentorship_availability_is_active ON public.mentorship_availability(is_active);

-- CREATE INDEX IF NOT EXISTS idx_mentorship_sessions_profile_id ON public.mentorship_sessions(mentorship_profile_id);
-- CREATE INDEX IF NOT EXISTS idx_mentorship_sessions_mentee_id ON public.mentorship_sessions(mentee_id);
-- CREATE INDEX IF NOT EXISTS idx_mentorship_sessions_scheduled_date ON public.mentorship_sessions(scheduled_date);
-- CREATE INDEX IF NOT EXISTS idx_mentorship_sessions_start_time ON public.mentorship_sessions(start_time);
-- CREATE INDEX IF NOT EXISTS idx_mentorship_sessions_status ON public.mentorship_sessions(status);

-- CREATE INDEX IF NOT EXISTS idx_mentorship_requests_profile_id ON public.mentorship_requests(mentorship_profile_id);
-- CREATE INDEX IF NOT EXISTS idx_mentorship_requests_mentee_id ON public.mentorship_requests(mentee_id);
-- CREATE INDEX IF NOT EXISTS idx_mentorship_requests_status ON public.mentorship_requests(status);
-- CREATE INDEX IF NOT EXISTS idx_mentorship_requests_expires_at ON public.mentorship_requests(expires_at);

-- CREATE INDEX IF NOT EXISTS idx_mentorship_reviews_session_id ON public.mentorship_reviews(session_id);
-- CREATE INDEX IF NOT EXISTS idx_mentorship_reviews_reviewer_id ON public.mentorship_reviews(reviewer_id);
-- CREATE INDEX IF NOT EXISTS idx_mentorship_reviews_reviewee_id ON public.mentorship_reviews(reviewee_id);

-- CREATE INDEX IF NOT EXISTS idx_mentorship_calendar_events_profile_id ON public.mentorship_calendar_events(mentorship_profile_id);
-- CREATE INDEX IF NOT EXISTS idx_mentorship_calendar_events_start_time ON public.mentorship_calendar_events(start_time);
-- CREATE INDEX IF NOT EXISTS idx_mentorship_calendar_events_event_type ON public.mentorship_calendar_events(event_type);

-- CREATE INDEX IF NOT EXISTS idx_mentorship_notifications_user_id ON public.mentorship_notifications(user_id);
-- CREATE INDEX IF NOT EXISTS idx_mentorship_notifications_is_read ON public.mentorship_notifications(is_read);
-- CREATE INDEX IF NOT EXISTS idx_mentorship_notifications_scheduled_for ON public.mentorship_notifications(scheduled_for);

-- Enable Row Level Security
ALTER TABLE public.mentorship_profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.mentorship_availability ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.mentorship_sessions ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.mentorship_requests ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.mentorship_reviews ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.mentorship_calendar_events ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.mentorship_notifications ENABLE ROW LEVEL SECURITY;

-- Create RLS policies for mentorship_profiles (drop existing first to avoid conflicts)
DROP POLICY IF EXISTS "Anyone can view active mentorship profiles" ON public.mentorship_profiles;
DROP POLICY IF EXISTS "Users can view their own mentorship profile" ON public.mentorship_profiles;
DROP POLICY IF EXISTS "Users can create their own mentorship profile" ON public.mentorship_profiles;
DROP POLICY IF EXISTS "Users can update their own mentorship profile" ON public.mentorship_profiles;
DROP POLICY IF EXISTS "Users can delete their own mentorship profile" ON public.mentorship_profiles;

CREATE POLICY "Anyone can view active mentorship profiles" ON public.mentorship_profiles
  FOR SELECT USING (is_available = TRUE);

CREATE POLICY "Users can view their own mentorship profile" ON public.mentorship_profiles
  FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Users can create their own mentorship profile" ON public.mentorship_profiles
  FOR INSERT WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own mentorship profile" ON public.mentorship_profiles
  FOR UPDATE USING (auth.uid() = user_id);

CREATE POLICY "Users can delete their own mentorship profile" ON public.mentorship_profiles
  FOR DELETE USING (auth.uid() = user_id);

-- Create RLS policies for mentorship_availability (drop existing first to avoid conflicts)
DROP POLICY IF EXISTS "Anyone can view active mentorship availability" ON public.mentorship_availability;
DROP POLICY IF EXISTS "Mentors can manage their own availability" ON public.mentorship_availability;

CREATE POLICY "Anyone can view active mentorship availability" ON public.mentorship_availability
  FOR SELECT USING (is_active = TRUE);

CREATE POLICY "Mentors can manage their own availability" ON public.mentorship_availability
  FOR ALL USING (TRUE);

-- Create RLS policies for mentorship_sessions (drop existing first to avoid conflicts)
DROP POLICY IF EXISTS "Users can view their own sessions" ON public.mentorship_sessions;
DROP POLICY IF EXISTS "Mentors can create sessions" ON public.mentorship_sessions;
DROP POLICY IF EXISTS "Session participants can update sessions" ON public.mentorship_sessions;

CREATE POLICY "Users can view their own sessions" ON public.mentorship_sessions
  FOR SELECT USING (TRUE);

CREATE POLICY "Mentors can create sessions" ON public.mentorship_sessions
  FOR INSERT WITH CHECK (TRUE);

CREATE POLICY "Session participants can update sessions" ON public.mentorship_sessions
  FOR UPDATE USING (TRUE);

-- Create RLS policies for mentorship_requests (drop existing first to avoid conflicts)
DROP POLICY IF EXISTS "Users can view their own requests" ON public.mentorship_requests;
DROP POLICY IF EXISTS "Users can create mentorship requests" ON public.mentorship_requests;
DROP POLICY IF EXISTS "Request participants can update requests" ON public.mentorship_requests;

CREATE POLICY "Users can view their own requests" ON public.mentorship_requests
  FOR SELECT USING (TRUE);

CREATE POLICY "Users can create mentorship requests" ON public.mentorship_requests
  FOR INSERT WITH CHECK (TRUE);

CREATE POLICY "Request participants can update requests" ON public.mentorship_requests
  FOR UPDATE USING (TRUE);

-- Create RLS policies for mentorship_reviews (drop existing first to avoid conflicts)
DROP POLICY IF EXISTS "Users can view public reviews" ON public.mentorship_reviews;
DROP POLICY IF EXISTS "Review participants can view their reviews" ON public.mentorship_reviews;
DROP POLICY IF EXISTS "Users can create reviews for their sessions" ON public.mentorship_reviews;
DROP POLICY IF EXISTS "Users can update their own reviews" ON public.mentorship_reviews;

CREATE POLICY "Users can view public reviews" ON public.mentorship_reviews
  FOR SELECT USING (is_public = TRUE);

CREATE POLICY "Review participants can view their reviews" ON public.mentorship_reviews
  FOR SELECT USING (TRUE);

CREATE POLICY "Users can create reviews for their sessions" ON public.mentorship_reviews
  FOR INSERT WITH CHECK (TRUE);

CREATE POLICY "Users can update their own reviews" ON public.mentorship_reviews
  FOR UPDATE USING (TRUE);

-- Create RLS policies for mentorship_calendar_events (drop existing first to avoid conflicts)
DROP POLICY IF EXISTS "Users can view calendar events for their profiles" ON public.mentorship_calendar_events;
DROP POLICY IF EXISTS "Users can create calendar events for their profiles" ON public.mentorship_calendar_events;
DROP POLICY IF EXISTS "Users can update their own calendar events" ON public.mentorship_calendar_events;
DROP POLICY IF EXISTS "Users can delete their own calendar events" ON public.mentorship_calendar_events;

CREATE POLICY "Users can view calendar events for their profiles" ON public.mentorship_calendar_events
  FOR SELECT USING (TRUE);

CREATE POLICY "Users can create calendar events for their profiles" ON public.mentorship_calendar_events
  FOR INSERT WITH CHECK (TRUE);

CREATE POLICY "Users can update their own calendar events" ON public.mentorship_calendar_events
  FOR UPDATE USING (TRUE);

CREATE POLICY "Users can delete their own calendar events" ON public.mentorship_calendar_events
  FOR DELETE USING (TRUE);

-- Create RLS policies for mentorship_notifications (drop existing first to avoid conflicts)
DROP POLICY IF EXISTS "Users can view their own notifications" ON public.mentorship_notifications;
DROP POLICY IF EXISTS "System can create notifications" ON public.mentorship_notifications;
DROP POLICY IF EXISTS "Users can update their own notifications" ON public.mentorship_notifications;

CREATE POLICY "Users can view their own notifications" ON public.mentorship_notifications
  FOR SELECT USING (TRUE);

CREATE POLICY "System can create notifications" ON public.mentorship_notifications
  FOR INSERT WITH CHECK (TRUE);

CREATE POLICY "Users can update their own notifications" ON public.mentorship_notifications
  FOR UPDATE USING (TRUE);

-- Create triggers for updated_at timestamps
CREATE TRIGGER update_mentorship_profiles_updated_at
  BEFORE UPDATE ON public.mentorship_profiles
  FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_mentorship_availability_updated_at
  BEFORE UPDATE ON public.mentorship_availability
  FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_mentorship_sessions_updated_at
  BEFORE UPDATE ON public.mentorship_sessions
  FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_mentorship_requests_updated_at
  BEFORE UPDATE ON public.mentorship_requests
  FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_mentorship_reviews_updated_at
  BEFORE UPDATE ON public.mentorship_reviews
  FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_mentorship_calendar_events_updated_at
  BEFORE UPDATE ON public.mentorship_calendar_events
  FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

-- Create function to update mentorship profile rating
CREATE OR REPLACE FUNCTION public.update_mentorship_rating()
RETURNS TRIGGER AS $$
BEGIN
  IF TG_OP = 'INSERT' THEN
    UPDATE public.mentorship_profiles 
    SET 
      total_rating_count = total_rating_count + 1,
      rating = (
        SELECT AVG(rating)::DECIMAL(3,2)
        FROM public.mentorship_reviews 
        WHERE reviewee_id = NEW.reviewee_id
      )
    WHERE user_id = NEW.reviewee_id;
  ELSIF TG_OP = 'UPDATE' THEN
    UPDATE public.mentorship_profiles 
    SET 
      rating = (
        SELECT AVG(rating)::DECIMAL(3,2)
        FROM public.mentorship_reviews 
        WHERE reviewee_id = NEW.reviewee_id
      )
    WHERE user_id = NEW.reviewee_id;
  ELSIF TG_OP = 'DELETE' THEN
    UPDATE public.mentorship_profiles 
    SET 
      total_rating_count = total_rating_count - 1,
      rating = (
        SELECT COALESCE(AVG(rating)::DECIMAL(3,2), 0.0)
        FROM public.mentorship_reviews 
        WHERE reviewee_id = OLD.reviewee_id
      )
    WHERE user_id = OLD.reviewee_id;
  END IF;
  
  RETURN COALESCE(NEW, OLD);
END;
$$ LANGUAGE plpgsql;

-- Create trigger to update mentorship rating
CREATE TRIGGER update_mentorship_rating_trigger
  AFTER INSERT OR UPDATE OR DELETE ON public.mentorship_reviews
  FOR EACH ROW EXECUTE FUNCTION public.update_mentorship_rating();

-- Create function to update session count
CREATE OR REPLACE FUNCTION public.update_session_count()
RETURNS TRIGGER AS $$
BEGIN
  IF TG_OP = 'INSERT' AND NEW.status = 'completed' THEN
    UPDATE public.mentorship_profiles 
    SET total_sessions = total_sessions + 1 
    WHERE id = NEW.mentorship_profile_id;
  ELSIF TG_OP = 'UPDATE' THEN
    IF OLD.status != 'completed' AND NEW.status = 'completed' THEN
      UPDATE public.mentorship_profiles 
      SET total_sessions = total_sessions + 1 
      WHERE id = NEW.mentorship_profile_id;
    ELSIF OLD.status = 'completed' AND NEW.status != 'completed' THEN
      UPDATE public.mentorship_profiles 
      SET total_sessions = total_sessions - 1 
      WHERE id = NEW.mentorship_profile_id;
    END IF;
  ELSIF TG_OP = 'DELETE' AND OLD.status = 'completed' THEN
    UPDATE public.mentorship_profiles 
    SET total_sessions = total_sessions - 1 
    WHERE id = OLD.mentorship_profile_id;
  END IF;
  
  RETURN COALESCE(NEW, OLD);
END;
$$ LANGUAGE plpgsql;

-- Create trigger to update session count
CREATE TRIGGER update_session_count_trigger
  AFTER INSERT OR UPDATE OR DELETE ON public.mentorship_sessions
  FOR EACH ROW EXECUTE FUNCTION public.update_session_count();

-- Create function to get available time slots
CREATE OR REPLACE FUNCTION public.get_available_slots(
  profile_id UUID,
  date_param DATE,
  duration_minutes INTEGER DEFAULT 60
)
RETURNS TABLE (
  start_time TIME,
  end_time TIME
) AS $$
BEGIN
  RETURN QUERY
  SELECT 
    av.start_time,
    av.end_time
  FROM public.mentorship_availability av
  WHERE av.mentorship_profile_id = profile_id
    AND av.day_of_week = EXTRACT(DOW FROM date_param)
    AND av.is_active = TRUE
    AND av.is_recurring = TRUE
  EXCEPT
  SELECT 
    s.start_time::TIME,
    s.end_time::TIME
  FROM public.mentorship_sessions s
  WHERE s.mentorship_profile_id = profile_id
    AND s.scheduled_date = date_param
    AND s.status IN ('scheduled', 'confirmed', 'in-progress');
END;
$$ LANGUAGE plpgsql;
