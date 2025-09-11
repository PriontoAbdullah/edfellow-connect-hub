import { useState, useEffect, useCallback } from 'react';
import {
  getLandingPageData,
  getLandingPageStats,
  getFeaturedPrograms,
  getRecentPublicPosts,
  getTestimonials,
  getCommunityGroups,
  getCommunityUsers,
  getFeaturedProfessors,
  getOpportunities,
  subscribeToLandingPageStats,
  type LandingPageStats,
  type FeaturedProgram,
  type RecentPost,
  type Testimonial,
  type CommunityGroup,
  type CommunityUser,
  type FeaturedProfessor,
  type Opportunity,
} from '../lib/api/landing';

export interface LandingPageData {
  stats: LandingPageStats;
  featuredPrograms: FeaturedProgram[];
  recentPosts: RecentPost[];
  testimonials: Testimonial[];
  communityGroups: CommunityGroup[];
  communityUsers: CommunityUser[];
  featuredProfessors: FeaturedProfessor[];
  opportunities: Opportunity[];
}

export interface UseLandingPageReturn {
  // Data
  data: LandingPageData | null;

  // Loading states
  loading: boolean;
  statsLoading: boolean;
  programsLoading: boolean;
  postsLoading: boolean;
  testimonialsLoading: boolean;
  groupsLoading: boolean;
  usersLoading: boolean;
  professorsLoading: boolean;
  opportunitiesLoading: boolean;

  // Error states
  error: string | null;
  statsError: string | null;
  programsError: string | null;
  postsError: string | null;
  testimonialsError: string | null;
  groupsError: string | null;
  usersError: string | null;
  professorsError: string | null;
  opportunitiesError: string | null;

  // Actions
  refreshData: () => Promise<void>;
  refreshStats: () => Promise<void>;
  refreshPrograms: () => Promise<void>;
  refreshPosts: () => Promise<void>;
  refreshTestimonials: () => Promise<void>;
  refreshGroups: () => Promise<void>;
  refreshUsers: () => Promise<void>;
  refreshProfessors: () => Promise<void>;
  refreshOpportunities: () => Promise<void>;

  // Real-time
  isRealTimeEnabled: boolean;
  toggleRealTime: () => void;
}

export const useLandingPage = (): UseLandingPageReturn => {
  // Data state
  const [data, setData] = useState<LandingPageData | null>(null);

  // Loading states
  const [loading, setLoading] = useState(true);
  const [statsLoading, setStatsLoading] = useState(false);
  const [programsLoading, setProgramsLoading] = useState(false);
  const [postsLoading, setPostsLoading] = useState(false);
  const [testimonialsLoading, setTestimonialsLoading] = useState(false);
  const [groupsLoading, setGroupsLoading] = useState(false);
  const [usersLoading, setUsersLoading] = useState(false);
  const [professorsLoading, setProfessorsLoading] = useState(false);
  const [opportunitiesLoading, setOpportunitiesLoading] = useState(false);

  // Error states
  const [error, setError] = useState<string | null>(null);
  const [statsError, setStatsError] = useState<string | null>(null);
  const [programsError, setProgramsError] = useState<string | null>(null);
  const [postsError, setPostsError] = useState<string | null>(null);
  const [testimonialsError, setTestimonialsError] = useState<string | null>(
    null
  );
  const [groupsError, setGroupsError] = useState<string | null>(null);
  const [usersError, setUsersError] = useState<string | null>(null);
  const [professorsError, setProfessorsError] = useState<string | null>(null);
  const [opportunitiesError, setOpportunitiesError] = useState<string | null>(
    null
  );

  // Real-time state
  const [isRealTimeEnabled, setIsRealTimeEnabled] = useState(false);

  // Load all data
  const loadData = useCallback(async () => {
    setLoading(true);
    setError(null);

    try {
      // Fetch all data in parallel
      const [
        statsResult,
        programsResult,
        postsResult,
        testimonialsResult,
        groupsResult,
        usersResult,
        professorsResult,
        opportunitiesResult,
      ] = await Promise.all([
        getLandingPageStats(),
        getFeaturedPrograms(6),
        getRecentPublicPosts(8),
        getTestimonials(6),
        getCommunityGroups(6),
        getCommunityUsers(6),
        getFeaturedProfessors(6),
        getOpportunities(6),
      ]);

      // Check for errors
      if (statsResult.error) throw new Error(`Stats: ${statsResult.error}`);
      if (programsResult.error)
        throw new Error(`Programs: ${programsResult.error}`);
      if (postsResult.error) throw new Error(`Posts: ${postsResult.error}`);
      if (testimonialsResult.error)
        throw new Error(`Testimonials: ${testimonialsResult.error}`);
      if (groupsResult.error) throw new Error(`Groups: ${groupsResult.error}`);
      if (usersResult.error) throw new Error(`Users: ${usersResult.error}`);
      if (professorsResult.error)
        throw new Error(`Professors: ${professorsResult.error}`);
      if (opportunitiesResult.error)
        throw new Error(`Opportunities: ${opportunitiesResult.error}`);

      // Combine all data
      const combinedData: LandingPageData = {
        stats: statsResult.data!,
        featuredPrograms: programsResult.data!,
        recentPosts: postsResult.data!,
        testimonials: testimonialsResult.data!,
        communityGroups: groupsResult.data!,
        communityUsers: usersResult.data!,
        featuredProfessors: professorsResult.data!,
        opportunities: opportunitiesResult.data!,
      };

      setData(combinedData);
    } catch (err) {
      setError(
        err instanceof Error ? err.message : 'Failed to load landing page data'
      );
    } finally {
      setLoading(false);
    }
  }, []);

  // Load statistics
  const loadStats = useCallback(async () => {
    setStatsLoading(true);
    setStatsError(null);

    try {
      const result = await getLandingPageStats();

      if (result.error) {
        setStatsError(result.error);
      } else if (result.data && data) {
        setData((prev) => (prev ? { ...prev, stats: result.data! } : null));
      }
    } catch (err) {
      setStatsError(
        err instanceof Error ? err.message : 'Failed to load statistics'
      );
    } finally {
      setStatsLoading(false);
    }
  }, [data]);

  // Load featured programs
  const loadPrograms = useCallback(async () => {
    setProgramsLoading(true);
    setProgramsError(null);

    try {
      const result = await getFeaturedPrograms(6);

      if (result.error) {
        setProgramsError(result.error);
      } else if (result.data && data) {
        setData((prev) =>
          prev ? { ...prev, featuredPrograms: result.data! } : null
        );
      }
    } catch (err) {
      setProgramsError(
        err instanceof Error ? err.message : 'Failed to load featured programs'
      );
    } finally {
      setProgramsLoading(false);
    }
  }, [data]);

  // Load recent posts
  const loadPosts = useCallback(async () => {
    setPostsLoading(true);
    setPostsError(null);

    try {
      const result = await getRecentPublicPosts(8);

      if (result.error) {
        setPostsError(result.error);
      } else if (result.data && data) {
        setData((prev) =>
          prev ? { ...prev, recentPosts: result.data! } : null
        );
      }
    } catch (err) {
      setPostsError(
        err instanceof Error ? err.message : 'Failed to load recent posts'
      );
    } finally {
      setPostsLoading(false);
    }
  }, [data]);

  // Load testimonials
  const loadTestimonials = useCallback(async () => {
    setTestimonialsLoading(true);
    setTestimonialsError(null);

    try {
      const result = await getTestimonials(6);

      if (result.error) {
        setTestimonialsError(result.error);
      } else if (result.data && data) {
        setData((prev) =>
          prev ? { ...prev, testimonials: result.data! } : null
        );
      }
    } catch (err) {
      setTestimonialsError(
        err instanceof Error ? err.message : 'Failed to load testimonials'
      );
    } finally {
      setTestimonialsLoading(false);
    }
  }, [data]);

  // Load community groups
  const loadGroups = useCallback(async () => {
    setGroupsLoading(true);
    setGroupsError(null);

    try {
      const result = await getCommunityGroups(6);

      if (result.error) {
        setGroupsError(result.error);
      } else if (result.data && data) {
        setData((prev) =>
          prev ? { ...prev, communityGroups: result.data! } : null
        );
      }
    } catch (err) {
      setGroupsError(
        err instanceof Error ? err.message : 'Failed to load community groups'
      );
    } finally {
      setGroupsLoading(false);
    }
  }, [data]);

  // Load community users
  const loadUsers = useCallback(async () => {
    setUsersLoading(true);
    setUsersError(null);

    try {
      const result = await getCommunityUsers(6);

      if (result.error) {
        setUsersError(result.error);
      } else if (result.data && data) {
        setData((prev) =>
          prev ? { ...prev, communityUsers: result.data! } : null
        );
      }
    } catch (err) {
      setUsersError(
        err instanceof Error ? err.message : 'Failed to load community users'
      );
    } finally {
      setUsersLoading(false);
    }
  }, [data]);

  // Load featured professors
  const loadProfessors = useCallback(async () => {
    setProfessorsLoading(true);
    setProfessorsError(null);

    try {
      const result = await getFeaturedProfessors(6);

      if (result.error) {
        setProfessorsError(result.error);
      } else if (result.data && data) {
        setData((prev) =>
          prev ? { ...prev, featuredProfessors: result.data! } : null
        );
      }
    } catch (err) {
      setProfessorsError(
        err instanceof Error
          ? err.message
          : 'Failed to load featured professors'
      );
    } finally {
      setProfessorsLoading(false);
    }
  }, [data]);

  // Load opportunities
  const loadOpportunities = useCallback(async () => {
    setOpportunitiesLoading(true);
    setOpportunitiesError(null);

    try {
      const result = await getOpportunities(6);

      if (result.error) {
        setOpportunitiesError(result.error);
      } else if (result.data && data) {
        setData((prev) =>
          prev ? { ...prev, opportunities: result.data! } : null
        );
      }
    } catch (err) {
      setOpportunitiesError(
        err instanceof Error ? err.message : 'Failed to load opportunities'
      );
    } finally {
      setOpportunitiesLoading(false);
    }
  }, [data]);

  // Refresh functions
  const refreshData = useCallback(async () => {
    await loadData();
  }, [loadData]);

  const refreshStats = useCallback(async () => {
    await loadStats();
  }, [loadStats]);

  const refreshPrograms = useCallback(async () => {
    await loadPrograms();
  }, [loadPrograms]);

  const refreshPosts = useCallback(async () => {
    await loadPosts();
  }, [loadPosts]);

  const refreshTestimonials = useCallback(async () => {
    await loadTestimonials();
  }, [loadTestimonials]);

  const refreshGroups = useCallback(async () => {
    await loadGroups();
  }, [loadGroups]);

  const refreshUsers = useCallback(async () => {
    await loadUsers();
  }, [loadUsers]);

  const refreshProfessors = useCallback(async () => {
    await loadProfessors();
  }, [loadProfessors]);

  const refreshOpportunities = useCallback(async () => {
    await loadOpportunities();
  }, [loadOpportunities]);

  // Toggle real-time updates
  const toggleRealTime = useCallback(() => {
    setIsRealTimeEnabled((prev) => !prev);
  }, []);

  // Initial load
  useEffect(() => {
    loadData();
  }, [loadData]);

  // Real-time subscription
  useEffect(() => {
    if (!isRealTimeEnabled || !data) return;

    const unsubscribe = subscribeToLandingPageStats((newStats) => {
      setData((prev) => (prev ? { ...prev, stats: newStats } : null));
    });

    return unsubscribe;
  }, [isRealTimeEnabled, data]);

  // Auto-refresh every 5 minutes
  useEffect(() => {
    const interval = setInterval(() => {
      if (!loading) {
        refreshData();
      }
    }, 5 * 60 * 1000); // 5 minutes

    return () => clearInterval(interval);
  }, [loading, refreshData]);

  return {
    // Data
    data,

    // Loading states
    loading,
    statsLoading,
    programsLoading,
    postsLoading,
    testimonialsLoading,
    groupsLoading,
    usersLoading,
    professorsLoading,
    opportunitiesLoading,

    // Error states
    error,
    statsError,
    programsError,
    postsError,
    testimonialsError,
    groupsError,
    usersError,
    professorsError,
    opportunitiesError,

    // Actions
    refreshData,
    refreshStats,
    refreshPrograms,
    refreshPosts,
    refreshTestimonials,
    refreshGroups,
    refreshUsers,
    refreshProfessors,
    refreshOpportunities,

    // Real-time
    isRealTimeEnabled,
    toggleRealTime,
  };
};
