import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import {
  User,
  GraduationCap,
  Briefcase,
  Award,
  CheckCircle,
  ArrowRight,
} from 'lucide-react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useToast } from '@/hooks/use-toast';
import ForumAutoJoin from '@/components/ForumAutoJoin';

interface ProfileData {
  firstName: string;
  lastName: string;
  email: string;
  country: string;
  bio: string;
  institution: string;
  department: string;
  academicInterests: string[];
  skills: string[];
  languages: string[];
  experience: string;
  mentorshipInterests: string[];
}

const CompleteProfile = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { toast } = useToast();
  const [currentStep, setCurrentStep] = useState(1);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [profileComplete, setProfileComplete] = useState(false);
  const [showForumModal, setShowForumModal] = useState(false);
  const [updatedUser, setUpdatedUser] = useState<any>(null);

  const [user, setUser] = useState(() => {
    const locationState = location.state as any;
    return (
      locationState?.user || { name: 'New User', role: 'student', email: '' }
    );
  });

  const [profileData, setProfileData] = useState<ProfileData>(() => {
    const locationState = location.state as any;
    const registrationData = locationState?.user?.registrationData;

    return {
      firstName: registrationData?.firstName || '',
      lastName: registrationData?.lastName || '',
      email: registrationData?.email || user.email || '',
      country: registrationData?.country || '',
      bio: '',
      institution:
        registrationData?.institutionAffiliation ||
        registrationData?.universityName ||
        '',
      department: registrationData?.department || '',
      academicInterests:
        registrationData?.areasOfInterest ||
        registrationData?.researchInterests ||
        [],
      skills: [],
      languages: [],
      experience: '',
      mentorshipInterests: [],
    };
  });

  const totalSteps = 4;

  const academicInterests = [
    'Computer Science',
    'Engineering',
    'Medical Sciences',
    'Economics',
    'Business Administration',
    'Mathematics',
    'Physics',
    'Chemistry',
    'Biology',
    'Psychology',
    'Art & Design',
    'Literature',
    'History',
    'Philosophy',
    'Data Science',
    'Artificial Intelligence',
    'Machine Learning',
    'Cybersecurity',
    'Robotics',
    'Biotechnology',
  ];

  const skills = [
    'Python',
    'JavaScript',
    'Java',
    'C++',
    'React',
    'Node.js',
    'Angular',
    'Vue.js',
    'Django',
    'Flask',
    'Express.js',
    'MongoDB',
    'PostgreSQL',
    'MySQL',
    'AWS',
    'Docker',
    'Kubernetes',
    'Git',
    'Linux',
    'TensorFlow',
    'PyTorch',
    'Scikit-learn',
    'Pandas',
    'NumPy',
    'Matplotlib',
  ];

  const languages = [
    'English',
    'Spanish',
    'French',
    'German',
    'Italian',
    'Portuguese',
    'Russian',
    'Chinese (Mandarin)',
    'Chinese (Cantonese)',
    'Japanese',
    'Korean',
    'Arabic',
    'Hindi',
    'Bengali',
    'Urdu',
    'Turkish',
  ];

  const mentorshipInterests = [
    'Academic Guidance',
    'Career Planning',
    'Research Collaboration',
    'Technical Skills',
    'Leadership Development',
    'Networking',
    'Industry Insights',
    'Publication Support',
    'Grant Writing',
    'Conference Preparation',
    'Interview Preparation',
    'Project Management',
  ];

  const handleInterestToggle = (interest: string, field: keyof ProfileData) => {
    setProfileData((prev) => ({
      ...prev,
      [field]: (prev[field] as string[]).includes(interest)
        ? (prev[field] as string[]).filter((i) => i !== interest)
        : [...(prev[field] as string[]), interest],
    }));
  };

  const calculateProgress = () => {
    let completed = 0;
    let total = 0;

    if (profileData.firstName) completed++;
    if (profileData.lastName) completed++;
    if (profileData.email) completed++;
    if (profileData.country) completed++;
    if (profileData.bio) completed++;
    total += 5;

    if (profileData.institution) completed++;
    if (profileData.department) completed++;
    if (profileData.academicInterests.length > 0) completed++;
    total += 3;

    if (profileData.skills.length > 0) completed++;
    if (profileData.languages.length > 0) completed++;
    if (profileData.experience) completed++;
    total += 3;

    if (profileData.mentorshipInterests.length > 0) completed++;
    total += 1;

    return Math.round((completed / total) * 100);
  };

  const canProceedToNext = () => {
    switch (currentStep) {
      case 1:
        return (
          profileData.firstName &&
          profileData.lastName &&
          profileData.email &&
          profileData.country &&
          profileData.bio
        );
      case 2:
        return (
          profileData.institution &&
          profileData.department &&
          profileData.academicInterests.length > 0
        );
      case 3:
        return (
          profileData.skills.length > 0 &&
          profileData.languages.length > 0 &&
          profileData.experience
        );
      case 4:
        return profileData.mentorshipInterests.length > 0;
      default:
        return false;
    }
  };

  const handleSubmit = async () => {
    setIsSubmitting(true);

    try {
      await new Promise((resolve) => setTimeout(resolve, 2000));

      const updatedUser = {
        ...user,
        name: `${profileData.firstName} ${profileData.lastName}`,
        profileComplete: true,
        profileData,
      };

      localStorage.setItem('edfellow_user', JSON.stringify(updatedUser));
      setUpdatedUser(updatedUser);

      toast({
        title: 'Profile Completed!',
        description: 'Your profile has been successfully completed.',
      });

      setProfileComplete(true);

      // Show forum auto-join modal after profile completion
      setTimeout(() => {
        setShowForumModal(true);
      }, 1500);

      // Fallback navigation to dashboard after 5 seconds if modal doesn't show
      setTimeout(() => {
        if (!showForumModal) {
          navigate('/dashboard', { state: { user: updatedUser } });
        }
      }, 5000);
    } catch (error) {
      toast({
        title: 'Error',
        description: 'Failed to save profile. Please try again.',
        variant: 'destructive',
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const getStepTitle = (step: number) => {
    switch (step) {
      case 1:
        return 'Basic Information';
      case 2:
        return 'Academic Background';
      case 3:
        return 'Professional Details';
      case 4:
        return 'Preferences & Interests';
      default:
        return '';
    }
  };

  const renderStep1 = () => (
    <Card className='max-w-2xl mx-auto shadow-2xl border-0 bg-white/95 backdrop-blur-sm rounded-2xl'>
      <CardHeader className='text-center pb-8'>
        <div className='w-16 h-16 mx-auto mb-4 rounded-full bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center shadow-lg'>
          <User className='h-8 w-8 text-white' />
        </div>
        <CardTitle className='text-3xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent'>
          Basic Information
        </CardTitle>
        <CardDescription className='text-lg text-gray-600 mt-2'>
          Tell us about yourself
        </CardDescription>
      </CardHeader>
      <CardContent className='px-8 pb-8'>
        <form className='space-y-6'>
          <div className='grid md:grid-cols-2 gap-4'>
            <div>
              <Label htmlFor='firstName'>First Name *</Label>
              <Input
                id='firstName'
                value={profileData.firstName}
                onChange={(e) =>
                  setProfileData((prev) => ({
                    ...prev,
                    firstName: e.target.value,
                  }))
                }
                required
                className='border-gray-200 focus:border-[#007BFF] focus:ring-[#007BFF]'
              />
            </div>
            <div>
              <Label htmlFor='lastName'>Last Name *</Label>
              <Input
                id='lastName'
                value={profileData.lastName}
                onChange={(e) =>
                  setProfileData((prev) => ({
                    ...prev,
                    lastName: e.target.value,
                  }))
                }
                required
                className='border-gray-200 focus:border-[#007BFF] focus:ring-[#007BFF]'
              />
            </div>
          </div>

          <div>
            <Label htmlFor='email'>Email Address *</Label>
            <Input
              id='email'
              type='email'
              value={profileData.email}
              onChange={(e) =>
                setProfileData((prev) => ({ ...prev, email: e.target.value }))
              }
              required
              className='border-gray-200 focus:border-[#007BFF] focus:ring-[#007BFF]'
            />
          </div>

          <div>
            <Label htmlFor='country'>Country/Region *</Label>
            <Input
              id='country'
              value={profileData.country}
              onChange={(e) =>
                setProfileData((prev) => ({ ...prev, country: e.target.value }))
              }
              required
              className='border-gray-200 focus:border-[#007BFF] focus:ring-[#007BFF]'
            />
          </div>

          <div>
            <Label htmlFor='bio'>Bio/About Me *</Label>
            <Textarea
              id='bio'
              value={profileData.bio}
              onChange={(e) =>
                setProfileData((prev) => ({ ...prev, bio: e.target.value }))
              }
              placeholder="Tell us about yourself, your interests, and what you're looking for..."
              className='border-gray-200 focus:border-[#007BFF] focus:ring-[#007BFF] min-h-[100px]'
              required
            />
          </div>
        </form>
      </CardContent>
    </Card>
  );

  const renderStep2 = () => (
    <Card className='max-w-2xl mx-auto shadow-2xl border-0 bg-white/95 backdrop-blur-sm rounded-2xl'>
      <CardHeader className='text-center pb-8'>
        <div className='w-16 h-16 mx-auto mb-4 rounded-full bg-gradient-to-br from-green-500 to-emerald-600 flex items-center justify-center shadow-lg'>
          <GraduationCap className='h-8 w-8 text-white' />
        </div>
        <CardTitle className='text-3xl font-bold bg-gradient-to-r from-green-600 to-emerald-600 bg-clip-text text-transparent'>
          Academic Background
        </CardTitle>
        <CardDescription className='text-lg text-gray-600 mt-2'>
          Share your academic information
        </CardDescription>
      </CardHeader>
      <CardContent className='px-8 pb-8'>
        <form className='space-y-6'>
          <div>
            <Label htmlFor='institution'>Institution/University *</Label>
            <Input
              id='institution'
              value={profileData.institution}
              onChange={(e) =>
                setProfileData((prev) => ({
                  ...prev,
                  institution: e.target.value,
                }))
              }
              required
              className='border-gray-200 focus:border-[#007BFF] focus:ring-[#007BFF]'
            />
          </div>

          <div>
            <Label htmlFor='department'>Department/Field *</Label>
            <Input
              id='department'
              value={profileData.department}
              onChange={(e) =>
                setProfileData((prev) => ({
                  ...prev,
                  department: e.target.value,
                }))
              }
              required
              className='border-gray-200 focus:border-[#007BFF] focus:ring-[#007BFF]'
            />
          </div>

          <div>
            <Label className='text-base font-semibold text-gray-700 mb-3 block'>
              Academic Interests *
            </Label>
            <div className='flex flex-wrap gap-2'>
              {academicInterests.map((interest) => (
                <Badge
                  key={interest}
                  variant={
                    profileData.academicInterests.includes(interest)
                      ? 'default'
                      : 'outline'
                  }
                  className={`cursor-pointer px-3 py-1 text-sm transition-all duration-200 hover:scale-105 ${
                    profileData.academicInterests.includes(interest)
                      ? 'bg-gradient-to-r from-green-500 to-emerald-600 text-white'
                      : 'border-gray-300 hover:border-green-400 text-gray-700 hover:text-green-600'
                  }`}
                  onClick={() =>
                    handleInterestToggle(interest, 'academicInterests')
                  }
                >
                  {interest}
                </Badge>
              ))}
            </div>
          </div>
        </form>
      </CardContent>
    </Card>
  );

  const renderStep3 = () => (
    <Card className='max-w-2xl mx-auto shadow-2xl border-0 bg-white/95 backdrop-blur-sm rounded-2xl'>
      <CardHeader className='text-center pb-8'>
        <div className='w-16 h-16 mx-auto mb-4 rounded-full bg-gradient-to-br from-purple-500 to-pink-600 flex items-center justify-center shadow-lg'>
          <Briefcase className='h-8 w-8 text-white' />
        </div>
        <CardTitle className='text-3xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent'>
          Professional Details
        </CardTitle>
        <CardDescription className='text-lg text-gray-600 mt-2'>
          Share your professional experience and skills
        </CardDescription>
      </CardHeader>
      <CardContent className='px-8 pb-8'>
        <form className='space-y-6'>
          <div>
            <Label htmlFor='experience'>Professional Experience *</Label>
            <Textarea
              id='experience'
              value={profileData.experience}
              onChange={(e) =>
                setProfileData((prev) => ({
                  ...prev,
                  experience: e.target.value,
                }))
              }
              placeholder='Describe your professional experience, projects, and achievements...'
              className='border-gray-200 focus:border-[#007BFF] focus:ring-[#007BFF] min-h-[100px]'
              required
            />
          </div>

          <div>
            <Label className='text-base font-semibold text-gray-700 mb-3 block'>
              Skills & Technologies *
            </Label>
            <div className='flex flex-wrap gap-2'>
              {skills.map((skill) => (
                <Badge
                  key={skill}
                  variant={
                    profileData.skills.includes(skill) ? 'default' : 'outline'
                  }
                  className={`cursor-pointer px-3 py-1 text-sm transition-all duration-200 hover:scale-105 ${
                    profileData.skills.includes(skill)
                      ? 'bg-gradient-to-r from-purple-500 to-pink-600 text-white'
                      : 'border-gray-300 hover:border-purple-400 text-gray-700 hover:text-purple-600'
                  }`}
                  onClick={() => handleInterestToggle(skill, 'skills')}
                >
                  {skill}
                </Badge>
              ))}
            </div>
          </div>

          <div>
            <Label className='text-base font-semibold text-gray-700 mb-3 block'>
              Languages *
            </Label>
            <div className='flex flex-wrap gap-2'>
              {languages.map((language) => (
                <Badge
                  key={language}
                  variant={
                    profileData.languages.includes(language)
                      ? 'default'
                      : 'outline'
                  }
                  className={`cursor-pointer px-3 py-1 text-sm transition-all duration-200 hover:scale-105 ${
                    profileData.languages.includes(language)
                      ? 'bg-gradient-to-r from-orange-500 to-red-600 text-white'
                      : 'border-gray-300 hover:border-orange-400 text-gray-700 hover:text-orange-600'
                  }`}
                  onClick={() => handleInterestToggle(language, 'languages')}
                >
                  {language}
                </Badge>
              ))}
            </div>
          </div>
        </form>
      </CardContent>
    </Card>
  );

  const renderStep4 = () => (
    <Card className='max-w-2xl mx-auto shadow-2xl border-0 bg-white/95 backdrop-blur-sm rounded-2xl'>
      <CardHeader className='text-center pb-8'>
        <div className='w-16 h-16 mx-auto mb-4 rounded-full bg-gradient-to-br from-teal-500 to-cyan-600 flex items-center justify-center shadow-lg'>
          <Award className='h-8 w-8 text-white' />
        </div>
        <CardTitle className='text-3xl font-bold bg-gradient-to-r from-teal-600 to-cyan-600 bg-clip-text text-transparent'>
          Preferences & Interests
        </CardTitle>
        <CardDescription className='text-lg text-gray-600 mt-2'>
          Tell us what you're looking for
        </CardDescription>
      </CardHeader>
      <CardContent className='px-8 pb-8'>
        <form className='space-y-6'>
          <div>
            <Label className='text-base font-semibold text-gray-700 mb-3 block'>
              Mentorship Interests
            </Label>
            <div className='flex flex-wrap gap-2'>
              {mentorshipInterests.map((interest) => (
                <Badge
                  key={interest}
                  variant={
                    profileData.mentorshipInterests.includes(interest)
                      ? 'default'
                      : 'outline'
                  }
                  className={`cursor-pointer px-3 py-1 text-sm transition-all duration-200 hover:scale-105 ${
                    profileData.mentorshipInterests.includes(interest)
                      ? 'bg-gradient-to-r from-teal-500 to-cyan-600 text-white'
                      : 'border-gray-300 hover:border-teal-400 text-gray-700 hover:text-teal-600'
                  }`}
                  onClick={() =>
                    handleInterestToggle(interest, 'mentorshipInterests')
                  }
                >
                  {interest}
                </Badge>
              ))}
            </div>
          </div>
        </form>
      </CardContent>
    </Card>
  );

  if (profileComplete) {
    return (
      <div className='min-h-screen bg-gradient-to-br from-green-50 to-emerald-100 flex items-center justify-center p-4'>
        <Card className='max-w-md mx-auto text-center shadow-2xl border-0 bg-white/95 backdrop-blur-sm rounded-2xl'>
          <CardContent className='p-8'>
            <div className='w-20 h-20 mx-auto mb-6 rounded-full bg-gradient-to-br from-green-500 to-emerald-600 flex items-center justify-center'>
              <CheckCircle className='h-10 w-10 text-white' />
            </div>
            <h2 className='text-2xl font-bold text-green-800 mb-4'>
              Profile Completed!
            </h2>
            <p className='text-gray-600 mb-6'>
              Your profile has been successfully completed. You'll be redirected
              to the dashboard shortly.
            </p>
            <div className='w-full bg-gray-200 rounded-full h-2 mb-6'>
              <div
                className='bg-green-500 h-2 rounded-full animate-pulse'
                style={{ width: '100%' }}
              ></div>
            </div>
            <Button
              onClick={() =>
                navigate('/dashboard', { state: { user: updatedUser } })
              }
              className='bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 px-6 py-2'
            >
              Go to Dashboard Now
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className='min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 flex items-center justify-center p-4 relative overflow-hidden'>
      <div className='absolute inset-0 bg-gradient-to-br from-indigo-50/50 via-purple-50/30 to-pink-50/50' />
      <div className='absolute top-0 left-0 w-72 h-72 bg-gradient-to-br from-indigo-400/20 to-purple-400/20 rounded-full blur-3xl' />
      <div className='absolute bottom-0 right-0 w-96 h-96 bg-gradient-to-br from-blue-400/20 to-cyan-400/20 rounded-full blur-3xl' />

      <div className='w-full max-w-5xl relative z-10'>
        {/* Header */}
        <div className='text-center mb-12'>
          <div
            className='flex items-center justify-center mb-4 cursor-pointer hover:opacity-80 transition-opacity'
            onClick={() => navigate('/')}
          >
            <img src='/logo.png' alt='Edfellow' className='w-16 rounded-full' />
            <span className='text-3xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent'>
              Edfellow
            </span>
          </div>
          <h1 className='text-4xl font-bold bg-gradient-to-r from-gray-800 to-gray-600 bg-clip-text text-transparent mb-3'>
            Complete Your Profile
          </h1>
          <p className='text-xl text-gray-600 font-medium'>
            Help us personalize your experience
          </p>
        </div>

        {/* Progress Section */}
        <div className='mb-12'>
          <div className='flex justify-between items-center mb-4'>
            <span className='text-lg font-semibold text-gray-700'>
              Step {currentStep} of {totalSteps}
            </span>
            <span className='text-lg font-semibold text-blue-600'>
              {calculateProgress()}% Complete
            </span>
          </div>
          <div className='w-full bg-gray-200 rounded-full h-3 shadow-inner'>
            <div
              className='h-3 rounded-full bg-gradient-to-r from-blue-500 to-indigo-600 transition-all duration-500 ease-out shadow-lg'
              style={{ width: `${calculateProgress()}%` }}
            />
          </div>
          <p className='text-center text-lg font-semibold text-gray-700 mt-4'>
            {getStepTitle(currentStep)}
          </p>
        </div>

        {/* Step Content */}
        {currentStep === 1 && renderStep1()}
        {currentStep === 2 && renderStep2()}
        {currentStep === 3 && renderStep3()}
        {currentStep === 4 && renderStep4()}

        {/* Navigation Buttons */}
        <div className='flex justify-between items-center mt-12'>
          <Button
            variant='outline'
            onClick={() => setCurrentStep(currentStep - 1)}
            disabled={currentStep === 1}
            className='flex items-center gap-3 px-8 py-3 border-2 border-gray-300 hover:border-blue-400 hover:bg-blue-50 transition-all duration-200 font-semibold'
          >
            Previous
          </Button>

          {currentStep < totalSteps ? (
            <Button
              onClick={() => setCurrentStep(currentStep + 1)}
              disabled={!canProceedToNext()}
              className='bg-gradient-to-r from-blue-500 to-indigo-600 hover:from-blue-600 hover:to-indigo-700 px-8 py-3 font-semibold shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-200'
            >
              Next Step
              <ArrowRight className='ml-2 h-5 w-5' />
            </Button>
          ) : (
            <Button
              onClick={handleSubmit}
              disabled={!canProceedToNext() || isSubmitting}
              className='bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 px-8 py-3 font-semibold shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-200'
            >
              {isSubmitting ? (
                <>
                  <div className='animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2'></div>
                  Completing Profile...
                </>
              ) : (
                <>
                  Complete Profile
                  <CheckCircle className='ml-2 h-5 w-5' />
                </>
              )}
            </Button>
          )}
        </div>

        <div className='text-center mt-8'>
          <p className='text-lg text-gray-600'>
            This information helps us connect you with the right people and
            opportunities.
          </p>
        </div>
      </div>

      {/* Forum Auto-Join Modal */}
      {showForumModal && updatedUser && (
        <ForumAutoJoin
          userProfile={profileData}
          onClose={() => {
            setShowForumModal(false);
            navigate('/dashboard', { state: { user: updatedUser } });
          }}
        />
      )}
    </div>
  );
};

export default CompleteProfile;
