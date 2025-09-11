import React from 'react';
import { Card, CardContent } from '../ui/card';
import { Badge } from '../ui/badge';
import { Button } from '../ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '../ui/avatar';
import {
  MessageSquare,
  Heart,
  Share2,
  ExternalLink,
  RefreshCw,
  Image,
  Video,
  Link,
  BarChart3,
} from 'lucide-react';
import { useLandingPage } from '../../hooks/useLandingPage';
import { Skeleton } from '../ui/skeleton';
import { CountryFlag } from '../ui/CountryFlag';
import type { RecentPost } from '../../lib/api/landing';

interface PostCardProps {
  post: RecentPost;
  loading?: boolean;
}

const PostCard: React.FC<PostCardProps> = ({ post, loading = false }) => {
  if (loading) {
    return (
      <Card className='transition-all duration-300 hover:shadow-lg'>
        <CardContent className='p-6'>
          <div className='flex items-center space-x-3 mb-4'>
            <Skeleton className='w-10 h-10 rounded-full' />
            <div className='flex-1'>
              <Skeleton className='h-4 w-32 mb-1' />
              <Skeleton className='h-3 w-24' />
            </div>
          </div>
          <Skeleton className='h-5 w-3/4 mb-2' />
          <Skeleton className='h-4 w-full mb-2' />
          <Skeleton className='h-4 w-2/3 mb-4' />
          <div className='flex items-center justify-between'>
            <div className='flex items-center space-x-4'>
              <Skeleton className='h-4 w-16' />
              <Skeleton className='h-4 w-16' />
            </div>
            <Skeleton className='h-8 w-20' />
          </div>
        </CardContent>
      </Card>
    );
  }

  const getPostTypeIcon = (type: string) => {
    switch (type) {
      case 'image':
        return <Image className='w-4 h-4' />;
      case 'video':
        return <Video className='w-4 h-4' />;
      case 'link':
        return <Link className='w-4 h-4' />;
      case 'poll':
        return <BarChart3 className='w-4 h-4' />;
      default:
        return <MessageSquare className='w-4 h-4' />;
    }
  };

  const getPostTypeColor = (type: string) => {
    switch (type) {
      case 'image':
        return 'bg-green-100 text-green-800';
      case 'video':
        return 'bg-red-100 text-red-800';
      case 'link':
        return 'bg-blue-100 text-blue-800';
      case 'poll':
        return 'bg-purple-100 text-purple-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const formatTimeAgo = (dateString: string) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffInSeconds = Math.floor((now.getTime() - date.getTime()) / 1000);

    if (diffInSeconds < 60) return 'Just now';
    if (diffInSeconds < 3600) return `${Math.floor(diffInSeconds / 60)}m ago`;
    if (diffInSeconds < 86400)
      return `${Math.floor(diffInSeconds / 3600)}h ago`;
    if (diffInSeconds < 2592000)
      return `${Math.floor(diffInSeconds / 86400)}d ago`;
    return date.toLocaleDateString();
  };

  return (
    <Card className='transition-all duration-300 hover:shadow-lg hover:scale-105 group'>
      <CardContent className='p-6'>
        {/* Author Info */}
        <div className='flex items-center space-x-3 mb-4'>
          <Avatar className='w-10 h-10'>
            <AvatarImage src={post.author.avatar} alt={post.author.name} />
            <AvatarFallback>
              {post.author.name
                .split(' ')
                .map((n) => n[0])
                .join('')
                .toUpperCase()}
            </AvatarFallback>
          </Avatar>

          <div className='flex-1'>
            <div className='flex items-center space-x-2'>
              <h4 className='font-medium text-gray-900'>{post.author.name}</h4>
              <CountryFlag code={post.author.country} size={16} />
            </div>
            <div className='flex items-center space-x-2 text-sm text-gray-500'>
              <Badge variant='outline' className='text-xs'>
                {post.author.role}
              </Badge>
              <span>•</span>
              <span>{formatTimeAgo(post.created_at)}</span>
            </div>
          </div>

          <Badge
            className={`${getPostTypeColor(
              post.post_type
            )} flex items-center space-x-1`}
          >
            {getPostTypeIcon(post.post_type)}
            <span className='capitalize'>{post.post_type}</span>
          </Badge>
        </div>

        {/* Post Content */}
        <div className='mb-4'>
          <h3 className='font-semibold text-gray-900 mb-2 line-clamp-2'>
            {post.title}
          </h3>
          <p className='text-gray-600 text-sm line-clamp-3'>{post.content}</p>
        </div>

        {/* Tags */}
        {post.tags.length > 0 && (
          <div className='flex flex-wrap gap-1 mb-4'>
            {post.tags.slice(0, 3).map((tag) => (
              <Badge key={tag} variant='secondary' className='text-xs'>
                #{tag}
              </Badge>
            ))}
            {post.tags.length > 3 && (
              <Badge variant='secondary' className='text-xs'>
                +{post.tags.length - 3} more
              </Badge>
            )}
          </div>
        )}

        {/* Engagement Stats */}
        <div className='flex items-center justify-between'>
          <div className='flex items-center space-x-4 text-sm text-gray-500'>
            <div className='flex items-center space-x-1'>
              <Heart className='w-4 h-4' />
              <span>{post.likes_count}</span>
            </div>
            <div className='flex items-center space-x-1'>
              <MessageSquare className='w-4 h-4' />
              <span>{post.comments_count}</span>
            </div>
          </div>

          <Button
            variant='ghost'
            size='sm'
            className='opacity-0 group-hover:opacity-100 transition-opacity'
          >
            <ExternalLink className='w-4 h-4' />
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export const RecentPosts: React.FC = () => {
  const { data, loading, postsLoading, error, postsError, refreshPosts } =
    useLandingPage();

  const posts = data?.recentPosts || [];

  if (error || postsError) {
    return (
      <section className='py-16 bg-gray-50'>
        <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8'>
          <div className='text-center'>
            <h2 className='text-3xl font-bold text-gray-900 mb-4'>
              Recent Activity
            </h2>
            <div className='bg-red-50 border border-red-200 rounded-lg p-6'>
              <p className='text-red-600 mb-4'>
                {error || postsError || 'Failed to load recent posts'}
              </p>
              <Button onClick={refreshPosts} variant='outline' size='sm'>
                <RefreshCw className='w-4 h-4 mr-2' />
                Try Again
              </Button>
            </div>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className='py-16 bg-gray-50'>
      <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8'>
        {/* Header */}
        <div className='text-center mb-12'>
          <h2 className='text-3xl font-bold text-gray-900 mb-4'>
            Recent Activity
          </h2>
          <p className='text-lg text-gray-600 max-w-2xl mx-auto'>
            See what's happening in our community. Discover insights,
            opportunities, and discussions from students and professors
            worldwide.
          </p>
        </div>

        {/* Posts Grid */}
        {loading || postsLoading ? (
          <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6'>
            {Array.from({ length: 8 }).map((_, index) => (
              <PostCard key={index} post={{} as RecentPost} loading />
            ))}
          </div>
        ) : posts.length === 0 ? (
          <div className='text-center py-12'>
            <MessageSquare className='w-16 h-16 text-gray-400 mx-auto mb-4' />
            <h3 className='text-lg font-medium text-gray-900 mb-2'>
              No Recent Posts
            </h3>
            <p className='text-gray-600'>
              Be the first to share something with the community!
            </p>
          </div>
        ) : (
          <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6'>
            {posts.map((post) => (
              <PostCard key={post.id} post={post} />
            ))}
          </div>
        )}

        {/* View All Button */}
        <div className='text-center mt-12'>
          <Button size='lg' variant='outline'>
            View All Posts
            <ExternalLink className='w-4 h-4 ml-2' />
          </Button>
        </div>
      </div>
    </section>
  );
};
