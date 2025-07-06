
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Bell, Search, User } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { SidebarTrigger } from "@/components/ui/sidebar";
import SearchModal from "@/components/modals/SearchModal";

interface DashboardHeaderProps {
  user: {
    name: string;
    role: string;
  };
  title: string;
  subtitle: string;
}

export function DashboardHeader({ user, title, subtitle }: DashboardHeaderProps) {
  const navigate = useNavigate();
  const [isSearchOpen, setIsSearchOpen] = useState(false);

  const getRoleColor = (role: string) => {
    switch (role) {
      case 'student': return 'text-blue-600 bg-blue-100';
      case 'professor': return 'text-green-600 bg-green-100';
      case 'university': return 'text-orange-600 bg-orange-100';
      default: return 'text-gray-600 bg-gray-100';
    }
  };

  const handleNotificationClick = () => {
    navigate('/dashboard/notifications');
  };

  const handleProfileClick = () => {
    navigate('/dashboard/profile');
  };

  return (
    <>
      <header className="bg-white border-b border-gray-200 sticky top-0 z-40">
        <div className="flex items-center justify-between h-16 px-6">
          <div className="flex items-center gap-4">
            <SidebarTrigger />
            <div>
              <h1 className="text-xl font-semibold text-gray-900">{title}</h1>
              <p className="text-sm text-blue-600">{subtitle}</p>
            </div>
          </div>
          
          <div className="flex items-center gap-4">
            <div className="relative cursor-pointer" onClick={() => setIsSearchOpen(true)}>
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
              <Input 
                placeholder="Search..." 
                className="pl-10 w-64 bg-gray-50 border-gray-200 cursor-pointer"
                readOnly
              />
            </div>
            
            <Button variant="ghost" size="icon" className="relative" onClick={handleNotificationClick}>
              <Bell className="h-5 w-5" />
              <span className="absolute -top-1 -right-1 h-3 w-3 bg-red-500 rounded-full"></span>
            </Button>
            
            <Avatar 
              className={`h-8 w-8 cursor-pointer ${getRoleColor(user.role)}`}
              onClick={handleProfileClick}
            >
              <AvatarFallback className={getRoleColor(user.role)}>
                {user.name.split(' ').map(n => n[0]).join('')}
              </AvatarFallback>
            </Avatar>
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
