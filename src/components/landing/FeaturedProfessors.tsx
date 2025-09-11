import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import {
  ArrowLeft,
  ArrowRight,
  Star,
  Clock,
  MessageCircle,
  User,
} from 'lucide-react';
import { motion } from 'framer-motion';
import { useLandingPage } from '@/hooks/useLandingPage';
import { FeaturedProfessor } from '@/lib/api/landing';

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

export const FeaturedProfessors = () => {
  const { data, professorsLoading, professorsError } = useLandingPage();
  const [currentIndex, setCurrentIndex] = useState(0);

  const professors = data?.featuredProfessors || [];

  if (professorsLoading) {
    return (
      <section className='py-20 px-4 sm:px-6 lg:px-8 bg-gray-50'>
        <div className='max-w-8xl mx-auto'>
          <div className='text-center'>
            <div className='animate-pulse'>
              <div className='h-8 bg-gray-200 rounded w-1/3 mx-auto mb-4'></div>
              <div className='h-4 bg-gray-200 rounded w-1/2 mx-auto'></div>
            </div>
          </div>
        </div>
      </section>
    );
  }

  if (professorsError) {
    return (
      <section className='py-20 px-4 sm:px-6 lg:px-8 bg-gray-50'>
        <div className='max-w-8xl mx-auto'>
          <div className='text-center'>
            <p className='text-red-600'>
              Error loading featured professors: {professorsError}
            </p>
          </div>
        </div>
      </section>
    );
  }

  if (professors.length === 0) {
    return (
      <section className='py-20 px-4 sm:px-6 lg:px-8 bg-gray-50'>
        <div className='max-w-8xl mx-auto'>
          <div className='text-center'>
            <p className='text-gray-600'>
              No featured professors available at the moment.
            </p>
          </div>
        </div>
      </section>
    );
  }

  return (
    <motion.section
      className='py-20 px-4 sm:px-6 lg:px-8 bg-gray-50'
      initial='initial'
      whileInView='animate'
      viewport={{ once: true, amount: 0.2 }}
      variants={fadeInUp}
    >
      <div className='max-w-8xl mx-auto'>
        <motion.div
          className='flex justify-between items-center mb-16 px-12'
          variants={staggerContainer}
        >
          <motion.div variants={fadeInUp}>
            <h3 className='text-2xl sm:text-3xl font-bold text-gray-900 mb-2'>
              Learn from the Best Professors
            </h3>
            <p className='text-base text-gray-600'>
              Book one-on-one mentorship sessions with world-class professors.
              Get personalized guidance for your academic and career journey.
            </p>
          </motion.div>
          <motion.div className='flex gap-2' variants={fadeInUp}>
            <Button
              variant='outline'
              size='icon'
              onClick={() => setCurrentIndex(Math.max(0, currentIndex - 1))}
              disabled={currentIndex === 0}
              className='border-gray-300 hover:border-[#0A66C2] hover:text-[#0A66C2]'
            >
              <ArrowLeft className='h-4 w-4' />
            </Button>
            <Button
              variant='outline'
              size='icon'
              onClick={() =>
                setCurrentIndex(
                  Math.min(Math.max(0, professors.length - 4), currentIndex + 1)
                )
              }
              disabled={currentIndex >= Math.max(0, professors.length - 4)}
              className='border-gray-300 hover:border-[#0A66C2] hover:text-[#0A66C2]'
            >
              <ArrowRight className='h-4 w-4' />
            </Button>
          </motion.div>
        </motion.div>
        <div className='relative overflow-hidden px-12'>
          <div
            className='flex transition-transform duration-300 ease-in-out pb-8'
            style={{
              transform: `translateX(-${currentIndex * 25}%)`,
            }}
          >
            {professors.map((professor) => (
              <div
                key={professor.id}
                className='w-full md:w-1/4 flex-shrink-0 pr-8'
              >
                <motion.div variants={fadeInScale}>
                  <Card className='border border-gray-200 shadow-sm hover:shadow-md transition-all duration-300 hover:scale-105 bg-white rounded-lg'>
                    <CardHeader className='flex flex-col items-center pb-4'>
                      <img
                        src={
                          professor.avatar ||
                          'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=400&q=80'
                        }
                        alt={professor.display_name}
                        className='w-20 h-20 rounded-full mb-4 border-4 border-gray-100 shadow'
                      />
                      <CardTitle className='text-base font-bold text-gray-900 text-center'>
                        {professor.display_name}
                      </CardTitle>
                      <CardDescription className='text-gray-600 text-center'>
                        {professor.title}
                      </CardDescription>
                      <CardDescription className='text-gray-600 text-center pb-1'>
                        {professor.university}
                      </CardDescription>
                      <div className='flex items-center gap-1 pb-1'>
                        <Star className='h-5 w-5 text-yellow-400 fill-current' />
                        <span className='text-base text-gray-600'>
                          {professor.rating.toFixed(1)} (
                          {professor.reviews_count})
                        </span>
                      </div>
                      <div className='text-lg font-semibold text-[#0A66C2] pb-1'>
                        ${professor.hourly_rate}/hour
                      </div>
                      <div className='flex flex-wrap gap-2 pb-1 justify-center'>
                        {professor.specialties
                          .slice(0, 2)
                          .map((specialty, index) => (
                            <Badge
                              key={index}
                              className='bg-blue-100 text-blue-700 border-0 text-xs'
                            >
                              {specialty}
                            </Badge>
                          ))}
                        {professor.specialties.length > 2 && (
                          <Badge className='bg-blue-100 text-blue-700 border-0 text-xs'>
                            +{professor.specialties.length - 2}
                          </Badge>
                        )}
                      </div>
                      <div className='flex items-center gap-2 pb-1 text-sm text-gray-500'>
                        <Clock className='h-4 w-4' />
                        <span>{professor.sessions_completed} sessions</span>
                      </div>
                      <div className='text-sm text-green-600 pb-2 font-medium'>
                        {professor.availability}
                      </div>
                      <div className='flex gap-2 w-full'>
                        <Button className='flex-1 bg-[#0A66C2] hover:bg-[#084482] text-white font-semibold'>
                          Book Session
                        </Button>
                        <Button
                          variant='outline'
                          size='icon'
                          className='border-gray-300 hover:border-[#0A66C2] hover:text-[#0A66C2]'
                        >
                          <MessageCircle className='h-4 w-4' />
                        </Button>
                        <Button
                          variant='outline'
                          size='icon'
                          className='border-gray-300 hover:border-[#0A66C2] hover:text-[#0A66C2]'
                        >
                          <User className='h-4 w-4' />
                        </Button>
                      </div>
                    </CardHeader>
                  </Card>
                </motion.div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </motion.section>
  );
};
