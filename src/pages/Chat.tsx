import React, { useState, useEffect } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { useChatContext } from '@/contexts/ChatContext';
import { Conversation, Message, User } from '@/types/chat';
import { ConversationList } from '@/components/chat/ConversationList';
import { ChatHeader } from '@/components/chat/ChatHeader';
import { MessageList } from '@/components/chat/MessageList';
import { MessageInput } from '@/components/chat/MessageInput';
import { UserSearch } from '@/components/chat/UserSearch';
import { Button } from '@/components/ui/button';
import { MessageSquare, Plus } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import ViewProfileModal from '@/components/modals/ViewProfileModal';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';

const Chat = () => {
  const { user, userData } = useAuth();
  const {
    conversations,
    currentConversation,
    messages,
    loading,
    error,
    onlineUsers,
    typingUsers,
    loadConversations,
    selectConversation,
    sendMessage,
    getOrCreateDirectChat,
    searchUsers,
    startTyping,
    stopTyping,
    setError,
    editMessage,
    deleteMessage,
    clearChat,
  } = useChatContext();

  const [showUserSearch, setShowUserSearch] = useState(false);
  const [replyTo, setReplyTo] = useState<Message | null>(null);
  const { toast } = useToast();
  const [showProfileModal, setShowProfileModal] = useState(false);
  const [profileData, setProfileData] = useState<any | null>(null);
  const [editModal, setEditModal] = useState<{
    id: string;
    content: string;
  } | null>(null);
  const [deleteModal, setDeleteModal] = useState<string | null>(null);

  // Load conversations on mount
  useEffect(() => {
    if (user?.id) {
      loadConversations();
    }
  }, [user?.id, loadConversations]);

  // Convert userData to User type for components
  const currentUser: User = userData
    ? {
        id: userData.uid,
        email: userData.email,
        display_name: userData.displayName,
        role: userData.role,
        first_name: userData.firstName,
        last_name: userData.lastName,
        avatar: userData.avatar,
        country: userData.country,
        university: userData.university,
        department: userData.department,
        position: userData.position,
        major: userData.major,
      }
    : ({} as User);

  // Get typing users for current conversation
  const currentTypingUsers = currentConversation
    ? (typingUsers
        .get(currentConversation.id)
        ?.map((userId) => {
          const participant = currentConversation.participants?.find(
            (p) => p.user_id === userId
          );
          return participant?.user;
        })
        .filter(Boolean) as User[]) || []
    : [];

  const handleSendMessage = async (
    content: string,
    replyToMessage?: Message
  ) => {
    if (!currentConversation || !user?.id) return;

    try {
      await sendMessage({
        conversation_id: currentConversation.id,
        content,
        reply_to_id: replyToMessage?.id,
      });
      setReplyTo(null);
    } catch (err) {
      console.error('Error sending message:', err);
    }
  };

  const handleStartChat = async (selectedUser: User) => {
    if (!user?.id) return;

    try {
      const conversation = await getOrCreateDirectChat(selectedUser.id);
      await selectConversation(conversation);
    } catch (err) {
      console.error('Error starting chat:', err);
    }
  };

  const handleEditMessage = async (messageId: string, content: string) => {
    setEditModal({ id: messageId, content });
  };

  const handleDeleteMessage = async (messageId: string) => {
    setDeleteModal(messageId);
  };

  const handleReplyToMessage = (message: Message) => {
    setReplyTo(message);
  };

  const handleCancelReply = () => {
    setReplyTo(null);
  };

  const handleCall = () => {
    toast({
      title: 'Coming soon',
      description: 'Audio calling is coming soon.',
    });
  };

  const handleVideoCall = () => {
    toast({
      title: 'Coming soon',
      description: 'Video calling is coming soon.',
    });
  };

  const handleMoreOptions = () => {};

  // Header option handlers
  const handleViewProfile = () => {
    const other = currentConversation?.participants?.find(
      (p) => p.user_id !== currentUser.id
    )?.user;
    if (!other) return;
    // Build minimal PublicProfile-compatible object
    setProfileData({
      id: other.id,
      display_name: other.display_name,
      first_name: other.first_name,
      last_name: other.last_name,
      role: other.role,
      bio: '',
      country: other.country || '',
      city: '',
      university: other.university,
      institution: undefined,
      department: other.department,
      position: other.position,
      major: other.major,
      avatar: other.avatar,
      skills: [],
      academic_interests: [],
      research_interests: [],
      social_links: {},
      profile_views: 0,
      connections: 0,
      endorsements: 0,
      created_at: new Date().toISOString(),
      verification_status: 'verified',
    });
    setShowProfileModal(true);
  };

  const handleMute = () => {
    toast({
      title: 'Muted',
      description: 'Conversation muted (UI only for now).',
    });
  };

  const handleArchive = () => {
    toast({
      title: 'Archived',
      description: 'Conversation archived (UI only for now).',
    });
  };

  const handleLeaveOrClear = async () => {
    if (!currentConversation) return;
    if (currentConversation.type === 'group') {
      toast({
        title: 'Coming soon',
        description: 'Leaving group will be added soon.',
      });
      return;
    }
    // Direct chat: clear all messages
    const ok = confirm('Clear all messages in this chat?');
    if (!ok) return;
    try {
      await clearChat?.(currentConversation.id);
      toast({ title: 'Cleared', description: 'Chat history cleared.' });
    } catch (e) {
      console.error(e);
    }
  };

  if (!user || !userData) {
    return (
      <div className='h-[calc(100vh-120px)] flex items-center justify-center'>
        <div className='text-center'>
          <MessageSquare className='h-12 w-12 text-gray-400 mx-auto mb-4' />
          <h3 className='text-lg font-medium text-gray-900 mb-2'>
            Please log in to access chat
          </h3>
          <p className='text-gray-600'>
            You need to be logged in to use the chat feature
          </p>
        </div>
      </div>
    );
  }

  return (
    <>
      <div className='h-full flex flex-col lg:flex-row bg-white overflow-hidden'>
        {/* Conversations Sidebar */}
        <div className='w-full lg:w-80 border-r border-gray-200 flex flex-col flex-shrink-0'>
          <ConversationList
            conversations={conversations}
            currentConversation={currentConversation}
            currentUser={currentUser}
            onSelectConversation={selectConversation}
            onSearchUsers={searchUsers}
            loading={loading}
          />
        </div>

        {/* Chat Area */}
        <div className='flex-1 flex flex-col bg-white min-w-0'>
          {currentConversation ? (
            <>
              {/* Chat Header */}
              <ChatHeader
                conversation={currentConversation}
                currentUser={currentUser}
                onCall={handleCall}
                onVideoCall={handleVideoCall}
                onMoreOptions={handleMoreOptions}
                onViewProfile={handleViewProfile}
                onLeaveOrClear={handleLeaveOrClear}
              />

              {/* Messages */}
              <MessageList
                messages={messages}
                currentUser={currentUser}
                typingUsers={currentTypingUsers}
                onEditMessage={handleEditMessage}
                onDeleteMessage={handleDeleteMessage}
                onReplyToMessage={handleReplyToMessage}
                loading={loading}
              />

              {/* Message Input */}
              <MessageInput
                onSendMessage={handleSendMessage}
                onTyping={() =>
                  currentConversation && startTyping(currentConversation.id)
                }
                onStopTyping={() =>
                  currentConversation && stopTyping(currentConversation.id)
                }
                disabled={loading}
                replyTo={replyTo}
                onCancelReply={handleCancelReply}
              />
            </>
          ) : (
            <div className='flex-1 flex items-center justify-center'>
              <div className='text-center'>
                <MessageSquare className='h-12 w-12 text-gray-400 mx-auto mb-4' />
                <h3 className='text-lg font-medium text-gray-900 mb-2'>
                  Select a conversation
                </h3>
                <p className='text-gray-600 mb-4'>
                  Choose a conversation from the sidebar to start messaging
                </p>
                <Button
                  onClick={() => setShowUserSearch(true)}
                  className='bg-blue-600 hover:bg-blue-700'
                >
                  <Plus className='h-4 w-4 mr-2' />
                  Start New Chat
                </Button>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* User Search Modal */}
      {showUserSearch && (
        <UserSearch
          onSelectUser={handleStartChat}
          onClose={() => setShowUserSearch(false)}
          searchUsers={searchUsers}
          currentUser={currentUser}
        />
      )}

      {/* View Profile Modal */}
      {showProfileModal && profileData && (
        <ViewProfileModal
          isOpen={showProfileModal}
          onClose={() => setShowProfileModal(false)}
          profileData={profileData}
          userType={profileData.role}
        />
      )}

      {/* Edit Message Modal */}
      {editModal && (
        <Dialog open={true} onOpenChange={() => setEditModal(null)}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Edit Message</DialogTitle>
            </DialogHeader>
            <div className='space-y-2'>
              <Input
                value={editModal.content}
                onChange={(e) =>
                  setEditModal((prev) =>
                    prev ? { ...prev, content: e.target.value } : prev
                  )
                }
                autoFocus
              />
            </div>
            <DialogFooter>
              <Button variant='outline' onClick={() => setEditModal(null)}>
                Cancel
              </Button>
              <Button
                onClick={async () => {
                  const trimmed = editModal.content.trim();
                  if (!trimmed) return;
                  await editMessage(editModal.id, trimmed);
                  setEditModal(null);
                }}
              >
                Save
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      )}

      {/* Delete Message Modal */}
      {deleteModal && (
        <Dialog open={true} onOpenChange={() => setDeleteModal(null)}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Delete Message</DialogTitle>
            </DialogHeader>
            <p>Are you sure you want to delete this message?</p>
            <DialogFooter>
              <Button variant='outline' onClick={() => setDeleteModal(null)}>
                Cancel
              </Button>
              <Button
                className='bg-red-600 hover:bg-red-700'
                onClick={async () => {
                  await deleteMessage(deleteModal);
                  setDeleteModal(null);
                }}
              >
                Delete
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      )}

      {/* Error Display */}
      {error && (
        <div className='fixed top-4 right-4 bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded z-50'>
          <div className='flex items-center justify-between'>
            <span>{error}</span>
            <button
              onClick={() => setError(null)}
              className='ml-4 text-red-500 hover:text-red-700'
            >
              ×
            </button>
          </div>
        </div>
      )}
    </>
  );
};

export default Chat;
