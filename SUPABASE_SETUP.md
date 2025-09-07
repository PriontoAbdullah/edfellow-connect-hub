# Supabase Migration Setup Guide

This guide will help you set up the Supabase database for the Edfellow Connect Hub application.

## Prerequisites

1. A Supabase account and project
2. Access to your Supabase project dashboard

## Database Setup

### 1. Create the Database Schema

1. Go to your Supabase project dashboard
2. Navigate to the SQL Editor
3. Copy and paste the contents of `supabase-schema.sql` into the SQL editor
4. Execute the SQL script

This will create:

- The `users` table with all necessary columns
- Row Level Security (RLS) policies
- Triggers for automatic user profile creation
- Indexes for better performance

### 2. Environment Variables

The application uses the following environment variables:

```env
VITE_SUPABASE_URL=https://erieiyxkqbhlgigaiozb.supabase.co
VITE_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImVyaWVpeXhrcWJobGdpZ2Fpb3piIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTcyNTE5NTAsImV4cCI6MjA3MjgyNzk1MH0.3vmHSM8UUXzZp9aAxKxEe7OSV9neIeQNfppRfggAFWo
```

These are already configured in the `.env.local` file.

### 3. Authentication Setup

The application uses Supabase Auth with the following features:

- Email/password authentication
- Automatic user profile creation
- Row Level Security for data protection
- Password reset functionality

### 4. Database Schema Overview

#### Users Table

The `users` table stores comprehensive user profiles with the following key sections:

- **Basic Info**: name, email, role, contact details
- **Academic Info**: university, major, degree level, subjects taught
- **Professional Info**: work experience, education, certifications
- **Research Info**: publications, projects, research interests
- **Social Info**: connections, endorsements, social links
- **Privacy Settings**: profile visibility controls

#### Security Features

- Row Level Security (RLS) enabled
- Users can only access their own data
- Automatic profile creation on signup
- Secure password handling

## Migration Changes

### What Was Changed

1. **Removed Firebase Dependencies**:

   - Uninstalled `firebase` and `firebase-tools` packages
   - Removed Firebase configuration files

2. **Added Supabase Dependencies**:

   - Installed `@supabase/supabase-js`
   - Created Supabase configuration

3. **Updated Authentication**:

   - Migrated from Firebase Auth to Supabase Auth
   - Updated all authentication functions
   - Modified AuthContext to use Supabase

4. **Updated Components**:

   - Login page now uses Supabase authentication
   - SignUp page updated for Supabase
   - Profile management updated
   - Password reset functionality migrated

5. **Database Integration**:
   - Created comprehensive user schema
   - Implemented automatic user profile creation
   - Added proper indexing and security

### Key Differences from Firebase

1. **User ID**: Supabase uses `user.id` instead of `user.uid`
2. **Error Handling**: Supabase returns `{ data, error }` objects
3. **Database**: Uses PostgreSQL instead of Firestore
4. **Auth State**: Different event handling for auth state changes

## Testing the Migration

1. **Start the development server**:

   ```bash
   npm run dev
   ```

2. **Test Authentication Flow**:

   - Try signing up with a new account
   - Test login with existing credentials
   - Test password reset functionality
   - Verify profile completion flow

3. **Check Database**:
   - Go to Supabase dashboard
   - Check the `users` table for new registrations
   - Verify data is being stored correctly

## Troubleshooting

### Common Issues

1. **Environment Variables Not Loading**:

   - Ensure `.env.local` file exists in the project root
   - Restart the development server after adding environment variables

2. **Database Connection Issues**:

   - Verify Supabase URL and API key are correct
   - Check if the database schema has been created
   - Ensure RLS policies are properly configured

3. **Authentication Errors**:
   - Check Supabase Auth settings in the dashboard
   - Verify email confirmation settings
   - Check if the user table trigger is working

### Getting Help

If you encounter issues:

1. Check the browser console for error messages
2. Review the Supabase logs in the dashboard
3. Verify all environment variables are set correctly
4. Ensure the database schema is properly created

## Production Deployment

For production deployment:

1. **Update Environment Variables**:

   - Use production Supabase URL and keys
   - Ensure proper security settings

2. **Database Security**:

   - Review and test RLS policies
   - Set up proper backup procedures
   - Monitor database performance

3. **Authentication Settings**:
   - Configure proper email templates
   - Set up domain allowlists
   - Enable proper security features

## Next Steps

After successful migration:

1. Test all user flows thoroughly
2. Set up monitoring and logging
3. Configure backup procedures
4. Update documentation for your team
5. Plan for any additional features or optimizations
