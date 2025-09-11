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
  RefreshCw
} from 'lucide-react';
import { useLandingPage } from '../../hooks/useLandingPage';
import { Skeleton } from '../ui/skeleton';
import { CountryFlag } from '../ui/CountryFlag';
import type { FeaturedProgram } from '../../lib/api/landing';

interface ProgramCardProps {
  program: FeaturedProgram;
  loading?: boolean;
}

const ProgramCard: React.FC<ProgramCardProps> = ({ program, loading = false }) => {
  if (loading) {
    return (
      <Card className="h-full transition-all duration-300 hover:shadow-lg">
        <CardHeader className="p-0">
          <Skeleton className="h-48 w-full rounded-t-lg" />
        </CardHeader>
        <CardContent className="p-6">
          <Skeleton className="h-6 w-3/4 mb-2" />
          <Skeleton className="h-4 w-full mb-4" />
          <div className="flex items-center space-x-2 mb-4">
            <Skeleton className="h-4 w-4 rounded-full" />
            <Skeleton className="h-4 w-24" />
          </div>
          <div className="space-y-2">
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-2/3" />
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="h-full transition-all duration-300 hover:shadow-lg hover:scale-105 group">
      <CardHeader className="p-0">
        <div className="relative h-48 overflow-hidden rounded-t-lg">
          {program.image_url ? (
            <img
              src={program.image_url}
              alt={program.title}
              className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
            />
          ) : (
            <div className="w-full h-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center">
              <GraduationCap className="w-16 h-16 text-white opacity-50" />
            </div>
          )}
          
          {/* University Logo */}
          {program.university.logo_url && (
            <div className="absolute top-4 right-4">
              <img
                src={program.university.logo_url}
                alt={program.university.name}
                className="w-12 h-12 rounded-full bg-white p-1 shadow-md"
              />
            </div>
          )}
          
          {/* Featured Badge */}
          {program.is_featured && (
            <div className="absolute top-4 left-4">
              <Badge className="bg-yellow-500 text-white">
                <Star className="w-3 h-3 mr-1" />
                Featured
              </Badge>
            </div>
          )}
        </div>
      </CardHeader>
      
      <CardContent className="p-6">
        {/* University Info */}
        <div className="flex items-center space-x-2 mb-3">
          <CountryFlag code={program.university.country} size={16} />
          <span className="text-sm font-medium text-gray-600">
            {program.university.name}
          </span>
        </div>
        
        {/* Program Title */}
        <h3 className="text-lg font-semibold text-gray-900 mb-2 line-clamp-2">
          {program.title}
        </h3>
        
        {/* Program Description */}
        <p className="text-gray-600 text-sm mb-4 line-clamp-3">
          {program.description}
        </p>
        
        {/* Program Details */}
        <div className="space-y-2 mb-4">
          <div className="flex items-center text-sm text-gray-600">
            <GraduationCap className="w-4 h-4 mr-2 text-blue-500" />
            <span>{program.degree_level}</span>
          </div>
          
          <div className="flex items-center text-sm text-gray-600">
            <Clock className="w-4 h-4 mr-2 text-green-500" />
            <span>{program.duration}</span>
          </div>
          
          <div className="flex items-center text-sm text-gray-600">
            <MapPin className="w-4 h-4 mr-2 text-red-500" />
            <span>{program.location}</span>
          </div>
          
          <div className="flex items-center text-sm text-gray-600">
            <DollarSign className="w-4 h-4 mr-2 text-yellow-500" />
            <span>{program.cost}</span>
          </div>
        </div>
        
        {/* Rating and Applications */}
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center space-x-1">
            <Star className="w-4 h-4 text-yellow-500 fill-current" />
            <span className="text-sm font-medium text-gray-900">
              {program.rating.toFixed(1)}
            </span>
          </div>
          
          <div className="flex items-center space-x-1 text-sm text-gray-600">
            <Users className="w-4 h-4" />
            <span>{program.applications_count} applications</span>
          </div>
        </div>
        
        {/* Tags */}
        {program.tags.length > 0 && (
          <div className="flex flex-wrap gap-1 mb-4">
            {program.tags.slice(0, 3).map((tag) => (
              <Badge key={tag} variant="secondary" className="text-xs">
                {tag}
              </Badge>
            ))}
            {program.tags.length > 3 && (
              <Badge variant="secondary" className="text-xs">
                +{program.tags.length - 3} more
              </Badge>
            )}
          </div>
        )}
        
        {/* Action Button */}
        <Button className="w-full" variant="outline">
          Learn More
          <ExternalLink className="w-4 h-4 ml-2" />
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
    refreshPrograms 
  } = useLandingPage();

  const programs = data?.featuredPrograms || [];

  if (error || programsError) {
    return (
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Featured Programs
            </h2>
            <div className="bg-red-50 border border-red-200 rounded-lg p-6">
              <p className="text-red-600 mb-4">
                {error || programsError || 'Failed to load featured programs'}
              </p>
              <Button onClick={refreshPrograms} variant="outline" size="sm">
                <RefreshCw className="w-4 h-4 mr-2" />
                Try Again
              </Button>
            </div>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="py-16 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">
            Featured Programs
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Discover top-rated academic programs from leading universities worldwide. 
            Find the perfect program to advance your career.
          </p>
        </div>

        {/* Programs Grid */}
        {loading || programsLoading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {Array.from({ length: 6 }).map((_, index) => (
              <ProgramCard key={index} program={{} as FeaturedProgram} loading />
            ))}
          </div>
        ) : programs.length === 0 ? (
          <div className="text-center py-12">
            <GraduationCap className="w-16 h-16 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">
              No Featured Programs Yet
            </h3>
            <p className="text-gray-600">
              Check back soon for featured programs from top universities.
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {programs.map((program) => (
              <ProgramCard key={program.id} program={program} />
            ))}
          </div>
        )}

        {/* View All Button */}
        <div className="text-center mt-12">
          <Button size="lg" variant="outline">
            View All Programs
            <ExternalLink className="w-4 h-4 ml-2" />
          </Button>
        </div>
      </div>
    </section>
  );
};
