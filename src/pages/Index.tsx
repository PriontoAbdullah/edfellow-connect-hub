
import { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { User, GraduationCap, Building2, MessageSquare, Users, Zap, Star, MapPin, Calendar } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const Index = () => {
  const navigate = useNavigate();

  const trendingPrograms = [
    {
      id: 1,
      university: "MIT",
      program: "Computer Science Masters",
      location: "Cambridge, MA",
      deadline: "Dec 15, 2025",
      type: "Masters",
      rating: 4.9
    },
    {
      id: 2,
      university: "Stanford University",
      program: "Data Science PhD",
      location: "Stanford, CA",
      deadline: "Jan 20, 2026",
      type: "PhD",
      rating: 4.8
    },
    {
      id: 3,
      university: "Harvard University",
      program: "Business Analytics",
      location: "Boston, MA",
      deadline: "Nov 30, 2025",
      type: "Certificate",
      rating: 4.7
    }
  ];

  const academicGroups = [
    { name: "Engineering", members: 2450, color: "bg-blue-100 text-blue-700", icon: "🔧" },
    { name: "Medical", members: 1890, color: "bg-red-100 text-red-700", icon: "⚕️" },
    { name: "Economics", members: 1205, color: "bg-green-100 text-green-700", icon: "📊" },
    { name: "Computer Science", members: 3200, color: "bg-purple-100 text-purple-700", icon: "💻" }
  ];

  const testimonials = [
    {
      id: 1,
      name: "Sarah Chen",
      role: "MIT Graduate Student",
      content: "Edfellow helped me connect with professors in my field and find amazing research opportunities.",
      avatar: "SC"
    },
    {
      id: 2,
      name: "Dr. James Wilson",
      role: "Stanford Professor",
      content: "A fantastic platform to mentor students and share knowledge with the global academic community.",
      avatar: "JW"
    },
    {
      id: 3,
      name: "Maria Rodriguez",
      role: "Harvard Undergraduate",
      content: "I found my study group and academic mentors through Edfellow. It's been a game-changer for my education.",
      avatar: "MR"
    }
  ];

  const howItWorksSteps = [
    {
      icon: User,
      title: "Build Your Profile",
      description: "Create a comprehensive academic profile showcasing your expertise, interests, and educational background."
    },
    {
      icon: Users,
      title: "Join Academic Groups",
      description: "Connect with peers in your field through specialized groups and participate in meaningful discussions."
    },
    {
      icon: MessageSquare,
      title: "Message & Collaborate",
      description: "Directly message professors, students, and professionals to build your academic network."
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b sticky top-0 z-50">
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
          <h1 className="text-5xl md:text-6xl font-bold text-gray-900 mb-6">
            A place where <span className="text-blue-600">education connects</span>
          </h1>
          <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
            Join the global academic community. Connect with students, professors, and universities worldwide. 
            Build your network, share knowledge, and advance your educational journey.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Button 
              size="lg" 
              onClick={() => navigate('/signup')}
              className="bg-blue-600 hover:bg-blue-700 px-8 py-3 text-lg"
            >
              Join as Student
            </Button>
            <Button 
              size="lg" 
              variant="outline"
              onClick={() => navigate('/signup')}
              className="px-8 py-3 text-lg border-green-600 text-green-600 hover:bg-green-50"
            >
              Join as Professor
            </Button>
          </div>
          <div className="mt-12 text-sm text-gray-500">
            Trusted by students and professors from 50+ countries
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-white">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold text-center text-gray-900 mb-4">
            How Edfellow Works
          </h2>
          <p className="text-center text-gray-600 mb-12 max-w-2xl mx-auto">
            Connect, learn, and grow with our simple three-step process
          </p>
          <div className="grid md:grid-cols-3 gap-8">
            {howItWorksSteps.map((step, index) => {
              const IconComponent = step.icon;
              return (
                <Card key={index} className="text-center hover:shadow-lg transition-shadow border-t-4 border-t-blue-500">
                  <CardHeader>
                    <div className="mx-auto w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mb-4">
                      <IconComponent className="h-8 w-8 text-blue-600" />
                    </div>
                    <CardTitle className="text-xl">{step.title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-gray-600">
                      {step.description}
                    </p>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>
      </section>

      {/* Trending Programs */}
      <section className="py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          <div className="flex items-center justify-between mb-8">
            <div>
              <h2 className="text-3xl font-bold text-gray-900">Trending Programs</h2>
              <p className="text-gray-600 mt-2">Discover top-rated programs from leading universities</p>
            </div>
            <Zap className="h-6 w-6 text-orange-500" />
          </div>
          <div className="grid md:grid-cols-3 gap-6">
            {trendingPrograms.map((program) => (
              <Card key={program.id} className="hover:shadow-lg transition-shadow border-l-4 border-l-orange-500">
                <CardHeader>
                  <div className="flex justify-between items-start mb-2">
                    <Building2 className="h-8 w-8 text-orange-600" />
                    <Badge variant="secondary">{program.type}</Badge>
                  </div>
                  <CardTitle className="text-lg">{program.program}</CardTitle>
                  <CardDescription className="font-semibold text-orange-600 text-base">
                    {program.university}
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-2">
                  <div className="flex items-center text-sm text-gray-600">
                    <MapPin className="h-4 w-4 mr-1" />
                    {program.location}
                  </div>
                  <div className="flex items-center text-sm text-gray-600">
                    <Calendar className="h-4 w-4 mr-1" />
                    Deadline: {program.deadline}
                  </div>
                  <div className="flex items-center text-sm">
                    <Star className="h-4 w-4 text-yellow-500 mr-1" />
                    <span className="font-medium">{program.rating}</span>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Academic Groups Preview */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-gray-50">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold text-center text-gray-900 mb-4">
            Popular Academic Groups
          </h2>
          <p className="text-center text-gray-600 mb-12 max-w-2xl mx-auto">
            Join thousands of students and professors in field-specific communities
          </p>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {academicGroups.map((group, index) => (
              <Card key={index} className="text-center hover:shadow-lg transition-shadow cursor-pointer hover:scale-105 transform transition-transform">
                <CardHeader>
                  <div className="text-4xl mb-2">{group.icon}</div>
                  <CardTitle className="text-lg">{group.name}</CardTitle>
                </CardHeader>
                <CardContent>
                  <Badge className={group.color}>
                    {group.members.toLocaleString()} members
                  </Badge>
                  <p className="text-sm text-gray-600 mt-2">Active discussions</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-white">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold text-center text-gray-900 mb-4">
            What Our Community Says
          </h2>
          <p className="text-center text-gray-600 mb-12 max-w-2xl mx-auto">
            Real stories from students, professors, and universities using Edfellow
          </p>
          <div className="grid md:grid-cols-3 gap-8">
            {testimonials.map((testimonial) => (
              <Card key={testimonial.id} className="hover:shadow-lg transition-shadow">
                <CardContent className="pt-6">
                  <div className="flex items-center mb-4">
                    <div className="w-12 h-12 bg-blue-600 rounded-full flex items-center justify-center text-white font-bold mr-4">
                      {testimonial.avatar}
                    </div>
                    <div>
                      <h4 className="font-semibold text-gray-900">{testimonial.name}</h4>
                      <p className="text-sm text-gray-600">{testimonial.role}</p>
                    </div>
                  </div>
                  <p className="text-gray-700 italic">"{testimonial.content}"</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-gradient-to-r from-blue-600 to-purple-600 text-white">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl font-bold mb-4">
            Ready to Connect with the World of Education?
          </h2>
          <p className="text-xl mb-8 opacity-90">
            Join thousands of students, professors, and universities already building their academic networks.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button 
              size="lg" 
              onClick={() => navigate('/signup')}
              className="bg-white text-blue-600 hover:bg-gray-100 px-8 py-3"
            >
              Start Your Journey
            </Button>
            <Button 
              size="lg" 
              variant="outline"
              onClick={() => navigate('/login')}
              className="border-white text-white hover:bg-white hover:text-blue-600 px-8 py-3"
            >
              Already Have Account?
            </Button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          <div className="grid md:grid-cols-4 gap-8">
            <div className="col-span-1">
              <div className="flex items-center space-x-2 mb-4">
                <GraduationCap className="h-8 w-8 text-blue-400" />
                <span className="text-2xl font-bold">Edfellow</span>
              </div>
              <p className="text-gray-400">
                A place where education connects. Building bridges between students, professors, and universities worldwide.
              </p>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-4">Platform</h3>
              <ul className="space-y-2 text-gray-400">
                <li><a href="#" className="hover:text-white">For Students</a></li>
                <li><a href="#" className="hover:text-white">For Professors</a></li>
                <li><a href="#" className="hover:text-white">For Universities</a></li>
                <li><a href="#" className="hover:text-white">Academic Groups</a></li>
              </ul>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-4">Resources</h3>
              <ul className="space-y-2 text-gray-400">
                <li><a href="#" className="hover:text-white">Help Center</a></li>
                <li><a href="#" className="hover:text-white">Community Guidelines</a></li>
                <li><a href="#" className="hover:text-white">Success Stories</a></li>
                <li><a href="#" className="hover:text-white">Blog</a></li>
              </ul>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-4">Company</h3>
              <ul className="space-y-2 text-gray-400">
                <li><a href="#" className="hover:text-white">About Us</a></li>
                <li><a href="#" className="hover:text-white">Privacy Policy</a></li>
                <li><a href="#" className="hover:text-white">Terms of Service</a></li>
                <li><a href="#" className="hover:text-white">Contact</a></li>
              </ul>
            </div>
          </div>
          <div className="border-t border-gray-800 mt-8 pt-8 flex flex-col md:flex-row justify-between items-center">
            <p className="text-gray-400 text-center md:text-left">
              © 2025 Edfellow. All rights reserved. A place where education connects.
            </p>
            <div className="flex space-x-6 mt-4 md:mt-0">
              <a href="#" className="text-gray-400 hover:text-white">Privacy</a>
              <a href="#" className="text-gray-400 hover:text-white">Terms</a>
              <a href="#" className="text-gray-400 hover:text-white">Support</a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
