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
} from 'lucide-react';

const ProfessorDashboard = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [postContent, setPostContent] = useState('');

  // Scroll to top on component mount
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);

  // Mock user data
  const user = {
    name: 'Dr. Sarah Johnson',
    avatar: '/api/placeholder/40/40',
    title: 'Professor of Computer Science',
    university: 'MIT',
    location: 'Cambridge, MA',
    rating: 4.8,
    profileViews: 156,
    role: 'professor',
  };

  const feedPosts = [
    {
      id: 1,
      author: 'Dr. Sarah Johnson',
      avatar: '/api/placeholder/40/40',
      time: '1 hour ago',
      content:
        'Excited to share that our research paper on "Quantum Computing Applications in Cryptography" has been accepted for publication in Nature! This represents years of collaborative work with brilliant students and colleagues.',
      tag: 'Research',
      tagColor: 'bg-purple-100 text-purple-800',
      likes: 89,
      comments: 23,
      shares: 12,
    },
    {
      id: 2,
      author: 'AI Research Network',
      avatar: '/api/placeholder/40/40',
      time: '3 hours ago',
      content:
        'Call for Papers: International Conference on Artificial Intelligence and Machine Learning. Submit your research by January 15th. Early career researchers and students are especially encouraged to apply!',
      tag: 'Conference',
      tagColor: 'bg-blue-100 text-blue-800',
      likes: 45,
      comments: 8,
      shares: 15,
    },
    {
      id: 3,
      author: 'Computer Science Faculty',
      avatar: '/api/placeholder/40/40',
      time: '5 hours ago',
      content:
        "Our department is hiring! We're looking for tenure-track faculty in Computer Science with expertise in AI/ML, Cybersecurity, or Software Engineering. Please share with your networks.",
      tag: 'Hiring',
      tagColor: 'bg-green-100 text-green-800',
      likes: 67,
      comments: 12,
      shares: 28,
    },
    {
      id: 4,
      author: 'Academic Writing Circle',
      avatar: '/api/placeholder/40/40',
      time: '1 day ago',
      content:
        "Writing tip: When crafting research papers, start with a clear problem statement. Your introduction should answer: What problem are you solving? Why does it matter? What's your approach?",
      tag: 'Writing Tips',
      tagColor: 'bg-yellow-100 text-yellow-800',
      likes: 34,
      comments: 6,
      shares: 9,
    },
    {
      id: 5,
      author: 'Mentorship Program',
      avatar: '/api/placeholder/40/40',
      time: '1 day ago',
      content:
        'Congratulations to all students who completed our summer research program! Your dedication and innovative thinking have been inspiring. Looking forward to seeing your continued success.',
      tag: 'Student Success',
      tagColor: 'bg-pink-100 text-pink-800',
      likes: 78,
      comments: 15,
      shares: 11,
    },
  ];

  const mentorshipRequests = [
    {
      id: 1,
      student: 'John Doe',
      major: 'Computer Science',
      message: 'Seeking guidance on AI research...',
      time: '2h ago',
    },
    {
      id: 2,
      student: 'Maria Chen',
      major: 'Data Science',
      message: 'Need help with thesis topic...',
      time: '1d ago',
    },
    {
      id: 3,
      student: 'Alex Rodriguez',
      major: 'Computer Science',
      message: 'Questions about PhD applications...',
      time: '2d ago',
    },
  ];

  const upcomingSessions = [
    {
      id: 1,
      student: 'Alice Wang',
      topic: 'PhD Application Review',
      time: 'Today 2:00 PM',
      duration: '1 hour',
    },
    {
      id: 2,
      student: 'Bob Smith',
      topic: 'Research Methodology',
      time: 'Tomorrow 10:00 AM',
      duration: '45 min',
    },
    {
      id: 3,
      student: 'Carol Johnson',
      topic: 'Career Guidance',
      time: 'Dec 30 3:00 PM',
      duration: '1 hour',
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
        {/* Mentorship Requests */}
        <Card className='bg-white border border-gray-200 shadow-sm'>
          <CardHeader className='pb-3'>
            <CardTitle className='text-lg font-semibold text-gray-900'>
              Mentorship Requests
            </CardTitle>
          </CardHeader>
          <CardContent className='space-y-3'>
            {mentorshipRequests.map((request) => (
              <div
                key={request.id}
                className='border border-gray-200 rounded-lg p-3 hover:bg-gray-50'
              >
                <div className='flex items-center justify-between mb-2'>
                  <div className='flex items-center gap-3'>
                    <Avatar className='h-8 w-8'>
                      <AvatarFallback className='bg-blue-100 text-blue-600'>
                        {request.student
                          .split(' ')
                          .map((n) => n[0])
                          .join('')}
                      </AvatarFallback>
                    </Avatar>
                    <div>
                      <h4 className='font-semibold text-sm text-gray-900'>
                        {request.student}
                      </h4>
                      <p className='text-xs text-gray-600'>{request.major}</p>
                    </div>
                  </div>
                  <span className='text-xs text-gray-500'>{request.time}</span>
                </div>
                <p className='text-sm text-gray-700 mb-3 line-clamp-2'>
                  {request.message}
                </p>
                <div className='flex gap-2'>
                  <Button
                    size='sm'
                    className='bg-green-600 hover:bg-green-700 text-white text-xs rounded-full flex-1'
                  >
                    <CheckCircle className='h-3 w-3 mr-1' />
                    Accept
                  </Button>
                  <Button
                    size='sm'
                    variant='outline'
                    className='text-xs rounded-full flex-1'
                  >
                    <XCircle className='h-3 w-3 mr-1' />
                    Decline
                  </Button>
                </div>
              </div>
            ))}
            <Button
              variant='ghost'
              className='w-full text-blue-600 hover:text-blue-700 text-sm'
            >
              View all requests →
            </Button>
          </CardContent>
        </Card>

        {/* Today's Schedule */}
        <Card className='bg-white border border-gray-200 shadow-sm'>
          <CardHeader className='pb-3'>
            <CardTitle className='text-lg font-semibold text-gray-900'>
              Today's Schedule
            </CardTitle>
          </CardHeader>
          <CardContent className='space-y-3'>
            {upcomingSessions.map((session) => (
              <div
                key={session.id}
                className='border border-gray-200 rounded-lg p-3 bg-blue-50'
              >
                <div className='flex items-center justify-between mb-2'>
                  <div>
                    <h4 className='font-semibold text-sm text-gray-900'>
                      {session.student}
                    </h4>
                    <p className='text-xs text-gray-600'>{session.topic}</p>
                  </div>
                  <Badge variant='outline' className='text-xs'>
                    {session.duration}
                  </Badge>
                </div>
                <p className='text-sm text-blue-700 font-medium mb-2'>
                  {session.time}
                </p>
                <div className='flex gap-2'>
                  <Button
                    size='sm'
                    variant='outline'
                    className='flex-1 text-xs rounded-full'
                  >
                    <Clock className='h-3 w-3 mr-1' />
                    Reschedule
                  </Button>
                  <Button
                    size='sm'
                    className='flex-1 bg-blue-600 hover:bg-blue-700 text-white text-xs rounded-full'
                  >
                    <Video className='h-3 w-3 mr-1' />
                    Join Call
                  </Button>
                </div>
              </div>
            ))}
            <Button
              variant='ghost'
              className='w-full text-blue-600 hover:text-blue-700 text-sm'
            >
              View full schedule →
            </Button>
          </CardContent>
        </Card>

        {/* Earnings Overview */}
        <Card className='bg-white border border-gray-200 shadow-sm'>
          <CardHeader className='pb-3'>
            <CardTitle className='text-lg font-semibold text-gray-900'>
              Earnings Overview
            </CardTitle>
          </CardHeader>
          <CardContent className='space-y-3'>
            <div className='grid grid-cols-2 gap-3'>
              <div className='text-center p-3 bg-green-50 rounded-lg'>
                <div className='text-lg font-bold text-green-600'>$3,450</div>
                <div className='text-xs text-gray-600'>This Month</div>
              </div>
              <div className='text-center p-3 bg-blue-50 rounded-lg'>
                <div className='text-lg font-bold text-blue-600'>$28,750</div>
                <div className='text-xs text-gray-600'>Total Earned</div>
              </div>
            </div>
            <Button
              variant='outline'
              className='w-full border-blue-200 text-blue-600 hover:bg-blue-50'
            >
              <BarChart3 className='h-4 w-4 mr-2' />
              View Analytics
            </Button>
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
