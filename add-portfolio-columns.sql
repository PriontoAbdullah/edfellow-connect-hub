-- Migration script to add missing portfolio and privacy_settings columns
-- Run this script on your existing Supabase database

-- Add portfolio column if it doesn't exist
ALTER TABLE public.users 
ADD COLUMN IF NOT EXISTS portfolio JSONB;

-- Add privacy_settings column if it doesn't exist  
ALTER TABLE public.users 
ADD COLUMN IF NOT EXISTS privacy_settings JSONB;

-- Update existing users to have empty portfolio and default privacy settings
UPDATE public.users 
SET 
  portfolio = '[]'::jsonb,
  privacy_settings = '{
    "profileVisibility": "public",
    "contactInfoVisibility": "public", 
    "portfolioVisibility": "public",
    "academicInfoVisibility": "public",
    "experienceVisibility": "public",
    "allowMessages": true,
    "allowConnectionRequests": true,
    "showOnlineStatus": true
  }'::jsonb
WHERE portfolio IS NULL OR privacy_settings IS NULL;
