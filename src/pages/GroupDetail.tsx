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
  const [activeTab, setActiveTab] = useState<'posts' | 'members' | 'about'>(
    'posts'
  );

  // Post creation state
  const [showCreatePost, setShowCreatePost] = useState(false);
  const [newPost, setNewPost] = useState({
    title: '',
    content: '',
    post_type: 'discussion' as const,
  });
  const [creatingPost, setCreatingPost] = useState(false);

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
    if (!user || !members.length) return false;
    return members.some(
      (member) => member.user_id === user.id && member.status === 'active'
    );
  };

  // Check if user is admin
  const isUserAdmin = () => {
    if (!user || !group) return false;
    return group.created_by === user.id;
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
                          <div>
                            <Textarea
                              placeholder='Share your thoughts...'
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
                          <div className='flex items-center gap-4 text-sm text-gray-500'>
                            <Button variant='ghost' size='sm'>
                              <Heart className='h-4 w-4 mr-1' />
                              Like
                            </Button>
                            <Button variant='ghost' size='sm'>
                              <Reply className='h-4 w-4 mr-1' />
                              Reply
                            </Button>
                            <Button variant='ghost' size='sm'>
                              <Share2 className='h-4 w-4 mr-1' />
                              Share
                            </Button>
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                )}
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
