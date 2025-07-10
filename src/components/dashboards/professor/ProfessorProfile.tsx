import { useState } from 'react';
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
import { CountryFlag } from '@/components/ui/CountryFlag';
import CountrySelect from '@/components/ui/CountrySelect';
import { getCountryCode } from '@/lib/countries';
import {
  User,
  Mail,
  MapPin,
  BookOpen,
  Edit,
  Save,
  X,
  Settings,
  Star,
  Award,
  Users,
  Plus,
  Trash2,
} from 'lucide-react';

const ProfessorProfile = () => {
  const [isEditing, setIsEditing] = useState(false);
  const [settingsOpen, setSettingsOpen] = useState(false);
  const [profileData, setProfileData] = useState({
    name: 'Dr. Sarah Johnson',
    email: 'sarah.johnson@university.edu',
    title: 'Professor of Computer Science',
    department: 'Computer Science Department',
    university: 'Stanford University',
    country: 'United States',
    bio: 'Distinguished professor specializing in artificial intelligence and machine learning. Passionate about mentoring the next generation of computer scientists and researchers.',
    expertise: [
      'Artificial Intelligence',
      'Machine Learning',
      'Computer Vision',
      'Deep Learning',
    ],
    education: [
      'PhD in Computer Science - MIT (2010)',
      'MS in Computer Science - Carnegie Mellon (2006)',
      'BS in Mathematics - Harvard (2004)',
    ],
    publications: '127 peer-reviewed papers',
    hIndex: '45',
    citations: '8,450',
  });

  const mentorshipStats = {
    totalStudents: 127,
    activeStudents: 8,
    rating: 4.9,
    completedSessions: 456,
  };

  const [recentPublications, setRecentPublications] = useState([
    {
      title: 'Advances in Neural Network Architecture for Computer Vision',
      journal: 'Nature Machine Intelligence',
      year: 2024,
      citations: 23,
    },
    {
      title: 'Ethical Considerations in AI-Driven Healthcare Systems',
      journal: 'AI Ethics Journal',
      year: 2024,
      citations: 15,
    },
    {
      title: 'Deep Learning Approaches to Natural Language Understanding',
      journal: 'Journal of AI Research',
      year: 2023,
      citations: 89,
    },
  ]);

  const [newExpertise, setNewExpertise] = useState('');
  const [newEducation, setNewEducation] = useState('');
  const [newPublication, setNewPublication] = useState({
    title: '',
    journal: '',
    year: '',
    citations: '',
  });

  const handleSave = () => {
    setIsEditing(false);
    // Here you would typically save to backend
  };

  const handleCancel = () => {
    setIsEditing(false);
    // Reset form data if needed
  };

  const addExpertise = () => {
    if (newExpertise.trim()) {
      setProfileData((prev) => ({
        ...prev,
        expertise: [...prev.expertise, newExpertise.trim()],
      }));
      setNewExpertise('');
    }
  };

  const removeExpertise = (index: number) => {
    setProfileData((prev) => ({
      ...prev,
      expertise: prev.expertise.filter((_, i) => i !== index),
    }));
  };

  const addEducation = () => {
    if (newEducation.trim()) {
      setProfileData((prev) => ({
        ...prev,
        education: [...prev.education, newEducation.trim()],
      }));
      setNewEducation('');
    }
  };

  const removeEducation = (index: number) => {
    setProfileData((prev) => ({
      ...prev,
      education: prev.education.filter((_, i) => i !== index),
    }));
  };

  const addPublication = () => {
    if (newPublication.title.trim() && newPublication.journal.trim()) {
      setRecentPublications((prev) => [
        ...prev,
        {
          ...newPublication,
          year: parseInt(newPublication.year) || new Date().getFullYear(),
          citations: parseInt(newPublication.citations) || 0,
        },
      ]);
      setNewPublication({ title: '', journal: '', year: '', citations: '' });
    }
  };

  const removePublication = (index: number) => {
    setRecentPublications((prev) => prev.filter((_, i) => i !== index));
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
            Faculty Profile
            <CountryFlag code={getCountryCode(profileData.country)} size={24} />
          </h1>
          <p className='text-gray-600'>
            Manage your academic profile and visibility settings
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
                Academic Information
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
                      <Input
                        value={profileData.title}
                        onChange={(e) =>
                          setProfileData({
                            ...profileData,
                            title: e.target.value,
                          })
                        }
                        placeholder='Academic Title'
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
                      <p className='text-blue-600 font-medium'>
                        {profileData.title}
                      </p>
                      <p className='text-gray-600'>{profileData.email}</p>
                      <div className='flex items-center gap-4 mt-2 text-sm text-gray-600'>
                        <div className='flex items-center'>
                          <BookOpen className='h-4 w-4 mr-1' />
                          {profileData.department}
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
                    Department
                  </label>
                  {isEditing ? (
                    <Input
                      value={profileData.department}
                      onChange={(e) =>
                        setProfileData({
                          ...profileData,
                          department: e.target.value,
                        })
                      }
                    />
                  ) : (
                    <p className='text-gray-900'>{profileData.department}</p>
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
              </div>
            </CardContent>
          </Card>

          {/* Bio and Expertise */}
          <Card>
            <CardHeader>
              <CardTitle>About</CardTitle>
            </CardHeader>
            <CardContent className='space-y-4'>
              <div>
                <label className='block text-sm font-medium text-gray-700 mb-2'>
                  Academic Bio
                </label>
                {isEditing ? (
                  <Textarea
                    value={profileData.bio}
                    onChange={(e) =>
                      setProfileData({ ...profileData, bio: e.target.value })
                    }
                    rows={4}
                    placeholder='Describe your academic background and research interests...'
                  />
                ) : (
                  <p className='text-gray-900'>{profileData.bio}</p>
                )}
              </div>

              <div>
                <label className='block text-sm font-medium text-gray-700 mb-2'>
                  Areas of Expertise
                </label>
                <div className='flex flex-wrap gap-2 mb-2'>
                  {profileData.expertise.map((area, index) => (
                    <Badge
                      key={index}
                      className='bg-blue-100 text-blue-700 flex items-center gap-1'
                    >
                      {area}
                      {isEditing && (
                        <button
                          onClick={() => removeExpertise(index)}
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
                      placeholder='Add new expertise area'
                      value={newExpertise}
                      onChange={(e) => setNewExpertise(e.target.value)}
                      onKeyPress={(e) => e.key === 'Enter' && addExpertise()}
                    />
                    <Button size='sm' onClick={addExpertise}>
                      <Plus className='h-4 w-4' />
                    </Button>
                  </div>
                )}
              </div>

              <div>
                <label className='block text-sm font-medium text-gray-700 mb-2'>
                  Education
                </label>
                <div className='space-y-2 mb-2'>
                  {profileData.education.map((degree, index) => (
                    <div
                      key={index}
                      className='flex items-center justify-between text-gray-900 text-sm'
                    >
                      <span>• {degree}</span>
                      {isEditing && (
                        <Button
                          size='sm'
                          variant='ghost'
                          onClick={() => removeEducation(index)}
                        >
                          <Trash2 className='h-4 w-4 text-red-600' />
                        </Button>
                      )}
                    </div>
                  ))}
                </div>
                {isEditing && (
                  <div className='flex gap-2'>
                    <Input
                      placeholder='Add new degree (e.g., PhD in Computer Science - MIT (2010))'
                      value={newEducation}
                      onChange={(e) => setNewEducation(e.target.value)}
                      onKeyPress={(e) => e.key === 'Enter' && addEducation()}
                    />
                    <Button size='sm' onClick={addEducation}>
                      <Plus className='h-4 w-4' />
                    </Button>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>

          {/* Recent Publications */}
          <Card>
            <CardHeader>
              <CardTitle className='flex items-center gap-2'>
                <BookOpen className='h-5 w-5 text-green-600' />
                Recent Publications
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className='space-y-4'>
                {recentPublications.map((pub, index) => (
                  <div
                    key={index}
                    className='border-l-4 border-green-500 pl-4 relative'
                  >
                    <div className='flex items-start justify-between'>
                      <div className='flex-1'>
                        <h4 className='font-medium text-gray-900'>
                          {isEditing ? (
                            <Input
                              value={pub.title}
                              onChange={(e) => {
                                const updated = [...recentPublications];
                                updated[index].title = e.target.value;
                                setRecentPublications(updated);
                              }}
                              placeholder='Publication title'
                              className='mb-2'
                            />
                          ) : (
                            pub.title
                          )}
                        </h4>
                        <div className='flex items-center justify-between text-sm text-gray-600'>
                          <span>
                            {isEditing ? (
                              <div className='flex gap-2'>
                                <Input
                                  value={pub.journal}
                                  onChange={(e) => {
                                    const updated = [...recentPublications];
                                    updated[index].journal = e.target.value;
                                    setRecentPublications(updated);
                                  }}
                                  placeholder='Journal'
                                  className='w-48'
                                />
                                <Input
                                  value={pub.year}
                                  onChange={(e) => {
                                    const updated = [...recentPublications];
                                    updated[index].year =
                                      parseInt(e.target.value) || pub.year;
                                    setRecentPublications(updated);
                                  }}
                                  placeholder='Year'
                                  className='w-20'
                                />
                              </div>
                            ) : (
                              `${pub.journal} (${pub.year})`
                            )}
                          </span>
                          <div className='flex items-center gap-2'>
                            <Badge variant='outline'>
                              {isEditing ? (
                                <Input
                                  value={pub.citations}
                                  onChange={(e) => {
                                    const updated = [...recentPublications];
                                    updated[index].citations =
                                      parseInt(e.target.value) || pub.citations;
                                    setRecentPublications(updated);
                                  }}
                                  placeholder='Citations'
                                  className='w-20'
                                />
                              ) : (
                                `${pub.citations} citations`
                              )}
                            </Badge>
                            {isEditing && (
                              <Button
                                size='sm'
                                variant='ghost'
                                onClick={() => removePublication(index)}
                              >
                                <Trash2 className='h-4 w-4 text-red-600' />
                              </Button>
                            )}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
                {isEditing && (
                  <div className='border-2 border-dashed border-gray-300 p-4 rounded-lg'>
                    <h4 className='font-medium text-gray-700 mb-2'>
                      Add New Publication
                    </h4>
                    <div className='space-y-2'>
                      <Input
                        placeholder='Publication title'
                        value={newPublication.title}
                        onChange={(e) =>
                          setNewPublication((prev) => ({
                            ...prev,
                            title: e.target.value,
                          }))
                        }
                      />
                      <div className='grid grid-cols-3 gap-2'>
                        <Input
                          placeholder='Journal'
                          value={newPublication.journal}
                          onChange={(e) =>
                            setNewPublication((prev) => ({
                              ...prev,
                              journal: e.target.value,
                            }))
                          }
                        />
                        <Input
                          placeholder='Year'
                          value={newPublication.year}
                          onChange={(e) =>
                            setNewPublication((prev) => ({
                              ...prev,
                              year: e.target.value,
                            }))
                          }
                        />
                        <Input
                          placeholder='Citations'
                          value={newPublication.citations}
                          onChange={(e) =>
                            setNewPublication((prev) => ({
                              ...prev,
                              citations: e.target.value,
                            }))
                          }
                        />
                      </div>
                      <Button size='sm' onClick={addPublication}>
                        <Plus className='h-4 w-4 mr-1' />
                        Add Publication
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
          {/* Mentorship Stats */}
          <Card>
            <CardHeader>
              <CardTitle className='flex items-center gap-2'>
                <Star className='h-5 w-5 text-yellow-500' />
                Mentorship Stats
              </CardTitle>
            </CardHeader>
            <CardContent className='space-y-4'>
              <div className='text-center'>
                <div className='text-3xl font-bold text-blue-600'>
                  {mentorshipStats.rating}
                </div>
                <div className='text-sm text-gray-600 flex items-center justify-center gap-1'>
                  <Star className='h-4 w-4 text-yellow-500' />
                  Average Rating
                </div>
              </div>
              <div className='grid grid-cols-2 gap-4 text-center'>
                <div>
                  <div className='text-lg font-semibold text-gray-900'>
                    {mentorshipStats.totalStudents}
                  </div>
                  <div className='text-xs text-gray-600'>Total Students</div>
                </div>
                <div>
                  <div className='text-lg font-semibold text-gray-900'>
                    {mentorshipStats.activeStudents}
                  </div>
                  <div className='text-xs text-gray-600'>Active</div>
                </div>
              </div>
              <div className='text-center'>
                <div className='text-lg font-semibold text-gray-900'>
                  {mentorshipStats.completedSessions}
                </div>
                <div className='text-xs text-gray-600'>Sessions Completed</div>
              </div>
            </CardContent>
          </Card>

          {/* Academic Metrics */}
          <Card>
            <CardHeader>
              <CardTitle className='flex items-center gap-2'>
                <Award className='h-5 w-5 text-purple-600' />
                Academic Metrics
              </CardTitle>
            </CardHeader>
            <CardContent className='space-y-4'>
              <div className='text-center'>
                <div className='text-2xl font-bold text-purple-600'>
                  {isEditing ? (
                    <Input
                      value={profileData.hIndex}
                      onChange={(e) =>
                        setProfileData({
                          ...profileData,
                          hIndex: e.target.value,
                        })
                      }
                      className='text-center'
                    />
                  ) : (
                    profileData.hIndex
                  )}
                </div>
                <div className='text-sm text-gray-600'>h-index</div>
              </div>
              <div className='grid grid-cols-2 gap-4 text-center'>
                <div>
                  <div className='text-lg font-semibold text-gray-900'>
                    {isEditing ? (
                      <Input
                        value={profileData.publications}
                        onChange={(e) =>
                          setProfileData({
                            ...profileData,
                            publications: e.target.value,
                          })
                        }
                        className='text-center'
                      />
                    ) : (
                      profileData.publications
                    )}
                  </div>
                  <div className='text-xs text-gray-600'>Publications</div>
                </div>
                <div>
                  <div className='text-lg font-semibold text-gray-900'>
                    {isEditing ? (
                      <Input
                        value={profileData.citations}
                        onChange={(e) =>
                          setProfileData({
                            ...profileData,
                            citations: e.target.value,
                          })
                        }
                        className='text-center'
                      />
                    ) : (
                      profileData.citations
                    )}
                  </div>
                  <div className='text-xs text-gray-600'>Citations</div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Visibility Settings */}
          <Card>
            <CardHeader>
              <CardTitle className='flex items-center gap-2'>
                <Settings className='h-5 w-5 text-gray-600' />
                Profile Settings
              </CardTitle>
            </CardHeader>
            <CardContent className='space-y-4'>
              <div className='flex items-center justify-between'>
                <span className='text-sm'>Profile Visibility</span>
                <Badge className='bg-green-100 text-green-700'>Public</Badge>
              </div>
              <div className='flex items-center justify-between'>
                <span className='text-sm'>Mentorship Availability</span>
                <Badge className='bg-green-100 text-green-700'>Open</Badge>
              </div>
              <div className='flex items-center justify-between'>
                <span className='text-sm'>Contact Information</span>
                <Badge variant='secondary'>Students Only</Badge>
              </div>
              <Button
                size='sm'
                variant='outline'
                className='w-full'
                onClick={() => setSettingsOpen(true)}
              >
                <Settings className='h-4 w-4 mr-2' />
                Manage Settings
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Settings Modal */}
      <SettingsModal open={settingsOpen} onOpenChange={setSettingsOpen} />
    </div>
  );
};

export default ProfessorProfile;
