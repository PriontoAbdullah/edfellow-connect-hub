
import { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { 
  Search, 
  Bell,
  GraduationCap,
  LogOut,
  Settings
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import StudentDashboard from '@/components/dashboards/StudentDashboard';
import ProfessorDashboard from '@/components/dashboards/ProfessorDashboard';
import UniversityDashboard from '@/components/dashboards/UniversityDashboard';

const Dashboard = () => {
  const navigate = useNavigate();
  
  // Mock user data - in real app this would come from authentication
  const [user] = useState({
    name: 'John Doe',
    role: 'student', // This would be determined by auth
    major: 'Computer Science',
    country: 'United States'
  });

  const handleLogout = () => {
    // In real app, clear auth state
    navigate('/');
  };

  const getRoleColor = (role: string) => {
    switch (role) {
      case 'student': return 'text-blue-600';
      case 'professor': return 'text-green-600';
      case 'university': return 'text-orange-600';
      default: return 'text-gray-600';
    }
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
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-2">
              <GraduationCap className="h-8 w-8 text-blue-600" />
              <span className="text-2xl font-bold text-gray-900">Edfellow</span>
            </div>
            
            <div className="flex items-center space-x-4">
              <Button variant="ghost" size="icon">
                <Search className="h-5 w-5" />
              </Button>
              <Button variant="ghost" size="icon" className="relative">
                <Bell className="h-5 w-5" />
                <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                  3
                </span>
              </Button>
              <Button variant="ghost" size="icon">
                <Settings className="h-5 w-5" />
              </Button>
              
              {/* User Menu */}
              <div className="flex items-center space-x-3">
                <Avatar className="h-8 w-8">
                  <AvatarFallback className={`${getRoleColor(user.role)} bg-opacity-10`}>
                    {user.name.split(' ').map(n => n[0]).join('')}
                  </AvatarFallback>
                </Avatar>
                <div className="hidden md:block">
                  <p className="text-sm font-medium text-gray-900">{user.name}</p>
                  <p className={`text-xs ${getRoleColor(user.role)} capitalize`}>{user.role}</p>
                </div>
              </div>
              
              <Button variant="ghost" size="icon" onClick={handleLogout}>
                <LogOut className="h-5 w-5" />
              </Button>
            </div>
          </div>
        </div>
      </header>

      {/* Dashboard Content */}
      {renderDashboard()}
    </div>
  );
};

export default Dashboard;
