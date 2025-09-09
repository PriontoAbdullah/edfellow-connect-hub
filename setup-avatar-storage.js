// Setup Avatar Storage for EdFellow Connect Hub
// This script sets up the storage bucket and policies for avatar uploads

import { createClient } from '@supabase/supabase-js';

// Supabase configuration
const supabaseUrl = 'https://erieiyxkqbhlgigaiozb.supabase.co';
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY; // You'll need to set this

if (!supabaseServiceKey) {
  console.error('SUPABASE_SERVICE_ROLE_KEY environment variable is required');
  process.exit(1);
}

// Create Supabase client with service role key for admin operations
const supabase = createClient(supabaseUrl, supabaseServiceKey);

async function setupAvatarStorage() {
  try {
    console.log('Setting up avatar storage...');

    // 1. Check if the edfellow bucket exists
    const { data: buckets, error: bucketsError } =
      await supabase.storage.listBuckets();

    if (bucketsError) {
      throw bucketsError;
    }

    const edfellowBucket = buckets.find((bucket) => bucket.id === 'edfellow');

    if (!edfellowBucket) {
      console.log('Creating edfellow bucket...');
      const { data: newBucket, error: createError } =
        await supabase.storage.createBucket('edfellow', {
          public: false,
          allowedMimeTypes: [
            'image/jpeg',
            'image/png',
            'image/gif',
            'image/webp',
          ],
          fileSizeLimit: 2 * 1024 * 1024, // 2MB
        });

      if (createError) {
        throw createError;
      }
      console.log('✅ Edfellow bucket created successfully');
    } else {
      console.log('✅ Edfellow bucket already exists');
    }

    // 2. Create avatars folder structure
    console.log('Creating avatars folder structure...');

    // Create a test file to ensure the folder structure exists
    const testFile = new Blob(['test'], { type: 'text/plain' });
    const { error: testUploadError } = await supabase.storage
      .from('edfellow')
      .upload('avatars/.gitkeep', testFile);

    if (
      testUploadError &&
      !testUploadError.message.includes('already exists')
    ) {
      console.warn(
        'Warning: Could not create avatars folder:',
        testUploadError.message
      );
    } else {
      console.log('✅ Avatars folder structure created');
    }

    // 3. Set up RLS policies (this needs to be done via SQL)
    console.log('\n📋 Manual Step Required:');
    console.log(
      'Please run the following SQL commands in your Supabase SQL Editor:'
    );
    console.log('\n' + '='.repeat(60));
    console.log(`
-- Enable RLS on storage.objects
ALTER TABLE storage.objects ENABLE ROW SECURITY;

-- Drop existing avatar policies
DROP POLICY IF EXISTS "Users can upload avatar files to edfellow bucket" ON storage.objects;
DROP POLICY IF EXISTS "Users can view avatar files in edfellow bucket" ON storage.objects;
DROP POLICY IF EXISTS "Users can update their own avatar files in edfellow bucket" ON storage.objects;
DROP POLICY IF EXISTS "Users can delete their own avatar files in edfellow bucket" ON storage.objects;

-- Create avatar upload policy
CREATE POLICY "Users can upload avatar files to edfellow bucket" 
ON storage.objects 
FOR INSERT 
TO authenticated 
WITH CHECK (
  bucket_id = 'edfellow' 
  AND (storage.foldername(name))[1] = 'avatars'
  AND auth.uid()::text = (storage.foldername(name))[2]
);

-- Create avatar view policy
CREATE POLICY "Users can view avatar files in edfellow bucket" 
ON storage.objects 
FOR SELECT 
TO authenticated 
USING (
  bucket_id = 'edfellow' 
  AND (storage.foldername(name))[1] = 'avatars'
);

-- Create avatar update policy
CREATE POLICY "Users can update their own avatar files in edfellow bucket" 
ON storage.objects 
FOR UPDATE 
TO authenticated 
USING (
  bucket_id = 'edfellow' 
  AND (storage.foldername(name))[1] = 'avatars'
  AND auth.uid()::text = (storage.foldername(name))[2]
) 
WITH CHECK (
  bucket_id = 'edfellow' 
  AND (storage.foldername(name))[1] = 'avatars'
  AND auth.uid()::text = (storage.foldername(name))[2]
);

-- Create avatar delete policy
CREATE POLICY "Users can delete their own avatar files in edfellow bucket" 
ON storage.objects 
FOR DELETE 
TO authenticated 
USING (
  bucket_id = 'edfellow' 
  AND (storage.foldername(name))[1] = 'avatars'
  AND auth.uid()::text = (storage.foldername(name))[2]
);
    `);
    console.log('='.repeat(60));

    console.log('\n✅ Avatar storage setup completed!');
    console.log('\nNext steps:');
    console.log('1. Run the SQL commands above in your Supabase SQL Editor');
    console.log('2. Test avatar upload in your application');
  } catch (error) {
    console.error('❌ Error setting up avatar storage:', error);
    process.exit(1);
  }
}

// Run the setup
setupAvatarStorage();
