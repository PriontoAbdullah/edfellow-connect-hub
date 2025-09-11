import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import {
  Users,
  UserPlus,
  MapPin,
  GraduationCap,
  Building2,
  Star,
  TrendingUp,
  Filter,
  Search,
  Sparkles,
  Target,
  Globe,
  BookOpen,
  Briefcase,
} from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';
import { useToast } from '@/hooks/use-toast';
import { sendConnectionRequest } from '@/lib/api/connections';

interface SuggestedUser {
  id: string;
  display_name: string;
  avatar?: string;
  role: 'student' | 'professor' | 'university';
  university?: string;
  country: string;
  city?: string;
  bio?: string;
  skills?: string[];
  academic_interests?: string[];
  mutual_connections?: number;
  common_interests?: string[];
  suggestion_reason:
    | 'mutual_connections'
    | 'same_university'
    | 'same_field'
    | 'same_country'
    | 'similar_interests';
  score: number;
}

interface NetworkingSuggestionsProps {
  userId: string;
  compact?: boolean;
}

export const NetworkingSuggestions: React.FC<NetworkingSuggestionsProps> = ({
  userId,
  compact = false,
}) => {
  const { user } = useAuth();
  const { toast } = useToast();
  const [suggestions, setSuggestions] = useState<SuggestedUser[]>([]);
  const [loading, setLoading] = useState(true);
  const [filterReason, setFilterReason] = useState<
    | 'all'
    | 'mutual_connections'
    | 'same_university'
    | 'same_field'
    | 'same_country'
    | 'similar_interests'
  >('all');
  const [sendingRequests, setSendingRequests] = useState<Set<string>>(
    new Set()
  );

  useEffect(() => {
    fetchSuggestions();
  }, [userId]);

  const fetchSuggestions = async () => {
    setLoading(true);
    try {
      // Simulate API call - replace with actual API call
      await new Promise((resolve) => setTimeout(resolve, 1000));

      // Mock data - replace with real data from API
      const mockSuggestions: SuggestedUser[] = [
        {
          id: '1',
          display_name: 'Dr. Sarah Johnson',
          avatar: undefined,
          role: 'professor',
          university: 'MIT',
          country: 'United States',
          city: 'Cambridge',
          bio: 'Professor of Computer Science specializing in AI and Machine Learning',
          skills: ['Python', 'Machine Learning', 'AI', 'Research'],
          academic_interests: [
            'Artificial Intelligence',
            'Machine Learning',
            'Computer Vision',
          ],
          mutual_connections: 3,
          common_interests: ['Machine Learning', 'AI'],
          suggestion_reason: 'same_field',
          score: 95,
        },
        {
          id: '2',
          display_name: 'Alex Chen',
          avatar: undefined,
          role: 'student',
          university: 'Stanford University',
          country: 'United States',
          city: 'Palo Alto',
          bio: 'Graduate student in Computer Science with focus on NLP',
          skills: ['Python', 'NLP', 'Deep Learning', 'Research'],
          academic_interests: ['Natural Language Processing', 'Deep Learning'],
          mutual_connections: 2,
          common_interests: ['Python', 'Deep Learning'],
          suggestion_reason: 'similar_interests',
          score: 88,
        },
        {
          id: '3',
          display_name: 'University of Toronto',
          avatar: undefined,
          role: 'university',
          university: 'University of Toronto',
          country: 'Canada',
          city: 'Toronto',
          bio: 'Leading research university with strong programs in Computer Science and Engineering',
          skills: ['Research', 'Education', 'Innovation'],
          academic_interests: ['Computer Science', 'Engineering', 'Research'],
          mutual_connections: 5,
          common_interests: ['Computer Science', 'Research'],
          suggestion_reason: 'same_field',
          score: 82,
        },
        {
          id: '4',
          display_name: 'Dr. Maria Rodriguez',
          avatar: undefined,
          role: 'professor',
          university: 'MIT',
          country: 'United States',
          city: 'Cambridge',
          bio: 'Associate Professor in the Department of Electrical Engineering and Computer Science',
          skills: ['Research', 'Teaching', 'Computer Science', 'Engineering'],
          academic_interests: ['Computer Science', 'Engineering', 'Research'],
          mutual_connections: 4,
          common_interests: ['Computer Science', 'Research'],
          suggestion_reason: 'same_university',
          score: 78,
        },
        {
          id: '5',
          display_name: 'James Wilson',
          avatar: undefined,
          role: 'student',
          university: 'Harvard University',
          country: 'United States',
          city: 'Cambridge',
          bio: 'PhD candidate in Computer Science with research in distributed systems',
          skills: ['Java', 'Distributed Systems', 'Research', 'Algorithms'],
          academic_interests: [
            'Distributed Systems',
            'Algorithms',
            'Computer Science',
          ],
          mutual_connections: 1,
          common_interests: ['Computer Science', 'Research'],
          suggestion_reason: 'same_country',
          score: 75,
        },
      ];

      setSuggestions(mockSuggestions);
    } catch (error) {
      console.error('Error fetching networking suggestions:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleSendConnectionRequest = async (suggestedUserId: string) => {
    if (!user) return;

    setSendingRequests((prev) => new Set(prev).add(suggestedUserId));

    try {
      const { data, error } = await sendConnectionRequest(
        user.id,
        suggestedUserId,
        "Hi! I'd like to connect with you."
      );

      if (error) {
        toast({
          title: 'Error',
          description: error,
          variant: 'destructive',
        });
        return;
      }

      toast({
        title: 'Connection Request Sent',
        description: 'Your connection request has been sent successfully!',
      });

      // Remove the suggestion from the list
      setSuggestions((prev) =>
        prev.filter((suggestion) => suggestion.id !== suggestedUserId)
      );
    } catch (error) {
      toast({
        title: 'Error',
        description: 'Failed to send connection request',
        variant: 'destructive',
      });
    } finally {
      setSendingRequests((prev) => {
        const newSet = new Set(prev);
        newSet.delete(suggestedUserId);
        return newSet;
      });
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

  const getSuggestionReasonIcon = (reason: string) => {
    switch (reason) {
      case 'mutual_connections':
        return <Users className='w-4 h-4' />;
      case 'same_university':
        return <GraduationCap className='w-4 h-4' />;
      case 'same_field':
        return <BookOpen className='w-4 h-4' />;
      case 'same_country':
        return <Globe className='w-4 h-4' />;
      case 'similar_interests':
        return <Target className='w-4 h-4' />;
      default:
        return <Sparkles className='w-4 h-4' />;
    }
  };

  const getSuggestionReasonText = (reason: string) => {
    switch (reason) {
      case 'mutual_connections':
        return 'Mutual connections';
      case 'same_university':
        return 'Same university';
      case 'same_field':
        return 'Same field of study';
      case 'same_country':
        return 'Same country';
      case 'similar_interests':
        return 'Similar interests';
      default:
        return 'Suggested for you';
    }
  };

  const getScoreColor = (score: number) => {
    if (score >= 90) return 'text-green-600';
    if (score >= 80) return 'text-blue-600';
    if (score >= 70) return 'text-yellow-600';
    return 'text-gray-600';
  };

  const filteredSuggestions = suggestions.filter(
    (suggestion) =>
      filterReason === 'all' || suggestion.suggestion_reason === filterReason
  );

  if (loading) {
    return (
      <div className='space-y-4'>
        <div className='animate-pulse'>
          <div className='h-4 bg-gray-200 rounded w-1/4 mb-4'></div>
          <div className='space-y-3'>
            {[1, 2, 3].map((i) => (
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
          <h3 className='text-sm font-medium'>Suggested Connections</h3>
          <Badge variant='outline'>{suggestions.length}</Badge>
        </div>

        <div className='space-y-2'>
          {suggestions.slice(0, 3).map((suggestion) => (
            <div
              key={suggestion.id}
              className='flex items-center gap-3 p-2 border rounded-lg'
            >
              <Avatar className='w-8 h-8'>
                <AvatarImage src={suggestion.avatar} />
                <AvatarFallback>
                  {suggestion.display_name.charAt(0)}
                </AvatarFallback>
              </Avatar>
              <div className='flex-1 min-w-0'>
                <p className='text-sm font-medium truncate'>
                  {suggestion.display_name}
                </p>
                <p className='text-xs text-muted-foreground truncate'>
                  {suggestion.university || suggestion.country}
                </p>
              </div>
              <Button
                size='sm'
                variant='outline'
                onClick={() => handleSendConnectionRequest(suggestion.id)}
                disabled={sendingRequests.has(suggestion.id)}
              >
                <UserPlus className='w-3 h-3' />
              </Button>
            </div>
          ))}
        </div>

        {suggestions.length > 3 && (
          <Button variant='outline' size='sm' className='w-full'>
            View All ({suggestions.length})
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
          <h3 className='text-lg font-semibold'>Networking Suggestions</h3>
          <p className='text-sm text-muted-foreground'>
            {suggestions.length} people you might want to connect with
          </p>
        </div>
        <Button variant='outline' onClick={fetchSuggestions}>
          <TrendingUp className='w-4 h-4 mr-2' />
          Refresh
        </Button>
      </div>

      {/* Filter */}
      <div className='flex gap-2 flex-wrap'>
        {(
          [
            'all',
            'mutual_connections',
            'same_university',
            'same_field',
            'same_country',
            'similar_interests',
          ] as const
        ).map((reason) => (
          <Button
            key={reason}
            variant={filterReason === reason ? 'default' : 'outline'}
            size='sm'
            onClick={() => setFilterReason(reason)}
          >
            {getSuggestionReasonIcon(reason)}
            <span className='ml-1'>
              {reason === 'all' ? 'All' : getSuggestionReasonText(reason)}
            </span>
          </Button>
        ))}
      </div>

      {/* Suggestions */}
      {filteredSuggestions.length === 0 ? (
        <Card>
          <CardContent className='p-6 text-center'>
            <Sparkles className='w-12 h-12 text-muted-foreground mx-auto mb-4' />
            <h3 className='text-lg font-medium mb-2'>No suggestions found</h3>
            <p className='text-muted-foreground'>
              {filterReason !== 'all'
                ? 'Try adjusting your filter criteria'
                : "We'll find more suggestions as you build your network"}
            </p>
          </CardContent>
        </Card>
      ) : (
        <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4'>
          {filteredSuggestions.map((suggestion) => (
            <Card key={suggestion.id}>
              <CardContent className='p-4'>
                <div className='flex items-start gap-3'>
                  <Avatar className='w-12 h-12'>
                    <AvatarImage src={suggestion.avatar} />
                    <AvatarFallback>
                      {suggestion.display_name.charAt(0)}
                    </AvatarFallback>
                  </Avatar>

                  <div className='flex-1 min-w-0'>
                    <div className='flex items-center gap-2 mb-1'>
                      <h4 className='font-medium truncate'>
                        {suggestion.display_name}
                      </h4>
                      <Badge
                        className={`text-xs ${getRoleColor(suggestion.role)}`}
                      >
                        {getRoleIcon(suggestion.role)}
                        <span className='ml-1 capitalize'>
                          {suggestion.role}
                        </span>
                      </Badge>
                    </div>

                    <div className='space-y-1 text-sm text-muted-foreground mb-2'>
                      {suggestion.university && (
                        <div className='flex items-center gap-1'>
                          <GraduationCap className='w-3 h-3' />
                          <span className='truncate'>
                            {suggestion.university}
                          </span>
                        </div>
                      )}
                      <div className='flex items-center gap-1'>
                        <MapPin className='w-3 h-3' />
                        <span>{suggestion.country}</span>
                      </div>
                    </div>

                    {/* Suggestion Reason */}
                    <div className='flex items-center gap-1 mb-2'>
                      {getSuggestionReasonIcon(suggestion.suggestion_reason)}
                      <span className='text-xs text-muted-foreground'>
                        {getSuggestionReasonText(suggestion.suggestion_reason)}
                      </span>
                      <span
                        className={`text-xs font-medium ${getScoreColor(
                          suggestion.score
                        )}`}
                      >
                        {suggestion.score}% match
                      </span>
                    </div>

                    {/* Common Interests */}
                    {suggestion.common_interests &&
                      suggestion.common_interests.length > 0 && (
                        <div className='flex flex-wrap gap-1 mb-3'>
                          {suggestion.common_interests
                            .slice(0, 2)
                            .map((interest, index) => (
                              <Badge
                                key={index}
                                variant='outline'
                                className='text-xs'
                              >
                                {interest}
                              </Badge>
                            ))}
                          {suggestion.common_interests.length > 2 && (
                            <Badge variant='outline' className='text-xs'>
                              +{suggestion.common_interests.length - 2}
                            </Badge>
                          )}
                        </div>
                      )}

                    {/* Mutual Connections */}
                    {suggestion.mutual_connections &&
                      suggestion.mutual_connections > 0 && (
                        <div className='flex items-center gap-1 text-xs text-muted-foreground mb-2'>
                          <Users className='w-3 h-3' />
                          <span>
                            {suggestion.mutual_connections} mutual connections
                          </span>
                        </div>
                      )}
                  </div>
                </div>

                {/* Action Button */}
                <div className='mt-4'>
                  <Button
                    className='w-full'
                    onClick={() => handleSendConnectionRequest(suggestion.id)}
                    disabled={sendingRequests.has(suggestion.id)}
                  >
                    <UserPlus className='w-4 h-4 mr-2' />
                    {sendingRequests.has(suggestion.id)
                      ? 'Sending...'
                      : 'Connect'}
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
