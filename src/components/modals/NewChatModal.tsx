import { useState } from 'react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { CountryFlag } from '@/components/ui/CountryFlag';
import { useToast } from '@/hooks/use-toast';
import {
  MessageSquare,
  Search,
  User,
  GraduationCap,
  Building2,
  Flag,
} from 'lucide-react';

interface NewChatModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const NewChatModal = ({ isOpen, onClose }: NewChatModalProps) => {
  const { toast } = useToast();
  const [searchQuery, setSearchQuery] = useState('');

  const contacts = [
    {
      id: 1,
      name: 'Dr. Sarah Wilson',
      role: 'professor',
      field: 'Computer Science',
      online: true,
      country: 'US',
    },
    {
      id: 2,
      name: 'Mike Chen',
      role: 'student',
      field: 'Engineering',
      online: false,
      country: 'CA',
    },
    {
      id: 3,
      name: 'Prof. Lisa Wang',
      role: 'professor',
      field: 'Data Science',
      online: true,
      country: 'CN',
    },
    {
      id: 4,
      name: 'Emma Rodriguez',
      role: 'student',
      field: 'Mathematics',
      online: true,
      country: 'ES',
    },
    {
      id: 5,
      name: 'Stanford University',
      role: 'university',
      field: 'Admissions',
      online: true,
      country: 'US',
    },
    {
      id: 6,
      name: 'Dr. Ahmed Hassan',
      role: 'professor',
      field: 'Physics',
      online: true,
      country: 'EG',
    },
    {
      id: 7,
      name: 'Sofia Petrov',
      role: 'student',
      field: 'Chemistry',
      online: false,
      country: 'RU',
    },
    {
      id: 8,
      name: 'MIT Admissions',
      role: 'university',
      field: 'Admissions',
      online: true,
      country: 'US',
    },
  ];

  const filteredContacts = contacts.filter(
    (contact) =>
      contact.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      contact.field.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const getRoleIcon = (role: string) => {
    switch (role) {
      case 'student':
        return User;
      case 'professor':
        return GraduationCap;
      case 'university':
        return Building2;
      default:
        return User;
    }
  };

  const getRoleColor = (role: string) => {
    switch (role) {
      case 'student':
        return 'text-blue-600 bg-blue-50 border-blue-200';
      case 'professor':
        return 'text-green-600 bg-green-50 border-green-200';
      case 'university':
        return 'text-orange-600 bg-orange-50 border-orange-200';
      default:
        return 'text-gray-600 bg-gray-50 border-gray-200';
    }
  };

  const getRoleLabel = (role: string) => {
    switch (role) {
      case 'student':
        return 'Student';
      case 'professor':
        return 'Professor';
      case 'university':
        return 'University';
      default:
        return 'User';
    }
  };

  const handleStartChat = (contact: any) => {
    toast({
      title: 'Chat Started',
      description: `Started new conversation with ${contact.name}`,
    });
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className='max-w-lg'>
        <DialogHeader>
          <DialogTitle className='flex items-center gap-2'>
            <MessageSquare className='h-5 w-5 text-blue-600' />
            Start New Chat
          </DialogTitle>
        </DialogHeader>

        <div className='space-y-4'>
          <div className='relative'>
            <Search className='absolute left-3 top-3 h-4 w-4 text-gray-400' />
            <Input
              placeholder='Search people...'
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className='pl-10'
            />
          </div>

          <div className='space-y-2 max-h-80 overflow-y-auto'>
            {filteredContacts.map((contact) => {
              const IconComponent = getRoleIcon(contact.role);
              return (
                <div
                  key={contact.id}
                  className='flex items-center justify-between p-3 border rounded-lg hover:shadow-md transition-shadow cursor-pointer'
                  onClick={() => handleStartChat(contact)}
                >
                  <div className='flex items-center space-x-3'>
                    <div className='relative'>
                      <Avatar className='h-10 w-10'>
                        <AvatarFallback className={getRoleColor(contact.role)}>
                          {contact.name
                            .split(' ')
                            .map((n) => n[0])
                            .join('')}
                        </AvatarFallback>
                      </Avatar>
                      {contact.online && (
                        <div className='absolute -bottom-1 -right-1 h-3 w-3 bg-green-500 border-2 border-white rounded-full'></div>
                      )}
                    </div>
                    <div className='flex-1'>
                      <div className='flex items-center gap-2 mb-1'>
                        <p className='font-medium text-gray-900'>
                          {contact.name}
                        </p>
                        <CountryFlag code={contact.country} size={16} />
                        <Badge
                          variant='outline'
                          className={`text-xs ${getRoleColor(contact.role)}`}
                        >
                          <IconComponent className='h-3 w-3 mr-1' />
                          {getRoleLabel(contact.role)}
                        </Badge>
                      </div>
                      <p className='text-sm text-gray-600'>{contact.field}</p>
                    </div>
                  </div>
                  <Button size='sm' className='bg-blue-600 hover:bg-blue-700'>
                    Chat
                  </Button>
                </div>
              );
            })}
          </div>

          {filteredContacts.length === 0 && (
            <div className='text-center py-8 text-gray-500'>
              <MessageSquare className='h-12 w-12 mx-auto mb-2 opacity-50' />
              <p>No contacts found</p>
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default NewChatModal;
