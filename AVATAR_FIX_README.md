# Avatar Profile Picture Fix

## Problem

After uploading a profile picture, the image is successfully uploaded to the Supabase storage bucket, but after refreshing the page, the profile picture doesn't show because the avatar URL is not being saved to the user's profile in the database.

## Root Cause

The `avatar` field was missing from:

1. The database schema (`users` table)
2. The TypeScript interfaces (`Database` interface)
3. The data conversion functions (`convertSupabaseUserToUserData` and `convertUserDataToSupabase`)

## Solution Applied

### 1. Database Schema Update

- Added `avatar TEXT` column to the `users` table in `supabase-schema.sql`
- Created migration script `add-avatar-column.sql` to add the column to existing databases

### 2. TypeScript Interface Updates

- Updated `Database` interface in `src/lib/supabase.ts` to include `avatar?: string` in Row, Insert, and Update types
- Updated `UserData` interface in `src/lib/auth.ts` already had the `avatar?: string` field

### 3. Data Conversion Functions

- Updated `convertSupabaseUserToUserData` function to map `supabaseUser.avatar` to the returned object
- Updated `convertUserDataToSupabase` function to map `userData.avatar` to the database format

## Files Modified

1. `supabase-schema.sql` - Added avatar column to users table
2. `src/lib/supabase.ts` - Added avatar field to Database interface
3. `src/lib/auth.ts` - Updated conversion functions to include avatar field
4. `add-avatar-column.sql` - Migration script for existing databases

## How to Apply the Fix

### For New Deployments

1. Use the updated `supabase-schema.sql` file to create the database schema
2. The avatar field will be included from the start

### For Existing Deployments

1. Run the migration script in your Supabase SQL Editor:

   ```sql
   -- Add avatar column to users table
   ALTER TABLE public.users
   ADD COLUMN IF NOT EXISTS avatar TEXT;

   -- Add a comment to document the column
   COMMENT ON COLUMN public.users.avatar IS 'URL to the user profile picture stored in Supabase storage';
   ```

2. Deploy the updated code with the modified TypeScript files

## How It Works Now

1. **Upload Process**: When a user uploads a profile picture:

   - The image is uploaded to Supabase storage (`avatars/{user_id}/avatar-{timestamp}.{extension}`)
   - The public URL is returned from the storage upload
   - The URL is saved to the user's profile in the database via `updateUserData()`

2. **Display Process**: When displaying the profile:
   - The avatar URL is loaded from the database via `getUserData()`
   - The URL is displayed in the Avatar component
   - If no avatar is set, it falls back to the placeholder image

## Testing the Fix

1. Upload a new profile picture
2. Verify it appears immediately
3. Refresh the page
4. Verify the profile picture still appears
5. Check the database to confirm the avatar URL is stored in the `users.avatar` column

## Memory Note

Based on the project memory, whenever we display a user's name and avatar, we should also display the user's country flag alongside the avatar. This is already implemented in the Profile component with the CountryFlag component.
