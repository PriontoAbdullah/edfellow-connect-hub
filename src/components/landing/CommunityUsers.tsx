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
  Star,
  Users,
  MessageCircle,
  Code,
  School,
  UserCheck,
} from 'lucide-react';
import { motion } from 'framer-motion';
import { useLandingPage } from '@/hooks/useLandingPage';
import { CommunityUser } from '@/lib/api/landing';

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

export const CommunityUsers = () => {
  const { data, usersLoading, usersError } = useLandingPage();
  const [currentIndex, setCurrentIndex] = useState(0);

  const users = data?.communityUsers || [];

  // Fallback dummy data for when API fails
  const fallbackUsers = [
    {
      id: 1,
      display_name: 'Sarah Chen',
      avatar:
        'https://images.unsplash.com/photo-1534528741775-53994a69daeb?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=400&q=80',
      role: 'student',
      program: 'Computer Science',
      university: 'MIT',
      status: 'Junior',
      country: 'USA',
      skills: ['Python', 'React', 'Machine Learning'],
      rating: 4.8,
      connections_count: 156,
    },
    {
      id: 2,
      display_name: 'Dr. Alessandro Rossi',
      avatar:
        'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=400&q=80',
      role: 'professor',
      field: 'Economics',
      university: 'Bocconi University',
      publications: '47 Publications',
      country: 'Italy',
      skills: ['Behavioral Economics', 'Research'],
      rating: 4.9,
      connections_count: 234,
    },
    {
      id: 3,
      display_name: 'University of Tokyo',
      avatar:
        'https://images.unsplash.com/photo-1562774053-701939374585?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=400&q=80',
      role: 'university',
      university: 'University of Tokyo',
      ranking: '#23 Global',
      students: '28,000+ Students',
      country: 'Japan',
      fields: ['Engineering', 'Medicine', 'Technology'],
      rating: 4.7,
      connections_count: 1890,
    },
    {
      id: 4,
      display_name: 'Maria Gonzalez',
      avatar:
        'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=400&q=80',
      role: 'student',
      program: 'Biomedical Engineering',
      university: 'Universidad Politécnica de Madrid',
      status: 'Graduate',
      country: 'Spain',
      skills: ['MATLAB', '3D Modeling', 'Research'],
      rating: 4.6,
      connections_count: 89,
    },
    {
      id: 5,
      display_name: 'Dr. James Anderson',
      avatar:
        'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=400&q=80',
      role: 'professor',
      field: 'Physics',
      university: 'University of Cambridge',
      publications: '89 Publications',
      country: 'UK',
      skills: ['Quantum Physics', 'Research', 'Theoretical Physics'],
      rating: 4.9,
      connections_count: 312,
    },
    {
      id: 6,
      display_name: "King's College London",
      avatar:
        'https://images.unsplash.com/photo-1562774053-701939374585?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=400&q=80',
      role: 'university',
      university: "King's College London",
      ranking: '#35 Global',
      students: '31,000+ Students',
      country: 'UK',
      fields: ['Medicine', 'Law', 'Humanities', 'Social Sciences'],
      rating: 4.8,
      connections_count: 2156,
    },
  ];

  // Use fallback data if there's an error or no data
  const displayUsers = fallbackUsers; // Temporarily force fallback data to test

  const getRoleColor = (role: string) => {
    switch (role) {
      case 'student':
        return 'bg-blue-100 text-blue-700';
      case 'professor':
        return 'bg-green-100 text-green-700';
      case 'university':
        return 'bg-purple-100 text-purple-700';
      default:
        return 'bg-gray-100 text-gray-700';
    }
  };

  if (usersLoading) {
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
              Connect with Our Community
            </h3>
            <p className='text-base text-gray-600'>
              Join students, professors, and universities from around the world
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
                    Math.max(0, displayUsers.length - 4),
                    currentIndex + 1
                  )
                )
              }
              disabled={currentIndex >= Math.max(0, displayUsers.length - 4)}
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
            {displayUsers.map((user) => (
              <div key={user.id} className='w-full md:w-1/4 flex-shrink-0 pr-8'>
                <motion.div variants={fadeInScale}>
                  <Card className='border border-gray-200 shadow-sm hover:shadow-md transition-all duration-300 hover:scale-105 bg-white rounded-lg overflow-hidden group'>
                    <div className='relative p-6'>
                      <div className='flex flex-col items-center text-center'>
                        <div className='relative mb-4'>
                          <img
                            src={
                              user.avatar ||
                              'https://images.unsplash.com/photo-1534528741775-53994a69daeb?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=400&q=80'
                            }
                            alt={user.display_name}
                            className='w-20 h-20 rounded-full border-4 border-white shadow-xl group-hover:scale-110 transition-transform duration-300'
                          />
                          <div className='absolute -bottom-1 -right-1 w-6 h-6 bg-green-500 rounded-full border-2 border-white flex items-center justify-center'>
                            <div className='w-2 h-2 bg-white rounded-full'></div>
                          </div>
                        </div>
                        <CardTitle className='text-base font-bold text-gray-900 mb-2'>
                          {user.display_name}
                        </CardTitle>
                        <Badge
                          className={`${getRoleColor(
                            user.role
                          )} border-0 mb-2 font-semibold`}
                        >
                          {user.role.charAt(0).toUpperCase() +
                            user.role.slice(1)}
                        </Badge>
                        <CardDescription className='text-gray-600 mb-2 font-medium'>
                          {(user.program || user.field || user.university) && (
                            <div className='flex items-center gap-2 justify-center'>
                              <Code className='h-4 w-4 text-blue-500' />
                              <span>
                                {user.program || user.field || user.university}
                              </span>
                            </div>
                          )}
                        </CardDescription>
                        <CardDescription className='text-gray-600 mb-2'>
                          {user.university && user.role !== 'university' && (
                            <div className='flex items-center gap-2 justify-center'>
                              <School className='h-4 w-4 text-green-500' />
                              <span>{user.university}</span>
                            </div>
                          )}
                        </CardDescription>
                        <CardDescription className='text-gray-600 mb-2'>
                          {(user.status ||
                            user.publications ||
                            user.ranking ||
                            user.students) && (
                            <div className='flex items-center gap-2 justify-center'>
                              <UserCheck className='h-4 w-4 text-purple-500' />
                              <span>
                                {user.status ||
                                  user.publications ||
                                  user.ranking ||
                                  user.students}
                              </span>
                            </div>
                          )}
                        </CardDescription>
                        <div className='flex items-center gap-1 text-sm text-gray-500 mb-3'>
                          <MapPin className='h-3 w-3' />
                          <span>{user.country}</span>
                        </div>
                        <div className='flex items-center gap-2 mb-3'>
                          <div className='flex items-center gap-1'>
                            <Star className='h-3 w-3 text-yellow-400 fill-current' />
                            <span className='text-sm font-medium'>
                              {user.rating.toFixed(1)}
                            </span>
                          </div>
                          <div className='flex items-center gap-1'>
                            <Users className='h-3 w-3 text-blue-500' />
                            <span className='text-sm text-gray-500'>
                              {user.connections_count}
                            </span>
                          </div>
                        </div>
                        <div className='flex flex-wrap gap-1 mb-4 justify-center'>
                          {(user.skills || user.fields) &&
                            (user.skills || user.fields)!.map(
                              (skill, index) => (
                                <Badge
                                  key={index}
                                  className='bg-blue-100 text-blue-700 border-0 text-xs font-medium'
                                >
                                  {skill}
                                </Badge>
                              )
                            )}
                        </div>
                        <div className='flex gap-2 w-full'>
                          <Button className='flex-1 bg-[#0A66C2] hover:bg-[#084482] text-white font-semibold py-2 rounded-md text-sm transition-all duration-200 hover:shadow-md'>
                            Connect
                          </Button>
                          <Button
                            variant='outline'
                            size='icon'
                            className='border-gray-300 hover:border-[#0A66C2] hover:text-[#0A66C2]'
                          >
                            <MessageCircle className='h-4 w-4' />
                          </Button>
                        </div>
                      </div>
                    </div>
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
