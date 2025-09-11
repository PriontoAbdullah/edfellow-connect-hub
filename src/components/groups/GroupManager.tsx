import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import {
  Users,
  Plus,
  Search,
  Filter,
  Settings,
  Crown,
  Shield,
  User,
  MapPin,
  GraduationCap,
  Building2,
  Calendar,
  MessageSquare,
  Eye,
  MoreHorizontal,
  Lock,
  Globe,
  Star,
  TrendingUp,
} from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';
import { useToast } from '@/hooks/use-toast';
import {
  getGroups,
  getUserGroups,
  joinGroup,
  leaveGroup,
  type Group,
} from '@/lib/api/groups';

interface GroupManagerProps {
  userId?: string;
  compact?: boolean;
  showCreateButton?: boolean;
}

export const GroupManager: React.FC<GroupManagerProps> = ({
  userId,
  compact = false,
  showCreateButton = true,
}) => {
  const { user } = useAuth();
  const { toast } = useToast();
  const [groups, setGroups] = useState<Group[]>([]);
  const [userGroups, setUserGroups] = useState<Group[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [categoryFilter, setCategoryFilter] = useState<string>('all');
  const [universityFilter, setUniversityFilter] = useState<string>('all');
  const [activeTab, setActiveTab] = useState<'all' | 'my' | 'recommended'>(
    'all'
  );
  const [joiningGroups, setJoiningGroups] = useState<Set<string>>(new Set());

  useEffect(() => {
    fetchGroups();
    if (user) {
      fetchUserGroups();
    }
  }, [user, activeTab]);

  const fetchGroups = async () => {
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

      setGroups(data || []);
    } catch (error) {
      console.error('Error fetching groups:', error);
    } finally {
      setLoading(false);
    }
  };

  const fetchUserGroups = async () => {
    if (!user) return;

    try {
      const { data, error } = await getUserGroups(user.id);

      if (error) {
        console.error('Error fetching user groups:', error);
        return;
      }

      setUserGroups(data || []);
    } catch (error) {
      console.error('Error fetching user groups:', error);
    }
  };

  const handleJoinGroup = async (groupId: string) => {
    if (!user) return;

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

      // Refresh groups
      fetchGroups();
      fetchUserGroups();
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

  const handleLeaveGroup = async (groupId: string) => {
    if (!user) return;

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

      // Refresh groups
      fetchGroups();
      fetchUserGroups();
    } catch (error) {
      toast({
        title: 'Error',
        description: 'Failed to leave group',
        variant: 'destructive',
      });
    }
  };

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case 'study':
        return <GraduationCap className='w-4 h-4' />;
      case 'research':
        return <TrendingUp className='w-4 h-4' />;
      case 'professional':
        return <Building2 className='w-4 h-4' />;
      case 'social':
        return <Users className='w-4 h-4' />;
      case 'academic':
        return <Star className='w-4 h-4' />;
      default:
        return <Users className='w-4 h-4' />;
    }
  };

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

  const isUserInGroup = (groupId: string) => {
    return userGroups.some((group) => group.id === groupId);
  };

  const getDisplayGroups = () => {
    switch (activeTab) {
      case 'my':
        return userGroups;
      case 'recommended':
        // Filter groups user is not in and show recommended ones
        return groups.filter((group) => !isUserInGroup(group.id));
      default:
        return groups;
    }
  };

  if (loading) {
    return (
      <div className='space-y-4'>
        <div className='animate-pulse'>
          <div className='h-4 bg-gray-200 rounded w-1/4 mb-4'></div>
          <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4'>
            {[1, 2, 3, 4, 5, 6].map((i) => (
              <div key={i} className='h-48 bg-gray-200 rounded'></div>
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
          <h3 className='text-sm font-medium'>My Groups</h3>
          <Badge variant='outline'>{userGroups.length}</Badge>
        </div>

        <div className='space-y-2'>
          {userGroups.slice(0, 3).map((group) => (
            <div
              key={group.id}
              className='flex items-center gap-3 p-2 border rounded-lg'
            >
              <Avatar className='w-8 h-8'>
                <AvatarImage src={group.cover_image} />
                <AvatarFallback>{group.name.charAt(0)}</AvatarFallback>
              </Avatar>
              <div className='flex-1 min-w-0'>
                <p className='text-sm font-medium truncate'>{group.name}</p>
                <p className='text-xs text-muted-foreground'>
                  {group.member_count} members
                </p>
              </div>
              <Badge className={`text-xs ${getCategoryColor(group.category)}`}>
                {getCategoryIcon(group.category)}
              </Badge>
            </div>
          ))}
        </div>

        {userGroups.length > 3 && (
          <Button variant='outline' size='sm' className='w-full'>
            View All ({userGroups.length})
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
          <h3 className='text-lg font-semibold'>Groups & Communities</h3>
          <p className='text-sm text-muted-foreground'>
            Join study groups, research communities, and professional networks
          </p>
        </div>
        {showCreateButton && user?.role === 'professor' && (
          <Button>
            <Plus className='w-4 h-4 mr-2' />
            Create Group
          </Button>
        )}
      </div>

      {/* Tabs */}
      <div className='flex gap-2'>
        {(['all', 'my', 'recommended'] as const).map((tab) => (
          <Button
            key={tab}
            variant={activeTab === tab ? 'default' : 'outline'}
            size='sm'
            onClick={() => setActiveTab(tab)}
          >
            {tab === 'all' && <Globe className='w-4 h-4 mr-1' />}
            {tab === 'my' && <Users className='w-4 h-4 mr-1' />}
            {tab === 'recommended' && <Star className='w-4 h-4 mr-1' />}
            <span className='capitalize'>{tab}</span>
          </Button>
        ))}
      </div>

      {/* Filters */}
      <div className='flex gap-4 flex-wrap'>
        <div className='relative flex-1 min-w-64'>
          <Search className='absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4' />
          <input
            type='text'
            placeholder='Search groups...'
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className='w-full pl-10 pr-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500'
          />
        </div>

        <select
          value={categoryFilter}
          onChange={(e) => setCategoryFilter(e.target.value)}
          className='px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500'
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
          className='px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500'
        >
          <option value='all'>All Universities</option>
          <option value='MIT'>MIT</option>
          <option value='Stanford University'>Stanford</option>
          <option value='Harvard University'>Harvard</option>
          <option value='University of Toronto'>University of Toronto</option>
        </select>

        <Button variant='outline' onClick={fetchGroups}>
          <Filter className='w-4 h-4 mr-2' />
          Apply
        </Button>
      </div>

      {/* Groups Grid */}
      {getDisplayGroups().length === 0 ? (
        <Card>
          <CardContent className='p-6 text-center'>
            <Users className='w-12 h-12 text-muted-foreground mx-auto mb-4' />
            <h3 className='text-lg font-medium mb-2'>No groups found</h3>
            <p className='text-muted-foreground'>
              {activeTab === 'my'
                ? "You haven't joined any groups yet"
                : 'Try adjusting your search criteria'}
            </p>
          </CardContent>
        </Card>
      ) : (
        <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4'>
          {getDisplayGroups().map((group) => (
            <Card key={group.id} className='hover:shadow-md transition-shadow'>
              <CardHeader className='pb-3'>
                <div className='flex items-start gap-3'>
                  <Avatar className='w-12 h-12'>
                    <AvatarImage src={group.cover_image} />
                    <AvatarFallback>{group.name.charAt(0)}</AvatarFallback>
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
                        {getCategoryIcon(group.category)}
                        <span className='ml-1 capitalize'>
                          {group.category}
                        </span>
                      </Badge>
                      {group.is_private ? (
                        <Lock className='w-3 h-3 text-muted-foreground' />
                      ) : (
                        <Globe className='w-3 h-3 text-muted-foreground' />
                      )}
                    </div>
                  </div>

                  <Button variant='ghost' size='sm'>
                    <MoreHorizontal className='w-4 h-4' />
                  </Button>
                </div>
              </CardHeader>

              <CardContent className='pt-0'>
                <p className='text-sm text-muted-foreground mb-3 line-clamp-2'>
                  {group.description}
                </p>

                <div className='space-y-2 text-sm text-muted-foreground mb-4'>
                  {group.university && (
                    <div className='flex items-center gap-1'>
                      <GraduationCap className='w-3 h-3' />
                      <span className='truncate'>{group.university}</span>
                    </div>
                  )}
                  {group.subject_area && (
                    <div className='flex items-center gap-1'>
                      <BookOpen className='w-3 h-3' />
                      <span className='truncate'>{group.subject_area}</span>
                    </div>
                  )}
                  <div className='flex items-center gap-1'>
                    <Users className='w-3 h-3' />
                    <span>{group.member_count || 0} members</span>
                  </div>
                </div>

                <div className='flex items-center justify-between'>
                  <div className='text-xs text-muted-foreground'>
                    Created by {group.creator?.display_name}
                  </div>

                  {isUserInGroup(group.id) ? (
                    <Button
                      variant='outline'
                      size='sm'
                      onClick={() => handleLeaveGroup(group.id)}
                    >
                      Leave
                    </Button>
                  ) : (
                    <Button
                      size='sm'
                      onClick={() => handleJoinGroup(group.id)}
                      disabled={joiningGroups.has(group.id)}
                    >
                      {joiningGroups.has(group.id) ? 'Joining...' : 'Join'}
                    </Button>
                  )}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
};
