import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { useToast } from "@/hooks/use-toast";
import { Breadcrumb } from "../dashboard/Breadcrumb";
import { 
  Building2, 
  MessageSquare, 
  BookOpen, 
  Star,
  Plus,
  Calendar,
  FileText,
  CheckCircle,
  TrendingUp,
  BarChart3,
  Globe,
  Mail,
  Edit,
  Eye,
  Users,
  Video,
  Send
} from 'lucide-react';

const UniversityDashboard = () => {
  const { toast } = useToast();
  const navigate = useNavigate();

  const myPrograms = [
    { 
      id: 1, 
      name: 'Computer Science Masters', 
      applications: 1250, 
      views: 8420,
      status: 'active',
      deadline: 'Dec 15, 2025'
    },
    { 
      id: 2, 
      name: 'Business Analytics PhD', 
      applications: 340, 
      views: 2890,
      status: 'active',
      deadline: 'Jan 30, 2026'
    },
    { 
      id: 3, 
      name: 'Data Science Certificate', 
      applications: 890, 
      views: 0,
      status: 'draft',
      deadline: 'Nov 20, 2025'
    }
  ];

  const recentInquiries = [
    { id: 1, student: 'Emma Chen', program: 'Computer Science Masters', country: 'China', time: '2h ago' },
    { id: 2, student: 'Carlos Rodriguez', program: 'Business Analytics PhD', country: 'Mexico', time: '5h ago' },
    { id: 3, student: 'Priya Sharma', program: 'Data Science Certificate', country: 'India', time: '1d ago' }
  ];

  const analyticsData = {
    totalApplications: 2480,
    programViews: 11310,
    websiteVisits: 45670,
    conversionRate: 5.4
  };

  const upcomingWebinars = [
    { id: 1, title: 'CS Program Overview', date: 'Today 3:00 PM', registrations: 145 },
    { id: 2, title: 'International Student Q&A', date: 'Tomorrow 2:00 PM', registrations: 89 },
    { id: 3, title: 'PhD Research Opportunities', date: 'Dec 30 4:00 PM', registrations: 67 }
  ];

  const handleNewProgram = () => {
    navigate('/dashboard/submit-program');
  };

  const handleViewPrograms = () => {
    navigate('/dashboard/programs');
  };

  const handleMessages = () => {
    navigate('/dashboard/messages');
  };

  const handleEditProgram = (programId: number) => {
    navigate('/dashboard/programs');
    toast({
      title: "Opening Program Editor",
      description: "Redirecting to program management...",
    });
  };

  const handleProgramAnalytics = (programId: number) => {
    toast({
      title: "Program Analytics",
      description: "Opening detailed analytics for this program...",
    });
  };

  const handleReplyToInquiry = (inquiryId: number) => {
    navigate('/dashboard/messages');
  };

  const handleScheduleSession = () => {
    toast({
      title: "Schedule Session",
      description: "Opening session scheduler...",
    });
  };

  const handleStartWebinar = (webinarId: number) => {
    toast({
      title: "Starting Webinar",
      description: "Launching webinar platform...",
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50/30 via-white to-orange-100/20">
      <div className="p-6 space-y-6">
        <Breadcrumb items={[{ label: "Dashboard" }]} />
        
        {/* Welcome Section */}
        <Card className="bg-gradient-to-r from-orange-500 to-red-600 text-white">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Building2 className="h-6 w-6" />
              University Analytics Dashboard
            </CardTitle>
            <CardDescription className="text-orange-100">
              Track your global reach and program performance
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-4 gap-4 mb-6">
              <div className="text-center">
                <div className="text-2xl font-bold">{analyticsData.totalApplications}</div>
                <div className="text-sm text-orange-100">Total Applications</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold">{analyticsData.programViews.toLocaleString()}</div>
                <div className="text-sm text-orange-100">Program Views</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold">{analyticsData.websiteVisits.toLocaleString()}</div>
                <div className="text-sm text-orange-100">Website Visits</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold">{analyticsData.conversionRate}%</div>
                <div className="text-sm text-orange-100">Conversion Rate</div>
              </div>
            </div>
            <div className="flex gap-3">
              <Button variant="secondary" size="sm" className="bg-white/20 hover:bg-white/30 text-white border-white/30">
                <BarChart3 className="h-4 w-4 mr-1" />
                Full Analytics
              </Button>
              <Button 
                variant="outline" 
                size="sm" 
                className="border-white/30 text-white hover:bg-white/10"
                onClick={handleNewProgram}
              >
                <Plus className="h-4 w-4 mr-1" />
                New Program
              </Button>
            </div>
          </CardContent>
        </Card>

        <div className="grid lg:grid-cols-3 gap-6">
          {/* My Programs */}
          <Card className="lg:col-span-2">
            <CardHeader>
              <div className="flex justify-between items-center">
                <CardTitle className="text-lg flex items-center gap-2">
                  <BookOpen className="h-5 w-5 text-blue-600" />
                  My Programs
                </CardTitle>
                <Button size="sm" className="bg-blue-600 hover:bg-blue-700" onClick={handleNewProgram}>
                  <Plus className="h-4 w-4 mr-1" />
                  Submit New
                </Button>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              {myPrograms.map((program) => (
                <div key={program.id} className="border rounded-lg p-4">
                  <div className="flex items-center justify-between mb-3">
                    <div>
                      <h4 className="font-medium text-gray-900">{program.name}</h4>
                      <p className="text-sm text-gray-600">Deadline: {program.deadline}</p>
                    </div>
                    <Badge variant={program.status === 'active' ? 'default' : 'secondary'} className={
                      program.status === 'active' ? 'bg-green-100 text-green-700' : 'bg-yellow-100 text-yellow-700'
                    }>
                      {program.status}
                    </Badge>
                  </div>
                  
                  <div className="grid grid-cols-2 gap-4 mb-3">
                    <div className="text-center p-2 bg-blue-50 rounded">
                      <div className="text-lg font-semibold text-blue-600">{program.applications}</div>
                      <div className="text-xs text-gray-600">Applications</div>
                    </div>
                    <div className="text-center p-2 bg-green-50 rounded">
                      <div className="text-lg font-semibold text-green-600">{program.views.toLocaleString()}</div>
                      <div className="text-xs text-gray-600">Views</div>
                    </div>
                  </div>
                  
                  <div className="flex gap-2">
                    <Button size="sm" variant="outline" className="flex-1" onClick={() => handleEditProgram(program.id)}>
                      <Edit className="h-3 w-3 mr-1" />
                      Edit
                    </Button>
                    <Button size="sm" variant="outline" className="flex-1" onClick={handleViewPrograms}>
                      <Eye className="h-3 w-3 mr-1" />
                      Preview
                    </Button>
                    <Button size="sm" className="flex-1 bg-blue-600 hover:bg-blue-700" onClick={() => handleProgramAnalytics(program.id)}>
                      <BarChart3 className="h-3 w-3 mr-1" />
                      Analytics
                    </Button>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>

          {/* Recent Inquiries */}
          <Card>
            <CardHeader>
              <div className="flex justify-between items-center">
                <CardTitle className="text-lg flex items-center gap-2">
                  <Mail className="h-5 w-5 text-green-600" />
                  Student Inquiries
                </CardTitle>
                <Badge className="bg-green-100 text-green-700">
                  {recentInquiries.length} New
                </Badge>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              {recentInquiries.map((inquiry) => (
                <div key={inquiry.id} className="border rounded-lg p-3 hover:shadow-md transition-shadow">
                  <div className="flex items-start justify-between mb-2">
                    <div className="flex items-center space-x-2">
                      <Avatar className="h-8 w-8">
                        <AvatarFallback className="bg-blue-100 text-blue-600">
                          {inquiry.student.split(' ').map(n => n[0]).join('')}
                        </AvatarFallback>
                      </Avatar>
                      <div>
                        <p className="font-medium text-sm text-gray-900">{inquiry.student}</p>
                        <p className="text-xs text-gray-600">From {inquiry.country}</p>
                      </div>
                    </div>
                    <span className="text-xs text-gray-500">{inquiry.time}</span>
                  </div>
                  <p className="text-sm text-blue-600 mb-2">{inquiry.program}</p>
                  <div className="flex gap-2">
                    <Button size="sm" className="bg-green-600 hover:bg-green-700 flex-1" onClick={() => handleReplyToInquiry(inquiry.id)}>
                      <MessageSquare className="h-3 w-3 mr-1" />
                      Reply
                    </Button>
                    <Button size="sm" variant="outline" className="flex-1">
                      <Send className="h-3 w-3 mr-1" />
                      Info Pack
                    </Button>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>
        </div>

        {/* Upcoming Webinars */}
        <Card>
          <CardHeader>
            <div className="flex justify-between items-center">
              <CardTitle className="text-lg flex items-center gap-2">
                <Video className="h-5 w-5 text-purple-600" />
                Upcoming Live Sessions
              </CardTitle>
              <Button size="sm" className="bg-purple-600 hover:bg-purple-700" onClick={handleScheduleSession}>
                <Plus className="h-4 w-4 mr-1" />
                Schedule Session
              </Button>
            </div>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-3 gap-6">
              {upcomingWebinars.map((webinar) => (
                <div key={webinar.id} className="border rounded-lg p-4 bg-purple-50">
                  <div className="flex items-start justify-between mb-2">
                    <h4 className="font-medium text-gray-900">{webinar.title}</h4>
                    <Badge variant="outline" className="text-xs">
                      {webinar.registrations} registered
                    </Badge>
                  </div>
                  <p className="text-sm text-purple-700 font-medium mb-3">{webinar.date}</p>
                  <div className="flex gap-2">
                    <Button size="sm" variant="outline" className="flex-1">
                      <Edit className="h-3 w-3 mr-1" />
                      Edit
                    </Button>
                    <Button size="sm" className="flex-1 bg-purple-600 hover:bg-purple-700" onClick={() => handleStartWebinar(webinar.id)}>
                      <Video className="h-3 w-3 mr-1" />
                      Start
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default UniversityDashboard;
