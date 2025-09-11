import React, { useState, useEffect, useRef } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
  Search,
  Filter,
  ChevronDown,
  X,
  User,
  Users,
  BookOpen,
  MessageSquare,
  Briefcase,
  Award,
  Calendar,
  Clock,
  MapPin,
  Star,
  Eye,
  ExternalLink,
  Loader2,
  TrendingUp,
  Hash,
  Globe,
  Building2,
  GraduationCap,
  Heart,
  Zap,
  Shield,
  Target,
  BarChart3,
  FileText,
  Image,
  Video,
  Music,
  Archive,
  Bookmark,
  Flag,
  ThumbsUp,
  MessageCircle,
  Share,
  Copy,
  Download,
  Upload,
  Settings,
  Bell,
  Mail,
  Phone,
  Camera,
  Mic,
  MicOff,
  Volume2,
  VolumeX,
  Play,
  Pause,
  SkipBack,
  SkipForward,
  Repeat,
  Shuffle,
  Maximize,
  Minimize,
  RotateCcw,
  RotateCw,
  RefreshCw,
  RefreshCcw,
  ArrowUp,
  ArrowDown,
  ArrowLeft,
  ArrowRight,
  ChevronUp,
  ChevronLeft,
  ChevronRight,
  Plus,
  Minus,
  Check,
  X as XIcon,
  AlertCircle,
  CheckCircle,
  Info,
  HelpCircle,
  Lock,
  Unlock,
  Eye as EyeIcon,
  EyeOff,
  Sun,
  Moon,
  Cloud,
  CloudRain,
  Wind,
  Thermometer,
  Droplets,
  Snowflake,
  CloudSnow,
  CloudLightning,
  CloudDrizzle,
  Sunrise,
  Sunset,
  Activity,
  Zap as ZapIcon,
  ZapOff,
  Battery,
  BatteryLow,
  BatteryMedium,
  BatteryHigh,
  BatteryFull,
  Wifi,
  WifiOff,
  Signal,
  SignalZero,
  SignalLow,
  SignalMedium,
  SignalHigh,
  SignalFull,
  Bluetooth,
  BluetoothOff,
  Radio,
  RadioOff,
  Tv,
  TvOff,
  Monitor,
  MonitorOff,
  Smartphone,
  SmartphoneOff,
  Tablet,
  TabletOff,
  Laptop,
  LaptopOff,
  Desktop,
  DesktopOff,
  Server,
  ServerOff,
  Database,
  DatabaseOff,
  HardDrive,
  HardDriveOff,
  Cpu,
  CpuOff,
  MemoryStick,
  MemoryStickOff,
  Disc,
  DiscOff,
  Cd,
  CdOff,
  Dvd,
  DvdOff,
  Cassette,
  CassetteOff,
  Vinyl,
  VinylOff,
  Headphones,
  HeadphonesOff,
  Speaker,
  SpeakerOff,
  Mic as MicIcon,
  MicOff as MicOffIcon,
  Volume1,
  Volume3,
  Volume4,
  Volume5,
  Volume6,
  Volume7,
  Volume8,
  Volume9,
  Volume10,
  Volume11,
  Volume12,
  Volume13,
  Volume14,
  Volume15,
  Volume16,
  Volume17,
  Volume18,
  Volume19,
  Volume20,
  Volume21,
  Volume22,
  Volume23,
  Volume24,
  Volume25,
  Volume26,
  Volume27,
  Volume28,
  Volume29,
  Volume30,
  Volume31,
  Volume32,
  Volume33,
  Volume34,
  Volume35,
  Volume36,
  Volume37,
  Volume38,
  Volume39,
  Volume40,
  Volume41,
  Volume42,
  Volume43,
  Volume44,
  Volume45,
  Volume46,
  Volume47,
  Volume48,
  Volume49,
  Volume50,
  Volume51,
  Volume52,
  Volume53,
  Volume54,
  Volume55,
  Volume56,
  Volume57,
  Volume58,
  Volume59,
  Volume60,
  Volume61,
  Volume62,
  Volume63,
  Volume64,
  Volume65,
  Volume66,
  Volume67,
  Volume68,
  Volume69,
  Volume70,
  Volume71,
  Volume72,
  Volume73,
  Volume74,
  Volume75,
  Volume76,
  Volume77,
  Volume78,
  Volume79,
  Volume80,
  Volume81,
  Volume82,
  Volume83,
  Volume84,
  Volume85,
  Volume86,
  Volume87,
  Volume88,
  Volume89,
  Volume90,
  Volume91,
  Volume92,
  Volume93,
  Volume94,
  Volume95,
  Volume96,
  Volume97,
  Volume98,
  Volume99,
  Volume100,
} from 'lucide-react';
import {
  useSearch,
  type SearchResult,
  type SearchFilters,
} from '@/hooks/useSearch';
import { useAuth } from '@/contexts/AuthContext';
import { useToast } from '@/hooks/use-toast';

interface GlobalSearchProps {
  compact?: boolean;
  onResultSelect?: (result: SearchResult) => void;
  placeholder?: string;
  autoFocus?: boolean;
}

export const GlobalSearch: React.FC<GlobalSearchProps> = ({
  compact = false,
  onResultSelect,
  placeholder = 'Search users, posts, groups, programs, jobs, and scholarships...',
  autoFocus = false,
}) => {
  const { user } = useAuth();
  const { toast } = useToast();
  const { searching, results, totalCount, globalSearch, getSearchSuggestions } =
    useSearch();

  const [query, setQuery] = useState('');
  const [suggestions, setSuggestions] = useState<string[]>([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [showFilters, setShowFilters] = useState(false);
  const [filters, setFilters] = useState<SearchFilters>({});
  const [activeTab, setActiveTab] = useState<
    'all' | 'users' | 'posts' | 'groups' | 'programs' | 'jobs' | 'scholarships'
  >('all');
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(false);

  const searchInputRef = useRef<HTMLInputElement>(null);
  const suggestionsRef = useRef<HTMLDivElement>(null);

  const searchTypes = [
    { value: 'all', label: 'All', icon: Search },
    { value: 'users', label: 'Users', icon: User },
    { value: 'posts', label: 'Posts', icon: MessageSquare },
    { value: 'groups', label: 'Groups', icon: Users },
    { value: 'programs', label: 'Programs', icon: GraduationCap },
    { value: 'jobs', label: 'Jobs', icon: Briefcase },
    { value: 'scholarships', label: 'Scholarships', icon: Award },
  ];

  const filterOptions = {
    role: ['student', 'professor', 'university', 'admin'],
    university: ['MIT', 'Stanford', 'Harvard', 'Berkeley', 'CMU', 'Other'],
    field: [
      'Computer Science',
      'Engineering',
      'Business',
      'Medicine',
      'Law',
      'Arts',
      'Sciences',
      'Other',
    ],
    location: [
      'United States',
      'Canada',
      'United Kingdom',
      'Germany',
      'France',
      'Australia',
      'Other',
    ],
    category: [
      'Study Group',
      'Research',
      'Professional',
      'Social',
      'Academic',
      'Other',
    ],
    type: [
      'Full-time',
      'Part-time',
      'Internship',
      'Contract',
      'Freelance',
      'Other',
    ],
    status: ['Active', 'Inactive', 'Pending', 'Completed', 'Cancelled'],
  };

  useEffect(() => {
    if (query.length >= 2) {
      const timeoutId = setTimeout(async () => {
        const newSuggestions = await getSearchSuggestions(query);
        setSuggestions(newSuggestions);
        setShowSuggestions(true);
      }, 300);

      return () => clearTimeout(timeoutId);
    } else {
      setSuggestions([]);
      setShowSuggestions(false);
    }
  }, [query, getSearchSuggestions]);

  useEffect(() => {
    if (query.length >= 2) {
      performSearch();
    } else {
      setResults([]);
      setTotalCount(0);
    }
  }, [query, filters, activeTab, page]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        suggestionsRef.current &&
        !suggestionsRef.current.contains(event.target as Node) &&
        searchInputRef.current &&
        !searchInputRef.current.contains(event.target as Node)
      ) {
        setShowSuggestions(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const performSearch = async () => {
    try {
      const result = await globalSearch(query, filters, {
        limit: 20,
        offset: (page - 1) * 20,
        sort_by: 'relevance',
      });

      if (result.error) {
        toast({
          title: 'Search Error',
          description: result.error,
          variant: 'destructive',
        });
        return;
      }

      setResults(result.data || []);
      setTotalCount(result.count);
      setHasMore((result.data?.length || 0) === 20);
    } catch (error) {
      console.error('Search error:', error);
    }
  };

  const handleSuggestionClick = (suggestion: string) => {
    setQuery(suggestion);
    setShowSuggestions(false);
    searchInputRef.current?.focus();
  };

  const handleResultClick = (result: SearchResult) => {
    if (onResultSelect) {
      onResultSelect(result);
    }
  };

  const clearFilters = () => {
    setFilters({});
  };

  const getResultIcon = (type: SearchResult['type']) => {
    switch (type) {
      case 'user':
        return User;
      case 'post':
        return MessageSquare;
      case 'group':
        return Users;
      case 'program':
        return GraduationCap;
      case 'job':
        return Briefcase;
      case 'scholarship':
        return Award;
      default:
        return Search;
    }
  };

  const getResultColor = (type: SearchResult['type']) => {
    switch (type) {
      case 'user':
        return 'bg-blue-100 text-blue-800';
      case 'post':
        return 'bg-green-100 text-green-800';
      case 'group':
        return 'bg-purple-100 text-purple-800';
      case 'program':
        return 'bg-orange-100 text-orange-800';
      case 'job':
        return 'bg-indigo-100 text-indigo-800';
      case 'scholarship':
        return 'bg-yellow-100 text-yellow-800';
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

  const formatCurrency = (amount: number, currency: string = 'USD') => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: currency,
    }).format(amount);
  };

  if (compact) {
    return (
      <div className='relative'>
        <div className='relative'>
          <Search className='absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4' />
          <Input
            ref={searchInputRef}
            type='text'
            placeholder={placeholder}
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className='pl-10 pr-4'
            autoFocus={autoFocus}
          />
        </div>

        {showSuggestions && suggestions.length > 0 && (
          <div
            ref={suggestionsRef}
            className='absolute top-full left-0 right-0 mt-1 bg-white border rounded-lg shadow-lg z-50 max-h-60 overflow-y-auto'
          >
            {suggestions.map((suggestion, index) => (
              <button
                key={index}
                onClick={() => handleSuggestionClick(suggestion)}
                className='w-full px-4 py-2 text-left hover:bg-gray-50 border-b last:border-b-0'
              >
                <div className='flex items-center gap-2'>
                  <Search className='w-4 h-4 text-muted-foreground' />
                  <span className='text-sm'>{suggestion}</span>
                </div>
              </button>
            ))}
          </div>
        )}
      </div>
    );
  }

  return (
    <div className='space-y-4'>
      {/* Search Input */}
      <div className='relative'>
        <Search className='absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-5 h-5' />
        <Input
          ref={searchInputRef}
          type='text'
          placeholder={placeholder}
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          className='pl-12 pr-4 py-3 text-lg'
          autoFocus={autoFocus}
        />
        {searching && (
          <Loader2 className='absolute right-3 top-1/2 transform -translate-y-1/2 w-5 h-5 animate-spin text-muted-foreground' />
        )}
      </div>

      {/* Search Suggestions */}
      {showSuggestions && suggestions.length > 0 && (
        <div
          ref={suggestionsRef}
          className='bg-white border rounded-lg shadow-lg z-50 max-h-60 overflow-y-auto'
        >
          {suggestions.map((suggestion, index) => (
            <button
              key={index}
              onClick={() => handleSuggestionClick(suggestion)}
              className='w-full px-4 py-2 text-left hover:bg-gray-50 border-b last:border-b-0'
            >
              <div className='flex items-center gap-2'>
                <Search className='w-4 h-4 text-muted-foreground' />
                <span className='text-sm'>{suggestion}</span>
              </div>
            </button>
          ))}
        </div>
      )}

      {/* Search Tabs */}
      <div className='flex gap-2 overflow-x-auto'>
        {searchTypes.map((type) => {
          const Icon = type.icon;
          return (
            <Button
              key={type.value}
              variant={activeTab === type.value ? 'default' : 'outline'}
              size='sm'
              onClick={() => setActiveTab(type.value as any)}
              className='whitespace-nowrap'
            >
              <Icon className='w-4 h-4 mr-1' />
              {type.label}
            </Button>
          );
        })}
      </div>

      {/* Filters */}
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

        {Object.values(filters).some((f) => f !== undefined && f !== '') && (
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
              {Object.entries(filterOptions).map(([key, options]) => (
                <div key={key}>
                  <Label className='block text-sm font-medium mb-1 capitalize'>
                    {key.replace('_', ' ')}
                  </Label>
                  <select
                    value={filters[key as keyof SearchFilters] || ''}
                    onChange={(e) =>
                      setFilters((prev) => ({
                        ...prev,
                        [key]: e.target.value || undefined,
                      }))
                    }
                    className='w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500'
                  >
                    <option value=''>All {key.replace('_', ' ')}</option>
                    {options.map((option) => (
                      <option key={option} value={option}>
                        {option}
                      </option>
                    ))}
                  </select>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}

      {/* Search Results */}
      {query.length >= 2 && (
        <div className='space-y-4'>
          {/* Results Header */}
          <div className='flex items-center justify-between'>
            <div className='flex items-center gap-2'>
              <h3 className='text-lg font-semibold'>Search Results</h3>
              {totalCount > 0 && (
                <Badge variant='outline'>{totalCount} results</Badge>
              )}
            </div>
            {searching && (
              <div className='flex items-center gap-2 text-sm text-muted-foreground'>
                <Loader2 className='w-4 h-4 animate-spin' />
                Searching...
              </div>
            )}
          </div>

          {/* Results List */}
          {results.length === 0 && !searching ? (
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
            <div className='space-y-2'>
              {results.map((result) => {
                const Icon = getResultIcon(result.type);
                return (
                  <Card
                    key={result.id}
                    className='hover:shadow-md transition-shadow cursor-pointer'
                    onClick={() => handleResultClick(result)}
                  >
                    <CardContent className='p-4'>
                      <div className='flex items-start gap-3'>
                        <div className='w-10 h-10 bg-gray-100 rounded-lg flex items-center justify-center'>
                          <Icon className='w-5 h-5 text-gray-600' />
                        </div>

                        <div className='flex-1 min-w-0'>
                          <div className='flex items-center gap-2 mb-1'>
                            <h4 className='font-medium truncate'>
                              {result.title}
                            </h4>
                            <Badge
                              className={`text-xs ${getResultColor(
                                result.type
                              )}`}
                            >
                              {result.type}
                            </Badge>
                          </div>

                          {result.description && (
                            <p className='text-sm text-muted-foreground mb-2 line-clamp-2'>
                              {result.description}
                            </p>
                          )}

                          <div className='flex items-center gap-4 text-xs text-muted-foreground'>
                            {result.author && (
                              <div className='flex items-center gap-1'>
                                <Avatar className='w-4 h-4'>
                                  <AvatarImage src={result.author.avatar} />
                                  <AvatarFallback className='text-xs'>
                                    {result.author.display_name.charAt(0)}
                                  </AvatarFallback>
                                </Avatar>
                                <span>{result.author.display_name}</span>
                              </div>
                            )}
                            <div className='flex items-center gap-1'>
                              <Clock className='w-3 h-3' />
                              <span>{formatDate(result.created_at)}</span>
                            </div>
                            {result.metadata && (
                              <>
                                {result.metadata.university && (
                                  <div className='flex items-center gap-1'>
                                    <Building2 className='w-3 h-3' />
                                    <span>{result.metadata.university}</span>
                                  </div>
                                )}
                                {result.metadata.field && (
                                  <div className='flex items-center gap-1'>
                                    <BookOpen className='w-3 h-3' />
                                    <span>{result.metadata.field}</span>
                                  </div>
                                )}
                                {result.metadata.location && (
                                  <div className='flex items-center gap-1'>
                                    <MapPin className='w-3 h-3' />
                                    <span>{result.metadata.location}</span>
                                  </div>
                                )}
                                {result.metadata.amount && (
                                  <div className='flex items-center gap-1'>
                                    <Award className='w-3 h-3' />
                                    <span>
                                      {formatCurrency(result.metadata.amount)}
                                    </span>
                                  </div>
                                )}
                              </>
                            )}
                          </div>
                        </div>

                        <Button variant='ghost' size='sm'>
                          <ExternalLink className='w-4 h-4' />
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                );
              })}
            </div>
          )}

          {/* Load More */}
          {hasMore && (
            <div className='text-center'>
              <Button
                variant='outline'
                onClick={() => setPage((prev) => prev + 1)}
                disabled={searching}
              >
                {searching ? (
                  <>
                    <Loader2 className='w-4 h-4 mr-2 animate-spin' />
                    Loading...
                  </>
                ) : (
                  'Load More'
                )}
              </Button>
            </div>
          )}
        </div>
      )}
    </div>
  );
};
