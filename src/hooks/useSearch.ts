import { useState, useCallback, useMemo } from 'react';
import { supabase } from '@/lib/supabase';
import { useAuth } from '@/contexts/AuthContext';

export interface SearchFilters {
  role?: string;
  university?: string;
  field?: string;
  location?: string;
  is_verified?: boolean;
  is_active?: boolean;
  date_from?: string;
  date_to?: string;
  category?: string;
  type?: string;
  status?: string;
}

export interface SearchResult {
  id: string;
  type: 'user' | 'post' | 'group' | 'program' | 'job' | 'scholarship';
  title: string;
  description?: string;
  author?: {
    id: string;
    display_name: string;
    avatar?: string;
    role: string;
  };
  created_at: string;
  updated_at?: string;
  metadata?: any;
  relevance_score?: number;
}

export interface SearchOptions {
  limit?: number;
  offset?: number;
  sort_by?: 'relevance' | 'date' | 'popularity';
  include_metadata?: boolean;
}

export const useSearch = () => {
  const { user } = useAuth();
  const [searching, setSearching] = useState(false);
  const [results, setResults] = useState<SearchResult[]>([]);
  const [totalCount, setTotalCount] = useState(0);

  const searchUsers = useCallback(
    async (
      query: string,
      filters: SearchFilters = {},
      options: SearchOptions = {}
    ): Promise<{
      data: SearchResult[] | null;
      error: string | null;
      count: number;
    }> => {
      setSearching(true);

      try {
        let supabaseQuery = supabase
          .from('users')
          .select(
            `
          id,
          display_name,
          avatar,
          role,
          university,
          field,
          location,
          is_verified,
          is_active,
          created_at,
          updated_at
        `
          )
          .textSearch('display_name, bio, university, field', query, {
            type: 'websearch',
            config: 'english',
          });

        // Apply filters
        if (filters.role) {
          supabaseQuery = supabaseQuery.eq('role', filters.role);
        }
        if (filters.university) {
          supabaseQuery = supabaseQuery.ilike(
            'university',
            `%${filters.university}%`
          );
        }
        if (filters.field) {
          supabaseQuery = supabaseQuery.ilike('field', `%${filters.field}%`);
        }
        if (filters.location) {
          supabaseQuery = supabaseQuery.ilike(
            'location',
            `%${filters.location}%`
          );
        }
        if (filters.is_verified !== undefined) {
          supabaseQuery = supabaseQuery.eq('is_verified', filters.is_verified);
        }
        if (filters.is_active !== undefined) {
          supabaseQuery = supabaseQuery.eq('is_active', filters.is_active);
        }

        // Apply sorting
        if (options.sort_by === 'date') {
          supabaseQuery = supabaseQuery.order('created_at', {
            ascending: false,
          });
        } else if (options.sort_by === 'popularity') {
          supabaseQuery = supabaseQuery.order('connections_count', {
            ascending: false,
          });
        } else {
          // Default to relevance (text search ranking)
          supabaseQuery = supabaseQuery.order('created_at', {
            ascending: false,
          });
        }

        // Apply pagination
        const limit = options.limit || 20;
        const offset = options.offset || 0;
        supabaseQuery = supabaseQuery.range(offset, offset + limit - 1);

        const { data, error, count } = await supabaseQuery;

        if (error) {
          return { data: null, error: error.message, count: 0 };
        }

        const searchResults: SearchResult[] = (data || []).map((user) => ({
          id: user.id,
          type: 'user' as const,
          title: user.display_name,
          description: user.bio,
          author: {
            id: user.id,
            display_name: user.display_name,
            avatar: user.avatar,
            role: user.role,
          },
          created_at: user.created_at,
          updated_at: user.updated_at,
          metadata: {
            university: user.university,
            field: user.field,
            location: user.location,
            is_verified: user.is_verified,
            is_active: user.is_active,
          },
        }));

        return { data: searchResults, error: null, count: count || 0 };
      } catch (error: any) {
        return {
          data: null,
          error: error.message || 'Search failed',
          count: 0,
        };
      } finally {
        setSearching(false);
      }
    },
    []
  );

  const searchPosts = useCallback(
    async (
      query: string,
      filters: SearchFilters = {},
      options: SearchOptions = {}
    ): Promise<{
      data: SearchResult[] | null;
      error: string | null;
      count: number;
    }> => {
      setSearching(true);

      try {
        let supabaseQuery = supabase
          .from('posts')
          .select(
            `
          id,
          content,
          post_type,
          created_at,
          updated_at,
          author:author_id(
            id,
            display_name,
            avatar,
            role
          )
        `
          )
          .textSearch('content', query, {
            type: 'websearch',
            config: 'english',
          });

        // Apply filters
        if (filters.type) {
          supabaseQuery = supabaseQuery.eq('post_type', filters.type);
        }
        if (filters.date_from) {
          supabaseQuery = supabaseQuery.gte('created_at', filters.date_from);
        }
        if (filters.date_to) {
          supabaseQuery = supabaseQuery.lte('created_at', filters.date_to);
        }

        // Apply sorting
        if (options.sort_by === 'date') {
          supabaseQuery = supabaseQuery.order('created_at', {
            ascending: false,
          });
        } else if (options.sort_by === 'popularity') {
          supabaseQuery = supabaseQuery.order('likes_count', {
            ascending: false,
          });
        } else {
          supabaseQuery = supabaseQuery.order('created_at', {
            ascending: false,
          });
        }

        // Apply pagination
        const limit = options.limit || 20;
        const offset = options.offset || 0;
        supabaseQuery = supabaseQuery.range(offset, offset + limit - 1);

        const { data, error, count } = await supabaseQuery;

        if (error) {
          return { data: null, error: error.message, count: 0 };
        }

        const searchResults: SearchResult[] = (data || []).map((post) => ({
          id: post.id,
          type: 'post' as const,
          title:
            post.content.substring(0, 100) +
            (post.content.length > 100 ? '...' : ''),
          description: post.content,
          author: post.author,
          created_at: post.created_at,
          updated_at: post.updated_at,
          metadata: {
            post_type: post.post_type,
          },
        }));

        return { data: searchResults, error: null, count: count || 0 };
      } catch (error: any) {
        return {
          data: null,
          error: error.message || 'Search failed',
          count: 0,
        };
      } finally {
        setSearching(false);
      }
    },
    []
  );

  const searchGroups = useCallback(
    async (
      query: string,
      filters: SearchFilters = {},
      options: SearchOptions = {}
    ): Promise<{
      data: SearchResult[] | null;
      error: string | null;
      count: number;
    }> => {
      setSearching(true);

      try {
        let supabaseQuery = supabase
          .from('groups')
          .select(
            `
          id,
          name,
          description,
          category,
          university,
          is_public,
          member_count,
          created_at,
          updated_at,
          creator:creator_id(
            id,
            display_name,
            avatar,
            role
          )
        `
          )
          .textSearch('name, description', query, {
            type: 'websearch',
            config: 'english',
          });

        // Apply filters
        if (filters.category) {
          supabaseQuery = supabaseQuery.eq('category', filters.category);
        }
        if (filters.university) {
          supabaseQuery = supabaseQuery.ilike(
            'university',
            `%${filters.university}%`
          );
        }
        if (filters.is_active !== undefined) {
          supabaseQuery = supabaseQuery.eq('is_active', filters.is_active);
        }

        // Apply sorting
        if (options.sort_by === 'date') {
          supabaseQuery = supabaseQuery.order('created_at', {
            ascending: false,
          });
        } else if (options.sort_by === 'popularity') {
          supabaseQuery = supabaseQuery.order('member_count', {
            ascending: false,
          });
        } else {
          supabaseQuery = supabaseQuery.order('created_at', {
            ascending: false,
          });
        }

        // Apply pagination
        const limit = options.limit || 20;
        const offset = options.offset || 0;
        supabaseQuery = supabaseQuery.range(offset, offset + limit - 1);

        const { data, error, count } = await supabaseQuery;

        if (error) {
          return { data: null, error: error.message, count: 0 };
        }

        const searchResults: SearchResult[] = (data || []).map((group) => ({
          id: group.id,
          type: 'group' as const,
          title: group.name,
          description: group.description,
          author: group.creator,
          created_at: group.created_at,
          updated_at: group.updated_at,
          metadata: {
            category: group.category,
            university: group.university,
            is_public: group.is_public,
            member_count: group.member_count,
          },
        }));

        return { data: searchResults, error: null, count: count || 0 };
      } catch (error: any) {
        return {
          data: null,
          error: error.message || 'Search failed',
          count: 0,
        };
      } finally {
        setSearching(false);
      }
    },
    []
  );

  const searchPrograms = useCallback(
    async (
      query: string,
      filters: SearchFilters = {},
      options: SearchOptions = {}
    ): Promise<{
      data: SearchResult[] | null;
      error: string | null;
      count: number;
    }> => {
      setSearching(true);

      try {
        let supabaseQuery = supabase
          .from('university_programs')
          .select(
            `
          id,
          title,
          description,
          program_type,
          university,
          field,
          is_active,
          application_deadline,
          created_at,
          updated_at,
          university_profile:university_id(
            id,
            display_name,
            avatar,
            role
          )
        `
          )
          .textSearch('title, description, field', query, {
            type: 'websearch',
            config: 'english',
          });

        // Apply filters
        if (filters.type) {
          supabaseQuery = supabaseQuery.eq('program_type', filters.type);
        }
        if (filters.university) {
          supabaseQuery = supabaseQuery.ilike(
            'university',
            `%${filters.university}%`
          );
        }
        if (filters.field) {
          supabaseQuery = supabaseQuery.ilike('field', `%${filters.field}%`);
        }
        if (filters.is_active !== undefined) {
          supabaseQuery = supabaseQuery.eq('is_active', filters.is_active);
        }

        // Apply sorting
        if (options.sort_by === 'date') {
          supabaseQuery = supabaseQuery.order('created_at', {
            ascending: false,
          });
        } else if (options.sort_by === 'popularity') {
          supabaseQuery = supabaseQuery.order('application_count', {
            ascending: false,
          });
        } else {
          supabaseQuery = supabaseQuery.order('created_at', {
            ascending: false,
          });
        }

        // Apply pagination
        const limit = options.limit || 20;
        const offset = options.offset || 0;
        supabaseQuery = supabaseQuery.range(offset, offset + limit - 1);

        const { data, error, count } = await supabaseQuery;

        if (error) {
          return { data: null, error: error.message, count: 0 };
        }

        const searchResults: SearchResult[] = (data || []).map((program) => ({
          id: program.id,
          type: 'program' as const,
          title: program.title,
          description: program.description,
          author: program.university_profile,
          created_at: program.created_at,
          updated_at: program.updated_at,
          metadata: {
            program_type: program.program_type,
            university: program.university,
            field: program.field,
            is_active: program.is_active,
            application_deadline: program.application_deadline,
          },
        }));

        return { data: searchResults, error: null, count: count || 0 };
      } catch (error: any) {
        return {
          data: null,
          error: error.message || 'Search failed',
          count: 0,
        };
      } finally {
        setSearching(false);
      }
    },
    []
  );

  const searchJobs = useCallback(
    async (
      query: string,
      filters: SearchFilters = {},
      options: SearchOptions = {}
    ): Promise<{
      data: SearchResult[] | null;
      error: string | null;
      count: number;
    }> => {
      setSearching(true);

      try {
        let supabaseQuery = supabase
          .from('job_postings')
          .select(
            `
          id,
          title,
          description,
          job_type,
          location,
          company,
          field,
          is_active,
          application_deadline,
          created_at,
          updated_at,
          poster:poster_id(
            id,
            display_name,
            avatar,
            role
          )
        `
          )
          .textSearch('title, description, company, field', query, {
            type: 'websearch',
            config: 'english',
          });

        // Apply filters
        if (filters.type) {
          supabaseQuery = supabaseQuery.eq('job_type', filters.type);
        }
        if (filters.location) {
          supabaseQuery = supabaseQuery.ilike(
            'location',
            `%${filters.location}%`
          );
        }
        if (filters.field) {
          supabaseQuery = supabaseQuery.ilike('field', `%${filters.field}%`);
        }
        if (filters.is_active !== undefined) {
          supabaseQuery = supabaseQuery.eq('is_active', filters.is_active);
        }

        // Apply sorting
        if (options.sort_by === 'date') {
          supabaseQuery = supabaseQuery.order('created_at', {
            ascending: false,
          });
        } else if (options.sort_by === 'popularity') {
          supabaseQuery = supabaseQuery.order('application_count', {
            ascending: false,
          });
        } else {
          supabaseQuery = supabaseQuery.order('created_at', {
            ascending: false,
          });
        }

        // Apply pagination
        const limit = options.limit || 20;
        const offset = options.offset || 0;
        supabaseQuery = supabaseQuery.range(offset, offset + limit - 1);

        const { data, error, count } = await supabaseQuery;

        if (error) {
          return { data: null, error: error.message, count: 0 };
        }

        const searchResults: SearchResult[] = (data || []).map((job) => ({
          id: job.id,
          type: 'job' as const,
          title: job.title,
          description: job.description,
          author: job.poster,
          created_at: job.created_at,
          updated_at: job.updated_at,
          metadata: {
            job_type: job.job_type,
            location: job.location,
            company: job.company,
            field: job.field,
            is_active: job.is_active,
            application_deadline: job.application_deadline,
          },
        }));

        return { data: searchResults, error: null, count: count || 0 };
      } catch (error: any) {
        return {
          data: null,
          error: error.message || 'Search failed',
          count: 0,
        };
      } finally {
        setSearching(false);
      }
    },
    []
  );

  const searchScholarships = useCallback(
    async (
      query: string,
      filters: SearchFilters = {},
      options: SearchOptions = {}
    ): Promise<{
      data: SearchResult[] | null;
      error: string | null;
      count: number;
    }> => {
      setSearching(true);

      try {
        let supabaseQuery = supabase
          .from('scholarships')
          .select(
            `
          id,
          title,
          description,
          scholarship_type,
          amount,
          field,
          is_active,
          application_deadline,
          created_at,
          updated_at,
          provider:provider_id(
            id,
            display_name,
            avatar,
            role
          )
        `
          )
          .textSearch('title, description, field', query, {
            type: 'websearch',
            config: 'english',
          });

        // Apply filters
        if (filters.type) {
          supabaseQuery = supabaseQuery.eq('scholarship_type', filters.type);
        }
        if (filters.field) {
          supabaseQuery = supabaseQuery.ilike('field', `%${filters.field}%`);
        }
        if (filters.is_active !== undefined) {
          supabaseQuery = supabaseQuery.eq('is_active', filters.is_active);
        }

        // Apply sorting
        if (options.sort_by === 'date') {
          supabaseQuery = supabaseQuery.order('created_at', {
            ascending: false,
          });
        } else if (options.sort_by === 'popularity') {
          supabaseQuery = supabaseQuery.order('application_count', {
            ascending: false,
          });
        } else {
          supabaseQuery = supabaseQuery.order('created_at', {
            ascending: false,
          });
        }

        // Apply pagination
        const limit = options.limit || 20;
        const offset = options.offset || 0;
        supabaseQuery = supabaseQuery.range(offset, offset + limit - 1);

        const { data, error, count } = await supabaseQuery;

        if (error) {
          return { data: null, error: error.message, count: 0 };
        }

        const searchResults: SearchResult[] = (data || []).map(
          (scholarship) => ({
            id: scholarship.id,
            type: 'scholarship' as const,
            title: scholarship.title,
            description: scholarship.description,
            author: scholarship.provider,
            created_at: scholarship.created_at,
            updated_at: scholarship.updated_at,
            metadata: {
              scholarship_type: scholarship.scholarship_type,
              amount: scholarship.amount,
              field: scholarship.field,
              is_active: scholarship.is_active,
              application_deadline: scholarship.application_deadline,
            },
          })
        );

        return { data: searchResults, error: null, count: count || 0 };
      } catch (error: any) {
        return {
          data: null,
          error: error.message || 'Search failed',
          count: 0,
        };
      } finally {
        setSearching(false);
      }
    },
    []
  );

  const globalSearch = useCallback(
    async (
      query: string,
      filters: SearchFilters = {},
      options: SearchOptions = {}
    ): Promise<{
      data: SearchResult[] | null;
      error: string | null;
      count: number;
    }> => {
      setSearching(true);

      try {
        // Perform searches in parallel
        const [
          usersResult,
          postsResult,
          groupsResult,
          programsResult,
          jobsResult,
          scholarshipsResult,
        ] = await Promise.all([
          searchUsers(query, filters, {
            ...options,
            limit: Math.ceil((options.limit || 20) / 6),
          }),
          searchPosts(query, filters, {
            ...options,
            limit: Math.ceil((options.limit || 20) / 6),
          }),
          searchGroups(query, filters, {
            ...options,
            limit: Math.ceil((options.limit || 20) / 6),
          }),
          searchPrograms(query, filters, {
            ...options,
            limit: Math.ceil((options.limit || 20) / 6),
          }),
          searchJobs(query, filters, {
            ...options,
            limit: Math.ceil((options.limit || 20) / 6),
          }),
          searchScholarships(query, filters, {
            ...options,
            limit: Math.ceil((options.limit || 20) / 6),
          }),
        ]);

        // Combine results
        const allResults: SearchResult[] = [
          ...(usersResult.data || []),
          ...(postsResult.data || []),
          ...(groupsResult.data || []),
          ...(programsResult.data || []),
          ...(jobsResult.data || []),
          ...(scholarshipsResult.data || []),
        ];

        // Sort by relevance/date
        if (options.sort_by === 'date') {
          allResults.sort(
            (a, b) =>
              new Date(b.created_at).getTime() -
              new Date(a.created_at).getTime()
          );
        }

        const totalCount =
          (usersResult.count || 0) +
          (postsResult.count || 0) +
          (groupsResult.count || 0) +
          (programsResult.count || 0) +
          (jobsResult.count || 0) +
          (scholarshipsResult.count || 0);

        return { data: allResults, error: null, count: totalCount };
      } catch (error: any) {
        return {
          data: null,
          error: error.message || 'Global search failed',
          count: 0,
        };
      } finally {
        setSearching(false);
      }
    },
    [
      searchUsers,
      searchPosts,
      searchGroups,
      searchPrograms,
      searchJobs,
      searchScholarships,
    ]
  );

  const getSearchSuggestions = useCallback(
    async (query: string): Promise<string[]> => {
      if (query.length < 2) return [];

      try {
        // Get suggestions from different sources
        const [usersResult, groupsResult, programsResult] = await Promise.all([
          supabase
            .from('users')
            .select('display_name, university, field')
            .or(
              `display_name.ilike.%${query}%,university.ilike.%${query}%,field.ilike.%${query}%`
            )
            .limit(5),
          supabase
            .from('groups')
            .select('name, category')
            .or(`name.ilike.%${query}%,category.ilike.%${query}%`)
            .limit(5),
          supabase
            .from('university_programs')
            .select('title, field')
            .or(`title.ilike.%${query}%,field.ilike.%${query}%`)
            .limit(5),
        ]);

        const suggestions: string[] = [];

        // Add user suggestions
        usersResult.data?.forEach((user) => {
          if (user.display_name.toLowerCase().includes(query.toLowerCase())) {
            suggestions.push(user.display_name);
          }
          if (user.university?.toLowerCase().includes(query.toLowerCase())) {
            suggestions.push(user.university);
          }
          if (user.field?.toLowerCase().includes(query.toLowerCase())) {
            suggestions.push(user.field);
          }
        });

        // Add group suggestions
        groupsResult.data?.forEach((group) => {
          if (group.name.toLowerCase().includes(query.toLowerCase())) {
            suggestions.push(group.name);
          }
          if (group.category?.toLowerCase().includes(query.toLowerCase())) {
            suggestions.push(group.category);
          }
        });

        // Add program suggestions
        programsResult.data?.forEach((program) => {
          if (program.title.toLowerCase().includes(query.toLowerCase())) {
            suggestions.push(program.title);
          }
          if (program.field?.toLowerCase().includes(query.toLowerCase())) {
            suggestions.push(program.field);
          }
        });

        // Remove duplicates and limit
        return [...new Set(suggestions)].slice(0, 10);
      } catch (error) {
        console.error('Error getting search suggestions:', error);
        return [];
      }
    },
    []
  );

  return {
    searching,
    results,
    totalCount,
    searchUsers,
    searchPosts,
    searchGroups,
    searchPrograms,
    searchJobs,
    searchScholarships,
    globalSearch,
    getSearchSuggestions,
  };
};
