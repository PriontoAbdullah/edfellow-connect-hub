import React, { useState, useEffect } from 'react';
import { User } from '@/types/chat';
import { UserAvatar } from './UserAvatar';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Search, X, MessageSquare } from 'lucide-react';
import { ScrollArea } from '@/components/ui/scroll-area';

interface UserSearchProps {
  onSelectUser: (user: User) => void;
  onClose: () => void;
  searchUsers: (query: string) => Promise<User[]>;
  currentUser: User;
}

export const UserSearch: React.FC<UserSearchProps> = ({
  onSelectUser,
  onClose,
  searchUsers,
  currentUser,
}) => {
  const [query, setQuery] = useState('');
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSearch = async (searchQuery: string) => {
    if (!searchQuery.trim()) {
      setUsers([]);
      return;
    }

    try {
      setLoading(true);
      setError(null);
      const results = await searchUsers(searchQuery);
      setUsers(results);
    } catch (err) {
      console.error('Error searching users:', err);
      setError('Failed to search users');
    } finally {
      setLoading(false);
    }
  };

  const handleQueryChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setQuery(value);

    // Debounce search
    const timeoutId = setTimeout(() => {
      handleSearch(value);
    }, 300);

    return () => clearTimeout(timeoutId);
  };

  const handleUserSelect = (user: User) => {
    onSelectUser(user);
    onClose();
  };

  const getRoleColor = (role: string) => {
    switch (role) {
      case 'professor':
        return 'text-blue-600';
      case 'university':
        return 'text-purple-600';
      case 'student':
      default:
        return 'text-green-600';
    }
  };

  const getRoleLabel = (role: string) => {
    switch (role) {
      case 'professor':
        return 'Professor';
      case 'university':
        return 'University';
      case 'student':
      default:
        return 'Student';
    }
  };

  return (
    <div className='fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50'>
      <div className='bg-white rounded-lg shadow-xl w-full max-w-md mx-4 max-h-[80vh] flex flex-col'>
        {/* Header */}
        <div className='p-4 border-b border-gray-200 flex items-center justify-between'>
          <h2 className='text-lg font-semibold text-gray-900'>
            Start New Chat
          </h2>
          <Button
            variant='ghost'
            size='sm'
            onClick={onClose}
            className='h-8 w-8 p-0'
          >
            <X className='h-4 w-4' />
          </Button>
        </div>

        {/* Search Input */}
        <div className='p-4 border-b border-gray-200'>
          <div className='relative'>
            <Search className='absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4' />
            <Input
              placeholder='Search by name or email...'
              value={query}
              onChange={handleQueryChange}
              className='pl-10'
            />
          </div>
        </div>

        {/* Results */}
        <ScrollArea className='flex-1'>
          <div className='p-4'>
            {loading ? (
              <div className='space-y-3'>
                {[...Array(3)].map((_, i) => (
                  <div key={i} className='animate-pulse'>
                    <div className='flex items-center gap-3 p-3 rounded-lg'>
                      <div className='h-10 w-10 bg-gray-300 rounded-full'></div>
                      <div className='flex-1'>
                        <div className='h-4 bg-gray-300 rounded mb-2'></div>
                        <div className='h-3 bg-gray-300 rounded w-1/2'></div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ) : error ? (
              <div className='text-center py-8'>
                <p className='text-red-600'>{error}</p>
              </div>
            ) : users.length === 0 && query.trim() ? (
              <div className='text-center py-8'>
                <Search className='h-12 w-12 text-gray-400 mx-auto mb-4' />
                <h3 className='text-lg font-medium text-gray-900 mb-2'>
                  No users found
                </h3>
                <p className='text-gray-600'>
                  Try searching with a different name or email
                </p>
              </div>
            ) : users.length === 0 ? (
              <div className='text-center py-8'>
                <MessageSquare className='h-12 w-12 text-gray-400 mx-auto mb-4' />
                <h3 className='text-lg font-medium text-gray-900 mb-2'>
                  Search for users
                </h3>
                <p className='text-gray-600'>
                  Enter a name or email to find someone to chat with
                </p>
              </div>
            ) : (
              <div className='space-y-2'>
                {users.map((user) => (
                  <div
                    key={user.id}
                    className='flex items-center gap-3 p-3 rounded-lg hover:bg-gray-50 cursor-pointer transition-colors'
                    onClick={() => handleUserSelect(user)}
                  >
                    <UserAvatar user={user} size='md' showOnlineStatus={true} />
                    <div className='flex-1 min-w-0'>
                      <div className='flex items-center gap-2'>
                        <h4 className='font-medium text-gray-900 truncate'>
                          {user.display_name}
                        </h4>
                        <span
                          className={`text-xs font-medium ${getRoleColor(
                            user.role
                          )}`}
                        >
                          {getRoleLabel(user.role)}
                        </span>
                      </div>
                      <p className='text-sm text-gray-600 truncate'>
                        {user.university && user.department
                          ? `${user.department}, ${user.university}`
                          : user.university ||
                            user.department ||
                            'No affiliation'}
                      </p>
                    </div>
                    <Button
                      variant='ghost'
                      size='sm'
                      className='h-8 w-8 p-0 text-blue-600 hover:text-blue-800'
                    >
                      <MessageSquare className='h-4 w-4' />
                    </Button>
                  </div>
                ))}
              </div>
            )}
          </div>
        </ScrollArea>
      </div>
    </div>
  );
};
