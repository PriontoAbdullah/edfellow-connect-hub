
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Bell, MessageSquare, Users, Star, Calendar, CheckCircle, X } from 'lucide-react';

const Notifications = () => {
  const notifications = [
    {
      id: 1,
      type: 'message',
      title: 'New message from Dr. Sarah Wilson',
      message: 'Thanks for your question about neural networks. I\'ve sent you some additional resources.',
      time: '2 hours ago',
      unread: true,
      icon: MessageSquare,
      avatar: 'SW'
    },
    {
      id: 2,
      type: 'group',
      title: 'New post in Computer Science group',
      message: 'Someone shared a great resource about algorithms and data structures.',
      time: '4 hours ago',
      unread: true,
      icon: Users,
      avatar: 'CS'
    },
    {
      id: 3,
      type: 'mentorship',
      title: 'Mentorship request accepted',
      message: 'Prof. Michael Brown accepted your mentorship request for Machine Learning guidance.',
      time: '1 day ago',
      unread: false,
      icon: Star,
      avatar: 'MB'
    },
    {
      id: 4,
      type: 'event',
      title: 'Upcoming session reminder',
      message: 'Your mentoring session with Dr. Johnson starts in 30 minutes.',
      time: '2 days ago',
      unread: false,
      icon: Calendar,
      avatar: 'DJ'
    },
    {
      id: 5,
      type: 'group',
      title: 'New member joined your group',
      message: 'Alex Chen joined the "AI Research Students" group you moderate.',
      time: '3 days ago',
      unread: false,
      icon: Users,
      avatar: 'AC'
    }
  ];

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'message': return 'text-blue-600 bg-blue-50';
      case 'group': return 'text-green-600 bg-green-50';
      case 'mentorship': return 'text-purple-600 bg-purple-50';
      case 'event': return 'text-orange-600 bg-orange-50';
      default: return 'text-gray-600 bg-gray-50';
    }
  };

  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 flex items-center gap-2">
            <Bell className="h-6 w-6 text-blue-600" />
            Notifications
          </h1>
          <p className="text-gray-600">Stay updated with your academic activities</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" size="sm">
            <CheckCircle className="h-4 w-4 mr-2" />
            Mark all read
          </Button>
          <Button variant="outline" size="sm">
            <X className="h-4 w-4 mr-2" />
            Clear all
          </Button>
        </div>
      </div>

      <div className="grid gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center justify-between">
              Recent Notifications
              <Badge variant="secondary">{notifications.filter(n => n.unread).length} new</Badge>
            </CardTitle>
          </CardHeader>
          <CardContent className="p-0">
            <ScrollArea className="h-96">
              <div className="space-y-1">
                {notifications.map((notification) => {
                  const Icon = notification.icon;
                  return (
                    <div
                      key={notification.id}
                      className={`p-4 border-b last:border-b-0 cursor-pointer hover:bg-gray-50 transition-colors ${
                        notification.unread ? 'bg-blue-50/50' : ''
                      }`}
                    >
                      <div className="flex items-start space-x-4">
                        <Avatar className="h-10 w-10">
                          <AvatarFallback className={getTypeColor(notification.type)}>
                            {notification.avatar}
                          </AvatarFallback>
                        </Avatar>
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center justify-between mb-1">
                            <h4 className="font-medium text-gray-900 flex items-center gap-2">
                              <Icon className="h-4 w-4" />
                              {notification.title}
                            </h4>
                            {notification.unread && (
                              <div className="h-2 w-2 bg-blue-600 rounded-full"></div>
                            )}
                          </div>
                          <p className="text-sm text-gray-600 mb-2">
                            {notification.message}
                          </p>
                          <p className="text-xs text-gray-500">
                            {notification.time}
                          </p>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </ScrollArea>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Notifications;
