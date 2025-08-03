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
      gradient: 'from-blue-500 to-indigo-600',
    },
    {
      icon: Users,
      number: '50,000+',
      label: 'Active Readers',
      description: 'Global community',
      gradient: 'from-green-500 to-emerald-600',
    },
    {
      icon: MessageSquare,
      number: '25,000+',
      label: 'Comments',
      description: 'Engaging discussions',
      gradient: 'from-purple-500 to-pink-600',
    },
    {
      icon: Globe,
      number: '80+',
      label: 'Countries',
      description: 'Global reach',
      gradient: 'from-orange-500 to-red-600',
    },
  ];

  const categories = [
    {
      name: 'Opportunities',
      icon: Briefcase,
      count: 234,
      color: 'blue',
      gradient: 'from-blue-500 to-indigo-600',
    },
    {
      name: 'Scholarships',
      icon: Award,
      count: 189,
      color: 'green',
      gradient: 'from-green-500 to-emerald-600',
    },
    {
      name: 'Notices',
      icon: Megaphone,
      count: 156,
      color: 'orange',
      gradient: 'from-orange-500 to-amber-600',
    },
    {
      name: 'Research',
      icon: Microscope,
      count: 123,
      color: 'purple',
      gradient: 'from-purple-500 to-pink-600',
    },
    {
      name: 'Events',
      icon: Calendar,
      count: 98,
      color: 'pink',
      gradient: 'from-pink-500 to-rose-600',
    },
    {
      name: 'General',
      icon: MessageSquare,
      count: 67,
      color: 'gray',
      gradient: 'from-gray-500 to-slate-600',
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
    <div className='min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100'>
      <GlobalNavbar />

      {/* Hero Section */}
      <section className='relative py-28 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-purple-50 via-indigo-50 to-blue-50 overflow-hidden'>
        {/* Background decorative elements */}
        <div className='absolute inset-0 bg-gradient-to-br from-indigo-50/50 via-purple-50/30 to-pink-50/50' />
        <div className='absolute top-0 left-0 w-72 h-72 bg-gradient-to-br from-indigo-400/20 to-purple-400/20 rounded-full blur-3xl' />
        <div className='absolute bottom-0 right-0 w-96 h-96 bg-gradient-to-br from-blue-400/20 to-cyan-400/20 rounded-full blur-3xl' />

        <div className='max-w-6xl mx-auto text-center relative z-10'>
          <Badge className='bg-white/90 backdrop-blur-sm text-purple-600 border-purple-200 mb-8 px-6 py-3 text-base font-semibold shadow-lg'>
            <Sparkles className='h-4 w-4 mr-2' />
            Latest Updates
          </Badge>
          <h1 className='text-5xl sm:text-6xl font-extrabold text-[#0B1B4D] mb-8 leading-tight'>
            Recent{' '}
            <span className='bg-gradient-to-r from-purple-600 to-indigo-600 bg-clip-text text-transparent'>
              Academic Posts
            </span>
          </h1>
          <p className='text-xl text-gray-600 mb-10 max-w-3xl mx-auto leading-relaxed'>
            Stay updated with the latest opportunities, scholarships,
            announcements, and academic discussions from the global community.
          </p>
          <div className='flex flex-col sm:flex-row gap-4 justify-center'>
            <Button
              size='lg'
              onClick={() => navigate('/signup')}
              className='bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 text-white px-8 py-4 text-lg font-semibold shadow-xl transition-transform duration-200 hover:scale-105'
            >
              Join the Community
              <ArrowRight className='ml-2 h-5 w-5' />
            </Button>
            <Button
              size='lg'
              variant='outline'
              className='border-purple-600 text-purple-600 hover:bg-purple-600 hover:text-white px-8 py-4 text-lg font-semibold'
            >
              Create Post
            </Button>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className='py-16 px-4 sm:px-6 lg:px-8 bg-white'>
        <div className='max-w-6xl mx-auto'>
          <div className='grid md:grid-cols-4 gap-8'>
            {postStats.map((stat) => {
              const IconComponent = stat.icon;
              return (
                <div key={stat.label} className='text-center group'>
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
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Categories Section */}
      <section className='py-16 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-gray-50 to-blue-50'>
        <div className='max-w-6xl mx-auto'>
          <div className='text-center mb-12'>
            <h2 className='text-3xl font-bold text-[#0B1B4D] mb-6'>
              Explore by Category
            </h2>
            <p className='text-lg text-gray-600 max-w-2xl mx-auto'>
              Find posts in your area of interest
            </p>
          </div>

          <div className='grid md:grid-cols-3 lg:grid-cols-6 gap-6'>
            {categories.map((category) => {
              const IconComponent = category.icon;
              return (
                <Card
                  key={category.name}
                  className='border-0 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 bg-white cursor-pointer group'
                >
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
              );
            })}
          </div>
        </div>
      </section>

      {/* Posts Section */}
      <section className='py-16 px-4 sm:px-6 lg:px-8 bg-white'>
        <div className='max-w-6xl mx-auto'>
          <div className='flex items-center justify-between mb-12'>
            <div>
              <h2 className='text-3xl font-bold text-[#0B1B4D] mb-4'>
                Recent Posts
              </h2>
              <p className='text-lg text-gray-600'>
                Stay updated with the latest academic opportunities and
                discussions
              </p>
            </div>
            <div className='flex items-center gap-3'>
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
                className='bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700'
              >
                <Plus className='h-4 w-4 mr-2' />
                Create Post
              </Button>
            </div>
          </div>

          <Tabs
            value={activeTab}
            onValueChange={setActiveTab}
            className='w-full'
          >
            <TabsList className='grid w-full grid-cols-4 bg-gray-100 p-1 rounded-lg'>
              <TabsTrigger
                value='all'
                className='data-[state=active]:bg-white data-[state=active]:shadow-sm'
              >
                All Posts
              </TabsTrigger>
              <TabsTrigger
                value='opportunity'
                className='data-[state=active]:bg-white data-[state=active]:shadow-sm'
              >
                Opportunities
              </TabsTrigger>
              <TabsTrigger
                value='scholarship'
                className='data-[state=active]:bg-white data-[state=active]:shadow-sm'
              >
                Scholarships
              </TabsTrigger>
              <TabsTrigger
                value='notice'
                className='data-[state=active]:bg-white data-[state=active]:shadow-sm'
              >
                Notices
              </TabsTrigger>
            </TabsList>

            <TabsContent value={activeTab} className='space-y-6 mt-6'>
              {/* Highlighted Posts - Notification Queue */}
              {highlightedPosts.length > 0 && (
                <div className='space-y-4'>
                  <div className='flex items-center gap-3 p-4 bg-gradient-to-r from-yellow-50 to-orange-50 rounded-xl border border-yellow-200'>
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
                  </div>
                  <div className='grid gap-4'>
                    {highlightedPosts.map((post) => (
                      <Card
                        key={post.id}
                        className='border-2 border-yellow-200 bg-gradient-to-r from-yellow-50 to-orange-50 shadow-lg hover:shadow-xl transition-all duration-300'
                      >
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
                                className='p-2 rounded-full transition-colors text-gray-400 hover:text-purple-500 hover:bg-purple-50'
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
                    ))}
                  </div>
                </div>
              )}

              {/* Regular Posts */}
              <div className='space-y-4'>
                {highlightedPosts.length > 0 && (
                  <div className='flex items-center gap-2 mb-4'>
                    <Clock className='h-5 w-5 text-gray-600' />
                    <h3 className='text-lg font-semibold text-gray-900'>
                      Recent Posts
                    </h3>
                  </div>
                )}
                <div className='grid gap-4'>
                  {regularPosts.map((post) => (
                    <Card
                      key={post.id}
                      className='hover:shadow-md transition-all duration-300 hover:scale-[1.02] bg-white border border-gray-100'
                    >
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
                            <Badge className={getCategoryColor(post.category)}>
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
                              className='p-2 rounded-full transition-colors text-gray-400 hover:text-purple-500 hover:bg-purple-50'
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
                  ))}
                </div>
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </section>

      {/* CTA Section */}
      <section className='py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-purple-50 via-indigo-50 to-blue-50'>
        <div className='max-w-4xl mx-auto text-center'>
          <h2 className='text-3xl sm:text-4xl font-bold text-[#0B1B4D] mb-6'>
            Stay Updated with Latest Posts
          </h2>
          <p className='text-lg text-gray-600 mb-10 max-w-2xl mx-auto'>
            Join thousands of students and professionals who stay informed about
            the latest academic opportunities and discussions.
          </p>
          <div className='flex flex-col sm:flex-row gap-4 justify-center'>
            <Button
              size='lg'
              onClick={() => navigate('/signup')}
              className='bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 text-white px-8 py-4 text-lg font-semibold shadow-xl transition-transform duration-200 hover:scale-105'
            >
              Join the Community
              <ArrowRight className='ml-2 h-5 w-5' />
            </Button>
            <Button
              size='lg'
              variant='outline'
              className='border-purple-600 text-purple-600 hover:bg-purple-600 hover:text-white px-8 py-4 text-lg font-semibold'
            >
              Create Post
            </Button>
          </div>
        </div>
      </section>

      <LandingFooter />
    </div>
  );
};

export default RecentPosts;
