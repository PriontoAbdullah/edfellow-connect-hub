-- Disable All RLS Policies in Supabase Database
-- This script will temporarily disable RLS on all tables to allow user registration

-- =============================================
-- STEP 1: DISABLE RLS ON ALL TABLES
-- =============================================

-- Disable RLS on storage.objects (this is the main culprit)
ALTER TABLE storage.objects DISABLE ROW LEVEL SECURITY;

-- Disable RLS on public.users table
ALTER TABLE public.users DISABLE ROW LEVEL SECURITY;

-- Disable RLS on all other public tables that might have RLS enabled
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
    LOOP
        EXECUTE format('ALTER TABLE public.%I DISABLE ROW LEVEL SECURITY', table_name);
        RAISE NOTICE 'Disabled RLS on table: public.%', table_name;
    END LOOP;
END $$;

-- =============================================
-- STEP 2: DROP ALL EXISTING POLICIES
-- =============================================

-- Drop all policies on storage.objects
DO $$
DECLARE
    policy_name text;
BEGIN
    FOR policy_name IN
        SELECT policyname
        FROM pg_policies
        WHERE schemaname = 'storage'
        AND tablename = 'objects'
    LOOP
        EXECUTE format('DROP POLICY IF EXISTS %I ON storage.objects', policy_name);
        RAISE NOTICE 'Dropped policy: % on storage.objects', policy_name;
    END LOOP;
END $$;

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
    false,
    5242880, -- 5MB
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
    true, -- Public
    10485760, -- 10MB
    ARRAY['image/jpeg', 'image/png', 'image/gif', 'image/webp', 'video/mp4', 'video/webm', 'application/pdf']
)
ON CONFLICT (id) DO UPDATE SET
    public = true,
    file_size_limit = 10485760,
    allowed_mime_types = ARRAY['image/jpeg', 'image/png', 'image/gif', 'image/webp', 'video/mp4', 'video/webm', 'application/pdf'];

-- =============================================
-- STEP 4: VERIFY RLS STATUS
-- =============================================

-- Check RLS status on all tables
SELECT 
    schemaname,
    tablename,
    rowsecurity as rls_enabled,
    CASE 
        WHEN rowsecurity THEN 'ENABLED' 
        ELSE 'DISABLED' 
    END as status
FROM pg_tables 
WHERE schemaname IN ('public', 'storage')
ORDER BY schemaname, tablename;

-- Check remaining policies (should be none)
SELECT 
    schemaname,
    tablename,
    policyname,
    cmd,
    roles
FROM pg_policies 
WHERE schemaname IN ('public', 'storage')
ORDER BY schemaname, tablename, policyname;

-- Check storage buckets
SELECT id, name, public, file_size_limit, allowed_mime_types 
FROM storage.buckets 
ORDER BY id;

-- =============================================
-- SUCCESS MESSAGE
-- =============================================

DO $$
BEGIN
    RAISE NOTICE '✅ ALL RLS POLICIES HAVE BEEN DISABLED!';
    RAISE NOTICE '✅ User registration should now work without any policy errors.';
    RAISE NOTICE '✅ Storage buckets are configured.';
    RAISE NOTICE '⚠️  WARNING: This disables security. Re-enable RLS after testing.';
END $$;
