
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Link } from 'react-router-dom';
import { LandingFooter } from "@/components/LandingFooter";
import { 
  GraduationCap, 
  Users, 
  MessageSquare, 
  Globe, 
  Star,
  Award,
  BookOpen,
  Heart,
  Menu,
  X,
  MapPin,
  Calendar,
  TrendingUp
} from 'lucide-react';
import { useState } from 'react';

const Community = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const communityStats = [
    { label: "Active Students", value: "50,000+", icon: Users },
    { label: "Expert Mentors", value: "2,500+", icon: Award },
    { label: "Universities", value: "150+", icon: BookOpen },
    { label: "Countries", value: "80+", icon: Globe }
  ];

  const featuredGroups = [
    {
      name: "Computer Science Global",
      members: 12500,
      description: "Connect with CS students and professionals worldwide",
      category: "Technology",
      country: "Global",
      active: true
    },
    {
      name: "Business & Entrepreneurship",
      members: 8900,
      description: "Future business leaders sharing insights and opportunities",
      category: "Business",
      country: "Global", 
      active: true
    },
    {
      name: "Medical Students United",
      members: 15600,
      description: "Medical students supporting each other through their journey",
      category: "Medicine",
      country: "Global",
      active: true
    },
    {
      name: "Engineering Excellence",
      members: 9800,
      description: "Engineering students and professionals collaboration hub",
      category: "Engineering",
      country: "Global",
      active: false
    }
  ];

  const topMentors = [
    {
      name: "Dr. Sarah Chen",
      expertise: "Artificial Intelligence",
      university: "Stanford University",
      students: 125,
      rating: 4.9,
      country: "USA"
    },
    {
      name: "Prof. Michael Rodriguez",
      expertise: "Business Strategy",
      university: "Harvard Business School",
      students: 89,
      rating: 4.8,
      country: "USA"
    },
    {
      name: "Dr. Priya Sharma",
      expertise: "Data Science",
      university: "IIT Delhi",
      students: 156,
      rating: 4.9,
      country: "India"
    }
  ];

  const recentActivity = [
    {
      type: "group_join",
      user: "Alex Thompson",
      action: "joined Computer Science Global",
      time: "2 hours ago"
    },
    {
      type: "mentorship",
      user: "Maria Garcia",
      action: "started mentorship with Dr. Sarah Chen",
      time: "4 hours ago"
    },
    {
      type: "discussion",
      user: "James Liu",
      action: "started a discussion about Machine Learning",
      time: "6 hours ago"
    },
    {
      type: "achievement",
      user: "Emma Wilson",
      action: "completed Advanced Python certification",
      time: "1 day ago"
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50/50 via-white to-slate-50/30">
      {/* Navigation */}
      <nav className="bg-[#0B1B4D] border-b border-blue-800 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            {/* Logo */}
            <Link to="/" className="flex items-center space-x-3">
              <div className="p-2 bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl shadow-lg">
                <GraduationCap className="h-6 w-6 text-white" />
              </div>
              <div>
                <span className="text-xl font-bold text-white">Edfellow</span>
                <p className="text-xs text-blue-300 font-medium">Where Education Meets the World</p>
              </div>
            </Link>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center space-x-8">
              <Link to="/about" className="text-blue-300 hover:text-white font-medium transition-colors">About</Link>
              <Link to="/features" className="text-blue-300 hover:text-white font-medium transition-colors">Features</Link>
              <Link to="/community" className="text-blue-300 hover:text-white font-medium transition-colors border-b-2 border-blue-500">Community</Link>
              <Link to="/login">
                <Button variant="ghost" className="text-blue-300 hover:text-white hover:bg-blue-700">
                  Sign In
                </Button>
              </Link>
              <Link to="/signup">
                <Button className="bg-blue-600 hover:bg-blue-700 text-white shadow-lg">
                  Get Started
                </Button>
              </Link>
            </div>

            {/* Mobile menu button */}
            <div className="md:hidden">
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className="text-blue-300 hover:text-white hover:bg-blue-700"
              >
                {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
              </Button>
            </div>
          </div>

          {/* Mobile Navigation */}
          {isMenuOpen && (
            <div className="md:hidden py-4 border-t border-blue-800">
              <div className="flex flex-col space-y-4">
                <Link to="/about" className="text-blue-300 hover:text-white font-medium">About</Link>
                <Link to="/features" className="text-blue-300 hover:text-white font-medium">Features</Link>
                <Link to="/community" className="text-blue-300 hover:text-white font-medium border-b border-blue-500 pb-2">Community</Link>
                <Link to="/login">
                  <Button variant="outline" className="w-full border-blue-300 text-blue-300 hover:bg-blue-700 hover:text-white">
                    Sign In
                  </Button>
                </Link>
                <Link to="/signup">
                  <Button className="w-full bg-blue-600 hover:bg-blue-700 text-white">
                    Get Started
                  </Button>
                </Link>
              </div>
            </div>
          )}
        </div>
      </nav>

      {/* Hero Section */}
      <section className="py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto text-center">
          <Badge className="bg-blue-100 text-blue-700 hover:bg-blue-200 mb-6">
            Global Community
          </Badge>
          <h1 className="text-4xl lg:text-5xl font-bold text-slate-900 mb-6">
            Join Our Thriving 
            <span className="text-blue-600"> Academic Community</span>
          </h1>
          <p className="text-xl text-slate-600 leading-relaxed max-w-3xl mx-auto">
            Connect with students, professors, and universities from around the world. 
            Share knowledge, find mentors, and build lasting academic relationships.
          </p>
        </div>
      </section>

      {/* Community Stats */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-4 gap-8">
            {communityStats.map((stat, index) => (
              <Card key={index} className="text-center border-blue-100 hover:shadow-lg transition-all duration-300">
                <CardHeader>
                  <div className="p-4 bg-blue-100 rounded-full w-fit mx-auto mb-4">
                    <stat.icon className="h-8 w-8 text-blue-600" />
                  </div>
                  <CardTitle className="text-2xl font-bold text-slate-900">{stat.value}</CardTitle>
                  <CardDescription className="text-slate-600">{stat.label}</CardDescription>
                </CardHeader>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Groups */}
      <section className="py-16 bg-gradient-to-br from-blue-50/50 to-slate-50/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <Badge className="bg-blue-100 text-blue-700 mb-4">Popular Groups</Badge>
            <h2 className="text-3xl font-bold text-slate-900 mb-4">Featured Academic Groups</h2>
            <p className="text-lg text-slate-600 max-w-2xl mx-auto">
              Join subject-specific groups and connect with like-minded learners from around the globe.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            {featuredGroups.map((group, index) => (
              <Card key={index} className="border-blue-100 hover:shadow-lg transition-all duration-300 hover:border-blue-200">
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <Badge variant="outline" className="text-xs">{group.category}</Badge>
                    <div className="flex items-center gap-2">
                      {group.active && (
                        <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                      )}
                      <span className="text-xs text-slate-500">
                        {group.active ? 'Active' : 'Offline'}
                      </span>
                    </div>
                  </div>
                  <CardTitle className="text-lg">{group.name}</CardTitle>
                  <CardDescription>{group.description}</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4 text-sm text-slate-600">
                      <div className="flex items-center gap-1">
                        <Users className="h-4 w-4" />
                        {group.members.toLocaleString()} members
                      </div>
                      <div className="flex items-center gap-1">
                        <Globe className="h-4 w-4" />
                        {group.country}
                      </div>
                    </div>
                    <Button size="sm" className="bg-blue-600 hover:bg-blue-700">
                      Join Group
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Top Mentors */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <Badge className="bg-blue-100 text-blue-700 mb-4">Top Mentors</Badge>
            <h2 className="text-3xl font-bold text-slate-900 mb-4">Learn from the Best</h2>
            <p className="text-lg text-slate-600 max-w-2xl mx-auto">
              Connect with experienced professors and industry experts who are passionate about mentoring.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {topMentors.map((mentor, index) => (
              <Card key={index} className="border-blue-100 hover:shadow-lg transition-all duration-300 text-center">
                <CardHeader>
                  <Avatar className="h-20 w-20 mx-auto mb-4">
                    <AvatarFallback className="bg-blue-100 text-blue-600 text-xl">
                      {mentor.name.split(' ').map(n => n[0]).join('')}
                    </AvatarFallback>
                  </Avatar>
                  <CardTitle className="text-lg">{mentor.name}</CardTitle>
                  <CardDescription>{mentor.expertise}</CardDescription>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="text-sm text-slate-600">
                    <div className="flex items-center justify-center gap-2 mb-2">
                      <BookOpen className="h-4 w-4" />
                      {mentor.university}
                    </div>
                    <div className="flex items-center justify-center gap-2 mb-2">
                      <MapPin className="h-4 w-4" />
                      {mentor.country}
                    </div>
                  </div>
                  <div className="flex items-center justify-center gap-4 text-sm">
                    <div className="text-center">
                      <div className="font-semibold text-slate-900">{mentor.students}</div>
                      <div className="text-slate-600">Students</div>
                    </div>
                    <div className="text-center">
                      <div className="font-semibold text-slate-900 flex items-center gap-1">
                        <Star className="h-4 w-4 text-yellow-500" />
                        {mentor.rating}
                      </div>
                      <div className="text-slate-600">Rating</div>
                    </div>
                  </div>
                  <Button size="sm" className="w-full bg-blue-600 hover:bg-blue-700">
                    Connect
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Recent Activity */}
      <section className="py-16 bg-gradient-to-br from-blue-50/50 to-slate-50/30">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <Badge className="bg-blue-100 text-blue-700 mb-4">Live Activity</Badge>
            <h2 className="text-3xl font-bold text-slate-900 mb-4">What's Happening Now</h2>
            <p className="text-lg text-slate-600">
              See the latest activities from our global community of learners.
            </p>
          </div>

          <Card className="border-blue-100">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <TrendingUp className="h-5 w-5 text-blue-600" />
                Recent Community Activity
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {recentActivity.map((activity, index) => (
                  <div key={index} className="flex items-center gap-4 p-4 bg-blue-50/50 rounded-lg">
                    <Avatar className="h-10 w-10">
                      <AvatarFallback className="bg-blue-100 text-blue-600">
                        {activity.user.split(' ').map(n => n[0]).join('')}
                      </AvatarFallback>
                    </Avatar>
                    <div className="flex-1">
                      <p className="text-slate-900">
                        <span className="font-medium">{activity.user}</span> {activity.action}
                      </p>
                      <p className="text-sm text-slate-500">{activity.time}</p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-gradient-to-r from-blue-600 to-blue-700">
        <div className="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-white mb-4">
            Ready to Join Our Global Community?
          </h2>
          <p className="text-xl text-blue-100 mb-8">
            Connect with thousands of students, professors, and universities worldwide. Your academic journey awaits.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/signup">
              <Button size="lg" className="bg-white text-blue-600 hover:bg-blue-50 shadow-lg px-8">
                Join Community
              </Button>
            </Link>
            <Link to="/features">
              <Button size="lg" variant="outline" className="border-white text-white hover:bg-white/10 px-8">
                Explore Features
              </Button>
            </Link>
          </div>
        </div>
      </section>

      <LandingFooter />
    </div>
  );
};

export default Community;
