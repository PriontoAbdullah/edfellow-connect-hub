import React from 'react';
import { Message, User } from '@/types/chat';
import { UserAvatar } from './UserAvatar';
import { formatDistanceToNow } from 'date-fns';
import { Edit2, Trash2, Reply } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface MessageBubbleProps {
  message: Message;
  currentUser: User;
  onEdit?: (messageId: string, content: string) => void;
  onDelete?: (messageId: string) => void;
  onReply?: (message: Message) => void;
  showAvatar?: boolean;
}

export const MessageBubble: React.FC<MessageBubbleProps> = ({
  message,
  currentUser,
  onEdit,
  onDelete,
  onReply,
  showAvatar = true,
}) => {
  const isOwn = message.sender_id === currentUser.id;
  const isEdited = message.is_edited;
  const hasReply = message.reply_to;

  const formatTime = (timestamp: string) => {
    return formatDistanceToNow(new Date(timestamp), { addSuffix: true });
  };

  const handleEdit = () => {
    if (onEdit) {
      onEdit(message.id, message.content);
    }
  };

  const handleDelete = () => {
    if (onDelete) {
      onDelete(message.id);
    }
  };

  const handleReply = () => {
    if (onReply) {
      onReply(message);
    }
  };

  return (
    <div className={`flex ${isOwn ? 'justify-end' : 'justify-start'} mb-4`}>
      <div
        className={`flex max-w-xs lg:max-w-md ${
          isOwn ? 'flex-row-reverse' : 'flex-row'
        } gap-2`}
      >
        {/* Avatar */}
        {showAvatar && !isOwn && message.sender && (
          <UserAvatar user={message.sender} size='sm' />
        )}

        {/* Message content */}
        <div className={`flex flex-col ${isOwn ? 'items-end' : 'items-start'}`}>
          {/* Reply to message */}
          {hasReply && (
            <div
              className={`mb-2 p-2 rounded-lg bg-gray-100 border-l-4 border-blue-500 max-w-xs lg:max-w-md`}
            >
              <p className='text-xs text-gray-600 mb-1'>
                Replying to {message.reply_to?.sender?.display_name}
              </p>
              <p className='text-sm text-gray-800 truncate'>
                {message.reply_to?.content}
              </p>
            </div>
          )}

          {/* Message bubble */}
          <div
            className={`px-4 py-2 rounded-lg ${
              isOwn ? 'bg-blue-600 text-white' : 'bg-gray-100 text-gray-900'
            }`}
          >
            <p className='text-sm whitespace-pre-wrap'>{message.content}</p>

            {/* Message metadata */}
            <div
              className={`flex items-center gap-2 mt-1 ${
                isOwn ? 'text-blue-100' : 'text-gray-500'
              }`}
            >
              <span className='text-xs'>{formatTime(message.created_at)}</span>
              {isEdited && <span className='text-xs italic'>(edited)</span>}
            </div>
          </div>

          {/* Message actions */}
          <div
            className={`flex gap-1 mt-1 ${
              isOwn ? 'flex-row-reverse' : 'flex-row'
            }`}
          >
            <Button
              variant='ghost'
              size='sm'
              onClick={handleReply}
              className='h-6 w-6 p-0 opacity-0 group-hover:opacity-100 transition-opacity'
            >
              <Reply className='h-3 w-3' />
            </Button>

            {isOwn && (
              <>
                <Button
                  variant='ghost'
                  size='sm'
                  onClick={handleEdit}
                  className='h-6 w-6 p-0 opacity-0 group-hover:opacity-100 transition-opacity'
                >
                  <Edit2 className='h-3 w-3' />
                </Button>
                <Button
                  variant='ghost'
                  size='sm'
                  onClick={handleDelete}
                  className='h-6 w-6 p-0 opacity-0 group-hover:opacity-100 transition-opacity text-red-500 hover:text-red-700'
                >
                  <Trash2 className='h-3 w-3' />
                </Button>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
