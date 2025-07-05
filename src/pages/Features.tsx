
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
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
  Shield,
  Zap,
  Menu,
  X,
  CheckCircle
} from 'lucide-react';
import { useState } from 'react';

const Features = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const features = [
    {
      icon: Users,
      title: "Global Academic Groups",
      description: "Join subject-specific groups with students and professors from around the world. Share knowledge, collaborate on projects, and build lasting academic relationships.",
      benefits: ["Connect with peers globally", "Subject-specific discussions", "Collaborative learning"]
    },
    {
      icon: Heart,
      title: "Expert Mentorship",
      description: "Get personalized guidance from experienced professors and industry experts. Book one-on-one sessions and accelerate your academic and career growth.",
      benefits: ["1-on-1 mentoring sessions", "Industry expert guidance", "Career development"]
    },
    {
      icon: Globe,
      title: "International Programs",
      description: "Discover and apply to educational programs from top universities worldwide. Access detailed information and connect directly with admissions teams.",
      benefits: ["Global program database", "Direct university contact", "Application assistance"]
    },
    {
      icon: MessageSquare,
      title: "Real-time Communication",
      description: "Chat seamlessly with peers and mentors across different time zones. Built-in translation and scheduling tools make global communication effortless.",
      benefits: ["Cross-timezone messaging", "Built-in translation", "Video conferencing"]
    },
    {
      icon: Award,
      title: "Achievement Tracking",
      description: "Monitor your academic progress, set learning goals, and celebrate milestones. Share achievements with your global network and inspire others.",
      benefits: ["Progress tracking", "Goal setting", "Achievement sharing"]
    },
    {
      icon: Shield,
      title: "Secure Platform",
      description: "Your data and conversations are protected with enterprise-grade security. Focus on learning while we keep your information safe.",
      benefits: ["End-to-end encryption", "Privacy controls", "Secure file sharing"]
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
              <Link to="/features" className="text-blue-300 hover:text-white font-medium transition-colors border-b-2 border-blue-500">Features</Link>
              <Link to="/community" className="text-blue-300 hover:text-white font-medium transition-colors">Community</Link>
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
                <Link to="/features" className="text-blue-300 hover:text-white font-medium border-b border-blue-500 pb-2">Features</Link>
                <Link to="/community" className="text-blue-300 hover:text-white font-medium">Community</Link>
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
            Platform Features
          </Badge>
          <h1 className="text-4xl lg:text-5xl font-bold text-slate-900 mb-6">
            Everything You Need for 
            <span className="text-blue-600"> Global Learning</span>
          </h1>
          <p className="text-xl text-slate-600 leading-relaxed max-w-3xl mx-auto">
            Powerful tools and features designed to connect learners, educators, and institutions 
            across the globe in meaningful ways.
          </p>
        </div>
      </section>

      {/* Features Grid */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <Card key={index} className="border-blue-100 hover:shadow-lg transition-all duration-300 hover:border-blue-200 group">
                <CardHeader>
                  <div className="p-3 bg-blue-100 rounded-lg w-fit mb-4 group-hover:bg-blue-200 transition-colors">
                    <feature.icon className="h-6 w-6 text-blue-600" />
                  </div>
                  <CardTitle className="text-slate-900">{feature.title}</CardTitle>
                  <CardDescription className="text-slate-600">
                    {feature.description}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    {feature.benefits.map((benefit, benefitIndex) => (
                      <div key={benefitIndex} className="flex items-center gap-2">
                        <CheckCircle className="h-4 w-4 text-green-500" />
                        <span className="text-sm text-slate-600">{benefit}</span>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-16 bg-gradient-to-br from-blue-50/50 to-slate-50/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <Badge className="bg-blue-100 text-blue-700 mb-4">How It Works</Badge>
            <h2 className="text-3xl font-bold text-slate-900 mb-4">Get Started in 3 Simple Steps</h2>
            <p className="text-lg text-slate-600 max-w-2xl mx-auto">
              Join thousands of students and educators already connected through Edfellow.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="p-6 bg-blue-100 rounded-full w-20 h-20 mx-auto mb-6 flex items-center justify-center">
                <span className="text-2xl font-bold text-blue-600">1</span>
              </div>
              <h3 className="text-xl font-semibold text-slate-900 mb-4">Sign Up & Create Profile</h3>
              <p className="text-slate-600">
                Create your account and build a comprehensive profile showcasing your academic interests and goals.
              </p>
            </div>
            <div className="text-center">
              <div className="p-6 bg-blue-100 rounded-full w-20 h-20 mx-auto mb-6 flex items-center justify-center">
                <span className="text-2xl font-bold text-blue-600">2</span>
              </div>
              <h3 className="text-xl font-semibold text-slate-900 mb-4">Connect & Explore</h3>
              <p className="text-slate-600">
                Join relevant groups, browse programs, and connect with mentors who match your academic interests.
              </p>
            </div>
            <div className="text-center">
              <div className="p-6 bg-blue-100 rounded-full w-20 h-20 mx-auto mb-6 flex items-center justify-center">
                <span className="text-2xl font-bold text-blue-600">3</span>
              </div>
              <h3 className="text-xl font-semibold text-slate-900 mb-4">Learn & Grow</h3>
              <p className="text-slate-600">
                Engage in meaningful conversations, attend virtual sessions, and accelerate your learning journey.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-gradient-to-r from-blue-600 to-blue-700">
        <div className="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-white mb-4">
            Ready to Transform Your Learning Experience?
          </h2>
          <p className="text-xl text-blue-100 mb-8">
            Join the global academic community and unlock opportunities you never knew existed.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/signup">
              <Button size="lg" className="bg-white text-blue-600 hover:bg-blue-50 shadow-lg px-8">
                Start Learning Today
              </Button>
            </Link>
            <Link to="/community">
              <Button size="lg" variant="outline" className="border-white text-white hover:bg-white/10 px-8">
                Explore Community
              </Button>
            </Link>
          </div>
        </div>
      </section>

      <LandingFooter />
    </div>
  );
};

export default Features;
