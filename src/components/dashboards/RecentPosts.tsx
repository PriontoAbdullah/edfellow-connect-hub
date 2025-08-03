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
} from 'lucide-react';

interface Post {
  id: string;
  title: string;
  description: string;
  author: {
    name: string;
    role: string;
    institution: string;
    avatar: string;
  };
  category: 'opportunity' | 'scholarship' | 'notice';
  type: string;
  location?: string;
  deadline?: string;
  amount?: string;
  requirements?: string[];
  tags: string[];
  likes: number;
  comments: number;
  shares: number;
  isHighlighted?: boolean;
  isLiked?: boolean;
  isSaved?: boolean;
  createdAt: string;
}

const RecentPosts = () => {
  const [activeTab, setActiveTab] = useState('all');
  const [posts, setPosts] = useState<Post[]>([
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
      createdAt: '2 hours ago',
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
      createdAt: '4 hours ago',
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
    },
  ]);

  const handleLike = (postId: string) => {
    setPosts((prev) =>
      prev.map((post) =>
        post.id === postId
          ? {
              ...post,
              likes: post.isLiked ? post.likes - 1 : post.likes + 1,
              isLiked: !post.isLiked,
            }
          : post
      )
    );
  };

  const handleSave = (postId: string) => {
    setPosts((prev) =>
      prev.map((post) =>
        post.id === postId ? { ...post, isSaved: !post.isSaved } : post
      )
    );
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

  const filteredPosts = posts.filter((post) => {
    if (activeTab === 'all') return true;
    return post.category === activeTab;
  });

  const highlightedPosts = filteredPosts.filter((post) => post.isHighlighted);
  const regularPosts = filteredPosts.filter((post) => !post.isHighlighted);

  return (
    <div className='p-6 space-y-6'>
      {/* Header */}
      <div className='flex items-center justify-between'>
        <div>
          <h1 className='text-3xl font-bold text-gray-900'>Recent Posts</h1>
          <p className='text-gray-600 mt-2'>
            Discover opportunities, scholarships, and announcements from the
            academic community
          </p>
        </div>
        <div className='flex items-center gap-3'>
          <Button variant='outline' size='sm'>
            <Filter className='h-4 w-4 mr-2' />
            Filter
          </Button>
          <Button variant='outline' size='sm'>
            <Search className='h-4 w-4 mr-2' />
            Search
          </Button>
          <Button className='bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700'>
            <Plus className='h-4 w-4 mr-2' />
            Create Post
          </Button>
        </div>
      </div>

      {/* Tabs */}
      <Tabs value={activeTab} onValueChange={setActiveTab} className='w-full'>
        <TabsList className='grid w-full grid-cols-4'>
          <TabsTrigger value='all'>All Posts</TabsTrigger>
          <TabsTrigger value='opportunity'>Opportunities</TabsTrigger>
          <TabsTrigger value='scholarship'>Scholarships</TabsTrigger>
          <TabsTrigger value='notice'>Notices</TabsTrigger>
        </TabsList>

        <TabsContent value={activeTab} className='space-y-6 mt-6'>
          {/* Highlighted Posts */}
          {highlightedPosts.length > 0 && (
            <div className='space-y-4'>
              <div className='flex items-center gap-2'>
                <TrendingUp className='h-5 w-5 text-yellow-600' />
                <h3 className='text-lg font-semibold text-gray-900'>
                  Highlighted Posts
                </h3>
                <Badge className='bg-gradient-to-r from-yellow-400 to-orange-500 text-white border-0'>
                  Promoted
                </Badge>
              </div>
              <div className='grid gap-4'>
                {highlightedPosts.map((post) => (
                  <Card
                    key={post.id}
                    className='border-2 border-yellow-200 bg-gradient-to-r from-yellow-50 to-orange-50 shadow-lg'
                  >
                    <CardHeader className='pb-3'>
                      <div className='flex items-start justify-between'>
                        <div className='flex items-center gap-3'>
                          <img
                            src={post.author.avatar}
                            alt={post.author.name}
                            className='w-10 h-10 rounded-full'
                          />
                          <div>
                            <div className='flex items-center gap-2'>
                              <span className='font-semibold text-gray-900'>
                                {post.author.name}
                              </span>
                              {getAuthorIcon(post.author.role)}
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
                        <p className='text-gray-600 mb-3'>{post.description}</p>
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
                      </div>

                      <div className='flex items-center justify-between pt-3 border-t border-gray-200'>
                        <div className='flex items-center gap-4'>
                          <button
                            onClick={() => handleLike(post.id)}
                            className={`flex items-center gap-1 text-sm transition-colors ${
                              post.isLiked
                                ? 'text-red-500'
                                : 'text-gray-500 hover:text-red-500'
                            }`}
                          >
                            <Heart
                              className={`h-4 w-4 ${
                                post.isLiked ? 'fill-current' : ''
                              }`}
                            />
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
                            className={`p-2 rounded-full transition-colors ${
                              post.isSaved
                                ? 'text-blue-500 bg-blue-50'
                                : 'text-gray-400 hover:text-blue-500 hover:bg-blue-50'
                            }`}
                          >
                            <Bookmark
                              className={`h-4 w-4 ${
                                post.isSaved ? 'fill-current' : ''
                              }`}
                            />
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
              <div className='flex items-center gap-2'>
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
                  className='hover:shadow-md transition-shadow'
                >
                  <CardHeader className='pb-3'>
                    <div className='flex items-start justify-between'>
                      <div className='flex items-center gap-3'>
                        <img
                          src={post.author.avatar}
                          alt={post.author.name}
                          className='w-10 h-10 rounded-full'
                        />
                        <div>
                          <div className='flex items-center gap-2'>
                            <span className='font-semibold text-gray-900'>
                              {post.author.name}
                            </span>
                            {getAuthorIcon(post.author.role)}
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
                      <p className='text-gray-600 mb-3'>{post.description}</p>
                    </div>

                    <div className='flex flex-wrap gap-2'>
                      {post.tags.map((tag) => (
                        <Badge key={tag} variant='outline' className='text-xs'>
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
                    </div>

                    <div className='flex items-center justify-between pt-3 border-t border-gray-200'>
                      <div className='flex items-center gap-4'>
                        <button
                          onClick={() => handleLike(post.id)}
                          className={`flex items-center gap-1 text-sm transition-colors ${
                            post.isLiked
                              ? 'text-red-500'
                              : 'text-gray-500 hover:text-red-500'
                          }`}
                        >
                          <Heart
                            className={`h-4 w-4 ${
                              post.isLiked ? 'fill-current' : ''
                            }`}
                          />
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
                          className={`p-2 rounded-full transition-colors ${
                            post.isSaved
                              ? 'text-blue-500 bg-blue-50'
                              : 'text-gray-400 hover:text-blue-500 hover:bg-blue-50'
                          }`}
                        >
                          <Bookmark
                            className={`h-4 w-4 ${
                              post.isSaved ? 'fill-current' : ''
                            }`}
                          />
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
  );
};

export default RecentPosts;
