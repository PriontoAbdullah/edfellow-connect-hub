import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Progress } from '@/components/ui/progress';
import {
  BookOpen,
  Users,
  TrendingUp,
  Star,
  Clock,
  Calendar,
  Target,
  Award,
  Lightbulb,
  BookMarked,
  ChevronRight,
  Plus,
  Search,
  Filter,
  GraduationCap,
  Code,
  Calculator,
  TestTube,
  Globe,
  Palette,
  Music,
  Heart,
  Brain,
  Atom,
} from 'lucide-react';

const StudentFieldOfStudy = () => {
  const navigate = useNavigate();
  const [selectedField, setSelectedField] = useState('computer-science');

  const fieldsOfStudy = [
    {
      id: 'computer-science',
      name: 'Computer Science',
      icon: Code,
      description: 'Programming, algorithms, software development',
      courses: 24,
      students: 1250,
      rating: 4.8,
      progress: 75,
      color: 'bg-blue-100 text-blue-800',
      bgColor: 'bg-blue-50',
    },
    {
      id: 'mathematics',
      name: 'Mathematics',
      icon: Calculator,
      description: 'Pure and applied mathematics, statistics',
      courses: 18,
      students: 890,
      rating: 4.6,
      progress: 60,
      color: 'bg-green-100 text-green-800',
      bgColor: 'bg-green-50',
    },
    {
      id: 'physics',
      name: 'Physics',
      icon: Atom,
      description: 'Classical and quantum physics, research',
      courses: 16,
      students: 650,
      rating: 4.7,
      progress: 45,
      color: 'bg-purple-100 text-purple-800',
      bgColor: 'bg-purple-50',
    },
    {
      id: 'chemistry',
      name: 'Chemistry',
      icon: TestTube,
      description: 'Organic, inorganic, and physical chemistry',
      courses: 20,
      students: 720,
      rating: 4.5,
      progress: 30,
      color: 'bg-orange-100 text-orange-800',
      bgColor: 'bg-orange-50',
    },
    {
      id: 'biology',
      name: 'Biology',
      icon: Heart,
      description: 'Molecular biology, genetics, ecology',
      courses: 22,
      students: 980,
      rating: 4.4,
      progress: 20,
      color: 'bg-red-100 text-red-800',
      bgColor: 'bg-red-50',
    },
    {
      id: 'psychology',
      name: 'Psychology',
      icon: Brain,
      description: 'Cognitive, clinical, and social psychology',
      courses: 19,
      students: 1100,
      rating: 4.6,
      progress: 15,
      color: 'bg-pink-100 text-pink-800',
      bgColor: 'bg-pink-50',
    },
  ];

  const currentField = fieldsOfStudy.find(
    (field) => field.id === selectedField
  );
  const FieldIcon = currentField?.icon || Code;

  const recommendedCourses = [
    {
      id: 1,
      title: 'Advanced Algorithms',
      instructor: 'Dr. Sarah Johnson',
      duration: '12 weeks',
      difficulty: 'Advanced',
      rating: 4.9,
      students: 245,
      price: 'Free',
      color: 'bg-blue-100 text-blue-800',
    },
    {
      id: 2,
      title: 'Machine Learning Fundamentals',
      instructor: 'Prof. Michael Chen',
      duration: '10 weeks',
      difficulty: 'Intermediate',
      rating: 4.7,
      students: 189,
      price: '$49',
      color: 'bg-green-100 text-green-800',
    },
    {
      id: 3,
      title: 'Data Structures & Algorithms',
      instructor: 'Dr. Emily Rodriguez',
      duration: '8 weeks',
      difficulty: 'Beginner',
      rating: 4.8,
      students: 312,
      price: 'Free',
      color: 'bg-purple-100 text-purple-800',
    },
  ];

  const studyGroups = [
    {
      id: 1,
      name: 'CS Study Group',
      members: 45,
      activeDiscussions: 12,
      lastActivity: '2 hours ago',
      color: 'bg-blue-100 text-blue-800',
    },
    {
      id: 2,
      name: 'Algorithm Masters',
      members: 28,
      activeDiscussions: 8,
      lastActivity: '1 day ago',
      color: 'bg-green-100 text-green-800',
    },
    {
      id: 3,
      name: 'Programming Beginners',
      members: 67,
      activeDiscussions: 15,
      lastActivity: '3 hours ago',
      color: 'bg-purple-100 text-purple-800',
    },
  ];

  return (
    <div className='grid grid-cols-1 lg:grid-cols-12 gap-6'>
      {/* Main Content Area */}
      <div className='lg:col-span-8 space-y-4'>
        {/* Field Selection */}
        <Card className='bg-white border border-gray-200 shadow-sm'>
          <CardHeader>
            <CardTitle className='flex items-center gap-2'>
              <BookOpen className='h-5 w-5 text-blue-600' />
              Field of Study
            </CardTitle>
            <CardDescription>
              Choose your academic focus and track your progress
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className='grid grid-cols-2 md:grid-cols-3 gap-4'>
              {fieldsOfStudy.map((field) => {
                const Icon = field.icon;
                return (
                  <div
                    key={field.id}
                    className={`p-4 rounded-lg border-2 cursor-pointer transition-all ${
                      selectedField === field.id
                        ? 'border-blue-500 bg-blue-50'
                        : 'border-gray-200 hover:border-gray-300'
                    }`}
                    onClick={() => setSelectedField(field.id)}
                  >
                    <div className='flex items-center gap-3 mb-3'>
                      <div className={`p-2 rounded-lg ${field.bgColor}`}>
                        <Icon className={`h-5 w-5 ${field.color}`} />
                      </div>
                      <div>
                        <h4 className='font-semibold text-sm text-gray-900'>
                          {field.name}
                        </h4>
                        <p className='text-xs text-gray-600'>
                          {field.courses} courses
                        </p>
                      </div>
                    </div>
                    <div className='space-y-2'>
                      <div className='flex items-center justify-between text-xs'>
                        <span className='text-gray-600'>Progress</span>
                        <span className='font-medium'>{field.progress}%</span>
                      </div>
                      <div className='w-full bg-gray-200 rounded-full h-2'>
                        <div
                          className={`h-2 rounded-full ${
                            field.id === 'computer-science'
                              ? 'bg-blue-600'
                              : field.id === 'mathematics'
                              ? 'bg-green-600'
                              : field.id === 'physics'
                              ? 'bg-purple-600'
                              : field.id === 'chemistry'
                              ? 'bg-orange-600'
                              : field.id === 'biology'
                              ? 'bg-red-600'
                              : field.id === 'engineering'
                              ? 'bg-indigo-600'
                              : field.id === 'business'
                              ? 'bg-emerald-600'
                              : field.id === 'arts'
                              ? 'bg-pink-600'
                              : field.id === 'medicine'
                              ? 'bg-rose-600'
                              : field.id === 'law'
                              ? 'bg-amber-600'
                              : 'bg-blue-600'
                          }`}
                          style={{ width: `${field.progress}%` }}
                        ></div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </CardContent>
        </Card>

        {/* Current Field Details */}
        {currentField && (
          <Card className='bg-white border border-gray-200 shadow-sm'>
            <CardHeader>
              <div className='flex items-center gap-3'>
                <div className={`p-3 rounded-lg ${currentField.bgColor}`}>
                  <FieldIcon className={`h-6 w-6 ${currentField.color}`} />
                </div>
                <div>
                  <CardTitle className='text-xl'>{currentField.name}</CardTitle>
                  <CardDescription>{currentField.description}</CardDescription>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className='grid grid-cols-1 md:grid-cols-3 gap-6 mb-6'>
                <div className='text-center p-4 bg-gray-50 rounded-lg'>
                  <div className='text-2xl font-bold text-blue-600'>
                    {currentField.courses}
                  </div>
                  <div className='text-sm text-gray-600'>Available Courses</div>
                </div>
                <div className='text-center p-4 bg-gray-50 rounded-lg'>
                  <div className='text-2xl font-bold text-green-600'>
                    {currentField.students}
                  </div>
                  <div className='text-sm text-gray-600'>Active Students</div>
                </div>
                <div className='text-center p-4 bg-gray-50 rounded-lg'>
                  <div className='text-2xl font-bold text-yellow-600'>
                    {currentField.rating}
                  </div>
                  <div className='text-sm text-gray-600'>Average Rating</div>
                </div>
              </div>
              <div className='space-y-3'>
                <div className='flex items-center justify-between'>
                  <span className='text-sm font-medium'>Your Progress</span>
                  <span className='text-sm text-gray-600'>
                    {currentField.progress}% Complete
                  </span>
                </div>
                <div className='w-full bg-gray-200 rounded-full h-3'>
                  <div
                    className={`h-3 rounded-full ${
                      currentField.id === 'computer-science'
                        ? 'bg-blue-600'
                        : currentField.id === 'mathematics'
                        ? 'bg-green-600'
                        : currentField.id === 'physics'
                        ? 'bg-purple-600'
                        : currentField.id === 'chemistry'
                        ? 'bg-orange-600'
                        : currentField.id === 'biology'
                        ? 'bg-red-600'
                        : currentField.id === 'engineering'
                        ? 'bg-indigo-600'
                        : currentField.id === 'business'
                        ? 'bg-emerald-600'
                        : currentField.id === 'arts'
                        ? 'bg-pink-600'
                        : currentField.id === 'medicine'
                        ? 'bg-rose-600'
                        : currentField.id === 'law'
                        ? 'bg-amber-600'
                        : 'bg-blue-600'
                    }`}
                    style={{ width: `${currentField.progress}%` }}
                  ></div>
                </div>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Recommended Courses */}
        <Card className='bg-white border border-gray-200 shadow-sm'>
          <CardHeader>
            <CardTitle className='flex items-center gap-2'>
              <Lightbulb className='h-5 w-5 text-yellow-600' />
              Recommended Courses
            </CardTitle>
            <CardDescription>
              Based on your current progress and interests
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className='space-y-4'>
              {recommendedCourses.map((course) => (
                <div
                  key={course.id}
                  className='border border-gray-200 rounded-lg p-4 hover:bg-gray-50 transition-colors'
                >
                  <div className='flex items-start justify-between mb-3'>
                    <div className='flex-1'>
                      <h4 className='font-semibold text-gray-900 mb-1'>
                        {course.title}
                      </h4>
                      <p className='text-sm text-gray-600 mb-2'>
                        by {course.instructor}
                      </p>
                      <div className='flex items-center gap-4 text-xs text-gray-500'>
                        <span className='flex items-center gap-1'>
                          <Clock className='h-3 w-3' />
                          {course.duration}
                        </span>
                        <span className='flex items-center gap-1'>
                          <Users className='h-3 w-3' />
                          {course.students} students
                        </span>
                        <span className='flex items-center gap-1'>
                          <Star className='h-3 w-3' />
                          {course.rating}
                        </span>
                      </div>
                    </div>
                    <div className='flex items-center gap-2'>
                      <Badge className={`text-xs ${course.color}`}>
                        {course.difficulty}
                      </Badge>
                      <Button
                        size='sm'
                        className='bg-blue-600 hover:bg-blue-700'
                      >
                        {course.price === 'Free'
                          ? 'Enroll Free'
                          : `Enroll $${course.price}`}
                      </Button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Right Sidebar */}
      <div className='lg:col-span-4 space-y-4'>
        {/* Study Groups */}
        <Card className='bg-white border border-gray-200 shadow-sm'>
          <CardHeader className='pb-3'>
            <CardTitle className='text-lg font-semibold text-gray-900'>
              Study Groups
            </CardTitle>
          </CardHeader>
          <CardContent className='space-y-3'>
            {studyGroups.map((group) => (
              <div
                key={group.id}
                className='border border-gray-200 rounded-lg p-3 hover:bg-gray-50'
              >
                <div className='flex items-center justify-between mb-2'>
                  <h4 className='font-semibold text-sm text-gray-900'>
                    {group.name}
                  </h4>
                  <Badge className={`text-xs ${group.color}`}>
                    {group.activeDiscussions} active
                  </Badge>
                </div>
                <div className='flex items-center justify-between text-xs text-gray-600 mb-3'>
                  <span>{group.members} members</span>
                  <span>{group.lastActivity}</span>
                </div>
                <Button size='sm' variant='outline' className='w-full text-xs'>
                  Join Group
                </Button>
              </div>
            ))}
            <Button
              variant='ghost'
              className='w-full text-blue-600 hover:text-blue-700 text-sm'
            >
              View all groups →
            </Button>
          </CardContent>
        </Card>

        {/* Learning Goals */}
        <Card className='bg-white border border-gray-200 shadow-sm'>
          <CardHeader className='pb-3'>
            <CardTitle className='text-lg font-semibold text-gray-900'>
              Learning Goals
            </CardTitle>
          </CardHeader>
          <CardContent className='space-y-3'>
            <div className='space-y-3'>
              <div className='flex items-center justify-between'>
                <span className='text-sm text-gray-600'>
                  Complete 5 courses
                </span>
                <span className='text-sm font-medium'>3/5</span>
              </div>
              <Progress value={60} className='h-2' />
            </div>
            <div className='space-y-3'>
              <div className='flex items-center justify-between'>
                <span className='text-sm text-gray-600'>
                  Join 3 study groups
                </span>
                <span className='text-sm font-medium'>2/3</span>
              </div>
              <Progress value={67} className='h-2' />
            </div>
            <div className='space-y-3'>
              <div className='flex items-center justify-between'>
                <span className='text-sm text-gray-600'>
                  Achieve 4.5+ rating
                </span>
                <span className='text-sm font-medium'>4.2/4.5</span>
              </div>
              <Progress value={93} className='h-2' />
            </div>
            <Button
              variant='outline'
              className='w-full border-blue-200 text-blue-600 hover:bg-blue-50'
            >
              <Target className='h-4 w-4 mr-2' />
              Set New Goals
            </Button>
          </CardContent>
        </Card>

        {/* Quick Actions */}
        <Card className='bg-white border border-gray-200 shadow-sm'>
          <CardHeader className='pb-3'>
            <CardTitle className='text-lg font-semibold text-gray-900'>
              Quick Actions
            </CardTitle>
          </CardHeader>
          <CardContent className='space-y-2'>
            <Button
              variant='ghost'
              className='w-full justify-start text-gray-600 hover:text-gray-900 hover:bg-gray-50'
            >
              <Search className='h-4 w-4 mr-3' />
              Find Courses
            </Button>
            <Button
              variant='ghost'
              className='w-full justify-start text-gray-600 hover:text-gray-900 hover:bg-gray-50'
            >
              <Plus className='h-4 w-4 mr-3' />
              Create Study Plan
            </Button>
            <Button
              variant='ghost'
              className='w-full justify-start text-gray-600 hover:text-gray-900 hover:bg-gray-50'
            >
              <BookMarked className='h-4 w-4 mr-3' />
              Bookmark Courses
            </Button>
            <Button
              variant='ghost'
              className='w-full justify-start text-gray-600 hover:text-gray-900 hover:bg-gray-50'
            >
              <TrendingUp className='h-4 w-4 mr-3' />
              View Analytics
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default StudentFieldOfStudy;
