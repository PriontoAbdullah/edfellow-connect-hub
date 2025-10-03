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

async function checkUserTables() {
  try {
    console.log('🔍 Checking what user tables exist...');

    // Try different possible user table names
    const possibleTables = ['profiles', 'users', 'auth.users', 'public.users'];

    for (const tableName of possibleTables) {
      try {
        console.log(`\n🧪 Testing table: ${tableName}`);
        const { data, error } = await supabase
          .from(tableName)
          .select('id')
          .limit(1);

        if (error) {
          console.log(`❌ ${tableName}: ${error.message}`);
        } else {
          console.log(`✅ ${tableName}: EXISTS`);
          if (data && data.length > 0) {
            console.log(`📊 Sample data:`, data[0]);
          }
        }
      } catch (err) {
        console.log(`❌ ${tableName}: ${err.message}`);
      }
    }

    // Also check if groups table exists
    console.log(`\n🧪 Testing table: groups`);
    const { data: groupsData, error: groupsError } = await supabase
      .from('groups')
      .select('id')
      .limit(1);

    if (groupsError) {
      console.log(`❌ groups: ${groupsError.message}`);
    } else {
      console.log(`✅ groups: EXISTS`);
      if (groupsData && groupsData.length > 0) {
        console.log(`📊 Sample data:`, groupsData[0]);
      }
    }
  } catch (error) {
    console.error('❌ Unexpected error:', error);
  }
}

// Run the check
checkUserTables();
