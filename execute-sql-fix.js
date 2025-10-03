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

async function executeSQLFix() {
  try {
    console.log('🔧 Attempting to fix database schema...');

    // Try to execute the SQL using RPC function
    const sqlStatements = [
      'ALTER TABLE public.group_posts ADD COLUMN IF NOT EXISTS is_pinned BOOLEAN DEFAULT FALSE',
      'ALTER TABLE public.group_posts ADD COLUMN IF NOT EXISTS is_locked BOOLEAN DEFAULT FALSE',
      'ALTER TABLE public.group_posts ADD COLUMN IF NOT EXISTS tags TEXT[]',
      'ALTER TABLE public.group_posts ADD COLUMN IF NOT EXISTS attachments JSONB',
    ];

    for (const sql of sqlStatements) {
      try {
        console.log(`Executing: ${sql}`);
        const { data, error } = await supabase.rpc('exec_sql', {
          sql_query: sql,
        });

        if (error) {
          console.log(`⚠️  Could not execute via RPC: ${error.message}`);
        } else {
          console.log(`✅ Success: ${sql}`);
        }
      } catch (err) {
        console.log(`⚠️  RPC not available: ${err.message}`);
      }
    }

    console.log('\n🔧 Alternative approach - Manual SQL execution required:');
    console.log(
      'Since RPC is not available, please execute the following SQL manually:'
    );
    console.log('\n' + '='.repeat(60));
    console.log('-- Copy and paste this into your Supabase SQL Editor:');
    console.log('');
    sqlStatements.forEach((sql) => {
      console.log(sql + ';');
    });
    console.log('');
    console.log('-- Create indexes for better performance:');
    console.log(
      'CREATE INDEX IF NOT EXISTS idx_group_posts_is_pinned ON public.group_posts(is_pinned);'
    );
    console.log(
      'CREATE INDEX IF NOT EXISTS idx_group_posts_is_locked ON public.group_posts(is_locked);'
    );
    console.log('');
    console.log('-- Verify the columns were added:');
    console.log(
      "SELECT column_name, data_type FROM information_schema.columns WHERE table_name = 'group_posts' AND table_schema = 'public';"
    );
    console.log('='.repeat(60));

    // Test if the fix worked
    console.log('\n🧪 Testing if columns exist...');
    const { data, error } = await supabase
      .from('group_posts')
      .select('id, attachments')
      .limit(1);

    if (error) {
      if (error.message.includes('attachments')) {
        console.log('❌ The attachments column is still missing.');
        console.log(
          'Please execute the SQL above in your Supabase SQL Editor.'
        );
      } else {
        console.log('❌ Error:', error.message);
      }
    } else {
      console.log('✅ Success! The attachments column exists.');
      console.log('📊 Test data:', data);
    }
  } catch (error) {
    console.error('❌ Unexpected error:', error);
  }
}

// Run the fix
executeSQLFix();
