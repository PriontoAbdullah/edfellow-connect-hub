import React, { useState, useRef, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Paperclip, Smile, Send, X } from 'lucide-react';
import { Message } from '@/types/chat';
import { useToast } from '@/hooks/use-toast';

interface MessageInputProps {
  onSendMessage: (content: string, replyTo?: Message) => void;
  onTyping: () => void;
  onStopTyping: () => void;
  disabled?: boolean;
  placeholder?: string;
  replyTo?: Message | null;
  onCancelReply?: () => void;
}

export const MessageInput: React.FC<MessageInputProps> = ({
  onSendMessage,
  onTyping,
  onStopTyping,
  disabled = false,
  placeholder = 'Type a message...',
  replyTo,
  onCancelReply,
}) => {
  const [message, setMessage] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const typingTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const { toast } = useToast();

  const handleSendMessage = () => {
    if (message.trim() && !disabled) {
      onSendMessage(message.trim(), replyTo || undefined);
      setMessage('');
      setIsTyping(false);
      onStopTyping();
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setMessage(value);

    // Handle typing indicators
    if (value.trim() && !isTyping) {
      setIsTyping(true);
      onTyping();
    } else if (!value.trim() && isTyping) {
      setIsTyping(false);
      onStopTyping();
    }

    // Reset typing timeout
    if (typingTimeoutRef.current) {
      clearTimeout(typingTimeoutRef.current);
    }

    if (value.trim()) {
      typingTimeoutRef.current = setTimeout(() => {
        setIsTyping(false);
        onStopTyping();
      }, 3000);
    }
  };

  const handleFileUpload = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      // Check file size (limit to 10MB)
      if (file.size > 10 * 1024 * 1024) {
        toast({
          title: 'File too large',
          description: 'Please select a file smaller than 10MB.',
          variant: 'destructive',
        });
        return;
      }

      // Check file type
      const allowedTypes = [
        'image/jpeg',
        'image/png',
        'image/gif',
        'image/webp',
        'application/pdf',
        'text/plain',
        'application/msword',
        'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
      ];

      if (!allowedTypes.includes(file.type)) {
        toast({
          title: 'File type not supported',
          description: 'Please select an image, PDF, or document file.',
          variant: 'destructive',
        });
        return;
      }

      // For now, just show a success message
      // In a real implementation, you would upload the file to a server
      toast({
        title: 'File selected',
        description: `${file.name} (${(file.size / 1024 / 1024).toFixed(2)}MB)`,
      });

      // TODO: Implement actual file upload to server
      console.log('File selected:', file);
    }
  };

  const handleEmojiClick = () => {
    setShowEmojiPicker(!showEmojiPicker);
  };

  const handleEmojiSelect = (emoji: string) => {
    setMessage((prev) => prev + emoji);
    setShowEmojiPicker(false);
    if (inputRef.current) {
      inputRef.current.focus();
    }
  };

  // Common emojis for quick access
  const commonEmojis = [
    '😀',
    '😃',
    '😄',
    '😁',
    '😆',
    '😅',
    '😂',
    '🤣',
    '😊',
    '😇',
    '🙂',
    '🙃',
    '😉',
    '😌',
    '😍',
    '🥰',
    '😘',
    '😗',
    '😙',
    '😚',
    '😋',
    '😛',
    '😝',
    '😜',
    '🤪',
    '🤨',
    '🧐',
    '🤓',
    '😎',
    '🤩',
    '🥳',
    '😏',
    '😒',
    '😞',
    '😔',
    '😟',
    '😕',
    '🙁',
    '☹️',
    '😣',
    '😖',
    '😫',
    '😩',
    '🥺',
    '😢',
    '😭',
    '😤',
    '😠',
    '😡',
    '🤬',
    '🤯',
    '😳',
    '🥵',
    '🥶',
    '😱',
    '😨',
    '😰',
    '😥',
    '😓',
    '🤗',
    '🤔',
    '🤭',
    '🤫',
    '🤥',
    '😶',
    '😐',
    '😑',
    '😬',
    '🙄',
    '😯',
    '😦',
    '😧',
    '😮',
    '😲',
    '🥱',
    '😴',
    '🤤',
    '😪',
    '😵',
    '🤐',
    '🥴',
    '🤢',
    '🤮',
    '🤧',
    '😷',
    '🤒',
    '🤕',
    '🤑',
    '🤠',
    '😈',
    '👿',
    '👹',
    '👺',
    '🤡',
    '💩',
    '👻',
    '💀',
    '☠️',
    '👽',
    '👾',
    '🤖',
    '🎃',
    '😺',
    '😸',
    '😹',
    '😻',
    '😼',
    '😽',
    '🙀',
    '😿',
    '😾',
  ];

  // Cleanup typing timeout on unmount
  useEffect(() => {
    return () => {
      if (typingTimeoutRef.current) {
        clearTimeout(typingTimeoutRef.current);
      }
    };
  }, []);

  // Focus input when reply changes
  useEffect(() => {
    if (replyTo && inputRef.current) {
      inputRef.current.focus();
    }
  }, [replyTo]);

  // Close emoji picker when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        showEmojiPicker &&
        !(event.target as Element).closest('.emoji-picker')
      ) {
        setShowEmojiPicker(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [showEmojiPicker]);

  return (
    <div className='p-4 border-t border-gray-200 bg-white relative'>
      {/* Hidden file input */}
      <input
        ref={fileInputRef}
        type='file'
        onChange={handleFileChange}
        className='hidden'
        accept='image/*,.pdf,.doc,.docx,.txt'
      />

      {/* Emoji picker */}
      {showEmojiPicker && (
        <div className='emoji-picker absolute bottom-16 right-4 bg-white border border-gray-200 rounded-lg shadow-lg p-3 max-h-48 overflow-y-auto z-10'>
          <div className='grid grid-cols-8 gap-1'>
            {commonEmojis.map((emoji, index) => (
              <button
                key={index}
                onClick={() => handleEmojiSelect(emoji)}
                className='p-1 hover:bg-gray-100 rounded text-lg'
                type='button'
              >
                {emoji}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Reply indicator */}
      {replyTo && (
        <div className='mb-3 p-3 bg-blue-50 border border-blue-200 rounded-lg'>
          <div className='flex items-center justify-between'>
            <div className='flex-1'>
              <p className='text-sm font-medium text-blue-900'>
                Replying to {replyTo.sender?.display_name}
              </p>
              <p className='text-sm text-blue-700 truncate'>
                {replyTo.content}
              </p>
            </div>
            <Button
              variant='ghost'
              size='sm'
              onClick={onCancelReply}
              className='h-6 w-6 p-0 text-blue-600 hover:text-blue-800'
            >
              <X className='h-4 w-4' />
            </Button>
          </div>
        </div>
      )}

      {/* Message input */}
      <div className='flex items-center gap-2'>
        <Button
          variant='ghost'
          size='sm'
          onClick={handleFileUpload}
          disabled={disabled}
          className='h-8 w-8 p-0'
          title='Attach file'
        >
          <Paperclip className='h-4 w-4' />
        </Button>

        <Input
          ref={inputRef}
          placeholder={placeholder}
          value={message}
          onChange={handleInputChange}
          onKeyPress={handleKeyPress}
          disabled={disabled}
          className='flex-1'
        />

        <Button
          variant='ghost'
          size='sm'
          onClick={handleEmojiClick}
          disabled={disabled}
          className={`h-8 w-8 p-0 ${showEmojiPicker ? 'bg-gray-100' : ''}`}
          title='Add emoji'
        >
          <Smile className='h-4 w-4' />
        </Button>

        <Button
          onClick={handleSendMessage}
          disabled={!message.trim() || disabled}
          className='bg-blue-600 hover:bg-blue-700 h-8 w-8 p-0'
          title='Send message'
        >
          <Send className='h-4 w-4' />
        </Button>
      </div>
    </div>
  );
};
