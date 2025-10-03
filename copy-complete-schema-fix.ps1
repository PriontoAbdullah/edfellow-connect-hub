# PowerShell script to copy the COMPLETE schema fix to clipboard
$sql = @"
-- Complete schema fix for all group-related tables
-- This will create all missing tables and fix relationships

-- Create group_post_likes table
CREATE TABLE IF NOT EXISTS public.group_post_likes (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    post_id UUID NOT NULL REFERENCES public.group_posts(id) ON DELETE CASCADE,
    user_id UUID NOT NULL REFERENCES public.users(id) ON DELETE CASCADE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    UNIQUE(post_id, user_id)
);

-- Create group_activities table
CREATE TABLE IF NOT EXISTS public.group_activities (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    group_id UUID NOT NULL REFERENCES public.groups(id) ON DELETE CASCADE,
    user_id UUID NOT NULL REFERENCES public.users(id) ON DELETE CASCADE,
    activity_type TEXT NOT NULL,
    description TEXT NOT NULL,
    metadata JSONB,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create group_events table
CREATE TABLE IF NOT EXISTS public.group_events (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    group_id UUID NOT NULL REFERENCES public.groups(id) ON DELETE CASCADE,
    created_by UUID NOT NULL REFERENCES public.users(id) ON DELETE CASCADE,
    title TEXT NOT NULL,
    description TEXT,
    event_date TIMESTAMP WITH TIME ZONE NOT NULL,
    event_end_date TIMESTAMP WITH TIME ZONE,
    location TEXT,
    is_online BOOLEAN DEFAULT FALSE,
    max_attendees INTEGER,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create group_resources table
CREATE TABLE IF NOT EXISTS public.group_resources (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    group_id UUID NOT NULL REFERENCES public.groups(id) ON DELETE CASCADE,
    uploaded_by UUID NOT NULL REFERENCES public.users(id) ON DELETE CASCADE,
    title TEXT NOT NULL,
    description TEXT,
    file_url TEXT,
    file_type TEXT,
    file_size BIGINT,
    resource_type TEXT NOT NULL DEFAULT 'file',
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create group_polls table
CREATE TABLE IF NOT EXISTS public.group_polls (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    group_id UUID NOT NULL REFERENCES public.groups(id) ON DELETE CASCADE,
    created_by UUID NOT NULL REFERENCES public.users(id) ON DELETE CASCADE,
    question TEXT NOT NULL,
    description TEXT,
    is_multiple_choice BOOLEAN DEFAULT FALSE,
    expires_at TIMESTAMP WITH TIME ZONE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create group_poll_options table
CREATE TABLE IF NOT EXISTS public.group_poll_options (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    poll_id UUID NOT NULL REFERENCES public.group_polls(id) ON DELETE CASCADE,
    option_text TEXT NOT NULL,
    vote_count INTEGER DEFAULT 0,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create group_poll_votes table
CREATE TABLE IF NOT EXISTS public.group_poll_votes (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    poll_id UUID NOT NULL REFERENCES public.group_polls(id) ON DELETE CASCADE,
    option_id UUID NOT NULL REFERENCES public.group_poll_options(id) ON DELETE CASCADE,
    user_id UUID NOT NULL REFERENCES public.users(id) ON DELETE CASCADE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    UNIQUE(poll_id, user_id, option_id)
);

-- Create indexes for better performance
CREATE INDEX IF NOT EXISTS idx_group_post_likes_post_id ON public.group_post_likes(post_id);
CREATE INDEX IF NOT EXISTS idx_group_post_likes_user_id ON public.group_post_likes(user_id);
CREATE INDEX IF NOT EXISTS idx_group_activities_group_id ON public.group_activities(group_id);
CREATE INDEX IF NOT EXISTS idx_group_activities_created_at ON public.group_activities(created_at DESC);
CREATE INDEX IF NOT EXISTS idx_group_events_group_id ON public.group_events(group_id);
CREATE INDEX IF NOT EXISTS idx_group_events_event_date ON public.group_events(event_date);
CREATE INDEX IF NOT EXISTS idx_group_resources_group_id ON public.group_resources(group_id);
CREATE INDEX IF NOT EXISTS idx_group_polls_group_id ON public.group_polls(group_id);
CREATE INDEX IF NOT EXISTS idx_group_poll_options_poll_id ON public.group_poll_options(poll_id);
CREATE INDEX IF NOT EXISTS idx_group_poll_votes_poll_id ON public.group_poll_votes(poll_id);
CREATE INDEX IF NOT EXISTS idx_group_poll_votes_user_id ON public.group_poll_votes(user_id);

-- Enable Row Level Security on all tables
ALTER TABLE public.group_post_likes ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.group_activities ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.group_events ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.group_resources ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.group_polls ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.group_poll_options ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.group_poll_votes ENABLE ROW LEVEL SECURITY;
"@

# Copy to clipboard
$sql | Set-Clipboard

Write-Host "COMPLETE SCHEMA FIX COPIED TO CLIPBOARD!" -ForegroundColor Green
Write-Host ""
Write-Host "This will create all missing tables:" -ForegroundColor Yellow
Write-Host "- group_post_likes" -ForegroundColor White
Write-Host "- group_activities" -ForegroundColor White
Write-Host "- group_events" -ForegroundColor White
Write-Host "- group_resources" -ForegroundColor White
Write-Host "- group_polls" -ForegroundColor White
Write-Host "- group_poll_options" -ForegroundColor White
Write-Host "- group_poll_votes" -ForegroundColor White
Write-Host ""
Write-Host "Steps to fix:" -ForegroundColor Green
Write-Host "1. Go to Supabase Dashboard" -ForegroundColor White
Write-Host "2. Navigate to SQL Editor" -ForegroundColor White
Write-Host "3. Paste the SQL (Ctrl+V)" -ForegroundColor White
Write-Host "4. Click Run" -ForegroundColor White
Write-Host "5. Test your GroupDetail page" -ForegroundColor White
Write-Host ""
Write-Host "This will fix the relationship error and enable all features!" -ForegroundColor Cyan
