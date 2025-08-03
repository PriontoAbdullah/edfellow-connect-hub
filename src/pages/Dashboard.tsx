import { useState, useEffect } from 'react';
import { useNavigate, useLocation, Routes, Route } from 'react-router-dom';
import { useToast } from '@/hooks/use-toast';
import { SidebarProvider } from '@/components/ui/sidebar';
import { AppSidebar } from '@/components/AppSidebar';
import { DashboardHeader } from '@/components/dashboard/DashboardHeader';
import { DashboardFooter } from '@/components/dashboard/DashboardFooter';
import StudentDashboard from '@/components/dashboards/StudentDashboard';
import ProfessorDashboard from '@/components/dashboards/ProfessorDashboard';
import UniversityDashboard from '@/components/dashboards/UniversityDashboard';
import RecentPosts from '@/components/dashboards/RecentPosts';
import Notifications from '@/pages/Notifications';

// Student Components
import StudentGroups from '@/components/dashboards/student/StudentGroups';
import StudentChat from '@/components/dashboards/student/StudentChat';
import StudentMentorship from '@/components/dashboards/student/StudentMentorship';
import StudentExplore from '@/components/dashboards/student/StudentExplore';
import StudentProfile from '@/components/dashboards/student/StudentProfile';

// Professor Components
import ProfessorGroups from '@/components/dashboards/professor/ProfessorGroups';
import ProfessorChat from '@/components/dashboards/professor/ProfessorChat';
import ProfessorMentorship from '@/components/dashboards/professor/ProfessorMentorship';
import ProfessorProfile from '@/components/dashboards/professor/ProfessorProfile';

// University Components (placeholder for now)
import UniversitySubmitProgram from '@/components/dashboards/university/UniversitySubmitProgram';
import UniversityPrograms from '@/components/dashboards/university/UniversityPrograms';
import UniversityMessages from '@/components/dashboards/university/UniversityMessages';
import UniversityProfile from '@/components/dashboards/university/UniversityProfile';

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
        country: 'United States',
      };
    }
  });

  // Check if user has completed their profile
  useEffect(() => {
    const storedUser = localStorage.getItem('edfellow_user');
    if (storedUser) {
      const userData = JSON.parse(storedUser);
      if (!userData.profileComplete) {
        navigate('/complete-profile', { state: { user: userData } });
      }
    }
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem('edfellow_user');
    toast({
      title: 'Logged Out',
      description: 'You have been successfully logged out.',
    });
    navigate('/');
  };

  const getDashboardTitle = (pathname: string) => {
    if (pathname.includes('/groups'))
      return user.role === 'professor' ? 'Subject Groups' : 'My Groups';
    if (pathname.includes('/chat')) return 'Messages';
    if (pathname.includes('/recent-posts')) return 'Recent Posts';
    if (pathname.includes('/mentorship'))
      return user.role === 'professor' ? 'Mentorship Requests' : 'Find Mentors';
    if (pathname.includes('/explore')) return 'Explore Programs';
    if (pathname.includes('/profile')) return 'My Profile';
    if (pathname.includes('/submit-program')) return 'Submit Program';
    if (pathname.includes('/programs')) return 'My Programs';
    if (pathname.includes('/messages')) return 'Messages';
    if (pathname.includes('/notifications')) return 'Notifications';

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

  const getDashboardSubtitle = (pathname: string) => {
    if (pathname.includes('/groups'))
      return user.role === 'professor'
        ? 'Connect with faculty and researchers'
        : 'Connect with global academic groups';
    if (pathname.includes('/chat')) return 'Chat with mentors and peers';
    if (pathname.includes('/recent-posts'))
      return 'Discover opportunities, scholarships, and announcements';
    if (pathname.includes('/mentorship'))
      return user.role === 'professor'
        ? 'Manage student mentorship requests'
        : 'Find and connect with mentors';
    if (pathname.includes('/explore'))
      return 'Discover educational opportunities';
    if (pathname.includes('/profile')) return 'Manage your profile';
    if (pathname.includes('/submit-program'))
      return 'Add your educational program';
    if (pathname.includes('/programs')) return 'Manage your programs';
    if (pathname.includes('/messages'))
      return 'Student and professor inquiries';
    if (pathname.includes('/notifications'))
      return 'Stay updated with your activities';

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
      <div className='min-h-screen flex w-full'>
        <AppSidebar user={user} onLogout={handleLogout} />

        <div className='flex-1 flex flex-col'>
          <DashboardHeader
            user={user}
            title={getDashboardTitle(location.pathname)}
            subtitle={getDashboardSubtitle(location.pathname)}
          />

          <main className='flex-1'>
            <Routes>
              {/* Default Dashboard Routes */}
              <Route
                path='/'
                element={
                  user.role === 'student' ? (
                    <StudentDashboard />
                  ) : user.role === 'professor' ? (
                    <ProfessorDashboard />
                  ) : (
                    <UniversityDashboard />
                  )
                }
              />

              {/* Common Routes */}
              <Route path='/notifications' element={<Notifications />} />
              <Route path='/recent-posts' element={<RecentPosts />} />

              {/* Student Routes */}
              <Route path='/groups' element={<StudentGroups />} />
              <Route path='/chat' element={<StudentChat />} />
              <Route
                path='/mentorship'
                element={
                  user.role === 'professor' ? (
                    <ProfessorMentorship />
                  ) : (
                    <StudentMentorship />
                  )
                }
              />
              <Route path='/explore' element={<StudentExplore />} />
              <Route
                path='/profile'
                element={
                  user.role === 'student' ? (
                    <StudentProfile />
                  ) : user.role === 'professor' ? (
                    <ProfessorProfile />
                  ) : (
                    <UniversityProfile />
                  )
                }
              />

              {/* Professor Routes */}
              <Route path='/subject-groups' element={<ProfessorGroups />} />
              <Route path='/professor-chat' element={<ProfessorChat />} />

              {/* University Routes */}
              <Route
                path='/submit-program'
                element={<UniversitySubmitProgram />}
              />
              <Route path='/programs' element={<UniversityPrograms />} />
              <Route path='/messages' element={<UniversityMessages />} />
              <Route
                path='/profile'
                element={
                  user.role === 'student' ? (
                    <StudentProfile />
                  ) : user.role === 'professor' ? (
                    <ProfessorProfile />
                  ) : (
                    <UniversityProfile />
                  )
                }
              />
            </Routes>
          </main>

          <DashboardFooter />
        </div>
      </div>
    </SidebarProvider>
  );
};

export default Dashboard;
