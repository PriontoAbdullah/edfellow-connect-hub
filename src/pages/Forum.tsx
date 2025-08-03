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
      <section className='relative py-28 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-green-50 via-emerald-50 to-teal-50'>
        <div className='max-w-6xl mx-auto text-center'>
          <Badge className='bg-white/90 backdrop-blur-sm text-green-600 border-green-200 mb-8 px-6 py-3 text-base font-semibold shadow-lg'>
            Academic Community
          </Badge>
          <h1 className='text-5xl sm:text-6xl font-extrabold text-[#0B1B4D] mb-8 leading-tight'>
            Join the Global{' '}
            <span className='bg-gradient-to-r from-green-600 to-emerald-600 bg-clip-text text-transparent'>
              Academic Forum
            </span>
          </h1>
          <p className='text-xl text-gray-600 mb-10 max-w-3xl mx-auto leading-relaxed'>
            Connect with students, professors, and researchers worldwide. Share
            knowledge, ask questions, and collaborate on academic projects.
          </p>
          <div className='flex flex-col sm:flex-row gap-4 justify-center'>
            <Button
              size='lg'
              onClick={() => navigate('/signup')}
              className='bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 text-white px-8 py-4 text-lg font-semibold shadow-xl transition-transform duration-200 hover:scale-105'
            >
              Join the Community
              <ArrowRight className='ml-2 h-5 w-5' />
            </Button>
            <Button
              size='lg'
              variant='outline'
              className='border-green-600 text-green-600 hover:bg-green-600 hover:text-white px-8 py-4 text-lg font-semibold'
            >
              Explore Groups
            </Button>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className='py-16 px-4 sm:px-6 lg:px-8 bg-white'>
        <div className='max-w-6xl mx-auto'>
          <div className='grid md:grid-cols-4 gap-8'>
            {forumStats.map((stat) => {
              const IconComponent = stat.icon;
              return (
                <div key={stat.label} className='text-center'>
                  <div className='flex justify-center mb-4'>
                    <div className='w-16 h-16 bg-gradient-to-br from-green-500 to-emerald-600 rounded-2xl flex items-center justify-center text-white shadow-lg'>
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
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Categories Section */}
      <section className='py-16 px-4 sm:px-6 lg:px-8 bg-gray-50'>
        <div className='max-w-6xl mx-auto'>
          <div className='text-center mb-12'>
            <h2 className='text-3xl font-bold text-[#0B1B4D] mb-6'>
              Explore by Category
            </h2>
            <p className='text-lg text-gray-600 max-w-2xl mx-auto'>
              Find study groups and discussions in your field of interest
            </p>
          </div>

          <div className='grid md:grid-cols-3 lg:grid-cols-6 gap-6'>
            {categories.map((category) => {
              const IconComponent = category.icon;
              return (
                <Card
                  key={category.name}
                  className='border-0 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 bg-white cursor-pointer'
                >
                  <CardContent className='p-6 text-center'>
                    <div
                      className={`w-12 h-12 bg-gradient-to-br from-${category.color}-500 to-${category.color}-600 rounded-xl flex items-center justify-center text-white mb-4 mx-auto shadow-lg`}
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
              );
            })}
          </div>
        </div>
      </section>

      {/* Study Groups Section */}
      <section className='py-16 px-4 sm:px-6 lg:px-8 bg-white'>
        <div className='max-w-6xl mx-auto'>
          <div className='flex items-center justify-between mb-12'>
            <div>
              <h2 className='text-3xl font-bold text-[#0B1B4D] mb-4'>
                Popular Study Groups
              </h2>
              <p className='text-lg text-gray-600'>
                Join active communities in your field of study
              </p>
            </div>
            <Button
              onClick={() => navigate('/signup')}
              className='bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 text-white'
            >
              <Plus className='h-4 w-4 mr-2' />
              Create Group
            </Button>
          </div>

          <div className='grid md:grid-cols-2 lg:grid-cols-3 gap-8'>
            {studyGroups.map((group) => (
              <Card
                key={group.id}
                className='border-0 shadow-xl hover:shadow-2xl transition-all duration-300 hover:scale-105 bg-white overflow-hidden group relative'
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
                  <Button className='w-full bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 text-white font-semibold py-3 rounded-lg transition-all duration-200 hover:scale-105'>
                    Join Group
                  </Button>
                </CardHeader>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Recent Discussions Section */}
      <section className='py-16 px-4 sm:px-6 lg:px-8 bg-gray-50'>
        <div className='max-w-6xl mx-auto'>
          <div className='text-center mb-12'>
            <h2 className='text-3xl font-bold text-[#0B1B4D] mb-6'>
              Recent Discussions
            </h2>
            <p className='text-lg text-gray-600 max-w-2xl mx-auto'>
              Stay updated with the latest conversations and trending topics
            </p>
          </div>

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
              <div className='space-y-4'>
                {recentDiscussions.map((discussion) => (
                  <Card
                    key={discussion.id}
                    className='border-0 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 bg-white'
                  >
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
                                className='border-gray-300 hover:border-green-600 hover:text-green-600'
                              >
                                <Heart className='h-4 w-4 mr-1' />
                                Like
                              </Button>
                              <Button
                                variant='outline'
                                size='sm'
                                className='border-gray-300 hover:border-green-600 hover:text-green-600'
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
                ))}
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </section>

      {/* CTA Section */}
      <section className='py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-green-50 via-emerald-50 to-teal-50'>
        <div className='max-w-4xl mx-auto text-center'>
          <h2 className='text-3xl sm:text-4xl font-bold text-[#0B1B4D] mb-6'>
            Ready to Join the Conversation?
          </h2>
          <p className='text-lg text-gray-600 mb-10 max-w-2xl mx-auto'>
            Connect with thousands of students, professors, and researchers
            worldwide. Share your knowledge and learn from others.
          </p>
          <div className='flex flex-col sm:flex-row gap-4 justify-center'>
            <Button
              size='lg'
              onClick={() => navigate('/signup')}
              className='bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 text-white px-8 py-4 text-lg font-semibold shadow-xl transition-transform duration-200 hover:scale-105'
            >
              Join the Forum
              <ArrowRight className='ml-2 h-5 w-5' />
            </Button>
            <Button
              size='lg'
              variant='outline'
              className='border-green-600 text-green-600 hover:bg-green-600 hover:text-white px-8 py-4 text-lg font-semibold'
            >
              Explore Groups
            </Button>
          </div>
        </div>
      </section>

      <LandingFooter />
    </div>
  );
};

export default Forum;
