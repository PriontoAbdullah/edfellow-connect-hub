import { useState, useEffect } from 'react';
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
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Progress } from '@/components/ui/progress';
import {
  Users,
  MessageSquare,
  BookOpen,
  Calendar,
  TrendingUp,
  Award,
  Bell,
  Search,
  Heart,
  Target,
  ArrowRight,
  Plus,
} from 'lucide-react';

const StudentDashboard = () => {
  const navigate = useNavigate();

  // Scroll to top on component mount
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);

  const quickStats = [
    {
      label: 'Groups Joined',
      value: '12',
      icon: Users,
      color: 'bg-blue-500',
      change: '+2 this week',
    },
    {
      label: 'Messages',
      value: '47',
      icon: MessageSquare,
      color: 'bg-green-500',
      change: '+12 today',
    },
    {
      label: 'Programs Explored',
      value: '8',
      icon: BookOpen,
      color: 'bg-purple-500',
      change: '+3 this month',
    },
    {
      label: 'Mentorship Hours',
      value: '24',
      icon: Calendar,
      color: 'bg-orange-500',
      change: '+4 this week',
    },
  ];

  const recentActivities = [
    {
      type: 'message',
      content: 'New message from Dr. Sarah Wilson',
      time: '2 hours ago',
      icon: MessageSquare,
    },
    {
      type: 'group',
      content: 'New post in Computer Science group',
      time: '4 hours ago',
      icon: Users,
    },
    {
      type: 'mentorship',
      content: 'Mentorship session completed',
      time: '1 day ago',
      icon: Heart,
    },
    {
      type: 'program',
      content: 'New program match found',
      time: '2 days ago',
      icon: BookOpen,
    },
  ];

  const upcomingEvents = [
    {
      title: 'AI Study Group Meeting',
      time: 'Today, 3:00 PM',
      type: 'group',
      participants: 8,
    },
    {
      title: 'Mentorship Session with Dr. Johnson',
      time: 'Tomorrow, 10:00 AM',
      type: 'mentorship',
      participants: 1,
    },
    {
      title: 'Stanford Info Session',
      time: 'Friday, 2:00 PM',
      type: 'program',
      participants: 45,
    },
  ];

  const handleExplorePrograms = () => {
    navigate('/dashboard/explore');
  };

  const handleJoinGroups = () => {
    navigate('/dashboard/groups');
  };

  const handleFindMentors = () => {
    navigate('/dashboard/mentorship');
  };

  const handleStartChat = () => {
    navigate('/dashboard/chat');
  };

  return (
    <div className='p-6 space-y-6'>
      {/* Welcome Section */}
      <div className='bg-gradient-to-r from-blue-600 to-blue-800 rounded-xl p-6 text-white'>
        <div className='flex items-center justify-between'>
          <div>
            <h1 className='text-2xl font-bold mb-2'>Welcome back, Student!</h1>
            <p className='text-blue-100'>
              Continue your educational journey with global opportunities
            </p>
          </div>
          <div className='text-right'>
            <div className='text-3xl font-bold'>85%</div>
            <div className='text-sm text-blue-200'>Profile Complete</div>
          </div>
        </div>
      </div>

      {/* Quick Stats */}
      <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6'>
        {quickStats.map((stat, index) => (
          <Card key={index} className='hover:shadow-lg transition-shadow'>
            <CardContent className='p-6'>
              <div className='flex items-center justify-between'>
                <div>
                  <p className='text-sm font-medium text-gray-600'>
                    {stat.label}
                  </p>
                  <p className='text-2xl font-bold text-gray-900'>
                    {stat.value}
                  </p>
                  <p className='text-xs text-green-600 mt-1'>{stat.change}</p>
                </div>
                <div className={`p-3 rounded-full ${stat.color}`}>
                  <stat.icon className='h-6 w-6 text-white' />
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className='grid lg:grid-cols-3 gap-6'>
        {/* Quick Actions */}
        <div className='lg:col-span-2 space-y-6'>
          <Card>
            <CardHeader>
              <CardTitle className='flex items-center gap-2'>
                <Target className='h-5 w-5 text-blue-600' />
                Quick Actions
              </CardTitle>
              <CardDescription>
                Get started with your educational journey
              </CardDescription>
            </CardHeader>
            <CardContent className='grid grid-cols-1 md:grid-cols-2 gap-4'>
              <Button
                className='h-16 flex-col gap-2 bg-blue-600 hover:bg-blue-700'
                onClick={handleExplorePrograms}
              >
                <Search className='h-5 w-5' />
                Explore Programs
              </Button>
              <Button
                variant='outline'
                className='h-16 flex-col gap-2 border-green-200 hover:bg-green-50'
                onClick={handleJoinGroups}
              >
                <Users className='h-5 w-5 text-green-600' />
                Join Groups
              </Button>
              <Button
                variant='outline'
                className='h-16 flex-col gap-2 border-purple-200 hover:bg-purple-50'
                onClick={handleFindMentors}
              >
                <Heart className='h-5 w-5 text-purple-600' />
                Find Mentors
              </Button>
              <Button
                variant='outline'
                className='h-16 flex-col gap-2 border-orange-200 hover:bg-orange-50'
                onClick={handleStartChat}
              >
                <MessageSquare className='h-5 w-5 text-orange-600' />
                Start Chat
              </Button>
            </CardContent>
          </Card>

          {/* Recent Activities */}
          <Card>
            <CardHeader>
              <CardTitle className='flex items-center gap-2'>
                <Bell className='h-5 w-5 text-gray-600' />
                Recent Activities
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className='space-y-4'>
                {recentActivities.map((activity, index) => (
                  <div
                    key={index}
                    className='flex items-center space-x-3 p-3 bg-gray-50 rounded-lg'
                  >
                    <div className='p-2 bg-white rounded-full'>
                      <activity.icon className='h-4 w-4 text-gray-600' />
                    </div>
                    <div className='flex-1'>
                      <p className='text-sm font-medium text-gray-900'>
                        {activity.content}
                      </p>
                      <p className='text-xs text-gray-500'>{activity.time}</p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Sidebar */}
        <div className='space-y-6'>
          {/* Learning Progress */}
          <Card>
            <CardHeader>
              <CardTitle className='flex items-center gap-2'>
                <TrendingUp className='h-5 w-5 text-green-600' />
                Learning Progress
              </CardTitle>
            </CardHeader>
            <CardContent className='space-y-4'>
              <div>
                <div className='flex justify-between text-sm mb-2'>
                  <span>Profile Completion</span>
                  <span>85%</span>
                </div>
                <Progress value={85} className='h-2' />
              </div>
              <div>
                <div className='flex justify-between text-sm mb-2'>
                  <span>Goals Achieved</span>
                  <span>67%</span>
                </div>
                <Progress value={67} className='h-2' />
              </div>
              <div>
                <div className='flex justify-between text-sm mb-2'>
                  <span>Connections Made</span>
                  <span>42%</span>
                </div>
                <Progress value={42} className='h-2' />
              </div>
            </CardContent>
          </Card>

          {/* Upcoming Events */}
          <Card>
            <CardHeader>
              <CardTitle className='flex items-center gap-2'>
                <Calendar className='h-5 w-5 text-purple-600' />
                Upcoming Events
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className='space-y-3'>
                {upcomingEvents.map((event, index) => (
                  <div
                    key={index}
                    className='p-3 border rounded-lg hover:shadow-sm transition-shadow'
                  >
                    <h4 className='font-medium text-sm text-gray-900'>
                      {event.title}
                    </h4>
                    <p className='text-xs text-gray-600 mt-1'>{event.time}</p>
                    <div className='flex items-center justify-between mt-2'>
                      <Badge variant='outline' className='text-xs'>
                        {event.participants} participants
                      </Badge>
                      <ArrowRight className='h-3 w-3 text-gray-400' />
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Achievement Badge */}
          <Card className='bg-gradient-to-br from-yellow-50 to-orange-50 border-yellow-200'>
            <CardContent className='p-6 text-center'>
              <Award className='h-12 w-12 text-yellow-600 mx-auto mb-3' />
              <h3 className='font-semibold text-gray-900 mb-2'>
                Active Learner
              </h3>
              <p className='text-sm text-gray-600 mb-4'>
                You've been consistently active this month!
              </p>
              <Button
                size='sm'
                variant='outline'
                className='border-yellow-300 text-yellow-700 hover:bg-yellow-100'
              >
                View Achievements
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default StudentDashboard;
