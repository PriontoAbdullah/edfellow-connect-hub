import React, { useState, useEffect, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { useToast } from '@/hooks/use-toast';
import {
  Users,
  UserPlus,
  UserCheck,
  Search,
  Filter,
  MoreHorizontal,
  Check,
  X,
  Clock,
  MapPin,
  GraduationCap,
  Building2,
  Star,
  MessageSquare,
  ExternalLink,
  Plus,
  Eye,
  Heart,
  Send,
  Globe,
  BookOpen,
  Award,
  Target,
  TrendingUp,
  Calendar,
  Briefcase,
  Lightbulb,
  Loader2,
  UserX,
  RefreshCw,
} from 'lucide-react';
import { CountryFlag } from '@/components/ui/CountryFlag';
import { getCountryCode } from '@/lib/countries';
import { useAuth } from '@/contexts/AuthContext';
import {
  getConnectionRequests,
  getUserConnections,
  sendConnectionRequest,
  acceptConnectionRequest,
  declineConnectionRequest,
  removeConnection,
  checkConnection,
  ConnectionRequestWithUser,
  ConnectionWithUser,
} from '@/lib/api/connections';
import { searchProfiles } from '@/lib/api/profiles';
import { getOrCreateDirectConversation } from '@/lib/chat';

const MyNetwork = () => {
  const { user, userData } = useAuth();
  const { toast } = useToast();
  const navigate = useNavigate();

  // State management
  const [activeTab, setActiveTab] = useState('requests');
  const [searchTerm, setSearchTerm] = useState('');
  const [filterType, setFilterType] = useState('all');
  const [loading, setLoading] = useState(false);
  const [refreshing, setRefreshing] = useState(false);

  // Data state
  const [connectionRequests, setConnectionRequests] = useState<
    ConnectionRequestWithUser[]
  >([]);
  const [peopleRecommendations, setPeopleRecommendations] = useState<any[]>([]);
  const [allConnections, setAllConnections] = useState<ConnectionWithUser[]>(
    []
  );

  // Connection request dialog state
  const [isRequestDialogOpen, setIsRequestDialogOpen] = useState(false);
  const [selectedUser, setSelectedUser] = useState<any>(null);
  const [requestMessage, setRequestMessage] = useState('');
  const [sendingRequest, setSendingRequest] = useState(false);

  // Load connection requests
  const loadConnectionRequests = useCallback(async () => {
    if (!user?.id) return;

    setLoading(true);
    try {
      const { data, error } = await getConnectionRequests(user.id, 'received');
      if (error) {
        toast({
          title: 'Error',
          description: 'Failed to load connection requests',
          variant: 'destructive',
        });
        return;
      }
      setConnectionRequests(data || []);
    } catch (error) {
      console.error('Error loading connection requests:', error);
      toast({
        title: 'Error',
        description: 'Failed to load connection requests',
        variant: 'destructive',
      });
    } finally {
      setLoading(false);
    }
  }, [user?.id, toast]);

  // Load user connections
  const loadUserConnections = useCallback(async () => {
    if (!user?.id) return;

    try {
      const { data, error } = await getUserConnections(user.id, 'accepted');
      if (error) {
        toast({
          title: 'Error',
          description: 'Failed to load connections',
          variant: 'destructive',
        });
        return;
      }
      setAllConnections(data || []);
    } catch (error) {
      console.error('Error loading connections:', error);
      toast({
        title: 'Error',
        description: 'Failed to load connections',
        variant: 'destructive',
      });
    }
  }, [user?.id, toast]);

  // Load people recommendations
  const loadPeopleRecommendations = useCallback(async () => {
    if (!user?.id) return;

    try {
      const { profiles, error } = await searchProfiles({
        limit: 20,
        role: filterType === 'all' ? undefined : (filterType as any),
      });

      if (error) {
        console.error('Error loading recommendations:', error);
        return;
      }

      // Get current connections to filter them out
      const { data: currentConnections } = await getUserConnections(
        user.id,
        'accepted'
      );
      const connectionIds = new Set([
        ...(currentConnections || []).map(
          (c) => c.requester?.id || c.addressee?.id
        ),
        user.id,
      ]);

      const recommendations = profiles
        .filter((profile) => !connectionIds.has(profile.id))
        .slice(0, 10)
        .map((profile) => ({
          id: profile.id,
          name: profile.display_name,
          title: profile.position || profile.major || 'Student',
          university: profile.university || profile.institution,
          location: profile.city
            ? `${profile.city}, ${profile.country}`
            : profile.country,
          country: profile.country,
          avatar: profile.avatar,
          role: profile.role,
          interests: profile.academic_interests || profile.skills || [],
          reason: 'Recommended for you',
          connectionStrength: 'Medium',
        }));

      setPeopleRecommendations(recommendations);
    } catch (error) {
      console.error('Error loading recommendations:', error);
    }
  }, [user?.id, filterType]);

  // Load all data
  const loadAllData = useCallback(async () => {
    setRefreshing(true);
    await Promise.all([
      loadConnectionRequests(),
      loadUserConnections(),
      loadPeopleRecommendations(),
    ]);
    setRefreshing(false);
  }, [loadConnectionRequests, loadUserConnections, loadPeopleRecommendations]);

  // Handle connection request actions
  const handleAcceptRequest = async (requestId: string) => {
    if (!user?.id) return;

    try {
      const { data, error } = await acceptConnectionRequest(requestId, user.id);
      if (error) {
        toast({
          title: 'Error',
          description: 'Failed to accept connection request',
          variant: 'destructive',
        });
        return;
      }

      toast({
        title: 'Success',
        description: 'Connection request accepted',
      });

      // Refresh data
      await loadAllData();
    } catch (error) {
      console.error('Error accepting request:', error);
      toast({
        title: 'Error',
        description: 'Failed to accept connection request',
        variant: 'destructive',
      });
    }
  };

  const handleDeclineRequest = async (requestId: string) => {
    if (!user?.id) return;

    try {
      const { error } = await declineConnectionRequest(requestId, user.id);
      if (error) {
        toast({
          title: 'Error',
          description: 'Failed to decline connection request',
          variant: 'destructive',
        });
        return;
      }

      toast({
        title: 'Success',
        description: 'Connection request declined',
      });

      // Refresh data
      await loadConnectionRequests();
    } catch (error) {
      console.error('Error declining request:', error);
      toast({
        title: 'Error',
        description: 'Failed to decline connection request',
        variant: 'destructive',
      });
    }
  };

  const handleSendRequest = async (userId: string, message?: string) => {
    if (!user?.id) return;

    setSendingRequest(true);
    try {
      const { data, error } = await sendConnectionRequest(
        user.id,
        userId,
        message
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
        description: 'Connection request sent',
      });

      setIsRequestDialogOpen(false);
      setRequestMessage('');
      setSelectedUser(null);

      // Refresh recommendations
      await loadPeopleRecommendations();
    } catch (error) {
      console.error('Error sending request:', error);
      toast({
        title: 'Error',
        description: 'Failed to send connection request',
        variant: 'destructive',
      });
    } finally {
      setSendingRequest(false);
    }
  };

  const handleRemoveConnection = async (connectionId: string) => {
    if (!user?.id) return;

    try {
      const { error } = await removeConnection(connectionId, user.id);
      if (error) {
        toast({
          title: 'Error',
          description: 'Failed to remove connection',
          variant: 'destructive',
        });
        return;
      }

      toast({
        title: 'Success',
        description: 'Connection removed',
      });

      // Refresh data
      await loadAllData();
    } catch (error) {
      console.error('Error removing connection:', error);
      toast({
        title: 'Error',
        description: 'Failed to remove connection',
        variant: 'destructive',
      });
    }
  };

  const handleMessageUser = async (userId: string, userName: string) => {
    if (!user?.id) return;

    try {
      // Get or create conversation with the user
      const conversation = await getOrCreateDirectConversation(user.id, userId);

      if (!conversation) {
        toast({
          title: 'Error',
          description: 'Failed to start conversation',
          variant: 'destructive',
        });
        return;
      }

      // Navigate to messages page with the conversation
      navigate(`/messages?conversation=${conversation.id}`);
    } catch (error) {
      console.error('Error starting conversation:', error);
      toast({
        title: 'Error',
        description: 'Failed to start conversation',
        variant: 'destructive',
      });
    }
  };

  const handleViewProfile = (userId: string) => {
    // Navigate to user profile page
    navigate(`/profile/${userId}`);
  };

  // Load data on component mount
  useEffect(() => {
    if (user?.id) {
      loadAllData();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user?.id]);

  // Filter data based on search and filter
  const filteredRequests = connectionRequests.filter((request) => {
    const requestUser = request.requester || request.addressee;
    const matchesSearch = requestUser?.display_name
      .toLowerCase()
      .includes(searchTerm.toLowerCase());
    const matchesFilter =
      filterType === 'all' || requestUser?.role === filterType;
    return matchesSearch && matchesFilter;
  });

  const filteredRecommendations = peopleRecommendations.filter((person) => {
    const matchesSearch = person.name
      .toLowerCase()
      .includes(searchTerm.toLowerCase());
    const matchesFilter = filterType === 'all' || person.role === filterType;
    return matchesSearch && matchesFilter;
  });

  const filteredConnections = allConnections.filter((connection) => {
    const connectionUser =
      connection.requester?.id === user?.id
        ? connection.addressee
        : connection.requester;
    const matchesSearch = connectionUser?.display_name
      .toLowerCase()
      .includes(searchTerm.toLowerCase());
    const matchesFilter =
      filterType === 'all' || connectionUser?.role === filterType;
    return matchesSearch && matchesFilter;
  });

  const getRoleColor = (role: string) => {
    switch (role) {
      case 'student':
        return 'text-blue-600 bg-blue-100 border-blue-200';
      case 'professor':
        return 'text-green-600 bg-green-100 border-green-200';
      case 'university':
        return 'text-orange-600 bg-orange-100 border-orange-200';
      default:
        return 'text-gray-600 bg-gray-100 border-gray-200';
    }
  };

  const getRoleIcon = (role: string) => {
    switch (role) {
      case 'student':
        return GraduationCap;
      case 'professor':
        return UserCheck;
      case 'university':
        return Building2;
      default:
        return Users;
    }
  };

  const getConnectionStrengthColor = (strength: string) => {
    switch (strength) {
      case 'Strong':
        return 'text-green-600 bg-green-100 border-green-200';
      case 'Medium':
        return 'text-yellow-600 bg-yellow-100 border-yellow-200';
      case 'Weak':
        return 'text-red-600 bg-red-100 border-red-200';
      default:
        return 'text-gray-600 bg-gray-100 border-gray-200';
    }
  };

  const getTabColor = (tab: string) => {
    switch (tab) {
      case 'requests':
        return 'data-[state=active]:bg-blue-500 data-[state=active]:text-white hover:bg-blue-50';
      case 'recommendations':
        return 'data-[state=active]:bg-purple-500 data-[state=active]:text-white hover:bg-purple-50';
      case 'connections':
        return 'data-[state=active]:bg-green-500 data-[state=active]:text-white hover:bg-green-50';
      default:
        return 'data-[state=active]:bg-gray-500 data-[state=active]:text-white hover:bg-gray-50';
    }
  };

  return (
    <div className='space-y-6'>
      {/* Header */}
      <div className='flex items-center justify-between'>
        <div>
          <h1 className='text-3xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent'>
            My Network
          </h1>
          <p className='text-gray-600 mt-1'>
            Manage your professional connections and discover new opportunities
          </p>
        </div>
        <div className='flex gap-2'>
          <Button
            variant='outline'
            onClick={loadAllData}
            disabled={refreshing}
            className='hover:bg-blue-50 border-blue-200'
          >
            {refreshing ? (
              <Loader2 className='h-4 w-4 mr-2 animate-spin' />
            ) : (
              <RefreshCw className='h-4 w-4 mr-2' />
            )}
            Refresh
          </Button>
          <Button className='bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white shadow-lg'>
            <Plus className='h-4 w-4 mr-2' />
            Connect
          </Button>
        </div>
      </div>

      {/* Enhanced Stats Cards */}
      <div className='grid grid-cols-1 md:grid-cols-4 gap-4'>
        <Card className='border-l-4 border-l-blue-500 hover:shadow-lg transition-shadow'>
          <CardContent className='p-4'>
            <div className='flex items-center gap-3'>
              <div className='p-3 bg-gradient-to-br from-blue-100 to-blue-200 rounded-xl'>
                <UserPlus className='h-6 w-6 text-blue-600' />
              </div>
              <div>
                <p className='text-sm text-gray-600 font-medium'>
                  Connection Requests
                </p>
                <p className='text-2xl font-bold text-blue-600'>
                  {connectionRequests.length}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card className='border-l-4 border-l-green-500 hover:shadow-lg transition-shadow'>
          <CardContent className='p-4'>
            <div className='flex items-center gap-3'>
              <div className='p-3 bg-gradient-to-br from-green-100 to-green-200 rounded-xl'>
                <Users className='h-6 w-6 text-green-600' />
              </div>
              <div>
                <p className='text-sm text-gray-600 font-medium'>
                  Total Connections
                </p>
                <p className='text-2xl font-bold text-green-600'>
                  {allConnections.length}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card className='border-l-4 border-l-purple-500 hover:shadow-lg transition-shadow'>
          <CardContent className='p-4'>
            <div className='flex items-center gap-3'>
              <div className='p-3 bg-gradient-to-br from-purple-100 to-purple-200 rounded-xl'>
                <Star className='h-6 w-6 text-purple-600' />
              </div>
              <div>
                <p className='text-sm text-gray-600 font-medium'>
                  Recommendations
                </p>
                <p className='text-2xl font-bold text-purple-600'>
                  {peopleRecommendations.length}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card className='border-l-4 border-l-orange-500 hover:shadow-lg transition-shadow'>
          <CardContent className='p-4'>
            <div className='flex items-center gap-3'>
              <div className='p-3 bg-gradient-to-br from-orange-100 to-orange-200 rounded-xl'>
                <TrendingUp className='h-6 w-6 text-orange-600' />
              </div>
              <div>
                <p className='text-sm text-gray-600 font-medium'>
                  Network Growth
                </p>
                <p className='text-2xl font-bold text-orange-600'>+12%</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Enhanced Main Content */}
      <Tabs value={activeTab} onValueChange={setActiveTab} className='w-full'>
        <TabsList className='grid w-full grid-cols-3 bg-gray-100 p-1 rounded-lg'>
          <TabsTrigger
            value='requests'
            className={`${getTabColor(
              'requests'
            )} rounded-md font-medium transition-all`}
          >
            <UserPlus className='h-4 w-4 mr-2' />
            Connection Requests
            {connectionRequests.length > 0 && (
              <Badge className='ml-2 bg-blue-500 text-white'>
                {connectionRequests.length}
              </Badge>
            )}
          </TabsTrigger>
          <TabsTrigger
            value='recommendations'
            className={`${getTabColor(
              'recommendations'
            )} rounded-md font-medium transition-all`}
          >
            <Star className='h-4 w-4 mr-2' />
            Recommendations
            {peopleRecommendations.length > 0 && (
              <Badge className='ml-2 bg-purple-500 text-white'>
                {peopleRecommendations.length}
              </Badge>
            )}
          </TabsTrigger>
          <TabsTrigger
            value='connections'
            className={`${getTabColor(
              'connections'
            )} rounded-md font-medium transition-all`}
          >
            <Users className='h-4 w-4 mr-2' />
            All Connections
            {allConnections.length > 0 && (
              <Badge className='ml-2 bg-green-500 text-white'>
                {allConnections.length}
              </Badge>
            )}
          </TabsTrigger>
        </TabsList>

        <TabsContent value='requests' className='space-y-4'>
          {/* Enhanced Filters */}
          <div className='flex gap-4'>
            <div className='flex-1'>
              <div className='relative'>
                <Search className='absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4' />
                <Input
                  placeholder='Search connection requests...'
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className='pl-10 border-gray-200 focus:border-blue-500 focus:ring-blue-500'
                />
              </div>
            </div>
            <Select value={filterType} onValueChange={setFilterType}>
              <SelectTrigger className='w-[150px] border-gray-200 focus:border-blue-500'>
                <Filter className='h-4 w-4 mr-2' />
                <SelectValue placeholder='Filter by role' />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value='all'>All Roles</SelectItem>
                <SelectItem value='student'>Students</SelectItem>
                <SelectItem value='professor'>Professors</SelectItem>
                <SelectItem value='university'>Universities</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Enhanced Connection Requests List */}
          <div className='space-y-4'>
            {loading ? (
              <div className='flex items-center justify-center py-8'>
                <Loader2 className='h-8 w-8 animate-spin text-blue-600' />
                <span className='ml-2 text-gray-600'>
                  Loading connection requests...
                </span>
              </div>
            ) : filteredRequests.length === 0 ? (
              <Card className='p-8 text-center'>
                <UserPlus className='h-12 w-12 text-gray-400 mx-auto mb-4' />
                <h3 className='text-lg font-semibold text-gray-900 mb-2'>
                  No connection requests
                </h3>
                <p className='text-gray-600'>
                  You don't have any pending connection requests at the moment.
                </p>
              </Card>
            ) : (
              filteredRequests.map((request) => {
                const requestUser = request.requester || request.addressee;
                const RoleIcon = getRoleIcon(requestUser?.role || '');
                return (
                  <Card
                    key={request.id}
                    className='hover:shadow-lg transition-shadow border-l-4 border-l-blue-500'
                  >
                    <CardContent className='p-6'>
                      <div className='flex items-start justify-between'>
                        <div className='flex items-start gap-4 flex-1'>
                          <Avatar className='h-14 w-14 border-2 border-blue-100'>
                            <AvatarImage
                              src={requestUser?.avatar}
                              alt={requestUser?.display_name}
                            />
                            <AvatarFallback
                              className={getRoleColor(requestUser?.role || '')}
                            >
                              {requestUser?.display_name
                                ?.split(' ')
                                .map((n) => n[0])
                                .join('')}
                            </AvatarFallback>
                          </Avatar>
                          <div className='flex-1'>
                            <div className='flex items-center gap-2 mb-2'>
                              <h3 className='text-xl font-semibold text-gray-900'>
                                {requestUser?.display_name}
                              </h3>
                              <Badge
                                className={`${getRoleColor(
                                  requestUser?.role || ''
                                )} border`}
                              >
                                <RoleIcon className='h-3 w-3 mr-1' />
                                {requestUser?.role}
                              </Badge>
                            </div>
                            <p className='text-sm text-gray-600 mb-1'>
                              {requestUser?.role === 'student'
                                ? 'Student'
                                : requestUser?.role === 'professor'
                                ? 'Professor'
                                : 'University Representative'}
                            </p>
                            <p className='text-sm text-gray-600 mb-3'>
                              {requestUser?.university ||
                                'University not specified'}
                            </p>
                            <div className='flex items-center gap-4 text-sm text-gray-500 mb-3'>
                              <div className='flex items-center gap-1'>
                                <MapPin className='h-4 w-4' />
                                <span>
                                  {requestUser?.country ||
                                    'Location not specified'}
                                </span>
                              </div>
                              <div className='flex items-center gap-1'>
                                <Clock className='h-4 w-4' />
                                <span>
                                  {new Date(
                                    request.created_at
                                  ).toLocaleDateString()}
                                </span>
                              </div>
                            </div>
                            {request.message && (
                              <div className='bg-blue-50 border border-blue-200 p-3 rounded-lg mb-3'>
                                <p className='text-sm text-blue-800 font-medium mb-1'>
                                  Message:
                                </p>
                                <p className='text-sm text-blue-700'>
                                  "{request.message}"
                                </p>
                              </div>
                            )}
                          </div>
                        </div>
                        <div className='flex gap-2'>
                          <Button
                            size='sm'
                            onClick={() => handleAcceptRequest(request.id)}
                            className='bg-green-600 hover:bg-green-700 text-white shadow-md'
                          >
                            <Check className='h-4 w-4 mr-1' />
                            Accept
                          </Button>
                          <Button
                            size='sm'
                            variant='outline'
                            onClick={() => handleDeclineRequest(request.id)}
                            className='border-red-200 text-red-600 hover:bg-red-50'
                          >
                            <X className='h-4 w-4 mr-1' />
                            Decline
                          </Button>
                          <Button
                            size='sm'
                            variant='outline'
                            onClick={() =>
                              handleMessageUser(
                                requestUser?.id || '',
                                requestUser?.display_name || ''
                              )
                            }
                            className='border-gray-200 hover:bg-gray-50'
                          >
                            <MessageSquare className='h-4 w-4' />
                          </Button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                );
              })
            )}
          </div>
        </TabsContent>

        <TabsContent value='recommendations' className='space-y-4'>
          {/* Enhanced Filters */}
          <div className='flex gap-4'>
            <div className='flex-1'>
              <div className='relative'>
                <Search className='absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4' />
                <Input
                  placeholder='Search recommendations...'
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className='pl-10 border-gray-200 focus:border-purple-500 focus:ring-purple-500'
                />
              </div>
            </div>
            <Select value={filterType} onValueChange={setFilterType}>
              <SelectTrigger className='w-[150px] border-gray-200 focus:border-purple-500'>
                <Filter className='h-4 w-4 mr-2' />
                <SelectValue placeholder='Filter by role' />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value='all'>All Roles</SelectItem>
                <SelectItem value='student'>Students</SelectItem>
                <SelectItem value='professor'>Professors</SelectItem>
                <SelectItem value='university'>Universities</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Enhanced People Recommendations List */}
          <div className='space-y-4'>
            {loading ? (
              <div className='flex items-center justify-center py-8'>
                <Loader2 className='h-8 w-8 animate-spin text-purple-600' />
                <span className='ml-2 text-gray-600'>
                  Loading recommendations...
                </span>
              </div>
            ) : filteredRecommendations.length === 0 ? (
              <Card className='p-8 text-center'>
                <Star className='h-12 w-12 text-gray-400 mx-auto mb-4' />
                <h3 className='text-lg font-semibold text-gray-900 mb-2'>
                  No recommendations
                </h3>
                <p className='text-gray-600'>
                  We couldn't find any people to recommend at the moment.
                </p>
              </Card>
            ) : (
              filteredRecommendations.map((person) => {
                const RoleIcon = getRoleIcon(person.role);
                return (
                  <Card
                    key={person.id}
                    className='hover:shadow-lg transition-shadow border-l-4 border-l-purple-500'
                  >
                    <CardContent className='p-6'>
                      <div className='flex items-start justify-between'>
                        <div className='flex items-start gap-4 flex-1'>
                          <Avatar className='h-14 w-14 border-2 border-purple-100'>
                            <AvatarImage
                              src={person.avatar}
                              alt={person.name}
                            />
                            <AvatarFallback
                              className={getRoleColor(person.role)}
                            >
                              {person.name
                                .split(' ')
                                .map((n) => n[0])
                                .join('')}
                            </AvatarFallback>
                          </Avatar>
                          <div className='flex-1'>
                            <div className='flex items-center gap-2 mb-2'>
                              <h3 className='text-xl font-semibold text-gray-900'>
                                {person.name}
                              </h3>
                              <Badge
                                className={`${getRoleColor(
                                  person.role
                                )} border`}
                              >
                                <RoleIcon className='h-3 w-3 mr-1' />
                                {person.role}
                              </Badge>
                              <Badge
                                className={getConnectionStrengthColor(
                                  person.connectionStrength
                                )}
                              >
                                {person.connectionStrength}
                              </Badge>
                            </div>
                            <p className='text-sm text-gray-600 mb-1'>
                              {person.title}
                            </p>
                            <p className='text-sm text-gray-600 mb-3'>
                              {person.university}
                            </p>
                            <div className='flex items-center gap-4 text-sm text-gray-500 mb-3'>
                              <div className='flex items-center gap-1'>
                                <MapPin className='h-4 w-4' />
                                <span>{person.location}</span>
                              </div>
                            </div>
                            <div className='bg-purple-50 border border-purple-200 p-3 rounded-lg mb-3'>
                              <p className='text-sm text-purple-800 font-medium mb-1'>
                                💡 Recommendation:
                              </p>
                              <p className='text-sm text-purple-700'>
                                {person.reason}
                              </p>
                            </div>
                            {person.interests &&
                              person.interests.length > 0 && (
                                <div className='flex flex-wrap gap-2'>
                                  {person.interests
                                    .slice(0, 5)
                                    .map((interest, index) => (
                                      <Badge
                                        key={index}
                                        variant='outline'
                                        className='text-xs border-purple-200 text-purple-700'
                                      >
                                        {interest}
                                      </Badge>
                                    ))}
                                </div>
                              )}
                          </div>
                        </div>
                        <div className='flex gap-2'>
                          <Button
                            size='sm'
                            onClick={() => {
                              setSelectedUser(person);
                              setIsRequestDialogOpen(true);
                            }}
                            className='bg-purple-600 hover:bg-purple-700 text-white shadow-md'
                          >
                            <UserPlus className='h-4 w-4 mr-1' />
                            Connect
                          </Button>
                          <Button
                            size='sm'
                            variant='outline'
                            onClick={() => handleViewProfile(person.id)}
                            className='border-gray-200 hover:bg-gray-50'
                          >
                            <Eye className='h-4 w-4' />
                          </Button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                );
              })
            )}
          </div>
        </TabsContent>

        <TabsContent value='connections' className='space-y-4'>
          {/* Enhanced Filters */}
          <div className='flex gap-4'>
            <div className='flex-1'>
              <div className='relative'>
                <Search className='absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4' />
                <Input
                  placeholder='Search connections...'
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className='pl-10 border-gray-200 focus:border-green-500 focus:ring-green-500'
                />
              </div>
            </div>
            <Select value={filterType} onValueChange={setFilterType}>
              <SelectTrigger className='w-[150px] border-gray-200 focus:border-green-500'>
                <Filter className='h-4 w-4 mr-2' />
                <SelectValue placeholder='Filter by role' />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value='all'>All Roles</SelectItem>
                <SelectItem value='student'>Students</SelectItem>
                <SelectItem value='professor'>Professors</SelectItem>
                <SelectItem value='university'>Universities</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Enhanced All Connections List */}
          <div className='space-y-4'>
            {loading ? (
              <div className='flex items-center justify-center py-8'>
                <Loader2 className='h-8 w-8 animate-spin text-green-600' />
                <span className='ml-2 text-gray-600'>
                  Loading connections...
                </span>
              </div>
            ) : filteredConnections.length === 0 ? (
              <Card className='p-8 text-center'>
                <Users className='h-12 w-12 text-gray-400 mx-auto mb-4' />
                <h3 className='text-lg font-semibold text-gray-900 mb-2'>
                  No connections
                </h3>
                <p className='text-gray-600'>
                  You don't have any connections yet. Start building your
                  network!
                </p>
              </Card>
            ) : (
              filteredConnections.map((connection) => {
                const connectionUser =
                  connection.requester?.id === user?.id
                    ? connection.addressee
                    : connection.requester;
                const RoleIcon = getRoleIcon(connectionUser?.role || '');
                return (
                  <Card
                    key={connection.id}
                    className='hover:shadow-lg transition-shadow border-l-4 border-l-green-500'
                  >
                    <CardContent className='p-6'>
                      <div className='flex items-start justify-between'>
                        <div className='flex items-start gap-4 flex-1'>
                          <Avatar className='h-14 w-14 border-2 border-green-100'>
                            <AvatarImage
                              src={connectionUser?.avatar}
                              alt={connectionUser?.display_name}
                            />
                            <AvatarFallback
                              className={getRoleColor(
                                connectionUser?.role || ''
                              )}
                            >
                              {connectionUser?.display_name
                                ?.split(' ')
                                .map((n) => n[0])
                                .join('')}
                            </AvatarFallback>
                          </Avatar>
                          <div className='flex-1'>
                            <div className='flex items-center gap-2 mb-2'>
                              <h3 className='text-xl font-semibold text-gray-900'>
                                {connectionUser?.display_name}
                              </h3>
                              <Badge
                                className={`${getRoleColor(
                                  connectionUser?.role || ''
                                )} border`}
                              >
                                <RoleIcon className='h-3 w-3 mr-1' />
                                {connectionUser?.role}
                              </Badge>
                              <Badge className='bg-green-100 text-green-700 border-green-200'>
                                Connected
                              </Badge>
                            </div>
                            <p className='text-sm text-gray-600 mb-1'>
                              {connectionUser?.role === 'student'
                                ? 'Student'
                                : connectionUser?.role === 'professor'
                                ? 'Professor'
                                : 'University Representative'}
                            </p>
                            <p className='text-sm text-gray-600 mb-3'>
                              {connectionUser?.university ||
                                'University not specified'}
                            </p>
                            <div className='flex items-center gap-4 text-sm text-gray-500 mb-3'>
                              <div className='flex items-center gap-1'>
                                <MapPin className='h-4 w-4' />
                                <span>
                                  {connectionUser?.country ||
                                    'Location not specified'}
                                </span>
                              </div>
                              <div className='flex items-center gap-1'>
                                <Calendar className='h-4 w-4' />
                                <span>
                                  Connected{' '}
                                  {new Date(
                                    connection.created_at
                                  ).toLocaleDateString()}
                                </span>
                              </div>
                            </div>
                          </div>
                        </div>
                        <div className='flex gap-2'>
                          <Button
                            size='sm'
                            variant='outline'
                            onClick={() =>
                              handleMessageUser(
                                connectionUser?.id || '',
                                connectionUser?.display_name || ''
                              )
                            }
                            className='border-green-200 text-green-600 hover:bg-green-50'
                          >
                            <MessageSquare className='h-4 w-4 mr-1' />
                            Message
                          </Button>
                          <Button
                            size='sm'
                            variant='outline'
                            onClick={() =>
                              handleViewProfile(connectionUser?.id || '')
                            }
                            className='border-gray-200 hover:bg-gray-50'
                          >
                            <Eye className='h-4 w-4 mr-1' />
                            View Profile
                          </Button>
                          <Button
                            size='sm'
                            variant='outline'
                            onClick={() =>
                              handleRemoveConnection(connection.id)
                            }
                            className='border-red-200 text-red-600 hover:bg-red-50'
                          >
                            <UserX className='h-4 w-4' />
                          </Button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                );
              })
            )}
          </div>
        </TabsContent>
      </Tabs>

      {/* Connection Request Dialog */}
      <Dialog open={isRequestDialogOpen} onOpenChange={setIsRequestDialogOpen}>
        <DialogContent className='sm:max-w-md'>
          <DialogHeader>
            <DialogTitle className='flex items-center gap-2'>
              <UserPlus className='h-5 w-5 text-purple-600' />
              Send Connection Request
            </DialogTitle>
            <DialogDescription>
              Send a personalized message to {selectedUser?.name} to start
              building your professional network.
            </DialogDescription>
          </DialogHeader>

          {selectedUser && (
            <div className='flex items-center gap-3 p-4 bg-gray-50 rounded-lg mb-4'>
              <Avatar className='h-12 w-12'>
                <AvatarImage
                  src={selectedUser.avatar}
                  alt={selectedUser.name}
                />
                <AvatarFallback className={getRoleColor(selectedUser.role)}>
                  {selectedUser.name
                    .split(' ')
                    .map((n) => n[0])
                    .join('')}
                </AvatarFallback>
              </Avatar>
              <div>
                <h4 className='font-semibold text-gray-900'>
                  {selectedUser.name}
                </h4>
                <p className='text-sm text-gray-600'>{selectedUser.title}</p>
                <p className='text-sm text-gray-500'>
                  {selectedUser.university}
                </p>
              </div>
            </div>
          )}

          <div className='space-y-4'>
            <div>
              <Label
                htmlFor='message'
                className='text-sm font-medium text-gray-700'
              >
                Personal Message (Optional)
              </Label>
              <Textarea
                id='message'
                placeholder='Hi! I would like to connect with you to discuss...'
                value={requestMessage}
                onChange={(e) => setRequestMessage(e.target.value)}
                className='mt-1 border-gray-200 focus:border-purple-500 focus:ring-purple-500'
                rows={3}
              />
              <p className='text-xs text-gray-500 mt-1'>
                A personal message increases the chances of your request being
                accepted.
              </p>
            </div>
          </div>

          <DialogFooter className='gap-2'>
            <Button
              variant='outline'
              onClick={() => {
                setIsRequestDialogOpen(false);
                setRequestMessage('');
                setSelectedUser(null);
              }}
              disabled={sendingRequest}
            >
              Cancel
            </Button>
            <Button
              onClick={() =>
                selectedUser &&
                handleSendRequest(selectedUser.id, requestMessage)
              }
              disabled={sendingRequest}
              className='bg-purple-600 hover:bg-purple-700 text-white'
            >
              {sendingRequest ? (
                <>
                  <Loader2 className='h-4 w-4 mr-2 animate-spin' />
                  Sending...
                </>
              ) : (
                <>
                  <Send className='h-4 w-4 mr-2' />
                  Send Request
                </>
              )}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default MyNetwork;
