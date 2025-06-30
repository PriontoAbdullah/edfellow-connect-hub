
import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { useToast } from "@/hooks/use-toast";
import { 
  Building2, 
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
  Target,
  MapPin,
  GraduationCap,
  Presentation,
  Network,
  Camera,
  Edit
} from 'lucide-react';
import ChatModal from '../modals/ChatModal';
import NotificationsModal from '../modals/NotificationsModal';
import ProfileModal from '../modals/ProfileModal';
import GroupJoinModal from '../modals/GroupJoinModal';

const UniversityDashboard = () => {
  const { toast } = useToast();
  const [chatModal, setChatModal] = useState({ isOpen: false, recipientName: '', recipientRole: '' });
  const [notificationsOpen, setNotificationsOpen] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);
  const [groupJoinOpen, setGroupJoinOpen] = useState(false);

  const [university] = useState({
    name: 'Harvard University',
    location: 'Cambridge, MA',
    type: 'Private Research University',
    established: '1636',
    ranking: 3,
    accreditation: 'NECHE',
    verified: true,
    rating: 4.9
  });

  const publishedPrograms = [
    { 
      id: 1, 
      name: 'Computer Science Masters', 
      degree: 'Masters', 
      applications: 1250, 
      deadline: 'Dec 15, 2025',
      status: 'active',
      views: 8420
    },
    { 
      id: 2, 
      name: 'Business Analytics PhD', 
      degree: 'PhD', 
      applications: 340, 
      deadline: 'Jan 30, 2026',
      status: 'active',
      views: 2890
    },
    { 
      id: 3, 
      name: 'Data Science Certificate', 
      degree: 'Certificate', 
      applications: 890, 
      deadline: 'Nov 20, 2025',
      status: 'draft',
      views: 0
    }
  ];

  const studentInquiries = [
    { id: 1, student: 'Emma Chen', program: 'Computer Science Masters', country: 'China', message: 'Questions about research opportunities...', time: '2h ago' },
    { id: 2, student: 'Carlos Rodriguez', program: 'Business Analytics PhD', country: 'Mexico', message: 'Funding and scholarship options...', time: '5h ago' },
    { id: 3, student: 'Priya Sharma', program: 'Data Science Certificate', country: 'India', message: 'Program duration and requirements...', time: '1d ago' }
  ];

  const professorRecruitment = [
    { id: 1, name: 'Dr. Michael Johnson', field: 'Machine Learning', status: 'interviewing', experience: '15 years' },
    { id: 2, name: 'Dr. Sarah Kim', field: 'Data Science', status: 'offer-sent', experience: '12 years' },
    { id: 3, name: 'Dr. Ahmed Hassan', field: 'Cybersecurity', status: 'applied', experience: '18 years' }
  ];

  const alumniNetwork = [
    { id: 1, name: 'John Smith', graduation: '2018', field: 'Tech', location: 'San Francisco', role: 'Senior Engineer' },
    { id: 2, name: 'Lisa Wang', graduation: '2020', field: 'Finance', location: 'New York', role: 'Investment Analyst' },
    { id: 3, name: 'David Park', graduation: '2019', field: 'Healthcare', location: 'Boston', role: 'Research Scientist' }
  ];

  const upcomingWebinars = [
    { id: 1, title: 'Computer Science Program Overview', date: 'Today 3:00 PM', registrations: 145, type: 'program-info' },
    { id: 2, title: 'International Student Q&A', date: 'Tomorrow 2:00 PM', registrations: 89, type: 'general' },
    { id: 3, title: 'PhD Research Opportunities', date: 'Dec 30 4:00 PM', registrations: 67, type: 'research' }
  ];

  const analyticsData = {
    totalApplications: 2480,
    programViews: 11310,
    websiteVisits: 45670,
    conversionRate: 5.4,
    topCountries: ['USA', 'China', 'India', 'Germany', 'Canada']
  };

  const handleStartChat = (name: string, role: string) => {
    setChatModal({ isOpen: true, recipientName: name, recipientRole: role });
  };

  const handleCreateProgram = () => {
    toast({
      title: "Program Builder Opened",
      description: "Create a new program profile to attract global students.",
    });
  };

  const handleScheduleWebinar = () => {
    toast({
      title: "Webinar Scheduled",
      description: "Your live info session has been scheduled and promoted globally.",
    });
  };

  const handleRecruitProfessor = () => {
    toast({
      title: "Recruitment Posted",
      description: "Your faculty position has been posted to the global academic network.",
    });
  };

  const handleEngageAlumni = () => {
    toast({
      title: "Alumni Campaign Started",
      description: "Engaging with your global alumni network...",
    });
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="grid lg:grid-cols-4 gap-8">
        {/* Left Sidebar - University Profile */}
        <div className="lg:col-span-1 space-y-6">
          {/* University Profile Card */}
          <Card className="bg-gradient-to-br from-orange-50 to-red-50 border-orange-200">
            <CardHeader className="text-center">
              <Avatar className="h-20 w-20 mx-auto mb-4 ring-4 ring-orange-200">
                <AvatarFallback className="text-2xl bg-orange-100 text-orange-600">
                  {university.name.split(' ').map(n => n[0]).join('')}
                </AvatarFallback>
              </Avatar>
              {university.verified && (
                <Badge className="absolute top-2 right-2 bg-orange-600">
                  <CheckCircle className="h-3 w-3 mr-1" />
                  Verified
                </Badge>
              )}
              <CardTitle className="flex items-center justify-center gap-2">
                <Building2 className="h-5 w-5 text-orange-600" />
                {university.name}
              </CardTitle>
              <CardDescription>
                <div className="flex items-center justify-center gap-2 mb-2">
                  <Badge className="bg-orange-100 text-orange-700">
                    University
                  </Badge>
                  <div className="flex items-center">
                    <Star className="h-4 w-4 text-yellow-500 mr-1" />
                    <span className="text-sm font-medium">{university.rating}</span>
                  </div>
                </div>
              </CardDescription>
            </CardHeader>
            <CardContent className="text-center space-y-2">
              <p className="text-sm font-medium text-gray-900">{university.type}</p>
              <div className="flex items-center justify-center gap-1 text-sm text-gray-600">
                <MapPin className="h-4 w-4" />
                {university.location}
              </div>
              <p className="text-sm text-gray-600">Est. {university.established}</p>
              <p className="text-sm text-gray-600">Accredited by {university.accreditation}</p>
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
                  className="flex-1 bg-orange-600 hover:bg-orange-700"
                >
                  <Award className="h-4 w-4 mr-1" />
                  Promote
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Institution Analytics */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg flex items-center gap-2">
                <BarChart3 className="h-5 w-5 text-orange-600" />
                Institution Dashboard
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="flex justify-between">
                <span className="text-gray-600">Applications</span>
                <span className="font-semibold text-orange-600">{analyticsData.totalApplications}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Program Views</span>
                <span className="font-semibold text-orange-600">{analyticsData.programViews.toLocaleString()}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Website Visits</span>
                <span className="font-semibold text-orange-600">{analyticsData.websiteVisits.toLocaleString()}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Conversion Rate</span>
                <span className="font-semibold text-orange-600">{analyticsData.conversionRate}%</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Global Ranking</span>
                <span className="font-semibold text-orange-600">#{university.ranking}</span>
              </div>
            </CardContent>
          </Card>

          {/* Quick Actions */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Institution Tools</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <Button 
                className="w-full justify-start bg-orange-600 hover:bg-orange-700" 
                size="sm"
                onClick={handleCreateProgram}
              >
                <Presentation className="h-4 w-4 mr-2" />
                Program Promotion
              </Button>
              <Button 
                className="w-full justify-start" 
                variant="outline" 
                size="sm"
                onClick={handleRecruitProfessor}
              >
                <UserCheck className="h-4 w-4 mr-2" />
                Professor Recruitment
              </Button>
              <Button 
                className="w-full justify-start" 
                variant="outline" 
                size="sm"
                onClick={handleScheduleWebinar}
              >
                <Video className="h-4 w-4 mr-2" />
                Live Info Sessions
              </Button>
              <Button 
                className="w-full justify-start" 
                variant="outline" 
                size="sm"
                onClick={handleEngageAlumni}
              >
                <Network className="h-4 w-4 mr-2" />
                Alumni Network
              </Button>
            </CardContent>
          </Card>
        </div>

        {/* Center Content */}
        <div className="lg:col-span-2 space-y-6">
          {/* Welcome Message */}
          <Card className="bg-gradient-to-r from-orange-500 to-red-600 text-white">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Globe className="h-6 w-6" />
                Welcome, {university.name}!
              </CardTitle>
              <CardDescription className="text-orange-100">
                You have {studentInquiries.length} new student inquiries and {upcomingWebinars.length} upcoming webinars scheduled.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex gap-3">
                <Button variant="secondary" size="sm" className="bg-white/20 hover:bg-white/30 text-white border-white/30">
                  <BarChart3 className="h-4 w-4 mr-1" />
                  Full Analytics
                </Button>
                <Button 
                  variant="outline" 
                  size="sm" 
                  className="border-white/30 text-white hover:bg-white/10"
                  onClick={handleCreateProgram}
                >
                  <Plus className="h-4 w-4 mr-1" />
                  New Program
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Program Promotion Tools */}
          <Card>
            <CardHeader>
              <div className="flex justify-between items-center">
                <CardTitle className="text-lg flex items-center gap-2">
                  <Presentation className="h-5 w-5 text-blue-600" />
                  Program Promotion Tools
                </CardTitle>
                <Button 
                  size="sm" 
                  className="bg-blue-600 hover:bg-blue-700"
                  onClick={handleCreateProgram}
                >
                  <Plus className="h-4 w-4 mr-1" />
                  Create Program
                </Button>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              {publishedPrograms.map((program) => (
                <div key={program.id} className="border rounded-lg p-4">
                  <div className="flex items-center justify-between mb-2">
                    <div>
                      <h4 className="font-medium text-gray-900">{program.name}</h4>
                      <p className="text-sm text-gray-600">{program.degree} Program</p>
                    </div>
                    <Badge variant={program.status === 'active' ? 'default' : 'secondary'} className={
                      program.status === 'active' ? 'bg-green-100 text-green-700' : 'bg-yellow-100 text-yellow-700'
                    }>
                      {program.status}
                    </Badge>
                  </div>
                  <div className="grid grid-cols-3 gap-4 mb-3">
                    <div className="text-center">
                      <p className="text-sm text-gray-600">Applications</p>
                      <p className="font-semibold text-blue-600">{program.applications}</p>
                    </div>
                    <div className="text-center">
                      <p className="text-sm text-gray-600">Views</p>
                      <p className="font-semibold text-green-600">{program.views.toLocaleString()}</p>
                    </div>
                    <div className="text-center">
                      <p className="text-sm text-gray-600">Deadline</p>
                      <p className="font-semibold text-orange-600">{program.deadline}</p>
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <Button size="sm" variant="outline" className="flex-1">
                      <Edit className="h-4 w-4 mr-1" />
                      Edit
                    </Button>
                    <Button size="sm" variant="outline" className="flex-1">
                      <BarChart3 className="h-4 w-4 mr-1" />
                      Analytics
                    </Button>
                    {program.status === 'active' && (
                      <Button size="sm" className="flex-1 bg-blue-600 hover:bg-blue-700">
                        <Globe className="h-4 w-4 mr-1" />
                        Promote
                      </Button>
                    )}
                    {program.status === 'draft' && (
                      <Button size="sm" className="flex-1 bg-green-600 hover:bg-green-700">
                        <CheckCircle className="h-4 w-4 mr-1" />
                        Publish
                      </Button>
                    )}
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>

          {/* Student Recruitment Suite */}
          <Card>
            <CardHeader>
              <div className="flex justify-between items-center">
                <CardTitle className="text-lg flex items-center gap-2">
                  <Target className="h-5 w-5 text-green-600" />
                  Student Recruitment Suite
                </CardTitle>
                <Badge variant="secondary" className="bg-blue-100 text-blue-700">
                  {studentInquiries.length} New Inquiries
                </Badge>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              {studentInquiries.map((inquiry) => (
                <div key={inquiry.id} className="border rounded-lg p-4 hover:shadow-md transition-shadow">
                  <div className="flex items-start justify-between mb-2">
                    <div className="flex items-center space-x-3">
                      <Avatar className="h-10 w-10">
                        <AvatarFallback className="bg-blue-100 text-blue-600">
                          {inquiry.student.split(' ').map(n => n[0]).join('')}
                        </AvatarFallback>
                      </Avatar>
                      <div>
                        <p className="font-medium text-gray-900">{inquiry.student}</p>
                        <p className="text-sm text-gray-600">From {inquiry.country}</p>
                        <p className="text-sm text-blue-600">{inquiry.program}</p>
                      </div>
                    </div>
                    <span className="text-xs text-gray-500">{inquiry.time}</span>
                  </div>
                  <p className="text-sm text-gray-700 mb-3">{inquiry.message}</p>
                  <div className="flex gap-2">
                    <Button 
                      size="sm" 
                      className="bg-green-600 hover:bg-green-700"
                      onClick={() => handleStartChat(inquiry.student, 'student')}
                    >
                      <MessageSquare className="h-4 w-4 mr-1" />
                      Respond
                    </Button>
                    <Button 
                      size="sm" 
                      variant="outline"
                    >
                      <Mail className="h-4 w-4 mr-1" />
                      Send Info Pack
                    </Button>
                    <Button 
                      size="sm" 
                      variant="outline"
                    >
                      <Calendar className="h-4 w-4 mr-1" />
                      Schedule Call
                    </Button>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>
        </div>

        {/* Right Sidebar */}
        <div className="lg:col-span-1 space-y-6">
          {/* Professor Recruitment */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg flex items-center gap-2">
                <UserCheck className="h-5 w-5 text-purple-600" />
                Professor Recruitment
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {professorRecruitment.map((professor) => (
                <div key={professor.id} className="border rounded-lg p-3">
                  <div className="flex items-center justify-between mb-2">
                    <div>
                      <p className="font-medium text-sm text-gray-900">{professor.name}</p>
                      <p className="text-xs text-gray-600">{professor.field}</p>
                    </div>
                    <Badge variant={professor.status === 'offer-sent' ? 'default' : 'secondary'} className={
                      professor.status === 'offer-sent' ? 'bg-green-100 text-green-700' : 
                      professor.status === 'interviewing' ? 'bg-blue-100 text-blue-700' : 'bg-yellow-100 text-yellow-700'
                    }>
                      {professor.status}
                    </Badge>
                  </div>
                  <p className="text-sm text-purple-700 font-medium mb-2">{professor.experience}</p>
                  <div className="flex gap-2">
                    <Button size="sm" variant="outline" className="flex-1">
                      <FileText className="h-3 w-3 mr-1" />
                      View CV
                    </Button>
                    {professor.status === 'applied' && (
                      <Button size="sm" className="flex-1 bg-purple-600 hover:bg-purple-700">
                        <Video className="h-3 w-3 mr-1" />
                        Interview
                      </Button>
                    )}
                  </div>
                </div>
              ))}
              <Button size="sm" className="w-full bg-purple-600 hover:bg-purple-700" onClick={handleRecruitProfessor}>
                <Plus className="h-4 w-4 mr-1" />
                Post Position
              </Button>
            </CardContent>
          </Card>

          {/* Live Info Sessions & Webinars */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg flex items-center gap-2">
                <Video className="h-5 w-5 text-red-600" />
                Live Info Sessions
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {upcomingWebinars.map((webinar) => (
                <div key={webinar.id} className="border rounded-lg p-3 bg-red-50">
                  <div className="flex items-start justify-between mb-2">
                    <div>
                      <p className="font-medium text-sm text-gray-900">{webinar.title}</p>
                      <p className="text-xs text-gray-600">{webinar.type}</p>
                    </div>
                    <Badge variant="outline" className="text-xs">
                      {webinar.registrations} registered
                    </Badge>
                  </div>
                  <p className="text-sm text-red-700 font-medium mb-2">{webinar.date}</p>
                  <div className="flex gap-2">
                    <Button size="sm" variant="outline" className="flex-1">
                      <Edit className="h-3 w-3 mr-1" />
                      Edit
                    </Button>
                    <Button size="sm" className="flex-1 bg-red-600 hover:bg-red-700">
                      <Video className="h-3 w-3 mr-1" />
                      Start Session
                    </Button>
                  </div>
                </div>
              ))}
              <Button size="sm" className="w-full bg-red-600 hover:bg-red-700" onClick={handleScheduleWebinar}>
                <Plus className="h-4 w-4 mr-1" />
                Schedule Webinar
              </Button>
            </CardContent>
          </Card>

          {/* Alumni Engagement Network */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg flex items-center gap-2">
                <Network className="h-5 w-5 text-green-600" />
                Alumni Network
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {alumniNetwork.map((alumni) => (
                <div key={alumni.id} className="border rounded-lg p-3">
                  <div className="flex items-center justify-between mb-2">
                    <div>
                      <p className="font-medium text-sm text-gray-900">{alumni.name}</p>
                      <p className="text-xs text-gray-600">{alumni.role}</p>
                    </div>
                    <Badge variant="outline" className="text-xs">
                      {alumni.graduation}
                    </Badge>
                  </div>
                  <div className="flex items-center gap-1 text-xs text-gray-600 mb-2">
                    <MapPin className="h-3 w-3" />
                    {alumni.location} • {alumni.field}
                  </div>
                  <Button size="sm" variant="outline" className="w-full">
                    <MessageSquare className="h-3 w-3 mr-1" />
                    Connect
                  </Button>
                </div>
              ))}
              <Button size="sm" className="w-full bg-green-600 hover:bg-green-700" onClick={handleEngageAlumni}>
                <Network className="h-4 w-4 mr-1" />
                Engage Alumni
              </Button>
            </CardContent>
          </Card>

          {/* Top Countries */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg flex items-center gap-2">
                <Globe className="h-5 w-5 text-blue-600" />
                Global Reach
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <p className="text-sm text-gray-600 mb-2">Top student countries:</p>
              {analyticsData.topCountries.map((country, index) => (
                <div key={country} className="flex justify-between items-center">
                  <span className="text-sm text-gray-700">#{index + 1} {country}</span>
                  <Badge variant="outline" className="text-xs">
                    {Math.floor(Math.random() * 500) + 100} students
                  </Badge>
                </div>
              ))}
              <Button size="sm" className="w-full bg-blue-600 hover:bg-blue-700">
                <Globe className="h-4 w-4 mr-1" />
                View Full Map
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
        userRole="university"
      />

      <GroupJoinModal
        isOpen={groupJoinOpen}
        onClose={() => setGroupJoinOpen(false)}
      />
    </div>
  );
};

export default UniversityDashboard;
