import { createClient } from '@supabase/supabase-js';
import fs from 'fs';
import dotenv from 'dotenv';

// Load environment variables
dotenv.config();

const supabaseUrl = process.env.VITE_SUPABASE_URL;
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

if (!supabaseUrl || !supabaseServiceKey) {
  console.error('Missing Supabase environment variables');
  console.error('Please set VITE_SUPABASE_URL and SUPABASE_SERVICE_ROLE_KEY');
  process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseServiceKey);

async function fixGroupPostsColumns() {
  try {
    console.log('🔧 Fixing group_posts table columns...');

    // Read the SQL file
    const sqlContent = fs.readFileSync('./fix-group-posts-columns.sql', 'utf8');

    // Execute the SQL
    const { data, error } = await supabase.rpc('exec_sql', {
      sql: sqlContent,
    });

    if (error) {
      console.error('❌ Error executing SQL:', error);

      // Try alternative approach - execute each statement separately
      console.log('🔄 Trying alternative approach...');

      const statements = sqlContent.split(';').filter((stmt) => stmt.trim());

      for (const statement of statements) {
        if (statement.trim()) {
          try {
            const { error: stmtError } = await supabase.rpc('exec_sql', {
              sql: statement.trim(),
            });

            if (stmtError) {
              console.error('❌ Error in statement:', statement.trim());
              console.error('Error:', stmtError);
            } else {
              console.log('✅ Statement executed successfully');
            }
          } catch (err) {
            console.error('❌ Exception in statement:', err);
          }
        }
      }
    } else {
      console.log('✅ SQL executed successfully');
    }

    // Verify the columns exist
    console.log('🔍 Verifying columns...');

    const { data: columns, error: columnsError } = await supabase
      .from('information_schema.columns')
      .select('column_name')
      .eq('table_name', 'group_posts')
      .eq('table_schema', 'public')
      .in('column_name', ['is_pinned', 'is_locked', 'tags', 'attachments']);

    if (columnsError) {
      console.error('❌ Error checking columns:', columnsError);
    } else {
      console.log(
        '📋 Found columns:',
        columns.map((c) => c.column_name)
      );

      const expectedColumns = ['is_pinned', 'is_locked', 'tags', 'attachments'];
      const foundColumns = columns.map((c) => c.column_name);
      const missingColumns = expectedColumns.filter(
        (col) => !foundColumns.includes(col)
      );

      if (missingColumns.length === 0) {
        console.log('✅ All required columns are present!');
      } else {
        console.log('❌ Missing columns:', missingColumns);
      }
    }

    // Test the group_posts query
    console.log('🧪 Testing group_posts query...');

    const { data: testData, error: testError } = await supabase
      .from('group_posts')
      .select(
        `
        *,
        author:author_id(id, display_name, avatar, role, country)
      `
      )
      .limit(1);

    if (testError) {
      console.error('❌ Test query failed:', testError);
    } else {
      console.log('✅ Test query successful!');
      console.log('📊 Sample data:', testData);
    }
  } catch (error) {
    console.error('❌ Unexpected error:', error);
  }
}

// Run the fix
fixGroupPostsColumns();
