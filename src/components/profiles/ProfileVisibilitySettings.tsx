import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { Button } from '../ui/button';
import { Badge } from '../ui/badge';
import { Switch } from '../ui/switch';
import { Label } from '../ui/label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '../ui/select';
import { Separator } from '../ui/separator';
import {
  Shield,
  Eye,
  EyeOff,
  Users,
  Lock,
  Globe,
  User,
  Mail,
  Phone,
  MapPin,
  GraduationCap,
  Briefcase,
  Award,
  FileText,
  Code,
  Settings,
  Save,
  AlertCircle,
  Info,
} from 'lucide-react';
import { useProfile } from '../../hooks/useProfile';
import { useToast } from '../../hooks/use-toast';
import { PrivacySettings } from '../../lib/auth';

interface ProfileVisibilitySettingsProps {
  userId: string;
  onSave?: (settings: PrivacySettings) => void;
}

export const ProfileVisibilitySettings: React.FC<
  ProfileVisibilitySettingsProps
> = ({ userId, onSave }) => {
  const { profile, updateProfileData, loading } = useProfile(userId);
  const { toast } = useToast();

  const [settings, setSettings] = useState<PrivacySettings>(
    profile?.privacySettings || {
      profileVisibility: 'public',
      contactInfoVisibility: 'public',
      portfolioVisibility: 'public',
      academicInfoVisibility: 'public',
      experienceVisibility: 'public',
      allowMessages: true,
      allowConnectionRequests: true,
      showOnlineStatus: true,
    }
  );

  const [saving, setSaving] = useState(false);

  const handleSettingChange = (key: keyof PrivacySettings, value: any) => {
    setSettings((prev) => ({
      ...prev,
      [key]: value,
    }));
  };

  const handleSave = async () => {
    setSaving(true);
    try {
      const success = await updateProfileData({
        privacy_settings: settings,
      });

      if (success) {
        toast({
          title: 'Success',
          description: 'Privacy settings updated successfully',
        });
        onSave?.(settings);
      }
    } catch (error) {
      console.error('Error saving privacy settings:', error);
      toast({
        title: 'Error',
        description: 'Failed to save privacy settings',
        variant: 'destructive',
      });
    } finally {
      setSaving(false);
    }
  };

  const getVisibilityIcon = (level: string) => {
    switch (level) {
      case 'public':
        return <Globe className='w-4 h-4 text-green-600' />;
      case 'connections':
        return <Users className='w-4 h-4 text-yellow-600' />;
      case 'private':
        return <Lock className='w-4 h-4 text-red-600' />;
      default:
        return <Eye className='w-4 h-4' />;
    }
  };

  const getVisibilityColor = (level: string) => {
    switch (level) {
      case 'public':
        return 'bg-green-100 text-green-800 border-green-200';
      case 'connections':
        return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'private':
        return 'bg-red-100 text-red-800 border-red-200';
      default:
        return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const getVisibilityDescription = (level: string) => {
    switch (level) {
      case 'public':
        return 'Visible to everyone';
      case 'connections':
        return 'Visible to your connections only';
      case 'private':
        return 'Only visible to you';
      default:
        return 'Visibility not set';
    }
  };

  if (loading) {
    return <ProfileVisibilitySettingsSkeleton />;
  }

  return (
    <div className='space-y-6'>
      {/* Header */}
      <div className='flex items-center justify-between'>
        <div>
          <h2 className='text-2xl font-bold flex items-center gap-2'>
            <Shield className='w-6 h-6' />
            Privacy Settings
          </h2>
          <p className='text-muted-foreground'>
            Control who can see different parts of your profile
          </p>
        </div>
        <Button onClick={handleSave} disabled={saving}>
          <Save className='w-4 h-4 mr-2' />
          {saving ? 'Saving...' : 'Save Changes'}
        </Button>
      </div>

      {/* Privacy Overview */}
      <Card>
        <CardHeader>
          <CardTitle className='flex items-center gap-2'>
            <Info className='w-5 h-5' />
            Privacy Overview
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className='grid grid-cols-1 md:grid-cols-3 gap-4'>
            <div className='text-center p-4 border rounded-lg'>
              <Globe className='w-8 h-8 mx-auto mb-2 text-green-600' />
              <div className='font-medium'>Public</div>
              <div className='text-sm text-muted-foreground'>
                Visible to everyone
              </div>
            </div>
            <div className='text-center p-4 border rounded-lg'>
              <Users className='w-8 h-8 mx-auto mb-2 text-yellow-600' />
              <div className='font-medium'>Connections</div>
              <div className='text-sm text-muted-foreground'>
                Visible to your connections
              </div>
            </div>
            <div className='text-center p-4 border rounded-lg'>
              <Lock className='w-8 h-8 mx-auto mb-2 text-red-600' />
              <div className='font-medium'>Private</div>
              <div className='text-sm text-muted-foreground'>
                Only visible to you
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Profile Visibility Settings */}
      <div className='space-y-6'>
        {/* Basic Profile Information */}
        <Card>
          <CardHeader>
            <CardTitle className='flex items-center gap-2'>
              <User className='w-5 h-5' />
              Basic Profile Information
            </CardTitle>
          </CardHeader>
          <CardContent className='space-y-4'>
            <div className='flex items-center justify-between'>
              <div className='space-y-1'>
                <Label className='text-base font-medium'>
                  Profile Visibility
                </Label>
                <p className='text-sm text-muted-foreground'>
                  Control who can see your basic profile information (name, bio,
                  role)
                </p>
              </div>
              <div className='flex items-center gap-2'>
                <Badge
                  className={getVisibilityColor(settings.profileVisibility)}
                >
                  {getVisibilityIcon(settings.profileVisibility)}
                  <span className='ml-1 capitalize'>
                    {settings.profileVisibility}
                  </span>
                </Badge>
                <Select
                  value={settings.profileVisibility}
                  onValueChange={(value) =>
                    handleSettingChange('profileVisibility', value)
                  }
                >
                  <SelectTrigger className='w-32'>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value='public'>Public</SelectItem>
                    <SelectItem value='connections'>Connections</SelectItem>
                    <SelectItem value='private'>Private</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Contact Information */}
        <Card>
          <CardHeader>
            <CardTitle className='flex items-center gap-2'>
              <Mail className='w-5 h-5' />
              Contact Information
            </CardTitle>
          </CardHeader>
          <CardContent className='space-y-4'>
            <div className='flex items-center justify-between'>
              <div className='space-y-1'>
                <Label className='text-base font-medium'>
                  Contact Info Visibility
                </Label>
                <p className='text-sm text-muted-foreground'>
                  Control who can see your contact information (email, phone,
                  location)
                </p>
              </div>
              <div className='flex items-center gap-2'>
                <Badge
                  className={getVisibilityColor(settings.contactInfoVisibility)}
                >
                  {getVisibilityIcon(settings.contactInfoVisibility)}
                  <span className='ml-1 capitalize'>
                    {settings.contactInfoVisibility}
                  </span>
                </Badge>
                <Select
                  value={settings.contactInfoVisibility}
                  onValueChange={(value) =>
                    handleSettingChange('contactInfoVisibility', value)
                  }
                >
                  <SelectTrigger className='w-32'>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value='public'>Public</SelectItem>
                    <SelectItem value='connections'>Connections</SelectItem>
                    <SelectItem value='private'>Private</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Academic Information */}
        <Card>
          <CardHeader>
            <CardTitle className='flex items-center gap-2'>
              <GraduationCap className='w-5 h-5' />
              Academic Information
            </CardTitle>
          </CardHeader>
          <CardContent className='space-y-4'>
            <div className='flex items-center justify-between'>
              <div className='space-y-1'>
                <Label className='text-base font-medium'>
                  Academic Info Visibility
                </Label>
                <p className='text-sm text-muted-foreground'>
                  Control who can see your academic information (university,
                  major, education)
                </p>
              </div>
              <div className='flex items-center gap-2'>
                <Badge
                  className={getVisibilityColor(
                    settings.academicInfoVisibility
                  )}
                >
                  {getVisibilityIcon(settings.academicInfoVisibility)}
                  <span className='ml-1 capitalize'>
                    {settings.academicInfoVisibility}
                  </span>
                </Badge>
                <Select
                  value={settings.academicInfoVisibility}
                  onValueChange={(value) =>
                    handleSettingChange('academicInfoVisibility', value)
                  }
                >
                  <SelectTrigger className='w-32'>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value='public'>Public</SelectItem>
                    <SelectItem value='connections'>Connections</SelectItem>
                    <SelectItem value='private'>Private</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Portfolio & Experience */}
        <Card>
          <CardHeader>
            <CardTitle className='flex items-center gap-2'>
              <Briefcase className='w-5 h-5' />
              Portfolio & Experience
            </CardTitle>
          </CardHeader>
          <CardContent className='space-y-4'>
            <div className='flex items-center justify-between'>
              <div className='space-y-1'>
                <Label className='text-base font-medium'>
                  Portfolio Visibility
                </Label>
                <p className='text-sm text-muted-foreground'>
                  Control who can see your portfolio items and projects
                </p>
              </div>
              <div className='flex items-center gap-2'>
                <Badge
                  className={getVisibilityColor(settings.portfolioVisibility)}
                >
                  {getVisibilityIcon(settings.portfolioVisibility)}
                  <span className='ml-1 capitalize'>
                    {settings.portfolioVisibility}
                  </span>
                </Badge>
                <Select
                  value={settings.portfolioVisibility}
                  onValueChange={(value) =>
                    handleSettingChange('portfolioVisibility', value)
                  }
                >
                  <SelectTrigger className='w-32'>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value='public'>Public</SelectItem>
                    <SelectItem value='connections'>Connections</SelectItem>
                    <SelectItem value='private'>Private</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <Separator />

            <div className='flex items-center justify-between'>
              <div className='space-y-1'>
                <Label className='text-base font-medium'>
                  Experience Visibility
                </Label>
                <p className='text-sm text-muted-foreground'>
                  Control who can see your work experience and professional
                  history
                </p>
              </div>
              <div className='flex items-center gap-2'>
                <Badge
                  className={getVisibilityColor(settings.experienceVisibility)}
                >
                  {getVisibilityIcon(settings.experienceVisibility)}
                  <span className='ml-1 capitalize'>
                    {settings.experienceVisibility}
                  </span>
                </Badge>
                <Select
                  value={settings.experienceVisibility}
                  onValueChange={(value) =>
                    handleSettingChange('experienceVisibility', value)
                  }
                >
                  <SelectTrigger className='w-32'>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value='public'>Public</SelectItem>
                    <SelectItem value='connections'>Connections</SelectItem>
                    <SelectItem value='private'>Private</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Communication Settings */}
        <Card>
          <CardHeader>
            <CardTitle className='flex items-center gap-2'>
              <Settings className='w-5 h-5' />
              Communication Settings
            </CardTitle>
          </CardHeader>
          <CardContent className='space-y-4'>
            <div className='flex items-center justify-between'>
              <div className='space-y-1'>
                <Label className='text-base font-medium'>Allow Messages</Label>
                <p className='text-sm text-muted-foreground'>
                  Allow other users to send you direct messages
                </p>
              </div>
              <Switch
                checked={settings.allowMessages}
                onCheckedChange={(checked) =>
                  handleSettingChange('allowMessages', checked)
                }
              />
            </div>

            <Separator />

            <div className='flex items-center justify-between'>
              <div className='space-y-1'>
                <Label className='text-base font-medium'>
                  Allow Connection Requests
                </Label>
                <p className='text-sm text-muted-foreground'>
                  Allow other users to send you connection requests
                </p>
              </div>
              <Switch
                checked={settings.allowConnectionRequests}
                onCheckedChange={(checked) =>
                  handleSettingChange('allowConnectionRequests', checked)
                }
              />
            </div>

            <Separator />

            <div className='flex items-center justify-between'>
              <div className='space-y-1'>
                <Label className='text-base font-medium'>
                  Show Online Status
                </Label>
                <p className='text-sm text-muted-foreground'>
                  Show when you're online to your connections
                </p>
              </div>
              <Switch
                checked={settings.showOnlineStatus}
                onCheckedChange={(checked) =>
                  handleSettingChange('showOnlineStatus', checked)
                }
              />
            </div>
          </CardContent>
        </Card>

        {/* Privacy Tips */}
        <Card className='border-blue-200 bg-blue-50'>
          <CardHeader>
            <CardTitle className='flex items-center gap-2 text-blue-800'>
              <AlertCircle className='w-5 h-5' />
              Privacy Tips
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ul className='space-y-2 text-sm text-blue-700'>
              <li className='flex items-start gap-2'>
                <div className='w-1.5 h-1.5 bg-blue-600 rounded-full mt-2' />
                <span>
                  Keep your contact information private until you establish
                  trust with connections
                </span>
              </li>
              <li className='flex items-start gap-2'>
                <div className='w-1.5 h-1.5 bg-blue-600 rounded-full mt-2' />
                <span>
                  Consider making your portfolio public to showcase your work to
                  potential employers
                </span>
              </li>
              <li className='flex items-start gap-2'>
                <div className='w-1.5 h-1.5 bg-blue-600 rounded-full mt-2' />
                <span>
                  You can always change these settings later as your comfort
                  level changes
                </span>
              </li>
              <li className='flex items-start gap-2'>
                <div className='w-1.5 h-1.5 bg-blue-600 rounded-full mt-2' />
                <span>
                  Remember that public profiles are more discoverable in search
                  results
                </span>
              </li>
            </ul>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

// Loading Skeleton Component
const ProfileVisibilitySettingsSkeleton: React.FC = () => {
  return (
    <div className='space-y-6'>
      <div className='flex items-center justify-between'>
        <div className='space-y-2'>
          <div className='h-8 w-48 bg-gray-200 rounded animate-pulse' />
          <div className='h-4 w-64 bg-gray-200 rounded animate-pulse' />
        </div>
        <div className='h-10 w-24 bg-gray-200 rounded animate-pulse' />
      </div>

      {[...Array(5)].map((_, i) => (
        <Card key={i}>
          <CardHeader>
            <div className='h-6 w-48 bg-gray-200 rounded animate-pulse' />
          </CardHeader>
          <CardContent>
            <div className='space-y-4'>
              <div className='flex items-center justify-between'>
                <div className='space-y-2'>
                  <div className='h-5 w-32 bg-gray-200 rounded animate-pulse' />
                  <div className='h-4 w-64 bg-gray-200 rounded animate-pulse' />
                </div>
                <div className='h-8 w-24 bg-gray-200 rounded animate-pulse' />
              </div>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
};

export default ProfileVisibilitySettings;
