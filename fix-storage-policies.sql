-- Fix for storage.objects table RLS policy violations
-- This script will fix storage policies that are blocking user registration

-- =============================================
-- STORAGE POLICIES FIX
-- =============================================

-- First, let's check what storage buckets exist and their policies
DO $$
DECLARE
    bucket_name text;
    policy_name text;
BEGIN
    -- Get all storage buckets
    FOR bucket_name IN 
        SELECT name 
        FROM storage.buckets 
        WHERE public = false OR public IS NULL
    LOOP
        RAISE NOTICE 'Found bucket: %', bucket_name;
        
        -- Get all policies for this bucket
        FOR policy_name IN
            SELECT pol.policyname
            FROM pg_policies pol
            WHERE pol.tablename = 'objects'
            AND pol.schemaname = 'storage'
            AND pol.qual LIKE '%' || bucket_name || '%'
        LOOP
            RAISE NOTICE 'Found policy: % for bucket: %', policy_name, bucket_name;
        END LOOP;
    END LOOP;
END $$;

-- Drop all existing storage policies that might be causing issues
DO $$
DECLARE
    policy_name text;
BEGIN
    -- Get all policies on storage.objects
    FOR policy_name IN
        SELECT pol.policyname
        FROM pg_policies pol
        WHERE pol.tablename = 'objects'
        AND pol.schemaname = 'storage'
    LOOP
        -- Drop the policy
        EXECUTE format('DROP POLICY IF EXISTS %I ON storage.objects', policy_name);
        RAISE NOTICE 'Dropped policy: %', policy_name;
    END LOOP;
END $$;

-- Create basic storage policies that allow authenticated users to work with files
-- These policies are more permissive to avoid blocking user registration

-- Policy for SELECT (viewing files)
CREATE POLICY "Authenticated users can view files" ON storage.objects
    FOR SELECT USING (auth.uid() IS NOT NULL);

-- Policy for INSERT (uploading files)
CREATE POLICY "Authenticated users can upload files" ON storage.objects
    FOR INSERT WITH CHECK (auth.uid() IS NOT NULL);

-- Policy for UPDATE (updating files)
CREATE POLICY "Users can update their own files" ON storage.objects
    FOR UPDATE USING (
        auth.uid() IS NOT NULL AND (
            auth.uid()::text = (storage.foldername(name))[1] OR
            bucket_id IN ('avatars', 'public', 'feed-media')
        )
    );

-- Policy for DELETE (deleting files)
CREATE POLICY "Users can delete their own files" ON storage.objects
    FOR DELETE USING (
        auth.uid() IS NOT NULL AND (
            auth.uid()::text = (storage.foldername(name))[1] OR
            bucket_id IN ('avatars', 'public', 'feed-media')
        )
    );

-- =============================================
-- CREATE MISSING STORAGE BUCKETS
-- =============================================

-- Create avatars bucket if it doesn't exist
INSERT INTO storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
VALUES (
    'avatars',
    'avatars',
    true,
    5242880, -- 5MB limit
    ARRAY['image/jpeg', 'image/png', 'image/gif', 'image/webp']
)
ON CONFLICT (id) DO NOTHING;

-- Create public bucket if it doesn't exist
INSERT INTO storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
VALUES (
    'public',
    'public',
    true,
    10485760, -- 10MB limit
    ARRAY['image/jpeg', 'image/png', 'image/gif', 'image/webp', 'application/pdf', 'text/plain']
)
ON CONFLICT (id) DO NOTHING;

-- Create feed-media bucket if it doesn't exist
INSERT INTO storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
VALUES (
    'feed-media',
    'feed-media',
    true,
    52428800, -- 50MB limit
    ARRAY['image/jpeg', 'image/png', 'image/gif', 'image/webp', 'video/mp4', 'video/webm', 'application/pdf']
)
ON CONFLICT (id) DO NOTHING;

-- =============================================
-- SPECIFIC BUCKET POLICIES
-- =============================================

-- Avatars bucket policies
CREATE POLICY "Anyone can view avatars" ON storage.objects
    FOR SELECT USING (bucket_id = 'avatars');

CREATE POLICY "Authenticated users can upload avatars" ON storage.objects
    FOR INSERT WITH CHECK (
        bucket_id = 'avatars' AND
        auth.uid() IS NOT NULL AND
        auth.uid()::text = (storage.foldername(name))[1]
    );

CREATE POLICY "Users can update their own avatars" ON storage.objects
    FOR UPDATE USING (
        bucket_id = 'avatars' AND
        auth.uid()::text = (storage.foldername(name))[1]
    );

CREATE POLICY "Users can delete their own avatars" ON storage.objects
    FOR DELETE USING (
        bucket_id = 'avatars' AND
        auth.uid()::text = (storage.foldername(name))[1]
    );

-- Public bucket policies
CREATE POLICY "Anyone can view public files" ON storage.objects
    FOR SELECT USING (bucket_id = 'public');

CREATE POLICY "Authenticated users can upload to public" ON storage.objects
    FOR INSERT WITH CHECK (
        bucket_id = 'public' AND
        auth.uid() IS NOT NULL
    );

CREATE POLICY "Users can update their public files" ON storage.objects
    FOR UPDATE USING (
        bucket_id = 'public' AND
        auth.uid()::text = (storage.foldername(name))[1]
    );

CREATE POLICY "Users can delete their public files" ON storage.objects
    FOR DELETE USING (
        bucket_id = 'public' AND
        auth.uid()::text = (storage.foldername(name))[1]
    );

-- Feed-media bucket policies
CREATE POLICY "Anyone can view feed media" ON storage.objects
    FOR SELECT USING (bucket_id = 'feed-media');

CREATE POLICY "Authenticated users can upload feed media" ON storage.objects
    FOR INSERT WITH CHECK (
        bucket_id = 'feed-media' AND
        auth.uid() IS NOT NULL AND
        auth.uid()::text = (storage.foldername(name))[1]
    );

CREATE POLICY "Users can update their feed media" ON storage.objects
    FOR UPDATE USING (
        bucket_id = 'feed-media' AND
        auth.uid()::text = (storage.foldername(name))[1]
    );

CREATE POLICY "Users can delete their feed media" ON storage.objects
    FOR DELETE USING (
        bucket_id = 'feed-media' AND
        auth.uid()::text = (storage.foldername(name))[1]
    );

-- =============================================
-- ADDITIONAL USER TABLE POLICY FIX
-- =============================================

-- Make sure users table policies are working correctly
DO $$
BEGIN
    -- Drop and recreate users policies to ensure they're clean
    DROP POLICY IF EXISTS "Users can view their own profile" ON public.users;
    DROP POLICY IF EXISTS "Users can update their own profile" ON public.users;
    DROP POLICY IF EXISTS "Users can insert their own profile" ON public.users;
    DROP POLICY IF EXISTS "Enable insert for authenticated users only" ON public.users;
    DROP POLICY IF EXISTS "Enable read access for all users" ON public.users;
    DROP POLICY IF EXISTS "Enable update for users based on email" ON public.users;
    
    -- Create clean users policies
    CREATE POLICY "Users can view their own profile" ON public.users
        FOR SELECT USING (auth.uid() = id);
        
    CREATE POLICY "Users can update their own profile" ON public.users
        FOR UPDATE USING (auth.uid() = id);
        
    CREATE POLICY "Users can insert their own profile" ON public.users
        FOR INSERT WITH CHECK (auth.uid() = id OR auth.uid() IS NULL);
        
    RAISE NOTICE 'Fixed users table policies';
END $$;

-- =============================================
-- SUMMARY
-- =============================================

-- Show what buckets exist
SELECT id, name, public, created_at FROM storage.buckets ORDER BY created_at;

-- Show current storage policies
SELECT 
    policyname,
    permissive,
    roles,
    cmd,
    qual,
    with_check
FROM pg_policies 
WHERE schemaname = 'storage' 
AND tablename = 'objects'
ORDER BY policyname;

-- Show current users policies
SELECT 
    policyname,
    permissive,
    roles,
    cmd,
    qual,
    with_check
FROM pg_policies 
WHERE schemaname = 'public' 
AND tablename = 'users'
ORDER BY policyname;
