import { createClient } from '@supabase/supabase-js';
import dotenv from 'dotenv';

// Load environment variables
dotenv.config();

const supabaseUrl = process.env.VITE_SUPABASE_URL;
const supabaseKey = process.env.VITE_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseKey) {
  console.error('Missing Supabase environment variables');
  process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseKey);

async function testGroupPosts() {
  try {
    console.log('🧪 Testing group_posts query...');

    // Test the exact query that was failing
    const { data, error } = await supabase
      .from('group_posts')
      .select(
        `
        *,
        author:author_id(id, display_name, avatar, role, country),
        comment_count:group_post_comments(count)
      `
      )
      .eq('group_id', '44444444-4444-4444-4444-444444444444')
      .order('created_at', { ascending: false })
      .limit(1);

    if (error) {
      console.error('❌ Query failed:', error);
      console.error('Error details:', error.message);

      if (error.message.includes('is_pinned')) {
        console.log('\n🔧 Solution: Run the SQL in add-missing-columns.sql');
        console.log(
          '   This will add the missing is_pinned column to the group_posts table.'
        );
      }
    } else {
      console.log('✅ Query successful!');
      console.log('📊 Sample data:', data);
    }
  } catch (error) {
    console.error('❌ Unexpected error:', error);
  }
}

// Run the test
testGroupPosts();
