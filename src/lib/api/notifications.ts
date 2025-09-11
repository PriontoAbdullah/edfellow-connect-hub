import { supabase } from '../supabase';
import { Database } from '../../types/database';

// Type definitions
export type Notification = Database['public']['Tables']['notifications']['Row'];
export type NotificationInsert =
  Database['public']['Tables']['notifications']['Insert'];
export type NotificationUpdate =
  Database['public']['Tables']['notifications']['Update'];

export interface NotificationWithSender extends Notification {
  sender?: {
    id: string;
    display_name: string;
    role: string;
    avatar?: string;
  };
}

export interface NotificationFilters {
  type?: string;
  is_read?: boolean;
  priority?: 'low' | 'medium' | 'high';
}

export interface NotificationStats {
  total: number;
  unread: number;
  byType: Record<string, number>;
  byPriority: Record<string, number>;
}

// =============================================
// NOTIFICATIONS API FUNCTIONS
// =============================================

/**
 * Get user notifications
 */
export const getNotifications = async (
  userId: string,
  filters: NotificationFilters = {},
  limit: number = 20,
  offset: number = 0
): Promise<{
  data: NotificationWithSender[] | null;
  error: string | null;
  total?: number;
}> => {
  try {
    let supabaseQuery = supabase
      .from('notifications')
      .select(
        `
        *,
        sender:users!notifications_sender_id_fkey(
          id,
          display_name,
          role,
          avatar
        )
      `,
        { count: 'exact' }
      )
      .eq('user_id', userId);

    // Apply filters
    if (filters.type) {
      supabaseQuery = supabaseQuery.eq('type', filters.type);
    }
    if (filters.is_read !== undefined) {
      supabaseQuery = supabaseQuery.eq('is_read', filters.is_read);
    }
    if (filters.priority) {
      supabaseQuery = supabaseQuery.eq('priority', filters.priority);
    }

    supabaseQuery = supabaseQuery
      .order('created_at', { ascending: false })
      .range(offset, offset + limit - 1);

    const { data, error, count } = await supabaseQuery;

    if (error) {
      console.error('Error fetching notifications:', error);
      return { data: null, error: error.message };
    }

    return {
      data: data as NotificationWithSender[],
      error: null,
      total: count || 0,
    };
  } catch (error) {
    console.error('Unexpected error fetching notifications:', error);
    return { data: null, error: 'An unexpected error occurred' };
  }
};

/**
 * Get unread notifications count
 */
export const getUnreadNotificationsCount = async (
  userId: string
): Promise<{
  data: number | null;
  error: string | null;
}> => {
  try {
    const { count, error } = await supabase
      .from('notifications')
      .select('*', { count: 'exact', head: true })
      .eq('user_id', userId)
      .eq('is_read', false);

    if (error) {
      console.error('Error fetching unread notifications count:', error);
      return { data: null, error: error.message };
    }

    return { data: count || 0, error: null };
  } catch (error) {
    console.error(
      'Unexpected error fetching unread notifications count:',
      error
    );
    return { data: null, error: 'An unexpected error occurred' };
  }
};

/**
 * Mark notification as read
 */
export const markNotificationAsRead = async (
  notificationId: string
): Promise<{
  data: Notification | null;
  error: string | null;
}> => {
  try {
    const { data, error } = await supabase
      .from('notifications')
      .update({
        is_read: true,
        read_at: new Date().toISOString(),
      })
      .eq('id', notificationId)
      .select()
      .single();

    if (error) {
      console.error('Error marking notification as read:', error);
      return { data: null, error: error.message };
    }

    return { data, error: null };
  } catch (error) {
    console.error('Unexpected error marking notification as read:', error);
    return { data: null, error: 'An unexpected error occurred' };
  }
};

/**
 * Mark all notifications as read
 */
export const markAllNotificationsAsRead = async (
  userId: string
): Promise<{
  error: string | null;
}> => {
  try {
    const { error } = await supabase
      .from('notifications')
      .update({
        is_read: true,
        read_at: new Date().toISOString(),
      })
      .eq('user_id', userId)
      .eq('is_read', false);

    if (error) {
      console.error('Error marking all notifications as read:', error);
      return { error: error.message };
    }

    return { error: null };
  } catch (error) {
    console.error('Unexpected error marking all notifications as read:', error);
    return { error: 'An unexpected error occurred' };
  }
};

/**
 * Delete notification
 */
export const deleteNotification = async (
  notificationId: string
): Promise<{
  error: string | null;
}> => {
  try {
    const { error } = await supabase
      .from('notifications')
      .delete()
      .eq('id', notificationId);

    if (error) {
      console.error('Error deleting notification:', error);
      return { error: error.message };
    }

    return { error: null };
  } catch (error) {
    console.error('Unexpected error deleting notification:', error);
    return { error: 'An unexpected error occurred' };
  }
};

/**
 * Delete all notifications
 */
export const deleteAllNotifications = async (
  userId: string
): Promise<{
  error: string | null;
}> => {
  try {
    const { error } = await supabase
      .from('notifications')
      .delete()
      .eq('user_id', userId);

    if (error) {
      console.error('Error deleting all notifications:', error);
      return { error: error.message };
    }

    return { error: null };
  } catch (error) {
    console.error('Unexpected error deleting all notifications:', error);
    return { error: 'An unexpected error occurred' };
  }
};

/**
 * Create notification
 */
export const createNotification = async (
  notificationData: NotificationInsert
): Promise<{
  data: Notification | null;
  error: string | null;
}> => {
  try {
    const { data, error } = await supabase
      .from('notifications')
      .insert(notificationData)
      .select()
      .single();

    if (error) {
      console.error('Error creating notification:', error);
      return { data: null, error: error.message };
    }

    return { data, error: null };
  } catch (error) {
    console.error('Unexpected error creating notification:', error);
    return { data: null, error: 'An unexpected error occurred' };
  }
};

/**
 * Get notification statistics
 */
export const getNotificationStats = async (
  userId: string
): Promise<{
  data: NotificationStats | null;
  error: string | null;
}> => {
  try {
    // Get total notifications
    const { count: total } = await supabase
      .from('notifications')
      .select('*', { count: 'exact', head: true })
      .eq('user_id', userId);

    // Get unread notifications
    const { count: unread } = await supabase
      .from('notifications')
      .select('*', { count: 'exact', head: true })
      .eq('user_id', userId)
      .eq('is_read', false);

    // Get notifications by type
    const { data: typeData } = await supabase
      .from('notifications')
      .select('type')
      .eq('user_id', userId);

    const byType =
      typeData?.reduce((acc, notification) => {
        acc[notification.type] = (acc[notification.type] || 0) + 1;
        return acc;
      }, {} as Record<string, number>) || {};

    // Get notifications by priority
    const { data: priorityData } = await supabase
      .from('notifications')
      .select('priority')
      .eq('user_id', userId);

    const byPriority =
      priorityData?.reduce((acc, notification) => {
        acc[notification.priority] = (acc[notification.priority] || 0) + 1;
        return acc;
      }, {} as Record<string, number>) || {};

    return {
      data: {
        total: total || 0,
        unread: unread || 0,
        byType,
        byPriority,
      },
      error: null,
    };
  } catch (error) {
    console.error('Unexpected error fetching notification stats:', error);
    return { data: null, error: 'An unexpected error occurred' };
  }
};

/**
 * Create system notification
 */
export const createSystemNotification = async (
  userId: string,
  type: string,
  title: string,
  message: string,
  priority: 'low' | 'medium' | 'high' = 'medium',
  metadata?: any
): Promise<{
  data: Notification | null;
  error: string | null;
}> => {
  try {
    const notificationData: NotificationInsert = {
      user_id: userId,
      type,
      title,
      message,
      priority,
      metadata: metadata || {},
      is_read: false,
      created_at: new Date().toISOString(),
    };

    return createNotification(notificationData);
  } catch (error) {
    console.error('Unexpected error creating system notification:', error);
    return { data: null, error: 'An unexpected error occurred' };
  }
};

/**
 * Create connection notification
 */
export const createConnectionNotification = async (
  userId: string,
  senderId: string,
  type: 'connection_request' | 'connection_accepted' | 'connection_declined',
  title: string,
  message: string
): Promise<{
  data: Notification | null;
  error: string | null;
}> => {
  try {
    const notificationData: NotificationInsert = {
      user_id: userId,
      sender_id: senderId,
      type,
      title,
      message,
      priority: type === 'connection_request' ? 'medium' : 'low',
      metadata: { sender_id: senderId },
      is_read: false,
      created_at: new Date().toISOString(),
    };

    return createNotification(notificationData);
  } catch (error) {
    console.error('Unexpected error creating connection notification:', error);
    return { data: null, error: 'An unexpected error occurred' };
  }
};

/**
 * Create group notification
 */
export const createGroupNotification = async (
  userId: string,
  groupId: string,
  type: 'group_invite' | 'group_post' | 'group_mention',
  title: string,
  message: string,
  senderId?: string
): Promise<{
  data: Notification | null;
  error: string | null;
}> => {
  try {
    const notificationData: NotificationInsert = {
      user_id: userId,
      sender_id: senderId,
      type,
      title,
      message,
      priority: type === 'group_invite' ? 'high' : 'medium',
      metadata: { group_id: groupId, sender_id: senderId },
      is_read: false,
      created_at: new Date().toISOString(),
    };

    return createNotification(notificationData);
  } catch (error) {
    console.error('Unexpected error creating group notification:', error);
    return { data: null, error: 'An unexpected error occurred' };
  }
};

/**
 * Create job notification
 */
export const createJobNotification = async (
  userId: string,
  jobId: string,
  type: 'job_application' | 'job_update' | 'job_match',
  title: string,
  message: string,
  senderId?: string
): Promise<{
  data: Notification | null;
  error: string | null;
}> => {
  try {
    const notificationData: NotificationInsert = {
      user_id: userId,
      sender_id: senderId,
      type,
      title,
      message,
      priority: type === 'job_match' ? 'high' : 'medium',
      metadata: { job_id: jobId, sender_id: senderId },
      is_read: false,
      created_at: new Date().toISOString(),
    };

    return createNotification(notificationData);
  } catch (error) {
    console.error('Unexpected error creating job notification:', error);
    return { data: null, error: 'An unexpected error occurred' };
  }
};

/**
 * Create mentorship notification
 */
export const createMentorshipNotification = async (
  userId: string,
  sessionId: string,
  type:
    | 'mentorship_request'
    | 'mentorship_accepted'
    | 'mentorship_scheduled'
    | 'mentorship_reminder',
  title: string,
  message: string,
  senderId?: string
): Promise<{
  data: Notification | null;
  error: string | null;
}> => {
  try {
    const notificationData: NotificationInsert = {
      user_id: userId,
      sender_id: senderId,
      type,
      title,
      message,
      priority: type === 'mentorship_request' ? 'high' : 'medium',
      metadata: { session_id: sessionId, sender_id: senderId },
      is_read: false,
      created_at: new Date().toISOString(),
    };

    return createNotification(notificationData);
  } catch (error) {
    console.error('Unexpected error creating mentorship notification:', error);
    return { data: null, error: 'An unexpected error occurred' };
  }
};

/**
 * Subscribe to notifications
 */
export const subscribeToNotifications = (
  userId: string,
  callback: (payload: any) => void
) => {
  let subscription = supabase
    .channel('notifications_changes')
    .on(
      'postgres_changes',
      {
        event: '*',
        schema: 'public',
        table: 'notifications',
        filter: `user_id=eq.${userId}`,
      },
      callback
    )
    .subscribe();

  return () => {
    subscription.unsubscribe();
  };
};
