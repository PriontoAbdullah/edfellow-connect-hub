import React from 'react';
import { Card, CardContent, CardHeader } from '../ui/card';
import { Badge } from '../ui/badge';
import { Button } from '../ui/button';
import {
  MapPin,
  Clock,
  DollarSign,
  Star,
  Users,
  ExternalLink,
  GraduationCap,
  RefreshCw,
} from 'lucide-react';
import { useLandingPage } from '../../hooks/useLandingPage';
import { Skeleton } from '../ui/skeleton';
import { CountryFlag } from '../ui/CountryFlag';
import type { FeaturedProgram } from '../../lib/api/landing';

interface ProgramCardProps {
  program: FeaturedProgram;
  loading?: boolean;
}

const ProgramCard: React.FC<ProgramCardProps> = ({
  program,
  loading = false,
}) => {
  if (loading) {
    return (
      <Card className='h-full transition-all duration-300 hover:shadow-lg'>
        <CardHeader className='p-0'>
          <Skeleton className='h-48 w-full rounded-t-lg' />
        </CardHeader>
        <CardContent className='p-6'>
          <Skeleton className='h-6 w-3/4 mb-2' />
          <Skeleton className='h-4 w-full mb-4' />
          <div className='flex items-center space-x-2 mb-4'>
            <Skeleton className='h-4 w-4 rounded-full' />
            <Skeleton className='h-4 w-24' />
          </div>
          <div className='space-y-2'>
            <Skeleton className='h-4 w-full' />
            <Skeleton className='h-4 w-2/3' />
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className='h-full transition-all duration-300 hover:shadow-lg hover:scale-105 group'>
      <CardHeader className='p-0'>
        <div className='relative h-48 overflow-hidden rounded-t-lg'>
          {program.image_url ? (
            <img
              src={program.image_url}
              alt={program.title}
              className='w-full h-full object-cover group-hover:scale-110 transition-transform duration-300'
            />
          ) : (
            <div className='w-full h-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center'>
              <GraduationCap className='w-16 h-16 text-white opacity-50' />
            </div>
          )}

          {/* University Logo */}
          {program.university.logo_url && (
            <div className='absolute top-4 right-4'>
              <img
                src={program.university.logo_url}
                alt={program.university.name}
                className='w-12 h-12 rounded-full bg-white p-1 shadow-md'
              />
            </div>
          )}

          {/* Featured Badge */}
          {program.is_featured && (
            <div className='absolute top-4 left-4'>
              <Badge className='bg-yellow-500 text-white'>
                <Star className='w-3 h-3 mr-1' />
                Featured
              </Badge>
            </div>
          )}
        </div>
      </CardHeader>

      <CardContent className='p-6'>
        {/* University Info */}
        <div className='flex items-center space-x-2 mb-3'>
          <CountryFlag code={program.university.country} size={16} />
          <span className='text-sm font-medium text-gray-600'>
            {program.university.name}
          </span>
        </div>

        {/* Program Title */}
        <h3 className='text-lg font-semibold text-gray-900 mb-2 line-clamp-2'>
          {program.title}
        </h3>

        {/* Program Description */}
        <p className='text-gray-600 text-sm mb-4 line-clamp-3'>
          {program.description}
        </p>

        {/* Program Details */}
        <div className='space-y-2 mb-4'>
          <div className='flex items-center text-sm text-gray-600'>
            <GraduationCap className='w-4 h-4 mr-2 text-blue-500' />
            <span>{program.degree_level}</span>
          </div>

          <div className='flex items-center text-sm text-gray-600'>
            <Clock className='w-4 h-4 mr-2 text-green-500' />
            <span>{program.duration}</span>
          </div>

          <div className='flex items-center text-sm text-gray-600'>
            <MapPin className='w-4 h-4 mr-2 text-red-500' />
            <span>{program.location}</span>
          </div>

          <div className='flex items-center text-sm text-gray-600'>
            <DollarSign className='w-4 h-4 mr-2 text-yellow-500' />
            <span>{program.cost}</span>
          </div>
        </div>

        {/* Rating and Applications */}
        <div className='flex items-center justify-between mb-4'>
          <div className='flex items-center space-x-1'>
            <Star className='w-4 h-4 text-yellow-500 fill-current' />
            <span className='text-sm font-medium text-gray-900'>
              {program.rating.toFixed(1)}
            </span>
          </div>

          <div className='flex items-center space-x-1 text-sm text-gray-600'>
            <Users className='w-4 h-4' />
            <span>{program.applications_count} applications</span>
          </div>
        </div>

        {/* Tags */}
        {program.tags.length > 0 && (
          <div className='flex flex-wrap gap-1 mb-4'>
            {program.tags.slice(0, 3).map((tag) => (
              <Badge key={tag} variant='secondary' className='text-xs'>
                {tag}
              </Badge>
            ))}
            {program.tags.length > 3 && (
              <Badge variant='secondary' className='text-xs'>
                +{program.tags.length - 3} more
              </Badge>
            )}
          </div>
        )}

        {/* Action Button */}
        <Button className='w-full' variant='outline'>
          Learn More
          <ExternalLink className='w-4 h-4 ml-2' />
        </Button>
      </CardContent>
    </Card>
  );
};

export const FeaturedPrograms: React.FC = () => {
  const {
    data,
    loading,
    programsLoading,
    error,
    programsError,
    refreshPrograms,
  } = useLandingPage();

  const programs = data?.featuredPrograms || [];

  // Fallback dummy data for when API fails
  const fallbackPrograms = [
    {
      id: 1,
      title: 'Master of Computer Science',
      university: {
        name: 'Stanford University',
        logo_url:
          'https://images.unsplash.com/photo-1562774053-701939374585?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80',
        country: 'USA',
      },
      image_url:
        'https://images.unsplash.com/photo-1517077304055-6e89abbf09b0?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80',
      location: 'Stanford, CA',
      duration: '2 years',
      cost: '$58,000/year',
      rating: 4.9,
      applications_count: 1200,
      capacity: '2,500',
      description:
        'Advanced computer science program with global research opportunities.',
      tags: ['Technology', 'AI/ML', 'Research'],
      degree_level: "Master's",
      is_featured: true,
    },
    {
      id: 2,
      title: 'PhD in Engineering',
      university: {
        name: 'MIT',
        logo_url:
          'https://images.unsplash.com/photo-1541339907198-e08756dedf3f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80',
        country: 'USA',
      },
      image_url:
        'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80',
      location: 'Cambridge, MA',
      duration: '4-6 years',
      cost: '$65,000/year',
      rating: 4.9,
      applications_count: 800,
      capacity: '1,800',
      description:
        'World-class engineering research with international collaboration.',
      tags: ['Engineering', 'Research', 'Innovation'],
      degree_level: 'PhD',
      is_featured: true,
    },
    {
      id: 3,
      title: 'MSc in International Relations',
      university: {
        name: 'Oxford University',
        logo_url:
          'https://images.unsplash.com/photo-1562774053-701939374585?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80',
        country: 'UK',
      },
      image_url:
        'https://images.unsplash.com/photo-1559757148-5c350d0d3c56?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80',
      location: 'Oxford, UK',
      duration: '1 year',
      cost: '$45,000/year',
      rating: 4.7,
      applications_count: 950,
      capacity: '1,200',
      description:
        'Global perspective on international politics and diplomacy.',
      tags: ['Social Sciences', 'Politics', 'Diplomacy'],
      degree_level: "Master's",
      is_featured: false,
    },
    {
      id: 4,
      title: 'MBA in Business Administration',
      university: {
        name: 'Harvard University',
        logo_url:
          'https://images.unsplash.com/photo-1562774053-701939374585?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80',
        country: 'USA',
      },
      image_url:
        'https://images.unsplash.com/photo-1554224155-6726b3ff858f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80',
      location: 'Cambridge, MA',
      duration: '2 years',
      cost: '$75,000/year',
      rating: 4.8,
      applications_count: 1500,
      capacity: '1,800',
      description:
        'World-class business education with global networking opportunities.',
      tags: ['Business', 'Management', 'Leadership'],
      degree_level: 'MBA',
      is_featured: true,
    },
    {
      id: 5,
      title: 'Master of Public Health',
      university: {
        name: 'Yale University',
        logo_url:
          'https://images.unsplash.com/photo-1562774053-701939374585?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80',
        country: 'USA',
      },
      image_url:
        'https://images.unsplash.com/photo-1559757148-5c350d0d3c56?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80',
      location: 'New Haven, CT',
      duration: '2 years',
      cost: '$52,000/year',
      rating: 4.7,
      applications_count: 1100,
      capacity: '1,500',
      description:
        'Comprehensive public health education with global health focus.',
      tags: ['Healthcare', 'Public Health', 'Global Health'],
      degree_level: "Master's",
      is_featured: false,
    },
    {
      id: 6,
      title: 'Master of Architecture',
      university: {
        name: 'Columbia University',
        logo_url:
          'https://images.unsplash.com/photo-1562774053-701939374585?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80',
        country: 'USA',
      },
      image_url:
        'https://images.unsplash.com/photo-1541961017774-22349e4a1262?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80',
      location: 'New York, NY',
      duration: '3 years',
      cost: '$68,000/year',
      rating: 4.6,
      applications_count: 900,
      capacity: '1,200',
      description:
        'Innovative architecture program with urban design specialization.',
      tags: ['Architecture', 'Design', 'Urban Planning'],
      degree_level: "Master's",
      is_featured: false,
    },
  ];

  // Use fallback data if there's an error or no data
  const displayPrograms = fallbackPrograms; // Temporarily force fallback data to test

  return (
    <section className='py-16 bg-white'>
      <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8'>
        {/* Header */}
        <div className='text-center mb-12'>
          <h2 className='text-3xl font-bold text-gray-900 mb-4'>
            Featured Programs
          </h2>
          <p className='text-lg text-gray-600 max-w-2xl mx-auto'>
            Discover top-rated academic programs from leading universities
            worldwide. Find the perfect program to advance your career.
          </p>
        </div>

        {/* Programs Grid */}
        {loading || programsLoading ? (
          <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8'>
            {Array.from({ length: 6 }).map((_, index) => (
              <ProgramCard
                key={index}
                program={{} as FeaturedProgram}
                loading
              />
            ))}
          </div>
        ) : displayPrograms.length === 0 ? (
          <div className='text-center py-12'>
            <GraduationCap className='w-16 h-16 text-gray-400 mx-auto mb-4' />
            <h3 className='text-lg font-medium text-gray-900 mb-2'>
              No Featured Programs Yet
            </h3>
            <p className='text-gray-600'>
              Check back soon for featured programs from top universities.
            </p>
          </div>
        ) : (
          <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8'>
            {displayPrograms.map((program) => (
              <ProgramCard key={program.id} program={program} />
            ))}
          </div>
        )}

        {/* View All Button */}
        <div className='text-center mt-12'>
          <Button size='lg' variant='outline'>
            View All Programs
            <ExternalLink className='w-4 h-4 ml-2' />
          </Button>
        </div>
      </div>
    </section>
  );
};
