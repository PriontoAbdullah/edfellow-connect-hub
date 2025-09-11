import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Textarea } from '@/components/ui/textarea';
import {
  MessageSquare,
  Pin,
  Lock,
  Plus,
  Search,
  Filter,
  MoreHorizontal,
  ThumbsUp,
  Reply,
  Eye,
  Calendar,
  Tag,
  AlertCircle,
  CheckCircle,
  BookOpen,
  FileText,
  HelpCircle,
  BarChart3,
} from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';
import { useToast } from '@/hooks/use-toast';
import {
  getGroupPosts,
  createGroupPost,
  getGroupPostComments,
  createGroupPostComment,
  type GroupPost,
  type GroupPostComment,
} from '@/lib/api/groups';

interface GroupPostsProps {
  groupId: string;
  compact?: boolean;
}

export const GroupPosts: React.FC<GroupPostsProps> = ({
  groupId,
  compact = false,
}) => {
  const { user } = useAuth();
  const { toast } = useToast();
  const [posts, setPosts] = useState<GroupPost[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [postTypeFilter, setPostTypeFilter] = useState<string>('all');
  const [showCreateForm, setShowCreateForm] = useState(false);
  const [selectedPost, setSelectedPost] = useState<GroupPost | null>(null);
  const [comments, setComments] = useState<GroupPostComment[]>([]);
  const [newPost, setNewPost] = useState({
    title: '',
    content: '',
    post_type: 'discussion' as const,
    tags: [] as string[],
  });
  const [newComment, setNewComment] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    fetchPosts();
  }, [groupId, postTypeFilter, searchTerm]);

  const fetchPosts = async () => {
    setLoading(true);
    try {
      const filters: any = {};

      if (searchTerm) {
        filters.search = searchTerm;
      }

      if (postTypeFilter !== 'all') {
        filters.post_type = postTypeFilter;
      }

      const { data, error } = await getGroupPosts(groupId, filters);

      if (error) {
        toast({
          title: 'Error',
          description: error,
          variant: 'destructive',
        });
        return;
      }

      setPosts(data || []);
    } catch (error) {
      console.error('Error fetching posts:', error);
    } finally {
      setLoading(false);
    }
  };

  const fetchComments = async (postId: string) => {
    try {
      const { data, error } = await getGroupPostComments(postId);

      if (error) {
        console.error('Error fetching comments:', error);
        return;
      }

      setComments(data || []);
    } catch (error) {
      console.error('Error fetching comments:', error);
    }
  };

  const handleCreatePost = async () => {
    if (!newPost.title.trim() || !newPost.content.trim()) {
      toast({
        title: 'Error',
        description: 'Please fill in all required fields',
        variant: 'destructive',
      });
      return;
    }

    setIsSubmitting(true);
    try {
      const { data, error } = await createGroupPost(groupId, newPost);

      if (error) {
        toast({
          title: 'Error',
          description: error,
          variant: 'destructive',
        });
        return;
      }

      toast({
        title: 'Success',
        description: 'Post created successfully!',
      });

      setNewPost({ title: '', content: '', post_type: 'discussion', tags: [] });
      setShowCreateForm(false);
      fetchPosts();
    } catch (error) {
      toast({
        title: 'Error',
        description: 'Failed to create post',
        variant: 'destructive',
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleCreateComment = async (postId: string) => {
    if (!newComment.trim()) {
      toast({
        title: 'Error',
        description: 'Please enter a comment',
        variant: 'destructive',
      });
      return;
    }

    try {
      const { data, error } = await createGroupPostComment(postId, newComment);

      if (error) {
        toast({
          title: 'Error',
          description: error,
          variant: 'destructive',
        });
        return;
      }

      setNewComment('');
      fetchComments(postId);
    } catch (error) {
      toast({
        title: 'Error',
        description: 'Failed to create comment',
        variant: 'destructive',
      });
    }
  };

  const getPostTypeIcon = (type: string) => {
    switch (type) {
      case 'discussion':
        return <MessageSquare className='w-4 h-4' />;
      case 'announcement':
        return <AlertCircle className='w-4 h-4' />;
      case 'resource':
        return <FileText className='w-4 h-4' />;
      case 'question':
        return <HelpCircle className='w-4 h-4' />;
      case 'poll':
        return <BarChart3 className='w-4 h-4' />;
      default:
        return <MessageSquare className='w-4 h-4' />;
    }
  };

  const getPostTypeColor = (type: string) => {
    switch (type) {
      case 'discussion':
        return 'bg-blue-100 text-blue-800';
      case 'announcement':
        return 'bg-red-100 text-red-800';
      case 'resource':
        return 'bg-green-100 text-green-800';
      case 'question':
        return 'bg-yellow-100 text-yellow-800';
      case 'poll':
        return 'bg-purple-100 text-purple-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  if (loading) {
    return (
      <div className='space-y-4'>
        <div className='animate-pulse'>
          <div className='h-4 bg-gray-200 rounded w-1/4 mb-4'></div>
          <div className='space-y-3'>
            {[1, 2, 3].map((i) => (
              <div key={i} className='h-32 bg-gray-200 rounded'></div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  if (compact) {
    return (
      <div className='space-y-4'>
        <div className='flex items-center justify-between'>
          <h3 className='text-sm font-medium'>Recent Posts</h3>
          <Badge variant='outline'>{posts.length}</Badge>
        </div>

        <div className='space-y-2'>
          {posts.slice(0, 3).map((post) => (
            <div key={post.id} className='p-3 border rounded-lg'>
              <div className='flex items-start gap-2 mb-2'>
                <Avatar className='w-6 h-6'>
                  <AvatarImage src={post.author?.avatar} />
                  <AvatarFallback>
                    {post.author?.display_name?.charAt(0)}
                  </AvatarFallback>
                </Avatar>
                <div className='flex-1 min-w-0'>
                  <p className='text-sm font-medium truncate'>{post.title}</p>
                  <p className='text-xs text-muted-foreground'>
                    {post.author?.display_name}
                  </p>
                </div>
                <Badge
                  className={`text-xs ${getPostTypeColor(post.post_type)}`}
                >
                  {getPostTypeIcon(post.post_type)}
                </Badge>
              </div>
              <p className='text-xs text-muted-foreground line-clamp-2'>
                {post.content}
              </p>
            </div>
          ))}
        </div>

        {posts.length > 3 && (
          <Button variant='outline' size='sm' className='w-full'>
            View All ({posts.length})
          </Button>
        )}
      </div>
    );
  }

  return (
    <div className='space-y-6'>
      {/* Header */}
      <div className='flex items-center justify-between'>
        <div>
          <h3 className='text-lg font-semibold'>Group Discussions</h3>
          <p className='text-sm text-muted-foreground'>
            {posts.length} posts in this group
          </p>
        </div>
        <Button onClick={() => setShowCreateForm(true)}>
          <Plus className='w-4 h-4 mr-2' />
          New Post
        </Button>
      </div>

      {/* Filters */}
      <div className='flex gap-4 flex-wrap'>
        <div className='relative flex-1 min-w-64'>
          <Search className='absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4' />
          <input
            type='text'
            placeholder='Search posts...'
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className='w-full pl-10 pr-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500'
          />
        </div>

        <select
          value={postTypeFilter}
          onChange={(e) => setPostTypeFilter(e.target.value)}
          className='px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500'
        >
          <option value='all'>All Types</option>
          <option value='discussion'>Discussion</option>
          <option value='announcement'>Announcement</option>
          <option value='resource'>Resource</option>
          <option value='question'>Question</option>
          <option value='poll'>Poll</option>
        </select>

        <Button variant='outline' onClick={fetchPosts}>
          <Filter className='w-4 h-4 mr-2' />
          Apply
        </Button>
      </div>

      {/* Create Post Form */}
      {showCreateForm && (
        <Card>
          <CardHeader>
            <CardTitle>Create New Post</CardTitle>
          </CardHeader>
          <CardContent className='space-y-4'>
            <div>
              <label className='block text-sm font-medium mb-1'>Title *</label>
              <input
                type='text'
                value={newPost.title}
                onChange={(e) =>
                  setNewPost((prev) => ({ ...prev, title: e.target.value }))
                }
                placeholder='Enter post title'
                className='w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500'
              />
            </div>

            <div>
              <label className='block text-sm font-medium mb-1'>Type</label>
              <select
                value={newPost.post_type}
                onChange={(e) =>
                  setNewPost((prev) => ({
                    ...prev,
                    post_type: e.target.value as any,
                  }))
                }
                className='w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500'
              >
                <option value='discussion'>Discussion</option>
                <option value='announcement'>Announcement</option>
                <option value='resource'>Resource</option>
                <option value='question'>Question</option>
                <option value='poll'>Poll</option>
              </select>
            </div>

            <div>
              <label className='block text-sm font-medium mb-1'>
                Content *
              </label>
              <Textarea
                value={newPost.content}
                onChange={(e) =>
                  setNewPost((prev) => ({ ...prev, content: e.target.value }))
                }
                placeholder='Write your post content...'
                rows={6}
              />
            </div>

            <div className='flex gap-2'>
              <Button onClick={handleCreatePost} disabled={isSubmitting}>
                {isSubmitting ? 'Creating...' : 'Create Post'}
              </Button>
              <Button
                variant='outline'
                onClick={() => setShowCreateForm(false)}
              >
                Cancel
              </Button>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Posts List */}
      {posts.length === 0 ? (
        <Card>
          <CardContent className='p-6 text-center'>
            <MessageSquare className='w-12 h-12 text-muted-foreground mx-auto mb-4' />
            <h3 className='text-lg font-medium mb-2'>No posts yet</h3>
            <p className='text-muted-foreground mb-4'>
              Be the first to start a discussion in this group
            </p>
            <Button onClick={() => setShowCreateForm(true)}>
              <Plus className='w-4 h-4 mr-2' />
              Create First Post
            </Button>
          </CardContent>
        </Card>
      ) : (
        <div className='space-y-4'>
          {posts.map((post) => (
            <Card key={post.id} className='hover:shadow-md transition-shadow'>
              <CardHeader className='pb-3'>
                <div className='flex items-start gap-3'>
                  <Avatar className='w-10 h-10'>
                    <AvatarImage src={post.author?.avatar} />
                    <AvatarFallback>
                      {post.author?.display_name?.charAt(0)}
                    </AvatarFallback>
                  </Avatar>

                  <div className='flex-1 min-w-0'>
                    <div className='flex items-center gap-2 mb-1'>
                      <CardTitle className='text-base truncate'>
                        {post.title}
                      </CardTitle>
                      {post.is_pinned && (
                        <Pin className='w-4 h-4 text-yellow-600' />
                      )}
                      {post.is_locked && (
                        <Lock className='w-4 h-4 text-red-600' />
                      )}
                    </div>

                    <div className='flex items-center gap-2 text-sm text-muted-foreground'>
                      <span>{post.author?.display_name}</span>
                      <Badge
                        className={`text-xs ${getPostTypeColor(
                          post.post_type
                        )}`}
                      >
                        {getPostTypeIcon(post.post_type)}
                        <span className='ml-1 capitalize'>
                          {post.post_type}
                        </span>
                      </Badge>
                      <span>•</span>
                      <span>{formatDate(post.created_at)}</span>
                    </div>
                  </div>

                  <Button variant='ghost' size='sm'>
                    <MoreHorizontal className='w-4 h-4' />
                  </Button>
                </div>
              </CardHeader>

              <CardContent className='pt-0'>
                <p className='text-sm text-muted-foreground mb-4 line-clamp-3'>
                  {post.content}
                </p>

                {/* Tags */}
                {post.tags && post.tags.length > 0 && (
                  <div className='flex flex-wrap gap-1 mb-4'>
                    {post.tags.map((tag, index) => (
                      <Badge key={index} variant='outline' className='text-xs'>
                        <Tag className='w-3 h-3 mr-1' />
                        {tag}
                      </Badge>
                    ))}
                  </div>
                )}

                {/* Actions */}
                <div className='flex items-center justify-between'>
                  <div className='flex items-center gap-4 text-sm text-muted-foreground'>
                    <div className='flex items-center gap-1'>
                      <MessageSquare className='w-4 h-4' />
                      <span>{post.comment_count || 0} comments</span>
                    </div>
                    <div className='flex items-center gap-1'>
                      <Eye className='w-4 h-4' />
                      <span>Views</span>
                    </div>
                  </div>

                  <div className='flex gap-2'>
                    <Button
                      variant='outline'
                      size='sm'
                      onClick={() => {
                        setSelectedPost(post);
                        fetchComments(post.id);
                      }}
                    >
                      <Reply className='w-4 h-4 mr-1' />
                      Comment
                    </Button>
                    <Button variant='ghost' size='sm'>
                      <ThumbsUp className='w-4 h-4' />
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}

      {/* Comments Modal */}
      {selectedPost && (
        <Card className='fixed inset-4 z-50 overflow-auto'>
          <CardHeader>
            <div className='flex items-center justify-between'>
              <CardTitle>{selectedPost.title}</CardTitle>
              <Button
                variant='ghost'
                size='sm'
                onClick={() => setSelectedPost(null)}
              >
                <X className='w-4 h-4' />
              </Button>
            </div>
          </CardHeader>
          <CardContent>
            <div className='space-y-4'>
              {/* Post Content */}
              <div className='p-4 bg-gray-50 rounded-lg'>
                <p className='text-sm'>{selectedPost.content}</p>
              </div>

              {/* Comments */}
              <div className='space-y-3'>
                <h4 className='font-medium'>Comments ({comments.length})</h4>
                {comments.map((comment) => (
                  <div
                    key={comment.id}
                    className='flex gap-3 p-3 border rounded-lg'
                  >
                    <Avatar className='w-8 h-8'>
                      <AvatarImage src={comment.author?.avatar} />
                      <AvatarFallback>
                        {comment.author?.display_name?.charAt(0)}
                      </AvatarFallback>
                    </Avatar>
                    <div className='flex-1'>
                      <div className='flex items-center gap-2 mb-1'>
                        <span className='text-sm font-medium'>
                          {comment.author?.display_name}
                        </span>
                        <span className='text-xs text-muted-foreground'>
                          {formatDate(comment.created_at)}
                        </span>
                      </div>
                      <p className='text-sm'>{comment.content}</p>
                    </div>
                  </div>
                ))}
              </div>

              {/* Add Comment */}
              <div className='space-y-2'>
                <label className='block text-sm font-medium'>Add Comment</label>
                <Textarea
                  value={newComment}
                  onChange={(e) => setNewComment(e.target.value)}
                  placeholder='Write a comment...'
                  rows={3}
                />
                <Button
                  onClick={() => handleCreateComment(selectedPost.id)}
                  disabled={!newComment.trim()}
                >
                  Post Comment
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
};
