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
  Target,
  TrendingUp,
  Eye,
  Users,
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
} from 'lucide-react';

const UniversityProgramPromotion = () => {
  const [activeTab, setActiveTab] = useState('campaigns');
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState('all');

  // Mock data for campaigns
  const campaigns = [
    {
      id: 1,
      title: 'Computer Science Masters Program',
      status: 'active',
      budget: 5000,
      spent: 3200,
      impressions: 125000,
      clicks: 3200,
      conversions: 45,
      ctr: 2.56,
      cpc: 1.0,
      startDate: '2024-01-15',
      endDate: '2024-03-15',
      targetAudience: 'International Students',
      platforms: ['Facebook', 'Google Ads', 'LinkedIn'],
    },
    {
      id: 2,
      title: 'MBA Program - Fall 2024',
      status: 'paused',
      budget: 8000,
      spent: 1200,
      impressions: 45000,
      clicks: 900,
      conversions: 12,
      ctr: 2.0,
      cpc: 1.33,
      startDate: '2024-02-01',
      endDate: '2024-04-01',
      targetAudience: 'Working Professionals',
      platforms: ['LinkedIn', 'Google Ads'],
    },
    {
      id: 3,
      title: 'Data Science Certificate',
      status: 'completed',
      budget: 3000,
      spent: 3000,
      impressions: 75000,
      clicks: 1500,
      conversions: 25,
      ctr: 2.0,
      cpc: 2.0,
      startDate: '2023-12-01',
      endDate: '2024-01-31',
      targetAudience: 'Career Changers',
      platforms: ['Facebook', 'Instagram'],
    },
  ];

  const promotionTools = [
    {
      id: 1,
      name: 'Social Media Templates',
      description:
        'Pre-designed templates for Facebook, Instagram, LinkedIn posts',
      type: 'template',
      usage: 45,
      lastUsed: '2024-01-20',
    },
    {
      id: 2,
      name: 'Email Campaign Builder',
      description:
        'Create and send targeted email campaigns to prospective students',
      type: 'email',
      usage: 23,
      lastUsed: '2024-01-18',
    },
    {
      id: 3,
      name: 'Video Ad Creator',
      description: 'AI-powered tool to create engaging video advertisements',
      type: 'video',
      usage: 12,
      lastUsed: '2024-01-15',
    },
    {
      id: 4,
      name: 'Landing Page Builder',
      description: 'Create custom landing pages for program promotion',
      type: 'web',
      usage: 8,
      lastUsed: '2024-01-10',
    },
  ];

  const filteredCampaigns = campaigns.filter((campaign) => {
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
            Program Promotion Tools
          </h1>
          <p className='text-gray-600 mt-1'>
            Create and manage marketing campaigns for your programs
          </p>
        </div>
        <Button className='bg-blue-600 hover:bg-blue-700 text-white'>
          <Plus className='h-4 w-4 mr-2' />
          New Campaign
        </Button>
      </div>

      {/* Stats Cards */}
      <div className='grid grid-cols-1 md:grid-cols-4 gap-4'>
        <Card>
          <CardContent className='p-4'>
            <div className='flex items-center gap-3'>
              <div className='p-2 bg-blue-100 rounded-lg'>
                <Target className='h-5 w-5 text-blue-600' />
              </div>
              <div>
                <p className='text-sm text-gray-600'>Active Campaigns</p>
                <p className='text-lg font-semibold text-gray-900'>
                  {campaigns.filter((c) => c.status === 'active').length}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className='p-4'>
            <div className='flex items-center gap-3'>
              <div className='p-2 bg-green-100 rounded-lg'>
                <DollarSign className='h-5 w-5 text-green-600' />
              </div>
              <div>
                <p className='text-sm text-gray-600'>Total Spent</p>
                <p className='text-lg font-semibold text-gray-900'>
                  $
                  {campaigns
                    .reduce((sum, c) => sum + c.spent, 0)
                    .toLocaleString()}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className='p-4'>
            <div className='flex items-center gap-3'>
              <div className='p-2 bg-purple-100 rounded-lg'>
                <Eye className='h-5 w-5 text-purple-600' />
              </div>
              <div>
                <p className='text-sm text-gray-600'>Total Impressions</p>
                <p className='text-lg font-semibold text-gray-900'>
                  {campaigns
                    .reduce((sum, c) => sum + c.impressions, 0)
                    .toLocaleString()}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className='p-4'>
            <div className='flex items-center gap-3'>
              <div className='p-2 bg-orange-100 rounded-lg'>
                <Users className='h-5 w-5 text-orange-600' />
              </div>
              <div>
                <p className='text-sm text-gray-600'>Total Conversions</p>
                <p className='text-lg font-semibold text-gray-900'>
                  {campaigns.reduce((sum, c) => sum + c.conversions, 0)}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Main Content */}
      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList>
          <TabsTrigger value='campaigns'>Campaigns</TabsTrigger>
          <TabsTrigger value='tools'>Promotion Tools</TabsTrigger>
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
                      <div className='grid grid-cols-2 md:grid-cols-4 gap-4 text-sm text-gray-600'>
                        <div>
                          <span className='font-medium'>Budget:</span> $
                          {campaign.budget.toLocaleString()}
                        </div>
                        <div>
                          <span className='font-medium'>Spent:</span> $
                          {campaign.spent.toLocaleString()}
                        </div>
                        <div>
                          <span className='font-medium'>Impressions:</span>{' '}
                          {campaign.impressions.toLocaleString()}
                        </div>
                        <div>
                          <span className='font-medium'>Conversions:</span>{' '}
                          {campaign.conversions}
                        </div>
                      </div>
                      <div className='flex items-center gap-4 mt-3 text-sm text-gray-500'>
                        <span>CTR: {campaign.ctr}%</span>
                        <span>CPC: ${campaign.cpc}</span>
                        <span>Platforms: {campaign.platforms.join(', ')}</span>
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
            {promotionTools.map((tool) => (
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
                <CardTitle>Campaign Performance</CardTitle>
              </CardHeader>
              <CardContent>
                <div className='space-y-4'>
                  <div className='flex justify-between items-center'>
                    <span className='text-sm text-gray-600'>Average CTR</span>
                    <span className='font-semibold'>2.2%</span>
                  </div>
                  <div className='flex justify-between items-center'>
                    <span className='text-sm text-gray-600'>Average CPC</span>
                    <span className='font-semibold'>$1.44</span>
                  </div>
                  <div className='flex justify-between items-center'>
                    <span className='text-sm text-gray-600'>
                      Conversion Rate
                    </span>
                    <span className='font-semibold'>1.4%</span>
                  </div>
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle>Top Performing Platforms</CardTitle>
              </CardHeader>
              <CardContent>
                <div className='space-y-3'>
                  <div className='flex justify-between items-center'>
                    <span className='text-sm'>Google Ads</span>
                    <div className='flex items-center gap-2'>
                      <div className='w-20 bg-gray-200 rounded-full h-2'>
                        <div
                          className='bg-blue-600 h-2 rounded-full'
                          style={{ width: '75%' }}
                        ></div>
                      </div>
                      <span className='text-sm font-medium'>75%</span>
                    </div>
                  </div>
                  <div className='flex justify-between items-center'>
                    <span className='text-sm'>LinkedIn</span>
                    <div className='flex items-center gap-2'>
                      <div className='w-20 bg-gray-200 rounded-full h-2'>
                        <div
                          className='bg-green-600 h-2 rounded-full'
                          style={{ width: '60%' }}
                        ></div>
                      </div>
                      <span className='text-sm font-medium'>60%</span>
                    </div>
                  </div>
                  <div className='flex justify-between items-center'>
                    <span className='text-sm'>Facebook</span>
                    <div className='flex items-center gap-2'>
                      <div className='w-20 bg-gray-200 rounded-full h-2'>
                        <div
                          className='bg-purple-600 h-2 rounded-full'
                          style={{ width: '45%' }}
                        ></div>
                      </div>
                      <span className='text-sm font-medium'>45%</span>
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

export default UniversityProgramPromotion;
