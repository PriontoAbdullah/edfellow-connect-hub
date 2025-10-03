import { useState, useEffect, useRef } from 'react';
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
import { CountryFlag } from '@/components/ui/CountryFlag';
import { useToast } from '@/hooks/use-toast';
import { useAuth } from '@/contexts/AuthContext';
import { getCountryCode } from '@/lib/countries';
import { supabase } from '@/lib/supabase';
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
  Upload,
  X,
} from 'lucide-react';
import {
  getGroupById,
  joinGroup,
  leaveGroup,
  getGroupPosts,
  createGroupPost,
  getGroupMembers,
  checkUserMembership,
  likeGroupPost,
  getGroupPostLikes,
  checkUserLikedPost,
  createGroupPostComment,
  getGroupPostComments,
  getGroupActivities,
  getGroupEvents,
  getGroupResources,
  getGroupPolls,
  voteOnPoll,
  type Group,
  type GroupPost,
  type GroupMember,
} from '@/lib/api/groups';
import { useGroupRealtime, usePostRealtime } from '@/hooks/useGroupRealtime';

const GroupDetail = () => {
  const { groupId } = useParams<{ groupId: string }>();
  const navigate = useNavigate();
  const { user, userData } = useAuth();
  const { toast } = useToast();

  // State management
  const [group, setGroup] = useState<Group | null>(null);
  const [posts, setPosts] = useState<GroupPost[]>([]);
  const [members, setMembers] = useState<GroupMember[]>([]);
  const [userMembership, setUserMembership] = useState<GroupMember | null>(
    null
  );
  const [loading, setLoading] = useState(true);
  const [postsLoading, setPostsLoading] = useState(false);
  const [membersLoading, setMembersLoading] = useState(false);
  const [activeTab, setActiveTab] = useState<
    'posts' | 'members' | 'about' | 'activities'
  >('posts');

  // Real-time data
  const { activities, isConnected } = useGroupRealtime(groupId || '');

  // Activities tab state
  const [groupActivities, setGroupActivities] = useState<any[]>([]);
  const [groupEvents, setGroupEvents] = useState<any[]>([]);
  const [groupResources, setGroupResources] = useState<any[]>([]);
  const [groupPolls, setGroupPolls] = useState<any[]>([]);
  const [activitiesLoading, setActivitiesLoading] = useState(false);

  // File upload state
  const [selectedFiles, setSelectedFiles] = useState<File[]>([]);
  const [uploading, setUploading] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Error states
  const [error, setError] = useState<string | null>(null);
  const [postError, setPostError] = useState<string | null>(null);
  const [membersError, setMembersError] = useState<string | null>(null);
  const [activitiesError, setActivitiesError] = useState<string | null>(null);

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
      loadActivitiesData();
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
        navigate('/dashboard/groups');
        return;
      }

      setGroup(groupData);

      // Load posts, members, and user membership in parallel
      loadPosts();
      loadMembers();
      loadUserMembership();
    } catch (error) {
      console.error('Error loading group:', error);
      toast({
        title: 'Error',
        description: 'Failed to load group',
        variant: 'destructive',
      });
      // Navigate back based on the current route
      if (window.location.pathname.startsWith('/dashboard/')) {
        navigate('/dashboard/groups');
      } else {
        navigate('/');
      }
    } finally {
      setLoading(false);
    }
  };

  const loadUserMembership = async () => {
    if (!groupId || !user) {
      return;
    }

    try {
      const { data, error } = await checkUserMembership(groupId, user.id);

      if (error) {
        setUserMembership(null);
        return;
      }

      setUserMembership(data);
    } catch (error) {
      setUserMembership(null);
    }
  };

  const loadPosts = async () => {
    if (!groupId) return;

    setPostsLoading(true);
    setPostError(null);
    try {
      const { data, error } = await getGroupPosts(groupId);

      if (error) {
        setPostError('Failed to load posts. Please try again.');
        console.error('Error loading posts:', error);
        return;
      }

      setPosts(data || []);

      // Load like counts and user like status for each post
      if (data && user) {
        for (const post of data) {
          try {
            // Load like count
            const { data: likesData } = await getGroupPostLikes(post.id);
            if (likesData) {
              setPostLikes((prev) => ({
                ...prev,
                [post.id]: likesData.length,
              }));
            }

            // Check if user liked this post
            const { data: userLiked } = await checkUserLikedPost(
              post.id,
              user.id
            );
            if (userLiked) {
              setUserLikes((prev) => new Set(prev).add(post.id));
            }
          } catch (error) {
            console.error('Error loading post interactions:', error);
          }
        }
      }
    } catch (error) {
      setPostError('Failed to load posts. Please try again.');
      console.error('Error loading posts:', error);
    } finally {
      setPostsLoading(false);
    }
  };

  const loadMembers = async () => {
    if (!groupId) return;

    setMembersLoading(true);
    setMembersError(null);
    try {
      const { data, error } = await getGroupMembers(groupId);

      if (error) {
        setMembersError('Failed to load members. Please try again.');
        console.error('Error loading members:', error);
        return;
      }

      setMembers(data || []);
    } catch (error) {
      setMembersError('Failed to load members. Please try again.');
      console.error('Error loading members:', error);
    } finally {
      setMembersLoading(false);
    }
  };

  const loadActivitiesData = async () => {
    if (!groupId) return;

    setActivitiesLoading(true);
    setActivitiesError(null);
    try {
      const [activitiesResult, eventsResult, resourcesResult, pollsResult] =
        await Promise.all([
          getGroupActivities(groupId),
          getGroupEvents(groupId),
          getGroupResources(groupId),
          getGroupPolls(groupId),
        ]);

      if (activitiesResult.data) {
        setGroupActivities(activitiesResult.data);
      }
      if (eventsResult.data) {
        setGroupEvents(eventsResult.data);
      }
      if (resourcesResult.data) {
        setGroupResources(resourcesResult.data);
      }
      if (pollsResult.data) {
        setGroupPolls(pollsResult.data);
      }
    } catch (error) {
      setActivitiesError('Failed to load activities data. Please try again.');
      console.error('Error loading activities data:', error);
    } finally {
      setActivitiesLoading(false);
    }
  };

  // File upload functions
  const handleFileSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(event.target.files || []);
    setSelectedFiles((prev) => [...prev, ...files]);
  };

  const removeFile = (index: number) => {
    setSelectedFiles((prev) => prev.filter((_, i) => i !== index));
  };

  const uploadFiles = async (files: File[]): Promise<string[]> => {
    const uploadedUrls: string[] = [];

    for (const file of files) {
      try {
        // Create a unique filename
        const fileExt = file.name.split('.').pop();
        const fileName = `${Date.now()}-${Math.random()
          .toString(36)
          .substring(2)}.${fileExt}`;
        const filePath = `group-attachments/${groupId}/${fileName}`;

        // Upload to Supabase Storage
        const { data, error } = await supabase.storage
          .from('group-attachments')
          .upload(filePath, file);

        if (error) {
          console.error('Error uploading file:', error);
          continue;
        }

        // Get public URL
        const { data: urlData } = supabase.storage
          .from('group-attachments')
          .getPublicUrl(filePath);

        uploadedUrls.push(urlData.publicUrl);
      } catch (error) {
        console.error('Error uploading file:', error);
      }
    }

    return uploadedUrls;
  };

  // Poll voting function
  const handleVoteOnPoll = async (pollId: string, optionId: string) => {
    if (!user || !isMember) return;

    try {
      const { error } = await voteOnPoll(pollId, optionId);
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
        description: 'Vote recorded successfully!',
      });

      // Refresh polls data
      loadActivitiesData();
    } catch (error) {
      toast({
        title: 'Error',
        description: 'Failed to vote on poll',
        variant: 'destructive',
      });
    }
  };

  // Handle join/leave group
  const handleJoinGroup = async () => {
    if (!user || !groupId) return;

    // Check if user is already a member
    if (isUserMember()) {
      toast({
        title: 'Already a Member',
        description: 'You are already a member of this group',
        variant: 'default',
      });
      return;
    }

    try {
      const { data, error } = await joinGroup(groupId);

      if (error) {
        // Handle specific error cases
        if (error.includes('already a member')) {
          toast({
            title: 'Already a Member',
            description: 'You are already a member of this group',
            variant: 'default',
          });
        } else if (error.includes('pending request')) {
          toast({
            title: 'Request Pending',
            description:
              'You already have a pending request to join this group',
            variant: 'default',
          });
        } else {
          toast({
            title: 'Error',
            description: error,
            variant: 'destructive',
          });
        }
        return;
      }

      toast({
        title: 'Success',
        description: 'Join request sent successfully!',
      });

      // Refresh group data and user membership
      loadGroupData();
      loadUserMembership();
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

      // Navigate back based on the current route
      if (window.location.pathname.startsWith('/dashboard/')) {
        navigate('/dashboard/groups');
      } else {
        navigate('/');
      }
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
    setUploading(true);
    try {
      // Upload files if any
      let attachmentUrls: string[] = [];
      if (selectedFiles.length > 0) {
        attachmentUrls = await uploadFiles(selectedFiles);
      }

      const { data, error } = await createGroupPost(groupId, {
        ...newPost,
        attachments: attachmentUrls.length > 0 ? attachmentUrls : undefined,
      });

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
      setSelectedFiles([]);
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
      setUploading(false);
    }
  };

  // Check if user is member
  const isUserMember = () => {
    if (!user) {
      return false;
    }

    // First try the dedicated userMembership state
    if (userMembership) {
      return userMembership.status === 'active';
    }

    // Fallback: check if user is in the members list
    if (members && members.length > 0) {
      const isInMembersList = members.some(
        (member) => member.user_id === user.id && member.status === 'active'
      );
      return isInMembersList;
    }

    return false;
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
    try {
      const { data, error } = await getGroupPostComments(postId);
      if (error) {
        console.error('Error loading comments:', error);
        return;
      }
      setPostComments((prev) => ({ ...prev, [postId]: data || [] }));
    } catch (error) {
      console.error('Error loading comments:', error);
    }
  };

  const handleLikePost = async (postId: string) => {
    if (!user) return;

    try {
      const { error } = await likeGroupPost(postId);
      if (error) {
        toast({
          title: 'Error',
          description: error,
          variant: 'destructive',
        });
        return;
      }

      // Update local state optimistically
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
    } catch (error) {
      toast({
        title: 'Error',
        description: 'Failed to like post',
        variant: 'destructive',
      });
    }
  };

  const handleAddComment = async (postId: string) => {
    if (!user || !newComments[postId]?.trim()) return;

    try {
      const { data, error } = await createGroupPostComment(postId, {
        content: newComments[postId],
      });

      if (error) {
        toast({
          title: 'Error',
          description: error,
          variant: 'destructive',
        });
        return;
      }

      // Add the new comment to local state
      if (data) {
        setPostComments((prev) => ({
          ...prev,
          [postId]: [...(prev[postId] || []), data],
        }));
      }

      setNewComments((prev) => ({ ...prev, [postId]: '' }));

      toast({
        title: 'Success',
        description: 'Comment added successfully!',
      });
    } catch (error) {
      toast({
        title: 'Error',
        description: 'Failed to add comment',
        variant: 'destructive',
      });
    }
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
          <Button
            onClick={() => {
              // Navigate back based on the current route
              if (window.location.pathname.startsWith('/dashboard/')) {
                navigate('/dashboard/groups');
              } else {
                navigate('/');
              }
            }}
          >
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
                onClick={() => {
                  navigate('/dashboard/groups');
                }}
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

                          {/* File Upload */}
                          <div>
                            <input
                              type='file'
                              ref={fileInputRef}
                              onChange={handleFileSelect}
                              multiple
                              accept='image/*,video/*,.pdf,.doc,.docx,.txt,.zip,.rar'
                              className='hidden'
                            />
                            <Button
                              type='button'
                              variant='outline'
                              size='sm'
                              onClick={() => fileInputRef.current?.click()}
                              disabled={uploading}
                            >
                              <Upload className='h-4 w-4 mr-2' />
                              {uploading ? 'Uploading...' : 'Attach Files'}
                            </Button>
                          </div>

                          {/* Selected Files */}
                          {selectedFiles.length > 0 && (
                            <div className='space-y-2'>
                              <p className='text-sm font-medium text-gray-700'>
                                Selected Files:
                              </p>
                              {selectedFiles.map((file, index) => (
                                <div
                                  key={index}
                                  className='flex items-center justify-between p-2 bg-gray-50 rounded-lg'
                                >
                                  <div className='flex items-center gap-2'>
                                    {file.type.startsWith('image/') ? (
                                      <Image className='h-4 w-4 text-blue-600' />
                                    ) : file.type.startsWith('video/') ? (
                                      <Video className='h-4 w-4 text-purple-600' />
                                    ) : (
                                      <FileText className='h-4 w-4 text-gray-600' />
                                    )}
                                    <span className='text-sm text-gray-700'>
                                      {file.name}
                                    </span>
                                    <span className='text-xs text-gray-500'>
                                      ({(file.size / 1024 / 1024).toFixed(2)}{' '}
                                      MB)
                                    </span>
                                  </div>
                                  <Button
                                    type='button'
                                    variant='ghost'
                                    size='sm'
                                    onClick={() => removeFile(index)}
                                  >
                                    <X className='h-4 w-4' />
                                  </Button>
                                </div>
                              ))}
                            </div>
                          )}

                          <div className='flex justify-end gap-2'>
                            <Button
                              type='button'
                              variant='outline'
                              onClick={() => setShowCreatePost(false)}
                            >
                              Cancel
                            </Button>
                            <Button
                              type='submit'
                              disabled={creatingPost || uploading}
                            >
                              {creatingPost || uploading ? (
                                <Loader2 className='h-4 w-4 animate-spin mr-2' />
                              ) : (
                                <Send className='h-4 w-4 mr-2' />
                              )}
                              {uploading ? 'Uploading...' : 'Post'}
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
                ) : postError ? (
                  <Card>
                    <CardContent className='p-8 text-center'>
                      <div className='text-red-600 mb-4'>
                        <MessageSquare className='h-12 w-12 mx-auto mb-2' />
                        <p className='text-lg font-medium'>
                          Error Loading Posts
                        </p>
                        <p className='text-sm text-gray-600 mt-2'>
                          {postError}
                        </p>
                      </div>
                      <Button onClick={loadPosts} variant='outline'>
                        Try Again
                      </Button>
                    </CardContent>
                  </Card>
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
                              <div className='relative'>
                                <Avatar className='h-8 w-8'>
                                  <AvatarImage src={post.author?.avatar} />
                                  <AvatarFallback>
                                    {post.author?.display_name?.charAt(0)}
                                  </AvatarFallback>
                                </Avatar>
                                {post.author?.country && (
                                  <div className='absolute -bottom-1 -right-1'>
                                    <CountryFlag
                                      code={
                                        getCountryCode(post.author.country) ||
                                        ''
                                      }
                                      size={12}
                                      className='rounded-full border border-white'
                                    />
                                  </div>
                                )}
                              </div>
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

                          {/* Post Attachments */}
                          {post.attachments && post.attachments.length > 0 && (
                            <div className='mb-4'>
                              <p className='text-sm font-medium text-gray-700 mb-2'>
                                Attachments:
                              </p>
                              <div className='grid grid-cols-2 md:grid-cols-3 gap-2'>
                                {post.attachments.map((attachment, index) => (
                                  <div
                                    key={index}
                                    className='flex items-center gap-2 p-2 bg-gray-50 rounded-lg'
                                  >
                                    {attachment.includes('image') ? (
                                      <Image className='h-4 w-4 text-blue-600' />
                                    ) : attachment.includes('video') ? (
                                      <Video className='h-4 w-4 text-purple-600' />
                                    ) : (
                                      <FileText className='h-4 w-4 text-gray-600' />
                                    )}
                                    <a
                                      href={attachment}
                                      target='_blank'
                                      rel='noopener noreferrer'
                                      className='text-sm text-blue-600 hover:underline truncate'
                                    >
                                      {attachment.split('/').pop()}
                                    </a>
                                  </div>
                                ))}
                              </div>
                            </div>
                          )}

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
                                        <div className='relative'>
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
                                          {comment.author.country && (
                                            <div className='absolute -bottom-1 -right-1'>
                                              <CountryFlag
                                                code={
                                                  getCountryCode(
                                                    comment.author.country
                                                  ) || ''
                                                }
                                                size={10}
                                                className='rounded-full border border-white'
                                              />
                                            </div>
                                          )}
                                        </div>
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
                                    <div className='relative'>
                                      <Avatar className='h-8 w-8'>
                                        <AvatarImage src={userData?.avatar} />
                                        <AvatarFallback>
                                          {userData?.displayName?.charAt(0)}
                                        </AvatarFallback>
                                      </Avatar>
                                      {userData?.country && (
                                        <div className='absolute -bottom-1 -right-1'>
                                          <CountryFlag
                                            code={
                                              getCountryCode(
                                                userData.country
                                              ) || ''
                                            }
                                            size={10}
                                            className='rounded-full border border-white'
                                          />
                                        </div>
                                      )}
                                    </div>
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
                    {activitiesLoading ? (
                      <div className='flex items-center justify-center py-8'>
                        <Loader2 className='h-6 w-6 animate-spin text-blue-600' />
                        <span className='ml-2 text-gray-600'>
                          Loading discussions...
                        </span>
                      </div>
                    ) : activitiesError ? (
                      <div className='text-center py-8 text-red-600'>
                        <MessageSquare className='h-12 w-12 mx-auto mb-4 text-red-300' />
                        <p>Error loading activities</p>
                        <p className='text-sm text-gray-600 mt-2'>
                          {activitiesError}
                        </p>
                        <Button
                          onClick={loadActivitiesData}
                          variant='outline'
                          className='mt-4'
                        >
                          Try Again
                        </Button>
                      </div>
                    ) : posts.length > 0 ? (
                      <div className='space-y-4'>
                        {posts.slice(0, 3).map((post) => (
                          <div
                            key={post.id}
                            className='flex items-start gap-3 p-3 border rounded-lg hover:bg-gray-50 cursor-pointer'
                            onClick={() => setActiveTab('posts')}
                          >
                            <div className='p-2 bg-blue-100 rounded-full'>
                              <MessageSquare className='h-4 w-4 text-blue-600' />
                            </div>
                            <div className='flex-1'>
                              <h4 className='font-medium text-sm mb-1'>
                                {post.title || 'Discussion'}
                              </h4>
                              <p className='text-xs text-gray-600 mb-2'>
                                {post.content?.substring(0, 100)}
                                {post.content &&
                                  post.content.length > 100 &&
                                  '...'}
                              </p>
                              <div className='flex items-center gap-4 text-xs text-gray-500'>
                                <span className='flex items-center gap-1'>
                                  <Users className='h-3 w-3' />
                                  {postComments[post.id]?.length || 0} comments
                                </span>
                                <span className='flex items-center gap-1'>
                                  <Heart className='h-3 w-3' />
                                  {postLikes[post.id] || 0} likes
                                </span>
                              </div>
                            </div>
                            <Badge variant='outline' className='text-xs'>
                              {postLikes[post.id] > 5 ? 'Hot 🔥' : 'Active'}
                            </Badge>
                          </div>
                        ))}
                      </div>
                    ) : (
                      <div className='text-center py-8 text-gray-500'>
                        <MessageSquare className='h-12 w-12 mx-auto mb-4 text-gray-300' />
                        <p>No discussions yet</p>
                        <p className='text-sm'>
                          Be the first to start a conversation!
                        </p>
                      </div>
                    )}
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
                    {activitiesLoading ? (
                      <div className='flex items-center justify-center py-8'>
                        <Loader2 className='h-6 w-6 animate-spin text-blue-600' />
                        <span className='ml-2 text-gray-600'>
                          Loading activities...
                        </span>
                      </div>
                    ) : groupActivities.length > 0 ? (
                      <div className='space-y-4'>
                        {groupActivities.slice(0, 5).map((activity, index) => (
                          <div
                            key={index}
                            className='flex items-start gap-3 p-3 border rounded-lg'
                          >
                            <div className='p-2 bg-blue-100 rounded-full'>
                              {activity.type === 'post' ? (
                                <MessageSquare className='h-4 w-4 text-blue-600' />
                              ) : activity.type === 'member_join' ? (
                                <UserPlus className='h-4 w-4 text-green-600' />
                              ) : (
                                <MessageSquare className='h-4 w-4 text-blue-600' />
                              )}
                            </div>
                            <div className='flex-1'>
                              <p className='text-sm font-medium'>
                                {activity.type === 'post'
                                  ? 'New discussion started'
                                  : activity.type === 'member_join'
                                  ? 'New member joined'
                                  : 'Activity'}
                              </p>
                              <p className='text-xs text-gray-600'>
                                {activity.description}
                              </p>
                              <p className='text-xs text-gray-500 mt-1'>
                                {new Date(
                                  activity.created_at
                                ).toLocaleDateString()}
                              </p>
                            </div>
                          </div>
                        ))}
                      </div>
                    ) : (
                      <div className='text-center py-8 text-gray-500'>
                        <MessageSquare className='h-12 w-12 mx-auto mb-4 text-gray-300' />
                        <p>No recent activities</p>
                        <p className='text-sm'>
                          Activities will appear here as they happen
                        </p>
                      </div>
                    )}
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
                    {activitiesLoading ? (
                      <div className='flex items-center justify-center py-8'>
                        <Loader2 className='h-6 w-6 animate-spin text-blue-600' />
                        <span className='ml-2 text-gray-600'>
                          Loading events...
                        </span>
                      </div>
                    ) : groupEvents.length > 0 ? (
                      <div className='space-y-3'>
                        {groupEvents.slice(0, 3).map((event) => (
                          <div
                            key={event.id}
                            className='flex items-center gap-3 p-3 border rounded-lg'
                          >
                            <div className='p-2 bg-blue-100 rounded-full'>
                              {event.is_online ? (
                                <Video className='h-4 w-4 text-green-600' />
                              ) : (
                                <Calendar className='h-4 w-4 text-blue-600' />
                              )}
                            </div>
                            <div className='flex-1'>
                              <p className='text-sm font-medium'>
                                {event.title}
                              </p>
                              <p className='text-xs text-gray-600'>
                                {new Date(
                                  event.event_date
                                ).toLocaleDateString()}{' '}
                                at{' '}
                                {new Date(
                                  event.event_date
                                ).toLocaleTimeString()}
                                {event.event_end_date &&
                                  ` - ${new Date(
                                    event.event_end_date
                                  ).toLocaleTimeString()}`}
                              </p>
                              <p className='text-xs text-gray-500'>
                                {event.is_online
                                  ? 'Online Event'
                                  : event.location || 'Location TBD'}
                              </p>
                            </div>
                            <Button size='sm' variant='outline'>
                              Join
                            </Button>
                          </div>
                        ))}
                      </div>
                    ) : (
                      <div className='text-center py-8 text-gray-500'>
                        <Calendar className='h-12 w-12 mx-auto mb-4 text-gray-300' />
                        <p>No upcoming events</p>
                        <p className='text-sm'>
                          Events will appear here when scheduled
                        </p>
                      </div>
                    )}
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
                    {activitiesLoading ? (
                      <div className='flex items-center justify-center py-8'>
                        <Loader2 className='h-6 w-6 animate-spin text-blue-600' />
                        <span className='ml-2 text-gray-600'>
                          Loading resources...
                        </span>
                      </div>
                    ) : groupResources.length > 0 ? (
                      <div className='space-y-3'>
                        {groupResources.slice(0, 5).map((resource) => (
                          <div
                            key={resource.id}
                            className='flex items-center gap-3 p-3 border rounded-lg'
                          >
                            <div className='p-2 bg-gray-100 rounded-full'>
                              {resource.resource_type === 'image' ? (
                                <Image className='h-4 w-4 text-gray-600' />
                              ) : resource.resource_type === 'video' ? (
                                <Video className='h-4 w-4 text-gray-600' />
                              ) : (
                                <FileText className='h-4 w-4 text-gray-600' />
                              )}
                            </div>
                            <div className='flex-1'>
                              <p className='text-sm font-medium'>
                                {resource.title}
                              </p>
                              <p className='text-xs text-gray-600'>
                                {resource.file_type?.toUpperCase()} •{' '}
                                {resource.file_size
                                  ? `${(
                                      resource.file_size /
                                      1024 /
                                      1024
                                    ).toFixed(1)} MB`
                                  : 'Unknown size'}{' '}
                                • Shared by{' '}
                                {resource.uploaded_by?.display_name ||
                                  'Unknown'}
                              </p>
                            </div>
                            <Button
                              size='sm'
                              variant='outline'
                              onClick={() =>
                                window.open(resource.file_url, '_blank')
                              }
                            >
                              {resource.resource_type === 'link'
                                ? 'Open'
                                : 'Download'}
                            </Button>
                          </div>
                        ))}
                      </div>
                    ) : (
                      <div className='text-center py-8 text-gray-500'>
                        <FileText className='h-12 w-12 mx-auto mb-4 text-gray-300' />
                        <p>No resources shared yet</p>
                        <p className='text-sm'>
                          Resources will appear here when shared
                        </p>
                      </div>
                    )}
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
                    {activitiesLoading ? (
                      <div className='flex items-center justify-center py-8'>
                        <Loader2 className='h-6 w-6 animate-spin text-blue-600' />
                        <span className='ml-2 text-gray-600'>
                          Loading polls...
                        </span>
                      </div>
                    ) : groupPolls.length > 0 ? (
                      <div className='space-y-4'>
                        {groupPolls.slice(0, 2).map((poll) => (
                          <div key={poll.id} className='p-4 border rounded-lg'>
                            <h4 className='font-medium mb-3'>
                              {poll.question}
                            </h4>
                            {poll.description && (
                              <p className='text-sm text-gray-600 mb-3'>
                                {poll.description}
                              </p>
                            )}
                            <div className='space-y-2'>
                              {poll.options?.map((option) => (
                                <div
                                  key={option.id}
                                  className='flex items-center gap-2'
                                >
                                  <input
                                    type={
                                      poll.is_multiple_choice
                                        ? 'checkbox'
                                        : 'radio'
                                    }
                                    name={`poll-${poll.id}`}
                                    id={`option-${option.id}`}
                                    disabled={!isMember}
                                    onChange={() =>
                                      handleVoteOnPoll(poll.id, option.id)
                                    }
                                  />
                                  <label
                                    htmlFor={`option-${option.id}`}
                                    className='text-sm flex-1'
                                  >
                                    {option.option_text}
                                  </label>
                                  <span className='text-xs text-gray-500'>
                                    {option.vote_count || 0} votes
                                  </span>
                                </div>
                              ))}
                            </div>
                          </div>
                        ))}
                      </div>
                    ) : (
                      <div className='text-center py-8 text-gray-500'>
                        <BarChart3 className='h-12 w-12 mx-auto mb-4 text-gray-300' />
                        <p>No active polls</p>
                        <p className='text-sm'>
                          Polls will appear here when created
                        </p>
                      </div>
                    )}
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
                ) : membersError ? (
                  <Card>
                    <CardContent className='p-8 text-center'>
                      <div className='text-red-600 mb-4'>
                        <Users className='h-12 w-12 mx-auto mb-2' />
                        <p className='text-lg font-medium'>
                          Error Loading Members
                        </p>
                        <p className='text-sm text-gray-600 mt-2'>
                          {membersError}
                        </p>
                      </div>
                      <Button onClick={loadMembers} variant='outline'>
                        Try Again
                      </Button>
                    </CardContent>
                  </Card>
                ) : (
                  <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4'>
                    {members.map((member) => (
                      <Card key={member.id}>
                        <CardContent className='p-4'>
                          <div className='flex items-center gap-3'>
                            <div className='relative'>
                              <Avatar className='h-10 w-10'>
                                <AvatarImage src={member.user?.avatar} />
                                <AvatarFallback>
                                  {member.user?.display_name?.charAt(0)}
                                </AvatarFallback>
                              </Avatar>
                              {member.user?.country && (
                                <div className='absolute -bottom-1 -right-1'>
                                  <CountryFlag
                                    code={
                                      getCountryCode(member.user.country) || ''
                                    }
                                    size={12}
                                    className='rounded-full border border-white'
                                  />
                                </div>
                              )}
                            </div>
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
                      <div className='relative'>
                        <Avatar className='h-8 w-8'>
                          <AvatarImage src={member.user?.avatar} />
                          <AvatarFallback>
                            {member.user?.display_name?.charAt(0)}
                          </AvatarFallback>
                        </Avatar>
                        {member.user?.country && (
                          <div className='absolute -bottom-1 -right-1'>
                            <CountryFlag
                              code={getCountryCode(member.user.country) || ''}
                              size={10}
                              className='rounded-full border border-white'
                            />
                          </div>
                        )}
                      </div>
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
