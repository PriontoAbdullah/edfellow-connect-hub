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
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import {
  Briefcase,
  Award,
  Megaphone,
  Star,
  Clock,
  MapPin,
  Building2,
  GraduationCap,
  User,
  Heart,
  MessageCircle,
  Share2,
  Bookmark,
  ExternalLink,
  TrendingUp,
  Calendar,
  DollarSign,
  Users,
  Globe,
  CheckCircle,
  Plus,
  Filter,
  Search,
  Newspaper,
  MessageSquare,
  BookOpen,
  Microscope,
  ArrowRight,
  Bell,
  Crown,
  Sparkles,
  Network,
  Handshake,
  Lightbulb,
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

const RecentPosts = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');

  const posts = [
    {
      id: '1',
      title: 'Research Assistant Position - AI/ML',
      description:
        "Join our cutting-edge research team working on machine learning applications in healthcare. We're looking for motivated students with strong programming skills.",
      author: {
        name: 'Dr. Sarah Chen',
        role: 'Professor',
        institution: 'MIT',
        avatar:
          'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=400&q=80',
        verified: true,
      },
      category: 'opportunity',
      type: 'Research Position',
      location: 'Cambridge, MA',
      deadline: '2024-02-15',
      requirements: ['Python', 'Machine Learning', 'Research Experience'],
      tags: ['AI/ML', 'Research', 'Healthcare'],
      likes: 45,
      comments: 12,
      shares: 8,
      isHighlighted: true,
      isPaidPromotion: true,
      createdAt: '2 hours ago',
      engagement: 'High',
    },
    {
      id: '2',
      title: 'Full Scholarship - Computer Science PhD',
      description:
        'Stanford University is offering a full scholarship for exceptional students pursuing a PhD in Computer Science. Covers tuition, living expenses, and research funding.',
      author: {
        name: 'Stanford University',
        role: 'University',
        institution: 'Stanford University',
        avatar:
          'https://images.unsplash.com/photo-1562774053-701939374585?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=400&q=80',
        verified: true,
      },
      category: 'scholarship',
      type: 'PhD Scholarship',
      location: 'Stanford, CA',
      deadline: '2024-03-01',
      amount: '$65,000/year',
      requirements: [
        'Excellent Academic Record',
        'Research Proposal',
        'GRE Scores',
      ],
      tags: ['PhD', 'Computer Science', 'Full Scholarship'],
      likes: 89,
      comments: 23,
      shares: 15,
      isHighlighted: true,
      isPaidPromotion: true,
      createdAt: '4 hours ago',
      engagement: 'Very High',
    },
    {
      id: '3',
      title: 'International Conference Call for Papers',
      description:
        'Submit your research papers for the 2024 International Conference on Artificial Intelligence and Machine Learning. Early bird registration now open.',
      author: {
        name: 'Prof. Michael Rodriguez',
        role: 'Professor',
        institution: 'University of Toronto',
        avatar:
          'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=400&q=80',
        verified: true,
      },
      category: 'notice',
      type: 'Conference',
      location: 'Toronto, Canada',
      deadline: '2024-01-30',
      requirements: ['Original Research', 'Peer Review', 'Presentation'],
      tags: ['Conference', 'AI/ML', 'Research'],
      likes: 34,
      comments: 9,
      shares: 6,
      createdAt: '6 hours ago',
      engagement: 'Medium',
    },
    {
      id: '4',
      title: 'Summer Internship Program - Tech Companies',
      description:
        'Multiple tech companies are offering summer internships for students. Positions available in software engineering, data science, and product management.',
      author: {
        name: 'Tech Careers Hub',
        role: 'University',
        institution: 'University of California',
        avatar:
          'https://images.unsplash.com/photo-1562774053-701939374585?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=400&q=80',
        verified: true,
      },
      category: 'opportunity',
      type: 'Internship',
      location: 'Multiple Locations',
      deadline: '2024-02-28',
      requirements: ['Programming Skills', 'Teamwork', 'Problem Solving'],
      tags: ['Internship', 'Tech', 'Summer'],
      likes: 67,
      comments: 18,
      shares: 12,
      createdAt: '1 day ago',
      engagement: 'High',
    },
    {
      id: '5',
      title: 'Merit-Based Scholarship - Engineering',
      description:
        'Engineering students with outstanding academic performance can apply for our merit-based scholarship program. Multiple awards available.',
      author: {
        name: 'Engineering Department',
        role: 'University',
        institution: 'MIT',
        avatar:
          'https://images.unsplash.com/photo-1562774053-701939374585?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=400&q=80',
        verified: true,
      },
      category: 'scholarship',
      type: 'Merit Scholarship',
      location: 'Cambridge, MA',
      deadline: '2024-02-20',
      amount: '$25,000/year',
      requirements: ['GPA 3.8+', 'Engineering Major', 'Leadership Experience'],
      tags: ['Engineering', 'Merit', 'Scholarship'],
      likes: 56,
      comments: 14,
      shares: 9,
      createdAt: '1 day ago',
      engagement: 'Medium',
    },
    {
      id: '6',
      title: 'Research Collaboration Opportunity',
      description:
        'Seeking research partners for interdisciplinary project on sustainable energy solutions. Open to professors and graduate students.',
      author: {
        name: 'Dr. Emily Watson',
        role: 'Professor',
        institution: 'Stanford University',
        avatar:
          'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=400&q=80',
        verified: true,
      },
      category: 'opportunity',
      type: 'Research Collaboration',
      location: 'Stanford, CA',
      deadline: '2024-03-15',
      requirements: [
        'Research Experience',
        'Energy Background',
        'Publication Record',
      ],
      tags: ['Research', 'Energy', 'Collaboration'],
      likes: 42,
      comments: 11,
      shares: 7,
      createdAt: '2 days ago',
      engagement: 'Medium',
    },
  ];

  const postStats = [
    {
      icon: Newspaper,
      number: '10,000+',
      label: 'Posts Published',
      description: 'Updated daily',
      gradient: 'from-[#0A66C2] to-[#084482]',
    },
    {
      icon: Users,
      number: '50,000+',
      label: 'Active Readers',
      description: 'Global community',
      gradient: 'from-[#0A66C2] to-[#084482]',
    },
    {
      icon: MessageSquare,
      number: '25,000+',
      label: 'Comments',
      description: 'Engaging discussions',
      gradient: 'from-[#0A66C2] to-[#084482]',
    },
    {
      icon: Globe,
      number: '80+',
      label: 'Countries',
      description: 'Global reach',
      gradient: 'from-[#0A66C2] to-[#084482]',
    },
  ];

  const categories = [
    {
      name: 'Opportunities',
      icon: Briefcase,
      count: 234,
      color: 'blue',
      gradient: 'from-[#0A66C2] to-[#084482]',
    },
    {
      name: 'Scholarships',
      icon: Award,
      count: 189,
      color: 'green',
      gradient: 'from-[#0A66C2] to-[#084482]',
    },
    {
      name: 'Notices',
      icon: Megaphone,
      count: 156,
      color: 'orange',
      gradient: 'from-[#0A66C2] to-[#084482]',
    },
    {
      name: 'Research',
      icon: Microscope,
      count: 123,
      color: 'purple',
      gradient: 'from-[#0A66C2] to-[#084482]',
    },
    {
      name: 'Events',
      icon: Calendar,
      count: 98,
      color: 'pink',
      gradient: 'from-[#0A66C2] to-[#084482]',
    },
    {
      name: 'General',
      icon: MessageSquare,
      count: 67,
      color: 'gray',
      gradient: 'from-[#0A66C2] to-[#084482]',
    },
  ];

  const handleLike = (postId: string) => {
    // Handle like functionality
    console.log('Liked post:', postId);
  };

  const handleSave = (postId: string) => {
    // Handle save functionality
    console.log('Saved post:', postId);
  };

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case 'opportunity':
        return <Briefcase className='h-4 w-4' />;
      case 'scholarship':
        return <Award className='h-4 w-4' />;
      case 'notice':
        return <Megaphone className='h-4 w-4' />;
      default:
        return <Star className='h-4 w-4' />;
    }
  };

  const getCategoryColor = (category: string) => {
    switch (category) {
      case 'opportunity':
        return 'bg-blue-100 text-blue-700 border-blue-200';
      case 'scholarship':
        return 'bg-green-100 text-green-700 border-green-200';
      case 'notice':
        return 'bg-orange-100 text-orange-700 border-orange-200';
      default:
        return 'bg-gray-100 text-gray-700 border-gray-200';
    }
  };

  const getAuthorIcon = (role: string) => {
    switch (role) {
      case 'Professor':
        return <GraduationCap className='h-4 w-4' />;
      case 'University':
        return <Building2 className='h-4 w-4' />;
      default:
        return <User className='h-4 w-4' />;
    }
  };

  const getEngagementColor = (engagement: string) => {
    switch (engagement) {
      case 'Very High':
        return 'text-green-600 bg-green-100';
      case 'High':
        return 'text-blue-600 bg-blue-100';
      case 'Medium':
        return 'text-yellow-600 bg-yellow-100';
      default:
        return 'text-gray-600 bg-gray-100';
    }
  };

  const filteredPosts = posts.filter((post) => {
    if (activeTab === 'all') return true;
    return post.category === activeTab;
  });

  const highlightedPosts = filteredPosts.filter((post) => post.isHighlighted);
  const regularPosts = filteredPosts.filter((post) => !post.isHighlighted);

  return (
    <div className='min-h-screen bg-white'>
      <GlobalNavbar />

      {/* Hero Section */}
      <motion.section
        className='relative py-28 px-4 sm:px-6 lg:px-8 overflow-hidden min-h-[600px] flex items-center justify-center'
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
          className='relative z-20 max-w-3xl mx-auto w-full flex flex-col items-center justify-center text-center mt-2'
          variants={staggerContainer}
        >
          <motion.div variants={fadeInUp}>
            <Badge className='bg-white/90 backdrop-blur-sm text-[#0A66C2] border-blue-200 mb-8 px-6 py-3 text-base font-semibold shadow-lg mx-auto hover:bg-white/90'>
              <Sparkles className='h-4 w-4 mr-2' />
              Latest Updates
            </Badge>
          </motion.div>
          <motion.h2
            className='text-4xl sm:text-5xl font-bold text-gray-900 mb-6 leading-tight'
            variants={fadeInUp}
          >
            Recent <span className='text-[#0A66C2]'>Academic Posts</span>
          </motion.h2>
          <motion.p
            className='text-base text-gray-600 leading-relaxed max-w-2xl mx-auto'
            variants={fadeInUp}
          >
            Stay updated with the latest opportunities, scholarships,
            announcements, and academic discussions from the global community.
          </motion.p>
          <motion.div
            className='flex flex-col sm:flex-row gap-4 justify-center mt-8'
            variants={fadeInUp}
          >
            <Button
              size='lg'
              onClick={() => navigate('/signup')}
              className='bg-[#0A66C2] hover:bg-[#084482] text-white px-8 py-4 text-lg font-semibold shadow-xl transition-transform duration-200 hover:scale-105'
            >
              Join the Community
              <ArrowRight className='ml-2 h-5 w-5' />
            </Button>
            <Button
              size='lg'
              variant='outline'
              className='border-[#0A66C2] text-[#0A66C2] hover:bg-[#0A66C2] hover:text-white px-8 py-4 text-lg font-semibold'
            >
              Create Post
            </Button>
          </motion.div>
        </motion.div>
      </motion.section>

      {/* Stats Section */}
      <motion.section
        className='py-16 px-4 sm:px-6 lg:px-8 bg-white'
        initial='initial'
        whileInView='animate'
        viewport={{ once: true, amount: 0.2 }}
        variants={fadeInUp}
      >
        <div className='max-w-6xl mx-auto'>
          <motion.div
            className='grid md:grid-cols-4 gap-8'
            variants={staggerContainer}
          >
            {postStats.map((stat) => {
              const IconComponent = stat.icon;
              return (
                <motion.div
                  key={stat.label}
                  className='text-center group'
                  variants={fadeInScale}
                  whileHover={{ scale: 1.05 }}
                  transition={{ duration: 0.3 }}
                >
                  <div className='flex justify-center mb-4'>
                    <div
                      className={`w-16 h-16 bg-gradient-to-br ${stat.gradient} rounded-2xl flex items-center justify-center text-white shadow-lg group-hover:shadow-xl transition-all duration-300 group-hover:scale-110`}
                    >
                      <IconComponent className='h-8 w-8' />
                    </div>
                  </div>
                  <div className='text-3xl font-bold text-[#0B1B4D] mb-2'>
                    {stat.number}
                  </div>
                  <div className='text-lg font-semibold text-gray-900 mb-2'>
                    {stat.label}
                  </div>
                  <div className='text-gray-600'>{stat.description}</div>
                </motion.div>
              );
            })}
          </motion.div>
        </div>
      </motion.section>

      {/* Categories Section */}
      <motion.section
        className='py-16 px-4 sm:px-6 lg:px-8 bg-gray-50'
        initial='initial'
        whileInView='animate'
        viewport={{ once: true, amount: 0.2 }}
        variants={fadeInUp}
      >
        <div className='max-w-6xl mx-auto'>
          <motion.div className='text-center mb-12' variants={staggerContainer}>
            <motion.h2
              className='text-3xl font-bold text-[#0B1B4D] mb-6'
              variants={fadeInUp}
            >
              Explore by Category
            </motion.h2>
            <motion.p
              className='text-lg text-gray-600 max-w-2xl mx-auto'
              variants={fadeInUp}
            >
              Find posts in your area of interest
            </motion.p>
          </motion.div>

          <motion.div
            className='grid md:grid-cols-3 lg:grid-cols-6 gap-6'
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
                  <Card className='border border-gray-200 shadow-sm hover:shadow-md transition-all duration-300 bg-white cursor-pointer group'>
                    <CardContent className='p-6 text-center'>
                      <div
                        className={`w-12 h-12 bg-gradient-to-br ${category.gradient} rounded-xl flex items-center justify-center text-white mb-4 mx-auto shadow-lg group-hover:shadow-xl transition-all duration-300 group-hover:scale-110`}
                      >
                        <IconComponent className='h-6 w-6' />
                      </div>
                      <h3 className='font-semibold text-gray-900 mb-2'>
                        {category.name}
                      </h3>
                      <p className='text-sm text-gray-600'>
                        {category.count} posts
                      </p>
                    </CardContent>
                  </Card>
                </motion.div>
              );
            })}
          </motion.div>
        </div>
      </motion.section>

      {/* Posts Section */}
      <motion.section
        className='py-16 px-4 sm:px-6 lg:px-8 bg-white'
        initial='initial'
        whileInView='animate'
        viewport={{ once: true, amount: 0.2 }}
        variants={fadeInUp}
      >
        <div className='max-w-6xl mx-auto'>
          <motion.div
            className='flex items-center justify-between mb-12'
            variants={staggerContainer}
          >
            <motion.div variants={fadeInUp}>
              <h2 className='text-3xl font-bold text-[#0B1B4D] mb-4'>
                Recent Posts
              </h2>
              <p className='text-lg text-gray-600'>
                Stay updated with the latest academic opportunities and
                discussions
              </p>
            </motion.div>
            <motion.div className='flex items-center gap-3' variants={fadeInUp}>
              <div className='relative'>
                <Search className='absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400' />
                <Input
                  placeholder='Search posts...'
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className='pl-10 w-64'
                />
              </div>
              <Button variant='outline' size='sm'>
                <Filter className='h-4 w-4 mr-2' />
                Filter
              </Button>
              <Button
                onClick={() => navigate('/signup')}
                className='bg-[#0A66C2] hover:bg-[#084482]'
              >
                <Plus className='h-4 w-4 mr-2' />
                Create Post
              </Button>
            </motion.div>
          </motion.div>

          <motion.div variants={fadeInScale}>
            <Tabs
              value={activeTab}
              onValueChange={setActiveTab}
              className='w-full'
            >
              <TabsList className='grid w-full grid-cols-4 bg-gray-50 px-2 pt-3 pb-14 rounded-xl border border-gray-200 shadow-sm'>
                <TabsTrigger
                  value='all'
                  className='data-[state=active]:bg-white data-[state=active]:text-[#0A66C2] data-[state=active]:font-semibold data-[state=active]:shadow-md data-[state=active]:border data-[state=active]:border-[#0A66C2]/20 transition-all duration-200 hover:bg-gray-100 rounded-lg text-gray-600 font-medium py-3 px-4 text-sm'
                >
                  All Posts
                </TabsTrigger>
                <TabsTrigger
                  value='opportunity'
                  className='data-[state=active]:bg-white data-[state=active]:text-[#0A66C2] data-[state=active]:font-semibold data-[state=active]:shadow-md data-[state=active]:border data-[state=active]:border-[#0A66C2]/20 transition-all duration-200 hover:bg-gray-100 rounded-lg text-gray-600 font-medium py-3 px-4 text-sm'
                >
                  Opportunities
                </TabsTrigger>
                <TabsTrigger
                  value='scholarship'
                  className='data-[state=active]:bg-white data-[state=active]:text-[#0A66C2] data-[state=active]:font-semibold data-[state=active]:shadow-md data-[state=active]:border data-[state=active]:border-[#0A66C2]/20 transition-all duration-200 hover:bg-gray-100 rounded-lg text-gray-600 font-medium py-3 px-4 text-sm'
                >
                  Scholarships
                </TabsTrigger>
                <TabsTrigger
                  value='notice'
                  className='data-[state=active]:bg-white data-[state=active]:text-[#0A66C2] data-[state=active]:font-semibold data-[state=active]:shadow-md data-[state=active]:border data-[state=active]:border-[#0A66C2]/20 transition-all duration-200 hover:bg-gray-100 rounded-lg text-gray-600 font-medium py-3 px-4 text-sm'
                >
                  Notices
                </TabsTrigger>
              </TabsList>

              <TabsContent value='all' className='space-y-6 mt-6'>
                {/* All Posts Content */}
                {/* Highlighted Posts - Notification Queue */}
                {highlightedPosts.length > 0 && (
                  <motion.div className='space-y-4' variants={staggerContainer}>
                    <motion.div
                      className='flex items-center gap-3 p-4 bg-gradient-to-r from-yellow-50 to-orange-50 rounded-xl border border-yellow-200'
                      variants={fadeInUp}
                    >
                      <div className='flex items-center gap-2'>
                        <Bell className='h-5 w-5 text-yellow-600' />
                        <h3 className='text-lg font-semibold text-gray-900'>
                          Highlighted Posts
                        </h3>
                        <Badge className='bg-gradient-to-r from-yellow-400 to-orange-500 text-white border-0 flex items-center gap-1'>
                          <Crown className='h-3 w-3' />
                          Paid Promotion
                        </Badge>
                      </div>
                      <div className='ml-auto'>
                        <Badge className='bg-blue-100 text-blue-700 border-blue-200'>
                          <Target className='h-3 w-3 mr-1' />
                          University Program Promotions
                        </Badge>
                      </div>
                    </motion.div>
                    <motion.div
                      className='grid gap-4'
                      variants={staggerContainer}
                    >
                      {highlightedPosts.map((post) => (
                        <motion.div
                          key={post.id}
                          variants={fadeInScale}
                          whileHover={{ scale: 1.02 }}
                          transition={{ duration: 0.3 }}
                        >
                          <Card className='border-2 border-yellow-200 bg-gradient-to-r from-yellow-50 to-orange-50 shadow-lg hover:shadow-xl transition-all duration-300'>
                            <CardHeader className='pb-3'>
                              <div className='flex items-start justify-between'>
                                <div className='flex items-center gap-3'>
                                  <div className='relative'>
                                    <img
                                      src={post.author.avatar}
                                      alt={post.author.name}
                                      className='w-12 h-12 rounded-full border-2 border-white shadow-lg'
                                    />
                                    {post.author.verified && (
                                      <div className='absolute -bottom-1 -right-1 w-5 h-5 bg-blue-500 rounded-full flex items-center justify-center border-2 border-white'>
                                        <CheckCircle className='h-3 w-3 text-white' />
                                      </div>
                                    )}
                                  </div>
                                  <div>
                                    <div className='flex items-center gap-2'>
                                      <span className='font-semibold text-gray-900'>
                                        {post.author.name}
                                      </span>
                                      {getAuthorIcon(post.author.role)}
                                      {post.author.verified && (
                                        <Badge className='bg-blue-100 text-blue-700 border-blue-200 text-xs'>
                                          Verified
                                        </Badge>
                                      )}
                                    </div>
                                    <div className='text-sm text-gray-600'>
                                      {post.author.institution}
                                    </div>
                                  </div>
                                </div>
                                <div className='flex items-center gap-2'>
                                  <Badge
                                    className={getCategoryColor(post.category)}
                                  >
                                    {getCategoryIcon(post.category)}
                                    {post.type}
                                  </Badge>
                                  <span className='text-xs text-gray-500'>
                                    {post.createdAt}
                                  </span>
                                </div>
                              </div>
                            </CardHeader>
                            <CardContent className='space-y-4'>
                              <div>
                                <h4 className='text-lg font-semibold text-gray-900 mb-2'>
                                  {post.title}
                                </h4>
                                <p className='text-gray-600 mb-3'>
                                  {post.description}
                                </p>
                              </div>

                              <div className='flex flex-wrap gap-2'>
                                {post.tags.map((tag) => (
                                  <Badge
                                    key={tag}
                                    variant='outline'
                                    className='text-xs'
                                  >
                                    {tag}
                                  </Badge>
                                ))}
                              </div>

                              <div className='flex items-center justify-between text-sm text-gray-500'>
                                <div className='flex items-center gap-4'>
                                  {post.location && (
                                    <div className='flex items-center gap-1'>
                                      <MapPin className='h-4 w-4' />
                                      <span>{post.location}</span>
                                    </div>
                                  )}
                                  {post.deadline && (
                                    <div className='flex items-center gap-1'>
                                      <Clock className='h-4 w-4' />
                                      <span>Deadline: {post.deadline}</span>
                                    </div>
                                  )}
                                  {post.amount && (
                                    <div className='flex items-center gap-1'>
                                      <DollarSign className='h-4 w-4' />
                                      <span>{post.amount}</span>
                                    </div>
                                  )}
                                </div>
                                <Badge
                                  className={getEngagementColor(
                                    post.engagement
                                  )}
                                >
                                  <Zap className='h-3 w-3 mr-1' />
                                  {post.engagement} Engagement
                                </Badge>
                              </div>

                              <div className='flex items-center justify-between pt-3 border-t border-gray-200'>
                                <div className='flex items-center gap-4'>
                                  <button
                                    onClick={() => handleLike(post.id)}
                                    className='flex items-center gap-1 text-sm transition-colors text-gray-500 hover:text-red-500'
                                  >
                                    <Heart className='h-4 w-4' />
                                    {post.likes}
                                  </button>
                                  <div className='flex items-center gap-1 text-sm text-gray-500'>
                                    <MessageCircle className='h-4 w-4' />
                                    {post.comments}
                                  </div>
                                  <div className='flex items-center gap-1 text-sm text-gray-500'>
                                    <Share2 className='h-4 w-4' />
                                    {post.shares}
                                  </div>
                                </div>
                                <div className='flex items-center gap-2'>
                                  <button
                                    onClick={() => handleSave(post.id)}
                                    className='p-2 rounded-full transition-colors text-gray-400 hover:text-[#0A66C2] hover:bg-[#0A66C2]/10'
                                  >
                                    <Bookmark className='h-4 w-4' />
                                  </button>
                                  <Button size='sm' variant='outline'>
                                    <ExternalLink className='h-4 w-4 mr-1' />
                                    Apply
                                  </Button>
                                </div>
                              </div>
                            </CardContent>
                          </Card>
                        </motion.div>
                      ))}
                    </motion.div>
                  </motion.div>
                )}

                {/* Regular Posts */}
                <motion.div className='space-y-4' variants={staggerContainer}>
                  {highlightedPosts.length > 0 && (
                    <motion.div
                      className='flex items-center gap-2 mb-4'
                      variants={fadeInUp}
                    >
                      <Clock className='h-5 w-5 text-gray-600' />
                      <h3 className='text-lg font-semibold text-gray-900'>
                        Recent Posts
                      </h3>
                    </motion.div>
                  )}
                  <motion.div
                    className='grid gap-4'
                    variants={staggerContainer}
                  >
                    {regularPosts.map((post) => (
                      <motion.div
                        key={post.id}
                        variants={fadeInScale}
                        whileHover={{ scale: 1.02 }}
                        transition={{ duration: 0.3 }}
                      >
                        <Card className='hover:shadow-md transition-all duration-300 hover:scale-[1.02] bg-white border border-gray-200'>
                          <CardHeader className='pb-3'>
                            <div className='flex items-start justify-between'>
                              <div className='flex items-center gap-3'>
                                <div className='relative'>
                                  <img
                                    src={post.author.avatar}
                                    alt={post.author.name}
                                    className='w-10 h-10 rounded-full border-2 border-white shadow-lg'
                                  />
                                  {post.author.verified && (
                                    <div className='absolute -bottom-1 -right-1 w-4 h-4 bg-blue-500 rounded-full flex items-center justify-center border border-white'>
                                      <CheckCircle className='h-2 w-2 text-white' />
                                    </div>
                                  )}
                                </div>
                                <div>
                                  <div className='flex items-center gap-2'>
                                    <span className='font-semibold text-gray-900'>
                                      {post.author.name}
                                    </span>
                                    {getAuthorIcon(post.author.role)}
                                    {post.author.verified && (
                                      <Badge className='bg-blue-100 text-blue-700 border-blue-200 text-xs'>
                                        Verified
                                      </Badge>
                                    )}
                                  </div>
                                  <div className='text-sm text-gray-600'>
                                    {post.author.institution}
                                  </div>
                                </div>
                              </div>
                              <div className='flex items-center gap-2'>
                                <Badge
                                  className={getCategoryColor(post.category)}
                                >
                                  {getCategoryIcon(post.category)}
                                  {post.type}
                                </Badge>
                                <span className='text-xs text-gray-500'>
                                  {post.createdAt}
                                </span>
                              </div>
                            </div>
                          </CardHeader>
                          <CardContent className='space-y-4'>
                            <div>
                              <h4 className='text-lg font-semibold text-gray-900 mb-2'>
                                {post.title}
                              </h4>
                              <p className='text-gray-600 mb-3'>
                                {post.description}
                              </p>
                            </div>

                            <div className='flex flex-wrap gap-2'>
                              {post.tags.map((tag) => (
                                <Badge
                                  key={tag}
                                  variant='outline'
                                  className='text-xs'
                                >
                                  {tag}
                                </Badge>
                              ))}
                            </div>

                            <div className='flex items-center justify-between text-sm text-gray-500'>
                              <div className='flex items-center gap-4'>
                                {post.location && (
                                  <div className='flex items-center gap-1'>
                                    <MapPin className='h-4 w-4' />
                                    <span>{post.location}</span>
                                  </div>
                                )}
                                {post.deadline && (
                                  <div className='flex items-center gap-1'>
                                    <Clock className='h-4 w-4' />
                                    <span>Deadline: {post.deadline}</span>
                                  </div>
                                )}
                                {post.amount && (
                                  <div className='flex items-center gap-1'>
                                    <DollarSign className='h-4 w-4' />
                                    <span>{post.amount}</span>
                                  </div>
                                )}
                              </div>
                              <Badge
                                className={getEngagementColor(post.engagement)}
                              >
                                <Zap className='h-3 w-3 mr-1' />
                                {post.engagement} Engagement
                              </Badge>
                            </div>

                            <div className='flex items-center justify-between pt-3 border-t border-gray-200'>
                              <div className='flex items-center gap-4'>
                                <button
                                  onClick={() => handleLike(post.id)}
                                  className='flex items-center gap-1 text-sm transition-colors text-gray-500 hover:text-red-500'
                                >
                                  <Heart className='h-4 w-4' />
                                  {post.likes}
                                </button>
                                <div className='flex items-center gap-1 text-sm text-gray-500'>
                                  <MessageCircle className='h-4 w-4' />
                                  {post.comments}
                                </div>
                                <div className='flex items-center gap-1 text-sm text-gray-500'>
                                  <Share2 className='h-4 w-4' />
                                  {post.shares}
                                </div>
                              </div>
                              <div className='flex items-center gap-2'>
                                <button
                                  onClick={() => handleSave(post.id)}
                                  className='p-2 rounded-full transition-colors text-gray-400 hover:text-[#0A66C2] hover:bg-[#0A66C2]/10'
                                >
                                  <Bookmark className='h-4 w-4' />
                                </button>
                                <Button size='sm' variant='outline'>
                                  <ExternalLink className='h-4 w-4 mr-1' />
                                  Apply
                                </Button>
                              </div>
                            </div>
                          </CardContent>
                        </Card>
                      </motion.div>
                    ))}
                  </motion.div>
                </motion.div>
              </TabsContent>

              <TabsContent value='opportunity' className='space-y-6 mt-6'>
                {/* Opportunities Content */}
                <motion.div className='space-y-4' variants={staggerContainer}>
                  <motion.div
                    className='flex items-center gap-2 mb-4'
                    variants={fadeInUp}
                  >
                    <Briefcase className='h-5 w-5 text-gray-600' />
                    <h3 className='text-lg font-semibold text-gray-900'>
                      Opportunities
                    </h3>
                  </motion.div>
                  <motion.div
                    className='grid gap-4'
                    variants={staggerContainer}
                  >
                    {regularPosts
                      .filter((post) => post.category === 'opportunity')
                      .map((post) => (
                        <motion.div
                          key={post.id}
                          variants={fadeInScale}
                          whileHover={{ scale: 1.02 }}
                          transition={{ duration: 0.3 }}
                        >
                          <Card className='hover:shadow-md transition-all duration-300 hover:scale-[1.02] bg-white border border-gray-200'>
                            <CardHeader className='pb-3'>
                              <div className='flex items-start justify-between'>
                                <div className='flex items-center gap-3'>
                                  <div className='relative'>
                                    <img
                                      src={post.author.avatar}
                                      alt={post.author.name}
                                      className='w-10 h-10 rounded-full border-2 border-white shadow-lg'
                                    />
                                    {post.author.verified && (
                                      <div className='absolute -bottom-1 -right-1 w-4 h-4 bg-blue-500 rounded-full flex items-center justify-center border border-white'>
                                        <CheckCircle className='h-2 w-2 text-white' />
                                      </div>
                                    )}
                                  </div>
                                  <div>
                                    <div className='flex items-center gap-2'>
                                      <span className='font-semibold text-gray-900'>
                                        {post.author.name}
                                      </span>
                                      {getAuthorIcon(post.author.role)}
                                      {post.author.verified && (
                                        <Badge className='bg-blue-100 text-blue-700 border-blue-200 text-xs'>
                                          Verified
                                        </Badge>
                                      )}
                                    </div>
                                    <div className='text-sm text-gray-600'>
                                      {post.author.institution}
                                    </div>
                                  </div>
                                </div>
                                <div className='flex items-center gap-2'>
                                  <Badge
                                    className={getCategoryColor(post.category)}
                                  >
                                    {getCategoryIcon(post.category)}
                                    {post.type}
                                  </Badge>
                                  <span className='text-xs text-gray-500'>
                                    {post.createdAt}
                                  </span>
                                </div>
                              </div>
                            </CardHeader>
                            <CardContent className='space-y-4'>
                              <div>
                                <h4 className='text-lg font-semibold text-gray-900 mb-2'>
                                  {post.title}
                                </h4>
                                <p className='text-gray-600 mb-3'>
                                  {post.description}
                                </p>
                              </div>

                              <div className='flex flex-wrap gap-2'>
                                {post.tags.map((tag) => (
                                  <Badge
                                    key={tag}
                                    variant='outline'
                                    className='text-xs'
                                  >
                                    {tag}
                                  </Badge>
                                ))}
                              </div>

                              <div className='flex items-center justify-between text-sm text-gray-500'>
                                <div className='flex items-center gap-4'>
                                  {post.location && (
                                    <div className='flex items-center gap-1'>
                                      <MapPin className='h-4 w-4' />
                                      <span>{post.location}</span>
                                    </div>
                                  )}
                                  {post.deadline && (
                                    <div className='flex items-center gap-1'>
                                      <Clock className='h-4 w-4' />
                                      <span>Deadline: {post.deadline}</span>
                                    </div>
                                  )}
                                  {post.amount && (
                                    <div className='flex items-center gap-1'>
                                      <DollarSign className='h-4 w-4' />
                                      <span>{post.amount}</span>
                                    </div>
                                  )}
                                </div>
                                <Badge
                                  className={getEngagementColor(
                                    post.engagement
                                  )}
                                >
                                  <Zap className='h-3 w-3 mr-1' />
                                  {post.engagement} Engagement
                                </Badge>
                              </div>

                              <div className='flex items-center justify-between pt-3 border-t border-gray-200'>
                                <div className='flex items-center gap-4'>
                                  <button
                                    onClick={() => handleLike(post.id)}
                                    className='flex items-center gap-1 text-sm transition-colors text-gray-500 hover:text-red-500'
                                  >
                                    <Heart className='h-4 w-4' />
                                    {post.likes}
                                  </button>
                                  <div className='flex items-center gap-1 text-sm text-gray-500'>
                                    <MessageCircle className='h-4 w-4' />
                                    {post.comments}
                                  </div>
                                  <div className='flex items-center gap-1 text-sm text-gray-500'>
                                    <Share2 className='h-4 w-4' />
                                    {post.shares}
                                  </div>
                                </div>
                                <div className='flex items-center gap-2'>
                                  <button
                                    onClick={() => handleSave(post.id)}
                                    className='p-2 rounded-full transition-colors text-gray-400 hover:text-[#0A66C2] hover:bg-[#0A66C2]/10'
                                  >
                                    <Bookmark className='h-4 w-4' />
                                  </button>
                                  <Button size='sm' variant='outline'>
                                    <ExternalLink className='h-4 w-4 mr-1' />
                                    Apply
                                  </Button>
                                </div>
                              </div>
                            </CardContent>
                          </Card>
                        </motion.div>
                      ))}
                  </motion.div>
                </motion.div>
              </TabsContent>

              <TabsContent value='scholarship' className='space-y-6 mt-6'>
                {/* Scholarships Content */}
                <motion.div className='space-y-4' variants={staggerContainer}>
                  <motion.div
                    className='flex items-center gap-2 mb-4'
                    variants={fadeInUp}
                  >
                    <GraduationCap className='h-5 w-5 text-gray-600' />
                    <h3 className='text-lg font-semibold text-gray-900'>
                      Scholarships
                    </h3>
                  </motion.div>
                  <motion.div
                    className='grid gap-4'
                    variants={staggerContainer}
                  >
                    {regularPosts
                      .filter((post) => post.category === 'scholarship')
                      .map((post) => (
                        <motion.div
                          key={post.id}
                          variants={fadeInScale}
                          whileHover={{ scale: 1.02 }}
                          transition={{ duration: 0.3 }}
                        >
                          <Card className='hover:shadow-md transition-all duration-300 hover:scale-[1.02] bg-white border border-gray-200'>
                            <CardHeader className='pb-3'>
                              <div className='flex items-start justify-between'>
                                <div className='flex items-center gap-3'>
                                  <div className='relative'>
                                    <img
                                      src={post.author.avatar}
                                      alt={post.author.name}
                                      className='w-10 h-10 rounded-full border-2 border-white shadow-lg'
                                    />
                                    {post.author.verified && (
                                      <div className='absolute -bottom-1 -right-1 w-4 h-4 bg-blue-500 rounded-full flex items-center justify-center border border-white'>
                                        <CheckCircle className='h-2 w-2 text-white' />
                                      </div>
                                    )}
                                  </div>
                                  <div>
                                    <div className='flex items-center gap-2'>
                                      <span className='font-semibold text-gray-900'>
                                        {post.author.name}
                                      </span>
                                      {getAuthorIcon(post.author.role)}
                                      {post.author.verified && (
                                        <Badge className='bg-blue-100 text-blue-700 border-blue-200 text-xs'>
                                          Verified
                                        </Badge>
                                      )}
                                    </div>
                                    <div className='text-sm text-gray-600'>
                                      {post.author.institution}
                                    </div>
                                  </div>
                                </div>
                                <div className='flex items-center gap-2'>
                                  <Badge
                                    className={getCategoryColor(post.category)}
                                  >
                                    {getCategoryIcon(post.category)}
                                    {post.type}
                                  </Badge>
                                  <span className='text-xs text-gray-500'>
                                    {post.createdAt}
                                  </span>
                                </div>
                              </div>
                            </CardHeader>
                            <CardContent className='space-y-4'>
                              <div>
                                <h4 className='text-lg font-semibold text-gray-900 mb-2'>
                                  {post.title}
                                </h4>
                                <p className='text-gray-600 mb-3'>
                                  {post.description}
                                </p>
                              </div>

                              <div className='flex flex-wrap gap-2'>
                                {post.tags.map((tag) => (
                                  <Badge
                                    key={tag}
                                    variant='outline'
                                    className='text-xs'
                                  >
                                    {tag}
                                  </Badge>
                                ))}
                              </div>

                              <div className='flex items-center justify-between text-sm text-gray-500'>
                                <div className='flex items-center gap-4'>
                                  {post.location && (
                                    <div className='flex items-center gap-1'>
                                      <MapPin className='h-4 w-4' />
                                      <span>{post.location}</span>
                                    </div>
                                  )}
                                  {post.deadline && (
                                    <div className='flex items-center gap-1'>
                                      <Clock className='h-4 w-4' />
                                      <span>Deadline: {post.deadline}</span>
                                    </div>
                                  )}
                                  {post.amount && (
                                    <div className='flex items-center gap-1'>
                                      <DollarSign className='h-4 w-4' />
                                      <span>{post.amount}</span>
                                    </div>
                                  )}
                                </div>
                                <Badge
                                  className={getEngagementColor(
                                    post.engagement
                                  )}
                                >
                                  <Zap className='h-3 w-3 mr-1' />
                                  {post.engagement} Engagement
                                </Badge>
                              </div>

                              <div className='flex items-center justify-between pt-3 border-t border-gray-200'>
                                <div className='flex items-center gap-4'>
                                  <button
                                    onClick={() => handleLike(post.id)}
                                    className='flex items-center gap-1 text-sm transition-colors text-gray-500 hover:text-red-500'
                                  >
                                    <Heart className='h-4 w-4' />
                                    {post.likes}
                                  </button>
                                  <div className='flex items-center gap-1 text-sm text-gray-500'>
                                    <MessageCircle className='h-4 w-4' />
                                    {post.comments}
                                  </div>
                                  <div className='flex items-center gap-1 text-sm text-gray-500'>
                                    <Share2 className='h-4 w-4' />
                                    {post.shares}
                                  </div>
                                </div>
                                <div className='flex items-center gap-2'>
                                  <button
                                    onClick={() => handleSave(post.id)}
                                    className='p-2 rounded-full transition-colors text-gray-400 hover:text-[#0A66C2] hover:bg-[#0A66C2]/10'
                                  >
                                    <Bookmark className='h-4 w-4' />
                                  </button>
                                  <Button size='sm' variant='outline'>
                                    <ExternalLink className='h-4 w-4 mr-1' />
                                    Apply
                                  </Button>
                                </div>
                              </div>
                            </CardContent>
                          </Card>
                        </motion.div>
                      ))}
                  </motion.div>
                </motion.div>
              </TabsContent>

              <TabsContent value='notice' className='space-y-6 mt-6'>
                {/* Notices Content */}
                <motion.div className='space-y-4' variants={staggerContainer}>
                  <motion.div
                    className='flex items-center gap-2 mb-4'
                    variants={fadeInUp}
                  >
                    <Bell className='h-5 w-5 text-gray-600' />
                    <h3 className='text-lg font-semibold text-gray-900'>
                      Notices
                    </h3>
                  </motion.div>
                  <motion.div
                    className='grid gap-4'
                    variants={staggerContainer}
                  >
                    {regularPosts
                      .filter((post) => post.category === 'notice')
                      .map((post) => (
                        <motion.div
                          key={post.id}
                          variants={fadeInScale}
                          whileHover={{ scale: 1.02 }}
                          transition={{ duration: 0.3 }}
                        >
                          <Card className='hover:shadow-md transition-all duration-300 hover:scale-[1.02] bg-white border border-gray-200'>
                            <CardHeader className='pb-3'>
                              <div className='flex items-start justify-between'>
                                <div className='flex items-center gap-3'>
                                  <div className='relative'>
                                    <img
                                      src={post.author.avatar}
                                      alt={post.author.name}
                                      className='w-10 h-10 rounded-full border-2 border-white shadow-lg'
                                    />
                                    {post.author.verified && (
                                      <div className='absolute -bottom-1 -right-1 w-4 h-4 bg-blue-500 rounded-full flex items-center justify-center border border-white'>
                                        <CheckCircle className='h-2 w-2 text-white' />
                                      </div>
                                    )}
                                  </div>
                                  <div>
                                    <div className='flex items-center gap-2'>
                                      <span className='font-semibold text-gray-900'>
                                        {post.author.name}
                                      </span>
                                      {getAuthorIcon(post.author.role)}
                                      {post.author.verified && (
                                        <Badge className='bg-blue-100 text-blue-700 border-blue-200 text-xs'>
                                          Verified
                                        </Badge>
                                      )}
                                    </div>
                                    <div className='text-sm text-gray-600'>
                                      {post.author.institution}
                                    </div>
                                  </div>
                                </div>
                                <div className='flex items-center gap-2'>
                                  <Badge
                                    className={getCategoryColor(post.category)}
                                  >
                                    {getCategoryIcon(post.category)}
                                    {post.type}
                                  </Badge>
                                  <span className='text-xs text-gray-500'>
                                    {post.createdAt}
                                  </span>
                                </div>
                              </div>
                            </CardHeader>
                            <CardContent className='space-y-4'>
                              <div>
                                <h4 className='text-lg font-semibold text-gray-900 mb-2'>
                                  {post.title}
                                </h4>
                                <p className='text-gray-600 mb-3'>
                                  {post.description}
                                </p>
                              </div>

                              <div className='flex flex-wrap gap-2'>
                                {post.tags.map((tag) => (
                                  <Badge
                                    key={tag}
                                    variant='outline'
                                    className='text-xs'
                                  >
                                    {tag}
                                  </Badge>
                                ))}
                              </div>

                              <div className='flex items-center justify-between text-sm text-gray-500'>
                                <div className='flex items-center gap-4'>
                                  {post.location && (
                                    <div className='flex items-center gap-1'>
                                      <MapPin className='h-4 w-4' />
                                      <span>{post.location}</span>
                                    </div>
                                  )}
                                  {post.deadline && (
                                    <div className='flex items-center gap-1'>
                                      <Clock className='h-4 w-4' />
                                      <span>Deadline: {post.deadline}</span>
                                    </div>
                                  )}
                                  {post.amount && (
                                    <div className='flex items-center gap-1'>
                                      <DollarSign className='h-4 w-4' />
                                      <span>{post.amount}</span>
                                    </div>
                                  )}
                                </div>
                                <Badge
                                  className={getEngagementColor(
                                    post.engagement
                                  )}
                                >
                                  <Zap className='h-3 w-3 mr-1' />
                                  {post.engagement} Engagement
                                </Badge>
                              </div>

                              <div className='flex items-center justify-between pt-3 border-t border-gray-200'>
                                <div className='flex items-center gap-4'>
                                  <button
                                    onClick={() => handleLike(post.id)}
                                    className='flex items-center gap-1 text-sm transition-colors text-gray-500 hover:text-red-500'
                                  >
                                    <Heart className='h-4 w-4' />
                                    {post.likes}
                                  </button>
                                  <div className='flex items-center gap-1 text-sm text-gray-500'>
                                    <MessageCircle className='h-4 w-4' />
                                    {post.comments}
                                  </div>
                                  <div className='flex items-center gap-1 text-sm text-gray-500'>
                                    <Share2 className='h-4 w-4' />
                                    {post.shares}
                                  </div>
                                </div>
                                <div className='flex items-center gap-2'>
                                  <button
                                    onClick={() => handleSave(post.id)}
                                    className='p-2 rounded-full transition-colors text-gray-400 hover:text-[#0A66C2] hover:bg-[#0A66C2]/10'
                                  >
                                    <Bookmark className='h-4 w-4' />
                                  </button>
                                  <Button size='sm' variant='outline'>
                                    <ExternalLink className='h-4 w-4 mr-1' />
                                    Apply
                                  </Button>
                                </div>
                              </div>
                            </CardContent>
                          </Card>
                        </motion.div>
                      ))}
                  </motion.div>
                </motion.div>
              </TabsContent>
            </Tabs>
          </motion.div>
        </div>
      </motion.section>

      {/* CTA Section */}
      <motion.section
        className='py-32 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50'
        initial='initial'
        whileInView='animate'
        viewport={{ once: true, amount: 0.2 }}
        variants={fadeInUp}
      >
        <div className='max-w-4xl mx-auto text-center'>
          <motion.h2
            className='text-3xl sm:text-4xl font-bold text-[#0B1B4D] mb-6'
            variants={fadeInUp}
          >
            Stay Updated with Latest Posts
          </motion.h2>
          <motion.p
            className='text-lg text-gray-600 mb-10 max-w-2xl mx-auto'
            variants={fadeInUp}
          >
            Join thousands of students and professionals who stay informed about
            the latest academic opportunities and discussions.
          </motion.p>
          <motion.div
            className='flex flex-col sm:flex-row gap-4 justify-center'
            variants={fadeInUp}
          >
            <Button
              size='lg'
              onClick={() => navigate('/signup')}
              className='bg-[#0A66C2] hover:bg-[#084482] text-white px-8 py-4 text-lg font-semibold shadow-xl transition-transform duration-200 hover:scale-105'
            >
              Join the Community
              <ArrowRight className='ml-2 h-5 w-5' />
            </Button>
            <Button
              size='lg'
              variant='outline'
              className='border-[#0A66C2] text-[#0A66C2] hover:bg-[#0A66C2] hover:text-white px-8 py-4 text-lg font-semibold'
            >
              Create Post
            </Button>
          </motion.div>
        </div>
      </motion.section>

      <LandingFooter />
    </div>
  );
};

export default RecentPosts;
