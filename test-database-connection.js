import { createClient } from '@supabase/supabase-js';
import dotenv from 'dotenv';

// Load environment variables
dotenv.config();

const supabaseUrl = process.env.VITE_SUPABASE_URL;
const supabaseKey = process.env.VITE_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseKey) {
  console.error('❌ Missing Supabase environment variables');
  console.log('Please ensure your .env file contains:');
  console.log('VITE_SUPABASE_URL=your_supabase_url');
  console.log('VITE_SUPABASE_ANON_KEY=your_anon_key');
  process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseKey);

async function testConnection() {
  try {
    console.log('🔗 Testing Supabase connection...');

    // Test basic connection
    const { data, error } = await supabase
      .from('group_posts')
      .select('id')
      .limit(1);

    if (error) {
      console.error('❌ Connection failed:', error.message);

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
      }
      return;
    }

    console.log('✅ Connection successful!');
    console.log('📊 Sample data:', data);

    // Check if columns exist
    console.log('\n🔍 Checking table structure...');
    const { data: columns, error: columnsError } = await supabase
      .from('information_schema.columns')
      .select('column_name, data_type')
      .eq('table_name', 'group_posts')
      .eq('table_schema', 'public');

    if (columnsError) {
      console.error('❌ Error checking columns:', columnsError);
      return;
    }

    console.log('📋 Current columns in group_posts:');
    columns.forEach((col) => {
      console.log(`  - ${col.column_name} (${col.data_type})`);
    });

    const expectedColumns = ['is_pinned', 'is_locked', 'tags', 'attachments'];
    const foundColumns = columns.map((c) => c.column_name);
    const missingColumns = expectedColumns.filter(
      (col) => !foundColumns.includes(col)
    );

    if (missingColumns.length > 0) {
      console.log('\n⚠️  Missing columns:', missingColumns.join(', '));
      console.log('Please run the SQL in QUICK_DATABASE_FIX.sql to add them.');
    } else {
      console.log('\n✅ All required columns are present!');
    }
  } catch (error) {
    console.error('❌ Unexpected error:', error);
  }
}

// Run the test
testConnection();
