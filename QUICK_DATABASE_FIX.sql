-- Quick fix for missing columns in group_posts table
-- Run this directly in your Supabase SQL Editor

-- Add missing columns to group_posts table
ALTER TABLE public.group_posts 
ADD COLUMN IF NOT EXISTS is_pinned BOOLEAN DEFAULT FALSE;

ALTER TABLE public.group_posts 
ADD COLUMN IF NOT EXISTS is_locked BOOLEAN DEFAULT FALSE;

ALTER TABLE public.group_posts 
ADD COLUMN IF NOT EXISTS tags TEXT[];

ALTER TABLE public.group_posts 
ADD COLUMN IF NOT EXISTS attachments JSONB;

-- Create indexes for better performance
CREATE INDEX IF NOT EXISTS idx_group_posts_is_pinned ON public.group_posts(is_pinned);
CREATE INDEX IF NOT EXISTS idx_group_posts_is_locked ON public.group_posts(is_locked);

-- Verify the columns were added
SELECT column_name, data_type, is_nullable, column_default
FROM information_schema.columns 
WHERE table_name = 'group_posts' 
AND table_schema = 'public'
ORDER BY ordinal_position;
