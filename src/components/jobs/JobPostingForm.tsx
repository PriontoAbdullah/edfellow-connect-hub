import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import {
  Briefcase,
  MapPin,
  DollarSign,
  Calendar,
  Users,
  GraduationCap,
  Star,
  Plus,
  X,
  AlertCircle,
  CheckCircle,
  Building2,
  Clock,
  Globe,
} from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';
import { useToast } from '@/hooks/use-toast';
import { createJobPosting } from '@/lib/api/jobs';

interface JobPostingFormProps {
  onSuccess?: (job: any) => void;
  onCancel?: () => void;
}

interface JobFormData {
  title: string;
  description: string;
  company_name: string;
  company_logo: string;
  location: string;
  job_type:
    | 'full-time'
    | 'part-time'
    | 'contract'
    | 'internship'
    | 'research-assistant'
    | 'teaching-assistant';
  category:
    | 'academic'
    | 'research'
    | 'teaching'
    | 'administrative'
    | 'technical'
    | 'other';
  department: string;
  salary_min: number;
  salary_max: number;
  currency: string;
  experience_level: 'entry' | 'mid' | 'senior' | 'any';
  education_level: 'bachelor' | 'master' | 'phd' | 'any';
  skills_required: string[];
  skills_preferred: string[];
  responsibilities: string[];
  requirements: string[];
  benefits: string[];
  application_deadline: string;
  start_date: string;
  is_remote: boolean;
}

export const JobPostingForm: React.FC<JobPostingFormProps> = ({
  onSuccess,
  onCancel,
}) => {
  const { user } = useAuth();
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState<JobFormData>({
    title: '',
    description: '',
    company_name: '',
    company_logo: '',
    location: '',
    job_type: 'full-time',
    category: 'academic',
    department: '',
    salary_min: 0,
    salary_max: 0,
    currency: 'USD',
    experience_level: 'any',
    education_level: 'any',
    skills_required: [],
    skills_preferred: [],
    responsibilities: [],
    requirements: [],
    benefits: [],
    application_deadline: '',
    start_date: '',
    is_remote: false,
  });

  const [errors, setErrors] = useState<Partial<JobFormData>>({});
  const [newSkill, setNewSkill] = useState('');
  const [newResponsibility, setNewResponsibility] = useState('');
  const [newRequirement, setNewRequirement] = useState('');
  const [newBenefit, setNewBenefit] = useState('');

  const jobTypes = [
    { value: 'full-time', label: 'Full-time', icon: Briefcase },
    { value: 'part-time', label: 'Part-time', icon: Clock },
    { value: 'contract', label: 'Contract', icon: Calendar },
    { value: 'internship', label: 'Internship', icon: GraduationCap },
    { value: 'research-assistant', label: 'Research Assistant', icon: Star },
    { value: 'teaching-assistant', label: 'Teaching Assistant', icon: Users },
  ];

  const categories = [
    { value: 'academic', label: 'Academic', icon: GraduationCap },
    { value: 'research', label: 'Research', icon: Star },
    { value: 'teaching', label: 'Teaching', icon: Users },
    { value: 'administrative', label: 'Administrative', icon: Building2 },
    { value: 'technical', label: 'Technical', icon: Briefcase },
    { value: 'other', label: 'Other', icon: Globe },
  ];

  const experienceLevels = [
    { value: 'entry', label: 'Entry Level' },
    { value: 'mid', label: 'Mid Level' },
    { value: 'senior', label: 'Senior Level' },
    { value: 'any', label: 'Any Level' },
  ];

  const educationLevels = [
    { value: 'bachelor', label: "Bachelor's Degree" },
    { value: 'master', label: "Master's Degree" },
    { value: 'phd', label: 'PhD' },
    { value: 'any', label: 'Any Education' },
  ];

  const currencies = [
    { value: 'USD', label: 'USD ($)' },
    { value: 'EUR', label: 'EUR (€)' },
    { value: 'GBP', label: 'GBP (£)' },
    { value: 'CAD', label: 'CAD (C$)' },
  ];

  const validateStep = (step: number): boolean => {
    const newErrors: Partial<JobFormData> = {};

    if (step === 1) {
      if (!formData.title.trim()) {
        newErrors.title = 'Job title is required';
      }
      if (!formData.description.trim()) {
        newErrors.description = 'Job description is required';
      }
      if (!formData.company_name.trim()) {
        newErrors.company_name = 'Company name is required';
      }
      if (!formData.location.trim()) {
        newErrors.location = 'Location is required';
      }
    }

    if (step === 2) {
      if (
        formData.salary_min &&
        formData.salary_max &&
        formData.salary_min > formData.salary_max
      ) {
        newErrors.salary_min =
          'Minimum salary cannot be greater than maximum salary';
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
      const { data, error } = await createJobPosting(formData);

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
        description: 'Job posting created successfully!',
      });

      onSuccess?.(data);
    } catch (error) {
      toast({
        title: 'Error',
        description: 'Failed to create job posting',
        variant: 'destructive',
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const updateFormData = (field: keyof JobFormData, value: any) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors((prev) => ({ ...prev, [field]: undefined }));
    }
  };

  const addToList = (
    field:
      | 'skills_required'
      | 'skills_preferred'
      | 'responsibilities'
      | 'requirements'
      | 'benefits',
    value: string
  ) => {
    if (value.trim()) {
      updateFormData(field, [...formData[field], value.trim()]);
      setNewSkill('');
      setNewResponsibility('');
      setNewRequirement('');
      setNewBenefit('');
    }
  };

  const removeFromList = (
    field:
      | 'skills_required'
      | 'skills_preferred'
      | 'responsibilities'
      | 'requirements'
      | 'benefits',
    index: number
  ) => {
    updateFormData(
      field,
      formData[field].filter((_, i) => i !== index)
    );
  };

  const renderStep1 = () => (
    <div className='space-y-6'>
      <div>
        <h3 className='text-lg font-semibold mb-2'>Basic Job Information</h3>
        <p className='text-sm text-muted-foreground'>
          Provide the essential details for your job posting
        </p>
      </div>

      <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
        <div>
          <Label htmlFor='title'>Job Title *</Label>
          <Input
            id='title'
            value={formData.title}
            onChange={(e) => updateFormData('title', e.target.value)}
            placeholder='e.g., Research Assistant, Teaching Fellow'
            className={errors.title ? 'border-red-500' : ''}
          />
          {errors.title && (
            <p className='text-sm text-red-500 mt-1'>{errors.title}</p>
          )}
        </div>

        <div>
          <Label htmlFor='company_name'>Institution/Company *</Label>
          <Input
            id='company_name'
            value={formData.company_name}
            onChange={(e) => updateFormData('company_name', e.target.value)}
            placeholder='e.g., MIT, Stanford University'
            className={errors.company_name ? 'border-red-500' : ''}
          />
          {errors.company_name && (
            <p className='text-sm text-red-500 mt-1'>{errors.company_name}</p>
          )}
        </div>

        <div>
          <Label htmlFor='location'>Location *</Label>
          <Input
            id='location'
            value={formData.location}
            onChange={(e) => updateFormData('location', e.target.value)}
            placeholder='e.g., Cambridge, MA'
            className={errors.location ? 'border-red-500' : ''}
          />
          {errors.location && (
            <p className='text-sm text-red-500 mt-1'>{errors.location}</p>
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
      </div>

      <div>
        <Label htmlFor='description'>Job Description *</Label>
        <Textarea
          id='description'
          value={formData.description}
          onChange={(e) => updateFormData('description', e.target.value)}
          placeholder='Describe the role, responsibilities, and what makes this opportunity unique...'
          rows={6}
          className={errors.description ? 'border-red-500' : ''}
        />
        {errors.description && (
          <p className='text-sm text-red-500 mt-1'>{errors.description}</p>
        )}
      </div>

      <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
        <div>
          <Label>Job Type</Label>
          <div className='grid grid-cols-2 gap-2 mt-2'>
            {jobTypes.map((type) => {
              const Icon = type.icon;
              return (
                <div
                  key={type.value}
                  className={`p-3 border rounded-lg cursor-pointer transition-colors ${
                    formData.job_type === type.value
                      ? 'border-blue-500 bg-blue-50'
                      : 'border-gray-200 hover:border-gray-300'
                  }`}
                  onClick={() => updateFormData('job_type', type.value)}
                >
                  <div className='flex items-center gap-2'>
                    <Icon className='w-4 h-4' />
                    <span className='text-sm font-medium'>{type.label}</span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        <div>
          <Label>Category</Label>
          <div className='grid grid-cols-2 gap-2 mt-2'>
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
                  <div className='flex items-center gap-2'>
                    <Icon className='w-4 h-4' />
                    <span className='text-sm font-medium'>
                      {category.label}
                    </span>
                  </div>
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
        <h3 className='text-lg font-semibold mb-2'>
          Compensation & Requirements
        </h3>
        <p className='text-sm text-muted-foreground'>
          Set salary expectations and define the requirements
        </p>
      </div>

      <div className='grid grid-cols-1 md:grid-cols-3 gap-4'>
        <div>
          <Label htmlFor='salary_min'>Minimum Salary</Label>
          <Input
            id='salary_min'
            type='number'
            value={formData.salary_min || ''}
            onChange={(e) =>
              updateFormData('salary_min', parseInt(e.target.value) || 0)
            }
            placeholder='50000'
            className={errors.salary_min ? 'border-red-500' : ''}
          />
          {errors.salary_min && (
            <p className='text-sm text-red-500 mt-1'>{errors.salary_min}</p>
          )}
        </div>

        <div>
          <Label htmlFor='salary_max'>Maximum Salary</Label>
          <Input
            id='salary_max'
            type='number'
            value={formData.salary_max || ''}
            onChange={(e) =>
              updateFormData('salary_max', parseInt(e.target.value) || 0)
            }
            placeholder='80000'
          />
        </div>

        <div>
          <Label htmlFor='currency'>Currency</Label>
          <select
            id='currency'
            value={formData.currency}
            onChange={(e) => updateFormData('currency', e.target.value)}
            className='w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500'
          >
            {currencies.map((currency) => (
              <option key={currency.value} value={currency.value}>
                {currency.label}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
        <div>
          <Label htmlFor='experience_level'>Experience Level</Label>
          <select
            id='experience_level'
            value={formData.experience_level}
            onChange={(e) => updateFormData('experience_level', e.target.value)}
            className='w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500'
          >
            {experienceLevels.map((level) => (
              <option key={level.value} value={level.value}>
                {level.label}
              </option>
            ))}
          </select>
        </div>

        <div>
          <Label htmlFor='education_level'>Education Level</Label>
          <select
            id='education_level'
            value={formData.education_level}
            onChange={(e) => updateFormData('education_level', e.target.value)}
            className='w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500'
          >
            {educationLevels.map((level) => (
              <option key={level.value} value={level.value}>
                {level.label}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div>
        <Label>Remote Work</Label>
        <div className='flex items-center gap-2 mt-2'>
          <input
            type='checkbox'
            id='is_remote'
            checked={formData.is_remote}
            onChange={(e) => updateFormData('is_remote', e.target.checked)}
            className='rounded'
          />
          <label htmlFor='is_remote' className='text-sm'>
            This position allows remote work
          </label>
        </div>
      </div>

      <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
        <div>
          <Label htmlFor='application_deadline'>Application Deadline</Label>
          <Input
            id='application_deadline'
            type='date'
            value={formData.application_deadline}
            onChange={(e) =>
              updateFormData('application_deadline', e.target.value)
            }
          />
        </div>

        <div>
          <Label htmlFor='start_date'>Expected Start Date</Label>
          <Input
            id='start_date'
            type='date'
            value={formData.start_date}
            onChange={(e) => updateFormData('start_date', e.target.value)}
          />
        </div>
      </div>
    </div>
  );

  const renderStep3 = () => (
    <div className='space-y-6'>
      <div>
        <h3 className='text-lg font-semibold mb-2'>Skills & Requirements</h3>
        <p className='text-sm text-muted-foreground'>
          Define the skills, responsibilities, and requirements for this
          position
        </p>
      </div>

      <div className='space-y-4'>
        <div>
          <Label>Required Skills</Label>
          <div className='flex gap-2 mt-2'>
            <Input
              value={newSkill}
              onChange={(e) => setNewSkill(e.target.value)}
              placeholder='Add required skill'
              onKeyPress={(e) =>
                e.key === 'Enter' && addToList('skills_required', newSkill)
              }
            />
            <Button
              type='button'
              onClick={() => addToList('skills_required', newSkill)}
              disabled={!newSkill.trim()}
            >
              <Plus className='w-4 h-4' />
            </Button>
          </div>
          <div className='flex flex-wrap gap-2 mt-2'>
            {formData.skills_required.map((skill, index) => (
              <Badge
                key={index}
                variant='default'
                className='cursor-pointer'
                onClick={() => removeFromList('skills_required', index)}
              >
                {skill}
                <X className='w-3 h-3 ml-1' />
              </Badge>
            ))}
          </div>
        </div>

        <div>
          <Label>Preferred Skills</Label>
          <div className='flex gap-2 mt-2'>
            <Input
              value={newSkill}
              onChange={(e) => setNewSkill(e.target.value)}
              placeholder='Add preferred skill'
              onKeyPress={(e) =>
                e.key === 'Enter' && addToList('skills_preferred', newSkill)
              }
            />
            <Button
              type='button'
              onClick={() => addToList('skills_preferred', newSkill)}
              disabled={!newSkill.trim()}
            >
              <Plus className='w-4 h-4' />
            </Button>
          </div>
          <div className='flex flex-wrap gap-2 mt-2'>
            {formData.skills_preferred.map((skill, index) => (
              <Badge
                key={index}
                variant='outline'
                className='cursor-pointer'
                onClick={() => removeFromList('skills_preferred', index)}
              >
                {skill}
                <X className='w-3 h-3 ml-1' />
              </Badge>
            ))}
          </div>
        </div>

        <div>
          <Label>Key Responsibilities</Label>
          <div className='flex gap-2 mt-2'>
            <Input
              value={newResponsibility}
              onChange={(e) => setNewResponsibility(e.target.value)}
              placeholder='Add responsibility'
              onKeyPress={(e) =>
                e.key === 'Enter' &&
                addToList('responsibilities', newResponsibility)
              }
            />
            <Button
              type='button'
              onClick={() => addToList('responsibilities', newResponsibility)}
              disabled={!newResponsibility.trim()}
            >
              <Plus className='w-4 h-4' />
            </Button>
          </div>
          <ul className='list-disc list-inside mt-2 space-y-1'>
            {formData.responsibilities.map((responsibility, index) => (
              <li key={index} className='text-sm flex items-center gap-2'>
                <span>{responsibility}</span>
                <Button
                  type='button'
                  variant='ghost'
                  size='sm'
                  onClick={() => removeFromList('responsibilities', index)}
                >
                  <X className='w-3 h-3' />
                </Button>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <Label>Requirements</Label>
          <div className='flex gap-2 mt-2'>
            <Input
              value={newRequirement}
              onChange={(e) => setNewRequirement(e.target.value)}
              placeholder='Add requirement'
              onKeyPress={(e) =>
                e.key === 'Enter' && addToList('requirements', newRequirement)
              }
            />
            <Button
              type='button'
              onClick={() => addToList('requirements', newRequirement)}
              disabled={!newRequirement.trim()}
            >
              <Plus className='w-4 h-4' />
            </Button>
          </div>
          <ul className='list-disc list-inside mt-2 space-y-1'>
            {formData.requirements.map((requirement, index) => (
              <li key={index} className='text-sm flex items-center gap-2'>
                <span>{requirement}</span>
                <Button
                  type='button'
                  variant='ghost'
                  size='sm'
                  onClick={() => removeFromList('requirements', index)}
                >
                  <X className='w-3 h-3' />
                </Button>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <Label>Benefits & Perks</Label>
          <div className='flex gap-2 mt-2'>
            <Input
              value={newBenefit}
              onChange={(e) => setNewBenefit(e.target.value)}
              placeholder='Add benefit'
              onKeyPress={(e) =>
                e.key === 'Enter' && addToList('benefits', newBenefit)
              }
            />
            <Button
              type='button'
              onClick={() => addToList('benefits', newBenefit)}
              disabled={!newBenefit.trim()}
            >
              <Plus className='w-4 h-4' />
            </Button>
          </div>
          <ul className='list-disc list-inside mt-2 space-y-1'>
            {formData.benefits.map((benefit, index) => (
              <li key={index} className='text-sm flex items-center gap-2'>
                <span>{benefit}</span>
                <Button
                  type='button'
                  variant='ghost'
                  size='sm'
                  onClick={() => removeFromList('benefits', index)}
                >
                  <X className='w-3 h-3' />
                </Button>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );

  const renderStep4 = () => (
    <div className='space-y-6'>
      <div>
        <h3 className='text-lg font-semibold mb-2'>Review & Publish</h3>
        <p className='text-sm text-muted-foreground'>
          Review your job posting before publishing
        </p>
      </div>

      <Card>
        <CardHeader>
          <div className='flex items-start gap-3'>
            <div className='w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center'>
              <Briefcase className='w-6 h-6 text-blue-600' />
            </div>
            <div>
              <CardTitle className='text-lg'>{formData.title}</CardTitle>
              <div className='flex items-center gap-2 mt-1'>
                <Badge variant='outline'>{formData.company_name}</Badge>
                <Badge variant='outline'>
                  {formData.job_type.replace('-', ' ')}
                </Badge>
                <Badge variant='outline'>{formData.category}</Badge>
              </div>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className='space-y-4'>
            <div>
              <h4 className='font-medium text-sm'>Description</h4>
              <p className='text-sm text-muted-foreground'>
                {formData.description}
              </p>
            </div>

            <div className='grid grid-cols-2 gap-4 text-sm'>
              <div>
                <span className='font-medium'>Location:</span>
                <p className='text-muted-foreground'>{formData.location}</p>
              </div>
              <div>
                <span className='font-medium'>Department:</span>
                <p className='text-muted-foreground'>
                  {formData.department || 'Not specified'}
                </p>
              </div>
              <div>
                <span className='font-medium'>Experience Level:</span>
                <p className='text-muted-foreground'>
                  {
                    experienceLevels.find(
                      (l) => l.value === formData.experience_level
                    )?.label
                  }
                </p>
              </div>
              <div>
                <span className='font-medium'>Education Level:</span>
                <p className='text-muted-foreground'>
                  {
                    educationLevels.find(
                      (l) => l.value === formData.education_level
                    )?.label
                  }
                </p>
              </div>
              <div>
                <span className='font-medium'>Salary Range:</span>
                <p className='text-muted-foreground'>
                  {formData.salary_min && formData.salary_max
                    ? `${
                        formData.currency
                      } ${formData.salary_min.toLocaleString()} - ${formData.salary_max.toLocaleString()}`
                    : 'Not specified'}
                </p>
              </div>
              <div>
                <span className='font-medium'>Remote Work:</span>
                <p className='text-muted-foreground'>
                  {formData.is_remote ? 'Yes' : 'No'}
                </p>
              </div>
            </div>

            {formData.skills_required.length > 0 && (
              <div>
                <h4 className='font-medium text-sm'>Required Skills</h4>
                <div className='flex flex-wrap gap-1 mt-1'>
                  {formData.skills_required.map((skill, index) => (
                    <Badge key={index} variant='default' className='text-xs'>
                      {skill}
                    </Badge>
                  ))}
                </div>
              </div>
            )}

            {formData.responsibilities.length > 0 && (
              <div>
                <h4 className='font-medium text-sm'>Key Responsibilities</h4>
                <ul className='list-disc list-inside mt-1 space-y-1'>
                  {formData.responsibilities.map((responsibility, index) => (
                    <li key={index} className='text-sm text-muted-foreground'>
                      {responsibility}
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );

  return (
    <div className='max-w-4xl mx-auto'>
      <Card>
        <CardHeader>
          <div className='flex items-center justify-between'>
            <div>
              <CardTitle>Create Job Posting</CardTitle>
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
                  {isSubmitting ? 'Creating...' : 'Create Job Posting'}
                </Button>
              )}
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
