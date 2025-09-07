import { Toaster } from '@/components/ui/toaster';
import { Toaster as Sonner } from '@/components/ui/sonner';
import { TooltipProvider } from '@/components/ui/tooltip';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './contexts/AuthContext';
import ScrollToTop from '@/components/ScrollToTop';
import ProtectedRoute from '@/components/ProtectedRoute';
import Index from './pages/Index';
import About from './pages/About';
import Features from './pages/Features';
import Community from './pages/Community';
import SignUp from './pages/SignUp';
import Login from './pages/Login';
import ForgotPassword from './pages/ForgotPassword';
import CompleteProfile from './pages/CompleteProfile';
import Dashboard from './pages/Dashboard';
import NotFound from './pages/NotFound';
import Mentorship from './pages/Mentorship';
import Forum from './pages/Forum';
import Opportunities from './pages/Opportunities';
import RecentPosts from './pages/RecentPosts';

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <AuthProvider>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <ScrollToTop />
          <Routes>
            <Route path='/' element={<Index />} />
            <Route path='/about' element={<About />} />
            <Route path='/features' element={<Features />} />
            <Route path='/community' element={<Community />} />
            <Route
              path='/signup'
              element={
                <ProtectedRoute requireAuth={false}>
                  <SignUp />
                </ProtectedRoute>
              }
            />
            <Route
              path='/login'
              element={
                <ProtectedRoute requireAuth={false}>
                  <Login />
                </ProtectedRoute>
              }
            />
            <Route
              path='/forgot-password'
              element={
                <ProtectedRoute requireAuth={false}>
                  <ForgotPassword />
                </ProtectedRoute>
              }
            />
            <Route
              path='/complete-profile'
              element={
                <ProtectedRoute
                  requireAuth={true}
                  requireProfileCompletion={false}
                >
                  <CompleteProfile />
                </ProtectedRoute>
              }
            />
            <Route
              path='/dashboard/*'
              element={
                <ProtectedRoute
                  requireAuth={true}
                  requireProfileCompletion={true}
                >
                  <Dashboard />
                </ProtectedRoute>
              }
            />
            <Route
              path='/mentorship'
              element={
                <ProtectedRoute requireAuth={true}>
                  <Mentorship />
                </ProtectedRoute>
              }
            />
            <Route
              path='/forum'
              element={
                <ProtectedRoute requireAuth={true}>
                  <Forum />
                </ProtectedRoute>
              }
            />
            <Route
              path='/opportunities'
              element={
                <ProtectedRoute requireAuth={true}>
                  <Opportunities />
                </ProtectedRoute>
              }
            />
            <Route
              path='/recent-posts'
              element={
                <ProtectedRoute requireAuth={true}>
                  <RecentPosts />
                </ProtectedRoute>
              }
            />
            <Route path='*' element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </AuthProvider>
  </QueryClientProvider>
);

export default App;
