import { useState, useEffect, useCallback, useRef } from 'react';
import { useAuth } from '../contexts/AuthContext';
import {
  Message,
  Conversation,
  User,
  UserPresence,
  SendMessageData,
  CreateConversationData,
  TypingEvent,
} from '../types/chat';
import {
  getConversations,
  getMessages,
  sendMessage as sendMessageAPI,
  createConversation as createConversationAPI,
  getOrCreateDirectConversation,
  markConversationAsRead,
  searchUsers as searchUsersAPI,
  updateUserPresence,
  getUserPresence,
  getOnlineUsers,
  subscribeToMessages,
  subscribeToConversations,
  subscribeToUserPresence,
  subscribeToTypingIndicators,
  sendTypingIndicator,
} from '../lib/chat';

export const useChat = () => {
  const { user, userData } = useAuth();
  const [conversations, setConversations] = useState<Conversation[]>([]);
  const [currentConversation, setCurrentConversation] =
    useState<Conversation | null>(null);
  const [messages, setMessages] = useState<Message[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [onlineUsers, setOnlineUsers] = useState<Set<string>>(new Set());
  const [typingUsers, setTypingUsers] = useState<Map<string, string[]>>(
    new Map()
  );

  // Refs for subscriptions
  const messageSubscriptionRef = useRef<any>(null);
  const conversationSubscriptionRef = useRef<any>(null);
  const presenceSubscriptionRef = useRef<any>(null);
  const typingSubscriptionRef = useRef<any>(null);
  const typingTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  // Load conversations
  const loadConversations = useCallback(async () => {
    if (!user?.id) return;

    try {
      setLoading(true);
      setError(null);
      const data = await getConversations(user.id);
      setConversations(data);
    } catch (err) {
      console.error('Error loading conversations:', err);
      setError('Failed to load conversations');
    } finally {
      setLoading(false);
    }
  }, [user?.id]);

  // Load messages for a conversation
  const loadMessages = useCallback(async (conversationId: string) => {
    try {
      setLoading(true);
      setError(null);
      const data = await getMessages(conversationId);
      setMessages(data);
    } catch (err) {
      console.error('Error loading messages:', err);
      setError('Failed to load messages');
    } finally {
      setLoading(false);
    }
  }, []);

  // Send a message
  const sendMessage = useCallback(
    async (data: SendMessageData) => {
      if (!user?.id) return;

      try {
        setError(null);
        const messageData = {
          ...data,
          sender_id: user.id,
        };

        // Create optimistic message for immediate UI update
        const tempId = `temp-${Date.now()}`;
        const optimisticMessage: Message = {
          id: tempId, // Temporary ID
          conversation_id: data.conversation_id,
          sender_id: user.id,
          content: data.content,
          message_type: data.message_type || 'text',
          media_url: data.media_url,
          file_name: data.file_name,
          file_size: data.file_size,
          is_edited: false,
          edited_at: null,
          reply_to_id: data.reply_to_id,
          read_at: null,
          created_at: new Date().toISOString(),
          updated_at: new Date().toISOString(),
          sender: {
            id: user.id,
            email: userData?.email || '',
            display_name: userData?.displayName || '',
            role: userData?.role || 'student',
            first_name: userData?.firstName || '',
            last_name: userData?.lastName || '',
            avatar: userData?.avatar || '',
            country: userData?.country || '',
            university: userData?.university || '',
            department: userData?.department || '',
            position: userData?.position || '',
            major: userData?.major || '',
          },
        };

        // Add optimistic message to UI immediately
        setMessages((prev) => [...prev, optimisticMessage]);

        // Update conversation's last message and updated_at immediately
        setConversations((prev) =>
          prev.map((conv) =>
            conv.id === data.conversation_id
              ? {
                  ...conv,
                  last_message: optimisticMessage,
                  updated_at: new Date().toISOString(),
                }
              : conv
          )
        );

        // Send the actual message
        const sentMessage = await sendMessageAPI(messageData);

        // Replace optimistic message with real message when it arrives
        setMessages((prev) =>
          prev.map((msg) =>
            msg.id === optimisticMessage.id ? sentMessage : msg
          )
        );

        // Update conversation with the real message
        setConversations((prev) =>
          prev.map((conv) =>
            conv.id === data.conversation_id
              ? {
                  ...conv,
                  last_message: sentMessage,
                  updated_at: sentMessage.created_at,
                }
              : conv
          )
        );

        return sentMessage;
      } catch (err) {
        console.error('Error sending message:', err);
        setError('Failed to send message');

        // Remove optimistic message on error
        setMessages((prev) => prev.filter((msg) => msg.id !== tempId));

        // Revert conversation update on error - we need to reload conversations
        // to get the correct state since we don't store the previous state
        loadConversations();

        throw err;
      }
    },
    [user?.id, userData, loadConversations]
  );

  // Create a new conversation
  const createConversation = useCallback(
    async (data: CreateConversationData) => {
      if (!user?.id) return;

      try {
        setError(null);
        const conversation = await createConversationAPI(data);
        await loadConversations(); // Refresh conversations list
        return conversation;
      } catch (err) {
        console.error('Error creating conversation:', err);
        setError('Failed to create conversation');
        throw err;
      }
    },
    [user?.id, loadConversations]
  );

  // Get or create direct conversation
  const getOrCreateDirectChat = useCallback(
    async (otherUserId: string) => {
      if (!user?.id) return;

      try {
        setError(null);
        const conversation = await getOrCreateDirectConversation(
          user.id,
          otherUserId
        );
        await loadConversations(); // Refresh conversations list
        return conversation;
      } catch (err) {
        console.error('Error getting or creating direct conversation:', err);
        setError('Failed to start conversation');
        throw err;
      }
    },
    [user?.id, loadConversations]
  );

  // Select a conversation
  const selectConversation = useCallback(
    async (conversation: Conversation) => {
      setCurrentConversation(conversation);
      await loadMessages(conversation.id);

      // Mark conversation as read
      if (user?.id) {
        await markConversationAsRead(conversation.id, user.id);
      }
    },
    [loadMessages, user?.id]
  );

  // Mark conversation as read
  const markAsRead = useCallback(
    async (conversationId: string) => {
      if (!user?.id) return;

      try {
        await markConversationAsRead(conversationId, user.id);
        // Update local state
        setConversations((prev) =>
          prev.map((conv) =>
            conv.id === conversationId ? { ...conv, unread_count: 0 } : conv
          )
        );
      } catch (err) {
        console.error('Error marking conversation as read:', err);
      }
    },
    [user?.id]
  );

  // Search users
  const searchUsers = useCallback(
    async (query: string): Promise<User[]> => {
      if (!user?.id || !query.trim()) return [];

      try {
        return await searchUsersAPI(query, user.id);
      } catch (err) {
        console.error('Error searching users:', err);
        return [];
      }
    },
    [user?.id]
  );

  // Update user presence
  const updatePresence = useCallback(
    async (status: 'online' | 'away' | 'busy' | 'offline') => {
      try {
        await updateUserPresence(status);
      } catch (err) {
        console.error('Error updating presence:', err);
      }
    },
    []
  );

  // Typing indicators
  const startTyping = useCallback(
    (conversationId: string) => {
      if (!currentConversation || currentConversation.id !== conversationId)
        return;

      sendTypingIndicator(conversationId, true).catch(console.error);

      // Clear existing timeout
      if (typingTimeoutRef.current) {
        clearTimeout(typingTimeoutRef.current);
      }

      // Stop typing after 3 seconds of inactivity
      typingTimeoutRef.current = setTimeout(() => {
        stopTyping(conversationId);
      }, 3000);
    },
    [currentConversation]
  );

  const stopTyping = useCallback((conversationId: string) => {
    sendTypingIndicator(conversationId, false).catch(console.error);

    if (typingTimeoutRef.current) {
      clearTimeout(typingTimeoutRef.current);
      typingTimeoutRef.current = null;
    }
  }, []);

  // Set up real-time subscriptions
  useEffect(() => {
    if (!user?.id) return;

    // Subscribe to conversations
    conversationSubscriptionRef.current = subscribeToConversations(
      user.id,
      (conversation) => {
        setConversations((prev) => {
          const existingIndex = prev.findIndex((c) => c.id === conversation.id);
          if (existingIndex >= 0) {
            const updated = [...prev];
            updated[existingIndex] = conversation;
            return updated;
          } else {
            return [conversation, ...prev];
          }
        });
      }
    );

    // Subscribe to user presence
    presenceSubscriptionRef.current = subscribeToUserPresence((presence) => {
      setOnlineUsers((prev) => {
        const newSet = new Set(prev);
        if (presence.status === 'online') {
          newSet.add(presence.user_id);
        } else {
          newSet.delete(presence.user_id);
        }
        return newSet;
      });
    });

    // Load initial data
    loadConversations();
    loadOnlineUsers();

    return () => {
      if (conversationSubscriptionRef.current) {
        conversationSubscriptionRef.current.unsubscribe();
      }
      if (presenceSubscriptionRef.current) {
        presenceSubscriptionRef.current.unsubscribe();
      }
    };
  }, [user?.id, loadConversations]);

  // Set up message subscription when conversation changes
  useEffect(() => {
    if (!currentConversation?.id) return;

    // Unsubscribe from previous conversation
    if (messageSubscriptionRef.current) {
      messageSubscriptionRef.current.unsubscribe();
    }
    if (typingSubscriptionRef.current) {
      typingSubscriptionRef.current.unsubscribe();
    }

    // Subscribe to new conversation messages
    messageSubscriptionRef.current = subscribeToMessages(
      currentConversation.id,
      (message) => {
        setMessages((prev) => {
          // Check if message already exists
          const exists = prev.some((m) => m.id === message.id);
          if (exists) return prev;

          return [...prev, message];
        });

        // Update conversation's last message
        setConversations((prev) =>
          prev.map((conv) =>
            conv.id === currentConversation.id
              ? {
                  ...conv,
                  last_message: message,
                  unread_count: (conv.unread_count || 0) + 1,
                }
              : conv
          )
        );
      }
    );

    // Subscribe to typing indicators
    typingSubscriptionRef.current = subscribeToTypingIndicators(
      currentConversation.id,
      (event: TypingEvent) => {
        if (event.user_id === user?.id) return; // Don't show own typing

        setTypingUsers((prev) => {
          const newMap = new Map(prev);
          const conversationId = event.conversation_id;
          const currentTyping = newMap.get(conversationId) || [];

          if (event.is_typing) {
            if (!currentTyping.includes(event.user_id)) {
              newMap.set(conversationId, [...currentTyping, event.user_id]);
            }
          } else {
            newMap.set(
              conversationId,
              currentTyping.filter((id) => id !== event.user_id)
            );
          }

          return newMap;
        });
      }
    );

    return () => {
      if (messageSubscriptionRef.current) {
        messageSubscriptionRef.current.unsubscribe();
      }
      if (typingSubscriptionRef.current) {
        typingSubscriptionRef.current.unsubscribe();
      }
    };
  }, [currentConversation?.id, user?.id]);

  // Load online users
  const loadOnlineUsers = useCallback(async () => {
    try {
      const onlinePresences = await getOnlineUsers();
      const onlineUserIds = new Set(onlinePresences.map((p) => p.user_id));
      setOnlineUsers(onlineUserIds);
    } catch (err) {
      console.error('Error loading online users:', err);
    }
  }, []);

  // Set user as online when component mounts
  useEffect(() => {
    if (user?.id) {
      updatePresence('online');
    }

    // Set user as offline when component unmounts
    return () => {
      if (user?.id) {
        updatePresence('offline');
      }
    };
  }, [user?.id, updatePresence]);

  // Cleanup typing timeout on unmount
  useEffect(() => {
    return () => {
      if (typingTimeoutRef.current) {
        clearTimeout(typingTimeoutRef.current);
      }
    };
  }, []);

  return {
    // State
    conversations,
    currentConversation,
    messages,
    loading,
    error,
    onlineUsers,
    typingUsers,

    // Actions
    loadConversations,
    loadMessages,
    sendMessage,
    createConversation,
    getOrCreateDirectChat,
    selectConversation,
    markAsRead,
    searchUsers,
    updatePresence,
    startTyping,
    stopTyping,
    setError,
  };
};

// Hook for getting user presence
export const useUserPresence = (userId: string) => {
  const [presence, setPresence] = useState<UserPresence | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadPresence = async () => {
      try {
        setLoading(true);
        const data = await getUserPresence(userId);
        setPresence(data);
      } catch (err) {
        console.error('Error loading user presence:', err);
      } finally {
        setLoading(false);
      }
    };

    if (userId) {
      loadPresence();
    }
  }, [userId]);

  return { presence, loading };
};

// Hook for typing indicators
export const useTypingIndicator = (conversationId: string) => {
  const [isTyping, setIsTyping] = useState(false);
  const [typingUsers, setTypingUsers] = useState<string[]>([]);
  const { user } = useAuth();

  useEffect(() => {
    if (!conversationId) return;

    const subscription = subscribeToTypingIndicators(
      conversationId,
      (event) => {
        if (event.user_id === user?.id) return; // Don't show own typing

        setTypingUsers((prev) => {
          if (event.is_typing) {
            return prev.includes(event.user_id)
              ? prev
              : [...prev, event.user_id];
          } else {
            return prev.filter((id) => id !== event.user_id);
          }
        });
      }
    );

    return () => {
      subscription.unsubscribe();
    };
  }, [conversationId, user?.id]);

  return { isTyping, typingUsers };
};
