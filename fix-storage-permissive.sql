-- Fix Storage Issues with Permissive Policies
-- This script creates very permissive storage policies to allow user registration

-- =============================================
-- STEP 1: DROP ALL EXISTING STORAGE POLICIES
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
DROP POLICY IF EXISTS "edfellow_full_access" ON storage.objects;
DROP POLICY IF EXISTS "feed_media_full_access" ON storage.objects;
DROP POLICY IF EXISTS "feed_media_public_read" ON storage.objects;

-- =============================================
-- STEP 2: CREATE STORAGE BUCKETS
-- =============================================

-- Create edfellow bucket (make it public to avoid RLS issues)
INSERT INTO storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
VALUES (
    'edfellow',
    'edfellow',
    true, -- Make it public
    5242880, -- 5MB
    ARRAY['image/jpeg', 'image/png', 'image/gif', 'image/webp', 'application/pdf', 'text/plain']
)
ON CONFLICT (id) DO UPDATE SET
    public = true, -- Make it public
    file_size_limit = 5242880,
    allowed_mime_types = ARRAY['image/jpeg', 'image/png', 'image/gif', 'image/webp', 'application/pdf', 'text/plain'];

-- Create feed-media bucket
INSERT INTO storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
VALUES (
    'feed-media',
    'feed-media',
    true, -- Public
    10485760, -- 10MB
    ARRAY['image/jpeg', 'image/png', 'image/gif', 'image/webp', 'video/mp4', 'video/webm', 'application/pdf']
)
ON CONFLICT (id) DO UPDATE SET
    public = true,
    file_size_limit = 10485760,
    allowed_mime_types = ARRAY['image/jpeg', 'image/png', 'image/gif', 'image/webp', 'video/mp4', 'video/webm', 'application/pdf'];

-- =============================================
-- STEP 3: CREATE VERY PERMISSIVE POLICIES
-- =============================================

-- Allow authenticated users to do everything with storage
CREATE POLICY "authenticated_full_access"
ON storage.objects
FOR ALL
TO authenticated
USING (true)
WITH CHECK (true);

-- Allow public read access to all storage
CREATE POLICY "public_read_access"
ON storage.objects
FOR SELECT
TO public
USING (true);

-- =============================================
-- STEP 4: DISABLE RLS ON PUBLIC TABLES
-- =============================================

-- Disable RLS on public.users table
ALTER TABLE public.users DISABLE ROW LEVEL SECURITY;

-- Drop all policies on public.users
DO $$
DECLARE
    policy_name text;
BEGIN
    FOR policy_name IN
        SELECT policyname
        FROM pg_policies
        WHERE schemaname = 'public'
        AND tablename = 'users'
    LOOP
        EXECUTE format('DROP POLICY IF EXISTS %I ON public.users', policy_name);
        RAISE NOTICE 'Dropped policy: % on public.users', policy_name;
    END LOOP;
END $$;

-- =============================================
-- VERIFICATION
-- =============================================

-- Check storage buckets
SELECT id, name, public FROM storage.buckets WHERE id IN ('edfellow', 'feed-media');

-- Check storage policies
SELECT policyname, cmd, roles FROM pg_policies WHERE schemaname = 'storage' AND tablename = 'objects';

-- Check users table RLS status
SELECT schemaname, tablename, rowsecurity FROM pg_tables WHERE schemaname = 'public' AND tablename = 'users';

-- =============================================
-- SUCCESS MESSAGE
-- =============================================

DO $$
BEGIN
    RAISE NOTICE '✅ STORAGE POLICIES FIXED!';
    RAISE NOTICE '✅ User registration should now work without storage policy errors.';
    RAISE NOTICE '✅ Storage buckets are configured and public.';
    RAISE NOTICE '✅ Very permissive policies allow all operations.';
    RAISE NOTICE '⚠️  WARNING: This reduces security. Re-enable proper policies later.';
END $$;
