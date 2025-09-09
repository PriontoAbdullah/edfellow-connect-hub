-- Add avatar column to users table
-- This migration adds the missing avatar field to the users table

-- Add the avatar column to the users table
ALTER TABLE public.users 
ADD COLUMN IF NOT EXISTS avatar TEXT;

-- Add a comment to document the column
COMMENT ON COLUMN public.users.avatar IS 'URL to the user profile picture stored in Supabase storage';
