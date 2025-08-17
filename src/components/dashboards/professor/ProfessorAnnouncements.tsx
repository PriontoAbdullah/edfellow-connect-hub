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

const ProfessorAnnouncements = () => {
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

  const announcements = [
    {
      id: 1,
      title: 'Final Exam Schedule Update',
      content:
        'The final exam for CS201 has been rescheduled to December 18th, 2024 at 2:00 PM.',
      author: 'Dr. Sarah Johnson',
      target: 'CS201 Students',
      priority: 'high',
      status: 'published',
      publishedAt: '2 hours ago',
      views: 45,
      responses: 8,
    },
    {
      id: 2,
      title: 'Research Assistant Positions Available',
      content:
        'We are looking for motivated students to join our AI research team.',
      author: 'Dr. Sarah Johnson',
      target: 'Computer Science Students',
      priority: 'normal',
      status: 'published',
      publishedAt: '1 day ago',
      views: 89,
      responses: 15,
    },
    {
      id: 3,
      title: 'Office Hours Cancellation',
      content:
        'Office hours for this week are cancelled due to conference attendance.',
      author: 'Dr. Sarah Johnson',
      target: 'All Students',
      priority: 'normal',
      status: 'published',
      publishedAt: '3 days ago',
      views: 67,
      responses: 3,
    },
  ];

  const handleCreateAnnouncement = () => {
    toast({
      title: 'Create Announcement',
      description: 'Announcement creation form will open...',
    });
  };

  const handleAnnouncementAction = (announcementId: number, action: string) => {
    toast({
      title: `${action} Announcement`,
      description: `${action} action performed on announcement ${announcementId}`,
    });
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

  const filteredAnnouncements = announcements.filter((announcement) => {
    const matchesSearch =
      announcement.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      announcement.content.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesFilter =
      selectedFilter === 'all' || announcement.status === selectedFilter;
    return matchesSearch && matchesFilter;
  });

  return (
    <div className='grid grid-cols-1 lg:grid-cols-12 gap-6'>
      {/* Main Content Area */}
      <div className='lg:col-span-8 space-y-4'>
        {/* Header */}
        <div className='flex items-center justify-between'>
          <div>
            <h1 className='text-2xl font-bold text-gray-900'>Announcements</h1>
            <p className='text-gray-600'>
              Create and manage announcements for your courses and department
            </p>
          </div>
          <Button
            onClick={handleCreateAnnouncement}
            className='bg-green-600 hover:bg-green-700 text-white'
          >
            <Plus className='h-4 w-4 mr-2' />
            Create Announcement
          </Button>
        </div>

        {/* Search and Filter */}
        <Card className='bg-white border border-gray-200 shadow-sm'>
          <CardContent className='p-4'>
            <div className='flex items-center gap-4'>
              <div className='flex-1 relative'>
                <Search className='absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4' />
                <Input
                  placeholder='Search announcements...'
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
                <option value='all'>All Announcements</option>
                <option value='published'>Published</option>
                <option value='scheduled'>Scheduled</option>
                <option value='draft'>Draft</option>
              </select>
            </div>
          </CardContent>
        </Card>

        {/* Announcements List */}
        <div className='space-y-4'>
          {filteredAnnouncements.map((announcement) => (
            <Card
              key={announcement.id}
              className='bg-white border border-gray-200 shadow-sm hover:shadow-md transition-shadow'
            >
              <CardHeader className='pb-3'>
                <div className='flex items-start justify-between'>
                  <div className='flex-1'>
                    <div className='flex items-center gap-2 mb-2'>
                      <CardTitle className='text-lg font-semibold text-gray-900'>
                        {announcement.title}
                      </CardTitle>
                      <Badge
                        className={getPriorityColor(announcement.priority)}
                      >
                        {announcement.priority}
                      </Badge>
                    </div>
                    <div className='flex items-center gap-4 text-sm text-gray-600'>
                      <span>By {announcement.author}</span>
                      <span>•</span>
                      <span>{announcement.publishedAt}</span>
                      <span>•</span>
                      <span>Target: {announcement.target}</span>
                    </div>
                  </div>
                  <Button
                    variant='ghost'
                    size='sm'
                    onClick={() =>
                      handleAnnouncementAction(announcement.id, 'More')
                    }
                  >
                    <MoreHorizontal className='h-4 w-4' />
                  </Button>
                </div>
              </CardHeader>
              <CardContent className='space-y-4'>
                <p className='text-sm text-gray-700 leading-relaxed'>
                  {announcement.content}
                </p>

                {/* Stats and Actions */}
                <div className='flex items-center justify-between pt-3 border-t border-gray-100'>
                  <div className='flex items-center gap-4 text-sm text-gray-600'>
                    <span className='flex items-center gap-1'>
                      <Eye className='h-4 w-4' />
                      {announcement.views} views
                    </span>
                    <span className='flex items-center gap-1'>
                      <MessageSquare className='h-4 w-4' />
                      {announcement.responses} responses
                    </span>
                  </div>
                  <div className='flex items-center gap-2'>
                    <Button
                      variant='outline'
                      size='sm'
                      onClick={() =>
                        handleAnnouncementAction(announcement.id, 'View')
                      }
                    >
                      <Eye className='h-4 w-4 mr-1' />
                      View
                    </Button>
                    <Button
                      variant='outline'
                      size='sm'
                      onClick={() =>
                        handleAnnouncementAction(announcement.id, 'Edit')
                      }
                    >
                      <Edit className='h-4 w-4 mr-1' />
                      Edit
                    </Button>
                    <Button
                      variant='outline'
                      size='sm'
                      onClick={() =>
                        handleAnnouncementAction(announcement.id, 'Share')
                      }
                    >
                      <Share2 className='h-4 w-4 mr-1' />
                      Share
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
        {/* Quick Stats */}
        <Card className='bg-white border border-gray-200 shadow-sm'>
          <CardHeader className='pb-3'>
            <CardTitle className='text-lg font-semibold text-gray-900'>
              Announcement Overview
            </CardTitle>
          </CardHeader>
          <CardContent className='space-y-3'>
            <div className='grid grid-cols-2 gap-3'>
              <div className='text-center p-3 bg-green-50 rounded-lg'>
                <div className='text-lg font-bold text-green-600'>
                  {announcements.filter((a) => a.status === 'published').length}
                </div>
                <div className='text-xs text-gray-600'>Published</div>
              </div>
              <div className='text-center p-3 bg-blue-50 rounded-lg'>
                <div className='text-lg font-bold text-blue-600'>
                  {announcements.reduce((sum, a) => sum + a.views, 0)}
                </div>
                <div className='text-xs text-gray-600'>Total Views</div>
              </div>
            </div>
            <div className='grid grid-cols-2 gap-3'>
              <div className='text-center p-3 bg-purple-50 rounded-lg'>
                <div className='text-lg font-bold text-purple-600'>
                  {announcements.reduce((sum, a) => sum + a.responses, 0)}
                </div>
                <div className='text-xs text-gray-600'>Total Responses</div>
              </div>
              <div className='text-center p-3 bg-yellow-50 rounded-lg'>
                <div className='text-lg font-bold text-yellow-600'>
                  {announcements.length}
                </div>
                <div className='text-xs text-gray-600'>Total Announcements</div>
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
          onClick={handleCreateAnnouncement}
        >
          <Plus className='h-5 w-5' />
        </Button>
      </div>
    </div>
  );
};

export default ProfessorAnnouncements;
