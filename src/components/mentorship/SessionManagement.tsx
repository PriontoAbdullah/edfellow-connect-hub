import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import {
  Calendar,
  Clock,
  Video,
  MapPin,
  MessageSquare,
  Star,
  CheckCircle,
  AlertCircle,
  X,
  Edit,
  Trash2,
  Plus,
  Search,
  Filter,
  ChevronDown,
  User,
  Users,
  BookOpen,
  Target,
  Award,
  TrendingUp,
  Heart,
  Globe,
  Building2,
  GraduationCap,
  Briefcase,
  Zap,
  Shield,
  ThumbsUp,
  ThumbsDown,
  ExternalLink,
  Copy,
  Share,
  Bell,
  Settings,
  BarChart3,
  FileText,
  Camera,
  Mic,
  MicOff,
  Phone,
  PhoneOff,
} from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';
import { useToast } from '@/hooks/use-toast';
import {
  getMentorshipSessions,
  updateMentorshipSession,
  createMentorshipReview,
  getMentorshipReviews,
  type MentorshipSession,
  type MentorshipReview,
} from '@/lib/api/mentorship';

interface SessionManagementProps {
  compact?: boolean;
  onSessionSelect?: (session: MentorshipSession) => void;
}

interface SessionFilters {
  status?: string;
  session_type?: string;
  date_from?: string;
  date_to?: string;
  search?: string;
}

export const SessionManagement: React.FC<SessionManagementProps> = ({
  compact = false,
  onSessionSelect,
}) => {
  const { user } = useAuth();
  const { toast } = useToast();
  const [sessions, setSessions] = useState<MentorshipSession[]>([]);
  const [reviews, setReviews] = useState<MentorshipReview[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [showFilters, setShowFilters] = useState(false);
  const [filters, setFilters] = useState<SessionFilters>({});
  const [activeTab, setActiveTab] = useState<'upcoming' | 'past' | 'reviews'>(
    'upcoming'
  );
  const [selectedSession, setSelectedSession] =
    useState<MentorshipSession | null>(null);
  const [showSessionDetails, setShowSessionDetails] = useState(false);
  const [showReviewForm, setShowReviewForm] = useState(false);
  const [newReview, setNewReview] = useState({
    rating: 5,
    review_text: '',
    is_public: true,
  });

  const sessionTypes = [
    { value: 'one-on-one', label: 'One-on-One', icon: User },
    { value: 'group', label: 'Group Session', icon: Users },
    { value: 'workshop', label: 'Workshop', icon: BookOpen },
    { value: 'consultation', label: 'Consultation', icon: MessageSquare },
  ];

  const sessionStatuses = [
    {
      value: 'scheduled',
      label: 'Scheduled',
      color: 'bg-blue-100 text-blue-800',
    },
    {
      value: 'confirmed',
      label: 'Confirmed',
      color: 'bg-green-100 text-green-800',
    },
    {
      value: 'in-progress',
      label: 'In Progress',
      color: 'bg-yellow-100 text-yellow-800',
    },
    {
      value: 'completed',
      label: 'Completed',
      color: 'bg-purple-100 text-purple-800',
    },
    {
      value: 'cancelled',
      label: 'Cancelled',
      color: 'bg-red-100 text-red-800',
    },
    { value: 'no-show', label: 'No Show', color: 'bg-gray-100 text-gray-800' },
  ];

  useEffect(() => {
    fetchSessions();
    fetchReviews();
  }, [filters, searchTerm, activeTab]);

  const fetchSessions = async () => {
    setLoading(true);
    try {
      const searchFilters: any = { ...filters };

      if (searchTerm) {
        searchFilters.search = searchTerm;
      }

      if (activeTab === 'upcoming') {
        searchFilters.date_from = new Date().toISOString().split('T')[0];
      } else if (activeTab === 'past') {
        searchFilters.date_to = new Date().toISOString().split('T')[0];
      }

      const { data, error } = await getMentorshipSessions(searchFilters);

      if (error) {
        toast({
          title: 'Error',
          description: error,
          variant: 'destructive',
        });
        return;
      }

      setSessions(data || []);
    } catch (error) {
      console.error('Error fetching sessions:', error);
    } finally {
      setLoading(false);
    }
  };

  const fetchReviews = async () => {
    if (!user) return;

    try {
      const { data, error } = await getMentorshipReviews({
        reviewer_id: user.id,
      });

      if (error) {
        console.error('Error fetching reviews:', error);
        return;
      }

      setReviews(data || []);
    } catch (error) {
      console.error('Error fetching reviews:', error);
    }
  };

  const handleUpdateSession = async (
    sessionId: string,
    updates: Partial<MentorshipSession>
  ) => {
    try {
      const { error } = await updateMentorshipSession(sessionId, updates);

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
        description: 'Session updated successfully!',
      });

      fetchSessions();
    } catch (error) {
      toast({
        title: 'Error',
        description: 'Failed to update session',
        variant: 'destructive',
      });
    }
  };

  const handleCreateReview = async () => {
    if (!selectedSession) return;

    try {
      const { error } = await createMentorshipReview({
        session_id: selectedSession.id,
        reviewer_id: user?.id || '',
        reviewee_id: selectedSession.mentorship_profile?.user_id || '',
        ...newReview,
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
        description: 'Review submitted successfully!',
      });

      setShowReviewForm(false);
      setNewReview({
        rating: 5,
        review_text: '',
        is_public: true,
      });
      fetchReviews();
    } catch (error) {
      toast({
        title: 'Error',
        description: 'Failed to submit review',
        variant: 'destructive',
      });
    }
  };

  const clearFilters = () => {
    setFilters({});
  };

  const getSessionTypeIcon = (type: string) => {
    const sessionType = sessionTypes.find((st) => st.value === type);
    return sessionType ? sessionType.icon : User;
  };

  const getSessionStatusColor = (status: string) => {
    const sessionStatus = sessionStatuses.find((ss) => ss.value === status);
    return sessionStatus ? sessionStatus.color : 'bg-gray-100 text-gray-800';
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    });
  };

  const formatTime = (timeString: string) => {
    return new Date(timeString).toLocaleTimeString('en-US', {
      hour: 'numeric',
      minute: '2-digit',
      hour12: true,
    });
  };

  const formatDateTime = (dateString: string, timeString: string) => {
    const date = new Date(dateString);
    const time = new Date(`2000-01-01T${timeString}`);

    return `${date.toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
    })} at ${time.toLocaleTimeString('en-US', {
      hour: 'numeric',
      minute: '2-digit',
      hour12: true,
    })}`;
  };

  const getSessionStats = () => {
    const upcoming = sessions.filter(
      (s) => s.status === 'scheduled' || s.status === 'confirmed'
    );
    const past = sessions.filter((s) => s.status === 'completed');
    const cancelled = sessions.filter((s) => s.status === 'cancelled');

    return {
      total: sessions.length,
      upcoming: upcoming.length,
      past: past.length,
      cancelled: cancelled.length,
    };
  };

  const isSessionUpcoming = (session: MentorshipSession) => {
    const now = new Date();
    const sessionTime = new Date(
      `${session.scheduled_date}T${session.start_time}`
    );
    return (
      sessionTime > now &&
      (session.status === 'scheduled' || session.status === 'confirmed')
    );
  };

  const isSessionPast = (session: MentorshipSession) => {
    const now = new Date();
    const sessionTime = new Date(
      `${session.scheduled_date}T${session.end_time}`
    );
    return sessionTime < now || session.status === 'completed';
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
          <h3 className='text-sm font-medium'>Sessions</h3>
          <Badge variant='outline'>{sessions.length}</Badge>
        </div>

        <div className='space-y-2'>
          {sessions.slice(0, 3).map((session) => {
            const Icon = getSessionTypeIcon(session.session_type);
            return (
              <div key={session.id} className='p-3 border rounded-lg'>
                <div className='flex items-start gap-2 mb-2'>
                  <div className='w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center'>
                    <Icon className='w-4 h-4 text-blue-600' />
                  </div>
                  <div className='flex-1 min-w-0'>
                    <p className='text-sm font-medium truncate'>
                      {session.title}
                    </p>
                    <p className='text-xs text-muted-foreground'>
                      {session.mentorship_profile?.user?.display_name}
                    </p>
                  </div>
                  <Badge
                    className={`text-xs ${getSessionStatusColor(
                      session.status
                    )}`}
                  >
                    {session.status}
                  </Badge>
                </div>
                <p className='text-xs text-muted-foreground'>
                  {formatDateTime(session.scheduled_date, session.start_time)}
                </p>
              </div>
            );
          })}
        </div>

        {sessions.length > 3 && (
          <Button variant='outline' size='sm' className='w-full'>
            View All ({sessions.length})
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
          <h3 className='text-lg font-semibold'>Session Management</h3>
          <p className='text-sm text-muted-foreground'>
            Manage your mentorship sessions and reviews
          </p>
        </div>
      </div>

      {/* Tabs */}
      <div className='flex gap-2'>
        {(['upcoming', 'past', 'reviews'] as const).map((tab) => (
          <Button
            key={tab}
            variant={activeTab === tab ? 'default' : 'outline'}
            size='sm'
            onClick={() => setActiveTab(tab)}
          >
            {tab === 'upcoming' && <Calendar className='w-4 h-4 mr-1' />}
            {tab === 'past' && <CheckCircle className='w-4 h-4 mr-1' />}
            {tab === 'reviews' && <Star className='w-4 h-4 mr-1' />}
            <span className='capitalize'>{tab}</span>
          </Button>
        ))}
      </div>

      {/* Search and Filters */}
      {(activeTab === 'upcoming' || activeTab === 'past') && (
        <div className='space-y-4'>
          <div className='relative'>
            <Search className='absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-5 h-5' />
            <input
              type='text'
              placeholder='Search sessions by title or mentor name...'
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
                      Status
                    </label>
                    <select
                      value={filters.status || ''}
                      onChange={(e) =>
                        setFilters((prev) => ({
                          ...prev,
                          status: e.target.value || undefined,
                        }))
                      }
                      className='w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500'
                    >
                      <option value=''>All Statuses</option>
                      {sessionStatuses.map((status) => (
                        <option key={status.value} value={status.value}>
                          {status.label}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className='block text-sm font-medium mb-1'>
                      Session Type
                    </label>
                    <select
                      value={filters.session_type || ''}
                      onChange={(e) =>
                        setFilters((prev) => ({
                          ...prev,
                          session_type: e.target.value || undefined,
                        }))
                      }
                      className='w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500'
                    >
                      <option value=''>All Types</option>
                      {sessionTypes.map((type) => (
                        <option key={type.value} value={type.value}>
                          {type.label}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className='block text-sm font-medium mb-1'>
                      Date From
                    </label>
                    <Input
                      type='date'
                      value={filters.date_from || ''}
                      onChange={(e) =>
                        setFilters((prev) => ({
                          ...prev,
                          date_from: e.target.value || undefined,
                        }))
                      }
                    />
                  </div>
                </div>
              </CardContent>
            </Card>
          )}
        </div>
      )}

      {/* Session Stats */}
      {(activeTab === 'upcoming' || activeTab === 'past') && (
        <div className='grid grid-cols-2 md:grid-cols-4 gap-4'>
          <Card>
            <CardContent className='p-4 text-center'>
              <div className='text-2xl font-bold text-blue-600'>
                {getSessionStats().total}
              </div>
              <div className='text-xs text-muted-foreground'>
                Total Sessions
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className='p-4 text-center'>
              <div className='text-2xl font-bold text-green-600'>
                {getSessionStats().upcoming}
              </div>
              <div className='text-xs text-muted-foreground'>Upcoming</div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className='p-4 text-center'>
              <div className='text-2xl font-bold text-purple-600'>
                {getSessionStats().past}
              </div>
              <div className='text-xs text-muted-foreground'>Completed</div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className='p-4 text-center'>
              <div className='text-2xl font-bold text-red-600'>
                {getSessionStats().cancelled}
              </div>
              <div className='text-xs text-muted-foreground'>Cancelled</div>
            </CardContent>
          </Card>
        </div>
      )}

      {/* Tab Content */}
      {activeTab === 'upcoming' && (
        <div className='space-y-4'>
          {sessions.filter(isSessionUpcoming).length === 0 ? (
            <Card>
              <CardContent className='p-6 text-center'>
                <Calendar className='w-12 h-12 text-muted-foreground mx-auto mb-4' />
                <h3 className='text-lg font-medium mb-2'>
                  No upcoming sessions
                </h3>
                <p className='text-muted-foreground'>
                  You don't have any upcoming mentorship sessions
                </p>
              </CardContent>
            </Card>
          ) : (
            sessions.filter(isSessionUpcoming).map((session) => {
              const Icon = getSessionTypeIcon(session.session_type);
              return (
                <Card
                  key={session.id}
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
                            {session.title}
                          </h4>
                          <Badge
                            className={`text-xs ${getSessionStatusColor(
                              session.status
                            )}`}
                          >
                            {session.status}
                          </Badge>
                        </div>

                        <p className='text-sm text-muted-foreground mb-2'>
                          {session.mentorship_profile?.user?.display_name} •{' '}
                          {session.session_type}
                        </p>

                        {session.description && (
                          <p className='text-sm text-muted-foreground mb-2 line-clamp-2'>
                            {session.description}
                          </p>
                        )}

                        <div className='flex items-center gap-4 text-sm text-muted-foreground'>
                          <div className='flex items-center gap-1'>
                            <Calendar className='w-4 h-4' />
                            <span>{formatDate(session.scheduled_date)}</span>
                          </div>
                          <div className='flex items-center gap-1'>
                            <Clock className='w-4 h-4' />
                            <span>
                              {formatTime(session.start_time)} -{' '}
                              {formatTime(session.end_time)}
                            </span>
                          </div>
                          <div className='flex items-center gap-1'>
                            <Clock className='w-4 h-4' />
                            <span>{session.duration_minutes} min</span>
                          </div>
                          {session.meeting_platform && (
                            <div className='flex items-center gap-1'>
                              {session.meeting_platform === 'in-person' ? (
                                <MapPin className='w-4 h-4' />
                              ) : (
                                <Video className='w-4 h-4' />
                              )}
                              <span>{session.meeting_platform}</span>
                            </div>
                          )}
                        </div>
                      </div>

                      <div className='flex flex-col gap-2'>
                        {session.meeting_link && (
                          <Button
                            variant='outline'
                            size='sm'
                            onClick={() =>
                              window.open(session.meeting_link, '_blank')
                            }
                          >
                            <Video className='w-4 h-4 mr-1' />
                            Join
                          </Button>
                        )}

                        <Button
                          variant='outline'
                          size='sm'
                          onClick={() => {
                            setSelectedSession(session);
                            setShowSessionDetails(true);
                          }}
                        >
                          <Eye className='w-4 h-4 mr-1' />
                          View
                        </Button>

                        {session.status === 'scheduled' && (
                          <Button
                            variant='outline'
                            size='sm'
                            onClick={() =>
                              handleUpdateSession(session.id, {
                                status: 'cancelled',
                              })
                            }
                          >
                            <X className='w-4 h-4 mr-1' />
                            Cancel
                          </Button>
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

      {activeTab === 'past' && (
        <div className='space-y-4'>
          {sessions.filter(isSessionPast).length === 0 ? (
            <Card>
              <CardContent className='p-6 text-center'>
                <CheckCircle className='w-12 h-12 text-muted-foreground mx-auto mb-4' />
                <h3 className='text-lg font-medium mb-2'>No past sessions</h3>
                <p className='text-muted-foreground'>
                  You don't have any completed mentorship sessions yet
                </p>
              </CardContent>
            </Card>
          ) : (
            sessions.filter(isSessionPast).map((session) => {
              const Icon = getSessionTypeIcon(session.session_type);
              return (
                <Card
                  key={session.id}
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
                            {session.title}
                          </h4>
                          <Badge
                            className={`text-xs ${getSessionStatusColor(
                              session.status
                            )}`}
                          >
                            {session.status}
                          </Badge>
                        </div>

                        <p className='text-sm text-muted-foreground mb-2'>
                          {session.mentorship_profile?.user?.display_name} •{' '}
                          {session.session_type}
                        </p>

                        {session.description && (
                          <p className='text-sm text-muted-foreground mb-2 line-clamp-2'>
                            {session.description}
                          </p>
                        )}

                        <div className='flex items-center gap-4 text-sm text-muted-foreground'>
                          <div className='flex items-center gap-1'>
                            <Calendar className='w-4 h-4' />
                            <span>{formatDate(session.scheduled_date)}</span>
                          </div>
                          <div className='flex items-center gap-1'>
                            <Clock className='w-4 h-4' />
                            <span>
                              {formatTime(session.start_time)} -{' '}
                              {formatTime(session.end_time)}
                            </span>
                          </div>
                          {session.rating && (
                            <div className='flex items-center gap-1'>
                              <Star className='w-4 h-4 text-yellow-500' />
                              <span>{session.rating}/5</span>
                            </div>
                          )}
                        </div>
                      </div>

                      <div className='flex flex-col gap-2'>
                        <Button
                          variant='outline'
                          size='sm'
                          onClick={() => {
                            setSelectedSession(session);
                            setShowSessionDetails(true);
                          }}
                        >
                          <Eye className='w-4 h-4 mr-1' />
                          View
                        </Button>

                        {session.status === 'completed' && !session.rating && (
                          <Button
                            variant='outline'
                            size='sm'
                            onClick={() => {
                              setSelectedSession(session);
                              setShowReviewForm(true);
                            }}
                          >
                            <Star className='w-4 h-4 mr-1' />
                            Review
                          </Button>
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

      {activeTab === 'reviews' && (
        <div className='space-y-4'>
          {reviews.length === 0 ? (
            <Card>
              <CardContent className='p-6 text-center'>
                <Star className='w-12 h-12 text-muted-foreground mx-auto mb-4' />
                <h3 className='text-lg font-medium mb-2'>No reviews yet</h3>
                <p className='text-muted-foreground'>
                  You haven't written any reviews for your mentorship sessions
                </p>
              </CardContent>
            </Card>
          ) : (
            reviews.map((review) => (
              <Card key={review.id}>
                <CardContent className='p-4'>
                  <div className='flex items-start gap-3'>
                    <Avatar className='w-10 h-10'>
                      <AvatarImage src={review.reviewee?.avatar} />
                      <AvatarFallback>
                        {review.reviewee?.display_name.charAt(0)}
                      </AvatarFallback>
                    </Avatar>
                    <div className='flex-1'>
                      <div className='flex items-center gap-2 mb-1'>
                        <h5 className='font-medium'>
                          {review.reviewee?.display_name}
                        </h5>
                        <div className='flex items-center gap-1'>
                          {[...Array(5)].map((_, i) => (
                            <Star
                              key={i}
                              className={`w-4 h-4 ${
                                i < review.rating
                                  ? 'text-yellow-500 fill-current'
                                  : 'text-gray-300'
                              }`}
                            />
                          ))}
                        </div>
                      </div>
                      <p className='text-sm text-muted-foreground mb-2'>
                        {review.session?.title}
                      </p>
                      {review.review_text && (
                        <p className='text-sm text-muted-foreground'>
                          {review.review_text}
                        </p>
                      )}
                      <p className='text-xs text-muted-foreground mt-2'>
                        {formatDate(review.created_at)}
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))
          )}
        </div>
      )}

      {/* Session Details Modal */}
      {showSessionDetails && selectedSession && (
        <Card>
          <CardHeader>
            <CardTitle>Session Details</CardTitle>
          </CardHeader>
          <CardContent className='space-y-4'>
            <div className='flex items-center gap-3 p-3 bg-gray-50 rounded-lg'>
              <Avatar className='w-12 h-12'>
                <AvatarImage
                  src={selectedSession.mentorship_profile?.user?.avatar}
                />
                <AvatarFallback>
                  {selectedSession.mentorship_profile?.user?.display_name.charAt(
                    0
                  )}
                </AvatarFallback>
              </Avatar>
              <div>
                <h4 className='font-medium'>{selectedSession.title}</h4>
                <p className='text-sm text-muted-foreground'>
                  {selectedSession.mentorship_profile?.user?.display_name}
                </p>
              </div>
            </div>

            <div className='grid grid-cols-2 gap-4'>
              <div>
                <Label>Session Type</Label>
                <p className='text-sm'>{selectedSession.session_type}</p>
              </div>
              <div>
                <Label>Status</Label>
                <Badge
                  className={`text-xs ${getSessionStatusColor(
                    selectedSession.status
                  )}`}
                >
                  {selectedSession.status}
                </Badge>
              </div>
              <div>
                <Label>Date</Label>
                <p className='text-sm'>
                  {formatDate(selectedSession.scheduled_date)}
                </p>
              </div>
              <div>
                <Label>Time</Label>
                <p className='text-sm'>
                  {formatTime(selectedSession.start_time)} -{' '}
                  {formatTime(selectedSession.end_time)}
                </p>
              </div>
              <div>
                <Label>Duration</Label>
                <p className='text-sm'>
                  {selectedSession.duration_minutes} minutes
                </p>
              </div>
              <div>
                <Label>Platform</Label>
                <p className='text-sm'>
                  {selectedSession.meeting_platform || 'Not specified'}
                </p>
              </div>
            </div>

            {selectedSession.description && (
              <div>
                <Label>Description</Label>
                <p className='text-sm text-muted-foreground'>
                  {selectedSession.description}
                </p>
              </div>
            )}

            {selectedSession.meeting_link && (
              <div>
                <Label>Meeting Link</Label>
                <div className='flex items-center gap-2'>
                  <Input value={selectedSession.meeting_link} readOnly />
                  <Button
                    variant='outline'
                    size='sm'
                    onClick={() => {
                      navigator.clipboard.writeText(
                        selectedSession.meeting_link || ''
                      );
                      toast({
                        title: 'Success',
                        description: 'Meeting link copied to clipboard',
                      });
                    }}
                  >
                    <Copy className='w-4 h-4' />
                  </Button>
                  <Button
                    variant='outline'
                    size='sm'
                    onClick={() =>
                      window.open(selectedSession.meeting_link, '_blank')
                    }
                  >
                    <ExternalLink className='w-4 h-4' />
                  </Button>
                </div>
              </div>
            )}

            <div className='flex gap-2'>
              <Button onClick={() => setShowSessionDetails(false)}>
                Close
              </Button>
              {selectedSession.status === 'completed' &&
                !selectedSession.rating && (
                  <Button
                    variant='outline'
                    onClick={() => {
                      setShowSessionDetails(false);
                      setShowReviewForm(true);
                    }}
                  >
                    Write Review
                  </Button>
                )}
            </div>
          </CardContent>
        </Card>
      )}

      {/* Review Form Modal */}
      {showReviewForm && selectedSession && (
        <Card>
          <CardHeader>
            <CardTitle>Write a Review</CardTitle>
          </CardHeader>
          <CardContent className='space-y-4'>
            <div className='flex items-center gap-3 p-3 bg-gray-50 rounded-lg'>
              <Avatar className='w-10 h-10'>
                <AvatarImage
                  src={selectedSession.mentorship_profile?.user?.avatar}
                />
                <AvatarFallback>
                  {selectedSession.mentorship_profile?.user?.display_name.charAt(
                    0
                  )}
                </AvatarFallback>
              </Avatar>
              <div>
                <h4 className='font-medium'>{selectedSession.title}</h4>
                <p className='text-sm text-muted-foreground'>
                  {selectedSession.mentorship_profile?.user?.display_name}
                </p>
              </div>
            </div>

            <div>
              <Label>Rating *</Label>
              <div className='flex items-center gap-2 mt-2'>
                {[1, 2, 3, 4, 5].map((rating) => (
                  <button
                    key={rating}
                    onClick={() =>
                      setNewReview((prev) => ({ ...prev, rating }))
                    }
                    className='p-1'
                  >
                    <Star
                      className={`w-6 h-6 ${
                        rating <= newReview.rating
                          ? 'text-yellow-500 fill-current'
                          : 'text-gray-300'
                      }`}
                    />
                  </button>
                ))}
              </div>
            </div>

            <div>
              <Label htmlFor='review_text'>Review (Optional)</Label>
              <Textarea
                id='review_text'
                value={newReview.review_text}
                onChange={(e) =>
                  setNewReview((prev) => ({
                    ...prev,
                    review_text: e.target.value,
                  }))
                }
                placeholder='Share your experience with this mentorship session...'
                rows={4}
              />
            </div>

            <div className='flex items-center gap-2'>
              <input
                type='checkbox'
                id='is_public'
                checked={newReview.is_public}
                onChange={(e) =>
                  setNewReview((prev) => ({
                    ...prev,
                    is_public: e.target.checked,
                  }))
                }
              />
              <Label htmlFor='is_public'>Make this review public</Label>
            </div>

            <div className='flex gap-2'>
              <Button onClick={handleCreateReview}>Submit Review</Button>
              <Button
                variant='outline'
                onClick={() => setShowReviewForm(false)}
              >
                Cancel
              </Button>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
};
