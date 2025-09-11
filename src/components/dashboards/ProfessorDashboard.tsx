import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
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
  useUserProfile,
  useNotifications,
  useConnections,
  useGroups,
  usePosts,
  usePrograms,
  useJobs,
  useScholarships,
} from '@/hooks/useDashboardFeatures';
import {
  Users,
  MessageSquare,
  BookOpen,
  Star,
  Plus,
  Calendar,
  Award,
  TrendingUp,
  Clock,
  CheckCircle,
  XCircle,
  DollarSign,
  UserCheck,
  Heart,
  Video,
  FileText,
  Image,
  BarChart3,
  ChevronDown,
  MapPin,
  Building,
  ExternalLink,
  Check,
  Eye,
  Bookmark,
  Newspaper,
  UserPlus,
  GraduationCap,
  Globe,
  Settings,
  LogOut,
  Megaphone,
  Grid3X3,
  MoreHorizontal,
  Send,
  ThumbsUp,
  Share2,
  ArrowRight,
  Bell,
} from 'lucide-react';

const ProfessorDashboard = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const { userData } = useAuth();
  const [postContent, setPostContent] = useState('');

  // Load real data from database
  const { profile, loading: profileLoading } = useUserProfile();
  const { notifications, loading: notificationsLoading } = useNotifications();
  const { connections, loading: connectionsLoading } = useConnections();
  const { groups, loading: groupsLoading } = useGroups();
  const { posts, loading: postsLoading, createPost } = usePosts();
  const { programs, loading: programsLoading } = usePrograms();
  const { jobs, loading: jobsLoading } = useJobs();
  const { scholarships, loading: scholarshipsLoading } = useScholarships();

  // Scroll to top on component mount
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);

  // Get current user data from database or fallback to auth context
  const user = {
    name: profile?.display_name || userData?.displayName || 'Professor',
    avatar: profile?.avatar || '/api/placeholder/40/40',
    title: profile?.major || userData?.major || 'Professor',
    university: profile?.university || userData?.university || 'University',
    location:
      profile?.city && profile?.country
        ? `${profile.city}, ${profile.country}`
        : profile?.country || userData?.country || 'Location',
    rating: 4.8,
    profileViews: profile?.profile_views || 156,
    role: profile?.role || userData?.role || 'professor',
  };

  const handleCreatePost = async () => {
    if (!postContent.trim()) return;

    try {
      await createPost(postContent, 'text');
      setPostContent('');
      toast({
        title: 'Post created successfully',
        description: 'Your post has been shared with the community.',
      });
    } catch (error) {
      toast({
        title: 'Error creating post',
        description: 'Failed to create post. Please try again.',
        variant: 'destructive',
      });
    }
  };

  return (
    <div className='grid grid-cols-1 lg:grid-cols-12 gap-6'>
      {/* Main Content Area */}
      <div className='lg:col-span-8 space-y-4'>
        {/* Start a Post */}
        <Card className='bg-white border border-gray-200 shadow-sm'>
          <CardContent className='p-4'>
            <div className='flex items-start gap-3 mb-4'>
              <Avatar className='h-10 w-10'>
                <AvatarImage src={user.avatar} alt={user.name} />
                <AvatarFallback className='bg-green-100 text-green-600'>
                  {user.name
                    .split(' ')
                    .map((n) => n[0])
                    .join('')}
                </AvatarFallback>
              </Avatar>
              <div className='flex-1'>
                <Textarea
                  placeholder='Share your research, insights, or academic updates...'
                  value={postContent}
                  onChange={(e) => setPostContent(e.target.value)}
                  className='min-h-[80px] resize-none border-0 focus:ring-0 text-sm bg-gray-50 rounded-lg p-3'
                />
              </div>
            </div>
            <div className='flex items-center justify-between pt-3 border-t border-gray-100'>
              <div className='flex items-center gap-4'>
                <Button
                  variant='ghost'
                  size='sm'
                  className='text-gray-600 hover:text-gray-900 hover:bg-gray-50 rounded-lg'
                >
                  <Image className='h-5 w-5 mr-2' />
                  Media
                </Button>
                <Button
                  variant='ghost'
                  size='sm'
                  className='text-gray-600 hover:text-gray-900 hover:bg-gray-50 rounded-lg'
                >
                  <Calendar className='h-5 w-5 mr-2' />
                  Event
                </Button>
                <Button
                  variant='ghost'
                  size='sm'
                  className='text-gray-600 hover:text-gray-900 hover:bg-gray-50 rounded-lg'
                >
                  <FileText className='h-5 w-5 mr-2' />
                  Write article
                </Button>
              </div>
              <Button
                onClick={handleCreatePost}
                disabled={!postContent.trim()}
                className='bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-full'
              >
                Post
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Feed Posts */}
        {postsLoading ? (
          <div className='text-center py-8'>
            <div className='animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto'></div>
            <p className='text-sm text-gray-500 mt-2'>Loading posts...</p>
          </div>
        ) : posts.length > 0 ? (
          posts.map((post) => (
            <Card
              key={post.id}
              className='bg-white border border-gray-200 shadow-sm'
            >
              <CardContent className='p-4'>
                <div className='flex items-start gap-3 mb-3'>
                  <Avatar className='h-10 w-10'>
                    <AvatarImage
                      src={post.author?.avatar || '/api/placeholder/40/40'}
                      alt={post.author?.display_name || 'User'}
                    />
                    <AvatarFallback className='bg-gray-100 text-gray-600'>
                      {post.author?.display_name?.charAt(0) || 'U'}
                    </AvatarFallback>
                  </Avatar>
                  <div className='flex-1'>
                    <div className='flex items-center gap-2 mb-1'>
                      <h4 className='font-semibold text-gray-900 text-sm'>
                        {post.author?.display_name || 'Unknown User'}
                      </h4>
                      <span className='text-xs text-gray-500'>•</span>
                      <span className='text-xs text-gray-500'>
                        {new Date(post.created_at).toLocaleDateString()}
                      </span>
                    </div>
                    {post.post_type && (
                      <Badge className='text-xs bg-blue-100 text-blue-800'>
                        {post.post_type}
                      </Badge>
                    )}
                  </div>
                  <Button
                    variant='ghost'
                    size='sm'
                    className='text-gray-500 hover:text-gray-700'
                  >
                    <MoreHorizontal className='h-4 w-4' />
                  </Button>
                </div>
                <p className='text-sm text-gray-900 mb-4 leading-relaxed'>
                  {post.content}
                </p>
                {post.tags && post.tags.length > 0 && (
                  <div className='flex flex-wrap gap-2 mb-4'>
                    {post.tags.map((tag, index) => (
                      <Badge
                        key={index}
                        variant='secondary'
                        className='text-xs'
                      >
                        {tag}
                      </Badge>
                    ))}
                  </div>
                )}
                <div className='flex items-center justify-between text-sm text-gray-600 pt-3 border-t border-gray-100'>
                  <div className='flex items-center gap-6'>
                    <Button
                      variant='ghost'
                      size='sm'
                      className='hover:text-blue-600 hover:bg-blue-50 rounded-lg'
                    >
                      <ThumbsUp className='h-4 w-4 mr-1' />0
                    </Button>
                    <Button
                      variant='ghost'
                      size='sm'
                      className='hover:text-blue-600 hover:bg-blue-50 rounded-lg'
                    >
                      <MessageSquare className='h-4 w-4 mr-1' />0
                    </Button>
                    <Button
                      variant='ghost'
                      size='sm'
                      className='hover:text-blue-600 hover:bg-blue-50 rounded-lg'
                    >
                      <Share2 className='h-4 w-4 mr-1' />0
                    </Button>
                  </div>
                  <Button
                    variant='ghost'
                    size='sm'
                    className='hover:text-blue-600 hover:bg-blue-50 rounded-lg'
                  >
                    <Send className='h-4 w-4' />
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))
        ) : (
          <div className='text-center py-8'>
            <Newspaper className='h-12 w-12 text-gray-400 mx-auto mb-4' />
            <h3 className='text-lg font-medium text-gray-900 mb-2'>
              No posts yet
            </h3>
            <p className='text-sm text-gray-500 mb-4'>
              Be the first to share something with the community!
            </p>
          </div>
        )}
      </div>

      {/* Right Sidebar */}
      <div className='lg:col-span-4 space-y-4'>
        {/* Recent Connections */}
        <Card className='bg-white border border-gray-200 shadow-sm'>
          <CardHeader className='pb-3'>
            <CardTitle className='text-lg font-semibold text-gray-900'>
              Recent Connections
            </CardTitle>
          </CardHeader>
          <CardContent className='space-y-3'>
            {connectionsLoading ? (
              <div className='text-center py-4'>
                <div className='animate-spin rounded-full h-6 w-6 border-b-2 border-blue-600 mx-auto'></div>
                <p className='text-sm text-gray-500 mt-2'>
                  Loading connections...
                </p>
              </div>
            ) : connections.length > 0 ? (
              connections.slice(0, 3).map((connection) => {
                const otherUser =
                  connection.requester?.id === userData?.uid
                    ? connection.addressee
                    : connection.requester;

                return (
                  <div
                    key={connection.id}
                    className='border border-gray-200 rounded-lg p-3 hover:bg-gray-50'
                  >
                    <div className='flex items-center gap-3'>
                      <Avatar className='h-8 w-8'>
                        <AvatarImage
                          src={otherUser?.avatar || '/api/placeholder/40/40'}
                          alt={otherUser?.display_name || 'User'}
                        />
                        <AvatarFallback className='bg-gray-100 text-gray-600'>
                          {otherUser?.display_name?.charAt(0) || 'U'}
                        </AvatarFallback>
                      </Avatar>
                      <div className='flex-1'>
                        <h4 className='font-semibold text-sm text-gray-900'>
                          {otherUser?.display_name || 'Unknown User'}
                        </h4>
                        <p className='text-xs text-gray-600'>
                          {otherUser?.role === 'student'
                            ? 'Student'
                            : otherUser?.role === 'professor'
                            ? 'Professor'
                            : 'User'}
                        </p>
                        <p className='text-xs text-gray-500'>
                          {otherUser?.university || 'Unknown University'}
                        </p>
                      </div>
                      <Button
                        size='sm'
                        variant='outline'
                        className='text-xs'
                        onClick={() => navigate('/profile/' + otherUser?.id)}
                      >
                        View
                      </Button>
                    </div>
                  </div>
                );
              })
            ) : (
              <div className='text-center py-4'>
                <Users className='h-8 w-8 text-gray-400 mx-auto mb-2' />
                <p className='text-sm text-gray-500'>No connections yet</p>
                <Button
                  size='sm'
                  variant='outline'
                  className='mt-2'
                  onClick={() => navigate('/explore')}
                >
                  Find Connections
                </Button>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Recent Notifications */}
        <Card className='bg-white border border-gray-200 shadow-sm'>
          <CardHeader className='pb-3'>
            <CardTitle className='text-lg font-semibold text-gray-900'>
              Recent Notifications
            </CardTitle>
          </CardHeader>
          <CardContent className='space-y-3'>
            {notificationsLoading ? (
              <div className='text-center py-4'>
                <div className='animate-spin rounded-full h-6 w-6 border-b-2 border-blue-600 mx-auto'></div>
                <p className='text-sm text-gray-500 mt-2'>
                  Loading notifications...
                </p>
              </div>
            ) : notifications.length > 0 ? (
              notifications.slice(0, 3).map((notification) => (
                <div
                  key={notification.id}
                  className='border border-gray-200 rounded-lg p-3 hover:bg-gray-50'
                >
                  <div className='flex items-center gap-3 mb-2'>
                    <div
                      className={`w-8 h-8 rounded-full flex items-center justify-center ${
                        notification.type === 'connection_request'
                          ? 'bg-blue-100'
                          : notification.type === 'connection_accepted'
                          ? 'bg-green-100'
                          : notification.type === 'group_invite'
                          ? 'bg-purple-100'
                          : 'bg-gray-100'
                      }`}
                    >
                      {notification.type === 'connection_request' ? (
                        <UserPlus className='h-4 w-4 text-blue-600' />
                      ) : notification.type === 'connection_accepted' ? (
                        <Check className='h-4 w-4 text-green-600' />
                      ) : notification.type === 'group_invite' ? (
                        <Users className='h-4 w-4 text-purple-600' />
                      ) : (
                        <Bell className='h-4 w-4 text-gray-600' />
                      )}
                    </div>
                    <div className='flex-1'>
                      <h4 className='font-semibold text-sm text-gray-900'>
                        {notification.title}
                      </h4>
                      <p className='text-xs text-gray-600'>
                        {notification.message?.substring(0, 60)}...
                      </p>
                      <p className='text-xs text-gray-500 mt-1'>
                        {new Date(notification.created_at).toLocaleDateString()}
                      </p>
                    </div>
                    {!notification.is_read && (
                      <div className='w-2 h-2 bg-blue-600 rounded-full'></div>
                    )}
                  </div>
                </div>
              ))
            ) : (
              <div className='text-center py-4'>
                <Bell className='h-8 w-8 text-gray-400 mx-auto mb-2' />
                <p className='text-sm text-gray-500'>No notifications yet</p>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Advertisement */}
        <Card className='bg-white border border-gray-200 shadow-sm'>
          <CardContent className='p-4'>
            <div className='text-center'>
              <div className='text-xs text-gray-500 mb-2'>Ad</div>
              <h4 className='font-semibold text-sm text-gray-900 mb-2'>
                Boost your research visibility
              </h4>
              <p className='text-xs text-gray-600 mb-3'>
                Get your papers cited more with our academic promotion platform.
              </p>
              <div className='flex items-center justify-center gap-2 mb-3'>
                <div className='w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center'>
                  <TrendingUp className='h-4 w-4 text-blue-600' />
                </div>
                <div className='w-8 h-8 bg-green-100 rounded-full flex items-center justify-center'>
                  <Users className='h-4 w-4 text-green-600' />
                </div>
              </div>
              <Button
                size='sm'
                className='w-full bg-blue-600 hover:bg-blue-700 text-white rounded-full'
              >
                Learn More
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Floating Messaging Button */}
      <div className='fixed bottom-6 right-6 z-50'>
        <Button
          className='h-12 w-12 rounded-full bg-blue-600 hover:bg-blue-700 text-white shadow-lg'
          onClick={() => navigate('/dashboard/chat')}
        >
          <MessageSquare className='h-5 w-5' />
        </Button>
      </div>
    </div>
  );
};

export default ProfessorDashboard;
