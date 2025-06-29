
import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Input } from "@/components/ui/input";
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
  Plus
} from 'lucide-react';

const StudentDashboard = () => {
  const [user] = useState({
    name: 'John Doe',
    role: 'student',
    major: 'Computer Science',
    country: 'United States',
    bio: 'Passionate about AI and machine learning'
  });

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

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="grid lg:grid-cols-4 gap-8">
        {/* Left Sidebar - Profile & Quick Stats */}
        <div className="lg:col-span-1 space-y-6">
          {/* Profile Card */}
          <Card>
            <CardHeader className="text-center">
              <Avatar className="h-20 w-20 mx-auto mb-4">
                <AvatarFallback className="text-2xl bg-blue-100 text-blue-600">
                  {user.name.split(' ').map(n => n[0]).join('')}
                </AvatarFallback>
              </Avatar>
              <CardTitle className="flex items-center justify-center gap-2">
                <User className="h-5 w-5 text-blue-600" />
                {user.name}
              </CardTitle>
              <CardDescription>
                <Badge className="bg-blue-100 text-blue-700">
                  Student
                </Badge>
              </CardDescription>
            </CardHeader>
            <CardContent className="text-center space-y-2">
              <p className="text-sm font-medium text-gray-900">{user.major}</p>
              <p className="text-sm text-gray-600">{user.country}</p>
              <p className="text-sm text-gray-700">{user.bio}</p>
              <Button variant="outline" className="w-full mt-4">
                Edit Profile
              </Button>
            </CardContent>
          </Card>

          {/* Quick Stats */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Your Stats</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="flex justify-between">
                <span className="text-gray-600">Connections</span>
                <span className="font-semibold text-blue-600">47</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Groups Joined</span>
                <span className="font-semibold text-blue-600">3</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Messages</span>
                <span className="font-semibold text-blue-600">12</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Programs Saved</span>
                <span className="font-semibold text-blue-600">8</span>
              </div>
            </CardContent>
          </Card>

          {/* Search Users */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Find Peers</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <Input placeholder="Search by name or field..." />
                <div className="flex gap-2">
                  <Button variant="outline" size="sm" className="flex-1">
                    Students
                  </Button>
                  <Button variant="outline" size="sm" className="flex-1">
                    Professors
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Center Content - Main Feed */}
        <div className="lg:col-span-2 space-y-6">
          {/* Welcome Message */}
          <Card className="bg-gradient-to-r from-blue-500 to-purple-600 text-white">
            <CardHeader>
              <CardTitle>Welcome back, {user.name.split(' ')[0]}!</CardTitle>
              <CardDescription className="text-blue-100">
                You have 3 new messages and 2 group updates waiting.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex gap-3">
                <Button variant="secondary" size="sm" className="bg-white/20 hover:bg-white/30 text-white border-white/30">
                  View Messages
                </Button>
                <Button variant="outline" size="sm" className="border-white/30 text-white hover:bg-white/10">
                  Join New Group
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Active Groups */}
          <Card>
            <CardHeader>
              <div className="flex justify-between items-center">
                <CardTitle className="text-lg">Your Academic Groups</CardTitle>
                <Button variant="ghost" size="sm">
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
                    {group.unread > 0 && (
                      <Badge variant="secondary" className="bg-red-100 text-red-700">
                        {group.unread}
                      </Badge>
                    )}
                    <Button variant="outline" size="sm">
                      View
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
                <Button variant="ghost" size="sm">View All</Button>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              {recentMessages.map((message) => (
                <div key={message.id} className="flex items-start space-x-3 p-3 hover:bg-gray-50 rounded-lg cursor-pointer">
                  <Avatar className="h-10 w-10">
                    <AvatarFallback className="bg-green-100 text-green-600">
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

        {/* Right Sidebar - Suggestions & Programs */}
        <div className="lg:col-span-1 space-y-6">
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
                  <Button size="sm" className="w-full mt-2">
                    Learn More
                  </Button>
                </div>
              ))}
            </CardContent>
          </Card>

          {/* Available Mentors */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Available Mentors</CardTitle>
              <CardDescription>Connect with professors for guidance</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {mentors.map((mentor) => (
                <div key={mentor.id} className="border rounded-lg p-3">
                  <div className="flex items-center space-x-3 mb-2">
                    <Avatar className="h-8 w-8">
                      <AvatarFallback className="bg-green-100 text-green-600 text-xs">
                        {mentor.name.split(' ').map(n => n[0]).join('')}
                      </AvatarFallback>
                    </Avatar>
                    <div className="flex-1 min-w-0">
                      <p className="font-medium text-sm text-gray-900">{mentor.name}</p>
                      <p className="text-xs text-gray-600">{mentor.field}</p>
                    </div>
                  </div>
                  <div className="flex items-center justify-between text-xs text-gray-600 mb-2">
                    <span>{mentor.university}</span>
                    <div className="flex items-center">
                      <Star className="h-3 w-3 text-yellow-500 mr-1" />
                      {mentor.rating}
                    </div>
                  </div>
                  <Button size="sm" variant="outline" className="w-full">
                    Connect
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
    </div>
  );
};

export default StudentDashboard;
