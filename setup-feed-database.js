// Setup script for feed database schema
// This script sets up the feed system database tables and policies

const { createClient } = require('@supabase/supabase-js');
const fs = require('fs');
const path = require('path');

// Load environment variables
require('dotenv').config();

const supabaseUrl = process.env.VITE_SUPABASE_URL;
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY; // You'll need to add this to your .env

if (!supabaseUrl || !supabaseServiceKey) {
  console.error('Missing required environment variables:');
  console.error('- VITE_SUPABASE_URL');
  console.error('- SUPABASE_SERVICE_ROLE_KEY');
  process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseServiceKey);

async function setupFeedDatabase() {
  try {
    console.log('🚀 Setting up feed database schema...');

    // Read the schema file
    const schemaPath = path.join(__dirname, 'feed-schema.sql');
    const schema = fs.readFileSync(schemaPath, 'utf8');

    // Split the schema into individual statements
    const statements = schema
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

    console.log('🎉 Feed database setup completed!');
    console.log('');
    console.log('📋 Next steps:');
    console.log(
      '1. Create a storage bucket named "feed-media" in your Supabase dashboard'
    );
    console.log('2. Set up storage policies for the bucket');
    console.log('3. Test the feed functionality in your application');
    console.log('');
    console.log('💡 Storage bucket policies to add:');
    console.log(`
-- Allow authenticated users to upload files
CREATE POLICY "Users can upload files" ON storage.objects
  FOR INSERT WITH CHECK (
    bucket_id = 'feed-media' AND
    auth.uid()::text = (storage.foldername(name))[1]
  );

-- Allow users to view files they uploaded or files in public posts
CREATE POLICY "Users can view files" ON storage.objects
  FOR SELECT USING (
    bucket_id = 'feed-media' AND (
      auth.uid()::text = (storage.foldername(name))[1] OR
      EXISTS (
        SELECT 1 FROM public.posts p
        WHERE p.media_urls @> ARRAY[storage.objects.name]
        AND p.visibility = 'public'
      )
    )
  );

-- Allow users to delete their own files
CREATE POLICY "Users can delete their own files" ON storage.objects
  FOR DELETE USING (
    bucket_id = 'feed-media' AND
    auth.uid()::text = (storage.foldername(name))[1]
  );
    `);
  } catch (error) {
    console.error('❌ Error setting up feed database:', error);
    process.exit(1);
  }
}

// Alternative method using direct SQL execution
async function setupFeedDatabaseDirect() {
  try {
    console.log('🚀 Setting up feed database schema (direct method)...');

    // Read the schema file
    const schemaPath = path.join(__dirname, 'feed-schema.sql');
    const schema = fs.readFileSync(schemaPath, 'utf8');

    // Execute the entire schema
    const { error } = await supabase.rpc('exec_sql', { sql: schema });

    if (error) {
      console.error('❌ Error executing schema:', error);
      process.exit(1);
    }

    console.log('🎉 Feed database setup completed!');
  } catch (error) {
    console.error('❌ Error setting up feed database:', error);
    process.exit(1);
  }
}

// Check if we have the exec_sql function, otherwise use manual setup
async function checkAndSetup() {
  try {
    // Try to execute a simple query to check if exec_sql exists
    const { error } = await supabase.rpc('exec_sql', { sql: 'SELECT 1;' });

    if (error && error.message.includes('function exec_sql')) {
      console.log('📝 exec_sql function not available, using manual setup...');
      await setupFeedDatabaseManual();
    } else {
      console.log('✅ exec_sql function available, using direct setup...');
      await setupFeedDatabaseDirect();
    }
  } catch (error) {
    console.log('📝 Using manual setup method...');
    await setupFeedDatabaseManual();
  }
}

// Manual setup by executing individual statements
async function setupFeedDatabaseManual() {
  console.log('🚀 Setting up feed database schema (manual method)...');
  console.log('');
  console.log('⚠️  Manual setup required:');
  console.log('1. Copy the contents of feed-schema.sql');
  console.log('2. Go to your Supabase dashboard');
  console.log('3. Navigate to SQL Editor');
  console.log('4. Paste and execute the schema');
  console.log('');
  console.log(
    '📁 Schema file location:',
    path.join(__dirname, 'feed-schema.sql')
  );
}

// Run the setup
if (require.main === module) {
  checkAndSetup();
}

module.exports = {
  setupFeedDatabase,
  setupFeedDatabaseDirect,
  setupFeedDatabaseManual,
};
