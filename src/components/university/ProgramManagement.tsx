import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import {
  GraduationCap,
  Plus,
  Search,
  Filter,
  Eye,
  Edit,
  Trash2,
  Users,
  Calendar,
  DollarSign,
  Clock,
  Star,
  TrendingUp,
  ChevronDown,
  X,
  BookOpen,
  Award,
  Target,
  Globe,
  Building2,
  MapPin,
  CheckCircle,
  AlertCircle,
  BarChart3,
  Share,
  ExternalLink,
} from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';
import { useToast } from '@/hooks/use-toast';
import {
  getUniversityPrograms,
  createUniversityProgram,
  updateUniversityProgram,
  deleteUniversityProgram,
  getProgramApplications,
  type UniversityProgram,
  type ProgramApplication,
} from '@/lib/api/university';

interface ProgramManagementProps {
  compact?: boolean;
  onProgramSelect?: (program: UniversityProgram) => void;
}

interface ProgramFilters {
  program_type?: string;
  department?: string;
  is_active?: boolean;
  is_featured?: boolean;
  search?: string;
}

export const ProgramManagement: React.FC<ProgramManagementProps> = ({
  compact = false,
  onProgramSelect,
}) => {
  const { user } = useAuth();
  const { toast } = useToast();
  const [programs, setPrograms] = useState<UniversityProgram[]>([]);
  const [applications, setApplications] = useState<ProgramApplication[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [showFilters, setShowFilters] = useState(false);
  const [filters, setFilters] = useState<ProgramFilters>({});
  const [activeTab, setActiveTab] = useState<
    'programs' | 'applications' | 'analytics'
  >('programs');
  const [showCreateForm, setShowCreateForm] = useState(false);
  const [editingProgram, setEditingProgram] =
    useState<UniversityProgram | null>(null);
  const [newProgram, setNewProgram] = useState({
    title: '',
    description: '',
    program_type: 'undergraduate' as const,
    department: '',
    duration_months: 0,
    credits_required: 0,
    tuition_fee: 0,
    currency: 'USD',
    language: 'English',
    start_dates: [] as string[],
    application_deadline: '',
    requirements: [] as string[],
    curriculum: [] as string[],
    career_outcomes: [] as string[],
    admission_criteria: [] as string[],
  });

  const programTypes = [
    { value: 'undergraduate', label: 'Undergraduate', icon: BookOpen },
    { value: 'graduate', label: 'Graduate', icon: GraduationCap },
    { value: 'phd', label: 'PhD', icon: Award },
    { value: 'certificate', label: 'Certificate', icon: CheckCircle },
    { value: 'diploma', label: 'Diploma', icon: Star },
    { value: 'online', label: 'Online', icon: Globe },
    { value: 'hybrid', label: 'Hybrid', icon: Target },
  ];

  const departments = [
    'Computer Science',
    'Engineering',
    'Business',
    'Medicine',
    'Law',
    'Arts',
    'Sciences',
    'Education',
    'Social Sciences',
    'Other',
  ];

  useEffect(() => {
    fetchPrograms();
    fetchApplications();
  }, [filters, searchTerm, activeTab]);

  const fetchPrograms = async () => {
    setLoading(true);
    try {
      const searchFilters: any = { ...filters };

      if (searchTerm) {
        searchFilters.search = searchTerm;
      }

      if (user?.role === 'university') {
        searchFilters.university_id = user.id;
      }

      const { data, error } = await getUniversityPrograms(searchFilters);

      if (error) {
        toast({
          title: 'Error',
          description: error,
          variant: 'destructive',
        });
        return;
      }

      setPrograms(data || []);
    } catch (error) {
      console.error('Error fetching programs:', error);
    } finally {
      setLoading(false);
    }
  };

  const fetchApplications = async () => {
    if (!user) return;

    try {
      const { data, error } = await getProgramApplications();

      if (error) {
        console.error('Error fetching applications:', error);
        return;
      }

      setApplications(data || []);
    } catch (error) {
      console.error('Error fetching applications:', error);
    }
  };

  const handleCreateProgram = async () => {
    if (!user) return;

    try {
      const { error } = await createUniversityProgram(newProgram);

      if (error) {
        toast({
          title: 'Error',
          description: error,
          variant: 'destructive',
        });
        return;
      }

      toast({
        title: 'Success',
        description: 'Program created successfully!',
      });

      setShowCreateForm(false);
      setNewProgram({
        title: '',
        description: '',
        program_type: 'undergraduate',
        department: '',
        duration_months: 0,
        credits_required: 0,
        tuition_fee: 0,
        currency: 'USD',
        language: 'English',
        start_dates: [],
        application_deadline: '',
        requirements: [],
        curriculum: [],
        career_outcomes: [],
        admission_criteria: [],
      });
      fetchPrograms();
    } catch (error) {
      toast({
        title: 'Error',
        description: 'Failed to create program',
        variant: 'destructive',
      });
    }
  };

  const handleUpdateProgram = async () => {
    if (!editingProgram) return;

    try {
      const { error } = await updateUniversityProgram(
        editingProgram.id,
        editingProgram
      );

      if (error) {
        toast({
          title: 'Error',
          description: error,
          variant: 'destructive',
        });
        return;
      }

      toast({
        title: 'Success',
        description: 'Program updated successfully!',
      });

      setEditingProgram(null);
      fetchPrograms();
    } catch (error) {
      toast({
        title: 'Error',
        description: 'Failed to update program',
        variant: 'destructive',
      });
    }
  };

  const handleDeleteProgram = async (programId: string) => {
    if (!confirm('Are you sure you want to delete this program?')) return;

    try {
      const { error } = await deleteUniversityProgram(programId);

      if (error) {
        toast({
          title: 'Error',
          description: error,
          variant: 'destructive',
        });
        return;
      }

      toast({
        title: 'Success',
        description: 'Program deleted successfully!',
      });

      fetchPrograms();
    } catch (error) {
      toast({
        title: 'Error',
        description: 'Failed to delete program',
        variant: 'destructive',
      });
    }
  };

  const clearFilters = () => {
    setFilters({});
  };

  const getProgramTypeIcon = (type: string) => {
    const programType = programTypes.find((pt) => pt.value === type);
    return programType ? programType.icon : BookOpen;
  };

  const getProgramTypeColor = (type: string) => {
    switch (type) {
      case 'undergraduate':
        return 'bg-blue-100 text-blue-800';
      case 'graduate':
        return 'bg-green-100 text-green-800';
      case 'phd':
        return 'bg-purple-100 text-purple-800';
      case 'certificate':
        return 'bg-orange-100 text-orange-800';
      case 'diploma':
        return 'bg-yellow-100 text-yellow-800';
      case 'online':
        return 'bg-indigo-100 text-indigo-800';
      case 'hybrid':
        return 'bg-pink-100 text-pink-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    });
  };

  const formatCurrency = (amount: number, currency: string) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: currency,
    }).format(amount);
  };

  const getApplicationStats = () => {
    return {
      total: applications.length,
      submitted: applications.filter((app) => app.status === 'submitted')
        .length,
      underReview: applications.filter((app) => app.status === 'under-review')
        .length,
      accepted: applications.filter((app) => app.status === 'accepted').length,
      rejected: applications.filter((app) => app.status === 'rejected').length,
    };
  };

  if (loading) {
    return (
      <div className='space-y-4'>
        <div className='animate-pulse'>
          <div className='h-4 bg-gray-200 rounded w-1/4 mb-4'></div>
          <div className='space-y-3'>
            {[1, 2, 3, 4, 5].map((i) => (
              <div key={i} className='h-32 bg-gray-200 rounded'></div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  if (compact) {
    return (
      <div className='space-y-4'>
        <div className='flex items-center justify-between'>
          <h3 className='text-sm font-medium'>Programs</h3>
          <Badge variant='outline'>{programs.length}</Badge>
        </div>

        <div className='space-y-2'>
          {programs.slice(0, 3).map((program) => {
            const Icon = getProgramTypeIcon(program.program_type);
            return (
              <div key={program.id} className='p-3 border rounded-lg'>
                <div className='flex items-start gap-2 mb-2'>
                  <div className='w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center'>
                    <Icon className='w-4 h-4 text-blue-600' />
                  </div>
                  <div className='flex-1 min-w-0'>
                    <p className='text-sm font-medium truncate'>
                      {program.title}
                    </p>
                    <p className='text-xs text-muted-foreground'>
                      {program.department}
                    </p>
                  </div>
                  <Badge
                    className={`text-xs ${getProgramTypeColor(
                      program.program_type
                    )}`}
                  >
                    {program.program_type}
                  </Badge>
                </div>
                <p className='text-xs text-muted-foreground line-clamp-2'>
                  {program.description}
                </p>
              </div>
            );
          })}
        </div>

        {programs.length > 3 && (
          <Button variant='outline' size='sm' className='w-full'>
            View All ({programs.length})
          </Button>
        )}
      </div>
    );
  }

  return (
    <div className='space-y-6'>
      {/* Header */}
      <div className='flex items-center justify-between'>
        <div>
          <h3 className='text-lg font-semibold'>Program Management</h3>
          <p className='text-sm text-muted-foreground'>
            Manage university programs and track applications
          </p>
        </div>
        {user?.role === 'university' && (
          <Button onClick={() => setShowCreateForm(true)}>
            <Plus className='w-4 h-4 mr-2' />
            Create Program
          </Button>
        )}
      </div>

      {/* Tabs */}
      <div className='flex gap-2'>
        {(['programs', 'applications', 'analytics'] as const).map((tab) => (
          <Button
            key={tab}
            variant={activeTab === tab ? 'default' : 'outline'}
            size='sm'
            onClick={() => setActiveTab(tab)}
          >
            {tab === 'programs' && <GraduationCap className='w-4 h-4 mr-1' />}
            {tab === 'applications' && <Users className='w-4 h-4 mr-1' />}
            {tab === 'analytics' && <BarChart3 className='w-4 h-4 mr-1' />}
            <span className='capitalize'>{tab}</span>
          </Button>
        ))}
      </div>

      {/* Search and Filters */}
      {activeTab === 'programs' && (
        <div className='space-y-4'>
          <div className='relative'>
            <Search className='absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-5 h-5' />
            <input
              type='text'
              placeholder='Search programs by title, department, or description...'
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className='w-full pl-12 pr-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-lg'
            />
          </div>

          <div className='flex items-center justify-between'>
            <Button
              variant='outline'
              size='sm'
              onClick={() => setShowFilters(!showFilters)}
            >
              <Filter className='w-4 h-4 mr-2' />
              Filters
              <ChevronDown
                className={`w-4 h-4 ml-2 transition-transform ${
                  showFilters ? 'rotate-180' : ''
                }`}
              />
            </Button>

            {Object.values(filters).some(
              (f) => f !== undefined && f !== ''
            ) && (
              <Button variant='ghost' size='sm' onClick={clearFilters}>
                <X className='w-4 h-4 mr-2' />
                Clear Filters
              </Button>
            )}
          </div>

          {/* Advanced Filters */}
          {showFilters && (
            <Card>
              <CardContent className='p-4 space-y-4'>
                <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4'>
                  <div>
                    <label className='block text-sm font-medium mb-1'>
                      Program Type
                    </label>
                    <select
                      value={filters.program_type || ''}
                      onChange={(e) =>
                        setFilters((prev) => ({
                          ...prev,
                          program_type: e.target.value || undefined,
                        }))
                      }
                      className='w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500'
                    >
                      <option value=''>All Types</option>
                      {programTypes.map((type) => (
                        <option key={type.value} value={type.value}>
                          {type.label}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className='block text-sm font-medium mb-1'>
                      Department
                    </label>
                    <select
                      value={filters.department || ''}
                      onChange={(e) =>
                        setFilters((prev) => ({
                          ...prev,
                          department: e.target.value || undefined,
                        }))
                      }
                      className='w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500'
                    >
                      <option value=''>All Departments</option>
                      {departments.map((dept) => (
                        <option key={dept} value={dept}>
                          {dept}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className='block text-sm font-medium mb-1'>
                      Status
                    </label>
                    <select
                      value={
                        filters.is_active === undefined
                          ? ''
                          : filters.is_active.toString()
                      }
                      onChange={(e) =>
                        setFilters((prev) => ({
                          ...prev,
                          is_active:
                            e.target.value === ''
                              ? undefined
                              : e.target.value === 'true',
                        }))
                      }
                      className='w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500'
                    >
                      <option value=''>All</option>
                      <option value='true'>Active</option>
                      <option value='false'>Inactive</option>
                    </select>
                  </div>
                </div>
              </CardContent>
            </Card>
          )}
        </div>
      )}

      {/* Create/Edit Program Form */}
      {(showCreateForm || editingProgram) && (
        <Card>
          <CardHeader>
            <CardTitle>
              {editingProgram ? 'Edit Program' : 'Create New Program'}
            </CardTitle>
          </CardHeader>
          <CardContent className='space-y-4'>
            <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
              <div>
                <Label htmlFor='title'>Program Title *</Label>
                <Input
                  id='title'
                  value={editingProgram?.title || newProgram.title}
                  onChange={(e) => {
                    if (editingProgram) {
                      setEditingProgram((prev) =>
                        prev ? { ...prev, title: e.target.value } : null
                      );
                    } else {
                      setNewProgram((prev) => ({
                        ...prev,
                        title: e.target.value,
                      }));
                    }
                  }}
                  placeholder='Enter program title'
                />
              </div>
              <div>
                <Label htmlFor='department'>Department *</Label>
                <select
                  id='department'
                  value={editingProgram?.department || newProgram.department}
                  onChange={(e) => {
                    if (editingProgram) {
                      setEditingProgram((prev) =>
                        prev ? { ...prev, department: e.target.value } : null
                      );
                    } else {
                      setNewProgram((prev) => ({
                        ...prev,
                        department: e.target.value,
                      }));
                    }
                  }}
                  className='w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500'
                >
                  <option value=''>Select department</option>
                  {departments.map((dept) => (
                    <option key={dept} value={dept}>
                      {dept}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            <div>
              <Label htmlFor='description'>Description *</Label>
              <Textarea
                id='description'
                value={editingProgram?.description || newProgram.description}
                onChange={(e) => {
                  if (editingProgram) {
                    setEditingProgram((prev) =>
                      prev ? { ...prev, description: e.target.value } : null
                    );
                  } else {
                    setNewProgram((prev) => ({
                      ...prev,
                      description: e.target.value,
                    }));
                  }
                }}
                placeholder='Describe the program...'
                rows={4}
              />
            </div>

            <div className='grid grid-cols-1 md:grid-cols-3 gap-4'>
              <div>
                <Label htmlFor='program_type'>Program Type *</Label>
                <select
                  id='program_type'
                  value={
                    editingProgram?.program_type || newProgram.program_type
                  }
                  onChange={(e) => {
                    if (editingProgram) {
                      setEditingProgram((prev) =>
                        prev
                          ? { ...prev, program_type: e.target.value as any }
                          : null
                      );
                    } else {
                      setNewProgram((prev) => ({
                        ...prev,
                        program_type: e.target.value as any,
                      }));
                    }
                  }}
                  className='w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500'
                >
                  {programTypes.map((type) => (
                    <option key={type.value} value={type.value}>
                      {type.label}
                    </option>
                  ))}
                </select>
              </div>
              <div>
                <Label htmlFor='duration_months'>Duration (months)</Label>
                <Input
                  id='duration_months'
                  type='number'
                  value={
                    editingProgram?.duration_months ||
                    newProgram.duration_months
                  }
                  onChange={(e) => {
                    if (editingProgram) {
                      setEditingProgram((prev) =>
                        prev
                          ? {
                              ...prev,
                              duration_months: parseInt(e.target.value) || 0,
                            }
                          : null
                      );
                    } else {
                      setNewProgram((prev) => ({
                        ...prev,
                        duration_months: parseInt(e.target.value) || 0,
                      }));
                    }
                  }}
                  placeholder='24'
                />
              </div>
              <div>
                <Label htmlFor='tuition_fee'>Tuition Fee</Label>
                <Input
                  id='tuition_fee'
                  type='number'
                  value={editingProgram?.tuition_fee || newProgram.tuition_fee}
                  onChange={(e) => {
                    if (editingProgram) {
                      setEditingProgram((prev) =>
                        prev
                          ? {
                              ...prev,
                              tuition_fee: parseInt(e.target.value) || 0,
                            }
                          : null
                      );
                    } else {
                      setNewProgram((prev) => ({
                        ...prev,
                        tuition_fee: parseInt(e.target.value) || 0,
                      }));
                    }
                  }}
                  placeholder='50000'
                />
              </div>
            </div>

            <div className='flex gap-2'>
              <Button
                onClick={
                  editingProgram ? handleUpdateProgram : handleCreateProgram
                }
              >
                {editingProgram ? 'Update Program' : 'Create Program'}
              </Button>
              <Button
                variant='outline'
                onClick={() => {
                  setShowCreateForm(false);
                  setEditingProgram(null);
                }}
              >
                Cancel
              </Button>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Tab Content */}
      {activeTab === 'programs' && (
        <div className='space-y-4'>
          {programs.length === 0 ? (
            <Card>
              <CardContent className='p-6 text-center'>
                <GraduationCap className='w-12 h-12 text-muted-foreground mx-auto mb-4' />
                <h3 className='text-lg font-medium mb-2'>No programs found</h3>
                <p className='text-muted-foreground'>
                  {user?.role === 'university'
                    ? 'Create your first program to get started'
                    : 'No programs available at the moment'}
                </p>
              </CardContent>
            </Card>
          ) : (
            programs.map((program) => {
              const Icon = getProgramTypeIcon(program.program_type);
              return (
                <Card
                  key={program.id}
                  className='hover:shadow-md transition-shadow'
                >
                  <CardContent className='p-4'>
                    <div className='flex items-start gap-3'>
                      <div className='w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center'>
                        <Icon className='w-6 h-6 text-blue-600' />
                      </div>

                      <div className='flex-1 min-w-0'>
                        <div className='flex items-center gap-2 mb-1'>
                          <h4 className='font-medium truncate'>
                            {program.title}
                          </h4>
                          {program.is_featured && (
                            <Star className='w-4 h-4 text-yellow-600' />
                          )}
                          <Badge
                            className={`text-xs ${getProgramTypeColor(
                              program.program_type
                            )}`}
                          >
                            {program.program_type}
                          </Badge>
                          <Badge variant='outline' className='text-xs'>
                            {program.department}
                          </Badge>
                        </div>

                        <p className='text-sm text-muted-foreground mb-2 line-clamp-2'>
                          {program.description}
                        </p>

                        <div className='flex items-center gap-4 text-sm text-muted-foreground'>
                          {program.duration_months && (
                            <div className='flex items-center gap-1'>
                              <Clock className='w-4 h-4' />
                              <span>{program.duration_months} months</span>
                            </div>
                          )}
                          {program.tuition_fee && (
                            <div className='flex items-center gap-1'>
                              <DollarSign className='w-4 h-4' />
                              <span>
                                {formatCurrency(
                                  program.tuition_fee,
                                  program.currency
                                )}
                              </span>
                            </div>
                          )}
                          {program.application_deadline && (
                            <div className='flex items-center gap-1'>
                              <Calendar className='w-4 h-4' />
                              <span>
                                Deadline:{' '}
                                {formatDate(program.application_deadline)}
                              </span>
                            </div>
                          )}
                          {program.application_count && (
                            <div className='flex items-center gap-1'>
                              <Users className='w-4 h-4' />
                              <span>
                                {program.application_count} applications
                              </span>
                            </div>
                          )}
                        </div>
                      </div>

                      <div className='flex flex-col gap-2'>
                        <Button
                          variant='outline'
                          size='sm'
                          onClick={() => onProgramSelect?.(program)}
                        >
                          <Eye className='w-4 h-4 mr-1' />
                          View
                        </Button>

                        {user?.role === 'university' && (
                          <>
                            <Button
                              variant='outline'
                              size='sm'
                              onClick={() => setEditingProgram(program)}
                            >
                              <Edit className='w-4 h-4 mr-1' />
                              Edit
                            </Button>
                            <Button
                              variant='outline'
                              size='sm'
                              onClick={() => handleDeleteProgram(program.id)}
                            >
                              <Trash2 className='w-4 h-4 mr-1' />
                              Delete
                            </Button>
                          </>
                        )}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              );
            })
          )}
        </div>
      )}

      {activeTab === 'applications' && (
        <div className='space-y-4'>
          {/* Application Stats */}
          <div className='grid grid-cols-2 md:grid-cols-5 gap-4'>
            <Card>
              <CardContent className='p-4 text-center'>
                <div className='text-2xl font-bold text-blue-600'>
                  {getApplicationStats().total}
                </div>
                <div className='text-xs text-muted-foreground'>Total</div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className='p-4 text-center'>
                <div className='text-2xl font-bold text-yellow-600'>
                  {getApplicationStats().submitted}
                </div>
                <div className='text-xs text-muted-foreground'>Submitted</div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className='p-4 text-center'>
                <div className='text-2xl font-bold text-orange-600'>
                  {getApplicationStats().underReview}
                </div>
                <div className='text-xs text-muted-foreground'>
                  Under Review
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className='p-4 text-center'>
                <div className='text-2xl font-bold text-green-600'>
                  {getApplicationStats().accepted}
                </div>
                <div className='text-xs text-muted-foreground'>Accepted</div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className='p-4 text-center'>
                <div className='text-2xl font-bold text-red-600'>
                  {getApplicationStats().rejected}
                </div>
                <div className='text-xs text-muted-foreground'>Rejected</div>
              </CardContent>
            </Card>
          </div>

          {/* Applications List */}
          <div className='space-y-2'>
            {applications.map((application) => (
              <Card key={application.id}>
                <CardContent className='p-4'>
                  <div className='flex items-center gap-3'>
                    <Avatar className='w-10 h-10'>
                      <AvatarImage src={application.applicant?.avatar} />
                      <AvatarFallback>
                        {application.applicant?.display_name.charAt(0)}
                      </AvatarFallback>
                    </Avatar>
                    <div className='flex-1'>
                      <h5 className='font-medium'>
                        {application.program?.title}
                      </h5>
                      <p className='text-sm text-muted-foreground'>
                        {application.applicant?.display_name} •{' '}
                        {application.applicant?.email}
                      </p>
                      <p className='text-xs text-muted-foreground'>
                        Applied {formatDate(application.applied_at)}
                      </p>
                    </div>
                    <Badge variant='outline' className='text-xs'>
                      {application.status}
                    </Badge>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      )}

      {activeTab === 'analytics' && (
        <div className='space-y-4'>
          <Card>
            <CardContent className='p-6 text-center'>
              <BarChart3 className='w-12 h-12 text-muted-foreground mx-auto mb-4' />
              <h3 className='text-lg font-medium mb-2'>Analytics Dashboard</h3>
              <p className='text-muted-foreground'>
                Program performance metrics and insights coming soon
              </p>
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  );
};
