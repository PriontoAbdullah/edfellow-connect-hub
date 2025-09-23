import { createClient } from '@supabase/supabase-js';
import dotenv from 'dotenv';

// Load environment variables
dotenv.config();

const supabaseUrl = process.env.VITE_SUPABASE_URL;
const supabaseKey = process.env.VITE_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseKey) {
  console.error('❌ Missing Supabase environment variables');
  console.log(
    'Please set VITE_SUPABASE_URL and VITE_SUPABASE_ANON_KEY in your .env file'
  );
  process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseKey);

async function testChatDatabase() {
  console.log('🧪 Testing Chat Database Configuration...\n');

  try {
    // Test 1: Check if chat tables exist
    console.log('1️⃣ Checking if chat tables exist...');

    const { data: tables, error: tablesError } = await supabase
      .from('information_schema.tables')
      .select('table_name')
      .eq('table_schema', 'public')
      .in('table_name', [
        'messages',
        'conversations',
        'conversation_participants',
        'user_presence',
      ]);

    if (tablesError) {
      console.error('❌ Error checking tables:', tablesError.message);
      return;
    }

    const tableNames = tables.map((t) => t.table_name);
    const requiredTables = [
      'messages',
      'conversations',
      'conversation_participants',
      'user_presence',
    ];
    const missingTables = requiredTables.filter(
      (table) => !tableNames.includes(table)
    );

    if (missingTables.length > 0) {
      console.error('❌ Missing tables:', missingTables.join(', '));
      console.log('💡 Run the fix-chat-schema.sql file in Supabase SQL Editor');
      return;
    }

    console.log('✅ All chat tables exist:', tableNames.join(', '));

    // Test 2: Check RLS policies
    console.log('\n2️⃣ Checking Row Level Security policies...');

    const { data: policies, error: policiesError } = await supabase.rpc(
      'get_table_policies',
      { table_name: 'messages' }
    );

    if (policiesError) {
      console.log('⚠️  Could not check RLS policies (this is normal)');
    } else {
      console.log('✅ RLS policies are configured');
    }

    // Test 3: Test basic insert/select operations
    console.log('\n3️⃣ Testing basic database operations...');

    // Try to select from messages table (should work even if empty)
    const { data: messages, error: messagesError } = await supabase
      .from('messages')
      .select('id')
      .limit(1);

    if (messagesError) {
      console.error(
        '❌ Error accessing messages table:',
        messagesError.message
      );
      return;
    }

    console.log('✅ Messages table is accessible');

    // Test 4: Check if we can access users table
    console.log('\n4️⃣ Checking users table access...');

    const { data: users, error: usersError } = await supabase
      .from('users')
      .select('id')
      .limit(1);

    if (usersError) {
      console.error('❌ Error accessing users table:', usersError.message);
      console.log(
        '💡 Make sure the core schema (supabase-schema.sql) has been executed'
      );
      return;
    }

    console.log('✅ Users table is accessible');

    // Test 5: Check real-time replication status
    console.log('\n5️⃣ Checking real-time replication...');
    console.log('⚠️  Real-time replication status cannot be checked via API');
    console.log(
      '💡 Please manually enable real-time for these tables in Supabase Dashboard:'
    );
    console.log('   - messages');
    console.log('   - conversations');
    console.log('   - conversation_participants');
    console.log('   - user_presence');

    console.log('\n🎉 Chat database configuration test completed!');
    console.log('\n📋 Next steps:');
    console.log('1. Enable real-time replication in Supabase Dashboard');
    console.log('2. Test the chat functionality in your application');
    console.log('3. Navigate to /chat to start using the chat system');
  } catch (error) {
    console.error('❌ Unexpected error:', error.message);
  }
}

// Run the test
testChatDatabase();
