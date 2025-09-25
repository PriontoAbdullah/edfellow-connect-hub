import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import {
  MessageSquare,
  Pin,
  PinOff,
  Edit,
  Trash2,
  Heart,
  Reply,
  Share2,
  MoreHorizontal,
  Send,
  Loader2,
  Flag,
  Lock,
  Eye,
  Calendar,
  User,
} from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { useAuth } from '@/contexts/AuthContext';
import {
  getGroupPosts,
  createGroupPost,
  updateGroupPost,
  deleteGroupPost,
  pinGroupPost,
  unpinGroupPost,
  getGroupPostComments,
  createGroupPostComment,
  type GroupPost,
  type GroupPostComment,
} from '@/lib/api/groups';

interface GroupPostsProps {
  groupId: string;
  isUserMember: boolean;
  isUserAdmin: boolean;
}

export const GroupPosts: React.FC<GroupPostsProps> = ({
  groupId,
  isUserMember,
  isUserAdmin,
}) => {
  const { user } = useAuth();
  const { toast } = useToast();

  // State management
  const [posts, setPosts] = useState<GroupPost[]>([]);
  const [loading, setLoading] = useState(true);
  const [creatingPost, setCreatingPost] = useState(false);
  const [showCreateForm, setShowCreateForm] = useState(false);
  const [selectedPost, setSelectedPost] = useState<GroupPost | null>(null);
  const [showComments, setShowComments] = useState<Set<string>>(new Set());
  const [comments, setComments] = useState<Record<string, GroupPostComment[]>>(
    {}
  );
  const [loadingComments, setLoadingComments] = useState<Set<string>>(
    new Set()
  );

  // Form state
  const [newPost, setNewPost] = useState({
    title: '',
    content: '',
    post_type: 'discussion' as const,
  });
  const [newComment, setNewComment] = useState<Record<string, string>>({});

  // Load posts on component mount
  useEffect(() => {
    loadPosts();
  }, [groupId]);

  const loadPosts = async () => {
    setLoading(true);
    try {
      const { data, error } = await getGroupPosts(groupId);

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
      console.error('Error loading posts:', error);
      toast({
        title: 'Error',
        description: 'Failed to load posts',
        variant: 'destructive',
      });
    } finally {
      setLoading(false);
    }
  };

  const loadComments = async (postId: string) => {
    setLoadingComments((prev) => new Set(prev).add(postId));

    try {
      const { data, error } = await getGroupPostComments(postId);

      if (error) {
        console.error('Error loading comments:', error);
        return;
      }

      setComments((prev) => ({ ...prev, [postId]: data || [] }));
    } catch (error) {
      console.error('Error loading comments:', error);
    } finally {
      setLoadingComments((prev) => {
        const newSet = new Set(prev);
        newSet.delete(postId);
        return newSet;
      });
    }
  };

  const handleCreatePost = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user) return;

    setCreatingPost(true);
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

      setNewPost({ title: '', content: '', post_type: 'discussion' });
      setShowCreateForm(false);
      loadPosts();
    } catch (error) {
      toast({
        title: 'Error',
        description: 'Failed to create post',
        variant: 'destructive',
      });
    } finally {
      setCreatingPost(false);
    }
  };

  const handleDeletePost = async (postId: string) => {
    if (!confirm('Are you sure you want to delete this post?')) {
      return;
    }

    try {
      const { error } = await deleteGroupPost(postId);

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
        description: 'Post deleted successfully',
      });

      loadPosts();
    } catch (error) {
      toast({
        title: 'Error',
        description: 'Failed to delete post',
        variant: 'destructive',
      });
    }
  };

  const handlePinPost = async (postId: string) => {
    try {
      const { error } = await pinGroupPost(postId);

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
        description: 'Post pinned successfully',
      });

      loadPosts();
    } catch (error) {
      toast({
        title: 'Error',
        description: 'Failed to pin post',
        variant: 'destructive',
      });
    }
  };

  const handleUnpinPost = async (postId: string) => {
    try {
      const { error } = await unpinGroupPost(postId);

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
        description: 'Post unpinned successfully',
      });

      loadPosts();
    } catch (error) {
      toast({
        title: 'Error',
        description: 'Failed to unpin post',
        variant: 'destructive',
      });
    }
  };

  const handleToggleComments = (postId: string) => {
    const newShowComments = new Set(showComments);
    if (newShowComments.has(postId)) {
      newShowComments.delete(postId);
    } else {
      newShowComments.add(postId);
      if (!comments[postId]) {
        loadComments(postId);
      }
    }
    setShowComments(newShowComments);
  };

  const handleCreateComment = async (postId: string) => {
    const content = newComment[postId];
    if (!content || !user) return;

    try {
      const { data, error } = await createGroupPostComment(postId, { content });

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
        description: 'Comment added successfully',
      });

      setNewComment((prev) => ({ ...prev, [postId]: '' }));
      loadComments(postId);
    } catch (error) {
      toast({
        title: 'Error',
        description: 'Failed to add comment',
        variant: 'destructive',
      });
    }
  };

  const getPostTypeColor = (type: string) => {
    switch (type) {
      case 'announcement':
        return 'bg-red-100 text-red-800';
      case 'question':
        return 'bg-blue-100 text-blue-800';
      case 'resource':
        return 'bg-green-100 text-green-800';
      case 'poll':
        return 'bg-purple-100 text-purple-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getPostTypeIcon = (type: string) => {
    switch (type) {
      case 'announcement':
        return '📢';
      case 'question':
        return '❓';
      case 'resource':
        return '📚';
      case 'poll':
        return '📊';
      default:
        return '💬';
    }
  };

  if (loading) {
    return (
      <div className='flex items-center justify-center py-8'>
        <Loader2 className='h-6 w-6 animate-spin text-blue-600' />
        <span className='ml-2 text-gray-600'>Loading posts...</span>
      </div>
    );
  }

  return (
    <div className='space-y-6'>
      {/* Create Post */}
      {isUserMember && (
        <Card>
          <CardHeader>
            <CardTitle className='text-lg'>Create a Post</CardTitle>
          </CardHeader>
          <CardContent>
            {!showCreateForm ? (
              <Button
                onClick={() => setShowCreateForm(true)}
                className='w-full'
              >
                <MessageSquare className='h-4 w-4 mr-2' />
                What's on your mind?
              </Button>
            ) : (
              <form onSubmit={handleCreatePost} className='space-y-4'>
                <div>
                  <Input
                    placeholder='Post title'
                    value={newPost.title}
                    onChange={(e) =>
                      setNewPost({ ...newPost, title: e.target.value })
                    }
                    required
                  />
                </div>

                <div>
                  <Select
                    value={newPost.post_type}
                    onValueChange={(value: any) =>
                      setNewPost({ ...newPost, post_type: value })
                    }
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value='discussion'>Discussion</SelectItem>
                      <SelectItem value='announcement'>Announcement</SelectItem>
                      <SelectItem value='question'>Question</SelectItem>
                      <SelectItem value='resource'>Resource</SelectItem>
                      <SelectItem value='poll'>Poll</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <Textarea
                    placeholder='Share your thoughts...'
                    value={newPost.content}
                    onChange={(e) =>
                      setNewPost({ ...newPost, content: e.target.value })
                    }
                    rows={4}
                    required
                  />
                </div>

                <div className='flex justify-end gap-2'>
                  <Button
                    type='button'
                    variant='outline'
                    onClick={() => setShowCreateForm(false)}
                  >
                    Cancel
                  </Button>
                  <Button type='submit' disabled={creatingPost}>
                    {creatingPost ? (
                      <Loader2 className='h-4 w-4 animate-spin mr-2' />
                    ) : (
                      <Send className='h-4 w-4 mr-2' />
                    )}
                    Post
                  </Button>
                </div>
              </form>
            )}
          </CardContent>
        </Card>
      )}

      {/* Posts List */}
      {posts.length === 0 ? (
        <Card>
          <CardContent className='p-8 text-center'>
            <MessageSquare className='h-12 w-12 text-gray-400 mx-auto mb-4' />
            <h3 className='text-lg font-medium text-gray-900 mb-2'>
              No posts yet
            </h3>
            <p className='text-gray-600'>
              {isUserMember
                ? 'Be the first to start a discussion!'
                : 'Join the group to see posts and participate in discussions.'}
            </p>
          </CardContent>
        </Card>
      ) : (
        <div className='space-y-4'>
          {posts.map((post) => (
            <Card
              key={post.id}
              className={post.is_pinned ? 'border-blue-200 bg-blue-50' : ''}
            >
              <CardHeader>
                <div className='flex items-start justify-between'>
                  <div className='flex items-center gap-3'>
                    <Avatar className='h-8 w-8'>
                      <AvatarImage src={post.author?.avatar} />
                      <AvatarFallback>
                        {post.author?.display_name?.charAt(0)}
                      </AvatarFallback>
                    </Avatar>
                    <div>
                      <div className='flex items-center gap-2'>
                        <h3 className='font-semibold'>{post.title}</h3>
                        {post.is_pinned && (
                          <Pin className='h-4 w-4 text-blue-600' />
                        )}
                      </div>
                      <div className='flex items-center gap-2 mt-1'>
                        <Badge
                          className={`text-xs ${getPostTypeColor(
                            post.post_type
                          )}`}
                        >
                          {getPostTypeIcon(post.post_type)} {post.post_type}
                        </Badge>
                        <p className='text-sm text-gray-600'>
                          by {post.author?.display_name} •{' '}
                          {new Date(post.created_at).toLocaleDateString()}
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className='flex items-center gap-1'>
                    {(isUserAdmin || post.author_id === user?.id) && (
                      <div className='flex items-center gap-1'>
                        {isUserAdmin && (
                          <Button
                            variant='ghost'
                            size='sm'
                            onClick={() =>
                              post.is_pinned
                                ? handleUnpinPost(post.id)
                                : handlePinPost(post.id)
                            }
                          >
                            {post.is_pinned ? (
                              <PinOff className='h-4 w-4' />
                            ) : (
                              <Pin className='h-4 w-4' />
                            )}
                          </Button>
                        )}
                        <Button variant='ghost' size='sm'>
                          <Edit className='h-4 w-4' />
                        </Button>
                        <Button
                          variant='ghost'
                          size='sm'
                          onClick={() => handleDeletePost(post.id)}
                        >
                          <Trash2 className='h-4 w-4' />
                        </Button>
                      </div>
                    )}
                    <Button variant='ghost' size='sm'>
                      <MoreHorizontal className='h-4 w-4' />
                    </Button>
                  </div>
                </div>
              </CardHeader>

              <CardContent>
                <p className='text-gray-700 mb-4 whitespace-pre-line'>
                  {post.content}
                </p>

                <div className='flex items-center gap-4 text-sm text-gray-500 mb-4'>
                  <Button variant='ghost' size='sm'>
                    <Heart className='h-4 w-4 mr-1' />
                    Like
                  </Button>
                  <Button
                    variant='ghost'
                    size='sm'
                    onClick={() => handleToggleComments(post.id)}
                  >
                    <Reply className='h-4 w-4 mr-1' />
                    {comments[post.id]?.length || 0} Comments
                  </Button>
                  <Button variant='ghost' size='sm'>
                    <Share2 className='h-4 w-4 mr-1' />
                    Share
                  </Button>
                </div>

                {/* Comments Section */}
                {showComments.has(post.id) && (
                  <div className='border-t pt-4 space-y-4'>
                    {/* Add Comment */}
                    {isUserMember && (
                      <div className='flex gap-2'>
                        <Avatar className='h-6 w-6'>
                          <AvatarImage src={user?.user_metadata?.avatar_url} />
                          <AvatarFallback>
                            {user?.user_metadata?.full_name?.charAt(0) || 'U'}
                          </AvatarFallback>
                        </Avatar>
                        <div className='flex-1 flex gap-2'>
                          <Input
                            placeholder='Write a comment...'
                            value={newComment[post.id] || ''}
                            onChange={(e) =>
                              setNewComment((prev) => ({
                                ...prev,
                                [post.id]: e.target.value,
                              }))
                            }
                            onKeyPress={(e) => {
                              if (e.key === 'Enter' && !e.shiftKey) {
                                e.preventDefault();
                                handleCreateComment(post.id);
                              }
                            }}
                          />
                          <Button
                            size='sm'
                            onClick={() => handleCreateComment(post.id)}
                            disabled={!newComment[post.id]}
                          >
                            <Send className='h-4 w-4' />
                          </Button>
                        </div>
                      </div>
                    )}

                    {/* Comments List */}
                    {loadingComments.has(post.id) ? (
                      <div className='flex items-center justify-center py-4'>
                        <Loader2 className='h-4 w-4 animate-spin text-blue-600' />
                        <span className='ml-2 text-gray-600'>
                          Loading comments...
                        </span>
                      </div>
                    ) : (
                      <div className='space-y-3'>
                        {comments[post.id]?.map((comment) => (
                          <div key={comment.id} className='flex gap-3'>
                            <Avatar className='h-6 w-6'>
                              <AvatarImage src={comment.author?.avatar} />
                              <AvatarFallback>
                                {comment.author?.display_name?.charAt(0)}
                              </AvatarFallback>
                            </Avatar>
                            <div className='flex-1'>
                              <div className='bg-gray-50 rounded-lg p-3'>
                                <div className='flex items-center gap-2 mb-1'>
                                  <span className='text-sm font-medium'>
                                    {comment.author?.display_name}
                                  </span>
                                  <span className='text-xs text-gray-500'>
                                    {new Date(
                                      comment.created_at
                                    ).toLocaleDateString()}
                                  </span>
                                </div>
                                <p className='text-sm text-gray-700'>
                                  {comment.content}
                                </p>
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                )}
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
};
