# Avatar Storage Setup via Supabase Dashboard

If you're getting SQL syntax errors, you can set up avatar storage using the Supabase Dashboard interface instead.

## Method 1: Using Supabase Dashboard (Recommended)

### Step 1: Create the Storage Bucket

1. Go to your Supabase Dashboard
2. Navigate to **Storage** in the left sidebar
3. Click **"New bucket"**
4. Fill in the details:
   - **Name**: `edfellow`
   - **Public bucket**: ❌ (unchecked)
   - **File size limit**: `2 MB`
   - **Allowed MIME types**: `image/jpeg, image/png, image/gif, image/webp`
5. Click **"Create bucket"**

### Step 2: Set up Row Level Security Policies

1. In the Storage section, click on the **"edfellow"** bucket
2. Go to the **"Policies"** tab
3. Click **"New Policy"**

#### Create Upload Policy:

- **Policy name**: `Users can upload avatar files to edfellow bucket`
- **Operation**: `INSERT`
- **Target roles**: `authenticated`
- **Policy definition**:

```sql
bucket_id = 'edfellow'
AND (storage.foldername(name))[1] = 'avatars'
AND auth.uid()::text = (storage.foldername(name))[2]
```

#### Create View Policy:

- **Policy name**: `Users can view avatar files in edfellow bucket`
- **Operation**: `SELECT`
- **Target roles**: `authenticated`
- **Policy definition**:

```sql
bucket_id = 'edfellow'
AND (storage.foldername(name))[1] = 'avatars'
```

#### Create Update Policy:

- **Policy name**: `Users can update their own avatar files in edfellow bucket`
- **Operation**: `UPDATE`
- **Target roles**: `authenticated`
- **Policy definition**:

```sql
bucket_id = 'edfellow'
AND (storage.foldername(name))[1] = 'avatars'
AND auth.uid()::text = (storage.foldername(name))[2]
```

#### Create Delete Policy:

- **Policy name**: `Users can delete their own avatar files in edfellow bucket`
- **Operation**: `DELETE`
- **Target roles**: `authenticated`
- **Policy definition**:

```sql
bucket_id = 'edfellow'
AND (storage.foldername(name))[1] = 'avatars'
AND auth.uid()::text = (storage.foldername(name))[2]
```

## Method 2: Alternative Simple SQL (Try this if Method 1 doesn't work)

If you still want to use SQL, try this simplified version:

```sql
-- Create bucket if it doesn't exist
INSERT INTO storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
VALUES (
  'edfellow',
  'edfellow',
  false,
  2097152,
  ARRAY['image/jpeg', 'image/png', 'image/gif', 'image/webp']
)
ON CONFLICT (id) DO NOTHING;

-- Create upload policy
CREATE POLICY "avatar_upload_policy"
ON storage.objects
FOR INSERT
TO authenticated
WITH CHECK (
  bucket_id = 'edfellow'
  AND (storage.foldername(name))[1] = 'avatars'
  AND auth.uid()::text = (storage.foldername(name))[2]
);

-- Create view policy
CREATE POLICY "avatar_view_policy"
ON storage.objects
FOR SELECT
TO authenticated
USING (
  bucket_id = 'edfellow'
  AND (storage.foldername(name))[1] = 'avatars'
);
```

## Method 3: Using the JavaScript Setup Script

1. Set your environment variable:

```bash
export SUPABASE_SERVICE_ROLE_KEY="your-service-role-key"
```

2. Run the setup script:

```bash
node setup-avatar-storage.js
```

3. Follow the printed instructions to run the SQL commands

## Testing the Setup

After setting up the policies, test the avatar upload in your application. The file structure should be:

```
avatars/{user_id}/avatar-{timestamp}.{extension}
```

## Troubleshooting

### If you still get RLS errors:

1. **Check if the bucket exists**:

   - Go to Storage → edfellow bucket
   - Make sure it's there and configured correctly

2. **Verify the policies**:

   - Go to Storage → edfellow bucket → Policies tab
   - Make sure all 4 policies are created

3. **Check the file path**:

   - Make sure your upload path follows: `avatars/{user_id}/filename`
   - The user_id should match the authenticated user's ID

4. **Test with a simple upload**:
   ```javascript
   const { data, error } = await supabase.storage
     .from('edfellow')
     .upload(`avatars/${userId}/test.png`, file);
   ```

### Common Issues:

- **"Bucket not found"**: The bucket doesn't exist or has a different name
- **"RLS policy violation"**: The file path doesn't match the expected structure
- **"Permission denied"**: The user is not authenticated or the user ID doesn't match

## File Structure Example

Your avatar files will be stored as:

```
edfellow/
└── avatars/
    └── 5094efec-2210-4a2d-88c8-d7ffa997be19/
        └── avatar-1757404619873.png
```

This structure ensures that:

- Each user has their own folder
- Users can only upload to their own folder
- All users can view all avatars (needed for profile pictures)
- Users can only modify their own avatars
