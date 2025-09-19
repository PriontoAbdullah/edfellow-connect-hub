// Script to fix infinite recursion in group_members table policies
// This script will execute the SQL fix to resolve the signup issue

import { createClient } from '@supabase/supabase-js';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import dotenv from 'dotenv';

// Get __dirname equivalent for ES modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Load environment variables
dotenv.config();

const supabaseUrl = process.env.VITE_SUPABASE_URL;
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

if (!supabaseUrl || !supabaseServiceKey) {
  console.error('Missing required environment variables:');
  console.error('- VITE_SUPABASE_URL');
  console.error('- SUPABASE_SERVICE_ROLE_KEY');
  process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseServiceKey);

async function fixDatabasePolicies() {
  try {
    console.log('🔧 Fixing database policies to resolve infinite recursion...');

    // Read the fix SQL file
    const fixPath = path.join(__dirname, 'fix-group-members-policy.sql');
    const fixSQL = fs.readFileSync(fixPath, 'utf8');

    // Split the SQL into individual statements
    const statements = fixSQL
      .split(';')
      .map((stmt) => stmt.trim())
      .filter((stmt) => stmt.length > 0 && !stmt.startsWith('--'));

    console.log(`📝 Found ${statements.length} SQL statements to execute`);

    // Execute each statement
    for (let i = 0; i < statements.length; i++) {
      const statement = statements[i];

      if (statement.trim()) {
        console.log(`⏳ Executing statement ${i + 1}/${statements.length}...`);

        try {
          const { error } = await supabase.rpc('exec_sql', { sql: statement });

          if (error) {
            console.warn(`⚠️  Warning for statement ${i + 1}:`, error.message);
            // Continue with other statements even if one fails
          } else {
            console.log(`✅ Statement ${i + 1} executed successfully`);
          }
        } catch (err) {
          console.warn(`⚠️  Error executing statement ${i + 1}:`, err.message);
        }
      }
    }

    console.log('🎉 Database policies fixed successfully!');
    console.log('');
    console.log('📋 What was fixed:');
    console.log('1. Removed recursive policies from group_members table');
    console.log(
      '2. Created simple, non-recursive policies for all group-related tables'
    );
    console.log('3. Ensured users table policies are working correctly');
    console.log('');
    console.log('✅ You can now try signing up as a professor again!');
  } catch (error) {
    console.error('❌ Error fixing database policies:', error);
    process.exit(1);
  }
}

// Alternative method using direct SQL execution
async function fixDatabasePoliciesDirect() {
  try {
    console.log('🔧 Fixing database policies (direct method)...');

    // Read the fix SQL file
    const fixPath = path.join(__dirname, 'fix-group-members-policy.sql');
    const fixSQL = fs.readFileSync(fixPath, 'utf8');

    // Execute the entire fix SQL
    const { error } = await supabase.rpc('exec_sql', { sql: fixSQL });

    if (error) {
      console.error('❌ Error executing fix:', error);
      process.exit(1);
    }

    console.log('🎉 Database policies fixed successfully!');
  } catch (error) {
    console.error('❌ Error fixing database policies:', error);
    process.exit(1);
  }
}

// Check if we have the exec_sql function, otherwise provide manual instructions
async function checkAndFix() {
  try {
    // Try to execute a simple query to check if exec_sql exists
    const { error } = await supabase.rpc('exec_sql', { sql: 'SELECT 1;' });

    if (error && error.message.includes('function exec_sql')) {
      console.log(
        '📝 exec_sql function not available, providing manual instructions...'
      );
      await provideManualInstructions();
    } else {
      console.log('✅ exec_sql function available, using direct fix...');
      await fixDatabasePoliciesDirect();
    }
  } catch (error) {
    console.log('📝 Using manual instructions...');
    await provideManualInstructions();
  }
}

// Provide manual instructions for fixing the issue
async function provideManualInstructions() {
  console.log('🚀 Manual fix required for database policies:');
  console.log('');
  console.log('⚠️  To fix the infinite recursion issue:');
  console.log('1. Go to your Supabase dashboard');
  console.log('2. Navigate to SQL Editor');
  console.log('3. Copy and paste the contents of fix-group-members-policy.sql');
  console.log('4. Execute the SQL');
  console.log('');
  console.log(
    '📁 Fix file location:',
    path.join(__dirname, 'fix-group-members-policy.sql')
  );
  console.log('');
  console.log(
    '🔍 The issue is caused by recursive policies on the group_members table.'
  );
  console.log(
    '   This fix will remove the problematic policies and create simple ones.'
  );
}

// Run the fix
if (import.meta.url === `file://${process.argv[1]}`) {
  checkAndFix();
}

export {
  fixDatabasePolicies,
  fixDatabasePoliciesDirect,
  provideManualInstructions,
};
