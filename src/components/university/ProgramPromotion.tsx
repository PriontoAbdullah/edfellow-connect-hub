import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import {
  Share,
  Plus,
  Search,
  Filter,
  Eye,
  Edit,
  Trash2,
  Calendar,
  DollarSign,
  TrendingUp,
  ChevronDown,
  X,
  Target,
  Users,
  Globe,
  Mail,
  Smartphone,
  Monitor,
  MapPin,
  Building2,
  BarChart3,
  ExternalLink,
  Copy,
  CheckCircle,
  AlertCircle,
  Clock,
  Star,
} from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';
import { useToast } from '@/hooks/use-toast';
import {
  getUniversityPrograms,
  createProgramPromotion,
  getProgramPromotions,
  type UniversityProgram,
  type ProgramPromotion,
} from '@/lib/api/university';

interface ProgramPromotionProps {
  compact?: boolean;
  onPromotionSelect?: (promotion: ProgramPromotion) => void;
}

interface PromotionFilters {
  promotion_type?: string;
  is_active?: boolean;
  search?: string;
}

export const ProgramPromotion: React.FC<ProgramPromotionProps> = ({
  compact = false,
  onPromotionSelect,
}) => {
  const { user } = useAuth();
  const { toast } = useToast();
  const [programs, setPrograms] = useState<UniversityProgram[]>([]);
  const [promotions, setPromotions] = useState<ProgramPromotion[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [showFilters, setShowFilters] = useState(false);
  const [filters, setFilters] = useState<PromotionFilters>({});
  const [activeTab, setActiveTab] = useState<'promotions' | 'analytics'>(
    'promotions'
  );
  const [showCreateForm, setShowCreateForm] = useState(false);
  const [editingPromotion, setEditingPromotion] =
    useState<ProgramPromotion | null>(null);
  const [newPromotion, setNewPromotion] = useState({
    program_id: '',
    promotion_type: 'social_media' as const,
    title: '',
    content: '',
    target_audience: [] as string[],
    start_date: '',
    end_date: '',
    budget: 0,
    currency: 'USD',
  });

  const promotionTypes = [
    { value: 'social_media', label: 'Social Media', icon: Share },
    { value: 'email', label: 'Email Campaign', icon: Mail },
    { value: 'website', label: 'Website', icon: Monitor },
    { value: 'event', label: 'Event', icon: MapPin },
    { value: 'partnership', label: 'Partnership', icon: Building2 },
    { value: 'other', label: 'Other', icon: Target },
  ];

  const targetAudiences = [
    'High School Students',
    'Undergraduate Students',
    'Graduate Students',
    'International Students',
    'Working Professionals',
    'Career Changers',
    'Parents',
    'Counselors',
    'General Public',
  ];

  useEffect(() => {
    fetchPrograms();
    fetchPromotions();
  }, [filters, searchTerm, activeTab]);

  const fetchPrograms = async () => {
    if (!user) return;

    try {
      const { data, error } = await getUniversityPrograms({
        university_id: user.id,
        is_active: true,
      });

      if (error) {
        console.error('Error fetching programs:', error);
        return;
      }

      setPrograms(data || []);
    } catch (error) {
      console.error('Error fetching programs:', error);
    }
  };

  const fetchPromotions = async () => {
    setLoading(true);
    try {
      const { data, error } = await getProgramPromotions();

      if (error) {
        toast({
          title: 'Error',
          description: error,
          variant: 'destructive',
        });
        return;
      }

      setPromotions(data || []);
    } catch (error) {
      console.error('Error fetching promotions:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleCreatePromotion = async () => {
    if (!user) return;

    try {
      const { error } = await createProgramPromotion(newPromotion);

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
        description: 'Promotion created successfully!',
      });

      setShowCreateForm(false);
      setNewPromotion({
        program_id: '',
        promotion_type: 'social_media',
        title: '',
        content: '',
        target_audience: [],
        start_date: '',
        end_date: '',
        budget: 0,
        currency: 'USD',
      });
      fetchPromotions();
    } catch (error) {
      toast({
        title: 'Error',
        description: 'Failed to create promotion',
        variant: 'destructive',
      });
    }
  };

  const clearFilters = () => {
    setFilters({});
  };

  const getPromotionTypeIcon = (type: string) => {
    const promotionType = promotionTypes.find((pt) => pt.value === type);
    return promotionType ? promotionType.icon : Target;
  };

  const getPromotionTypeColor = (type: string) => {
    switch (type) {
      case 'social_media':
        return 'bg-blue-100 text-blue-800';
      case 'email':
        return 'bg-green-100 text-green-800';
      case 'website':
        return 'bg-purple-100 text-purple-800';
      case 'event':
        return 'bg-orange-100 text-orange-800';
      case 'partnership':
        return 'bg-indigo-100 text-indigo-800';
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

  const getPromotionStats = () => {
    return {
      total: promotions.length,
      active: promotions.filter((p) => p.is_active).length,
      socialMedia: promotions.filter((p) => p.promotion_type === 'social_media')
        .length,
      email: promotions.filter((p) => p.promotion_type === 'email').length,
      events: promotions.filter((p) => p.promotion_type === 'event').length,
      totalBudget: promotions.reduce((sum, p) => sum + (p.budget || 0), 0),
    };
  };

  const getFilteredPromotions = () => {
    let filtered = promotions;

    if (searchTerm) {
      filtered = filtered.filter(
        (p) =>
          p.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
          p.content.toLowerCase().includes(searchTerm.toLowerCase()) ||
          p.program?.title.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    if (filters.promotion_type) {
      filtered = filtered.filter(
        (p) => p.promotion_type === filters.promotion_type
      );
    }

    if (filters.is_active !== undefined) {
      filtered = filtered.filter((p) => p.is_active === filters.is_active);
    }

    return filtered;
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
          <h3 className='text-sm font-medium'>Promotions</h3>
          <Badge variant='outline'>{promotions.length}</Badge>
        </div>

        <div className='space-y-2'>
          {promotions.slice(0, 3).map((promotion) => {
            const Icon = getPromotionTypeIcon(promotion.promotion_type);
            return (
              <div key={promotion.id} className='p-3 border rounded-lg'>
                <div className='flex items-start gap-2 mb-2'>
                  <div className='w-8 h-8 bg-purple-100 rounded-lg flex items-center justify-center'>
                    <Icon className='w-4 h-4 text-purple-600' />
                  </div>
                  <div className='flex-1 min-w-0'>
                    <p className='text-sm font-medium truncate'>
                      {promotion.title}
                    </p>
                    <p className='text-xs text-muted-foreground'>
                      {promotion.program?.title}
                    </p>
                  </div>
                  <Badge
                    className={`text-xs ${getPromotionTypeColor(
                      promotion.promotion_type
                    )}`}
                  >
                    {promotion.promotion_type}
                  </Badge>
                </div>
                <p className='text-xs text-muted-foreground line-clamp-2'>
                  {promotion.content}
                </p>
              </div>
            );
          })}
        </div>

        {promotions.length > 3 && (
          <Button variant='outline' size='sm' className='w-full'>
            View All ({promotions.length})
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
          <h3 className='text-lg font-semibold'>Program Promotion</h3>
          <p className='text-sm text-muted-foreground'>
            Create and manage program promotion campaigns
          </p>
        </div>
        {user?.role === 'university' && (
          <Button onClick={() => setShowCreateForm(true)}>
            <Plus className='w-4 h-4 mr-2' />
            Create Promotion
          </Button>
        )}
      </div>

      {/* Tabs */}
      <div className='flex gap-2'>
        {(['promotions', 'analytics'] as const).map((tab) => (
          <Button
            key={tab}
            variant={activeTab === tab ? 'default' : 'outline'}
            size='sm'
            onClick={() => setActiveTab(tab)}
          >
            {tab === 'promotions' && <Share className='w-4 h-4 mr-1' />}
            {tab === 'analytics' && <BarChart3 className='w-4 h-4 mr-1' />}
            <span className='capitalize'>{tab}</span>
          </Button>
        ))}
      </div>

      {/* Search and Filters */}
      {activeTab === 'promotions' && (
        <div className='space-y-4'>
          <div className='relative'>
            <Search className='absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-5 h-5' />
            <input
              type='text'
              placeholder='Search promotions by title, content, or program...'
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
                      Promotion Type
                    </label>
                    <select
                      value={filters.promotion_type || ''}
                      onChange={(e) =>
                        setFilters((prev) => ({
                          ...prev,
                          promotion_type: e.target.value || undefined,
                        }))
                      }
                      className='w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500'
                    >
                      <option value=''>All Types</option>
                      {promotionTypes.map((type) => (
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
                </div>
              </CardContent>
            </Card>
          )}
        </div>
      )}

      {/* Create/Edit Promotion Form */}
      {(showCreateForm || editingPromotion) && (
        <Card>
          <CardHeader>
            <CardTitle>
              {editingPromotion ? 'Edit Promotion' : 'Create New Promotion'}
            </CardTitle>
          </CardHeader>
          <CardContent className='space-y-4'>
            <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
              <div>
                <Label htmlFor='program_id'>Program *</Label>
                <select
                  id='program_id'
                  value={
                    editingPromotion?.program_id || newPromotion.program_id
                  }
                  onChange={(e) => {
                    if (editingPromotion) {
                      setEditingPromotion((prev) =>
                        prev ? { ...prev, program_id: e.target.value } : null
                      );
                    } else {
                      setNewPromotion((prev) => ({
                        ...prev,
                        program_id: e.target.value,
                      }));
                    }
                  }}
                  className='w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500'
                >
                  <option value=''>Select program</option>
                  {programs.map((program) => (
                    <option key={program.id} value={program.id}>
                      {program.title}
                    </option>
                  ))}
                </select>
              </div>
              <div>
                <Label htmlFor='promotion_type'>Promotion Type *</Label>
                <select
                  id='promotion_type'
                  value={
                    editingPromotion?.promotion_type ||
                    newPromotion.promotion_type
                  }
                  onChange={(e) => {
                    if (editingPromotion) {
                      setEditingPromotion((prev) =>
                        prev
                          ? { ...prev, promotion_type: e.target.value as any }
                          : null
                      );
                    } else {
                      setNewPromotion((prev) => ({
                        ...prev,
                        promotion_type: e.target.value as any,
                      }));
                    }
                  }}
                  className='w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500'
                >
                  {promotionTypes.map((type) => (
                    <option key={type.value} value={type.value}>
                      {type.label}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            <div>
              <Label htmlFor='title'>Promotion Title *</Label>
              <Input
                id='title'
                value={editingPromotion?.title || newPromotion.title}
                onChange={(e) => {
                  if (editingPromotion) {
                    setEditingPromotion((prev) =>
                      prev ? { ...prev, title: e.target.value } : null
                    );
                  } else {
                    setNewPromotion((prev) => ({
                      ...prev,
                      title: e.target.value,
                    }));
                  }
                }}
                placeholder='Enter promotion title'
              />
            </div>

            <div>
              <Label htmlFor='content'>Content *</Label>
              <Textarea
                id='content'
                value={editingPromotion?.content || newPromotion.content}
                onChange={(e) => {
                  if (editingPromotion) {
                    setEditingPromotion((prev) =>
                      prev ? { ...prev, content: e.target.value } : null
                    );
                  } else {
                    setNewPromotion((prev) => ({
                      ...prev,
                      content: e.target.value,
                    }));
                  }
                }}
                placeholder='Enter promotion content...'
                rows={4}
              />
            </div>

            <div className='grid grid-cols-1 md:grid-cols-3 gap-4'>
              <div>
                <Label htmlFor='start_date'>Start Date</Label>
                <Input
                  id='start_date'
                  type='date'
                  value={
                    editingPromotion?.start_date || newPromotion.start_date
                  }
                  onChange={(e) => {
                    if (editingPromotion) {
                      setEditingPromotion((prev) =>
                        prev ? { ...prev, start_date: e.target.value } : null
                      );
                    } else {
                      setNewPromotion((prev) => ({
                        ...prev,
                        start_date: e.target.value,
                      }));
                    }
                  }}
                />
              </div>
              <div>
                <Label htmlFor='end_date'>End Date</Label>
                <Input
                  id='end_date'
                  type='date'
                  value={editingPromotion?.end_date || newPromotion.end_date}
                  onChange={(e) => {
                    if (editingPromotion) {
                      setEditingPromotion((prev) =>
                        prev ? { ...prev, end_date: e.target.value } : null
                      );
                    } else {
                      setNewPromotion((prev) => ({
                        ...prev,
                        end_date: e.target.value,
                      }));
                    }
                  }}
                />
              </div>
              <div>
                <Label htmlFor='budget'>Budget</Label>
                <Input
                  id='budget'
                  type='number'
                  value={editingPromotion?.budget || newPromotion.budget}
                  onChange={(e) => {
                    if (editingPromotion) {
                      setEditingPromotion((prev) =>
                        prev
                          ? { ...prev, budget: parseInt(e.target.value) || 0 }
                          : null
                      );
                    } else {
                      setNewPromotion((prev) => ({
                        ...prev,
                        budget: parseInt(e.target.value) || 0,
                      }));
                    }
                  }}
                  placeholder='1000'
                />
              </div>
            </div>

            <div className='flex gap-2'>
              <Button
                onClick={
                  editingPromotion
                    ? handleCreatePromotion
                    : handleCreatePromotion
                }
              >
                {editingPromotion ? 'Update Promotion' : 'Create Promotion'}
              </Button>
              <Button
                variant='outline'
                onClick={() => {
                  setShowCreateForm(false);
                  setEditingPromotion(null);
                }}
              >
                Cancel
              </Button>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Tab Content */}
      {activeTab === 'promotions' && (
        <div className='space-y-4'>
          {/* Promotion Stats */}
          <div className='grid grid-cols-2 md:grid-cols-6 gap-4'>
            <Card>
              <CardContent className='p-4 text-center'>
                <div className='text-2xl font-bold text-blue-600'>
                  {getPromotionStats().total}
                </div>
                <div className='text-xs text-muted-foreground'>Total</div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className='p-4 text-center'>
                <div className='text-2xl font-bold text-green-600'>
                  {getPromotionStats().active}
                </div>
                <div className='text-xs text-muted-foreground'>Active</div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className='p-4 text-center'>
                <div className='text-2xl font-bold text-purple-600'>
                  {getPromotionStats().socialMedia}
                </div>
                <div className='text-xs text-muted-foreground'>
                  Social Media
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className='p-4 text-center'>
                <div className='text-2xl font-bold text-orange-600'>
                  {getPromotionStats().email}
                </div>
                <div className='text-xs text-muted-foreground'>Email</div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className='p-4 text-center'>
                <div className='text-2xl font-bold text-indigo-600'>
                  {getPromotionStats().events}
                </div>
                <div className='text-xs text-muted-foreground'>Events</div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className='p-4 text-center'>
                <div className='text-2xl font-bold text-yellow-600'>
                  {formatCurrency(getPromotionStats().totalBudget, 'USD')}
                </div>
                <div className='text-xs text-muted-foreground'>
                  Total Budget
                </div>
              </CardContent>
            </Card>
          </div>

          {getFilteredPromotions().length === 0 ? (
            <Card>
              <CardContent className='p-6 text-center'>
                <Share className='w-12 h-12 text-muted-foreground mx-auto mb-4' />
                <h3 className='text-lg font-medium mb-2'>
                  No promotions found
                </h3>
                <p className='text-muted-foreground'>
                  {user?.role === 'university'
                    ? 'Create your first promotion campaign to get started'
                    : 'No promotions available at the moment'}
                </p>
              </CardContent>
            </Card>
          ) : (
            getFilteredPromotions().map((promotion) => {
              const Icon = getPromotionTypeIcon(promotion.promotion_type);
              return (
                <Card
                  key={promotion.id}
                  className='hover:shadow-md transition-shadow'
                >
                  <CardContent className='p-4'>
                    <div className='flex items-start gap-3'>
                      <div className='w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center'>
                        <Icon className='w-6 h-6 text-purple-600' />
                      </div>

                      <div className='flex-1 min-w-0'>
                        <div className='flex items-center gap-2 mb-1'>
                          <h4 className='font-medium truncate'>
                            {promotion.title}
                          </h4>
                          <Badge
                            className={`text-xs ${getPromotionTypeColor(
                              promotion.promotion_type
                            )}`}
                          >
                            {promotion.promotion_type}
                          </Badge>
                          {promotion.is_active && (
                            <Badge
                              variant='outline'
                              className='text-xs text-green-600'
                            >
                              Active
                            </Badge>
                          )}
                        </div>

                        <p className='text-sm text-muted-foreground mb-2'>
                          <strong>Program:</strong> {promotion.program?.title}
                        </p>

                        <p className='text-sm text-muted-foreground mb-2 line-clamp-2'>
                          {promotion.content}
                        </p>

                        <div className='flex items-center gap-4 text-sm text-muted-foreground'>
                          {promotion.start_date && (
                            <div className='flex items-center gap-1'>
                              <Calendar className='w-4 h-4' />
                              <span>
                                Start: {formatDate(promotion.start_date)}
                              </span>
                            </div>
                          )}
                          {promotion.end_date && (
                            <div className='flex items-center gap-1'>
                              <Calendar className='w-4 h-4' />
                              <span>End: {formatDate(promotion.end_date)}</span>
                            </div>
                          )}
                          {promotion.budget && (
                            <div className='flex items-center gap-1'>
                              <DollarSign className='w-4 h-4' />
                              <span>
                                {formatCurrency(
                                  promotion.budget,
                                  promotion.currency
                                )}
                              </span>
                            </div>
                          )}
                          {promotion.target_audience &&
                            promotion.target_audience.length > 0 && (
                              <div className='flex items-center gap-1'>
                                <Target className='w-4 h-4' />
                                <span>
                                  {promotion.target_audience.length} audiences
                                </span>
                              </div>
                            )}
                        </div>
                      </div>

                      <div className='flex flex-col gap-2'>
                        <Button
                          variant='outline'
                          size='sm'
                          onClick={() => onPromotionSelect?.(promotion)}
                        >
                          <Eye className='w-4 h-4 mr-1' />
                          View
                        </Button>

                        {user?.role === 'university' && (
                          <>
                            <Button
                              variant='outline'
                              size='sm'
                              onClick={() => setEditingPromotion(promotion)}
                            >
                              <Edit className='w-4 h-4 mr-1' />
                              Edit
                            </Button>
                            <Button variant='outline' size='sm'>
                              <Share className='w-4 h-4 mr-1' />
                              Share
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

      {activeTab === 'analytics' && (
        <div className='space-y-4'>
          <Card>
            <CardContent className='p-6 text-center'>
              <BarChart3 className='w-12 h-12 text-muted-foreground mx-auto mb-4' />
              <h3 className='text-lg font-medium mb-2'>Promotion Analytics</h3>
              <p className='text-muted-foreground'>
                Campaign performance metrics and insights coming soon
              </p>
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  );
};
