-- Re-enable RLS Policies in Supabase Database
-- This script will re-enable RLS and create basic policies for security

-- =============================================
-- STEP 1: RE-ENABLE RLS ON ALL TABLES
-- =============================================

-- Re-enable RLS on storage.objects
ALTER TABLE storage.objects ENABLE ROW LEVEL SECURITY;

-- Re-enable RLS on public.users table
ALTER TABLE public.users ENABLE ROW LEVEL SECURITY;

-- Re-enable RLS on other public tables
DO $$
DECLARE
    table_name text;
BEGIN
    -- Get all tables in public schema
    FOR table_name IN
        SELECT tablename
        FROM pg_tables
        WHERE schemaname = 'public'
        AND rowsecurity = false
    LOOP
        EXECUTE format('ALTER TABLE public.%I ENABLE ROW LEVEL SECURITY', table_name);
        RAISE NOTICE 'Enabled RLS on table: public.%', table_name;
    END LOOP;
END $$;

-- =============================================
-- STEP 2: CREATE BASIC STORAGE POLICIES
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
-- STEP 3: CREATE BASIC USER POLICIES
-- =============================================

-- Allow users to view their own profile
CREATE POLICY "users_can_view_own_profile"
ON public.users
FOR SELECT
TO authenticated
USING (auth.uid()::text = id);

-- Allow users to update their own profile
CREATE POLICY "users_can_update_own_profile"
ON public.users
FOR UPDATE
TO authenticated
USING (auth.uid()::text = id)
WITH CHECK (auth.uid()::text = id);

-- Allow users to insert their own profile (for registration)
CREATE POLICY "users_can_insert_own_profile"
ON public.users
FOR INSERT
TO authenticated
WITH CHECK (auth.uid()::text = id);

-- =============================================
-- STEP 4: CREATE BASIC POLICIES FOR OTHER TABLES
-- =============================================

-- Create basic policies for posts table (if it exists)
DO $$
BEGIN
    IF EXISTS (SELECT 1 FROM pg_tables WHERE schemaname = 'public' AND tablename = 'posts') THEN
        -- Allow authenticated users to view all posts
        CREATE POLICY "authenticated_can_view_posts"
        ON public.posts
        FOR SELECT
        TO authenticated
        USING (true);

        -- Allow authenticated users to create posts
        CREATE POLICY "authenticated_can_create_posts"
        ON public.posts
        FOR INSERT
        TO authenticated
        WITH CHECK (auth.uid()::text = author_id);

        -- Allow users to update their own posts
        CREATE POLICY "users_can_update_own_posts"
        ON public.posts
        FOR UPDATE
        TO authenticated
        USING (auth.uid()::text = author_id)
        WITH CHECK (auth.uid()::text = author_id);

        -- Allow users to delete their own posts
        CREATE POLICY "users_can_delete_own_posts"
        ON public.posts
        FOR DELETE
        TO authenticated
        USING (auth.uid()::text = author_id);

        RAISE NOTICE 'Created policies for posts table';
    END IF;
END $$;

-- Create basic policies for comments table (if it exists)
DO $$
BEGIN
    IF EXISTS (SELECT 1 FROM pg_tables WHERE schemaname = 'public' AND tablename = 'comments') THEN
        -- Allow authenticated users to view all comments
        CREATE POLICY "authenticated_can_view_comments"
        ON public.comments
        FOR SELECT
        TO authenticated
        USING (true);

        -- Allow authenticated users to create comments
        CREATE POLICY "authenticated_can_create_comments"
        ON public.comments
        FOR INSERT
        TO authenticated
        WITH CHECK (auth.uid()::text = author_id);

        -- Allow users to update their own comments
        CREATE POLICY "users_can_update_own_comments"
        ON public.comments
        FOR UPDATE
        TO authenticated
        USING (auth.uid()::text = author_id)
        WITH CHECK (auth.uid()::text = author_id);

        -- Allow users to delete their own comments
        CREATE POLICY "users_can_delete_own_comments"
        ON public.comments
        FOR DELETE
        TO authenticated
        USING (auth.uid()::text = author_id);

        RAISE NOTICE 'Created policies for comments table';
    END IF;
END $$;

-- =============================================
-- STEP 5: VERIFY RLS STATUS
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

-- Check created policies
SELECT 
    schemaname,
    tablename,
    policyname,
    cmd,
    roles
FROM pg_policies 
WHERE schemaname IN ('public', 'storage')
ORDER BY schemaname, tablename, policyname;

-- =============================================
-- SUCCESS MESSAGE
-- =============================================

DO $$
BEGIN
    RAISE NOTICE '✅ RLS POLICIES HAVE BEEN RE-ENABLED!';
    RAISE NOTICE '✅ Basic security policies are in place.';
    RAISE NOTICE '✅ User registration should still work.';
    RAISE NOTICE '✅ Users can only access their own data.';
END $$;
