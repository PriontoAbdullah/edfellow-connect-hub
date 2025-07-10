import { useEffect, useState } from 'react';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { useToast } from '@/hooks/use-toast';
import { Breadcrumb } from '../../dashboard/Breadcrumb';
import {
  Send,
  Upload,
  Calendar,
  DollarSign,
  Globe,
  BookOpen,
  Users,
  Clock,
  FileText,
  Plus,
  X,
} from 'lucide-react';

const UniversitySubmitProgram = () => {
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    programName: '',
    programType: '',
    duration: '',
    fees: '',
    description: '',
    requirements: '',
    applicationDeadline: '',
    startDate: '',
    language: '',
    format: '',
    subjects: [] as string[],
    scholarships: false,
  });

  // Scroll to top on component mount
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);

  const [currentSubject, setCurrentSubject] = useState('');

  const addSubject = () => {
    if (
      currentSubject.trim() &&
      !formData.subjects.includes(currentSubject.trim())
    ) {
      setFormData((prev) => ({
        ...prev,
        subjects: [...prev.subjects, currentSubject.trim()],
      }));
      setCurrentSubject('');
    }
  };

  const removeSubject = (subject: string) => {
    setFormData((prev) => ({
      ...prev,
      subjects: prev.subjects.filter((s) => s !== subject),
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast({
      title: 'Program Submitted Successfully!',
      description:
        'Your program has been submitted for review and will be published soon.',
    });
  };

  return (
    <div className='min-h-screen bg-gradient-to-br from-orange-50/30 via-white to-orange-100/20'>
      <div className='p-6 space-y-6'>
        <Breadcrumb
          items={[
            { label: 'Dashboard', href: '/dashboard' },
            { label: 'Submit Program' },
          ]}
        />

        <div className='max-w-4xl mx-auto'>
          <Card className='shadow-lg'>
            <CardHeader className='bg-gradient-to-r from-orange-500 to-red-600 text-white rounded-t-lg'>
              <CardTitle className='flex items-center gap-2 text-2xl'>
                <Send className='h-6 w-6' />
                Submit New Academic Program
              </CardTitle>
              <CardDescription className='text-orange-100'>
                Add your educational program to reach students worldwide
              </CardDescription>
            </CardHeader>

            <CardContent className='p-8'>
              <form onSubmit={handleSubmit} className='space-y-8'>
                {/* Basic Information */}
                <div className='space-y-6'>
                  <h3 className='text-xl font-semibold text-gray-900 flex items-center gap-2'>
                    <BookOpen className='h-5 w-5 text-orange-500' />
                    Basic Information
                  </h3>

                  <div className='grid md:grid-cols-2 gap-6'>
                    <div className='space-y-2'>
                      <Label htmlFor='programName'>Program Name *</Label>
                      <Input
                        id='programName'
                        value={formData.programName}
                        onChange={(e) =>
                          setFormData((prev) => ({
                            ...prev,
                            programName: e.target.value,
                          }))
                        }
                        placeholder='e.g., Master of Computer Science'
                        required
                      />
                    </div>

                    <div className='space-y-2'>
                      <Label htmlFor='programType'>Program Type *</Label>
                      <Select
                        value={formData.programType}
                        onValueChange={(value) =>
                          setFormData((prev) => ({
                            ...prev,
                            programType: value,
                          }))
                        }
                      >
                        <SelectTrigger>
                          <SelectValue placeholder='Select program type' />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value='bachelor'>
                            Bachelor's Degree
                          </SelectItem>
                          <SelectItem value='master'>
                            Master's Degree
                          </SelectItem>
                          <SelectItem value='phd'>PhD Program</SelectItem>
                          <SelectItem value='certificate'>
                            Certificate Program
                          </SelectItem>
                          <SelectItem value='diploma'>
                            Diploma Program
                          </SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>

                  <div className='grid md:grid-cols-3 gap-6'>
                    <div className='space-y-2'>
                      <Label htmlFor='duration'>Duration *</Label>
                      <Input
                        id='duration'
                        value={formData.duration}
                        onChange={(e) =>
                          setFormData((prev) => ({
                            ...prev,
                            duration: e.target.value,
                          }))
                        }
                        placeholder='e.g., 2 years'
                        required
                      />
                    </div>

                    <div className='space-y-2'>
                      <Label htmlFor='fees'>Annual Fees (USD) *</Label>
                      <Input
                        id='fees'
                        type='number'
                        value={formData.fees}
                        onChange={(e) =>
                          setFormData((prev) => ({
                            ...prev,
                            fees: e.target.value,
                          }))
                        }
                        placeholder='25000'
                        required
                      />
                    </div>

                    <div className='space-y-2'>
                      <Label htmlFor='language'>Language *</Label>
                      <Select
                        value={formData.language}
                        onValueChange={(value) =>
                          setFormData((prev) => ({ ...prev, language: value }))
                        }
                      >
                        <SelectTrigger>
                          <SelectValue placeholder='Select language' />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value='english'>English</SelectItem>
                          <SelectItem value='spanish'>Spanish</SelectItem>
                          <SelectItem value='french'>French</SelectItem>
                          <SelectItem value='german'>German</SelectItem>
                          <SelectItem value='other'>Other</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                </div>

                {/* Program Details */}
                <div className='space-y-6'>
                  <h3 className='text-xl font-semibold text-gray-900 flex items-center gap-2'>
                    <FileText className='h-5 w-5 text-orange-500' />
                    Program Details
                  </h3>

                  <div className='space-y-2'>
                    <Label htmlFor='description'>Program Description *</Label>
                    <Textarea
                      id='description'
                      value={formData.description}
                      onChange={(e) =>
                        setFormData((prev) => ({
                          ...prev,
                          description: e.target.value,
                        }))
                      }
                      placeholder='Describe your program, curriculum, career prospects...'
                      rows={4}
                      required
                    />
                  </div>

                  <div className='space-y-2'>
                    <Label htmlFor='requirements'>
                      Admission Requirements *
                    </Label>
                    <Textarea
                      id='requirements'
                      value={formData.requirements}
                      onChange={(e) =>
                        setFormData((prev) => ({
                          ...prev,
                          requirements: e.target.value,
                        }))
                      }
                      placeholder='List admission requirements, prerequisites, documents needed...'
                      rows={3}
                      required
                    />
                  </div>

                  <div className='space-y-4'>
                    <Label>Subject Areas</Label>
                    <div className='flex gap-2'>
                      <Input
                        value={currentSubject}
                        onChange={(e) => setCurrentSubject(e.target.value)}
                        placeholder='Add subject area'
                        onKeyPress={(e) =>
                          e.key === 'Enter' &&
                          (e.preventDefault(), addSubject())
                        }
                      />
                      <Button
                        type='button'
                        onClick={addSubject}
                        variant='outline'
                      >
                        <Plus className='h-4 w-4' />
                      </Button>
                    </div>
                    <div className='flex flex-wrap gap-2'>
                      {formData.subjects.map((subject) => (
                        <Badge
                          key={subject}
                          variant='secondary'
                          className='flex items-center gap-1'
                        >
                          {subject}
                          <X
                            className='h-3 w-3 cursor-pointer'
                            onClick={() => removeSubject(subject)}
                          />
                        </Badge>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Important Dates */}
                <div className='space-y-6'>
                  <h3 className='text-xl font-semibold text-gray-900 flex items-center gap-2'>
                    <Calendar className='h-5 w-5 text-orange-500' />
                    Important Dates
                  </h3>

                  <div className='grid md:grid-cols-2 gap-6'>
                    <div className='space-y-2'>
                      <Label htmlFor='applicationDeadline'>
                        Application Deadline *
                      </Label>
                      <Input
                        id='applicationDeadline'
                        type='date'
                        value={formData.applicationDeadline}
                        onChange={(e) =>
                          setFormData((prev) => ({
                            ...prev,
                            applicationDeadline: e.target.value,
                          }))
                        }
                        required
                      />
                    </div>

                    <div className='space-y-2'>
                      <Label htmlFor='startDate'>Program Start Date *</Label>
                      <Input
                        id='startDate'
                        type='date'
                        value={formData.startDate}
                        onChange={(e) =>
                          setFormData((prev) => ({
                            ...prev,
                            startDate: e.target.value,
                          }))
                        }
                        required
                      />
                    </div>
                  </div>
                </div>

                {/* Additional Options */}
                <div className='space-y-6'>
                  <h3 className='text-xl font-semibold text-gray-900 flex items-center gap-2'>
                    <Globe className='h-5 w-5 text-orange-500' />
                    Additional Options
                  </h3>

                  <div className='grid md:grid-cols-2 gap-6'>
                    <div className='space-y-2'>
                      <Label htmlFor='format'>Study Format *</Label>
                      <Select
                        value={formData.format}
                        onValueChange={(value) =>
                          setFormData((prev) => ({ ...prev, format: value }))
                        }
                      >
                        <SelectTrigger>
                          <SelectValue placeholder='Select format' />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value='on-campus'>On-Campus</SelectItem>
                          <SelectItem value='online'>Online</SelectItem>
                          <SelectItem value='hybrid'>Hybrid</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <div className='flex items-center space-x-2 pt-8'>
                      <input
                        type='checkbox'
                        id='scholarships'
                        checked={formData.scholarships}
                        onChange={(e) =>
                          setFormData((prev) => ({
                            ...prev,
                            scholarships: e.target.checked,
                          }))
                        }
                        className='rounded'
                      />
                      <Label htmlFor='scholarships'>
                        Scholarships Available
                      </Label>
                    </div>
                  </div>
                </div>

                {/* Submit Button */}
                <div className='flex justify-end space-x-4 pt-6 border-t'>
                  <Button type='button' variant='outline'>
                    Save as Draft
                  </Button>
                  <Button
                    type='submit'
                    className='bg-orange-600 hover:bg-orange-700'
                  >
                    <Send className='h-4 w-4 mr-2' />
                    Submit Program
                  </Button>
                </div>
              </form>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default UniversitySubmitProgram;
