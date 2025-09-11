import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { Input } from '../ui/input';
import { Button } from '../ui/button';
import { Badge } from '../ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '../ui/avatar';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '../ui/select';
import {
  Search,
  Filter,
  MapPin,
  Building,
  GraduationCap,
  Users,
  Star,
  Eye,
  Award,
  Calendar,
  X,
} from 'lucide-react';
import { useProfileSearch } from '../../hooks/useProfile';
import { PublicProfile } from '../../lib/auth';
import { CountryFlag } from '../ui/CountryFlag';

interface ProfileSearchProps {
  onProfileSelect?: (profile: PublicProfile) => void;
  showFilters?: boolean;
  limit?: number;
}

export const ProfileSearch: React.FC<ProfileSearchProps> = ({
  onProfileSelect,
  showFilters = true,
  limit = 20,
}) => {
  const { searchResults, totalResults, loading, error, search, clearResults } =
    useProfileSearch();

  // Search state
  const [query, setQuery] = useState('');
  const [role, setRole] = useState<string>('');
  const [country, setCountry] = useState('');
  const [university, setUniversity] = useState('');
  const [skills, setSkills] = useState<string[]>([]);
  const [academicInterests, setAcademicInterests] = useState<string[]>([]);
  const [showAdvancedFilters, setShowAdvancedFilters] = useState(false);
  const [currentPage, setCurrentPage] = useState(0);

  // Common options for filters
  const roleOptions = [
    { value: 'student', label: 'Students' },
    { value: 'professor', label: 'Professors' },
    { value: 'university', label: 'Universities' },
  ];

  const countryOptions = [
    'United States',
    'Canada',
    'United Kingdom',
    'Germany',
    'France',
    'Australia',
    'Japan',
    'South Korea',
    'India',
    'Brazil',
    'Mexico',
    'Spain',
    'Italy',
    'Netherlands',
    'Sweden',
    'Norway',
    'Denmark',
    'Finland',
    'Switzerland',
    'Austria',
    'Belgium',
    'Ireland',
    'Portugal',
    'Poland',
    'Czech Republic',
  ];

  const commonSkills = [
    'JavaScript',
    'Python',
    'Java',
    'C++',
    'React',
    'Node.js',
    'Machine Learning',
    'Data Science',
    'Artificial Intelligence',
    'Web Development',
    'Mobile Development',
    'Database Design',
    'Cloud Computing',
    'DevOps',
    'Cybersecurity',
    'Blockchain',
    'UI/UX Design',
    'Project Management',
    'Research',
    'Teaching',
    'Mentoring',
  ];

  const commonInterests = [
    'Computer Science',
    'Engineering',
    'Mathematics',
    'Physics',
    'Chemistry',
    'Biology',
    'Medicine',
    'Business',
    'Economics',
    'Psychology',
    'Sociology',
    'Literature',
    'History',
    'Art',
    'Music',
    'Philosophy',
    'Political Science',
    'Environmental Science',
    'Data Science',
    'Artificial Intelligence',
  ];

  // Perform search
  const performSearch = async (page: number = 0) => {
    const searchParams = {
      query: query.trim() || undefined,
      role: role || undefined,
      country: country || undefined,
      university: university.trim() || undefined,
      skills: skills.length > 0 ? skills : undefined,
      academic_interests:
        academicInterests.length > 0 ? academicInterests : undefined,
      limit,
      offset: page * limit,
    };

    await search(searchParams);
    setCurrentPage(page);
  };

  // Handle search form submission
  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    performSearch(0);
  };

  // Handle filter changes
  const handleFilterChange = () => {
    performSearch(0);
  };

  // Clear all filters
  const clearFilters = () => {
    setQuery('');
    setRole('');
    setCountry('');
    setUniversity('');
    setSkills([]);
    setAcademicInterests([]);
    clearResults();
  };

  // Add/remove skill
  const toggleSkill = (skill: string) => {
    setSkills((prev) =>
      prev.includes(skill) ? prev.filter((s) => s !== skill) : [...prev, skill]
    );
  };

  // Add/remove academic interest
  const toggleAcademicInterest = (interest: string) => {
    setAcademicInterests((prev) =>
      prev.includes(interest)
        ? prev.filter((i) => i !== interest)
        : [...prev, interest]
    );
  };

  // Get initials for avatar fallback
  const getInitials = (firstName: string, lastName: string) => {
    return `${firstName.charAt(0)}${lastName.charAt(0)}`.toUpperCase();
  };

  // Get role badge color
  const getRoleBadgeColor = (role: string) => {
    switch (role) {
      case 'student':
        return 'bg-blue-100 text-blue-800 border-blue-200';
      case 'professor':
        return 'bg-purple-100 text-purple-800 border-purple-200';
      case 'university':
        return 'bg-green-100 text-green-800 border-green-200';
      default:
        return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  // Pagination
  const totalPages = Math.ceil(totalResults / limit);
  const hasNextPage = currentPage < totalPages - 1;
  const hasPrevPage = currentPage > 0;

  return (
    <div className='space-y-6'>
      {/* Search Form */}
      <Card>
        <CardHeader>
          <CardTitle className='flex items-center gap-2'>
            <Search className='w-5 h-5' />
            Search Profiles
          </CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSearch} className='space-y-4'>
            {/* Basic Search */}
            <div className='flex gap-2'>
              <Input
                placeholder='Search by name, university, or keywords...'
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                className='flex-1'
              />
              <Button type='submit' disabled={loading}>
                <Search className='w-4 h-4' />
              </Button>
            </div>

            {/* Quick Filters */}
            {showFilters && (
              <div className='grid grid-cols-1 md:grid-cols-3 gap-4'>
                <Select value={role} onValueChange={setRole}>
                  <SelectTrigger>
                    <SelectValue placeholder='All Roles' />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value=''>All Roles</SelectItem>
                    {roleOptions.map((option) => (
                      <SelectItem key={option.value} value={option.value}>
                        {option.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>

                <Select value={country} onValueChange={setCountry}>
                  <SelectTrigger>
                    <SelectValue placeholder='All Countries' />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value=''>All Countries</SelectItem>
                    {countryOptions.map((countryOption) => (
                      <SelectItem key={countryOption} value={countryOption}>
                        {countryOption}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>

                <Input
                  placeholder='University name...'
                  value={university}
                  onChange={(e) => setUniversity(e.target.value)}
                />
              </div>
            )}

            {/* Advanced Filters Toggle */}
            {showFilters && (
              <div className='flex items-center justify-between'>
                <Button
                  type='button'
                  variant='outline'
                  onClick={() => setShowAdvancedFilters(!showAdvancedFilters)}
                >
                  <Filter className='w-4 h-4 mr-2' />
                  Advanced Filters
                </Button>
                <Button
                  type='button'
                  variant='ghost'
                  onClick={clearFilters}
                  disabled={loading}
                >
                  Clear All
                </Button>
              </div>
            )}

            {/* Advanced Filters */}
            {showFilters && showAdvancedFilters && (
              <div className='space-y-4 p-4 border rounded-lg bg-muted/50'>
                {/* Skills */}
                <div>
                  <label className='text-sm font-medium mb-2 block'>
                    Skills
                  </label>
                  <div className='flex flex-wrap gap-2'>
                    {commonSkills.map((skill) => (
                      <Badge
                        key={skill}
                        variant={skills.includes(skill) ? 'default' : 'outline'}
                        className='cursor-pointer'
                        onClick={() => toggleSkill(skill)}
                      >
                        {skill}
                      </Badge>
                    ))}
                  </div>
                </div>

                {/* Academic Interests */}
                <div>
                  <label className='text-sm font-medium mb-2 block'>
                    Academic Interests
                  </label>
                  <div className='flex flex-wrap gap-2'>
                    {commonInterests.map((interest) => (
                      <Badge
                        key={interest}
                        variant={
                          academicInterests.includes(interest)
                            ? 'default'
                            : 'outline'
                        }
                        className='cursor-pointer'
                        onClick={() => toggleAcademicInterest(interest)}
                      >
                        {interest}
                      </Badge>
                    ))}
                  </div>
                </div>

                <Button
                  type='button'
                  onClick={handleFilterChange}
                  disabled={loading}
                  className='w-full'
                >
                  Apply Filters
                </Button>
              </div>
            )}
          </form>
        </CardContent>
      </Card>

      {/* Search Results */}
      {error && (
        <Card>
          <CardContent className='p-6'>
            <div className='text-center text-red-600'>Error: {error}</div>
          </CardContent>
        </Card>
      )}

      {loading && (
        <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4'>
          {[...Array(6)].map((_, i) => (
            <ProfileCardSkeleton key={i} />
          ))}
        </div>
      )}

      {!loading && !error && searchResults.length > 0 && (
        <>
          {/* Results Header */}
          <div className='flex items-center justify-between'>
            <div className='text-sm text-muted-foreground'>
              {totalResults} profile{totalResults !== 1 ? 's' : ''} found
            </div>
            <div className='text-sm text-muted-foreground'>
              Page {currentPage + 1} of {totalPages}
            </div>
          </div>

          {/* Results Grid */}
          <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4'>
            {searchResults.map((profile) => (
              <ProfileCard
                key={profile.id}
                profile={profile}
                onClick={() => onProfileSelect?.(profile)}
              />
            ))}
          </div>

          {/* Pagination */}
          {totalPages > 1 && (
            <div className='flex items-center justify-center gap-2'>
              <Button
                variant='outline'
                onClick={() => performSearch(currentPage - 1)}
                disabled={!hasPrevPage || loading}
              >
                Previous
              </Button>
              <span className='text-sm text-muted-foreground'>
                Page {currentPage + 1} of {totalPages}
              </span>
              <Button
                variant='outline'
                onClick={() => performSearch(currentPage + 1)}
                disabled={!hasNextPage || loading}
              >
                Next
              </Button>
            </div>
          )}
        </>
      )}

      {!loading &&
        !error &&
        searchResults.length === 0 &&
        totalResults === 0 && (
          <Card>
            <CardContent className='p-6'>
              <div className='text-center text-muted-foreground'>
                <Users className='w-12 h-12 mx-auto mb-4 opacity-50' />
                <p>No profiles found matching your criteria.</p>
                <p className='text-sm'>
                  Try adjusting your search terms or filters.
                </p>
              </div>
            </CardContent>
          </Card>
        )}
    </div>
  );
};

// Profile Card Component
const ProfileCard: React.FC<{
  profile: PublicProfile;
  onClick?: () => void;
}> = ({ profile, onClick }) => {
  const getInitials = (firstName: string, lastName: string) => {
    return `${firstName.charAt(0)}${lastName.charAt(0)}`.toUpperCase();
  };

  const getRoleBadgeColor = (role: string) => {
    switch (role) {
      case 'student':
        return 'bg-blue-100 text-blue-800 border-blue-200';
      case 'professor':
        return 'bg-purple-100 text-purple-800 border-purple-200';
      case 'university':
        return 'bg-green-100 text-green-800 border-green-200';
      default:
        return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  return (
    <Card
      className='cursor-pointer hover:shadow-md transition-shadow'
      onClick={onClick}
    >
      <CardContent className='p-4'>
        <div className='flex items-start gap-3'>
          <Avatar className='w-12 h-12'>
            <AvatarImage src={profile.avatar} alt={profile.display_name} />
            <AvatarFallback className='text-sm'>
              {getInitials(profile.first_name, profile.last_name)}
            </AvatarFallback>
          </Avatar>

          <div className='flex-1 min-w-0'>
            <div className='flex items-center gap-2 mb-1'>
              <h3 className='font-medium truncate'>{profile.display_name}</h3>
              <Badge className={`text-xs ${getRoleBadgeColor(profile.role)}`}>
                {profile.role.charAt(0).toUpperCase() + profile.role.slice(1)}
              </Badge>
            </div>

            {profile.bio && (
              <p className='text-sm text-muted-foreground line-clamp-2 mb-2'>
                {profile.bio}
              </p>
            )}

            <div className='space-y-1 text-xs text-muted-foreground'>
              {profile.university && (
                <div className='flex items-center gap-1'>
                  <GraduationCap className='w-3 h-3' />
                  <span className='truncate'>{profile.university}</span>
                </div>
              )}

              {profile.institution && (
                <div className='flex items-center gap-1'>
                  <Building className='w-3 h-3' />
                  <span className='truncate'>{profile.institution}</span>
                </div>
              )}

              {profile.country && (
                <div className='flex items-center gap-1'>
                  <CountryFlag
                    countryCode={profile.country}
                    className='w-3 h-3'
                  />
                  <span>{profile.country}</span>
                </div>
              )}
            </div>

            <div className='flex items-center gap-4 mt-2 text-xs text-muted-foreground'>
              <div className='flex items-center gap-1'>
                <Eye className='w-3 h-3' />
                <span>{profile.profile_views}</span>
              </div>
              <div className='flex items-center gap-1'>
                <Users className='w-3 h-3' />
                <span>{profile.connections}</span>
              </div>
              <div className='flex items-center gap-1'>
                <Award className='w-3 h-3' />
                <span>{profile.endorsements}</span>
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

// Profile Card Skeleton
const ProfileCardSkeleton: React.FC = () => {
  return (
    <Card>
      <CardContent className='p-4'>
        <div className='flex items-start gap-3'>
          <div className='w-12 h-12 bg-gray-200 rounded-full animate-pulse' />
          <div className='flex-1 space-y-2'>
            <div className='h-4 w-3/4 bg-gray-200 rounded animate-pulse' />
            <div className='h-3 w-full bg-gray-200 rounded animate-pulse' />
            <div className='h-3 w-2/3 bg-gray-200 rounded animate-pulse' />
            <div className='flex gap-4 mt-2'>
              <div className='h-3 w-8 bg-gray-200 rounded animate-pulse' />
              <div className='h-3 w-8 bg-gray-200 rounded animate-pulse' />
              <div className='h-3 w-8 bg-gray-200 rounded animate-pulse' />
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default ProfileSearch;
