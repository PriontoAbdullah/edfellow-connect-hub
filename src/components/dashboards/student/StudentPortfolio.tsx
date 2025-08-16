import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Input } from '@/components/ui/input';
import { Progress } from '@/components/ui/progress';
import {
  FileText,
  Search,
  Filter,
  Plus,
  Edit,
  Eye,
  Download,
  Share2,
  MoreHorizontal,
  Star,
  Clock,
  Calendar,
  Target,
  ExternalLink,
  ArrowRight,
  Building,
  Globe,
  Users,
  ChevronRight,
  BarChart3,
  CheckCircle,
  AlertCircle,
  Info,
  BookOpen,
  Lightbulb,
  TrendingUp,
  Bookmark,
  Heart,
  MessageSquare,
  Mail,
  Image,
  Video,
  Code,
  Palette,
  Camera,
  Music,
  Layers,
  Settings,
  Trash2,
  Copy,
  Link,
  Lock,
  Unlock,
  Zap,
  Award,
  Briefcase,
  GraduationCap,
  Smartphone,
  Grid3X3,
  FolderOpen,
  Upload,
} from 'lucide-react';

const StudentPortfolio = () => {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');

  const categories = [
    { id: 'all', name: 'All Projects', count: 24, icon: Grid3X3 },
    { id: 'web', name: 'Web Development', count: 8, icon: Code },
    { id: 'mobile', name: 'Mobile Apps', count: 5, icon: Smartphone },
    { id: 'design', name: 'UI/UX Design', count: 6, icon: Palette },
    { id: 'research', name: 'Research', count: 3, icon: BookOpen },
    { id: 'other', name: 'Other', count: 2, icon: FolderOpen },
  ];

  const projects = [
    {
      id: 1,
      title: 'E-Learning Platform',
      category: 'web',
      description:
        'A comprehensive e-learning platform built with React, Node.js, and MongoDB. Features include user authentication, course management, and real-time progress tracking.',
      technologies: ['React', 'Node.js', 'MongoDB', 'Express', 'Socket.io'],
      image:
        'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=400&h=300&fit=crop',
      views: 156,
      likes: 23,
      comments: 8,
      status: 'published',
      date: 'Dec 10, 2024',
      color: 'bg-blue-100 text-blue-800',
      bgColor: 'bg-blue-50',
      isFeatured: true,
      liveUrl: 'https://example.com',
      githubUrl: 'https://github.com/example',
    },
    {
      id: 2,
      title: 'AI-Powered Chatbot',
      category: 'web',
      description:
        'Intelligent chatbot using natural language processing and machine learning. Integrated with multiple APIs for enhanced functionality.',
      technologies: [
        'Python',
        'TensorFlow',
        'Flask',
        'OpenAI API',
        'PostgreSQL',
      ],
      image:
        'https://images.unsplash.com/photo-1677442136019-21780ecad995?w=400&h=300&fit=crop',
      views: 89,
      likes: 15,
      comments: 4,
      status: 'published',
      date: 'Dec 5, 2024',
      color: 'bg-green-100 text-green-800',
      bgColor: 'bg-green-50',
      isFeatured: false,
      liveUrl: 'https://example.com',
      githubUrl: 'https://github.com/example',
    },
    {
      id: 3,
      title: 'Mobile Fitness App',
      category: 'mobile',
      description:
        'Cross-platform fitness tracking app with workout plans, progress monitoring, and social features.',
      technologies: ['React Native', 'Firebase', 'Redux', 'Expo', 'Node.js'],
      image:
        'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=400&h=300&fit=crop',
      views: 234,
      likes: 45,
      comments: 12,
      status: 'published',
      date: 'Nov 28, 2024',
      color: 'bg-purple-100 text-purple-800',
      bgColor: 'bg-purple-50',
      isFeatured: true,
      liveUrl: 'https://example.com',
      githubUrl: 'https://github.com/example',
    },
    {
      id: 4,
      title: 'E-commerce Website Redesign',
      category: 'design',
      description:
        'Complete redesign of an e-commerce website focusing on user experience and conversion optimization.',
      technologies: ['Figma', 'Adobe XD', 'Sketch', 'InVision', 'Principle'],
      image:
        'https://images.unsplash.com/photo-1558655146-d09347e92766?w=400&h=300&fit=crop',
      views: 67,
      likes: 12,
      comments: 3,
      status: 'draft',
      date: 'Dec 12, 2024',
      color: 'bg-pink-100 text-pink-800',
      bgColor: 'bg-pink-50',
      isFeatured: false,
      liveUrl: 'https://example.com',
      githubUrl: 'https://github.com/example',
    },
    {
      id: 5,
      title: 'Machine Learning Research Paper',
      category: 'research',
      description:
        'Research on improving neural network efficiency using novel optimization techniques.',
      technologies: ['Python', 'TensorFlow', 'PyTorch', 'Jupyter', 'LaTeX'],
      image:
        'https://images.unsplash.com/photo-1555949963-ff9fe0c870eb?w=400&h=300&fit=crop',
      views: 45,
      likes: 8,
      comments: 2,
      status: 'published',
      date: 'Nov 15, 2024',
      color: 'bg-orange-100 text-orange-800',
      bgColor: 'bg-orange-50',
      isFeatured: false,
      liveUrl: 'https://example.com',
      githubUrl: 'https://github.com/example',
    },
    {
      id: 6,
      title: 'Blockchain Voting System',
      category: 'web',
      description:
        'Decentralized voting system using blockchain technology for secure and transparent elections.',
      technologies: ['Solidity', 'Web3.js', 'React', 'Ethereum', 'IPFS'],
      image:
        'https://images.unsplash.com/photo-1639762681485-074b7f938ba0?w=400&h=300&fit=crop',
      views: 123,
      likes: 28,
      comments: 7,
      status: 'published',
      date: 'Nov 20, 2024',
      color: 'bg-yellow-100 text-yellow-800',
      bgColor: 'bg-yellow-50',
      isFeatured: false,
      liveUrl: 'https://example.com',
      githubUrl: 'https://github.com/example',
    },
  ];

  const portfolioStats = {
    totalViews: 1234,
    totalLikes: 156,
    totalComments: 45,
    projectsPublished: 18,
    projectsDraft: 6,
    completionRate: 85,
  };

  const templates = [
    {
      id: 1,
      name: 'Developer Portfolio',
      category: 'web',
      description: 'Clean and professional template for developers',
      preview:
        'https://images.unsplash.com/photo-1461749280684-dccba630e2f6?w=200&h=150&fit=crop',
      downloads: 234,
      rating: 4.8,
      color: 'bg-blue-100 text-blue-800',
    },
    {
      id: 2,
      name: 'Designer Portfolio',
      category: 'design',
      description: 'Creative template showcasing design work',
      preview:
        'https://images.unsplash.com/photo-1561070791-2526d30994b5?w=200&h=150&fit=crop',
      downloads: 189,
      rating: 4.6,
      color: 'bg-pink-100 text-pink-800',
    },
    {
      id: 3,
      name: 'Researcher Portfolio',
      category: 'research',
      description: 'Academic-focused template for researchers',
      preview:
        'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&h=150&fit=crop',
      downloads: 156,
      rating: 4.7,
      color: 'bg-green-100 text-green-800',
    },
  ];

  const filteredProjects = projects.filter((project) => {
    const matchesSearch =
      project.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      project.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      project.technologies.some((tech) =>
        tech.toLowerCase().includes(searchQuery.toLowerCase())
      );
    return matchesSearch;
  });

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'published':
        return 'text-green-600 bg-green-100';
      case 'draft':
        return 'text-yellow-600 bg-yellow-100';
      case 'archived':
        return 'text-gray-600 bg-gray-100';
      default:
        return 'text-gray-600 bg-gray-100';
    }
  };

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case 'web':
        return <Code className='h-4 w-4' />;
      case 'mobile':
        return <Smartphone className='h-4 w-4' />;
      case 'design':
        return <Palette className='h-4 w-4' />;
      case 'research':
        return <BookOpen className='h-4 w-4' />;
      default:
        return <FileText className='h-4 w-4' />;
    }
  };

  return (
    <div className='space-y-6'>
      {/* Header Section */}
      <div className='flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4'>
        <div>
          <h1 className='text-2xl font-bold text-gray-900'>My Portfolio</h1>
          <p className='text-gray-600 mt-1'>
            Showcase your projects and achievements to the world
          </p>
        </div>
        <div className='flex items-center gap-3'>
          <Button variant='outline' size='sm'>
            <Eye className='h-4 w-4 mr-2' />
            Preview Portfolio
          </Button>
          <Button size='sm' className='bg-blue-600 hover:bg-blue-700'>
            <Plus className='h-4 w-4 mr-2' />
            Add New Project
          </Button>
        </div>
      </div>

      {/* Search and Filter Section */}
      <Card className='bg-white border border-gray-200 shadow-sm'>
        <CardContent className='p-6'>
          <div className='flex flex-col lg:flex-row gap-4'>
            <div className='flex-1 relative'>
              <Search className='absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4' />
              <Input
                placeholder='Search projects by title, description, or technologies...'
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className='pl-10'
              />
            </div>
            <div className='flex items-center gap-3'>
              <div className='flex items-center border border-gray-200 rounded-lg'>
                <Button
                  variant={viewMode === 'grid' ? 'default' : 'ghost'}
                  size='sm'
                  onClick={() => setViewMode('grid')}
                  className='rounded-r-none'
                >
                  <Grid3X3 className='h-4 w-4' />
                </Button>
                <Button
                  variant={viewMode === 'list' ? 'default' : 'ghost'}
                  size='sm'
                  onClick={() => setViewMode('list')}
                  className='rounded-l-none'
                >
                  <FileText className='h-4 w-4' />
                </Button>
              </div>
              <Button variant='outline' size='sm'>
                <Filter className='h-4 w-4 mr-2' />
                Filter
              </Button>
              <Button variant='outline' size='sm'>
                <Settings className='h-4 w-4 mr-2' />
                Settings
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Categories */}
      <Card className='bg-white border border-gray-200 shadow-sm'>
        <CardContent className='p-6'>
          <div className='flex flex-wrap gap-3'>
            {categories.map((category) => {
              const CategoryIcon = category.icon;
              return (
                <Button
                  key={category.id}
                  variant={
                    selectedCategory === category.id ? 'default' : 'outline'
                  }
                  size='sm'
                  onClick={() => setSelectedCategory(category.id)}
                  className='flex items-center gap-2'
                >
                  <CategoryIcon className='h-4 w-4' />
                  {category.name}
                  <Badge variant='secondary' className='ml-1'>
                    {category.count}
                  </Badge>
                </Button>
              );
            })}
          </div>
        </CardContent>
      </Card>

      {/* Featured Projects */}
      {filteredProjects.filter((project) => project.isFeatured).length > 0 && (
        <div>
          <div className='flex items-center gap-2 mb-4'>
            <Star className='h-5 w-5 text-yellow-500' />
            <h2 className='text-xl font-semibold text-gray-900'>
              Featured Projects
            </h2>
          </div>
          <div className='space-y-4'>
            {filteredProjects
              .filter((project) => project.isFeatured)
              .map((project) => (
                <Card
                  key={project.id}
                  className='bg-white border-2 border-yellow-200 shadow-sm hover:shadow-md transition-shadow'
                >
                  <CardContent className='p-6'>
                    <div className='flex flex-col lg:flex-row gap-6'>
                      <div className='lg:w-80 h-48 bg-gray-100 rounded-lg overflow-hidden flex-shrink-0'>
                        <img
                          src={project.image}
                          alt={project.title}
                          className='w-full h-full object-cover'
                        />
                      </div>
                      <div className='flex-1'>
                        <div className='flex items-start justify-between mb-4'>
                          <div className='flex-1'>
                            <div className='flex items-center gap-3 mb-2'>
                              <h3 className='text-xl font-semibold text-gray-900'>
                                {project.title}
                              </h3>
                              <Badge className={`text-xs ${project.color}`}>
                                {project.category.charAt(0).toUpperCase() +
                                  project.category.slice(1)}
                              </Badge>
                              {project.isFeatured && (
                                <Star className='h-4 w-4 text-yellow-500' />
                              )}
                            </div>
                            <p className='text-gray-700 leading-relaxed mb-4'>
                              {project.description}
                            </p>
                            <div className='flex flex-wrap gap-2 mb-4'>
                              {project.technologies.map((tech, index) => (
                                <Badge
                                  key={index}
                                  variant='outline'
                                  className='text-xs'
                                >
                                  {tech}
                                </Badge>
                              ))}
                            </div>
                          </div>
                          <div className='flex items-center gap-2'>
                            <Badge
                              className={`text-xs ${getStatusColor(
                                project.status
                              )}`}
                            >
                              {project.status}
                            </Badge>
                            <Button
                              variant='ghost'
                              size='sm'
                              className='text-gray-500'
                            >
                              <MoreHorizontal className='h-4 w-4' />
                            </Button>
                          </div>
                        </div>

                        <div className='flex items-center justify-between'>
                          <div className='flex items-center gap-6 text-sm text-gray-600 mb-3'>
                            <span className='flex items-center gap-1'>
                              <Eye className='h-4 w-4' />
                              {project.views} views
                            </span>
                            <span className='flex items-center gap-1'>
                              <Heart className='h-4 w-4' />
                              {project.likes} likes
                            </span>
                            <span className='flex items-center gap-1'>
                              <MessageSquare className='h-4 w-4' />
                              {project.comments} comments
                            </span>
                            <span className='text-gray-500'>
                              {project.date}
                            </span>
                          </div>
                        </div>
                        <div className='flex items-center gap-3'>
                          <Button size='sm' variant='outline'>
                            <Edit className='h-4 w-4 mr-2' />
                            Edit
                          </Button>
                          <Button size='sm' variant='outline'>
                            <Eye className='h-4 w-4 mr-2' />
                            View
                          </Button>
                          <Button
                            size='sm'
                            className='bg-blue-600 hover:bg-blue-700'
                          >
                            <Share2 className='h-4 w-4 mr-2' />
                            Share
                          </Button>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
          </div>
        </div>
      )}

      {/* All Projects */}
      <div>
        <div className='flex items-center justify-between mb-4'>
          <h2 className='text-xl font-semibold text-gray-900'>
            All Projects ({filteredProjects.length})
          </h2>
          <div className='flex items-center gap-2 text-sm text-gray-600'>
            <span>Sort by:</span>
            <Button variant='ghost' size='sm' className='text-blue-600'>
              Recent
            </Button>
            <Button variant='ghost' size='sm'>
              Popular
            </Button>
            <Button variant='ghost' size='sm'>
              Name
            </Button>
          </div>
        </div>

        {viewMode === 'grid' ? (
          <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6'>
            {filteredProjects.map((project) => (
              <Card
                key={project.id}
                className='bg-white border border-gray-200 shadow-sm hover:shadow-md transition-shadow group'
              >
                <div className='relative'>
                  <div className='w-full h-48 bg-gray-100 rounded-t-lg overflow-hidden'>
                    <img
                      src={project.image}
                      alt={project.title}
                      className='w-full h-full object-cover group-hover:scale-105 transition-transform duration-200'
                    />
                  </div>
                  <div className='absolute top-3 right-3'>
                    <Badge
                      className={`text-xs ${getStatusColor(project.status)}`}
                    >
                      {project.status}
                    </Badge>
                  </div>
                  {project.isFeatured && (
                    <div className='absolute top-3 left-3'>
                      <Star className='h-4 w-4 text-yellow-500 fill-current' />
                    </div>
                  )}
                </div>
                <CardContent className='p-4'>
                  <div className='flex items-start justify-between mb-3'>
                    <div className='flex-1'>
                      <h3 className='font-semibold text-gray-900 text-sm mb-1 line-clamp-1'>
                        {project.title}
                      </h3>
                      <p className='text-xs text-gray-600 line-clamp-2 mb-3'>
                        {project.description}
                      </p>
                    </div>
                    <Button variant='ghost' size='sm' className='text-gray-500'>
                      <MoreHorizontal className='h-4 w-4' />
                    </Button>
                  </div>

                  <div className='flex flex-wrap gap-1 mb-3'>
                    {project.technologies.slice(0, 3).map((tech, index) => (
                      <Badge key={index} variant='outline' className='text-xs'>
                        {tech}
                      </Badge>
                    ))}
                    {project.technologies.length > 3 && (
                      <Badge variant='outline' className='text-xs'>
                        +{project.technologies.length - 3}
                      </Badge>
                    )}
                  </div>

                  <div className='flex items-center justify-between text-xs text-gray-600 mb-4'>
                    <div className='flex items-center gap-3'>
                      <span className='flex items-center gap-1'>
                        <Eye className='h-3 w-3' />
                        {project.views}
                      </span>
                      <span className='flex items-center gap-1'>
                        <Heart className='h-3 w-3' />
                        {project.likes}
                      </span>
                    </div>
                    <Badge className={`text-xs ${project.color}`}>
                      {project.category}
                    </Badge>
                  </div>

                  <div className='flex items-center gap-2'>
                    <Button
                      size='sm'
                      variant='outline'
                      className='flex-1 text-xs'
                    >
                      <Edit className='h-3 w-3 mr-1' />
                      Edit
                    </Button>
                    <Button
                      size='sm'
                      variant='outline'
                      className='flex-1 text-xs'
                    >
                      <Eye className='h-3 w-3 mr-1' />
                      View
                    </Button>
                    <Button
                      size='sm'
                      className='bg-blue-600 hover:bg-blue-700 text-xs'
                    >
                      <Share2 className='h-3 w-3 mr-1' />
                      Share
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        ) : (
          <div className='space-y-4'>
            {filteredProjects.map((project) => (
              <Card
                key={project.id}
                className='bg-white border border-gray-200 shadow-sm hover:shadow-md transition-shadow'
              >
                <CardContent className='p-6'>
                  <div className='flex items-start gap-4'>
                    <div className='w-24 h-24 bg-gray-100 rounded-lg overflow-hidden flex-shrink-0'>
                      <img
                        src={project.image}
                        alt={project.title}
                        className='w-full h-full object-cover'
                      />
                    </div>
                    <div className='flex-1'>
                      <div className='flex items-start justify-between mb-3'>
                        <div>
                          <div className='flex items-center gap-2 mb-1'>
                            <h3 className='font-semibold text-gray-900'>
                              {project.title}
                            </h3>
                            <Badge className={`text-xs ${project.color}`}>
                              {project.category}
                            </Badge>
                            {project.isFeatured && (
                              <Star className='h-4 w-4 text-yellow-500' />
                            )}
                          </div>
                          <p className='text-sm text-gray-600 line-clamp-2 mb-3'>
                            {project.description}
                          </p>
                          <div className='flex flex-wrap gap-2 mb-3'>
                            {project.technologies
                              .slice(0, 4)
                              .map((tech, index) => (
                                <Badge
                                  key={index}
                                  variant='outline'
                                  className='text-xs'
                                >
                                  {tech}
                                </Badge>
                              ))}
                          </div>
                        </div>
                        <div className='flex items-center gap-2'>
                          <Badge
                            className={`text-xs ${getStatusColor(
                              project.status
                            )}`}
                          >
                            {project.status}
                          </Badge>
                          <Button
                            variant='ghost'
                            size='sm'
                            className='text-gray-500'
                          >
                            <MoreHorizontal className='h-4 w-4' />
                          </Button>
                        </div>
                      </div>

                      <div className='flex items-center justify-between'>
                        <div className='flex items-center gap-4 text-sm text-gray-600 mb-3'>
                          <span className='flex items-center gap-1'>
                            <Eye className='h-4 w-4' />
                            {project.views} views
                          </span>
                          <span className='flex items-center gap-1'>
                            <Heart className='h-4 w-4' />
                            {project.likes} likes
                          </span>
                          <span className='text-gray-500'>{project.date}</span>
                        </div>
                      </div>
                      <div className='flex items-center gap-2'>
                        <Button size='sm' variant='outline'>
                          <Edit className='h-4 w-4 mr-2' />
                          Edit
                        </Button>
                        <Button size='sm' variant='outline'>
                          <Eye className='h-4 w-4 mr-2' />
                          View
                        </Button>
                        <Button
                          size='sm'
                          className='bg-blue-600 hover:bg-blue-700'
                        >
                          <Share2 className='h-4 w-4 mr-2' />
                          Share
                        </Button>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default StudentPortfolio;
