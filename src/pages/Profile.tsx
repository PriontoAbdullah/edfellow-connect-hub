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
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import {
  User,
  Mail,
  Phone,
  MapPin,
  Calendar,
  Camera,
  Edit,
  Save,
  X,
  GraduationCap,
  Building,
  Globe,
  Star,
  Award,
  BookOpen,
  Users,
  MessageSquare,
  Eye,
} from 'lucide-react';
import { useState } from 'react';

const Profile = () => {
  const [isEditing, setIsEditing] = useState(false);
  const [profileData, setProfileData] = useState({
    name: 'Zunnun Zihan',
    email: 'zunnun.zihan@example.com',
    phone: '+880 1234-567890',
    location: 'Dhaka, Bangladesh',
    university: 'University of Technology',
    fieldOfStudy: 'Computer Science',
    graduationYear: '2025',
    bio: 'Passionate computer science student with a keen interest in artificial intelligence and machine learning. Always eager to learn new technologies and contribute to innovative projects.',
    skills: [
      'JavaScript',
      'Python',
      'React',
      'Node.js',
      'Machine Learning',
      'Data Structures',
    ],
    languages: ['English', 'Bengali', 'Arabic'],
    interests: ['AI/ML', 'Web Development', 'Open Source', 'Research'],
  });

  const handleInputChange = (field: string, value: string) => {
    setProfileData((prev) => ({ ...prev, [field]: value }));
  };

  const handleSave = () => {
    // Here you would typically save to API
    setIsEditing(false);
  };

  const stats = {
    profileViews: 26,
    connections: 45,
    endorsements: 12,
    publications: 3,
    projects: 8,
    certifications: 5,
  };

  return (
    <div className='p-6 space-y-6'>
      <div className='flex items-center justify-between'>
        <div>
          <h1 className='text-2xl font-bold text-gray-900 flex items-center gap-2'>
            <User className='h-6 w-6 text-blue-600' />
            Profile
          </h1>
          <p className='text-gray-600'>
            Manage your academic profile and information
          </p>
        </div>
        <div className='flex gap-2'>
          {isEditing ? (
            <>
              <Button
                onClick={handleSave}
                className='bg-blue-600 hover:bg-blue-700'
              >
                <Save className='h-4 w-4 mr-2' />
                Save Changes
              </Button>
              <Button variant='outline' onClick={() => setIsEditing(false)}>
                <X className='h-4 w-4 mr-2' />
                Cancel
              </Button>
            </>
          ) : (
            <Button onClick={() => setIsEditing(true)} variant='outline'>
              <Edit className='h-4 w-4 mr-2' />
              Edit Profile
            </Button>
          )}
        </div>
      </div>

      <div className='grid gap-6 lg:grid-cols-3'>
        {/* Profile Header */}
        <div className='lg:col-span-2'>
          <Card>
            <CardHeader>
              <div className='flex items-start justify-between'>
                <div className='flex items-center gap-4'>
                  <div className='relative'>
                    <Avatar className='h-20 w-20'>
                      <AvatarImage
                        src='/api/placeholder/80/80'
                        alt={profileData.name}
                      />
                      <AvatarFallback className='text-lg'>
                        {profileData.name
                          .split(' ')
                          .map((n) => n[0])
                          .join('')}
                      </AvatarFallback>
                    </Avatar>
                    {isEditing && (
                      <Button
                        size='sm'
                        className='absolute -bottom-1 -right-1 h-8 w-8 rounded-full p-0'
                      >
                        <Camera className='h-4 w-4' />
                      </Button>
                    )}
                  </div>
                  <div>
                    <CardTitle className='text-xl'>
                      {profileData.name}
                    </CardTitle>
                    <CardDescription className='flex items-center gap-1 mt-1'>
                      <GraduationCap className='h-4 w-4' />
                      {profileData.fieldOfStudy} Student
                    </CardDescription>
                    <CardDescription className='flex items-center gap-1'>
                      <Building className='h-4 w-4' />
                      {profileData.university}
                    </CardDescription>
                  </div>
                </div>
                <div className='text-right'>
                  <Badge variant='secondary' className='mb-2'>
                    <Eye className='h-3 w-3 mr-1' />
                    {stats.profileViews} profile views
                  </Badge>
                  <div className='text-sm text-gray-500'>Member since 2023</div>
                </div>
              </div>
            </CardHeader>
            <CardContent className='space-y-4'>
              {isEditing ? (
                <div className='space-y-4'>
                  <div className='grid gap-4 md:grid-cols-2'>
                    <div>
                      <Label htmlFor='name'>Full Name</Label>
                      <Input
                        id='name'
                        value={profileData.name}
                        onChange={(e) =>
                          handleInputChange('name', e.target.value)
                        }
                      />
                    </div>
                    <div>
                      <Label htmlFor='email'>Email</Label>
                      <Input
                        id='email'
                        type='email'
                        value={profileData.email}
                        onChange={(e) =>
                          handleInputChange('email', e.target.value)
                        }
                      />
                    </div>
                    <div>
                      <Label htmlFor='phone'>Phone</Label>
                      <Input
                        id='phone'
                        value={profileData.phone}
                        onChange={(e) =>
                          handleInputChange('phone', e.target.value)
                        }
                      />
                    </div>
                    <div>
                      <Label htmlFor='location'>Location</Label>
                      <Input
                        id='location'
                        value={profileData.location}
                        onChange={(e) =>
                          handleInputChange('location', e.target.value)
                        }
                      />
                    </div>
                  </div>
                  <div>
                    <Label htmlFor='bio'>Bio</Label>
                    <Textarea
                      id='bio'
                      value={profileData.bio}
                      onChange={(e) => handleInputChange('bio', e.target.value)}
                      rows={4}
                    />
                  </div>
                </div>
              ) : (
                <div>
                  <p className='text-gray-700 mb-4'>{profileData.bio}</p>
                  <div className='flex items-center gap-4 text-sm text-gray-600'>
                    <div className='flex items-center gap-1'>
                      <Mail className='h-4 w-4' />
                      {profileData.email}
                    </div>
                    <div className='flex items-center gap-1'>
                      <Phone className='h-4 w-4' />
                      {profileData.phone}
                    </div>
                    <div className='flex items-center gap-1'>
                      <MapPin className='h-4 w-4' />
                      {profileData.location}
                    </div>
                  </div>
                </div>
              )}
            </CardContent>
          </Card>
        </div>

        {/* Stats Sidebar */}
        <div className='space-y-4'>
          <Card>
            <CardHeader>
              <CardTitle className='text-lg'>Profile Stats</CardTitle>
            </CardHeader>
            <CardContent className='space-y-3'>
              <div className='flex items-center justify-between'>
                <span className='text-sm text-gray-600'>Profile views</span>
                <span className='font-semibold'>{stats.profileViews}</span>
              </div>
              <div className='flex items-center justify-between'>
                <span className='text-sm text-gray-600'>Connections</span>
                <span className='font-semibold'>{stats.connections}</span>
              </div>
              <div className='flex items-center justify-between'>
                <span className='text-sm text-gray-600'>Endorsements</span>
                <span className='font-semibold'>{stats.endorsements}</span>
              </div>
              <div className='flex items-center justify-between'>
                <span className='text-sm text-gray-600'>Publications</span>
                <span className='font-semibold'>{stats.publications}</span>
              </div>
              <div className='flex items-center justify-between'>
                <span className='text-sm text-gray-600'>Projects</span>
                <span className='font-semibold'>{stats.projects}</span>
              </div>
              <div className='flex items-center justify-between'>
                <span className='text-sm text-gray-600'>Certifications</span>
                <span className='font-semibold'>{stats.certifications}</span>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className='text-lg'>Skills & Expertise</CardTitle>
            </CardHeader>
            <CardContent>
              <div className='flex flex-wrap gap-2'>
                {profileData.skills.map((skill, index) => (
                  <Badge key={index} variant='secondary'>
                    {skill}
                  </Badge>
                ))}
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className='text-lg'>Languages</CardTitle>
            </CardHeader>
            <CardContent>
              <div className='flex flex-wrap gap-2'>
                {profileData.languages.map((language, index) => (
                  <Badge key={index} variant='outline'>
                    {language}
                  </Badge>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Profile;
