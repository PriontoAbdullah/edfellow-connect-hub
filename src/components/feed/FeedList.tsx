// Feed List Component
// This component displays a list of posts with infinite scroll and loading states

import React, { useEffect, useCallback } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { RefreshCw, AlertCircle } from 'lucide-react';
import { FeedPost } from './FeedPost';
import { CreatePost } from './CreatePost';
import { useFeedData, useInfiniteScroll } from '@/hooks/useFeed';
import {
  FeedLoadingState,
  InfiniteScrollLoading,
} from '@/components/ui/loading';
import type { PostWithAuthor } from '@/types/feed';

interface FeedListProps {
  initialQuery?: any;
  showCreatePost?: boolean;
  onPostClick?: (post: PostWithAuthor) => void;
  onPostEdit?: (post: PostWithAuthor) => void;
  onPostDelete?: (postId: string) => void;
  onPostComment?: (postId: string) => void;
  className?: string;
}

export const FeedList: React.FC<FeedListProps> = ({
  initialQuery,
  showCreatePost = true,
  onPostClick,
  onPostEdit,
  onPostDelete,
  onPostComment,
  className = '',
}) => {
  const { posts, loading, error, hasMore, loadMore, refresh } =
    useFeedData(initialQuery);

  // Infinite scroll
  useInfiniteScroll(loadMore, hasMore, loading);

  const handlePostClick = useCallback(
    (post: PostWithAuthor) => {
      onPostClick?.(post);
    },
    [onPostClick]
  );

  const handlePostEdit = useCallback(
    (post: PostWithAuthor) => {
      onPostEdit?.(post);
    },
    [onPostEdit]
  );

  const handlePostDelete = useCallback(
    (postId: string) => {
      onPostDelete?.(postId);
    },
    [onPostDelete]
  );

  const handlePostComment = useCallback(
    (postId: string) => {
      onPostComment?.(postId);
    },
    [onPostComment]
  );

  const handleRefresh = useCallback(async () => {
    await refresh();
  }, [refresh]);

  return (
    <div className={`space-y-4 ${className}`}>
      {/* Create Post */}
      {showCreatePost && <CreatePost onPostCreated={handleRefresh} />}

      {/* Error State */}
      {error && (
        <Alert variant='destructive'>
          <AlertCircle className='h-4 w-4' />
          <AlertDescription className='flex items-center justify-between'>
            <span>{error}</span>
            <Button
              variant='outline'
              size='sm'
              onClick={handleRefresh}
              className='ml-4'
            >
              <RefreshCw className='h-4 w-4 mr-2' />
              Retry
            </Button>
          </AlertDescription>
        </Alert>
      )}

      {/* Feed Content */}
      <FeedLoadingState
        loading={loading && posts.length === 0}
        error={error}
        empty={!loading && posts.length === 0 && !error}
        onRetry={handleRefresh}
      >
        <div className='space-y-4'>
          {posts.map((post) => (
            <FeedPost
              key={post.id}
              post={post}
              onComment={handlePostComment}
              onEdit={handlePostEdit}
              onDelete={handlePostDelete}
            />
          ))}

          {/* Infinite Scroll Loading */}
          <InfiniteScrollLoading
            hasMore={hasMore}
            loading={loading && posts.length > 0}
          />
        </div>
      </FeedLoadingState>
    </div>
  );
};
