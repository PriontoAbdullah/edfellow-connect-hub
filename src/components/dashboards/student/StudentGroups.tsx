
import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Input } from "@/components/ui/input";
import { Breadcrumb } from "../../dashboard/Breadcrumb";
import { Users, Search, Plus, MessageSquare, Clock, Star, Globe } from 'lucide-react';

const StudentGroups = () => {
  const [searchTerm, setSearchTerm] = useState('');

  const myGroups = [
    { 
      id: 1, 
      name: 'Computer Science Global', 
      members: 234, 
      newPosts: 5, 
      lastActivity: '2h ago',
      description: 'Connect with CS students worldwide',
      category: 'Technology'
    },
    { 
      id: 2, 
      name: 'AI & Machine Learning', 
      members: 156, 
      newPosts: 2, 
      lastActivity: '1d ago',
      description: 'Deep learning, neural networks, and AI research',
      category: 'Technology'
    },
    { 
      id: 3, 
      name: 'Data Science Hub', 
      members: 89, 
      newPosts: 0, 
      lastActivity: '3d ago',
      description: 'Statistics, analytics, and data visualization',
      category: 'Mathematics'
    }
  ];

  const suggestedGroups = [
    { 
      id: 4, 
      name: 'Web Development Community', 
      members: 512, 
      description: 'Frontend, backend, and full-stack development',
      category: 'Technology',
      rating: 4.8
    },
    { 
      id: 5, 
      name: 'Cybersecurity Network', 
      members: 298, 
      description: 'Information security and ethical hacking',
      category: 'Technology',
      rating: 4.9
    },
    { 
      id: 6, 
      name: 'Business Analytics', 
      members: 187, 
      description: 'Business intelligence and market analysis',
      category: 'Business',
      rating: 4.7
    }
  ];

  return (
    <div className="p-6 space-y-6">
      <Breadcrumb items={[{ label: "Dashboard", href: "/dashboard" }, { label: "My Groups" }]} />
      
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">My Groups</h1>
          <p className="text-gray-600">Connect with students and professors in your field</p>
        </div>
        <Button className="bg-blue-600 hover:bg-blue-700">
          <Plus className="h-4 w-4 mr-2" />
          Create Group
        </Button>
      </div>

      {/* Search */}
      <Card>
        <CardContent className="p-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
            <Input 
              placeholder="Search groups..." 
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>
        </CardContent>
      </Card>

      {/* My Groups */}
      <div>
        <h2 className="text-xl font-semibold text-gray-900 mb-4">My Groups ({myGroups.length})</h2>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {myGroups.map((group) => (
            <Card key={group.id} className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <Badge variant="outline" className="text-xs">{group.category}</Badge>
                  {group.newPosts > 0 && (
                    <Badge className="bg-red-100 text-red-700">
                      {group.newPosts} new
                    </Badge>
                  )}
                </div>
                <CardTitle className="text-lg">{group.name}</CardTitle>
                <CardDescription>{group.description}</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center text-sm text-gray-600">
                  <Users className="h-4 w-4 mr-1" />
                  {group.members} members
                  <Clock className="h-4 w-4 ml-4 mr-1" />
                  {group.lastActivity}
                </div>
                <div className="flex gap-2">
                  <Button size="sm" className="flex-1 bg-blue-600 hover:bg-blue-700">
                    <MessageSquare className="h-4 w-4 mr-1" />
                    View Posts
                  </Button>
                  <Button size="sm" variant="outline" className="flex-1">
                    Settings
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      {/* Suggested Groups */}
      <div>
        <h2 className="text-xl font-semibold text-gray-900 mb-4">Suggested for You</h2>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {suggestedGroups.map((group) => (
            <Card key={group.id} className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <Badge variant="outline" className="text-xs">{group.category}</Badge>
                  <div className="flex items-center text-sm">
                    <Star className="h-4 w-4 text-yellow-500 mr-1" />
                    {group.rating}
                  </div>
                </div>
                <CardTitle className="text-lg">{group.name}</CardTitle>
                <CardDescription>{group.description}</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center text-sm text-gray-600">
                  <Users className="h-4 w-4 mr-1" />
                  {group.members} members
                  <Globe className="h-4 w-4 ml-4 mr-1" />
                  Global
                </div>
                <Button size="sm" className="w-full bg-blue-600 hover:bg-blue-700">
                  <Plus className="h-4 w-4 mr-1" />
                  Join Group
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
};

export default StudentGroups;
