import { useNavigate, useLocation } from 'react-router-dom';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
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
  };
}

export function LinkedInSidebar({ user }: LinkedInSidebarProps) {
  const navigate = useNavigate();
  const location = useLocation();

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

  const renderStudentNavigation = () => (
    <div className='space-y-4'>
      {/* Dashboard */}
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
            <Button
              variant={isActive('/field-of-study') ? 'default' : 'ghost'}
              className={`w-full justify-start ${
                isActive('/field-of-study')
                  ? 'bg-blue-600 text-white hover:bg-blue-700'
                  : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50'
              }`}
              onClick={() => navigate('/dashboard/field-of-study')}
            >
              <BookOpen className='h-4 w-4 mr-3' />
              Field of Study
            </Button>
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
              variant={isActive('/career-exploration') ? 'default' : 'ghost'}
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
          </div>
        </CardContent>
      </Card>

      {/* Quick Actions */}
      <Card className='bg-white border border-gray-200 shadow-sm'>
        <CardContent className='p-4'>
          <h4 className='font-semibold text-gray-900 mb-3'>Quick Actions</h4>
          <div className='space-y-2'>
            <Button
              variant='ghost'
              className='w-full justify-start text-gray-600 hover:text-gray-900 hover:bg-gray-50'
              onClick={() => navigate('/dashboard/field-of-study')}
            >
              <BookOpen className='h-4 w-4 mr-3' />
              Field of Study
            </Button>
            <Button
              variant='ghost'
              className='w-full justify-start text-gray-600 hover:text-gray-900 hover:bg-gray-50'
              onClick={() => navigate('/dashboard/mentorship')}
            >
              <Heart className='h-4 w-4 mr-3' />
              Find Mentors
            </Button>
            <Button
              variant='ghost'
              className='w-full justify-start text-gray-600 hover:text-gray-900 hover:bg-gray-50'
              onClick={() => navigate('/dashboard/career-exploration')}
            >
              <Briefcase className='h-4 w-4 mr-3' />
              Career Center
            </Button>
            <Button
              variant='ghost'
              className='w-full justify-start text-gray-600 hover:text-gray-900 hover:bg-gray-50'
              onClick={() => navigate('/dashboard/scholarships')}
            >
              <Award className='h-4 w-4 mr-3' />
              Scholarships
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );

  const renderProfessorNavigation = () => (
    <div className='space-y-4'>
      {/* Professor Navigation */}
      <Card className='bg-white border border-gray-200 shadow-sm'>
        <CardContent className='p-4'>
          <div className='space-y-2'>
            <Button
              variant='ghost'
              className='w-full justify-start text-gray-600 hover:text-gray-900 hover:bg-gray-50'
              onClick={() => navigate('/dashboard')}
            >
              <Home className='h-4 w-4 mr-3' />
              Dashboard
            </Button>
            <Button
              variant='ghost'
              className='w-full justify-start text-gray-600 hover:text-gray-900 hover:bg-gray-50'
              onClick={() => navigate('/dashboard/subject-groups')}
            >
              <Users className='h-4 w-4 mr-3' />
              Subject Groups
            </Button>
            <Button
              variant='ghost'
              className='w-full justify-start text-gray-600 hover:text-gray-900 hover:bg-gray-50'
              onClick={() => navigate('/dashboard/mentorship')}
            >
              <Heart className='h-4 w-4 mr-3' />
              Mentorship Requests
            </Button>
            <Button
              variant='ghost'
              className='w-full justify-start text-gray-600 hover:text-gray-900 hover:bg-gray-50'
              onClick={() => navigate('/dashboard/professor-chat')}
            >
              <MessageSquare className='h-4 w-4 mr-3' />
              Messages
            </Button>
            <Button
              variant='ghost'
              className='w-full justify-start text-gray-600 hover:text-gray-900 hover:bg-gray-50'
              onClick={() => navigate('/dashboard/research')}
            >
              <BookOpen className='h-4 w-4 mr-3' />
              Research Projects
            </Button>
            <Button
              variant='ghost'
              className='w-full justify-start text-gray-600 hover:text-gray-900 hover:bg-gray-50'
              onClick={() => navigate('/dashboard/publications')}
            >
              <FileText className='h-4 w-4 mr-3' />
              Publications
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );

  const renderUniversityNavigation = () => (
    <div className='space-y-4'>
      {/* University Navigation */}
      <Card className='bg-white border border-gray-200 shadow-sm'>
        <CardContent className='p-4'>
          <div className='space-y-2'>
            <Button
              variant='ghost'
              className='w-full justify-start text-gray-600 hover:text-gray-900 hover:bg-gray-50'
              onClick={() => navigate('/dashboard')}
            >
              <Home className='h-4 w-4 mr-3' />
              Dashboard
            </Button>
            <Button
              variant='ghost'
              className='w-full justify-start text-gray-600 hover:text-gray-900 hover:bg-gray-50'
              onClick={() => navigate('/dashboard/programs')}
            >
              <BookOpen className='h-4 w-4 mr-3' />
              Programs
            </Button>
            <Button
              variant='ghost'
              className='w-full justify-start text-gray-600 hover:text-gray-900 hover:bg-gray-50'
              onClick={() => navigate('/dashboard/submit-program')}
            >
              <Plus className='h-4 w-4 mr-3' />
              Submit Program
            </Button>
            <Button
              variant='ghost'
              className='w-full justify-start text-gray-600 hover:text-gray-900 hover:bg-gray-50'
              onClick={() => navigate('/dashboard/messages')}
            >
              <MessageSquare className='h-4 w-4 mr-3' />
              Messages
            </Button>
            <Button
              variant='ghost'
              className='w-full justify-start text-gray-600 hover:text-gray-900 hover:bg-gray-50'
              onClick={() => navigate('/dashboard/analytics')}
            >
              <TrendingUp className='h-4 w-4 mr-3' />
              Analytics
            </Button>
            <Button
              variant='ghost'
              className='w-full justify-start text-gray-600 hover:text-gray-900 hover:bg-gray-50'
              onClick={() => navigate('/dashboard/settings')}
            >
              <Settings className='h-4 w-4 mr-3' />
              Settings
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );

  return (
    <div className='space-y-4'>
      {/* Profile Card */}
      <Card className='bg-white border border-gray-200 shadow-sm'>
        <CardContent className='p-4'>
          <div className='text-center'>
            <div className='relative inline-block mb-3'>
              <Avatar className='h-16 w-16 mx-auto'>
                <AvatarImage src={user.avatar} alt={user.name} />
                <AvatarFallback className={getRoleColor(user.role)}>
                  {user.name
                    .split(' ')
                    .map((n) => n[0])
                    .join('')}
                </AvatarFallback>
              </Avatar>
            </div>
            <h3 className='font-semibold text-gray-900 mb-1'>{user.name}</h3>
            <p className='text-sm text-gray-600 mb-1'>
              {user.title || user.role}
            </p>
            <p className='text-sm text-gray-600 mb-2 flex items-center justify-center gap-1'>
              <Globe className='h-3 w-3' />
              {user.location || 'Location'}
            </p>
            <p className='text-sm text-gray-600 mb-3 flex items-center justify-center gap-1'>
              <Building className='h-3 w-3' />
              {user.university || 'University'}
            </p>
          </div>
        </CardContent>
      </Card>

      {/* Profile Metrics */}
      <Card className='bg-white border border-gray-200 shadow-sm'>
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
            >
              View all analytics
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Role-Specific Navigation */}
      {user.role === 'student' && renderStudentNavigation()}
      {user.role === 'professor' && renderProfessorNavigation()}
      {user.role === 'university' && renderUniversityNavigation()}

      {/* Quick Actions */}
      <Card className='bg-white border border-gray-200 shadow-sm'>
        <CardContent className='p-4'>
          <h4 className='font-semibold text-gray-900 mb-3'>Quick Actions</h4>
          <div className='space-y-2'>
            <Button
              variant='ghost'
              className='w-full justify-start text-gray-600 hover:text-gray-900 hover:bg-gray-50'
              onClick={() => navigate('/dashboard/field-of-study')}
            >
              <BookOpen className='h-4 w-4 mr-3' />
              Field of Study
            </Button>
            <Button
              variant='ghost'
              className='w-full justify-start text-gray-600 hover:text-gray-900 hover:bg-gray-50'
              onClick={() => navigate('/dashboard/mentorship')}
            >
              <Heart className='h-4 w-4 mr-3' />
              Find Mentors
            </Button>
            <Button
              variant='ghost'
              className='w-full justify-start text-gray-600 hover:text-gray-900 hover:bg-gray-50'
              onClick={() => navigate('/dashboard/career-exploration')}
            >
              <Briefcase className='h-4 w-4 mr-3' />
              Career Center
            </Button>
            <Button
              variant='ghost'
              className='w-full justify-start text-gray-600 hover:text-gray-900 hover:bg-gray-50'
              onClick={() => navigate('/dashboard/scholarships')}
            >
              <Award className='h-4 w-4 mr-3' />
              Scholarships
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Study Groups */}
      <Card className='bg-white border border-gray-200 shadow-sm'>
        <CardContent className='p-4'>
          <h4 className='font-semibold text-gray-900 mb-3'>Study Groups</h4>
          <div className='space-y-2'>
            <Button
              variant='ghost'
              className='w-full justify-start text-gray-600 hover:text-gray-900 hover:bg-gray-50'
              onClick={() => navigate('/dashboard/groups')}
            >
              <Users className='h-4 w-4 mr-3' />
              My Groups
            </Button>
            <Button
              variant='ghost'
              className='w-full justify-start text-gray-600 hover:text-gray-900 hover:bg-gray-50'
            >
              <Plus className='h-4 w-4 mr-3' />
              Create Group
            </Button>
            <Button
              variant='ghost'
              className='w-full justify-start text-gray-600 hover:text-gray-900 hover:bg-gray-50'
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
              <span className='absolute right-2 h-2 w-2 bg-red-500 rounded-full'></span>
            </Button>
            <Button
              variant='ghost'
              className='w-full justify-start text-gray-600 hover:text-gray-900 hover:bg-gray-50 relative'
              onClick={() => navigate('/dashboard/notifications')}
            >
              <Bell className='h-4 w-4 mr-3' />
              Notifications
              <span className='absolute right-2 h-2 w-2 bg-red-500 rounded-full'></span>
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Explore Programs */}
      <Card className='bg-white border border-gray-200 shadow-sm'>
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
      </Card>

      {/* Saved Items */}
      <Card className='bg-white border border-gray-200 shadow-sm'>
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
      </Card>
    </div>
  );
}
