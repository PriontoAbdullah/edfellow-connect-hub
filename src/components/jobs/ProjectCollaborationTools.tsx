import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import {
  Users,
  Calendar,
  Clock,
  FileText,
  MessageSquare,
  CheckCircle,
  AlertCircle,
  Plus,
  Edit,
  Trash2,
  Eye,
  Download,
  Upload,
  Share,
  Star,
  Target,
  TrendingUp,
  Filter,
  Search,
  ChevronDown,
  X,
  Bell,
  Settings,
  Link,
  Copy,
  Send,
  Reply,
  ThumbsUp,
  Bookmark,
  BookmarkCheck,
  MoreHorizontal,
  Globe,
  Lock,
  UserPlus,
  UserMinus,
} from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';
import { useToast } from '@/hooks/use-toast';

interface Project {
  id: string;
  title: string;
  description: string;
  status: 'planning' | 'active' | 'on-hold' | 'completed' | 'cancelled';
  start_date: string;
  end_date?: string;
  created_by: string;
  created_at: string;
  updated_at: string;
  members: ProjectMember[];
  tasks: ProjectTask[];
  documents: ProjectDocument[];
  discussions: ProjectDiscussion[];
  milestones: ProjectMilestone[];
  progress: number;
  budget?: number;
  currency: string;
  tags: string[];
  is_public: boolean;
  creator?: {
    id: string;
    display_name: string;
    avatar?: string;
    role: string;
  };
}

interface ProjectMember {
  id: string;
  user_id: string;
  role: 'lead' | 'member' | 'observer';
  joined_at: string;
  permissions: string[];
  user?: {
    id: string;
    display_name: string;
    avatar?: string;
    role: string;
    email?: string;
  };
}

interface ProjectTask {
  id: string;
  title: string;
  description: string;
  status: 'todo' | 'in-progress' | 'review' | 'completed';
  priority: 'low' | 'medium' | 'high' | 'urgent';
  assigned_to?: string;
  due_date?: string;
  created_at: string;
  updated_at: string;
  assignee?: {
    id: string;
    display_name: string;
    avatar?: string;
  };
  comments: TaskComment[];
}

interface ProjectDocument {
  id: string;
  title: string;
  description?: string;
  file_url: string;
  file_type: string;
  file_size: number;
  uploaded_by: string;
  uploaded_at: string;
  version: number;
  is_latest: boolean;
  uploader?: {
    id: string;
    display_name: string;
    avatar?: string;
  };
}

interface ProjectDiscussion {
  id: string;
  title: string;
  content: string;
  author_id: string;
  created_at: string;
  updated_at: string;
  replies: DiscussionReply[];
  is_pinned: boolean;
  author?: {
    id: string;
    display_name: string;
    avatar?: string;
  };
}

interface DiscussionReply {
  id: string;
  content: string;
  author_id: string;
  created_at: string;
  updated_at: string;
  author?: {
    id: string;
    display_name: string;
    avatar?: string;
  };
}

interface ProjectMilestone {
  id: string;
  title: string;
  description?: string;
  due_date: string;
  status: 'pending' | 'completed' | 'overdue';
  completed_at?: string;
  created_at: string;
}

interface TaskComment {
  id: string;
  content: string;
  author_id: string;
  created_at: string;
  author?: {
    id: string;
    display_name: string;
    avatar?: string;
  };
}

interface ProjectCollaborationToolsProps {
  projectId?: string;
  compact?: boolean;
  onProjectSelect?: (project: Project) => void;
}

export const ProjectCollaborationTools: React.FC<
  ProjectCollaborationToolsProps
> = ({ projectId, compact = false, onProjectSelect }) => {
  const { user } = useAuth();
  const { toast } = useToast();
  const [projects, setProjects] = useState<Project[]>([]);
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState<
    'overview' | 'tasks' | 'documents' | 'discussions' | 'members'
  >('overview');
  const [searchTerm, setSearchTerm] = useState('');
  const [showFilters, setShowFilters] = useState(false);
  const [filters, setFilters] = useState({
    status: '',
    member: '',
    priority: '',
    date_range: '',
  });
  const [showCreateForm, setShowCreateForm] = useState(false);
  const [newTask, setNewTask] = useState({
    title: '',
    description: '',
    priority: 'medium' as const,
    assigned_to: '',
    due_date: '',
  });
  const [newDiscussion, setNewDiscussion] = useState({
    title: '',
    content: '',
  });

  useEffect(() => {
    fetchProjects();
    if (projectId) {
      fetchProject(projectId);
    }
  }, [projectId]);

  const fetchProjects = async () => {
    setLoading(true);
    try {
      // Simulate API call - replace with actual API call
      await new Promise((resolve) => setTimeout(resolve, 1000));

      // Mock data - replace with real data from API
      const mockProjects: Project[] = [
        {
          id: 'project-1',
          title: 'AI Research Project',
          description:
            'Developing machine learning models for natural language processing',
          status: 'active',
          start_date: '2024-01-01',
          end_date: '2024-12-31',
          created_by: 'prof-1',
          created_at: '2024-01-01T00:00:00Z',
          updated_at: '2024-01-15T10:30:00Z',
          progress: 65,
          budget: 50000,
          currency: 'USD',
          tags: ['AI', 'ML', 'NLP'],
          is_public: false,
          members: [
            {
              id: 'member-1',
              user_id: 'prof-1',
              role: 'lead',
              joined_at: '2024-01-01T00:00:00Z',
              permissions: ['admin', 'edit', 'view'],
              user: {
                id: 'prof-1',
                display_name: 'Dr. Sarah Johnson',
                avatar: undefined,
                role: 'professor',
                email: 'sarah@mit.edu',
              },
            },
            {
              id: 'member-2',
              user_id: 'student-1',
              role: 'member',
              joined_at: '2024-01-05T00:00:00Z',
              permissions: ['edit', 'view'],
              user: {
                id: 'student-1',
                display_name: 'Alex Rodriguez',
                avatar: undefined,
                role: 'student',
                email: 'alex@mit.edu',
              },
            },
          ],
          tasks: [
            {
              id: 'task-1',
              title: 'Data Collection',
              description: 'Collect and preprocess training data',
              status: 'completed',
              priority: 'high',
              assigned_to: 'student-1',
              due_date: '2024-01-15',
              created_at: '2024-01-01T00:00:00Z',
              updated_at: '2024-01-15T00:00:00Z',
              assignee: {
                id: 'student-1',
                display_name: 'Alex Rodriguez',
                avatar: undefined,
              },
              comments: [],
            },
            {
              id: 'task-2',
              title: 'Model Training',
              description: 'Train the initial model',
              status: 'in-progress',
              priority: 'high',
              assigned_to: 'student-1',
              due_date: '2024-02-01',
              created_at: '2024-01-01T00:00:00Z',
              updated_at: '2024-01-15T00:00:00Z',
              assignee: {
                id: 'student-1',
                display_name: 'Alex Rodriguez',
                avatar: undefined,
              },
              comments: [],
            },
          ],
          documents: [
            {
              id: 'doc-1',
              title: 'Project Proposal',
              description: 'Initial project proposal document',
              file_url: '/documents/proposal.pdf',
              file_type: 'pdf',
              file_size: 1024000,
              uploaded_by: 'prof-1',
              uploaded_at: '2024-01-01T00:00:00Z',
              version: 1,
              is_latest: true,
              uploader: {
                id: 'prof-1',
                display_name: 'Dr. Sarah Johnson',
                avatar: undefined,
              },
            },
          ],
          discussions: [
            {
              id: 'disc-1',
              title: 'Weekly Progress Update',
              content: "Let's discuss our progress and next steps",
              author_id: 'prof-1',
              created_at: '2024-01-15T10:30:00Z',
              updated_at: '2024-01-15T10:30:00Z',
              is_pinned: true,
              author: {
                id: 'prof-1',
                display_name: 'Dr. Sarah Johnson',
                avatar: undefined,
              },
              replies: [],
            },
          ],
          milestones: [
            {
              id: 'milestone-1',
              title: 'Data Collection Complete',
              description: 'All training data collected and preprocessed',
              due_date: '2024-01-15',
              status: 'completed',
              completed_at: '2024-01-15T00:00:00Z',
              created_at: '2024-01-01T00:00:00Z',
            },
            {
              id: 'milestone-2',
              title: 'Model Training Complete',
              description: 'Initial model trained and validated',
              due_date: '2024-02-01',
              status: 'pending',
              created_at: '2024-01-01T00:00:00Z',
            },
          ],
          creator: {
            id: 'prof-1',
            display_name: 'Dr. Sarah Johnson',
            avatar: undefined,
            role: 'professor',
          },
        },
      ];

      setProjects(mockProjects);
      if (projectId) {
        const project = mockProjects.find((p) => p.id === projectId);
        setSelectedProject(project || null);
      }
    } catch (error) {
      console.error('Error fetching projects:', error);
    } finally {
      setLoading(false);
    }
  };

  const fetchProject = async (id: string) => {
    // Simulate API call - replace with actual API call
    const project = projects.find((p) => p.id === id);
    setSelectedProject(project || null);
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'planning':
        return 'bg-blue-100 text-blue-800';
      case 'active':
        return 'bg-green-100 text-green-800';
      case 'on-hold':
        return 'bg-yellow-100 text-yellow-800';
      case 'completed':
        return 'bg-gray-100 text-gray-800';
      case 'cancelled':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getTaskStatusColor = (status: string) => {
    switch (status) {
      case 'todo':
        return 'bg-gray-100 text-gray-800';
      case 'in-progress':
        return 'bg-blue-100 text-blue-800';
      case 'review':
        return 'bg-yellow-100 text-yellow-800';
      case 'completed':
        return 'bg-green-100 text-green-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'low':
        return 'bg-green-100 text-green-800';
      case 'medium':
        return 'bg-yellow-100 text-yellow-800';
      case 'high':
        return 'bg-orange-100 text-orange-800';
      case 'urgent':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    });
  };

  const formatFileSize = (bytes: number) => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

  const handleCreateTask = async () => {
    if (!selectedProject) return;

    try {
      // Simulate API call - replace with actual API call
      const newTaskData = {
        ...newTask,
        id: `task-${Date.now()}`,
        status: 'todo' as const,
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
        comments: [],
      };

      setSelectedProject((prev) =>
        prev
          ? {
              ...prev,
              tasks: [...prev.tasks, newTaskData],
            }
          : null
      );

      setNewTask({
        title: '',
        description: '',
        priority: 'medium',
        assigned_to: '',
        due_date: '',
      });

      toast({
        title: 'Success',
        description: 'Task created successfully!',
      });
    } catch (error) {
      toast({
        title: 'Error',
        description: 'Failed to create task',
        variant: 'destructive',
      });
    }
  };

  const handleCreateDiscussion = async () => {
    if (!selectedProject) return;

    try {
      // Simulate API call - replace with actual API call
      const newDiscussionData = {
        ...newDiscussion,
        id: `disc-${Date.now()}`,
        author_id: user?.id || '',
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
        is_pinned: false,
        replies: [],
        author: {
          id: user?.id || '',
          display_name: user?.display_name || '',
          avatar: user?.avatar,
        },
      };

      setSelectedProject((prev) =>
        prev
          ? {
              ...prev,
              discussions: [...prev.discussions, newDiscussionData],
            }
          : null
      );

      setNewDiscussion({
        title: '',
        content: '',
      });

      toast({
        title: 'Success',
        description: 'Discussion created successfully!',
      });
    } catch (error) {
      toast({
        title: 'Error',
        description: 'Failed to create discussion',
        variant: 'destructive',
      });
    }
  };

  const clearFilters = () => {
    setFilters({
      status: '',
      member: '',
      priority: '',
      date_range: '',
    });
  };

  if (loading) {
    return (
      <div className='space-y-4'>
        <div className='animate-pulse'>
          <div className='h-4 bg-gray-200 rounded w-1/4 mb-4'></div>
          <div className='space-y-3'>
            {[1, 2, 3, 4, 5].map((i) => (
              <div key={i} className='h-32 bg-gray-200 rounded'></div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  if (compact) {
    return (
      <div className='space-y-4'>
        <div className='flex items-center justify-between'>
          <h3 className='text-sm font-medium'>Projects</h3>
          <Badge variant='outline'>{projects.length}</Badge>
        </div>

        <div className='space-y-2'>
          {projects.slice(0, 3).map((project) => (
            <div key={project.id} className='p-3 border rounded-lg'>
              <div className='flex items-start gap-2 mb-2'>
                <div className='w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center'>
                  <Target className='w-4 h-4 text-blue-600' />
                </div>
                <div className='flex-1 min-w-0'>
                  <p className='text-sm font-medium truncate'>
                    {project.title}
                  </p>
                  <p className='text-xs text-muted-foreground'>
                    {project.creator?.display_name}
                  </p>
                </div>
                <Badge className={`text-xs ${getStatusColor(project.status)}`}>
                  {project.status}
                </Badge>
              </div>
              <p className='text-xs text-muted-foreground line-clamp-2'>
                {project.description}
              </p>
            </div>
          ))}
        </div>

        {projects.length > 3 && (
          <Button variant='outline' size='sm' className='w-full'>
            View All ({projects.length})
          </Button>
        )}
      </div>
    );
  }

  if (selectedProject) {
    return (
      <div className='space-y-6'>
        {/* Project Header */}
        <div className='flex items-center justify-between'>
          <div>
            <h3 className='text-lg font-semibold'>{selectedProject.title}</h3>
            <p className='text-sm text-muted-foreground'>
              {selectedProject.description}
            </p>
          </div>
          <div className='flex items-center gap-2'>
            <Badge
              className={`text-xs ${getStatusColor(selectedProject.status)}`}
            >
              {selectedProject.status}
            </Badge>
            <Badge variant='outline' className='text-xs'>
              {selectedProject.progress}% complete
            </Badge>
          </div>
        </div>

        {/* Tabs */}
        <div className='flex gap-2'>
          {(
            [
              'overview',
              'tasks',
              'documents',
              'discussions',
              'members',
            ] as const
          ).map((tab) => (
            <Button
              key={tab}
              variant={activeTab === tab ? 'default' : 'outline'}
              size='sm'
              onClick={() => setActiveTab(tab)}
            >
              {tab === 'overview' && <Eye className='w-4 h-4 mr-1' />}
              {tab === 'tasks' && <CheckCircle className='w-4 h-4 mr-1' />}
              {tab === 'documents' && <FileText className='w-4 h-4 mr-1' />}
              {tab === 'discussions' && (
                <MessageSquare className='w-4 h-4 mr-1' />
              )}
              {tab === 'members' && <Users className='w-4 h-4 mr-1' />}
              <span className='capitalize'>{tab}</span>
            </Button>
          ))}
        </div>

        {/* Tab Content */}
        {activeTab === 'overview' && (
          <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4'>
            <Card>
              <CardContent className='p-4 text-center'>
                <div className='text-2xl font-bold text-blue-600'>
                  {selectedProject.tasks.length}
                </div>
                <div className='text-xs text-muted-foreground'>Total Tasks</div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className='p-4 text-center'>
                <div className='text-2xl font-bold text-green-600'>
                  {
                    selectedProject.tasks.filter(
                      (t) => t.status === 'completed'
                    ).length
                  }
                </div>
                <div className='text-xs text-muted-foreground'>Completed</div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className='p-4 text-center'>
                <div className='text-2xl font-bold text-yellow-600'>
                  {
                    selectedProject.tasks.filter(
                      (t) => t.status === 'in-progress'
                    ).length
                  }
                </div>
                <div className='text-xs text-muted-foreground'>In Progress</div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className='p-4 text-center'>
                <div className='text-2xl font-bold text-purple-600'>
                  {selectedProject.members.length}
                </div>
                <div className='text-xs text-muted-foreground'>Members</div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className='p-4 text-center'>
                <div className='text-2xl font-bold text-orange-600'>
                  {selectedProject.documents.length}
                </div>
                <div className='text-xs text-muted-foreground'>Documents</div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className='p-4 text-center'>
                <div className='text-2xl font-bold text-indigo-600'>
                  {selectedProject.discussions.length}
                </div>
                <div className='text-xs text-muted-foreground'>Discussions</div>
              </CardContent>
            </Card>
          </div>
        )}

        {activeTab === 'tasks' && (
          <div className='space-y-4'>
            <div className='flex items-center justify-between'>
              <h4 className='font-medium'>Tasks</h4>
              <Button size='sm' onClick={() => setShowCreateForm(true)}>
                <Plus className='w-4 h-4 mr-1' />
                Add Task
              </Button>
            </div>

            {showCreateForm && (
              <Card>
                <CardContent className='p-4 space-y-4'>
                  <div>
                    <Label htmlFor='task-title'>Task Title</Label>
                    <Input
                      id='task-title'
                      value={newTask.title}
                      onChange={(e) =>
                        setNewTask((prev) => ({
                          ...prev,
                          title: e.target.value,
                        }))
                      }
                      placeholder='Enter task title'
                    />
                  </div>
                  <div>
                    <Label htmlFor='task-description'>Description</Label>
                    <Textarea
                      id='task-description'
                      value={newTask.description}
                      onChange={(e) =>
                        setNewTask((prev) => ({
                          ...prev,
                          description: e.target.value,
                        }))
                      }
                      placeholder='Enter task description'
                      rows={3}
                    />
                  </div>
                  <div className='grid grid-cols-2 gap-4'>
                    <div>
                      <Label htmlFor='task-priority'>Priority</Label>
                      <select
                        id='task-priority'
                        value={newTask.priority}
                        onChange={(e) =>
                          setNewTask((prev) => ({
                            ...prev,
                            priority: e.target.value as any,
                          }))
                        }
                        className='w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500'
                      >
                        <option value='low'>Low</option>
                        <option value='medium'>Medium</option>
                        <option value='high'>High</option>
                        <option value='urgent'>Urgent</option>
                      </select>
                    </div>
                    <div>
                      <Label htmlFor='task-due-date'>Due Date</Label>
                      <Input
                        id='task-due-date'
                        type='date'
                        value={newTask.due_date}
                        onChange={(e) =>
                          setNewTask((prev) => ({
                            ...prev,
                            due_date: e.target.value,
                          }))
                        }
                      />
                    </div>
                  </div>
                  <div className='flex gap-2'>
                    <Button onClick={handleCreateTask}>Create Task</Button>
                    <Button
                      variant='outline'
                      onClick={() => setShowCreateForm(false)}
                    >
                      Cancel
                    </Button>
                  </div>
                </CardContent>
              </Card>
            )}

            <div className='space-y-2'>
              {selectedProject.tasks.map((task) => (
                <Card key={task.id}>
                  <CardContent className='p-4'>
                    <div className='flex items-start gap-3'>
                      <div className='flex-1'>
                        <div className='flex items-center gap-2 mb-1'>
                          <h5 className='font-medium'>{task.title}</h5>
                          <Badge
                            className={`text-xs ${getTaskStatusColor(
                              task.status
                            )}`}
                          >
                            {task.status}
                          </Badge>
                          <Badge
                            className={`text-xs ${getPriorityColor(
                              task.priority
                            )}`}
                          >
                            {task.priority}
                          </Badge>
                        </div>
                        <p className='text-sm text-muted-foreground mb-2'>
                          {task.description}
                        </p>
                        <div className='flex items-center gap-4 text-xs text-muted-foreground'>
                          {task.assignee && (
                            <div className='flex items-center gap-1'>
                              <Users className='w-3 h-3' />
                              <span>{task.assignee.display_name}</span>
                            </div>
                          )}
                          {task.due_date && (
                            <div className='flex items-center gap-1'>
                              <Calendar className='w-3 h-3' />
                              <span>Due {formatDate(task.due_date)}</span>
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        )}

        {activeTab === 'documents' && (
          <div className='space-y-4'>
            <div className='flex items-center justify-between'>
              <h4 className='font-medium'>Documents</h4>
              <Button size='sm'>
                <Upload className='w-4 h-4 mr-1' />
                Upload
              </Button>
            </div>

            <div className='space-y-2'>
              {selectedProject.documents.map((doc) => (
                <Card key={doc.id}>
                  <CardContent className='p-4'>
                    <div className='flex items-center gap-3'>
                      <div className='w-10 h-10 bg-gray-100 rounded-lg flex items-center justify-center'>
                        <FileText className='w-5 h-5 text-gray-600' />
                      </div>
                      <div className='flex-1'>
                        <h5 className='font-medium'>{doc.title}</h5>
                        <p className='text-sm text-muted-foreground'>
                          {doc.description} • {formatFileSize(doc.file_size)} •
                          v{doc.version}
                        </p>
                        <p className='text-xs text-muted-foreground'>
                          Uploaded by {doc.uploader?.display_name} on{' '}
                          {formatDate(doc.uploaded_at)}
                        </p>
                      </div>
                      <div className='flex gap-2'>
                        <Button variant='outline' size='sm'>
                          <Download className='w-4 h-4' />
                        </Button>
                        <Button variant='outline' size='sm'>
                          <Share className='w-4 h-4' />
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        )}

        {activeTab === 'discussions' && (
          <div className='space-y-4'>
            <div className='flex items-center justify-between'>
              <h4 className='font-medium'>Discussions</h4>
              <Button size='sm' onClick={() => setShowCreateForm(true)}>
                <Plus className='w-4 h-4 mr-1' />
                New Discussion
              </Button>
            </div>

            {showCreateForm && (
              <Card>
                <CardContent className='p-4 space-y-4'>
                  <div>
                    <Label htmlFor='discussion-title'>Title</Label>
                    <Input
                      id='discussion-title'
                      value={newDiscussion.title}
                      onChange={(e) =>
                        setNewDiscussion((prev) => ({
                          ...prev,
                          title: e.target.value,
                        }))
                      }
                      placeholder='Enter discussion title'
                    />
                  </div>
                  <div>
                    <Label htmlFor='discussion-content'>Content</Label>
                    <Textarea
                      id='discussion-content'
                      value={newDiscussion.content}
                      onChange={(e) =>
                        setNewDiscussion((prev) => ({
                          ...prev,
                          content: e.target.value,
                        }))
                      }
                      placeholder='Enter discussion content'
                      rows={4}
                    />
                  </div>
                  <div className='flex gap-2'>
                    <Button onClick={handleCreateDiscussion}>
                      Create Discussion
                    </Button>
                    <Button
                      variant='outline'
                      onClick={() => setShowCreateForm(false)}
                    >
                      Cancel
                    </Button>
                  </div>
                </CardContent>
              </Card>
            )}

            <div className='space-y-2'>
              {selectedProject.discussions.map((discussion) => (
                <Card key={discussion.id}>
                  <CardContent className='p-4'>
                    <div className='flex items-start gap-3'>
                      <Avatar className='w-8 h-8'>
                        <AvatarImage src={discussion.author?.avatar} />
                        <AvatarFallback>
                          {discussion.author?.display_name.charAt(0)}
                        </AvatarFallback>
                      </Avatar>
                      <div className='flex-1'>
                        <div className='flex items-center gap-2 mb-1'>
                          <h5 className='font-medium'>{discussion.title}</h5>
                          {discussion.is_pinned && (
                            <Star className='w-4 h-4 text-yellow-600' />
                          )}
                        </div>
                        <p className='text-sm text-muted-foreground mb-2'>
                          {discussion.content}
                        </p>
                        <div className='flex items-center gap-4 text-xs text-muted-foreground'>
                          <span>by {discussion.author?.display_name}</span>
                          <span>•</span>
                          <span>{formatDate(discussion.created_at)}</span>
                          <span>•</span>
                          <span>{discussion.replies.length} replies</span>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        )}

        {activeTab === 'members' && (
          <div className='space-y-4'>
            <div className='flex items-center justify-between'>
              <h4 className='font-medium'>Members</h4>
              <Button size='sm'>
                <UserPlus className='w-4 h-4 mr-1' />
                Invite
              </Button>
            </div>

            <div className='space-y-2'>
              {selectedProject.members.map((member) => (
                <Card key={member.id}>
                  <CardContent className='p-4'>
                    <div className='flex items-center gap-3'>
                      <Avatar className='w-10 h-10'>
                        <AvatarImage src={member.user?.avatar} />
                        <AvatarFallback>
                          {member.user?.display_name.charAt(0)}
                        </AvatarFallback>
                      </Avatar>
                      <div className='flex-1'>
                        <h5 className='font-medium'>
                          {member.user?.display_name}
                        </h5>
                        <p className='text-sm text-muted-foreground'>
                          {member.user?.role} • {member.user?.email}
                        </p>
                        <p className='text-xs text-muted-foreground'>
                          Joined {formatDate(member.joined_at)}
                        </p>
                      </div>
                      <div className='flex items-center gap-2'>
                        <Badge variant='outline' className='text-xs'>
                          {member.role}
                        </Badge>
                        <Button variant='ghost' size='sm'>
                          <MoreHorizontal className='w-4 h-4' />
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        )}
      </div>
    );
  }

  return (
    <div className='space-y-6'>
      {/* Header */}
      <div className='flex items-center justify-between'>
        <div>
          <h3 className='text-lg font-semibold'>Project Collaboration</h3>
          <p className='text-sm text-muted-foreground'>
            Manage your research projects and collaborate with team members
          </p>
        </div>
        <Button>
          <Plus className='w-4 h-4 mr-2' />
          New Project
        </Button>
      </div>

      {/* Projects List */}
      {projects.length === 0 ? (
        <Card>
          <CardContent className='p-6 text-center'>
            <Target className='w-12 h-12 text-muted-foreground mx-auto mb-4' />
            <h3 className='text-lg font-medium mb-2'>No projects found</h3>
            <p className='text-muted-foreground'>
              Create your first project to start collaborating
            </p>
          </CardContent>
        </Card>
      ) : (
        <div className='space-y-4'>
          {projects.map((project) => (
            <Card
              key={project.id}
              className='hover:shadow-md transition-shadow'
            >
              <CardContent className='p-4'>
                <div className='flex items-start gap-3'>
                  <div className='w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center'>
                    <Target className='w-6 h-6 text-blue-600' />
                  </div>

                  <div className='flex-1 min-w-0'>
                    <div className='flex items-center gap-2 mb-1'>
                      <h4 className='font-medium truncate'>{project.title}</h4>
                      <Badge
                        className={`text-xs ${getStatusColor(project.status)}`}
                      >
                        {project.status}
                      </Badge>
                      <Badge variant='outline' className='text-xs'>
                        {project.progress}% complete
                      </Badge>
                    </div>

                    <p className='text-sm text-muted-foreground mb-2 line-clamp-2'>
                      {project.description}
                    </p>

                    <div className='flex items-center gap-4 text-sm text-muted-foreground'>
                      <div className='flex items-center gap-1'>
                        <Users className='w-4 h-4' />
                        <span>{project.members.length} members</span>
                      </div>
                      <div className='flex items-center gap-1'>
                        <CheckCircle className='w-4 h-4' />
                        <span>{project.tasks.length} tasks</span>
                      </div>
                      <div className='flex items-center gap-1'>
                        <Calendar className='w-4 h-4' />
                        <span>Started {formatDate(project.start_date)}</span>
                      </div>
                    </div>
                  </div>

                  <div className='flex flex-col gap-2'>
                    <Button
                      variant='outline'
                      size='sm'
                      onClick={() => setSelectedProject(project)}
                    >
                      <Eye className='w-4 h-4 mr-1' />
                      View
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
};
