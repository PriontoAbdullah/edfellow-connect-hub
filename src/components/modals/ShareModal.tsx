// Share Modal Component
// This component provides sharing options for posts including URL copying and social media sharing

import React, { useState, useEffect } from 'react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { useToast } from '@/hooks/use-toast';
import { usePostInteractions } from '@/hooks/useFeed';
import {
  Copy,
  Share2,
  Facebook,
  Twitter,
  Linkedin,
  Mail,
  Link,
  Check,
  ExternalLink,
} from 'lucide-react';
import type { PostWithAuthor } from '@/types/feed';

interface ShareModalProps {
  post: PostWithAuthor;
  isOpen: boolean;
  onClose: () => void;
}

export const ShareModal: React.FC<ShareModalProps> = ({
  post,
  isOpen,
  onClose,
}) => {
  const { toast } = useToast();
  const { handleShare } = usePostInteractions(post.id);
  const [postUrl, setPostUrl] = useState('');
  const [customMessage, setCustomMessage] = useState('');
  const [copied, setCopied] = useState(false);
  const [sharing, setSharing] = useState(false);

  useEffect(() => {
    if (isOpen) {
      // Generate the post URL
      const baseUrl = window.location.origin;
      const postUrl = `${baseUrl}/post/${post.id}`;
      setPostUrl(postUrl);

      // Set default message
      setCustomMessage(
        `Check out this post by ${post.author?.name || 'Unknown User'}:`
      );
    }
  }, [isOpen, post.id, post.author?.name]);

  const handleCopyUrl = async () => {
    try {
      await navigator.clipboard.writeText(postUrl);
      setCopied(true);
      toast({
        title: 'URL copied',
        description: 'Post URL has been copied to clipboard',
      });
      setTimeout(() => setCopied(false), 2000);
    } catch (error) {
      toast({
        title: 'Error',
        description: 'Failed to copy URL. Please try again.',
        variant: 'destructive',
      });
    }
  };

  const handleShareToPlatform = async (platform: string) => {
    setSharing(true);

    try {
      const shareText = `${customMessage}\n\n${post.content.substring(0, 100)}${
        post.content.length > 100 ? '...' : ''
      }\n\n${postUrl}`;

      let shareUrl = '';

      switch (platform) {
        case 'twitter':
          shareUrl = `https://twitter.com/intent/tweet?text=${encodeURIComponent(
            shareText
          )}`;
          break;
        case 'facebook':
          shareUrl = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(
            postUrl
          )}`;
          break;
        case 'linkedin':
          shareUrl = `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(
            postUrl
          )}`;
          break;
        case 'email':
          shareUrl = `mailto:?subject=${encodeURIComponent(
            `Check out this post by ${post.author?.name || 'Unknown User'}`
          )}&body=${encodeURIComponent(shareText)}`;
          break;
        default:
          return;
      }

      // Open the sharing URL
      window.open(shareUrl, '_blank', 'width=600,height=400');

      // Record the share in our system
      await handleShare(customMessage);

      toast({
        title: 'Shared successfully',
        description: `Post shared to ${platform}`,
      });

      onClose();
    } catch (error) {
      toast({
        title: 'Error',
        description: 'Failed to share post. Please try again.',
        variant: 'destructive',
      });
    } finally {
      setSharing(false);
    }
  };

  const handleNativeShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: `Post by ${post.author?.name || 'Unknown User'}`,
          text: customMessage,
          url: postUrl,
        });

        // Record the share in our system
        await handleShare(customMessage);

        toast({
          title: 'Shared successfully',
          description: 'Post shared using native sharing',
        });

        onClose();
      } catch (error) {
        if (error.name !== 'AbortError') {
          toast({
            title: 'Error',
            description: 'Failed to share post. Please try again.',
            variant: 'destructive',
          });
        }
      }
    }
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

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className='max-w-2xl'>
        <DialogHeader>
          <DialogTitle className='flex items-center gap-2'>
            <Share2 className='h-5 w-5' />
            Share Post
          </DialogTitle>
        </DialogHeader>

        <div className='space-y-6'>
          {/* Post Preview */}
          <div className='p-4 bg-gray-50 rounded-lg'>
            <div className='flex items-center gap-2 mb-2'>
              <Badge
                className={`text-xs px-2 py-1 rounded-full ${getPostTypeColor(
                  post.post_type
                )} font-medium`}
              >
                {getPostTypeIcon(post.post_type)} {post.post_type}
              </Badge>
              <span className='text-sm text-gray-600'>
                by {post.author?.name || 'Unknown User'}
              </span>
            </div>
            <p className='text-sm text-gray-900 line-clamp-3'>{post.content}</p>
          </div>

          {/* Custom Message */}
          <div className='space-y-2'>
            <label className='text-sm font-medium text-gray-700'>
              Add a message (optional)
            </label>
            <Textarea
              value={customMessage}
              onChange={(e) => setCustomMessage(e.target.value)}
              placeholder='Add a message to your share...'
              className='min-h-[80px] resize-none'
              maxLength={200}
            />
            <div className='flex justify-between items-center text-xs text-gray-500'>
              <span>This message will be included with your share</span>
              <span>{customMessage.length}/200</span>
            </div>
          </div>

          {/* URL Copy */}
          <div className='space-y-2'>
            <label className='text-sm font-medium text-gray-700'>
              Post URL
            </label>
            <div className='flex gap-2'>
              <Input value={postUrl} readOnly className='flex-1' />
              <Button
                onClick={handleCopyUrl}
                variant='outline'
                size='sm'
                className='px-3'
              >
                {copied ? (
                  <Check className='h-4 w-4 text-green-600' />
                ) : (
                  <Copy className='h-4 w-4' />
                )}
              </Button>
            </div>
          </div>

          {/* Social Media Sharing */}
          <div className='space-y-3'>
            <label className='text-sm font-medium text-gray-700'>
              Share to social media
            </label>
            <div className='grid grid-cols-2 gap-3'>
              <Button
                onClick={() => handleShareToPlatform('twitter')}
                disabled={sharing}
                variant='outline'
                className='flex items-center gap-2'
              >
                <Twitter className='h-4 w-4 text-blue-400' />
                Twitter
              </Button>

              <Button
                onClick={() => handleShareToPlatform('facebook')}
                disabled={sharing}
                variant='outline'
                className='flex items-center gap-2'
              >
                <Facebook className='h-4 w-4 text-blue-600' />
                Facebook
              </Button>

              <Button
                onClick={() => handleShareToPlatform('linkedin')}
                disabled={sharing}
                variant='outline'
                className='flex items-center gap-2'
              >
                <Linkedin className='h-4 w-4 text-blue-700' />
                LinkedIn
              </Button>

              <Button
                onClick={() => handleShareToPlatform('email')}
                disabled={sharing}
                variant='outline'
                className='flex items-center gap-2'
              >
                <Mail className='h-4 w-4 text-gray-600' />
                Email
              </Button>
            </div>
          </div>

          {/* Native Share (if available) */}
          {navigator.share && (
            <div className='pt-4 border-t border-gray-200'>
              <Button
                onClick={handleNativeShare}
                disabled={sharing}
                className='w-full flex items-center gap-2'
              >
                <Share2 className='h-4 w-4' />
                Share via Device
              </Button>
            </div>
          )}

          {/* Actions */}
          <div className='flex justify-end gap-3 pt-4 border-t border-gray-200'>
            <Button variant='outline' onClick={onClose}>
              Cancel
            </Button>
            <Button
              onClick={handleCopyUrl}
              disabled={sharing}
              className='flex items-center gap-2'
            >
              <Link className='h-4 w-4' />
              Copy Link
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};
