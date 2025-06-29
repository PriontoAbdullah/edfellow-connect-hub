
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";
import { Search, Users } from 'lucide-react';
import { useState } from 'react';

interface GroupJoinModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const GroupJoinModal = ({ isOpen, onClose }: GroupJoinModalProps) => {
  const { toast } = useToast();
  const [searchTerm, setSearchTerm] = useState('');

  const allGroups = [
    { id: 1, name: 'Computer Science', members: 3200, description: 'Discussions about programming, algorithms, and CS topics', joined: true, icon: '💻' },
    { id: 2, name: 'Medical Students', members: 2800, description: 'Support and resources for medical students', joined: false, icon: '🏥' },
    { id: 3, name: 'Engineering', members: 2500, description: 'All branches of engineering discussion', joined: false, icon: '⚙️' },
    { id: 4, name: 'Business & Economics', members: 1900, description: 'Business insights and economic discussions', joined: false, icon: '💼' },
    { id: 5, name: 'AI & Machine Learning', members: 1850, description: 'Advanced AI topics and research', joined: true, icon: '🤖' },
    { id: 6, name: 'Data Science', members: 2100, description: 'Data analysis, statistics, and visualization', joined: false, icon: '📊' }
  ];

  const filteredGroups = allGroups.filter(group => 
    group.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleJoinGroup = (groupId: number, groupName: string) => {
    toast({
      title: "Joined Group",
      description: `You've successfully joined ${groupName}!`,
    });
  };

  const handleLeaveGroup = (groupId: number, groupName: string) => {
    toast({
      title: "Left Group",
      description: `You've left ${groupName}.`,
    });
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl max-h-[600px]">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Users className="h-5 w-5" />
            Join Academic Groups
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
            <Input
              placeholder="Search groups..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>

          <div className="max-h-96 overflow-y-auto space-y-3">
            {filteredGroups.map((group) => (
              <div key={group.id} className="border rounded-lg p-4 hover:shadow-md transition-shadow">
                <div className="flex items-start justify-between">
                  <div className="flex items-start space-x-3">
                    <div className="text-2xl">{group.icon}</div>
                    <div className="flex-1">
                      <h3 className="font-medium text-gray-900">{group.name}</h3>
                      <p className="text-sm text-gray-600 mt-1">{group.description}</p>
                      <div className="flex items-center gap-2 mt-2">
                        <Badge variant="outline" className="text-xs">
                          {group.members.toLocaleString()} members
                        </Badge>
                        {group.joined && (
                          <Badge className="bg-green-100 text-green-700 text-xs">
                            Joined
                          </Badge>
                        )}
                      </div>
                    </div>
                  </div>
                  <div>
                    {group.joined ? (
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => handleLeaveGroup(group.id, group.name)}
                      >
                        Leave
                      </Button>
                    ) : (
                      <Button
                        size="sm"
                        onClick={() => handleJoinGroup(group.id, group.name)}
                      >
                        Join
                      </Button>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default GroupJoinModal;
