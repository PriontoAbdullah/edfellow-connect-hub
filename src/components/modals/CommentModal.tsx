// Comment Modal Component
// This component displays comments for a post and allows users to add new comments

import React, { useState, useEffect } from 'react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { useToast } from '@/hooks/use-toast';
import { CountryFlag } from '@/components/ui/CountryFlag';
import { getCountryCode } from '@/lib/countries';
import { useCommentCreation, useCommentInteractions } from '@/hooks/useFeed';
import { getPostComments } from '@/lib/feed-api';
import { formatDistanceToNow } from 'date-fns';
import {
  Send,
  ThumbsUp,
  Reply,
  MoreHorizontal,
  Edit,
  Trash2,
  Flag,
} from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import type { CommentWithAuthor } from '@/types/feed';

interface CommentModalProps {
  postId: string;
  isOpen: boolean;
  onClose: () => void;
  postAuthorName?: string;
  onCommentAdded?: () => void; // Callback to update parent component
}

export const CommentModal: React.FC<CommentModalProps> = ({
  postId,
  isOpen,
  onClose,
  postAuthorName,
  onCommentAdded,
}) => {
  const { toast } = useToast();

  // Local state for comments instead of using global postState
  const [comments, setComments] = useState<CommentWithAuthor[]>([]);
  const [loading, setLoading] = useState(false);
  const [commentsLoading, setCommentsLoading] = useState(false);
  const [commentsHasMore, setCommentsHasMore] = useState(true);
  const [commentsPage, setCommentsPage] = useState(0);

  const { createComment, loading: creatingComment } =
    useCommentCreation(postId);
  const [newComment, setNewComment] = useState('');
  const [replyingTo, setReplyingTo] = useState<string | null>(null);

  // Load comments when modal opens
  useEffect(() => {
    if (isOpen && postId) {
      loadComments();
    } else {
      // Clear state when modal closes
      setComments([]);
      setCommentsPage(0);
      setCommentsHasMore(true);
      setNewComment('');
      setReplyingTo(null);
    }
  }, [isOpen, postId]);

  const loadComments = async (append = false) => {
    if (!postId) return;

    try {
      if (!append) {
        setCommentsLoading(true);
        setCommentsPage(0);
      }

      const query = {
        limit: 10,
        offset: append ? commentsPage * 10 : 0,
      };

      const { data, error } = await getPostComments(postId, query);

      if (error) {
        toast({
          title: 'Error',
          description: 'Failed to load comments',
          variant: 'destructive',
        });
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
          setComments((prev) => [...prev, ...transformedData]);
        } else {
          setComments(transformedData);
        }

        setCommentsHasMore(data.length === 10);
        if (append) {
          setCommentsPage((prev) => prev + 1);
        }
      }
    } catch (error) {
      toast({
        title: 'Error',
        description: 'Failed to load comments',
        variant: 'destructive',
      });
    } finally {
      setCommentsLoading(false);
    }
  };

  const loadMoreComments = async () => {
    if (!commentsHasMore || commentsLoading) return;
    await loadComments(true);
  };

  const handleSubmitComment = async () => {
    if (!newComment.trim()) return;

    const success = await createComment({
      content: newComment.trim(),
      files: [],
      parent_comment_id: replyingTo || undefined,
    });

    if (success) {
      // Reload comments to get the new comment with proper data
      await loadComments();

      setNewComment('');
      setReplyingTo(null);

      // Notify parent component that a comment was added
      onCommentAdded?.();

      toast({
        title: 'Comment posted',
        description: 'Your comment has been posted successfully',
      });
    } else {
      toast({
        title: 'Error',
        description: 'Failed to post comment. Please try again.',
        variant: 'destructive',
      });
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && (e.ctrlKey || e.metaKey)) {
      e.preventDefault();
      handleSubmitComment();
    }
  };

  const formatTimeAgo = (dateString: string) => {
    try {
      return formatDistanceToNow(new Date(dateString), { addSuffix: true });
    } catch {
      return 'Unknown time';
    }
  };

  const CommentItem: React.FC<{ comment: CommentWithAuthor }> = ({
    comment,
  }) => {
    const { handleLike, loading: likingComment } = useCommentInteractions(
      comment.id
    );

    const handleLikeClick = async () => {
      await handleLike();
    };

    return (
      <div className='flex gap-3 p-4 border-b border-gray-100 last:border-b-0'>
        <Avatar className='h-8 w-8 ring-2 ring-gray-100'>
          <AvatarImage
            src={comment.author?.avatar}
            alt={comment.author?.name || 'Unknown'}
          />
          <AvatarFallback className='bg-gradient-to-br from-blue-500 to-blue-600 text-white text-xs font-semibold'>
            {comment.author?.name
              ?.split(' ')
              .map((n) => n[0])
              .join('') || 'U'}
          </AvatarFallback>
        </Avatar>

        <div className='flex-1 min-w-0'>
          <div className='flex items-center gap-2 mb-1'>
            <h4 className='font-semibold text-gray-900 text-sm'>
              {comment.author?.name || 'Unknown User'}
            </h4>
            <span className='text-xs text-gray-500'>•</span>
            <span className='text-xs text-gray-500'>
              {formatTimeAgo(comment.created_at)}
            </span>
            {comment.author?.role && (
              <Badge variant='secondary' className='text-xs px-2 py-0.5'>
                {comment.author.role}
              </Badge>
            )}
            {comment.author?.country && (
              <div className='flex items-center gap-1'>
                <CountryFlag
                  code={getCountryCode(comment.author.country)}
                  size={10}
                  className='rounded-sm'
                />
                <span className='text-xs text-gray-500'>
                  {comment.author.country}
                </span>
              </div>
            )}
          </div>

          <p className='text-sm text-gray-900 leading-relaxed mb-2'>
            {comment.content}
          </p>

          <div className='flex items-center gap-4'>
            <Button
              variant='ghost'
              size='sm'
              onClick={handleLikeClick}
              disabled={likingComment}
              className={`text-xs hover:text-blue-600 hover:bg-blue-50 p-1 h-auto ${
                comment.is_liked ? 'text-blue-600 bg-blue-50' : ''
              }`}
            >
              <ThumbsUp
                className={`h-3 w-3 mr-1 ${
                  comment.is_liked ? 'fill-current' : ''
                }`}
              />
              {comment.like_count}
            </Button>

            <Button
              variant='ghost'
              size='sm'
              onClick={() => setReplyingTo(comment.id)}
              className='text-xs hover:text-blue-600 hover:bg-blue-50 p-1 h-auto'
            >
              <Reply className='h-3 w-3 mr-1' />
              Reply
            </Button>

            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  variant='ghost'
                  size='sm'
                  className='text-xs text-gray-500 hover:text-gray-700 hover:bg-gray-100 p-1 h-auto'
                >
                  <MoreHorizontal className='h-3 w-3' />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align='end'>
                <DropdownMenuItem>
                  <Edit className='h-3 w-3 mr-2' />
                  Edit Comment
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <Trash2 className='h-3 w-3 mr-2' />
                  Delete Comment
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem>
                  <Flag className='h-3 w-3 mr-2' />
                  Report Comment
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
      </div>
    );
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className='max-w-2xl max-h-[80vh] flex flex-col'>
        <DialogHeader>
          <DialogTitle>
            Comments {postAuthorName && `on ${postAuthorName}'s post`}
          </DialogTitle>
        </DialogHeader>

        <div className='flex-1 overflow-hidden flex flex-col'>
          {/* Comments List */}
          <div className='flex-1 overflow-y-auto'>
            {commentsLoading ? (
              <div className='flex items-center justify-center py-8'>
                <div className='animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600'></div>
              </div>
            ) : comments.length === 0 ? (
              <div className='text-center py-8 text-gray-500'>
                <p>No comments yet. Be the first to comment!</p>
              </div>
            ) : (
              <div className='space-y-0'>
                {comments.map((comment) => (
                  <CommentItem key={comment.id} comment={comment} />
                ))}

                {commentsHasMore && (
                  <div className='p-4 text-center'>
                    <Button
                      variant='outline'
                      size='sm'
                      onClick={loadMoreComments}
                      disabled={loading}
                    >
                      Load More Comments
                    </Button>
                  </div>
                )}
              </div>
            )}
          </div>

          {/* Comment Input */}
          <div className='border-t border-gray-200 p-4'>
            {replyingTo && (
              <div className='mb-3 p-2 bg-blue-50 rounded-lg'>
                <p className='text-sm text-blue-800'>Replying to comment...</p>
                <Button
                  variant='ghost'
                  size='sm'
                  onClick={() => setReplyingTo(null)}
                  className='text-xs text-blue-600 hover:text-blue-800 p-0 h-auto'
                >
                  Cancel
                </Button>
              </div>
            )}

            <div className='flex gap-3'>
              <Textarea
                value={newComment}
                onChange={(e) => setNewComment(e.target.value)}
                onKeyDown={handleKeyPress}
                placeholder='Write a comment...'
                className='flex-1 min-h-[80px] resize-none'
                maxLength={500}
              />
              <Button
                onClick={handleSubmitComment}
                disabled={!newComment.trim() || creatingComment}
                className='self-end'
              >
                <Send className='h-4 w-4' />
              </Button>
            </div>

            <div className='flex justify-between items-center mt-2 text-xs text-gray-500'>
              <span>Press Ctrl+Enter to post</span>
              <span>{newComment.length}/500</span>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};
