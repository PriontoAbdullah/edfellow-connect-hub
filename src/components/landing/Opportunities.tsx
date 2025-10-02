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
  MapPin,
  Clock,
  DollarSign,
  Star,
  ExternalLink,
} from 'lucide-react';
import { motion } from 'framer-motion';
import { useLandingPage } from '@/hooks/useLandingPage';
import { Opportunity } from '@/lib/api/landing';

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

export const Opportunities = () => {
  const { data, opportunitiesLoading, opportunitiesError } = useLandingPage();
  const [currentIndex, setCurrentIndex] = useState(0);

  const opportunities = data?.opportunities || [];

  // Fallback dummy data for when API fails
  const fallbackOpportunities = [
    {
      id: 1,
      title: 'Software Engineering Internship',
      organization: 'Google',
      organization_logo:
        'https://images.unsplash.com/photo-1562774053-701939374585?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=400&q=80',
      type: 'internship',
      location: 'Mountain View, CA',
      duration: '3 months',
      salary: '$8,000/month',
      rating: 4.8,
      image_url:
        'https://images.unsplash.com/photo-1517077304055-6e89abbf09b0?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80',
      application_deadline: '2024-03-15',
    },
    {
      id: 2,
      title: 'Fulbright Scholarship Program',
      organization: 'Fulbright Commission',
      organization_logo:
        'https://images.unsplash.com/photo-1562774053-701939374585?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=400&q=80',
      type: 'scholarship',
      location: 'Global',
      duration: '1 year',
      salary: 'Full Funding',
      rating: 4.9,
      image_url:
        'https://images.unsplash.com/photo-1559757148-5c350d0d3c56?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80',
      application_deadline: '2024-04-30',
    },
    {
      id: 3,
      title: 'Research Assistant Position',
      organization: 'MIT',
      organization_logo:
        'https://images.unsplash.com/photo-1541339907198-e08756dedf3f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=400&q=80',
      type: 'research',
      location: 'Cambridge, MA',
      duration: '2 years',
      salary: '$45,000/year',
      rating: 4.7,
      image_url:
        'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80',
      application_deadline: '2024-02-28',
    },
    {
      id: 4,
      title: 'Data Scientist',
      organization: 'Microsoft',
      organization_logo:
        'https://images.unsplash.com/photo-1562774053-701939374585?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=400&q=80',
      type: 'job',
      location: 'Seattle, WA',
      duration: 'Full-time',
      salary: '$120,000/year',
      rating: 4.6,
      image_url:
        'https://images.unsplash.com/photo-1554224155-6726b3ff858f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80',
      application_deadline: '2024-03-20',
    },
    {
      id: 5,
      title: 'Chevening Scholarship',
      organization: 'UK Government',
      organization_logo:
        'https://images.unsplash.com/photo-1562774053-701939374585?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=400&q=80',
      type: 'scholarship',
      location: 'United Kingdom',
      duration: '1 year',
      salary: 'Full Funding',
      rating: 4.8,
      image_url:
        'https://images.unsplash.com/photo-1559757148-5c350d0d3c56?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80',
      application_deadline: '2024-11-01',
    },
    {
      id: 6,
      title: 'Product Manager Intern',
      organization: 'Apple',
      organization_logo:
        'https://images.unsplash.com/photo-1562774053-701939374585?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=400&q=80',
      type: 'internship',
      location: 'Cupertino, CA',
      duration: '4 months',
      salary: '$7,500/month',
      rating: 4.9,
      image_url:
        'https://images.unsplash.com/photo-1541961017774-22349e4a1262?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80',
      application_deadline: '2024-02-15',
    },
  ];

  // Use fallback data if there's an error or no data
  const displayOpportunities = fallbackOpportunities; // Temporarily force fallback data to test

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'job':
        return 'bg-orange-100 text-orange-700';
      case 'scholarship':
        return 'bg-blue-100 text-blue-700';
      case 'internship':
        return 'bg-purple-100 text-purple-700';
      case 'research':
        return 'bg-green-100 text-green-700';
      default:
        return 'bg-gray-100 text-gray-700';
    }
  };

  const getTypeLabel = (type: string) => {
    switch (type) {
      case 'job':
        return 'Job';
      case 'scholarship':
        return 'Scholarship';
      case 'internship':
        return 'Internship';
      case 'research':
        return 'Research';
      default:
        return 'Opportunity';
    }
  };

  const formatDeadline = (deadline?: string) => {
    if (!deadline) return 'No deadline';
    const date = new Date(deadline);
    const now = new Date();
    const diffInDays = Math.ceil(
      (date.getTime() - now.getTime()) / (1000 * 60 * 60 * 24)
    );

    if (diffInDays < 0) return 'Expired';
    if (diffInDays === 0) return 'Today';
    if (diffInDays === 1) return 'Tomorrow';
    if (diffInDays < 7) return `${diffInDays} days left`;
    return date.toLocaleDateString();
  };

  if (opportunitiesLoading) {
    return (
      <section className='py-20 px-4 sm:px-6 lg:px-8 bg-white'>
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

  return (
    <motion.section
      className='py-20 px-4 sm:px-6 lg:px-8 bg-white'
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
              Latest Opportunities
            </h3>
            <p className='text-base text-gray-600'>
              Discover job opportunities, scholarships, and research positions
              from top institutions worldwide.
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
                  Math.min(
                    Math.max(0, displayOpportunities.length - 4),
                    currentIndex + 1
                  )
                )
              }
              disabled={
                currentIndex >= Math.max(0, displayOpportunities.length - 4)
              }
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
            {displayOpportunities.map((opportunity) => (
              <div
                key={opportunity.id}
                className='w-full md:w-1/4 flex-shrink-0 pr-8'
              >
                <motion.div variants={fadeInScale}>
                  <Card className='border border-gray-200 shadow-sm hover:shadow-md transition-all duration-300 hover:scale-105 bg-white rounded-lg overflow-hidden group'>
                    <div className='relative'>
                      <img
                        src={
                          opportunity.image_url ||
                          'https://images.unsplash.com/photo-1559757148-5c350d0d3c56?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80'
                        }
                        alt={opportunity.title}
                        className='w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300'
                      />
                      <Badge
                        className={`absolute top-4 right-4 ${getTypeColor(
                          opportunity.type
                        )} border-0 font-semibold`}
                      >
                        {getTypeLabel(opportunity.type)}
                      </Badge>
                      <div className='absolute bottom-4 left-4'>
                        <img
                          src={
                            opportunity.organization_logo ||
                            'https://images.unsplash.com/photo-1562774053-701939374585?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=400&q=80'
                          }
                          alt={opportunity.organization}
                          className='w-12 h-12 rounded-full border-2 border-white shadow-lg'
                        />
                      </div>
                      <div className='absolute inset-0 bg-gradient-to-t from-black/20 to-transparent' />
                    </div>
                    <CardHeader className='pb-4 pt-6'>
                      <CardTitle className='text-lg font-bold text-gray-900 mb-2'>
                        {opportunity.title}
                      </CardTitle>
                      <CardDescription className='text-gray-600 mb-4 font-medium'>
                        {opportunity.organization}
                      </CardDescription>
                      <div className='flex items-center space-x-1 mb-4'>
                        {[...Array(5)].map((_, i) => (
                          <Star
                            key={i}
                            className={`h-4 w-4 ${
                              i < Math.floor(opportunity.rating)
                                ? 'text-yellow-400 fill-current'
                                : 'text-gray-300'
                            }`}
                          />
                        ))}
                        <span className='text-sm text-gray-600 ml-1'>
                          {opportunity.rating.toFixed(1)}
                        </span>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <div className='flex items-center justify-between text-sm text-gray-500 mb-4'>
                        <div className='flex items-center gap-1'>
                          <MapPin className='h-4 w-4' />
                          <span>{opportunity.location}</span>
                        </div>
                        <div className='flex items-center gap-1'>
                          <Clock className='h-4 w-4' />
                          <span>{opportunity.duration || 'Full-time'}</span>
                        </div>
                        <div className='flex items-center gap-1'>
                          <DollarSign className='h-4 w-4' />
                          <span>{opportunity.salary || 'Competitive'}</span>
                        </div>
                      </div>
                      <div className='text-xs text-gray-500 mb-4'>
                        Deadline:{' '}
                        {formatDeadline(opportunity.application_deadline)}
                      </div>
                      <Button className='w-full bg-[#0A66C2] hover:bg-[#084482] text-white font-semibold py-3 rounded-md transition-all duration-200 hover:shadow-md'>
                        Apply Now
                        <ExternalLink className='ml-2 h-4 w-4' />
                      </Button>
                    </CardContent>
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
