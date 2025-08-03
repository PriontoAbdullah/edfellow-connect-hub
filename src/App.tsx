import { Toaster } from '@/components/ui/toaster';
import { Toaster as Sonner } from '@/components/ui/sonner';
import { TooltipProvider } from '@/components/ui/tooltip';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import ScrollToTop from '@/components/ScrollToTop';
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
          <Route path='/signup' element={<SignUp />} />
          <Route path='/login' element={<Login />} />
          <Route path='/forgot-password' element={<ForgotPassword />} />
          <Route path='/complete-profile' element={<CompleteProfile />} />
          <Route path='/dashboard/*' element={<Dashboard />} />
          <Route path='/mentorship' element={<Mentorship />} />
          <Route path='/forum' element={<Forum />} />
          <Route path='/opportunities' element={<Opportunities />} />
          <Route path='/recent-posts' element={<RecentPosts />} />
          <Route path='*' element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
