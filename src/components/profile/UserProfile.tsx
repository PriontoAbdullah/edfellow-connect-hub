import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { CountryFlag } from '@/components/ui/CountryFlag';
import { getCountryCode } from '@/lib/countries';
import { useToast } from '@/hooks/use-toast';
import { useAuth } from '@/contexts/AuthContext';
import {
  getUserProfileById,
  updateProfileViews,
  UserProfileData,
} from '@/lib/api/users';
import {
  ArrowLeft,
  MessageSquare,
  UserPlus,
  Mail,
  MapPin,
  Building,
  User,
  GraduationCap,
  Star,
  Eye,
  Globe,
  Calendar,
  Award,
  BookOpen,
  Users,
  Briefcase,
  Heart,
  Share2,
  ExternalLink,
} from 'lucide-react';

const UserProfile = () => {
  const { userId } = useParams<{ userId: string }>();
  const navigate = useNavigate();
  const { toast } = useToast();
  const { userData } = useAuth();
  const [profileData, setProfileData] = useState<UserProfileData | null>(null);
  const [loading, setLoading] = useState(true);
  const [isConnected, setIsConnected] = useState(false);

  useEffect(() => {
    console.log('UserProfile useEffect - userId:', userId);
    if (userId) {
      loadUserProfile();
    }
  }, [userId]);

  const loadUserProfile = async () => {
    if (!userId) return;

    console.log('Loading user profile for userId:', userId);

    try {
      setLoading(true);

      // Fetch user profile from database
      const { data, error } = await getUserProfileById(userId);

      console.log('API response:', { data, error });

      if (error) {
        console.error('Error loading user profile:', error);
        toast({
          title: 'Error',
          description: error,
          variant: 'destructive',
        });
        setProfileData(null);
        return;
      }

      if (!data) {
        console.log('No user data found');
        setProfileData(null);
        return;
      }

      console.log('Setting profile data:', data);
      setProfileData(data);

      // Update profile views (don't await to avoid blocking UI)
      updateProfileViews(userId).catch(console.error);
    } catch (error) {
      console.error('Error loading user profile:', error);
      toast({
        title: 'Error',
        description: 'Failed to load user profile',
        variant: 'destructive',
      });
      setProfileData(null);
    } finally {
      setLoading(false);
    }
  };

  const handleConnect = async () => {
    try {
      // TODO: Implement connection logic
      toast({
        title: 'Connection Request Sent',
        description: 'Your connection request has been sent.',
      });
      setIsConnected(true);
    } catch (error) {
      console.error('Error sending connection request:', error);
      toast({
        title: 'Error',
        description: 'Failed to send connection request',
        variant: 'destructive',
      });
    }
  };

  const handleMessage = async () => {
    try {
      // TODO: Implement messaging logic
      navigate('/dashboard/chat');
    } catch (error) {
      console.error('Error starting conversation:', error);
      toast({
        title: 'Error',
        description: 'Failed to start conversation',
        variant: 'destructive',
      });
    }
  };

  if (loading) {
    return (
      <div className='min-h-screen bg-gray-50 flex items-center justify-center'>
        <div className='text-center'>
          <div className='animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4'></div>
          <p className='text-gray-600'>Loading profile...</p>
        </div>
      </div>
    );
  }

  if (!loading && !profileData) {
    return (
      <div className='min-h-screen bg-gray-50 flex items-center justify-center'>
        <div className='text-center'>
          <h1 className='text-2xl font-bold text-gray-900 mb-4'>
            Profile Not Found
          </h1>
          <p className='text-gray-600 mb-4'>
            The user profile you're looking for doesn't exist.
          </p>
          <p className='text-sm text-gray-500 mb-4'>User ID: {userId}</p>
          <Button onClick={() => navigate('/dashboard')}>
            <ArrowLeft className='h-4 w-4 mr-2' />
            Back to Dashboard
          </Button>
        </div>
      </div>
    );
  }

  const getRoleColor = (role: string) => {
    switch (role) {
      case 'student':
        return 'text-blue-600 bg-blue-100';
      case 'professor':
        return 'text-green-600 bg-green-100';
      case 'university':
        return 'text-orange-600 bg-orange-100';
      default:
        return 'text-gray-600 bg-gray-100';
    }
  };

  const getRoleIcon = (role: string) => {
    switch (role) {
      case 'student':
        return GraduationCap;
      case 'professor':
        return User;
      case 'university':
        return Building;
      default:
        return User;
    }
  };

  const RoleIcon = getRoleIcon(profileData.role);

  // Don't render if we don't have profile data yet
  if (!profileData) {
    return null;
  }

  return (
    <div className='min-h-screen bg-gray-50'>
      {/* Header */}
      <div className='bg-white border-b border-gray-200'>
        <div className='max-w-7xl mx-auto px-4 py-4'>
          <div className='flex items-center gap-4'>
            <Button
              variant='ghost'
              onClick={() => navigate('/dashboard')}
              className='flex items-center gap-2'
            >
              <ArrowLeft className='h-4 w-4' />
              Back
            </Button>
            <div className='flex-1'>
              <h1 className='text-2xl font-bold text-gray-900'>
                {profileData.display_name}
              </h1>
              <p className='text-gray-600'>
                {profileData.role === 'professor'
                  ? 'Professor'
                  : profileData.role === 'university'
                  ? 'University'
                  : 'Student'}
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className='max-w-7xl mx-auto px-4 py-6'>
        <div className='grid grid-cols-1 lg:grid-cols-3 gap-6'>
          {/* Main Content */}
          <div className='lg:col-span-2 space-y-6'>
            {/* Profile Header Card */}
            <Card className='bg-white border border-gray-200 shadow-sm'>
              <CardContent className='p-6'>
                <div className='flex items-start gap-4'>
                  <Avatar className='h-20 w-20'>
                    <AvatarImage
                      src={profileData.avatar}
                      alt={profileData.display_name}
                    />
                    <AvatarFallback className='bg-gray-100 text-gray-600 text-xl'>
                      {profileData.display_name
                        .split(' ')
                        .map((n) => n[0])
                        .join('')}
                    </AvatarFallback>
                  </Avatar>
                  <div className='flex-1'>
                    <div className='flex items-center gap-2 mb-2'>
                      <h2 className='text-2xl font-bold text-gray-900'>
                        {profileData.display_name}
                      </h2>
                      <Badge className={getRoleColor(profileData.role)}>
                        <RoleIcon className='h-3 w-3 mr-1' />
                        {profileData.role === 'professor'
                          ? 'Professor'
                          : profileData.role === 'university'
                          ? 'University'
                          : 'Student'}
                      </Badge>
                    </div>
                    <p className='text-gray-600 mb-2'>
                      {profileData.position}{' '}
                      {profileData.department && `in ${profileData.department}`}
                    </p>
                    <p className='text-gray-600 mb-2'>
                      {profileData.university}
                    </p>
                    {profileData.city && profileData.country && (
                      <div className='flex items-center gap-1 text-gray-600 mb-2'>
                        <MapPin className='h-4 w-4' />
                        <span>
                          {profileData.city}, {profileData.country}
                        </span>
                        {profileData.country && (
                          <CountryFlag
                            code={getCountryCode(profileData.country)}
                            size={16}
                            className='ml-1'
                          />
                        )}
                      </div>
                    )}
                    {profileData.bio && (
                      <p className='text-gray-700 mt-3'>{profileData.bio}</p>
                    )}
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* About Section */}
            <Card className='bg-white border border-gray-200 shadow-sm'>
              <CardHeader>
                <CardTitle className='text-lg font-semibold text-gray-900'>
                  About
                </CardTitle>
              </CardHeader>
              <CardContent className='space-y-4'>
                <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
                  <div>
                    <h4 className='font-medium text-gray-900 mb-1'>Role</h4>
                    <p className='text-gray-600'>
                      {profileData.role === 'professor'
                        ? 'Professor'
                        : profileData.role === 'university'
                        ? 'University Administrator'
                        : 'Student'}
                    </p>
                  </div>
                  <div>
                    <h4 className='font-medium text-gray-900 mb-1'>
                      University
                    </h4>
                    <p className='text-gray-600'>
                      {profileData.university || 'Not specified'}
                    </p>
                  </div>
                  <div>
                    <h4 className='font-medium text-gray-900 mb-1'>
                      Department
                    </h4>
                    <p className='text-gray-600'>
                      {profileData.department || 'Not specified'}
                    </p>
                  </div>
                  <div>
                    <h4 className='font-medium text-gray-900 mb-1'>Location</h4>
                    <p className='text-gray-600'>
                      {profileData.city && profileData.country
                        ? `${profileData.city}, ${profileData.country}`
                        : 'Not specified'}
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Sidebar */}
          <div className='space-y-6'>
            {/* Action Buttons */}
            <Card className='bg-white border border-gray-200 shadow-sm'>
              <CardContent className='p-4 space-y-3'>
                <Button
                  onClick={handleConnect}
                  disabled={isConnected}
                  className='w-full'
                >
                  <UserPlus className='h-4 w-4 mr-2' />
                  {isConnected ? 'Connection Sent' : 'Connect'}
                </Button>
                <Button
                  variant='outline'
                  onClick={handleMessage}
                  className='w-full'
                >
                  <MessageSquare className='h-4 w-4 mr-2' />
                  Message
                </Button>
                <Button variant='outline' className='w-full'>
                  <Share2 className='h-4 w-4 mr-2' />
                  Share Profile
                </Button>
              </CardContent>
            </Card>

            {/* Profile Stats */}
            <Card className='bg-white border border-gray-200 shadow-sm'>
              <CardHeader>
                <CardTitle className='text-lg font-semibold text-gray-900'>
                  Profile Stats
                </CardTitle>
              </CardHeader>
              <CardContent className='space-y-4'>
                <div className='flex items-center justify-between'>
                  <div className='flex items-center gap-2'>
                    <Eye className='h-4 w-4 text-gray-600' />
                    <span className='text-sm text-gray-600'>Profile Views</span>
                  </div>
                  <span className='font-semibold text-gray-900'>
                    {profileData.profile_views || 0}
                  </span>
                </div>
                <div className='flex items-center justify-between'>
                  <div className='flex items-center gap-2'>
                    <Star className='h-4 w-4 text-gray-600' />
                    <span className='text-sm text-gray-600'>Rating</span>
                  </div>
                  <div className='flex items-center gap-1'>
                    <span className='font-semibold text-gray-900'>
                      {profileData.rating || 0}
                    </span>
                    <Star className='h-4 w-4 text-yellow-400 fill-current' />
                  </div>
                </div>
                <div className='flex items-center justify-between'>
                  <div className='flex items-center gap-2'>
                    <Calendar className='h-4 w-4 text-gray-600' />
                    <span className='text-sm text-gray-600'>Joined</span>
                  </div>
                  <span className='font-semibold text-gray-900'>
                    {profileData.created_at
                      ? new Date(profileData.created_at).toLocaleDateString()
                      : 'Unknown'}
                  </span>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserProfile;
