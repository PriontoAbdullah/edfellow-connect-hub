
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Link } from 'react-router-dom';
import { LandingFooter } from "@/components/LandingFooter";
import { 
  GraduationCap, 
  Users, 
  Globe, 
  Heart,
  Target,
  Lightbulb,
  Award,
  Menu,
  X
} from 'lucide-react';
import { useState } from 'react';

const About = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const values = [
    {
      icon: Globe,
      title: "Global Connection",
      description: "Breaking down geographical barriers to connect learners worldwide."
    },
    {
      icon: Heart,
      title: "Inclusive Learning",
      description: "Creating an environment where every student feels welcome and supported."
    },
    {
      icon: Lightbulb,
      title: "Innovation",
      description: "Constantly evolving to provide cutting-edge educational solutions."
    },
    {
      icon: Award,
      title: "Excellence",
      description: "Committed to the highest standards in education and mentorship."
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
              <Link to="/about" className="text-blue-300 hover:text-white font-medium transition-colors border-b-2 border-blue-500">About</Link>
              <Link to="/features" className="text-blue-300 hover:text-white font-medium transition-colors">Features</Link>
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
                <Link to="/about" className="text-blue-300 hover:text-white font-medium border-b border-blue-500 pb-2">About</Link>
                <Link to="/features" className="text-blue-300 hover:text-white font-medium">Features</Link>
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
            Our Story
          </Badge>
          <h1 className="text-4xl lg:text-5xl font-bold text-slate-900 mb-6">
            Connecting Global Minds for 
            <span className="text-blue-600"> Better Education</span>
          </h1>
          <p className="text-xl text-slate-600 leading-relaxed max-w-3xl mx-auto">
            Edfellow was born from the belief that education knows no boundaries. We're building bridges 
            between students, professors, and universities worldwide to create meaningful learning experiences.
          </p>
        </div>
      </section>

      {/* Mission Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <Badge className="bg-blue-100 text-blue-700 mb-4">Our Mission</Badge>
              <h2 className="text-3xl font-bold text-slate-900 mb-6">
                Democratizing Global Education Access
              </h2>
              <p className="text-lg text-slate-600 mb-6">
                We believe every student deserves access to world-class education and mentorship, 
                regardless of their location or background. Our platform breaks down traditional 
                barriers and creates opportunities for meaningful academic connections.
              </p>
              <div className="space-y-4">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-blue-100 rounded-lg">
                    <Target className="h-5 w-5 text-blue-600" />
                  </div>
                  <span className="text-slate-700">Connect 1 million students globally by 2025</span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-blue-100 rounded-lg">
                    <Users className="h-5 w-5 text-blue-600" />
                  </div>
                  <span className="text-slate-700">Build the largest academic mentorship network</span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-blue-100 rounded-lg">
                    <Globe className="h-5 w-5 text-blue-600" />
                  </div>
                  <span className="text-slate-700">Partner with 500+ universities worldwide</span>
                </div>
              </div>
            </div>
            <div className="relative">
              <div className="w-full h-96 bg-gradient-to-br from-blue-400 to-blue-600 rounded-2xl shadow-2xl flex items-center justify-center">
                <Globe className="h-32 w-32 text-white opacity-90" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-16 bg-gradient-to-br from-blue-50/50 to-slate-50/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <Badge className="bg-blue-100 text-blue-700 mb-4">Our Values</Badge>
            <h2 className="text-3xl font-bold text-slate-900 mb-4">What We Stand For</h2>
            <p className="text-lg text-slate-600 max-w-2xl mx-auto">
              These core values guide everything we do and shape the future of global education.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {values.map((value, index) => (
              <Card key={index} className="border-blue-100 hover:shadow-lg transition-all duration-300 hover:border-blue-200">
                <CardHeader className="text-center">
                  <div className="p-4 bg-blue-100 rounded-lg w-fit mx-auto mb-4">
                    <value.icon className="h-8 w-8 text-blue-600" />
                  </div>
                  <CardTitle className="text-slate-900">{value.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-slate-600 text-center">
                    {value.description}
                  </CardDescription>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-gradient-to-r from-blue-600 to-blue-700">
        <div className="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-white mb-4">
            Join Our Global Education Movement
          </h2>
          <p className="text-xl text-blue-100 mb-8">
            Be part of the future of education. Connect, learn, and grow with students and educators worldwide.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/signup">
              <Button size="lg" className="bg-white text-blue-600 hover:bg-blue-50 shadow-lg px-8">
                Get Started Today
              </Button>
            </Link>
            <Link to="/features">
              <Button size="lg" variant="outline" className="border-white text-white hover:bg-white/10 px-8">
                Learn More
              </Button>
            </Link>
          </div>
        </div>
      </section>

      <LandingFooter />
    </div>
  );
};

export default About;
