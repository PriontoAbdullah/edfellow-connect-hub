
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  GraduationCap, 
  ArrowRight, 
  Users, 
  Globe, 
  MessageSquare, 
  Calendar,
  BookOpen,
  Award,
  Target,
  Building2,
  Lightbulb,
  Shield,
  CheckCircle,
  Star,
  Video,
  Search,
  BarChart3
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const Features = () => {
  const navigate = useNavigate();

  const generalFeatures = [
    {
      icon: Search,
      title: "Smart Match System",
      description: "Connect instantly with students, professors, and universities aligned with your interests and goals."
    },
    {
      icon: Globe,
      title: "Global Community Hub",
      description: "Join discussions, ask questions, and collaborate across borders in your field of study."
    },
    {
      icon: MessageSquare,
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
      title: "Integrated Calendar & Booking System",
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
      icon: Star,
      title: "Mentor Marketplace",
      description: "Find and book expert professors for guidance, academic help, or admission support."
    },
    {
      icon: Target,
      title: "Career Exploration Center",
      description: "Learn what it takes to succeed in your field—skills, job markets, pathways."
    },
    {
      icon: Award,
      title: "Digital Portfolio Builder",
      description: "Showcase your work, research, and achievements to professors and universities worldwide."
    },
    {
      icon: Globe,
      title: "Global Scholarship & Internship Board",
      description: "Access curated opportunities across countries, tailored to your interests."
    }
  ];

  const professorFeatures = [
    {
      icon: BarChart3,
      title: "Mentorship Dashboard",
      description: "Track student bookings, sessions, feedback, and income in one clean interface."
    },
    {
      icon: BookOpen,
      title: "Global Course Builder",
      description: "Design and deliver your own online courses to students anywhere in the world."
    },
    {
      icon: Users,
      title: "Research Assistant Portal",
      description: "Post assistantship openings and build virtual research teams."
    },
    {
      icon: Lightbulb,
      title: "Admission & Academic Advisory Tools",
      description: "Offer admission guidance and structured counseling packages."
    },
    {
      icon: Star,
      title: "Professional Profile & Promotion Tools",
      description: "Build visibility with a public profile, course ratings, and featured listings."
    }
  ];

  const universityFeatures = [
    {
      icon: BarChart3,
      title: "Institution Dashboard",
      description: "Track applications, leads, student engagement, and alumni activity."
    },
    {
      icon: Award,
      title: "Program Promotion Tools",
      description: "Create immersive profiles for degrees, certificates, and study-abroad programs."
    },
    {
      icon: Search,
      title: "Student Recruitment Suite",
      description: "Target and communicate with potential students worldwide based on interests and qualifications."
    },
    {
      icon: Users,
      title: "Professor Recruitment",
      description: "Connect with academic professionals and expand your faculty network globally."
    },
    {
      icon: Globe,
      title: "Alumni Engagement Network",
      description: "Visual alumni map, communication tools, and engagement metrics."
    },
    {
      icon: Video,
      title: "Live Info Sessions & Webinars",
      description: "Host live virtual sessions to promote programs and answer student questions."
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50/20 via-blue-50/10 to-purple-50/20">
      {/* Header */}
      <header className="sticky top-0 z-50 backdrop-blur-xl bg-white/95 border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16 sm:h-20">
            <div className="flex items-center space-x-3 sm:space-x-4">
              <div className="p-2 sm:p-2.5 bg-gradient-to-br from-blue-600 to-purple-600 rounded-xl shadow-lg">
                <GraduationCap className="h-6 w-6 sm:h-8 sm:w-8 text-white" />
              </div>
              <div>
                <h1 className="text-2xl sm:text-3xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                  Edfellow
                </h1>
                <p className="text-xs sm:text-sm text-gray-600 font-medium -mt-1">Where Education Meets the World</p>
              </div>
            </div>
            
            <nav className="hidden md:flex items-center space-x-8">
              <a href="#" onClick={() => navigate('/')} className="text-gray-600 hover:text-gray-900 transition-colors">Home</a>
              <a href="#" onClick={() => navigate('/about')} className="text-gray-600 hover:text-gray-900 transition-colors">About</a>
              <a href="#" onClick={() => navigate('/community')} className="text-gray-600 hover:text-gray-900 transition-colors">Community</a>
            </nav>
            
            <div className="flex items-center space-x-2 sm:space-x-4">
              <Button 
                variant="ghost" 
                onClick={() => navigate('/login')}
                className="text-gray-700 hover:text-gray-900"
              >
                Sign In
              </Button>
              <Button 
                onClick={() => navigate('/signup')}
                className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 shadow-lg px-4 sm:px-6"
              >
                Get Started
              </Button>
            </div>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative py-16 sm:py-24 px-4 sm:px-6 lg:px-8">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-50/30 via-white to-purple-50/30" />
        <div className="relative max-w-4xl mx-auto text-center">
          <Badge className="bg-gradient-to-r from-blue-100 to-purple-100 text-blue-700 border-blue-200 mb-6 sm:mb-8 px-4 sm:px-6 py-2 sm:py-3 text-sm font-semibold">
            <Lightbulb className="mr-2 h-4 w-4" />
            Powerful Features
          </Badge>
          <h2 className="text-4xl sm:text-5xl md:text-6xl font-bold text-gray-900 mb-6 sm:mb-8">
            Everything You Need for{" "}
            <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              Global Education
            </span>
          </h2>
          <p className="text-lg sm:text-xl text-gray-600 mb-8 sm:mb-12 leading-relaxed">
            Discover the comprehensive suite of tools designed to connect, educate, and empower 
            the global academic community.
          </p>
        </div>
      </section>

      {/* General Features */}
      <section className="py-16 sm:py-20 px-4 sm:px-6 lg:px-8 bg-white/30 backdrop-blur-sm">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12 sm:mb-16">
            <h3 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-6">Core Platform Features</h3>
            <p className="text-lg sm:text-xl text-gray-600">Foundation tools that power every connection</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            {generalFeatures.map((feature, index) => (
              <Card key={index} className="border-0 shadow-lg hover:shadow-xl transition-all duration-300 bg-white/80 backdrop-blur-sm hover:scale-105">
                <CardHeader className="p-6 sm:p-8">
                  <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-blue-600 to-purple-600 rounded-2xl mb-4">
                    <feature.icon className="h-8 w-8 text-white" />
                  </div>
                  <CardTitle className="text-xl sm:text-2xl font-bold text-gray-900 mb-3">{feature.title}</CardTitle>
                  <CardDescription className="text-gray-600 text-sm sm:text-base leading-relaxed">
                    {feature.description}
                  </CardDescription>
                </CardHeader>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Role-Specific Features */}
      <section className="py-16 sm:py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12 sm:mb-16">
            <h3 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-6">Tailored for Your Role</h3>
            <p className="text-lg sm:text-xl text-gray-600">Specialized features designed for each member of our community</p>
          </div>

          <Tabs defaultValue="students" className="w-full">
            <TabsList className="grid w-full grid-cols-3 mb-8 sm:mb-12 bg-white/50 backdrop-blur-sm border border-gray-200">
              <TabsTrigger value="students" className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-blue-600 data-[state=active]:to-purple-600 data-[state=active]:text-white">
                <GraduationCap className="h-4 w-4 mr-2" />
                Students
              </TabsTrigger>
              <TabsTrigger value="professors" className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-green-600 data-[state=active]:to-emerald-600 data-[state=active]:text-white">
                <BookOpen className="h-4 w-4 mr-2" />
                Professors
              </TabsTrigger>
              <TabsTrigger value="universities" className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-orange-600 data-[state=active]:to-amber-600 data-[state=active]:text-white">
                <Building2 className="h-4 w-4 mr-2" />
                Universities
              </TabsTrigger>
            </TabsList>

            <TabsContent value="students" className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
                {studentFeatures.map((feature, index) => (
                  <Card key={index} className="border-0 shadow-lg hover:shadow-xl transition-all duration-300 bg-white/80 backdrop-blur-sm hover:scale-105">
                    <CardHeader className="p-6 sm:p-8">
                      <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-blue-600 to-purple-600 rounded-2xl mb-4">
                        <feature.icon className="h-8 w-8 text-white" />
                      </div>
                      <CardTitle className="text-xl sm:text-2xl font-bold text-gray-900 mb-3">{feature.title}</CardTitle>
                      <CardDescription className="text-gray-600 text-sm sm:text-base leading-relaxed">
                        {feature.description}
                      </CardDescription>
                    </CardHeader>
                  </Card>
                ))}
              </div>
            </TabsContent>

            <TabsContent value="professors" className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
                {professorFeatures.map((feature, index) => (
                  <Card key={index} className="border-0 shadow-lg hover:shadow-xl transition-all duration-300 bg-white/80 backdrop-blur-sm hover:scale-105">
                    <CardHeader className="p-6 sm:p-8">
                      <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-green-600 to-emerald-600 rounded-2xl mb-4">
                        <feature.icon className="h-8 w-8 text-white" />
                      </div>
                      <CardTitle className="text-xl sm:text-2xl font-bold text-gray-900 mb-3">{feature.title}</CardTitle>
                      <CardDescription className="text-gray-600 text-sm sm:text-base leading-relaxed">
                        {feature.description}
                      </CardDescription>
                    </CardHeader>
                  </Card>
                ))}
              </div>
            </TabsContent>

            <TabsContent value="universities" className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
                {universityFeatures.map((feature, index) => (
                  <Card key={index} className="border-0 shadow-lg hover:shadow-xl transition-all duration-300 bg-white/80 backdrop-blur-sm hover:scale-105">
                    <CardHeader className="p-6 sm:p-8">
                      <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-orange-600 to-amber-600 rounded-2xl mb-4">
                        <feature.icon className="h-8 w-8 text-white" />
                      </div>
                      <CardTitle className="text-xl sm:text-2xl font-bold text-gray-900 mb-3">{feature.title}</CardTitle>
                      <CardDescription className="text-gray-600 text-sm sm:text-base leading-relaxed">
                        {feature.description}
                      </CardDescription>
                    </CardHeader>
                  </Card>
                ))}
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 sm:py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-600 text-white">
        <div className="max-w-4xl mx-auto text-center">
          <h3 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-6">
            Ready to Experience These Features?
          </h3>
          <p className="text-lg sm:text-xl mb-8 sm:mb-12 opacity-90">
            Join thousands who are already transforming their educational journey with Edfellow.
          </p>
          
          <Button 
            size="lg" 
            onClick={() => navigate('/signup')}
            className="bg-white text-blue-600 hover:bg-gray-100 px-8 sm:px-12 py-3 sm:py-4 text-base sm:text-lg font-semibold shadow-2xl transform hover:scale-105 transition-all duration-200"
          >
            Start Your Journey
            <ArrowRight className="ml-2 h-4 sm:h-5 w-4 sm:w-5" />
          </Button>
          
          <div className="flex items-center justify-center space-x-2 text-sm opacity-80 mt-6 sm:mt-8">
            <CheckCircle className="h-4 w-4" />
            <span>Free to join • No credit card required</span>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12 sm:py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8 sm:gap-12 mb-8 sm:mb-12">
            <div className="col-span-1 sm:col-span-2">
              <div className="flex items-center space-x-3 mb-4 sm:mb-6">
                <div className="p-2 bg-gradient-to-br from-blue-600 to-purple-600 rounded-xl">
                  <GraduationCap className="h-6 sm:h-8 w-6 sm:w-8 text-white" />
                </div>
                <div>
                  <span className="text-xl sm:text-2xl font-bold">Edfellow</span>
                  <p className="text-xs text-gray-400">Where Education Meets the World</p>
                </div>
              </div>
              <p className="text-gray-400 leading-relaxed mb-4 sm:mb-6 max-w-md text-sm sm:text-base">
                Building bridges between students, professors, and universities globally. 
                Empowering education through meaningful connections.
              </p>
            </div>
            
            <div>
              <h4 className="text-base sm:text-lg font-semibold mb-4 sm:mb-6 text-white">Platform</h4>
              <ul className="space-y-2 sm:space-y-3 text-gray-400 text-sm sm:text-base">
                <li><a href="#" className="hover:text-white transition-colors">For Students</a></li>
                <li><a href="#" className="hover:text-white transition-colors">For Professors</a></li>
                <li><a href="#" className="hover:text-white transition-colors">For Universities</a></li>
              </ul>
            </div>
            
            <div>
              <h4 className="text-base sm:text-lg font-semibold mb-4 sm:mb-6 text-white">Company</h4>
              <ul className="space-y-2 sm:space-y-3 text-gray-400 text-sm sm:text-base">
                <li><a href="#" onClick={() => navigate('/about')} className="hover:text-white transition-colors">About</a></li>
                <li><a href="#" onClick={() => navigate('/features')} className="hover:text-white transition-colors">Features</a></li>
                <li><a href="#" onClick={() => navigate('/community')} className="hover:text-white transition-colors">Community</a></li>
              </ul>
            </div>
          </div>
          
          <div className="border-t border-gray-800 pt-6 sm:pt-8 text-center">
            <p className="text-gray-400 text-sm sm:text-base">
              © 2025 Edfellow. All rights reserved.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Features;
