
import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { 
  Building2, 
  Plus, 
  Star,
  MapPin,
  Calendar,
  Users,
  TrendingUp,
  Eye,
  Edit,
  Trash2,
  BarChart3,
  Send,
  CheckCircle,
  DollarSign
} from 'lucide-react';
import ChatModal from '../modals/ChatModal';
import NotificationsModal from '../modals/NotificationsModal';
import ProfileModal from '../modals/ProfileModal';

const UniversityDashboard = () => {
  const { toast } = useToast();
  const [chatModal, setChatModal] = useState({ isOpen: false, recipientName: '', recipientRole: '' });
  const [notificationsOpen, setNotificationsOpen] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);
  const [showAddProgram, setShowAddProgram] = useState(false);
  const [programForm, setProgramForm] = useState({
    name: '',
    type: '',
    deadline: '',
    location: '',
    description: '',
    tuition: ''
  });

  const [user] = useState({
    name: 'Harvard University',
    role: 'university',
    location: 'Cambridge, MA',
    established: '1636',
    bio: 'One of the world\'s leading research universities, dedicated to excellence in education, learning, and research.'
  });

  const [submittedPrograms, setSubmittedPrograms] = useState([
    {
      id: 1,
      name: 'Business Analytics Certificate',
      type: 'Certificate',
      deadline: 'Nov 30, 2025',
      location: 'Boston, MA',
      status: 'active',
      views: 1240,
      applications: 45,
      featured: true
    },
    {
      id: 2,
      name: 'Master of Public Health',
      type: 'Masters',
      deadline: 'Jan 15, 2026',
      location: 'Boston, MA',
      status: 'active',
      views: 890,
      applications: 32,
      featured: false
    },
    {
      id: 3,
      name: 'Executive MBA Program',
      type: 'MBA',
      deadline: 'Mar 1, 2026',
      location: 'Boston, MA',
      status: 'draft',
      views: 0,
      applications: 0,
      featured: false
    }
  ]);

  const analytics = {
    totalViews: 2130,
    totalApplications: 77,
    avgRating: 4.7,
    totalPrograms: 3
  };

  const recentInquiries = [
    { id: 1, student: 'John Doe', program: 'Business Analytics Certificate', message: 'What are the prerequisites for this program?', time: '2h ago' },
    { id: 2, student: 'Sarah Chen', program: 'Master of Public Health', message: 'Is this program available online?', time: '5h ago' },
    { id: 3, student: 'Mike Rodriguez', program: 'Executive MBA Program', message: 'Can you provide more information about the curriculum?', time: '1d ago' }
  ];

  const handleStartChat = (name: string, role: string) => {
    setChatModal({ isOpen: true, recipientName: name, recipientRole: role });
  };

  const handleSubmitProgram = (asDraft = false) => {
    if (!programForm.name || !programForm.type || !programForm.deadline || !programForm.location) {
      toast({
        title: "Missing Information",
        description: "Please fill in all required fields.",
        variant: "destructive"
      });
      return;
    }

    const newProgram = {
      id: submittedPrograms.length + 1,
      name: programForm.name,
      type: programForm.type,
      deadline: programForm.deadline,
      location: programForm.location,
      status: asDraft ? 'draft' : 'active',
      views: 0,
      applications: 0,
      featured: false
    };

    setSubmittedPrograms([...submittedPrograms, newProgram]);
    setProgramForm({ name: '', type: '', deadline: '', location: '', description: '', tuition: '' });
    setShowAddProgram(false);

    toast({
      title: asDraft ? "Program Saved as Draft" : "Program Published",
      description: asDraft ? 
        "Your program has been saved as a draft." : 
        "Your program is now live and visible to students!",
    });
  };

  const handleDeleteProgram = (programId: number, programName: string) => {
    setSubmittedPrograms(submittedPrograms.filter(p => p.id !== programId));
    toast({
      title: "Program Deleted",
      description: `${programName} has been removed.`,
    });
  };

  const handleFeatureProgram = (programId: number, programName: string) => {
    setSubmittedPrograms(submittedPrograms.map(p => 
      p.id === programId ? { ...p, featured: !p.featured } : p
    ));
    toast({
      title: "Program Updated",
      description: `${programName} has been ${submittedPrograms.find(p => p.id === programId)?.featured ? 'unfeatured' : 'featured'}.`,
    });
  };

  const handleReplyToInquiry = (inquiryId: number, studentName: string) => {
    toast({
      title: "Reply Sent",
      description: `Your response has been sent to ${studentName}.`,
    });
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="grid lg:grid-cols-4 gap-8">
        {/* Left Sidebar - Profile */}
        <div className="lg:col-span-1 space-y-6">
          {/* University Profile */}
          <Card className="bg-gradient-to-br from-orange-50 to-red-50 border-orange-200">
            <CardHeader className="text-center">
              <Avatar className="h-20 w-20 mx-auto mb-4">
                <AvatarFallback className="text-2xl bg-orange-100 text-orange-600">
                  {user.name.split(' ').map(n => n[0]).join('')}
                </AvatarFallback>
              </Avatar>
              <CardTitle className="flex items-center justify-center gap-2">
                <Building2 className="h-5 w-5 text-orange-600" />
                {user.name}
              </CardTitle>
              <CardDescription>
                <Badge className="bg-orange-100 text-orange-700">
                  University
                </Badge>
              </CardDescription>
            </CardHeader>
            <CardContent className="text-center space-y-2">
              <p className="text-sm font-medium text-gray-900">Est. {user.established}</p>
              <p className="text-sm text-gray-600 flex items-center justify-center gap-1">
                <MapPin className="h-4 w-4" />
                {user.location}
              </p>
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

          {/* University Stats */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">University Stats</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="flex justify-between">
                <span className="text-gray-600">Total Views</span>
                <span className="font-semibold text-orange-600">{analytics.totalViews.toLocaleString()}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Applications</span>
                <span className="font-semibold text-orange-600">{analytics.totalApplications}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Active Programs</span>
                <span className="font-semibold text-orange-600">{submittedPrograms.filter(p => p.status === 'active').length}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Average Rating</span>
                <div className="flex items-center">
                  <Star className="h-4 w-4 text-yellow-500 mr-1" />
                  <span className="font-semibold text-orange-600">{analytics.avgRating}</span>
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
                className="w-full justify-start bg-orange-600 hover:bg-orange-700" 
                size="sm"
                onClick={() => setShowAddProgram(true)}
              >
                <Plus className="h-4 w-4 mr-2" />
                Add New Program
              </Button>
              <Button 
                className="w-full justify-start" 
                variant="outline" 
                size="sm"
                onClick={() => setNotificationsOpen(true)}
              >
                <BarChart3 className="h-4 w-4 mr-2" />
                View Analytics
              </Button>
              <Button className="w-full justify-start" variant="outline" size="sm">
                <Users className="h-4 w-4 mr-2" />
                Manage Alumni
              </Button>
            </CardContent>
          </Card>
        </div>

        {/* Center Content */}
        <div className="lg:col-span-2 space-y-6">
          {/* Welcome Message */}
          <Card className="bg-gradient-to-r from-orange-500 to-red-600 text-white">
            <CardHeader>
              <CardTitle>Welcome back, {user.name}!</CardTitle>
              <CardDescription className="text-orange-100">
                Your programs have received {analytics.totalViews} views and {analytics.totalApplications} applications this month.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex gap-3">
                <Button 
                  variant="secondary" 
                  size="sm" 
                  className="bg-white/20 hover:bg-white/30 text-white border-white/30"
                  onClick={() => setNotificationsOpen(true)}
                >
                  View Performance
                </Button>
                <Button 
                  variant="outline" 
                  size="sm" 
                  className="border-white/30 text-white hover:bg-white/10"
                  onClick={() => setShowAddProgram(true)}
                >
                  Promote Programs
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Add Program Form */}
          {showAddProgram && (
            <Card className="border-orange-200">
              <CardHeader>
                <CardTitle className="text-lg">Add New Program</CardTitle>
                <CardDescription>Create a new program listing to attract students</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="program-name">Program Name *</Label>
                    <Input 
                      id="program-name" 
                      placeholder="e.g., Master of Data Science"
                      value={programForm.name}
                      onChange={(e) => setProgramForm({...programForm, name: e.target.value})}
                    />
                  </div>
                  <div>
                    <Label htmlFor="program-type">Program Type *</Label>
                    <select 
                      id="program-type" 
                      className="w-full p-2 border rounded-md"
                      value={programForm.type}
                      onChange={(e) => setProgramForm({...programForm, type: e.target.value})}
                    >
                      <option value="">Select Type</option>
                      <option value="bachelors">Bachelor's</option>
                      <option value="masters">Master's</option>
                      <option value="phd">PhD</option>
                      <option value="certificate">Certificate</option>
                      <option value="mba">MBA</option>
                    </select>
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="deadline">Application Deadline *</Label>
                    <Input 
                      id="deadline" 
                      type="date"
                      value={programForm.deadline}
                      onChange={(e) => setProgramForm({...programForm, deadline: e.target.value})}
                    />
                  </div>
                  <div>
                    <Label htmlFor="location">Location *</Label>
                    <Input 
                      id="location" 
                      placeholder="e.g., Boston, MA or Online"
                      value={programForm.location}
                      onChange={(e) => setProgramForm({...programForm, location: e.target.value})}
                    />
                  </div>
                </div>
                <div>
                  <Label htmlFor="tuition">Tuition (Optional)</Label>
                  <Input 
                    id="tuition" 
                    placeholder="e.g., $50,000/year"
                    value={programForm.tuition}
                    onChange={(e) => setProgramForm({...programForm, tuition: e.target.value})}
                  />
                </div>
                <div>
                  <Label htmlFor="description">Program Description</Label>
                  <Textarea 
                    id="description" 
                    className="h-20"
                    placeholder="Brief description of the program..."
                    value={programForm.description}
                    onChange={(e) => setProgramForm({...programForm, description: e.target.value})}
                  />
                </div>
                <div className="flex justify-between">
                  <Button variant="outline" onClick={() => setShowAddProgram(false)}>
                    Cancel
                  </Button>
                  <div className="flex gap-2">
                    <Button variant="outline" onClick={() => handleSubmitProgram(true)}>
                      Save as Draft
                    </Button>
                    <Button 
                      className="bg-orange-600 hover:bg-orange-700"
                      onClick={() => handleSubmitProgram(false)}
                    >
                      <CheckCircle className="h-4 w-4 mr-2" />
                      Publish Program
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          )}

          {/* Submitted Programs */}
          <Card>
            <CardHeader>
              <div className="flex justify-between items-center">
                <CardTitle className="text-lg">Your Programs</CardTitle>
                <Button 
                  variant="ghost" 
                  size="sm"
                  onClick={() => setShowAddProgram(true)}
                >
                  <Plus className="h-4 w-4 mr-1" />
                  Add Program
                </Button>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              {submittedPrograms.map((program) => (
                <div key={program.id} className="border rounded-lg p-4 hover:shadow-md transition-shadow">
                  <div className="flex items-start justify-between mb-3">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        <h4 className="font-medium text-gray-900">{program.name}</h4>
                        <Badge variant="secondary">{program.type}</Badge>
                        {program.featured && (
                          <Badge className="bg-yellow-100 text-yellow-700">
                            <Star className="h-3 w-3 mr-1" />
                            Featured
                          </Badge>
                        )}
                      </div>
                      <div className="flex items-center gap-4 text-sm text-gray-600">
                        <div className="flex items-center">
                          <MapPin className="h-4 w-4 mr-1" />
                          {program.location}
                        </div>
                        <div className="flex items-center">
                          <Calendar className="h-4 w-4 mr-1" />
                          {program.deadline}
                        </div>
                      </div>
                    </div>
                    <Badge variant={program.status === 'active' ? 'default' : 'secondary'} className={
                      program.status === 'active' ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-700'
                    }>
                      {program.status}
                    </Badge>
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-6 text-sm text-gray-600">
                      <div className="flex items-center">
                        <Eye className="h-4 w-4 mr-1" />
                        {program.views} views
                      </div>
                      <div className="flex items-center">
                        <Users className="h-4 w-4 mr-1" />
                        {program.applications} applications
                      </div>
                      {program.status === 'active' && (
                        <div className="flex items-center text-green-600">
                          <TrendingUp className="h-4 w-4 mr-1" />
                          Live
                        </div>
                      )}
                    </div>
                    
                    <div className="flex items-center gap-2">
                      <Button 
                        variant="outline" 
                        size="sm"
                        onClick={() => handleFeatureProgram(program.id, program.name)}
                      >
                        <Star className="h-4 w-4 mr-1" />
                        {program.featured ? 'Unfeature' : 'Feature'}
                      </Button>
                      <Button variant="outline" size="sm">
                        <Edit className="h-4 w-4 mr-1" />
                        Edit
                      </Button>
                      <Button 
                        variant="outline" 
                        size="sm" 
                        className="text-red-600 hover:text-red-700"
                        onClick={() => handleDeleteProgram(program.id, program.name)}
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>
        </div>

        {/* Right Sidebar */}
        <div className="lg:col-span-1 space-y-6">
          {/* Recent Inquiries */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Recent Inquiries</CardTitle>
              <CardDescription>Students asking about your programs</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {recentInquiries.map((inquiry) => (
                <div key={inquiry.id} className="border rounded-lg p-3 bg-blue-50">
                  <div className="flex items-start justify-between mb-2">
                    <div className="flex items-center space-x-2">
                      <Avatar className="h-8 w-8">
                        <AvatarFallback className="bg-blue-100 text-blue-600 text-xs">
                          {inquiry.student.split(' ').map(n => n[0]).join('')}
                        </AvatarFallback>
                      </Avatar>
                      <div>
                        <p className="text-sm font-medium text-gray-900">{inquiry.student}</p>
                        <p className="text-xs text-gray-600">{inquiry.program}</p>
                      </div>
                    </div>
                    <span className="text-xs text-gray-500">{inquiry.time}</span>
                  </div>
                  <p className="text-sm text-gray-700 mb-3">{inquiry.message}</p>
                  <div className="flex gap-2">
                    <Button 
                      size="sm" 
                      variant="outline" 
                      className="flex-1"
                      onClick={() => handleReplyToInquiry(inquiry.id, inquiry.student)}
                    >
                      <Send className="h-3 w-3 mr-1" />
                      Reply
                    </Button>
                    <Button 
                      size="sm" 
                      variant="ghost"
                      onClick={() => handleStartChat(inquiry.student, 'student')}
                    >
                      Chat
                    </Button>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>

          {/* Performance Overview */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg flex items-center gap-2">
                <BarChart3 className="h-5 w-5 text-orange-600" />
                This Month
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-600">Program Views</span>
                <div className="flex items-center">
                  <span className="font-semibold text-orange-600">2,130</span>
                  <TrendingUp className="h-4 w-4 ml-1 text-green-500" />
                </div>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-600">Applications</span>
                <div className="flex items-center">
                  <span className="font-semibold text-orange-600">77</span>
                  <TrendingUp className="h-4 w-4 ml-1 text-green-500" />
                </div>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-600">Inquiries</span>
                <span className="font-semibold text-orange-600">23</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-600">Profile Views</span>
                <span className="font-semibold text-orange-600">456</span>
              </div>
            </CardContent>
          </Card>

          {/* Upgrade Features */}
          <Card className="border-dashed border-2 border-orange-300 bg-orange-50">
            <CardHeader>
              <CardTitle className="text-lg text-orange-700">Premium Features</CardTitle>
              <CardDescription>Boost your visibility</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <div className="flex items-center gap-2">
                  <Star className="h-4 w-4 text-orange-600" />
                  <span className="text-sm">Featured program placement</span>
                </div>
                <div className="flex items-center gap-2">
                  <BarChart3 className="h-4 w-4 text-orange-600" />
                  <span className="text-sm">Advanced analytics</span>
                </div>
                <div className="flex items-center gap-2">
                  <Users className="h-4 w-4 text-orange-600" />
                  <span className="text-sm">Alumni network tools</span>
                </div>
                <div className="flex items-center gap-2">
                  <DollarSign className="h-4 w-4 text-orange-600" />
                  <span className="text-sm">Priority support</span>
                </div>
                <Button className="w-full mt-3 bg-orange-600 hover:bg-orange-700">
                  Upgrade Now
                </Button>
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
        userRole="university"
      />
    </div>
  );
};

export default UniversityDashboard;
