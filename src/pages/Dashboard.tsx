
import { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useToast } from "@/hooks/use-toast";
import {
  SidebarProvider,
} from "@/components/ui/sidebar";
import { AppSidebar } from '@/components/AppSidebar';
import { DashboardHeader } from '@/components/dashboard/DashboardHeader';
import { DashboardFooter } from '@/components/dashboard/DashboardFooter';
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

  const getDashboardTitle = () => {
    switch (user.role) {
      case 'student':
        return `Welcome back, ${user.name}`;
      case 'professor':
        return `Professor Dashboard`;
      case 'university':
        return `University Dashboard`;
      default:
        return `Welcome back, ${user.name}`;
    }
  };

  const getDashboardSubtitle = () => {
    switch (user.role) {
      case 'student':
        return 'Student Dashboard';
      case 'professor':
        return 'Faculty Portal';
      case 'university':
        return 'Institution Management';
      default:
        return 'Student Dashboard';
    }
  };

  return (
    <SidebarProvider>
      <div className="min-h-screen flex w-full">
        <AppSidebar user={user} onLogout={handleLogout} />
        
        <div className="flex-1 flex flex-col">
          <DashboardHeader 
            user={user} 
            title={getDashboardTitle()}
            subtitle={getDashboardSubtitle()}
          />
          
          <main className="flex-1">
            {renderDashboard()}
          </main>
          
          <DashboardFooter />
        </div>
      </div>
    </SidebarProvider>
  );
};

export default Dashboard;
