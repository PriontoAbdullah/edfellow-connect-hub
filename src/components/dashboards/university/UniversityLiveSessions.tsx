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
  Video,
  Calendar,
  Users,
  Clock,
  Plus,
  Edit,
  Trash2,
  Eye,
  Settings,
  Share2,
  Download,
  BarChart3,
  MessageSquare,
  Globe,
  MapPin,
  ExternalLink,
  ChevronRight,
  Play,
  Pause,
  Square,
  Mic,
  MicOff,
  Camera,
  CameraOff,
  Monitor,
  MonitorOff,
  MoreHorizontal,
  AlertCircle,
  CheckCircle,
  XCircle,
  Clock as ClockIcon,
  UserPlus,
  Mail,
  Bell,
  Star,
  TrendingUp,
  Activity,
  Zap,
} from 'lucide-react';

const UniversityLiveSessions = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [selectedTab, setSelectedTab] = useState('upcoming');
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [showSettingsModal, setShowSettingsModal] = useState(false);

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

  const upcomingSessions = [
    {
      id: 1,
      title: 'Introduction to AI and Machine Learning',
      date: 'Today 2:00 PM',
      registrations: 145,
      duration: '1 hour',
      status: 'Scheduled',
      host: 'Dr. Sarah Johnson',
      hostAvatar: '/api/placeholder/40/40',
      description:
        'Learn the fundamentals of AI and machine learning with hands-on examples.',
      category: 'Technology',
      maxParticipants: 200,
      isPublic: true,
    },
    {
      id: 2,
      title: 'Career Opportunities in Data Science',
      date: 'Tomorrow 10:00 AM',
      registrations: 89,
      duration: '45 min',
      status: 'Scheduled',
      host: 'Prof. Michael Chen',
      hostAvatar: '/api/placeholder/40/40',
      description:
        'Explore career paths and opportunities in the field of data science.',
      category: 'Career',
      maxParticipants: 150,
      isPublic: true,
    },
    {
      id: 3,
      title: 'International Student Visa Guide',
      date: 'Dec 30 3:00 PM',
      registrations: 234,
      duration: '1 hour',
      status: 'Scheduled',
      host: 'Admissions Office',
      hostAvatar: '/api/placeholder/40/40',
      description:
        'Comprehensive guide for international students on visa requirements and procedures.',
      category: 'Admissions',
      maxParticipants: 300,
      isPublic: true,
    },
  ];

  const liveSessions = [
    {
      id: 4,
      title: 'Campus Tour Live',
      date: 'Live Now',
      registrations: 156,
      duration: '30 min',
      status: 'Live',
      host: 'Student Ambassadors',
      hostAvatar: '/api/placeholder/40/40',
      description:
        'Virtual campus tour showcasing our facilities and student life.',
      category: 'Campus Life',
      currentParticipants: 142,
      maxParticipants: 200,
      isPublic: true,
    },
  ];

  const pastSessions = [
    {
      id: 5,
      title: 'Graduate School Application Tips',
      date: 'Dec 25 2:00 PM',
      registrations: 189,
      duration: '1 hour',
      status: 'Completed',
      host: 'Graduate Admissions',
      hostAvatar: '/api/placeholder/40/40',
      description: 'Expert tips and guidance for graduate school applications.',
      category: 'Admissions',
      attendees: 167,
      recordingUrl: '/recordings/graduate-tips',
      isPublic: true,
    },
    {
      id: 6,
      title: 'Research Opportunities at MIT',
      date: 'Dec 20 1:00 PM',
      registrations: 234,
      duration: '45 min',
      status: 'Completed',
      host: 'Research Office',
      hostAvatar: '/api/placeholder/40/40',
      description:
        'Overview of research opportunities and funding available to students.',
      category: 'Research',
      attendees: 198,
      recordingUrl: '/recordings/research-opportunities',
      isPublic: true,
    },
  ];

  const handleCreateSession = () => {
    setShowCreateModal(true);
  };

  const handleStartSession = (sessionId: number) => {
    toast({
      title: 'Session Started',
      description: 'Your live session is now active.',
    });
  };

  const handleJoinSession = (sessionId: number) => {
    toast({
      title: 'Joined Session',
      description: 'You have successfully joined the live session.',
    });
  };

  const handleEditSession = (sessionId: number) => {
    toast({
      title: 'Edit Session',
      description: 'Session editing feature coming soon.',
    });
  };

  const handleDeleteSession = (sessionId: number) => {
    toast({
      title: 'Session Deleted',
      description: 'The session has been successfully deleted.',
    });
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Live':
        return 'bg-red-100 text-red-800';
      case 'Scheduled':
        return 'bg-blue-100 text-blue-800';
      case 'Completed':
        return 'bg-green-100 text-green-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case 'Technology':
        return <Zap className='h-4 w-4' />;
      case 'Career':
        return <TrendingUp className='h-4 w-4' />;
      case 'Admissions':
        return <UserPlus className='h-4 w-4' />;
      case 'Campus Life':
        return <Globe className='h-4 w-4' />;
      case 'Research':
        return <Activity className='h-4 w-4' />;
      default:
        return <Video className='h-4 w-4' />;
    }
  };

  return (
    <div className='space-y-6'>
      {/* Header */}
      <div className='flex items-center justify-between'>
        <div>
          <h1 className='text-2xl font-bold text-gray-900'>Live Sessions</h1>
          <p className='text-gray-600 mt-1'>
            Manage and host live sessions for students and faculty
          </p>
        </div>
        <Button
          onClick={handleCreateSession}
          className='bg-blue-600 hover:bg-blue-700 text-white'
        >
          <Plus className='h-4 w-4 mr-2' />
          Create Session
        </Button>
      </div>

      {/* Stats Cards */}
      <div className='grid grid-cols-1 md:grid-cols-4 gap-4'>
        <Card className='bg-white border border-gray-200 shadow-sm'>
          <CardContent className='p-4'>
            <div className='flex items-center justify-between'>
              <div>
                <p className='text-sm text-gray-600'>Total Sessions</p>
                <p className='text-2xl font-bold text-gray-900'>24</p>
              </div>
              <div className='w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center'>
                <Video className='h-5 w-5 text-blue-600' />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className='bg-white border border-gray-200 shadow-sm'>
          <CardContent className='p-4'>
            <div className='flex items-center justify-between'>
              <div>
                <p className='text-sm text-gray-600'>Active Sessions</p>
                <p className='text-2xl font-bold text-gray-900'>1</p>
              </div>
              <div className='w-10 h-10 bg-red-100 rounded-full flex items-center justify-center'>
                <Play className='h-5 w-5 text-red-600' />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className='bg-white border border-gray-200 shadow-sm'>
          <CardContent className='p-4'>
            <div className='flex items-center justify-between'>
              <div>
                <p className='text-sm text-gray-600'>Total Registrations</p>
                <p className='text-2xl font-bold text-gray-900'>1,247</p>
              </div>
              <div className='w-10 h-10 bg-green-100 rounded-full flex items-center justify-center'>
                <Users className='h-5 w-5 text-green-600' />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className='bg-white border border-gray-200 shadow-sm'>
          <CardContent className='p-4'>
            <div className='flex items-center justify-between'>
              <div>
                <p className='text-sm text-gray-600'>Avg. Attendance</p>
                <p className='text-2xl font-bold text-gray-900'>87%</p>
              </div>
              <div className='w-10 h-10 bg-purple-100 rounded-full flex items-center justify-center'>
                <BarChart3 className='h-5 w-5 text-purple-600' />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Tabs */}
      <div className='flex space-x-1 bg-gray-100 p-1 rounded-lg'>
        <button
          onClick={() => setSelectedTab('upcoming')}
          className={`flex-1 py-2 px-4 rounded-md text-sm font-medium transition-colors ${
            selectedTab === 'upcoming'
              ? 'bg-white text-gray-900 shadow-sm'
              : 'text-gray-600 hover:text-gray-900'
          }`}
        >
          Upcoming ({upcomingSessions.length})
        </button>
        <button
          onClick={() => setSelectedTab('live')}
          className={`flex-1 py-2 px-4 rounded-md text-sm font-medium transition-colors ${
            selectedTab === 'live'
              ? 'bg-white text-gray-900 shadow-sm'
              : 'text-gray-600 hover:text-gray-900'
          }`}
        >
          Live ({liveSessions.length})
        </button>
        <button
          onClick={() => setSelectedTab('past')}
          className={`flex-1 py-2 px-4 rounded-md text-sm font-medium transition-colors ${
            selectedTab === 'past'
              ? 'bg-white text-gray-900 shadow-sm'
              : 'text-gray-600 hover:text-gray-900'
          }`}
        >
          Past ({pastSessions.length})
        </button>
      </div>

      {/* Sessions List */}
      <div className='space-y-4'>
        {selectedTab === 'upcoming' &&
          upcomingSessions.map((session) => (
            <Card
              key={session.id}
              className='bg-white border border-gray-200 shadow-sm hover:shadow-md transition-shadow'
            >
              <CardContent className='p-6'>
                <div className='flex items-start justify-between mb-4'>
                  <div className='flex items-start gap-4'>
                    <div className='w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center'>
                      {getCategoryIcon(session.category)}
                    </div>
                    <div className='flex-1'>
                      <div className='flex items-center gap-2 mb-2'>
                        <h3 className='text-lg font-semibold text-gray-900'>
                          {session.title}
                        </h3>
                        <Badge className={getStatusColor(session.status)}>
                          {session.status}
                        </Badge>
                      </div>
                      <p className='text-gray-600 mb-3'>
                        {session.description}
                      </p>
                      <div className='flex items-center gap-4 text-sm text-gray-500'>
                        <div className='flex items-center gap-1'>
                          <Calendar className='h-4 w-4' />
                          {session.date}
                        </div>
                        <div className='flex items-center gap-1'>
                          <Clock className='h-4 w-4' />
                          {session.duration}
                        </div>
                        <div className='flex items-center gap-1'>
                          <Users className='h-4 w-4' />
                          {session.registrations}/{session.maxParticipants}
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className='flex items-center gap-2'>
                    <Button
                      size='sm'
                      variant='outline'
                      onClick={() => handleEditSession(session.id)}
                    >
                      <Edit className='h-4 w-4' />
                    </Button>
                    <Button
                      size='sm'
                      variant='outline'
                      onClick={() => handleDeleteSession(session.id)}
                    >
                      <Trash2 className='h-4 w-4' />
                    </Button>
                  </div>
                </div>
                <div className='flex items-center justify-between pt-4 border-t border-gray-100'>
                  <div className='flex items-center gap-2'>
                    <Avatar className='h-6 w-6'>
                      <AvatarImage
                        src={session.hostAvatar}
                        alt={session.host}
                      />
                      <AvatarFallback className='text-xs'>
                        {session.host
                          .split(' ')
                          .map((n) => n[0])
                          .join('')}
                      </AvatarFallback>
                    </Avatar>
                    <span className='text-sm text-gray-600'>
                      {session.host}
                    </span>
                  </div>
                  <div className='flex gap-2'>
                    <Button size='sm' variant='outline' className='text-xs'>
                      <Settings className='h-4 w-4 mr-1' />
                      Settings
                    </Button>
                    <Button
                      size='sm'
                      className='bg-blue-600 hover:bg-blue-700 text-white text-xs'
                      onClick={() => handleStartSession(session.id)}
                    >
                      <Play className='h-4 w-4 mr-1' />
                      Start
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}

        {selectedTab === 'live' &&
          liveSessions.map((session) => (
            <Card
              key={session.id}
              className='bg-white border-2 border-red-200 shadow-sm'
            >
              <CardContent className='p-6'>
                <div className='flex items-start justify-between mb-4'>
                  <div className='flex items-start gap-4'>
                    <div className='w-12 h-12 bg-red-100 rounded-lg flex items-center justify-center'>
                      <Play className='h-6 w-6 text-red-600' />
                    </div>
                    <div className='flex-1'>
                      <div className='flex items-center gap-2 mb-2'>
                        <h3 className='text-lg font-semibold text-gray-900'>
                          {session.title}
                        </h3>
                        <Badge className='bg-red-100 text-red-800 animate-pulse'>
                          LIVE
                        </Badge>
                      </div>
                      <p className='text-gray-600 mb-3'>
                        {session.description}
                      </p>
                      <div className='flex items-center gap-4 text-sm text-gray-500'>
                        <div className='flex items-center gap-1'>
                          <Users className='h-4 w-4' />
                          {session.currentParticipants} watching
                        </div>
                        <div className='flex items-center gap-1'>
                          <Clock className='h-4 w-4' />
                          {session.duration}
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className='flex items-center gap-2'>
                    <Button
                      size='sm'
                      variant='outline'
                      onClick={() => handleJoinSession(session.id)}
                    >
                      <Eye className='h-4 w-4' />
                    </Button>
                    <Button
                      size='sm'
                      className='bg-red-600 hover:bg-red-700 text-white'
                    >
                      <Square className='h-4 w-4' />
                    </Button>
                  </div>
                </div>
                <div className='flex items-center justify-between pt-4 border-t border-gray-100'>
                  <div className='flex items-center gap-2'>
                    <Avatar className='h-6 w-6'>
                      <AvatarImage
                        src={session.hostAvatar}
                        alt={session.host}
                      />
                      <AvatarFallback className='text-xs'>
                        {session.host
                          .split(' ')
                          .map((n) => n[0])
                          .join('')}
                      </AvatarFallback>
                    </Avatar>
                    <span className='text-sm text-gray-600'>
                      {session.host}
                    </span>
                  </div>
                  <div className='flex gap-2'>
                    <Button size='sm' variant='outline' className='text-xs'>
                      <Mic className='h-4 w-4 mr-1' />
                      Mute
                    </Button>
                    <Button size='sm' variant='outline' className='text-xs'>
                      <Camera className='h-4 w-4 mr-1' />
                      Video
                    </Button>
                    <Button size='sm' variant='outline' className='text-xs'>
                      <Monitor className='h-4 w-4 mr-1' />
                      Share
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}

        {selectedTab === 'past' &&
          pastSessions.map((session) => (
            <Card
              key={session.id}
              className='bg-white border border-gray-200 shadow-sm hover:shadow-md transition-shadow'
            >
              <CardContent className='p-6'>
                <div className='flex items-start justify-between mb-4'>
                  <div className='flex items-start gap-4'>
                    <div className='w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center'>
                      <CheckCircle className='h-6 w-6 text-green-600' />
                    </div>
                    <div className='flex-1'>
                      <div className='flex items-center gap-2 mb-2'>
                        <h3 className='text-lg font-semibold text-gray-900'>
                          {session.title}
                        </h3>
                        <Badge className={getStatusColor(session.status)}>
                          {session.status}
                        </Badge>
                      </div>
                      <p className='text-gray-600 mb-3'>
                        {session.description}
                      </p>
                      <div className='flex items-center gap-4 text-sm text-gray-500'>
                        <div className='flex items-center gap-1'>
                          <Calendar className='h-4 w-4' />
                          {session.date}
                        </div>
                        <div className='flex items-center gap-1'>
                          <Clock className='h-4 w-4' />
                          {session.duration}
                        </div>
                        <div className='flex items-center gap-1'>
                          <Users className='h-4 w-4' />
                          {session.attendees} attended
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className='flex items-center gap-2'>
                    <Button
                      size='sm'
                      variant='outline'
                      onClick={() =>
                        window.open(session.recordingUrl, '_blank')
                      }
                    >
                      <Play className='h-4 w-4' />
                    </Button>
                    <Button
                      size='sm'
                      variant='outline'
                      onClick={() => handleEditSession(session.id)}
                    >
                      <Edit className='h-4 w-4' />
                    </Button>
                  </div>
                </div>
                <div className='flex items-center justify-between pt-4 border-t border-gray-100'>
                  <div className='flex items-center gap-2'>
                    <Avatar className='h-6 w-6'>
                      <AvatarImage
                        src={session.hostAvatar}
                        alt={session.host}
                      />
                      <AvatarFallback className='text-xs'>
                        {session.host
                          .split(' ')
                          .map((n) => n[0])
                          .join('')}
                      </AvatarFallback>
                    </Avatar>
                    <span className='text-sm text-gray-600'>
                      {session.host}
                    </span>
                  </div>
                  <div className='flex gap-2'>
                    <Button size='sm' variant='outline' className='text-xs'>
                      <Download className='h-4 w-4 mr-1' />
                      Recording
                    </Button>
                    <Button size='sm' variant='outline' className='text-xs'>
                      <BarChart3 className='h-4 w-4 mr-1' />
                      Analytics
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
      </div>

      {/* Floating Action Button */}
      <div className='fixed bottom-6 right-6 z-50'>
        <Button
          className='h-12 w-12 rounded-full bg-blue-600 hover:bg-blue-700 text-white shadow-lg'
          onClick={handleCreateSession}
        >
          <Plus className='h-5 w-5' />
        </Button>
      </div>
    </div>
  );
};

export default UniversityLiveSessions;
