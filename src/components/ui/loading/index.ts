// =============================================
// LOADING COMPONENTS EXPORTS
// =============================================

// Context
export {
  LoadingProvider,
  useLoading,
  useGlobalLoading,
  usePageLoading,
  useDataLoading,
} from '@/contexts/LoadingContext';
export type {
  LoadingType,
  LoadingContextType,
} from '@/contexts/LoadingContext';

// Spinners
export {
  ModernSpinner,
  PulseSpinner,
  DotsSpinner,
  RingSpinner,
} from './ModernSpinner';
export type { ModernSpinnerProps } from './ModernSpinner';

// Overlays
export {
  LoadingOverlay,
  AuthLoadingOverlay,
  DataLoadingOverlay,
  UploadLoadingOverlay,
  ErrorOverlay,
} from './LoadingOverlay';
export type {
  LoadingOverlayProps,
  LoadingOverlayVariant,
  LoadingOverlaySize,
  LoadingOverlayType,
} from './LoadingOverlay';

// Skeletons
export {
  Skeleton,
  AvatarSkeleton,
  TextSkeleton,
  CardSkeleton,
  PostSkeleton,
  FeedSkeleton,
  ProfileSkeleton,
  DashboardSkeleton,
  TableSkeleton,
} from './SkeletonLoader';
export type { SkeletonProps } from './SkeletonLoader';

// Page Transitions
export {
  PageTransitionLoader,
  RouteTransitionWrapper,
  LoadingBoundary,
  SuspenseFallback,
} from './PageTransitionLoader';
export type { PageTransitionLoaderProps } from './PageTransitionLoader';

// Global Loading
export { GlobalLoadingOverlay } from './GlobalLoadingOverlay';

// Data Loading States
export {
  DataLoadingState,
  FeedLoadingState,
  ProfileLoadingState,
  ConnectionStatus,
  LoadingCard,
  InfiniteScrollLoading,
} from './DataLoadingStates';
export type { DataLoadingStateProps } from './DataLoadingStates';
