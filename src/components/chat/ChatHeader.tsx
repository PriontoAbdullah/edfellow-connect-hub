import React from 'react';
import { Conversation, User } from '@/types/chat';
import { UserAvatar } from './UserAvatar';
import { Button } from '@/components/ui/button';
import {
  Phone,
  Video,
  MoreHorizontal,
  Users,
  MessageSquare,
} from 'lucide-react';

interface ChatHeaderProps {
  conversation: Conversation;
  currentUser: User;
  onCall?: () => void;
  onVideoCall?: () => void;
  onMoreOptions?: () => void;
}

export const ChatHeader: React.FC<ChatHeaderProps> = ({
  conversation,
  currentUser,
  onCall,
  onVideoCall,
  onMoreOptions,
}) => {
  const getConversationName = () => {
    if (conversation.type === 'group' && conversation.name) {
      return conversation.name;
    }

    // For direct conversations, show the other participant's name
    const otherParticipant = conversation.participants?.find(
      (p) => p.user_id !== currentUser.id
    );
    return otherParticipant?.user?.display_name || 'Unknown User';
  };

  const getConversationRole = () => {
    if (conversation.type === 'group') {
      return 'Group Chat';
    }

    const otherParticipant = conversation.participants?.find(
      (p) => p.user_id !== currentUser.id
    );
    return otherParticipant?.user?.role || 'User';
  };

  const getConversationIcon = () => {
    return conversation.type === 'group' ? Users : MessageSquare;
  };

  const getOtherParticipant = () => {
    return conversation.participants?.find((p) => p.user_id !== currentUser.id)
      ?.user;
  };

  const isOnline = () => {
    if (conversation.type === 'group') {
      return false; // Groups don't have online status
    }

    const otherParticipant = getOtherParticipant();
    return otherParticipant?.is_online || false;
  };

  const Icon = getConversationIcon();
  const otherParticipant = getOtherParticipant();

  return (
    <div className='p-4 border-b border-gray-200 flex items-center justify-between bg-white'>
      <div className='flex items-center gap-3'>
        {conversation.type === 'group' ? (
          <div className='h-10 w-10 rounded-full bg-gray-200 flex items-center justify-center'>
            <Icon className='h-5 w-5 text-gray-600' />
          </div>
        ) : (
          <UserAvatar
            user={otherParticipant || ({} as User)}
            size='md'
            showOnlineStatus={true}
          />
        )}

        <div>
          <h3 className='font-semibold text-gray-900 flex items-center gap-2'>
            {getConversationName()}
            {isOnline() && (
              <div className='h-2 w-2 bg-green-500 rounded-full'></div>
            )}
          </h3>
          <p className='text-sm text-gray-600 flex items-center gap-1'>
            <Icon className='h-3 w-3' />
            {getConversationRole()}
          </p>
        </div>
      </div>

      <div className='flex items-center gap-2'>
        <Button
          variant='ghost'
          size='sm'
          onClick={onCall}
          className='h-8 w-8 p-0'
        >
          <Phone className='h-4 w-4' />
        </Button>
        <Button
          variant='ghost'
          size='sm'
          onClick={onVideoCall}
          className='h-8 w-8 p-0'
        >
          <Video className='h-4 w-4' />
        </Button>
        <Button
          variant='ghost'
          size='sm'
          onClick={onMoreOptions}
          className='h-8 w-8 p-0'
        >
          <MoreHorizontal className='h-4 w-4' />
        </Button>
      </div>
    </div>
  );
};
