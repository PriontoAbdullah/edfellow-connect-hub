import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import {
  GraduationCap,
  Building2,
  BookOpen,
  Users,
  // Globe,
  ArrowRight,
  CheckCircle,
  Sparkles,
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { LandingFooter } from '@/components/LandingFooter';

const Index = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('students');

  const userTypes = [
    {
      id: 'students',
      title: 'Students',
      icon: GraduationCap,
      tagline: 'Connect Globally. Learn Locally. Lead Universally.',
      description:
        'Join a global community of learners. Connect with peers worldwide, find mentors, and discover opportunities that will shape your academic journey.',
      features: [
        'Field-Based Global Peer Groups',
        'Mentor Marketplace',
        'Career Exploration Center',
        'Digital Portfolio Builder',
        'Global Scholarship & Internship Board',
      ],
      color: 'from-blue-600 to-indigo-600',
      bgColor: 'from-blue-50 to-indigo-50',
    },
    {
      id: 'professors',
      title: 'Professors',
      icon: BookOpen,
      tagline: 'Teach Globally. Mentor Personally. Inspire Endlessly.',
      description:
        'Expand your impact beyond classroom walls. Share your expertise with students worldwide and build a thriving global academic practice.',
      features: [
        'Mentorship Dashboard',
        'Global Course Builder',
        'Research Assistant Portal',
        'Admission & Academic Advisory Tools',
        'Professional Profile & Promotion Tools',
      ],
      color: 'from-green-600 to-emerald-600',
      bgColor: 'from-green-50 to-emerald-50',
    },
    {
      id: 'universities',
      title: 'Universities',
      icon: Building2,
      tagline: 'Expand Your Campus. Reach the World.',
      description:
        'Transform your institution into a global powerhouse. Attract international talent, promote programs worldwide, and engage alumni like never before.',
      features: [
        'Institution Dashboard',
        'Program Promotion Tools',
        'Student Recruitment Suite',
        'Professor Recruitment',
        'Alumni Engagement Network',
        'Live Info Sessions & Webinars',
      ],
      color: 'from-orange-600 to-amber-600',
      bgColor: 'from-orange-50 to-amber-50',
    },
  ];

  const activeUserType = userTypes.find((type) => type.id === activeTab);

  return (
    <div className='min-h-screen bg-white'>
      {/* Clean Header */}
      <header className='sticky top-0 z-50 backdrop-blur-xl bg-white/95 border-b border-gray-100'>
        <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8'>
          <div className='flex justify-between items-center h-16 sm:h-20'>
            <div className='flex items-center space-x-2'>
              <img
                src='/logo.png'
                alt='Edfellow'
                className='w-12 rounded-full'
              />

              <div>
                <h1 className='text-2xl sm:text-3xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent'>
                  Edfellow
                </h1>
                <p className='text-xs sm:text-sm text-gray-600 font-medium -mt-1'>
                  Where Education Meets the World
                </p>
              </div>
            </div>

            {/* Navigation */}
            <nav className='hidden md:flex items-center space-x-8'>
              <a
                href='#'
                onClick={() => navigate('/about')}
                className='text-gray-600 hover:text-blue-600 transition-colors'
              >
                About
              </a>
              <a
                href='#'
                onClick={() => navigate('/features')}
                className='text-gray-600 hover:text-blue-600 transition-colors'
              >
                Features
              </a>
              <a
                href='#'
                onClick={() => navigate('/community')}
                className='text-gray-600 hover:text-blue-600 transition-colors'
              >
                Community
              </a>
            </nav>

            <div className='flex items-center space-x-2 sm:space-x-4'>
              <Button
                variant='ghost'
                onClick={() => navigate('/login')}
                className='text-gray-700 hover:text-blue-600 text-sm sm:text-base'
              >
                Sign In
              </Button>
              <Button
                onClick={() => navigate('/signup')}
                className='bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 shadow-lg px-4 sm:px-6 text-sm sm:text-base'
              >
                Get Started
                <ArrowRight className='ml-2 h-4 w-4' />
              </Button>
            </div>
          </div>
        </div>
      </header>

      {/* Hero Section - Smaller and with Globe */}
      <section className='relative py-8 sm:py-12 px-4 sm:px-6 lg:px-8'>
        <div className='absolute inset-0 bg-gradient-to-br from-blue-50/30 via-white to-indigo-50/30' />
        <div className='absolute top-10 sm:top-16 left-8 sm:left-16 w-24 sm:w-48 h-24 sm:h-48 bg-blue-400/5 rounded-full blur-3xl' />
        <div className='absolute bottom-10 sm:bottom-16 right-8 sm:right-16 w-32 sm:w-64 h-32 sm:h-64 bg-indigo-400/5 rounded-full blur-3xl' />

        <div className='relative max-w-6xl mx-auto'>
          <div className='grid lg:grid-cols-2 gap-8 sm:gap-12 items-center'>
            <div className='text-center lg:text-left'>
              <Badge className='bg-gradient-to-r from-blue-100 to-indigo-100 text-blue-700 border-blue-200 mb-4 sm:mb-6 px-4 sm:px-6 py-2 sm:py-3 text-sm font-semibold'>
                <Sparkles className='mr-2 h-4 w-4' />
                Global Education Network
              </Badge>

              <h2 className='text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-4 sm:mb-6 md:leading-tight lg:leading-tight'>
                Unlock Knowledge,{' '}
                <span className='bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent'>
                  Opportunity
                </span>
                , and{' '}
                <span className='bg-gradient-to-r from-indigo-600 to-blue-600 bg-clip-text text-transparent'>
                  Connection
                </span>
                —Globally
              </h2>

              <p className='text-base sm:text-lg md:text-xl text-gray-600 mb-6 sm:mb-8 max-w-2xl mx-auto lg:mx-0 leading-relaxed'>
                A global educational network connecting students, professors,
                and universities. Learn, teach, and collaborate beyond borders.
              </p>

              <div className='flex flex-col sm:flex-row gap-4 justify-center lg:justify-start'>
                <Button
                  size='lg'
                  onClick={() => navigate('/signup')}
                  className='bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 shadow-lg px-6 sm:px-8 py-3 sm:py-4 text-base sm:text-lg font-semibold'
                >
                  Get Started
                  <ArrowRight className='ml-2 h-4 sm:h-5 w-4 sm:w-5' />
                </Button>
                <Button
                  variant='outline'
                  onClick={() => navigate('/about')}
                  className='border-2 border-blue-600 text-blue-600 hover:bg-blue-50 px-6 sm:px-8 py-3 sm:py-4 text-base sm:text-lg font-semibold'
                >
                  Learn More
                </Button>
              </div>
            </div>

            {/* Globe Image */}
            <div className='relative flex justify-center lg:justify-end'>
              <div className='relative'>
                <div className='w-64 h-64 sm:w-80 sm:h-80 bg-gradient-to-br from-blue-600 to-indigo-600 rounded-full shadow-2xl flex items-center justify-center '>
                  {/* <Globe
                    className='h-32 w-32 sm:h-40 sm:w-40 text-white opacity-90 animate-spin'
                    style={{ animationDuration: '30s' }}
                  /> */}
                  <img
                    src='/logo.png'
                    alt='Globe'
                    className='h-32 w-32 sm:h-52 sm:w-52 text-white rounded-full'
                  />
                </div>
                {/* Floating Academic Icons */}
                <div
                  className='absolute -top-4 -right-4 sm:-top-6 sm:-right-6 p-3 sm:p-4 bg-white rounded-xl shadow-lg animate-bounce'
                  style={{ animationDelay: '3s', animationDuration: '4s' }}
                >
                  <BookOpen className='h-6 w-6 sm:h-8 sm:w-8 text-blue-600' />
                </div>
                <div
                  className='absolute -bottom-4 -left-4 sm:-bottom-6 sm:-left-6 p-3 sm:p-4 bg-white rounded-xl shadow-lg animate-bounce'
                  style={{ animationDelay: '5s', animationDuration: '4s' }}
                >
                  <Users className='h-6 w-6 sm:h-8 sm:w-8 text-blue-600' />
                </div>
                <div
                  className='absolute top-1/2 -left-8 sm:-left-12 p-3 sm:p-4 bg-white rounded-xl shadow-lg animate-bounce'
                  style={{ animationDelay: '4s', animationDuration: '4s' }}
                >
                  <GraduationCap className='h-6 w-6 sm:h-8 sm:w-8 text-blue-600' />
                </div>
                <div
                  className='absolute top-1/4 -right-6 sm:-right-10 p-3 sm:p-4 bg-white rounded-xl shadow-lg animate-bounce'
                  style={{ animationDelay: '6s', animationDuration: '4s' }}
                >
                  <Building2 className='h-6 w-6 sm:h-8 sm:w-8 text-blue-600' />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Choose Your Path - Horizontal Tabs */}
      <section className='py-8 sm:py-16 px-4 sm:px-6 lg:px-8 bg-gray-50/50'>
        <div className='max-w-6xl mx-auto'>
          <div className='text-center mb-8 sm:mb-12'>
            <h3 className='text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900 mb-4'>
              Choose Your Path
            </h3>
            <p className='text-base sm:text-lg text-gray-600'>
              Discover how Edfellow transforms your educational journey
            </p>
          </div>

          {/* Horizontal Tab Navigation */}
          <div className='flex justify-center mb-6 sm:mb-10'>
            <div className='flex flex-col sm:flex-row bg-white rounded-2xl p-2 shadow-lg border border-gray-100 w-full sm:w-auto'>
              {userTypes.map((type) => {
                const IconComponent = type.icon;
                return (
                  <button
                    key={type.id}
                    onClick={() => setActiveTab(type.id)}
                    className={`flex items-center justify-center px-4 sm:px-6 lg:px-8 py-3 sm:py-4 rounded-xl transition-all duration-300 mb-2 sm:mb-0 sm:mr-2 last:mr-0 ${
                      activeTab === type.id
                        ? `bg-gradient-to-r ${type.color} text-white shadow-lg border-2 border-transparent`
                        : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50 border-2 border-transparent hover:border-gray-200'
                    }`}
                  >
                    <IconComponent className='h-4 w-4 sm:h-5 sm:w-5 mr-2 sm:mr-3' />
                    <span className='font-semibold text-sm sm:text-base'>
                      {type.title}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Tab Content */}
          {activeUserType && (
            <div
              className={`bg-gradient-to-br ${activeUserType.bgColor} rounded-3xl p-6 sm:p-10 shadow-xl border border-white/50`}
            >
              <div className='grid md:grid-cols-2 gap-6 sm:gap-10 items-center'>
                <div>
                  <div
                    className={`inline-flex items-center bg-gradient-to-r ${activeUserType.color} text-white px-4 sm:px-6 py-2 sm:py-3 rounded-2xl mb-4 sm:mb-6 shadow-lg`}
                  >
                    <activeUserType.icon className='h-4 sm:h-5 w-4 sm:w-5 mr-2 sm:mr-3' />
                    <span className='font-bold text-sm sm:text-base'>
                      For {activeUserType.title}
                    </span>
                  </div>

                  <h4 className='text-xl sm:text-2xl md:text-3xl font-bold text-gray-900 mb-3 sm:mb-4'>
                    {activeUserType.tagline}
                  </h4>

                  <p className='text-sm sm:text-base text-gray-700 mb-4 sm:mb-6 leading-relaxed'>
                    {activeUserType.description}
                  </p>

                  <Button
                    size='lg'
                    onClick={() => navigate('/signup')}
                    className={`bg-gradient-to-r ${activeUserType.color} hover:shadow-xl transform hover:scale-105 transition-all duration-200 px-4 sm:px-6 py-2 sm:py-3 w-full sm:w-auto text-sm sm:text-base`}
                  >
                    Get Started as {activeUserType.title.slice(0, -1)}
                    <ArrowRight className='ml-2 h-3 sm:h-4 w-3 sm:w-4' />
                  </Button>
                </div>

                <div className='space-y-2 sm:space-y-3'>
                  {activeUserType.features.map((feature, index) => (
                    <div
                      key={index}
                      className='flex items-center bg-white/70 backdrop-blur-sm rounded-xl p-3 sm:p-4 shadow-sm'
                    >
                      <CheckCircle
                        className={`h-4 w-4 sm:h-5 sm:w-5 mr-3 sm:mr-4 flex-shrink-0 ${
                          activeTab === 'students'
                            ? 'text-blue-600'
                            : activeTab === 'professors'
                            ? 'text-green-600'
                            : 'text-orange-600'
                        }`}
                      />
                      <span className='text-gray-800 font-medium text-sm sm:text-base'>
                        {feature}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>
      </section>

      {/* Final CTA */}
      <section className='py-12 sm:py-16 px-4 sm:px-6 lg:px-8 bg-gradient-to-r from-blue-600 via-indigo-600 to-blue-700 text-white'>
        <div className='max-w-4xl mx-auto text-center'>
          <h3 className='text-2xl sm:text-3xl md:text-4xl font-bold mb-4 sm:mb-6'>
            Ready to Connect with the World?
          </h3>
          <p className='text-base sm:text-lg mb-6 sm:mb-10 opacity-90'>
            Join thousands building their global academic networks on Edfellow.
          </p>

          <Button
            size='lg'
            onClick={() => navigate('/signup')}
            className='bg-white text-blue-600 hover:bg-gray-100 px-6 sm:px-10 py-3 sm:py-4 text-base sm:text-lg font-semibold shadow-2xl transform hover:scale-105 transition-all duration-200 w-full sm:w-auto'
          >
            Start Your Journey
            <ArrowRight className='ml-2 h-4 sm:h-5 w-4 sm:w-5' />
          </Button>

          <div className='flex items-center justify-center space-x-2 text-sm opacity-80 mt-4 sm:mt-6'>
            <CheckCircle className='h-4 w-4' />
            <span>Free to join • No payment required</span>
          </div>
        </div>
      </section>

      {/* Clean Footer */}
      <LandingFooter />
    </div>
  );
};

export default Index;
