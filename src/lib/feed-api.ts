// Feed API Functions for Supabase
// This file contains all the API functions for feed operations

import { supabase } from './supabase';
import type {
  Post,
  PostWithAuthor,
  Comment,
  CommentWithAuthor,
  CreatePostRequest,
  UpdatePostRequest,
  CreateCommentRequest,
  UpdateCommentRequest,
  SharePostRequest,
  ReportPostRequest,
  FeedQuery,
  CommentQuery,
  PostAnalytics,
  MediaFile,
  UploadedFile,
  FeedError,
} from '@/types/feed';
import { FEED_PAGE_SIZE, COMMENTS_PAGE_SIZE } from '@/types/feed';

// =============================================
// POST OPERATIONS
// =============================================

/**
 * Create a new post
 */
export const createPost = async (
  postData: CreatePostRequest
): Promise<{ data: Post | null; error: FeedError | null }> => {
  try {
    const {
      data: { user },
    } = await supabase.auth.getUser();
    if (!user) {
      return {
        data: null,
        error: { code: 'UNAUTHORIZED', message: 'User not authenticated' },
      };
    }

    const { data, error } = await supabase
      .from('posts')
      .insert({
        author_id: user.id,
        content: postData.content,
        post_type: postData.post_type,
        media_urls: postData.media_urls || [],
        article_data: postData.article_data,
        event_data: postData.event_data,
        poll_data: postData.poll_data,
        tags: postData.tags || [],
        visibility: postData.visibility || 'public',
      })
      .select()
      .single();

    if (error) {
      return {
        data: null,
        error: {
          code: 'CREATE_POST_ERROR',
          message: error.message,
          details: error,
        },
      };
    }

    return { data, error: null };
  } catch (error) {
    return {
      data: null,
      error: {
        code: 'UNEXPECTED_ERROR',
        message: 'An unexpected error occurred',
        details: error,
      },
    };
  }
};

/**
 * Get feed posts with pagination
 */
export const getFeedPosts = async (
  query: FeedQuery = {},
  userId?: string
): Promise<{ data: PostWithAuthor[] | null; error: FeedError | null }> => {
  try {
    const {
      data: { user },
    } = await supabase.auth.getUser();
    const currentUserId = userId || user?.id;

    if (!currentUserId) {
      return {
        data: null,
        error: { code: 'UNAUTHORIZED', message: 'User not authenticated' },
      };
    }

    const limit = query.limit || FEED_PAGE_SIZE;
    const offset = query.offset || 0;

    // Use the database function for better performance
    const { data, error } = await supabase.rpc('get_feed_posts', {
      user_id_param: currentUserId,
      limit_param: limit,
      offset_param: offset,
    });

    if (error) {
      return {
        data: null,
        error: {
          code: 'FETCH_POSTS_ERROR',
          message: error.message,
          details: error,
        },
      };
    }

    return { data, error: null };
  } catch (error) {
    return {
      data: null,
      error: {
        code: 'UNEXPECTED_ERROR',
        message: 'An unexpected error occurred',
        details: error,
      },
    };
  }
};

/**
 * Get a single post by ID
 */
export const getPost = async (
  postId: string
): Promise<{ data: PostWithAuthor | null; error: FeedError | null }> => {
  try {
    const {
      data: { user },
    } = await supabase.auth.getUser();
    if (!user) {
      return {
        data: null,
        error: { code: 'UNAUTHORIZED', message: 'User not authenticated' },
      };
    }

    const { data, error } = await supabase.rpc('get_feed_posts', {
      user_id_param: user.id,
      limit_param: 1,
      offset_param: 0,
    });

    if (error) {
      return {
        data: null,
        error: {
          code: 'FETCH_POST_ERROR',
          message: error.message,
          details: error,
        },
      };
    }

    const post = data?.find((p: PostWithAuthor) => p.id === postId);
    return { data: post || null, error: null };
  } catch (error) {
    return {
      data: null,
      error: {
        code: 'UNEXPECTED_ERROR',
        message: 'An unexpected error occurred',
        details: error,
      },
    };
  }
};

/**
 * Update a post
 */
export const updatePost = async (
  postId: string,
  updates: UpdatePostRequest
): Promise<{ data: Post | null; error: FeedError | null }> => {
  try {
    const {
      data: { user },
    } = await supabase.auth.getUser();
    if (!user) {
      return {
        data: null,
        error: { code: 'UNAUTHORIZED', message: 'User not authenticated' },
      };
    }

    const { data, error } = await supabase
      .from('posts')
      .update({
        ...updates,
        updated_at: new Date().toISOString(),
      })
      .eq('id', postId)
      .eq('author_id', user.id) // Ensure user can only update their own posts
      .select()
      .single();

    if (error) {
      return {
        data: null,
        error: {
          code: 'UPDATE_POST_ERROR',
          message: error.message,
          details: error,
        },
      };
    }

    return { data, error: null };
  } catch (error) {
    return {
      data: null,
      error: {
        code: 'UNEXPECTED_ERROR',
        message: 'An unexpected error occurred',
        details: error,
      },
    };
  }
};

/**
 * Delete a post (soft delete)
 */
export const deletePost = async (
  postId: string
): Promise<{ error: FeedError | null }> => {
  try {
    const {
      data: { user },
    } = await supabase.auth.getUser();
    if (!user) {
      return {
        error: { code: 'UNAUTHORIZED', message: 'User not authenticated' },
      };
    }

    const { error } = await supabase
      .from('posts')
      .update({ deleted_at: new Date().toISOString() })
      .eq('id', postId)
      .eq('author_id', user.id); // Ensure user can only delete their own posts

    if (error) {
      return {
        error: {
          code: 'DELETE_POST_ERROR',
          message: error.message,
          details: error,
        },
      };
    }

    return { error: null };
  } catch (error) {
    return {
      error: {
        code: 'UNEXPECTED_ERROR',
        message: 'An unexpected error occurred',
        details: error,
      },
    };
  }
};

// =============================================
// COMMENT OPERATIONS
// =============================================

/**
 * Create a new comment
 */
export const createComment = async (
  postId: string,
  commentData: CreateCommentRequest
): Promise<{ data: Comment | null; error: FeedError | null }> => {
  try {
    const {
      data: { user },
    } = await supabase.auth.getUser();
    if (!user) {
      return {
        data: null,
        error: { code: 'UNAUTHORIZED', message: 'User not authenticated' },
      };
    }

    const { data, error } = await supabase
      .from('comments')
      .insert({
        post_id: postId,
        author_id: user.id,
        content: commentData.content,
        media_urls: commentData.media_urls || [],
        parent_comment_id: commentData.parent_comment_id,
      })
      .select()
      .single();

    if (error) {
      return {
        data: null,
        error: {
          code: 'CREATE_COMMENT_ERROR',
          message: error.message,
          details: error,
        },
      };
    }

    return { data, error: null };
  } catch (error) {
    return {
      data: null,
      error: {
        code: 'UNEXPECTED_ERROR',
        message: 'An unexpected error occurred',
        details: error,
      },
    };
  }
};

/**
 * Get comments for a post
 */
export const getPostComments = async (
  postId: string,
  query: CommentQuery = {}
): Promise<{ data: CommentWithAuthor[] | null; error: FeedError | null }> => {
  try {
    const {
      data: { user },
    } = await supabase.auth.getUser();
    if (!user) {
      return {
        data: null,
        error: { code: 'UNAUTHORIZED', message: 'User not authenticated' },
      };
    }

    const limit = query.limit || COMMENTS_PAGE_SIZE;
    const offset = query.offset || 0;

    const { data, error } = await supabase.rpc('get_post_comments', {
      post_id_param: postId,
      user_id_param: user.id,
      limit_param: limit,
      offset_param: offset,
    });

    if (error) {
      return {
        data: null,
        error: {
          code: 'FETCH_COMMENTS_ERROR',
          message: error.message,
          details: error,
        },
      };
    }

    return { data, error: null };
  } catch (error) {
    return {
      data: null,
      error: {
        code: 'UNEXPECTED_ERROR',
        message: 'An unexpected error occurred',
        details: error,
      },
    };
  }
};

/**
 * Update a comment
 */
export const updateComment = async (
  commentId: string,
  updates: UpdateCommentRequest
): Promise<{ data: Comment | null; error: FeedError | null }> => {
  try {
    const {
      data: { user },
    } = await supabase.auth.getUser();
    if (!user) {
      return {
        data: null,
        error: { code: 'UNAUTHORIZED', message: 'User not authenticated' },
      };
    }

    const { data, error } = await supabase
      .from('comments')
      .update({
        ...updates,
        updated_at: new Date().toISOString(),
      })
      .eq('id', commentId)
      .eq('author_id', user.id) // Ensure user can only update their own comments
      .select()
      .single();

    if (error) {
      return {
        data: null,
        error: {
          code: 'UPDATE_COMMENT_ERROR',
          message: error.message,
          details: error,
        },
      };
    }

    return { data, error: null };
  } catch (error) {
    return {
      data: null,
      error: {
        code: 'UNEXPECTED_ERROR',
        message: 'An unexpected error occurred',
        details: error,
      },
    };
  }
};

/**
 * Delete a comment (soft delete)
 */
export const deleteComment = async (
  commentId: string
): Promise<{ error: FeedError | null }> => {
  try {
    const {
      data: { user },
    } = await supabase.auth.getUser();
    if (!user) {
      return {
        error: { code: 'UNAUTHORIZED', message: 'User not authenticated' },
      };
    }

    const { error } = await supabase
      .from('comments')
      .update({ deleted_at: new Date().toISOString() })
      .eq('id', commentId)
      .eq('author_id', user.id); // Ensure user can only delete their own comments

    if (error) {
      return {
        error: {
          code: 'DELETE_COMMENT_ERROR',
          message: error.message,
          details: error,
        },
      };
    }

    return { error: null };
  } catch (error) {
    return {
      error: {
        code: 'UNEXPECTED_ERROR',
        message: 'An unexpected error occurred',
        details: error,
      },
    };
  }
};

// =============================================
// LIKE OPERATIONS
// =============================================

/**
 * Like or unlike a post
 */
export const togglePostLike = async (
  postId: string
): Promise<{ liked: boolean; error: FeedError | null }> => {
  try {
    const {
      data: { user },
    } = await supabase.auth.getUser();
    if (!user) {
      return {
        liked: false,
        error: { code: 'UNAUTHORIZED', message: 'User not authenticated' },
      };
    }

    // Check if already liked
    const { data: existingLike } = await supabase
      .from('post_likes')
      .select('id')
      .eq('post_id', postId)
      .eq('user_id', user.id)
      .single();

    if (existingLike) {
      // Unlike
      const { error } = await supabase
        .from('post_likes')
        .delete()
        .eq('post_id', postId)
        .eq('user_id', user.id);

      if (error) {
        return {
          liked: true,
          error: {
            code: 'UNLIKE_POST_ERROR',
            message: error.message,
            details: error,
          },
        };
      }

      return { liked: false, error: null };
    } else {
      // Like
      const { error } = await supabase.from('post_likes').insert({
        post_id: postId,
        user_id: user.id,
      });

      if (error) {
        return {
          liked: false,
          error: {
            code: 'LIKE_POST_ERROR',
            message: error.message,
            details: error,
          },
        };
      }

      return { liked: true, error: null };
    }
  } catch (error) {
    return {
      liked: false,
      error: {
        code: 'UNEXPECTED_ERROR',
        message: 'An unexpected error occurred',
        details: error,
      },
    };
  }
};

/**
 * Like or unlike a comment
 */
export const toggleCommentLike = async (
  commentId: string
): Promise<{ liked: boolean; error: FeedError | null }> => {
  try {
    const {
      data: { user },
    } = await supabase.auth.getUser();
    if (!user) {
      return {
        liked: false,
        error: { code: 'UNAUTHORIZED', message: 'User not authenticated' },
      };
    }

    // Check if already liked
    const { data: existingLike } = await supabase
      .from('comment_likes')
      .select('id')
      .eq('comment_id', commentId)
      .eq('user_id', user.id)
      .single();

    if (existingLike) {
      // Unlike
      const { error } = await supabase
        .from('comment_likes')
        .delete()
        .eq('comment_id', commentId)
        .eq('user_id', user.id);

      if (error) {
        return {
          liked: true,
          error: {
            code: 'UNLIKE_COMMENT_ERROR',
            message: error.message,
            details: error,
          },
        };
      }

      return { liked: false, error: null };
    } else {
      // Like
      const { error } = await supabase.from('comment_likes').insert({
        comment_id: commentId,
        user_id: user.id,
      });

      if (error) {
        return {
          liked: false,
          error: {
            code: 'LIKE_COMMENT_ERROR',
            message: error.message,
            details: error,
          },
        };
      }

      return { liked: true, error: null };
    }
  } catch (error) {
    return {
      liked: false,
      error: {
        code: 'UNEXPECTED_ERROR',
        message: 'An unexpected error occurred',
        details: error,
      },
    };
  }
};

// =============================================
// SHARE OPERATIONS
// =============================================

/**
 * Share a post
 */
export const sharePost = async (
  postId: string,
  shareData: SharePostRequest
): Promise<{ data: any | null; error: FeedError | null }> => {
  try {
    const {
      data: { user },
    } = await supabase.auth.getUser();
    if (!user) {
      return {
        data: null,
        error: { code: 'UNAUTHORIZED', message: 'User not authenticated' },
      };
    }

    const { data, error } = await supabase
      .from('post_shares')
      .insert({
        post_id: postId,
        user_id: user.id,
        shared_content: shareData.shared_content,
      })
      .select()
      .single();

    if (error) {
      return {
        data: null,
        error: {
          code: 'SHARE_POST_ERROR',
          message: error.message,
          details: error,
        },
      };
    }

    return { data, error: null };
  } catch (error) {
    return {
      data: null,
      error: {
        code: 'UNEXPECTED_ERROR',
        message: 'An unexpected error occurred',
        details: error,
      },
    };
  }
};

// =============================================
// SAVE OPERATIONS
// =============================================

/**
 * Save or unsave a post
 */
export const togglePostSave = async (
  postId: string
): Promise<{ saved: boolean; error: FeedError | null }> => {
  try {
    const {
      data: { user },
    } = await supabase.auth.getUser();
    if (!user) {
      return {
        saved: false,
        error: { code: 'UNAUTHORIZED', message: 'User not authenticated' },
      };
    }

    // Check if already saved
    const { data: existingSave } = await supabase
      .from('saved_posts')
      .select('id')
      .eq('post_id', postId)
      .eq('user_id', user.id)
      .single();

    if (existingSave) {
      // Unsave
      const { error } = await supabase
        .from('saved_posts')
        .delete()
        .eq('post_id', postId)
        .eq('user_id', user.id);

      if (error) {
        return {
          saved: true,
          error: {
            code: 'UNSAVE_POST_ERROR',
            message: error.message,
            details: error,
          },
        };
      }

      return { saved: false, error: null };
    } else {
      // Save
      const { error } = await supabase.from('saved_posts').insert({
        post_id: postId,
        user_id: user.id,
      });

      if (error) {
        return {
          saved: false,
          error: {
            code: 'SAVE_POST_ERROR',
            message: error.message,
            details: error,
          },
        };
      }

      return { saved: true, error: null };
    }
  } catch (error) {
    return {
      saved: false,
      error: {
        code: 'UNEXPECTED_ERROR',
        message: 'An unexpected error occurred',
        details: error,
      },
    };
  }
};

// =============================================
// VIEW OPERATIONS
// =============================================

/**
 * Record a post view
 */
export const recordPostView = async (
  postId: string
): Promise<{ error: FeedError | null }> => {
  try {
    const {
      data: { user },
    } = await supabase.auth.getUser();

    const { error } = await supabase.from('post_views').insert({
      post_id: postId,
      user_id: user?.id || null,
      ip_address: null, // Could be added if needed
      user_agent: navigator.userAgent,
    });

    if (error) {
      return {
        error: {
          code: 'RECORD_VIEW_ERROR',
          message: error.message,
          details: error,
        },
      };
    }

    return { error: null };
  } catch (error) {
    return {
      error: {
        code: 'UNEXPECTED_ERROR',
        message: 'An unexpected error occurred',
        details: error,
      },
    };
  }
};

// =============================================
// REPORT OPERATIONS
// =============================================

/**
 * Report a post
 */
export const reportPost = async (
  postId: string,
  reportData: ReportPostRequest
): Promise<{ data: any | null; error: FeedError | null }> => {
  try {
    const {
      data: { user },
    } = await supabase.auth.getUser();
    if (!user) {
      return {
        data: null,
        error: { code: 'UNAUTHORIZED', message: 'User not authenticated' },
      };
    }

    const { data, error } = await supabase
      .from('post_reports')
      .insert({
        post_id: postId,
        reporter_id: user.id,
        reason: reportData.reason,
        description: reportData.description,
      })
      .select()
      .single();

    if (error) {
      return {
        data: null,
        error: {
          code: 'REPORT_POST_ERROR',
          message: error.message,
          details: error,
        },
      };
    }

    return { data, error: null };
  } catch (error) {
    return {
      data: null,
      error: {
        code: 'UNEXPECTED_ERROR',
        message: 'An unexpected error occurred',
        details: error,
      },
    };
  }
};

// =============================================
// ANALYTICS OPERATIONS
// =============================================

/**
 * Get post analytics
 */
export const getPostAnalytics = async (
  postId: string
): Promise<{ data: PostAnalytics | null; error: FeedError | null }> => {
  try {
    const {
      data: { user },
    } = await supabase.auth.getUser();
    if (!user) {
      return {
        data: null,
        error: { code: 'UNAUTHORIZED', message: 'User not authenticated' },
      };
    }

    // Verify user owns the post
    const { data: post } = await supabase
      .from('posts')
      .select('author_id')
      .eq('id', postId)
      .single();

    if (!post || post.author_id !== user.id) {
      return {
        data: null,
        error: {
          code: 'FORBIDDEN',
          message: 'You can only view analytics for your own posts',
        },
      };
    }

    // Get basic metrics
    const { data: metrics } = await supabase
      .from('posts')
      .select('like_count, comment_count, share_count, view_count')
      .eq('id', postId)
      .single();

    // Get detailed analytics (this would need to be implemented based on your analytics requirements)
    const analytics: PostAnalytics = {
      post_id: postId,
      views: metrics?.view_count || 0,
      likes: metrics?.like_count || 0,
      comments: metrics?.comment_count || 0,
      shares: metrics?.share_count || 0,
      engagement_rate: 0, // Calculate based on your formula
      reach: 0, // Calculate based on your formula
      impressions: 0, // Calculate based on your formula
      demographics: {
        age_groups: {},
        countries: {},
        roles: {},
      },
      time_series: [],
    };

    return { data: analytics, error: null };
  } catch (error) {
    return {
      data: null,
      error: {
        code: 'UNEXPECTED_ERROR',
        message: 'An unexpected error occurred',
        details: error,
      },
    };
  }
};

// =============================================
// UTILITY FUNCTIONS
// =============================================

/**
 * Get user's saved posts
 */
export const getSavedPosts = async (
  limit: number = FEED_PAGE_SIZE,
  offset: number = 0
): Promise<{ data: PostWithAuthor[] | null; error: FeedError | null }> => {
  try {
    const {
      data: { user },
    } = await supabase.auth.getUser();
    if (!user) {
      return {
        data: null,
        error: { code: 'UNAUTHORIZED', message: 'User not authenticated' },
      };
    }

    const { data, error } = await supabase
      .from('saved_posts')
      .select(
        `
        post_id,
        posts!inner(*)
      `
      )
      .eq('user_id', user.id)
      .order('created_at', { ascending: false })
      .range(offset, offset + limit - 1);

    if (error) {
      return {
        data: null,
        error: {
          code: 'FETCH_SAVED_POSTS_ERROR',
          message: error.message,
          details: error,
        },
      };
    }

    // Transform the data to match PostWithAuthor format
    const posts =
      data?.map((item: any) => ({
        ...item.posts,
        is_saved: true,
        is_liked: false, // Would need to check separately
      })) || [];

    return { data: posts, error: null };
  } catch (error) {
    return {
      data: null,
      error: {
        code: 'UNEXPECTED_ERROR',
        message: 'An unexpected error occurred',
        details: error,
      },
    };
  }
};

/**
 * Search posts
 */
export const searchPosts = async (
  query: string,
  filters: any = {},
  limit: number = FEED_PAGE_SIZE,
  offset: number = 0
): Promise<{ data: PostWithAuthor[] | null; error: FeedError | null }> => {
  try {
    const {
      data: { user },
    } = await supabase.auth.getUser();
    if (!user) {
      return {
        data: null,
        error: { code: 'UNAUTHORIZED', message: 'User not authenticated' },
      };
    }

    let supabaseQuery = supabase
      .from('posts')
      .select(
        `
        *,
        users!inner(id, display_name, role, university, institution, official_university_name)
      `
      )
      .textSearch('content', query)
      .eq('deleted_at', null)
      .order('created_at', { ascending: false })
      .range(offset, offset + limit - 1);

    // Apply filters
    if (filters.post_type) {
      supabaseQuery = supabaseQuery.eq('post_type', filters.post_type);
    }
    if (filters.tags && filters.tags.length > 0) {
      supabaseQuery = supabaseQuery.overlaps('tags', filters.tags);
    }
    if (filters.author_role) {
      supabaseQuery = supabaseQuery.eq('users.role', filters.author_role);
    }

    const { data, error } = await supabaseQuery;

    if (error) {
      return {
        data: null,
        error: {
          code: 'SEARCH_POSTS_ERROR',
          message: error.message,
          details: error,
        },
      };
    }

    return { data, error: null };
  } catch (error) {
    return {
      data: null,
      error: {
        code: 'UNEXPECTED_ERROR',
        message: 'An unexpected error occurred',
        details: error,
      },
    };
  }
};
