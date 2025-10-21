import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import {
  Calendar,
  Video,
  Users,
  Clock,
  MapPin,
  Globe,
  Mic,
  Camera,
  Share2,
  BarChart3,
  Plus,
  Edit,
  Trash2,
  ExternalLink,
  Filter,
  Search,
  Play,
  Pause,
  Square,
  Settings,
  Bell,
  UserPlus,
  MessageSquare,
  FileText,
  Download,
  Upload,
  Eye,
  Heart,
  ThumbsUp,
  Star,
  Award,
  GraduationCap,
  BookOpen,
  Presentation,
  Target,
  TrendingUp,
  DollarSign,
  CheckCircle,
  AlertCircle,
  Building,
} from 'lucide-react';

const UniversityEventsSessions = () => {
  const [activeTab, setActiveTab] = useState('events');
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState('all');
  const [filterType, setFilterType] = useState('all');

  // Mock data for events and sessions
  const events = [
    {
      id: 1,
      title: 'Virtual Open House - Spring 2024',
      type: 'open-house',
      status: 'upcoming',
      date: '2024-03-15',
      time: '14:00',
      duration: '2 hours',
      attendees: 0,
      maxAttendees: 500,
      platform: 'Zoom',
      description:
        'Comprehensive virtual tour and Q&A session for prospective students',
      speakers: ['Dr. Sarah Johnson', 'Prof. Michael Chen'],
      tags: ['Admissions', 'Virtual Tour', 'Q&A'],
      registrationUrl: 'https://university.edu/open-house-spring-2024',
    },
    {
      id: 2,
      title: 'Graduate Program Information Session',
      type: 'info-session',
      status: 'live',
      date: '2024-01-25',
      time: '16:00',
      duration: '1.5 hours',
      attendees: 127,
      maxAttendees: 200,
      platform: 'Microsoft Teams',
      description:
        'Detailed overview of graduate programs and admission requirements',
      speakers: ['Dr. Emily Rodriguez', 'Dr. James Wilson'],
      tags: ['Graduate Programs', 'Admissions', 'Academic'],
      registrationUrl: 'https://university.edu/grad-info-session',
    },
    {
      id: 3,
      title: 'International Student Webinar',
      type: 'webinar',
      status: 'completed',
      date: '2024-01-20',
      time: '10:00',
      duration: '1 hour',
      attendees: 89,
      maxAttendees: 150,
      platform: 'YouTube Live',
      description:
        'Information session for international students about visa requirements and campus life',
      speakers: ['International Office Team'],
      tags: ['International Students', 'Visa', 'Campus Life'],
      registrationUrl: 'https://university.edu/international-webinar',
    },
    {
      id: 4,
      title: 'Faculty Research Showcase',
      type: 'showcase',
      status: 'upcoming',
      date: '2024-02-10',
      time: '13:00',
      duration: '3 hours',
      attendees: 0,
      maxAttendees: 300,
      platform: 'In-Person + Live Stream',
      description:
        'Showcase of faculty research projects and collaboration opportunities',
      speakers: ['Multiple Faculty Members'],
      tags: ['Research', 'Faculty', 'Collaboration'],
      registrationUrl: 'https://university.edu/research-showcase',
    },
  ];

  const sessions = [
    {
      id: 1,
      title: 'Live Q&A with Admissions Team',
      type: 'live-qa',
      status: 'scheduled',
      date: '2024-01-30',
      time: '15:00',
      duration: '45 minutes',
      attendees: 0,
      maxAttendees: 100,
      platform: 'Instagram Live',
      description: 'Real-time Q&A session with admissions counselors',
      host: 'Admissions Team',
      tags: ['Q&A', 'Admissions', 'Live'],
    },
    {
      id: 2,
      title: 'Campus Virtual Tour',
      type: 'virtual-tour',
      status: 'live',
      date: '2024-01-25',
      time: '11:00',
      duration: '30 minutes',
      attendees: 45,
      maxAttendees: 50,
      platform: 'Facebook Live',
      description: 'Interactive virtual tour of campus facilities',
      host: 'Student Ambassadors',
      tags: ['Campus Tour', 'Virtual', 'Student Life'],
    },
    {
      id: 3,
      title: 'Department Spotlight: Computer Science',
      type: 'department-spotlight',
      status: 'completed',
      date: '2024-01-22',
      time: '14:00',
      duration: '1 hour',
      attendees: 78,
      maxAttendees: 100,
      platform: 'LinkedIn Live',
      description:
        'Deep dive into Computer Science programs and career opportunities',
      host: 'CS Department Faculty',
      tags: ['Computer Science', 'Career', 'Academic'],
    },
  ];

  const eventStats = [
    {
      title: 'Total Events',
      value: '24',
      change: '+3',
      trend: 'up',
      icon: Calendar,
    },
    {
      title: 'Total Attendees',
      value: '2,847',
      change: '+15.2%',
      trend: 'up',
      icon: Users,
    },
    {
      title: 'Average Rating',
      value: '4.8',
      change: '+0.2',
      trend: 'up',
      icon: Star,
    },
    {
      title: 'Conversion Rate',
      value: '12.5%',
      change: '+2.1%',
      trend: 'up',
      icon: TrendingUp,
    },
  ];

  const filteredEvents = events.filter((event) => {
    const matchesSearch = event.title
      .toLowerCase()
      .includes(searchTerm.toLowerCase());
    const matchesStatus =
      filterStatus === 'all' || event.status === filterStatus;
    const matchesType = filterType === 'all' || event.type === filterType;
    return matchesSearch && matchesStatus && matchesType;
  });

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'upcoming':
        return 'bg-blue-100 text-blue-800';
      case 'live':
        return 'bg-green-100 text-green-800';
      case 'completed':
        return 'bg-gray-100 text-gray-800';
      case 'cancelled':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'open-house':
        return Building;
      case 'info-session':
        return Presentation;
      case 'webinar':
        return Video;
      case 'showcase':
        return Award;
      case 'live-qa':
        return MessageSquare;
      case 'virtual-tour':
        return Globe;
      case 'department-spotlight':
        return GraduationCap;
      default:
        return Calendar;
    }
  };

  return (
    <div className='space-y-6'>
      {/* Header */}
      <div className='flex items-center justify-between'>
        <div>
          <h1 className='text-2xl font-bold text-gray-900'>
            Events, Sessions & Webinars
          </h1>
          <p className='text-gray-600 mt-1'>
            Manage university events, live sessions, and webinars
          </p>
        </div>
        <div className='flex gap-2'>
          <Button variant='outline'>
            <Calendar className='h-4 w-4 mr-2' />
            New Event
          </Button>
          <Button className='bg-blue-600 hover:bg-blue-700 text-white'>
            <Plus className='h-4 w-4 mr-2' />
            New Session
          </Button>
        </div>
      </div>

      {/* Stats Cards */}
      <div className='grid grid-cols-1 md:grid-cols-4 gap-4'>
        {eventStats.map((stat, index) => (
          <Card key={index}>
            <CardContent className='p-4'>
              <div className='flex items-center gap-3'>
                <div className='p-2 bg-blue-100 rounded-lg'>
                  <stat.icon className='h-5 w-5 text-blue-600' />
                </div>
                <div>
                  <p className='text-sm text-gray-600'>{stat.title}</p>
                  <p className='text-lg font-semibold text-gray-900'>
                    {stat.value}
                  </p>
                  <p
                    className={`text-xs ${
                      stat.trend === 'up' ? 'text-green-600' : 'text-red-600'
                    }`}
                  >
                    {stat.change}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Main Content */}
      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList>
          <TabsTrigger value='events'>Events</TabsTrigger>
          <TabsTrigger value='sessions'>Live Sessions</TabsTrigger>
          <TabsTrigger value='analytics'>Analytics</TabsTrigger>
        </TabsList>

        <TabsContent value='events' className='space-y-4'>
          {/* Filters */}
          <div className='flex gap-4'>
            <div className='flex-1'>
              <div className='relative'>
                <Search className='absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4' />
                <Input
                  placeholder='Search events...'
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className='pl-10'
                />
              </div>
            </div>
            <Select value={filterStatus} onValueChange={setFilterStatus}>
              <SelectTrigger className='w-[150px]'>
                <Filter className='h-4 w-4 mr-2' />
                <SelectValue placeholder='Filter by status' />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value='all'>All Status</SelectItem>
                <SelectItem value='upcoming'>Upcoming</SelectItem>
                <SelectItem value='live'>Live</SelectItem>
                <SelectItem value='completed'>Completed</SelectItem>
                <SelectItem value='cancelled'>Cancelled</SelectItem>
              </SelectContent>
            </Select>
            <Select value={filterType} onValueChange={setFilterType}>
              <SelectTrigger className='w-[150px]'>
                <SelectValue placeholder='Filter by type' />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value='all'>All Types</SelectItem>
                <SelectItem value='open-house'>Open House</SelectItem>
                <SelectItem value='info-session'>Info Session</SelectItem>
                <SelectItem value='webinar'>Webinar</SelectItem>
                <SelectItem value='showcase'>Showcase</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Events List */}
          <div className='space-y-4'>
            {filteredEvents.map((event) => {
              const TypeIcon = getTypeIcon(event.type);
              return (
                <Card key={event.id}>
                  <CardContent className='p-6'>
                    <div className='flex items-start justify-between mb-4'>
                      <div className='flex-1'>
                        <div className='flex items-center gap-3 mb-2'>
                          <TypeIcon className='h-5 w-5 text-blue-600' />
                          <h3 className='text-lg font-semibold text-gray-900'>
                            {event.title}
                          </h3>
                          <Badge className={getStatusColor(event.status)}>
                            {event.status}
                          </Badge>
                        </div>
                        <p className='text-sm text-gray-600 mb-3'>
                          {event.description}
                        </p>
                        <div className='grid grid-cols-2 md:grid-cols-4 gap-4 text-sm text-gray-600 mb-3'>
                          <div className='flex items-center gap-2'>
                            <Calendar className='h-4 w-4' />
                            <span>{event.date}</span>
                          </div>
                          <div className='flex items-center gap-2'>
                            <Clock className='h-4 w-4' />
                            <span>{event.time}</span>
                          </div>
                          <div className='flex items-center gap-2'>
                            <Users className='h-4 w-4' />
                            <span>
                              {event.attendees}/{event.maxAttendees}
                            </span>
                          </div>
                          <div className='flex items-center gap-2'>
                            <Globe className='h-4 w-4' />
                            <span>{event.platform}</span>
                          </div>
                        </div>
                        <div className='flex items-center gap-4 text-sm text-gray-500'>
                          <span>Duration: {event.duration}</span>
                          <span>Speakers: {event.speakers.join(', ')}</span>
                          <div className='flex gap-1'>
                            {event.tags.map((tag, index) => (
                              <Badge
                                key={index}
                                variant='outline'
                                className='text-xs'
                              >
                                {tag}
                              </Badge>
                            ))}
                          </div>
                        </div>
                      </div>
                      <div className='flex gap-2'>
                        <Button size='sm' variant='outline'>
                          <Edit className='h-4 w-4 mr-1' />
                          Edit
                        </Button>
                        <Button size='sm' variant='outline'>
                          <BarChart3 className='h-4 w-4 mr-1' />
                          Analytics
                        </Button>
                        <Button size='sm' variant='outline'>
                          <ExternalLink className='h-4 w-4 mr-1' />
                          View
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </TabsContent>

        <TabsContent value='sessions' className='space-y-4'>
          <div className='space-y-4'>
            {sessions.map((session) => {
              const TypeIcon = getTypeIcon(session.type);
              return (
                <Card key={session.id}>
                  <CardContent className='p-6'>
                    <div className='flex items-start justify-between mb-4'>
                      <div className='flex-1'>
                        <div className='flex items-center gap-3 mb-2'>
                          <TypeIcon className='h-5 w-5 text-green-600' />
                          <h3 className='text-lg font-semibold text-gray-900'>
                            {session.title}
                          </h3>
                          <Badge className={getStatusColor(session.status)}>
                            {session.status}
                          </Badge>
                        </div>
                        <p className='text-sm text-gray-600 mb-3'>
                          {session.description}
                        </p>
                        <div className='grid grid-cols-2 md:grid-cols-4 gap-4 text-sm text-gray-600 mb-3'>
                          <div className='flex items-center gap-2'>
                            <Calendar className='h-4 w-4' />
                            <span>{session.date}</span>
                          </div>
                          <div className='flex items-center gap-2'>
                            <Clock className='h-4 w-4' />
                            <span>{session.time}</span>
                          </div>
                          <div className='flex items-center gap-2'>
                            <Users className='h-4 w-4' />
                            <span>
                              {session.attendees}/{session.maxAttendees}
                            </span>
                          </div>
                          <div className='flex items-center gap-2'>
                            <Globe className='h-4 w-4' />
                            <span>{session.platform}</span>
                          </div>
                        </div>
                        <div className='flex items-center gap-4 text-sm text-gray-500'>
                          <span>Host: {session.host}</span>
                          <span>Duration: {session.duration}</span>
                          <div className='flex gap-1'>
                            {session.tags.map((tag, index) => (
                              <Badge
                                key={index}
                                variant='outline'
                                className='text-xs'
                              >
                                {tag}
                              </Badge>
                            ))}
                          </div>
                        </div>
                      </div>
                      <div className='flex gap-2'>
                        {session.status === 'live' && (
                          <Button
                            size='sm'
                            className='bg-red-600 hover:bg-red-700 text-white'
                          >
                            <Square className='h-4 w-4 mr-1' />
                            End
                          </Button>
                        )}
                        {session.status === 'scheduled' && (
                          <Button
                            size='sm'
                            className='bg-green-600 hover:bg-green-700 text-white'
                          >
                            <Play className='h-4 w-4 mr-1' />
                            Start
                          </Button>
                        )}
                        <Button size='sm' variant='outline'>
                          <Edit className='h-4 w-4 mr-1' />
                          Edit
                        </Button>
                        <Button size='sm' variant='outline'>
                          <BarChart3 className='h-4 w-4 mr-1' />
                          Analytics
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </TabsContent>

        <TabsContent value='analytics' className='space-y-4'>
          <div className='grid grid-cols-1 lg:grid-cols-2 gap-6'>
            <Card>
              <CardHeader>
                <CardTitle>Event Performance</CardTitle>
              </CardHeader>
              <CardContent>
                <div className='space-y-4'>
                  <div className='flex justify-between items-center'>
                    <span className='text-sm text-gray-600'>
                      Average Attendance Rate
                    </span>
                    <span className='font-semibold'>78%</span>
                  </div>
                  <div className='flex justify-between items-center'>
                    <span className='text-sm text-gray-600'>
                      Registration Conversion
                    </span>
                    <span className='font-semibold'>15.2%</span>
                  </div>
                  <div className='flex justify-between items-center'>
                    <span className='text-sm text-gray-600'>
                      Engagement Score
                    </span>
                    <span className='font-semibold'>4.8/5</span>
                  </div>
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle>Popular Event Types</CardTitle>
              </CardHeader>
              <CardContent>
                <div className='space-y-3'>
                  <div className='flex justify-between items-center'>
                    <span className='text-sm'>Virtual Open Houses</span>
                    <div className='flex items-center gap-2'>
                      <div className='w-20 bg-gray-200 rounded-full h-2'>
                        <div
                          className='bg-blue-600 h-2 rounded-full'
                          style={{ width: '90%' }}
                        ></div>
                      </div>
                      <span className='text-sm font-medium'>90%</span>
                    </div>
                  </div>
                  <div className='flex justify-between items-center'>
                    <span className='text-sm'>Info Sessions</span>
                    <div className='flex items-center gap-2'>
                      <div className='w-20 bg-gray-200 rounded-full h-2'>
                        <div
                          className='bg-green-600 h-2 rounded-full'
                          style={{ width: '75%' }}
                        ></div>
                      </div>
                      <span className='text-sm font-medium'>75%</span>
                    </div>
                  </div>
                  <div className='flex justify-between items-center'>
                    <span className='text-sm'>Webinars</span>
                    <div className='flex items-center gap-2'>
                      <div className='w-20 bg-gray-200 rounded-full h-2'>
                        <div
                          className='bg-purple-600 h-2 rounded-full'
                          style={{ width: '60%' }}
                        ></div>
                      </div>
                      <span className='text-sm font-medium'>60%</span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default UniversityEventsSessions;
