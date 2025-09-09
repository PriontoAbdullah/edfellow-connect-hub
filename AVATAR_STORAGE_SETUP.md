# Avatar Storage Setup for EdFellow Connect Hub

This guide explains how to set up Supabase storage for user avatar uploads in the EdFellow Connect Hub application.

## Problem

When users try to upload profile pictures, they get this error:

```
StorageApiError: new row violates row-level security policy
```

This happens because the Supabase storage bucket doesn't have the proper Row Level Security (RLS) policies configured for avatar uploads.

## Solution

### Step 1: Run the SQL Setup Script

1. Open your Supabase Dashboard
2. Go to the SQL Editor
3. Copy and paste the contents of `setup-avatar-storage-policies.sql`
4. Execute the SQL commands

### Step 2: Alternative - Use the JavaScript Setup Script

1. Set your Supabase service role key as an environment variable:

   ```bash
   export SUPABASE_SERVICE_ROLE_KEY="your-service-role-key-here"
   ```

2. Run the setup script:

   ```bash
   node setup-avatar-storage.js
   ```

3. Follow the instructions printed by the script to run the SQL commands

### Step 3: Verify the Setup

After running the SQL commands, you can verify the setup by:

1. **Check if the bucket exists:**

   ```sql
   SELECT * FROM storage.buckets WHERE id = 'edfellow';
   ```

2. **Check the RLS policies:**

   ```sql
   SELECT * FROM pg_policies WHERE tablename = 'objects' AND schemaname = 'storage';
   ```

3. **Test avatar upload in your application**

## File Structure

The avatar storage uses this folder structure:

```
edfellow/
└── avatars/
    └── {user_id}/
        └── avatar-{timestamp}.{extension}
```

Example: `avatars/5094efec-2210-4a2d-88c8-d7ffa997be19/avatar-1757404619873.png`

## RLS Policies Explained

The setup creates four RLS policies:

1. **Upload Policy**: Users can upload avatar files to their own folder
2. **View Policy**: Users can view all avatar files (for displaying profile pictures)
3. **Update Policy**: Users can update their own avatar files
4. **Delete Policy**: Users can delete their own avatar files

## Security Features

- **User Isolation**: Each user can only upload/modify files in their own folder
- **File Type Validation**: Only image files are allowed
- **Size Limits**: 2MB maximum file size
- **Authentication Required**: Only authenticated users can upload avatars

## Troubleshooting

### Common Issues

1. **"Bucket not found" error:**

   - Make sure the `edfellow` bucket exists in your Supabase project
   - Run the bucket creation commands from the setup script

2. **"RLS policy violation" error:**

   - Ensure all RLS policies are created correctly
   - Check that the file path follows the expected structure: `avatars/{user_id}/filename`

3. **"Permission denied" error:**
   - Verify that the user is authenticated
   - Check that the user ID in the file path matches the authenticated user's ID

### Testing the Setup

1. **Test upload:**

   ```javascript
   const { data, error } = await supabase.storage
     .from('edfellow')
     .upload(`avatars/${userId}/test-avatar.png`, file);
   ```

2. **Test download:**
   ```javascript
   const { data } = supabase.storage
     .from('edfellow')
     .getPublicUrl(`avatars/${userId}/test-avatar.png`);
   ```

## File Cleanup

Consider implementing a cleanup mechanism to remove old avatar files when users upload new ones:

```javascript
// Delete old avatar before uploading new one
const { error: deleteError } = await supabase.storage
  .from('edfellow')
  .remove([`avatars/${userId}/old-avatar.png`]);
```

## Monitoring

Monitor your storage usage in the Supabase Dashboard:

- Go to Storage → edfellow bucket
- Check file count and total size
- Set up alerts for storage limits if needed

## Support

If you encounter issues:

1. Check the Supabase logs in the Dashboard
2. Verify your RLS policies are correctly set up
3. Ensure your file paths follow the expected structure
4. Test with a simple file upload first
