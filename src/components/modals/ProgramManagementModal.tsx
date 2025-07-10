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
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useToast } from '@/hooks/use-toast';
import {
  BookOpen,
  Edit,
  Eye,
  Trash2,
  BarChart3,
  Settings,
  Users,
  Calendar,
  DollarSign,
  Globe,
  FileText,
  Download,
  Share2,
  X,
  Plus,
  CheckCircle,
  AlertCircle,
  Clock,
  Star,
  TrendingUp,
  Target,
} from 'lucide-react';

interface ProgramManagementModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  action: 'edit' | 'view' | 'delete' | 'analytics';
  program?: {
    id: number;
    name: string;
    type: string;
    duration: string;
    fees: string;
    status: string;
    applications: number;
    views: number;
    description: string;
  };
}

const ProgramManagementModal = ({
  open,
  onOpenChange,
  action,
  program,
}: ProgramManagementModalProps) => {
  const { toast } = useToast();
  const [activeTab, setActiveTab] = useState('overview');
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: program?.name || '',
    type: program?.type || '',
    duration: program?.duration || '',
    fees: program?.fees || '',
    description: program?.description || '',
  });

  const analyticsData = {
    overview: {
      totalApplications: 1250,
      programViews: 5670,
      conversionRate: 22.1,
      avgResponseTime: '2.3h',
    },
    applications: {
      byMonth: [
        { month: 'Jan', count: 85 },
        { month: 'Feb', count: 120 },
        { month: 'Mar', count: 95 },
        { month: 'Apr', count: 140 },
        { month: 'May', count: 180 },
        { month: 'Jun', count: 220 },
      ],
      byCountry: [
        { country: 'China', count: 280, percentage: 22.4 },
        { country: 'India', count: 220, percentage: 17.6 },
        { country: 'United States', count: 180, percentage: 14.4 },
        { country: 'Nigeria', count: 150, percentage: 12.0 },
        { country: 'Brazil', count: 120, percentage: 9.6 },
      ],
    },
    engagement: {
      pageViews: 5670,
      uniqueVisitors: 3450,
      avgSessionDuration: '3m 45s',
      bounceRate: 28.5,
    },
  };

  const handleSave = async () => {
    setIsLoading(true);
    toast({
      title: 'Saving Changes',
      description: 'Updating program information...',
    });

    setTimeout(() => {
      setIsLoading(false);
      toast({
        title: 'Program Updated',
        description: 'Program information has been saved successfully.',
      });
      onOpenChange(false);
    }, 2000);
  };

  const handleDelete = async () => {
    setIsLoading(true);
    toast({
      title: 'Deleting Program',
      description: 'This action cannot be undone...',
    });

    setTimeout(() => {
      setIsLoading(false);
      toast({
        title: 'Program Deleted',
        description: 'Program has been permanently deleted.',
      });
      onOpenChange(false);
    }, 2000);
  };

  const handleExportData = () => {
    toast({
      title: 'Exporting Data',
      description: 'Preparing program data for download...',
    });
  };

  const handleShareProgram = () => {
    toast({
      title: 'Share Link Generated',
      description: 'Program link has been copied to clipboard',
    });
  };

  const getActionTitle = () => {
    switch (action) {
      case 'edit':
        return 'Edit Program';
      case 'view':
        return 'Program Details';
      case 'delete':
        return 'Delete Program';
      case 'analytics':
        return 'Program Analytics';
      default:
        return 'Program Management';
    }
  };

  const getActionIcon = () => {
    switch (action) {
      case 'edit':
        return Edit;
      case 'view':
        return Eye;
      case 'delete':
        return Trash2;
      case 'analytics':
        return BarChart3;
      default:
        return BookOpen;
    }
  };

  const ActionIcon = getActionIcon();

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className='max-w-4xl max-h-[90vh] overflow-y-auto'>
        <DialogHeader>
          <div className='flex items-center justify-between'>
            <div className='flex items-center gap-3'>
              <ActionIcon className='h-6 w-6 text-orange-600' />
              <div>
                <DialogTitle className='text-2xl font-bold'>
                  {getActionTitle()}
                </DialogTitle>
                <p className='text-gray-600'>
                  {action === 'edit' &&
                    'Update program information and settings'}
                  {action === 'view' && 'View detailed program information'}
                  {action === 'delete' && 'Permanently delete this program'}
                  {action === 'analytics' && 'View program performance metrics'}
                </p>
              </div>
            </div>
            <Button
              variant='outline'
              size='sm'
              onClick={() => onOpenChange(false)}
            >
              <X className='h-4 w-4' />
            </Button>
          </div>
        </DialogHeader>

        <div className='space-y-6'>
          {action === 'edit' && (
            <Card>
              <CardHeader>
                <CardTitle>Program Information</CardTitle>
              </CardHeader>
              <CardContent className='space-y-4'>
                <div className='grid md:grid-cols-2 gap-4'>
                  <div>
                    <Label htmlFor='name'>Program Name</Label>
                    <Input
                      id='name'
                      value={formData.name}
                      onChange={(e) =>
                        setFormData({ ...formData, name: e.target.value })
                      }
                      placeholder='Enter program name'
                    />
                  </div>
                  <div>
                    <Label htmlFor='type'>Program Type</Label>
                    <Input
                      id='type'
                      value={formData.type}
                      onChange={(e) =>
                        setFormData({ ...formData, type: e.target.value })
                      }
                      placeholder="e.g., Master's Degree"
                    />
                  </div>
                  <div>
                    <Label htmlFor='duration'>Duration</Label>
                    <Input
                      id='duration'
                      value={formData.duration}
                      onChange={(e) =>
                        setFormData({ ...formData, duration: e.target.value })
                      }
                      placeholder='e.g., 2 years'
                    />
                  </div>
                  <div>
                    <Label htmlFor='fees'>Annual Fees (USD)</Label>
                    <Input
                      id='fees'
                      value={formData.fees}
                      onChange={(e) =>
                        setFormData({ ...formData, fees: e.target.value })
                      }
                      placeholder='25000'
                    />
                  </div>
                </div>
                <div>
                  <Label htmlFor='description'>Description</Label>
                  <Textarea
                    id='description'
                    value={formData.description}
                    onChange={(e) =>
                      setFormData({ ...formData, description: e.target.value })
                    }
                    placeholder='Enter program description...'
                    rows={4}
                  />
                </div>
              </CardContent>
            </Card>
          )}

          {action === 'view' && program && (
            <Card>
              <CardHeader>
                <CardTitle className='flex items-center gap-2'>
                  <BookOpen className='h-5 w-5 text-blue-600' />
                  Program Details
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className='grid md:grid-cols-2 gap-6'>
                  <div className='space-y-4'>
                    <div>
                      <Label className='text-sm font-medium'>
                        Program Name
                      </Label>
                      <p className='text-gray-900'>{program.name}</p>
                    </div>
                    <div>
                      <Label className='text-sm font-medium'>
                        Program Type
                      </Label>
                      <p className='text-gray-900'>{program.type}</p>
                    </div>
                    <div>
                      <Label className='text-sm font-medium'>Duration</Label>
                      <p className='text-gray-900'>{program.duration}</p>
                    </div>
                    <div>
                      <Label className='text-sm font-medium'>Annual Fees</Label>
                      <p className='text-gray-900'>${program.fees}</p>
                    </div>
                    <div>
                      <Label className='text-sm font-medium'>Status</Label>
                      <Badge
                        className={
                          program.status === 'Active'
                            ? 'bg-green-100 text-green-700'
                            : 'bg-yellow-100 text-yellow-700'
                        }
                      >
                        {program.status}
                      </Badge>
                    </div>
                  </div>
                  <div className='space-y-4'>
                    <div>
                      <Label className='text-sm font-medium'>
                        Applications
                      </Label>
                      <p className='text-2xl font-bold text-blue-600'>
                        {program.applications}
                      </p>
                    </div>
                    <div>
                      <Label className='text-sm font-medium'>
                        Program Views
                      </Label>
                      <p className='text-2xl font-bold text-green-600'>
                        {program.views}
                      </p>
                    </div>
                    <div>
                      <Label className='text-sm font-medium'>Description</Label>
                      <p className='text-gray-700 text-sm'>
                        {program.description}
                      </p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          )}

          {action === 'delete' && program && (
            <Card>
              <CardHeader>
                <CardTitle className='flex items-center gap-2 text-red-600'>
                  <AlertCircle className='h-5 w-5' />
                  Confirm Deletion
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className='text-center space-y-4'>
                  <AlertCircle className='h-16 w-16 text-red-500 mx-auto' />
                  <div>
                    <h3 className='text-lg font-semibold text-gray-900'>
                      Delete "{program.name}"?
                    </h3>
                    <p className='text-gray-600 mt-2'>
                      This action cannot be undone. This will permanently delete
                      the program and all associated data including applications
                      and analytics.
                    </p>
                  </div>
                  <div className='bg-red-50 p-4 rounded-lg'>
                    <p className='text-sm text-red-700'>
                      <strong>Warning:</strong> This will affect{' '}
                      {program.applications} applications and {program.views}{' '}
                      program views.
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          )}

          {action === 'analytics' && program && (
            <div className='space-y-6'>
              {/* Key Metrics */}
              <div className='grid grid-cols-2 md:grid-cols-4 gap-4'>
                <Card>
                  <CardContent className='p-4'>
                    <div className='flex items-center justify-between'>
                      <div>
                        <p className='text-sm text-gray-600'>Applications</p>
                        <p className='text-2xl font-bold text-blue-600'>
                          {analyticsData.overview.totalApplications.toLocaleString()}
                        </p>
                      </div>
                      <Users className='h-8 w-8 text-blue-600' />
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
                  </CardContent>
                </Card>

                <Card>
                  <CardContent className='p-4'>
                    <div className='flex items-center justify-between'>
                      <div>
                        <p className='text-sm text-gray-600'>Avg Response</p>
                        <p className='text-2xl font-bold text-orange-600'>
                          {analyticsData.overview.avgResponseTime}
                        </p>
                      </div>
                      <Clock className='h-8 w-8 text-orange-600' />
                    </div>
                  </CardContent>
                </Card>
              </div>

              {/* Detailed Analytics */}
              <Tabs value={activeTab} onValueChange={setActiveTab}>
                <TabsList className='grid w-full grid-cols-3'>
                  <TabsTrigger value='overview'>Overview</TabsTrigger>
                  <TabsTrigger value='applications'>Applications</TabsTrigger>
                  <TabsTrigger value='engagement'>Engagement</TabsTrigger>
                </TabsList>

                <TabsContent value='overview' className='space-y-4'>
                  <Card>
                    <CardHeader>
                      <CardTitle>Applications Trend</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className='h-64 flex items-center justify-center bg-gray-50 rounded'>
                        <div className='text-center'>
                          <TrendingUp className='h-12 w-12 text-gray-400 mx-auto mb-2' />
                          <p className='text-gray-500'>
                            Chart visualization would be here
                          </p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </TabsContent>

                <TabsContent value='applications' className='space-y-4'>
                  <div className='grid md:grid-cols-2 gap-4'>
                    <Card>
                      <CardHeader>
                        <CardTitle>Applications by Country</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <div className='space-y-3'>
                          {analyticsData.applications.byCountry.map(
                            (item, index) => (
                              <div
                                key={index}
                                className='flex items-center justify-between'
                              >
                                <span className='text-sm'>{item.country}</span>
                                <div className='flex items-center gap-2'>
                                  <span className='text-sm font-medium'>
                                    {item.count}
                                  </span>
                                  <Badge variant='outline' className='text-xs'>
                                    {item.percentage}%
                                  </Badge>
                                </div>
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
                            <BarChart3 className='h-12 w-12 text-gray-400 mx-auto mb-2' />
                            <p className='text-gray-500'>
                              Monthly trend chart would be here
                            </p>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </div>
                </TabsContent>

                <TabsContent value='engagement' className='space-y-4'>
                  <Card>
                    <CardHeader>
                      <CardTitle>Engagement Metrics</CardTitle>
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
                </TabsContent>
              </Tabs>
            </div>
          )}

          {/* Action Buttons */}
          <div className='flex items-center justify-between pt-4 border-t'>
            <div className='flex gap-2'>
              {action === 'analytics' && (
                <>
                  <Button variant='outline' onClick={handleExportData}>
                    <Download className='h-4 w-4 mr-2' />
                    Export Data
                  </Button>
                  <Button variant='outline' onClick={handleShareProgram}>
                    <Share2 className='h-4 w-4 mr-2' />
                    Share Report
                  </Button>
                </>
              )}
            </div>
            <div className='flex gap-2'>
              <Button variant='outline' onClick={() => onOpenChange(false)}>
                Cancel
              </Button>
              {action === 'edit' && (
                <Button
                  onClick={handleSave}
                  disabled={isLoading}
                  className='bg-orange-600 hover:bg-orange-700'
                >
                  {isLoading ? (
                    <>
                      <div className='animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2'></div>
                      Saving...
                    </>
                  ) : (
                    <>
                      <CheckCircle className='h-4 w-4 mr-2' />
                      Save Changes
                    </>
                  )}
                </Button>
              )}
              {action === 'delete' && (
                <Button
                  onClick={handleDelete}
                  disabled={isLoading}
                  variant='destructive'
                >
                  {isLoading ? (
                    <>
                      <div className='animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2'></div>
                      Deleting...
                    </>
                  ) : (
                    <>
                      <Trash2 className='h-4 w-4 mr-2' />
                      Delete Program
                    </>
                  )}
                </Button>
              )}
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default ProgramManagementModal;
