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
  Key,
  Fingerprint,
  EyeOff,
  User,
  UserX,
  UserMinus,
  UserCog,
  UserEdit,
  UserSearch,
  UserVoice,
  UserWarning,
  Bot,
  Cpu,
  HardDrive,
  MemoryStick,
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
  Volume1,
  VolumeX,
  MicOff,
  CameraOff,
  Monitor as MonitorIcon,
  Smartphone,
  Tablet,
  Laptop,
  Desktop,
  CloudOff,
  Download as DownloadIcon,
  Upload as UploadIcon,
  RotateCcw,
  RotateCw,
} from 'lucide-react';

const ProfessorFieldOfStudy = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');

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

  const researchAreas = [
    {
      id: 1,
      name: 'Artificial Intelligence & Machine Learning',
      description:
        'Research in deep learning, neural networks, and AI applications',
      publications: 24,
      citations: 156,
      collaborators: 12,
      status: 'active',
      category: 'AI/ML',
      projects: 8,
      students: 15,
      funding: '$2.5M',
      lastActivity: '2 days ago',
      tags: ['Deep Learning', 'Neural Networks', 'Computer Vision'],
    },
    {
      id: 2,
      name: 'Cybersecurity & Network Security',
      description:
        'Advanced security protocols, cryptography, and threat detection',
      publications: 18,
      citations: 89,
      collaborators: 8,
      status: 'active',
      category: 'Security',
      projects: 5,
      students: 10,
      funding: '$1.8M',
      lastActivity: '1 week ago',
      tags: ['Cryptography', 'Threat Detection', 'Network Security'],
    },
    {
      id: 3,
      name: 'Software Engineering & Systems',
      description:
        'Software architecture, distributed systems, and development methodologies',
      publications: 31,
      citations: 203,
      collaborators: 15,
      status: 'active',
      category: 'Software',
      projects: 12,
      students: 20,
      funding: '$3.2M',
      lastActivity: '3 days ago',
      tags: ['Software Architecture', 'Distributed Systems', 'Agile'],
    },
    {
      id: 4,
      name: 'Data Science & Analytics',
      description:
        'Big data processing, statistical analysis, and predictive modeling',
      publications: 16,
      citations: 67,
      collaborators: 6,
      status: 'active',
      category: 'Data',
      projects: 4,
      students: 8,
      funding: '$1.2M',
      lastActivity: '5 days ago',
      tags: ['Big Data', 'Statistical Analysis', 'Predictive Modeling'],
    },
  ];

  const recentPublications = [
    {
      id: 1,
      title: 'Advanced Neural Network Architectures for Computer Vision',
      journal: 'Nature Machine Intelligence',
      year: 2024,
      citations: 45,
      authors: ['Dr. Sarah Johnson', 'Dr. Michael Chen', 'Dr. Emily Davis'],
      doi: '10.1038/s42256-024-00001-x',
      impact: 'high',
    },
    {
      id: 2,
      title: 'Novel Approaches to Cybersecurity in IoT Networks',
      journal: 'IEEE Security & Privacy',
      year: 2024,
      citations: 23,
      authors: ['Dr. Sarah Johnson', 'Dr. Robert Wilson'],
      doi: '10.1109/MSP.2024.00001',
      impact: 'medium',
    },
    {
      id: 3,
      title: 'Scalable Software Architecture for Distributed Systems',
      journal: 'ACM Transactions on Software Engineering',
      year: 2023,
      citations: 67,
      authors: ['Dr. Sarah Johnson', 'Dr. Lisa Brown', 'Dr. David Miller'],
      doi: '10.1145/1234567.1234567',
      impact: 'high',
    },
  ];

  const collaborations = [
    {
      id: 1,
      name: 'Dr. Michael Chen',
      institution: 'Stanford University',
      field: 'Computer Vision',
      projects: 3,
      publications: 8,
      status: 'active',
      avatar: '/api/placeholder/40/40',
    },
    {
      id: 2,
      name: 'Dr. Emily Davis',
      institution: 'UC Berkeley',
      field: 'Machine Learning',
      projects: 2,
      publications: 5,
      status: 'active',
      avatar: '/api/placeholder/40/40',
    },
    {
      id: 3,
      name: 'Dr. Robert Wilson',
      institution: 'Carnegie Mellon University',
      field: 'Cybersecurity',
      projects: 4,
      publications: 12,
      status: 'active',
      avatar: '/api/placeholder/40/40',
    },
  ];

  const upcomingEvents = [
    {
      id: 1,
      title: 'AI Research Symposium',
      date: 'Dec 20, 2024',
      type: 'conference',
      location: 'MIT Campus',
      attendees: 150,
    },
    {
      id: 2,
      title: 'Cybersecurity Workshop',
      date: 'Jan 15, 2025',
      type: 'workshop',
      location: 'Virtual',
      attendees: 75,
    },
    {
      id: 3,
      title: 'Software Engineering Colloquium',
      date: 'Jan 30, 2025',
      type: 'colloquium',
      location: 'MIT Building 10',
      attendees: 45,
    },
  ];

  const handleAddResearchArea = () => {
    toast({
      title: 'Add Research Area',
      description: 'Research area creation form will open...',
    });
  };

  const handlePublicationAction = (pubId: number, action: string) => {
    toast({
      title: `${action} Publication`,
      description: `${action} action performed on publication ${pubId}`,
    });
  };

  const getImpactColor = (impact: string) => {
    switch (impact) {
      case 'high':
        return 'bg-green-100 text-green-800';
      case 'medium':
        return 'bg-yellow-100 text-yellow-800';
      case 'low':
        return 'bg-gray-100 text-gray-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getEventIcon = (type: string) => {
    switch (type) {
      case 'conference':
        return Users;
      case 'workshop':
        return Lightbulb;
      case 'colloquium':
        return BookOpen;
      default:
        return Calendar;
    }
  };

  const filteredResearchAreas = researchAreas.filter((area) => {
    const matchesSearch =
      area.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      area.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory =
      selectedCategory === 'all' || area.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <div className='grid grid-cols-1 lg:grid-cols-12 gap-6'>
      {/* Main Content Area */}
      <div className='lg:col-span-8 space-y-4'>
        {/* Header */}
        <div className='flex items-center justify-between'>
          <div>
            <h1 className='text-2xl font-bold text-gray-900'>Field of Study</h1>
            <p className='text-gray-600'>
              Manage your research areas and academic focus
            </p>
          </div>
          <Button
            onClick={handleAddResearchArea}
            className='bg-green-600 hover:bg-green-700 text-white'
          >
            <Plus className='h-4 w-4 mr-2' />
            Add Research Area
          </Button>
        </div>

        {/* Search and Filter */}
        <Card className='bg-white border border-gray-200 shadow-sm'>
          <CardContent className='p-4'>
            <div className='flex items-center gap-4'>
              <div className='flex-1 relative'>
                <Search className='absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4' />
                <Input
                  placeholder='Search research areas...'
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className='pl-10'
                />
              </div>
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className='px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500'
              >
                <option value='all'>All Categories</option>
                <option value='AI/ML'>AI/ML</option>
                <option value='Security'>Security</option>
                <option value='Software'>Software</option>
                <option value='Data'>Data</option>
              </select>
            </div>
          </CardContent>
        </Card>

        {/* Research Areas Grid */}
        <div className='space-y-4'>
          {filteredResearchAreas.map((area) => (
            <Card
              key={area.id}
              className='bg-white border border-gray-200 shadow-sm hover:shadow-md transition-shadow'
            >
              <CardHeader className='pb-3'>
                <div className='flex items-start justify-between'>
                  <div className='flex-1'>
                    <CardTitle className='text-lg font-semibold text-gray-900'>
                      {area.name}
                    </CardTitle>
                    <CardDescription className='text-sm text-gray-600 mt-1'>
                      {area.description}
                    </CardDescription>
                  </div>
                  <Badge className='bg-green-100 text-green-800'>
                    {area.status}
                  </Badge>
                </div>
              </CardHeader>
              <CardContent className='space-y-4'>
                {/* Tags */}
                <div className='flex flex-wrap gap-2'>
                  {area.tags.map((tag, index) => (
                    <Badge key={index} variant='outline' className='text-xs'>
                      {tag}
                    </Badge>
                  ))}
                </div>

                {/* Stats Grid */}
                <div className='grid grid-cols-2 md:grid-cols-4 gap-4 text-sm'>
                  <div className='text-center p-3 bg-blue-50 rounded-lg'>
                    <div className='text-lg font-bold text-blue-600'>
                      {area.publications}
                    </div>
                    <div className='text-xs text-gray-600'>Publications</div>
                  </div>
                  <div className='text-center p-3 bg-green-50 rounded-lg'>
                    <div className='text-lg font-bold text-green-600'>
                      {area.citations}
                    </div>
                    <div className='text-xs text-gray-600'>Citations</div>
                  </div>
                  <div className='text-center p-3 bg-purple-50 rounded-lg'>
                    <div className='text-lg font-bold text-purple-600'>
                      {area.collaborators}
                    </div>
                    <div className='text-xs text-gray-600'>Collaborators</div>
                  </div>
                  <div className='text-center p-3 bg-yellow-50 rounded-lg'>
                    <div className='text-lg font-bold text-yellow-600'>
                      {area.funding}
                    </div>
                    <div className='text-xs text-gray-600'>Funding</div>
                  </div>
                </div>

                {/* Actions */}
                <div className='flex items-center justify-between pt-2 border-t border-gray-100'>
                  <div className='text-xs text-gray-500'>
                    Last activity: {area.lastActivity}
                  </div>
                  <div className='flex items-center gap-2'>
                    <Button
                      variant='outline'
                      size='sm'
                      onClick={() =>
                        navigate(`/dashboard/research-area/${area.id}`)
                      }
                    >
                      <Eye className='h-4 w-4 mr-1' />
                      View Details
                    </Button>
                    <Button
                      variant='outline'
                      size='sm'
                      onClick={() => handlePublicationAction(area.id, 'Edit')}
                    >
                      <Edit className='h-4 w-4 mr-1' />
                      Edit
                    </Button>
                    <Button
                      variant='outline'
                      size='sm'
                      onClick={() => handlePublicationAction(area.id, 'More')}
                    >
                      <MoreHorizontal className='h-4 w-4' />
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
        {/* Recent Publications */}
        <Card className='bg-white border border-gray-200 shadow-sm'>
          <CardHeader className='pb-3'>
            <CardTitle className='text-lg font-semibold text-gray-900'>
              Recent Publications
            </CardTitle>
          </CardHeader>
          <CardContent className='space-y-3'>
            {recentPublications.map((pub) => (
              <div
                key={pub.id}
                className='border border-gray-200 rounded-lg p-3 hover:bg-gray-50'
              >
                <div className='flex items-start justify-between mb-2'>
                  <h4 className='font-semibold text-sm text-gray-900 line-clamp-2'>
                    {pub.title}
                  </h4>
                  <Badge className={getImpactColor(pub.impact)}>
                    {pub.impact}
                  </Badge>
                </div>
                <p className='text-xs text-gray-600 mb-2'>
                  {pub.journal} • {pub.year}
                </p>
                <div className='flex items-center justify-between text-xs text-gray-500'>
                  <span>{pub.citations} citations</span>
                  <Button
                    variant='ghost'
                    size='sm'
                    className='h-6 px-2 text-xs'
                    onClick={() => handlePublicationAction(pub.id, 'View')}
                  >
                    View
                  </Button>
                </div>
              </div>
            ))}
            <Button
              variant='ghost'
              className='w-full text-green-600 hover:text-green-700 text-sm'
            >
              View all publications →
            </Button>
          </CardContent>
        </Card>

        {/* Collaborations */}
        <Card className='bg-white border border-gray-200 shadow-sm'>
          <CardHeader className='pb-3'>
            <CardTitle className='text-lg font-semibold text-gray-900'>
              Active Collaborations
            </CardTitle>
          </CardHeader>
          <CardContent className='space-y-3'>
            {collaborations.map((collab) => (
              <div
                key={collab.id}
                className='border border-gray-200 rounded-lg p-3 hover:bg-gray-50'
              >
                <div className='flex items-center gap-3 mb-2'>
                  <Avatar className='h-8 w-8'>
                    <AvatarImage src={collab.avatar} alt={collab.name} />
                    <AvatarFallback className='bg-blue-100 text-blue-600'>
                      {collab.name
                        .split(' ')
                        .map((n) => n[0])
                        .join('')}
                    </AvatarFallback>
                  </Avatar>
                  <div className='flex-1'>
                    <h4 className='font-semibold text-sm text-gray-900'>
                      {collab.name}
                    </h4>
                    <p className='text-xs text-gray-600'>
                      {collab.institution}
                    </p>
                  </div>
                </div>
                <div className='flex items-center justify-between text-xs text-gray-500'>
                  <span>{collab.field}</span>
                  <span>{collab.projects} projects</span>
                </div>
              </div>
            ))}
            <Button
              variant='ghost'
              className='w-full text-green-600 hover:text-green-700 text-sm'
            >
              View all collaborations →
            </Button>
          </CardContent>
        </Card>

        {/* Upcoming Events */}
        <Card className='bg-white border border-gray-200 shadow-sm'>
          <CardHeader className='pb-3'>
            <CardTitle className='text-lg font-semibold text-gray-900'>
              Upcoming Events
            </CardTitle>
          </CardHeader>
          <CardContent className='space-y-3'>
            {upcomingEvents.map((event) => (
              <div
                key={event.id}
                className='border border-gray-200 rounded-lg p-3 bg-blue-50'
              >
                <div className='flex items-center gap-3 mb-2'>
                  <div className='w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center'>
                    {event.type === 'conference' ? (
                      <Users className='h-4 w-4 text-blue-600' />
                    ) : event.type === 'workshop' ? (
                      <Lightbulb className='h-4 w-4 text-blue-600' />
                    ) : (
                      <BookOpen className='h-4 w-4 text-blue-600' />
                    )}
                  </div>
                  <div className='flex-1'>
                    <h4 className='font-semibold text-sm text-gray-900'>
                      {event.title}
                    </h4>
                    <p className='text-xs text-gray-600'>{event.location}</p>
                  </div>
                </div>
                <div className='flex items-center justify-between text-xs text-blue-700'>
                  <span>{event.date}</span>
                  <span>{event.attendees} attendees</span>
                </div>
              </div>
            ))}
            <Button
              variant='ghost'
              className='w-full text-green-600 hover:text-green-700 text-sm'
            >
              View all events →
            </Button>
          </CardContent>
        </Card>

        {/* Quick Stats */}
        <Card className='bg-white border border-gray-200 shadow-sm'>
          <CardHeader className='pb-3'>
            <CardTitle className='text-lg font-semibold text-gray-900'>
              Research Overview
            </CardTitle>
          </CardHeader>
          <CardContent className='space-y-3'>
            <div className='grid grid-cols-2 gap-3'>
              <div className='text-center p-3 bg-green-50 rounded-lg'>
                <div className='text-lg font-bold text-green-600'>
                  {researchAreas.length}
                </div>
                <div className='text-xs text-gray-600'>Research Areas</div>
              </div>
              <div className='text-center p-3 bg-blue-50 rounded-lg'>
                <div className='text-lg font-bold text-blue-600'>
                  {recentPublications.length}
                </div>
                <div className='text-xs text-gray-600'>Publications</div>
              </div>
            </div>
            <div className='grid grid-cols-2 gap-3'>
              <div className='text-center p-3 bg-purple-50 rounded-lg'>
                <div className='text-lg font-bold text-purple-600'>
                  {collaborations.length}
                </div>
                <div className='text-xs text-gray-600'>Collaborators</div>
              </div>
              <div className='text-center p-3 bg-yellow-50 rounded-lg'>
                <div className='text-lg font-bold text-yellow-600'>
                  {researchAreas.reduce((sum, area) => sum + area.citations, 0)}
                </div>
                <div className='text-xs text-gray-600'>Total Citations</div>
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
          onClick={handleAddResearchArea}
        >
          <Plus className='h-5 w-5' />
        </Button>
      </div>
    </div>
  );
};

export default ProfessorFieldOfStudy;
