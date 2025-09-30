import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { useToast } from '@/hooks/use-toast';
import { useAuth } from '@/contexts/AuthContext';
import {
  Users,
  MessageSquare,
  Crown,
  Star,
  Eye,
  BookOpen,
  GraduationCap,
  Building,
  Globe,
  Calendar,
  UserPlus,
  Lock,
  TrendingUp,
  Loader2,
  ArrowLeft,
  Share2,
  Heart,
} from 'lucide-react';
import { getGroupById, joinGroup, type Group } from '@/lib/api/groups';

const PublicGroupDetail = () => {
  const { groupId } = useParams<{ groupId: string }>();
  const navigate = useNavigate();
  const { user } = useAuth();
  const { toast } = useToast();

  // State management
  const [group, setGroup] = useState<Group | null>(null);
  const [loading, setLoading] = useState(true);
  const [joining, setJoining] = useState(false);

  // Load group data
  useEffect(() => {
    if (groupId) {
      loadGroupData();
    }
  }, [groupId]);

  const loadGroupData = async () => {
    if (!groupId) return;

    setLoading(true);
    try {
      const { data: groupData, error: groupError } = await getGroupById(
        groupId
      );

      if (groupError) {
        toast({
          title: 'Error',
          description: groupError,
          variant: 'destructive',
        });
        navigate('/');
        return;
      }

      setGroup(groupData);
    } catch (error) {
      console.error('Error loading group:', error);
      toast({
        title: 'Error',
        description: 'Failed to load group',
        variant: 'destructive',
      });
      navigate('/');
    } finally {
      setLoading(false);
    }
  };

  const handleJoinGroup = async () => {
    if (!user) {
      // Redirect to login
      navigate('/login', { state: { from: location } });
      return;
    }

    if (!group) return;

    setJoining(true);
    try {
      const { data, error } = await joinGroup(group.id);

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
        description: 'Join request sent successfully!',
      });

      // Redirect to dashboard groups after joining
      navigate('/dashboard/groups');
    } catch (error) {
      toast({
        title: 'Error',
        description: 'Failed to join group',
        variant: 'destructive',
      });
    } finally {
      setJoining(false);
    }
  };

  // Get category icon
  const getCategoryIcon = (category: string) => {
    switch (category) {
      case 'study':
        return GraduationCap;
      case 'research':
        return TrendingUp;
      case 'professional':
        return Building;
      case 'social':
        return Users;
      case 'academic':
        return Star;
      default:
        return Users;
    }
  };

  // Get category color
  const getCategoryColor = (category: string) => {
    switch (category) {
      case 'study':
        return 'bg-blue-100 text-blue-800';
      case 'research':
        return 'bg-green-100 text-green-800';
      case 'professional':
        return 'bg-purple-100 text-purple-800';
      case 'social':
        return 'bg-pink-100 text-pink-800';
      case 'academic':
        return 'bg-orange-100 text-orange-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  if (loading) {
    return (
      <div className='flex items-center justify-center min-h-screen'>
        <Loader2 className='h-8 w-8 animate-spin text-blue-600' />
        <span className='ml-2 text-gray-600'>Loading group...</span>
      </div>
    );
  }

  if (!group) {
    return (
      <div className='flex items-center justify-center min-h-screen'>
        <div className='text-center'>
          <Users className='h-12 w-12 text-gray-400 mx-auto mb-4' />
          <h3 className='text-lg font-medium text-gray-900 mb-2'>
            Group not found
          </h3>
          <p className='text-gray-600 mb-4'>
            The group you're looking for doesn't exist or has been removed.
          </p>
          <Button onClick={() => navigate('/')}>
            <ArrowLeft className='h-4 w-4 mr-2' />
            Back to Home
          </Button>
        </div>
      </div>
    );
  }

  const CategoryIcon = getCategoryIcon(group.category);

  return (
    <div className='min-h-screen bg-gray-50'>
      {/* Header */}
      <div className='bg-white border-b'>
        <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8'>
          <div className='flex items-center justify-between py-6'>
            <div className='flex items-center gap-4'>
              <Button variant='ghost' size='sm' onClick={() => navigate('/')}>
                <ArrowLeft className='h-4 w-4 mr-2' />
                Back
              </Button>

              <div className='flex items-center gap-3'>
                <Avatar className='h-12 w-12'>
                  <AvatarImage src={group.cover_image} />
                  <AvatarFallback className='text-lg font-semibold'>
                    {group.name.charAt(0).toUpperCase()}
                  </AvatarFallback>
                </Avatar>

                <div>
                  <h1 className='text-2xl font-bold text-gray-900'>
                    {group.name}
                  </h1>
                  <div className='flex items-center gap-2 mt-1'>
                    <Badge
                      className={`text-xs ${getCategoryColor(group.category)}`}
                    >
                      <CategoryIcon className='h-3 w-3 mr-1' />
                      {group.category}
                    </Badge>
                    {group.is_private ? (
                      <Lock className='h-4 w-4 text-gray-500' />
                    ) : (
                      <Globe className='h-4 w-4 text-gray-500' />
                    )}
                  </div>
                </div>
              </div>
            </div>

            <div className='flex items-center gap-3'>
              <Button variant='outline' size='sm'>
                <Share2 className='h-4 w-4 mr-2' />
                Share
              </Button>

              {user ? (
                <Button
                  onClick={handleJoinGroup}
                  disabled={joining}
                  className='bg-blue-600 hover:bg-blue-700'
                >
                  {joining ? (
                    <Loader2 className='h-4 w-4 mr-2 animate-spin' />
                  ) : (
                    <UserPlus className='h-4 w-4 mr-2' />
                  )}
                  {joining ? 'Joining...' : 'Join Group'}
                </Button>
              ) : (
                <Button
                  onClick={() =>
                    navigate('/login', { state: { from: location } })
                  }
                  className='bg-blue-600 hover:bg-blue-700'
                >
                  <UserPlus className='h-4 w-4 mr-2' />
                  Login to Join
                </Button>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8'>
        <div className='grid grid-cols-1 lg:grid-cols-3 gap-8'>
          {/* Main Content */}
          <div className='lg:col-span-2 space-y-6'>
            {/* About Section */}
            <Card>
              <CardHeader>
                <CardTitle className='flex items-center gap-2'>
                  <BookOpen className='h-5 w-5' />
                  About this Group
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className='text-gray-700 leading-relaxed'>
                  {group.description || 'No description available.'}
                </p>
              </CardContent>
            </Card>

            {/* Rules Section */}
            {group.rules && (
              <Card>
                <CardHeader>
                  <CardTitle className='flex items-center gap-2'>
                    <Crown className='h-5 w-5' />
                    Group Rules
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className='text-gray-700 leading-relaxed whitespace-pre-line'>
                    {group.rules}
                  </p>
                </CardContent>
              </Card>
            )}
          </div>

          {/* Sidebar */}
          <div className='space-y-6'>
            {/* Group Info */}
            <Card>
              <CardHeader>
                <CardTitle>Group Information</CardTitle>
              </CardHeader>
              <CardContent className='space-y-4'>
                <div className='flex items-center gap-3'>
                  <Users className='h-5 w-5 text-gray-500' />
                  <div>
                    <p className='text-sm font-medium'>Members</p>
                    <p className='text-sm text-gray-600'>
                      {group.member_count || 0} / {group.max_members}
                    </p>
                  </div>
                </div>

                {group.university && (
                  <div className='flex items-center gap-3'>
                    <GraduationCap className='h-5 w-5 text-gray-500' />
                    <div>
                      <p className='text-sm font-medium'>University</p>
                      <p className='text-sm text-gray-600'>
                        {group.university}
                      </p>
                    </div>
                  </div>
                )}

                {group.subject_area && (
                  <div className='flex items-center gap-3'>
                    <BookOpen className='h-5 w-5 text-gray-500' />
                    <div>
                      <p className='text-sm font-medium'>Subject Area</p>
                      <p className='text-sm text-gray-600'>
                        {group.subject_area}
                      </p>
                    </div>
                  </div>
                )}

                {group.department && (
                  <div className='flex items-center gap-3'>
                    <Building className='h-5 w-5 text-gray-500' />
                    <div>
                      <p className='text-sm font-medium'>Department</p>
                      <p className='text-sm text-gray-600'>
                        {group.department}
                      </p>
                    </div>
                  </div>
                )}

                <div className='flex items-center gap-3'>
                  <Calendar className='h-5 w-5 text-gray-500' />
                  <div>
                    <p className='text-sm font-medium'>Created</p>
                    <p className='text-sm text-gray-600'>
                      {new Date(group.created_at).toLocaleDateString()}
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Creator Info */}
            {group.creator && (
              <Card>
                <CardHeader>
                  <CardTitle>Created by</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className='flex items-center gap-3'>
                    <Avatar className='h-10 w-10'>
                      <AvatarImage src={group.creator.avatar} />
                      <AvatarFallback>
                        {group.creator.display_name.charAt(0)}
                      </AvatarFallback>
                    </Avatar>
                    <div>
                      <p className='font-medium'>
                        {group.creator.display_name}
                      </p>
                      <p className='text-sm text-gray-600 capitalize'>
                        {group.creator.role}
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            )}

            {/* Join CTA */}
            <Card className='bg-blue-50 border-blue-200'>
              <CardContent className='pt-6'>
                <div className='text-center'>
                  <h3 className='font-semibold text-blue-900 mb-2'>
                    Want to join this group?
                  </h3>
                  <p className='text-sm text-blue-700 mb-4'>
                    {user
                      ? 'Click the button above to join this group and start participating in discussions.'
                      : 'Sign up or log in to join this group and start participating in discussions.'}
                  </p>
                  {!user && (
                    <div className='flex gap-2'>
                      <Button
                        variant='outline'
                        size='sm'
                        onClick={() => navigate('/signup')}
                        className='flex-1'
                      >
                        Sign Up
                      </Button>
                      <Button
                        size='sm'
                        onClick={() => navigate('/login')}
                        className='flex-1 bg-blue-600 hover:bg-blue-700'
                      >
                        Log In
                      </Button>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PublicGroupDetail;
