import { useState } from 'react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { CountryFlag } from '@/components/ui/CountryFlag';
import { useToast } from '@/hooks/use-toast';
import { useAuth } from '@/contexts/AuthContext';
import { sendConnectionRequest, checkConnection } from '@/lib/api/connections';
import { PublicProfile } from '@/types/profile';
import {
  User,
  GraduationCap,
  Building2,
  MapPin,
  Mail,
  Star,
  BookOpen,
  Award,
  Users,
  Globe,
  Briefcase,
  FolderOpen,
  Heart,
  Lightbulb,
  Target,
  UserPlus,
  Check,
  Loader2,
} from 'lucide-react';

interface ViewProfileModalProps {
  isOpen: boolean;
  onClose: () => void;
  profileData: PublicProfile;
  userType: 'student' | 'professor' | 'university';
}

const ViewProfileModal = ({
  isOpen,
  onClose,
  profileData,
  userType,
}: ViewProfileModalProps) => {
  const { toast } = useToast();
  const { user } = useAuth();
  const [connectionStatus, setConnectionStatus] = useState<
    'connected' | 'pending_sent' | 'pending_received' | 'not_connected'
  >('not_connected');
  const [connectionLoading, setConnectionLoading] = useState(false);

  // Check connection status when modal opens
  useState(() => {
    if (isOpen && user?.id && profileData.id !== user.id) {
      checkConnection(user.id, profileData.id)
        .then(({ data }) => {
          if (data?.isConnected) {
            setConnectionStatus('connected');
          } else if (data?.isRequestSent) {
            setConnectionStatus('pending_sent');
          } else if (data?.isRequestReceived) {
            setConnectionStatus('pending_received');
          } else {
            setConnectionStatus('not_connected');
          }
        })
        .catch(console.error);
    }
  }, [isOpen, user?.id, profileData.id]);

  const handleConnect = async () => {
    if (!user?.id || profileData.id === user.id) return;

    try {
      setConnectionLoading(true);

      if (connectionStatus === 'connected') {
        toast({
          title: 'Already Connected',
          description: `You are already connected to ${profileData.display_name}`,
        });
        return;
      }

      if (connectionStatus === 'pending_sent') {
        toast({
          title: 'Request Already Sent',
          description: `You have already sent a connection request to ${profileData.display_name}`,
        });
        return;
      }

      // Send connection request
      const { error } = await sendConnectionRequest({
        addressee_id: profileData.id,
        message: `Hi ${profileData.display_name}, I'd like to connect with you!`,
      });

      if (error) {
        throw new Error(error);
      }

      setConnectionStatus('pending_sent');
      toast({
        title: 'Connection Request Sent',
        description: `Your connection request has been sent to ${profileData.display_name}`,
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
      setConnectionLoading(false);
    }
  };

  const getConnectionButtonText = () => {
    switch (connectionStatus) {
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

  const getConnectionButtonVariant = () => {
    switch (connectionStatus) {
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

  const IconComponent = getRoleIcon(userType);

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className='max-w-2xl'>
        <DialogHeader>
          <DialogTitle className='flex items-center gap-2'>
            <IconComponent className='h-5 w-5 text-blue-600' />
            Profile Details
          </DialogTitle>
        </DialogHeader>

        <div className='space-y-6'>
          {/* Header Section */}
          <div className='flex items-start space-x-4'>
            <Avatar className='h-16 w-16'>
              {profileData.avatar ? (
                <img
                  src={profileData.avatar}
                  alt={profileData.display_name}
                  className='h-16 w-16 rounded-full object-cover'
                />
              ) : (
                <AvatarFallback className={getRoleColor(userType)}>
                  {profileData.display_name
                    ?.split(' ')
                    .map((n: string) => n[0])
                    .join('')}
                </AvatarFallback>
              )}
            </Avatar>
            <div className='flex-1'>
              <div className='flex items-center gap-2 mb-1'>
                <h3 className='text-xl font-semibold text-gray-900'>
                  {profileData.display_name}
                </h3>
                <CountryFlag code={profileData.country} size={20} />
                <Badge
                  variant='outline'
                  className={`text-xs ${getRoleColor(userType)}`}
                >
                  <IconComponent className='h-3 w-3 mr-1' />
                  {getRoleLabel(userType)}
                </Badge>
              </div>
              <div className='text-gray-600 text-sm'>
                {userType === 'student' && profileData.major}
                {userType === 'professor' && profileData.position}
                {userType === 'university' && profileData.institution}
              </div>
              <div className='flex items-center gap-4 mt-2 text-sm text-gray-500'>
                <div className='flex items-center gap-1'>
                  <MapPin className='h-4 w-4' />
                  {profileData.city && profileData.country
                    ? `${profileData.city}, ${profileData.country}`
                    : profileData.country || 'Location not specified'}
                </div>
                {profileData.university && (
                  <div className='flex items-center gap-1'>
                    <GraduationCap className='h-4 w-4' />
                    {profileData.university}
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Main Content */}
          <div className='grid md:grid-cols-2 gap-6'>
            {/* Left Column */}
            <div className='space-y-4'>
              {/* About Section */}
              <div>
                <h4 className='font-medium text-gray-900 mb-2 flex items-center gap-2'>
                  <User className='h-4 w-4 text-blue-600' />
                  About
                </h4>
                <p className='text-gray-600 text-sm leading-relaxed'>
                  {profileData.bio}
                </p>
              </div>

              {/* Interests/Expertise Section */}
              <div>
                <h4 className='font-medium text-gray-900 mb-2 flex items-center gap-2'>
                  {userType === 'student' ? (
                    <>
                      <Heart className='h-4 w-4 text-red-500' />
                      Interests
                    </>
                  ) : userType === 'professor' ? (
                    <>
                      <Lightbulb className='h-4 w-4 text-yellow-500' />
                      Expertise
                    </>
                  ) : (
                    <>
                      <BookOpen className='h-4 w-4 text-green-500' />
                      Programs
                    </>
                  )}
                </h4>
                <div className='flex flex-wrap gap-2'>
                  {(
                    profileData.interests ||
                    profileData.expertise ||
                    profileData.programs ||
                    []
                  ).map((item: string, index: number) => (
                    <Badge key={index} variant='secondary' className='text-xs'>
                      {item}
                    </Badge>
                  ))}
                </div>
              </div>

              {/* Education Section */}
              {userType !== 'university' && (
                <div>
                  <h4 className='font-medium text-gray-900 mb-2 flex items-center gap-2'>
                    <GraduationCap className='h-4 w-4 text-purple-600' />
                    Education
                  </h4>
                  <div className='space-y-2'>
                    {(profileData.education || []).map(
                      (edu: string, index: number) => (
                        <div
                          key={index}
                          className='text-sm text-gray-600 bg-gray-50 p-2 rounded'
                        >
                          • {edu}
                        </div>
                      )
                    )}
                  </div>
                </div>
              )}

              {/* Skills Section */}
              {profileData.skills && profileData.skills.length > 0 && (
                <div>
                  <h4 className='font-medium text-gray-900 mb-2 flex items-center gap-2'>
                    <Target className='h-4 w-4 text-orange-600' />
                    Skills
                  </h4>
                  <div className='flex flex-wrap gap-2'>
                    {profileData.skills.map((skill: string, index: number) => (
                      <Badge key={index} variant='outline' className='text-xs'>
                        {skill}
                      </Badge>
                    ))}
                  </div>
                </div>
              )}

              {/* Languages Section */}
              {profileData.languages && profileData.languages.length > 0 && (
                <div>
                  <h4 className='font-medium text-gray-900 mb-2 flex items-center gap-2'>
                    <Globe className='h-4 w-4 text-blue-600' />
                    Languages
                  </h4>
                  <div className='flex flex-wrap gap-2'>
                    {profileData.languages.map(
                      (language: string, index: number) => (
                        <Badge
                          key={index}
                          variant='outline'
                          className='text-xs'
                        >
                          {language}
                        </Badge>
                      )
                    )}
                  </div>
                </div>
              )}

              {/* Experience Section */}
              {profileData.experience && profileData.experience.length > 0 && (
                <div>
                  <h4 className='font-medium text-gray-900 mb-2 flex items-center gap-2'>
                    <Briefcase className='h-4 w-4 text-green-600' />
                    Experience
                  </h4>
                  <div className='space-y-2'>
                    {profileData.experience.map(
                      (exp: string, index: number) => (
                        <div
                          key={index}
                          className='text-sm text-gray-600 bg-gray-50 p-2 rounded'
                        >
                          • {exp}
                        </div>
                      )
                    )}
                  </div>
                </div>
              )}

              {/* Projects Section */}
              {profileData.projects && profileData.projects.length > 0 && (
                <div>
                  <h4 className='font-medium text-gray-900 mb-2 flex items-center gap-2'>
                    <FolderOpen className='h-4 w-4 text-indigo-600' />
                    Projects
                  </h4>
                  <div className='space-y-2'>
                    {profileData.projects.map(
                      (project: string, index: number) => (
                        <div
                          key={index}
                          className='text-sm text-gray-600 bg-gray-50 p-2 rounded'
                        >
                          • {project}
                        </div>
                      )
                    )}
                  </div>
                </div>
              )}
            </div>

            {/* Right Column */}
            <div className='space-y-4'>
              {/* Stats Section */}
              <div className='bg-gray-50 p-4 rounded-lg'>
                <h4 className='font-medium text-gray-900 mb-3 flex items-center gap-2'>
                  {userType === 'student' ? (
                    <>
                      <Star className='h-4 w-4 text-yellow-500' />
                      Academic Performance
                    </>
                  ) : userType === 'professor' ? (
                    <>
                      <Award className='h-4 w-4 text-purple-500' />
                      Academic Metrics
                    </>
                  ) : (
                    <>
                      <Users className='h-4 w-4 text-blue-500' />
                      Institution Stats
                    </>
                  )}
                </h4>
                <div className='grid grid-cols-2 gap-4'>
                  {userType === 'student' && (
                    <>
                      <div className='text-center'>
                        <div className='text-lg font-semibold text-gray-900'>
                          {profileData.gpa}
                        </div>
                        <div className='text-xs text-gray-600'>GPA</div>
                      </div>
                      <div className='text-center'>
                        <div className='text-lg font-semibold text-gray-900'>
                          {profileData.academicYear}
                        </div>
                        <div className='text-xs text-gray-600'>Year</div>
                      </div>
                    </>
                  )}
                  {userType === 'professor' && (
                    <>
                      <div className='text-center'>
                        <div className='text-lg font-semibold text-gray-900'>
                          {profileData.publications}
                        </div>
                        <div className='text-xs text-gray-600'>
                          Publications
                        </div>
                      </div>
                      <div className='text-center'>
                        <div className='text-lg font-semibold text-gray-900'>
                          {profileData.citations}
                        </div>
                        <div className='text-xs text-gray-600'>Citations</div>
                      </div>
                    </>
                  )}
                  {userType === 'university' && (
                    <>
                      <div className='text-center'>
                        <div className='text-lg font-semibold text-gray-900'>
                          {profileData.totalStudents}
                        </div>
                        <div className='text-xs text-gray-600'>Students</div>
                      </div>
                      <div className='text-center'>
                        <div className='text-lg font-semibold text-gray-900'>
                          {profileData.facultyCount}
                        </div>
                        <div className='text-xs text-gray-600'>Faculty</div>
                      </div>
                    </>
                  )}
                </div>
              </div>

              {/* Achievements/Publications Section */}
              <div>
                <h4 className='font-medium text-gray-900 mb-2 flex items-center gap-2'>
                  <Award className='h-4 w-4 text-yellow-500' />
                  {userType === 'professor'
                    ? 'Recent Publications'
                    : 'Achievements'}
                </h4>
                <div className='space-y-2'>
                  {(profileData.achievements || profileData.publications || [])
                    .slice(0, 3)
                    .map((item: any, index: number) => (
                      <div
                        key={index}
                        className='border-l-2 border-yellow-500 pl-3 py-1'
                      >
                        <div className='text-sm font-medium text-gray-900'>
                          {item.title}
                        </div>
                        <div className='text-xs text-gray-600'>
                          {item.description || item.journal} ({item.year})
                        </div>
                      </div>
                    ))}
                </div>
              </div>

              {/* Certifications Section */}
              {profileData.certifications &&
                profileData.certifications.length > 0 && (
                  <div>
                    <h4 className='font-medium text-gray-900 mb-2 flex items-center gap-2'>
                      <Award className='h-4 w-4 text-purple-500' />
                      Certifications
                    </h4>
                    <div className='space-y-2'>
                      {profileData.certifications
                        .slice(0, 3)
                        .map((cert: any, index: number) => (
                          <div
                            key={index}
                            className='text-sm text-gray-600 bg-gray-50 p-2 rounded'
                          >
                            <div className='font-medium text-gray-900'>
                              {cert.name}
                            </div>
                            <div className='text-xs'>
                              {cert.issuer} • {cert.year}
                            </div>
                          </div>
                        ))}
                    </div>
                  </div>
                )}

              {/* Volunteer Experience */}
              {profileData.volunteer && profileData.volunteer.length > 0 && (
                <div>
                  <h4 className='font-medium text-gray-900 mb-2 flex items-center gap-2'>
                    <Heart className='h-4 w-4 text-red-500' />
                    Volunteer Experience
                  </h4>
                  <div className='space-y-2'>
                    {profileData.volunteer
                      .slice(0, 2)
                      .map((vol: any, index: number) => (
                        <div
                          key={index}
                          className='text-sm text-gray-600 bg-gray-50 p-2 rounded'
                        >
                          <div className='font-medium text-gray-900'>
                            {vol.role}
                          </div>
                          <div className='text-xs'>
                            {vol.organization} • {vol.duration}
                          </div>
                        </div>
                      ))}
                  </div>
                </div>
              )}

              {/* Recommendations */}
              {profileData.recommendations &&
                profileData.recommendations.length > 0 && (
                  <div>
                    <h4 className='font-medium text-gray-900 mb-2 flex items-center gap-2'>
                      <Star className='h-4 w-4 text-yellow-500' />
                      Recommendations
                    </h4>
                    <div className='space-y-2'>
                      {profileData.recommendations
                        .slice(0, 2)
                        .map((rec: any, index: number) => (
                          <div
                            key={index}
                            className='border border-gray-200 rounded-lg p-3'
                          >
                            <div className='flex items-center gap-2 mb-2'>
                              <Avatar className='h-6 w-6'>
                                <AvatarFallback className='text-xs'>
                                  {rec.recommender
                                    .split(' ')
                                    .map((n: string) => n[0])
                                    .join('')}
                                </AvatarFallback>
                              </Avatar>
                              <div>
                                <div className='text-sm font-medium text-gray-900'>
                                  {rec.recommender}
                                </div>
                                <div className='text-xs text-gray-600'>
                                  {rec.title}
                                </div>
                              </div>
                            </div>
                            <p className='text-xs text-gray-600 italic'>
                              "{rec.text}"
                            </p>
                          </div>
                        ))}
                    </div>
                  </div>
                )}
            </div>
          </div>

          {/* Footer Actions */}
          <div className='flex justify-end gap-2 pt-4 border-t'>
            <Button
              variant='outline'
              onClick={onClose}
              className='text-gray-600'
            >
              Close
            </Button>
            {user?.id !== profileData.id && (
              <Button
                variant={getConnectionButtonVariant()}
                onClick={handleConnect}
                disabled={connectionLoading || connectionStatus === 'connected'}
                className='flex items-center gap-2'
              >
                {connectionLoading ? (
                  <Loader2 className='h-4 w-4 animate-spin' />
                ) : connectionStatus === 'connected' ? (
                  <Check className='h-4 w-4' />
                ) : (
                  <UserPlus className='h-4 w-4' />
                )}
                {getConnectionButtonText()}
              </Button>
            )}
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default ViewProfileModal;
