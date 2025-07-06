
import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { useToast } from "@/hooks/use-toast";
import { Breadcrumb } from "../../dashboard/Breadcrumb";
import { 
  MessageSquare, 
  Search,
  Send,
  Flag,
  Archive,
  Star,
  Reply,
  Forward,
  MoreVertical,
  Filter,
  RefreshCw,
  Clock,
  CheckCheck,
  Mail,
  User
} from 'lucide-react';

const UniversityMessages = () => {
  const { toast } = useToast();
  const [selectedMessage, setSelectedMessage] = useState<number | null>(1);
  const [replyText, setReplyText] = useState('');
  const [searchTerm, setSearchTerm] = useState('');

  const messages = [
    {
      id: 1,
      from: 'Emma Chen',
      email: 'emma.chen@email.com',
      country: 'China',
      subject: 'Computer Science Masters Program Inquiry',
      program: 'Master of Computer Science',
      message: 'Hello, I am interested in your Computer Science Masters program. Could you please provide more information about the curriculum, admission requirements, and scholarship opportunities? I have a bachelor\'s degree in Software Engineering with a GPA of 3.8.',
      timestamp: '2 hours ago',
      status: 'unread',
      priority: 'high',
      avatar: 'EC'
    },
    {
      id: 2,
      from: 'Carlos Rodriguez',
      email: 'carlos.rodriguez@email.com',
      country: 'Mexico',
      subject: 'PhD Program Application Status',
      program: 'Business Analytics PhD',
      message: 'Hi there, I submitted my application for the Business Analytics PhD program last month. Could you please update me on the status of my application? I\'m particularly interested in the research opportunities available.',
      timestamp: '5 hours ago',
      status: 'read',
      priority: 'medium',
      avatar: 'CR'
    },
    {
      id: 3,
      from: 'Priya Sharma',
      email: 'priya.sharma@email.com',
      country: 'India',
      subject: 'Data Science Certificate - Course Duration',
      program: 'Data Science Certificate',
      message: 'Good day! I would like to know more about the Data Science Certificate program. Specifically, I\'m interested in the course duration, whether it can be completed part-time, and the job placement assistance provided.',
      timestamp: '1 day ago',
      status: 'read',
      priority: 'low',
      avatar: 'PS'
    },
    {
      id: 4,
      from: 'Ahmed Hassan',
      email: 'ahmed.hassan@email.com',
      country: 'Egypt',
      subject: 'MBA Program - International Students',
      program: 'International Business MBA',
      message: 'Dear Admissions Team, I am an international student from Egypt interested in your MBA program. Could you provide information about visa support, housing options, and the application process for international students?',
      timestamp: '2 days ago',
      status: 'unread',
      priority: 'high',
      avatar: 'AH'
    },
    {
      id: 5,
      from: 'Sophie Martin',
      email: 'sophie.martin@email.com',
      country: 'France',
      subject: 'Exchange Program Opportunities',
      program: 'Computer Science Masters',
      message: 'Bonjour! I am currently studying at Sorbonne University in Paris and I\'m interested in exchange opportunities with your university. Do you have partnerships with French universities?',
      timestamp: '3 days ago',
      status: 'read',
      priority: 'medium',
      avatar: 'SM'
    }
  ];

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high': return 'bg-red-100 text-red-700';
      case 'medium': return 'bg-yellow-100 text-yellow-700';
      case 'low': return 'bg-green-100 text-green-700';
      default: return 'bg-gray-100 text-gray-700';
    }
  };

  const filteredMessages = messages.filter(message =>
    message.from.toLowerCase().includes(searchTerm.toLowerCase()) ||
    message.subject.toLowerCase().includes(searchTerm.toLowerCase()) ||
    message.program.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleReply = () => {
    if (replyText.trim()) {
      toast({
        title: "Message Sent",
        description: "Your reply has been sent successfully.",
      });
      setReplyText('');
    }
  };

  const handleMarkAsRead = (messageId: number) => {
    toast({
      title: "Message Updated",
      description: "Message marked as read.",
    });
  };

  const selectedMessageData = messages.find(m => m.id === selectedMessage);

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50/30 via-white to-orange-100/20">
      <div className="p-6 space-y-6">
        <Breadcrumb items={[
          { label: "Dashboard", href: "/dashboard" },
          { label: "Messages" }
        ]} />
        
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Messages</h1>
            <p className="text-gray-600 mt-1">Student inquiries and communications</p>
          </div>
          <div className="flex gap-2">
            <Button variant="outline" size="sm">
              <RefreshCw className="h-4 w-4 mr-2" />
              Refresh
            </Button>
            <Button variant="outline" size="sm">
              <Filter className="h-4 w-4 mr-2" />
              Filter
            </Button>
          </div>
        </div>

        <div className="grid lg:grid-cols-3 gap-6 h-[calc(100vh-200px)]">
          {/* Messages List */}
          <Card className="lg:col-span-1">
            <CardHeader className="pb-4">
              <div className="flex items-center justify-between">
                <CardTitle className="text-lg flex items-center gap-2">
                  <Mail className="h-5 w-5 text-orange-600" />
                  Inbox
                </CardTitle>
                <Badge className="bg-orange-100 text-orange-700">
                  {messages.filter(m => m.status === 'unread').length} New
                </Badge>
              </div>
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                <Input
                  placeholder="Search messages..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
            </CardHeader>
            <CardContent className="p-0">
              <div className="space-y-1 max-h-[500px] overflow-y-auto">
                {filteredMessages.map((message) => (
                  <div
                    key={message.id}
                    onClick={() => setSelectedMessage(message.id)}
                    className={`p-4 border-b cursor-pointer hover:bg-gray-50 transition-colors ${
                      selectedMessage === message.id ? 'bg-blue-50 border-l-4 border-l-blue-500' : ''
                    } ${message.status === 'unread' ? 'bg-orange-50' : ''}`}
                  >
                    <div className="flex items-start justify-between mb-2">
                      <div className="flex items-center space-x-3">
                        <Avatar className="h-10 w-10">
                          <AvatarFallback className="bg-blue-100 text-blue-600">
                            {message.avatar}
                          </AvatarFallback>
                        </Avatar>
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center gap-2">
                            <p className={`font-medium text-sm ${message.status === 'unread' ? 'font-bold' : ''}`}>
                              {message.from}
                            </p>
                            <Badge variant="outline" className="text-xs">
                              {message.country}
                            </Badge>
                          </div>
                          <p className="text-xs text-gray-600">{message.email}</p>
                        </div>
                      </div>
                      <div className="flex flex-col items-end gap-1">
                        <span className="text-xs text-gray-500">{message.timestamp}</span>
                        <Badge className={getPriorityColor(message.priority)}>
                          {message.priority}
                        </Badge>
                      </div>
                    </div>
                    <p className={`font-medium text-sm mb-1 ${message.status === 'unread' ? 'font-bold' : ''}`}>
                      {message.subject}
                    </p>
                    <p className="text-xs text-blue-600 mb-2">{message.program}</p>
                    <p className="text-sm text-gray-600 line-clamp-2">
                      {message.message}
                    </p>
                    {message.status === 'unread' && (
                      <div className="flex items-center gap-1 mt-2">
                        <div className="h-2 w-2 bg-orange-500 rounded-full"></div>
                        <span className="text-xs text-orange-600 font-medium">New</span>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Message Detail */}
          <Card className="lg:col-span-2">
            {selectedMessageData ? (
              <>
                <CardHeader className="border-b">
                  <div className="flex items-start justify-between">
                    <div className="flex items-center space-x-4">
                      <Avatar className="h-12 w-12">
                        <AvatarFallback className="bg-blue-100 text-blue-600 text-lg">
                          {selectedMessageData.avatar}
                        </AvatarFallback>
                      </Avatar>
                      <div>
                        <CardTitle className="text-lg">{selectedMessageData.from}</CardTitle>
                        <CardDescription className="flex items-center gap-2">
                          {selectedMessageData.email} • {selectedMessageData.country}
                          <Badge className={getPriorityColor(selectedMessageData.priority)}>
                            {selectedMessageData.priority}
                          </Badge>
                        </CardDescription>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <Button size="sm" variant="outline">
                        <Star className="h-4 w-4" />
                      </Button>
                      <Button size="sm" variant="outline">
                        <Flag className="h-4 w-4" />
                      </Button>
                      <Button size="sm" variant="outline">
                        <Archive className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                  <div className="mt-4">
                    <h3 className="font-semibold text-gray-900">{selectedMessageData.subject}</h3>
                    <div className="flex items-center gap-4 text-sm text-gray-600 mt-1">
                      <span className="flex items-center gap-1">
                        <Clock className="h-4 w-4" />
                        {selectedMessageData.timestamp}
                      </span>
                      <Badge variant="outline" className="text-blue-600">
                        {selectedMessageData.program}
                      </Badge>
                    </div>
                  </div>
                </CardHeader>
                
                <CardContent className="p-6">
                  <div className="space-y-6">
                    <div className="bg-gray-50 p-4 rounded-lg">
                      <p className="text-gray-900 leading-relaxed">
                        {selectedMessageData.message}
                      </p>
                    </div>
                    
                    <div className="border-t pt-6">
                      <h4 className="font-medium text-gray-900 mb-3 flex items-center gap-2">
                        <Reply className="h-4 w-4" />
                        Reply to {selectedMessageData.from}
                      </h4>
                      <div className="space-y-4">
                        <textarea
                          value={replyText}
                          onChange={(e) => setReplyText(e.target.value)}
                          placeholder="Type your reply..."
                          className="w-full p-3 border rounded-lg resize-none"
                          rows={4}
                        />
                        <div className="flex justify-between items-center">
                          <div className="flex gap-2">
                            <Button variant="outline" size="sm">
                              <Forward className="h-4 w-4 mr-1" />
                              Forward
                            </Button>
                            <Button variant="outline" size="sm">
                              Template
                            </Button>
                          </div>
                          <div className="flex gap-2">
                            <Button variant="outline" onClick={() => setReplyText('')}>
                              Cancel
                            </Button>
                            <Button onClick={handleReply} className="bg-orange-600 hover:bg-orange-700">
                              <Send className="h-4 w-4 mr-2" />
                              Send Reply
                            </Button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </>
            ) : (
              <CardContent className="p-12 text-center">
                <MessageSquare className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                <h3 className="text-lg font-medium text-gray-900 mb-2">Select a Message</h3>
                <p className="text-gray-600">Choose a message from the list to view its contents</p>
              </CardContent>
            )}
          </Card>
        </div>
      </div>
    </div>
  );
};

export default UniversityMessages;
