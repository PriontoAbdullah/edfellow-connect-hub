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
  Mail
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

  const howItWorksSteps = [
    {
      icon: User,
      title: "Build Your Global Profile",
      description: "Create a comprehensive verified profile showcasing your expertise, interests, and educational background to connect worldwide."
    },
    {
      icon: Globe,
      title: "Join Global Academic Communities", 
      description: "Connect with peers and experts in your field through specialized international groups and participate in meaningful global discussions."
    },
    {
      icon: MessageSquare,
      title: "Collaborate & Learn Globally",
      description: "Message, video call, and collaborate with professors, students, and professionals across continents to advance your academic journey."
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
              <Badge variant="outline" className="text-xs font-medium">
                Where Education Meets the World
              </Badge>
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
        <div className="max-w-5xl mx-auto text-center">
          <div className="mb-6">
            <Badge className="bg-blue-100 text-blue-700 mb-4">
              Where Education Meets the World
            </Badge>
          </div>
          <h1 className="text-5xl md:text-7xl font-bold text-gray-900 mb-6">
            Unlock Knowledge, <span className="text-blue-600">Opportunity</span>, and <span className="text-purple-600">Connection</span>—Globally
          </h1>
          <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto leading-relaxed">
            Edfellow is a global educational network that brings students, professors, and universities together. 
            Learn, mentor, collaborate, and grow beyond borders in a truly interconnected academic ecosystem.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-8">
            <Button 
              size="lg" 
              onClick={() => navigate('/signup')}
              className="bg-blue-600 hover:bg-blue-700 px-8 py-4 text-lg"
            >
              👨‍🎓 Connect Globally. Learn Locally. Lead Universally.
            </Button>
            <Button 
              size="lg" 
              variant="outline"
              onClick={() => navigate('/signup')}
              className="px-8 py-4 text-lg border-green-600 text-green-600 hover:bg-green-50"
            >
              👩‍🏫 Teach Globally. Mentor Personally. Inspire Endlessly.
            </Button>
          </div>
          <Button 
            size="lg" 
            variant="outline"
            onClick={() => navigate('/signup')}
            className="px-8 py-4 text-lg border-orange-600 text-orange-600 hover:bg-orange-50"
          >
            🏛️ Expand Your Campus. Reach the World
          </Button>
          <div className="mt-12 text-sm text-gray-500">
            Trusted by students, professors, and universities from 50+ countries
          </div>
        </div>
      </section>

      {/* Vision & Mission */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-gradient-to-r from-blue-600 to-purple-600 text-white">
        <div className="max-w-6xl mx-auto">
          <div className="grid md:grid-cols-2 gap-12">
            <div>
              <div className="flex items-center mb-4">
                <Target className="h-8 w-8 mr-3" />
                <h2 className="text-3xl font-bold">Our Vision</h2>
              </div>
              <p className="text-lg opacity-90 leading-relaxed">
                To create a borderless global education ecosystem where students, professors, and universities 
                collaborate seamlessly—unlocking knowledge, expanding opportunities, and shaping the future of 
                learning and careers worldwide.
              </p>
            </div>
            <div>
              <div className="flex items-center mb-4">
                <Heart className="h-8 w-8 mr-3" />
                <h2 className="text-3xl font-bold">Our Mission</h2>
              </div>
              <p className="text-lg opacity-90 leading-relaxed">
                Edfellow empowers learners and educators by connecting them across continents through mentorship, 
                shared knowledge, and accessible academic opportunities. We facilitate meaningful collaborations 
                that enrich education, foster career growth, and build a diverse, global academic community.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* General Features */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-white">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold text-center text-gray-900 mb-4">
            Core Platform Features
          </h2>
          <p className="text-center text-gray-600 mb-12 max-w-2xl mx-auto">
            Powerful tools designed to connect and empower the global academic community
          </p>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {generalFeatures.map((feature, index) => {
              const IconComponent = feature.icon;
              return (
                <Card key={index} className="text-center hover:shadow-lg transition-shadow">
                  <CardHeader>
                    <div className="mx-auto w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mb-4">
                      <IconComponent className="h-8 w-8 text-blue-600" />
                    </div>
                    <CardTitle className="text-lg">{feature.title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-gray-600 text-sm">
                      {feature.description}
                    </p>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>
      </section>

      {/* Student Features */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-blue-50">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <div className="inline-flex items-center bg-blue-600 text-white px-6 py-3 rounded-full mb-4">
              <GraduationCap className="h-6 w-6 mr-2" />
              <span className="font-semibold">For Students</span>
            </div>
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Connect Globally. Learn Locally. Lead Universally.
            </h2>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {studentFeatures.map((feature, index) => {
              const IconComponent = feature.icon;
              return (
                <Card key={index} className="hover:shadow-lg transition-shadow border-l-4 border-l-blue-500">
                  <CardHeader>
                    <div className="flex items-center mb-4">
                      <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mr-4">
                        <IconComponent className="h-6 w-6 text-blue-600" />
                      </div>
                      <CardTitle className="text-lg">{feature.title}</CardTitle>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <p className="text-gray-600 text-sm">
                      {feature.description}
                    </p>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>
      </section>

      {/* Professor Features */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-green-50">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <div className="inline-flex items-center bg-green-600 text-white px-6 py-3 rounded-full mb-4">
              <BookOpen className="h-6 w-6 mr-2" />
              <span className="font-semibold">For Professors</span>
            </div>
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Teach Globally. Mentor Personally. Inspire Endlessly.
            </h2>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {professorFeatures.map((feature, index) => {
              const IconComponent = feature.icon;
              return (
                <Card key={index} className="hover:shadow-lg transition-shadow border-l-4 border-l-green-500">
                  <CardHeader>
                    <div className="flex items-center mb-4">
                      <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mr-4">
                        <IconComponent className="h-6 w-6 text-green-600" />
                      </div>
                      <CardTitle className="text-lg">{feature.title}</CardTitle>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <p className="text-gray-600 text-sm">
                      {feature.description}
                    </p>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>
      </section>

      {/* University Features */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-orange-50">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <div className="inline-flex items-center bg-orange-600 text-white px-6 py-3 rounded-full mb-4">
              <Building2 className="h-6 w-6 mr-2" />
              <span className="font-semibold">For Universities</span>
            </div>
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Expand Your Campus. Reach the World
            </h2>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {universityFeatures.map((feature, index) => {
              const IconComponent = feature.icon;
              return (
                <Card key={index} className="hover:shadow-lg transition-shadow border-l-4 border-l-orange-500">
                  <CardHeader>
                    <div className="flex items-center mb-4">
                      <div className="w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center mr-4">
                        <IconComponent className="h-6 w-6 text-orange-600" />
                      </div>
                      <CardTitle className="text-lg">{feature.title}</CardTitle>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <p className="text-gray-600 text-sm">
                      {feature.description}
                    </p>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold text-center text-gray-900 mb-4">
            How Edfellow Works
          </h2>
          <p className="text-center text-gray-600 mb-12 max-w-2xl mx-auto">
            Connect with the global academic community through our simple three-step process
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

      {/* About Edfellow */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-gray-50">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl font-bold text-gray-900 mb-6">About Edfellow</h2>
          <div className="space-y-6 text-lg text-gray-700 leading-relaxed">
            <p>
              Edfellow is a global education platform designed to connect students, professors, and universities 
              in a meaningful and collaborative way. At its heart, Edfellow breaks down geographic and institutional 
              barriers to make education more accessible, personalized, and globally connected.
            </p>
            <p>
              Whether you're a student seeking to deepen your knowledge, a professor ready to share your expertise 
              across borders, or a university aiming to reach a wider international audience—Edfellow brings the 
              academic world together through mentorship, shared knowledge, and international academic opportunity.
            </p>
            <p>
              Imagine discussing your major with a student halfway across the world and discovering how your field 
              is taught, applied, and valued in a completely different cultural and educational context. This kind 
              of global exchange enriches your academic journey, challenges your thinking, and prepares you for 
              success in an interconnected world.
            </p>
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
            Ready to Join the Global Academic Community?
          </h2>
          <p className="text-xl mb-8 opacity-90">
            Connect with thousands of students, professors, and universities already building their global academic networks.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button 
              size="lg" 
              onClick={() => navigate('/signup')}
              className="bg-white text-blue-600 hover:bg-gray-100 px-8 py-3"
            >
              Start Your Global Journey
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
                Where Education Meets the World. Building bridges between students, professors, and universities globally.
              </p>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-4">Platform</h3>
              <ul className="space-y-2 text-gray-400">
                <li><a href="#" className="hover:text-white">For Students</a></li>
                <li><a href="#" className="hover:text-white">For Professors</a></li>
                <li><a href="#" className="hover:text-white">For Universities</a></li>
                <li><a href="#" className="hover:text-white">Global Groups</a></li>
              </ul>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-4">Resources</h3>
              <ul className="space-y-2 text-gray-400">
                <li><a href="#" className="hover:text-white">Help Center</a></li>
                <li><a href="#" className="hover:text-white">Global Guidelines</a></li>
                <li><a href="#" className="hover:text-white">Success Stories</a></li>
                <li><a href="#" className="hover:text-white">Global Blog</a></li>
              </ul>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-4">Company</h3>
              <ul className="space-y-2 text-gray-400">
                <li><a href="#" className="hover:text-white">About Us</a></li>
                <li><a href="#" className="hover:text-white">Privacy Policy</a></li>
                <li><a href="#" className="hover:text-white">Terms of Service</a></li>
                <li><a href="#" className="hover:text-white">Global Contact</a></li>
              </ul>
            </div>
          </div>
          <div className="border-t border-gray-800 mt-8 pt-8 flex flex-col md:flex-row justify-between items-center">
            <p className="text-gray-400 text-center md:text-left">
              © 2025 Edfellow. All rights reserved. Where Education Meets the World.
            </p>
            <div className="flex space-x-6 mt-4 md:mt-0">
              <a href="#" className="text-gray-400 hover:text-white">Privacy</a>
              <a href="#" className="text-gray-400 hover:text-white">Terms</a>
              <a href="#" className="text-gray-400 hover:text-white">Global Support</a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
