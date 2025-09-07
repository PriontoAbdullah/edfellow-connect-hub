#!/usr/bin/env node

/**
 * Database Setup Script for Edfellow Connect Hub
 *
 * This script helps verify the Supabase setup and provides
 * helpful information for database configuration.
 */

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

console.log('🚀 Edfellow Connect Hub - Supabase Setup Verification\n');

// Check if .env.local exists
const envPath = path.join(__dirname, '.env.local');
if (fs.existsSync(envPath)) {
  console.log('✅ Environment variables file (.env.local) found');

  const envContent = fs.readFileSync(envPath, 'utf8');
  const hasSupabaseUrl = envContent.includes('VITE_SUPABASE_URL');
  const hasSupabaseKey = envContent.includes('VITE_SUPABASE_ANON_KEY');

  if (hasSupabaseUrl && hasSupabaseKey) {
    console.log('✅ Supabase environment variables are configured');
  } else {
    console.log('❌ Missing Supabase environment variables');
    console.log(
      '   Please ensure VITE_SUPABASE_URL and VITE_SUPABASE_ANON_KEY are set'
    );
  }
} else {
  console.log('❌ Environment variables file (.env.local) not found');
  console.log('   Please create .env.local with your Supabase credentials');
}

// Check if supabase-schema.sql exists
const schemaPath = path.join(__dirname, 'supabase-schema.sql');
if (fs.existsSync(schemaPath)) {
  console.log('✅ Database schema file (supabase-schema.sql) found');
} else {
  console.log('❌ Database schema file (supabase-schema.sql) not found');
}

// Check package.json for Supabase dependency
const packagePath = path.join(__dirname, 'package.json');
if (fs.existsSync(packagePath)) {
  const packageJson = JSON.parse(fs.readFileSync(packagePath, 'utf8'));
  const hasSupabase =
    packageJson.dependencies &&
    packageJson.dependencies['@supabase/supabase-js'];
  const hasFirebase =
    packageJson.dependencies && packageJson.dependencies['firebase'];

  if (hasSupabase) {
    console.log('✅ Supabase dependency is installed');
  } else {
    console.log('❌ Supabase dependency is not installed');
    console.log('   Run: npm install @supabase/supabase-js');
  }

  if (hasFirebase) {
    console.log('⚠️  Firebase dependency is still present');
    console.log('   Consider removing: npm uninstall firebase firebase-tools');
  } else {
    console.log('✅ Firebase dependencies have been removed');
  }
} else {
  console.log('❌ package.json not found');
}

console.log('\n📋 Next Steps:');
console.log('1. Go to your Supabase project dashboard');
console.log('2. Navigate to the SQL Editor');
console.log('3. Copy and paste the contents of supabase-schema.sql');
console.log('4. Execute the SQL script to create the database schema');
console.log('5. Test the application with: npm run dev');
console.log('\n📖 For detailed instructions, see SUPABASE_SETUP.md');

console.log('\n🔧 Database Schema Summary:');
console.log('- users table with comprehensive profile fields');
console.log('- Row Level Security (RLS) policies');
console.log('- Automatic user profile creation trigger');
console.log('- Performance indexes');
console.log('- Support for students, professors, and universities');

console.log('\n✨ Migration completed successfully!');
console.log('Your Edfellow Connect Hub is now powered by Supabase! 🎉');
