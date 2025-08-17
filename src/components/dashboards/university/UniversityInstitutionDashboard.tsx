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
  Target,
  Briefcase,
  Lightbulb,
  BookMarked,
  Target as TargetIcon,
  PieChart,
  Activity,
  Zap,
  Shield,
  Globe2,
  Award as AwardIcon,
  TrendingDown,
  Users2,
  BookOpen as BookOpenIcon,
  CalendarDays,
  Clock as ClockIcon,
  DollarSign as DollarSignIcon,
  Percent,
  ArrowUpRight,
  ArrowDownRight,
  Handshake,
  Minus,
} from 'lucide-react';

const UniversityInstitutionDashboard = () => {
  const navigate = useNavigate();
  const { toast } = useToast();

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

  const institutionStats = [
    {
      id: 1,
      title: 'Total Students',
      value: '12,450',
      change: '+5.2%',
      changeType: 'positive',
      icon: Users,
      color: 'text-blue-600',
      bgColor: 'bg-blue-100',
    },
    {
      id: 2,
      title: 'Active Programs',
      value: '156',
      change: '+3.1%',
      changeType: 'positive',
      icon: BookOpen,
      color: 'text-green-600',
      bgColor: 'bg-green-100',
    },
    {
      id: 3,
      title: 'Faculty Members',
      value: '1,234',
      change: '+2.8%',
      changeType: 'positive',
      icon: GraduationCap,
      color: 'text-purple-600',
      bgColor: 'bg-purple-100',
    },
    {
      id: 4,
      title: 'Research Projects',
      value: '89',
      change: '+12.5%',
      changeType: 'positive',
      icon: Target,
      color: 'text-orange-600',
      bgColor: 'bg-orange-100',
    },
    {
      id: 5,
      title: 'International Students',
      value: '3,456',
      change: '+8.7%',
      changeType: 'positive',
      icon: Globe,
      color: 'text-indigo-600',
      bgColor: 'bg-indigo-100',
    },
    {
      id: 6,
      title: 'Alumni Network',
      value: '45,678',
      change: '+1.2%',
      changeType: 'positive',
      icon: Users2,
      color: 'text-pink-600',
      bgColor: 'bg-pink-100',
    },
  ];

  const recentActivities = [
    {
      id: 1,
      type: 'program',
      title: 'New Master of AI Program Launched',
      description: 'Applications now open for Fall 2024',
      time: '2 hours ago',
      icon: BookOpen,
      color: 'text-blue-600',
      bgColor: 'bg-blue-100',
    },
    {
      id: 2,
      type: 'research',
      title: 'Breakthrough in Quantum Computing',
      description: 'Published in Nature Journal',
      time: '4 hours ago',
      icon: Target,
      color: 'text-green-600',
      bgColor: 'bg-green-100',
    },
    {
      id: 3,
      type: 'partnership',
      title: 'Partnership with Google AI',
      description: 'New research collaboration announced',
      time: '6 hours ago',
      icon: Handshake,
      color: 'text-purple-600',
      bgColor: 'bg-purple-100',
    },
    {
      id: 4,
      type: 'award',
      title: 'University Ranking Improved',
      description: 'Now ranked #2 globally',
      time: '1 day ago',
      icon: Award,
      color: 'text-yellow-600',
      bgColor: 'bg-yellow-100',
    },
  ];

  const upcomingEvents = [
    {
      id: 1,
      title: 'Open House Day',
      date: 'Dec 15, 2024',
      time: '10:00 AM',
      attendees: 450,
      type: 'event',
      status: 'upcoming',
    },
    {
      id: 2,
      title: 'Faculty Meeting',
      date: 'Dec 18, 2024',
      time: '2:00 PM',
      attendees: 89,
      type: 'meeting',
      status: 'upcoming',
    },
    {
      id: 3,
      title: 'Research Symposium',
      date: 'Dec 20, 2024',
      time: '9:00 AM',
      attendees: 234,
      type: 'conference',
      status: 'upcoming',
    },
  ];

  const departmentPerformance = [
    {
      id: 1,
      name: 'Computer Science',
      students: 2340,
      faculty: 45,
      research: 23,
      rating: 4.8,
      trend: 'up',
    },
    {
      id: 2,
      name: 'Engineering',
      students: 1890,
      faculty: 38,
      research: 18,
      rating: 4.7,
      trend: 'up',
    },
    {
      id: 3,
      name: 'Business',
      students: 1560,
      faculty: 32,
      research: 12,
      rating: 4.6,
      trend: 'stable',
    },
    {
      id: 4,
      name: 'Arts & Sciences',
      students: 2100,
      faculty: 42,
      research: 15,
      rating: 4.5,
      trend: 'up',
    },
  ];

  return (
    <div className='grid grid-cols-1 lg:grid-cols-12 gap-6'>
      {/* Main Content Area */}
      <div className='lg:col-span-8 space-y-6'>
        {/* Institution Overview */}
        <Card className='bg-white border border-gray-200 shadow-sm'>
          <CardHeader className='pb-4'>
            <CardTitle className='text-xl font-semibold text-gray-900'>
              Institution Overview
            </CardTitle>
            <CardDescription>
              Comprehensive view of your university's performance and activities
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4'>
              {institutionStats.map((stat) => (
                <div
                  key={stat.id}
                  className='p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors'
                >
                  <div className='flex items-center justify-between mb-3'>
                    <div
                      className={`p-2 rounded-lg ${stat.bgColor} ${stat.color}`}
                    >
                      <stat.icon className='h-5 w-5' />
                    </div>
                    <div className='flex items-center gap-1'>
                      {stat.changeType === 'positive' ? (
                        <ArrowUpRight className='h-4 w-4 text-green-600' />
                      ) : (
                        <ArrowDownRight className='h-4 w-4 text-red-600' />
                      )}
                      <span
                        className={`text-sm font-medium ${
                          stat.changeType === 'positive'
                            ? 'text-green-600'
                            : 'text-red-600'
                        }`}
                      >
                        {stat.change}
                      </span>
                    </div>
                  </div>
                  <h3 className='text-2xl font-bold text-gray-900 mb-1'>
                    {stat.value}
                  </h3>
                  <p className='text-sm text-gray-600'>{stat.title}</p>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Recent Activities */}
        <Card className='bg-white border border-gray-200 shadow-sm'>
          <CardHeader className='pb-4'>
            <CardTitle className='text-lg font-semibold text-gray-900'>
              Recent Activities
            </CardTitle>
          </CardHeader>
          <CardContent className='space-y-4'>
            {recentActivities.map((activity) => (
              <div
                key={activity.id}
                className='flex items-start gap-3 p-3 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors'
              >
                <div
                  className={`p-2 rounded-lg ${activity.bgColor} ${activity.color}`}
                >
                  <activity.icon className='h-4 w-4' />
                </div>
                <div className='flex-1'>
                  <h4 className='font-semibold text-sm text-gray-900 mb-1'>
                    {activity.title}
                  </h4>
                  <p className='text-sm text-gray-600 mb-2'>
                    {activity.description}
                  </p>
                  <span className='text-xs text-gray-500'>{activity.time}</span>
                </div>
                <Button variant='ghost' size='sm'>
                  <MoreHorizontal className='h-4 w-4' />
                </Button>
              </div>
            ))}
          </CardContent>
        </Card>

        {/* Department Performance */}
        <Card className='bg-white border border-gray-200 shadow-sm'>
          <CardHeader className='pb-4'>
            <CardTitle className='text-lg font-semibold text-gray-900'>
              Department Performance
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className='space-y-4'>
              {departmentPerformance.map((dept) => (
                <div
                  key={dept.id}
                  className='flex items-center justify-between p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors'
                >
                  <div className='flex items-center gap-4'>
                    <div className='w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center'>
                      <BookOpenIcon className='h-6 w-6 text-blue-600' />
                    </div>
                    <div>
                      <h4 className='font-semibold text-sm text-gray-900'>
                        {dept.name}
                      </h4>
                      <div className='flex items-center gap-4 text-xs text-gray-600'>
                        <span>{dept.students} students</span>
                        <span>{dept.faculty} faculty</span>
                        <span>{dept.research} research</span>
                      </div>
                    </div>
                  </div>
                  <div className='flex items-center gap-3'>
                    <div className='flex items-center gap-1'>
                      <Star className='h-4 w-4 text-yellow-500 fill-current' />
                      <span className='text-sm font-medium text-gray-900'>
                        {dept.rating}
                      </span>
                    </div>
                    <div
                      className={`flex items-center gap-1 ${
                        dept.trend === 'up'
                          ? 'text-green-600'
                          : dept.trend === 'down'
                          ? 'text-red-600'
                          : 'text-gray-600'
                      }`}
                    >
                      {dept.trend === 'up' ? (
                        <ArrowUpRight className='h-4 w-4' />
                      ) : dept.trend === 'down' ? (
                        <ArrowDownRight className='h-4 w-4' />
                      ) : (
                        <Minus className='h-4 w-4' />
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Right Sidebar */}
      <div className='lg:col-span-4 space-y-6'>
        {/* Upcoming Events */}
        <Card className='bg-white border border-gray-200 shadow-sm'>
          <CardHeader className='pb-4'>
            <CardTitle className='text-lg font-semibold text-gray-900'>
              Upcoming Events
            </CardTitle>
          </CardHeader>
          <CardContent className='space-y-4'>
            {upcomingEvents.map((event) => (
              <div
                key={event.id}
                className='p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors'
              >
                <div className='flex items-start justify-between mb-2'>
                  <h4 className='font-semibold text-sm text-gray-900'>
                    {event.title}
                  </h4>
                  <Badge variant='secondary' className='text-xs'>
                    {event.type}
                  </Badge>
                </div>
                <div className='space-y-1 text-xs text-gray-600 mb-3'>
                  <div className='flex items-center gap-2'>
                    <Calendar className='h-3 w-3' />
                    {event.date}
                  </div>
                  <div className='flex items-center gap-2'>
                    <Clock className='h-3 w-3' />
                    {event.time}
                  </div>
                  <div className='flex items-center gap-2'>
                    <Users className='h-3 w-3' />
                    {event.attendees} attendees
                  </div>
                </div>
                <Button size='sm' className='w-full text-xs'>
                  View Details
                </Button>
              </div>
            ))}
            <Button
              variant='ghost'
              className='w-full text-blue-600 hover:text-blue-700 text-sm'
            >
              View all events →
            </Button>
          </CardContent>
        </Card>

        {/* Quick Actions */}
        <Card className='bg-white border border-gray-200 shadow-sm'>
          <CardHeader className='pb-4'>
            <CardTitle className='text-lg font-semibold text-gray-900'>
              Quick Actions
            </CardTitle>
          </CardHeader>
          <CardContent className='space-y-3'>
            <Button
              variant='outline'
              className='w-full justify-start'
              onClick={() => navigate('/dashboard/programs')}
            >
              <Plus className='h-4 w-4 mr-2' />
              Add New Program
            </Button>
            <Button
              variant='outline'
              className='w-full justify-start'
              onClick={() => navigate('/dashboard/live-sessions')}
            >
              <Video className='h-4 w-4 mr-2' />
              Schedule Session
            </Button>
            <Button
              variant='outline'
              className='w-full justify-start'
              onClick={() => navigate('/dashboard/analytics')}
            >
              <BarChart3 className='h-4 w-4 mr-2' />
              View Analytics
            </Button>
            <Button
              variant='outline'
              className='w-full justify-start'
              onClick={() => navigate('/dashboard/messages')}
            >
              <MessageSquare className='h-4 w-4 mr-2' />
              Check Messages
            </Button>
          </CardContent>
        </Card>

        {/* Institution Stats Summary */}
        <Card className='bg-white border border-gray-200 shadow-sm'>
          <CardHeader className='pb-4'>
            <CardTitle className='text-lg font-semibold text-gray-900'>
              This Month
            </CardTitle>
          </CardHeader>
          <CardContent className='space-y-4'>
            <div className='flex items-center justify-between'>
              <span className='text-sm text-gray-600'>New Applications</span>
              <span className='text-sm font-semibold text-gray-900'>1,234</span>
            </div>
            <div className='flex items-center justify-between'>
              <span className='text-sm text-gray-600'>Program Views</span>
              <span className='text-sm font-semibold text-gray-900'>
                45,678
              </span>
            </div>
            <div className='flex items-center justify-between'>
              <span className='text-sm text-gray-600'>Student Inquiries</span>
              <span className='text-sm font-semibold text-gray-900'>567</span>
            </div>
            <div className='flex items-center justify-between'>
              <span className='text-sm text-gray-600'>Live Sessions</span>
              <span className='text-sm font-semibold text-gray-900'>23</span>
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

export default UniversityInstitutionDashboard;
