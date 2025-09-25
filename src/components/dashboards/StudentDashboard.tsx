import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import {
  Users,
  MessageSquare,
  BookOpen,
  Calendar,
  TrendingUp,
  Award,
  Bell,
  Search,
  Heart,
  Target,
  ArrowRight,
  Plus,
  FileText,
  Image,
  BarChart3,
  ChevronDown,
  Star,
  MapPin,
  Building,
  ExternalLink,
  Check,
  Eye,
  Bookmark,
  Newspaper,
  Clock,
  UserPlus,
  GraduationCap,
  Globe,
  Settings,
  LogOut,
  Megaphone,
  Grid3X3,
  MoreHorizontal,
  Send,
  ThumbsUp,
  Share2,
  Briefcase,
  Lightbulb,
  BookMarked,
  Target as TargetIcon,
} from 'lucide-react';
import { FeedList } from '@/components/feed/FeedList';
import { ErrorBoundary } from '@/components/ErrorBoundary';
import { useAuth } from '@/contexts/AuthContext';
import {
  useDashboard,
  useUserProfile,
  useNotifications,
  useConnections,
  useGroups,
  usePosts,
  usePrograms,
  useJobs,
  useScholarships,
} from '@/hooks/useDashboardFeatures';

const StudentDashboard = () => {
  const navigate = useNavigate();
  const { userData } = useAuth();

  // Load real data from database
  const { profile, loading: profileLoading } = useUserProfile();
  const { notifications, loading: notificationsLoading } = useNotifications();
  const { connections, loading: connectionsLoading } = useConnections();
  const { groups, loading: groupsLoading } = useGroups();
  const { posts, loading: postsLoading, createPost } = usePosts();
  const { programs, loading: programsLoading } = usePrograms();
  const { jobs, loading: jobsLoading } = useJobs();
  const { scholarships, loading: scholarshipsLoading } = useScholarships();

  // Scroll to top on component mount
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);

  // Get current user data from database or fallback to auth context
  const user = {
    name: profile?.display_name || userData?.displayName || 'Student',
    avatar: profile?.avatar || '/api/placeholder/40/40',
    title: profile?.major || userData?.major || 'Student',
    university: profile?.university || userData?.university || 'University',
    location:
      profile?.city && profile?.country
        ? `${profile.city}, ${profile.country}`
        : profile?.country || userData?.country || 'Location',
    country: profile?.country || userData?.country || 'Country',
    rating: 4.0,
    profileViews: profile?.profile_views || 0,
    role: profile?.role || userData?.role || 'student',
  };

  const handlePostClick = (post: any) => {
    // Navigate to post detail or open modal
    console.log('Post clicked:', post);
  };

  const handlePostEdit = (post: any) => {
    // Handle post editing
    console.log('Edit post:', post);
  };

  const handlePostDelete = (postId: string) => {
    // Handle post deletion
    console.log('Delete post:', postId);
  };

  const handlePostComment = (postId: string) => {
    // Handle post commenting
    console.log('Comment on post:', postId);
  };

  return (
    <div className='max-w-7xl mx-auto px-4 pb-6'>
      <div className='grid grid-cols-1 lg:grid-cols-12 gap-6'>
        {/* Main Content Area */}
        <div className='lg:col-span-8 space-y-4'>
          <ErrorBoundary>
            <FeedList
              showCreatePost={true}
              onPostClick={handlePostClick}
              onPostEdit={handlePostEdit}
              onPostDelete={handlePostDelete}
              onPostComment={handlePostComment}
            />
          </ErrorBoundary>
        </div>

        {/* Right Sidebar */}
        <div className='lg:col-span-4 space-y-4'>
          {/* Recent Connections */}
          <Card className='bg-white border border-gray-200 shadow-sm rounded-xl overflow-hidden'>
            <CardHeader className='pb-3'>
              <CardTitle className='text-lg font-semibold text-gray-900'>
                Recent Connections
              </CardTitle>
            </CardHeader>
            <CardContent className='space-y-3'>
              {connectionsLoading ? (
                <div className='text-center py-4'>
                  <div className='animate-spin rounded-full h-6 w-6 border-b-2 border-blue-600 mx-auto'></div>
                  <p className='text-sm text-gray-500 mt-2'>
                    Loading connections...
                  </p>
                </div>
              ) : connections.length > 0 ? (
                connections.slice(0, 3).map((connection) => {
                  const otherUser =
                    connection.requester?.id === userData?.uid
                      ? connection.addressee
                      : connection.requester;

                  return (
                    <div
                      key={connection.id}
                      className='border border-gray-200 rounded-lg p-3 hover:bg-gray-50'
                    >
                      <div className='flex items-start gap-3'>
                        <Avatar className='h-10 w-10 flex-shrink-0'>
                          <AvatarImage
                            src={otherUser?.avatar || '/api/placeholder/40/40'}
                            alt={otherUser?.display_name || 'User'}
                          />
                          <AvatarFallback className='bg-gray-100 text-gray-600'>
                            {otherUser?.display_name?.charAt(0) || 'U'}
                          </AvatarFallback>
                        </Avatar>
                        <div className='flex-1 min-w-0'>
                          <div className='flex items-center gap-2 mb-1'>
                            <h4 className='font-semibold text-sm text-gray-900 truncate'>
                              {otherUser?.display_name || 'Unknown User'}
                            </h4>
                            <Badge className='text-xs bg-green-100 text-green-800 flex-shrink-0'>
                              Connected
                            </Badge>
                          </div>
                          <p className='text-xs text-gray-600'>
                            {otherUser?.role === 'professor'
                              ? 'Professor'
                              : otherUser?.role === 'university'
                              ? 'University'
                              : 'Student'}
                          </p>
                          <p className='text-xs text-gray-600'>
                            {otherUser?.university || 'Unknown University'}
                          </p>
                          <Button
                            size='sm'
                            variant='outline'
                            className='w-full text-xs mt-2'
                            onClick={() =>
                              navigate('/profile/' + otherUser?.id)
                            }
                          >
                            View Profile
                          </Button>
                        </div>
                      </div>
                    </div>
                  );
                })
              ) : (
                <div className='text-center py-4'>
                  <Users className='h-8 w-8 text-gray-400 mx-auto mb-2' />
                  <p className='text-sm text-gray-500'>No connections yet</p>
                  <Button
                    size='sm'
                    variant='outline'
                    className='mt-2'
                    onClick={() => navigate('/dashboard/explore')}
                  >
                    Find Connections
                  </Button>
                </div>
              )}
            </CardContent>
          </Card>

          {/* Featured Opportunities */}
          <Card className='bg-white border border-gray-200 shadow-sm rounded-xl overflow-hidden'>
            <CardHeader className='pb-3'>
              <CardTitle className='text-lg font-semibold text-gray-900'>
                Featured Opportunities
              </CardTitle>
            </CardHeader>
            <CardContent className='space-y-3'>
              {programsLoading || jobsLoading || scholarshipsLoading ? (
                <div className='text-center py-4'>
                  <div className='animate-spin rounded-full h-6 w-6 border-b-2 border-blue-600 mx-auto'></div>
                  <p className='text-sm text-gray-500 mt-2'>
                    Loading opportunities...
                  </p>
                </div>
              ) : (
                <>
                  {/* Featured Programs */}
                  {programs
                    .filter((p) => p.is_featured)
                    .slice(0, 1)
                    .map((program) => (
                      <div
                        key={program.id}
                        className='border border-gray-200 rounded-lg p-3 hover:bg-gray-50'
                      >
                        <div className='flex items-start gap-3'>
                          <div className='w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0'>
                            <GraduationCap className='h-4 w-4 text-blue-600' />
                          </div>
                          <div className='flex-1 min-w-0'>
                            <div className='flex items-center gap-2 mb-1'>
                              <h4 className='font-semibold text-sm text-gray-900 truncate'>
                                {program.title}
                              </h4>
                              <Badge className='text-xs bg-yellow-100 text-yellow-800 flex-shrink-0'>
                                Featured
                              </Badge>
                            </div>
                            <p className='text-xs text-gray-600 mb-2'>
                              {program.description?.substring(0, 80)}...
                            </p>
                            <div className='flex items-center gap-4 text-xs text-gray-600 mb-2'>
                              <div className='flex items-center gap-1'>
                                <Clock className='h-3 w-3' />
                                <span>{program.duration_months} months</span>
                              </div>
                              <div className='flex items-center gap-1'>
                                <Building className='h-3 w-3' />
                                <span>{program.university?.display_name}</span>
                              </div>
                            </div>
                            <Button
                              size='sm'
                              variant='outline'
                              className='w-full text-xs'
                              onClick={() =>
                                navigate('/programs/' + program.id)
                              }
                            >
                              <ExternalLink className='h-3 w-3 mr-1' />
                              Learn More
                            </Button>
                          </div>
                        </div>
                      </div>
                    ))}

                  {/* Featured Jobs */}
                  {jobs
                    .filter((j) => j.is_featured)
                    .slice(0, 1)
                    .map((job) => (
                      <div
                        key={job.id}
                        className='border border-gray-200 rounded-lg p-3 hover:bg-gray-50'
                      >
                        <div className='flex items-start gap-3'>
                          <div className='w-8 h-8 bg-green-100 rounded-full flex items-center justify-center flex-shrink-0'>
                            <Briefcase className='h-4 w-4 text-green-600' />
                          </div>
                          <div className='flex-1 min-w-0'>
                            <div className='flex items-center gap-2 mb-1'>
                              <h4 className='font-semibold text-sm text-gray-900 truncate'>
                                {job.title}
                              </h4>
                              <Badge className='text-xs bg-green-100 text-green-800 flex-shrink-0'>
                                Job
                              </Badge>
                            </div>
                            <p className='text-xs text-gray-600 mb-2'>
                              {job.description?.substring(0, 80)}...
                            </p>
                            <div className='flex items-center gap-4 text-xs text-gray-600 mb-2'>
                              <div className='flex items-center gap-1'>
                                <Building className='h-3 w-3' />
                                <span>{job.company_name}</span>
                              </div>
                              <div className='flex items-center gap-1'>
                                <MapPin className='h-3 w-3' />
                                <span>{job.location}</span>
                              </div>
                            </div>
                            <Button
                              size='sm'
                              variant='outline'
                              className='w-full text-xs'
                              onClick={() => navigate('/jobs/' + job.id)}
                            >
                              <ExternalLink className='h-3 w-3 mr-1' />
                              Apply Now
                            </Button>
                          </div>
                        </div>
                      </div>
                    ))}

                  {/* Featured Scholarships */}
                  {scholarships.slice(0, 1).map((scholarship) => (
                    <div
                      key={scholarship.id}
                      className='border border-gray-200 rounded-lg p-3 hover:bg-gray-50'
                    >
                      <div className='flex items-start gap-3'>
                        <div className='w-8 h-8 bg-purple-100 rounded-full flex items-center justify-center flex-shrink-0'>
                          <Award className='h-4 w-4 text-purple-600' />
                        </div>
                        <div className='flex-1 min-w-0'>
                          <div className='flex items-center gap-2 mb-1'>
                            <h4 className='font-semibold text-sm text-gray-900 truncate'>
                              {scholarship.title}
                            </h4>
                            <Badge className='text-xs bg-purple-100 text-purple-800 flex-shrink-0'>
                              Scholarship
                            </Badge>
                          </div>
                          <p className='text-xs text-gray-600 mb-2'>
                            {scholarship.description?.substring(0, 80)}...
                          </p>
                          <div className='flex items-center gap-4 text-xs text-gray-600 mb-2'>
                            <div className='flex items-center gap-1'>
                              <Award className='h-3 w-3' />
                              <span>{scholarship.amount}</span>
                            </div>
                            <div className='flex items-center gap-1'>
                              <Clock className='h-3 w-3' />
                              <span>
                                {scholarship.application_deadline
                                  ? new Date(
                                      scholarship.application_deadline
                                    ).toLocaleDateString()
                                  : 'No deadline'}
                              </span>
                            </div>
                          </div>
                          <Button
                            size='sm'
                            variant='outline'
                            className='w-full text-xs'
                            onClick={() =>
                              navigate('/scholarships/' + scholarship.id)
                            }
                          >
                            <ExternalLink className='h-3 w-3 mr-1' />
                            Apply Now
                          </Button>
                        </div>
                      </div>
                    </div>
                  ))}

                  {programs.length === 0 &&
                    jobs.length === 0 &&
                    scholarships.length === 0 && (
                      <div className='text-center py-4'>
                        <Lightbulb className='h-8 w-8 text-gray-400 mx-auto mb-2' />
                        <p className='text-sm text-gray-500'>
                          No opportunities available
                        </p>
                        <Button
                          size='sm'
                          variant='outline'
                          className='mt-2'
                          onClick={() => navigate('/dashboard/explore')}
                        >
                          Explore More
                        </Button>
                      </div>
                    )}
                </>
              )}
            </CardContent>
          </Card>

          {/* My Groups */}
          <Card className='bg-white border border-gray-200 shadow-sm rounded-xl overflow-hidden'>
            <CardHeader className='pb-3'>
              <CardTitle className='text-lg font-semibold text-gray-900'>
                My Groups
              </CardTitle>
            </CardHeader>
            <CardContent className='space-y-3'>
              {groupsLoading ? (
                <div className='text-center py-4'>
                  <div className='animate-spin rounded-full h-6 w-6 border-b-2 border-blue-600 mx-auto'></div>
                  <p className='text-sm text-gray-500 mt-2'>
                    Loading groups...
                  </p>
                </div>
              ) : groups.length > 0 ? (
                groups.slice(0, 3).map((groupMember) => {
                  const group = groupMember.group;
                  return (
                    <div
                      key={groupMember.id}
                      className='border border-gray-200 rounded-lg p-3 hover:bg-gray-50'
                    >
                      <div className='flex items-start gap-3'>
                        <div className='w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0'>
                          <Users className='h-4 w-4 text-blue-600' />
                        </div>
                        <div className='flex-1 min-w-0'>
                          <div className='flex items-center gap-2 mb-1'>
                            <h4 className='font-semibold text-sm text-gray-900 truncate'>
                              {group?.name}
                            </h4>
                            <Badge className='text-xs bg-blue-100 text-blue-800 flex-shrink-0'>
                              {groupMember.role}
                            </Badge>
                          </div>
                          <p className='text-xs text-gray-600 mb-2'>
                            {group?.description?.substring(0, 60)}...
                          </p>
                          <div className='flex items-center gap-4 text-xs text-gray-600 mb-2'>
                            <div className='flex items-center gap-1'>
                              <Users className='h-3 w-3' />
                              <span>{group?.member_count || 0} members</span>
                            </div>
                            <div className='flex items-center gap-1'>
                              <BookOpen className='h-3 w-3' />
                              <span>{group?.category}</span>
                            </div>
                          </div>
                          <Button
                            size='sm'
                            variant='outline'
                            className='w-full text-xs'
                            onClick={() => navigate('/groups/' + group?.id)}
                          >
                            <ExternalLink className='h-3 w-3 mr-1' />
                            View Group
                          </Button>
                        </div>
                      </div>
                    </div>
                  );
                })
              ) : (
                <div className='text-center py-4'>
                  <Users className='h-8 w-8 text-gray-400 mx-auto mb-2' />
                  <p className='text-sm text-gray-500'>No groups joined yet</p>
                  <Button
                    size='sm'
                    variant='outline'
                    className='mt-2'
                    onClick={() => navigate('/groups')}
                  >
                    Find Groups
                  </Button>
                </div>
              )}
            </CardContent>
          </Card>

          {/* Recent Notifications */}
          <Card className='bg-white border border-gray-200 shadow-sm rounded-xl overflow-hidden'>
            <CardHeader className='pb-3'>
              <CardTitle className='text-lg font-semibold text-gray-900'>
                Recent Notifications
              </CardTitle>
            </CardHeader>
            <CardContent className='space-y-3'>
              {notificationsLoading ? (
                <div className='text-center py-4'>
                  <div className='animate-spin rounded-full h-6 w-6 border-b-2 border-blue-600 mx-auto'></div>
                  <p className='text-sm text-gray-500 mt-2'>
                    Loading notifications...
                  </p>
                </div>
              ) : notifications.length > 0 ? (
                notifications.slice(0, 3).map((notification) => (
                  <div
                    key={notification.id}
                    className='border border-gray-200 rounded-lg p-3 hover:bg-gray-50'
                  >
                    <div className='flex items-center gap-3 mb-2'>
                      <div
                        className={`w-8 h-8 rounded-full flex items-center justify-center ${
                          notification.type === 'connection_request'
                            ? 'bg-blue-100'
                            : notification.type === 'connection_accepted'
                            ? 'bg-green-100'
                            : notification.type === 'group_invite'
                            ? 'bg-purple-100'
                            : 'bg-gray-100'
                        }`}
                      >
                        {notification.type === 'connection_request' ? (
                          <UserPlus className='h-4 w-4 text-blue-600' />
                        ) : notification.type === 'connection_accepted' ? (
                          <Check className='h-4 w-4 text-green-600' />
                        ) : notification.type === 'group_invite' ? (
                          <Users className='h-4 w-4 text-purple-600' />
                        ) : (
                          <Bell className='h-4 w-4 text-gray-600' />
                        )}
                      </div>
                      <div className='flex-1'>
                        <h4 className='font-semibold text-sm text-gray-900'>
                          {notification.title}
                        </h4>
                        <p className='text-xs text-gray-600'>
                          {notification.message?.substring(0, 80)}...
                        </p>
                        <p className='text-xs text-gray-500 mt-1'>
                          {new Date(
                            notification.created_at
                          ).toLocaleDateString()}
                        </p>
                      </div>
                      {!notification.is_read && (
                        <div className='w-2 h-2 bg-blue-600 rounded-full'></div>
                      )}
                    </div>
                  </div>
                ))
              ) : (
                <div className='text-center py-4'>
                  <Bell className='h-8 w-8 text-gray-400 mx-auto mb-2' />
                  <p className='text-sm text-gray-500'>No notifications yet</p>
                </div>
              )}
            </CardContent>
          </Card>
        </div>

        {/* Floating Messaging Button */}
        <div className='fixed bottom-6 right-6 z-50'>
          <Button
            className='h-12 w-12 rounded-full bg-blue-600 hover:bg-blue-700 text-white shadow-lg'
            onClick={() => navigate('/dashboard/chat')}
          >
            <MessageSquare className='h-5 w-5' />
          </Button>
        </div>
      </div>
    </div>
  );
};

export default StudentDashboard;
