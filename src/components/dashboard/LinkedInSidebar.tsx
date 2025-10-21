import { useNavigate, useLocation } from 'react-router-dom';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { CountryFlag } from '@/components/ui/CountryFlag';
import { useToast } from '@/hooks/use-toast';
import { getCountryCode } from '@/lib/countries';
import { useRealtime } from '@/hooks/useRealtime';
import { useChatContext } from '@/contexts/ChatContext';
import {
  Bookmark,
  Users,
  Newspaper,
  Calendar,
  Globe,
  Building,
  Eye,
  GraduationCap,
  User,
  Building2,
  ChevronRight,
  Home,
  BookOpen,
  Heart,
  Megaphone,
  Briefcase,
  Award,
  FileText,
  Settings,
  LogOut,
  Target,
  Star,
  TrendingUp,
  Lightbulb,
  BookMarked,
  UserCheck,
  MessageSquare,
  Bell,
  Search,
  Plus,
  ExternalLink,
  BarChart3,
  UserPlus,
} from 'lucide-react';

interface LinkedInSidebarProps {
  user: {
    name: string;
    role: string;
    avatar?: string;
    title?: string;
    university?: string;
    location?: string;
    profileViews?: number;
    country?: string;
    rating?: number;
  };
  onLogout?: () => void;
}

export function LinkedInSidebar({ user, onLogout }: LinkedInSidebarProps) {
  const navigate = useNavigate();
  const location = useLocation();
  const { toast } = useToast();
  const { getUnreadCount } = useRealtime();
  const { getTotalUnreadCount } = useChatContext();

  const unreadCounts = getUnreadCount();
  const totalUnreadMessages = getTotalUnreadCount();

  const getRoleColor = (role: string) => {
    switch (role) {
      case 'student':
        return 'text-blue-600 bg-blue-100';
      case 'professor':
        return 'text-green-600 bg-green-100';
      case 'university':
        return 'text-orange-600 bg-orange-100';
      default:
        return 'text-gray-600 bg-gray-100';
    }
  };

  const getRoleIcon = (role: string) => {
    switch (role) {
      case 'student':
        return GraduationCap;
      case 'professor':
        return User;
      case 'university':
        return Building2;
      default:
        return User;
    }
  };

  const RoleIcon = getRoleIcon(user.role);

  const isActive = (path: string) => {
    if (path === '/dashboard' && location.pathname === '/dashboard') {
      return true;
    }
    if (path !== '/dashboard' && location.pathname.includes(path)) {
      return true;
    }
    return false;
  };

  return (
    <div className='space-y-4 p-4'>
      {/* Profile Card */}
      <Card className='bg-white border border-gray-200 shadow-sm'>
        <CardContent className='p-4'>
          <div className='text-center'>
            <div className='relative inline-block mb-3'>
              <Avatar className='h-16 w-16 mx-auto'>
                <AvatarImage src={user.avatar} alt={user.name} />
                <AvatarFallback className='bg-gray-100 text-gray-600'>
                  {user.name
                    .split(' ')
                    .map((n) => n[0])
                    .join('')}
                </AvatarFallback>
              </Avatar>
              {/* Online status indicator */}
              <div className='absolute -bottom-1 -right-1 h-4 w-4 bg-green-500 rounded-full border-2 border-white'></div>
            </div>
            <h3 className='font-bold text-gray-900 mb-1'>{user.name}</h3>
            <p className='text-sm text-gray-600 mb-1'>{user.title}</p>
            <p className='text-sm text-gray-600 mb-2'>{user.university}</p>
            {user.country && (
              <div className='flex items-center justify-center gap-1 mb-3'>
                <CountryFlag
                  code={getCountryCode(user.country)}
                  size={16}
                  className='rounded-sm'
                />
                <span className='text-sm text-gray-600'>{user.country}</span>
              </div>
            )}
            {/* <div className='flex items-center justify-center gap-1 mb-4'>
              <div className='flex'>
                {[1, 2, 3, 4, 5].map((star) => (
                  <Star
                    key={star}
                    className={`h-4 w-4 ${
                      star <= (user.rating || 4)
                        ? 'text-yellow-400 fill-current'
                        : 'text-gray-300'
                    }`}
                  />
                ))}
              </div>
              <span className='text-sm font-medium text-gray-900 ml-1'>
                {user.rating || 4.0}
              </span>
            </div> */}
            <Button
              variant='outline'
              className='w-full border-gray-300 text-gray-900 hover:bg-gray-50'
              onClick={() => navigate('/dashboard/profile')}
            >
              <ExternalLink className='h-4 w-4 mr-2' />
              View Digital Portfolio
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Profile Metrics */}
      {/* @TODO: Add profile metrics here */}
      {/* <Card className='bg-white border border-gray-200 shadow-sm'>
        <CardContent className='p-4'>
          <div className='space-y-3'>
            <div className='flex items-center justify-between text-sm'>
              <span className='text-gray-600'>Profile viewers</span>
              <span className='font-semibold text-gray-900'>
                {user.profileViews || 26}
              </span>
            </div>
            <Button
              variant='ghost'
              className='w-full text-blue-600 hover:text-blue-700 hover:bg-blue-50'
              onClick={() => {
                toast({
                  title: 'Analytics Dashboard',
                  description: 'Opening analytics dashboard...',
                });
                navigate('/dashboard/analytics');
              }}
            >
              View all analytics
            </Button>
          </div>
        </CardContent>
      </Card> */}

      {/* Main Navigation */}
      <Card className='bg-white border border-gray-200 shadow-sm'>
        <CardContent className='p-4'>
          <div className='space-y-2'>
            <Button
              variant={isActive('/dashboard') ? 'default' : 'ghost'}
              className={`w-full justify-start ${
                isActive('/dashboard')
                  ? 'bg-blue-600 text-white hover:bg-blue-700'
                  : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50'
              }`}
              onClick={() => navigate('/dashboard')}
            >
              <Home className='h-4 w-4 mr-3' />
              Dashboard
            </Button>
            {user.role === 'student' && (
              <>
                <Button
                  variant={isActive('/mentorship') ? 'default' : 'ghost'}
                  className={`w-full justify-start ${
                    isActive('/mentorship')
                      ? 'bg-blue-600 text-white hover:bg-blue-700'
                      : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50'
                  }`}
                  onClick={() => navigate('/dashboard/mentorship')}
                >
                  <Heart className='h-4 w-4 mr-3' />
                  Mentorship
                </Button>
                <Button
                  variant={isActive('/announcements') ? 'default' : 'ghost'}
                  className={`w-full justify-start ${
                    isActive('/announcements')
                      ? 'bg-blue-600 text-white hover:bg-blue-700'
                      : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50'
                  }`}
                  onClick={() => navigate('/dashboard/announcements')}
                >
                  <Megaphone className='h-4 w-4 mr-3' />
                  Announcements
                </Button>
                <Button
                  variant={
                    isActive('/career-exploration') ? 'default' : 'ghost'
                  }
                  className={`w-full justify-start ${
                    isActive('/career-exploration')
                      ? 'bg-blue-600 text-white hover:bg-blue-700'
                      : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50'
                  }`}
                  onClick={() => navigate('/dashboard/career-exploration')}
                >
                  <Briefcase className='h-4 w-4 mr-3' />
                  Career Exploration Center
                </Button>
                <Button
                  variant={isActive('/scholarships') ? 'default' : 'ghost'}
                  className={`w-full justify-start ${
                    isActive('/scholarships')
                      ? 'bg-blue-600 text-white hover:bg-blue-700'
                      : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50'
                  }`}
                  onClick={() => navigate('/dashboard/scholarships')}
                >
                  <Award className='h-4 w-4 mr-3' />
                  Scholarship & Internship Board
                </Button>
                <Button
                  variant={isActive('/portfolio') ? 'default' : 'ghost'}
                  className={`w-full justify-start ${
                    isActive('/portfolio')
                      ? 'bg-blue-600 text-white hover:bg-blue-700'
                      : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50'
                  }`}
                  onClick={() => navigate('/dashboard/portfolio')}
                >
                  <FileText className='h-4 w-4 mr-3' />
                  Digital Portfolio Builder
                </Button>
              </>
            )}
            {user.role === 'professor' && (
              <>
                <Button
                  variant={isActive('/courses') ? 'default' : 'ghost'}
                  className={`w-full justify-start ${
                    isActive('/courses')
                      ? 'bg-green-600 text-white hover:bg-green-700'
                      : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50'
                  }`}
                  onClick={() => navigate('/dashboard/courses')}
                >
                  <BookOpen className='h-4 w-4 mr-3' />
                  Courses
                </Button>
                <Button
                  variant={isActive('/mentorship') ? 'default' : 'ghost'}
                  className={`w-full justify-start ${
                    isActive('/mentorship')
                      ? 'bg-green-600 text-white hover:bg-green-700'
                      : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50'
                  }`}
                  onClick={() => navigate('/dashboard/mentorship')}
                >
                  <Heart className='h-4 w-4 mr-3' />
                  Mentorship
                </Button>
                <Button
                  variant={isActive('/announcements') ? 'default' : 'ghost'}
                  className={`w-full justify-start ${
                    isActive('/announcements')
                      ? 'bg-green-600 text-white hover:bg-green-700'
                      : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50'
                  }`}
                  onClick={() => navigate('/dashboard/announcements')}
                >
                  <Megaphone className='h-4 w-4 mr-3' />
                  Announcements
                </Button>
                <Button
                  variant={
                    isActive('/research-assistant') ? 'default' : 'ghost'
                  }
                  className={`w-full justify-start ${
                    isActive('/research-assistant')
                      ? 'bg-green-600 text-white hover:bg-green-700'
                      : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50'
                  }`}
                  onClick={() => navigate('/dashboard/research-assistant')}
                >
                  <Lightbulb className='h-4 w-4 mr-3' />
                  Research Assistant Portal
                </Button>
                <Button
                  variant={
                    isActive('/admission-advisory') ? 'default' : 'ghost'
                  }
                  className={`w-full justify-start ${
                    isActive('/admission-advisory')
                      ? 'bg-green-600 text-white hover:bg-green-700'
                      : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50'
                  }`}
                  onClick={() => navigate('/dashboard/admission-advisory')}
                >
                  <UserCheck className='h-4 w-4 mr-3' />
                  Admission & Academic Advisory
                </Button>
                <Button
                  variant={isActive('/portfolio') ? 'default' : 'ghost'}
                  className={`w-full justify-start ${
                    isActive('/portfolio')
                      ? 'bg-green-600 text-white hover:bg-green-700'
                      : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50'
                  }`}
                  onClick={() => navigate('/dashboard/portfolio')}
                >
                  <FileText className='h-4 w-4 mr-3' />
                  Digital Portfolio Builder
                </Button>
              </>
            )}
          </div>
        </CardContent>
      </Card>

      {/* Study Groups */}
      <Card className='bg-white border border-gray-200 shadow-sm'>
        <CardContent className='p-4'>
          <h4 className='font-semibold text-gray-900 mb-3'>Study Groups</h4>
          <div className='space-y-2'>
            <Button
              variant={isActive('/field-of-study') ? 'default' : 'ghost'}
              className={`w-full justify-start ${
                isActive('/field-of-study')
                  ? user.role === 'professor'
                    ? 'bg-green-600 text-white hover:bg-green-700'
                    : 'bg-blue-600 text-white hover:bg-blue-700'
                  : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50'
              }`}
              onClick={() => navigate('/dashboard/field-of-study')}
            >
              <BookOpen className='h-4 w-4 mr-3' />
              Field of Study
            </Button>
            <Button
              variant={isActive('/dashboard/groups') ? 'default' : 'ghost'}
              className={`w-full justify-start ${
                isActive('/dashboard/groups')
                  ? user.role === 'professor'
                    ? 'bg-green-600 text-white hover:bg-green-700'
                    : 'bg-blue-600 text-white hover:bg-blue-700'
                  : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50'
              }`}
              onClick={() => navigate('/dashboard/groups')}
            >
              <Users className='h-4 w-4 mr-3' />
              My Groups
            </Button>
            {user.role !== 'student' && (
              <Button
                variant='ghost'
                className='w-full justify-start text-gray-600 hover:text-gray-900 hover:bg-gray-50'
                onClick={() => navigate('/dashboard/groups/create')}
              >
                <Plus className='h-4 w-4 mr-3' />
                Create Group
              </Button>
            )}
            <Button
              variant='ghost'
              className='w-full justify-start text-gray-600 hover:text-gray-900 hover:bg-gray-50'
              onClick={() => navigate('/dashboard/groups/discover')}
            >
              <Search className='h-4 w-4 mr-3' />
              Discover Groups
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Messages & Notifications */}
      <Card className='bg-white border border-gray-200 shadow-sm'>
        <CardContent className='p-4'>
          <h4 className='font-semibold text-gray-900 mb-3'>Communication</h4>
          <div className='space-y-2'>
            <Button
              variant='ghost'
              className='w-full justify-start text-gray-600 hover:text-gray-900 hover:bg-gray-50 relative'
              onClick={() => navigate('/dashboard/chat')}
            >
              <MessageSquare className='h-4 w-4 mr-3' />
              Messages
              {totalUnreadMessages > 0 && (
                <span className='absolute right-2 h-2 w-2 bg-red-500 rounded-full'></span>
              )}
            </Button>
            <Button
              variant='ghost'
              className='w-full justify-start text-gray-600 hover:text-gray-900 hover:bg-gray-50 relative'
              onClick={() => navigate('/dashboard/notifications')}
            >
              <Bell className='h-4 w-4 mr-3' />
              Notifications
              {unreadCounts.notifications > 0 && (
                <span className='absolute right-2 h-2 w-2 bg-red-500 rounded-full'></span>
              )}
            </Button>
            <Button
              variant='ghost'
              className='w-full justify-start text-gray-600 hover:text-gray-900 hover:bg-gray-50'
              onClick={() => navigate('/dashboard/connections')}
            >
              <UserPlus className='h-4 w-4 mr-3' />
              My Network
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Explore Programs */}
      {/* <Card className='bg-white border border-gray-200 shadow-sm'>
        <CardContent className='p-4'>
          <h4 className='font-semibold text-gray-900 mb-3'>Explore</h4>
          <div className='space-y-2'>
            <Button
              variant='ghost'
              className='w-full justify-start text-gray-600 hover:text-gray-900 hover:bg-gray-50'
              onClick={() => navigate('/dashboard/explore')}
            >
              <Globe className='h-4 w-4 mr-3' />
              Explore Programs
            </Button>
            <Button
              variant='ghost'
              className='w-full justify-start text-gray-600 hover:text-gray-900 hover:bg-gray-50'
            >
              <TrendingUp className='h-4 w-4 mr-3' />
              Trending Topics
            </Button>
            <Button
              variant='ghost'
              className='w-full justify-start text-gray-600 hover:text-gray-900 hover:bg-gray-50'
            >
              <Star className='h-4 w-4 mr-3' />
              Featured Content
            </Button>
          </div>
        </CardContent>
      </Card> */}

      {/* Saved Items */}
      {/* <Card className='bg-white border border-gray-200 shadow-sm'>
        <CardContent className='p-4'>
          <h4 className='font-semibold text-gray-900 mb-3'>Saved Items</h4>
          <div className='space-y-2'>
            <Button
              variant='ghost'
              className='w-full justify-start text-gray-600 hover:text-gray-900 hover:bg-gray-50'
            >
              <Bookmark className='h-4 w-4 mr-3' />
              Saved items
            </Button>
            <Button
              variant='ghost'
              className='w-full justify-start text-gray-600 hover:text-gray-900 hover:bg-gray-50'
              onClick={() => navigate('/dashboard/groups')}
            >
              <Users className='h-4 w-4 mr-3' />
              Groups
            </Button>
            <Button
              variant='ghost'
              className='w-full justify-start text-gray-600 hover:text-gray-900 hover:bg-gray-50'
            >
              <Newspaper className='h-4 w-4 mr-3' />
              Newsletters
            </Button>
            <Button
              variant='ghost'
              className='w-full justify-start text-gray-600 hover:text-gray-900 hover:bg-gray-50'
            >
              <Calendar className='h-4 w-4 mr-3' />
              Events
            </Button>
          </div>
        </CardContent>
      </Card> */}
    </div>
  );
}
