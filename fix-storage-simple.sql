-- Simple Storage Policy Fix
-- This is a more direct approach that should work without custom RPC functions

-- =============================================
-- STEP 1: DISABLE RLS TEMPORARILY
-- =============================================

ALTER TABLE storage.objects DISABLE ROW LEVEL SECURITY;

-- =============================================
-- STEP 2: DROP ALL EXISTING POLICIES
-- =============================================

-- Drop all existing policies on storage.objects
DROP POLICY IF EXISTS "authenticated_users_can_upload_to_edfellow" ON storage.objects;
DROP POLICY IF EXISTS "authenticated_users_can_view_edfellow" ON storage.objects;
DROP POLICY IF EXISTS "authenticated_users_can_update_edfellow" ON storage.objects;
DROP POLICY IF EXISTS "authenticated_users_can_delete_edfellow" ON storage.objects;
DROP POLICY IF EXISTS "authenticated_users_can_upload_to_feed_media" ON storage.objects;
DROP POLICY IF EXISTS "everyone_can_view_feed_media" ON storage.objects;
DROP POLICY IF EXISTS "authenticated_users_can_update_feed_media" ON storage.objects;
DROP POLICY IF EXISTS "authenticated_users_can_delete_feed_media" ON storage.objects;
DROP POLICY IF EXISTS "Users can upload avatar files to edfellow bucket" ON storage.objects;
DROP POLICY IF EXISTS "Users can view avatar files in edfellow bucket" ON storage.objects;
DROP POLICY IF EXISTS "Users can update their own avatar files in edfellow bucket" ON storage.objects;
DROP POLICY IF EXISTS "Users can delete their own avatar files in edfellow bucket" ON storage.objects;
DROP POLICY IF EXISTS "avatar_upload_policy" ON storage.objects;
DROP POLICY IF EXISTS "avatar_view_policy" ON storage.objects;
DROP POLICY IF EXISTS "avatar_update_policy" ON storage.objects;
DROP POLICY IF EXISTS "avatar_delete_policy" ON storage.objects;

-- =============================================
-- STEP 3: CREATE STORAGE BUCKETS
-- =============================================

-- Create edfellow bucket
INSERT INTO storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
VALUES (
    'edfellow',
    'edfellow',
    false,
    5242880,
    ARRAY['image/jpeg', 'image/png', 'image/gif', 'image/webp', 'application/pdf', 'text/plain']
)
ON CONFLICT (id) DO UPDATE SET
    public = false,
    file_size_limit = 5242880,
    allowed_mime_types = ARRAY['image/jpeg', 'image/png', 'image/gif', 'image/webp', 'application/pdf', 'text/plain'];

-- Create feed-media bucket
INSERT INTO storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
VALUES (
    'feed-media',
    'feed-media',
    true,
    10485760,
    ARRAY['image/jpeg', 'image/png', 'image/gif', 'image/webp', 'video/mp4', 'video/webm', 'application/pdf']
)
ON CONFLICT (id) DO UPDATE SET
    public = true,
    file_size_limit = 10485760,
    allowed_mime_types = ARRAY['image/jpeg', 'image/png', 'image/gif', 'image/webp', 'video/mp4', 'video/webm', 'application/pdf'];

-- =============================================
-- STEP 4: CREATE SIMPLE POLICIES
-- =============================================

-- Allow authenticated users to do everything with edfellow bucket
CREATE POLICY "edfellow_full_access"
ON storage.objects
FOR ALL
TO authenticated
USING (bucket_id = 'edfellow')
WITH CHECK (bucket_id = 'edfellow');

-- Allow authenticated users to do everything with feed-media bucket
CREATE POLICY "feed_media_full_access"
ON storage.objects
FOR ALL
TO authenticated
USING (bucket_id = 'feed-media')
WITH CHECK (bucket_id = 'feed-media');

-- Allow public read access to feed-media bucket
CREATE POLICY "feed_media_public_read"
ON storage.objects
FOR SELECT
TO public
USING (bucket_id = 'feed-media');

-- =============================================
-- STEP 5: RE-ENABLE RLS
-- =============================================

ALTER TABLE storage.objects ENABLE ROW LEVEL SECURITY;

-- =============================================
-- VERIFICATION
-- =============================================

-- Check buckets
SELECT id, name, public FROM storage.buckets WHERE id IN ('edfellow', 'feed-media');

-- Check policies
SELECT policyname, cmd, roles FROM pg_policies WHERE schemaname = 'storage' AND tablename = 'objects';

-- Check RLS status
SELECT schemaname, tablename, rowsecurity FROM pg_tables WHERE schemaname = 'storage' AND tablename = 'objects';
