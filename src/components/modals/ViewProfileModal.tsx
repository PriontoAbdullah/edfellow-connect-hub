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
} from 'lucide-react';

interface ViewProfileModalProps {
  isOpen: boolean;
  onClose: () => void;
  profileData: any; // We'll type this properly based on the data structure
  userType: 'student' | 'professor' | 'university';
}

const ViewProfileModal = ({
  isOpen,
  onClose,
  profileData,
  userType,
}: ViewProfileModalProps) => {
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
              <AvatarFallback className={getRoleColor(userType)}>
                {profileData.name
                  ?.split(' ')
                  .map((n: string) => n[0])
                  .join('')}
              </AvatarFallback>
            </Avatar>
            <div className='flex-1'>
              <div className='flex items-center gap-2 mb-1'>
                <h3 className='text-xl font-semibold text-gray-900'>
                  {profileData.name}
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
                {userType === 'professor' && profileData.title}
                {userType === 'university' && profileData.tagline}
              </div>
              <div className='flex items-center gap-4 mt-2 text-sm text-gray-500'>
                <div className='flex items-center gap-1'>
                  <MapPin className='h-4 w-4' />
                  {profileData.location || profileData.address}
                </div>
                <div className='flex items-center gap-1'>
                  <Mail className='h-4 w-4' />
                  {profileData.email}
                </div>
              </div>
            </div>
          </div>

          {/* Main Content */}
          <div className='grid md:grid-cols-2 gap-6'>
            {/* Left Column */}
            <div className='space-y-4'>
              <div>
                <h4 className='font-medium text-gray-900 mb-2'>About</h4>
                <p className='text-gray-600 text-sm'>{profileData.bio}</p>
              </div>

              <div>
                <h4 className='font-medium text-gray-900 mb-2'>
                  {userType === 'student'
                    ? 'Interests'
                    : userType === 'professor'
                    ? 'Expertise'
                    : 'Programs'}
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

              {userType !== 'university' && (
                <div>
                  <h4 className='font-medium text-gray-900 mb-2'>Education</h4>
                  <div className='space-y-1 text-sm text-gray-600'>
                    {(profileData.education || []).map(
                      (edu: string, index: number) => (
                        <div key={index}>• {edu}</div>
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
            <Button className='bg-blue-600 hover:bg-blue-700'>Connect</Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default ViewProfileModal;
