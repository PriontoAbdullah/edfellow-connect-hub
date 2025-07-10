import { useEffect, useState } from 'react';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { useToast } from '@/hooks/use-toast';
import { Breadcrumb } from '../../dashboard/Breadcrumb';
import SettingsModal from '../../modals/SettingsModal';
import { CountryFlag } from '@/components/ui/CountryFlag';
import CountrySelect from '@/components/ui/CountrySelect';
import { getCountryCode } from '@/lib/countries';
import {
  Building2,
  Globe,
  Mail,
  Phone,
  MapPin,
  Calendar,
  Users,
  Award,
  BookOpen,
  Camera,
  Edit,
  Save,
  Star,
  ExternalLink,
  CheckCircle,
  Settings,
  X,
  Plus,
  Trash2,
} from 'lucide-react';

const UniversityProfile = () => {
  // Scroll to top on component mount
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);

  const { toast } = useToast();
  const [isEditing, setIsEditing] = useState(false);
  const [settingsOpen, setSettingsOpen] = useState(false);
  const [profileData, setProfileData] = useState({
    universityName: 'International University of Technology',
    tagline: 'Leading Innovation in Higher Education',
    description:
      'A premier institution committed to excellence in education, research, and innovation. We offer world-class programs that prepare students for global careers and leadership roles.',
    website: 'https://www.iut.edu',
    email: 'admissions@iut.edu',
    phone: '+1 (555) 123-4567',
    address: '123 University Ave, Tech City, TC 12345',
    country: 'United States',
    established: '1985',
    totalStudents: '25,000',
    internationalStudents: '8,500',
    facultyCount: '1,200',
    campusSize: '450 acres',
    ranking: '#45 Globally',
    accreditation: 'AACSB, ABET, WASC',
  });

  const [programs, setPrograms] = useState([
    { name: 'Master of Computer Science', students: 1250, status: 'Active' },
    { name: 'Business Analytics PhD', students: 340, status: 'Active' },
    { name: 'Data Science Certificate', students: 0, status: 'Draft' },
    { name: 'International Business MBA', students: 890, status: 'Review' },
  ]);

  const [achievements, setAchievements] = useState([
    {
      title: 'QS World University Rankings',
      rank: '#45 Globally',
      year: '2024',
    },
    {
      title: 'Research Excellence Award',
      rank: 'Top 10 in Technology',
      year: '2023',
    },
    { title: 'Student Satisfaction', rank: '4.8/5 Rating', year: '2024' },
    {
      title: 'Graduate Employment Rate',
      rank: '94% within 6 months',
      year: '2023',
    },
  ]);

  const [newProgram, setNewProgram] = useState({
    name: '',
    students: '',
    status: 'Draft',
  });
  const [newAchievement, setNewAchievement] = useState({
    title: '',
    rank: '',
    year: '',
  });

  const handleSave = () => {
    setIsEditing(false);
    toast({
      title: 'Profile Updated',
      description: 'Your university profile has been updated successfully.',
    });
  };

  const handleCancel = () => {
    setIsEditing(false);
    // Reset form data if needed
  };

  const addProgram = () => {
    if (newProgram.name.trim()) {
      setPrograms((prev) => [
        ...prev,
        {
          ...newProgram,
          students: parseInt(newProgram.students) || 0,
        },
      ]);
      setNewProgram({ name: '', students: '', status: 'Draft' });
    }
  };

  const removeProgram = (index: number) => {
    setPrograms((prev) => prev.filter((_, i) => i !== index));
  };

  const addAchievement = () => {
    if (newAchievement.title.trim() && newAchievement.rank.trim()) {
      setAchievements((prev) => [...prev, { ...newAchievement }]);
      setNewAchievement({ title: '', rank: '', year: '' });
    }
  };

  const removeAchievement = (index: number) => {
    setAchievements((prev) => prev.filter((_, i) => i !== index));
  };

  return (
    <div className='min-h-screen bg-gradient-to-br from-orange-50/30 via-white to-orange-100/20'>
      <div className='p-6 space-y-6'>
        <Breadcrumb
          items={[
            { label: 'Dashboard', href: '/dashboard' },
            { label: 'University Profile' },
          ]}
        />

        <div className='max-w-6xl mx-auto space-y-6'>
          {/* Header Card */}
          <Card className='relative overflow-hidden'>
            <div className='h-32 bg-gradient-to-r from-orange-600/40 to-red-600/40'></div>
            <CardContent className='p-8 -mt-16 relative'>
              <div className='flex items-start justify-between'>
                <div className='flex items-center space-x-6'>
                  <div className='relative'>
                    <Avatar className='h-24 w-24 border-4 border-white shadow-lg bg-white'>
                      <AvatarFallback className='bg-orange-100 text-orange-600 text-2xl font-bold'>
                        IUT
                      </AvatarFallback>
                    </Avatar>
                    <Button
                      size='sm'
                      className='absolute -bottom-2 -right-2 h-8 w-8 rounded-full p-0'
                    >
                      <Camera className='h-4 w-4' />
                    </Button>
                  </div>
                  <div className='space-y-2'>
                    <h1 className='text-3xl font-bold text-gray-900 flex items-center gap-2'>
                      {isEditing ? (
                        <Input
                          value={profileData.universityName}
                          onChange={(e) =>
                            setProfileData((prev) => ({
                              ...prev,
                              universityName: e.target.value,
                            }))
                          }
                          className='text-3xl font-bold'
                        />
                      ) : (
                        profileData.universityName
                      )}
                      <CountryFlag
                        code={getCountryCode(profileData.country)}
                        size={32}
                      />
                    </h1>
                    <p className='text-lg text-orange-600 font-medium'>
                      {isEditing ? (
                        <Input
                          value={profileData.tagline}
                          onChange={(e) =>
                            setProfileData((prev) => ({
                              ...prev,
                              tagline: e.target.value,
                            }))
                          }
                          placeholder='University tagline'
                        />
                      ) : (
                        profileData.tagline
                      )}
                    </p>
                    <div className='flex items-center gap-4'>
                      <Badge className='bg-green-100 text-green-700 flex items-center gap-1'>
                        <CheckCircle className='h-3 w-3' />
                        Verified Institution
                      </Badge>
                      <Badge
                        variant='outline'
                        className='flex items-center gap-1'
                      >
                        <Star className='h-3 w-3 fill-current text-yellow-500' />
                        {isEditing ? (
                          <Input
                            value={profileData.ranking}
                            onChange={(e) =>
                              setProfileData((prev) => ({
                                ...prev,
                                ranking: e.target.value,
                              }))
                            }
                            className='w-24'
                          />
                        ) : (
                          profileData.ranking
                        )}
                      </Badge>
                    </div>
                  </div>
                </div>
                <Button
                  onClick={() =>
                    isEditing ? handleSave() : setIsEditing(true)
                  }
                  className={
                    isEditing
                      ? 'bg-green-600 hover:bg-green-700'
                      : 'bg-orange-600 hover:bg-orange-700'
                  }
                >
                  {isEditing ? (
                    <>
                      <Save className='h-4 w-4 mr-2' />
                      Save Changes
                    </>
                  ) : (
                    <>
                      <Edit className='h-4 w-4 mr-2' />
                      Edit Profile
                    </>
                  )}
                </Button>
              </div>
              {isEditing && (
                <div className='mt-4'>
                  <Button
                    variant='outline'
                    onClick={handleCancel}
                    className='mr-2'
                  >
                    <X className='h-4 w-4 mr-2' />
                    Cancel
                  </Button>
                </div>
              )}
            </CardContent>
          </Card>

          <div className='grid lg:grid-cols-3 gap-6'>
            {/* Main Profile Information */}
            <div className='lg:col-span-2 space-y-6'>
              {/* About Section */}
              <Card>
                <CardHeader>
                  <CardTitle className='flex items-center gap-2'>
                    <Building2 className='h-5 w-5 text-orange-600' />
                    About University
                  </CardTitle>
                </CardHeader>
                <CardContent className='space-y-4'>
                  {isEditing ? (
                    <div className='space-y-4'>
                      <div>
                        <Label htmlFor='description'>Description</Label>
                        <Textarea
                          id='description'
                          value={profileData.description}
                          onChange={(e) =>
                            setProfileData((prev) => ({
                              ...prev,
                              description: e.target.value,
                            }))
                          }
                          rows={4}
                        />
                      </div>
                      <div>
                        <Label htmlFor='country'>Country</Label>
                        <CountrySelect
                          value={profileData.country}
                          onChange={(country) =>
                            setProfileData((prev) => ({ ...prev, country }))
                          }
                        />
                      </div>
                    </div>
                  ) : (
                    <div>
                      <p className='text-gray-700 leading-relaxed'>
                        {profileData.description}
                      </p>
                      <div className='flex items-center gap-2 mt-4'>
                        <MapPin className='h-4 w-4 text-gray-400' />
                        <CountryFlag
                          code={getCountryCode(profileData.country)}
                          size={20}
                        />
                        <span className='text-gray-600'>
                          {profileData.country}
                        </span>
                      </div>
                    </div>
                  )}
                </CardContent>
              </Card>

              {/* Contact Information */}
              <Card>
                <CardHeader>
                  <CardTitle className='flex items-center gap-2'>
                    <Mail className='h-5 w-5 text-orange-600' />
                    Contact Information
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  {isEditing ? (
                    <div className='grid md:grid-cols-2 gap-4'>
                      <div>
                        <Label htmlFor='email'>Email</Label>
                        <Input
                          id='email'
                          type='email'
                          value={profileData.email}
                          onChange={(e) =>
                            setProfileData((prev) => ({
                              ...prev,
                              email: e.target.value,
                            }))
                          }
                        />
                      </div>
                      <div>
                        <Label htmlFor='phone'>Phone</Label>
                        <Input
                          id='phone'
                          value={profileData.phone}
                          onChange={(e) =>
                            setProfileData((prev) => ({
                              ...prev,
                              phone: e.target.value,
                            }))
                          }
                        />
                      </div>
                      <div className='md:col-span-2'>
                        <Label htmlFor='address'>Address</Label>
                        <Input
                          id='address'
                          value={profileData.address}
                          onChange={(e) =>
                            setProfileData((prev) => ({
                              ...prev,
                              address: e.target.value,
                            }))
                          }
                        />
                      </div>
                      <div>
                        <Label htmlFor='website'>Website</Label>
                        <Input
                          id='website'
                          value={profileData.website}
                          onChange={(e) =>
                            setProfileData((prev) => ({
                              ...prev,
                              website: e.target.value,
                            }))
                          }
                        />
                      </div>
                    </div>
                  ) : (
                    <div className='space-y-3'>
                      <div className='flex items-center gap-3'>
                        <Mail className='h-4 w-4 text-gray-400' />
                        <span>{profileData.email}</span>
                      </div>
                      <div className='flex items-center gap-3'>
                        <Phone className='h-4 w-4 text-gray-400' />
                        <span>{profileData.phone}</span>
                      </div>
                      <div className='flex items-center gap-3'>
                        <MapPin className='h-4 w-4 text-gray-400' />
                        <span>{profileData.address}</span>
                      </div>
                      <div className='flex items-center gap-3'>
                        <Globe className='h-4 w-4 text-gray-400' />
                        <a
                          href={profileData.website}
                          className='text-blue-600 hover:underline flex items-center gap-1'
                        >
                          {profileData.website}
                          <ExternalLink className='h-3 w-3' />
                        </a>
                      </div>
                    </div>
                  )}
                </CardContent>
              </Card>

              {/* Programs */}
              <Card>
                <CardHeader>
                  <CardTitle className='flex items-center gap-2'>
                    <BookOpen className='h-5 w-5 text-orange-600' />
                    Active Programs
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className='space-y-3'>
                    {programs.map((program, index) => (
                      <div
                        key={index}
                        className='flex items-center justify-between p-3 bg-gray-50 rounded-lg'
                      >
                        <div className='flex-1'>
                          <h4 className='font-medium text-gray-900'>
                            {isEditing ? (
                              <Input
                                value={program.name}
                                onChange={(e) => {
                                  const updated = [...programs];
                                  updated[index].name = e.target.value;
                                  setPrograms(updated);
                                }}
                                placeholder='Program name'
                              />
                            ) : (
                              program.name
                            )}
                          </h4>
                          <p className='text-sm text-gray-600'>
                            {isEditing ? (
                              <Input
                                value={program.students}
                                onChange={(e) => {
                                  const updated = [...programs];
                                  updated[index].students =
                                    parseInt(e.target.value) || 0;
                                  setPrograms(updated);
                                }}
                                placeholder='Number of students'
                                className='w-32'
                              />
                            ) : (
                              `${program.students} students enrolled`
                            )}
                          </p>
                        </div>
                        <div className='flex items-center gap-2'>
                          <Badge
                            className={
                              program.status === 'Active'
                                ? 'bg-green-100 text-green-700'
                                : program.status === 'Draft'
                                ? 'bg-yellow-100 text-yellow-700'
                                : 'bg-blue-100 text-blue-700'
                            }
                          >
                            {isEditing ? (
                              <select
                                value={program.status}
                                onChange={(e) => {
                                  const updated = [...programs];
                                  updated[index].status = e.target.value;
                                  setPrograms(updated);
                                }}
                                className='bg-transparent border-none text-xs'
                              >
                                <option value='Active'>Active</option>
                                <option value='Draft'>Draft</option>
                                <option value='Review'>Review</option>
                              </select>
                            ) : (
                              program.status
                            )}
                          </Badge>
                          {isEditing && (
                            <Button
                              size='sm'
                              variant='ghost'
                              onClick={() => removeProgram(index)}
                            >
                              <Trash2 className='h-4 w-4 text-red-600' />
                            </Button>
                          )}
                        </div>
                      </div>
                    ))}
                    {isEditing && (
                      <div className='border-2 border-dashed border-gray-300 p-4 rounded-lg'>
                        <h4 className='font-medium text-gray-700 mb-2'>
                          Add New Program
                        </h4>
                        <div className='space-y-2'>
                          <Input
                            placeholder='Program name'
                            value={newProgram.name}
                            onChange={(e) =>
                              setNewProgram((prev) => ({
                                ...prev,
                                name: e.target.value,
                              }))
                            }
                          />
                          <div className='grid grid-cols-2 gap-2'>
                            <Input
                              placeholder='Students enrolled'
                              value={newProgram.students}
                              onChange={(e) =>
                                setNewProgram((prev) => ({
                                  ...prev,
                                  students: e.target.value,
                                }))
                              }
                            />
                            <select
                              value={newProgram.status}
                              onChange={(e) =>
                                setNewProgram((prev) => ({
                                  ...prev,
                                  status: e.target.value,
                                }))
                              }
                              className='px-3 py-2 border border-gray-300 rounded-md'
                            >
                              <option value='Draft'>Draft</option>
                              <option value='Review'>Review</option>
                              <option value='Active'>Active</option>
                            </select>
                          </div>
                          <Button size='sm' onClick={addProgram}>
                            <Plus className='h-4 w-4 mr-1' />
                            Add Program
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
              {/* Quick Stats */}
              <Card>
                <CardHeader>
                  <CardTitle className='flex items-center gap-2'>
                    <Users className='h-5 w-5 text-orange-600' />
                    Quick Stats
                  </CardTitle>
                </CardHeader>
                <CardContent className='space-y-4'>
                  <div className='text-center p-3 bg-blue-50 rounded-lg'>
                    <div className='text-2xl font-bold text-blue-600'>
                      {isEditing ? (
                        <Input
                          value={profileData.totalStudents}
                          onChange={(e) =>
                            setProfileData((prev) => ({
                              ...prev,
                              totalStudents: e.target.value,
                            }))
                          }
                          className='text-center'
                        />
                      ) : (
                        profileData.totalStudents
                      )}
                    </div>
                    <div className='text-sm text-gray-600'>Total Students</div>
                  </div>
                  <div className='text-center p-3 bg-green-50 rounded-lg'>
                    <div className='text-2xl font-bold text-green-600'>
                      {isEditing ? (
                        <Input
                          value={profileData.internationalStudents}
                          onChange={(e) =>
                            setProfileData((prev) => ({
                              ...prev,
                              internationalStudents: e.target.value,
                            }))
                          }
                          className='text-center'
                        />
                      ) : (
                        profileData.internationalStudents
                      )}
                    </div>
                    <div className='text-sm text-gray-600'>
                      International Students
                    </div>
                  </div>
                  <div className='text-center p-3 bg-purple-50 rounded-lg'>
                    <div className='text-2xl font-bold text-purple-600'>
                      {isEditing ? (
                        <Input
                          value={profileData.facultyCount}
                          onChange={(e) =>
                            setProfileData((prev) => ({
                              ...prev,
                              facultyCount: e.target.value,
                            }))
                          }
                          className='text-center'
                        />
                      ) : (
                        profileData.facultyCount
                      )}
                    </div>
                    <div className='text-sm text-gray-600'>Faculty Members</div>
                  </div>
                  <div className='space-y-2 pt-2 border-t'>
                    <div className='flex justify-between'>
                      <span className='text-sm text-gray-600'>Established</span>
                      <span className='text-sm font-medium'>
                        {isEditing ? (
                          <Input
                            value={profileData.established}
                            onChange={(e) =>
                              setProfileData((prev) => ({
                                ...prev,
                                established: e.target.value,
                              }))
                            }
                            className='w-20 text-right'
                          />
                        ) : (
                          profileData.established
                        )}
                      </span>
                    </div>
                    <div className='flex justify-between'>
                      <span className='text-sm text-gray-600'>Campus Size</span>
                      <span className='text-sm font-medium'>
                        {isEditing ? (
                          <Input
                            value={profileData.campusSize}
                            onChange={(e) =>
                              setProfileData((prev) => ({
                                ...prev,
                                campusSize: e.target.value,
                              }))
                            }
                            className='w-24 text-right'
                          />
                        ) : (
                          profileData.campusSize
                        )}
                      </span>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Achievements */}
              <Card>
                <CardHeader>
                  <CardTitle className='flex items-center gap-2'>
                    <Award className='h-5 w-5 text-orange-600' />
                    Achievements
                  </CardTitle>
                </CardHeader>
                <CardContent className='space-y-4'>
                  {achievements.map((achievement, index) => (
                    <div key={index} className='p-3 border rounded-lg relative'>
                      <h4 className='font-medium text-gray-900 text-sm'>
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
                      <p className='text-orange-600 font-medium text-sm'>
                        {isEditing ? (
                          <Input
                            value={achievement.rank}
                            onChange={(e) => {
                              const updated = [...achievements];
                              updated[index].rank = e.target.value;
                              setAchievements(updated);
                            }}
                            placeholder='Rank/Achievement'
                          />
                        ) : (
                          achievement.rank
                        )}
                      </p>
                      <div className='flex items-center justify-between'>
                        <p className='text-xs text-gray-500'>
                          {isEditing ? (
                            <Input
                              value={achievement.year}
                              onChange={(e) => {
                                const updated = [...achievements];
                                updated[index].year = e.target.value;
                                setAchievements(updated);
                              }}
                              placeholder='Year'
                              className='w-16'
                            />
                          ) : (
                            achievement.year
                          )}
                        </p>
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
                  ))}
                  {isEditing && (
                    <div className='border-2 border-dashed border-gray-300 p-3 rounded-lg'>
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
                        <Input
                          placeholder='Rank/Achievement'
                          value={newAchievement.rank}
                          onChange={(e) =>
                            setNewAchievement((prev) => ({
                              ...prev,
                              rank: e.target.value,
                            }))
                          }
                        />
                        <Input
                          placeholder='Year'
                          value={newAchievement.year}
                          onChange={(e) =>
                            setNewAchievement((prev) => ({
                              ...prev,
                              year: e.target.value,
                            }))
                          }
                        />
                        <Button size='sm' onClick={addAchievement}>
                          <Plus className='h-4 w-4 mr-1' />
                          Add Achievement
                        </Button>
                      </div>
                    </div>
                  )}
                </CardContent>
              </Card>

              {/* Accreditation */}
              <Card>
                <CardHeader>
                  <CardTitle className='flex items-center gap-2'>
                    <CheckCircle className='h-5 w-5 text-orange-600' />
                    Accreditation
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className='space-y-2'>
                    {isEditing ? (
                      <Textarea
                        value={profileData.accreditation}
                        onChange={(e) =>
                          setProfileData((prev) => ({
                            ...prev,
                            accreditation: e.target.value,
                          }))
                        }
                        placeholder='Enter accreditations separated by commas'
                        rows={3}
                      />
                    ) : (
                      profileData.accreditation
                        .split(', ')
                        .map((accred, index) => (
                          <Badge key={index} variant='outline' className='mr-2'>
                            {accred}
                          </Badge>
                        ))
                    )}
                  </div>
                </CardContent>
              </Card>

              {/* Settings */}
              <Card>
                <CardHeader>
                  <CardTitle className='flex items-center gap-2'>
                    <Settings className='h-5 w-5 text-orange-600' />
                    Profile Settings
                  </CardTitle>
                </CardHeader>
                <CardContent className='space-y-4'>
                  <div className='flex items-center justify-between'>
                    <span className='text-sm'>Profile Visibility</span>
                    <Badge className='bg-green-100 text-green-700'>
                      Public
                    </Badge>
                  </div>
                  <div className='flex items-center justify-between'>
                    <span className='text-sm'>Program Listings</span>
                    <Badge className='bg-green-100 text-green-700'>
                      Active
                    </Badge>
                  </div>
                  <div className='flex items-center justify-between'>
                    <span className='text-sm'>Contact Information</span>
                    <Badge variant='secondary'>Public</Badge>
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
        </div>
      </div>

      {/* Settings Modal */}
      <SettingsModal open={settingsOpen} onOpenChange={setSettingsOpen} />
    </div>
  );
};

export default UniversityProfile;
