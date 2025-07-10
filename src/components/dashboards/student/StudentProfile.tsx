import { useEffect, useState } from 'react';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Breadcrumb } from '../../dashboard/Breadcrumb';
import SettingsModal from '../../modals/SettingsModal';
import {
  User,
  Mail,
  MapPin,
  Calendar,
  BookOpen,
  Edit,
  Save,
  X,
  Settings,
  Shield,
  Star,
  Plus,
  Trash2,
} from 'lucide-react';
import { CountryFlag } from '@/components/ui/CountryFlag';
import CountrySelect from '@/components/ui/CountrySelect';
import { getCountryCode } from '@/lib/countries';

const StudentProfile = () => {
  // Scroll to top on component mount
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);

  const [isEditing, setIsEditing] = useState(false);
  const [settingsOpen, setSettingsOpen] = useState(false);
  const [profileData, setProfileData] = useState({
    name: 'John Doe',
    email: 'john.doe@email.com',
    major: 'Computer Science',
    university: 'University of California, Berkeley',
    country: 'United States',
    bio: 'Passionate computer science student interested in artificial intelligence and machine learning. Looking to connect with like-minded peers and mentors to advance my understanding in these fields.',
    interests: [
      'Artificial Intelligence',
      'Machine Learning',
      'Data Science',
      'Web Development',
    ],
    languages: [
      'English (Native)',
      'Spanish (Intermediate)',
      'French (Beginner)',
    ],
    academicYear: 'Junior (3rd Year)',
    gpa: '3.8/4.0',
  });

  const [achievements, setAchievements] = useState([
    {
      title: "Dean's List",
      date: 'Fall 2023',
      description: 'Academic Excellence Award',
    },
    {
      title: 'Hackathon Winner',
      date: 'Oct 2023',
      description: 'First place in AI/ML category',
    },
    {
      title: 'Research Assistant',
      date: 'Sep 2023',
      description: 'Computer Vision Lab',
    },
    {
      title: 'Scholarship Recipient',
      date: 'Aug 2023',
      description: 'Merit-based scholarship',
    },
  ]);

  const [mentorshipHistory, setMentorshipHistory] = useState([
    {
      mentor: 'Dr. Sarah Johnson',
      subject: 'AI Research',
      sessions: 8,
      rating: 5.0,
    },
    {
      mentor: 'Prof. Michael Chen',
      subject: 'Data Science',
      sessions: 5,
      rating: 4.8,
    },
  ]);

  const [newInterest, setNewInterest] = useState('');
  const [newLanguage, setNewLanguage] = useState('');
  const [newAchievement, setNewAchievement] = useState({
    title: '',
    date: '',
    description: '',
  });

  const handleSave = () => {
    setIsEditing(false);
    // Here you would typically save to backend
  };

  const handleCancel = () => {
    setIsEditing(false);
    // Reset form data if needed
  };

  const addInterest = () => {
    if (newInterest.trim()) {
      setProfileData((prev) => ({
        ...prev,
        interests: [...prev.interests, newInterest.trim()],
      }));
      setNewInterest('');
    }
  };

  const removeInterest = (index: number) => {
    setProfileData((prev) => ({
      ...prev,
      interests: prev.interests.filter((_, i) => i !== index),
    }));
  };

  const addLanguage = () => {
    if (newLanguage.trim()) {
      setProfileData((prev) => ({
        ...prev,
        languages: [...prev.languages, newLanguage.trim()],
      }));
      setNewLanguage('');
    }
  };

  const removeLanguage = (index: number) => {
    setProfileData((prev) => ({
      ...prev,
      languages: prev.languages.filter((_, i) => i !== index),
    }));
  };

  const addAchievement = () => {
    if (newAchievement.title.trim() && newAchievement.date.trim()) {
      setAchievements((prev) => [...prev, { ...newAchievement }]);
      setNewAchievement({ title: '', date: '', description: '' });
    }
  };

  const removeAchievement = (index: number) => {
    setAchievements((prev) => prev.filter((_, i) => i !== index));
  };

  return (
    <div className='p-6 space-y-6'>
      <Breadcrumb
        items={[
          { label: 'Dashboard', href: '/dashboard' },
          { label: 'My Profile' },
        ]}
      />

      <div className='flex justify-between items-center'>
        <div>
          <h1 className='text-2xl font-bold text-gray-900 flex items-center gap-2'>
            My Profile
            <CountryFlag code={getCountryCode(profileData.country)} size={24} />
          </h1>
          <p className='text-gray-600'>
            Manage your profile information and privacy settings
          </p>
        </div>
        <div className='flex gap-2'>
          {isEditing ? (
            <>
              <Button variant='outline' onClick={handleCancel}>
                <X className='h-4 w-4 mr-2' />
                Cancel
              </Button>
              <Button
                className='bg-green-600 hover:bg-green-700'
                onClick={handleSave}
              >
                <Save className='h-4 w-4 mr-2' />
                Save Changes
              </Button>
            </>
          ) : (
            <Button
              className='bg-blue-600 hover:bg-blue-700'
              onClick={() => setIsEditing(true)}
            >
              <Edit className='h-4 w-4 mr-2' />
              Edit Profile
            </Button>
          )}
        </div>
      </div>

      <div className='grid lg:grid-cols-3 gap-6'>
        {/* Main Profile Info */}
        <div className='lg:col-span-2 space-y-6'>
          {/* Basic Information */}
          <Card>
            <CardHeader>
              <CardTitle className='flex items-center gap-2'>
                <User className='h-5 w-5 text-blue-600' />
                Basic Information
              </CardTitle>
            </CardHeader>
            <CardContent className='space-y-4'>
              <div className='flex items-center space-x-4'>
                <Avatar className='h-20 w-20'>
                  <AvatarFallback className='bg-blue-100 text-blue-600 text-xl'>
                    {profileData.name
                      .split(' ')
                      .map((n) => n[0])
                      .join('')}
                  </AvatarFallback>
                </Avatar>
                <div className='flex-1'>
                  {isEditing ? (
                    <div className='space-y-2'>
                      <Input
                        value={profileData.name}
                        onChange={(e) =>
                          setProfileData({
                            ...profileData,
                            name: e.target.value,
                          })
                        }
                        placeholder='Full Name'
                      />
                      <Input
                        value={profileData.email}
                        onChange={(e) =>
                          setProfileData({
                            ...profileData,
                            email: e.target.value,
                          })
                        }
                        placeholder='Email'
                        type='email'
                      />
                      <div>
                        <label className='block text-sm font-medium text-gray-700 mb-1'>
                          Country
                        </label>
                        <CountrySelect
                          value={profileData.country}
                          onChange={(country) =>
                            setProfileData({ ...profileData, country })
                          }
                        />
                      </div>
                    </div>
                  ) : (
                    <div>
                      <h3 className='text-xl font-semibold text-gray-900 flex items-center gap-2'>
                        {profileData.name}
                        <CountryFlag
                          code={getCountryCode(profileData.country)}
                          size={20}
                        />
                      </h3>
                      <p className='text-gray-600'>{profileData.email}</p>
                      <div className='flex items-center gap-4 mt-2 text-sm text-gray-600'>
                        <div className='flex items-center'>
                          <BookOpen className='h-4 w-4 mr-1' />
                          {profileData.major}
                        </div>
                        <div className='flex items-center'>
                          <MapPin className='h-4 w-4 mr-1' />
                          <CountryFlag
                            code={getCountryCode(profileData.country)}
                            size={16}
                            className='mr-1'
                          />
                          {profileData.country}
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              </div>

              <div className='grid md:grid-cols-2 gap-4'>
                <div>
                  <label className='block text-sm font-medium text-gray-700 mb-1'>
                    Major
                  </label>
                  {isEditing ? (
                    <Input
                      value={profileData.major}
                      onChange={(e) =>
                        setProfileData({
                          ...profileData,
                          major: e.target.value,
                        })
                      }
                    />
                  ) : (
                    <p className='text-gray-900'>{profileData.major}</p>
                  )}
                </div>
                <div>
                  <label className='block text-sm font-medium text-gray-700 mb-1'>
                    University
                  </label>
                  {isEditing ? (
                    <Input
                      value={profileData.university}
                      onChange={(e) =>
                        setProfileData({
                          ...profileData,
                          university: e.target.value,
                        })
                      }
                    />
                  ) : (
                    <p className='text-gray-900'>{profileData.university}</p>
                  )}
                </div>
                <div>
                  <label className='block text-sm font-medium text-gray-700 mb-1'>
                    Academic Year
                  </label>
                  {isEditing ? (
                    <Input
                      value={profileData.academicYear}
                      onChange={(e) =>
                        setProfileData({
                          ...profileData,
                          academicYear: e.target.value,
                        })
                      }
                    />
                  ) : (
                    <p className='text-gray-900'>{profileData.academicYear}</p>
                  )}
                </div>
                <div>
                  <label className='block text-sm font-medium text-gray-700 mb-1'>
                    GPA
                  </label>
                  {isEditing ? (
                    <Input
                      value={profileData.gpa}
                      onChange={(e) =>
                        setProfileData({ ...profileData, gpa: e.target.value })
                      }
                    />
                  ) : (
                    <p className='text-gray-900'>{profileData.gpa}</p>
                  )}
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Bio and Interests */}
          <Card>
            <CardHeader>
              <CardTitle>About Me</CardTitle>
            </CardHeader>
            <CardContent className='space-y-4'>
              <div>
                <label className='block text-sm font-medium text-gray-700 mb-2'>
                  Bio
                </label>
                {isEditing ? (
                  <Textarea
                    value={profileData.bio}
                    onChange={(e) =>
                      setProfileData({ ...profileData, bio: e.target.value })
                    }
                    rows={4}
                    placeholder='Tell others about yourself...'
                  />
                ) : (
                  <p className='text-gray-900'>{profileData.bio}</p>
                )}
              </div>

              <div>
                <label className='block text-sm font-medium text-gray-700 mb-2'>
                  Interests
                </label>
                <div className='flex flex-wrap gap-2 mb-2'>
                  {profileData.interests.map((interest, index) => (
                    <Badge
                      key={index}
                      variant='secondary'
                      className='flex items-center gap-1'
                    >
                      {interest}
                      {isEditing && (
                        <button
                          onClick={() => removeInterest(index)}
                          className='ml-1 hover:text-red-600'
                        >
                          <X className='h-3 w-3' />
                        </button>
                      )}
                    </Badge>
                  ))}
                </div>
                {isEditing && (
                  <div className='flex gap-2'>
                    <Input
                      placeholder='Add new interest'
                      value={newInterest}
                      onChange={(e) => setNewInterest(e.target.value)}
                      onKeyPress={(e) => e.key === 'Enter' && addInterest()}
                    />
                    <Button size='sm' onClick={addInterest}>
                      <Plus className='h-4 w-4' />
                    </Button>
                  </div>
                )}
              </div>

              <div>
                <label className='block text-sm font-medium text-gray-700 mb-2'>
                  Languages
                </label>
                <div className='flex flex-wrap gap-2 mb-2'>
                  {profileData.languages.map((language, index) => (
                    <Badge
                      key={index}
                      variant='outline'
                      className='flex items-center gap-1'
                    >
                      {language}
                      {isEditing && (
                        <button
                          onClick={() => removeLanguage(index)}
                          className='ml-1 hover:text-red-600'
                        >
                          <X className='h-3 w-3' />
                        </button>
                      )}
                    </Badge>
                  ))}
                </div>
                {isEditing && (
                  <div className='flex gap-2'>
                    <Input
                      placeholder='Add new language'
                      value={newLanguage}
                      onChange={(e) => setNewLanguage(e.target.value)}
                      onKeyPress={(e) => e.key === 'Enter' && addLanguage()}
                    />
                    <Button size='sm' onClick={addLanguage}>
                      <Plus className='h-4 w-4' />
                    </Button>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>

          {/* Achievements */}
          <Card>
            <CardHeader>
              <CardTitle className='flex items-center gap-2'>
                <Star className='h-5 w-5 text-yellow-500' />
                Achievements
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className='space-y-4'>
                {achievements.map((achievement, index) => (
                  <div
                    key={index}
                    className='border-l-4 border-blue-500 pl-4 relative'
                  >
                    <div className='flex items-center justify-between'>
                      <h4 className='font-medium text-gray-900'>
                        {isEditing ? (
                          <Input
                            value={achievement.title}
                            onChange={(e) => {
                              const updated = [...achievements];
                              updated[index].title = e.target.value;
                              setAchievements(updated);
                            }}
                            placeholder='Achievement title'
                          />
                        ) : (
                          achievement.title
                        )}
                      </h4>
                      <div className='flex items-center gap-2'>
                        <span className='text-sm text-gray-500'>
                          {isEditing ? (
                            <Input
                              value={achievement.date}
                              onChange={(e) => {
                                const updated = [...achievements];
                                updated[index].date = e.target.value;
                                setAchievements(updated);
                              }}
                              placeholder='Date'
                              className='w-24'
                            />
                          ) : (
                            achievement.date
                          )}
                        </span>
                        {isEditing && (
                          <Button
                            size='sm'
                            variant='ghost'
                            onClick={() => removeAchievement(index)}
                          >
                            <Trash2 className='h-4 w-4 text-red-600' />
                          </Button>
                        )}
                      </div>
                    </div>
                    <p className='text-sm text-gray-600'>
                      {isEditing ? (
                        <Input
                          value={achievement.description}
                          onChange={(e) => {
                            const updated = [...achievements];
                            updated[index].description = e.target.value;
                            setAchievements(updated);
                          }}
                          placeholder='Description'
                        />
                      ) : (
                        achievement.description
                      )}
                    </p>
                  </div>
                ))}
                {isEditing && (
                  <div className='border-2 border-dashed border-gray-300 p-4 rounded-lg'>
                    <h4 className='font-medium text-gray-700 mb-2'>
                      Add New Achievement
                    </h4>
                    <div className='space-y-2'>
                      <Input
                        placeholder='Achievement title'
                        value={newAchievement.title}
                        onChange={(e) =>
                          setNewAchievement((prev) => ({
                            ...prev,
                            title: e.target.value,
                          }))
                        }
                      />
                      <div className='grid grid-cols-2 gap-2'>
                        <Input
                          placeholder='Date'
                          value={newAchievement.date}
                          onChange={(e) =>
                            setNewAchievement((prev) => ({
                              ...prev,
                              date: e.target.value,
                            }))
                          }
                        />
                        <Input
                          placeholder='Description'
                          value={newAchievement.description}
                          onChange={(e) =>
                            setNewAchievement((prev) => ({
                              ...prev,
                              description: e.target.value,
                            }))
                          }
                        />
                      </div>
                      <Button size='sm' onClick={addAchievement}>
                        <Plus className='h-4 w-4 mr-1' />
                        Add Achievement
                      </Button>
                    </div>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Sidebar */}
        <div className='space-y-6'>
          {/* Privacy Settings */}
          <Card>
            <CardHeader>
              <CardTitle className='flex items-center gap-2'>
                <Shield className='h-5 w-5 text-green-600' />
                Privacy Settings
              </CardTitle>
            </CardHeader>
            <CardContent className='space-y-4'>
              <div className='flex items-center justify-between'>
                <span className='text-sm'>Profile Visibility</span>
                <Badge className='bg-green-100 text-green-700'>Public</Badge>
              </div>
              <div className='flex items-center justify-between'>
                <span className='text-sm'>Contact Info</span>
                <Badge variant='secondary'>Members Only</Badge>
              </div>
              <div className='flex items-center justify-between'>
                <span className='text-sm'>Academic Info</span>
                <Badge className='bg-green-100 text-green-700'>Public</Badge>
              </div>
              <Button
                size='sm'
                variant='outline'
                className='w-full'
                onClick={() => setSettingsOpen(true)}
              >
                <Settings className='h-4 w-4 mr-2' />
                Manage Privacy
              </Button>
            </CardContent>
          </Card>

          {/* Mentorship History */}
          <Card>
            <CardHeader>
              <CardTitle>Mentorship History</CardTitle>
            </CardHeader>
            <CardContent className='space-y-4'>
              {mentorshipHistory.map((session, index) => (
                <div key={index} className='p-3 bg-gray-50 rounded-lg'>
                  <div className='flex items-center justify-between mb-2'>
                    <h4 className='font-medium text-sm flex items-center gap-2'>
                      {session.mentor}
                      <CountryFlag code='us' size={16} />
                    </h4>
                    <div className='flex items-center gap-1'>
                      <Star className='h-3 w-3 text-yellow-500' />
                      <span className='text-xs'>{session.rating}</span>
                    </div>
                  </div>
                  <p className='text-xs text-gray-600'>{session.subject}</p>
                  <p className='text-xs text-gray-500'>
                    {session.sessions} sessions completed
                  </p>
                </div>
              ))}
            </CardContent>
          </Card>

          {/* Quick Stats */}
          <Card>
            <CardHeader>
              <CardTitle>Profile Stats</CardTitle>
            </CardHeader>
            <CardContent className='space-y-4'>
              <div className='text-center'>
                <div className='text-2xl font-bold text-blue-600'>85%</div>
                <div className='text-sm text-gray-600'>Profile Complete</div>
              </div>
              <div className='grid grid-cols-2 gap-4 text-center'>
                <div>
                  <div className='text-lg font-semibold text-gray-900'>12</div>
                  <div className='text-xs text-gray-600'>Connections</div>
                </div>
                <div>
                  <div className='text-lg font-semibold text-gray-900'>3</div>
                  <div className='text-xs text-gray-600'>Groups</div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Settings Modal */}
      <SettingsModal open={settingsOpen} onOpenChange={setSettingsOpen} />
    </div>
  );
};

export default StudentProfile;
