import { useState } from 'react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import {
  Crown,
  Users,
  MessageSquare,
  BarChart,
  Settings,
  Heart,
  MessageCircle,
  Share,
  Flag,
  Edit,
  Trash2,
  UserPlus,
  Shield,
  Globe,
  Lock,
  Bell,
  Volume2,
  VolumeX,
  Image,
  Bold,
  Italic,
  List,
  Link,
  Smile,
  Paperclip,
  Send,
  ThumbsUp,
  MessageCircle as CommentIcon,
} from 'lucide-react';
import { CountryFlag } from '@/components/ui/CountryFlag';
import { getCountryCode } from '@/lib/countries';
import { Badge } from '@/components/ui/badge';

interface GroupMember {
  id: string;
  name: string;
  role: string;
  country: string;
  avatar: string;
  posts: number;
  joinDate: string;
  lastActive: string;
}

interface GroupPost {
  id: string;
  author: {
    name: string;
    role: string;
    country: string;
    avatar: string;
  };
  content: string;
  timestamp: string;
  likes: number;
  comments: number;
  type: 'discussion' | 'question' | 'resource' | 'announcement';
  isLiked?: boolean;
  isCommented?: boolean;
}

interface Group {
  id: string;
  name: string;
  description: string;
  role: string;
  members: GroupMember[];
  posts: GroupPost[];
}

interface GroupViewModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  group?: Group;
}

const GroupViewModal = ({ open, onOpenChange, group }: GroupViewModalProps) => {
  const [activeTab, setActiveTab] = useState('insights');
  const [newPostContent, setNewPostContent] = useState('');
  const [newPostType, setNewPostType] = useState<
    'discussion' | 'question' | 'resource' | 'announcement'
  >('discussion');
  const [isBold, setIsBold] = useState(false);
  const [isItalic, setIsItalic] = useState(false);
  const [isList, setIsList] = useState(false);
  const [displayPosts, setDisplayPosts] = useState<GroupPost[]>([]);

  if (!group) return null;

  // Ensure posts and members arrays exist and are arrays
  const posts = Array.isArray(group.posts) ? group.posts : [];
  const members = Array.isArray(group.members) ? group.members : [];

  // Helper function to safely slice arrays
  const safeSlice = <T extends any>(
    arr: T[],
    start: number,
    end?: number
  ): T[] => {
    if (!Array.isArray(arr)) return [];
    return arr.slice(start, end);
  };

  // Dummy data for posts
  const dummyPosts: GroupPost[] = [
    {
      id: '1',
      author: {
        name: 'Dr. Sarah Wilson',
        role: 'Professor',
        country: 'United States',
        avatar: 'SW',
      },
      content:
        'Just published a new paper on neural network architectures. Would love to discuss the implications with the group!',
      timestamp: '2 hours ago',
      likes: 24,
      comments: 8,
      type: 'discussion',
      isLiked: false,
      isCommented: false,
    },
    {
      id: '2',
      author: {
        name: 'Prof. Michael Chen',
        role: 'Associate Professor',
        country: 'Canada',
        avatar: 'MC',
      },
      content:
        "Has anyone tried implementing the new transformer models for computer vision tasks? I'm getting interesting results.",
      timestamp: '5 hours ago',
      likes: 18,
      comments: 12,
      type: 'question',
      isLiked: true,
      isCommented: false,
    },
    {
      id: '3',
      author: {
        name: 'Dr. Emma Rodriguez',
        role: 'Research Fellow',
        country: 'Spain',
        avatar: 'ER',
      },
      content:
        'Great resource alert! Check out this comprehensive guide on deep learning fundamentals: [link]',
      timestamp: '1 day ago',
      likes: 31,
      comments: 5,
      type: 'resource',
      isLiked: false,
      isCommented: true,
    },
    {
      id: '4',
      author: {
        name: 'Prof. David Kim',
        role: 'Professor',
        country: 'South Korea',
        avatar: 'DK',
      },
      content:
        'Important: Our monthly research symposium will be held next Friday. Please submit your abstracts by Wednesday.',
      timestamp: '2 days ago',
      likes: 15,
      comments: 3,
      type: 'announcement',
      isLiked: false,
      isCommented: false,
    },
    {
      id: '5',
      author: {
        name: 'Dr. Lisa Zhang',
        role: 'Assistant Professor',
        country: 'China',
        avatar: 'LZ',
      },
      content:
        'Fascinating discussion on ethical AI yesterday. Here are my thoughts on implementing fairness constraints in ML models.',
      timestamp: '3 days ago',
      likes: 22,
      comments: 9,
      type: 'discussion',
      isLiked: true,
      isCommented: false,
    },
  ];

  // Dummy data for members
  const dummyMembers: GroupMember[] = [
    {
      id: '1',
      name: 'Dr. Sarah Wilson',
      role: 'Professor',
      country: 'United States',
      avatar: 'SW',
      posts: 45,
      joinDate: 'Jan 2023',
      lastActive: '2 hours ago',
    },
    {
      id: '2',
      name: 'Prof. Michael Chen',
      role: 'Associate Professor',
      country: 'Canada',
      avatar: 'MC',
      posts: 38,
      joinDate: 'Feb 2023',
      lastActive: '5 hours ago',
    },
    {
      id: '3',
      name: 'Dr. Emma Rodriguez',
      role: 'Research Fellow',
      country: 'Spain',
      avatar: 'ER',
      posts: 29,
      joinDate: 'Mar 2023',
      lastActive: '1 day ago',
    },
    {
      id: '4',
      name: 'Prof. David Kim',
      role: 'Professor',
      country: 'South Korea',
      avatar: 'DK',
      posts: 52,
      joinDate: 'Jan 2023',
      lastActive: '2 days ago',
    },
    {
      id: '5',
      name: 'Dr. Lisa Zhang',
      role: 'Assistant Professor',
      country: 'China',
      avatar: 'LZ',
      posts: 33,
      joinDate: 'Apr 2023',
      lastActive: '3 days ago',
    },
    {
      id: '6',
      name: 'Prof. Ahmed Hassan',
      role: 'Professor',
      country: 'Egypt',
      avatar: 'AH',
      posts: 27,
      joinDate: 'May 2023',
      lastActive: '1 week ago',
    },
    {
      id: '7',
      name: 'Dr. Maria Silva',
      role: 'Research Associate',
      country: 'Brazil',
      avatar: 'MS',
      posts: 19,
      joinDate: 'Jun 2023',
      lastActive: '2 weeks ago',
    },
    {
      id: '8',
      name: 'Prof. James Thompson',
      role: 'Professor',
      country: 'Australia',
      avatar: 'JT',
      posts: 41,
      joinDate: 'Jan 2023',
      lastActive: '3 days ago',
    },
  ];

  // Use dummy data if no real data exists
  const displayMembers = members.length > 0 ? members : dummyMembers;

  // Initialize displayPosts with dummy data if not already set
  if (displayPosts.length === 0) {
    setDisplayPosts(posts.length > 0 ? posts : dummyPosts);
  }

  const getPostTypeIcon = (type: string) => {
    switch (type) {
      case 'discussion':
        return <MessageCircle className='h-4 w-4 text-blue-500' />;
      case 'question':
        return <MessageSquare className='h-4 w-4 text-green-500' />;
      case 'resource':
        return <Share className='h-4 w-4 text-purple-500' />;
      case 'announcement':
        return <Bell className='h-4 w-4 text-orange-500' />;
      default:
        return <MessageCircle className='h-4 w-4 text-gray-500' />;
    }
  };

  const getPostTypeBadge = (type: string) => {
    const variants = {
      discussion: 'bg-blue-100 text-blue-700',
      question: 'bg-green-100 text-green-700',
      resource: 'bg-purple-100 text-purple-700',
      announcement: 'bg-orange-100 text-orange-700',
    };
    return (
      variants[type as keyof typeof variants] || 'bg-gray-100 text-gray-700'
    );
  };

  const handleCreatePost = () => {
    if (newPostContent.trim()) {
      // Handle post creation logic here
      setNewPostContent('');
      setNewPostType('discussion');
    }
  };

  const handleLikePost = (postId: string) => {
    setDisplayPosts((prevPosts) =>
      prevPosts.map((post) =>
        post.id === postId
          ? {
              ...post,
              likes: post.isLiked ? post.likes - 1 : post.likes + 1,
              isLiked: !post.isLiked,
            }
          : post
      )
    );
  };

  const handleCommentPost = (postId: string) => {
    setDisplayPosts((prevPosts) =>
      prevPosts.map((post) =>
        post.id === postId
          ? {
              ...post,
              comments: post.isCommented ? post.comments : post.comments + 1,
              isCommented: true,
            }
          : post
      )
    );
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className='max-w-6xl h-[90vh] flex flex-col p-0'>
        <DialogHeader className='flex-none p-6 border-b'>
          <div className='flex items-center justify-between'>
            <div>
              <DialogTitle className='text-2xl font-bold flex items-center gap-2'>
                {group.name}
                {group.role === 'moderator' && (
                  <Crown className='h-5 w-5 text-yellow-500' />
                )}
              </DialogTitle>
              <DialogDescription className='text-base mt-2'>
                {group.description}
              </DialogDescription>
            </div>
            {/* <div className='flex items-center gap-3'>
              <Button
                variant='outline'
                className='flex items-center gap-2'
                onClick={() => setActiveTab('settings')}
              >
                <Settings className='h-4 w-4' />
                Group Settings
              </Button>
            </div> */}
          </div>
        </DialogHeader>

        <div className='flex-1 overflow-hidden'>
          <Tabs
            value={activeTab}
            onValueChange={setActiveTab}
            className='h-full flex flex-col'
          >
            <TabsList className='w-full justify-start border-b px-6 bg-gradient-to-r from-gray-50 to-blue-50 h-16'>
              <TabsTrigger
                value='insights'
                className='flex items-center gap-3 px-6 py-3 text-base font-medium data-[state=active]:bg-white data-[state=active]:shadow-lg data-[state=active]:border-b-2 data-[state=active]:border-blue-500 data-[state=active]:text-blue-600 data-[state=active]:scale-105 transition-all duration-200 hover:bg-white/80'
              >
                <BarChart className='h-5 w-5' />
                Insights
              </TabsTrigger>
              <TabsTrigger
                value='posts'
                className='flex items-center gap-3 px-6 py-3 text-base font-medium data-[state=active]:bg-white data-[state=active]:shadow-lg data-[state=active]:border-b-2 data-[state=active]:border-blue-500 data-[state=active]:text-blue-600 data-[state=active]:scale-105 transition-all duration-200 hover:bg-white/80'
              >
                <MessageSquare className='h-5 w-5' />
                Posts
              </TabsTrigger>
              <TabsTrigger
                value='members'
                className='flex items-center gap-3 px-6 py-3 text-base font-medium data-[state=active]:bg-white data-[state=active]:shadow-lg data-[state=active]:border-b-2 data-[state=active]:border-blue-500 data-[state=active]:text-blue-600 data-[state=active]:scale-105 transition-all duration-200 hover:bg-white/80'
              >
                <Users className='h-5 w-5' />
                Members
              </TabsTrigger>
              <TabsTrigger
                value='settings'
                className='flex items-center gap-3 px-6 py-3 text-base font-medium data-[state=active]:bg-white data-[state=active]:shadow-lg data-[state=active]:border-b-2 data-[state=active]:border-blue-500 data-[state=active]:text-blue-600 data-[state=active]:scale-105 transition-all duration-200 hover:bg-white/80'
              >
                <Settings className='h-5 w-5' />
                Settings
              </TabsTrigger>
            </TabsList>

            <div className='flex-1 overflow-hidden'>
              <TabsContent value='insights' className='h-full overflow-y-auto'>
                <div className='p-6 space-y-6'>
                  <div className='grid grid-cols-3 gap-4'>
                    <Card>
                      <CardHeader>
                        <CardTitle className='text-lg flex items-center gap-2'>
                          <MessageSquare className='h-5 w-5' />
                          Total Posts
                        </CardTitle>
                      </CardHeader>
                      <CardContent>
                        <p className='text-3xl font-bold'>
                          {displayPosts.length}
                        </p>
                      </CardContent>
                    </Card>
                    <Card>
                      <CardHeader>
                        <CardTitle className='text-lg flex items-center gap-2'>
                          <Users className='h-5 w-5' />
                          Active Members
                        </CardTitle>
                      </CardHeader>
                      <CardContent>
                        <p className='text-3xl font-bold'>
                          {displayMembers.length}
                        </p>
                      </CardContent>
                    </Card>
                    <Card>
                      <CardHeader>
                        <CardTitle className='text-lg flex items-center gap-2'>
                          <BarChart className='h-5 w-5' />
                          Engagement Rate
                        </CardTitle>
                      </CardHeader>
                      <CardContent>
                        <p className='text-3xl font-bold'>78%</p>
                      </CardContent>
                    </Card>
                  </div>

                  <Card>
                    <CardHeader>
                      <CardTitle className='text-lg'>Recent Activity</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className='space-y-4'>
                        {safeSlice(displayPosts, 0, 3).map((post) => (
                          <div
                            key={post.id}
                            className='flex items-start space-x-4'
                          >
                            <Avatar>
                              <AvatarFallback>
                                {post.author.avatar}
                              </AvatarFallback>
                            </Avatar>
                            <div className='flex-1'>
                              <div className='flex items-center gap-2 mb-1'>
                                <span className='font-medium'>
                                  {post.author.name}
                                </span>
                                <CountryFlag
                                  code={
                                    getCountryCode(post.author.country) || ''
                                  }
                                  size={16}
                                />
                                {getPostTypeIcon(post.type)}
                              </div>
                              <p className='text-sm text-gray-600'>
                                {post.content}
                              </p>
                              <span className='text-xs text-gray-500'>
                                {post.timestamp}
                              </span>
                            </div>
                          </div>
                        ))}
                      </div>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardHeader>
                      <CardTitle className='text-lg'>
                        Top Contributors
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className='space-y-4'>
                        {safeSlice(displayMembers, 0, 5).map((member) => (
                          <div
                            key={member.id}
                            className='flex items-center justify-between'
                          >
                            <div className='flex items-center space-x-3'>
                              <Avatar>
                                <AvatarFallback>{member.avatar}</AvatarFallback>
                              </Avatar>
                              <div>
                                <div className='flex items-center gap-2'>
                                  <p className='font-medium'>{member.name}</p>
                                  <CountryFlag
                                    code={getCountryCode(member.country) || ''}
                                    size={16}
                                  />
                                </div>
                                <p className='text-sm text-gray-600'>
                                  {member.role}
                                </p>
                              </div>
                            </div>
                            <Badge variant='outline'>
                              {member.posts} posts
                            </Badge>
                          </div>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </TabsContent>

              <TabsContent value='posts' className='h-full overflow-y-auto'>
                <div className='p-6 space-y-6'>
                  {/* Create Post Section */}
                  <Card>
                    <CardHeader>
                      <CardTitle className='text-lg flex items-center gap-2'>
                        <Edit className='h-5 w-5 text-blue-600' />
                        Create New Post
                      </CardTitle>
                    </CardHeader>
                    <CardContent className='space-y-4'>
                      <div className='flex gap-2'>
                        <Button
                          size='sm'
                          variant={
                            newPostType === 'discussion' ? 'default' : 'outline'
                          }
                          onClick={() => setNewPostType('discussion')}
                        >
                          <MessageCircle className='h-4 w-4 mr-1' />
                          Discussion
                        </Button>
                        <Button
                          size='sm'
                          variant={
                            newPostType === 'question' ? 'default' : 'outline'
                          }
                          onClick={() => setNewPostType('question')}
                        >
                          <MessageSquare className='h-4 w-4 mr-1' />
                          Question
                        </Button>
                        <Button
                          size='sm'
                          variant={
                            newPostType === 'resource' ? 'default' : 'outline'
                          }
                          onClick={() => setNewPostType('resource')}
                        >
                          <Share className='h-4 w-4 mr-1' />
                          Resource
                        </Button>
                        <Button
                          size='sm'
                          variant={
                            newPostType === 'announcement'
                              ? 'default'
                              : 'outline'
                          }
                          onClick={() => setNewPostType('announcement')}
                        >
                          <Bell className='h-4 w-4 mr-1' />
                          Announcement
                        </Button>
                      </div>

                      <div className='border rounded-lg p-4 bg-gray-50'>
                        <div className='flex items-center gap-2 mb-3'>
                          <Button
                            size='sm'
                            variant={isBold ? 'default' : 'outline'}
                            onClick={() => setIsBold(!isBold)}
                          >
                            <Bold className='h-4 w-4' />
                          </Button>
                          <Button
                            size='sm'
                            variant={isItalic ? 'default' : 'outline'}
                            onClick={() => setIsItalic(!isItalic)}
                          >
                            <Italic className='h-4 w-4' />
                          </Button>
                          <Button
                            size='sm'
                            variant={isList ? 'default' : 'outline'}
                            onClick={() => setIsList(!isList)}
                          >
                            <List className='h-4 w-4' />
                          </Button>
                          <Button size='sm' variant='outline'>
                            <Link className='h-4 w-4' />
                          </Button>
                          <Button size='sm' variant='outline'>
                            <Image className='h-4 w-4' />
                          </Button>
                          <Button size='sm' variant='outline'>
                            <Paperclip className='h-4 w-4' />
                          </Button>
                          <Button size='sm' variant='outline'>
                            <Smile className='h-4 w-4' />
                          </Button>
                        </div>

                        <Textarea
                          placeholder='Share your thoughts, questions, or resources with the group...'
                          value={newPostContent}
                          onChange={(e) => setNewPostContent(e.target.value)}
                          className='min-h-[120px] resize-none border-0 bg-white'
                        />

                        <div className='flex items-center justify-between mt-3 pt-3 border-t'>
                          <div className='flex items-center gap-2 text-sm text-gray-500'>
                            <span>Posting as: Dr. Sarah Wilson</span>
                          </div>
                          <Button
                            onClick={handleCreatePost}
                            disabled={!newPostContent.trim()}
                            className='bg-blue-600 hover:bg-blue-700'
                          >
                            <Send className='h-4 w-4 mr-2' />
                            Post
                          </Button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  {/* Posts List */}
                  <div className='space-y-4'>
                    {displayPosts.map((post) => (
                      <Card
                        key={post.id}
                        className='hover:shadow-md transition-shadow'
                      >
                        <CardContent className='p-4'>
                          <div className='flex items-start space-x-4'>
                            <Avatar>
                              <AvatarFallback>
                                {post.author.avatar}
                              </AvatarFallback>
                            </Avatar>
                            <div className='flex-1'>
                              <div className='flex items-center gap-2 mb-1'>
                                <h4 className='font-medium'>
                                  {post.author.name}
                                </h4>
                                <CountryFlag
                                  code={
                                    getCountryCode(post.author.country) || ''
                                  }
                                  size={16}
                                />
                                <span className='text-sm text-gray-500'>
                                  {post.author.role}
                                </span>
                                <Badge
                                  className={`text-xs ${getPostTypeBadge(
                                    post.type
                                  )}`}
                                >
                                  {post.type}
                                </Badge>
                              </div>
                              <p className='text-sm text-gray-600 mb-3'>
                                {post.content}
                              </p>
                              <div className='flex items-center justify-between'>
                                <div className='flex items-center gap-4 text-sm text-gray-500'>
                                  <span>{post.timestamp}</span>
                                </div>
                                <div className='flex items-center gap-3'>
                                  <Button
                                    size='sm'
                                    variant={post.isLiked ? 'default' : 'ghost'}
                                    className={`flex items-center gap-1 ${
                                      post.isLiked
                                        ? 'bg-red-500 hover:bg-red-600 text-white'
                                        : 'hover:bg-red-50 hover:text-red-600'
                                    }`}
                                    onClick={() => handleLikePost(post.id)}
                                  >
                                    <ThumbsUp
                                      className={`h-4 w-4 ${
                                        post.isLiked ? 'fill-current' : ''
                                      }`}
                                    />
                                    <span className='text-xs'>
                                      {post.likes}
                                    </span>
                                  </Button>
                                  <Button
                                    size='sm'
                                    variant={
                                      post.isCommented ? 'default' : 'ghost'
                                    }
                                    className={`flex items-center gap-1 ${
                                      post.isCommented
                                        ? 'bg-blue-500 hover:bg-blue-600 text-white'
                                        : 'hover:bg-blue-50 hover:text-blue-600'
                                    }`}
                                    onClick={() => handleCommentPost(post.id)}
                                  >
                                    <CommentIcon
                                      className={`h-4 w-4 ${
                                        post.isCommented ? 'fill-current' : ''
                                      }`}
                                    />
                                    <span className='text-xs'>
                                      {post.comments}
                                    </span>
                                  </Button>
                                  <Button
                                    size='sm'
                                    variant='ghost'
                                    className='hover:bg-gray-100'
                                  >
                                    <Share className='h-4 w-4' />
                                  </Button>
                                </div>
                              </div>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                </div>
              </TabsContent>

              <TabsContent value='members' className='h-full overflow-y-auto'>
                <div className='p-6 space-y-4'>
                  {displayMembers.map((member) => (
                    <Card key={member.id}>
                      <CardContent className='p-4'>
                        <div className='flex items-center justify-between'>
                          <div className='flex items-center space-x-3'>
                            <Avatar>
                              <AvatarFallback>{member.avatar}</AvatarFallback>
                            </Avatar>
                            <div>
                              <div className='flex items-center gap-2'>
                                <p className='font-medium'>{member.name}</p>
                                <CountryFlag
                                  code={getCountryCode(member.country) || ''}
                                  size={16}
                                />
                              </div>
                              <p className='text-sm text-gray-600'>
                                {member.role}
                              </p>
                              <div className='text-xs text-gray-500'>
                                Joined {member.joinDate} • Last active{' '}
                                {member.lastActive}
                              </div>
                            </div>
                          </div>
                          <div className='flex items-center gap-2'>
                            <Badge variant='outline'>
                              {member.posts} posts
                            </Badge>
                            {member.role === 'moderator' && (
                              <Crown className='h-5 w-5 text-yellow-500' />
                            )}
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </TabsContent>

              <TabsContent value='settings' className='h-full overflow-y-auto'>
                <div className='p-6 space-y-6'>
                  <Card>
                    <CardHeader>
                      <CardTitle className='flex items-center gap-2'>
                        <Globe className='h-5 w-5 text-blue-600' />
                        Group Privacy
                      </CardTitle>
                    </CardHeader>
                    <CardContent className='space-y-4'>
                      <div className='flex items-center justify-between'>
                        <div>
                          <h4 className='font-medium'>Privacy Level</h4>
                          <p className='text-sm text-gray-600'>
                            Control who can see and join this group
                          </p>
                        </div>
                        <Badge className='bg-green-100 text-green-700'>
                          Public
                        </Badge>
                      </div>
                      <div className='space-y-2'>
                        <div className='flex items-center gap-2'>
                          <Globe className='h-4 w-4 text-gray-500' />
                          <span className='text-sm'>
                            Anyone can view and join
                          </span>
                        </div>
                        <div className='flex items-center gap-2'>
                          <Lock className='h-4 w-4 text-gray-500' />
                          <span className='text-sm'>
                            Approval required for joining
                          </span>
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardHeader>
                      <CardTitle className='flex items-center gap-2'>
                        <Bell className='h-5 w-5 text-orange-600' />
                        Notifications
                      </CardTitle>
                    </CardHeader>
                    <CardContent className='space-y-4'>
                      <div className='space-y-3'>
                        <div className='flex items-center justify-between'>
                          <span className='text-sm'>New posts</span>
                          <Badge className='bg-green-100 text-green-700'>
                            On
                          </Badge>
                        </div>
                        <div className='flex items-center justify-between'>
                          <span className='text-sm'>Member activity</span>
                          <Badge variant='secondary'>Off</Badge>
                        </div>
                        <div className='flex items-center justify-between'>
                          <span className='text-sm'>Weekly digest</span>
                          <Badge className='bg-green-100 text-green-700'>
                            On
                          </Badge>
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardHeader>
                      <CardTitle className='flex items-center gap-2'>
                        <Shield className='h-5 w-5 text-red-600' />
                        Moderation
                      </CardTitle>
                    </CardHeader>
                    <CardContent className='space-y-4'>
                      <div className='space-y-3'>
                        <div className='flex items-center justify-between'>
                          <span className='text-sm'>
                            Post approval required
                          </span>
                          <Badge variant='secondary'>Off</Badge>
                        </div>
                        <div className='flex items-center justify-between'>
                          <span className='text-sm'>
                            Member approval required
                          </span>
                          <Badge className='bg-green-100 text-green-700'>
                            On
                          </Badge>
                        </div>
                        <div className='flex items-center justify-between'>
                          <span className='text-sm'>Content filtering</span>
                          <Badge className='bg-green-100 text-green-700'>
                            On
                          </Badge>
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardHeader>
                      <CardTitle className='flex items-center gap-2'>
                        <Settings className='h-5 w-5 text-gray-600' />
                        Group Management
                      </CardTitle>
                    </CardHeader>
                    <CardContent className='space-y-4'>
                      <div className='grid grid-cols-2 gap-4'>
                        <Button variant='outline' className='w-full'>
                          <Edit className='h-4 w-4 mr-2' />
                          Edit Group
                        </Button>
                        <Button variant='outline' className='w-full'>
                          <UserPlus className='h-4 w-4 mr-2' />
                          Invite Members
                        </Button>
                        <Button variant='outline' className='w-full'>
                          <Flag className='h-4 w-4 mr-2' />
                          Report Issues
                        </Button>
                        <Button
                          variant='outline'
                          className='w-full text-red-600'
                        >
                          <Trash2 className='h-4 w-4 mr-2' />
                          Leave Group
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </TabsContent>
            </div>
          </Tabs>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default GroupViewModal;
