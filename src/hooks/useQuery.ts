import {
  useQuery,
  useMutation,
  useQueryClient,
  UseQueryOptions,
  UseMutationOptions,
} from '@tanstack/react-query';
import { supabase } from '@/lib/supabase';
import { useAuth } from '@/contexts/AuthContext';

// Query Keys
export const queryKeys = {
  users: ['users'] as const,
  user: (id: string) => ['users', id] as const,
  userProfile: (id: string) => ['users', id, 'profile'] as const,
  connections: (userId: string) => ['connections', userId] as const,
  connectionRequests: (userId: string) =>
    ['connectionRequests', userId] as const,
  posts: ['posts'] as const,
  post: (id: string) => ['posts', id] as const,
  userPosts: (userId: string) => ['posts', 'user', userId] as const,
  groups: ['groups'] as const,
  group: (id: string) => ['groups', id] as const,
  userGroups: (userId: string) => ['groups', 'user', userId] as const,
  groupMembers: (groupId: string) => ['groups', groupId, 'members'] as const,
  groupPosts: (groupId: string) => ['groups', groupId, 'posts'] as const,
  forums: ['forums'] as const,
  forumThreads: (categoryId: string) =>
    ['forums', categoryId, 'threads'] as const,
  forumThread: (id: string) => ['forums', 'threads', id] as const,
  jobs: ['jobs'] as const,
  job: (id: string) => ['jobs', id] as const,
  userJobs: (userId: string) => ['jobs', 'user', userId] as const,
  savedJobs: (userId: string) => ['jobs', 'saved', userId] as const,
  researchProjects: ['researchProjects'] as const,
  researchProject: (id: string) => ['researchProjects', id] as const,
  userResearchProjects: (userId: string) =>
    ['researchProjects', 'user', userId] as const,
  mentorshipProfiles: ['mentorshipProfiles'] as const,
  mentorshipProfile: (id: string) => ['mentorshipProfiles', id] as const,
  mentorshipSessions: (userId: string) =>
    ['mentorshipSessions', userId] as const,
  mentorshipAvailability: (profileId: string) =>
    ['mentorshipAvailability', profileId] as const,
  universityPrograms: ['universityPrograms'] as const,
  universityProgram: (id: string) => ['universityPrograms', id] as const,
  scholarships: ['scholarships'] as const,
  scholarship: (id: string) => ['scholarships', id] as const,
  notifications: (userId: string) => ['notifications', userId] as const,
  messages: (conversationId: string) => ['messages', conversationId] as const,
  search: (query: string, filters: any) => ['search', query, filters] as const,
};

// Generic pagination hook
export const usePaginatedQuery = <T>(
  queryKey: readonly unknown[],
  queryFn: (
    page: number,
    limit: number
  ) => Promise<{ data: T[]; count: number }>,
  options: {
    page?: number;
    limit?: number;
    enabled?: boolean;
  } = {}
) => {
  const { page = 1, limit = 20, enabled = true } = options;

  return useQuery({
    queryKey: [...queryKey, page, limit],
    queryFn: () => queryFn(page, limit),
    enabled,
    keepPreviousData: true,
    staleTime: 5 * 60 * 1000, // 5 minutes
  });
};

// Users queries
export const useUsers = (
  options: { page?: number; limit?: number; filters?: any } = {}
) => {
  const { page = 1, limit = 20, filters = {} } = options;

  return usePaginatedQuery(
    queryKeys.users,
    async (page, limit) => {
      let query = supabase
        .from('users')
        .select('*', { count: 'exact' })
        .order('created_at', { ascending: false });

      // Apply filters
      if (filters.role) {
        query = query.eq('role', filters.role);
      }
      if (filters.university) {
        query = query.ilike('university', `%${filters.university}%`);
      }
      if (filters.field) {
        query = query.ilike('field', `%${filters.field}%`);
      }
      if (filters.is_verified !== undefined) {
        query = query.eq('is_verified', filters.is_verified);
      }

      const { data, error, count } = await query.range(
        (page - 1) * limit,
        page * limit - 1
      );

      if (error) throw error;
      return { data: data || [], count: count || 0 };
    },
    { page, limit }
  );
};

export const useUser = (id: string, options?: UseQueryOptions) => {
  return useQuery({
    queryKey: queryKeys.user(id),
    queryFn: async () => {
      const { data, error } = await supabase
        .from('users')
        .select('*')
        .eq('id', id)
        .single();

      if (error) throw error;
      return data;
    },
    enabled: !!id,
    staleTime: 10 * 60 * 1000, // 10 minutes
    ...options,
  });
};

// Connections queries
export const useConnections = (userId: string, options?: UseQueryOptions) => {
  return useQuery({
    queryKey: queryKeys.connections(userId),
    queryFn: async () => {
      const { data, error } = await supabase
        .from('connections')
        .select(
          `
          *,
          user:user_id(*),
          connection:connection_id(*)
        `
        )
        .or(`user_id.eq.${userId},connection_id.eq.${userId}`)
        .eq('status', 'accepted');

      if (error) throw error;
      return data || [];
    },
    enabled: !!userId,
    staleTime: 5 * 60 * 1000, // 5 minutes
    ...options,
  });
};

export const useConnectionRequests = (
  userId: string,
  options?: UseQueryOptions
) => {
  return useQuery({
    queryKey: queryKeys.connectionRequests(userId),
    queryFn: async () => {
      const { data, error } = await supabase
        .from('connections')
        .select(
          `
          *,
          requester:requester_id(*),
          receiver:receiver_id(*)
        `
        )
        .eq('receiver_id', userId)
        .eq('status', 'pending');

      if (error) throw error;
      return data || [];
    },
    enabled: !!userId,
    staleTime: 2 * 60 * 1000, // 2 minutes
    ...options,
  });
};

// Posts queries
export const usePosts = (
  options: { page?: number; limit?: number; filters?: any } = {}
) => {
  const { page = 1, limit = 20, filters = {} } = options;

  return usePaginatedQuery(
    queryKeys.posts,
    async (page, limit) => {
      let query = supabase
        .from('posts')
        .select(
          `
          *,
          author:author_id(*),
          likes:post_likes(count),
          comments:post_comments(count)
        `,
          { count: 'exact' }
        )
        .order('created_at', { ascending: false });

      // Apply filters
      if (filters.author_id) {
        query = query.eq('author_id', filters.author_id);
      }
      if (filters.post_type) {
        query = query.eq('post_type', filters.post_type);
      }
      if (filters.date_from) {
        query = query.gte('created_at', filters.date_from);
      }
      if (filters.date_to) {
        query = query.lte('created_at', filters.date_to);
      }

      const { data, error, count } = await query.range(
        (page - 1) * limit,
        page * limit - 1
      );

      if (error) throw error;
      return { data: data || [], count: count || 0 };
    },
    { page, limit }
  );
};

export const usePost = (id: string, options?: UseQueryOptions) => {
  return useQuery({
    queryKey: queryKeys.post(id),
    queryFn: async () => {
      const { data, error } = await supabase
        .from('posts')
        .select(
          `
          *,
          author:author_id(*),
          likes:post_likes(*),
          comments:post_comments(
            *,
            author:author_id(*)
          )
        `
        )
        .eq('id', id)
        .single();

      if (error) throw error;
      return data;
    },
    enabled: !!id,
    staleTime: 5 * 60 * 1000, // 5 minutes
    ...options,
  });
};

// Groups queries
export const useGroups = (
  options: { page?: number; limit?: number; filters?: any } = {}
) => {
  const { page = 1, limit = 20, filters = {} } = options;

  return usePaginatedQuery(
    queryKeys.groups,
    async (page, limit) => {
      let query = supabase
        .from('groups')
        .select(
          `
          *,
          creator:creator_id(*),
          group_members(count)
        `,
          { count: 'exact' }
        )
        .order('created_at', { ascending: false });

      // Apply filters
      if (filters.category) {
        query = query.eq('category', filters.category);
      }
      if (filters.university) {
        query = query.ilike('university', `%${filters.university}%`);
      }
      if (filters.is_public !== undefined) {
        query = query.eq('is_public', filters.is_public);
      }

      const { data, error, count } = await query.range(
        (page - 1) * limit,
        page * limit - 1
      );

      if (error) throw error;

      // Transform the data to extract member_count from group_members
      const transformedData =
        data?.map((group) => ({
          ...group,
          member_count: group.group_members?.[0]?.count || 0,
        })) || [];

      return { data: transformedData, count: count || 0 };
    },
    { page, limit }
  );
};

export const useGroup = (id: string, options?: UseQueryOptions) => {
  return useQuery({
    queryKey: queryKeys.group(id),
    queryFn: async () => {
      const { data, error } = await supabase
        .from('groups')
        .select(
          `
          *,
          creator:creator_id(*),
          members:group_members(
            *,
            user:user_id(*)
          )
        `
        )
        .eq('id', id)
        .single();

      if (error) throw error;
      return data;
    },
    enabled: !!id,
    staleTime: 5 * 60 * 1000, // 5 minutes
    ...options,
  });
};

// Jobs queries
export const useJobs = (
  options: { page?: number; limit?: number; filters?: any } = {}
) => {
  const { page = 1, limit = 20, filters = {} } = options;

  return usePaginatedQuery(
    queryKeys.jobs,
    async (page, limit) => {
      let query = supabase
        .from('job_postings')
        .select(
          `
          *,
          poster:poster_id(*),
          applications:job_applications(count)
        `,
          { count: 'exact' }
        )
        .order('created_at', { ascending: false });

      // Apply filters
      if (filters.job_type) {
        query = query.eq('job_type', filters.job_type);
      }
      if (filters.location) {
        query = query.ilike('location', `%${filters.location}%`);
      }
      if (filters.field) {
        query = query.ilike('field', `%${filters.field}%`);
      }
      if (filters.is_active !== undefined) {
        query = query.eq('is_active', filters.is_active);
      }

      const { data, error, count } = await query.range(
        (page - 1) * limit,
        page * limit - 1
      );

      if (error) throw error;
      return { data: data || [], count: count || 0 };
    },
    { page, limit }
  );
};

// Mentorship queries
export const useMentorshipProfiles = (
  options: { page?: number; limit?: number; filters?: any } = {}
) => {
  const { page = 1, limit = 20, filters = {} } = options;

  return usePaginatedQuery(
    queryKeys.mentorshipProfiles,
    async (page, limit) => {
      let query = supabase
        .from('mentorship_profiles')
        .select(
          `
          *,
          user:user_id(*)
        `,
          { count: 'exact' }
        )
        .eq('is_available', true)
        .order('rating', { ascending: false });

      // Apply filters
      if (filters.expertise_area) {
        query = query.contains('expertise_areas', [filters.expertise_area]);
      }
      if (filters.min_rating) {
        query = query.gte('rating', filters.min_rating);
      }
      if (filters.max_hourly_rate) {
        query = query.lte('hourly_rate', filters.max_hourly_rate);
      }

      const { data, error, count } = await query.range(
        (page - 1) * limit,
        page * limit - 1
      );

      if (error) throw error;
      return { data: data || [], count: count || 0 };
    },
    { page, limit }
  );
};

// Notifications queries
export const useNotifications = (userId: string, options?: UseQueryOptions) => {
  return useQuery({
    queryKey: queryKeys.notifications(userId),
    queryFn: async () => {
      const { data, error } = await supabase
        .from('notifications')
        .select('*')
        .eq('user_id', userId)
        .order('created_at', { ascending: false })
        .limit(50);

      if (error) throw error;
      return data || [];
    },
    enabled: !!userId,
    staleTime: 1 * 60 * 1000, // 1 minute
    refetchInterval: 30 * 1000, // Refetch every 30 seconds
    ...options,
  });
};

// Messages queries
export const useMessages = (
  conversationId: string,
  options?: UseQueryOptions
) => {
  return useQuery({
    queryKey: queryKeys.messages(conversationId),
    queryFn: async () => {
      const { data, error } = await supabase
        .from('messages')
        .select(
          `
          *,
          sender:sender_id(*),
          receiver:receiver_id(*)
        `
        )
        .eq('conversation_id', conversationId)
        .order('created_at', { ascending: true });

      if (error) throw error;
      return data || [];
    },
    enabled: !!conversationId,
    staleTime: 30 * 1000, // 30 seconds
    ...options,
  });
};

// Mutations
export const useCreatePost = (options?: UseMutationOptions) => {
  const queryClient = useQueryClient();
  const { user } = useAuth();

  return useMutation({
    mutationFn: async (postData: {
      content: string;
      post_type: string;
      media_urls?: string[];
    }) => {
      if (!user) throw new Error('User not authenticated');

      const { data, error } = await supabase
        .from('posts')
        .insert({
          ...postData,
          author_id: user.id,
        })
        .select()
        .single();

      if (error) throw error;
      return data;
    },
    onSuccess: () => {
      // Invalidate and refetch posts
      queryClient.invalidateQueries({ queryKey: queryKeys.posts });
      queryClient.invalidateQueries({
        queryKey: queryKeys.userPosts(user?.id || ''),
      });
    },
    ...options,
  });
};

export const useCreateConnection = (options?: UseMutationOptions) => {
  const queryClient = useQueryClient();
  const { user } = useAuth();

  return useMutation({
    mutationFn: async (connectionData: {
      receiver_id: string;
      message?: string;
    }) => {
      if (!user) throw new Error('User not authenticated');

      const { data, error } = await supabase
        .from('connections')
        .insert({
          ...connectionData,
          requester_id: user.id,
          status: 'pending',
        })
        .select()
        .single();

      if (error) throw error;
      return data;
    },
    onSuccess: (data) => {
      // Invalidate connection requests
      queryClient.invalidateQueries({
        queryKey: queryKeys.connectionRequests(data.receiver_id),
      });
    },
    ...options,
  });
};

export const useAcceptConnection = (options?: UseMutationOptions) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (connectionId: string) => {
      const { data, error } = await supabase
        .from('connections')
        .update({ status: 'accepted' })
        .eq('id', connectionId)
        .select()
        .single();

      if (error) throw error;
      return data;
    },
    onSuccess: (data) => {
      // Invalidate connections and requests
      queryClient.invalidateQueries({
        queryKey: queryKeys.connections(data.receiver_id),
      });
      queryClient.invalidateQueries({
        queryKey: queryKeys.connections(data.requester_id),
      });
      queryClient.invalidateQueries({
        queryKey: queryKeys.connectionRequests(data.receiver_id),
      });
    },
    ...options,
  });
};

export const useCreateGroup = (options?: UseMutationOptions) => {
  const queryClient = useQueryClient();
  const { user } = useAuth();

  return useMutation({
    mutationFn: async (groupData: {
      name: string;
      description: string;
      category: string;
      university?: string;
      is_public: boolean;
    }) => {
      if (!user) throw new Error('User not authenticated');

      const { data, error } = await supabase
        .from('groups')
        .insert({
          ...groupData,
          creator_id: user.id,
        })
        .select()
        .single();

      if (error) throw error;
      return data;
    },
    onSuccess: () => {
      // Invalidate groups
      queryClient.invalidateQueries({ queryKey: queryKeys.groups });
    },
    ...options,
  });
};

export const useJoinGroup = (options?: UseMutationOptions) => {
  const queryClient = useQueryClient();
  const { user } = useAuth();

  return useMutation({
    mutationFn: async (groupId: string) => {
      if (!user) throw new Error('User not authenticated');

      const { data, error } = await supabase
        .from('group_members')
        .insert({
          group_id: groupId,
          user_id: user.id,
          role: 'member',
        })
        .select()
        .single();

      if (error) throw error;
      return data;
    },
    onSuccess: (data) => {
      // Invalidate group members and user groups
      queryClient.invalidateQueries({
        queryKey: queryKeys.groupMembers(data.group_id),
      });
      queryClient.invalidateQueries({
        queryKey: queryKeys.userGroups(user?.id || ''),
      });
    },
    ...options,
  });
};

export const useCreateJob = (options?: UseMutationOptions) => {
  const queryClient = useQueryClient();
  const { user } = useAuth();

  return useMutation({
    mutationFn: async (jobData: {
      title: string;
      description: string;
      job_type: string;
      location: string;
      company: string;
      field: string;
      requirements: string[];
      benefits: string[];
      salary_min?: number;
      salary_max?: number;
      application_deadline?: string;
    }) => {
      if (!user) throw new Error('User not authenticated');

      const { data, error } = await supabase
        .from('job_postings')
        .insert({
          ...jobData,
          poster_id: user.id,
        })
        .select()
        .single();

      if (error) throw error;
      return data;
    },
    onSuccess: () => {
      // Invalidate jobs
      queryClient.invalidateQueries({ queryKey: queryKeys.jobs });
    },
    ...options,
  });
};

export const useApplyForJob = (options?: UseMutationOptions) => {
  const queryClient = useQueryClient();
  const { user } = useAuth();

  return useMutation({
    mutationFn: async (applicationData: {
      job_id: string;
      cover_letter: string;
      resume_url?: string;
    }) => {
      if (!user) throw new Error('User not authenticated');

      const { data, error } = await supabase
        .from('job_applications')
        .insert({
          ...applicationData,
          applicant_id: user.id,
          status: 'submitted',
        })
        .select()
        .single();

      if (error) throw error;
      return data;
    },
    onSuccess: (data) => {
      // Invalidate job applications
      queryClient.invalidateQueries({ queryKey: queryKeys.job(data.job_id) });
    },
    ...options,
  });
};

// Prefetch utilities
export const usePrefetch = () => {
  const queryClient = useQueryClient();

  const prefetchUser = (id: string) => {
    queryClient.prefetchQuery({
      queryKey: queryKeys.user(id),
      queryFn: async () => {
        const { data, error } = await supabase
          .from('users')
          .select('*')
          .eq('id', id)
          .single();

        if (error) throw error;
        return data;
      },
      staleTime: 10 * 60 * 1000, // 10 minutes
    });
  };

  const prefetchGroup = (id: string) => {
    queryClient.prefetchQuery({
      queryKey: queryKeys.group(id),
      queryFn: async () => {
        const { data, error } = await supabase
          .from('groups')
          .select(
            `
            *,
            creator:creator_id(*),
            members:group_members(
              *,
              user:user_id(*)
            )
          `
          )
          .eq('id', id)
          .single();

        if (error) throw error;
        return data;
      },
      staleTime: 5 * 60 * 1000, // 5 minutes
    });
  };

  const prefetchJob = (id: string) => {
    queryClient.prefetchQuery({
      queryKey: queryKeys.job(id),
      queryFn: async () => {
        const { data, error } = await supabase
          .from('job_postings')
          .select(
            `
            *,
            poster:poster_id(*),
            applications:job_applications(
              *,
              applicant:applicant_id(*)
            )
          `
          )
          .eq('id', id)
          .single();

        if (error) throw error;
        return data;
      },
      staleTime: 5 * 60 * 1000, // 5 minutes
    });
  };

  return {
    prefetchUser,
    prefetchGroup,
    prefetchJob,
  };
};
