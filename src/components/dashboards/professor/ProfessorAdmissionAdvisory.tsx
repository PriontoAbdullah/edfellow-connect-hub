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
  Target,
  Lightbulb,
  BookMarked,
  Search,
  Filter,
  Edit,
  Trash2,
  Download,
  Upload,
  Play,
  Pause,
  Lock,
  Unlock,
  Users2,
  Link,
  Copy,
  Share,
  Flag,
  AlertCircle,
  Info,
  HelpCircle,
  Zap,
  Shield,
  Trophy,
  Medal,
  Crown,
  MessageCircle,
  Mail,
  Phone,
  Wifi,
  Volume2,
  Mic,
  Camera,
  Monitor,
  Server,
  Database,
  Cloud,
  RefreshCw,
  ZoomIn,
  ZoomOut,
  Maximize,
  Minimize,
  X,
  Minus,
  Equal,
  Percent,
  Hash,
  AtSign,
  Euro,
  Bitcoin,
  CreditCard,
  Wallet,
  PiggyBank,
  TrendingDown,
  Activity,
  PieChart,
  BarChart,
  LineChart,
  ScatterChart,
  AreaChart,
  Radar,
  Gauge,
  Thermometer,
  Droplets,
  Flame,
  Snowflake,
  CloudRain,
  CloudLightning,
  Sun,
  Moon,
  Sunrise,
  Sunset,
  Umbrella,
  Wind,
  Navigation,
  Compass,
  Map,
  Navigation2,
  Home,
  Building2,
  Store,
  ShoppingBag,
  ShoppingCart,
  Package,
  Truck,
  Car,
  Bike,
  Bus,
  Train,
  Plane,
  Ship,
  Rocket,
  Anchor,
  LifeBuoy,
  Key,
  Fingerprint,
  EyeOff,
  User,
  UserX,
  UserMinus,
  UserCog,
  UserSearch,
  Bot,
  Cpu,
  HardDrive,
  MemoryStick,
  Mouse,
  Printer,
  Speaker,
  Headphones,
  Keyboard,
  MousePointer,
  MousePointer2,
  Touchpad,
  Gamepad2,
  Joystick,
  Tv,
  Radio,
  Volume1,
  VolumeX,
  MicOff,
  CameraOff,
  Monitor as MonitorIcon,
  Smartphone,
  Tablet,
  Laptop,
  CloudOff,
  Download as DownloadIcon,
  Upload as UploadIcon,
  RotateCcw,
  RotateCw,
} from 'lucide-react';

const ProfessorAdmissionAdvisory = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [searchTerm, setSearchTerm] = useState('');

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

  const applications = [
    {
      id: 1,
      student: 'Alice Wang',
      avatar: '/api/placeholder/40/40',
      program: 'Master of Computer Science',
      gpa: 3.8,
      gre: 325,
      status: 'pending',
      submittedDate: 'Dec 10, 2024',
      priority: 'high',
      country: 'China',
    },
    {
      id: 2,
      student: 'Bob Smith',
      avatar: '/api/placeholder/40/40',
      program: 'PhD in Computer Science',
      gpa: 3.9,
      gre: 330,
      status: 'approved',
      submittedDate: 'Dec 5, 2024',
      priority: 'normal',
      country: 'USA',
    },
    {
      id: 3,
      student: 'Carol Johnson',
      avatar: '/api/placeholder/40/40',
      program: 'Master of Computer Science',
      gpa: 3.6,
      gre: 315,
      status: 'under_review',
      submittedDate: 'Dec 8, 2024',
      priority: 'normal',
      country: 'Canada',
    },
  ];

  const advisingSessions = [
    {
      id: 1,
      student: 'David Brown',
      topic: 'Course Selection for Spring 2025',
      date: 'Dec 15, 2024',
      time: '2:00 PM',
      duration: '30 min',
      status: 'scheduled',
    },
    {
      id: 2,
      student: 'Emma Davis',
      topic: 'Research Project Discussion',
      date: 'Dec 16, 2024',
      time: '10:00 AM',
      duration: '45 min',
      status: 'scheduled',
    },
  ];

  const handleApplicationAction = (applicationId: number, action: string) => {
    toast({
      title: `${action} Application`,
      description: `${action} action performed on application ${applicationId}`,
    });
  };

  const handleScheduleSession = () => {
    toast({
      title: 'Schedule Session',
      description: 'Session scheduling form will open...',
    });
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'approved':
        return 'bg-green-100 text-green-800';
      case 'pending':
        return 'bg-yellow-100 text-yellow-800';
      case 'under_review':
        return 'bg-blue-100 text-blue-800';
      case 'rejected':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high':
        return 'bg-red-100 text-red-800';
      case 'normal':
        return 'bg-blue-100 text-blue-800';
      case 'low':
        return 'bg-gray-100 text-gray-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const filteredApplications = applications.filter(application => {
    return application.student.toLowerCase().includes(searchTerm.toLowerCase()) ||
           application.program.toLowerCase().includes(searchTerm.toLowerCase());
  });

  return (
    <div className='grid grid-cols-1 lg:grid-cols-12 gap-6'>
      {/* Main Content Area */}
      <div className='lg:col-span-8 space-y-4'>
        {/* Header */}
        <div className='flex items-center justify-between'>
          <div>
            <h1 className='text-2xl font-bold text-gray-900'>Admission & Academic Advisory</h1>
            <p className='text-gray-600'>Manage applications and provide academic guidance</p>
          </div>
          <Button
            onClick={handleScheduleSession}
            className='bg-green-600 hover:bg-green-700 text-white'
          >
            <Plus className='h-4 w-4 mr-2' />
            Schedule Session
          </Button>
        </div>

        {/* Search */}
        <Card className='bg-white border border-gray-200 shadow-sm'>
          <CardContent className='p-4'>
            <div className='flex items-center gap-4'>
              <div className='flex-1 relative'>
                <Search className='absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4' />
                <Input
                  placeholder='Search applications...'
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className='pl-10'
                />
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Applications List */}
        <div className='space-y-4'>
          {filteredApplications.map((application) => (
            <Card
              key={application.id}
              className='bg-white border border-gray-200 shadow-sm hover:shadow-md transition-shadow'
            >
              <CardHeader className='pb-3'>
                <div className='flex items-start justify-between'>
                  <div className='flex items-center gap-4'>
                    <Avatar className='h-12 w-12'>
                      <AvatarImage src={application.avatar} alt={application.student} />
                      <AvatarFallback className='bg-blue-100 text-blue-600'>
                        {application.student.split(' ').map(n => n[0]).join('')}
                      </AvatarFallback>
                    </Avatar>
                    <div>
                      <CardTitle className='text-lg font-semibold text-gray-900'>
                        {application.student}
                      </CardTitle>
                      <CardDescription className='text-sm text-gray-600'>
                        {application.program} • {application.country}
                      </CardDescription>
                    </div>
                  </div>
                  <div className='flex items-center gap-2'>
                    <Badge className={getStatusColor(application.status)}>
                      {application.status.replace('_', ' ')}
                    </Badge>
                    <Badge className={getPriorityColor(application.priority)}>
                      {application.priority}
                    </Badge>
                  </div>
                </div>
              </CardHeader>
              <CardContent className='space-y-4'>
                {/* Academic Info */}
                <div className='grid grid-cols-2 md:grid-cols-4 gap-4 text-sm'>
                  <div className='text-center p-3 bg-blue-50 rounded-lg'>
                    <div className='text-lg font-bold text-blue-600'>{application.gpa}</div>
                    <div className='text-xs text-gray-600'>GPA</div>
                  </div>
                  <div className='text-center p-3 bg-green-50 rounded-lg'>
                    <div className='text-lg font-bold text-green-600'>{application.gre}</div>
                    <div className='text-xs text-gray-600'>GRE</div>
                  </div>
                  <div className='text-center p-3 bg-purple-50 rounded-lg'>
                    <div className='text-lg font-bold text-purple-600'>3</div>
                    <div className='text-xs text-gray-600'>Letters</div>
                  </div>
                  <div className='text-center p-3 bg-yellow-50 rounded-lg'>
                    <div className='text-lg font-bold text-yellow-600'>{application.submittedDate}</div>
                    <div className='text-xs text-gray-600'>Submitted</div>
                  </div>
                </div>

                {/* Actions */}
                <div className='flex items-center justify-between pt-3 border-t border-gray-100'>
                  <div className='text-xs text-gray-500'>
                    Submitted: {application.submittedDate}
                  </div>
                  <div className='flex items-center gap-2'>
                    <Button
                      variant='outline'
                      size='sm'
                      onClick={() => handleApplicationAction(application.id, 'View')}
                    >
                      <Eye className='h-4 w-4 mr-1' />
                      View Details
                    </Button>
                    <Button
                      variant='outline'
                      size='sm'
                      onClick={() => handleApplicationAction(application.id, 'Review')}
                    >
                      <Edit className='h-4 w-4 mr-1' />
                      Review
                    </Button>
                    <Button
                      variant='outline'
                      size='sm'
                      onClick={() => handleApplicationAction(application.id, 'Message')}
                    >
                      <MessageSquare className='h-4 w-4 mr-1' />
                      Message
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      {/* Right Sidebar */}
      <div className='lg:col-span-4 space-y-4'>
        {/* Advising Sessions */}
        <Card className='bg-white border border-gray-200 shadow-sm'>
          <CardHeader className='pb-3'>
            <CardTitle className='text-lg font-semibold text-gray-900'>
              Upcoming Advising Sessions
            </CardTitle>
          </CardHeader>
          <CardContent className='space-y-3'>
            {advisingSessions.map((session) => (
              <div
                key={session.id}
                className='border border-gray-200 rounded-lg p-3 bg-blue-50'
              >
                <div className='flex items-center gap-3 mb-2'>
                  <div className='w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center'>
                    <Calendar className='h-4 w-4 text-blue-600' />
                  </div>
                  <div className='flex-1'>
                    <h4 className='font-semibold text-sm text-gray-900'>
                      {session.student}
                    </h4>
                    <p className='text-xs text-gray-600'>{session.topic}</p>
                  </div>
                </div>
                <div className='text-xs text-blue-700'>
                  {session.date} at {session.time} ({session.duration})
                </div>
              </div>
            ))}
            <Button
              variant='ghost'
              className='w-full text-green-600 hover:text-green-700 text-sm'
            >
              View all sessions →
            </Button>
          </CardContent>
        </Card>

        {/* Quick Stats */}
        <Card className='bg-white border border-gray-200 shadow-sm'>
          <CardHeader className='pb-3'>
            <CardTitle className='text-lg font-semibold text-gray-900'>
              Application Overview
            </CardTitle>
          </CardHeader>
          <CardContent className='space-y-3'>
            <div className='grid grid-cols-2 gap-3'>
              <div className='text-center p-3 bg-green-50 rounded-lg'>
                <div className='text-lg font-bold text-green-600'>
                  {applications.filter(a => a.status === 'approved').length}
                </div>
                <div className='text-xs text-gray-600'>Approved</div>
              </div>
              <div className='text-center p-3 bg-blue-50 rounded-lg'>
                <div className='text-lg font-bold text-blue-600'>
                  {applications.filter(a => a.status === 'pending' || a.status === 'under_review').length}
                </div>
                <div className='text-xs text-gray-600'>Pending Review</div>
              </div>
            </div>
            <div className='grid grid-cols-2 gap-3'>
              <div className='text-center p-3 bg-purple-50 rounded-lg'>
                <div className='text-lg font-bold text-purple-600'>
                  {advisingSessions.length}
                </div>
                <div className='text-xs text-gray-600'>Scheduled Sessions</div>
              </div>
              <div className='text-center p-3 bg-yellow-50 rounded-lg'>
                <div className='text-lg font-bold text-yellow-600'>
                  {applications.length}
                </div>
                <div className='text-xs text-gray-600'>Total Applications</div>
              </div>
            </div>
            <Button
              variant='outline'
              className='w-full border-green-200 text-green-600 hover:bg-green-50'
            >
              <BarChart3 className='h-4 w-4 mr-2' />
              View Analytics
            </Button>
          </CardContent>
        </Card>
      </div>

      {/* Floating Action Button */}
      <div className='fixed bottom-6 right-6 z-50'>
        <Button
          className='h-12 w-12 rounded-full bg-green-600 hover:bg-green-700 text-white shadow-lg'
          onClick={handleScheduleSession}
        >
          <Plus className='h-5 w-5' />
        </Button>
      </div>
    </div>
  );
};

export default ProfessorAdmissionAdvisory;
