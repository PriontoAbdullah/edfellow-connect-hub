import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { Switch } from '@/components/ui/switch';
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
  Lock,
  Globe,
  Trash2,
  Save,
  AlertTriangle,
  Loader2,
  Crown,
  UserMinus,
  UserPlus,
  Shield,
} from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { useAuth } from '@/contexts/AuthContext';
import {
  updateGroup,
  deleteGroup,
  getGroupMembers,
  removeGroupMember,
  promoteGroupMember,
  demoteGroupMember,
  type Group,
  type GroupMember,
} from '@/lib/api/groups';

interface GroupSettingsProps {
  group: Group;
  onGroupUpdated?: (group: Group) => void;
  onGroupDeleted?: () => void;
  onClose?: () => void;
}

export const GroupSettings: React.FC<GroupSettingsProps> = ({
  group,
  onGroupUpdated,
  onGroupDeleted,
  onClose,
}) => {
  const { user } = useAuth();
  const { toast } = useToast();

  // State management
  const [activeTab, setActiveTab] = useState<'general' | 'members' | 'danger'>(
    'general'
  );
  const [loading, setLoading] = useState(false);
  const [members, setMembers] = useState<GroupMember[]>([]);
  const [membersLoading, setMembersLoading] = useState(false);

  // Form state
  const [formData, setFormData] = useState({
    name: group.name,
    description: group.description || '',
    category: group.category,
    subject_area: group.subject_area || '',
    university: group.university || '',
    department: group.department || '',
    level: group.level || 'mixed',
    max_members: group.max_members,
    is_private: group.is_private,
    rules: group.rules || '',
  });

  // Load members on component mount
  useEffect(() => {
    loadMembers();
  }, [group.id]);

  const loadMembers = async () => {
    setMembersLoading(true);
    try {
      const { data, error } = await getGroupMembers(group.id);

      if (error) {
        toast({
          title: 'Error',
          description: error,
          variant: 'destructive',
        });
        return;
      }

      setMembers(data || []);
    } catch (error) {
      console.error('Error loading members:', error);
    } finally {
      setMembersLoading(false);
    }
  };

  const handleSave = async () => {
    setLoading(true);
    try {
      const { data, error } = await updateGroup(group.id, formData);

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
        description: 'Group settings updated successfully!',
      });

      onGroupUpdated?.(data);
    } catch (error) {
      toast({
        title: 'Error',
        description: 'Failed to update group settings',
        variant: 'destructive',
      });
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteGroup = async () => {
    if (
      !confirm(
        'Are you sure you want to delete this group? This action cannot be undone.'
      )
    ) {
      return;
    }

    setLoading(true);
    try {
      const { error } = await deleteGroup(group.id);

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
        description: 'Group deleted successfully',
      });

      onGroupDeleted?.();
    } catch (error) {
      toast({
        title: 'Error',
        description: 'Failed to delete group',
        variant: 'destructive',
      });
    } finally {
      setLoading(false);
    }
  };

  const handleRemoveMember = async (memberId: string) => {
    if (!confirm('Are you sure you want to remove this member?')) {
      return;
    }

    try {
      const { error } = await removeGroupMember(group.id, memberId);

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
        description: 'Member removed successfully',
      });

      loadMembers();
    } catch (error) {
      toast({
        title: 'Error',
        description: 'Failed to remove member',
        variant: 'destructive',
      });
    }
  };

  const handlePromoteMember = async (memberId: string) => {
    try {
      const { error } = await promoteGroupMember(group.id, memberId);

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
        description: 'Member promoted to moderator',
      });

      loadMembers();
    } catch (error) {
      toast({
        title: 'Error',
        description: 'Failed to promote member',
        variant: 'destructive',
      });
    }
  };

  const handleDemoteMember = async (memberId: string) => {
    try {
      const { error } = await demoteGroupMember(group.id, memberId);

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
        description: 'Member demoted to regular member',
      });

      loadMembers();
    } catch (error) {
      toast({
        title: 'Error',
        description: 'Failed to demote member',
        variant: 'destructive',
      });
    }
  };

  const updateFormData = (field: string, value: any) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const categories = [
    { value: 'study', label: 'Study Group' },
    { value: 'research', label: 'Research' },
    { value: 'professional', label: 'Professional' },
    { value: 'social', label: 'Social' },
    { value: 'academic', label: 'Academic' },
  ];

  const levels = [
    { value: 'undergraduate', label: 'Undergraduate' },
    { value: 'graduate', label: 'Graduate' },
    { value: 'phd', label: 'PhD' },
    { value: 'postdoc', label: 'Postdoc' },
    { value: 'faculty', label: 'Faculty' },
    { value: 'mixed', label: 'Mixed Levels' },
  ];

  const renderGeneralTab = () => (
    <div className='space-y-6'>
      <div>
        <h3 className='text-lg font-semibold mb-4'>General Settings</h3>
        <div className='space-y-4'>
          <div>
            <Label htmlFor='name'>Group Name</Label>
            <Input
              id='name'
              value={formData.name}
              onChange={(e) => updateFormData('name', e.target.value)}
              placeholder='Enter group name'
            />
          </div>

          <div>
            <Label htmlFor='description'>Description</Label>
            <Textarea
              id='description'
              value={formData.description}
              onChange={(e) => updateFormData('description', e.target.value)}
              placeholder='Describe the purpose and goals of your group'
              rows={4}
            />
          </div>

          <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
            <div>
              <Label htmlFor='category'>Category</Label>
              <Select
                value={formData.category}
                onValueChange={(value) => updateFormData('category', value)}
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {categories.map((category) => (
                    <SelectItem key={category.value} value={category.value}>
                      {category.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div>
              <Label htmlFor='level'>Academic Level</Label>
              <Select
                value={formData.level}
                onValueChange={(value) => updateFormData('level', value)}
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {levels.map((level) => (
                    <SelectItem key={level.value} value={level.value}>
                      {level.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
            <div>
              <Label htmlFor='subject_area'>Subject Area</Label>
              <Input
                id='subject_area'
                value={formData.subject_area}
                onChange={(e) => updateFormData('subject_area', e.target.value)}
                placeholder='e.g., Computer Science'
              />
            </div>

            <div>
              <Label htmlFor='university'>University</Label>
              <Input
                id='university'
                value={formData.university}
                onChange={(e) => updateFormData('university', e.target.value)}
                placeholder='e.g., MIT'
              />
            </div>
          </div>

          <div>
            <Label htmlFor='department'>Department</Label>
            <Input
              id='department'
              value={formData.department}
              onChange={(e) => updateFormData('department', e.target.value)}
              placeholder='e.g., Computer Science Department'
            />
          </div>

          <div>
            <Label htmlFor='max_members'>Maximum Members</Label>
            <Input
              id='max_members'
              type='number'
              value={formData.max_members}
              onChange={(e) =>
                updateFormData('max_members', parseInt(e.target.value))
              }
              min={5}
              max={1000}
            />
          </div>

          <div className='flex items-center justify-between'>
            <div>
              <Label htmlFor='is_private'>Private Group</Label>
              <p className='text-sm text-gray-600'>
                Only invited members can join this group
              </p>
            </div>
            <Switch
              id='is_private'
              checked={formData.is_private}
              onCheckedChange={(checked) =>
                updateFormData('is_private', checked)
              }
            />
          </div>

          <div>
            <Label htmlFor='rules'>Group Rules</Label>
            <Textarea
              id='rules'
              value={formData.rules}
              onChange={(e) => updateFormData('rules', e.target.value)}
              placeholder='Set guidelines for group behavior and participation'
              rows={4}
            />
          </div>
        </div>
      </div>
    </div>
  );

  const renderMembersTab = () => (
    <div className='space-y-6'>
      <div>
        <h3 className='text-lg font-semibold mb-4'>Member Management</h3>

        {membersLoading ? (
          <div className='flex items-center justify-center py-8'>
            <Loader2 className='h-6 w-6 animate-spin text-blue-600' />
            <span className='ml-2 text-gray-600'>Loading members...</span>
          </div>
        ) : (
          <div className='space-y-4'>
            {members.map((member) => (
              <Card key={member.id}>
                <CardContent className='p-4'>
                  <div className='flex items-center justify-between'>
                    <div className='flex items-center gap-3'>
                      <div className='w-10 h-10 bg-gray-200 rounded-full flex items-center justify-center'>
                        <span className='text-sm font-medium'>
                          {member.user?.display_name?.charAt(0)}
                        </span>
                      </div>
                      <div>
                        <h4 className='font-medium'>
                          {member.user?.display_name}
                        </h4>
                        <p className='text-sm text-gray-600'>
                          {member.user?.role}
                        </p>
                        <div className='flex items-center gap-2 mt-1'>
                          <Badge
                            variant={
                              member.role === 'admin' ? 'default' : 'secondary'
                            }
                            className='text-xs'
                          >
                            {member.role === 'admin' && (
                              <Crown className='h-3 w-3 mr-1' />
                            )}
                            {member.role === 'moderator' && (
                              <Shield className='h-3 w-3 mr-1' />
                            )}
                            {member.role}
                          </Badge>
                          <span className='text-xs text-gray-500'>
                            Joined{' '}
                            {new Date(member.joined_at).toLocaleDateString()}
                          </span>
                        </div>
                      </div>
                    </div>

                    <div className='flex items-center gap-2'>
                      {member.role === 'member' && (
                        <Button
                          variant='outline'
                          size='sm'
                          onClick={() => handlePromoteMember(member.user_id)}
                        >
                          <UserPlus className='h-4 w-4 mr-1' />
                          Promote
                        </Button>
                      )}
                      {member.role === 'moderator' && (
                        <Button
                          variant='outline'
                          size='sm'
                          onClick={() => handleDemoteMember(member.user_id)}
                        >
                          <UserMinus className='h-4 w-4 mr-1' />
                          Demote
                        </Button>
                      )}
                      {member.role !== 'admin' && (
                        <Button
                          variant='outline'
                          size='sm'
                          onClick={() => handleRemoveMember(member.user_id)}
                        >
                          <UserMinus className='h-4 w-4 mr-1' />
                          Remove
                        </Button>
                      )}
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </div>
    </div>
  );

  const renderDangerTab = () => (
    <div className='space-y-6'>
      <div>
        <h3 className='text-lg font-semibold mb-4 text-red-600'>Danger Zone</h3>

        <Card className='border-red-200'>
          <CardHeader>
            <CardTitle className='text-red-600 flex items-center gap-2'>
              <AlertTriangle className='h-5 w-5' />
              Delete Group
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className='text-sm text-gray-600 mb-4'>
              Once you delete a group, there is no going back. Please be
              certain. This will permanently delete the group and all its
              content.
            </p>
            <Button
              variant='destructive'
              onClick={handleDeleteGroup}
              disabled={loading}
            >
              {loading ? (
                <Loader2 className='h-4 w-4 animate-spin mr-2' />
              ) : (
                <Trash2 className='h-4 w-4 mr-2' />
              )}
              Delete Group
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );

  return (
    <div className='max-w-4xl mx-auto'>
      <Card>
        <CardHeader>
          <div className='flex items-center justify-between'>
            <div>
              <CardTitle className='flex items-center gap-2'>
                <Settings className='h-5 w-5' />
                Group Settings
              </CardTitle>
              <p className='text-sm text-gray-600 mt-1'>
                Manage your group settings and members
              </p>
            </div>
            {onClose && (
              <Button variant='ghost' size='sm' onClick={onClose}>
                <X className='h-4 w-4' />
              </Button>
            )}
          </div>

          {/* Tabs */}
          <div className='flex gap-2 border-b mt-4'>
            <Button
              variant={activeTab === 'general' ? 'default' : 'ghost'}
              onClick={() => setActiveTab('general')}
              className='text-sm'
            >
              General
            </Button>
            <Button
              variant={activeTab === 'members' ? 'default' : 'ghost'}
              onClick={() => setActiveTab('members')}
              className='text-sm'
            >
              <Users className='h-4 w-4 mr-2' />
              Members ({members.length})
            </Button>
            <Button
              variant={activeTab === 'danger' ? 'default' : 'ghost'}
              onClick={() => setActiveTab('danger')}
              className='text-sm text-red-600 hover:text-red-700'
            >
              <AlertTriangle className='h-4 w-4 mr-2' />
              Danger
            </Button>
          </div>
        </CardHeader>

        <CardContent className='space-y-6'>
          {activeTab === 'general' && renderGeneralTab()}
          {activeTab === 'members' && renderMembersTab()}
          {activeTab === 'danger' && renderDangerTab()}

          {/* Save Button */}
          {activeTab === 'general' && (
            <div className='flex justify-end pt-6 border-t'>
              <Button onClick={handleSave} disabled={loading}>
                {loading ? (
                  <Loader2 className='h-4 w-4 animate-spin mr-2' />
                ) : (
                  <Save className='h-4 w-4 mr-2' />
                )}
                Save Changes
              </Button>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};
