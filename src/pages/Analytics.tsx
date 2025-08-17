import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import {
  BarChart3,
  TrendingUp,
  Users,
  Globe,
  Calendar,
  Eye,
  Download,
  Share2,
  Filter,
  RefreshCw,
  PieChart,
  Activity,
  Target,
  Award,
  BookOpen,
  MessageSquare,
  Star,
} from 'lucide-react';

const Analytics = () => {
  const [activeTab, setActiveTab] = useState('overview');
  const [dateRange, setDateRange] = useState('30d');

  const analyticsData = {
    overview: {
      profileViews: 26,
      connections: 45,
      endorsements: 12,
      publications: 3,
      projects: 8,
      certifications: 5,
      studyHours: 156,
      coursesCompleted: 12,
      gpa: 3.8,
    },
    engagement: {
      pageViews: 456,
      uniqueVisitors: 234,
      avgSessionDuration: '4m 32s',
      bounceRate: 23.4,
      topPages: [
        { page: 'Profile', views: 125 },
        { page: 'Portfolio', views: 89 },
        { page: 'Projects', views: 76 },
        { page: 'Publications', views: 54 },
        { page: 'Skills', views: 42 },
      ],
    },
    academic: {
      coursesInProgress: 4,
      coursesCompleted: 12,
      totalCredits: 96,
      remainingCredits: 24,
      gpa: 3.8,
      studyHours: 156,
      assignmentsCompleted: 45,
      upcomingDeadlines: 3,
    },
    network: {
      totalConnections: 45,
      professors: 8,
      students: 32,
      universities: 5,
      newConnections: 12,
      pendingRequests: 3,
      messagesSent: 89,
      messagesReceived: 156,
    },
  };

  const handleExportData = () => {
    // Export functionality
    console.log('Exporting analytics data...');
  };

  const handleShareReport = () => {
    // Share functionality
    console.log('Sharing analytics report...');
  };

  const handleRefreshData = () => {
    // Refresh functionality
    console.log('Refreshing analytics data...');
  };

  return (
    <div className='p-6 space-y-6'>
      {/* Header */}
      <div className='flex items-center justify-between'>
        <div>
          <h1 className='text-2xl font-bold text-gray-900 flex items-center gap-2'>
            <BarChart3 className='h-6 w-6 text-blue-600' />
            Analytics Dashboard
          </h1>
          <p className='text-gray-600'>
            Track your academic progress and engagement metrics
          </p>
        </div>
        <div className='flex items-center gap-2'>
          <Button variant='outline' size='sm' onClick={handleRefreshData}>
            <RefreshCw className='h-4 w-4 mr-1' />
            Refresh
          </Button>
          <Button variant='outline' size='sm' onClick={handleExportData}>
            <Download className='h-4 w-4 mr-1' />
            Export
          </Button>
          <Button variant='outline' size='sm' onClick={handleShareReport}>
            <Share2 className='h-4 w-4 mr-1' />
            Share
          </Button>
        </div>
      </div>

      {/* Date Range Filter */}
      <div className='flex items-center gap-4'>
        <div className='flex items-center gap-2'>
          <Calendar className='h-4 w-4 text-gray-500' />
          <span className='text-sm font-medium'>Date Range:</span>
        </div>
        <div className='flex gap-2'>
          {['7d', '30d', '90d', '1y'].map((range) => (
            <Button
              key={range}
              variant={dateRange === range ? 'default' : 'outline'}
              size='sm'
              onClick={() => setDateRange(range)}
            >
              {range}
            </Button>
          ))}
        </div>
      </div>

      {/* Tabs */}
      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList className='grid w-full grid-cols-4'>
          <TabsTrigger value='overview'>Overview</TabsTrigger>
          <TabsTrigger value='engagement'>Engagement</TabsTrigger>
          <TabsTrigger value='academic'>Academic</TabsTrigger>
          <TabsTrigger value='network'>Network</TabsTrigger>
        </TabsList>

        <TabsContent value='overview' className='space-y-6'>
          {/* Key Metrics */}
          <div className='grid grid-cols-2 md:grid-cols-4 gap-4'>
            <Card>
              <CardContent className='p-4'>
                <div className='flex items-center justify-between'>
                  <div>
                    <p className='text-sm text-gray-600'>Profile Views</p>
                    <p className='text-2xl font-bold text-blue-600'>
                      {analyticsData.overview.profileViews}
                    </p>
                  </div>
                  <Eye className='h-8 w-8 text-blue-600' />
                </div>
                <div className='flex items-center gap-1 mt-2'>
                  <TrendingUp className='h-3 w-3 text-green-600' />
                  <span className='text-xs text-green-600'>+15.2%</span>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className='p-4'>
                <div className='flex items-center justify-between'>
                  <div>
                    <p className='text-sm text-gray-600'>Connections</p>
                    <p className='text-2xl font-bold text-green-600'>
                      {analyticsData.overview.connections}
                    </p>
                  </div>
                  <Users className='h-8 w-8 text-green-600' />
                </div>
                <div className='flex items-center gap-1 mt-2'>
                  <TrendingUp className='h-3 w-3 text-green-600' />
                  <span className='text-xs text-green-600'>+8.5%</span>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className='p-4'>
                <div className='flex items-center justify-between'>
                  <div>
                    <p className='text-sm text-gray-600'>Endorsements</p>
                    <p className='text-2xl font-bold text-purple-600'>
                      {analyticsData.overview.endorsements}
                    </p>
                  </div>
                  <Star className='h-8 w-8 text-purple-600' />
                </div>
                <div className='flex items-center gap-1 mt-2'>
                  <TrendingUp className='h-3 w-3 text-green-600' />
                  <span className='text-xs text-green-600'>+12.3%</span>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className='p-4'>
                <div className='flex items-center justify-between'>
                  <div>
                    <p className='text-sm text-gray-600'>GPA</p>
                    <p className='text-2xl font-bold text-orange-600'>
                      {analyticsData.overview.gpa}
                    </p>
                  </div>
                  <Award className='h-8 w-8 text-orange-600' />
                </div>
                <div className='flex items-center gap-1 mt-2'>
                  <TrendingUp className='h-3 w-3 text-green-600' />
                  <span className='text-xs text-green-600'>+0.2</span>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Academic Progress */}
          <div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
            <Card>
              <CardHeader>
                <CardTitle className='text-lg flex items-center gap-2'>
                  <BookOpen className='h-5 w-5' />
                  Academic Progress
                </CardTitle>
              </CardHeader>
              <CardContent className='space-y-4'>
                <div className='space-y-3'>
                  <div className='flex items-center justify-between'>
                    <span className='text-sm text-gray-600'>
                      Courses Completed
                    </span>
                    <span className='text-sm font-medium'>
                      {analyticsData.overview.coursesCompleted}/20
                    </span>
                  </div>
                  <div className='w-full bg-gray-200 rounded-full h-2'>
                    <div
                      className='bg-blue-600 h-2 rounded-full'
                      style={{
                        width: `${
                          (analyticsData.overview.coursesCompleted / 20) * 100
                        }%`,
                      }}
                    ></div>
                  </div>
                </div>
                <div className='space-y-3'>
                  <div className='flex items-center justify-between'>
                    <span className='text-sm text-gray-600'>Study Hours</span>
                    <span className='text-sm font-medium'>
                      {analyticsData.overview.studyHours}/200 hrs
                    </span>
                  </div>
                  <div className='w-full bg-gray-200 rounded-full h-2'>
                    <div
                      className='bg-green-600 h-2 rounded-full'
                      style={{
                        width: `${
                          (analyticsData.overview.studyHours / 200) * 100
                        }%`,
                      }}
                    ></div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className='text-lg flex items-center gap-2'>
                  <Target className='h-5 w-5' />
                  Achievements
                </CardTitle>
              </CardHeader>
              <CardContent className='space-y-4'>
                <div className='grid grid-cols-2 gap-4'>
                  <div className='text-center p-3 bg-blue-50 rounded-lg'>
                    <div className='text-2xl font-bold text-blue-600'>
                      {analyticsData.overview.publications}
                    </div>
                    <div className='text-xs text-gray-600'>Publications</div>
                  </div>
                  <div className='text-center p-3 bg-green-50 rounded-lg'>
                    <div className='text-2xl font-bold text-green-600'>
                      {analyticsData.overview.projects}
                    </div>
                    <div className='text-xs text-gray-600'>Projects</div>
                  </div>
                  <div className='text-center p-3 bg-purple-50 rounded-lg'>
                    <div className='text-2xl font-bold text-purple-600'>
                      {analyticsData.overview.certifications}
                    </div>
                    <div className='text-xs text-gray-600'>Certifications</div>
                  </div>
                  <div className='text-center p-3 bg-orange-50 rounded-lg'>
                    <div className='text-2xl font-bold text-orange-600'>
                      {analyticsData.overview.endorsements}
                    </div>
                    <div className='text-xs text-gray-600'>Endorsements</div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value='engagement' className='space-y-6'>
          <div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
            <Card>
              <CardHeader>
                <CardTitle className='text-lg flex items-center gap-2'>
                  <Activity className='h-5 w-5' />
                  Engagement Metrics
                </CardTitle>
              </CardHeader>
              <CardContent className='space-y-4'>
                <div className='space-y-3'>
                  <div className='flex items-center justify-between'>
                    <span className='text-sm text-gray-600'>Page Views</span>
                    <span className='text-sm font-medium'>
                      {analyticsData.engagement.pageViews}
                    </span>
                  </div>
                  <div className='flex items-center justify-between'>
                    <span className='text-sm text-gray-600'>
                      Unique Visitors
                    </span>
                    <span className='text-sm font-medium'>
                      {analyticsData.engagement.uniqueVisitors}
                    </span>
                  </div>
                  <div className='flex items-center justify-between'>
                    <span className='text-sm text-gray-600'>
                      Avg Session Duration
                    </span>
                    <span className='text-sm font-medium'>
                      {analyticsData.engagement.avgSessionDuration}
                    </span>
                  </div>
                  <div className='flex items-center justify-between'>
                    <span className='text-sm text-gray-600'>Bounce Rate</span>
                    <span className='text-sm font-medium'>
                      {analyticsData.engagement.bounceRate}%
                    </span>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className='text-lg flex items-center gap-2'>
                  <PieChart className='h-5 w-5' />
                  Top Pages
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className='space-y-3'>
                  {analyticsData.engagement.topPages.map((page, index) => (
                    <div
                      key={index}
                      className='flex items-center justify-between'
                    >
                      <span className='text-sm text-gray-600'>{page.page}</span>
                      <span className='text-sm font-medium'>
                        {page.views} views
                      </span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value='academic' className='space-y-6'>
          <div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
            <Card>
              <CardHeader>
                <CardTitle className='text-lg flex items-center gap-2'>
                  <BookOpen className='h-5 w-5' />
                  Academic Performance
                </CardTitle>
              </CardHeader>
              <CardContent className='space-y-4'>
                <div className='grid grid-cols-2 gap-4'>
                  <div className='text-center p-3 bg-blue-50 rounded-lg'>
                    <div className='text-2xl font-bold text-blue-600'>
                      {analyticsData.academic.coursesInProgress}
                    </div>
                    <div className='text-xs text-gray-600'>In Progress</div>
                  </div>
                  <div className='text-center p-3 bg-green-50 rounded-lg'>
                    <div className='text-2xl font-bold text-green-600'>
                      {analyticsData.academic.coursesCompleted}
                    </div>
                    <div className='text-xs text-gray-600'>Completed</div>
                  </div>
                  <div className='text-center p-3 bg-purple-50 rounded-lg'>
                    <div className='text-2xl font-bold text-purple-600'>
                      {analyticsData.academic.totalCredits}
                    </div>
                    <div className='text-xs text-gray-600'>Total Credits</div>
                  </div>
                  <div className='text-center p-3 bg-orange-50 rounded-lg'>
                    <div className='text-2xl font-bold text-orange-600'>
                      {analyticsData.academic.remainingCredits}
                    </div>
                    <div className='text-xs text-gray-600'>Remaining</div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className='text-lg flex items-center gap-2'>
                  <Target className='h-5 w-5' />
                  Study Analytics
                </CardTitle>
              </CardHeader>
              <CardContent className='space-y-4'>
                <div className='space-y-3'>
                  <div className='flex items-center justify-between'>
                    <span className='text-sm text-gray-600'>Study Hours</span>
                    <span className='text-sm font-medium'>
                      {analyticsData.academic.studyHours} hrs
                    </span>
                  </div>
                  <div className='flex items-center justify-between'>
                    <span className='text-sm text-gray-600'>
                      Assignments Completed
                    </span>
                    <span className='text-sm font-medium'>
                      {analyticsData.academic.assignmentsCompleted}
                    </span>
                  </div>
                  <div className='flex items-center justify-between'>
                    <span className='text-sm text-gray-600'>
                      Upcoming Deadlines
                    </span>
                    <span className='text-sm font-medium'>
                      {analyticsData.academic.upcomingDeadlines}
                    </span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value='network' className='space-y-6'>
          <div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
            <Card>
              <CardHeader>
                <CardTitle className='text-lg flex items-center gap-2'>
                  <Users className='h-5 w-5' />
                  Network Overview
                </CardTitle>
              </CardHeader>
              <CardContent className='space-y-4'>
                <div className='grid grid-cols-2 gap-4'>
                  <div className='text-center p-3 bg-blue-50 rounded-lg'>
                    <div className='text-2xl font-bold text-blue-600'>
                      {analyticsData.network.totalConnections}
                    </div>
                    <div className='text-xs text-gray-600'>
                      Total Connections
                    </div>
                  </div>
                  <div className='text-center p-3 bg-green-50 rounded-lg'>
                    <div className='text-2xl font-bold text-green-600'>
                      {analyticsData.network.newConnections}
                    </div>
                    <div className='text-xs text-gray-600'>New This Month</div>
                  </div>
                  <div className='text-center p-3 bg-purple-50 rounded-lg'>
                    <div className='text-2xl font-bold text-purple-600'>
                      {analyticsData.network.professors}
                    </div>
                    <div className='text-xs text-gray-600'>Professors</div>
                  </div>
                  <div className='text-center p-3 bg-orange-50 rounded-lg'>
                    <div className='text-2xl font-bold text-orange-600'>
                      {analyticsData.network.students}
                    </div>
                    <div className='text-xs text-gray-600'>Students</div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className='text-lg flex items-center gap-2'>
                  <MessageSquare className='h-5 w-5' />
                  Communication
                </CardTitle>
              </CardHeader>
              <CardContent className='space-y-4'>
                <div className='space-y-3'>
                  <div className='flex items-center justify-between'>
                    <span className='text-sm text-gray-600'>Messages Sent</span>
                    <span className='text-sm font-medium'>
                      {analyticsData.network.messagesSent}
                    </span>
                  </div>
                  <div className='flex items-center justify-between'>
                    <span className='text-sm text-gray-600'>
                      Messages Received
                    </span>
                    <span className='text-sm font-medium'>
                      {analyticsData.network.messagesReceived}
                    </span>
                  </div>
                  <div className='flex items-center justify-between'>
                    <span className='text-sm text-gray-600'>
                      Pending Requests
                    </span>
                    <span className='text-sm font-medium'>
                      {analyticsData.network.pendingRequests}
                    </span>
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

export default Analytics;
