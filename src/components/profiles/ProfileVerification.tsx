import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Alert, AlertDescription } from '@/components/ui/alert';
import {
  Shield,
  CheckCircle,
  XCircle,
  Clock,
  Upload,
  FileText,
  Mail,
  Globe,
  Building2,
  GraduationCap,
  AlertTriangle,
  ExternalLink,
} from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';
import { useToast } from '@/hooks/use-toast';

interface VerificationDocument {
  id: string;
  type: string;
  name: string;
  url?: string;
  uploaded: boolean;
  verified: boolean;
  required: boolean;
}

interface ProfileVerificationProps {
  userId: string;
  userRole: 'student' | 'professor' | 'university';
  verificationStatus?: 'pending' | 'verified' | 'rejected';
  onStatusChange?: (status: 'pending' | 'verified' | 'rejected') => void;
}

export const ProfileVerification: React.FC<ProfileVerificationProps> = ({
  userId,
  userRole,
  verificationStatus = 'pending',
  onStatusChange,
}) => {
  const { user } = useAuth();
  const { toast } = useToast();
  const [documents, setDocuments] = useState<VerificationDocument[]>([]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [verificationData, setVerificationData] = useState({
    institutionalEmail: '',
    institutionWebsite: '',
    position: '',
    department: '',
    verificationMessage: '',
  });

  useEffect(() => {
    initializeDocuments();
  }, [userRole]);

  const initializeDocuments = () => {
    const baseDocuments: VerificationDocument[] = [
      {
        id: 'institutional_email',
        type: 'email',
        name: 'Institutional Email Verification',
        required: true,
        uploaded: false,
        verified: false,
      },
      {
        id: 'institution_website',
        type: 'website',
        name: 'Institution Website',
        required: true,
        uploaded: false,
        verified: false,
      },
    ];

    if (userRole === 'professor') {
      baseDocuments.push(
        {
          id: 'employment_letter',
          type: 'document',
          name: 'Employment Letter or Contract',
          required: true,
          uploaded: false,
          verified: false,
        },
        {
          id: 'academic_credentials',
          type: 'document',
          name: 'Academic Credentials (PhD, etc.)',
          required: false,
          uploaded: false,
          verified: false,
        },
        {
          id: 'publication_list',
          type: 'document',
          name: 'Publication List or CV',
          required: false,
          uploaded: false,
          verified: false,
        }
      );
    }

    if (userRole === 'university') {
      baseDocuments.push(
        {
          id: 'accreditation_certificate',
          type: 'document',
          name: 'Accreditation Certificate',
          required: true,
          uploaded: false,
          verified: false,
        },
        {
          id: 'official_letterhead',
          type: 'document',
          name: 'Official Letterhead Document',
          required: true,
          uploaded: false,
          verified: false,
        },
        {
          id: 'contact_person_verification',
          type: 'document',
          name: 'Contact Person Verification',
          required: true,
          uploaded: false,
          verified: false,
        }
      );
    }

    setDocuments(baseDocuments);
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'verified':
        return <CheckCircle className='w-5 h-5 text-green-600' />;
      case 'rejected':
        return <XCircle className='w-5 h-5 text-red-600' />;
      case 'pending':
        return <Clock className='w-5 h-5 text-yellow-600' />;
      default:
        return <AlertTriangle className='w-5 h-5 text-gray-400' />;
    }
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'verified':
        return <Badge className='bg-green-100 text-green-800'>Verified</Badge>;
      case 'rejected':
        return <Badge className='bg-red-100 text-red-800'>Rejected</Badge>;
      case 'pending':
        return <Badge className='bg-yellow-100 text-yellow-800'>Pending</Badge>;
      default:
        return <Badge className='bg-gray-100 text-gray-800'>Not Started</Badge>;
    }
  };

  const handleDocumentUpload = (documentId: string, file: File) => {
    setDocuments((prev) =>
      prev.map((doc) =>
        doc.id === documentId
          ? { ...doc, uploaded: true, url: URL.createObjectURL(file) }
          : doc
      )
    );

    toast({
      title: 'Document Uploaded',
      description: 'Your document has been uploaded successfully.',
    });
  };

  const handleSubmitVerification = async () => {
    setIsSubmitting(true);

    try {
      // Here you would typically send the verification data to your API
      // For now, we'll simulate the process

      const requiredDocuments = documents.filter((doc) => doc.required);
      const uploadedRequired = requiredDocuments.filter((doc) => doc.uploaded);

      if (uploadedRequired.length < requiredDocuments.length) {
        toast({
          title: 'Missing Required Documents',
          description:
            'Please upload all required documents before submitting.',
          variant: 'destructive',
        });
        return;
      }

      if (
        !verificationData.institutionalEmail ||
        !verificationData.institutionWebsite
      ) {
        toast({
          title: 'Missing Required Information',
          description: 'Please fill in all required fields.',
          variant: 'destructive',
        });
        return;
      }

      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 2000));

      onStatusChange?.('pending');

      toast({
        title: 'Verification Submitted',
        description:
          'Your verification request has been submitted. We will review it within 2-3 business days.',
      });
    } catch (error) {
      toast({
        title: 'Submission Failed',
        description: 'There was an error submitting your verification request.',
        variant: 'destructive',
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const getVerificationInstructions = () => {
    if (userRole === 'professor') {
      return {
        title: 'Professor Verification',
        description:
          'To verify your professor status, please provide the following documents and information:',
        steps: [
          'Provide your institutional email address',
          'Upload your employment letter or contract',
          "Verify your institution's website",
          'Optionally provide academic credentials and publications',
        ],
      };
    }

    if (userRole === 'university') {
      return {
        title: 'University Verification',
        description:
          'To verify your university status, please provide the following documents and information:',
        steps: [
          'Provide your institutional email address',
          'Upload accreditation certificate',
          'Upload official letterhead document',
          "Verify your institution's website",
          'Provide contact person verification',
        ],
      };
    }

    return {
      title: 'Verification',
      description: 'Verification is not required for student accounts.',
      steps: [],
    };
  };

  const instructions = getVerificationInstructions();

  if (userRole === 'student') {
    return (
      <Card>
        <CardHeader>
          <CardTitle className='flex items-center gap-2'>
            <Shield className='w-5 h-5' />
            Account Verification
          </CardTitle>
        </CardHeader>
        <CardContent>
          <Alert>
            <CheckCircle className='h-4 w-4' />
            <AlertDescription>
              Student accounts do not require verification. You can start using
              all features immediately.
            </AlertDescription>
          </Alert>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className='space-y-6'>
      {/* Verification Status */}
      <Card>
        <CardHeader>
          <div className='flex items-center justify-between'>
            <CardTitle className='flex items-center gap-2'>
              <Shield className='w-5 h-5' />
              {instructions.title}
            </CardTitle>
            {getStatusBadge(verificationStatus)}
          </div>
        </CardHeader>
        <CardContent>
          <div className='flex items-center gap-3 mb-4'>
            {getStatusIcon(verificationStatus)}
            <div>
              <p className='text-sm text-muted-foreground'>
                {instructions.description}
              </p>
            </div>
          </div>

          {verificationStatus === 'verified' && (
            <Alert>
              <CheckCircle className='h-4 w-4' />
              <AlertDescription>
                Your account has been verified! You now have access to all
                professor/university features.
              </AlertDescription>
            </Alert>
          )}

          {verificationStatus === 'rejected' && (
            <Alert variant='destructive'>
              <XCircle className='h-4 w-4' />
              <AlertDescription>
                Your verification was rejected. Please review the requirements
                and resubmit with correct information.
              </AlertDescription>
            </Alert>
          )}
        </CardContent>
      </Card>

      {verificationStatus !== 'verified' && (
        <>
          {/* Verification Steps */}
          <Card>
            <CardHeader>
              <CardTitle>Verification Steps</CardTitle>
            </CardHeader>
            <CardContent>
              <div className='space-y-3'>
                {instructions.steps.map((step, index) => (
                  <div key={index} className='flex items-center gap-3'>
                    <div className='w-6 h-6 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center text-sm font-medium'>
                      {index + 1}
                    </div>
                    <span className='text-sm'>{step}</span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Verification Form */}
          <Card>
            <CardHeader>
              <CardTitle>Verification Information</CardTitle>
            </CardHeader>
            <CardContent className='space-y-4'>
              <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
                <div className='space-y-2'>
                  <Label htmlFor='institutionalEmail'>
                    Institutional Email *
                  </Label>
                  <div className='flex gap-2'>
                    <Mail className='w-4 h-4 mt-3 text-muted-foreground' />
                    <Input
                      id='institutionalEmail'
                      type='email'
                      placeholder='your.name@university.edu'
                      value={verificationData.institutionalEmail}
                      onChange={(e) =>
                        setVerificationData((prev) => ({
                          ...prev,
                          institutionalEmail: e.target.value,
                        }))
                      }
                    />
                  </div>
                </div>

                <div className='space-y-2'>
                  <Label htmlFor='institutionWebsite'>
                    Institution Website *
                  </Label>
                  <div className='flex gap-2'>
                    <Globe className='w-4 h-4 mt-3 text-muted-foreground' />
                    <Input
                      id='institutionWebsite'
                      type='url'
                      placeholder='https://university.edu'
                      value={verificationData.institutionWebsite}
                      onChange={(e) =>
                        setVerificationData((prev) => ({
                          ...prev,
                          institutionWebsite: e.target.value,
                        }))
                      }
                    />
                  </div>
                </div>
              </div>

              <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
                <div className='space-y-2'>
                  <Label htmlFor='position'>Position/Title</Label>
                  <div className='flex gap-2'>
                    {userRole === 'professor' ? (
                      <GraduationCap className='w-4 h-4 mt-3 text-muted-foreground' />
                    ) : (
                      <Building2 className='w-4 h-4 mt-3 text-muted-foreground' />
                    )}
                    <Input
                      id='position'
                      placeholder={
                        userRole === 'professor'
                          ? 'Professor of Computer Science'
                          : 'University Administrator'
                      }
                      value={verificationData.position}
                      onChange={(e) =>
                        setVerificationData((prev) => ({
                          ...prev,
                          position: e.target.value,
                        }))
                      }
                    />
                  </div>
                </div>

                <div className='space-y-2'>
                  <Label htmlFor='department'>Department</Label>
                  <Input
                    id='department'
                    placeholder='Computer Science Department'
                    value={verificationData.department}
                    onChange={(e) =>
                      setVerificationData((prev) => ({
                        ...prev,
                        department: e.target.value,
                      }))
                    }
                  />
                </div>
              </div>

              <div className='space-y-2'>
                <Label htmlFor='verificationMessage'>
                  Additional Information
                </Label>
                <Textarea
                  id='verificationMessage'
                  placeholder='Any additional information that might help with verification...'
                  value={verificationData.verificationMessage}
                  onChange={(e) =>
                    setVerificationData((prev) => ({
                      ...prev,
                      verificationMessage: e.target.value,
                    }))
                  }
                  rows={3}
                />
              </div>
            </CardContent>
          </Card>

          {/* Document Upload */}
          <Card>
            <CardHeader>
              <CardTitle>Required Documents</CardTitle>
            </CardHeader>
            <CardContent>
              <div className='space-y-4'>
                {documents.map((document) => (
                  <div
                    key={document.id}
                    className='flex items-center gap-4 p-4 border rounded-lg'
                  >
                    <div className='flex-1'>
                      <div className='flex items-center gap-2'>
                        <FileText className='w-4 h-4' />
                        <span className='font-medium'>{document.name}</span>
                        {document.required && (
                          <Badge variant='outline' className='text-xs'>
                            Required
                          </Badge>
                        )}
                      </div>
                      <p className='text-sm text-muted-foreground mt-1'>
                        {document.type === 'email' &&
                          'We will send a verification email to this address'}
                        {document.type === 'website' &&
                          'We will verify this website belongs to your institution'}
                        {document.type === 'document' &&
                          'Upload a clear photo or PDF of this document'}
                      </p>
                    </div>

                    <div className='flex items-center gap-2'>
                      {document.uploaded ? (
                        <div className='flex items-center gap-2'>
                          <CheckCircle className='w-4 h-4 text-green-600' />
                          <span className='text-sm text-green-600'>
                            Uploaded
                          </span>
                        </div>
                      ) : (
                        <div className='flex items-center gap-2'>
                          <input
                            type='file'
                            id={`upload-${document.id}`}
                            className='hidden'
                            accept='.pdf,.jpg,.jpeg,.png'
                            onChange={(e) => {
                              const file = e.target.files?.[0];
                              if (file) {
                                handleDocumentUpload(document.id, file);
                              }
                            }}
                          />
                          <Button
                            variant='outline'
                            size='sm'
                            onClick={() =>
                              document
                                .getElementById(`upload-${document.id}`)
                                ?.click()
                            }
                          >
                            <Upload className='w-4 h-4 mr-2' />
                            Upload
                          </Button>
                        </div>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Submit Button */}
          <div className='flex justify-end'>
            <Button
              onClick={handleSubmitVerification}
              disabled={isSubmitting}
              className='min-w-[200px]'
            >
              {isSubmitting ? 'Submitting...' : 'Submit for Verification'}
            </Button>
          </div>
        </>
      )}
    </div>
  );
};
