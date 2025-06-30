
import { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { 
  User, 
  GraduationCap, 
  Building2, 
  MessageSquare, 
  Users, 
  Zap, 
  Star, 
  MapPin, 
  Calendar, 
  Globe, 
  BookOpen, 
  Heart, 
  Target, 
  Award,
  Search,
  Shield,
  Video,
  Languages,
  UserCheck,
  BrainCircuit,
  Briefcase,
  Trophy,
  Network,
  Presentation,
  Camera,
  TrendingUp,
  Mail,
  ArrowRight,
  Check,
  Sparkles,
  PlayCircle
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const Index = () => {
  const navigate = useNavigate();

  const generalFeatures = [
    {
      icon: BrainCircuit,
      title: "Smart Match System",
      description: "Connect instantly with students, professors, and universities aligned with your interests and goals."
    },
    {
      icon: Globe,
      title: "Global Community Hub", 
      description: "Join discussions, ask questions, and collaborate across borders in your field of study."
    },
    {
      icon: Languages,
      title: "Multilingual Support",
      description: "Access content and communicate in your native language or choose from multiple supported languages."
    },
    {
      icon: Shield,
      title: "Verified Profiles & Ratings",
      description: "Trust the quality of mentorship, courses, and institutional programs with verified users and transparent reviews."
    },
    {
      icon: Video,
      title: "Virtual Collaboration Tools",
      description: "Message, video call, share resources, and manage group projects—all in one place."
    },
    {
      icon: Calendar,
      title: "Integrated Calendar & Booking",
      description: "Easily schedule mentorship sessions, interviews, and live events."
    }
  ];

  const studentFeatures = [
    {
      icon: Users,
      title: "Field-Based Global Peer Groups",
      description: "Join study groups by major or interest area—collaborate, share resources, and learn together."
    },
    {
      icon: UserCheck,
      title: "Mentor Marketplace",
      description: "Find and book expert professors for guidance, academic help, or admission support."
    },
    {
      icon: Briefcase,
      title: "Career Exploration Center",
      description: "Learn what it takes to succeed in your field—skills, job markets, pathways."
    },
    {
      icon: Camera,
      title: "Digital Portfolio Builder",
      description: "Showcase your work, research, and achievements to professors and universities worldwide."
    },
    {
      icon: Trophy,
      title: "Global Scholarship & Internship Board",
      description: "Access curated opportunities across countries, tailored to your interests."
    }
  ];

  const professorFeatures = [
    {
      icon: TrendingUp,
      title: "Mentorship Dashboard",
      description: "Track student bookings, sessions, feedback, and income in one clean interface."
    },
    {
      icon: BookOpen,
      title: "Global Course Builder",
      description: "Design and deliver your own online courses to students anywhere in the world."
    },
    {
      icon: Search,
      title: "Research Assistant Portal",
      description: "Post assistantship openings and build virtual research teams."
    },
    {
      icon: GraduationCap,
      title: "Admission & Academic Advisory Tools",
      description: "Offer admission guidance and structured counseling packages."
    },
    {
      icon: Award,
      title: "Professional Profile & Promotion Tools",
      description: "Build visibility with a public profile, course ratings, and featured listings."
    }
  ];

  const universityFeatures = [
    {
      icon: TrendingUp,
      title: "Institution Dashboard",
      description: "Track applications, leads, student engagement, and alumni activity."
    },
    {
      icon: Presentation,
      title: "Program Promotion Tools",
      description: "Create immersive profiles for degrees, certificates, and study-abroad programs."
    },
    {
      icon: Target,
      title: "Student Recruitment Suite",
      description: "Target and communicate with potential students worldwide based on interests and qualifications."
    },
    {
      icon: Users,
      title: "Professor Recruitment",
      description: "Find and recruit top academic talent from around the world."
    },
    {
      icon: Network,
      title: "Alumni Engagement Network",
      description: "Visual alumni map, communication tools, and engagement metrics."
    },
    {
      icon: Video,
      title: "Live Info Sessions & Webinars",
      description: "Host live virtual sessions to promote programs and answer student questions."
    }
  ];

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
      content: "Edfellow helped me connect with professors in my field and find amazing research opportunities globally.",
      avatar: "SC"
    },
    {
      id: 2,
      name: "Dr. James Wilson", 
      role: "Stanford Professor",
      content: "A fantastic platform to mentor students worldwide and share knowledge with the global academic community.",
      avatar: "JW"
    },
    {
      id: 3,
      name: "Maria Rodriguez",
      role: "Harvard Undergraduate", 
      content: "I found my global study group and international mentors through Edfellow. It's been transformative for my education.",
      avatar: "MR"
    }
  ];

  const stats = [
    { number: "50+", label: "Countries" },
    { number: "10K+", label: "Active Users" }, 
    { number: "500+", label: "Universities" },
    { number: "95%", label: "Success Rate" }
  ];

  return (
    <div className="min-h-screen bg-white">
      {/* Header - Premium Glass Effect */}
      <header className="sticky top-0 z-50 backdrop-blur-xl bg-white/80 border-b border-gray-200/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-20">
            <div className="flex items-center space-x-3">
              <div className="p-2 bg-gradient-to-br from-blue-600 to-purple-600 rounded-xl">
                <GraduationCap className="h-8 w-8 text-white" />
              </div>
              <div>
                <span className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                  Edfellow
                </span>
                <p className="text-xs text-gray-500 font-medium">Where Education Meets the World</p>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <Button 
                variant="ghost" 
                onClick={() => navigate('/login')}
                className="hover:bg-gray-100/80"
              >
                Sign In
              </Button>
              <Button 
                onClick={() => navigate('/signup')}
                className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 shadow-lg"
              >
                Get Started Free
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>
      </header>

      {/* Hero Section - Premium Design */}
      <section className="relative py-24 px-4 sm:px-6 lg:px-8 overflow-hidden">
        {/* Background Effects */}
        <div className="absolute inset-0 bg-gradient-to-br from-blue-50/50 via-white to-purple-50/50" />
        <div className="absolute top-20 left-20 w-72 h-72 bg-blue-400/10 rounded-full blur-3xl" />
        <div className="absolute bottom-20 right-20 w-96 h-96 bg-purple-400/10 rounded-full blur-3xl" />
        
        <div className="relative max-w-6xl mx-auto text-center">
          <div className="mb-8">
            <Badge className="bg-gradient-to-r from-blue-100 to-purple-100 text-blue-700 border-blue-200 mb-6 px-4 py-2 text-sm font-semibold">
              <Sparkles className="mr-2 h-4 w-4" />
              Where Education Meets the World
            </Badge>
          </div>
          
          <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold text-gray-900 mb-8 leading-tight">
            Unlock Knowledge,{" "}
            <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              Opportunity
            </span>
            , and{" "}
            <span className="bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
              Connection
            </span>
            —Globally
          </h1>
          
          <p className="text-xl md:text-2xl text-gray-600 mb-12 max-w-4xl mx-auto leading-relaxed font-light">
            Edfellow is a global educational network that brings students, professors, and universities 
            together. Learn, mentor, collaborate, and grow beyond borders in a truly interconnected academic ecosystem.
          </p>

          {/* Stats Row */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-12 max-w-2xl mx-auto">
            {stats.map((stat, index) => (
              <div key={index} className="text-center">
                <div className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                  {stat.number}
                </div>
                <div className="text-sm text-gray-600 font-medium">{stat.label}</div>
              </div>
            ))}
          </div>
          
          <div className="flex flex-col sm:flex-row gap-6 justify-center items-center mb-12">
            <Button 
              size="lg" 
              onClick={() => navigate('/signup')}
              className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 px-8 py-4 text-lg font-semibold shadow-2xl hover:shadow-blue-500/25 transform hover:scale-105 transition-all duration-200"
            >
              👨‍🎓 Connect Globally. Learn Locally. Lead Universally.
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Button 
              size="lg" 
              variant="outline"
              onClick={() => navigate('/signup')}
              className="px-8 py-4 text-lg border-2 border-green-500 text-green-600 hover:bg-green-50 font-semibold"
            >
              👩‍🏫 Teach Globally. Mentor Personally. Inspire Endlessly.
            </Button>
            <Button 
              size="lg" 
              variant="outline"
              onClick={() => navigate('/signup')}
              className="px-8 py-4 text-lg border-2 border-orange-500 text-orange-600 hover:bg-orange-50 font-semibold"
            >
              🏛️ Expand Your Campus. Reach the World
            </Button>
          </div>

          <div className="mt-16 flex items-center justify-center space-x-2 text-sm text-gray-500">
            <Check className="h-4 w-4 text-green-500" />
            <span>Trusted by students, professors, and universities from 50+ countries</span>
          </div>
        </div>
      </section>

      {/* Vision & Mission - Premium Cards */}
      <section className="py-24 px-4 sm:px-6 lg:px-8 bg-gray-50">
        <div className="max-w-6xl mx-auto">
          <div className="grid md:grid-cols-2 gap-12">
            <Card className="relative overflow-hidden border-0 shadow-2xl bg-gradient-to-br from-blue-600 to-purple-600 text-white">
              <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full -translate-y-16 translate-x-16" />
              <CardHeader className="relative z-10 pb-6">
                <div className="flex items-center mb-4">
                  <div className="p-3 bg-white/20 rounded-xl backdrop-blur-sm">
                    <Target className="h-8 w-8" />
                  </div>
                </div>
                <CardTitle className="text-3xl font-bold mb-4">Our Vision</CardTitle>
                <CardDescription className="text-blue-100 text-lg leading-relaxed">
                  To create a borderless global education ecosystem where students, professors, and universities 
                  collaborate seamlessly—unlocking knowledge, expanding opportunities, and shaping the future of 
                  learning and careers worldwide.
                </CardDescription>
              </CardHeader>
            </Card>

            <Card className="relative overflow-hidden border-0 shadow-2xl bg-gradient-to-br from-purple-600 to-pink-600 text-white">
              <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full -translate-y-16 translate-x-16" />
              <CardHeader className="relative z-10 pb-6">
                <div className="flex items-center mb-4">
                  <div className="p-3 bg-white/20 rounded-xl backdrop-blur-sm">
                    <Heart className="h-8 w-8" />
                  </div>
                </div>
                <CardTitle className="text-3xl font-bold mb-4">Our Mission</CardTitle>
                <CardDescription className="text-purple-100 text-lg leading-relaxed">
                  Edfellow empowers learners and educators by connecting them across continents through mentorship, 
                  shared knowledge, and accessible academic opportunities. We facilitate meaningful collaborations 
                  that enrich education, foster career growth, and build a diverse, global academic community.
                </CardDescription>
              </CardHeader>
            </Card>
          </div>
        </div>
      </section>

      {/* General Features - Premium Grid */}
      <section className="py-24 px-4 sm:px-6 lg:px-8 bg-white">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <Badge className="bg-gray-100 text-gray-700 mb-4 px-4 py-2">Core Platform</Badge>
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              Powerful Features for Global Education
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
              Advanced tools designed to connect and empower the global academic community
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {generalFeatures.map((feature, index) => {
              const IconComponent = feature.icon;
              return (
                <Card key={index} className="group hover:shadow-2xl transition-all duration-300 border-0 shadow-lg hover:scale-105 bg-white">
                  <CardHeader className="text-center pb-4">
                    <div className="mx-auto w-16 h-16 bg-gradient-to-br from-blue-100 to-purple-100 rounded-2xl flex items-center justify-center mb-6 group-hover:from-blue-200 group-hover:to-purple-200 transition-all duration-300">
                      <IconComponent className="h-8 w-8 text-blue-600" />
                    </div>
                    <CardTitle className="text-xl font-bold text-gray-900">{feature.title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-gray-600 leading-relaxed">
                      {feature.description}
                    </p>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>
      </section>

      {/* Student Features - Premium Section */}
      <section className="py-24 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-blue-50 to-indigo-50">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <div className="inline-flex items-center bg-gradient-to-r from-blue-600 to-indigo-600 text-white px-8 py-4 rounded-2xl mb-6 shadow-lg">
              <GraduationCap className="h-6 w-6 mr-3" />
              <span className="font-bold text-lg">For Students</span>
            </div>
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              Connect Globally. Learn Locally. Lead Universally.
            </h2>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {studentFeatures.map((feature, index) => {
              const IconComponent = feature.icon;
              return (
                <Card key={index} className="group hover:shadow-2xl transition-all duration-300 border-l-4 border-l-blue-500 bg-white/80 backdrop-blur-sm hover:bg-white">
                  <CardHeader>
                    <div className="flex items-center mb-4">
                      <div className="w-14 h-14 bg-gradient-to-br from-blue-100 to-blue-200 rounded-xl flex items-center justify-center mr-4 group-hover:from-blue-500 group-hover:to-blue-600 group-hover:text-white transition-all duration-300">
                        <IconComponent className="h-6 w-6 text-blue-600 group-hover:text-white" />
                      </div>
                      <CardTitle className="text-lg font-bold text-gray-900">{feature.title}</CardTitle>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <p className="text-gray-600 leading-relaxed">
                      {feature.description}
                    </p>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>
      </section>

      {/* Professor Features - Premium Section */}
      <section className="py-24 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-green-50 to-emerald-50">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <div className="inline-flex items-center bg-gradient-to-r from-green-600 to-emerald-600 text-white px-8 py-4 rounded-2xl mb-6 shadow-lg">
              <BookOpen className="h-6 w-6 mr-3" />
              <span className="font-bold text-lg">For Professors</span>
            </div>
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              Teach Globally. Mentor Personally. Inspire Endlessly.
            </h2>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {professorFeatures.map((feature, index) => {
              const IconComponent = feature.icon;
              return (
                <Card key={index} className="group hover:shadow-2xl transition-all duration-300 border-l-4 border-l-green-500 bg-white/80 backdrop-blur-sm hover:bg-white">
                  <CardHeader>
                    <div className="flex items-center mb-4">
                      <div className="w-14 h-14 bg-gradient-to-br from-green-100 to-green-200 rounded-xl flex items-center justify-center mr-4 group-hover:from-green-500 group-hover:to-green-600 group-hover:text-white transition-all duration-300">
                        <IconComponent className="h-6 w-6 text-green-600 group-hover:text-white" />
                      </div>
                      <CardTitle className="text-lg font-bold text-gray-900">{feature.title}</CardTitle>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <p className="text-gray-600 leading-relaxed">
                      {feature.description}
                    </p>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>
      </section>

      {/* University Features - Premium Section */}
      <section className="py-24 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-orange-50 to-amber-50">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <div className="inline-flex items-center bg-gradient-to-r from-orange-600 to-amber-600 text-white px-8 py-4 rounded-2xl mb-6 shadow-lg">
              <Building2 className="h-6 w-6 mr-3" />
              <span className="font-bold text-lg">For Universities</span>
            </div>
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              Expand Your Campus. Reach the World
            </h2>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {universityFeatures.map((feature, index) => {
              const IconComponent = feature.icon;
              return (
                <Card key={index} className="group hover:shadow-2xl transition-all duration-300 border-l-4 border-l-orange-500 bg-white/80 backdrop-blur-sm hover:bg-white">
                  <CardHeader>
                    <div className="flex items-center mb-4">
                      <div className="w-14 h-14 bg-gradient-to-br from-orange-100 to-orange-200 rounded-xl flex items-center justify-center mr-4 group-hover:from-orange-500 group-hover:to-orange-600 group-hover:text-white transition-all duration-300">
                        <IconComponent className="h-6 w-6 text-orange-600 group-hover:text-white" />
                      </div>
                      <CardTitle className="text-lg font-bold text-gray-900">{feature.title}</CardTitle>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <p className="text-gray-600 leading-relaxed">
                      {feature.description}
                    </p>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>
      </section>

      {/* About Edfellow - Premium Content */}
      <section className="py-24 px-4 sm:px-6 lg:px-8 bg-white">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-16">
            <Badge className="bg-purple-100 text-purple-700 mb-4 px-4 py-2">About Us</Badge>
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-8">About Edfellow</h2>
          </div>
          
          <div className="prose prose-xl max-w-none">
            <div className="grid md:grid-cols-2 gap-12 items-center mb-16">
              <div>
                <p className="text-lg text-gray-700 leading-relaxed mb-6">
                  Edfellow is a global education platform designed to connect students, professors, and universities 
                  in a meaningful and collaborative way. At its heart, Edfellow breaks down geographic and institutional 
                  barriers to make education more accessible, personalized, and globally connected.
                </p>
                <p className="text-lg text-gray-700 leading-relaxed">
                  Whether you're a student seeking to deepen your knowledge, a professor ready to share your expertise 
                  across borders, or a university aiming to reach a wider international audience—Edfellow brings the 
                  academic world together through mentorship, shared knowledge, and international academic opportunity.
                </p>
              </div>
              <div className="relative">
                <div className="w-full h-64 bg-gradient-to-br from-blue-100 to-purple-100 rounded-2xl flex items-center justify-center">
                  <PlayCircle className="h-16 w-16 text-blue-600" />
                </div>
              </div>
            </div>
            
            <Card className="bg-gradient-to-r from-blue-50 to-purple-50 border-0 p-8">
              <CardContent className="p-0">
                <p className="text-lg text-gray-700 leading-relaxed mb-6">
                  Imagine discussing your major with a student halfway across the world and discovering how your field 
                  is taught, applied, and valued in a completely different cultural and educational context. This kind 
                  of global exchange enriches your academic journey, challenges your thinking, and prepares you for 
                  success in an interconnected world.
                </p>
                <p className="text-lg text-gray-700 leading-relaxed">
                  At Edfellow, we believe education should open minds—and open doors. We're here to help you do both 
                  by building a truly global academic ecosystem that connects hearts, minds, and opportunities across continents.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Trending Programs - Premium Cards */}
      <section className="py-24 px-4 sm:px-6 lg:px-8 bg-gray-50">
        <div className="max-w-6xl mx-auto">
          <div className="flex items-center justify-between mb-12">
            <div>
              <Badge className="bg-orange-100 text-orange-700 mb-4 px-4 py-2">Trending Now</Badge>
              <h2 className="text-4xl font-bold text-gray-900">Featured Programs</h2>
              <p className="text-gray-600 mt-2 text-lg">Discover top-rated programs from leading universities</p>
            </div>
            <Zap className="h-8 w-8 text-orange-500" />
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            {trendingPrograms.map((program) => (
              <Card key={program.id} className="group hover:shadow-2xl transition-all duration-300 border-0 shadow-lg hover:scale-105 overflow-hidden">
                <div className="h-2 bg-gradient-to-r from-orange-500 to-red-500" />
                <CardHeader>
                  <div className="flex justify-between items-start mb-4">
                    <div className="p-3 bg-orange-100 rounded-xl group-hover:bg-orange-500 group-hover:text-white transition-all duration-300">
                      <Building2 className="h-6 w-6 text-orange-600 group-hover:text-white" />
                    </div>
                    <Badge variant="secondary" className="bg-gray-100 text-gray-700">{program.type}</Badge>
                  </div>
                  <CardTitle className="text-xl font-bold text-gray-900">{program.program}</CardTitle>
                  <CardDescription className="font-semibold text-orange-600 text-lg">
                    {program.university}
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="flex items-center text-sm text-gray-600">
                    <MapPin className="h-4 w-4 mr-2" />
                    {program.location}
                  </div>
                  <div className="flex items-center text-sm text-gray-600">
                    <Calendar className="h-4 w-4 mr-2" />
                    Deadline: {program.deadline}
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center text-sm">
                      <Star className="h-4 w-4 text-yellow-500 mr-1" />
                      <span className="font-medium">{program.rating}</span>
                    </div>
                    <Button size="sm" variant="outline" className="group-hover:bg-orange-500 group-hover:text-white group-hover:border-orange-500">
                      Learn More
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Academic Groups - Premium Grid */}
      <section className="py-24 px-4 sm:px-6 lg:px-8 bg-white">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <Badge className="bg-indigo-100 text-indigo-700 mb-4 px-4 py-2">Communities</Badge>
            <h2 className="text-4xl font-bold text-gray-900 mb-6">
              Popular Academic Groups
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Join thousands of students and professors in field-specific communities
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {academicGroups.map((group, index) => (
              <Card key={index} className="group text-center hover:shadow-2xl transition-all duration-300 cursor-pointer hover:scale-105 border-0 shadow-lg bg-gradient-to-br from-white to-gray-50">
                <CardHeader className="pb-4">
                  <div className="text-5xl mb-4 group-hover:scale-110 transition-transform duration-300">{group.icon}</div>
                  <CardTitle className="text-xl font-bold text-gray-900">{group.name}</CardTitle>
                </CardHeader>
                <CardContent>
                  <Badge className={`${group.color} px-3 py-1 text-sm font-semibold mb-3`}>
                    {group.members.toLocaleString()} members
                  </Badge>
                  <p className="text-sm text-gray-600">Active discussions & collaboration</p>
                  <Button size="sm" variant="outline" className="mt-4 w-full group-hover:bg-blue-500 group-hover:text-white group-hover:border-blue-500">
                    Join Community
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials - Premium Design */}
      <section className="py-24 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-gray-50 to-blue-50">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <Badge className="bg-blue-100 text-blue-700 mb-4 px-4 py-2">Success Stories</Badge>
            <h2 className="text-4xl font-bold text-gray-900 mb-6">
              What Our Community Says
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Real stories from students, professors, and universities using Edfellow
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            {testimonials.map((testimonial) => (
              <Card key={testimonial.id} className="hover:shadow-2xl transition-all duration-300 border-0 shadow-lg bg-white">
                <CardContent className="pt-8">
                  <div className="flex items-center mb-6">
                    <div className="w-14 h-14 bg-gradient-to-br from-blue-600 to-purple-600 rounded-full flex items-center justify-center text-white font-bold mr-4 text-lg">
                      {testimonial.avatar}
                    </div>
                    <div>
                      <h4 className="font-bold text-gray-900 text-lg">{testimonial.name}</h4>
                      <p className="text-sm text-gray-600">{testimonial.role}</p>
                    </div>
                  </div>
                  <div className="flex mb-4">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="h-4 w-4 text-yellow-400 fill-current" />
                    ))}
                  </div>
                  <p className="text-gray-700 italic leading-relaxed">"{testimonial.content}"</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section - Premium Gradient */}
      <section className="py-24 px-4 sm:px-6 lg:px-8 bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-600 text-white relative overflow-hidden">
        <div className="absolute inset-0 bg-black/20" />
        <div className="absolute top-0 left-0 w-full h-full">
          <div className="absolute top-20 left-20 w-32 h-32 bg-white/10 rounded-full blur-xl" />
          <div className="absolute bottom-20 right-20 w-48 h-48 bg-white/10 rounded-full blur-2xl" />
        </div>
        
        <div className="relative max-w-5xl mx-auto text-center">
          <Badge className="bg-white/20 text-white mb-6 px-4 py-2 backdrop-blur-sm">
            Join the Movement
          </Badge>
          <h2 className="text-4xl md:text-6xl font-bold mb-8">
            Ready to Join the Global Academic Community?
          </h2>
          <p className="text-xl md:text-2xl mb-12 opacity-90 max-w-3xl mx-auto leading-relaxed">
            Connect with thousands of students, professors, and universities already building their global academic networks.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-6 justify-center mb-8">
            <Button 
              size="lg" 
              onClick={() => navigate('/signup')}
              className="bg-white text-blue-600 hover:bg-gray-100 px-8 py-4 text-lg font-semibold shadow-2xl hover:shadow-white/25 transform hover:scale-105 transition-all duration-200"
            >
              Start Your Global Journey
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
            <Button 
              size="lg" 
              variant="outline"
              onClick={() => navigate('/login')}
              className="border-2 border-white text-white hover:bg-white hover:text-blue-600 px-8 py-4 text-lg font-semibold backdrop-blur-sm"
            >
              Already Have Account?
            </Button>
          </div>
          
          <div className="flex items-center justify-center space-x-2 text-sm opacity-80">
            <Check className="h-4 w-4" />
            <span>Free to join • No credit card required • Start connecting today</span>
          </div>
        </div>
      </section>

      {/* Footer - Premium Design */}
      <footer className="bg-gray-900 text-white py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          <div className="grid md:grid-cols-5 gap-12 mb-12">
            <div className="col-span-2">
              <div className="flex items-center space-x-3 mb-6">
                <div className="p-2 bg-gradient-to-br from-blue-600 to-purple-600 rounded-xl">
                  <GraduationCap className="h-8 w-8 text-white" />
                </div>
                <div>
                  <span className="text-2xl font-bold">Edfellow</span>
                  <p className="text-xs text-gray-400">Where Education Meets the World</p>
                </div>
              </div>
              <p className="text-gray-400 leading-relaxed mb-6">
                Building bridges between students, professors, and universities globally. 
                Empowering education through meaningful connections and collaborative learning.
              </p>
              <div className="flex space-x-4">
                <div className="w-10 h-10 bg-gray-800 rounded-lg flex items-center justify-center hover:bg-blue-600 transition-colors cursor-pointer">
                  <Globe className="h-5 w-5" />
                </div>
                <div className="w-10 h-10 bg-gray-800 rounded-lg flex items-center justify-center hover:bg-blue-600 transition-colors cursor-pointer">
                  <Mail className="h-5 w-5" />
                </div>
              </div>
            </div>
            
            <div>
              <h3 className="text-lg font-semibold mb-6 text-white">Platform</h3>
              <ul className="space-y-3 text-gray-400">
                <li><a href="#" className="hover:text-white transition-colors">For Students</a></li>
                <li><a href="#" className="hover:text-white transition-colors">For Professors</a></li>
                <li><a href="#" className="hover:text-white transition-colors">For Universities</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Global Groups</a></li>
              </ul>
            </div>
            
            <div>
              <h3 className="text-lg font-semibold mb-6 text-white">Resources</h3>
              <ul className="space-y-3 text-gray-400">
                <li><a href="#" className="hover:text-white transition-colors">Help Center</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Global Guidelines</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Success Stories</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Global Blog</a></li>
              </ul>
            </div>
            
            <div>
              <h3 className="text-lg font-semibold mb-6 text-white">Company</h3>
              <ul className="space-y-3 text-gray-400">
                <li><a href="#" className="hover:text-white transition-colors">About Us</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Privacy Policy</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Terms of Service</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Global Contact</a></li>
              </ul>
            </div>
          </div>
          
          <div className="border-t border-gray-800 pt-8 flex flex-col md:flex-row justify-between items-center">
            <p className="text-gray-400 text-center md:text-left mb-4 md:mb-0">
              © 2025 Edfellow. All rights reserved. Where Education Meets the World.
            </p>
            <div className="flex space-x-6">
              <a href="#" className="text-gray-400 hover:text-white transition-colors">Privacy</a>
              <a href="#" className="text-gray-400 hover:text-white transition-colors">Terms</a>
              <a href="#" className="text-gray-400 hover:text-white transition-colors">Global Support</a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
