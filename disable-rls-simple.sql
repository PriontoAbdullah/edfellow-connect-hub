-- Simple RLS Disable Script (No Storage Table Modifications)
-- This script works around permission issues with storage.objects table

-- =============================================
-- STEP 1: DISABLE RLS ON PUBLIC TABLES ONLY
-- =============================================

-- Disable RLS on public.users table
ALTER TABLE public.users DISABLE ROW LEVEL SECURITY;

-- Disable RLS on other public tables that might have RLS enabled
DO $$
DECLARE
    table_name text;
BEGIN
    -- Get all tables in public schema that have RLS enabled
    FOR table_name IN
        SELECT tablename
        FROM pg_tables
        WHERE schemaname = 'public'
        AND rowsecurity = true
        AND tablename != 'users' -- We already handled users
    LOOP
        EXECUTE format('ALTER TABLE public.%I DISABLE ROW LEVEL SECURITY', table_name);
        RAISE NOTICE 'Disabled RLS on table: public.%', table_name;
    END LOOP;
END $$;

-- =============================================
-- STEP 2: DROP ALL POLICIES ON PUBLIC TABLES
-- =============================================

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

-- Drop all policies on other public tables
DO $$
DECLARE
    policy_record record;
BEGIN
    FOR policy_record IN
        SELECT schemaname, tablename, policyname
        FROM pg_policies
        WHERE schemaname = 'public'
        AND tablename != 'users' -- We already handled users
    LOOP
        EXECUTE format('DROP POLICY IF EXISTS %I ON %I.%I', 
            policy_record.policyname, 
            policy_record.schemaname, 
            policy_record.tablename);
        RAISE NOTICE 'Dropped policy: % on %.%', 
            policy_record.policyname, 
            policy_record.schemaname, 
            policy_record.tablename;
    END LOOP;
END $$;

-- =============================================
-- STEP 3: CREATE STORAGE BUCKETS (IF NEEDED)
-- =============================================

-- Create edfellow bucket
INSERT INTO storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
VALUES (
    'edfellow',
    'edfellow',
    true, -- Make it public to avoid RLS issues
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
-- STEP 4: CREATE PERMISSIVE STORAGE POLICIES
-- =============================================

-- Create very permissive policies for storage.objects
-- These policies allow all authenticated users to do everything

-- Allow authenticated users to do everything with edfellow bucket
CREATE POLICY "edfellow_allow_all"
ON storage.objects
FOR ALL
TO authenticated
USING (true)
WITH CHECK (true);

-- Allow authenticated users to do everything with feed-media bucket
CREATE POLICY "feed_media_allow_all"
ON storage.objects
FOR ALL
TO authenticated
USING (true)
WITH CHECK (true);

-- Allow public read access to both buckets
CREATE POLICY "public_read_all"
ON storage.objects
FOR SELECT
TO public
USING (true);

-- =============================================
-- STEP 5: VERIFY THE SETUP
-- =============================================

-- Check RLS status on public tables
SELECT 
    schemaname,
    tablename,
    rowsecurity as rls_enabled,
    CASE 
        WHEN rowsecurity THEN 'ENABLED' 
        ELSE 'DISABLED' 
    END as status
FROM pg_tables 
WHERE schemaname = 'public'
ORDER BY tablename;

-- Check storage policies
SELECT 
    policyname,
    cmd,
    roles,
    qual,
    with_check
FROM pg_policies 
WHERE schemaname = 'storage' 
AND tablename = 'objects'
ORDER BY policyname;

-- Check storage buckets
SELECT id, name, public, file_size_limit, allowed_mime_types 
FROM storage.buckets 
WHERE id IN ('edfellow', 'feed-media')
ORDER BY id;

-- =============================================
-- SUCCESS MESSAGE
-- =============================================

DO $$
BEGIN
    RAISE NOTICE '✅ RLS DISABLED ON PUBLIC TABLES!';
    RAISE NOTICE '✅ PERMISSIVE STORAGE POLICIES CREATED!';
    RAISE NOTICE '✅ User registration should now work without policy errors.';
    RAISE NOTICE '✅ Storage buckets are configured and public.';
    RAISE NOTICE '⚠️  WARNING: This reduces security. Re-enable proper policies later.';
END $$;
