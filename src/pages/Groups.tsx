import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
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
import { Input } from '@/components/ui/input';
import { useToast } from '@/hooks/use-toast';
import { useAuth } from '@/contexts/AuthContext';
import {
  Users,
  Search,
  Plus,
  MessageSquare,
  Settings,
  Crown,
  Star,
  Eye,
  BookOpen,
  GraduationCap,
  Building,
  Globe,
  Calendar,
  UserPlus,
  MoreHorizontal,
  Filter,
  Lock,
  TrendingUp,
  Loader2,
  AlertCircle,
} from 'lucide-react';
import {
  getGroups,
  getUserGroups,
  joinGroup,
  leaveGroup,
  createGroup,
  type Group,
} from '@/lib/api/groups';
import { GroupCreation } from '@/components/groups/GroupCreation';
import { GroupManager } from '@/components/groups/GroupManager';

const Groups = () => {
  const navigate = useNavigate();
  const { user, userData } = useAuth();
  const { toast } = useToast();

  // State management
  const [searchTerm, setSearchTerm] = useState('');
  const [activeTab, setActiveTab] = useState<
    'my-groups' | 'all-groups' | 'suggested'
  >('my-groups');
  const [categoryFilter, setCategoryFilter] = useState<string>('all');
  const [universityFilter, setUniversityFilter] = useState<string>('all');
  const [loading, setLoading] = useState(true);
  const [showCreateModal, setShowCreateModal] = useState(false);

  // Data state
  const [allGroups, setAllGroups] = useState<Group[]>([]);
  const [myGroups, setMyGroups] = useState<Group[]>([]);
  const [suggestedGroups, setSuggestedGroups] = useState<Group[]>([]);
  const [joiningGroups, setJoiningGroups] = useState<Set<string>>(new Set());
  const [leavingGroups, setLeavingGroups] = useState<Set<string>>(new Set());

  // Load data on component mount and when filters change
  useEffect(() => {
    loadGroups();
    if (user) {
      loadUserGroups();
    }
  }, [user, categoryFilter, universityFilter]);

  // Load all groups with filters
  const loadGroups = async () => {
    setLoading(true);
    try {
      const filters: any = {};

      if (searchTerm) {
        filters.search = searchTerm;
      }

      if (categoryFilter !== 'all') {
        filters.category = categoryFilter;
      }

      if (universityFilter !== 'all') {
        filters.university = universityFilter;
      }

      const { data, error } = await getGroups(filters);

      if (error) {
        toast({
          title: 'Error',
          description: error,
          variant: 'destructive',
        });
        return;
      }

      setAllGroups(data || []);

      // Generate suggested groups (groups user is not in)
      if (user && myGroups.length > 0) {
        const userGroupIds = new Set(myGroups.map((g) => g.id));
        const suggested = (data || []).filter(
          (group) => !userGroupIds.has(group.id)
        );
        setSuggestedGroups(suggested);
      } else if (user && myGroups.length === 0) {
        // If user has no groups yet, show all as suggestions
        setSuggestedGroups(data || []);
      }
    } catch (error) {
      console.error('Error loading groups:', error);
      toast({
        title: 'Error',
        description: 'Failed to load groups',
        variant: 'destructive',
      });
    } finally {
      setLoading(false);
    }
  };

  // Load user's groups
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

  // Handle search with debouncing
  useEffect(() => {
    const timeoutId = setTimeout(() => {
      if (activeTab === 'all-groups') {
        loadGroups();
      }
    }, 500);

    return () => clearTimeout(timeoutId);
  }, [searchTerm]);

  // Handle group join
  const handleJoinGroup = async (groupId: string) => {
    if (!user) {
      toast({
        title: 'Authentication Required',
        description: 'Please log in to join groups',
        variant: 'destructive',
      });
      return;
    }

    // Check if user is already in the group
    if (isUserInGroup(groupId)) {
      toast({
        title: 'Already a Member',
        description: 'You are already a member of this group',
        variant: 'default',
      });
      return;
    }

    setJoiningGroups((prev) => new Set(prev).add(groupId));

    try {
      const { data, error } = await joinGroup(groupId);

      if (error) {
        // Handle specific error cases
        if (error.includes('already a member')) {
          toast({
            title: 'Already a Member',
            description: 'You are already a member of this group',
            variant: 'default',
          });
        } else if (error.includes('pending request')) {
          toast({
            title: 'Request Pending',
            description:
              'You already have a pending request to join this group',
            variant: 'default',
          });
        } else {
          toast({
            title: 'Error',
            description: error,
            variant: 'destructive',
          });
        }
        return;
      }

      toast({
        title: 'Success',
        description: 'Join request sent successfully!',
      });

      // Refresh data
      loadGroups();
      loadUserGroups();
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

  // Handle group leave
  const handleLeaveGroup = async (groupId: string) => {
    if (!user) return;

    setLeavingGroups((prev) => new Set(prev).add(groupId));

    try {
      const { error } = await leaveGroup(groupId);

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
        description: 'Left group successfully',
      });

      // Refresh data
      loadGroups();
      loadUserGroups();
    } catch (error) {
      toast({
        title: 'Error',
        description: 'Failed to leave group',
        variant: 'destructive',
      });
    } finally {
      setLeavingGroups((prev) => {
        const newSet = new Set(prev);
        newSet.delete(groupId);
        return newSet;
      });
    }
  };

  // Handle group creation success
  const handleGroupCreated = (newGroup: Group) => {
    setShowCreateModal(false);
    toast({
      title: 'Success',
      description: 'Group created successfully!',
    });

    // Refresh data
    loadGroups();
    loadUserGroups();
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

  // Check if user is in group
  const isUserInGroup = (groupId: string) => {
    return myGroups.some((group) => group.id === groupId);
  };

  // Check if user is admin of group
  const isUserAdmin = (groupId: string) => {
    const group = myGroups.find((g) => g.id === groupId);
    return group?.creator?.id === user?.id;
  };

  // Get display groups based on active tab
  const getDisplayGroups = () => {
    switch (activeTab) {
      case 'my-groups':
        return myGroups;
      case 'suggested':
        return suggestedGroups;
      default:
        return allGroups;
    }
  };

  // Filter groups based on search term
  const getFilteredGroups = () => {
    const groups = getDisplayGroups();
    if (!searchTerm) return groups;

    return groups.filter(
      (group) =>
        group.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        group.description?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        group.subject_area?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        group.university?.toLowerCase().includes(searchTerm.toLowerCase())
    );
  };

  const filteredGroups = getFilteredGroups();

  return (
    <div className='p-4 sm:p-6 space-y-4 sm:space-y-6'>
      {/* Header */}
      <div className='flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4'>
        <div>
          <h1 className='text-xl sm:text-2xl font-bold text-gray-900 flex items-center gap-2'>
            <Users className='h-5 w-5 sm:h-6 sm:w-6 text-blue-600' />
            Study Groups
          </h1>
          <p className='text-sm sm:text-base text-gray-600'>
            Connect with peers and join academic communities
          </p>
        </div>

        {/* Create Group Button - Only for Professors and Universities */}
        {(userData?.role === 'professor' ||
          userData?.role === 'university') && (
          <Button
            onClick={() => setShowCreateModal(true)}
            className='bg-blue-600 hover:bg-blue-700 text-sm sm:text-base'
          >
            <Plus className='h-3 w-3 sm:h-4 sm:w-4 mr-1 sm:mr-2' />
            Create Group
          </Button>
        )}
      </div>

      {/* Tabs */}
      <div className='flex gap-2 border-b'>
        <Button
          variant={activeTab === 'my-groups' ? 'default' : 'ghost'}
          onClick={() => setActiveTab('my-groups')}
          className='text-sm'
        >
          <Users className='h-4 w-4 mr-2' />
          My Groups ({myGroups.length})
        </Button>
        <Button
          variant={activeTab === 'all-groups' ? 'default' : 'ghost'}
          onClick={() => setActiveTab('all-groups')}
          className='text-sm'
        >
          <Globe className='h-4 w-4 mr-2' />
          All Groups ({allGroups.length})
        </Button>
        <Button
          variant={activeTab === 'suggested' ? 'default' : 'ghost'}
          onClick={() => setActiveTab('suggested')}
          className='text-sm'
        >
          <Star className='h-4 w-4 mr-2' />
          Suggested ({suggestedGroups.length})
        </Button>
      </div>

      {/* Search and Filters */}
      <div className='flex flex-col sm:flex-row gap-3 sm:gap-4 items-start sm:items-center justify-between'>
        <div className='relative flex-1 max-w-md'>
          <Search className='absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4' />
          <Input
            placeholder='Search groups...'
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className='pl-10 text-sm sm:text-base'
          />
        </div>

        <div className='flex gap-2 flex-wrap'>
          <select
            value={categoryFilter}
            onChange={(e) => setCategoryFilter(e.target.value)}
            className='px-3 py-2 border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500'
          >
            <option value='all'>All Categories</option>
            <option value='study'>Study Groups</option>
            <option value='research'>Research</option>
            <option value='professional'>Professional</option>
            <option value='social'>Social</option>
            <option value='academic'>Academic</option>
          </select>

          <select
            value={universityFilter}
            onChange={(e) => setUniversityFilter(e.target.value)}
            className='px-3 py-2 border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500'
          >
            <option value='all'>All Universities</option>
            <option value='MIT'>MIT</option>
            <option value='Stanford University'>Stanford</option>
            <option value='Harvard University'>Harvard</option>
            <option value='University of Toronto'>University of Toronto</option>
          </select>

          <Button
            variant='outline'
            onClick={loadGroups}
            disabled={loading}
            className='text-sm'
          >
            <Filter className='h-4 w-4 mr-2' />
            {loading ? <Loader2 className='h-4 w-4 animate-spin' /> : 'Filter'}
          </Button>
        </div>
      </div>

      {/* Loading State */}
      {loading && (
        <div className='flex items-center justify-center py-12'>
          <Loader2 className='h-8 w-8 animate-spin text-blue-600' />
          <span className='ml-2 text-gray-600'>Loading groups...</span>
        </div>
      )}

      {/* Groups Grid */}
      {!loading && (
        <div className='grid gap-4 sm:gap-6 grid-cols-1 md:grid-cols-2 lg:grid-cols-3'>
          {filteredGroups.map((group) => {
            const CategoryIcon = getCategoryIcon(group.category);
            const isInGroup = isUserInGroup(group.id);
            const isAdmin = isUserAdmin(group.id);

            return (
              <Card
                key={group.id}
                className='hover:shadow-md transition-shadow h-full flex flex-col'
              >
                <CardHeader className='flex-shrink-0 pb-3 sm:pb-4'>
                  <div className='flex items-start justify-between'>
                    <div className='flex items-center gap-2 sm:gap-3 w-full'>
                      <Avatar className='h-10 w-10 sm:h-12 sm:w-12 flex-shrink-0'>
                        <AvatarImage src={group.cover_image} />
                        <AvatarFallback className='text-sm sm:text-lg font-semibold'>
                          {group.name.charAt(0).toUpperCase()}
                        </AvatarFallback>
                      </Avatar>
                      <div className='flex-1 min-w-0'>
                        <CardTitle className='text-base sm:text-lg break-words line-clamp-2'>
                          {group.name}
                        </CardTitle>
                        <div className='flex items-center gap-2 mt-1'>
                          <Badge
                            className={`text-xs ${getCategoryColor(
                              group.category
                            )}`}
                          >
                            <CategoryIcon className='h-2 w-2 sm:h-3 sm:w-3 mr-1' />
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
                    <div className='flex items-center gap-1'>
                      {isAdmin && (
                        <Badge variant='secondary' className='text-xs'>
                          <Crown className='h-2 w-2 sm:h-3 sm:w-3 mr-1' />
                          Admin
                        </Badge>
                      )}
                      <Button
                        variant='ghost'
                        size='sm'
                        className='h-8 w-8 sm:h-10 sm:w-10'
                      >
                        <MoreHorizontal className='h-3 w-3 sm:h-4 sm:w-4' />
                      </Button>
                    </div>
                  </div>
                </CardHeader>

                <CardContent className='space-y-3 sm:space-y-4 flex-grow'>
                  <p className='text-xs sm:text-sm text-gray-600 line-clamp-2'>
                    {group.description}
                  </p>

                  {/* Group Details */}
                  <div className='space-y-2 text-xs sm:text-sm text-gray-500'>
                    {group.university && (
                      <div className='flex items-center gap-1'>
                        <GraduationCap className='h-3 w-3' />
                        <span className='truncate'>{group.university}</span>
                      </div>
                    )}
                    {group.subject_area && (
                      <div className='flex items-center gap-1'>
                        <BookOpen className='h-3 w-3' />
                        <span className='truncate'>{group.subject_area}</span>
                      </div>
                    )}
                    <div className='flex items-center gap-1'>
                      <Users className='h-3 w-3' />
                      <span>{group.member_count || 0} members</span>
                    </div>
                  </div>

                  {/* Action Buttons */}
                  <div className='flex gap-2 mt-auto'>
                    {isInGroup ? (
                      <>
                        <Button
                          variant='outline'
                          size='sm'
                          className='flex-1 text-xs sm:text-sm'
                          onClick={() => navigate(`/groups/${group.id}`)}
                        >
                          <MessageSquare className='h-3 w-3 sm:h-4 sm:w-4 mr-1 sm:mr-2' />
                          View
                        </Button>
                        {isAdmin && (
                          <Button
                            variant='outline'
                            size='sm'
                            className='text-xs sm:text-sm'
                          >
                            <Settings className='h-3 w-3 sm:h-4 sm:w-4' />
                          </Button>
                        )}
                        <Button
                          variant='outline'
                          size='sm'
                          onClick={() => handleLeaveGroup(group.id)}
                          disabled={leavingGroups.has(group.id)}
                          className='text-xs sm:text-sm'
                        >
                          {leavingGroups.has(group.id) ? (
                            <Loader2 className='h-3 w-3 animate-spin' />
                          ) : (
                            'Leave'
                          )}
                        </Button>
                      </>
                    ) : (
                      <>
                        <Button
                          size='sm'
                          onClick={() => handleJoinGroup(group.id)}
                          disabled={joiningGroups.has(group.id)}
                          className='flex-1 bg-blue-600 hover:bg-blue-700 text-xs sm:text-sm'
                        >
                          {joiningGroups.has(group.id) ? (
                            <Loader2 className='h-3 w-3 animate-spin mr-1 sm:mr-2' />
                          ) : (
                            <UserPlus className='h-3 w-3 sm:h-4 sm:w-4 mr-1 sm:mr-2' />
                          )}
                          {joiningGroups.has(group.id)
                            ? 'Joining...'
                            : 'Join Group'}
                        </Button>
                        <Button
                          variant='outline'
                          size='sm'
                          className='text-xs sm:text-sm'
                          onClick={() => navigate(`/groups/${group.id}`)}
                        >
                          <Eye className='h-3 w-3 sm:h-4 sm:w-4' />
                        </Button>
                      </>
                    )}
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>
      )}

      {/* Empty State */}
      {!loading && filteredGroups.length === 0 && (
        <div className='text-center py-8 sm:py-12'>
          <Users className='h-8 w-8 sm:h-12 sm:w-12 text-gray-400 mx-auto mb-3 sm:mb-4' />
          <h3 className='text-base sm:text-lg font-medium text-gray-900 mb-2'>
            {searchTerm
              ? 'No groups found'
              : `No ${
                  activeTab === 'my-groups'
                    ? 'groups joined'
                    : activeTab === 'suggested'
                    ? 'suggested groups'
                    : 'groups available'
                }`}
          </h3>
          <p className='text-sm sm:text-base text-gray-600 mb-4'>
            {searchTerm
              ? 'Try adjusting your search terms or filters'
              : activeTab === 'my-groups'
              ? 'Join some groups to get started'
              : activeTab === 'suggested'
              ? 'Check back later for new group suggestions'
              : 'No groups match your current filters'}
          </p>
          {activeTab === 'my-groups' && (
            <Button
              onClick={() => setActiveTab('suggested')}
              className='text-sm'
            >
              Browse Suggested Groups
            </Button>
          )}
        </div>
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

export default Groups;
