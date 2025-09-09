import { useState } from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { CountryFlag } from '@/components/ui/CountryFlag';
import { getCountryCode } from '@/lib/countries';
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from '@/components/ui/sidebar';
import {
  GraduationCap,
  Home,
  Users,
  MessageSquare,
  BookOpen,
  Calendar,
  Settings,
  Bell,
  Search,
  Award,
  BarChart3,
  Globe,
  Building2,
  UserCheck,
  Presentation,
  Network,
  Video,
  Target,
  LogOut,
  Heart,
  Briefcase,
  Star,
  FileText,
  Send,
  Newspaper,
  FolderOpen,
  ClipboardList,
} from 'lucide-react';

interface AppSidebarProps {
  user: {
    name: string;
    role: string;
    major?: string;
    country?: string;
  };
  onLogout: () => void;
}

const getMenuItems = (role: string) => {
  if (role === 'student') {
    return [
      { title: 'Home', url: '/dashboard', icon: Home },
      { title: 'My Groups', url: '/dashboard/groups', icon: Users },
      { title: 'Chat', url: '/dashboard/chat', icon: MessageSquare },
      {
        title: 'Recent Posts',
        url: '/dashboard/recent-posts',
        icon: Newspaper,
      },
      { title: 'Mentorship', url: '/dashboard/mentorship', icon: Heart },
      { title: 'Explore Programs', url: '/dashboard/explore', icon: Search },
      { title: 'My Profile', url: '/dashboard/profile', icon: UserCheck },
    ];
  }

  if (role === 'professor') {
    return [
      { title: 'Dashboard', url: '/dashboard', icon: Home },
      { title: 'Courses', url: '/dashboard/courses', icon: BookOpen },
      {
        title: 'Field of Study',
        url: '/dashboard/field-of-study',
        icon: GraduationCap,
      },
      { title: 'Mentorship', url: '/dashboard/mentorship', icon: Heart },
      { title: 'Announcements', url: '/dashboard/announcements', icon: Bell },
      {
        title: 'Research Assistant Portal',
        url: '/dashboard/research-assistant',
        icon: Target,
      },
      {
        title: 'Admission & Academic Advisory',
        url: '/dashboard/admission-advisory',
        icon: ClipboardList,
      },
      {
        title: 'Digital Portfolio Builder',
        url: '/dashboard/portfolio',
        icon: FolderOpen,
      },
    ];
  }

  if (role === 'university') {
    return [
      { title: 'Dashboard', url: '/dashboard', icon: Home },
      {
        title: 'Institution Dashboard',
        url: '/dashboard/institution',
        icon: Building2,
      },
      { title: 'My Programs', url: '/dashboard/programs', icon: BookOpen },
      {
        title: 'Student Requirement',
        url: '/dashboard/student-requirement',
        icon: GraduationCap,
      },
      {
        title: 'Professor Requirement',
        url: '/dashboard/professor-requirement',
        icon: UserCheck,
      },
      {
        title: 'Alumni Engagement',
        url: '/dashboard/alumni-engagement',
        icon: Users,
      },
      { title: 'Live Sessions', url: '/dashboard/live-sessions', icon: Video },
      { title: 'Profile', url: '/dashboard/profile', icon: Building2 },
    ];
  }

  return [];
};

export function AppSidebar({ user, onLogout }: AppSidebarProps) {
  const { state } = useSidebar();
  const location = useLocation();
  const currentPath = location.pathname;
  const isCollapsed = state === 'collapsed';

  const menuItems = getMenuItems(user.role);

  const isActive = (path: string) => {
    if (path === '/dashboard') {
      return currentPath === '/dashboard';
    }
    return currentPath.startsWith(path);
  };

  const getNavCls = (isActive: boolean) =>
    isActive
      ? 'bg-white/20 text-white font-medium hover:bg-white/30'
      : 'text-gray-300 hover:bg-white/10 hover:text-white';

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

  return (
    <Sidebar
      className={`${isCollapsed ? 'w-14' : 'w-64'} border-r-0 bg-gray-900`}
    >
      <SidebarContent className='bg-gray-900'>
        {/* Logo Section */}
        <div className='p-4 border-b border-gray-800'>
          <div className='flex items-center space-x-3'>
            <img src='/logo.png' alt='Edfellow' className='w-12 rounded-full' />
            {!isCollapsed && (
              <div>
                <span className='text-xl font-bold text-white'>Edfellow</span>
                <p className='text-[10px] text-gray-400 font-medium'>
                  Where Education Meets the World
                </p>
              </div>
            )}
          </div>
        </div>

        {/* Navigation Menu */}
        <SidebarGroup className='flex-1'>
          <SidebarGroupLabel className='text-gray-200 font-semibold px-4'>
            {!isCollapsed ? 'Navigation' : ''}
          </SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu className='space-y-2 px-2'>
              {menuItems.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild>
                    <NavLink
                      to={item.url}
                      end={item.url === '/dashboard'}
                      className={({ isActive: navIsActive }) =>
                        `flex items-center px-4 py-3 rounded-lg transition-colors text-gray-100 ${getNavCls(
                          navIsActive || isActive(item.url)
                        )}`
                      }
                    >
                      <item.icon className='h-5 w-5 mr-3 flex-shrink-0' />
                      {!isCollapsed && (
                        <span className='truncate'>{item.title}</span>
                      )}
                    </NavLink>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        {/* User Profile Section - Moved to bottom */}
        <div className='p-4 border-t border-gray-800'>
          <div className='flex items-center space-x-3'>
            <Avatar className={`h-10 w-10 ${getRoleColor(user.role)}`}>
              <AvatarFallback className={getRoleColor(user.role)}>
                {user.name
                  .split(' ')
                  .map((n) => n[0])
                  .join('')}
              </AvatarFallback>
            </Avatar>
            {!isCollapsed && (
              <div className='flex-1 min-w-0'>
                <div className='flex items-center gap-2'>
                  <p className='text-sm font-medium text-white truncate'>
                    {user.name}
                  </p>
                  {user.country && (
                    <CountryFlag
                      code={getCountryCode(user.country)}
                      size={12}
                      className='rounded-sm flex-shrink-0'
                    />
                  )}
                </div>
                <p className='text-xs text-gray-400 capitalize'>{user.role}</p>
                {user.major && (
                  <p className='text-xs text-gray-500 truncate'>{user.major}</p>
                )}
              </div>
            )}
          </div>
        </div>

        {/* Logout Button */}
        <div className='p-4 border-t border-gray-800'>
          <Button
            variant='ghost'
            className='w-full justify-start text-gray-300 hover:text-white hover:bg-white/10'
            onClick={onLogout}
          >
            <LogOut className='h-5 w-5 mr-3 flex-shrink-0' />
            {!isCollapsed && <span>Logout</span>}
          </Button>
        </div>
      </SidebarContent>
    </Sidebar>
  );
}
