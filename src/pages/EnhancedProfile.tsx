import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { useToast } from '../hooks/use-toast';
import { Button } from '../components/ui/button';
import { Card, CardContent } from '../components/ui/card';
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from '../components/ui/tabs';
import { Badge } from '../components/ui/badge';
import {
  ArrowLeft,
  Settings,
  MessageSquare,
  Users,
  Star,
  Share2,
  MoreVertical,
  Edit,
  Eye,
  EyeOff,
  X,
} from 'lucide-react';

// Import new enhanced profile components
import { ProfileHeader } from '../components/profiles/ProfileHeader';
import { ProfileCompletion } from '../components/profiles/ProfileCompletion';
import { ProfileSections } from '../components/profiles/ProfileSections';
import { ProfileSearch } from '../components/profiles/ProfileSearch';
import { useProfile } from '../hooks/useProfile';
import { PublicProfile } from '../lib/api/profiles';

const EnhancedProfile: React.FC = () => {
  const { userId } = useParams<{ userId?: string }>();
  const navigate = useNavigate();
  const { user } = useAuth();
  const { toast } = useToast();

  const [activeTab, setActiveTab] = useState('overview');
  const [showEditModal, setShowEditModal] = useState(false);
  const [showPrivacySettings, setShowPrivacySettings] = useState(false);

  // Determine if this is the current user's profile
  const isOwnProfile = !userId || userId === user?.id;
  const targetUserId = userId || user?.id;

  const { profile, publicProfile, loading, error } = useProfile(targetUserId);

  if (!targetUserId) {
    return (
      <div className='container mx-auto px-4 py-8'>
        <Card>
          <CardContent className='p-6'>
            <div className='text-center text-muted-foreground'>
              Please log in to view profiles.
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  if (loading) {
    return <ProfileLoadingSkeleton />;
  }

  if (error) {
    return (
      <div className='container mx-auto px-4 py-8'>
        <Card>
          <CardContent className='p-6'>
            <div className='text-center text-red-600'>
              Error loading profile: {error}
            </div>
            <div className='text-center mt-4'>
              <Button onClick={() => navigate(-1)} variant='outline'>
                <ArrowLeft className='w-4 h-4 mr-2' />
                Go Back
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  const displayData = isOwnProfile ? profile : publicProfile;

  if (!displayData) {
    return (
      <div className='container mx-auto px-4 py-8'>
        <Card>
          <CardContent className='p-6'>
            <div className='text-center text-muted-foreground'>
              Profile not found.
            </div>
            <div className='text-center mt-4'>
              <Button onClick={() => navigate(-1)} variant='outline'>
                <ArrowLeft className='w-4 h-4 mr-2' />
                Go Back
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  const handleEditSection = (section: string, data?: any) => {
    // Handle editing different profile sections
    console.log('Edit section:', section, data);
    setShowEditModal(true);
    // You can implement specific edit modals for different sections
  };

  const handleCompleteAction = (action: string) => {
    // Handle profile completion actions
    console.log('Complete action:', action);
    setShowEditModal(true);
    // You can implement specific completion actions
  };

  // Helper function to get the correct ID
  const getDisplayId = () => {
    if ('id' in displayData) return displayData.id;
    if ('uid' in displayData) return displayData.uid;
    return '';
  };

  // Helper function to get the correct display name
  const getDisplayName = () => {
    if ('display_name' in displayData) return displayData.display_name;
    if ('displayName' in displayData) return displayData.displayName;
    return '';
  };

  // Helper function to get profile views
  const getProfileViews = () => {
    if ('profile_views' in displayData) return displayData.profile_views || 0;
    if ('profileViews' in displayData) return displayData.profileViews || 0;
    return 0;
  };

  // Helper function to get created date
  const getCreatedDate = () => {
    if ('created_at' in displayData) return displayData.created_at;
    if ('createdAt' in displayData) return displayData.createdAt;
    return '';
  };

  // Helper function to get verification status
  const getVerificationStatus = () => {
    if ('verification_status' in displayData)
      return displayData.verification_status;
    if ('verificationStatus' in displayData)
      return displayData.verificationStatus;
    return undefined;
  };

  const handleMessage = () => {
    // Navigate to messaging or open message modal
    console.log('Send message to:', getDisplayId());
    toast({
      title: 'Feature Coming Soon',
      description: 'Messaging functionality will be available soon.',
    });
  };

  const handleConnect = () => {
    // Handle connection request
    console.log('Connect with:', getDisplayId());
    toast({
      title: 'Feature Coming Soon',
      description: 'Connection requests will be available soon.',
    });
  };

  const handleFollow = () => {
    // Handle follow action
    console.log('Follow:', getDisplayId());
    toast({
      title: 'Feature Coming Soon',
      description: 'Follow functionality will be available soon.',
    });
  };

  const handleShare = () => {
    // Share profile
    if (navigator.share) {
      navigator.share({
        title: `${getDisplayName()}'s Profile`,
        text: `Check out ${getDisplayName()}'s profile on EdFellow Connect Hub`,
        url: window.location.href,
      });
    } else {
      // Fallback to copying URL
      navigator.clipboard.writeText(window.location.href);
      toast({
        title: 'Link Copied',
        description: 'Profile link copied to clipboard.',
      });
    }
  };

  return (
    <div className='container mx-auto px-4 py-8 space-y-6'>
      {/* Back Button */}
      <div className='flex items-center gap-4'>
        <Button
          variant='ghost'
          onClick={() => navigate(-1)}
          className='flex items-center gap-2'
        >
          <ArrowLeft className='w-4 h-4' />
          Back
        </Button>

        {/* Profile Actions */}
        <div className='flex items-center gap-2 ml-auto'>
          {!isOwnProfile && (
            <>
              <Button variant='outline' size='sm' onClick={handleMessage}>
                <MessageSquare className='w-4 h-4 mr-2' />
                Message
              </Button>
              <Button variant='outline' size='sm' onClick={handleConnect}>
                <Users className='w-4 h-4 mr-2' />
                Connect
              </Button>
            </>
          )}

          <Button variant='outline' size='sm' onClick={handleShare}>
            <Share2 className='w-4 h-4 mr-2' />
            Share
          </Button>

          {isOwnProfile && (
            <Button
              variant='outline'
              size='sm'
              onClick={() => setShowEditModal(true)}
            >
              <Edit className='w-4 h-4 mr-2' />
              Edit Profile
            </Button>
          )}
        </div>
      </div>

      {/* Profile Header */}
      <ProfileHeader
        userId={targetUserId}
        isOwnProfile={isOwnProfile}
        onEdit={() => setShowEditModal(true)}
        onMessage={handleMessage}
        onConnect={handleConnect}
        onFollow={handleFollow}
      />

      {/* Profile Content */}
      <div className='grid grid-cols-1 lg:grid-cols-3 gap-6'>
        {/* Main Content */}
        <div className='lg:col-span-2 space-y-6'>
          <Tabs value={activeTab} onValueChange={setActiveTab}>
            <TabsList className='grid w-full grid-cols-3'>
              <TabsTrigger value='overview'>Overview</TabsTrigger>
              <TabsTrigger value='activity'>Activity</TabsTrigger>
              <TabsTrigger value='connections'>Connections</TabsTrigger>
            </TabsList>

            <TabsContent value='overview' className='space-y-6'>
              <ProfileSections
                userId={targetUserId}
                isOwnProfile={isOwnProfile}
                onEditSection={handleEditSection}
              />
            </TabsContent>

            <TabsContent value='activity' className='space-y-6'>
              <Card>
                <CardContent className='p-6'>
                  <div className='text-center text-muted-foreground'>
                    <div className='text-lg font-medium mb-2'>
                      Activity Feed
                    </div>
                    <p>Recent activity and posts will appear here.</p>
                    <p className='text-sm'>This feature is coming soon!</p>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value='connections' className='space-y-6'>
              <Card>
                <CardContent className='p-6'>
                  <div className='text-center text-muted-foreground'>
                    <div className='text-lg font-medium mb-2'>Connections</div>
                    <p>View and manage your professional connections.</p>
                    <p className='text-sm'>This feature is coming soon!</p>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>

        {/* Sidebar */}
        <div className='space-y-6'>
          {/* Profile Completion (only for own profile) */}
          {isOwnProfile && (
            <ProfileCompletion
              userId={targetUserId}
              onCompleteAction={handleCompleteAction}
            />
          )}

          {/* Profile Stats */}
          <Card>
            <CardContent className='p-6'>
              <h3 className='font-semibold mb-4'>Profile Statistics</h3>
              <div className='space-y-3'>
                <div className='flex justify-between'>
                  <span className='text-muted-foreground'>Profile Views</span>
                  <span className='font-medium'>{getProfileViews()}</span>
                </div>
                <div className='flex justify-between'>
                  <span className='text-muted-foreground'>Connections</span>
                  <span className='font-medium'>
                    {displayData.connections || 0}
                  </span>
                </div>
                <div className='flex justify-between'>
                  <span className='text-muted-foreground'>Endorsements</span>
                  <span className='font-medium'>
                    {displayData.endorsements || 0}
                  </span>
                </div>
                <div className='flex justify-between'>
                  <span className='text-muted-foreground'>Member Since</span>
                  <span className='font-medium'>
                    {getCreatedDate()
                      ? new Date(getCreatedDate()).toLocaleDateString()
                      : 'N/A'}
                  </span>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Verification Status */}
          {getVerificationStatus() && (
            <Card>
              <CardContent className='p-6'>
                <h3 className='font-semibold mb-4'>Verification Status</h3>
                <div className='flex items-center gap-2'>
                  {getVerificationStatus() === 'verified' ? (
                    <>
                      <Badge className='bg-green-100 text-green-800'>
                        Verified
                      </Badge>
                      <span className='text-sm text-muted-foreground'>
                        This profile has been verified
                      </span>
                    </>
                  ) : getVerificationStatus() === 'pending' ? (
                    <>
                      <Badge className='bg-yellow-100 text-yellow-800'>
                        Pending
                      </Badge>
                      <span className='text-sm text-muted-foreground'>
                        Verification in progress
                      </span>
                    </>
                  ) : (
                    <>
                      <Badge className='bg-gray-100 text-gray-800'>
                        Not Verified
                      </Badge>
                      <span className='text-sm text-muted-foreground'>
                        Verification not requested
                      </span>
                    </>
                  )}
                </div>
              </CardContent>
            </Card>
          )}

          {/* Similar Profiles */}
          <Card>
            <CardContent className='p-6'>
              <h3 className='font-semibold mb-4'>Similar Profiles</h3>
              <div className='text-center text-muted-foreground'>
                <p className='text-sm'>Discover similar profiles</p>
                <p className='text-xs'>This feature is coming soon!</p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Edit Profile Modal */}
      {showEditModal && (
        <div className='fixed inset-0 bg-black/50 flex items-center justify-center z-50'>
          <Card className='w-full max-w-2xl max-h-[90vh] overflow-y-auto'>
            <CardContent className='p-6'>
              <div className='flex items-center justify-between mb-4'>
                <h2 className='text-xl font-semibold'>Edit Profile</h2>
                <Button
                  variant='ghost'
                  size='sm'
                  onClick={() => setShowEditModal(false)}
                >
                  <X className='w-4 h-4' />
                </Button>
              </div>
              <div className='text-center text-muted-foreground'>
                <p>Profile editing functionality will be available soon.</p>
                <p className='text-sm'>
                  This will include all profile sections and settings.
                </p>
              </div>
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  );
};

// Loading Skeleton Component
const ProfileLoadingSkeleton: React.FC = () => {
  return (
    <div className='container mx-auto px-4 py-8 space-y-6'>
      {/* Header Skeleton */}
      <Card className='overflow-hidden'>
        <div className='h-32 bg-gray-200 animate-pulse' />
        <div className='px-6 pb-6'>
          <div className='flex flex-col sm:flex-row sm:items-end sm:justify-between -mt-16 mb-6'>
            <div className='flex flex-col sm:flex-row sm:items-end gap-4'>
              <div className='w-24 h-24 bg-gray-200 rounded-full animate-pulse' />
              <div className='space-y-2'>
                <div className='h-8 w-48 bg-gray-200 rounded animate-pulse' />
                <div className='h-4 w-32 bg-gray-200 rounded animate-pulse' />
                <div className='h-4 w-64 bg-gray-200 rounded animate-pulse' />
              </div>
            </div>
          </div>
        </div>
      </Card>

      {/* Content Skeleton */}
      <div className='grid grid-cols-1 lg:grid-cols-3 gap-6'>
        <div className='lg:col-span-2 space-y-6'>
          {[...Array(3)].map((_, i) => (
            <Card key={i}>
              <CardContent className='p-6'>
                <div className='space-y-3'>
                  <div className='h-6 w-1/3 bg-gray-200 rounded animate-pulse' />
                  <div className='h-4 w-full bg-gray-200 rounded animate-pulse' />
                  <div className='h-4 w-2/3 bg-gray-200 rounded animate-pulse' />
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
        <div className='space-y-6'>
          {[...Array(2)].map((_, i) => (
            <Card key={i}>
              <CardContent className='p-6'>
                <div className='space-y-3'>
                  <div className='h-6 w-1/2 bg-gray-200 rounded animate-pulse' />
                  <div className='h-4 w-full bg-gray-200 rounded animate-pulse' />
                  <div className='h-4 w-3/4 bg-gray-200 rounded animate-pulse' />
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
};

export default EnhancedProfile;
