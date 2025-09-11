import React, { useState } from 'react';
import { Button } from '../ui/button';
import { Badge } from '../ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '../ui/avatar';
import { Card, CardContent } from '../ui/card';
import { Separator } from '../ui/separator';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '../ui/dialog';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '../ui/dropdown-menu';
import {
  Camera,
  Edit,
  MapPin,
  Building,
  GraduationCap,
  Mail,
  Phone,
  Globe,
  Linkedin,
  Github,
  Twitter,
  MoreVertical,
  Shield,
  Star,
  Users,
  Eye,
  Award,
  Calendar,
  Flag,
} from 'lucide-react';
import { useProfile } from '../../hooks/useProfile';
import { useAuth } from '../../contexts/AuthContext';
import { UserData, PublicProfile } from '../../lib/auth';
import { CountryFlag } from '../ui/CountryFlag';

interface ProfileHeaderProps {
  userId: string;
  isOwnProfile?: boolean;
  onEdit?: () => void;
  onMessage?: () => void;
  onConnect?: () => void;
  onFollow?: () => void;
}

export const ProfileHeader: React.FC<ProfileHeaderProps> = ({
  userId,
  isOwnProfile = false,
  onEdit,
  onMessage,
  onConnect,
  onFollow,
}) => {
  const { user } = useAuth();
  const {
    profile,
    publicProfile,
    stats,
    loading,
    uploadProfileAvatar,
    removeProfileAvatar,
  } = useProfile(userId);
  const [showAvatarDialog, setShowAvatarDialog] = useState(false);
  const [avatarFile, setAvatarFile] = useState<File | null>(null);

  // Use public profile data if not own profile, otherwise use full profile
  const displayData = isOwnProfile ? profile : publicProfile;
  const displayStats = stats;

  if (loading) {
    return <ProfileHeaderSkeleton />;
  }

  if (!displayData) {
    return (
      <Card>
        <CardContent className='p-6'>
          <div className='text-center text-muted-foreground'>
            Profile not found
          </div>
        </CardContent>
      </Card>
    );
  }

  const handleAvatarUpload = async () => {
    if (avatarFile) {
      const success = await uploadProfileAvatar(avatarFile);
      if (success) {
        setShowAvatarDialog(false);
        setAvatarFile(null);
      }
    }
  };

  const handleAvatarRemove = async () => {
    const success = await removeProfileAvatar();
    if (success) {
      setShowAvatarDialog(false);
    }
  };

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

  const getVerificationBadge = (status?: string) => {
    if (status === 'verified') {
      return (
        <Badge
          variant='outline'
          className='bg-green-50 text-green-700 border-green-200'
        >
          <Shield className='w-3 h-3 mr-1' />
          Verified
        </Badge>
      );
    }
    return null;
  };

  return (
    <Card className='overflow-hidden'>
      <CardContent className='p-0'>
        {/* Cover Photo Placeholder */}
        <div className='h-32 bg-gradient-to-r from-blue-500 to-purple-600 relative'>
          {isOwnProfile && (
            <div className='absolute top-4 right-4'>
              <Button
                variant='secondary'
                size='sm'
                onClick={onEdit}
                className='bg-white/90 hover:bg-white'
              >
                <Edit className='w-4 h-4 mr-2' />
                Edit Profile
              </Button>
            </div>
          )}
        </div>

        {/* Profile Info */}
        <div className='px-6 pb-6'>
          <div className='flex flex-col sm:flex-row sm:items-end sm:justify-between -mt-16 mb-6'>
            {/* Avatar and Basic Info */}
            <div className='flex flex-col sm:flex-row sm:items-end gap-4'>
              <div className='relative'>
                <Avatar className='w-24 h-24 border-4 border-white shadow-lg'>
                  <AvatarImage
                    src={displayData.avatar}
                    alt={displayData.displayName}
                  />
                  <AvatarFallback className='text-lg font-semibold'>
                    {getInitials(displayData.firstName, displayData.lastName)}
                  </AvatarFallback>
                </Avatar>

                {isOwnProfile && (
                  <Dialog
                    open={showAvatarDialog}
                    onOpenChange={setShowAvatarDialog}
                  >
                    <DialogTrigger asChild>
                      <Button
                        size='sm'
                        className='absolute -bottom-2 -right-2 rounded-full w-8 h-8 p-0'
                        variant='secondary'
                      >
                        <Camera className='w-4 h-4' />
                      </Button>
                    </DialogTrigger>
                    <DialogContent>
                      <DialogHeader>
                        <DialogTitle>Update Profile Picture</DialogTitle>
                        <DialogDescription>
                          Upload a new profile picture or remove the current
                          one.
                        </DialogDescription>
                      </DialogHeader>
                      <div className='space-y-4'>
                        <div>
                          <input
                            type='file'
                            accept='image/*'
                            onChange={(e) =>
                              setAvatarFile(e.target.files?.[0] || null)
                            }
                            className='w-full'
                          />
                        </div>
                        <div className='flex gap-2'>
                          <Button
                            onClick={handleAvatarUpload}
                            disabled={!avatarFile}
                            className='flex-1'
                          >
                            Upload
                          </Button>
                          {displayData.avatar && (
                            <Button
                              variant='outline'
                              onClick={handleAvatarRemove}
                              className='flex-1'
                            >
                              Remove
                            </Button>
                          )}
                        </div>
                      </div>
                    </DialogContent>
                  </Dialog>
                )}
              </div>

              <div className='space-y-2'>
                <div className='flex items-center gap-2 flex-wrap'>
                  <h1 className='text-2xl font-bold'>
                    {displayData.displayName}
                  </h1>
                  <Badge className={getRoleBadgeColor(displayData.role)}>
                    {displayData.role.charAt(0).toUpperCase() +
                      displayData.role.slice(1)}
                  </Badge>
                  {getVerificationBadge(displayData.verification_status)}
                </div>

                {displayData.bio && (
                  <p className='text-muted-foreground max-w-md'>
                    {displayData.bio}
                  </p>
                )}

                <div className='flex items-center gap-4 text-sm text-muted-foreground'>
                  {displayData.country && (
                    <div className='flex items-center gap-1'>
                      <CountryFlag
                        countryCode={displayData.country}
                        className='w-4 h-4'
                      />
                      <span>{displayData.country}</span>
                    </div>
                  )}
                  {displayData.city && (
                    <div className='flex items-center gap-1'>
                      <MapPin className='w-4 h-4' />
                      <span>{displayData.city}</span>
                    </div>
                  )}
                  <div className='flex items-center gap-1'>
                    <Calendar className='w-4 h-4' />
                    <span>
                      Joined{' '}
                      {new Date(displayData.created_at).toLocaleDateString()}
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            {!isOwnProfile && (
              <div className='flex gap-2'>
                <Button onClick={onMessage} variant='outline'>
                  <Mail className='w-4 h-4 mr-2' />
                  Message
                </Button>
                <Button onClick={onConnect} variant='outline'>
                  <Users className='w-4 h-4 mr-2' />
                  Connect
                </Button>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant='outline' size='icon'>
                      <MoreVertical className='w-4 h-4' />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align='end'>
                    <DropdownMenuItem onClick={onFollow}>
                      <Star className='w-4 h-4 mr-2' />
                      Follow
                    </DropdownMenuItem>
                    <DropdownMenuItem>
                      <Flag className='w-4 h-4 mr-2' />
                      Report
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
            )}
          </div>

          {/* Stats */}
          {displayStats && (
            <div className='grid grid-cols-2 sm:grid-cols-4 gap-4 mb-6'>
              <div className='text-center'>
                <div className='text-2xl font-bold'>
                  {displayStats.profile_views}
                </div>
                <div className='text-sm text-muted-foreground flex items-center justify-center gap-1'>
                  <Eye className='w-4 h-4' />
                  Views
                </div>
              </div>
              <div className='text-center'>
                <div className='text-2xl font-bold'>
                  {displayStats.connections}
                </div>
                <div className='text-sm text-muted-foreground flex items-center justify-center gap-1'>
                  <Users className='w-4 h-4' />
                  Connections
                </div>
              </div>
              <div className='text-center'>
                <div className='text-2xl font-bold'>
                  {displayStats.endorsements}
                </div>
                <div className='text-sm text-muted-foreground flex items-center justify-center gap-1'>
                  <Award className='w-4 h-4' />
                  Endorsements
                </div>
              </div>
              <div className='text-center'>
                <div className='text-2xl font-bold'>
                  {displayStats.posts_count || 0}
                </div>
                <div className='text-sm text-muted-foreground flex items-center justify-center gap-1'>
                  <Globe className='w-4 h-4' />
                  Posts
                </div>
              </div>
            </div>
          )}

          <Separator className='my-6' />

          {/* Academic/Professional Info */}
          <div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
            {/* Left Column */}
            <div className='space-y-4'>
              {displayData.university && (
                <div className='flex items-start gap-3'>
                  <GraduationCap className='w-5 h-5 text-muted-foreground mt-0.5' />
                  <div>
                    <div className='font-medium'>{displayData.university}</div>
                    {displayData.major && (
                      <div className='text-sm text-muted-foreground'>
                        {displayData.major}
                      </div>
                    )}
                  </div>
                </div>
              )}

              {displayData.institution && (
                <div className='flex items-start gap-3'>
                  <Building className='w-5 h-5 text-muted-foreground mt-0.5' />
                  <div>
                    <div className='font-medium'>{displayData.institution}</div>
                    {displayData.department && (
                      <div className='text-sm text-muted-foreground'>
                        {displayData.department}
                      </div>
                    )}
                    {displayData.position && (
                      <div className='text-sm text-muted-foreground'>
                        {displayData.position}
                      </div>
                    )}
                  </div>
                </div>
              )}

              {displayData.phoneNumber && (
                <div className='flex items-center gap-3'>
                  <Phone className='w-5 h-5 text-muted-foreground' />
                  <span>{displayData.phoneNumber}</span>
                </div>
              )}
            </div>

            {/* Right Column - Social Links */}
            {displayData.socialLinks && (
              <div className='space-y-4'>
                <h3 className='font-medium'>Social Links</h3>
                <div className='flex gap-3'>
                  {displayData.socialLinks.linkedin && (
                    <a
                      href={displayData.socialLinks.linkedin}
                      target='_blank'
                      rel='noopener noreferrer'
                      className='flex items-center gap-2 text-blue-600 hover:text-blue-800'
                    >
                      <Linkedin className='w-5 h-5' />
                      <span className='text-sm'>LinkedIn</span>
                    </a>
                  )}
                  {displayData.socialLinks.github && (
                    <a
                      href={displayData.socialLinks.github}
                      target='_blank'
                      rel='noopener noreferrer'
                      className='flex items-center gap-2 text-gray-600 hover:text-gray-800'
                    >
                      <Github className='w-5 h-5' />
                      <span className='text-sm'>GitHub</span>
                    </a>
                  )}
                  {displayData.socialLinks.twitter && (
                    <a
                      href={displayData.socialLinks.twitter}
                      target='_blank'
                      rel='noopener noreferrer'
                      className='flex items-center gap-2 text-blue-400 hover:text-blue-600'
                    >
                      <Twitter className='w-5 h-5' />
                      <span className='text-sm'>Twitter</span>
                    </a>
                  )}
                  {displayData.socialLinks.website && (
                    <a
                      href={displayData.socialLinks.website}
                      target='_blank'
                      rel='noopener noreferrer'
                      className='flex items-center gap-2 text-green-600 hover:text-green-800'
                    >
                      <Globe className='w-5 h-5' />
                      <span className='text-sm'>Website</span>
                    </a>
                  )}
                </div>
              </div>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

const ProfileHeaderSkeleton: React.FC = () => {
  return (
    <Card className='overflow-hidden'>
      <CardContent className='p-0'>
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
          <div className='grid grid-cols-2 sm:grid-cols-4 gap-4 mb-6'>
            {[...Array(4)].map((_, i) => (
              <div key={i} className='text-center'>
                <div className='h-8 w-12 bg-gray-200 rounded animate-pulse mx-auto mb-2' />
                <div className='h-4 w-16 bg-gray-200 rounded animate-pulse mx-auto' />
              </div>
            ))}
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
