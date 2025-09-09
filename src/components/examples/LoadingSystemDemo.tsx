import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import {
  useGlobalLoading,
  usePageLoading,
  useDataLoading,
  ModernSpinner,
  DotsSpinner,
  RingSpinner,
  LoadingOverlay,
  Skeleton,
  FeedSkeleton,
  ProfileSkeleton,
  DashboardSkeleton,
  DataLoadingState,
  InfiniteScrollLoading,
} from '@/components/ui/loading';

// =============================================
// LOADING SYSTEM DEMO COMPONENT
// =============================================

export const LoadingSystemDemo: React.FC = () => {
  const [showOverlay, setShowOverlay] = useState(false);
  const [showDataLoading, setShowDataLoading] = useState(false);
  const [data, setData] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [hasMore, setHasMore] = useState(true);

  const { setGlobalLoading } = useGlobalLoading();
  const { setPageLoading } = usePageLoading();
  const { setDataLoading } = useDataLoading();

  const handleGlobalLoading = () => {
    setGlobalLoading(true, 'Processing your request...');
    setTimeout(() => {
      setGlobalLoading(false);
    }, 3000);
  };

  const handlePageLoading = () => {
    setPageLoading(true, 'Navigating to new page...');
    setTimeout(() => {
      setPageLoading(false);
    }, 2000);
  };

  const handleDataLoading = () => {
    setDataLoading(true, 'Fetching data from server...');
    setTimeout(() => {
      setDataLoading(false);
    }, 2500);
  };

  const handleOverlayDemo = () => {
    setShowOverlay(true);
    setTimeout(() => {
      setShowOverlay(false);
    }, 3000);
  };

  const handleDataStateDemo = () => {
    setShowDataLoading(true);
    setLoading(true);
    setError(null);
    setData([]);

    setTimeout(() => {
      setLoading(false);
      setShowDataLoading(false);
      // Simulate success
      setData([
        { id: 1, title: 'Sample Post 1', content: 'This is a sample post' },
        {
          id: 2,
          title: 'Sample Post 2',
          content: 'This is another sample post',
        },
      ]);
    }, 2000);
  };

  const handleErrorDemo = () => {
    setLoading(true);
    setError(null);
    setData([]);

    setTimeout(() => {
      setLoading(false);
      setError('Failed to load data. Please try again.');
    }, 1500);
  };

  const handleEmptyDemo = () => {
    setLoading(true);
    setError(null);
    setData([]);

    setTimeout(() => {
      setLoading(false);
      setData([]);
    }, 1000);
  };

  return (
    <div className='max-w-6xl mx-auto p-6 space-y-8'>
      <div className='text-center'>
        <h1 className='text-3xl font-bold text-gray-900 mb-4'>
          🎨 Modern Loading System Demo
        </h1>
        <p className='text-gray-600'>
          Explore the comprehensive loading system with modern components and
          smooth animations
        </p>
      </div>

      {/* Spinners Section */}
      <Card>
        <CardHeader>
          <CardTitle>🔄 Modern Spinners</CardTitle>
        </CardHeader>
        <CardContent>
          <div className='grid grid-cols-2 md:grid-cols-4 gap-6'>
            <div className='text-center space-y-2'>
              <ModernSpinner size='lg' variant='primary' />
              <p className='text-sm text-gray-600'>Modern Spinner</p>
            </div>
            <div className='text-center space-y-2'>
              <DotsSpinner size='lg' variant='primary' />
              <p className='text-sm text-gray-600'>Dots Spinner</p>
            </div>
            <div className='text-center space-y-2'>
              <RingSpinner size='lg' variant='primary' />
              <p className='text-sm text-gray-600'>Ring Spinner</p>
            </div>
            <div className='text-center space-y-2'>
              <ModernSpinner size='lg' variant='success' />
              <p className='text-sm text-gray-600'>Success Variant</p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Loading Controls */}
      <Card>
        <CardHeader>
          <CardTitle>🎮 Loading Controls</CardTitle>
        </CardHeader>
        <CardContent>
          <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4'>
            <Button onClick={handleGlobalLoading} className='w-full'>
              Global Loading
            </Button>
            <Button
              onClick={handlePageLoading}
              variant='outline'
              className='w-full'
            >
              Page Loading
            </Button>
            <Button
              onClick={handleDataLoading}
              variant='secondary'
              className='w-full'
            >
              Data Loading
            </Button>
            <Button
              onClick={handleOverlayDemo}
              variant='destructive'
              className='w-full'
            >
              Show Overlay
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Skeleton Loaders */}
      <Card>
        <CardHeader>
          <CardTitle>💀 Skeleton Loaders</CardTitle>
        </CardHeader>
        <CardContent>
          <div className='space-y-6'>
            <div>
              <h3 className='text-lg font-semibold mb-3'>Feed Skeleton</h3>
              <FeedSkeleton count={2} />
            </div>
            <div>
              <h3 className='text-lg font-semibold mb-3'>Profile Skeleton</h3>
              <ProfileSkeleton />
            </div>
            <div>
              <h3 className='text-lg font-semibold mb-3'>Dashboard Skeleton</h3>
              <DashboardSkeleton />
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Data Loading States */}
      <Card>
        <CardHeader>
          <CardTitle>📊 Data Loading States</CardTitle>
        </CardHeader>
        <CardContent>
          <div className='space-y-4'>
            <div className='flex flex-wrap gap-2'>
              <Button onClick={handleDataStateDemo} size='sm'>
                Load Data
              </Button>
              <Button onClick={handleErrorDemo} variant='outline' size='sm'>
                Show Error
              </Button>
              <Button onClick={handleEmptyDemo} variant='secondary' size='sm'>
                Show Empty
              </Button>
            </div>

            <DataLoadingState
              loading={loading}
              error={error}
              empty={!loading && data.length === 0 && !error}
              onRetry={handleDataStateDemo}
            >
              <div className='space-y-3'>
                {data.map((item) => (
                  <div key={item.id} className='p-4 border rounded-lg'>
                    <h4 className='font-semibold'>{item.title}</h4>
                    <p className='text-gray-600'>{item.content}</p>
                  </div>
                ))}
              </div>
            </DataLoadingState>

            <InfiniteScrollLoading hasMore={hasMore} loading={false} />
          </div>
        </CardContent>
      </Card>

      {/* Usage Examples */}
      <Card>
        <CardHeader>
          <CardTitle>📚 Usage Examples</CardTitle>
        </CardHeader>
        <CardContent>
          <div className='space-y-4'>
            <div>
              <h3 className='font-semibold mb-2'>Global Loading</h3>
              <pre className='bg-gray-100 p-3 rounded text-sm overflow-x-auto'>
                {`const { setGlobalLoading } = useGlobalLoading();
setGlobalLoading(true, 'Processing...');
// ... do work
setGlobalLoading(false);`}
              </pre>
            </div>
            <div>
              <h3 className='font-semibold mb-2'>Data Loading State</h3>
              <pre className='bg-gray-100 p-3 rounded text-sm overflow-x-auto'>
                {`<DataLoadingState
  loading={loading}
  error={error}
  empty={data.length === 0}
  onRetry={handleRetry}
>
  {data.map(item => <Item key={item.id} {...item} />)}
</DataLoadingState>`}
              </pre>
            </div>
            <div>
              <h3 className='font-semibold mb-2'>Skeleton Loading</h3>
              <pre className='bg-gray-100 p-3 rounded text-sm overflow-x-auto'>
                {`<FeedSkeleton count={3} />
<ProfileSkeleton />
<DashboardSkeleton />`}
              </pre>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Loading Overlay */}
      <LoadingOverlay
        isVisible={showOverlay}
        message='Processing your request...'
        variant='blur'
        size='md'
        type='dots'
        showProgress={true}
        progress={75}
      />
    </div>
  );
};
