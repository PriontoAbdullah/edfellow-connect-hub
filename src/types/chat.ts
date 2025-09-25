export interface Message {
  id: string;
  conversation_id: string;
  sender_id: string;
  receiver_id?: string; // Optional for conversation-based messaging
  content: string;
  message_type: 'text' | 'image' | 'file' | 'system';
  media_url?: string;
  file_name?: string;
  file_size?: number;
  is_edited: boolean;
  edited_at?: string;
  reply_to_id?: string;
  read_at?: string;
  created_at: string;
  updated_at: string;
  // Extended fields for UI
  sender?: User;
  reply_to?: Message;
}

export interface Conversation {
  id: string;
  type: 'direct' | 'group';
  name?: string;
  description?: string;
  avatar_url?: string;
  created_by: string;
  created_at: string;
  updated_at: string;
  // Extended fields for UI
  participants?: ConversationParticipant[];
  last_message?: Message;
  unread_count?: number;
  is_online?: boolean;
}

export interface ConversationParticipant {
  id: string;
  conversation_id: string;
  user_id: string;
  role: 'admin' | 'moderator' | 'member';
  joined_at: string;
  last_read_at?: string;
  is_muted: boolean;
  is_archived: boolean;
  // Extended fields for UI
  user?: User;
}

export interface User {
  id: string;
  email: string;
  display_name: string;
  role: 'student' | 'professor' | 'university';
  first_name: string;
  last_name: string;
  avatar?: string;
  country: string;
  university?: string;
  department?: string;
  position?: string;
  major?: string;
  // Presence information
  is_online?: boolean;
  last_seen?: string;
  status?: 'online' | 'away' | 'busy' | 'offline';
}

export interface UserPresence {
  id: string;
  user_id: string;
  status: 'online' | 'away' | 'busy' | 'offline';
  last_seen: string;
  current_activity?: string;
  device_info?: Record<string, any>;
  created_at: string;
  updated_at: string;
}

export interface ChatState {
  conversations: Conversation[];
  currentConversation: Conversation | null;
  messages: Message[];
  loading: boolean;
  error: string | null;
  onlineUsers: Set<string>;
  typingUsers: Map<string, string[]>; // conversationId -> userIds
}

export interface SendMessageData {
  conversation_id: string;
  content: string;
  message_type?: 'text' | 'image' | 'file' | 'system';
  media_url?: string;
  file_name?: string;
  file_size?: number;
  reply_to_id?: string;
}

export interface CreateConversationData {
  type: 'direct' | 'group';
  name?: string;
  description?: string;
  participant_ids: string[];
}

export interface ChatContextType {
  // State
  conversations: Conversation[];
  currentConversation: Conversation | null;
  messages: Message[];
  loading: boolean;
  error: string | null;
  onlineUsers: Set<string>;
  typingUsers: Map<string, string[]>;

  // Actions
  loadConversations: () => Promise<void>;
  loadMessages: (conversationId: string) => Promise<void>;
  sendMessage: (data: SendMessageData) => Promise<void>;
  createConversation: (data: CreateConversationData) => Promise<Conversation>;
  getOrCreateDirectChat: (otherUserId: string) => Promise<Conversation>;
  selectConversation: (conversation: Conversation) => void;
  markAsRead: (conversationId: string) => Promise<void>;
  startTyping: (conversationId: string) => void;
  stopTyping: (conversationId: string) => void;
  updatePresence: (
    status: 'online' | 'away' | 'busy' | 'offline'
  ) => Promise<void>;
  searchUsers: (query: string) => Promise<User[]>;
  addParticipant: (conversationId: string, userId: string) => Promise<void>;
  removeParticipant: (conversationId: string, userId: string) => Promise<void>;
  updateConversation: (
    conversationId: string,
    updates: Partial<Conversation>
  ) => Promise<void>;
  deleteMessage: (messageId: string) => Promise<void>;
  editMessage: (messageId: string, content: string) => Promise<void>;
  clearChat?: (conversationId: string) => Promise<void>;
  setError: (error: string | null) => void;
  getTotalUnreadCount: () => number;
}

export interface MessageNotification {
  id: string;
  user_id: string;
  type: 'message';
  title: string;
  message: string;
  data?: {
    conversation_id: string;
    message_id: string;
    sender_id: string;
  };
  is_read: boolean;
  read_at?: string;
  created_at: string;
}

// Real-time event types
export interface RealtimeMessageEvent {
  eventType: 'INSERT' | 'UPDATE' | 'DELETE';
  new: Message;
  old?: Message;
}

export interface RealtimePresenceEvent {
  eventType: 'INSERT' | 'UPDATE' | 'DELETE';
  new: UserPresence;
  old?: UserPresence;
}

export interface TypingEvent {
  conversation_id: string;
  user_id: string;
  is_typing: boolean;
  timestamp: string;
}

// Utility types
export type MessageStatus =
  | 'sending'
  | 'sent'
  | 'delivered'
  | 'read'
  | 'failed';
export type ConversationType = 'direct' | 'group';
export type UserRole = 'student' | 'professor' | 'university';
export type PresenceStatus = 'online' | 'away' | 'busy' | 'offline';
