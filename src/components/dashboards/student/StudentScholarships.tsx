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
  Award,
  Search,
  Filter,
  MapPin,
  DollarSign,
  Clock,
  Calendar,
  Target,
  ExternalLink,
  ArrowRight,
  Building,
  Globe,
  Users,
  Plus,
  ChevronRight,
  BarChart3,
  CheckCircle,
  AlertCircle,
  Info,
  BookOpen,
  Lightbulb,
  TrendingUp,
  Bookmark,
  Share2,
  MoreHorizontal,
  Star,
  GraduationCap,
  Briefcase,
  FileText,
  Eye,
  Heart,
  MessageSquare,
  Mail,
} from 'lucide-react';

const StudentScholarships = () => {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');

  const categories = [
    { id: 'all', name: 'All Opportunities', count: 234 },
    { id: 'scholarships', name: 'Scholarships', count: 156 },
    { id: 'internships', name: 'Internships', count: 78 },
    { id: 'fellowships', name: 'Fellowships', count: 45 },
    { id: 'grants', name: 'Grants', count: 32 },
  ];

  const opportunities = [
    {
      id: 1,
      title: 'Gates Cambridge Scholarship',
      type: 'scholarship',
      organization: 'Gates Foundation',
      amount: '$50,000',
      duration: 'Full Program',
      deadline: 'Dec 15, 2024',
      location: 'Cambridge, UK',
      description:
        'Full funding for graduate study at Cambridge University. Covers tuition, living expenses, and travel.',
      requirements: [
        '3.8+ GPA',
        'Research Proposal',
        'Letters of Recommendation',
      ],
      eligibility: 'Graduate Students',
      applications: 1200,
      color: 'bg-blue-100 text-blue-800',
      bgColor: 'bg-blue-50',
      isFeatured: true,
      logo: '/api/placeholder/40/40',
    },
    {
      id: 2,
      title: 'Google Summer Internship',
      type: 'internship',
      organization: 'Google',
      amount: '$8,000/month',
      duration: '12 weeks',
      deadline: 'Jan 31, 2024',
      location: 'Mountain View, CA',
      description:
        'Software engineering internship with mentorship, competitive salary, and potential for full-time offers.',
      requirements: [
        'Computer Science Major',
        'Strong Programming Skills',
        'Portfolio',
      ],
      eligibility: 'Undergraduate Students',
      applications: 2500,
      color: 'bg-green-100 text-green-800',
      bgColor: 'bg-green-50',
      isFeatured: true,
      logo: '/api/placeholder/40/40',
    },
    {
      id: 3,
      title: 'Fulbright Research Grant',
      type: 'fellowship',
      organization: 'US Department of State',
      amount: '$25,000',
      duration: '9 months',
      deadline: 'Feb 28, 2024',
      location: 'Various Countries',
      description:
        'Research grant for US citizens to conduct research abroad. Includes travel and living expenses.',
      requirements: ['US Citizen', 'Research Proposal', 'Language Proficiency'],
      eligibility: 'Graduate Students',
      applications: 800,
      color: 'bg-purple-100 text-purple-800',
      bgColor: 'bg-purple-50',
      isFeatured: false,
      logo: '/api/placeholder/40/40',
    },
    {
      id: 4,
      title: 'Microsoft Research Internship',
      type: 'internship',
      organization: 'Microsoft',
      amount: '$7,500/month',
      duration: '12 weeks',
      deadline: 'Jan 15, 2024',
      location: 'Redmond, WA',
      description:
        'Research internship focusing on AI, machine learning, and computer science innovations.',
      requirements: [
        'Research Experience',
        'Publications',
        'Strong Academic Record',
      ],
      eligibility: 'Graduate Students',
      applications: 1800,
      color: 'bg-orange-100 text-orange-800',
      bgColor: 'bg-orange-50',
      isFeatured: false,
      logo: '/api/placeholder/40/40',
    },
    {
      id: 5,
      title: 'Rhodes Scholarship',
      type: 'scholarship',
      organization: 'Rhodes Trust',
      amount: '$70,000',
      duration: '2-3 years',
      deadline: 'Oct 15, 2024',
      location: 'Oxford, UK',
      description:
        'Prestigious scholarship for exceptional students to study at Oxford University.',
      requirements: ['Academic Excellence', 'Leadership', 'Service Record'],
      eligibility: 'Undergraduate Seniors',
      applications: 500,
      color: 'bg-yellow-100 text-yellow-800',
      bgColor: 'bg-yellow-50',
      isFeatured: true,
      logo: '/api/placeholder/40/40',
    },
    {
      id: 6,
      title: 'NSF Graduate Research Fellowship',
      type: 'fellowship',
      organization: 'National Science Foundation',
      amount: '$34,000/year',
      duration: '3 years',
      deadline: 'Mar 15, 2024',
      location: 'United States',
      description:
        'Fellowship for graduate students in STEM fields. Includes stipend and tuition support.',
      requirements: ['STEM Major', 'Research Experience', 'Strong GPA'],
      eligibility: 'Graduate Students',
      applications: 1200,
      color: 'bg-red-100 text-red-800',
      bgColor: 'bg-red-50',
      isFeatured: false,
      logo: '/api/placeholder/40/40',
    },
  ];

  const myApplications = [
    {
      id: 1,
      title: 'Gates Cambridge Scholarship',
      status: 'Submitted',
      submittedDate: 'Dec 10, 2024',
      deadline: 'Dec 15, 2024',
      color: 'bg-blue-100 text-blue-800',
    },
    {
      id: 2,
      title: 'Google Summer Internship',
      status: 'Under Review',
      submittedDate: 'Dec 5, 2024',
      deadline: 'Jan 31, 2024',
      color: 'bg-yellow-100 text-yellow-800',
    },
    {
      id: 3,
      title: 'Microsoft Research Internship',
      status: 'Interview Scheduled',
      submittedDate: 'Dec 1, 2024',
      deadline: 'Jan 15, 2024',
      color: 'bg-green-100 text-green-800',
    },
  ];

  const filteredOpportunities = opportunities.filter((opportunity) => {
    const matchesSearch =
      opportunity.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      opportunity.description
        .toLowerCase()
        .includes(searchQuery.toLowerCase()) ||
      opportunity.organization
        .toLowerCase()
        .includes(searchQuery.toLowerCase());
    return matchesSearch;
  });

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Submitted':
        return 'text-blue-600 bg-blue-100';
      case 'Under Review':
        return 'text-yellow-600 bg-yellow-100';
      case 'Interview Scheduled':
        return 'text-green-600 bg-green-100';
      case 'Accepted':
        return 'text-green-600 bg-green-100';
      case 'Rejected':
        return 'text-red-600 bg-red-100';
      default:
        return 'text-gray-600 bg-gray-100';
    }
  };

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'scholarship':
        return <Award className='h-4 w-4' />;
      case 'internship':
        return <Briefcase className='h-4 w-4' />;
      case 'fellowship':
        return <GraduationCap className='h-4 w-4' />;
      case 'grant':
        return <DollarSign className='h-4 w-4' />;
      default:
        return <Award className='h-4 w-4' />;
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
                  placeholder='Search scholarships, internships, or organizations...'
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

        {/* Featured Opportunities */}
        {filteredOpportunities.filter((opp) => opp.isFeatured).length > 0 && (
          <div>
            <h3 className='text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2'>
              <Star className='h-5 w-5 text-yellow-500' />
              Featured Opportunities
            </h3>
            <div className='space-y-4'>
              {filteredOpportunities
                .filter((opp) => opp.isFeatured)
                .map((opportunity) => (
                  <Card
                    key={opportunity.id}
                    className='bg-white border-2 border-yellow-200 shadow-sm hover:shadow-md transition-shadow'
                  >
                    <CardContent className='p-6'>
                      <div className='flex items-start gap-4'>
                        <Avatar className='h-12 w-12'>
                          <AvatarImage
                            src={opportunity.logo}
                            alt={opportunity.organization}
                          />
                          <AvatarFallback className='bg-gray-100 text-gray-600'>
                            {opportunity.organization
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
                                  {opportunity.title}
                                </h3>
                                <Badge
                                  className={`text-xs ${opportunity.color}`}
                                >
                                  {opportunity.type.charAt(0).toUpperCase() +
                                    opportunity.type.slice(1)}
                                </Badge>
                                {opportunity.isFeatured && (
                                  <Star className='h-4 w-4 text-yellow-500' />
                                )}
                              </div>
                              <p className='text-sm text-gray-600 mb-2'>
                                {opportunity.organization}
                              </p>
                              <p className='text-sm text-gray-700 leading-relaxed'>
                                {opportunity.description}
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

                          <div className='grid grid-cols-1 md:grid-cols-4 gap-4 mb-4'>
                            <div className='flex items-center gap-2'>
                              <DollarSign className='h-4 w-4 text-green-600' />
                              <span className='text-sm font-medium'>
                                {opportunity.amount}
                              </span>
                            </div>
                            <div className='flex items-center gap-2'>
                              <Clock className='h-4 w-4 text-blue-600' />
                              <span className='text-sm font-medium'>
                                {opportunity.duration}
                              </span>
                            </div>
                            <div className='flex items-center gap-2'>
                              <MapPin className='h-4 w-4 text-purple-600' />
                              <span className='text-sm font-medium'>
                                {opportunity.location}
                              </span>
                            </div>
                            <div className='flex items-center gap-2'>
                              <Calendar className='h-4 w-4 text-red-600' />
                              <span className='text-sm font-medium'>
                                Due: {opportunity.deadline}
                              </span>
                            </div>
                          </div>

                          <div className='mb-4'>
                            <h4 className='text-sm font-medium text-gray-900 mb-2'>
                              Requirements
                            </h4>
                            <div className='flex flex-wrap gap-2'>
                              {opportunity.requirements.map((req, index) => (
                                <Badge
                                  key={index}
                                  variant='outline'
                                  className='text-xs'
                                >
                                  {req}
                                </Badge>
                              ))}
                            </div>
                          </div>

                          <div className='flex items-center justify-between'>
                            <div className='flex items-center gap-4 text-sm text-gray-600'>
                              <span>
                                Eligibility: {opportunity.eligibility}
                              </span>
                              <span>
                                {opportunity.applications} applications
                              </span>
                            </div>
                            <div className='flex items-center gap-3'>
                              <Button size='sm' variant='outline'>
                                <Eye className='h-4 w-4 mr-2' />
                                View Details
                              </Button>
                              <Button
                                size='sm'
                                className='bg-blue-600 hover:bg-blue-700'
                              >
                                <ExternalLink className='h-4 w-4 mr-2' />
                                Apply Now
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
        )}

        {/* All Opportunities */}
        <div>
          <h3 className='text-lg font-semibold text-gray-900 mb-4'>
            All Opportunities ({filteredOpportunities.length})
          </h3>
          <div className='space-y-4'>
            {filteredOpportunities.map((opportunity) => (
              <Card
                key={opportunity.id}
                className='bg-white border border-gray-200 shadow-sm hover:shadow-md transition-shadow'
              >
                <CardContent className='p-6'>
                  <div className='flex items-start gap-4'>
                    <Avatar className='h-12 w-12'>
                      <AvatarImage
                        src={opportunity.logo}
                        alt={opportunity.organization}
                      />
                      <AvatarFallback className='bg-gray-100 text-gray-600'>
                        {opportunity.organization
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
                              {opportunity.title}
                            </h3>
                            <Badge className={`text-xs ${opportunity.color}`}>
                              {opportunity.type.charAt(0).toUpperCase() +
                                opportunity.type.slice(1)}
                            </Badge>
                          </div>
                          <p className='text-sm text-gray-600 mb-2'>
                            {opportunity.organization}
                          </p>
                          <p className='text-sm text-gray-700 leading-relaxed'>
                            {opportunity.description}
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

                      <div className='grid grid-cols-1 md:grid-cols-4 gap-4 mb-4'>
                        <div className='flex items-center gap-2'>
                          <DollarSign className='h-4 w-4 text-green-600' />
                          <span className='text-sm font-medium'>
                            {opportunity.amount}
                          </span>
                        </div>
                        <div className='flex items-center gap-2'>
                          <Clock className='h-4 w-4 text-blue-600' />
                          <span className='text-sm font-medium'>
                            {opportunity.duration}
                          </span>
                        </div>
                        <div className='flex items-center gap-2'>
                          <MapPin className='h-4 w-4 text-purple-600' />
                          <span className='text-sm font-medium'>
                            {opportunity.location}
                          </span>
                        </div>
                        <div className='flex items-center gap-2'>
                          <Calendar className='h-4 w-4 text-red-600' />
                          <span className='text-sm font-medium'>
                            Due: {opportunity.deadline}
                          </span>
                        </div>
                      </div>

                      <div className='flex items-center justify-between'>
                        <div className='flex items-center gap-4 text-sm text-gray-600'>
                          <span>Eligibility: {opportunity.eligibility}</span>
                          <span>{opportunity.applications} applications</span>
                        </div>
                        <div className='flex items-center gap-3'>
                          <Button size='sm' variant='outline'>
                            <Eye className='h-4 w-4 mr-2' />
                            View Details
                          </Button>
                          <Button
                            size='sm'
                            className='bg-blue-600 hover:bg-blue-700'
                          >
                            <ExternalLink className='h-4 w-4 mr-2' />
                            Apply Now
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
      </div>

      {/* Right Sidebar */}
      <div className='lg:col-span-4 space-y-4'>
        {/* My Applications */}
        <Card className='bg-white border border-gray-200 shadow-sm'>
          <CardHeader className='pb-3'>
            <CardTitle className='text-lg font-semibold text-gray-900'>
              My Applications
            </CardTitle>
          </CardHeader>
          <CardContent className='space-y-3'>
            {myApplications.map((application) => (
              <div
                key={application.id}
                className='border border-gray-200 rounded-lg p-3 hover:bg-gray-50'
              >
                <div className='flex items-center justify-between mb-2'>
                  <h4 className='font-semibold text-sm text-gray-900'>
                    {application.title}
                  </h4>
                  <Badge
                    className={`text-xs ${getStatusColor(application.status)}`}
                  >
                    {application.status}
                  </Badge>
                </div>
                <div className='flex items-center justify-between text-xs text-gray-600 mb-3'>
                  <span>Submitted: {application.submittedDate}</span>
                  <span>Deadline: {application.deadline}</span>
                </div>
                <div className='flex items-center gap-2'>
                  <Button size='sm' variant='outline' className='text-xs'>
                    View Status
                  </Button>
                  <Button size='sm' variant='outline' className='text-xs'>
                    <MessageSquare className='h-3 w-3 mr-1' />
                    Contact
                  </Button>
                </div>
              </div>
            ))}
            <Button
              variant='ghost'
              className='w-full text-blue-600 hover:text-blue-700 text-sm'
            >
              View all applications →
            </Button>
          </CardContent>
        </Card>

        {/* Application Stats */}
        <Card className='bg-white border border-gray-200 shadow-sm'>
          <CardHeader className='pb-3'>
            <CardTitle className='text-lg font-semibold text-gray-900'>
              Application Stats
            </CardTitle>
          </CardHeader>
          <CardContent className='space-y-3'>
            <div className='grid grid-cols-2 gap-3'>
              <div className='text-center p-3 bg-blue-50 rounded-lg'>
                <div className='text-lg font-bold text-blue-600'>12</div>
                <div className='text-xs text-gray-600'>Applied</div>
              </div>
              <div className='text-center p-3 bg-green-50 rounded-lg'>
                <div className='text-lg font-bold text-green-600'>3</div>
                <div className='text-xs text-gray-600'>Interviews</div>
              </div>
            </div>
            <div className='space-y-2'>
              <div className='flex items-center justify-between text-sm'>
                <span className='text-gray-600'>Success Rate</span>
                <span className='font-medium'>25%</span>
              </div>
              <div className='flex items-center justify-between text-sm'>
                <span className='text-gray-600'>Pending</span>
                <span className='font-medium'>8</span>
              </div>
              <div className='flex items-center justify-between text-sm'>
                <span className='text-gray-600'>Rejected</span>
                <span className='font-medium'>1</span>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Upcoming Deadlines */}
        <Card className='bg-white border border-gray-200 shadow-sm'>
          <CardHeader className='pb-3'>
            <CardTitle className='text-lg font-semibold text-gray-900'>
              Upcoming Deadlines
            </CardTitle>
          </CardHeader>
          <CardContent className='space-y-3'>
            <div className='border border-gray-200 rounded-lg p-3'>
              <div className='flex items-center gap-3 mb-2'>
                <div className='w-8 h-8 bg-red-100 rounded-full flex items-center justify-center'>
                  <Calendar className='h-4 w-4 text-red-600' />
                </div>
                <div>
                  <h4 className='font-semibold text-sm text-gray-900'>
                    Gates Cambridge
                  </h4>
                  <p className='text-xs text-gray-600'>Dec 15, 2024</p>
                </div>
              </div>
            </div>
            <div className='border border-gray-200 rounded-lg p-3'>
              <div className='flex items-center gap-3 mb-2'>
                <div className='w-8 h-8 bg-yellow-100 rounded-full flex items-center justify-center'>
                  <Calendar className='h-4 w-4 text-yellow-600' />
                </div>
                <div>
                  <h4 className='font-semibold text-sm text-gray-900'>
                    Google Internship
                  </h4>
                  <p className='text-xs text-gray-600'>Jan 31, 2024</p>
                </div>
              </div>
            </div>
            <div className='border border-gray-200 rounded-lg p-3'>
              <div className='flex items-center gap-3 mb-2'>
                <div className='w-8 h-8 bg-green-100 rounded-full flex items-center justify-center'>
                  <Calendar className='h-4 w-4 text-green-600' />
                </div>
                <div>
                  <h4 className='font-semibold text-sm text-gray-900'>
                    Fulbright Grant
                  </h4>
                  <p className='text-xs text-gray-600'>Feb 28, 2024</p>
                </div>
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
              Find Opportunities
            </Button>
            <Button
              variant='ghost'
              className='w-full justify-start text-gray-600 hover:text-gray-900 hover:bg-gray-50'
            >
              <FileText className='h-4 w-4 mr-3' />
              Application Tracker
            </Button>
            <Button
              variant='ghost'
              className='w-full justify-start text-gray-600 hover:text-gray-900 hover:bg-gray-50'
            >
              <Mail className='h-4 w-4 mr-3' />
              Notifications
            </Button>
            <Button
              variant='ghost'
              className='w-full justify-start text-gray-600 hover:text-gray-900 hover:bg-gray-50'
            >
              <BarChart3 className='h-4 w-4 mr-3' />
              Analytics
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default StudentScholarships;
