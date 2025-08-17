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
    country: 'Bangladesh',
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
    <div className='max-w-7xl mx-auto px-4 pb-6'>
      <div className='grid grid-cols-1 lg:grid-cols-12 gap-6'>
        {/* Main Content Area */}
        <div className='lg:col-span-8 space-y-4'>
          {/* Start a Post */}
          <Card className='bg-white border border-gray-200 shadow-sm rounded-xl overflow-hidden'>
            <CardContent className='p-6'>
              <div className='flex items-start gap-4 mb-6'>
                <Avatar className='h-12 w-12 ring-2 ring-gray-100'>
                  <AvatarImage src={user.avatar} alt={user.name} />
                  <AvatarFallback className='bg-gradient-to-br from-blue-500 to-blue-600 text-white font-semibold'>
                    {user.name
                      .split(' ')
                      .map((n) => n[0])
                      .join('')}
                  </AvatarFallback>
                </Avatar>
                <div className='flex-1'>
                  <Textarea
                    placeholder='What do you want to talk about?'
                    value={postContent}
                    onChange={(e) => setPostContent(e.target.value)}
                    className='min-h-[100px] resize-none border-0 focus:ring-0 text-base bg-gray-50 rounded-2xl p-4 placeholder:text-gray-500 hover:bg-gray-100 transition-colors'
                  />
                </div>
              </div>
              <div className='flex items-center justify-between pt-4 border-t border-gray-100'>
                <div className='flex items-center gap-2'>
                  <Button
                    variant='ghost'
                    size='sm'
                    className='text-gray-600 hover:text-blue-600 hover:bg-blue-50 rounded-full px-4 py-2 transition-all duration-200'
                  >
                    <Image className='h-5 w-5 mr-2' />
                    Media
                  </Button>
                  <Button
                    variant='ghost'
                    size='sm'
                    className='text-gray-600 hover:text-blue-600 hover:bg-blue-50 rounded-full px-4 py-2 transition-all duration-200'
                  >
                    <Calendar className='h-5 w-5 mr-2' />
                    Event
                  </Button>
                  <Button
                    variant='ghost'
                    size='sm'
                    className='text-gray-600 hover:text-blue-600 hover:bg-blue-50 rounded-full px-4 py-2 transition-all duration-200'
                  >
                    <FileText className='h-5 w-5 mr-2' />
                    Write article
                  </Button>
                </div>
                <Button
                  onClick={handlePostSubmit}
                  disabled={!postContent.trim()}
                  className='bg-blue-600 hover:bg-blue-700 text-white px-8 py-2.5 rounded-full font-medium transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed'
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
              className='bg-white border border-gray-200 shadow-sm rounded-xl overflow-hidden hover:shadow-md transition-shadow duration-200'
            >
              <CardContent className='p-6'>
                <div className='flex items-start gap-4 mb-4'>
                  <Avatar className='h-12 w-12 ring-2 ring-gray-100'>
                    <AvatarImage src={post.avatar} alt={post.author} />
                    <AvatarFallback className='bg-gradient-to-br from-gray-500 to-gray-600 text-white font-semibold'>
                      {post.author
                        .split(' ')
                        .map((n) => n[0])
                        .join('')}
                    </AvatarFallback>
                  </Avatar>
                  <div className='flex-1'>
                    <div className='flex items-center gap-2 mb-2'>
                      <h4 className='font-semibold text-gray-900 text-base'>
                        {post.author}
                      </h4>
                      <span className='text-sm text-gray-500'>•</span>
                      <span className='text-sm text-gray-500'>{post.time}</span>
                    </div>
                    <Badge
                      className={`text-xs px-2 py-1 rounded-full ${post.tagColor} font-medium`}
                    >
                      {post.tag}
                    </Badge>
                  </div>
                  <Button
                    variant='ghost'
                    size='sm'
                    className='text-gray-500 hover:text-gray-700 hover:bg-gray-100 rounded-full p-2'
                  >
                    <MoreHorizontal className='h-4 w-4' />
                  </Button>
                </div>
                <p className='text-base text-gray-900 mb-6 leading-relaxed'>
                  {post.content}
                </p>
                <div className='flex items-center justify-between text-sm text-gray-600 pt-4 border-t border-gray-100'>
                  <div className='flex items-center gap-8'>
                    <Button
                      variant='ghost'
                      size='sm'
                      className='hover:text-blue-600 hover:bg-blue-50 rounded-full px-4 py-2 transition-all duration-200'
                    >
                      <ThumbsUp className='h-4 w-4 mr-2' />
                      <span className='font-medium'>{post.likes}</span>
                    </Button>
                    <Button
                      variant='ghost'
                      size='sm'
                      className='hover:text-blue-600 hover:bg-blue-50 rounded-full px-4 py-2 transition-all duration-200'
                    >
                      <MessageSquare className='h-4 w-4 mr-2' />
                      <span className='font-medium'>{post.comments}</span>
                    </Button>
                    <Button
                      variant='ghost'
                      size='sm'
                      className='hover:text-blue-600 hover:bg-blue-50 rounded-full px-4 py-2 transition-all duration-200'
                    >
                      <Share2 className='h-4 w-4 mr-2' />
                      <span className='font-medium'>{post.shares}</span>
                    </Button>
                  </div>
                  <Button
                    variant='ghost'
                    size='sm'
                    className='hover:text-blue-600 hover:bg-blue-50 rounded-full p-2 transition-all duration-200'
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
          {/* Smart Match System */}
          <Card className='bg-white border border-gray-200 shadow-sm rounded-xl overflow-hidden'>
            <CardHeader className='pb-3'>
              <CardTitle className='text-lg font-semibold text-gray-900'>
                Smart Match System
              </CardTitle>
            </CardHeader>
            <CardContent className='space-y-3'>
              <div className='border border-gray-200 rounded-lg p-3 hover:bg-gray-50'>
                <div className='flex items-start gap-3'>
                  <Avatar className='h-10 w-10 flex-shrink-0'>
                    <AvatarImage
                      src='/api/placeholder/40/40'
                      alt='Dr. Sarah Chen'
                    />
                    <AvatarFallback className='bg-gray-100 text-gray-600'>
                      SC
                    </AvatarFallback>
                  </Avatar>
                  <div className='flex-1 min-w-0'>
                    <div className='flex items-center gap-2 mb-1'>
                      <h4 className='font-semibold text-sm text-gray-900 truncate'>
                        Dr. Sarah Chen
                      </h4>
                      <Badge className='text-xs bg-green-100 text-green-800 flex-shrink-0'>
                        92%
                      </Badge>
                    </div>
                    <p className='text-xs text-gray-600'>
                      AI Research Professor
                    </p>
                    <p className='text-xs text-gray-600'>MIT</p>
                    <Button
                      size='sm'
                      variant='outline'
                      className='w-full text-xs mt-2'
                    >
                      Connect
                    </Button>
                  </div>
                </div>
              </div>
              <div className='border border-gray-200 rounded-lg p-3 hover:bg-gray-50'>
                <div className='flex items-start gap-3'>
                  <Avatar className='h-10 w-10 flex-shrink-0'>
                    <AvatarImage
                      src='/api/placeholder/40/40'
                      alt='Alex Kumar'
                    />
                    <AvatarFallback className='bg-gray-100 text-gray-600'>
                      AK
                    </AvatarFallback>
                  </Avatar>
                  <div className='flex-1 min-w-0'>
                    <div className='flex items-center gap-2 mb-1'>
                      <h4 className='font-semibold text-sm text-gray-900 truncate'>
                        Alex Kumar
                      </h4>
                      <Badge className='text-xs bg-green-100 text-green-800 flex-shrink-0'>
                        87%
                      </Badge>
                    </div>
                    <p className='text-xs text-gray-600'>CS Student</p>
                    <p className='text-xs text-gray-600'>Stanford University</p>
                    <Button
                      size='sm'
                      variant='outline'
                      className='w-full text-xs mt-2'
                    >
                      Connect
                    </Button>
                  </div>
                </div>
              </div>
              <div className='border border-gray-200 rounded-lg p-3 hover:bg-gray-50'>
                <div className='flex items-start gap-3'>
                  <Avatar className='h-10 w-10 flex-shrink-0'>
                    <AvatarImage
                      src='/api/placeholder/40/40'
                      alt='Carnegie Mellon'
                    />
                    <AvatarFallback className='bg-gray-100 text-gray-600'>
                      CM
                    </AvatarFallback>
                  </Avatar>
                  <div className='flex-1 min-w-0'>
                    <div className='flex items-center gap-2 mb-1'>
                      <h4 className='font-semibold text-sm text-gray-900 truncate'>
                        Carnegie Mellon
                      </h4>
                      <Badge className='text-xs bg-green-100 text-green-800 flex-shrink-0'>
                        85%
                      </Badge>
                    </div>
                    <p className='text-xs text-gray-600'>
                      Computer Science Program
                    </p>
                    <p className='text-xs text-gray-600'>Pittsburgh, PA</p>
                    <Button
                      size='sm'
                      variant='outline'
                      className='w-full text-xs mt-2'
                    >
                      Connect
                    </Button>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Featured Opportunities */}
          <Card className='bg-white border border-gray-200 shadow-sm rounded-xl overflow-hidden'>
            <CardHeader className='pb-3'>
              <CardTitle className='text-lg font-semibold text-gray-900'>
                Featured Opportunities
              </CardTitle>
            </CardHeader>
            <CardContent className='space-y-3'>
              <div className='border border-gray-200 rounded-lg p-3 hover:bg-gray-50'>
                <div className='flex items-start gap-3'>
                  <div className='w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0'>
                    <BookOpen className='h-4 w-4 text-blue-600' />
                  </div>
                  <div className='flex-1 min-w-0'>
                    <div className='flex items-center gap-2 mb-1'>
                      <h4 className='font-semibold text-sm text-gray-900 truncate'>
                        AI/ML Mentorship Program
                      </h4>
                      <Badge className='text-xs bg-yellow-100 text-yellow-800 flex-shrink-0'>
                        Featured
                      </Badge>
                    </div>
                    <p className='text-xs text-gray-600 mb-2'>
                      Connect with industry experts in artificial intelligence
                    </p>
                    <div className='flex items-center gap-4 text-xs text-gray-600 mb-2'>
                      <div className='flex items-center gap-1'>
                        <Clock className='h-3 w-3' />
                        <span>3 months</span>
                      </div>
                      <div className='flex items-center gap-1'>
                        <MapPin className='h-3 w-3' />
                        <span>Virtual</span>
                      </div>
                    </div>
                    <Button
                      size='sm'
                      variant='outline'
                      className='w-full text-xs'
                    >
                      <ExternalLink className='h-3 w-3 mr-1' />
                      Learn More
                    </Button>
                  </div>
                </div>
              </div>
              <div className='border border-gray-200 rounded-lg p-3 hover:bg-gray-50'>
                <div className='flex items-start gap-3'>
                  <div className='w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0'>
                    <BookOpen className='h-4 w-4 text-blue-600' />
                  </div>
                  <div className='flex-1 min-w-0'>
                    <div className='flex items-center gap-2 mb-1'>
                      <h4 className='font-semibold text-sm text-gray-900 truncate'>
                        Advanced React Development
                      </h4>
                      <Badge className='text-xs bg-blue-100 text-blue-800 flex-shrink-0'>
                        Popular
                      </Badge>
                    </div>
                    <p className='text-xs text-gray-600 mb-2'>
                      Master modern React patterns and best practices
                    </p>
                    <div className='flex items-center gap-4 text-xs text-gray-600 mb-2'>
                      <div className='flex items-center gap-1'>
                        <Clock className='h-3 w-3' />
                        <span>6 weeks</span>
                      </div>
                      <div className='flex items-center gap-1'>
                        <MapPin className='h-3 w-3' />
                        <span>Online</span>
                      </div>
                    </div>
                    <Button
                      size='sm'
                      variant='outline'
                      className='w-full text-xs'
                    >
                      <ExternalLink className='h-3 w-3 mr-1' />
                      Learn More
                    </Button>
                  </div>
                </div>
              </div>
              <div className='border border-gray-200 rounded-lg p-3 hover:bg-gray-50'>
                <div className='flex items-start gap-3'>
                  <div className='w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0'>
                    <Globe className='h-4 w-4 text-blue-600' />
                  </div>
                  <div className='flex-1 min-w-0'>
                    <div className='flex items-center gap-2 mb-1'>
                      <h4 className='font-semibold text-sm text-gray-900 truncate'>
                        Summer Exchange Program
                      </h4>
                      <Badge className='text-xs bg-red-100 text-red-800 flex-shrink-0'>
                        Limited
                      </Badge>
                    </div>
                    <p className='text-xs text-gray-600 mb-2'>
                      International study abroad opportunities
                    </p>
                    <div className='flex items-center gap-4 text-xs text-gray-600 mb-2'>
                      <div className='flex items-center gap-1'>
                        <Clock className='h-3 w-3' />
                        <span>8 weeks</span>
                      </div>
                      <div className='flex items-center gap-1'>
                        <MapPin className='h-3 w-3' />
                        <span>Multiple</span>
                      </div>
                    </div>
                    <Button
                      size='sm'
                      variant='outline'
                      className='w-full text-xs'
                    >
                      <ExternalLink className='h-3 w-3 mr-1' />
                      Learn More
                    </Button>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Academic Progress */}
          <Card className='bg-white border border-gray-200 shadow-sm rounded-xl overflow-hidden'>
            <CardHeader className='pb-3'>
              <CardTitle className='text-lg font-semibold text-gray-900'>
                Academic Progress
              </CardTitle>
            </CardHeader>
            <CardContent className='space-y-3'>
              <div className='space-y-3'>
                <div className='flex items-center justify-between'>
                  <span className='text-sm text-gray-600'>
                    Courses Completed
                  </span>
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
          <Card className='bg-white border border-gray-200 shadow-sm rounded-xl overflow-hidden'>
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
          <Card className='bg-white border border-gray-200 shadow-sm rounded-xl overflow-hidden'>
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
    </div>
  );
};

export default StudentDashboard;
