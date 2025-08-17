import { useEffect } from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import { DashboardHeader } from '@/components/dashboard/DashboardHeader';
import { LinkedInSidebar } from '@/components/dashboard/LinkedInSidebar';
import StudentDashboard from '@/components/dashboards/StudentDashboard';
import ProfessorDashboard from '@/components/dashboards/ProfessorDashboard';
import UniversityDashboard from '@/components/dashboards/UniversityDashboard';
import StudentFieldOfStudy from '@/components/dashboards/student/StudentFieldOfStudy';
import StudentAnnouncements from '@/components/dashboards/student/StudentAnnouncements';
import StudentCareerExploration from '@/components/dashboards/student/StudentCareerExploration';
import StudentMentorship from '@/components/dashboards/student/StudentMentorship';
import StudentScholarships from '@/components/dashboards/student/StudentScholarships';
import StudentPortfolio from '@/components/dashboards/student/StudentPortfolio';
import Notifications from '@/pages/Notifications';
import Profile from '@/pages/Profile';
import Chat from '@/pages/Chat';
import Groups from '@/pages/Groups';
import Explore from '@/pages/Explore';
import Analytics from '@/pages/Analytics';

const Dashboard = () => {
  const location = useLocation();

  // Mock user data - in real app, this would come from context or auth
  const user = {
    name: 'Zunnun Zihan',
    avatar: '/api/placeholder/40/40',
    title: 'Computer Science',
    university: 'University of Technology',
    location: 'Bangladesh',
    country: 'Bangladesh',
    rating: 4.0,
    profileViews: 26,
    role: 'student', // This would determine which dashboard to show
  };

  // Scroll to top on route change
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [location.pathname]);

  return (
    <div className='min-h-screen flex flex-col bg-gray-50'>
      <DashboardHeader
        user={user}
        title='Student Dashboard'
        subtitle='Welcome to your academic journey'
      />
      <div className='max-w-7xl mx-auto px-4 py-6'>
        <div className='grid grid-cols-1 lg:grid-cols-12 gap-6'>
          <div className='lg:col-span-3'>
            <LinkedInSidebar user={user} />
          </div>
          <div className='lg:col-span-9'>
            <Routes>
              {/* Student Routes */}
              <Route path='/' element={<StudentDashboard />} />
              <Route path='/field-of-study' element={<StudentFieldOfStudy />} />
              <Route path='/announcements' element={<StudentAnnouncements />} />
              <Route path='/mentorship' element={<StudentMentorship />} />
              <Route
                path='/career-exploration'
                element={<StudentCareerExploration />}
              />
              <Route path='/scholarships' element={<StudentScholarships />} />
              <Route path='/portfolio' element={<StudentPortfolio />} />

              {/* Top Navigation Routes */}
              <Route path='/notifications' element={<Notifications />} />
              <Route path='/profile' element={<Profile />} />
              <Route path='/chat' element={<Chat />} />
              <Route path='/groups' element={<Groups />} />
              <Route path='/explore' element={<Explore />} />
              <Route path='/analytics' element={<Analytics />} />

              {/* Professor Routes */}
              <Route path='/professor' element={<ProfessorDashboard />} />

              {/* University Routes */}
              <Route path='/university' element={<UniversityDashboard />} />
            </Routes>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
