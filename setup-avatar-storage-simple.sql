-- Simple Avatar Storage Setup for EdFellow Connect Hub
-- This is a simplified version that should work with most Supabase setups

-- Step 1: Create the edfellow bucket if it doesn't exist
INSERT INTO storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
VALUES (
  'edfellow',
  'edfellow',
  false,
  2097152, -- 2MB in bytes
  ARRAY['image/jpeg', 'image/png', 'image/gif', 'image/webp']
)
ON CONFLICT (id) DO NOTHING;

-- Step 2: Drop existing policies if they exist (ignore errors if they don't exist)
DROP POLICY IF EXISTS "Users can upload avatar files to edfellow bucket" ON storage.objects;
DROP POLICY IF EXISTS "Users can view avatar files in edfellow bucket" ON storage.objects;
DROP POLICY IF EXISTS "Users can update their own avatar files in edfellow bucket" ON storage.objects;
DROP POLICY IF EXISTS "Users can delete their own avatar files in edfellow bucket" ON storage.objects;

-- Step 3: Create the RLS policies for avatar uploads
-- Upload policy: Users can upload to their own avatar folder
CREATE POLICY "Users can upload avatar files to edfellow bucket" 
ON storage.objects 
FOR INSERT 
TO authenticated 
WITH CHECK (
  bucket_id = 'edfellow' 
  AND (storage.foldername(name))[1] = 'avatars'
  AND auth.uid()::text = (storage.foldername(name))[2]
);

-- View policy: Users can view all avatar files
CREATE POLICY "Users can view avatar files in edfellow bucket" 
ON storage.objects 
FOR SELECT 
TO authenticated 
USING (
  bucket_id = 'edfellow' 
  AND (storage.foldername(name))[1] = 'avatars'
);

-- Update policy: Users can update their own avatar files
CREATE POLICY "Users can update their own avatar files in edfellow bucket" 
ON storage.objects 
FOR UPDATE 
TO authenticated 
USING (
  bucket_id = 'edfellow' 
  AND (storage.foldername(name))[1] = 'avatars'
  AND auth.uid()::text = (storage.foldername(name))[2]
) 
WITH CHECK (
  bucket_id = 'edfellow' 
  AND (storage.foldername(name))[1] = 'avatars'
  AND auth.uid()::text = (storage.foldername(name))[2]
);

-- Delete policy: Users can delete their own avatar files
CREATE POLICY "Users can delete their own avatar files in edfellow bucket" 
ON storage.objects 
FOR DELETE 
TO authenticated 
USING (
  bucket_id = 'edfellow' 
  AND (storage.foldername(name))[1] = 'avatars'
  AND auth.uid()::text = (storage.foldername(name))[2]
);

-- Step 4: Verify the setup
SELECT 'Setup completed successfully!' as status;
