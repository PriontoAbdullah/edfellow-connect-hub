
import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Input } from "@/components/ui/input";
import { Breadcrumb } from "../../dashboard/Breadcrumb";
import { Users, Search, Plus, MessageSquare, Settings, Crown, Star } from 'lucide-react';

const ProfessorGroups = () => {
  const [searchTerm, setSearchTerm] = useState('');

  const myGroups = [
    { 
      id: 1, 
      name: 'Computer Science Faculty', 
      members: 45, 
      newPosts: 3, 
      role: 'moderator',
      description: 'Discussion forum for CS faculty members worldwide',
      category: 'Faculty',
      activity: 'Very Active'
    },
    { 
      id: 2, 
      name: 'AI Research Network', 
      members: 128, 
      newPosts: 7, 
      role: 'member',
      description: 'Collaborative space for AI researchers and academics',
      category: 'Research',
      activity: 'Active'
    },
    { 
      id: 3, 
      name: 'Academic Writing Circle', 
      members: 67, 
      newPosts: 1, 
      role: 'member',
      description: 'Support group for academic writing and publishing',
      category: 'Writing',
      activity: 'Moderate'
    }
  ];

  const suggestedGroups = [
    { 
      id: 4, 
      name: 'Machine Learning Educators', 
      members: 234, 
      description: 'Teaching methodologies and curriculum for ML courses',
      category: 'Education',
      rating: 4.8
    },
    { 
      id: 5, 
      name: 'Higher Education Innovation', 
      members: 156, 
      description: 'Innovative teaching methods and educational technology',
      category: 'Innovation',
      rating: 4.7
    },
    { 
      id: 6, 
      name: 'Research Funding Network', 
      members: 89, 
      description: 'Grant opportunities and funding strategies',
      category: 'Funding',
      rating: 4.9
    }
  ];

  return (
    <div className="p-6 space-y-6">
      <Breadcrumb items={[{ label: "Dashboard", href: "/dashboard" }, { label: "Subject Groups" }]} />
      
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Subject Groups</h1>
          <p className="text-gray-600">Connect with faculty and researchers in your field</p>
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
                  <div className="flex items-center gap-2">
                    {group.role === 'moderator' && (
                      <Crown className="h-4 w-4 text-yellow-500" />
                    )}
                    {group.newPosts > 0 && (
                      <Badge className="bg-red-100 text-red-700">
                        {group.newPosts} new
                      </Badge>
                    )}
                  </div>
                </div>
                <CardTitle className="text-lg">{group.name}</CardTitle>
                <CardDescription>{group.description}</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between text-sm text-gray-600">
                  <div className="flex items-center">
                    <Users className="h-4 w-4 mr-1" />
                    {group.members} members
                  </div>
                  <Badge variant={
                    group.activity === 'Very Active' ? 'default' :
                    group.activity === 'Active' ? 'secondary' : 'outline'
                  } className="text-xs">
                    {group.activity}
                  </Badge>
                </div>
                <div className="flex gap-2">
                  <Button size="sm" className="flex-1 bg-blue-600 hover:bg-blue-700">
                    <MessageSquare className="h-4 w-4 mr-1" />
                    View Posts
                  </Button>
                  <Button size="sm" variant="outline" className="flex-1">
                    <Settings className="h-4 w-4 mr-1" />
                    {group.role === 'moderator' ? 'Manage' : 'Settings'}
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      {/* Suggested Groups */}
      <div>
        <h2 className="text-xl font-semibold text-gray-900 mb-4">Recommended for You</h2>
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

export default ProfessorGroups;
