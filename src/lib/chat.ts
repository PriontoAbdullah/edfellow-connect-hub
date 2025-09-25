import { supabase } from './supabase';
import {
  Message,
  Conversation,
  ConversationParticipant,
  User,
  UserPresence,
  SendMessageData,
  CreateConversationData,
  TypingEvent,
} from '../types/chat';

// ============================================================================
// CONVERSATION FUNCTIONS
// ============================================================================

export const getConversations = async (
  userId: string
): Promise<Conversation[]> => {
  try {
    const { data, error } = await supabase
      .from('conversation_participants')
      .select(
        `
        conversation_id,
        last_read_at,
        is_muted,
        is_archived,
        conversations (
          id,
          type,
          name,
          description,
          avatar_url,
          created_by,
          created_at,
          updated_at
        )
      `
      )
      .eq('user_id', userId)
      .eq('is_archived', false)
      .order('conversations(updated_at)', { ascending: false });

    if (error) throw error;

    const conversations: Conversation[] =
      data?.map((item) => ({
        ...item.conversations,
        participants: [], // Will be loaded separately
        unread_count: 0, // Will be calculated separately
      })) || [];

    // Load participants and unread counts for each conversation
    for (const conversation of conversations) {
      const participants = await getConversationParticipants(conversation.id);
      const unreadCount = await getUnreadMessageCount(conversation.id, userId);
      const lastMessage = await getLastMessage(conversation.id);

      conversation.participants = participants;
      conversation.unread_count = unreadCount;
      conversation.last_message = lastMessage;
    }

    return conversations;
  } catch (error) {
    console.error('Error fetching conversations:', error);
    throw error;
  }
};

export const getConversationParticipants = async (
  conversationId: string
): Promise<ConversationParticipant[]> => {
  try {
    const { data, error } = await supabase
      .from('conversation_participants')
      .select(
        `
        id,
        conversation_id,
        user_id,
        role,
        joined_at,
        last_read_at,
        is_muted,
        is_archived,
        users (
          id,
          email,
          display_name,
          role,
          first_name,
          last_name,
          avatar,
          country,
          university,
          department,
          position,
          major
        )
      `
      )
      .eq('conversation_id', conversationId);

    if (error) throw error;

    return (
      data?.map((item) => ({
        ...item,
        user: item.users,
      })) || []
    );
  } catch (error) {
    console.error('Error fetching conversation participants:', error);
    throw error;
  }
};

export const createConversation = async (
  data: CreateConversationData
): Promise<Conversation> => {
  try {
    // Create the conversation
    const { data: conversation, error: conversationError } = await supabase
      .from('conversations')
      .insert({
        type: data.type,
        name: data.name,
        description: data.description,
        created_by: data.participant_ids[0], // First participant is the creator
      })
      .select()
      .single();

    if (conversationError) throw conversationError;

    // Add participants
    const participants = data.participant_ids.map((userId, index) => ({
      conversation_id: conversation.id,
      user_id: userId,
      role: index === 0 ? 'admin' : 'member',
    }));

    const { error: participantsError } = await supabase
      .from('conversation_participants')
      .insert(participants);

    if (participantsError) throw participantsError;

    // Load the full conversation with participants
    const fullConversation = await getConversationById(conversation.id);
    return fullConversation;
  } catch (error) {
    console.error('Error creating conversation:', error);
    throw error;
  }
};

export const getConversationById = async (
  conversationId: string
): Promise<Conversation> => {
  try {
    const { data, error } = await supabase
      .from('conversations')
      .select('*')
      .eq('id', conversationId)
      .single();

    if (error) throw error;

    const participants = await getConversationParticipants(conversationId);
    const lastMessage = await getLastMessage(conversationId);

    return {
      ...data,
      participants,
      last_message: lastMessage,
      unread_count: 0,
    };
  } catch (error) {
    console.error('Error fetching conversation:', error);
    throw error;
  }
};

export const getOrCreateDirectConversation = async (
  userId1: string,
  userId2: string
): Promise<Conversation> => {
  try {
    // Check if direct conversation already exists
    const { data: existingConversations, error: searchError } = await supabase
      .from('conversation_participants')
      .select(
        `
        conversation_id,
        conversations (
          id,
          type,
          name,
          description,
          avatar_url,
          created_by,
          created_at,
          updated_at
        )
      `
      )
      .eq('user_id', userId1)
      .eq('conversations.type', 'direct');

    if (searchError) throw searchError;

    // Find conversation that includes both users
    for (const item of existingConversations || []) {
      const { data: participants } = await supabase
        .from('conversation_participants')
        .select('user_id')
        .eq('conversation_id', item.conversation_id);

      const participantIds = participants?.map((p) => p.user_id) || [];
      if (
        participantIds.includes(userId1) &&
        participantIds.includes(userId2)
      ) {
        return await getConversationById(item.conversation_id);
      }
    }

    // Create new direct conversation
    return await createConversation({
      type: 'direct',
      participant_ids: [userId1, userId2],
    });
  } catch (error) {
    console.error('Error getting or creating direct conversation:', error);
    throw error;
  }
};

// ============================================================================
// MESSAGE FUNCTIONS
// ============================================================================

export const getMessages = async (
  conversationId: string,
  limit: number = 50,
  offset: number = 0
): Promise<Message[]> => {
  try {
    // First, get messages with sender info
    const { data: messages, error: messagesError } = await supabase
      .from('messages')
      .select(
        `
        *,
        sender:users!sender_id (
          id,
          email,
          display_name,
          role,
          first_name,
          last_name,
          avatar,
          country,
          university,
          department,
          position,
          major
        )
      `
      )
      .eq('conversation_id', conversationId)
      .order('created_at', { ascending: false })
      .range(offset, offset + limit - 1);

    if (messagesError) throw messagesError;

    if (!messages || messages.length === 0) {
      return [];
    }

    // Get reply_to messages for messages that have reply_to_id
    const replyToIds = messages
      .filter((msg) => msg.reply_to_id)
      .map((msg) => msg.reply_to_id);

    let replyToMessages: any[] = [];
    if (replyToIds.length > 0) {
      const { data: replies, error: repliesError } = await supabase
        .from('messages')
        .select(
          `
          id,
          content,
          sender_id,
          sender:users!sender_id (
            id,
            display_name,
            avatar
          )
        `
        )
        .in('id', replyToIds);

      if (repliesError) {
        console.warn('Error fetching reply messages:', repliesError);
      } else {
        replyToMessages = replies || [];
      }
    }

    // Combine messages with their reply_to data
    const messagesWithReplies = messages.map((message) => ({
      ...message,
      reply_to: message.reply_to_id
        ? replyToMessages.find((reply) => reply.id === message.reply_to_id) ||
          null
        : null,
    }));

    return messagesWithReplies.reverse(); // Reverse to show oldest first
  } catch (error) {
    console.error('Error fetching messages:', error);
    throw error;
  }
};

export const getLastMessage = async (
  conversationId: string
): Promise<Message | null> => {
  try {
    const { data, error } = await supabase
      .from('messages')
      .select(
        `
        *,
        sender:users!sender_id (
          id,
          display_name,
          avatar
        )
      `
      )
      .eq('conversation_id', conversationId)
      .order('created_at', { ascending: false })
      .limit(1)
      .single();

    if (error && error.code !== 'PGRST116') throw error; // PGRST116 = no rows returned
    return data || null;
  } catch (error) {
    console.error('Error fetching last message:', error);
    return null;
  }
};

export const sendMessage = async (data: SendMessageData): Promise<Message> => {
  try {
    const { data: message, error } = await supabase
      .from('messages')
      .insert({
        conversation_id: data.conversation_id,
        sender_id:
          data.sender_id || (await supabase.auth.getUser()).data.user?.id,
        content: data.content,
        message_type: data.message_type || 'text',
        media_url: data.media_url,
        file_name: data.file_name,
        file_size: data.file_size,
        reply_to_id: data.reply_to_id,
      })
      .select(
        `
        *,
        sender:users!sender_id (
          id,
          email,
          display_name,
          role,
          first_name,
          last_name,
          avatar,
          country,
          university,
          department,
          position,
          major
        )
      `
      )
      .single();

    if (error) throw error;

    // Update conversation's updated_at timestamp
    await supabase
      .from('conversations')
      .update({ updated_at: new Date().toISOString() })
      .eq('id', data.conversation_id);

    return message;
  } catch (error) {
    console.error('Error sending message:', error);
    throw error;
  }
};

export const markMessageAsRead = async (messageId: string): Promise<void> => {
  try {
    const { error } = await supabase
      .from('messages')
      .update({ read_at: new Date().toISOString() })
      .eq('id', messageId);

    if (error) throw error;
  } catch (error) {
    console.error('Error marking message as read:', error);
    throw error;
  }
};

export const markConversationAsRead = async (
  conversationId: string,
  userId: string
): Promise<void> => {
  try {
    // Update participant's last_read_at
    await supabase
      .from('conversation_participants')
      .update({ last_read_at: new Date().toISOString() })
      .eq('conversation_id', conversationId)
      .eq('user_id', userId);

    // Mark all unread messages as read
    await supabase
      .from('messages')
      .update({ read_at: new Date().toISOString() })
      .eq('conversation_id', conversationId)
      .neq('sender_id', userId)
      .is('read_at', null);
  } catch (error) {
    console.error('Error marking conversation as read:', error);
    throw error;
  }
};

export const getUnreadMessageCount = async (
  conversationId: string,
  userId: string
): Promise<number> => {
  try {
    const { count, error } = await supabase
      .from('messages')
      .select('*', { count: 'exact', head: true })
      .eq('conversation_id', conversationId)
      .neq('sender_id', userId)
      .is('read_at', null);

    if (error) throw error;
    return count || 0;
  } catch (error) {
    console.error('Error getting unread message count:', error);
    return 0;
  }
};

export const getTotalUnreadMessageCount = async (
  userId: string
): Promise<number> => {
  try {
    // Get all conversations for the user
    const { data: conversations, error: conversationsError } = await supabase
      .from('conversation_participants')
      .select('conversation_id')
      .eq('user_id', userId)
      .eq('is_archived', false);

    if (conversationsError) throw conversationsError;

    if (!conversations || conversations.length === 0) {
      return 0;
    }

    // Get total unread messages across all conversations
    const conversationIds = conversations.map((c) => c.conversation_id);
    const { count, error } = await supabase
      .from('messages')
      .select('*', { count: 'exact', head: true })
      .in('conversation_id', conversationIds)
      .neq('sender_id', userId)
      .is('read_at', null);

    if (error) throw error;
    return count || 0;
  } catch (error) {
    console.error('Error getting total unread message count:', error);
    return 0;
  }
};

export const editMessage = async (
  messageId: string,
  content: string
): Promise<Message> => {
  try {
    const { data, error } = await supabase
      .from('messages')
      .update({
        content,
        is_edited: true,
        edited_at: new Date().toISOString(),
      })
      .eq('id', messageId)
      .select(
        `
        *,
        sender:users!sender_id (
          id,
          email,
          display_name,
          role,
          first_name,
          last_name,
          avatar,
          country,
          university,
          department,
          position,
          major
        )
      `
      )
      .single();

    if (error) throw error;
    return data;
  } catch (error) {
    console.error('Error editing message:', error);
    throw error;
  }
};

export const deleteMessage = async (messageId: string): Promise<void> => {
  try {
    const { error } = await supabase
      .from('messages')
      .delete()
      .eq('id', messageId);

    if (error) throw error;
  } catch (error) {
    console.error('Error deleting message:', error);
    throw error;
  }
};

export const clearConversationMessages = async (
  conversationId: string
): Promise<void> => {
  try {
    const { error } = await supabase
      .from('messages')
      .delete()
      .eq('conversation_id', conversationId);
    if (error) throw error;
  } catch (error) {
    console.error('Error clearing conversation messages:', error);
    throw error;
  }
};

// ============================================================================
// USER FUNCTIONS
// ============================================================================

export const searchUsers = async (
  query: string,
  currentUserId: string
): Promise<User[]> => {
  try {
    const { data, error } = await supabase
      .from('users')
      .select(
        `
        id,
        email,
        display_name,
        role,
        first_name,
        last_name,
        avatar,
        country,
        university,
        department,
        position,
        major
      `
      )
      .neq('id', currentUserId)
      .or(
        `display_name.ilike.%${query}%,first_name.ilike.%${query}%,last_name.ilike.%${query}%,email.ilike.%${query}%`
      )
      .limit(20);

    if (error) throw error;
    return data || [];
  } catch (error) {
    console.error('Error searching users:', error);
    throw error;
  }
};

export const getUserById = async (userId: string): Promise<User | null> => {
  try {
    const { data, error } = await supabase
      .from('users')
      .select(
        `
        id,
        email,
        display_name,
        role,
        first_name,
        last_name,
        avatar,
        country,
        university,
        department,
        position,
        major
      `
      )
      .eq('id', userId)
      .single();

    if (error && error.code !== 'PGRST116') throw error;
    return data || null;
  } catch (error) {
    console.error('Error fetching user:', error);
    return null;
  }
};

// ============================================================================
// PRESENCE FUNCTIONS
// ============================================================================

export const updateUserPresence = async (
  status: 'online' | 'away' | 'busy' | 'offline'
): Promise<void> => {
  try {
    const user = (await supabase.auth.getUser()).data.user;
    if (!user) return;

    const { error } = await supabase.from('user_presence').upsert({
      user_id: user.id,
      status,
      last_seen: new Date().toISOString(),
      updated_at: new Date().toISOString(),
    });

    if (error) throw error;
  } catch (error) {
    console.error('Error updating user presence:', error);
    throw error;
  }
};

export const getUserPresence = async (
  userId: string
): Promise<UserPresence | null> => {
  try {
    const { data, error } = await supabase
      .from('user_presence')
      .select('*')
      .eq('user_id', userId)
      .single();

    if (error && error.code !== 'PGRST116') throw error;
    return data || null;
  } catch (error) {
    console.error('Error fetching user presence:', error);
    return null;
  }
};

export const getOnlineUsers = async (): Promise<UserPresence[]> => {
  try {
    const { data, error } = await supabase
      .from('user_presence')
      .select(
        `
        *,
        users (
          id,
          display_name,
          avatar,
          role
        )
      `
      )
      .eq('status', 'online')
      .order('last_seen', { ascending: false });

    if (error) throw error;
    return data || [];
  } catch (error) {
    console.error('Error fetching online users:', error);
    return [];
  }
};

// ============================================================================
// REAL-TIME SUBSCRIPTIONS
// ============================================================================

export const subscribeToMessages = (
  conversationId: string,
  callback: (message: Message) => void
) => {
  return supabase
    .channel(`messages:${conversationId}`)
    .on(
      'postgres_changes',
      {
        event: 'INSERT',
        schema: 'public',
        table: 'messages',
        filter: `conversation_id=eq.${conversationId}`,
      },
      async (payload) => {
        const message = payload.new as Message;

        // Fetch sender information for the new message
        try {
          const { data: senderData, error: senderError } = await supabase
            .from('users')
            .select(
              'id, email, display_name, role, first_name, last_name, avatar, country, university, department, position, major'
            )
            .eq('id', message.sender_id)
            .single();

          if (senderError) {
            console.error('Error fetching sender data:', senderError);
            return;
          }

          // Create the full message object with sender info
          const fullMessage: Message = {
            ...message,
            sender: senderData,
          };

          callback(fullMessage);
        } catch (error) {
          console.error('Error processing new message:', error);
        }
      }
    )
    .subscribe();
};

export const subscribeToConversations = (
  userId: string,
  callback: (conversation: Conversation) => void
) => {
  return supabase
    .channel(`conversations:${userId}`)
    .on(
      'postgres_changes',
      {
        event: '*',
        schema: 'public',
        table: 'conversations',
      },
      async (payload) => {
        // Check if user is a participant in this conversation
        const { data: participant } = await supabase
          .from('conversation_participants')
          .select('conversation_id')
          .eq('conversation_id', payload.new.id)
          .eq('user_id', userId)
          .single();

        if (participant) {
          const conversation = await getConversationById(payload.new.id);
          callback(conversation);
        }
      }
    )
    .subscribe();
};

export const subscribeToUserPresence = (
  callback: (presence: UserPresence) => void
) => {
  return supabase
    .channel('user_presence')
    .on(
      'postgres_changes',
      {
        event: '*',
        schema: 'public',
        table: 'user_presence',
      },
      (payload) => {
        callback(payload.new as UserPresence);
      }
    )
    .subscribe();
};

// ============================================================================
// TYPING INDICATORS
// ============================================================================

export const sendTypingIndicator = async (
  conversationId: string,
  isTyping: boolean
): Promise<void> => {
  try {
    const {
      data: { user },
    } = await supabase.auth.getUser();
    if (!user) return;

    supabase.channel(`typing:${conversationId}`).send({
      type: 'broadcast',
      event: 'typing',
      payload: {
        conversation_id: conversationId,
        user_id: user.id,
        is_typing: isTyping,
        timestamp: new Date().toISOString(),
      },
    });
  } catch (error) {
    console.error('Error sending typing indicator:', error);
  }
};

export const subscribeToTypingIndicators = (
  conversationId: string,
  callback: (event: TypingEvent) => void
) => {
  return supabase
    .channel(`typing:${conversationId}`)
    .on('broadcast', { event: 'typing' }, (payload) => {
      callback(payload.payload as TypingEvent);
    })
    .subscribe();
};
