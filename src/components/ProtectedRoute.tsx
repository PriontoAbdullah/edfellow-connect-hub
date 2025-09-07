import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { Loader2 } from 'lucide-react';

interface ProtectedRouteProps {
  children: React.ReactNode;
  requireAuth?: boolean;
  requireProfileCompletion?: boolean;
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({
  children,
  requireAuth = true,
  requireProfileCompletion = false,
}) => {
  const { user, userData, loading } = useAuth();
  const location = useLocation();

  // Show loading spinner while checking authentication
  if (loading) {
    return (
      <div className='min-h-screen flex items-center justify-center'>
        <div className='text-center'>
          <Loader2 className='h-8 w-8 animate-spin mx-auto mb-4 text-blue-600' />
          <p className='text-gray-600'>Loading...</p>
        </div>
      </div>
    );
  }

  // Redirect to login if authentication is required but user is not logged in
  if (requireAuth && !user) {
    return <Navigate to='/login' state={{ from: location }} replace />;
  }

  // Redirect to complete profile if profile completion is required but not completed
  if (
    requireProfileCompletion &&
    user &&
    userData &&
    !userData.profileCompleted
  ) {
    return <Navigate to='/complete-profile' replace />;
  }

  // Redirect to dashboard if user is logged in and trying to access auth pages
  if (!requireAuth && user) {
    return <Navigate to='/dashboard' replace />;
  }

  return <>{children}</>;
};

export default ProtectedRoute;
