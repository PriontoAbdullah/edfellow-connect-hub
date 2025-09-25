import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { useToast } from '@/hooks/use-toast';
import { useAuth } from '@/contexts/AuthContext';
import {
  Users,
  Plus,
  MessageSquare,
  Crown,
  Star,
  Eye,
  BookOpen,
  GraduationCap,
  Building,
  Globe,
  Lock,
  TrendingUp,
  Loader2,
  ArrowRight,
} from 'lucide-react';
import {
  getUserGroups,
  getGroups,
  joinGroup,
  type Group,
} from '@/lib/api/groups';
import { GroupCreation } from './GroupCreation';

interface GroupsIntegrationProps {
  userRole: 'student' | 'professor' | 'university';
  compact?: boolean;
  maxGroups?: number;
  showCreateButton?: boolean;
}

export const GroupsIntegration: React.FC<GroupsIntegrationProps> = ({
  userRole,
  compact = false,
  maxGroups = 3,
  showCreateButton = true,
}) => {
  const navigate = useNavigate();
  const { user, userData } = useAuth();
  const { toast } = useToast();

  // State management
  const [myGroups, setMyGroups] = useState<Group[]>([]);
  const [suggestedGroups, setSuggestedGroups] = useState<Group[]>([]);
  const [loading, setLoading] = useState(true);
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [joiningGroups, setJoiningGroups] = useState<Set<string>>(new Set());

  // Load data on component mount
  useEffect(() => {
    loadUserGroups();
    loadSuggestedGroups();
  }, [user]);

  const loadUserGroups = async () => {
    if (!user) return;

    try {
      const { data, error } = await getUserGroups(user.id);

      if (error) {
        console.error('Error loading user groups:', error);
        return;
      }

      setMyGroups(data || []);
    } catch (error) {
      console.error('Error loading user groups:', error);
    }
  };

  const loadSuggestedGroups = async () => {
    setLoading(true);
    try {
      // Get groups based on user role and interests
      const filters: any = {
        limit: 6,
      };

      // Add role-specific filters
      if (userData?.academicInterests?.length) {
        // Filter by academic interests
        filters.search = userData.academicInterests[0];
      }

      if (userData?.university) {
        filters.university = userData.university;
      }

      const { data, error } = await getGroups(filters);

      if (error) {
        console.error('Error loading suggested groups:', error);
        return;
      }

      // Filter out groups user is already in
      const userGroupIds = new Set(myGroups.map((g) => g.id));
      const suggested = (data || []).filter(
        (group) => !userGroupIds.has(group.id)
      );

      setSuggestedGroups(suggested);
    } catch (error) {
      console.error('Error loading suggested groups:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleJoinGroup = async (groupId: string) => {
    if (!user) {
      toast({
        title: 'Authentication Required',
        description: 'Please log in to join groups',
        variant: 'destructive',
      });
      return;
    }

    setJoiningGroups((prev) => new Set(prev).add(groupId));

    try {
      const { data, error } = await joinGroup(groupId);

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

      // Refresh data
      loadUserGroups();
      loadSuggestedGroups();
    } catch (error) {
      toast({
        title: 'Error',
        description: 'Failed to join group',
        variant: 'destructive',
      });
    } finally {
      setJoiningGroups((prev) => {
        const newSet = new Set(prev);
        newSet.delete(groupId);
        return newSet;
      });
    }
  };

  const handleGroupCreated = (newGroup: Group) => {
    setShowCreateModal(false);
    toast({
      title: 'Success',
      description: 'Group created successfully!',
    });

    // Refresh data
    loadUserGroups();
    loadSuggestedGroups();
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

  // Check if user can create groups
  const canCreateGroups = userRole === 'professor' || userRole === 'university';

  if (loading) {
    return (
      <Card>
        <CardHeader>
          <CardTitle className='flex items-center gap-2'>
            <Users className='h-5 w-5 text-blue-600' />
            Study Groups
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className='flex items-center justify-center py-8'>
            <Loader2 className='h-6 w-6 animate-spin text-blue-600' />
            <span className='ml-2 text-gray-600'>Loading groups...</span>
          </div>
        </CardContent>
      </Card>
    );
  }

  if (compact) {
    return (
      <Card>
        <CardHeader className='pb-3'>
          <div className='flex items-center justify-between'>
            <CardTitle className='text-lg flex items-center gap-2'>
              <Users className='h-5 w-5 text-blue-600' />
              My Groups
            </CardTitle>
            <Badge variant='outline'>{myGroups.length}</Badge>
          </div>
        </CardHeader>
        <CardContent className='space-y-3'>
          {myGroups.slice(0, maxGroups).map((group) => {
            const CategoryIcon = getCategoryIcon(group.category);
            return (
              <div
                key={group.id}
                className='flex items-center gap-3 p-2 border rounded-lg hover:bg-gray-50 cursor-pointer'
                onClick={() => navigate(`/groups/${group.id}`)}
              >
                <Avatar className='w-8 h-8'>
                  <AvatarImage src={group.cover_image} />
                  <AvatarFallback>{group.name.charAt(0)}</AvatarFallback>
                </Avatar>
                <div className='flex-1 min-w-0'>
                  <p className='text-sm font-medium truncate'>{group.name}</p>
                  <div className='flex items-center gap-2'>
                    <Badge
                      className={`text-xs ${getCategoryColor(group.category)}`}
                    >
                      <CategoryIcon className='h-2 w-2 mr-1' />
                      {group.category}
                    </Badge>
                    <span className='text-xs text-gray-500'>
                      {group.member_count} members
                    </span>
                  </div>
                </div>
                <ArrowRight className='h-4 w-4 text-gray-400' />
              </div>
            );
          })}

          {myGroups.length === 0 && (
            <div className='text-center py-4'>
              <Users className='h-8 w-8 text-gray-400 mx-auto mb-2' />
              <p className='text-sm text-gray-600 mb-2'>No groups joined yet</p>
              <Button
                size='sm'
                variant='outline'
                onClick={() => navigate('/groups')}
              >
                Browse Groups
              </Button>
            </div>
          )}

          {myGroups.length > maxGroups && (
            <Button
              variant='outline'
              size='sm'
              className='w-full'
              onClick={() => navigate('/groups')}
            >
              View All ({myGroups.length})
            </Button>
          )}
        </CardContent>
      </Card>
    );
  }

  return (
    <div className='space-y-6'>
      {/* My Groups Section */}
      <Card>
        <CardHeader>
          <div className='flex items-center justify-between'>
            <CardTitle className='flex items-center gap-2'>
              <Users className='h-5 w-5 text-blue-600' />
              My Groups ({myGroups.length})
            </CardTitle>
            {canCreateGroups && showCreateButton && (
              <Button size='sm' onClick={() => setShowCreateModal(true)}>
                <Plus className='h-4 w-4 mr-2' />
                Create Group
              </Button>
            )}
          </div>
        </CardHeader>
        <CardContent>
          {myGroups.length === 0 ? (
            <div className='text-center py-8'>
              <Users className='h-12 w-12 text-gray-400 mx-auto mb-4' />
              <h3 className='text-lg font-medium text-gray-900 mb-2'>
                No groups joined yet
              </h3>
              <p className='text-gray-600 mb-4'>
                Join study groups to connect with peers and collaborate on
                projects.
              </p>
              <Button onClick={() => navigate('/groups')}>Browse Groups</Button>
            </div>
          ) : (
            <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4'>
              {myGroups.map((group) => {
                const CategoryIcon = getCategoryIcon(group.category);
                const isAdmin = group.created_by === user?.id;

                return (
                  <Card
                    key={group.id}
                    className='hover:shadow-md transition-shadow cursor-pointer'
                    onClick={() => navigate(`/groups/${group.id}`)}
                  >
                    <CardHeader className='pb-3'>
                      <div className='flex items-start gap-3'>
                        <Avatar className='w-10 h-10'>
                          <AvatarImage src={group.cover_image} />
                          <AvatarFallback>
                            {group.name.charAt(0)}
                          </AvatarFallback>
                        </Avatar>
                        <div className='flex-1 min-w-0'>
                          <CardTitle className='text-base truncate'>
                            {group.name}
                          </CardTitle>
                          <div className='flex items-center gap-2 mt-1'>
                            <Badge
                              className={`text-xs ${getCategoryColor(
                                group.category
                              )}`}
                            >
                              <CategoryIcon className='h-2 w-2 mr-1' />
                              {group.category}
                            </Badge>
                            {isAdmin && (
                              <Badge variant='secondary' className='text-xs'>
                                <Crown className='h-2 w-2 mr-1' />
                                Admin
                              </Badge>
                            )}
                          </div>
                        </div>
                      </div>
                    </CardHeader>
                    <CardContent className='pt-0'>
                      <p className='text-sm text-gray-600 mb-3 line-clamp-2'>
                        {group.description}
                      </p>
                      <div className='flex items-center justify-between text-sm text-gray-500'>
                        <span className='flex items-center gap-1'>
                          <Users className='h-3 w-3' />
                          {group.member_count || 0} members
                        </span>
                        <span className='flex items-center gap-1'>
                          {group.is_private ? (
                            <Lock className='h-3 w-3' />
                          ) : (
                            <Globe className='h-3 w-3' />
                          )}
                        </span>
                      </div>
                    </CardContent>
                  </Card>
                );
              })}
            </div>
          )}
        </CardContent>
      </Card>

      {/* Suggested Groups Section */}
      {suggestedGroups.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle className='flex items-center gap-2'>
              <Star className='h-5 w-5 text-yellow-600' />
              Suggested Groups ({suggestedGroups.length})
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4'>
              {suggestedGroups.slice(0, 6).map((group) => {
                const CategoryIcon = getCategoryIcon(group.category);

                return (
                  <Card
                    key={group.id}
                    className='hover:shadow-md transition-shadow'
                  >
                    <CardHeader className='pb-3'>
                      <div className='flex items-start gap-3'>
                        <Avatar className='w-10 h-10'>
                          <AvatarImage src={group.cover_image} />
                          <AvatarFallback>
                            {group.name.charAt(0)}
                          </AvatarFallback>
                        </Avatar>
                        <div className='flex-1 min-w-0'>
                          <CardTitle className='text-base truncate'>
                            {group.name}
                          </CardTitle>
                          <div className='flex items-center gap-2 mt-1'>
                            <Badge
                              className={`text-xs ${getCategoryColor(
                                group.category
                              )}`}
                            >
                              <CategoryIcon className='h-2 w-2 mr-1' />
                              {group.category}
                            </Badge>
                            {group.is_private ? (
                              <Lock className='h-3 w-3 text-gray-500' />
                            ) : (
                              <Globe className='h-3 w-3 text-gray-500' />
                            )}
                          </div>
                        </div>
                      </div>
                    </CardHeader>
                    <CardContent className='pt-0'>
                      <p className='text-sm text-gray-600 mb-3 line-clamp-2'>
                        {group.description}
                      </p>
                      <div className='flex items-center justify-between text-sm text-gray-500 mb-3'>
                        <span className='flex items-center gap-1'>
                          <Users className='h-3 w-3' />
                          {group.member_count || 0} members
                        </span>
                      </div>
                      <div className='flex gap-2'>
                        <Button
                          size='sm'
                          onClick={() => handleJoinGroup(group.id)}
                          disabled={joiningGroups.has(group.id)}
                          className='flex-1'
                        >
                          {joiningGroups.has(group.id) ? (
                            <Loader2 className='h-3 w-3 animate-spin mr-1' />
                          ) : (
                            <Plus className='h-3 w-3 mr-1' />
                          )}
                          {joiningGroups.has(group.id) ? 'Joining...' : 'Join'}
                        </Button>
                        <Button
                          variant='outline'
                          size='sm'
                          onClick={() => navigate(`/groups/${group.id}`)}
                        >
                          <Eye className='h-3 w-3' />
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                );
              })}
            </div>
          </CardContent>
        </Card>
      )}

      {/* Create Group Modal */}
      {showCreateModal && (
        <div className='fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4'>
          <div className='bg-white rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto'>
            <GroupCreation
              onSuccess={handleGroupCreated}
              onCancel={() => setShowCreateModal(false)}
            />
          </div>
        </div>
      )}
    </div>
  );
};
