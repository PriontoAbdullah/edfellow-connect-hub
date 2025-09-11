# 🚀 Quick Database Setup Reference

## 📋 SQL Files Execution Order

Execute these files in **exact order** in your Supabase SQL Editor:

### 1️⃣ Core Schema (REQUIRED FIRST)

```
File: supabase-schema.sql
Size: 3.26 KB (99 lines)
Creates: users, connections, basic tables
```

### 2️⃣ Groups & Forums

```
File: supabase-groups-forums-schema.sql
Size: 17.22 KB (395 lines)
Creates: groups, forums, discussions
```

### 3️⃣ Job Portal

```
File: supabase-jobs-schema.sql
Size: 14.58 KB (336 lines)
Creates: jobs, applications, research projects
```

### 4️⃣ University Features

```
File: supabase-university-schema.sql
Size: 16.98 KB (375 lines)
Creates: programs, scholarships, analytics
```

### 5️⃣ Mentorship System

```
File: supabase-mentorship-schema.sql
Size: 17.58 KB (414 lines)
Creates: mentorship profiles, sessions, scheduling
```

### 6️⃣ Real-time Features

```
File: supabase-realtime-schema.sql
Size: 22.03 KB (607 lines)
Creates: messaging, notifications, social feed
```

### 7️⃣ Storage Setup (REQUIRED LAST)

```
File: supabase-storage-setup.sql
Size: 12.73 KB (373 lines)
Creates: file storage buckets and policies
```

## 🎯 Quick Steps

1. **Go to Supabase Dashboard** → SQL Editor
2. **For each file above:**
   - Click "New query"
   - Copy entire file contents
   - Paste into editor
   - Click "Run"
   - Wait 30-60 seconds
   - Verify no errors

## ✅ Final Verification

After all 7 steps, check you have:

- **50+ tables** in your database
- **8 storage buckets** created
- **No error messages** in any step

## 🚨 Critical Notes

- ⚠️ **MUST run in exact order** - each builds on previous
- ⚠️ **Step 1 is required first** - core schema
- ⚠️ **Step 7 is required last** - storage setup
- ⚠️ **Admin access required** - you need project owner permissions

## 🆘 If You Get Errors

1. **Check error message** - Supabase gives detailed info
2. **Verify order** - make sure you ran files in sequence
3. **Check permissions** - ensure you have admin access
4. **Review dependencies** - previous tables must exist

## 🎉 Success!

Once complete, you'll have a fully functional EdFellow Connect Hub database with:

- User management and authentication
- Real-time messaging and notifications
- File upload and storage
- Groups, forums, and discussions
- Job portal and recruiting
- University programs and scholarships
- Mentorship system and scheduling
- Complete security with Row Level Security

**Total Setup Time: ~10-15 minutes**
**Total Database Size: ~104 KB of SQL**
**Total Tables Created: 50+**
