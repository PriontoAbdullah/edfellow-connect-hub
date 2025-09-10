// Custom Hooks for Feed Operations
// This file contains specialized hooks for different feed functionalities

import { useState, useEffect, useCallback } from 'react';
import { useFeed } from '@/contexts/FeedContext';
import { useAuth } from '@/contexts/AuthContext';
import type {
  PostWithAuthor,
  CommentWithAuthor,
  CreatePostRequest,
  CreateCommentRequest,
  FeedQuery,
  CommentQuery,
  PostFormData,
  CommentFormData,
  UploadedFile,
} from '@/types/feed';
import { uploadFiles } from '@/lib/media-upload';

// =============================================
// MAIN FEED HOOK
// =============================================

export const useFeedData = (initialQuery?: FeedQuery) => {
  const { feedState, loadFeedPosts, refreshFeed } = useFeed();
  const { user } = useAuth();
  const [query, setQuery] = useState<FeedQuery>(initialQuery || {});
  const [page, setPage] = useState(0);
  const [initialized, setInitialized] = useState(false);

  // Load initial posts when user is authenticated
  useEffect(() => {
    if (user && !initialized && feedState.posts.length === 0) {
      loadFeedPosts(query, false);
      setInitialized(true);
    }
  }, [user, initialized, feedState.posts.length, query, loadFeedPosts]);

  const loadMore = useCallback(async () => {
    if (!feedState.hasMore || feedState.loading) return;

    const nextPage = page + 1;
    const nextQuery = {
      ...query,
      offset: nextPage * (query.limit || 20),
    };

    await loadFeedPosts(nextQuery, true);
    setPage(nextPage);
  }, [feedState.hasMore, feedState.loading, page, query, loadFeedPosts]);

  const updateQuery = useCallback(
    (newQuery: Partial<FeedQuery>) => {
      const updatedQuery = { ...query, ...newQuery };
      setQuery(updatedQuery);
      setPage(0);
      loadFeedPosts(updatedQuery, false);
    },
    [query, loadFeedPosts]
  );

  const refresh = useCallback(async () => {
    setPage(0);
    await refreshFeed();
  }, [refreshFeed]);

  return {
    ...feedState,
    query,
    page,
    loadMore,
    updateQuery,
    refresh,
  };
};

// =============================================
// POST CREATION HOOK
// =============================================

export const usePostCreation = () => {
  const { createNewPost } = useFeed();
  const { user } = useAuth();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const createPost = useCallback(
    async (formData: PostFormData): Promise<boolean> => {
      if (!user) {
        setError('User not authenticated');
        return false;
      }

      setLoading(true);
      setError(null);

      try {
        // Upload files if any
        let mediaUrls: string[] = [];
        if (formData.files.length > 0) {
          const files = formData.files.map((f) => f.file);
          const uploadResult = await uploadFiles(files);

          if (uploadResult.error) {
            setError(uploadResult.error.message);
            return false;
          }

          mediaUrls = uploadResult.data?.map((f) => f.url) || [];
        }

        // Create post data
        const postData: CreatePostRequest = {
          content: formData.content,
          post_type: formData.post_type,
          media_urls: mediaUrls,
          tags: formData.tags,
          visibility: formData.visibility,
          article_data: formData.article_data,
          event_data: formData.event_data,
          poll_data: formData.poll_data,
        };

        const success = await createNewPost(postData);

        if (!success) {
          setError('Failed to create post');
          return false;
        }

        return true;
      } catch (err) {
        setError('An unexpected error occurred');
        return false;
      } finally {
        setLoading(false);
      }
    },
    [user, createNewPost]
  );

  return {
    createPost,
    loading,
    error,
    clearError: () => setError(null),
  };
};

// =============================================
// POST INTERACTIONS HOOK
// =============================================

export const usePostInteractions = (postId: string) => {
  const { likePost, savePost, shareExistingPost } = useFeed();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleLike = useCallback(async () => {
    setLoading(true);
    setError(null);

    try {
      const success = await likePost(postId);
      if (!success) {
        setError('Failed to like post');
      }
    } catch (err) {
      setError('An unexpected error occurred');
    } finally {
      setLoading(false);
    }
  }, [postId, likePost]);

  const handleSave = useCallback(async () => {
    setLoading(true);
    setError(null);

    try {
      const success = await savePost(postId);
      if (!success) {
        setError('Failed to save post');
      }
    } catch (err) {
      setError('An unexpected error occurred');
    } finally {
      setLoading(false);
    }
  }, [postId, savePost]);

  const handleShare = useCallback(
    async (content?: string) => {
      setLoading(true);
      setError(null);

      try {
        const success = await shareExistingPost(postId, content);
        if (!success) {
          setError('Failed to share post');
        }
      } catch (err) {
        setError('An unexpected error occurred');
      } finally {
        setLoading(false);
      }
    },
    [postId, shareExistingPost]
  );

  return {
    handleLike,
    handleSave,
    handleShare,
    loading,
    error,
    clearError: () => setError(null),
  };
};

// =============================================
// POST DETAILS HOOK
// =============================================

export const usePostDetails = (postId: string) => {
  const { postState, loadPost, loadPostComments } = useFeed();
  const [commentsPage, setCommentsPage] = useState(0);

  useEffect(() => {
    if (postId) {
      loadPost(postId);
      loadPostComments(postId);
    }
  }, [postId]); // Remove function dependencies to prevent infinite loops

  const loadMoreComments = useCallback(async () => {
    if (!postState.commentsHasMore || postState.commentsLoading) return;

    const nextPage = commentsPage + 1;
    const query: CommentQuery = {
      offset: nextPage * 10,
    };

    await loadPostComments(postId, query, true);
    setCommentsPage(nextPage);
  }, [
    postState.commentsHasMore,
    postState.commentsLoading,
    commentsPage,
    postId,
  ]); // Remove loadPostComments dependency

  return {
    ...postState,
    loadMoreComments,
  };
};

// =============================================
// COMMENT CREATION HOOK
// =============================================

export const useCommentCreation = (postId: string) => {
  const { createNewComment } = useFeed();
  const { user } = useAuth();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const createComment = useCallback(
    async (formData: CommentFormData): Promise<boolean> => {
      if (!user) {
        setError('User not authenticated');
        return false;
      }

      setLoading(true);
      setError(null);

      try {
        // Upload files if any
        let mediaUrls: string[] = [];
        if (formData.files.length > 0) {
          const files = formData.files.map((f) => f.file);
          const uploadResult = await uploadFiles(files);

          if (uploadResult.error) {
            setError(uploadResult.error.message);
            return false;
          }

          mediaUrls = uploadResult.data?.map((f) => f.url) || [];
        }

        // Create comment data
        const commentData: CreateCommentRequest = {
          content: formData.content,
          media_urls: mediaUrls,
          parent_comment_id: formData.parent_comment_id,
        };

        const success = await createNewComment(postId, commentData);

        if (!success) {
          setError('Failed to create comment');
          return false;
        }

        return true;
      } catch (err) {
        setError('An unexpected error occurred');
        return false;
      } finally {
        setLoading(false);
      }
    },
    [user, postId] // Remove createNewComment dependency
  );

  return {
    createComment,
    loading,
    error,
    clearError: () => setError(null),
  };
};

// =============================================
// COMMENT INTERACTIONS HOOK
// =============================================

export const useCommentInteractions = (commentId: string) => {
  const { likeComment } = useFeed();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleLike = useCallback(async () => {
    setLoading(true);
    setError(null);

    try {
      const success = await likeComment(commentId);
      if (!success) {
        setError('Failed to like comment');
      }
    } catch (err) {
      setError('An unexpected error occurred');
    } finally {
      setLoading(false);
    }
  }, [commentId, likeComment]);

  return {
    handleLike,
    loading,
    error,
    clearError: () => setError(null),
  };
};

// =============================================
// FEED FILTERS HOOK
// =============================================

export const useFeedFilters = () => {
  const [filters, setFilters] = useState({
    post_type: undefined as any,
    tags: [] as string[],
    author_role: undefined as any,
    date_range: undefined as any,
  });

  const updateFilter = useCallback((key: string, value: any) => {
    setFilters((prev) => ({
      ...prev,
      [key]: value,
    }));
  }, []);

  const clearFilters = useCallback(() => {
    setFilters({
      post_type: undefined,
      tags: [],
      author_role: undefined,
      date_range: undefined,
    });
  }, []);

  const hasActiveFilters = Object.values(filters).some(
    (value) =>
      value !== undefined &&
      value !== null &&
      (Array.isArray(value) ? value.length > 0 : true)
  );

  return {
    filters,
    updateFilter,
    clearFilters,
    hasActiveFilters,
  };
};

// =============================================
// INFINITE SCROLL HOOK
// =============================================

export const useInfiniteScroll = (
  callback: () => void,
  hasMore: boolean,
  loading: boolean
) => {
  useEffect(() => {
    const handleScroll = () => {
      if (loading || !hasMore) return;

      const scrollTop =
        window.pageYOffset || document.documentElement.scrollTop;
      const windowHeight = window.innerHeight;
      const documentHeight = document.documentElement.scrollHeight;

      // Load more when user is 200px from bottom
      if (scrollTop + windowHeight >= documentHeight - 200) {
        callback();
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [callback, hasMore, loading]);
};

// =============================================
// POST SEARCH HOOK
// =============================================

export const usePostSearch = () => {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState<PostWithAuthor[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const search = useCallback(async (searchQuery: string, filters: any = {}) => {
    if (!searchQuery.trim()) {
      setResults([]);
      return;
    }

    setLoading(true);
    setError(null);

    try {
      // This would use the searchPosts function from feed-api.ts
      // const { data, error } = await searchPosts(searchQuery, filters);

      // For now, return empty results
      setResults([]);
    } catch (err) {
      setError('Search failed');
    } finally {
      setLoading(false);
    }
  }, []);

  const clearSearch = useCallback(() => {
    setQuery('');
    setResults([]);
    setError(null);
  }, []);

  return {
    query,
    setQuery,
    results,
    loading,
    error,
    search,
    clearSearch,
  };
};

// =============================================
// NOTIFICATION HOOK
// =============================================

export const useFeedNotifications = () => {
  const [notifications, setNotifications] = useState<any[]>([]);
  const [unreadCount, setUnreadCount] = useState(0);

  // This would integrate with a notifications system
  // For now, it's a placeholder

  const markAsRead = useCallback((notificationId: string) => {
    setNotifications((prev) =>
      prev.map((n) => (n.id === notificationId ? { ...n, is_read: true } : n))
    );
    setUnreadCount((prev) => Math.max(0, prev - 1));
  }, []);

  const markAllAsRead = useCallback(() => {
    setNotifications((prev) => prev.map((n) => ({ ...n, is_read: true })));
    setUnreadCount(0);
  }, []);

  return {
    notifications,
    unreadCount,
    markAsRead,
    markAllAsRead,
  };
};
