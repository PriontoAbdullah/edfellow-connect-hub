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
  } = useChatContext();

  const [showUserSearch, setShowUserSearch] = useState(false);
  const [replyTo, setReplyTo] = useState<Message | null>(null);

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
    // TODO: Implement message editing
    console.log('Edit message:', messageId, content);
  };

  const handleDeleteMessage = async (messageId: string) => {
    // TODO: Implement message deletion
    console.log('Delete message:', messageId);
  };

  const handleReplyToMessage = (message: Message) => {
    setReplyTo(message);
  };

  const handleCancelReply = () => {
    setReplyTo(null);
  };

  const handleCall = () => {
    // TODO: Implement voice call
    console.log('Start voice call');
  };

  const handleVideoCall = () => {
    // TODO: Implement video call
    console.log('Start video call');
  };

  const handleMoreOptions = () => {
    // TODO: Implement more options menu
    console.log('Show more options');
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
      <div className='h-full flex bg-white overflow-hidden'>
        {/* Conversations Sidebar */}
        <div className='w-80 border-r border-gray-200 flex flex-col'>
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
        <div className='flex-1 flex flex-col bg-white'>
          {currentConversation ? (
            <>
              {/* Chat Header */}
              <ChatHeader
                conversation={currentConversation}
                currentUser={currentUser}
                onCall={handleCall}
                onVideoCall={handleVideoCall}
                onMoreOptions={handleMoreOptions}
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
