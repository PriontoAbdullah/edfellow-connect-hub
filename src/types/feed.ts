// Feed System TypeScript Types and Interfaces
// This file contains all the type definitions for the feed post system

export type PostType = 'text' | 'media' | 'article' | 'event' | 'poll';
export type PostVisibility = 'public' | 'connections' | 'private';
export type ReportStatus = 'pending' | 'reviewed' | 'resolved' | 'dismissed';

// =============================================
// CORE POST INTERFACES
// =============================================

export interface Post {
  id: string;
  author_id: string;
  content: string;
  post_type: PostType;
  media_urls: string[];
  article_data?: ArticleData;
  event_data?: EventData;
  poll_data?: PollData;
  tags: string[];
  visibility: PostVisibility;
  is_pinned: boolean;
  is_highlighted: boolean;
  like_count: number;
  comment_count: number;
  share_count: number;
  view_count: number;
  created_at: string;
  updated_at: string;
  deleted_at?: string;
}

export interface PostWithAuthor extends Post {
  author: {
    id: string;
    name: string;
    avatar: string | null;
    role: 'student' | 'professor' | 'university';
    university?: string;
    country?: string;
  };
  is_liked: boolean;
  is_saved: boolean;
}

// =============================================
// COMMENT INTERFACES
// =============================================

export interface Comment {
  id: string;
  post_id: string;
  author_id: string;
  parent_comment_id?: string;
  content: string;
  media_urls: string[];
  like_count: number;
  reply_count: number;
  created_at: string;
  updated_at: string;
  deleted_at?: string;
}

export interface CommentWithAuthor extends Comment {
  author: {
    id: string;
    name: string;
    avatar: string | null;
    role: 'student' | 'professor' | 'university';
    country?: string;
  };
  is_liked: boolean;
  replies?: CommentWithAuthor[];
}

// =============================================
// INTERACTION INTERFACES
// =============================================

export interface PostLike {
  id: string;
  post_id: string;
  user_id: string;
  created_at: string;
}

export interface CommentLike {
  id: string;
  comment_id: string;
  user_id: string;
  created_at: string;
}

export interface PostShare {
  id: string;
  post_id: string;
  user_id: string;
  shared_content?: string;
  created_at: string;
}

export interface PostView {
  id: string;
  post_id: string;
  user_id?: string;
  ip_address?: string;
  user_agent?: string;
  created_at: string;
}

export interface SavedPost {
  id: string;
  post_id: string;
  user_id: string;
  created_at: string;
}

// =============================================
// MEDIA INTERFACES
// =============================================

export interface MediaFile {
  id: string;
  filename: string;
  original_filename: string;
  file_path: string;
  file_size: number;
  mime_type: string;
  uploaded_by: string;
  post_id?: string;
  comment_id?: string;
  created_at: string;
}

export interface UploadedFile {
  file: File;
  preview?: string;
  progress?: number;
  error?: string;
}

// =============================================
// SPECIALIZED POST DATA INTERFACES
// =============================================

export interface ArticleData {
  title: string;
  content: string;
  excerpt?: string;
  featured_image?: string;
  reading_time?: number;
  tags?: string[];
}

export interface EventData {
  title: string;
  description: string;
  start_date: string;
  end_date?: string;
  location?: string;
  is_virtual: boolean;
  meeting_url?: string;
  max_attendees?: number;
  registration_required: boolean;
  registration_url?: string;
}

export interface PollData {
  question: string;
  options: PollOption[];
  allow_multiple: boolean;
  expires_at?: string;
  is_anonymous: boolean;
}

export interface PollOption {
  id: string;
  text: string;
  vote_count: number;
  percentage?: number;
}

export interface PollVote {
  id: string;
  poll_id: string;
  user_id: string;
  option_id: string;
  created_at: string;
}

// =============================================
// REPORTING INTERFACES
// =============================================

export interface PostReport {
  id: string;
  post_id: string;
  reporter_id: string;
  reason: string;
  description?: string;
  status: ReportStatus;
  created_at: string;
  reviewed_at?: string;
  reviewed_by?: string;
}

// =============================================
// API REQUEST/RESPONSE INTERFACES
// =============================================

export interface CreatePostRequest {
  content: string;
  post_type: PostType;
  media_urls?: string[];
  article_data?: ArticleData;
  event_data?: EventData;
  poll_data?: PollData;
  tags?: string[];
  visibility?: PostVisibility;
}

export interface UpdatePostRequest {
  content?: string;
  media_urls?: string[];
  article_data?: ArticleData;
  event_data?: EventData;
  poll_data?: PollData;
  tags?: string[];
  visibility?: PostVisibility;
  is_pinned?: boolean;
  is_highlighted?: boolean;
}

export interface CreateCommentRequest {
  content: string;
  media_urls?: string[];
  parent_comment_id?: string;
}

export interface UpdateCommentRequest {
  content?: string;
  media_urls?: string[];
}

export interface SharePostRequest {
  shared_content?: string;
}

export interface ReportPostRequest {
  reason: string;
  description?: string;
}

// =============================================
// FEED QUERY INTERFACES
// =============================================

export interface FeedQuery {
  limit?: number;
  offset?: number;
  post_type?: PostType;
  author_id?: string;
  tags?: string[];
  visibility?: PostVisibility;
  sort_by?: 'created_at' | 'like_count' | 'comment_count' | 'view_count';
  sort_order?: 'asc' | 'desc';
  date_from?: string;
  date_to?: string;
}

export interface CommentQuery {
  limit?: number;
  offset?: number;
  parent_comment_id?: string;
  sort_by?: 'created_at' | 'like_count';
  sort_order?: 'asc' | 'desc';
}

// =============================================
// FEED STATE INTERFACES
// =============================================

export interface FeedState {
  posts: PostWithAuthor[];
  loading: boolean;
  error: string | null;
  hasMore: boolean;
  totalCount: number;
}

export interface PostState {
  post: PostWithAuthor | null;
  comments: CommentWithAuthor[];
  loading: boolean;
  error: string | null;
  commentsLoading: boolean;
  commentsError: string | null;
  commentsHasMore: boolean;
}

export interface FeedFilters {
  post_type?: PostType;
  tags?: string[];
  date_range?: {
    from: string;
    to: string;
  };
  author_role?: 'student' | 'professor' | 'university';
}

// =============================================
// NOTIFICATION INTERFACES
// =============================================

export interface FeedNotification {
  id: string;
  type: 'like' | 'comment' | 'share' | 'mention' | 'follow';
  actor_id: string;
  actor_name: string;
  actor_avatar: string;
  post_id?: string;
  comment_id?: string;
  content?: string;
  is_read: boolean;
  created_at: string;
}

// =============================================
// ANALYTICS INTERFACES
// =============================================

export interface PostAnalytics {
  post_id: string;
  views: number;
  likes: number;
  comments: number;
  shares: number;
  engagement_rate: number;
  reach: number;
  impressions: number;
  demographics: {
    age_groups: Record<string, number>;
    countries: Record<string, number>;
    roles: Record<string, number>;
  };
  time_series: {
    date: string;
    views: number;
    likes: number;
    comments: number;
    shares: number;
  }[];
}

// =============================================
// ERROR INTERFACES
// =============================================

export interface FeedError {
  code: string;
  message: string;
  details?: any;
}

export interface ValidationError {
  field: string;
  message: string;
}

// =============================================
// UTILITY TYPES
// =============================================

export type PostFormData = {
  content: string;
  post_type: PostType;
  files: UploadedFile[];
  tags: string[];
  visibility: PostVisibility;
  article_data?: Partial<ArticleData>;
  event_data?: Partial<EventData>;
  poll_data?: Partial<PollData>;
};

export type CommentFormData = {
  content: string;
  files: UploadedFile[];
  parent_comment_id?: string;
};

export type FeedAction =
  | { type: 'SET_LOADING'; payload: boolean }
  | { type: 'SET_ERROR'; payload: string | null }
  | { type: 'SET_POSTS'; payload: PostWithAuthor[] }
  | { type: 'ADD_POST'; payload: PostWithAuthor }
  | { type: 'UPDATE_POST'; payload: PostWithAuthor }
  | { type: 'DELETE_POST'; payload: string }
  | { type: 'LIKE_POST'; payload: { post_id: string; liked: boolean } }
  | { type: 'SAVE_POST'; payload: { post_id: string; saved: boolean } }
  | {
      type: 'UPDATE_COMMENT_COUNT';
      payload: { post_id: string; new_count: number };
    }
  | { type: 'SET_HAS_MORE'; payload: boolean }
  | { type: 'SET_TOTAL_COUNT'; payload: number };

export type PostAction =
  | { type: 'SET_POST_LOADING'; payload: boolean }
  | { type: 'SET_POST_ERROR'; payload: string | null }
  | { type: 'SET_POST'; payload: PostWithAuthor }
  | { type: 'UPDATE_POST'; payload: Partial<PostWithAuthor> }
  | { type: 'SET_COMMENTS_LOADING'; payload: boolean }
  | { type: 'SET_COMMENTS_ERROR'; payload: string | null }
  | { type: 'SET_COMMENTS'; payload: CommentWithAuthor[] }
  | { type: 'ADD_COMMENT'; payload: CommentWithAuthor }
  | { type: 'UPDATE_COMMENT'; payload: CommentWithAuthor }
  | { type: 'DELETE_COMMENT'; payload: string }
  | { type: 'LIKE_COMMENT'; payload: { comment_id: string; liked: boolean } }
  | { type: 'SET_COMMENTS_HAS_MORE'; payload: boolean };

// =============================================
// CONSTANTS
// =============================================

export const POST_TYPES: Record<PostType, string> = {
  text: 'Text Post',
  media: 'Media Post',
  article: 'Article',
  event: 'Event',
  poll: 'Poll',
};

export const POST_VISIBILITY: Record<PostVisibility, string> = {
  public: 'Public',
  connections: 'Connections Only',
  private: 'Private',
};

export const REPORT_REASONS = [
  'Spam',
  'Harassment',
  'Inappropriate Content',
  'False Information',
  'Copyright Violation',
  'Other',
] as const;

export const MAX_POST_LENGTH = 2000;
export const MAX_COMMENT_LENGTH = 500;
export const MAX_MEDIA_FILES = 10;
export const MAX_FILE_SIZE = 10 * 1024 * 1024; // 10MB
export const ALLOWED_FILE_TYPES = [
  'image/jpeg',
  'image/png',
  'image/gif',
  'image/webp',
  'video/mp4',
  'video/webm',
  'application/pdf',
  'text/plain',
];

export const FEED_PAGE_SIZE = 20;
export const COMMENTS_PAGE_SIZE = 10;
