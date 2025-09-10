import { useEffect, useMemo } from 'react';
import { Routes, Route, useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { signOutUser } from '@/lib/auth';
import { useToast } from '@/hooks/use-toast';
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
import ProfessorCourses from '@/components/dashboards/professor/ProfessorCourses';
import ProfessorFieldOfStudy from '@/components/dashboards/professor/ProfessorFieldOfStudy';
import ProfessorAnnouncements from '@/components/dashboards/professor/ProfessorAnnouncements';
import ProfessorResearchAssistant from '@/components/dashboards/professor/ProfessorResearchAssistant';
import ProfessorAdmissionAdvisory from '@/components/dashboards/professor/ProfessorAdmissionAdvisory';
import ProfessorPortfolio from '@/components/dashboards/professor/ProfessorPortfolio';
// University Components
import UniversityInstitutionDashboard from '@/components/dashboards/university/UniversityInstitutionDashboard';
import UniversityPrograms from '@/components/dashboards/university/UniversityPrograms';
import UniversityStudentRequirement from '@/components/dashboards/university/UniversityStudentRequirement';
import UniversityProfessorRequirement from '@/components/dashboards/university/UniversityProfessorRequirement';
import UniversityAlumniEngagement from '@/components/dashboards/university/UniversityAlumniEngagement';
import UniversityLiveSessions from '@/components/dashboards/university/UniversityLiveSessions';
import UniversityProfile from '@/components/dashboards/university/UniversityProfile';
import UniversityMessages from '@/components/dashboards/university/UniversityMessages';
import Notifications from '@/pages/Notifications';
import Profile from '@/pages/Profile';
import Chat from '@/pages/Chat';
import Groups from '@/pages/Groups';
import Explore from '@/pages/Explore';
import Analytics from '@/pages/Analytics';

const Dashboard = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { user: authUser, userData, loading } = useAuth();
  const { toast } = useToast();

  // Get current user data from Firebase Auth context - memoized to prevent infinite re-renders
  const user = useMemo(() => {
    if (!userData) {
      return {
        name: 'Loading...',
        role: 'student',
        avatar: '/api/placeholder/40/40',
        title: 'Loading...',
        university: '',
        location: '',
        profileViews: 0,
        country: '',
        rating: 0,
      };
    }

    return {
      name:
        userData.displayName ||
        `${userData.firstName || ''} ${userData.lastName || ''}`.trim() ||
        'User',
      role: userData.role || 'student',
      avatar: userData.avatar || '/api/placeholder/40/40',
      title:
        userData.role === 'professor'
          ? `${userData.position || 'Professor'} of ${
              userData.department || 'Computer Science'
            }`
          : userData.role === 'university'
          ? 'University Administrator'
          : `${userData.degreeLevel || 'Student'} in ${
              userData.major || 'Computer Science'
            }`,
      university:
        userData.institutionAffiliation ||
        userData.university ||
        userData.officialUniversityName ||
        '',
      location: userData.city
        ? `${userData.city}, ${userData.country || ''}`
        : userData.country || '',
      profileViews: userData.profileViews || 0,
      country: userData.country || '',
      rating: userData.rating || 4.5,
    };
  }, [userData]);

  const handleLogout = async () => {
    try {
      console.log('Starting logout process...');

      // Show loading toast immediately
      const loadingToast = toast({
        title: 'Signing Out...',
        description: 'Please wait while we sign you out.',
        duration: 0, // Don't auto-dismiss
      });

      const { error } = await signOutUser();

      // Dismiss the loading toast
      loadingToast.dismiss();

      if (error) {
        console.error('Logout error:', error);
        toast({
          title: 'Sign Out Failed',
          description: 'Failed to sign out. Please try again.',
          variant: 'destructive',
        });
      } else {
        console.log('Logout successful');
        toast({
          title: 'Signed Out',
          description: 'You have been successfully signed out.',
        });
        // Immediately navigate to login page
        navigate('/login', { replace: true });
      }
    } catch (error) {
      console.error('Logout error:', error);
      toast({
        title: 'Sign Out Error',
        description: 'An error occurred during sign out. Please try again.',
        variant: 'destructive',
      });
    }
  };

  // Get the current page title based on the route
  const getPageTitle = () => {
    const path = location.pathname;
    // Student routes
    if (path.includes('/courses')) return 'Courses';
    if (path.includes('/field-of-study')) return 'Field of Study';
    if (path.includes('/announcements')) return 'Announcements';
    if (path.includes('/research-assistant'))
      return 'Research Assistant Portal';
    if (path.includes('/admission-advisory'))
      return 'Admission & Academic Advisory';
    if (path.includes('/portfolio')) return 'Digital Portfolio Builder';
    if (path.includes('/mentorship')) return 'Mentorship';
    if (path.includes('/career-exploration'))
      return 'Career Exploration Center';
    if (path.includes('/scholarships')) return 'Scholarship & Internship Board';
    if (path.includes('/portfolio')) return 'Digital Portfolio Builder';
    // University routes
    if (path.includes('/institution')) return 'Institution Dashboard';
    if (path.includes('/programs')) return 'My Programs';
    if (path.includes('/student-requirement')) return 'Student Requirements';
    if (path.includes('/professor-requirement'))
      return 'Professor Requirements';
    if (path.includes('/alumni-engagement')) return 'Alumni Engagement';
    if (path.includes('/live-sessions')) return 'Live Sessions';
    if (path.includes('/messages')) return 'Messages';
    // Common routes
    if (path.includes('/notifications')) return 'Notifications';
    if (path.includes('/profile')) return 'Profile';
    if (path.includes('/chat')) return 'Messages';
    if (path.includes('/groups')) return 'Study Groups';
    if (path.includes('/explore')) return 'Explore';
    if (path.includes('/analytics')) return 'Analytics';
    return 'Dashboard';
  };

  const getPageSubtitle = () => {
    const path = location.pathname;
    // Student routes
    if (path.includes('/courses'))
      return 'Manage your courses and track student progress';
    if (path.includes('/field-of-study'))
      return 'Manage your research areas and academic focus';
    if (path.includes('/announcements'))
      return 'Create and manage announcements for your courses and department';
    if (path.includes('/research-assistant'))
      return 'Manage your research assistants and projects';
    if (path.includes('/admission-advisory'))
      return 'Manage applications and provide academic guidance';
    if (path.includes('/portfolio'))
      return 'Showcase your research, publications, and academic achievements';
    if (path.includes('/mentorship')) return 'Connect with mentors and mentees';
    if (path.includes('/career-exploration'))
      return 'Explore career opportunities and paths';
    if (path.includes('/scholarships'))
      return 'Find and apply for scholarships and internships';
    if (path.includes('/portfolio'))
      return 'Build and showcase your digital portfolio';
    // University routes
    if (path.includes('/institution'))
      return 'Manage your institution dashboard and analytics';
    if (path.includes('/programs'))
      return 'Manage and track your academic programs';
    if (path.includes('/student-requirement'))
      return 'Manage student requirements and applications';
    if (path.includes('/professor-requirement'))
      return 'Manage professor requirements and recruitment';
    if (path.includes('/alumni-engagement'))
      return 'Engage with alumni and manage networking events';
    if (path.includes('/live-sessions'))
      return 'Manage and host live sessions for students and faculty';
    if (path.includes('/messages'))
      return 'Manage communications and inquiries';
    // Common routes
    if (path.includes('/notifications'))
      return 'Stay updated with notifications';
    if (path.includes('/profile')) return 'Manage your profile and settings';
    if (path.includes('/chat')) return 'Connect with your network';
    if (path.includes('/groups')) return 'Join and manage study groups';
    if (path.includes('/explore')) return 'Discover new opportunities';
    if (path.includes('/analytics')) return 'View your analytics and insights';
    return 'Welcome to your academic journey';
  };

  // Scroll to top on route change
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [location.pathname]);

  return (
    <div className='min-h-screen bg-gray-50'>
      <DashboardHeader
        user={user}
        title={getPageTitle()}
        subtitle={getPageSubtitle()}
        onLogout={handleLogout}
      />
      <div className='max-w-8xl mx-auto px-4 py-6'>
        <div className='grid grid-cols-1 lg:grid-cols-12'>
          <div className='lg:col-span-3'>
            <LinkedInSidebar user={user} onLogout={handleLogout} />
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

              {/* Professor Routes */}
              <Route path='/professor' element={<ProfessorDashboard />} />
              <Route path='/courses' element={<ProfessorCourses />} />
              <Route
                path='/field-of-study'
                element={<ProfessorFieldOfStudy />}
              />
              <Route
                path='/announcements'
                element={<ProfessorAnnouncements />}
              />
              <Route
                path='/research-assistant'
                element={<ProfessorResearchAssistant />}
              />
              <Route
                path='/admission-advisory'
                element={<ProfessorAdmissionAdvisory />}
              />
              <Route path='/portfolio' element={<ProfessorPortfolio />} />

              {/* Top Navigation Routes */}
              <Route path='/notifications' element={<Notifications />} />
              <Route path='/profile' element={<Profile />} />
              <Route path='/chat' element={<Chat />} />
              <Route path='/groups' element={<Groups />} />
              <Route path='/explore' element={<Explore />} />
              <Route path='/analytics' element={<Analytics />} />

              {/* University Routes */}
              <Route path='/university' element={<UniversityDashboard />} />
              <Route
                path='/institution'
                element={<UniversityInstitutionDashboard />}
              />
              <Route path='/programs' element={<UniversityPrograms />} />
              <Route
                path='/student-requirement'
                element={<UniversityStudentRequirement />}
              />
              <Route
                path='/professor-requirement'
                element={<UniversityProfessorRequirement />}
              />
              <Route
                path='/alumni-engagement'
                element={<UniversityAlumniEngagement />}
              />
              <Route
                path='/live-sessions'
                element={<UniversityLiveSessions />}
              />
              <Route path='/messages' element={<UniversityMessages />} />
              <Route path='/profile' element={<UniversityProfile />} />
            </Routes>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
