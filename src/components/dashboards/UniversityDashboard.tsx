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
  Building2,
  MessageSquare,
  BookOpen,
  Star,
  Plus,
  Calendar,
  FileText,
  CheckCircle,
  TrendingUp,
  BarChart3,
  Globe,
  Mail,
  Edit,
  Eye,
  Users,
  Video,
  Send,
  Download,
  Share2,
  Settings,
  DollarSign,
  Award,
  Clock,
  MapPin,
  Phone,
  ExternalLink,
  ArrowRight,
  ChevronRight,
  Image,
  ChevronDown,
  MapPin as MapPinIcon,
  Building,
  Check,
  Bookmark,
  Newspaper,
  UserPlus,
  GraduationCap,
  LogOut,
  Megaphone,
  Grid3X3,
  MoreHorizontal,
  ThumbsUp,
} from 'lucide-react';

const UniversityDashboard = () => {
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
    name: profile?.display_name || userData?.displayName || 'University',
    avatar: profile?.avatar || '/api/placeholder/40/40',
    title: profile?.major || userData?.major || 'University Administrator',
    university: profile?.university || userData?.university || 'University',
    location:
      profile?.city && profile?.country
        ? `${profile.city}, ${profile.country}`
        : profile?.country || userData?.country || 'Location',
    rating: 4.9,
    profileViews: profile?.profile_views || 234,
    role: profile?.role || userData?.role || 'university',
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

  const studentInquiries = [
    {
      id: 1,
      student: 'Emma Chen',
      email: 'emma.chen@email.com',
      country: 'China',
      program: 'Master of Computer Science',
      message:
        'I am interested in your Computer Science Masters program. Could you please provide more information about the curriculum, admission requirements, and scholarship opportunities?',
      time: '2 hours ago',
      priority: 'high',
    },
    {
      id: 2,
      student: 'Carlos Rodriguez',
      email: 'carlos.rodriguez@email.com',
      country: 'Mexico',
      program: 'Business Analytics PhD',
      message:
        'Hi there, I submitted my application for the Business Analytics PhD program last month. Could you please update me on the status of my application?',
      time: '5 hours ago',
      priority: 'medium',
    },
    {
      id: 3,
      student: 'Priya Sharma',
      email: 'priya.sharma@email.com',
      country: 'India',
      program: 'Data Science Certificate',
      message:
        "Good day! I would like to know more about the Data Science Certificate program. Specifically, I'm interested in the course duration and job placement assistance.",
      time: '1 day ago',
      priority: 'low',
    },
  ];

  const upcomingSessions = [
    {
      id: 1,
      title: 'Introduction to AI and Machine Learning',
      date: 'Today 2:00 PM',
      registrations: 145,
      duration: '1 hour',
      status: 'Live',
    },
    {
      id: 2,
      title: 'Career Opportunities in Data Science',
      date: 'Tomorrow 10:00 AM',
      registrations: 89,
      duration: '45 min',
      status: 'Scheduled',
    },
    {
      id: 3,
      title: 'International Student Visa Guide',
      date: 'Dec 30 3:00 PM',
      registrations: 234,
      duration: '1 hour',
      status: 'Scheduled',
    },
  ];

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
                <AvatarFallback className='bg-orange-100 text-orange-600'>
                  {user.name
                    .split(' ')
                    .map((n) => n[0])
                    .join('')}
                </AvatarFallback>
              </Avatar>
              <div className='flex-1'>
                <Textarea
                  placeholder='Share university updates, program announcements, or campus news...'
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
        {/* Actions */}
        <Card className='bg-white border border-gray-200 shadow-sm'>
          <CardHeader className='pb-3'>
            <CardTitle className='text-lg font-semibold text-gray-900'>
              Quick Actions
            </CardTitle>
          </CardHeader>
          <CardContent className='space-y-2'>
            <Button
              size='sm'
              className='w-full bg-blue-600 hover:bg-blue-700 text-white rounded-full'
              onClick={() => navigate('/programs')}
            >
              <Megaphone className='h-4 w-4 mr-2' /> Promote Program
            </Button>
            <Button
              size='sm'
              variant='outline'
              className='w-full rounded-full'
              onClick={() => navigate('/opportunities')}
            >
              <Grid3X3 className='h-4 w-4 mr-2' /> Opportunities Portal
            </Button>
            <Button
              size='sm'
              variant='outline'
              className='w-full rounded-full'
              onClick={() => navigate('/recruiting')}
            >
              <UserPlus className='h-4 w-4 mr-2' /> Recruitment Tools
            </Button>
          </CardContent>
        </Card>

        {/* My Programs */}
        <Card className='bg-white border border-gray-200 shadow-sm'>
          <CardHeader className='pb-3'>
            <CardTitle className='text-lg font-semibold text-gray-900'>
              My Programs
            </CardTitle>
          </CardHeader>
          <CardContent className='space-y-3'>
            {programsLoading ? (
              <div className='text-center py-4'>
                <div className='animate-spin rounded-full h-6 w-6 border-b-2 border-blue-600 mx-auto'></div>
                <p className='text-sm text-gray-500 mt-2'>
                  Loading programs...
                </p>
              </div>
            ) : programs.length > 0 ? (
              programs.slice(0, 3).map((program) => (
                <div
                  key={program.id}
                  className='border border-gray-200 rounded-lg p-3 hover:bg-gray-50'
                >
                  <div className='flex items-center justify-between mb-2'>
                    <h4 className='font-semibold text-sm text-gray-900'>
                      {program.title}
                    </h4>
                    <Badge
                      variant={program.is_active ? 'default' : 'secondary'}
                      className='text-xs'
                    >
                      {program.is_active ? 'Active' : 'Inactive'}
                    </Badge>
                  </div>
                  <div className='grid grid-cols-2 gap-2 text-xs text-gray-600 mb-3'>
                    <div>
                      <span className='font-medium'>
                        {program.program_type}
                      </span>
                    </div>
                    <div>
                      <span className='font-medium'>
                        {program.duration_months} months
                      </span>
                    </div>
                  </div>
                  <div className='flex gap-2'>
                    <Button
                      size='sm'
                      className='flex-1 bg-blue-600 hover:bg-blue-700 text-white text-xs rounded-full'
                      onClick={() => navigate('/programs/' + program.id)}
                    >
                      <BarChart3 className='h-3 w-3 mr-1' />
                      View
                    </Button>
                    <Button
                      size='sm'
                      variant='outline'
                      className='flex-1 text-xs rounded-full'
                    >
                      <Edit className='h-3 w-3 mr-1' />
                      Edit
                    </Button>
                  </div>
                </div>
              ))
            ) : (
              <div className='text-center py-4'>
                <GraduationCap className='h-8 w-8 text-gray-400 mx-auto mb-2' />
                <p className='text-sm text-gray-500'>No programs yet</p>
                <Button
                  size='sm'
                  variant='outline'
                  className='mt-2'
                  onClick={() => navigate('/programs')}
                >
                  Create Program
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
                Increase your program visibility
              </h4>
              <p className='text-xs text-gray-600 mb-3'>
                Reach more qualified students with our targeted advertising
                platform.
              </p>
              <div className='flex items-center justify-center gap-2 mb-3'>
                <div className='w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center'>
                  <Globe className='h-4 w-4 text-blue-600' />
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
          onClick={() => navigate('/dashboard/messages')}
        >
          <MessageSquare className='h-5 w-5' />
        </Button>
      </div>
    </div>
  );
};

export default UniversityDashboard;
