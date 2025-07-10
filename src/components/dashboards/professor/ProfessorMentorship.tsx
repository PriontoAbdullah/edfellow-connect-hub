
import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Breadcrumb } from "../../dashboard/Breadcrumb";
import ScheduleSessionModal from "../../modals/ScheduleSessionModal";
import { useToast } from "@/hooks/use-toast";
import { Heart, CheckCircle, XCircle, Calendar, MessageSquare, Star, Clock, BookOpen, MapPin } from 'lucide-react';

const ProfessorMentorship = () => {
  const [activeTab, setActiveTab] = useState('requests');
  const [scheduleModalOpen, setScheduleModalOpen] = useState(false);
  const [selectedStudent, setSelectedStudent] = useState('');
  const [scheduleAction, setScheduleAction] = useState<'accept' | 'reschedule'>('accept');
  const { toast } = useToast();

  const mentorshipRequests = [
    {
      id: 1,
      student: 'Emily Johnson',
      major: 'Computer Science',
      university: 'UC Berkeley',
      country: 'USA',
      gpa: '3.9/4.0',
      year: 'Junior',
      message: 'I am interested in AI research and would love guidance on choosing the right PhD programs and developing my research skills.',
      interests: ['Machine Learning', 'Computer Vision', 'AI Ethics'],
      time: '2 hours ago',
      priority: 'high'
    },
    {
      id: 2,
      student: 'Michael Chen',
      major: 'Data Science',
      university: 'MIT',
      country: 'USA',
      gpa: '3.7/4.0',
      year: 'Senior',
      message: 'Seeking mentorship for my capstone project on natural language processing and career advice for industry transitions.',
      interests: ['NLP', 'Deep Learning', 'Industry Career'],
      time: '5 hours ago',
      priority: 'medium'
    },
    {
      id: 3,
      student: 'Sarah Patel',
      major: 'Applied Mathematics',
      university: 'Stanford University',
      country: 'USA',
      gpa: '3.8/4.0',
      year: 'Graduate',
      message: 'Looking for guidance on research methodologies and publication strategies for my thesis on optimization algorithms.',
      interests: ['Optimization', 'Research Methods', 'Academic Publishing'],
      time: '1 day ago',
      priority: 'medium'
    }
  ];

  const currentMentees = [
    {
      id: 1,
      name: 'Alice Wang',
      major: 'Computer Science',
      university: 'Harvard',
      startDate: 'Sep 2024',
      sessions: 8,
      nextSession: 'Dec 28, 2pm',
      progress: 'Excellent',
      focus: 'PhD Applications'
    },
    {
      id: 2,
      name: 'David Kim',
      major: 'Data Science',
      university: 'Stanford',
      startDate: 'Oct 2024',
      sessions: 5,
      nextSession: 'Dec 30, 10am',
      progress: 'Good',
      focus: 'Research Skills'
    },
    {
      id: 3,
      name: 'Lisa Zhang',
      major: 'AI/ML',
      university: 'MIT',
      startDate: 'Nov 2024',
      sessions: 3,
      nextSession: 'Jan 2, 3pm',
      progress: 'Good',
      focus: 'Career Guidance'
    }
  ];

  return (
    <div className="p-6 space-y-6">
      <Breadcrumb items={[{ label: "Dashboard", href: "/dashboard" }, { label: "Mentorship Requests" }]} />
      
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Mentorship Center</h1>
          <p className="text-gray-600">Manage mentorship requests and current mentees</p>
        </div>
        <div className="flex items-center gap-2">
          <Badge className="bg-red-100 text-red-700">
            {mentorshipRequests.length} New Requests
          </Badge>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex gap-1 bg-gray-100 p-1 rounded-lg w-fit">
        <Button
          variant={activeTab === 'requests' ? 'default' : 'ghost'}
          size="sm"
          onClick={() => setActiveTab('requests')}
          className={activeTab === 'requests' ? 'bg-white shadow-sm' : ''}
        >
          <Heart className="h-4 w-4 mr-2" />
          New Requests ({mentorshipRequests.length})
        </Button>
        <Button
          variant={activeTab === 'mentees' ? 'default' : 'ghost'}
          size="sm"
          onClick={() => setActiveTab('mentees')}
          className={activeTab === 'mentees' ? 'bg-white shadow-sm' : ''}
        >
          <Star className="h-4 w-4 mr-2" />
          Current Mentees ({currentMentees.length})
        </Button>
      </div>

      {activeTab === 'requests' && (
        <div className="space-y-6">
          <h2 className="text-xl font-semibold text-gray-900">Mentorship Requests</h2>
          <div className="grid gap-6">
            {mentorshipRequests.map((request) => (
              <Card key={request.id} className="hover:shadow-lg transition-shadow">
                <CardHeader>
                  <div className="flex items-start justify-between">
                    <div className="flex items-center space-x-4">
                      <Avatar className="h-12 w-12">
                        <AvatarFallback className="bg-blue-100 text-blue-600">
                          {request.student.split(' ').map(n => n[0]).join('')}
                        </AvatarFallback>
                      </Avatar>
                      <div>
                        <CardTitle className="text-lg">{request.student}</CardTitle>
                        <CardDescription className="flex items-center gap-4">
                          <span>{request.major} • {request.year}</span>
                          <span>GPA: {request.gpa}</span>
                        </CardDescription>
                        <div className="flex items-center gap-4 mt-1 text-sm text-gray-600">
                          <div className="flex items-center">
                            <BookOpen className="h-4 w-4 mr-1" />
                            {request.university}
                          </div>
                          <div className="flex items-center">
                            <MapPin className="h-4 w-4 mr-1" />
                            {request.country}
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <Badge variant={request.priority === 'high' ? 'destructive' : 'secondary'}>
                        {request.priority} priority
                      </Badge>
                      <span className="text-sm text-gray-500">{request.time}</span>
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <h4 className="font-medium text-gray-900 mb-2">Request Message:</h4>
                    <p className="text-gray-700 text-sm leading-relaxed">{request.message}</p>
                  </div>
                  
                  <div>
                    <h4 className="font-medium text-gray-900 mb-2">Areas of Interest:</h4>
                    <div className="flex flex-wrap gap-2">
                      {request.interests.map((interest, index) => (
                        <Badge key={index} variant="outline" className="text-xs">
                          {interest}
                        </Badge>
                      ))}
                    </div>
                  </div>

                  <div className="flex gap-3 pt-4 border-t">
                    <Button 
                      className="bg-green-600 hover:bg-green-700 flex-1"
                      onClick={() => {
                        setSelectedStudent(request.student);
                        setScheduleAction('accept');
                        setScheduleModalOpen(true);
                      }}
                    >
                      <CheckCircle className="h-4 w-4 mr-2" />
                      Accept & Schedule
                    </Button>
                    <Button 
                      variant="outline" 
                      className="flex-1"
                      onClick={() => {
                        toast({
                          title: "Message Sent",
                          description: `Opening message chat with ${request.student}...`,
                        });
                      }}
                    >
                      <MessageSquare className="h-4 w-4 mr-2" />
                      Message First
                    </Button>
                    <Button 
                      variant="outline" 
                      className="px-4"
                      onClick={() => {
                        toast({
                          title: "Request Declined",
                          description: `Mentorship request from ${request.student} has been declined.`,
                        });
                      }}
                    >
                      <XCircle className="h-4 w-4 mr-2" />
                      Decline
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      )}

      {activeTab === 'mentees' && (
        <div className="space-y-6">
          <h2 className="text-xl font-semibold text-gray-900">Current Mentees</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {currentMentees.map((mentee) => (
              <Card key={mentee.id} className="hover:shadow-lg transition-shadow">
                <CardHeader>
                  <div className="flex items-center space-x-3">
                    <Avatar className="h-10 w-10">
                      <AvatarFallback className="bg-blue-100 text-blue-600">
                        {mentee.name.split(' ').map(n => n[0]).join('')}
                      </AvatarFallback>
                    </Avatar>
                    <div>
                      <CardTitle className="text-lg">{mentee.name}</CardTitle>
                      <CardDescription>{mentee.major}</CardDescription>
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="text-sm text-gray-600 space-y-2">
                    <div className="flex items-center">
                      <BookOpen className="h-4 w-4 mr-2" />
                      {mentee.university}
                    </div>
                    <div className="flex items-center">
                      <Calendar className="h-4 w-4 mr-2" />
                      Started: {mentee.startDate}
                    </div>
                    <div className="flex items-center">
                      <Clock className="h-4 w-4 mr-2" />
                      Next: {mentee.nextSession}
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span>Focus Area:</span>
                      <Badge variant="outline">{mentee.focus}</Badge>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span>Sessions:</span>
                      <span className="font-medium">{mentee.sessions}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span>Progress:</span>
                      <Badge variant={mentee.progress === 'Excellent' ? 'default' : 'secondary'}>
                        {mentee.progress}
                      </Badge>
                    </div>
                  </div>

                  <div className="flex gap-2">
                    <Button 
                      size="sm" 
                      className="flex-1 bg-blue-600 hover:bg-blue-700"
                      onClick={() => {
                        toast({
                          title: "Opening Chat",
                          description: `Starting conversation with ${mentee.name}...`,
                        });
                      }}
                    >
                      <MessageSquare className="h-4 w-4 mr-1" />
                      Message
                    </Button>
                    <Button 
                      size="sm" 
                      variant="outline" 
                      className="flex-1"
                      onClick={() => {
                        setSelectedStudent(mentee.name);
                        setScheduleAction('reschedule');
                        setScheduleModalOpen(true);
                      }}
                    >
                      <Calendar className="h-4 w-4 mr-1" />
                      Schedule
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      )}

      {/* Schedule Modal */}
      <ScheduleSessionModal 
        open={scheduleModalOpen} 
        onOpenChange={setScheduleModalOpen}
        studentName={selectedStudent}
        action={scheduleAction}
      />
    </div>
  );
};

export default ProfessorMentorship;
