import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import {
  Search,
  Filter,
  Star,
  Users,
  Calendar,
  DollarSign,
  BookOpen,
  Microscope,
  TrendingUp,
  Heart,
  HeartOff,
  Eye,
  Bookmark,
  BookmarkCheck,
  ChevronDown,
  X,
  Plus,
  Clock,
  Target,
  Award,
  MapPin,
  Building2,
} from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';
import { useToast } from '@/hooks/use-toast';
import {
  getResearchProjects,
  createResearchProject,
  applyToResearchProject,
  saveResearchProject,
  unsaveResearchProject,
  getSavedResearchProjects,
  type ResearchProject,
} from '@/lib/api/jobs';

interface ResearchAssistantPortalProps {
  compact?: boolean;
  onProjectSelect?: (project: ResearchProject) => void;
}

interface ProjectFilters {
  research_area?: string;
  created_by?: string;
  is_public?: boolean;
  search?: string;
  funding_min?: number;
  funding_max?: number;
  duration_min?: number;
  duration_max?: number;
}

export const ResearchAssistantPortal: React.FC<
  ResearchAssistantPortalProps
> = ({ compact = false, onProjectSelect }) => {
  const { user } = useAuth();
  const { toast } = useToast();
  const [projects, setProjects] = useState<ResearchProject[]>([]);
  const [savedProjects, setSavedProjects] = useState<ResearchProject[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [showFilters, setShowFilters] = useState(false);
  const [filters, setFilters] = useState<ProjectFilters>({});
  const [savingProjects, setSavingProjects] = useState<Set<string>>(new Set());
  const [applyingProjects, setApplyingProjects] = useState<Set<string>>(
    new Set()
  );
  const [activeTab, setActiveTab] = useState<'all' | 'saved' | 'my-projects'>(
    'all'
  );
  const [showCreateForm, setShowCreateForm] = useState(false);
  const [newProject, setNewProject] = useState({
    title: '',
    description: '',
    abstract: '',
    research_area: '',
    methodology: '',
    expected_outcomes: '',
    duration_months: 0,
    start_date: '',
    end_date: '',
    funding_amount: 0,
    currency: 'USD',
    funding_source: '',
    requirements: [] as string[],
    skills_required: [] as string[],
    deliverables: [] as string[],
    is_public: true,
  });

  const researchAreas = [
    'Computer Science',
    'Artificial Intelligence',
    'Machine Learning',
    'Data Science',
    'Biology',
    'Chemistry',
    'Physics',
    'Mathematics',
    'Engineering',
    'Psychology',
    'Sociology',
    'Economics',
    'Medicine',
    'Environmental Science',
    'Other',
  ];

  useEffect(() => {
    fetchProjects();
    if (user) {
      fetchSavedProjects();
    }
  }, [user, filters, searchTerm, activeTab]);

  const fetchProjects = async () => {
    setLoading(true);
    try {
      const searchFilters: any = { ...filters };

      if (searchTerm) {
        searchFilters.search = searchTerm;
      }

      if (activeTab === 'my-projects' && user) {
        searchFilters.created_by = user.id;
      }

      const { data, error } = await getResearchProjects(searchFilters);

      if (error) {
        toast({
          title: 'Error',
          description: error,
          variant: 'destructive',
        });
        return;
      }

      setProjects(data || []);
    } catch (error) {
      console.error('Error fetching research projects:', error);
    } finally {
      setLoading(false);
    }
  };

  const fetchSavedProjects = async () => {
    if (!user) return;

    try {
      const { data, error } = await getSavedResearchProjects();

      if (error) {
        console.error('Error fetching saved projects:', error);
        return;
      }

      setSavedProjects(data || []);
    } catch (error) {
      console.error('Error fetching saved projects:', error);
    }
  };

  const handleSaveProject = async (projectId: string) => {
    if (!user) return;

    setSavingProjects((prev) => new Set(prev).add(projectId));

    try {
      const { error } = await saveResearchProject(projectId);

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
        description: 'Project saved successfully!',
      });

      fetchSavedProjects();
    } catch (error) {
      toast({
        title: 'Error',
        description: 'Failed to save project',
        variant: 'destructive',
      });
    } finally {
      setSavingProjects((prev) => {
        const newSet = new Set(prev);
        newSet.delete(projectId);
        return newSet;
      });
    }
  };

  const handleUnsaveProject = async (projectId: string) => {
    if (!user) return;

    setSavingProjects((prev) => new Set(prev).add(projectId));

    try {
      const { error } = await unsaveResearchProject(projectId);

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
        description: 'Project removed from saved',
      });

      fetchSavedProjects();
    } catch (error) {
      toast({
        title: 'Error',
        description: 'Failed to unsave project',
        variant: 'destructive',
      });
    } finally {
      setSavingProjects((prev) => {
        const newSet = new Set(prev);
        newSet.delete(projectId);
        return newSet;
      });
    }
  };

  const handleApplyToProject = async (projectId: string) => {
    if (!user) return;

    setApplyingProjects((prev) => new Set(prev).add(projectId));

    try {
      const { error } = await applyToResearchProject(projectId, {
        motivation:
          'I am interested in this research project and would like to contribute to the work.',
        relevant_experience: 'I have relevant experience in this field.',
        research_interests: ['Research', 'Innovation'],
        availability_hours: 20,
      });

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
        description: 'Application submitted successfully!',
      });
    } catch (error) {
      toast({
        title: 'Error',
        description: 'Failed to apply to project',
        variant: 'destructive',
      });
    } finally {
      setApplyingProjects((prev) => {
        const newSet = new Set(prev);
        newSet.delete(projectId);
        return newSet;
      });
    }
  };

  const handleCreateProject = async () => {
    if (!user) return;

    try {
      const { error } = await createResearchProject(newProject);

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
        description: 'Research project created successfully!',
      });

      setShowCreateForm(false);
      setNewProject({
        title: '',
        description: '',
        abstract: '',
        research_area: '',
        methodology: '',
        expected_outcomes: '',
        duration_months: 0,
        start_date: '',
        end_date: '',
        funding_amount: 0,
        currency: 'USD',
        funding_source: '',
        requirements: [],
        skills_required: [],
        deliverables: [],
        is_public: true,
      });
      fetchProjects();
    } catch (error) {
      toast({
        title: 'Error',
        description: 'Failed to create project',
        variant: 'destructive',
      });
    }
  };

  const clearFilters = () => {
    setFilters({});
  };

  const isProjectSaved = (projectId: string) => {
    return savedProjects.some((project) => project.id === projectId);
  };

  const getResearchAreaColor = (area: string) => {
    const colors = [
      'bg-blue-100 text-blue-800',
      'bg-green-100 text-green-800',
      'bg-purple-100 text-purple-800',
      'bg-orange-100 text-orange-800',
      'bg-red-100 text-red-800',
      'bg-yellow-100 text-yellow-800',
      'bg-pink-100 text-pink-800',
      'bg-indigo-100 text-indigo-800',
    ];
    return colors[area.length % colors.length];
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    });
  };

  const formatFunding = (project: ResearchProject) => {
    if (!project.funding_amount) return 'Funding not specified';

    const amount = project.funding_amount.toLocaleString();
    const currency = project.currency || 'USD';

    return `${currency} ${amount}`;
  };

  const getDisplayProjects = () => {
    switch (activeTab) {
      case 'saved':
        return savedProjects;
      case 'my-projects':
        return projects.filter((project) => project.created_by === user?.id);
      default:
        return projects;
    }
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
          <h3 className='text-sm font-medium'>Research Projects</h3>
          <Badge variant='outline'>{getDisplayProjects().length}</Badge>
        </div>

        <div className='space-y-2'>
          {getDisplayProjects()
            .slice(0, 3)
            .map((project) => (
              <div key={project.id} className='p-3 border rounded-lg'>
                <div className='flex items-start gap-2 mb-2'>
                  <div className='w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center'>
                    <Microscope className='w-4 h-4 text-blue-600' />
                  </div>
                  <div className='flex-1 min-w-0'>
                    <p className='text-sm font-medium truncate'>
                      {project.title}
                    </p>
                    <p className='text-xs text-muted-foreground'>
                      {project.creator?.display_name}
                    </p>
                  </div>
                  <Badge
                    className={`text-xs ${getResearchAreaColor(
                      project.research_area
                    )}`}
                  >
                    {project.research_area}
                  </Badge>
                </div>
                <p className='text-xs text-muted-foreground line-clamp-2'>
                  {project.description}
                </p>
              </div>
            ))}
        </div>

        {getDisplayProjects().length > 3 && (
          <Button variant='outline' size='sm' className='w-full'>
            View All ({getDisplayProjects().length})
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
          <h3 className='text-lg font-semibold'>Research Assistant Portal</h3>
          <p className='text-sm text-muted-foreground'>
            Discover research opportunities and collaborate with professors
          </p>
        </div>
        {user && user.role === 'professor' && (
          <Button onClick={() => setShowCreateForm(true)}>
            <Plus className='w-4 h-4 mr-2' />
            Create Project
          </Button>
        )}
      </div>

      {/* Tabs */}
      <div className='flex gap-2'>
        {(['all', 'saved', 'my-projects'] as const).map((tab) => (
          <Button
            key={tab}
            variant={activeTab === tab ? 'default' : 'outline'}
            size='sm'
            onClick={() => setActiveTab(tab)}
          >
            {tab === 'all' && <Microscope className='w-4 h-4 mr-1' />}
            {tab === 'saved' && <Bookmark className='w-4 h-4 mr-1' />}
            {tab === 'my-projects' && <Users className='w-4 h-4 mr-1' />}
            <span className='capitalize'>{tab.replace('-', ' ')}</span>
          </Button>
        ))}
      </div>

      {/* Search and Filters */}
      <div className='space-y-4'>
        <div className='relative'>
          <Search className='absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-5 h-5' />
          <input
            type='text'
            placeholder='Search research projects by title, area, or keywords...'
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

          {Object.values(filters).some((f) => f !== undefined && f !== '') && (
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
                    Research Area
                  </label>
                  <select
                    value={filters.research_area || ''}
                    onChange={(e) =>
                      setFilters((prev) => ({
                        ...prev,
                        research_area: e.target.value || undefined,
                      }))
                    }
                    className='w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500'
                  >
                    <option value=''>All Areas</option>
                    {researchAreas.map((area) => (
                      <option key={area} value={area}>
                        {area}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className='block text-sm font-medium mb-1'>
                    Min Funding
                  </label>
                  <input
                    type='number'
                    value={filters.funding_min || ''}
                    onChange={(e) =>
                      setFilters((prev) => ({
                        ...prev,
                        funding_min: parseInt(e.target.value) || undefined,
                      }))
                    }
                    placeholder='10000'
                    className='w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500'
                  />
                </div>

                <div>
                  <label className='block text-sm font-medium mb-1'>
                    Max Funding
                  </label>
                  <input
                    type='number'
                    value={filters.funding_max || ''}
                    onChange={(e) =>
                      setFilters((prev) => ({
                        ...prev,
                        funding_max: parseInt(e.target.value) || undefined,
                      }))
                    }
                    placeholder='100000'
                    className='w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500'
                  />
                </div>

                <div>
                  <label className='block text-sm font-medium mb-1'>
                    Min Duration (months)
                  </label>
                  <input
                    type='number'
                    value={filters.duration_min || ''}
                    onChange={(e) =>
                      setFilters((prev) => ({
                        ...prev,
                        duration_min: parseInt(e.target.value) || undefined,
                      }))
                    }
                    placeholder='6'
                    className='w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500'
                  />
                </div>

                <div>
                  <label className='block text-sm font-medium mb-1'>
                    Max Duration (months)
                  </label>
                  <input
                    type='number'
                    value={filters.duration_max || ''}
                    onChange={(e) =>
                      setFilters((prev) => ({
                        ...prev,
                        duration_max: parseInt(e.target.value) || undefined,
                      }))
                    }
                    placeholder='24'
                    className='w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500'
                  />
                </div>
              </div>
            </CardContent>
          </Card>
        )}
      </div>

      {/* Create Project Form */}
      {showCreateForm && (
        <Card>
          <CardHeader>
            <CardTitle>Create Research Project</CardTitle>
          </CardHeader>
          <CardContent className='space-y-4'>
            <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
              <div>
                <Label htmlFor='title'>Project Title *</Label>
                <Input
                  id='title'
                  value={newProject.title}
                  onChange={(e) =>
                    setNewProject((prev) => ({
                      ...prev,
                      title: e.target.value,
                    }))
                  }
                  placeholder='Enter project title'
                />
              </div>
              <div>
                <Label htmlFor='research_area'>Research Area *</Label>
                <select
                  id='research_area'
                  value={newProject.research_area}
                  onChange={(e) =>
                    setNewProject((prev) => ({
                      ...prev,
                      research_area: e.target.value,
                    }))
                  }
                  className='w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500'
                >
                  <option value=''>Select research area</option>
                  {researchAreas.map((area) => (
                    <option key={area} value={area}>
                      {area}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            <div>
              <Label htmlFor='description'>Description *</Label>
              <Textarea
                id='description'
                value={newProject.description}
                onChange={(e) =>
                  setNewProject((prev) => ({
                    ...prev,
                    description: e.target.value,
                  }))
                }
                placeholder='Describe the research project...'
                rows={4}
              />
            </div>

            <div className='grid grid-cols-1 md:grid-cols-3 gap-4'>
              <div>
                <Label htmlFor='duration_months'>Duration (months)</Label>
                <Input
                  id='duration_months'
                  type='number'
                  value={newProject.duration_months}
                  onChange={(e) =>
                    setNewProject((prev) => ({
                      ...prev,
                      duration_months: parseInt(e.target.value) || 0,
                    }))
                  }
                  placeholder='12'
                />
              </div>
              <div>
                <Label htmlFor='funding_amount'>Funding Amount</Label>
                <Input
                  id='funding_amount'
                  type='number'
                  value={newProject.funding_amount}
                  onChange={(e) =>
                    setNewProject((prev) => ({
                      ...prev,
                      funding_amount: parseInt(e.target.value) || 0,
                    }))
                  }
                  placeholder='50000'
                />
              </div>
              <div>
                <Label htmlFor='currency'>Currency</Label>
                <select
                  id='currency'
                  value={newProject.currency}
                  onChange={(e) =>
                    setNewProject((prev) => ({
                      ...prev,
                      currency: e.target.value,
                    }))
                  }
                  className='w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500'
                >
                  <option value='USD'>USD</option>
                  <option value='EUR'>EUR</option>
                  <option value='GBP'>GBP</option>
                </select>
              </div>
            </div>

            <div className='flex gap-2'>
              <Button onClick={handleCreateProject}>Create Project</Button>
              <Button
                variant='outline'
                onClick={() => setShowCreateForm(false)}
              >
                Cancel
              </Button>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Projects List */}
      {getDisplayProjects().length === 0 ? (
        <Card>
          <CardContent className='p-6 text-center'>
            <Microscope className='w-12 h-12 text-muted-foreground mx-auto mb-4' />
            <h3 className='text-lg font-medium mb-2'>
              No research projects found
            </h3>
            <p className='text-muted-foreground'>
              {activeTab === 'saved'
                ? "You haven't saved any projects yet"
                : activeTab === 'my-projects'
                ? "You haven't created any projects yet"
                : 'Try adjusting your search criteria or filters'}
            </p>
          </CardContent>
        </Card>
      ) : (
        <div className='space-y-4'>
          {getDisplayProjects().map((project) => (
            <Card
              key={project.id}
              className='hover:shadow-md transition-shadow'
            >
              <CardContent className='p-4'>
                <div className='flex items-start gap-3'>
                  <div className='w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center'>
                    <Microscope className='w-6 h-6 text-blue-600' />
                  </div>

                  <div className='flex-1 min-w-0'>
                    <div className='flex items-center gap-2 mb-1'>
                      <h4 className='font-medium truncate'>{project.title}</h4>
                      {project.is_public && (
                        <Badge variant='outline' className='text-xs'>
                          Public
                        </Badge>
                      )}
                    </div>

                    <div className='flex items-center gap-2 text-sm text-muted-foreground mb-2'>
                      <span>{project.creator?.display_name}</span>
                      <Badge
                        className={`text-xs ${getResearchAreaColor(
                          project.research_area
                        )}`}
                      >
                        {project.research_area}
                      </Badge>
                      {project.duration_months && (
                        <Badge variant='outline' className='text-xs'>
                          <Clock className='w-3 h-3 mr-1' />
                          {project.duration_months} months
                        </Badge>
                      )}
                    </div>

                    <p className='text-sm text-muted-foreground mb-3 line-clamp-2'>
                      {project.description}
                    </p>

                    <div className='flex items-center gap-4 text-sm text-muted-foreground'>
                      <div className='flex items-center gap-1'>
                        <DollarSign className='w-4 h-4' />
                        <span>{formatFunding(project)}</span>
                      </div>
                      <div className='flex items-center gap-1'>
                        <Calendar className='w-4 h-4' />
                        <span>{formatDate(project.created_at)}</span>
                      </div>
                      {project.application_count && (
                        <div className='flex items-center gap-1'>
                          <Users className='w-4 h-4' />
                          <span>{project.application_count} applications</span>
                        </div>
                      )}
                      {project.skills_required &&
                        project.skills_required.length > 0 && (
                          <div className='flex items-center gap-1'>
                            <Target className='w-4 h-4' />
                            <span>
                              {project.skills_required.length} skills required
                            </span>
                          </div>
                        )}
                    </div>
                  </div>

                  <div className='flex flex-col gap-2'>
                    {user && (
                      <Button
                        variant='ghost'
                        size='sm'
                        onClick={() =>
                          isProjectSaved(project.id)
                            ? handleUnsaveProject(project.id)
                            : handleSaveProject(project.id)
                        }
                        disabled={savingProjects.has(project.id)}
                      >
                        {isProjectSaved(project.id) ? (
                          <BookmarkCheck className='w-4 h-4 text-blue-600' />
                        ) : (
                          <Bookmark className='w-4 h-4' />
                        )}
                      </Button>
                    )}

                    {user &&
                      user.role === 'student' &&
                      project.created_by !== user.id && (
                        <Button
                          variant='outline'
                          size='sm'
                          onClick={() => handleApplyToProject(project.id)}
                          disabled={applyingProjects.has(project.id)}
                        >
                          {applyingProjects.has(project.id)
                            ? 'Applying...'
                            : 'Apply'}
                        </Button>
                      )}

                    <Button
                      variant='outline'
                      size='sm'
                      onClick={() => onProjectSelect?.(project)}
                    >
                      <Eye className='w-4 h-4 mr-1' />
                      View
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
};
