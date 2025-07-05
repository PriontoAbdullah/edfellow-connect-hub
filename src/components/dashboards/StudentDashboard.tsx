
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
  Award,
  Globe,
  TrendingUp,
  Clock,
  CheckCircle,
  ArrowRight,
  Heart,
  Target,
  Briefcase,
  Search
} from 'lucide-react';

const StudentDashboard = () => {
  const { toast } = useToast();

  const upcomingEvents = [
    { id: 1, title: 'CS Study Group', time: 'Today 3:00 PM', type: 'peer-group' },
    { id: 2, title: 'Mentorship Session with Dr. Smith', time: 'Tomorrow 2:00 PM', type: 'mentorship' },
    { id: 3, title: 'Career Workshop: Tech Industry', time: 'Dec 30 4:00 PM', type: 'workshop' }
  ];

  const recentActivity = [
    { id: 1, action: 'Joined Global CS Peer Group', time: '2 hours ago', icon: Users },
    { id: 2, action: 'New message from mentor', time: '5 hours ago', icon: MessageSquare },
    { id: 3, action: 'Scholarship application submitted', time: '1 day ago', icon: Star }
  ];

  const peerGroups = [
    { id: 1, name: 'Computer Science Global', members: 234, country: 'Worldwide', active: true },
    { id: 2, name: 'AI & Machine Learning', members: 156, country: 'USA', active: true },
    { id: 3, name: 'Data Science Hub', members: 89, country: 'Europe', active: false }
  ];

  const mentors = [
    { id: 1, name: 'Dr. Sarah Johnson', field: 'Computer Science', rating: 4.9, sessions: 45 },
    { id: 2, name: 'Prof. Michael Chen', field: 'Data Science', rating: 4.8, sessions: 32 },
    { id: 3, name: 'Dr. Emily Rodriguez', field: 'AI Research', rating: 4.9, sessions: 28 }
  ];

  return (
    <div className="p-6 space-y-6">
      {/* Welcome Section */}
      <div className="grid lg:grid-cols-3 gap-6">
        <Card className="lg:col-span-2 bg-gradient-to-r from-blue-500 to-blue-600 text-white">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Globe className="h-6 w-6" />
              Your Global Learning Journey
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
                <div className="text-sm text-blue-100">Peer Groups</div>
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
                Book Mentor
              </Button>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-lg flex items-center gap-2">
              <Calendar className="h-5 w-5 text-blue-600" />
              Upcoming Events
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            {upcomingEvents.map((event) => (
              <div key={event.id} className="flex items-center justify-between p-3 bg-blue-50 rounded-lg">
                <div>
                  <p className="font-medium text-sm text-gray-900">{event.title}</p>
                  <p className="text-xs text-blue-600">{event.time}</p>
                </div>
                <Badge variant="outline" className="text-xs">
                  {event.type}
                </Badge>
              </div>
            ))}
            <Button size="sm" className="w-full bg-blue-600 hover:bg-blue-700">
              <Plus className="h-4 w-4 mr-1" />
              View All Events
            </Button>
          </CardContent>
        </Card>
      </div>

      {/* Main Content Grid */}
      <div className="grid lg:grid-cols-2 gap-6">
        {/* Peer Groups */}
        <Card>
          <CardHeader>
            <div className="flex justify-between items-center">
              <CardTitle className="text-lg flex items-center gap-2">
                <Users className="h-5 w-5 text-green-600" />
                Field-Based Peer Groups
              </CardTitle>
              <Button size="sm" className="bg-green-600 hover:bg-green-700">
                <Plus className="h-4 w-4 mr-1" />
                Join Group
              </Button>
            </div>
          </CardHeader>
          <CardContent className="space-y-4">
            {peerGroups.map((group) => (
              <div key={group.id} className="border rounded-lg p-4">
                <div className="flex items-center justify-between mb-2">
                  <div>
                    <h4 className="font-medium text-gray-900">{group.name}</h4>
                    <p className="text-sm text-gray-600">{group.members} members • {group.country}</p>
                  </div>
                  <Badge variant={group.active ? 'default' : 'secondary'} className={
                    group.active ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-700'
                  }>
                    {group.active ? 'Active' : 'Inactive'}
                  </Badge>
                </div>
                <div className="flex gap-2">
                  <Button size="sm" variant="outline" className="flex-1">
                    <MessageSquare className="h-4 w-4 mr-1" />
                    Chat
                  </Button>
                  <Button size="sm" className="flex-1 bg-blue-600 hover:bg-blue-700">
                    <ArrowRight className="h-4 w-4 mr-1" />
                    Enter Group
                  </Button>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>

        {/* Mentor Marketplace */}
        <Card>
          <CardHeader>
            <div className="flex justify-between items-center">
              <CardTitle className="text-lg flex items-center gap-2">
                <Heart className="h-5 w-5 text-red-600" />
                Mentor Marketplace
              </CardTitle>
              <Button size="sm" className="bg-red-600 hover:bg-red-700">
                <Search className="h-4 w-4 mr-1" />
                Find More
              </Button>
            </div>
          </CardHeader>
          <CardContent className="space-y-4">
            {mentors.map((mentor) => (
              <div key={mentor.id} className="border rounded-lg p-4 hover:shadow-md transition-shadow">
                <div className="flex items-start justify-between mb-2">
                  <div className="flex items-center space-x-3">
                    <Avatar className="h-10 w-10">
                      <AvatarFallback className="bg-blue-100 text-blue-600">
                        {mentor.name.split(' ').map(n => n[0]).join('')}
                      </AvatarFallback>
                    </Avatar>
                    <div>
                      <p className="font-medium text-gray-900">{mentor.name}</p>
                      <p className="text-sm text-gray-600">{mentor.field}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="flex items-center gap-1">
                      <Star className="h-4 w-4 text-yellow-500" />
                      <span className="text-sm font-medium">{mentor.rating}</span>
                    </div>
                    <p className="text-xs text-gray-500">{mentor.sessions} sessions</p>
                  </div>
                </div>
                <div className="flex gap-2">
                  <Button size="sm" variant="outline" className="flex-1">
                    <MessageSquare className="h-4 w-4 mr-1" />
                    Message
                  </Button>
                  <Button size="sm" className="flex-1 bg-red-600 hover:bg-red-700">
                    <Calendar className="h-4 w-4 mr-1" />
                    Book Session
                  </Button>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>
      </div>

      {/* Bottom Row */}
      <div className="grid lg:grid-cols-3 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="text-lg flex items-center gap-2">
              <Briefcase className="h-5 w-5 text-purple-600" />
              Career Exploration
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              <div className="p-3 bg-purple-50 rounded-lg">
                <p className="font-medium text-sm">Tech Industry Insights</p>
                <p className="text-xs text-purple-600">Skills, Market Trends & Opportunities</p>
              </div>
              <div className="p-3 bg-purple-50 rounded-lg">
                <p className="font-medium text-sm">Career Path Simulator</p>
                <p className="text-xs text-purple-600">Visualize your future career trajectory</p>
              </div>
              <Button size="sm" className="w-full bg-purple-600 hover:bg-purple-700">
                <Target className="h-4 w-4 mr-1" />
                Explore Careers
              </Button>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-lg flex items-center gap-2">
              <Award className="h-5 w-5 text-orange-600" />
              Digital Portfolio
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              <div className="flex justify-between">
                <span className="text-sm text-gray-600">Profile Completion</span>
                <span className="text-sm font-medium text-orange-600">75%</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div className="bg-orange-600 h-2 rounded-full" style={{ width: '75%' }}></div>
              </div>
              <div className="space-y-2">
                <div className="flex items-center gap-2 text-sm">
                  <CheckCircle className="h-4 w-4 text-green-500" />
                  <span>Academic Projects Added</span>
                </div>
                <div className="flex items-center gap-2 text-sm text-gray-500">
                  <Clock className="h-4 w-4" />
                  <span>Skills Assessment Pending</span>
                </div>
              </div>
              <Button size="sm" className="w-full bg-orange-600 hover:bg-orange-700">
                <Award className="h-4 w-4 mr-1" />
                Build Portfolio
              </Button>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-lg flex items-center gap-2">
              <TrendingUp className="h-5 w-5 text-green-600" />
              Recent Activity
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            {recentActivity.map((activity) => (
              <div key={activity.id} className="flex items-center space-x-3">
                <div className="p-2 bg-green-100 rounded-lg">
                  <activity.icon className="h-4 w-4 text-green-600" />
                </div>
                <div className="flex-1">
                  <p className="text-sm font-medium text-gray-900">{activity.action}</p>
                  <p className="text-xs text-gray-500">{activity.time}</p>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default StudentDashboard;
