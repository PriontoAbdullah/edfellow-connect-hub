import { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Calendar, Clock, MessageSquare } from 'lucide-react';
import { useToast } from "@/hooks/use-toast";

interface ScheduleSessionModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  studentName?: string;
  action: 'accept' | 'reschedule';
}

const ScheduleSessionModal = ({ open, onOpenChange, studentName, action }: ScheduleSessionModalProps) => {
  const [date, setDate] = useState('');
  const [time, setTime] = useState('');
  const [duration, setDuration] = useState('60');
  const [notes, setNotes] = useState('');
  const { toast } = useToast();

  const handleSubmit = () => {
    if (!date || !time) {
      toast({
        title: "Missing Information",
        description: "Please select both date and time for the session.",
        variant: "destructive"
      });
      return;
    }

    const actionText = action === 'accept' ? 'accepted and scheduled' : 'rescheduled';
    toast({
      title: "Session Scheduled!",
      description: `Mentorship session with ${studentName} has been ${actionText} for ${date} at ${time}.`,
    });
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Calendar className="h-5 w-5 text-green-600" />
            {action === 'accept' ? 'Accept & Schedule Session' : 'Reschedule Session'}
          </DialogTitle>
        </DialogHeader>
        
        <div className="space-y-4">
          {studentName && (
            <div className="p-3 bg-blue-50 rounded-lg">
              <p className="text-sm text-gray-700">
                <span className="font-medium">Student:</span> {studentName}
              </p>
            </div>
          )}

          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label htmlFor="date">Date</Label>
              <Input
                id="date"
                type="date"
                value={date}
                onChange={(e) => setDate(e.target.value)}
                min={new Date().toISOString().split('T')[0]}
              />
            </div>
            <div>
              <Label htmlFor="time">Time</Label>
              <Input
                id="time"
                type="time"
                value={time}
                onChange={(e) => setTime(e.target.value)}
              />
            </div>
          </div>

          <div>
            <Label htmlFor="duration">Duration (minutes)</Label>
            <Input
              id="duration"
              type="number"
              value={duration}
              onChange={(e) => setDuration(e.target.value)}
              min="30"
              max="180"
              step="15"
            />
          </div>

          <div>
            <Label htmlFor="notes">Session Notes (Optional)</Label>
            <Textarea
              id="notes"
              placeholder="Add any notes or agenda items for the session..."
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              rows={3}
            />
          </div>

          <div className="flex gap-3 pt-4">
            <Button
              variant="outline"
              onClick={() => onOpenChange(false)}
              className="flex-1"
            >
              Cancel
            </Button>
            <Button
              onClick={handleSubmit}
              className="flex-1 bg-green-600 hover:bg-green-700"
            >
              <Clock className="h-4 w-4 mr-2" />
              {action === 'accept' ? 'Accept & Schedule' : 'Reschedule'}
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default ScheduleSessionModal;