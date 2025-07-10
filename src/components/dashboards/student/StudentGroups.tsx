import { useEffect, useState } from 'react';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Input } from '@/components/ui/input';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Breadcrumb } from '../../dashboard/Breadcrumb';
import CreateGroupModal from '../../modals/CreateGroupModal';
import GroupViewModal from '../../modals/GroupViewModal';
import ChatModal from '../../modals/ChatModal';
import JoinGroupsModal from '../../modals/JoinGroupsModal';
import { useToast } from '@/hooks/use-toast';
import {
  Users,
  Search,
  Plus,
  MessageSquare,
  Calendar,
  Globe,
  Lock,
  TrendingUp,
  Star,
  Eye,
} from 'lucide-react';

const StudentGroups = () => {
  const { toast } = useToast();
  const [searchQuery, setSearchQuery] = useState('');
  const [isCreateGroupOpen, setIsCreateGroupOpen] = useState(false);
  const [isGroupViewOpen, setIsGroupViewOpen] = useState(false);
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [isJoinGroupsOpen, setIsJoinGroupsOpen] = useState(false);
  const [selectedGroup, setSelectedGroup] = useState<any>(null);

  // Scroll to top on component mount
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);

  const myGroups = [
    {
      id: 1,
      name: 'Computer Science Students',
      description: 'Connect with CS students worldwide',
      members: 245,
      category: 'Computer Science',
      privacy: 'public',
      role: 'member',
      lastActivity: '2 hours ago',
      unreadMessages: 5,
      image: 'CS',
      activity: 'Very Active',
    },
    {
      id: 2,
      name: 'AI Research Group',
      description: 'Discussing latest AI research and papers',
      members: 89,
      category: 'Research',
      privacy: 'private',
      role: 'moderator',
      lastActivity: '1 day ago',
      unreadMessages: 12,
      image: 'AI',
      activity: 'Active',
    },
    {
      id: 3,
      name: 'Study Abroad Network',
      description: 'Share experiences and tips for studying abroad',
      members: 567,
      category: 'Education',
      privacy: 'public',
      role: 'member',
      lastActivity: '3 hours ago',
      unreadMessages: 3,
      image: 'SA',
      activity: 'Moderate',
    },
  ];

  const suggestedGroups = [
    {
      id: 4,
      name: 'Machine Learning Enthusiasts',
      description: 'Learn and discuss ML concepts together',
      members: 1234,
      category: 'Machine Learning',
      privacy: 'public',
      trending: true,
      image: 'ML',
    },
    {
      id: 5,
      name: 'International Students Hub',
      description: 'Support network for international students',
      members: 890,
      category: 'Community',
      privacy: 'public',
      trending: false,
      image: 'IS',
    },
    {
      id: 6,
      name: 'Data Science Projects',
      description: 'Collaborate on data science projects',
      members: 456,
      category: 'Data Science',
      privacy: 'public',
      trending: true,
      image: 'DS',
    },
  ];

  const filteredMyGroups = myGroups.filter(
    (group) =>
      group.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      group.description.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const filteredSuggestedGroups = suggestedGroups.filter(
    (group) =>
      group.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      group.description.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleViewGroup = (group: any) => {
    setSelectedGroup(group);
    setIsGroupViewOpen(true);
  };

  const handleChatGroup = (group: any) => {
    setSelectedGroup(group);
    setIsChatOpen(true);
  };

  const handlePreviewGroup = (group: any) => {
    setSelectedGroup(group);
    setIsGroupViewOpen(true);
  };

  const handleJoinGroup = (group: any) => {
    toast({
      title: 'Joined Group!',
      description: `You have successfully joined ${group.name}`,
    });
  };

  return (
    <div className='p-6 space-y-6'>
      <Breadcrumb
        items={[
          { label: 'Dashboard', href: '/dashboard' },
          { label: 'My Groups' },
        ]}
      />

      <div className='flex justify-between items-center'>
        <div>
          <h1 className='text-2xl font-bold text-gray-900'>My Groups</h1>
          <p className='text-gray-600'>
            Connect with global academic communities
          </p>
        </div>
        <div className='flex gap-2'>
          <Button variant='outline' onClick={() => setIsJoinGroupsOpen(true)}>
            <Search className='h-4 w-4 mr-2' />
            Browse Groups
          </Button>
          <Button
            className='bg-blue-600 hover:bg-blue-700'
            onClick={() => setIsCreateGroupOpen(true)}
          >
            <Plus className='h-4 w-4 mr-2' />
            Create Group
          </Button>
        </div>
      </div>

      {/* Search */}
      <div className='relative'>
        <Search className='absolute left-3 top-3 h-4 w-4 text-gray-400' />
        <Input
          placeholder='Search groups...'
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className='pl-10 max-w-md'
        />
      </div>

      <Tabs defaultValue='my-groups' className='space-y-6'>
        <TabsList>
          <TabsTrigger value='my-groups'>
            My Groups ({myGroups.length})
          </TabsTrigger>
          <TabsTrigger value='discover'>Discover Groups</TabsTrigger>
        </TabsList>

        <TabsContent value='my-groups' className='space-y-4'>
          <div className='grid gap-4'>
            {filteredMyGroups.map((group) => (
              <Card
                key={group.id}
                className='hover:shadow-lg transition-shadow'
              >
                <CardContent className='p-6'>
                  <div className='flex items-start justify-between'>
                    <div className='flex items-start space-x-4 flex-1'>
                      <Avatar className='h-12 w-12 bg-blue-100 text-blue-600'>
                        <AvatarFallback className='bg-blue-100 text-blue-600'>
                          {group.image}
                        </AvatarFallback>
                      </Avatar>
                      <div className='flex-1'>
                        <div className='flex items-center gap-2 mb-1'>
                          <h3 className='font-semibold text-gray-900'>
                            {group.name}
                          </h3>
                          {group.privacy === 'private' ? (
                            <Lock className='h-4 w-4 text-gray-500' />
                          ) : (
                            <Globe className='h-4 w-4 text-gray-500' />
                          )}
                          {group.role === 'moderator' && (
                            <Badge className='bg-green-100 text-green-700'>
                              Moderator
                            </Badge>
                          )}
                        </div>
                        <p className='text-gray-600 text-sm mb-2'>
                          {group.description}
                        </p>
                        <div className='flex items-center gap-4 text-sm text-gray-500'>
                          <div className='flex items-center gap-1'>
                            <Users className='h-4 w-4' />
                            {group.members} members
                          </div>
                          <Badge variant='outline'>{group.category}</Badge>
                          <span>Active {group.lastActivity}</span>
                        </div>
                      </div>
                    </div>
                    <div className='flex items-center gap-2'>
                      {group.unreadMessages > 0 && (
                        <Badge className='bg-red-500 text-white'>
                          {group.unreadMessages}
                        </Badge>
                      )}
                      <Button
                        variant='outline'
                        size='sm'
                        onClick={() => handleChatGroup(group)}
                      >
                        <MessageSquare className='h-4 w-4 mr-2' />
                        Chat
                      </Button>
                      <Button
                        size='sm'
                        className='bg-blue-600 hover:bg-blue-700'
                        onClick={() => handleViewGroup(group)}
                      >
                        <Eye className='h-4 w-4 mr-2' />
                        View Group
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value='discover' className='space-y-4'>
          <div className='grid gap-4'>
            {filteredSuggestedGroups.map((group) => (
              <Card
                key={group.id}
                className='hover:shadow-lg transition-shadow'
              >
                <CardContent className='p-6'>
                  <div className='flex items-start justify-between'>
                    <div className='flex items-start space-x-4 flex-1'>
                      <Avatar className='h-12 w-12 bg-purple-100 text-purple-600'>
                        <AvatarFallback className='bg-purple-100 text-purple-600'>
                          {group.image}
                        </AvatarFallback>
                      </Avatar>
                      <div className='flex-1'>
                        <div className='flex items-center gap-2 mb-1'>
                          <h3 className='font-semibold text-gray-900'>
                            {group.name}
                          </h3>
                          <Globe className='h-4 w-4 text-gray-500' />
                          {group.trending && (
                            <Badge className='bg-orange-100 text-orange-700 flex items-center gap-1'>
                              <TrendingUp className='h-3 w-3' />
                              Trending
                            </Badge>
                          )}
                        </div>
                        <p className='text-gray-600 text-sm mb-2'>
                          {group.description}
                        </p>
                        <div className='flex items-center gap-4 text-sm text-gray-500'>
                          <div className='flex items-center gap-1'>
                            <Users className='h-4 w-4' />
                            {group.members} members
                          </div>
                          <Badge variant='outline'>{group.category}</Badge>
                        </div>
                      </div>
                    </div>
                    <div className='flex items-center gap-2'>
                      <Button
                        variant='outline'
                        size='sm'
                        onClick={() => handlePreviewGroup(group)}
                      >
                        <Eye className='h-4 w-4 mr-2' />
                        Preview
                      </Button>
                      <Button
                        size='sm'
                        className='bg-green-600 hover:bg-green-700'
                        onClick={() => handleJoinGroup(group)}
                      >
                        <Plus className='h-4 w-4 mr-2' />
                        Join Group
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>
      </Tabs>

      {/* Modals */}
      <CreateGroupModal
        isOpen={isCreateGroupOpen}
        onClose={() => setIsCreateGroupOpen(false)}
      />

      <GroupViewModal
        open={isGroupViewOpen}
        onOpenChange={setIsGroupViewOpen}
        group={selectedGroup}
      />

      <ChatModal
        isOpen={isChatOpen}
        onClose={() => setIsChatOpen(false)}
        recipientName={selectedGroup?.name || 'Group Chat'}
        recipientRole='group'
      />

      <JoinGroupsModal
        open={isJoinGroupsOpen}
        onOpenChange={setIsJoinGroupsOpen}
      />
    </div>
  );
};

export default StudentGroups;
