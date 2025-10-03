import { createClient } from '@supabase/supabase-js';
import dotenv from 'dotenv';

// Load environment variables
dotenv.config();

const supabaseUrl = process.env.VITE_SUPABASE_URL;
const supabaseKey = process.env.VITE_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseKey) {
  console.error('❌ Missing Supabase environment variables');
  process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseKey);

async function testPostCreation() {
  try {
    console.log('🧪 Testing post creation...');

    // Try to create a test post (this will fail if columns are missing)
    const { data, error } = await supabase
      .from('group_posts')
      .insert({
        title: 'Test Post',
        content: 'This is a test post',
        post_type: 'discussion',
        group_id: '44444444-4444-4444-4444-444444444444',
        author_id: 'test-user-id',
        attachments: ['test-attachment-url'], // This will fail if attachments column doesn't exist
      })
      .select();

    if (error) {
      console.error('❌ Post creation failed:', error.message);

      if (error.message.includes('attachments')) {
        console.log('\n🔧 SOLUTION:');
        console.log(
          'The "attachments" column is missing from the group_posts table.'
        );
        console.log(
          'Please run the SQL in QUICK_DATABASE_FIX.sql in your Supabase SQL Editor.'
        );
        console.log('\nSteps:');
        console.log('1. Go to your Supabase project dashboard');
        console.log('2. Navigate to SQL Editor');
        console.log('3. Copy and paste the contents of QUICK_DATABASE_FIX.sql');
        console.log('4. Execute the SQL');
        console.log('5. Try creating a post again');
      } else if (error.message.includes('is_pinned')) {
        console.log('\n🔧 SOLUTION:');
        console.log(
          'The "is_pinned" column is missing from the group_posts table.'
        );
        console.log(
          'Please run the SQL in QUICK_DATABASE_FIX.sql in your Supabase SQL Editor.'
        );
      }
      return;
    }

    console.log('✅ Post creation successful!');
    console.log('📊 Created post:', data);
  } catch (error) {
    console.error('❌ Unexpected error:', error);
  }
}

// Run the test
testPostCreation();
