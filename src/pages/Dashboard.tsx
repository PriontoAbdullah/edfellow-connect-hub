
import { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useToast } from "@/hooks/use-toast";
import {
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar";
import { AppSidebar } from '@/components/AppSidebar';
import StudentDashboard from '@/components/dashboards/StudentDashboard';
import ProfessorDashboard from '@/components/dashboards/ProfessorDashboard';
import UniversityDashboard from '@/components/dashboards/UniversityDashboard';

const Dashboard = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { toast } = useToast();
  
  // Get user data from navigation state or localStorage
  const [user, setUser] = useState(() => {
    const locationState = location.state as any;
    const storedUser = localStorage.getItem('edfellow_user');
    
    if (locationState?.user) {
      localStorage.setItem('edfellow_user', JSON.stringify(locationState.user));
      return locationState.user;
    } else if (storedUser) {
      return JSON.parse(storedUser);
    } else {
      return {
        name: 'John Doe',
        role: 'student',
        major: 'Computer Science',
        country: 'United States'
      };
    }
  });

  const handleLogout = () => {
    localStorage.removeItem('edfellow_user');
    toast({
      title: "Logged Out",
      description: "You have been successfully logged out.",
    });
    navigate('/');
  };

  const renderDashboard = () => {
    switch (user.role) {
      case 'student':
        return <StudentDashboard />;
      case 'professor':
        return <ProfessorDashboard />;
      case 'university':
        return <UniversityDashboard />;
      default:
        return <StudentDashboard />;
    }
  };

  return (
    <SidebarProvider>
      <div className="min-h-screen flex w-full bg-gradient-to-br from-blue-50/30 via-white to-blue-100/20">
        <AppSidebar user={user} onLogout={handleLogout} />
        
        <main className="flex-1 flex flex-col">
          <header className="bg-white/95 backdrop-blur-xl border-b border-blue-100 sticky top-0 z-40">
            <div className="flex items-center h-16 px-6">
              <SidebarTrigger className="mr-4" />
              <div className="flex-1">
                <h1 className="text-xl font-semibold text-gray-900">
                  Welcome back, {user.name}
                </h1>
                <p className="text-sm text-blue-600 capitalize">{user.role} Dashboard</p>
              </div>
            </div>
          </header>
          
          <div className="flex-1 overflow-auto">
            {renderDashboard()}
          </div>
        </main>
      </div>
    </SidebarProvider>
  );
};

export default Dashboard;
