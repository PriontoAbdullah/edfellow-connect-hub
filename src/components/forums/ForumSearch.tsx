import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import {
  Search,
  Filter,
  Calendar,
  User,
  MessageSquare,
  Tag,
  Eye,
  ThumbsUp,
  Reply,
  Clock,
  TrendingUp,
  Star,
  BookOpen,
  FileText,
  HelpCircle,
  BarChart3,
  AlertCircle,
  ChevronDown,
  X,
} from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import {
  searchForumContent,
  type ForumThread,
  type ForumReply,
} from '@/lib/api/forums';

interface ForumSearchProps {
  compact?: boolean;
  onResultSelect?: (result: ForumThread | ForumReply) => void;
}

interface SearchFilters {
  category_id?: string;
  author_id?: string;
  tags?: string[];
  date_from?: string;
  date_to?: string;
  content_type?: 'all' | 'threads' | 'replies';
}

export const ForumSearch: React.FC<ForumSearchProps> = ({
  compact = false,
  onResultSelect,
}) => {
  const { toast } = useToast();
  const [searchTerm, setSearchTerm] = useState('');
  const [searchResults, setSearchResults] = useState<{
    threads: ForumThread[];
    replies: ForumReply[];
  }>({ threads: [], replies: [] });
  const [loading, setLoading] = useState(false);
  const [showFilters, setShowFilters] = useState(false);
  const [filters, setFilters] = useState<SearchFilters>({
    content_type: 'all',
  });
  const [recentSearches, setRecentSearches] = useState<string[]>([]);
  const [popularTags, setPopularTags] = useState<string[]>([]);

  useEffect(() => {
    loadRecentSearches();
    loadPopularTags();
  }, []);

  const loadRecentSearches = () => {
    const recent = localStorage.getItem('forum-recent-searches');
    if (recent) {
      setRecentSearches(JSON.parse(recent));
    }
  };

  const loadPopularTags = () => {
    // Mock popular tags - replace with actual API call
    setPopularTags([
      'machine-learning',
      'python',
      'research',
      'academic',
      'programming',
      'data-science',
      'ai',
      'education',
      'study-tips',
      'career',
    ]);
  };

  const saveRecentSearch = (term: string) => {
    if (!term.trim()) return;

    const updated = [term, ...recentSearches.filter((s) => s !== term)].slice(
      0,
      5
    );
    setRecentSearches(updated);
    localStorage.setItem('forum-recent-searches', JSON.stringify(updated));
  };

  const handleSearch = async () => {
    if (!searchTerm.trim()) {
      toast({
        title: 'Error',
        description: 'Please enter a search term',
        variant: 'destructive',
      });
      return;
    }

    setLoading(true);
    saveRecentSearch(searchTerm);

    try {
      const { data, error } = await searchForumContent(searchTerm, filters);

      if (error) {
        toast({
          title: 'Error',
          description: error,
          variant: 'destructive',
        });
        return;
      }

      setSearchResults(data || { threads: [], replies: [] });
    } catch (error) {
      toast({
        title: 'Error',
        description: 'Failed to search forum content',
        variant: 'destructive',
      });
    } finally {
      setLoading(false);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleSearch();
    }
  };

  const clearFilters = () => {
    setFilters({
      content_type: 'all',
    });
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    });
  };

  const getContentTypeIcon = (type: string) => {
    switch (type) {
      case 'thread':
        return <MessageSquare className='w-4 h-4' />;
      case 'reply':
        return <Reply className='w-4 h-4' />;
      default:
        return <MessageSquare className='w-4 h-4' />;
    }
  };

  const getContentTypeColor = (type: string) => {
    switch (type) {
      case 'thread':
        return 'bg-blue-100 text-blue-800';
      case 'reply':
        return 'bg-green-100 text-green-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const totalResults =
    searchResults.threads.length + searchResults.replies.length;

  if (compact) {
    return (
      <div className='space-y-4'>
        <div className='flex items-center justify-between'>
          <h3 className='text-sm font-medium'>Search Forum</h3>
        </div>

        <div className='relative'>
          <Search className='absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4' />
          <input
            type='text'
            placeholder='Search discussions...'
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            onKeyPress={handleKeyPress}
            className='w-full pl-10 pr-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500'
          />
        </div>

        <Button
          onClick={handleSearch}
          disabled={loading || !searchTerm.trim()}
          className='w-full'
        >
          {loading ? 'Searching...' : 'Search'}
        </Button>
      </div>
    );
  }

  return (
    <div className='space-y-6'>
      {/* Header */}
      <div>
        <h3 className='text-lg font-semibold'>Forum Search</h3>
        <p className='text-sm text-muted-foreground'>
          Search through all forum discussions and replies
        </p>
      </div>

      {/* Search Bar */}
      <div className='space-y-4'>
        <div className='relative'>
          <Search className='absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-5 h-5' />
          <input
            type='text'
            placeholder='Search forum content...'
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            onKeyPress={handleKeyPress}
            className='w-full pl-12 pr-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-lg'
          />
          <Button
            onClick={handleSearch}
            disabled={loading || !searchTerm.trim()}
            className='absolute right-2 top-1/2 transform -translate-y-1/2'
          >
            {loading ? 'Searching...' : 'Search'}
          </Button>
        </div>

        {/* Filter Toggle */}
        <div className='flex items-center justify-between'>
          <Button
            variant='outline'
            size='sm'
            onClick={() => setShowFilters(!showFilters)}
          >
            <Filter className='w-4 h-4 mr-2' />
            Filters
            <ChevronDown
              className={`w-4 h-4 ml-2 transition-transform ${
                showFilters ? 'rotate-180' : ''
              }`}
            />
          </Button>

          {Object.values(filters).some((f) => f && f !== 'all') && (
            <Button variant='ghost' size='sm' onClick={clearFilters}>
              <X className='w-4 h-4 mr-2' />
              Clear Filters
            </Button>
          )}
        </div>

        {/* Advanced Filters */}
        {showFilters && (
          <Card>
            <CardContent className='p-4 space-y-4'>
              <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4'>
                <div>
                  <label className='block text-sm font-medium mb-1'>
                    Content Type
                  </label>
                  <select
                    value={filters.content_type || 'all'}
                    onChange={(e) =>
                      setFilters((prev) => ({
                        ...prev,
                        content_type: e.target.value as any,
                      }))
                    }
                    className='w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500'
                  >
                    <option value='all'>All Content</option>
                    <option value='threads'>Threads Only</option>
                    <option value='replies'>Replies Only</option>
                  </select>
                </div>

                <div>
                  <label className='block text-sm font-medium mb-1'>
                    Date From
                  </label>
                  <input
                    type='date'
                    value={filters.date_from || ''}
                    onChange={(e) =>
                      setFilters((prev) => ({
                        ...prev,
                        date_from: e.target.value,
                      }))
                    }
                    className='w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500'
                  />
                </div>

                <div>
                  <label className='block text-sm font-medium mb-1'>
                    Date To
                  </label>
                  <input
                    type='date'
                    value={filters.date_to || ''}
                    onChange={(e) =>
                      setFilters((prev) => ({
                        ...prev,
                        date_to: e.target.value,
                      }))
                    }
                    className='w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500'
                  />
                </div>
              </div>

              <div>
                <label className='block text-sm font-medium mb-2'>
                  Popular Tags
                </label>
                <div className='flex flex-wrap gap-2'>
                  {popularTags.map((tag) => (
                    <Badge
                      key={tag}
                      variant={
                        filters.tags?.includes(tag) ? 'default' : 'outline'
                      }
                      className='cursor-pointer'
                      onClick={() => {
                        const currentTags = filters.tags || [];
                        const newTags = currentTags.includes(tag)
                          ? currentTags.filter((t) => t !== tag)
                          : [...currentTags, tag];
                        setFilters((prev) => ({ ...prev, tags: newTags }));
                      }}
                    >
                      <Tag className='w-3 h-3 mr-1' />
                      {tag}
                    </Badge>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>
        )}
      </div>

      {/* Recent Searches */}
      {recentSearches.length > 0 && !searchTerm && (
        <div>
          <h4 className='text-sm font-medium mb-2'>Recent Searches</h4>
          <div className='flex flex-wrap gap-2'>
            {recentSearches.map((search, index) => (
              <Badge
                key={index}
                variant='outline'
                className='cursor-pointer'
                onClick={() => {
                  setSearchTerm(search);
                  handleSearch();
                }}
              >
                <Clock className='w-3 h-3 mr-1' />
                {search}
              </Badge>
            ))}
          </div>
        </div>
      )}

      {/* Search Results */}
      {searchTerm && (
        <div className='space-y-4'>
          <div className='flex items-center justify-between'>
            <h4 className='text-sm font-medium'>
              Search Results ({totalResults})
            </h4>
            {totalResults > 0 && (
              <div className='flex items-center gap-2 text-sm text-muted-foreground'>
                <span>{searchResults.threads.length} threads</span>
                <span>•</span>
                <span>{searchResults.replies.length} replies</span>
              </div>
            )}
          </div>

          {totalResults === 0 ? (
            <Card>
              <CardContent className='p-6 text-center'>
                <Search className='w-12 h-12 text-muted-foreground mx-auto mb-4' />
                <h3 className='text-lg font-medium mb-2'>No results found</h3>
                <p className='text-muted-foreground'>
                  Try adjusting your search terms or filters
                </p>
              </CardContent>
            </Card>
          ) : (
            <div className='space-y-4'>
              {/* Thread Results */}
              {searchResults.threads.map((thread) => (
                <Card
                  key={thread.id}
                  className='hover:shadow-md transition-shadow cursor-pointer'
                  onClick={() => onResultSelect?.(thread)}
                >
                  <CardContent className='p-4'>
                    <div className='flex items-start gap-3'>
                      <div className='p-2 rounded-lg bg-blue-100'>
                        {getContentTypeIcon('thread')}
                      </div>

                      <div className='flex-1 min-w-0'>
                        <div className='flex items-center gap-2 mb-1'>
                          <h4 className='font-medium truncate'>
                            {thread.title}
                          </h4>
                          <Badge
                            className={`text-xs ${getContentTypeColor(
                              'thread'
                            )}`}
                          >
                            Thread
                          </Badge>
                          {thread.is_pinned && (
                            <Star className='w-4 h-4 text-yellow-600' />
                          )}
                        </div>

                        <p className='text-sm text-muted-foreground mb-2 line-clamp-2'>
                          {thread.content}
                        </p>

                        <div className='flex items-center gap-4 text-xs text-muted-foreground'>
                          <div className='flex items-center gap-1'>
                            <User className='w-3 h-3' />
                            <span>{thread.author?.display_name}</span>
                          </div>
                          <div className='flex items-center gap-1'>
                            <Calendar className='w-3 h-3' />
                            <span>{formatDate(thread.created_at)}</span>
                          </div>
                          <div className='flex items-center gap-1'>
                            <MessageSquare className='w-3 h-3' />
                            <span>{thread.reply_count} replies</span>
                          </div>
                          <div className='flex items-center gap-1'>
                            <Eye className='w-3 h-3' />
                            <span>{thread.view_count} views</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}

              {/* Reply Results */}
              {searchResults.replies.map((reply) => (
                <Card
                  key={reply.id}
                  className='hover:shadow-md transition-shadow cursor-pointer'
                  onClick={() => onResultSelect?.(reply)}
                >
                  <CardContent className='p-4'>
                    <div className='flex items-start gap-3'>
                      <div className='p-2 rounded-lg bg-green-100'>
                        {getContentTypeIcon('reply')}
                      </div>

                      <div className='flex-1 min-w-0'>
                        <div className='flex items-center gap-2 mb-1'>
                          <h4 className='font-medium'>
                            Reply to: {(reply as any).thread?.title || 'Thread'}
                          </h4>
                          <Badge
                            className={`text-xs ${getContentTypeColor(
                              'reply'
                            )}`}
                          >
                            Reply
                          </Badge>
                          {reply.is_solution && (
                            <Star className='w-4 h-4 text-green-600' />
                          )}
                        </div>

                        <p className='text-sm text-muted-foreground mb-2 line-clamp-2'>
                          {reply.content}
                        </p>

                        <div className='flex items-center gap-4 text-xs text-muted-foreground'>
                          <div className='flex items-center gap-1'>
                            <User className='w-3 h-3' />
                            <span>{reply.author?.display_name}</span>
                          </div>
                          <div className='flex items-center gap-1'>
                            <Calendar className='w-3 h-3' />
                            <span>{formatDate(reply.created_at)}</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
};
