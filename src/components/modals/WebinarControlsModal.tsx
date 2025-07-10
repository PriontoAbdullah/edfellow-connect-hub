import { useState } from 'react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/hooks/use-toast';
import {
  Video,
  Mic,
  MicOff,
  Camera,
  CameraOff,
  Users,
  Settings,
  Share2,
  Circle,
  MessageSquare,
  Lock,
  Unlock,
  Monitor,
  MonitorOff,
  Volume2,
  VolumeX,
  Phone,
  PhoneOff,
  X,
  Play,
  Pause,
  Square,
  RotateCcw,
} from 'lucide-react';

interface WebinarControlsModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  webinar?: {
    id: number;
    title: string;
    date: string;
    registrations: number;
  };
}

const WebinarControlsModal = ({
  open,
  onOpenChange,
  webinar,
}: WebinarControlsModalProps) => {
  const { toast } = useToast();
  const [isRecording, setIsRecording] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [isVideoEnabled, setIsVideoEnabled] = useState(true);
  const [isScreenSharing, setIsScreenSharing] = useState(false);
  const [isChatEnabled, setIsChatEnabled] = useState(true);
  const [isWaitingRoomEnabled, setIsWaitingRoomEnabled] = useState(true);
  const [participantCount, setParticipantCount] = useState(145);
  const [duration, setDuration] = useState('00:32:15');

  const handleToggleRecording = () => {
    setIsRecording(!isRecording);
    toast({
      title: isRecording ? 'Recording Stopped' : 'Recording Started',
      description: isRecording
        ? 'Recording has been stopped'
        : 'Recording is now active',
    });
  };

  const handleToggleMute = () => {
    setIsMuted(!isMuted);
    toast({
      title: isMuted ? 'Microphone Unmuted' : 'Microphone Muted',
      description: isMuted
        ? 'Your microphone is now active'
        : 'Your microphone is now muted',
    });
  };

  const handleToggleVideo = () => {
    setIsVideoEnabled(!isVideoEnabled);
    toast({
      title: isVideoEnabled ? 'Camera Disabled' : 'Camera Enabled',
      description: isVideoEnabled
        ? 'Your camera is now off'
        : 'Your camera is now on',
    });
  };

  const handleToggleScreenShare = () => {
    setIsScreenSharing(!isScreenSharing);
    toast({
      title: isScreenSharing ? 'Screen Share Stopped' : 'Screen Share Started',
      description: isScreenSharing
        ? 'Screen sharing has been stopped'
        : 'Screen sharing is now active',
    });
  };

  const handleToggleChat = () => {
    setIsChatEnabled(!isChatEnabled);
    toast({
      title: isChatEnabled ? 'Chat Disabled' : 'Chat Enabled',
      description: isChatEnabled
        ? 'Chat has been disabled'
        : 'Chat has been enabled',
    });
  };

  const handleToggleWaitingRoom = () => {
    setIsWaitingRoomEnabled(!isWaitingRoomEnabled);
    toast({
      title: isWaitingRoomEnabled
        ? 'Waiting Room Disabled'
        : 'Waiting Room Enabled',
      description: isWaitingRoomEnabled
        ? 'Participants can join directly'
        : 'Participants must wait for approval',
    });
  };

  const handleEndWebinar = () => {
    toast({
      title: 'Webinar Ended',
      description: 'The webinar has been ended for all participants',
    });
    onOpenChange(false);
  };

  const handleGenerateLink = () => {
    toast({
      title: 'Share Link Generated',
      description: 'Webinar link has been copied to clipboard',
    });
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className='max-w-4xl max-h-[90vh] overflow-y-auto'>
        <DialogHeader>
          <div className='flex items-center justify-between'>
            <div className='flex items-center gap-3'>
              <Video className='h-6 w-6 text-purple-600' />
              <div>
                <DialogTitle className='text-2xl font-bold'>
                  Webinar Controls
                </DialogTitle>
                <p className='text-gray-600'>
                  Manage your live session settings and controls
                </p>
              </div>
            </div>
            <Button
              variant='outline'
              size='sm'
              onClick={() => onOpenChange(false)}
            >
              <X className='h-4 w-4' />
            </Button>
          </div>
        </DialogHeader>

        <div className='space-y-6'>
          {/* Webinar Info */}
          {webinar && (
            <Card>
              <CardHeader>
                <CardTitle className='flex items-center gap-2'>
                  <Video className='h-5 w-5 text-purple-600' />
                  Session Information
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className='grid md:grid-cols-3 gap-4'>
                  <div>
                    <Label className='text-sm font-medium'>Title</Label>
                    <p className='text-gray-900'>{webinar.title}</p>
                  </div>
                  <div>
                    <Label className='text-sm font-medium'>Date & Time</Label>
                    <p className='text-gray-900'>{webinar.date}</p>
                  </div>
                  <div>
                    <Label className='text-sm font-medium'>Registrations</Label>
                    <p className='text-gray-900'>
                      {webinar.registrations} participants
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          )}

          {/* Live Session Stats */}
          <Card>
            <CardHeader>
              <CardTitle className='flex items-center gap-2'>
                <Users className='h-5 w-5 text-blue-600' />
                Live Session Stats
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className='grid grid-cols-3 gap-4'>
                <div className='text-center p-4 bg-blue-50 rounded-lg'>
                  <div className='text-2xl font-bold text-blue-600'>
                    {participantCount}
                  </div>
                  <div className='text-sm text-gray-600'>
                    Active Participants
                  </div>
                </div>
                <div className='text-center p-4 bg-green-50 rounded-lg'>
                  <div className='text-2xl font-bold text-green-600'>
                    {duration}
                  </div>
                  <div className='text-sm text-gray-600'>Session Duration</div>
                </div>
                <div className='text-center p-4 bg-purple-50 rounded-lg'>
                  <div className='text-2xl font-bold text-purple-600'>4.8</div>
                  <div className='text-sm text-gray-600'>Avg Rating</div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Audio/Video Controls */}
          <Card>
            <CardHeader>
              <CardTitle className='flex items-center gap-2'>
                <Mic className='h-5 w-5 text-green-600' />
                Audio & Video Controls
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className='grid md:grid-cols-2 gap-6'>
                <div className='space-y-4'>
                  <div className='flex items-center justify-between'>
                    <div className='flex items-center gap-3'>
                      {isMuted ? (
                        <MicOff className='h-5 w-5 text-red-600' />
                      ) : (
                        <Mic className='h-5 w-5 text-green-600' />
                      )}
                      <div>
                        <Label className='text-sm font-medium'>
                          Microphone
                        </Label>
                        <p className='text-xs text-gray-600'>
                          {isMuted ? 'Muted' : 'Active'}
                        </p>
                      </div>
                    </div>
                    <Button
                      variant={isMuted ? 'destructive' : 'default'}
                      size='sm'
                      onClick={handleToggleMute}
                    >
                      {isMuted ? 'Unmute' : 'Mute'}
                    </Button>
                  </div>

                  <div className='flex items-center justify-between'>
                    <div className='flex items-center gap-3'>
                      {isVideoEnabled ? (
                        <Camera className='h-5 w-5 text-green-600' />
                      ) : (
                        <CameraOff className='h-5 w-5 text-red-600' />
                      )}
                      <div>
                        <Label className='text-sm font-medium'>Camera</Label>
                        <p className='text-xs text-gray-600'>
                          {isVideoEnabled ? 'On' : 'Off'}
                        </p>
                      </div>
                    </div>
                    <Button
                      variant={isVideoEnabled ? 'default' : 'destructive'}
                      size='sm'
                      onClick={handleToggleVideo}
                    >
                      {isVideoEnabled ? 'Turn Off' : 'Turn On'}
                    </Button>
                  </div>

                  <div className='flex items-center justify-between'>
                    <div className='flex items-center gap-3'>
                      {isScreenSharing ? (
                        <Monitor className='h-5 w-5 text-green-600' />
                      ) : (
                        <MonitorOff className='h-5 w-5 text-gray-600' />
                      )}
                      <div>
                        <Label className='text-sm font-medium'>
                          Screen Share
                        </Label>
                        <p className='text-xs text-gray-600'>
                          {isScreenSharing ? 'Active' : 'Inactive'}
                        </p>
                      </div>
                    </div>
                    <Button
                      variant={isScreenSharing ? 'default' : 'outline'}
                      size='sm'
                      onClick={handleToggleScreenShare}
                    >
                      {isScreenSharing ? 'Stop' : 'Share'}
                    </Button>
                  </div>
                </div>

                <div className='space-y-4'>
                  <div className='flex items-center justify-between'>
                    <div className='flex items-center gap-3'>
                      {isRecording ? (
                        <Circle className='h-5 w-5 text-red-600' />
                      ) : (
                        <Square className='h-5 w-5 text-gray-600' />
                      )}
                      <div>
                        <Label className='text-sm font-medium'>Recording</Label>
                        <p className='text-xs text-gray-600'>
                          {isRecording ? 'Recording...' : 'Not recording'}
                        </p>
                      </div>
                    </div>
                    <Button
                      variant={isRecording ? 'destructive' : 'outline'}
                      size='sm'
                      onClick={handleToggleRecording}
                    >
                      {isRecording ? 'Stop' : 'Record'}
                    </Button>
                  </div>

                  <div className='flex items-center justify-between'>
                    <div className='flex items-center gap-3'>
                      <MessageSquare className='h-5 w-5 text-blue-600' />
                      <div>
                        <Label className='text-sm font-medium'>Chat</Label>
                        <p className='text-xs text-gray-600'>
                          {isChatEnabled ? 'Enabled' : 'Disabled'}
                        </p>
                      </div>
                    </div>
                    <Switch
                      checked={isChatEnabled}
                      onCheckedChange={handleToggleChat}
                    />
                  </div>

                  <div className='flex items-center justify-between'>
                    <div className='flex items-center gap-3'>
                      {isWaitingRoomEnabled ? (
                        <Lock className='h-5 w-5 text-orange-600' />
                      ) : (
                        <Unlock className='h-5 w-5 text-green-600' />
                      )}
                      <div>
                        <Label className='text-sm font-medium'>
                          Waiting Room
                        </Label>
                        <p className='text-xs text-gray-600'>
                          {isWaitingRoomEnabled ? 'Enabled' : 'Disabled'}
                        </p>
                      </div>
                    </div>
                    <Switch
                      checked={isWaitingRoomEnabled}
                      onCheckedChange={handleToggleWaitingRoom}
                    />
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Session Management */}
          <Card>
            <CardHeader>
              <CardTitle className='flex items-center gap-2'>
                <Settings className='h-5 w-5 text-gray-600' />
                Session Management
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className='grid md:grid-cols-2 gap-4'>
                <div className='space-y-4'>
                  <div>
                    <Label className='text-sm font-medium'>Share Link</Label>
                    <div className='flex gap-2 mt-1'>
                      <Input
                        value='https://webinar.example.com/join/abc123'
                        readOnly
                        className='text-xs'
                      />
                      <Button size='sm' onClick={handleGenerateLink}>
                        <Share2 className='h-4 w-4' />
                      </Button>
                    </div>
                  </div>

                  <div>
                    <Label className='text-sm font-medium'>Session Notes</Label>
                    <Textarea
                      placeholder='Add session notes or announcements...'
                      rows={3}
                      className='mt-1'
                    />
                  </div>
                </div>

                <div className='space-y-4'>
                  <div className='flex gap-2'>
                    <Button variant='outline' className='flex-1'>
                      <Pause className='h-4 w-4 mr-2' />
                      Pause Session
                    </Button>
                    <Button variant='outline' className='flex-1'>
                      <RotateCcw className='h-4 w-4 mr-2' />
                      Restart
                    </Button>
                  </div>

                  <div className='flex gap-2'>
                    <Button variant='outline' className='flex-1'>
                      <Users className='h-4 w-4 mr-2' />
                      Manage Participants
                    </Button>
                    <Button variant='outline' className='flex-1'>
                      <Settings className='h-4 w-4 mr-2' />
                      Advanced Settings
                    </Button>
                  </div>

                  <Button
                    variant='destructive'
                    className='w-full'
                    onClick={handleEndWebinar}
                  >
                    <Square className='h-4 w-4 mr-2' />
                    End Webinar
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default WebinarControlsModal;
