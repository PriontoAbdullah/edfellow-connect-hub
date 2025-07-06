
import { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
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
  ArrowRight,
  Menu,
  X,
  Target,
  Zap,
  Shield,
  Search,
  Languages,
  TrendingUp,
  Calendar,
  Video,
  FileText,
  CheckCircle,
  UserCheck,
  Building2,
  MapPin,
  Clock,
  Mail,
  Phone
} from 'lucide-react';

const Index = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
    setIsMenuOpen(false);
  };

  const generalFeatures = [
    {
      icon: Search,
      title: "Smart Match",
      description: "AI-powered matching algorithm connects you with the perfect academic opportunities and mentors."
    },
    {
      icon: Languages,
      title: "Multilingual Support",
      description: "Break language barriers with real-time translation and multilingual community support."
    },
    {
      icon: Globe,
      title: "Global Network",
      description: "Connect with over 50,000 students, professors, and universities from 100+ countries worldwide."
    },
    {
      icon: Shield,
      title: "Secure Platform",
      description: "Enterprise-grade security ensures your data and conversations are always protected."
    }
  ];

  const studentFeatures = [
    {
      icon: Target,
      title: "Personalized Learning Paths",
      description: "Get customized recommendations for courses, programs, and career opportunities."
    },
    {
      icon: Users,
      title: "Study Groups",
      description: "Join or create study groups with peers sharing similar academic interests and goals."
    },
    {
      icon: Award,
      title: "Achievement Tracking",
      description: "Monitor your academic progress and celebrate milestones with digital badges."
    },
    {
      icon: MessageSquare,
      title: "Peer Mentorship",
      description: "Connect with senior students and alumni for guidance and career advice."
    }
  ];

  const professorFeatures = [
    {
      icon: UserCheck,
      title: "Student Mentorship",
      description: "Guide and mentor students from around the world in your area of expertise."
    },
    {
      icon: Video,
      title: "Virtual Lectures",
      description: "Host live lectures and webinars for global audiences with interactive features."
    },
    {
      icon: TrendingUp,
      title: "Research Collaboration",
      description: "Collaborate with international colleagues on research projects and publications."
    },
    {
      icon: FileText,
      title: "Resource Sharing",
      description: "Share academic resources, papers, and teaching materials with the community."
    }
  ];

  const universityFeatures = [
    {
      icon: Building2,
      title: "Program Promotion",
      description: "Showcase your academic programs to a global audience of prospective students."
    },
    {
      icon: Calendar,
      title: "Event Management",
      description: "Organize and promote university events, webinars, and information sessions."
    },
    {
      icon: TrendingUp,
      title: "Analytics Dashboard",
      description: "Track engagement metrics and monitor your university's global reach and impact."
    },
    {
      icon: Mail,
      title: "Student Communication",
      description: "Streamlined communication tools for admissions, support, and student engagement."
    }
  ];

  const testimonials = [
    {
      name: "Sarah Chen",
      role: "Computer Science Student",
      country: "Singapore",
      content: "Edfellow helped me connect with amazing mentors and find the perfect PhD program in the US. The platform made my dreams accessible.",
      rating: 5,
      avatar: "SC"
    },
    {
      name: "Dr. Michael Rodriguez",
      role: "Professor of Mathematics",
      country: "Spain",
      content: "I love mentoring bright students from around the world. Edfellow makes it incredibly easy to connect and share knowledge globally.",
      rating: 5,
      avatar: "MR"
    },
    {
      name: "University of Toronto",
      role: "Admissions Office",
      country: "Canada",
      content: "Edfellow has significantly increased our international student applications and improved the quality of our global outreach.",
      rating: 5,
      avatar: "UT"
    }
  ];

  return (
    <div className="min-h-screen bg-white">
      {/* Top Header / Navigation */}
      <nav className="bg-[#0B1B4D] border-b border-blue-800 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-20">
            {/* Logo with Tagline */}
            <div className="flex items-center space-x-4">
              <div className="p-3 bg-gradient-to-br from-[#007BFF] to-blue-600 rounded-xl shadow-lg">
                <GraduationCap className="h-8 w-8 text-white" />
              </div>
              <div>
                <span className="text-2xl font-bold text-white">Edfellow</span>
                <p className="text-sm text-blue-300 font-medium">Where Education Meets the World</p>
              </div>
            </div>

            {/* Desktop Navigation - Only 3 Large Buttons */}
            <div className="hidden md:flex items-center space-x-6">
              <Button 
                onClick={() => scrollToSection('student-section')}
                size="lg" 
                className="bg-[#007BFF] hover:bg-blue-700 text-white px-8 py-3 text-lg font-semibold"
              >
                Student
              </Button>
              <Button 
                onClick={() => scrollToSection('professor-section')}
                size="lg" 
                className="bg-[#007BFF] hover:bg-blue-700 text-white px-8 py-3 text-lg font-semibold"
              >
                Professor
              </Button>
              <Button 
                onClick={() => scrollToSection('university-section')}
                size="lg" 
                className="bg-[#007BFF] hover:bg-blue-700 text-white px-8 py-3 text-lg font-semibold"
              >
                University
              </Button>
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
            <div className="md:hidden py-6 border-t border-blue-800">
              <div className="flex flex-col space-y-4">
                <Button 
                  onClick={() => scrollToSection('student-section')}
                  className="w-full bg-[#007BFF] hover:bg-blue-700 text-white text-lg font-semibold py-3"
                >
                  Student
                </Button>
                <Button 
                  onClick={() => scrollToSection('professor-section')}
                  className="w-full bg-[#007BFF] hover:bg-blue-700 text-white text-lg font-semibold py-3"
                >
                  Professor
                </Button>
                <Button 
                  onClick={() => scrollToSection('university-section')}
                  className="w-full bg-[#007BFF] hover:bg-blue-700 text-white text-lg font-semibold py-3"
                >
                  University
                </Button>
              </div>
            </div>
          )}
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative py-24 px-4 sm:px-6 lg:px-8 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div className="space-y-10">
              <div className="space-y-8">
                <h1 className="text-5xl lg:text-6xl font-bold text-slate-900 leading-tight">
                  Unlock Knowledge, Opportunity, and 
                  <span className="text-[#007BFF] block">Connection—Globally</span>
                </h1>
                <p className="text-xl text-slate-600 leading-relaxed max-w-2xl">
                  Join the world's most comprehensive educational network connecting students, professors, and universities across the globe.
                </p>
              </div>

              <div className="flex justify-start">
                <Link to="/signup">
                  <Button size="lg" className="bg-[#007BFF] hover:bg-blue-700 text-white shadow-xl px-12 py-6 text-xl font-semibold">
                    Get Started
                    <ArrowRight className="ml-3 h-6 w-6" />
                  </Button>
                </Link>
              </div>

              {/* Stats */}
              <div className="grid grid-cols-3 gap-8 pt-8">
                <div className="text-center">
                  <div className="text-4xl font-bold text-slate-900">50k+</div>
                  <div className="text-sm text-slate-600 font-medium mt-2">Active Students</div>
                </div>
                <div className="text-center">
                  <div className="text-4xl font-bold text-slate-900">2k+</div>
                  <div className="text-sm text-slate-600 font-medium mt-2">Expert Mentors</div>
                </div>
                <div className="text-center">
                  <div className="text-4xl font-bold text-slate-900">100+</div>
                  <div className="text-sm text-slate-600 font-medium mt-2">Universities</div>
                </div>
              </div>
            </div>

            {/* Animated Globe with Icons */}
            <div className="relative flex justify-center">
              <div className="relative">
                <div className="w-96 h-96 bg-gradient-to-br from-[#007BFF] to-blue-600 rounded-full shadow-2xl flex items-center justify-center">
                  <Globe className="h-48 w-48 text-white opacity-90 animate-spin" style={{ animationDuration: '20s' }} />
                </div>
                {/* Floating Academic Icons */}
                <div className="absolute -top-8 -right-8 p-4 bg-white rounded-xl shadow-lg animate-bounce" style={{ animationDelay: '0s' }}>
                  <BookOpen className="h-8 w-8 text-[#007BFF]" />
                </div>
                <div className="absolute -bottom-8 -left-8 p-4 bg-white rounded-xl shadow-lg animate-bounce" style={{ animationDelay: '1s' }}>
                  <MessageSquare className="h-8 w-8 text-[#007BFF]" />
                </div>
                <div className="absolute top-1/2 -left-16 p-4 bg-white rounded-xl shadow-lg animate-bounce" style={{ animationDelay: '2s' }}>
                  <Users className="h-8 w-8 text-[#007BFF]" />
                </div>
                <div className="absolute top-1/4 -right-12 p-4 bg-white rounded-xl shadow-lg animate-bounce" style={{ animationDelay: '1.5s' }}>
                  <GraduationCap className="h-8 w-8 text-[#007BFF]" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Website Description Block */}
      <section className="py-20 bg-gradient-to-br from-blue-50 to-white">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="space-y-8">
            <h2 className="text-3xl font-bold text-slate-900 mb-8">About Edfellow</h2>
            <div className="space-y-6 text-lg text-slate-700 leading-relaxed">
              <p>
                Edfellow is a global educational network that brings students, professors, and universities together in one comprehensive platform. We believe that education should transcend geographical boundaries and create meaningful connections that last a lifetime.
              </p>
              <p>
                Our mission is to democratize access to quality education by connecting learners with the right mentors, programs, and opportunities worldwide. Whether you're a student seeking guidance, a professor wanting to share knowledge, or a university looking to expand your global reach, Edfellow provides the tools and community to make it happen.
              </p>
              <p>
                Join thousands of educators and learners from over 100 countries who are already building the future of global education together. Experience personalized learning, meaningful mentorship, and academic opportunities that match your goals and aspirations.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Audience-Based Value Section */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center space-y-6 mb-20">
            <h2 className="text-4xl font-bold text-slate-900">Built for Every Educational Journey</h2>
            <p className="text-xl text-slate-600 max-w-3xl mx-auto">
              Discover how Edfellow empowers each member of the global academic community
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-12">
            {/* Student Section */}
            <div id="student-section" className="text-center space-y-6 p-8 bg-gradient-to-br from-blue-50 to-white rounded-2xl border border-blue-100">
              <div className="p-6 bg-[#007BFF] rounded-full w-fit mx-auto">
                <GraduationCap className="h-12 w-12 text-white" />
              </div>
              <h3 className="text-2xl font-bold text-slate-900">For Students</h3>
              <p className="text-lg text-slate-600 leading-relaxed">
                "Your Gateway to Global Learning"
              </p>
              <p className="text-base text-slate-600">
                Connect with mentors, discover programs worldwide, join study groups, and build a network that will support your academic and career growth for years to come.
              </p>
              <Link to="/signup">
                <Button className="bg-[#007BFF] hover:bg-blue-700 text-white px-8 py-3 text-lg font-semibold">
                  Explore as Student
                </Button>
              </Link>
            </div>

            {/* Professor Section */}
            <div id="professor-section" className="text-center space-y-6 p-8 bg-gradient-to-br from-blue-50 to-white rounded-2xl border border-blue-100">
              <div className="p-6 bg-[#007BFF] rounded-full w-fit mx-auto">
                <Users className="h-12 w-12 text-white" />
              </div>
              <h3 className="text-2xl font-bold text-slate-900">For Professors</h3>
              <p className="text-lg text-slate-600 leading-relaxed">
                "Shape Minds Across Continents"
              </p>
              <p className="text-base text-slate-600">
                Mentor students globally, collaborate on research, share your expertise through virtual lectures, and make a lasting impact on the next generation of learners.
              </p>
              <Link to="/signup">
                <Button className="bg-[#007BFF] hover:bg-blue-700 text-white px-8 py-3 text-lg font-semibold">
                  Explore as Professor
                </Button>
              </Link>
            </div>

            {/* University Section */}
            <div id="university-section" className="text-center space-y-6 p-8 bg-gradient-to-br from-blue-50 to-white rounded-2xl border border-blue-100">
              <div className="p-6 bg-[#007BFF] rounded-full w-fit mx-auto">
                <Building2 className="h-12 w-12 text-white" />
              </div>
              <h3 className="text-2xl font-bold text-slate-900">For Universities</h3>
              <p className="text-lg text-slate-600 leading-relaxed">
                "Expand Your Global Reach"
              </p>
              <p className="text-base text-slate-600">
                Showcase your programs to international students, host virtual events, streamline admissions communication, and build partnerships with institutions worldwide.
              </p>
              <Link to="/signup">
                <Button className="bg-[#007BFF] hover:bg-blue-700 text-white px-8 py-3 text-lg font-semibold">
                  Explore as University
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Highlighted Features Section */}
      <section className="py-24 bg-gradient-to-br from-slate-50 to-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center space-y-6 mb-20">
            <h2 className="text-4xl font-bold text-slate-900">Powerful Features for Global Education</h2>
            <p className="text-xl text-slate-600 max-w-3xl mx-auto">
              Discover the comprehensive tools and features designed to enhance your educational journey
            </p>
          </div>

          <Tabs defaultValue="general" className="w-full">
            <TabsList className="grid w-full grid-cols-4 mb-12 bg-slate-100">
              <TabsTrigger value="general" className="data-[state=active]:bg-[#007BFF] data-[state=active]:text-white">
                🌐 General Features
              </TabsTrigger>
              <TabsTrigger value="student" className="data-[state=active]:bg-[#007BFF] data-[state=active]:text-white">
                🧑‍🎓 For Students
              </TabsTrigger>
              <TabsTrigger value="professor" className="data-[state=active]:bg-[#007BFF] data-[state=active]:text-white">
                👨‍🏫 For Professors
              </TabsTrigger>
              <TabsTrigger value="university" className="data-[state=active]:bg-[#007BFF] data-[state=active]:text-white">
                🏛️ For Universities
              </TabsTrigger>
            </TabsList>

            <TabsContent value="general">
              <div className="grid md:grid-cols-2 gap-8">
                {generalFeatures.map((feature, index) => (
                  <Card key={index} className="border-slate-200 hover:shadow-lg transition-shadow bg-white">
                    <CardHeader className="pb-4">
                      <div className="p-4 bg-blue-100 rounded-xl w-fit mb-4">
                        <feature.icon className="h-8 w-8 text-[#007BFF]" />
                      </div>
                      <CardTitle className="text-xl text-slate-900">{feature.title}</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <CardDescription className="text-base text-slate-600 leading-relaxed">
                        {feature.description}
                      </CardDescription>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </TabsContent>

            <TabsContent value="student">
              <div className="grid md:grid-cols-2 gap-8">
                {studentFeatures.map((feature, index) => (
                  <Card key={index} className="border-slate-200 hover:shadow-lg transition-shadow bg-white">
                    <CardHeader className="pb-4">
                      <div className="p-4 bg-blue-100 rounded-xl w-fit mb-4">
                        <feature.icon className="h-8 w-8 text-[#007BFF]" />
                      </div>
                      <CardTitle className="text-xl text-slate-900">{feature.title}</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <CardDescription className="text-base text-slate-600 leading-relaxed">
                        {feature.description}
                      </CardDescription>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </TabsContent>

            <TabsContent value="professor">
              <div className="grid md:grid-cols-2 gap-8">
                {professorFeatures.map((feature, index) => (
                  <Card key={index} className="border-slate-200 hover:shadow-lg transition-shadow bg-white">
                    <CardHeader className="pb-4">
                      <div className="p-4 bg-blue-100 rounded-xl w-fit mb-4">
                        <feature.icon className="h-8 w-8 text-[#007BFF]" />
                      </div>
                      <CardTitle className="text-xl text-slate-900">{feature.title}</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <CardDescription className="text-base text-slate-600 leading-relaxed">
                        {feature.description}
                      </CardDescription>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </TabsContent>

            <TabsContent value="university">
              <div className="grid md:grid-cols-2 gap-8">
                {universityFeatures.map((feature, index) => (
                  <Card key={index} className="border-slate-200 hover:shadow-lg transition-shadow bg-white">
                    <CardHeader className="pb-4">
                      <div className="p-4 bg-blue-100 rounded-xl w-fit mb-4">
                        <feature.icon className="h-8 w-8 text-[#007BFF]" />
                      </div>
                      <CardTitle className="text-xl text-slate-900">{feature.title}</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <CardDescription className="text-base text-slate-600 leading-relaxed">
                        {feature.description}
                      </CardDescription>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center space-y-6 mb-20">
            <h2 className="text-4xl font-bold text-slate-900">Trusted by Global Educational Community</h2>
            <p className="text-xl text-slate-600 max-w-3xl mx-auto">
              See what students, professors, and universities say about their experience with Edfellow
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <Card key={index} className="border-slate-200 bg-gradient-to-br from-blue-50 to-white shadow-lg hover:shadow-xl transition-shadow">
                <CardHeader className="pb-4">
                  <div className="flex items-center space-x-4">
                    <Avatar className="h-16 w-16">
                      <AvatarFallback className="bg-[#007BFF] text-white text-lg font-bold">
                        {testimonial.avatar}
                      </AvatarFallback>
                    </Avatar>
                    <div>
                      <CardTitle className="text-lg text-slate-900">{testimonial.name}</CardTitle>
                      <CardDescription className="text-sm font-medium">
                        {testimonial.role} • {testimonial.country}
                      </CardDescription>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex">
                      {[...Array(testimonial.rating)].map((_, i) => (
                        <Star key={i} className="h-5 w-5 text-yellow-400 fill-current" />
                      ))}
                    </div>
                    <p className="text-slate-700 italic text-base leading-relaxed">"{testimonial.content}"</p>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Call-to-Action Block */}
      <section className="py-24 bg-gradient-to-r from-[#007BFF] to-blue-700">
        <div className="max-w-5xl mx-auto text-center px-4 sm:px-6 lg:px-8">
          <div className="space-y-10">
            <h2 className="text-4xl font-bold text-white">
              Ready to Connect with the World of Education?
            </h2>
            <p className="text-xl text-blue-100 max-w-3xl mx-auto leading-relaxed">
              Join thousands of students, professors, and universities who are already building the future of global education together.
            </p>
            <div className="flex flex-col sm:flex-row gap-6 justify-center">
              <Link to="/signup">
                <Button size="lg" className="bg-white text-[#007BFF] hover:bg-blue-50 shadow-xl px-10 py-4 text-lg font-semibold">
                  Join as Student
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              </Link>
              <Link to="/signup">
                <Button size="lg" variant="outline" className="border-2 border-white text-white hover:bg-white/10 px-10 py-4 text-lg font-semibold">
                  Join as Professor
                </Button>
              </Link>
              <Link to="/signup">
                <Button size="lg" variant="outline" className="border-2 border-white text-white hover:bg-white/10 px-10 py-4 text-lg font-semibold">
                  Join as University
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Landing Page Footer */}
      <LandingFooter />
    </div>
  );
};

export default Index;
