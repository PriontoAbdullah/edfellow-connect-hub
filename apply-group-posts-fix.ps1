# PowerShell script to apply the group posts and comments database fix
# This script copies the SQL fix to clipboard for easy pasting into Supabase

$sql = @"
-- Fix for Group Posts and Comments Database Schema
-- This script creates the missing group_post_comments table and ensures proper relationships

-- First, ensure the group_posts table exists with correct structure
CREATE TABLE IF NOT EXISTS public.group_posts (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    group_id UUID NOT NULL REFERENCES public.groups(id) ON DELETE CASCADE,
    author_id UUID NOT NULL REFERENCES public.users(id) ON DELETE CASCADE,
    title TEXT NOT NULL,
    content TEXT NOT NULL,
    post_type TEXT NOT NULL DEFAULT 'discussion' CHECK (post_type IN ('discussion', 'announcement', 'resource', 'question', 'poll')),
    is_pinned BOOLEAN DEFAULT FALSE,
    is_locked BOOLEAN DEFAULT FALSE,
    tags TEXT[],
    attachments JSONB,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create the group_post_comments table with proper foreign key relationship
CREATE TABLE IF NOT EXISTS public.group_post_comments (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    post_id UUID NOT NULL REFERENCES public.group_posts(id) ON DELETE CASCADE,
    author_id UUID NOT NULL REFERENCES public.users(id) ON DELETE CASCADE,
    content TEXT NOT NULL,
    parent_comment_id UUID REFERENCES public.group_post_comments(id) ON DELETE CASCADE,
    is_solution BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create group_post_likes table for post likes
CREATE TABLE IF NOT EXISTS public.group_post_likes (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    post_id UUID NOT NULL REFERENCES public.group_posts(id) ON DELETE CASCADE,
    user_id UUID NOT NULL REFERENCES public.users(id) ON DELETE CASCADE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    UNIQUE(post_id, user_id)
);

-- Create indexes for better performance
CREATE INDEX IF NOT EXISTS idx_group_posts_group_id ON public.group_posts(group_id);
CREATE INDEX IF NOT EXISTS idx_group_posts_author_id ON public.group_posts(author_id);
CREATE INDEX IF NOT EXISTS idx_group_posts_created_at ON public.group_posts(created_at DESC);
CREATE INDEX IF NOT EXISTS idx_group_posts_is_pinned ON public.group_posts(is_pinned);
CREATE INDEX IF NOT EXISTS idx_group_posts_is_locked ON public.group_posts(is_locked);
CREATE INDEX IF NOT EXISTS idx_group_posts_post_type ON public.group_posts(post_type);

CREATE INDEX IF NOT EXISTS idx_group_post_comments_post_id ON public.group_post_comments(post_id);
CREATE INDEX IF NOT EXISTS idx_group_post_comments_author_id ON public.group_post_comments(author_id);
CREATE INDEX IF NOT EXISTS idx_group_post_comments_created_at ON public.group_post_comments(created_at DESC);
CREATE INDEX IF NOT EXISTS idx_group_post_comments_parent_comment_id ON public.group_post_comments(parent_comment_id);

CREATE INDEX IF NOT EXISTS idx_group_post_likes_post_id ON public.group_post_likes(post_id);
CREATE INDEX IF NOT EXISTS idx_group_post_likes_user_id ON public.group_post_likes(user_id);

-- Create updated_at trigger function if it doesn't exist
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ language 'plpgsql';

-- Create triggers for updated_at
DROP TRIGGER IF EXISTS update_group_posts_updated_at ON public.group_posts;
CREATE TRIGGER update_group_posts_updated_at 
    BEFORE UPDATE ON public.group_posts 
    FOR EACH ROW 
    EXECUTE FUNCTION update_updated_at_column();

DROP TRIGGER IF EXISTS update_group_post_comments_updated_at ON public.group_post_comments;
CREATE TRIGGER update_group_post_comments_updated_at 
    BEFORE UPDATE ON public.group_post_comments 
    FOR EACH ROW 
    EXECUTE FUNCTION update_updated_at_column();

-- Enable Row Level Security
ALTER TABLE public.group_posts ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.group_post_comments ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.group_post_likes ENABLE ROW LEVEL SECURITY;

-- Drop existing policies if they exist
DROP POLICY IF EXISTS "Users can view posts in groups they belong to" ON public.group_posts;
DROP POLICY IF EXISTS "Users can create posts in groups they belong to" ON public.group_posts;
DROP POLICY IF EXISTS "Users can update their own posts" ON public.group_posts;
DROP POLICY IF EXISTS "Users can delete their own posts" ON public.group_posts;
DROP POLICY IF EXISTS "Admins can manage all posts" ON public.group_posts;

DROP POLICY IF EXISTS "Users can view comments on posts in groups they belong to" ON public.group_post_comments;
DROP POLICY IF EXISTS "Users can create comments on posts in groups they belong to" ON public.group_post_comments;
DROP POLICY IF EXISTS "Users can update their own comments" ON public.group_post_comments;
DROP POLICY IF EXISTS "Users can delete their own comments" ON public.group_post_comments;
DROP POLICY IF EXISTS "Admins can manage all comments" ON public.group_post_comments;

DROP POLICY IF EXISTS "Users can view likes on posts in groups they belong to" ON public.group_post_likes;
DROP POLICY IF EXISTS "Users can create likes on posts in groups they belong to" ON public.group_post_likes;
DROP POLICY IF EXISTS "Users can delete their own likes" ON public.group_post_likes;

-- Create RLS policies for group_posts
CREATE POLICY "Users can view posts in groups they belong to" ON public.group_posts
    FOR SELECT
    USING (
        EXISTS (
            SELECT 1 FROM public.group_members 
            WHERE group_members.group_id = group_posts.group_id 
            AND group_members.user_id = auth.uid() 
            AND group_members.status = 'active'
        )
    );

CREATE POLICY "Users can create posts in groups they belong to" ON public.group_posts
    FOR INSERT
    WITH CHECK (
        author_id = auth.uid() AND
        EXISTS (
            SELECT 1 FROM public.group_members 
            WHERE group_members.group_id = group_posts.group_id 
            AND group_members.user_id = auth.uid() 
            AND group_members.status = 'active'
        )
    );

CREATE POLICY "Users can update their own posts" ON public.group_posts
    FOR UPDATE
    USING (author_id = auth.uid())
    WITH CHECK (author_id = auth.uid());

CREATE POLICY "Users can delete their own posts" ON public.group_posts
    FOR DELETE
    USING (author_id = auth.uid());

CREATE POLICY "Admins can manage all posts" ON public.group_posts
    FOR ALL
    USING (
        EXISTS (
            SELECT 1 FROM public.group_members 
            WHERE group_members.group_id = group_posts.group_id 
            AND group_members.user_id = auth.uid() 
            AND group_members.role = 'admin'
        )
    );

-- Create RLS policies for group_post_comments
CREATE POLICY "Users can view comments on posts in groups they belong to" ON public.group_post_comments
    FOR SELECT
    USING (
        EXISTS (
            SELECT 1 FROM public.group_posts 
            JOIN public.group_members ON group_members.group_id = group_posts.group_id
            WHERE group_posts.id = group_post_comments.post_id 
            AND group_members.user_id = auth.uid() 
            AND group_members.status = 'active'
        )
    );

CREATE POLICY "Users can create comments on posts in groups they belong to" ON public.group_post_comments
    FOR INSERT
    WITH CHECK (
        author_id = auth.uid() AND
        EXISTS (
            SELECT 1 FROM public.group_posts 
            JOIN public.group_members ON group_members.group_id = group_posts.group_id
            WHERE group_posts.id = group_post_comments.post_id 
            AND group_members.user_id = auth.uid() 
            AND group_members.status = 'active'
        )
    );

CREATE POLICY "Users can update their own comments" ON public.group_post_comments
    FOR UPDATE
    USING (author_id = auth.uid())
    WITH CHECK (author_id = auth.uid());

CREATE POLICY "Users can delete their own comments" ON public.group_post_comments
    FOR DELETE
    USING (author_id = auth.uid());

CREATE POLICY "Admins can manage all comments" ON public.group_post_comments
    FOR ALL
    USING (
        EXISTS (
            SELECT 1 FROM public.group_posts 
            JOIN public.group_members ON group_members.group_id = group_posts.group_id
            WHERE group_posts.id = group_post_comments.post_id 
            AND group_members.user_id = auth.uid() 
            AND group_members.role = 'admin'
        )
    );

-- Create RLS policies for group_post_likes
CREATE POLICY "Users can view likes on posts in groups they belong to" ON public.group_post_likes
    FOR SELECT
    USING (
        EXISTS (
            SELECT 1 FROM public.group_posts 
            JOIN public.group_members ON group_members.group_id = group_posts.group_id
            WHERE group_posts.id = group_post_likes.post_id 
            AND group_members.user_id = auth.uid() 
            AND group_members.status = 'active'
        )
    );

CREATE POLICY "Users can create likes on posts in groups they belong to" ON public.group_post_likes
    FOR INSERT
    WITH CHECK (
        user_id = auth.uid() AND
        EXISTS (
            SELECT 1 FROM public.group_posts 
            JOIN public.group_members ON group_members.group_id = group_posts.group_id
            WHERE group_posts.id = group_post_likes.post_id 
            AND group_members.user_id = auth.uid() 
            AND group_members.status = 'active'
        )
    );

CREATE POLICY "Users can delete their own likes" ON public.group_post_likes
    FOR DELETE
    USING (user_id = auth.uid());

-- Grant necessary permissions
GRANT ALL ON public.group_posts TO authenticated;
GRANT ALL ON public.group_post_comments TO authenticated;
GRANT ALL ON public.group_post_likes TO authenticated;

-- Grant usage on sequences
GRANT USAGE ON ALL SEQUENCES IN SCHEMA public TO authenticated;
"@

# Copy to clipboard
$sql | Set-Clipboard

Write-Host "✅ Group Posts and Comments Database Fix copied to clipboard!" -ForegroundColor Green
Write-Host ""
Write-Host "📋 Instructions:" -ForegroundColor Yellow
Write-Host "1. Go to your Supabase Dashboard" -ForegroundColor White
Write-Host "2. Navigate to SQL Editor" -ForegroundColor White
Write-Host "3. Paste the SQL (Ctrl+V)" -ForegroundColor White
Write-Host "4. Run the query" -ForegroundColor White
Write-Host ""
Write-Host "🔧 This fix will:" -ForegroundColor Cyan
Write-Host "   • Create the group_post_comments table with proper foreign keys" -ForegroundColor White
Write-Host "   • Create the group_post_likes table" -ForegroundColor White
Write-Host "   • Set up proper indexes for performance" -ForegroundColor White
Write-Host "   • Configure Row Level Security policies" -ForegroundColor White
Write-Host "   • Grant necessary permissions" -ForegroundColor White
Write-Host ""
Write-Host "⚠️  Note: This will create new tables but won't delete existing data." -ForegroundColor Yellow
