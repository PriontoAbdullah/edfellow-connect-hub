import { useState, useEffect, useCallback } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { useToast } from '../hooks/use-toast';
import {
  getProfile,
  updateProfile,
  getPublicProfile,
  getProfileStats,
  incrementProfileViews,
  uploadAvatar,
  deleteAvatar,
  searchProfiles,
  getFeaturedProfiles,
  calculateProfileCompletion,
  getProfileCompletionSuggestions,
  ProfileUpdateData,
  ProfileStats,
  PublicProfile,
} from '../lib/api/profiles';
import { UserData } from '../lib/auth';

interface UseProfileReturn {
  // Profile data
  profile: UserData | null;
  publicProfile: PublicProfile | null;
  stats: ProfileStats | null;

  // Loading states
  loading: boolean;
  updating: boolean;
  uploading: boolean;

  // Error states
  error: string | null;

  // Profile completion
  completionPercentage: number;
  completionSuggestions: string[];

  // Actions
  refreshProfile: () => Promise<void>;
  updateProfileData: (data: ProfileUpdateData) => Promise<boolean>;
  uploadProfileAvatar: (file: File) => Promise<boolean>;
  removeProfileAvatar: () => Promise<boolean>;
  viewProfile: (userId: string) => Promise<void>;

  // Search and discovery
  searchUserProfiles: (params: {
    query?: string;
    role?: 'student' | 'professor' | 'university';
    country?: string;
    university?: string;
    skills?: string[];
    academic_interests?: string[];
    limit?: number;
    offset?: number;
  }) => Promise<{ profiles: PublicProfile[]; total: number }>;
  getFeaturedUserProfiles: (limit?: number) => Promise<PublicProfile[]>;
}

export const useProfile = (userId?: string): UseProfileReturn => {
  const { user, userData, refreshUserData } = useAuth();
  const { toast } = useToast();

  // State
  const [profile, setProfile] = useState<UserData | null>(null);
  const [publicProfile, setPublicProfile] = useState<PublicProfile | null>(
    null
  );
  const [stats, setStats] = useState<ProfileStats | null>(null);
  const [loading, setLoading] = useState(false);
  const [updating, setUpdating] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [completionPercentage, setCompletionPercentage] = useState(0);
  const [completionSuggestions, setCompletionSuggestions] = useState<string[]>(
    []
  );

  // Get the target user ID (current user if not specified)
  const targetUserId = userId || user?.id;

  // Load profile data
  const loadProfile = useCallback(async () => {
    if (!targetUserId) return;

    setLoading(true);
    setError(null);

    try {
      const [profileData, statsData] = await Promise.all([
        getProfile(targetUserId),
        getProfileStats(targetUserId),
      ]);

      if (profileData) {
        setProfile(profileData);
        setCompletionPercentage(calculateProfileCompletion(profileData));
        setCompletionSuggestions(getProfileCompletionSuggestions(profileData));
      }

      if (statsData) {
        setStats(statsData);
      }
    } catch (err) {
      console.error('Error loading profile:', err);
      setError('Failed to load profile data');
    } finally {
      setLoading(false);
    }
  }, [targetUserId]);

  // Load public profile data
  const loadPublicProfile = useCallback(async () => {
    if (!targetUserId) return;

    try {
      const publicData = await getPublicProfile(targetUserId);
      setPublicProfile(publicData);
    } catch (err) {
      console.error('Error loading public profile:', err);
    }
  }, [targetUserId]);

  // Refresh profile data
  const refreshProfile = useCallback(async () => {
    await Promise.all([loadProfile(), loadPublicProfile()]);
  }, [loadProfile, loadPublicProfile]);

  // Update profile data
  const updateProfileData = useCallback(
    async (data: ProfileUpdateData): Promise<boolean> => {
      if (!targetUserId) {
        toast({
          title: 'Error',
          description: 'User not authenticated',
          variant: 'destructive',
        });
        return false;
      }

      setUpdating(true);
      setError(null);

      try {
        const result = await updateProfile(targetUserId, data);

        if (result.success) {
          // Refresh local data
          await refreshProfile();

          // If updating current user, also refresh auth context
          if (targetUserId === user?.id) {
            await refreshUserData();
          }

          toast({
            title: 'Success',
            description: 'Profile updated successfully',
          });

          return true;
        } else {
          throw new Error(result.error?.message || 'Failed to update profile');
        }
      } catch (err) {
        console.error('Error updating profile:', err);
        const errorMessage =
          err instanceof Error ? err.message : 'Failed to update profile';
        setError(errorMessage);

        toast({
          title: 'Error',
          description: errorMessage,
          variant: 'destructive',
        });

        return false;
      } finally {
        setUpdating(false);
      }
    },
    [targetUserId, user?.id, refreshProfile, refreshUserData, toast]
  );

  // Upload profile avatar
  const uploadProfileAvatar = useCallback(
    async (file: File): Promise<boolean> => {
      if (!targetUserId) {
        toast({
          title: 'Error',
          description: 'User not authenticated',
          variant: 'destructive',
        });
        return false;
      }

      setUploading(true);
      setError(null);

      try {
        const result = await uploadAvatar(targetUserId, file);

        if (result.success) {
          // Refresh profile data
          await refreshProfile();

          // If updating current user, also refresh auth context
          if (targetUserId === user?.id) {
            await refreshUserData();
          }

          toast({
            title: 'Success',
            description: 'Avatar uploaded successfully',
          });

          return true;
        } else {
          throw new Error(result.error?.message || 'Failed to upload avatar');
        }
      } catch (err) {
        console.error('Error uploading avatar:', err);
        const errorMessage =
          err instanceof Error ? err.message : 'Failed to upload avatar';
        setError(errorMessage);

        toast({
          title: 'Error',
          description: errorMessage,
          variant: 'destructive',
        });

        return false;
      } finally {
        setUploading(false);
      }
    },
    [targetUserId, user?.id, refreshProfile, refreshUserData, toast]
  );

  // Remove profile avatar
  const removeProfileAvatar = useCallback(async (): Promise<boolean> => {
    if (!targetUserId) {
      toast({
        title: 'Error',
        description: 'User not authenticated',
        variant: 'destructive',
      });
      return false;
    }

    setUpdating(true);
    setError(null);

    try {
      const result = await deleteAvatar(targetUserId);

      if (result.success) {
        // Refresh profile data
        await refreshProfile();

        // If updating current user, also refresh auth context
        if (targetUserId === user?.id) {
          await refreshUserData();
        }

        toast({
          title: 'Success',
          description: 'Avatar removed successfully',
        });

        return true;
      } else {
        throw new Error(result.error?.message || 'Failed to remove avatar');
      }
    } catch (err) {
      console.error('Error removing avatar:', err);
      const errorMessage =
        err instanceof Error ? err.message : 'Failed to remove avatar';
      setError(errorMessage);

      toast({
        title: 'Error',
        description: errorMessage,
        variant: 'destructive',
      });

      return false;
    } finally {
      setUpdating(false);
    }
  }, [targetUserId, user?.id, refreshProfile, refreshUserData, toast]);

  // View profile (increment views)
  const viewProfile = useCallback(
    async (profileUserId: string): Promise<void> => {
      try {
        await incrementProfileViews(profileUserId);
      } catch (err) {
        console.error('Error incrementing profile views:', err);
        // Don't show error to user for view tracking
      }
    },
    []
  );

  // Search user profiles
  const searchUserProfiles = useCallback(
    async (params: {
      query?: string;
      role?: 'student' | 'professor' | 'university';
      country?: string;
      university?: string;
      skills?: string[];
      academic_interests?: string[];
      limit?: number;
      offset?: number;
    }): Promise<{ profiles: PublicProfile[]; total: number }> => {
      try {
        const result = await searchProfiles(params);
        return {
          profiles: result.profiles,
          total: result.total,
        };
      } catch (err) {
        console.error('Error searching profiles:', err);
        return { profiles: [], total: 0 };
      }
    },
    []
  );

  // Get featured user profiles
  const getFeaturedUserProfiles = useCallback(
    async (limit: number = 10): Promise<PublicProfile[]> => {
      try {
        return await getFeaturedProfiles(limit);
      } catch (err) {
        console.error('Error fetching featured profiles:', err);
        return [];
      }
    },
    []
  );

  // Load profile data on mount and when targetUserId changes
  useEffect(() => {
    if (targetUserId) {
      loadProfile();
      loadPublicProfile();
    }
  }, [targetUserId, loadProfile, loadPublicProfile]);

  // Use auth context data if viewing current user
  useEffect(() => {
    if (targetUserId === user?.id && userData) {
      setProfile(userData);
      setCompletionPercentage(calculateProfileCompletion(userData));
      setCompletionSuggestions(getProfileCompletionSuggestions(userData));
    }
  }, [targetUserId, user?.id, userData]);

  return {
    // Profile data
    profile,
    publicProfile,
    stats,

    // Loading states
    loading,
    updating,
    uploading,

    // Error states
    error,

    // Profile completion
    completionPercentage,
    completionSuggestions,

    // Actions
    refreshProfile,
    updateProfileData,
    uploadProfileAvatar,
    removeProfileAvatar,
    viewProfile,

    // Search and discovery
    searchUserProfiles,
    getFeaturedUserProfiles,
  };
};

// Hook for profile search functionality
export const useProfileSearch = () => {
  const [searchResults, setSearchResults] = useState<PublicProfile[]>([]);
  const [totalResults, setTotalResults] = useState(0);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const search = useCallback(
    async (params: {
      query?: string;
      role?: 'student' | 'professor' | 'university';
      country?: string;
      university?: string;
      skills?: string[];
      academic_interests?: string[];
      limit?: number;
      offset?: number;
    }) => {
      setLoading(true);
      setError(null);

      try {
        const result = await searchProfiles(params);
        setSearchResults(result.profiles);
        setTotalResults(result.total);
      } catch (err) {
        console.error('Error searching profiles:', err);
        setError('Failed to search profiles');
        setSearchResults([]);
        setTotalResults(0);
      } finally {
        setLoading(false);
      }
    },
    []
  );

  const clearResults = useCallback(() => {
    setSearchResults([]);
    setTotalResults(0);
    setError(null);
  }, []);

  return {
    searchResults,
    totalResults,
    loading,
    error,
    search,
    clearResults,
  };
};

// Hook for featured profiles
export const useFeaturedProfiles = (limit: number = 10) => {
  const [profiles, setProfiles] = useState<PublicProfile[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const loadFeaturedProfiles = useCallback(async () => {
    setLoading(true);
    setError(null);

    try {
      const featuredProfiles = await getFeaturedProfiles(limit);
      setProfiles(featuredProfiles);
    } catch (err) {
      console.error('Error loading featured profiles:', err);
      setError('Failed to load featured profiles');
      setProfiles([]);
    } finally {
      setLoading(false);
    }
  }, [limit]);

  useEffect(() => {
    loadFeaturedProfiles();
  }, [loadFeaturedProfiles]);

  return {
    profiles,
    loading,
    error,
    refresh: loadFeaturedProfiles,
  };
};
