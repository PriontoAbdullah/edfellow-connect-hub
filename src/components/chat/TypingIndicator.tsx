import React from 'react';
import { User } from '@/types/chat';
import { UserAvatar } from './UserAvatar';

interface TypingIndicatorProps {
  typingUsers: User[];
  currentUser: User;
}

export const TypingIndicator: React.FC<TypingIndicatorProps> = ({
  typingUsers,
  currentUser,
}) => {
  if (typingUsers.length === 0) return null;

  const filteredUsers = typingUsers.filter(
    (user) => user.id !== currentUser.id
  );
  if (filteredUsers.length === 0) return null;

  const getTypingText = () => {
    if (filteredUsers.length === 1) {
      return `${filteredUsers[0].display_name} is typing...`;
    } else if (filteredUsers.length === 2) {
      return `${filteredUsers[0].display_name} and ${filteredUsers[1].display_name} are typing...`;
    } else {
      return `${filteredUsers.length} people are typing...`;
    }
  };

  return (
    <div className='flex items-center gap-2 px-4 py-2 text-sm text-gray-500'>
      <div className='flex -space-x-2'>
        {filteredUsers.slice(0, 3).map((user) => (
          <UserAvatar
            key={user.id}
            user={user}
            size='sm'
            className='border-2 border-white'
          />
        ))}
      </div>
      <span>{getTypingText()}</span>
      <div className='flex gap-1'>
        <div className='w-1 h-1 bg-gray-400 rounded-full animate-bounce'></div>
        <div
          className='w-1 h-1 bg-gray-400 rounded-full animate-bounce'
          style={{ animationDelay: '0.1s' }}
        ></div>
        <div
          className='w-1 h-1 bg-gray-400 rounded-full animate-bounce'
          style={{ animationDelay: '0.2s' }}
        ></div>
      </div>
    </div>
  );
};
