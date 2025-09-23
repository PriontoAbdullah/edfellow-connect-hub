import React from 'react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { User } from '@/types/chat';

interface UserAvatarProps {
  user: User;
  size?: 'sm' | 'md' | 'lg';
  showOnlineStatus?: boolean;
  className?: string;
}

const sizeClasses = {
  sm: 'h-8 w-8',
  md: 'h-10 w-10',
  lg: 'h-12 w-12',
};

export const UserAvatar: React.FC<UserAvatarProps> = ({
  user,
  size = 'md',
  showOnlineStatus = false,
  className = '',
}) => {
  const getInitials = (name: string) => {
    return name
      .split(' ')
      .map((word) => word.charAt(0))
      .join('')
      .toUpperCase()
      .slice(0, 2);
  };

  const getRoleColor = (role: string) => {
    switch (role) {
      case 'professor':
        return 'bg-blue-100 text-blue-800';
      case 'university':
        return 'bg-purple-100 text-purple-800';
      case 'student':
      default:
        return 'bg-green-100 text-green-800';
    }
  };

  return (
    <div className={`relative ${className}`}>
      <Avatar className={sizeClasses[size]}>
        <AvatarImage src={user.avatar} alt={user.display_name} />
        <AvatarFallback className={getRoleColor(user.role)}>
          {getInitials(user.display_name)}
        </AvatarFallback>
      </Avatar>

      {showOnlineStatus && user.is_online && (
        <div className='absolute -bottom-1 -right-1 h-3 w-3 bg-green-500 rounded-full border-2 border-white'></div>
      )}
    </div>
  );
};
