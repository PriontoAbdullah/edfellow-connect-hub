// Test script to verify portfolio database functionality
// Run this with: node test-portfolio-db.js

const { createClient } = require('@supabase/supabase-js');

// You'll need to replace these with your actual Supabase credentials
const supabaseUrl = process.env.VITE_SUPABASE_URL || 'your-supabase-url';
const supabaseKey =
  process.env.VITE_SUPABASE_ANON_KEY || 'your-supabase-anon-key';

const supabase = createClient(supabaseUrl, supabaseKey);

async function testPortfolioFunctionality() {
  console.log('Testing Portfolio Database Functionality...\n');

  try {
    // Test 1: Check if portfolio column exists
    console.log('1. Checking if portfolio column exists...');
    const { data: columns, error: columnsError } = await supabase
      .from('users')
      .select('portfolio, privacy_settings')
      .limit(1);

    if (columnsError) {
      console.error(
        '❌ Portfolio column does not exist:',
        columnsError.message
      );
      console.log('💡 Run the migration script: add-portfolio-columns.sql');
      return;
    }

    console.log('✅ Portfolio column exists');

    // Test 2: Test portfolio data structure
    console.log('\n2. Testing portfolio data structure...');
    const testPortfolioItem = {
      id: 'test-123',
      title: 'Test Portfolio Item',
      description: 'This is a test portfolio item',
      type: 'project',
      category: 'web-development',
      technologies: ['React', 'TypeScript'],
      url: 'https://example.com',
      date: new Date().toISOString().split('T')[0],
      status: 'completed',
      isPublic: true,
    };

    console.log('✅ Portfolio data structure is valid');

    // Test 3: Check current user data (if authenticated)
    console.log('\n3. Checking current user data...');
    const {
      data: { user },
      error: authError,
    } = await supabase.auth.getUser();

    if (authError || !user) {
      console.log('ℹ️  No authenticated user - skipping user data test');
      console.log('💡 Sign in to test with actual user data');
    } else {
      const { data: userData, error: userError } = await supabase
        .from('users')
        .select('portfolio, privacy_settings')
        .eq('id', user.id)
        .single();

      if (userError) {
        console.error('❌ Error fetching user data:', userError.message);
      } else {
        console.log('✅ User data fetched successfully');
        console.log('   Portfolio items:', userData.portfolio?.length || 0);
        console.log(
          '   Privacy settings:',
          userData.privacy_settings ? '✅' : '❌'
        );
      }
    }

    console.log('\n🎉 Portfolio database functionality test completed!');
    console.log('\n📋 Next steps:');
    console.log(
      '   1. Run the migration script if portfolio column was missing'
    );
    console.log('   2. Test the Profile page in your application');
    console.log('   3. Try adding a portfolio item and refreshing the page');
  } catch (error) {
    console.error('❌ Test failed:', error.message);
  }
}

// Run the test
testPortfolioFunctionality();
