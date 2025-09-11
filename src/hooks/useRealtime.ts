import { useEffect, useRef, useState } from 'react';
import { RealtimeChannel } from '@supabase/supabase-js';
import { supabase } from '@/lib/supabase';
import { useAuth } from '@/contexts/AuthContext';

export interface RealtimeMessage {
  id: string;
  sender_id: string;
  receiver_id: string;
  content: string;
  message_type: 'text' | 'image' | 'file' | 'system';
  created_at: string;
  read_at?: string;
  sender?: {
    id: string;
    display_name: string;
    avatar?: string;
  };
}

export interface RealtimeNotification {
  id: string;
  user_id: string;
  type:
    | 'connection_request'
    | 'message'
    | 'group_invite'
    | 'job_application'
    | 'mentorship_request'
    | 'system';
  title: string;
  message: string;
  data?: any;
  is_read: boolean;
  created_at: string;
}

export interface RealtimeConnection {
  id: string;
  requester_id: string;
  receiver_id: string;
  status: 'pending' | 'accepted' | 'declined';
  created_at: string;
  requester?: {
    id: string;
    display_name: string;
    avatar?: string;
  };
  receiver?: {
    id: string;
    display_name: string;
    avatar?: string;
  };
}

export interface RealtimePost {
  id: string;
  author_id: string;
  content: string;
  post_type: 'text' | 'image' | 'link' | 'poll';
  created_at: string;
  updated_at: string;
  author?: {
    id: string;
    display_name: string;
    avatar?: string;
  };
}

export const useRealtime = () => {
  const { user } = useAuth();
  const [isConnected, setIsConnected] = useState(false);
  const [messages, setMessages] = useState<RealtimeMessage[]>([]);
  const [notifications, setNotifications] = useState<RealtimeNotification[]>(
    []
  );
  const [connections, setConnections] = useState<RealtimeConnection[]>([]);
  const [posts, setPosts] = useState<RealtimePost[]>([]);

  const channelsRef = useRef<Map<string, RealtimeChannel>>(new Map());

  useEffect(() => {
    if (!user) {
      // Clean up all channels when user logs out
      channelsRef.current.forEach((channel) => {
        channel.unsubscribe();
      });
      channelsRef.current.clear();
      setIsConnected(false);
      return;
    }

    const setupRealtimeSubscriptions = async () => {
      try {
        // Messages channel
        const messagesChannel = supabase
          .channel('messages')
          .on(
            'postgres_changes',
            {
              event: 'INSERT',
              schema: 'public',
              table: 'messages',
              filter: `receiver_id=eq.${user.id}`,
            },
            (payload) => {
              const newMessage = payload.new as RealtimeMessage;
              setMessages((prev) => [newMessage, ...prev]);
            }
          )
          .on(
            'postgres_changes',
            {
              event: 'UPDATE',
              schema: 'public',
              table: 'messages',
              filter: `receiver_id=eq.${user.id}`,
            },
            (payload) => {
              const updatedMessage = payload.new as RealtimeMessage;
              setMessages((prev) =>
                prev.map((msg) =>
                  msg.id === updatedMessage.id ? updatedMessage : msg
                )
              );
            }
          )
          .subscribe();

        channelsRef.current.set('messages', messagesChannel);

        // Notifications channel
        const notificationsChannel = supabase
          .channel('notifications')
          .on(
            'postgres_changes',
            {
              event: 'INSERT',
              schema: 'public',
              table: 'notifications',
              filter: `user_id=eq.${user.id}`,
            },
            (payload) => {
              const newNotification = payload.new as RealtimeNotification;
              setNotifications((prev) => [newNotification, ...prev]);
            }
          )
          .on(
            'postgres_changes',
            {
              event: 'UPDATE',
              schema: 'public',
              table: 'notifications',
              filter: `user_id=eq.${user.id}`,
            },
            (payload) => {
              const updatedNotification = payload.new as RealtimeNotification;
              setNotifications((prev) =>
                prev.map((notif) =>
                  notif.id === updatedNotification.id
                    ? updatedNotification
                    : notif
                )
              );
            }
          )
          .subscribe();

        channelsRef.current.set('notifications', notificationsChannel);

        // Connections channel
        const connectionsChannel = supabase
          .channel('connections')
          .on(
            'postgres_changes',
            {
              event: 'INSERT',
              schema: 'public',
              table: 'connections',
              filter: `receiver_id=eq.${user.id}`,
            },
            (payload) => {
              const newConnection = payload.new as RealtimeConnection;
              setConnections((prev) => [newConnection, ...prev]);
            }
          )
          .on(
            'postgres_changes',
            {
              event: 'UPDATE',
              schema: 'public',
              table: 'connections',
              filter: `receiver_id=eq.${user.id}`,
            },
            (payload) => {
              const updatedConnection = payload.new as RealtimeConnection;
              setConnections((prev) =>
                prev.map((conn) =>
                  conn.id === updatedConnection.id ? updatedConnection : conn
                )
              );
            }
          )
          .subscribe();

        channelsRef.current.set('connections', connectionsChannel);

        // Posts channel (for feed updates)
        const postsChannel = supabase
          .channel('posts')
          .on(
            'postgres_changes',
            {
              event: 'INSERT',
              schema: 'public',
              table: 'posts',
            },
            (payload) => {
              const newPost = payload.new as RealtimePost;
              setPosts((prev) => [newPost, ...prev]);
            }
          )
          .on(
            'postgres_changes',
            {
              event: 'UPDATE',
              schema: 'public',
              table: 'posts',
            },
            (payload) => {
              const updatedPost = payload.new as RealtimePost;
              setPosts((prev) =>
                prev.map((post) =>
                  post.id === updatedPost.id ? updatedPost : post
                )
              );
            }
          )
          .subscribe();

        channelsRef.current.set('posts', postsChannel);

        setIsConnected(true);
      } catch (error) {
        console.error('Error setting up realtime subscriptions:', error);
        setIsConnected(false);
      }
    };

    setupRealtimeSubscriptions();

    return () => {
      // Cleanup on unmount
      channelsRef.current.forEach((channel) => {
        channel.unsubscribe();
      });
      channelsRef.current.clear();
      setIsConnected(false);
    };
  }, [user]);

  const sendMessage = async (
    receiverId: string,
    content: string,
    messageType: 'text' | 'image' | 'file' = 'text'
  ) => {
    if (!user) return { error: 'User not authenticated' };

    try {
      const { data, error } = await supabase
        .from('messages')
        .insert({
          sender_id: user.id,
          receiver_id: receiverId,
          content,
          message_type: messageType,
        })
        .select()
        .single();

      if (error) {
        return { error: error.message };
      }

      return { data };
    } catch (error) {
      return { error: 'Failed to send message' };
    }
  };

  const markMessageAsRead = async (messageId: string) => {
    try {
      const { error } = await supabase
        .from('messages')
        .update({ read_at: new Date().toISOString() })
        .eq('id', messageId);

      if (error) {
        return { error: error.message };
      }

      return { success: true };
    } catch (error) {
      return { error: 'Failed to mark message as read' };
    }
  };

  const markNotificationAsRead = async (notificationId: string) => {
    try {
      const { error } = await supabase
        .from('notifications')
        .update({ is_read: true })
        .eq('id', notificationId);

      if (error) {
        return { error: error.message };
      }

      return { success: true };
    } catch (error) {
      return { error: 'Failed to mark notification as read' };
    }
  };

  const createNotification = async (
    userId: string,
    type: RealtimeNotification['type'],
    title: string,
    message: string,
    data?: any
  ) => {
    try {
      const { data: notification, error } = await supabase
        .from('notifications')
        .insert({
          user_id: userId,
          type,
          title,
          message,
          data,
        })
        .select()
        .single();

      if (error) {
        return { error: error.message };
      }

      return { data: notification };
    } catch (error) {
      return { error: 'Failed to create notification' };
    }
  };

  const getUnreadCount = () => {
    const unreadMessages = messages.filter((msg) => !msg.read_at).length;
    const unreadNotifications = notifications.filter(
      (notif) => !notif.is_read
    ).length;
    const pendingConnections = connections.filter(
      (conn) => conn.status === 'pending'
    ).length;

    return {
      messages: unreadMessages,
      notifications: unreadNotifications,
      connections: pendingConnections,
      total: unreadMessages + unreadNotifications + pendingConnections,
    };
  };

  return {
    isConnected,
    messages,
    notifications,
    connections,
    posts,
    sendMessage,
    markMessageAsRead,
    markNotificationAsRead,
    createNotification,
    getUnreadCount,
  };
};

// Hook for specific chat conversations
export const useChatRealtime = (conversationId?: string) => {
  const { user } = useAuth();
  const [conversationMessages, setConversationMessages] = useState<
    RealtimeMessage[]
  >([]);
  const [isTyping, setIsTyping] = useState<{ [userId: string]: boolean }>({});
  const channelRef = useRef<RealtimeChannel | null>(null);

  useEffect(() => {
    if (!user || !conversationId) {
      if (channelRef.current) {
        channelRef.current.unsubscribe();
        channelRef.current = null;
      }
      return;
    }

    const setupChatChannel = () => {
      const channel = supabase
        .channel(`chat:${conversationId}`)
        .on(
          'postgres_changes',
          {
            event: 'INSERT',
            schema: 'public',
            table: 'messages',
            filter: `conversation_id=eq.${conversationId}`,
          },
          (payload) => {
            const newMessage = payload.new as RealtimeMessage;
            setConversationMessages((prev) => [...prev, newMessage]);
          }
        )
        .on('presence', { event: 'sync' }, () => {
          const state = channel.presenceState();
          const typingUsers: { [userId: string]: boolean } = {};

          Object.values(state).forEach((presences: any[]) => {
            presences.forEach((presence: any) => {
              if (presence.user_id !== user.id && presence.typing) {
                typingUsers[presence.user_id] = true;
              }
            });
          });

          setIsTyping(typingUsers);
        })
        .on('presence', { event: 'join' }, ({ key, newPresences }) => {
          // Handle user joining
        })
        .on('presence', { event: 'leave' }, ({ key, leftPresences }) => {
          // Handle user leaving
        })
        .subscribe(async (status) => {
          if (status === 'SUBSCRIBED') {
            await channel.track({
              user_id: user.id,
              online_at: new Date().toISOString(),
            });
          }
        });

      channelRef.current = channel;
    };

    setupChatChannel();

    return () => {
      if (channelRef.current) {
        channelRef.current.unsubscribe();
        channelRef.current = null;
      }
    };
  }, [user, conversationId]);

  const sendTypingIndicator = (isTyping: boolean) => {
    if (channelRef.current && user) {
      channelRef.current.track({
        user_id: user.id,
        typing: isTyping,
        online_at: new Date().toISOString(),
      });
    }
  };

  return {
    conversationMessages,
    isTyping,
    sendTypingIndicator,
  };
};

// Hook for live feed updates
export const useFeedRealtime = () => {
  const { user } = useAuth();
  const [feedPosts, setFeedPosts] = useState<RealtimePost[]>([]);
  const [isConnected, setIsConnected] = useState(false);
  const channelRef = useRef<RealtimeChannel | null>(null);

  useEffect(() => {
    if (!user) {
      if (channelRef.current) {
        channelRef.current.unsubscribe();
        channelRef.current = null;
      }
      setIsConnected(false);
      return;
    }

    const setupFeedChannel = () => {
      const channel = supabase
        .channel('feed')
        .on(
          'postgres_changes',
          {
            event: 'INSERT',
            schema: 'public',
            table: 'posts',
          },
          (payload) => {
            const newPost = payload.new as RealtimePost;
            setFeedPosts((prev) => [newPost, ...prev]);
          }
        )
        .on(
          'postgres_changes',
          {
            event: 'UPDATE',
            schema: 'public',
            table: 'posts',
          },
          (payload) => {
            const updatedPost = payload.new as RealtimePost;
            setFeedPosts((prev) =>
              prev.map((post) =>
                post.id === updatedPost.id ? updatedPost : post
              )
            );
          }
        )
        .subscribe((status) => {
          setIsConnected(status === 'SUBSCRIBED');
        });

      channelRef.current = channel;
    };

    setupFeedChannel();

    return () => {
      if (channelRef.current) {
        channelRef.current.unsubscribe();
        channelRef.current = null;
      }
      setIsConnected(false);
    };
  }, [user]);

  return {
    feedPosts,
    isConnected,
  };
};
