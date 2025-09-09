# 🎨 Modern Loading System

A comprehensive, modern loading system for the EdFellow Connect Hub application with beautiful animations, skeleton loaders, and smooth transitions.

## ✨ Features

- **Global Loading Context**: Centralized loading state management
- **Modern Spinners**: Multiple spinner variants with smooth animations
- **Skeleton Loaders**: Realistic content placeholders
- **Loading Overlays**: Full-screen loading experiences
- **Page Transitions**: Smooth route transitions
- **Data Loading States**: Comprehensive error, loading, and empty states
- **Infinite Scroll**: Built-in infinite scroll loading
- **Connection Status**: Network connectivity indicators
- **TypeScript Support**: Full type safety

## 🚀 Quick Start

### 1. Setup

The loading system is already integrated into your app. The `LoadingProvider` wraps your entire application in `App.tsx`.

### 2. Basic Usage

```tsx
import {
  useGlobalLoading,
  ModernSpinner,
  DataLoadingState,
} from '@/components/ui/loading';

function MyComponent() {
  const { setGlobalLoading } = useGlobalLoading();

  const handleAction = async () => {
    setGlobalLoading(true, 'Processing...');
    // ... do work
    setGlobalLoading(false);
  };

  return (
    <div>
      <ModernSpinner size='md' variant='primary' />
      <DataLoadingState loading={loading} error={error} empty={empty}>
        {/* Your content */}
      </DataLoadingState>
    </div>
  );
}
```

## 📚 Components

### Context & Hooks

#### `LoadingProvider`

Provides loading context to the entire application.

```tsx
<LoadingProvider>
  <App />
</LoadingProvider>
```

#### `useLoading()`

Main hook for loading state management.

```tsx
const { setLoading, setGlobalLoading, setPageLoading, isLoading, getMessage } =
  useLoading();
```

#### `useGlobalLoading()`

Convenience hook for global loading.

```tsx
const { setGlobalLoading, isLoading, message } = useGlobalLoading();
```

#### `usePageLoading()`

Convenience hook for page loading.

```tsx
const { setPageLoading, isLoading, message } = usePageLoading();
```

#### `useDataLoading()`

Convenience hook for data loading.

```tsx
const { setDataLoading, isLoading, message } = useDataLoading();
```

### Spinners

#### `ModernSpinner`

Standard spinner with multiple variants.

```tsx
<ModernSpinner
  size='md' // 'sm' | 'md' | 'lg' | 'xl'
  variant='primary' // 'default' | 'primary' | 'secondary' | 'success' | 'warning' | 'error'
  className='...'
  label='Loading...'
/>
```

#### `DotsSpinner`

Animated dots spinner.

```tsx
<DotsSpinner size='lg' variant='primary' />
```

#### `RingSpinner`

Ring-style spinner.

```tsx
<RingSpinner size='md' variant='success' />
```

#### `PulseSpinner`

Pulsing circle spinner.

```tsx
<PulseSpinner size='lg' variant='primary' />
```

### Overlays

#### `LoadingOverlay`

Full-screen loading overlay.

```tsx
<LoadingOverlay
  isVisible={loading}
  message='Loading...'
  variant='blur' // 'default' | 'blur' | 'dark' | 'light'
  size='md' // 'sm' | 'md' | 'lg' | 'xl'
  type='spinner' // 'spinner' | 'dots' | 'pulse' | 'ring'
  showProgress={true}
  progress={75}
  onClose={handleClose}
/>
```

#### Specialized Overlays

```tsx
<AuthLoadingOverlay isVisible={loading} message="Authenticating..." />
<DataLoadingOverlay isVisible={loading} message="Loading data..." progress={50} />
<UploadLoadingOverlay isVisible={uploading} progress={75} onCancel={handleCancel} />
<ErrorOverlay isVisible={hasError} title="Error" message="Something went wrong" />
```

### Skeleton Loaders

#### `Skeleton`

Base skeleton component.

```tsx
<Skeleton width='100%' height='1rem' rounded='md' animate={true} />
```

#### Preset Skeletons

```tsx
<AvatarSkeleton size="md" />
<TextSkeleton lines={3} lastLineWidth="75%" />
<CardSkeleton />
<PostSkeleton />
<FeedSkeleton count={3} />
<ProfileSkeleton />
<DashboardSkeleton />
<TableSkeleton rows={5} columns={4} />
```

### Page Transitions

#### `PageTransitionLoader`

Automatic page transition loader.

```tsx
<PageTransitionLoader
  variant='fade' // 'slide' | 'fade' | 'scale' | 'blur'
  duration={300}
  showProgress={true}
  message='Loading page...'
/>
```

#### `RouteTransitionWrapper`

Wraps route content with transitions.

```tsx
<RouteTransitionWrapper>
  <YourPageContent />
</RouteTransitionWrapper>
```

#### `LoadingBoundary`

Boundary component for loading states.

```tsx
<LoadingBoundary fallback={<CustomFallback />}>
  <YourContent />
</LoadingBoundary>
```

### Data Loading States

#### `DataLoadingState`

Comprehensive data loading component.

```tsx
<DataLoadingState
  loading={loading}
  error={error}
  empty={data.length === 0}
  emptyMessage='No data available'
  onRetry={handleRetry}
  showSkeleton={true}
  skeletonCount={3}
>
  {data.map((item) => (
    <Item key={item.id} {...item} />
  ))}
</DataLoadingState>
```

#### Specialized Data States

```tsx
<FeedLoadingState loading={loading} error={error} empty={empty} onRetry={handleRetry}>
  {posts.map(post => <Post key={post.id} {...post} />)}
</FeedLoadingState>

<ProfileLoadingState loading={loading} error={error} onRetry={handleRetry}>
  <ProfileContent />
</ProfileLoadingState>
```

#### `InfiniteScrollLoading`

Infinite scroll loading indicator.

```tsx
<InfiniteScrollLoading hasMore={hasMore} loading={loading} />
```

### Utility Components

#### `ConnectionStatus`

Network connectivity indicator.

```tsx
<ConnectionStatus isOnline={navigator.onLine} />
```

#### `LoadingCard`

Loading card placeholder.

```tsx
<LoadingCard title='Loading...' description='Please wait'>
  <Skeleton height='100px' />
</LoadingCard>
```

## 🎯 Common Patterns

### 1. Global Loading

```tsx
function MyComponent() {
  const { setGlobalLoading } = useGlobalLoading();

  const handleSubmit = async () => {
    setGlobalLoading(true, 'Saving your changes...');
    try {
      await saveData();
    } finally {
      setGlobalLoading(false);
    }
  };
}
```

### 2. Data Fetching

```tsx
function DataComponent() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  return (
    <DataLoadingState
      loading={loading}
      error={error}
      empty={data.length === 0}
      onRetry={fetchData}
    >
      {data.map((item) => (
        <Item key={item.id} {...item} />
      ))}
    </DataLoadingState>
  );
}
```

### 3. Page Navigation

```tsx
function NavigationComponent() {
  const { setPageLoading } = usePageLoading();
  const navigate = useNavigate();

  const handleNavigate = (path) => {
    setPageLoading(true, 'Loading page...');
    navigate(path);
  };
}
```

### 4. File Upload

```tsx
function UploadComponent() {
  const [uploading, setUploading] = useState(false);
  const [progress, setProgress] = useState(0);

  return (
    <UploadLoadingOverlay
      isVisible={uploading}
      progress={progress}
      onCancel={() => setUploading(false)}
    />
  );
}
```

### 5. Feed with Infinite Scroll

```tsx
function FeedComponent() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);

  return (
    <FeedLoadingState
      loading={loading}
      error={error}
      empty={posts.length === 0}
    >
      {posts.map((post) => (
        <Post key={post.id} {...post} />
      ))}
      <InfiniteScrollLoading hasMore={hasMore} loading={loading} />
    </FeedLoadingState>
  );
}
```

## 🎨 Customization

### Custom Spinner

```tsx
const CustomSpinner = () => (
  <div className='animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600' />
);
```

### Custom Skeleton

```tsx
const CustomSkeleton = () => (
  <div className='animate-pulse'>
    <div className='h-4 bg-gray-200 rounded w-3/4 mb-2'></div>
    <div className='h-4 bg-gray-200 rounded w-1/2'></div>
  </div>
);
```

### Custom Loading State

```tsx
const CustomLoadingState = ({ loading, children }) => {
  if (loading) {
    return (
      <div className='flex items-center justify-center py-12'>
        <ModernSpinner size='lg' />
        <span className='ml-2'>Loading...</span>
      </div>
    );
  }
  return children;
};
```

## 🔧 Configuration

### Loading Types

```tsx
type LoadingType =
  | 'global'
  | 'page'
  | 'data'
  | 'auth'
  | 'feed'
  | 'upload'
  | 'profile'
  | 'search'
  | 'custom';
```

### Spinner Variants

```tsx
type SpinnerVariant =
  | 'default'
  | 'primary'
  | 'secondary'
  | 'success'
  | 'warning'
  | 'error';
```

### Overlay Variants

```tsx
type OverlayVariant = 'default' | 'blur' | 'dark' | 'light';
```

## 🚀 Best Practices

1. **Use appropriate loading types**: Use `global` for app-wide operations, `page` for navigation, `data` for API calls.

2. **Provide meaningful messages**: Always include descriptive loading messages.

3. **Handle all states**: Always handle loading, error, and empty states.

4. **Use skeletons for content**: Use skeleton loaders for better perceived performance.

5. **Implement retry mechanisms**: Provide retry options for failed operations.

6. **Show progress when possible**: Use progress indicators for long-running operations.

7. **Keep loading times reasonable**: Optimize operations to minimize loading times.

8. **Test loading states**: Ensure all loading states work correctly across different scenarios.

## 🎭 Demo

Check out the `LoadingSystemDemo` component to see all loading components in action:

```tsx
import { LoadingSystemDemo } from '@/components/examples/LoadingSystemDemo';

// Add to your routes for testing
<Route path='/loading-demo' element={<LoadingSystemDemo />} />;
```

## 📝 Migration Guide

### From Old Loading System

1. Replace `Loader2` imports with `ModernSpinner`
2. Replace manual loading states with `DataLoadingState`
3. Use `useGlobalLoading` instead of manual state management
4. Replace skeleton implementations with preset components

### Example Migration

```tsx
// Before
const [loading, setLoading] = useState(false);
if (loading) {
  return <Loader2 className='animate-spin' />;
}

// After
const { setDataLoading } = useDataLoading();
<DataLoadingState loading={loading}>{/* content */}</DataLoadingState>;
```

## 🤝 Contributing

When adding new loading components:

1. Follow the existing patterns
2. Add proper TypeScript types
3. Include accessibility attributes
4. Add to the demo component
5. Update this documentation

## 📄 License

This loading system is part of the EdFellow Connect Hub project.
