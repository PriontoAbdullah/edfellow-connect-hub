
import { useState } from 'react';
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
  ArrowRight,
  Menu,
  X,
  Target,
  Zap,
  Shield
} from 'lucide-react';

const Index = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const features = [
    {
      icon: Users,
      title: "Global Academic Groups",
      description: "Join subject-specific groups with students and professors worldwide."
    },
    {
      icon: Heart,
      title: "Expert Mentorship",
      description: "Connect with experienced professors for personalized guidance."
    },
    {
      icon: Globe,
      title: "International Programs",
      description: "Discover and apply to programs from top universities globally."
    },
    {
      icon: MessageSquare,
      title: "Real-time Communication",
      description: "Chat seamlessly with peers and mentors across time zones."
    },
    {
      icon: Award,
      title: "Achievement Tracking",
      description: "Monitor your academic progress and celebrate milestones."
    },
    {
      icon: Shield,
      title: "Secure Platform",
      description: "Your data and conversations are protected with enterprise-grade security."
    }
  ];

  const testimonials = [
    {
      name: "Sarah Chen",
      role: "Computer Science Student",
      country: "Singapore",
      content: "Edfellow helped me connect with amazing mentors and find the perfect PhD program in the US.",
      rating: 5
    },
    {
      name: "Dr. Michael Rodriguez",
      role: "Professor of Mathematics",
      country: "Spain",
      content: "I love mentoring bright students from around the world. The platform makes it so easy to connect.",
      rating: 5
    },
    {
      name: "University of Toronto",
      role: "Admissions Office",
      country: "Canada",
      content: "Edfellow has significantly increased our international student applications and quality.",
      rating: 5
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50/50 via-white to-slate-50/30">
      {/* Navigation */}
      <nav className="bg-white/80 backdrop-blur-md border-b border-blue-100 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            {/* Logo */}
            <div className="flex items-center space-x-3">
              <div className="p-2 bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl shadow-lg">
                <GraduationCap className="h-6 w-6 text-white" />
              </div>
              <div>
                <span className="text-xl font-bold text-slate-900">Edfellow</span>
                <p className="text-xs text-blue-600 font-medium">Where Education Meets the World</p>
              </div>
            </div>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center space-x-8">
              <Link to="/about" className="text-slate-700 hover:text-blue-600 font-medium transition-colors">About</Link>
              <Link to="/features" className="text-slate-700 hover:text-blue-600 font-medium transition-colors">Features</Link>
              <Link to="/community" className="text-slate-700 hover:text-blue-600 font-medium transition-colors">Community</Link>
              <Link to="/login">
                <Button variant="ghost" className="text-slate-700 hover:text-blue-600 hover:bg-blue-50">
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
                className="text-slate-700 hover:text-blue-600 hover:bg-blue-50"
              >
                {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
              </Button>
            </div>
          </div>

          {/* Mobile Navigation */}
          {isMenuOpen && (
            <div className="md:hidden py-4 border-t border-blue-100">
              <div className="flex flex-col space-y-4">
                <Link to="/about" className="text-slate-700 hover:text-blue-600 font-medium">About</Link>
                <Link to="/features" className="text-slate-700 hover:text-blue-600 font-medium">Features</Link>
                <Link to="/community" className="text-slate-700 hover:text-blue-600 font-medium">Community</Link>
                <Link to="/login">
                  <Button variant="outline" className="w-full border-blue-200 text-slate-700 hover:bg-blue-50">
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
      <section className="relative py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-8">
              <div className="space-y-4">
                <Badge className="bg-blue-100 text-blue-700 hover:bg-blue-200">
                  🌍 Global Education Platform
                </Badge>
                <h1 className="text-4xl lg:text-5xl font-bold text-slate-900 leading-tight">
                  Connect with the 
                  <span className="text-blue-600"> World's</span> 
                  <br />Academic Community
                </h1>
                <p className="text-lg text-slate-600 leading-relaxed">
                  Join students, professors, and universities from around the globe. 
                  Find mentors, discover programs, and build meaningful academic connections.
                </p>
              </div>

              <div className="flex flex-col sm:flex-row gap-4">
                <Link to="/signup">
                  <Button size="lg" className="bg-blue-600 hover:bg-blue-700 text-white shadow-lg px-8">
                    Start Your Journey
                    <ArrowRight className="ml-2 h-5 w-5" />
                  </Button>
                </Link>
                <Link to="/features">
                  <Button size="lg" variant="outline" className="border-blue-200 text-slate-700 hover:bg-blue-50 px-8">
                    Explore Features
                  </Button>
                </Link>
              </div>

              {/* Stats */}
              <div className="grid grid-cols-3 gap-6 pt-8">
                <div className="text-center">
                  <div className="text-2xl font-bold text-slate-900">50k+</div>
                  <div className="text-sm text-slate-600">Active Students</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-slate-900">2k+</div>
                  <div className="text-sm text-slate-600">Expert Mentors</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-slate-900">100+</div>
                  <div className="text-sm text-slate-600">Universities</div>
                </div>
              </div>
            </div>

            {/* Globe Illustration */}
            <div className="relative flex justify-center">
              <div className="relative">
                <div className="w-96 h-96 bg-gradient-to-br from-blue-400 to-blue-600 rounded-full shadow-2xl flex items-center justify-center">
                  <Globe className="h-48 w-48 text-white opacity-90" />
                </div>
                {/* Floating elements */}
                <div className="absolute -top-4 -right-4 p-3 bg-white rounded-xl shadow-lg">
                  <Users className="h-6 w-6 text-blue-600" />
                </div>
                <div className="absolute -bottom-4 -left-4 p-3 bg-white rounded-xl shadow-lg">
                  <BookOpen className="h-6 w-6 text-blue-600" />
                </div>
                <div className="absolute top-1/2 -left-8 p-3 bg-white rounded-xl shadow-lg">
                  <MessageSquare className="h-6 w-6 text-blue-600" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center space-y-4 mb-16">
            <Badge className="bg-blue-100 text-blue-700">Features</Badge>
            <h2 className="text-3xl font-bold text-slate-900">Everything You Need for Global Learning</h2>
            <p className="text-lg text-slate-600 max-w-2xl mx-auto">
              Powerful tools and features designed to connect learners, educators, and institutions worldwide.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <Card key={index} className="border-blue-100 hover:shadow-lg transition-all duration-300 hover:border-blue-200">
                <CardHeader>
                  <div className="p-3 bg-blue-100 rounded-lg w-fit mb-4">
                    <feature.icon className="h-6 w-6 text-blue-600" />
                  </div>
                  <CardTitle className="text-slate-900">{feature.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-slate-600">
                    {feature.description}
                  </CardDescription>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-16 bg-gradient-to-br from-blue-50/50 to-slate-50/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center space-y-4 mb-16">
            <Badge className="bg-blue-100 text-blue-700">Testimonials</Badge>
            <h2 className="text-3xl font-bold text-slate-900">Loved by Students, Professors & Universities</h2>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <Card key={index} className="border-blue-100 bg-white/80 backdrop-blur-sm">
                <CardHeader>
                  <div className="flex items-center space-x-4">
                    <Avatar>
                      <AvatarFallback className="bg-blue-100 text-blue-600">
                        {testimonial.name.split(' ').map(n => n[0]).join('')}
                      </AvatarFallback>
                    </Avatar>
                    <div>
                      <CardTitle className="text-base text-slate-900">{testimonial.name}</CardTitle>
                      <CardDescription className="text-sm">
                        {testimonial.role} • {testimonial.country}
                      </CardDescription>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex">
                      {[...Array(testimonial.rating)].map((_, i) => (
                        <Star key={i} className="h-4 w-4 text-yellow-400 fill-current" />
                      ))}
                    </div>
                    <p className="text-slate-600 italic">"{testimonial.content}"</p>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-gradient-to-r from-blue-600 to-blue-700">
        <div className="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
          <div className="space-y-6">
            <h2 className="text-3xl font-bold text-white">
              Ready to Join the Global Academic Community?
            </h2>
            <p className="text-xl text-blue-100">
              Start connecting with students, professors, and universities from around the world today.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/signup">
                <Button size="lg" className="bg-white text-blue-600 hover:bg-blue-50 shadow-lg px-8">
                  Sign Up Free
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              </Link>
              <Link to="/login">
                <Button size="lg" variant="outline" className="border-white text-white hover:bg-white/10 px-8">
                  Sign In
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      <LandingFooter />
    </div>
  );
};

export default Index;
