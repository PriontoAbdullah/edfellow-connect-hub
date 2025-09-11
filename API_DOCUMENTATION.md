# EdFellow Connect Hub - API Documentation

## Overview

The EdFellow Connect Hub API is built on Supabase and provides comprehensive functionality for educational networking, mentorship, job opportunities, and academic collaboration.

## Base URL

```
https://your-project.supabase.co
```

## Authentication

All API endpoints require authentication using Supabase Auth. Include the JWT token in the Authorization header:

```
Authorization: Bearer <your-jwt-token>
```

## API Endpoints

### User Management

#### Get User Profile

```typescript
GET /rest/v1/users?id=eq.{user_id}
```

#### Update User Profile

```typescript
PATCH /rest/v1/users?id=eq.{user_id}
Content-Type: application/json

{
  "display_name": "John Doe",
  "bio": "Software Engineering Student",
  "university": "MIT",
  "field": "Computer Science"
}
```

#### Get User Connections

```typescript
GET /rest/v1/connections?or=(user_id.eq.{user_id},connection_id.eq.{user_id})&status=eq.accepted
```

#### Send Connection Request

```typescript
POST /rest/v1/connections
Content-Type: application/json

{
  "requester_id": "user-uuid",
  "receiver_id": "user-uuid",
  "message": "Hi, I'd like to connect with you!"
}
```

### Groups & Forums

#### Get Groups

```typescript
GET /rest/v1/groups?select=*,creator:creator_id(*),members:group_members(count)
```

#### Create Group

```typescript
POST /rest/v1/groups
Content-Type: application/json

{
  "name": "Study Group Name",
  "description": "Group description",
  "category": "Study Group",
  "university": "MIT",
  "is_public": true,
  "creator_id": "user-uuid"
}
```

#### Join Group

```typescript
POST /rest/v1/group_members
Content-Type: application/json

{
  "group_id": "group-uuid",
  "user_id": "user-uuid",
  "role": "member"
}
```

#### Get Group Posts

```typescript
GET /rest/v1/group_posts?group_id=eq.{group_id}&select=*,author:author_id(*),comments:group_post_comments(count)
```

### Job Portal

#### Get Job Postings

```typescript
GET /rest/v1/job_postings?select=*,poster:poster_id(*),applications:job_applications(count)
```

#### Create Job Posting

```typescript
POST /rest/v1/job_postings
Content-Type: application/json

{
  "title": "Software Engineer Intern",
  "description": "Job description",
  "job_type": "Internship",
  "location": "San Francisco, CA",
  "company": "Tech Company",
  "field": "Computer Science",
  "requirements": ["Python", "JavaScript", "React"],
  "benefits": ["Health Insurance", "401k"],
  "salary_min": 50000,
  "salary_max": 70000,
  "poster_id": "user-uuid"
}
```

#### Apply for Job

```typescript
POST /rest/v1/job_applications
Content-Type: application/json

{
  "job_id": "job-uuid",
  "applicant_id": "user-uuid",
  "cover_letter": "Cover letter text",
  "resume_url": "https://storage.url/resume.pdf",
  "status": "submitted"
}
```

### Mentorship System

#### Get Mentorship Profiles

```typescript
GET /rest/v1/mentorship_profiles?is_available=eq.true&select=*,user:user_id(*)
```

#### Create Mentorship Profile

```typescript
POST /rest/v1/mentorship_profiles
Content-Type: application/json

{
  "user_id": "user-uuid",
  "title": "Senior Software Engineer",
  "description": "Mentorship description",
  "expertise_areas": ["JavaScript", "React", "Node.js"],
  "hourly_rate": 75,
  "currency": "USD",
  "session_duration_minutes": 60,
  "max_sessions_per_week": 10
}
```

#### Create Mentorship Session

```typescript
POST /rest/v1/mentorship_sessions
Content-Type: application/json

{
  "mentorship_profile_id": "profile-uuid",
  "mentee_id": "user-uuid",
  "session_type": "one-on-one",
  "title": "React Development Session",
  "description": "Session description",
  "scheduled_date": "2024-01-15",
  "start_time": "2024-01-15T14:00:00Z",
  "end_time": "2024-01-15T15:00:00Z",
  "duration_minutes": 60,
  "meeting_link": "https://zoom.us/j/123456789"
}
```

### University Features

#### Get University Programs

```typescript
GET /rest/v1/university_programs?select=*,university_profile:university_id(*)
```

#### Create University Program

```typescript
POST /rest/v1/university_programs
Content-Type: application/json

{
  "university_id": "user-uuid",
  "title": "Master of Computer Science",
  "description": "Program description",
  "program_type": "graduate",
  "field": "Computer Science",
  "duration_months": 24,
  "tuition_fee": 50000,
  "currency": "USD",
  "application_deadline": "2024-03-15",
  "requirements": ["Bachelor's degree", "GRE scores"],
  "is_active": true
}
```

#### Get Scholarships

```typescript
GET /rest/v1/scholarships?select=*,provider:provider_id(*)
```

#### Create Scholarship

```typescript
POST /rest/v1/scholarships
Content-Type: application/json

{
  "provider_id": "user-uuid",
  "title": "Merit Scholarship",
  "description": "Scholarship description",
  "scholarship_type": "merit",
  "amount": 10000,
  "currency": "USD",
  "field": "Computer Science",
  "application_deadline": "2024-04-01",
  "requirements": ["GPA 3.5+", "Financial need"],
  "is_active": true
}
```

### Real-time Features

#### Get Messages

```typescript
GET /rest/v1/messages?conversation_id=eq.{conversation_id}&select=*,sender:sender_id(*),receiver:receiver_id(*)
```

#### Send Message

```typescript
POST /rest/v1/messages
Content-Type: application/json

{
  "conversation_id": "conversation-uuid",
  "sender_id": "user-uuid",
  "receiver_id": "user-uuid",
  "content": "Message content",
  "message_type": "text"
}
```

#### Get Notifications

```typescript
GET /rest/v1/notifications?user_id=eq.{user_id}&is_read=eq.false&order=created_at.desc
```

#### Mark Notification as Read

```typescript
PATCH /rest/v1/notifications?id=eq.{notification_id}
Content-Type: application/json

{
  "is_read": true,
  "read_at": "2024-01-15T10:00:00Z"
}
```

### Posts & Social Feed

#### Get Posts

```typescript
GET /rest/v1/posts?select=*,author:author_id(*),likes:post_likes(count),comments:post_comments(count)
```

#### Create Post

```typescript
POST /rest/v1/posts
Content-Type: application/json

{
  "author_id": "user-uuid",
  "content": "Post content",
  "post_type": "text",
  "media_urls": ["https://storage.url/image.jpg"],
  "is_public": true,
  "tags": ["technology", "programming"]
}
```

#### Like Post

```typescript
POST /rest/v1/post_likes
Content-Type: application/json

{
  "post_id": "post-uuid",
  "user_id": "user-uuid"
}
```

### Search

#### Global Search

```typescript
GET /rest/v1/rpc/global_search
Content-Type: application/json

{
  "query": "search term",
  "filters": {
    "role": "student",
    "university": "MIT",
    "field": "Computer Science"
  },
  "limit": 20,
  "offset": 0
}
```

#### User Search

```typescript
GET /rest/v1/users?display_name=ilike.%{query}%&select=*
```

#### Post Search

```typescript
GET /rest/v1/posts?content=ilike.%{query}%&select=*,author:author_id(*)
```

### File Upload

#### Upload File

```typescript
POST /storage/v1/object/{bucket_name}/{file_path}
Content-Type: {file_mime_type}
Authorization: Bearer <your-jwt-token>

[file_content]
```

#### Get File URL

```typescript
GET / storage / v1 / object / public / { bucket_name } / { file_path };
```

#### Delete File

```typescript
DELETE /storage/v1/object/{bucket_name}/{file_path}
Authorization: Bearer <your-jwt-token>
```

## Real-time Subscriptions

### Subscribe to Messages

```typescript
const channel = supabase
  .channel('messages')
  .on(
    'postgres_changes',
    {
      event: 'INSERT',
      schema: 'public',
      table: 'messages',
      filter: `receiver_id=eq.${userId}`,
    },
    (payload) => {
      console.log('New message:', payload.new);
    }
  )
  .subscribe();
```

### Subscribe to Notifications

```typescript
const channel = supabase
  .channel('notifications')
  .on(
    'postgres_changes',
    {
      event: 'INSERT',
      schema: 'public',
      table: 'notifications',
      filter: `user_id=eq.${userId}`,
    },
    (payload) => {
      console.log('New notification:', payload.new);
    }
  )
  .subscribe();
```

### Subscribe to Posts

```typescript
const channel = supabase
  .channel('posts')
  .on(
    'postgres_changes',
    {
      event: 'INSERT',
      schema: 'public',
      table: 'posts',
    },
    (payload) => {
      console.log('New post:', payload.new);
    }
  )
  .subscribe();
```

## Error Handling

### Standard Error Response

```json
{
  "error": {
    "message": "Error description",
    "code": "ERROR_CODE",
    "details": "Additional error details"
  }
}
```

### Common Error Codes

- `AUTH_REQUIRED` - Authentication required
- `INSUFFICIENT_PERMISSIONS` - User lacks required permissions
- `VALIDATION_ERROR` - Input validation failed
- `NOT_FOUND` - Resource not found
- `DUPLICATE_ENTRY` - Resource already exists
- `RATE_LIMIT_EXCEEDED` - Too many requests

## Rate Limiting

- **General API**: 1000 requests per hour per user
- **File Upload**: 100 requests per hour per user
- **Real-time**: 10 concurrent connections per user
- **Search**: 100 requests per hour per user

## Pagination

Most list endpoints support pagination using `limit` and `offset` parameters:

```typescript
GET /rest/v1/posts?limit=20&offset=0
```

Response includes total count:

```json
{
  "data": [...],
  "count": 150
}
```

## Filtering

Use Supabase's filtering syntax:

```typescript
// Equality
GET /rest/v1/users?role=eq.student

// Like (case-insensitive)
GET /rest/v1/users?display_name=ilike.%john%

// Greater than or equal
GET /rest/v1/posts?created_at=gte.2024-01-01

// In array
GET /rest/v1/users?role=in.(student,professor)

// Not equal
GET /rest/v1/posts?is_public=neq.false
```

## Sorting

Use the `order` parameter:

```typescript
// Ascending
GET /rest/v1/posts?order=created_at.asc

// Descending
GET /rest/v1/posts?order=created_at.desc

// Multiple columns
GET /rest/v1/posts?order=created_at.desc,likes_count.desc
```

## Data Types

### User

```typescript
interface User {
  id: string;
  email: string;
  display_name: string;
  avatar?: string;
  role: 'student' | 'professor' | 'university' | 'admin';
  bio?: string;
  university?: string;
  field?: string;
  location?: string;
  is_verified: boolean;
  is_active: boolean;
  created_at: string;
  updated_at: string;
}
```

### Connection

```typescript
interface Connection {
  id: string;
  requester_id: string;
  receiver_id: string;
  status: 'pending' | 'accepted' | 'declined';
  message?: string;
  created_at: string;
  updated_at: string;
}
```

### Post

```typescript
interface Post {
  id: string;
  author_id: string;
  content: string;
  post_type: 'text' | 'image' | 'link' | 'poll' | 'event';
  media_urls?: string[];
  is_public: boolean;
  tags?: string[];
  mentions?: string[];
  created_at: string;
  updated_at: string;
}
```

### MentorshipSession

```typescript
interface MentorshipSession {
  id: string;
  mentorship_profile_id: string;
  mentee_id: string;
  session_type: 'one-on-one' | 'group' | 'workshop' | 'consultation';
  title: string;
  description?: string;
  scheduled_date: string;
  start_time: string;
  end_time: string;
  duration_minutes: number;
  status:
    | 'scheduled'
    | 'confirmed'
    | 'in-progress'
    | 'completed'
    | 'cancelled'
    | 'no-show';
  meeting_link?: string;
  meeting_platform?: 'zoom' | 'teams' | 'google-meet' | 'in-person' | 'other';
  created_at: string;
  updated_at: string;
}
```

## SDK Usage

### JavaScript/TypeScript

```typescript
import { createClient } from '@supabase/supabase-js';

const supabase = createClient(
  'https://your-project.supabase.co',
  'your-anon-key'
);

// Get user profile
const { data, error } = await supabase
  .from('users')
  .select('*')
  .eq('id', userId)
  .single();

// Create connection request
const { data, error } = await supabase.from('connections').insert({
  requester_id: currentUserId,
  receiver_id: targetUserId,
  message: "Hi, I'd like to connect!",
});

// Subscribe to real-time updates
const channel = supabase
  .channel('messages')
  .on(
    'postgres_changes',
    {
      event: 'INSERT',
      schema: 'public',
      table: 'messages',
    },
    (payload) => {
      console.log('New message:', payload.new);
    }
  )
  .subscribe();
```

### React Hooks

```typescript
import { useQuery, useMutation } from '@tanstack/react-query';
import { useSearch } from '@/hooks/useSearch';
import { useRealtime } from '@/hooks/useRealtime';

// Use search hook
const { globalSearch, searching, results } = useSearch();

// Use real-time hook
const { messages, notifications, sendMessage } = useRealtime();

// Use React Query
const { data: users, isLoading } = useQuery({
  queryKey: ['users'],
  queryFn: () => supabase.from('users').select('*'),
});
```

## Security

### Row Level Security (RLS)

All tables have RLS policies enabled to ensure users can only access data they're authorized to see.

### Authentication

- JWT tokens are required for all authenticated endpoints
- Tokens expire after 1 hour and must be refreshed
- Refresh tokens are valid for 30 days

### Data Validation

- All input data is validated on both client and server
- File uploads are validated for type and size
- SQL injection protection through parameterized queries

## Monitoring

### Analytics

- API usage tracking
- Error rate monitoring
- Performance metrics
- User activity analytics

### Logging

- All API requests are logged
- Error logs include stack traces
- Audit logs for sensitive operations
- Real-time monitoring dashboard

## Support

For API support and questions:

- Email: api-support@edfellow.com
- Documentation: https://docs.edfellow.com
- Status Page: https://status.edfellow.com
