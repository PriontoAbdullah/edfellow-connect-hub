import { useState } from 'react';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Input } from '@/components/ui/input';
import { ScrollArea } from '@/components/ui/scroll-area';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Breadcrumb } from '../../dashboard/Breadcrumb';
import NewChatModal from '../../modals/NewChatModal';
import { useToast } from '@/hooks/use-toast';
import {
  MessageSquare,
  Search,
  Plus,
  Send,
  Phone,
  Video,
  MoreVertical,
  Smile,
  PhoneOff,
  VideoOff,
  Mic,
  MicOff,
  Settings,
  UserPlus,
  Archive,
  Trash2,
  Flag,
  Volume2,
  VolumeX,
} from 'lucide-react';

const StudentChat = () => {
  const [isNewChatOpen, setIsNewChatOpen] = useState(false);
  const [selectedChat, setSelectedChat] = useState(1);
  const [messageInput, setMessageInput] = useState('');
  const [isAudioCallOpen, setIsAudioCallOpen] = useState(false);
  const [isVideoCallOpen, setIsVideoCallOpen] = useState(false);
  const [callDuration, setCallDuration] = useState(0);
  const [isCallActive, setIsCallActive] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [isVideoEnabled, setIsVideoEnabled] = useState(true);
  const [isSpeakerOn, setIsSpeakerOn] = useState(false);
  const { toast } = useToast();

  const conversations = [
    {
      id: 1,
      name: 'Dr. Sarah Wilson',
      role: 'Professor',
      lastMessage:
        'Thanks for your question about neural networks. Here are some resources...',
      time: '2:30 PM',
      unread: 2,
      online: true,
      avatar: 'SW',
    },
    {
      id: 2,
      name: 'AI Study Group',
      role: 'Group',
      lastMessage: 'Mike: Anyone attending the conference next week?',
      time: '1:45 PM',
      unread: 5,
      online: false,
      avatar: 'AI',
    },
    {
      id: 3,
      name: 'Emma Rodriguez',
      role: 'Student',
      lastMessage: 'Hey! How did your presentation go?',
      time: '12:15 PM',
      unread: 0,
      online: true,
      avatar: 'ER',
    },
    {
      id: 4,
      name: 'Prof. Michael Brown',
      role: 'Professor',
      lastMessage:
        "I've reviewed your research proposal. Let's schedule a meeting.",
      time: 'Yesterday',
      unread: 1,
      online: false,
      avatar: 'MB',
    },
    {
      id: 5,
      name: 'Computer Science Hub',
      role: 'Group',
      lastMessage: 'New coding challenge posted! Check it out.',
      time: 'Yesterday',
      unread: 3,
      online: false,
      avatar: 'CS',
    },
  ];

  const messages = [
    {
      id: 1,
      sender: 'Dr. Sarah Wilson',
      content:
        'Hi! I saw your question about neural network architectures. Great topic to explore!',
      time: '2:15 PM',
      isOwn: false,
    },
    {
      id: 2,
      sender: 'You',
      content:
        "Thank you! I'm particularly interested in CNNs for image recognition. Do you have any recommended papers?",
      time: '2:20 PM',
      isOwn: true,
    },
    {
      id: 3,
      sender: 'Dr. Sarah Wilson',
      content:
        "Absolutely! I'll send you some foundational papers and recent advances. Also, there's a great course on Coursera that covers this extensively.",
      time: '2:25 PM',
      isOwn: false,
    },
    {
      id: 4,
      sender: 'Dr. Sarah Wilson',
      content:
        'Here are the resources I mentioned: \n1. "Deep Learning" by Goodfellow et al.\n2. "ImageNet Classification with Deep CNNs" - AlexNet paper\n3. Recent papers on Vision Transformers',
      time: '2:30 PM',
      isOwn: false,
    },
  ];

  const selectedConversation = conversations.find(
    (conv) => conv.id === selectedChat
  );

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (messageInput.trim()) {
      // Handle message sending logic here
      setMessageInput('');
    }
  };

  const startAudioCall = () => {
    setIsAudioCallOpen(true);
    setIsCallActive(true);
    setCallDuration(0);
    toast({
      title: 'Audio Call Started',
      description: `Calling ${selectedConversation?.name}...`,
    });

    // Simulate call duration timer
    const timer = setInterval(() => {
      setCallDuration((prev) => prev + 1);
    }, 1000);

    // Store timer reference to clear later
    (window as any).callTimer = timer;
  };

  const startVideoCall = () => {
    setIsVideoCallOpen(true);
    setIsCallActive(true);
    setCallDuration(0);
    toast({
      title: 'Video Call Started',
      description: `Video calling ${selectedConversation?.name}...`,
    });

    // Simulate call duration timer
    const timer = setInterval(() => {
      setCallDuration((prev) => prev + 1);
    }, 1000);

    // Store timer reference to clear later
    (window as any).callTimer = timer;
  };

  const endCall = () => {
    setIsAudioCallOpen(false);
    setIsVideoCallOpen(false);
    setIsCallActive(false);
    setCallDuration(0);

    // Clear timer
    if ((window as any).callTimer) {
      clearInterval((window as any).callTimer);
    }

    toast({
      title: 'Call Ended',
      description: `Call with ${selectedConversation?.name} has ended.`,
    });
  };

  const formatCallDuration = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs
      .toString()
      .padStart(2, '0')}`;
  };

  const handleDropdownAction = (action: string) => {
    switch (action) {
      case 'add-people':
        toast({
          title: 'Add People',
          description: 'Adding people to conversation...',
        });
        break;
      case 'archive':
        toast({
          title: 'Conversation Archived',
          description: `${selectedConversation?.name} has been archived.`,
        });
        break;
      case 'delete':
        toast({
          title: 'Conversation Deleted',
          description: `Conversation with ${selectedConversation?.name} has been deleted.`,
        });
        break;
      case 'report':
        toast({
          title: 'Report Sent',
          description:
            "Thank you for reporting. We'll review this conversation.",
        });
        break;
      case 'settings':
        toast({
          title: 'Chat Settings',
          description: 'Opening chat settings...',
        });
        break;
    }
  };

  return (
    <div className='p-6 space-y-6'>
      <Breadcrumb
        items={[
          { label: 'Dashboard', href: '/dashboard' },
          { label: 'Messages' },
        ]}
      />

      <div className='flex justify-between items-center'>
        <div>
          <h1 className='text-2xl font-bold text-gray-900'>Messages</h1>
          <p className='text-gray-600'>Chat with mentors and peers</p>
        </div>
        <Button
          className='bg-blue-600 hover:bg-blue-700'
          onClick={() => setIsNewChatOpen(true)}
        >
          <Plus className='h-4 w-4 mr-2' />
          New Chat
        </Button>
      </div>

      <div className='grid grid-cols-1 lg:grid-cols-3 gap-6 h-[600px]'>
        {/* Conversations List */}
        <Card className='lg:col-span-1'>
          <CardHeader className='pb-3'>
            <CardTitle className='text-lg'>Conversations</CardTitle>
            <div className='relative'>
              <Search className='absolute left-3 top-3 h-4 w-4 text-gray-400' />
              <Input placeholder='Search conversations...' className='pl-10' />
            </div>
          </CardHeader>
          <CardContent className='p-0'>
            <ScrollArea className='h-[480px]'>
              <div className='space-y-1'>
                {conversations.map((conv) => (
                  <div
                    key={conv.id}
                    className={`p-4 cursor-pointer hover:bg-gray-50 border-l-4 transition-colors ${
                      selectedChat === conv.id
                        ? 'bg-blue-50 border-l-blue-500'
                        : 'border-l-transparent'
                    }`}
                    onClick={() => setSelectedChat(conv.id)}
                  >
                    <div className='flex items-start space-x-3'>
                      <div className='relative'>
                        <Avatar className='h-10 w-10'>
                          <AvatarFallback className='bg-gray-100 text-gray-600'>
                            {conv.avatar}
                          </AvatarFallback>
                        </Avatar>
                        {conv.online && (
                          <div className='absolute -bottom-1 -right-1 h-3 w-3 bg-green-500 border-2 border-white rounded-full'></div>
                        )}
                      </div>
                      <div className='flex-1 min-w-0'>
                        <div className='flex items-center justify-between mb-1'>
                          <p className='font-medium text-gray-900 truncate'>
                            {conv.name}
                          </p>
                          <span className='text-xs text-gray-500'>
                            {conv.time}
                          </span>
                        </div>
                        <p className='text-sm text-gray-600 truncate mb-1'>
                          {conv.lastMessage}
                        </p>
                        <div className='flex items-center justify-between'>
                          <Badge variant='outline' className='text-xs'>
                            {conv.role}
                          </Badge>
                          {conv.unread > 0 && (
                            <Badge className='bg-blue-600 text-white text-xs'>
                              {conv.unread}
                            </Badge>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </ScrollArea>
          </CardContent>
        </Card>

        {/* Chat Area */}
        <Card className='lg:col-span-2'>
          {selectedConversation ? (
            <>
              <CardHeader className='pb-3 border-b'>
                <div className='flex items-center justify-between'>
                  <div className='flex items-center space-x-3'>
                    <div className='relative'>
                      <Avatar className='h-10 w-10'>
                        <AvatarFallback className='bg-gray-100 text-gray-600'>
                          {selectedConversation.avatar}
                        </AvatarFallback>
                      </Avatar>
                      {selectedConversation.online && (
                        <div className='absolute -bottom-1 -right-1 h-3 w-3 bg-green-500 border-2 border-white rounded-full'></div>
                      )}
                    </div>
                    <div>
                      <h3 className='font-semibold text-gray-900'>
                        {selectedConversation.name}
                      </h3>
                      <p className='text-sm text-gray-600'>
                        {selectedConversation.online
                          ? 'Online'
                          : 'Last seen recently'}
                      </p>
                    </div>
                  </div>
                  <div className='flex items-center gap-2'>
                    <Button
                      variant='ghost'
                      size='icon'
                      onClick={startAudioCall}
                      disabled={selectedConversation.role === 'Group'}
                    >
                      <Phone className='h-4 w-4' />
                    </Button>
                    <Button
                      variant='ghost'
                      size='icon'
                      onClick={startVideoCall}
                      disabled={selectedConversation.role === 'Group'}
                    >
                      <Video className='h-4 w-4' />
                    </Button>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant='ghost' size='icon'>
                          <MoreVertical className='h-4 w-4' />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align='end' className='w-48'>
                        {selectedConversation.role === 'Group' && (
                          <>
                            <DropdownMenuItem
                              onClick={() => handleDropdownAction('add-people')}
                            >
                              <UserPlus className='h-4 w-4 mr-2' />
                              Add People
                            </DropdownMenuItem>
                            <DropdownMenuSeparator />
                          </>
                        )}
                        <DropdownMenuItem
                          onClick={() => handleDropdownAction('settings')}
                        >
                          <Settings className='h-4 w-4 mr-2' />
                          Chat Settings
                        </DropdownMenuItem>
                        <DropdownMenuItem
                          onClick={() => handleDropdownAction('archive')}
                        >
                          <Archive className='h-4 w-4 mr-2' />
                          Archive Chat
                        </DropdownMenuItem>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem
                          onClick={() => handleDropdownAction('report')}
                          className='text-orange-600'
                        >
                          <Flag className='h-4 w-4 mr-2' />
                          Report
                        </DropdownMenuItem>
                        <DropdownMenuItem
                          onClick={() => handleDropdownAction('delete')}
                          className='text-red-600'
                        >
                          <Trash2 className='h-4 w-4 mr-2' />
                          Delete Chat
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </div>
                </div>
              </CardHeader>

              <CardContent className='p-0 flex flex-col h-[500px]'>
                <ScrollArea className='flex-1 p-4'>
                  <div className='space-y-4'>
                    {messages.map((message) => (
                      <div
                        key={message.id}
                        className={`flex ${
                          message.isOwn ? 'justify-end' : 'justify-start'
                        }`}
                      >
                        <div
                          className={`max-w-xs lg:max-w-md px-4 py-2 rounded-lg ${
                            message.isOwn
                              ? 'bg-blue-600 text-white'
                              : 'bg-gray-100 text-gray-900'
                          }`}
                        >
                          <div className='whitespace-pre-wrap'>
                            {message.content}
                          </div>
                          <div
                            className={`text-xs mt-1 ${
                              message.isOwn ? 'text-blue-100' : 'text-gray-500'
                            }`}
                          >
                            {message.time}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </ScrollArea>

                <div className='p-4 border-t'>
                  <form
                    onSubmit={handleSendMessage}
                    className='flex items-center space-x-2'
                  >
                    <Button type='button' variant='ghost' size='icon'>
                      <Smile className='h-4 w-4' />
                    </Button>
                    <Input
                      value={messageInput}
                      onChange={(e) => setMessageInput(e.target.value)}
                      placeholder='Type a message...'
                      className='flex-1'
                    />
                    <Button
                      type='submit'
                      size='icon'
                      className='bg-blue-600 hover:bg-blue-700'
                    >
                      <Send className='h-4 w-4' />
                    </Button>
                  </form>
                </div>
              </CardContent>
            </>
          ) : (
            <CardContent className='flex items-center justify-center h-full'>
              <div className='text-center text-gray-500'>
                <MessageSquare className='h-12 w-12 mx-auto mb-4 opacity-50' />
                <p>Select a conversation to start chatting</p>
              </div>
            </CardContent>
          )}
        </Card>
      </div>

      {/* Audio Call Modal */}
      <Dialog open={isAudioCallOpen} onOpenChange={setIsAudioCallOpen}>
        <DialogContent className='max-w-md'>
          <DialogHeader>
            <DialogTitle className='text-center'>Audio Call</DialogTitle>
          </DialogHeader>
          <div className='space-y-6'>
            <div className='text-center'>
              <Avatar className='h-24 w-24 mx-auto mb-4'>
                <AvatarFallback className='bg-gray-100 text-gray-600 text-2xl'>
                  {selectedConversation?.avatar}
                </AvatarFallback>
              </Avatar>
              <h3 className='text-xl font-semibold'>
                {selectedConversation?.name}
              </h3>
              <p className='text-gray-600'>
                {isCallActive
                  ? formatCallDuration(callDuration)
                  : 'Connecting...'}
              </p>
            </div>

            <div className='flex justify-center space-x-4'>
              <Button
                variant={isMuted ? 'destructive' : 'outline'}
                size='icon'
                onClick={() => setIsMuted(!isMuted)}
                className='h-12 w-12 rounded-full'
              >
                {isMuted ? (
                  <MicOff className='h-6 w-6' />
                ) : (
                  <Mic className='h-6 w-6' />
                )}
              </Button>

              <Button
                variant={isSpeakerOn ? 'default' : 'outline'}
                size='icon'
                onClick={() => setIsSpeakerOn(!isSpeakerOn)}
                className='h-12 w-12 rounded-full'
              >
                {isSpeakerOn ? (
                  <Volume2 className='h-6 w-6' />
                ) : (
                  <VolumeX className='h-6 w-6' />
                )}
              </Button>

              <Button
                variant='destructive'
                size='icon'
                onClick={endCall}
                className='h-12 w-12 rounded-full'
              >
                <PhoneOff className='h-6 w-6' />
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      {/* Video Call Modal */}
      <Dialog open={isVideoCallOpen} onOpenChange={setIsVideoCallOpen}>
        <DialogContent className='max-w-4xl max-h-[90vh]'>
          <DialogHeader>
            <DialogTitle className='text-center'>Video Call</DialogTitle>
          </DialogHeader>
          <div className='space-y-4'>
            <div className='relative bg-gray-900 rounded-lg aspect-video'>
              {/* Main video area */}
              <div className='absolute inset-0 flex items-center justify-center'>
                <div className='text-center text-white'>
                  <Avatar className='h-24 w-24 mx-auto mb-4'>
                    <AvatarFallback className='bg-gray-600 text-white text-2xl'>
                      {selectedConversation?.avatar}
                    </AvatarFallback>
                  </Avatar>
                  <h3 className='text-xl font-semibold'>
                    {selectedConversation?.name}
                  </h3>
                  <p className='text-gray-300'>
                    {isCallActive
                      ? formatCallDuration(callDuration)
                      : 'Connecting...'}
                  </p>
                </div>
              </div>

              {/* Small self video */}
              <div className='absolute top-4 right-4 w-32 h-24 bg-gray-800 rounded-lg border-2 border-white'>
                <div className='flex items-center justify-center h-full text-white text-xs'>
                  {isVideoEnabled ? 'You' : 'Video Off'}
                </div>
              </div>
            </div>

            <div className='flex justify-center space-x-4'>
              <Button
                variant={isMuted ? 'destructive' : 'outline'}
                size='icon'
                onClick={() => setIsMuted(!isMuted)}
                className='h-12 w-12 rounded-full'
              >
                {isMuted ? (
                  <MicOff className='h-6 w-6' />
                ) : (
                  <Mic className='h-6 w-6' />
                )}
              </Button>

              <Button
                variant={isVideoEnabled ? 'default' : 'destructive'}
                size='icon'
                onClick={() => setIsVideoEnabled(!isVideoEnabled)}
                className='h-12 w-12 rounded-full'
              >
                {isVideoEnabled ? (
                  <Video className='h-6 w-6' />
                ) : (
                  <VideoOff className='h-6 w-6' />
                )}
              </Button>

              <Button
                variant='destructive'
                size='icon'
                onClick={endCall}
                className='h-12 w-12 rounded-full'
              >
                <PhoneOff className='h-6 w-6' />
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      <NewChatModal
        isOpen={isNewChatOpen}
        onClose={() => setIsNewChatOpen(false)}
      />
    </div>
  );
};

export default StudentChat;
