import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import {
  Search,
  Filter,
  MapPin,
  DollarSign,
  Calendar,
  Users,
  GraduationCap,
  Star,
  Heart,
  HeartOff,
  Briefcase,
  Clock,
  Globe,
  Building2,
  Eye,
  Bookmark,
  BookmarkCheck,
  ChevronDown,
  X,
} from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';
import { useToast } from '@/hooks/use-toast';
import {
  getJobPostings,
  saveJob,
  unsaveJob,
  getSavedJobs,
  type JobPosting,
} from '@/lib/api/jobs';

interface JobSearchProps {
  compact?: boolean;
  onJobSelect?: (job: JobPosting) => void;
}

interface SearchFilters {
  category?: string;
  job_type?: string;
  location?: string;
  experience_level?: string;
  education_level?: string;
  is_remote?: boolean;
  salary_min?: number;
  salary_max?: number;
  currency?: string;
}

export const JobSearch: React.FC<JobSearchProps> = ({
  compact = false,
  onJobSelect,
}) => {
  const { user } = useAuth();
  const { toast } = useToast();
  const [jobs, setJobs] = useState<JobPosting[]>([]);
  const [savedJobs, setSavedJobs] = useState<JobPosting[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [showFilters, setShowFilters] = useState(false);
  const [filters, setFilters] = useState<SearchFilters>({});
  const [savingJobs, setSavingJobs] = useState<Set<string>>(new Set());
  const [activeTab, setActiveTab] = useState<'all' | 'saved' | 'recommended'>(
    'all'
  );

  useEffect(() => {
    fetchJobs();
    if (user) {
      fetchSavedJobs();
    }
  }, [user, filters, searchTerm, activeTab]);

  const fetchJobs = async () => {
    setLoading(true);
    try {
      const searchFilters: any = { ...filters };

      if (searchTerm) {
        searchFilters.search = searchTerm;
      }

      const { data, error } = await getJobPostings(searchFilters);

      if (error) {
        toast({
          title: 'Error',
          description: error,
          variant: 'destructive',
        });
        return;
      }

      setJobs(data || []);
    } catch (error) {
      console.error('Error fetching jobs:', error);
    } finally {
      setLoading(false);
    }
  };

  const fetchSavedJobs = async () => {
    if (!user) return;

    try {
      const { data, error } = await getSavedJobs();

      if (error) {
        console.error('Error fetching saved jobs:', error);
        return;
      }

      setSavedJobs(data || []);
    } catch (error) {
      console.error('Error fetching saved jobs:', error);
    }
  };

  const handleSaveJob = async (jobId: string) => {
    if (!user) return;

    setSavingJobs((prev) => new Set(prev).add(jobId));

    try {
      const { error } = await saveJob(jobId);

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
        description: 'Job saved successfully!',
      });

      fetchSavedJobs();
    } catch (error) {
      toast({
        title: 'Error',
        description: 'Failed to save job',
        variant: 'destructive',
      });
    } finally {
      setSavingJobs((prev) => {
        const newSet = new Set(prev);
        newSet.delete(jobId);
        return newSet;
      });
    }
  };

  const handleUnsaveJob = async (jobId: string) => {
    if (!user) return;

    setSavingJobs((prev) => new Set(prev).add(jobId));

    try {
      const { error } = await unsaveJob(jobId);

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
        description: 'Job removed from saved',
      });

      fetchSavedJobs();
    } catch (error) {
      toast({
        title: 'Error',
        description: 'Failed to unsave job',
        variant: 'destructive',
      });
    } finally {
      setSavingJobs((prev) => {
        const newSet = new Set(prev);
        newSet.delete(jobId);
        return newSet;
      });
    }
  };

  const clearFilters = () => {
    setFilters({});
  };

  const isJobSaved = (jobId: string) => {
    return savedJobs.some((job) => job.id === jobId);
  };

  const getJobTypeIcon = (type: string) => {
    switch (type) {
      case 'full-time':
        return <Briefcase className='w-4 h-4' />;
      case 'part-time':
        return <Clock className='w-4 h-4' />;
      case 'contract':
        return <Calendar className='w-4 h-4' />;
      case 'internship':
        return <GraduationCap className='w-4 h-4' />;
      case 'research-assistant':
        return <Star className='w-4 h-4' />;
      case 'teaching-assistant':
        return <Users className='w-4 h-4' />;
      default:
        return <Briefcase className='w-4 h-4' />;
    }
  };

  const getJobTypeColor = (type: string) => {
    switch (type) {
      case 'full-time':
        return 'bg-blue-100 text-blue-800';
      case 'part-time':
        return 'bg-green-100 text-green-800';
      case 'contract':
        return 'bg-purple-100 text-purple-800';
      case 'internship':
        return 'bg-yellow-100 text-yellow-800';
      case 'research-assistant':
        return 'bg-orange-100 text-orange-800';
      case 'teaching-assistant':
        return 'bg-pink-100 text-pink-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getCategoryColor = (category: string) => {
    switch (category) {
      case 'academic':
        return 'bg-blue-100 text-blue-800';
      case 'research':
        return 'bg-green-100 text-green-800';
      case 'teaching':
        return 'bg-purple-100 text-purple-800';
      case 'administrative':
        return 'bg-orange-100 text-orange-800';
      case 'technical':
        return 'bg-red-100 text-red-800';
      case 'other':
        return 'bg-gray-100 text-gray-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const formatSalary = (job: JobPosting) => {
    if (!job.salary_min && !job.salary_max) return 'Salary not specified';

    const min = job.salary_min?.toLocaleString() || '0';
    const max = job.salary_max?.toLocaleString() || '0';
    const currency = job.currency || 'USD';

    if (job.salary_min && job.salary_max) {
      return `${currency} ${min} - ${max}`;
    } else if (job.salary_min) {
      return `${currency} ${min}+`;
    } else if (job.salary_max) {
      return `Up to ${currency} ${max}`;
    }

    return 'Salary not specified';
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    });
  };

  const getDisplayJobs = () => {
    switch (activeTab) {
      case 'saved':
        return savedJobs;
      case 'recommended':
        // Filter jobs based on user profile - simplified for now
        return jobs.filter(
          (job) =>
            user?.role === 'student' &&
            (job.job_type === 'research-assistant' ||
              job.job_type === 'teaching-assistant')
        );
      default:
        return jobs;
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
          <h3 className='text-sm font-medium'>Job Opportunities</h3>
          <Badge variant='outline'>{getDisplayJobs().length}</Badge>
        </div>

        <div className='space-y-2'>
          {getDisplayJobs()
            .slice(0, 3)
            .map((job) => (
              <div key={job.id} className='p-3 border rounded-lg'>
                <div className='flex items-start gap-2 mb-2'>
                  <Avatar className='w-8 h-8'>
                    <AvatarImage src={job.company_logo} />
                    <AvatarFallback>
                      {job.company_name.charAt(0)}
                    </AvatarFallback>
                  </Avatar>
                  <div className='flex-1 min-w-0'>
                    <p className='text-sm font-medium truncate'>{job.title}</p>
                    <p className='text-xs text-muted-foreground'>
                      {job.company_name}
                    </p>
                  </div>
                  <Badge className={`text-xs ${getJobTypeColor(job.job_type)}`}>
                    {getJobTypeIcon(job.job_type)}
                  </Badge>
                </div>
                <p className='text-xs text-muted-foreground line-clamp-2'>
                  {job.description}
                </p>
              </div>
            ))}
        </div>

        {getDisplayJobs().length > 3 && (
          <Button variant='outline' size='sm' className='w-full'>
            View All ({getDisplayJobs().length})
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
          <h3 className='text-lg font-semibold'>Job Opportunities</h3>
          <p className='text-sm text-muted-foreground'>
            Find your next academic or research position
          </p>
        </div>
        {user && (user.role === 'professor' || user.role === 'university') && (
          <Button>
            <Briefcase className='w-4 h-4 mr-2' />
            Post Job
          </Button>
        )}
      </div>

      {/* Tabs */}
      <div className='flex gap-2'>
        {(['all', 'saved', 'recommended'] as const).map((tab) => (
          <Button
            key={tab}
            variant={activeTab === tab ? 'default' : 'outline'}
            size='sm'
            onClick={() => setActiveTab(tab)}
          >
            {tab === 'all' && <Briefcase className='w-4 h-4 mr-1' />}
            {tab === 'saved' && <Bookmark className='w-4 h-4 mr-1' />}
            {tab === 'recommended' && <Star className='w-4 h-4 mr-1' />}
            <span className='capitalize'>{tab}</span>
          </Button>
        ))}
      </div>

      {/* Search and Filters */}
      <div className='space-y-4'>
        <div className='relative'>
          <Search className='absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-5 h-5' />
          <input
            type='text'
            placeholder='Search jobs by title, company, or keywords...'
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
                    Job Type
                  </label>
                  <select
                    value={filters.job_type || ''}
                    onChange={(e) =>
                      setFilters((prev) => ({
                        ...prev,
                        job_type: e.target.value || undefined,
                      }))
                    }
                    className='w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500'
                  >
                    <option value=''>All Types</option>
                    <option value='full-time'>Full-time</option>
                    <option value='part-time'>Part-time</option>
                    <option value='contract'>Contract</option>
                    <option value='internship'>Internship</option>
                    <option value='research-assistant'>
                      Research Assistant
                    </option>
                    <option value='teaching-assistant'>
                      Teaching Assistant
                    </option>
                  </select>
                </div>

                <div>
                  <label className='block text-sm font-medium mb-1'>
                    Category
                  </label>
                  <select
                    value={filters.category || ''}
                    onChange={(e) =>
                      setFilters((prev) => ({
                        ...prev,
                        category: e.target.value || undefined,
                      }))
                    }
                    className='w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500'
                  >
                    <option value=''>All Categories</option>
                    <option value='academic'>Academic</option>
                    <option value='research'>Research</option>
                    <option value='teaching'>Teaching</option>
                    <option value='administrative'>Administrative</option>
                    <option value='technical'>Technical</option>
                    <option value='other'>Other</option>
                  </select>
                </div>

                <div>
                  <label className='block text-sm font-medium mb-1'>
                    Location
                  </label>
                  <input
                    type='text'
                    value={filters.location || ''}
                    onChange={(e) =>
                      setFilters((prev) => ({
                        ...prev,
                        location: e.target.value || undefined,
                      }))
                    }
                    placeholder='e.g., Cambridge, MA'
                    className='w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500'
                  />
                </div>

                <div>
                  <label className='block text-sm font-medium mb-1'>
                    Experience Level
                  </label>
                  <select
                    value={filters.experience_level || ''}
                    onChange={(e) =>
                      setFilters((prev) => ({
                        ...prev,
                        experience_level: e.target.value || undefined,
                      }))
                    }
                    className='w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500'
                  >
                    <option value=''>Any Level</option>
                    <option value='entry'>Entry Level</option>
                    <option value='mid'>Mid Level</option>
                    <option value='senior'>Senior Level</option>
                  </select>
                </div>

                <div>
                  <label className='block text-sm font-medium mb-1'>
                    Education Level
                  </label>
                  <select
                    value={filters.education_level || ''}
                    onChange={(e) =>
                      setFilters((prev) => ({
                        ...prev,
                        education_level: e.target.value || undefined,
                      }))
                    }
                    className='w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500'
                  >
                    <option value=''>Any Education</option>
                    <option value='bachelor'>Bachelor's Degree</option>
                    <option value='master'>Master's Degree</option>
                    <option value='phd'>PhD</option>
                  </select>
                </div>

                <div>
                  <label className='block text-sm font-medium mb-1'>
                    Remote Work
                  </label>
                  <select
                    value={
                      filters.is_remote === undefined
                        ? ''
                        : filters.is_remote.toString()
                    }
                    onChange={(e) =>
                      setFilters((prev) => ({
                        ...prev,
                        is_remote:
                          e.target.value === ''
                            ? undefined
                            : e.target.value === 'true',
                      }))
                    }
                    className='w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500'
                  >
                    <option value=''>Any</option>
                    <option value='true'>Remote Only</option>
                    <option value='false'>On-site Only</option>
                  </select>
                </div>
              </div>
            </CardContent>
          </Card>
        )}
      </div>

      {/* Jobs List */}
      {getDisplayJobs().length === 0 ? (
        <Card>
          <CardContent className='p-6 text-center'>
            <Briefcase className='w-12 h-12 text-muted-foreground mx-auto mb-4' />
            <h3 className='text-lg font-medium mb-2'>No jobs found</h3>
            <p className='text-muted-foreground'>
              {activeTab === 'saved'
                ? "You haven't saved any jobs yet"
                : 'Try adjusting your search criteria or filters'}
            </p>
          </CardContent>
        </Card>
      ) : (
        <div className='space-y-4'>
          {getDisplayJobs().map((job) => (
            <Card key={job.id} className='hover:shadow-md transition-shadow'>
              <CardContent className='p-4'>
                <div className='flex items-start gap-3'>
                  <Avatar className='w-12 h-12'>
                    <AvatarImage src={job.company_logo} />
                    <AvatarFallback>
                      {job.company_name.charAt(0)}
                    </AvatarFallback>
                  </Avatar>

                  <div className='flex-1 min-w-0'>
                    <div className='flex items-center gap-2 mb-1'>
                      <h4 className='font-medium truncate'>{job.title}</h4>
                      {job.is_featured && (
                        <Star className='w-4 h-4 text-yellow-600' />
                      )}
                    </div>

                    <div className='flex items-center gap-2 text-sm text-muted-foreground mb-2'>
                      <span>{job.company_name}</span>
                      <Badge
                        className={`text-xs ${getJobTypeColor(job.job_type)}`}
                      >
                        {getJobTypeIcon(job.job_type)}
                        <span className='ml-1'>
                          {job.job_type.replace('-', ' ')}
                        </span>
                      </Badge>
                      <Badge
                        className={`text-xs ${getCategoryColor(job.category)}`}
                      >
                        {job.category}
                      </Badge>
                    </div>

                    <p className='text-sm text-muted-foreground mb-3 line-clamp-2'>
                      {job.description}
                    </p>

                    <div className='flex items-center gap-4 text-sm text-muted-foreground'>
                      <div className='flex items-center gap-1'>
                        <MapPin className='w-4 h-4' />
                        <span>{job.location}</span>
                        {job.is_remote && <Globe className='w-4 h-4 ml-1' />}
                      </div>
                      <div className='flex items-center gap-1'>
                        <DollarSign className='w-4 h-4' />
                        <span>{formatSalary(job)}</span>
                      </div>
                      <div className='flex items-center gap-1'>
                        <Calendar className='w-4 h-4' />
                        <span>{formatDate(job.created_at)}</span>
                      </div>
                      {job.application_count && (
                        <div className='flex items-center gap-1'>
                          <Users className='w-4 h-4' />
                          <span>{job.application_count} applications</span>
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
                          isJobSaved(job.id)
                            ? handleUnsaveJob(job.id)
                            : handleSaveJob(job.id)
                        }
                        disabled={savingJobs.has(job.id)}
                      >
                        {isJobSaved(job.id) ? (
                          <BookmarkCheck className='w-4 h-4 text-blue-600' />
                        ) : (
                          <Bookmark className='w-4 h-4' />
                        )}
                      </Button>
                    )}

                    <Button
                      variant='outline'
                      size='sm'
                      onClick={() => onJobSelect?.(job)}
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
