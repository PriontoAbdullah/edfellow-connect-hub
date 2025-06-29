
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { ScrollArea } from "@/components/ui/scroll-area";
import { MessageSquare, Users, Star, Calendar, Bell } from 'lucide-react';

interface NotificationsModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const NotificationsModal = ({ isOpen, onClose }: NotificationsModalProps) => {
  const notifications = [
    {
      id: 1,
      type: 'message',
      title: 'New message from Dr. Sarah Wilson',
      message: 'Thanks for your question about neural networks...',
      time: '2 hours ago',
      unread: true,
      icon: MessageSquare
    },
    {
      id: 2,
      type: 'group',
      title: 'New post in Computer Science group',
      message: 'Someone shared a great resource about algorithms...',
      time: '4 hours ago',
      unread: true,
      icon: Users
    },
    {
      id: 3,
      type: 'mentorship',
      title: 'Mentorship request accepted',
      message: 'Prof. Michael Brown accepted your mentorship request',
      time: '1 day ago',
      unread: false,
      icon: Star
    },
    {
      id: 4,
      type: 'event',
      title: 'Upcoming session reminder',
      message: 'Your mentoring session starts in 30 minutes',
      time: '2 days ago',
      unread: false,
      icon: Calendar
    }
  ];

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-md h-[500px] p-0">
        <DialogHeader className="p-4 border-b">
          <div className="flex items-center justify-between">
            <DialogTitle className="flex items-center gap-2">
              <Bell className="h-5 w-5" />
              Notifications
            </DialogTitle>
            <Button variant="ghost" size="sm">
              Mark all read
            </Button>
          </div>
        </DialogHeader>

        <ScrollArea className="flex-1">
          <div className="p-4 space-y-3">
            {notifications.map((notification) => {
              const Icon = notification.icon;
              return (
                <div
                  key={notification.id}
                  className={`p-3 rounded-lg border cursor-pointer hover:bg-gray-50 ${
                    notification.unread ? 'bg-blue-50 border-blue-200' : 'bg-white'
                  }`}
                >
                  <div className="flex items-start space-x-3">
                    <div className="flex-shrink-0">
                      <Icon className="h-5 w-5 text-blue-600" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between">
                        <p className="text-sm font-medium text-gray-900">
                          {notification.title}
                        </p>
                        {notification.unread && (
                          <Badge className="bg-blue-600 text-white">New</Badge>
                        )}
                      </div>
                      <p className="text-sm text-gray-600 mt-1">
                        {notification.message}
                      </p>
                      <p className="text-xs text-gray-500 mt-2">
                        {notification.time}
                      </p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </ScrollArea>
      </DialogContent>
    </Dialog>
  );
};

export default NotificationsModal;
