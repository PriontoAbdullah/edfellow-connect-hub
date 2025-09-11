import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import {
  Shield,
  AlertTriangle,
  Ban,
  CheckCircle,
  XCircle,
  Eye,
  EyeOff,
  Pin,
  PinOff,
  Lock,
  Unlock,
  MessageSquare,
  User,
  Calendar,
  Flag,
  MoreHorizontal,
  Search,
  Filter,
  Users,
  Activity,
} from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';
import { useToast } from '@/hooks/use-toast';

interface ModerationAction {
  id: string;
  type: 'thread' | 'reply' | 'user';
  action:
    | 'approve'
    | 'reject'
    | 'pin'
    | 'unpin'
    | 'lock'
    | 'unlock'
    | 'ban'
    | 'warn';
  target: {
    id: string;
    title?: string;
    content?: string;
    author?: {
      id: string;
      display_name: string;
      avatar?: string;
      role: string;
    };
  };
  reason?: string;
  moderator: {
    id: string;
    display_name: string;
    avatar?: string;
  };
  created_at: string;
  status: 'pending' | 'completed' | 'rejected';
}

interface ReportedContent {
  id: string;
  type: 'thread' | 'reply' | 'user';
  content: {
    id: string;
    title?: string;
    content?: string;
    author?: {
      id: string;
      display_name: string;
      avatar?: string;
      role: string;
    };
  };
  reports: Array<{
    id: string;
    reason: string;
    description?: string;
    reporter: {
      id: string;
      display_name: string;
      avatar?: string;
    };
    created_at: string;
  }>;
  severity: 'low' | 'medium' | 'high' | 'critical';
  status: 'pending' | 'reviewed' | 'resolved' | 'dismissed';
}

interface ModerationToolsProps {
  compact?: boolean;
}

export const ModerationTools: React.FC<ModerationToolsProps> = ({
  compact = false,
}) => {
  const { user } = useAuth();
  const { toast } = useToast();
  const [moderationActions, setModerationActions] = useState<
    ModerationAction[]
  >([]);
  const [reportedContent, setReportedContent] = useState<ReportedContent[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState<'actions' | 'reports' | 'users'>(
    'actions'
  );
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('all');

  useEffect(() => {
    fetchModerationData();
  }, [activeTab, statusFilter]);

  const fetchModerationData = async () => {
    setLoading(true);
    try {
      // Simulate API call - replace with actual API call
      await new Promise((resolve) => setTimeout(resolve, 1000));

      // Mock data - replace with real data from API
      const mockActions: ModerationAction[] = [
        {
          id: '1',
          type: 'thread',
          action: 'approve',
          target: {
            id: 'thread-1',
            title: 'Inappropriate content in discussion',
            author: {
              id: 'user-1',
              display_name: 'John Doe',
              avatar: undefined,
              role: 'student',
            },
          },
          reason: 'Contains inappropriate language',
          moderator: {
            id: user?.id || 'mod-1',
            display_name: user?.display_name || 'Moderator',
            avatar: user?.avatar,
          },
          created_at: '2024-01-15T10:30:00Z',
          status: 'pending',
        },
        {
          id: '2',
          type: 'reply',
          action: 'reject',
          target: {
            id: 'reply-1',
            content: 'Spam content detected',
            author: {
              id: 'user-2',
              display_name: 'Jane Smith',
              avatar: undefined,
              role: 'student',
            },
          },
          reason: 'Spam content',
          moderator: {
            id: user?.id || 'mod-1',
            display_name: user?.display_name || 'Moderator',
            avatar: user?.avatar,
          },
          created_at: '2024-01-14T15:45:00Z',
          status: 'completed',
        },
      ];

      const mockReports: ReportedContent[] = [
        {
          id: '1',
          type: 'thread',
          content: {
            id: 'thread-1',
            title: 'Offensive discussion topic',
            content: 'This thread contains offensive content...',
            author: {
              id: 'user-1',
              display_name: 'John Doe',
              avatar: undefined,
              role: 'student',
            },
          },
          reports: [
            {
              id: 'report-1',
              reason: 'Harassment',
              description: 'Contains personal attacks',
              reporter: {
                id: 'user-3',
                display_name: 'Alice Johnson',
                avatar: undefined,
              },
              created_at: '2024-01-15T09:00:00Z',
            },
          ],
          severity: 'high',
          status: 'pending',
        },
      ];

      setModerationActions(mockActions);
      setReportedContent(mockReports);
    } catch (error) {
      console.error('Error fetching moderation data:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleModerationAction = async (
    actionId: string,
    newStatus: 'completed' | 'rejected'
  ) => {
    try {
      // Simulate API call - replace with actual API call
      await new Promise((resolve) => setTimeout(resolve, 500));

      setModerationActions((prev) =>
        prev.map((action) =>
          action.id === actionId ? { ...action, status: newStatus } : action
        )
      );

      toast({
        title: 'Success',
        description: `Action ${newStatus} successfully`,
      });
    } catch (error) {
      toast({
        title: 'Error',
        description: 'Failed to update action',
        variant: 'destructive',
      });
    }
  };

  const handleReportAction = async (
    reportId: string,
    action: 'resolved' | 'dismissed'
  ) => {
    try {
      // Simulate API call - replace with actual API call
      await new Promise((resolve) => setTimeout(resolve, 500));

      setReportedContent((prev) =>
        prev.map((report) =>
          report.id === reportId ? { ...report, status: action } : report
        )
      );

      toast({
        title: 'Success',
        description: `Report ${action} successfully`,
      });
    } catch (error) {
      toast({
        title: 'Error',
        description: 'Failed to update report',
        variant: 'destructive',
      });
    }
  };

  const getActionIcon = (action: string) => {
    switch (action) {
      case 'approve':
        return <CheckCircle className='w-4 h-4 text-green-600' />;
      case 'reject':
        return <XCircle className='w-4 h-4 text-red-600' />;
      case 'pin':
        return <Pin className='w-4 h-4 text-blue-600' />;
      case 'unpin':
        return <PinOff className='w-4 h-4 text-gray-600' />;
      case 'lock':
        return <Lock className='w-4 h-4 text-orange-600' />;
      case 'unlock':
        return <Unlock className='w-4 h-4 text-green-600' />;
      case 'ban':
        return <Ban className='w-4 h-4 text-red-600' />;
      case 'warn':
        return <AlertTriangle className='w-4 h-4 text-yellow-600' />;
      default:
        return <Shield className='w-4 h-4' />;
    }
  };

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case 'low':
        return 'bg-green-100 text-green-800';
      case 'medium':
        return 'bg-yellow-100 text-yellow-800';
      case 'high':
        return 'bg-orange-100 text-orange-800';
      case 'critical':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'pending':
        return 'bg-yellow-100 text-yellow-800';
      case 'completed':
        return 'bg-green-100 text-green-800';
      case 'rejected':
        return 'bg-red-100 text-red-800';
      case 'resolved':
        return 'bg-green-100 text-green-800';
      case 'dismissed':
        return 'bg-gray-100 text-gray-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  if (loading) {
    return (
      <div className='space-y-4'>
        <div className='animate-pulse'>
          <div className='h-4 bg-gray-200 rounded w-1/4 mb-4'></div>
          <div className='space-y-3'>
            {[1, 2, 3].map((i) => (
              <div key={i} className='h-20 bg-gray-200 rounded'></div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  if (compact) {
    const pendingActions = moderationActions.filter(
      (action) => action.status === 'pending'
    );
    const pendingReports = reportedContent.filter(
      (report) => report.status === 'pending'
    );

    return (
      <div className='space-y-4'>
        <div className='flex items-center justify-between'>
          <h3 className='text-sm font-medium'>Moderation</h3>
          <Badge variant='outline'>
            {pendingActions.length + pendingReports.length}
          </Badge>
        </div>

        <div className='space-y-2'>
          {pendingActions.slice(0, 2).map((action) => (
            <div key={action.id} className='p-2 border rounded-lg'>
              <div className='flex items-center gap-2 mb-1'>
                {getActionIcon(action.action)}
                <span className='text-sm font-medium'>{action.action}</span>
                <Badge className={`text-xs ${getStatusColor(action.status)}`}>
                  {action.status}
                </Badge>
              </div>
              <p className='text-xs text-muted-foreground truncate'>
                {action.target.title || action.target.content}
              </p>
            </div>
          ))}

          {pendingReports.slice(0, 2).map((report) => (
            <div key={report.id} className='p-2 border rounded-lg'>
              <div className='flex items-center gap-2 mb-1'>
                <Flag className='w-4 h-4 text-red-600' />
                <span className='text-sm font-medium'>Report</span>
                <Badge
                  className={`text-xs ${getSeverityColor(report.severity)}`}
                >
                  {report.severity}
                </Badge>
              </div>
              <p className='text-xs text-muted-foreground truncate'>
                {report.content.title || report.content.content}
              </p>
            </div>
          ))}
        </div>

        {pendingActions.length + pendingReports.length > 4 && (
          <Button variant='outline' size='sm' className='w-full'>
            View All ({pendingActions.length + pendingReports.length})
          </Button>
        )}
      </div>
    );
  }

  return (
    <div className='space-y-6'>
      {/* Header */}
      <div className='flex items-center justify-between'>
        <div>
          <h3 className='text-lg font-semibold'>Moderation Tools</h3>
          <p className='text-sm text-muted-foreground'>
            Manage forum content and user behavior
          </p>
        </div>
        <div className='flex items-center gap-2'>
          <Badge variant='outline'>
            <Activity className='w-3 h-3 mr-1' />
            {
              moderationActions.filter((a) => a.status === 'pending').length
            }{' '}
            pending
          </Badge>
          <Badge variant='outline'>
            <Flag className='w-3 h-3 mr-1' />
            {reportedContent.filter((r) => r.status === 'pending').length}{' '}
            reports
          </Badge>
        </div>
      </div>

      {/* Tabs */}
      <div className='flex gap-2'>
        {(['actions', 'reports', 'users'] as const).map((tab) => (
          <Button
            key={tab}
            variant={activeTab === tab ? 'default' : 'outline'}
            size='sm'
            onClick={() => setActiveTab(tab)}
          >
            {tab === 'actions' && <Shield className='w-4 h-4 mr-1' />}
            {tab === 'reports' && <Flag className='w-4 h-4 mr-1' />}
            {tab === 'users' && <Users className='w-4 h-4 mr-1' />}
            <span className='capitalize'>{tab}</span>
          </Button>
        ))}
      </div>

      {/* Filters */}
      <div className='flex gap-4 flex-wrap'>
        <div className='relative flex-1 min-w-64'>
          <Search className='absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4' />
          <input
            type='text'
            placeholder='Search...'
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className='w-full pl-10 pr-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500'
          />
        </div>

        <select
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value)}
          className='px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500'
        >
          <option value='all'>All Status</option>
          <option value='pending'>Pending</option>
          <option value='completed'>Completed</option>
          <option value='rejected'>Rejected</option>
        </select>
      </div>

      {/* Content */}
      {activeTab === 'actions' && (
        <div className='space-y-4'>
          {moderationActions.length === 0 ? (
            <Card>
              <CardContent className='p-6 text-center'>
                <Shield className='w-12 h-12 text-muted-foreground mx-auto mb-4' />
                <h3 className='text-lg font-medium mb-2'>
                  No moderation actions
                </h3>
                <p className='text-muted-foreground'>
                  All moderation actions have been processed
                </p>
              </CardContent>
            </Card>
          ) : (
            moderationActions.map((action) => (
              <Card key={action.id}>
                <CardContent className='p-4'>
                  <div className='flex items-start gap-3'>
                    <div className='p-2 rounded-lg bg-gray-100'>
                      {getActionIcon(action.action)}
                    </div>

                    <div className='flex-1 min-w-0'>
                      <div className='flex items-center gap-2 mb-1'>
                        <h4 className='font-medium capitalize'>
                          {action.action} {action.type}
                        </h4>
                        <Badge
                          className={`text-xs ${getStatusColor(action.status)}`}
                        >
                          {action.status}
                        </Badge>
                      </div>

                      <p className='text-sm text-muted-foreground mb-2'>
                        {action.target.title || action.target.content}
                      </p>

                      <div className='flex items-center gap-4 text-xs text-muted-foreground mb-2'>
                        <div className='flex items-center gap-1'>
                          <User className='w-3 h-3' />
                          <span>{action.target.author?.display_name}</span>
                        </div>
                        <div className='flex items-center gap-1'>
                          <Calendar className='w-3 h-3' />
                          <span>{formatDate(action.created_at)}</span>
                        </div>
                      </div>

                      {action.reason && (
                        <p className='text-xs text-muted-foreground mb-2'>
                          Reason: {action.reason}
                        </p>
                      )}
                    </div>

                    {action.status === 'pending' && (
                      <div className='flex gap-2'>
                        <Button
                          size='sm'
                          onClick={() =>
                            handleModerationAction(action.id, 'completed')
                          }
                        >
                          <CheckCircle className='w-4 h-4 mr-1' />
                          Approve
                        </Button>
                        <Button
                          variant='outline'
                          size='sm'
                          onClick={() =>
                            handleModerationAction(action.id, 'rejected')
                          }
                        >
                          <XCircle className='w-4 h-4 mr-1' />
                          Reject
                        </Button>
                      </div>
                    )}
                  </div>
                </CardContent>
              </Card>
            ))
          )}
        </div>
      )}

      {activeTab === 'reports' && (
        <div className='space-y-4'>
          {reportedContent.length === 0 ? (
            <Card>
              <CardContent className='p-6 text-center'>
                <Flag className='w-12 h-12 text-muted-foreground mx-auto mb-4' />
                <h3 className='text-lg font-medium mb-2'>No reports</h3>
                <p className='text-muted-foreground'>
                  No content has been reported recently
                </p>
              </CardContent>
            </Card>
          ) : (
            reportedContent.map((report) => (
              <Card key={report.id}>
                <CardContent className='p-4'>
                  <div className='flex items-start gap-3'>
                    <div className='p-2 rounded-lg bg-red-100'>
                      <Flag className='w-4 h-4 text-red-600' />
                    </div>

                    <div className='flex-1 min-w-0'>
                      <div className='flex items-center gap-2 mb-1'>
                        <h4 className='font-medium'>Reported {report.type}</h4>
                        <Badge
                          className={`text-xs ${getSeverityColor(
                            report.severity
                          )}`}
                        >
                          {report.severity}
                        </Badge>
                        <Badge
                          className={`text-xs ${getStatusColor(report.status)}`}
                        >
                          {report.status}
                        </Badge>
                      </div>

                      <p className='text-sm text-muted-foreground mb-2'>
                        {report.content.title || report.content.content}
                      </p>

                      <div className='space-y-2'>
                        {report.reports.map((reportItem) => (
                          <div
                            key={reportItem.id}
                            className='p-2 bg-gray-50 rounded'
                          >
                            <div className='flex items-center gap-2 mb-1'>
                              <span className='text-sm font-medium'>
                                {reportItem.reason}
                              </span>
                              <span className='text-xs text-muted-foreground'>
                                by {reportItem.reporter.display_name}
                              </span>
                            </div>
                            {reportItem.description && (
                              <p className='text-xs text-muted-foreground'>
                                {reportItem.description}
                              </p>
                            )}
                          </div>
                        ))}
                      </div>
                    </div>

                    {report.status === 'pending' && (
                      <div className='flex gap-2'>
                        <Button
                          size='sm'
                          onClick={() =>
                            handleReportAction(report.id, 'resolved')
                          }
                        >
                          <CheckCircle className='w-4 h-4 mr-1' />
                          Resolve
                        </Button>
                        <Button
                          variant='outline'
                          size='sm'
                          onClick={() =>
                            handleReportAction(report.id, 'dismissed')
                          }
                        >
                          <XCircle className='w-4 h-4 mr-1' />
                          Dismiss
                        </Button>
                      </div>
                    )}
                  </div>
                </CardContent>
              </Card>
            ))
          )}
        </div>
      )}

      {activeTab === 'users' && (
        <Card>
          <CardContent className='p-6 text-center'>
            <Users className='w-12 h-12 text-muted-foreground mx-auto mb-4' />
            <h3 className='text-lg font-medium mb-2'>User Management</h3>
            <p className='text-muted-foreground'>
              User management features coming soon
            </p>
          </CardContent>
        </Card>
      )}
    </div>
  );
};
