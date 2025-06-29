
import { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useToast } from "@/hooks/use-toast";
import { User, Settings, Shield } from 'lucide-react';

interface ProfileModalProps {
  isOpen: boolean;
  onClose: () => void;
  userRole: string;
}

const ProfileModal = ({ isOpen, onClose, userRole }: ProfileModalProps) => {
  const { toast } = useToast();
  const [profile, setProfile] = useState({
    name: 'John Doe',
    email: 'john.doe@email.com',
    country: 'United States',
    major: 'Computer Science',
    bio: 'Passionate about AI and machine learning'
  });

  const handleSave = () => {
    toast({
      title: "Profile Updated",
      description: "Your profile has been successfully updated.",
    });
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl max-h-[600px] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <User className="h-5 w-5" />
            Profile Settings
          </DialogTitle>
        </DialogHeader>

        <Tabs defaultValue="profile" className="w-full">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="profile">Profile</TabsTrigger>
            <TabsTrigger value="preferences">Preferences</TabsTrigger>
            <TabsTrigger value="privacy">Privacy</TabsTrigger>
          </TabsList>

          <TabsContent value="profile" className="space-y-4">
            <div className="flex items-center space-x-4">
              <Avatar className="h-20 w-20">
                <AvatarFallback className="text-2xl bg-blue-100 text-blue-600">
                  {profile.name.split(' ').map(n => n[0]).join('')}
                </AvatarFallback>
              </Avatar>
              <Button variant="outline">Change Photo</Button>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="name">Full Name</Label>
                <Input
                  id="name"
                  value={profile.name}
                  onChange={(e) => setProfile({...profile, name: e.target.value})}
                />
              </div>
              <div>
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  value={profile.email}
                  onChange={(e) => setProfile({...profile, email: e.target.value})}
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="country">Country</Label>
                <Input
                  id="country"
                  value={profile.country}
                  onChange={(e) => setProfile({...profile, country: e.target.value})}
                />
              </div>
              <div>
                <Label htmlFor="major">{userRole === 'student' ? 'Major' : 'Field'}</Label>
                <Input
                  id="major"
                  value={profile.major}
                  onChange={(e) => setProfile({...profile, major: e.target.value})}
                />
              </div>
            </div>

            <div>
              <Label htmlFor="bio">Bio</Label>
              <Textarea
                id="bio"
                value={profile.bio}
                onChange={(e) => setProfile({...profile, bio: e.target.value})}
                rows={3}
              />
            </div>
          </TabsContent>

          <TabsContent value="preferences" className="space-y-4">
            <div className="space-y-4">
              <h3 className="text-lg font-medium">Notification Preferences</h3>
              
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <Label>Email notifications</Label>
                  <input type="checkbox" defaultChecked className="rounded" />
                </div>
                <div className="flex items-center justify-between">
                  <Label>Group activity updates</Label>
                  <input type="checkbox" defaultChecked className="rounded" />
                </div>
                <div className="flex items-center justify-between">
                  <Label>Mentorship requests</Label>
                  <input type="checkbox" defaultChecked className="rounded" />
                </div>
                <div className="flex items-center justify-between">
                  <Label>Program recommendations</Label>
                  <input type="checkbox" className="rounded" />
                </div>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="privacy" className="space-y-4">
            <div className="space-y-4">
              <h3 className="text-lg font-medium flex items-center gap-2">
                <Shield className="h-5 w-5" />
                Privacy Settings
              </h3>
              
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <Label>Profile visibility</Label>
                  <select className="border rounded px-3 py-1">
                    <option>Public</option>
                    <option>Registered users only</option>
                    <option>Private</option>
                  </select>
                </div>
                <div className="flex items-center justify-between">
                  <Label>Show contact information</Label>
                  <input type="checkbox" defaultChecked className="rounded" />
                </div>
                <div className="flex items-center justify-between">
                  <Label>Allow direct messages</Label>
                  <input type="checkbox" defaultChecked className="rounded" />
                </div>
                <div className="flex items-center justify-between">
                  <Label>Show in search results</Label>
                  <input type="checkbox" defaultChecked className="rounded" />
                </div>
              </div>
            </div>
          </TabsContent>
        </Tabs>

        <div className="flex justify-end space-x-2 pt-4">
          <Button variant="outline" onClick={onClose}>Cancel</Button>
          <Button onClick={handleSave}>Save Changes</Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default ProfileModal;
