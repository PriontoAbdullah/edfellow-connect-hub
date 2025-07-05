
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
  Star,
  FileText,
  Send
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
  if (role === 'student') {
    return [
      { title: "Home", url: "/dashboard", icon: Home },
      { title: "My Groups", url: "/dashboard/groups", icon: Users },
      { title: "Chat", url: "/dashboard/chat", icon: MessageSquare },
      { title: "Mentorship", url: "/dashboard/mentorship", icon: Heart },
      { title: "Explore Programs", url: "/dashboard/explore", icon: Search },
      { title: "My Profile", url: "/dashboard/profile", icon: UserCheck },
    ];
  }

  if (role === 'professor') {
    return [
      { title: "Home", url: "/dashboard", icon: Home },
      { title: "Subject Groups", url: "/dashboard/groups", icon: Users },
      { title: "Chat", url: "/dashboard/chat", icon: MessageSquare },
      { title: "Mentorship", url: "/dashboard/mentorship", icon: Heart },
      { title: "My Profile", url: "/dashboard/profile", icon: UserCheck },
    ];
  }

  if (role === 'university') {
    return [
      { title: "Home", url: "/dashboard", icon: Home },
      { title: "Submit Program", url: "/dashboard/submit-program", icon: Send },
      { title: "My Programs", url: "/dashboard/programs", icon: BookOpen },
      { title: "Messages", url: "/dashboard/messages", icon: MessageSquare },
      { title: "Profile", url: "/dashboard/profile", icon: Building2 },
    ];
  }

  return [];
};

export function AppSidebar({ user, onLogout }: AppSidebarProps) {
  const { state } = useSidebar();
  const location = useLocation();
  const currentPath = location.pathname;
  const isCollapsed = state === "collapsed";

  const menuItems = getMenuItems(user.role);
  
  const isActive = (path: string) => {
    if (path === '/dashboard') {
      return currentPath === '/dashboard';
    }
    return currentPath.startsWith(path);
  };
    
  const getNavCls = (isActive: boolean) =>
    isActive 
      ? "bg-blue-600 text-white font-medium hover:bg-blue-700" 
      : "hover:bg-blue-700 text-blue-100 hover:text-white";

  const getRoleColor = (role: string) => {
    switch (role) {
      case 'student': return 'text-blue-600 bg-blue-100';
      case 'professor': return 'text-green-600 bg-green-100';
      case 'university': return 'text-orange-600 bg-orange-100';
      default: return 'text-gray-600 bg-gray-100';
    }
  };

  return (
    <Sidebar className={`${isCollapsed ? "w-14" : "w-64"} border-r-0 bg-[#0B1B4D]`}>
      <SidebarContent className="bg-[#0B1B4D]">
        {/* Logo Section */}
        <div className="p-4 border-b border-blue-800">
          <div className="flex items-center space-x-3">
            <div className="p-2 bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl shadow-lg">
              <GraduationCap className="h-6 w-6 text-white" />
            </div>
            {!isCollapsed && (
              <div>
                <span className="text-xl font-bold text-white">
                  Edfellow
                </span>
                <p className="text-xs text-blue-300 font-medium">Where Education Meets the World</p>
              </div>
            )}
          </div>
        </div>

        {/* User Profile Section */}
        <div className="p-4 border-b border-blue-800">
          <div className="flex items-center space-x-3">
            <Avatar className={`h-10 w-10 ${getRoleColor(user.role)}`}>
              <AvatarFallback className={getRoleColor(user.role)}>
                {user.name.split(' ').map(n => n[0]).join('')}
              </AvatarFallback>
            </Avatar>
            {!isCollapsed && (
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-white truncate">{user.name}</p>
                <p className="text-xs text-blue-300 capitalize">{user.role}</p>
                {user.major && <p className="text-xs text-blue-400 truncate">{user.major}</p>}
              </div>
            )}
          </div>
        </div>

        {/* Navigation Menu */}
        <SidebarGroup className="flex-1">
          <SidebarGroupLabel className="text-blue-300 font-semibold px-4">
            {!isCollapsed ? 'Navigation' : ''}
          </SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu className="space-y-1 px-2">
              {menuItems.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild>
                    <NavLink 
                      to={item.url} 
                      end={item.url === '/dashboard'}
                      className={({ isActive: navIsActive }) => 
                        `flex items-center px-4 py-3 rounded-lg transition-colors ${
                          getNavCls(navIsActive || isActive(item.url))
                        }`
                      }
                    >
                      <item.icon className="h-5 w-5 mr-3 flex-shrink-0" />
                      {!isCollapsed && <span className="truncate">{item.title}</span>}
                    </NavLink>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        {/* Logout Button */}
        <div className="p-4 border-t border-blue-800">
          <Button
            variant="ghost"
            className="w-full justify-start text-blue-100 hover:text-white hover:bg-blue-800"
            onClick={onLogout}
          >
            <LogOut className="h-5 w-5 mr-3 flex-shrink-0" />
            {!isCollapsed && <span>Logout</span>}
          </Button>
        </div>
      </SidebarContent>
    </Sidebar>
  );
}
