import React from 'react';
import { cn } from '@/lib/utils';

// =============================================
// TYPES
// =============================================

export interface ModernSpinnerProps {
  size?: 'sm' | 'md' | 'lg' | 'xl';
  variant?:
    | 'default'
    | 'primary'
    | 'secondary'
    | 'success'
    | 'warning'
    | 'error';
  className?: string;
  label?: string;
}

// =============================================
// COMPONENT
// =============================================

export const ModernSpinner: React.FC<ModernSpinnerProps> = ({
  size = 'md',
  variant = 'default',
  className,
  label = 'Loading...',
}) => {
  const sizeClasses = {
    sm: 'w-4 h-4',
    md: 'w-6 h-6',
    lg: 'w-8 h-8',
    xl: 'w-12 h-12',
  };

  const variantClasses = {
    default: 'text-gray-600',
    primary: 'text-blue-600',
    secondary: 'text-gray-500',
    success: 'text-green-600',
    warning: 'text-yellow-600',
    error: 'text-red-600',
  };

  return (
    <div className={cn('flex items-center justify-center', className)}>
      <div
        className={cn(
          'animate-spin rounded-full border-2 border-gray-200',
          sizeClasses[size],
          variantClasses[variant]
        )}
        style={{
          borderTopColor: 'currentColor',
        }}
        role='status'
        aria-label={label}
      >
        <span className='sr-only'>{label}</span>
      </div>
    </div>
  );
};

// =============================================
// PULSE SPINNER VARIANT
// =============================================

export const PulseSpinner: React.FC<ModernSpinnerProps> = ({
  size = 'md',
  variant = 'default',
  className,
  label = 'Loading...',
}) => {
  const sizeClasses = {
    sm: 'w-4 h-4',
    md: 'w-6 h-6',
    lg: 'w-8 h-8',
    xl: 'w-12 h-12',
  };

  const variantClasses = {
    default: 'bg-gray-600',
    primary: 'bg-blue-600',
    secondary: 'bg-gray-500',
    success: 'bg-green-600',
    warning: 'bg-yellow-600',
    error: 'bg-red-600',
  };

  return (
    <div className={cn('flex items-center justify-center', className)}>
      <div
        className={cn(
          'rounded-full animate-pulse',
          sizeClasses[size],
          variantClasses[variant]
        )}
        role='status'
        aria-label={label}
      >
        <span className='sr-only'>{label}</span>
      </div>
    </div>
  );
};

// =============================================
// DOTS SPINNER VARIANT
// =============================================

export const DotsSpinner: React.FC<ModernSpinnerProps> = ({
  size = 'md',
  variant = 'default',
  className,
  label = 'Loading...',
}) => {
  const dotSizeClasses = {
    sm: 'w-1 h-1',
    md: 'w-2 h-2',
    lg: 'w-3 h-3',
    xl: 'w-4 h-4',
  };

  const variantClasses = {
    default: 'bg-gray-600',
    primary: 'bg-blue-600',
    secondary: 'bg-gray-500',
    success: 'bg-green-600',
    warning: 'bg-yellow-600',
    error: 'bg-red-600',
  };

  return (
    <div
      className={cn('flex items-center justify-center space-x-1', className)}
    >
      <div
        className={cn(
          'rounded-full animate-bounce',
          dotSizeClasses[size],
          variantClasses[variant]
        )}
        style={{ animationDelay: '0ms' }}
        role='status'
        aria-label={label}
      />
      <div
        className={cn(
          'rounded-full animate-bounce',
          dotSizeClasses[size],
          variantClasses[variant]
        )}
        style={{ animationDelay: '150ms' }}
      />
      <div
        className={cn(
          'rounded-full animate-bounce',
          dotSizeClasses[size],
          variantClasses[variant]
        )}
        style={{ animationDelay: '300ms' }}
      />
      <span className='sr-only'>{label}</span>
    </div>
  );
};

// =============================================
// RING SPINNER VARIANT
// =============================================

export const RingSpinner: React.FC<ModernSpinnerProps> = ({
  size = 'md',
  variant = 'default',
  className,
  label = 'Loading...',
}) => {
  const sizeClasses = {
    sm: 'w-4 h-4',
    md: 'w-6 h-6',
    lg: 'w-8 h-8',
    xl: 'w-12 h-12',
  };

  const variantClasses = {
    default: 'text-gray-600',
    primary: 'text-blue-600',
    secondary: 'text-gray-500',
    success: 'text-green-600',
    warning: 'text-yellow-600',
    error: 'text-red-600',
  };

  return (
    <div className={cn('flex items-center justify-center', className)}>
      <div
        className={cn(
          'animate-spin rounded-full border-2 border-transparent',
          sizeClasses[size],
          variantClasses[variant]
        )}
        style={{
          borderTopColor: 'currentColor',
          borderRightColor: 'currentColor',
        }}
        role='status'
        aria-label={label}
      >
        <span className='sr-only'>{label}</span>
      </div>
    </div>
  );
};
