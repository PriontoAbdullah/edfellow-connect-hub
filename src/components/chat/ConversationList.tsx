import React, { useState } from 'react';
import { Conversation, User } from '@/types/chat';
import { UserAvatar } from './UserAvatar';
import { Badge } from '@/components/ui/badge';
import { formatDistanceToNow } from 'date-fns';
import { Search, MessageSquare, Users } from 'lucide-react';
import { Input } from '@/components/ui/input';

interface ConversationListProps {
  conversations: Conversation[];
  currentConversation: Conversation | null;
  currentUser: User;
  onSelectConversation: (conversation: Conversation) => void;
  onSearchUsers: (query: string) => void;
  loading?: boolean;
}

export const ConversationList: React.FC<ConversationListProps> = ({
  conversations,
  currentConversation,
  currentUser,
  onSelectConversation,
  onSearchUsers,
  loading = false,
}) => {
  const [searchQuery, setSearchQuery] = useState('');

  const handleSearch = (query: string) => {
    setSearchQuery(query);
    onSearchUsers(query);
  };

  const getConversationName = (conversation: Conversation) => {
    if (conversation.type === 'group' && conversation.name) {
      return conversation.name;
    }

    // For direct conversations, show the other participant's name
    const otherParticipant = conversation.participants?.find(
      (p) => p.user_id !== currentUser.id
    );
    return otherParticipant?.user?.display_name || 'Unknown User';
  };

  const getConversationAvatar = (conversation: Conversation) => {
    if (conversation.type === 'group') {
      return conversation.avatar_url;
    }

    // For direct conversations, show the other participant's avatar
    const otherParticipant = conversation.participants?.find(
      (p) => p.user_id !== currentUser.id
    );
    return otherParticipant?.user?.avatar;
  };

  const getConversationRole = (conversation: Conversation) => {
    if (conversation.type === 'group') {
      return 'Group';
    }

    const otherParticipant = conversation.participants?.find(
      (p) => p.user_id !== currentUser.id
    );
    return otherParticipant?.user?.role || 'User';
  };

  const getConversationIcon = (conversation: Conversation) => {
    return conversation.type === 'group' ? Users : MessageSquare;
  };

  const formatLastMessageTime = (timestamp: string) => {
    return formatDistanceToNow(new Date(timestamp), { addSuffix: true });
  };

  if (loading) {
    return (
      <div className='h-full flex flex-col bg-gray-50'>
        <div className='p-4 border-b border-gray-200'>
          <h2 className='text-lg font-semibold text-gray-900 flex items-center gap-2'>
            <MessageSquare className='h-5 w-5 text-blue-600' />
            Messages
          </h2>
          <div className='relative mt-3'>
            <Search className='absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4' />
            <Input
              placeholder='Search conversations...'
              className='pl-10'
              disabled
            />
          </div>
        </div>
        <div className='flex-1 p-4'>
          <div className='space-y-3'>
            {[...Array(5)].map((_, i) => (
              <div key={i} className='animate-pulse'>
                <div className='flex items-center gap-3 p-3 rounded-lg'>
                  <div className='h-10 w-10 bg-gray-300 rounded-full'></div>
                  <div className='flex-1'>
                    <div className='h-4 bg-gray-300 rounded mb-2'></div>
                    <div className='h-3 bg-gray-300 rounded w-3/4'></div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className='h-full flex flex-col bg-gray-50'>
      <div className='p-4 border-b border-gray-200'>
        <h2 className='text-lg font-semibold text-gray-900 flex items-center gap-2'>
          <MessageSquare className='h-5 w-5 text-blue-600' />
          Messages
        </h2>
        <div className='relative mt-3'>
          <Search className='absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4' />
          <Input
            placeholder='Search conversations...'
            value={searchQuery}
            onChange={(e) => handleSearch(e.target.value)}
            className='pl-10'
          />
        </div>
      </div>

      <div className='flex-1 overflow-y-auto'>
        <div className='p-2'>
          {conversations.length === 0 ? (
            <div className='text-center py-8'>
              <MessageSquare className='h-12 w-12 text-gray-400 mx-auto mb-4' />
              <h3 className='text-lg font-medium text-gray-900 mb-2'>
                No conversations yet
              </h3>
              <p className='text-gray-600'>
                Start a conversation with someone to begin messaging
              </p>
            </div>
          ) : (
            conversations.map((conversation) => {
              const isSelected = currentConversation?.id === conversation.id;
              const Icon = getConversationIcon(conversation);

              return (
                <div
                  key={conversation.id}
                  className={`p-3 rounded-lg cursor-pointer transition-colors border border-transparent group ${
                    isSelected
                      ? 'bg-blue-50 border-blue-200 shadow-sm'
                      : 'hover:bg-white hover:border-gray-200'
                  }`}
                  onClick={() => onSelectConversation(conversation)}
                >
                  <div className='flex items-center gap-3'>
                    <div className='relative'>
                      {conversation.type === 'group' ? (
                        <div className='h-10 w-10 rounded-full bg-gray-200 flex items-center justify-center'>
                          <Icon className='h-5 w-5 text-gray-600' />
                        </div>
                      ) : (
                        <UserAvatar
                          user={
                            conversation.participants?.find(
                              (p) => p.user_id !== currentUser.id
                            )?.user || ({} as User)
                          }
                          size='md'
                          showOnlineStatus={true}
                        />
                      )}
                    </div>

                    <div className='flex-1 min-w-0'>
                      <div className='flex items-center justify-between'>
                        <h4 className='font-medium text-gray-900 truncate'>
                          {getConversationName(conversation)}
                        </h4>
                        <div className='flex items-center gap-2 flex-shrink-0 ml-2'>
                          {conversation.last_message && (
                            <span className='text-xs text-gray-500'>
                              {formatLastMessageTime(
                                conversation.last_message.created_at
                              )}
                            </span>
                          )}
                          {conversation.unread_count &&
                            conversation.unread_count > 0 && (
                              <Badge
                                variant='default'
                                className='h-5 w-5 p-0 flex items-center justify-center text-xs'
                              >
                                {conversation.unread_count > 99
                                  ? '99+'
                                  : conversation.unread_count}
                              </Badge>
                            )}
                        </div>
                      </div>

                      <div className='flex items-center gap-2'>
                        <Icon className='h-3 w-3 text-gray-500' />
                        <span className='text-xs text-gray-500'>
                          {getConversationRole(conversation)}
                        </span>
                      </div>

                      {conversation.last_message && (
                        <p className='text-sm text-gray-600 truncate max-w-full mt-1'>
                          {conversation.last_message.sender_id ===
                          currentUser.id
                            ? 'You: '
                            : ''}
                          {conversation.last_message.content}
                        </p>
                      )}
                    </div>
                  </div>
                </div>
              );
            })
          )}
        </div>
      </div>
    </div>
  );
};
