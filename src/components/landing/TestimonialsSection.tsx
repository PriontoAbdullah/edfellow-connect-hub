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

  if (error || testimonialsError) {
    return (
      <section className='py-16 bg-white'>
        <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8'>
          <div className='text-center'>
            <h2 className='text-3xl font-bold text-gray-900 mb-4'>
              What Our Community Says
            </h2>
            <div className='bg-red-50 border border-red-200 rounded-lg p-6'>
              <p className='text-red-600 mb-4'>
                {error || testimonialsError || 'Failed to load testimonials'}
              </p>
              <Button onClick={refreshTestimonials} variant='outline' size='sm'>
                <RefreshCw className='w-4 h-4 mr-2' />
                Try Again
              </Button>
            </div>
          </div>
        </div>
      </section>
    );
  }

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
        ) : testimonials.length === 0 ? (
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
            {testimonials.map((testimonial) => (
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
                  {data?.stats.totalUsers.toLocaleString() || '0'}
                </div>
                <div className='text-gray-600'>Active Members</div>
              </div>

              <div className='text-center'>
                <div className='text-3xl font-bold text-green-600 mb-2'>
                  {data?.stats.totalConnections.toLocaleString() || '0'}
                </div>
                <div className='text-gray-600'>Connections Made</div>
              </div>

              <div className='text-center'>
                <div className='text-3xl font-bold text-purple-600 mb-2'>
                  {data?.stats.completedSessions.toLocaleString() || '0'}
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
