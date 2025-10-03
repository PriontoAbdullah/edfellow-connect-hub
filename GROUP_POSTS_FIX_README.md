# Group Posts Database Fix

## Problem Description

The application was encountering a PostgreSQL error when trying to fetch group posts:

```
PGRST200: Could not find a relationship between 'group_posts' and 'group_post_comments' in the schema cache
```

This error occurred because the `getGroupPosts` API function was trying to use a foreign key relationship `comment_count:group_post_comments(count)` that didn't exist in the database schema.

## Root Cause

1. **Missing Table**: The `group_post_comments` table was not properly created in the database
2. **Missing Foreign Key**: Even if the table existed, the foreign key relationship wasn't established
3. **API Dependency**: The frontend code was trying to fetch comment counts using a non-existent relationship

## Solution Implemented

### 1. Fixed API Call

- **File**: `src/lib/api/groups.ts`
- **Change**: Removed the problematic `comment_count:group_post_comments(count)` from the `getGroupPosts` function
- **Result**: API calls now work without the foreign key relationship error

### 2. Created New API Functions

- **`getGroupPostCommentCount(postId)`**: Fetches comment count for a specific post
- **`getGroupPostsWithCommentCounts(groupId)`**: Fetches posts with their comment counts included
- **Result**: Comment counts are now fetched separately and reliably

### 3. Database Schema Fix

- **File**: `FIX_GROUP_POSTS_COMMENTS.sql`
- **Creates**:
  - `group_post_comments` table with proper foreign key to `group_posts`
  - `group_post_likes` table for post likes
  - Proper indexes for performance
  - Row Level Security (RLS) policies
  - Triggers for `updated_at` timestamps

### 4. Updated Frontend

- **File**: `src/pages/GroupDetail.tsx`
- **Changes**:
  - Updated to use `getGroupPostsWithCommentCounts` instead of `getGroupPosts`
  - Updated comment count display to use actual data instead of random numbers
  - Maintained all existing functionality

## Files Modified

1. **`src/lib/api/groups.ts`**

   - Fixed `getGroupPosts` function
   - Added `getGroupPostCommentCount` function
   - Added `getGroupPostsWithCommentCounts` function

2. **`src/pages/GroupDetail.tsx`**

   - Updated import to include new function
   - Updated `loadPosts` to use new function
   - Updated comment count displays

3. **`FIX_GROUP_POSTS_COMMENTS.sql`** (New)

   - Complete database schema fix
   - Creates all necessary tables and relationships

4. **`apply-group-posts-fix.ps1`** (New)
   - PowerShell script to easily apply the database fix

## How to Apply the Fix

### Option 1: Using PowerShell Script (Recommended)

```powershell
# Run the PowerShell script
.\apply-group-posts-fix.ps1

# Then paste the SQL into Supabase SQL Editor and run it
```

### Option 2: Manual Application

1. Copy the contents of `FIX_GROUP_POSTS_COMMENTS.sql`
2. Go to your Supabase Dashboard
3. Navigate to SQL Editor
4. Paste and run the SQL

## Database Tables Created

### `group_post_comments`

```sql
CREATE TABLE public.group_post_comments (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    post_id UUID NOT NULL REFERENCES public.group_posts(id) ON DELETE CASCADE,
    author_id UUID NOT NULL REFERENCES public.users(id) ON DELETE CASCADE,
    content TEXT NOT NULL,
    parent_comment_id UUID REFERENCES public.group_post_comments(id) ON DELETE CASCADE,
    is_solution BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);
```

### `group_post_likes`

```sql
CREATE TABLE public.group_post_likes (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    post_id UUID NOT NULL REFERENCES public.group_posts(id) ON DELETE CASCADE,
    user_id UUID NOT NULL REFERENCES public.users(id) ON DELETE CASCADE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    UNIQUE(post_id, user_id)
);
```

## Security Features

- **Row Level Security (RLS)** enabled on all tables
- **Policies** ensure users can only:
  - View posts/comments in groups they belong to
  - Create posts/comments in groups they belong to
  - Update/delete their own posts/comments
  - Admins can manage all content in their groups

## Performance Optimizations

- **Indexes** created on frequently queried columns:
  - `group_id`, `author_id`, `created_at` on `group_posts`
  - `post_id`, `author_id`, `created_at` on `group_post_comments`
  - `post_id`, `user_id` on `group_post_likes`

## Testing

After applying the fix:

1. **Verify Database**: Check that tables are created in Supabase
2. **Test Group Posts**: Navigate to a group and verify posts load without errors
3. **Test Comments**: Try creating and viewing comments on posts
4. **Test Likes**: Try liking and unliking posts
5. **Test Permissions**: Verify RLS policies work correctly

## Expected Results

- ✅ Group posts load without database errors
- ✅ Comment counts display correctly
- ✅ Users can create and view comments
- ✅ Users can like/unlike posts
- ✅ Proper security policies are enforced
- ✅ Performance is optimized with indexes

## Troubleshooting

### If you still get errors:

1. **Check Table Existence**: Verify `group_post_comments` and `group_post_likes` tables exist
2. **Check Foreign Keys**: Verify foreign key relationships are properly established
3. **Check RLS Policies**: Ensure RLS policies are created and working
4. **Check Permissions**: Verify authenticated users have proper permissions

### Common Issues:

- **Permission Denied**: Check RLS policies and user group membership
- **Foreign Key Violations**: Ensure referenced records exist
- **Performance Issues**: Verify indexes are created

## Future Improvements

1. **Real-time Updates**: Implement real-time comment and like updates
2. **Comment Threading**: Support for nested comment replies
3. **Post Reactions**: Add more reaction types beyond likes
4. **Post Moderation**: Add admin tools for post moderation
5. **Analytics**: Track post engagement metrics
