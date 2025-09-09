import React from 'react';
import { useGlobalLoading } from '@/contexts/LoadingContext';
import { LoadingOverlay } from './LoadingOverlay';

// =============================================
// GLOBAL LOADING OVERLAY
// =============================================

export const GlobalLoadingOverlay: React.FC = () => {
  const { isLoading, message } = useGlobalLoading();

  return (
    <LoadingOverlay
      isVisible={isLoading}
      message={message || 'Loading...'}
      variant='blur'
      size='md'
      type='spinner'
    />
  );
};
