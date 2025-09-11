import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import {
  Eye,
  Users,
  TrendingUp,
  MessageSquare,
  Heart,
  Share2,
  Calendar,
  MapPin,
  Clock,
  BarChart3,
  Activity,
  Target,
  Award,
  Globe,
  UserPlus,
  BookOpen,
  Briefcase,
} from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';

interface ProfileAnalyticsProps {
  userId: string;
  compact?: boolean;
}

interface AnalyticsData {
  profileViews: {
    total: number;
    thisWeek: number;
    thisMonth: number;
    trend: 'up' | 'down' | 'stable';
    change: number;
  };
  connections: {
    total: number;
    newThisWeek: number;
    newThisMonth: number;
    trend: 'up' | 'down' | 'stable';
    change: number;
  };
  engagement: {
    likes: number;
    comments: number;
    shares: number;
    messages: number;
  };
  demographics: {
    topCountries: Array<{ country: string; count: number; percentage: number }>;
    topUniversities: Array<{
      university: string;
      count: number;
      percentage: number;
    }>;
    topFields: Array<{ field: string; count: number; percentage: number }>;
  };
  activity: Array<{
    date: string;
    views: number;
    connections: number;
    engagement: number;
  }>;
  achievements: Array<{
    id: string;
    title: string;
    description: string;
    icon: React.ReactNode;
    unlocked: boolean;
    unlockedAt?: string;
  }>;
}

export const ProfileAnalytics: React.FC<ProfileAnalyticsProps> = ({
  userId,
  compact = false,
}) => {
  const { user } = useAuth();
  const [analyticsData, setAnalyticsData] = useState<AnalyticsData | null>(
    null
  );
  const [loading, setLoading] = useState(true);
  const [timeRange, setTimeRange] = useState<'7d' | '30d' | '90d' | '1y'>(
    '30d'
  );

  useEffect(() => {
    fetchAnalyticsData();
  }, [userId, timeRange]);

  const fetchAnalyticsData = async () => {
    setLoading(true);
    try {
      // Simulate API call - replace with actual API call
      await new Promise((resolve) => setTimeout(resolve, 1000));

      // Mock data - replace with real data from API
      const mockData: AnalyticsData = {
        profileViews: {
          total: 1247,
          thisWeek: 89,
          thisMonth: 342,
          trend: 'up',
          change: 12.5,
        },
        connections: {
          total: 156,
          newThisWeek: 8,
          newThisMonth: 23,
          trend: 'up',
          change: 8.3,
        },
        engagement: {
          likes: 89,
          comments: 34,
          shares: 12,
          messages: 67,
        },
        demographics: {
          topCountries: [
            { country: 'United States', count: 45, percentage: 28.8 },
            { country: 'United Kingdom', count: 23, percentage: 14.7 },
            { country: 'Canada', count: 18, percentage: 11.5 },
            { country: 'Germany', count: 15, percentage: 9.6 },
            { country: 'Australia', count: 12, percentage: 7.7 },
          ],
          topUniversities: [
            { university: 'MIT', count: 8, percentage: 5.1 },
            { university: 'Stanford', count: 7, percentage: 4.5 },
            { university: 'Harvard', count: 6, percentage: 3.8 },
            { university: 'Oxford', count: 5, percentage: 3.2 },
            { university: 'Cambridge', count: 4, percentage: 2.6 },
          ],
          topFields: [
            { field: 'Computer Science', count: 34, percentage: 21.8 },
            { field: 'Engineering', count: 28, percentage: 17.9 },
            { field: 'Business', count: 22, percentage: 14.1 },
            { field: 'Medicine', count: 18, percentage: 11.5 },
            { field: 'Mathematics', count: 15, percentage: 9.6 },
          ],
        },
        activity: [
          { date: '2024-01-01', views: 45, connections: 3, engagement: 12 },
          { date: '2024-01-02', views: 52, connections: 2, engagement: 15 },
          { date: '2024-01-03', views: 38, connections: 4, engagement: 8 },
          { date: '2024-01-04', views: 61, connections: 1, engagement: 18 },
          { date: '2024-01-05', views: 47, connections: 3, engagement: 14 },
          { date: '2024-01-06', views: 55, connections: 2, engagement: 16 },
          { date: '2024-01-07', views: 43, connections: 5, engagement: 11 },
        ],
        achievements: [
          {
            id: 'first_connection',
            title: 'First Connection',
            description: 'Made your first connection',
            icon: <UserPlus className='w-4 h-4' />,
            unlocked: true,
            unlockedAt: '2024-01-15',
          },
          {
            id: 'profile_views_100',
            title: 'Profile Popular',
            description: 'Reached 100 profile views',
            icon: <Eye className='w-4 h-4' />,
            unlocked: true,
            unlockedAt: '2024-01-20',
          },
          {
            id: 'connections_50',
            title: 'Network Builder',
            description: 'Reached 50 connections',
            icon: <Users className='w-4 h-4' />,
            unlocked: true,
            unlockedAt: '2024-02-01',
          },
          {
            id: 'profile_views_1000',
            title: 'Profile Star',
            description: 'Reached 1000 profile views',
            icon: <Award className='w-4 h-4' />,
            unlocked: false,
          },
          {
            id: 'connections_100',
            title: 'Network Master',
            description: 'Reached 100 connections',
            icon: <Target className='w-4 h-4' />,
            unlocked: false,
          },
        ],
      };

      setAnalyticsData(mockData);
    } catch (error) {
      console.error('Error fetching analytics data:', error);
    } finally {
      setLoading(false);
    }
  };

  const getTrendIcon = (trend: 'up' | 'down' | 'stable') => {
    switch (trend) {
      case 'up':
        return <TrendingUp className='w-4 h-4 text-green-600' />;
      case 'down':
        return <TrendingUp className='w-4 h-4 text-red-600 rotate-180' />;
      default:
        return <Activity className='w-4 h-4 text-gray-600' />;
    }
  };

  const getTrendColor = (trend: 'up' | 'down' | 'stable') => {
    switch (trend) {
      case 'up':
        return 'text-green-600';
      case 'down':
        return 'text-red-600';
      default:
        return 'text-gray-600';
    }
  };

  if (loading) {
    return (
      <div className='space-y-4'>
        <div className='animate-pulse'>
          <div className='h-4 bg-gray-200 rounded w-1/4 mb-4'></div>
          <div className='grid grid-cols-1 md:grid-cols-3 gap-4'>
            {[1, 2, 3].map((i) => (
              <div key={i} className='h-24 bg-gray-200 rounded'></div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  if (!analyticsData) {
    return (
      <Card>
        <CardContent className='p-6 text-center'>
          <p className='text-muted-foreground'>No analytics data available</p>
        </CardContent>
      </Card>
    );
  }

  if (compact) {
    return (
      <div className='space-y-4'>
        <div className='grid grid-cols-2 gap-4'>
          <Card>
            <CardContent className='p-4'>
              <div className='flex items-center gap-2 mb-2'>
                <Eye className='w-4 h-4 text-blue-600' />
                <span className='text-sm font-medium'>Profile Views</span>
              </div>
              <div className='text-2xl font-bold'>
                {analyticsData.profileViews.total}
              </div>
              <div
                className={`text-xs flex items-center gap-1 ${getTrendColor(
                  analyticsData.profileViews.trend
                )}`}
              >
                {getTrendIcon(analyticsData.profileViews.trend)}
                {analyticsData.profileViews.change}%
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className='p-4'>
              <div className='flex items-center gap-2 mb-2'>
                <Users className='w-4 h-4 text-green-600' />
                <span className='text-sm font-medium'>Connections</span>
              </div>
              <div className='text-2xl font-bold'>
                {analyticsData.connections.total}
              </div>
              <div
                className={`text-xs flex items-center gap-1 ${getTrendColor(
                  analyticsData.connections.trend
                )}`}
              >
                {getTrendIcon(analyticsData.connections.trend)}
                {analyticsData.connections.change}%
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    );
  }

  return (
    <div className='space-y-6'>
      {/* Time Range Selector */}
      <div className='flex justify-between items-center'>
        <h3 className='text-lg font-semibold'>Profile Analytics</h3>
        <div className='flex gap-2'>
          {(['7d', '30d', '90d', '1y'] as const).map((range) => (
            <Button
              key={range}
              variant={timeRange === range ? 'default' : 'outline'}
              size='sm'
              onClick={() => setTimeRange(range)}
            >
              {range}
            </Button>
          ))}
        </div>
      </div>

      {/* Key Metrics */}
      <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4'>
        <Card>
          <CardContent className='p-6'>
            <div className='flex items-center gap-3'>
              <div className='p-2 bg-blue-100 rounded-lg'>
                <Eye className='w-5 h-5 text-blue-600' />
              </div>
              <div>
                <p className='text-sm text-muted-foreground'>Profile Views</p>
                <p className='text-2xl font-bold'>
                  {analyticsData.profileViews.total}
                </p>
                <div
                  className={`text-xs flex items-center gap-1 ${getTrendColor(
                    analyticsData.profileViews.trend
                  )}`}
                >
                  {getTrendIcon(analyticsData.profileViews.trend)}
                  {analyticsData.profileViews.change}% this month
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className='p-6'>
            <div className='flex items-center gap-3'>
              <div className='p-2 bg-green-100 rounded-lg'>
                <Users className='w-5 h-5 text-green-600' />
              </div>
              <div>
                <p className='text-sm text-muted-foreground'>Connections</p>
                <p className='text-2xl font-bold'>
                  {analyticsData.connections.total}
                </p>
                <div
                  className={`text-xs flex items-center gap-1 ${getTrendColor(
                    analyticsData.connections.trend
                  )}`}
                >
                  {getTrendIcon(analyticsData.connections.trend)}
                  {analyticsData.connections.change}% this month
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className='p-6'>
            <div className='flex items-center gap-3'>
              <div className='p-2 bg-purple-100 rounded-lg'>
                <Heart className='w-5 h-5 text-purple-600' />
              </div>
              <div>
                <p className='text-sm text-muted-foreground'>Engagement</p>
                <p className='text-2xl font-bold'>
                  {analyticsData.engagement.likes +
                    analyticsData.engagement.comments}
                </p>
                <p className='text-xs text-muted-foreground'>
                  likes & comments
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className='p-6'>
            <div className='flex items-center gap-3'>
              <div className='p-2 bg-orange-100 rounded-lg'>
                <MessageSquare className='w-5 h-5 text-orange-600' />
              </div>
              <div>
                <p className='text-sm text-muted-foreground'>Messages</p>
                <p className='text-2xl font-bold'>
                  {analyticsData.engagement.messages}
                </p>
                <p className='text-xs text-muted-foreground'>conversations</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Detailed Analytics */}
      <Tabs defaultValue='demographics' className='space-y-4'>
        <TabsList>
          <TabsTrigger value='demographics'>Demographics</TabsTrigger>
          <TabsTrigger value='activity'>Activity</TabsTrigger>
          <TabsTrigger value='achievements'>Achievements</TabsTrigger>
        </TabsList>

        <TabsContent value='demographics' className='space-y-4'>
          <div className='grid grid-cols-1 lg:grid-cols-3 gap-4'>
            {/* Top Countries */}
            <Card>
              <CardHeader>
                <CardTitle className='flex items-center gap-2'>
                  <Globe className='w-4 h-4' />
                  Top Countries
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className='space-y-3'>
                  {analyticsData.demographics.topCountries.map(
                    (country, index) => (
                      <div
                        key={country.country}
                        className='flex items-center justify-between'
                      >
                        <div className='flex items-center gap-2'>
                          <span className='text-sm font-medium'>
                            {country.country}
                          </span>
                        </div>
                        <div className='flex items-center gap-2'>
                          <div className='w-16 bg-gray-200 rounded-full h-2'>
                            <div
                              className='bg-blue-600 h-2 rounded-full'
                              style={{ width: `${country.percentage}%` }}
                            ></div>
                          </div>
                          <span className='text-sm text-muted-foreground w-8'>
                            {country.count}
                          </span>
                        </div>
                      </div>
                    )
                  )}
                </div>
              </CardContent>
            </Card>

            {/* Top Universities */}
            <Card>
              <CardHeader>
                <CardTitle className='flex items-center gap-2'>
                  <BookOpen className='w-4 h-4' />
                  Top Universities
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className='space-y-3'>
                  {analyticsData.demographics.topUniversities.map(
                    (university, index) => (
                      <div
                        key={university.university}
                        className='flex items-center justify-between'
                      >
                        <div className='flex items-center gap-2'>
                          <span className='text-sm font-medium'>
                            {university.university}
                          </span>
                        </div>
                        <div className='flex items-center gap-2'>
                          <div className='w-16 bg-gray-200 rounded-full h-2'>
                            <div
                              className='bg-green-600 h-2 rounded-full'
                              style={{ width: `${university.percentage}%` }}
                            ></div>
                          </div>
                          <span className='text-sm text-muted-foreground w-8'>
                            {university.count}
                          </span>
                        </div>
                      </div>
                    )
                  )}
                </div>
              </CardContent>
            </Card>

            {/* Top Fields */}
            <Card>
              <CardHeader>
                <CardTitle className='flex items-center gap-2'>
                  <Briefcase className='w-4 h-4' />
                  Top Fields
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className='space-y-3'>
                  {analyticsData.demographics.topFields.map((field, index) => (
                    <div
                      key={field.field}
                      className='flex items-center justify-between'
                    >
                      <div className='flex items-center gap-2'>
                        <span className='text-sm font-medium'>
                          {field.field}
                        </span>
                      </div>
                      <div className='flex items-center gap-2'>
                        <div className='w-16 bg-gray-200 rounded-full h-2'>
                          <div
                            className='bg-purple-600 h-2 rounded-full'
                            style={{ width: `${field.percentage}%` }}
                          ></div>
                        </div>
                        <span className='text-sm text-muted-foreground w-8'>
                          {field.count}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value='activity' className='space-y-4'>
          <Card>
            <CardHeader>
              <CardTitle>Recent Activity</CardTitle>
            </CardHeader>
            <CardContent>
              <div className='space-y-4'>
                {analyticsData.activity.map((day, index) => (
                  <div
                    key={day.date}
                    className='flex items-center justify-between p-3 border rounded-lg'
                  >
                    <div className='flex items-center gap-3'>
                      <Calendar className='w-4 h-4 text-muted-foreground' />
                      <span className='text-sm font-medium'>
                        {new Date(day.date).toLocaleDateString()}
                      </span>
                    </div>
                    <div className='flex items-center gap-6'>
                      <div className='text-center'>
                        <div className='text-sm font-medium'>{day.views}</div>
                        <div className='text-xs text-muted-foreground'>
                          Views
                        </div>
                      </div>
                      <div className='text-center'>
                        <div className='text-sm font-medium'>
                          {day.connections}
                        </div>
                        <div className='text-xs text-muted-foreground'>
                          Connections
                        </div>
                      </div>
                      <div className='text-center'>
                        <div className='text-sm font-medium'>
                          {day.engagement}
                        </div>
                        <div className='text-xs text-muted-foreground'>
                          Engagement
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value='achievements' className='space-y-4'>
          <Card>
            <CardHeader>
              <CardTitle>Achievements</CardTitle>
            </CardHeader>
            <CardContent>
              <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
                {analyticsData.achievements.map((achievement) => (
                  <div
                    key={achievement.id}
                    className={`p-4 border rounded-lg ${
                      achievement.unlocked
                        ? 'bg-green-50 border-green-200'
                        : 'bg-gray-50 border-gray-200'
                    }`}
                  >
                    <div className='flex items-center gap-3'>
                      <div
                        className={`p-2 rounded-lg ${
                          achievement.unlocked
                            ? 'bg-green-100 text-green-600'
                            : 'bg-gray-100 text-gray-400'
                        }`}
                      >
                        {achievement.icon}
                      </div>
                      <div className='flex-1'>
                        <h4 className='font-medium'>{achievement.title}</h4>
                        <p className='text-sm text-muted-foreground'>
                          {achievement.description}
                        </p>
                        {achievement.unlocked && achievement.unlockedAt && (
                          <p className='text-xs text-green-600 mt-1'>
                            Unlocked{' '}
                            {new Date(
                              achievement.unlockedAt
                            ).toLocaleDateString()}
                          </p>
                        )}
                      </div>
                      {achievement.unlocked ? (
                        <Badge className='bg-green-100 text-green-800'>
                          Unlocked
                        </Badge>
                      ) : (
                        <Badge variant='outline'>Locked</Badge>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};
