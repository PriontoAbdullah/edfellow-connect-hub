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
        return <Image className='w-3 h-3' />;
      case 'video':
        return <Video className='w-3 h-3' />;
      case 'link':
        return <Link className='w-3 h-3' />;
      case 'poll':
        return <BarChart3 className='w-3 h-3' />;
      default:
        return <MessageSquare className='w-3 h-3' />;
    }
  };

  const getPostTypeVariant = (type: string) => {
    switch (type) {
      case 'image':
        return 'default';
      case 'video':
        return 'destructive';
      case 'link':
        return 'secondary';
      case 'poll':
        return 'outline';
      default:
        return 'secondary';
    }
  };

  const getPostTypeColor = (type: string) => {
    switch (type) {
      case 'image':
        return 'bg-green-50 text-green-700 border-green-200 hover:bg-green-100';
      case 'video':
        return 'bg-red-50 text-red-700 border-red-200 hover:bg-red-100';
      case 'link':
        return 'bg-blue-50 text-blue-700 border-blue-200 hover:bg-blue-100';
      case 'poll':
        return 'bg-purple-50 text-purple-700 border-purple-200 hover:bg-purple-100';
      default:
        return 'bg-gray-50 text-gray-700 border-gray-200 hover:bg-gray-100';
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
        <div className='flex items-start justify-between mb-4'>
          <div className='flex items-center space-x-3 flex-1'>
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
                <h4 className='font-medium text-gray-900'>
                  {post.author.name}
                </h4>
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
          </div>

          {/* <div
            className={`${getPostTypeColor(
              post.post_type
            )} inline-flex items-center gap-1 rounded-full border px-2.5 py-0.5 text-xs font-medium flex-shrink-0`}
          >
            {getPostTypeIcon(post.post_type)}
            <span className='capitalize'>{post.post_type}</span>
          </div> */}
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

  // Fallback dummy data for when API fails
  const fallbackPosts = [
    {
      id: '1',
      title: 'How to Prepare for Graduate School Applications',
      content:
        'After successfully applying to 5 top universities, I want to share my experience and tips for preparing strong graduate school applications...',
      post_type: 'text' as const,
      visibility: 'public' as const,
      created_at: '2024-01-15T10:30:00Z',
      likes_count: 45,
      comments_count: 12,
      tags: ['Graduate School', 'Applications', 'Tips'],
      author: {
        name: 'Sarah Chen',
        avatar:
          'https://images.unsplash.com/photo-1534528741775-53994a69daeb?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=400&q=80',
        role: 'student',
        country: 'USA',
      },
    },
    {
      id: '2',
      title: 'Research Opportunities in AI and Machine Learning',
      content:
        'Our lab is looking for motivated students to join our research projects in AI and machine learning. We have several open positions...',
      post_type: 'link' as const,
      visibility: 'public' as const,
      created_at: '2024-01-15T08:15:00Z',
      likes_count: 78,
      comments_count: 23,
      tags: ['Research', 'AI', 'Machine Learning'],
      author: {
        name: 'Dr. Emily Watson',
        avatar:
          'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=400&q=80',
        role: 'professor',
        country: 'USA',
      },
    },
    {
      id: '3',
      title: 'Study Abroad Experience in Japan',
      content:
        'Just finished my semester abroad at the University of Tokyo. Here are some insights and tips for anyone considering studying in Japan...',
      post_type: 'image' as const,
      visibility: 'public' as const,
      created_at: '2024-01-14T16:45:00Z',
      likes_count: 92,
      comments_count: 18,
      tags: ['Study Abroad', 'Japan', 'Experience'],
      author: {
        name: 'Maria Gonzalez',
        avatar:
          'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=400&q=80',
        role: 'student',
        country: 'Spain',
      },
    },
    {
      id: '4',
      title: 'Scholarship Opportunities for International Students',
      content:
        'As an international student, finding funding can be challenging. Here are some scholarship opportunities I discovered...',
      post_type: 'text' as const,
      visibility: 'public' as const,
      created_at: '2024-01-14T12:20:00Z',
      likes_count: 156,
      comments_count: 34,
      tags: ['Scholarships', 'International Students', 'Funding'],
      author: {
        name: 'Ahmed Hassan',
        avatar:
          'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=400&q=80',
        role: 'student',
        country: 'Egypt',
      },
    },
    {
      id: '5',
      title: 'New Research Publication: Climate Change Impact',
      content:
        'Excited to share our latest research on climate change impacts on coastal communities. The study reveals important findings...',
      post_type: 'link' as const,
      visibility: 'public' as const,
      created_at: '2024-01-14T09:30:00Z',
      likes_count: 67,
      comments_count: 15,
      tags: ['Research', 'Climate Change', 'Publication'],
      author: {
        name: 'Prof. James Wilson',
        avatar:
          'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=400&q=80',
        role: 'professor',
        country: 'UK',
      },
    },
    {
      id: '6',
      title: 'Career Fair Tips for Engineering Students',
      content:
        'Attended the engineering career fair yesterday. Here are some tips for making the most of career fairs and networking events...',
      post_type: 'text' as const,
      visibility: 'public' as const,
      created_at: '2024-01-13T14:45:00Z',
      likes_count: 89,
      comments_count: 21,
      tags: ['Career', 'Engineering', 'Networking'],
      author: {
        name: 'David Kim',
        avatar:
          'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=400&q=80',
        role: 'student',
        country: 'South Korea',
      },
    },
    {
      id: '7',
      title: 'Mental Health Resources for Students',
      content:
        'Mental health is crucial for academic success. Here are some resources and strategies that have helped me during stressful periods...',
      post_type: 'text' as const,
      visibility: 'public' as const,
      created_at: '2024-01-13T11:15:00Z',
      likes_count: 134,
      comments_count: 28,
      tags: ['Mental Health', 'Wellness', 'Student Life'],
      author: {
        name: 'Lisa Thompson',
        avatar:
          'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=400&q=80',
        role: 'student',
        country: 'Canada',
      },
    },
    {
      id: '8',
      title: 'Internship Experience at Google',
      content:
        "Just completed my summer internship at Google. Here's what I learned and some advice for future applicants...",
      post_type: 'image' as const,
      visibility: 'public' as const,
      created_at: '2024-01-12T16:30:00Z',
      likes_count: 203,
      comments_count: 45,
      tags: ['Internship', 'Google', 'Tech'],
      author: {
        name: 'Alex Johnson',
        avatar:
          'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=400&q=80',
        role: 'student',
        country: 'USA',
      },
    },
  ];

  // Use fallback data if there's an error or no data
  const displayPosts = fallbackPosts; // Temporarily force fallback data to test

  // Remove the error return since we now show fallback data

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
        ) : displayPosts.length === 0 ? (
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
            {displayPosts.map((post) => (
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
