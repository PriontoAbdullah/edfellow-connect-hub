import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Textarea } from '@/components/ui/textarea';
import {
  MessageSquare,
  Pin,
  Lock,
  Plus,
  Search,
  Filter,
  MoreHorizontal,
  ThumbsUp,
  Reply,
  Eye,
  Calendar,
  Tag,
  AlertCircle,
  CheckCircle,
  BookOpen,
  FileText,
  HelpCircle,
  BarChart3,
  X,
  Star,
} from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';
import { useToast } from '@/hooks/use-toast';
import {
  getForumThreads,
  createForumThread,
  getForumReplies,
  createForumReply,
  markReplyAsSolution,
  type ForumThread,
  type ForumReply,
} from '@/lib/api/forums';

interface ForumThreadsProps {
  categoryId?: string;
  compact?: boolean;
}

export const ForumThreads: React.FC<ForumThreadsProps> = ({
  categoryId,
  compact = false,
}) => {
  const { user } = useAuth();
  const { toast } = useToast();
  const [threads, setThreads] = useState<ForumThread[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [sortBy, setSortBy] = useState<'recent' | 'popular' | 'replies'>(
    'recent'
  );
  const [showCreateForm, setShowCreateForm] = useState(false);
  const [selectedThread, setSelectedThread] = useState<ForumThread | null>(
    null
  );
  const [replies, setReplies] = useState<ForumReply[]>([]);
  const [newThread, setNewThread] = useState({
    title: '',
    content: '',
    tags: [] as string[],
    is_announcement: false,
  });
  const [newReply, setNewReply] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalCount, setTotalCount] = useState(0);
  const threadsPerPage = 10;

  useEffect(() => {
    fetchThreads();
  }, [categoryId, searchTerm, sortBy, currentPage]);

  const fetchThreads = async () => {
    setLoading(true);
    try {
      const filters: any = {};

      if (searchTerm) {
        filters.search = searchTerm;
      }

      const { data, error, count } = await getForumThreads(
        categoryId,
        filters,
        {
          page: currentPage,
          limit: threadsPerPage,
        }
      );

      if (error) {
        toast({
          title: 'Error',
          description: error,
          variant: 'destructive',
        });
        return;
      }

      setThreads(data || []);
      setTotalCount(count || 0);
    } catch (error) {
      console.error('Error fetching threads:', error);
    } finally {
      setLoading(false);
    }
  };

  const fetchReplies = async (threadId: string) => {
    try {
      const { data, error } = await getForumReplies(threadId);

      if (error) {
        console.error('Error fetching replies:', error);
        return;
      }

      setReplies(data || []);
    } catch (error) {
      console.error('Error fetching replies:', error);
    }
  };

  const handleCreateThread = async () => {
    if (!categoryId) {
      toast({
        title: 'Error',
        description: 'Please select a category first',
        variant: 'destructive',
      });
      return;
    }

    if (!newThread.title.trim() || !newThread.content.trim()) {
      toast({
        title: 'Error',
        description: 'Please fill in all required fields',
        variant: 'destructive',
      });
      return;
    }

    setIsSubmitting(true);
    try {
      const { data, error } = await createForumThread(categoryId, newThread);

      if (error) {
        toast({
          title: 'Error',
          description: error,
          variant: 'destructive',
        });
        return;
      }

      toast({
        title: 'Success',
        description: 'Thread created successfully!',
      });

      setNewThread({
        title: '',
        content: '',
        tags: [],
        is_announcement: false,
      });
      setShowCreateForm(false);
      fetchThreads();
    } catch (error) {
      toast({
        title: 'Error',
        description: 'Failed to create thread',
        variant: 'destructive',
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleCreateReply = async (threadId: string) => {
    if (!newReply.trim()) {
      toast({
        title: 'Error',
        description: 'Please enter a reply',
        variant: 'destructive',
      });
      return;
    }

    try {
      const { data, error } = await createForumReply(threadId, newReply);

      if (error) {
        toast({
          title: 'Error',
          description: error,
          variant: 'destructive',
        });
        return;
      }

      setNewReply('');
      fetchReplies(threadId);
    } catch (error) {
      toast({
        title: 'Error',
        description: 'Failed to create reply',
        variant: 'destructive',
      });
    }
  };

  const handleMarkAsSolution = async (replyId: string) => {
    try {
      const { error } = await markReplyAsSolution(replyId);

      if (error) {
        toast({
          title: 'Error',
          description: error,
          variant: 'destructive',
        });
        return;
      }

      toast({
        title: 'Success',
        description: 'Reply marked as solution!',
      });

      // Refresh replies
      if (selectedThread) {
        fetchReplies(selectedThread.id);
      }
    } catch (error) {
      toast({
        title: 'Error',
        description: 'Failed to mark as solution',
        variant: 'destructive',
      });
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

  const getSortIcon = (sort: string) => {
    switch (sort) {
      case 'recent':
        return <Calendar className='w-4 h-4' />;
      case 'popular':
        return <ThumbsUp className='w-4 h-4' />;
      case 'replies':
        return <MessageSquare className='w-4 h-4' />;
      default:
        return <Calendar className='w-4 h-4' />;
    }
  };

  if (loading) {
    return (
      <div className='space-y-4'>
        <div className='animate-pulse'>
          <div className='h-4 bg-gray-200 rounded w-1/4 mb-4'></div>
          <div className='space-y-3'>
            {[1, 2, 3, 4, 5].map((i) => (
              <div key={i} className='h-24 bg-gray-200 rounded'></div>
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
          <h3 className='text-sm font-medium'>Recent Threads</h3>
          <Badge variant='outline'>{threads.length}</Badge>
        </div>

        <div className='space-y-2'>
          {threads.slice(0, 5).map((thread) => (
            <div key={thread.id} className='p-3 border rounded-lg'>
              <div className='flex items-start gap-2 mb-2'>
                <Avatar className='w-6 h-6'>
                  <AvatarImage src={thread.author?.avatar} />
                  <AvatarFallback>
                    {thread.author?.display_name?.charAt(0)}
                  </AvatarFallback>
                </Avatar>
                <div className='flex-1 min-w-0'>
                  <p className='text-sm font-medium truncate'>{thread.title}</p>
                  <p className='text-xs text-muted-foreground'>
                    {thread.author?.display_name}
                  </p>
                </div>
                {thread.is_pinned && (
                  <Pin className='w-3 h-3 text-yellow-600' />
                )}
              </div>
              <p className='text-xs text-muted-foreground line-clamp-2'>
                {thread.content}
              </p>
            </div>
          ))}
        </div>

        {threads.length > 5 && (
          <Button variant='outline' size='sm' className='w-full'>
            View All ({threads.length})
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
          <h3 className='text-lg font-semibold'>Forum Threads</h3>
          <p className='text-sm text-muted-foreground'>
            {totalCount} threads in this category
          </p>
        </div>
        {user && (
          <Button onClick={() => setShowCreateForm(true)}>
            <Plus className='w-4 h-4 mr-2' />
            New Thread
          </Button>
        )}
      </div>

      {/* Filters */}
      <div className='flex gap-4 flex-wrap'>
        <div className='relative flex-1 min-w-64'>
          <Search className='absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4' />
          <input
            type='text'
            placeholder='Search threads...'
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className='w-full pl-10 pr-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500'
          />
        </div>

        <select
          value={sortBy}
          onChange={(e) => setSortBy(e.target.value as any)}
          className='px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500'
        >
          <option value='recent'>Most Recent</option>
          <option value='popular'>Most Popular</option>
          <option value='replies'>Most Replies</option>
        </select>

        <Button variant='outline' onClick={fetchThreads}>
          <Filter className='w-4 h-4 mr-2' />
          Apply
        </Button>
      </div>

      {/* Create Thread Form */}
      {showCreateForm && (
        <Card>
          <CardHeader>
            <CardTitle>Create New Thread</CardTitle>
          </CardHeader>
          <CardContent className='space-y-4'>
            <div>
              <label className='block text-sm font-medium mb-1'>Title *</label>
              <input
                type='text'
                value={newThread.title}
                onChange={(e) =>
                  setNewThread((prev) => ({ ...prev, title: e.target.value }))
                }
                placeholder='Enter thread title'
                className='w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500'
              />
            </div>

            <div>
              <label className='block text-sm font-medium mb-1'>
                Content *
              </label>
              <Textarea
                value={newThread.content}
                onChange={(e) =>
                  setNewThread((prev) => ({ ...prev, content: e.target.value }))
                }
                placeholder='Write your thread content...'
                rows={6}
              />
            </div>

            <div className='flex items-center gap-2'>
              <input
                type='checkbox'
                id='announcement'
                checked={newThread.is_announcement}
                onChange={(e) =>
                  setNewThread((prev) => ({
                    ...prev,
                    is_announcement: e.target.checked,
                  }))
                }
                className='rounded'
              />
              <label htmlFor='announcement' className='text-sm'>
                Mark as announcement
              </label>
            </div>

            <div className='flex gap-2'>
              <Button onClick={handleCreateThread} disabled={isSubmitting}>
                {isSubmitting ? 'Creating...' : 'Create Thread'}
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

      {/* Threads List */}
      {threads.length === 0 ? (
        <Card>
          <CardContent className='p-6 text-center'>
            <MessageSquare className='w-12 h-12 text-muted-foreground mx-auto mb-4' />
            <h3 className='text-lg font-medium mb-2'>No threads yet</h3>
            <p className='text-muted-foreground mb-4'>
              Be the first to start a discussion in this category
            </p>
            {user && (
              <Button onClick={() => setShowCreateForm(true)}>
                <Plus className='w-4 h-4 mr-2' />
                Create First Thread
              </Button>
            )}
          </CardContent>
        </Card>
      ) : (
        <div className='space-y-4'>
          {threads.map((thread) => (
            <Card key={thread.id} className='hover:shadow-md transition-shadow'>
              <CardHeader className='pb-3'>
                <div className='flex items-start gap-3'>
                  <Avatar className='w-10 h-10'>
                    <AvatarImage src={thread.author?.avatar} />
                    <AvatarFallback>
                      {thread.author?.display_name?.charAt(0)}
                    </AvatarFallback>
                  </Avatar>

                  <div className='flex-1 min-w-0'>
                    <div className='flex items-center gap-2 mb-1'>
                      <CardTitle className='text-base truncate'>
                        {thread.title}
                      </CardTitle>
                      {thread.is_pinned && (
                        <Pin className='w-4 h-4 text-yellow-600' />
                      )}
                      {thread.is_locked && (
                        <Lock className='w-4 h-4 text-red-600' />
                      )}
                      {thread.is_announcement && (
                        <AlertCircle className='w-4 h-4 text-blue-600' />
                      )}
                    </div>

                    <div className='flex items-center gap-2 text-sm text-muted-foreground'>
                      <span>{thread.author?.display_name}</span>
                      <span>•</span>
                      <span>{formatDate(thread.created_at)}</span>
                      {thread.last_reply_at && (
                        <>
                          <span>•</span>
                          <span>
                            Last reply {formatDate(thread.last_reply_at)}
                          </span>
                        </>
                      )}
                    </div>
                  </div>

                  <Button variant='ghost' size='sm'>
                    <MoreHorizontal className='w-4 h-4' />
                  </Button>
                </div>
              </CardHeader>

              <CardContent className='pt-0'>
                <p className='text-sm text-muted-foreground mb-4 line-clamp-3'>
                  {thread.content}
                </p>

                {/* Tags */}
                {thread.tags && thread.tags.length > 0 && (
                  <div className='flex flex-wrap gap-1 mb-4'>
                    {thread.tags.map((tag, index) => (
                      <Badge key={index} variant='outline' className='text-xs'>
                        <Tag className='w-3 h-3 mr-1' />
                        {tag}
                      </Badge>
                    ))}
                  </div>
                )}

                {/* Stats */}
                <div className='flex items-center justify-between'>
                  <div className='flex items-center gap-4 text-sm text-muted-foreground'>
                    <div className='flex items-center gap-1'>
                      <MessageSquare className='w-4 h-4' />
                      <span>{thread.reply_count} replies</span>
                    </div>
                    <div className='flex items-center gap-1'>
                      <Eye className='w-4 h-4' />
                      <span>{thread.view_count} views</span>
                    </div>
                  </div>

                  <div className='flex gap-2'>
                    <Button
                      variant='outline'
                      size='sm'
                      onClick={() => {
                        setSelectedThread(thread);
                        fetchReplies(thread.id);
                      }}
                    >
                      <Reply className='w-4 h-4 mr-1' />
                      Reply
                    </Button>
                    <Button variant='ghost' size='sm'>
                      <ThumbsUp className='w-4 h-4' />
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}

      {/* Pagination */}
      {totalCount > threadsPerPage && (
        <div className='flex justify-center gap-2'>
          <Button
            variant='outline'
            size='sm'
            onClick={() => setCurrentPage((prev) => Math.max(1, prev - 1))}
            disabled={currentPage === 1}
          >
            Previous
          </Button>
          <span className='px-3 py-2 text-sm text-muted-foreground'>
            Page {currentPage} of {Math.ceil(totalCount / threadsPerPage)}
          </span>
          <Button
            variant='outline'
            size='sm'
            onClick={() => setCurrentPage((prev) => prev + 1)}
            disabled={currentPage >= Math.ceil(totalCount / threadsPerPage)}
          >
            Next
          </Button>
        </div>
      )}

      {/* Thread Detail Modal */}
      {selectedThread && (
        <Card className='fixed inset-4 z-50 overflow-auto'>
          <CardHeader>
            <div className='flex items-center justify-between'>
              <CardTitle>{selectedThread.title}</CardTitle>
              <Button
                variant='ghost'
                size='sm'
                onClick={() => setSelectedThread(null)}
              >
                <X className='w-4 h-4' />
              </Button>
            </div>
          </CardHeader>
          <CardContent>
            <div className='space-y-4'>
              {/* Thread Content */}
              <div className='p-4 bg-gray-50 rounded-lg'>
                <div className='flex items-center gap-2 mb-2'>
                  <Avatar className='w-8 h-8'>
                    <AvatarImage src={selectedThread.author?.avatar} />
                    <AvatarFallback>
                      {selectedThread.author?.display_name?.charAt(0)}
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <p className='text-sm font-medium'>
                      {selectedThread.author?.display_name}
                    </p>
                    <p className='text-xs text-muted-foreground'>
                      {formatDate(selectedThread.created_at)}
                    </p>
                  </div>
                </div>
                <p className='text-sm'>{selectedThread.content}</p>
              </div>

              {/* Replies */}
              <div className='space-y-3'>
                <h4 className='font-medium'>Replies ({replies.length})</h4>
                {replies.map((reply) => (
                  <div
                    key={reply.id}
                    className='flex gap-3 p-3 border rounded-lg'
                  >
                    <Avatar className='w-8 h-8'>
                      <AvatarImage src={reply.author?.avatar} />
                      <AvatarFallback>
                        {reply.author?.display_name?.charAt(0)}
                      </AvatarFallback>
                    </Avatar>
                    <div className='flex-1'>
                      <div className='flex items-center gap-2 mb-1'>
                        <span className='text-sm font-medium'>
                          {reply.author?.display_name}
                        </span>
                        <span className='text-xs text-muted-foreground'>
                          {formatDate(reply.created_at)}
                        </span>
                        {reply.is_solution && (
                          <Badge className='bg-green-100 text-green-800 text-xs'>
                            <CheckCircle className='w-3 h-3 mr-1' />
                            Solution
                          </Badge>
                        )}
                      </div>
                      <p className='text-sm'>{reply.content}</p>
                      {!reply.is_solution && user && (
                        <Button
                          variant='ghost'
                          size='sm'
                          className='mt-2'
                          onClick={() => handleMarkAsSolution(reply.id)}
                        >
                          <Star className='w-4 h-4 mr-1' />
                          Mark as Solution
                        </Button>
                      )}
                    </div>
                  </div>
                ))}
              </div>

              {/* Add Reply */}
              {user && (
                <div className='space-y-2'>
                  <label className='block text-sm font-medium'>Add Reply</label>
                  <Textarea
                    value={newReply}
                    onChange={(e) => setNewReply(e.target.value)}
                    placeholder='Write a reply...'
                    rows={3}
                  />
                  <Button
                    onClick={() => handleCreateReply(selectedThread.id)}
                    disabled={!newReply.trim()}
                  >
                    Post Reply
                  </Button>
                </div>
              )}
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
};
