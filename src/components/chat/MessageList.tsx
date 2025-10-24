import React, { useEffect, useRef } from 'react';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Message, User } from '@/types/chat';
import { MessageBubble } from './MessageBubble';
import { TypingIndicator } from './TypingIndicator';

interface MessageListProps {
  messages: Message[];
  currentUser: User;
  typingUsers: User[];
  onEditMessage?: (messageId: string, content: string) => void;
  onDeleteMessage?: (messageId: string) => void;
  onReplyToMessage?: (message: Message) => void;
  loading?: boolean;
}

export const MessageList: React.FC<MessageListProps> = ({
  messages,
  currentUser,
  typingUsers,
  onEditMessage,
  onDeleteMessage,
  onReplyToMessage,
  loading = false,
}) => {
  const scrollAreaRef = useRef<HTMLDivElement>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Auto-scroll to bottom when new messages arrive
  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages]);

  // Auto-scroll to bottom when typing users change
  useEffect(() => {
    if (messagesEndRef.current && typingUsers.length > 0) {
      messagesEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [typingUsers]);

  if (loading) {
    return (
      <ScrollArea className='flex-1 p-4'>
        <div className='space-y-4'>
          {[...Array(5)].map((_, i) => (
            <div key={i} className='animate-pulse'>
              <div
                className={`flex ${
                  i % 2 === 0 ? 'justify-start' : 'justify-end'
                } mb-4`}
              >
                <div className='max-w-xs sm:max-w-sm lg:max-w-md px-4 py-2 rounded-lg bg-gray-200'>
                  <div className='h-4 bg-gray-300 rounded mb-2'></div>
                  <div className='h-3 bg-gray-300 rounded w-1/2'></div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </ScrollArea>
    );
  }

  if (messages.length === 0) {
    return (
      <ScrollArea className='flex-1 p-4'>
        <div className='flex-1 flex items-center justify-center'>
          <div className='text-center'>
            <div className='h-12 w-12 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4'>
              <svg
                className='h-6 w-6 text-gray-400'
                fill='none'
                stroke='currentColor'
                viewBox='0 0 24 24'
              >
                <path
                  strokeLinecap='round'
                  strokeLinejoin='round'
                  strokeWidth={2}
                  d='M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z'
                />
              </svg>
            </div>
            <h3 className='text-lg font-medium text-gray-900 mb-2'>
              No messages yet
            </h3>
            <p className='text-gray-600'>
              Start the conversation by sending a message
            </p>
          </div>
        </div>
      </ScrollArea>
    );
  }

  return (
    <ScrollArea className='flex-1 p-4' ref={scrollAreaRef}>
      <div className='space-y-4'>
        {messages.map((message, index) => {
          const previousMessage = index > 0 ? messages[index - 1] : null;
          const showAvatar =
            !previousMessage ||
            previousMessage.sender_id !== message.sender_id ||
            new Date(message.created_at).getTime() -
              new Date(previousMessage.created_at).getTime() >
              300000; // 5 minutes

          return (
            <div key={message.id} className='group'>
              <MessageBubble
                message={message}
                currentUser={currentUser}
                onEdit={onEditMessage}
                onDelete={onDeleteMessage}
                onReply={onReplyToMessage}
                showAvatar={showAvatar}
              />
            </div>
          );
        })}

        {/* Typing indicator */}
        <TypingIndicator typingUsers={typingUsers} currentUser={currentUser} />

        {/* Scroll anchor */}
        <div ref={messagesEndRef} />
      </div>
    </ScrollArea>
  );
};
