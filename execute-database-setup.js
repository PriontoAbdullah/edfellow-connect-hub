#!/usr/bin/env node

/**
 * Database Setup Execution Guide
 * EdFellow Connect Hub - Phase 1 Database Schema
 *
 * This script provides step-by-step instructions for setting up the database
 */

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

console.log('🚀 EdFellow Connect Hub - Database Setup Execution Guide');
console.log('========================================================\n');

// Define the SQL files in execution order
const sqlFiles = [
  {
    file: 'supabase-schema.sql',
    name: 'Core Database Schema',
    description: 'Users, connections, and basic tables',
    required: true,
    order: 1,
  },
  {
    file: 'supabase-groups-forums-schema.sql',
    name: 'Groups & Forums Schema',
    description: 'Study groups, forums, and discussions',
    required: true,
    order: 2,
  },
  {
    file: 'supabase-jobs-schema.sql',
    name: 'Job Portal Schema',
    description: 'Job postings, applications, and research projects',
    required: true,
    order: 3,
  },
  {
    file: 'supabase-university-schema.sql',
    name: 'University Features Schema',
    description: 'Programs, scholarships, and university management',
    required: true,
    order: 4,
  },
  {
    file: 'supabase-mentorship-schema.sql',
    name: 'Mentorship System Schema',
    description: 'Mentorship profiles, sessions, and scheduling',
    required: true,
    order: 5,
  },
  {
    file: 'supabase-realtime-schema.sql',
    name: 'Real-time Features Schema',
    description: 'Messaging, notifications, and social feed',
    required: true,
    order: 6,
  },
  {
    file: 'supabase-storage-setup.sql',
    name: 'Storage Setup',
    description: 'File storage buckets and policies',
    required: true,
    order: 7,
  },
];

console.log('📋 SQL Files to Execute (in order):');
console.log('====================================\n');

sqlFiles.forEach((sqlFile, index) => {
  const filePath = path.join(__dirname, sqlFile.file);
  const exists = fs.existsSync(filePath);
  const status = exists ? '✅' : '❌';

  console.log(`${index + 1}. ${status} ${sqlFile.name}`);
  console.log(`   File: ${sqlFile.file}`);
  console.log(`   Description: ${sqlFile.description}`);
  console.log(`   Required: ${sqlFile.required ? 'Yes' : 'No'}`);

  if (exists) {
    const stats = fs.statSync(filePath);
    const fileSizeInKB = (stats.size / 1024).toFixed(2);
    const lineCount = fs.readFileSync(filePath, 'utf8').split('\n').length;
    console.log(`   Size: ${fileSizeInKB} KB (${lineCount} lines)`);
  } else {
    console.log(`   Status: FILE NOT FOUND`);
  }
  console.log('');
});

// Check for missing files
const missingFiles = sqlFiles.filter(
  (sqlFile) => !fs.existsSync(path.join(__dirname, sqlFile.file))
);
if (missingFiles.length > 0) {
  console.log('❌ Missing Files:');
  console.log('==================');
  missingFiles.forEach((file) => {
    console.log(`   • ${file.file}`);
  });
  console.log('\nPlease ensure all SQL files are present before proceeding.\n');
}

console.log('🎯 Step-by-Step Execution Instructions:');
console.log('=======================================\n');

sqlFiles.forEach((sqlFile, index) => {
  console.log(`Step ${index + 1}: Execute ${sqlFile.name}`);
  console.log('----------------------------------------');
  console.log(`1. Open your Supabase project dashboard`);
  console.log(`2. Go to SQL Editor (left sidebar)`);
  console.log(`3. Click "New query"`);
  console.log(`4. Copy the entire contents of: ${sqlFile.file}`);
  console.log(`5. Paste into the SQL editor`);
  console.log(`6. Click "Run" to execute`);
  console.log(`7. Wait for completion (30-60 seconds)`);
  console.log(`8. Verify no errors in the output`);
  console.log(`9. Check that new tables appear in the "Tables" section\n`);
});

console.log('🔍 Verification Steps:');
console.log('======================');
console.log('After each step, verify:');
console.log('• No error messages in the SQL output');
console.log('• New tables appear in the Supabase dashboard');
console.log('• Tables have the expected columns');
console.log('• Row Level Security is enabled on new tables\n');

console.log('📊 Expected Results:');
console.log('====================');
console.log('After completing all steps, you should have:');
console.log('• 50+ database tables');
console.log('• 8 storage buckets');
console.log('• Row Level Security policies on all tables');
console.log('• Optimized indexes for performance');
console.log('• Real-time capabilities enabled');
console.log('• File upload system configured\n');

console.log('🚨 Important Notes:');
console.log('===================');
console.log('• Execute files in the exact order shown above');
console.log('• Do not skip any steps - each builds on the previous');
console.log('• The core schema (step 1) must be run first');
console.log('• Storage setup (step 7) must be run last');
console.log('• If you encounter errors, check the error message');
console.log('• Make sure you have admin access to your Supabase project\n');

console.log('🆘 Troubleshooting:');
console.log('===================');
console.log('Common issues and solutions:');
console.log('• Permission errors: Check you have admin access');
console.log(
  '• Foreign key errors: Ensure previous steps completed successfully'
);
console.log('• Storage errors: Make sure storage is enabled in your project');
console.log('• RLS errors: Verify referenced tables exist\n');

console.log('✅ Success Indicators:');
console.log('======================');
console.log("You'll know the setup is successful when:");
console.log('• All 7 SQL files execute without errors');
console.log('• All expected tables appear in the dashboard');
console.log('• Storage buckets are created and accessible');
console.log('• You can create test users and connections');
console.log('• Real-time features work (messaging, notifications)\n');

console.log('🎉 Ready to Start!');
console.log('==================');
console.log('Follow the steps above to set up your complete Phase 1 database.');
console.log(
  "Once complete, you'll have a fully functional EdFellow Connect Hub database!\n"
);

// Display file sizes and line counts
console.log('📈 File Statistics:');
console.log('===================');
let totalSize = 0;
let totalLines = 0;

sqlFiles.forEach((sqlFile) => {
  const filePath = path.join(__dirname, sqlFile.file);
  if (fs.existsSync(filePath)) {
    const stats = fs.statSync(filePath);
    const fileSizeInKB = (stats.size / 1024).toFixed(2);
    const lineCount = fs.readFileSync(filePath, 'utf8').split('\n').length;
    totalSize += parseFloat(fileSizeInKB);
    totalLines += lineCount;
  }
});

console.log(`Total SQL files: ${sqlFiles.length}`);
console.log(`Total size: ${totalSize.toFixed(2)} KB`);
console.log(`Total lines: ${totalLines}`);
console.log(
  `Average file size: ${(totalSize / sqlFiles.length).toFixed(2)} KB`
);
console.log(
  `Average lines per file: ${Math.round(totalLines / sqlFiles.length)}\n`
);

console.log('🚀 Happy coding! Your EdFellow Connect Hub database awaits!');
