import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import {
  Users,
  Lock,
  Globe,
  GraduationCap,
  Building2,
  Star,
  TrendingUp,
  Plus,
  X,
  AlertCircle,
  CheckCircle,
} from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';
import { useToast } from '@/hooks/use-toast';
import { createGroup } from '@/lib/api/groups';

interface GroupCreationProps {
  onSuccess?: (group: any) => void;
  onCancel?: () => void;
}

interface GroupFormData {
  name: string;
  description: string;
  category: 'study' | 'research' | 'professional' | 'social' | 'academic';
  subject_area: string;
  university: string;
  department: string;
  level: 'undergraduate' | 'graduate' | 'phd' | 'postdoc' | 'faculty' | 'mixed';
  max_members: number;
  is_private: boolean;
  rules: string;
}

export const GroupCreation: React.FC<GroupCreationProps> = ({
  onSuccess,
  onCancel,
}) => {
  const { user } = useAuth();
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState<GroupFormData>({
    name: '',
    description: '',
    category: 'study',
    subject_area: '',
    university: '',
    department: '',
    level: 'mixed',
    max_members: 50,
    is_private: false,
    rules: '',
  });

  const [errors, setErrors] = useState<Partial<GroupFormData>>({});

  const categories = [
    {
      value: 'study',
      label: 'Study Group',
      icon: GraduationCap,
      description: 'Academic study and learning groups',
    },
    {
      value: 'research',
      label: 'Research',
      icon: TrendingUp,
      description: 'Research collaboration and discussion',
    },
    {
      value: 'professional',
      label: 'Professional',
      icon: Building2,
      description: 'Career and professional development',
    },
    {
      value: 'social',
      label: 'Social',
      icon: Users,
      description: 'Social networking and community building',
    },
    {
      value: 'academic',
      label: 'Academic',
      icon: Star,
      description: 'General academic discussions and activities',
    },
  ];

  const levels = [
    { value: 'undergraduate', label: 'Undergraduate' },
    { value: 'graduate', label: 'Graduate' },
    { value: 'phd', label: 'PhD' },
    { value: 'postdoc', label: 'Postdoc' },
    { value: 'faculty', label: 'Faculty' },
    { value: 'mixed', label: 'Mixed Levels' },
  ];

  const validateStep = (step: number): boolean => {
    const newErrors: Partial<GroupFormData> = {};

    if (step === 1) {
      if (!formData.name.trim()) {
        newErrors.name = 'Group name is required';
      } else if (formData.name.length < 3) {
        newErrors.name = 'Group name must be at least 3 characters';
      }

      if (!formData.description.trim()) {
        newErrors.description = 'Description is required';
      } else if (formData.description.length < 10) {
        newErrors.description = 'Description must be at least 10 characters';
      }
    }

    if (step === 2) {
      if (!formData.subject_area.trim()) {
        newErrors.subject_area = 'Subject area is required';
      }

      if (!formData.university.trim()) {
        newErrors.university = 'University is required';
      }
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleNext = () => {
    if (validateStep(currentStep)) {
      setCurrentStep(currentStep + 1);
    }
  };

  const handlePrevious = () => {
    setCurrentStep(currentStep - 1);
  };

  const handleSubmit = async () => {
    if (!validateStep(2)) {
      return;
    }

    setIsSubmitting(true);
    try {
      const { data, error } = await createGroup(formData);

      if (error) {
        toast({
          title: 'Error',
          description: error,
          variant: 'destructive',
        });
        return;
      }

      toast({
        title: 'Success',
        description: 'Group created successfully!',
      });

      onSuccess?.(data);
    } catch (error) {
      toast({
        title: 'Error',
        description: 'Failed to create group',
        variant: 'destructive',
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const updateFormData = (field: keyof GroupFormData, value: any) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    // Clear error when user starts typing
    if (errors[field]) {
      setErrors((prev) => ({ ...prev, [field]: undefined }));
    }
  };

  const renderStep1 = () => (
    <div className='space-y-6'>
      <div>
        <h3 className='text-lg font-semibold mb-2'>Basic Information</h3>
        <p className='text-sm text-muted-foreground'>
          Provide the basic details for your group
        </p>
      </div>

      <div className='space-y-4'>
        <div>
          <Label htmlFor='name'>Group Name *</Label>
          <Input
            id='name'
            value={formData.name}
            onChange={(e) => updateFormData('name', e.target.value)}
            placeholder='Enter group name'
            className={errors.name ? 'border-red-500' : ''}
          />
          {errors.name && (
            <p className='text-sm text-red-500 mt-1'>{errors.name}</p>
          )}
        </div>

        <div>
          <Label htmlFor='description'>Description *</Label>
          <Textarea
            id='description'
            value={formData.description}
            onChange={(e) => updateFormData('description', e.target.value)}
            placeholder='Describe the purpose and goals of your group'
            rows={4}
            className={errors.description ? 'border-red-500' : ''}
          />
          {errors.description && (
            <p className='text-sm text-red-500 mt-1'>{errors.description}</p>
          )}
        </div>

        <div>
          <Label>Category *</Label>
          <div className='grid grid-cols-1 md:grid-cols-2 gap-3 mt-2'>
            {categories.map((category) => {
              const Icon = category.icon;
              return (
                <div
                  key={category.value}
                  className={`p-3 border rounded-lg cursor-pointer transition-colors ${
                    formData.category === category.value
                      ? 'border-blue-500 bg-blue-50'
                      : 'border-gray-200 hover:border-gray-300'
                  }`}
                  onClick={() => updateFormData('category', category.value)}
                >
                  <div className='flex items-center gap-2 mb-1'>
                    <Icon className='w-4 h-4' />
                    <span className='font-medium'>{category.label}</span>
                  </div>
                  <p className='text-xs text-muted-foreground'>
                    {category.description}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );

  const renderStep2 = () => (
    <div className='space-y-6'>
      <div>
        <h3 className='text-lg font-semibold mb-2'>Academic Details</h3>
        <p className='text-sm text-muted-foreground'>
          Specify the academic focus and target audience
        </p>
      </div>

      <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
        <div>
          <Label htmlFor='subject_area'>Subject Area *</Label>
          <Input
            id='subject_area'
            value={formData.subject_area}
            onChange={(e) => updateFormData('subject_area', e.target.value)}
            placeholder='e.g., Computer Science, Biology'
            className={errors.subject_area ? 'border-red-500' : ''}
          />
          {errors.subject_area && (
            <p className='text-sm text-red-500 mt-1'>{errors.subject_area}</p>
          )}
        </div>

        <div>
          <Label htmlFor='university'>University *</Label>
          <Input
            id='university'
            value={formData.university}
            onChange={(e) => updateFormData('university', e.target.value)}
            placeholder='e.g., MIT, Stanford University'
            className={errors.university ? 'border-red-500' : ''}
          />
          {errors.university && (
            <p className='text-sm text-red-500 mt-1'>{errors.university}</p>
          )}
        </div>

        <div>
          <Label htmlFor='department'>Department</Label>
          <Input
            id='department'
            value={formData.department}
            onChange={(e) => updateFormData('department', e.target.value)}
            placeholder='e.g., Computer Science Department'
          />
        </div>

        <div>
          <Label htmlFor='level'>Academic Level</Label>
          <select
            id='level'
            value={formData.level}
            onChange={(e) => updateFormData('level', e.target.value)}
            className='w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500'
          >
            {levels.map((level) => (
              <option key={level.value} value={level.value}>
                {level.label}
              </option>
            ))}
          </select>
        </div>
      </div>
    </div>
  );

  const renderStep3 = () => (
    <div className='space-y-6'>
      <div>
        <h3 className='text-lg font-semibold mb-2'>Group Settings</h3>
        <p className='text-sm text-muted-foreground'>
          Configure privacy and membership settings
        </p>
      </div>

      <div className='space-y-4'>
        <div>
          <Label htmlFor='max_members'>Maximum Members</Label>
          <Input
            id='max_members'
            type='number'
            value={formData.max_members}
            onChange={(e) =>
              updateFormData('max_members', parseInt(e.target.value))
            }
            min={5}
            max={1000}
          />
          <p className='text-xs text-muted-foreground mt-1'>
            Recommended: 20-100 members for active discussions
          </p>
        </div>

        <div>
          <Label>Privacy Setting</Label>
          <div className='flex gap-4 mt-2'>
            <div
              className={`flex-1 p-4 border rounded-lg cursor-pointer transition-colors ${
                !formData.is_private
                  ? 'border-blue-500 bg-blue-50'
                  : 'border-gray-200 hover:border-gray-300'
              }`}
              onClick={() => updateFormData('is_private', false)}
            >
              <div className='flex items-center gap-2 mb-2'>
                <Globe className='w-5 h-5' />
                <span className='font-medium'>Public</span>
              </div>
              <p className='text-sm text-muted-foreground'>
                Anyone can find and join this group
              </p>
            </div>

            <div
              className={`flex-1 p-4 border rounded-lg cursor-pointer transition-colors ${
                formData.is_private
                  ? 'border-blue-500 bg-blue-50'
                  : 'border-gray-200 hover:border-gray-300'
              }`}
              onClick={() => updateFormData('is_private', true)}
            >
              <div className='flex items-center gap-2 mb-2'>
                <Lock className='w-5 h-5' />
                <span className='font-medium'>Private</span>
              </div>
              <p className='text-sm text-muted-foreground'>
                Only invited members can join
              </p>
            </div>
          </div>
        </div>

        <div>
          <Label htmlFor='rules'>Group Rules (Optional)</Label>
          <Textarea
            id='rules'
            value={formData.rules}
            onChange={(e) => updateFormData('rules', e.target.value)}
            placeholder='Set guidelines for group behavior and participation'
            rows={4}
          />
          <p className='text-xs text-muted-foreground mt-1'>
            Help members understand expectations and maintain a positive
            environment
          </p>
        </div>
      </div>
    </div>
  );

  const renderStep4 = () => (
    <div className='space-y-6'>
      <div>
        <h3 className='text-lg font-semibold mb-2'>Review & Create</h3>
        <p className='text-sm text-muted-foreground'>
          Review your group details before creating
        </p>
      </div>

      <Card>
        <CardHeader>
          <div className='flex items-center gap-3'>
            <div className='w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center'>
              <Users className='w-6 h-6 text-blue-600' />
            </div>
            <div>
              <CardTitle className='text-lg'>{formData.name}</CardTitle>
              <div className='flex items-center gap-2 mt-1'>
                <Badge
                  className={
                    formData.is_private
                      ? 'bg-gray-100 text-gray-800'
                      : 'bg-green-100 text-green-800'
                  }
                >
                  {formData.is_private ? (
                    <>
                      <Lock className='w-3 h-3 mr-1' />
                      Private
                    </>
                  ) : (
                    <>
                      <Globe className='w-3 h-3 mr-1' />
                      Public
                    </>
                  )}
                </Badge>
                <Badge variant='outline'>
                  {categories.find((c) => c.value === formData.category)?.label}
                </Badge>
              </div>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className='space-y-3'>
            <div>
              <h4 className='font-medium text-sm'>Description</h4>
              <p className='text-sm text-muted-foreground'>
                {formData.description}
              </p>
            </div>

            <div className='grid grid-cols-2 gap-4 text-sm'>
              <div>
                <span className='font-medium'>Subject Area:</span>
                <p className='text-muted-foreground'>{formData.subject_area}</p>
              </div>
              <div>
                <span className='font-medium'>University:</span>
                <p className='text-muted-foreground'>{formData.university}</p>
              </div>
              <div>
                <span className='font-medium'>Department:</span>
                <p className='text-muted-foreground'>
                  {formData.department || 'Not specified'}
                </p>
              </div>
              <div>
                <span className='font-medium'>Level:</span>
                <p className='text-muted-foreground'>
                  {levels.find((l) => l.value === formData.level)?.label}
                </p>
              </div>
              <div>
                <span className='font-medium'>Max Members:</span>
                <p className='text-muted-foreground'>{formData.max_members}</p>
              </div>
            </div>

            {formData.rules && (
              <div>
                <h4 className='font-medium text-sm'>Group Rules</h4>
                <p className='text-sm text-muted-foreground'>
                  {formData.rules}
                </p>
              </div>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );

  return (
    <div className='max-w-2xl mx-auto'>
      <Card>
        <CardHeader>
          <div className='flex items-center justify-between'>
            <div>
              <CardTitle>Create New Group</CardTitle>
              <p className='text-sm text-muted-foreground mt-1'>
                Step {currentStep} of 4
              </p>
            </div>
            {onCancel && (
              <Button variant='ghost' size='sm' onClick={onCancel}>
                <X className='w-4 h-4' />
              </Button>
            )}
          </div>

          {/* Progress Bar */}
          <div className='w-full bg-gray-200 rounded-full h-2 mt-4'>
            <div
              className='bg-blue-600 h-2 rounded-full transition-all duration-300'
              style={{ width: `${(currentStep / 4) * 100}%` }}
            />
          </div>
        </CardHeader>

        <CardContent className='space-y-6'>
          {currentStep === 1 && renderStep1()}
          {currentStep === 2 && renderStep2()}
          {currentStep === 3 && renderStep3()}
          {currentStep === 4 && renderStep4()}

          {/* Navigation Buttons */}
          <div className='flex justify-between pt-6 border-t'>
            <div>
              {currentStep > 1 && (
                <Button variant='outline' onClick={handlePrevious}>
                  Previous
                </Button>
              )}
            </div>

            <div className='flex gap-2'>
              {onCancel && (
                <Button variant='outline' onClick={onCancel}>
                  Cancel
                </Button>
              )}

              {currentStep < 4 ? (
                <Button onClick={handleNext}>Next</Button>
              ) : (
                <Button onClick={handleSubmit} disabled={isSubmitting}>
                  {isSubmitting ? 'Creating...' : 'Create Group'}
                </Button>
              )}
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
