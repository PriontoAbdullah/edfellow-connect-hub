import { useState } from 'react';
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
import {
  Globe,
  Search,
  Filter,
  Star,
  MapPin,
  Calendar,
  Users,
  GraduationCap,
  Building,
  BookOpen,
  Award,
  TrendingUp,
  Clock,
  DollarSign,
  ExternalLink,
} from 'lucide-react';

const Explore = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');

  const categories = [
    { id: 'all', name: 'All Programs', icon: Globe },
    { id: 'computer-science', name: 'Computer Science', icon: BookOpen },
    { id: 'engineering', name: 'Engineering', icon: Building },
    { id: 'business', name: 'Business', icon: TrendingUp },
    { id: 'arts', name: 'Arts & Humanities', icon: GraduationCap },
    { id: 'health', name: 'Health Sciences', icon: Award },
  ];

  const programs = [
    {
      id: 1,
      name: 'Master of Computer Science',
      university: 'Stanford University',
      location: 'Stanford, CA, USA',
      duration: '2 years',
      tuition: '$58,000/year',
      startDate: 'Fall 2024',
      category: 'computer-science',
      rating: 4.8,
      reviews: 156,
      students: 1200,
      description:
        'Advanced program in computer science with focus on AI, machine learning, and software engineering.',
      tags: ['AI/ML', 'Software Engineering', 'Research'],
      featured: true,
      deadline: '2024-01-15',
    },
    {
      id: 2,
      name: 'MSc in Data Science',
      university: 'MIT',
      location: 'Cambridge, MA, USA',
      duration: '1.5 years',
      tuition: '$52,000/year',
      startDate: 'Spring 2024',
      category: 'computer-science',
      rating: 4.9,
      reviews: 203,
      students: 800,
      description:
        'Comprehensive data science program covering statistics, machine learning, and big data analytics.',
      tags: ['Data Science', 'Statistics', 'Big Data'],
      featured: true,
      deadline: '2024-02-01',
    },
    {
      id: 3,
      name: 'MBA in Technology Management',
      university: 'Harvard Business School',
      location: 'Boston, MA, USA',
      duration: '2 years',
      tuition: '$73,440/year',
      startDate: 'Fall 2024',
      category: 'business',
      rating: 4.7,
      reviews: 189,
      students: 950,
      description:
        'Business administration with focus on technology leadership and innovation management.',
      tags: ['Technology Management', 'Leadership', 'Innovation'],
      featured: false,
      deadline: '2024-01-10',
    },
    {
      id: 4,
      name: 'Master of Engineering',
      university: 'UC Berkeley',
      location: 'Berkeley, CA, USA',
      duration: '1 year',
      tuition: '$45,000/year',
      startDate: 'Fall 2024',
      category: 'engineering',
      rating: 4.6,
      reviews: 134,
      students: 650,
      description:
        'Professional engineering degree with specialization in various engineering disciplines.',
      tags: ['Engineering', 'Professional', 'Technical'],
      featured: false,
      deadline: '2024-01-20',
    },
    {
      id: 5,
      name: 'MSc in Artificial Intelligence',
      university: 'Carnegie Mellon University',
      location: 'Pittsburgh, PA, USA',
      duration: '2 years',
      tuition: '$48,000/year',
      startDate: 'Fall 2024',
      category: 'computer-science',
      rating: 4.9,
      reviews: 178,
      students: 450,
      description:
        'Specialized program in artificial intelligence, robotics, and cognitive systems.',
      tags: ['AI', 'Robotics', 'Cognitive Systems'],
      featured: true,
      deadline: '2024-01-05',
    },
    {
      id: 6,
      name: 'Master of Public Health',
      university: 'Johns Hopkins University',
      location: 'Baltimore, MD, USA',
      duration: '2 years',
      tuition: '$55,000/year',
      startDate: 'Fall 2024',
      category: 'health',
      rating: 4.5,
      reviews: 98,
      students: 320,
      description:
        'Public health program focusing on epidemiology, biostatistics, and health policy.',
      tags: ['Public Health', 'Epidemiology', 'Health Policy'],
      featured: false,
      deadline: '2024-02-15',
    },
  ];

  const filteredPrograms = programs.filter((program) => {
    const matchesSearch =
      program.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      program.university.toLowerCase().includes(searchTerm.toLowerCase()) ||
      program.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory =
      selectedCategory === 'all' || program.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const getCategoryIcon = (categoryId: string) => {
    const category = categories.find((cat) => cat.id === categoryId);
    return category ? category.icon : Globe;
  };

  const formatDeadline = (deadline: string) => {
    const date = new Date(deadline);
    const now = new Date();
    const diffTime = date.getTime() - now.getTime();
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

    if (diffDays < 0) return 'Deadline passed';
    if (diffDays === 0) return 'Today';
    if (diffDays === 1) return 'Tomorrow';
    if (diffDays < 7) return `${diffDays} days left`;
    return date.toLocaleDateString();
  };

  return (
    <div className='p-4 sm:p-6 space-y-4 sm:space-y-6'>
      <div className='flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4'>
        <div>
          <h1 className='text-xl sm:text-2xl font-bold text-gray-900 flex items-center gap-2'>
            <Globe className='h-5 w-5 sm:h-6 sm:w-6 text-blue-600' />
            Explore Programs
          </h1>
          <p className='text-sm sm:text-base text-gray-600'>
            Discover academic programs and opportunities worldwide
          </p>
        </div>
      </div>

      {/* Search and Filters */}
      <div className='space-y-3 sm:space-y-4'>
        <div className='relative max-w-md'>
          <Search className='absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4' />
          <Input
            placeholder='Search programs, universities...'
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className='pl-10 text-sm sm:text-base'
          />
        </div>

        <div className='flex flex-wrap gap-2'>
          {categories.map((category) => {
            const Icon = category.icon;
            return (
              <Button
                key={category.id}
                variant={
                  selectedCategory === category.id ? 'default' : 'outline'
                }
                size='sm'
                onClick={() => setSelectedCategory(category.id)}
                className='flex items-center gap-1 sm:gap-2 text-xs sm:text-sm'
              >
                <Icon className='h-3 w-3 sm:h-4 sm:w-4' />
                <span className='hidden sm:inline'>{category.name}</span>
                <span className='sm:hidden'>{category.name.split(' ')[0]}</span>
              </Button>
            );
          })}
        </div>
      </div>

      {/* Programs Grid */}
      <div className='grid gap-4 sm:gap-6 grid-cols-1 md:grid-cols-2 lg:grid-cols-3'>
        {filteredPrograms.map((program) => {
          const CategoryIcon = getCategoryIcon(program.category);
          return (
            <Card
              key={program.id}
              className={`hover:shadow-lg transition-shadow ${
                program.featured ? 'ring-2 ring-blue-200' : ''
              }`}
            >
              <CardHeader className='pb-3 sm:pb-4'>
                <div className='flex items-start justify-between'>
                  <div className='flex-1'>
                    <div className='flex items-center gap-1 sm:gap-2 mb-2'>
                      {program.featured && (
                        <Badge className='bg-blue-600 text-white text-xs'>
                          <Star className='h-2 w-2 sm:h-3 sm:w-3 mr-1' />
                          Featured
                        </Badge>
                      )}
                      <Badge variant='outline' className='text-xs'>
                        <CategoryIcon className='h-2 w-2 sm:h-3 sm:w-3 mr-1' />
                        <span className='hidden sm:inline'>
                          {
                            categories.find(
                              (cat) => cat.id === program.category
                            )?.name
                          }
                        </span>
                        <span className='sm:hidden'>
                          {
                            categories
                              .find((cat) => cat.id === program.category)
                              ?.name.split(' ')[0]
                          }
                        </span>
                      </Badge>
                    </div>
                    <CardTitle className='text-base sm:text-lg line-clamp-2'>
                      {program.name}
                    </CardTitle>
                    <CardDescription className='flex items-center gap-1 mt-1 text-xs sm:text-sm'>
                      <Building className='h-2 w-2 sm:h-3 sm:w-3' />
                      {program.university}
                    </CardDescription>
                  </div>
                </div>
              </CardHeader>
              <CardContent className='space-y-3 sm:space-y-4'>
                <p className='text-xs sm:text-sm text-gray-600 line-clamp-3'>
                  {program.description}
                </p>

                <div className='flex flex-wrap gap-1'>
                  {program.tags.map((tag, index) => (
                    <Badge key={index} variant='secondary' className='text-xs'>
                      {tag}
                    </Badge>
                  ))}
                </div>

                <div className='grid grid-cols-2 gap-2 sm:gap-3 text-xs sm:text-sm'>
                  <div className='flex items-center gap-1 text-gray-600'>
                    <MapPin className='h-2 w-2 sm:h-3 sm:w-3' />
                    <span className='truncate'>{program.location}</span>
                  </div>
                  <div className='flex items-center gap-1 text-gray-600'>
                    <Clock className='h-2 w-2 sm:h-3 sm:w-3' />
                    <span>{program.duration}</span>
                  </div>
                  <div className='flex items-center gap-1 text-gray-600'>
                    <Calendar className='h-2 w-2 sm:h-3 sm:w-3' />
                    <span>{program.startDate}</span>
                  </div>
                  <div className='flex items-center gap-1 text-gray-600'>
                    <DollarSign className='h-2 w-2 sm:h-3 sm:w-3' />
                    <span>{program.tuition}</span>
                  </div>
                </div>

                <div className='flex items-center justify-between text-xs sm:text-sm'>
                  <div className='flex items-center gap-1'>
                    <Star className='h-2 w-2 sm:h-3 sm:w-3 text-yellow-500 fill-current' />
                    <span className='font-medium'>{program.rating}</span>
                    <span className='text-gray-500'>({program.reviews})</span>
                  </div>
                  <div className='flex items-center gap-1 text-gray-500'>
                    <Users className='h-2 w-2 sm:h-3 sm:w-3' />
                    <span>{program.students}</span>
                  </div>
                </div>

                <div className='space-y-2'>
                  <div className='flex items-center justify-between text-xs'>
                    <span className='text-gray-500'>Application Deadline:</span>
                    <span
                      className={`font-medium ${
                        formatDeadline(program.deadline).includes('days left')
                          ? 'text-red-600'
                          : 'text-gray-900'
                      }`}
                    >
                      {formatDeadline(program.deadline)}
                    </span>
                  </div>
                  <div className='flex gap-2'>
                    <Button
                      size='sm'
                      className='flex-1 bg-blue-600 hover:bg-blue-700 text-xs sm:text-sm'
                    >
                      <ExternalLink className='h-3 w-3 sm:h-4 sm:w-4 mr-1 sm:mr-2' />
                      Apply Now
                    </Button>
                    <Button
                      variant='outline'
                      size='sm'
                      className='text-xs sm:text-sm'
                    >
                      Save
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {/* Empty State */}
      {filteredPrograms.length === 0 && (
        <div className='text-center py-8 sm:py-12'>
          <Globe className='h-8 w-8 sm:h-12 sm:w-12 text-gray-400 mx-auto mb-3 sm:mb-4' />
          <h3 className='text-base sm:text-lg font-medium text-gray-900 mb-2'>
            {searchTerm ? 'No programs found' : 'No programs available'}
          </h3>
          <p className='text-sm sm:text-base text-gray-600 mb-4'>
            {searchTerm
              ? 'Try adjusting your search terms or filters'
              : 'Check back later for new program listings'}
          </p>
          {searchTerm && (
            <Button onClick={() => setSearchTerm('')} className='text-sm'>
              Clear Search
            </Button>
          )}
        </div>
      )}
    </div>
  );
};

export default Explore;
