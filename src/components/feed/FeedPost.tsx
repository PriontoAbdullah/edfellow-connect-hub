// Feed Post Component
// This component displays individual posts in the feed

import React, { useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { useToast } from '@/hooks/use-toast';
import { CountryFlag } from '@/components/ui/CountryFlag';
import { getCountryCode } from '@/lib/countries';
import {
  Heart,
  MessageSquare,
  Share2,
  Bookmark,
  MoreHorizontal,
  ThumbsUp,
  Send,
  ExternalLink,
  Flag,
  Edit,
  Trash2,
  Pin,
  Star,
} from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import type { PostWithAuthor } from '@/types/feed';
import { usePostInteractions } from '@/hooks/useFeed';
import { formatDistanceToNow } from 'date-fns';
import { CommentModal } from '@/components/modals/CommentModal';
import { ShareModal } from '@/components/modals/ShareModal';

interface FeedPostProps {
  post: PostWithAuthor;
  onComment?: (postId: string) => void;
  onEdit?: (post: PostWithAuthor) => void;
  onDelete?: (postId: string) => void;
  onCommentCountUpdate?: (postId: string, newCount: number) => void;
  showActions?: boolean;
}

export const FeedPost: React.FC<FeedPostProps> = ({
  post,
  onComment,
  onEdit,
  onDelete,
  onCommentCountUpdate,
  showActions = true,
}) => {
  const { toast } = useToast();
  const { handleLike, handleSave, handleShare, loading } = usePostInteractions(
    post.id
  );
  const [isLiking, setIsLiking] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [isSharing, setIsSharing] = useState(false);
  const [showCommentModal, setShowCommentModal] = useState(false);
  const [showShareModal, setShowShareModal] = useState(false);

  const handleLikeClick = async () => {
    if (isLiking) return;
    setIsLiking(true);

    try {
      await handleLike();
    } finally {
      setIsLiking(false);
    }
  };

  const handleSaveClick = async () => {
    if (isSaving) return;
    setIsSaving(true);

    try {
      await handleSave();
      toast({
        title: post.is_saved ? 'Post unsaved' : 'Post saved',
        description: post.is_saved
          ? 'Post removed from your saved items'
          : 'Post added to your saved items',
      });
    } finally {
      setIsSaving(false);
    }
  };

  const handleShareClick = async () => {
    setShowShareModal(true);
  };

  const handleCommentClick = () => {
    setShowCommentModal(true);
    onComment?.(post.id);
  };

  const handleCommentAdded = () => {
    // Update the comment count in the parent component
    onCommentCountUpdate?.(post.id, post.comment_count + 1);
  };

  const getPostTypeIcon = (postType: string) => {
    switch (postType) {
      case 'media':
        return '🖼️';
      case 'article':
        return '📄';
      case 'event':
        return '📅';
      case 'poll':
        return '📊';
      default:
        return '💬';
    }
  };

  const getPostTypeColor = (postType: string) => {
    switch (postType) {
      case 'media':
        return 'bg-blue-100 text-blue-800';
      case 'article':
        return 'bg-green-100 text-green-800';
      case 'event':
        return 'bg-purple-100 text-purple-800';
      case 'poll':
        return 'bg-orange-100 text-orange-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const formatTimeAgo = (dateString: string) => {
    try {
      return formatDistanceToNow(new Date(dateString), { addSuffix: true });
    } catch {
      return 'Unknown time';
    }
  };

  return (
    <Card className='bg-white border border-gray-200 shadow-sm rounded-xl overflow-hidden hover:shadow-md transition-shadow duration-200'>
      <CardContent className='p-6'>
        {/* Post Header */}
        <div className='flex items-start gap-4 mb-4'>
          <Avatar className='h-12 w-12 ring-2 ring-gray-100'>
            <AvatarImage
              src={post.author?.avatar || undefined}
              alt={post.author?.name || 'Unknown'}
            />
            <AvatarFallback className='bg-gradient-to-br from-blue-500 to-blue-600 text-white font-semibold'>
              {post.author?.name
                ?.split(' ')
                .map((n) => n[0])
                .join('') || 'U'}
            </AvatarFallback>
          </Avatar>
          <div className='flex-1'>
            <div className='flex items-center gap-2 mb-2'>
              <h4 className='font-semibold text-gray-900 text-base'>
                {post.author?.name || 'Unknown User'}
              </h4>
              <span className='text-sm text-gray-500'>•</span>
              <span className='text-sm text-gray-500'>
                {formatTimeAgo(post.created_at)}
              </span>
              {post.is_pinned && (
                <Badge className='text-xs bg-yellow-100 text-yellow-800'>
                  <Pin className='h-3 w-3 mr-1' />
                  Pinned
                </Badge>
              )}
              {post.is_highlighted && (
                <Badge className='text-xs bg-purple-100 text-purple-800'>
                  <Star className='h-3 w-3 mr-1' />
                  Featured
                </Badge>
              )}
            </div>
            <div className='flex items-center gap-2'>
              {post.author?.country && (
                <div className='flex items-center gap-1'>
                  <CountryFlag
                    code={getCountryCode(post.author.country)}
                    size={12}
                    className='rounded-sm'
                  />
                  <span className='text-xs text-gray-500'>
                    {post.author.country}
                  </span>
                </div>
              )}
              {post.author?.university && (
                <span className='text-sm text-gray-600'>
                  {post.author.university}
                </span>
              )}
            </div>
          </div>
          {showActions && (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  variant='ghost'
                  size='sm'
                  className='text-gray-500 hover:text-gray-700 hover:bg-gray-100 rounded-full p-2'
                >
                  <MoreHorizontal className='h-4 w-4' />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align='end'>
                <DropdownMenuItem onClick={() => onEdit?.(post)}>
                  <Edit className='h-4 w-4 mr-2' />
                  Edit Post
                </DropdownMenuItem>
                <DropdownMenuItem onClick={handleSaveClick}>
                  <Bookmark className='h-4 w-4 mr-2' />
                  {post.is_saved ? 'Unsave' : 'Save'} Post
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={() => onDelete?.(post.id)}>
                  <Trash2 className='h-4 w-4 mr-2' />
                  Delete Post
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <Flag className='h-4 w-4 mr-2' />
                  Report Post
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          )}
        </div>

        {/* Post Content */}
        <div className='mb-6'>
          <p className='text-base text-gray-900 leading-relaxed whitespace-pre-wrap'>
            {post.content}
          </p>

          {/* Media Content */}
          {post.media_urls && post.media_urls.length > 0 && (
            <div className='mt-4 grid grid-cols-1 md:grid-cols-2 gap-2'>
              {post.media_urls.map((url, index) => (
                <div key={index} className='relative'>
                  <img
                    src={url}
                    alt={`Media ${index + 1}`}
                    className='w-full h-48 object-cover rounded-lg'
                  />
                </div>
              ))}
            </div>
          )}

          {/* Article Data */}
          {post.article_data && (
            <div className='mt-4 p-4 bg-gray-50 rounded-lg'>
              <h3 className='font-semibold text-gray-900 mb-2'>
                {post.article_data.title}
              </h3>
              {post.article_data.excerpt && (
                <p className='text-sm text-gray-600 mb-2'>
                  {post.article_data.excerpt}
                </p>
              )}
              <Button variant='outline' size='sm'>
                <ExternalLink className='h-4 w-4 mr-2' />
                Read Article
              </Button>
            </div>
          )}

          {/* Event Data */}
          {post.event_data && (
            <div className='mt-4 p-4 bg-blue-50 rounded-lg'>
              <h3 className='font-semibold text-gray-900 mb-2'>
                {post.event_data.title}
              </h3>
              <p className='text-sm text-gray-600 mb-2'>
                {post.event_data.description}
              </p>
              <div className='flex items-center gap-4 text-sm text-gray-600'>
                <span>
                  📅 {new Date(post.event_data.start_date).toLocaleDateString()}
                </span>
                {post.event_data.location && (
                  <span>📍 {post.event_data.location}</span>
                )}
              </div>
            </div>
          )}

          {/* Poll Data */}
          {post.poll_data && (
            <div className='mt-4 p-4 bg-orange-50 rounded-lg'>
              <h3 className='font-semibold text-gray-900 mb-3'>
                {post.poll_data.question}
              </h3>
              <div className='space-y-2'>
                {post.poll_data.options.map((option, index) => (
                  <div
                    key={index}
                    className='flex items-center justify-between p-2 bg-white rounded border'
                  >
                    <span className='text-sm'>{option.text}</span>
                    <span className='text-xs text-gray-500'>
                      {option.vote_count} votes
                    </span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Tags */}
          {post.tags && post.tags.length > 0 && (
            <div className='mt-4 flex flex-wrap gap-2'>
              {post.tags.map((tag, index) => (
                <Badge key={index} variant='secondary' className='text-xs'>
                  #{tag}
                </Badge>
              ))}
            </div>
          )}
        </div>

        {/* Post Actions */}
        <div className='flex items-center justify-between text-sm text-gray-600 pt-4 border-t border-gray-100'>
          <div className='flex items-center gap-8'>
            <Button
              variant='ghost'
              size='sm'
              onClick={handleLikeClick}
              disabled={isLiking}
              className={`hover:text-blue-600 hover:bg-blue-50 rounded-full px-4 py-2 transition-all duration-200 ${
                post.is_liked ? 'text-blue-600 bg-blue-50' : ''
              }`}
            >
              <ThumbsUp
                className={`h-4 w-4 mr-2 ${
                  post.is_liked ? 'fill-current' : ''
                }`}
              />
              <span className='font-medium'>{post.like_count}</span>
            </Button>
            <Button
              variant='ghost'
              size='sm'
              onClick={handleCommentClick}
              className='hover:text-blue-600 hover:bg-blue-50 rounded-full px-4 py-2 transition-all duration-200'
            >
              <MessageSquare className='h-4 w-4 mr-2' />
              <span className='font-medium'>{post.comment_count}</span>
            </Button>
            <Button
              variant='ghost'
              size='sm'
              onClick={handleShareClick}
              disabled={isSharing}
              className='hover:text-blue-600 hover:bg-blue-50 rounded-full px-4 py-2 transition-all duration-200'
            >
              <Share2 className='h-4 w-4 mr-2' />
              <span className='font-medium'>{post.share_count}</span>
            </Button>
          </div>
          <div className='flex items-center gap-2'>
            <Button
              variant='ghost'
              size='sm'
              onClick={handleSaveClick}
              disabled={isSaving}
              className={`hover:text-blue-600 hover:bg-blue-50 rounded-full p-2 transition-all duration-200 ${
                post.is_saved ? 'text-blue-600 bg-blue-50' : ''
              }`}
            >
              <Bookmark
                className={`h-4 w-4 ${post.is_saved ? 'fill-current' : ''}`}
              />
            </Button>
            {/* <Button
              variant='ghost'
              size='sm'
              className='hover:text-blue-600 hover:bg-blue-50 rounded-full p-2 transition-all duration-200'
            >
              <Send className='h-4 w-4' />
            </Button> */}
          </div>
        </div>
      </CardContent>

      {/* Comment Modal */}
      <CommentModal
        postId={post.id}
        isOpen={showCommentModal}
        onClose={() => setShowCommentModal(false)}
        postAuthorName={post.author?.name}
        onCommentAdded={handleCommentAdded}
      />

      {/* Share Modal */}
      <ShareModal
        post={post}
        isOpen={showShareModal}
        onClose={() => setShowShareModal(false)}
      />
    </Card>
  );
};
