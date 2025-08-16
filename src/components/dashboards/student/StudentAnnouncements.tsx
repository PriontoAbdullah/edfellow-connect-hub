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
import {
  Megaphone,
  Bell,
  Search,
  Filter,
  Calendar,
  Clock,
  Users,
  Star,
  Bookmark,
  Share2,
  MoreHorizontal,
  TrendingUp,
  AlertCircle,
  CheckCircle,
  Info,
  Award,
  GraduationCap,
  Building,
  Globe,
  Target,
  BookOpen,
  Video,
  FileText,
  ExternalLink,
} from 'lucide-react';

const StudentAnnouncements = () => {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');

  const categories = [
    { id: 'all', name: 'All', count: 24 },
    { id: 'academic', name: 'Academic', count: 8 },
    { id: 'career', name: 'Career', count: 6 },
    { id: 'events', name: 'Events', count: 5 },
    { id: 'scholarships', name: 'Scholarships', count: 3 },
    { id: 'research', name: 'Research', count: 2 },
  ];

  const announcements = [
    {
      id: 1,
      title: 'Fall 2024 Course Registration Now Open',
      content:
        'Registration for Fall 2024 courses begins next week. Please review the course catalog and meet with your academic advisor to plan your schedule.',
      category: 'academic',
      priority: 'high',
      author: 'Academic Affairs Office',
      avatar: '/api/placeholder/40/40',
      time: '2 hours ago',
      read: false,
      attachments: 2,
      color: 'bg-blue-100 text-blue-800',
      icon: BookOpen,
    },
    {
      id: 2,
      title: 'Tech Career Fair - Register Now',
      content:
        'Join us for the annual Tech Career Fair featuring top companies like Google, Microsoft, and Amazon. Network with recruiters and explore internship opportunities.',
      category: 'career',
      priority: 'medium',
      author: 'Career Services',
      avatar: '/api/placeholder/40/40',
      time: '4 hours ago',
      read: true,
      attachments: 1,
      color: 'bg-green-100 text-green-800',
      icon: Target,
    },
    {
      id: 3,
      title: 'Merit Scholarship Applications Due',
      content:
        "Applications for the Dean's Merit Scholarship are due by the end of this month. Eligible students must have a GPA of 3.8 or higher.",
      category: 'scholarships',
      priority: 'high',
      author: 'Financial Aid Office',
      avatar: '/api/placeholder/40/40',
      time: '6 hours ago',
      read: false,
      attachments: 3,
      color: 'bg-yellow-100 text-yellow-800',
      icon: Award,
    },
    {
      id: 4,
      title: 'Research Symposium Registration',
      content:
        'The annual Undergraduate Research Symposium will be held next month. Submit your research abstracts by the deadline to present your work.',
      category: 'research',
      priority: 'medium',
      author: 'Research Office',
      avatar: '/api/placeholder/40/40',
      time: '1 day ago',
      read: true,
      attachments: 0,
      color: 'bg-purple-100 text-purple-800',
      icon: TrendingUp,
    },
    {
      id: 5,
      title: 'Campus Safety Update',
      content:
        'Important safety reminder: Always lock your dorm rooms and report any suspicious activity to campus security immediately.',
      category: 'events',
      priority: 'low',
      author: 'Campus Security',
      avatar: '/api/placeholder/40/40',
      time: '1 day ago',
      read: true,
      attachments: 1,
      color: 'bg-red-100 text-red-800',
      icon: AlertCircle,
    },
    {
      id: 6,
      title: 'Study Abroad Information Session',
      content:
        'Learn about study abroad opportunities for the upcoming academic year. Representatives from partner universities will be present.',
      category: 'academic',
      priority: 'medium',
      author: 'International Programs',
      avatar: '/api/placeholder/40/40',
      time: '2 days ago',
      read: false,
      attachments: 2,
      color: 'bg-blue-100 text-blue-800',
      icon: Globe,
    },
  ];

  const filteredAnnouncements = announcements.filter((announcement) => {
    const matchesSearch =
      announcement.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      announcement.content.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory =
      selectedCategory === 'all' || announcement.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const getPriorityIcon = (priority: string) => {
    switch (priority) {
      case 'high':
        return AlertCircle;
      case 'medium':
        return Info;
      case 'low':
        return CheckCircle;
      default:
        return Info;
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high':
        return 'text-red-600 bg-red-100';
      case 'medium':
        return 'text-yellow-600 bg-yellow-100';
      case 'low':
        return 'text-green-600 bg-green-100';
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
                  placeholder='Search announcements...'
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
                  <Bookmark className='h-4 w-4 mr-2' />
                  Saved
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

        {/* Announcements List */}
        <div className='space-y-4'>
          {filteredAnnouncements.map((announcement) => {
            const PriorityIcon = getPriorityIcon(announcement.priority);
            const CategoryIcon = announcement.icon;
            return (
              <Card
                key={announcement.id}
                className={`bg-white border border-gray-200 shadow-sm ${
                  !announcement.read ? 'border-l-4 border-l-blue-500' : ''
                }`}
              >
                <CardContent className='p-4'>
                  <div className='flex items-start gap-3'>
                    <Avatar className='h-10 w-10'>
                      <AvatarImage
                        src={announcement.avatar}
                        alt={announcement.author}
                      />
                      <AvatarFallback className='bg-gray-100 text-gray-600'>
                        {announcement.author
                          .split(' ')
                          .map((n) => n[0])
                          .join('')}
                      </AvatarFallback>
                    </Avatar>
                    <div className='flex-1'>
                      <div className='flex items-start justify-between mb-2'>
                        <div className='flex items-center gap-2'>
                          <h4 className='font-semibold text-gray-900'>
                            {announcement.title}
                          </h4>
                          {!announcement.read && (
                            <div className='w-2 h-2 bg-blue-500 rounded-full'></div>
                          )}
                        </div>
                        <Button
                          variant='ghost'
                          size='sm'
                          className='text-gray-500'
                        >
                          <MoreHorizontal className='h-4 w-4' />
                        </Button>
                      </div>
                      <p className='text-sm text-gray-600 mb-3 leading-relaxed'>
                        {announcement.content}
                      </p>
                      <div className='flex items-center gap-4 text-xs text-gray-500 mb-3'>
                        <span className='flex items-center gap-1'>
                          <Clock className='h-3 w-3' />
                          {announcement.time}
                        </span>
                        {announcement.attachments > 0 && (
                          <span className='flex items-center gap-1'>
                            <FileText className='h-3 w-3' />
                            {announcement.attachments} attachment
                            {announcement.attachments > 1 ? 's' : ''}
                          </span>
                        )}
                      </div>
                      <div className='flex items-center gap-2'>
                        <Badge className={`text-xs ${announcement.color}`}>
                          <CategoryIcon className='h-3 w-3 mr-1' />
                          {announcement.category.charAt(0).toUpperCase() +
                            announcement.category.slice(1)}
                        </Badge>
                        <Badge
                          className={`text-xs ${getPriorityColor(
                            announcement.priority
                          )}`}
                        >
                          <PriorityIcon className='h-3 w-3 mr-1' />
                          {announcement.priority}
                        </Badge>
                      </div>
                    </div>
                  </div>
                  <div className='flex items-center justify-between mt-4 pt-3 border-t border-gray-100'>
                    <div className='flex items-center gap-2'>
                      <Button
                        variant='ghost'
                        size='sm'
                        className='text-gray-600 hover:text-gray-900'
                      >
                        <Bookmark className='h-4 w-4 mr-1' />
                        Save
                      </Button>
                      <Button
                        variant='ghost'
                        size='sm'
                        className='text-gray-600 hover:text-gray-900'
                      >
                        <Share2 className='h-4 w-4 mr-1' />
                        Share
                      </Button>
                    </div>
                    <Button size='sm' className='bg-blue-600 hover:bg-blue-700'>
                      Read More
                    </Button>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </div>

      {/* Right Sidebar */}
      <div className='lg:col-span-4 space-y-4'>
        {/* Quick Stats */}
        <Card className='bg-white border border-gray-200 shadow-sm'>
          <CardHeader className='pb-3'>
            <CardTitle className='text-lg font-semibold text-gray-900'>
              Announcement Stats
            </CardTitle>
          </CardHeader>
          <CardContent className='space-y-3'>
            <div className='grid grid-cols-2 gap-3'>
              <div className='text-center p-3 bg-blue-50 rounded-lg'>
                <div className='text-lg font-bold text-blue-600'>24</div>
                <div className='text-xs text-gray-600'>Total</div>
              </div>
              <div className='text-center p-3 bg-red-50 rounded-lg'>
                <div className='text-lg font-bold text-red-600'>3</div>
                <div className='text-xs text-gray-600'>Unread</div>
              </div>
            </div>
            <div className='space-y-2'>
              <div className='flex items-center justify-between text-sm'>
                <span className='text-gray-600'>Academic</span>
                <span className='font-medium'>8</span>
              </div>
              <div className='flex items-center justify-between text-sm'>
                <span className='text-gray-600'>Career</span>
                <span className='font-medium'>6</span>
              </div>
              <div className='flex items-center justify-between text-sm'>
                <span className='text-gray-600'>Events</span>
                <span className='font-medium'>5</span>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Important Dates */}
        <Card className='bg-white border border-gray-200 shadow-sm'>
          <CardHeader className='pb-3'>
            <CardTitle className='text-lg font-semibold text-gray-900'>
              Important Dates
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
                    Course Registration
                  </h4>
                  <p className='text-xs text-gray-600'>Due: Dec 15, 2024</p>
                </div>
              </div>
            </div>
            <div className='border border-gray-200 rounded-lg p-3'>
              <div className='flex items-center gap-3 mb-2'>
                <div className='w-8 h-8 bg-yellow-100 rounded-full flex items-center justify-center'>
                  <Award className='h-4 w-4 text-yellow-600' />
                </div>
                <div>
                  <h4 className='font-semibold text-sm text-gray-900'>
                    Scholarship Deadline
                  </h4>
                  <p className='text-xs text-gray-600'>Due: Dec 30, 2024</p>
                </div>
              </div>
            </div>
            <div className='border border-gray-200 rounded-lg p-3'>
              <div className='flex items-center gap-3 mb-2'>
                <div className='w-8 h-8 bg-green-100 rounded-full flex items-center justify-center'>
                  <Target className='h-4 w-4 text-green-600' />
                </div>
                <div>
                  <h4 className='font-semibold text-sm text-gray-900'>
                    Career Fair
                  </h4>
                  <p className='text-xs text-gray-600'>Jan 20, 2024</p>
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
              <Bell className='h-4 w-4 mr-3' />
              Notification Settings
            </Button>
            <Button
              variant='ghost'
              className='w-full justify-start text-gray-600 hover:text-gray-900 hover:bg-gray-50'
            >
              <Bookmark className='h-4 w-4 mr-3' />
              Saved Announcements
            </Button>
            <Button
              variant='ghost'
              className='w-full justify-start text-gray-600 hover:text-gray-900 hover:bg-gray-50'
            >
              <Calendar className='h-4 w-4 mr-3' />
              Calendar View
            </Button>
            <Button
              variant='ghost'
              className='w-full justify-start text-gray-600 hover:text-gray-900 hover:bg-gray-50'
            >
              <ExternalLink className='h-4 w-4 mr-3' />
              Export List
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default StudentAnnouncements;
