import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import {
  GraduationCap,
  Building2,
  BookOpen,
  Users,
  Globe,
  ArrowRight,
  CheckCircle,
  Sparkles,
  MessageSquare,
  Shield,
  Award,
  Calendar,
  MapPin,
  Star,
  ExternalLink,
  Mail,
  User,
  Bookmark,
  Clock,
  Video,
  MessageCircle,
  Heart,
  Users2,
  TrendingUp,
  Activity,
  Code,
  School,
  UserCheck,
  Briefcase,
  Microscope,
  Calculator,
  BookMarked,
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { LandingFooter } from '@/components/LandingFooter';

const Index = () => {
  const navigate = useNavigate();

  const featuredPrograms = [
    {
      id: 1,
      university: 'Stanford University',
      logo: 'https://images.unsplash.com/photo-1562774053-701939374585?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80',
      program: 'Master of Computer Science',
      duration: '2 years',
      location: 'Stanford, CA',
      rating: 4.9,
      applications: 1200,
      description:
        'Advanced computer science program with global research opportunities.',
      image:
        'https://images.unsplash.com/photo-1517077304055-6e89abbf09b0?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80',
      tag: 'Technology',
      capacity: '2,500',
      cost: '$58,000/year',
    },
    {
      id: 2,
      university: 'MIT',
      logo: 'https://images.unsplash.com/photo-1541339907198-e08756dedf3f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80',
      program: 'PhD in Engineering',
      duration: '4-6 years',
      location: 'Cambridge, MA',
      rating: 4.9,
      applications: 800,
      description:
        'World-class engineering research with international collaboration.',
      image:
        'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80',
      tag: 'Engineering',
      capacity: '1,800',
      cost: '$65,000/year',
    },
    {
      id: 3,
      university: 'Oxford University',
      logo: 'https://images.unsplash.com/photo-1562774053-701939374585?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80',
      program: 'MSc in International Relations',
      duration: '1 year',
      location: 'Oxford, UK',
      rating: 4.7,
      applications: 950,
      description:
        'Global perspective on international politics and diplomacy.',
      image:
        'https://images.unsplash.com/photo-1559757148-5c350d0d3c56?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80',
      tag: 'Social Sciences',
      capacity: '1,200',
      cost: '$45,000/year',
    },
  ];

  const communityGroups = [
    {
      id: 1,
      name: 'Computer Science Students',
      image:
        'https://images.unsplash.com/photo-1517077304055-6e89abbf09b0?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80',
      status: 'Very Active',
      members: '2,847',
      description:
        'Connect and collaborate on coding challenges, projects, and career opportunities.',
      tags: ['Programming', 'AI/ML', 'Web Dev'],
      color: 'blue',
      activity: 'High',
      lastActive: '2 hours ago',
      featured: true,
    },
    {
      id: 2,
      name: 'Medical Students International',
      image:
        'https://images.unsplash.com/photo-1559757148-5c350d0d3c56?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80',
      status: 'Active',
      members: '1,923',
      description:
        'Share experiences, resources, and support for medical school applications.',
      tags: ['Medicine', 'Research', 'Clinical'],
      color: 'green',
      activity: 'Medium',
      lastActive: '5 hours ago',
      featured: false,
    },
    {
      id: 3,
      name: 'Business & Economics Hub',
      image:
        'https://images.unsplash.com/photo-1554224155-6726b3ff858f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80',
      status: 'Active',
      members: '1,564',
      description:
        'Network and discuss market trends, business strategies, and economic policies.',
      tags: ['Business', 'Finance', 'Economics'],
      color: 'yellow',
      activity: 'Medium',
      lastActive: '1 day ago',
      featured: false,
    },
  ];

  const communityUsers = [
    {
      id: 1,
      name: 'Sarah Chen',
      avatar:
        'https://images.unsplash.com/photo-1534528741775-53994a69daeb?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=400&q=80',
      role: 'Student',
      program: 'Computer Science',
      institution: 'MIT',
      status: 'Junior',
      location: 'USA',
      skills: ['Python', 'React'],
      color: 'blue',
      rating: 4.8,
      connections: 156,
    },
    {
      id: 2,
      name: 'Dr. Alessandro Rossi',
      avatar:
        'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=400&q=80',
      role: 'Professor',
      field: 'Economics',
      institution: 'Bocconi University',
      publications: '47 Publications',
      location: 'Italy',
      skills: ['Behavioral Economics'],
      color: 'green',
      rating: 4.9,
      connections: 234,
    },
    {
      id: 3,
      name: 'University of Tokyo',
      avatar:
        'https://images.unsplash.com/photo-1562774053-701939374585?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=400&q=80',
      role: 'University',
      type: 'Public Research University',
      ranking: '#23 Global',
      students: '28,000+ Students',
      location: 'Japan',
      fields: ['Engineering', 'Medicine'],
      color: 'yellow',
      rating: 4.7,
      connections: 1890,
    },
    {
      id: 4,
      name: 'Maria Gonzalez',
      avatar:
        'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=400&q=80',
      role: 'Student',
      program: 'Biomedical Engineering',
      institution: 'Universidad Politécnica de Madrid',
      status: 'Graduate',
      location: 'Spain',
      skills: ['MATLAB', '3D Modeling'],
      color: 'pink',
      rating: 4.6,
      connections: 89,
    },
  ];

  const roles = [
    {
      id: 'student',
      title: 'Student',
      icon: GraduationCap,
      tagline: 'Connect Globally. Learn Locally. Lead Universally.',
      description:
        'Join a global community of learners. Connect with peers worldwide, find mentors, and discover opportunities that will shape your academic journey.',
      color: 'from-blue-600 to-indigo-600',
      features: [
        'Field-Based Global Peer Groups',
        'Mentor Marketplace',
        'Career Exploration Center',
        'Digital Portfolio Builder',
        'Global Scholarship & Internship Board',
      ],
    },
    {
      id: 'professor',
      title: 'Professor',
      icon: BookOpen,
      tagline: 'Teach Globally. Mentor Personally. Inspire Endlessly.',
      description:
        'Expand your impact beyond classroom walls. Share your expertise with students worldwide and build a thriving global academic practice.',
      color: 'from-green-600 to-emerald-600',
      features: [
        'Mentorship Dashboard',
        'Global Course Builder',
        'Research Assistant Portal',
        'Admission & Academic Advisory Tools',
        'Professional Profile & Promotion Tools',
      ],
    },
    {
      id: 'university',
      title: 'University',
      icon: Building2,
      tagline: 'Expand Your Campus. Reach the World.',
      description:
        'Transform your institution into a global powerhouse. Attract international talent, promote programs worldwide, and engage alumni like never before.',
      color: 'from-orange-600 to-amber-600',
      features: [
        'Institution Dashboard',
        'Program Promotion Tools',
        'Student Recruitment Suite',
        'Professor Recruitment',
        'Alumni Engagement Network',
        'Live Info Sessions & Webinars',
      ],
    },
  ];

  const professors = [
    {
      id: 1,
      name: 'Dr. Emily Watson',
      avatar:
        'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=400&q=80',
      title: 'Professor of Computer Science',
      university: 'Stanford University',
      rating: 4.9,
      reviews: 127,
      hourlyRate: 75,
      specialties: ['Machine Learning', 'Data Science'],
      sessions: 847,
      availability: 'Available Today',
      color: 'blue',
    },
    {
      id: 2,
      name: 'Prof. Marco Benedetti',
      avatar:
        'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=400&q=80',
      title: 'Economics Department Head',
      university: 'London School of Economics',
      rating: 4.8,
      reviews: 98,
      hourlyRate: 65,
      specialties: ['Econometrics', 'Policy Analysis'],
      sessions: 623,
      availability: 'Next Available: Tomorrow',
      color: 'green',
    },
    {
      id: 3,
      name: 'Dr. Sarah Kim',
      avatar:
        'https://images.unsplash.com/photo-1582750433449-648ed127bb54?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=400&q=80',
      title: 'Biomedical Engineering Professor',
      university: 'MIT',
      rating: 4.9,
      reviews: 150,
      hourlyRate: 80,
      specialties: ['Biomechanics', 'Medical Devices'],
      sessions: 945,
      availability: 'Available Today',
      color: 'pink',
    },
  ];

  return (
    <div className='min-h-screen bg-white'>
      {/* Sticky Top Navigation Bar */}
      <header className='sticky top-0 z-50 bg-white border-b border-gray-100 shadow-sm'>
        <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8'>
          <div className='flex justify-between items-center h-16'>
            {/* Logo */}
            <div className='flex items-center space-x-3'>
              <img
                src='/logo.png'
                alt='Edfellow'
                className='w-10 h-10 rounded-full'
              />
              <div>
                <h1 className='text-2xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent'>
                  Edfellow
                </h1>
              </div>
            </div>

            {/* Navigation Links */}
            <nav className='hidden md:flex items-center space-x-8'>
              <a
                href='#'
                onClick={() => navigate('/about')}
                className='text-gray-700 hover:text-[#007BFF] transition-colors font-medium'
              >
                About
              </a>
              <a
                href='#'
                onClick={() => navigate('/features')}
                className='text-gray-700 hover:text-[#007BFF] transition-colors font-medium'
              >
                Mentorship
              </a>
              <a
                href='#'
                onClick={() => navigate('/community')}
                className='text-gray-700 hover:text-[#007BFF] transition-colors font-medium'
              >
                Forum
              </a>
              <a
                href='#'
                className='text-gray-700 hover:text-[#007BFF] transition-colors font-medium'
              >
                Opportunities
              </a>
            </nav>

            {/* Auth Buttons */}
            <div className='flex items-center space-x-4'>
              <Button
                variant='outline'
                onClick={() => navigate('/login')}
                className='border-[#007BFF] text-[#007BFF] hover:bg-[#007BFF] hover:text-white transition-colors'
              >
                Log In
              </Button>
              <Button
                onClick={() => navigate('/signup')}
                className='bg-gradient-to-r from-[#007BFF] to-[#0B1B4D] hover:from-[#0056b3] hover:to-[#0B1B4D] text-white transition-colors'
              >
                Sign Up
              </Button>
            </div>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className='relative py-28 px-4 sm:px-6 lg:px-8 overflow-hidden min-h-[600px] flex items-center justify-center'>
        {/* Globe SVG Background */}
        <img
          src='/globe.svg'
          alt='Global Network Globe'
          className='absolute inset-0 w-full h-full object-cover opacity-35 pointer-events-none select-none z-0'
          style={{ objectPosition: 'center top' }}
        />
        {/* Overlay for readability */}
        <div className='absolute inset-0 bg-gradient-to-b from-white/40 via-blue-50/30 to-indigo-100/40 z-10' />
        <div className='relative z-20 max-w-3xl mx-auto w-full flex flex-col items-center justify-center text-center'>
          <Badge className='bg-white/90 backdrop-blur-sm text-[#007BFF] border-blue-200 mb-8 px-6 py-3 text-base font-semibold shadow-lg mx-auto hover:bg-white/90'>
            Global Academic Network
          </Badge>
          <h2 className='text-5xl sm:text-6xl font-extrabold text-[#0B1B4D] mb-8 leading-tight drop-shadow-lg'>
            Welcome to{' '}
            <span className='bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent'>
              Edfellow
            </span>
          </h2>
          <h3 className='text-2xl sm:text-3xl font-semibold text-indigo-700 mb-8'>
            Your Global Hub for Learning, Connection, and Opportunity
          </h3>
          <p className='text-lg text-gray-600 mb-10 leading-relaxed'>
            Join a thriving international community where students, educators,
            and institutions come together to learn, teach, and grow.
          </p>
          {/* Role-based CTA Buttons */}
          <div className='flex flex-col sm:flex-row gap-4 justify-center'>
            <Button
              size='lg'
              onClick={() =>
                navigate('/signup', { state: { role: 'student' } })
              }
              className='bg-gradient-to-r from-[#007BFF] to-[#0B1B4D] hover:from-[#0056b3] hover:to-[#0B1B4D] text-white px-8 py-4 text-lg font-semibold shadow-xl transition-transform duration-200 hover:scale-105'
            >
              Sign Up as Student
              <ArrowRight className='ml-2 h-5 w-5' />
            </Button>
            <Button
              size='lg'
              variant='outline'
              onClick={() =>
                navigate('/signup', { state: { role: 'professor' } })
              }
              className='border-[#007BFF] text-[#007BFF] hover:bg-[#007BFF] hover:text-white px-8 py-4 text-lg font-semibold shadow-md transition-transform duration-200 hover:scale-105'
            >
              Sign Up as Professor
            </Button>
            <Button
              size='lg'
              variant='outline'
              onClick={() =>
                navigate('/signup', { state: { role: 'university' } })
              }
              className='border-[#007BFF] text-[#007BFF] hover:bg-[#007BFF] hover:text-white px-8 py-4 text-lg font-semibold shadow-md transition-transform duration-200 hover:scale-105'
            >
              Sign Up as University
            </Button>
          </div>
        </div>
      </section>

      {/* Role Teaser Section */}
      <section className='py-20 px-4 sm:px-6 lg:px-8 bg-gray-50'>
        <div className='max-w-6xl mx-auto'>
          <div className='text-center mb-16'>
            <h3 className='text-3xl sm:text-4xl font-bold text-[#0B1B4D] mb-6'>
              How Edfellow Empowers You
            </h3>
            <p className='text-lg text-gray-600 max-w-3xl mx-auto'>
              Choose your path and discover how Edfellow transforms your
              educational journey
            </p>
          </div>

          <div className='grid md:grid-cols-3 gap-8'>
            {roles.map((role) => {
              const IconComponent = role.icon;
              return (
                <Card
                  key={role.id}
                  className='border-0 shadow-xl hover:shadow-2xl transition-all duration-300 bg-gradient-to-br from-white via-gray-50 to-gray-100 hover:scale-105 rounded-2xl p-2'
                >
                  <CardHeader className='text-center pb-6'>
                    <div
                      className={`inline-flex items-center justify-center w-20 h-20 bg-gradient-to-br ${role.color} rounded-2xl mb-6 mx-auto shadow-lg`}
                    >
                      <IconComponent className='h-10 w-10 text-white' />
                    </div>
                    <CardTitle className='text-2xl font-bold text-[#0B1B4D] mb-2'>
                      {role.title}
                    </CardTitle>
                    <div className='text-[#007BFF] font-semibold text-base pb-2'>
                      {role.tagline}
                    </div>
                    {/* <CardDescription className='text-gray-600 leading-relaxed mb-4'>
                      {role.description}
                    </CardDescription> */}
                    <ul className='text-left space-y-2 mb-2'>
                      {role.features.map((feature, idx) => (
                        <li
                          key={idx}
                          className='flex items-start gap-2 text-gray-700 text-sm'
                        >
                          <CheckCircle className='h-4 w-4 text-[#007BFF] mt-0.5 flex-shrink-0' />
                          <span>{feature}</span>
                        </li>
                      ))}
                    </ul>
                  </CardHeader>
                  <CardContent className='text-center'>
                    <Button
                      onClick={() =>
                        navigate('/signup', { state: { role: role.id } })
                      }
                      className={`bg-gradient-to-r ${role.color} hover:shadow-xl transform hover:scale-105 transition-all duration-200 w-full text-white font-semibold py-3 rounded-lg`}
                    >
                      Explore More
                      <ArrowRight className='ml-2 h-4 w-4' />
                    </Button>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>
      </section>

      {/* Featured Programs Section */}
      <section className='py-20 px-4 sm:px-6 lg:px-8'>
        <div className='max-w-6xl mx-auto'>
          <div className='text-left mb-16'>
            <h3 className='text-3xl sm:text-4xl font-bold text-[#0B1B4D] mb-6'>
              Featured Programs
            </h3>
          </div>

          <div className='grid md:grid-cols-3 gap-8'>
            {featuredPrograms.map((program) => (
              <Card
                key={program.id}
                className='border-0 shadow-xl hover:shadow-2xl transition-all duration-300 hover:scale-105 bg-gradient-to-br from-white via-gray-50 to-gray-100 rounded-2xl overflow-hidden group'
              >
                <div className='relative'>
                  <img
                    src={program.image}
                    alt={program.program}
                    className='w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300'
                  />
                  <Badge className='absolute top-4 right-4 bg-blue-100 text-blue-700 border-0 font-semibold'>
                    {program.tag}
                  </Badge>
                  <div className='absolute bottom-4 left-4'>
                    <img
                      src={program.logo}
                      alt={program.university}
                      className='w-12 h-12 rounded-full border-2 border-white shadow-lg'
                    />
                  </div>
                  <div className='absolute inset-0 bg-gradient-to-t from-black/20 to-transparent' />
                </div>
                <CardHeader className='pb-4 pt-6'>
                  <CardTitle className='text-xl font-bold text-[#0B1B4D] mb-2'>
                    {program.program}
                  </CardTitle>
                  <CardDescription className='text-gray-600 mb-4 font-medium'>
                    {program.university}
                  </CardDescription>
                  <div className='flex items-center space-x-1 mb-4'>
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        className={`h-4 w-4 ${
                          i < Math.floor(program.rating)
                            ? 'text-yellow-400 fill-current'
                            : 'text-gray-300'
                        }`}
                      />
                    ))}
                    <span className='text-sm text-gray-600 ml-1'>
                      {program.rating}
                    </span>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className='flex items-center justify-between text-sm text-gray-500 mb-4'>
                    <div className='flex items-center gap-1'>
                      <MapPin className='h-4 w-4' />
                      <span>{program.location}</span>
                    </div>
                    <div className='flex items-center gap-1'>
                      <Clock className='h-4 w-4' />
                      <span>{program.duration}</span>
                    </div>
                    <div className='flex items-center gap-1'>
                      <Users className='h-4 w-4' />
                      <span>{program.capacity}</span>
                    </div>
                  </div>
                  <div className='text-lg font-semibold text-[#007BFF] mb-4'>
                    {program.cost}
                  </div>
                  <Button className='w-full bg-gradient-to-r from-[#007BFF] to-[#0B1B4D] hover:from-[#0056b3] hover:to-[#0B1B4D] text-white font-semibold py-3 rounded-lg transition-all duration-200 hover:scale-105'>
                    Learn More
                    <ExternalLink className='ml-2 h-4 w-4' />
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Connect by Your Major Section */}
      <section className='py-20 px-4 sm:px-6 lg:px-8 bg-white'>
        <div className='max-w-6xl mx-auto'>
          <div className='text-center mb-16'>
            <h3 className='text-3xl sm:text-4xl font-bold text-[#0B1B4D] mb-6'>
              Connect by Your Major
            </h3>
            <p className='text-lg text-gray-600 max-w-2xl mx-auto'>
              Join subject-specific communities where students with similar
              academic interests connect, collaborate, and grow together.
            </p>
          </div>
          <div className='grid md:grid-cols-3 gap-8'>
            {communityGroups.map((group) => (
              <Card
                key={group.id}
                className='border-0 shadow-xl hover:shadow-2xl transition-all duration-300 hover:scale-105 bg-gradient-to-br from-white via-gray-50 to-gray-100 rounded-2xl overflow-hidden group relative'
              >
                {group.featured && (
                  <div className='absolute top-4 left-4 z-10'>
                    <Badge className='bg-gradient-to-r from-yellow-400 to-orange-500 text-white border-0 font-semibold'>
                      Featured
                    </Badge>
                  </div>
                )}
                <div className='relative h-48 overflow-hidden'>
                  <img
                    src={group.image}
                    alt={group.name}
                    className='w-full h-full object-cover group-hover:scale-110 transition-transform duration-300'
                  />
                  <div className='absolute inset-0 bg-gradient-to-t from-black/40 to-transparent' />
                  <div className='absolute bottom-4 right-4'>
                    <Bookmark className='h-5 w-5 text-white hover:text-yellow-400 cursor-pointer transition-colors' />
                  </div>
                </div>
                <CardHeader className='pb-4 pt-6'>
                  <div className='flex items-center justify-between mb-4'>
                    <div className='flex items-center gap-2'>
                      <Badge
                        className={`bg-green-100 text-green-700 border-0 font-semibold flex items-center gap-1`}
                      >
                        <Activity className='h-3 w-3' />
                        {group.status}
                      </Badge>
                      <div className='flex items-center gap-1 text-sm text-gray-500'>
                        <Users2 className='h-4 w-4' />
                        <span>{group.members}</span>
                      </div>
                    </div>
                  </div>
                  <CardTitle className='text-xl font-bold text-[#0B1B4D] pb-2'>
                    {group.name}
                  </CardTitle>
                  <p className='text-sm text-gray-600 pb-2 leading-relaxed'>
                    {group.description}
                  </p>
                  <div className='flex flex-wrap gap-2 pb-2'>
                    {group.tags.map((tag, index) => (
                      <Badge
                        key={index}
                        className='bg-blue-100 text-blue-700 border-0 text-xs font-medium'
                      >
                        {tag}
                      </Badge>
                    ))}
                  </div>
                  <div className='flex items-center justify-between text-xs text-gray-500 pb-2'>
                    <span>Last active: {group.lastActive}</span>
                    <div className='flex items-center gap-1'>
                      <TrendingUp className='h-3 w-3' />
                      <span>{group.activity} Activity</span>
                    </div>
                  </div>
                  <Button className='w-full bg-gradient-to-r from-[#007BFF] to-[#0B1B4D] hover:from-[#0056b3] hover:to-[#0B1B4D] text-white font-semibold py-3 rounded-lg transition-all duration-200 hover:scale-105'>
                    Join Group
                  </Button>
                </CardHeader>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Connect with Our Community Section */}
      <section className='py-20 px-4 sm:px-6 lg:px-8 bg-gray-50'>
        <div className='max-w-7xl mx-auto'>
          <div className='text-center mb-16'>
            <h3 className='text-3xl sm:text-4xl font-bold text-[#0B1B4D] mb-6'>
              Connect with Our Community
            </h3>
            <p className='text-lg text-gray-600 max-w-2xl mx-auto'>
              Join students, professors, and universities from around the world
            </p>
          </div>
          <div className='grid md:grid-cols-2 lg:grid-cols-4 gap-6'>
            {communityUsers.map((user) => (
              <Card
                key={user.id}
                className='border-0 shadow-xl hover:shadow-2xl transition-all duration-300 hover:scale-105 bg-gradient-to-br from-white via-gray-50 to-gray-100 rounded-2xl overflow-hidden group'
              >
                <div className='relative p-6'>
                  <div className='flex flex-col items-center text-center'>
                    <div className='relative mb-4'>
                      <img
                        src={user.avatar}
                        alt={user.name}
                        className='w-20 h-20 rounded-full border-4 border-white shadow-xl group-hover:scale-110 transition-transform duration-300'
                      />
                      <div className='absolute -bottom-1 -right-1 w-6 h-6 bg-green-500 rounded-full border-2 border-white flex items-center justify-center'>
                        <div className='w-2 h-2 bg-white rounded-full'></div>
                      </div>
                    </div>
                    <CardTitle className='text-lg font-bold text-[#0B1B4D] mb-2'>
                      {user.name}
                    </CardTitle>
                    <Badge
                      className={`bg-${user.color}-100 text-${user.color}-700 border-0 mb-2 font-semibold`}
                    >
                      {user.role}
                    </Badge>
                    <CardDescription className='text-gray-600 mb-2 font-medium'>
                      {(user.program || user.field || user.type) && (
                        <div className='flex items-center gap-2 justify-center'>
                          <Code className='h-4 w-4 text-blue-500' />
                          <span>{user.program || user.field || user.type}</span>
                        </div>
                      )}
                    </CardDescription>
                    <CardDescription className='text-gray-600 mb-2'>
                      {user.institution && (
                        <div className='flex items-center gap-2 justify-center'>
                          <School className='h-4 w-4 text-green-500' />
                          <span>{user.institution}</span>
                        </div>
                      )}
                    </CardDescription>
                    <CardDescription className='text-gray-600 mb-2'>
                      {(user.status ||
                        user.publications ||
                        user.ranking ||
                        user.students) && (
                        <div className='flex items-center gap-2 justify-center'>
                          <UserCheck className='h-4 w-4 text-purple-500' />
                          <span>
                            {user.status ||
                              user.publications ||
                              user.ranking ||
                              user.students}
                          </span>
                        </div>
                      )}
                    </CardDescription>
                    <div className='flex items-center gap-1 text-sm text-gray-500 mb-3'>
                      <MapPin className='h-3 w-3' />
                      <span>{user.location}</span>
                    </div>
                    <div className='flex items-center gap-2 mb-3'>
                      <div className='flex items-center gap-1'>
                        <Star className='h-3 w-3 text-yellow-400 fill-current' />
                        <span className='text-sm font-medium'>
                          {user.rating}
                        </span>
                      </div>
                      <div className='flex items-center gap-1'>
                        <Users className='h-3 w-3 text-blue-500' />
                        <span className='text-sm text-gray-500'>
                          {user.connections}
                        </span>
                      </div>
                    </div>
                    <div className='flex flex-wrap gap-1 mb-4 justify-center'>
                      {user.skills || user.fields
                        ? (user.skills || user.fields).map((skill, index) => (
                            <Badge
                              key={index}
                              className='bg-blue-100 text-blue-700 border-0 text-xs font-medium'
                            >
                              {skill}
                            </Badge>
                          ))
                        : null}
                    </div>
                    <div className='flex gap-2 w-full'>
                      <Button className='flex-1 bg-gradient-to-r from-[#007BFF] to-[#0B1B4D] hover:from-[#0056b3] hover:to-[#0B1B4D] text-white font-semibold py-2 rounded-lg text-sm transition-all duration-200 hover:scale-105'>
                        Connect
                      </Button>
                      <Button
                        variant='outline'
                        size='icon'
                        className='border-gray-300 hover:border-[#007BFF] hover:text-[#007BFF]'
                      >
                        <MessageCircle className='h-4 w-4' />
                      </Button>
                    </div>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Mentorship Section */}
      <section className='py-20 px-4 sm:px-6 lg:px-8 bg-white'>
        <div className='max-w-6xl mx-auto'>
          <div className='text-center mb-16'>
            <h3 className='text-3xl sm:text-4xl font-bold text-[#0B1B4D] mb-6'>
              Learn from the Best Professors
            </h3>
            <p className='text-lg text-gray-600 max-w-2xl mx-auto'>
              Book one-on-one mentorship sessions with world-class professors.
              Get personalized guidance for your academic and career journey.
            </p>
          </div>
          <div className='grid md:grid-cols-3 gap-8'>
            {professors.map((professor) => (
              <Card
                key={professor.id}
                className='border-0 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 bg-white'
              >
                <CardHeader className='flex flex-col items-center pb-4'>
                  <img
                    src={professor.avatar}
                    alt={professor.name}
                    className='w-20 h-20 rounded-full mb-4 border-4 border-gray-100 shadow'
                  />
                  <CardTitle className='text-lg font-bold text-[#0B1B4D] text-center'>
                    {professor.name}
                  </CardTitle>
                  <CardDescription className='text-gray-600 text-center'>
                    {professor.title}
                  </CardDescription>
                  <CardDescription className='text-gray-600 text-center pb-1'>
                    {professor.university}
                  </CardDescription>
                  <div className='flex items-center gap-1 pb-1'>
                    <Star className='h-5 w-5 text-yellow-400 fill-current' />
                    <span className='text-base text-gray-600'>
                      {professor.rating} ({professor.reviews})
                    </span>
                  </div>
                  <div className='text-lg font-semibold text-[#007BFF] pb-1'>
                    ${professor.hourlyRate}/hour
                  </div>
                  <div className='flex flex-wrap gap-2 pb-1 justify-center'>
                    {professor.specialties.map((specialty, index) => (
                      <Badge
                        key={index}
                        className='bg-blue-100 text-blue-700 border-0 text-xs'
                      >
                        {specialty}
                      </Badge>
                    ))}
                    <Badge className='bg-blue-100 text-blue-700 border-0 text-xs'>
                      +1
                    </Badge>
                  </div>
                  <div className='flex items-center gap-2 pb-1 text-sm text-gray-500'>
                    <Clock className='h-4 w-4' />
                    <span>{professor.sessions} sessions</span>
                  </div>
                  <div className='text-sm text-green-600 pb-2 font-medium'>
                    {professor.availability}
                  </div>
                  <div className='flex gap-2 w-full'>
                    <Button className='flex-1 bg-gradient-to-r from-[#007BFF] to-[#0B1B4D] hover:from-[#0056b3] hover:to-[#0B1B4D] text-white font-semibold'>
                      Book Session
                    </Button>
                    <Button
                      variant='outline'
                      size='icon'
                      className='border-gray-300 hover:border-[#007BFF] hover:text-[#007BFF]'
                    >
                      <MessageCircle className='h-4 w-4' />
                    </Button>
                    <Button
                      variant='outline'
                      size='icon'
                      className='border-gray-300 hover:border-[#007BFF] hover:text-[#007BFF]'
                    >
                      <User className='h-4 w-4' />
                    </Button>
                  </div>
                </CardHeader>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* How Mentorship Works Section */}
      <section className='py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50'>
        <div className='max-w-6xl mx-auto'>
          <div className='text-center mb-16'>
            <h3 className='text-3xl sm:text-4xl font-bold text-[#0B1B4D] mb-6'>
              How Mentorship Works
            </h3>
            <p className='text-lg text-gray-600 max-w-3xl mx-auto'>
              Get personalized guidance from world-class professors in just
              three simple steps
            </p>
          </div>

          <div className='grid md:grid-cols-3 gap-8'>
            <div className='relative group'>
              <div className='bg-white rounded-2xl p-8 shadow-xl hover:shadow-2xl transition-all duration-300 hover:scale-105 border border-gray-100'>
                <div className='relative mb-6'>
                  <div className='w-20 h-20 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-2xl flex items-center justify-center text-white mb-4 mx-auto shadow-lg group-hover:scale-110 transition-transform duration-300'>
                    <Calendar className='h-10 w-10' />
                  </div>
                  <div className='absolute -top-2 -right-2 w-8 h-8 bg-gradient-to-r from-yellow-400 to-orange-500 rounded-full flex items-center justify-center text-white text-sm font-bold'>
                    1
                  </div>
                </div>
                <h4 className='text-xl font-bold text-[#0B1B4D] mb-3 text-center'>
                  Book a Session
                </h4>
                <p className='text-gray-600 text-center leading-relaxed'>
                  Choose your mentor from our curated list of world-class
                  professors and schedule a convenient time for your
                  personalized session.
                </p>
                <div className='mt-6 flex items-center justify-center'>
                  <div className='flex items-center gap-2 text-sm text-gray-500'>
                    <Clock className='h-4 w-4' />
                    <span>Quick booking process</span>
                  </div>
                </div>
              </div>
            </div>

            <div className='relative group'>
              <div className='bg-white rounded-2xl p-8 shadow-xl hover:shadow-2xl transition-all duration-300 hover:scale-105 border border-gray-100'>
                <div className='relative mb-6'>
                  <div className='w-20 h-20 bg-gradient-to-br from-green-500 to-emerald-600 rounded-2xl flex items-center justify-center text-white mb-4 mx-auto shadow-lg group-hover:scale-110 transition-transform duration-300'>
                    <Video className='h-10 w-10' />
                  </div>
                  <div className='absolute -top-2 -right-2 w-8 h-8 bg-gradient-to-r from-yellow-400 to-orange-500 rounded-full flex items-center justify-center text-white text-sm font-bold'>
                    2
                  </div>
                </div>
                <h4 className='text-xl font-bold text-[#0B1B4D] mb-3 text-center'>
                  Meet Online
                </h4>
                <p className='text-gray-600 text-center leading-relaxed'>
                  Connect via high-quality video call for personalized guidance,
                  advice, and mentorship tailored to your academic goals.
                </p>
                <div className='mt-6 flex items-center justify-center'>
                  <div className='flex items-center gap-2 text-sm text-gray-500'>
                    <MessageSquare className='h-4 w-4' />
                    <span>Interactive sessions</span>
                  </div>
                </div>
              </div>
            </div>

            <div className='relative group'>
              <div className='bg-white rounded-2xl p-8 shadow-xl hover:shadow-2xl transition-all duration-300 hover:scale-105 border border-gray-100'>
                <div className='relative mb-6'>
                  <div className='w-20 h-20 bg-gradient-to-br from-purple-500 to-pink-600 rounded-2xl flex items-center justify-center text-white mb-4 mx-auto shadow-lg group-hover:scale-110 transition-transform duration-300'>
                    <GraduationCap className='h-10 w-10' />
                  </div>
                  <div className='absolute -top-2 -right-2 w-8 h-8 bg-gradient-to-r from-yellow-400 to-orange-500 rounded-full flex items-center justify-center text-white text-sm font-bold'>
                    3
                  </div>
                </div>
                <h4 className='text-xl font-bold text-[#0B1B4D] mb-3 text-center'>
                  Grow & Succeed
                </h4>
                <p className='text-gray-600 text-center leading-relaxed'>
                  Apply the insights and strategies from your mentorship
                  sessions to accelerate your academic and professional growth.
                </p>
                <div className='mt-6 flex items-center justify-center'>
                  <div className='flex items-center gap-2 text-sm text-gray-500'>
                    <TrendingUp className='h-4 w-4' />
                    <span>Track your progress</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className='text-center mt-12'>
            <Button
              size='lg'
              className='bg-gradient-to-r from-[#007BFF] to-[#0B1B4D] hover:from-[#0056b3] hover:to-[#0B1B4D] text-white px-8 py-4 text-lg font-semibold shadow-xl transition-transform duration-200 hover:scale-105'
            >
              Start Your Mentorship Journey
              <ArrowRight className='ml-2 h-5 w-5' />
            </Button>
          </div>
        </div>
      </section>

      {/* Join Our Community Section */}
      <section className='py-20 px-4 sm:px-6 lg:px-8 bg-white'>
        <div className='max-w-4xl mx-auto text-center'>
          <div className='flex items-center justify-center mb-6'>
            <img
              src='/logo.png'
              alt='Edfellow'
              className='w-12 h-12 rounded-full mr-3'
            />
            <h2 className='text-2xl font-bold text-[#0B1B4D]'>Edfellow</h2>
          </div>
          <h3 className='text-3xl sm:text-4xl font-bold text-[#0B1B4D] mb-4'>
            Join Our Community
          </h3>
          <p className='text-lg text-gray-600 mb-10'>
            Choose your role to get started
          </p>
          <div className='grid md:grid-cols-3 gap-8 mb-8'>
            <Card className='border-0 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 bg-gradient-to-br from-blue-50 to-indigo-50'>
              <CardHeader className='text-center pb-4'>
                <div className='w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4'>
                  <User className='h-8 w-8 text-blue-600' />
                </div>
                <CardTitle className='text-xl font-bold text-[#0B1B4D]'>
                  Student
                </CardTitle>
                <CardDescription className='text-gray-600'>
                  Connect with peers and professors in your field.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Button className='w-full bg-blue-600 hover:bg-blue-700 text-white'>
                  Continue as Student
                </Button>
              </CardContent>
            </Card>
            <Card className='border-0 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 bg-gradient-to-br from-green-50 to-emerald-50'>
              <CardHeader className='text-center pb-4'>
                <div className='w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4'>
                  <GraduationCap className='h-8 w-8 text-green-600' />
                </div>
                <CardTitle className='text-xl font-bold text-[#0B1B4D]'>
                  Professor
                </CardTitle>
                <CardDescription className='text-gray-600'>
                  Share expertise and mentor students.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Button className='w-full bg-green-600 hover:bg-green-700 text-white'>
                  Continue as Professor
                </Button>
              </CardContent>
            </Card>
            <Card className='border-0 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 bg-gradient-to-br from-orange-50 to-amber-50'>
              <CardHeader className='text-center pb-4'>
                <div className='w-16 h-16 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-4'>
                  <Building2 className='h-8 w-8 text-orange-600' />
                </div>
                <CardTitle className='text-xl font-bold text-[#0B1B4D]'>
                  University
                </CardTitle>
                <CardDescription className='text-gray-600'>
                  Promote programs and connect with students.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Button className='w-full bg-purple-600 hover:bg-purple-700 text-white'>
                  Continue as University
                </Button>
              </CardContent>
            </Card>
          </div>
          <p className='text-sm text-gray-500'>
            Already have an account?{' '}
            <a href='#' className='text-[#007BFF] hover:underline'>
              Sign in here
            </a>
          </p>
        </div>
      </section>

      {/* Footer */}
      <LandingFooter />
    </div>
  );
};

export default Index;
