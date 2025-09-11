import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import {
  Users,
  Star,
  MapPin,
  GraduationCap,
  Building2,
  TrendingUp,
  Filter,
  Search,
  ChevronDown,
  X,
  Eye,
  MessageSquare,
  Heart,
  HeartOff,
  Target,
  Award,
  BookOpen,
  Microscope,
  Briefcase,
  Calendar,
  Globe,
} from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';
import { useToast } from '@/hooks/use-toast';

interface Professor {
  id: string;
  display_name: string;
  avatar?: string;
  role: string;
  university?: string;
  department?: string;
  research_interests: string[];
  current_projects: string[];
  publications_count: number;
  students_mentored: number;
  rating: number;
  location?: string;
  bio?: string;
  expertise_areas: string[];
  collaboration_style: string;
  availability: 'high' | 'medium' | 'low';
  preferred_student_level: 'undergraduate' | 'graduate' | 'phd' | 'any';
}

interface Student {
  id: string;
  display_name: string;
  avatar?: string;
  role: string;
  university?: string;
  department?: string;
  research_interests: string[];
  skills: string[];
  gpa?: number;
  year: 'freshman' | 'sophomore' | 'junior' | 'senior' | 'graduate' | 'phd';
  availability_hours: number;
  location?: string;
  bio?: string;
  experience_level: 'beginner' | 'intermediate' | 'advanced';
  preferred_research_areas: string[];
  career_goals: string[];
}

interface Match {
  id: string;
  professor: Professor;
  student: Student;
  match_score: number;
  match_reasons: string[];
  compatibility_factors: {
    research_interests: number;
    skills_alignment: number;
    availability: number;
    location: number;
    communication_style: number;
  };
  created_at: string;
}

interface ProfessorStudentMatchingProps {
  compact?: boolean;
  onMatchSelect?: (match: Match) => void;
}

export const ProfessorStudentMatching: React.FC<
  ProfessorStudentMatchingProps
> = ({ compact = false, onMatchSelect }) => {
  const { user } = useAuth();
  const { toast } = useToast();
  const [matches, setMatches] = useState<Match[]>([]);
  const [professors, setProfessors] = useState<Professor[]>([]);
  const [students, setStudents] = useState<Student[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState<
    'matches' | 'professors' | 'students'
  >('matches');
  const [searchTerm, setSearchTerm] = useState('');
  const [showFilters, setShowFilters] = useState(false);
  const [filters, setFilters] = useState({
    research_area: '',
    university: '',
    availability: '',
    experience_level: '',
    location: '',
  });
  const [savedMatches, setSavedMatches] = useState<Set<string>>(new Set());

  useEffect(() => {
    fetchData();
  }, [filters, searchTerm, activeTab]);

  const fetchData = async () => {
    setLoading(true);
    try {
      // Simulate API calls - replace with actual API calls
      await new Promise((resolve) => setTimeout(resolve, 1000));

      // Mock data - replace with real data from API
      const mockProfessors: Professor[] = [
        {
          id: 'prof-1',
          display_name: 'Dr. Sarah Johnson',
          avatar: undefined,
          role: 'professor',
          university: 'MIT',
          department: 'Computer Science',
          research_interests: ['Machine Learning', 'AI', 'Data Science'],
          current_projects: ['Neural Networks', 'Computer Vision'],
          publications_count: 45,
          students_mentored: 12,
          rating: 4.8,
          location: 'Cambridge, MA',
          bio: 'Expert in machine learning and artificial intelligence with over 15 years of experience.',
          expertise_areas: ['Deep Learning', 'Natural Language Processing'],
          collaboration_style: 'Collaborative',
          availability: 'high',
          preferred_student_level: 'graduate',
        },
        {
          id: 'prof-2',
          display_name: 'Dr. Michael Chen',
          avatar: undefined,
          role: 'professor',
          university: 'Stanford',
          department: 'Biology',
          research_interests: [
            'Genetics',
            'Molecular Biology',
            'Bioinformatics',
          ],
          current_projects: ['Gene Editing', 'Protein Structure'],
          publications_count: 32,
          students_mentored: 8,
          rating: 4.6,
          location: 'Stanford, CA',
          bio: 'Leading researcher in molecular biology and genetics.',
          expertise_areas: ['CRISPR', 'Protein Engineering'],
          collaboration_style: 'Mentor-focused',
          availability: 'medium',
          preferred_student_level: 'phd',
        },
      ];

      const mockStudents: Student[] = [
        {
          id: 'student-1',
          display_name: 'Alex Rodriguez',
          avatar: undefined,
          role: 'student',
          university: 'MIT',
          department: 'Computer Science',
          research_interests: ['Machine Learning', 'AI'],
          skills: ['Python', 'TensorFlow', 'Data Analysis'],
          gpa: 3.8,
          year: 'graduate',
          availability_hours: 20,
          location: 'Cambridge, MA',
          bio: 'Graduate student passionate about machine learning and AI applications.',
          experience_level: 'intermediate',
          preferred_research_areas: ['Deep Learning', 'Computer Vision'],
          career_goals: ['Research Scientist', 'AI Engineer'],
        },
        {
          id: 'student-2',
          display_name: 'Emma Wilson',
          avatar: undefined,
          role: 'student',
          university: 'Stanford',
          department: 'Biology',
          research_interests: ['Genetics', 'Molecular Biology'],
          skills: ['Lab Techniques', 'Data Analysis', 'Python'],
          gpa: 3.9,
          year: 'phd',
          availability_hours: 30,
          location: 'Stanford, CA',
          bio: 'PhD student focused on genetic research and molecular biology.',
          experience_level: 'advanced',
          preferred_research_areas: ['Gene Editing', 'Protein Structure'],
          career_goals: ['Research Professor', 'Biotech Researcher'],
        },
      ];

      const mockMatches: Match[] = [
        {
          id: 'match-1',
          professor: mockProfessors[0],
          student: mockStudents[0],
          match_score: 92,
          match_reasons: [
            'Shared research interests in Machine Learning',
            'Same university and department',
            'Compatible availability',
            'Similar collaboration style',
          ],
          compatibility_factors: {
            research_interests: 95,
            skills_alignment: 88,
            availability: 90,
            location: 100,
            communication_style: 85,
          },
          created_at: '2024-01-15T10:30:00Z',
        },
        {
          id: 'match-2',
          professor: mockProfessors[1],
          student: mockStudents[1],
          match_score: 89,
          match_reasons: [
            'Shared research interests in Genetics',
            'Same university and department',
            'High compatibility in research areas',
            'Matching experience levels',
          ],
          compatibility_factors: {
            research_interests: 92,
            skills_alignment: 85,
            availability: 88,
            location: 100,
            communication_style: 90,
          },
          created_at: '2024-01-14T15:45:00Z',
        },
      ];

      setProfessors(mockProfessors);
      setStudents(mockStudents);
      setMatches(mockMatches);
    } catch (error) {
      console.error('Error fetching data:', error);
    } finally {
      setLoading(false);
    }
  };

  const getAvailabilityColor = (availability: string) => {
    switch (availability) {
      case 'high':
        return 'bg-green-100 text-green-800';
      case 'medium':
        return 'bg-yellow-100 text-yellow-800';
      case 'low':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getExperienceColor = (level: string) => {
    switch (level) {
      case 'beginner':
        return 'bg-blue-100 text-blue-800';
      case 'intermediate':
        return 'bg-yellow-100 text-yellow-800';
      case 'advanced':
        return 'bg-green-100 text-green-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getMatchScoreColor = (score: number) => {
    if (score >= 90) return 'text-green-600';
    if (score >= 80) return 'text-yellow-600';
    if (score >= 70) return 'text-orange-600';
    return 'text-red-600';
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    });
  };

  const handleSaveMatch = (matchId: string) => {
    setSavedMatches((prev) => new Set(prev).add(matchId));
    toast({
      title: 'Success',
      description: 'Match saved successfully!',
    });
  };

  const handleUnsaveMatch = (matchId: string) => {
    setSavedMatches((prev) => {
      const newSet = new Set(prev);
      newSet.delete(matchId);
      return newSet;
    });
    toast({
      title: 'Success',
      description: 'Match removed from saved',
    });
  };

  const clearFilters = () => {
    setFilters({
      research_area: '',
      university: '',
      availability: '',
      experience_level: '',
      location: '',
    });
  };

  const getFilteredData = () => {
    let data: any[] = [];

    switch (activeTab) {
      case 'matches':
        data = matches;
        break;
      case 'professors':
        data = professors;
        break;
      case 'students':
        data = students;
        break;
    }

    // Apply filters
    if (filters.research_area) {
      data = data.filter((item) =>
        item.research_interests?.some((interest: string) =>
          interest.toLowerCase().includes(filters.research_area.toLowerCase())
        )
      );
    }

    if (filters.university) {
      data = data.filter((item) =>
        item.university
          ?.toLowerCase()
          .includes(filters.university.toLowerCase())
      );
    }

    if (filters.availability) {
      data = data.filter((item) => item.availability === filters.availability);
    }

    if (filters.experience_level) {
      data = data.filter(
        (item) => item.experience_level === filters.experience_level
      );
    }

    if (filters.location) {
      data = data.filter((item) =>
        item.location?.toLowerCase().includes(filters.location.toLowerCase())
      );
    }

    // Apply search
    if (searchTerm) {
      data = data.filter(
        (item) =>
          item.display_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
          item.university?.toLowerCase().includes(searchTerm.toLowerCase()) ||
          item.department?.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    return data;
  };

  if (loading) {
    return (
      <div className='space-y-4'>
        <div className='animate-pulse'>
          <div className='h-4 bg-gray-200 rounded w-1/4 mb-4'></div>
          <div className='space-y-3'>
            {[1, 2, 3, 4, 5].map((i) => (
              <div key={i} className='h-32 bg-gray-200 rounded'></div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  const filteredData = getFilteredData();

  if (compact) {
    return (
      <div className='space-y-4'>
        <div className='flex items-center justify-between'>
          <h3 className='text-sm font-medium'>Matching</h3>
          <Badge variant='outline'>{filteredData.length}</Badge>
        </div>

        <div className='space-y-2'>
          {filteredData.slice(0, 3).map((item) => (
            <div key={item.id} className='p-3 border rounded-lg'>
              <div className='flex items-start gap-2 mb-2'>
                <Avatar className='w-8 h-8'>
                  <AvatarImage src={item.avatar} />
                  <AvatarFallback>{item.display_name.charAt(0)}</AvatarFallback>
                </Avatar>
                <div className='flex-1 min-w-0'>
                  <p className='text-sm font-medium truncate'>
                    {item.display_name}
                  </p>
                  <p className='text-xs text-muted-foreground'>
                    {item.university} • {item.department}
                  </p>
                </div>
                {activeTab === 'matches' && (
                  <Badge
                    className={`text-xs ${getMatchScoreColor(
                      item.match_score
                    )}`}
                  >
                    {item.match_score}%
                  </Badge>
                )}
              </div>
              <p className='text-xs text-muted-foreground line-clamp-2'>
                {item.research_interests?.join(', ') || item.bio}
              </p>
            </div>
          ))}
        </div>

        {filteredData.length > 3 && (
          <Button variant='outline' size='sm' className='w-full'>
            View All ({filteredData.length})
          </Button>
        )}
      </div>
    );
  }

  return (
    <div className='space-y-6'>
      {/* Header */}
      <div className='flex items-center justify-between'>
        <div>
          <h3 className='text-lg font-semibold'>Professor-Student Matching</h3>
          <p className='text-sm text-muted-foreground'>
            Find the perfect research collaboration matches
          </p>
        </div>
        <div className='flex items-center gap-2'>
          <Badge variant='outline' className='text-sm'>
            <TrendingUp className='w-3 h-3 mr-1' />
            {matches.length} matches
          </Badge>
        </div>
      </div>

      {/* Tabs */}
      <div className='flex gap-2'>
        {(['matches', 'professors', 'students'] as const).map((tab) => (
          <Button
            key={tab}
            variant={activeTab === tab ? 'default' : 'outline'}
            size='sm'
            onClick={() => setActiveTab(tab)}
          >
            {tab === 'matches' && <Target className='w-4 h-4 mr-1' />}
            {tab === 'professors' && <GraduationCap className='w-4 h-4 mr-1' />}
            {tab === 'students' && <Users className='w-4 h-4 mr-1' />}
            <span className='capitalize'>{tab}</span>
          </Button>
        ))}
      </div>

      {/* Search and Filters */}
      <div className='space-y-4'>
        <div className='relative'>
          <Search className='absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-5 h-5' />
          <input
            type='text'
            placeholder={`Search ${activeTab} by name, university, or department...`}
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className='w-full pl-12 pr-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-lg'
          />
        </div>

        <div className='flex items-center justify-between'>
          <Button
            variant='outline'
            size='sm'
            onClick={() => setShowFilters(!showFilters)}
          >
            <Filter className='w-4 h-4 mr-2' />
            Filters
            <ChevronDown
              className={`w-4 h-4 ml-2 transition-transform ${
                showFilters ? 'rotate-180' : ''
              }`}
            />
          </Button>

          {Object.values(filters).some((f) => f !== '') && (
            <Button variant='ghost' size='sm' onClick={clearFilters}>
              <X className='w-4 h-4 mr-2' />
              Clear Filters
            </Button>
          )}
        </div>

        {/* Advanced Filters */}
        {showFilters && (
          <Card>
            <CardContent className='p-4 space-y-4'>
              <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4'>
                <div>
                  <label className='block text-sm font-medium mb-1'>
                    Research Area
                  </label>
                  <input
                    type='text'
                    value={filters.research_area}
                    onChange={(e) =>
                      setFilters((prev) => ({
                        ...prev,
                        research_area: e.target.value,
                      }))
                    }
                    placeholder='e.g., Machine Learning'
                    className='w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500'
                  />
                </div>

                <div>
                  <label className='block text-sm font-medium mb-1'>
                    University
                  </label>
                  <input
                    type='text'
                    value={filters.university}
                    onChange={(e) =>
                      setFilters((prev) => ({
                        ...prev,
                        university: e.target.value,
                      }))
                    }
                    placeholder='e.g., MIT'
                    className='w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500'
                  />
                </div>

                <div>
                  <label className='block text-sm font-medium mb-1'>
                    Availability
                  </label>
                  <select
                    value={filters.availability}
                    onChange={(e) =>
                      setFilters((prev) => ({
                        ...prev,
                        availability: e.target.value,
                      }))
                    }
                    className='w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500'
                  >
                    <option value=''>All</option>
                    <option value='high'>High</option>
                    <option value='medium'>Medium</option>
                    <option value='low'>Low</option>
                  </select>
                </div>

                <div>
                  <label className='block text-sm font-medium mb-1'>
                    Experience Level
                  </label>
                  <select
                    value={filters.experience_level}
                    onChange={(e) =>
                      setFilters((prev) => ({
                        ...prev,
                        experience_level: e.target.value,
                      }))
                    }
                    className='w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500'
                  >
                    <option value=''>All</option>
                    <option value='beginner'>Beginner</option>
                    <option value='intermediate'>Intermediate</option>
                    <option value='advanced'>Advanced</option>
                  </select>
                </div>

                <div>
                  <label className='block text-sm font-medium mb-1'>
                    Location
                  </label>
                  <input
                    type='text'
                    value={filters.location}
                    onChange={(e) =>
                      setFilters((prev) => ({
                        ...prev,
                        location: e.target.value,
                      }))
                    }
                    placeholder='e.g., Cambridge, MA'
                    className='w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500'
                  />
                </div>
              </div>
            </CardContent>
          </Card>
        )}
      </div>

      {/* Data List */}
      {filteredData.length === 0 ? (
        <Card>
          <CardContent className='p-6 text-center'>
            <Target className='w-12 h-12 text-muted-foreground mx-auto mb-4' />
            <h3 className='text-lg font-medium mb-2'>No {activeTab} found</h3>
            <p className='text-muted-foreground'>
              Try adjusting your search criteria or filters
            </p>
          </CardContent>
        </Card>
      ) : (
        <div className='space-y-4'>
          {filteredData.map((item) => (
            <Card key={item.id} className='hover:shadow-md transition-shadow'>
              <CardContent className='p-4'>
                <div className='flex items-start gap-3'>
                  <Avatar className='w-12 h-12'>
                    <AvatarImage src={item.avatar} />
                    <AvatarFallback>
                      {item.display_name.charAt(0)}
                    </AvatarFallback>
                  </Avatar>

                  <div className='flex-1 min-w-0'>
                    <div className='flex items-center gap-2 mb-1'>
                      <h4 className='font-medium truncate'>
                        {item.display_name}
                      </h4>
                      {activeTab === 'matches' && (
                        <Badge
                          className={`text-xs ${getMatchScoreColor(
                            item.match_score
                          )}`}
                        >
                          {item.match_score}% match
                        </Badge>
                      )}
                      {item.availability && (
                        <Badge
                          className={`text-xs ${getAvailabilityColor(
                            item.availability
                          )}`}
                        >
                          {item.availability} availability
                        </Badge>
                      )}
                      {item.experience_level && (
                        <Badge
                          className={`text-xs ${getExperienceColor(
                            item.experience_level
                          )}`}
                        >
                          {item.experience_level}
                        </Badge>
                      )}
                    </div>

                    <div className='flex items-center gap-2 text-sm text-muted-foreground mb-2'>
                      <span>{item.university}</span>
                      <span>•</span>
                      <span>{item.department}</span>
                      {item.location && (
                        <>
                          <span>•</span>
                          <div className='flex items-center gap-1'>
                            <MapPin className='w-3 h-3' />
                            <span>{item.location}</span>
                          </div>
                        </>
                      )}
                    </div>

                    <p className='text-sm text-muted-foreground mb-3 line-clamp-2'>
                      {item.bio || item.research_interests?.join(', ')}
                    </p>

                    <div className='flex items-center gap-4 text-sm text-muted-foreground'>
                      {item.publications_count && (
                        <div className='flex items-center gap-1'>
                          <BookOpen className='w-4 h-4' />
                          <span>{item.publications_count} publications</span>
                        </div>
                      )}
                      {item.students_mentored && (
                        <div className='flex items-center gap-1'>
                          <Users className='w-4 h-4' />
                          <span>
                            {item.students_mentored} students mentored
                          </span>
                        </div>
                      )}
                      {item.rating && (
                        <div className='flex items-center gap-1'>
                          <Star className='w-4 h-4' />
                          <span>{item.rating}/5.0</span>
                        </div>
                      )}
                      {item.gpa && (
                        <div className='flex items-center gap-1'>
                          <Award className='w-4 h-4' />
                          <span>GPA: {item.gpa}</span>
                        </div>
                      )}
                      {item.availability_hours && (
                        <div className='flex items-center gap-1'>
                          <Calendar className='w-4 h-4' />
                          <span>{item.availability_hours}h/week</span>
                        </div>
                      )}
                    </div>

                    {activeTab === 'matches' && item.match_reasons && (
                      <div className='mt-3'>
                        <h5 className='text-sm font-medium mb-2'>
                          Match Reasons:
                        </h5>
                        <ul className='text-sm text-muted-foreground space-y-1'>
                          {item.match_reasons.map((reason, index) => (
                            <li key={index} className='flex items-center gap-2'>
                              <div className='w-1 h-1 bg-blue-500 rounded-full'></div>
                              {reason}
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}
                  </div>

                  <div className='flex flex-col gap-2'>
                    {activeTab === 'matches' && (
                      <Button
                        variant='ghost'
                        size='sm'
                        onClick={() =>
                          savedMatches.has(item.id)
                            ? handleUnsaveMatch(item.id)
                            : handleSaveMatch(item.id)
                        }
                      >
                        {savedMatches.has(item.id) ? (
                          <Heart className='w-4 h-4 text-red-600' />
                        ) : (
                          <HeartOff className='w-4 h-4' />
                        )}
                      </Button>
                    )}

                    <Button
                      variant='outline'
                      size='sm'
                      onClick={() => onMatchSelect?.(item)}
                    >
                      <Eye className='w-4 h-4 mr-1' />
                      View
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
};
