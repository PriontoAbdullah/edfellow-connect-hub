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
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import {
  GraduationCap,
  Users,
  Star,
  MapPin,
  Clock,
  Video,
  MessageSquare,
  Calendar,
  Search,
  Filter,
  BookOpen,
  Award,
  TrendingUp,
  Heart,
  UserCheck,
  Globe,
  ArrowRight,
  CheckCircle,
  Play,
  DollarSign,
  MessageCircle,
  Phone,
  Mail,
  User,
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import GlobalNavbar from '@/components/GlobalNavbar';
import { LandingFooter } from '@/components/LandingFooter';
import { motion } from 'framer-motion';

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

const Mentorship = () => {
  const navigate = useNavigate();
  const [selectedField, setSelectedField] = useState('');
  const [selectedExperience, setSelectedExperience] = useState('');
  const [selectedPrice, setSelectedPrice] = useState('');

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
      specialties: ['Machine Learning', 'Data Science', 'AI'],
      sessions: 847,
      availability: 'Available Today',
      color: 'blue',
      experience: '15+ years',
      location: 'Stanford, CA',
      languages: ['English', 'Spanish'],
      description:
        'Expert in machine learning and artificial intelligence with extensive research experience in healthcare applications.',
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
      specialties: ['Econometrics', 'Policy Analysis', 'Development'],
      sessions: 623,
      availability: 'Next Available: Tomorrow',
      color: 'green',
      experience: '12+ years',
      location: 'London, UK',
      languages: ['English', 'Italian'],
      description:
        'Leading expert in economic policy and development with focus on emerging markets and sustainable growth.',
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
      specialties: ['Biomechanics', 'Medical Devices', 'Tissue Engineering'],
      sessions: 945,
      availability: 'Available Today',
      color: 'pink',
      experience: '18+ years',
      location: 'Cambridge, MA',
      languages: ['English', 'Korean'],
      description:
        'Pioneering researcher in biomedical engineering with expertise in medical device development and tissue engineering.',
    },
    {
      id: 4,
      name: 'Prof. Alessandro Rossi',
      avatar:
        'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=400&q=80',
      title: 'Professor of International Relations',
      university: 'Bocconi University',
      rating: 4.7,
      reviews: 89,
      hourlyRate: 60,
      specialties: ['Diplomacy', 'Global Politics', 'Conflict Resolution'],
      sessions: 456,
      availability: 'Available This Week',
      color: 'purple',
      experience: '10+ years',
      location: 'Milan, Italy',
      languages: ['English', 'Italian', 'French'],
      description:
        'Expert in international relations and diplomacy with extensive experience in conflict resolution and global governance.',
    },
    {
      id: 5,
      name: 'Dr. Michael Chen',
      avatar:
        'https://images.unsplash.com/photo-1560250097-0b93528c311a?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=400&q=80',
      title: 'Professor of Physics',
      university: 'University of California, Berkeley',
      rating: 4.8,
      reviews: 112,
      hourlyRate: 70,
      specialties: ['Quantum Physics', 'Theoretical Physics', 'Astrophysics'],
      sessions: 678,
      availability: 'Available Today',
      color: 'indigo',
      experience: '20+ years',
      location: 'Berkeley, CA',
      languages: ['English', 'Mandarin'],
      description:
        'Distinguished physicist specializing in quantum mechanics and theoretical physics with groundbreaking research in quantum computing.',
    },
    {
      id: 6,
      name: 'Prof. Maria Rodriguez',
      avatar:
        'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=400&q=80',
      title: 'Professor of Psychology',
      university: 'University of Barcelona',
      rating: 4.6,
      reviews: 76,
      hourlyRate: 55,
      specialties: [
        'Clinical Psychology',
        'Cognitive Science',
        'Research Methods',
      ],
      sessions: 389,
      availability: 'Next Available: Friday',
      color: 'orange',
      experience: '14+ years',
      location: 'Barcelona, Spain',
      languages: ['English', 'Spanish', 'Catalan'],
      description:
        'Clinical psychologist and cognitive scientist with expertise in mental health research and therapeutic interventions.',
    },
  ];

  const mentorshipStats = [
    {
      icon: Users,
      number: '500+',
      label: 'Expert Professors',
      description: 'From top universities worldwide',
    },
    {
      icon: Star,
      number: '4.8',
      label: 'Average Rating',
      description: 'Based on student reviews',
    },
    {
      icon: Clock,
      number: '10,000+',
      label: 'Sessions Completed',
      description: 'Successful mentorship sessions',
    },
    {
      icon: Globe,
      number: '50+',
      label: 'Countries',
      description: 'Global network of mentors',
    },
  ];

  const howItWorks = [
    {
      step: 1,
      icon: Search,
      title: 'Find Your Mentor',
      description:
        'Browse through our curated list of expert professors from top universities worldwide.',
    },
    {
      step: 2,
      icon: Calendar,
      title: 'Book a Session',
      description:
        'Schedule a convenient time for your personalized mentorship session.',
    },
    {
      step: 3,
      icon: Video,
      title: 'Meet Online',
      description:
        'Connect via high-quality video call for personalized guidance and advice.',
    },
    {
      step: 4,
      icon: TrendingUp,
      title: 'Grow & Succeed',
      description:
        'Apply insights from your sessions to accelerate your academic and professional growth.',
    },
  ];

  return (
    <div className='min-h-screen bg-white'>
      <GlobalNavbar />

      {/* Hero Section */}
      <motion.section
        className='relative py-16 sm:py-20 lg:py-28 px-4 sm:px-6 lg:px-8 overflow-hidden min-h-[500px] sm:min-h-[600px] flex items-center justify-center'
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
              Expert Mentorship
            </Badge>
          </motion.div>
          <motion.h2
            className='text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 mb-4 sm:mb-6 leading-tight px-2'
            variants={fadeInUp}
          >
            Learn from the{' '}
            <span className='text-[#0A66C2]'>Best Professors</span>
          </motion.h2>
          <motion.p
            className='text-sm sm:text-base text-gray-600 leading-relaxed max-w-2xl mx-auto px-2'
            variants={fadeInUp}
          >
            Connect with world-class professors for personalized guidance,
            academic support, and career mentorship. Get expert advice from
            leading researchers and educators.
          </motion.p>
          <motion.div
            className='flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center mt-6 sm:mt-8'
            variants={fadeInUp}
          >
            <Button
              size='lg'
              onClick={() => navigate('/signup')}
              className='bg-[#0A66C2] hover:bg-[#084482] text-white px-6 sm:px-8 py-3 sm:py-4 text-base sm:text-lg font-semibold shadow-xl transition-transform duration-200 hover:scale-105'
            >
              Start Your Journey
              <ArrowRight className='ml-2 h-4 w-4 sm:h-5 sm:w-5' />
            </Button>
            <Button
              size='lg'
              variant='outline'
              className='border-[#0A66C2] text-[#0A66C2] hover:bg-[#0A66C2] hover:text-white px-6 sm:px-8 py-3 sm:py-4 text-base sm:text-lg font-semibold'
            >
              Learn More
            </Button>
          </motion.div>
        </motion.div>
      </motion.section>

      {/* Stats Section */}
      <motion.section
        className='py-12 sm:py-16 px-4 sm:px-6 lg:px-8 bg-white'
        initial='initial'
        whileInView='animate'
        viewport={{ once: true, amount: 0.2 }}
        variants={fadeInUp}
      >
        <div className='max-w-6xl mx-auto'>
          <motion.div
            className='grid grid-cols-2 md:grid-cols-4 gap-6 sm:gap-8'
            variants={staggerContainer}
          >
            {mentorshipStats.map((stat) => {
              const IconComponent = stat.icon;
              return (
                <motion.div
                  key={stat.label}
                  className='text-center'
                  variants={fadeInScale}
                  whileHover={{ scale: 1.02, sm: 1.05 }}
                  transition={{ duration: 0.3 }}
                >
                  <div className='flex justify-center mb-3 sm:mb-4'>
                    <div className='w-12 h-12 sm:w-16 sm:h-16 bg-gradient-to-br from-[#0A66C2] to-[#084482] rounded-2xl flex items-center justify-center text-white shadow-lg'>
                      <IconComponent className='h-6 w-6 sm:h-8 sm:w-8' />
                    </div>
                  </div>
                  <div className='text-2xl sm:text-3xl font-bold text-[#0B1B4D] mb-1 sm:mb-2'>
                    {stat.number}
                  </div>
                  <div className='text-sm sm:text-lg font-semibold text-gray-900 mb-1 sm:mb-2'>
                    {stat.label}
                  </div>
                  <div className='text-xs sm:text-base text-gray-600'>
                    {stat.description}
                  </div>
                </motion.div>
              );
            })}
          </motion.div>
        </div>
      </motion.section>

      {/* How It Works Section */}
      <motion.section
        className='py-12 sm:py-16 lg:py-20 px-4 sm:px-6 lg:px-8 bg-gray-50'
        initial='initial'
        whileInView='animate'
        viewport={{ once: true, amount: 0.2 }}
        variants={fadeInUp}
      >
        <div className='max-w-6xl mx-auto'>
          <motion.div
            className='text-center mb-12 sm:mb-16'
            variants={staggerContainer}
          >
            <motion.h2
              className='text-2xl sm:text-3xl lg:text-4xl font-bold text-[#0B1B4D] mb-4 sm:mb-6'
              variants={fadeInUp}
            >
              How Mentorship Works
            </motion.h2>
            <motion.p
              className='text-sm sm:text-base lg:text-lg text-gray-600 max-w-3xl mx-auto px-4'
              variants={fadeInUp}
            >
              Get personalized guidance from world-class professors in just four
              simple steps
            </motion.p>
          </motion.div>

          <motion.div
            className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8'
            variants={staggerContainer}
          >
            {howItWorks.map((step) => {
              const IconComponent = step.icon;
              return (
                <motion.div
                  key={step.step}
                  className='relative group'
                  variants={fadeInScale}
                  whileHover={{ scale: 1.02, sm: 1.05 }}
                  transition={{ duration: 0.3 }}
                >
                  <div className='bg-white rounded-2xl p-6 sm:p-8 shadow-xl hover:shadow-2xl transition-all duration-300 border border-gray-200'>
                    <div className='relative mb-4 sm:mb-6'>
                      <div className='w-16 h-16 sm:w-20 sm:h-20 bg-gradient-to-br from-[#0A66C2] to-[#084482] rounded-2xl flex items-center justify-center text-white mb-3 sm:mb-4 mx-auto shadow-lg group-hover:scale-110 transition-transform duration-300'>
                        <IconComponent className='h-8 w-8 sm:h-10 sm:w-10' />
                      </div>
                      <div className='absolute -top-1 -right-1 sm:-top-2 sm:-right-2 w-6 h-6 sm:w-8 sm:h-8 bg-gradient-to-r from-yellow-400 to-orange-500 rounded-full flex items-center justify-center text-white text-xs sm:text-sm font-bold'>
                        {step.step}
                      </div>
                    </div>
                    <h3 className='text-lg sm:text-xl font-bold text-[#0B1B4D] mb-2 sm:mb-3 text-center'>
                      {step.title}
                    </h3>
                    <p className='text-sm sm:text-base text-gray-600 text-center leading-relaxed'>
                      {step.description}
                    </p>
                  </div>
                </motion.div>
              );
            })}
          </motion.div>
        </div>
      </motion.section>

      {/* Search and Filter Section */}
      <motion.section
        className='py-12 sm:py-16 px-4 sm:px-6 lg:px-8 bg-white'
        initial='initial'
        whileInView='animate'
        viewport={{ once: true, amount: 0.2 }}
        variants={fadeInUp}
      >
        <div className='max-w-6xl mx-auto'>
          <motion.div
            className='text-center mb-8 sm:mb-12'
            variants={staggerContainer}
          >
            <motion.h2
              className='text-2xl sm:text-3xl font-bold text-[#0B1B4D] mb-4 sm:mb-6'
              variants={fadeInUp}
            >
              Find Your Perfect Mentor
            </motion.h2>
            <motion.p
              className='text-sm sm:text-base lg:text-lg text-gray-600 max-w-2xl mx-auto px-4'
              variants={fadeInUp}
            >
              Browse through our network of expert professors and find the
              perfect mentor for your academic journey
            </motion.p>
          </motion.div>

          {/* Search and Filters */}
          <motion.div
            className='bg-white rounded-2xl shadow-xl p-4 sm:p-6 mb-6 sm:mb-8 border border-gray-200'
            variants={fadeInScale}
          >
            <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4'>
              <div>
                <Label htmlFor='search' className='text-sm sm:text-base'>
                  Search Mentors
                </Label>
                <div className='relative'>
                  <Search className='absolute left-3 top-3 h-4 w-4 text-gray-400' />
                  <Input
                    id='search'
                    placeholder='Search by name, field, or university...'
                    className='pl-10 text-sm sm:text-base'
                  />
                </div>
              </div>
              <div>
                <Label htmlFor='field' className='text-sm sm:text-base'>
                  Field of Study
                </Label>
                <Select value={selectedField} onValueChange={setSelectedField}>
                  <SelectTrigger className='text-sm sm:text-base'>
                    <SelectValue placeholder='Select field' />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value='computer-science'>
                      Computer Science
                    </SelectItem>
                    <SelectItem value='engineering'>Engineering</SelectItem>
                    <SelectItem value='economics'>Economics</SelectItem>
                    <SelectItem value='psychology'>Psychology</SelectItem>
                    <SelectItem value='physics'>Physics</SelectItem>
                    <SelectItem value='international-relations'>
                      International Relations
                    </SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label htmlFor='experience' className='text-sm sm:text-base'>
                  Experience Level
                </Label>
                <Select
                  value={selectedExperience}
                  onValueChange={setSelectedExperience}
                >
                  <SelectTrigger className='text-sm sm:text-base'>
                    <SelectValue placeholder='Select experience' />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value='5-10'>5-10 years</SelectItem>
                    <SelectItem value='10-15'>10-15 years</SelectItem>
                    <SelectItem value='15-20'>15-20 years</SelectItem>
                    <SelectItem value='20+'>20+ years</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label htmlFor='price' className='text-sm sm:text-base'>
                  Price Range
                </Label>
                <Select value={selectedPrice} onValueChange={setSelectedPrice}>
                  <SelectTrigger className='text-sm sm:text-base'>
                    <SelectValue placeholder='Select price' />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value='0-50'>$0-$50/hour</SelectItem>
                    <SelectItem value='50-75'>$50-$75/hour</SelectItem>
                    <SelectItem value='75-100'>$75-$100/hour</SelectItem>
                    <SelectItem value='100+'>$100+/hour</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </motion.div>

          {/* Mentors Grid */}
          <motion.div
            className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8'
            variants={staggerContainer}
          >
            {professors.map((professor) => (
              <motion.div
                key={professor.id}
                variants={fadeInScale}
                whileHover={{ scale: 1.02, sm: 1.05 }}
                transition={{ duration: 0.3 }}
              >
                <Card className='border border-gray-200 shadow-sm hover:shadow-md transition-all duration-300 bg-white rounded-lg overflow-hidden'>
                  <CardHeader className='text-center pb-3 sm:pb-4'>
                    <div className='relative mb-3 sm:mb-4'>
                      <img
                        src={professor.avatar}
                        alt={professor.name}
                        className='w-16 h-16 sm:w-24 sm:h-24 rounded-full mx-auto border-4 border-gray-100 shadow-lg'
                      />
                      <div className='absolute -bottom-1 -right-1 w-6 h-6 sm:w-8 sm:h-8 bg-green-500 rounded-full border-2 border-white flex items-center justify-center'>
                        <div className='w-1.5 h-1.5 sm:w-2 sm:h-2 bg-white rounded-full'></div>
                      </div>
                    </div>
                    <CardTitle className='text-lg sm:text-xl font-bold text-[#0B1B4D] mb-1 sm:mb-2'>
                      {professor.name}
                    </CardTitle>
                    <CardDescription className='text-gray-600 mb-1 sm:mb-2 text-sm sm:text-base'>
                      {professor.title}
                    </CardDescription>
                    <CardDescription className='text-gray-600 mb-2 sm:mb-3 text-sm sm:text-base'>
                      {professor.university}
                    </CardDescription>
                    <div className='flex items-center justify-center gap-1 mb-2 sm:mb-3'>
                      {[...Array(5)].map((_, i) => (
                        <Star
                          key={i}
                          className={`h-3 w-3 sm:h-4 sm:w-4 ${
                            i < Math.floor(professor.rating)
                              ? 'text-yellow-400 fill-current'
                              : 'text-gray-300'
                          }`}
                        />
                      ))}
                      <span className='text-xs sm:text-sm text-gray-600 ml-1'>
                        {professor.rating} ({professor.reviews})
                      </span>
                    </div>
                    <div className='text-lg sm:text-2xl font-bold text-[#0A66C2] mb-2 sm:mb-3'>
                      ${professor.hourlyRate}/hour
                    </div>
                    <div className='flex flex-wrap gap-1 sm:gap-2 justify-center mb-2 sm:mb-3'>
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
                    <div className='flex items-center justify-center gap-2 mb-1 sm:mb-2 text-xs sm:text-sm text-gray-500'>
                      <Clock className='h-3 w-3 sm:h-4 sm:w-4' />
                      <span>{professor.sessions} sessions</span>
                    </div>
                    <div className='text-xs sm:text-sm text-green-600 pb-1 sm:pb-2 font-medium'>
                      {professor.availability}
                    </div>
                    <div className='flex gap-2 w-full'>
                      <Button className='flex-1 bg-[#0A66C2] hover:bg-[#084482] text-white text-xs sm:text-sm'>
                        Book Session
                      </Button>
                      <Button
                        variant='outline'
                        size='icon'
                        className='border-gray-300 hover:border-[#0A66C2] hover:text-[#0A66C2] h-8 w-8 sm:h-10 sm:w-10'
                      >
                        <MessageCircle className='h-3 w-3 sm:h-4 sm:w-4' />
                      </Button>
                      <Button
                        variant='outline'
                        size='icon'
                        className='border-gray-300 hover:border-[#0A66C2] hover:text-[#0A66C2] h-8 w-8 sm:h-10 sm:w-10'
                      >
                        <User className='h-3 w-3 sm:h-4 sm:w-4' />
                      </Button>
                    </div>
                  </CardHeader>
                </Card>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </motion.section>

      {/* CTA Section */}
      <motion.section
        className='py-12 sm:py-16 lg:py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50'
        initial='initial'
        whileInView='animate'
        viewport={{ once: true, amount: 0.2 }}
        variants={fadeInUp}
      >
        <div className='max-w-4xl mx-auto text-center'>
          <motion.h2
            className='text-2xl sm:text-3xl lg:text-4xl font-bold text-[#0B1B4D] mb-4 sm:mb-6'
            variants={fadeInUp}
          >
            Ready to Start Your Mentorship Journey?
          </motion.h2>
          <motion.p
            className='text-sm sm:text-base lg:text-lg text-gray-600 mb-8 sm:mb-10 max-w-2xl mx-auto px-4'
            variants={fadeInUp}
          >
            Join thousands of students who have transformed their academic and
            professional lives through expert mentorship.
          </motion.p>
          <motion.div
            className='flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center'
            variants={fadeInUp}
          >
            <Button
              size='lg'
              onClick={() => navigate('/signup')}
              className='bg-[#0A66C2] hover:bg-[#084482] text-white px-6 sm:px-8 py-3 sm:py-4 text-base sm:text-lg font-semibold shadow-xl transition-transform duration-200 hover:scale-105'
            >
              Get Started Today
              <ArrowRight className='ml-2 h-4 w-4 sm:h-5 sm:w-5' />
            </Button>
            <Button
              size='lg'
              variant='outline'
              className='border-[#0A66C2] text-[#0A66C2] hover:bg-[#0A66C2] hover:text-white px-6 sm:px-8 py-3 sm:py-4 text-base sm:text-lg font-semibold'
            >
              Learn More
            </Button>
          </motion.div>
        </div>
      </motion.section>

      <LandingFooter />
    </div>
  );
};

export default Mentorship;
