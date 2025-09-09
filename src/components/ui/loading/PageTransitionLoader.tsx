import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { cn } from '@/lib/utils';
import { ModernSpinner, DotsSpinner } from './ModernSpinner';
import { usePageLoading } from '@/contexts/LoadingContext';

// =============================================
// TYPES
// =============================================

export interface PageTransitionLoaderProps {
  className?: string;
  variant?: 'slide' | 'fade' | 'scale' | 'blur';
  duration?: number;
  showProgress?: boolean;
  message?: string;
}

// =============================================
// PAGE TRANSITION LOADER
// =============================================

export const PageTransitionLoader: React.FC<PageTransitionLoaderProps> = ({
  className,
  variant = 'fade',
  duration = 300,
  showProgress = true,
  message = 'Loading page...',
}) => {
  const [isVisible, setIsVisible] = useState(false);
  const [progress, setProgress] = useState(0);
  const { isLoading, message: loadingMessage } = usePageLoading();
  const location = useLocation();

  // Show loader when page loading starts
  useEffect(() => {
    if (isLoading) {
      setIsVisible(true);
      setProgress(0);
    } else {
      // Animate progress to 100% before hiding
      setProgress(100);
      setTimeout(() => {
        setIsVisible(false);
        setProgress(0);
      }, duration);
    }
  }, [isLoading, duration]);

  // Simulate progress
  useEffect(() => {
    if (!isLoading) return;

    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 90) return prev; // Stop at 90% until loading completes
        return prev + Math.random() * 15;
      });
    }, 200);

    return () => clearInterval(interval);
  }, [isLoading]);

  if (!isVisible) return null;

  const variantClasses = {
    slide: 'transform transition-transform duration-300 ease-out',
    fade: 'transition-opacity duration-300 ease-out',
    scale: 'transform transition-all duration-300 ease-out scale-95',
    blur: 'backdrop-blur-sm transition-all duration-300 ease-out',
  };

  const displayMessage = loadingMessage || message;

  return (
    <div
      className={cn(
        'fixed inset-0 z-50 flex items-center justify-center bg-white/95',
        variantClasses[variant],
        className
      )}
    >
      <div className='text-center space-y-6 max-w-md mx-4'>
        {/* Logo */}
        <div className='flex justify-center'>
          <div className='w-16 h-16 rounded-full bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center shadow-lg'>
            <img
              src='/logo.png'
              alt='Edfellow'
              className='w-10 h-10 rounded-full'
            />
          </div>
        </div>

        {/* Spinner */}
        <div className='flex justify-center'>
          <DotsSpinner size='lg' variant='primary' />
        </div>

        {/* Message */}
        <div className='space-y-2'>
          <h3 className='text-lg font-semibold text-gray-900'>
            {displayMessage}
          </h3>
          <p className='text-sm text-gray-600'>
            Please wait while we prepare your content...
          </p>
        </div>

        {/* Progress Bar */}
        {showProgress && (
          <div className='w-full max-w-xs mx-auto space-y-2'>
            <div className='flex justify-between text-xs text-gray-500'>
              <span>Loading</span>
              <span>{Math.round(progress)}%</span>
            </div>
            <div className='w-full bg-gray-200 rounded-full h-1.5'>
              <div
                className='bg-gradient-to-r from-blue-500 to-indigo-600 h-1.5 rounded-full transition-all duration-300 ease-out'
                style={{ width: `${progress}%` }}
              />
            </div>
          </div>
        )}

        {/* Loading Tips */}
        <div className='text-xs text-gray-400 space-y-1'>
          <p>💡 Tip: Complete your profile to unlock more features</p>
          <p>🔗 Connect with peers in your field</p>
        </div>
      </div>
    </div>
  );
};

// =============================================
// ROUTE TRANSITION WRAPPER
// =============================================

export const RouteTransitionWrapper: React.FC<{
  children: React.ReactNode;
  className?: string;
}> = ({ children, className }) => {
  const [isTransitioning, setIsTransitioning] = useState(false);
  const location = useLocation();

  useEffect(() => {
    setIsTransitioning(true);
    const timer = setTimeout(() => {
      setIsTransitioning(false);
    }, 300);

    return () => clearTimeout(timer);
  }, [location.pathname]);

  return (
    <div
      className={cn(
        'transition-all duration-300 ease-out',
        isTransitioning ? 'opacity-0 scale-95' : 'opacity-100 scale-100',
        className
      )}
    >
      {children}
    </div>
  );
};

// =============================================
// LOADING BOUNDARY
// =============================================

export const LoadingBoundary: React.FC<{
  children: React.ReactNode;
  fallback?: React.ReactNode;
  className?: string;
}> = ({ children, fallback, className }) => {
  const { isLoading } = usePageLoading();

  if (isLoading) {
    return (
      <div
        className={cn(
          'min-h-screen flex items-center justify-center',
          className
        )}
      >
        {fallback || (
          <div className='text-center space-y-4'>
            <ModernSpinner size='lg' variant='primary' />
            <p className='text-gray-600'>Loading...</p>
          </div>
        )}
      </div>
    );
  }

  return <>{children}</>;
};

// =============================================
// SUSPENSE FALLBACK
// =============================================

export const SuspenseFallback: React.FC<{
  message?: string;
  className?: string;
}> = ({ message = 'Loading component...', className }) => (
  <div className={cn('flex items-center justify-center p-8', className)}>
    <div className='text-center space-y-4'>
      <ModernSpinner size='md' variant='primary' />
      <p className='text-sm text-gray-600'>{message}</p>
    </div>
  </div>
);
