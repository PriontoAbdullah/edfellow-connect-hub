import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import {
  Award,
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
  Target,
  Globe,
  Building2,
  MapPin,
  CheckCircle,
  AlertCircle,
  BarChart3,
  Share,
  ExternalLink,
  Gift,
  GraduationCap,
  UserCheck,
  FileText,
} from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';
import { useToast } from '@/hooks/use-toast';
import {
  getScholarships,
  createScholarship,
  updateScholarship,
  deleteScholarship,
  getScholarshipApplications,
  type Scholarship,
  type ScholarshipApplication,
} from '@/lib/api/university';

interface ScholarshipManagementProps {
  compact?: boolean;
  onScholarshipSelect?: (scholarship: Scholarship) => void;
}

interface ScholarshipFilters {
  scholarship_type?: string;
  university_id?: string;
  is_active?: boolean;
  is_featured?: boolean;
  search?: string;
}

export const ScholarshipManagement: React.FC<ScholarshipManagementProps> = ({
  compact = false,
  onScholarshipSelect,
}) => {
  const { user } = useAuth();
  const { toast } = useToast();
  const [scholarships, setScholarships] = useState<Scholarship[]>([]);
  const [applications, setApplications] = useState<ScholarshipApplication[]>(
    []
  );
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [showFilters, setShowFilters] = useState(false);
  const [filters, setFilters] = useState<ScholarshipFilters>({});
  const [activeTab, setActiveTab] = useState<
    'scholarships' | 'applications' | 'matching' | 'analytics'
  >('scholarships');
  const [showCreateForm, setShowCreateForm] = useState(false);
  const [editingScholarship, setEditingScholarship] =
    useState<Scholarship | null>(null);
  const [newScholarship, setNewScholarship] = useState({
    title: '',
    description: '',
    amount: 0,
    currency: 'USD',
    scholarship_type: 'merit-based' as const,
    eligibility_criteria: [] as string[],
    application_requirements: [] as string[],
    application_deadline: '',
    award_date: '',
    renewable: false,
    renewal_criteria: '',
    max_recipients: 0,
  });

  const scholarshipTypes = [
    { value: 'merit-based', label: 'Merit-Based', icon: Star },
    { value: 'need-based', label: 'Need-Based', icon: Heart },
    { value: 'academic', label: 'Academic', icon: BookOpen },
    { value: 'athletic', label: 'Athletic', icon: Target },
    { value: 'research', label: 'Research', icon: GraduationCap },
    { value: 'international', label: 'International', icon: Globe },
    { value: 'minority', label: 'Minority', icon: Users },
    { value: 'other', label: 'Other', icon: Gift },
  ];

  useEffect(() => {
    fetchScholarships();
    fetchApplications();
  }, [filters, searchTerm, activeTab]);

  const fetchScholarships = async () => {
    setLoading(true);
    try {
      const searchFilters: any = { ...filters };

      if (searchTerm) {
        searchFilters.search = searchTerm;
      }

      if (user?.role === 'university') {
        searchFilters.university_id = user.id;
      }

      const { data, error } = await getScholarships(searchFilters);

      if (error) {
        toast({
          title: 'Error',
          description: error,
          variant: 'destructive',
        });
        return;
      }

      setScholarships(data || []);
    } catch (error) {
      console.error('Error fetching scholarships:', error);
    } finally {
      setLoading(false);
    }
  };

  const fetchApplications = async () => {
    if (!user) return;

    try {
      const { data, error } = await getScholarshipApplications();

      if (error) {
        console.error('Error fetching applications:', error);
        return;
      }

      setApplications(data || []);
    } catch (error) {
      console.error('Error fetching applications:', error);
    }
  };

  const handleCreateScholarship = async () => {
    if (!user) return;

    try {
      const { error } = await createScholarship(newScholarship);

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
        description: 'Scholarship created successfully!',
      });

      setShowCreateForm(false);
      setNewScholarship({
        title: '',
        description: '',
        amount: 0,
        currency: 'USD',
        scholarship_type: 'merit-based',
        eligibility_criteria: [],
        application_requirements: [],
        application_deadline: '',
        award_date: '',
        renewable: false,
        renewal_criteria: '',
        max_recipients: 0,
      });
      fetchScholarships();
    } catch (error) {
      toast({
        title: 'Error',
        description: 'Failed to create scholarship',
        variant: 'destructive',
      });
    }
  };

  const handleUpdateScholarship = async () => {
    if (!editingScholarship) return;

    try {
      const { error } = await updateScholarship(
        editingScholarship.id,
        editingScholarship
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
        description: 'Scholarship updated successfully!',
      });

      setEditingScholarship(null);
      fetchScholarships();
    } catch (error) {
      toast({
        title: 'Error',
        description: 'Failed to update scholarship',
        variant: 'destructive',
      });
    }
  };

  const handleDeleteScholarship = async (scholarshipId: string) => {
    if (!confirm('Are you sure you want to delete this scholarship?')) return;

    try {
      const { error } = await deleteScholarship(scholarshipId);

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
        description: 'Scholarship deleted successfully!',
      });

      fetchScholarships();
    } catch (error) {
      toast({
        title: 'Error',
        description: 'Failed to delete scholarship',
        variant: 'destructive',
      });
    }
  };

  const clearFilters = () => {
    setFilters({});
  };

  const getScholarshipTypeIcon = (type: string) => {
    const scholarshipType = scholarshipTypes.find((st) => st.value === type);
    return scholarshipType ? scholarshipType.icon : Gift;
  };

  const getScholarshipTypeColor = (type: string) => {
    switch (type) {
      case 'merit-based':
        return 'bg-blue-100 text-blue-800';
      case 'need-based':
        return 'bg-green-100 text-green-800';
      case 'academic':
        return 'bg-purple-100 text-purple-800';
      case 'athletic':
        return 'bg-orange-100 text-orange-800';
      case 'research':
        return 'bg-indigo-100 text-indigo-800';
      case 'international':
        return 'bg-pink-100 text-pink-800';
      case 'minority':
        return 'bg-yellow-100 text-yellow-800';
      case 'other':
        return 'bg-gray-100 text-gray-800';
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
      awarded: applications.filter((app) => app.status === 'awarded').length,
      rejected: applications.filter((app) => app.status === 'rejected').length,
    };
  };

  const getScholarshipStats = () => {
    return {
      total: scholarships.length,
      active: scholarships.filter((s) => s.is_active).length,
      featured: scholarships.filter((s) => s.is_featured).length,
      totalAmount: scholarships.reduce((sum, s) => sum + s.amount, 0),
      totalRecipients: scholarships.reduce(
        (sum, s) => sum + s.current_recipients,
        0
      ),
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
          <h3 className='text-sm font-medium'>Scholarships</h3>
          <Badge variant='outline'>{scholarships.length}</Badge>
        </div>

        <div className='space-y-2'>
          {scholarships.slice(0, 3).map((scholarship) => {
            const Icon = getScholarshipTypeIcon(scholarship.scholarship_type);
            return (
              <div key={scholarship.id} className='p-3 border rounded-lg'>
                <div className='flex items-start gap-2 mb-2'>
                  <div className='w-8 h-8 bg-green-100 rounded-lg flex items-center justify-center'>
                    <Icon className='w-4 h-4 text-green-600' />
                  </div>
                  <div className='flex-1 min-w-0'>
                    <p className='text-sm font-medium truncate'>
                      {scholarship.title}
                    </p>
                    <p className='text-xs text-muted-foreground'>
                      {formatCurrency(scholarship.amount, scholarship.currency)}
                    </p>
                  </div>
                  <Badge
                    className={`text-xs ${getScholarshipTypeColor(
                      scholarship.scholarship_type
                    )}`}
                  >
                    {scholarship.scholarship_type}
                  </Badge>
                </div>
                <p className='text-xs text-muted-foreground line-clamp-2'>
                  {scholarship.description}
                </p>
              </div>
            );
          })}
        </div>

        {scholarships.length > 3 && (
          <Button variant='outline' size='sm' className='w-full'>
            View All ({scholarships.length})
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
          <h3 className='text-lg font-semibold'>Scholarship Management</h3>
          <p className='text-sm text-muted-foreground'>
            Manage scholarships and track applications
          </p>
        </div>
        {user?.role === 'university' && (
          <Button onClick={() => setShowCreateForm(true)}>
            <Plus className='w-4 h-4 mr-2' />
            Create Scholarship
          </Button>
        )}
      </div>

      {/* Tabs */}
      <div className='flex gap-2'>
        {(
          ['scholarships', 'applications', 'matching', 'analytics'] as const
        ).map((tab) => (
          <Button
            key={tab}
            variant={activeTab === tab ? 'default' : 'outline'}
            size='sm'
            onClick={() => setActiveTab(tab)}
          >
            {tab === 'scholarships' && <Award className='w-4 h-4 mr-1' />}
            {tab === 'applications' && <FileText className='w-4 h-4 mr-1' />}
            {tab === 'matching' && <UserCheck className='w-4 h-4 mr-1' />}
            {tab === 'analytics' && <BarChart3 className='w-4 h-4 mr-1' />}
            <span className='capitalize'>{tab}</span>
          </Button>
        ))}
      </div>

      {/* Search and Filters */}
      {activeTab === 'scholarships' && (
        <div className='space-y-4'>
          <div className='relative'>
            <Search className='absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-5 h-5' />
            <input
              type='text'
              placeholder='Search scholarships by title or description...'
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
                      Scholarship Type
                    </label>
                    <select
                      value={filters.scholarship_type || ''}
                      onChange={(e) =>
                        setFilters((prev) => ({
                          ...prev,
                          scholarship_type: e.target.value || undefined,
                        }))
                      }
                      className='w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500'
                    >
                      <option value=''>All Types</option>
                      {scholarshipTypes.map((type) => (
                        <option key={type.value} value={type.value}>
                          {type.label}
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

                  <div>
                    <label className='block text-sm font-medium mb-1'>
                      Featured
                    </label>
                    <select
                      value={
                        filters.is_featured === undefined
                          ? ''
                          : filters.is_featured.toString()
                      }
                      onChange={(e) =>
                        setFilters((prev) => ({
                          ...prev,
                          is_featured:
                            e.target.value === ''
                              ? undefined
                              : e.target.value === 'true',
                        }))
                      }
                      className='w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500'
                    >
                      <option value=''>All</option>
                      <option value='true'>Featured</option>
                      <option value='false'>Not Featured</option>
                    </select>
                  </div>
                </div>
              </CardContent>
            </Card>
          )}
        </div>
      )}

      {/* Create/Edit Scholarship Form */}
      {(showCreateForm || editingScholarship) && (
        <Card>
          <CardHeader>
            <CardTitle>
              {editingScholarship
                ? 'Edit Scholarship'
                : 'Create New Scholarship'}
            </CardTitle>
          </CardHeader>
          <CardContent className='space-y-4'>
            <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
              <div>
                <Label htmlFor='title'>Scholarship Title *</Label>
                <Input
                  id='title'
                  value={editingScholarship?.title || newScholarship.title}
                  onChange={(e) => {
                    if (editingScholarship) {
                      setEditingScholarship((prev) =>
                        prev ? { ...prev, title: e.target.value } : null
                      );
                    } else {
                      setNewScholarship((prev) => ({
                        ...prev,
                        title: e.target.value,
                      }));
                    }
                  }}
                  placeholder='Enter scholarship title'
                />
              </div>
              <div>
                <Label htmlFor='amount'>Amount *</Label>
                <Input
                  id='amount'
                  type='number'
                  value={editingScholarship?.amount || newScholarship.amount}
                  onChange={(e) => {
                    if (editingScholarship) {
                      setEditingScholarship((prev) =>
                        prev
                          ? { ...prev, amount: parseInt(e.target.value) || 0 }
                          : null
                      );
                    } else {
                      setNewScholarship((prev) => ({
                        ...prev,
                        amount: parseInt(e.target.value) || 0,
                      }));
                    }
                  }}
                  placeholder='10000'
                />
              </div>
            </div>

            <div>
              <Label htmlFor='description'>Description *</Label>
              <Textarea
                id='description'
                value={
                  editingScholarship?.description || newScholarship.description
                }
                onChange={(e) => {
                  if (editingScholarship) {
                    setEditingScholarship((prev) =>
                      prev ? { ...prev, description: e.target.value } : null
                    );
                  } else {
                    setNewScholarship((prev) => ({
                      ...prev,
                      description: e.target.value,
                    }));
                  }
                }}
                placeholder='Describe the scholarship...'
                rows={4}
              />
            </div>

            <div className='grid grid-cols-1 md:grid-cols-3 gap-4'>
              <div>
                <Label htmlFor='scholarship_type'>Scholarship Type *</Label>
                <select
                  id='scholarship_type'
                  value={
                    editingScholarship?.scholarship_type ||
                    newScholarship.scholarship_type
                  }
                  onChange={(e) => {
                    if (editingScholarship) {
                      setEditingScholarship((prev) =>
                        prev
                          ? { ...prev, scholarship_type: e.target.value as any }
                          : null
                      );
                    } else {
                      setNewScholarship((prev) => ({
                        ...prev,
                        scholarship_type: e.target.value as any,
                      }));
                    }
                  }}
                  className='w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500'
                >
                  {scholarshipTypes.map((type) => (
                    <option key={type.value} value={type.value}>
                      {type.label}
                    </option>
                  ))}
                </select>
              </div>
              <div>
                <Label htmlFor='max_recipients'>Max Recipients</Label>
                <Input
                  id='max_recipients'
                  type='number'
                  value={
                    editingScholarship?.max_recipients ||
                    newScholarship.max_recipients
                  }
                  onChange={(e) => {
                    if (editingScholarship) {
                      setEditingScholarship((prev) =>
                        prev
                          ? {
                              ...prev,
                              max_recipients: parseInt(e.target.value) || 0,
                            }
                          : null
                      );
                    } else {
                      setNewScholarship((prev) => ({
                        ...prev,
                        max_recipients: parseInt(e.target.value) || 0,
                      }));
                    }
                  }}
                  placeholder='10'
                />
              </div>
              <div>
                <Label htmlFor='application_deadline'>
                  Application Deadline
                </Label>
                <Input
                  id='application_deadline'
                  type='date'
                  value={
                    editingScholarship?.application_deadline ||
                    newScholarship.application_deadline
                  }
                  onChange={(e) => {
                    if (editingScholarship) {
                      setEditingScholarship((prev) =>
                        prev
                          ? { ...prev, application_deadline: e.target.value }
                          : null
                      );
                    } else {
                      setNewScholarship((prev) => ({
                        ...prev,
                        application_deadline: e.target.value,
                      }));
                    }
                  }}
                />
              </div>
            </div>

            <div className='flex gap-2'>
              <Button
                onClick={
                  editingScholarship
                    ? handleUpdateScholarship
                    : handleCreateScholarship
                }
              >
                {editingScholarship
                  ? 'Update Scholarship'
                  : 'Create Scholarship'}
              </Button>
              <Button
                variant='outline'
                onClick={() => {
                  setShowCreateForm(false);
                  setEditingScholarship(null);
                }}
              >
                Cancel
              </Button>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Tab Content */}
      {activeTab === 'scholarships' && (
        <div className='space-y-4'>
          {/* Scholarship Stats */}
          <div className='grid grid-cols-2 md:grid-cols-5 gap-4'>
            <Card>
              <CardContent className='p-4 text-center'>
                <div className='text-2xl font-bold text-blue-600'>
                  {getScholarshipStats().total}
                </div>
                <div className='text-xs text-muted-foreground'>Total</div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className='p-4 text-center'>
                <div className='text-2xl font-bold text-green-600'>
                  {getScholarshipStats().active}
                </div>
                <div className='text-xs text-muted-foreground'>Active</div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className='p-4 text-center'>
                <div className='text-2xl font-bold text-yellow-600'>
                  {getScholarshipStats().featured}
                </div>
                <div className='text-xs text-muted-foreground'>Featured</div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className='p-4 text-center'>
                <div className='text-2xl font-bold text-purple-600'>
                  {formatCurrency(getScholarshipStats().totalAmount, 'USD')}
                </div>
                <div className='text-xs text-muted-foreground'>Total Value</div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className='p-4 text-center'>
                <div className='text-2xl font-bold text-orange-600'>
                  {getScholarshipStats().totalRecipients}
                </div>
                <div className='text-xs text-muted-foreground'>Recipients</div>
              </CardContent>
            </Card>
          </div>

          {scholarships.length === 0 ? (
            <Card>
              <CardContent className='p-6 text-center'>
                <Award className='w-12 h-12 text-muted-foreground mx-auto mb-4' />
                <h3 className='text-lg font-medium mb-2'>
                  No scholarships found
                </h3>
                <p className='text-muted-foreground'>
                  {user?.role === 'university'
                    ? 'Create your first scholarship to get started'
                    : 'No scholarships available at the moment'}
                </p>
              </CardContent>
            </Card>
          ) : (
            scholarships.map((scholarship) => {
              const Icon = getScholarshipTypeIcon(scholarship.scholarship_type);
              return (
                <Card
                  key={scholarship.id}
                  className='hover:shadow-md transition-shadow'
                >
                  <CardContent className='p-4'>
                    <div className='flex items-start gap-3'>
                      <div className='w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center'>
                        <Icon className='w-6 h-6 text-green-600' />
                      </div>

                      <div className='flex-1 min-w-0'>
                        <div className='flex items-center gap-2 mb-1'>
                          <h4 className='font-medium truncate'>
                            {scholarship.title}
                          </h4>
                          {scholarship.is_featured && (
                            <Star className='w-4 h-4 text-yellow-600' />
                          )}
                          <Badge
                            className={`text-xs ${getScholarshipTypeColor(
                              scholarship.scholarship_type
                            )}`}
                          >
                            {scholarship.scholarship_type}
                          </Badge>
                          {scholarship.renewable && (
                            <Badge variant='outline' className='text-xs'>
                              Renewable
                            </Badge>
                          )}
                        </div>

                        <p className='text-sm text-muted-foreground mb-2 line-clamp-2'>
                          {scholarship.description}
                        </p>

                        <div className='flex items-center gap-4 text-sm text-muted-foreground'>
                          <div className='flex items-center gap-1'>
                            <DollarSign className='w-4 h-4' />
                            <span>
                              {formatCurrency(
                                scholarship.amount,
                                scholarship.currency
                              )}
                            </span>
                          </div>
                          {scholarship.application_deadline && (
                            <div className='flex items-center gap-1'>
                              <Calendar className='w-4 h-4' />
                              <span>
                                Deadline:{' '}
                                {formatDate(scholarship.application_deadline)}
                              </span>
                            </div>
                          )}
                          {scholarship.max_recipients && (
                            <div className='flex items-center gap-1'>
                              <Users className='w-4 h-4' />
                              <span>
                                Max {scholarship.max_recipients} recipients
                              </span>
                            </div>
                          )}
                          {scholarship.current_recipients > 0 && (
                            <div className='flex items-center gap-1'>
                              <UserCheck className='w-4 h-4' />
                              <span>
                                {scholarship.current_recipients} awarded
                              </span>
                            </div>
                          )}
                        </div>
                      </div>

                      <div className='flex flex-col gap-2'>
                        <Button
                          variant='outline'
                          size='sm'
                          onClick={() => onScholarshipSelect?.(scholarship)}
                        >
                          <Eye className='w-4 h-4 mr-1' />
                          View
                        </Button>

                        {user?.role === 'university' && (
                          <>
                            <Button
                              variant='outline'
                              size='sm'
                              onClick={() => setEditingScholarship(scholarship)}
                            >
                              <Edit className='w-4 h-4 mr-1' />
                              Edit
                            </Button>
                            <Button
                              variant='outline'
                              size='sm'
                              onClick={() =>
                                handleDeleteScholarship(scholarship.id)
                              }
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
                  {getApplicationStats().awarded}
                </div>
                <div className='text-xs text-muted-foreground'>Awarded</div>
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
                        {application.scholarship?.title}
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

      {activeTab === 'matching' && (
        <div className='space-y-4'>
          <Card>
            <CardContent className='p-6 text-center'>
              <UserCheck className='w-12 h-12 text-muted-foreground mx-auto mb-4' />
              <h3 className='text-lg font-medium mb-2'>Student Matching</h3>
              <p className='text-muted-foreground'>
                AI-powered student-scholarship matching system coming soon
              </p>
            </CardContent>
          </Card>
        </div>
      )}

      {activeTab === 'analytics' && (
        <div className='space-y-4'>
          <Card>
            <CardContent className='p-6 text-center'>
              <BarChart3 className='w-12 h-12 text-muted-foreground mx-auto mb-4' />
              <h3 className='text-lg font-medium mb-2'>Analytics Dashboard</h3>
              <p className='text-muted-foreground'>
                Scholarship performance metrics and insights coming soon
              </p>
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  );
};
