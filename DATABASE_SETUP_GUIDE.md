# EdFellow Connect Hub - Database Setup Guide

## 🎯 Overview

This guide will help you set up the complete Phase 1 database schema for the EdFellow Connect Hub. We have created several SQL files that need to be executed in a specific order to build the complete database structure.

## 📋 Prerequisites

1. **Supabase Project**: You should have a Supabase project created
2. **Admin Access**: You need admin access to your Supabase project
3. **SQL Editor Access**: Access to the Supabase SQL Editor

## 🗂️ SQL Files Overview

We have created the following SQL files that need to be executed:

1. **`supabase-schema.sql`** - Core database schema (users, connections, basic tables)
2. **`supabase-groups-forums-schema.sql`** - Groups and forums functionality
3. **`supabase-jobs-schema.sql`** - Job portal and recruiting system
4. **`supabase-university-schema.sql`** - University features and programs
5. **`supabase-mentorship-schema.sql`** - Mentorship system
6. **`supabase-realtime-schema.sql`** - Real-time features (messaging, notifications, posts)
7. **`supabase-storage-setup.sql`** - File storage buckets and policies

## 🚀 Step-by-Step Setup Instructions

### Step 1: Access Supabase SQL Editor

1. Go to your Supabase project dashboard
2. Click on **"SQL Editor"** in the left sidebar
3. Click **"New query"** to create a new SQL query

### Step 2: Execute Core Schema (Required First)

**File: `supabase-schema.sql`**

1. Open the `supabase-schema.sql` file in your project
2. Copy the entire contents of the file
3. Paste into the Supabase SQL Editor
4. Click **"Run"** to execute
5. Wait for completion (should take 30-60 seconds)

**What this creates:**

- Core `users` table with enhanced profile fields
- `connections` and `connection_requests` tables
- Basic user management and authentication tables
- Row Level Security policies
- Essential indexes and triggers

### Step 3: Execute Groups & Forums Schema

**File: `supabase-groups-forums-schema.sql`**

1. Create a new query in SQL Editor
2. Copy the entire contents of `supabase-groups-forums-schema.sql`
3. Paste and execute
4. Wait for completion

**What this creates:**

- `groups` table for study groups
- `group_members` table for group membership
- `group_posts` and `group_post_comments` tables
- `group_invitations` and `group_join_requests` tables
- `forum_categories`, `forum_threads`, `forum_replies` tables
- Forum moderation tables
- RLS policies for groups and forums

### Step 4: Execute Jobs Schema

**File: `supabase-jobs-schema.sql`**

1. Create a new query in SQL Editor
2. Copy the entire contents of `supabase-jobs-schema.sql`
3. Paste and execute
4. Wait for completion

**What this creates:**

- `job_postings` table for job opportunities
- `job_applications` and `job_saved` tables
- `research_projects` and `research_applications` tables
- `project_tasks`, `project_documents`, `project_discussions` tables
- `professor_student_matches` table for AI matching
- RLS policies for job system

### Step 5: Execute University Schema

**File: `supabase-university-schema.sql`**

1. Create a new query in SQL Editor
2. Copy the entire contents of `supabase-university-schema.sql`
3. Paste and execute
4. Wait for completion

**What this creates:**

- `university_programs` table for academic programs
- `program_applications` and `program_promotions` tables
- `program_analytics` table for program metrics
- `scholarships` and `scholarship_applications` tables
- `scholarship_analytics` table for scholarship metrics
- RLS policies for university features

### Step 6: Execute Mentorship Schema

**File: `supabase-mentorship-schema.sql`**

1. Create a new query in SQL Editor
2. Copy the entire contents of `supabase-mentorship-schema.sql`
3. Paste and execute
4. Wait for completion

**What this creates:**

- `mentorship_profiles` table for mentor profiles
- `mentorship_availability` table for scheduling
- `mentorship_sessions` table for session management
- `mentorship_requests` and `mentorship_reviews` tables
- `mentorship_calendar_events` and `mentorship_notifications` tables
- RLS policies for mentorship system

### Step 7: Execute Real-time Schema

**File: `supabase-realtime-schema.sql`**

1. Create a new query in SQL Editor
2. Copy the entire contents of `supabase-realtime-schema.sql`
3. Paste and execute
4. Wait for completion

**What this creates:**

- `messages` and `conversations` tables for chat
- `conversation_participants` table
- `notifications` table for system notifications
- `posts`, `post_likes`, `post_comments` tables for social feed
- `comment_likes` table
- `file_uploads` table for file tracking
- `user_presence` table for online status
- Real-time triggers and functions

### Step 8: Execute Storage Setup

**File: `supabase-storage-setup.sql`**

1. Create a new query in SQL Editor
2. Copy the entire contents of `supabase-storage-setup.sql`
3. Paste and execute
4. Wait for completion

**What this creates:**

- Storage buckets for different file types
- Storage policies for file access control
- Functions for file management
- User folder creation triggers

## ✅ Verification Checklist

After executing all SQL files, verify these tables exist in your Supabase dashboard:

### Core Tables

- [ ] `users` (enhanced with new columns)
- [ ] `connections`
- [ ] `connection_requests`

### Groups & Forums

- [ ] `groups`
- [ ] `group_members`
- [ ] `group_posts`
- [ ] `group_post_comments`
- [ ] `group_invitations`
- [ ] `group_join_requests`
- [ ] `forum_categories`
- [ ] `forum_threads`
- [ ] `forum_replies`
- [ ] `forum_moderation_reports`
- [ ] `forum_moderation_actions`

### Job Portal

- [ ] `job_postings`
- [ ] `job_applications`
- [ ] `job_saved`
- [ ] `research_projects`
- [ ] `research_applications`
- [ ] `research_saved`
- [ ] `project_tasks`
- [ ] `project_documents`
- [ ] `project_discussions`
- [ ] `project_discussion_replies`
- [ ] `professor_student_matches`

### University Features

- [ ] `university_programs`
- [ ] `program_applications`
- [ ] `program_promotions`
- [ ] `program_analytics`
- [ ] `scholarships`
- [ ] `scholarship_applications`
- [ ] `scholarship_analytics`

### Mentorship System

- [ ] `mentorship_profiles`
- [ ] `mentorship_availability`
- [ ] `mentorship_sessions`
- [ ] `mentorship_requests`
- [ ] `mentorship_reviews`
- [ ] `mentorship_calendar_events`
- [ ] `mentorship_notifications`

### Real-time Features

- [ ] `messages`
- [ ] `conversations`
- [ ] `conversation_participants`
- [ ] `notifications`
- [ ] `posts`
- [ ] `post_likes`
- [ ] `post_comments`
- [ ] `comment_likes`
- [ ] `file_uploads`
- [ ] `user_presence`

## 🔧 Storage Buckets Verification

Check that these storage buckets exist:

- [ ] `avatars` (for profile pictures)
- [ ] `portfolio` (for portfolio images and documents)
- [ ] `groups` (for group images)
- [ ] `documents` (for private documents)
- [ ] `posts` (for social media images)
- [ ] `mentorship` (for mentorship documents)
- [ ] `university` (for university materials)
- [ ] `jobs` (for job-related files)

## 🚨 Troubleshooting

### Common Issues

1. **Permission Errors**

   - Make sure you're logged in as the project owner
   - Check that you have admin privileges

2. **Foreign Key Errors**

   - Ensure you're running the SQL files in the correct order
   - The core schema must be run first

3. **Storage Bucket Errors**

   - Storage buckets are created in the storage setup file
   - Make sure to run the storage setup after the main schemas

4. **RLS Policy Errors**
   - RLS policies are included in each schema file
   - If you get policy errors, check that the referenced tables exist

### Error Recovery

If you encounter errors:

1. **Check the Error Message**: Supabase provides detailed error messages
2. **Verify Dependencies**: Make sure all required tables exist
3. **Check Permissions**: Ensure you have the necessary permissions
4. **Review Order**: Confirm you're running files in the correct sequence

## 🎯 Next Steps

After successful database setup:

1. **Update Environment Variables**: Make sure your Supabase URL and keys are correct
2. **Test Database Connection**: Verify the connection works from your app
3. **Run the Application**: Start your development server
4. **Test Core Features**: Try creating users, connections, and basic functionality
5. **Implement API Functions**: Begin building the API layer
6. **Add Real-time Features**: Test messaging and notifications
7. **Upload Files**: Test the file upload system

## 📚 Additional Resources

- **Supabase Documentation**: https://supabase.com/docs
- **SQL Editor Guide**: https://supabase.com/docs/guides/database/sql-editor
- **Row Level Security**: https://supabase.com/docs/guides/auth/row-level-security
- **Storage Setup**: https://supabase.com/docs/guides/storage

## 🆘 Support

If you encounter issues:

1. Check the Supabase dashboard for error logs
2. Review the SQL files for syntax errors
3. Verify all dependencies are met
4. Test individual queries before running full scripts

## 🎉 Success!

Once all tables are created and verified, you'll have a complete Phase 1 database ready for the EdFellow Connect Hub application!

---

**Total Tables Created**: 50+ tables
**Total Storage Buckets**: 8 buckets
**Security Features**: Row Level Security on all tables
**Performance**: Optimized indexes and triggers
**Real-time**: Full real-time capabilities enabled
