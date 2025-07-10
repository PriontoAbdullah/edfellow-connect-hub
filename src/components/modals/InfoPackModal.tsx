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
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Checkbox } from '@/components/ui/checkbox';
import { useToast } from '@/hooks/use-toast';
import {
  FileText,
  Download,
  Send,
  Mail,
  Globe,
  Calendar,
  DollarSign,
  Users,
  BookOpen,
  Award,
  MapPin,
  Phone,
  X,
  Plus,
  Edit,
  Eye,
} from 'lucide-react';

interface InfoPackModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  inquiry?: {
    id: number;
    student: string;
    email: string;
    country: string;
    program: string;
    message: string;
  };
}

const InfoPackModal = ({ open, onOpenChange, inquiry }: InfoPackModalProps) => {
  const { toast } = useToast();
  const [isGenerating, setIsGenerating] = useState(false);
  const [isSending, setIsSending] = useState(false);
  const [selectedMaterials, setSelectedMaterials] = useState<string[]>([
    'program-brochure',
    'admission-requirements',
    'tuition-fees',
  ]);
  const [customMessage, setCustomMessage] = useState('');
  const [activeTab, setActiveTab] = useState('materials');

  const availableMaterials = [
    {
      id: 'program-brochure',
      title: 'Program Brochure',
      description: 'Comprehensive program overview and curriculum details',
      icon: BookOpen,
      size: '2.3 MB',
    },
    {
      id: 'admission-requirements',
      title: 'Admission Requirements',
      description: 'Detailed application process and prerequisites',
      icon: FileText,
      size: '1.1 MB',
    },
    {
      id: 'tuition-fees',
      title: 'Tuition & Fees Guide',
      description: 'Complete cost breakdown and payment options',
      icon: DollarSign,
      size: '856 KB',
    },
    {
      id: 'campus-life',
      title: 'Campus Life Guide',
      description: 'Student life, housing, and facilities information',
      icon: Users,
      size: '3.2 MB',
    },
    {
      id: 'scholarships',
      title: 'Scholarship Opportunities',
      description: 'Available scholarships and financial aid options',
      icon: Award,
      size: '1.8 MB',
    },
    {
      id: 'international-guide',
      title: 'International Student Guide',
      description: 'Visa requirements and international student support',
      icon: Globe,
      size: '2.1 MB',
    },
  ];

  const handleGeneratePack = async () => {
    setIsGenerating(true);
    toast({
      title: 'Generating Information Pack',
      description: 'Preparing customized materials for the student...',
    });

    // Simulate generation process
    setTimeout(() => {
      setIsGenerating(false);
      toast({
        title: 'Information Pack Ready',
        description: 'Customized materials have been prepared successfully.',
      });
    }, 3000);
  };

  const handleSendPack = async () => {
    setIsSending(true);
    toast({
      title: 'Sending Information Pack',
      description: `Sending materials to ${inquiry?.student}...`,
    });

    // Simulate sending process
    setTimeout(() => {
      setIsSending(false);
      toast({
        title: 'Information Pack Sent',
        description: 'Materials have been sent to the student successfully.',
      });
      onOpenChange(false);
    }, 2000);
  };

  const handleDownloadPack = () => {
    toast({
      title: 'Downloading Information Pack',
      description: 'Preparing files for download...',
    });
  };

  const toggleMaterial = (materialId: string) => {
    setSelectedMaterials((prev) =>
      prev.includes(materialId)
        ? prev.filter((id) => id !== materialId)
        : [...prev, materialId]
    );
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className='max-w-4xl max-h-[90vh] overflow-y-auto'>
        <DialogHeader>
          <div className='flex items-center justify-between'>
            <div className='flex items-center gap-3'>
              <FileText className='h-6 w-6 text-orange-600' />
              <div>
                <DialogTitle className='text-2xl font-bold'>
                  Information Pack Generator
                </DialogTitle>
                <p className='text-gray-600'>
                  Create and send customized information packages to students
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
          {/* Student Information */}
          {inquiry && (
            <Card>
              <CardHeader>
                <CardTitle className='flex items-center gap-2'>
                  <Users className='h-5 w-5 text-blue-600' />
                  Student Information
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className='grid md:grid-cols-2 gap-4'>
                  <div>
                    <Label className='text-sm font-medium'>Student Name</Label>
                    <p className='text-gray-900'>{inquiry.student}</p>
                  </div>
                  <div>
                    <Label className='text-sm font-medium'>Email</Label>
                    <p className='text-gray-900'>{inquiry.email}</p>
                  </div>
                  <div>
                    <Label className='text-sm font-medium'>Country</Label>
                    <p className='text-gray-900'>{inquiry.country}</p>
                  </div>
                  <div>
                    <Label className='text-sm font-medium'>
                      Program of Interest
                    </Label>
                    <p className='text-gray-900'>{inquiry.program}</p>
                  </div>
                </div>
                <div className='mt-4'>
                  <Label className='text-sm font-medium'>Inquiry Message</Label>
                  <p className='text-gray-700 text-sm mt-1'>
                    {inquiry.message}
                  </p>
                </div>
              </CardContent>
            </Card>
          )}

          {/* Materials Selection */}
          <Card>
            <CardHeader>
              <CardTitle className='flex items-center gap-2'>
                <BookOpen className='h-5 w-5 text-green-600' />
                Select Materials
              </CardTitle>
              <p className='text-sm text-gray-600'>
                Choose the materials to include in the information pack
              </p>
            </CardHeader>
            <CardContent>
              <div className='grid md:grid-cols-2 gap-4'>
                {availableMaterials.map((material) => (
                  <div
                    key={material.id}
                    className={`border rounded-lg p-4 cursor-pointer transition-colors ${
                      selectedMaterials.includes(material.id)
                        ? 'border-blue-500 bg-blue-50'
                        : 'border-gray-200 hover:border-gray-300'
                    }`}
                    onClick={() => toggleMaterial(material.id)}
                  >
                    <div className='flex items-start gap-3'>
                      <Checkbox
                        checked={selectedMaterials.includes(material.id)}
                        onChange={() => toggleMaterial(material.id)}
                      />
                      <div className='flex-1'>
                        <div className='flex items-center gap-2 mb-1'>
                          <material.icon className='h-4 w-4 text-gray-600' />
                          <h4 className='font-medium text-gray-900'>
                            {material.title}
                          </h4>
                        </div>
                        <p className='text-sm text-gray-600 mb-2'>
                          {material.description}
                        </p>
                        <div className='flex items-center justify-between'>
                          <Badge variant='outline' className='text-xs'>
                            {material.size}
                          </Badge>
                          <Button
                            variant='ghost'
                            size='sm'
                            onClick={(e) => {
                              e.stopPropagation();
                              // Preview functionality
                            }}
                          >
                            <Eye className='h-3 w-3' />
                          </Button>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Custom Message */}
          <Card>
            <CardHeader>
              <CardTitle className='flex items-center gap-2'>
                <Mail className='h-5 w-5 text-purple-600' />
                Custom Message
              </CardTitle>
              <p className='text-sm text-gray-600'>
                Add a personalized message to accompany the materials
              </p>
            </CardHeader>
            <CardContent>
              <Textarea
                value={customMessage}
                onChange={(e) => setCustomMessage(e.target.value)}
                placeholder="Dear [Student Name],&#10;&#10;Thank you for your interest in our [Program Name]. I'm pleased to share the following materials that should help answer your questions...&#10;&#10;If you have any additional questions, please don't hesitate to reach out.&#10;&#10;Best regards,&#10;[Your Name]"
                rows={6}
                className='resize-none'
              />
            </CardContent>
          </Card>

          {/* Action Buttons */}
          <div className='flex items-center justify-between pt-4 border-t'>
            <div className='flex gap-2'>
              <Button
                variant='outline'
                onClick={handleGeneratePack}
                disabled={isGenerating || selectedMaterials.length === 0}
              >
                {isGenerating ? (
                  <>
                    <div className='animate-spin rounded-full h-4 w-4 border-b-2 border-orange-600 mr-2'></div>
                    Generating...
                  </>
                ) : (
                  <>
                    <FileText className='h-4 w-4 mr-2' />
                    Generate Pack
                  </>
                )}
              </Button>
              <Button
                variant='outline'
                onClick={handleDownloadPack}
                disabled={selectedMaterials.length === 0}
              >
                <Download className='h-4 w-4 mr-2' />
                Download
              </Button>
            </div>
            <div className='flex gap-2'>
              <Button variant='outline' onClick={() => onOpenChange(false)}>
                Cancel
              </Button>
              <Button
                onClick={handleSendPack}
                disabled={isSending || selectedMaterials.length === 0}
                className='bg-orange-600 hover:bg-orange-700'
              >
                {isSending ? (
                  <>
                    <div className='animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2'></div>
                    Sending...
                  </>
                ) : (
                  <>
                    <Send className='h-4 w-4 mr-2' />
                    Send Pack
                  </>
                )}
              </Button>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default InfoPackModal;
