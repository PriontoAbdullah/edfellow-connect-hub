
import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { 
  User, 
  MessageSquare, 
  Users, 
  Search, 
  Bell,
  GraduationCap,
  Building2
} from 'lucide-react';

const Dashboard = () => {
  // Mock user data - in real app this would come from authentication
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
    { id: 1, name: 'Computer Science', members: 3200, unread: 5 },
    { id: 2, name: 'AI & Machine Learning', members: 1850, unread: 2 },
    { id: 3, name: 'Data Science', members: 2100, unread: 0 }
  ];

  const getRoleColor = (role: string) => {
    switch (role) {
      case 'student': return 'text-blue-600 bg-blue-50';
      case 'professor': return 'text-green-600 bg-green-50';
      case 'university': return 'text-orange-600 bg-orange-50';
      default: return 'text-gray-600 bg-gray-50';
    }
  };

  const getRoleIcon = (role: string) => {
    switch (role) {
      case 'student': return User;
      case 'professor': return GraduationCap;
      case 'university': return Building2;
      default: return User;
    }
  };

  const RoleIcon = getRoleIcon(user.role);

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-2">
              <GraduationCap className="h-8 w-8 text-blue-600" />
              <span className="text-2xl font-bold text-gray-900">Edfellow</span>
            </div>
            <div className="flex items-center space-x-4">
              <Button variant="ghost" size="icon">
                <Search className="h-5 w-5" />
              </Button>
              <Button variant="ghost" size="icon">
                <Bell className="h-5 w-5" />
              </Button>
              <Avatar className="h-8 w-8">
                <AvatarFallback>{user.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
              </Avatar>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Left Column - Profile & Stats */}
          <div className="space-y-6">
            {/* Profile Card */}
            <Card>
              <CardHeader className="text-center">
                <Avatar className="h-20 w-20 mx-auto mb-4">
                  <AvatarFallback className="text-2xl">
                    {user.name.split(' ').map(n => n[0]).join('')}
                  </AvatarFallback>
                </Avatar>
                <CardTitle className="flex items-center justify-center gap-2">
                  <RoleIcon className="h-5 w-5" />
                  {user.name}
                </CardTitle>
                <CardDescription>
                  <Badge className={getRoleColor(user.role)}>
                    {user.role.charAt(0).toUpperCase() + user.role.slice(1)}
                  </Badge>
                </CardDescription>
              </CardHeader>
              <CardContent className="text-center space-y-2">
                <p className="text-sm text-gray-600">{user.major}</p>
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
                <CardTitle className="text-lg">Quick Stats</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-gray-600">Connections</span>
                  <span className="font-semibold">47</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Groups Joined</span>
                  <span className="font-semibold">3</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Messages</span>
                  <span className="font-semibold">12</span>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Middle Column - Activity Feed */}
          <div className="space-y-6">
            {/* Welcome Message */}
            <Card className="bg-gradient-to-r from-blue-500 to-purple-600 text-white">
              <CardHeader>
                <CardTitle>Welcome back, {user.name.split(' ')[0]}!</CardTitle>
                <CardDescription className="text-blue-100">
                  You have 3 new messages and 2 group updates waiting.
                </CardDescription>
              </CardHeader>
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
                      <AvatarFallback>
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

            {/* Active Groups */}
            <Card>
              <CardHeader>
                <div className="flex justify-between items-center">
                  <CardTitle className="text-lg">Your Groups</CardTitle>
                  <Button variant="ghost" size="sm">Browse All</Button>
                </div>
              </CardHeader>
              <CardContent className="space-y-3">
                {activeGroups.map((group) => (
                  <div key={group.id} className="flex items-center justify-between p-3 hover:bg-gray-50 rounded-lg cursor-pointer">
                    <div className="flex items-center space-x-3">
                      <div className="h-10 w-10 bg-purple-100 rounded-lg flex items-center justify-center">
                        <Users className="h-5 w-5 text-purple-600" />
                      </div>
                      <div>
                        <p className="font-medium text-gray-900">{group.name}</p>
                        <p className="text-sm text-gray-600">{group.members.toLocaleString()} members</p>
                      </div>
                    </div>
                    {group.unread > 0 && (
                      <Badge variant="secondary" className="bg-red-100 text-red-700">
                        {group.unread}
                      </Badge>
                    )}
                  </div>
                ))}
              </CardContent>
            </Card>
          </div>

          {/* Right Column - Suggestions */}
          <div className="space-y-6">
            {/* Suggested Connections */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Suggested Connections</CardTitle>
                <CardDescription>People you might know</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {suggestedConnections.map((person) => (
                  <div key={person.id} className="flex items-center space-x-3 p-3 border rounded-lg">
                    <Avatar className="h-10 w-10">
                      <AvatarFallback>
                        {person.name.split(' ').map(n => n[0]).join('')}
                      </AvatarFallback>
                    </Avatar>
                    <div className="flex-1 min-w-0">
                      <p className="font-medium text-gray-900">{person.name}</p>
                      <p className="text-sm text-gray-600">{person.role} • {person.field}</p>
                      <p className="text-xs text-gray-500">{person.university}</p>
                    </div>
                    <Button size="sm" variant="outline">
                      Connect
                    </Button>
                  </div>
                ))}
              </CardContent>
            </Card>

            {/* Quick Actions */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Quick Actions</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <Button className="w-full justify-start" variant="outline">
                  <MessageSquare className="h-4 w-4 mr-2" />
                  Start New Conversation
                </Button>
                <Button className="w-full justify-start" variant="outline">
                  <Users className="h-4 w-4 mr-2" />
                  Join New Groups
                </Button>
                <Button className="w-full justify-start" variant="outline">
                  <Search className="h-4 w-4 mr-2" />
                  Search Universities
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
