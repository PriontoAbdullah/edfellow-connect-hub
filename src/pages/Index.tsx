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
import { motion } from 'framer-motion';

// Import our new dynamic components
import { StatisticsSection } from '@/components/landing/StatisticsSection';
import { FeaturedPrograms } from '@/components/landing/FeaturedPrograms';
import { RecentPosts } from '@/components/landing/RecentPosts';
import { TestimonialsSection } from '@/components/landing/TestimonialsSection';
import { CommunityGroups } from '@/components/landing/CommunityGroups';
import { CommunityUsers } from '@/components/landing/CommunityUsers';
import { FeaturedProfessors } from '@/components/landing/FeaturedProfessors';
import { Opportunities } from '@/components/landing/Opportunities';

// Animation variants
const fadeInUp = {
  initial: { opacity: 0, y: 60 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.6, ease: 'easeOut' },
};

const staggerContainer = {
  animate: {
    transition: {
      staggerChildren: 0.1,
    },
  },
};

const fadeInScale = {
  initial: { opacity: 0, scale: 0.9 },
  animate: { opacity: 1, scale: 1 },
  transition: { duration: 0.5, ease: 'easeOut' },
};

const slideInLeft = {
  initial: { opacity: 0, x: -60 },
  animate: { opacity: 1, x: 0 },
  transition: { duration: 0.6, ease: 'easeOut' },
};

const slideInRight = {
  initial: { opacity: 0, x: 60 },
  animate: { opacity: 1, x: 0 },
  transition: { duration: 0.6, ease: 'easeOut' },
};

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
      <motion.section
        className='relative py-12 sm:py-16 lg:py-20 px-4 sm:px-6 lg:px-8 overflow-hidden min-h-[400px] sm:min-h-[500px] lg:min-h-[600px] flex items-center justify-center'
        initial='initial'
        whileInView='animate'
        viewport={{ once: true, amount: 0.3 }}
        variants={fadeInUp}
      >
        {/* Globe SVG Background */}
        <motion.img
          src='/globe.svg'
          alt='Global Network Globe'
          className='absolute inset-0 w-full h-full object-cover opacity-35 pointer-events-none select-none z-0'
          style={{ objectPosition: 'center top' }}
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 0.35 }}
          transition={{ duration: 1.2, ease: 'easeOut' }}
        />
        {/* Overlay for readability */}
        <div className='absolute inset-0 bg-gradient-to-b from-white/40 via-blue-50/30 to-indigo-100/40 z-10' />
        <motion.div
          className='relative z-20 max-w-3xl mx-auto w-full flex flex-col items-center justify-center text-center mt-2 px-4'
          variants={staggerContainer}
        >
          <motion.div variants={fadeInUp}>
            <Badge className='bg-white/90 backdrop-blur-sm text-[#0A66C2] border-blue-200 mb-6 sm:mb-8 px-4 sm:px-6 py-2 sm:py-3 text-sm sm:text-base font-semibold shadow-lg mx-auto hover:bg-white/90'>
              Global Academic Network
            </Badge>
          </motion.div>
          <motion.h2
            className='text-2xl sm:text-3xl lg:text-4xl xl:text-5xl font-bold text-gray-900 mb-3 sm:mb-4 lg:mb-6 leading-tight px-2'
            variants={fadeInUp}
          >
            Welcome to <span className='text-[#0A66C2]'>Edfellow</span>
          </motion.h2>
          <motion.h3
            className='text-base sm:text-lg lg:text-xl xl:text-2xl font-semibold text-gray-700 mb-3 sm:mb-4 lg:mb-6 px-2'
            variants={fadeInUp}
          >
            Your Global Hub for Learning, Connecting, and Limitless Opportunity
          </motion.h3>
          <motion.p
            className='text-xs sm:text-sm lg:text-base text-gray-600 leading-relaxed max-w-2xl mx-auto px-2'
            variants={fadeInUp}
          >
            Connect with a worldwide academic community built for collaboration,
            mentorship, and shared success.
          </motion.p>
        </motion.div>
      </motion.section>

      {/* Role Teaser Section */}
      <motion.section
        className='py-8 sm:py-12 lg:py-16 px-4 sm:px-6 lg:px-8 bg-white'
        initial='initial'
        whileInView='animate'
        viewport={{ once: true, amount: 0.2 }}
        variants={fadeInUp}
      >
        <div className='max-w-6xl mx-auto'>
          <motion.div
            className='text-center mb-8 sm:mb-12 lg:mb-16'
            variants={staggerContainer}
          >
            <motion.h3
              className='text-lg sm:text-xl lg:text-2xl xl:text-3xl font-bold text-gray-900 mb-3 sm:mb-4'
              variants={fadeInUp}
            >
              How Edfellow Empowers You
            </motion.h3>
            <motion.p
              className='text-xs sm:text-sm lg:text-base text-gray-600 max-w-3xl mx-auto mb-3 sm:mb-4 px-4'
              variants={fadeInUp}
            >
              Choose your path and unlock a world of knowledge, mentorship, and
              global opportunity.
            </motion.p>
            <motion.p
              className='text-xs sm:text-sm text-gray-500 max-w-3xl mx-auto px-4'
              variants={fadeInUp}
            >
              At Edfellow, we believe education should be more than lectures and
              textbooks—it should be an experience that connects you to real
              people, real insights, and real opportunities across the world.
              Whether you're a student exploring your future, a professor eager
              to share your expertise, or an institution expanding your reach,
              Edfellow provides the tools, community, and connections to help
              you grow, wherever you are.
            </motion.p>
          </motion.div>

          <motion.div
            className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 lg:gap-8'
            variants={staggerContainer}
          >
            {roles.map((role, index) => {
              const IconComponent = role.icon;
              return (
                <motion.div
                  key={role.id}
                  variants={fadeInScale}
                  whileHover={{ scale: 1.02 }}
                  transition={{ duration: 0.3 }}
                >
                  <Card className='border border-gray-200 shadow-sm hover:shadow-md transition-all duration-300 bg-white rounded-lg p-2 h-full'>
                    <CardHeader className='text-center pb-4 sm:pb-6'>
                      <motion.div
                        className={`inline-flex items-center justify-center w-16 h-16 sm:w-20 sm:h-20 bg-gradient-to-br ${role.color} rounded-2xl mb-4 sm:mb-6 mx-auto shadow-lg`}
                        whileHover={{ rotate: 5, scale: 1.1 }}
                        transition={{ duration: 0.3 }}
                      >
                        <IconComponent className='h-8 w-8 sm:h-10 sm:w-10 text-white' />
                      </motion.div>
                      <CardTitle className='text-lg sm:text-xl font-bold text-gray-900 mb-2'>
                        {role.title}
                      </CardTitle>
                      <div className='text-[#0A66C2] font-semibold text-sm sm:text-base pb-2'>
                        {role.tagline}
                      </div>
                      <ul className='text-left space-y-2 mb-2'>
                        {role.features.map((feature, idx) => (
                          <motion.li
                            key={idx}
                            className='flex items-start gap-2 text-gray-600 text-xs sm:text-sm'
                            initial={{ opacity: 0, x: -20 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            transition={{ delay: idx * 0.1 }}
                            viewport={{ once: true }}
                          >
                            <CheckCircle className='h-3 w-3 sm:h-4 sm:w-4 text-[#0A66C2] mt-0.5 flex-shrink-0' />
                            <span>{feature}</span>
                          </motion.li>
                        ))}
                      </ul>
                    </CardHeader>
                    <CardContent className='text-center'>
                      <Button
                        onClick={() =>
                          navigate('/signup', { state: { role: role.id } })
                        }
                        className='bg-[#0A66C2] hover:bg-[#084482] hover:shadow-md transition-all duration-200 w-full text-white font-semibold py-2 sm:py-3 rounded-md text-sm sm:text-base'
                      >
                        Explore More
                        <ArrowRight className='ml-2 h-3 w-3 sm:h-4 sm:w-4' />
                      </Button>
                    </CardContent>
                  </Card>
                </motion.div>
              );
            })}
          </motion.div>
        </div>
      </motion.section>

      {/* Dynamic Featured Programs Section */}
      <FeaturedPrograms />

      {/* Dynamic Opportunities Section */}
      <Opportunities />

      {/* Dynamic Community Groups Section */}
      <CommunityGroups />

      {/* Dynamic Community Users Section */}
      <CommunityUsers />

      {/* Dynamic Featured Professors Section */}
      <FeaturedProfessors />

      {/* How Mentorship Works Section */}
      <motion.section
        className='py-20 px-4 sm:px-6 lg:px-8 bg-white'
        initial='initial'
        whileInView='animate'
        viewport={{ once: true, amount: 0.2 }}
        variants={fadeInUp}
      >
        <div className='max-w-7xl mx-auto px-12'>
          <motion.div className='text-center mb-16' variants={staggerContainer}>
            <motion.h3
              className='text-2xl sm:text-3xl font-bold text-gray-900 mb-4'
              variants={fadeInUp}
            >
              How Mentorship Works
            </motion.h3>
            <motion.p
              className='text-base text-gray-600 max-w-3xl mx-auto'
              variants={fadeInUp}
            >
              Get personalized guidance from world-class professors in just
              three simple steps
            </motion.p>
          </motion.div>

          <motion.div
            className='grid md:grid-cols-3 gap-8'
            variants={staggerContainer}
          >
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
          </motion.div>

          <motion.div className='text-center mt-12' variants={fadeInUp}>
            <Button
              size='lg'
              className='bg-[#0A66C2] hover:bg-[#084482] text-white px-4 sm:px-8 py-3 sm:py-4 text-base sm:text-lg font-semibold shadow-md transition-all duration-200 hover:shadow-lg rounded-md w-full sm:w-auto'
            >
              Start Your Mentorship Journey
              <ArrowRight className='ml-2 h-4 w-4 sm:h-5 sm:w-5' />
            </Button>
          </motion.div>
        </div>
      </motion.section>

      {/* Join Our Community Section */}
      <motion.section
        className='py-20 px-4 sm:px-6 lg:px-8 bg-white'
        initial='initial'
        whileInView='animate'
        viewport={{ once: true, amount: 0.2 }}
        variants={fadeInUp}
      >
        <div className='max-w-4xl mx-auto text-center'>
          <motion.div
            className='flex items-center justify-center mb-6'
            variants={fadeInUp}
          >
            <img
              src='/logo.png'
              alt='Edfellow'
              className='w-12 h-12 rounded-full mr-3'
            />
            <h2 className='text-2xl font-bold text-[#0B1B4D]'>Edfellow</h2>
          </motion.div>
          <motion.h3
            className='text-2xl sm:text-3xl font-bold text-gray-900 mb-4'
            variants={fadeInUp}
          >
            Join Our Community
          </motion.h3>
          <motion.p
            className='text-base text-gray-600 mb-10'
            variants={fadeInUp}
          >
            Choose your role to get started
          </motion.p>
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
          <motion.p className='text-sm text-gray-500' variants={fadeInUp}>
            Already have an account?{' '}
            <a href='#' className='text-[#0A66C2] hover:underline'>
              Sign in here
            </a>
          </motion.p>
        </div>
      </motion.section>

      {/* Dynamic Statistics Section */}
      <StatisticsSection />

      {/* Dynamic Recent Posts Section */}
      <RecentPosts />

      {/* Dynamic Testimonials Section */}
      <TestimonialsSection />

      {/* Footer */}
      <LandingFooter />
    </div>
  );
};

export default Index;
