import { useState } from 'react';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Breadcrumb } from '../../dashboard/Breadcrumb';
import { useToast } from '@/hooks/use-toast';
import {
  Search,
  Star,
  MapPin,
  Calendar,
  DollarSign,
  Users,
  BookOpen,
  Filter,
  Heart,
  ExternalLink,
  X,
} from 'lucide-react';

const StudentExplore = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedLevel, setSelectedLevel] = useState('all');
  const [isSavedProgramsOpen, setIsSavedProgramsOpen] = useState(false);
  const [isLearnMoreOpen, setIsLearnMoreOpen] = useState(false);
  const [selectedProgram, setSelectedProgram] = useState<any>(null);
  const [savedPrograms, setSavedPrograms] = useState<number[]>([2, 4]); // IDs of saved programs
  const { toast } = useToast();

  const trendingPrograms = [
    {
      id: 1,
      name: 'Master of Science in Artificial Intelligence',
      university: 'Stanford University',
      country: 'USA',
      duration: '2 years',
      tuition: '$58,000/year',
      rating: 4.9,
      applications: 1250,
      deadline: 'Jan 15, 2025',
      level: 'masters',
      category: 'technology',
      description:
        'Comprehensive AI program covering machine learning, deep learning, and AI ethics.',
      highlights: [
        'Research Opportunities',
        '1:5 Faculty Ratio',
        'Industry Partnerships',
      ],
      fullDescription:
        "This program is designed for students who want to be at the forefront of AI research and development. You'll work with world-renowned faculty on cutting-edge projects while building both theoretical knowledge and practical skills.",
      requirements: [
        "Bachelor's in Computer Science or related field",
        'GRE scores',
        '3.5+ GPA',
        'Research experience preferred',
      ],
      coursework: [
        'Machine Learning Foundations',
        'Deep Learning',
        'Computer Vision',
        'Natural Language Processing',
        'AI Ethics',
        'Research Methods',
      ],
      careerOutcomes: [
        'AI Research Scientist',
        'Machine Learning Engineer',
        'Data Scientist',
        'AI Product Manager',
      ],
    },
    {
      id: 2,
      name: 'PhD in Data Science',
      university: 'MIT',
      country: 'USA',
      duration: '4-5 years',
      tuition: 'Fully Funded',
      rating: 4.8,
      applications: 890,
      deadline: 'Dec 15, 2024',
      level: 'phd',
      category: 'technology',
      description:
        'Advanced research program in data science and computational methods.',
      highlights: ['Full Funding', 'Research Assistantship', 'Top Faculty'],
      fullDescription:
        "Our PhD program prepares students to become leaders in data science research. With full funding and access to state-of-the-art facilities, you'll conduct groundbreaking research while contributing to the field.",
      requirements: [
        "Master's in relevant field",
        'Research proposal',
        'GRE scores',
        'Publications preferred',
      ],
      coursework: [
        'Advanced Statistics',
        'Machine Learning Theory',
        'Data Mining',
        'Optimization',
        'Research Seminars',
      ],
      careerOutcomes: [
        'University Professor',
        'Principal Data Scientist',
        'Research Director',
        'Tech Industry Leader',
      ],
    },
    {
      id: 3,
      name: 'Master of Business Administration',
      university: 'Harvard Business School',
      country: 'USA',
      duration: '2 years',
      tuition: '$73,440/year',
      rating: 4.9,
      applications: 2100,
      deadline: 'Jan 3, 2025',
      level: 'masters',
      category: 'business',
      description:
        'World-renowned MBA program with focus on leadership and innovation.',
      highlights: ['Global Network', 'Case Method', 'Entrepreneurship Focus'],
      fullDescription:
        "Harvard Business School's MBA program develops principled leaders who make a difference in the world. Through our case-based learning approach, you'll tackle real business challenges while building lifelong connections.",
      requirements: [
        "Bachelor's degree",
        'GMAT/GRE scores',
        'Work experience',
        'Leadership potential',
      ],
      coursework: [
        'Strategy',
        'Finance',
        'Marketing',
        'Operations',
        'Leadership',
        'Entrepreneurship',
      ],
      careerOutcomes: [
        'Management Consultant',
        'Investment Banker',
        'Startup Founder',
        'Corporate Executive',
      ],
    },
    {
      id: 4,
      name: 'MSc Computer Vision',
      university: 'University of Oxford',
      country: 'UK',
      duration: '1 year',
      tuition: '£32,760',
      rating: 4.7,
      applications: 456,
      deadline: 'Mar 1, 2025',
      level: 'masters',
      category: 'technology',
      description:
        'Intensive program focusing on computer vision and image processing.',
      highlights: [
        '1-Year Program',
        'Industry Projects',
        'World-Class Research',
      ],
      fullDescription:
        "This intensive one-year program provides comprehensive training in computer vision, from fundamental principles to cutting-edge applications. You'll work on real-world projects with industry partners.",
      requirements: [
        "Bachelor's in Computer Science",
        'Strong math background',
        'Programming skills',
        'IELTS/TOEFL',
      ],
      coursework: [
        'Computer Vision Fundamentals',
        'Image Processing',
        'Machine Learning for Vision',
        'Deep Learning',
        '3D Vision',
      ],
      careerOutcomes: [
        'Computer Vision Engineer',
        'AI Researcher',
        'Robotics Engineer',
        'Tech Industry Specialist',
      ],
    },
    {
      id: 5,
      name: 'Bachelor of Engineering',
      university: 'IIT Delhi',
      country: 'India',
      duration: '4 years',
      tuition: '₹2,50,000/year',
      rating: 4.8,
      applications: 3200,
      deadline: 'May 15, 2025',
      level: 'bachelor',
      category: 'engineering',
      description:
        'Comprehensive engineering program with multiple specializations.',
      highlights: [
        'Multiple Specializations',
        'Research Focus',
        'Industry Connect',
      ],
      fullDescription:
        "IIT Delhi's Bachelor of Engineering program is one of India's most prestigious undergraduate programs. Students can choose from multiple specializations while building strong fundamentals.",
      requirements: [
        'JEE Advanced qualification',
        'High school completion',
        'Strong math and science background',
      ],
      coursework: [
        'Engineering Mathematics',
        'Physics',
        'Chemistry',
        'Programming',
        'Specialization subjects',
      ],
      careerOutcomes: [
        'Software Engineer',
        'Research Scientist',
        'Startup Founder',
        'Engineering Manager',
      ],
    },
    {
      id: 6,
      name: 'MSc Renewable Energy',
      university: 'Technical University of Denmark',
      country: 'Denmark',
      duration: '2 years',
      tuition: 'EU: Free, Non-EU: €15,000/year',
      rating: 4.6,
      applications: 342,
      deadline: 'Jan 31, 2025',
      level: 'masters',
      category: 'engineering',
      description: 'Cutting-edge program in sustainable energy technologies.',
      highlights: [
        'Sustainability Focus',
        'Lab Access',
        'Industry Partnerships',
      ],
      fullDescription:
        'This program prepares students for careers in the rapidly growing renewable energy sector. With access to world-class laboratories and strong industry connections, graduates are well-prepared for impactful careers.',
      requirements: [
        "Bachelor's in Engineering",
        'English proficiency',
        'Sustainability interest',
      ],
      coursework: [
        'Renewable Energy Systems',
        'Energy Policy',
        'Wind Energy',
        'Solar Technology',
        'Energy Storage',
      ],
      careerOutcomes: [
        'Renewable Energy Engineer',
        'Sustainability Consultant',
        'Energy Policy Analyst',
        'Clean Tech Entrepreneur',
      ],
    },
  ];

  const categories = [
    { value: 'all', label: 'All Fields' },
    { value: 'technology', label: 'Technology' },
    { value: 'business', label: 'Business' },
    { value: 'engineering', label: 'Engineering' },
    { value: 'medicine', label: 'Medicine' },
    { value: 'arts', label: 'Arts & Humanities' },
  ];

  const levels = [
    { value: 'all', label: 'All Levels' },
    { value: 'bachelor', label: 'Bachelor' },
    { value: 'masters', label: 'Masters' },
    { value: 'phd', label: 'PhD' },
    { value: 'certificate', label: 'Certificate' },
  ];

  const filteredPrograms = trendingPrograms.filter((program) => {
    const matchesSearch =
      program.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      program.university.toLowerCase().includes(searchTerm.toLowerCase()) ||
      program.country.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory =
      selectedCategory === 'all' || program.category === selectedCategory;
    const matchesLevel =
      selectedLevel === 'all' || program.level === selectedLevel;
    return matchesSearch && matchesCategory && matchesLevel;
  });

  const getSavedProgramsList = () => {
    return trendingPrograms.filter((program) =>
      savedPrograms.includes(program.id)
    );
  };

  const handleSaveProgram = (programId: number) => {
    if (savedPrograms.includes(programId)) {
      setSavedPrograms(savedPrograms.filter((id) => id !== programId));
      toast({
        title: 'Program Removed',
        description: 'Program has been removed from your saved list.',
      });
    } else {
      setSavedPrograms([...savedPrograms, programId]);
      toast({
        title: 'Program Saved!',
        description: 'Program has been added to your saved list.',
      });
    }
  };

  const handleLearnMore = (program: any) => {
    setSelectedProgram(program);
    setIsLearnMoreOpen(true);
  };

  const isProgramSaved = (programId: number) =>
    savedPrograms.includes(programId);

  return (
    <div className='p-6 space-y-6'>
      <Breadcrumb
        items={[
          { label: 'Dashboard', href: '/dashboard' },
          { label: 'Explore Programs' },
        ]}
      />

      <div className='flex justify-between items-center'>
        <div>
          <h1 className='text-2xl font-bold text-gray-900'>Explore Programs</h1>
          <p className='text-gray-600'>
            Discover educational opportunities from top universities worldwide
          </p>
        </div>
        <Button
          className='bg-blue-600 hover:bg-blue-700'
          onClick={() => setIsSavedProgramsOpen(true)}
        >
          <Heart className='h-4 w-4 mr-2' />
          Saved Programs ({savedPrograms.length})
        </Button>
      </div>

      {/* Search and Filters */}
      <Card>
        <CardContent className='p-4'>
          <div className='flex flex-col lg:flex-row gap-4'>
            <div className='relative flex-1'>
              <Search className='absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4' />
              <Input
                placeholder='Search programs by name, university, or location...'
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className='pl-10'
              />
            </div>
            <div className='flex gap-2'>
              <div className='flex items-center gap-2'>
                <Filter className='h-4 w-4 text-gray-400' />
                <select
                  value={selectedCategory}
                  onChange={(e) => setSelectedCategory(e.target.value)}
                  className='px-3 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-500'
                >
                  {categories.map((category) => (
                    <option key={category.value} value={category.value}>
                      {category.label}
                    </option>
                  ))}
                </select>
              </div>
              <select
                value={selectedLevel}
                onChange={(e) => setSelectedLevel(e.target.value)}
                className='px-3 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-500'
              >
                {levels.map((level) => (
                  <option key={level.value} value={level.value}>
                    {level.label}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Trending Programs */}
      <div>
        <h2 className='text-xl font-semibold text-gray-900 mb-4'>
          Trending Programs ({filteredPrograms.length})
        </h2>
        <div className='grid lg:grid-cols-2 gap-6'>
          {filteredPrograms.map((program) => (
            <Card
              key={program.id}
              className='hover:shadow-lg transition-shadow'
            >
              <CardHeader>
                <div className='flex items-center justify-between'>
                  <Badge variant='outline' className='text-xs capitalize'>
                    {program.level}
                  </Badge>
                  <div className='flex items-center gap-2'>
                    <Star className='h-4 w-4 text-yellow-500' />
                    <span className='text-sm font-medium'>
                      {program.rating}
                    </span>
                  </div>
                </div>
                <CardTitle className='text-lg'>{program.name}</CardTitle>
                <CardDescription>{program.description}</CardDescription>
              </CardHeader>
              <CardContent className='space-y-4'>
                <div className='text-sm text-gray-600 space-y-1'>
                  <div className='flex items-center'>
                    <BookOpen className='h-4 w-4 mr-2' />
                    {program.university}
                  </div>
                  <div className='flex items-center'>
                    <MapPin className='h-4 w-4 mr-2' />
                    {program.country}
                  </div>
                  <div className='flex items-center'>
                    <Calendar className='h-4 w-4 mr-2' />
                    {program.duration} • Deadline: {program.deadline}
                  </div>
                  <div className='flex items-center'>
                    <DollarSign className='h-4 w-4 mr-2' />
                    Tuition: {program.tuition}
                  </div>
                  <div className='flex items-center'>
                    <Users className='h-4 w-4 mr-2' />
                    {program.applications} applications
                  </div>
                </div>

                <div className='space-y-2'>
                  <h4 className='font-medium text-gray-900'>
                    Program Highlights:
                  </h4>
                  <div className='flex flex-wrap gap-1'>
                    {program.highlights.map((highlight, index) => (
                      <Badge
                        key={index}
                        variant='secondary'
                        className='text-xs'
                      >
                        {highlight}
                      </Badge>
                    ))}
                  </div>
                </div>

                <div className='flex gap-2'>
                  <Button
                    size='sm'
                    className='flex-1 bg-blue-600 hover:bg-blue-700'
                    onClick={() => handleLearnMore(program)}
                  >
                    <ExternalLink className='h-4 w-4 mr-1' />
                    Learn More
                  </Button>
                  <Button
                    size='sm'
                    variant={isProgramSaved(program.id) ? 'default' : 'outline'}
                    className={`flex-1 ${
                      isProgramSaved(program.id)
                        ? 'bg-red-500 hover:bg-red-600 text-white'
                        : ''
                    }`}
                    onClick={() => handleSaveProgram(program.id)}
                  >
                    <Heart
                      className={`h-4 w-4 mr-1 ${
                        isProgramSaved(program.id) ? 'fill-current' : ''
                      }`}
                    />
                    {isProgramSaved(program.id) ? 'Saved' : 'Save'}
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      {/* Quick Stats */}
      <div className='grid md:grid-cols-4 gap-4'>
        <Card className='text-center'>
          <CardContent className='p-4'>
            <div className='text-2xl font-bold text-blue-600'>500+</div>
            <div className='text-sm text-gray-600'>Universities</div>
          </CardContent>
        </Card>
        <Card className='text-center'>
          <CardContent className='p-4'>
            <div className='text-2xl font-bold text-green-600'>2,400+</div>
            <div className='text-sm text-gray-600'>Programs</div>
          </CardContent>
        </Card>
        <Card className='text-center'>
          <CardContent className='p-4'>
            <div className='text-2xl font-bold text-purple-600'>80+</div>
            <div className='text-sm text-gray-600'>Countries</div>
          </CardContent>
        </Card>
        <Card className='text-center'>
          <CardContent className='p-4'>
            <div className='text-2xl font-bold text-orange-600'>95%</div>
            <div className='text-sm text-gray-600'>Success Rate</div>
          </CardContent>
        </Card>
      </div>

      {/* Saved Programs Modal */}
      <Dialog open={isSavedProgramsOpen} onOpenChange={setIsSavedProgramsOpen}>
        <DialogContent className='max-w-6xl max-h-[90vh] overflow-y-auto'>
          <DialogHeader>
            <DialogTitle className='flex items-center gap-2'>
              <Heart className='h-5 w-5 text-red-500' />
              Saved Programs ({savedPrograms.length})
            </DialogTitle>
          </DialogHeader>
          <div className='space-y-4'>
            {getSavedProgramsList().length === 0 ? (
              <div className='text-center py-12'>
                <Heart className='h-16 w-16 text-gray-300 mx-auto mb-4' />
                <h3 className='text-xl font-medium text-gray-900 mb-2'>
                  No Saved Programs
                </h3>
                <p className='text-gray-600 mb-4'>
                  Start saving programs you're interested in!
                </p>
                <Button onClick={() => setIsSavedProgramsOpen(false)}>
                  Explore Programs
                </Button>
              </div>
            ) : (
              <div className='grid lg:grid-cols-2 gap-6'>
                {getSavedProgramsList().map((program) => (
                  <Card
                    key={program.id}
                    className='hover:shadow-lg transition-shadow'
                  >
                    <CardHeader>
                      <div className='flex items-center justify-between'>
                        <Badge variant='outline' className='text-xs capitalize'>
                          {program.level}
                        </Badge>
                        <div className='flex items-center gap-2'>
                          <div className='flex items-center gap-1'>
                            <Star className='h-4 w-4 text-yellow-500' />
                            <span className='text-sm font-medium'>
                              {program.rating}
                            </span>
                          </div>
                          <Button
                            size='sm'
                            variant='ghost'
                            onClick={() => handleSaveProgram(program.id)}
                          >
                            <X className='h-4 w-4 text-red-500' />
                          </Button>
                        </div>
                      </div>
                      <CardTitle className='text-lg'>{program.name}</CardTitle>
                      <CardDescription>{program.description}</CardDescription>
                    </CardHeader>
                    <CardContent className='space-y-3'>
                      <div className='text-sm text-gray-600 space-y-1'>
                        <div className='flex items-center justify-between'>
                          <span className='flex items-center'>
                            <BookOpen className='h-4 w-4 mr-2' />
                            {program.university}
                          </span>
                          <span className='flex items-center'>
                            <MapPin className='h-4 w-4 mr-1' />
                            {program.country}
                          </span>
                        </div>
                        <div className='flex items-center justify-between'>
                          <span className='flex items-center'>
                            <Calendar className='h-4 w-4 mr-2' />
                            {program.duration}
                          </span>
                          <span className='font-medium text-green-600'>
                            {program.tuition}
                          </span>
                        </div>
                      </div>
                      <div className='flex gap-2'>
                        <Button
                          size='sm'
                          className='flex-1 bg-blue-600 hover:bg-blue-700'
                          onClick={() => {
                            setIsSavedProgramsOpen(false);
                            handleLearnMore(program);
                          }}
                        >
                          <ExternalLink className='h-4 w-4 mr-1' />
                          Learn More
                        </Button>
                        <Button
                          size='sm'
                          variant='outline'
                          className='flex-1'
                          onClick={() => {
                            toast({
                              title: 'Application Started',
                              description: `Application process initiated for ${program.name}`,
                            });
                          }}
                        >
                          Apply Now
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            )}
          </div>
        </DialogContent>
      </Dialog>

      {/* Learn More Modal */}
      <Dialog open={isLearnMoreOpen} onOpenChange={setIsLearnMoreOpen}>
        <DialogContent className='max-w-4xl max-h-[90vh] overflow-y-auto'>
          {selectedProgram && (
            <>
              <DialogHeader>
                <DialogTitle className='text-2xl'>
                  {selectedProgram.name}
                </DialogTitle>
                <div className='flex items-center gap-4 text-sm text-gray-600'>
                  <span className='flex items-center'>
                    <BookOpen className='h-4 w-4 mr-1' />
                    {selectedProgram.university}
                  </span>
                  <span className='flex items-center'>
                    <MapPin className='h-4 w-4 mr-1' />
                    {selectedProgram.country}
                  </span>
                  <span className='flex items-center'>
                    <Star className='h-4 w-4 mr-1 text-yellow-500' />
                    {selectedProgram.rating}
                  </span>
                </div>
              </DialogHeader>
              <div className='space-y-6'>
                <div>
                  <h3 className='text-lg font-semibold mb-2'>
                    Program Overview
                  </h3>
                  <p className='text-gray-700'>
                    {selectedProgram.fullDescription}
                  </p>
                </div>

                <div className='grid md:grid-cols-2 gap-6'>
                  <div>
                    <h3 className='text-lg font-semibold mb-2'>
                      Program Details
                    </h3>
                    <div className='space-y-2 text-sm'>
                      <div className='flex justify-between'>
                        <span>Duration:</span>
                        <span className='font-medium'>
                          {selectedProgram.duration}
                        </span>
                      </div>
                      <div className='flex justify-between'>
                        <span>Tuition:</span>
                        <span className='font-medium'>
                          {selectedProgram.tuition}
                        </span>
                      </div>
                      <div className='flex justify-between'>
                        <span>Application Deadline:</span>
                        <span className='font-medium'>
                          {selectedProgram.deadline}
                        </span>
                      </div>
                      <div className='flex justify-between'>
                        <span>Applications Received:</span>
                        <span className='font-medium'>
                          {selectedProgram.applications}
                        </span>
                      </div>
                    </div>
                  </div>

                  <div>
                    <h3 className='text-lg font-semibold mb-2'>Requirements</h3>
                    <ul className='space-y-1 text-sm'>
                      {selectedProgram.requirements.map(
                        (req: string, index: number) => (
                          <li key={index} className='flex items-start'>
                            <span className='text-green-600 mr-2'>•</span>
                            {req}
                          </li>
                        )
                      )}
                    </ul>
                  </div>
                </div>

                <div>
                  <h3 className='text-lg font-semibold mb-2'>
                    Core Coursework
                  </h3>
                  <div className='grid md:grid-cols-2 gap-2'>
                    {selectedProgram.coursework.map(
                      (course: string, index: number) => (
                        <Badge
                          key={index}
                          variant='outline'
                          className='text-xs'
                        >
                          {course}
                        </Badge>
                      )
                    )}
                  </div>
                </div>

                <div>
                  <h3 className='text-lg font-semibold mb-2'>
                    Career Outcomes
                  </h3>
                  <div className='grid md:grid-cols-2 gap-2'>
                    {selectedProgram.careerOutcomes.map(
                      (outcome: string, index: number) => (
                        <Badge
                          key={index}
                          variant='secondary'
                          className='text-xs'
                        >
                          {outcome}
                        </Badge>
                      )
                    )}
                  </div>
                </div>

                <div className='flex gap-3 pt-4 border-t'>
                  <Button
                    className='flex-1 bg-blue-600 hover:bg-blue-700'
                    onClick={() => {
                      toast({
                        title: 'Application Started',
                        description: `Application process initiated for ${selectedProgram.name}`,
                      });
                      setIsLearnMoreOpen(false);
                    }}
                  >
                    Apply Now
                  </Button>
                  <Button
                    variant='outline'
                    className='flex-1'
                    onClick={() => {
                      handleSaveProgram(selectedProgram.id);
                      setIsLearnMoreOpen(false);
                    }}
                  >
                    <Heart
                      className={`h-4 w-4 mr-2 ${
                        isProgramSaved(selectedProgram.id) ? 'fill-current' : ''
                      }`}
                    />
                    {isProgramSaved(selectedProgram.id)
                      ? 'Saved'
                      : 'Save Program'}
                  </Button>
                </div>
              </div>
            </>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default StudentExplore;
