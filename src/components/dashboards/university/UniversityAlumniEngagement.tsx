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
import { useToast } from '@/hooks/use-toast';
import {
  Users,
  MessageSquare,
  Calendar,
  FileText,
  CheckCircle,
  TrendingUp,
  BarChart3,
  Globe,
  Mail,
  Edit,
  Eye,
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
  Filter,
  Search,
  SortAsc,
  SortDesc,
  Download as DownloadIcon,
  Upload,
  FileText as FileTextIcon,
  AlertCircle,
  Info,
  X,
  Plus as PlusIcon,
  UserCheck,
  Briefcase as BriefcaseIcon,
  BookOpen as BookOpenIcon2,
  Target as TargetIcon2,
  Heart,
  Bell,
  ClipboardList,
  FolderOpen,
  Network,
  Star,
  MapPin as MapPinIcon,
} from 'lucide-react';

const UniversityAlumniEngagement = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);

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

  const alumniStats = [
    {
      id: 1,
      title: 'Total Alumni',
      value: '45,678',
      change: '+2.1%',
      changeType: 'positive',
      icon: Users,
      color: 'text-blue-600',
      bgColor: 'bg-blue-100',
    },
    {
      id: 2,
      title: 'Active Members',
      value: '12,345',
      change: '+8.5%',
      changeType: 'positive',
      icon: UserCheck,
      color: 'text-green-600',
      bgColor: 'bg-green-100',
    },
    {
      id: 3,
      title: 'Events This Year',
      value: '89',
      change: '+15.2%',
      changeType: 'positive',
      icon: Calendar,
      color: 'text-purple-600',
      bgColor: 'bg-purple-100',
    },
    {
      id: 4,
      title: 'Donations Raised',
      value: '$2.3M',
      change: '+12.7%',
      changeType: 'positive',
      icon: DollarSign,
      color: 'text-orange-600',
      bgColor: 'bg-orange-100',
    },
  ];

  const alumniEvents = [
    {
      id: 1,
      title: 'Alumni Reunion 2024',
      date: 'Dec 15, 2024',
      time: '6:00 PM',
      location: 'MIT Campus',
      attendees: 450,
      type: 'reunion',
      status: 'upcoming',
      description: 'Annual alumni reunion with networking and dinner',
    },
    {
      id: 2,
      title: 'Career Networking Event',
      date: 'Dec 20, 2024',
      time: '7:00 PM',
      location: 'Virtual',
      attendees: 234,
      type: 'networking',
      status: 'upcoming',
      description: 'Connect with fellow alumni and industry professionals',
    },
    {
      id: 3,
      title: 'Alumni Mentorship Program',
      date: 'Ongoing',
      time: 'Flexible',
      location: 'Hybrid',
      attendees: 89,
      type: 'mentorship',
      status: 'active',
      description: 'Mentorship program connecting alumni with current students',
    },
  ];

  const featuredAlumni = [
    {
      id: 1,
      name: 'Dr. Sarah Chen',
      class: '2010',
      degree: 'PhD Computer Science',
      company: 'Google AI',
      position: 'Senior Research Scientist',
      location: 'Mountain View, CA',
      avatar: '/api/placeholder/40/40',
      achievements: ['Published 50+ papers', 'Led 10+ research projects'],
    },
    {
      id: 2,
      name: 'Michael Rodriguez',
      class: '2015',
      degree: 'MBA',
      company: 'Tesla',
      position: 'VP of Operations',
      location: 'Austin, TX',
      avatar: '/api/placeholder/40/40',
      achievements: ['Scaled operations globally', 'Led 1000+ team'],
    },
    {
      id: 3,
      name: 'Dr. Emily Johnson',
      class: '2012',
      degree: 'PhD Physics',
      company: 'NASA',
      position: 'Research Director',
      location: 'Houston, TX',
      avatar: '/api/placeholder/40/40',
      achievements: ['Led Mars mission research', 'Awarded NASA Medal'],
    },
  ];

  const recentActivities = [
    {
      id: 1,
      type: 'donation',
      title: 'Alumni Donation Campaign',
      description: 'Raised $500K for student scholarships',
      time: '2 hours ago',
      icon: DollarSign,
      color: 'text-green-600',
      bgColor: 'bg-green-100',
    },
    {
      id: 2,
      type: 'event',
      title: 'Alumni Career Fair',
      description: '200+ students connected with alumni',
      time: '1 day ago',
      icon: Briefcase,
      color: 'text-blue-600',
      bgColor: 'bg-blue-100',
    },
    {
      id: 3,
      type: 'mentorship',
      title: 'New Mentorship Program',
      description: '50 new mentor-mentee pairs formed',
      time: '3 days ago',
      icon: Heart,
      color: 'text-purple-600',
      bgColor: 'bg-purple-100',
    },
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'upcoming':
        return 'bg-blue-100 text-blue-800';
      case 'active':
        return 'bg-green-100 text-green-800';
      case 'completed':
        return 'bg-gray-100 text-gray-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const handleCreateEvent = () => {
    toast({
      title: 'Create Event',
      description: 'Opening event creation form',
    });
  };

  const handleContactAlumni = () => {
    toast({
      title: 'Contact Alumni',
      description: 'Opening alumni contact form',
    });
  };

  return (
    <div className='grid grid-cols-1 lg:grid-cols-12 gap-6'>
      {/* Main Content Area */}
      <div className='lg:col-span-8 space-y-6'>
        {/* Alumni Overview */}
        <Card className='bg-white border border-gray-200 shadow-sm'>
          <CardHeader className='pb-4'>
            <CardTitle className='text-xl font-semibold text-gray-900'>
              Alumni Engagement Overview
            </CardTitle>
            <CardDescription>
              Connect and engage with your global alumni network
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4'>
              {alumniStats.map((stat) => (
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

        {/* Alumni Events */}
        <Card className='bg-white border border-gray-200 shadow-sm'>
          <CardHeader className='pb-4'>
            <div className='flex items-center justify-between'>
              <CardTitle className='text-lg font-semibold text-gray-900'>
                Alumni Events
              </CardTitle>
              <Button
                variant='outline'
                size='sm'
                onClick={handleCreateEvent}
                className='flex items-center gap-2'
              >
                <PlusIcon className='h-4 w-4' />
                Create Event
              </Button>
            </div>
          </CardHeader>
          <CardContent className='space-y-4'>
            {alumniEvents.map((event) => (
              <div
                key={event.id}
                className='border border-gray-200 rounded-lg p-4 hover:bg-gray-50 transition-colors'
              >
                <div className='flex items-start justify-between mb-3'>
                  <div className='flex-1'>
                    <div className='flex items-center gap-3 mb-2'>
                      <h4 className='font-semibold text-sm text-gray-900'>
                        {event.title}
                      </h4>
                      <Badge
                        className={`text-xs ${getStatusColor(event.status)}`}
                      >
                        {event.status}
                      </Badge>
                      <Badge variant='secondary' className='text-xs'>
                        {event.type}
                      </Badge>
                    </div>
                    <p className='text-sm text-gray-600 mb-2'>
                      {event.description}
                    </p>
                    <div className='flex items-center gap-4 text-xs text-gray-500'>
                      <span className='flex items-center gap-1'>
                        <Calendar className='h-3 w-3' />
                        {event.date} {event.time}
                      </span>
                      <span className='flex items-center gap-1'>
                        <MapPin className='h-3 w-3' />
                        {event.location}
                      </span>
                      <span className='flex items-center gap-1'>
                        <Users className='h-3 w-3' />
                        {event.attendees} attendees
                      </span>
                    </div>
                  </div>
                  <div className='flex items-center gap-2'>
                    <Button variant='ghost' size='sm'>
                      <Eye className='h-4 w-4' />
                    </Button>
                    <Button variant='ghost' size='sm'>
                      <Edit className='h-4 w-4' />
                    </Button>
                  </div>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>

        {/* Featured Alumni */}
        <Card className='bg-white border border-gray-200 shadow-sm'>
          <CardHeader className='pb-4'>
            <CardTitle className='text-lg font-semibold text-gray-900'>
              Featured Alumni
            </CardTitle>
          </CardHeader>
          <CardContent className='space-y-4'>
            {featuredAlumni.map((alumni) => (
              <div
                key={alumni.id}
                className='border border-gray-200 rounded-lg p-4 hover:bg-gray-50 transition-colors'
              >
                <div className='flex items-start gap-4'>
                  <Avatar className='h-12 w-12'>
                    <AvatarImage src={alumni.avatar} alt={alumni.name} />
                    <AvatarFallback className='bg-blue-100 text-blue-600'>
                      {alumni.name
                        .split(' ')
                        .map((n) => n[0])
                        .join('')}
                    </AvatarFallback>
                  </Avatar>
                  <div className='flex-1'>
                    <div className='flex items-center gap-2 mb-1'>
                      <h4 className='font-semibold text-sm text-gray-900'>
                        {alumni.name}
                      </h4>
                      <Badge variant='outline' className='text-xs'>
                        Class of {alumni.class}
                      </Badge>
                    </div>
                    <p className='text-sm text-gray-600 mb-2'>
                      {alumni.degree}
                    </p>
                    <div className='flex items-center gap-4 text-xs text-gray-500 mb-2'>
                      <span className='flex items-center gap-1'>
                        <Building className='h-3 w-3' />
                        {alumni.company}
                      </span>
                      <span className='flex items-center gap-1'>
                        <Briefcase className='h-3 w-3' />
                        {alumni.position}
                      </span>
                      <span className='flex items-center gap-1'>
                        <MapPin className='h-3 w-3' />
                        {alumni.location}
                      </span>
                    </div>
                    <div className='space-y-1'>
                      {alumni.achievements.map((achievement, index) => (
                        <p
                          key={index}
                          className='text-xs text-gray-600 flex items-center gap-1'
                        >
                          <Star className='h-3 w-3 text-yellow-500' />
                          {achievement}
                        </p>
                      ))}
                    </div>
                  </div>
                  <div className='flex items-center gap-2'>
                    <Button variant='ghost' size='sm'>
                      <MessageSquare className='h-4 w-4' />
                    </Button>
                    <Button variant='ghost' size='sm'>
                      <UserPlus className='h-4 w-4' />
                    </Button>
                  </div>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>
      </div>

      {/* Right Sidebar */}
      <div className='lg:col-span-4 space-y-6'>
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
              onClick={handleCreateEvent}
            >
              <PlusIcon className='h-4 w-4 mr-2' />
              Create Event
            </Button>
            <Button
              variant='outline'
              className='w-full justify-start'
              onClick={handleContactAlumni}
            >
              <MessageSquare className='h-4 w-4 mr-2' />
              Contact Alumni
            </Button>
            <Button variant='outline' className='w-full justify-start'>
              <Download className='h-4 w-4 mr-2' />
              Export Directory
            </Button>
            <Button variant='outline' className='w-full justify-start'>
              <BarChart3 className='h-4 w-4 mr-2' />
              View Analytics
            </Button>
          </CardContent>
        </Card>

        {/* Recent Activities */}
        <Card className='bg-white border border-gray-200 shadow-sm'>
          <CardHeader className='pb-4'>
            <CardTitle className='text-lg font-semibold text-gray-900'>
              Recent Activities
            </CardTitle>
          </CardHeader>
          <CardContent className='space-y-3'>
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
              </div>
            ))}
          </CardContent>
        </Card>

        {/* Alumni Network Stats */}
        <Card className='bg-white border border-gray-200 shadow-sm'>
          <CardHeader className='pb-4'>
            <CardTitle className='text-lg font-semibold text-gray-900'>
              Network Statistics
            </CardTitle>
          </CardHeader>
          <CardContent className='space-y-4'>
            <div className='flex items-center justify-between'>
              <span className='text-sm text-gray-600'>Alumni in Tech</span>
              <span className='text-sm font-semibold text-gray-900'>
                15,234
              </span>
            </div>
            <div className='flex items-center justify-between'>
              <span className='text-sm text-gray-600'>Alumni in Academia</span>
              <span className='text-sm font-semibold text-gray-900'>8,567</span>
            </div>
            <div className='flex items-center justify-between'>
              <span className='text-sm text-gray-600'>
                Alumni Entrepreneurs
              </span>
              <span className='text-sm font-semibold text-gray-900'>2,345</span>
            </div>
            <div className='flex items-center justify-between'>
              <span className='text-sm text-gray-600'>
                International Alumni
              </span>
              <span className='text-sm font-semibold text-gray-900'>
                12,890
              </span>
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

export default UniversityAlumniEngagement;
