
import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { useToast } from "@/hooks/use-toast";
import { Breadcrumb } from "../dashboard/Breadcrumb";
import { 
  Users, 
  MessageSquare, 
  BookOpen, 
  Star,
  Plus,
  Calendar,
  Award,
  Globe,
  TrendingUp,
  Clock,
  CheckCircle,
  ArrowRight,
  Heart,
  Target,
  Briefcase,
  Search,
  Play
} from 'lucide-react';

const StudentDashboard = () => {
  const { toast } = useToast();

  const upcomingEvents = [
    { id: 1, title: 'CS Study Group', time: 'Today 3:00 PM', type: 'peer-group' },
    { id: 2, title: 'Mentorship Session with Dr. Smith', time: 'Tomorrow 2:00 PM', type: 'mentorship' },
    { id: 3, title: 'Career Workshop: Tech Industry', time: 'Dec 30 4:00 PM', type: 'workshop' }
  ];

  const myGroups = [
    { id: 1, name: 'Computer Science Global', members: 234, newPosts: 5, active: true },
    { id: 2, name: 'AI & Machine Learning', members: 156, newPosts: 2, active: true },
    { id: 3, name: 'Data Science Hub', members: 89, newPosts: 0, active: false }
  ];

  const recentMessages = [
    { id: 1, sender: 'Dr. Sarah Johnson', message: 'Great progress on your research...', time: '2h ago', unread: true },
    { id: 2, sender: 'CS Study Group', message: 'New discussion about algorithms...', time: '5h ago', unread: false },
    { id: 3, sender: 'Maria Chen', message: 'Thanks for the study notes!', time: '1d ago', unread: false }
  ];

  const trendingPrograms = [
    { id: 1, name: 'AI & Machine Learning Masters', university: 'Stanford University', rating: 4.9, applications: 1250 },
    { id: 2, name: 'Data Science Certificate', university: 'MIT', rating: 4.8, applications: 890 },
    { id: 3, name: 'Computer Vision PhD', university: 'Carnegie Mellon', rating: 4.9, applications: 340 }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50/30 via-white to-blue-100/20">
      <div className="p-6 space-y-6">
        <Breadcrumb items={[{ label: "Dashboard" }]} />
        
        {/* Welcome Section */}
        <Card className="bg-gradient-to-r from-blue-500 to-blue-600 text-white">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Globe className="h-6 w-6" />
              Welcome to Your Global Learning Journey
            </CardTitle>
            <CardDescription className="text-blue-100">
              Connect with peers worldwide and accelerate your academic growth
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-3 gap-4 mb-6">
              <div className="text-center">
                <div className="text-2xl font-bold">12</div>
                <div className="text-sm text-blue-100">Active Connections</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold">3</div>
                <div className="text-sm text-blue-100">Joined Groups</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold">8</div>
                <div className="text-sm text-blue-100">Mentor Sessions</div>
              </div>
            </div>
            <div className="flex gap-3">
              <Button variant="secondary" size="sm" className="bg-white/20 hover:bg-white/30 text-white border-white/30">
                <Search className="h-4 w-4 mr-1" />
                Find Peers
              </Button>
              <Button variant="outline" size="sm" className="border-white/30 text-white hover:bg-white/10">
                <Heart className="h-4 w-4 mr-1" />
                Find Mentor
              </Button>
            </div>
          </CardContent>
        </Card>

        <div className="grid lg:grid-cols-3 gap-6">
          {/* My Groups */}
          <Card>
            <CardHeader>
              <div className="flex justify-between items-center">
                <CardTitle className="text-lg flex items-center gap-2">
                  <Users className="h-5 w-5 text-blue-600" />
                  My Groups
                </CardTitle>
                <Button size="sm" className="bg-blue-600 hover:bg-blue-700">
                  <Plus className="h-4 w-4 mr-1" />
                  Join
                </Button>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              {myGroups.map((group) => (
                <div key={group.id} className="border rounded-lg p-4 hover:shadow-md transition-shadow">
                  <div className="flex items-center justify-between mb-2">
                    <h4 className="font-medium text-gray-900">{group.name}</h4>
                    {group.newPosts > 0 && (
                      <Badge className="bg-red-100 text-red-700">
                        {group.newPosts} new
                      </Badge>
                    )}
                  </div>
                  <p className="text-sm text-gray-600 mb-3">{group.members} members</p>
                  <Button size="sm" className="w-full bg-blue-600 hover:bg-blue-700">
                    <ArrowRight className="h-4 w-4 mr-1" />
                    Enter Group
                  </Button>
                </div>
              ))}
            </CardContent>
          </Card>

          {/* Recent Messages */}
          <Card>
            <CardHeader>
              <div className="flex justify-between items-center">
                <CardTitle className="text-lg flex items-center gap-2">
                  <MessageSquare className="h-5 w-5 text-green-600" />
                  Recent Messages
                </CardTitle>
                <Button size="sm" variant="outline">
                  View All
                </Button>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              {recentMessages.map((message) => (
                <div key={message.id} className="flex items-start space-x-3 p-3 rounded-lg hover:bg-gray-50">
                  <Avatar className="h-8 w-8">
                    <AvatarFallback className="bg-blue-100 text-blue-600">
                      {message.sender.split(' ').map(n => n[0]).join('')}
                    </AvatarFallback>
                  </Avatar>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between">
                      <p className="text-sm font-medium text-gray-900">{message.sender}</p>
                      <span className="text-xs text-gray-500">{message.time}</span>
                    </div>
                    <p className="text-sm text-gray-600 truncate">{message.message}</p>
                    {message.unread && (
                      <div className="w-2 h-2 bg-blue-500 rounded-full mt-1"></div>
                    )}
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>

          {/* Upcoming Events */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg flex items-center gap-2">
                <Calendar className="h-5 w-5 text-purple-600" />
                Upcoming Events
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              {upcomingEvents.map((event) => (
                <div key={event.id} className="flex items-center justify-between p-3 bg-purple-50 rounded-lg">
                  <div>
                    <p className="font-medium text-sm text-gray-900">{event.title}</p>
                    <p className="text-xs text-purple-600">{event.time}</p>
                  </div>
                  <Badge variant="outline" className="text-xs">
                    {event.type}
                  </Badge>
                </div>
              ))}
              <Button size="sm" className="w-full bg-purple-600 hover:bg-purple-700">
                <Plus className="h-4 w-4 mr-1" />
                View Calendar
              </Button>
            </CardContent>
          </Card>
        </div>

        {/* Trending Programs */}
        <Card>
          <CardHeader>
            <CardTitle className="text-lg flex items-center gap-2">
              <TrendingUp className="h-5 w-5 text-orange-600" />
              Trending Programs
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-3 gap-6">
              {trendingPrograms.map((program) => (
                <div key={program.id} className="border rounded-lg p-4 hover:shadow-md transition-shadow">
                  <div className="flex items-center justify-between mb-2">
                    <Badge className="bg-orange-100 text-orange-700">Popular</Badge>
                    <div className="flex items-center">
                      <Star className="h-4 w-4 text-yellow-500 mr-1" />
                      <span className="text-sm font-medium">{program.rating}</span>
                    </div>
                  </div>
                  <h4 className="font-medium text-gray-900 mb-1">{program.name}</h4>
                  <p className="text-sm text-gray-600 mb-3">{program.university}</p>
                  <p className="text-xs text-gray-500 mb-3">{program.applications} applications</p>
                  <Button size="sm" className="w-full bg-orange-600 hover:bg-orange-700">
                    <Play className="h-4 w-4 mr-1" />
                    Learn More
                  </Button>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default StudentDashboard;
