import { useState, useEffect, useCallback } from 'react';
import { supabase } from '@/lib/supabase';
import { useAuth } from '@/contexts/AuthContext';

// Re-export useDashboard from the main dashboard hook
export { useDashboard } from './useDashboard';

// Hook for user profile data
export const useUserProfile = () => {
  const { userData } = useAuth();
  const [profile, setProfile] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const loadProfile = useCallback(async () => {
    if (!userData?.uid) return;

    setLoading(true);
    setError(null);

    try {
      const { data, error } = await supabase
        .from('users')
        .select('*')
        .eq('id', userData.uid)
        .single();

      if (error) throw error;
      setProfile(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to load profile');
    } finally {
      setLoading(false);
    }
  }, [userData?.uid]);

  useEffect(() => {
    loadProfile();
  }, [loadProfile]);

  return { profile, loading, error, refreshProfile: loadProfile };
};

// Hook for notifications
export const useNotifications = () => {
  const { userData } = useAuth();
  const [notifications, setNotifications] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const loadNotifications = useCallback(async () => {
    if (!userData?.uid) return;

    setLoading(true);
    setError(null);

    try {
      const { data, error } = await supabase
        .from('notifications')
        .select('*')
        .eq('user_id', userData.uid)
        .order('created_at', { ascending: false })
        .limit(20);

      if (error) throw error;
      setNotifications(data || []);
    } catch (err) {
      setError(
        err instanceof Error ? err.message : 'Failed to load notifications'
      );
    } finally {
      setLoading(false);
    }
  }, [userData?.uid]);

  const markAsRead = useCallback(async (notificationId: string) => {
    try {
      const { error } = await supabase
        .from('notifications')
        .update({ is_read: true })
        .eq('id', notificationId);

      if (error) throw error;

      // Update local state
      setNotifications((prev) =>
        prev.map((notif) =>
          notif.id === notificationId ? { ...notif, is_read: true } : notif
        )
      );
    } catch (err) {
      console.error('Failed to mark notification as read:', err);
    }
  }, []);

  useEffect(() => {
    loadNotifications();
  }, [loadNotifications]);

  return {
    notifications,
    loading,
    error,
    markAsRead,
    refreshNotifications: loadNotifications,
  };
};

// Hook for connections
export const useConnections = () => {
  const { userData } = useAuth();
  const [connections, setConnections] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const loadConnections = useCallback(async () => {
    if (!userData?.uid) return;

    setLoading(true);
    setError(null);

    try {
      const { data, error } = await supabase
        .from('user_connections')
        .select(
          `
          id,
          status,
          created_at,
          requester:requester_id (
            id,
            display_name,
            avatar,
            role,
            university,
            major
          ),
          addressee:addressee_id (
            id,
            display_name,
            avatar,
            role,
            university,
            major
          )
        `
        )
        .or(`requester_id.eq.${userData.uid},addressee_id.eq.${userData.uid}`)
        .eq('status', 'accepted')
        .order('created_at', { ascending: false });

      if (error) throw error;
      setConnections(data || []);
    } catch (err) {
      setError(
        err instanceof Error ? err.message : 'Failed to load connections'
      );
    } finally {
      setLoading(false);
    }
  }, [userData?.uid]);

  useEffect(() => {
    loadConnections();
  }, [loadConnections]);

  return { connections, loading, error, refreshConnections: loadConnections };
};

// Hook for groups
export const useGroups = () => {
  const { userData } = useAuth();
  const [groups, setGroups] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const loadGroups = useCallback(async () => {
    if (!userData?.uid) return;

    setLoading(true);
    setError(null);

    try {
      const { data, error } = await supabase
        .from('group_members')
        .select(
          `
          id,
          role,
          joined_at,
          group:group_id (
            id,
            name,
            description,
            category,
            subject_area,
            university,
            department,
            level,
            max_members,
            is_private,
            is_verified,
            created_at
          )
        `
        )
        .eq('user_id', userData.uid)
        .order('joined_at', { ascending: false });

      if (error) throw error;
      setGroups(data || []);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to load groups');
    } finally {
      setLoading(false);
    }
  }, [userData?.uid]);

  useEffect(() => {
    loadGroups();
  }, [loadGroups]);

  return { groups, loading, error, refreshGroups: loadGroups };
};

// Hook for posts/feed
export const usePosts = () => {
  const { userData } = useAuth();
  const [posts, setPosts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const loadPosts = useCallback(async () => {
    if (!userData?.uid) return;

    setLoading(true);
    setError(null);

    try {
      const { data, error } = await supabase
        .from('posts')
        .select(
          `
          id,
          content,
          post_type,
          tags,
          created_at,
          author:author_id (
            id,
            display_name,
            avatar,
            role,
            university
          )
        `
        )
        .order('created_at', { ascending: false })
        .limit(20);

      if (error) throw error;
      setPosts(data || []);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to load posts');
    } finally {
      setLoading(false);
    }
  }, [userData?.uid]);

  const createPost = useCallback(
    async (content: string, postType: string = 'text', tags: string[] = []) => {
      if (!userData?.uid) return;

      try {
        const { data, error } = await supabase
          .from('posts')
          .insert({
            author_id: userData.uid,
            content,
            post_type: postType,
            tags,
          })
          .select()
          .single();

        if (error) throw error;

        // Add to local state
        setPosts((prev) => [data, ...prev]);
        return data;
      } catch (err) {
        console.error('Failed to create post:', err);
        throw err;
      }
    },
    [userData?.uid]
  );

  useEffect(() => {
    loadPosts();
  }, [loadPosts]);

  return { posts, loading, error, createPost, refreshPosts: loadPosts };
};

// Hook for programs (for students)
export const usePrograms = () => {
  const [programs, setPrograms] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const loadPrograms = useCallback(async () => {
    setLoading(true);
    setError(null);

    try {
      const { data, error } = await supabase
        .from('university_programs')
        .select(
          `
          id,
          title,
          description,
          program_type,
          department,
          duration_months,
          tuition_fee,
          currency,
          language,
          is_active,
          is_featured,
          university:university_id (
            id,
            display_name,
            avatar,
            country
          )
        `
        )
        .eq('is_active', true)
        .order('created_at', { ascending: false })
        .limit(20);

      if (error) throw error;
      setPrograms(data || []);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to load programs');
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    loadPrograms();
  }, [loadPrograms]);

  return { programs, loading, error, refreshPrograms: loadPrograms };
};

// Hook for jobs
export const useJobs = () => {
  const [jobs, setJobs] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const loadJobs = useCallback(async () => {
    setLoading(true);
    setError(null);

    try {
      const { data, error } = await supabase
        .from('job_postings')
        .select(
          `
          id,
          title,
          description,
          company_name,
          company_logo,
          location,
          job_type,
          category,
          salary_min,
          salary_max,
          currency,
          experience_level,
          education_level,
          skills_required,
          requirements,
          benefits,
          application_deadline,
          is_active,
          is_featured,
          created_at
        `
        )
        .eq('is_active', true)
        .order('created_at', { ascending: false })
        .limit(20);

      if (error) throw error;
      setJobs(data || []);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to load jobs');
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    loadJobs();
  }, [loadJobs]);

  return { jobs, loading, error, refreshJobs: loadJobs };
};

// Hook for scholarships
export const useScholarships = () => {
  const [scholarships, setScholarships] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const loadScholarships = useCallback(async () => {
    setLoading(true);
    setError(null);

    try {
      const { data, error } = await supabase
        .from('scholarships')
        .select(
          `
          id,
          title,
          description,
          amount,
          eligibility_criteria,
          application_deadline,
          is_active,
          university_id,
          created_at
        `
        )
        .eq('is_active', true)
        .order('created_at', { ascending: false })
        .limit(20);

      if (error) throw error;
      setScholarships(data || []);
    } catch (err) {
      setError(
        err instanceof Error ? err.message : 'Failed to load scholarships'
      );
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    loadScholarships();
  }, [loadScholarships]);

  return {
    scholarships,
    loading,
    error,
    refreshScholarships: loadScholarships,
  };
};
