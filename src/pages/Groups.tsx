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
  Users,
  Search,
  Plus,
  MessageSquare,
  Settings,
  Crown,
  Star,
  Eye,
  BookOpen,
  GraduationCap,
  Building,
  Globe,
  Calendar,
  UserPlus,
  MoreHorizontal,
} from 'lucide-react';

const Groups = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [activeTab, setActiveTab] = useState('my-groups');

  const myGroups = [
    {
      id: 1,
      name: 'Computer Science Students',
      description:
        'A community for computer science students to share knowledge and collaborate on projects.',
      avatar: 'CS',
      members: 156,
      posts: 23,
      lastActivity: '2 hours ago',
      isAdmin: true,
      category: 'Academic',
      tags: ['Programming', 'Algorithms', 'Data Structures'],
    },
    {
      id: 2,
      name: 'AI Research Students',
      description:
        'Group for students working on artificial intelligence and machine learning research.',
      avatar: 'AI',
      members: 89,
      posts: 15,
      lastActivity: '1 day ago',
      isAdmin: false,
      category: 'Research',
      tags: ['Machine Learning', 'Neural Networks', 'AI'],
    },
    {
      id: 3,
      name: 'Web Development Enthusiasts',
      description: 'Share web development tips, tutorials, and project ideas.',
      avatar: 'WD',
      members: 234,
      posts: 45,
      lastActivity: '3 hours ago',
      isAdmin: false,
      category: 'Technology',
      tags: ['React', 'JavaScript', 'Web Development'],
    },
  ];

  const suggestedGroups = [
    {
      id: 4,
      name: 'Data Science Community',
      description: 'Learn and discuss data science, statistics, and analytics.',
      avatar: 'DS',
      members: 312,
      posts: 67,
      lastActivity: '5 hours ago',
      isAdmin: false,
      category: 'Academic',
      tags: ['Data Science', 'Statistics', 'Python'],
    },
    {
      id: 5,
      name: 'Cybersecurity Students',
      description:
        'Network security, ethical hacking, and cybersecurity discussions.',
      avatar: 'CY',
      members: 178,
      posts: 34,
      lastActivity: '1 day ago',
      isAdmin: false,
      category: 'Technology',
      tags: ['Security', 'Networking', 'Ethical Hacking'],
    },
    {
      id: 6,
      name: 'Mobile App Development',
      description:
        'iOS, Android, and cross-platform mobile development discussions.',
      avatar: 'MA',
      members: 145,
      posts: 28,
      lastActivity: '2 days ago',
      isAdmin: false,
      category: 'Technology',
      tags: ['iOS', 'Android', 'React Native'],
    },
  ];

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case 'Academic':
        return GraduationCap;
      case 'Research':
        return BookOpen;
      case 'Technology':
        return Building;
      default:
        return Users;
    }
  };

  const CategoryIcon = getCategoryIcon('Academic');

  return (
    <div className='p-4 sm:p-6 space-y-4 sm:space-y-6'>
      <div className='flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4'>
        <div>
          <h1 className='text-xl sm:text-2xl font-bold text-gray-900 flex items-center gap-2'>
            <Users className='h-5 w-5 sm:h-6 sm:w-6 text-blue-600' />
            Study Groups
          </h1>
          <p className='text-sm sm:text-base text-gray-600'>
            Connect with peers and join academic communities
          </p>
        </div>
        <Button className='bg-blue-600 hover:bg-blue-700 text-sm sm:text-base'>
          <Plus className='h-3 w-3 sm:h-4 sm:w-4 mr-1 sm:mr-2' />
          Create Group
        </Button>
      </div>

      {/* Search and Tabs */}
      <div className='flex flex-col sm:flex-row gap-3 sm:gap-4 items-start sm:items-center justify-between'>
        <div className='relative flex-1 max-w-md'>
          <Search className='absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4' />
          <Input
            placeholder='Search groups...'
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className='pl-10 text-sm sm:text-base'
          />
        </div>
        <div className='flex gap-2'>
          <Button
            variant={activeTab === 'my-groups' ? 'default' : 'outline'}
            onClick={() => setActiveTab('my-groups')}
            className='text-xs sm:text-sm'
          >
            My Groups
          </Button>
          <Button
            variant={activeTab === 'suggested' ? 'default' : 'outline'}
            onClick={() => setActiveTab('suggested')}
            className='text-xs sm:text-sm'
          >
            Suggested Groups
          </Button>
        </div>
      </div>

      {/* Groups Grid */}
      <div className='grid gap-4 sm:gap-6 grid-cols-1 md:grid-cols-2 lg:grid-cols-3'>
        {(activeTab === 'my-groups' ? myGroups : suggestedGroups)
          .filter(
            (group) =>
              group.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
              group.description.toLowerCase().includes(searchTerm.toLowerCase())
          )
          .map((group) => (
            <Card
              key={group.id}
              className='hover:shadow-md transition-shadow h-full flex flex-col'
            >
              <CardHeader className='flex-shrink-0 pb-3 sm:pb-4'>
                <div className='flex items-start justify-between'>
                  <div className='flex items-center gap-2 sm:gap-3 w-full'>
                    <Avatar className='h-10 w-10 sm:h-12 sm:w-12 flex-shrink-0'>
                      <AvatarFallback className='text-sm sm:text-lg font-semibold'>
                        {group.avatar}
                      </AvatarFallback>
                    </Avatar>
                    <div className='flex-1 min-w-0'>
                      <CardTitle className='text-base sm:text-lg break-words line-clamp-2'>
                        {group.name}
                      </CardTitle>
                      <CardDescription className='flex items-center gap-1 mt-1 text-xs sm:text-sm'>
                        <CategoryIcon className='h-2 w-2 sm:h-3 sm:w-3' />
                        {group.category}
                      </CardDescription>
                    </div>
                  </div>
                  <div className='flex items-center gap-1'>
                    {group.isAdmin && (
                      <Badge variant='secondary' className='text-xs'>
                        <Crown className='h-2 w-2 sm:h-3 sm:w-3 mr-1' />
                        Admin
                      </Badge>
                    )}
                    <Button
                      variant='ghost'
                      size='sm'
                      className='h-8 w-8 sm:h-10 sm:w-10'
                    >
                      <MoreHorizontal className='h-3 w-3 sm:h-4 sm:w-4' />
                    </Button>
                  </div>
                </div>
              </CardHeader>
              <CardContent className='space-y-3 sm:space-y-4 flex-grow'>
                <p className='text-xs sm:text-sm text-gray-600 line-clamp-2'>
                  {group.description}
                </p>

                <div className='flex flex-wrap gap-1'>
                  {group.tags.slice(0, 3).map((tag, index) => (
                    <Badge key={index} variant='outline' className='text-xs'>
                      {tag}
                    </Badge>
                  ))}
                  {group.tags.length > 3 && (
                    <Badge variant='outline' className='text-xs'>
                      +{group.tags.length - 3} more
                    </Badge>
                  )}
                </div>

                <div className='flex items-center justify-between text-xs sm:text-sm text-gray-500'>
                  <div className='flex items-center gap-2 sm:gap-4'>
                    <span className='flex items-center gap-1'>
                      <Users className='h-2 w-2 sm:h-3 sm:w-3' />
                      {group.members}
                    </span>
                    <span className='flex items-center gap-1'>
                      <MessageSquare className='h-2 w-2 sm:h-3 sm:w-3' />
                      {group.posts}
                    </span>
                  </div>
                  <span className='flex items-center gap-1'>
                    <Calendar className='h-2 w-2 sm:h-3 sm:w-3' />
                    {group.lastActivity}
                  </span>
                </div>

                <div className='flex gap-2 mt-auto'>
                  {activeTab === 'my-groups' ? (
                    <>
                      <Button
                        variant='outline'
                        size='sm'
                        className='flex-1 text-xs sm:text-sm'
                      >
                        <MessageSquare className='h-3 w-3 sm:h-4 sm:w-4 mr-1 sm:mr-2' />
                        View
                      </Button>
                      {group.isAdmin && (
                        <Button
                          variant='outline'
                          size='sm'
                          className='text-xs sm:text-sm'
                        >
                          <Settings className='h-3 w-3 sm:h-4 sm:w-4' />
                        </Button>
                      )}
                    </>
                  ) : (
                    <>
                      <Button
                        size='sm'
                        className='flex-1 bg-blue-600 hover:bg-blue-700 text-xs sm:text-sm'
                      >
                        <UserPlus className='h-3 w-3 sm:h-4 sm:w-4 mr-1 sm:mr-2' />
                        Join Group
                      </Button>
                      <Button
                        variant='outline'
                        size='sm'
                        className='text-xs sm:text-sm'
                      >
                        <Eye className='h-3 w-3 sm:h-4 sm:w-4' />
                      </Button>
                    </>
                  )}
                </div>
              </CardContent>
            </Card>
          ))}
      </div>

      {/* Empty State */}
      {(activeTab === 'my-groups' ? myGroups : suggestedGroups).filter(
        (group) =>
          group.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
          group.description.toLowerCase().includes(searchTerm.toLowerCase())
      ).length === 0 && (
        <div className='text-center py-8 sm:py-12'>
          <Users className='h-8 w-8 sm:h-12 sm:w-12 text-gray-400 mx-auto mb-3 sm:mb-4' />
          <h3 className='text-base sm:text-lg font-medium text-gray-900 mb-2'>
            {searchTerm
              ? 'No groups found'
              : `No ${
                  activeTab === 'my-groups'
                    ? 'groups joined'
                    : 'suggested groups'
                }`}
          </h3>
          <p className='text-sm sm:text-base text-gray-600 mb-4'>
            {searchTerm
              ? 'Try adjusting your search terms'
              : activeTab === 'my-groups'
              ? 'Join some groups to get started'
              : 'Check back later for new group suggestions'}
          </p>
          {activeTab === 'my-groups' && (
            <Button
              onClick={() => setActiveTab('suggested')}
              className='text-sm'
            >
              Browse Suggested Groups
            </Button>
          )}
        </div>
      )}
    </div>
  );
};

export default Groups;
