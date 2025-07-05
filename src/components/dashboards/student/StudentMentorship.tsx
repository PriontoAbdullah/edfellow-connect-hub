
import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Input } from "@/components/ui/input";
import { Breadcrumb } from "../../dashboard/Breadcrumb";
import { Heart, Search, Star, MapPin, BookOpen, MessageSquare, Calendar, Filter } from 'lucide-react';

const StudentMentorship = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');

  const myMentors = [
    {
      id: 1,
      name: 'Dr. Sarah Johnson',
      expertise: 'Artificial Intelligence',
      university: 'Stanford University',
      country: 'USA',
      rating: 4.9,
      sessions: 12,
      nextSession: 'Dec 28, 2024 2:00 PM',
      status: 'active'
    },
    {
      id: 2,
      name: 'Prof. Michael Chen',
      expertise: 'Data Science',
      university: 'MIT',
      country: 'USA',
      rating: 4.8,
      sessions: 8,
      nextSession: 'Dec 30, 2024 10:00 AM',
      status: 'active'
    }
  ];

  const availableMentors = [
    {
      id: 3,
      name: 'Dr. Priya Sharma',
      expertise: 'Machine Learning',
      university: 'IIT Delhi',
      country: 'India',
      rating: 4.9,
      students: 156,
      price: '$50/hour',
      responseTime: '< 2 hours'
    },
    {
      id: 4,
      name: 'Prof. Emma Wilson',
      expertise: 'Computer Vision',
      university: 'University of Oxford',
      country: 'UK',
      rating: 4.7,
      students: 89,
      price: '$60/hour',
      responseTime: '< 4 hours'
    },
    {
      id: 5,
      name: 'Dr. Carlos Rodriguez',
      expertise: 'Natural Language Processing',
      university: 'Universidad Politécnica de Madrid',
      country: 'Spain',
      rating: 4.8,
      students: 112,
      price: '$45/hour',
      responseTime: '< 1 hour'
    },
    {
      id: 6,
      name: 'Prof. Yuki Tanaka',
      expertise: 'Robotics',
      university: 'University of Tokyo',
      country: 'Japan',
      rating: 4.9,
      students: 78,
      price: '$55/hour',
      responseTime: '< 3 hours'
    }
  ];

  const categories = [
    { value: 'all', label: 'All Fields' },
    { value: 'ai', label: 'Artificial Intelligence' },
    { value: 'ml', label: 'Machine Learning' },
    { value: 'ds', label: 'Data Science' },
    { value: 'cv', label: 'Computer Vision' },
    { value: 'nlp', label: 'Natural Language Processing' },
    { value: 'robotics', label: 'Robotics' }
  ];

  return (
    <div className="p-6 space-y-6">
      <Breadcrumb items={[{ label: "Dashboard", href: "/dashboard" }, { label: "Mentorship" }]} />
      
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Find Your Mentor</h1>
          <p className="text-gray-600">Connect with expert professors and accelerate your learning</p>
        </div>
        <Button className="bg-blue-600 hover:bg-blue-700">
          <Heart className="h-4 w-4 mr-2" />
          Saved Mentors
        </Button>
      </div>

      {/* My Current Mentors */}
      {myMentors.length > 0 && (
        <div>
          <h2 className="text-xl font-semibold text-gray-900 mb-4">My Mentors ({myMentors.length})</h2>
          <div className="grid md:grid-cols-2 gap-6 mb-8">
            {myMentors.map((mentor) => (
              <Card key={mentor.id} className="border-green-200 bg-green-50/50">
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <Badge className="bg-green-100 text-green-700">Active</Badge>
                    <div className="flex items-center">
                      <Star className="h-4 w-4 text-yellow-500 mr-1" />
                      <span className="text-sm font-medium">{mentor.rating}</span>
                    </div>
                  </div>
                  <div className="flex items-center space-x-4">
                    <Avatar className="h-12 w-12">
                      <AvatarFallback className="bg-blue-100 text-blue-600">
                        {mentor.name.split(' ').map(n => n[0]).join('')}
                      </AvatarFallback>
                    </Avatar>
                    <div>
                      <CardTitle className="text-lg">{mentor.name}</CardTitle>
                      <CardDescription>{mentor.expertise}</CardDescription>
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="text-sm text-gray-600 space-y-1">
                    <div className="flex items-center">
                      <BookOpen className="h-4 w-4 mr-2" />
                      {mentor.university}
                    </div>
                    <div className="flex items-center">
                      <MapPin className="h-4 w-4 mr-2" />
                      {mentor.country}
                    </div>
                    <div className="flex items-center">
                      <Calendar className="h-4 w-4 mr-2" />
                      Next: {mentor.nextSession}
                    </div>
                  </div>
                  <div className="text-center p-2 bg-white rounded">
                    <div className="text-lg font-semibold text-blue-600">{mentor.sessions}</div>
                    <div className="text-xs text-gray-600">Sessions Completed</div>
                  </div>
                  <div className="flex gap-2">
                    <Button size="sm" className="flex-1 bg-blue-600 hover:bg-blue-700">
                      <MessageSquare className="h-4 w-4 mr-1" />
                      Message
                    </Button>
                    <Button size="sm" variant="outline" className="flex-1">
                      <Calendar className="h-4 w-4 mr-1" />
                      Schedule
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      )}

      {/* Search and Filters */}
      <Card>
        <CardContent className="p-4">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
              <Input 
                placeholder="Search mentors by name, expertise, or university..." 
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
            <div className="flex items-center gap-2">
              <Filter className="h-4 w-4 text-gray-400" />
              <select 
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="px-3 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                {categories.map((category) => (
                  <option key={category.value} value={category.value}>
                    {category.label}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Available Mentors */}
      <div>
        <h2 className="text-xl font-semibold text-gray-900 mb-4">Available Mentors</h2>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {availableMentors.map((mentor) => (
            <Card key={mentor.id} className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <Star className="h-4 w-4 text-yellow-500 mr-1" />
                    <span className="text-sm font-medium">{mentor.rating}</span>
                  </div>
                  <Badge variant="outline" className="text-xs">
                    {mentor.responseTime}
                  </Badge>
                </div>
                <div className="flex items-center space-x-3">
                  <Avatar className="h-12 w-12">
                    <AvatarFallback className="bg-blue-100 text-blue-600">
                      {mentor.name.split(' ').map(n => n[0]).join('')}
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <CardTitle className="text-lg">{mentor.name}</CardTitle>
                    <CardDescription>{mentor.expertise}</CardDescription>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="text-sm text-gray-600 space-y-1">
                  <div className="flex items-center">
                    <BookOpen className="h-4 w-4 mr-2" />
                    {mentor.university}
                  </div>
                  <div className="flex items-center">
                    <MapPin className="h-4 w-4 mr-2" />
                    {mentor.country}
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-2 text-center">
                  <div className="p-2 bg-blue-50 rounded">
                    <div className="text-sm font-semibold text-blue-600">{mentor.students}</div>
                    <div className="text-xs text-gray-600">Students</div>
                  </div>
                  <div className="p-2 bg-green-50 rounded">
                    <div className="text-sm font-semibold text-green-600">{mentor.price}</div>
                    <div className="text-xs text-gray-600">Per Hour</div>
                  </div>
                </div>
                <div className="flex gap-2">
                  <Button size="sm" className="flex-1 bg-blue-600 hover:bg-blue-700">
                    <MessageSquare className="h-4 w-4 mr-1" />
                    Connect
                  </Button>
                  <Button size="sm" variant="outline" className="flex-1">
                    <Heart className="h-4 w-4 mr-1" />
                    Save
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
};

export default StudentMentorship;
