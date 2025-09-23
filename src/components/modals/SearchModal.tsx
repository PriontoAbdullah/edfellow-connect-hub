import { useState, useEffect, useCallback } from 'react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { CountryFlag } from '@/components/ui/CountryFlag';
import { useToast } from '@/hooks/use-toast';
import { useAuth } from '@/contexts/AuthContext';
import ViewProfileModal from './ViewProfileModal';
import { searchProfiles } from '@/lib/api/profiles';
import { sendConnectionRequest, checkConnection } from '@/lib/api/connections';
import { PublicProfile } from '@/types/profile';
import {
  Search,
  Filter,
  User,
  GraduationCap,
  Building2,
  Eye,
  UserPlus,
  Check,
  Loader2,
  AlertCircle,
} from 'lucide-react';

interface SearchModalProps {
  isOpen: boolean;
  onClose: () => void;
  userRole: string;
}

interface UserWithConnectionStatus extends PublicProfile {
  connectionStatus?:
    | 'connected'
    | 'pending_sent'
    | 'pending_received'
    | 'not_connected';
  connectionId?: string;
}

const SearchModal = ({ isOpen, onClose, userRole }: SearchModalProps) => {
  const { toast } = useToast();
  const { user } = useAuth();

  // Search and filter state
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedRole, setSelectedRole] = useState('all');
  const [selectedCountry, setSelectedCountry] = useState('all');
  const [selectedUniversity, setSelectedUniversity] = useState('all');

  // Data state
  const [users, setUsers] = useState<UserWithConnectionStatus[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [connectionLoading, setConnectionLoading] = useState<Set<string>>(
    new Set()
  );

  // Modal state
  const [viewProfileData, setViewProfileData] = useState<PublicProfile | null>(
    null
  );
  const [isViewProfileOpen, setIsViewProfileOpen] = useState(false);

  // Country options for filter
  const countryOptions = [
    'United States',
    'Canada',
    'United Kingdom',
    'Germany',
    'France',
    'Australia',
    'Japan',
    'South Korea',
    'India',
    'Brazil',
    'Mexico',
    'Spain',
    'Italy',
    'Netherlands',
    'Sweden',
    'Norway',
    'Denmark',
    'Finland',
    'Switzerland',
    'Austria',
    'Belgium',
    'Ireland',
    'Portugal',
    'Poland',
    'Czech Republic',
  ];

  // Search users with debouncing
  const searchUsers = useCallback(async () => {
    if (!user?.id) return;

    try {
      setLoading(true);
      setError(null);

      const searchParams: any = {
        limit: 50,
        offset: 0,
      };

      // Add search query
      if (searchQuery.trim()) {
        searchParams.query = searchQuery.trim();
      }

      // Add role filter
      if (selectedRole !== 'all') {
        searchParams.role = selectedRole as
          | 'student'
          | 'professor'
          | 'university';
      }

      // Add country filter
      if (selectedCountry !== 'all') {
        searchParams.country = selectedCountry;
      }

      // Add university filter
      if (selectedUniversity !== 'all') {
        searchParams.university = selectedUniversity;
      }

      const { profiles, error: searchError } = await searchProfiles(
        searchParams
      );

      if (searchError) {
        throw new Error(searchError.message || 'Failed to search users');
      }

      // Check connection status for each user
      const usersWithConnectionStatus = await Promise.all(
        profiles.map(async (profile) => {
          if (profile.id === user.id) {
            return { ...profile, connectionStatus: 'connected' as const };
          }

          try {
            const { data: connectionData } = await checkConnection(
              user.id,
              profile.id
            );
            return {
              ...profile,
              connectionStatus: connectionData?.isConnected
                ? 'connected'
                : connectionData?.isRequestSent
                ? 'pending_sent'
                : connectionData?.isRequestReceived
                ? 'pending_received'
                : 'not_connected',
              connectionId: connectionData?.connectionId,
            };
          } catch (error) {
            console.error('Error checking connection status:', error);
            return { ...profile, connectionStatus: 'not_connected' as const };
          }
        })
      );

      setUsers(usersWithConnectionStatus);
    } catch (error) {
      console.error('Error searching users:', error);
      setError(
        error instanceof Error ? error.message : 'Failed to search users'
      );
      setUsers([]);
    } finally {
      setLoading(false);
    }
  }, [
    searchQuery,
    selectedRole,
    selectedCountry,
    selectedUniversity,
    user?.id,
  ]);

  // Debounced search effect
  useEffect(() => {
    const timeoutId = setTimeout(() => {
      if (isOpen) {
        searchUsers();
      }
    }, 300);

    return () => clearTimeout(timeoutId);
  }, [searchUsers, isOpen]);

  // Initial search when modal opens
  useEffect(() => {
    if (isOpen && user?.id) {
      searchUsers();
    }
  }, [isOpen, user?.id]);

  const getRoleIcon = (role: string) => {
    switch (role) {
      case 'student':
        return User;
      case 'professor':
        return GraduationCap;
      case 'university':
        return Building2;
      default:
        return User;
    }
  };

  const getRoleColor = (role: string) => {
    switch (role) {
      case 'student':
        return 'text-blue-600 bg-blue-50 border-blue-200';
      case 'professor':
        return 'text-green-600 bg-green-50 border-green-200';
      case 'university':
        return 'text-orange-600 bg-orange-50 border-orange-200';
      default:
        return 'text-gray-600 bg-gray-50 border-gray-200';
    }
  };

  const getRoleLabel = (role: string) => {
    switch (role) {
      case 'student':
        return 'Student';
      case 'professor':
        return 'Professor';
      case 'university':
        return 'University';
      default:
        return 'User';
    }
  };

  const getConnectionButtonText = (status: string) => {
    switch (status) {
      case 'connected':
        return 'Connected';
      case 'pending_sent':
        return 'Request Sent';
      case 'pending_received':
        return 'Accept Request';
      case 'not_connected':
      default:
        return 'Connect';
    }
  };

  const getConnectionButtonVariant = (status: string) => {
    switch (status) {
      case 'connected':
        return 'outline';
      case 'pending_sent':
        return 'secondary';
      case 'pending_received':
        return 'default';
      case 'not_connected':
      default:
        return 'default';
    }
  };

  const handleViewProfile = (user: PublicProfile) => {
    setViewProfileData(user);
    setIsViewProfileOpen(true);
  };

  const handleConnect = async (targetUser: UserWithConnectionStatus) => {
    if (!user?.id || targetUser.id === user.id) return;

    try {
      setConnectionLoading((prev) => new Set(prev).add(targetUser.id));

      if (targetUser.connectionStatus === 'pending_received') {
        // Handle accept request logic here if needed
        toast({
          title: 'Connection Request',
          description:
            'Please go to your connections page to accept this request.',
        });
        return;
      }

      if (targetUser.connectionStatus === 'connected') {
        toast({
          title: 'Already Connected',
          description: `You are already connected to ${targetUser.display_name}`,
        });
        return;
      }

      // Send connection request
      const { error: requestError } = await sendConnectionRequest({
        addressee_id: targetUser.id,
        message: `Hi ${targetUser.display_name}, I'd like to connect with you!`,
      });

      if (requestError) {
        throw new Error(requestError);
      }

      // Update local state
      setUsers((prev) =>
        prev.map((u) =>
          u.id === targetUser.id
            ? { ...u, connectionStatus: 'pending_sent' as const }
            : u
        )
      );

      toast({
        title: 'Connection Request Sent',
        description: `Your connection request has been sent to ${targetUser.display_name}`,
      });
    } catch (error) {
      console.error('Error sending connection request:', error);
      toast({
        title: 'Error',
        description:
          error instanceof Error
            ? error.message
            : 'Failed to send connection request',
        variant: 'destructive',
      });
    } finally {
      setConnectionLoading((prev) => {
        const newSet = new Set(prev);
        newSet.delete(targetUser.id);
        return newSet;
      });
    }
  };

  const handleClose = () => {
    setSearchQuery('');
    setSelectedRole('all');
    setSelectedCountry('all');
    setSelectedUniversity('all');
    setUsers([]);
    setError(null);
    onClose();
  };

  return (
    <>
      <Dialog open={isOpen} onOpenChange={handleClose}>
        <DialogContent className='max-w-4xl max-h-[80vh] overflow-hidden flex flex-col'>
          <DialogHeader>
            <DialogTitle className='flex items-center gap-2'>
              <Search className='h-5 w-5 text-blue-600' />
              Search People & Universities
            </DialogTitle>
          </DialogHeader>

          <div className='space-y-4 flex-1 overflow-hidden flex flex-col'>
            {/* Search and Filters */}
            <div className='flex gap-4 flex-wrap'>
              <div className='flex-1 min-w-[200px] relative'>
                <Search className='absolute left-3 top-3 h-4 w-4 text-gray-400' />
                <Input
                  placeholder='Search by name, university, or field...'
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className='pl-10'
                />
              </div>
              <Select value={selectedRole} onValueChange={setSelectedRole}>
                <SelectTrigger className='w-[150px]'>
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
              <Select
                value={selectedCountry}
                onValueChange={setSelectedCountry}
              >
                <SelectTrigger className='w-[150px]'>
                  <SelectValue placeholder='Filter by country' />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value='all'>All Countries</SelectItem>
                  {countryOptions.map((country) => (
                    <SelectItem key={country} value={country}>
                      {country}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {/* Results */}
            <div className='flex-1 overflow-auto'>
              {loading && (
                <div className='flex items-center justify-center py-8'>
                  <Loader2 className='h-6 w-6 animate-spin text-blue-600' />
                  <span className='ml-2 text-gray-600'>Searching users...</span>
                </div>
              )}

              {error && (
                <div className='flex items-center justify-center py-8 text-red-600'>
                  <AlertCircle className='h-5 w-5 mr-2' />
                  <span>{error}</span>
                </div>
              )}

              {!loading && !error && users.length === 0 && (
                <div className='text-center py-8 text-gray-500'>
                  <Search className='h-12 w-12 mx-auto mb-4 text-gray-300' />
                  <p>No users found matching your criteria.</p>
                  <p className='text-sm'>
                    Try adjusting your search terms or filters.
                  </p>
                </div>
              )}

              {!loading && !error && users.length > 0 && (
                <div className='space-y-3'>
                  {users.map((user) => {
                    const IconComponent = getRoleIcon(user.role);
                    const isConnectionLoading = connectionLoading.has(user.id);

                    return (
                      <div
                        key={user.id}
                        className='flex items-center justify-between p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors'
                      >
                        <div className='flex items-center space-x-4 flex-1'>
                          <Avatar className='h-12 w-12'>
                            {user.avatar ? (
                              <img
                                src={user.avatar}
                                alt={user.display_name}
                                className='h-12 w-12 rounded-full object-cover'
                              />
                            ) : (
                              <AvatarFallback
                                className={getRoleColor(user.role)}
                              >
                                {user.display_name
                                  ?.split(' ')
                                  .map((n) => n[0])
                                  .join('')}
                              </AvatarFallback>
                            )}
                          </Avatar>
                          <div className='flex-1 min-w-0'>
                            <div className='flex items-center gap-2 mb-1'>
                              <h3 className='text-lg font-semibold text-gray-900 truncate'>
                                {user.display_name}
                              </h3>
                              <CountryFlag code={user.country} size={16} />
                              <Badge
                                variant='outline'
                                className={`text-xs ${getRoleColor(user.role)}`}
                              >
                                <IconComponent className='h-3 w-3 mr-1' />
                                {getRoleLabel(user.role)}
                              </Badge>
                            </div>
                            <div className='text-gray-600 text-sm space-y-1'>
                              {user.university && (
                                <div className='flex items-center gap-1'>
                                  <GraduationCap className='h-3 w-3' />
                                  <span className='truncate'>
                                    {user.university}
                                  </span>
                                </div>
                              )}
                              {user.department && (
                                <div className='flex items-center gap-1'>
                                  <Building2 className='h-3 w-3' />
                                  <span className='truncate'>
                                    {user.department}
                                  </span>
                                </div>
                              )}
                              {user.bio && (
                                <p className='text-gray-500 text-xs truncate'>
                                  {user.bio}
                                </p>
                              )}
                            </div>
                          </div>
                        </div>
                        <div className='flex items-center gap-2 ml-4'>
                          <Button
                            variant='outline'
                            size='sm'
                            onClick={() => handleViewProfile(user)}
                            className='flex items-center gap-1'
                          >
                            <Eye className='h-4 w-4' />
                            View Profile
                          </Button>
                          <Button
                            variant={getConnectionButtonVariant(
                              user.connectionStatus || 'not_connected'
                            )}
                            size='sm'
                            onClick={() => handleConnect(user)}
                            disabled={
                              isConnectionLoading ||
                              user.connectionStatus === 'connected'
                            }
                            className='flex items-center gap-1 min-w-[100px]'
                          >
                            {isConnectionLoading ? (
                              <Loader2 className='h-4 w-4 animate-spin' />
                            ) : user.connectionStatus === 'connected' ? (
                              <Check className='h-4 w-4' />
                            ) : (
                              <UserPlus className='h-4 w-4' />
                            )}
                            {getConnectionButtonText(
                              user.connectionStatus || 'not_connected'
                            )}
                          </Button>
                        </div>
                      </div>
                    );
                  })}
                </div>
              )}
            </div>
          </div>
        </DialogContent>
      </Dialog>

      {/* View Profile Modal */}
      {viewProfileData && (
        <ViewProfileModal
          isOpen={isViewProfileOpen}
          onClose={() => {
            setIsViewProfileOpen(false);
            setViewProfileData(null);
          }}
          profileData={viewProfileData}
          userType={
            viewProfileData.role as 'student' | 'professor' | 'university'
          }
        />
      )}
    </>
  );
};

export default SearchModal;
