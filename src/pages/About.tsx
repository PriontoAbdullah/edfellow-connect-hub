import { LandingFooter } from '@/components/LandingFooter';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import {
  GraduationCap,
  ArrowRight,
  Target,
  Heart,
  Globe,
  Users,
  BookOpen,
  Lightbulb,
  Award,
  Handshake,
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import GlobalNavbar from '@/components/GlobalNavbar';

const About = () => {
  const navigate = useNavigate();

  const values = [
    {
      icon: Globe,
      title: 'Global Connection',
      description:
        'Breaking down geographic barriers to create meaningful educational connections worldwide.',
    },
    {
      icon: Users,
      title: 'Inclusive Community',
      description:
        'Building a diverse, welcoming space where all learners and educators can thrive.',
    },
    {
      icon: BookOpen,
      title: 'Knowledge Sharing',
      description:
        'Facilitating the free exchange of ideas, expertise, and educational resources.',
    },
    {
      icon: Lightbulb,
      title: 'Innovation',
      description:
        'Continuously evolving to meet the changing needs of global education.',
    },
    {
      icon: Award,
      title: 'Excellence',
      description:
        'Maintaining high standards in education quality and user experience.',
    },
    {
      icon: Handshake,
      title: 'Collaboration',
      description:
        'Fostering partnerships that strengthen the global academic community.',
    },
  ];

  return (
    <div className='min-h-screen bg-white'>
      <GlobalNavbar />

      {/* Hero Section */}
      <section className='relative py-16 sm:py-24 px-4 sm:px-6 lg:px-8'>
        <div className='absolute inset-0 bg-gradient-to-br from-blue-50/30 via-white to-indigo-50/30' />
        <div className='relative max-w-4xl mx-auto text-center'>
          <h2 className='text-4xl sm:text-5xl md:text-6xl font-bold text-gray-900 mb-6 sm:mb-8'>
            About{' '}
            <span className='bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent'>
              Edfellow
            </span>
          </h2>
          <p className='text-lg sm:text-xl text-gray-600 mb-8 sm:mb-12 leading-relaxed'>
            Edfellow is a global education platform designed to connect
            students, professors, and universities in a meaningful and
            collaborative way.
          </p>
        </div>
      </section>

      {/* Mission & Vision */}
      <section className='py-16 sm:py-20 px-4 sm:px-6 lg:px-8 bg-gray-50/50'>
        <div className='max-w-6xl mx-auto'>
          <div className='grid md:grid-cols-2 gap-8 sm:gap-12'>
            <Card className='relative overflow-hidden border-0 shadow-2xl bg-gradient-to-br from-blue-600 to-indigo-600 text-white'>
              <div className='absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full -translate-y-16 translate-x-16' />
              <CardHeader className='relative z-10 p-6 sm:p-8'>
                <div className='flex items-center mb-4'>
                  <div className='p-3 bg-white/20 rounded-xl backdrop-blur-sm'>
                    <Target className='h-6 sm:h-8 w-6 sm:w-8' />
                  </div>
                </div>
                <CardTitle className='text-2xl sm:text-3xl font-bold mb-4'>
                  Our Vision
                </CardTitle>
                <CardDescription className='text-blue-100 text-base sm:text-lg leading-relaxed'>
                  To create a borderless global education ecosystem where
                  students, professors, and universities collaborate
                  seamlessly—unlocking knowledge, expanding opportunities, and
                  shaping the future of learning and careers worldwide.
                </CardDescription>
              </CardHeader>
            </Card>

            <Card className='relative overflow-hidden border-0 shadow-2xl bg-gradient-to-br from-indigo-600 to-blue-700 text-white'>
              <div className='absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full -translate-y-16 translate-x-16' />
              <CardHeader className='relative z-10 p-6 sm:p-8'>
                <div className='flex items-center mb-4'>
                  <div className='p-3 bg-white/20 rounded-xl backdrop-blur-sm'>
                    <Heart className='h-6 sm:h-8 w-6 sm:w-8' />
                  </div>
                </div>
                <CardTitle className='text-2xl sm:text-3xl font-bold mb-4'>
                  Our Mission
                </CardTitle>
                <CardDescription className='text-indigo-100 text-base sm:text-lg leading-relaxed'>
                  Edfellow empowers learners and educators by connecting them
                  across continents through mentorship, shared knowledge, and
                  accessible academic opportunities. We facilitate meaningful
                  collaborations that enrich education, foster career growth,
                  and build a diverse, global academic community.
                </CardDescription>
              </CardHeader>
            </Card>
          </div>
        </div>
      </section>

      {/* Our Story */}
      <section className='py-16 sm:py-20 px-4 sm:px-6 lg:px-8'>
        <div className='max-w-4xl mx-auto'>
          <div className='text-center mb-12 sm:mb-16'>
            <h3 className='text-3xl sm:text-4xl font-bold text-gray-900 mb-6'>
              Our Story
            </h3>
            <div className='w-24 h-1 bg-gradient-to-r from-blue-600 to-indigo-600 mx-auto rounded-full mb-8'></div>
          </div>

          <div className='prose prose-lg max-w-none text-gray-700 leading-relaxed space-y-6'>
            <p className='text-base sm:text-lg'>
              At its heart, Edfellow breaks down geographic and institutional
              barriers to make education more accessible, personalized, and
              globally connected. Whether you're a student seeking to deepen
              your knowledge, a professor ready to share your expertise across
              borders, or a university aiming to reach a wider international
              audience—Edfellow brings the academic world together.
            </p>

            <p className='text-base sm:text-lg'>
              Imagine discussing your major with a student halfway across the
              world and discovering how your field is taught, applied, and
              valued in a completely different cultural and educational context.
              This kind of global exchange enriches your academic journey,
              challenges your thinking, and prepares you for success in an
              interconnected world.
            </p>

            <p className='text-base sm:text-lg'>
              Edfellow gives students the opportunity to connect with peers in
              their field worldwide, share insights, and learn from diverse
              academic experiences. Through access to global mentoring, academic
              guidance, and career counseling, students can explore career
              paths, build skills, and make informed decisions about their
              futures.
            </p>

            <p className='text-base sm:text-lg'>
              For universities, Edfellow offers a powerful platform to expand
              international reach, promote academic programs, and attract both
              students and faculty from across the globe. Together, we're
              building a truly global academic ecosystem.
            </p>
          </div>
        </div>
      </section>

      {/* Our Values */}
      <section className='py-16 sm:py-20 px-4 sm:px-6 lg:px-8 bg-gray-50/50'>
        <div className='max-w-6xl mx-auto'>
          <div className='text-center mb-12 sm:mb-16'>
            <h3 className='text-3xl sm:text-4xl font-bold text-gray-900 mb-6'>
              Our Values
            </h3>
            <p className='text-lg sm:text-xl text-gray-600'>
              The principles that guide everything we do
            </p>
          </div>

          <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8'>
            {values.map((value, index) => (
              <Card
                key={index}
                className='border-0 shadow-lg hover:shadow-xl transition-shadow duration-300 bg-white/80 backdrop-blur-sm'
              >
                <CardHeader className='text-center p-6 sm:p-8'>
                  <div className='inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-blue-600 to-indigo-600 rounded-2xl mb-4 mx-auto'>
                    <value.icon className='h-8 w-8 text-white' />
                  </div>
                  <CardTitle className='text-xl sm:text-2xl font-bold text-gray-900 mb-3'>
                    {value.title}
                  </CardTitle>
                  <CardDescription className='text-gray-600 text-sm sm:text-base leading-relaxed'>
                    {value.description}
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
            Join Our Global Community
          </h3>
          <p className='text-lg sm:text-xl mb-8 sm:mb-12 opacity-90'>
            Be part of the future of education. Connect, learn, and grow with
            Edfellow.
          </p>

          <Button
            size='lg'
            onClick={() => navigate('/signup')}
            className='bg-white text-blue-600 hover:bg-gray-100 px-8 sm:px-12 py-3 sm:py-4 text-base sm:text-lg font-semibold shadow-2xl transform hover:scale-105 transition-all duration-200'
          >
            Get Started Today
            <ArrowRight className='ml-2 h-4 sm:h-5 w-4 sm:w-5' />
          </Button>
        </div>
      </section>

      <LandingFooter />
    </div>
  );
};

export default About;
