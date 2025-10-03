// Test script to verify the group join fix
// This script tests the joinGroup function to ensure it handles duplicate memberships correctly

import { createClient } from '@supabase/supabase-js';
import dotenv from 'dotenv';

// Load environment variables
dotenv.config();

const supabaseUrl = process.env.VITE_SUPABASE_URL;
const supabaseKey = process.env.VITE_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseKey) {
  console.error('❌ Missing Supabase environment variables');
  console.log(
    'Please set VITE_SUPABASE_URL and VITE_SUPABASE_ANON_KEY in your .env file'
  );
  process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseKey);

async function testGroupJoin() {
  console.log('Testing group join functionality...');

  try {
    // Test 1: Check if we can query group_members table
    console.log('\n1. Testing group_members table access...');
    const { data: members, error: membersError } = await supabase
      .from('group_members')
      .select('*')
      .limit(5);

    if (membersError) {
      console.error('Error accessing group_members:', membersError);
    } else {
      console.log('✅ Successfully accessed group_members table');
      console.log('Sample members:', members);
    }

    // Test 2: Check if we can query groups table
    console.log('\n2. Testing groups table access...');
    const { data: groups, error: groupsError } = await supabase
      .from('groups')
      .select('*')
      .limit(5);

    if (groupsError) {
      console.error('Error accessing groups:', groupsError);
    } else {
      console.log('✅ Successfully accessed groups table');
      console.log('Sample groups:', groups);
    }

    // Test 3: Test membership check query
    console.log('\n3. Testing membership check query...');
    const testUserId = '5094efec-2210-4a2d-88c8-d7ffa997be19'; // From the error
    const testGroupId = '33333333-3333-3333-3333-333333333333'; // From the error

    const { data: existingMembers, error: memberCheckError } = await supabase
      .from('group_members')
      .select('*')
      .eq('group_id', testGroupId)
      .eq('user_id', testUserId);

    if (memberCheckError) {
      console.error('Error checking membership:', memberCheckError);
    } else {
      console.log('✅ Successfully checked membership');
      console.log('Existing members:', existingMembers);

      if (existingMembers && existingMembers.length > 0) {
        console.log(
          '⚠️  User is already a member with status:',
          existingMembers[0].status
        );
        console.log('Full membership record:', existingMembers[0]);
      } else {
        console.log('✅ User is not a member');
      }
    }

    // Test 3.5: Check all memberships for this user
    console.log('\n3.5. Testing all memberships for this user...');
    const { data: allUserMemberships, error: allMembershipsError } =
      await supabase
        .from('group_members')
        .select('*')
        .eq('user_id', testUserId);

    if (allMembershipsError) {
      console.error('Error checking all memberships:', allMembershipsError);
    } else {
      console.log('✅ Successfully checked all user memberships');
      console.log('All memberships for user:', allUserMemberships);
    }

    // Test 4: Test group info query
    console.log('\n4. Testing group info query...');
    const { data: group, error: groupError } = await supabase
      .from('groups')
      .select('is_private')
      .eq('id', testGroupId)
      .single();

    if (groupError) {
      console.error('Error checking group:', groupError);
    } else {
      console.log('✅ Successfully checked group');
      console.log('Group is private:', group.is_private);
    }
  } catch (error) {
    console.error('Test failed:', error);
  }
}

// Run the test
testGroupJoin();
