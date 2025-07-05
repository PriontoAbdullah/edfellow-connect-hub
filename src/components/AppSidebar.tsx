
import { useState } from "react";
import { NavLink, useLocation } from "react-router-dom";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
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
} from "@/components/ui/sidebar";
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
  Star
} from "lucide-react";

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
  const baseItems = [
    { title: "Dashboard", url: "/dashboard", icon: Home },
    { title: "Messages", url: "/dashboard/messages", icon: MessageSquare },
    { title: "Calendar", url: "/dashboard/calendar", icon: Calendar },
    { title: "Notifications", url: "/dashboard/notifications", icon: Bell },
  ];

  if (role === 'student') {
    return [
      ...baseItems,
      { title: "Peer Groups", url: "/dashboard/peer-groups", icon: Users },
      { title: "Mentors", url: "/dashboard/mentors", icon: UserCheck },
      { title: "Career Center", url: "/dashboard/career", icon: Briefcase },
      { title: "Portfolio", url: "/dashboard/portfolio", icon: Award },
      { title: "Scholarships", url: "/dashboard/scholarships", icon: Star },
      { title: "Search", url: "/dashboard/search", icon: Search },
      { title: "Settings", url: "/dashboard/settings", icon: Settings },
    ];
  }

  if (role === 'professor') {
    return [
      ...baseItems,
      { title: "Mentorship", url: "/dashboard/mentorship", icon: Heart },
      { title: "Courses", url: "/dashboard/courses", icon: BookOpen },
      { title: "Research", url: "/dashboard/research", icon: Award },
      { title: "Students", url: "/dashboard/students", icon: Users },
      { title: "Analytics", url: "/dashboard/analytics", icon: BarChart3 },
      { title: "Profile", url: "/dashboard/profile", icon: UserCheck },
      { title: "Settings", url: "/dashboard/settings", icon: Settings },
    ];
  }

  if (role === 'university') {
    return [
      ...baseItems,
      { title: "Programs", url: "/dashboard/programs", icon: Presentation },
      { title: "Recruitment", url: "/dashboard/recruitment", icon: Target },
      { title: "Faculty", url: "/dashboard/faculty", icon: UserCheck },
      { title: "Alumni", url: "/dashboard/alumni", icon: Network },
      { title: "Webinars", url: "/dashboard/webinars", icon: Video },
      { title: "Analytics", url: "/dashboard/analytics", icon: BarChart3 },
      { title: "Settings", url: "/dashboard/settings", icon: Settings },
    ];
  }

  return baseItems;
};

export function AppSidebar({ user, onLogout }: AppSidebarProps) {
  const { collapsed } = useSidebar();
  const location = useLocation();
  const currentPath = location.pathname;

  const menuItems = getMenuItems(user.role);
  
  const isActive = (path: string) => currentPath === path;
  const getNavCls = ({ isActive }: { isActive: boolean }) =>
    isActive 
      ? "bg-blue-100 text-blue-700 font-medium border-r-2 border-blue-500" 
      : "hover:bg-blue-50 text-gray-600 hover:text-blue-700";

  const getRoleColor = (role: string) => {
    switch (role) {
      case 'student': return 'text-blue-600 bg-blue-100';
      case 'professor': return 'text-green-600 bg-green-100';
      case 'university': return 'text-orange-600 bg-orange-100';
      default: return 'text-gray-600 bg-gray-100';
    }
  };

  return (
    <Sidebar className={`${collapsed ? "w-14" : "w-64"} border-r border-blue-200 bg-white`}>
      <SidebarContent className="bg-gradient-to-b from-blue-50/50 to-white">
        {/* Logo Section */}
        <div className="p-4 border-b border-blue-100">
          <div className="flex items-center space-x-3">
            <div className="p-2 bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl shadow-lg">
              <GraduationCap className="h-6 w-6 text-white" />
            </div>
            {!collapsed && (
              <div>
                <span className="text-xl font-bold bg-gradient-to-r from-blue-600 to-blue-700 bg-clip-text text-transparent">
                  Edfellow
                </span>
                <p className="text-xs text-blue-600 font-medium">Where Education Meets the World</p>
              </div>
            )}
          </div>
        </div>

        {/* User Profile Section */}
        <div className="p-4 border-b border-blue-100">
          <div className="flex items-center space-x-3">
            <Avatar className={`h-10 w-10 ${getRoleColor(user.role)}`}>
              <AvatarFallback className={getRoleColor(user.role)}>
                {user.name.split(' ').map(n => n[0]).join('')}
              </AvatarFallback>
            </Avatar>
            {!collapsed && (
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-gray-900 truncate">{user.name}</p>
                <p className="text-xs text-blue-600 capitalize">{user.role}</p>
                {user.major && <p className="text-xs text-gray-500 truncate">{user.major}</p>}
              </div>
            )}
          </div>
        </div>

        {/* Navigation Menu */}
        <SidebarGroup className="flex-1">
          <SidebarGroupLabel className="text-blue-700 font-semibold">
            {!collapsed ? 'Navigation' : ''}
          </SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu className="space-y-1">
              {menuItems.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild>
                    <NavLink 
                      to={item.url} 
                      end={item.url === '/dashboard'}
                      className={getNavCls}
                    >
                      <item.icon className="h-5 w-5 mr-3 flex-shrink-0" />
                      {!collapsed && <span className="truncate">{item.title}</span>}
                    </NavLink>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        {/* Logout Button */}
        <div className="p-4 border-t border-blue-100">
          <Button
            variant="ghost"
            className="w-full justify-start text-gray-600 hover:text-red-600 hover:bg-red-50"
            onClick={onLogout}
          >
            <LogOut className="h-5 w-5 mr-3 flex-shrink-0" />
            {!collapsed && <span>Logout</span>}
          </Button>
        </div>
      </SidebarContent>
    </Sidebar>
  );
}
