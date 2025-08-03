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
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import {
  GraduationCap,
  Users,
  Star,
  MapPin,
  Clock,
  Video,
  MessageSquare,
  Calendar,
  Search,
  Filter,
  BookOpen,
  Award,
  TrendingUp,
  Heart,
  UserCheck,
  Globe,
  ArrowRight,
  CheckCircle,
  Play,
  DollarSign,
  MessageCircle,
  Phone,
  Mail,
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import GlobalNavbar from '@/components/GlobalNavbar';
import { LandingFooter } from '@/components/LandingFooter';

const Mentorship = () => {
  const navigate = useNavigate();
  const [selectedField, setSelectedField] = useState('');
  const [selectedExperience, setSelectedExperience] = useState('');
  const [selectedPrice, setSelectedPrice] = useState('');

  const professors = [
    {
      id: 1,
      name: 'Dr. Emily Watson',
      avatar:
        'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=400&q=80',
      title: 'Professor of Computer Science',
      university: 'Stanford University',
      rating: 4.9,
      reviews: 127,
      hourlyRate: 75,
      specialties: ['Machine Learning', 'Data Science', 'AI'],
      sessions: 847,
      availability: 'Available Today',
      color: 'blue',
      experience: '15+ years',
      location: 'Stanford, CA',
      languages: ['English', 'Spanish'],
      description:
        'Expert in machine learning and artificial intelligence with extensive research experience in healthcare applications.',
    },
    {
      id: 2,
      name: 'Prof. Marco Benedetti',
      avatar:
        'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=400&q=80',
      title: 'Economics Department Head',
      university: 'London School of Economics',
      rating: 4.8,
      reviews: 98,
      hourlyRate: 65,
      specialties: ['Econometrics', 'Policy Analysis', 'Development'],
      sessions: 623,
      availability: 'Next Available: Tomorrow',
      color: 'green',
      experience: '12+ years',
      location: 'London, UK',
      languages: ['English', 'Italian'],
      description:
        'Leading expert in economic policy and development with focus on emerging markets and sustainable growth.',
    },
    {
      id: 3,
      name: 'Dr. Sarah Kim',
      avatar:
        'https://images.unsplash.com/photo-1582750433449-648ed127bb54?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=400&q=80',
      title: 'Biomedical Engineering Professor',
      university: 'MIT',
      rating: 4.9,
      reviews: 150,
      hourlyRate: 80,
      specialties: ['Biomechanics', 'Medical Devices', 'Tissue Engineering'],
      sessions: 945,
      availability: 'Available Today',
      color: 'pink',
      experience: '18+ years',
      location: 'Cambridge, MA',
      languages: ['English', 'Korean'],
      description:
        'Pioneering researcher in biomedical engineering with expertise in medical device development and tissue engineering.',
    },
    {
      id: 4,
      name: 'Prof. Alessandro Rossi',
      avatar:
        'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=400&q=80',
      title: 'Professor of International Relations',
      university: 'Bocconi University',
      rating: 4.7,
      reviews: 89,
      hourlyRate: 60,
      specialties: ['Diplomacy', 'Global Politics', 'Conflict Resolution'],
      sessions: 456,
      availability: 'Available This Week',
      color: 'purple',
      experience: '10+ years',
      location: 'Milan, Italy',
      languages: ['English', 'Italian', 'French'],
      description:
        'Expert in international relations and diplomacy with extensive experience in conflict resolution and global governance.',
    },
    {
      id: 5,
      name: 'Dr. Michael Chen',
      avatar:
        'https://images.unsplash.com/photo-1560250097-0b93528c311a?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=400&q=80',
      title: 'Professor of Physics',
      university: 'University of California, Berkeley',
      rating: 4.8,
      reviews: 112,
      hourlyRate: 70,
      specialties: ['Quantum Physics', 'Theoretical Physics', 'Astrophysics'],
      sessions: 678,
      availability: 'Available Today',
      color: 'indigo',
      experience: '20+ years',
      location: 'Berkeley, CA',
      languages: ['English', 'Mandarin'],
      description:
        'Distinguished physicist specializing in quantum mechanics and theoretical physics with groundbreaking research in quantum computing.',
    },
    {
      id: 6,
      name: 'Prof. Maria Rodriguez',
      avatar:
        'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=400&q=80',
      title: 'Professor of Psychology',
      university: 'University of Barcelona',
      rating: 4.6,
      reviews: 76,
      hourlyRate: 55,
      specialties: ['Clinical Psychology', 'Cognitive Science', 'Research Methods'],
      sessions: 389,
      availability: 'Next Available: Friday',
      color: 'orange',
      experience: '14+ years',
      location: 'Barcelona, Spain',
      languages: ['English', 'Spanish', 'Catalan'],
      description:
        'Clinical psychologist and cognitive scientist with expertise in mental health research and therapeutic interventions.',
    },
  ];

  const mentorshipStats = [
    {
      icon: Users,
      number: '500+',
      label: 'Expert Professors',
      description: 'From top universities worldwide',
    },
    {
      icon: Star,
      number: '4.8',
      label: 'Average Rating',
      description: 'Based on student reviews',
    },
    {
      icon: Clock,
      number: '10,000+',
      label: 'Sessions Completed',
      description: 'Successful mentorship sessions',
    },
    {
      icon: Globe,
      number: '50+',
      label: 'Countries',
      description: 'Global network of mentors',
    },
  ];

  const howItWorks = [
    {
      step: 1,
      icon: Search,
      title: 'Find Your Mentor',
      description:
        'Browse through our curated list of expert professors from top universities worldwide.',
    },
    {
      step: 2,
      icon: Calendar,
      title: 'Book a Session',
      description:
        'Schedule a convenient time for your personalized mentorship session.',
    },
    {
      step: 3,
      icon: Video,
      title: 'Meet Online',
      description:
        'Connect via high-quality video call for personalized guidance and advice.',
    },
    {
      step: 4,
      icon: TrendingUp,
      title: 'Grow & Succeed',
      description:
        'Apply insights from your sessions to accelerate your academic and professional growth.',
    },
  ];

  return (
    <div className='min-h-screen bg-white'>
      <GlobalNavbar />

      {/* Hero Section */}
      <section className='relative py-28 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50'>
        <div className='max-w-6xl mx-auto text-center'>
          <Badge className='bg-white/90 backdrop-blur-sm text-[#007BFF] border-blue-200 mb-8 px-6 py-3 text-base font-semibold shadow-lg'>
            Expert Mentorship
          </Badge>
          <h1 className='text-5xl sm:text-6xl font-extrabold text-[#0B1B4D] mb-8 leading-tight'>
            Learn from the{' '}
            <span className='bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent'>
              Best Professors
            </span>
          </h1>
          <p className='text-xl text-gray-600 mb-10 max-w-3xl mx-auto leading-relaxed'>
            Connect with world-class professors for personalized guidance, academic support, and career mentorship.
            Get expert advice from leading researchers and educators.
          </p>
          <div className='flex flex-col sm:flex-row gap-4 justify-center'>
            <Button
              size='lg'
              onClick={() => navigate('/signup')}
              className='bg-gradient-to-r from-[#007BFF] to-[#0B1B4D] hover:from-[#0056b3] hover:to-[#0B1B4D] text-white px-8 py-4 text-lg font-semibold shadow-xl transition-transform duration-200 hover:scale-105'
            >
              Start Your Journey
              <ArrowRight className='ml-2 h-5 w-5' />
            </Button>
            <Button
              size='lg'
              variant='outline'
              className='border-[#007BFF] text-[#007BFF] hover:bg-[#007BFF] hover:text-white px-8 py-4 text-lg font-semibold'
            >
              Learn More
            </Button>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className='py-16 px-4 sm:px-6 lg:px-8 bg-white'>
        <div className='max-w-6xl mx-auto'>
          <div className='grid md:grid-cols-4 gap-8'>
            {mentorshipStats.map((stat) => {
              const IconComponent = stat.icon;
              return (
                <div key={stat.label} className='text-center'>
                  <div className='flex justify-center mb-4'>
                    <div className='w-16 h-16 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-2xl flex items-center justify-center text-white shadow-lg'>
                      <IconComponent className='h-8 w-8' />
                    </div>
                  </div>
                  <div className='text-3xl font-bold text-[#0B1B4D] mb-2'>
                    {stat.number}
                  </div>
                  <div className='text-lg font-semibold text-gray-900 mb-2'>
                    {stat.label}
                  </div>
                  <div className='text-gray-600'>{stat.description}</div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className='py-20 px-4 sm:px-6 lg:px-8 bg-gray-50'>
        <div className='max-w-6xl mx-auto'>
          <div className='text-center mb-16'>
            <h2 className='text-3xl sm:text-4xl font-bold text-[#0B1B4D] mb-6'>
              How Mentorship Works
            </h2>
            <p className='text-lg text-gray-600 max-w-3xl mx-auto'>
              Get personalized guidance from world-class professors in just four simple steps
            </p>
          </div>

          <div className='grid md:grid-cols-4 gap-8'>
            {howItWorks.map((step) => {
              const IconComponent = step.icon;
              return (
                <div key={step.step} className='relative group'>
                  <div className='bg-white rounded-2xl p-8 shadow-xl hover:shadow-2xl transition-all duration-300 hover:scale-105 border border-gray-100'>
                    <div className='relative mb-6'>
                      <div className='w-20 h-20 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-2xl flex items-center justify-center text-white mb-4 mx-auto shadow-lg group-hover:scale-110 transition-transform duration-300'>
                        <IconComponent className='h-10 w-10' />
                      </div>
                      <div className='absolute -top-2 -right-2 w-8 h-8 bg-gradient-to-r from-yellow-400 to-orange-500 rounded-full flex items-center justify-center text-white text-sm font-bold'>
                        {step.step}
                      </div>
                    </div>
                    <h3 className='text-xl font-bold text-[#0B1B4D] mb-3 text-center'>
                      {step.title}
                    </h3>
                    <p className='text-gray-600 text-center leading-relaxed'>
                      {step.description}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Search and Filter Section */}
      <section className='py-16 px-4 sm:px-6 lg:px-8 bg-white'>
        <div className='max-w-6xl mx-auto'>
          <div className='text-center mb-12'>
            <h2 className='text-3xl font-bold text-[#0B1B4D] mb-6'>
              Find Your Perfect Mentor
            </h2>
            <p className='text-lg text-gray-600 max-w-2xl mx-auto'>
              Browse through our network of expert professors and find the perfect mentor for your academic journey
            </p>
          </div>

          {/* Search and Filters */}
          <div className='bg-white rounded-2xl shadow-xl p-6 mb-8'>
            <div className='grid md:grid-cols-4 gap-4'>
              <div>
                <Label htmlFor='search'>Search Mentors</Label>
                <div className='relative'>
                  <Search className='absolute left-3 top-3 h-4 w-4 text-gray-400' />
                  <Input
                    id='search'
                    placeholder='Search by name, field, or university...'
                    className='pl-10'
                  />
                </div>
              </div>
              <div>
                <Label htmlFor='field'>Field of Study</Label>
                <Select value={selectedField} onValueChange={setSelectedField}>
                  <SelectTrigger>
                    <SelectValue placeholder='Select field' />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value='computer-science'>Computer Science</SelectItem>
                    <SelectItem value='engineering'>Engineering</SelectItem>
                    <SelectItem value='economics'>Economics</SelectItem>
                    <SelectItem value='psychology'>Psychology</SelectItem>
                    <SelectItem value='physics'>Physics</SelectItem>
                    <SelectItem value='international-relations'>International Relations</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label htmlFor='experience'>Experience Level</Label>
                <Select value={selectedExperience} onValueChange={setSelectedExperience}>
                  <SelectTrigger>
                    <SelectValue placeholder='Select experience' />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value='5-10'>5-10 years</SelectItem>
                    <SelectItem value='10-15'>10-15 years</SelectItem>
                    <SelectItem value='15-20'>15-20 years</SelectItem>
                    <SelectItem value='20+'>20+ years</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label htmlFor='price'>Price Range</Label>
                <Select value={selectedPrice} onValueChange={setSelectedPrice}>
                  <SelectTrigger>
                    <SelectValue placeholder='Select price' />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value='0-50'>$0-$50/hour</SelectItem>
                    <SelectItem value='50-75'>$50-$75/hour</SelectItem>
                    <SelectItem value='75-100'>$75-$100/hour</SelectItem>
                    <SelectItem value='100+'>$100+/hour</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </div>

          {/* Mentors Grid */}
          <div className='grid md:grid-cols-2 lg:grid-cols-3 gap-8'>
            {professors.map((professor) => (
              <Card
                key={professor.id}
                className='border-0 shadow-xl hover:shadow-2xl transition-all duration-300 hover:scale-105 bg-white overflow-hidden'
              >
                <CardHeader className='text-center pb-4'>
                  <div className='relative mb-4'>
                    <img
                      src={professor.avatar}
                      alt={professor.name}
                      className='w-24 h-24 rounded-full mx-auto border-4 border-gray-100 shadow-lg'
                    />
                    <div className='absolute -bottom-1 -right-1 w-8 h-8 bg-green-500 rounded-full border-2 border-white flex items-center justify-center'>
                      <div className='w-2 h-2 bg-white rounded-full'></div>
                    </div>
                  </div>
                  <CardTitle className='text-xl font-bold text-[#0B1B4D] mb-2'>
                    {professor.name}
                  </CardTitle>
                  <CardDescription className='text-gray-600 mb-2'>
                    {professor.title}
                  </CardDescription>
                  <CardDescription className='text-gray-600 mb-3'>
                    {professor.university}
                  </CardDescription>
                  <div className='flex items-center justify-center gap-1 mb-3'>
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        className={`h-4 w-4 ${
                          i < Math.floor(professor.rating)
                            ? 'text-yellow-400 fill-current'
                            : 'text-gray-300'
                        }`}
                      />
                    ))}
                    <span className='text-sm text-gray-600 ml-1'>
                      {professor.rating} ({professor.reviews})
                    </span>
                  </div>
                  <div className='text-2xl font-bold text-[#007BFF] mb-3'>
                    ${professor.hourlyRate}/hour
                  </div>
                  <div className='flex flex-wrap gap-2 justify-center mb-3'>
                    {professor.specialties.map((specialty, index) => (
                      <Badge
                        key={index}
                        className='bg-blue-100 text-blue-700 border-0 text-xs'
                      >
                        {specialty}
                      </Badge>
                    ))}
                  </div>
                  <div className='flex items-center justify-center gap-4 text-sm text-gray-500 mb-3'>
                    <div className='flex items-center gap-1'>
                      <MapPin className='h-4 w-4' />
                      <span>{professor.location}</span>
                    </div>
                    <div className='flex items-center gap-1'>
                      <Clock className='h-4 w-4' />
                      <span>{professor.sessions} sessions</span>
                    </div>
                  </div>
                  <div className='text-sm text-green-600 font-medium mb-4'>
                    {professor.availability}
                  </div>
                </CardHeader>
                <CardContent className='space-y-3'>
                  <p className='text-gray-600 text-sm leading-relaxed'>
                    {professor.description}
                  </p>
                  <div className='flex items-center gap-2 text-sm text-gray-500'>
                    <Globe className='h-4 w-4' />
                    <span>{professor.languages.join(', ')}</span>
                  </div>
                  <div className='flex gap-2'>
                    <Button className='flex-1 bg-gradient-to-r from-[#007BFF] to-[#0B1B4D] hover:from-[#0056b3] hover:to-[#0B1B4D] text-white'>
                      Book Session
                    </Button>
                    <Button
                      variant='outline'
                      size='icon'
                      className='border-gray-300 hover:border-[#007BFF] hover:text-[#007BFF]'
                    >
                      <MessageCircle className='h-4 w-4' />
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className='py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50'>
        <div className='max-w-4xl mx-auto text-center'>
          <h2 className='text-3xl sm:text-4xl font-bold text-[#0B1B4D] mb-6'>
            Ready to Start Your Mentorship Journey?
          </h2>
          <p className='text-lg text-gray-600 mb-10 max-w-2xl mx-auto'>
            Join thousands of students who have transformed their academic and professional lives through expert mentorship.
          </p>
          <div className='flex flex-col sm:flex-row gap-4 justify-center'>
            <Button
              size='lg'
              onClick={() => navigate('/signup')}
              className='bg-gradient-to-r from-[#007BFF] to-[#0B1B4D] hover:from-[#0056b3] hover:to-[#0B1B4D] text-white px-8 py-4 text-lg font-semibold shadow-xl transition-transform duration-200 hover:scale-105'
            >
              Get Started Today
              <ArrowRight className='ml-2 h-5 w-5' />
            </Button>
            <Button
              size='lg'
              variant='outline'
              className='border-[#007BFF] text-[#007BFF] hover:bg-[#007BFF] hover:text-white px-8 py-4 text-lg font-semibold'
            >
              Learn More
            </Button>
          </div>
        </div>
      </section>

      <LandingFooter />
    </div>
  );
};

export default Mentorship; 