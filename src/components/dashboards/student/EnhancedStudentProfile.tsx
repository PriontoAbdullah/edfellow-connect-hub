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
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
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
  Share2,
  Download,
  Upload,
  Eye,
  EyeOff,
  MessageCircle,
  ThumbsUp,
  Award,
  Briefcase,
  GraduationCap,
  Globe,
  Phone,
  Linkedin,
  Twitter,
  Github,
  ExternalLink,
  Copy,
  Check,
  Heart,
  MessageSquare,
  Send,
  MoreHorizontal,
  Flag,
} from 'lucide-react';
import { CountryFlag } from '@/components/ui/CountryFlag';
import CountrySelect from '@/components/ui/CountrySelect';
import { getCountryCode } from '@/lib/countries';
import { useToast } from '@/hooks/use-toast';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Separator } from '@/components/ui/separator';
import { Progress } from '@/components/ui/progress';

interface Review {
  id: string;
  reviewer: {
    name: string;
    role: string;
    avatar: string;
  };
  rating: number;
  comment: string;
  date: string;
  helpful: number;
}

interface CV {
  id: string;
  name: string;
  url: string;
  uploadedAt: string;
  isPublic: boolean;
}

const EnhancedStudentProfile = () => {
  const { toast } = useToast();

  // Scroll to top on component mount
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);

  const [isEditing, setIsEditing] = useState(false);
  const [settingsOpen, setSettingsOpen] = useState(false);
  const [isPublicView, setIsPublicView] = useState(false);
  const [shareModalOpen, setShareModalOpen] = useState(false);
  const [copied, setCopied] = useState(false);
  const [showContactInfo, setShowContactInfo] = useState(false);

  const [profileData, setProfileData] = useState({
    name: 'John Doe',
    email: 'john.doe@email.com',
    phone: '+1 (555) 123-4567',
    major: 'Computer Science',
    university: 'University of California, Berkeley',
    country: 'United States',
    city: 'Berkeley, CA',
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
    graduationDate: 'May 2025',
    linkedin: 'linkedin.com/in/johndoe',
    github: 'github.com/johndoe',
    website: 'johndoe.dev',
    isProfilePublic: true,
    showContactInfo: false,
  });

  const [achievements, setAchievements] = useState([
    {
      title: "Dean's List",
      date: 'Fall 2023',
      description: 'Academic Excellence Award',
      type: 'academic',
    },
    {
      title: 'Hackathon Winner',
      date: 'Oct 2023',
      description: 'First place in AI/ML category',
      type: 'competition',
    },
    {
      title: 'Research Assistant',
      date: 'Sep 2023',
      description: 'Computer Vision Lab',
      type: 'research',
    },
    {
      title: 'Scholarship Recipient',
      date: 'Aug 2023',
      description: 'Merit-based scholarship',
      type: 'academic',
    },
  ]);

  const [experience, setExperience] = useState([
    {
      title: 'Software Engineering Intern',
      company: 'Google',
      duration: 'Jun 2023 - Aug 2023',
      description: 'Developed machine learning models for search optimization',
      type: 'internship',
    },
    {
      title: 'Research Assistant',
      company: 'UC Berkeley AI Lab',
      duration: 'Jan 2023 - Present',
      description: 'Working on computer vision projects',
      type: 'research',
    },
  ]);

  const [projects, setProjects] = useState([
    {
      title: 'AI Chatbot',
      description: 'Built a conversational AI using Python and TensorFlow',
      technologies: ['Python', 'TensorFlow', 'NLP'],
      github: 'github.com/johndoe/ai-chatbot',
      live: 'ai-chatbot.johndoe.dev',
    },
    {
      title: 'Data Visualization Dashboard',
      description: 'Interactive dashboard for COVID-19 data analysis',
      technologies: ['React', 'D3.js', 'Node.js'],
      github: 'github.com/johndoe/covid-dashboard',
      live: 'covid-dashboard.johndoe.dev',
    },
  ]);

  const [reviews, setReviews] = useState<Review[]>([
    {
      id: '1',
      reviewer: {
        name: 'Dr. Sarah Johnson',
        role: 'Professor',
        avatar: '',
      },
      rating: 5,
      comment:
        'Excellent student with strong analytical skills and great work ethic. Highly recommend for research opportunities.',
      date: '2024-01-15',
      helpful: 12,
    },
    {
      id: '2',
      reviewer: {
        name: 'Mike Chen',
        role: 'Senior Developer',
        avatar: '',
      },
      rating: 4,
      comment:
        'Great team player and quick learner. Contributed significantly to our project.',
      date: '2024-01-10',
      helpful: 8,
    },
  ]);

  const [cvs, setCvs] = useState<CV[]>([
    {
      id: '1',
      name: 'John_Doe_Resume_2024.pdf',
      url: '/uploads/cv/john_doe_resume.pdf',
      uploadedAt: '2024-01-20',
      isPublic: true,
    },
  ]);

  const [newInterest, setNewInterest] = useState('');
  const [newLanguage, setNewLanguage] = useState('');
  const [newAchievement, setNewAchievement] = useState({
    title: '',
    date: '',
    description: '',
    type: 'academic',
  });
  const [newExperience, setNewExperience] = useState({
    title: '',
    company: '',
    duration: '',
    description: '',
    type: 'internship',
  });
  const [newProject, setNewProject] = useState({
    title: '',
    description: '',
    technologies: '',
    github: '',
    live: '',
  });

  const handleSave = () => {
    setIsEditing(false);
    toast({
      title: 'Profile Updated',
      description: 'Your profile has been successfully updated.',
    });
  };

  const handleCancel = () => {
    setIsEditing(false);
  };

  const handleShareProfile = () => {
    const profileUrl = `${
      window.location.origin
    }/profile/public/${profileData.name.toLowerCase().replace(/\s+/g, '-')}`;
    navigator.clipboard.writeText(profileUrl);
    setCopied(true);
    toast({
      title: 'Link Copied',
      description: 'Profile link has been copied to clipboard.',
    });
    setTimeout(() => setCopied(false), 2000);
  };

  const handleUploadCV = () => {
    // Simulate file upload
    const newCV: CV = {
      id: Date.now().toString(),
      name: 'New_CV.pdf',
      url: '/uploads/cv/new_cv.pdf',
      uploadedAt: new Date().toISOString().split('T')[0],
      isPublic: false,
    };
    setCvs([...cvs, newCV]);
    toast({
      title: 'CV Uploaded',
      description: 'Your CV has been successfully uploaded.',
    });
  };

  const handleDownloadCV = (cv: CV) => {
    // Simulate download
    toast({
      title: 'Download Started',
      description: `Downloading ${cv.name}...`,
    });
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
      setNewAchievement({
        title: '',
        date: '',
        description: '',
        type: 'academic',
      });
    }
  };

  const removeAchievement = (index: number) => {
    setAchievements((prev) => prev.filter((_, i) => i !== index));
  };

  const addExperience = () => {
    if (newExperience.title.trim() && newExperience.company.trim()) {
      setExperience((prev) => [...prev, { ...newExperience }]);
      setNewExperience({
        title: '',
        company: '',
        duration: '',
        description: '',
        type: 'internship',
      });
    }
  };

  const removeExperience = (index: number) => {
    setExperience((prev) => prev.filter((_, i) => i !== index));
  };

  const addProject = () => {
    if (newProject.title.trim() && newProject.description.trim()) {
      const project = {
        ...newProject,
        technologies: newProject.technologies.split(',').map((t) => t.trim()),
      };
      setProjects((prev) => [...prev, project]);
      setNewProject({
        title: '',
        description: '',
        technologies: '',
        github: '',
        live: '',
      });
    }
  };

  const removeProject = (index: number) => {
    setProjects((prev) => prev.filter((_, i) => i !== index));
  };

  const getAchievementIcon = (type: string) => {
    switch (type) {
      case 'academic':
        return <GraduationCap className='h-4 w-4' />;
      case 'competition':
        return <Award className='h-4 w-4' />;
      case 'research':
        return <BookOpen className='h-4 w-4' />;
      default:
        return <Star className='h-4 w-4' />;
    }
  };

  const getExperienceIcon = (type: string) => {
    switch (type) {
      case 'internship':
        return <Briefcase className='h-4 w-4' />;
      case 'research':
        return <BookOpen className='h-4 w-4' />;
      case 'volunteer':
        return <Heart className='h-4 w-4' />;
      default:
        return <Briefcase className='h-4 w-4' />;
    }
  };

  const averageRating =
    reviews.length > 0
      ? reviews.reduce((acc, review) => acc + review.rating, 0) / reviews.length
      : 0;

  return (
    <div className='p-6 space-y-6'>
      <Breadcrumb
        items={[
          { label: 'Dashboard', href: '/dashboard' },
          { label: 'My Profile' },
        ]}
      />

      {/* Profile Header */}
      <div className='bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg p-6 text-white'>
        <div className='flex justify-between items-start'>
          <div className='flex items-center space-x-4'>
            <Avatar className='h-24 w-24 border-4 border-white'>
              <AvatarImage src='/placeholder-avatar.jpg' />
              <AvatarFallback className='bg-white text-blue-600 text-2xl'>
                {profileData.name
                  .split(' ')
                  .map((n) => n[0])
                  .join('')}
              </AvatarFallback>
            </Avatar>
            <div>
              <h1 className='text-3xl font-bold flex items-center gap-2'>
                {profileData.name}
                <CountryFlag
                  code={getCountryCode(profileData.country)}
                  size={24}
                />
              </h1>
              <p className='text-xl opacity-90'>{profileData.major} Student</p>
              <p className='text-lg opacity-80'>{profileData.university}</p>
              <div className='flex items-center gap-4 mt-2'>
                <div className='flex items-center gap-1'>
                  <Star className='h-4 w-4 text-yellow-300' />
                  <span>{averageRating.toFixed(1)}</span>
                  <span className='text-sm opacity-80'>
                    ({reviews.length} reviews)
                  </span>
                </div>
                <Badge variant='secondary' className='bg-white/20 text-white'>
                  {profileData.academicYear}
                </Badge>
              </div>
            </div>
          </div>
          <div className='flex gap-2'>
            {!isPublicView && (
              <>
                <Button
                  variant='outline'
                  className='border-white text-white hover:bg-white/10'
                  onClick={() => setShareModalOpen(true)}
                >
                  <Share2 className='h-4 w-4 mr-2' />
                  Share Profile
                </Button>
                <Button
                  variant='outline'
                  className='border-white text-white hover:bg-white/10'
                  onClick={() => setIsEditing(true)}
                >
                  <Edit className='h-4 w-4 mr-2' />
                  Edit Profile
                </Button>
              </>
            )}
          </div>
        </div>
      </div>

      <div className='grid lg:grid-cols-3 gap-6'>
        {/* Main Content */}
        <div className='lg:col-span-2 space-y-6'>
          {/* About Section */}
          <Card>
            <CardHeader>
              <CardTitle className='flex items-center gap-2'>
                <User className='h-5 w-5 text-blue-600' />
                About
              </CardTitle>
            </CardHeader>
            <CardContent className='space-y-4'>
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

              {/* Contact Information */}
              {showContactInfo && (
                <div className='grid md:grid-cols-2 gap-4 pt-4 border-t'>
                  <div className='flex items-center gap-2'>
                    <Mail className='h-4 w-4 text-gray-500' />
                    <span className='text-sm'>{profileData.email}</span>
                  </div>
                  <div className='flex items-center gap-2'>
                    <Phone className='h-4 w-4 text-gray-500' />
                    <span className='text-sm'>{profileData.phone}</span>
                  </div>
                  <div className='flex items-center gap-2'>
                    <MapPin className='h-4 w-4 text-gray-500' />
                    <span className='text-sm'>
                      {profileData.city}, {profileData.country}
                    </span>
                  </div>
                  {profileData.linkedin && (
                    <div className='flex items-center gap-2'>
                      <Linkedin className='h-4 w-4 text-blue-600' />
                      <a
                        href={`https://${profileData.linkedin}`}
                        target='_blank'
                        rel='noopener noreferrer'
                        className='text-sm text-blue-600 hover:underline'
                      >
                        LinkedIn
                      </a>
                    </div>
                  )}
                  {profileData.github && (
                    <div className='flex items-center gap-2'>
                      <Github className='h-4 w-4 text-gray-800' />
                      <a
                        href={`https://${profileData.github}`}
                        target='_blank'
                        rel='noopener noreferrer'
                        className='text-sm text-gray-600 hover:underline'
                      >
                        GitHub
                      </a>
                    </div>
                  )}
                  {profileData.website && (
                    <div className='flex items-center gap-2'>
                      <Globe className='h-4 w-4 text-green-600' />
                      <a
                        href={`https://${profileData.website}`}
                        target='_blank'
                        rel='noopener noreferrer'
                        className='text-sm text-green-600 hover:underline'
                      >
                        Website
                      </a>
                    </div>
                  )}
                </div>
              )}

              {!showContactInfo && !isPublicView && (
                <Button
                  variant='outline'
                  size='sm'
                  onClick={() => setShowContactInfo(true)}
                >
                  <Eye className='h-4 w-4 mr-2' />
                  Show Contact Information
                </Button>
              )}
            </CardContent>
          </Card>

          {/* Experience */}
          <Card>
            <CardHeader>
              <CardTitle className='flex items-center gap-2'>
                <Briefcase className='h-5 w-5 text-green-600' />
                Experience
              </CardTitle>
            </CardHeader>
            <CardContent className='space-y-4'>
              {experience.map((exp, index) => (
                <div
                  key={index}
                  className='border-l-4 border-green-500 pl-4 relative'
                >
                  <div className='flex items-start justify-between'>
                    <div className='flex-1'>
                      <div className='flex items-center gap-2 mb-1'>
                        {getExperienceIcon(exp.type)}
                        <h4 className='font-medium text-gray-900'>
                          {isEditing ? (
                            <Input
                              value={exp.title}
                              onChange={(e) => {
                                const updated = [...experience];
                                updated[index].title = e.target.value;
                                setExperience(updated);
                              }}
                              placeholder='Position title'
                              className='mb-2'
                            />
                          ) : (
                            exp.title
                          )}
                        </h4>
                      </div>
                      <p className='text-sm text-gray-600 mb-1'>
                        {isEditing ? (
                          <Input
                            value={exp.company}
                            onChange={(e) => {
                              const updated = [...experience];
                              updated[index].company = e.target.value;
                              setExperience(updated);
                            }}
                            placeholder='Company'
                            className='mb-2'
                          />
                        ) : (
                          exp.company
                        )}
                      </p>
                      <p className='text-xs text-gray-500 mb-2'>
                        {isEditing ? (
                          <Input
                            value={exp.duration}
                            onChange={(e) => {
                              const updated = [...experience];
                              updated[index].duration = e.target.value;
                              setExperience(updated);
                            }}
                            placeholder='Duration'
                            className='w-48'
                          />
                        ) : (
                          exp.duration
                        )}
                      </p>
                      <p className='text-sm text-gray-700'>
                        {isEditing ? (
                          <Textarea
                            value={exp.description}
                            onChange={(e) => {
                              const updated = [...experience];
                              updated[index].description = e.target.value;
                              setExperience(updated);
                            }}
                            placeholder='Description'
                            rows={2}
                          />
                        ) : (
                          exp.description
                        )}
                      </p>
                    </div>
                    {isEditing && (
                      <Button
                        size='sm'
                        variant='ghost'
                        onClick={() => removeExperience(index)}
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
                    Add New Experience
                  </h4>
                  <div className='space-y-2'>
                    <Input
                      placeholder='Position title'
                      value={newExperience.title}
                      onChange={(e) =>
                        setNewExperience({
                          ...newExperience,
                          title: e.target.value,
                        })
                      }
                    />
                    <div className='grid grid-cols-2 gap-2'>
                      <Input
                        placeholder='Company'
                        value={newExperience.company}
                        onChange={(e) =>
                          setNewExperience({
                            ...newExperience,
                            company: e.target.value,
                          })
                        }
                      />
                      <Input
                        placeholder='Duration'
                        value={newExperience.duration}
                        onChange={(e) =>
                          setNewExperience({
                            ...newExperience,
                            duration: e.target.value,
                          })
                        }
                      />
                    </div>
                    <Textarea
                      placeholder='Description'
                      value={newExperience.description}
                      onChange={(e) =>
                        setNewExperience({
                          ...newExperience,
                          description: e.target.value,
                        })
                      }
                      rows={2}
                    />
                    <Button size='sm' onClick={addExperience}>
                      <Plus className='h-4 w-4 mr-1' />
                      Add Experience
                    </Button>
                  </div>
                </div>
              )}
            </CardContent>
          </Card>

          {/* Projects */}
          <Card>
            <CardHeader>
              <CardTitle className='flex items-center gap-2'>
                <BookOpen className='h-5 w-5 text-purple-600' />
                Projects
              </CardTitle>
            </CardHeader>
            <CardContent className='space-y-4'>
              {projects.map((project, index) => (
                <div key={index} className='border rounded-lg p-4'>
                  <div className='flex items-start justify-between mb-2'>
                    <h4 className='font-medium text-gray-900'>
                      {isEditing ? (
                        <Input
                          value={project.title}
                          onChange={(e) => {
                            const updated = [...projects];
                            updated[index].title = e.target.value;
                            setProjects(updated);
                          }}
                          placeholder='Project title'
                        />
                      ) : (
                        project.title
                      )}
                    </h4>
                    {isEditing && (
                      <Button
                        size='sm'
                        variant='ghost'
                        onClick={() => removeProject(index)}
                      >
                        <Trash2 className='h-4 w-4 text-red-600' />
                      </Button>
                    )}
                  </div>
                  <p className='text-sm text-gray-600 mb-3'>
                    {isEditing ? (
                      <Textarea
                        value={project.description}
                        onChange={(e) => {
                          const updated = [...projects];
                          updated[index].description = e.target.value;
                          setProjects(updated);
                        }}
                        placeholder='Project description'
                        rows={2}
                      />
                    ) : (
                      project.description
                    )}
                  </p>
                  <div className='flex flex-wrap gap-2 mb-3'>
                    {Array.isArray(project.technologies)
                      ? project.technologies.map((tech, techIndex) => (
                          <Badge
                            key={techIndex}
                            variant='outline'
                            className='text-xs'
                          >
                            {tech}
                          </Badge>
                        ))
                      : null}
                  </div>
                  <div className='flex gap-2'>
                    {project.github && (
                      <Button size='sm' variant='outline' asChild>
                        <a
                          href={project.github}
                          target='_blank'
                          rel='noopener noreferrer'
                        >
                          <Github className='h-4 w-4 mr-1' />
                          Code
                        </a>
                      </Button>
                    )}
                    {project.live && (
                      <Button size='sm' variant='outline' asChild>
                        <a
                          href={project.live}
                          target='_blank'
                          rel='noopener noreferrer'
                        >
                          <ExternalLink className='h-4 w-4 mr-1' />
                          Live Demo
                        </a>
                      </Button>
                    )}
                  </div>
                </div>
              ))}

              {isEditing && (
                <div className='border-2 border-dashed border-gray-300 p-4 rounded-lg'>
                  <h4 className='font-medium text-gray-700 mb-2'>
                    Add New Project
                  </h4>
                  <div className='space-y-2'>
                    <Input
                      placeholder='Project title'
                      value={newProject.title}
                      onChange={(e) =>
                        setNewProject({ ...newProject, title: e.target.value })
                      }
                    />
                    <Textarea
                      placeholder='Project description'
                      value={newProject.description}
                      onChange={(e) =>
                        setNewProject({
                          ...newProject,
                          description: e.target.value,
                        })
                      }
                      rows={2}
                    />
                    <Input
                      placeholder='Technologies (comma-separated)'
                      value={newProject.technologies}
                      onChange={(e) =>
                        setNewProject({
                          ...newProject,
                          technologies: e.target.value,
                        })
                      }
                    />
                    <div className='grid grid-cols-2 gap-2'>
                      <Input
                        placeholder='GitHub URL'
                        value={newProject.github}
                        onChange={(e) =>
                          setNewProject({
                            ...newProject,
                            github: e.target.value,
                          })
                        }
                      />
                      <Input
                        placeholder='Live Demo URL'
                        value={newProject.live}
                        onChange={(e) =>
                          setNewProject({ ...newProject, live: e.target.value })
                        }
                      />
                    </div>
                    <Button size='sm' onClick={addProject}>
                      <Plus className='h-4 w-4 mr-1' />
                      Add Project
                    </Button>
                  </div>
                </div>
              )}
            </CardContent>
          </Card>

          {/* Achievements */}
          <Card>
            <CardHeader>
              <CardTitle className='flex items-center gap-2'>
                <Award className='h-5 w-5 text-yellow-500' />
                Achievements
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className='space-y-4'>
                {achievements.map((achievement, index) => (
                  <div
                    key={index}
                    className='border-l-4 border-yellow-500 pl-4 relative'
                  >
                    <div className='flex items-center justify-between'>
                      <div className='flex items-center gap-2'>
                        {getAchievementIcon(achievement.type)}
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
                      </div>
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
                          setNewAchievement({
                            ...newAchievement,
                            title: e.target.value,
                          })
                        }
                      />
                      <div className='grid grid-cols-2 gap-2'>
                        <Input
                          placeholder='Date'
                          value={newAchievement.date}
                          onChange={(e) =>
                            setNewAchievement({
                              ...newAchievement,
                              date: e.target.value,
                            })
                          }
                        />
                        <Input
                          placeholder='Description'
                          value={newAchievement.description}
                          onChange={(e) =>
                            setNewAchievement({
                              ...newAchievement,
                              description: e.target.value,
                            })
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

          {/* Reviews */}
          <Card>
            <CardHeader>
              <CardTitle className='flex items-center gap-2'>
                <MessageCircle className='h-5 w-5 text-blue-600' />
                Reviews & Recommendations
              </CardTitle>
            </CardHeader>
            <CardContent className='space-y-4'>
              {reviews.map((review) => (
                <div key={review.id} className='border rounded-lg p-4'>
                  <div className='flex items-start justify-between mb-3'>
                    <div className='flex items-center gap-3'>
                      <Avatar className='h-10 w-10'>
                        <AvatarFallback className='bg-blue-100 text-blue-600'>
                          {review.reviewer.name
                            .split(' ')
                            .map((n) => n[0])
                            .join('')}
                        </AvatarFallback>
                      </Avatar>
                      <div>
                        <h4 className='font-medium text-gray-900'>
                          {review.reviewer.name}
                        </h4>
                        <p className='text-sm text-gray-600'>
                          {review.reviewer.role}
                        </p>
                      </div>
                    </div>
                    <div className='flex items-center gap-1'>
                      {[...Array(5)].map((_, i) => (
                        <Star
                          key={i}
                          className={`h-4 w-4 ${
                            i < review.rating
                              ? 'text-yellow-500 fill-current'
                              : 'text-gray-300'
                          }`}
                        />
                      ))}
                    </div>
                  </div>
                  <p className='text-gray-700 mb-3'>{review.comment}</p>
                  <div className='flex items-center justify-between text-sm text-gray-500'>
                    <span>{new Date(review.date).toLocaleDateString()}</span>
                    <div className='flex items-center gap-4'>
                      <button className='flex items-center gap-1 hover:text-blue-600'>
                        <ThumbsUp className='h-4 w-4' />
                        <span>Helpful ({review.helpful})</span>
                      </button>
                      <button className='flex items-center gap-1 hover:text-blue-600'>
                        <MessageSquare className='h-4 w-4' />
                        <span>Reply</span>
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>
        </div>

        {/* Sidebar */}
        <div className='space-y-6'>
          {/* Academic Information */}
          <Card>
            <CardHeader>
              <CardTitle className='flex items-center gap-2'>
                <GraduationCap className='h-5 w-5 text-blue-600' />
                Academic Info
              </CardTitle>
            </CardHeader>
            <CardContent className='space-y-4'>
              <div className='grid grid-cols-2 gap-4 text-center'>
                <div>
                  <div className='text-2xl font-bold text-blue-600'>
                    {isEditing ? (
                      <Input
                        value={profileData.gpa}
                        onChange={(e) =>
                          setProfileData({
                            ...profileData,
                            gpa: e.target.value,
                          })
                        }
                        className='text-center'
                      />
                    ) : (
                      profileData.gpa
                    )}
                  </div>
                  <div className='text-sm text-gray-600'>GPA</div>
                </div>
                <div>
                  <div className='text-lg font-semibold text-gray-900'>
                    {isEditing ? (
                      <Input
                        value={profileData.academicYear}
                        onChange={(e) =>
                          setProfileData({
                            ...profileData,
                            academicYear: e.target.value,
                          })
                        }
                        className='text-center'
                      />
                    ) : (
                      profileData.academicYear
                    )}
                  </div>
                  <div className='text-xs text-gray-600'>Year</div>
                </div>
              </div>
              <div className='text-center'>
                <div className='text-lg font-semibold text-gray-900'>
                  {isEditing ? (
                    <Input
                      value={profileData.graduationDate}
                      onChange={(e) =>
                        setProfileData({
                          ...profileData,
                          graduationDate: e.target.value,
                        })
                      }
                      className='text-center'
                    />
                  ) : (
                    profileData.graduationDate
                  )}
                </div>
                <div className='text-xs text-gray-600'>Expected Graduation</div>
              </div>
            </CardContent>
          </Card>

          {/* Skills & Languages */}
          <Card>
            <CardHeader>
              <CardTitle>Skills & Languages</CardTitle>
            </CardHeader>
            <CardContent className='space-y-4'>
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

          {/* CV Management */}
          <Card>
            <CardHeader>
              <CardTitle className='flex items-center gap-2'>
                <Briefcase className='h-5 w-5 text-green-600' />
                CV & Documents
              </CardTitle>
            </CardHeader>
            <CardContent className='space-y-4'>
              {cvs.map((cv) => (
                <div
                  key={cv.id}
                  className='flex items-center justify-between p-3 bg-gray-50 rounded-lg'
                >
                  <div className='flex items-center gap-2'>
                    <Download className='h-4 w-4 text-gray-500' />
                    <div>
                      <p className='text-sm font-medium'>{cv.name}</p>
                      <p className='text-xs text-gray-500'>
                        Uploaded {cv.uploadedAt}
                      </p>
                    </div>
                  </div>
                  <div className='flex gap-1'>
                    <Button
                      size='sm'
                      variant='outline'
                      onClick={() => handleDownloadCV(cv)}
                    >
                      <Download className='h-3 w-3' />
                    </Button>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button size='sm' variant='outline'>
                          <MoreHorizontal className='h-3 w-3' />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent>
                        <DropdownMenuItem>
                          <Eye className='h-4 w-4 mr-2' />
                          Preview
                        </DropdownMenuItem>
                        <DropdownMenuItem>
                          <Share2 className='h-4 w-4 mr-2' />
                          Share
                        </DropdownMenuItem>
                        <DropdownMenuItem className='text-red-600'>
                          <Trash2 className='h-4 w-4 mr-2' />
                          Delete
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </div>
                </div>
              ))}
              <Button
                size='sm'
                variant='outline'
                className='w-full'
                onClick={handleUploadCV}
              >
                <Upload className='h-4 w-4 mr-2' />
                Upload CV
              </Button>
            </CardContent>
          </Card>

          {/* Profile Stats */}
          <Card>
            <CardHeader>
              <CardTitle>Profile Stats</CardTitle>
            </CardHeader>
            <CardContent className='space-y-4'>
              <div className='text-center'>
                <div className='text-2xl font-bold text-blue-600'>85%</div>
                <div className='text-sm text-gray-600'>Profile Complete</div>
                <Progress value={85} className='mt-2' />
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
        </div>
      </div>

      {/* Edit Actions */}
      {isEditing && (
        <div className='fixed bottom-6 right-6 flex gap-2'>
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
        </div>
      )}

      {/* Share Profile Modal */}
      <Dialog open={shareModalOpen} onOpenChange={setShareModalOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Share Your Profile</DialogTitle>
            <DialogDescription>
              Share your profile link with others to connect and network.
            </DialogDescription>
          </DialogHeader>
          <div className='space-y-4'>
            <div className='flex items-center gap-2 p-3 bg-gray-50 rounded-lg'>
              <Input
                value={`${
                  window.location.origin
                }/profile/public/${profileData.name
                  .toLowerCase()
                  .replace(/\s+/g, '-')}`}
                readOnly
                className='flex-1'
              />
              <Button
                size='sm'
                onClick={handleShareProfile}
                className={copied ? 'bg-green-600' : ''}
              >
                {copied ? (
                  <Check className='h-4 w-4' />
                ) : (
                  <Copy className='h-4 w-4' />
                )}
              </Button>
            </div>
            <div className='flex gap-2'>
              <Button variant='outline' className='flex-1'>
                <Linkedin className='h-4 w-4 mr-2' />
                LinkedIn
              </Button>
              <Button variant='outline' className='flex-1'>
                <Twitter className='h-4 w-4 mr-2' />
                Twitter
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      {/* Settings Modal */}
      <SettingsModal open={settingsOpen} onOpenChange={setSettingsOpen} />
    </div>
  );
};

export default EnhancedStudentProfile;
