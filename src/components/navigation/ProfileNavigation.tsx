import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Button } from '../ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '../ui/avatar';
import { Badge } from '../ui/badge';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '../ui/dropdown-menu';
import {
  User,
  Settings,
  Shield,
  Search,
  Users,
  Star,
  LogOut,
  Edit,
  Eye,
  Award,
  ChevronDown,
} from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext';
import { useProfile } from '../../hooks/useProfile';

interface ProfileNavigationProps {
  className?: string;
}

export const ProfileNavigation: React.FC<ProfileNavigationProps> = ({
  className = '',
}) => {
  const { user, userData, signOut } = useAuth();
  const { profile, completionPercentage } = useProfile(user?.id);
  const location = useLocation();

  if (!user || !userData) {
    return null;
  }

  const getInitials = (firstName: string, lastName: string) => {
    return `${firstName.charAt(0)}${lastName.charAt(0)}`.toUpperCase();
  };

  const getCompletionBadge = (percentage: number) => {
    if (percentage >= 90) {
      return (
        <Badge className='bg-green-100 text-green-800 text-xs'>Complete</Badge>
      );
    }
    if (percentage >= 70) {
      return <Badge className='bg-blue-100 text-blue-800 text-xs'>Good</Badge>;
    }
    if (percentage >= 50) {
      return (
        <Badge className='bg-yellow-100 text-yellow-800 text-xs'>
          In Progress
        </Badge>
      );
    }
    return (
      <Badge className='bg-red-100 text-red-800 text-xs'>Getting Started</Badge>
    );
  };

  const handleSignOut = async () => {
    try {
      await signOut();
    } catch (error) {
      console.error('Error signing out:', error);
    }
  };

  const isActiveRoute = (path: string) => {
    return location.pathname === path;
  };

  return (
    <div className={`flex items-center gap-4 ${className}`}>
      {/* Profile Search Button */}
      <Button
        variant='ghost'
        size='sm'
        asChild
        className={isActiveRoute('/discover') ? 'bg-muted' : ''}
      >
        <Link to='/discover'>
          <Search className='w-4 h-4 mr-2' />
          Discover
        </Link>
      </Button>

      {/* Profile Dropdown */}
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant='ghost' className='relative h-8 w-8 rounded-full'>
            <Avatar className='h-8 w-8'>
              <AvatarImage src={userData.avatar} alt={userData.displayName} />
              <AvatarFallback className='text-xs'>
                {getInitials(userData.firstName, userData.lastName)}
              </AvatarFallback>
            </Avatar>
            {completionPercentage < 70 && (
              <div className='absolute -top-1 -right-1 w-3 h-3 bg-yellow-500 rounded-full border-2 border-background' />
            )}
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent className='w-56' align='end' forceMount>
          <DropdownMenuLabel className='font-normal'>
            <div className='flex flex-col space-y-1'>
              <p className='text-sm font-medium leading-none'>
                {userData.displayName}
              </p>
              <p className='text-xs leading-none text-muted-foreground'>
                {userData.email}
              </p>
              <div className='flex items-center gap-2 mt-2'>
                {getCompletionBadge(completionPercentage)}
                <span className='text-xs text-muted-foreground'>
                  {completionPercentage}% complete
                </span>
              </div>
            </div>
          </DropdownMenuLabel>
          <DropdownMenuSeparator />

          {/* Profile Management */}
          <DropdownMenuItem asChild>
            <Link to={`/profile/${user.id}`} className='flex items-center'>
              <User className='mr-2 h-4 w-4' />
              <span>View Profile</span>
            </Link>
          </DropdownMenuItem>

          <DropdownMenuItem asChild>
            <Link
              to={`/profile/${user.id}?edit=true`}
              className='flex items-center'
            >
              <Edit className='mr-2 h-4 w-4' />
              <span>Edit Profile</span>
            </Link>
          </DropdownMenuItem>

          <DropdownMenuItem asChild>
            <Link to='/profile/settings' className='flex items-center'>
              <Settings className='mr-2 h-4 w-4' />
              <span>Profile Settings</span>
            </Link>
          </DropdownMenuItem>

          <DropdownMenuItem asChild>
            <Link to='/profile/privacy' className='flex items-center'>
              <Shield className='mr-2 h-4 w-4' />
              <span>Privacy Settings</span>
            </Link>
          </DropdownMenuItem>

          <DropdownMenuSeparator />

          {/* Quick Stats */}
          <div className='px-2 py-1.5 text-xs text-muted-foreground'>
            <div className='flex items-center justify-between'>
              <span className='flex items-center gap-1'>
                <Eye className='w-3 h-3' />
                {profile?.profileViews || 0} views
              </span>
              <span className='flex items-center gap-1'>
                <Users className='w-3 h-3' />
                {profile?.connections || 0} connections
              </span>
            </div>
            <div className='flex items-center justify-between mt-1'>
              <span className='flex items-center gap-1'>
                <Award className='w-3 h-3' />
                {profile?.endorsements || 0} endorsements
              </span>
            </div>
          </div>

          <DropdownMenuSeparator />

          {/* Sign Out */}
          <DropdownMenuItem onClick={handleSignOut} className='text-red-600'>
            <LogOut className='mr-2 h-4 w-4' />
            <span>Sign out</span>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
};

// Profile Quick Actions Component
export const ProfileQuickActions: React.FC<{ userId: string }> = ({
  userId,
}) => {
  const { profile, completionPercentage } = useProfile(userId);

  if (!profile) {
    return null;
  }

  const getCompletionColor = (percentage: number) => {
    if (percentage >= 90) return 'text-green-600';
    if (percentage >= 70) return 'text-blue-600';
    if (percentage >= 50) return 'text-yellow-600';
    return 'text-red-600';
  };

  const getCompletionMessage = (percentage: number) => {
    if (percentage >= 90) return 'Profile looks great!';
    if (percentage >= 70) return 'Almost there!';
    if (percentage >= 50) return 'Good progress!';
    return 'Complete your profile';
  };

  return (
    <div className='space-y-4'>
      {/* Profile Completion */}
      <div className='p-4 border rounded-lg bg-muted/50'>
        <div className='flex items-center justify-between mb-2'>
          <h3 className='text-sm font-medium'>Profile Completion</h3>
          <span
            className={`text-sm font-medium ${getCompletionColor(
              completionPercentage
            )}`}
          >
            {completionPercentage}%
          </span>
        </div>
        <div className='w-full bg-gray-200 rounded-full h-2 mb-2'>
          <div
            className='bg-blue-600 h-2 rounded-full transition-all duration-300'
            style={{ width: `${completionPercentage}%` }}
          />
        </div>
        <p className='text-xs text-muted-foreground'>
          {getCompletionMessage(completionPercentage)}
        </p>
        {completionPercentage < 70 && (
          <Button size='sm' className='w-full mt-2' asChild>
            <Link to={`/profile/${userId}?edit=true`}>Complete Profile</Link>
          </Button>
        )}
      </div>

      {/* Quick Stats */}
      <div className='grid grid-cols-3 gap-2 text-center'>
        <div className='p-2 border rounded'>
          <div className='text-lg font-bold'>{profile.profileViews || 0}</div>
          <div className='text-xs text-muted-foreground'>Views</div>
        </div>
        <div className='p-2 border rounded'>
          <div className='text-lg font-bold'>{profile.connections || 0}</div>
          <div className='text-xs text-muted-foreground'>Connections</div>
        </div>
        <div className='p-2 border rounded'>
          <div className='text-lg font-bold'>{profile.endorsements || 0}</div>
          <div className='text-xs text-muted-foreground'>Endorsements</div>
        </div>
      </div>
    </div>
  );
};

// Profile Navigation Links Component
export const ProfileNavigationLinks: React.FC = () => {
  const { user } = useAuth();
  const location = useLocation();

  if (!user) {
    return null;
  }

  const navLinks = [
    {
      href: `/profile/${user.id}`,
      label: 'My Profile',
      icon: User,
      active: location.pathname === `/profile/${user.id}`,
    },
    {
      href: '/discover',
      label: 'Discover People',
      icon: Search,
      active: location.pathname === '/discover',
    },
    {
      href: '/profile/settings',
      label: 'Profile Settings',
      icon: Settings,
      active: location.pathname === '/profile/settings',
    },
    {
      href: '/profile/privacy',
      label: 'Privacy Settings',
      icon: Shield,
      active: location.pathname === '/profile/privacy',
    },
  ];

  return (
    <nav className='space-y-1'>
      {navLinks.map((link) => {
        const Icon = link.icon;
        return (
          <Button
            key={link.href}
            variant={link.active ? 'secondary' : 'ghost'}
            className='w-full justify-start'
            asChild
          >
            <Link to={link.href}>
              <Icon className='mr-2 h-4 w-4' />
              {link.label}
            </Link>
          </Button>
        );
      })}
    </nav>
  );
};

export default ProfileNavigation;
