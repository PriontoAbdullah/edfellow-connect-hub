-- Storage Bucket Policies for Avatar Uploads in EdFellow Connect Hub
-- This script sets up Row Level Security policies for avatar uploads in the 'edfellow' storage bucket

-- First, let's check if the storage.objects table exists and enable RLS
-- Note: In some Supabase versions, this might be handled automatically
DO $$
BEGIN
    -- Try to enable RLS on storage.objects if it exists
    IF EXISTS (SELECT 1 FROM information_schema.tables WHERE table_schema = 'storage' AND table_name = 'objects') THEN
        ALTER TABLE storage.objects ENABLE ROW SECURITY;
    END IF;
EXCEPTION
    WHEN OTHERS THEN
        -- If the table doesn't exist or RLS is already enabled, continue
        NULL;
END $$;

-- Drop existing avatar-specific policies if they exist
DROP POLICY IF EXISTS "Users can upload avatar files to edfellow bucket" ON storage.objects;
DROP POLICY IF EXISTS "Users can view avatar files in edfellow bucket" ON storage.objects;
DROP POLICY IF EXISTS "Users can update their own avatar files in edfellow bucket" ON storage.objects;
DROP POLICY IF EXISTS "Users can delete their own avatar files in edfellow bucket" ON storage.objects;

-- Policy 1: Allow authenticated users to upload avatar files to the edfellow bucket
CREATE POLICY "Users can upload avatar files to edfellow bucket" 
ON storage.objects 
FOR INSERT 
TO authenticated 
WITH CHECK (
  bucket_id = 'edfellow' 
  AND (storage.foldername(name))[1] = 'avatars'
  AND auth.uid()::text = (storage.foldername(name))[2]
);

-- Policy 2: Allow users to view avatar files in the edfellow bucket
CREATE POLICY "Users can view avatar files in edfellow bucket" 
ON storage.objects 
FOR SELECT 
TO authenticated 
USING (
  bucket_id = 'edfellow' 
  AND (storage.foldername(name))[1] = 'avatars'
);

-- Policy 3: Allow users to update their own avatar files in edfellow bucket
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

-- Policy 4: Allow users to delete their own avatar files in edfellow bucket
CREATE POLICY "Users can delete their own avatar files in edfellow bucket" 
ON storage.objects 
FOR DELETE 
TO authenticated 
USING (
  bucket_id = 'edfellow' 
  AND (storage.foldername(name))[1] = 'avatars'
  AND auth.uid()::text = (storage.foldername(name))[2]
);

-- Optional: Allow public access to view avatar files (uncomment if you want public access)
-- CREATE POLICY "Public can view avatar files in edfellow bucket" 
-- ON storage.objects 
-- FOR SELECT 
-- TO anon 
-- USING (
--   bucket_id = 'edfellow' 
--   AND (storage.foldername(name))[1] = 'avatars'
-- );

-- Verify the bucket exists and is properly configured
-- You can run this query to check if the bucket exists:
-- SELECT * FROM storage.buckets WHERE id = 'edfellow';

-- Check existing policies
-- SELECT * FROM pg_policies WHERE tablename = 'objects' AND schemaname = 'storage';
