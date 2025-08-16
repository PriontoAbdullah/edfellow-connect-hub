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
import {
  Users,
  MessageSquare,
  BookOpen,
  Calendar,
  TrendingUp,
  Award,
  Bell,
  Search,
  Heart,
  Target,
  ArrowRight,
  Plus,
  FileText,
  Image,
  BarChart3,
  ChevronDown,
  Star,
  MapPin,
  Building,
  ExternalLink,
  Check,
  Eye,
  Bookmark,
  Newspaper,
  Clock,
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
  Briefcase,
  Lightbulb,
  BookMarked,
  Target as TargetIcon,
} from 'lucide-react';

const StudentDashboard = () => {
  const navigate = useNavigate();
  const [postContent, setPostContent] = useState('');

  // Scroll to top on component mount
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);

  // Mock user data
  const user = {
    name: 'Zunnun Zihan',
    avatar: '/api/placeholder/40/40',
    title: 'Computer Science',
    university: 'University of Technology',
    location: 'Bangladesh',
    rating: 4.0,
    profileViews: 26,
    role: 'student',
  };

  const feedPosts = [
    {
      id: 1,
      author: 'Study Group - CS201',
      avatar: '/api/placeholder/40/40',
      time: '2 hours ago',
      content:
        'Pro tip: When studying algorithms, try to implement each one from scratch before looking at optimizations. It really helps with understanding the core concepts!',
      tag: 'Study Tips',
      tagColor: 'bg-green-100 text-green-800',
      likes: 24,
      comments: 8,
      shares: 3,
    },
    {
      id: 2,
      author: 'Dr. Michael Rodriguez',
      avatar: '/api/placeholder/40/40',
      time: '4 hours ago',
      content:
        'Excited to announce our new research project on quantum computing applications in cryptography. Looking for graduate students interested in this field!',
      tag: 'Research',
      tagColor: 'bg-purple-100 text-purple-800',
      likes: 56,
      comments: 12,
      shares: 7,
    },
    {
      id: 3,
      author: 'Scholarship Board',
      avatar: '/api/placeholder/40/40',
      time: '6 hours ago',
      content:
        'The Gates Cambridge Scholarship is now open for applications! Full funding for graduate study at Cambridge University. Deadline: December 1st.',
      tag: 'Scholarship',
      tagColor: 'bg-yellow-100 text-yellow-800',
      likes: 89,
      comments: 23,
      shares: 15,
    },
    {
      id: 4,
      author: 'Career Center',
      avatar: '/api/placeholder/40/40',
      time: '1 day ago',
      content:
        'Master the art of technical interviews with our new workshop series. Learn data structures, algorithms, and system design from industry experts.',
      tag: 'Career Skills',
      tagColor: 'bg-blue-100 text-blue-800',
      likes: 45,
      comments: 15,
      shares: 8,
    },
    {
      id: 5,
      author: 'Campus Events',
      avatar: '/api/placeholder/40/40',
      time: '1 day ago',
      content:
        'Join us for the annual Tech Innovation Fair next Friday! Meet startups, explore internships, and network with industry professionals.',
      tag: 'Campus Event',
      tagColor: 'bg-pink-100 text-pink-800',
      likes: 67,
      comments: 9,
      shares: 12,
    },
  ];

  const handlePostSubmit = () => {
    if (postContent.trim()) {
      // Handle post submission
      console.log('Post submitted:', postContent);
      setPostContent('');
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
                <AvatarFallback className='bg-blue-100 text-blue-600'>
                  {user.name
                    .split(' ')
                    .map((n) => n[0])
                    .join('')}
                </AvatarFallback>
              </Avatar>
              <div className='flex-1'>
                <Textarea
                  placeholder='Start a post'
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
        {/* Quick Actions */}
        <Card className='bg-white border border-gray-200 shadow-sm'>
          <CardHeader className='pb-3'>
            <CardTitle className='text-lg font-semibold text-gray-900'>
              Quick Actions
            </CardTitle>
          </CardHeader>
          <CardContent className='space-y-2'>
            <Button
              variant='ghost'
              className='w-full justify-start text-gray-600 hover:text-gray-900 hover:bg-gray-50'
              onClick={() => navigate('/dashboard/field-of-study')}
            >
              <BookOpen className='h-4 w-4 mr-3' />
              Field of Study
            </Button>
            <Button
              variant='ghost'
              className='w-full justify-start text-gray-600 hover:text-gray-900 hover:bg-gray-50'
              onClick={() => navigate('/dashboard/mentorship')}
            >
              <Heart className='h-4 w-4 mr-3' />
              Find Mentors
            </Button>
            <Button
              variant='ghost'
              className='w-full justify-start text-gray-600 hover:text-gray-900 hover:bg-gray-50'
              onClick={() => navigate('/dashboard/career-exploration')}
            >
              <Briefcase className='h-4 w-4 mr-3' />
              Career Center
            </Button>
            <Button
              variant='ghost'
              className='w-full justify-start text-gray-600 hover:text-gray-900 hover:bg-gray-50'
              onClick={() => navigate('/dashboard/scholarships')}
            >
              <Award className='h-4 w-4 mr-3' />
              Scholarships
            </Button>
          </CardContent>
        </Card>

        {/* Academic Progress */}
        <Card className='bg-white border border-gray-200 shadow-sm'>
          <CardHeader className='pb-3'>
            <CardTitle className='text-lg font-semibold text-gray-900'>
              Academic Progress
            </CardTitle>
          </CardHeader>
          <CardContent className='space-y-3'>
            <div className='space-y-3'>
              <div className='flex items-center justify-between'>
                <span className='text-sm text-gray-600'>Courses Completed</span>
                <span className='text-sm font-medium'>12/20</span>
              </div>
              <div className='w-full bg-gray-200 rounded-full h-2'>
                <div
                  className='bg-blue-600 h-2 rounded-full'
                  style={{ width: '60%' }}
                ></div>
              </div>
            </div>
            <div className='space-y-3'>
              <div className='flex items-center justify-between'>
                <span className='text-sm text-gray-600'>GPA</span>
                <span className='text-sm font-medium'>3.8/4.0</span>
              </div>
              <div className='w-full bg-gray-200 rounded-full h-2'>
                <div
                  className='bg-green-600 h-2 rounded-full'
                  style={{ width: '95%' }}
                ></div>
              </div>
            </div>
            <div className='space-y-3'>
              <div className='flex items-center justify-between'>
                <span className='text-sm text-gray-600'>Study Hours</span>
                <span className='text-sm font-medium'>45/50 hrs</span>
              </div>
              <div className='w-full bg-gray-200 rounded-full h-2'>
                <div
                  className='bg-yellow-600 h-2 rounded-full'
                  style={{ width: '90%' }}
                ></div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Upcoming Deadlines */}
        <Card className='bg-white border border-gray-200 shadow-sm'>
          <CardHeader className='pb-3'>
            <CardTitle className='text-lg font-semibold text-gray-900'>
              Upcoming Deadlines
            </CardTitle>
          </CardHeader>
          <CardContent className='space-y-3'>
            <div className='border border-gray-200 rounded-lg p-3'>
              <div className='flex items-center gap-3 mb-2'>
                <div className='w-8 h-8 bg-red-100 rounded-full flex items-center justify-center'>
                  <Calendar className='h-4 w-4 text-red-600' />
                </div>
                <div>
                  <h4 className='font-semibold text-sm text-gray-900'>
                    Final Project Submission
                  </h4>
                  <p className='text-xs text-gray-600'>Due: Dec 15, 2024</p>
                </div>
              </div>
            </div>
            <div className='border border-gray-200 rounded-lg p-3'>
              <div className='flex items-center gap-3 mb-2'>
                <div className='w-8 h-8 bg-yellow-100 rounded-full flex items-center justify-center'>
                  <Award className='h-4 w-4 text-yellow-600' />
                </div>
                <div>
                  <h4 className='font-semibold text-sm text-gray-900'>
                    Scholarship Application
                  </h4>
                  <p className='text-xs text-gray-600'>Due: Dec 30, 2024</p>
                </div>
              </div>
            </div>
            <div className='border border-gray-200 rounded-lg p-3'>
              <div className='flex items-center gap-3 mb-2'>
                <div className='w-8 h-8 bg-green-100 rounded-full flex items-center justify-center'>
                  <TargetIcon className='h-4 w-4 text-green-600' />
                </div>
                <div>
                  <h4 className='font-semibold text-sm text-gray-900'>
                    Career Fair Registration
                  </h4>
                  <p className='text-xs text-gray-600'>Jan 20, 2024</p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Study Groups */}
        <Card className='bg-white border border-gray-200 shadow-sm'>
          <CardHeader className='pb-3'>
            <CardTitle className='text-lg font-semibold text-gray-900'>
              Your Study Groups
            </CardTitle>
          </CardHeader>
          <CardContent className='space-y-3'>
            <div className='border border-gray-200 rounded-lg p-3 hover:bg-gray-50'>
              <div className='flex items-center justify-between mb-2'>
                <h4 className='font-semibold text-sm text-gray-900'>
                  CS Study Group
                </h4>
                <Badge className='text-xs bg-blue-100 text-blue-800'>
                  12 active
                </Badge>
              </div>
              <div className='flex items-center justify-between text-xs text-gray-600 mb-3'>
                <span>45 members</span>
                <span>2 hours ago</span>
              </div>
              <Button size='sm' variant='outline' className='w-full text-xs'>
                View Group
              </Button>
            </div>
            <div className='border border-gray-200 rounded-lg p-3 hover:bg-gray-50'>
              <div className='flex items-center justify-between mb-2'>
                <h4 className='font-semibold text-sm text-gray-900'>
                  Algorithm Masters
                </h4>
                <Badge className='text-xs bg-green-100 text-green-800'>
                  8 active
                </Badge>
              </div>
              <div className='flex items-center justify-between text-xs text-gray-600 mb-3'>
                <span>28 members</span>
                <span>1 day ago</span>
              </div>
              <Button size='sm' variant='outline' className='w-full text-xs'>
                View Group
              </Button>
            </div>
            <Button
              variant='ghost'
              className='w-full text-blue-600 hover:text-blue-700 text-sm'
            >
              View all groups →
            </Button>
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

export default StudentDashboard;
