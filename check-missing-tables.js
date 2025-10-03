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

async function checkMissingTables() {
  try {
    console.log('🔍 Checking what tables exist...');

    // Check for required tables
    const requiredTables = [
      'group_posts',
      'group_post_comments',
      'group_post_likes',
      'group_members',
      'group_activities',
      'group_events',
      'group_resources',
      'group_polls',
      'group_poll_options',
      'group_poll_votes',
    ];

    const existingTables = [];
    const missingTables = [];

    for (const tableName of requiredTables) {
      try {
        console.log(`\n🧪 Testing table: ${tableName}`);
        const { data, error } = await supabase
          .from(tableName)
          .select('id')
          .limit(1);

        if (error) {
          console.log(`❌ ${tableName}: ${error.message}`);
          missingTables.push(tableName);
        } else {
          console.log(`✅ ${tableName}: EXISTS`);
          existingTables.push(tableName);
        }
      } catch (err) {
        console.log(`❌ ${tableName}: ${err.message}`);
        missingTables.push(tableName);
      }
    }

    console.log('\n📊 SUMMARY:');
    console.log('✅ Existing tables:', existingTables);
    console.log('❌ Missing tables:', missingTables);

    if (missingTables.length > 0) {
      console.log('\n🔧 We need to create the missing tables.');
      console.log(
        'The main issue is that group_post_comments table is missing.'
      );
    }
  } catch (error) {
    console.error('❌ Unexpected error:', error);
  }
}

// Run the check
checkMissingTables();
