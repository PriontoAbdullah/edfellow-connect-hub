import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import {
  Calendar,
  Clock,
  Plus,
  Edit,
  Trash2,
  Save,
  X,
  Check,
  AlertCircle,
  User,
  Users,
  BookOpen,
  MessageSquare,
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
  Sun,
  Moon,
  Cloud,
  CloudRain,
  Wind,
  Thermometer,
  Eye,
  EyeOff,
  Lock,
  Unlock,
  Star,
  StarOff,
  Heart as HeartIcon,
  HeartOff,
  Bookmark,
  BookmarkCheck,
  Flag,
  FlagOff,
  Zap as ZapIcon,
  ZapOff,
  Shield as ShieldIcon,
  ShieldOff,
  CheckCircle,
  XCircle,
  Minus,
  ArrowUp,
  ArrowDown,
  ArrowLeft,
  ArrowRight,
  ChevronUp,
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  RotateCcw,
  RotateCw,
  RefreshCw,
  RefreshCcw,
  Download,
  Upload,
  Send,
  Mail,
  Phone as PhoneIcon,
  Video as VideoIcon,
  MessageCircle,
  MessageSquare as MessageSquareIcon,
  Hash,
  AtSign,
  DollarSign,
  Percent,
  Hash as HashIcon,
  AtSign as AtSignIcon,
  DollarSign as DollarSignIcon,
  Percent as PercentIcon,
  Hash as HashIcon2,
  AtSign as AtSignIcon2,
  DollarSign as DollarSignIcon2,
  Percent as PercentIcon2,
} from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';
import { useToast } from '@/hooks/use-toast';
import {
  getMentorshipProfiles,
  createMentorshipProfile,
  updateMentorshipProfile,
  createMentorshipAvailability,
  getMentorshipAvailability,
  updateMentorshipAvailability,
  deleteMentorshipAvailability,
  type MentorshipProfile,
  type MentorshipAvailability,
} from '@/lib/api/mentorship';

interface ProfessorAvailabilityProps {
  compact?: boolean;
  onProfileSelect?: (profile: MentorshipProfile) => void;
}

interface AvailabilitySlot {
  day_of_week: number;
  start_time: string;
  end_time: string;
  timezone: string;
  is_recurring: boolean;
  is_active: boolean;
}

export const ProfessorAvailability: React.FC<ProfessorAvailabilityProps> = ({
  compact = false,
  onProfileSelect,
}) => {
  const { user } = useAuth();
  const { toast } = useToast();
  const [profile, setProfile] = useState<MentorshipProfile | null>(null);
  const [availability, setAvailability] = useState<MentorshipAvailability[]>(
    []
  );
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState<
    'profile' | 'availability' | 'calendar'
  >('profile');
  const [showProfileForm, setShowProfileForm] = useState(false);
  const [showAvailabilityForm, setShowAvailabilityForm] = useState(false);
  const [editingAvailability, setEditingAvailability] =
    useState<MentorshipAvailability | null>(null);
  const [newProfile, setNewProfile] = useState({
    title: '',
    description: '',
    expertise_areas: [] as string[],
    hourly_rate: 0,
    currency: 'USD',
    session_duration_minutes: 60,
    max_sessions_per_week: 10,
  });
  const [newAvailability, setNewAvailability] = useState<AvailabilitySlot>({
    day_of_week: 0,
    start_time: '09:00',
    end_time: '17:00',
    timezone: 'UTC',
    is_recurring: true,
    is_active: true,
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

  const daysOfWeek = [
    'Sunday',
    'Monday',
    'Tuesday',
    'Wednesday',
    'Thursday',
    'Friday',
    'Saturday',
  ];

  const timezones = [
    'UTC',
    'America/New_York',
    'America/Chicago',
    'America/Denver',
    'America/Los_Angeles',
    'Europe/London',
    'Europe/Paris',
    'Europe/Berlin',
    'Asia/Tokyo',
    'Asia/Shanghai',
    'Australia/Sydney',
  ];

  useEffect(() => {
    fetchProfile();
    fetchAvailability();
  }, []);

  const fetchProfile = async () => {
    if (!user) return;

    setLoading(true);
    try {
      const { data, error } = await getMentorshipProfiles();

      if (error) {
        console.error('Error fetching profile:', error);
        return;
      }

      // Find the user's own profile
      const userProfile = data?.find((p) => p.user_id === user.id);
      setProfile(userProfile || null);
    } catch (error) {
      console.error('Error fetching profile:', error);
    } finally {
      setLoading(false);
    }
  };

  const fetchAvailability = async () => {
    if (!profile) return;

    try {
      const { data, error } = await getMentorshipAvailability(profile.id);

      if (error) {
        console.error('Error fetching availability:', error);
        return;
      }

      setAvailability(data || []);
    } catch (error) {
      console.error('Error fetching availability:', error);
    }
  };

  const handleCreateProfile = async () => {
    if (!user) return;

    try {
      const { error } = await createMentorshipProfile(newProfile);

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
        description: 'Mentorship profile created successfully!',
      });

      setShowProfileForm(false);
      setNewProfile({
        title: '',
        description: '',
        expertise_areas: [],
        hourly_rate: 0,
        currency: 'USD',
        session_duration_minutes: 60,
        max_sessions_per_week: 10,
      });
      fetchProfile();
    } catch (error) {
      toast({
        title: 'Error',
        description: 'Failed to create mentorship profile',
        variant: 'destructive',
      });
    }
  };

  const handleUpdateProfile = async () => {
    if (!profile) return;

    try {
      const { error } = await updateMentorshipProfile(profile.id, profile);

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
        description: 'Mentorship profile updated successfully!',
      });

      fetchProfile();
    } catch (error) {
      toast({
        title: 'Error',
        description: 'Failed to update mentorship profile',
        variant: 'destructive',
      });
    }
  };

  const handleCreateAvailability = async () => {
    if (!profile) return;

    try {
      const { error } = await createMentorshipAvailability({
        mentorship_profile_id: profile.id,
        ...newAvailability,
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
        description: 'Availability slot created successfully!',
      });

      setShowAvailabilityForm(false);
      setNewAvailability({
        day_of_week: 0,
        start_time: '09:00',
        end_time: '17:00',
        timezone: 'UTC',
        is_recurring: true,
        is_active: true,
      });
      fetchAvailability();
    } catch (error) {
      toast({
        title: 'Error',
        description: 'Failed to create availability slot',
        variant: 'destructive',
      });
    }
  };

  const handleUpdateAvailability = async () => {
    if (!editingAvailability) return;

    try {
      const { error } = await updateMentorshipAvailability(
        editingAvailability.id,
        editingAvailability
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
        description: 'Availability slot updated successfully!',
      });

      setEditingAvailability(null);
      fetchAvailability();
    } catch (error) {
      toast({
        title: 'Error',
        description: 'Failed to update availability slot',
        variant: 'destructive',
      });
    }
  };

  const handleDeleteAvailability = async (availabilityId: string) => {
    if (!confirm('Are you sure you want to delete this availability slot?'))
      return;

    try {
      const { error } = await deleteMentorshipAvailability(availabilityId);

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
        description: 'Availability slot deleted successfully!',
      });

      fetchAvailability();
    } catch (error) {
      toast({
        title: 'Error',
        description: 'Failed to delete availability slot',
        variant: 'destructive',
      });
    }
  };

  const formatTime = (timeString: string) => {
    return new Date(`2000-01-01T${timeString}`).toLocaleTimeString('en-US', {
      hour: 'numeric',
      minute: '2-digit',
      hour12: true,
    });
  };

  const formatCurrency = (amount: number, currency: string) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: currency,
    }).format(amount);
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
          <h3 className='text-sm font-medium'>Availability</h3>
          <Badge variant='outline'>{availability.length}</Badge>
        </div>

        <div className='space-y-2'>
          {availability.slice(0, 3).map((slot) => (
            <div key={slot.id} className='p-3 border rounded-lg'>
              <div className='flex items-center gap-2 mb-1'>
                <Calendar className='w-4 h-4 text-blue-600' />
                <span className='text-sm font-medium'>
                  {daysOfWeek[slot.day_of_week]}
                </span>
                <Badge variant='outline' className='text-xs'>
                  {slot.is_recurring ? 'Recurring' : 'One-time'}
                </Badge>
              </div>
              <p className='text-xs text-muted-foreground'>
                {formatTime(slot.start_time)} - {formatTime(slot.end_time)}
              </p>
            </div>
          ))}
        </div>

        {availability.length > 3 && (
          <Button variant='outline' size='sm' className='w-full'>
            View All ({availability.length})
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
          <h3 className='text-lg font-semibold'>Professor Availability</h3>
          <p className='text-sm text-muted-foreground'>
            Manage your mentorship profile and availability
          </p>
        </div>
      </div>

      {/* Tabs */}
      <div className='flex gap-2'>
        {(['profile', 'availability', 'calendar'] as const).map((tab) => (
          <Button
            key={tab}
            variant={activeTab === tab ? 'default' : 'outline'}
            size='sm'
            onClick={() => setActiveTab(tab)}
          >
            {tab === 'profile' && <User className='w-4 h-4 mr-1' />}
            {tab === 'availability' && <Calendar className='w-4 h-4 mr-1' />}
            {tab === 'calendar' && <BarChart3 className='w-4 h-4 mr-1' />}
            <span className='capitalize'>{tab}</span>
          </Button>
        ))}
      </div>

      {/* Profile Tab */}
      {activeTab === 'profile' && (
        <div className='space-y-4'>
          {!profile ? (
            <Card>
              <CardContent className='p-6 text-center'>
                <User className='w-12 h-12 text-muted-foreground mx-auto mb-4' />
                <h3 className='text-lg font-medium mb-2'>
                  No mentorship profile
                </h3>
                <p className='text-muted-foreground mb-4'>
                  Create your mentorship profile to start offering sessions
                </p>
                <Button onClick={() => setShowProfileForm(true)}>
                  <Plus className='w-4 h-4 mr-2' />
                  Create Profile
                </Button>
              </CardContent>
            </Card>
          ) : (
            <div className='space-y-4'>
              <Card>
                <CardHeader>
                  <div className='flex items-center justify-between'>
                    <CardTitle>Mentorship Profile</CardTitle>
                    <Button
                      variant='outline'
                      size='sm'
                      onClick={() => setShowProfileForm(true)}
                    >
                      <Edit className='w-4 h-4 mr-1' />
                      Edit
                    </Button>
                  </div>
                </CardHeader>
                <CardContent className='space-y-4'>
                  <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
                    <div>
                      <Label>Title</Label>
                      <p className='text-sm font-medium'>{profile.title}</p>
                    </div>
                    <div>
                      <Label>Status</Label>
                      <Badge
                        variant={profile.is_available ? 'default' : 'secondary'}
                      >
                        {profile.is_available ? 'Available' : 'Unavailable'}
                      </Badge>
                    </div>
                    <div>
                      <Label>Hourly Rate</Label>
                      <p className='text-sm font-medium'>
                        {profile.hourly_rate
                          ? formatCurrency(
                              profile.hourly_rate,
                              profile.currency
                            )
                          : 'Not set'}
                      </p>
                    </div>
                    <div>
                      <Label>Session Duration</Label>
                      <p className='text-sm font-medium'>
                        {profile.session_duration_minutes} minutes
                      </p>
                    </div>
                    <div>
                      <Label>Max Sessions per Week</Label>
                      <p className='text-sm font-medium'>
                        {profile.max_sessions_per_week}
                      </p>
                    </div>
                    <div>
                      <Label>Rating</Label>
                      <div className='flex items-center gap-1'>
                        <Star className='w-4 h-4 text-yellow-500' />
                        <span className='text-sm font-medium'>
                          {profile.rating.toFixed(1)}
                        </span>
                        <span className='text-xs text-muted-foreground'>
                          ({profile.total_rating_count} reviews)
                        </span>
                      </div>
                    </div>
                  </div>

                  <div>
                    <Label>Description</Label>
                    <p className='text-sm text-muted-foreground'>
                      {profile.description}
                    </p>
                  </div>

                  <div>
                    <Label>Expertise Areas</Label>
                    <div className='flex flex-wrap gap-1 mt-1'>
                      {profile.expertise_areas.map((area) => (
                        <Badge key={area} variant='outline' className='text-xs'>
                          {area}
                        </Badge>
                      ))}
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          )}
        </div>
      )}

      {/* Availability Tab */}
      {activeTab === 'availability' && (
        <div className='space-y-4'>
          <div className='flex items-center justify-between'>
            <h4 className='text-md font-medium'>Availability Slots</h4>
            <Button onClick={() => setShowAvailabilityForm(true)}>
              <Plus className='w-4 h-4 mr-2' />
              Add Slot
            </Button>
          </div>

          {availability.length === 0 ? (
            <Card>
              <CardContent className='p-6 text-center'>
                <Calendar className='w-12 h-12 text-muted-foreground mx-auto mb-4' />
                <h3 className='text-lg font-medium mb-2'>
                  No availability slots
                </h3>
                <p className='text-muted-foreground mb-4'>
                  Add your availability slots to let students know when you're
                  available
                </p>
                <Button onClick={() => setShowAvailabilityForm(true)}>
                  <Plus className='w-4 h-4 mr-2' />
                  Add First Slot
                </Button>
              </CardContent>
            </Card>
          ) : (
            <div className='space-y-2'>
              {availability.map((slot) => (
                <Card key={slot.id}>
                  <CardContent className='p-4'>
                    <div className='flex items-center justify-between'>
                      <div className='flex items-center gap-3'>
                        <Calendar className='w-5 h-5 text-blue-600' />
                        <div>
                          <p className='font-medium'>
                            {daysOfWeek[slot.day_of_week]}
                          </p>
                          <p className='text-sm text-muted-foreground'>
                            {formatTime(slot.start_time)} -{' '}
                            {formatTime(slot.end_time)}
                          </p>
                          <p className='text-xs text-muted-foreground'>
                            {slot.timezone} •{' '}
                            {slot.is_recurring ? 'Recurring' : 'One-time'}
                          </p>
                        </div>
                      </div>
                      <div className='flex items-center gap-2'>
                        <Badge
                          variant={slot.is_active ? 'default' : 'secondary'}
                        >
                          {slot.is_active ? 'Active' : 'Inactive'}
                        </Badge>
                        <Button
                          variant='outline'
                          size='sm'
                          onClick={() => setEditingAvailability(slot)}
                        >
                          <Edit className='w-4 h-4' />
                        </Button>
                        <Button
                          variant='outline'
                          size='sm'
                          onClick={() => handleDeleteAvailability(slot.id)}
                        >
                          <Trash2 className='w-4 h-4' />
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </div>
      )}

      {/* Calendar Tab */}
      {activeTab === 'calendar' && (
        <div className='space-y-4'>
          <Card>
            <CardContent className='p-6 text-center'>
              <BarChart3 className='w-12 h-12 text-muted-foreground mx-auto mb-4' />
              <h3 className='text-lg font-medium mb-2'>Calendar View</h3>
              <p className='text-muted-foreground'>
                Calendar integration and scheduling view coming soon
              </p>
            </CardContent>
          </Card>
        </div>
      )}

      {/* Profile Form Modal */}
      {showProfileForm && (
        <Card>
          <CardHeader>
            <CardTitle>
              {profile ? 'Edit Profile' : 'Create Mentorship Profile'}
            </CardTitle>
          </CardHeader>
          <CardContent className='space-y-4'>
            <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
              <div>
                <Label htmlFor='title'>Title *</Label>
                <Input
                  id='title'
                  value={profile?.title || newProfile.title}
                  onChange={(e) => {
                    if (profile) {
                      setProfile((prev) =>
                        prev ? { ...prev, title: e.target.value } : null
                      );
                    } else {
                      setNewProfile((prev) => ({
                        ...prev,
                        title: e.target.value,
                      }));
                    }
                  }}
                  placeholder='e.g., Senior Software Engineer'
                />
              </div>
              <div>
                <Label htmlFor='hourly_rate'>Hourly Rate</Label>
                <Input
                  id='hourly_rate'
                  type='number'
                  value={profile?.hourly_rate || newProfile.hourly_rate}
                  onChange={(e) => {
                    if (profile) {
                      setProfile((prev) =>
                        prev
                          ? {
                              ...prev,
                              hourly_rate: parseInt(e.target.value) || 0,
                            }
                          : null
                      );
                    } else {
                      setNewProfile((prev) => ({
                        ...prev,
                        hourly_rate: parseInt(e.target.value) || 0,
                      }));
                    }
                  }}
                  placeholder='50'
                />
              </div>
            </div>

            <div>
              <Label htmlFor='description'>Description *</Label>
              <Textarea
                id='description'
                value={profile?.description || newProfile.description}
                onChange={(e) => {
                  if (profile) {
                    setProfile((prev) =>
                      prev ? { ...prev, description: e.target.value } : null
                    );
                  } else {
                    setNewProfile((prev) => ({
                      ...prev,
                      description: e.target.value,
                    }));
                  }
                }}
                placeholder='Describe your expertise and what you can help students with...'
                rows={4}
              />
            </div>

            <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
              <div>
                <Label htmlFor='session_duration'>
                  Session Duration (minutes)
                </Label>
                <Input
                  id='session_duration'
                  type='number'
                  value={
                    profile?.session_duration_minutes ||
                    newProfile.session_duration_minutes
                  }
                  onChange={(e) => {
                    if (profile) {
                      setProfile((prev) =>
                        prev
                          ? {
                              ...prev,
                              session_duration_minutes:
                                parseInt(e.target.value) || 60,
                            }
                          : null
                      );
                    } else {
                      setNewProfile((prev) => ({
                        ...prev,
                        session_duration_minutes:
                          parseInt(e.target.value) || 60,
                      }));
                    }
                  }}
                  placeholder='60'
                />
              </div>
              <div>
                <Label htmlFor='max_sessions'>Max Sessions per Week</Label>
                <Input
                  id='max_sessions'
                  type='number'
                  value={
                    profile?.max_sessions_per_week ||
                    newProfile.max_sessions_per_week
                  }
                  onChange={(e) => {
                    if (profile) {
                      setProfile((prev) =>
                        prev
                          ? {
                              ...prev,
                              max_sessions_per_week:
                                parseInt(e.target.value) || 10,
                            }
                          : null
                      );
                    } else {
                      setNewProfile((prev) => ({
                        ...prev,
                        max_sessions_per_week: parseInt(e.target.value) || 10,
                      }));
                    }
                  }}
                  placeholder='10'
                />
              </div>
            </div>

            <div>
              <Label>Expertise Areas *</Label>
              <div className='grid grid-cols-2 md:grid-cols-3 gap-2 mt-2'>
                {expertiseAreas.map((area) => {
                  const isSelected = (
                    profile?.expertise_areas || newProfile.expertise_areas
                  ).includes(area);
                  return (
                    <button
                      key={area}
                      onClick={() => {
                        if (profile) {
                          const currentAreas = profile.expertise_areas;
                          const newAreas = isSelected
                            ? currentAreas.filter((a) => a !== area)
                            : [...currentAreas, area];
                          setProfile((prev) =>
                            prev ? { ...prev, expertise_areas: newAreas } : null
                          );
                        } else {
                          const currentAreas = newProfile.expertise_areas;
                          const newAreas = isSelected
                            ? currentAreas.filter((a) => a !== area)
                            : [...currentAreas, area];
                          setNewProfile((prev) => ({
                            ...prev,
                            expertise_areas: newAreas,
                          }));
                        }
                      }}
                      className={`p-2 text-sm border rounded-lg text-left transition-colors ${
                        isSelected
                          ? 'bg-blue-100 border-blue-300 text-blue-800'
                          : 'bg-white border-gray-300 text-gray-700 hover:bg-gray-50'
                      }`}
                    >
                      {area}
                    </button>
                  );
                })}
              </div>
            </div>

            <div className='flex gap-2'>
              <Button
                onClick={profile ? handleUpdateProfile : handleCreateProfile}
              >
                {profile ? 'Update Profile' : 'Create Profile'}
              </Button>
              <Button
                variant='outline'
                onClick={() => setShowProfileForm(false)}
              >
                Cancel
              </Button>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Availability Form Modal */}
      {(showAvailabilityForm || editingAvailability) && (
        <Card>
          <CardHeader>
            <CardTitle>
              {editingAvailability
                ? 'Edit Availability'
                : 'Add Availability Slot'}
            </CardTitle>
          </CardHeader>
          <CardContent className='space-y-4'>
            <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
              <div>
                <Label htmlFor='day_of_week'>Day of Week *</Label>
                <select
                  id='day_of_week'
                  value={
                    editingAvailability?.day_of_week ||
                    newAvailability.day_of_week
                  }
                  onChange={(e) => {
                    if (editingAvailability) {
                      setEditingAvailability((prev) =>
                        prev
                          ? { ...prev, day_of_week: parseInt(e.target.value) }
                          : null
                      );
                    } else {
                      setNewAvailability((prev) => ({
                        ...prev,
                        day_of_week: parseInt(e.target.value),
                      }));
                    }
                  }}
                  className='w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500'
                >
                  {daysOfWeek.map((day, index) => (
                    <option key={index} value={index}>
                      {day}
                    </option>
                  ))}
                </select>
              </div>
              <div>
                <Label htmlFor='timezone'>Timezone</Label>
                <select
                  id='timezone'
                  value={
                    editingAvailability?.timezone || newAvailability.timezone
                  }
                  onChange={(e) => {
                    if (editingAvailability) {
                      setEditingAvailability((prev) =>
                        prev ? { ...prev, timezone: e.target.value } : null
                      );
                    } else {
                      setNewAvailability((prev) => ({
                        ...prev,
                        timezone: e.target.value,
                      }));
                    }
                  }}
                  className='w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500'
                >
                  {timezones.map((tz) => (
                    <option key={tz} value={tz}>
                      {tz}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
              <div>
                <Label htmlFor='start_time'>Start Time *</Label>
                <Input
                  id='start_time'
                  type='time'
                  value={
                    editingAvailability?.start_time ||
                    newAvailability.start_time
                  }
                  onChange={(e) => {
                    if (editingAvailability) {
                      setEditingAvailability((prev) =>
                        prev ? { ...prev, start_time: e.target.value } : null
                      );
                    } else {
                      setNewAvailability((prev) => ({
                        ...prev,
                        start_time: e.target.value,
                      }));
                    }
                  }}
                />
              </div>
              <div>
                <Label htmlFor='end_time'>End Time *</Label>
                <Input
                  id='end_time'
                  type='time'
                  value={
                    editingAvailability?.end_time || newAvailability.end_time
                  }
                  onChange={(e) => {
                    if (editingAvailability) {
                      setEditingAvailability((prev) =>
                        prev ? { ...prev, end_time: e.target.value } : null
                      );
                    } else {
                      setNewAvailability((prev) => ({
                        ...prev,
                        end_time: e.target.value,
                      }));
                    }
                  }}
                />
              </div>
            </div>

            <div className='flex items-center gap-4'>
              <div className='flex items-center gap-2'>
                <input
                  type='checkbox'
                  id='is_recurring'
                  checked={
                    editingAvailability?.is_recurring ||
                    newAvailability.is_recurring
                  }
                  onChange={(e) => {
                    if (editingAvailability) {
                      setEditingAvailability((prev) =>
                        prev
                          ? { ...prev, is_recurring: e.target.checked }
                          : null
                      );
                    } else {
                      setNewAvailability((prev) => ({
                        ...prev,
                        is_recurring: e.target.checked,
                      }));
                    }
                  }}
                />
                <Label htmlFor='is_recurring'>Recurring weekly</Label>
              </div>
              <div className='flex items-center gap-2'>
                <input
                  type='checkbox'
                  id='is_active'
                  checked={
                    editingAvailability?.is_active || newAvailability.is_active
                  }
                  onChange={(e) => {
                    if (editingAvailability) {
                      setEditingAvailability((prev) =>
                        prev ? { ...prev, is_active: e.target.checked } : null
                      );
                    } else {
                      setNewAvailability((prev) => ({
                        ...prev,
                        is_active: e.target.checked,
                      }));
                    }
                  }}
                />
                <Label htmlFor='is_active'>Active</Label>
              </div>
            </div>

            <div className='flex gap-2'>
              <Button
                onClick={
                  editingAvailability
                    ? handleUpdateAvailability
                    : handleCreateAvailability
                }
              >
                {editingAvailability ? 'Update Slot' : 'Add Slot'}
              </Button>
              <Button
                variant='outline'
                onClick={() => {
                  setShowAvailabilityForm(false);
                  setEditingAvailability(null);
                }}
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
