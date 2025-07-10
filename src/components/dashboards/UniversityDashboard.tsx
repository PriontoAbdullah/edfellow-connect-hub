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
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { useToast } from '@/hooks/use-toast';
import { Breadcrumb } from '../dashboard/Breadcrumb';
import AnalyticsModal from '../modals/AnalyticsModal';
import InfoPackModal from '../modals/InfoPackModal';
import WebinarControlsModal from '../modals/WebinarControlsModal';
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
} from 'lucide-react';

const UniversityDashboard = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [analyticsOpen, setAnalyticsOpen] = useState(false);
  const [infoPackOpen, setInfoPackOpen] = useState(false);
  const [webinarControlsOpen, setWebinarControlsOpen] = useState(false);
  const [selectedInquiry, setSelectedInquiry] = useState<any>(null);
  const [selectedWebinar, setSelectedWebinar] = useState<any>(null);

  // Scroll to top on component mount
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);

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

  const handleNewProgram = () => {
    navigate('/dashboard/programs');
  };

  const handleViewPrograms = () => {
    navigate('/dashboard/programs');
  };

  const handleMessages = () => {
    navigate('/dashboard/messages');
  };

  const handleEditProgram = (programId: number) => {
    const program = myPrograms.find((p) => p.id === programId);
    if (program) {
      // Navigate to program edit page with program data
      // navigate(`/dashboard/programs/edit/${programId}`, {
      //   state: { program },
      // });
      navigate('/dashboard/programs');
    }
  };

  const handleProgramAnalytics = (programId: number) => {
    const program = myPrograms.find((p) => p.id === programId);
    setAnalyticsOpen(true);
  };

  const handleReplyToInquiry = (inquiryId: number) => {
    const inquiry = studentInquiries.find((i) => i.id === inquiryId);
    if (inquiry) {
      // Navigate to messages page with reply interface
      navigate('/dashboard/messages', {
        state: {
          replyTo: inquiry,
          action: 'reply',
        },
      });
    }
  };

  const handleScheduleSession = () => {
    // Direct session scheduling
  };

  const handleStartWebinar = (webinarId: number) => {
    const webinar = upcomingSessions.find((w) => w.id === webinarId);
    setSelectedWebinar(webinar);
    setWebinarControlsOpen(true);
  };

  const handleFullAnalytics = () => {
    setAnalyticsOpen(true);
  };

  const handleInfoPack = (inquiryId: number) => {
    const inquiry = studentInquiries.find((i) => i.id === inquiryId);
    setSelectedInquiry(inquiry);
    setInfoPackOpen(true);
  };

  const handleEditWebinar = (webinarId: number) => {
    const webinar = upcomingSessions.find((w) => w.id === webinarId);
    // Direct webinar editing
  };

  const handleWebinarSettings = (webinarId: number) => {
    const webinar = upcomingSessions.find((w) => w.id === webinarId);
    // Direct webinar settings
  };

  const handleShareWebinar = (webinarId: number) => {
    const webinar = upcomingSessions.find((w) => w.id === webinarId);
    // Direct webinar sharing
  };

  const handleWebinarControls = (webinarId: number, action: string) => {
    const webinar = upcomingSessions.find((w) => w.id === webinarId);
    switch (action) {
      case 'start':
        handleStartWebinar(webinarId);
        break;
      case 'edit':
        handleEditWebinar(webinarId);
        break;
      case 'settings':
        handleWebinarSettings(webinarId);
        break;
      case 'share':
        handleShareWebinar(webinarId);
        break;
      default:
        break;
    }
  };

  return (
    <div className='min-h-screen bg-gradient-to-br from-orange-50/30 via-white to-orange-100/20'>
      <div className='p-6 space-y-6'>
        <Breadcrumb items={[{ label: 'Dashboard' }]} />

        {/* Welcome Section */}
        <Card className='bg-gradient-to-r from-orange-500 to-red-600 text-white'>
          <CardHeader>
            <CardTitle className='flex items-center gap-2'>
              <Building2 className='h-6 w-6' />
              Welcome back, University Admin!
            </CardTitle>
            <CardDescription className='text-orange-100'>
              You have 3 new student inquiries and 2 upcoming live sessions
              today.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className='grid grid-cols-4 gap-4 mb-6'>
              <div className='text-center'>
                <div className='text-2xl font-bold'>12</div>
                <div className='text-sm text-orange-100'>Active Programs</div>
              </div>
              <div className='text-center'>
                <div className='text-2xl font-bold'>2,480</div>
                <div className='text-sm text-orange-100'>
                  Total Applications
                </div>
              </div>
              <div className='text-center'>
                <div className='text-2xl font-bold'>45,670</div>
                <div className='text-sm text-orange-100'>Website Visits</div>
              </div>
              <div className='text-center'>
                <div className='text-2xl font-bold'>$125K</div>
                <div className='text-sm text-orange-100'>Revenue</div>
              </div>
            </div>
            <div className='flex gap-3'>
              <Button
                variant='secondary'
                size='sm'
                className='bg-white/20 hover:bg-white/30 text-white border-white shadow-sm'
                onClick={handleFullAnalytics}
              >
                <TrendingUp className='h-4 w-4 mr-1' />
                Full Analytics
              </Button>
              <Button
                variant='outline'
                size='sm'
                className='bg-white/70 border-white/80 text-orange-600 hover:bg-white/20 hover:text-white'
                onClick={handleNewProgram}
              >
                <Plus className='h-4 w-4 mr-1' />
                New Program
              </Button>
            </div>
          </CardContent>
        </Card>

        <div className='grid lg:grid-cols-3 gap-6'>
          {/* My Programs */}
          <Card>
            <CardHeader>
              <div className='flex justify-between items-center'>
                <CardTitle className='text-lg flex items-center gap-2'>
                  <BookOpen className='h-5 w-5 text-blue-600' />
                  My Programs
                </CardTitle>
                <Button
                  size='sm'
                  className='bg-blue-600 hover:bg-blue-700'
                  onClick={handleViewPrograms}
                >
                  View All
                </Button>
              </div>
            </CardHeader>
            <CardContent className='space-y-4'>
              {myPrograms.map((program) => (
                <div key={program.id} className='border rounded-lg p-4'>
                  <div className='flex items-center justify-between mb-2'>
                    <h4 className='font-medium text-gray-900'>
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
                  <div className='grid grid-cols-2 gap-4 text-sm text-gray-600 mb-3'>
                    <div>
                      <span className='font-medium'>
                        {program.applications}
                      </span>{' '}
                      applications
                    </div>
                    <div>
                      <span className='font-medium'>{program.views}</span> views
                    </div>
                  </div>
                  <div className='flex gap-2'>
                    <Button
                      size='sm'
                      className='flex-1 bg-blue-600 hover:bg-blue-700'
                      onClick={() => handleProgramAnalytics(program.id)}
                    >
                      <BarChart3 className='h-3 w-3 mr-1' />
                      Analytics
                    </Button>
                    <Button
                      size='sm'
                      variant='outline'
                      className='flex-1'
                      onClick={() => handleEditProgram(program.id)}
                    >
                      <Edit className='h-3 w-3 mr-1' />
                      Edit
                    </Button>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>

          {/* Student Inquiries */}
          <Card>
            <CardHeader>
              <div className='flex justify-between items-center'>
                <CardTitle className='text-lg flex items-center gap-2'>
                  <MessageSquare className='h-5 w-5 text-green-600' />
                  Student Inquiries
                </CardTitle>
                <Badge className='bg-green-100 text-green-700'>
                  {studentInquiries.length} New
                </Badge>
              </div>
            </CardHeader>
            <CardContent className='space-y-4'>
              {studentInquiries.map((inquiry) => (
                <div key={inquiry.id} className='border rounded-lg p-4'>
                  <div className='flex items-start justify-between mb-2'>
                    <div className='flex items-center space-x-3'>
                      <Avatar className='h-8 w-8'>
                        <AvatarFallback className='bg-green-100 text-green-600'>
                          {inquiry.student
                            .split(' ')
                            .map((n) => n[0])
                            .join('')}
                        </AvatarFallback>
                      </Avatar>
                      <div>
                        <p className='font-medium text-sm text-gray-900'>
                          {inquiry.student}
                        </p>
                        <p className='text-xs text-gray-600'>
                          {inquiry.program}
                        </p>
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
                      className='bg-green-600 hover:bg-green-700 flex-1'
                      onClick={() => handleInfoPack(inquiry.id)}
                    >
                      <FileText className='h-3 w-3 mr-1' />
                      Info Pack
                    </Button>
                    <Button
                      size='sm'
                      variant='outline'
                      className='flex-1'
                      onClick={() => handleReplyToInquiry(inquiry.id)}
                    >
                      <Send className='h-3 w-3 mr-1' />
                      Reply
                    </Button>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>

          {/* Upcoming Live Sessions */}
          <Card>
            <CardHeader>
              <div className='flex justify-between items-center'>
                <CardTitle className='text-lg flex items-center gap-2'>
                  <Video className='h-5 w-5 text-purple-600' />
                  Upcoming Live Sessions
                </CardTitle>
                <Button
                  size='sm'
                  className='bg-purple-600 hover:bg-purple-700'
                  onClick={handleScheduleSession}
                >
                  <Plus className='h-4 w-4 mr-1' />
                  Schedule
                </Button>
              </div>
            </CardHeader>
            <CardContent className='space-y-4'>
              {upcomingSessions.map((session) => (
                <div key={session.id} className='border rounded-lg p-4'>
                  <div className='flex items-center justify-between mb-2'>
                    <h4 className='font-medium text-gray-900'>
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
                  <div className='text-sm text-gray-600 mb-3'>
                    <div className='flex items-center gap-2'>
                      <Calendar className='h-4 w-4' />
                      {session.date}
                    </div>
                    <div className='flex items-center gap-2 mt-1'>
                      <Users className='h-4 w-4' />
                      {session.registrations} registrations
                    </div>
                  </div>
                  <div className='grid grid-cols-2 gap-2'>
                    <Button
                      size='sm'
                      className='bg-purple-600 hover:bg-purple-700'
                      onClick={() => handleWebinarControls(session.id, 'start')}
                    >
                      <Video className='h-3 w-3 mr-1' />
                      Start
                    </Button>
                    <Button
                      size='sm'
                      variant='outline'
                      onClick={() =>
                        handleWebinarControls(session.id, 'settings')
                      }
                    >
                      <Settings className='h-3 w-3 mr-1' />
                      Settings
                    </Button>
                  </div>
                  <div className='flex gap-2 mt-2'>
                    <Button
                      size='sm'
                      variant='outline'
                      className='flex-1'
                      onClick={() => handleWebinarControls(session.id, 'edit')}
                    >
                      <Edit className='h-3 w-3 mr-1' />
                      Edit
                    </Button>
                    <Button
                      size='sm'
                      variant='outline'
                      className='flex-1'
                      onClick={() => handleWebinarControls(session.id, 'share')}
                    >
                      <Share2 className='h-3 w-3 mr-1' />
                      Share
                    </Button>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>
        </div>

        {/* Quick Actions */}
        <Card>
          <CardHeader>
            <CardTitle className='flex items-center gap-2'>
              <Award className='h-5 w-5 text-orange-600' />
              Quick Actions
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className='grid md:grid-cols-4 gap-4'>
              <Button
                variant='outline'
                className='h-20 flex-col gap-2'
                onClick={handleNewProgram}
              >
                <Plus className='h-6 w-6' />
                <span>Add New Program</span>
              </Button>
              <Button
                variant='outline'
                className='h-20 flex-col gap-2'
                onClick={handleMessages}
              >
                <MessageSquare className='h-6 w-6' />
                <span>View Messages</span>
              </Button>
              <Button
                variant='outline'
                className='h-20 flex-col gap-2'
                onClick={handleScheduleSession}
              >
                <Video className='h-6 w-6' />
                <span>Schedule Session</span>
              </Button>
              <Button
                variant='outline'
                className='h-20 flex-col gap-2'
                onClick={handleFullAnalytics}
              >
                <BarChart3 className='h-6 w-6' />
                <span>View Analytics</span>
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Modals */}
      <AnalyticsModal open={analyticsOpen} onOpenChange={setAnalyticsOpen} />
      <InfoPackModal
        open={infoPackOpen}
        onOpenChange={setInfoPackOpen}
        inquiry={selectedInquiry}
      />
      <WebinarControlsModal
        open={webinarControlsOpen}
        onOpenChange={setWebinarControlsOpen}
        webinar={selectedWebinar}
      />
    </div>
  );
};

export default UniversityDashboard;
