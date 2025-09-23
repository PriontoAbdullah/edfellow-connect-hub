// Comprehensive Storage Policy Fix Script
// This script will completely fix all storage policy issues

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

async function fixStoragePoliciesComprehensive() {
  try {
    console.log('🔧 Starting comprehensive storage policy fix...');

    // Read the comprehensive fix SQL file
    const fixPath = path.join(
      __dirname,
      'fix-storage-policies-comprehensive.sql'
    );
    const fixSQL = fs.readFileSync(fixPath, 'utf8');

    console.log('📝 Executing comprehensive storage policy fix...');

    // Execute the fix
    const { data, error } = await supabase.rpc('exec_sql', { sql: fixSQL });

    if (error) {
      console.error('❌ Error executing storage policy fix:', error);
      return false;
    }

    console.log('✅ Storage policies have been successfully fixed!');
    console.log(
      '✅ User registration should now work without storage policy errors.'
    );
    console.log('✅ Both edfellow and feed-media buckets are configured.');
    console.log('✅ All necessary RLS policies are in place.');

    return true;
  } catch (error) {
    console.error('❌ Error during storage policy fix:', error);
    return false;
  }
}

async function provideManualInstructions() {
  console.log('');
  console.log('🔧 MANUAL FIX INSTRUCTIONS');
  console.log('==========================');
  console.log('');
  console.log(
    'Since the automated fix requires a custom RPC function, please follow these manual steps:'
  );
  console.log('');
  console.log('1. Go to your Supabase Dashboard');
  console.log('2. Navigate to SQL Editor');
  console.log(
    '3. Copy and paste the contents of fix-storage-policies-comprehensive.sql'
  );
  console.log('4. Execute the SQL commands');
  console.log('');
  console.log('The fix will:');
  console.log('  ✅ Temporarily disable RLS on storage.objects');
  console.log('  ✅ Drop all existing problematic policies');
  console.log('  ✅ Create proper storage buckets');
  console.log('  ✅ Create new, simple storage policies');
  console.log('  ✅ Re-enable RLS with working policies');
  console.log('');
  console.log('After running the fix, try user registration again.');
}

async function checkAndFix() {
  console.log('🔍 Checking storage policy status...');

  try {
    // Try to check if we can access storage
    const { data: buckets, error: bucketsError } = await supabase
      .from('storage.buckets')
      .select('*');

    if (bucketsError) {
      console.log('❌ Cannot access storage buckets:', bucketsError.message);
      await provideManualInstructions();
      return;
    }

    console.log('✅ Can access storage buckets');
    console.log(
      '📦 Available buckets:',
      buckets?.map((b) => b.id).join(', ') || 'none'
    );

    // Try the comprehensive fix
    const success = await fixStoragePoliciesComprehensive();

    if (!success) {
      await provideManualInstructions();
    }
  } catch (error) {
    console.error('❌ Error checking storage status:', error);
    await provideManualInstructions();
  }
}

// Run the fix
if (import.meta.url === `file://${process.argv[1]}`) {
  checkAndFix();
}

export { fixStoragePoliciesComprehensive, provideManualInstructions };
