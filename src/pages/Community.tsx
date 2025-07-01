
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { 
  GraduationCap, 
  ArrowRight, 
  Users, 
  Globe, 
  MessageSquare, 
  TrendingUp,
  Award,
  BookOpen,
  Heart,
  Star,
  MapPin,
  Calendar,
  CheckCircle
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const Community = () => {
  const navigate = useNavigate();

  const communityStats = [
    {
      icon: Users,
      number: "10,000+",
      label: "Active Members",
      description: "Students, professors, and universities from around the world"
    },
    {
      icon: Globe,
      number: "50+",
      label: "Countries",
      description: "Representing diverse cultures and educational systems"
    },
    {
      icon: MessageSquare,
      number: "100,000+",
      label: "Conversations",
      description: "Meaningful exchanges happening daily"
    },
    {
      icon: BookOpen,
      number: "500+",
      label: "Study Groups",
      description: "Active learning communities across all fields"
    }
  ];

  const testimonials = [
    {
      name: "Sarah Chen",
      role: "Computer Science Student",
      university: "University of Toronto",
      country: "Canada",
      content: "Edfellow connected me with students from 15 different countries studying CS. The diversity of perspectives has completely changed how I approach problem-solving.",
      rating: 5
    },
    {
      name: "Dr. Ahmad Hassan",
      role: "Professor of Engineering",
      university: "American University of Beirut",
      country: "Lebanon",
      content: "Through Edfellow, I've been able to mentor students from across the globe and collaborate with colleagues I never would have met otherwise. It's truly revolutionary.",
      rating: 5
    },
    {
      name: "Maria Rodriguez",
      role: "International Relations Student",
      university: "Universidad de Barcelona",
      country: "Spain",
      content: "The global perspective I've gained through Edfellow's community has been invaluable for my studies. I've made friends and study partners worldwide.",
      rating: 5
    }
  ];

  const communityFeatures = [
    {
      icon: Users,
      title: "Global Study Groups",
      description: "Join field-specific groups with students from around the world. Share resources, discuss concepts, and learn together.",
      color: "from-blue-500 to-cyan-500"
    },
    {
      icon: MessageSquare,
      title: "Expert Q&A Forums",
      description: "Get answers from professors and industry experts. Share your knowledge and help others in your field.",
      color: "from-purple-500 to-pink-500"
    },
    {
      icon: Calendar,
      title: "Virtual Events",
      description: "Attend workshops, seminars, and networking events hosted by universities and experts worldwide.",
      color: "from-green-500 to-emerald-500"
    },
    {
      icon: Award,
      title: "Achievement Recognition",
      description: "Celebrate academic milestones, research breakthroughs, and career achievements with the global community.",
      color: "from-orange-500 to-red-500"
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
              <a href="#" onClick={() => navigate('/features')} className="text-gray-600 hover:text-gray-900 transition-colors">Features</a>
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
            <Users className="mr-2 h-4 w-4" />
            Global Community
          </Badge>
          <h2 className="text-4xl sm:text-5xl md:text-6xl font-bold text-gray-900 mb-6 sm:mb-8">
            Join a{" "}
            <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              Thriving
            </span>
            {" "}Global Community
          </h2>
          <p className="text-lg sm:text-xl text-gray-600 mb-8 sm:mb-12 leading-relaxed">
            Connect with students, professors, and universities from around the world. Share knowledge, 
            build relationships, and grow together in our vibrant educational community.
          </p>
        </div>
      </section>

      {/* Community Stats */}
      <section className="py-16 sm:py-20 px-4 sm:px-6 lg:px-8 bg-white/30 backdrop-blur-sm">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12 sm:mb-16">
            <h3 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-6">Our Growing Community</h3>
            <p className="text-lg sm:text-xl text-gray-600">Numbers that show our global impact</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
            {communityStats.map((stat, index) => (
              <Card key={index} className="border-0 shadow-lg hover:shadow-xl transition-all duration-300 bg-white/80 backdrop-blur-sm text-center hover:scale-105">
                <CardHeader className="p-6 sm:p-8">
                  <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-blue-600 to-purple-600 rounded-2xl mb-4 mx-auto">
                    <stat.icon className="h-8 w-8 text-white" />
                  </div>
                  <div className="text-3xl sm:text-4xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-2">
                    {stat.number}
                  </div>
                  <CardTitle className="text-lg sm:text-xl font-bold text-gray-900 mb-3">{stat.label}</CardTitle>
                  <CardDescription className="text-gray-600 text-sm sm:text-base">
                    {stat.description}
                  </CardDescription>
                </CardHeader>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Community Features */}
      <section className="py-16 sm:py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12 sm:mb-16">
            <h3 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-6">Community Features</h3>
            <p className="text-lg sm:text-xl text-gray-600">Ways to connect, learn, and grow together</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8">
            {communityFeatures.map((feature, index) => (
              <Card key={index} className="border-0 shadow-lg hover:shadow-xl transition-all duration-300 bg-white/80 backdrop-blur-sm hover:scale-105">
                <CardHeader className="p-6 sm:p-8">
                  <div className={`inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br ${feature.color} rounded-2xl mb-4`}>
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

      {/* Testimonials */}
      <section className="py-16 sm:py-20 px-4 sm:px-6 lg:px-8 bg-white/30 backdrop-blur-sm">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12 sm:mb-16">
            <h3 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-6">What Our Community Says</h3>
            <p className="text-lg sm:text-xl text-gray-600">Real stories from our global members</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8">
            {testimonials.map((testimonial, index) => (
              <Card key={index} className="border-0 shadow-lg hover:shadow-xl transition-all duration-300 bg-white/80 backdrop-blur-sm">
                <CardHeader className="p-6 sm:p-8">
                  <div className="flex items-center mb-4">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <Star key={i} className="h-5 w-5 text-yellow-400 fill-current" />
                    ))}
                  </div>
                  <CardDescription className="text-gray-700 text-sm sm:text-base leading-relaxed mb-6 italic">
                    "{testimonial.content}"
                  </CardDescription>
                  <div className="border-t pt-4">
                    <CardTitle className="text-lg font-bold text-gray-900">{testimonial.name}</CardTitle>
                    <p className="text-blue-600 font-medium text-sm">{testimonial.role}</p>
                    <div className="flex items-center text-gray-500 text-sm mt-1">
                      <MapPin className="h-4 w-4 mr-1" />
                      <span>{testimonial.university}, {testimonial.country}</span>
                    </div>
                  </div>
                </CardHeader>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Join Community CTA */}
      <section className="py-16 sm:py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-600 text-white">
        <div className="max-w-4xl mx-auto text-center">
          <div className="inline-flex items-center justify-center w-20 h-20 bg-white/20 rounded-full mb-8 backdrop-blur-sm">
            <Heart className="h-10 w-10 text-white" />
          </div>
          <h3 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-6">
            Ready to Join Our Community?
          </h3>
          <p className="text-lg sm:text-xl mb-8 sm:mb-12 opacity-90">
            Become part of a global network of learners, educators, and institutions working together to shape the future of education.
          </p>
          
          <Button 
            size="lg" 
            onClick={() => navigate('/signup')}
            className="bg-white text-blue-600 hover:bg-gray-100 px-8 sm:px-12 py-3 sm:py-4 text-base sm:text-lg font-semibold shadow-2xl transform hover:scale-105 transition-all duration-200"
          >
            Join the Community
            <ArrowRight className="ml-2 h-4 sm:h-5 w-4 sm:w-5" />
          </Button>
          
          <div className="flex items-center justify-center space-x-2 text-sm opacity-80 mt-6 sm:mt-8">
            <Users className="h-4 w-4" />
            <span>Join 10,000+ members worldwide</span>
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

export default Community;
