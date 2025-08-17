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
import { motion } from 'framer-motion';
import { Badge } from '@/components/ui/badge';

// Animation variants
const fadeInUp = {
  initial: { opacity: 0, y: 60 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.6, ease: 'easeOut' },
};

const staggerContainer = {
  animate: {
    transition: {
      staggerChildren: 0.1,
    },
  },
};

const fadeInScale = {
  initial: { opacity: 0, scale: 0.9 },
  animate: { opacity: 1, scale: 1 },
  transition: { duration: 0.5, ease: 'easeOut' },
};

const slideInLeft = {
  initial: { opacity: 0, x: -60 },
  animate: { opacity: 1, x: 0 },
  transition: { duration: 0.6, ease: 'easeOut' },
};

const slideInRight = {
  initial: { opacity: 0, x: 60 },
  animate: { opacity: 1, x: 0 },
  transition: { duration: 0.6, ease: 'easeOut' },
};

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
      <motion.section
        className='relative py-28 px-4 sm:px-6 lg:px-8 overflow-hidden min-h-[600px] flex items-center justify-center'
        initial='initial'
        whileInView='animate'
        viewport={{ once: true, amount: 0.3 }}
        variants={fadeInUp}
      >
        {/* Globe SVG Background */}
        <motion.img
          src='/globe.svg'
          alt='Global Network Globe'
          className='absolute inset-0 w-full h-full object-cover opacity-35 pointer-events-none select-none z-0'
          style={{ objectPosition: 'center top' }}
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 0.35 }}
          transition={{ duration: 1.2, ease: 'easeOut' }}
        />
        {/* Overlay for readability */}
        <div className='absolute inset-0 bg-gradient-to-b from-white/40 via-blue-50/30 to-indigo-100/40 z-10' />
        <motion.div
          className='relative z-20 max-w-3xl mx-auto w-full flex flex-col items-center justify-center text-center mt-2'
          variants={staggerContainer}
        >
          <motion.div variants={fadeInUp}>
            <Badge className='bg-white/90 backdrop-blur-sm text-[#0A66C2] border-blue-200 mb-8 px-6 py-3 text-base font-semibold shadow-lg mx-auto hover:bg-white/90'>
              About Our Platform
            </Badge>
          </motion.div>
          <motion.h2
            className='text-4xl sm:text-5xl font-bold text-gray-900 mb-6 leading-tight'
            variants={fadeInUp}
          >
            About <span className='text-[#0A66C2]'>Edfellow</span>
          </motion.h2>
          <motion.p
            className='text-base text-gray-600 leading-relaxed max-w-2xl mx-auto'
            variants={fadeInUp}
          >
            Edfellow is a global education platform designed to connect
            students, professors, and universities in a meaningful and
            collaborative way.
          </motion.p>
        </motion.div>
      </motion.section>

      {/* Mission & Vision */}
      <motion.section
        className='py-20 px-4 sm:px-6 lg:px-8 bg-gray-50'
        initial='initial'
        whileInView='animate'
        viewport={{ once: true, amount: 0.2 }}
        variants={fadeInUp}
      >
        <div className='max-w-6xl mx-auto'>
          <motion.div
            className='grid md:grid-cols-2 gap-8 sm:gap-12'
            variants={staggerContainer}
          >
            <motion.div variants={slideInLeft}>
              <Card className='relative overflow-hidden border-0 shadow-2xl bg-gradient-to-br from-[#0A66C2] to-[#084482] text-white hover:shadow-3xl transition-all duration-300 hover:scale-105'>
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
            </motion.div>

            <motion.div variants={slideInRight}>
              <Card className='relative overflow-hidden border-0 shadow-2xl bg-gradient-to-br from-[#084482] to-[#0A66C2] text-white hover:shadow-3xl transition-all duration-300 hover:scale-105'>
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
            </motion.div>
          </motion.div>
        </div>
      </motion.section>

      {/* Our Story */}
      <motion.section
        className='py-20 px-4 sm:px-6 lg:px-8'
        initial='initial'
        whileInView='animate'
        viewport={{ once: true, amount: 0.2 }}
        variants={fadeInUp}
      >
        <div className='max-w-4xl mx-auto'>
          <motion.div
            className='text-center mb-12 sm:mb-16'
            variants={staggerContainer}
          >
            <motion.h3
              className='text-3xl sm:text-4xl font-bold text-gray-900 mb-6'
              variants={fadeInUp}
            >
              Our Story
            </motion.h3>
            <motion.div
              className='w-24 h-1 bg-gradient-to-r from-[#0A66C2] to-[#084482] mx-auto rounded-full mb-8'
              variants={fadeInUp}
            ></motion.div>
          </motion.div>

          <motion.div
            className='prose prose-lg max-w-none text-gray-700 leading-relaxed space-y-6'
            variants={staggerContainer}
          >
            <motion.p className='text-base sm:text-lg' variants={fadeInUp}>
              At its heart, Edfellow breaks down geographic and institutional
              barriers to make education more accessible, personalized, and
              globally connected. Whether you're a student seeking to deepen
              your knowledge, a professor ready to share your expertise across
              borders, or a university aiming to reach a wider international
              audience—Edfellow brings the academic world together.
            </motion.p>

            <motion.p className='text-base sm:text-lg' variants={fadeInUp}>
              Imagine discussing your major with a student halfway across the
              world and discovering how your field is taught, applied, and
              valued in a completely different cultural and educational context.
              This kind of global exchange enriches your academic journey,
              challenges your thinking, and prepares you for success in an
              interconnected world.
            </motion.p>

            <motion.p className='text-base sm:text-lg' variants={fadeInUp}>
              Edfellow gives students the opportunity to connect with peers in
              their field worldwide, share insights, and learn from diverse
              academic experiences. Through access to global mentoring, academic
              guidance, and career counseling, students can explore career
              paths, build skills, and make informed decisions about their
              futures.
            </motion.p>

            <motion.p className='text-base sm:text-lg' variants={fadeInUp}>
              For universities, Edfellow offers a powerful platform to expand
              international reach, promote academic programs, and attract both
              students and faculty from across the globe. Together, we're
              building a truly global academic ecosystem.
            </motion.p>
          </motion.div>
        </div>
      </motion.section>

      {/* Our Values */}
      <motion.section
        className='py-20 px-4 sm:px-6 lg:px-8 bg-gray-50'
        initial='initial'
        whileInView='animate'
        viewport={{ once: true, amount: 0.2 }}
        variants={fadeInUp}
      >
        <div className='max-w-6xl mx-auto'>
          <motion.div
            className='text-center mb-12 sm:mb-16'
            variants={staggerContainer}
          >
            <motion.h3
              className='text-3xl sm:text-4xl font-bold text-gray-900 mb-6'
              variants={fadeInUp}
            >
              Our Values
            </motion.h3>
            <motion.p
              className='text-lg sm:text-xl text-gray-600'
              variants={fadeInUp}
            >
              The principles that guide everything we do
            </motion.p>
          </motion.div>

          <motion.div
            className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8'
            variants={staggerContainer}
          >
            {values.map((value, index) => {
              const IconComponent = value.icon;
              return (
                <motion.div
                  key={index}
                  variants={fadeInScale}
                  whileHover={{ scale: 1.05 }}
                  transition={{ duration: 0.3 }}
                >
                  <Card className='border border-gray-200 shadow-sm hover:shadow-md transition-all duration-300 bg-white rounded-lg p-2'>
                    <CardHeader className='text-center p-6 sm:p-8'>
                      <motion.div
                        className='inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-[#0A66C2] to-[#084482] rounded-2xl mb-4 mx-auto shadow-lg'
                        whileHover={{ rotate: 5, scale: 1.1 }}
                        transition={{ duration: 0.3 }}
                      >
                        <IconComponent className='h-8 w-8 text-white' />
                      </motion.div>
                      <CardTitle className='text-xl sm:text-2xl font-bold text-gray-900 mb-3'>
                        {value.title}
                      </CardTitle>
                      <CardDescription className='text-gray-600 text-sm sm:text-base leading-relaxed'>
                        {value.description}
                      </CardDescription>
                    </CardHeader>
                  </Card>
                </motion.div>
              );
            })}
          </motion.div>
        </div>
      </motion.section>

      {/* CTA Section */}
      <motion.section
        className='py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-r from-[#0A66C2] via-[#084482] to-[#0A66C2] text-white'
        initial='initial'
        whileInView='animate'
        viewport={{ once: true, amount: 0.2 }}
        variants={fadeInUp}
      >
        <div className='max-w-4xl mx-auto text-center'>
          <motion.h3
            className='text-3xl sm:text-4xl md:text-5xl font-bold mb-6'
            variants={fadeInUp}
          >
            Join Our Global Community
          </motion.h3>
          <motion.p
            className='text-lg sm:text-xl mb-8 sm:mb-12 opacity-90'
            variants={fadeInUp}
          >
            Be part of the future of education. Connect, learn, and grow with
            Edfellow.
          </motion.p>

          <motion.div variants={fadeInUp}>
            <Button
              size='lg'
              onClick={() => navigate('/signup')}
              className='bg-white text-[#0A66C2] hover:bg-gray-100 px-8 sm:px-12 py-3 sm:py-4 text-base sm:text-lg font-semibold shadow-2xl transform hover:scale-105 transition-all duration-200'
            >
              Get Started Today
              <ArrowRight className='ml-2 h-4 sm:h-5 w-4 sm:w-5' />
            </Button>
          </motion.div>
        </div>
      </motion.section>

      <LandingFooter />
    </div>
  );
};

export default About;
