import React from 'react';
import { cn } from '@/lib/utils';
import {
  Skeleton,
  TextSkeleton,
  AvatarSkeleton,
  CardSkeleton,
} from './SkeletonLoader';
import { ModernSpinner } from './ModernSpinner';
import { AlertCircle, RefreshCw, Wifi, WifiOff } from 'lucide-react';

// =============================================
// TYPES
// =============================================

export interface DataLoadingStateProps {
  loading?: boolean;
  error?: string | null;
  empty?: boolean;
  emptyMessage?: string;
  emptyIcon?: React.ReactNode;
  onRetry?: () => void;
  className?: string;
  children?: React.ReactNode;
  showSkeleton?: boolean;
  skeletonCount?: number;
}

// =============================================
// DATA LOADING STATE COMPONENT
// =============================================

export const DataLoadingState: React.FC<DataLoadingStateProps> = ({
  loading = false,
  error = null,
  empty = false,
  emptyMessage = 'No data available',
  emptyIcon,
  onRetry,
  className,
  children,
  showSkeleton = true,
  skeletonCount = 3,
}) => {
  // Show loading state
  if (loading) {
    return (
      <div className={cn('space-y-4', className)}>
        {showSkeleton ? (
          Array.from({ length: skeletonCount }).map((_, index) => (
            <CardSkeleton key={index} />
          ))
        ) : (
          <div className='flex items-center justify-center py-12'>
            <div className='text-center space-y-4'>
              <ModernSpinner size='lg' variant='primary' />
              <p className='text-gray-600'>Loading data...</p>
            </div>
          </div>
        )}
      </div>
    );
  }

  // Show error state
  if (error) {
    return (
      <div className={cn('flex items-center justify-center py-12', className)}>
        <div className='text-center space-y-4 max-w-md'>
          <div className='flex justify-center'>
            <div className='w-16 h-16 rounded-full bg-red-100 flex items-center justify-center'>
              <AlertCircle className='w-8 h-8 text-red-600' />
            </div>
          </div>
          <div className='space-y-2'>
            <h3 className='text-lg font-semibold text-gray-900'>
              Something went wrong
            </h3>
            <p className='text-gray-600'>{error}</p>
          </div>
          {onRetry && (
            <button
              onClick={onRetry}
              className='inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors'
            >
              <RefreshCw className='w-4 h-4 mr-2' />
              Try Again
            </button>
          )}
        </div>
      </div>
    );
  }

  // Show empty state
  if (empty) {
    return (
      <div className={cn('flex items-center justify-center py-12', className)}>
        <div className='text-center space-y-4 max-w-md'>
          <div className='flex justify-center'>
            {emptyIcon || (
              <div className='w-16 h-16 rounded-full bg-gray-100 flex items-center justify-center'>
                <Wifi className='w-8 h-8 text-gray-400' />
              </div>
            )}
          </div>
          <div className='space-y-2'>
            <h3 className='text-lg font-semibold text-gray-900'>
              {emptyMessage}
            </h3>
            <p className='text-gray-600'>
              There's nothing to show here yet. Check back later!
            </p>
          </div>
        </div>
      </div>
    );
  }

  // Show content
  return <>{children}</>;
};

// =============================================
// FEED LOADING STATE
// =============================================

export const FeedLoadingState: React.FC<{
  loading?: boolean;
  error?: string | null;
  empty?: boolean;
  onRetry?: () => void;
  className?: string;
  children?: React.ReactNode;
}> = ({ loading, error, empty, onRetry, className, children }) => (
  <DataLoadingState
    loading={loading}
    error={error}
    empty={empty}
    emptyMessage='No posts yet'
    emptyIcon={<Wifi className='w-8 h-8 text-gray-400' />}
    onRetry={onRetry}
    className={className}
    showSkeleton={true}
    skeletonCount={3}
  >
    {children}
  </DataLoadingState>
);

// =============================================
// PROFILE LOADING STATE
// =============================================

export const ProfileLoadingState: React.FC<{
  loading?: boolean;
  error?: string | null;
  onRetry?: () => void;
  className?: string;
  children?: React.ReactNode;
}> = ({ loading, error, onRetry, className, children }) => (
  <DataLoadingState
    loading={loading}
    error={error}
    empty={false}
    onRetry={onRetry}
    className={className}
    showSkeleton={false}
  >
    {loading ? (
      <div className='space-y-6'>
        {/* Profile Header Skeleton */}
        <div className='text-center space-y-4'>
          <AvatarSkeleton size='xl' className='mx-auto' />
          <div className='space-y-2'>
            <Skeleton
              height='1.5rem'
              width='40%'
              className='mx-auto'
              rounded='sm'
            />
            <Skeleton
              height='1rem'
              width='60%'
              className='mx-auto'
              rounded='sm'
            />
            <Skeleton
              height='1rem'
              width='30%'
              className='mx-auto'
              rounded='sm'
            />
          </div>
        </div>

        {/* Stats Skeleton */}
        <div className='grid grid-cols-3 gap-4'>
          {Array.from({ length: 3 }).map((_, index) => (
            <div key={index} className='text-center space-y-1'>
              <Skeleton
                height='1.5rem'
                width='2rem'
                className='mx-auto'
                rounded='sm'
              />
              <Skeleton
                height='0.75rem'
                width='3rem'
                className='mx-auto'
                rounded='sm'
              />
            </div>
          ))}
        </div>

        {/* Content Sections Skeleton */}
        <div className='space-y-4'>
          <Skeleton height='1.25rem' width='25%' rounded='sm' />
          <TextSkeleton lines={4} />
        </div>
      </div>
    ) : (
      children
    )}
  </DataLoadingState>
);

// =============================================
// CONNECTION STATUS
// =============================================

export const ConnectionStatus: React.FC<{
  isOnline: boolean;
  className?: string;
}> = ({ isOnline, className }) => {
  if (isOnline) return null;

  return (
    <div className={cn('fixed top-4 right-4 z-50', className)}>
      <div className='bg-red-500 text-white px-4 py-2 rounded-lg shadow-lg flex items-center space-x-2'>
        <WifiOff className='w-4 h-4' />
        <span className='text-sm font-medium'>No internet connection</span>
      </div>
    </div>
  );
};

// =============================================
// LOADING CARD
// =============================================

export const LoadingCard: React.FC<{
  title?: string;
  description?: string;
  className?: string;
  children?: React.ReactNode;
}> = ({ title, description, className, children }) => (
  <div className={cn('p-6 border border-gray-200 rounded-lg', className)}>
    <div className='flex items-center space-x-4 mb-4'>
      <div className='w-12 h-12 rounded-full bg-gray-200 animate-pulse' />
      <div className='flex-1 space-y-2'>
        <Skeleton height='1rem' width='60%' rounded='sm' />
        <Skeleton height='0.75rem' width='40%' rounded='sm' />
      </div>
    </div>
    {children}
  </div>
);

// =============================================
// INFINITE SCROLL LOADING
// =============================================

export const InfiniteScrollLoading: React.FC<{
  hasMore: boolean;
  loading: boolean;
  className?: string;
}> = ({ hasMore, loading, className }) => {
  if (!hasMore) {
    return (
      <div className={cn('text-center py-8', className)}>
        <p className='text-gray-500 text-sm'>You've reached the end</p>
      </div>
    );
  }

  if (loading) {
    return (
      <div className={cn('flex items-center justify-center py-8', className)}>
        <div className='flex items-center space-x-2'>
          <ModernSpinner size='sm' variant='primary' />
          <span className='text-sm text-gray-600'>Loading more...</span>
        </div>
      </div>
    );
  }

  return null;
};
