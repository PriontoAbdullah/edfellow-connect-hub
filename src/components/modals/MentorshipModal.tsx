
import { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { useToast } from "@/hooks/use-toast";
import { Star, MessageSquare } from 'lucide-react';

interface MentorshipModalProps {
  isOpen: boolean;
  onClose: () => void;
  mentorName: string;
  mentorField: string;
  mentorUniversity: string;
  mentorRating: number;
}

const MentorshipModal = ({ isOpen, onClose, mentorName, mentorField, mentorUniversity, mentorRating }: MentorshipModalProps) => {
  const { toast } = useToast();
  const [message, setMessage] = useState('');

  const handleSubmit = () => {
    if (message.trim()) {
      toast({
        title: "Mentorship Request Sent",
        description: `Your request has been sent to ${mentorName}. They will respond within 24 hours.`,
      });
      onClose();
      setMessage('');
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <MessageSquare className="h-5 w-5" />
            Request Mentorship
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-4">
          <div className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg">
            <Avatar className="h-12 w-12">
              <AvatarFallback className="bg-green-100 text-green-600">
                {mentorName.split(' ').map(n => n[0]).join('')}
              </AvatarFallback>
            </Avatar>
            <div className="flex-1">
              <h3 className="font-medium text-gray-900">{mentorName}</h3>
              <p className="text-sm text-gray-600">{mentorField}</p>
              <p className="text-sm text-gray-600">{mentorUniversity}</p>
              <div className="flex items-center mt-1">
                <Star className="h-4 w-4 text-yellow-500 mr-1" />
                <span className="text-sm font-medium">{mentorRating}</span>
              </div>
            </div>
          </div>

          <div>
            <Label htmlFor="message">Message</Label>
            <Textarea
              id="message"
              placeholder="Tell the professor about yourself and what kind of guidance you're seeking..."
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              rows={4}
              className="mt-1"
            />
          </div>

          <div className="bg-blue-50 p-3 rounded-lg">
            <p className="text-sm text-blue-800">
              <strong>Tips for a good request:</strong>
            </p>
            <ul className="text-sm text-blue-700 mt-1 space-y-1">
              <li>• Be specific about what you need help with</li>
              <li>• Mention your current situation and goals</li>
              <li>• Be respectful of their time</li>
            </ul>
          </div>
        </div>

        <div className="flex justify-end space-x-2 pt-4">
          <Button variant="outline" onClick={onClose}>Cancel</Button>
          <Button onClick={handleSubmit} disabled={!message.trim()}>
            Send Request
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default MentorshipModal;
