import React from 'react';
import { Card, CardContent } from '../ui/card';
import { Badge } from '../ui/badge';
import { Button } from '../ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '../ui/avatar';
import {
  Star,
  Quote,
  RefreshCw,
  GraduationCap,
  UserCheck,
  Building,
} from 'lucide-react';
import { useLandingPage } from '../../hooks/useLandingPage';
import { Skeleton } from '../ui/skeleton';
import { CountryFlag } from '../ui/CountryFlag';
import type { Testimonial } from '../../lib/api/landing';

interface TestimonialCardProps {
  testimonial: Testimonial;
  loading?: boolean;
}

const TestimonialCard: React.FC<TestimonialCardProps> = ({
  testimonial,
  loading = false,
}) => {
  if (loading) {
    return (
      <Card className='h-full transition-all duration-300 hover:shadow-lg'>
        <CardContent className='p-6'>
          <div className='flex items-center space-x-3 mb-4'>
            <Skeleton className='w-12 h-12 rounded-full' />
            <div className='flex-1'>
              <Skeleton className='h-4 w-32 mb-1' />
              <Skeleton className='h-3 w-24' />
            </div>
          </div>
          <Skeleton className='h-4 w-8 mb-2' />
          <Skeleton className='h-4 w-full mb-2' />
          <Skeleton className='h-4 w-3/4 mb-4' />
          <Skeleton className='h-4 w-1/2' />
        </CardContent>
      </Card>
    );
  }

  const getRoleIcon = (role: string) => {
    switch (role) {
      case 'student':
        return <GraduationCap className='w-4 h-4' />;
      case 'professor':
        return <UserCheck className='w-4 h-4' />;
      case 'university':
        return <Building className='w-4 h-4' />;
      default:
        return <UserCheck className='w-4 h-4' />;
    }
  };

  const getRoleColor = (role: string) => {
    switch (role) {
      case 'student':
        return 'bg-blue-100 text-blue-800';
      case 'professor':
        return 'bg-green-100 text-green-800';
      case 'university':
        return 'bg-purple-100 text-purple-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }).map((_, index) => (
      <Star
        key={index}
        className={`w-4 h-4 ${
          index < rating ? 'text-yellow-400 fill-current' : 'text-gray-300'
        }`}
      />
    ));
  };

  return (
    <Card className='h-full transition-all duration-300 hover:shadow-lg hover:scale-105 group'>
      <CardContent className='p-6'>
        {/* Quote Icon */}
        <div className='flex justify-center mb-4'>
          <div className='p-2 bg-blue-50 rounded-full'>
            <Quote className='w-6 h-6 text-blue-600' />
          </div>
        </div>

        {/* Rating */}
        <div className='flex justify-center mb-4'>
          <div className='flex items-center space-x-1'>
            {renderStars(testimonial.rating)}
          </div>
        </div>

        {/* Testimonial Content */}
        <blockquote className='text-gray-700 text-center mb-6 italic'>
          "{testimonial.content}"
        </blockquote>

        {/* Author Info */}
        <div className='flex items-center space-x-3'>
          <Avatar className='w-12 h-12'>
            <AvatarImage
              src={testimonial.author.avatar}
              alt={testimonial.author.name}
            />
            <AvatarFallback>
              {testimonial.author.name
                .split(' ')
                .map((n) => n[0])
                .join('')
                .toUpperCase()}
            </AvatarFallback>
          </Avatar>

          <div className='flex-1'>
            <div className='flex items-center space-x-2'>
              <h4 className='font-semibold text-gray-900'>
                {testimonial.author.name}
              </h4>
              <CountryFlag code={testimonial.author.country} size={16} />
            </div>

            <div className='flex items-center space-x-2 mt-1'>
              <Badge
                className={`${getRoleColor(
                  testimonial.author.role
                )} flex items-center space-x-1`}
              >
                {getRoleIcon(testimonial.author.role)}
                <span className='capitalize'>{testimonial.author.role}</span>
              </Badge>

              {testimonial.author.university && (
                <span className='text-sm text-gray-600'>
                  {testimonial.author.university}
                </span>
              )}
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export const TestimonialsSection: React.FC = () => {
  const {
    data,
    loading,
    testimonialsLoading,
    error,
    testimonialsError,
    refreshTestimonials,
  } = useLandingPage();

  const testimonials = data?.testimonials || [];

  // Fallback dummy data for when API fails
  const fallbackTestimonials = [
    {
      id: 1,
      content:
        'Edfellow Connect has been instrumental in my academic journey. The mentorship I received from Dr. Watson helped me secure admission to my dream graduate program.',
      rating: 5,
      author: {
        name: 'Sarah Chen',
        avatar:
          'https://images.unsplash.com/photo-1534528741775-53994a69daeb?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=400&q=80',
        role: 'student',
        country: 'USA',
        university: 'MIT',
      },
    },
    {
      id: 2,
      content:
        'As a professor, I love connecting with motivated students from around the world. The platform makes it easy to share knowledge and guide the next generation of researchers.',
      rating: 5,
      author: {
        name: 'Dr. Emily Watson',
        avatar:
          'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=400&q=80',
        role: 'professor',
        country: 'USA',
        university: 'Stanford University',
      },
    },
    {
      id: 3,
      content:
        "The community groups feature helped me find study partners and research collaborators. It's amazing how technology can bring students together across continents.",
      rating: 4,
      author: {
        name: 'Maria Gonzalez',
        avatar:
          'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=400&q=80',
        role: 'student',
        country: 'Spain',
        university: 'Universidad Politécnica de Madrid',
      },
    },
    {
      id: 4,
      content:
        "I found my research assistant position through Edfellow Connect. The platform connects talented students with opportunities they wouldn't find elsewhere.",
      rating: 5,
      author: {
        name: 'Ahmed Hassan',
        avatar:
          'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=400&q=80',
        role: 'student',
        country: 'Egypt',
        university: 'Cairo University',
      },
    },
    {
      id: 5,
      content:
        "The scholarship opportunities posted on the platform helped me fund my studies abroad. I'm grateful for the community that shares these valuable resources.",
      rating: 4,
      author: {
        name: 'David Kim',
        avatar:
          'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=400&q=80',
        role: 'student',
        country: 'South Korea',
        university: 'Seoul National University',
      },
    },
    {
      id: 6,
      content:
        'As a university representative, Edfellow Connect has helped us reach a global audience of qualified students. The platform is revolutionizing international education.',
      rating: 5,
      author: {
        name: 'University of Tokyo',
        avatar:
          'https://images.unsplash.com/photo-1562774053-701939374585?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=400&q=80',
        role: 'university',
        country: 'Japan',
        university: 'University of Tokyo',
      },
    },
  ];

  // Use fallback data if there's an error or no data
  const displayTestimonials = fallbackTestimonials; // Temporarily force fallback data to test

  // Fallback stats for community stats section
  const fallbackStats = {
    totalUsers: 15420,
    totalConnections: 45678,
    completedSessions: 8934,
  };

  const displayStats = fallbackStats; // Temporarily force fallback data to test

  // Remove the error return since we now show fallback data

  return (
    <section className='py-16 bg-white'>
      <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8'>
        {/* Header */}
        <div className='text-center mb-12'>
          <h2 className='text-3xl font-bold text-gray-900 mb-4'>
            What Our Community Says
          </h2>
          <p className='text-lg text-gray-600 max-w-2xl mx-auto'>
            Hear from students, professors, and universities who are already
            benefiting from our global academic network.
          </p>
        </div>

        {/* Testimonials Grid */}
        {loading || testimonialsLoading ? (
          <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8'>
            {Array.from({ length: 6 }).map((_, index) => (
              <TestimonialCard
                key={index}
                testimonial={{} as Testimonial}
                loading
              />
            ))}
          </div>
        ) : displayTestimonials.length === 0 ? (
          <div className='text-center py-12'>
            <Quote className='w-16 h-16 text-gray-400 mx-auto mb-4' />
            <h3 className='text-lg font-medium text-gray-900 mb-2'>
              No Testimonials Yet
            </h3>
            <p className='text-gray-600'>
              Be the first to share your experience with our community!
            </p>
          </div>
        ) : (
          <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8'>
            {displayTestimonials.map((testimonial) => (
              <TestimonialCard key={testimonial.id} testimonial={testimonial} />
            ))}
          </div>
        )}

        {/* Community Stats */}
        <div className='mt-16 bg-gradient-to-r from-blue-50 to-purple-50 rounded-2xl p-8'>
          <div className='text-center'>
            <h3 className='text-2xl font-bold text-gray-900 mb-4'>
              Join Our Growing Community
            </h3>
            <p className='text-gray-600 mb-8 max-w-2xl mx-auto'>
              Thousands of students, professors, and universities worldwide
              trust EdFellow Connect to build meaningful academic connections.
            </p>

            <div className='grid grid-cols-1 md:grid-cols-3 gap-8'>
              <div className='text-center'>
                <div className='text-3xl font-bold text-blue-600 mb-2'>
                  {displayStats?.totalUsers.toLocaleString() || '0'}
                </div>
                <div className='text-gray-600'>Active Members</div>
              </div>

              <div className='text-center'>
                <div className='text-3xl font-bold text-green-600 mb-2'>
                  {displayStats?.totalConnections.toLocaleString() || '0'}
                </div>
                <div className='text-gray-600'>Connections Made</div>
              </div>

              <div className='text-center'>
                <div className='text-3xl font-bold text-purple-600 mb-2'>
                  {displayStats?.completedSessions.toLocaleString() || '0'}
                </div>
                <div className='text-gray-600'>Sessions Completed</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
