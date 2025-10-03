-- Fix group_posts table to add missing columns
-- This script adds the missing columns that are referenced in the code but don't exist in the database

-- Add is_pinned column if it doesn't exist
DO $$ 
BEGIN
    IF NOT EXISTS (SELECT 1 FROM information_schema.columns 
                   WHERE table_name = 'group_posts' 
                   AND column_name = 'is_pinned' 
                   AND table_schema = 'public') THEN
        ALTER TABLE public.group_posts ADD COLUMN is_pinned BOOLEAN DEFAULT FALSE;
    END IF;
END $$;

-- Add is_locked column if it doesn't exist
DO $$ 
BEGIN
    IF NOT EXISTS (SELECT 1 FROM information_schema.columns 
                   WHERE table_name = 'group_posts' 
                   AND column_name = 'is_locked' 
                   AND table_schema = 'public') THEN
        ALTER TABLE public.group_posts ADD COLUMN is_locked BOOLEAN DEFAULT FALSE;
    END IF;
END $$;

-- Add tags column if it doesn't exist
DO $$ 
BEGIN
    IF NOT EXISTS (SELECT 1 FROM information_schema.columns 
                   WHERE table_name = 'group_posts' 
                   AND column_name = 'tags' 
                   AND table_schema = 'public') THEN
        ALTER TABLE public.group_posts ADD COLUMN tags TEXT[];
    END IF;
END $$;

-- Add attachments column if it doesn't exist
DO $$ 
BEGIN
    IF NOT EXISTS (SELECT 1 FROM information_schema.columns 
                   WHERE table_name = 'group_posts' 
                   AND column_name = 'attachments' 
                   AND table_schema = 'public') THEN
        ALTER TABLE public.group_posts ADD COLUMN attachments JSONB;
    END IF;
END $$;

-- Create index for is_pinned column
CREATE INDEX IF NOT EXISTS idx_group_posts_is_pinned ON public.group_posts(is_pinned);

-- Create index for is_locked column
CREATE INDEX IF NOT EXISTS idx_group_posts_is_locked ON public.group_posts(is_locked);

-- Update existing posts to have default values
UPDATE public.group_posts SET is_pinned = FALSE WHERE is_pinned IS NULL;
UPDATE public.group_posts SET is_locked = FALSE WHERE is_locked IS NULL;
