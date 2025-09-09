import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { AuthLoadingOverlay } from '@/components/ui/loading';

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

  // Show loading overlay while checking authentication
  if (loading) {
    return (
      <AuthLoadingOverlay
        isVisible={true}
        message='Connecting to EdFellow...'
      />
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
