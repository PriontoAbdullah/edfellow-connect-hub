
import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { useToast } from "@/hooks/use-toast";
import { 
  GraduationCap, 
  MessageSquare, 
  Users, 
  BookOpen, 
  Star,
  Plus,
  Calendar,
  FileText,
  Clock,
  CheckCircle,
  XCircle
} from 'lucide-react';
import ChatModal from '../modals/ChatModal';
import NotificationsModal from '../modals/NotificationsModal';
import ProfileModal from '../modals/ProfileModal';
import GroupJoinModal from '../modals/GroupJoinModal';

const ProfessorDashboard = () => {
  const { toast } = useToast();
  const [chatModal, setChatModal] = useState({ isOpen: false, recipientName: '', recipientRole: '' });
  const [notificationsOpen, setNotificationsOpen] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);
  const [groupJoinOpen, setGroupJoinOpen] = useState(false);

  const [user] = useState({
    name: 'Dr. Sarah Wilson',
    role: 'professor',
    field: 'Computer Science',
    university: 'MIT',
    bio: 'AI researcher with 15 years of experience in machine learning and neural networks'
  });

  const mentorshipRequests = [
    { id: 1, student: 'John Doe', major: 'Computer Science', message: 'Seeking guidance on AI research opportunities...', time: '2h ago', status: 'pending' },
    { id: 2, student: 'Maria Chen', major: 'Data Science', message: 'Need help with thesis topic selection...', time: '1d ago', status: 'pending' },
    { id: 3, student: 'Alex Rodriguez', major: 'Computer Science', message: 'Questions about PhD program applications...', time: '2d ago', status: 'accepted' }
  ];

  const activeGroups = [
    { id: 1, name: 'Computer Science', members: 3200, posts: 15, icon: '💻' },
    { id: 2, name: 'AI & Machine Learning', members: 1850, posts: 8, icon: '🤖' },
    { id: 3, name: 'Research Methods', members: 950, posts: 5, icon: '📊' }
  ];

  const recentMessages = [
    { id: 1, sender: 'John Doe', message: 'Thank you for the feedback on my research proposal...', time: '1h ago', type: 'student' },
    { id: 2, sender: 'Dr. Emily Johnson', message: 'Would you like to collaborate on the ML conference paper?', time: '3h ago', type: 'professor' },
    { id: 3, sender: 'CS Study Group', message: 'New discussion about neural network architectures...', time: '6h ago', type: 'group' }
  ];

  const upcomingMentoringSessions = [
    { id: 1, student: 'Alice Wang', topic: 'PhD Application Review', time: 'Today 2:00 PM', duration: '1 hour' },
    { id: 2, student: 'Bob Smith', topic: 'Research Methodology', time: 'Tomorrow 10:00 AM', duration: '45 min' },
    { id: 3, student: 'Carol Johnson', topic: 'Career Guidance', time: 'Dec 30 3:00 PM', duration: '1 hour' }
  ];

  const handleStartChat = (name: string, role: string) => {
    setChatModal({ isOpen: true, recipientName: name, recipientRole: role });
  };

  const handleAcceptMentorship = (requestId: number, studentName: string) => {
    toast({
      title: "Mentorship Request Accepted",
      description: `You've accepted ${studentName}'s mentorship request. They will be notified.`,
    });
  };

  const handleDeclineMentorship = (requestId: number, studentName: string) => {
    toast({
      title: "Mentorship Request Declined",
      description: `You've declined ${studentName}'s mentorship request.`,
    });
  };

  const handleJoinGroup = (groupName: string) => {
    toast({
      title: "Joined Group",
      description: `You've successfully joined ${groupName}!`,
    });
  };

  const handleCreatePost = () => {
    toast({
      title: "Post Created",
      description: "Your forum post has been published successfully.",
    });
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="grid lg:grid-cols-4 gap-8">
        {/* Left Sidebar - Profile & Stats */}
        <div className="lg:col-span-1 space-y-6">
          {/* Profile Card */}
          <Card className="bg-gradient-to-br from-green-50 to-emerald-50 border-green-200">
            <CardHeader className="text-center">
              <Avatar className="h-20 w-20 mx-auto mb-4">
                <AvatarFallback className="text-2xl bg-green-100 text-green-600">
                  {user.name.split(' ').map(n => n[0]).join('')}
                </AvatarFallback>
              </Avatar>
              <CardTitle className="flex items-center justify-center gap-2">
                <GraduationCap className="h-5 w-5 text-green-600" />
                {user.name}
              </CardTitle>
              <CardDescription>
                <Badge className="bg-green-100 text-green-700">
                  Professor
                </Badge>
              </CardDescription>
            </CardHeader>
            <CardContent className="text-center space-y-2">
              <p className="text-sm font-medium text-gray-900">{user.field}</p>
              <p className="text-sm text-gray-600">{user.university}</p>
              <p className="text-sm text-gray-700">{user.bio}</p>
              <Button 
                variant="outline" 
                className="w-full mt-4"
                onClick={() => setProfileOpen(true)}
              >
                Edit Profile
              </Button>
            </CardContent>
          </Card>

          {/* Professor Stats */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Your Impact</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="flex justify-between">
                <span className="text-gray-600">Students Mentored</span>
                <span className="font-semibold text-green-600">127</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Groups Joined</span>
                <span className="font-semibold text-green-600">3</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Forum Posts</span>
                <span className="font-semibold text-green-600">89</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Average Rating</span>
                <div className="flex items-center">
                  <Star className="h-4 w-4 text-yellow-500 mr-1" />
                  <span className="font-semibold text-green-600">4.8</span>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Quick Actions */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Quick Actions</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <Button 
                className="w-full justify-start bg-green-600 hover:bg-green-700" 
                size="sm"
                onClick={handleCreatePost}
              >
                <Plus className="h-4 w-4 mr-2" />
                Create Forum Post
              </Button>
              <Button 
                className="w-full justify-start" 
                variant="outline" 
                size="sm"
                onClick={() => setNotificationsOpen(true)}
              >
                <MessageSquare className="h-4 w-4 mr-2" />
                Message Students
              </Button>
              <Button 
                className="w-full justify-start" 
                variant="outline" 
                size="sm"
                onClick={() => setGroupJoinOpen(true)}
              >
                <Users className="h-4 w-4 mr-2" />
                Join New Groups
              </Button>
              <Button className="w-full justify-start" variant="outline" size="sm">
                <BookOpen className="h-4 w-4 mr-2" />
                Update Expertise
              </Button>
            </CardContent>
          </Card>
        </div>

        {/* Center Content */}
        <div className="lg:col-span-2 space-y-6">
          {/* Welcome Message */}
          <Card className="bg-gradient-to-r from-green-500 to-blue-600 text-white">
            <CardHeader>
              <CardTitle>Welcome back, Dr. {user.name.split(' ')[1]}!</CardTitle>
              <CardDescription className="text-green-100">
                You have 3 new mentorship requests and 5 group discussions waiting.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex gap-3">
                <Button variant="secondary" size="sm" className="bg-white/20 hover:bg-white/30 text-white border-white/30">
                  View Requests
                </Button>
                <Button 
                  variant="outline" 
                  size="sm" 
                  className="border-white/30 text-white hover:bg-white/10"
                  onClick={() => setGroupJoinOpen(true)}
                >
                  Visit Groups
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Mentorship Requests */}
          <Card>
            <CardHeader>
              <div className="flex justify-between items-center">
                <CardTitle className="text-lg">Mentorship Requests</CardTitle>
                <Badge variant="secondary" className="bg-orange-100 text-orange-700">
                  {mentorshipRequests.filter(r => r.status === 'pending').length} Pending
                </Badge>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              {mentorshipRequests.map((request) => (
                <div key={request.id} className="border rounded-lg p-4 hover:shadow-md transition-shadow">
                  <div className="flex items-start justify-between mb-2">
                    <div className="flex items-center space-x-3">
                      <Avatar className="h-10 w-10">
                        <AvatarFallback className="bg-blue-100 text-blue-600">
                          {request.student.split(' ').map(n => n[0]).join('')}
                        </AvatarFallback>
                      </Avatar>
                      <div>
                        <p className="font-medium text-gray-900">{request.student}</p>
                        <p className="text-sm text-gray-600">{request.major}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <Badge variant={request.status === 'pending' ? 'secondary' : 'default'} className={
                        request.status === 'pending' ? 'bg-yellow-100 text-yellow-700' : 'bg-green-100 text-green-700'
                      }>
                        {request.status}
                      </Badge>
                      <span className="text-xs text-gray-500">{request.time}</span>
                    </div>
                  </div>
                  <p className="text-sm text-gray-700 mb-3">{request.message}</p>
                  {request.status === 'pending' && (
                    <div className="flex gap-2">
                      <Button 
                        size="sm" 
                        className="bg-green-600 hover:bg-green-700"
                        onClick={() => handleAcceptMentorship(request.id, request.student)}
                      >
                        <CheckCircle className="h-4 w-4 mr-1" />
                        Accept
                      </Button>
                      <Button 
                        size="sm" 
                        variant="outline"
                        onClick={() => handleDeclineMentorship(request.id, request.student)}
                      >
                        <XCircle className="h-4 w-4 mr-1" />
                        Decline
                      </Button>
                      <Button 
                        size="sm" 
                        variant="ghost"
                        onClick={() => handleStartChat(request.student, 'student')}
                      >
                        <MessageSquare className="h-4 w-4 mr-1" />
                        Message
                      </Button>
                    </div>
                  )}
                </div>
              ))}
            </CardContent>
          </Card>

          {/* Academic Groups */}
          <Card>
            <CardHeader>
              <div className="flex justify-between items-center">
                <CardTitle className="text-lg">Your Academic Groups</CardTitle>
                <Button 
                  variant="ghost" 
                  size="sm"
                  onClick={() => setGroupJoinOpen(true)}
                >
                  <Plus className="h-4 w-4 mr-1" />
                  Join More
                </Button>
              </div>
            </CardHeader>
            <CardContent className="space-y-3">
              {activeGroups.map((group) => (
                <div key={group.id} className="flex items-center justify-between p-3 hover:bg-gray-50 rounded-lg cursor-pointer">
                  <div className="flex items-center space-x-3">
                    <div className="text-2xl">{group.icon}</div>
                    <div>
                      <p className="font-medium text-gray-900">{group.name}</p>
                      <p className="text-sm text-gray-600">{group.members.toLocaleString()} members</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <Badge variant="outline" className="text-xs">
                      {group.posts} posts this week
                    </Badge>
                    <Button variant="outline" size="sm">
                      Moderate
                    </Button>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>

          {/* Recent Messages */}
          <Card>
            <CardHeader>
              <div className="flex justify-between items-center">
                <CardTitle className="text-lg">Recent Messages</CardTitle>
                <Button 
                  variant="ghost" 
                  size="sm"
                  onClick={() => setNotificationsOpen(true)}
                >
                  View All
                </Button>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              {recentMessages.map((message) => (
                <div 
                  key={message.id} 
                  className="flex items-start space-x-3 p-3 hover:bg-gray-50 rounded-lg cursor-pointer"
                  onClick={() => handleStartChat(message.sender, message.type)}
                >
                  <Avatar className="h-10 w-10">
                    <AvatarFallback className="bg-blue-100 text-blue-600">
                      {message.sender.split(' ').map(n => n[0]).join('')}
                    </AvatarFallback>
                  </Avatar>
                  <div className="flex-1 min-w-0">
                    <div className="flex justify-between">
                      <p className="font-medium text-gray-900">{message.sender}</p>
                      <span className="text-xs text-gray-500">{message.time}</span>
                    </div>
                    <p className="text-sm text-gray-600 truncate">{message.message}</p>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>
        </div>

        {/* Right Sidebar */}
        <div className="lg:col-span-1 space-y-6">
          {/* Upcoming Sessions */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg flex items-center gap-2">
                <Calendar className="h-5 w-5 text-green-600" />
                Upcoming Sessions
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {upcomingMentoringSessions.map((session) => (
                <div key={session.id} className="border rounded-lg p-3 bg-green-50">
                  <div className="flex items-start justify-between mb-2">
                    <div>
                      <p className="font-medium text-sm text-gray-900">{session.student}</p>
                      <p className="text-xs text-gray-600">{session.topic}</p>
                    </div>
                    <Badge variant="outline" className="text-xs">
                      {session.duration}
                    </Badge>
                  </div>
                  <p className="text-sm text-green-700 font-medium mb-2">{session.time}</p>
                  <div className="flex gap-2">
                    <Button size="sm" variant="outline" className="flex-1">
                      <Clock className="h-3 w-3 mr-1" />
                      Reschedule
                    </Button>
                    <Button size="sm" className="flex-1 bg-green-600 hover:bg-green-700">
                      Join Call
                    </Button>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>

          {/* Course Creator Preview */}
          <Card className="border-dashed border-2 border-gray-300">
            <CardHeader>
              <CardTitle className="text-lg text-gray-600">Course Creator</CardTitle>
              <CardDescription>Coming Soon in Phase 2</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="text-center py-4">
                <BookOpen className="h-12 w-12 mx-auto text-gray-400 mb-2" />
                <p className="text-sm text-gray-600">
                  Create and publish courses for students
                </p>
                <Button variant="outline" disabled className="mt-3">
                  Get Early Access
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Research Papers & Publications */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg flex items-center gap-2">
                <FileText className="h-5 w-5 text-blue-600" />
                Publications
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <div className="text-center py-4 text-gray-600">
                  <FileText className="h-8 w-8 mx-auto mb-2 text-gray-400" />
                  <p className="text-sm">No publications added yet</p>
                  <Button variant="outline" size="sm" className="mt-2">
                    <Plus className="h-4 w-4 mr-1" />
                    Add Publication
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Modals */}
      <ChatModal
        isOpen={chatModal.isOpen}
        onClose={() => setChatModal({ isOpen: false, recipientName: '', recipientRole: '' })}
        recipientName={chatModal.recipientName}
        recipientRole={chatModal.recipientRole}
      />

      <NotificationsModal
        isOpen={notificationsOpen}
        onClose={() => setNotificationsOpen(false)}
      />

      <ProfileModal
        isOpen={profileOpen}
        onClose={() => setProfileOpen(false)}
        userRole="professor"
      />

      <GroupJoinModal
        isOpen={groupJoinOpen}
        onClose={() => setGroupJoinOpen(false)}
      />
    </div>
  );
};

export default ProfessorDashboard;
