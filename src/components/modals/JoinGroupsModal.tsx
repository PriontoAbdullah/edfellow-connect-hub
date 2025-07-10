import { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Search, Users, Star, Plus } from 'lucide-react';
import { useToast } from "@/hooks/use-toast";

interface JoinGroupsModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const JoinGroupsModal = ({ open, onOpenChange }: JoinGroupsModalProps) => {
  const [searchTerm, setSearchTerm] = useState('');
  const { toast } = useToast();

  const availableGroups = [
    {
      id: 1,
      name: 'Machine Learning Educators',
      members: 234,
      description: 'Teaching methodologies and curriculum for ML courses',
      category: 'Education',
      rating: 4.8
    },
    {
      id: 2,
      name: 'Higher Education Innovation',
      members: 156,
      description: 'Innovative teaching methods and educational technology',
      category: 'Innovation',
      rating: 4.7
    },
    {
      id: 3,
      name: 'Research Funding Network',
      members: 89,
      description: 'Grant opportunities and funding strategies',
      category: 'Funding',
      rating: 4.9
    },
    {
      id: 4,
      name: 'Computer Science Faculty Global',
      members: 312,
      description: 'Worldwide community of CS professors and researchers',
      category: 'Faculty',
      rating: 4.6
    }
  ];

  const handleJoinGroup = (groupId: number, groupName: string) => {
    toast({
      title: "Group Joined!",
      description: `You have successfully joined ${groupName}`,
    });
  };

  const filteredGroups = availableGroups.filter(group =>
    group.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    group.description.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-4xl max-h-[80vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Users className="h-5 w-5 text-purple-600" />
            Join Subject Groups
          </DialogTitle>
        </DialogHeader>
        
        <div className="space-y-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
            <Input 
              placeholder="Search groups by name or topic..." 
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>

          <div className="grid md:grid-cols-2 gap-4">
            {filteredGroups.map((group) => (
              <Card key={group.id} className="hover:shadow-lg transition-shadow">
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <Badge variant="outline" className="text-xs">{group.category}</Badge>
                    <div className="flex items-center text-sm">
                      <Star className="h-4 w-4 text-yellow-500 mr-1" />
                      {group.rating}
                    </div>
                  </div>
                  <CardTitle className="text-lg">{group.name}</CardTitle>
                  <CardDescription>{group.description}</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center text-sm text-gray-600">
                    <Users className="h-4 w-4 mr-1" />
                    {group.members} members
                  </div>
                  <Button 
                    size="sm" 
                    className="w-full bg-purple-600 hover:bg-purple-700"
                    onClick={() => handleJoinGroup(group.id, group.name)}
                  >
                    <Plus className="h-4 w-4 mr-1" />
                    Join Group
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>

          {filteredGroups.length === 0 && (
            <div className="text-center py-8">
              <Users className="h-12 w-12 mx-auto mb-4 text-gray-300" />
              <p className="text-gray-500">No groups found matching your search.</p>
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default JoinGroupsModal;