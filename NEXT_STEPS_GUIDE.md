# 🚀 Next Steps After Database Setup

## ✅ **Database Setup Complete!**

All SQL schemas have been successfully uploaded to Supabase. Now let's configure your application to connect to the database.

## **Step 1: Configure Environment Variables** ⚙️

### 1.1 Create Environment File

Create a `.env` file in your project root with the following content:

```env
# Supabase Configuration
# Get these values from your Supabase project dashboard
VITE_SUPABASE_URL=your_supabase_project_url
VITE_SUPABASE_ANON_KEY=your_supabase_anon_key

# Optional: For development
NODE_ENV=development
```

### 1.2 Get Your Supabase Credentials

1. Go to your [Supabase Dashboard](https://supabase.com/dashboard)
2. Select your project
3. Go to **Settings** → **API**
4. Copy the following values:
   - **Project URL** → `VITE_SUPABASE_URL`
   - **anon public** key → `VITE_SUPABASE_ANON_KEY`

### 1.3 Update Your .env File

Replace the placeholder values with your actual Supabase credentials.

## **Step 2: Set Up Storage Buckets** 📁

### 2.1 Create Storage Buckets

Run the storage setup SQL in your Supabase SQL Editor:

```sql
-- Copy and paste the contents of supabase-storage-setup.sql
```

### 2.2 Configure Storage Policies

The storage setup includes:

- `avatars` bucket for profile pictures
- `documents` bucket for file uploads
- `media` bucket for images and videos
- Proper RLS policies for security

## **Step 3: Test Database Connection** 🔌

### 3.1 Start Development Server

```bash
npm run dev
# or
yarn dev
```

### 3.2 Test Authentication

1. Go to your application
2. Try to sign up with a new account
3. Check if the user is created in Supabase Auth and users table

### 3.3 Test Database Operations

1. Complete your profile
2. Check if data is saved to the database
3. Test other features like connections, posts, etc.

## **Step 4: Configure Real-time Features** ⚡

### 4.1 Enable Real-time

1. Go to Supabase Dashboard
2. Navigate to **Database** → **Replication**
3. Enable real-time for the following tables:
   - `messages`
   - `notifications`
   - `posts`
   - `connections`

### 4.2 Test Real-time Features

1. Open two browser windows
2. Send a message in one window
3. Check if it appears in real-time in the other window

## **Step 5: Set Up Authentication Providers** 🔐

### 5.1 Configure Email Authentication

1. Go to **Authentication** → **Settings**
2. Configure email templates
3. Set up email confirmation settings

### 5.2 Optional: Add Social Providers

1. Go to **Authentication** → **Providers**
2. Enable Google, GitHub, or other providers
3. Configure OAuth settings

## **Step 6: Deploy to Production** 🌐

### 6.1 Choose Deployment Platform

Recommended options:

- **Vercel** (easiest for React apps)
- **Netlify**
- **Railway**
- **DigitalOcean App Platform**

### 6.2 Set Environment Variables

Add your environment variables to your deployment platform:

- `VITE_SUPABASE_URL`
- `VITE_SUPABASE_ANON_KEY`

### 6.3 Deploy

Follow your chosen platform's deployment instructions.

## **Step 7: Post-Deployment Setup** 🎯

### 7.1 Update Supabase Settings

1. Add your production domain to **Authentication** → **URL Configuration**
2. Update **Site URL** and **Redirect URLs**

### 7.2 Test Production Features

1. Test user registration
2. Test all major features
3. Check real-time functionality
4. Verify file uploads work

## **Troubleshooting** 🔧

### Common Issues:

1. **"Missing Supabase environment variables"**

   - Check your `.env` file exists
   - Verify variable names are correct
   - Restart your development server

2. **Database connection errors**

   - Verify your Supabase URL and key
   - Check if your project is active
   - Ensure RLS policies are properly configured

3. **Real-time not working**

   - Enable real-time for required tables
   - Check browser console for errors
   - Verify WebSocket connections

4. **File upload issues**
   - Check storage bucket policies
   - Verify file size limits
   - Check CORS settings

## **Success Checklist** ✅

- [ ] Environment variables configured
- [ ] Database connection working
- [ ] User registration/login working
- [ ] Profile creation working
- [ ] Real-time features working
- [ ] File uploads working
- [ ] Application deployed
- [ ] Production settings configured

## **Need Help?** 🆘

If you encounter any issues:

1. Check the browser console for errors
2. Check Supabase logs in the dashboard
3. Verify all environment variables are set
4. Test each feature individually

---

**🎉 Congratulations! Your edfellow-connect-hub is ready to connect the academic world!**
