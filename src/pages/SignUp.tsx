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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Checkbox } from '@/components/ui/checkbox';
import { Badge } from '@/components/ui/badge';
import {
  GraduationCap,
  User,
  Building2,
  Mail,
  Lock,
  CheckCircle,
  AlertCircle,
  Loader2,
  Eye,
  EyeOff,
  Phone,
  Shield,
} from 'lucide-react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useToast } from '@/hooks/use-toast';
import { registerUser } from '@/lib/auth';
import { useAuth } from '@/contexts/AuthContext';
import InteractiveLoading from '@/components/InteractiveLoading';
import CountrySelect from '@/components/ui/CountrySelect';

interface FormData {
  firstName: string;
  lastName: string;
  email: string;
  phoneNumber: string;
  password: string;
  confirmPassword: string;
  country: string;
  city: string;
  termsAccepted: boolean;
  userType: 'student' | 'professor' | 'university';

  // Student fields
  universityName: string;
  degreeLevel: string;
  major: string;

  // Professor fields
  institutionAffiliation: string;
  department: string;
  position: string;
  subjectsTaught: string[];

  // University fields
  officialUniversityName: string;
  accreditationNumber: string;
  websiteUrl: string;
  contactPerson: string;
}

const SignUp = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { toast } = useToast();
  const { user } = useAuth();
  const [emailVerified, setEmailVerified] = useState(false);
  const [passwordStrength, setPasswordStrength] = useState(0);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [showLoading, setShowLoading] = useState(false);
  const [registeredUser, setRegisteredUser] = useState<any>(null);

  const [formData, setFormData] = useState<FormData>({
    firstName: '',
    lastName: '',
    email: '',
    phoneNumber: '',
    password: '',
    confirmPassword: '',
    country: '',
    city: '',
    termsAccepted: false,
    userType: 'student',
    universityName: '',
    degreeLevel: '',
    major: '',
    institutionAffiliation: '',
    department: '',
    position: '',
    subjectsTaught: [],
    officialUniversityName: '',
    accreditationNumber: '',
    websiteUrl: '',
    contactPerson: '',
  });

  // Check if role was passed from landing page
  useEffect(() => {
    const locationState = location.state as any;
    if (locationState?.role) {
      setFormData((prev) => ({ ...prev, userType: locationState.role }));
    }
  }, [location.state]);

  const countries = [
    'United States',
    'United Kingdom',
    'Canada',
    'Australia',
    'Germany',
    'France',
    'Netherlands',
    'Sweden',
    'Japan',
    'South Korea',
    'Singapore',
    'India',
    'China',
    'Brazil',
    'Mexico',
    'Other',
  ];

  const degreeLevels = ['BSc', 'MSc', 'PhD', 'Other'];
  const positions = [
    'Lecturer',
    'Assistant Professor',
    'Associate Professor',
    'Professor',
    'Other',
  ];
  const universities = [
    'Harvard University',
    'MIT',
    'Stanford University',
    'University of Oxford',
    'University of Cambridge',
    'University of Toronto',
    'University of Melbourne',
    'Technical University of Munich',
    'Sorbonne University',
    'Other',
  ];

  const subjectsTaught = [
    'Computer Science',
    'Mathematics',
    'Physics',
    'Chemistry',
    'Biology',
    'Engineering',
    'Economics',
    'Business Administration',
    'Psychology',
    'Literature',
    'History',
    'Philosophy',
    'Art & Design',
    'Data Science',
    'Artificial Intelligence',
    'Machine Learning',
    'Cybersecurity',
    'Robotics',
    'Medicine',
    'Law',
    'Education',
    'Other',
  ];

  // Password strength calculation
  const calculatePasswordStrength = (password: string) => {
    let strength = 0;
    if (password.length >= 8) strength += 25;
    if (/[a-z]/.test(password)) strength += 25;
    if (/[A-Z]/.test(password)) strength += 25;
    if (/[0-9]/.test(password)) strength += 25;
    return strength;
  };

  const handlePasswordChange = (password: string) => {
    setFormData((prev) => ({ ...prev, password }));
    setPasswordStrength(calculatePasswordStrength(password));
  };

  // Email validation based on user type
  const validateEmail = (email: string, userType: string) => {
    if (userType === 'professor' || userType === 'university') {
      const validDomains = ['.edu', '.ac.', '.university', '.college'];
      return validDomains.some((domain) =>
        email.toLowerCase().includes(domain)
      );
    }
    return true;
  };

  const handleEmailVerification = async () => {
    if (!validateEmail(formData.email, formData.userType)) {
      toast({
        title: 'Invalid Email Domain',
        description: `${
          formData.userType === 'professor' ? 'Professors' : 'Universities'
        } must use institutional email addresses.`,
        variant: 'destructive',
      });
      return;
    }

    setEmailVerified(true);
    toast({
      title: 'Email Validated',
      description:
        'Email format is valid. You will receive a verification email after registration.',
    });
  };

  const handleSubjectToggle = (subject: string) => {
    setFormData((prev) => ({
      ...prev,
      subjectsTaught: prev.subjectsTaught.includes(subject)
        ? prev.subjectsTaught.filter((s) => s !== subject)
        : [...prev.subjectsTaught, subject],
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      // Only require email verification for professors and universities
      if (
        (formData.userType === 'professor' ||
          formData.userType === 'university') &&
        !emailVerified
      ) {
        toast({
          title: 'Email Not Verified',
          description:
            'Please verify your institutional email address before proceeding.',
          variant: 'destructive',
        });
        return;
      }

      if (formData.password !== formData.confirmPassword) {
        toast({
          title: "Passwords Don't Match",
          description: 'Please ensure both passwords are identical.',
          variant: 'destructive',
        });
        return;
      }

      if (!formData.termsAccepted) {
        toast({
          title: 'Terms Not Accepted',
          description: 'Please accept the terms and conditions.',
          variant: 'destructive',
        });
        return;
      }

      // Prepare user data for Firebase
      const userData = {
        firstName: formData.firstName,
        lastName: formData.lastName,
        email: formData.email,
        phoneNumber: formData.phoneNumber,
        role: formData.userType,
        country: formData.country,
        city: formData.city,
        // Role-specific data
        ...(formData.userType === 'student' && {
          university: formData.universityName,
          degreeLevel: formData.degreeLevel,
          major: formData.major,
        }),
        ...(formData.userType === 'professor' && {
          institutionAffiliation: formData.institutionAffiliation,
          department: formData.department,
          position: formData.position,
          subjectsTaught: formData.subjectsTaught,
        }),
        ...(formData.userType === 'university' && {
          officialUniversityName: formData.officialUniversityName,
          accreditationNumber: formData.accreditationNumber,
          websiteUrl: formData.websiteUrl,
          contactPerson: formData.contactPerson,
        }),
      };

      // Register user with Supabase
      const { user, error } = await registerUser(
        formData.email,
        formData.password,
        userData
      );

      if (error) {
        throw error;
      }

      if (user) {
        // Set up the registered user data for loading screen
        const newUser = {
          name: `${formData.firstName} ${formData.lastName}`,
          role: formData.userType,
          email: formData.email,
          profileComplete: false,
        };

        setRegisteredUser(newUser);
        setShowLoading(true);
      }
    } catch (error: any) {
      console.error('Registration error:', error);

      let errorMessage =
        'An error occurred during registration. Please try again.';

      if (error.message?.includes('User already registered')) {
        errorMessage =
          'An account with this email already exists. Please use a different email or try logging in.';
      } else if (error.message?.includes('Password should be at least')) {
        errorMessage =
          'Password is too weak. Please choose a stronger password.';
      } else if (error.message?.includes('Invalid email')) {
        errorMessage = 'Invalid email address. Please enter a valid email.';
      } else if (error.message) {
        errorMessage = error.message;
      }

      toast({
        title: 'Registration Failed',
        description: errorMessage,
        variant: 'destructive',
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleLoadingComplete = () => {
    setShowLoading(false);
    navigate('/complete-profile', {
      state: {
        user: registeredUser,
        fromSignup: true,
      },
    });
  };

  const userTypes = [
    {
      id: 'student',
      title: 'Student',
      description: 'Connect with peers and professors in your field',
      icon: User,
      color:
        'text-indigo-600 bg-indigo-50 border-indigo-200 hover:bg-indigo-100 hover:border-indigo-300',
      gradient: 'from-indigo-500 to-purple-600',
    },
    {
      id: 'professor',
      title: 'Professor',
      description: 'Share expertise and mentor students',
      icon: GraduationCap,
      color:
        'text-emerald-600 bg-emerald-50 border-emerald-200 hover:bg-emerald-100 hover:border-emerald-300',
      gradient: 'from-emerald-500 to-teal-600',
    },
    {
      id: 'university',
      title: 'University',
      description: 'Promote programs and connect with students',
      icon: Building2,
      color:
        'text-amber-600 bg-amber-50 border-amber-200 hover:bg-amber-100 hover:border-amber-300',
      gradient: 'from-amber-500 to-orange-600',
    },
  ];

  // Show loading screen after successful registration
  if (showLoading && registeredUser) {
    return (
      <InteractiveLoading
        userRole={registeredUser.role}
        userName={registeredUser.name}
        onComplete={handleLoadingComplete}
      />
    );
  }

  return (
    <div className='min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 flex items-center justify-center p-4 relative overflow-hidden'>
      {/* Background decorative elements */}
      <div className='absolute inset-0 bg-gradient-to-br from-indigo-50/50 via-purple-50/30 to-pink-50/50' />
      <div className='absolute top-0 left-0 w-72 h-72 bg-gradient-to-br from-indigo-400/20 to-purple-400/20 rounded-full blur-3xl' />
      <div className='absolute bottom-0 right-0 w-96 h-96 bg-gradient-to-br from-blue-400/20 to-cyan-400/20 rounded-full blur-3xl' />

      <div className='w-full max-w-4xl relative z-10'>
        {/* Header */}
        <div className='text-center mb-6 sm:mb-8'>
          <div
            className='flex items-center justify-center mb-3 sm:mb-4 cursor-pointer hover:opacity-80 transition-opacity'
            onClick={() => navigate('/')}
          >
            <img
              src='/logo.png'
              alt='Edfellow'
              className='w-12 sm:w-16 rounded-full'
            />
            <span className='text-2xl sm:text-3xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent'>
              Edfellow
            </span>
          </div>
          <h1 className='text-2xl sm:text-3xl lg:text-4xl font-bold bg-gradient-to-r from-gray-800 to-gray-600 bg-clip-text text-transparent mb-2 sm:mb-3'>
            Join Our Community
          </h1>
          <p className='text-base sm:text-lg lg:text-xl text-gray-600 font-medium'>
            Complete your registration in one step
          </p>
        </div>

        <Card className='max-w-4xl mx-auto shadow-2xl border-0 bg-white/95 backdrop-blur-sm rounded-2xl'>
          <CardHeader className='text-center pb-6 sm:pb-8'>
            <CardTitle className='text-2xl sm:text-3xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent'>
              Create Your Account
            </CardTitle>
            <CardDescription className='text-base sm:text-lg text-gray-600 mt-2'>
              Fill in your details to get started
            </CardDescription>
          </CardHeader>
          <CardContent className='px-4 sm:px-6 lg:px-8 pb-6 sm:pb-8'>
            <form onSubmit={handleSubmit} className='space-y-6 sm:space-y-8'>
              {/* Role Selection */}
              <div>
                <Label className='text-sm sm:text-base font-semibold text-gray-700 mb-3 sm:mb-4 block'>
                  Choose Your Role *
                </Label>
                <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4'>
                  {userTypes.map((type) => {
                    const IconComponent = type.icon;
                    return (
                      <div
                        key={type.id}
                        className={`cursor-pointer transition-all duration-300 border-2 rounded-lg p-3 sm:p-4 group relative overflow-hidden ${
                          formData.userType === type.id
                            ? type.color
                            : 'border-gray-200 bg-white hover:bg-gray-50'
                        }`}
                        onClick={() =>
                          setFormData((prev) => ({
                            ...prev,
                            userType: type.id as any,
                          }))
                        }
                      >
                        <div
                          className={`absolute inset-0 bg-gradient-to-br ${type.gradient} opacity-0 group-hover:opacity-5 transition-opacity duration-300`}
                        />
                        <div className='relative text-center'>
                          <div
                            className={`w-10 h-10 sm:w-12 sm:h-12 mx-auto mb-2 sm:mb-3 rounded-full bg-gradient-to-br ${type.gradient} flex items-center justify-center shadow-lg`}
                          >
                            <IconComponent className='h-5 w-5 sm:h-6 sm:w-6 text-white' />
                          </div>
                          <h3 className='font-semibold text-gray-900 mb-1 text-sm sm:text-base'>
                            {type.title}
                          </h3>
                          <p className='text-xs sm:text-sm text-gray-600'>
                            {type.description}
                          </p>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Basic Information */}
              <div className='grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4'>
                <div>
                  <Label htmlFor='firstName' className='text-sm sm:text-base'>
                    First Name *
                  </Label>
                  <Input
                    id='firstName'
                    value={formData.firstName}
                    onChange={(e) =>
                      setFormData((prev) => ({
                        ...prev,
                        firstName: e.target.value,
                      }))
                    }
                    required
                    className='border-gray-200 focus:border-[#007BFF] focus:ring-[#007BFF] text-sm sm:text-base'
                  />
                </div>
                <div>
                  <Label htmlFor='lastName' className='text-sm sm:text-base'>
                    Last Name *
                  </Label>
                  <Input
                    id='lastName'
                    value={formData.lastName}
                    onChange={(e) =>
                      setFormData((prev) => ({
                        ...prev,
                        lastName: e.target.value,
                      }))
                    }
                    required
                    className='border-gray-200 focus:border-[#007BFF] focus:ring-[#007BFF] text-sm sm:text-base'
                  />
                </div>
              </div>

              {/* Email and Verification */}
              <div>
                <Label htmlFor='email' className='text-sm sm:text-base'>
                  Email Address *
                </Label>
                <div className='flex flex-col sm:flex-row gap-2'>
                  <Input
                    id='email'
                    type='email'
                    value={formData.email}
                    onChange={(e) =>
                      setFormData((prev) => ({
                        ...prev,
                        email: e.target.value,
                      }))
                    }
                    required
                    className='border-gray-200 focus:border-[#007BFF] focus:ring-[#007BFF] text-sm sm:text-base'
                    placeholder={
                      formData.userType === 'professor' ||
                      formData.userType === 'university'
                        ? 'institutional@university.edu'
                        : 'your.email@example.com'
                    }
                  />
                  {/* Only show verify button for professors and universities */}
                  {(formData.userType === 'professor' ||
                    formData.userType === 'university') && (
                    <Button
                      type='button'
                      onClick={handleEmailVerification}
                      disabled={!formData.email || emailVerified}
                      className='bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-600 hover:to-teal-700 shadow-lg px-3 sm:px-4 text-sm sm:text-base'
                    >
                      {emailVerified ? (
                        <>
                          <CheckCircle className='h-3 w-3 sm:h-4 sm:w-4 mr-1 sm:mr-2' />
                          Verified
                        </>
                      ) : (
                        <>
                          <Mail className='h-3 w-3 sm:h-4 sm:w-4 mr-1 sm:mr-2' />
                          Verify
                        </>
                      )}
                    </Button>
                  )}
                </div>
                {!validateEmail(formData.email, formData.userType) &&
                  formData.email && (
                    <p className='text-red-500 text-xs sm:text-sm flex items-center gap-1 mt-1'>
                      <AlertCircle className='h-3 w-3 sm:h-4 sm:w-4' />
                      {formData.userType === 'professor' ||
                      formData.userType === 'university'
                        ? 'Please use an institutional email address'
                        : 'Please enter a valid email address'}
                    </p>
                  )}
              </div>

              {/* Phone Number */}
              <div>
                <Label htmlFor='phoneNumber' className='text-sm sm:text-base'>
                  Phone Number{' '}
                  {formData.userType === 'professor' ||
                  formData.userType === 'university'
                    ? '*'
                    : '(Optional)'}
                </Label>
                <div className='relative'>
                  <Phone className='absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400' />
                  <Input
                    id='phoneNumber'
                    type='tel'
                    value={formData.phoneNumber}
                    onChange={(e) =>
                      setFormData((prev) => ({
                        ...prev,
                        phoneNumber: e.target.value,
                      }))
                    }
                    required={
                      formData.userType === 'professor' ||
                      formData.userType === 'university'
                    }
                    className='border-gray-200 focus:border-[#007BFF] focus:ring-[#007BFF] text-sm sm:text-base pl-10'
                    placeholder='+1 (555) 123-4567'
                  />
                </div>
              </div>

              {/* Password Fields */}
              <div className='grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4'>
                <div>
                  <Label htmlFor='password' className='text-sm sm:text-base'>
                    Password *
                  </Label>
                  <div className='relative'>
                    <Input
                      id='password'
                      type={showPassword ? 'text' : 'password'}
                      value={formData.password}
                      onChange={(e) => handlePasswordChange(e.target.value)}
                      required
                      className='border-gray-200 focus:border-[#007BFF] focus:ring-[#007BFF] pr-10 text-sm sm:text-base'
                    />
                    <Button
                      type='button'
                      variant='ghost'
                      size='sm'
                      className='absolute right-0 top-0 h-full px-3'
                      onClick={() => setShowPassword(!showPassword)}
                    >
                      {showPassword ? (
                        <EyeOff className='h-3 w-3 sm:h-4 sm:w-4' />
                      ) : (
                        <Eye className='h-3 w-3 sm:h-4 sm:w-4' />
                      )}
                    </Button>
                  </div>
                  <div className='mt-2'>
                    <div className='flex items-center justify-between mb-1'>
                      <span className='text-xs sm:text-sm font-medium text-gray-700'>
                        Password Strength
                      </span>
                      <span
                        className={`text-xs sm:text-sm font-semibold ${
                          passwordStrength < 25
                            ? 'text-red-500'
                            : passwordStrength < 50
                            ? 'text-orange-500'
                            : passwordStrength < 75
                            ? 'text-yellow-500'
                            : 'text-green-500'
                        }`}
                      >
                        {passwordStrength < 25
                          ? 'Weak'
                          : passwordStrength < 50
                          ? 'Fair'
                          : passwordStrength < 75
                          ? 'Good'
                          : 'Strong'}
                      </span>
                    </div>
                    <div className='w-full bg-gray-200 rounded-full h-2'>
                      <div
                        className={`h-2 rounded-full transition-all duration-300 ${
                          passwordStrength < 25
                            ? 'bg-red-500'
                            : passwordStrength < 50
                            ? 'bg-orange-500'
                            : passwordStrength < 75
                            ? 'bg-yellow-500'
                            : 'bg-green-500'
                        }`}
                        style={{ width: `${passwordStrength}%` }}
                      />
                    </div>
                  </div>
                </div>
                <div>
                  <Label
                    htmlFor='confirmPassword'
                    className='text-sm sm:text-base'
                  >
                    Confirm Password *
                  </Label>
                  <div className='relative'>
                    <Input
                      id='confirmPassword'
                      type={showConfirmPassword ? 'text' : 'password'}
                      value={formData.confirmPassword}
                      onChange={(e) =>
                        setFormData((prev) => ({
                          ...prev,
                          confirmPassword: e.target.value,
                        }))
                      }
                      required
                      className='border-gray-200 focus:border-[#007BFF] focus:ring-[#007BFF] pr-10 text-sm sm:text-base'
                    />
                    <Button
                      type='button'
                      variant='ghost'
                      size='sm'
                      className='absolute right-0 top-0 h-full px-3'
                      onClick={() =>
                        setShowConfirmPassword(!showConfirmPassword)
                      }
                    >
                      {showConfirmPassword ? (
                        <EyeOff className='h-3 w-3 sm:h-4 sm:w-4' />
                      ) : (
                        <Eye className='h-3 w-3 sm:h-4 sm:w-4' />
                      )}
                    </Button>
                  </div>
                  {formData.password &&
                    formData.confirmPassword &&
                    formData.password !== formData.confirmPassword && (
                      <p className='text-red-500 text-xs sm:text-sm mt-1'>
                        Passwords don't match
                      </p>
                    )}
                </div>
              </div>

              {/* Location */}
              <div className='grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4'>
                <div>
                  <Label htmlFor='country' className='text-sm sm:text-base'>
                    Country/Region *
                  </Label>
                  <CountrySelect
                    value={formData.country}
                    onChange={(value) =>
                      setFormData((prev) => ({ ...prev, country: value }))
                    }
                    className='mt-1'
                  />
                </div>
                <div>
                  <Label htmlFor='city' className='text-sm sm:text-base'>
                    City (Optional)
                  </Label>
                  <Input
                    id='city'
                    value={formData.city}
                    onChange={(e) =>
                      setFormData((prev) => ({ ...prev, city: e.target.value }))
                    }
                    className='border-gray-200 focus:border-[#007BFF] focus:ring-[#007BFF] text-sm sm:text-base'
                  />
                </div>
              </div>

              {/* Role-specific fields */}
              {formData.userType === 'student' && (
                <div className='space-y-4'>
                  <div>
                    <Label
                      htmlFor='universityName'
                      className='text-sm sm:text-base'
                    >
                      Affiliation (University/Organization) *
                    </Label>
                    <Input
                      id='universityName'
                      list='universities'
                      value={formData.universityName}
                      onChange={(e) =>
                        setFormData((prev) => ({
                          ...prev,
                          universityName: e.target.value,
                        }))
                      }
                      required
                      placeholder='Search or enter your university/organization'
                      className='border-gray-200 focus:border-[#007BFF] focus:ring-[#007BFF] text-sm sm:text-base'
                    />
                    <datalist id='universities'>
                      {universities.map((u) => (
                        <option key={u} value={u} />
                      ))}
                    </datalist>
                  </div>
                  <div className='grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4'>
                    <div>
                      <Label
                        htmlFor='degreeLevel'
                        className='text-sm sm:text-base'
                      >
                        Degree Level *
                      </Label>
                      <Select
                        onValueChange={(value) =>
                          setFormData((prev) => ({
                            ...prev,
                            degreeLevel: value,
                          }))
                        }
                      >
                        <SelectTrigger className='border-gray-200 focus:border-[#007BFF] focus:ring-[#007BFF] text-sm sm:text-base'>
                          <SelectValue placeholder='Select degree level' />
                        </SelectTrigger>
                        <SelectContent>
                          {degreeLevels.map((level) => (
                            <SelectItem key={level} value={level}>
                              {level}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                    <div>
                      <Label htmlFor='major' className='text-sm sm:text-base'>
                        Major/Field of Study *
                      </Label>
                      <Input
                        id='major'
                        value={formData.major}
                        onChange={(e) =>
                          setFormData((prev) => ({
                            ...prev,
                            major: e.target.value,
                          }))
                        }
                        required
                        className='border-gray-200 focus:border-[#007BFF] focus:ring-[#007BFF] text-sm sm:text-base'
                        placeholder='e.g., Computer Science'
                      />
                    </div>
                  </div>
                </div>
              )}

              {formData.userType === 'professor' && (
                <div className='space-y-4'>
                  <div>
                    <Label
                      htmlFor='institutionAffiliation'
                      className='text-sm sm:text-base'
                    >
                      University/Institution Affiliation *
                    </Label>
                    <Input
                      id='institutionAffiliation'
                      list='universities'
                      value={formData.institutionAffiliation}
                      onChange={(e) =>
                        setFormData((prev) => ({
                          ...prev,
                          institutionAffiliation: e.target.value,
                        }))
                      }
                      required
                      placeholder='Search or enter your institution'
                      className='border-gray-200 focus:border-[#007BFF] focus:ring-[#007BFF] text-sm sm:text-base'
                    />
                  </div>
                  <div className='grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4'>
                    <div>
                      <Label
                        htmlFor='department'
                        className='text-sm sm:text-base'
                      >
                        Department/Field *
                      </Label>
                      <Input
                        id='department'
                        value={formData.department}
                        onChange={(e) =>
                          setFormData((prev) => ({
                            ...prev,
                            department: e.target.value,
                          }))
                        }
                        required
                        className='border-gray-200 focus:border-[#007BFF] focus:ring-[#007BFF] text-sm sm:text-base'
                      />
                    </div>
                    <div>
                      <Label
                        htmlFor='position'
                        className='text-sm sm:text-base'
                      >
                        Position *
                      </Label>
                      <Select
                        onValueChange={(value) =>
                          setFormData((prev) => ({ ...prev, position: value }))
                        }
                      >
                        <SelectTrigger className='border-gray-200 focus:border-[#007BFF] focus:ring-[#007BFF] text-sm sm:text-base'>
                          <SelectValue placeholder='Select your position' />
                        </SelectTrigger>
                        <SelectContent>
                          {positions.map((position) => (
                            <SelectItem key={position} value={position}>
                              {position}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                  <div>
                    <Label className='text-sm sm:text-base font-semibold text-gray-700 mb-3 block'>
                      Subjects You Teach (Select multiple)
                    </Label>
                    <div className='flex flex-wrap gap-2 sm:gap-3'>
                      {subjectsTaught.map((subject) => (
                        <Badge
                          key={subject}
                          variant={
                            formData.subjectsTaught.includes(subject)
                              ? 'default'
                              : 'outline'
                          }
                          className={`cursor-pointer px-3 sm:px-4 py-1.5 sm:py-2 text-xs sm:text-sm font-medium transition-all duration-200 hover:scale-105 ${
                            formData.subjectsTaught.includes(subject)
                              ? 'bg-gradient-to-r from-emerald-500 to-teal-600 text-white shadow-lg'
                              : 'border-2 border-gray-300 hover:border-emerald-400 text-gray-700 hover:text-emerald-600'
                          }`}
                          onClick={() => handleSubjectToggle(subject)}
                        >
                          {subject}
                        </Badge>
                      ))}
                    </div>
                  </div>
                </div>
              )}

              {formData.userType === 'university' && (
                <div className='space-y-4'>
                  <div>
                    <Label
                      htmlFor='officialUniversityName'
                      className='text-sm sm:text-base'
                    >
                      Official University Name *
                    </Label>
                    <Input
                      id='officialUniversityName'
                      value={formData.officialUniversityName}
                      onChange={(e) =>
                        setFormData((prev) => ({
                          ...prev,
                          officialUniversityName: e.target.value,
                        }))
                      }
                      required
                      className='border-gray-200 focus:border-[#007BFF] focus:ring-[#007BFF] text-sm sm:text-base'
                    />
                  </div>
                  <div className='grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4'>
                    <div>
                      <Label
                        htmlFor='accreditationNumber'
                        className='text-sm sm:text-base'
                      >
                        Accreditation/License Number *
                      </Label>
                      <Input
                        id='accreditationNumber'
                        value={formData.accreditationNumber}
                        onChange={(e) =>
                          setFormData((prev) => ({
                            ...prev,
                            accreditationNumber: e.target.value,
                          }))
                        }
                        required
                        className='border-gray-200 focus:border-[#007BFF] focus:ring-[#007BFF] text-sm sm:text-base'
                      />
                    </div>
                    <div>
                      <Label
                        htmlFor='websiteUrl'
                        className='text-sm sm:text-base'
                      >
                        Website URL *
                      </Label>
                      <Input
                        id='websiteUrl'
                        type='url'
                        value={formData.websiteUrl}
                        onChange={(e) =>
                          setFormData((prev) => ({
                            ...prev,
                            websiteUrl: e.target.value,
                          }))
                        }
                        required
                        placeholder='https://www.university.edu'
                        className='border-gray-200 focus:border-[#007BFF] focus:ring-[#007BFF] text-sm sm:text-base'
                      />
                    </div>
                  </div>
                  <div>
                    <Label
                      htmlFor='contactPerson'
                      className='text-sm sm:text-base'
                    >
                      Contact Person (Administrator) *
                    </Label>
                    <Input
                      id='contactPerson'
                      value={formData.contactPerson}
                      onChange={(e) =>
                        setFormData((prev) => ({
                          ...prev,
                          contactPerson: e.target.value,
                        }))
                      }
                      required
                      className='border-gray-200 focus:border-[#007BFF] focus:ring-[#007BFF] text-sm sm:text-base'
                    />
                  </div>
                </div>
              )}

              {/* Verification Notice for Professors and Universities */}
              {(formData.userType === 'professor' ||
                formData.userType === 'university') && (
                <div className='p-4 bg-blue-50 border border-blue-200 rounded-lg'>
                  <div className='flex items-start space-x-3'>
                    <Shield className='h-5 w-5 text-blue-600 mt-0.5 flex-shrink-0' />
                    <div>
                      <h4 className='font-semibold text-blue-800 mb-2'>
                        Verification Required
                      </h4>
                      <p className='text-sm text-blue-700 mb-2'>
                        To take advantage of an {formData.userType} account, we
                        need to verify your role with your academic institution.
                        Please provide the following details:
                      </p>
                      <ul className='text-sm text-blue-700 space-y-1 mb-3'>
                        <li>• Your institutional email address</li>
                        <li>• Your institution's official website</li>
                        <li>• Your position/title at the institution</li>
                      </ul>
                      <p className='text-sm text-blue-700'>
                        Once we receive this information, we will send a
                        confirmation email after verification is complete. Thank
                        you for helping us keep our platform secure and focused
                        on educational excellence.
                      </p>
                    </div>
                  </div>
                </div>
              )}

              {/* Terms and Conditions */}
              <div className='flex items-center space-x-2'>
                <Checkbox
                  id='terms'
                  checked={formData.termsAccepted}
                  onCheckedChange={(checked) =>
                    setFormData((prev) => ({
                      ...prev,
                      termsAccepted: checked as boolean,
                    }))
                  }
                />
                <Label htmlFor='terms' className='text-xs sm:text-sm'>
                  I agree to the{' '}
                  <a href='#' className='text-blue-600 hover:underline'>
                    Terms & Conditions
                  </a>{' '}
                  and{' '}
                  <a href='#' className='text-blue-600 hover:underline'>
                    Privacy Policy
                  </a>
                </Label>
              </div>

              {/* Submit Button */}
              <Button
                type='submit'
                disabled={isLoading}
                className='w-full bg-gradient-to-r from-indigo-500 to-purple-600 hover:from-indigo-600 hover:to-purple-700 px-8 py-3 font-semibold shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-200 text-base sm:text-lg disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none'
              >
                {isLoading ? (
                  <>
                    <Loader2 className='h-4 w-4 mr-2 animate-spin' />
                    Creating Account...
                  </>
                ) : (
                  'Create Account'
                )}
              </Button>
            </form>
          </CardContent>
        </Card>

        <div className='text-center mt-6 sm:mt-8'>
          <p className='text-base sm:text-lg text-gray-600'>
            Already have an account?{' '}
            <button
              onClick={() => navigate('/login')}
              className='text-indigo-600 hover:text-indigo-700 font-semibold underline hover:no-underline transition-all duration-200 text-base sm:text-lg'
            >
              Sign in here
            </button>
          </p>
        </div>
      </div>
    </div>
  );
};

export default SignUp;
