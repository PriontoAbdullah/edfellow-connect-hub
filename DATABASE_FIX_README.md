# Database Fix for Group Posts

## Issue

The `group_posts` table is missing some columns that are referenced in the code, causing a 400 Bad Request error:

- `is_pinned` column
- `is_locked` column
- `tags` column
- `attachments` column

## Solution

### Option 1: Run SQL directly in Supabase Dashboard

1. Go to your Supabase project dashboard
2. Navigate to the SQL Editor
3. Copy and paste the contents of `add-missing-columns.sql`
4. Execute the SQL

### Option 2: Use Supabase CLI

```bash
supabase db reset
# or
supabase db push
```

### Option 3: Run the complete schema

Execute the `supabase-groups-forums-schema.sql` file in your Supabase project.

## What the fix does

- Adds the missing `is_pinned` column with default value `FALSE`
- Adds the missing `is_locked` column with default value `FALSE`
- Adds the missing `tags` column as TEXT array
- Adds the missing `attachments` column as JSONB
- Creates appropriate indexes for performance

## Verification

After running the fix, the GroupDetail page should load without the 400 error and display posts correctly.

## Files affected

- `src/lib/api/groups.ts` - Updated to handle missing columns gracefully
- `src/pages/GroupDetail.tsx` - Updated to handle optional `is_pinned` field
- Database schema files - Contains the complete table definition
