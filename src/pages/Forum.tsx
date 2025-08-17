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
  Users,
  MessageSquare,
  TrendingUp,
  Search,
  Filter,
  Globe,
  BookOpen,
  GraduationCap,
  Building2,
  Star,
  Clock,
  MapPin,
  Heart,
  MessageCircle,
  Share2,
  Bookmark,
  ArrowRight,
  Plus,
  Activity,
  Users2,
  CheckCircle,
  Award,
  Calendar,
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

const Forum = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('all');

  const forumStats = [
    {
      icon: Users,
      number: '50,000+',
      label: 'Active Members',
      description: 'Students, professors, and universities',
    },
    {
      icon: MessageSquare,
      number: '100,000+',
      label: 'Discussions',
      description: 'Meaningful conversations daily',
    },
    {
      icon: BookOpen,
      number: '500+',
      label: 'Study Groups',
      description: 'Active learning communities',
    },
    {
      icon: Globe,
      number: '80+',
      label: 'Countries',
      description: 'Global academic network',
    },
  ];

  const studyGroups = [
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
      category: 'Technology',
      discussions: 156,
      resources: 89,
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
      category: 'Healthcare',
      discussions: 98,
      resources: 45,
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
      category: 'Business',
      discussions: 134,
      resources: 67,
    },
    {
      id: 4,
      name: 'Engineering Research Network',
      image:
        'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80',
      status: 'Very Active',
      members: '3,256',
      description:
        'Advanced engineering discussions, research collaboration, and innovation projects.',
      tags: ['Engineering', 'Research', 'Innovation'],
      color: 'orange',
      activity: 'High',
      lastActive: '1 hour ago',
      featured: true,
      category: 'Engineering',
      discussions: 234,
      resources: 156,
    },
    {
      id: 5,
      name: 'Psychology & Mental Health',
      image:
        'https://images.unsplash.com/photo-1559757148-5c350d0d3c56?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80',
      status: 'Active',
      members: '1,234',
      description:
        'Discuss psychology research, mental health topics, and clinical practices.',
      tags: ['Psychology', 'Mental Health', 'Research'],
      color: 'purple',
      activity: 'Medium',
      lastActive: '3 hours ago',
      featured: false,
      category: 'Psychology',
      discussions: 87,
      resources: 34,
    },
    {
      id: 6,
      name: 'Physics & Astronomy',
      image:
        'https://images.unsplash.com/photo-1517077304055-6e89abbf09b0?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80',
      status: 'Active',
      members: '987',
      description:
        'Explore the mysteries of the universe through physics and astronomy discussions.',
      tags: ['Physics', 'Astronomy', 'Research'],
      color: 'indigo',
      activity: 'Medium',
      lastActive: '6 hours ago',
      featured: false,
      category: 'Science',
      discussions: 76,
      resources: 28,
    },
  ];

  const recentDiscussions = [
    {
      id: 1,
      title: 'Best practices for machine learning model deployment',
      author: 'Dr. Sarah Chen',
      avatar:
        'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=400&q=80',
      group: 'Computer Science Students',
      replies: 23,
      views: 156,
      lastActivity: '2 hours ago',
      tags: ['Machine Learning', 'Deployment', 'Best Practices'],
      isHot: true,
    },
    {
      id: 2,
      title: 'Understanding quantum computing fundamentals',
      author: 'Prof. Michael Rodriguez',
      avatar:
        'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=400&q=80',
      group: 'Physics & Astronomy',
      replies: 18,
      views: 89,
      lastActivity: '4 hours ago',
      tags: ['Quantum Computing', 'Physics', 'Education'],
      isHot: false,
    },
    {
      id: 3,
      title: 'Career advice for recent engineering graduates',
      author: 'Maria Gonzalez',
      avatar:
        'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=400&q=80',
      group: 'Engineering Research Network',
      replies: 45,
      views: 234,
      lastActivity: '1 hour ago',
      tags: ['Career', 'Engineering', 'Graduates'],
      isHot: true,
    },
    {
      id: 4,
      title: 'Research collaboration opportunities in economics',
      author: 'Dr. Alessandro Rossi',
      avatar:
        'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=400&q=80',
      group: 'Business & Economics Hub',
      replies: 12,
      views: 67,
      lastActivity: '6 hours ago',
      tags: ['Economics', 'Research', 'Collaboration'],
      isHot: false,
    },
  ];

  const categories = [
    { name: 'Technology', icon: BookOpen, count: 45, color: 'blue' },
    { name: 'Healthcare', icon: GraduationCap, count: 32, color: 'green' },
    { name: 'Business', icon: Building2, count: 28, color: 'yellow' },
    { name: 'Engineering', icon: BookOpen, count: 38, color: 'orange' },
    { name: 'Psychology', icon: GraduationCap, count: 24, color: 'purple' },
    { name: 'Science', icon: BookOpen, count: 31, color: 'indigo' },
  ];

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
              Academic Community
            </Badge>
          </motion.div>
          <motion.h2
            className='text-4xl sm:text-5xl font-bold text-gray-900 mb-6 leading-tight'
            variants={fadeInUp}
          >
            Join the Global{' '}
            <span className='text-[#0A66C2]'>Academic Forum</span>
          </motion.h2>
          <motion.p
            className='text-base text-gray-600 leading-relaxed max-w-2xl mx-auto'
            variants={fadeInUp}
          >
            Connect with students, professors, and researchers worldwide. Share
            knowledge, ask questions, and collaborate on academic projects.
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
              Explore Groups
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
            {forumStats.map((stat) => {
              const IconComponent = stat.icon;
              return (
                <motion.div
                  key={stat.label}
                  className='text-center'
                  variants={fadeInScale}
                  whileHover={{ scale: 1.05 }}
                  transition={{ duration: 0.3 }}
                >
                  <div className='flex justify-center mb-4'>
                    <div className='w-16 h-16 bg-gradient-to-br from-[#0A66C2] to-[#084482] rounded-2xl flex items-center justify-center text-white shadow-lg'>
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
              Find study groups and discussions in your field of interest
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
                  <Card className='border border-gray-200 shadow-sm hover:shadow-md transition-all duration-300 bg-white cursor-pointer'>
                    <CardContent className='p-6 text-center'>
                      <div
                        className={`w-12 h-12 bg-gradient-to-br from-[#0A66C2] to-[#084482] rounded-xl flex items-center justify-center text-white mb-4 mx-auto shadow-lg`}
                      >
                        <IconComponent className='h-6 w-6' />
                      </div>
                      <h3 className='font-semibold text-gray-900 mb-2'>
                        {category.name}
                      </h3>
                      <p className='text-sm text-gray-600'>
                        {category.count} groups
                      </p>
                    </CardContent>
                  </Card>
                </motion.div>
              );
            })}
          </motion.div>
        </div>
      </motion.section>

      {/* Study Groups Section */}
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
                Popular Study Groups
              </h2>
              <p className='text-lg text-gray-600'>
                Join active communities in your field of study
              </p>
            </motion.div>
            <motion.div variants={fadeInUp}>
              <Button
                onClick={() => navigate('/signup')}
                className='bg-[#0A66C2] hover:bg-[#084482] text-white'
              >
                <Plus className='h-4 w-4 mr-2' />
                Create Group
              </Button>
            </motion.div>
          </motion.div>

          <motion.div
            className='grid md:grid-cols-2 lg:grid-cols-3 gap-8'
            variants={staggerContainer}
          >
            {studyGroups.map((group) => (
              <motion.div
                key={group.id}
                variants={fadeInScale}
                whileHover={{ scale: 1.05 }}
                transition={{ duration: 0.3 }}
              >
                <Card className='border border-gray-200 shadow-sm hover:shadow-md transition-all duration-300 bg-white overflow-hidden group relative'>
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
                    <div className='flex items-center justify-between text-sm text-gray-600 pb-4'>
                      <div className='flex items-center gap-4'>
                        <div className='flex items-center gap-1'>
                          <MessageCircle className='h-4 w-4' />
                          <span>{group.discussions} discussions</span>
                        </div>
                        <div className='flex items-center gap-1'>
                          <BookOpen className='h-4 w-4' />
                          <span>{group.resources} resources</span>
                        </div>
                      </div>
                    </div>
                    <Button className='w-full bg-[#0A66C2] hover:bg-[#084482] text-white font-semibold py-3 rounded-lg transition-all duration-200 hover:scale-105'>
                      Join Group
                    </Button>
                  </CardHeader>
                </Card>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </motion.section>

      {/* Recent Discussions Section */}
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
              Recent Discussions
            </motion.h2>
            <motion.p
              className='text-lg text-gray-600 max-w-2xl mx-auto'
              variants={fadeInUp}
            >
              Stay updated with the latest conversations and trending topics
            </motion.p>
          </motion.div>

          <motion.div variants={fadeInScale}>
            <Tabs
              value={activeTab}
              onValueChange={setActiveTab}
              className='w-full'
            >
              <TabsList className='grid w-full grid-cols-4'>
                <TabsTrigger value='all'>All Discussions</TabsTrigger>
                <TabsTrigger value='hot'>Trending</TabsTrigger>
                <TabsTrigger value='recent'>Recent</TabsTrigger>
                <TabsTrigger value='popular'>Popular</TabsTrigger>
              </TabsList>

              <TabsContent value={activeTab} className='mt-6'>
                <motion.div className='space-y-4' variants={staggerContainer}>
                  {recentDiscussions.map((discussion) => (
                    <motion.div
                      key={discussion.id}
                      variants={fadeInScale}
                      whileHover={{ scale: 1.02 }}
                      transition={{ duration: 0.3 }}
                    >
                      <Card className='border border-gray-200 shadow-sm hover:shadow-md transition-all duration-300 bg-white'>
                        <CardContent className='p-6'>
                          <div className='flex items-start gap-4'>
                            <img
                              src={discussion.avatar}
                              alt={discussion.author}
                              className='w-12 h-12 rounded-full'
                            />
                            <div className='flex-1'>
                              <div className='flex items-center gap-2 mb-2'>
                                <h3 className='text-lg font-semibold text-[#0B1B4D]'>
                                  {discussion.title}
                                </h3>
                                {discussion.isHot && (
                                  <Badge className='bg-red-100 text-red-700 border-0'>
                                    <TrendingUp className='h-3 w-3 mr-1' />
                                    Hot
                                  </Badge>
                                )}
                              </div>
                              <div className='flex items-center gap-4 text-sm text-gray-600 mb-3'>
                                <span className='font-medium'>
                                  {discussion.author}
                                </span>
                                <span>•</span>
                                <span>{discussion.group}</span>
                                <span>•</span>
                                <span>{discussion.lastActivity}</span>
                              </div>
                              <div className='flex flex-wrap gap-2 mb-4'>
                                {discussion.tags.map((tag, index) => (
                                  <Badge
                                    key={index}
                                    variant='outline'
                                    className='text-xs'
                                  >
                                    {tag}
                                  </Badge>
                                ))}
                              </div>
                              <div className='flex items-center justify-between'>
                                <div className='flex items-center gap-4 text-sm text-gray-500'>
                                  <div className='flex items-center gap-1'>
                                    <MessageCircle className='h-4 w-4' />
                                    <span>{discussion.replies} replies</span>
                                  </div>
                                  <div className='flex items-center gap-1'>
                                    <Users className='h-4 w-4' />
                                    <span>{discussion.views} views</span>
                                  </div>
                                </div>
                                <div className='flex items-center gap-2'>
                                  <Button
                                    variant='outline'
                                    size='sm'
                                    className='border-gray-300 hover:border-[#0A66C2] hover:text-[#0A66C2]'
                                  >
                                    <Heart className='h-4 w-4 mr-1' />
                                    Like
                                  </Button>
                                  <Button
                                    variant='outline'
                                    size='sm'
                                    className='border-gray-300 hover:border-[#0A66C2] hover:text-[#0A66C2]'
                                  >
                                    <Share2 className='h-4 w-4 mr-1' />
                                    Share
                                  </Button>
                                </div>
                              </div>
                            </div>
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
        className='py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50'
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
            Ready to Join the Conversation?
          </motion.h2>
          <motion.p
            className='text-lg text-gray-600 mb-10 max-w-2xl mx-auto'
            variants={fadeInUp}
          >
            Connect with thousands of students, professors, and researchers
            worldwide. Share your knowledge and learn from others.
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
              Join the Forum
              <ArrowRight className='ml-2 h-5 w-5' />
            </Button>
            <Button
              size='lg'
              variant='outline'
              className='border-[#0A66C2] text-[#0A66C2] hover:bg-[#0A66C2] hover:text-white px-8 py-4 text-lg font-semibold'
            >
              Explore Groups
            </Button>
          </motion.div>
        </div>
      </motion.section>

      <LandingFooter />
    </div>
  );
};

export default Forum;
