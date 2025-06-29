
import { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { User, GraduationCap, Building2, MessageSquare, Users, Zap } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const Index = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);

  const trendingPrograms = [
    {
      id: 1,
      university: "MIT",
      program: "Computer Science Masters",
      location: "Cambridge, MA",
      deadline: "Dec 15, 2025",
      type: "Masters"
    },
    {
      id: 2,
      university: "Stanford University",
      program: "Data Science PhD",
      location: "Stanford, CA",
      deadline: "Jan 20, 2026",
      type: "PhD"
    },
    {
      id: 3,
      university: "Harvard University",
      program: "Business Analytics",
      location: "Boston, MA",
      deadline: "Nov 30, 2025",
      type: "Certificate"
    }
  ];

  const academicGroups = [
    { name: "Engineering", members: 2450, color: "bg-blue-100 text-blue-700" },
    { name: "Medical", members: 1890, color: "bg-red-100 text-red-700" },
    { name: "Economics", members: 1205, color: "bg-green-100 text-green-700" },
    { name: "Computer Science", members: 3200, color: "bg-purple-100 text-purple-700" }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-2">
              <GraduationCap className="h-8 w-8 text-blue-600" />
              <span className="text-2xl font-bold text-gray-900">Edfellow</span>
            </div>
            <div className="flex items-center space-x-4">
              <Button 
                variant="ghost" 
                onClick={() => navigate('/login')}
              >
                Sign In
              </Button>
              <Button 
                onClick={() => navigate('/signup')}
                className="bg-blue-600 hover:bg-blue-700"
              >
                Get Started
              </Button>
            </div>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-5xl font-bold text-gray-900 mb-6">
            A place where <span className="text-blue-600">education connects</span>
          </h1>
          <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
            Connect with students and professors worldwide. Join academic communities, 
            discover programs, and build your educational network.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Button 
              size="lg" 
              onClick={() => navigate('/signup')}
              className="bg-blue-600 hover:bg-blue-700 px-8 py-3"
            >
              Join as Student
            </Button>
            <Button 
              size="lg" 
              variant="outline"
              onClick={() => navigate('/signup')}
              className="px-8 py-3"
            >
              Join as Professor
            </Button>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-white">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">
            Connect. Learn. Grow.
          </h2>
          <div className="grid md:grid-cols-3 gap-8">
            <Card className="text-center hover:shadow-lg transition-shadow">
              <CardHeader>
                <User className="h-12 w-12 text-blue-600 mx-auto mb-4" />
                <CardTitle className="text-xl">Build Your Profile</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600">
                  Create a comprehensive academic profile and showcase your expertise or interests.
                </p>
              </CardContent>
            </Card>
            
            <Card className="text-center hover:shadow-lg transition-shadow">
              <CardHeader>
                <Users className="h-12 w-12 text-green-600 mx-auto mb-4" />
                <CardTitle className="text-xl">Join Communities</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600">
                  Connect with peers in your field through specialized academic groups and forums.
                </p>
              </CardContent>
            </Card>
            
            <Card className="text-center hover:shadow-lg transition-shadow">
              <CardHeader>
                <MessageSquare className="h-12 w-12 text-purple-600 mx-auto mb-4" />
                <CardTitle className="text-xl">Direct Communication</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600">
                  Message students and professors directly to build meaningful connections.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Trending Programs */}
      <section className="py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-3xl font-bold text-gray-900">Trending Programs</h2>
            <Zap className="h-6 w-6 text-orange-500" />
          </div>
          <div className="grid md:grid-cols-3 gap-6">
            {trendingPrograms.map((program) => (
              <Card key={program.id} className="hover:shadow-lg transition-shadow border-l-4 border-l-orange-500">
                <CardHeader>
                  <div className="flex justify-between items-start">
                    <Building2 className="h-8 w-8 text-orange-600" />
                    <Badge variant="secondary">{program.type}</Badge>
                  </div>
                  <CardTitle className="text-lg">{program.program}</CardTitle>
                  <CardDescription className="font-semibold text-orange-600">
                    {program.university}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-gray-600 mb-2">{program.location}</p>
                  <p className="text-sm font-medium text-red-600">
                    Deadline: {program.deadline}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Academic Groups Preview */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-gray-50">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">
            Popular Academic Groups
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {academicGroups.map((group, index) => (
              <Card key={index} className="text-center hover:shadow-lg transition-shadow cursor-pointer">
                <CardHeader>
                  <CardTitle className="text-lg">{group.name}</CardTitle>
                </CardHeader>
                <CardContent>
                  <Badge className={group.color}>
                    {group.members.toLocaleString()} members
                  </Badge>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="flex items-center space-x-2 mb-4 md:mb-0">
              <GraduationCap className="h-8 w-8 text-blue-400" />
              <span className="text-2xl font-bold">Edfellow</span>
            </div>
            <p className="text-gray-400 text-center md:text-right">
              © 2025 Edfellow. A place where education connects.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
