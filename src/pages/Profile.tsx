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
import { CountryFlag } from '@/components/ui/CountryFlag';
import { getCountryCode } from '@/lib/countries';
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
  Plus,
  Briefcase,
  FileText,
  ExternalLink,
  Linkedin,
  Github,
  Twitter,
  Globe as GlobeIcon,
  Target,
  Lightbulb,
  Code,
  Database,
  Cloud,
  Shield,
  Zap,
  Heart,
  BookMarked,
  TrendingUp,
  Clock,
  CheckCircle,
  ChevronRight,
  ChevronDown,
  ChevronUp,
} from 'lucide-react';
import { useState } from 'react';

const Profile = () => {
  const [isEditing, setIsEditing] = useState(false);
  const [expandedSections, setExpandedSections] = useState({
    about: true,
    experience: true,
    education: true,
    skills: true,
    certifications: true,
    publications: true,
    projects: true,
    languages: true,
    interests: true,
  });

  const [profileData, setProfileData] = useState({
    name: 'Zunnun Zihan',
    email: 'zunnun.zihan@example.com',
    phone: '+880 1234-567890',
    location: 'Dhaka, Bangladesh',
    country: 'Bangladesh',
    university: 'University of Technology',
    fieldOfStudy: 'Computer Science',
    graduationYear: '2025',
    bio: 'Passionate computer science student with a keen interest in artificial intelligence and machine learning. Always eager to learn new technologies and contribute to innovative projects.',
    skills: [
      { name: 'JavaScript', level: 'Advanced', category: 'Programming' },
      { name: 'Python', level: 'Advanced', category: 'Programming' },
      { name: 'React', level: 'Intermediate', category: 'Frontend' },
      { name: 'Node.js', level: 'Intermediate', category: 'Backend' },
      { name: 'Machine Learning', level: 'Intermediate', category: 'AI/ML' },
      {
        name: 'Data Structures',
        level: 'Advanced',
        category: 'Computer Science',
      },
      { name: 'SQL', level: 'Intermediate', category: 'Database' },
      { name: 'Git', level: 'Advanced', category: 'Tools' },
    ],
    languages: [
      { name: 'English', level: 'Fluent' },
      { name: 'Bengali', level: 'Native' },
      { name: 'Arabic', level: 'Basic' },
    ],
    interests: [
      'AI/ML',
      'Web Development',
      'Open Source',
      'Research',
      'Data Science',
      'Cybersecurity',
    ],
    experience: [
      {
        id: 1,
        title: 'Software Development Intern',
        company: 'TechCorp Solutions',
        location: 'Dhaka, Bangladesh',
        startDate: 'Jun 2024',
        endDate: 'Present',
        description:
          'Working on full-stack web applications using React and Node.js. Contributing to the development of AI-powered features.',
        skills: ['React', 'Node.js', 'MongoDB', 'AI/ML'],
      },
      {
        id: 2,
        title: 'Research Assistant',
        company: 'University of Technology',
        location: 'Dhaka, Bangladesh',
        startDate: 'Jan 2024',
        endDate: 'May 2024',
        description:
          'Assisted in research on machine learning algorithms for computer vision applications.',
        skills: ['Python', 'TensorFlow', 'Computer Vision', 'Research'],
      },
    ],
    education: [
      {
        id: 1,
        degree: 'Bachelor of Science in Computer Science',
        institution: 'University of Technology',
        location: 'Dhaka, Bangladesh',
        startDate: '2021',
        endDate: '2025',
        gpa: '3.8/4.0',
        description:
          'Focus on artificial intelligence, machine learning, and software engineering.',
        courses: [
          'Data Structures',
          'Algorithms',
          'Machine Learning',
          'Database Systems',
        ],
      },
    ],
    certifications: [
      {
        id: 1,
        name: 'AWS Certified Cloud Practitioner',
        issuer: 'Amazon Web Services',
        issueDate: 'Dec 2023',
        expiryDate: 'Dec 2026',
        credentialId: 'AWS-CCP-123456',
        url: 'https://aws.amazon.com/certification/',
      },
      {
        id: 2,
        name: 'Google Cloud Professional Data Engineer',
        issuer: 'Google',
        issueDate: 'Nov 2023',
        expiryDate: 'Nov 2026',
        credentialId: 'GCP-PDE-789012',
        url: 'https://cloud.google.com/certification/',
      },
    ],
    publications: [
      {
        id: 1,
        title: 'Efficient Neural Network Architecture for Image Classification',
        authors: ['Zunnun Zihan', 'Dr. Sarah Wilson'],
        journal: 'International Conference on Computer Vision',
        publicationDate: 'Oct 2024',
        doi: '10.1000/example.2024.001',
        abstract:
          'This paper presents a novel neural network architecture that achieves state-of-the-art performance on image classification tasks while maintaining computational efficiency.',
        citations: 5,
      },
    ],
    projects: [
      {
        id: 1,
        name: 'AI-Powered Study Assistant',
        description:
          'A machine learning application that helps students optimize their study schedules and improve learning outcomes.',
        technologies: ['Python', 'React', 'TensorFlow', 'MongoDB'],
        githubUrl: 'https://github.com/zunnun/study-assistant',
        liveUrl: 'https://study-assistant.app',
        status: 'Completed',
      },
      {
        id: 2,
        name: 'E-commerce Platform',
        description:
          'A full-stack e-commerce platform with payment integration and inventory management.',
        technologies: ['React', 'Node.js', 'PostgreSQL', 'Stripe'],
        githubUrl: 'https://github.com/zunnun/ecommerce',
        liveUrl: 'https://ecommerce-demo.app',
        status: 'In Progress',
      },
    ],
    socialLinks: {
      linkedin: 'https://linkedin.com/in/zunnun-zihan',
      github: 'https://github.com/zunnun',
      twitter: 'https://twitter.com/zunnun_zihan',
      website: 'https://zunnun.dev',
    },
  });

  const handleInputChange = (field: string, value: string) => {
    setProfileData((prev) => ({ ...prev, [field]: value }));
  };

  const handleSave = () => {
    // Here you would typically save to API
    setIsEditing(false);
  };

  const toggleSection = (section: string) => {
    setExpandedSections((prev) => ({
      ...prev,
      [section]: !prev[section as keyof typeof prev],
    }));
  };

  const stats = {
    profileViews: 26,
    connections: 45,
    endorsements: 12,
    publications: 3,
    projects: 8,
    certifications: 5,
  };

  const getSkillIcon = (category: string) => {
    switch (category) {
      case 'Programming':
        return Code;
      case 'Frontend':
        return Globe;
      case 'Backend':
        return Database;
      case 'AI/ML':
        return Brain;
      case 'Database':
        return Database;
      case 'Tools':
        return Zap;
      default:
        return Code;
    }
  };

  const getLevelColor = (level: string) => {
    switch (level) {
      case 'Advanced':
        return 'bg-green-100 text-green-800';
      case 'Intermediate':
        return 'bg-yellow-100 text-yellow-800';
      case 'Basic':
        return 'bg-blue-100 text-blue-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className='p-6 space-y-6 max-w-4xl mx-auto'>
      {/* Header */}
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
        {/* Left Column - Profile Info */}
        <div className='lg:col-span-1 space-y-6'>
          {/* Profile Header */}
          <Card>
            <CardHeader>
              <div className='text-center space-y-4'>
                <div className='relative mx-auto'>
                  <Avatar className='h-24 w-24 mx-auto'>
                    <AvatarImage
                      src='/api/placeholder/96/96'
                      alt={profileData.name}
                    />
                    <AvatarFallback className='text-xl'>
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
                  <CardTitle className='text-xl'>{profileData.name}</CardTitle>
                  <CardDescription className='flex items-center justify-center gap-1 mt-1'>
                    <GraduationCap className='h-4 w-4' />
                    {profileData.fieldOfStudy} Student
                  </CardDescription>
                  <CardDescription className='flex items-center justify-center gap-1'>
                    <Building className='h-4 w-4' />
                    {profileData.university}
                  </CardDescription>
                  <div className='flex items-center justify-center gap-1 mt-1'>
                    <CountryFlag
                      code={getCountryCode(profileData.country)}
                      size={16}
                      className='rounded-sm'
                    />
                    <span className='text-sm text-gray-500'>
                      {profileData.country}
                    </span>
                  </div>
                </div>
                <div className='flex items-center justify-center gap-4 text-sm text-gray-500'>
                  <span className='flex items-center gap-1'>
                    <Eye className='h-4 w-4' />
                    {stats.profileViews} views
                  </span>
                  <span className='flex items-center gap-1'>
                    <Users className='h-4 w-4' />
                    {stats.connections} connections
                  </span>
                </div>
              </div>
            </CardHeader>
            <CardContent className='space-y-4'>
              {/* Contact Info */}
              <div className='space-y-2'>
                <h4 className='font-semibold text-sm'>Contact Information</h4>
                <div className='space-y-1 text-sm'>
                  <div className='flex items-center gap-2'>
                    <Mail className='h-3 w-3 text-gray-400' />
                    {profileData.email}
                  </div>
                  <div className='flex items-center gap-2'>
                    <Phone className='h-3 w-3 text-gray-400' />
                    {profileData.phone}
                  </div>
                  <div className='flex items-center gap-2'>
                    <MapPin className='h-3 w-3 text-gray-400' />
                    {profileData.location}
                  </div>
                </div>
              </div>

              {/* Social Links */}
              <div className='space-y-2'>
                <h4 className='font-semibold text-sm'>Social Links</h4>
                <div className='flex gap-2'>
                  <Button variant='outline' size='sm' className='flex-1'>
                    <Linkedin className='h-3 w-3' />
                  </Button>
                  <Button variant='outline' size='sm' className='flex-1'>
                    <Github className='h-3 w-3' />
                  </Button>
                  <Button variant='outline' size='sm' className='flex-1'>
                    <Twitter className='h-3 w-3' />
                  </Button>
                </div>
              </div>

              {/* Stats */}
              <div className='space-y-2'>
                <h4 className='font-semibold text-sm'>Profile Stats</h4>
                <div className='grid grid-cols-2 gap-2 text-sm'>
                  <div className='text-center p-2 bg-gray-50 rounded'>
                    <div className='font-semibold'>{stats.publications}</div>
                    <div className='text-xs text-gray-500'>Publications</div>
                  </div>
                  <div className='text-center p-2 bg-gray-50 rounded'>
                    <div className='font-semibold'>{stats.projects}</div>
                    <div className='text-xs text-gray-500'>Projects</div>
                  </div>
                  <div className='text-center p-2 bg-gray-50 rounded'>
                    <div className='font-semibold'>{stats.certifications}</div>
                    <div className='text-xs text-gray-500'>Certifications</div>
                  </div>
                  <div className='text-center p-2 bg-gray-50 rounded'>
                    <div className='font-semibold'>{stats.endorsements}</div>
                    <div className='text-xs text-gray-500'>Endorsements</div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Right Column - Main Content */}
        <div className='lg:col-span-2 space-y-6'>
          {/* About Section */}
          <Card>
            <CardHeader>
              <div className='flex items-center justify-between'>
                <CardTitle className='text-lg flex items-center gap-2'>
                  <User className='h-5 w-5' />
                  About
                </CardTitle>
                <Button
                  variant='ghost'
                  size='sm'
                  onClick={() => toggleSection('about')}
                >
                  {expandedSections.about ? (
                    <ChevronUp className='h-4 w-4' />
                  ) : (
                    <ChevronDown className='h-4 w-4' />
                  )}
                </Button>
              </div>
            </CardHeader>
            {expandedSections.about && (
              <CardContent>
                {isEditing ? (
                  <Textarea
                    value={profileData.bio}
                    onChange={(e) => handleInputChange('bio', e.target.value)}
                    className='min-h-[100px]'
                  />
                ) : (
                  <p className='text-gray-700 leading-relaxed'>
                    {profileData.bio}
                  </p>
                )}
              </CardContent>
            )}
          </Card>

          {/* Experience Section */}
          <Card>
            <CardHeader>
              <div className='flex items-center justify-between'>
                <CardTitle className='text-lg flex items-center gap-2'>
                  <Briefcase className='h-5 w-5' />
                  Experience
                </CardTitle>
                <div className='flex gap-2'>
                  {isEditing && (
                    <Button size='sm' variant='outline'>
                      <Plus className='h-4 w-4' />
                    </Button>
                  )}
                  <Button
                    variant='ghost'
                    size='sm'
                    onClick={() => toggleSection('experience')}
                  >
                    {expandedSections.experience ? (
                      <ChevronUp className='h-4 w-4' />
                    ) : (
                      <ChevronDown className='h-4 w-4' />
                    )}
                  </Button>
                </div>
              </div>
            </CardHeader>
            {expandedSections.experience && (
              <CardContent className='space-y-4'>
                {profileData.experience.map((exp) => (
                  <div key={exp.id} className='border-l-2 border-blue-200 pl-4'>
                    <div className='flex items-start justify-between'>
                      <div>
                        <h4 className='font-semibold'>{exp.title}</h4>
                        <p className='text-sm text-gray-600'>{exp.company}</p>
                        <p className='text-xs text-gray-500 flex items-center gap-1'>
                          <MapPin className='h-3 w-3' />
                          {exp.location}
                        </p>
                        <p className='text-xs text-gray-500'>
                          {exp.startDate} - {exp.endDate}
                        </p>
                      </div>
                      {isEditing && (
                        <Button size='sm' variant='ghost'>
                          <Edit className='h-3 w-3' />
                        </Button>
                      )}
                    </div>
                    <p className='text-sm text-gray-700 mt-2'>
                      {exp.description}
                    </p>
                    <div className='flex flex-wrap gap-1 mt-2'>
                      {exp.skills.map((skill) => (
                        <Badge
                          key={skill}
                          variant='secondary'
                          className='text-xs'
                        >
                          {skill}
                        </Badge>
                      ))}
                    </div>
                  </div>
                ))}
              </CardContent>
            )}
          </Card>

          {/* Education Section */}
          <Card>
            <CardHeader>
              <div className='flex items-center justify-between'>
                <CardTitle className='text-lg flex items-center gap-2'>
                  <GraduationCap className='h-5 w-5' />
                  Education
                </CardTitle>
                <div className='flex gap-2'>
                  {isEditing && (
                    <Button size='sm' variant='outline'>
                      <Plus className='h-4 w-4' />
                    </Button>
                  )}
                  <Button
                    variant='ghost'
                    size='sm'
                    onClick={() => toggleSection('education')}
                  >
                    {expandedSections.education ? (
                      <ChevronUp className='h-4 w-4' />
                    ) : (
                      <ChevronDown className='h-4 w-4' />
                    )}
                  </Button>
                </div>
              </div>
            </CardHeader>
            {expandedSections.education && (
              <CardContent className='space-y-4'>
                {profileData.education.map((edu) => (
                  <div
                    key={edu.id}
                    className='border-l-2 border-green-200 pl-4'
                  >
                    <div className='flex items-start justify-between'>
                      <div>
                        <h4 className='font-semibold'>{edu.degree}</h4>
                        <p className='text-sm text-gray-600'>
                          {edu.institution}
                        </p>
                        <p className='text-xs text-gray-500 flex items-center gap-1'>
                          <MapPin className='h-3 w-3' />
                          {edu.location}
                        </p>
                        <p className='text-xs text-gray-500'>
                          {edu.startDate} - {edu.endDate}
                        </p>
                        <p className='text-xs text-gray-500'>GPA: {edu.gpa}</p>
                      </div>
                      {isEditing && (
                        <Button size='sm' variant='ghost'>
                          <Edit className='h-3 w-3' />
                        </Button>
                      )}
                    </div>
                    <p className='text-sm text-gray-700 mt-2'>
                      {edu.description}
                    </p>
                    <div className='flex flex-wrap gap-1 mt-2'>
                      {edu.courses.map((course) => (
                        <Badge
                          key={course}
                          variant='outline'
                          className='text-xs'
                        >
                          {course}
                        </Badge>
                      ))}
                    </div>
                  </div>
                ))}
              </CardContent>
            )}
          </Card>

          {/* Skills Section */}
          <Card>
            <CardHeader>
              <div className='flex items-center justify-between'>
                <CardTitle className='text-lg flex items-center gap-2'>
                  <Target className='h-5 w-5' />
                  Skills
                </CardTitle>
                <div className='flex gap-2'>
                  {isEditing && (
                    <Button size='sm' variant='outline'>
                      <Plus className='h-4 w-4' />
                    </Button>
                  )}
                  <Button
                    variant='ghost'
                    size='sm'
                    onClick={() => toggleSection('skills')}
                  >
                    {expandedSections.skills ? (
                      <ChevronUp className='h-4 w-4' />
                    ) : (
                      <ChevronDown className='h-4 w-4' />
                    )}
                  </Button>
                </div>
              </div>
            </CardHeader>
            {expandedSections.skills && (
              <CardContent>
                <div className='space-y-4'>
                  {Object.entries(
                    profileData.skills.reduce((acc, skill) => {
                      if (!acc[skill.category]) acc[skill.category] = [];
                      acc[skill.category].push(skill);
                      return acc;
                    }, {} as Record<string, typeof profileData.skills>)
                  ).map(([category, skills]) => (
                    <div key={category}>
                      <h4 className='font-semibold text-sm mb-2'>{category}</h4>
                      <div className='flex flex-wrap gap-2'>
                        {skills.map((skill) => (
                          <Badge
                            key={skill.name}
                            className={`${getLevelColor(skill.level)} text-xs`}
                          >
                            {skill.name}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            )}
          </Card>

          {/* Certifications Section */}
          <Card>
            <CardHeader>
              <div className='flex items-center justify-between'>
                <CardTitle className='text-lg flex items-center gap-2'>
                  <Award className='h-5 w-5' />
                  Certifications
                </CardTitle>
                <div className='flex gap-2'>
                  {isEditing && (
                    <Button size='sm' variant='outline'>
                      <Plus className='h-4 w-4' />
                    </Button>
                  )}
                  <Button
                    variant='ghost'
                    size='sm'
                    onClick={() => toggleSection('certifications')}
                  >
                    {expandedSections.certifications ? (
                      <ChevronUp className='h-4 w-4' />
                    ) : (
                      <ChevronDown className='h-4 w-4' />
                    )}
                  </Button>
                </div>
              </div>
            </CardHeader>
            {expandedSections.certifications && (
              <CardContent className='space-y-4'>
                {profileData.certifications.map((cert) => (
                  <div
                    key={cert.id}
                    className='border-l-2 border-yellow-200 pl-4'
                  >
                    <div className='flex items-start justify-between'>
                      <div>
                        <h4 className='font-semibold'>{cert.name}</h4>
                        <p className='text-sm text-gray-600'>{cert.issuer}</p>
                        <p className='text-xs text-gray-500'>
                          Issued: {cert.issueDate}
                          {cert.expiryDate && ` • Expires: ${cert.expiryDate}`}
                        </p>
                        <p className='text-xs text-gray-500'>
                          ID: {cert.credentialId}
                        </p>
                      </div>
                      <div className='flex gap-1'>
                        {cert.url && (
                          <Button size='sm' variant='ghost'>
                            <ExternalLink className='h-3 w-3' />
                          </Button>
                        )}
                        {isEditing && (
                          <Button size='sm' variant='ghost'>
                            <Edit className='h-3 w-3' />
                          </Button>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </CardContent>
            )}
          </Card>

          {/* Publications Section */}
          <Card>
            <CardHeader>
              <div className='flex items-center justify-between'>
                <CardTitle className='text-lg flex items-center gap-2'>
                  <FileText className='h-5 w-5' />
                  Publications
                </CardTitle>
                <div className='flex gap-2'>
                  {isEditing && (
                    <Button size='sm' variant='outline'>
                      <Plus className='h-4 w-4' />
                    </Button>
                  )}
                  <Button
                    variant='ghost'
                    size='sm'
                    onClick={() => toggleSection('publications')}
                  >
                    {expandedSections.publications ? (
                      <ChevronUp className='h-4 w-4' />
                    ) : (
                      <ChevronDown className='h-4 w-4' />
                    )}
                  </Button>
                </div>
              </div>
            </CardHeader>
            {expandedSections.publications && (
              <CardContent className='space-y-4'>
                {profileData.publications.map((pub) => (
                  <div
                    key={pub.id}
                    className='border-l-2 border-purple-200 pl-4'
                  >
                    <div className='flex items-start justify-between'>
                      <div>
                        <h4 className='font-semibold'>{pub.title}</h4>
                        <p className='text-sm text-gray-600'>
                          {pub.authors.join(', ')}
                        </p>
                        <p className='text-sm text-gray-600'>{pub.journal}</p>
                        <p className='text-xs text-gray-500'>
                          {pub.publicationDate}
                        </p>
                        <p className='text-xs text-gray-500'>DOI: {pub.doi}</p>
                        <p className='text-xs text-gray-500 flex items-center gap-1'>
                          <TrendingUp className='h-3 w-3' />
                          {pub.citations} citations
                        </p>
                      </div>
                      {isEditing && (
                        <Button size='sm' variant='ghost'>
                          <Edit className='h-3 w-3' />
                        </Button>
                      )}
                    </div>
                    <p className='text-sm text-gray-700 mt-2'>{pub.abstract}</p>
                  </div>
                ))}
              </CardContent>
            )}
          </Card>

          {/* Projects Section */}
          <Card>
            <CardHeader>
              <div className='flex items-center justify-between'>
                <CardTitle className='text-lg flex items-center gap-2'>
                  <Code className='h-5 w-5' />
                  Projects
                </CardTitle>
                <div className='flex gap-2'>
                  {isEditing && (
                    <Button size='sm' variant='outline'>
                      <Plus className='h-4 w-4' />
                    </Button>
                  )}
                  <Button
                    variant='ghost'
                    size='sm'
                    onClick={() => toggleSection('projects')}
                  >
                    {expandedSections.projects ? (
                      <ChevronUp className='h-4 w-4' />
                    ) : (
                      <ChevronDown className='h-4 w-4' />
                    )}
                  </Button>
                </div>
              </div>
            </CardHeader>
            {expandedSections.projects && (
              <CardContent className='space-y-4'>
                {profileData.projects.map((project) => (
                  <div
                    key={project.id}
                    className='border-l-2 border-indigo-200 pl-4'
                  >
                    <div className='flex items-start justify-between'>
                      <div>
                        <h4 className='font-semibold'>{project.name}</h4>
                        <p className='text-sm text-gray-700'>
                          {project.description}
                        </p>
                        <div className='flex flex-wrap gap-1 mt-2'>
                          {project.technologies.map((tech) => (
                            <Badge
                              key={tech}
                              variant='secondary'
                              className='text-xs'
                            >
                              {tech}
                            </Badge>
                          ))}
                        </div>
                        <div className='flex items-center gap-2 mt-2'>
                          <Badge
                            variant={
                              project.status === 'Completed'
                                ? 'default'
                                : 'secondary'
                            }
                            className='text-xs'
                          >
                            {project.status}
                          </Badge>
                        </div>
                      </div>
                      <div className='flex gap-1'>
                        {project.githubUrl && (
                          <Button size='sm' variant='ghost'>
                            <Github className='h-3 w-3' />
                          </Button>
                        )}
                        {project.liveUrl && (
                          <Button size='sm' variant='ghost'>
                            <ExternalLink className='h-3 w-3' />
                          </Button>
                        )}
                        {isEditing && (
                          <Button size='sm' variant='ghost'>
                            <Edit className='h-3 w-3' />
                          </Button>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </CardContent>
            )}
          </Card>

          {/* Languages Section */}
          <Card>
            <CardHeader>
              <div className='flex items-center justify-between'>
                <CardTitle className='text-lg flex items-center gap-2'>
                  <GlobeIcon className='h-5 w-5' />
                  Languages
                </CardTitle>
                <div className='flex gap-2'>
                  {isEditing && (
                    <Button size='sm' variant='outline'>
                      <Plus className='h-4 w-4' />
                    </Button>
                  )}
                  <Button
                    variant='ghost'
                    size='sm'
                    onClick={() => toggleSection('languages')}
                  >
                    {expandedSections.languages ? (
                      <ChevronUp className='h-4 w-4' />
                    ) : (
                      <ChevronDown className='h-4 w-4' />
                    )}
                  </Button>
                </div>
              </div>
            </CardHeader>
            {expandedSections.languages && (
              <CardContent>
                <div className='flex flex-wrap gap-2'>
                  {profileData.languages.map((lang) => (
                    <Badge
                      key={lang.name}
                      className={`${getLevelColor(lang.level)} text-xs`}
                    >
                      {lang.name} ({lang.level})
                    </Badge>
                  ))}
                </div>
              </CardContent>
            )}
          </Card>

          {/* Interests Section */}
          <Card>
            <CardHeader>
              <div className='flex items-center justify-between'>
                <CardTitle className='text-lg flex items-center gap-2'>
                  <Heart className='h-5 w-5' />
                  Interests
                </CardTitle>
                <div className='flex gap-2'>
                  {isEditing && (
                    <Button size='sm' variant='outline'>
                      <Plus className='h-4 w-4' />
                    </Button>
                  )}
                  <Button
                    variant='ghost'
                    size='sm'
                    onClick={() => toggleSection('interests')}
                  >
                    {expandedSections.interests ? (
                      <ChevronUp className='h-4 w-4' />
                    ) : (
                      <ChevronDown className='h-4 w-4' />
                    )}
                  </Button>
                </div>
              </div>
            </CardHeader>
            {expandedSections.interests && (
              <CardContent>
                <div className='flex flex-wrap gap-2'>
                  {profileData.interests.map((interest) => (
                    <Badge key={interest} variant='outline' className='text-xs'>
                      {interest}
                    </Badge>
                  ))}
                </div>
              </CardContent>
            )}
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Profile;
