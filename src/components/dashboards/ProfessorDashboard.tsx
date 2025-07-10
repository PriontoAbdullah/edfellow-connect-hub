
import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { useToast } from "@/hooks/use-toast";
import { Breadcrumb } from "../dashboard/Breadcrumb";
import AnalyticsModal from "../modals/AnalyticsModal";
import JoinGroupsModal from "../modals/JoinGroupsModal";
import ScheduleSessionModal from "../modals/ScheduleSessionModal";
import GroupViewModal from "../modals/GroupViewModal";
import { 
  Users, 
  MessageSquare, 
  BookOpen, 
  Star,
  Plus,
  Calendar,
  Award,
  TrendingUp,
  Clock,
  CheckCircle,
  XCircle,
  DollarSign,
  UserCheck,
  Heart,
  Video,
  FileText
} from 'lucide-react';

const ProfessorDashboard = () => {
  const { toast } = useToast();
  const [analyticsOpen, setAnalyticsOpen] = useState(false);
  const [joinGroupsOpen, setJoinGroupsOpen] = useState(false);
  const [scheduleModalOpen, setScheduleModalOpen] = useState(false);
  const [selectedStudent, setSelectedStudent] = useState('');
  const [scheduleAction, setScheduleAction] = useState<'accept' | 'reschedule'>('accept');
  const [groupViewOpen, setGroupViewOpen] = useState(false);
  const [selectedGroup, setSelectedGroup] = useState<any>(null);

  const mentorshipRequests = [
    { id: 1, student: 'John Doe', major: 'Computer Science', message: 'Seeking guidance on AI research...', time: '2h ago' },
    { id: 2, student: 'Maria Chen', major: 'Data Science', message: 'Need help with thesis topic...', time: '1d ago' },
    { id: 3, student: 'Alex Rodriguez', major: 'Computer Science', message: 'Questions about PhD applications...', time: '2d ago' }
  ];

  const upcomingSessions = [
    { id: 1, student: 'Alice Wang', topic: 'PhD Application Review', time: 'Today 2:00 PM', duration: '1 hour' },
    { id: 2, student: 'Bob Smith', topic: 'Research Methodology', time: 'Tomorrow 10:00 AM', duration: '45 min' },
    { id: 3, student: 'Carol Johnson', topic: 'Career Guidance', time: 'Dec 30 3:00 PM', duration: '1 hour' }
  ];

  const myGroups = [
    { id: 1, name: 'Computer Science Faculty', members: 45, newPosts: 3, role: 'moderator' },
    { id: 2, name: 'AI Research Network', members: 128, newPosts: 7, role: 'member' },
    { id: 3, name: 'Academic Writing Circle', members: 67, newPosts: 1, role: 'member' }
  ];

  const earningsData = {
    thisMonth: 3450,
    lastMonth: 2890,
    totalEarnings: 28750,
    pendingPayouts: 1250
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50/30 via-white to-green-100/20">
      <div className="p-6 space-y-6">
        <Breadcrumb items={[{ label: "Dashboard" }]} />
        
        {/* Welcome Section */}
        <Card className="bg-gradient-to-r from-green-500 to-blue-600 text-white">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Award className="h-6 w-6" />
              Welcome back, Professor!
            </CardTitle>
            <CardDescription className="text-green-100">
              You have 3 new mentorship requests and 2 upcoming sessions today.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-4 gap-4 mb-6">
              <div className="text-center">
                <div className="text-2xl font-bold">127</div>
                <div className="text-sm text-green-100">Students Mentored</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold">4.8</div>
                <div className="text-sm text-green-100">Avg Rating</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold">8</div>
                <div className="text-sm text-green-100">Active Groups</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold">${earningsData.thisMonth}</div>
                <div className="text-sm text-green-100">This Month</div>
              </div>
            </div>
            <div className="flex gap-3">
              <Button 
                variant="secondary" 
                size="sm" 
                className="bg-white/20 hover:bg-white/30 text-white border-white/30"
                onClick={() => setAnalyticsOpen(true)}
              >
                <TrendingUp className="h-4 w-4 mr-1" />
                Analytics
              </Button>
              <Button 
                variant="outline" 
                size="sm" 
                className="border-white/30 text-white hover:bg-white/10"
                onClick={() => setJoinGroupsOpen(true)}
              >
                <Users className="h-4 w-4 mr-1" />
                Join Groups
              </Button>
            </div>
          </CardContent>
        </Card>

        <div className="grid lg:grid-cols-3 gap-6">
          {/* Mentorship Requests */}
          <Card>
            <CardHeader>
              <div className="flex justify-between items-center">
                <CardTitle className="text-lg flex items-center gap-2">
                  <Heart className="h-5 w-5 text-red-600" />
                  Mentorship Requests
                </CardTitle>
                <Badge className="bg-red-100 text-red-700">
                  {mentorshipRequests.length} New
                </Badge>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              {mentorshipRequests.map((request) => (
                <div key={request.id} className="border rounded-lg p-4">
                  <div className="flex items-start justify-between mb-2">
                    <div className="flex items-center space-x-3">
                      <Avatar className="h-8 w-8">
                        <AvatarFallback className="bg-blue-100 text-blue-600">
                          {request.student.split(' ').map(n => n[0]).join('')}
                        </AvatarFallback>
                      </Avatar>
                      <div>
                        <p className="font-medium text-sm text-gray-900">{request.student}</p>
                        <p className="text-xs text-gray-600">{request.major}</p>
                      </div>
                    </div>
                    <span className="text-xs text-gray-500">{request.time}</span>
                  </div>
                  <p className="text-sm text-gray-700 mb-3 line-clamp-2">{request.message}</p>
                  <div className="flex gap-2">
                    <Button 
                      size="sm" 
                      className="bg-green-600 hover:bg-green-700 flex-1"
                      onClick={() => {
                        setSelectedStudent(request.student);
                        setScheduleAction('accept');
                        setScheduleModalOpen(true);
                      }}
                    >
                      <CheckCircle className="h-3 w-3 mr-1" />
                      Accept
                    </Button>
                    <Button 
                      size="sm" 
                      variant="outline" 
                      className="flex-1"
                      onClick={() => {
                        toast({
                          title: "Request Declined",
                          description: `Mentorship request from ${request.student} has been declined.`,
                        });
                      }}
                    >
                      <XCircle className="h-3 w-3 mr-1" />
                      Decline
                    </Button>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>

          {/* Today's Schedule */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg flex items-center gap-2">
                <Calendar className="h-5 w-5 text-blue-600" />
                Today's Schedule
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {upcomingSessions.map((session) => (
                <div key={session.id} className="border rounded-lg p-3 bg-blue-50">
                  <div className="flex items-start justify-between mb-2">
                    <div>
                      <p className="font-medium text-sm text-gray-900">{session.student}</p>
                      <p className="text-xs text-gray-600">{session.topic}</p>
                    </div>
                    <Badge variant="outline" className="text-xs">
                      {session.duration}
                    </Badge>
                  </div>
                  <p className="text-sm text-blue-700 font-medium mb-2">{session.time}</p>
                  <div className="flex gap-2">
                    <Button 
                      size="sm" 
                      variant="outline" 
                      className="flex-1"
                      onClick={() => {
                        setSelectedStudent(session.student);
                        setScheduleAction('reschedule');
                        setScheduleModalOpen(true);
                      }}
                    >
                      <Clock className="h-3 w-3 mr-1" />
                      Reschedule
                    </Button>
                    <Button 
                      size="sm" 
                      className="flex-1 bg-blue-600 hover:bg-blue-700"
                      onClick={() => {
                        toast({
                          title: "Joining Call",
                          description: `Starting video session with ${session.student}...`,
                        });
                      }}
                    >
                      <Video className="h-3 w-3 mr-1" />
                      Join Call
                    </Button>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>

          {/* My Subject Groups */}
          <Card>
            <CardHeader>
              <div className="flex justify-between items-center">
                <CardTitle className="text-lg flex items-center gap-2">
                  <Users className="h-5 w-5 text-purple-600" />
                  My Groups
                </CardTitle>
                <Button size="sm" className="bg-purple-600 hover:bg-purple-700">
                  <Plus className="h-4 w-4 mr-1" />
                  Join
                </Button>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              {myGroups.map((group) => (
                <div key={group.id} className="border rounded-lg p-4">
                  <div className="flex items-center justify-between mb-2">
                    <h4 className="font-medium text-gray-900">{group.name}</h4>
                    <div className="flex items-center gap-2">
                      {group.newPosts > 0 && (
                        <Badge className="bg-red-100 text-red-700 text-xs">
                          {group.newPosts} new
                        </Badge>
                      )}
                      <Badge variant="outline" className="text-xs">
                        {group.role}
                      </Badge>
                    </div>
                  </div>
                  <p className="text-sm text-gray-600 mb-3">{group.members} members</p>
                  <Button 
                    size="sm" 
                    className="w-full bg-purple-600 hover:bg-purple-700"
                    onClick={() => {
                      setSelectedGroup(group);
                      setGroupViewOpen(true);
                    }}
                  >
                    <MessageSquare className="h-4 w-4 mr-1" />
                    View Posts
                  </Button>
                </div>
              ))}
            </CardContent>
          </Card>
        </div>

        {/* Earnings Overview */}
        <Card>
          <CardHeader>
            <CardTitle className="text-lg flex items-center gap-2">
              <DollarSign className="h-5 w-5 text-green-600" />
              Earnings Overview
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-4 gap-6">
              <div className="text-center p-4 bg-green-50 rounded-lg">
                <div className="text-2xl font-bold text-green-600">${earningsData.thisMonth}</div>
                <div className="text-sm text-gray-600">This Month</div>
              </div>
              <div className="text-center p-4 bg-gray-50 rounded-lg">
                <div className="text-2xl font-bold text-gray-600">${earningsData.lastMonth}</div>
                <div className="text-sm text-gray-600">Last Month</div>
              </div>
              <div className="text-center p-4 bg-blue-50 rounded-lg">
                <div className="text-2xl font-bold text-blue-600">${earningsData.totalEarnings}</div>
                <div className="text-sm text-gray-600">Total Earned</div>
              </div>
              <div className="text-center p-4 bg-orange-50 rounded-lg">
                <div className="text-2xl font-bold text-orange-600">${earningsData.pendingPayouts}</div>
                <div className="text-sm text-gray-600">Pending Payout</div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Modals */}
      <AnalyticsModal open={analyticsOpen} onOpenChange={setAnalyticsOpen} />
      <JoinGroupsModal open={joinGroupsOpen} onOpenChange={setJoinGroupsOpen} />
      <ScheduleSessionModal 
        open={scheduleModalOpen} 
        onOpenChange={setScheduleModalOpen}
        studentName={selectedStudent}
        action={scheduleAction}
      />
      <GroupViewModal 
        open={groupViewOpen} 
        onOpenChange={setGroupViewOpen}
        group={selectedGroup}
      />
    </div>
  );
};

export default ProfessorDashboard;
