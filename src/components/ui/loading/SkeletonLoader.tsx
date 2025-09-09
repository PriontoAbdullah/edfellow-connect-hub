import React from 'react';
import { cn } from '@/lib/utils';

// =============================================
// TYPES
// =============================================

export interface SkeletonProps {
  className?: string;
  width?: string | number;
  height?: string | number;
  rounded?: boolean | 'sm' | 'md' | 'lg' | 'xl' | 'full';
  animate?: boolean;
}

// =============================================
// BASE SKELETON COMPONENT
// =============================================

export const Skeleton: React.FC<SkeletonProps> = ({
  className,
  width,
  height,
  rounded = false,
  animate = true,
}) => {
  const roundedClasses = {
    true: 'rounded',
    sm: 'rounded-sm',
    md: 'rounded-md',
    lg: 'rounded-lg',
    xl: 'rounded-xl',
    full: 'rounded-full',
    false: '',
  };

  return (
    <div
      className={cn(
        'bg-gray-200',
        roundedClasses[rounded],
        animate && 'animate-pulse',
        className
      )}
      style={{
        width: width || '100%',
        height: height || '1rem',
      }}
    />
  );
};

// =============================================
// PRESET SKELETON COMPONENTS
// =============================================

export const AvatarSkeleton: React.FC<{ size?: 'sm' | 'md' | 'lg' | 'xl' }> = ({
  size = 'md',
}) => {
  const sizeClasses = {
    sm: 'w-8 h-8',
    md: 'w-10 h-10',
    lg: 'w-12 h-12',
    xl: 'w-16 h-16',
  };

  return <Skeleton className={sizeClasses[size]} rounded='full' />;
};

export const TextSkeleton: React.FC<{
  lines?: number;
  className?: string;
  lastLineWidth?: string;
}> = ({ lines = 1, className, lastLineWidth = '75%' }) => (
  <div className={cn('space-y-2', className)}>
    {Array.from({ length: lines }).map((_, index) => (
      <Skeleton
        key={index}
        height='1rem'
        width={index === lines - 1 ? lastLineWidth : '100%'}
        rounded='sm'
      />
    ))}
  </div>
);

export const CardSkeleton: React.FC<{ className?: string }> = ({
  className,
}) => (
  <div className={cn('p-6 border border-gray-200 rounded-lg', className)}>
    <div className='flex items-center space-x-4 mb-4'>
      <AvatarSkeleton size='md' />
      <div className='flex-1 space-y-2'>
        <Skeleton height='1rem' width='60%' rounded='sm' />
        <Skeleton height='0.75rem' width='40%' rounded='sm' />
      </div>
    </div>
    <TextSkeleton lines={3} className='mb-4' />
    <div className='flex space-x-2'>
      <Skeleton height='2rem' width='4rem' rounded='md' />
      <Skeleton height='2rem' width='4rem' rounded='md' />
    </div>
  </div>
);

export const PostSkeleton: React.FC<{ className?: string }> = ({
  className,
}) => (
  <div className={cn('p-6 border border-gray-200 rounded-lg', className)}>
    {/* Header */}
    <div className='flex items-center space-x-3 mb-4'>
      <AvatarSkeleton size='md' />
      <div className='flex-1 space-y-1'>
        <Skeleton height='1rem' width='30%' rounded='sm' />
        <Skeleton height='0.75rem' width='20%' rounded='sm' />
      </div>
    </div>

    {/* Content */}
    <div className='space-y-3 mb-4'>
      <Skeleton height='1rem' width='100%' rounded='sm' />
      <Skeleton height='1rem' width='95%' rounded='sm' />
      <Skeleton height='1rem' width='80%' rounded='sm' />
    </div>

    {/* Media placeholder */}
    <Skeleton height='200px' width='100%' rounded='lg' className='mb-4' />

    {/* Actions */}
    <div className='flex items-center justify-between'>
      <div className='flex space-x-4'>
        <Skeleton height='1.5rem' width='3rem' rounded='md' />
        <Skeleton height='1.5rem' width='3rem' rounded='md' />
        <Skeleton height='1.5rem' width='3rem' rounded='md' />
      </div>
      <Skeleton height='1.5rem' width='2rem' rounded='md' />
    </div>
  </div>
);

export const FeedSkeleton: React.FC<{ count?: number; className?: string }> = ({
  count = 3,
  className,
}) => (
  <div className={cn('space-y-6', className)}>
    {Array.from({ length: count }).map((_, index) => (
      <PostSkeleton key={index} />
    ))}
  </div>
);

export const ProfileSkeleton: React.FC<{ className?: string }> = ({
  className,
}) => (
  <div className={cn('space-y-6', className)}>
    {/* Profile Header */}
    <div className='text-center space-y-4'>
      <AvatarSkeleton size='xl' className='mx-auto' />
      <div className='space-y-2'>
        <Skeleton
          height='1.5rem'
          width='40%'
          className='mx-auto'
          rounded='sm'
        />
        <Skeleton height='1rem' width='60%' className='mx-auto' rounded='sm' />
        <Skeleton height='1rem' width='30%' className='mx-auto' rounded='sm' />
      </div>
    </div>

    {/* Stats */}
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

    {/* Content Sections */}
    <div className='space-y-4'>
      <Skeleton height='1.25rem' width='25%' rounded='sm' />
      <TextSkeleton lines={4} />
    </div>

    <div className='space-y-4'>
      <Skeleton height='1.25rem' width='30%' rounded='sm' />
      <div className='grid grid-cols-2 gap-2'>
        {Array.from({ length: 6 }).map((_, index) => (
          <Skeleton key={index} height='2rem' width='100%' rounded='md' />
        ))}
      </div>
    </div>
  </div>
);

export const DashboardSkeleton: React.FC<{ className?: string }> = ({
  className,
}) => (
  <div className={cn('space-y-6', className)}>
    {/* Header */}
    <div className='flex items-center justify-between'>
      <div className='space-y-2'>
        <Skeleton height='2rem' width='40%' rounded='sm' />
        <Skeleton height='1rem' width='60%' rounded='sm' />
      </div>
      <Skeleton height='2.5rem' width='8rem' rounded='md' />
    </div>

    {/* Stats Grid */}
    <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4'>
      {Array.from({ length: 4 }).map((_, index) => (
        <div
          key={index}
          className='p-4 border border-gray-200 rounded-lg space-y-2'
        >
          <Skeleton height='1rem' width='50%' rounded='sm' />
          <Skeleton height='1.5rem' width='30%' rounded='sm' />
          <Skeleton height='0.75rem' width='40%' rounded='sm' />
        </div>
      ))}
    </div>

    {/* Content Grid */}
    <div className='grid grid-cols-1 lg:grid-cols-3 gap-6'>
      <div className='lg:col-span-2 space-y-4'>
        <Skeleton height='1.5rem' width='30%' rounded='sm' />
        <FeedSkeleton count={2} />
      </div>
      <div className='space-y-4'>
        <Skeleton height='1.5rem' width='40%' rounded='sm' />
        <CardSkeleton />
        <CardSkeleton />
      </div>
    </div>
  </div>
);

export const TableSkeleton: React.FC<{
  rows?: number;
  columns?: number;
  className?: string;
}> = ({ rows = 5, columns = 4, className }) => (
  <div className={cn('space-y-3', className)}>
    {/* Header */}
    <div
      className='grid gap-4'
      style={{ gridTemplateColumns: `repeat(${columns}, 1fr)` }}
    >
      {Array.from({ length: columns }).map((_, index) => (
        <Skeleton key={index} height='1rem' width='80%' rounded='sm' />
      ))}
    </div>

    {/* Rows */}
    {Array.from({ length: rows }).map((_, rowIndex) => (
      <div
        key={rowIndex}
        className='grid gap-4'
        style={{ gridTemplateColumns: `repeat(${columns}, 1fr)` }}
      >
        {Array.from({ length: columns }).map((_, colIndex) => (
          <Skeleton key={colIndex} height='1rem' width='90%' rounded='sm' />
        ))}
      </div>
    ))}
  </div>
);
