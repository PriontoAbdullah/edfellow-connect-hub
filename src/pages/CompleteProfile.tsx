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
  Loader2,
} from 'lucide-react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useToast } from '@/hooks/use-toast';
import { useAuth } from '@/contexts/AuthContext';
import { updateUserData } from '@/lib/auth';
import ForumAutoJoin from '@/components/ForumAutoJoin';

interface ProfileData {
  bio: string;
  academicInterests: string[];
  skills: string[];
  languages: string[];
  experience: string;
  mentorshipInterests: string[];
  portfolio: {
    projects: Array<{
      title: string;
      description: string;
      technologies: string[];
      url?: string;
    }>;
    achievements: Array<{
      title: string;
      description: string;
      date: string;
    }>;
  };
}

const CompleteProfile = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { toast } = useToast();
  const { user, userData, refreshUserData } = useAuth();
  const [currentStep, setCurrentStep] = useState(1);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [profileComplete, setProfileComplete] = useState(false);
  const [showForumModal, setShowForumModal] = useState(false);
  const [updatedUser, setUpdatedUser] = useState<any>(null);

  const [localUser, setLocalUser] = useState(() => {
    const locationState = location.state as any;
    return (
      locationState?.user || { name: 'New User', role: 'student', email: '' }
    );
  });

  const [profileData, setProfileData] = useState<ProfileData>(() => {
    const locationState = location.state as any;
    const registrationData = locationState?.user?.registrationData;

    return {
      bio: '',
      academicInterests: [],
      skills: [],
      languages: [],
      experience: '',
      mentorshipInterests: [],
      portfolio: {
        projects: [],
        achievements: [],
      },
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

    // Step 1: Bio and basic info
    if (profileData.bio) completed++;
    total += 1;

    // Step 2: Academic interests
    if (profileData.academicInterests.length > 0) completed++;
    total += 1;

    // Step 3: Skills and experience
    if (profileData.skills.length > 0) completed++;
    if (profileData.languages.length > 0) completed++;
    if (profileData.experience) completed++;
    total += 3;

    // Step 4: Mentorship and portfolio
    if (profileData.mentorshipInterests.length > 0) completed++;
    if (profileData.portfolio.projects.length > 0) completed++;
    if (profileData.portfolio.achievements.length > 0) completed++;
    total += 3;

    return Math.round((completed / total) * 100);
  };

  const canProceedToNext = () => {
    switch (currentStep) {
      case 1:
        return profileData.bio.length > 50; // Require meaningful bio
      case 2:
        return profileData.academicInterests.length > 0;
      case 3:
        return (
          profileData.skills.length > 0 &&
          profileData.languages.length > 0 &&
          profileData.experience.length > 20
        );
      case 4:
        return profileData.mentorshipInterests.length > 0;
      default:
        return false;
    }
  };

  const handleSubmit = async () => {
    if (!user) {
      toast({
        title: 'Authentication Required',
        description: 'Please log in to complete your profile.',
        variant: 'destructive',
      });
      return;
    }

    setIsSubmitting(true);

    try {
      // Update user data in Supabase
      const { error } = await updateUserData(user.id, {
        bio: profileData.bio,
        academicInterests: profileData.academicInterests,
        skills: profileData.skills,
        languages: profileData.languages,
        experience: profileData.experience,
        mentorshipInterests: profileData.mentorshipInterests,
        profileCompleted: true,
      });

      if (error) {
        throw error;
      }

      // Refresh user data from Supabase
      await refreshUserData();

      const updatedUser = {
        ...localUser,
        name: localUser.name || 'User',
        profileComplete: true,
        profileData,
      };

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
      console.error('Error completing profile:', error);
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
        return 'Tell Us About Yourself';
      case 2:
        return 'Academic Interests';
      case 3:
        return 'Skills & Experience';
      case 4:
        return 'Portfolio & Mentorship';
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
          Tell Us About Yourself
        </CardTitle>
        <CardDescription className='text-lg text-gray-600 mt-2'>
          Share your story and what makes you unique
        </CardDescription>
      </CardHeader>
      <CardContent className='px-8 pb-8'>
        <form className='space-y-6'>
          <div>
            <Label htmlFor='bio'>Bio/About Me *</Label>
            <Textarea
              id='bio'
              value={profileData.bio}
              onChange={(e) =>
                setProfileData((prev) => ({ ...prev, bio: e.target.value }))
              }
              placeholder="Tell us about yourself, your academic journey, interests, and what you're looking for in this community..."
              className='border-gray-200 focus:border-[#007BFF] focus:ring-[#007BFF] min-h-[150px]'
              required
            />
            <p className='text-sm text-gray-500 mt-2'>
              {profileData.bio.length}/500 characters (minimum 50 required)
            </p>
          </div>

          {/* Suggestions for bio */}
          <div className='p-4 bg-blue-50 border border-blue-200 rounded-lg'>
            <h4 className='font-semibold text-blue-800 mb-2'>💡 Bio Tips:</h4>
            <ul className='text-sm text-blue-700 space-y-1'>
              <li>• Mention your academic background and current studies</li>
              <li>• Share your career goals and aspirations</li>
              <li>• Include your interests and hobbies</li>
              <li>• Explain what you hope to gain from this community</li>
            </ul>
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
          Academic Interests
        </CardTitle>
        <CardDescription className='text-lg text-gray-600 mt-2'>
          What subjects and areas interest you most?
        </CardDescription>
      </CardHeader>
      <CardContent className='px-8 pb-8'>
        <form className='space-y-6'>
          <div>
            <Label className='text-base font-semibold text-gray-700 mb-3 block'>
              Select Your Academic Interests *
            </Label>
            <p className='text-sm text-gray-600 mb-4'>
              Choose the subjects and areas that interest you most. This helps
              us connect you with relevant content and people.
            </p>
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
            <p className='text-sm text-gray-500 mt-3'>
              Selected: {profileData.academicInterests.length} interests
            </p>
          </div>

          {/* Suggestions */}
          <div className='p-4 bg-green-50 border border-green-200 rounded-lg'>
            <h4 className='font-semibold text-green-800 mb-2'>🎯 Pro Tip:</h4>
            <p className='text-sm text-green-700'>
              Select 3-5 interests that best represent your academic focus. This
              helps us personalize your feed and connect you with like-minded
              peers and mentors.
            </p>
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
          Portfolio & Mentorship
        </CardTitle>
        <CardDescription className='text-lg text-gray-600 mt-2'>
          Showcase your work and mentorship preferences
        </CardDescription>
      </CardHeader>
      <CardContent className='px-8 pb-8'>
        <form className='space-y-6'>
          <div>
            <Label className='text-base font-semibold text-gray-700 mb-3 block'>
              Mentorship Interests *
            </Label>
            <p className='text-sm text-gray-600 mb-4'>
              What kind of mentorship are you looking for or willing to provide?
            </p>
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
            <p className='text-sm text-gray-500 mt-3'>
              Selected: {profileData.mentorshipInterests.length} interests
            </p>
          </div>

          {/* Portfolio Section */}
          <div className='border-t pt-6'>
            <h3 className='text-lg font-semibold text-gray-800 mb-4'>
              Digital Portfolio (Optional)
            </h3>
            <p className='text-sm text-gray-600 mb-4'>
              You can add projects and achievements later in your profile. For
              now, let's focus on completing your basic profile.
            </p>
            <div className='p-4 bg-teal-50 border border-teal-200 rounded-lg'>
              <h4 className='font-semibold text-teal-800 mb-2'>
                🚀 Coming Soon:
              </h4>
              <ul className='text-sm text-teal-700 space-y-1'>
                <li>• Project showcase with links and descriptions</li>
                <li>• Achievement gallery with certificates and awards</li>
                <li>• Skills verification and endorsements</li>
                <li>• Portfolio sharing and collaboration features</li>
              </ul>
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
                  <Loader2 className='h-4 w-4 animate-spin mr-2' />
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
