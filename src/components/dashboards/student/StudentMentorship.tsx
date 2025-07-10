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
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Input } from '@/components/ui/input';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Breadcrumb } from '../../dashboard/Breadcrumb';
import ChatModal from '../../modals/ChatModal';
import ScheduleSessionModal from '../../modals/ScheduleSessionModal';
import MentorshipModal from '../../modals/MentorshipModal';
import { CountryFlag } from '@/components/ui/CountryFlag';
import { getCountryCode } from '@/lib/countries';
import { useToast } from '@/hooks/use-toast';
import {
  Heart,
  Search,
  Star,
  MapPin,
  BookOpen,
  MessageSquare,
  Calendar,
  Filter,
  X,
} from 'lucide-react';

const StudentMentorship = () => {
  const { toast } = useToast();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [isScheduleOpen, setIsScheduleOpen] = useState(false);
  const [isMentorshipOpen, setIsMentorshipOpen] = useState(false);
  const [isSavedMentorsOpen, setIsSavedMentorsOpen] = useState(false);
  const [selectedMentor, setSelectedMentor] = useState<any>(null);
  const [savedMentors, setSavedMentors] = useState<number[]>([3, 5]); // IDs of saved mentors

  const myMentors = [
    {
      id: 1,
      name: 'Dr. Sarah Johnson',
      expertise: 'Artificial Intelligence',
      university: 'Stanford University',
      country: 'United States',
      rating: 4.9,
      sessions: 12,
      nextSession: 'Dec 28, 2024 2:00 PM',
      status: 'active',
    },
    {
      id: 2,
      name: 'Prof. Michael Chen',
      expertise: 'Data Science',
      university: 'MIT',
      country: 'United States',
      rating: 4.8,
      sessions: 8,
      nextSession: 'Dec 30, 2024 10:00 AM',
      status: 'active',
    },
  ];

  const availableMentors = [
    {
      id: 3,
      name: 'Dr. Priya Sharma',
      expertise: 'Machine Learning',
      university: 'IIT Delhi',
      country: 'India',
      rating: 4.9,
      students: 156,
      price: '$50/hour',
      responseTime: '< 2 hours',
    },
    {
      id: 4,
      name: 'Prof. Emma Wilson',
      expertise: 'Computer Vision',
      university: 'University of Oxford',
      country: 'United Kingdom',
      rating: 4.7,
      students: 89,
      price: '$60/hour',
      responseTime: '< 4 hours',
    },
    {
      id: 5,
      name: 'Dr. Carlos Rodriguez',
      expertise: 'Natural Language Processing',
      university: 'Universidad Politécnica de Madrid',
      country: 'Spain',
      rating: 4.8,
      students: 112,
      price: '$45/hour',
      responseTime: '< 1 hour',
    },
    {
      id: 6,
      name: 'Prof. Yuki Tanaka',
      expertise: 'Robotics',
      university: 'University of Tokyo',
      country: 'Japan',
      rating: 4.9,
      students: 78,
      price: '$55/hour',
      responseTime: '< 3 hours',
    },
  ];

  const categories = [
    { value: 'all', label: 'All Fields' },
    { value: 'ai', label: 'Artificial Intelligence' },
    { value: 'ml', label: 'Machine Learning' },
    { value: 'ds', label: 'Data Science' },
    { value: 'cv', label: 'Computer Vision' },
    { value: 'nlp', label: 'Natural Language Processing' },
    { value: 'robotics', label: 'Robotics' },
  ];

  const filteredMentors = availableMentors.filter((mentor) => {
    const matchesSearch =
      mentor.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      mentor.expertise.toLowerCase().includes(searchTerm.toLowerCase()) ||
      mentor.university.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesCategory =
      selectedCategory === 'all' ||
      mentor.expertise.toLowerCase().includes(selectedCategory);

    return matchesSearch && matchesCategory;
  });

  const getSavedMentorsList = () => {
    return availableMentors.filter((mentor) =>
      savedMentors.includes(mentor.id)
    );
  };

  const handleMessage = (mentor: any) => {
    setSelectedMentor(mentor);
    setIsChatOpen(true);
  };

  const handleSchedule = (mentor: any) => {
    setSelectedMentor(mentor);
    setIsScheduleOpen(true);
  };

  const handleConnect = (mentor: any) => {
    setSelectedMentor(mentor);
    setIsMentorshipOpen(true);
  };

  const handleSaveMentor = (mentorId: number) => {
    if (savedMentors.includes(mentorId)) {
      setSavedMentors(savedMentors.filter((id) => id !== mentorId));
      toast({
        title: 'Mentor Removed',
        description: 'Mentor has been removed from your saved list.',
      });
    } else {
      setSavedMentors([...savedMentors, mentorId]);
      toast({
        title: 'Mentor Saved!',
        description: 'Mentor has been added to your saved list.',
      });
    }
  };

  const isMentorSaved = (mentorId: number) => savedMentors.includes(mentorId);

  return (
    <div className='p-6 space-y-6'>
      <Breadcrumb
        items={[
          { label: 'Dashboard', href: '/dashboard' },
          { label: 'Mentorship' },
        ]}
      />

      <div className='flex justify-between items-center'>
        <div>
          <h1 className='text-2xl font-bold text-gray-900'>Find Your Mentor</h1>
          <p className='text-gray-600'>
            Connect with expert professors and accelerate your learning
          </p>
        </div>
        <Button
          className='bg-blue-600 hover:bg-blue-700'
          onClick={() => setIsSavedMentorsOpen(true)}
        >
          <Heart className='h-4 w-4 mr-2' />
          Saved Mentors ({savedMentors.length})
        </Button>
      </div>

      {/* My Current Mentors */}
      {myMentors.length > 0 && (
        <div>
          <h2 className='text-xl font-semibold text-gray-900 mb-4'>
            My Mentors ({myMentors.length})
          </h2>
          <div className='grid md:grid-cols-2 gap-6 mb-8'>
            {myMentors.map((mentor) => (
              <Card key={mentor.id} className='border-green-200 bg-green-50/50'>
                <CardHeader>
                  <div className='flex items-center justify-between'>
                    <Badge className='bg-green-100 text-green-700'>
                      Active
                    </Badge>
                    <div className='flex items-center'>
                      <Star className='h-4 w-4 text-yellow-500 mr-1' />
                      <span className='text-sm font-medium'>
                        {mentor.rating}
                      </span>
                    </div>
                  </div>
                  <div className='flex items-center space-x-4'>
                    <Avatar className='h-12 w-12'>
                      <AvatarFallback className='bg-blue-100 text-blue-600'>
                        {mentor.name
                          .split(' ')
                          .map((n) => n[0])
                          .join('')}
                      </AvatarFallback>
                    </Avatar>
                    <div>
                      <CardTitle className='text-lg flex items-center gap-2'>
                        {mentor.name}
                        <CountryFlag
                          code={getCountryCode(mentor.country)}
                          size={20}
                        />
                      </CardTitle>
                      <CardDescription>{mentor.expertise}</CardDescription>
                    </div>
                  </div>
                </CardHeader>
                <CardContent className='space-y-4'>
                  <div className='text-sm text-gray-600 space-y-1'>
                    <div className='flex items-center'>
                      <BookOpen className='h-4 w-4 mr-2' />
                      {mentor.university}
                    </div>
                    <div className='flex items-center'>
                      <MapPin className='h-4 w-4 mr-2' />
                      <CountryFlag
                        code={getCountryCode(mentor.country)}
                        size={16}
                        className='mr-1'
                      />
                      {mentor.country}
                    </div>
                    <div className='flex items-center'>
                      <Calendar className='h-4 w-4 mr-2' />
                      Next: {mentor.nextSession}
                    </div>
                  </div>
                  <div className='text-center p-2 bg-white rounded'>
                    <div className='text-lg font-semibold text-blue-600'>
                      {mentor.sessions}
                    </div>
                    <div className='text-xs text-gray-600'>
                      Sessions Completed
                    </div>
                  </div>
                  <div className='flex gap-2'>
                    <Button
                      size='sm'
                      className='flex-1 bg-blue-600 hover:bg-blue-700'
                      onClick={() => handleMessage(mentor)}
                    >
                      <MessageSquare className='h-4 w-4 mr-1' />
                      Message
                    </Button>
                    <Button
                      size='sm'
                      variant='outline'
                      className='flex-1'
                      onClick={() => handleSchedule(mentor)}
                    >
                      <Calendar className='h-4 w-4 mr-1' />
                      Schedule
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      )}

      {/* Search and Filters */}
      <Card>
        <CardContent className='p-4'>
          <div className='flex flex-col md:flex-row gap-4'>
            <div className='relative flex-1'>
              <Search className='absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4' />
              <Input
                placeholder='Search mentors by name, expertise, or university...'
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className='pl-10'
              />
            </div>
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
          </div>
        </CardContent>
      </Card>

      {/* Available Mentors */}
      <div>
        <h2 className='text-xl font-semibold text-gray-900 mb-4'>
          Available Mentors ({filteredMentors.length})
        </h2>
        <div className='grid md:grid-cols-2 lg:grid-cols-3 gap-6'>
          {filteredMentors.map((mentor) => (
            <Card key={mentor.id} className='hover:shadow-lg transition-shadow'>
              <CardHeader>
                <div className='flex items-center justify-between'>
                  <div className='flex items-center'>
                    <Star className='h-4 w-4 text-yellow-500 mr-1' />
                    <span className='text-sm font-medium'>{mentor.rating}</span>
                  </div>
                  <Badge variant='outline' className='text-xs'>
                    {mentor.responseTime}
                  </Badge>
                </div>
                <div className='flex items-center space-x-3'>
                  <Avatar className='h-12 w-12'>
                    <AvatarFallback className='bg-blue-100 text-blue-600'>
                      {mentor.name
                        .split(' ')
                        .map((n) => n[0])
                        .join('')}
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <CardTitle className='text-lg flex items-center gap-2'>
                      {mentor.name}
                      <CountryFlag
                        code={getCountryCode(mentor.country)}
                        size={20}
                      />
                    </CardTitle>
                    <CardDescription>{mentor.expertise}</CardDescription>
                  </div>
                </div>
              </CardHeader>
              <CardContent className='space-y-4'>
                <div className='text-sm text-gray-600 space-y-1'>
                  <div className='flex items-center'>
                    <BookOpen className='h-4 w-4 mr-2' />
                    {mentor.university}
                  </div>
                  <div className='flex items-center'>
                    <MapPin className='h-4 w-4 mr-2' />
                    <CountryFlag
                      code={getCountryCode(mentor.country)}
                      size={16}
                      className='mr-1'
                    />
                    {mentor.country}
                  </div>
                </div>
                <div className='grid grid-cols-2 gap-2 text-center'>
                  <div className='p-2 bg-blue-50 rounded'>
                    <div className='text-sm font-semibold text-blue-600'>
                      {mentor.students}
                    </div>
                    <div className='text-xs text-gray-600'>Students</div>
                  </div>
                  <div className='p-2 bg-green-50 rounded'>
                    <div className='text-sm font-semibold text-green-600'>
                      {mentor.price}
                    </div>
                    <div className='text-xs text-gray-600'>Per Hour</div>
                  </div>
                </div>
                <div className='flex gap-2'>
                  <Button
                    size='sm'
                    className='flex-1 bg-blue-600 hover:bg-blue-700'
                    onClick={() => handleConnect(mentor)}
                  >
                    <MessageSquare className='h-4 w-4 mr-1' />
                    Connect
                  </Button>
                  <Button
                    size='sm'
                    variant={isMentorSaved(mentor.id) ? 'default' : 'outline'}
                    className={`flex-1 ${
                      isMentorSaved(mentor.id)
                        ? 'bg-red-500 hover:bg-red-600 text-white'
                        : ''
                    }`}
                    onClick={() => handleSaveMentor(mentor.id)}
                  >
                    <Heart
                      className={`h-4 w-4 mr-1 ${
                        isMentorSaved(mentor.id) ? 'fill-current' : ''
                      }`}
                    />
                    {isMentorSaved(mentor.id) ? 'Saved' : 'Save'}
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      {/* Saved Mentors Modal */}
      <Dialog open={isSavedMentorsOpen} onOpenChange={setIsSavedMentorsOpen}>
        <DialogContent className='max-w-4xl max-h-[80vh] overflow-y-auto'>
          <DialogHeader>
            <DialogTitle className='flex items-center gap-2'>
              <Heart className='h-5 w-5 text-red-500' />
              Saved Mentors ({savedMentors.length})
            </DialogTitle>
          </DialogHeader>
          <div className='space-y-4'>
            {getSavedMentorsList().length === 0 ? (
              <div className='text-center py-8'>
                <Heart className='h-12 w-12 text-gray-300 mx-auto mb-4' />
                <h3 className='text-lg font-medium text-gray-900 mb-2'>
                  No Saved Mentors
                </h3>
                <p className='text-gray-600'>
                  Start saving mentors you're interested in working with!
                </p>
              </div>
            ) : (
              <div className='grid md:grid-cols-2 gap-4'>
                {getSavedMentorsList().map((mentor) => (
                  <Card
                    key={mentor.id}
                    className='hover:shadow-lg transition-shadow'
                  >
                    <CardHeader>
                      <div className='flex items-center justify-between'>
                        <div className='flex items-center'>
                          <Star className='h-4 w-4 text-yellow-500 mr-1' />
                          <span className='text-sm font-medium'>
                            {mentor.rating}
                          </span>
                        </div>
                        <Button
                          size='sm'
                          variant='ghost'
                          onClick={() => handleSaveMentor(mentor.id)}
                        >
                          <X className='h-4 w-4 text-red-500' />
                        </Button>
                      </div>
                      <div className='flex items-center space-x-3'>
                        <Avatar className='h-10 w-10'>
                          <AvatarFallback className='bg-blue-100 text-blue-600'>
                            {mentor.name
                              .split(' ')
                              .map((n) => n[0])
                              .join('')}
                          </AvatarFallback>
                        </Avatar>
                        <div>
                          <CardTitle className='text-base flex items-center gap-2'>
                            {mentor.name}
                            <CountryFlag
                              code={getCountryCode(mentor.country)}
                              size={16}
                            />
                          </CardTitle>
                          <CardDescription>{mentor.expertise}</CardDescription>
                        </div>
                      </div>
                    </CardHeader>
                    <CardContent className='pt-2'>
                      <div className='flex items-center justify-between text-sm text-gray-600 mb-3'>
                        <span>{mentor.university}</span>
                        <span className='font-medium text-green-600'>
                          {mentor.price}
                        </span>
                      </div>
                      <div className='flex gap-2'>
                        <Button
                          size='sm'
                          className='flex-1 bg-blue-600 hover:bg-blue-700'
                          onClick={() => {
                            setIsSavedMentorsOpen(false);
                            handleConnect(mentor);
                          }}
                        >
                          <MessageSquare className='h-4 w-4 mr-1' />
                          Connect
                        </Button>
                        <Button
                          size='sm'
                          variant='outline'
                          className='flex-1'
                          onClick={() => {
                            setIsSavedMentorsOpen(false);
                            handleSchedule(mentor);
                          }}
                        >
                          <Calendar className='h-4 w-4 mr-1' />
                          Schedule
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

      {/* Modals */}
      <ChatModal
        isOpen={isChatOpen}
        onClose={() => setIsChatOpen(false)}
        recipientName={selectedMentor?.name || 'Mentor'}
        recipientRole='professor'
      />

      <ScheduleSessionModal
        open={isScheduleOpen}
        onOpenChange={setIsScheduleOpen}
        studentName={selectedMentor?.name}
        action='accept'
      />

      <MentorshipModal
        isOpen={isMentorshipOpen}
        onClose={() => setIsMentorshipOpen(false)}
        mentorName={selectedMentor?.name || ''}
        mentorField={selectedMentor?.expertise || ''}
        mentorUniversity={selectedMentor?.university || ''}
        mentorRating={selectedMentor?.rating || 4.5}
      />
    </div>
  );
};

export default StudentMentorship;
