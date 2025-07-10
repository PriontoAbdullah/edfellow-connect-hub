import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Phone, PhoneOff, Video, VideoOff, Mic, MicOff } from 'lucide-react';
import { useState } from 'react';

interface CallModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  contactName: string;
  isVideoCall?: boolean;
}

const CallModal = ({ open, onOpenChange, contactName, isVideoCall = false }: CallModalProps) => {
  const [isMuted, setIsMuted] = useState(false);
  const [isVideoEnabled, setIsVideoEnabled] = useState(isVideoCall);
  const [callStatus, setCallStatus] = useState<'connecting' | 'connected' | 'ended'>('connecting');

  const handleEndCall = () => {
    setCallStatus('ended');
    setTimeout(() => {
      onOpenChange(false);
      setCallStatus('connecting');
    }, 1000);
  };

  const toggleMute = () => setIsMuted(!isMuted);
  const toggleVideo = () => setIsVideoEnabled(!isVideoEnabled);

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2 justify-center">
            {isVideoCall ? (
              <Video className="h-5 w-5 text-blue-600" />
            ) : (
              <Phone className="h-5 w-5 text-green-600" />
            )}
            {isVideoCall ? 'Video Call' : 'Audio Call'}
          </DialogTitle>
        </DialogHeader>
        
        <div className="text-center space-y-6">
          <div className="flex flex-col items-center space-y-4">
            <Avatar className="h-24 w-24">
              <AvatarFallback className="bg-blue-100 text-blue-600 text-2xl">
                {contactName.split(' ').map(n => n[0]).join('')}
              </AvatarFallback>
            </Avatar>
            
            <div>
              <h3 className="text-xl font-semibold text-gray-900">{contactName}</h3>
              <p className="text-gray-600 capitalize">
                {callStatus === 'connecting' && 'Connecting...'}
                {callStatus === 'connected' && 'Connected - 00:45'}
                {callStatus === 'ended' && 'Call Ended'}
              </p>
            </div>
          </div>

          {isVideoCall && isVideoEnabled && (
            <div className="bg-gray-900 rounded-lg h-48 flex items-center justify-center">
              <p className="text-white">Video feed would appear here</p>
            </div>
          )}

          <div className="flex justify-center space-x-4">
            <Button
              variant="outline"
              size="lg"
              className={`rounded-full w-12 h-12 ${isMuted ? 'bg-red-100' : ''}`}
              onClick={toggleMute}
            >
              {isMuted ? (
                <MicOff className="h-5 w-5 text-red-600" />
              ) : (
                <Mic className="h-5 w-5" />
              )}
            </Button>

            {isVideoCall && (
              <Button
                variant="outline"
                size="lg"
                className={`rounded-full w-12 h-12 ${!isVideoEnabled ? 'bg-red-100' : ''}`}
                onClick={toggleVideo}
              >
                {isVideoEnabled ? (
                  <Video className="h-5 w-5" />
                ) : (
                  <VideoOff className="h-5 w-5 text-red-600" />
                )}
              </Button>
            )}

            <Button
              variant="destructive"
              size="lg"
              className="rounded-full w-12 h-12"
              onClick={handleEndCall}
            >
              <PhoneOff className="h-5 w-5" />
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default CallModal;