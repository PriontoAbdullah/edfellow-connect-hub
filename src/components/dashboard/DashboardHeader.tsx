import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Bell,
  Search,
  User,
  Home,
  Users,
  Briefcase,
  MessageSquare,
  ChevronDown,
  Globe,
  Building2,
  Plus,
  GraduationCap,
  Settings,
  LogOut,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { SidebarTrigger } from '@/components/ui/sidebar';
import SearchModal from '@/components/modals/SearchModal';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

interface DashboardHeaderProps {
  user: {
    name: string;
    role: string;
    avatar?: string;
  };
  title: string;
  subtitle: string;
}

export function DashboardHeader({
  user,
  title,
  subtitle,
}: DashboardHeaderProps) {
  const navigate = useNavigate();
  const [isSearchOpen, setIsSearchOpen] = useState(false);

  const handleNotificationClick = () => {
    navigate('/dashboard/notifications');
  };

  const handleProfileClick = () => {
    navigate('/dashboard/profile');
  };

  const handleMessagingClick = () => {
    navigate('/dashboard/chat');
  };

  const handleNetworkClick = () => {
    navigate('/dashboard/groups');
  };

  const handleOpportunitiesClick = () => {
    navigate('/dashboard/explore');
  };

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

  return (
    <>
      <header className='bg-white border-b border-gray-200 sticky top-0 z-40'>
        <div className='max-w-7xl mx-auto px-4'>
          <div className='flex items-center justify-between h-14'>
            {/* Left Section - Logo and Search */}
            <div className='flex items-center gap-4'>
              {/* Logo */}
              <div className='flex items-center gap-2'>
                <img
                  src='/logo.png'
                  alt='Edfellow'
                  className='w-12 rounded-full'
                />
                <span className='text-xl font-bold text-gray-900'>
                  Edfellow
                </span>
              </div>

              {/* Search Bar */}
              <div className='relative hidden md:block'>
                <Search className='absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4' />
                <Input
                  placeholder='Search...'
                  className='pl-10 w-64 bg-gray-50 border-gray-200 focus:bg-white'
                  onClick={() => setIsSearchOpen(true)}
                  readOnly
                />
              </div>
            </div>

            {/* Center Section - Main Navigation */}
            <nav className='hidden lg:flex items-center gap-1'>
              <Button
                variant='ghost'
                className='flex flex-col items-center gap-1 h-14 px-3 text-gray-600 hover:text-gray-900 hover:bg-gray-50'
                onClick={() => navigate('/dashboard')}
              >
                <Home className='h-5 w-5' />
                <span className='text-xs'>Home</span>
              </Button>

              <Button
                variant='ghost'
                className='flex flex-col items-center gap-1 h-14 px-3 text-gray-600 hover:text-gray-900 hover:bg-gray-50'
                onClick={handleNetworkClick}
              >
                <Users className='h-5 w-5' />
                <span className='text-xs'>My Network</span>
              </Button>

              <Button
                variant='ghost'
                className='flex flex-col items-center gap-1 h-14 px-3 text-gray-600 hover:text-gray-900 hover:bg-gray-50'
                onClick={handleOpportunitiesClick}
              >
                <Briefcase className='h-5 w-5' />
                <span className='text-xs'>Opportunities</span>
              </Button>

              <Button
                variant='ghost'
                className='flex flex-col items-center gap-1 h-14 px-3 text-gray-600 hover:text-gray-900 hover:bg-gray-50 relative'
                onClick={handleMessagingClick}
              >
                <MessageSquare className='h-5 w-5' />
                <span className='text-xs'>Messaging</span>
                <span className='absolute top-0.5 -right-1 h-5 w-5 bg-red-500 rounded-full text-xs text-white flex items-center justify-center font-medium'>
                  5
                </span>
              </Button>

              <Button
                variant='ghost'
                className='flex flex-col items-center gap-1 h-14 px-3 text-gray-600 hover:text-gray-900 hover:bg-gray-50 relative'
                onClick={handleNotificationClick}
              >
                <Bell className='h-5 w-5' />
                <span className='text-xs'>Notifications</span>
                <span className='absolute top-0.5 -right-1 h-5 w-5 bg-red-500 rounded-full text-xs text-white flex items-center justify-center font-medium'>
                  3
                </span>
              </Button>
            </nav>

            {/* Right Section - Profile and Actions */}
            <div className='flex items-center gap-2'>
              {/* Me Dropdown */}
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button
                    variant='ghost'
                    className='flex items-center gap-2 h-10 px-3 text-gray-600 hover:text-gray-900 hover:bg-gray-50'
                  >
                    <Avatar className='h-6 w-6'>
                      <AvatarImage src={user.avatar} alt={user.name} />
                      <AvatarFallback className={getRoleColor(user.role)}>
                        {user.name
                          .split(' ')
                          .map((n) => n[0])
                          .join('')}
                      </AvatarFallback>
                    </Avatar>
                    <span className='text-sm font-medium hidden sm:block'>
                      Me
                    </span>
                    <ChevronDown className='h-4 w-4' />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align='end' className='w-56'>
                  <DropdownMenuLabel className='font-normal'>
                    <div className='flex flex-col space-y-1'>
                      <p className='text-sm font-medium leading-none'>
                        {user.name}
                      </p>
                      <p className='text-xs leading-none text-muted-foreground capitalize'>
                        {user.role}
                      </p>
                    </div>
                  </DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem onClick={handleProfileClick}>
                    <User className='mr-2 h-4 w-4' />
                    <span>View Profile</span>
                  </DropdownMenuItem>
                  <DropdownMenuItem>
                    <Settings className='mr-2 h-4 w-4' />
                    <span>Settings</span>
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem>
                    <LogOut className='mr-2 h-4 w-4' />
                    <span>Sign out</span>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>

              {/* For Students/Professors/Universities Dropdown */}
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button
                    variant='ghost'
                    className='flex items-center gap-2 h-10 px-3 text-gray-600 hover:text-gray-900 hover:bg-gray-50'
                  >
                    <RoleIcon className='h-5 w-5' />
                    <span className='text-sm font-medium hidden sm:block'>
                      For{' '}
                      {user.role === 'student'
                        ? 'Students'
                        : user.role === 'professor'
                        ? 'Professors'
                        : 'Universities'}
                    </span>
                    <ChevronDown className='h-4 w-4' />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align='end' className='w-56'>
                  <DropdownMenuLabel>Quick Actions</DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem>
                    <Plus className='mr-2 h-4 w-4' />
                    <span>Post a job</span>
                  </DropdownMenuItem>
                  <DropdownMenuItem>
                    <Globe className='mr-2 h-4 w-4' />
                    <span>Advertise</span>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>

              {/* Post Button */}
              <Button
                className='bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-full'
                onClick={() => navigate('/dashboard')}
              >
                <Plus className='h-4 w-4 mr-1' />
                Post
              </Button>
            </div>
          </div>
        </div>
      </header>

      <SearchModal
        isOpen={isSearchOpen}
        onClose={() => setIsSearchOpen(false)}
        userRole={user.role}
      />
    </>
  );
}
