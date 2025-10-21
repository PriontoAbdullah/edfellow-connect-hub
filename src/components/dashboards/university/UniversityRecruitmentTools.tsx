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
  Briefcase,
  Users,
  Target,
  TrendingUp,
  Eye,
  Share2,
  BarChart3,
  Megaphone,
  Globe,
  Calendar,
  DollarSign,
  CheckCircle,
  AlertCircle,
  Plus,
  Edit,
  Trash2,
  ExternalLink,
  Filter,
  Search,
  UserPlus,
  GraduationCap,
  Building2,
  FileText,
  Send,
  Mail,
  Phone,
  MapPin,
  Clock,
  Star,
  Award,
  BookOpen,
} from 'lucide-react';

const UniversityRecruitmentTools = () => {
  const [activeTab, setActiveTab] = useState('campaigns');
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState('all');

  // Mock data for recruitment campaigns
  const recruitmentCampaigns = [
    {
      id: 1,
      title: 'International Student Recruitment - Fall 2024',
      status: 'active',
      budget: 15000,
      spent: 8500,
      impressions: 250000,
      clicks: 5200,
      applications: 180,
      conversionRate: 3.46,
      cpc: 1.63,
      startDate: '2024-01-15',
      endDate: '2024-06-15',
      targetAudience: 'International Students',
      platforms: ['Facebook', 'Google Ads', 'LinkedIn', 'Instagram'],
      regions: ['Asia', 'Europe', 'Africa'],
    },
    {
      id: 2,
      title: 'Graduate Program Recruitment',
      status: 'active',
      budget: 12000,
      spent: 4200,
      impressions: 180000,
      clicks: 3600,
      applications: 95,
      conversionRate: 2.64,
      cpc: 1.17,
      startDate: '2024-02-01',
      endDate: '2024-05-31',
      targetAudience: 'Graduate Students',
      platforms: ['LinkedIn', 'Google Ads', 'Twitter'],
      regions: ['North America', 'Europe'],
    },
    {
      id: 3,
      title: 'Faculty Recruitment Campaign',
      status: 'paused',
      budget: 8000,
      spent: 2100,
      impressions: 75000,
      clicks: 1200,
      applications: 25,
      conversionRate: 2.08,
      cpc: 1.75,
      startDate: '2024-01-01',
      endDate: '2024-04-30',
      targetAudience: 'Academic Professionals',
      platforms: ['LinkedIn', 'Academic Networks'],
      regions: ['Global'],
    },
  ];

  const recruitmentTools = [
    {
      id: 1,
      name: 'Student Application Portal',
      description: 'Streamlined application process with automated workflows',
      type: 'portal',
      usage: 1250,
      lastUsed: '2024-01-22',
      features: ['Online Applications', 'Document Upload', 'Status Tracking'],
    },
    {
      id: 2,
      name: 'Virtual Campus Tours',
      description:
        'Interactive 360° campus experience for prospective students',
      type: 'virtual',
      usage: 890,
      lastUsed: '2024-01-20',
      features: ['360° Tours', 'Live Q&A', 'Faculty Meetups'],
    },
    {
      id: 3,
      name: 'Scholarship Calculator',
      description: 'Automated scholarship eligibility and award calculator',
      type: 'calculator',
      usage: 2100,
      lastUsed: '2024-01-21',
      features: [
        'Eligibility Check',
        'Award Estimation',
        'Application Integration',
      ],
    },
    {
      id: 4,
      name: 'Alumni Network Integration',
      description: 'Connect prospective students with alumni in their field',
      type: 'networking',
      usage: 450,
      lastUsed: '2024-01-19',
      features: ['Mentor Matching', 'Career Guidance', 'Success Stories'],
    },
  ];

  const recruitmentStats = [
    {
      title: 'Total Applications',
      value: '2,847',
      change: '+12.5%',
      trend: 'up',
      icon: FileText,
    },
    {
      title: 'Conversion Rate',
      value: '3.2%',
      change: '+0.8%',
      trend: 'up',
      icon: TrendingUp,
    },
    {
      title: 'Cost Per Application',
      value: '$47',
      change: '-5.2%',
      trend: 'down',
      icon: DollarSign,
    },
    {
      title: 'Active Campaigns',
      value: '8',
      change: '+2',
      trend: 'up',
      icon: Target,
    },
  ];

  const filteredCampaigns = recruitmentCampaigns.filter((campaign) => {
    const matchesSearch = campaign.title
      .toLowerCase()
      .includes(searchTerm.toLowerCase());
    const matchesFilter =
      filterStatus === 'all' || campaign.status === filterStatus;
    return matchesSearch && matchesFilter;
  });

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active':
        return 'bg-green-100 text-green-800';
      case 'paused':
        return 'bg-yellow-100 text-yellow-800';
      case 'completed':
        return 'bg-blue-100 text-blue-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className='space-y-6'>
      {/* Header */}
      <div className='flex items-center justify-between'>
        <div>
          <h1 className='text-2xl font-bold text-gray-900'>
            Recruitment Tools
          </h1>
          <p className='text-gray-600 mt-1'>
            Manage student recruitment campaigns and tools
          </p>
        </div>
        <Button className='bg-blue-600 hover:bg-blue-700 text-white'>
          <Plus className='h-4 w-4 mr-2' />
          New Campaign
        </Button>
      </div>

      {/* Stats Cards */}
      <div className='grid grid-cols-1 md:grid-cols-4 gap-4'>
        {recruitmentStats.map((stat, index) => (
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
          <TabsTrigger value='campaigns'>Campaigns</TabsTrigger>
          <TabsTrigger value='tools'>Recruitment Tools</TabsTrigger>
          <TabsTrigger value='analytics'>Analytics</TabsTrigger>
        </TabsList>

        <TabsContent value='campaigns' className='space-y-4'>
          {/* Filters */}
          <div className='flex gap-4'>
            <div className='flex-1'>
              <div className='relative'>
                <Search className='absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4' />
                <Input
                  placeholder='Search campaigns...'
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
                <SelectItem value='active'>Active</SelectItem>
                <SelectItem value='paused'>Paused</SelectItem>
                <SelectItem value='completed'>Completed</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Campaigns List */}
          <div className='space-y-4'>
            {filteredCampaigns.map((campaign) => (
              <Card key={campaign.id}>
                <CardContent className='p-6'>
                  <div className='flex items-start justify-between mb-4'>
                    <div className='flex-1'>
                      <div className='flex items-center gap-3 mb-2'>
                        <h3 className='text-lg font-semibold text-gray-900'>
                          {campaign.title}
                        </h3>
                        <Badge className={getStatusColor(campaign.status)}>
                          {campaign.status}
                        </Badge>
                      </div>
                      <div className='grid grid-cols-2 md:grid-cols-4 gap-4 text-sm text-gray-600 mb-3'>
                        <div>
                          <span className='font-medium'>Budget:</span> $
                          {campaign.budget.toLocaleString()}
                        </div>
                        <div>
                          <span className='font-medium'>Spent:</span> $
                          {campaign.spent.toLocaleString()}
                        </div>
                        <div>
                          <span className='font-medium'>Applications:</span>{' '}
                          {campaign.applications}
                        </div>
                        <div>
                          <span className='font-medium'>Conversion:</span>{' '}
                          {campaign.conversionRate}%
                        </div>
                      </div>
                      <div className='flex items-center gap-4 text-sm text-gray-500'>
                        <span>CPC: ${campaign.cpc}</span>
                        <span>Platforms: {campaign.platforms.join(', ')}</span>
                        <span>Regions: {campaign.regions.join(', ')}</span>
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
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value='tools' className='space-y-4'>
          <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
            {recruitmentTools.map((tool) => (
              <Card key={tool.id}>
                <CardContent className='p-6'>
                  <div className='flex items-start justify-between mb-4'>
                    <div className='flex-1'>
                      <h3 className='text-lg font-semibold text-gray-900 mb-2'>
                        {tool.name}
                      </h3>
                      <p className='text-sm text-gray-600 mb-3'>
                        {tool.description}
                      </p>
                      <div className='flex flex-wrap gap-2 mb-3'>
                        {tool.features.map((feature, index) => (
                          <Badge
                            key={index}
                            variant='outline'
                            className='text-xs'
                          >
                            {feature}
                          </Badge>
                        ))}
                      </div>
                      <div className='flex items-center gap-4 text-sm text-gray-500'>
                        <span>Used {tool.usage} times</span>
                        <span>Last used: {tool.lastUsed}</span>
                      </div>
                    </div>
                    <Badge variant='outline' className='capitalize'>
                      {tool.type}
                    </Badge>
                  </div>
                  <div className='flex gap-2'>
                    <Button size='sm' className='flex-1'>
                      <ExternalLink className='h-4 w-4 mr-1' />
                      Use Tool
                    </Button>
                    <Button size='sm' variant='outline'>
                      <Edit className='h-4 w-4' />
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value='analytics' className='space-y-4'>
          <div className='grid grid-cols-1 lg:grid-cols-2 gap-6'>
            <Card>
              <CardHeader>
                <CardTitle>Recruitment Performance</CardTitle>
              </CardHeader>
              <CardContent>
                <div className='space-y-4'>
                  <div className='flex justify-between items-center'>
                    <span className='text-sm text-gray-600'>
                      Average Conversion Rate
                    </span>
                    <span className='font-semibold'>2.8%</span>
                  </div>
                  <div className='flex justify-between items-center'>
                    <span className='text-sm text-gray-600'>
                      Cost Per Application
                    </span>
                    <span className='font-semibold'>$52</span>
                  </div>
                  <div className='flex justify-between items-center'>
                    <span className='text-sm text-gray-600'>
                      Application Completion Rate
                    </span>
                    <span className='font-semibold'>78%</span>
                  </div>
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle>Top Performing Channels</CardTitle>
              </CardHeader>
              <CardContent>
                <div className='space-y-3'>
                  <div className='flex justify-between items-center'>
                    <span className='text-sm'>Google Ads</span>
                    <div className='flex items-center gap-2'>
                      <div className='w-20 bg-gray-200 rounded-full h-2'>
                        <div
                          className='bg-blue-600 h-2 rounded-full'
                          style={{ width: '85%' }}
                        ></div>
                      </div>
                      <span className='text-sm font-medium'>85%</span>
                    </div>
                  </div>
                  <div className='flex justify-between items-center'>
                    <span className='text-sm'>LinkedIn</span>
                    <div className='flex items-center gap-2'>
                      <div className='w-20 bg-gray-200 rounded-full h-2'>
                        <div
                          className='bg-green-600 h-2 rounded-full'
                          style={{ width: '70%' }}
                        ></div>
                      </div>
                      <span className='text-sm font-medium'>70%</span>
                    </div>
                  </div>
                  <div className='flex justify-between items-center'>
                    <span className='text-sm'>Facebook</span>
                    <div className='flex items-center gap-2'>
                      <div className='w-20 bg-gray-200 rounded-full h-2'>
                        <div
                          className='bg-purple-600 h-2 rounded-full'
                          style={{ width: '55%' }}
                        ></div>
                      </div>
                      <span className='text-sm font-medium'>55%</span>
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

export default UniversityRecruitmentTools;
