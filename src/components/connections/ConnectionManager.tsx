import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import {
  Users,
  UserPlus,
  UserCheck,
  UserX,
  Search,
  Filter,
  MessageCircle,
  MoreHorizontal,
  MapPin,
  GraduationCap,
  Building2,
  Star,
  Clock,
  CheckCircle,
  XCircle,
  AlertCircle,
} from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';
import { useToast } from '@/hooks/use-toast';
import {
  sendConnectionRequest,
  acceptConnectionRequest,
  declineConnectionRequest,
  removeConnection,
  getConnections,
  getConnectionRequests,
  checkConnection,
} from '@/lib/api/connections';

interface Connection {
  id: string;
  user: {
    id: string;
    display_name: string;
    avatar?: string;
    role: 'student' | 'professor' | 'university';
    university?: string;
    country: string;
    city?: string;
    bio?: string;
    skills?: string[];
    academic_interests?: string[];
  };
  status: 'accepted' | 'pending';
  created_at: string;
  is_requester: boolean;
}

interface ConnectionRequest {
  id: string;
  requester: {
    id: string;
    display_name: string;
    avatar?: string;
    role: 'student' | 'professor' | 'university';
    university?: string;
    country: string;
    bio?: string;
  };
  message?: string;
  created_at: string;
  status: 'pending' | 'accepted' | 'declined';
}

interface ConnectionManagerProps {
  userId: string;
  compact?: boolean;
}

export const ConnectionManager: React.FC<ConnectionManagerProps> = ({
  userId,
  compact = false,
}) => {
  const { user } = useAuth();
  const { toast } = useToast();
  const [connections, setConnections] = useState<Connection[]>([]);
  const [connectionRequests, setConnectionRequests] = useState<
    ConnectionRequest[]
  >([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterRole, setFilterRole] = useState<
    'all' | 'student' | 'professor' | 'university'
  >('all');
  const [activeTab, setActiveTab] = useState('connections');

  useEffect(() => {
    fetchConnections();
    fetchConnectionRequests();
  }, [userId]);

  const fetchConnections = async () => {
    try {
      const { data, error } = await getConnections(userId);
      if (error) {
        console.error('Error fetching connections:', error);
        return;
      }
      setConnections(data || []);
    } catch (error) {
      console.error('Error fetching connections:', error);
    }
  };

  const fetchConnectionRequests = async () => {
    try {
      const { data, error } = await getConnectionRequests(userId);
      if (error) {
        console.error('Error fetching connection requests:', error);
        return;
      }
      setConnectionRequests(data || []);
    } catch (error) {
      console.error('Error fetching connection requests:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleAcceptRequest = async (requestId: string) => {
    try {
      const { data, error } = await acceptConnectionRequest(requestId, userId);
      if (error) {
        toast({
          title: 'Error',
          description: error,
          variant: 'destructive',
        });
        return;
      }

      toast({
        title: 'Connection Accepted',
        description: 'You are now connected!',
      });

      // Refresh data
      fetchConnections();
      fetchConnectionRequests();
    } catch (error) {
      toast({
        title: 'Error',
        description: 'Failed to accept connection request',
        variant: 'destructive',
      });
    }
  };

  const handleDeclineRequest = async (requestId: string) => {
    try {
      const { error } = await declineConnectionRequest(requestId, userId);
      if (error) {
        toast({
          title: 'Error',
          description: error,
          variant: 'destructive',
        });
        return;
      }

      toast({
        title: 'Request Declined',
        description: 'Connection request has been declined',
      });

      // Refresh data
      fetchConnectionRequests();
    } catch (error) {
      toast({
        title: 'Error',
        description: 'Failed to decline connection request',
        variant: 'destructive',
      });
    }
  };

  const handleRemoveConnection = async (connectionId: string) => {
    try {
      const { error } = await removeConnection(connectionId);
      if (error) {
        toast({
          title: 'Error',
          description: error,
          variant: 'destructive',
        });
        return;
      }

      toast({
        title: 'Connection Removed',
        description: 'Connection has been removed',
      });

      // Refresh data
      fetchConnections();
    } catch (error) {
      toast({
        title: 'Error',
        description: 'Failed to remove connection',
        variant: 'destructive',
      });
    }
  };

  const getRoleIcon = (role: string) => {
    switch (role) {
      case 'professor':
        return <GraduationCap className='w-4 h-4' />;
      case 'university':
        return <Building2 className='w-4 h-4' />;
      default:
        return <Users className='w-4 h-4' />;
    }
  };

  const getRoleColor = (role: string) => {
    switch (role) {
      case 'professor':
        return 'bg-blue-100 text-blue-800';
      case 'university':
        return 'bg-purple-100 text-purple-800';
      default:
        return 'bg-green-100 text-green-800';
    }
  };

  const filteredConnections = connections.filter((connection) => {
    const matchesSearch =
      connection.user.display_name
        .toLowerCase()
        .includes(searchTerm.toLowerCase()) ||
      connection.user.university
        ?.toLowerCase()
        .includes(searchTerm.toLowerCase()) ||
      connection.user.country.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesRole =
      filterRole === 'all' || connection.user.role === filterRole;
    return matchesSearch && matchesRole;
  });

  const pendingRequests = connectionRequests.filter(
    (request) => request.status === 'pending'
  );

  if (loading) {
    return (
      <div className='space-y-4'>
        <div className='animate-pulse'>
          <div className='h-4 bg-gray-200 rounded w-1/4 mb-4'></div>
          <div className='space-y-3'>
            {[1, 2, 3].map((i) => (
              <div key={i} className='h-16 bg-gray-200 rounded'></div>
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
          <h3 className='text-sm font-medium'>Connections</h3>
          <Badge variant='outline'>{connections.length}</Badge>
        </div>

        <div className='space-y-2'>
          {connections.slice(0, 3).map((connection) => (
            <div
              key={connection.id}
              className='flex items-center gap-3 p-2 border rounded-lg'
            >
              <Avatar className='w-8 h-8'>
                <AvatarImage src={connection.user.avatar} />
                <AvatarFallback>
                  {connection.user.display_name.charAt(0)}
                </AvatarFallback>
              </Avatar>
              <div className='flex-1 min-w-0'>
                <p className='text-sm font-medium truncate'>
                  {connection.user.display_name}
                </p>
                <p className='text-xs text-muted-foreground truncate'>
                  {connection.user.university || connection.user.country}
                </p>
              </div>
            </div>
          ))}
        </div>

        {connections.length > 3 && (
          <Button variant='outline' size='sm' className='w-full'>
            View All ({connections.length})
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
          <h3 className='text-lg font-semibold'>Connections</h3>
          <p className='text-sm text-muted-foreground'>
            {connections.length} connections • {pendingRequests.length} pending
            requests
          </p>
        </div>
        <Button>
          <UserPlus className='w-4 h-4 mr-2' />
          Find People
        </Button>
      </div>

      {/* Search and Filter */}
      <div className='flex gap-4'>
        <div className='flex-1'>
          <div className='relative'>
            <Search className='absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4' />
            <Input
              placeholder='Search connections...'
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className='pl-10'
            />
          </div>
        </div>
        <div className='flex gap-2'>
          {(['all', 'student', 'professor', 'university'] as const).map(
            (role) => (
              <Button
                key={role}
                variant={filterRole === role ? 'default' : 'outline'}
                size='sm'
                onClick={() => setFilterRole(role)}
              >
                {role === 'all'
                  ? 'All'
                  : role.charAt(0).toUpperCase() + role.slice(1)}
              </Button>
            )
          )}
        </div>
      </div>

      {/* Tabs */}
      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList>
          <TabsTrigger value='connections'>
            Connections ({connections.length})
          </TabsTrigger>
          <TabsTrigger value='requests'>
            Requests ({pendingRequests.length})
          </TabsTrigger>
        </TabsList>

        <TabsContent value='connections' className='space-y-4'>
          {filteredConnections.length === 0 ? (
            <Card>
              <CardContent className='p-6 text-center'>
                <Users className='w-12 h-12 text-muted-foreground mx-auto mb-4' />
                <h3 className='text-lg font-medium mb-2'>
                  No connections found
                </h3>
                <p className='text-muted-foreground mb-4'>
                  {searchTerm || filterRole !== 'all'
                    ? 'Try adjusting your search or filter criteria'
                    : 'Start building your network by connecting with other users'}
                </p>
                <Button>
                  <UserPlus className='w-4 h-4 mr-2' />
                  Find People to Connect
                </Button>
              </CardContent>
            </Card>
          ) : (
            <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4'>
              {filteredConnections.map((connection) => (
                <Card key={connection.id}>
                  <CardContent className='p-4'>
                    <div className='flex items-start gap-3'>
                      <Avatar className='w-12 h-12'>
                        <AvatarImage src={connection.user.avatar} />
                        <AvatarFallback>
                          {connection.user.display_name.charAt(0)}
                        </AvatarFallback>
                      </Avatar>

                      <div className='flex-1 min-w-0'>
                        <div className='flex items-center gap-2 mb-1'>
                          <h4 className='font-medium truncate'>
                            {connection.user.display_name}
                          </h4>
                          <Badge
                            className={`text-xs ${getRoleColor(
                              connection.user.role
                            )}`}
                          >
                            {getRoleIcon(connection.user.role)}
                            <span className='ml-1 capitalize'>
                              {connection.user.role}
                            </span>
                          </Badge>
                        </div>

                        <div className='space-y-1 text-sm text-muted-foreground'>
                          {connection.user.university && (
                            <div className='flex items-center gap-1'>
                              <GraduationCap className='w-3 h-3' />
                              <span className='truncate'>
                                {connection.user.university}
                              </span>
                            </div>
                          )}
                          <div className='flex items-center gap-1'>
                            <MapPin className='w-3 h-3' />
                            <span>{connection.user.country}</span>
                          </div>
                        </div>

                        {connection.user.skills &&
                          connection.user.skills.length > 0 && (
                            <div className='flex flex-wrap gap-1 mt-2'>
                              {connection.user.skills
                                .slice(0, 2)
                                .map((skill, index) => (
                                  <Badge
                                    key={index}
                                    variant='outline'
                                    className='text-xs'
                                  >
                                    {skill}
                                  </Badge>
                                ))}
                              {connection.user.skills.length > 2 && (
                                <Badge variant='outline' className='text-xs'>
                                  +{connection.user.skills.length - 2}
                                </Badge>
                              )}
                            </div>
                          )}
                      </div>

                      <div className='flex flex-col gap-1'>
                        <Button size='sm' variant='outline'>
                          <MessageCircle className='w-3 h-3' />
                        </Button>
                        <Button
                          size='sm'
                          variant='outline'
                          onClick={() => handleRemoveConnection(connection.id)}
                        >
                          <UserX className='w-3 h-3' />
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </TabsContent>

        <TabsContent value='requests' className='space-y-4'>
          {pendingRequests.length === 0 ? (
            <Card>
              <CardContent className='p-6 text-center'>
                <UserCheck className='w-12 h-12 text-muted-foreground mx-auto mb-4' />
                <h3 className='text-lg font-medium mb-2'>
                  No pending requests
                </h3>
                <p className='text-muted-foreground'>
                  You don't have any pending connection requests at the moment.
                </p>
              </CardContent>
            </Card>
          ) : (
            <div className='space-y-4'>
              {pendingRequests.map((request) => (
                <Card key={request.id}>
                  <CardContent className='p-4'>
                    <div className='flex items-start gap-3'>
                      <Avatar className='w-12 h-12'>
                        <AvatarImage src={request.requester.avatar} />
                        <AvatarFallback>
                          {request.requester.display_name.charAt(0)}
                        </AvatarFallback>
                      </Avatar>

                      <div className='flex-1 min-w-0'>
                        <div className='flex items-center gap-2 mb-1'>
                          <h4 className='font-medium'>
                            {request.requester.display_name}
                          </h4>
                          <Badge
                            className={`text-xs ${getRoleColor(
                              request.requester.role
                            )}`}
                          >
                            {getRoleIcon(request.requester.role)}
                            <span className='ml-1 capitalize'>
                              {request.requester.role}
                            </span>
                          </Badge>
                        </div>

                        <div className='space-y-1 text-sm text-muted-foreground mb-2'>
                          {request.requester.university && (
                            <div className='flex items-center gap-1'>
                              <GraduationCap className='w-3 h-3' />
                              <span>{request.requester.university}</span>
                            </div>
                          )}
                          <div className='flex items-center gap-1'>
                            <MapPin className='w-3 h-3' />
                            <span>{request.requester.country}</span>
                          </div>
                          <div className='flex items-center gap-1'>
                            <Clock className='w-3 h-3' />
                            <span>
                              {new Date(
                                request.created_at
                              ).toLocaleDateString()}
                            </span>
                          </div>
                        </div>

                        {request.message && (
                          <div className='p-2 bg-muted rounded text-sm'>
                            "{request.message}"
                          </div>
                        )}
                      </div>

                      <div className='flex flex-col gap-2'>
                        <Button
                          size='sm'
                          onClick={() => handleAcceptRequest(request.id)}
                          className='bg-green-600 hover:bg-green-700'
                        >
                          <CheckCircle className='w-3 h-3 mr-1' />
                          Accept
                        </Button>
                        <Button
                          size='sm'
                          variant='outline'
                          onClick={() => handleDeclineRequest(request.id)}
                        >
                          <XCircle className='w-3 h-3 mr-1' />
                          Decline
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </TabsContent>
      </Tabs>
    </div>
  );
};
