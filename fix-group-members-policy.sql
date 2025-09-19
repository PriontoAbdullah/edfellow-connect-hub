-- Fix for infinite recursion in group_members table policy
-- This script will drop problematic policies and recreate them properly

-- First, let's check if the group_members table exists and drop problematic policies
DO $$
BEGIN
    -- Drop all existing policies on group_members table if it exists
    IF EXISTS (SELECT 1 FROM information_schema.tables WHERE table_name = 'group_members' AND table_schema = 'public') THEN
        -- Drop all policies on group_members table
        DROP POLICY IF EXISTS "group_members_select_policy" ON public.group_members;
        DROP POLICY IF EXISTS "group_members_insert_policy" ON public.group_members;
        DROP POLICY IF EXISTS "group_members_update_policy" ON public.group_members;
        DROP POLICY IF EXISTS "group_members_delete_policy" ON public.group_members;
        DROP POLICY IF EXISTS "Users can view group members" ON public.group_members;
        DROP POLICY IF EXISTS "Users can join groups" ON public.group_members;
        DROP POLICY IF EXISTS "Users can leave groups" ON public.group_members;
        DROP POLICY IF EXISTS "Group admins can manage members" ON public.group_members;
        
        -- Disable RLS temporarily
        ALTER TABLE public.group_members DISABLE ROW LEVEL SECURITY;
        
        -- Re-enable RLS
        ALTER TABLE public.group_members ENABLE ROW LEVEL SECURITY;
        
        -- Create simple, non-recursive policies
        CREATE POLICY "group_members_select_policy" ON public.group_members
            FOR SELECT USING (true);
            
        CREATE POLICY "group_members_insert_policy" ON public.group_members
            FOR INSERT WITH CHECK (auth.uid() IS NOT NULL);
            
        CREATE POLICY "group_members_update_policy" ON public.group_members
            FOR UPDATE USING (auth.uid() IS NOT NULL);
            
        CREATE POLICY "group_members_delete_policy" ON public.group_members
            FOR DELETE USING (auth.uid() IS NOT NULL);
            
        RAISE NOTICE 'Fixed group_members table policies';
    ELSE
        RAISE NOTICE 'group_members table does not exist';
    END IF;
END $$;

-- Also check for any other group-related tables that might have similar issues
DO $$
BEGIN
    -- Check for groups table
    IF EXISTS (SELECT 1 FROM information_schema.tables WHERE table_name = 'groups' AND table_schema = 'public') THEN
        -- Drop all policies on groups table
        DROP POLICY IF EXISTS "groups_select_policy" ON public.groups;
        DROP POLICY IF EXISTS "groups_insert_policy" ON public.groups;
        DROP POLICY IF EXISTS "groups_update_policy" ON public.groups;
        DROP POLICY IF EXISTS "groups_delete_policy" ON public.groups;
        DROP POLICY IF EXISTS "Users can view groups" ON public.groups;
        DROP POLICY IF EXISTS "Users can create groups" ON public.groups;
        DROP POLICY IF EXISTS "Group owners can update groups" ON public.groups;
        DROP POLICY IF EXISTS "Group owners can delete groups" ON public.groups;
        
        -- Disable RLS temporarily
        ALTER TABLE public.groups DISABLE ROW LEVEL SECURITY;
        
        -- Re-enable RLS
        ALTER TABLE public.groups ENABLE ROW LEVEL SECURITY;
        
        -- Create simple, non-recursive policies
        CREATE POLICY "groups_select_policy" ON public.groups
            FOR SELECT USING (true);
            
        CREATE POLICY "groups_insert_policy" ON public.groups
            FOR INSERT WITH CHECK (auth.uid() IS NOT NULL);
            
        CREATE POLICY "groups_update_policy" ON public.groups
            FOR UPDATE USING (auth.uid() IS NOT NULL);
            
        CREATE POLICY "groups_delete_policy" ON public.groups
            FOR DELETE USING (auth.uid() IS NOT NULL);
            
        RAISE NOTICE 'Fixed groups table policies';
    ELSE
        RAISE NOTICE 'groups table does not exist';
    END IF;
END $$;

-- Check for any other tables that might reference group_members and cause recursion
DO $$
DECLARE
    table_name text;
    policy_name text;
BEGIN
    -- Get all tables that might have policies referencing group_members
    FOR table_name IN 
        SELECT t.table_name 
        FROM information_schema.tables t
        WHERE t.table_schema = 'public' 
        AND t.table_name LIKE '%group%'
    LOOP
        -- Get all policies for this table
        FOR policy_name IN
            SELECT pol.policyname
            FROM pg_policies pol
            WHERE pol.tablename = table_name
            AND pol.schemaname = 'public'
        LOOP
            -- Drop the policy
            EXECUTE format('DROP POLICY IF EXISTS %I ON public.%I', policy_name, table_name);
        END LOOP;
        
        -- Disable and re-enable RLS
        EXECUTE format('ALTER TABLE public.%I DISABLE ROW LEVEL SECURITY', table_name);
        EXECUTE format('ALTER TABLE public.%I ENABLE ROW LEVEL SECURITY', table_name);
        
        -- Create simple policies
        EXECUTE format('CREATE POLICY %I ON public.%I FOR SELECT USING (true)', 
                      table_name || '_select_policy', table_name);
        EXECUTE format('CREATE POLICY %I ON public.%I FOR INSERT WITH CHECK (auth.uid() IS NOT NULL)', 
                      table_name || '_insert_policy', table_name);
        EXECUTE format('CREATE POLICY %I ON public.%I FOR UPDATE USING (auth.uid() IS NOT NULL)', 
                      table_name || '_update_policy', table_name);
        EXECUTE format('CREATE POLICY %I ON public.%I FOR DELETE USING (auth.uid() IS NOT NULL)', 
                      table_name || '_delete_policy', table_name);
        
        RAISE NOTICE 'Fixed policies for table: %', table_name;
    END LOOP;
END $$;

-- Final check: ensure users table policies are working correctly
DO $$
BEGIN
    -- Make sure users table has proper policies
    IF EXISTS (SELECT 1 FROM information_schema.tables WHERE table_name = 'users' AND table_schema = 'public') THEN
        -- Drop and recreate users policies to ensure they're clean
        DROP POLICY IF EXISTS "Users can view their own profile" ON public.users;
        DROP POLICY IF EXISTS "Users can update their own profile" ON public.users;
        DROP POLICY IF EXISTS "Users can insert their own profile" ON public.users;
        
        -- Create clean users policies
        CREATE POLICY "Users can view their own profile" ON public.users
            FOR SELECT USING (auth.uid() = id);
            
        CREATE POLICY "Users can update their own profile" ON public.users
            FOR UPDATE USING (auth.uid() = id);
            
        CREATE POLICY "Users can insert their own profile" ON public.users
            FOR INSERT WITH CHECK (auth.uid() = id OR auth.uid() IS NULL);
            
        RAISE NOTICE 'Fixed users table policies';
    END IF;
END $$;

-- Show summary of what was fixed
SELECT 
    schemaname,
    tablename,
    policyname,
    permissive,
    roles,
    cmd,
    qual,
    with_check
FROM pg_policies 
WHERE schemaname = 'public' 
AND (tablename LIKE '%group%' OR tablename = 'users')
ORDER BY tablename, policyname;
