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
import { Input } from '@/components/ui/input';
import { useToast } from '@/hooks/use-toast';
import { Breadcrumb } from '../../dashboard/Breadcrumb';
import AnalyticsModal from '../../modals/AnalyticsModal';
import ProgramManagementModal from '../../modals/ProgramManagementModal';
import {
  BookOpen,
  Plus,
  Search,
  BarChart3,
  Edit,
  Eye,
  Trash2,
  Download,
  Share2,
  Settings,
  Calendar,
  Users,
  DollarSign,
  Globe,
  Filter,
  SortAsc,
  MoreVertical,
  CheckCircle,
  Clock,
  AlertCircle,
  TrendingUp,
  Target,
} from 'lucide-react';

const UniversityPrograms = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [searchTerm, setSearchTerm] = useState('');
  const [analyticsOpen, setAnalyticsOpen] = useState(false);
  const [programModalOpen, setProgramModalOpen] = useState(false);
  const [selectedProgram, setSelectedProgram] = useState<any>(null);
  const [modalAction, setModalAction] = useState<
    'edit' | 'view' | 'delete' | 'analytics'
  >('view');

  // Scroll to top on component mount
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);

  const programs = [
    {
      id: 1,
      name: 'Master of Computer Science',
      type: "Master's Degree",
      duration: '2 years',
      fees: '25,000',
      applications: 1250,
      views: 5670,
      status: 'Active',
      deadline: 'Dec 15, 2025',
      description:
        'Advanced program in computer science with focus on AI and machine learning.',
    },
    {
      id: 2,
      name: 'Business Analytics PhD',
      type: 'PhD Program',
      duration: '4 years',
      fees: '35,000',
      applications: 340,
      views: 1890,
      status: 'Active',
      deadline: 'Jan 30, 2026',
      description:
        'Research-focused program in business analytics and data science.',
    },
    {
      id: 3,
      name: 'Data Science Certificate',
      type: 'Certificate',
      duration: '1 year',
      fees: '15,000',
      applications: 890,
      views: 3240,
      status: 'Review',
      deadline: 'Nov 20, 2025',
      description:
        'Professional certificate program in data science and analytics.',
    },
    {
      id: 4,
      name: 'International Business MBA',
      type: 'MBA',
      duration: '2 years',
      fees: '45,000',
      applications: 567,
      views: 2340,
      status: 'Draft',
      deadline: 'Feb 15, 2026',
      description: 'Global MBA program with international business focus.',
    },
    {
      id: 5,
      name: 'Cybersecurity Masters',
      type: "Master's Degree",
      duration: '2 years',
      fees: '28,000',
      applications: 432,
      views: 1890,
      status: 'Active',
      deadline: 'Mar 1, 2026',
      description:
        'Specialized program in cybersecurity and information security.',
    },
    {
      id: 6,
      name: 'Digital Marketing Certificate',
      type: 'Certificate',
      duration: '6 months',
      fees: '8,000',
      applications: 234,
      views: 1200,
      status: 'Active',
      deadline: 'Apr 15, 2025',
      description: 'Short-term certificate in digital marketing strategies.',
    },
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Active':
        return 'bg-green-100 text-green-700';
      case 'Review':
        return 'bg-yellow-100 text-yellow-700';
      case 'Draft':
        return 'bg-gray-100 text-gray-700';
      case 'Inactive':
        return 'bg-red-100 text-red-700';
      default:
        return 'bg-gray-100 text-gray-700';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'Active':
        return CheckCircle;
      case 'Review':
        return Clock;
      case 'Draft':
        return AlertCircle;
      case 'Inactive':
        return AlertCircle;
      default:
        return Clock;
    }
  };

  const filteredPrograms = programs.filter(
    (program) =>
      program.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      program.type.toLowerCase().includes(searchTerm.toLowerCase()) ||
      program.status.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleAddNewProgram = () => {
    navigate('/dashboard/submit-program');
  };

  const handleAnalytics = (programId: number) => {
    const program = programs.find((p) => p.id === programId);
    setSelectedProgram(program);
    setModalAction('analytics');
    setProgramModalOpen(true);
  };

  const handleEdit = (programId: number) => {
    const program = programs.find((p) => p.id === programId);
    setSelectedProgram(program);
    setModalAction('edit');
    setProgramModalOpen(true);
  };

  const handleView = (programId: number) => {
    const program = programs.find((p) => p.id === programId);
    setSelectedProgram(program);
    setModalAction('view');
    setProgramModalOpen(true);
  };

  const handleDelete = (programId: number) => {
    const program = programs.find((p) => p.id === programId);
    setSelectedProgram(program);
    setModalAction('delete');
    setProgramModalOpen(true);
  };

  const handleExportData = (programId: number) => {
    const program = programs.find((p) => p.id === programId);
    // Direct export functionality
  };

  const handleShareProgram = (programId: number) => {
    const program = programs.find((p) => p.id === programId);
    // Direct share functionality
  };

  const handleProgramSettings = (programId: number) => {
    const program = programs.find((p) => p.id === programId);
    // Direct settings functionality
  };

  return (
    <div className='min-h-screen bg-gradient-to-br from-orange-50/30 via-white to-orange-100/20'>
      <div className='p-6 space-y-6'>
        <Breadcrumb
          items={[
            { label: 'Dashboard', href: '/dashboard' },
            { label: 'My Programs' },
          ]}
        />

        <div className='flex justify-between items-center'>
          <div>
            <h1 className='text-3xl font-bold text-gray-900'>My Programs</h1>
            <p className='text-gray-600 mt-1'>
              Manage your academic programs and track their performance
            </p>
          </div>
          <Button
            className='bg-orange-600 hover:bg-orange-700'
            onClick={handleAddNewProgram}
          >
            <Plus className='h-4 w-4 mr-2' />
            Add New Program
          </Button>
        </div>

        {/* Search and Filters */}
        <Card>
          <CardContent className='p-4'>
            <div className='flex items-center gap-4'>
              <div className='relative flex-1'>
                <Search className='absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4' />
                <Input
                  placeholder='Search programs...'
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className='pl-10'
                />
              </div>
              <Button variant='outline' size='sm'>
                <Filter className='h-4 w-4 mr-2' />
                Filter
              </Button>
              <Button variant='outline' size='sm'>
                <SortAsc className='h-4 w-4 mr-2' />
                Sort
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Programs Grid */}
        <div className='grid md:grid-cols-2 lg:grid-cols-3 gap-6'>
          {filteredPrograms.map((program) => {
            const StatusIcon = getStatusIcon(program.status);
            return (
              <Card
                key={program.id}
                className='hover:shadow-lg transition-shadow'
              >
                <CardHeader>
                  <div className='flex items-start justify-between'>
                    <div className='flex-1'>
                      <CardTitle className='text-lg mb-2'>
                        {program.name}
                      </CardTitle>
                      <div className='flex items-center gap-2 mb-2'>
                        <Badge variant='outline' className='text-xs'>
                          {program.type}
                        </Badge>
                        <Badge
                          className={`text-xs ${getStatusColor(
                            program.status
                          )}`}
                        >
                          <StatusIcon className='h-3 w-3 mr-1' />
                          {program.status}
                        </Badge>
                      </div>
                    </div>
                    <Button variant='ghost' size='sm'>
                      <MoreVertical className='h-4 w-4' />
                    </Button>
                  </div>
                </CardHeader>
                <CardContent className='space-y-4'>
                  <div className='grid grid-cols-2 gap-4 text-sm'>
                    <div className='flex items-center gap-2'>
                      <Calendar className='h-4 w-4 text-gray-400' />
                      <span>{program.duration}</span>
                    </div>
                    <div className='flex items-center gap-2'>
                      <DollarSign className='h-4 w-4 text-gray-400' />
                      <span>${program.fees}</span>
                    </div>
                    <div className='flex items-center gap-2'>
                      <Users className='h-4 w-4 text-gray-400' />
                      <span>{program.applications} apps</span>
                    </div>
                    <div className='flex items-center gap-2'>
                      <Eye className='h-4 w-4 text-gray-400' />
                      <span>{program.views} views</span>
                    </div>
                  </div>

                  <p className='text-sm text-gray-600 line-clamp-2'>
                    {program.description}
                  </p>

                  <div className='flex items-center justify-between text-xs text-gray-500'>
                    <span>Deadline: {program.deadline}</span>
                  </div>

                  {/* Action Buttons */}
                  <div className='grid grid-cols-2 gap-2'>
                    <Button
                      size='sm'
                      className='bg-blue-600 hover:bg-blue-700'
                      onClick={() => handleAnalytics(program.id)}
                    >
                      <BarChart3 className='h-3 w-3 mr-1' />
                      Analytics
                    </Button>
                    <Button
                      size='sm'
                      variant='outline'
                      onClick={() => handleEdit(program.id)}
                    >
                      <Edit className='h-3 w-3 mr-1' />
                      Edit
                    </Button>
                  </div>

                  <div className='grid grid-cols-3 gap-2'>
                    <Button
                      size='sm'
                      variant='outline'
                      onClick={() => handleView(program.id)}
                    >
                      <Eye className='h-3 w-3 mr-1' />
                      View
                    </Button>
                    <Button
                      size='sm'
                      variant='outline'
                      onClick={() => handleProgramSettings(program.id)}
                    >
                      <Settings className='h-3 w-3 mr-1' />
                      Settings
                    </Button>
                    <Button
                      size='sm'
                      variant='outline'
                      onClick={() => handleShareProgram(program.id)}
                    >
                      <Share2 className='h-3 w-3 mr-1' />
                      Share
                    </Button>
                  </div>

                  <div className='flex gap-2'>
                    <Button
                      size='sm'
                      variant='outline'
                      className='flex-1'
                      onClick={() => handleExportData(program.id)}
                    >
                      <Download className='h-3 w-3 mr-1' />
                      Export
                    </Button>
                    <Button
                      size='sm'
                      variant='destructive'
                      className='flex-1'
                      onClick={() => handleDelete(program.id)}
                    >
                      <Trash2 className='h-3 w-3 mr-1' />
                      Delete
                    </Button>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>

        {/* Empty State */}
        {filteredPrograms.length === 0 && (
          <Card>
            <CardContent className='p-12 text-center'>
              <BookOpen className='h-12 w-12 text-gray-400 mx-auto mb-4' />
              <h3 className='text-lg font-medium text-gray-900 mb-2'>
                No programs found
              </h3>
              <p className='text-gray-600 mb-4'>
                {searchTerm
                  ? 'Try adjusting your search terms.'
                  : 'Get started by creating your first program.'}
              </p>
              {!searchTerm && (
                <Button
                  className='bg-orange-600 hover:bg-orange-700'
                  onClick={handleAddNewProgram}
                >
                  <Plus className='h-4 w-4 mr-2' />
                  Add New Program
                </Button>
              )}
            </CardContent>
          </Card>
        )}

        {/* Summary Stats */}
        <Card>
          <CardHeader>
            <CardTitle className='flex items-center gap-2'>
              <TrendingUp className='h-5 w-5 text-green-600' />
              Program Summary
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className='grid md:grid-cols-4 gap-6'>
              <div className='text-center'>
                <div className='text-2xl font-bold text-blue-600'>
                  {programs.length}
                </div>
                <div className='text-sm text-gray-600'>Total Programs</div>
              </div>
              <div className='text-center'>
                <div className='text-2xl font-bold text-green-600'>
                  {programs.filter((p) => p.status === 'Active').length}
                </div>
                <div className='text-sm text-gray-600'>Active Programs</div>
              </div>
              <div className='text-center'>
                <div className='text-2xl font-bold text-purple-600'>
                  {programs
                    .reduce((sum, p) => sum + p.applications, 0)
                    .toLocaleString()}
                </div>
                <div className='text-sm text-gray-600'>Total Applications</div>
              </div>
              <div className='text-center'>
                <div className='text-2xl font-bold text-orange-600'>
                  {programs
                    .reduce((sum, p) => sum + p.views, 0)
                    .toLocaleString()}
                </div>
                <div className='text-sm text-gray-600'>Total Views</div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Modals */}
      <AnalyticsModal
        open={analyticsOpen}
        onOpenChange={setAnalyticsOpen}
        programName={selectedProgram?.name}
      />
      <ProgramManagementModal
        open={programModalOpen}
        onOpenChange={setProgramModalOpen}
        action={modalAction}
        program={selectedProgram}
      />
    </div>
  );
};

export default UniversityPrograms;
