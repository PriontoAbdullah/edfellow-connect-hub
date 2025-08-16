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
  Briefcase,
  Search,
  Filter,
  MapPin,
  DollarSign,
  TrendingUp,
  Users,
  Star,
  Clock,
  Calendar,
  Target,
  Lightbulb,
  BookOpen,
  Video,
  FileText,
  ExternalLink,
  ArrowRight,
  Building,
  Globe,
  Award,
  Heart,
  MessageSquare,
  Plus,
  ChevronRight,
  BarChart3,
  UserCheck,
  CheckCircle,
  AlertCircle,
  Info,
} from 'lucide-react';

const StudentCareerExploration = () => {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');

  const categories = [
    { id: 'all', name: 'All Careers', count: 156 },
    { id: 'tech', name: 'Technology', count: 45 },
    { id: 'business', name: 'Business', count: 32 },
    { id: 'healthcare', name: 'Healthcare', count: 28 },
    { id: 'education', name: 'Education', count: 25 },
    { id: 'engineering', name: 'Engineering', count: 26 },
  ];

  const careerPaths = [
    {
      id: 1,
      title: 'Software Engineer',
      company: 'Google, Microsoft, Amazon',
      salary: '$120,000 - $180,000',
      growth: 'High',
      demand: 'Very High',
      description:
        'Develop software applications and systems using programming languages and frameworks.',
      skills: ['JavaScript', 'Python', 'React', 'Node.js', 'AWS'],
      icon: '💻',
      color: 'bg-blue-100 text-blue-800',
      bgColor: 'bg-blue-50',
    },
    {
      id: 2,
      title: 'Data Scientist',
      company: 'Netflix, Uber, Spotify',
      salary: '$110,000 - $160,000',
      growth: 'Very High',
      demand: 'Very High',
      description:
        'Analyze complex data sets to help organizations make better decisions.',
      skills: ['Python', 'R', 'SQL', 'Machine Learning', 'Statistics'],
      icon: '📊',
      color: 'bg-green-100 text-green-800',
      bgColor: 'bg-green-50',
    },
    {
      id: 3,
      title: 'Product Manager',
      company: 'Apple, Facebook, Airbnb',
      salary: '$100,000 - $150,000',
      growth: 'High',
      demand: 'High',
      description:
        'Lead product development from conception to launch and beyond.',
      skills: [
        'Product Strategy',
        'User Research',
        'Agile',
        'Analytics',
        'Leadership',
      ],
      icon: '🎯',
      color: 'bg-purple-100 text-purple-800',
      bgColor: 'bg-purple-50',
    },
    {
      id: 4,
      title: 'UX Designer',
      company: 'Adobe, Figma, InVision',
      salary: '$80,000 - $130,000',
      growth: 'High',
      demand: 'High',
      description:
        'Design user experiences that are intuitive, accessible, and enjoyable.',
      skills: [
        'Figma',
        'Sketch',
        'User Research',
        'Prototyping',
        'Design Systems',
      ],
      icon: '🎨',
      color: 'bg-pink-100 text-pink-800',
      bgColor: 'bg-pink-50',
    },
    {
      id: 5,
      title: 'DevOps Engineer',
      company: 'Netflix, Spotify, GitHub',
      salary: '$100,000 - $150,000',
      growth: 'Very High',
      demand: 'Very High',
      description: 'Bridge the gap between development and operations teams.',
      skills: ['Docker', 'Kubernetes', 'AWS', 'CI/CD', 'Linux'],
      icon: '⚙️',
      color: 'bg-orange-100 text-orange-800',
      bgColor: 'bg-orange-50',
    },
    {
      id: 6,
      title: 'Cybersecurity Analyst',
      company: 'CrowdStrike, Palo Alto Networks',
      salary: '$90,000 - $140,000',
      growth: 'Very High',
      demand: 'Very High',
      description:
        'Protect organizations from cyber threats and security breaches.',
      skills: [
        'Network Security',
        'Penetration Testing',
        'SIEM',
        'Incident Response',
      ],
      icon: '🔒',
      color: 'bg-red-100 text-red-800',
      bgColor: 'bg-red-50',
    },
  ];

  const careerResources = [
    {
      id: 1,
      title: 'Resume Builder Workshop',
      type: 'Workshop',
      duration: '2 hours',
      instructor: 'Career Services',
      date: 'Dec 20, 2024',
      participants: 45,
      color: 'bg-blue-100 text-blue-800',
    },
    {
      id: 2,
      title: 'Interview Preparation Guide',
      type: 'Resource',
      duration: 'Self-paced',
      instructor: 'Industry Experts',
      date: 'Available Now',
      participants: 120,
      color: 'bg-green-100 text-green-800',
    },
    {
      id: 3,
      title: 'Networking Strategies',
      type: 'Webinar',
      duration: '1 hour',
      instructor: 'LinkedIn Professionals',
      date: 'Dec 25, 2024',
      participants: 78,
      color: 'bg-purple-100 text-purple-800',
    },
  ];

  const filteredCareers = careerPaths.filter((career) => {
    const matchesSearch =
      career.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      career.description.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesSearch;
  });

  const getDemandColor = (demand: string) => {
    switch (demand) {
      case 'Very High':
        return 'text-green-600 bg-green-100';
      case 'High':
        return 'text-blue-600 bg-blue-100';
      case 'Medium':
        return 'text-yellow-600 bg-yellow-100';
      case 'Low':
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
                  placeholder='Search career paths...'
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

        {/* Career Paths */}
        <div className='space-y-4'>
          {filteredCareers.map((career) => (
            <Card
              key={career.id}
              className='bg-white border border-gray-200 shadow-sm hover:shadow-md transition-shadow'
            >
              <CardContent className='p-6'>
                <div className='flex items-start gap-4'>
                  <div className={`p-3 rounded-lg ${career.bgColor}`}>
                    <span className='text-2xl'>{career.icon}</span>
                  </div>
                  <div className='flex-1'>
                    <div className='flex items-start justify-between mb-3'>
                      <div>
                        <h3 className='text-lg font-semibold text-gray-900 mb-1'>
                          {career.title}
                        </h3>
                        <p className='text-sm text-gray-600 mb-2'>
                          {career.company}
                        </p>
                        <p className='text-sm text-gray-700 leading-relaxed'>
                          {career.description}
                        </p>
                      </div>
                      <Button
                        variant='ghost'
                        size='sm'
                        className='text-gray-500'
                      >
                        <Heart className='h-4 w-4' />
                      </Button>
                    </div>

                    <div className='grid grid-cols-1 md:grid-cols-3 gap-4 mb-4'>
                      <div className='flex items-center gap-2'>
                        <DollarSign className='h-4 w-4 text-green-600' />
                        <span className='text-sm font-medium'>
                          {career.salary}
                        </span>
                      </div>
                      <div className='flex items-center gap-2'>
                        <TrendingUp className='h-4 w-4 text-blue-600' />
                        <span className='text-sm font-medium'>
                          Growth: {career.growth}
                        </span>
                      </div>
                      <div className='flex items-center gap-2'>
                        <Badge
                          className={`text-xs ${getDemandColor(career.demand)}`}
                        >
                          {career.demand} Demand
                        </Badge>
                      </div>
                    </div>

                    <div className='mb-4'>
                      <h4 className='text-sm font-medium text-gray-900 mb-2'>
                        Key Skills
                      </h4>
                      <div className='flex flex-wrap gap-2'>
                        {career.skills.map((skill, index) => (
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

                    <div className='flex items-center gap-3'>
                      <Button
                        size='sm'
                        className='bg-blue-600 hover:bg-blue-700'
                      >
                        Learn More
                      </Button>
                      <Button size='sm' variant='outline'>
                        <MessageSquare className='h-4 w-4 mr-2' />
                        Connect
                      </Button>
                      <Button size='sm' variant='outline'>
                        <ExternalLink className='h-4 w-4 mr-2' />
                        Apply
                      </Button>
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
        {/* Career Assessment */}
        <Card className='bg-white border border-gray-200 shadow-sm'>
          <CardHeader className='pb-3'>
            <CardTitle className='text-lg font-semibold text-gray-900'>
              Career Assessment
            </CardTitle>
          </CardHeader>
          <CardContent className='space-y-3'>
            <div className='space-y-3'>
              <div className='flex items-center justify-between'>
                <span className='text-sm text-gray-600'>
                  Assessment Progress
                </span>
                <span className='text-sm font-medium'>75%</span>
              </div>
              <Progress value={75} className='h-2' />
            </div>
            <Button
              variant='outline'
              className='w-full border-blue-200 text-blue-600 hover:bg-blue-50'
            >
              <Target className='h-4 w-4 mr-2' />
              Complete Assessment
            </Button>
          </CardContent>
        </Card>

        {/* Career Resources */}
        <Card className='bg-white border border-gray-200 shadow-sm'>
          <CardHeader className='pb-3'>
            <CardTitle className='text-lg font-semibold text-gray-900'>
              Career Resources
            </CardTitle>
          </CardHeader>
          <CardContent className='space-y-3'>
            {careerResources.map((resource) => (
              <div
                key={resource.id}
                className='border border-gray-200 rounded-lg p-3 hover:bg-gray-50'
              >
                <div className='flex items-center justify-between mb-2'>
                  <h4 className='font-semibold text-sm text-gray-900'>
                    {resource.title}
                  </h4>
                  <Badge className={`text-xs ${resource.color}`}>
                    {resource.type}
                  </Badge>
                </div>
                <div className='flex items-center gap-4 text-xs text-gray-600 mb-3'>
                  <span className='flex items-center gap-1'>
                    <Clock className='h-3 w-3' />
                    {resource.duration}
                  </span>
                  <span className='flex items-center gap-1'>
                    <Users className='h-3 w-3' />
                    {resource.participants}
                  </span>
                </div>
                <div className='flex items-center justify-between'>
                  <span className='text-xs text-gray-500'>{resource.date}</span>
                  <Button size='sm' variant='outline' className='text-xs'>
                    Join
                  </Button>
                </div>
              </div>
            ))}
            <Button
              variant='ghost'
              className='w-full text-blue-600 hover:text-blue-700 text-sm'
            >
              View all resources →
            </Button>
          </CardContent>
        </Card>

        {/* Career Stats */}
        <Card className='bg-white border border-gray-200 shadow-sm'>
          <CardHeader className='pb-3'>
            <CardTitle className='text-lg font-semibold text-gray-900'>
              Your Career Stats
            </CardTitle>
          </CardHeader>
          <CardContent className='space-y-3'>
            <div className='grid grid-cols-2 gap-3'>
              <div className='text-center p-3 bg-blue-50 rounded-lg'>
                <div className='text-lg font-bold text-blue-600'>12</div>
                <div className='text-xs text-gray-600'>Applications</div>
              </div>
              <div className='text-center p-3 bg-green-50 rounded-lg'>
                <div className='text-lg font-bold text-green-600'>5</div>
                <div className='text-xs text-gray-600'>Interviews</div>
              </div>
            </div>
            <div className='space-y-2'>
              <div className='flex items-center justify-between text-sm'>
                <span className='text-gray-600'>Profile Views</span>
                <span className='font-medium'>156</span>
              </div>
              <div className='flex items-center justify-between text-sm'>
                <span className='text-gray-600'>Connections</span>
                <span className='font-medium'>89</span>
              </div>
              <div className='flex items-center justify-between text-sm'>
                <span className='text-gray-600'>Skills Endorsed</span>
                <span className='font-medium'>23</span>
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
              <FileText className='h-4 w-4 mr-3' />
              Update Resume
            </Button>
            <Button
              variant='ghost'
              className='w-full justify-start text-gray-600 hover:text-gray-900 hover:bg-gray-50'
            >
              <Video className='h-4 w-4 mr-3' />
              Practice Interviews
            </Button>
            <Button
              variant='ghost'
              className='w-full justify-start text-gray-600 hover:text-gray-900 hover:bg-gray-50'
            >
              <Users className='h-4 w-4 mr-3' />
              Network Events
            </Button>
            <Button
              variant='ghost'
              className='w-full justify-start text-gray-600 hover:text-gray-900 hover:bg-gray-50'
            >
              <BarChart3 className='h-4 w-4 mr-3' />
              Career Analytics
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default StudentCareerExploration;
