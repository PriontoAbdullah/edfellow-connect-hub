-- Add missing columns to group_posts table
ALTER TABLE public.group_posts ADD COLUMN IF NOT EXISTS is_pinned BOOLEAN DEFAULT FALSE;
ALTER TABLE public.group_posts ADD COLUMN IF NOT EXISTS is_locked BOOLEAN DEFAULT FALSE;
ALTER TABLE public.group_posts ADD COLUMN IF NOT EXISTS tags TEXT[];
ALTER TABLE public.group_posts ADD COLUMN IF NOT EXISTS attachments JSONB;

-- Create indexes
CREATE INDEX IF NOT EXISTS idx_group_posts_is_pinned ON public.group_posts(is_pinned);
CREATE INDEX IF NOT EXISTS idx_group_posts_is_locked ON public.group_posts(is_locked);
