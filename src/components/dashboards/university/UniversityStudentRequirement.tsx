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
} from 'lucide-react';

const UniversityStudentRequirement = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedProgram, setSelectedProgram] = useState('all');
  const [selectedStatus, setSelectedStatus] = useState('all');

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

  const requirementStats = [
    {
      id: 1,
      title: 'Total Requirements',
      value: '1,234',
      change: '+12.5%',
      changeType: 'positive',
      icon: FileText,
      color: 'text-blue-600',
      bgColor: 'bg-blue-100',
    },
    {
      id: 2,
      title: 'Active Requirements',
      value: '856',
      change: '+8.2%',
      changeType: 'positive',
      icon: CheckCircle,
      color: 'text-green-600',
      bgColor: 'bg-green-100',
    },
    {
      id: 3,
      title: 'Pending Review',
      value: '234',
      change: '-5.1%',
      changeType: 'negative',
      icon: Clock,
      color: 'text-orange-600',
      bgColor: 'bg-orange-100',
    },
    {
      id: 4,
      title: 'Updated This Month',
      value: '89',
      change: '+15.3%',
      changeType: 'positive',
      icon: TrendingUp,
      color: 'text-purple-600',
      bgColor: 'bg-purple-100',
    },
  ];

  const studentRequirements = [
    {
      id: 1,
      program: 'Master of Computer Science',
      requirement: 'GRE Score - Minimum 320',
      category: 'Test Scores',
      status: 'active',
      lastUpdated: '2 days ago',
      priority: 'high',
      description:
        'Graduate Record Examination score requirement for admission',
      documents: ['GRE Official Score Report', 'Test Center Verification'],
      deadline: '2024-12-31',
      department: 'Computer Science',
      contactPerson: 'Dr. Sarah Johnson',
      email: 'sarah.johnson@mit.edu',
    },
    {
      id: 2,
      program: 'Business Analytics PhD',
      requirement: 'GMAT Score - Minimum 700',
      category: 'Test Scores',
      status: 'active',
      lastUpdated: '1 week ago',
      priority: 'high',
      description:
        'Graduate Management Admission Test requirement for business programs',
      documents: [
        'GMAT Official Score Report',
        'Analytical Writing Assessment',
      ],
      deadline: '2024-12-31',
      department: 'Business School',
      contactPerson: 'Prof. Michael Chen',
      email: 'michael.chen@mit.edu',
    },
    {
      id: 3,
      program: 'Data Science Certificate',
      requirement: "Bachelor's Degree in Related Field",
      category: 'Academic',
      status: 'active',
      lastUpdated: '3 days ago',
      priority: 'medium',
      description:
        'Undergraduate degree requirement in computer science, mathematics, or related fields',
      documents: [
        'Official Transcripts',
        'Degree Certificate',
        'Course Descriptions',
      ],
      deadline: '2024-12-31',
      department: 'Data Science',
      contactPerson: 'Dr. Emily Rodriguez',
      email: 'emily.rodriguez@mit.edu',
    },
    {
      id: 4,
      program: 'Master of Computer Science',
      requirement: 'Programming Portfolio',
      category: 'Portfolio',
      status: 'pending',
      lastUpdated: '5 days ago',
      priority: 'medium',
      description:
        'Portfolio showcasing programming projects and technical skills',
      documents: [
        'GitHub Repository Links',
        'Project Descriptions',
        'Code Samples',
      ],
      deadline: '2024-12-31',
      department: 'Computer Science',
      contactPerson: 'Dr. Sarah Johnson',
      email: 'sarah.johnson@mit.edu',
    },
    {
      id: 5,
      program: 'Business Analytics PhD',
      requirement: 'Research Statement',
      category: 'Documents',
      status: 'active',
      lastUpdated: '1 day ago',
      priority: 'high',
      description: 'Statement of research interests and proposed research area',
      documents: [
        'Research Statement (2-3 pages)',
        'Bibliography',
        'Research Timeline',
      ],
      deadline: '2024-12-31',
      department: 'Business School',
      contactPerson: 'Prof. Michael Chen',
      email: 'michael.chen@mit.edu',
    },
    {
      id: 6,
      program: 'Data Science Certificate',
      requirement: 'Letters of Recommendation',
      category: 'References',
      status: 'active',
      lastUpdated: '4 days ago',
      priority: 'high',
      description:
        'Three letters of recommendation from academic or professional references',
      documents: [
        'Letter of Recommendation Form',
        'Referee Contact Information',
      ],
      deadline: '2024-12-31',
      department: 'Data Science',
      contactPerson: 'Dr. Emily Rodriguez',
      email: 'emily.rodriguez@mit.edu',
    },
  ];

  const programs = [
    { id: 'all', name: 'All Programs' },
    { id: 'mcs', name: 'Master of Computer Science' },
    { id: 'phd', name: 'Business Analytics PhD' },
    { id: 'cert', name: 'Data Science Certificate' },
  ];

  const categories = [
    { id: 'all', name: 'All Categories' },
    { id: 'test-scores', name: 'Test Scores' },
    { id: 'academic', name: 'Academic' },
    { id: 'portfolio', name: 'Portfolio' },
    { id: 'documents', name: 'Documents' },
    { id: 'references', name: 'References' },
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active':
        return 'bg-green-100 text-green-800';
      case 'pending':
        return 'bg-yellow-100 text-yellow-800';
      case 'inactive':
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
      title: 'Edit Requirement',
      description: `Editing requirement ${requirementId}`,
    });
  };

  const handleDeleteRequirement = (requirementId: number) => {
    toast({
      title: 'Delete Requirement',
      description: `Deleting requirement ${requirementId}`,
    });
  };

  const handleAddRequirement = () => {
    toast({
      title: 'Add Requirement',
      description: 'Opening add requirement form',
    });
  };

  const filteredRequirements = studentRequirements.filter((req) => {
    const matchesSearch =
      req.requirement.toLowerCase().includes(searchTerm.toLowerCase()) ||
      req.program.toLowerCase().includes(searchTerm.toLowerCase()) ||
      req.category.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesProgram =
      selectedProgram === 'all' ||
      req.program.includes(
        programs.find((p) => p.id === selectedProgram)?.name || ''
      );
    const matchesStatus =
      selectedStatus === 'all' || req.status === selectedStatus;

    return matchesSearch && matchesProgram && matchesStatus;
  });

  return (
    <div className='grid grid-cols-1 lg:grid-cols-12 gap-6'>
      {/* Main Content Area */}
      <div className='lg:col-span-8 space-y-6'>
        {/* Requirements Overview */}
        <Card className='bg-white border border-gray-200 shadow-sm'>
          <CardHeader className='pb-4'>
            <CardTitle className='text-xl font-semibold text-gray-900'>
              Student Requirements Overview
            </CardTitle>
            <CardDescription>
              Manage and track student admission requirements across all
              programs
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4'>
              {requirementStats.map((stat) => (
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
                    placeholder='Search requirements...'
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className='pl-10'
                  />
                </div>
              </div>
              <div className='flex gap-2'>
                <select
                  value={selectedProgram}
                  onChange={(e) => setSelectedProgram(e.target.value)}
                  className='px-3 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-500'
                >
                  {programs.map((program) => (
                    <option key={program.id} value={program.id}>
                      {program.name}
                    </option>
                  ))}
                </select>
                <select
                  value={selectedStatus}
                  onChange={(e) => setSelectedStatus(e.target.value)}
                  className='px-3 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-500'
                >
                  <option value='all'>All Status</option>
                  <option value='active'>Active</option>
                  <option value='pending'>Pending</option>
                  <option value='inactive'>Inactive</option>
                </select>
                <Button
                  variant='outline'
                  size='sm'
                  onClick={handleAddRequirement}
                  className='flex items-center gap-2'
                >
                  <PlusIcon className='h-4 w-4' />
                  Add Requirement
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Requirements List */}
        <Card className='bg-white border border-gray-200 shadow-sm'>
          <CardHeader className='pb-4'>
            <CardTitle className='text-lg font-semibold text-gray-900'>
              Student Requirements
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
                        {requirement.requirement}
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
                    <p className='text-sm text-gray-600 mb-2'>
                      {requirement.description}
                    </p>
                    <div className='flex items-center gap-4 text-xs text-gray-500'>
                      <span className='flex items-center gap-1'>
                        <BookOpen className='h-3 w-3' />
                        {requirement.program}
                      </span>
                      <span className='flex items-center gap-1'>
                        <FileText className='h-3 w-3' />
                        {requirement.category}
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
                  <div className='grid grid-cols-1 md:grid-cols-2 gap-4 text-xs'>
                    <div>
                      <h5 className='font-medium text-gray-700 mb-1'>
                        Required Documents:
                      </h5>
                      <ul className='space-y-1'>
                        {requirement.documents.map((doc, index) => (
                          <li
                            key={index}
                            className='flex items-center gap-2 text-gray-600'
                          >
                            <FileTextIcon className='h-3 w-3' />
                            {doc}
                          </li>
                        ))}
                      </ul>
                    </div>
                    <div>
                      <h5 className='font-medium text-gray-700 mb-1'>
                        Contact Information:
                      </h5>
                      <div className='space-y-1 text-gray-600'>
                        <p className='flex items-center gap-2'>
                          <Users className='h-3 w-3' />
                          {requirement.contactPerson}
                        </p>
                        <p className='flex items-center gap-2'>
                          <Mail className='h-3 w-3' />
                          {requirement.email}
                        </p>
                        <p className='flex items-center gap-2'>
                          <Calendar className='h-3 w-3' />
                          Deadline: {requirement.deadline}
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
              Add New Requirement
            </Button>
            <Button
              variant='outline'
              className='w-full justify-start'
              onClick={() => navigate('/dashboard/programs')}
            >
              <BookOpen className='h-4 w-4 mr-2' />
              Manage Programs
            </Button>
            <Button variant='outline' className='w-full justify-start'>
              <Download className='h-4 w-4 mr-2' />
              Export Requirements
            </Button>
            <Button variant='outline' className='w-full justify-start'>
              <Upload className='h-4 w-4 mr-2' />
              Import Requirements
            </Button>
          </CardContent>
        </Card>

        {/* Categories Overview */}
        <Card className='bg-white border border-gray-200 shadow-sm'>
          <CardHeader className='pb-4'>
            <CardTitle className='text-lg font-semibold text-gray-900'>
              Requirements by Category
            </CardTitle>
          </CardHeader>
          <CardContent className='space-y-3'>
            {categories.slice(1).map((category) => (
              <div
                key={category.id}
                className='flex items-center justify-between p-3 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors'
              >
                <div className='flex items-center gap-3'>
                  <div className='w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center'>
                    <FileText className='h-4 w-4 text-blue-600' />
                  </div>
                  <span className='text-sm font-medium text-gray-900'>
                    {category.name}
                  </span>
                </div>
                <Badge variant='secondary' className='text-xs'>
                  {
                    studentRequirements.filter(
                      (req) =>
                        req.category.toLowerCase() ===
                        category.name.toLowerCase()
                    ).length
                  }
                </Badge>
              </div>
            ))}
          </CardContent>
        </Card>

        {/* Recent Updates */}
        <Card className='bg-white border border-gray-200 shadow-sm'>
          <CardHeader className='pb-4'>
            <CardTitle className='text-lg font-semibold text-gray-900'>
              Recent Updates
            </CardTitle>
          </CardHeader>
          <CardContent className='space-y-3'>
            {studentRequirements.slice(0, 3).map((requirement) => (
              <div
                key={requirement.id}
                className='p-3 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors'
              >
                <h4 className='font-medium text-sm text-gray-900 mb-1'>
                  {requirement.requirement}
                </h4>
                <p className='text-xs text-gray-600 mb-2'>
                  {requirement.program}
                </p>
                <div className='flex items-center justify-between'>
                  <span className='text-xs text-gray-500'>
                    Updated {requirement.lastUpdated}
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

export default UniversityStudentRequirement;
