import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import {
  GraduationCap,
  ArrowRight,
  Users,
  MessageSquare,
  Globe,
  Shield,
  Video,
  Calendar,
  BookOpen,
  Award,
  TrendingUp,
  Building2,
  UserPlus,
  BarChart3,
  Megaphone,
  Network,
  Presentation,
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { LandingFooter } from '@/components/LandingFooter';

const Features = () => {
  const navigate = useNavigate();

  const generalFeatures = [
    {
      icon: Users,
      title: 'Smart Match System',
      description:
        'Connect instantly with students, professors, and universities aligned with your interests and goals.',
    },
    {
      icon: MessageSquare,
      title: 'Global Community Hub',
      description:
        'Join discussions, ask questions, and collaborate across borders in your field of study.',
    },
    {
      icon: Globe,
      title: 'Multilingual Support',
      description:
        'Access content and communicate in your native language or choose from multiple supported languages.',
    },
    {
      icon: Shield,
      title: 'Verified Profiles & Ratings',
      description:
        'Trust the quality of mentorship, courses, and institutional programs with verified users and transparent reviews.',
    },
    {
      icon: Video,
      title: 'Virtual Collaboration Tools',
      description:
        'Message, video call, share resources, and manage group projects—all in one place.',
    },
    {
      icon: Calendar,
      title: 'Integrated Calendar & Booking System',
      description:
        'Easily schedule mentorship sessions, interviews, and live events.',
    },
  ];

  const studentFeatures = [
    {
      icon: Users,
      title: 'Field-Based Global Peer Groups',
      description:
        'Join study groups by major or interest area—collaborate, share resources, and learn together.',
    },
    {
      icon: BookOpen,
      title: 'Mentor Marketplace',
      description:
        'Find and book expert professors for guidance, academic help, or admission support.',
    },
    {
      icon: TrendingUp,
      title: 'Career Exploration Center',
      description:
        'Learn what it takes to succeed in your field—skills, job markets, pathways.',
    },
    {
      icon: Award,
      title: 'Digital Portfolio Builder',
      description:
        'Showcase your work, research, and achievements to professors and universities worldwide.',
    },
    {
      icon: Globe,
      title: 'Global Scholarship & Internship Board',
      description:
        'Access curated opportunities across countries, tailored to your interests.',
    },
  ];

  const professorFeatures = [
    {
      icon: BarChart3,
      title: 'Mentorship Dashboard',
      description:
        'Track student bookings, sessions, feedback, and income in one clean interface.',
    },
    {
      icon: BookOpen,
      title: 'Global Course Builder',
      description:
        'Design and deliver your own online courses to students anywhere in the world.',
    },
    {
      icon: Users,
      title: 'Research Assistant Portal',
      description:
        'Post assistantship openings and build virtual research teams.',
    },
    {
      icon: MessageSquare,
      title: 'Admission & Academic Advisory Tools',
      description:
        'Offer admission guidance and structured counseling packages.',
    },
    {
      icon: Award,
      title: 'Professional Profile & Promotion Tools',
      description:
        'Build visibility with a public profile, course ratings, and featured listings.',
    },
  ];

  const universityFeatures = [
    {
      icon: BarChart3,
      title: 'Institution Dashboard',
      description:
        'Track applications, leads, student engagement, and alumni activity.',
    },
    {
      icon: Megaphone,
      title: 'Program Promotion Tools',
      description:
        'Create immersive profiles for degrees, certificates, and study-abroad programs.',
    },
    {
      icon: UserPlus,
      title: 'Student Recruitment Suite',
      description:
        'Target and communicate with potential students worldwide based on interests and qualifications.',
    },
    {
      icon: Building2,
      title: 'Professor Recruitment',
      description:
        'Attract and connect with qualified faculty members from around the world.',
    },
    {
      icon: Network,
      title: 'Alumni Engagement Network',
      description:
        'Visual alumni map, communication tools, and engagement metrics.',
    },
    {
      icon: Presentation,
      title: 'Live Info Sessions & Webinars',
      description:
        'Host live virtual sessions to promote programs and answer student questions.',
    },
  ];

  return (
    <div className='min-h-screen bg-white'>
      {/* Header */}
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

            <nav className='hidden md:flex items-center space-x-8'>
              <a
                href='#'
                onClick={() => navigate('/')}
                className='text-gray-600 hover:text-blue-600 transition-colors'
              >
                Home
              </a>
              <a
                href='#'
                onClick={() => navigate('/about')}
                className='text-gray-600 hover:text-blue-600 transition-colors'
              >
                About
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
                className='text-gray-700 hover:text-blue-600'
              >
                Sign In
              </Button>
              <Button
                onClick={() => navigate('/signup')}
                className='bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 shadow-lg px-4 sm:px-6'
              >
                Get Started
              </Button>
            </div>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className='relative py-16 sm:py-24 px-4 sm:px-6 lg:px-8'>
        <div className='absolute inset-0 bg-gradient-to-br from-blue-50/30 via-white to-indigo-50/30' />
        <div className='relative max-w-4xl mx-auto text-center'>
          <Badge className='bg-gradient-to-r from-blue-100 to-indigo-100 text-blue-700 border-blue-200 mb-6 sm:mb-8 px-4 sm:px-6 py-2 sm:py-3 text-sm font-semibold'>
            Platform Features
          </Badge>
          <h2 className='text-4xl sm:text-5xl md:text-6xl font-bold text-gray-900 mb-6 sm:mb-8'>
            Powerful{' '}
            <span className='bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent'>
              Features
            </span>{' '}
            for Global Education
          </h2>
          <p className='text-lg sm:text-xl text-gray-600 mb-8 sm:mb-12 leading-relaxed'>
            Discover the comprehensive tools and features that make Edfellow the
            premier platform for global education collaboration.
          </p>
        </div>
      </section>

      {/* General Features */}
      <section className='py-16 sm:py-20 px-4 sm:px-6 lg:px-8 bg-gray-50/50'>
        <div className='max-w-6xl mx-auto'>
          <div className='text-center mb-12 sm:mb-16'>
            <h3 className='text-3xl sm:text-4xl font-bold text-gray-900 mb-6'>
              Core Platform Features
            </h3>
            <p className='text-lg sm:text-xl text-gray-600'>
              Essential tools for all users on the Edfellow platform
            </p>
          </div>

          <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8'>
            {generalFeatures.map((feature, index) => (
              <Card
                key={index}
                className='border-0 shadow-lg hover:shadow-xl transition-all duration-300 bg-white/80 backdrop-blur-sm hover:scale-105'
              >
                <CardHeader className='text-center p-6 sm:p-8'>
                  <div className='inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-blue-600 to-indigo-600 rounded-2xl mb-4 mx-auto'>
                    <feature.icon className='h-8 w-8 text-white' />
                  </div>
                  <CardTitle className='text-lg sm:text-xl font-bold text-gray-900 mb-3'>
                    {feature.title}
                  </CardTitle>
                  <CardDescription className='text-gray-600 text-sm sm:text-base leading-relaxed'>
                    {feature.description}
                  </CardDescription>
                </CardHeader>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Student Features */}
      <section className='py-16 sm:py-20 px-4 sm:px-6 lg:px-8'>
        <div className='max-w-6xl mx-auto'>
          <div className='text-center mb-12 sm:mb-16'>
            <Badge className='bg-gradient-to-r from-blue-100 to-indigo-100 text-blue-700 border-blue-200 mb-6 px-4 py-2 text-sm font-semibold'>
              For Students
            </Badge>
            <h3 className='text-3xl sm:text-4xl font-bold text-gray-900 mb-6'>
              Student-Specific Features
            </h3>
            <p className='text-lg sm:text-xl text-gray-600'>
              Tools designed to enhance your learning journey and career
              development
            </p>
          </div>

          <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8'>
            {studentFeatures.map((feature, index) => (
              <Card
                key={index}
                className='border-0 shadow-lg hover:shadow-xl transition-all duration-300 bg-gradient-to-br from-blue-50 to-indigo-50 hover:scale-105'
              >
                <CardHeader className='text-center p-6 sm:p-8'>
                  <div className='inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-blue-600 to-indigo-600 rounded-2xl mb-4 mx-auto'>
                    <feature.icon className='h-8 w-8 text-white' />
                  </div>
                  <CardTitle className='text-lg sm:text-xl font-bold text-gray-900 mb-3'>
                    {feature.title}
                  </CardTitle>
                  <CardDescription className='text-gray-700 text-sm sm:text-base leading-relaxed'>
                    {feature.description}
                  </CardDescription>
                </CardHeader>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Professor Features */}
      <section className='py-16 sm:py-20 px-4 sm:px-6 lg:px-8 bg-gray-50/50'>
        <div className='max-w-6xl mx-auto'>
          <div className='text-center mb-12 sm:mb-16'>
            <Badge className='bg-gradient-to-r from-green-100 to-emerald-100 text-green-700 border-green-200 mb-6 px-4 py-2 text-sm font-semibold'>
              For Professors
            </Badge>
            <h3 className='text-3xl sm:text-4xl font-bold text-gray-900 mb-6'>
              Professor-Specific Features
            </h3>
            <p className='text-lg sm:text-xl text-gray-600'>
              Advanced tools for teaching, mentoring, and building your academic
              practice
            </p>
          </div>

          <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8'>
            {professorFeatures.map((feature, index) => (
              <Card
                key={index}
                className='border-0 shadow-lg hover:shadow-xl transition-all duration-300 bg-gradient-to-br from-green-50 to-emerald-50 hover:scale-105'
              >
                <CardHeader className='text-center p-6 sm:p-8'>
                  <div className='inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-green-600 to-emerald-600 rounded-2xl mb-4 mx-auto'>
                    <feature.icon className='h-8 w-8 text-white' />
                  </div>
                  <CardTitle className='text-lg sm:text-xl font-bold text-gray-900 mb-3'>
                    {feature.title}
                  </CardTitle>
                  <CardDescription className='text-gray-700 text-sm sm:text-base leading-relaxed'>
                    {feature.description}
                  </CardDescription>
                </CardHeader>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* University Features */}
      <section className='py-16 sm:py-20 px-4 sm:px-6 lg:px-8'>
        <div className='max-w-6xl mx-auto'>
          <div className='text-center mb-12 sm:mb-16'>
            <Badge className='bg-gradient-to-r from-orange-100 to-amber-100 text-orange-700 border-orange-200 mb-6 px-4 py-2 text-sm font-semibold'>
              For Universities
            </Badge>
            <h3 className='text-3xl sm:text-4xl font-bold text-gray-900 mb-6'>
              University-Specific Features
            </h3>
            <p className='text-lg sm:text-xl text-gray-600'>
              Comprehensive solutions for institutional growth and global reach
            </p>
          </div>

          <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8'>
            {universityFeatures.map((feature, index) => (
              <Card
                key={index}
                className='border-0 shadow-lg hover:shadow-xl transition-all duration-300 bg-gradient-to-br from-orange-50 to-amber-50 hover:scale-105'
              >
                <CardHeader className='text-center p-6 sm:p-8'>
                  <div className='inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-orange-600 to-amber-600 rounded-2xl mb-4 mx-auto'>
                    <feature.icon className='h-8 w-8 text-white' />
                  </div>
                  <CardTitle className='text-lg sm:text-xl font-bold text-gray-900 mb-3'>
                    {feature.title}
                  </CardTitle>
                  <CardDescription className='text-gray-700 text-sm sm:text-base leading-relaxed'>
                    {feature.description}
                  </CardDescription>
                </CardHeader>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className='py-16 sm:py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-r from-blue-600 via-indigo-600 to-blue-700 text-white'>
        <div className='max-w-4xl mx-auto text-center'>
          <h3 className='text-3xl sm:text-4xl md:text-5xl font-bold mb-6'>
            Ready to Experience These Features?
          </h3>
          <p className='text-lg sm:text-xl mb-8 sm:mb-12 opacity-90'>
            Join Edfellow today and unlock the full potential of global
            education collaboration.
          </p>

          <Button
            size='lg'
            onClick={() => navigate('/signup')}
            className='bg-white text-blue-600 hover:bg-gray-100 px-8 sm:px-12 py-3 sm:py-4 text-base sm:text-lg font-semibold shadow-2xl transform hover:scale-105 transition-all duration-200'
          >
            Start Your Journey
            <ArrowRight className='ml-2 h-4 sm:h-5 w-4 sm:w-5' />
          </Button>
        </div>
      </section>

      <LandingFooter />
    </div>
  );
};

export default Features;
