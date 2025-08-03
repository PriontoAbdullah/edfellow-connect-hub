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
  Globe,
  MessageSquare,
  TrendingUp,
  Award,
  BookOpen,
  Heart,
  Star,
  MapPin,
  Calendar,
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import GlobalNavbar from '@/components/GlobalNavbar';
import { LandingFooter } from '@/components/LandingFooter';

const Community = () => {
  const navigate = useNavigate();

  const communityStats = [
    {
      icon: Users,
      number: '10,000+',
      label: 'Active Members',
      description:
        'Students, professors, and universities from around the world',
    },
    {
      icon: Globe,
      number: '50+',
      label: 'Countries',
      description: 'Representing diverse cultures and educational systems',
    },
    {
      icon: MessageSquare,
      number: '100,000+',
      label: 'Conversations',
      description: 'Meaningful exchanges happening daily',
    },
    {
      icon: BookOpen,
      number: '500+',
      label: 'Study Groups',
      description: 'Active learning communities across all fields',
    },
  ];

  const testimonials = [
    {
      name: 'Sarah Chen',
      role: 'Computer Science Student',
      university: 'University of Toronto',
      country: 'Canada',
      content:
        'Edfellow connected me with students from 15 different countries studying CS. The diversity of perspectives has completely changed how I approach problem-solving.',
      rating: 5,
    },
    {
      name: 'Dr. Ahmad Hassan',
      role: 'Professor of Engineering',
      university: 'American University of Beirut',
      country: 'Lebanon',
      content:
        "Through Edfellow, I've been able to mentor students from across the globe and collaborate with colleagues I never would have met otherwise. It's truly revolutionary.",
      rating: 5,
    },
    {
      name: 'Maria Rodriguez',
      role: 'International Relations Student',
      university: 'Universidad de Barcelona',
      country: 'Spain',
      content:
        "The global perspective I've gained through Edfellow's community has been invaluable for my studies. I've made friends and study partners worldwide.",
      rating: 5,
    },
  ];

  const communityFeatures = [
    {
      icon: Users,
      title: 'Global Study Groups',
      description:
        'Join field-specific groups with students from around the world. Share resources, discuss concepts, and learn together.',
      color: 'from-blue-500 to-cyan-500',
    },
    {
      icon: MessageSquare,
      title: 'Expert Q&A Forums',
      description:
        'Get answers from professors and industry experts. Share your knowledge and help others in your field.',
      color: 'from-indigo-500 to-blue-500',
    },
    {
      icon: Calendar,
      title: 'Virtual Events',
      description:
        'Attend workshops, seminars, and networking events hosted by universities and experts worldwide.',
      color: 'from-blue-600 to-indigo-600',
    },
    {
      icon: Award,
      title: 'Achievement Recognition',
      description:
        'Celebrate academic milestones, research breakthroughs, and career achievements with the global community.',
      color: 'from-indigo-600 to-blue-700',
    },
  ];

  return (
    <div className='min-h-screen bg-white'>
      <GlobalNavbar />

      {/* Hero Section */}
      <section className='relative py-16 sm:py-24 px-4 sm:px-6 lg:px-8'>
        <div className='absolute inset-0 bg-gradient-to-br from-blue-50/30 via-white to-indigo-50/30' />
        <div className='relative max-w-4xl mx-auto text-center'>
          <Badge className='bg-gradient-to-r from-blue-100 to-indigo-100 text-blue-700 border-blue-200 mb-6 sm:mb-8 px-4 sm:px-6 py-2 sm:py-3 text-sm font-semibold'>
            <Users className='mr-2 h-4 w-4' />
            Global Community
          </Badge>
          <h2 className='text-4xl sm:text-5xl md:text-6xl font-bold text-gray-900 mb-6 sm:mb-8'>
            Join a{' '}
            <span className='bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent'>
              Thriving
            </span>{' '}
            Global Community
          </h2>
          <p className='text-lg sm:text-xl text-gray-600 mb-8 sm:mb-12 leading-relaxed'>
            Connect with students, professors, and universities from around the
            world. Share knowledge, build relationships, and grow together in
            our vibrant educational community.
          </p>
        </div>
      </section>

      {/* Community Stats */}
      <section className='py-16 sm:py-20 px-4 sm:px-6 lg:px-8 bg-gray-50/50'>
        <div className='max-w-6xl mx-auto'>
          <div className='text-center mb-12 sm:mb-16'>
            <h3 className='text-3xl sm:text-4xl font-bold text-gray-900 mb-6'>
              Our Growing Community
            </h3>
            <p className='text-lg sm:text-xl text-gray-600'>
              Numbers that show our global impact
            </p>
          </div>

          <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8'>
            {communityStats.map((stat, index) => (
              <Card
                key={index}
                className='border-0 shadow-lg hover:shadow-xl transition-all duration-300 bg-white/80 backdrop-blur-sm text-center hover:scale-105'
              >
                <CardHeader className='p-6 sm:p-8'>
                  <div className='inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-blue-600 to-indigo-600 rounded-2xl mb-4 mx-auto'>
                    <stat.icon className='h-8 w-8 text-white' />
                  </div>
                  <div className='text-3xl sm:text-4xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent mb-2'>
                    {stat.number}
                  </div>
                  <CardTitle className='text-lg sm:text-xl font-bold text-gray-900 mb-3'>
                    {stat.label}
                  </CardTitle>
                  <CardDescription className='text-gray-600 text-sm sm:text-base'>
                    {stat.description}
                  </CardDescription>
                </CardHeader>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Community Features */}
      <section className='py-16 sm:py-20 px-4 sm:px-6 lg:px-8'>
        <div className='max-w-6xl mx-auto'>
          <div className='text-center mb-12 sm:mb-16'>
            <h3 className='text-3xl sm:text-4xl font-bold text-gray-900 mb-6'>
              Community Features
            </h3>
            <p className='text-lg sm:text-xl text-gray-600'>
              Ways to connect, learn, and grow together
            </p>
          </div>

          <div className='grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8'>
            {communityFeatures.map((feature, index) => (
              <Card
                key={index}
                className='border-0 shadow-lg hover:shadow-xl transition-all duration-300 bg-white/80 backdrop-blur-sm hover:scale-105'
              >
                <CardHeader className='p-6 sm:p-8'>
                  <div
                    className={`inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br ${feature.color} rounded-2xl mb-4`}
                  >
                    <feature.icon className='h-8 w-8 text-white' />
                  </div>
                  <CardTitle className='text-xl sm:text-2xl font-bold text-gray-900 mb-3'>
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

      {/* Testimonials */}
      <section className='py-16 sm:py-20 px-4 sm:px-6 lg:px-8 bg-gray-50/50'>
        <div className='max-w-6xl mx-auto'>
          <div className='text-center mb-12 sm:mb-16'>
            <h3 className='text-3xl sm:text-4xl font-bold text-gray-900 mb-6'>
              What Our Community Says
            </h3>
            <p className='text-lg sm:text-xl text-gray-600'>
              Real stories from our global members
            </p>
          </div>

          <div className='grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8'>
            {testimonials.map((testimonial, index) => (
              <Card
                key={index}
                className='border-0 shadow-lg hover:shadow-xl transition-all duration-300 bg-white/80 backdrop-blur-sm'
              >
                <CardHeader className='p-6 sm:p-8'>
                  <div className='flex items-center mb-4'>
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <Star
                        key={i}
                        className='h-5 w-5 text-yellow-400 fill-current'
                      />
                    ))}
                  </div>
                  <CardDescription className='text-gray-700 text-sm sm:text-base leading-relaxed mb-6 italic'>
                    "{testimonial.content}"
                  </CardDescription>
                  <div className='border-t pt-4'>
                    <CardTitle className='text-lg font-bold text-gray-900'>
                      {testimonial.name}
                    </CardTitle>
                    <p className='text-blue-600 font-medium text-sm'>
                      {testimonial.role}
                    </p>
                    <div className='flex items-center text-gray-500 text-sm mt-1'>
                      <MapPin className='h-4 w-4 mr-1' />
                      <span>
                        {testimonial.university}, {testimonial.country}
                      </span>
                    </div>
                  </div>
                </CardHeader>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Join Community CTA */}
      <section className='py-16 sm:py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-r from-blue-600 via-indigo-600 to-blue-700 text-white'>
        <div className='max-w-4xl mx-auto text-center'>
          <div className='inline-flex items-center justify-center w-20 h-20 bg-white/20 rounded-full mb-8 backdrop-blur-sm'>
            <Heart className='h-10 w-10 text-white' />
          </div>
          <h3 className='text-3xl sm:text-4xl md:text-5xl font-bold mb-6'>
            Ready to Join Our Community?
          </h3>
          <p className='text-lg sm:text-xl mb-8 sm:mb-12 opacity-90'>
            Become part of a global network of learners, educators, and
            institutions working together to shape the future of education.
          </p>

          <Button
            size='lg'
            onClick={() => navigate('/signup')}
            className='bg-white text-blue-600 hover:bg-gray-100 px-8 sm:px-12 py-3 sm:py-4 text-base sm:text-lg font-semibold shadow-2xl transform hover:scale-105 transition-all duration-200'
          >
            Join the Community
            <ArrowRight className='ml-2 h-4 sm:h-5 w-4 sm:w-5' />
          </Button>

          <div className='flex items-center justify-center space-x-2 text-sm opacity-80 mt-6 sm:mt-8'>
            <Users className='h-4 w-4' />
            <span>Join 10,000+ members worldwide</span>
          </div>
        </div>
      </section>

      <LandingFooter />
    </div>
  );
};

export default Community;
