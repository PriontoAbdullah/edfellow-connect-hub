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
  FileText,
  BookOpenCheck,
  School,
  Clock,
  MapPin as MapPinIcon,
} from 'lucide-react';
import { CountryFlag } from '@/components/ui/CountryFlag';
import CountrySelect from '@/components/ui/CountrySelect';
import { getCountryCode } from '@/lib/countries';
import { useToast } from '@/hooks/use-toast';
import { useDocumentUpload } from '@/hooks/useFileUpload';
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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

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
  type: 'resume' | 'cover-letter' | 'portfolio' | 'transcript' | 'certificate';
}

interface Education {
  id: string;
  degree: string;
  institution: string;
  field: string;
  startDate: string;
  endDate: string;
  gpa: string;
  location: string;
  description: string;
  isCurrent: boolean;
}

interface Certification {
  id: string;
  name: string;
  issuer: string;
  issueDate: string;
  expiryDate?: string;
  credentialId: string;
  url?: string;
  description: string;
  isVerified: boolean;
}

interface Publication {
  id: string;
  title: string;
  authors: string[];
  journal: string;
  publicationDate: string;
  doi?: string;
  url?: string;
  abstract: string;
  citations: number;
  type: 'journal' | 'conference' | 'book-chapter' | 'preprint';
}

const StudentProfile = () => {
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
    skills: [
      'Python',
      'JavaScript',
      'React',
      'TensorFlow',
      'SQL',
      'Git',
      'Docker',
      'AWS',
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

  const [education, setEducation] = useState<Education[]>([
    {
      id: '1',
      degree: 'Bachelor of Science',
      institution: 'University of California, Berkeley',
      field: 'Computer Science',
      startDate: '2021-08',
      endDate: '2025-05',
      gpa: '3.8/4.0',
      location: 'Berkeley, CA',
      description:
        "Focus on artificial intelligence and machine learning. Dean's List recipient.",
      isCurrent: true,
    },
    {
      id: '2',
      degree: 'High School Diploma',
      institution: 'Berkeley High School',
      field: 'General Studies',
      startDate: '2017-09',
      endDate: '2021-06',
      gpa: '4.0/4.0',
      location: 'Berkeley, CA',
      description: 'Valedictorian, National Merit Scholar',
      isCurrent: false,
    },
  ]);

  const [certifications, setCertifications] = useState<Certification[]>([
    {
      id: '1',
      name: 'AWS Certified Solutions Architect',
      issuer: 'Amazon Web Services',
      issueDate: '2023-12-15',
      expiryDate: '2026-12-15',
      credentialId: 'AWS-123456789',
      url: 'https://aws.amazon.com/verification',
      description: 'Cloud architecture and design certification',
      isVerified: true,
    },
    {
      id: '2',
      name: 'Google Cloud Professional Data Engineer',
      issuer: 'Google Cloud',
      issueDate: '2023-08-20',
      credentialId: 'GCP-DE-987654321',
      description: 'Data engineering and analytics certification',
      isVerified: true,
    },
  ]);

  const [publications, setPublications] = useState<Publication[]>([
    {
      id: '1',
      title: 'Deep Learning Approaches for Natural Language Processing',
      authors: ['John Doe', 'Dr. Sarah Johnson'],
      journal: 'Journal of Machine Learning Research',
      publicationDate: '2024-01-15',
      doi: '10.1234/jmlr.2024.001',
      url: 'https://jmlr.org/papers/v25/24-001.html',
      abstract:
        'This paper presents novel approaches to NLP using deep learning techniques...',
      citations: 15,
      type: 'journal',
    },
    {
      id: '2',
      title: 'Computer Vision Applications in Healthcare',
      authors: ['John Doe', 'Mike Chen', 'Dr. Emily Brown'],
      journal: 'IEEE Conference on Computer Vision and Pattern Recognition',
      publicationDate: '2023-06-20',
      doi: '10.1109/CVPR.2023.12345',
      abstract: 'Exploring the use of computer vision in medical imaging...',
      citations: 8,
      type: 'conference',
    },
  ]);

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
      type: 'resume',
    },
    {
      id: '2',
      name: 'John_Doe_Cover_Letter.pdf',
      url: '/uploads/cv/john_doe_cover_letter.pdf',
      uploadedAt: '2024-01-20',
      isPublic: false,
      type: 'cover-letter',
    },
  ]);

  const [newInterest, setNewInterest] = useState('');
  const [newLanguage, setNewLanguage] = useState('');
  const [newSkill, setNewSkill] = useState('');
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
  const [newEducation, setNewEducation] = useState({
    degree: '',
    institution: '',
    field: '',
    startDate: '',
    endDate: '',
    gpa: '',
    location: '',
    description: '',
    isCurrent: false,
  });
  const [newCertification, setNewCertification] = useState({
    name: '',
    issuer: '',
    issueDate: '',
    expiryDate: '',
    credentialId: '',
    url: '',
    description: '',
  });
  const [newPublication, setNewPublication] = useState({
    title: '',
    authors: '',
    journal: '',
    publicationDate: '',
    doi: '',
    url: '',
    abstract: '',
    type: 'journal',
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

  const { uploadDocument, uploading: uploadingDoc } = useDocumentUpload();

  const handleUploadCV = async (
    file?: File,
    type: CV['type'] = 'resume',
    isPublic = false
  ) => {
    try {
      if (!file) return;
      const { data, error } = await uploadDocument(file, 'cv');
      if (error || !data) {
        toast({
          title: 'Upload failed',
          description: error || 'Please try again',
          variant: 'destructive',
        });
        return;
      }
      const newCV: CV = {
        id: Date.now().toString(),
        name: file.name,
        url: data.url,
        uploadedAt: new Date().toISOString().split('T')[0],
        isPublic,
        type,
      };
      setCvs((prev) => [...prev, newCV]);
      toast({
        title: 'CV Uploaded',
        description: 'Your document has been uploaded.',
      });
    } catch (e) {
      toast({
        title: 'Upload failed',
        description: 'Unexpected error',
        variant: 'destructive',
      });
    }
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

  const addSkill = () => {
    if (newSkill.trim()) {
      setProfileData((prev) => ({
        ...prev,
        skills: [...prev.skills, newSkill.trim()],
      }));
      setNewSkill('');
    }
  };

  const removeSkill = (index: number) => {
    setProfileData((prev) => ({
      ...prev,
      skills: prev.skills.filter((_, i) => i !== index),
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

  const addEducation = () => {
    if (newEducation.degree.trim() && newEducation.institution.trim()) {
      setEducation((prev) => [
        ...prev,
        { ...newEducation, id: Date.now().toString() },
      ]);
      setNewEducation({
        degree: '',
        institution: '',
        field: '',
        startDate: '',
        endDate: '',
        gpa: '',
        location: '',
        description: '',
        isCurrent: false,
      });
    }
  };

  const removeEducation = (id: string) => {
    setEducation((prev) => prev.filter((edu) => edu.id !== id));
  };

  const addCertification = () => {
    if (newCertification.name.trim() && newCertification.issueDate.trim()) {
      setCertifications((prev) => [
        ...prev,
        {
          ...newCertification,
          id: Date.now().toString(),
          isVerified: false,
        },
      ]);
      setNewCertification({
        name: '',
        issuer: '',
        issueDate: '',
        expiryDate: '',
        credentialId: '',
        url: '',
        description: '',
      });
    }
  };

  const removeCertification = (id: string) => {
    setCertifications((prev) => prev.filter((cert) => cert.id !== id));
  };

  const addPublication = () => {
    if (newPublication.title.trim() && newPublication.authors.trim()) {
      setPublications((prev) => [
        ...prev,
        {
          ...newPublication,
          id: Date.now().toString(),
          authors: newPublication.authors.split(',').map((a) => a.trim()),
          citations: 0,
          type: newPublication.type as
            | 'journal'
            | 'conference'
            | 'book-chapter'
            | 'preprint',
        },
      ]);
      setNewPublication({
        title: '',
        authors: '',
        journal: '',
        publicationDate: '',
        doi: '',
        url: '',
        abstract: '',
        type: 'journal',
      });
    }
  };

  const removePublication = (id: string) => {
    setPublications((prev) => prev.filter((pub) => pub.id !== id));
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
    <div className='min-h-screen bg-gray-50 w-full'>
      <div className='px-6 pt-4'>
        <Breadcrumb
          items={[
            { label: 'Dashboard', href: '/dashboard' },
            { label: 'My Profile' },
          ]}
        />
      </div>

      {/* LinkedIn-style Profile Header */}
      <div className='bg-white border-b border-gray-200 w-full'>
        {/* Cover Photo Area */}
        <div className='h-48 bg-gradient-to-r from-blue-600 via-purple-600 to-blue-800 relative w-full'>
          <div className='absolute inset-0 bg-black/10'></div>
          <div className='absolute bottom-0 left-0 right-0 p-6'>
            <div className='max-w-7xl mx-auto'>
              <div className='flex items-end space-x-6'>
                {/* Profile Avatar */}
                <div className='relative'>
                  <Avatar className='h-32 w-32 border-4 border-white shadow-lg'>
                    <AvatarImage src='/placeholder-avatar.jpg' />
                    <AvatarFallback className='bg-white text-blue-600 text-3xl font-bold'>
                      {profileData.name
                        .split(' ')
                        .map((n) => n[0])
                        .join('')}
                    </AvatarFallback>
                  </Avatar>
                  {!isPublicView && (
                    <Button
                      size='sm'
                      className='absolute -bottom-2 -right-2 h-8 w-8 rounded-full bg-white border-2 border-gray-200 hover:bg-gray-50'
                      onClick={() => setIsEditing(true)}
                    >
                      <Edit className='h-4 w-4 text-gray-600' />
                    </Button>
                  )}
                </div>

                {/* Profile Info */}
                <div className='flex-1 text-white'>
                  <h1 className='text-3xl font-bold mb-1'>
                    {profileData.name}
                    <CountryFlag
                      code={getCountryCode(profileData.country)}
                      size={24}
                      className='ml-2 inline-block'
                    />
                  </h1>
                  <p className='text-xl opacity-95 mb-1'>
                    {profileData.major} Student
                  </p>
                  <p className='text-lg opacity-90 mb-2'>
                    {profileData.university}
                  </p>
                  <div className='flex items-center gap-4 text-sm opacity-85'>
                    <div className='flex items-center gap-1'>
                      <MapPin className='h-4 w-4' />
                      <span>
                        {profileData.city}, {profileData.country}
                      </span>
                    </div>
                    <div className='flex items-center gap-1'>
                      <Star className='h-4 w-4 text-yellow-300' />
                      <span>
                        {averageRating.toFixed(1)} ({reviews.length} reviews)
                      </span>
                    </div>
                    <Badge
                      variant='secondary'
                      className='bg-white/20 text-white border-white/30'
                    >
                      {profileData.academicYear}
                    </Badge>
                  </div>
                </div>

                {/* Action Buttons */}
                <div className='flex gap-2'>
                  <Button
                    variant='outline'
                    className='bg-white/10 border-white/30 text-white hover:bg-white/20 hover:border-white/50'
                    onClick={() => setIsPublicView(!isPublicView)}
                  >
                    {isPublicView ? (
                      <>
                        <EyeOff className='h-4 w-4 mr-2' />
                        Private View
                      </>
                    ) : (
                      <>
                        <Eye className='h-4 w-4 mr-2' />
                        Public View
                      </>
                    )}
                  </Button>
                  {!isPublicView && (
                    <>
                      <Button
                        variant='outline'
                        className='bg-white/10 border-white/30 text-white hover:bg-white/20 hover:border-white/50'
                        onClick={() => setShareModalOpen(true)}
                      >
                        <Share2 className='h-4 w-4 mr-2' />
                        Share Profile
                      </Button>
                      <Button
                        className='bg-blue-600 hover:bg-blue-700 text-white border-blue-600'
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
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className='w-full px-6 py-6'>
        <div className='grid lg:grid-cols-3 gap-6 max-w-7xl mx-auto'>
          {/* Main Content */}
          <div className='lg:col-span-2 space-y-6 w-full'>
            {/* About Section */}
            <Card className='shadow-sm border-gray-200'>
              <CardHeader className='pb-4'>
                <CardTitle className='flex items-center gap-2 text-lg font-semibold text-gray-900'>
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
                    className='border-gray-300 focus:border-blue-500 focus:ring-blue-500'
                  />
                ) : (
                  <p className='text-gray-700 leading-relaxed'>
                    {profileData.bio}
                  </p>
                )}

                {/* Contact Information */}
                {showContactInfo && (
                  <div className='grid md:grid-cols-2 gap-4 pt-4 border-t border-gray-200'>
                    <div className='flex items-center gap-2'>
                      <Mail className='h-4 w-4 text-gray-500' />
                      <span className='text-sm text-gray-700'>
                        {profileData.email}
                      </span>
                    </div>
                    <div className='flex items-center gap-2'>
                      <Phone className='h-4 w-4 text-gray-500' />
                      <span className='text-sm text-gray-700'>
                        {profileData.phone}
                      </span>
                    </div>
                    <div className='flex items-center gap-2'>
                      <MapPin className='h-4 w-4 text-gray-500' />
                      <span className='text-sm text-gray-700'>
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
                    className='border-gray-300 text-gray-700 hover:bg-gray-50'
                  >
                    <Eye className='h-4 w-4 mr-2' />
                    Show Contact Information
                  </Button>
                )}
              </CardContent>
            </Card>

            {/* Experience */}
            <Card className='shadow-sm border-gray-200'>
              <CardHeader className='pb-4'>
                <CardTitle className='flex items-center gap-2 text-lg font-semibold text-gray-900'>
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
                          <h4 className='font-semibold text-gray-900'>
                            {isEditing ? (
                              <Input
                                value={exp.title}
                                onChange={(e) => {
                                  const updated = [...experience];
                                  updated[index].title = e.target.value;
                                  setExperience(updated);
                                }}
                                placeholder='Position title'
                                className='mb-2 border-gray-300 focus:border-blue-500 focus:ring-blue-500'
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
                              className='mb-2 border-gray-300 focus:border-blue-500 focus:ring-blue-500'
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
                              className='w-48 border-gray-300 focus:border-blue-500 focus:ring-blue-500'
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
                              className='border-gray-300 focus:border-blue-500 focus:ring-blue-500'
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
                          className='text-red-600 hover:text-red-700 hover:bg-red-50'
                        >
                          <Trash2 className='h-4 w-4' />
                        </Button>
                      )}
                    </div>
                  </div>
                ))}

                {isEditing && (
                  <div className='border-2 border-dashed border-gray-300 p-4 rounded-lg bg-gray-50'>
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
                        className='border-gray-300 focus:border-blue-500 focus:ring-blue-500'
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
                          className='border-gray-300 focus:border-blue-500 focus:ring-blue-500'
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
                          className='border-gray-300 focus:border-blue-500 focus:ring-blue-500'
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
                        className='border-gray-300 focus:border-blue-500 focus:ring-blue-500'
                      />
                      <Button
                        size='sm'
                        onClick={addExperience}
                        className='bg-blue-600 hover:bg-blue-700'
                      >
                        <Plus className='h-4 w-4 mr-1' />
                        Add Experience
                      </Button>
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>

            {/* Projects */}
            <Card className='shadow-sm border-gray-200'>
              <CardHeader className='pb-4'>
                <CardTitle className='flex items-center gap-2 text-lg font-semibold text-gray-900'>
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
                          className='text-red-600 hover:text-red-700 hover:bg-red-50'
                        >
                          <Trash2 className='h-4 w-4' />
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
                          setNewProject({
                            ...newProject,
                            title: e.target.value,
                          })
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
                            setNewProject({
                              ...newProject,
                              live: e.target.value,
                            })
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
            <Card className='shadow-sm border-gray-200'>
              <CardHeader className='pb-4'>
                <CardTitle className='flex items-center gap-2 text-lg font-semibold text-gray-900'>
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
                          <h4 className='font-semibold text-gray-900'>
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
                              className='text-red-600 hover:text-red-700 hover:bg-red-50'
                            >
                              <Trash2 className='h-4 w-4' />
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

            {/* Enhanced Reviews & Recommendations */}
            <Card className='shadow-sm border-gray-200'>
              <CardHeader className='pb-4'>
                <CardTitle className='flex items-center gap-2 text-lg font-semibold text-gray-900'>
                  <MessageCircle className='h-5 w-5 text-blue-600' />
                  Reviews & Recommendations
                  <Badge variant='secondary' className='ml-2'>
                    {reviews.length}
                  </Badge>
                </CardTitle>
              </CardHeader>
              <CardContent className='space-y-4'>
                {/* Review Summary */}
                <div className='bg-blue-50 rounded-lg p-4 mb-4'>
                  <div className='flex items-center justify-between'>
                    <div className='flex items-center gap-3'>
                      <div className='text-center'>
                        <div className='text-2xl font-bold text-blue-600'>
                          {averageRating.toFixed(1)}
                        </div>
                        <div className='flex items-center gap-1'>
                          {[...Array(5)].map((_, i) => (
                            <Star
                              key={i}
                              className={`h-3 w-3 ${
                                i < Math.floor(averageRating)
                                  ? 'text-yellow-500 fill-current'
                                  : 'text-gray-300'
                              }`}
                            />
                          ))}
                        </div>
                      </div>
                      <div>
                        <p className='text-sm text-gray-600'>
                          {reviews.length} recommendations
                        </p>
                        <p className='text-xs text-gray-500'>
                          Based on {reviews.length} reviews
                        </p>
                      </div>
                    </div>
                    {!isPublicView && (
                      <Button
                        size='sm'
                        variant='outline'
                        className='bg-blue-600 hover:bg-blue-700 text-white border-blue-600'
                      >
                        <Plus className='h-4 w-4 mr-2' />
                        Request Recommendation
                      </Button>
                    )}
                  </div>
                </div>

                {/* Reviews List */}
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
                          <p className='text-xs text-gray-500'>
                            {new Date(review.date).toLocaleDateString('en-US', {
                              year: 'numeric',
                              month: 'long',
                              day: 'numeric',
                            })}
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
                    <p className='text-gray-700 mb-3 leading-relaxed'>
                      "{review.comment}"
                    </p>
                    <div className='flex items-center justify-between text-sm text-gray-500'>
                      <div className='flex items-center gap-4'>
                        <button className='flex items-center gap-1 hover:text-blue-600 transition-colors'>
                          <ThumbsUp className='h-4 w-4' />
                          <span>Helpful ({review.helpful})</span>
                        </button>
                        <button className='flex items-center gap-1 hover:text-blue-600 transition-colors'>
                          <MessageSquare className='h-4 w-4' />
                          <span>Reply</span>
                        </button>
                        <button className='flex items-center gap-1 hover:text-blue-600 transition-colors'>
                          <Share2 className='h-4 w-4' />
                          <span>Share</span>
                        </button>
                      </div>
                      {!isPublicView && (
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button
                              size='sm'
                              variant='ghost'
                              className='bg-gray-100 hover:bg-gray-200 text-gray-700'
                            >
                              <MoreHorizontal className='h-4 w-4' />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent>
                            <DropdownMenuItem>
                              <Edit className='h-4 w-4 mr-2' />
                              Edit
                            </DropdownMenuItem>
                            <DropdownMenuItem>
                              <Flag className='h-4 w-4 mr-2' />
                              Report
                            </DropdownMenuItem>
                            <DropdownMenuItem className='text-red-600'>
                              <Trash2 className='h-4 w-4 mr-2' />
                              Delete
                            </DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      )}
                    </div>
                  </div>
                ))}

                {/* Add Review Button */}
                {!isPublicView && (
                  <Button
                    variant='outline'
                    className='w-full bg-blue-600 hover:bg-blue-700 text-white border-blue-600'
                    onClick={() => setIsEditing(true)}
                  >
                    <Plus className='h-4 w-4 mr-2' />
                    Add Review
                  </Button>
                )}
              </CardContent>
            </Card>
          </div>

          {/* Sidebar */}
          <div className='lg:col-span-1 space-y-6 w-full'>
            {/* Academic Information */}
            <Card className='shadow-sm border-gray-200'>
              <CardHeader className='pb-4'>
                <CardTitle className='flex items-center gap-2 text-lg font-semibold text-gray-900'>
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
                  <div className='text-xs text-gray-600'>
                    Expected Graduation
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Skills & Languages */}
            <Card className='shadow-sm border-gray-200'>
              <CardHeader className='pb-4'>
                <CardTitle className='text-lg font-semibold text-gray-900'>
                  Skills & Languages
                </CardTitle>
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

                <div>
                  <label className='block text-sm font-medium text-gray-700 mb-2'>
                    Skills
                  </label>
                  <div className='flex flex-wrap gap-2 mb-2'>
                    {profileData.skills.map((skill, index) => (
                      <Badge
                        key={index}
                        variant='outline'
                        className='flex items-center gap-1'
                      >
                        {skill}
                        {isEditing && (
                          <button
                            onClick={() => removeSkill(index)}
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
                        placeholder='Add new skill'
                        value={newSkill}
                        onChange={(e) => setNewSkill(e.target.value)}
                        onKeyPress={(e) => e.key === 'Enter' && addSkill()}
                      />
                      <Button size='sm' onClick={addSkill}>
                        <Plus className='h-4 w-4' />
                      </Button>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>

            {/* Education */}
            <Card className='shadow-sm border-gray-200'>
              <CardHeader className='pb-4'>
                <CardTitle className='flex items-center gap-2 text-lg font-semibold text-gray-900'>
                  <School className='h-5 w-5 text-blue-600' />
                  Education
                </CardTitle>
              </CardHeader>
              <CardContent className='space-y-4'>
                {education.map((edu, index) => (
                  <div key={edu.id} className='border rounded-lg p-4'>
                    <div className='flex items-start justify-between mb-2'>
                      <h4 className='font-medium text-gray-900'>
                        {isEditing ? (
                          <Input
                            value={edu.degree}
                            onChange={(e) => {
                              const updated = [...education];
                              updated[index].degree = e.target.value;
                              setEducation(updated);
                            }}
                            placeholder='Degree'
                          />
                        ) : (
                          edu.degree
                        )}
                      </h4>
                      {isEditing && (
                        <Button
                          size='sm'
                          variant='ghost'
                          onClick={() => removeEducation(edu.id)}
                          className='text-red-600 hover:text-red-700 hover:bg-red-50'
                        >
                          <Trash2 className='h-4 w-4' />
                        </Button>
                      )}
                    </div>
                    <p className='text-sm text-gray-600 mb-1'>
                      {isEditing ? (
                        <Input
                          value={edu.institution}
                          onChange={(e) => {
                            const updated = [...education];
                            updated[index].institution = e.target.value;
                            setEducation(updated);
                          }}
                          placeholder='Institution'
                        />
                      ) : (
                        edu.institution
                      )}
                    </p>
                    <p className='text-xs text-gray-500 mb-1'>
                      {edu.startDate} -{' '}
                      {edu.isCurrent ? 'Present' : edu.endDate}
                    </p>
                    <p className='text-sm text-gray-700'>
                      {isEditing ? (
                        <Textarea
                          value={edu.description}
                          onChange={(e) => {
                            const updated = [...education];
                            updated[index].description = e.target.value;
                            setEducation(updated);
                          }}
                          placeholder='Description'
                          rows={2}
                        />
                      ) : (
                        edu.description
                      )}
                    </p>
                  </div>
                ))}
                {isEditing && (
                  <div className='border-2 border-dashed border-gray-300 p-4 rounded-lg bg-gray-50'>
                    <h4 className='font-medium text-gray-700 mb-2'>
                      Add New Education
                    </h4>
                    <div className='space-y-2'>
                      <Input
                        placeholder='Degree'
                        value={newEducation.degree}
                        onChange={(e) =>
                          setNewEducation({
                            ...newEducation,
                            degree: e.target.value,
                          })
                        }
                      />
                      <Input
                        placeholder='Institution'
                        value={newEducation.institution}
                        onChange={(e) =>
                          setNewEducation({
                            ...newEducation,
                            institution: e.target.value,
                          })
                        }
                      />
                      <div className='grid grid-cols-2 gap-2'>
                        <Input
                          placeholder='Start Date (YYYY-MM)'
                          value={newEducation.startDate}
                          onChange={(e) =>
                            setNewEducation({
                              ...newEducation,
                              startDate: e.target.value,
                            })
                          }
                        />
                        <Input
                          placeholder='End Date (YYYY-MM)'
                          value={newEducation.endDate}
                          onChange={(e) =>
                            setNewEducation({
                              ...newEducation,
                              endDate: e.target.value,
                            })
                          }
                        />
                      </div>
                      <Textarea
                        placeholder='Description'
                        value={newEducation.description}
                        onChange={(e) =>
                          setNewEducation({
                            ...newEducation,
                            description: e.target.value,
                          })
                        }
                        rows={2}
                      />
                      <Button
                        size='sm'
                        onClick={addEducation}
                        className='bg-blue-600 hover:bg-blue-700'
                      >
                        <Plus className='h-4 w-4 mr-1' />
                        Add Education
                      </Button>
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>

            {/* Certifications */}
            <Card className='shadow-sm border-gray-200'>
              <CardHeader className='pb-4'>
                <CardTitle className='flex items-center gap-2 text-lg font-semibold text-gray-900'>
                  <Award className='h-5 w-5 text-green-600' />
                  Certifications
                </CardTitle>
              </CardHeader>
              <CardContent className='space-y-4'>
                {certifications.map((cert, index) => (
                  <div key={cert.id} className='border rounded-lg p-4'>
                    <div className='flex items-start justify-between mb-2'>
                      <h4 className='font-medium text-gray-900'>
                        {isEditing ? (
                          <Input
                            value={cert.name}
                            onChange={(e) => {
                              const updated = [...certifications];
                              updated[index].name = e.target.value;
                              setCertifications(updated);
                            }}
                            placeholder='Certification Name'
                          />
                        ) : (
                          cert.name
                        )}
                      </h4>
                      {isEditing && (
                        <Button
                          size='sm'
                          variant='ghost'
                          onClick={() => removeCertification(cert.id)}
                          className='text-red-600 hover:text-red-700 hover:bg-red-50'
                        >
                          <Trash2 className='h-4 w-4' />
                        </Button>
                      )}
                    </div>
                    <p className='text-sm text-gray-600 mb-1'>
                      {isEditing ? (
                        <Input
                          value={cert.issuer}
                          onChange={(e) => {
                            const updated = [...certifications];
                            updated[index].issuer = e.target.value;
                            setCertifications(updated);
                          }}
                          placeholder='Issuer'
                        />
                      ) : (
                        cert.issuer
                      )}
                    </p>
                    <p className='text-xs text-gray-500 mb-1'>
                      {cert.issueDate} -{' '}
                      {cert.expiryDate ? cert.expiryDate : 'N/A'}
                    </p>
                    <p className='text-sm text-gray-700'>
                      {isEditing ? (
                        <Textarea
                          value={cert.description}
                          onChange={(e) => {
                            const updated = [...certifications];
                            updated[index].description = e.target.value;
                            setCertifications(updated);
                          }}
                          placeholder='Description'
                          rows={2}
                        />
                      ) : (
                        cert.description
                      )}
                    </p>
                  </div>
                ))}
                {isEditing && (
                  <div className='border-2 border-dashed border-gray-300 p-4 rounded-lg'>
                    <h4 className='font-medium text-gray-700 mb-2'>
                      Add New Certification
                    </h4>
                    <div className='space-y-2'>
                      <Input
                        placeholder='Certification Name'
                        value={newCertification.name}
                        onChange={(e) =>
                          setNewCertification({
                            ...newCertification,
                            name: e.target.value,
                          })
                        }
                      />
                      <Input
                        placeholder='Issuer'
                        value={newCertification.issuer}
                        onChange={(e) =>
                          setNewCertification({
                            ...newCertification,
                            issuer: e.target.value,
                          })
                        }
                      />
                      <div className='grid grid-cols-2 gap-2'>
                        <Input
                          placeholder='Issue Date (YYYY-MM)'
                          value={newCertification.issueDate}
                          onChange={(e) =>
                            setNewCertification({
                              ...newCertification,
                              issueDate: e.target.value,
                            })
                          }
                        />
                        <Input
                          placeholder='Expiry Date (YYYY-MM)'
                          value={newCertification.expiryDate}
                          onChange={(e) =>
                            setNewCertification({
                              ...newCertification,
                              expiryDate: e.target.value,
                            })
                          }
                        />
                      </div>
                      <Textarea
                        placeholder='Description'
                        value={newCertification.description}
                        onChange={(e) =>
                          setNewCertification({
                            ...newCertification,
                            description: e.target.value,
                          })
                        }
                        rows={2}
                      />
                      <Button size='sm' onClick={addCertification}>
                        <Plus className='h-4 w-4 mr-1' />
                        Add Certification
                      </Button>
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>

            {/* Publications */}
            <Card className='shadow-sm border-gray-200'>
              <CardHeader className='pb-4'>
                <CardTitle className='flex items-center gap-2 text-lg font-semibold text-gray-900'>
                  <BookOpenCheck className='h-5 w-5 text-purple-600' />
                  Publications
                </CardTitle>
              </CardHeader>
              <CardContent className='space-y-4'>
                {publications.map((pub, index) => (
                  <div key={pub.id} className='border rounded-lg p-4'>
                    <div className='flex items-start justify-between mb-2'>
                      <h4 className='font-medium text-gray-900'>
                        {isEditing ? (
                          <Input
                            value={pub.title}
                            onChange={(e) => {
                              const updated = [...publications];
                              updated[index].title = e.target.value;
                              setPublications(updated);
                            }}
                            placeholder='Publication Title'
                          />
                        ) : (
                          pub.title
                        )}
                      </h4>
                      {isEditing && (
                        <Button
                          size='sm'
                          variant='ghost'
                          onClick={() => removePublication(pub.id)}
                          className='text-red-600 hover:text-red-700 hover:bg-red-50'
                        >
                          <Trash2 className='h-4 w-4' />
                        </Button>
                      )}
                    </div>
                    <p className='text-sm text-gray-600 mb-1'>
                      {isEditing ? (
                        <Input
                          value={pub.authors.join(', ')}
                          onChange={(e) => {
                            const updated = [...publications];
                            updated[index].authors = e.target.value
                              .split(',')
                              .map((a) => a.trim());
                            setPublications(updated);
                          }}
                          placeholder='Authors (comma-separated)'
                        />
                      ) : (
                        pub.authors.join(', ')
                      )}
                    </p>
                    <p className='text-xs text-gray-500 mb-1'>
                      {pub.publicationDate}
                    </p>
                    <p className='text-sm text-gray-700'>
                      {isEditing ? (
                        <Textarea
                          value={pub.abstract}
                          onChange={(e) => {
                            const updated = [...publications];
                            updated[index].abstract = e.target.value;
                            setPublications(updated);
                          }}
                          placeholder='Abstract'
                          rows={2}
                        />
                      ) : (
                        pub.abstract
                      )}
                    </p>
                  </div>
                ))}
                {isEditing && (
                  <div className='border-2 border-dashed border-gray-300 p-4 rounded-lg'>
                    <h4 className='font-medium text-gray-700 mb-2'>
                      Add New Publication
                    </h4>
                    <div className='space-y-2'>
                      <Input
                        placeholder='Publication Title'
                        value={newPublication.title}
                        onChange={(e) =>
                          setNewPublication({
                            ...newPublication,
                            title: e.target.value,
                          })
                        }
                      />
                      <Input
                        placeholder='Authors (comma-separated)'
                        value={newPublication.authors}
                        onChange={(e) =>
                          setNewPublication({
                            ...newPublication,
                            authors: e.target.value,
                          })
                        }
                      />
                      <div className='grid grid-cols-2 gap-2'>
                        <Input
                          placeholder='Publication Date (YYYY-MM)'
                          value={newPublication.publicationDate}
                          onChange={(e) =>
                            setNewPublication({
                              ...newPublication,
                              publicationDate: e.target.value,
                            })
                          }
                        />
                        <Select
                          onValueChange={(value) =>
                            setNewPublication({
                              ...newPublication,
                              type: value as
                                | 'journal'
                                | 'conference'
                                | 'book-chapter'
                                | 'preprint',
                            })
                          }
                        >
                          <SelectTrigger className='w-[180px]'>
                            <SelectValue placeholder='Select Type' />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value='journal'>
                              Journal Article
                            </SelectItem>
                            <SelectItem value='conference'>
                              Conference Paper
                            </SelectItem>
                            <SelectItem value='book-chapter'>
                              Book Chapter
                            </SelectItem>
                            <SelectItem value='preprint'>Preprint</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      <Textarea
                        placeholder='Abstract'
                        value={newPublication.abstract}
                        onChange={(e) =>
                          setNewPublication({
                            ...newPublication,
                            abstract: e.target.value,
                          })
                        }
                        rows={2}
                      />
                      <Button size='sm' onClick={addPublication}>
                        <Plus className='h-4 w-4 mr-1' />
                        Add Publication
                      </Button>
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>

            {/* Enhanced CV Management */}
            <Card className='shadow-sm border-gray-200'>
              <CardHeader className='pb-4'>
                <CardTitle className='flex items-center gap-2 text-lg font-semibold text-gray-900'>
                  <FileText className='h-5 w-5 text-green-600' />
                  Documents & CV
                </CardTitle>
              </CardHeader>
              <CardContent className='space-y-4'>
                {cvs.map((cv) => (
                  <div
                    key={cv.id}
                    className='flex items-center justify-between p-3 bg-gray-50 rounded-lg'
                  >
                    <div className='flex items-center gap-3'>
                      <div className='flex items-center gap-2'>
                        <FileText className='h-4 w-4 text-gray-500' />
                        <div>
                          <p className='text-sm font-medium'>{cv.name}</p>
                          <div className='flex items-center gap-2 text-xs text-gray-500'>
                            <span>Uploaded {cv.uploadedAt}</span>
                            <Badge
                              variant={cv.isPublic ? 'default' : 'secondary'}
                              className='text-xs'
                            >
                              {cv.isPublic ? 'Public' : 'Private'}
                            </Badge>
                            <Badge variant='outline' className='text-xs'>
                              {cv.type.replace('-', ' ')}
                            </Badge>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className='flex gap-1'>
                      <Button
                        size='sm'
                        variant='outline'
                        onClick={() => handleDownloadCV(cv)}
                        className='bg-gray-200 hover:bg-gray-300 text-gray-700'
                      >
                        <Download className='h-3 w-3' />
                      </Button>
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button
                            size='sm'
                            variant='outline'
                            className='bg-gray-200 hover:bg-gray-300 text-gray-700'
                          >
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
                          <DropdownMenuItem>
                            <Edit className='h-4 w-4 mr-2' />
                            Rename
                          </DropdownMenuItem>
                          <DropdownMenuItem>
                            <Shield className='h-4 w-4 mr-2' />
                            {cv.isPublic ? 'Make Private' : 'Make Public'}
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

                {/* Upload CV Modal */}
                <Dialog>
                  <DialogTrigger asChild>
                    <Button
                      size='sm'
                      variant='outline'
                      className='w-full bg-blue-600 hover:bg-blue-700 text-white border-blue-600'
                      onClick={() => setIsEditing(true)}
                    >
                      <Upload className='h-4 w-4 mr-2' />
                      Upload Document
                    </Button>
                  </DialogTrigger>
                  <DialogContent>
                    <DialogHeader>
                      <DialogTitle>Upload Document</DialogTitle>
                      <DialogDescription>
                        Upload your CV, cover letter, or other professional
                        documents.
                      </DialogDescription>
                    </DialogHeader>
                    <div className='space-y-4'>
                      <div className='grid grid-cols-2 gap-4'>
                        <div>
                          <label className='text-sm font-medium'>
                            Document Type
                          </label>
                          <Select>
                            <SelectTrigger>
                              <SelectValue placeholder='Select type' />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value='resume'>Resume</SelectItem>
                              <SelectItem value='cover-letter'>
                                Cover Letter
                              </SelectItem>
                              <SelectItem value='portfolio'>
                                Portfolio
                              </SelectItem>
                              <SelectItem value='transcript'>
                                Transcript
                              </SelectItem>
                              <SelectItem value='certificate'>
                                Certificate
                              </SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                        <div>
                          <label className='text-sm font-medium'>
                            Visibility
                          </label>
                          <Select>
                            <SelectTrigger>
                              <SelectValue placeholder='Select visibility' />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value='public'>Public</SelectItem>
                              <SelectItem value='private'>Private</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                      </div>
                      <div>
                        <label className='text-sm font-medium'>File</label>
                        <input
                          type='file'
                          accept='.pdf,.doc,.docx,.txt,image/*'
                          onChange={(e) => {
                            const file = e.target.files?.[0];
                            if (file) {
                              handleUploadCV(file);
                            }
                          }}
                          className='block w-full text-sm border rounded p-2'
                        />
                      </div>
                      <div className='flex gap-2'>
                        <Button
                          variant='outline'
                          className='flex-1 bg-gray-200 hover:bg-gray-300 text-gray-700'
                        >
                          Cancel
                        </Button>
                        <Button
                          disabled
                          className='flex-1 bg-blue-600 hover:bg-blue-700 text-white border-blue-600'
                        >
                          {uploadingDoc ? 'Uploading...' : 'Upload Document'}
                        </Button>
                      </div>
                    </div>
                  </DialogContent>
                </Dialog>
              </CardContent>
            </Card>

            {/* Profile Stats */}
            <Card className='shadow-sm border-gray-200'>
              <CardHeader className='pb-4'>
                <CardTitle className='text-lg font-semibold text-gray-900'>
                  Profile Stats
                </CardTitle>
              </CardHeader>
              <CardContent className='space-y-4'>
                <div className='text-center'>
                  <div className='text-2xl font-bold text-blue-600'>85%</div>
                  <div className='text-sm text-gray-600'>Profile Complete</div>
                  <Progress value={85} className='mt-2' />
                </div>
                <div className='grid grid-cols-2 gap-4 text-center'>
                  <div>
                    <div className='text-lg font-semibold text-gray-900'>
                      12
                    </div>
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
            <Card className='shadow-sm border-gray-200'>
              <CardHeader className='pb-4'>
                <CardTitle className='flex items-center gap-2 text-lg font-semibold text-gray-900'>
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
                  className='w-full bg-blue-600 hover:bg-blue-700 text-white border-blue-600'
                  onClick={() => setSettingsOpen(true)}
                >
                  <Settings className='h-4 w-4 mr-2' />
                  Manage Privacy
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>

      {/* Edit Actions */}
      {isEditing && (
        <div className='fixed bottom-6 right-6 flex gap-2'>
          <Button
            variant='outline'
            onClick={handleCancel}
            className='bg-gray-200 hover:bg-gray-300 text-gray-700'
          >
            <X className='h-4 w-4 mr-2' />
            Cancel
          </Button>
          <Button
            className='bg-green-600 hover:bg-green-700 text-white border-green-600'
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
                className={
                  copied
                    ? 'bg-green-600 hover:bg-green-700 text-white border-green-600'
                    : ''
                }
              >
                {copied ? (
                  <Check className='h-4 w-4' />
                ) : (
                  <Copy className='h-4 w-4' />
                )}
              </Button>
            </div>
            <div className='flex gap-2'>
              <Button
                variant='outline'
                className='flex-1 bg-blue-600 hover:bg-blue-700 text-white border-blue-600'
              >
                <Linkedin className='h-4 w-4 mr-2' />
                LinkedIn
              </Button>
              <Button
                variant='outline'
                className='flex-1 bg-blue-600 hover:bg-blue-700 text-white border-blue-600'
              >
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

export default StudentProfile;
