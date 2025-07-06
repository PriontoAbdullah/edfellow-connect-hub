
import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Breadcrumb } from "../../dashboard/Breadcrumb";
import NewChatModal from "../../modals/NewChatModal";
import { MessageSquare, Search, Plus, Send, Phone, Video, MoreVertical, Smile } from 'lucide-react';

const StudentChat = () => {
  const [isNewChatOpen, setIsNewChatOpen] = useState(false);
  const [selectedChat, setSelectedChat] = useState(1);
  const [messageInput, setMessageInput] = useState('');

  const conversations = [
    {
      id: 1,
      name: 'Dr. Sarah Wilson',
      role: 'Professor',
      lastMessage: 'Thanks for your question about neural networks. Here are some resources...',
      time: '2:30 PM',
      unread: 2,
      online: true,
      avatar: 'SW'
    },
    {
      id: 2,
      name: 'AI Study Group',
      role: 'Group',
      lastMessage: 'Mike: Anyone attending the conference next week?',
      time: '1:45 PM',
      unread: 5,
      online: false,
      avatar: 'AI'
    },
    {
      id: 3,
      name: 'Emma Rodriguez',
      role: 'Student',
      lastMessage: 'Hey! How did your presentation go?',
      time: '12:15 PM',
      unread: 0,
      online: true,
      avatar: 'ER'
    },
    {
      id: 4,
      name: 'Prof. Michael Brown',
      role: 'Professor',
      lastMessage: 'I\'ve reviewed your research proposal. Let\'s schedule a meeting.',
      time: 'Yesterday',
      unread: 1,
      online: false,
      avatar: 'MB'
    },
    {
      id: 5,
      name: 'Computer Science Hub',
      role: 'Group',
      lastMessage: 'New coding challenge posted! Check it out.',
      time: 'Yesterday',
      unread: 3,
      online: false,
      avatar: 'CS'
    }
  ];

  const messages = [
    {
      id: 1,
      sender: 'Dr. Sarah Wilson',
      content: 'Hi! I saw your question about neural network architectures. Great topic to explore!',
      time: '2:15 PM',
      isOwn: false
    },
    {
      id: 2,
      sender: 'You',
      content: 'Thank you! I\'m particularly interested in CNNs for image recognition. Do you have any recommended papers?',
      time: '2:20 PM',
      isOwn: true
    },
    {
      id: 3,
      sender: 'Dr. Sarah Wilson',
      content: 'Absolutely! I\'ll send you some foundational papers and recent advances. Also, there\'s a great course on Coursera that covers this extensively.',
      time: '2:25 PM',
      isOwn: false
    },
    {
      id: 4,
      sender: 'Dr. Sarah Wilson',
      content: 'Here are the resources I mentioned: \n1. "Deep Learning" by Goodfellow et al.\n2. "ImageNet Classification with Deep CNNs" - AlexNet paper\n3. Recent papers on Vision Transformers',
      time: '2:30 PM',
      isOwn: false
    }
  ];

  const selectedConversation = conversations.find(conv => conv.id === selectedChat);

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (messageInput.trim()) {
      // Handle message sending logic here
      setMessageInput('');
    }
  };

  return (
    <div className="p-6 space-y-6">
      <Breadcrumb items={[{ label: "Dashboard", href: "/dashboard" }, { label: "Messages" }]} />
      
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Messages</h1>
          <p className="text-gray-600">Chat with mentors and peers</p>
        </div>
        <Button 
          className="bg-blue-600 hover:bg-blue-700"
          onClick={() => setIsNewChatOpen(true)}
        >
          <Plus className="h-4 w-4 mr-2" />
          New Chat
        </Button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 h-[600px]">
        {/* Conversations List */}
        <Card className="lg:col-span-1">
          <CardHeader className="pb-3">
            <CardTitle className="text-lg">Conversations</CardTitle>
            <div className="relative">
              <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
              <Input placeholder="Search conversations..." className="pl-10" />
            </div>
          </CardHeader>
          <CardContent className="p-0">
            <ScrollArea className="h-[480px]">
              <div className="space-y-1">
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
                    <div className="flex items-start space-x-3">
                      <div className="relative">
                        <Avatar className="h-10 w-10">
                          <AvatarFallback className="bg-gray-100 text-gray-600">
                            {conv.avatar}
                          </AvatarFallback>
                        </Avatar>
                        {conv.online && (
                          <div className="absolute -bottom-1 -right-1 h-3 w-3 bg-green-500 border-2 border-white rounded-full"></div>
                        )}
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center justify-between mb-1">
                          <p className="font-medium text-gray-900 truncate">{conv.name}</p>
                          <span className="text-xs text-gray-500">{conv.time}</span>
                        </div>
                        <p className="text-sm text-gray-600 truncate mb-1">{conv.lastMessage}</p>
                        <div className="flex items-center justify-between">
                          <Badge variant="outline" className="text-xs">
                            {conv.role}
                          </Badge>
                          {conv.unread > 0 && (
                            <Badge className="bg-blue-600 text-white text-xs">
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
        <Card className="lg:col-span-2">
          {selectedConversation ? (
            <>
              <CardHeader className="pb-3 border-b">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <div className="relative">
                      <Avatar className="h-10 w-10">
                        <AvatarFallback className="bg-gray-100 text-gray-600">
                          {selectedConversation.avatar}
                        </AvatarFallback>
                      </Avatar>
                      {selectedConversation.online && (
                        <div className="absolute -bottom-1 -right-1 h-3 w-3 bg-green-500 border-2 border-white rounded-full"></div>
                      )}
                    </div>
                    <div>
                      <h3 className="font-semibold text-gray-900">{selectedConversation.name}</h3>
                      <p className="text-sm text-gray-600">
                        {selectedConversation.online ? 'Online' : 'Last seen recently'}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <Button variant="ghost" size="icon">
                      <Phone className="h-4 w-4" />
                    </Button>
                    <Button variant="ghost" size="icon">
                      <Video className="h-4 w-4" />
                    </Button>
                    <Button variant="ghost" size="icon">
                      <MoreVertical className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </CardHeader>
              
              <CardContent className="p-0 flex flex-col h-[400px]">
                <ScrollArea className="flex-1 p-4">
                  <div className="space-y-4">
                    {messages.map((message) => (
                      <div
                        key={message.id}
                        className={`flex ${message.isOwn ? 'justify-end' : 'justify-start'}`}
                      >
                        <div
                          className={`max-w-xs lg:max-w-md px-4 py-2 rounded-lg ${
                            message.isOwn
                              ? 'bg-blue-600 text-white'
                              : 'bg-gray-100 text-gray-900'
                          }`}
                        >
                          <div className="whitespace-pre-wrap">{message.content}</div>
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
                
                <div className="p-4 border-t">
                  <form onSubmit={handleSendMessage} className="flex items-center space-x-2">
                    <Button type="button" variant="ghost" size="icon">
                      <Smile className="h-4 w-4" />
                    </Button>
                    <Input
                      value={messageInput}
                      onChange={(e) => setMessageInput(e.target.value)}
                      placeholder="Type a message..."
                      className="flex-1"
                    />
                    <Button type="submit" size="icon" className="bg-blue-600 hover:bg-blue-700">
                      <Send className="h-4 w-4" />
                    </Button>
                  </form>
                </div>
              </CardContent>
            </>
          ) : (
            <CardContent className="flex items-center justify-center h-full">
              <div className="text-center text-gray-500">
                <MessageSquare className="h-12 w-12 mx-auto mb-4 opacity-50" />
                <p>Select a conversation to start chatting</p>
              </div>
            </CardContent>
          )}
        </Card>
      </div>

      <NewChatModal 
        isOpen={isNewChatOpen} 
        onClose={() => setIsNewChatOpen(false)} 
      />
    </div>
  );
};

export default StudentChat;
