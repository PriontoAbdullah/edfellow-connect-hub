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
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import {
  Briefcase,
  Award,
  GraduationCap,
  Building2,
  Search,
  Filter,
  MapPin,
  Clock,
  DollarSign,
  Users,
  Star,
  ArrowRight,
  Plus,
  Bookmark,
  ExternalLink,
  Calendar,
  Globe,
  TrendingUp,
  CheckCircle,
  Heart,
  MessageCircle,
  Share2,
  BookOpen,
  Microscope,
  Code,
  School,
  Target,
  Zap,
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

const Opportunities = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('all');
  const [selectedCategory, setSelectedCategory] = useState('');
  const [selectedLocation, setSelectedLocation] = useState('');
  const [selectedType, setSelectedType] = useState('');

  const opportunities = [
    {
      id: 1,
      title: 'Research Assistant Position - AI/ML',
      type: 'Research Position',
      category: 'Technology',
      organization: 'MIT',
      location: 'Cambridge, MA',
      salary: '$45,000/year',
      duration: '2 years',
      deadline: '2024-02-15',
      description:
        "Join our cutting-edge research team working on machine learning applications in healthcare. We're looking for motivated students with strong programming skills.",
      requirements: ['Python', 'Machine Learning', 'Research Experience'],
      tags: ['AI/ML', 'Research', 'Healthcare'],
      logo: 'https://images.unsplash.com/photo-1562774053-701939374585?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=400&q=80',
      isFeatured: true,
      applications: 45,
      rating: 4.8,
    },
    {
      id: 2,
      title: 'Full Scholarship - Computer Science PhD',
      type: 'Scholarship',
      category: 'Technology',
      organization: 'Stanford University',
      location: 'Stanford, CA',
      salary: 'Full Tuition + $65,000/year',
      duration: '4-6 years',
      deadline: '2024-03-01',
      description:
        'Stanford University is offering a full scholarship for exceptional students pursuing a PhD in Computer Science. Covers tuition, living expenses, and research funding.',
      requirements: [
        'Excellent Academic Record',
        'Research Proposal',
        'GRE Scores',
      ],
      tags: ['PhD', 'Computer Science', 'Full Scholarship'],
      logo: 'https://images.unsplash.com/photo-1562774053-701939374585?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=400&q=80',
      isFeatured: true,
      applications: 89,
      rating: 4.9,
    },
    {
      id: 3,
      title: 'Summer Internship - Tech Companies',
      type: 'Internship',
      category: 'Technology',
      organization: 'Multiple Tech Companies',
      location: 'Multiple Locations',
      salary: '$8,000-$12,000/month',
      duration: '3 months',
      deadline: '2024-02-28',
      description:
        'Multiple tech companies are offering summer internships for students. Positions available in software engineering, data science, and product management.',
      requirements: ['Programming Skills', 'Teamwork', 'Problem Solving'],
      tags: ['Internship', 'Tech', 'Summer'],
      logo: 'https://images.unsplash.com/photo-1562774053-701939374585?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=400&q=80',
      isFeatured: false,
      applications: 67,
      rating: 4.7,
    },
    {
      id: 4,
      title: 'Merit-Based Scholarship - Engineering',
      type: 'Scholarship',
      category: 'Engineering',
      organization: 'MIT Engineering Department',
      location: 'Cambridge, MA',
      salary: '$25,000/year',
      duration: '4 years',
      deadline: '2024-02-20',
      description:
        'Engineering students with outstanding academic performance can apply for our merit-based scholarship program. Multiple awards available.',
      requirements: ['GPA 3.8+', 'Engineering Major', 'Leadership Experience'],
      tags: ['Engineering', 'Merit', 'Scholarship'],
      logo: 'https://images.unsplash.com/photo-1562774053-701939374585?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=400&q=80',
      isFeatured: false,
      applications: 56,
      rating: 4.6,
    },
    {
      id: 5,
      title: 'Research Collaboration Opportunity',
      type: 'Research Position',
      category: 'Science',
      organization: 'Stanford University',
      location: 'Stanford, CA',
      salary: '$60,000/year',
      duration: '2-3 years',
      deadline: '2024-03-15',
      description:
        'Seeking research partners for interdisciplinary project on sustainable energy solutions. Open to professors and graduate students.',
      requirements: [
        'Research Experience',
        'Energy Background',
        'Publication Record',
      ],
      tags: ['Research', 'Energy', 'Collaboration'],
      logo: 'https://images.unsplash.com/photo-1562774053-701939374585?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=400&q=80',
      isFeatured: false,
      applications: 42,
      rating: 4.5,
    },
    {
      id: 6,
      title: 'International Conference Call for Papers',
      type: 'Conference',
      category: 'Research',
      organization: 'University of Toronto',
      location: 'Toronto, Canada',
      salary: 'Travel Grant Available',
      duration: '1 week',
      deadline: '2024-01-30',
      description:
        'Submit your research papers for the 2024 International Conference on Artificial Intelligence and Machine Learning. Early bird registration now open.',
      requirements: ['Original Research', 'Peer Review', 'Presentation'],
      tags: ['Conference', 'AI/ML', 'Research'],
      logo: 'https://images.unsplash.com/photo-1562774053-701939374585?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=400&q=80',
      isFeatured: false,
      applications: 34,
      rating: 4.4,
    },
  ];

  const opportunityStats = [
    {
      icon: Briefcase,
      number: '1,000+',
      label: 'Active Opportunities',
      description: 'Updated daily',
    },
    {
      icon: Award,
      number: '500+',
      label: 'Scholarships',
      description: 'From top institutions',
    },
    {
      icon: Users,
      number: '50,000+',
      label: 'Successful Applications',
      description: 'Students placed',
    },
    {
      icon: Globe,
      number: '80+',
      label: 'Countries',
      description: 'Global opportunities',
    },
  ];

  const categories = [
    { name: 'Technology', icon: Code, count: 234, color: 'blue' },
    { name: 'Engineering', icon: Microscope, count: 189, color: 'green' },
    { name: 'Business', icon: Building2, count: 156, color: 'yellow' },
    { name: 'Science', icon: School, count: 123, color: 'purple' },
    { name: 'Research', icon: BookOpen, count: 98, color: 'orange' },
    { name: 'Arts', icon: GraduationCap, count: 67, color: 'pink' },
  ];

  const opportunityTypes = [
    { name: 'Scholarships', icon: Award, count: 234 },
    { name: 'Internships', icon: Briefcase, count: 189 },
    { name: 'Research Positions', icon: Microscope, count: 156 },
    { name: 'Conferences', icon: Calendar, count: 98 },
    { name: 'Fellowships', icon: Star, count: 67 },
    { name: 'Grants', icon: DollarSign, count: 45 },
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
              Academic Opportunities
            </Badge>
          </motion.div>
          <motion.h2
            className='text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 mb-4 sm:mb-6 leading-tight px-2'
            variants={fadeInUp}
          >
            Discover Your{' '}
            <span className='text-[#0A66C2]'>Next Opportunity</span>
          </motion.h2>
          <motion.p
            className='text-sm sm:text-base text-gray-600 leading-relaxed max-w-2xl mx-auto px-2'
            variants={fadeInUp}
          >
            Find scholarships, internships, research positions, and academic
            opportunities from top institutions worldwide. Take the next step in
            your academic and professional journey.
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
              Start Exploring
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
            {opportunityStats.map((stat) => {
              const IconComponent = stat.icon;
              return (
                <motion.div
                  key={stat.label}
                  className='text-center'
                  variants={fadeInScale}
                  whileHover={{ scale: 1.05 }}
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

      {/* Categories Section */}
      <motion.section
        className='py-12 sm:py-16 px-4 sm:px-6 lg:px-8 bg-gray-50'
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
              Explore by Category
            </motion.h2>
            <motion.p
              className='text-sm sm:text-base lg:text-lg text-gray-600 max-w-2xl mx-auto px-4'
              variants={fadeInUp}
            >
              Find opportunities in your field of interest
            </motion.p>
          </motion.div>

          <motion.div
            className='grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4 sm:gap-6'
            variants={staggerContainer}
          >
            {categories.map((category) => {
              const IconComponent = category.icon;
              return (
                <motion.div
                  key={category.name}
                  variants={fadeInScale}
                  whileHover={{ scale: 1.05 }}
                  transition={{ duration: 0.3 }}
                >
                  <Card className='border border-gray-200 shadow-sm hover:shadow-md transition-all duration-300 bg-white cursor-pointer'>
                    <CardContent className='p-4 sm:p-6 text-center'>
                      <div
                        className={`w-10 h-10 sm:w-12 sm:h-12 bg-gradient-to-br from-[#0A66C2] to-[#084482] rounded-xl flex items-center justify-center text-white mb-3 sm:mb-4 mx-auto shadow-lg`}
                      >
                        <IconComponent className='h-5 w-5 sm:h-6 sm:w-6' />
                      </div>
                      <h3 className='font-semibold text-gray-900 mb-1 sm:mb-2 text-sm sm:text-base'>
                        {category.name}
                      </h3>
                      <p className='text-xs sm:text-sm text-gray-600'>
                        {category.count} opportunities
                      </p>
                    </CardContent>
                  </Card>
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
              Find Your Perfect Opportunity
            </motion.h2>
            <motion.p
              className='text-sm sm:text-base lg:text-lg text-gray-600 max-w-2xl mx-auto px-4'
              variants={fadeInUp}
            >
              Search and filter through thousands of opportunities to find the
              perfect match for your skills and interests
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
                  Search Opportunities
                </Label>
                <div className='relative'>
                  <Search className='absolute left-3 top-3 h-4 w-4 text-gray-400' />
                  <Input
                    id='search'
                    placeholder='Search by title, organization, or keywords...'
                    className='pl-10 text-sm sm:text-base'
                  />
                </div>
              </div>
              <div>
                <Label htmlFor='category' className='text-sm sm:text-base'>
                  Category
                </Label>
                <Select
                  value={selectedCategory}
                  onValueChange={setSelectedCategory}
                >
                  <SelectTrigger className='text-sm sm:text-base'>
                    <SelectValue placeholder='Select category' />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value='technology'>Technology</SelectItem>
                    <SelectItem value='engineering'>Engineering</SelectItem>
                    <SelectItem value='business'>Business</SelectItem>
                    <SelectItem value='science'>Science</SelectItem>
                    <SelectItem value='research'>Research</SelectItem>
                    <SelectItem value='arts'>Arts</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label htmlFor='location' className='text-sm sm:text-base'>
                  Location
                </Label>
                <Select
                  value={selectedLocation}
                  onValueChange={setSelectedLocation}
                >
                  <SelectTrigger className='text-sm sm:text-base'>
                    <SelectValue placeholder='Select location' />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value='remote'>Remote</SelectItem>
                    <SelectItem value='usa'>United States</SelectItem>
                    <SelectItem value='europe'>Europe</SelectItem>
                    <SelectItem value='asia'>Asia</SelectItem>
                    <SelectItem value='canada'>Canada</SelectItem>
                    <SelectItem value='australia'>Australia</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label htmlFor='type' className='text-sm sm:text-base'>
                  Opportunity Type
                </Label>
                <Select value={selectedType} onValueChange={setSelectedType}>
                  <SelectTrigger className='text-sm sm:text-base'>
                    <SelectValue placeholder='Select type' />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value='scholarship'>Scholarship</SelectItem>
                    <SelectItem value='internship'>Internship</SelectItem>
                    <SelectItem value='research'>Research Position</SelectItem>
                    <SelectItem value='conference'>Conference</SelectItem>
                    <SelectItem value='fellowship'>Fellowship</SelectItem>
                    <SelectItem value='grant'>Grant</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </motion.div>

          {/* Opportunity Types */}
          <motion.div
            className='grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4 sm:gap-6 mb-6 sm:mb-8'
            variants={staggerContainer}
          >
            {opportunityTypes.map((type) => {
              const IconComponent = type.icon;
              return (
                <motion.div
                  key={type.name}
                  variants={fadeInScale}
                  whileHover={{ scale: 1.05 }}
                  transition={{ duration: 0.3 }}
                >
                  <Card className='border border-gray-200 shadow-sm hover:shadow-md transition-all duration-300 bg-white cursor-pointer'>
                    <CardContent className='p-3 sm:p-4 text-center'>
                      <div className='w-8 h-8 sm:w-10 sm:h-10 bg-gradient-to-br from-[#0A66C2] to-[#084482] rounded-xl flex items-center justify-center text-white mb-2 sm:mb-3 mx-auto shadow-lg'>
                        <IconComponent className='h-4 w-4 sm:h-5 sm:w-5' />
                      </div>
                      <h3 className='font-semibold text-gray-900 text-xs sm:text-sm mb-1'>
                        {type.name}
                      </h3>
                      <p className='text-xs text-gray-600'>
                        {type.count} available
                      </p>
                    </CardContent>
                  </Card>
                </motion.div>
              );
            })}
          </motion.div>

          {/* Opportunities Grid */}
          <motion.div variants={fadeInScale}>
            <Tabs
              value={activeTab}
              onValueChange={setActiveTab}
              className='w-full'
            >
              <TabsList className='grid w-full grid-cols-2 sm:grid-cols-4'>
                <TabsTrigger value='all' className='text-xs sm:text-sm'>
                  All Opportunities
                </TabsTrigger>
                <TabsTrigger value='featured' className='text-xs sm:text-sm'>
                  Featured
                </TabsTrigger>
                <TabsTrigger value='recent' className='text-xs sm:text-sm'>
                  Recent
                </TabsTrigger>
                <TabsTrigger value='deadline' className='text-xs sm:text-sm'>
                  Deadline Soon
                </TabsTrigger>
              </TabsList>

              <TabsContent value={activeTab} className='mt-4 sm:mt-6'>
                <motion.div
                  className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8'
                  variants={staggerContainer}
                >
                  {opportunities.map((opportunity) => (
                    <motion.div
                      key={opportunity.id}
                      variants={fadeInScale}
                      whileHover={{ scale: 1.05 }}
                      transition={{ duration: 0.3 }}
                    >
                      <Card
                        className={`border border-gray-200 shadow-sm hover:shadow-md transition-all duration-300 bg-white overflow-hidden ${
                          opportunity.isFeatured
                            ? 'ring-2 ring-[#0A66C2]/20'
                            : ''
                        }`}
                      >
                        {opportunity.isFeatured && (
                          <div className='absolute top-2 sm:top-4 left-2 sm:left-4 z-10'>
                            <Badge className='bg-gradient-to-r from-[#0A66C2] to-[#084482] text-white border-0 font-semibold text-xs sm:text-sm'>
                              <TrendingUp className='h-2 w-2 sm:h-3 sm:w-3 mr-1' />
                              Featured
                            </Badge>
                          </div>
                        )}
                        <CardHeader className='pb-3 sm:pb-4 pt-4 sm:pt-6'>
                          <div className='flex items-start justify-between mb-3 sm:mb-4'>
                            <div className='flex items-center gap-2 sm:gap-3'>
                              <img
                                src={opportunity.logo}
                                alt={opportunity.organization}
                                className='w-10 h-10 sm:w-12 sm:h-12 rounded-full'
                              />
                              <div>
                                <div className='flex items-center gap-1 sm:gap-2'>
                                  <span className='font-semibold text-gray-900 text-sm sm:text-base'>
                                    {opportunity.organization}
                                  </span>
                                  <div className='flex items-center gap-1'>
                                    <Star className='h-2 w-2 sm:h-3 sm:w-3 text-yellow-400 fill-current' />
                                    <span className='text-xs text-gray-600'>
                                      {opportunity.rating}
                                    </span>
                                  </div>
                                </div>
                                <div className='text-xs sm:text-sm text-gray-600'>
                                  {opportunity.location}
                                </div>
                              </div>
                            </div>
                            <div className='flex items-center gap-1 sm:gap-2'>
                              <Badge className='bg-blue-100 text-blue-700 border-0 text-xs'>
                                {opportunity.type}
                              </Badge>
                              <Bookmark className='h-3 w-3 sm:h-4 sm:w-4 text-gray-400 hover:text-[#0A66C2] cursor-pointer transition-colors' />
                            </div>
                          </div>
                          <CardTitle className='text-sm sm:text-lg font-bold text-[#0B1B4D] mb-1 sm:mb-2'>
                            {opportunity.title}
                          </CardTitle>
                          <p className='text-xs sm:text-sm text-gray-600 mb-3 sm:mb-4 leading-relaxed'>
                            {opportunity.description}
                          </p>
                          <div className='flex flex-wrap gap-1 sm:gap-2 mb-3 sm:mb-4'>
                            {opportunity.tags.map((tag, index) => (
                              <Badge
                                key={index}
                                variant='outline'
                                className='text-xs'
                              >
                                {tag}
                              </Badge>
                            ))}
                          </div>
                          <div className='flex flex-col sm:flex-row sm:items-center justify-between text-xs sm:text-sm text-gray-500 mb-3 sm:mb-4 gap-1 sm:gap-4'>
                            <div className='flex items-center gap-1 sm:gap-4'>
                              <div className='flex items-center gap-1'>
                                <DollarSign className='h-3 w-3 sm:h-4 sm:w-4' />
                                <span>{opportunity.salary}</span>
                              </div>
                              <div className='flex items-center gap-1'>
                                <Clock className='h-3 w-3 sm:h-4 sm:w-4' />
                                <span>{opportunity.duration}</span>
                              </div>
                              <div className='flex items-center gap-1'>
                                <Users className='h-3 w-3 sm:h-4 sm:w-4' />
                                <span>{opportunity.applications} applied</span>
                              </div>
                            </div>
                          </div>
                          <div className='flex items-center justify-between text-xs sm:text-sm text-red-600 font-medium mb-3 sm:mb-4'>
                            <div className='flex items-center gap-1'>
                              <Calendar className='h-3 w-3 sm:h-4 sm:w-4' />
                              <span>Deadline: {opportunity.deadline}</span>
                            </div>
                          </div>
                        </CardHeader>
                        <CardContent className='space-y-2 sm:space-y-3'>
                          <div>
                            <h4 className='font-semibold text-gray-900 mb-1 sm:mb-2 text-sm sm:text-base'>
                              Requirements:
                            </h4>
                            <div className='flex flex-wrap gap-1 sm:gap-2'>
                              {opportunity.requirements.map((req, index) => (
                                <Badge
                                  key={index}
                                  className='bg-gray-100 text-gray-700 border-0 text-xs'
                                >
                                  {req}
                                </Badge>
                              ))}
                            </div>
                          </div>
                          <div className='flex gap-1 sm:gap-2'>
                            <Button className='flex-1 bg-[#0A66C2] hover:bg-[#084482] text-white text-xs sm:text-sm'>
                              Apply Now
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
                              <Share2 className='h-3 w-3 sm:h-4 sm:w-4' />
                            </Button>
                          </div>
                        </CardContent>
                      </Card>
                    </motion.div>
                  ))}
                </motion.div>
              </TabsContent>
            </Tabs>
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
            Ready to Find Your Next Opportunity?
          </motion.h2>
          <motion.p
            className='text-sm sm:text-base lg:text-lg text-gray-600 mb-8 sm:mb-10 max-w-2xl mx-auto px-4'
            variants={fadeInUp}
          >
            Join thousands of students who have discovered life-changing
            opportunities through our platform.
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
              Start Your Search
              <ArrowRight className='ml-2 h-4 w-4 sm:h-5 sm:w-5' />
            </Button>
            <Button
              size='lg'
              variant='outline'
              className='border-[#0A66C2] text-[#0A66C2] hover:bg-[#0A66C2] hover:text-white px-6 sm:px-8 py-3 sm:py-4 text-base sm:text-lg font-semibold'
            >
              Browse Categories
            </Button>
          </motion.div>
        </div>
      </motion.section>

      <LandingFooter />
    </div>
  );
};

export default Opportunities;
