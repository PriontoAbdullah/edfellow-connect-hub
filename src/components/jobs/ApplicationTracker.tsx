import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import {
  Briefcase,
  Calendar,
  MapPin,
  DollarSign,
  Users,
  Eye,
  MessageSquare,
  CheckCircle,
  XCircle,
  Clock,
  AlertCircle,
  TrendingUp,
  Filter,
  Search,
  ChevronDown,
  X,
  FileText,
  Star,
  Building2,
} from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';
import { useToast } from '@/hooks/use-toast';
import {
  getJobApplications,
  getResearchApplications,
  type JobApplication,
  type ResearchApplication,
} from '@/lib/api/jobs';

interface ApplicationTrackerProps {
  compact?: boolean;
  onApplicationSelect?: (
    application: JobApplication | ResearchApplication
  ) => void;
}

type ApplicationType = 'job' | 'research';
type ApplicationStatus =
  | 'submitted'
  | 'under-review'
  | 'shortlisted'
  | 'interview-scheduled'
  | 'interviewed'
  | 'offered'
  | 'accepted'
  | 'rejected'
  | 'withdrawn';

export const ApplicationTracker: React.FC<ApplicationTrackerProps> = ({
  compact = false,
  onApplicationSelect,
}) => {
  const { user } = useAuth();
  const { toast } = useToast();
  const [jobApplications, setJobApplications] = useState<JobApplication[]>([]);
  const [researchApplications, setResearchApplications] = useState<
    ResearchApplication[]
  >([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState<'all' | 'jobs' | 'research'>(
    'all'
  );
  const [statusFilter, setStatusFilter] = useState<ApplicationStatus | 'all'>(
    'all'
  );
  const [searchTerm, setSearchTerm] = useState('');
  const [showFilters, setShowFilters] = useState(false);

  useEffect(() => {
    if (user) {
      fetchApplications();
    }
  }, [user, statusFilter, searchTerm]);

  const fetchApplications = async () => {
    if (!user) return;

    setLoading(true);
    try {
      // Fetch job applications
      const { data: jobData, error: jobError } = await getJobApplications(
        undefined,
        user.id
      );
      if (jobError) {
        console.error('Error fetching job applications:', jobError);
      } else {
        setJobApplications(jobData || []);
      }

      // Fetch research applications
      const { data: researchData, error: researchError } =
        await getResearchApplications(undefined, user.id);
      if (researchError) {
        console.error('Error fetching research applications:', researchError);
      } else {
        setResearchApplications(researchData || []);
      }
    } catch (error) {
      console.error('Error fetching applications:', error);
    } finally {
      setLoading(false);
    }
  };

  const getStatusColor = (status: ApplicationStatus) => {
    switch (status) {
      case 'submitted':
        return 'bg-blue-100 text-blue-800';
      case 'under-review':
        return 'bg-yellow-100 text-yellow-800';
      case 'shortlisted':
        return 'bg-purple-100 text-purple-800';
      case 'interview-scheduled':
        return 'bg-orange-100 text-orange-800';
      case 'interviewed':
        return 'bg-indigo-100 text-indigo-800';
      case 'offered':
        return 'bg-green-100 text-green-800';
      case 'accepted':
        return 'bg-green-100 text-green-800';
      case 'rejected':
        return 'bg-red-100 text-red-800';
      case 'withdrawn':
        return 'bg-gray-100 text-gray-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusIcon = (status: ApplicationStatus) => {
    switch (status) {
      case 'submitted':
        return <FileText className='w-4 h-4' />;
      case 'under-review':
        return <Clock className='w-4 h-4' />;
      case 'shortlisted':
        return <Star className='w-4 h-4' />;
      case 'interview-scheduled':
        return <Calendar className='w-4 h-4' />;
      case 'interviewed':
        return <MessageSquare className='w-4 h-4' />;
      case 'offered':
        return <CheckCircle className='w-4 h-4' />;
      case 'accepted':
        return <CheckCircle className='w-4 h-4' />;
      case 'rejected':
        return <XCircle className='w-4 h-4' />;
      case 'withdrawn':
        return <X className='w-4 h-4' />;
      default:
        return <AlertCircle className='w-4 h-4' />;
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    });
  };

  const formatSalary = (job: any) => {
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

  const formatFunding = (project: any) => {
    if (!project.funding_amount) return 'Funding not specified';

    const amount = project.funding_amount.toLocaleString();
    const currency = project.currency || 'USD';

    return `${currency} ${amount}`;
  };

  const getFilteredApplications = () => {
    let allApplications: (JobApplication | ResearchApplication)[] = [];

    if (activeTab === 'all' || activeTab === 'jobs') {
      allApplications = [...allApplications, ...jobApplications];
    }

    if (activeTab === 'all' || activeTab === 'research') {
      allApplications = [...allApplications, ...researchApplications];
    }

    // Filter by status
    if (statusFilter !== 'all') {
      allApplications = allApplications.filter(
        (app) => app.status === statusFilter
      );
    }

    // Filter by search term
    if (searchTerm) {
      allApplications = allApplications.filter((app) => {
        const title =
          'job_posting' in app ? app.job_posting?.title : app.project?.title;
        const company =
          'job_posting' in app
            ? app.job_posting?.company_name
            : app.project?.creator?.display_name;
        return (
          title?.toLowerCase().includes(searchTerm.toLowerCase()) ||
          company?.toLowerCase().includes(searchTerm.toLowerCase())
        );
      });
    }

    return allApplications.sort(
      (a, b) =>
        new Date(b.applied_at).getTime() - new Date(a.applied_at).getTime()
    );
  };

  const getApplicationStats = () => {
    const allApplications = [...jobApplications, ...researchApplications];

    return {
      total: allApplications.length,
      submitted: allApplications.filter((app) => app.status === 'submitted')
        .length,
      underReview: allApplications.filter(
        (app) => app.status === 'under-review'
      ).length,
      shortlisted: allApplications.filter((app) => app.status === 'shortlisted')
        .length,
      interviewed: allApplications.filter((app) => app.status === 'interviewed')
        .length,
      offered: allApplications.filter((app) => app.status === 'offered').length,
      accepted: allApplications.filter((app) => app.status === 'accepted')
        .length,
      rejected: allApplications.filter((app) => app.status === 'rejected')
        .length,
    };
  };

  const clearFilters = () => {
    setStatusFilter('all');
    setSearchTerm('');
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

  const stats = getApplicationStats();
  const filteredApplications = getFilteredApplications();

  if (compact) {
    return (
      <div className='space-y-4'>
        <div className='flex items-center justify-between'>
          <h3 className='text-sm font-medium'>Applications</h3>
          <Badge variant='outline'>{stats.total}</Badge>
        </div>

        <div className='space-y-2'>
          {filteredApplications.slice(0, 3).map((application) => {
            const isJob = 'job_posting' in application;
            const title = isJob
              ? application.job_posting?.title
              : application.project?.title;
            const company = isJob
              ? application.job_posting?.company_name
              : application.project?.creator?.display_name;

            return (
              <div key={application.id} className='p-3 border rounded-lg'>
                <div className='flex items-start gap-2 mb-2'>
                  <div className='w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center'>
                    {isJob ? (
                      <Briefcase className='w-4 h-4 text-blue-600' />
                    ) : (
                      <Star className='w-4 h-4 text-blue-600' />
                    )}
                  </div>
                  <div className='flex-1 min-w-0'>
                    <p className='text-sm font-medium truncate'>{title}</p>
                    <p className='text-xs text-muted-foreground'>{company}</p>
                  </div>
                  <Badge
                    className={`text-xs ${getStatusColor(application.status)}`}
                  >
                    {getStatusIcon(application.status)}
                  </Badge>
                </div>
                <p className='text-xs text-muted-foreground'>
                  Applied {formatDate(application.applied_at)}
                </p>
              </div>
            );
          })}
        </div>

        {filteredApplications.length > 3 && (
          <Button variant='outline' size='sm' className='w-full'>
            View All ({filteredApplications.length})
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
          <h3 className='text-lg font-semibold'>Application Tracker</h3>
          <p className='text-sm text-muted-foreground'>
            Track your job and research applications
          </p>
        </div>
        <div className='flex items-center gap-2'>
          <Badge variant='outline' className='text-sm'>
            <TrendingUp className='w-3 h-3 mr-1' />
            {stats.total} total
          </Badge>
        </div>
      </div>

      {/* Stats */}
      <div className='grid grid-cols-2 md:grid-cols-4 lg:grid-cols-7 gap-4'>
        <Card>
          <CardContent className='p-4 text-center'>
            <div className='text-2xl font-bold text-blue-600'>
              {stats.submitted}
            </div>
            <div className='text-xs text-muted-foreground'>Submitted</div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className='p-4 text-center'>
            <div className='text-2xl font-bold text-yellow-600'>
              {stats.underReview}
            </div>
            <div className='text-xs text-muted-foreground'>Under Review</div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className='p-4 text-center'>
            <div className='text-2xl font-bold text-purple-600'>
              {stats.shortlisted}
            </div>
            <div className='text-xs text-muted-foreground'>Shortlisted</div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className='p-4 text-center'>
            <div className='text-2xl font-bold text-indigo-600'>
              {stats.interviewed}
            </div>
            <div className='text-xs text-muted-foreground'>Interviewed</div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className='p-4 text-center'>
            <div className='text-2xl font-bold text-orange-600'>
              {stats.offered}
            </div>
            <div className='text-xs text-muted-foreground'>Offered</div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className='p-4 text-center'>
            <div className='text-2xl font-bold text-green-600'>
              {stats.accepted}
            </div>
            <div className='text-xs text-muted-foreground'>Accepted</div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className='p-4 text-center'>
            <div className='text-2xl font-bold text-red-600'>
              {stats.rejected}
            </div>
            <div className='text-xs text-muted-foreground'>Rejected</div>
          </CardContent>
        </Card>
      </div>

      {/* Tabs */}
      <div className='flex gap-2'>
        {(['all', 'jobs', 'research'] as const).map((tab) => (
          <Button
            key={tab}
            variant={activeTab === tab ? 'default' : 'outline'}
            size='sm'
            onClick={() => setActiveTab(tab)}
          >
            {tab === 'all' && <FileText className='w-4 h-4 mr-1' />}
            {tab === 'jobs' && <Briefcase className='w-4 h-4 mr-1' />}
            {tab === 'research' && <Star className='w-4 h-4 mr-1' />}
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
            placeholder='Search applications by title or company...'
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

          {(statusFilter !== 'all' || searchTerm) && (
            <Button variant='ghost' size='sm' onClick={clearFilters}>
              <X className='w-4 h-4 mr-2' />
              Clear Filters
            </Button>
          )}
        </div>

        {/* Status Filter */}
        {showFilters && (
          <Card>
            <CardContent className='p-4'>
              <div className='space-y-2'>
                <label className='block text-sm font-medium'>Status</label>
                <div className='flex flex-wrap gap-2'>
                  {(
                    [
                      'all',
                      'submitted',
                      'under-review',
                      'shortlisted',
                      'interview-scheduled',
                      'interviewed',
                      'offered',
                      'accepted',
                      'rejected',
                      'withdrawn',
                    ] as const
                  ).map((status) => (
                    <Button
                      key={status}
                      variant={statusFilter === status ? 'default' : 'outline'}
                      size='sm'
                      onClick={() => setStatusFilter(status)}
                    >
                      {status === 'all' ? 'All' : status.replace('-', ' ')}
                    </Button>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>
        )}
      </div>

      {/* Applications List */}
      {filteredApplications.length === 0 ? (
        <Card>
          <CardContent className='p-6 text-center'>
            <FileText className='w-12 h-12 text-muted-foreground mx-auto mb-4' />
            <h3 className='text-lg font-medium mb-2'>No applications found</h3>
            <p className='text-muted-foreground'>
              {stats.total === 0
                ? "You haven't applied to any positions yet"
                : 'Try adjusting your search criteria or filters'}
            </p>
          </CardContent>
        </Card>
      ) : (
        <div className='space-y-4'>
          {filteredApplications.map((application) => {
            const isJob = 'job_posting' in application;
            const job = isJob ? application.job_posting : null;
            const project = isJob ? null : application.project;
            const title = job?.title || project?.title || 'Unknown';
            const company =
              job?.company_name || project?.creator?.display_name || 'Unknown';
            const location = job?.location || '';
            const salary = job ? formatSalary(job) : '';
            const funding = project ? formatFunding(project) : '';

            return (
              <Card
                key={application.id}
                className='hover:shadow-md transition-shadow'
              >
                <CardContent className='p-4'>
                  <div className='flex items-start gap-3'>
                    <Avatar className='w-12 h-12'>
                      <AvatarImage
                        src={job?.company_logo || project?.creator?.avatar}
                      />
                      <AvatarFallback>
                        {isJob ? (
                          <Briefcase className='w-6 h-6' />
                        ) : (
                          <Star className='w-6 h-6' />
                        )}
                      </AvatarFallback>
                    </Avatar>

                    <div className='flex-1 min-w-0'>
                      <div className='flex items-center gap-2 mb-1'>
                        <h4 className='font-medium truncate'>{title}</h4>
                        <Badge
                          className={`text-xs ${getStatusColor(
                            application.status
                          )}`}
                        >
                          {getStatusIcon(application.status)}
                          <span className='ml-1 capitalize'>
                            {application.status.replace('-', ' ')}
                          </span>
                        </Badge>
                      </div>

                      <div className='flex items-center gap-2 text-sm text-muted-foreground mb-2'>
                        <span>{company}</span>
                        <Badge variant='outline' className='text-xs'>
                          {isJob ? 'Job' : 'Research'}
                        </Badge>
                        {location && (
                          <div className='flex items-center gap-1'>
                            <MapPin className='w-3 h-3' />
                            <span>{location}</span>
                          </div>
                        )}
                      </div>

                      <div className='flex items-center gap-4 text-sm text-muted-foreground'>
                        <div className='flex items-center gap-1'>
                          <Calendar className='w-4 h-4' />
                          <span>
                            Applied {formatDate(application.applied_at)}
                          </span>
                        </div>
                        {salary && (
                          <div className='flex items-center gap-1'>
                            <DollarSign className='w-4 h-4' />
                            <span>{salary}</span>
                          </div>
                        )}
                        {funding && (
                          <div className='flex items-center gap-1'>
                            <DollarSign className='w-4 h-4' />
                            <span>{funding}</span>
                          </div>
                        )}
                        {application.updated_at !== application.applied_at && (
                          <div className='flex items-center gap-1'>
                            <Clock className='w-4 h-4' />
                            <span>
                              Updated {formatDate(application.updated_at)}
                            </span>
                          </div>
                        )}
                      </div>
                    </div>

                    <div className='flex flex-col gap-2'>
                      <Button
                        variant='outline'
                        size='sm'
                        onClick={() => onApplicationSelect?.(application)}
                      >
                        <Eye className='w-4 h-4 mr-1' />
                        View
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>
      )}
    </div>
  );
};
