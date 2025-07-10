import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Users, MessageSquare, Settings, Crown, Calendar, TrendingUp } from 'lucide-react';

interface GroupViewModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  group?: {
    id: number;
    name: string;
    members: number;
    role: string;
    description: string;
    category: string;
    activity: string;
  };
}

const GroupViewModal = ({ open, onOpenChange, group }: GroupViewModalProps) => {
  if (!group) return null;

  const recentPosts = [
    {
      id: 1,
      author: 'Dr. Michael Chen',
      title: 'New Research Paper on Neural Networks',
      content: 'Just published our latest findings on attention mechanisms...',
      time: '2h ago',
      likes: 12,
      comments: 5
    },
    {
      id: 2,
      author: 'Prof. Sarah Johnson',
      title: 'Conference CFP: ICML 2025',
      content: 'Call for papers deadline is approaching. Great opportunity for...',
      time: '5h ago',
      likes: 8,
      comments: 3
    },
    {
      id: 3,
      author: 'Dr. Robert Wilson',
      title: 'Teaching Tips: Interactive ML Labs',
      content: 'Sharing some effective strategies for hands-on machine learning...',
      time: '1d ago',
      likes: 15,
      comments: 7
    }
  ];

  const topMembers = [
    { name: 'Dr. Michael Chen', role: 'Moderator', posts: 45 },
    { name: 'Prof. Sarah Johnson', role: 'Active Member', posts: 32 },
    { name: 'Dr. Robert Wilson', role: 'Contributor', posts: 28 },
    { name: 'Prof. Lisa Zhang', role: 'Member', posts: 23 }
  ];

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-4xl max-h-[80vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Users className="h-5 w-5 text-blue-600" />
            {group.name}
          </DialogTitle>
        </DialogHeader>
        
        <div className="space-y-6">
          {/* Group Info */}
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle className="flex items-center gap-2">
                    {group.name}
                    {group.role === 'moderator' && (
                      <Crown className="h-4 w-4 text-yellow-500" />
                    )}
                  </CardTitle>
                  <CardDescription>{group.description}</CardDescription>
                </div>
                <div className="text-right">
                  <Badge variant="outline">{group.category}</Badge>
                  <p className="text-sm text-gray-600 mt-1">{group.members} members</p>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="flex gap-3">
                <Button className="bg-blue-600 hover:bg-blue-700">
                  <MessageSquare className="h-4 w-4 mr-2" />
                  View All Posts
                </Button>
                <Button variant="outline">
                  <Settings className="h-4 w-4 mr-2" />
                  {group.role === 'moderator' ? 'Manage Group' : 'Group Settings'}
                </Button>
              </div>
            </CardContent>
          </Card>

          <div className="grid md:grid-cols-2 gap-6">
            {/* Recent Posts */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Recent Posts</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {recentPosts.map((post) => (
                  <div key={post.id} className="border-l-4 border-blue-500 pl-4">
                    <div className="flex items-center justify-between">
                      <h4 className="font-medium text-sm">{post.title}</h4>
                      <span className="text-xs text-gray-500">{post.time}</span>
                    </div>
                    <p className="text-sm text-gray-600 mt-1">{post.content}</p>
                    <div className="flex items-center gap-4 mt-2 text-xs text-gray-500">
                      <span>By {post.author}</span>
                      <span>{post.likes} likes</span>
                      <span>{post.comments} comments</span>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>

            {/* Top Members */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Active Members</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                {topMembers.map((member, index) => (
                  <div key={index} className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <Avatar className="h-8 w-8">
                        <AvatarFallback className="bg-blue-100 text-blue-600 text-xs">
                          {member.name.split(' ').map(n => n[0]).join('')}
                        </AvatarFallback>
                      </Avatar>
                      <div>
                        <p className="text-sm font-medium">{member.name}</p>
                        <p className="text-xs text-gray-600">{member.role}</p>
                      </div>
                    </div>
                    <Badge variant="outline" className="text-xs">
                      {member.posts} posts
                    </Badge>
                  </div>
                ))}
              </CardContent>
            </Card>
          </div>

          {/* Group Stats */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg flex items-center gap-2">
                <TrendingUp className="h-5 w-5" />
                Group Activity
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-4 gap-4 text-center">
                <div>
                  <div className="text-2xl font-bold text-blue-600">24</div>
                  <div className="text-sm text-gray-600">Posts This Week</div>
                </div>
                <div>
                  <div className="text-2xl font-bold text-green-600">156</div>
                  <div className="text-sm text-gray-600">Comments</div>
                </div>
                <div>
                  <div className="text-2xl font-bold text-purple-600">89%</div>
                  <div className="text-sm text-gray-600">Engagement Rate</div>
                </div>
                <div>
                  <div className="text-2xl font-bold text-orange-600">12</div>
                  <div className="text-sm text-gray-600">New Members</div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default GroupViewModal;