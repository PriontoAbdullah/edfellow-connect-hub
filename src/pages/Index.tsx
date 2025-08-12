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
  ArrowLeft,
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
  DollarSign,
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import GlobalNavbar from '@/components/GlobalNavbar';
import { LandingFooter } from '@/components/LandingFooter';

const Index = () => {
  const navigate = useNavigate();
  const [featuredProgramsIndex, setFeaturedProgramsIndex] = useState(0);
  const [communityGroupsIndex, setCommunityGroupsIndex] = useState(0);
  const [professorsIndex, setProfessorsIndex] = useState(0);
  const [opportunitiesIndex, setOpportunitiesIndex] = useState(0);
  const [communityUsersIndex, setCommunityUsersIndex] = useState(0);

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
    {
      id: 4,
      university: 'Harvard University',
      logo: 'https://images.unsplash.com/photo-1562774053-701939374585?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80',
      program: 'MBA in Business Administration',
      duration: '2 years',
      location: 'Cambridge, MA',
      rating: 4.8,
      applications: 1500,
      description:
        'World-class business education with global networking opportunities.',
      image:
        'https://images.unsplash.com/photo-1554224155-6726b3ff858f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80',
      tag: 'Business',
      capacity: '1,800',
      cost: '$75,000/year',
    },
    {
      id: 5,
      university: 'Yale University',
      logo: 'https://images.unsplash.com/photo-1562774053-701939374585?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80',
      program: 'Master of Public Health',
      duration: '2 years',
      location: 'New Haven, CT',
      rating: 4.7,
      applications: 1100,
      description:
        'Comprehensive public health education with global health focus.',
      image:
        'https://images.unsplash.com/photo-1559757148-5c350d0d3c56?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80',
      tag: 'Healthcare',
      capacity: '1,500',
      cost: '$52,000/year',
    },
    {
      id: 6,
      university: 'Columbia University',
      logo: 'https://images.unsplash.com/photo-1562774053-701939374585?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80',
      program: 'Master of Architecture',
      duration: '3 years',
      location: 'New York, NY',
      rating: 4.6,
      applications: 900,
      description:
        'Innovative architecture program with urban design specialization.',
      image:
        'https://images.unsplash.com/photo-1541961017774-22349e4a1262?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80',
      tag: 'Architecture',
      capacity: '1,200',
      cost: '$68,000/year',
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
    {
      id: 4,
      name: 'Engineering Students Global',
      image:
        'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80',
      status: 'Very Active',
      members: '3,245',
      description:
        'Connect with engineering students worldwide. Share projects, discuss innovations, and collaborate on technical challenges.',
      tags: ['Engineering', 'Robotics', 'IoT'],
      color: 'purple',
      activity: 'High',
      lastActive: '1 hour ago',
      featured: true,
    },
    {
      id: 5,
      name: 'Arts & Humanities Network',
      image:
        'https://images.unsplash.com/photo-1541961017774-22349e4a1262?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80',
      status: 'Active',
      members: '1,892',
      description:
        'Explore literature, philosophy, history, and creative arts. Share your work and get feedback from peers.',
      tags: ['Literature', 'Philosophy', 'Arts'],
      color: 'pink',
      activity: 'Medium',
      lastActive: '3 hours ago',
      featured: false,
    },
    {
      id: 6,
      name: 'Environmental Science Alliance',
      image:
        'https://images.unsplash.com/photo-1559757148-5c350d0d3c56?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80',
      status: 'Very Active',
      members: '2,156',
      description:
        'Focus on sustainability, climate change, and environmental research. Collaborate on green initiatives.',
      tags: ['Sustainability', 'Climate', 'Research'],
      color: 'green',
      activity: 'High',
      lastActive: '30 minutes ago',
      featured: true,
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
    {
      id: 5,
      name: 'Dr. James Anderson',
      avatar:
        'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=400&q=80',
      role: 'Professor',
      field: 'Physics',
      institution: 'University of Cambridge',
      publications: '89 Publications',
      location: 'UK',
      skills: ['Quantum Physics', 'Research'],
      color: 'indigo',
      rating: 4.9,
      connections: 312,
    },
    {
      id: 6,
      name: "King's College London",
      avatar:
        'https://images.unsplash.com/photo-1562774053-701939374585?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=400&q=80',
      role: 'University',
      type: 'Public Research University',
      ranking: '#35 Global',
      students: '31,000+ Students',
      location: 'UK',
      fields: ['Medicine', 'Law', 'Humanities'],
      color: 'purple',
      rating: 4.8,
      connections: 2156,
    },
  ];

  const roles = [
    {
      id: 'student',
      title: 'For Students',
      icon: GraduationCap,
      tagline: 'Connect globally. Learn locally. Succeed personally.',
      description:
        'Join a network of students in your field from around the world. Get mentorship from professors, collaborate on projects, access career guidance, and explore global university opportunities that match your goals.',
      color: 'from-blue-600 to-indigo-600',
      features: [
        'Join study circles in your major with students worldwide',
        'Find professors for mentorship and career guidance',
        'Learn about international universities and application tips',
        'Get insights into career paths in your field',
        'Explore Student Space',
      ],
    },
    {
      id: 'professor',
      title: 'For Educators/Professors',
      icon: BookOpen,
      tagline: 'Share expertise. Mentor minds. Shape futures.',
      description:
        'Engage with passionate students across borders. Offer mentorship, teach specialized courses, guide admissions processes, and even hire research assistants from a global talent pool.',
      color: 'from-green-600 to-emerald-600',
      features: [
        'Mentor students in your area of specialization',
        'Offer one-on-one or group mentorship sessions (paid)',
        'Teach niche courses across borders',
        'Hire international research assistants',
        'Join as a Mentor/Educator/Expert',
      ],
    },
    {
      id: 'university',
      title: 'For Institutions/Universities',
      icon: Building2,
      tagline:
        'Reach farther. Recruit smarter. Build stronger alumni connections.',
      description:
        'Promote your programs worldwide, recruit top students and educators, and strengthen alumni networks with powerful tools for global engagement and outreach.',
      color: 'from-orange-600 to-amber-600',
      features: [
        'Promote your programs to a global student body',
        'Attract top educators and students',
        'Engage alumni through tailored tools',
        'Track outreach and engagement with powerful analytics',
        'Partner with Edfellow',
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
    {
      id: 4,
      name: 'Prof. David Rodriguez',
      avatar:
        'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=400&q=80',
      title: 'Data Science Professor',
      university: 'UC Berkeley',
      rating: 4.8,
      reviews: 89,
      hourlyRate: 70,
      specialties: ['Machine Learning', 'Statistics'],
      sessions: 623,
      availability: 'Next Available: Tomorrow',
      color: 'indigo',
    },
    {
      id: 5,
      name: 'Dr. Lisa Thompson',
      avatar:
        'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=400&q=80',
      title: 'Psychology Professor',
      university: 'Harvard University',
      rating: 4.9,
      reviews: 156,
      hourlyRate: 85,
      specialties: ['Clinical Psychology', 'Research Methods'],
      sessions: 892,
      availability: 'Available Today',
      color: 'purple',
    },
    {
      id: 6,
      name: 'Prof. James Wilson',
      avatar:
        'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=400&q=80',
      title: 'Environmental Science Professor',
      university: 'Yale University',
      rating: 4.7,
      reviews: 112,
      hourlyRate: 75,
      specialties: ['Climate Science', 'Sustainability'],
      sessions: 567,
      availability: 'Next Available: Tomorrow',
      color: 'green',
    },
  ];

  return (
    <div className='min-h-screen bg-white'>
      <GlobalNavbar />

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
        <div className='relative z-20 max-w-3xl mx-auto w-full flex flex-col items-center justify-center text-center mt-2'>
          <Badge className='bg-white/90 backdrop-blur-sm text-[#0A66C2] border-blue-200 mb-8 px-6 py-3 text-base font-semibold shadow-lg mx-auto hover:bg-white/90'>
            Global Academic Network
          </Badge>
          <h2 className='text-4xl sm:text-5xl font-bold text-gray-900 mb-6 leading-tight'>
            Welcome to <span className='text-[#0A66C2]'>Edfellow</span>
          </h2>
          <h3 className='text-xl sm:text-2xl font-semibold text-gray-700 mb-6'>
            Your Global Hub for Learning, Connecting, and Limitless Opportunity
          </h3>
          <p className='text-base text-gray-600 leading-relaxed max-w-2xl mx-auto'>
            Connect with a worldwide academic community built for collaboration,
            mentorship, and shared success.
          </p>
        </div>
      </section>

      {/* Role Teaser Section */}
      <section className='py-20 px-4 sm:px-6 lg:px-8 bg-white'>
        <div className='max-w-6xl mx-auto'>
          <div className='text-center mb-16'>
            <h3 className='text-2xl sm:text-3xl font-bold text-gray-900 mb-4'>
              How Edfellow Empowers You
            </h3>
            <p className='text-base text-gray-600 max-w-3xl mx-auto mb-4'>
              Choose your path and unlock a world of knowledge, mentorship, and
              global opportunity.
            </p>
            <p className='text-sm text-gray-500 max-w-3xl mx-auto'>
              At Edfellow, we believe education should be more than lectures and
              textbooks—it should be an experience that connects you to real
              people, real insights, and real opportunities across the world.
              Whether you're a student exploring your future, a professor eager
              to share your expertise, or an institution expanding your reach,
              Edfellow provides the tools, community, and connections to help
              you grow, wherever you are.
            </p>
          </div>

          <div className='grid md:grid-cols-3 gap-8'>
            {roles.map((role) => {
              const IconComponent = role.icon;
              return (
                <Card
                  key={role.id}
                  className='border border-gray-200 shadow-sm hover:shadow-md transition-all duration-300 bg-white hover:scale-105 rounded-lg p-2'
                >
                  <CardHeader className='text-center pb-6'>
                    <div
                      className={`inline-flex items-center justify-center w-20 h-20 bg-gradient-to-br ${role.color} rounded-2xl mb-6 mx-auto shadow-lg`}
                    >
                      <IconComponent className='h-10 w-10 text-white' />
                    </div>
                    <CardTitle className='text-xl font-bold text-gray-900 mb-2'>
                      {role.title}
                    </CardTitle>
                    <div className='text-[#0A66C2] font-semibold text-base pb-2'>
                      {role.tagline}
                    </div>
                    {/* <CardDescription className='text-gray-600 leading-relaxed mb-4'>
                      {role.description}
                    </CardDescription> */}
                    <ul className='text-left space-y-2 mb-2'>
                      {role.features.map((feature, idx) => (
                        <li
                          key={idx}
                          className='flex items-start gap-2 text-gray-600 text-sm'
                        >
                          <CheckCircle className='h-4 w-4 text-[#0A66C2] mt-0.5 flex-shrink-0' />
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
                      className='bg-[#0A66C2] hover:bg-[#084482] hover:shadow-md transition-all duration-200 w-full text-white font-semibold py-3 rounded-md'
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
      <section className='py-20 px-4 sm:px-6 lg:px-8 bg-gray-50'>
        <div className='max-w-8xl mx-auto'>
          <div className='flex justify-between items-center mb-16 px-12'>
            <div>
              <h3 className='text-2xl sm:text-3xl font-bold text-gray-900 mb-2'>
                Featured Programs
              </h3>
              <p className='text-base text-gray-600'>
                Discover world-class academic programs from top institutions
              </p>
            </div>
            <div className='flex gap-2'>
              <Button
                variant='outline'
                size='icon'
                onClick={() =>
                  setFeaturedProgramsIndex(
                    Math.max(0, featuredProgramsIndex - 1)
                  )
                }
                disabled={featuredProgramsIndex === 0}
                className='border-gray-300 hover:border-[#0A66C2] hover:text-[#0A66C2]'
              >
                <ArrowLeft className='h-4 w-4' />
              </Button>
              <Button
                variant='outline'
                size='icon'
                onClick={() =>
                  setFeaturedProgramsIndex(
                    Math.min(
                      Math.max(0, featuredPrograms.length - 4),
                      featuredProgramsIndex + 1
                    )
                  )
                }
                disabled={
                  featuredProgramsIndex >=
                  Math.max(0, featuredPrograms.length - 4)
                }
                className='border-gray-300 hover:border-[#0A66C2] hover:text-[#0A66C2]'
              >
                <ArrowRight className='h-4 w-4' />
              </Button>
            </div>
          </div>

          <div className='relative overflow-hidden px-12'>
            <div
              className='flex transition-transform duration-300 ease-in-out pb-8'
              style={{
                transform: `translateX(-${featuredProgramsIndex * 25}%)`,
              }}
            >
              {featuredPrograms.map((program) => (
                <div
                  key={program.id}
                  className='w-full md:w-1/4 flex-shrink-0 pr-8'
                >
                  <Card className='border border-gray-200 shadow-sm hover:shadow-md transition-all duration-300 hover:scale-105 bg-white rounded-lg overflow-hidden group'>
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
                      <CardTitle className='text-lg font-bold text-gray-900 mb-2'>
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
                      <div className='text-lg font-semibold text-[#0A66C2] mb-4'>
                        {program.cost}
                      </div>
                      <Button className='w-full bg-[#0A66C2] hover:bg-[#084482] text-white font-semibold py-3 rounded-md transition-all duration-200 hover:shadow-md'>
                        Learn More
                        <ExternalLink className='ml-2 h-4 w-4' />
                      </Button>
                    </CardContent>
                  </Card>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Opportunities Section */}
      <section className='py-20 px-4 sm:px-6 lg:px-8 bg-white'>
        <div className='max-w-8xl mx-auto'>
          <div className='flex justify-between items-center mb-16 px-12'>
            <div>
              <h3 className='text-2xl sm:text-3xl font-bold text-gray-900 mb-2'>
                Latest Opportunities
              </h3>
              <p className='text-base text-gray-600'>
                Discover job opportunities, scholarships, and research positions
                from top institutions worldwide.
              </p>
            </div>
            <div className='flex gap-2'>
              <Button
                variant='outline'
                size='icon'
                onClick={() =>
                  setOpportunitiesIndex(Math.max(0, opportunitiesIndex - 1))
                }
                disabled={opportunitiesIndex === 0}
                className='border-gray-300 hover:border-[#0A66C2] hover:text-[#0A66C2]'
              >
                <ArrowLeft className='h-4 w-4' />
              </Button>
              <Button
                variant='outline'
                size='icon'
                onClick={() =>
                  setOpportunitiesIndex(
                    Math.min(Math.max(0, 6 - 4), opportunitiesIndex + 1)
                  )
                }
                disabled={opportunitiesIndex >= Math.max(0, 6 - 4)}
                className='border-gray-300 hover:border-[#0A66C2] hover:text-[#0A66C2]'
              >
                <ArrowRight className='h-4 w-4' />
              </Button>
            </div>
          </div>
          <div className='relative overflow-hidden px-12'>
            <div
              className='flex transition-transform duration-300 ease-in-out pb-8'
              style={{
                transform: `translateX(-${opportunitiesIndex * 25}%)`,
              }}
            >
              <div className='w-full md:w-1/4 flex-shrink-0 pr-8'>
                <Card className='border border-gray-200 shadow-sm hover:shadow-md transition-all duration-300 hover:scale-105 bg-white rounded-lg overflow-hidden group'>
                  <div className='relative'>
                    <img
                      src='https://images.unsplash.com/photo-1559757148-5c350d0d3c56?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80'
                      alt='Research Position'
                      className='w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300'
                    />
                    <Badge className='absolute top-4 right-4 bg-green-100 text-green-700 border-0 font-semibold'>
                      Research
                    </Badge>
                    <div className='absolute bottom-4 left-4'>
                      <img
                        src='https://images.unsplash.com/photo-1562774053-701939374585?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=400&q=80'
                        alt='MIT'
                        className='w-12 h-12 rounded-full border-2 border-white shadow-lg'
                      />
                    </div>
                    <div className='absolute inset-0 bg-gradient-to-t from-black/20 to-transparent' />
                  </div>
                  <CardHeader className='pb-4 pt-6'>
                    <CardTitle className='text-lg font-bold text-gray-900 mb-2'>
                      AI Research Assistant
                    </CardTitle>
                    <CardDescription className='text-gray-600 mb-4 font-medium'>
                      MIT Computer Science
                    </CardDescription>
                    <div className='flex items-center space-x-1 mb-4'>
                      {[...Array(5)].map((_, i) => (
                        <Star
                          key={i}
                          className={`h-4 w-4 ${
                            i < 4
                              ? 'text-yellow-400 fill-current'
                              : 'text-gray-300'
                          }`}
                        />
                      ))}
                      <span className='text-sm text-gray-600 ml-1'>4.8</span>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className='flex items-center justify-between text-sm text-gray-500 mb-4'>
                      <div className='flex items-center gap-1'>
                        <MapPin className='h-4 w-4' />
                        <span>Cambridge, MA</span>
                      </div>
                      <div className='flex items-center gap-1'>
                        <Clock className='h-4 w-4' />
                        <span>Full-time</span>
                      </div>
                      <div className='flex items-center gap-1'>
                        <DollarSign className='h-4 w-4' />
                        <span>$45K/year</span>
                      </div>
                    </div>
                    <Button className='w-full bg-[#0A66C2] hover:bg-[#084482] text-white font-semibold py-3 rounded-md transition-all duration-200 hover:shadow-md'>
                      Apply Now
                      <ExternalLink className='ml-2 h-4 w-4' />
                    </Button>
                  </CardContent>
                </Card>
              </div>

              <div className='w-full md:w-1/4 flex-shrink-0 pr-8'>
                <Card className='border border-gray-200 shadow-sm hover:shadow-md transition-all duration-300 hover:scale-105 bg-white rounded-lg overflow-hidden group'>
                  <div className='relative'>
                    <img
                      src='https://images.unsplash.com/photo-1517077304055-6e89abbf09b0?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80'
                      alt='Scholarship'
                      className='w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300'
                    />
                    <Badge className='absolute top-4 right-4 bg-blue-100 text-blue-700 border-0 font-semibold'>
                      Scholarship
                    </Badge>
                    <div className='absolute bottom-4 left-4'>
                      <img
                        src='https://images.unsplash.com/photo-1562774053-701939374585?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=400&q=80'
                        alt='Stanford'
                        className='w-12 h-12 rounded-full border-2 border-white shadow-lg'
                      />
                    </div>
                    <div className='absolute inset-0 bg-gradient-to-t from-black/20 to-transparent' />
                  </div>
                  <CardHeader className='pb-4 pt-6'>
                    <CardTitle className='text-lg font-bold text-gray-900 mb-2'>
                      Full Scholarship - Computer Science
                    </CardTitle>
                    <CardDescription className='text-gray-600 mb-4 font-medium'>
                      Stanford University
                    </CardDescription>
                    <div className='flex items-center space-x-1 mb-4'>
                      {[...Array(5)].map((_, i) => (
                        <Star
                          key={i}
                          className={`h-4 w-4 ${
                            i < 5
                              ? 'text-yellow-400 fill-current'
                              : 'text-gray-300'
                          }`}
                        />
                      ))}
                      <span className='text-sm text-gray-600 ml-1'>4.9</span>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className='flex items-center justify-between text-sm text-gray-500 mb-4'>
                      <div className='flex items-center gap-1'>
                        <MapPin className='h-4 w-4' />
                        <span>Stanford, CA</span>
                      </div>
                      <div className='flex items-center gap-1'>
                        <Clock className='h-4 w-4' />
                        <span>PhD Program</span>
                      </div>
                      <div className='flex items-center gap-1'>
                        <DollarSign className='h-4 w-4' />
                        <span>Full Tuition</span>
                      </div>
                    </div>
                    <Button className='w-full bg-[#0A66C2] hover:bg-[#084482] text-white font-semibold py-3 rounded-md transition-all duration-200 hover:shadow-md'>
                      Apply Now
                      <ExternalLink className='ml-2 h-4 w-4' />
                    </Button>
                  </CardContent>
                </Card>
              </div>

              <div className='w-full md:w-1/4 flex-shrink-0 pr-8'>
                <Card className='border border-gray-200 shadow-sm hover:shadow-md transition-all duration-300 hover:scale-105 bg-white rounded-lg overflow-hidden group'>
                  <div className='relative'>
                    <img
                      src='https://images.unsplash.com/photo-1554224155-6726b3ff858f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80'
                      alt='Job Position'
                      className='w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300'
                    />
                    <Badge className='absolute top-4 right-4 bg-orange-100 text-orange-700 border-0 font-semibold'>
                      Job
                    </Badge>
                    <div className='absolute bottom-4 left-4'>
                      <img
                        src='https://images.unsplash.com/photo-1562774053-701939374585?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=400&q=80'
                        alt='Google'
                        className='w-12 h-12 rounded-full border-2 border-white shadow-lg'
                      />
                    </div>
                    <div className='absolute inset-0 bg-gradient-to-t from-black/20 to-transparent' />
                  </div>
                  <CardHeader className='pb-4 pt-6'>
                    <CardTitle className='text-lg font-bold text-gray-900 mb-2'>
                      Software Engineer - ML
                    </CardTitle>
                    <CardDescription className='text-gray-600 mb-4 font-medium'>
                      Google Research
                    </CardDescription>
                    <div className='flex items-center space-x-1 mb-4'>
                      {[...Array(5)].map((_, i) => (
                        <Star
                          key={i}
                          className={`h-4 w-4 ${
                            i < 4
                              ? 'text-yellow-400 fill-current'
                              : 'text-gray-300'
                          }`}
                        />
                      ))}
                      <span className='text-sm text-gray-600 ml-1'>4.7</span>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className='flex items-center justify-between text-sm text-gray-500 mb-4'>
                      <div className='flex items-center gap-1'>
                        <MapPin className='h-4 w-4' />
                        <span>Mountain View, CA</span>
                      </div>
                      <div className='flex items-center gap-1'>
                        <Clock className='h-4 w-4' />
                        <span>Full-time</span>
                      </div>
                      <div className='flex items-center gap-1'>
                        <DollarSign className='h-4 w-4' />
                        <span>$150K/year</span>
                      </div>
                    </div>
                    <Button className='w-full bg-[#0A66C2] hover:bg-[#084482] text-white font-semibold py-3 rounded-md transition-all duration-200 hover:shadow-md'>
                      Apply Now
                      <ExternalLink className='ml-2 h-4 w-4' />
                    </Button>
                  </CardContent>
                </Card>
              </div>

              <div className='w-full md:w-1/4 flex-shrink-0 pr-8'>
                <Card className='border border-gray-200 shadow-sm hover:shadow-md transition-all duration-300 hover:scale-105 bg-white rounded-lg overflow-hidden group'>
                  <div className='relative'>
                    <img
                      src='https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80'
                      alt='Internship'
                      className='w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300'
                    />
                    <Badge className='absolute top-4 right-4 bg-purple-100 text-purple-700 border-0 font-semibold'>
                      Internship
                    </Badge>
                    <div className='absolute bottom-4 left-4'>
                      <img
                        src='https://images.unsplash.com/photo-1562774053-701939374585?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=400&q=80'
                        alt='Microsoft'
                        className='w-12 h-12 rounded-full border-2 border-white shadow-lg'
                      />
                    </div>
                    <div className='absolute inset-0 bg-gradient-to-t from-black/20 to-transparent' />
                  </div>
                  <CardHeader className='pb-4 pt-6'>
                    <CardTitle className='text-lg font-bold text-gray-900 mb-2'>
                      Data Science Intern
                    </CardTitle>
                    <CardDescription className='text-gray-600 mb-4 font-medium'>
                      Microsoft Research
                    </CardDescription>
                    <div className='flex items-center space-x-1 mb-4'>
                      {[...Array(5)].map((_, i) => (
                        <Star
                          key={i}
                          className={`h-4 w-4 ${
                            i < 4
                              ? 'text-yellow-400 fill-current'
                              : 'text-gray-300'
                          }`}
                        />
                      ))}
                      <span className='text-sm text-gray-600 ml-1'>4.6</span>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className='flex items-center justify-between text-sm text-gray-500 mb-4'>
                      <div className='flex items-center gap-1'>
                        <MapPin className='h-4 w-4' />
                        <span>Redmond, WA</span>
                      </div>
                      <div className='flex items-center gap-1'>
                        <Clock className='h-4 w-4' />
                        <span>Summer 2024</span>
                      </div>
                      <div className='flex items-center gap-1'>
                        <DollarSign className='h-4 w-4' />
                        <span>$8K/month</span>
                      </div>
                    </div>
                    <Button className='w-full bg-[#0A66C2] hover:bg-[#084482] text-white font-semibold py-3 rounded-md transition-all duration-200 hover:shadow-md'>
                      Apply Now
                      <ExternalLink className='ml-2 h-4 w-4' />
                    </Button>
                  </CardContent>
                </Card>
              </div>

              <div className='w-full md:w-1/4 flex-shrink-0 pr-8'>
                <Card className='border border-gray-200 shadow-sm hover:shadow-md transition-all duration-300 hover:scale-105 bg-white rounded-lg overflow-hidden group'>
                  <div className='relative'>
                    <img
                      src='https://images.unsplash.com/photo-1559757148-5c350d0d3c56?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80'
                      alt='Healthcare Position'
                      className='w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300'
                    />
                    <Badge className='absolute top-4 right-4 bg-red-100 text-red-700 border-0 font-semibold'>
                      Healthcare
                    </Badge>
                    <div className='absolute bottom-4 left-4'>
                      <img
                        src='https://images.unsplash.com/photo-1562774053-701939374585?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=400&q=80'
                        alt='Johns Hopkins'
                        className='w-12 h-12 rounded-full border-2 border-white shadow-lg'
                      />
                    </div>
                    <div className='absolute inset-0 bg-gradient-to-t from-black/20 to-transparent' />
                  </div>
                  <CardHeader className='pb-4 pt-6'>
                    <CardTitle className='text-lg font-bold text-gray-900 mb-2'>
                      Medical Research Fellow
                    </CardTitle>
                    <CardDescription className='text-gray-600 mb-4 font-medium'>
                      Johns Hopkins Medicine
                    </CardDescription>
                    <div className='flex items-center space-x-1 mb-4'>
                      {[...Array(5)].map((_, i) => (
                        <Star
                          key={i}
                          className={`h-4 w-4 ${
                            i < 5
                              ? 'text-yellow-400 fill-current'
                              : 'text-gray-300'
                          }`}
                        />
                      ))}
                      <span className='text-sm text-gray-600 ml-1'>4.9</span>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className='flex items-center justify-between text-sm text-gray-500 mb-4'>
                      <div className='flex items-center gap-1'>
                        <MapPin className='h-4 w-4' />
                        <span>Baltimore, MD</span>
                      </div>
                      <div className='flex items-center gap-1'>
                        <Clock className='h-4 w-4' />
                        <span>2 years</span>
                      </div>
                      <div className='flex items-center gap-1'>
                        <DollarSign className='h-4 w-4' />
                        <span>$65K/year</span>
                      </div>
                    </div>
                    <Button className='w-full bg-[#0A66C2] hover:bg-[#084482] text-white font-semibold py-3 rounded-md transition-all duration-200 hover:shadow-md'>
                      Apply Now
                      <ExternalLink className='ml-2 h-4 w-4' />
                    </Button>
                  </CardContent>
                </Card>
              </div>

              <div className='w-full md:w-1/4 flex-shrink-0 pr-8'>
                <Card className='border border-gray-200 shadow-sm hover:shadow-md transition-all duration-300 hover:scale-105 bg-white rounded-lg overflow-hidden group'>
                  <div className='relative'>
                    <img
                      src='https://images.unsplash.com/photo-1541961017774-22349e4a1262?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80'
                      alt='Design Position'
                      className='w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300'
                    />
                    <Badge className='absolute top-4 right-4 bg-indigo-100 text-indigo-700 border-0 font-semibold'>
                      Design
                    </Badge>
                    <div className='absolute bottom-4 left-4'>
                      <img
                        src='https://images.unsplash.com/photo-1562774053-701939374585?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=400&q=80'
                        alt='Apple'
                        className='w-12 h-12 rounded-full border-2 border-white shadow-lg'
                      />
                    </div>
                    <div className='absolute inset-0 bg-gradient-to-t from-black/20 to-transparent' />
                  </div>
                  <CardHeader className='pb-4 pt-6'>
                    <CardTitle className='text-lg font-bold text-gray-900 mb-2'>
                      UX/UI Designer
                    </CardTitle>
                    <CardDescription className='text-gray-600 mb-4 font-medium'>
                      Apple Design Team
                    </CardDescription>
                    <div className='flex items-center space-x-1 mb-4'>
                      {[...Array(5)].map((_, i) => (
                        <Star
                          key={i}
                          className={`h-4 w-4 ${
                            i < 4
                              ? 'text-yellow-400 fill-current'
                              : 'text-gray-300'
                          }`}
                        />
                      ))}
                      <span className='text-sm text-gray-600 ml-1'>4.7</span>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className='flex items-center justify-between text-sm text-gray-500 mb-4'>
                      <div className='flex items-center gap-1'>
                        <MapPin className='h-4 w-4' />
                        <span>Cupertino, CA</span>
                      </div>
                      <div className='flex items-center gap-1'>
                        <Clock className='h-4 w-4' />
                        <span>Full-time</span>
                      </div>
                      <div className='flex items-center gap-1'>
                        <DollarSign className='h-4 w-4' />
                        <span>$120K/year</span>
                      </div>
                    </div>
                    <Button className='w-full bg-[#0A66C2] hover:bg-[#084482] text-white font-semibold py-3 rounded-md transition-all duration-200 hover:shadow-md'>
                      Apply Now
                      <ExternalLink className='ml-2 h-4 w-4' />
                    </Button>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Connect by Your Major Section */}
      <section className='py-20 px-4 sm:px-6 lg:px-8 bg-gray-50'>
        <div className='max-w-8xl mx-auto'>
          <div className='flex justify-between items-center mb-16 px-12'>
            <div>
              <h3 className='text-2xl sm:text-3xl font-bold text-gray-900 mb-2'>
                Connect by Your Major
              </h3>
              <p className='text-base text-gray-600'>
                Join subject-specific communities where students with similar
                academic interests connect, collaborate, and grow together.
              </p>
            </div>
            <div className='flex gap-2'>
              <Button
                variant='outline'
                size='icon'
                onClick={() =>
                  setCommunityGroupsIndex(Math.max(0, communityGroupsIndex - 1))
                }
                disabled={communityGroupsIndex === 0}
                className='border-gray-300 hover:border-[#0A66C2] hover:text-[#0A66C2]'
              >
                <ArrowLeft className='h-4 w-4' />
              </Button>
              <Button
                variant='outline'
                size='icon'
                onClick={() =>
                  setCommunityGroupsIndex(
                    Math.min(Math.max(0, 6 - 4), communityGroupsIndex + 1)
                  )
                }
                disabled={communityGroupsIndex >= Math.max(0, 6 - 4)}
                className='border-gray-300 hover:border-[#0A66C2] hover:text-[#0A66C2]'
              >
                <ArrowRight className='h-4 w-4' />
              </Button>
            </div>
          </div>
          <div className='relative overflow-hidden px-12'>
            <div
              className='flex transition-transform duration-300 ease-in-out pb-8'
              style={{
                transform: `translateX(-${communityGroupsIndex * 25}%)`,
              }}
            >
              {communityGroups.map((group) => (
                <div
                  key={group.id}
                  className='w-full md:w-1/4 flex-shrink-0 pr-8'
                >
                  <Card className='border border-gray-200 shadow-sm hover:shadow-md transition-all duration-300 hover:scale-105 bg-white rounded-lg overflow-hidden group relative'>
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
                      <CardTitle className='text-lg font-bold text-gray-900 pb-2'>
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
                      <Button className='w-full bg-[#0A66C2] hover:bg-[#084482] text-white font-semibold py-3 rounded-md transition-all duration-200 hover:shadow-md'>
                        Join Group
                      </Button>
                    </CardHeader>
                  </Card>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Connect with Our Community Section */}
      <section className='py-20 px-4 sm:px-6 lg:px-8 bg-white'>
        <div className='max-w-8xl mx-auto'>
          <div className='flex justify-between items-center mb-16 px-12'>
            <div>
              <h3 className='text-2xl sm:text-3xl font-bold text-gray-900 mb-2'>
                Connect with Our Community
              </h3>
              <p className='text-base text-gray-600'>
                Join students, professors, and universities from around the
                world
              </p>
            </div>
            <div className='flex gap-2'>
              <Button
                variant='outline'
                size='icon'
                onClick={() =>
                  setCommunityUsersIndex(Math.max(0, communityUsersIndex - 1))
                }
                disabled={communityUsersIndex === 0}
                className='border-gray-300 hover:border-[#0A66C2] hover:text-[#0A66C2]'
              >
                <ArrowLeft className='h-4 w-4' />
              </Button>
              <Button
                variant='outline'
                size='icon'
                onClick={() =>
                  setCommunityUsersIndex(
                    Math.min(Math.max(0, 6 - 4), communityUsersIndex + 1)
                  )
                }
                disabled={communityUsersIndex >= Math.max(0, 6 - 4)}
                className='border-gray-300 hover:border-[#0A66C2] hover:text-[#0A66C2]'
              >
                <ArrowRight className='h-4 w-4' />
              </Button>
            </div>
          </div>
          <div className='relative overflow-hidden px-12'>
            <div
              className='flex transition-transform duration-300 ease-in-out pb-8'
              style={{
                transform: `translateX(-${communityUsersIndex * 25}%)`,
              }}
            >
              {communityUsers.map((user) => (
                <div
                  key={user.id}
                  className='w-full md:w-1/4 flex-shrink-0 pr-8'
                >
                  <Card
                    key={user.id}
                    className='border border-gray-200 shadow-sm hover:shadow-md transition-all duration-300 hover:scale-105 bg-white rounded-lg overflow-hidden group'
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
                        <CardTitle className='text-base font-bold text-gray-900 mb-2'>
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
                              <span>
                                {user.program || user.field || user.type}
                              </span>
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
                            ? (user.skills || user.fields).map(
                                (skill, index) => (
                                  <Badge
                                    key={index}
                                    className='bg-blue-100 text-blue-700 border-0 text-xs font-medium'
                                  >
                                    {skill}
                                  </Badge>
                                )
                              )
                            : null}
                        </div>
                        <div className='flex gap-2 w-full'>
                          <Button className='flex-1 bg-[#0A66C2] hover:bg-[#084482] text-white font-semibold py-2 rounded-md text-sm transition-all duration-200 hover:shadow-md'>
                            Connect
                          </Button>
                          <Button
                            variant='outline'
                            size='icon'
                            className='border-gray-300 hover:border-[#0A66C2] hover:text-[#0A66C2]'
                          >
                            <MessageCircle className='h-4 w-4' />
                          </Button>
                        </div>
                      </div>
                    </div>
                  </Card>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Mentorship Section */}
      <section className='py-20 px-4 sm:px-6 lg:px-8 bg-gray-50'>
        <div className='max-w-8xl mx-auto'>
          <div className='flex justify-between items-center mb-16 px-12'>
            <div>
              <h3 className='text-2xl sm:text-3xl font-bold text-gray-900 mb-2'>
                Learn from the Best Professors
              </h3>
              <p className='text-base text-gray-600'>
                Book one-on-one mentorship sessions with world-class professors.
                Get personalized guidance for your academic and career journey.
              </p>
            </div>
            <div className='flex gap-2'>
              <Button
                variant='outline'
                size='icon'
                onClick={() =>
                  setProfessorsIndex(Math.max(0, professorsIndex - 1))
                }
                disabled={professorsIndex === 0}
                className='border-gray-300 hover:border-[#0A66C2] hover:text-[#0A66C2]'
              >
                <ArrowLeft className='h-4 w-4' />
              </Button>
              <Button
                variant='outline'
                size='icon'
                onClick={() =>
                  setProfessorsIndex(
                    Math.min(Math.max(0, 6 - 4), professorsIndex + 1)
                  )
                }
                disabled={professorsIndex >= Math.max(0, 6 - 4)}
                className='border-gray-300 hover:border-[#0A66C2] hover:text-[#0A66C2]'
              >
                <ArrowRight className='h-4 w-4' />
              </Button>
            </div>
          </div>
          <div className='relative overflow-hidden px-12'>
            <div
              className='flex transition-transform duration-300 ease-in-out pb-8'
              style={{
                transform: `translateX(-${professorsIndex * 25}%)`,
              }}
            >
              {professors.map((professor) => (
                <div
                  key={professor.id}
                  className='w-full md:w-1/4 flex-shrink-0 pr-8'
                >
                  <Card className='border border-gray-200 shadow-sm hover:shadow-md transition-all duration-300 hover:scale-105 bg-white rounded-lg'>
                    <CardHeader className='flex flex-col items-center pb-4'>
                      <img
                        src={professor.avatar}
                        alt={professor.name}
                        className='w-20 h-20 rounded-full mb-4 border-4 border-gray-100 shadow'
                      />
                      <CardTitle className='text-base font-bold text-gray-900 text-center'>
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
                      <div className='text-lg font-semibold text-[#0A66C2] pb-1'>
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
                        <Button className='flex-1 bg-[#0A66C2] hover:bg-[#084482] text-white font-semibold'>
                          Book Session
                        </Button>
                        <Button
                          variant='outline'
                          size='icon'
                          className='border-gray-300 hover:border-[#0A66C2] hover:text-[#0A66C2]'
                        >
                          <MessageCircle className='h-4 w-4' />
                        </Button>
                        <Button
                          variant='outline'
                          size='icon'
                          className='border-gray-300 hover:border-[#0A66C2] hover:text-[#0A66C2]'
                        >
                          <User className='h-4 w-4' />
                        </Button>
                      </div>
                    </CardHeader>
                  </Card>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* How Mentorship Works Section */}
      <section className='py-20 px-4 sm:px-6 lg:px-8 bg-white'>
        <div className='max-w-7xl mx-auto px-12'>
          <div className='text-center mb-16'>
            <h3 className='text-2xl sm:text-3xl font-bold text-gray-900 mb-4'>
              How Mentorship Works
            </h3>
            <p className='text-base text-gray-600 max-w-3xl mx-auto'>
              Get personalized guidance from world-class professors in just
              three simple steps
            </p>
          </div>

          <div className='grid md:grid-cols-3 gap-8'>
            <div className='relative group'>
              <div className='bg-white rounded-lg p-8 shadow-sm hover:shadow-md transition-all duration-300 hover:scale-105 border border-gray-200'>
                <div className='relative mb-6'>
                  <div className='w-20 h-20 bg-[#0A66C2] rounded-lg flex items-center justify-center text-white mb-4 mx-auto shadow-sm group-hover:scale-110 transition-transform duration-300'>
                    <Calendar className='h-10 w-10' />
                  </div>
                  <div className='absolute -top-2 -right-2 w-8 h-8 bg-[#0A66C2] rounded-full flex items-center justify-center text-white text-sm font-bold'>
                    1
                  </div>
                </div>
                <h4 className='text-lg font-bold text-gray-900 mb-3 text-center'>
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
              <div className='bg-white rounded-lg p-8 shadow-sm hover:shadow-md transition-all duration-300 hover:scale-105 border border-gray-200'>
                <div className='relative mb-6'>
                  <div className='w-20 h-20 bg-[#0A66C2] rounded-lg flex items-center justify-center text-white mb-4 mx-auto shadow-sm group-hover:scale-110 transition-transform duration-300'>
                    <Video className='h-10 w-10' />
                  </div>
                  <div className='absolute -top-2 -right-2 w-8 h-8 bg-[#0A66C2] rounded-full flex items-center justify-center text-white text-sm font-bold'>
                    2
                  </div>
                </div>
                <h4 className='text-lg font-bold text-gray-900 mb-3 text-center'>
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
              <div className='bg-white rounded-lg p-8 shadow-sm hover:shadow-md transition-all duration-300 hover:scale-105 border border-gray-200'>
                <div className='relative mb-6'>
                  <div className='w-20 h-20 bg-[#0A66C2] rounded-lg flex items-center justify-center text-white mb-4 mx-auto shadow-sm group-hover:scale-110 transition-transform duration-300'>
                    <GraduationCap className='h-10 w-10' />
                  </div>
                  <div className='absolute -top-2 -right-2 w-8 h-8 bg-[#0A66C2] rounded-full flex items-center justify-center text-white text-sm font-bold'>
                    3
                  </div>
                </div>
                <h4 className='text-lg font-bold text-gray-900 mb-3 text-center'>
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
              className='bg-[#0A66C2] hover:bg-[#084482] text-white px-8 py-4 text-lg font-semibold shadow-md transition-all duration-200 hover:shadow-lg rounded-md'
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
          <h3 className='text-2xl sm:text-3xl font-bold text-gray-900 mb-4'>
            Join Our Community
          </h3>
          <p className='text-base text-gray-600 mb-10'>
            Choose your role to get started
          </p>
          <div className='grid md:grid-cols-3 gap-8 mb-8'>
            <Card className='border border-gray-200 shadow-sm hover:shadow-md transition-all duration-300 hover:scale-105 bg-white'>
              <CardHeader className='text-center pb-4'>
                <div className='w-16 h-16 bg-[#0A66C2]/10 rounded-full flex items-center justify-center mx-auto mb-4'>
                  <User className='h-8 w-8 text-[#0A66C2]' />
                </div>
                <CardTitle className='text-lg font-bold text-gray-900'>
                  Student
                </CardTitle>
                <CardDescription className='text-gray-600'>
                  Connect with peers and professors in your field.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Button className='w-full bg-[#0A66C2] hover:bg-[#084482] text-white'>
                  Explore Student Space
                </Button>
              </CardContent>
            </Card>
            <Card className='border border-gray-200 shadow-sm hover:shadow-md transition-all duration-300 hover:scale-105 bg-white'>
              <CardHeader className='text-center pb-4'>
                <div className='w-16 h-16 bg-[#0A66C2]/10 rounded-full flex items-center justify-center mx-auto mb-4'>
                  <GraduationCap className='h-8 w-8 text-[#0A66C2]' />
                </div>
                <CardTitle className='text-lg font-bold text-gray-900'>
                  Professor
                </CardTitle>
                <CardDescription className='text-gray-600'>
                  Share expertise and mentor students.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Button className='w-full bg-[#0A66C2] hover:bg-[#084482] text-white'>
                  Join as a Mentor/Educator/Expert
                </Button>
              </CardContent>
            </Card>
            <Card className='border border-gray-200 shadow-sm hover:shadow-md transition-all duration-300 hover:scale-105 bg-white'>
              <CardHeader className='text-center pb-4'>
                <div className='w-16 h-16 bg-[#0A66C2]/10 rounded-full flex items-center justify-center mx-auto mb-4'>
                  <Building2 className='h-8 w-8 text-[#0A66C2]' />
                </div>
                <CardTitle className='text-lg font-bold text-gray-900'>
                  University
                </CardTitle>
                <CardDescription className='text-gray-600'>
                  Promote programs and connect with students.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Button className='w-full bg-[#0A66C2] hover:bg-[#084482] text-white'>
                  Partner with Edfellow
                </Button>
              </CardContent>
            </Card>
          </div>
          <p className='text-sm text-gray-500'>
            Already have an account?{' '}
            <a href='#' className='text-[#0A66C2] hover:underline'>
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
