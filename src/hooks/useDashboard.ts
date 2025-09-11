import { useState, useEffect, useCallback } from 'react';
import { supabase } from '@/lib/supabase';
import { useAuth } from '@/contexts/AuthContext';

export interface DashboardStats {
  totalConnections: number;
  totalPosts: number;
  totalGroups: number;
  totalNotifications: number;
  profileViews: number;
  endorsements: number;
}

export interface RecentActivity {
  id: string;
  type: 'post' | 'connection' | 'group' | 'notification';
  title: string;
  description: string;
  timestamp: string;
  avatar?: string;
}

export interface DashboardData {
  stats: DashboardStats;
  recentActivity: RecentActivity[];
  notifications: any[];
  connections: any[];
  groups: any[];
  posts: any[];
}

export const useDashboard = () => {
  const { userData } = useAuth();
  const [data, setData] = useState<DashboardData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const loadDashboardData = useCallback(async () => {
    if (!userData?.id) return;

    setLoading(true);
    setError(null);

    try {
      // Get user stats
      const [
        connectionsResult,
        postsResult,
        groupsResult,
        notificationsResult,
      ] = await Promise.all([
        supabase
          .from('user_connections')
          .select('*', { count: 'exact', head: true })
          .or(`requester_id.eq.${userData.id},addressee_id.eq.${userData.id}`)
          .eq('status', 'accepted'),

        supabase
          .from('posts')
          .select('*', { count: 'exact', head: true })
          .eq('author_id', userData.id),

        supabase
          .from('group_members')
          .select('*', { count: 'exact', head: true })
          .eq('user_id', userData.id),

        supabase
          .from('notifications')
          .select('*', { count: 'exact', head: true })
          .eq('user_id', userData.id)
          .eq('is_read', false),
      ]);

      // Get recent activity
      const [
        recentPosts,
        recentConnections,
        recentGroups,
        recentNotifications,
      ] = await Promise.all([
        supabase
          .from('posts')
          .select(
            `
            id,
            content,
            post_type,
            created_at,
            author:author_id (
              id,
              display_name,
              avatar
            )
          `
          )
          .order('created_at', { ascending: false })
          .limit(5),

        supabase
          .from('user_connections')
          .select(
            `
            id,
            status,
            created_at,
            requester:requester_id (
              id,
              display_name,
              avatar
            ),
            addressee:addressee_id (
              id,
              display_name,
              avatar
            )
          `
          )
          .or(`requester_id.eq.${userData.id},addressee_id.eq.${userData.id}`)
          .order('created_at', { ascending: false })
          .limit(5),

        supabase
          .from('group_members')
          .select(
            `
            id,
            role,
            joined_at,
            group:group_id (
              id,
              name,
              description
            )
          `
          )
          .eq('user_id', userData.id)
          .order('joined_at', { ascending: false })
          .limit(5),

        supabase
          .from('notifications')
          .select('*')
          .eq('user_id', userData.id)
          .order('created_at', { ascending: false })
          .limit(5),
      ]);

      // Get detailed data
      const [notifications, connections, groups, posts] = await Promise.all([
        supabase
          .from('notifications')
          .select('*')
          .eq('user_id', userData.id)
          .order('created_at', { ascending: false })
          .limit(10),

        supabase
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
              university
            ),
            addressee:addressee_id (
              id,
              display_name,
              avatar,
              role,
              university
            )
          `
          )
          .or(`requester_id.eq.${userData.id},addressee_id.eq.${userData.id}`)
          .eq('status', 'accepted')
          .limit(10),

        supabase
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
              member_count
            )
          `
          )
          .eq('user_id', userData.id)
          .limit(10),

        supabase
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
              role
            )
          `
          )
          .order('created_at', { ascending: false })
          .limit(10),
      ]);

      // Transform recent activity
      const recentActivity: RecentActivity[] = [
        ...(recentPosts.data?.map((post) => ({
          id: post.id,
          type: 'post' as const,
          title: 'New Post',
          description: post.content.substring(0, 100) + '...',
          timestamp: post.created_at,
          avatar: post.author?.avatar,
        })) || []),
        ...(recentConnections.data?.map((conn) => ({
          id: conn.id,
          type: 'connection' as const,
          title: 'New Connection',
          description: `Connected with ${
            conn.requester?.id === userData.id
              ? conn.addressee?.display_name
              : conn.requester?.display_name
          }`,
          timestamp: conn.created_at,
          avatar:
            conn.requester?.id === userData.id
              ? conn.addressee?.avatar
              : conn.requester?.avatar,
        })) || []),
        ...(recentGroups.data?.map((group) => ({
          id: group.id,
          type: 'group' as const,
          title: 'Joined Group',
          description: `Joined ${group.group?.name}`,
          timestamp: group.joined_at,
          avatar: undefined,
        })) || []),
        ...(recentNotifications.data?.map((notif) => ({
          id: notif.id,
          type: 'notification' as const,
          title: notif.title,
          description: notif.message,
          timestamp: notif.created_at,
          avatar: undefined,
        })) || []),
      ]
        .sort(
          (a, b) =>
            new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime()
        )
        .slice(0, 10);

      const dashboardData: DashboardData = {
        stats: {
          totalConnections: connectionsResult.count || 0,
          totalPosts: postsResult.count || 0,
          totalGroups: groupsResult.count || 0,
          totalNotifications: notificationsResult.count || 0,
          profileViews: userData.profile_views || 0,
          endorsements: userData.endorsements || 0,
        },
        recentActivity,
        notifications: notifications.data || [],
        connections: connections.data || [],
        groups: groups.data || [],
        posts: posts.data || [],
      };

      setData(dashboardData);
    } catch (err) {
      setError(
        err instanceof Error ? err.message : 'Failed to load dashboard data'
      );
    } finally {
      setLoading(false);
    }
  }, [userData?.id]);

  useEffect(() => {
    loadDashboardData();
  }, [loadDashboardData]);

  const refreshData = useCallback(() => {
    loadDashboardData();
  }, [loadDashboardData]);

  return {
    data,
    loading,
    error,
    refreshData,
  };
};
