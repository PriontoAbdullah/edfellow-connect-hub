import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import {
  Users,
  Filter,
  Search,
  Globe,
  GraduationCap,
  Building2,
  MapPin,
  Star,
  TrendingUp,
  Eye,
  MessageCircle,
  Heart,
  Share,
  Bookmark,
  MoreHorizontal,
} from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';
import { useToast } from '@/hooks/use-toast';
import { getConnections } from '@/lib/api/connections';

interface FilteredContent {
  id: string;
  type: 'post' | 'article' | 'event' | 'job' | 'research';
  title: string;
  content: string;
  author: {
    id: string;
    display_name: string;
    avatar?: string;
    role: 'student' | 'professor' | 'university';
    university?: string;
  };
  connection_level: 'direct' | 'mutual' | 'university' | 'field' | 'public';
  engagement: {
    likes: number;
    comments: number;
    shares: number;
    views: number;
  };
  tags: string[];
  created_at: string;
  relevance_score: number;
}

interface ConnectionFilteringProps {
  userId: string;
  compact?: boolean;
}

export const ConnectionFiltering: React.FC<ConnectionFilteringProps> = ({
  userId,
  compact = false,
}) => {
  const { user } = useAuth();
  const { toast } = useToast();
  const [connections, setConnections] = useState<any[]>([]);
  const [filteredContent, setFilteredContent] = useState<FilteredContent[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [connectionFilter, setConnectionFilter] = useState<
    'all' | 'direct' | 'mutual' | 'university' | 'field' | 'public'
  >('all');
  const [contentTypeFilter, setContentTypeFilter] = useState<
    'all' | 'post' | 'article' | 'event' | 'job' | 'research'
  >('all');
  const [sortBy, setSortBy] = useState<'relevance' | 'recent' | 'popular'>(
    'relevance'
  );

  useEffect(() => {
    fetchConnections();
  }, [userId]);

  useEffect(() => {
    if (connections.length > 0) {
      fetchFilteredContent();
    }
  }, [connections, connectionFilter, contentTypeFilter, sortBy, searchTerm]);

  const fetchConnections = async () => {
    if (!user) return;

    try {
      const { data, error } = await getConnections(user.id);
      if (error) {
        toast({
          title: 'Error',
          description: error,
          variant: 'destructive',
        });
        return;
      }
      setConnections(data || []);
    } catch (error) {
      console.error('Error fetching connections:', error);
    }
  };

  const fetchFilteredContent = async () => {
    setLoading(true);
    try {
      // Simulate API call - replace with actual API call
      await new Promise((resolve) => setTimeout(resolve, 1000));

      // Mock data - replace with real data from API
      const mockContent: FilteredContent[] = [
        {
          id: '1',
          type: 'post',
          title: 'New Research on Machine Learning in Education',
          content:
            'Excited to share our latest findings on how ML can personalize learning experiences for students...',
          author: {
            id: '1',
            display_name: 'Dr. Sarah Johnson',
            avatar: undefined,
            role: 'professor',
            university: 'MIT',
          },
          connection_level: 'direct',
          engagement: {
            likes: 24,
            comments: 8,
            shares: 3,
            views: 156,
          },
          tags: ['Machine Learning', 'Education', 'Research'],
          created_at: '2024-01-15T10:30:00Z',
          relevance_score: 95,
        },
        {
          id: '2',
          type: 'article',
          title: 'The Future of Online Learning Platforms',
          content:
            'As we move into 2024, online learning platforms are evolving rapidly. Here are the key trends...',
          author: {
            id: '2',
            display_name: 'Alex Chen',
            avatar: undefined,
            role: 'student',
            university: 'Stanford University',
          },
          connection_level: 'mutual',
          engagement: {
            likes: 18,
            comments: 12,
            shares: 7,
            views: 234,
          },
          tags: ['Online Learning', 'EdTech', 'Future'],
          created_at: '2024-01-14T15:45:00Z',
          relevance_score: 88,
        },
        {
          id: '3',
          type: 'event',
          title: 'AI in Education Conference 2024',
          content:
            'Join us for the annual AI in Education Conference featuring keynote speakers from leading universities...',
          author: {
            id: '3',
            display_name: 'University of Toronto',
            avatar: undefined,
            role: 'university',
            university: 'University of Toronto',
          },
          connection_level: 'university',
          engagement: {
            likes: 45,
            comments: 23,
            shares: 15,
            views: 567,
          },
          tags: ['AI', 'Conference', 'Education'],
          created_at: '2024-01-13T09:00:00Z',
          relevance_score: 82,
        },
        {
          id: '4',
          type: 'job',
          title: 'Research Assistant Position - Computer Science',
          content:
            'We are looking for a motivated research assistant to join our team working on distributed systems...',
          author: {
            id: '4',
            display_name: 'Dr. Maria Rodriguez',
            avatar: undefined,
            role: 'professor',
            university: 'MIT',
          },
          connection_level: 'field',
          engagement: {
            likes: 12,
            comments: 5,
            shares: 8,
            views: 89,
          },
          tags: ['Research', 'Computer Science', 'Job'],
          created_at: '2024-01-12T14:20:00Z',
          relevance_score: 75,
        },
        {
          id: '5',
          type: 'research',
          title: 'Novel Approaches to Natural Language Processing',
          content:
            'Our research team has developed new techniques for improving NLP model performance...',
          author: {
            id: '5',
            display_name: 'James Wilson',
            avatar: undefined,
            role: 'student',
            university: 'Harvard University',
          },
          connection_level: 'public',
          engagement: {
            likes: 31,
            comments: 9,
            shares: 4,
            views: 198,
          },
          tags: ['NLP', 'Research', 'AI'],
          created_at: '2024-01-11T11:15:00Z',
          relevance_score: 70,
        },
      ];

      // Apply filters
      let filtered = mockContent;

      if (connectionFilter !== 'all') {
        filtered = filtered.filter(
          (content) => content.connection_level === connectionFilter
        );
      }

      if (contentTypeFilter !== 'all') {
        filtered = filtered.filter(
          (content) => content.type === contentTypeFilter
        );
      }

      if (searchTerm) {
        filtered = filtered.filter(
          (content) =>
            content.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
            content.content.toLowerCase().includes(searchTerm.toLowerCase()) ||
            content.tags.some((tag) =>
              tag.toLowerCase().includes(searchTerm.toLowerCase())
            )
        );
      }

      // Apply sorting
      filtered.sort((a, b) => {
        switch (sortBy) {
          case 'relevance':
            return b.relevance_score - a.relevance_score;
          case 'recent':
            return (
              new Date(b.created_at).getTime() -
              new Date(a.created_at).getTime()
            );
          case 'popular':
            return (
              b.engagement.likes +
              b.engagement.comments +
              b.engagement.shares -
              (a.engagement.likes + a.engagement.comments + a.engagement.shares)
            );
          default:
            return 0;
        }
      });

      setFilteredContent(filtered);
    } catch (error) {
      console.error('Error fetching filtered content:', error);
    } finally {
      setLoading(false);
    }
  };

  const getConnectionLevelIcon = (level: string) => {
    switch (level) {
      case 'direct':
        return <Users className='w-4 h-4' />;
      case 'mutual':
        return <Users className='w-4 h-4' />;
      case 'university':
        return <GraduationCap className='w-4 h-4' />;
      case 'field':
        return <Building2 className='w-4 h-4' />;
      case 'public':
        return <Globe className='w-4 h-4' />;
      default:
        return <Users className='w-4 h-4' />;
    }
  };

  const getConnectionLevelColor = (level: string) => {
    switch (level) {
      case 'direct':
        return 'bg-green-100 text-green-800';
      case 'mutual':
        return 'bg-blue-100 text-blue-800';
      case 'university':
        return 'bg-purple-100 text-purple-800';
      case 'field':
        return 'bg-orange-100 text-orange-800';
      case 'public':
        return 'bg-gray-100 text-gray-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getContentTypeIcon = (type: string) => {
    switch (type) {
      case 'post':
        return <MessageCircle className='w-4 h-4' />;
      case 'article':
        return <Bookmark className='w-4 h-4' />;
      case 'event':
        return <Calendar className='w-4 h-4' />;
      case 'job':
        return <Briefcase className='w-4 h-4' />;
      case 'research':
        return <TrendingUp className='w-4 h-4' />;
      default:
        return <MessageCircle className='w-4 h-4' />;
    }
  };

  const getRoleIcon = (role: string) => {
    switch (role) {
      case 'professor':
        return <GraduationCap className='w-4 h-4' />;
      case 'university':
        return <Building2 className='w-4 h-4' />;
      default:
        return <Users className='w-4 h-4' />;
    }
  };

  const getRoleColor = (role: string) => {
    switch (role) {
      case 'professor':
        return 'bg-blue-100 text-blue-800';
      case 'university':
        return 'bg-purple-100 text-purple-800';
      default:
        return 'bg-green-100 text-green-800';
    }
  };

  if (loading) {
    return (
      <div className='space-y-4'>
        <div className='animate-pulse'>
          <div className='h-4 bg-gray-200 rounded w-1/4 mb-4'></div>
          <div className='space-y-3'>
            {[1, 2, 3].map((i) => (
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
          <h3 className='text-sm font-medium'>Filtered Content</h3>
          <Badge variant='outline'>{filteredContent.length}</Badge>
        </div>

        <div className='space-y-2'>
          {filteredContent.slice(0, 3).map((content) => (
            <div key={content.id} className='p-3 border rounded-lg'>
              <div className='flex items-start gap-2 mb-2'>
                <Avatar className='w-6 h-6'>
                  <AvatarImage src={content.author.avatar} />
                  <AvatarFallback>
                    {content.author.display_name.charAt(0)}
                  </AvatarFallback>
                </Avatar>
                <div className='flex-1 min-w-0'>
                  <p className='text-sm font-medium truncate'>
                    {content.title}
                  </p>
                  <p className='text-xs text-muted-foreground'>
                    {content.author.display_name}
                  </p>
                </div>
                <Badge
                  className={`text-xs ${getConnectionLevelColor(
                    content.connection_level
                  )}`}
                >
                  {getConnectionLevelIcon(content.connection_level)}
                </Badge>
              </div>
              <p className='text-xs text-muted-foreground line-clamp-2'>
                {content.content}
              </p>
            </div>
          ))}
        </div>

        {filteredContent.length > 3 && (
          <Button variant='outline' size='sm' className='w-full'>
            View All ({filteredContent.length})
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
          <h3 className='text-lg font-semibold'>Connection-Based Content</h3>
          <p className='text-sm text-muted-foreground'>
            {filteredContent.length} items from your network
          </p>
        </div>
        <Button variant='outline' onClick={fetchFilteredContent}>
          <TrendingUp className='w-4 h-4 mr-2' />
          Refresh
        </Button>
      </div>

      {/* Filters */}
      <div className='space-y-4'>
        {/* Search */}
        <div className='relative'>
          <Search className='absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4' />
          <input
            type='text'
            placeholder='Search content...'
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className='w-full pl-10 pr-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500'
          />
        </div>

        {/* Connection Level Filter */}
        <div className='flex gap-2 flex-wrap'>
          <span className='text-sm font-medium self-center'>Connection:</span>
          {(
            [
              'all',
              'direct',
              'mutual',
              'university',
              'field',
              'public',
            ] as const
          ).map((level) => (
            <Button
              key={level}
              variant={connectionFilter === level ? 'default' : 'outline'}
              size='sm'
              onClick={() => setConnectionFilter(level)}
            >
              {level !== 'all' && getConnectionLevelIcon(level)}
              <span className='ml-1 capitalize'>{level}</span>
            </Button>
          ))}
        </div>

        {/* Content Type Filter */}
        <div className='flex gap-2 flex-wrap'>
          <span className='text-sm font-medium self-center'>Type:</span>
          {(
            ['all', 'post', 'article', 'event', 'job', 'research'] as const
          ).map((type) => (
            <Button
              key={type}
              variant={contentTypeFilter === type ? 'default' : 'outline'}
              size='sm'
              onClick={() => setContentTypeFilter(type)}
            >
              {type !== 'all' && getContentTypeIcon(type)}
              <span className='ml-1 capitalize'>{type}</span>
            </Button>
          ))}
        </div>

        {/* Sort */}
        <div className='flex gap-2 flex-wrap'>
          <span className='text-sm font-medium self-center'>Sort by:</span>
          {(['relevance', 'recent', 'popular'] as const).map((sort) => (
            <Button
              key={sort}
              variant={sortBy === sort ? 'default' : 'outline'}
              size='sm'
              onClick={() => setSortBy(sort)}
            >
              <span className='capitalize'>{sort}</span>
            </Button>
          ))}
        </div>
      </div>

      {/* Content List */}
      {filteredContent.length === 0 ? (
        <Card>
          <CardContent className='p-6 text-center'>
            <Filter className='w-12 h-12 text-muted-foreground mx-auto mb-4' />
            <h3 className='text-lg font-medium mb-2'>No content found</h3>
            <p className='text-muted-foreground'>
              Try adjusting your filters or search terms
            </p>
          </CardContent>
        </Card>
      ) : (
        <div className='space-y-4'>
          {filteredContent.map((content) => (
            <Card key={content.id}>
              <CardContent className='p-4'>
                <div className='flex items-start gap-3'>
                  <Avatar className='w-10 h-10'>
                    <AvatarImage src={content.author.avatar} />
                    <AvatarFallback>
                      {content.author.display_name.charAt(0)}
                    </AvatarFallback>
                  </Avatar>

                  <div className='flex-1 min-w-0'>
                    <div className='flex items-center gap-2 mb-1'>
                      <h4 className='font-medium truncate'>{content.title}</h4>
                      <Badge
                        className={`text-xs ${getConnectionLevelColor(
                          content.connection_level
                        )}`}
                      >
                        {getConnectionLevelIcon(content.connection_level)}
                        <span className='ml-1 capitalize'>
                          {content.connection_level}
                        </span>
                      </Badge>
                      <Badge variant='outline' className='text-xs'>
                        {getContentTypeIcon(content.type)}
                        <span className='ml-1 capitalize'>{content.type}</span>
                      </Badge>
                    </div>

                    <div className='flex items-center gap-2 text-sm text-muted-foreground mb-2'>
                      <span>{content.author.display_name}</span>
                      <Badge
                        className={`text-xs ${getRoleColor(
                          content.author.role
                        )}`}
                      >
                        {getRoleIcon(content.author.role)}
                        <span className='ml-1 capitalize'>
                          {content.author.role}
                        </span>
                      </Badge>
                      {content.author.university && (
                        <span>• {content.author.university}</span>
                      )}
                    </div>

                    <p className='text-sm text-muted-foreground mb-3 line-clamp-3'>
                      {content.content}
                    </p>

                    {/* Tags */}
                    <div className='flex flex-wrap gap-1 mb-3'>
                      {content.tags.map((tag, index) => (
                        <Badge
                          key={index}
                          variant='outline'
                          className='text-xs'
                        >
                          {tag}
                        </Badge>
                      ))}
                    </div>

                    {/* Engagement Stats */}
                    <div className='flex items-center gap-4 text-sm text-muted-foreground'>
                      <div className='flex items-center gap-1'>
                        <Heart className='w-4 h-4' />
                        <span>{content.engagement.likes}</span>
                      </div>
                      <div className='flex items-center gap-1'>
                        <MessageCircle className='w-4 h-4' />
                        <span>{content.engagement.comments}</span>
                      </div>
                      <div className='flex items-center gap-1'>
                        <Share className='w-4 h-4' />
                        <span>{content.engagement.shares}</span>
                      </div>
                      <div className='flex items-center gap-1'>
                        <Eye className='w-4 h-4' />
                        <span>{content.engagement.views}</span>
                      </div>
                      <div className='flex items-center gap-1'>
                        <Star className='w-4 h-4' />
                        <span>{content.relevance_score}% relevance</span>
                      </div>
                    </div>
                  </div>

                  <Button variant='ghost' size='sm'>
                    <MoreHorizontal className='w-4 h-4' />
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
};
