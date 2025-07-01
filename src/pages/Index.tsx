
import { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { 
  GraduationCap, 
  Building2, 
  BookOpen, 
  Users, 
  Globe, 
  ArrowRight,
  CheckCircle,
  Sparkles,
  Target,
  Heart,
  Info,
  Users2
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const Index = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('students');

  const userTypes = [
    {
      id: 'students',
      title: 'Students',
      icon: GraduationCap,
      tagline: 'Connect Globally. Learn Locally. Lead Universally.',
      description: 'Join a global community of learners. Connect with peers worldwide, find mentors, and discover opportunities that will shape your academic journey.',
      features: [
        'Field-Based Global Peer Groups',
        'Mentor Marketplace',
        'Career Exploration Center',
        'Digital Portfolio Builder',
        'Global Scholarship & Internship Board'
      ],
      color: 'from-blue-600 to-indigo-600',
      bgColor: 'from-blue-50 to-indigo-50'
    },
    {
      id: 'professors',
      title: 'Professors',
      icon: BookOpen,
      tagline: 'Teach Globally. Mentor Personally. Inspire Endlessly.',
      description: 'Expand your impact beyond classroom walls. Share your expertise with students worldwide and build a thriving global academic practice.',
      features: [
        'Mentorship Dashboard',
        'Global Course Builder',
        'Research Assistant Portal',
        'Admission & Academic Advisory Tools',
        'Professional Profile & Promotion Tools'
      ],
      color: 'from-green-600 to-emerald-600',
      bgColor: 'from-green-50 to-emerald-50'
    },
    {
      id: 'universities',
      title: 'Universities',
      icon: Building2,
      tagline: 'Expand Your Campus. Reach the World.',
      description: 'Transform your institution into a global powerhouse. Attract international talent, promote programs worldwide, and engage alumni like never before.',
      features: [
        'Institution Dashboard',
        'Program Promotion Tools',
        'Student Recruitment Suite',
        'Professor Recruitment',
        'Alumni Engagement Network',
        'Live Info Sessions & Webinars'
      ],
      color: 'from-orange-600 to-amber-600',
      bgColor: 'from-orange-50 to-amber-50'
    }
  ];

  const activeUserType = userTypes.find(type => type.id === activeTab);

  return (
    <div className="min-h-screen bg-white">
      {/* Clean Header */}
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
            
            {/* Navigation */}
            <nav className="hidden md:flex items-center space-x-8">
              <a href="#" onClick={() => navigate('/about')} className="text-gray-600 hover:text-gray-900 transition-colors">About</a>
              <a href="#" onClick={() => navigate('/features')} className="text-gray-600 hover:text-gray-900 transition-colors">Features</a>
              <a href="#" onClick={() => navigate('/community')} className="text-gray-600 hover:text-gray-900 transition-colors">Community</a>
            </nav>
            
            <div className="flex items-center space-x-2 sm:space-x-4">
              <Button 
                variant="ghost" 
                onClick={() => navigate('/login')}
                className="text-gray-700 hover:text-gray-900 text-sm sm:text-base"
              >
                Sign In
              </Button>
              <Button 
                onClick={() => navigate('/signup')}
                className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 shadow-lg px-4 sm:px-6 text-sm sm:text-base"
              >
                Get Started
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative py-12 sm:py-20 px-4 sm:px-6 lg:px-8">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-50/30 via-white to-purple-50/30" />
        <div className="absolute top-20 sm:top-32 left-16 sm:left-32 w-32 sm:w-64 h-32 sm:h-64 bg-blue-400/5 rounded-full blur-3xl" />
        <div className="absolute bottom-20 sm:bottom-32 right-16 sm:right-32 w-40 sm:w-80 h-40 sm:h-80 bg-purple-400/5 rounded-full blur-3xl" />
        
        <div className="relative max-w-4xl mx-auto text-center">
          <Badge className="bg-gradient-to-r from-blue-100 to-purple-100 text-blue-700 border-blue-200 mb-6 sm:mb-8 px-4 sm:px-6 py-2 sm:py-3 text-sm font-semibold">
            <Sparkles className="mr-2 h-4 w-4" />
            Global Education Network
          </Badge>
          
          <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 mb-6 sm:mb-8 leading-tight">
            Unlock Knowledge,{" "}
            <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              Opportunity
            </span>
            , and{" "}
            <span className="bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
              Connection
            </span>
            —Globally
          </h2>
          
          <p className="text-lg sm:text-xl md:text-2xl text-gray-600 mb-12 sm:mb-16 max-w-3xl mx-auto leading-relaxed">
            A global educational network connecting students, professors, and universities. 
            Learn, teach, and collaborate beyond borders.
          </p>
        </div>
      </section>

      {/* Choose Your Path - Horizontal Tabs */}
      <section className="py-12 sm:py-20 px-4 sm:px-6 lg:px-8 bg-gray-50/50">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12 sm:mb-16">
            <h3 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">Choose Your Path</h3>
            <p className="text-lg sm:text-xl text-gray-600">Discover how Edfellow transforms your educational journey</p>
          </div>

          {/* Horizontal Tab Navigation */}
          <div className="flex justify-center mb-8 sm:mb-12">
            <div className="flex flex-col sm:flex-row bg-white rounded-2xl p-2 shadow-lg border border-gray-100 w-full sm:w-auto">
              {userTypes.map((type) => {
                const IconComponent = type.icon;
                return (
                  <button
                    key={type.id}
                    onClick={() => setActiveTab(type.id)}
                    className={`flex items-center justify-center px-4 sm:px-8 py-3 sm:py-4 rounded-xl transition-all duration-300 mb-2 sm:mb-0 sm:mr-2 last:mr-0 ${
                      activeTab === type.id
                        ? `bg-gradient-to-r ${type.color} text-white shadow-lg border-2 border-transparent`
                        : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50 border-2 border-transparent hover:border-gray-200'
                    }`}
                  >
                    <IconComponent className="h-5 w-5 mr-2 sm:mr-3" />
                    <span className="font-semibold text-sm sm:text-base">{type.title}</span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Tab Content */}
          {activeUserType && (
            <div className={`bg-gradient-to-br ${activeUserType.bgColor} rounded-3xl p-6 sm:p-12 shadow-xl border border-white/50`}>
              <div className="grid md:grid-cols-2 gap-8 sm:gap-12 items-center">
                <div>
                  <div className={`inline-flex items-center bg-gradient-to-r ${activeUserType.color} text-white px-4 sm:px-6 py-2 sm:py-3 rounded-2xl mb-4 sm:mb-6 shadow-lg`}>
                    <activeUserType.icon className="h-5 sm:h-6 w-5 sm:w-6 mr-2 sm:mr-3" />
                    <span className="font-bold text-base sm:text-lg">For {activeUserType.title}</span>
                  </div>
                  
                  <h4 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-4">
                    {activeUserType.tagline}
                  </h4>
                  
                  <p className="text-base sm:text-lg text-gray-700 mb-6 sm:mb-8 leading-relaxed">
                    {activeUserType.description}
                  </p>

                  <Button 
                    size="lg"
                    onClick={() => navigate('/signup')}
                    className={`bg-gradient-to-r ${activeUserType.color} hover:shadow-xl transform hover:scale-105 transition-all duration-200 px-6 sm:px-8 py-3 sm:py-4 w-full sm:w-auto`}
                  >
                    Get Started as {activeUserType.title.slice(0, -1)}
                    <ArrowRight className="ml-2 h-4 sm:h-5 w-4 sm:w-5" />
                  </Button>
                </div>

                <div className="space-y-3 sm:space-y-4">
                  {activeUserType.features.map((feature, index) => (
                    <div key={index} className="flex items-center bg-white/70 backdrop-blur-sm rounded-xl p-3 sm:p-4 shadow-sm">
                      <CheckCircle className={`h-4 sm:h-5 w-4 sm:w-5 mr-3 sm:mr-4 flex-shrink-0 ${activeTab === 'students' ? 'text-blue-600' : activeTab === 'professors' ? 'text-green-600' : 'text-orange-600'}`} />
                      <span className="text-gray-800 font-medium text-sm sm:text-base">{feature}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-16 sm:py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-600 text-white">
        <div className="max-w-4xl mx-auto text-center">
          <h3 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4 sm:mb-6">
            Ready to Connect with the World?
          </h3>
          <p className="text-lg sm:text-xl mb-8 sm:mb-12 opacity-90">
            Join thousands building their global academic networks on Edfellow.
          </p>
          
          <Button 
            size="lg" 
            onClick={() => navigate('/signup')}
            className="bg-white text-blue-600 hover:bg-gray-100 px-8 sm:px-12 py-3 sm:py-4 text-base sm:text-lg font-semibold shadow-2xl transform hover:scale-105 transition-all duration-200 w-full sm:w-auto"
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

      {/* Clean Footer */}
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

export default Index;
