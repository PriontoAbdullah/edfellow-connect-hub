import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import {
  BarChart3,
  TrendingUp,
  TrendingDown,
  Users,
  GraduationCap,
  Award,
  DollarSign,
  Calendar,
  Eye,
  MousePointer,
  Share,
  Mail,
  Globe,
  MapPin,
  Building2,
  Target,
  Star,
  CheckCircle,
  AlertCircle,
  Clock,
  ArrowUpRight,
  ArrowDownRight,
  Minus,
} from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';
import { useToast } from '@/hooks/use-toast';
import {
  getUniversityPrograms,
  getScholarships,
  getProgramApplications,
  getScholarshipApplications,
  getProgramAnalytics,
  getScholarshipAnalytics,
  type UniversityProgram,
  type Scholarship,
  type ProgramApplication,
  type ScholarshipApplication,
} from '@/lib/api/university';

interface UniversityAnalyticsProps {
  compact?: boolean;
  timeRange?: '7d' | '30d' | '90d' | '1y';
}

interface AnalyticsData {
  programs: {
    total: number;
    active: number;
    featured: number;
    applications: number;
    conversionRate: number;
  };
  scholarships: {
    total: number;
    active: number;
    featured: number;
    applications: number;
    totalValue: number;
    recipients: number;
  };
  engagement: {
    totalViews: number;
    totalClicks: number;
    clickThroughRate: number;
    socialShares: number;
    emailOpens: number;
  };
  demographics: {
    topCountries: Array<{ country: string; count: number }>;
    topPrograms: Array<{ program: string; applications: number }>;
    topScholarships: Array<{ scholarship: string; applications: number }>;
  };
  trends: {
    applicationsOverTime: Array<{ date: string; count: number }>;
    viewsOverTime: Array<{ date: string; count: number }>;
  };
}

export const UniversityAnalytics: React.FC<UniversityAnalyticsProps> = ({
  compact = false,
  timeRange = '30d',
}) => {
  const { user } = useAuth();
  const { toast } = useToast();
  const [analyticsData, setAnalyticsData] = useState<AnalyticsData | null>(
    null
  );
  const [loading, setLoading] = useState(true);
  const [selectedTimeRange, setSelectedTimeRange] = useState<
    '7d' | '30d' | '90d' | '1y'
  >(timeRange);
  const [selectedMetric, setSelectedMetric] = useState<
    'programs' | 'scholarships' | 'engagement'
  >('programs');

  useEffect(() => {
    fetchAnalytics();
  }, [selectedTimeRange]);

  const fetchAnalytics = async () => {
    if (!user) return;

    setLoading(true);
    try {
      // Fetch all data in parallel
      const [
        programsResult,
        scholarshipsResult,
        applicationsResult,
        scholarshipAppsResult,
      ] = await Promise.all([
        getUniversityPrograms({ university_id: user.id }),
        getScholarships({ university_id: user.id }),
        getProgramApplications(),
        getScholarshipApplications(),
      ]);

      if (
        programsResult.error ||
        scholarshipsResult.error ||
        applicationsResult.error ||
        scholarshipAppsResult.error
      ) {
        toast({
          title: 'Error',
          description: 'Failed to fetch analytics data',
          variant: 'destructive',
        });
        return;
      }

      const programs = programsResult.data || [];
      const scholarships = scholarshipsResult.data || [];
      const applications = applicationsResult.data || [];
      const scholarshipApplications = scholarshipAppsResult.data || [];

      // Calculate analytics
      const analytics: AnalyticsData = {
        programs: {
          total: programs.length,
          active: programs.filter((p) => p.is_active).length,
          featured: programs.filter((p) => p.is_featured).length,
          applications: applications.length,
          conversionRate:
            programs.length > 0
              ? (applications.length / programs.length) * 100
              : 0,
        },
        scholarships: {
          total: scholarships.length,
          active: scholarships.filter((s) => s.is_active).length,
          featured: scholarships.filter((s) => s.is_featured).length,
          applications: scholarshipApplications.length,
          totalValue: scholarships.reduce((sum, s) => sum + s.amount, 0),
          recipients: scholarships.reduce(
            (sum, s) => sum + s.current_recipients,
            0
          ),
        },
        engagement: {
          totalViews: Math.floor(Math.random() * 10000) + 5000, // Mock data
          totalClicks: Math.floor(Math.random() * 1000) + 500,
          clickThroughRate: Math.random() * 10 + 5,
          socialShares: Math.floor(Math.random() * 500) + 100,
          emailOpens: Math.floor(Math.random() * 2000) + 1000,
        },
        demographics: {
          topCountries: [
            { country: 'United States', count: 45 },
            { country: 'Canada', count: 23 },
            { country: 'United Kingdom', count: 18 },
            { country: 'Germany', count: 12 },
            { country: 'Australia', count: 8 },
          ],
          topPrograms: programs.slice(0, 5).map((p) => ({
            program: p.title,
            applications: Math.floor(Math.random() * 50) + 10,
          })),
          topScholarships: scholarships.slice(0, 5).map((s) => ({
            scholarship: s.title,
            applications: Math.floor(Math.random() * 100) + 20,
          })),
        },
        trends: {
          applicationsOverTime: generateTimeSeriesData(
            selectedTimeRange,
            'applications'
          ),
          viewsOverTime: generateTimeSeriesData(selectedTimeRange, 'views'),
        },
      };

      setAnalyticsData(analytics);
    } catch (error) {
      console.error('Error fetching analytics:', error);
      toast({
        title: 'Error',
        description: 'Failed to fetch analytics data',
        variant: 'destructive',
      });
    } finally {
      setLoading(false);
    }
  };

  const generateTimeSeriesData = (
    range: string,
    type: 'applications' | 'views'
  ) => {
    const days =
      range === '7d' ? 7 : range === '30d' ? 30 : range === '90d' ? 90 : 365;
    const data = [];

    for (let i = days - 1; i >= 0; i--) {
      const date = new Date();
      date.setDate(date.getDate() - i);

      const baseValue = type === 'applications' ? 10 : 100;
      const variation = Math.random() * 20 - 10;
      const count = Math.max(0, Math.floor(baseValue + variation));

      data.push({
        date: date.toISOString().split('T')[0],
        count,
      });
    }

    return data;
  };

  const formatNumber = (num: number) => {
    if (num >= 1000000) {
      return (num / 1000000).toFixed(1) + 'M';
    } else if (num >= 1000) {
      return (num / 1000).toFixed(1) + 'K';
    }
    return num.toString();
  };

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
    }).format(amount);
  };

  const getTrendIcon = (current: number, previous: number) => {
    if (current > previous) {
      return <ArrowUpRight className='w-4 h-4 text-green-600' />;
    } else if (current < previous) {
      return <ArrowDownRight className='w-4 h-4 text-red-600' />;
    }
    return <Minus className='w-4 h-4 text-gray-600' />;
  };

  const getTrendColor = (current: number, previous: number) => {
    if (current > previous) {
      return 'text-green-600';
    } else if (current < previous) {
      return 'text-red-600';
    }
    return 'text-gray-600';
  };

  if (loading) {
    return (
      <div className='space-y-4'>
        <div className='animate-pulse'>
          <div className='h-4 bg-gray-200 rounded w-1/4 mb-4'></div>
          <div className='grid grid-cols-1 md:grid-cols-3 gap-4'>
            {[1, 2, 3, 4, 5, 6].map((i) => (
              <div key={i} className='h-32 bg-gray-200 rounded'></div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  if (!analyticsData) {
    return (
      <div className='text-center py-8'>
        <AlertCircle className='w-12 h-12 text-muted-foreground mx-auto mb-4' />
        <h3 className='text-lg font-medium mb-2'>
          No analytics data available
        </h3>
        <p className='text-muted-foreground'>
          Analytics data will appear here once you have programs and
          scholarships
        </p>
      </div>
    );
  }

  if (compact) {
    return (
      <div className='space-y-4'>
        <div className='flex items-center justify-between'>
          <h3 className='text-sm font-medium'>Analytics</h3>
          <Badge variant='outline'>
            {analyticsData.programs.total + analyticsData.scholarships.total}
          </Badge>
        </div>

        <div className='grid grid-cols-2 gap-4'>
          <div className='p-3 border rounded-lg'>
            <div className='flex items-center gap-2 mb-1'>
              <GraduationCap className='w-4 h-4 text-blue-600' />
              <span className='text-sm font-medium'>Programs</span>
            </div>
            <div className='text-2xl font-bold'>
              {analyticsData.programs.total}
            </div>
            <div className='text-xs text-muted-foreground'>
              {analyticsData.programs.applications} applications
            </div>
          </div>

          <div className='p-3 border rounded-lg'>
            <div className='flex items-center gap-2 mb-1'>
              <Award className='w-4 h-4 text-green-600' />
              <span className='text-sm font-medium'>Scholarships</span>
            </div>
            <div className='text-2xl font-bold'>
              {analyticsData.scholarships.total}
            </div>
            <div className='text-xs text-muted-foreground'>
              {formatCurrency(analyticsData.scholarships.totalValue)}
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className='space-y-6'>
      {/* Header */}
      <div className='flex items-center justify-between'>
        <div>
          <h3 className='text-lg font-semibold'>University Analytics</h3>
          <p className='text-sm text-muted-foreground'>
            Track performance and engagement metrics
          </p>
        </div>

        <div className='flex gap-2'>
          {(['7d', '30d', '90d', '1y'] as const).map((range) => (
            <Button
              key={range}
              variant={selectedTimeRange === range ? 'default' : 'outline'}
              size='sm'
              onClick={() => setSelectedTimeRange(range)}
            >
              {range}
            </Button>
          ))}
        </div>
      </div>

      {/* Metric Tabs */}
      <div className='flex gap-2'>
        {(['programs', 'scholarships', 'engagement'] as const).map((metric) => (
          <Button
            key={metric}
            variant={selectedMetric === metric ? 'default' : 'outline'}
            size='sm'
            onClick={() => setSelectedMetric(metric)}
          >
            {metric === 'programs' && (
              <GraduationCap className='w-4 h-4 mr-1' />
            )}
            {metric === 'scholarships' && <Award className='w-4 h-4 mr-1' />}
            {metric === 'engagement' && <BarChart3 className='w-4 h-4 mr-1' />}
            <span className='capitalize'>{metric}</span>
          </Button>
        ))}
      </div>

      {/* Programs Analytics */}
      {selectedMetric === 'programs' && (
        <div className='space-y-6'>
          {/* Key Metrics */}
          <div className='grid grid-cols-2 md:grid-cols-4 gap-4'>
            <Card>
              <CardContent className='p-4 text-center'>
                <div className='flex items-center justify-center mb-2'>
                  <GraduationCap className='w-6 h-6 text-blue-600' />
                </div>
                <div className='text-2xl font-bold text-blue-600'>
                  {analyticsData.programs.total}
                </div>
                <div className='text-xs text-muted-foreground'>
                  Total Programs
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className='p-4 text-center'>
                <div className='flex items-center justify-center mb-2'>
                  <CheckCircle className='w-6 h-6 text-green-600' />
                </div>
                <div className='text-2xl font-bold text-green-600'>
                  {analyticsData.programs.active}
                </div>
                <div className='text-xs text-muted-foreground'>
                  Active Programs
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className='p-4 text-center'>
                <div className='flex items-center justify-center mb-2'>
                  <Star className='w-6 h-6 text-yellow-600' />
                </div>
                <div className='text-2xl font-bold text-yellow-600'>
                  {analyticsData.programs.featured}
                </div>
                <div className='text-xs text-muted-foreground'>
                  Featured Programs
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className='p-4 text-center'>
                <div className='flex items-center justify-center mb-2'>
                  <Users className='w-6 h-6 text-purple-600' />
                </div>
                <div className='text-2xl font-bold text-purple-600'>
                  {analyticsData.programs.applications}
                </div>
                <div className='text-xs text-muted-foreground'>
                  Total Applications
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Top Programs */}
          <Card>
            <CardHeader>
              <CardTitle>Top Programs by Applications</CardTitle>
            </CardHeader>
            <CardContent>
              <div className='space-y-3'>
                {analyticsData.demographics.topPrograms.map(
                  (program, index) => (
                    <div
                      key={index}
                      className='flex items-center justify-between'
                    >
                      <div className='flex items-center gap-3'>
                        <div className='w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center'>
                          <span className='text-sm font-medium text-blue-600'>
                            {index + 1}
                          </span>
                        </div>
                        <div>
                          <p className='font-medium'>{program.program}</p>
                          <p className='text-sm text-muted-foreground'>
                            {program.applications} applications
                          </p>
                        </div>
                      </div>
                      <Badge variant='outline'>{program.applications}</Badge>
                    </div>
                  )
                )}
              </div>
            </CardContent>
          </Card>
        </div>
      )}

      {/* Scholarships Analytics */}
      {selectedMetric === 'scholarships' && (
        <div className='space-y-6'>
          {/* Key Metrics */}
          <div className='grid grid-cols-2 md:grid-cols-4 gap-4'>
            <Card>
              <CardContent className='p-4 text-center'>
                <div className='flex items-center justify-center mb-2'>
                  <Award className='w-6 h-6 text-green-600' />
                </div>
                <div className='text-2xl font-bold text-green-600'>
                  {analyticsData.scholarships.total}
                </div>
                <div className='text-xs text-muted-foreground'>
                  Total Scholarships
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className='p-4 text-center'>
                <div className='flex items-center justify-center mb-2'>
                  <CheckCircle className='w-6 h-6 text-blue-600' />
                </div>
                <div className='text-2xl font-bold text-blue-600'>
                  {analyticsData.scholarships.active}
                </div>
                <div className='text-xs text-muted-foreground'>
                  Active Scholarships
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className='p-4 text-center'>
                <div className='flex items-center justify-center mb-2'>
                  <DollarSign className='w-6 h-6 text-purple-600' />
                </div>
                <div className='text-2xl font-bold text-purple-600'>
                  {formatCurrency(analyticsData.scholarships.totalValue)}
                </div>
                <div className='text-xs text-muted-foreground'>Total Value</div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className='p-4 text-center'>
                <div className='flex items-center justify-center mb-2'>
                  <Users className='w-6 h-6 text-orange-600' />
                </div>
                <div className='text-2xl font-bold text-orange-600'>
                  {analyticsData.scholarships.recipients}
                </div>
                <div className='text-xs text-muted-foreground'>Recipients</div>
              </CardContent>
            </Card>
          </div>

          {/* Top Scholarships */}
          <Card>
            <CardHeader>
              <CardTitle>Top Scholarships by Applications</CardTitle>
            </CardHeader>
            <CardContent>
              <div className='space-y-3'>
                {analyticsData.demographics.topScholarships.map(
                  (scholarship, index) => (
                    <div
                      key={index}
                      className='flex items-center justify-between'
                    >
                      <div className='flex items-center gap-3'>
                        <div className='w-8 h-8 bg-green-100 rounded-lg flex items-center justify-center'>
                          <span className='text-sm font-medium text-green-600'>
                            {index + 1}
                          </span>
                        </div>
                        <div>
                          <p className='font-medium'>
                            {scholarship.scholarship}
                          </p>
                          <p className='text-sm text-muted-foreground'>
                            {scholarship.applications} applications
                          </p>
                        </div>
                      </div>
                      <Badge variant='outline'>
                        {scholarship.applications}
                      </Badge>
                    </div>
                  )
                )}
              </div>
            </CardContent>
          </Card>
        </div>
      )}

      {/* Engagement Analytics */}
      {selectedMetric === 'engagement' && (
        <div className='space-y-6'>
          {/* Key Metrics */}
          <div className='grid grid-cols-2 md:grid-cols-4 gap-4'>
            <Card>
              <CardContent className='p-4 text-center'>
                <div className='flex items-center justify-center mb-2'>
                  <Eye className='w-6 h-6 text-blue-600' />
                </div>
                <div className='text-2xl font-bold text-blue-600'>
                  {formatNumber(analyticsData.engagement.totalViews)}
                </div>
                <div className='text-xs text-muted-foreground'>Total Views</div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className='p-4 text-center'>
                <div className='flex items-center justify-center mb-2'>
                  <MousePointer className='w-6 h-6 text-green-600' />
                </div>
                <div className='text-2xl font-bold text-green-600'>
                  {formatNumber(analyticsData.engagement.totalClicks)}
                </div>
                <div className='text-xs text-muted-foreground'>
                  Total Clicks
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className='p-4 text-center'>
                <div className='flex items-center justify-center mb-2'>
                  <TrendingUp className='w-6 h-6 text-purple-600' />
                </div>
                <div className='text-2xl font-bold text-purple-600'>
                  {analyticsData.engagement.clickThroughRate.toFixed(1)}%
                </div>
                <div className='text-xs text-muted-foreground'>
                  Click-through Rate
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className='p-4 text-center'>
                <div className='flex items-center justify-center mb-2'>
                  <Share className='w-6 h-6 text-orange-600' />
                </div>
                <div className='text-2xl font-bold text-orange-600'>
                  {formatNumber(analyticsData.engagement.socialShares)}
                </div>
                <div className='text-xs text-muted-foreground'>
                  Social Shares
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Top Countries */}
          <Card>
            <CardHeader>
              <CardTitle>Top Countries by Engagement</CardTitle>
            </CardHeader>
            <CardContent>
              <div className='space-y-3'>
                {analyticsData.demographics.topCountries.map(
                  (country, index) => (
                    <div
                      key={index}
                      className='flex items-center justify-between'
                    >
                      <div className='flex items-center gap-3'>
                        <div className='w-8 h-8 bg-gray-100 rounded-lg flex items-center justify-center'>
                          <span className='text-sm font-medium text-gray-600'>
                            {index + 1}
                          </span>
                        </div>
                        <div>
                          <p className='font-medium'>{country.country}</p>
                          <p className='text-sm text-muted-foreground'>
                            {country.count}% of traffic
                          </p>
                        </div>
                      </div>
                      <Badge variant='outline'>{country.count}%</Badge>
                    </div>
                  )
                )}
              </div>
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  );
};
