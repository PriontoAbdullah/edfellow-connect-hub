import React from 'react';
import { cn } from '@/lib/utils';
import { ModernSpinner, DotsSpinner } from './ModernSpinner';
import { X, AlertCircle, CheckCircle, Info } from 'lucide-react';

// =============================================
// TYPES
// =============================================

export type LoadingOverlayVariant = 'default' | 'blur' | 'dark' | 'light';
export type LoadingOverlaySize = 'sm' | 'md' | 'lg' | 'xl';
export type LoadingOverlayType = 'spinner' | 'dots' | 'pulse' | 'ring';

export interface LoadingOverlayProps {
  isVisible: boolean;
  message?: string;
  variant?: LoadingOverlayVariant;
  size?: LoadingOverlaySize;
  type?: LoadingOverlayType;
  className?: string;
  onClose?: () => void;
  showCloseButton?: boolean;
  children?: React.ReactNode;
  icon?: React.ReactNode;
  progress?: number;
  showProgress?: boolean;
}

// =============================================
// COMPONENT
// =============================================

export const LoadingOverlay: React.FC<LoadingOverlayProps> = ({
  isVisible,
  message = 'Loading...',
  variant = 'default',
  size = 'md',
  type = 'spinner',
  className,
  onClose,
  showCloseButton = false,
  children,
  icon,
  progress,
  showProgress = false,
}) => {
  if (!isVisible) return null;

  const variantClasses = {
    default: 'bg-white/80 backdrop-blur-sm',
    blur: 'bg-white/60 backdrop-blur-md',
    dark: 'bg-gray-900/80 backdrop-blur-sm',
    light: 'bg-white/95 backdrop-blur-sm',
  };

  const sizeClasses = {
    sm: 'p-4',
    md: 'p-6',
    lg: 'p-8',
    xl: 'p-12',
  };

  const renderSpinner = () => {
    const spinnerProps = {
      size:
        size === 'sm'
          ? 'sm'
          : size === 'lg'
          ? 'lg'
          : size === 'xl'
          ? 'xl'
          : 'md',
      variant: variant === 'dark' ? 'default' : 'primary',
    };

    switch (type) {
      case 'dots':
        return <DotsSpinner {...spinnerProps} />;
      case 'pulse':
        return <ModernSpinner {...spinnerProps} />;
      case 'ring':
        return <ModernSpinner {...spinnerProps} />;
      default:
        return <ModernSpinner {...spinnerProps} />;
    }
  };

  return (
    <div
      className={cn(
        'fixed inset-0 z-50 flex items-center justify-center',
        variantClasses[variant],
        className
      )}
    >
      <div
        className={cn(
          'relative bg-white rounded-2xl shadow-2xl border border-gray-200/50',
          sizeClasses[size],
          'min-w-[280px] max-w-md mx-4'
        )}
      >
        {/* Close Button */}
        {showCloseButton && onClose && (
          <button
            onClick={onClose}
            className='absolute top-4 right-4 p-1 rounded-full hover:bg-gray-100 transition-colors'
            aria-label='Close'
          >
            <X className='w-4 h-4 text-gray-500' />
          </button>
        )}

        {/* Content */}
        <div className='flex flex-col items-center text-center space-y-4'>
          {/* Icon or Spinner */}
          <div className='flex items-center justify-center'>
            {icon ? (
              <div className='flex items-center justify-center w-12 h-12 rounded-full bg-blue-100 text-blue-600'>
                {icon}
              </div>
            ) : (
              renderSpinner()
            )}
          </div>

          {/* Message */}
          {message && (
            <div className='space-y-2'>
              <h3 className='text-lg font-semibold text-gray-900'>{message}</h3>
              {children && (
                <div className='text-sm text-gray-600'>{children}</div>
              )}
            </div>
          )}

          {/* Progress Bar */}
          {showProgress && progress !== undefined && (
            <div className='w-full space-y-2'>
              <div className='flex justify-between text-sm text-gray-600'>
                <span>Progress</span>
                <span>{Math.round(progress)}%</span>
              </div>
              <div className='w-full bg-gray-200 rounded-full h-2'>
                <div
                  className='bg-blue-600 h-2 rounded-full transition-all duration-300 ease-out'
                  style={{ width: `${progress}%` }}
                />
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

// =============================================
// SPECIALIZED OVERLAYS
// =============================================

export const AuthLoadingOverlay: React.FC<{
  isVisible: boolean;
  message?: string;
}> = ({ isVisible, message = 'Authenticating...' }) => (
  <div
    className={cn(
      'fixed inset-0 z-50 flex items-center justify-center bg-white/95 backdrop-blur-sm transition-opacity duration-300 ease-out',
      isVisible ? 'opacity-100' : 'opacity-0 pointer-events-none'
    )}
  >
    <div className='text-center space-y-6 max-w-md mx-4'>
      {/* EdFellow Logo */}
      <div className='flex justify-center'>
        <div className='w-20 h-20 rounded-full bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center shadow-lg'>
          <img
            src='/logo.png'
            alt='EdFellow'
            className='w-12 h-12 rounded-full'
          />
        </div>
      </div>

      {/* Spinner */}
      <div className='flex justify-center'>
        <div className='w-8 h-8 border-2 border-gray-200 border-t-blue-600 rounded-full animate-spin' />
      </div>

      {/* Message */}
      <div className='space-y-2'>
        <h3 className='text-xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent'>
          EdFellow Connect Hub
        </h3>
        <p className='text-gray-600'>{message}</p>
      </div>

      {/* Loading Tips */}
      <div className='text-xs text-gray-400 space-y-1'>
        <p>🔐 Securing your connection...</p>
        <p>📚 Preparing your academic network</p>
      </div>
    </div>
  </div>
);

export const DataLoadingOverlay: React.FC<{
  isVisible: boolean;
  message?: string;
  progress?: number;
}> = ({ isVisible, message = 'Loading data...', progress }) => (
  <LoadingOverlay
    isVisible={isVisible}
    message={message}
    variant='light'
    size='md'
    type='dots'
    showProgress={progress !== undefined}
    progress={progress}
  />
);

export const UploadLoadingOverlay: React.FC<{
  isVisible: boolean;
  message?: string;
  progress?: number;
  onCancel?: () => void;
}> = ({ isVisible, message = 'Uploading...', progress, onCancel }) => (
  <LoadingOverlay
    isVisible={isVisible}
    message={message}
    variant='blur'
    size='lg'
    type='ring'
    showProgress={true}
    progress={progress}
    showCloseButton={!!onCancel}
    onClose={onCancel}
    icon={<Info className='w-6 h-6' />}
  >
    <p className='text-sm text-gray-500'>
      Please don't close this window while uploading.
    </p>
  </LoadingOverlay>
);

export const ErrorOverlay: React.FC<{
  isVisible: boolean;
  title?: string;
  message?: string;
  onClose?: () => void;
}> = ({ isVisible, title = 'Something went wrong', message, onClose }) => (
  <LoadingOverlay
    isVisible={isVisible}
    message={title}
    variant='light'
    size='md'
    showCloseButton={!!onClose}
    onClose={onClose}
    icon={<AlertCircle className='w-6 h-6 text-red-600' />}
  >
    {message && <p className='text-sm text-gray-600'>{message}</p>}
  </LoadingOverlay>
);
