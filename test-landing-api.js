#!/usr/bin/env node

/**
 * Test script for Landing Page API
 * This script tests the landing page API functions to ensure they work correctly
 */

import { createClient } from '@supabase/supabase-js';
import dotenv from 'dotenv';

// Load environment variables
dotenv.config();

// Initialize Supabase client
const supabaseUrl = process.env.VITE_SUPABASE_URL;
const supabaseKey = process.env.VITE_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseKey) {
  console.error('❌ Missing Supabase environment variables');
  console.error(
    'Please ensure VITE_SUPABASE_URL and VITE_SUPABASE_ANON_KEY are set'
  );
  process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseKey);

// Test functions (simplified versions of our API functions)
async function testLandingPageStats() {
  console.log('🔍 Testing landing page statistics...');

  try {
    // Get total users
    const { count: totalUsers, error: usersError } = await supabase
      .from('users')
      .select('*', { count: 'exact', head: true });

    if (usersError) throw usersError;

    // Get total programs
    const { count: totalPrograms, error: programsError } = await supabase
      .from('programs')
      .select('*', { count: 'exact', head: true })
      .eq('is_active', true);

    if (programsError) throw programsError;

    // Get total posts
    const { count: totalPosts, error: postsError } = await supabase
      .from('posts')
      .select('*', { count: 'exact', head: true })
      .eq('visibility', 'public');

    if (postsError) throw postsError;

    console.log('✅ Statistics loaded successfully:');
    console.log(`   - Total Users: ${totalUsers || 0}`);
    console.log(`   - Total Programs: ${totalPrograms || 0}`);
    console.log(`   - Total Posts: ${totalPosts || 0}`);

    return true;
  } catch (error) {
    console.error('❌ Error loading statistics:', error.message);
    return false;
  }
}

async function testFeaturedPrograms() {
  console.log('🔍 Testing featured programs...');

  try {
    const { data, error } = await supabase
      .from('programs')
      .select(
        `
        id,
        title,
        description,
        degree_level,
        duration,
        location,
        cost,
        rating,
        applications_count,
        image_url,
        tags,
        is_featured,
        university:university_id (
          id,
          display_name,
          logo_url,
          country
        )
      `
      )
      .eq('is_active', true)
      .eq('is_featured', true)
      .order('rating', { ascending: false })
      .limit(6);

    if (error) throw error;

    console.log(
      `✅ Featured programs loaded successfully: ${data?.length || 0} programs`
    );

    if (data && data.length > 0) {
      console.log('   Sample program:', data[0].title);
    }

    return true;
  } catch (error) {
    console.error('❌ Error loading featured programs:', error.message);
    return false;
  }
}

async function testRecentPosts() {
  console.log('🔍 Testing recent posts...');

  try {
    const { data, error } = await supabase
      .from('posts')
      .select(
        `
        id,
        title,
        content,
        post_type,
        visibility,
        tags,
        likes_count,
        comments_count,
        created_at,
        author:author_id (
          id,
          display_name,
          role,
          avatar,
          country
        )
      `
      )
      .eq('visibility', 'public')
      .order('created_at', { ascending: false })
      .limit(8);

    if (error) throw error;

    console.log(
      `✅ Recent posts loaded successfully: ${data?.length || 0} posts`
    );

    if (data && data.length > 0) {
      console.log('   Sample post:', data[0].title || 'Untitled');
    }

    return true;
  } catch (error) {
    console.error('❌ Error loading recent posts:', error.message);
    return false;
  }
}

async function testDatabaseConnection() {
  console.log('🔍 Testing database connection...');

  try {
    const { data, error } = await supabase
      .from('users')
      .select('count')
      .limit(1);

    if (error) throw error;

    console.log('✅ Database connection successful');
    return true;
  } catch (error) {
    console.error('❌ Database connection failed:', error.message);
    return false;
  }
}

async function runTests() {
  console.log('🚀 Starting Landing Page API Tests\n');

  const tests = [
    { name: 'Database Connection', fn: testDatabaseConnection },
    { name: 'Landing Page Stats', fn: testLandingPageStats },
    { name: 'Featured Programs', fn: testFeaturedPrograms },
    { name: 'Recent Posts', fn: testRecentPosts },
  ];

  let passed = 0;
  let failed = 0;

  for (const test of tests) {
    console.log(`\n📋 Running: ${test.name}`);
    const result = await test.fn();

    if (result) {
      passed++;
    } else {
      failed++;
    }
  }

  console.log('\n📊 Test Results:');
  console.log(`✅ Passed: ${passed}`);
  console.log(`❌ Failed: ${failed}`);
  console.log(
    `📈 Success Rate: ${Math.round((passed / (passed + failed)) * 100)}%`
  );

  if (failed === 0) {
    console.log('\n🎉 All tests passed! Your landing page API is ready to go!');
  } else {
    console.log(
      '\n⚠️  Some tests failed. Please check your database setup and try again.'
    );
  }

  return failed === 0;
}

// Run the tests
runTests()
  .then((success) => {
    process.exit(success ? 0 : 1);
  })
  .catch((error) => {
    console.error('💥 Test runner failed:', error);
    process.exit(1);
  });
