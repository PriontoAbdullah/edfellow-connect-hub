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
  Heart,
  Search,
  Filter,
  MapPin,
  Star,
  Clock,
  Calendar,
  Target,
  MessageSquare,
  Video,
  Phone,
  Mail,
  ExternalLink,
  ArrowRight,
  Building,
  Globe,
  Award,
  Users,
  Plus,
  ChevronRight,
  BarChart3,
  UserCheck,
  CheckCircle,
  AlertCircle,
  Info,
  BookOpen,
  Lightbulb,
  TrendingUp,
  Bookmark,
  Share2,
  MoreHorizontal,
} from 'lucide-react';

const StudentMentorship = () => {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');

  const categories = [
    { id: 'all', name: 'All Mentors', count: 89 },
    { id: 'tech', name: 'Technology', count: 32 },
    { id: 'business', name: 'Business', count: 18 },
    { id: 'academic', name: 'Academic', count: 25 },
    { id: 'career', name: 'Career', count: 14 },
  ];

  const mentors = [
    {
      id: 1,
      name: 'Dr. Sarah Johnson',
      title: 'Senior Software Engineer',
      company: 'Google',
      avatar: '/api/placeholder/40/40',
      rating: 4.9,
      reviews: 127,
      hourlyRate: 150,
      expertise: ['Machine Learning', 'Python', 'Data Science'],
      availability: 'Available',
      experience: '8 years',
      location: 'San Francisco, CA',
      bio: 'Passionate about helping students break into tech. Specialized in ML and data science.',
      color: 'bg-blue-100 text-blue-800',
      bgColor: 'bg-blue-50',
      isVerified: true,
    },
    {
      id: 2,
      name: 'Michael Chen',
      title: 'Product Manager',
      company: 'Microsoft',
      avatar: '/api/placeholder/40/40',
      rating: 4.8,
      reviews: 89,
      hourlyRate: 120,
      expertise: ['Product Strategy', 'User Research', 'Agile'],
      availability: 'Available',
      experience: '6 years',
      location: 'Seattle, WA',
      bio: 'Experienced PM helping students understand product development and career growth.',
      color: 'bg-green-100 text-green-800',
      bgColor: 'bg-green-50',
      isVerified: true,
    },
    {
      id: 3,
      name: 'Dr. Emily Rodriguez',
      title: 'Associate Professor',
      company: 'Stanford University',
      avatar: '/api/placeholder/40/40',
      rating: 4.7,
      reviews: 156,
      hourlyRate: 100,
      expertise: ['Computer Science', 'Research', 'Academic Writing'],
      availability: 'Limited',
      experience: '12 years',
      location: 'Stanford, CA',
      bio: 'Academic mentor helping students with research, publications, and academic career paths.',
      color: 'bg-purple-100 text-purple-800',
      bgColor: 'bg-purple-50',
      isVerified: true,
    },
    {
      id: 4,
      name: 'Alex Thompson',
      title: 'UX Design Lead',
      company: 'Adobe',
      avatar: '/api/placeholder/40/40',
      rating: 4.6,
      reviews: 73,
      hourlyRate: 110,
      expertise: ['UX Design', 'Figma', 'User Research'],
      availability: 'Available',
      experience: '5 years',
      location: 'San Jose, CA',
      bio: 'Design mentor helping students build portfolios and understand UX principles.',
      color: 'bg-pink-100 text-pink-800',
      bgColor: 'bg-pink-50',
      isVerified: false,
    },
    {
      id: 5,
      name: 'David Kim',
      title: 'Startup Founder',
      company: 'TechStart Inc.',
      avatar: '/api/placeholder/40/40',
      rating: 4.5,
      reviews: 45,
      hourlyRate: 90,
      expertise: ['Entrepreneurship', 'Business Strategy', 'Funding'],
      availability: 'Available',
      experience: '10 years',
      location: 'Austin, TX',
      bio: 'Entrepreneur mentor helping students understand startup ecosystem and business development.',
      color: 'bg-orange-100 text-orange-800',
      bgColor: 'bg-orange-50',
      isVerified: true,
    },
    {
      id: 6,
      name: 'Lisa Wang',
      title: 'Data Scientist',
      company: 'Netflix',
      avatar: '/api/placeholder/40/40',
      rating: 4.4,
      reviews: 67,
      hourlyRate: 130,
      expertise: ['Data Science', 'Python', 'SQL', 'ML'],
      availability: 'Limited',
      experience: '4 years',
      location: 'Los Angeles, CA',
      bio: 'Data science mentor helping students with technical skills and industry insights.',
      color: 'bg-red-100 text-red-800',
      bgColor: 'bg-red-50',
      isVerified: true,
    },
  ];

  const mentorshipPrograms = [
    {
      id: 1,
      title: 'Tech Career Accelerator',
      description: '12-week intensive program for breaking into tech',
      mentors: 8,
      students: 24,
      duration: '12 weeks',
      price: '$1,200',
      startDate: 'Jan 15, 2024',
      color: 'bg-blue-100 text-blue-800',
    },
    {
      id: 2,
      title: 'Research Mentorship Program',
      description: 'Academic research guidance and publication support',
      mentors: 12,
      students: 36,
      duration: '16 weeks',
      price: '$800',
      startDate: 'Feb 1, 2024',
      color: 'bg-green-100 text-green-800',
    },
    {
      id: 3,
      title: 'Startup Founders Circle',
      description: 'Entrepreneurship mentorship for aspiring founders',
      mentors: 6,
      students: 18,
      duration: '8 weeks',
      price: '$1,500',
      startDate: 'Jan 30, 2024',
      color: 'bg-purple-100 text-purple-800',
    },
  ];

  const filteredMentors = mentors.filter((mentor) => {
    const matchesSearch =
      mentor.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      mentor.expertise.some((skill) =>
        skill.toLowerCase().includes(searchQuery.toLowerCase())
      );
    return matchesSearch;
  });

  const getAvailabilityColor = (availability: string) => {
    switch (availability) {
      case 'Available':
        return 'text-green-600 bg-green-100';
      case 'Limited':
        return 'text-yellow-600 bg-yellow-100';
      case 'Unavailable':
        return 'text-red-600 bg-red-100';
      default:
        return 'text-gray-600 bg-gray-100';
    }
  };

  return (
    <div className='grid grid-cols-1 lg:grid-cols-12 gap-6'>
      {/* Main Content Area */}
      <div className='lg:col-span-8 space-y-4'>
        {/* Search and Filter */}
        <Card className='bg-white border border-gray-200 shadow-sm'>
          <CardContent className='p-4'>
            <div className='flex flex-col md:flex-row gap-4'>
              <div className='flex-1 relative'>
                <Search className='absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4' />
                <Input
                  placeholder='Search mentors by name or expertise...'
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className='pl-10'
                />
              </div>
              <div className='flex gap-2'>
                <Button variant='outline' size='sm'>
                  <Filter className='h-4 w-4 mr-2' />
                  Filter
                </Button>
                <Button variant='outline' size='sm'>
                  <MapPin className='h-4 w-4 mr-2' />
                  Location
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Categories */}
        <Card className='bg-white border border-gray-200 shadow-sm'>
          <CardContent className='p-4'>
            <div className='flex flex-wrap gap-2'>
              {categories.map((category) => (
                <Button
                  key={category.id}
                  variant={
                    selectedCategory === category.id ? 'default' : 'outline'
                  }
                  size='sm'
                  onClick={() => setSelectedCategory(category.id)}
                  className='text-xs'
                >
                  {category.name}
                  <Badge variant='secondary' className='ml-2 text-xs'>
                    {category.count}
                  </Badge>
                </Button>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Mentors List */}
        <div className='space-y-4'>
          {filteredMentors.map((mentor) => (
            <Card
              key={mentor.id}
              className='bg-white border border-gray-200 shadow-sm hover:shadow-md transition-shadow'
            >
              <CardContent className='p-6'>
                <div className='flex items-start gap-4'>
                  <Avatar className='h-16 w-16'>
                    <AvatarImage src={mentor.avatar} alt={mentor.name} />
                    <AvatarFallback className='bg-gray-100 text-gray-600 text-lg'>
                      {mentor.name
                        .split(' ')
                        .map((n) => n[0])
                        .join('')}
                    </AvatarFallback>
                  </Avatar>
                  <div className='flex-1'>
                    <div className='flex items-start justify-between mb-3'>
                      <div>
                        <div className='flex items-center gap-2 mb-1'>
                          <h3 className='text-lg font-semibold text-gray-900'>
                            {mentor.name}
                          </h3>
                          {mentor.isVerified && (
                            <CheckCircle className='h-4 w-4 text-blue-600' />
                          )}
                        </div>
                        <p className='text-sm text-gray-600 mb-1'>
                          {mentor.title} at {mentor.company}
                        </p>
                        <div className='flex items-center gap-4 text-sm text-gray-600'>
                          <span className='flex items-center gap-1'>
                            <Star className='h-4 w-4 text-yellow-500' />
                            {mentor.rating} ({mentor.reviews} reviews)
                          </span>
                          <span className='flex items-center gap-1'>
                            <Clock className='h-4 w-4' />
                            {mentor.experience}
                          </span>
                          <span className='flex items-center gap-1'>
                            <MapPin className='h-4 w-4' />
                            {mentor.location}
                          </span>
                        </div>
                      </div>
                      <div className='flex items-center gap-2'>
                        <Badge
                          className={`text-xs ${getAvailabilityColor(
                            mentor.availability
                          )}`}
                        >
                          {mentor.availability}
                        </Badge>
                        <Button
                          variant='ghost'
                          size='sm'
                          className='text-gray-500'
                        >
                          <Heart className='h-4 w-4' />
                        </Button>
                      </div>
                    </div>

                    <p className='text-sm text-gray-700 mb-4 leading-relaxed'>
                      {mentor.bio}
                    </p>

                    <div className='mb-4'>
                      <h4 className='text-sm font-medium text-gray-900 mb-2'>
                        Expertise
                      </h4>
                      <div className='flex flex-wrap gap-2'>
                        {mentor.expertise.map((skill, index) => (
                          <Badge
                            key={index}
                            variant='outline'
                            className='text-xs'
                          >
                            {skill}
                          </Badge>
                        ))}
                      </div>
                    </div>

                    <div className='flex items-center justify-between'>
                      <div className='flex items-center gap-2'>
                        <span className='text-lg font-semibold text-gray-900'>
                          ${mentor.hourlyRate}
                        </span>
                        <span className='text-sm text-gray-600'>/hour</span>
                      </div>
                      <div className='flex items-center gap-3'>
                        <Button size='sm' variant='outline'>
                          <MessageSquare className='h-4 w-4 mr-2' />
                          Message
                        </Button>
                        <Button
                          size='sm'
                          className='bg-blue-600 hover:bg-blue-700'
                        >
                          <Calendar className='h-4 w-4 mr-2' />
                          Book Session
                        </Button>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      {/* Right Sidebar */}
      <div className='lg:col-span-4 space-y-4'>
        {/* Mentorship Programs */}
        <Card className='bg-white border border-gray-200 shadow-sm'>
          <CardHeader className='pb-3'>
            <CardTitle className='text-lg font-semibold text-gray-900'>
              Mentorship Programs
            </CardTitle>
          </CardHeader>
          <CardContent className='space-y-3'>
            {mentorshipPrograms.map((program) => (
              <div
                key={program.id}
                className='border border-gray-200 rounded-lg p-3 hover:bg-gray-50'
              >
                <div className='flex items-center justify-between mb-2'>
                  <h4 className='font-semibold text-sm text-gray-900'>
                    {program.title}
                  </h4>
                  <Badge className={`text-xs ${program.color}`}>
                    {program.price}
                  </Badge>
                </div>
                <p className='text-xs text-gray-600 mb-3'>
                  {program.description}
                </p>
                <div className='flex items-center justify-between text-xs text-gray-600 mb-3'>
                  <span>{program.mentors} mentors</span>
                  <span>{program.students} students</span>
                  <span>{program.duration}</span>
                </div>
                <div className='flex items-center justify-between'>
                  <span className='text-xs text-gray-500'>
                    Starts: {program.startDate}
                  </span>
                  <Button size='sm' variant='outline' className='text-xs'>
                    Learn More
                  </Button>
                </div>
              </div>
            ))}
            <Button
              variant='ghost'
              className='w-full text-blue-600 hover:text-blue-700 text-sm'
            >
              View all programs →
            </Button>
          </CardContent>
        </Card>

        {/* Your Mentorship Stats */}
        <Card className='bg-white border border-gray-200 shadow-sm'>
          <CardHeader className='pb-3'>
            <CardTitle className='text-lg font-semibold text-gray-900'>
              Your Mentorship Stats
            </CardTitle>
          </CardHeader>
          <CardContent className='space-y-3'>
            <div className='grid grid-cols-2 gap-3'>
              <div className='text-center p-3 bg-blue-50 rounded-lg'>
                <div className='text-lg font-bold text-blue-600'>3</div>
                <div className='text-xs text-gray-600'>Active Mentors</div>
              </div>
              <div className='text-center p-3 bg-green-50 rounded-lg'>
                <div className='text-lg font-bold text-green-600'>12</div>
                <div className='text-xs text-gray-600'>Sessions</div>
              </div>
            </div>
            <div className='space-y-2'>
              <div className='flex items-center justify-between text-sm'>
                <span className='text-gray-600'>Hours Completed</span>
                <span className='font-medium'>24</span>
              </div>
              <div className='flex items-center justify-between text-sm'>
                <span className='text-gray-600'>Goals Achieved</span>
                <span className='font-medium'>8/12</span>
              </div>
              <div className='flex items-center justify-between text-sm'>
                <span className='text-gray-600'>Next Session</span>
                <span className='font-medium'>Dec 18</span>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Upcoming Sessions */}
        <Card className='bg-white border border-gray-200 shadow-sm'>
          <CardHeader className='pb-3'>
            <CardTitle className='text-lg font-semibold text-gray-900'>
              Upcoming Sessions
            </CardTitle>
          </CardHeader>
          <CardContent className='space-y-3'>
            <div className='border border-gray-200 rounded-lg p-3'>
              <div className='flex items-center gap-3 mb-2'>
                <Avatar className='h-8 w-8'>
                  <AvatarImage
                    src='/api/placeholder/32/32'
                    alt='Dr. Sarah Johnson'
                  />
                  <AvatarFallback className='bg-gray-100 text-gray-600 text-xs'>
                    SJ
                  </AvatarFallback>
                </Avatar>
                <div>
                  <h4 className='font-semibold text-sm text-gray-900'>
                    Dr. Sarah Johnson
                  </h4>
                  <p className='text-xs text-gray-600'>
                    Machine Learning Basics
                  </p>
                </div>
              </div>
              <div className='flex items-center justify-between text-xs text-gray-600'>
                <span>Dec 18, 2024 • 2:00 PM</span>
                <Badge className='text-xs bg-green-100 text-green-800'>
                  Confirmed
                </Badge>
              </div>
            </div>
            <div className='border border-gray-200 rounded-lg p-3'>
              <div className='flex items-center gap-3 mb-2'>
                <Avatar className='h-8 w-8'>
                  <AvatarImage
                    src='/api/placeholder/32/32'
                    alt='Michael Chen'
                  />
                  <AvatarFallback className='bg-gray-100 text-gray-600 text-xs'>
                    MC
                  </AvatarFallback>
                </Avatar>
                <div>
                  <h4 className='font-semibold text-sm text-gray-900'>
                    Michael Chen
                  </h4>
                  <p className='text-xs text-gray-600'>
                    Product Strategy Review
                  </p>
                </div>
              </div>
              <div className='flex items-center justify-between text-xs text-gray-600'>
                <span>Dec 20, 2024 • 10:00 AM</span>
                <Badge className='text-xs bg-yellow-100 text-yellow-800'>
                  Pending
                </Badge>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Quick Actions */}
        <Card className='bg-white border border-gray-200 shadow-sm'>
          <CardHeader className='pb-3'>
            <CardTitle className='text-lg font-semibold text-gray-900'>
              Quick Actions
            </CardTitle>
          </CardHeader>
          <CardContent className='space-y-2'>
            <Button
              variant='ghost'
              className='w-full justify-start text-gray-600 hover:text-gray-900 hover:bg-gray-50'
            >
              <Plus className='h-4 w-4 mr-3' />
              Find New Mentor
            </Button>
            <Button
              variant='ghost'
              className='w-full justify-start text-gray-600 hover:text-gray-900 hover:bg-gray-50'
            >
              <Video className='h-4 w-4 mr-3' />
              Schedule Session
            </Button>
            <Button
              variant='ghost'
              className='w-full justify-start text-gray-600 hover:text-gray-900 hover:bg-gray-50'
            >
              <MessageSquare className='h-4 w-4 mr-3' />
              Messages
            </Button>
            <Button
              variant='ghost'
              className='w-full justify-start text-gray-600 hover:text-gray-900 hover:bg-gray-50'
            >
              <BarChart3 className='h-4 w-4 mr-3' />
              Progress Report
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default StudentMentorship;
