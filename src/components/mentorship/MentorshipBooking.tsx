import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import {
  Users,
  Calendar,
  Clock,
  DollarSign,
  Star,
  Search,
  Filter,
  ChevronDown,
  X,
  Plus,
  Eye,
  MessageSquare,
  Video,
  MapPin,
  CheckCircle,
  AlertCircle,
  User,
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
  Edit,
  Trash2,
  ExternalLink,
  Copy,
  Share,
} from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';
import { useToast } from '@/hooks/use-toast';
import {
  getMentorshipProfiles,
  getMentorshipAvailability,
  createMentorshipRequest,
  createMentorshipSession,
  getMentorshipSessions,
  type MentorshipProfile,
  type MentorshipAvailability,
  type MentorshipSession,
} from '@/lib/api/mentorship';

interface MentorshipBookingProps {
  compact?: boolean;
  onSessionSelect?: (session: MentorshipSession) => void;
}

interface BookingFilters {
  expertise_area?: string;
  is_available?: boolean;
  is_featured?: boolean;
  min_rating?: number;
  max_hourly_rate?: number;
  search?: string;
}

export const MentorshipBooking: React.FC<MentorshipBookingProps> = ({
  compact = false,
  onSessionSelect,
}) => {
  const { user } = useAuth();
  const { toast } = useToast();
  const [profiles, setProfiles] = useState<MentorshipProfile[]>([]);
  const [sessions, setSessions] = useState<MentorshipSession[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [showFilters, setShowFilters] = useState(false);
  const [filters, setFilters] = useState<BookingFilters>({});
  const [activeTab, setActiveTab] = useState<'browse' | 'sessions' | 'requests'>('browse');
  const [selectedProfile, setSelectedProfile] = useState<MentorshipProfile | null>(null);
  const [showBookingForm, setShowBookingForm] = useState(false);
  const [showAvailability, setShowAvailability] = useState(false);
  const [availability, setAvailability] = useState<MentorshipAvailability[]>([]);
  const [newRequest, setNewRequest] = useState({
    request_type: 'session' as const,
    title: '',
    description: '',
    preferred_dates: [] as string[],
    preferred_times: [] as string[],
    duration_minutes: 60,
  });

  const expertiseAreas = [
    'Computer Science',
    'Engineering',
    'Business',
    'Medicine',
    'Law',
    'Arts',
    'Sciences',
    'Education',
    'Social Sciences',
    'Mathematics',
    'Physics',
    'Chemistry',
    'Biology',
    'Psychology',
    'Economics',
    'Marketing',
    'Finance',
    'Design',
    'Writing',
    'Languages',
    'Other',
  ];

  const sessionTypes = [
    { value: 'one-on-one', label: 'One-on-One', icon: User },
    { value: 'group', label: 'Group Session', icon: Users },
    { value: 'workshop', label: 'Workshop', icon: BookOpen },
    { value: 'consultation', label: 'Consultation', icon: MessageSquare },
  ];

  useEffect(() => {
    fetchProfiles();
    fetchSessions();
  }, [filters, searchTerm, activeTab]);

  const fetchProfiles = async () => {
    setLoading(true);
    try {
      const searchFilters: any = { ...filters };
      
      if (searchTerm) {
        searchFilters.search = searchTerm;
      }

      const { data, error } = await getMentorshipProfiles(searchFilters);
      
      if (error) {
        toast({
          title: 'Error',
          description: error,
          variant: 'destructive',
        });
        return;
      }

      setProfiles(data || []);
    } catch (error) {
      console.error('Error fetching profiles:', error);
    } finally {
      setLoading(false);
    }
  };

  const fetchSessions = async () => {
    if (!user) return;
    
    try {
      const { data, error } = await getMentorshipSessions({
        mentee_id: user.id,
      });
      
      if (error) {
        console.error('Error fetching sessions:', error);
        return;
      }

      setSessions(data || []);
    } catch (error) {
      console.error('Error fetching sessions:', error);
    }
  };

  const fetchAvailability = async (profileId: string) => {
    try {
      const { data, error } = await getMentorshipAvailability(profileId);
      
      if (error) {
        toast({
          title: 'Error',
          description: error,
          variant: 'destructive',
        });
        return;
      }

      setAvailability(data || []);
    } catch (error) {
      console.error('Error fetching availability:', error);
    }
  };

  const handleCreateRequest = async () => {
    if (!user || !selectedProfile) return;
    
    try {
      const { error } = await createMentorshipRequest({
        mentorship_profile_id: selectedProfile.id,
        mentee_id: user.id,
        ...newRequest,
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
        description: 'Mentorship request sent successfully!',
      });

      setShowBookingForm(false);
      setNewRequest({
        request_type: 'session',
        title: '',
        description: '',
        preferred_dates: [],
        preferred_times: [],
        duration_minutes: 60,
      });
    } catch (error) {
      toast({
        title: 'Error',
        description: 'Failed to send mentorship request',
        variant: 'destructive',
      });
    }
  };

  const clearFilters = () => {
    setFilters({});
  };

  const getExpertiseIcon = (area: string) => {
    switch (area.toLowerCase()) {
      case 'computer science':
        return <Globe className='w-4 h-4' />;
      case 'engineering':
        return <Building2 className='w-4 h-4' />;
      case 'business':
        return <Briefcase className='w-4 h-4' />;
      case 'medicine':
        return <Heart className='w-4 h-4' />;
      case 'law':
        return <Shield className 'w-4 h-4' />;
      case 'education':
        return <GraduationCap className='w-4 h-4' />;
      case 'mathematics':
        return <Target className='w-4 h-4' />;
      case 'physics':
        return <Zap className='w-4 h-4' />;
      case 'chemistry':
        return <Award className='w-4 h-4' />;
      case 'biology':
        return <Heart className='w-4 h-4' />;
      default:
        return <BookOpen className='w-4 h-4' />;
    }
  };

  const getExpertiseColor = (area: string) => {
    const colors = [
      'bg-blue-100 text-blue-800',
      'bg-green-100 text-green-800',
      'bg-purple-100 text-purple-800',
      'bg-orange-100 text-orange-800',
      'bg-pink-100 text-pink-800',
      'bg-indigo-100 text-indigo-800',
      'bg-yellow-100 text-yellow-800',
      'bg-red-100 text-red-800',
    ];
    
    const index = area.length % colors.length;
    return colors[index];
  };

  const formatCurrency = (amount: number, currency: string) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: currency,
    }).format(amount);
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    });
  };

  const formatTime = (timeString: string) => {
    return new Date(`2000-01-01T${timeString}`).toLocaleTimeString('en-US', {
      hour: 'numeric',
      minute: '2-digit',
      hour12: true,
    });
  };

  const getSessionStats = () => {
    return {
      total: sessions.length,
      scheduled: sessions.filter(s => s.status === 'scheduled').length,
      completed: sessions.filter(s => s.status === 'completed').length,
      cancelled: sessions.filter(s => s.status === 'cancelled').length,
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
          <h3 className='text-sm font-medium'>Mentorship</h3>
          <Badge variant='outline'>{profiles.length}</Badge>
        </div>
        
        <div className='space-y-2'>
          {profiles.slice(0, 3).map((profile) => (
            <div key={profile.id} className='p-3 border rounded-lg'>
              <div className='flex items-start gap-2 mb-2'>
                <Avatar className='w-8 h-8'>
                  <AvatarImage src={profile.user?.avatar} />
                  <AvatarFallback>
                    {profile.user?.display_name.charAt(0)}
                  </AvatarFallback>
                </Avatar>
                <div className='flex-1 min-w-0'>
                  <p className='text-sm font-medium truncate'>{profile.title}</p>
                  <p className='text-xs text-muted-foreground'>
                    {profile.user?.display_name}
                  </p>
                </div>
                <div className='flex items-center gap-1'>
                  <Star className='w-3 h-3 text-yellow-500' />
                  <span className='text-xs'>{profile.rating.toFixed(1)}</span>
                </div>
              </div>
              <div className='flex flex-wrap gap-1 mb-2'>
                {profile.expertise_areas.slice(0, 2).map((area) => (
                  <Badge key={area} variant='outline' className='text-xs'>
                    {area}
                  </Badge>
                ))}
              </div>
              {profile.hourly_rate && (
                <p className='text-xs text-muted-foreground'>
                  {formatCurrency(profile.hourly_rate, profile.currency)}/hour
                </p>
              )}
            </div>
          ))}
        </div>
        
        {profiles.length > 3 && (
          <Button variant='outline' size='sm' className='w-full'>
            View All ({profiles.length})
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
          <h3 className='text-lg font-semibold'>Mentorship Booking</h3>
          <p className='text-sm text-muted-foreground'>
            Find and book mentorship sessions with experienced professionals
          </p>
        </div>
      </div>

      {/* Tabs */}
      <div className='flex gap-2'>
        {(['browse', 'sessions', 'requests'] as const).map((tab) => (
          <Button
            key={tab}
            variant={activeTab === tab ? 'default' : 'outline'}
            size='sm'
            onClick={() => setActiveTab(tab)}
          >
            {tab === 'browse' && <Search className='w-4 h-4 mr-1' />}
            {tab === 'sessions' && <Calendar className='w-4 h-4 mr-1' />}
            {tab === 'requests' && <MessageSquare className='w-4 h-4 mr-1' />}
            <span className='capitalize'>{tab}</span>
          </Button>
        ))}
      </div>

      {/* Browse Mentors Tab */}
      {activeTab === 'browse' && (
        <div className='space-y-4'>
          {/* Search and Filters */}
          <div className='space-y-4'>
            <div className='relative'>
              <Search className='absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-5 h-5' />
              <input
                type='text'
                placeholder='Search mentors by name, expertise, or description...'
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
                <ChevronDown className={`w-4 h-4 ml-2 transition-transform ${showFilters ? 'rotate-180' : ''}`} />
              </Button>
              
              {Object.values(filters).some(f => f !== undefined && f !== '') && (
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
                      <label className='block text-sm font-medium mb-1'>Expertise Area</label>
                      <select
                        value={filters.expertise_area || ''}
                        onChange={(e) => setFilters(prev => ({ ...prev, expertise_area: e.target.value || undefined }))}
                        className='w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500'
                      >
                        <option value=''>All Areas</option>
                        {expertiseAreas.map((area) => (
                          <option key={area} value={area}>{area}</option>
                        ))}
                      </select>
                    </div>

                    <div>
                      <label className='block text-sm font-medium mb-1'>Min Rating</label>
                      <select
                        value={filters.min_rating || ''}
                        onChange={(e) => setFilters(prev => ({ ...prev, min_rating: e.target.value ? parseFloat(e.target.value) : undefined }))}
                        className='w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500'
                      >
                        <option value=''>Any Rating</option>
                        <option value='4.5'>4.5+ Stars</option>
                        <option value='4.0'>4.0+ Stars</option>
                        <option value='3.5'>3.5+ Stars</option>
                        <option value='3.0'>3.0+ Stars</option>
                      </select>
                    </div>

                    <div>
                      <label className='block text-sm font-medium mb-1'>Max Hourly Rate</label>
                      <input
                        type='number'
                        value={filters.max_hourly_rate || ''}
                        onChange={(e) => setFilters(prev => ({ ...prev, max_hourly_rate: e.target.value ? parseInt(e.target.value) : undefined }))}
                        placeholder='100'
                        className='w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500'
                      />
                    </div>
                  </div>
                </CardContent>
              </Card>
            )}
          </div>

          {/* Mentorship Profiles */}
          <div className='space-y-4'>
            {profiles.length === 0 ? (
              <Card>
                <CardContent className='p-6 text-center'>
                  <Users className='w-12 h-12 text-muted-foreground mx-auto mb-4' />
                  <h3 className='text-lg font-medium mb-2'>No mentors found</h3>
                  <p className='text-muted-foreground'>
                    Try adjusting your search criteria or filters
                  </p>
                </CardContent>
              </Card>
            ) : (
              profiles.map((profile) => (
                <Card key={profile.id} className='hover:shadow-md transition-shadow'>
                  <CardContent className='p-4'>
                    <div className='flex items-start gap-3'>
                      <Avatar className='w-12 h-12'>
                        <AvatarImage src={profile.user?.avatar} />
                        <AvatarFallback>
                          {profile.user?.display_name.charAt(0)}
                        </AvatarFallback>
                      </Avatar>
                      
                      <div className='flex-1 min-w-0'>
                        <div className='flex items-center gap-2 mb-1'>
                          <h4 className='font-medium truncate'>{profile.title}</h4>
                          {profile.is_featured && (
                            <Star className='w-4 h-4 text-yellow-600' />
                          )}
                          <div className='flex items-center gap-1'>
                            <Star className='w-4 h-4 text-yellow-500' />
                            <span className='text-sm font-medium'>{profile.rating.toFixed(1)}</span>
                            <span className='text-xs text-muted-foreground'>({profile.total_rating_count})</span>
                          </div>
                        </div>
                        
                        <p className='text-sm text-muted-foreground mb-2'>
                          {profile.user?.display_name} • {profile.user?.role}
                        </p>
                        
                        <p className='text-sm text-muted-foreground mb-2 line-clamp-2'>
                          {profile.description}
                        </p>
                        
                        <div className='flex flex-wrap gap-1 mb-2'>
                          {profile.expertise_areas.slice(0, 4).map((area) => (
                            <Badge key={area} variant='outline' className='text-xs'>
                              {area}
                            </Badge>
                          ))}
                          {profile.expertise_areas.length > 4 && (
                            <Badge variant='outline' className='text-xs'>
                              +{profile.expertise_areas.length - 4} more
                            </Badge>
                          )}
                        </div>
                        
                        <div className='flex items-center gap-4 text-sm text-muted-foreground'>
                          {profile.hourly_rate && (
                            <div className='flex items-center gap-1'>
                              <DollarSign className='w-4 h-4' />
                              <span>{formatCurrency(profile.hourly_rate, profile.currency)}/hour</span>
                            </div>
                          )}
                          <div className='flex items-center gap-1'>
                            <Clock className='w-4 h-4' />
                            <span>{profile.session_duration_minutes} min sessions</span>
                          </div>
                          <div className='flex items-center gap-1'>
                            <Users className='w-4 h-4' />
                            <span>{profile.total_sessions} sessions completed</span>
                          </div>
                        </div>
                      </div>
                      
                      <div className='flex flex-col gap-2'>
                        <Button
                          variant='outline'
                          size='sm'
                          onClick={() => {
                            setSelectedProfile(profile);
                            setShowAvailability(true);
                          }}
                        >
                          <Calendar className='w-4 h-4 mr-1' />
                          View Availability
                        </Button>
                        
                        <Button
                          variant='outline'
                          size='sm'
                          onClick={() => {
                            setSelectedProfile(profile);
                            setShowBookingForm(true);
                          }}
                        >
                          <MessageSquare className='w-4 h-4 mr-1' />
                          Send Request
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))
            )}
          </div>
        </div>
      )}

      {/* Sessions Tab */}
      {activeTab === 'sessions' && (
        <div className='space-y-4'>
          {/* Session Stats */}
          <div className='grid grid-cols-2 md:grid-cols-4 gap-4'>
            <Card>
              <CardContent className='p-4 text-center'>
                <div className='text-2xl font-bold text-blue-600'>{getSessionStats().total}</div>
                <div className='text-xs text-muted-foreground'>Total Sessions</div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className='p-4 text-center'>
                <div className='text-2xl font-bold text-yellow-600'>{getSessionStats().scheduled}</div>
                <div className='text-xs text-muted-foreground'>Scheduled</div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className='p-4 text-center'>
                <div className='text-2xl font-bold text-green-600'>{getSessionStats().completed}</div>
                <div className='text-xs text-muted-foreground'>Completed</div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className='p-4 text-center'>
                <div className='text-2xl font-bold text-red-600'>{getSessionStats().cancelled}</div>
                <div className='text-xs text-muted-foreground'>Cancelled</div>
              </CardContent>
            </Card>
          </div>

          {/* Sessions List */}
          <div className='space-y-2'>
            {sessions.map((session) => (
              <Card key={session.id}>
                <CardContent className='p-4'>
                  <div className='flex items-center gap-3'>
                    <Avatar className='w-10 h-10'>
                      <AvatarImage src={session.mentorship_profile?.user?.avatar} />
                      <AvatarFallback>
                        {session.mentorship_profile?.user?.display_name.charAt(0)}
                      </AvatarFallback>
                    </Avatar>
                    <div className='flex-1'>
                      <h5 className='font-medium'>{session.title}</h5>
                      <p className='text-sm text-muted-foreground'>
                        {session.mentorship_profile?.user?.display_name} • {session.session_type}
                      </p>
                      <p className='text-xs text-muted-foreground'>
                        {formatDate(session.scheduled_date)} at {formatTime(session.start_time)}
                      </p>
                    </div>
                    <Badge variant='outline' className='text-xs'>
                      {session.status}
                    </Badge>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      )}

      {/* Booking Form Modal */}
      {showBookingForm && selectedProfile && (
        <Card>
          <CardHeader>
            <CardTitle>Send Mentorship Request</CardTitle>
          </CardHeader>
          <CardContent className='space-y-4'>
            <div className='flex items-center gap-3 p-3 bg-gray-50 rounded-lg'>
              <Avatar className='w-10 h-10'>
                <AvatarImage src={selectedProfile.user?.avatar} />
                <AvatarFallback>
                  {selectedProfile.user?.display_name.charAt(0)}
                </AvatarFallback>
              </Avatar>
              <div>
                <h4 className='font-medium'>{selectedProfile.title}</h4>
                <p className='text-sm text-muted-foreground'>
                  {selectedProfile.user?.display_name}
                </p>
              </div>
            </div>
            
            <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
              <div>
                <Label htmlFor='request_type'>Request Type</Label>
                <select
                  id='request_type'
                  value={newRequest.request_type}
                  onChange={(e) => setNewRequest(prev => ({ ...prev, request_type: e.target.value as any }))}
                  className='w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500'
                >
                  {sessionTypes.map((type) => (
                    <option key={type.value} value={type.value}>{type.label}</option>
                  ))}
                </select>
              </div>
              <div>
                <Label htmlFor='duration_minutes'>Duration (minutes)</Label>
                <Input
                  id='duration_minutes'
                  type='number'
                  value={newRequest.duration_minutes}
                  onChange={(e) => setNewRequest(prev => ({ ...prev, duration_minutes: parseInt(e.target.value) || 60 }))}
                  placeholder='60'
                />
              </div>
            </div>
            
            <div>
              <Label htmlFor='title'>Request Title *</Label>
              <Input
                id='title'
                value={newRequest.title}
                onChange={(e) => setNewRequest(prev => ({ ...prev, title: e.target.value }))}
                placeholder='Enter request title'
              />
            </div>
            
            <div>
              <Label htmlFor='description'>Description *</Label>
              <Textarea
                id='description'
                value={newRequest.description}
                onChange={(e) => setNewRequest(prev => ({ ...prev, description: e.target.value }))}
                placeholder='Describe what you hope to achieve in this mentorship session...'
                rows={4}
              />
            </div>
            
            <div className='flex gap-2'>
              <Button onClick={handleCreateRequest}>
                Send Request
              </Button>
              <Button variant='outline' onClick={() => setShowBookingForm(false)}>
                Cancel
              </Button>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Availability Modal */}
      {showAvailability && selectedProfile && (
        <Card>
          <CardHeader>
            <CardTitle>Mentor Availability</CardTitle>
          </CardHeader>
          <CardContent>
            <div className='space-y-4'>
              <div className='flex items-center gap-3 p-3 bg-gray-50 rounded-lg'>
                <Avatar className='w-10 h-10'>
                  <AvatarImage src={selectedProfile.user?.avatar} />
                  <AvatarFallback>
                    {selectedProfile.user?.display_name.charAt(0)}
                  </AvatarFallback>
                </Avatar>
                <div>
                  <h4 className='font-medium'>{selectedProfile.title}</h4>
                  <p className='text-sm text-muted-foreground'>
                    {selectedProfile.user?.display_name}
                  </p>
                </div>
              </div>
              
              <div className='space-y-2'>
                {availability.map((slot) => (
                  <div key={slot.id} className='flex items-center justify-between p-3 border rounded-lg'>
                    <div className='flex items-center gap-3'>
                      <Calendar className='w-5 h-5 text-blue-600' />
                      <div>
                        <p className='font-medium'>
                          {['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'][slot.day_of_week]}
                        </p>
                        <p className='text-sm text-muted-foreground'>
                          {formatTime(slot.start_time)} - {formatTime(slot.end_time)}
                        </p>
                      </div>
                    </div>
                    <Badge variant='outline' className='text-xs'>
                      {slot.is_recurring ? 'Recurring' : 'One-time'}
                    </Badge>
                  </div>
                ))}
              </div>
              
              <div className='flex gap-2'>
                <Button onClick={() => setShowAvailability(false)}>
                  Close
                </Button>
                <Button variant='outline' onClick={() => {
                  setShowAvailability(false);
                  setShowBookingForm(true);
                }}>
                  Send Request
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
};
