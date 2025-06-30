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
  XCircle,
  TrendingUp,
  DollarSign,
  UserCheck,
  Award,
  Search,
  Video,
  BarChart3,
  Globe,
  Mail,
  Settings,
  Briefcase,
  Target
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
    bio: 'AI researcher with 15 years of experience in machine learning and neural networks',
    verified: true,
    rating: 4.8
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

  const researchAssistants = [
    { id: 1, name: 'David Park', project: 'Neural Network Optimization', hours: 20, status: 'active' },
    { id: 2, name: 'Emma Liu', project: 'Computer Vision Research', hours: 15, status: 'active' },
    { id: 3, name: 'James Kim', project: 'Machine Learning Ethics', hours: 12, status: 'pending' }
  ];

  const courseDrafts = [
    { id: 1, title: 'Introduction to Deep Learning', progress: 75, students: 0, status: 'draft' },
    { id: 2, title: 'Advanced Neural Networks', progress: 45, students: 0, status: 'draft' },
    { id: 3, title: 'AI Ethics and Society', progress: 90, students: 234, status: 'published' }
  ];

  const admissionClients = [
    { id: 1, student: 'Sophie Chen', service: 'PhD Application Package', status: 'in-progress', deadline: '2 days' },
    { id: 2, student: 'Michael Rodriguez', service: 'Statement of Purpose Review', status: 'completed', deadline: 'completed' },
    { id: 3, student: 'Lisa Zhang', service: 'Interview Preparation', status: 'scheduled', deadline: 'tomorrow' }
  ];

  const earningsData = {
    thisMonth: 3450,
    lastMonth: 2890,
    totalEarnings: 28750,
    pendingPayouts: 1250
  };

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

  const handleCreateCourse = () => {
    toast({
      title: "Course Builder Opened",
      description: "Redirecting to the Global Course Builder...",
    });
  };

  const handlePostJob = () => {
    toast({
      title: "Research Position Posted",
      description: "Your research assistant opening has been published to the global portal.",
    });
  };

  const handleAdmissionService = () => {
    toast({
      title: "Advisory Service Created",
      description: "Your admission guidance package is now available for booking.",
    });
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="grid lg:grid-cols-4 gap-8">
        {/* Left Sidebar - Profile & Stats */}
        <div className="lg:col-span-1 space-y-6">
          {/* Enhanced Profile Card */}
          <Card className="bg-gradient-to-br from-green-50 to-emerald-50 border-green-200">
            <CardHeader className="text-center">
              <Avatar className="h-20 w-20 mx-auto mb-4 ring-4 ring-green-200">
                <AvatarFallback className="text-2xl bg-green-100 text-green-600">
                  {user.name.split(' ').map(n => n[0]).join('')}
                </AvatarFallback>
              </Avatar>
              {user.verified && (
                <Badge className="absolute top-2 right-2 bg-green-600">
                  <CheckCircle className="h-3 w-3 mr-1" />
                  Verified
                </Badge>
              )}
              <CardTitle className="flex items-center justify-center gap-2">
                <GraduationCap className="h-5 w-5 text-green-600" />
                {user.name}
              </CardTitle>
              <CardDescription>
                <div className="flex items-center justify-center gap-2 mb-2">
                  <Badge className="bg-green-100 text-green-700">
                    Professor
                  </Badge>
                  <div className="flex items-center">
                    <Star className="h-4 w-4 text-yellow-500 mr-1" />
                    <span className="text-sm font-medium">{user.rating}</span>
                  </div>
                </div>
              </CardDescription>
            </CardHeader>
            <CardContent className="text-center space-y-2">
              <p className="text-sm font-medium text-gray-900">{user.field}</p>
              <p className="text-sm text-gray-600">{user.university}</p>
              <p className="text-sm text-gray-700">{user.bio}</p>
              <div className="flex gap-2 mt-4">
                <Button 
                  variant="outline" 
                  size="sm"
                  className="flex-1"
                  onClick={() => setProfileOpen(true)}
                >
                  <Settings className="h-4 w-4 mr-1" />
                  Edit
                </Button>
                <Button 
                  size="sm" 
                  className="flex-1 bg-green-600 hover:bg-green-700"
                >
                  <Award className="h-4 w-4 mr-1" />
                  Promote
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Enhanced Stats */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg flex items-center gap-2">
                <TrendingUp className="h-5 w-5 text-green-600" />
                Your Impact
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="flex justify-between">
                <span className="text-gray-600">Students Mentored</span>
                <span className="font-semibold text-green-600">127</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Courses Published</span>
                <span className="font-semibold text-green-600">3</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Research Assistants</span>
                <span className="font-semibold text-green-600">8</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Average Rating</span>
                <div className="flex items-center">
                  <Star className="h-4 w-4 text-yellow-500 mr-1" />
                  <span className="font-semibold text-green-600">{user.rating}</span>
                </div>
              </div>
              <div className="flex justify-between pt-2 border-t">
                <span className="text-gray-600">Monthly Earnings</span>
                <span className="font-semibold text-green-600">${earningsData.thisMonth}</span>
              </div>
            </CardContent>
          </Card>

          {/* Enhanced Quick Actions */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Professional Tools</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <Button 
                className="w-full justify-start bg-green-600 hover:bg-green-700" 
                size="sm"
                onClick={handleCreateCourse}
              >
                <BookOpen className="h-4 w-4 mr-2" />
                Global Course Builder
              </Button>
              <Button 
                className="w-full justify-start" 
                variant="outline" 
                size="sm"
                onClick={handlePostJob}
              >
                <Search className="h-4 w-4 mr-2" />
                Research Assistant Portal
              </Button>
              <Button 
                className="w-full justify-start" 
                variant="outline" 
                size="sm"
                onClick={handleAdmissionService}
              >
                <Target className="h-4 w-4 mr-2" />
                Advisory Services
              </Button>
              <Button 
                className="w-full justify-start" 
                variant="outline" 
                size="sm"
                onClick={() => setGroupJoinOpen(true)}
              >
                <Users className="h-4 w-4 mr-2" />
                Join Communities
              </Button>
            </CardContent>
          </Card>
        </div>

        {/* Center Content */}
        <div className="lg:col-span-2 space-y-6">
          {/* Enhanced Welcome Message */}
          <Card className="bg-gradient-to-r from-green-500 to-blue-600 text-white">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Globe className="h-6 w-6" />
                Welcome back, Dr. {user.name.split(' ')[1]}!
              </CardTitle>
              <CardDescription className="text-green-100">
                You have 3 new mentorship requests, 2 course drafts, and 5 advisory bookings.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex gap-3">
                <Button variant="secondary" size="sm" className="bg-white/20 hover:bg-white/30 text-white border-white/30">
                  <BarChart3 className="h-4 w-4 mr-1" />
                  Analytics
                </Button>
                <Button 
                  variant="outline" 
                  size="sm" 
                  className="border-white/30 text-white hover:bg-white/10"
                  onClick={() => setGroupJoinOpen(true)}
                >
                  <Users className="h-4 w-4 mr-1" />
                  Communities
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Mentorship Dashboard */}
          <Card>
            <CardHeader>
              <div className="flex justify-between items-center">
                <CardTitle className="text-lg flex items-center gap-2">
                  <UserCheck className="h-5 w-5 text-green-600" />
                  Mentorship Dashboard
                </CardTitle>
                <div className="flex gap-2">
                  <Badge variant="secondary" className="bg-orange-100 text-orange-700">
                    {mentorshipRequests.filter(r => r.status === 'pending').length} Pending
                  </Badge>
                  <Badge variant="secondary" className="bg-green-100 text-green-700">
                    ${earningsData.thisMonth} This Month
                  </Badge>
                </div>
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
                        Accept ($50/hr)
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

          {/* Global Course Builder */}
          <Card>
            <CardHeader>
              <div className="flex justify-between items-center">
                <CardTitle className="text-lg flex items-center gap-2">
                  <BookOpen className="h-5 w-5 text-blue-600" />
                  Global Course Builder
                </CardTitle>
                <Button 
                  size="sm" 
                  className="bg-blue-600 hover:bg-blue-700"
                  onClick={handleCreateCourse}
                >
                  <Plus className="h-4 w-4 mr-1" />
                  New Course
                </Button>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              {courseDrafts.map((course) => (
                <div key={course.id} className="border rounded-lg p-4">
                  <div className="flex items-center justify-between mb-2">
                    <h4 className="font-medium text-gray-900">{course.title}</h4>
                    <Badge variant={course.status === 'published' ? 'default' : 'secondary'} className={
                      course.status === 'published' ? 'bg-green-100 text-green-700' : 'bg-yellow-100 text-yellow-700'
                    }>
                      {course.status}
                    </Badge>
                  </div>
                  <div className="flex items-center gap-4 mb-3">
                    <div className="flex-1">
                      <div className="flex justify-between text-sm mb-1">
                        <span>Progress</span>
                        <span>{course.progress}%</span>
                      </div>
                      <div className="h-2 bg-gray-200 rounded-full">
                        <div 
                          className="h-2 bg-blue-600 rounded-full transition-all"
                          style={{ width: `${course.progress}%` }}
                        />
                      </div>
                    </div>
                    <div className="text-center">
                      <p className="text-sm text-gray-600">Students</p>
                      <p className="font-semibold text-blue-600">{course.students}</p>
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <Button size="sm" variant="outline" className="flex-1">
                      <FileText className="h-4 w-4 mr-1" />
                      Edit
                    </Button>
                    {course.status === 'draft' && (
                      <Button size="sm" className="flex-1 bg-blue-600 hover:bg-blue-700">
                        <Globe className="h-4 w-4 mr-1" />
                        Publish Globally
                      </Button>
                    )}
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>
        </div>

        {/* Right Sidebar */}
        <div className="lg:col-span-1 space-y-6">
          {/* Research Assistant Portal */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg flex items-center gap-2">
                <Search className="h-5 w-5 text-purple-600" />
                Research Assistants
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {researchAssistants.map((assistant) => (
                <div key={assistant.id} className="border rounded-lg p-3">
                  <div className="flex items-center justify-between mb-2">
                    <div>
                      <p className="font-medium text-sm text-gray-900">{assistant.name}</p>
                      <p className="text-xs text-gray-600">{assistant.project}</p>
                    </div>
                    <Badge variant={assistant.status === 'active' ? 'default' : 'secondary'} className={
                      assistant.status === 'active' ? 'bg-green-100 text-green-700' : 'bg-yellow-100 text-yellow-700'
                    }>
                      {assistant.status}
                    </Badge>
                  </div>
                  <p className="text-sm text-purple-700 font-medium mb-2">{assistant.hours}h/week</p>
                  <Button size="sm" variant="outline" className="w-full">
                    <MessageSquare className="h-3 w-3 mr-1" />
                    Message
                  </Button>
                </div>
              ))}
              <Button size="sm" className="w-full bg-purple-600 hover:bg-purple-700" onClick={handlePostJob}>
                <Plus className="h-4 w-4 mr-1" />
                Post Opening
              </Button>
            </CardContent>
          </Card>

          {/* Admission Advisory Services */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg flex items-center gap-2">
                <Target className="h-5 w-5 text-orange-600" />
                Advisory Services
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {admissionClients.map((client) => (
                <div key={client.id} className="border rounded-lg p-3">
                  <div className="flex items-center justify-between mb-2">
                    <div>
                      <p className="font-medium text-sm text-gray-900">{client.student}</p>
                      <p className="text-xs text-gray-600">{client.service}</p>
                    </div>
                    <Badge variant={client.status === 'completed' ? 'default' : 'secondary'} className={
                      client.status === 'completed' ? 'bg-green-100 text-green-700' : 
                      client.status === 'in-progress' ? 'bg-blue-100 text-blue-700' : 'bg-yellow-100 text-yellow-700'
                    }>
                      {client.status}
                    </Badge>
                  </div>
                  <p className="text-sm text-orange-700 font-medium mb-2">Due: {client.deadline}</p>
                  <div className="flex gap-2">
                    <Button size="sm" variant="outline" className="flex-1">
                      <FileText className="h-3 w-3 mr-1" />
                      View
                    </Button>
                    {client.status === 'scheduled' && (
                      <Button size="sm" className="flex-1 bg-orange-600 hover:bg-orange-700">
                        <Video className="h-3 w-3 mr-1" />
                        Join Call
                      </Button>
                    )}
                  </div>
                </div>
              ))}
              <Button size="sm" className="w-full bg-orange-600 hover:bg-orange-700" onClick={handleAdmissionService}>
                <Plus className="h-4 w-4 mr-1" />
                Create Package
              </Button>
            </CardContent>
          </Card>

          {/* Upcoming Sessions */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg flex items-center gap-2">
                <Calendar className="h-5 w-5 text-green-600" />
                Today's Schedule
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
                      <Video className="h-3 w-3 mr-1" />
                      Join Call
                    </Button>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>

          {/* Earnings Overview */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg flex items-center gap-2">
                <DollarSign className="h-5 w-5 text-green-600" />
                Earnings Overview
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="flex justify-between">
                <span className="text-gray-600">This Month</span>
                <span className="font-semibold text-green-600">${earningsData.thisMonth}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Last Month</span>
                <span className="font-semibold text-gray-700">${earningsData.lastMonth}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Total Earned</span>
                <span className="font-semibold text-green-600">${earningsData.totalEarnings}</span>
              </div>
              <div className="flex justify-between pt-2 border-t">
                <span className="text-gray-600">Pending Payout</span>
                <span className="font-semibold text-orange-600">${earningsData.pendingPayouts}</span>
              </div>
              <Button size="sm" className="w-full bg-green-600 hover:bg-green-700">
                <TrendingUp className="h-4 w-4 mr-1" />
                View Analytics
              </Button>
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
