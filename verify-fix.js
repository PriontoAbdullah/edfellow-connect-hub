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

async function verifyFix() {
  try {
    console.log('🔍 Verifying database fix...');

    // Test if attachments column exists
    const { data, error } = await supabase
      .from('group_posts')
      .select('id, attachments, is_pinned, is_locked, tags')
      .limit(1);

    if (error) {
      if (error.message.includes('attachments')) {
        console.log('❌ The attachments column is still missing.');
        console.log('Please run the SQL in your Supabase SQL Editor.');
        console.log('');
        console.log('Steps:');
        console.log('1. Go to Supabase Dashboard');
        console.log('2. Navigate to SQL Editor');
        console.log('3. Paste the SQL from your clipboard (Ctrl+V)');
        console.log('4. Click Run');
        console.log('5. Run this script again to verify');
        return;
      } else {
        console.log('❌ Error:', error.message);
        return;
      }
    }

    console.log('✅ SUCCESS! All columns exist!');
    console.log('📊 Test data:', data);
    console.log('');
    console.log('🎉 The database fix is complete!');
    console.log(
      'You can now create posts with attachments in your GroupDetail page.'
    );
  } catch (error) {
    console.error('❌ Unexpected error:', error);
  }
}

// Run the verification
verifyFix();
