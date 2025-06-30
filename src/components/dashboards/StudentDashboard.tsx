import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";
import { 
  User, 
  MessageSquare, 
  Users, 
  Search, 
  GraduationCap,
  Building2,
  Star,
  MapPin,
  Calendar,
  Plus,
  Globe,
  Award,
  BookOpen,
  Briefcase,
  Camera,
  DollarSign,
  Video,
  Languages,
  Target
} from 'lucide-react';
import ChatModal from '../modals/ChatModal';
import NotificationsModal from '../modals/NotificationsModal';
import ProfileModal from '../modals/ProfileModal';
import GroupJoinModal from '../modals/GroupJoinModal';
import MentorshipModal from '../modals/MentorshipModal';

const StudentDashboard = () => {
  const { toast } = useToast();
  const [chatModal, setChatModal] = useState({ isOpen: false, recipientName: '', recipientRole: '' });
  const [notificationsOpen, setNotificationsOpen] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);
  const [groupJoinOpen, setGroupJoinOpen] = useState(false);
  const [mentorshipModal, setMentorshipModal] = useState({ 
    isOpen: false, 
    mentorName: '', 
    mentorField: '', 
    mentorUniversity: '',
    mentorRating: 0
  });

  const [user] = useState({
    name: 'John Doe',
    role: 'student',
    major: 'Computer Science',
    country: 'United States',
    bio: 'Passionate about AI and machine learning',
    verified: true,
    globalRating: 4.7
  });

  // Enhanced features data
  const globalPeerGroups = [
    { id: 1, name: 'AI & Machine Learning Global', members: 3200, countries: 47, unread: 5, icon: '🤖', featured: true },
    { id: 2, name: 'Data Science Worldwide', members: 1850, countries: 32, unread: 2, icon: '📊', featured: false },
    { id: 3, name: 'Computer Science Global Hub', members: 2100, countries: 28, unread: 0, icon: '💻', featured: true }
  ];

  const mentorMarketplace = [
    { id: 1, name: 'Dr. Sarah Johnson', field: 'AI Research', university: 'MIT', rating: 4.9, sessions: 120, price: '$75/hr', languages: ['English', 'Spanish'], verified: true },
    { id: 2, name: 'Prof. Michael Brown', field: 'Software Engineering', university: 'Stanford', rating: 4.8, sessions: 85, price: '$65/hr', languages: ['English', 'German'], verified: true },
    { id: 3, name: 'Dr. Lisa Wang', field: 'Data Science', university: 'Berkeley', rating: 4.7, sessions: 95, price: '$70/hr', languages: ['English', 'Mandarin'], verified: true }
  ];

  const scholarshipOpportunities = [
    { id: 1, title: 'Global AI Research Scholarship', amount: '$15,000', deadline: 'Mar 15, 2026', country: 'Multiple', type: 'Research' },
    { id: 2, title: 'International CS Fellowship', amount: '$25,000', deadline: 'Apr 20, 2026', country: 'USA', type: 'Fellowship' },
    { id: 3, title: 'European Tech Internship', amount: '€2,000/month', deadline: 'Feb 28, 2026', country: 'Germany', type: 'Internship' }
  ];

  const careerInsights = [
    { field: 'AI Engineer', demand: 'Very High', avgSalary: '$120k', growth: '+32%', skills: ['Python', 'TensorFlow', 'PyTorch'] },
    { field: 'Data Scientist', demand: 'High', avgSalary: '$110k', growth: '+28%', skills: ['R', 'SQL', 'Machine Learning'] },
    { field: 'Software Engineer', demand: 'High', avgSalary: '$105k', growth: '+22%', skills: ['JavaScript', 'React', 'Node.js'] }
  ];

  const recentMessages = [
    { id: 1, sender: 'Dr. Sarah Wilson', message: 'Great question about neural networks...', time: '2h ago', type: 'professor' },
    { id: 2, sender: 'Mike Chen', message: 'Are you joining the study group tomorrow?', time: '4h ago', type: 'student' },
    { id: 3, sender: 'Engineering Group', message: 'New discussion: Career prospects in...', time: '1d ago', type: 'group' }
  ];

  const suggestedConnections = [
    { id: 1, name: 'Dr. Emily Rodriguez', role: 'Professor', field: 'Computer Science', university: 'MIT' },
    { id: 2, name: 'Alex Thompson', role: 'Student', field: 'Computer Science', university: 'Stanford' },
    { id: 3, name: 'Prof. David Kim', role: 'Professor', field: 'AI Research', university: 'Berkeley' }
  ];

  const activeGroups = [
    { id: 1, name: 'Computer Science', members: 3200, unread: 5, icon: '💻' },
    { id: 2, name: 'AI & Machine Learning', members: 1850, unread: 2, icon: '🤖' },
    { id: 3, name: 'Data Science', members: 2100, unread: 0, icon: '📊' }
  ];

  const trendingPrograms = [
    {
      id: 1,
      university: "MIT",
      program: "Advanced AI Certificate",
      type: "Certificate",
      deadline: "Dec 15, 2025",
      location: "Cambridge, MA",
      rating: 4.9
    },
    {
      id: 2,
      university: "Stanford",
      program: "Machine Learning Bootcamp",
      type: "Bootcamp",
      deadline: "Jan 10, 2026",
      location: "Online",
      rating: 4.8
    }
  ];

  const mentors = [
    { id: 1, name: 'Dr. Sarah Johnson', field: 'AI Research', university: 'MIT', rating: 4.9, sessions: 120 },
    { id: 2, name: 'Prof. Michael Brown', field: 'Software Engineering', university: 'Stanford', rating: 4.8, sessions: 85 },
    { id: 3, name: 'Dr. Lisa Wang', field: 'Data Science', university: 'Berkeley', rating: 4.7, sessions: 95 }
  ];

  const handleStartChat = (name: string, role: string) => {
    setChatModal({ isOpen: true, recipientName: name, recipientRole: role });
  };

  const handleConnectMentor = (mentor: any) => {
    setMentorshipModal({
      isOpen: true,
      mentorName: mentor.name,
      mentorField: mentor.field,
      mentorUniversity: mentor.university,
      mentorRating: mentor.rating
    });
  };

  const handleBookMentor = (mentorName: string) => {
    toast({
      title: "Booking Request Sent",
      description: `Your mentorship booking request has been sent to ${mentorName}. They will respond within 24 hours.`,
    });
  };

  const handleApplyScholarship = (scholarshipTitle: string) => {
    toast({
      title: "Application Started",
      description: `You've started applying for ${scholarshipTitle}. Check your dashboard for progress.`,
    });
  };

  const handleJoinGlobalGroup = (groupName: string) => {
    toast({
      title: "Joined Global Group",
      description: `Welcome to ${groupName}! You can now connect with peers worldwide.`,
    });
  };

  const handleSmartMatch = () => {
    toast({
      title: "Smart Match Activated",
      description: "Finding your ideal academic connections based on your interests and goals...",
    });
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="grid lg:grid-cols-4 gap-8">
        {/* Left Sidebar - Enhanced Profile & Global Tools */}
        <div className="lg:col-span-1 space-y-6">
          {/* Enhanced Profile Card */}
          <Card className="bg-gradient-to-br from-blue-50 to-indigo-50 border-blue-200">
            <CardHeader className="text-center">
              <div className="relative">
                <Avatar className="h-20 w-20 mx-auto mb-4">
                  <AvatarFallback className="text-2xl bg-blue-100 text-blue-600">
                    JD
                  </AvatarFallback>
                </Avatar>
                {user.verified && (
                  <Badge className="absolute top-0 right-12 bg-green-500 text-white">
                    <Award className="h-3 w-3 mr-1" />
                    Verified
                  </Badge>
                )}
              </div>
              <CardTitle className="flex items-center justify-center gap-2">
                <User className="h-5 w-5 text-blue-600" />
                {user.name}
              </CardTitle>
              <CardDescription>
                <Badge className="bg-blue-100 text-blue-700">
                  <Globe className="h-3 w-3 mr-1" />
                  Global Student
                </Badge>
              </CardDescription>
            </CardHeader>
            <CardContent className="text-center space-y-2">
              <p className="text-sm font-medium text-gray-900">{user.major}</p>
              <p className="text-sm text-gray-600 flex items-center justify-center gap-1">
                <MapPin className="h-4 w-4" />
                {user.country}
              </p>
              <div className="flex items-center justify-center gap-1 mb-2">
                <Star className="h-4 w-4 text-yellow-500" />
                <span className="text-sm font-medium">{user.globalRating} Global Rating</span>
              </div>
              <p className="text-sm text-gray-700">{user.bio}</p>
              <div className="flex gap-2 mt-4">
                <Button 
                  variant="outline" 
                  size="sm"
                  className="flex-1"
                  onClick={() => setProfileOpen(true)}
                >
                  <Camera className="h-4 w-4 mr-1" />
                  Edit
                </Button>
                <Button 
                  size="sm"
                  className="flex-1 bg-blue-600 hover:bg-blue-700"
                  onClick={handleSmartMatch}
                >
                  <Target className="h-4 w-4 mr-1" />
                  Smart Match
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Global Stats */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg flex items-center gap-2">
                <Globe className="h-5 w-5 text-blue-600" />
                Global Impact
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="flex justify-between">
                <span className="text-gray-600">Global Connections</span>
                <span className="font-semibold text-blue-600">47</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Countries Connected</span>
                <span className="font-semibold text-blue-600">12</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Languages Spoken</span>
                <span className="font-semibold text-blue-600">3</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Mentorship Hours</span>
                <span className="font-semibold text-blue-600">24</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Portfolio Views</span>
                <span className="font-semibold text-blue-600">156</span>
              </div>
            </CardContent>
          </Card>

          {/* Quick Global Actions */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Global Tools</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <Button className="w-full justify-start bg-blue-600 hover:bg-blue-700 text-sm" size="sm">
                <BookOpen className="h-4 w-4 mr-2" />
                Build Digital Portfolio
              </Button>
              <Button className="w-full justify-start" variant="outline" size="sm">
                <Video className="h-4 w-4 mr-2" />
                Schedule Video Call
              </Button>
              <Button className="w-full justify-start" variant="outline" size="sm">
                <Languages className="h-4 w-4 mr-2" />
                Language Exchange
              </Button>
              <Button className="w-full justify-start" variant="outline" size="sm">
                <Calendar className="h-4 w-4 mr-2" />
                Book Mentorship
              </Button>
            </CardContent>
          </Card>
        </div>

        {/* Center Content - Enhanced Main Feed */}
        <div className="lg:col-span-2 space-y-6">
          {/* Enhanced Welcome Message */}
          <Card className="bg-gradient-to-r from-blue-500 via-purple-600 to-indigo-600 text-white">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Globe className="h-6 w-6" />
                Welcome to Your Global Academic Journey, John!
              </CardTitle>
              <CardDescription className="text-blue-100">
                Connect with 3,200+ students worldwide • 5 new mentor matches • 2 scholarship opportunities
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex gap-3 flex-wrap">
                <Button 
                  variant="secondary" 
                  size="sm" 
                  className="bg-white/20 hover:bg-white/30 text-white border-white/30"
                  onClick={() => setNotificationsOpen(true)}
                >
                  <Target className="h-4 w-4 mr-1" />
                  View Matches
                </Button>
                <Button 
                  variant="outline" 
                  size="sm" 
                  className="border-white/30 text-white hover:bg-white/10"
                  onClick={() => setGroupJoinOpen(true)}
                >
                  <Globe className="h-4 w-4 mr-1" />
                  Join Global Groups
                </Button>
                <Button 
                  variant="outline" 
                  size="sm" 
                  className="border-white/30 text-white hover:bg-white/10"
                >
                  <Video className="h-4 w-4 mr-1" />
                  Start Video Chat
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Field-Based Global Peer Groups */}
          <Card>
            <CardHeader>
              <div className="flex justify-between items-center">
                <CardTitle className="text-lg flex items-center gap-2">
                  <Globe className="h-5 w-5 text-blue-600" />
                  Global Peer Groups
                </CardTitle>
                <Button 
                  variant="ghost" 
                  size="sm"
                  onClick={() => setGroupJoinOpen(true)}
                >
                  <Plus className="h-4 w-4 mr-1" />
                  Discover More
                </Button>
              </div>
            </CardHeader>
            <CardContent className="space-y-3">
              {globalPeerGroups.map((group) => (
                <div key={group.id} className="flex items-center justify-between p-3 hover:bg-gray-50 rounded-lg cursor-pointer border">
                  <div className="flex items-center space-x-3">
                    <div className="text-2xl">{group.icon}</div>
                    <div>
                      <div className="flex items-center gap-2">
                        <p className="font-medium text-gray-900">{group.name}</p>
                        {group.featured && (
                          <Badge className="bg-yellow-100 text-yellow-700 text-xs">
                            <Star className="h-3 w-3 mr-1" />
                            Featured
                          </Badge>
                        )}
                      </div>
                      <p className="text-sm text-gray-600">{group.members.toLocaleString()} members • {group.countries} countries</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    {group.unread > 0 && (
                      <Badge variant="secondary" className="bg-red-100 text-red-700">
                        {group.unread}
                      </Badge>
                    )}
                    <Button 
                      size="sm"
                      onClick={() => handleJoinGlobalGroup(group.name)}
                      className="bg-blue-600 hover:bg-blue-700"
                    >
                      <Globe className="h-4 w-4 mr-1" />
                      Join
                    </Button>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>

          {/* Career Exploration Center */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg flex items-center gap-2">
                <Briefcase className="h-5 w-5 text-green-600" />
                Career Exploration Center
              </CardTitle>
              <CardDescription>Discover career paths in your field globally</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {careerInsights.map((career, index) => (
                <div key={index} className="border rounded-lg p-4 hover:shadow-md transition-shadow">
                  <div className="flex justify-between items-start mb-2">
                    <div>
                      <h4 className="font-medium text-gray-900">{career.field}</h4>
                      <p className="text-sm text-gray-600">Average: {career.avgSalary} • Growth: {career.growth}</p>
                    </div>
                    <Badge variant={career.demand === 'Very High' ? 'default' : 'secondary'} 
                           className={career.demand === 'Very High' ? 'bg-green-100 text-green-700' : 'bg-blue-100 text-blue-700'}>
                      {career.demand} Demand
                    </Badge>
                  </div>
                  <div className="flex flex-wrap gap-1 mb-3">
                    {career.skills.map((skill, idx) => (
                      <Badge key={idx} variant="outline" className="text-xs">
                        {skill}
                      </Badge>
                    ))}
                  </div>
                  <Button size="sm" variant="outline" className="w-full">
                    Explore Career Path
                  </Button>
                </div>
              ))}
            </CardContent>
          </Card>

          {/* Global Scholarship & Internship Board */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg flex items-center gap-2">
                <DollarSign className="h-5 w-5 text-yellow-600" />
                Global Opportunities
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {scholarshipOpportunities.map((opportunity) => (
                <div key={opportunity.id} className="border rounded-lg p-4 bg-yellow-50 hover:shadow-md transition-shadow">
                  <div className="flex justify-between items-start mb-2">
                    <div>
                      <h4 className="font-medium text-gray-900">{opportunity.title}</h4>
                      <p className="text-sm font-semibold text-green-600">{opportunity.amount}</p>
                    </div>
                    <Badge className="bg-yellow-100 text-yellow-700">
                      {opportunity.type}
                    </Badge>
                  </div>
                  <div className="flex items-center gap-4 text-sm text-gray-600 mb-3">
                    <div className="flex items-center">
                      <MapPin className="h-4 w-4 mr-1" />
                      {opportunity.country}
                    </div>
                    <div className="flex items-center">
                      <Calendar className="h-4 w-4 mr-1" />
                      Due: {opportunity.deadline}
                    </div>
                  </div>
                  <Button 
                    size="sm" 
                    className="w-full bg-yellow-600 hover:bg-yellow-700"
                    onClick={() => handleApplyScholarship(opportunity.title)}
                  >
                    Apply Now
                  </Button>
                </div>
              ))}
            </CardContent>
          </Card>
        </div>

        {/* Right Sidebar - Enhanced Mentor Marketplace */}
        <div className="lg:col-span-1 space-y-6">
          {/* Mentor Marketplace */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg flex items-center gap-2">
                <GraduationCap className="h-5 w-5 text-green-600" />
                Mentor Marketplace
              </CardTitle>
              <CardDescription>Book verified global mentors</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {mentorMarketplace.map((mentor) => (
                <div key={mentor.id} className="border rounded-lg p-3 bg-green-50">
                  <div className="flex items-center space-x-3 mb-2">
                    <Avatar className="h-10 w-10">
                      <AvatarFallback className="bg-green-100 text-green-600 text-xs">
                        {mentor.name.split(' ').map(n => n[0]).join('')}
                      </AvatarFallback>
                    </Avatar>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2">
                        <p className="font-medium text-sm text-gray-900">{mentor.name}</p>
                        {mentor.verified && (
                          <Badge className="bg-green-500 text-white text-xs">
                            <Award className="h-3 w-3 mr-1" />
                            Verified
                          </Badge>
                        )}
                      </div>
                      <p className="text-xs text-gray-600">{mentor.field}</p>
                    </div>
                  </div>
                  <div className="flex items-center justify-between text-xs text-gray-600 mb-2">
                    <span>{mentor.university}</span>
                    <div className="flex items-center">
                      <Star className="h-3 w-3 text-yellow-500 mr-1" />
                      {mentor.rating} ({mentor.sessions})
                    </div>
                  </div>
                  <div className="flex items-center gap-1 mb-2 text-xs">
                    <Languages className="h-3 w-3 text-gray-400" />
                    {mentor.languages.join(', ')}
                  </div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm font-semibold text-green-600">{mentor.price}</span>
                    <Badge variant="outline" className="text-xs">
                      {mentor.sessions} sessions
                    </Badge>
                  </div>
                  <div className="flex gap-2">
                    <Button 
                      size="sm" 
                      variant="outline" 
                      className="flex-1"
                      onClick={() => handleStartChat(mentor.name, 'professor')}
                    >
                      <MessageSquare className="h-3 w-3 mr-1" />
                      Chat
                    </Button>
                    <Button 
                      size="sm" 
                      className="flex-1 bg-green-600 hover:bg-green-700"
                      onClick={() => handleBookMentor(mentor.name)}
                    >
                      <Calendar className="h-3 w-3 mr-1" />
                      Book
                    </Button>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>

          {/* Trending Programs */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg flex items-center gap-2">
                <Star className="h-5 w-5 text-orange-500" />
                Trending Programs
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {trendingPrograms.map((program) => (
                <div key={program.id} className="border rounded-lg p-3 hover:shadow-md transition-shadow">
                  <div className="flex items-start justify-between mb-2">
                    <Building2 className="h-6 w-6 text-orange-600 mt-1" />
                    <Badge variant="secondary">{program.type}</Badge>
                  </div>
                  <h4 className="font-medium text-gray-900 mb-1">{program.program}</h4>
                  <p className="text-sm font-medium text-orange-600 mb-2">{program.university}</p>
                  <div className="space-y-1 text-xs text-gray-600">
                    <div className="flex items-center">
                      <MapPin className="h-3 w-3 mr-1" />
                      {program.location}
                    </div>
                    <div className="flex items-center">
                      <Calendar className="h-3 w-3 mr-1" />
                      {program.deadline}
                    </div>
                  </div>
                  <Button 
                    size="sm" 
                    className="w-full mt-2"
                  >
                    Learn More
                  </Button>
                </div>
              ))}
            </CardContent>
          </Card>

          {/* Suggested Connections */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Suggested Connections</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              {suggestedConnections.slice(0, 2).map((person) => (
                <div key={person.id} className="flex items-center space-x-3 p-2 border rounded-lg">
                  <Avatar className="h-8 w-8">
                    <AvatarFallback className="text-xs">
                      {person.name.split(' ').map(n => n[0]).join('')}
                    </AvatarFallback>
                  </Avatar>
                  <div className="flex-1 min-w-0">
                    <p className="font-medium text-sm text-gray-900">{person.name}</p>
                    <p className="text-xs text-gray-600">{person.role} • {person.field}</p>
                  </div>
                  <Button size="sm" variant="outline">
                    Connect
                  </Button>
                </div>
              ))}
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Enhanced Modals */}
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
        userRole="student"
      />

      <GroupJoinModal
        isOpen={groupJoinOpen}
        onClose={() => setGroupJoinOpen(false)}
      />

      <MentorshipModal
        isOpen={mentorshipModal.isOpen}
        onClose={() => setMentorshipModal({ isOpen: false, mentorName: '', mentorField: '', mentorUniversity: '', mentorRating: 0 })}
        mentorName={mentorshipModal.mentorName}
        mentorField={mentorshipModal.mentorField}
        mentorUniversity={mentorshipModal.mentorUniversity}
        mentorRating={mentorshipModal.mentorRating}
      />
    </div>
  );
};

export default StudentDashboard;
