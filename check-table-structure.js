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

async function checkTableStructure() {
  try {
    console.log('🔍 Checking group_posts table structure...');

    // Try to get a sample record to see what columns exist
    const { data, error } = await supabase
      .from('group_posts')
      .select('*')
      .limit(1);

    if (error) {
      console.error('❌ Error accessing group_posts table:', error.message);

      if (error.message.includes('title')) {
        console.log('\n🔧 The group_posts table is missing basic columns!');
        console.log('This means the table structure is incomplete.');
        console.log('\nWe need to create the complete table structure.');
      }
      return;
    }

    if (data && data.length > 0) {
      console.log('✅ Table exists. Sample record:');
      console.log('📊 Columns found:', Object.keys(data[0]));
    } else {
      console.log('✅ Table exists but is empty.');
      console.log('📊 No sample data to check columns.');
    }

    // Try to create a test record to see what happens
    console.log('\n🧪 Testing record creation...');
    const { data: testData, error: testError } = await supabase
      .from('group_posts')
      .insert({
        title: 'Test Post',
        content: 'Test content',
        post_type: 'discussion',
        group_id: '44444444-4444-4444-4444-444444444444',
        author_id: 'test-user-id',
      })
      .select();

    if (testError) {
      console.log('❌ Test insert failed:', testError.message);

      if (testError.message.includes('title')) {
        console.log(
          '\n🔧 SOLUTION: The group_posts table needs to be created properly.'
        );
        console.log('The table is missing basic columns like "title".');
        console.log('\nWe need to run the complete schema.');
      }
    } else {
      console.log('✅ Test insert successful!');
      console.log('📊 Created record:', testData);
    }
  } catch (error) {
    console.error('❌ Unexpected error:', error);
  }
}

// Run the check
checkTableStructure();
