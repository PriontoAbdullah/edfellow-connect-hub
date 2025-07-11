import { useState } from 'react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { CountryFlag } from '@/components/ui/CountryFlag';
import { useToast } from '@/hooks/use-toast';
import ViewProfileModal from './ViewProfileModal';
import {
  Search,
  Filter,
  User,
  GraduationCap,
  Building2,
  Eye,
  UserPlus,
  Check,
} from 'lucide-react';

interface SearchModalProps {
  isOpen: boolean;
  onClose: () => void;
  userRole: string;
}

const mockUsers = [
  {
    id: 1,
    name: 'John Smith',
    role: 'student',
    field: 'Computer Science',
    major: 'Computer Science & AI',
    email: 'john.smith@university.edu',
    country: 'US',
    location: 'Boston, MA',
    bio: 'Final year Computer Science student passionate about AI and machine learning. Currently working on deep learning projects and seeking opportunities in tech.',
    interests: [
      'Artificial Intelligence',
      'Machine Learning',
      'Web Development',
      'Data Science',
      'Cloud Computing',
    ],
    education: [
      'Bachelor of Science in Computer Science - MIT (Expected 2024)',
      'High School Diploma - Phillips Academy (2020)',
    ],
    gpa: '3.92/4.0',
    academicYear: 'Senior (4th Year)',
    achievements: [
      {
        title: "Dean's List",
        description: 'Academic Excellence',
        year: '2023',
      },
      {
        title: 'Hackathon Winner',
        description: 'MIT CodeFest',
        year: '2023',
      },
      {
        title: 'Research Assistant',
        description: 'AI Lab',
        year: '2022',
      },
    ],
  },
  {
    id: 2,
    name: 'Dr. Sarah Chen',
    role: 'professor',
    field: 'Computer Science',
    title: 'Associate Professor of Computer Science',
    email: 'sarah.chen@stanford.edu',
    country: 'US',
    location: 'Stanford, CA',
    bio: 'Leading researcher in machine learning and computer vision with over 15 years of experience. Currently focusing on deep learning applications in healthcare.',
    expertise: [
      'Machine Learning',
      'Computer Vision',
      'Deep Learning',
      'Neural Networks',
      'AI in Healthcare',
    ],
    education: [
      'Ph.D. in Computer Science - Stanford University (2010)',
      'M.S. in Computer Science - UC Berkeley (2006)',
      'B.S. in Mathematics - MIT (2004)',
    ],
    publications: '127',
    citations: '15,000+',
    achievements: [
      {
        title: 'Best Paper Award',
        description: 'ICML Conference',
        year: '2023',
      },
      {
        title: 'Research Grant',
        description: 'NSF AI Initiative',
        year: '2023',
      },
      {
        title: 'Teaching Excellence Award',
        description: 'Stanford University',
        year: '2022',
      },
    ],
  },
  {
    id: 3,
    name: 'Stanford University',
    role: 'university',
    field: 'Higher Education',
    tagline: 'Advancing Knowledge and Research Excellence',
    email: 'admissions@stanford.edu',
    country: 'US',
    address: 'Stanford, CA 94305',
    bio: 'A world-leading research university known for entrepreneurial innovation and academic excellence. Committed to finding solutions to global challenges and preparing students to make meaningful contributions to society.',
    programs: [
      'Computer Science',
      'Artificial Intelligence',
      'Data Science',
      'Robotics',
      'Software Engineering',
    ],
    totalStudents: '16,937',
    facultyCount: '2,288',
    achievements: [
      {
        title: 'World University Rankings',
        description: '#2 Globally',
        year: '2024',
      },
      {
        title: 'Research Impact',
        description: 'Top 3 in Citations',
        year: '2023',
      },
      {
        title: 'Innovation Index',
        description: '#1 in Tech Transfer',
        year: '2023',
      },
    ],
  },
  {
    id: 4,
    name: 'Emily Johnson',
    role: 'student',
    field: 'Data Science',
    major: 'Data Science & Statistics',
    email: 'emily.j@berkeley.edu',
    country: 'US',
    location: 'Berkeley, CA',
    bio: 'Data Science student with a focus on statistical modeling and machine learning. Passionate about using data to solve real-world problems.',
    interests: [
      'Data Analysis',
      'Statistical Modeling',
      'Python Programming',
      'Big Data',
      'Visualization',
    ],
    education: [
      'B.S. in Data Science - UC Berkeley (Expected 2025)',
      'Data Science Summer Institute - Stanford (2023)',
    ],
    gpa: '3.85/4.0',
    academicYear: 'Junior (3rd Year)',
    achievements: [
      {
        title: 'Data Science Competition',
        description: '1st Place - Kaggle',
        year: '2023',
      },
      {
        title: 'Research Grant',
        description: 'Undergraduate Research',
        year: '2023',
      },
    ],
  },
  {
    id: 5,
    name: 'Prof. James Wilson',
    role: 'professor',
    field: 'Artificial Intelligence',
    title: 'Professor of AI and Robotics',
    email: 'j.wilson@mit.edu',
    country: 'US',
    location: 'Cambridge, MA',
    bio: 'Pioneer in robotics and AI with focus on human-robot interaction. Leading the Autonomous Systems Laboratory at MIT.',
    expertise: [
      'Robotics',
      'AI Systems',
      'Autonomous Vehicles',
      'Machine Learning',
      'Control Systems',
    ],
    education: [
      'Ph.D. in Robotics - MIT (2005)',
      'M.S. in Computer Science - CMU (2001)',
      'B.S. in Electrical Engineering - CalTech (1999)',
    ],
    publications: '198',
    citations: '22,450',
    achievements: [
      {
        title: 'IEEE Robotics Award',
        description: 'Outstanding Achievement',
        year: '2023',
      },
      {
        title: '$2M Research Grant',
        description: 'DARPA AI Project',
        year: '2023',
      },
    ],
  },
  {
    id: 6,
    name: 'MIT',
    role: 'university',
    field: 'Technology & Research',
    tagline: 'Mind and Hand',
    email: 'admissions@mit.edu',
    country: 'US',
    address: 'Cambridge, MA 02139',
    bio: 'World-renowned institution dedicated to advancing knowledge and educating students in science, technology, and other areas of scholarship. Committed to generating, disseminating, and preserving knowledge.',
    programs: [
      'Electrical Engineering',
      'Computer Science',
      'Artificial Intelligence',
      'Mechanical Engineering',
      'Physics',
    ],
    totalStudents: '11,376',
    facultyCount: '1,068',
    achievements: [
      {
        title: 'QS World Rankings',
        description: '#1 in Engineering',
        year: '2024',
      },
      {
        title: 'Research Output',
        description: 'Top in Tech Patents',
        year: '2023',
      },
    ],
  },
];

const SearchModal = ({ isOpen, onClose, userRole }: SearchModalProps) => {
  const { toast } = useToast();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedRole, setSelectedRole] = useState('all');
  const [selectedCountry, setSelectedCountry] = useState('all');
  const [viewProfileData, setViewProfileData] = useState<any>(null);
  const [isViewProfileOpen, setIsViewProfileOpen] = useState(false);

  const getRoleIcon = (role: string) => {
    switch (role) {
      case 'student':
        return User;
      case 'professor':
        return GraduationCap;
      case 'university':
        return Building2;
      default:
        return User;
    }
  };

  const getRoleColor = (role: string) => {
    switch (role) {
      case 'student':
        return 'text-blue-600 bg-blue-50 border-blue-200';
      case 'professor':
        return 'text-green-600 bg-green-50 border-green-200';
      case 'university':
        return 'text-orange-600 bg-orange-50 border-orange-200';
      default:
        return 'text-gray-600 bg-gray-50 border-gray-200';
    }
  };

  const getRoleLabel = (role: string) => {
    switch (role) {
      case 'student':
        return 'Student';
      case 'professor':
        return 'Professor';
      case 'university':
        return 'University';
      default:
        return 'User';
    }
  };

  const filteredUsers = mockUsers.filter((user) => {
    const matchesSearch =
      user.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      user.field.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesRole = selectedRole === 'all' || user.role === selectedRole;
    const matchesCountry =
      selectedCountry === 'all' || user.country === selectedCountry;
    return matchesSearch && matchesRole && matchesCountry;
  });

  const handleViewProfile = (user: any) => {
    setViewProfileData(user);
    setIsViewProfileOpen(true);
  };

  const handleConnect = (user: any) => {
    toast({
      title: 'Connection Request Sent',
      description: `Your connection request has been sent to ${user.name}`,
    });
  };

  return (
    <>
      <Dialog open={isOpen} onOpenChange={onClose}>
        <DialogContent className='max-w-3xl'>
          <DialogHeader>
            <DialogTitle className='flex items-center gap-2'>
              <Search className='h-5 w-5 text-blue-600' />
              Search People & Universities
            </DialogTitle>
          </DialogHeader>

          <div className='space-y-4'>
            {/* Search and Filters */}
            <div className='flex gap-4'>
              <div className='flex-1 relative'>
                <Search className='absolute left-3 top-3 h-4 w-4 text-gray-400' />
                <Input
                  placeholder='Search by name or field...'
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className='pl-10'
                />
              </div>
              <Select value={selectedRole} onValueChange={setSelectedRole}>
                <SelectTrigger className='w-[180px]'>
                  <Filter className='h-4 w-4 mr-2' />
                  <SelectValue placeholder='Filter by role' />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value='all'>All Roles</SelectItem>
                  <SelectItem value='student'>Students</SelectItem>
                  <SelectItem value='professor'>Professors</SelectItem>
                  <SelectItem value='university'>Universities</SelectItem>
                </SelectContent>
              </Select>
              <Select
                value={selectedCountry}
                onValueChange={setSelectedCountry}
              >
                <SelectTrigger className='w-[180px]'>
                  <Filter className='h-4 w-4 mr-2' />
                  <SelectValue placeholder='Filter by country' />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value='all'>All Countries</SelectItem>
                  <SelectItem value='US'>United States</SelectItem>
                  <SelectItem value='GB'>United Kingdom</SelectItem>
                  <SelectItem value='CA'>Canada</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* Results */}
            <div className='space-y-2 max-h-[60vh] overflow-y-auto'>
              {filteredUsers.map((user) => {
                const IconComponent = getRoleIcon(user.role);
                return (
                  <div
                    key={user.id}
                    className='flex items-center justify-between p-4 border rounded-lg hover:shadow-md transition-shadow'
                  >
                    <div className='flex items-center space-x-4'>
                      <Avatar className='h-12 w-12'>
                        <AvatarFallback className={getRoleColor(user.role)}>
                          {user.name
                            .split(' ')
                            .map((n) => n[0])
                            .join('')}
                        </AvatarFallback>
                      </Avatar>
                      <div>
                        <div className='flex items-center gap-2 mb-1'>
                          <h4 className='font-medium text-gray-900'>
                            {user.name}
                          </h4>
                          <CountryFlag code={user.country} size={16} />
                          <Badge
                            variant='outline'
                            className={`text-xs ${getRoleColor(user.role)}`}
                          >
                            <IconComponent className='h-3 w-3 mr-1' />
                            {getRoleLabel(user.role)}
                          </Badge>
                        </div>
                        <p className='text-sm text-gray-600'>{user.field}</p>
                      </div>
                    </div>
                    <div className='flex items-center gap-2'>
                      <Button
                        size='sm'
                        variant='outline'
                        onClick={() => handleViewProfile(user)}
                      >
                        <Eye className='h-4 w-4 mr-1' />
                        View Profile
                      </Button>
                      <Button
                        size='sm'
                        className='bg-blue-600 hover:bg-blue-700'
                        onClick={() => handleConnect(user)}
                      >
                        <UserPlus className='h-4 w-4 mr-1' />
                        Connect
                      </Button>
                    </div>
                  </div>
                );
              })}

              {filteredUsers.length === 0 && (
                <div className='text-center py-8 text-gray-500'>
                  <User className='h-12 w-12 mx-auto mb-2 opacity-50' />
                  <p>No users found</p>
                </div>
              )}
            </div>
          </div>
        </DialogContent>
      </Dialog>

      {/* View Profile Modal */}
      {viewProfileData && (
        <ViewProfileModal
          isOpen={isViewProfileOpen}
          onClose={() => setIsViewProfileOpen(false)}
          profileData={viewProfileData}
          userType={viewProfileData.role}
        />
      )}
    </>
  );
};

export default SearchModal;
