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
  Bookmark,
  Activity,
  Users2,
  TrendingUp,
} from 'lucide-react';
import { motion } from 'framer-motion';
import { useLandingPage } from '@/hooks/useLandingPage';
import { CommunityGroup } from '@/lib/api/landing';

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

export const CommunityGroups = () => {
  const { data, groupsLoading, groupsError } = useLandingPage();
  const [currentIndex, setCurrentIndex] = useState(0);

  const groups = data?.communityGroups || [];

  const getActivityColor = (level: string) => {
    switch (level) {
      case 'high':
        return 'bg-green-100 text-green-700';
      case 'medium':
        return 'bg-yellow-100 text-yellow-700';
      case 'low':
        return 'bg-gray-100 text-gray-700';
      default:
        return 'bg-gray-100 text-gray-700';
    }
  };

  const getActivityText = (level: string) => {
    switch (level) {
      case 'high':
        return 'Very Active';
      case 'medium':
        return 'Active';
      case 'low':
        return 'Low Activity';
      default:
        return 'Active';
    }
  };

  const formatLastActivity = (dateString: string) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffInHours = Math.floor(
      (now.getTime() - date.getTime()) / (1000 * 60 * 60)
    );

    if (diffInHours < 1) return 'Just now';
    if (diffInHours < 24) return `${diffInHours} hours ago`;
    const diffInDays = Math.floor(diffInHours / 24);
    if (diffInDays < 7) return `${diffInDays} days ago`;
    return date.toLocaleDateString();
  };

  if (groupsLoading) {
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

  if (groupsError) {
    return (
      <section className='py-20 px-4 sm:px-6 lg:px-8 bg-gray-50'>
        <div className='max-w-8xl mx-auto'>
          <div className='text-center'>
            <p className='text-red-600'>
              Error loading community groups: {groupsError}
            </p>
          </div>
        </div>
      </section>
    );
  }

  if (groups.length === 0) {
    return (
      <section className='py-20 px-4 sm:px-6 lg:px-8 bg-gray-50'>
        <div className='max-w-8xl mx-auto'>
          <div className='text-center'>
            <p className='text-gray-600'>
              No community groups available at the moment.
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
              Connect by Your Major
            </h3>
            <p className='text-base text-gray-600'>
              Join subject-specific communities where students with similar
              academic interests connect, collaborate, and grow together.
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
                  Math.min(Math.max(0, groups.length - 4), currentIndex + 1)
                )
              }
              disabled={currentIndex >= Math.max(0, groups.length - 4)}
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
            {groups.map((group) => (
              <div
                key={group.id}
                className='w-full md:w-1/4 flex-shrink-0 pr-8'
              >
                <motion.div variants={fadeInScale}>
                  <Card className='border border-gray-200 shadow-sm hover:shadow-md transition-all duration-300 hover:scale-105 bg-white rounded-lg overflow-hidden group relative'>
                    {group.is_featured && (
                      <div className='absolute top-4 left-4 z-10'>
                        <Badge className='bg-gradient-to-r from-yellow-400 to-orange-500 text-white border-0 font-semibold'>
                          Featured
                        </Badge>
                      </div>
                    )}
                    <div className='relative h-48 overflow-hidden'>
                      <img
                        src={
                          group.image_url ||
                          'https://images.unsplash.com/photo-1517077304055-6e89abbf09b0?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80'
                        }
                        alt={group.name}
                        className='w-full h-full object-cover group-hover:scale-110 transition-transform duration-300'
                      />
                      <div className='absolute inset-0 bg-gradient-to-t from-black/40 to-transparent' />
                      <div className='absolute bottom-4 right-4'>
                        <Bookmark className='h-5 w-5 text-white hover:text-yellow-400 cursor-pointer transition-colors' />
                      </div>
                    </div>
                    <CardHeader className='pb-4 pt-6'>
                      <div className='flex items-center justify-between mb-4'>
                        <div className='flex items-center gap-2'>
                          <Badge
                            className={`${getActivityColor(
                              group.activity_level
                            )} border-0 font-semibold flex items-center gap-1`}
                          >
                            <Activity className='h-3 w-3' />
                            {getActivityText(group.activity_level)}
                          </Badge>
                          <div className='flex items-center gap-1 text-sm text-gray-500'>
                            <Users2 className='h-4 w-4' />
                            <span>{group.member_count.toLocaleString()}</span>
                          </div>
                        </div>
                      </div>
                      <CardTitle className='text-lg font-bold text-gray-900 pb-2'>
                        {group.name}
                      </CardTitle>
                      <p className='text-sm text-gray-600 pb-2 leading-relaxed'>
                        {group.description}
                      </p>
                      <div className='flex flex-wrap gap-2 pb-2'>
                        {group.tags.map((tag, index) => (
                          <Badge
                            key={index}
                            className='bg-blue-100 text-blue-700 border-0 text-xs font-medium'
                          >
                            {tag}
                          </Badge>
                        ))}
                      </div>
                      <div className='flex items-center justify-between text-xs text-gray-500 pb-2'>
                        <span>
                          Last active: {formatLastActivity(group.last_activity)}
                        </span>
                        <div className='flex items-center gap-1'>
                          <TrendingUp className='h-3 w-3' />
                          <span className='capitalize'>
                            {group.activity_level} Activity
                          </span>
                        </div>
                      </div>
                      <Button className='w-full bg-[#0A66C2] hover:bg-[#084482] text-white font-semibold py-3 rounded-md transition-all duration-200 hover:shadow-md'>
                        Join Group
                      </Button>
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
