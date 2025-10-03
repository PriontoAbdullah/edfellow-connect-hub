# PowerShell script to copy the CORRECTED table fix to clipboard
$sql = @"
-- Corrected fix for group_posts table
-- This will create the table with all required columns using the correct user table

-- Drop the existing table if it exists (WARNING: This will delete all data)
DROP TABLE IF EXISTS public.group_posts CASCADE;

-- Create the group_posts table with all required columns
CREATE TABLE public.group_posts (
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

-- Create indexes for better performance
CREATE INDEX idx_group_posts_group_id ON public.group_posts(group_id);
CREATE INDEX idx_group_posts_author_id ON public.group_posts(author_id);
CREATE INDEX idx_group_posts_created_at ON public.group_posts(created_at DESC);
CREATE INDEX idx_group_posts_is_pinned ON public.group_posts(is_pinned);
CREATE INDEX idx_group_posts_is_locked ON public.group_posts(is_locked);
CREATE INDEX idx_group_posts_post_type ON public.group_posts(post_type);

-- Create updated_at trigger
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ language 'plpgsql';

CREATE TRIGGER update_group_posts_updated_at 
    BEFORE UPDATE ON public.group_posts 
    FOR EACH ROW 
    EXECUTE FUNCTION update_updated_at_column();

-- Enable Row Level Security
ALTER TABLE public.group_posts ENABLE ROW LEVEL SECURITY;

-- Create RLS policies (using auth.uid() for user authentication)
CREATE POLICY "Users can view posts in groups they belong to" ON public.group_posts
    FOR SELECT USING (
        EXISTS (
            SELECT 1 FROM public.group_members 
            WHERE group_members.group_id = group_posts.group_id 
            AND group_members.user_id = auth.uid()
            AND group_members.status = 'active'
        )
    );

CREATE POLICY "Users can create posts in groups they belong to" ON public.group_posts
    FOR INSERT WITH CHECK (
        EXISTS (
            SELECT 1 FROM public.group_members 
            WHERE group_members.group_id = group_posts.group_id 
            AND group_members.user_id = auth.uid()
            AND group_members.status = 'active'
        )
    );

CREATE POLICY "Users can update their own posts" ON public.group_posts
    FOR UPDATE USING (author_id = auth.uid());

CREATE POLICY "Users can delete their own posts" ON public.group_posts
    FOR DELETE USING (author_id = auth.uid());
"@

# Copy to clipboard
$sql | Set-Clipboard

Write-Host "CORRECTED TABLE FIX COPIED TO CLIPBOARD!" -ForegroundColor Green
Write-Host ""
Write-Host "FIXED: Now uses users table instead of profiles" -ForegroundColor Yellow
Write-Host ""
Write-Host "Steps to fix:" -ForegroundColor Green
Write-Host "1. Go to Supabase Dashboard" -ForegroundColor White
Write-Host "2. Navigate to SQL Editor" -ForegroundColor White
Write-Host "3. Paste the SQL (Ctrl+V)" -ForegroundColor White
Write-Host "4. Click Run" -ForegroundColor White
Write-Host "5. Test post creation" -ForegroundColor White
Write-Host ""
Write-Host "This will create the complete group_posts table with correct foreign keys!" -ForegroundColor Cyan