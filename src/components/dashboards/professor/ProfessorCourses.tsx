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
  Target,
  Lightbulb,
  BookMarked,
  Target as TargetIcon,
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
  FileText as FileTextIcon,
  Video as VideoIcon,
  Link,
  Copy,
  Share,
  Flag,
  AlertCircle,
  Info,
  HelpCircle,
  Zap,
  Shield,
  Award as AwardIcon,
  Trophy,
  Medal,
  Crown,
  Star as StarIcon,
  Heart as HeartIcon,
  ThumbsUp as ThumbsUpIcon,
  MessageCircle,
  Mail,
  Phone,
  MapPin as MapPinIcon,
  Globe as GlobeIcon,
  Wifi,
  WifiOff,
  Volume2,
  VolumeX,
  Mic,
  MicOff,
  Camera,
  CameraOff,
  Monitor,
  Smartphone,
  Tablet,
  Laptop,
  Desktop,
  Server,
  Database,
  Cloud,
  CloudOff,
  Download as DownloadIcon,
  Upload as UploadIcon,
  RefreshCw,
  RotateCcw,
  RotateCw,
  ZoomIn,
  ZoomOut,
  Maximize,
  Minimize,
  X,
  Minus,
  Plus as PlusIcon,
  Equal,
  Divide,
  Percent,
  Hash,
  AtSign,
  DollarSign as DollarSignIcon,
  Euro,
  Pound,
  Yen,
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
  Shield as ShieldIcon,
  Lock as LockIcon,
  Unlock as UnlockIcon,
  Key,
  Fingerprint,
  Eye as EyeIcon,
  EyeOff,
  User,
  UserX,
  UserCheck as UserCheckIcon,
  UserMinus,
  UserPlus as UserPlusIcon,
  Users as UsersIcon,
  UserCog,
  UserEdit,
  UserSearch,
  UserVoice,
  UserWarning,
  UserX as UserXIcon,
  Bot,
  Cpu,
  HardDrive,
  MemoryStick,
  Monitor as MonitorIcon,
  Mouse,
  Printer,
  Scanner,
  Speaker,
  Headphones,
  Keyboard,
  MousePointer,
  MousePointer2,
  Touchpad,
  Gamepad2,
  Joystick,
  Controller,
  Remote,
  Tv,
  Radio,
  WalkieTalkie,
  Megaphone as MegaphoneIcon,
  Volume1,
  Volume as VolumeIcon,
  VolumeX as VolumeXIcon,
  Music,
  Music2,
  Music3,
  Music4,
  Disc,
  Disc2,
  Disc3,
  Vinyl,
  Cassette,
  Cd,
  Dvd,
  Bluray,
  Vhs,
  Film,
  Video as VideoIcon2,
  VideoOff,
  Camera as CameraIcon,
  CameraOff as CameraOffIcon,
  Webcam,
  WebcamOff,
  Phone as PhoneIcon,
  PhoneCall,
  PhoneForwarded,
  PhoneIncoming,
  PhoneMissed,
  PhoneOff,
  PhoneOutgoing,
  Voicemail,
  MessageSquare as MessageSquareIcon,
  MessageCircle as MessageCircleIcon,
  MessageCircleMore,
  MessageSquareMore,
  MessageSquarePlus,
  MessageSquareReply,
  MessageSquareText,
  MessageSquareX,
  MessageCirclePlus,
  MessageCircleReply,
  MessageCircleText,
  MessageCircleX,
  Mail as MailIcon,
  MailCheck,
  MailMinus,
  MailOpen,
  MailPlus,
  MailQuestion,
  MailSearch,
  MailWarning,
  MailX,
  Inbox,
  InboxIcon,
  Archive,
  ArchiveX,
  Send as SendIcon,
  SendHorizontal,
  Reply,
  ReplyAll,
  Forward,
  ForwardAll,
  Share as ShareIcon,
  Share2 as Share2Icon,
  ExternalLink as ExternalLinkIcon,
  Link as LinkIcon,
  Link2,
  Link2Off,
  Copy as CopyIcon,
  CopyCheck,
  CopyX,
  Scissors,
  File,
  FileText as FileTextIcon2,
  FileImage,
  FileVideo,
  FileAudio,
  FileArchive,
  FileCode,
  FileSpreadsheet,
  FileType,
  FileType2,
  FileCheck,
  FileMinus,
  FilePlus,
  FileQuestion,
  FileSearch,
  FileWarning,
  FileX,
  Folder,
  FolderOpen,
  FolderPlus,
  FolderMinus,
  FolderX,
  FolderCheck,
  FolderSearch,
  FolderArchive,
  FolderLock,
  FolderUnlock,
  FolderCog,
  FolderHeart,
  FolderKanban,
  FolderGit,
  FolderGit2,
  FolderTree,
  FolderDown,
  FolderUp,
  FolderInput,
  FolderOutput,
  FolderSymlink,
  FolderSymlink2,
  FolderClosed,
  FolderClosed2,
  FolderOpen2,
  FolderOpen3,
  FolderOpen4,
  FolderOpen5,
  FolderOpen6,
  FolderOpen7,
  FolderOpen8,
  FolderOpen9,
  FolderOpen10,
  FolderOpen11,
  FolderOpen12,
  FolderOpen13,
  FolderOpen14,
  FolderOpen15,
  FolderOpen16,
  FolderOpen17,
  FolderOpen18,
  FolderOpen19,
  FolderOpen20,
  FolderOpen21,
  FolderOpen22,
  FolderOpen23,
  FolderOpen24,
  FolderOpen25,
  FolderOpen26,
  FolderOpen27,
  FolderOpen28,
  FolderOpen29,
  FolderOpen30,
  FolderOpen31,
  FolderOpen32,
  FolderOpen33,
  FolderOpen34,
  FolderOpen35,
  FolderOpen36,
  FolderOpen37,
  FolderOpen38,
  FolderOpen39,
  FolderOpen40,
  FolderOpen41,
  FolderOpen42,
  FolderOpen43,
  FolderOpen44,
  FolderOpen45,
  FolderOpen46,
  FolderOpen47,
  FolderOpen48,
  FolderOpen49,
  FolderOpen50,
  FolderOpen51,
  FolderOpen52,
  FolderOpen53,
  FolderOpen54,
  FolderOpen55,
  FolderOpen56,
  FolderOpen57,
  FolderOpen58,
  FolderOpen59,
  FolderOpen60,
  FolderOpen61,
  FolderOpen62,
  FolderOpen63,
  FolderOpen64,
  FolderOpen65,
  FolderOpen66,
  FolderOpen67,
  FolderOpen68,
  FolderOpen69,
  FolderOpen70,
  FolderOpen71,
  FolderOpen72,
  FolderOpen73,
  FolderOpen74,
  FolderOpen75,
  FolderOpen76,
  FolderOpen77,
  FolderOpen78,
  FolderOpen79,
  FolderOpen80,
  FolderOpen81,
  FolderOpen82,
  FolderOpen83,
  FolderOpen84,
  FolderOpen85,
  FolderOpen86,
  FolderOpen87,
  FolderOpen88,
  FolderOpen89,
  FolderOpen90,
  FolderOpen91,
  FolderOpen92,
  FolderOpen93,
  FolderOpen94,
  FolderOpen95,
  FolderOpen96,
  FolderOpen97,
  FolderOpen98,
  FolderOpen99,
  FolderOpen100,
} from 'lucide-react';

const ProfessorCourses = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedFilter, setSelectedFilter] = useState('all');

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

  const courses = [
    {
      id: 1,
      code: 'CS201',
      name: 'Introduction to Computer Science',
      description: 'Fundamental concepts of computer science and programming',
      students: 45,
      activeStudents: 42,
      completionRate: 93,
      rating: 4.6,
      status: 'active',
      semester: 'Fall 2024',
      credits: 3,
      schedule: 'Mon, Wed, Fri 10:00 AM - 11:30 AM',
      location: 'Building 10, Room 201',
      assignments: 8,
      exams: 2,
      projects: 3,
      officeHours: 'Tue, Thu 2:00 PM - 4:00 PM',
      syllabus: '/syllabus/cs201.pdf',
      materials: 15,
      announcements: 3,
      discussions: 12,
    },
    {
      id: 2,
      code: 'CS301',
      name: 'Data Structures and Algorithms',
      description: 'Advanced data structures and algorithmic analysis',
      students: 38,
      activeStudents: 35,
      completionRate: 92,
      rating: 4.7,
      status: 'active',
      semester: 'Fall 2024',
      credits: 4,
      schedule: 'Tue, Thu 1:00 PM - 2:30 PM',
      location: 'Building 10, Room 305',
      assignments: 10,
      exams: 3,
      projects: 4,
      officeHours: 'Mon, Wed 3:00 PM - 5:00 PM',
      syllabus: '/syllabus/cs301.pdf',
      materials: 22,
      announcements: 5,
      discussions: 18,
    },
    {
      id: 3,
      code: 'CS401',
      name: 'Software Engineering',
      description: 'Software development methodologies and best practices',
      students: 32,
      activeStudents: 30,
      completionRate: 94,
      rating: 4.8,
      status: 'active',
      semester: 'Fall 2024',
      credits: 3,
      schedule: 'Mon, Wed 2:00 PM - 3:30 PM',
      location: 'Building 10, Room 401',
      assignments: 6,
      exams: 2,
      projects: 2,
      officeHours: 'Fri 1:00 PM - 3:00 PM',
      syllabus: '/syllabus/cs401.pdf',
      materials: 18,
      announcements: 2,
      discussions: 8,
    },
    {
      id: 4,
      code: 'CS501',
      name: 'Machine Learning',
      description:
        'Introduction to machine learning algorithms and applications',
      students: 28,
      activeStudents: 26,
      completionRate: 93,
      rating: 4.9,
      status: 'active',
      semester: 'Fall 2024',
      credits: 4,
      schedule: 'Tue, Thu 3:00 PM - 4:30 PM',
      location: 'Building 10, Room 501',
      assignments: 12,
      exams: 3,
      projects: 5,
      officeHours: 'Mon 4:00 PM - 6:00 PM',
      syllabus: '/syllabus/cs501.pdf',
      materials: 25,
      announcements: 4,
      discussions: 15,
    },
  ];

  const recentActivities = [
    {
      id: 1,
      course: 'CS201',
      activity: 'Assignment 3 submitted by 42 students',
      time: '2 hours ago',
      type: 'submission',
    },
    {
      id: 2,
      course: 'CS301',
      activity: 'New discussion topic: "Optimization Techniques"',
      time: '4 hours ago',
      type: 'discussion',
    },
    {
      id: 3,
      course: 'CS401',
      activity: 'Project milestone 1 due date updated',
      time: '1 day ago',
      type: 'update',
    },
    {
      id: 4,
      course: 'CS501',
      activity: 'Office hours scheduled for tomorrow',
      time: '1 day ago',
      type: 'schedule',
    },
  ];

  const upcomingDeadlines = [
    {
      id: 1,
      course: 'CS201',
      title: 'Assignment 4 Due',
      deadline: 'Dec 15, 2024',
      type: 'assignment',
    },
    {
      id: 2,
      course: 'CS301',
      title: 'Midterm Exam',
      deadline: 'Dec 18, 2024',
      type: 'exam',
    },
    {
      id: 3,
      course: 'CS401',
      title: 'Project Presentation',
      deadline: 'Dec 20, 2024',
      type: 'project',
    },
  ];

  const handleCreateCourse = () => {
    toast({
      title: 'Create New Course',
      description: 'Course creation form will open...',
    });
  };

  const handleCourseAction = (courseId: number, action: string) => {
    toast({
      title: `${action} Course`,
      description: `${action} action performed on course ${courseId}`,
    });
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active':
        return 'bg-green-100 text-green-800';
      case 'inactive':
        return 'bg-gray-100 text-gray-800';
      case 'draft':
        return 'bg-yellow-100 text-yellow-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getActivityIcon = (type: string) => {
    switch (type) {
      case 'submission':
        return FileText;
      case 'discussion':
        return MessageSquare;
      case 'update':
        return Edit;
      case 'schedule':
        return Calendar;
      default:
        return Info;
    }
  };

  const getDeadlineIcon = (type: string) => {
    switch (type) {
      case 'assignment':
        return FileText;
      case 'exam':
        return Award;
      case 'project':
        return Target;
      default:
        return Calendar;
    }
  };

  const filteredCourses = courses.filter((course) => {
    const matchesSearch =
      course.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      course.code.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesFilter =
      selectedFilter === 'all' || course.status === selectedFilter;
    return matchesSearch && matchesFilter;
  });

  return (
    <div className='grid grid-cols-1 lg:grid-cols-12 gap-6'>
      {/* Main Content Area */}
      <div className='lg:col-span-8 space-y-4'>
        {/* Header */}
        <div className='flex items-center justify-between'>
          <div>
            <h1 className='text-2xl font-bold text-gray-900'>My Courses</h1>
            <p className='text-gray-600'>
              Manage your courses and track student progress
            </p>
          </div>
          <Button
            onClick={handleCreateCourse}
            className='bg-green-600 hover:bg-green-700 text-white'
          >
            <Plus className='h-4 w-4 mr-2' />
            Create Course
          </Button>
        </div>

        {/* Search and Filter */}
        <Card className='bg-white border border-gray-200 shadow-sm'>
          <CardContent className='p-4'>
            <div className='flex items-center gap-4'>
              <div className='flex-1 relative'>
                <Search className='absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4' />
                <Input
                  placeholder='Search courses...'
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className='pl-10'
                />
              </div>
              <select
                value={selectedFilter}
                onChange={(e) => setSelectedFilter(e.target.value)}
                className='px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500'
              >
                <option value='all'>All Courses</option>
                <option value='active'>Active</option>
                <option value='inactive'>Inactive</option>
                <option value='draft'>Draft</option>
              </select>
            </div>
          </CardContent>
        </Card>

        {/* Courses Grid */}
        <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
          {filteredCourses.map((course) => (
            <Card
              key={course.id}
              className='bg-white border border-gray-200 shadow-sm hover:shadow-md transition-shadow'
            >
              <CardHeader className='pb-3'>
                <div className='flex items-start justify-between'>
                  <div>
                    <CardTitle className='text-lg font-semibold text-gray-900'>
                      {course.code}
                    </CardTitle>
                    <CardDescription className='text-sm text-gray-600'>
                      {course.name}
                    </CardDescription>
                  </div>
                  <Badge className={getStatusColor(course.status)}>
                    {course.status}
                  </Badge>
                </div>
              </CardHeader>
              <CardContent className='space-y-3'>
                <p className='text-sm text-gray-700 line-clamp-2'>
                  {course.description}
                </p>

                <div className='grid grid-cols-2 gap-3 text-sm'>
                  <div>
                    <span className='text-gray-600'>Students:</span>
                    <span className='font-medium ml-1'>{course.students}</span>
                  </div>
                  <div>
                    <span className='text-gray-600'>Completion:</span>
                    <span className='font-medium ml-1'>
                      {course.completionRate}%
                    </span>
                  </div>
                  <div>
                    <span className='text-gray-600'>Rating:</span>
                    <span className='font-medium ml-1'>
                      {course.rating}/5.0
                    </span>
                  </div>
                  <div>
                    <span className='text-gray-600'>Credits:</span>
                    <span className='font-medium ml-1'>{course.credits}</span>
                  </div>
                </div>

                <div className='flex items-center gap-2 pt-2'>
                  <Button
                    variant='outline'
                    size='sm'
                    className='flex-1'
                    onClick={() => handleCourseAction(course.id, 'View')}
                  >
                    <Eye className='h-4 w-4 mr-1' />
                    View
                  </Button>
                  <Button
                    variant='outline'
                    size='sm'
                    className='flex-1'
                    onClick={() => handleCourseAction(course.id, 'Edit')}
                  >
                    <Edit className='h-4 w-4 mr-1' />
                    Edit
                  </Button>
                  <Button
                    variant='outline'
                    size='sm'
                    onClick={() => handleCourseAction(course.id, 'More')}
                  >
                    <MoreHorizontal className='h-4 w-4' />
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      {/* Right Sidebar */}
      <div className='lg:col-span-4 space-y-4'>
        {/* Recent Activities */}
        <Card className='bg-white border border-gray-200 shadow-sm'>
          <CardHeader className='pb-3'>
            <CardTitle className='text-lg font-semibold text-gray-900'>
              Recent Activities
            </CardTitle>
          </CardHeader>
          <CardContent className='space-y-3'>
            {recentActivities.map((activity) => (
              <div
                key={activity.id}
                className='border border-gray-200 rounded-lg p-3 hover:bg-gray-50'
              >
                <div className='flex items-start gap-3'>
                  <div className='w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center'>
                    {activity.type === 'submission' ? (
                      <FileText className='h-4 w-4 text-blue-600' />
                    ) : activity.type === 'discussion' ? (
                      <MessageSquare className='h-4 w-4 text-blue-600' />
                    ) : activity.type === 'update' ? (
                      <Edit className='h-4 w-4 text-blue-600' />
                    ) : (
                      <Calendar className='h-4 w-4 text-blue-600' />
                    )}
                  </div>
                  <div className='flex-1'>
                    <div className='flex items-center gap-2 mb-1'>
                      <span className='font-medium text-sm text-gray-900'>
                        {activity.course}
                      </span>
                      <span className='text-xs text-gray-500'>
                        {activity.time}
                      </span>
                    </div>
                    <p className='text-sm text-gray-700'>{activity.activity}</p>
                  </div>
                </div>
              </div>
            ))}
            <Button
              variant='ghost'
              className='w-full text-green-600 hover:text-green-700 text-sm'
            >
              View all activities →
            </Button>
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
            {upcomingDeadlines.map((deadline) => (
              <div
                key={deadline.id}
                className='border border-gray-200 rounded-lg p-3 bg-red-50'
              >
                <div className='flex items-center gap-3 mb-2'>
                  <div className='w-8 h-8 bg-red-100 rounded-full flex items-center justify-center'>
                    {deadline.type === 'assignment' ? (
                      <FileText className='h-4 w-4 text-red-600' />
                    ) : deadline.type === 'exam' ? (
                      <Award className='h-4 w-4 text-red-600' />
                    ) : (
                      <Target className='h-4 w-4 text-red-600' />
                    )}
                  </div>
                  <div>
                    <h4 className='font-semibold text-sm text-gray-900'>
                      {deadline.course}
                    </h4>
                    <p className='text-xs text-gray-600'>{deadline.title}</p>
                  </div>
                </div>
                <p className='text-sm text-red-700 font-medium'>
                  Due: {deadline.deadline}
                </p>
              </div>
            ))}
            <Button
              variant='ghost'
              className='w-full text-green-600 hover:text-green-700 text-sm'
            >
              View all deadlines →
            </Button>
          </CardContent>
        </Card>

        {/* Quick Stats */}
        <Card className='bg-white border border-gray-200 shadow-sm'>
          <CardHeader className='pb-3'>
            <CardTitle className='text-lg font-semibold text-gray-900'>
              Course Overview
            </CardTitle>
          </CardHeader>
          <CardContent className='space-y-3'>
            <div className='grid grid-cols-2 gap-3'>
              <div className='text-center p-3 bg-green-50 rounded-lg'>
                <div className='text-lg font-bold text-green-600'>
                  {courses.length}
                </div>
                <div className='text-xs text-gray-600'>Active Courses</div>
              </div>
              <div className='text-center p-3 bg-blue-50 rounded-lg'>
                <div className='text-lg font-bold text-blue-600'>
                  {courses.reduce((sum, course) => sum + course.students, 0)}
                </div>
                <div className='text-xs text-gray-600'>Total Students</div>
              </div>
            </div>
            <div className='grid grid-cols-2 gap-3'>
              <div className='text-center p-3 bg-yellow-50 rounded-lg'>
                <div className='text-lg font-bold text-yellow-600'>
                  {courses.reduce((sum, course) => sum + course.assignments, 0)}
                </div>
                <div className='text-xs text-gray-600'>Total Assignments</div>
              </div>
              <div className='text-center p-3 bg-purple-50 rounded-lg'>
                <div className='text-lg font-bold text-purple-600'>
                  {(
                    courses.reduce((sum, course) => sum + course.rating, 0) /
                    courses.length
                  ).toFixed(1)}
                </div>
                <div className='text-xs text-gray-600'>Avg Rating</div>
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
          onClick={handleCreateCourse}
        >
          <Plus className='h-5 w-5' />
        </Button>
      </div>
    </div>
  );
};

export default ProfessorCourses;
