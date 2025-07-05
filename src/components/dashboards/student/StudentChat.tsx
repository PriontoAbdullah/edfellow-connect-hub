
import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Breadcrumb } from "../../dashboard/Breadcrumb";
import { MessageSquare, Search, Plus, Clock, Phone, Video } from 'lucide-react';

const StudentChat = () => {
  const [selectedChat, setSelectedChat] = useState(null);

  const conversations = [
    {
      id: 1,
      name: 'Dr. Sarah Johnson',
      role: 'Professor',
      lastMessage: 'Great progress on your research proposal!',
      time: '2h ago',
      unread: 2,
      online: true,
      type: 'mentor'
    },
    {
      id: 2,
      name: 'CS Study Group',
      role: 'Group Chat',
      lastMessage: 'Alice: Who wants to review algorithms together?',
      time: '5h ago',
      unread: 0,
      online: false,
      type: 'group',
      members: 12
    },
    {
      id: 3,
      name: 'Maria Chen',
      role: 'Student',
      lastMessage: 'Thanks for sharing those study notes!',
      time: '1d ago',
      unread: 1,
      online: true,
      type: 'peer'
    },
    {
      id: 4,
      name: 'AI Research Lab',
      role: 'Group Chat',
      lastMessage: 'New paper discussion tomorrow at 3 PM',
      time: '2d ago',
      unread: 0,
      online: false,
      type: 'group',
      members: 8
    }
  ];

  return (
    <div className="p-6 space-y-6">
      <Breadcrumb items={[{ label: "Dashboard", href: "/dashboard" }, { label: "Chat" }]} />
      
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Messages</h1>
          <p className="text-gray-600">Chat with mentors, peers, and study groups</p>
        </div>
        <Button className="bg-blue-600 hover:bg-blue-700">
          <Plus className="h-4 w-4 mr-2" />
          New Chat
        </Button>
      </div>

      <div className="grid lg:grid-cols-3 gap-6 h-[600px]">
        {/* Chat List */}
        <Card className="lg:col-span-1">
          <CardHeader>
            <CardTitle className="text-lg flex items-center gap-2">
              <MessageSquare className="h-5 w-5" />
              Conversations
            </CardTitle>
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
              <Input placeholder="Search conversations..." className="pl-10" />
            </div>
          </CardHeader>
          <CardContent className="p-0">
            <div className="space-y-1">
              {conversations.map((conversation) => (
                <div
                  key={conversation.id}
                  className={`p-4 hover:bg-gray-50 cursor-pointer border-l-4 ${
                    selectedChat === conversation.id ? 'border-blue-500 bg-blue-50' : 'border-transparent'
                  }`}
                  onClick={() => setSelectedChat(conversation.id)}
                >
                  <div className="flex items-start space-x-3">
                    <div className="relative">
                      <Avatar className="h-10 w-10">
                        <AvatarFallback className="bg-blue-100 text-blue-600">
                          {conversation.name.split(' ').map(n => n[0]).join('')}
                        </AvatarFallback>
                      </Avatar>
                      {conversation.online && (
                        <div className="absolute -bottom-1 -right-1 w-3 h-3 bg-green-500 rounded-full border-2 border-white"></div>
                      )}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between">
                        <p className="text-sm font-medium text-gray-900 truncate">
                          {conversation.name}
                        </p>
                        <div className="flex items-center gap-2">
                          {conversation.unread > 0 && (
                            <Badge className="bg-red-100 text-red-700 text-xs">
                              {conversation.unread}
                            </Badge>
                          )}
                          <span className="text-xs text-gray-500">{conversation.time}</span>
                        </div>
                      </div>
                      <div className="flex items-center justify-between">
                        <p className="text-sm text-gray-600 truncate">{conversation.lastMessage}</p>
                      </div>
                      <div className="flex items-center justify-between mt-1">
                        <Badge variant="outline" className="text-xs">
                          {conversation.type === 'mentor' ? 'Mentor' : 
                           conversation.type === 'group' ? `Group (${conversation.members})` : 'Peer'}
                        </Badge>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Chat Window */}
        <Card className="lg:col-span-2">
          {selectedChat ? (
            <div className="h-full flex flex-col">
              <CardHeader className="border-b">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <Avatar className="h-10 w-10">
                      <AvatarFallback className="bg-blue-100 text-blue-600">
                        {conversations.find(c => c.id === selectedChat)?.name.split(' ').map(n => n[0]).join('')}
                      </AvatarFallback>
                    </Avatar>
                    <div>
                      <h3 className="font-medium text-gray-900">
                        {conversations.find(c => c.id === selectedChat)?.name}
                      </h3>
                      <p className="text-sm text-gray-600">
                        {conversations.find(c => c.id === selectedChat)?.role}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <Button size="sm" variant="outline">
                      <Phone className="h-4 w-4" />
                    </Button>
                    <Button size="sm" variant="outline">
                      <Video className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="flex-1 p-4">
                <div className="h-full flex items-center justify-center text-gray-500">
                  <div className="text-center">
                    <MessageSquare className="h-12 w-12 mx-auto mb-4 text-gray-300" />
                    <p>Select a conversation to start chatting</p>
                  </div>
                </div>
              </CardContent>
              <div className="p-4 border-t">
                <div className="flex gap-2">
                  <Input placeholder="Type your message..." className="flex-1" />
                  <Button className="bg-blue-600 hover:bg-blue-700">Send</Button>
                </div>
              </div>
            </div>
          ) : (
            <div className="h-full flex items-center justify-center">
              <div className="text-center text-gray-500">
                <MessageSquare className="h-16 w-16 mx-auto mb-4 text-gray-300" />
                <h3 className="text-lg font-medium mb-2">Welcome to Messages</h3>
                <p>Select a conversation from the list to start chatting</p>
              </div>
            </div>
          )}
        </Card>
      </div>
    </div>
  );
};

export default StudentChat;
