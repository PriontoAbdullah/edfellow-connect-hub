import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Breadcrumb } from '../../dashboard/Breadcrumb';
import CallModal from '../../modals/CallModal';
import {
  MessageSquare,
  Search,
  Phone,
  Video,
  Archive,
  MoreVertical,
  Trash2,
  Star,
  Archive as ArchiveIcon,
} from 'lucide-react';
import { CountryFlag } from '@/components/ui/CountryFlag';
import { getCountryCode } from '@/lib/countries';

const ProfessorChat = () => {
  const [selectedChat, setSelectedChat] = useState(null);
  const [callModalOpen, setCallModalOpen] = useState(false);
  const [callType, setCallType] = useState<'audio' | 'video'>('audio');
  const [selectedContact, setSelectedContact] = useState('');

  // Scroll to top on component mount
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);

  const conversations = [
    {
      id: 1,
      name: 'Alice Chen',
      role: 'Graduate Student',
      major: 'Computer Science',
      lastMessage: 'Thank you for your guidance on my thesis proposal',
      time: '1h ago',
      unread: 0,
      online: true,
      type: 'student',
      university: 'Stanford University',
      country: 'China',
    },
    {
      id: 2,
      name: 'AI Research Group',
      role: 'Faculty Group',
      lastMessage: 'Dr. Rodriguez: New paper on neural networks',
      time: '3h ago',
      unread: 2,
      online: false,
      type: 'group',
      members: 8,
    },
    {
      id: 3,
      name: 'Bob Wilson',
      role: 'Undergraduate Student',
      major: 'Data Science',
      lastMessage:
        'Could we schedule a meeting to discuss my capstone project?',
      time: '5h ago',
      unread: 1,
      online: false,
      type: 'student',
      university: 'MIT',
      country: 'United States',
    },
    {
      id: 4,
      name: 'Maria Rodriguez',
      role: 'PhD Candidate',
      major: 'Machine Learning',
      lastMessage: 'The conference paper is ready for your review',
      time: '1d ago',
      unread: 0,
      online: true,
      type: 'student',
      university: 'Harvard University',
      country: 'Spain',
    },
  ];

  return (
    <div className='p-6 space-y-6'>
      <Breadcrumb
        items={[{ label: 'Dashboard', href: '/dashboard' }, { label: 'Chat' }]}
      />

      <div className='flex justify-between items-center'>
        <div>
          <h1 className='text-2xl font-bold text-gray-900'>Messages</h1>
          <p className='text-gray-600'>
            Communicate with students and fellow faculty
          </p>
        </div>
        <Button className='bg-blue-600 hover:bg-blue-700'>
          <Archive className='h-4 w-4 mr-2' />
          Archived
        </Button>
      </div>

      <div className='grid lg:grid-cols-3 gap-6 h-[600px]'>
        {/* Chat List */}
        <Card className='lg:col-span-1'>
          <CardHeader>
            <CardTitle className='text-lg flex items-center gap-2'>
              <MessageSquare className='h-5 w-5' />
              Conversations
            </CardTitle>
            <div className='relative'>
              <Search className='absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4' />
              <Input placeholder='Search conversations...' className='pl-10' />
            </div>
          </CardHeader>
          <CardContent className='p-0'>
            <div className='space-y-1'>
              {conversations.map((conversation) => (
                <div
                  key={conversation.id}
                  className={`p-4 hover:bg-gray-50 cursor-pointer border-l-4 ${
                    selectedChat === conversation.id
                      ? 'border-blue-500 bg-blue-50'
                      : 'border-transparent'
                  }`}
                  onClick={() => setSelectedChat(conversation.id)}
                >
                  <div className='flex items-start space-x-3'>
                    <div className='relative'>
                      <Avatar className='h-10 w-10'>
                        <AvatarFallback className='bg-blue-100 text-blue-600'>
                          {conversation.name
                            .split(' ')
                            .map((n) => n[0])
                            .join('')}
                        </AvatarFallback>
                      </Avatar>
                      {conversation.online && (
                        <div className='absolute -bottom-1 -right-1 w-3 h-3 bg-green-500 rounded-full border-2 border-white'></div>
                      )}
                    </div>
                    <div className='flex-1 min-w-0'>
                      <div className='flex items-center justify-between'>
                        <div className='flex items-center gap-2'>
                          <p className='text-sm font-medium text-gray-900 truncate'>
                            {conversation.name}
                          </p>
                          {conversation.country && (
                            <CountryFlag
                              code={getCountryCode(conversation.country) || ''}
                              size={16}
                            />
                          )}
                        </div>
                        <div className='flex items-center gap-2'>
                          {conversation.unread > 0 && (
                            <Badge className='bg-red-100 text-red-700 text-xs'>
                              {conversation.unread}
                            </Badge>
                          )}
                          <span className='text-xs text-gray-500'>
                            {conversation.time}
                          </span>
                        </div>
                      </div>
                      <div className='flex items-center justify-between'>
                        <p className='text-sm text-gray-600 truncate'>
                          {conversation.lastMessage}
                        </p>
                      </div>
                      <div className='flex items-center justify-between mt-1'>
                        <div className='flex flex-col'>
                          <Badge variant='outline' className='text-xs w-fit'>
                            {conversation.type === 'student'
                              ? conversation.role
                              : conversation.type === 'group'
                              ? `Group (${conversation.members})`
                              : 'Faculty'}
                          </Badge>
                          {conversation.major && (
                            <span className='text-xs text-gray-500 mt-1'>
                              {conversation.major}
                            </span>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Chat Window */}
        <Card className='lg:col-span-2'>
          {selectedChat ? (
            <div className='h-full flex flex-col'>
              <CardHeader className='border-b'>
                <div className='flex items-center justify-between'>
                  <div className='flex items-center space-x-3'>
                    <Avatar className='h-10 w-10'>
                      <AvatarFallback className='bg-blue-100 text-blue-600'>
                        {conversations
                          .find((c) => c.id === selectedChat)
                          ?.name.split(' ')
                          .map((n) => n[0])
                          .join('')}
                      </AvatarFallback>
                    </Avatar>
                    <div>
                      <div className='flex items-center gap-2'>
                        <h3 className='font-medium text-gray-900'>
                          {
                            conversations.find((c) => c.id === selectedChat)
                              ?.name
                          }
                        </h3>
                        {conversations.find((c) => c.id === selectedChat)
                          ?.country && (
                          <CountryFlag
                            code={
                              getCountryCode(
                                conversations.find((c) => c.id === selectedChat)
                                  ?.country || ''
                              ) || ''
                            }
                            size={16}
                          />
                        )}
                      </div>
                      <div className='text-sm text-gray-600'>
                        <p>
                          {
                            conversations.find((c) => c.id === selectedChat)
                              ?.role
                          }
                        </p>
                        {conversations.find((c) => c.id === selectedChat)
                          ?.university && (
                          <p className='text-xs'>
                            {
                              conversations.find((c) => c.id === selectedChat)
                                ?.university
                            }
                          </p>
                        )}
                      </div>
                    </div>
                  </div>
                  <div className='flex items-center gap-2'>
                    <Button
                      size='sm'
                      variant='outline'
                      onClick={() => {
                        setSelectedContact(
                          conversations.find((c) => c.id === selectedChat)
                            ?.name || ''
                        );
                        setCallType('audio');
                        setCallModalOpen(true);
                      }}
                    >
                      <Phone className='h-4 w-4' />
                    </Button>
                    <Button
                      size='sm'
                      variant='outline'
                      onClick={() => {
                        setSelectedContact(
                          conversations.find((c) => c.id === selectedChat)
                            ?.name || ''
                        );
                        setCallType('video');
                        setCallModalOpen(true);
                      }}
                    >
                      <Video className='h-4 w-4' />
                    </Button>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button size='sm' variant='outline'>
                          <MoreVertical className='h-4 w-4' />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align='end'>
                        <DropdownMenuItem>
                          <Star className='h-4 w-4 mr-2' />
                          Add to Favorites
                        </DropdownMenuItem>
                        <DropdownMenuItem>
                          <ArchiveIcon className='h-4 w-4 mr-2' />
                          Archive Chat
                        </DropdownMenuItem>
                        <DropdownMenuItem className='text-red-600'>
                          <Trash2 className='h-4 w-4 mr-2' />
                          Delete Chat
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </div>
                </div>
              </CardHeader>
              <CardContent className='flex-1 p-4'>
                <div className='h-full flex items-center justify-center text-gray-500'>
                  <div className='text-center'>
                    <MessageSquare className='h-12 w-12 mx-auto mb-4 text-gray-300' />
                    <p>Chat interface would be implemented here</p>
                    <p className='text-sm mt-2'>
                      Real-time messaging with students and colleagues
                    </p>
                  </div>
                </div>
              </CardContent>
              <div className='p-4 border-t'>
                <div className='flex gap-2'>
                  <Input
                    placeholder='Type your message...'
                    className='flex-1'
                  />
                  <Button className='bg-blue-600 hover:bg-blue-700'>
                    Send
                  </Button>
                </div>
              </div>
            </div>
          ) : (
            <div className='h-full flex items-center justify-center'>
              <div className='text-center text-gray-500'>
                <MessageSquare className='h-16 w-16 mx-auto mb-4 text-gray-300' />
                <h3 className='text-lg font-medium mb-2'>
                  Faculty Messaging Center
                </h3>
                <p>
                  Select a conversation to start communicating with students and
                  colleagues
                </p>
              </div>
            </div>
          )}
        </Card>
      </div>

      {/* Call Modal */}
      <CallModal
        open={callModalOpen}
        onOpenChange={setCallModalOpen}
        contactName={selectedContact}
        isVideoCall={callType === 'video'}
      />
    </div>
  );
};

export default ProfessorChat;
