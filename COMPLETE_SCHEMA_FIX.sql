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

-- Create RLS policies for group_post_likes
CREATE POLICY "Users can view likes in groups they belong to" ON public.group_post_likes
    FOR SELECT USING (
        EXISTS (
            SELECT 1 FROM public.group_members 
            WHERE group_members.group_id = (
                SELECT group_id FROM public.group_posts WHERE id = group_post_likes.post_id
            )
            AND group_members.user_id = auth.uid()
            AND group_members.status = 'active'
        )
    );

CREATE POLICY "Users can like posts in groups they belong to" ON public.group_post_likes
    FOR INSERT WITH CHECK (
        user_id = auth.uid() AND
        EXISTS (
            SELECT 1 FROM public.group_members 
            WHERE group_members.group_id = (
                SELECT group_id FROM public.group_posts WHERE id = group_post_likes.post_id
            )
            AND group_members.user_id = auth.uid()
            AND group_members.status = 'active'
        )
    );

CREATE POLICY "Users can unlike their own likes" ON public.group_post_likes
    FOR DELETE USING (user_id = auth.uid());

-- Create RLS policies for group_activities
CREATE POLICY "Users can view activities in groups they belong to" ON public.group_activities
    FOR SELECT USING (
        EXISTS (
            SELECT 1 FROM public.group_members 
            WHERE group_members.group_id = group_activities.group_id 
            AND group_members.user_id = auth.uid()
            AND group_members.status = 'active'
        )
    );

CREATE POLICY "Users can create activities in groups they belong to" ON public.group_activities
    FOR INSERT WITH CHECK (
        user_id = auth.uid() AND
        EXISTS (
            SELECT 1 FROM public.group_members 
            WHERE group_members.group_id = group_activities.group_id 
            AND group_members.user_id = auth.uid()
            AND group_members.status = 'active'
        )
    );

-- Create RLS policies for group_events
CREATE POLICY "Users can view events in groups they belong to" ON public.group_events
    FOR SELECT USING (
        EXISTS (
            SELECT 1 FROM public.group_members 
            WHERE group_members.group_id = group_events.group_id 
            AND group_members.user_id = auth.uid()
            AND group_members.status = 'active'
        )
    );

CREATE POLICY "Users can create events in groups they belong to" ON public.group_events
    FOR INSERT WITH CHECK (
        created_by = auth.uid() AND
        EXISTS (
            SELECT 1 FROM public.group_members 
            WHERE group_members.group_id = group_events.group_id 
            AND group_members.user_id = auth.uid()
            AND group_members.status = 'active'
        )
    );

-- Create RLS policies for group_resources
CREATE POLICY "Users can view resources in groups they belong to" ON public.group_resources
    FOR SELECT USING (
        EXISTS (
            SELECT 1 FROM public.group_members 
            WHERE group_members.group_id = group_resources.group_id 
            AND group_members.user_id = auth.uid()
            AND group_members.status = 'active'
        )
    );

CREATE POLICY "Users can upload resources in groups they belong to" ON public.group_resources
    FOR INSERT WITH CHECK (
        uploaded_by = auth.uid() AND
        EXISTS (
            SELECT 1 FROM public.group_members 
            WHERE group_members.group_id = group_resources.group_id 
            AND group_members.user_id = auth.uid()
            AND group_members.status = 'active'
        )
    );

-- Create RLS policies for group_polls
CREATE POLICY "Users can view polls in groups they belong to" ON public.group_polls
    FOR SELECT USING (
        EXISTS (
            SELECT 1 FROM public.group_members 
            WHERE group_members.group_id = group_polls.group_id 
            AND group_members.user_id = auth.uid()
            AND group_members.status = 'active'
        )
    );

CREATE POLICY "Users can create polls in groups they belong to" ON public.group_polls
    FOR INSERT WITH CHECK (
        created_by = auth.uid() AND
        EXISTS (
            SELECT 1 FROM public.group_members 
            WHERE group_members.group_id = group_polls.group_id 
            AND group_members.user_id = auth.uid()
            AND group_members.status = 'active'
        )
    );

-- Create RLS policies for group_poll_options
CREATE POLICY "Users can view poll options in groups they belong to" ON public.group_poll_options
    FOR SELECT USING (
        EXISTS (
            SELECT 1 FROM public.group_members 
            WHERE group_members.group_id = (
                SELECT group_id FROM public.group_polls WHERE id = group_poll_options.poll_id
            )
            AND group_members.user_id = auth.uid()
            AND group_members.status = 'active'
        )
    );

-- Create RLS policies for group_poll_votes
CREATE POLICY "Users can view votes in groups they belong to" ON public.group_poll_votes
    FOR SELECT USING (
        EXISTS (
            SELECT 1 FROM public.group_members 
            WHERE group_members.group_id = (
                SELECT group_id FROM public.group_polls WHERE id = group_poll_votes.poll_id
            )
            AND group_members.user_id = auth.uid()
            AND group_members.status = 'active'
        )
    );

CREATE POLICY "Users can vote in groups they belong to" ON public.group_poll_votes
    FOR INSERT WITH CHECK (
        user_id = auth.uid() AND
        EXISTS (
            SELECT 1 FROM public.group_members 
            WHERE group_members.group_id = (
                SELECT group_id FROM public.group_polls WHERE id = group_poll_votes.poll_id
            )
            AND group_members.user_id = auth.uid()
            AND group_members.status = 'active'
        )
    );

-- Verify all tables were created
SELECT table_name 
FROM information_schema.tables 
WHERE table_schema = 'public' 
AND table_name LIKE 'group_%'
ORDER BY table_name;
