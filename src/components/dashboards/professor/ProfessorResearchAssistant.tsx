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

const ProfessorResearchAssistant = () => {
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

  const researchAssistants = [
    {
      id: 1,
      name: 'John Doe',
      avatar: '/api/placeholder/40/40',
      role: 'Graduate Research Assistant',
      department: 'Computer Science',
      projects: ['AI Research Project', 'Machine Learning Study'],
      skills: ['Python', 'TensorFlow', 'Data Analysis'],
      hours: 20,
      status: 'active',
      performance: 4.8,
      startDate: 'Sep 2024',
      salary: '$2,500/month',
      lastActivity: '2 hours ago',
    },
    {
      id: 2,
      name: 'Maria Chen',
      avatar: '/api/placeholder/40/40',
      role: 'Undergraduate Research Assistant',
      department: 'Computer Science',
      projects: ['Cybersecurity Research'],
      skills: ['Java', 'Network Security', 'Cryptography'],
      hours: 15,
      status: 'active',
      performance: 4.6,
      startDate: 'Oct 2024',
      salary: '$1,800/month',
      lastActivity: '1 day ago',
    },
    {
      id: 3,
      name: 'Alex Rodriguez',
      avatar: '/api/placeholder/40/40',
      role: 'Graduate Research Assistant',
      department: 'Computer Science',
      projects: ['Software Engineering Study', 'System Architecture'],
      skills: ['C++', 'System Design', 'Software Architecture'],
      hours: 25,
      status: 'active',
      performance: 4.9,
      startDate: 'Aug 2024',
      salary: '$2,800/month',
      lastActivity: '3 hours ago',
    },
  ];

  const researchProjects = [
    {
      id: 1,
      title: 'AI Research Project',
      description:
        'Advanced neural network architectures for computer vision applications',
      assistants: 2,
      budget: '$50,000',
      status: 'active',
      progress: 75,
      deadline: 'Dec 2024',
      category: 'AI/ML',
    },
    {
      id: 2,
      title: 'Cybersecurity Research',
      description: 'Novel approaches to network security and threat detection',
      assistants: 1,
      budget: '$30,000',
      status: 'active',
      progress: 60,
      deadline: 'Jan 2025',
      category: 'Security',
    },
    {
      id: 3,
      title: 'Software Engineering Study',
      description: 'Scalable software architecture for distributed systems',
      assistants: 1,
      budget: '$40,000',
      status: 'active',
      progress: 45,
      deadline: 'Feb 2025',
      category: 'Software',
    },
  ];

  const recentActivities = [
    {
      id: 1,
      assistant: 'John Doe',
      activity: 'Submitted research paper draft for AI project',
      time: '2 hours ago',
      type: 'submission',
    },
    {
      id: 2,
      assistant: 'Maria Chen',
      activity: 'Completed data analysis for cybersecurity research',
      time: '1 day ago',
      type: 'completion',
    },
    {
      id: 3,
      assistant: 'Alex Rodriguez',
      activity: 'Updated system architecture documentation',
      time: '2 days ago',
      type: 'update',
    },
  ];

  const handleAddAssistant = () => {
    toast({
      title: 'Add Research Assistant',
      description: 'Research assistant application form will open...',
    });
  };

  const handleAssistantAction = (assistantId: number, action: string) => {
    toast({
      title: `${action} Assistant`,
      description: `${action} action performed on assistant ${assistantId}`,
    });
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active':
        return 'bg-green-100 text-green-800';
      case 'inactive':
        return 'bg-gray-100 text-gray-800';
      case 'pending':
        return 'bg-yellow-100 text-yellow-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getActivityIcon = (type: string) => {
    switch (type) {
      case 'submission':
        return FileText;
      case 'completion':
        return CheckCircle;
      case 'update':
        return Edit;
      default:
        return Info;
    }
  };

  const filteredAssistants = researchAssistants.filter((assistant) => {
    const matchesSearch =
      assistant.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      assistant.role.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesFilter =
      selectedFilter === 'all' || assistant.status === selectedFilter;
    return matchesSearch && matchesFilter;
  });

  return (
    <div className='grid grid-cols-1 lg:grid-cols-12 gap-6'>
      {/* Main Content Area */}
      <div className='lg:col-span-8 space-y-4'>
        {/* Header */}
        <div className='flex items-center justify-between'>
          <div>
            <h1 className='text-2xl font-bold text-gray-900'>
              Research Assistant Portal
            </h1>
            <p className='text-gray-600'>
              Manage your research assistants and projects
            </p>
          </div>
          <Button
            onClick={handleAddAssistant}
            className='bg-green-600 hover:bg-green-700 text-white'
          >
            <Plus className='h-4 w-4 mr-2' />
            Add Assistant
          </Button>
        </div>

        {/* Search and Filter */}
        <Card className='bg-white border border-gray-200 shadow-sm'>
          <CardContent className='p-4'>
            <div className='flex items-center gap-4'>
              <div className='flex-1 relative'>
                <Search className='absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4' />
                <Input
                  placeholder='Search assistants...'
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
                <option value='all'>All Assistants</option>
                <option value='active'>Active</option>
                <option value='inactive'>Inactive</option>
                <option value='pending'>Pending</option>
              </select>
            </div>
          </CardContent>
        </Card>

        {/* Research Assistants List */}
        <div className='space-y-4'>
          {filteredAssistants.map((assistant) => (
            <Card
              key={assistant.id}
              className='bg-white border border-gray-200 shadow-sm hover:shadow-md transition-shadow'
            >
              <CardHeader className='pb-3'>
                <div className='flex items-start justify-between'>
                  <div className='flex items-center gap-4'>
                    <Avatar className='h-12 w-12'>
                      <AvatarImage
                        src={assistant.avatar}
                        alt={assistant.name}
                      />
                      <AvatarFallback className='bg-blue-100 text-blue-600'>
                        {assistant.name
                          .split(' ')
                          .map((n) => n[0])
                          .join('')}
                      </AvatarFallback>
                    </Avatar>
                    <div>
                      <CardTitle className='text-lg font-semibold text-gray-900'>
                        {assistant.name}
                      </CardTitle>
                      <CardDescription className='text-sm text-gray-600'>
                        {assistant.role} • {assistant.department}
                      </CardDescription>
                    </div>
                  </div>
                  <Badge className={getStatusColor(assistant.status)}>
                    {assistant.status}
                  </Badge>
                </div>
              </CardHeader>
              <CardContent className='space-y-4'>
                {/* Projects */}
                <div>
                  <h4 className='font-medium text-sm text-gray-900 mb-2'>
                    Current Projects
                  </h4>
                  <div className='flex flex-wrap gap-2'>
                    {assistant.projects.map((project, index) => (
                      <Badge key={index} variant='outline' className='text-xs'>
                        {project}
                      </Badge>
                    ))}
                  </div>
                </div>

                {/* Skills */}
                <div>
                  <h4 className='font-medium text-sm text-gray-900 mb-2'>
                    Skills
                  </h4>
                  <div className='flex flex-wrap gap-2'>
                    {assistant.skills.map((skill, index) => (
                      <Badge
                        key={index}
                        className='bg-blue-100 text-blue-800 text-xs'
                      >
                        {skill}
                      </Badge>
                    ))}
                  </div>
                </div>

                {/* Stats Grid */}
                <div className='grid grid-cols-2 md:grid-cols-4 gap-4 text-sm'>
                  <div className='text-center p-3 bg-blue-50 rounded-lg'>
                    <div className='text-lg font-bold text-blue-600'>
                      {assistant.hours}
                    </div>
                    <div className='text-xs text-gray-600'>Hours/Week</div>
                  </div>
                  <div className='text-center p-3 bg-green-50 rounded-lg'>
                    <div className='text-lg font-bold text-green-600'>
                      {assistant.performance}
                    </div>
                    <div className='text-xs text-gray-600'>Performance</div>
                  </div>
                  <div className='text-center p-3 bg-purple-50 rounded-lg'>
                    <div className='text-lg font-bold text-purple-600'>
                      {assistant.projects.length}
                    </div>
                    <div className='text-xs text-gray-600'>Projects</div>
                  </div>
                  <div className='text-center p-3 bg-yellow-50 rounded-lg'>
                    <div className='text-lg font-bold text-yellow-600'>
                      {assistant.salary}
                    </div>
                    <div className='text-xs text-gray-600'>Salary</div>
                  </div>
                </div>

                {/* Actions */}
                <div className='flex items-center justify-between pt-3 border-t border-gray-100'>
                  <div className='text-xs text-gray-500'>
                    Last activity: {assistant.lastActivity}
                  </div>
                  <div className='flex items-center gap-2'>
                    <Button
                      variant='outline'
                      size='sm'
                      onClick={() =>
                        handleAssistantAction(assistant.id, 'View')
                      }
                    >
                      <Eye className='h-4 w-4 mr-1' />
                      View Details
                    </Button>
                    <Button
                      variant='outline'
                      size='sm'
                      onClick={() =>
                        handleAssistantAction(assistant.id, 'Edit')
                      }
                    >
                      <Edit className='h-4 w-4 mr-1' />
                      Edit
                    </Button>
                    <Button
                      variant='outline'
                      size='sm'
                      onClick={() =>
                        handleAssistantAction(assistant.id, 'Message')
                      }
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
        {/* Research Projects */}
        <Card className='bg-white border border-gray-200 shadow-sm'>
          <CardHeader className='pb-3'>
            <CardTitle className='text-lg font-semibold text-gray-900'>
              Research Projects
            </CardTitle>
          </CardHeader>
          <CardContent className='space-y-3'>
            {researchProjects.map((project) => (
              <div
                key={project.id}
                className='border border-gray-200 rounded-lg p-3 hover:bg-gray-50'
              >
                <div className='flex items-start justify-between mb-2'>
                  <h4 className='font-semibold text-sm text-gray-900'>
                    {project.title}
                  </h4>
                  <Badge className='bg-green-100 text-green-800'>
                    {project.status}
                  </Badge>
                </div>
                <p className='text-xs text-gray-600 mb-3 line-clamp-2'>
                  {project.description}
                </p>
                <div className='flex items-center justify-between text-xs text-gray-500'>
                  <span>{project.assistants} assistants</span>
                  <span>{project.budget}</span>
                </div>
                <div className='mt-2'>
                  <div className='flex items-center justify-between text-xs mb-1'>
                    <span>Progress</span>
                    <span>{project.progress}%</span>
                  </div>
                  <div className='w-full bg-gray-200 rounded-full h-2'>
                    <div
                      className='bg-green-600 h-2 rounded-full'
                      style={{ width: `${project.progress}%` }}
                    ></div>
                  </div>
                </div>
              </div>
            ))}
            <Button
              variant='ghost'
              className='w-full text-green-600 hover:text-green-700 text-sm'
            >
              View all projects →
            </Button>
          </CardContent>
        </Card>

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
                    ) : activity.type === 'completion' ? (
                      <CheckCircle className='h-4 w-4 text-blue-600' />
                    ) : (
                      <Edit className='h-4 w-4 text-blue-600' />
                    )}
                  </div>
                  <div className='flex-1'>
                    <div className='flex items-center gap-2 mb-1'>
                      <span className='font-medium text-sm text-gray-900'>
                        {activity.assistant}
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

        {/* Quick Stats */}
        <Card className='bg-white border border-gray-200 shadow-sm'>
          <CardHeader className='pb-3'>
            <CardTitle className='text-lg font-semibold text-gray-900'>
              Portal Overview
            </CardTitle>
          </CardHeader>
          <CardContent className='space-y-3'>
            <div className='grid grid-cols-2 gap-3'>
              <div className='text-center p-3 bg-green-50 rounded-lg'>
                <div className='text-lg font-bold text-green-600'>
                  {researchAssistants.length}
                </div>
                <div className='text-xs text-gray-600'>Active Assistants</div>
              </div>
              <div className='text-center p-3 bg-blue-50 rounded-lg'>
                <div className='text-lg font-bold text-blue-600'>
                  {researchProjects.length}
                </div>
                <div className='text-xs text-gray-600'>Research Projects</div>
              </div>
            </div>
            <div className='grid grid-cols-2 gap-3'>
              <div className='text-center p-3 bg-purple-50 rounded-lg'>
                <div className='text-lg font-bold text-purple-600'>
                  $
                  {researchProjects
                    .reduce(
                      (sum, p) =>
                        sum + parseInt(p.budget.replace(/[^0-9]/g, '')),
                      0
                    )
                    .toLocaleString()}
                </div>
                <div className='text-xs text-gray-600'>Total Budget</div>
              </div>
              <div className='text-center p-3 bg-yellow-50 rounded-lg'>
                <div className='text-lg font-bold text-yellow-600'>
                  {(
                    researchAssistants.reduce(
                      (sum, a) => sum + a.performance,
                      0
                    ) / researchAssistants.length
                  ).toFixed(1)}
                </div>
                <div className='text-xs text-gray-600'>Avg Performance</div>
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
          onClick={handleAddAssistant}
        >
          <Plus className='h-5 w-5' />
        </Button>
      </div>
    </div>
  );
};

export default ProfessorResearchAssistant;
