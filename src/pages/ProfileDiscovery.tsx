import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '../components/ui/button';
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from '../components/ui/card';
import { Badge } from '../components/ui/badge';
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from '../components/ui/tabs';
import {
  Search,
  Users,
  Star,
  TrendingUp,
  Globe,
  Award,
  Building,
  GraduationCap,
} from 'lucide-react';

// Import profile components
import { ProfileSearch } from '../components/profiles/ProfileSearch';
import { useFeaturedProfiles } from '../hooks/useProfile';
import { PublicProfile } from '../lib/auth';

const ProfileDiscovery: React.FC = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('search');

  const { profiles: featuredProfiles, loading: featuredLoading } =
    useFeaturedProfiles(12);

  const handleProfileSelect = (profile: PublicProfile) => {
    navigate(`/profile/${profile.id}`);
  };

  const getRoleBadgeColor = (role: string) => {
    switch (role) {
      case 'student':
        return 'bg-blue-100 text-blue-800 border-blue-200';
      case 'professor':
        return 'bg-purple-100 text-purple-800 border-purple-200';
      case 'university':
        return 'bg-green-100 text-green-800 border-green-200';
      default:
        return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const getInitials = (firstName: string, lastName: string) => {
    return `${firstName.charAt(0)}${lastName.charAt(0)}`.toUpperCase();
  };

  return (
    <div className='container mx-auto px-4 py-8 space-y-8'>
      {/* Header */}
      <div className='text-center space-y-4'>
        <h1 className='text-3xl font-bold'>Discover People</h1>
        <p className='text-muted-foreground max-w-2xl mx-auto'>
          Connect with students, professors, and universities from around the
          world. Find mentors, collaborators, and opportunities that match your
          interests.
        </p>
      </div>

      {/* Quick Stats */}
      <div className='grid grid-cols-1 md:grid-cols-4 gap-4'>
        <Card>
          <CardContent className='p-6 text-center'>
            <Users className='w-8 h-8 mx-auto mb-2 text-blue-600' />
            <div className='text-2xl font-bold'>2,500+</div>
            <div className='text-sm text-muted-foreground'>Active Users</div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className='p-6 text-center'>
            <Building className='w-8 h-8 mx-auto mb-2 text-green-600' />
            <div className='text-2xl font-bold'>150+</div>
            <div className='text-sm text-muted-foreground'>Universities</div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className='p-6 text-center'>
            <GraduationCap className='w-8 h-8 mx-auto mb-2 text-purple-600' />
            <div className='text-2xl font-bold'>1,200+</div>
            <div className='text-sm text-muted-foreground'>Professors</div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className='p-6 text-center'>
            <Globe className='w-8 h-8 mx-auto mb-2 text-orange-600' />
            <div className='text-2xl font-bold'>45+</div>
            <div className='text-sm text-muted-foreground'>Countries</div>
          </CardContent>
        </Card>
      </div>

      {/* Main Content */}
      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList className='grid w-full grid-cols-3'>
          <TabsTrigger value='search'>Search Profiles</TabsTrigger>
          <TabsTrigger value='featured'>Featured</TabsTrigger>
          <TabsTrigger value='trending'>Trending</TabsTrigger>
        </TabsList>

        <TabsContent value='search' className='space-y-6'>
          <ProfileSearch
            onProfileSelect={handleProfileSelect}
            showFilters={true}
            limit={20}
          />
        </TabsContent>

        <TabsContent value='featured' className='space-y-6'>
          <div className='text-center space-y-2'>
            <h2 className='text-2xl font-semibold'>Featured Profiles</h2>
            <p className='text-muted-foreground'>
              Discover verified professionals and institutions making an impact
            </p>
          </div>

          {featuredLoading ? (
            <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4'>
              {[...Array(6)].map((_, i) => (
                <FeaturedProfileCardSkeleton key={i} />
              ))}
            </div>
          ) : (
            <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4'>
              {featuredProfiles.map((profile) => (
                <FeaturedProfileCard
                  key={profile.id}
                  profile={profile}
                  onClick={() => handleProfileSelect(profile)}
                />
              ))}
            </div>
          )}

          {!featuredLoading && featuredProfiles.length === 0 && (
            <Card>
              <CardContent className='p-6'>
                <div className='text-center text-muted-foreground'>
                  <Star className='w-12 h-12 mx-auto mb-4 opacity-50' />
                  <p>No featured profiles available at the moment.</p>
                  <p className='text-sm'>Check back later for updates!</p>
                </div>
              </CardContent>
            </Card>
          )}
        </TabsContent>

        <TabsContent value='trending' className='space-y-6'>
          <div className='text-center space-y-2'>
            <h2 className='text-2xl font-semibold'>Trending Profiles</h2>
            <p className='text-muted-foreground'>
              Most viewed and connected profiles this week
            </p>
          </div>

          <Card>
            <CardContent className='p-6'>
              <div className='text-center text-muted-foreground'>
                <TrendingUp className='w-12 h-12 mx-auto mb-4 opacity-50' />
                <p>Trending profiles feature coming soon!</p>
                <p className='text-sm'>
                  This will show the most popular profiles based on views and
                  connections.
                </p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      {/* Call to Action */}
      <Card className='bg-gradient-to-r from-blue-500 to-purple-600 text-white'>
        <CardContent className='p-8 text-center'>
          <h2 className='text-2xl font-bold mb-4'>Ready to Connect?</h2>
          <p className='text-blue-100 mb-6 max-w-2xl mx-auto'>
            Join thousands of students, professors, and universities already
            using EdFellow Connect Hub to build meaningful academic and
            professional relationships.
          </p>
          <div className='flex flex-col sm:flex-row gap-4 justify-center'>
            <Button
              size='lg'
              variant='secondary'
              onClick={() => navigate('/signup')}
            >
              Create Your Profile
            </Button>
            <Button
              size='lg'
              variant='outline'
              className='border-white text-white hover:bg-white hover:text-blue-600'
              onClick={() => navigate('/features')}
            >
              Learn More
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

// Featured Profile Card Component
const FeaturedProfileCard: React.FC<{
  profile: PublicProfile;
  onClick: () => void;
}> = ({ profile, onClick }) => {
  const getInitials = (firstName: string, lastName: string) => {
    return `${firstName.charAt(0)}${lastName.charAt(0)}`.toUpperCase();
  };

  const getRoleBadgeColor = (role: string) => {
    switch (role) {
      case 'student':
        return 'bg-blue-100 text-blue-800 border-blue-200';
      case 'professor':
        return 'bg-purple-100 text-purple-800 border-purple-200';
      case 'university':
        return 'bg-green-100 text-green-800 border-green-200';
      default:
        return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  return (
    <Card
      className='cursor-pointer hover:shadow-lg transition-all duration-200 hover:scale-105'
      onClick={onClick}
    >
      <CardContent className='p-6'>
        <div className='flex items-start gap-4'>
          <div className='w-16 h-16 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center text-white font-bold text-lg'>
            {profile.avatar ? (
              <img
                src={profile.avatar}
                alt={profile.display_name}
                className='w-16 h-16 rounded-full object-cover'
              />
            ) : (
              getInitials(profile.first_name, profile.last_name)
            )}
          </div>

          <div className='flex-1 min-w-0'>
            <div className='flex items-center gap-2 mb-2'>
              <h3 className='font-semibold truncate'>{profile.display_name}</h3>
              <Badge className={`text-xs ${getRoleBadgeColor(profile.role)}`}>
                {profile.role.charAt(0).toUpperCase() + profile.role.slice(1)}
              </Badge>
            </div>

            {profile.bio && (
              <p className='text-sm text-muted-foreground line-clamp-2 mb-3'>
                {profile.bio}
              </p>
            )}

            <div className='space-y-1 text-xs text-muted-foreground'>
              {profile.university && (
                <div className='flex items-center gap-1'>
                  <GraduationCap className='w-3 h-3' />
                  <span className='truncate'>{profile.university}</span>
                </div>
              )}

              {profile.institution && (
                <div className='flex items-center gap-1'>
                  <Building className='w-3 h-3' />
                  <span className='truncate'>{profile.institution}</span>
                </div>
              )}
            </div>

            <div className='flex items-center gap-4 mt-3 text-xs text-muted-foreground'>
              <div className='flex items-center gap-1'>
                <Star className='w-3 h-3' />
                <span>{profile.profile_views} views</span>
              </div>
              <div className='flex items-center gap-1'>
                <Users className='w-3 h-3' />
                <span>{profile.connections} connections</span>
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

// Featured Profile Card Skeleton
const FeaturedProfileCardSkeleton: React.FC = () => {
  return (
    <Card>
      <CardContent className='p-6'>
        <div className='flex items-start gap-4'>
          <div className='w-16 h-16 bg-gray-200 rounded-full animate-pulse' />
          <div className='flex-1 space-y-2'>
            <div className='h-5 w-3/4 bg-gray-200 rounded animate-pulse' />
            <div className='h-4 w-full bg-gray-200 rounded animate-pulse' />
            <div className='h-4 w-2/3 bg-gray-200 rounded animate-pulse' />
            <div className='flex gap-4 mt-3'>
              <div className='h-3 w-16 bg-gray-200 rounded animate-pulse' />
              <div className='h-3 w-20 bg-gray-200 rounded animate-pulse' />
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default ProfileDiscovery;
