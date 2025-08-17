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
} from 'lucide-react';

const UniversityProfessorRequirement = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedDepartment, setSelectedDepartment] = useState('all');
  const [selectedPosition, setSelectedPosition] = useState('all');

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

  const professorStats = [
    {
      id: 1,
      title: 'Total Requirements',
      value: '567',
      change: '+8.3%',
      changeType: 'positive',
      icon: FileText,
      color: 'text-blue-600',
      bgColor: 'bg-blue-100',
    },
    {
      id: 2,
      title: 'Active Positions',
      value: '234',
      change: '+12.1%',
      changeType: 'positive',
      icon: UserCheck,
      color: 'text-green-600',
      bgColor: 'bg-green-100',
    },
    {
      id: 3,
      title: 'Applications Received',
      value: '1,234',
      change: '+15.7%',
      changeType: 'positive',
      icon: Briefcase,
      color: 'text-purple-600',
      bgColor: 'bg-purple-100',
    },
    {
      id: 4,
      title: 'Interviews Scheduled',
      value: '89',
      change: '+5.2%',
      changeType: 'positive',
      icon: Calendar,
      color: 'text-orange-600',
      bgColor: 'bg-orange-100',
    },
  ];

  const professorRequirements = [
    {
      id: 1,
      position: 'Assistant Professor - Computer Science',
      department: 'Computer Science',
      requirements: [
        'PhD in Computer Science or related field',
        'Strong research record with publications in top-tier conferences',
        'Teaching experience at university level',
        'Programming skills in multiple languages',
        'Research statement and teaching philosophy',
      ],
      status: 'active',
      applications: 45,
      deadline: '2024-12-31',
      priority: 'high',
      salary: '$120,000 - $140,000',
      location: 'Cambridge, MA',
      contactPerson: 'Dr. Sarah Johnson',
      email: 'sarah.johnson@mit.edu',
      lastUpdated: '2 days ago',
    },
    {
      id: 2,
      position: 'Associate Professor - Business Analytics',
      department: 'Business School',
      requirements: [
        'PhD in Business, Statistics, or related field',
        'Minimum 5 years of teaching and research experience',
        'Strong quantitative and analytical skills',
        'Experience with industry partnerships',
        'Leadership in academic committees',
      ],
      status: 'active',
      applications: 32,
      deadline: '2024-12-31',
      priority: 'high',
      salary: '$140,000 - $160,000',
      location: 'Cambridge, MA',
      contactPerson: 'Prof. Michael Chen',
      email: 'michael.chen@mit.edu',
      lastUpdated: '1 week ago',
    },
    {
      id: 3,
      position: 'Research Scientist - Data Science',
      department: 'Data Science',
      requirements: [
        'PhD in Data Science, Statistics, or related field',
        'Experience with machine learning and AI',
        'Strong programming skills (Python, R)',
        'Published research in peer-reviewed journals',
        'Grant writing experience',
      ],
      status: 'active',
      applications: 28,
      deadline: '2024-12-31',
      priority: 'medium',
      salary: '$100,000 - $120,000',
      location: 'Cambridge, MA',
      contactPerson: 'Dr. Emily Rodriguez',
      email: 'emily.rodriguez@mit.edu',
      lastUpdated: '3 days ago',
    },
    {
      id: 4,
      position: 'Lecturer - Engineering',
      department: 'Engineering',
      requirements: [
        "Master's degree in Engineering (PhD preferred)",
        'Industry experience in engineering field',
        'Teaching experience at university level',
        'Strong communication skills',
        'Commitment to student success',
      ],
      status: 'pending',
      applications: 15,
      deadline: '2024-12-31',
      priority: 'medium',
      salary: '$80,000 - $100,000',
      location: 'Cambridge, MA',
      contactPerson: 'Prof. David Wilson',
      email: 'david.wilson@mit.edu',
      lastUpdated: '5 days ago',
    },
    {
      id: 5,
      position: 'Full Professor - Mathematics',
      department: 'Mathematics',
      requirements: [
        'PhD in Mathematics or related field',
        'Distinguished research record with international recognition',
        'Leadership in academic community',
        'Successful grant funding history',
        'Mentoring experience for junior faculty',
      ],
      status: 'active',
      applications: 12,
      deadline: '2024-12-31',
      priority: 'high',
      salary: '$180,000 - $220,000',
      location: 'Cambridge, MA',
      contactPerson: 'Dr. Robert Brown',
      email: 'robert.brown@mit.edu',
      lastUpdated: '1 day ago',
    },
    {
      id: 6,
      position: 'Adjunct Professor - Arts',
      department: 'Arts & Sciences',
      requirements: [
        "Master's degree in Arts or related field",
        'Professional experience in arts industry',
        'Teaching experience preferred',
        'Portfolio of work',
        'Flexible schedule for evening classes',
      ],
      status: 'active',
      applications: 8,
      deadline: '2024-12-31',
      priority: 'low',
      salary: '$60,000 - $80,000',
      location: 'Cambridge, MA',
      contactPerson: 'Prof. Lisa Anderson',
      email: 'lisa.anderson@mit.edu',
      lastUpdated: '4 days ago',
    },
  ];

  const departments = [
    { id: 'all', name: 'All Departments' },
    { id: 'cs', name: 'Computer Science' },
    { id: 'business', name: 'Business School' },
    { id: 'data', name: 'Data Science' },
    { id: 'engineering', name: 'Engineering' },
    { id: 'math', name: 'Mathematics' },
    { id: 'arts', name: 'Arts & Sciences' },
  ];

  const positions = [
    { id: 'all', name: 'All Positions' },
    { id: 'assistant', name: 'Assistant Professor' },
    { id: 'associate', name: 'Associate Professor' },
    { id: 'full', name: 'Full Professor' },
    { id: 'lecturer', name: 'Lecturer' },
    { id: 'research', name: 'Research Scientist' },
    { id: 'adjunct', name: 'Adjunct Professor' },
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active':
        return 'bg-green-100 text-green-800';
      case 'pending':
        return 'bg-yellow-100 text-yellow-800';
      case 'closed':
        return 'bg-gray-100 text-gray-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high':
        return 'bg-red-100 text-red-800';
      case 'medium':
        return 'bg-orange-100 text-orange-800';
      case 'low':
        return 'bg-blue-100 text-blue-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const handleEditRequirement = (requirementId: number) => {
    toast({
      title: 'Edit Position',
      description: `Editing position ${requirementId}`,
    });
  };

  const handleDeleteRequirement = (requirementId: number) => {
    toast({
      title: 'Delete Position',
      description: `Deleting position ${requirementId}`,
    });
  };

  const handleAddRequirement = () => {
    toast({
      title: 'Add Position',
      description: 'Opening add position form',
    });
  };

  const filteredRequirements = professorRequirements.filter((req) => {
    const matchesSearch =
      req.position.toLowerCase().includes(searchTerm.toLowerCase()) ||
      req.department.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesDepartment =
      selectedDepartment === 'all' ||
      req.department ===
        departments.find((d) => d.id === selectedDepartment)?.name;
    const matchesPosition =
      selectedPosition === 'all' ||
      req.position
        .toLowerCase()
        .includes(
          positions
            .find((p) => p.id === selectedPosition)
            ?.name.toLowerCase() || ''
        );

    return matchesSearch && matchesDepartment && matchesPosition;
  });

  return (
    <div className='grid grid-cols-1 lg:grid-cols-12 gap-6'>
      {/* Main Content Area */}
      <div className='lg:col-span-8 space-y-6'>
        {/* Professor Requirements Overview */}
        <Card className='bg-white border border-gray-200 shadow-sm'>
          <CardHeader className='pb-4'>
            <CardTitle className='text-xl font-semibold text-gray-900'>
              Professor Requirements Overview
            </CardTitle>
            <CardDescription>
              Manage faculty positions and hiring requirements across all
              departments
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4'>
              {professorStats.map((stat) => (
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

        {/* Filters and Search */}
        <Card className='bg-white border border-gray-200 shadow-sm'>
          <CardContent className='p-4'>
            <div className='flex flex-col lg:flex-row gap-4'>
              <div className='flex-1'>
                <div className='relative'>
                  <Search className='absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400' />
                  <Input
                    placeholder='Search positions...'
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className='pl-10'
                  />
                </div>
              </div>
              <div className='flex gap-2'>
                <select
                  value={selectedDepartment}
                  onChange={(e) => setSelectedDepartment(e.target.value)}
                  className='px-3 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-500'
                >
                  {departments.map((dept) => (
                    <option key={dept.id} value={dept.id}>
                      {dept.name}
                    </option>
                  ))}
                </select>
                <select
                  value={selectedPosition}
                  onChange={(e) => setSelectedPosition(e.target.value)}
                  className='px-3 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-500'
                >
                  {positions.map((pos) => (
                    <option key={pos.id} value={pos.id}>
                      {pos.name}
                    </option>
                  ))}
                </select>
                <Button
                  variant='outline'
                  size='sm'
                  onClick={handleAddRequirement}
                  className='flex items-center gap-2'
                >
                  <PlusIcon className='h-4 w-4' />
                  Add Position
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Requirements List */}
        <Card className='bg-white border border-gray-200 shadow-sm'>
          <CardHeader className='pb-4'>
            <CardTitle className='text-lg font-semibold text-gray-900'>
              Faculty Positions
            </CardTitle>
          </CardHeader>
          <CardContent className='space-y-4'>
            {filteredRequirements.map((requirement) => (
              <div
                key={requirement.id}
                className='border border-gray-200 rounded-lg p-4 hover:bg-gray-50 transition-colors'
              >
                <div className='flex items-start justify-between mb-3'>
                  <div className='flex-1'>
                    <div className='flex items-center gap-3 mb-2'>
                      <h4 className='font-semibold text-sm text-gray-900'>
                        {requirement.position}
                      </h4>
                      <Badge
                        className={`text-xs ${getStatusColor(
                          requirement.status
                        )}`}
                      >
                        {requirement.status}
                      </Badge>
                      <Badge
                        className={`text-xs ${getPriorityColor(
                          requirement.priority
                        )}`}
                      >
                        {requirement.priority}
                      </Badge>
                    </div>
                    <div className='flex items-center gap-4 text-xs text-gray-500 mb-2'>
                      <span className='flex items-center gap-1'>
                        <Building className='h-3 w-3' />
                        {requirement.department}
                      </span>
                      <span className='flex items-center gap-1'>
                        <MapPin className='h-3 w-3' />
                        {requirement.location}
                      </span>
                      <span className='flex items-center gap-1'>
                        <DollarSign className='h-3 w-3' />
                        {requirement.salary}
                      </span>
                    </div>
                    <div className='flex items-center gap-4 text-xs text-gray-500'>
                      <span className='flex items-center gap-1'>
                        <Users className='h-3 w-3' />
                        {requirement.applications} applications
                      </span>
                      <span className='flex items-center gap-1'>
                        <Calendar className='h-3 w-3' />
                        Deadline: {requirement.deadline}
                      </span>
                      <span className='flex items-center gap-1'>
                        <Clock className='h-3 w-3' />
                        Updated {requirement.lastUpdated}
                      </span>
                    </div>
                  </div>
                  <div className='flex items-center gap-2'>
                    <Button
                      variant='ghost'
                      size='sm'
                      onClick={() => handleEditRequirement(requirement.id)}
                    >
                      <Edit className='h-4 w-4' />
                    </Button>
                    <Button
                      variant='ghost'
                      size='sm'
                      onClick={() => handleDeleteRequirement(requirement.id)}
                    >
                      <X className='h-4 w-4' />
                    </Button>
                  </div>
                </div>

                <div className='border-t border-gray-100 pt-3'>
                  <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
                    <div>
                      <h5 className='font-medium text-gray-700 mb-2 text-sm'>
                        Requirements:
                      </h5>
                      <ul className='space-y-1'>
                        {requirement.requirements.map((req, index) => (
                          <li
                            key={index}
                            className='flex items-start gap-2 text-xs text-gray-600'
                          >
                            <div className='w-1 h-1 bg-gray-400 rounded-full mt-2 flex-shrink-0'></div>
                            {req}
                          </li>
                        ))}
                      </ul>
                    </div>
                    <div>
                      <h5 className='font-medium text-gray-700 mb-2 text-sm'>
                        Contact Information:
                      </h5>
                      <div className='space-y-1 text-xs text-gray-600'>
                        <p className='flex items-center gap-2'>
                          <Users className='h-3 w-3' />
                          {requirement.contactPerson}
                        </p>
                        <p className='flex items-center gap-2'>
                          <Mail className='h-3 w-3' />
                          {requirement.email}
                        </p>
                      </div>
                    </div>
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
              onClick={handleAddRequirement}
            >
              <Plus className='h-4 w-4 mr-2' />
              Add New Position
            </Button>
            <Button
              variant='outline'
              className='w-full justify-start'
              onClick={() => navigate('/dashboard/programs')}
            >
              <BookOpen className='h-4 w-4 mr-2' />
              View Applications
            </Button>
            <Button variant='outline' className='w-full justify-start'>
              <Calendar className='h-4 w-4 mr-2' />
              Schedule Interviews
            </Button>
            <Button variant='outline' className='w-full justify-start'>
              <Download className='h-4 w-4 mr-2' />
              Export Positions
            </Button>
          </CardContent>
        </Card>

        {/* Departments Overview */}
        <Card className='bg-white border border-gray-200 shadow-sm'>
          <CardHeader className='pb-4'>
            <CardTitle className='text-lg font-semibold text-gray-900'>
              Positions by Department
            </CardTitle>
          </CardHeader>
          <CardContent className='space-y-3'>
            {departments.slice(1).map((dept) => (
              <div
                key={dept.id}
                className='flex items-center justify-between p-3 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors'
              >
                <div className='flex items-center gap-3'>
                  <div className='w-8 h-8 bg-purple-100 rounded-lg flex items-center justify-center'>
                    <Building className='h-4 w-4 text-purple-600' />
                  </div>
                  <span className='text-sm font-medium text-gray-900'>
                    {dept.name}
                  </span>
                </div>
                <Badge variant='secondary' className='text-xs'>
                  {
                    professorRequirements.filter(
                      (req) => req.department === dept.name
                    ).length
                  }
                </Badge>
              </div>
            ))}
          </CardContent>
        </Card>

        {/* Recent Applications */}
        <Card className='bg-white border border-gray-200 shadow-sm'>
          <CardHeader className='pb-4'>
            <CardTitle className='text-lg font-semibold text-gray-900'>
              Recent Applications
            </CardTitle>
          </CardHeader>
          <CardContent className='space-y-3'>
            {professorRequirements.slice(0, 3).map((requirement) => (
              <div
                key={requirement.id}
                className='p-3 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors'
              >
                <h4 className='font-medium text-sm text-gray-900 mb-1'>
                  {requirement.position}
                </h4>
                <p className='text-xs text-gray-600 mb-2'>
                  {requirement.department}
                </p>
                <div className='flex items-center justify-between'>
                  <span className='text-xs text-gray-500'>
                    {requirement.applications} applications
                  </span>
                  <Badge
                    className={`text-xs ${getStatusColor(requirement.status)}`}
                  >
                    {requirement.status}
                  </Badge>
                </div>
              </div>
            ))}
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

export default UniversityProfessorRequirement;
