// Feed Context for State Management
// This file provides React context for managing feed state across components

import React, {
  createContext,
  useContext,
  useReducer,
  useEffect,
  useCallback,
  ReactNode,
} from 'react';
import { useAuth } from './AuthContext';
import { supabase } from '@/lib/supabase';
import type {
  PostWithAuthor,
  CommentWithAuthor,
  FeedState,
  PostState,
  FeedAction,
  PostAction,
  CreatePostRequest,
  CreateCommentRequest,
  FeedQuery,
  CommentQuery,
} from '@/types/feed';
import {
  createPost,
  getFeedPosts,
  getPost,
  updatePost,
  deletePost,
  createComment,
  getPostComments,
  updateComment,
  deleteComment,
  togglePostLike,
  toggleCommentLike,
  sharePost,
  togglePostSave,
  recordPostView,
} from '@/lib/feed-api';

// =============================================
// FEED REDUCER
// =============================================

const feedReducer = (state: FeedState, action: FeedAction): FeedState => {
  switch (action.type) {
    case 'SET_LOADING':
      return { ...state, loading: action.payload };

    case 'SET_ERROR':
      return { ...state, error: action.payload };

    case 'SET_POSTS':
      return { ...state, posts: action.payload, loading: false, error: null };

    case 'ADD_POST':
      return { ...state, posts: [action.payload, ...state.posts] };

    case 'UPDATE_POST':
      return {
        ...state,
        posts: state.posts.map((post) =>
          post.id === action.payload.id ? action.payload : post
        ),
      };

    case 'DELETE_POST':
      return {
        ...state,
        posts: state.posts.filter((post) => post.id !== action.payload),
      };

    case 'LIKE_POST':
      return {
        ...state,
        posts: state.posts.map((post) =>
          post.id === action.payload.post_id
            ? {
                ...post,
                is_liked: action.payload.liked,
                like_count: action.payload.liked
                  ? post.like_count + 1
                  : post.like_count - 1,
              }
            : post
        ),
      };

    case 'SAVE_POST':
      return {
        ...state,
        posts: state.posts.map((post) =>
          post.id === action.payload.post_id
            ? { ...post, is_saved: action.payload.saved }
            : post
        ),
      };

    case 'UPDATE_COMMENT_COUNT':
      return {
        ...state,
        posts: state.posts.map((post) =>
          post.id === action.payload.post_id
            ? {
                ...post,
                comment_count: action.payload.new_count,
              }
            : post
        ),
      };

    case 'SET_HAS_MORE':
      return { ...state, hasMore: action.payload };

    case 'SET_TOTAL_COUNT':
      return { ...state, totalCount: action.payload };

    default:
      return state;
  }
};

// =============================================
// POST REDUCER
// =============================================

const postReducer = (state: PostState, action: PostAction): PostState => {
  switch (action.type) {
    case 'SET_POST_LOADING':
      return { ...state, loading: action.payload };

    case 'SET_POST_ERROR':
      return { ...state, error: action.payload };

    case 'SET_POST':
      return { ...state, post: action.payload, loading: false, error: null };

    case 'UPDATE_POST':
      return {
        ...state,
        post: state.post ? { ...state.post, ...action.payload } : null,
      };

    case 'SET_COMMENTS_LOADING':
      return { ...state, commentsLoading: action.payload };

    case 'SET_COMMENTS_ERROR':
      return { ...state, commentsError: action.payload };

    case 'SET_COMMENTS':
      return {
        ...state,
        comments: action.payload,
        commentsLoading: false,
        commentsError: null,
      };

    case 'ADD_COMMENT':
      return { ...state, comments: [...state.comments, action.payload] };

    case 'UPDATE_COMMENT':
      return {
        ...state,
        comments: state.comments.map((comment) =>
          comment.id === action.payload.id ? action.payload : comment
        ),
      };

    case 'DELETE_COMMENT':
      return {
        ...state,
        comments: state.comments.filter(
          (comment) => comment.id !== action.payload
        ),
      };

    case 'LIKE_COMMENT':
      return {
        ...state,
        comments: state.comments.map((comment) =>
          comment.id === action.payload.comment_id
            ? {
                ...comment,
                is_liked: action.payload.liked,
                like_count: action.payload.liked
                  ? comment.like_count + 1
                  : comment.like_count - 1,
              }
            : comment
        ),
      };

    case 'SET_COMMENTS_HAS_MORE':
      return { ...state, commentsHasMore: action.payload };

    default:
      return state;
  }
};

// =============================================
// CONTEXT TYPES
// =============================================

interface FeedContextType {
  // Feed state
  feedState: FeedState;

  // Post state
  postState: PostState;

  // Feed actions
  loadFeedPosts: (query?: FeedQuery, append?: boolean) => Promise<void>;
  createNewPost: (postData: CreatePostRequest) => Promise<boolean>;
  updateExistingPost: (postId: string, updates: any) => Promise<boolean>;
  deleteExistingPost: (postId: string) => Promise<boolean>;
  likePost: (postId: string) => Promise<boolean>;
  savePost: (postId: string) => Promise<boolean>;
  shareExistingPost: (postId: string, content?: string) => Promise<boolean>;
  updateCommentCount: (postId: string, newCount: number) => void;

  // Post actions
  loadPost: (postId: string) => Promise<void>;
  loadPostComments: (
    postId: string,
    query?: CommentQuery,
    append?: boolean
  ) => Promise<void>;
  createNewComment: (
    postId: string,
    commentData: CreateCommentRequest
  ) => Promise<boolean>;
  updateExistingComment: (commentId: string, updates: any) => Promise<boolean>;
  deleteExistingComment: (commentId: string) => Promise<boolean>;
  likeComment: (commentId: string) => Promise<boolean>;

  // Utility actions
  refreshFeed: () => Promise<void>;
  clearFeed: () => void;
  clearPost: () => void;
}

// =============================================
// CONTEXT CREATION
// =============================================

const FeedContext = createContext<FeedContextType | undefined>(undefined);

// =============================================
// PROVIDER COMPONENT
// =============================================

interface FeedProviderProps {
  children: ReactNode;
}

export const FeedProvider: React.FC<FeedProviderProps> = ({ children }) => {
  const { user, userData, loading: authLoading } = useAuth();

  // Feed state
  const [feedState, feedDispatch] = useReducer(feedReducer, {
    posts: [],
    loading: false,
    error: null,
    hasMore: true,
    totalCount: 0,
  });

  // Post state
  const [postState, postDispatch] = useReducer(postReducer, {
    post: null,
    comments: [],
    loading: false,
    error: null,
    commentsLoading: false,
    commentsError: null,
    commentsHasMore: true,
  });

  // =============================================
  // FEED ACTIONS
  // =============================================

  const loadFeedPosts = useCallback(
    async (query: FeedQuery = {}, append: boolean = false) => {
      if (!user || !user.id) return;

      try {
        if (!append) {
          feedDispatch({ type: 'SET_LOADING', payload: true });
          feedDispatch({ type: 'SET_ERROR', payload: null });
        }

        const { data, error } = await getFeedPosts(query, user?.id);

        if (error) {
          feedDispatch({ type: 'SET_ERROR', payload: error.message });
          return;
        }

        if (data) {
          // Transform the data to match PostWithAuthor format
          const transformedData = data.map((post: any) => ({
            ...post,
            author: {
              id: post.author_id,
              name: post.author_name,
              avatar: post.author_avatar || null,
              role: post.author_role,
              university: post.author_university,
              country: post.author_country,
            },
          }));

          if (append) {
            feedDispatch({
              type: 'SET_POSTS',
              payload: [...feedState.posts, ...transformedData],
            });
          } else {
            feedDispatch({ type: 'SET_POSTS', payload: transformedData });
          }

          feedDispatch({
            type: 'SET_HAS_MORE',
            payload: data.length === (query.limit || 20),
          });
        }
      } catch (error) {
        feedDispatch({
          type: 'SET_ERROR',
          payload: 'An unexpected error occurred',
        });
      }
    },
    [user, feedDispatch, feedState.posts]
  );

  const createNewPost = useCallback(
    async (postData: CreatePostRequest): Promise<boolean> => {
      if (!user || !user.id) return false;

      try {
        const { data, error } = await createPost(postData);

        if (error) {
          feedDispatch({ type: 'SET_ERROR', payload: error.message });
          return false;
        }

        if (data) {
          // The data from createPost doesn't include author info, so we need to construct it
          // This is only for newly created posts, existing posts will have author info from the database
          const newPost: PostWithAuthor = {
            ...data,
            author: {
              id: user?.id || '',
              name:
                userData?.displayName ||
                `${userData?.firstName || ''} ${userData?.lastName || ''}`,
              avatar: '/api/placeholder/40/40',
              role:
                (userData?.role as 'student' | 'professor' | 'university') ||
                'student',
              university:
                userData?.university ||
                userData?.institution ||
                userData?.officialUniversityName,
            },
            is_liked: false,
            is_saved: false,
          };

          feedDispatch({ type: 'ADD_POST', payload: newPost });
          return true;
        }

        return false;
      } catch (error) {
        feedDispatch({
          type: 'SET_ERROR',
          payload: 'An unexpected error occurred',
        });
        return false;
      }
    },
    [user, userData, feedDispatch]
  );

  const updateExistingPost = useCallback(
    async (postId: string, updates: any): Promise<boolean> => {
      try {
        const { data, error } = await updatePost(postId, updates);

        if (error) {
          feedDispatch({ type: 'SET_ERROR', payload: error.message });
          return false;
        }

        if (data) {
          // For updated posts, we need to preserve the original author info
          // since updatePost only returns the post data without author info
          const updatedPost: PostWithAuthor = {
            ...data,
            author: {
              id: data.author_id,
              name: userData?.displayName || 'Unknown',
              avatar: '/api/placeholder/40/40',
              role:
                (userData?.role as 'student' | 'professor' | 'university') ||
                'student',
              university:
                userData?.university ||
                userData?.institution ||
                userData?.officialUniversityName,
            },
            is_liked: false, // Would need to check separately
            is_saved: false, // Would need to check separately
          };

          feedDispatch({ type: 'UPDATE_POST', payload: updatedPost });
          return true;
        }

        return false;
      } catch (error) {
        feedDispatch({
          type: 'SET_ERROR',
          payload: 'An unexpected error occurred',
        });
        return false;
      }
    },
    [userData, feedDispatch]
  );

  const deleteExistingPost = useCallback(
    async (postId: string): Promise<boolean> => {
      try {
        const { error } = await deletePost(postId);

        if (error) {
          feedDispatch({ type: 'SET_ERROR', payload: error.message });
          return false;
        }

        feedDispatch({ type: 'DELETE_POST', payload: postId });
        return true;
      } catch (error) {
        feedDispatch({
          type: 'SET_ERROR',
          payload: 'An unexpected error occurred',
        });
        return false;
      }
    },
    [feedDispatch]
  );

  const likePost = useCallback(
    async (postId: string): Promise<boolean> => {
      try {
        const { liked, error } = await togglePostLike(postId);

        if (error) {
          feedDispatch({ type: 'SET_ERROR', payload: error.message });
          return false;
        }

        feedDispatch({
          type: 'LIKE_POST',
          payload: { post_id: postId, liked },
        });
        return true;
      } catch (error) {
        feedDispatch({
          type: 'SET_ERROR',
          payload: 'An unexpected error occurred',
        });
        return false;
      }
    },
    [feedDispatch]
  );

  const savePost = useCallback(
    async (postId: string): Promise<boolean> => {
      try {
        const { saved, error } = await togglePostSave(postId);

        if (error) {
          feedDispatch({ type: 'SET_ERROR', payload: error.message });
          return false;
        }

        feedDispatch({
          type: 'SAVE_POST',
          payload: { post_id: postId, saved },
        });
        return true;
      } catch (error) {
        feedDispatch({
          type: 'SET_ERROR',
          payload: 'An unexpected error occurred',
        });
        return false;
      }
    },
    [feedDispatch]
  );

  const shareExistingPost = useCallback(
    async (postId: string, content?: string): Promise<boolean> => {
      try {
        const { error } = await sharePost(postId, { shared_content: content });

        if (error) {
          feedDispatch({ type: 'SET_ERROR', payload: error.message });
          return false;
        }

        return true;
      } catch (error) {
        feedDispatch({
          type: 'SET_ERROR',
          payload: 'An unexpected error occurred',
        });
        return false;
      }
    },
    [feedDispatch]
  );

  const updateCommentCount = useCallback(
    (postId: string, newCount: number) => {
      feedDispatch({
        type: 'UPDATE_COMMENT_COUNT',
        payload: { post_id: postId, new_count: newCount },
      });
    },
    [feedDispatch]
  );

  // =============================================
  // POST ACTIONS
  // =============================================

  const loadPost = useCallback(
    async (postId: string) => {
      if (!user || !user.id) return;

      try {
        postDispatch({ type: 'SET_POST_LOADING', payload: true });
        postDispatch({ type: 'SET_POST_ERROR', payload: null });

        const { data, error } = await getPost(postId);

        if (error) {
          postDispatch({ type: 'SET_POST_ERROR', payload: error.message });
          return;
        }

        if (data) {
          // Transform the data to match PostWithAuthor format
          const transformedPost = {
            ...data,
            author: {
              id: data.author_id,
              name: (data as any).author_name,
              avatar: (data as any).author_avatar || null,
              role: (data as any).author_role,
              university: (data as any).author_university,
              country: (data as any).author_country,
            },
          };

          postDispatch({ type: 'SET_POST', payload: transformedPost });

          // Record view
          await recordPostView(postId);
        }
      } catch (error) {
        postDispatch({
          type: 'SET_POST_ERROR',
          payload: 'An unexpected error occurred',
        });
      }
    },
    [user, postDispatch]
  );

  const loadPostComments = useCallback(
    async (
      postId: string,
      query: CommentQuery = {},
      append: boolean = false
    ) => {
      if (!user || !user.id) return;

      try {
        if (!append) {
          postDispatch({ type: 'SET_COMMENTS_LOADING', payload: true });
          postDispatch({ type: 'SET_COMMENTS_ERROR', payload: null });
        }

        const { data, error } = await getPostComments(postId, query);

        if (error) {
          postDispatch({ type: 'SET_COMMENTS_ERROR', payload: error.message });
          return;
        }

        if (data) {
          // Transform the data to match CommentWithAuthor format
          const transformedData = data.map((comment: any) => ({
            ...comment,
            author: {
              id: comment.author_id,
              name: comment.author_name,
              avatar: comment.author_avatar || null,
              role: comment.author_role,
              country: comment.author_country,
            },
          }));

          if (append) {
            postDispatch({
              type: 'SET_COMMENTS',
              payload: [...postState.comments, ...transformedData],
            });
          } else {
            postDispatch({ type: 'SET_COMMENTS', payload: transformedData });
          }

          postDispatch({
            type: 'SET_COMMENTS_HAS_MORE',
            payload: data.length === (query.limit || 10),
          });
        }
      } catch (error) {
        postDispatch({
          type: 'SET_COMMENTS_ERROR',
          payload: 'An unexpected error occurred',
        });
      }
    },
    [user, postDispatch, postState.comments]
  );

  const createNewComment = useCallback(
    async (
      postId: string,
      commentData: CreateCommentRequest
    ): Promise<boolean> => {
      if (!user || !user.id) return false;

      try {
        const { data, error } = await createComment(postId, commentData);

        if (error) {
          postDispatch({ type: 'SET_COMMENTS_ERROR', payload: error.message });
          return false;
        }

        if (data) {
          const newComment: CommentWithAuthor = {
            ...data,
            author: {
              id: user?.id || '',
              name:
                userData?.displayName ||
                `${userData?.firstName || ''} ${userData?.lastName || ''}`,
              avatar: userData?.avatar || '/api/placeholder/40/40',
              role:
                (userData?.role as 'student' | 'professor' | 'university') ||
                'student',
              country: userData?.country,
            },
            is_liked: false,
          };

          postDispatch({ type: 'ADD_COMMENT', payload: newComment });
          return true;
        }

        return false;
      } catch (error) {
        postDispatch({
          type: 'SET_COMMENTS_ERROR',
          payload: 'An unexpected error occurred',
        });
        return false;
      }
    },
    [user, userData, postDispatch]
  );

  const updateExistingComment = useCallback(
    async (commentId: string, updates: any): Promise<boolean> => {
      try {
        const { data, error } = await updateComment(commentId, updates);

        if (error) {
          postDispatch({ type: 'SET_COMMENTS_ERROR', payload: error.message });
          return false;
        }

        if (data) {
          // For updated comments, we need to preserve the original author info
          // since updateComment only returns the comment data without author info
          const updatedComment: CommentWithAuthor = {
            ...data,
            author: {
              id: data.author_id,
              name: userData?.displayName || 'Unknown',
              avatar: '/api/placeholder/40/40',
              role:
                (userData?.role as 'student' | 'professor' | 'university') ||
                'student',
            },
            is_liked: false, // Would need to check separately
          };

          postDispatch({ type: 'UPDATE_COMMENT', payload: updatedComment });
          return true;
        }

        return false;
      } catch (error) {
        postDispatch({
          type: 'SET_COMMENTS_ERROR',
          payload: 'An unexpected error occurred',
        });
        return false;
      }
    },
    [userData, postDispatch]
  );

  const deleteExistingComment = useCallback(
    async (commentId: string): Promise<boolean> => {
      try {
        const { error } = await deleteComment(commentId);

        if (error) {
          postDispatch({ type: 'SET_COMMENTS_ERROR', payload: error.message });
          return false;
        }

        postDispatch({ type: 'DELETE_COMMENT', payload: commentId });
        return true;
      } catch (error) {
        postDispatch({
          type: 'SET_COMMENTS_ERROR',
          payload: 'An unexpected error occurred',
        });
        return false;
      }
    },
    [postDispatch]
  );

  const likeComment = useCallback(
    async (commentId: string): Promise<boolean> => {
      try {
        const { liked, error } = await toggleCommentLike(commentId);

        if (error) {
          postDispatch({ type: 'SET_COMMENTS_ERROR', payload: error.message });
          return false;
        }

        postDispatch({
          type: 'LIKE_COMMENT',
          payload: { comment_id: commentId, liked },
        });
        return true;
      } catch (error) {
        postDispatch({
          type: 'SET_COMMENTS_ERROR',
          payload: 'An unexpected error occurred',
        });
        return false;
      }
    },
    [postDispatch]
  );

  // =============================================
  // UTILITY ACTIONS
  // =============================================

  const refreshFeed = useCallback(async () => {
    await loadFeedPosts({}, false);
  }, [loadFeedPosts]);

  const clearFeed = useCallback(() => {
    feedDispatch({ type: 'SET_POSTS', payload: [] });
    feedDispatch({ type: 'SET_ERROR', payload: null });
    feedDispatch({ type: 'SET_HAS_MORE', payload: true });
  }, [feedDispatch]);

  const clearPost = useCallback(() => {
    postDispatch({ type: 'SET_POST', payload: null });
    postDispatch({ type: 'SET_COMMENTS', payload: [] });
    postDispatch({ type: 'SET_POST_ERROR', payload: null });
    postDispatch({ type: 'SET_COMMENTS_ERROR', payload: null });
  }, [postDispatch]);

  // =============================================
  // REAL-TIME SUBSCRIPTIONS
  // =============================================

  useEffect(() => {
    if (!user) return;

    // Subscribe to posts changes
    const postsSubscription = supabase
      .channel('posts_changes')
      .on(
        'postgres_changes',
        {
          event: '*',
          schema: 'public',
          table: 'posts',
        },
        (payload) => {
          console.log('Posts change received:', payload);
          // Handle real-time updates
          if (payload.eventType === 'INSERT') {
            // New post added
            refreshFeed();
          } else if (payload.eventType === 'UPDATE') {
            // Post updated
            refreshFeed();
          } else if (payload.eventType === 'DELETE') {
            // Post deleted
            refreshFeed();
          }
        }
      )
      .subscribe();

    // Subscribe to comments changes
    const commentsSubscription = supabase
      .channel('comments_changes')
      .on(
        'postgres_changes',
        {
          event: '*',
          schema: 'public',
          table: 'comments',
        },
        (payload) => {
          console.log('Comments change received:', payload);
          // Handle real-time updates
          if (payload.eventType === 'INSERT') {
            // New comment added
            if (postState.post && payload.new.post_id === postState.post.id) {
              loadPostComments(postState.post.id);
            }
          }
        }
      )
      .subscribe();

    // Subscribe to likes changes
    const likesSubscription = supabase
      .channel('likes_changes')
      .on(
        'postgres_changes',
        {
          event: '*',
          schema: 'public',
          table: 'post_likes',
        },
        (payload) => {
          console.log('Likes change received:', payload);
          // Handle real-time updates
          refreshFeed();
        }
      )
      .subscribe();

    return () => {
      postsSubscription.unsubscribe();
      commentsSubscription.unsubscribe();
      likesSubscription.unsubscribe();
    };
  }, [user, postState.post]);

  // =============================================
  // CONTEXT VALUE
  // =============================================

  const contextValue: FeedContextType = {
    // State
    feedState: authLoading ? { ...feedState, loading: true } : feedState,
    postState,

    // Feed actions
    loadFeedPosts,
    createNewPost,
    updateExistingPost,
    deleteExistingPost,
    likePost,
    savePost,
    shareExistingPost,
    updateCommentCount,

    // Post actions
    loadPost,
    loadPostComments,
    createNewComment,
    updateExistingComment,
    deleteExistingComment,
    likeComment,

    // Utility actions
    refreshFeed,
    clearFeed,
    clearPost,
  };

  return (
    <FeedContext.Provider value={contextValue}>{children}</FeedContext.Provider>
  );
};

// =============================================
// CUSTOM HOOK
// =============================================

export const useFeed = (): FeedContextType => {
  const context = useContext(FeedContext);
  if (context === undefined) {
    throw new Error('useFeed must be used within a FeedProvider');
  }
  return context;
};
