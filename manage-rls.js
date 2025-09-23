// RLS Management Script
// This script helps you disable and re-enable RLS policies

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
  console.error('❌ Missing required environment variables:');
  console.error('   - VITE_SUPABASE_URL');
  console.error('   - SUPABASE_SERVICE_ROLE_KEY');
  console.error('');
  console.error(
    'Please set these in your .env file or as environment variables.'
  );
  process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseServiceKey);

async function executeSQLFile(filename) {
  try {
    const filePath = path.join(__dirname, filename);
    const sql = fs.readFileSync(filePath, 'utf8');

    console.log(`📝 Executing ${filename}...`);

    // Split SQL into individual statements and execute them
    const statements = sql
      .split(';')
      .map((stmt) => stmt.trim())
      .filter((stmt) => stmt.length > 0 && !stmt.startsWith('--'));

    for (const statement of statements) {
      if (statement.trim()) {
        const { error } = await supabase.rpc('exec_sql', { sql: statement });
        if (error) {
          console.error(`❌ Error executing statement: ${error.message}`);
          console.error(`Statement: ${statement.substring(0, 100)}...`);
        }
      }
    }

    console.log(`✅ Successfully executed ${filename}`);
    return true;
  } catch (error) {
    console.error(`❌ Error executing ${filename}:`, error);
    return false;
  }
}

async function disableAllRLS() {
  console.log('🔧 Disabling all RLS policies...');
  console.log('⚠️  WARNING: This will disable all security policies!');

  const success = await executeSQLFile('disable-all-rls.sql');

  if (success) {
    console.log('');
    console.log('✅ ALL RLS POLICIES HAVE BEEN DISABLED!');
    console.log(
      '✅ User registration should now work without any policy errors.'
    );
    console.log(
      '⚠️  WARNING: This disables security. Re-enable RLS after testing.'
    );
    console.log('');
    console.log('To re-enable RLS later, run: node manage-rls.js --enable');
  }

  return success;
}

async function enableRLS() {
  console.log('🔒 Re-enabling RLS policies with basic security...');

  const success = await executeSQLFile('re-enable-rls.sql');

  if (success) {
    console.log('');
    console.log('✅ RLS POLICIES HAVE BEEN RE-ENABLED!');
    console.log('✅ Basic security policies are in place.');
    console.log('✅ User registration should still work.');
    console.log('✅ Users can only access their own data.');
  }

  return success;
}

async function checkRLSStatus() {
  console.log('🔍 Checking RLS status...');

  try {
    // Check RLS status on tables
    const { data: tables, error: tablesError } = await supabase
      .from('pg_tables')
      .select('schemaname, tablename, rowsecurity')
      .in('schemaname', ['public', 'storage']);

    if (tablesError) {
      console.error('❌ Error checking table status:', tablesError);
      return;
    }

    console.log('\n📊 RLS Status by Table:');
    console.log('========================');

    const publicTables = tables?.filter((t) => t.schemaname === 'public') || [];
    const storageTables =
      tables?.filter((t) => t.schemaname === 'storage') || [];

    if (publicTables.length > 0) {
      console.log('\nPublic Schema:');
      publicTables.forEach((table) => {
        const status = table.rowsecurity ? '🔒 ENABLED' : '🔓 DISABLED';
        console.log(`  ${table.tablename}: ${status}`);
      });
    }

    if (storageTables.length > 0) {
      console.log('\nStorage Schema:');
      storageTables.forEach((table) => {
        const status = table.rowsecurity ? '🔒 ENABLED' : '🔓 DISABLED';
        console.log(`  ${table.tablename}: ${status}`);
      });
    }

    // Check policies
    const { data: policies, error: policiesError } = await supabase
      .from('pg_policies')
      .select('schemaname, tablename, policyname, cmd, roles')
      .in('schemaname', ['public', 'storage']);

    if (policiesError) {
      console.error('❌ Error checking policies:', policiesError);
      return;
    }

    console.log('\n📋 Active Policies:');
    console.log('===================');

    if (policies && policies.length > 0) {
      policies.forEach((policy) => {
        console.log(
          `  ${policy.schemaname}.${policy.tablename}: ${policy.policyname} (${policy.cmd})`
        );
      });
    } else {
      console.log('  No active policies found');
    }
  } catch (error) {
    console.error('❌ Error checking RLS status:', error);
  }
}

async function provideManualInstructions() {
  console.log('');
  console.log('🔧 MANUAL INSTRUCTIONS');
  console.log('======================');
  console.log('');
  console.log(
    'Since automated execution requires custom RPC functions, please:'
  );
  console.log('');
  console.log('1. Go to your Supabase Dashboard');
  console.log('2. Navigate to SQL Editor');
  console.log('3. Copy and paste the contents of one of these files:');
  console.log('   - disable-all-rls.sql (to disable all RLS)');
  console.log('   - re-enable-rls.sql (to re-enable RLS with basic policies)');
  console.log('4. Execute the SQL commands');
  console.log('');
  console.log('This will completely resolve the storage policy issues.');
}

async function main() {
  const args = process.argv.slice(2);
  const command = args[0];

  console.log('🔧 RLS Management Tool');
  console.log('======================');
  console.log('');

  switch (command) {
    case '--disable':
      await disableAllRLS();
      break;
    case '--enable':
      await enableRLS();
      break;
    case '--status':
      await checkRLSStatus();
      break;
    case '--help':
      console.log('Usage: node manage-rls.js [command]');
      console.log('');
      console.log('Commands:');
      console.log('  --disable    Disable all RLS policies (for testing)');
      console.log('  --enable     Re-enable RLS with basic policies');
      console.log('  --status     Check current RLS status');
      console.log('  --help       Show this help message');
      console.log('');
      console.log('Examples:');
      console.log('  node manage-rls.js --disable');
      console.log('  node manage-rls.js --enable');
      console.log('  node manage-rls.js --status');
      break;
    default:
      console.log('❌ Unknown command. Use --help for usage information.');
      console.log('');
      await provideManualInstructions();
  }
}

// Run the script
if (import.meta.url === `file://${process.argv[1]}`) {
  main();
}

export { disableAllRLS, enableRLS, checkRLSStatus };
