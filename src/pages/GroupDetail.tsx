import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/hooks/use-toast';
import { useAuth } from '@/contexts/AuthContext';
import {
  Users,
  MessageSquare,
  Settings,
  Crown,
  Star,
  Eye,
  BookOpen,
  GraduationCap,
  Building,
  Globe,
  Calendar,
  UserPlus,
  MoreHorizontal,
  Lock,
  TrendingUp,
  Loader2,
  ArrowLeft,
  Share2,
  Flag,
  Pin,
  PinOff,
  Edit,
  Trash2,
  Heart,
  Reply,
  Send,
  Plus,
  FileText,
  Video,
  Image,
  Link,
  BarChart3,
  Bell,
  Megaphone,
  Clock,
  MapPin,
  Zap,
} from 'lucide-react';
import {
  getGroupById,
  joinGroup,
  leaveGroup,
  getGroupPosts,
  createGroupPost,
  getGroupMembers,
  type Group,
  type GroupPost,
  type GroupMember,
} from '@/lib/api/groups';

const GroupDetail = () => {
  const { groupId } = useParams<{ groupId: string }>();
  const navigate = useNavigate();
  const { user, userData } = useAuth();
  const { toast } = useToast();

  // State management
  const [group, setGroup] = useState<Group | null>(null);
  const [posts, setPosts] = useState<GroupPost[]>([]);
  const [members, setMembers] = useState<GroupMember[]>([]);
  const [loading, setLoading] = useState(true);
  const [postsLoading, setPostsLoading] = useState(false);
  const [membersLoading, setMembersLoading] = useState(false);
  const [activeTab, setActiveTab] = useState<
    'posts' | 'members' | 'about' | 'activities'
  >('posts');

  // Post creation state
  const [showCreatePost, setShowCreatePost] = useState(false);
  const [newPost, setNewPost] = useState({
    title: '',
    content: '',
    post_type: 'discussion' as
      | 'discussion'
      | 'question'
      | 'announcement'
      | 'resource',
  });
  const [creatingPost, setCreatingPost] = useState(false);

  // Discussion state
  const [expandedPosts, setExpandedPosts] = useState<Set<string>>(new Set());
  const [postComments, setPostComments] = useState<Record<string, any[]>>({});
  const [newComments, setNewComments] = useState<Record<string, string>>({});
  const [postLikes, setPostLikes] = useState<Record<string, number>>({});
  const [userLikes, setUserLikes] = useState<Set<string>>(new Set());
  const [replyingTo, setReplyingTo] = useState<string | null>(null);
  const [showReactions, setShowReactions] = useState<Set<string>>(new Set());

  // Load group data
  useEffect(() => {
    if (groupId) {
      loadGroupData();
    }
  }, [groupId]);

  const loadGroupData = async () => {
    if (!groupId) return;

    setLoading(true);
    try {
      const { data: groupData, error: groupError } = await getGroupById(
        groupId
      );

      if (groupError) {
        toast({
          title: 'Error',
          description: groupError,
          variant: 'destructive',
        });
        navigate('/groups');
        return;
      }

      setGroup(groupData);

      // Load posts and members in parallel
      loadPosts();
      loadMembers();
    } catch (error) {
      console.error('Error loading group:', error);
      toast({
        title: 'Error',
        description: 'Failed to load group',
        variant: 'destructive',
      });
      navigate('/groups');
    } finally {
      setLoading(false);
    }
  };

  const loadPosts = async () => {
    if (!groupId) return;

    setPostsLoading(true);
    try {
      const { data, error } = await getGroupPosts(groupId);

      if (error) {
        console.error('Error loading posts:', error);
        return;
      }

      setPosts(data || []);
    } catch (error) {
      console.error('Error loading posts:', error);
    } finally {
      setPostsLoading(false);
    }
  };

  const loadMembers = async () => {
    if (!groupId) return;

    setMembersLoading(true);
    try {
      const { data, error } = await getGroupMembers(groupId);

      if (error) {
        console.error('Error loading members:', error);
        return;
      }

      setMembers(data || []);
    } catch (error) {
      console.error('Error loading members:', error);
    } finally {
      setMembersLoading(false);
    }
  };

  // Handle join/leave group
  const handleJoinGroup = async () => {
    if (!user || !groupId) return;

    try {
      const { data, error } = await joinGroup(groupId);

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
        description: 'Join request sent successfully!',
      });

      // Refresh group data
      loadGroupData();
    } catch (error) {
      toast({
        title: 'Error',
        description: 'Failed to join group',
        variant: 'destructive',
      });
    }
  };

  const handleLeaveGroup = async () => {
    if (!user || !groupId) return;

    try {
      const { error } = await leaveGroup(groupId);

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
        description: 'Left group successfully',
      });

      navigate('/groups');
    } catch (error) {
      toast({
        title: 'Error',
        description: 'Failed to leave group',
        variant: 'destructive',
      });
    }
  };

  // Handle post creation
  const handleCreatePost = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!groupId || !user) return;

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
      setShowCreatePost(false);
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

  // Check if user is member
  const isUserMember = () => {
    if (!user) return false;
    // If members haven't loaded yet, return false to prevent showing join button
    if (membersLoading) return false;
    if (!members.length) return false;
    return members.some(
      (member) => member.user_id === user.id && member.status === 'active'
    );
  };

  // Check if user is admin
  const isUserAdmin = () => {
    if (!user || !group) return false;
    return group.created_by === user.id;
  };

  // Discussion interaction functions
  const togglePostExpansion = (postId: string) => {
    setExpandedPosts((prev) => {
      const newSet = new Set(prev);
      if (newSet.has(postId)) {
        newSet.delete(postId);
      } else {
        newSet.add(postId);
        // Load comments when expanding
        loadPostComments(postId);
      }
      return newSet;
    });
  };

  const loadPostComments = async (postId: string) => {
    // Simulate loading comments - replace with actual API call
    const mockComments = [
      {
        id: `${postId}-comment-1`,
        content: 'Great point! I think we should discuss this further.',
        author: { display_name: 'Sarah Wilson', avatar: null },
        created_at: new Date().toISOString(),
        likes: 3,
        replies: [],
      },
      {
        id: `${postId}-comment-2`,
        content:
          'I agree with Sarah. This is really important for our study group.',
        author: { display_name: 'Mike Chen', avatar: null },
        created_at: new Date().toISOString(),
        likes: 1,
        replies: [],
      },
    ];
    setPostComments((prev) => ({ ...prev, [postId]: mockComments }));
  };

  const handleLikePost = (postId: string) => {
    if (!user) return;

    setPostLikes((prev) => ({
      ...prev,
      [postId]: (prev[postId] || 0) + (userLikes.has(postId) ? -1 : 1),
    }));

    setUserLikes((prev) => {
      const newSet = new Set(prev);
      if (newSet.has(postId)) {
        newSet.delete(postId);
      } else {
        newSet.add(postId);
      }
      return newSet;
    });
  };

  const handleAddComment = async (postId: string) => {
    if (!user || !newComments[postId]?.trim()) return;

    const newComment = {
      id: `${postId}-comment-${Date.now()}`,
      content: newComments[postId],
      author: {
        display_name: userData?.displayName || 'You',
        avatar: userData?.avatar,
      },
      created_at: new Date().toISOString(),
      likes: 0,
      replies: [],
    };

    setPostComments((prev) => ({
      ...prev,
      [postId]: [...(prev[postId] || []), newComment],
    }));

    setNewComments((prev) => ({ ...prev, [postId]: '' }));

    toast({
      title: 'Success',
      description: 'Comment added successfully!',
    });
  };

  const toggleReactions = (postId: string) => {
    setShowReactions((prev) => {
      const newSet = new Set(prev);
      if (newSet.has(postId)) {
        newSet.delete(postId);
      } else {
        newSet.add(postId);
      }
      return newSet;
    });
  };

  // Get category icon
  const getCategoryIcon = (category: string) => {
    switch (category) {
      case 'study':
        return GraduationCap;
      case 'research':
        return TrendingUp;
      case 'professional':
        return Building;
      case 'social':
        return Users;
      case 'academic':
        return Star;
      default:
        return Users;
    }
  };

  // Get category color
  const getCategoryColor = (category: string) => {
    switch (category) {
      case 'study':
        return 'bg-blue-100 text-blue-800';
      case 'research':
        return 'bg-green-100 text-green-800';
      case 'professional':
        return 'bg-purple-100 text-purple-800';
      case 'social':
        return 'bg-pink-100 text-pink-800';
      case 'academic':
        return 'bg-orange-100 text-orange-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  if (loading) {
    return (
      <div className='flex items-center justify-center min-h-screen'>
        <Loader2 className='h-8 w-8 animate-spin text-blue-600' />
        <span className='ml-2 text-gray-600'>Loading group...</span>
      </div>
    );
  }

  if (!group) {
    return (
      <div className='flex items-center justify-center min-h-screen'>
        <div className='text-center'>
          <Users className='h-12 w-12 text-gray-400 mx-auto mb-4' />
          <h3 className='text-lg font-medium text-gray-900 mb-2'>
            Group not found
          </h3>
          <p className='text-gray-600 mb-4'>
            The group you're looking for doesn't exist or has been removed.
          </p>
          <Button onClick={() => navigate('/groups')}>
            <ArrowLeft className='h-4 w-4 mr-2' />
            Back to Groups
          </Button>
        </div>
      </div>
    );
  }

  const CategoryIcon = getCategoryIcon(group.category);
  const isMember = isUserMember();
  const isAdmin = isUserAdmin();

  return (
    <div className='min-h-screen bg-gray-50'>
      {/* Header */}
      <div className='bg-white border-b'>
        <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8'>
          <div className='flex items-center justify-between py-6'>
            <div className='flex items-center gap-4'>
              <Button
                variant='ghost'
                size='sm'
                onClick={() => navigate('/groups')}
              >
                <ArrowLeft className='h-4 w-4 mr-2' />
                Back
              </Button>

              <div className='flex items-center gap-3'>
                <Avatar className='h-12 w-12'>
                  <AvatarImage src={group.cover_image} />
                  <AvatarFallback className='text-lg font-semibold'>
                    {group.name.charAt(0).toUpperCase()}
                  </AvatarFallback>
                </Avatar>

                <div>
                  <h1 className='text-2xl font-bold text-gray-900'>
                    {group.name}
                  </h1>
                  <div className='flex items-center gap-2 mt-1'>
                    <Badge
                      className={`text-xs ${getCategoryColor(group.category)}`}
                    >
                      <CategoryIcon className='h-3 w-3 mr-1' />
                      {group.category}
                    </Badge>
                    {group.is_private ? (
                      <Lock className='h-4 w-4 text-gray-500' />
                    ) : (
                      <Globe className='h-4 w-4 text-gray-500' />
                    )}
                  </div>
                </div>
              </div>
            </div>

            <div className='flex items-center gap-2'>
              <Button variant='outline' size='sm'>
                <Share2 className='h-4 w-4 mr-2' />
                Share
              </Button>

              {isMember ? (
                <>
                  {isAdmin && (
                    <Button variant='outline' size='sm'>
                      <Settings className='h-4 w-4 mr-2' />
                      Settings
                    </Button>
                  )}
                  <Button
                    variant='outline'
                    size='sm'
                    onClick={handleLeaveGroup}
                  >
                    Leave Group
                  </Button>
                </>
              ) : (
                <Button
                  size='sm'
                  onClick={handleJoinGroup}
                  className='bg-blue-600 hover:bg-blue-700'
                >
                  <UserPlus className='h-4 w-4 mr-2' />
                  Join Group
                </Button>
              )}
            </div>
          </div>
        </div>
      </div>

      <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8'>
        <div className='grid grid-cols-1 lg:grid-cols-4 gap-8'>
          {/* Main Content */}
          <div className='lg:col-span-3 space-y-6'>
            {/* Tabs */}
            <div className='flex gap-2 border-b'>
              <Button
                variant={activeTab === 'posts' ? 'default' : 'ghost'}
                onClick={() => setActiveTab('posts')}
                className='text-sm'
              >
                <MessageSquare className='h-4 w-4 mr-2' />
                Posts ({posts.length})
              </Button>
              <Button
                variant={activeTab === 'activities' ? 'default' : 'ghost'}
                onClick={() => setActiveTab('activities')}
                className='text-sm'
              >
                <Zap className='h-4 w-4 mr-2' />
                Activities
              </Button>
              <Button
                variant={activeTab === 'members' ? 'default' : 'ghost'}
                onClick={() => setActiveTab('members')}
                className='text-sm'
              >
                <Users className='h-4 w-4 mr-2' />
                Members ({members.length})
              </Button>
              <Button
                variant={activeTab === 'about' ? 'default' : 'ghost'}
                onClick={() => setActiveTab('about')}
                className='text-sm'
              >
                <BookOpen className='h-4 w-4 mr-2' />
                About
              </Button>
            </div>

            {/* Posts Tab */}
            {activeTab === 'posts' && (
              <div className='space-y-6'>
                {/* Create Post */}
                {isMember && (
                  <Card>
                    <CardHeader>
                      <CardTitle className='text-lg'>Create a Post</CardTitle>
                    </CardHeader>
                    <CardContent>
                      {!showCreatePost ? (
                        <Button
                          onClick={() => setShowCreatePost(true)}
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
                                setNewPost({
                                  ...newPost,
                                  title: e.target.value,
                                })
                              }
                              required
                            />
                          </div>

                          {/* Post Type Selection */}
                          <div>
                            <label className='text-sm font-medium text-gray-700 mb-2 block'>
                              Post Type
                            </label>
                            <div className='grid grid-cols-2 gap-2'>
                              <Button
                                type='button'
                                variant={
                                  newPost.post_type === 'discussion'
                                    ? 'default'
                                    : 'outline'
                                }
                                size='sm'
                                onClick={() =>
                                  setNewPost({
                                    ...newPost,
                                    post_type: 'discussion',
                                  })
                                }
                                className='justify-start'
                              >
                                <MessageSquare className='h-4 w-4 mr-2' />
                                Discussion
                              </Button>
                              <Button
                                type='button'
                                variant={
                                  newPost.post_type === 'question'
                                    ? 'default'
                                    : 'outline'
                                }
                                size='sm'
                                onClick={() =>
                                  setNewPost({
                                    ...newPost,
                                    post_type: 'question',
                                  })
                                }
                                className='justify-start'
                              >
                                <MessageSquare className='h-4 w-4 mr-2' />
                                Question
                              </Button>
                              <Button
                                type='button'
                                variant={
                                  newPost.post_type === 'announcement'
                                    ? 'default'
                                    : 'outline'
                                }
                                size='sm'
                                onClick={() =>
                                  setNewPost({
                                    ...newPost,
                                    post_type: 'announcement',
                                  })
                                }
                                className='justify-start'
                              >
                                <Megaphone className='h-4 w-4 mr-2' />
                                Announcement
                              </Button>
                              <Button
                                type='button'
                                variant={
                                  newPost.post_type === 'resource'
                                    ? 'default'
                                    : 'outline'
                                }
                                size='sm'
                                onClick={() =>
                                  setNewPost({
                                    ...newPost,
                                    post_type: 'resource',
                                  })
                                }
                                className='justify-start'
                              >
                                <FileText className='h-4 w-4 mr-2' />
                                Resource
                              </Button>
                            </div>
                          </div>

                          <div>
                            <Textarea
                              placeholder={
                                newPost.post_type === 'question'
                                  ? 'Ask your question...'
                                  : newPost.post_type === 'announcement'
                                  ? 'Share your announcement...'
                                  : newPost.post_type === 'resource'
                                  ? 'Describe the resource...'
                                  : 'Share your thoughts...'
                              }
                              value={newPost.content}
                              onChange={(e) =>
                                setNewPost({
                                  ...newPost,
                                  content: e.target.value,
                                })
                              }
                              rows={4}
                              required
                            />
                          </div>

                          {/* Attachment Options */}
                          <div className='flex items-center gap-2 text-sm text-gray-600'>
                            <Button type='button' variant='ghost' size='sm'>
                              <Image className='h-4 w-4 mr-1' />
                              Image
                            </Button>
                            <Button type='button' variant='ghost' size='sm'>
                              <FileText className='h-4 w-4 mr-1' />
                              File
                            </Button>
                            <Button type='button' variant='ghost' size='sm'>
                              <Link className='h-4 w-4 mr-1' />
                              Link
                            </Button>
                            <Button type='button' variant='ghost' size='sm'>
                              <BarChart3 className='h-4 w-4 mr-1' />
                              Poll
                            </Button>
                          </div>

                          <div className='flex justify-end gap-2'>
                            <Button
                              type='button'
                              variant='outline'
                              onClick={() => setShowCreatePost(false)}
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
                {postsLoading ? (
                  <div className='flex items-center justify-center py-8'>
                    <Loader2 className='h-6 w-6 animate-spin text-blue-600' />
                    <span className='ml-2 text-gray-600'>Loading posts...</span>
                  </div>
                ) : posts.length === 0 ? (
                  <Card>
                    <CardContent className='p-8 text-center'>
                      <MessageSquare className='h-12 w-12 text-gray-400 mx-auto mb-4' />
                      <h3 className='text-lg font-medium text-gray-900 mb-2'>
                        No posts yet
                      </h3>
                      <p className='text-gray-600'>
                        {isMember
                          ? 'Be the first to start a discussion!'
                          : 'Join the group to see posts and participate in discussions.'}
                      </p>
                    </CardContent>
                  </Card>
                ) : (
                  <div className='space-y-4'>
                    {posts.map((post) => (
                      <Card key={post.id}>
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
                                <h3 className='font-semibold'>{post.title}</h3>
                                <p className='text-sm text-gray-600'>
                                  by {post.author?.display_name} •{' '}
                                  {new Date(
                                    post.created_at
                                  ).toLocaleDateString()}
                                </p>
                              </div>
                            </div>
                            <div className='flex items-center gap-1'>
                              {post.is_pinned && (
                                <Pin className='h-4 w-4 text-blue-600' />
                              )}
                              <Button variant='ghost' size='sm'>
                                <MoreHorizontal className='h-4 w-4' />
                              </Button>
                            </div>
                          </div>
                        </CardHeader>
                        <CardContent>
                          <p className='text-gray-700 mb-4'>{post.content}</p>

                          {/* Post Actions */}
                          <div className='flex items-center justify-between'>
                            <div className='flex items-center gap-4 text-sm text-gray-500'>
                              <div className='relative'>
                                <Button
                                  variant='ghost'
                                  size='sm'
                                  className={`hover:bg-red-50 hover:text-red-600 ${
                                    userLikes.has(post.id)
                                      ? 'text-red-600 bg-red-50'
                                      : ''
                                  }`}
                                  onClick={() => handleLikePost(post.id)}
                                >
                                  <Heart
                                    className={`h-4 w-4 mr-1 ${
                                      userLikes.has(post.id)
                                        ? 'fill-current'
                                        : ''
                                    }`}
                                  />
                                  Like (
                                  {postLikes[post.id] ||
                                    Math.floor(Math.random() * 20) + 1}
                                  )
                                </Button>

                                {/* Reaction Picker */}
                                {showReactions.has(post.id) && (
                                  <div className='absolute bottom-full left-0 mb-2 p-2 bg-white border rounded-lg shadow-lg flex gap-1 z-10'>
                                    {['👍', '❤️', '😂', '😮', '😢', '😡'].map(
                                      (emoji) => (
                                        <button
                                          key={emoji}
                                          className='text-lg hover:scale-125 transition-transform'
                                          onClick={() => {
                                            handleLikePost(post.id);
                                            setShowReactions((prev) => {
                                              const newSet = new Set(prev);
                                              newSet.delete(post.id);
                                              return newSet;
                                            });
                                          }}
                                        >
                                          {emoji}
                                        </button>
                                      )
                                    )}
                                  </div>
                                )}
                              </div>

                              <Button
                                variant='ghost'
                                size='sm'
                                className='hover:bg-blue-50 hover:text-blue-600'
                                onClick={() => togglePostExpansion(post.id)}
                              >
                                <Reply className='h-4 w-4 mr-1' />
                                Reply (
                                {postComments[post.id]?.length ||
                                  Math.floor(Math.random() * 10)}
                                )
                              </Button>

                              <Button
                                variant='ghost'
                                size='sm'
                                className='hover:bg-yellow-50 hover:text-yellow-600'
                                onClick={() => toggleReactions(post.id)}
                              >
                                <Zap className='h-4 w-4 mr-1' />
                                React
                              </Button>

                              <Button
                                variant='ghost'
                                size='sm'
                                className='hover:bg-green-50 hover:text-green-600'
                              >
                                <Share2 className='h-4 w-4 mr-1' />
                                Share
                              </Button>

                              <Button
                                variant='ghost'
                                size='sm'
                                className='hover:bg-purple-50 hover:text-purple-600'
                              >
                                <Flag className='h-4 w-4 mr-1' />
                                Save
                              </Button>
                            </div>

                            {/* Post Type Badge */}
                            <Badge variant='outline' className='text-xs'>
                              {post.post_type === 'discussion' &&
                                '💬 Discussion'}
                              {post.post_type === 'announcement' &&
                                '📢 Announcement'}
                              {post.post_type === 'question' && '❓ Question'}
                              {post.post_type === 'resource' && '📁 Resource'}
                            </Badge>
                          </div>

                          {/* Interactive Discussion Section */}
                          {expandedPosts.has(post.id) && (
                            <div className='mt-4 pt-4 border-t'>
                              {/* Comments Display */}
                              {postComments[post.id] &&
                                postComments[post.id].length > 0 && (
                                  <div className='space-y-4 mb-4'>
                                    <h4 className='font-medium text-gray-900 flex items-center gap-2'>
                                      <MessageSquare className='h-4 w-4' />
                                      Discussion ({
                                        postComments[post.id].length
                                      }{' '}
                                      comments)
                                    </h4>

                                    {postComments[post.id].map((comment) => (
                                      <div
                                        key={comment.id}
                                        className='flex gap-3 p-3 bg-gray-50 rounded-lg'
                                      >
                                        <Avatar className='h-8 w-8'>
                                          <AvatarImage
                                            src={comment.author.avatar}
                                          />
                                          <AvatarFallback>
                                            {comment.author.display_name?.charAt(
                                              0
                                            )}
                                          </AvatarFallback>
                                        </Avatar>
                                        <div className='flex-1'>
                                          <div className='flex items-center gap-2 mb-1'>
                                            <span className='font-medium text-sm'>
                                              {comment.author.display_name}
                                            </span>
                                            <span className='text-xs text-gray-500'>
                                              {new Date(
                                                comment.created_at
                                              ).toLocaleString()}
                                            </span>
                                          </div>
                                          <p className='text-sm text-gray-700 mb-2'>
                                            {comment.content}
                                          </p>
                                          <div className='flex items-center gap-4 text-xs text-gray-500'>
                                            <Button
                                              variant='ghost'
                                              size='sm'
                                              className='h-6 px-2'
                                            >
                                              <Heart className='h-3 w-3 mr-1' />
                                              {comment.likes}
                                            </Button>
                                            <Button
                                              variant='ghost'
                                              size='sm'
                                              className='h-6 px-2'
                                            >
                                              <Reply className='h-3 w-3 mr-1' />
                                              Reply
                                            </Button>
                                            <Button
                                              variant='ghost'
                                              size='sm'
                                              className='h-6 px-2'
                                            >
                                              <Flag className='h-3 w-3 mr-1' />
                                              Report
                                            </Button>
                                          </div>
                                        </div>
                                      </div>
                                    ))}
                                  </div>
                                )}

                              {/* Add Comment Section */}
                              {isMember && (
                                <div className='bg-blue-50 p-4 rounded-lg'>
                                  <div className='flex items-start gap-3'>
                                    <Avatar className='h-8 w-8'>
                                      <AvatarImage src={userData?.avatar} />
                                      <AvatarFallback>
                                        {userData?.displayName?.charAt(0)}
                                      </AvatarFallback>
                                    </Avatar>
                                    <div className='flex-1'>
                                      <Textarea
                                        placeholder='Join the discussion...'
                                        value={newComments[post.id] || ''}
                                        onChange={(e) =>
                                          setNewComments((prev) => ({
                                            ...prev,
                                            [post.id]: e.target.value,
                                          }))
                                        }
                                        className='min-h-[80px] resize-none border-0 bg-white'
                                      />
                                      <div className='flex justify-between items-center mt-2'>
                                        <div className='flex items-center gap-2 text-xs text-gray-500'>
                                          <span>
                                            💡 Tip: Be respectful and
                                            constructive
                                          </span>
                                        </div>
                                        <div className='flex gap-2'>
                                          <Button
                                            variant='outline'
                                            size='sm'
                                            onClick={() =>
                                              setNewComments((prev) => ({
                                                ...prev,
                                                [post.id]: '',
                                              }))
                                            }
                                          >
                                            Cancel
                                          </Button>
                                          <Button
                                            size='sm'
                                            onClick={() =>
                                              handleAddComment(post.id)
                                            }
                                            disabled={
                                              !newComments[post.id]?.trim()
                                            }
                                            className='bg-blue-600 hover:bg-blue-700'
                                          >
                                            <Send className='h-3 w-3 mr-1' />
                                            Comment
                                          </Button>
                                        </div>
                                      </div>
                                    </div>
                                  </div>
                                </div>
                              )}

                              {/* Discussion Guidelines */}
                              <div className='mt-4 p-3 bg-gray-100 rounded-lg'>
                                <h5 className='font-medium text-sm text-gray-900 mb-2'>
                                  💬 Discussion Guidelines
                                </h5>
                                <ul className='text-xs text-gray-600 space-y-1'>
                                  <li>
                                    • Be respectful and constructive in your
                                    comments
                                  </li>
                                  <li>
                                    • Stay on topic and relevant to the post
                                  </li>
                                  <li>
                                    • Use the reaction buttons to show
                                    appreciation
                                  </li>
                                  <li>
                                    • Report inappropriate content to group
                                    moderators
                                  </li>
                                </ul>
                              </div>
                            </div>
                          )}
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                )}
              </div>
            )}

            {/* Activities Tab */}
            {activeTab === 'activities' && (
              <div className='space-y-6'>
                {/* Quick Actions */}
                {isMember && (
                  <Card>
                    <CardHeader>
                      <CardTitle className='text-lg'>Quick Actions</CardTitle>
                      <CardDescription>
                        Start engaging with the group community
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className='grid grid-cols-2 md:grid-cols-4 gap-4'>
                        <Button
                          variant='outline'
                          className='h-20 flex flex-col gap-2'
                          onClick={() => setActiveTab('posts')}
                        >
                          <MessageSquare className='h-6 w-6' />
                          <span className='text-sm'>Create Post</span>
                        </Button>
                        <Button
                          variant='outline'
                          className='h-20 flex flex-col gap-2'
                        >
                          <BarChart3 className='h-6 w-6' />
                          <span className='text-sm'>Create Poll</span>
                        </Button>
                        <Button
                          variant='outline'
                          className='h-20 flex flex-col gap-2'
                        >
                          <Calendar className='h-6 w-6' />
                          <span className='text-sm'>Schedule Event</span>
                        </Button>
                        <Button
                          variant='outline'
                          className='h-20 flex flex-col gap-2'
                        >
                          <FileText className='h-6 w-6' />
                          <span className='text-sm'>Share Resource</span>
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                )}

                {/* Active Discussions */}
                <Card>
                  <CardHeader>
                    <CardTitle className='text-lg'>
                      🔥 Active Discussions
                    </CardTitle>
                    <CardDescription>
                      Most engaging conversations happening now
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className='space-y-4'>
                      <div className='flex items-start gap-3 p-3 border rounded-lg hover:bg-gray-50 cursor-pointer'>
                        <div className='p-2 bg-blue-100 rounded-full'>
                          <MessageSquare className='h-4 w-4 text-blue-600' />
                        </div>
                        <div className='flex-1'>
                          <h4 className='font-medium text-sm mb-1'>
                            Study session for upcoming exam
                          </h4>
                          <p className='text-xs text-gray-600 mb-2'>
                            "When should we schedule our group study session? I
                            think we need at least 3 hours..."
                          </p>
                          <div className='flex items-center gap-4 text-xs text-gray-500'>
                            <span className='flex items-center gap-1'>
                              <Users className='h-3 w-3' />
                              12 participants
                            </span>
                            <span className='flex items-center gap-1'>
                              <MessageSquare className='h-3 w-3' />8 comments
                            </span>
                            <span className='flex items-center gap-1'>
                              <Heart className='h-3 w-3' />
                              15 likes
                            </span>
                          </div>
                        </div>
                        <Badge variant='outline' className='text-xs'>
                          Hot 🔥
                        </Badge>
                      </div>

                      <div className='flex items-start gap-3 p-3 border rounded-lg hover:bg-gray-50 cursor-pointer'>
                        <div className='p-2 bg-green-100 rounded-full'>
                          <MessageSquare className='h-4 w-4 text-green-600' />
                        </div>
                        <div className='flex-1'>
                          <h4 className='font-medium text-sm mb-1'>
                            Best resources for machine learning
                          </h4>
                          <p className='text-xs text-gray-600 mb-2'>
                            "What are the best online courses and books you've
                            found for ML?"
                          </p>
                          <div className='flex items-center gap-4 text-xs text-gray-500'>
                            <span className='flex items-center gap-1'>
                              <Users className='h-3 w-3' />8 participants
                            </span>
                            <span className='flex items-center gap-1'>
                              <MessageSquare className='h-3 w-3' />5 comments
                            </span>
                            <span className='flex items-center gap-1'>
                              <Heart className='h-3 w-3' />9 likes
                            </span>
                          </div>
                        </div>
                        <Badge variant='outline' className='text-xs'>
                          Active
                        </Badge>
                      </div>

                      <div className='flex items-start gap-3 p-3 border rounded-lg hover:bg-gray-50 cursor-pointer'>
                        <div className='p-2 bg-purple-100 rounded-full'>
                          <MessageSquare className='h-4 w-4 text-purple-600' />
                        </div>
                        <div className='flex-1'>
                          <h4 className='font-medium text-sm mb-1'>
                            Group project ideas
                          </h4>
                          <p className='text-xs text-gray-600 mb-2'>
                            "Let's brainstorm some interesting project ideas for
                            our final semester..."
                          </p>
                          <div className='flex items-center gap-4 text-xs text-gray-500'>
                            <span className='flex items-center gap-1'>
                              <Users className='h-3 w-3' />6 participants
                            </span>
                            <span className='flex items-center gap-1'>
                              <MessageSquare className='h-3 w-3' />3 comments
                            </span>
                            <span className='flex items-center gap-1'>
                              <Heart className='h-3 w-3' />7 likes
                            </span>
                          </div>
                        </div>
                        <Badge variant='outline' className='text-xs'>
                          New
                        </Badge>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* Recent Activities */}
                <Card>
                  <CardHeader>
                    <CardTitle className='text-lg'>Recent Activities</CardTitle>
                    <CardDescription>
                      Latest happenings in the group
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className='space-y-4'>
                      {/* Sample Activity Items */}
                      <div className='flex items-start gap-3 p-3 border rounded-lg'>
                        <div className='p-2 bg-blue-100 rounded-full'>
                          <MessageSquare className='h-4 w-4 text-blue-600' />
                        </div>
                        <div className='flex-1'>
                          <p className='text-sm font-medium'>
                            New discussion started
                          </p>
                          <p className='text-xs text-gray-600'>
                            "Study session for upcoming exam" by John Doe
                          </p>
                          <p className='text-xs text-gray-500 mt-1'>
                            2 hours ago
                          </p>
                        </div>
                      </div>

                      <div className='flex items-start gap-3 p-3 border rounded-lg'>
                        <div className='p-2 bg-green-100 rounded-full'>
                          <UserPlus className='h-4 w-4 text-green-600' />
                        </div>
                        <div className='flex-1'>
                          <p className='text-sm font-medium'>
                            New member joined
                          </p>
                          <p className='text-xs text-gray-600'>
                            Sarah Wilson joined the group
                          </p>
                          <p className='text-xs text-gray-500 mt-1'>
                            4 hours ago
                          </p>
                        </div>
                      </div>

                      <div className='flex items-start gap-3 p-3 border rounded-lg'>
                        <div className='p-2 bg-purple-100 rounded-full'>
                          <Calendar className='h-4 w-4 text-purple-600' />
                        </div>
                        <div className='flex-1'>
                          <p className='text-sm font-medium'>Event created</p>
                          <p className='text-xs text-gray-600'>
                            "Weekly Study Group" - Tomorrow at 2:00 PM
                          </p>
                          <p className='text-xs text-gray-500 mt-1'>
                            1 day ago
                          </p>
                        </div>
                      </div>

                      <div className='flex items-start gap-3 p-3 border rounded-lg'>
                        <div className='p-2 bg-orange-100 rounded-full'>
                          <FileText className='h-4 w-4 text-orange-600' />
                        </div>
                        <div className='flex-1'>
                          <p className='text-sm font-medium'>Resource shared</p>
                          <p className='text-xs text-gray-600'>
                            "Chapter 5 Notes.pdf" by Mike Chen
                          </p>
                          <p className='text-xs text-gray-500 mt-1'>
                            2 days ago
                          </p>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* Upcoming Events */}
                <Card>
                  <CardHeader>
                    <CardTitle className='text-lg'>Upcoming Events</CardTitle>
                    <CardDescription>
                      Scheduled group activities
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className='space-y-3'>
                      <div className='flex items-center gap-3 p-3 border rounded-lg'>
                        <div className='p-2 bg-blue-100 rounded-full'>
                          <Calendar className='h-4 w-4 text-blue-600' />
                        </div>
                        <div className='flex-1'>
                          <p className='text-sm font-medium'>
                            Weekly Study Session
                          </p>
                          <p className='text-xs text-gray-600'>
                            Tomorrow, 2:00 PM - 4:00 PM
                          </p>
                          <p className='text-xs text-gray-500'>
                            Library Room 201
                          </p>
                        </div>
                        <Button size='sm' variant='outline'>
                          Join
                        </Button>
                      </div>

                      <div className='flex items-center gap-3 p-3 border rounded-lg'>
                        <div className='p-2 bg-green-100 rounded-full'>
                          <Video className='h-4 w-4 text-green-600' />
                        </div>
                        <div className='flex-1'>
                          <p className='text-sm font-medium'>
                            Online Discussion
                          </p>
                          <p className='text-xs text-gray-600'>
                            Friday, 7:00 PM - 8:00 PM
                          </p>
                          <p className='text-xs text-gray-500'>Zoom Meeting</p>
                        </div>
                        <Button size='sm' variant='outline'>
                          Join
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* Group Resources */}
                <Card>
                  <CardHeader>
                    <CardTitle className='text-lg'>Group Resources</CardTitle>
                    <CardDescription>
                      Shared files and materials
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className='space-y-3'>
                      <div className='flex items-center gap-3 p-3 border rounded-lg'>
                        <div className='p-2 bg-gray-100 rounded-full'>
                          <FileText className='h-4 w-4 text-gray-600' />
                        </div>
                        <div className='flex-1'>
                          <p className='text-sm font-medium'>
                            Study Guide - Chapter 1-3
                          </p>
                          <p className='text-xs text-gray-600'>
                            PDF • 2.3 MB • Shared by John Doe
                          </p>
                        </div>
                        <Button size='sm' variant='outline'>
                          Download
                        </Button>
                      </div>

                      <div className='flex items-center gap-3 p-3 border rounded-lg'>
                        <div className='p-2 bg-gray-100 rounded-full'>
                          <Image className='h-4 w-4 text-gray-600' />
                        </div>
                        <div className='flex-1'>
                          <p className='text-sm font-medium'>Formula Sheet</p>
                          <p className='text-xs text-gray-600'>
                            PNG • 1.1 MB • Shared by Sarah Wilson
                          </p>
                        </div>
                        <Button size='sm' variant='outline'>
                          Download
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* Group Polls */}
                <Card>
                  <CardHeader>
                    <CardTitle className='text-lg'>Active Polls</CardTitle>
                    <CardDescription>
                      Participate in group decisions
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className='space-y-4'>
                      <div className='p-4 border rounded-lg'>
                        <h4 className='font-medium mb-3'>
                          When should we schedule our next study session?
                        </h4>
                        <div className='space-y-2'>
                          <div className='flex items-center gap-2'>
                            <input type='radio' name='poll1' id='option1' />
                            <label htmlFor='option1' className='text-sm'>
                              Monday 2:00 PM
                            </label>
                            <span className='text-xs text-gray-500 ml-auto'>
                              5 votes
                            </span>
                          </div>
                          <div className='flex items-center gap-2'>
                            <input type='radio' name='poll1' id='option2' />
                            <label htmlFor='option2' className='text-sm'>
                              Wednesday 3:00 PM
                            </label>
                            <span className='text-xs text-gray-500 ml-auto'>
                              8 votes
                            </span>
                          </div>
                          <div className='flex items-center gap-2'>
                            <input type='radio' name='poll1' id='option3' />
                            <label htmlFor='option3' className='text-sm'>
                              Friday 1:00 PM
                            </label>
                            <span className='text-xs text-gray-500 ml-auto'>
                              3 votes
                            </span>
                          </div>
                        </div>
                        <Button size='sm' className='mt-3'>
                          Vote
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            )}

            {/* Members Tab */}
            {activeTab === 'members' && (
              <div className='space-y-4'>
                {membersLoading ? (
                  <div className='flex items-center justify-center py-8'>
                    <Loader2 className='h-6 w-6 animate-spin text-blue-600' />
                    <span className='ml-2 text-gray-600'>
                      Loading members...
                    </span>
                  </div>
                ) : (
                  <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4'>
                    {members.map((member) => (
                      <Card key={member.id}>
                        <CardContent className='p-4'>
                          <div className='flex items-center gap-3'>
                            <Avatar className='h-10 w-10'>
                              <AvatarImage src={member.user?.avatar} />
                              <AvatarFallback>
                                {member.user?.display_name?.charAt(0)}
                              </AvatarFallback>
                            </Avatar>
                            <div className='flex-1'>
                              <h4 className='font-medium'>
                                {member.user?.display_name}
                              </h4>
                              <p className='text-sm text-gray-600'>
                                {member.user?.role}
                              </p>
                              {member.role === 'admin' && (
                                <Badge
                                  variant='secondary'
                                  className='text-xs mt-1'
                                >
                                  <Crown className='h-3 w-3 mr-1' />
                                  Admin
                                </Badge>
                              )}
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                )}
              </div>
            )}

            {/* About Tab */}
            {activeTab === 'about' && (
              <div className='space-y-6'>
                <Card>
                  <CardHeader>
                    <CardTitle>About this group</CardTitle>
                  </CardHeader>
                  <CardContent className='space-y-4'>
                    <p className='text-gray-700'>{group.description}</p>

                    <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
                      {group.university && (
                        <div>
                          <h4 className='font-medium text-sm text-gray-900'>
                            University
                          </h4>
                          <p className='text-sm text-gray-600'>
                            {group.university}
                          </p>
                        </div>
                      )}
                      {group.subject_area && (
                        <div>
                          <h4 className='font-medium text-sm text-gray-900'>
                            Subject Area
                          </h4>
                          <p className='text-sm text-gray-600'>
                            {group.subject_area}
                          </p>
                        </div>
                      )}
                      {group.department && (
                        <div>
                          <h4 className='font-medium text-sm text-gray-900'>
                            Department
                          </h4>
                          <p className='text-sm text-gray-600'>
                            {group.department}
                          </p>
                        </div>
                      )}
                      <div>
                        <h4 className='font-medium text-sm text-gray-900'>
                          Created
                        </h4>
                        <p className='text-sm text-gray-600'>
                          {new Date(group.created_at).toLocaleDateString()}
                        </p>
                      </div>
                    </div>

                    {group.rules && (
                      <div>
                        <h4 className='font-medium text-sm text-gray-900 mb-2'>
                          Group Rules
                        </h4>
                        <p className='text-sm text-gray-600 whitespace-pre-line'>
                          {group.rules}
                        </p>
                      </div>
                    )}
                  </CardContent>
                </Card>
              </div>
            )}
          </div>

          {/* Sidebar */}
          <div className='space-y-6'>
            {/* Group Info */}
            <Card>
              <CardHeader>
                <CardTitle className='text-lg'>Group Info</CardTitle>
              </CardHeader>
              <CardContent className='space-y-4'>
                <div className='flex items-center justify-between'>
                  <span className='text-sm text-gray-600'>Members</span>
                  <span className='font-medium'>{group.member_count || 0}</span>
                </div>
                <div className='flex items-center justify-between'>
                  <span className='text-sm text-gray-600'>Posts</span>
                  <span className='font-medium'>{posts.length}</span>
                </div>
                <div className='flex items-center justify-between'>
                  <span className='text-sm text-gray-600'>Privacy</span>
                  <span className='font-medium'>
                    {group.is_private ? 'Private' : 'Public'}
                  </span>
                </div>
                <div className='flex items-center justify-between'>
                  <span className='text-sm text-gray-600'>Max Members</span>
                  <span className='font-medium'>{group.max_members}</span>
                </div>
              </CardContent>
            </Card>

            {/* Recent Members */}
            <Card>
              <CardHeader>
                <CardTitle className='text-lg'>Recent Members</CardTitle>
              </CardHeader>
              <CardContent>
                <div className='space-y-3'>
                  {members.slice(0, 5).map((member) => (
                    <div key={member.id} className='flex items-center gap-3'>
                      <Avatar className='h-8 w-8'>
                        <AvatarImage src={member.user?.avatar} />
                        <AvatarFallback>
                          {member.user?.display_name?.charAt(0)}
                        </AvatarFallback>
                      </Avatar>
                      <div className='flex-1'>
                        <p className='text-sm font-medium'>
                          {member.user?.display_name}
                        </p>
                        <p className='text-xs text-gray-600'>
                          Joined{' '}
                          {new Date(member.joined_at).toLocaleDateString()}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default GroupDetail;
