import { Toaster } from '@/components/ui/toaster';
import { Toaster as Sonner } from '@/components/ui/sonner';
import { TooltipProvider } from '@/components/ui/tooltip';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './contexts/AuthContext';
import { FeedProvider } from './contexts/FeedContext';
import { LoadingProvider } from './contexts/LoadingContext';
import { ChatProvider } from './contexts/ChatContext';
import ScrollToTop from '@/components/ScrollToTop';
import ProtectedRoute from '@/components/ProtectedRoute';
import {
  PageTransitionLoader,
  ConnectionStatus,
  GlobalLoadingOverlay,
} from '@/components/ui/loading';
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
import Chat from './pages/Chat';
import Connections from './pages/Connections';
import GroupDetail from './pages/GroupDetail';
import UserProfile from './components/profile/UserProfile';

const ServiceNoticeOverlay = () => (
  <div
    role='alert'
    aria-live='assertive'
    style={{
      position: 'fixed',
      inset: 0,
      zIndex: 999999,
      background:
        'radial-gradient(circle at top, rgba(15,23,42,0.95), rgba(15,23,42,0.98))',
      color: '#f8fafc',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      textAlign: 'center',
      padding: '2.5rem 1.5rem',
      backdropFilter: 'blur(6px)',
      pointerEvents: 'all',
    }}
  >
    <div
      style={{
        maxWidth: '520px',
        width: '100%',
        border: '1px solid rgba(148, 163, 184, 0.35)',
        borderRadius: '24px',
        padding: '2.5rem 2rem',
        background: 'rgba(15, 23, 42, 0.75)',
        boxShadow: '0 25px 45px rgba(15, 23, 42, 0.6)',
      }}
    >
      <h1
        style={{
          fontSize: '2rem',
          fontWeight: 700,
          marginBottom: '1rem',
          letterSpacing: '0.02em',
          color: '#FFC50F',
        }}
      >
        Service Notice
      </h1>
      <p
        style={{
          fontSize: '1rem',
          lineHeight: 1.6,
          marginBottom: '1.5rem',
          color: '#e2e8f0',
        }}
      >
        Access to this website is temporarily on hold while hosting resources
        are reviewed. Please reach out to your project developer to discuss the
        current infrastructure usage, maintenance, and restore access.
      </p>
      <p
        style={{
          fontSize: '0.95rem',
          color: '#cbd5f5',
        }}
      >
        Thank you for your attention.
      </p>
    </div>
  </div>
);

const queryClient = new QueryClient();

const App = () => (
  <>
    <ServiceNoticeOverlay />
    <div aria-hidden='true'>
      <QueryClientProvider client={queryClient}>
        <LoadingProvider>
          <AuthProvider>
            <ChatProvider>
              <FeedProvider>
                <TooltipProvider>
                  <Toaster />
                  <Sonner />
                  <BrowserRouter>
                    <ScrollToTop />
                    <PageTransitionLoader />
                    <GlobalLoadingOverlay />
                    <ConnectionStatus isOnline={navigator.onLine} />
                    <Routes>
                      <Route path='/' element={<Index />} />
                      <Route path='/about' element={<About />} />
                      <Route path='/features' element={<Features />} />
                      <Route path='/community' element={<Community />} />
                      <Route
                        path='/groups/:groupId'
                        element={<GroupDetail />}
                      />
                      <Route
                        path='/profile/:userId'
                        element={
                          <ProtectedRoute requireAuth={true}>
                            <UserProfile />
                          </ProtectedRoute>
                        }
                      />
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
                      <Route
                        path='/chat'
                        element={
                          <ProtectedRoute requireAuth={true}>
                            <Chat />
                          </ProtectedRoute>
                        }
                      />
                      <Route
                        path='/connections'
                        element={
                          <ProtectedRoute requireAuth={true}>
                            <Connections />
                          </ProtectedRoute>
                        }
                      />
                      <Route path='*' element={<NotFound />} />
                    </Routes>
                  </BrowserRouter>
                </TooltipProvider>
              </FeedProvider>
            </ChatProvider>
          </AuthProvider>
        </LoadingProvider>
      </QueryClientProvider>
    </div>
  </>
);

export default App;
