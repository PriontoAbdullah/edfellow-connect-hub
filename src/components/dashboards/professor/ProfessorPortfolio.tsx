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
  UserCheck,
  Presentation,
  Network,
} from 'lucide-react';

const ProfessorPortfolio = () => {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');

  const categories = [
    { id: 'all', name: 'All Publications', count: 18, icon: Grid3X3 },
    { id: 'research', name: 'Research Papers', count: 8, icon: BookOpen },
    {
      id: 'conference',
      name: 'Conference Papers',
      count: 5,
      icon: Presentation,
    },
    { id: 'books', name: 'Books & Chapters', count: 3, icon: FileText },
    { id: 'patents', name: 'Patents', count: 2, icon: Award },
    { id: 'other', name: 'Other', count: 0, icon: FolderOpen },
  ];

  const publications = [
    {
      id: 1,
      title: 'Advanced Machine Learning Algorithms for Healthcare',
      category: 'research',
      description:
        'A comprehensive study on implementing machine learning algorithms in healthcare systems for improved patient outcomes and diagnostic accuracy.',
      authors: ['Dr. Sarah Johnson', 'Dr. Michael Chen', 'Dr. Emily Watson'],
      journal: 'Journal of Medical AI',
      year: 2024,
      citations: 45,
      impactFactor: 8.5,
      status: 'published',
      date: 'Dec 10, 2024',
      color: 'bg-blue-100 text-blue-800',
      bgColor: 'bg-blue-50',
      isFeatured: true,
      doi: '10.1000/example.2024.001',
      pdfUrl: 'https://example.com/paper1.pdf',
      abstract: 'This paper presents novel approaches to...',
      keywords: ['Machine Learning', 'Healthcare', 'AI', 'Diagnostics'],
    },
    {
      id: 2,
      title: 'Neural Network Optimization Techniques',
      category: 'research',
      description:
        'Comparative analysis of various neural network optimization techniques and their applications in deep learning systems.',
      authors: ['Dr. Sarah Johnson', 'Dr. Robert Kim'],
      journal: 'IEEE Transactions on Neural Networks',
      year: 2024,
      citations: 32,
      impactFactor: 9.2,
      status: 'published',
      date: 'Dec 5, 2024',
      color: 'bg-green-100 text-green-800',
      bgColor: 'bg-green-50',
      isFeatured: false,
      doi: '10.1000/example.2024.002',
      pdfUrl: 'https://example.com/paper2.pdf',
      abstract: 'This research explores optimization methods...',
      keywords: ['Neural Networks', 'Optimization', 'Deep Learning'],
    },
    {
      id: 3,
      title: 'AI Ethics in Academic Research',
      category: 'conference',
      description:
        'Presentation on ethical considerations in AI research and development, presented at the International AI Ethics Conference.',
      authors: ['Dr. Sarah Johnson'],
      journal: 'International AI Ethics Conference',
      year: 2024,
      citations: 18,
      impactFactor: 6.8,
      status: 'published',
      date: 'Nov 28, 2024',
      color: 'bg-purple-100 text-purple-800',
      bgColor: 'bg-purple-50',
      isFeatured: true,
      doi: '10.1000/example.2024.003',
      pdfUrl: 'https://example.com/paper3.pdf',
      abstract: 'This presentation addresses ethical concerns...',
      keywords: ['AI Ethics', 'Research Ethics', 'Academic Integrity'],
    },
    {
      id: 4,
      title: 'Computer Science Education in the Digital Age',
      category: 'books',
      description:
        'Comprehensive textbook covering modern approaches to computer science education and curriculum development.',
      authors: ['Dr. Sarah Johnson', 'Dr. Lisa Thompson'],
      journal: 'Academic Press',
      year: 2024,
      citations: 67,
      impactFactor: 7.5,
      status: 'published',
      date: 'Dec 12, 2024',
      color: 'bg-pink-100 text-pink-800',
      bgColor: 'bg-pink-50',
      isFeatured: false,
      doi: '10.1000/example.2024.004',
      pdfUrl: 'https://example.com/book1.pdf',
      abstract: 'This textbook provides comprehensive coverage...',
      keywords: ['Education', 'Computer Science', 'Curriculum'],
    },
    {
      id: 5,
      title: 'Patent: Automated Grading System',
      category: 'patents',
      description:
        'Patent for an automated system that uses AI to grade programming assignments and provide detailed feedback.',
      authors: ['Dr. Sarah Johnson'],
      journal: 'US Patent Office',
      year: 2024,
      citations: 12,
      impactFactor: 5.2,
      status: 'pending',
      date: 'Nov 15, 2024',
      color: 'bg-orange-100 text-orange-800',
      bgColor: 'bg-orange-50',
      isFeatured: false,
      doi: '10.1000/example.2024.005',
      pdfUrl: 'https://example.com/patent1.pdf',
      abstract: 'This patent describes an automated system...',
      keywords: ['Patent', 'Automated Grading', 'AI', 'Education'],
    },
  ];

  const filteredPublications = publications.filter((pub) => {
    const matchesSearch =
      pub.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      pub.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      pub.authors.some((author) =>
        author.toLowerCase().includes(searchQuery.toLowerCase())
      );
    const matchesCategory =
      selectedCategory === 'all' || pub.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'published':
        return 'bg-green-100 text-green-800';
      case 'pending':
        return 'bg-yellow-100 text-yellow-800';
      case 'draft':
        return 'bg-gray-100 text-gray-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case 'research':
        return BookOpen;
      case 'conference':
        return Presentation;
      case 'books':
        return FileText;
      case 'patents':
        return Award;
      default:
        return FolderOpen;
    }
  };

  return (
    <div className='space-y-6'>
      {/* Header */}
      <div className='flex items-center justify-between'>
        <div>
          <h1 className='text-2xl font-bold text-gray-900 flex items-center gap-2'>
            <FolderOpen className='h-6 w-6 text-blue-600' />
            Digital Portfolio Builder
          </h1>
          <p className='text-gray-600'>
            Showcase your research, publications, and academic achievements
          </p>
        </div>
        <div className='flex gap-2'>
          <Button variant='outline' onClick={() => setViewMode('grid')}>
            <Grid3X3 className='h-4 w-4' />
          </Button>
          <Button variant='outline' onClick={() => setViewMode('list')}>
            <FileText className='h-4 w-4' />
          </Button>
          <Button className='bg-blue-600 hover:bg-blue-700'>
            <Plus className='h-4 w-4 mr-2' />
            Add Publication
          </Button>
        </div>
      </div>

      {/* Stats Cards */}
      <div className='grid grid-cols-1 md:grid-cols-4 gap-4'>
        <Card>
          <CardContent className='p-4'>
            <div className='flex items-center justify-between'>
              <div>
                <p className='text-sm text-gray-600'>Total Publications</p>
                <p className='text-2xl font-bold text-gray-900'>18</p>
              </div>
              <FileText className='h-8 w-8 text-blue-600' />
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className='p-4'>
            <div className='flex items-center justify-between'>
              <div>
                <p className='text-sm text-gray-600'>Total Citations</p>
                <p className='text-2xl font-bold text-gray-900'>1,247</p>
              </div>
              <TrendingUp className='h-8 w-8 text-green-600' />
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className='p-4'>
            <div className='flex items-center justify-between'>
              <div>
                <p className='text-sm text-gray-600'>H-Index</p>
                <p className='text-2xl font-bold text-gray-900'>24</p>
              </div>
              <BarChart3 className='h-8 w-8 text-purple-600' />
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className='p-4'>
            <div className='flex items-center justify-between'>
              <div>
                <p className='text-sm text-gray-600'>Portfolio Views</p>
                <p className='text-2xl font-bold text-gray-900'>3,456</p>
              </div>
              <Eye className='h-8 w-8 text-orange-600' />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Search and Filters */}
      <div className='flex flex-col sm:flex-row gap-4'>
        <div className='relative flex-1'>
          <Search className='absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4' />
          <Input
            placeholder='Search publications, authors, or keywords...'
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className='pl-10'
          />
        </div>
        <div className='flex gap-2'>
          {categories.map((category) => {
            const IconComponent = category.icon;
            return (
              <Button
                key={category.id}
                variant={
                  selectedCategory === category.id ? 'default' : 'outline'
                }
                onClick={() => setSelectedCategory(category.id)}
                className='flex items-center gap-2'
              >
                <IconComponent className='h-4 w-4' />
                {category.name}
                <Badge variant='secondary' className='ml-1'>
                  {category.count}
                </Badge>
              </Button>
            );
          })}
        </div>
      </div>

      {/* Publications Grid */}
      <div
        className={`grid gap-6 ${
          viewMode === 'grid' ? 'md:grid-cols-2 lg:grid-cols-3' : 'grid-cols-1'
        }`}
      >
        {filteredPublications.map((pub) => {
          const CategoryIcon = getCategoryIcon(pub.category);
          return (
            <Card key={pub.id} className='hover:shadow-lg transition-shadow'>
              <CardHeader className='pb-3'>
                <div className='flex items-start justify-between'>
                  <div className='flex items-center gap-3'>
                    <Avatar className='h-12 w-12'>
                      <AvatarFallback className='bg-blue-100 text-blue-600'>
                        <CategoryIcon className='h-6 w-6' />
                      </AvatarFallback>
                    </Avatar>
                    <div className='flex-1'>
                      <CardTitle className='text-lg line-clamp-2'>
                        {pub.title}
                      </CardTitle>
                      <CardDescription className='flex items-center gap-2 mt-1'>
                        <CategoryIcon className='h-3 w-3' />
                        {pub.journal} • {pub.year}
                      </CardDescription>
                    </div>
                  </div>
                  <div className='flex items-center gap-1'>
                    <Badge className={getStatusColor(pub.status)}>
                      {pub.status}
                    </Badge>
                    {pub.isFeatured && (
                      <Star className='h-4 w-4 text-yellow-500 fill-current' />
                    )}
                  </div>
                </div>
              </CardHeader>
              <CardContent className='space-y-4'>
                <p className='text-sm text-gray-600 line-clamp-3'>
                  {pub.description}
                </p>

                <div className='flex flex-wrap gap-1'>
                  {pub.keywords.slice(0, 3).map((keyword, index) => (
                    <Badge key={index} variant='outline' className='text-xs'>
                      {keyword}
                    </Badge>
                  ))}
                  {pub.keywords.length > 3 && (
                    <Badge variant='outline' className='text-xs'>
                      +{pub.keywords.length - 3} more
                    </Badge>
                  )}
                </div>

                <div className='flex items-center justify-between text-sm text-gray-500'>
                  <div className='flex items-center gap-4'>
                    <span className='flex items-center gap-1'>
                      <Users className='h-3 w-3' />
                      {pub.authors.length} authors
                    </span>
                    <span className='flex items-center gap-1'>
                      <TrendingUp className='h-3 w-3' />
                      {pub.citations} citations
                    </span>
                  </div>
                  <span className='flex items-center gap-1'>
                    <Calendar className='h-3 w-3' />
                    {pub.date}
                  </span>
                </div>

                <div className='flex gap-2 pt-3 border-t border-gray-200'>
                  <Button variant='outline' size='sm' className='flex-1'>
                    <Eye className='h-4 w-4 mr-2' />
                    View
                  </Button>
                  <Button variant='outline' size='sm'>
                    <Download className='h-4 w-4' />
                  </Button>
                  <Button variant='outline' size='sm'>
                    <Share2 className='h-4 w-4' />
                  </Button>
                  <Button variant='outline' size='sm'>
                    <Edit className='h-4 w-4' />
                  </Button>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {/* Empty State */}
      {filteredPublications.length === 0 && (
        <div className='text-center py-12'>
          <FolderOpen className='h-12 w-12 text-gray-400 mx-auto mb-4' />
          <h3 className='text-lg font-medium text-gray-900 mb-2'>
            {searchQuery ? 'No publications found' : 'No publications yet'}
          </h3>
          <p className='text-gray-600 mb-4'>
            {searchQuery
              ? 'Try adjusting your search terms'
              : 'Start building your academic portfolio by adding your first publication'}
          </p>
          <Button className='bg-blue-600 hover:bg-blue-700'>
            <Plus className='h-4 w-4 mr-2' />
            Add Your First Publication
          </Button>
        </div>
      )}
    </div>
  );
};

export default ProfessorPortfolio;
