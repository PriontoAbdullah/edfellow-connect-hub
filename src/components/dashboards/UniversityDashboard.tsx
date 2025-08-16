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
  const [postContent, setPostContent] = useState('');

  // Scroll to top on component mount
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);

  // Mock user data
  const user = {
    name: 'MIT University',
    avatar: '/api/placeholder/40/40',
    title: 'University Administrator',
    university: 'Massachusetts Institute of Technology',
    location: 'Cambridge, MA',
    rating: 4.9,
    profileViews: 234,
    role: 'university',
  };

  const feedPosts = [
    {
      id: 1,
      author: 'MIT University',
      avatar: '/api/placeholder/40/40',
      time: '2 hours ago',
      content:
        'Excited to announce our new Master of Computer Science program starting Fall 2024! This program combines cutting-edge research with industry collaboration. Applications now open.',
      tag: 'New Program',
      tagColor: 'bg-blue-100 text-blue-800',
      likes: 156,
      comments: 34,
      shares: 28,
    },
    {
      id: 2,
      author: 'MIT Admissions',
      avatar: '/api/placeholder/40/40',
      time: '4 hours ago',
      content:
        "Join us for our virtual campus tour this Friday! Experience MIT's state-of-the-art facilities, meet current students, and learn about our innovative programs. Register now!",
      tag: 'Campus Tour',
      tagColor: 'bg-green-100 text-green-800',
      likes: 89,
      comments: 12,
      shares: 15,
    },
    {
      id: 3,
      author: 'MIT Research',
      avatar: '/api/placeholder/40/40',
      time: '6 hours ago',
      content:
        'Our researchers have made a breakthrough in quantum computing! This discovery could revolutionize how we approach complex computational problems. Read more in our latest research publication.',
      tag: 'Research',
      tagColor: 'bg-purple-100 text-purple-800',
      likes: 234,
      comments: 45,
      shares: 67,
    },
    {
      id: 4,
      author: 'MIT Career Services',
      avatar: '/api/placeholder/40/40',
      time: '1 day ago',
      content:
        'Congratulations to our graduating class! 95% of our students have secured positions at top companies or been accepted to prestigious graduate programs. Your future starts here!',
      tag: 'Student Success',
      tagColor: 'bg-yellow-100 text-yellow-800',
      likes: 178,
      comments: 23,
      shares: 34,
    },
    {
      id: 5,
      author: 'MIT International',
      avatar: '/api/placeholder/40/40',
      time: '1 day ago',
      content:
        "We're proud to welcome students from 120+ countries! Our diverse community brings together the brightest minds from around the world. Apply now for international student programs.",
      tag: 'International',
      tagColor: 'bg-pink-100 text-pink-800',
      likes: 145,
      comments: 18,
      shares: 22,
    },
  ];

  const myPrograms = [
    {
      id: 1,
      name: 'Master of Computer Science',
      applications: 1250,
      views: 5670,
      status: 'Active',
      type: "Master's Degree",
      duration: '2 years',
      fees: '25,000',
    },
    {
      id: 2,
      name: 'Business Analytics PhD',
      applications: 340,
      views: 1890,
      status: 'Active',
      type: 'PhD Program',
      duration: '4 years',
      fees: '35,000',
    },
    {
      id: 3,
      name: 'Data Science Certificate',
      applications: 890,
      views: 3240,
      status: 'Review',
      type: 'Certificate',
      duration: '1 year',
      fees: '15,000',
    },
  ];

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

  const handlePostSubmit = () => {
    if (postContent.trim()) {
      // Handle post submission
      console.log('Post submitted:', postContent);
      setPostContent('');
      toast({
        title: 'Post Published',
        description: 'Your post has been shared with your network.',
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
                onClick={handlePostSubmit}
                disabled={!postContent.trim()}
                className='bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-full'
              >
                Post
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Feed Posts */}
        {feedPosts.map((post) => (
          <Card
            key={post.id}
            className='bg-white border border-gray-200 shadow-sm'
          >
            <CardContent className='p-4'>
              <div className='flex items-start gap-3 mb-3'>
                <Avatar className='h-10 w-10'>
                  <AvatarImage src={post.avatar} alt={post.author} />
                  <AvatarFallback className='bg-gray-100 text-gray-600'>
                    {post.author
                      .split(' ')
                      .map((n) => n[0])
                      .join('')}
                  </AvatarFallback>
                </Avatar>
                <div className='flex-1'>
                  <div className='flex items-center gap-2 mb-1'>
                    <h4 className='font-semibold text-gray-900 text-sm'>
                      {post.author}
                    </h4>
                    <span className='text-xs text-gray-500'>•</span>
                    <span className='text-xs text-gray-500'>{post.time}</span>
                  </div>
                  <Badge className={`text-xs ${post.tagColor}`}>
                    {post.tag}
                  </Badge>
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
              <div className='flex items-center justify-between text-sm text-gray-600 pt-3 border-t border-gray-100'>
                <div className='flex items-center gap-6'>
                  <Button
                    variant='ghost'
                    size='sm'
                    className='hover:text-blue-600 hover:bg-blue-50 rounded-lg'
                  >
                    <ThumbsUp className='h-4 w-4 mr-1' />
                    {post.likes}
                  </Button>
                  <Button
                    variant='ghost'
                    size='sm'
                    className='hover:text-blue-600 hover:bg-blue-50 rounded-lg'
                  >
                    <MessageSquare className='h-4 w-4 mr-1' />
                    {post.comments}
                  </Button>
                  <Button
                    variant='ghost'
                    size='sm'
                    className='hover:text-blue-600 hover:bg-blue-50 rounded-lg'
                  >
                    <Share2 className='h-4 w-4 mr-1' />
                    {post.shares}
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
        ))}
      </div>

      {/* Right Sidebar */}
      <div className='lg:col-span-4 space-y-4'>
        {/* My Programs */}
        <Card className='bg-white border border-gray-200 shadow-sm'>
          <CardHeader className='pb-3'>
            <CardTitle className='text-lg font-semibold text-gray-900'>
              My Programs
            </CardTitle>
          </CardHeader>
          <CardContent className='space-y-3'>
            {myPrograms.map((program) => (
              <div
                key={program.id}
                className='border border-gray-200 rounded-lg p-3 hover:bg-gray-50'
              >
                <div className='flex items-center justify-between mb-2'>
                  <h4 className='font-semibold text-sm text-gray-900'>
                    {program.name}
                  </h4>
                  <Badge
                    variant={
                      program.status === 'Active' ? 'default' : 'secondary'
                    }
                    className='text-xs'
                  >
                    {program.status}
                  </Badge>
                </div>
                <div className='grid grid-cols-2 gap-2 text-xs text-gray-600 mb-3'>
                  <div>
                    <span className='font-medium'>{program.applications}</span>{' '}
                    applications
                  </div>
                  <div>
                    <span className='font-medium'>{program.views}</span> views
                  </div>
                </div>
                <div className='flex gap-2'>
                  <Button
                    size='sm'
                    className='flex-1 bg-blue-600 hover:bg-blue-700 text-white text-xs rounded-full'
                  >
                    <BarChart3 className='h-3 w-3 mr-1' />
                    Analytics
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
            ))}
            <Button
              variant='ghost'
              className='w-full text-blue-600 hover:text-blue-700 text-sm'
            >
              View all programs →
            </Button>
          </CardContent>
        </Card>

        {/* Student Inquiries */}
        <Card className='bg-white border border-gray-200 shadow-sm'>
          <CardHeader className='pb-3'>
            <CardTitle className='text-lg font-semibold text-gray-900'>
              Student Inquiries
            </CardTitle>
          </CardHeader>
          <CardContent className='space-y-3'>
            {studentInquiries.map((inquiry) => (
              <div
                key={inquiry.id}
                className='border border-gray-200 rounded-lg p-3 hover:bg-gray-50'
              >
                <div className='flex items-start justify-between mb-2'>
                  <div className='flex items-center gap-3'>
                    <Avatar className='h-8 w-8'>
                      <AvatarFallback className='bg-green-100 text-green-600'>
                        {inquiry.student
                          .split(' ')
                          .map((n) => n[0])
                          .join('')}
                      </AvatarFallback>
                    </Avatar>
                    <div>
                      <h4 className='font-semibold text-sm text-gray-900'>
                        {inquiry.student}
                      </h4>
                      <p className='text-xs text-gray-600'>{inquiry.program}</p>
                    </div>
                  </div>
                  <Badge
                    variant={
                      inquiry.priority === 'high'
                        ? 'destructive'
                        : inquiry.priority === 'medium'
                        ? 'secondary'
                        : 'outline'
                    }
                    className='text-xs'
                  >
                    {inquiry.priority}
                  </Badge>
                </div>
                <p className='text-sm text-gray-700 mb-3 line-clamp-2'>
                  {inquiry.message}
                </p>
                <div className='flex gap-2'>
                  <Button
                    size='sm'
                    className='bg-green-600 hover:bg-green-700 text-white text-xs rounded-full flex-1'
                  >
                    <FileText className='h-3 w-3 mr-1' />
                    Info Pack
                  </Button>
                  <Button
                    size='sm'
                    variant='outline'
                    className='text-xs rounded-full flex-1'
                  >
                    <Send className='h-3 w-3 mr-1' />
                    Reply
                  </Button>
                </div>
              </div>
            ))}
            <Button
              variant='ghost'
              className='w-full text-blue-600 hover:text-blue-700 text-sm'
            >
              View all inquiries →
            </Button>
          </CardContent>
        </Card>

        {/* Upcoming Live Sessions */}
        <Card className='bg-white border border-gray-200 shadow-sm'>
          <CardHeader className='pb-3'>
            <CardTitle className='text-lg font-semibold text-gray-900'>
              Upcoming Live Sessions
            </CardTitle>
          </CardHeader>
          <CardContent className='space-y-3'>
            {upcomingSessions.map((session) => (
              <div
                key={session.id}
                className='border border-gray-200 rounded-lg p-3'
              >
                <div className='flex items-center justify-between mb-2'>
                  <h4 className='font-semibold text-sm text-gray-900'>
                    {session.title}
                  </h4>
                  <Badge
                    variant={
                      session.status === 'Live' ? 'destructive' : 'secondary'
                    }
                    className='text-xs'
                  >
                    {session.status}
                  </Badge>
                </div>
                <div className='text-xs text-gray-600 mb-3'>
                  <div className='flex items-center gap-2'>
                    <Calendar className='h-3 w-3' />
                    {session.date}
                  </div>
                  <div className='flex items-center gap-2 mt-1'>
                    <Users className='h-3 w-3' />
                    {session.registrations} registrations
                  </div>
                </div>
                <div className='grid grid-cols-2 gap-2'>
                  <Button
                    size='sm'
                    className='bg-purple-600 hover:bg-purple-700 text-white text-xs rounded-full'
                  >
                    <Video className='h-3 w-3 mr-1' />
                    Start
                  </Button>
                  <Button
                    size='sm'
                    variant='outline'
                    className='text-xs rounded-full'
                  >
                    <Settings className='h-3 w-3 mr-1' />
                    Settings
                  </Button>
                </div>
              </div>
            ))}
            <Button
              variant='ghost'
              className='w-full text-blue-600 hover:text-blue-700 text-sm'
            >
              View all sessions →
            </Button>
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
