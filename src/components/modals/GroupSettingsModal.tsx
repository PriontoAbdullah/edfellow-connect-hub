import { useState } from 'react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Switch } from '@/components/ui/switch';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import {
  Settings,
  Users,
  Bell,
  Shield,
  UserPlus,
  UserMinus,
  Crown,
  MessageSquare,
  AlertTriangle,
  Lock,
  Globe,
  UserCheck,
  X,
  Save,
} from 'lucide-react';
import { CountryFlag } from '@/components/ui/CountryFlag';
import { getCountryCode } from '@/lib/countries';
import { useToast } from '@/hooks/use-toast';

interface GroupSettingsModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  group?: {
    id: number;
    name: string;
    description: string;
    category: string;
    privacy: 'public' | 'private';
    members: number;
    role: string;
  };
}

const mockMembers = [
  {
    id: 1,
    name: 'Dr. Sarah Johnson',
    role: 'Moderator',
    country: 'United States',
    joinDate: '3 months ago',
    status: 'active',
  },
  {
    id: 2,
    name: 'Prof. Michael Chen',
    role: 'Member',
    country: 'Canada',
    joinDate: '2 months ago',
    status: 'active',
  },
  {
    id: 3,
    name: 'Emily Parker',
    role: 'Member',
    country: 'United Kingdom',
    joinDate: '1 month ago',
    status: 'inactive',
  },
];

const GroupSettingsModal = ({
  open,
  onOpenChange,
  group,
}: GroupSettingsModalProps) => {
  const [activeTab, setActiveTab] = useState('general');
  const [isEditing, setIsEditing] = useState(false);
  const [settings, setSettings] = useState({
    name: group?.name || '',
    description: group?.description || '',
    category: group?.category || '',
    privacy: group?.privacy || 'public',
    notifications: {
      newMembers: true,
      newPosts: true,
      mentions: true,
    },
    moderation: {
      approveMembers: true,
      approvePosts: false,
      allowInvites: true,
    },
  });
  const { toast } = useToast();

  const handleSave = () => {
    setIsEditing(false);
    toast({
      title: 'Settings Saved',
      description: 'Group settings have been updated successfully.',
    });
  };

  const handleRemoveMember = (memberId: number) => {
    toast({
      title: 'Member Removed',
      description: 'Member has been removed from the group.',
    });
  };

  const handlePromoteMember = (memberId: number) => {
    toast({
      title: 'Member Promoted',
      description: 'Member has been promoted to moderator.',
    });
  };

  if (!group) return null;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className='max-w-4xl max-h-[90vh]'>
        <DialogHeader>
          <DialogTitle className='text-2xl font-bold flex items-center gap-2'>
            <Settings className='h-6 w-6 text-blue-600' />
            Group Settings
          </DialogTitle>
          <DialogDescription>
            Manage group settings, members, and permissions
          </DialogDescription>
        </DialogHeader>

        <Tabs value={activeTab} onValueChange={setActiveTab} className='mt-4'>
          <TabsList className='grid w-full grid-cols-4 mb-6'>
            <TabsTrigger value='general' className='flex items-center gap-2'>
              <Settings className='h-4 w-4' />
              General
            </TabsTrigger>
            <TabsTrigger value='members' className='flex items-center gap-2'>
              <Users className='h-4 w-4' />
              Members
            </TabsTrigger>
            <TabsTrigger
              value='notifications'
              className='flex items-center gap-2'
            >
              <Bell className='h-4 w-4' />
              Notifications
            </TabsTrigger>
            <TabsTrigger value='moderation' className='flex items-center gap-2'>
              <Shield className='h-4 w-4' />
              Moderation
            </TabsTrigger>
          </TabsList>

          <TabsContent value='general' className='space-y-6'>
            <div className='space-y-4'>
              <div>
                <label className='block text-sm font-medium mb-2'>
                  Group Name
                </label>
                {isEditing ? (
                  <Input
                    value={settings.name}
                    onChange={(e) =>
                      setSettings({ ...settings, name: e.target.value })
                    }
                  />
                ) : (
                  <p className='text-gray-700'>{settings.name}</p>
                )}
              </div>
              <div>
                <label className='block text-sm font-medium mb-2'>
                  Description
                </label>
                {isEditing ? (
                  <Textarea
                    value={settings.description}
                    onChange={(e) =>
                      setSettings({ ...settings, description: e.target.value })
                    }
                    rows={4}
                  />
                ) : (
                  <p className='text-gray-700'>{settings.description}</p>
                )}
              </div>
              <div>
                <label className='block text-sm font-medium mb-2'>
                  Category
                </label>
                {isEditing ? (
                  <Select
                    value={settings.category}
                    onValueChange={(value) =>
                      setSettings({ ...settings, category: value })
                    }
                  >
                    <SelectTrigger>
                      <SelectValue placeholder='Select category' />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value='faculty'>Faculty</SelectItem>
                      <SelectItem value='research'>Research</SelectItem>
                      <SelectItem value='writing'>Writing</SelectItem>
                      <SelectItem value='education'>Education</SelectItem>
                    </SelectContent>
                  </Select>
                ) : (
                  <Badge variant='outline'>{settings.category}</Badge>
                )}
              </div>
              <div>
                <label className='block text-sm font-medium mb-2'>
                  Privacy
                </label>
                {isEditing ? (
                  <Select
                    value={settings.privacy}
                    onValueChange={(value: 'public' | 'private') =>
                      setSettings({ ...settings, privacy: value })
                    }
                  >
                    <SelectTrigger>
                      <SelectValue placeholder='Select privacy' />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value='public'>
                        <div className='flex items-center gap-2'>
                          <Globe className='h-4 w-4' />
                          Public
                        </div>
                      </SelectItem>
                      <SelectItem value='private'>
                        <div className='flex items-center gap-2'>
                          <Lock className='h-4 w-4' />
                          Private
                        </div>
                      </SelectItem>
                    </SelectContent>
                  </Select>
                ) : (
                  <div className='flex items-center gap-2'>
                    {settings.privacy === 'public' ? (
                      <Globe className='h-4 w-4 text-green-600' />
                    ) : (
                      <Lock className='h-4 w-4 text-orange-600' />
                    )}
                    <span className='capitalize'>{settings.privacy}</span>
                  </div>
                )}
              </div>
            </div>
          </TabsContent>

          <TabsContent value='members' className='space-y-6'>
            <div className='flex justify-between items-center mb-4'>
              <div>
                <h3 className='text-lg font-semibold'>Group Members</h3>
                <p className='text-sm text-gray-600'>
                  {mockMembers.length} members
                </p>
              </div>
              <Button className='bg-blue-600 hover:bg-blue-700'>
                <UserPlus className='h-4 w-4 mr-2' />
                Invite Members
              </Button>
            </div>
            <ScrollArea className='h-[400px] pr-4'>
              <div className='space-y-4'>
                {mockMembers.map((member) => (
                  <div
                    key={member.id}
                    className='flex items-center justify-between p-4 border rounded-lg hover:bg-gray-50'
                  >
                    <div className='flex items-center space-x-4'>
                      <Avatar>
                        <AvatarFallback className='bg-blue-100 text-blue-600'>
                          {member.name
                            .split(' ')
                            .map((n) => n[0])
                            .join('')}
                        </AvatarFallback>
                      </Avatar>
                      <div>
                        <div className='flex items-center gap-2'>
                          <p className='font-medium'>{member.name}</p>
                          <CountryFlag
                            code={getCountryCode(member.country)}
                            size={16}
                          />
                          {member.role === 'Moderator' && (
                            <Badge className='bg-yellow-100 text-yellow-700'>
                              <Crown className='h-3 w-3 mr-1' />
                              Moderator
                            </Badge>
                          )}
                        </div>
                        <div className='flex items-center gap-4 text-sm text-gray-600'>
                          <span>Joined {member.joinDate}</span>
                          <Badge
                            variant='outline'
                            className={
                              member.status === 'active'
                                ? 'text-green-600'
                                : 'text-gray-600'
                            }
                          >
                            {member.status}
                          </Badge>
                        </div>
                      </div>
                    </div>
                    <div className='flex items-center gap-2'>
                      <Button
                        variant='outline'
                        size='sm'
                        onClick={() => handlePromoteMember(member.id)}
                      >
                        <Crown className='h-4 w-4 mr-1' />
                        Promote
                      </Button>
                      <Button
                        variant='outline'
                        size='sm'
                        onClick={() => handleRemoveMember(member.id)}
                      >
                        <UserMinus className='h-4 w-4 mr-1' />
                        Remove
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </ScrollArea>
          </TabsContent>

          <TabsContent value='notifications' className='space-y-6'>
            <div className='space-y-6'>
              <div className='flex items-center justify-between'>
                <div>
                  <h3 className='font-medium'>New Member Notifications</h3>
                  <p className='text-sm text-gray-600'>
                    Get notified when new members join the group
                  </p>
                </div>
                <Switch
                  checked={settings.notifications.newMembers}
                  onCheckedChange={(checked) =>
                    setSettings({
                      ...settings,
                      notifications: {
                        ...settings.notifications,
                        newMembers: checked,
                      },
                    })
                  }
                />
              </div>
              <div className='flex items-center justify-between'>
                <div>
                  <h3 className='font-medium'>New Post Notifications</h3>
                  <p className='text-sm text-gray-600'>
                    Get notified when new posts are created
                  </p>
                </div>
                <Switch
                  checked={settings.notifications.newPosts}
                  onCheckedChange={(checked) =>
                    setSettings({
                      ...settings,
                      notifications: {
                        ...settings.notifications,
                        newPosts: checked,
                      },
                    })
                  }
                />
              </div>
              <div className='flex items-center justify-between'>
                <div>
                  <h3 className='font-medium'>Mention Notifications</h3>
                  <p className='text-sm text-gray-600'>
                    Get notified when you're mentioned in posts or comments
                  </p>
                </div>
                <Switch
                  checked={settings.notifications.mentions}
                  onCheckedChange={(checked) =>
                    setSettings({
                      ...settings,
                      notifications: {
                        ...settings.notifications,
                        mentions: checked,
                      },
                    })
                  }
                />
              </div>
            </div>
          </TabsContent>

          <TabsContent value='moderation' className='space-y-6'>
            <div className='space-y-6'>
              <div className='flex items-center justify-between'>
                <div>
                  <h3 className='font-medium'>Approve New Members</h3>
                  <p className='text-sm text-gray-600'>
                    Require approval for new member requests
                  </p>
                </div>
                <Switch
                  checked={settings.moderation.approveMembers}
                  onCheckedChange={(checked) =>
                    setSettings({
                      ...settings,
                      moderation: {
                        ...settings.moderation,
                        approveMembers: checked,
                      },
                    })
                  }
                />
              </div>
              <div className='flex items-center justify-between'>
                <div>
                  <h3 className='font-medium'>Approve Posts</h3>
                  <p className='text-sm text-gray-600'>
                    Require moderator approval for new posts
                  </p>
                </div>
                <Switch
                  checked={settings.moderation.approvePosts}
                  onCheckedChange={(checked) =>
                    setSettings({
                      ...settings,
                      moderation: {
                        ...settings.moderation,
                        approvePosts: checked,
                      },
                    })
                  }
                />
              </div>
              <div className='flex items-center justify-between'>
                <div>
                  <h3 className='font-medium'>Allow Member Invites</h3>
                  <p className='text-sm text-gray-600'>
                    Let members invite others to join
                  </p>
                </div>
                <Switch
                  checked={settings.moderation.allowInvites}
                  onCheckedChange={(checked) =>
                    setSettings({
                      ...settings,
                      moderation: {
                        ...settings.moderation,
                        allowInvites: checked,
                      },
                    })
                  }
                />
              </div>
            </div>
          </TabsContent>
        </Tabs>

        <div className='flex justify-end gap-2 mt-6 pt-4 border-t'>
          {isEditing ? (
            <>
              <Button variant='outline' onClick={() => setIsEditing(false)}>
                <X className='h-4 w-4 mr-2' />
                Cancel
              </Button>
              <Button
                className='bg-green-600 hover:bg-green-700'
                onClick={handleSave}
              >
                <Save className='h-4 w-4 mr-2' />
                Save Changes
              </Button>
            </>
          ) : (
            <Button
              className='bg-blue-600 hover:bg-blue-700'
              onClick={() => setIsEditing(true)}
            >
              <Settings className='h-4 w-4 mr-2' />
              Edit Settings
            </Button>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default GroupSettingsModal;
