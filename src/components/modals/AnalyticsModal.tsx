import { useState } from 'react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import {
  BarChart3,
  TrendingUp,
  Users,
  Globe,
  Calendar,
  DollarSign,
  Eye,
  Download,
  Share2,
  Filter,
  RefreshCw,
  X,
  PieChart,
  Activity,
  Target,
  Award,
} from 'lucide-react';

interface AnalyticsModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  programId?: number;
  programName?: string;
}

const AnalyticsModal = ({
  open,
  onOpenChange,
  programId,
  programName,
}: AnalyticsModalProps) => {
  const [activeTab, setActiveTab] = useState('overview');
  const [dateRange, setDateRange] = useState('30d');

  const analyticsData = {
    overview: {
      totalApplications: 2480,
      programViews: 11310,
      websiteVisits: 45670,
      conversionRate: 5.4,
      revenue: 125000,
      avgResponseTime: '2.3h',
    },
    applications: {
      byMonth: [
        { month: 'Jan', count: 180 },
        { month: 'Feb', count: 220 },
        { month: 'Mar', count: 195 },
        { month: 'Apr', count: 240 },
        { month: 'May', count: 280 },
        { month: 'Jun', count: 320 },
      ],
      byCountry: [
        { country: 'China', count: 450, percentage: 18.1 },
        { country: 'India', count: 380, percentage: 15.3 },
        { country: 'United States', count: 320, percentage: 12.9 },
        { country: 'Nigeria', count: 280, percentage: 11.3 },
        { country: 'Brazil', count: 250, percentage: 10.1 },
      ],
      byProgram: [
        { program: 'Computer Science Masters', count: 1250, percentage: 50.4 },
        { program: 'Business Analytics PhD', count: 340, percentage: 13.7 },
        { program: 'Data Science Certificate', count: 890, percentage: 35.9 },
      ],
    },
    engagement: {
      pageViews: 45670,
      uniqueVisitors: 23450,
      avgSessionDuration: '4m 32s',
      bounceRate: 23.4,
      topPages: [
        { page: 'Program Overview', views: 12500 },
        { page: 'Admission Requirements', views: 8900 },
        { page: 'Tuition & Fees', views: 7600 },
        { page: 'Student Life', views: 5400 },
        { page: 'Career Services', views: 4200 },
      ],
    },
    conversions: {
      totalLeads: 2480,
      qualifiedLeads: 1890,
      enrolledStudents: 156,
      conversionFunnel: [
        { stage: 'Website Visit', count: 45670, rate: 100 },
        { stage: 'Program View', count: 11310, rate: 24.8 },
        { stage: 'Application Start', count: 3200, rate: 7.0 },
        { stage: 'Application Complete', count: 2480, rate: 5.4 },
        { stage: 'Enrolled', count: 156, rate: 0.34 },
      ],
    },
  };

  const handleExportData = () => {
    // Export functionality
  };

  const handleShareReport = () => {
    // Share functionality
  };

  const handleRefreshData = () => {
    // Refresh functionality
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className='max-w-7xl max-h-[90vh] overflow-y-auto'>
        <DialogHeader>
          <div className='flex items-center justify-between'>
            <div className='flex items-center gap-3'>
              <BarChart3 className='h-6 w-6 text-orange-600' />
              <div>
                <DialogTitle className='text-2xl font-bold'>
                  {programName
                    ? `${programName} Analytics`
                    : 'University Analytics Dashboard'}
                </DialogTitle>
                <p className='text-gray-600'>
                  Comprehensive performance metrics and insights
                </p>
              </div>
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
        </DialogHeader>

        <div className='space-y-6'>
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

          {/* Key Metrics */}
          <div className='grid grid-cols-2 md:grid-cols-4 gap-4'>
            <Card>
              <CardContent className='p-4'>
                <div className='flex items-center justify-between'>
                  <div>
                    <p className='text-sm text-gray-600'>Total Applications</p>
                    <p className='text-2xl font-bold text-blue-600'>
                      {analyticsData.overview.totalApplications.toLocaleString()}
                    </p>
                  </div>
                  <Users className='h-8 w-8 text-blue-600' />
                </div>
                <div className='flex items-center gap-1 mt-2'>
                  <TrendingUp className='h-3 w-3 text-green-600' />
                  <span className='text-xs text-green-600'>+12.5%</span>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className='p-4'>
                <div className='flex items-center justify-between'>
                  <div>
                    <p className='text-sm text-gray-600'>Program Views</p>
                    <p className='text-2xl font-bold text-green-600'>
                      {analyticsData.overview.programViews.toLocaleString()}
                    </p>
                  </div>
                  <Eye className='h-8 w-8 text-green-600' />
                </div>
                <div className='flex items-center gap-1 mt-2'>
                  <TrendingUp className='h-3 w-3 text-green-600' />
                  <span className='text-xs text-green-600'>+8.3%</span>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className='p-4'>
                <div className='flex items-center justify-between'>
                  <div>
                    <p className='text-sm text-gray-600'>Conversion Rate</p>
                    <p className='text-2xl font-bold text-purple-600'>
                      {analyticsData.overview.conversionRate}%
                    </p>
                  </div>
                  <Target className='h-8 w-8 text-purple-600' />
                </div>
                <div className='flex items-center gap-1 mt-2'>
                  <TrendingUp className='h-3 w-3 text-green-600' />
                  <span className='text-xs text-green-600'>+2.1%</span>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className='p-4'>
                <div className='flex items-center justify-between'>
                  <div>
                    <p className='text-sm text-gray-600'>Revenue</p>
                    <p className='text-2xl font-bold text-orange-600'>
                      ${analyticsData.overview.revenue.toLocaleString()}
                    </p>
                  </div>
                  <DollarSign className='h-8 w-8 text-orange-600' />
                </div>
                <div className='flex items-center gap-1 mt-2'>
                  <TrendingUp className='h-3 w-3 text-green-600' />
                  <span className='text-xs text-green-600'>+15.7%</span>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Detailed Analytics Tabs */}
          <Tabs value={activeTab} onValueChange={setActiveTab}>
            <TabsList className='grid w-full grid-cols-4'>
              <TabsTrigger value='overview'>Overview</TabsTrigger>
              <TabsTrigger value='applications'>Applications</TabsTrigger>
              <TabsTrigger value='engagement'>Engagement</TabsTrigger>
              <TabsTrigger value='conversions'>Conversions</TabsTrigger>
            </TabsList>

            <TabsContent value='overview' className='space-y-6'>
              <div className='grid md:grid-cols-2 gap-6'>
                <Card>
                  <CardHeader>
                    <CardTitle className='flex items-center gap-2'>
                      <BarChart3 className='h-5 w-5' />
                      Applications Trend
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className='h-64 flex items-center justify-center bg-gray-50 rounded'>
                      <div className='text-center'>
                        <BarChart3 className='h-12 w-12 text-gray-400 mx-auto mb-2' />
                        <p className='text-gray-500'>
                          Chart visualization would be here
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle className='flex items-center gap-2'>
                      <PieChart className='h-5 w-5' />
                      Applications by Country
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className='space-y-3'>
                      {analyticsData.applications.byCountry
                        .slice(0, 5)
                        .map((item, index) => (
                          <div
                            key={index}
                            className='flex items-center justify-between'
                          >
                            <div className='flex items-center gap-2'>
                              <div className='w-3 h-3 rounded-full bg-blue-500'></div>
                              <span className='text-sm'>{item.country}</span>
                            </div>
                            <div className='flex items-center gap-2'>
                              <span className='text-sm font-medium'>
                                {item.count}
                              </span>
                              <Badge variant='outline' className='text-xs'>
                                {item.percentage}%
                              </Badge>
                            </div>
                          </div>
                        ))}
                    </div>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>

            <TabsContent value='applications' className='space-y-6'>
              <div className='grid md:grid-cols-2 gap-6'>
                <Card>
                  <CardHeader>
                    <CardTitle>Applications by Program</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className='space-y-4'>
                      {analyticsData.applications.byProgram.map(
                        (program, index) => (
                          <div key={index} className='space-y-2'>
                            <div className='flex items-center justify-between'>
                              <span className='text-sm font-medium'>
                                {program.program}
                              </span>
                              <span className='text-sm text-gray-600'>
                                {program.count}
                              </span>
                            </div>
                            <div className='w-full bg-gray-200 rounded-full h-2'>
                              <div
                                className='bg-blue-600 h-2 rounded-full'
                                style={{ width: `${program.percentage}%` }}
                              ></div>
                            </div>
                            <span className='text-xs text-gray-500'>
                              {program.percentage}%
                            </span>
                          </div>
                        )
                      )}
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>Monthly Applications</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className='h-64 flex items-center justify-center bg-gray-50 rounded'>
                      <div className='text-center'>
                        <Activity className='h-12 w-12 text-gray-400 mx-auto mb-2' />
                        <p className='text-gray-500'>
                          Monthly trend chart would be here
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>

            <TabsContent value='engagement' className='space-y-6'>
              <div className='grid md:grid-cols-2 gap-6'>
                <Card>
                  <CardHeader>
                    <CardTitle>Website Engagement</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className='space-y-4'>
                      <div className='flex items-center justify-between'>
                        <span className='text-sm'>Page Views</span>
                        <span className='font-medium'>
                          {analyticsData.engagement.pageViews.toLocaleString()}
                        </span>
                      </div>
                      <div className='flex items-center justify-between'>
                        <span className='text-sm'>Unique Visitors</span>
                        <span className='font-medium'>
                          {analyticsData.engagement.uniqueVisitors.toLocaleString()}
                        </span>
                      </div>
                      <div className='flex items-center justify-between'>
                        <span className='text-sm'>Avg Session Duration</span>
                        <span className='font-medium'>
                          {analyticsData.engagement.avgSessionDuration}
                        </span>
                      </div>
                      <div className='flex items-center justify-between'>
                        <span className='text-sm'>Bounce Rate</span>
                        <span className='font-medium'>
                          {analyticsData.engagement.bounceRate}%
                        </span>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>Top Pages</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className='space-y-3'>
                      {analyticsData.engagement.topPages.map((page, index) => (
                        <div
                          key={index}
                          className='flex items-center justify-between'
                        >
                          <span className='text-sm'>{page.page}</span>
                          <span className='text-sm font-medium'>
                            {page.views.toLocaleString()}
                          </span>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>

            <TabsContent value='conversions' className='space-y-6'>
              <Card>
                <CardHeader>
                  <CardTitle>Conversion Funnel</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className='space-y-4'>
                    {analyticsData.conversions.conversionFunnel.map(
                      (stage, index) => (
                        <div key={index} className='space-y-2'>
                          <div className='flex items-center justify-between'>
                            <span className='text-sm font-medium'>
                              {stage.stage}
                            </span>
                            <div className='flex items-center gap-2'>
                              <span className='text-sm'>
                                {stage.count.toLocaleString()}
                              </span>
                              <Badge variant='outline' className='text-xs'>
                                {stage.rate}%
                              </Badge>
                            </div>
                          </div>
                          <div className='w-full bg-gray-200 rounded-full h-2'>
                            <div
                              className='bg-green-600 h-2 rounded-full'
                              style={{ width: `${stage.rate}%` }}
                            ></div>
                          </div>
                        </div>
                      )
                    )}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default AnalyticsModal;
