import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { ScrollArea } from '@/components/ui/scroll-area';
import {
  MessageSquare,
  Search,
  Send,
  MoreHorizontal,
  Phone,
  Video,
  Paperclip,
  Smile,
  User,
  Users,
  GraduationCap,
  Building,
} from 'lucide-react';

const Chat = () => {
  const [selectedChat, setSelectedChat] = useState(1);
  const [message, setMessage] = useState('');

  const conversations = [
    {
      id: 1,
      name: 'Dr. Sarah Wilson',
      avatar: 'SW',
      role: 'Professor',
      lastMessage:
        "Thanks for your question about neural networks. I've sent you some additional resources.",
      time: '2 hours ago',
      unread: true,
      online: true,
    },
    {
      id: 2,
      name: 'Computer Science Group',
      avatar: 'CS',
      role: 'Study Group',
      lastMessage:
        'Someone shared a great resource about algorithms and data structures.',
      time: '4 hours ago',
      unread: true,
      online: false,
    },
    {
      id: 3,
      name: 'Prof. Michael Brown',
      avatar: 'MB',
      role: 'Professor',
      lastMessage:
        "Great work on your latest assignment! Let's discuss your research proposal.",
      time: '1 day ago',
      unread: false,
      online: false,
    },
    {
      id: 4,
      name: 'AI Research Students',
      avatar: 'AI',
      role: 'Study Group',
      lastMessage:
        "Next meeting scheduled for Friday at 3 PM. Don't forget to prepare your presentations.",
      time: '2 days ago',
      unread: false,
      online: false,
    },
    {
      id: 5,
      name: 'Dr. Johnson',
      avatar: 'DJ',
      role: 'Professor',
      lastMessage:
        'Your mentoring session starts in 30 minutes. Are you ready?',
      time: '2 days ago',
      unread: false,
      online: true,
    },
  ];

  const messages = [
    {
      id: 1,
      sender: 'Dr. Sarah Wilson',
      content: 'Hi Zunnun! I received your question about neural networks.',
      time: '10:30 AM',
      isOwn: false,
    },
    {
      id: 2,
      sender: 'You',
      content:
        "Hi Dr. Wilson! Yes, I'm working on a project and need some guidance.",
      time: '10:32 AM',
      isOwn: true,
    },
    {
      id: 3,
      sender: 'Dr. Sarah Wilson',
      content: 'That sounds great! What specific aspect are you focusing on?',
      time: '10:35 AM',
      isOwn: false,
    },
    {
      id: 4,
      sender: 'You',
      content:
        "I'm implementing a convolutional neural network for image classification.",
      time: '10:37 AM',
      isOwn: true,
    },
    {
      id: 5,
      sender: 'Dr. Sarah Wilson',
      content:
        "Excellent choice! I've sent you some additional resources and research papers that might help.",
      time: '10:40 AM',
      isOwn: false,
    },
    {
      id: 6,
      sender: 'Dr. Sarah Wilson',
      content:
        'Also, consider looking into transfer learning with pre-trained models like ResNet or VGG.',
      time: '10:41 AM',
      isOwn: false,
    },
  ];

  const currentChat = conversations.find((chat) => chat.id === selectedChat);

  const handleSendMessage = () => {
    if (message.trim()) {
      // Here you would typically send the message to the API
      setMessage('');
    }
  };

  const getRoleIcon = (role: string) => {
    switch (role) {
      case 'Professor':
        return User;
      case 'Study Group':
        return Users;
      default:
        return User;
    }
  };

  const RoleIcon = currentChat ? getRoleIcon(currentChat.role) : User;

  return (
    <div className='h-[calc(100vh-120px)] flex'>
      {/* Conversations Sidebar */}
      <div className='w-80 border-r border-gray-200 flex flex-col'>
        <div className='p-4 border-b border-gray-200'>
          <h2 className='text-lg font-semibold text-gray-900 flex items-center gap-2'>
            <MessageSquare className='h-5 w-5 text-blue-600' />
            Messages
          </h2>
          <div className='relative mt-3'>
            <Search className='absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4' />
            <Input placeholder='Search conversations...' className='pl-10' />
          </div>
        </div>

        <ScrollArea className='flex-1'>
          <div className='p-2'>
            {conversations.map((conversation) => (
              <div
                key={conversation.id}
                className={`p-3 rounded-lg cursor-pointer transition-colors ${
                  selectedChat === conversation.id
                    ? 'bg-blue-50 border border-blue-200'
                    : 'hover:bg-gray-50'
                }`}
                onClick={() => setSelectedChat(conversation.id)}
              >
                <div className='flex items-center gap-3'>
                  <div className='relative'>
                    <Avatar className='h-10 w-10'>
                      <AvatarFallback className='text-sm'>
                        {conversation.avatar}
                      </AvatarFallback>
                    </Avatar>
                    {conversation.online && (
                      <div className='absolute -bottom-1 -right-1 h-3 w-3 bg-green-500 rounded-full border-2 border-white'></div>
                    )}
                  </div>
                  <div className='flex-1 min-w-0'>
                    <div className='flex items-center justify-between'>
                      <h4 className='font-medium text-gray-900 truncate'>
                        {conversation.name}
                      </h4>
                      <span className='text-xs text-gray-500'>
                        {conversation.time}
                      </span>
                    </div>
                    <p className='text-sm text-gray-600 truncate'>
                      {conversation.lastMessage}
                    </p>
                  </div>
                  {conversation.unread && (
                    <div className='h-2 w-2 bg-blue-600 rounded-full'></div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </ScrollArea>
      </div>

      {/* Chat Area */}
      <div className='flex-1 flex flex-col'>
        {currentChat ? (
          <>
            {/* Chat Header */}
            <div className='p-4 border-b border-gray-200 flex items-center justify-between'>
              <div className='flex items-center gap-3'>
                <Avatar className='h-10 w-10'>
                  <AvatarFallback className='text-sm'>
                    {currentChat.avatar}
                  </AvatarFallback>
                </Avatar>
                <div>
                  <h3 className='font-semibold text-gray-900 flex items-center gap-2'>
                    {currentChat.name}
                    {currentChat.online && (
                      <div className='h-2 w-2 bg-green-500 rounded-full'></div>
                    )}
                  </h3>
                  <p className='text-sm text-gray-600 flex items-center gap-1'>
                    <RoleIcon className='h-3 w-3' />
                    {currentChat.role}
                  </p>
                </div>
              </div>
              <div className='flex items-center gap-2'>
                <Button variant='ghost' size='sm'>
                  <Phone className='h-4 w-4' />
                </Button>
                <Button variant='ghost' size='sm'>
                  <Video className='h-4 w-4' />
                </Button>
                <Button variant='ghost' size='sm'>
                  <MoreHorizontal className='h-4 w-4' />
                </Button>
              </div>
            </div>

            {/* Messages */}
            <ScrollArea className='flex-1 p-4'>
              <div className='space-y-4'>
                {messages.map((msg) => (
                  <div
                    key={msg.id}
                    className={`flex ${
                      msg.isOwn ? 'justify-end' : 'justify-start'
                    }`}
                  >
                    <div
                      className={`max-w-xs lg:max-w-md px-4 py-2 rounded-lg ${
                        msg.isOwn
                          ? 'bg-blue-600 text-white'
                          : 'bg-gray-100 text-gray-900'
                      }`}
                    >
                      <p className='text-sm'>{msg.content}</p>
                      <p
                        className={`text-xs mt-1 ${
                          msg.isOwn ? 'text-blue-100' : 'text-gray-500'
                        }`}
                      >
                        {msg.time}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </ScrollArea>

            {/* Message Input */}
            <div className='p-4 border-t border-gray-200'>
              <div className='flex items-center gap-2'>
                <Button variant='ghost' size='sm'>
                  <Paperclip className='h-4 w-4' />
                </Button>
                <Input
                  placeholder='Type a message...'
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                  className='flex-1'
                />
                <Button variant='ghost' size='sm'>
                  <Smile className='h-4 w-4' />
                </Button>
                <Button
                  onClick={handleSendMessage}
                  disabled={!message.trim()}
                  className='bg-blue-600 hover:bg-blue-700'
                >
                  <Send className='h-4 w-4' />
                </Button>
              </div>
            </div>
          </>
        ) : (
          <div className='flex-1 flex items-center justify-center'>
            <div className='text-center'>
              <MessageSquare className='h-12 w-12 text-gray-400 mx-auto mb-4' />
              <h3 className='text-lg font-medium text-gray-900 mb-2'>
                Select a conversation
              </h3>
              <p className='text-gray-600'>
                Choose a conversation from the sidebar to start messaging
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Chat;
