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
} from 'lucide-react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useToast } from '@/hooks/use-toast';

interface FormData {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  confirmPassword: string;
  country: string;
  city: string;
  termsAccepted: boolean;
  userType: 'student' | 'professor' | 'university';

  // Student fields
  universityName: string;
  degreeLevel: string;
  areasOfInterest: string[];

  // Professor fields
  institutionAffiliation: string;
  department: string;
  position: string;
  researchInterests: string[];

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
  const [emailVerified, setEmailVerified] = useState(false);
  const [otpSent, setOtpSent] = useState(false);
  const [otpCode, setOtpCode] = useState('');
  const [passwordStrength, setPasswordStrength] = useState(0);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const [formData, setFormData] = useState<FormData>({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    confirmPassword: '',
    country: '',
    city: '',
    termsAccepted: false,
    userType: 'student',
    universityName: '',
    degreeLevel: '',
    areasOfInterest: [],
    institutionAffiliation: '',
    department: '',
    position: '',
    researchInterests: [],
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

  const interestTags = [
    'Computer Science',
    'Engineering',
    'Medical',
    'Economics',
    'Business',
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
  ];

  const researchTags = [
    'Artificial Intelligence',
    'Machine Learning',
    'Data Science',
    'Cybersecurity',
    'Robotics',
    'Computer Vision',
    'Natural Language Processing',
    'Bioinformatics',
    'Quantum Computing',
    'Blockchain',
    'IoT',
    'Cloud Computing',
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

    setOtpSent(true);
    toast({
      title: 'Verification Code Sent',
      description: 'Please check your email for the verification code.',
    });
  };

  const handleOtpVerification = () => {
    setEmailVerified(true);
    toast({
      title: 'Email Verified',
      description: 'Your email has been successfully verified.',
    });
  };

  const handleInterestToggle = (interest: string) => {
    setFormData((prev) => ({
      ...prev,
      areasOfInterest: prev.areasOfInterest.includes(interest)
        ? prev.areasOfInterest.filter((i) => i !== interest)
        : [...prev.areasOfInterest, interest],
    }));
  };

  const handleResearchInterestToggle = (interest: string) => {
    setFormData((prev) => ({
      ...prev,
      researchInterests: prev.researchInterests.includes(interest)
        ? prev.researchInterests.filter((i) => i !== interest)
        : [...prev.researchInterests, interest],
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!emailVerified) {
      toast({
        title: 'Email Not Verified',
        description: 'Please verify your email address before proceeding.',
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

    console.log('Registration data:', formData);

    toast({
      title: 'Registration Submitted',
      description:
        'Welcome to Edfellow! Your account has been created successfully. Please complete your profile to get started.',
    });

    // Navigate to complete profile page with minimum information
    navigate('/complete-profile', {
      state: {
        user: {
          name: `${formData.firstName} ${formData.lastName}`,
          email: formData.email,
          role: formData.userType,
          country: formData.country,
          // Pass minimum registration data
          registrationData: {
            firstName: formData.firstName,
            lastName: formData.lastName,
            email: formData.email,
            userType: formData.userType,
            country: formData.country,
            // Role-specific data
            ...(formData.userType === 'student' && {
              universityName: formData.universityName,
              degreeLevel: formData.degreeLevel,
              areasOfInterest: formData.areasOfInterest,
            }),
            ...(formData.userType === 'professor' && {
              institutionAffiliation: formData.institutionAffiliation,
              department: formData.department,
              position: formData.position,
              researchInterests: formData.researchInterests,
            }),
            ...(formData.userType === 'university' && {
              officialUniversityName: formData.officialUniversityName,
              accreditationNumber: formData.accreditationNumber,
              websiteUrl: formData.websiteUrl,
              contactPerson: formData.contactPerson,
            }),
          },
        },
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

  return (
    <div className='min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 flex items-center justify-center p-4 relative overflow-hidden'>
      {/* Background decorative elements */}
      <div className='absolute inset-0 bg-gradient-to-br from-indigo-50/50 via-purple-50/30 to-pink-50/50' />
      <div className='absolute top-0 left-0 w-72 h-72 bg-gradient-to-br from-indigo-400/20 to-purple-400/20 rounded-full blur-3xl' />
      <div className='absolute bottom-0 right-0 w-96 h-96 bg-gradient-to-br from-blue-400/20 to-cyan-400/20 rounded-full blur-3xl' />

      <div className='w-full max-w-4xl relative z-10'>
        {/* Header */}
        <div className='text-center mb-8'>
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
            Join Our Community
          </h1>
          <p className='text-xl text-gray-600 font-medium'>
            Complete your registration in one step
          </p>
        </div>

        <Card className='max-w-4xl mx-auto shadow-2xl border-0 bg-white/95 backdrop-blur-sm rounded-2xl'>
          <CardHeader className='text-center pb-8'>
            <CardTitle className='text-3xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent'>
              Create Your Account
            </CardTitle>
            <CardDescription className='text-lg text-gray-600 mt-2'>
              Fill in your details to get started
            </CardDescription>
          </CardHeader>
          <CardContent className='px-8 pb-8'>
            <form onSubmit={handleSubmit} className='space-y-8'>
              {/* Role Selection */}
              <div>
                <Label className='text-base font-semibold text-gray-700 mb-4 block'>
                  Choose Your Role *
                </Label>
                <div className='grid md:grid-cols-3 gap-4'>
                  {userTypes.map((type) => {
                    const IconComponent = type.icon;
                    return (
                      <div
                        key={type.id}
                        className={`cursor-pointer transition-all duration-300 border-2 rounded-lg p-4 group relative overflow-hidden ${
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
                            className={`w-12 h-12 mx-auto mb-3 rounded-full bg-gradient-to-br ${type.gradient} flex items-center justify-center shadow-lg`}
                          >
                            <IconComponent className='h-6 w-6 text-white' />
                          </div>
                          <h3 className='font-semibold text-gray-900 mb-1'>
                            {type.title}
                          </h3>
                          <p className='text-sm text-gray-600'>
                            {type.description}
                          </p>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Basic Information */}
              <div className='grid md:grid-cols-2 gap-4'>
                <div>
                  <Label htmlFor='firstName'>First Name *</Label>
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
                    className='border-gray-200 focus:border-[#007BFF] focus:ring-[#007BFF]'
                  />
                </div>
                <div>
                  <Label htmlFor='lastName'>Last Name *</Label>
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
                    className='border-gray-200 focus:border-[#007BFF] focus:ring-[#007BFF]'
                  />
                </div>
              </div>

              {/* Email and Verification */}
              <div>
                <Label htmlFor='email'>Email Address *</Label>
                <div className='flex gap-2'>
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
                    className='border-gray-200 focus:border-[#007BFF] focus:ring-[#007BFF]'
                    placeholder={
                      formData.userType === 'professor' ||
                      formData.userType === 'university'
                        ? 'institutional@university.edu'
                        : 'your.email@example.com'
                    }
                  />
                  <Button
                    type='button'
                    onClick={handleEmailVerification}
                    disabled={!formData.email || emailVerified}
                    className='bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-600 hover:to-teal-700 shadow-lg px-4'
                  >
                    {emailVerified ? (
                      <>
                        <CheckCircle className='h-4 w-4 mr-2' />
                        Verified
                      </>
                    ) : (
                      <>
                        <Mail className='h-4 w-4 mr-2' />
                        Verify
                      </>
                    )}
                  </Button>
                </div>
                {!validateEmail(formData.email, formData.userType) &&
                  formData.email && (
                    <p className='text-red-500 text-sm flex items-center gap-1 mt-1'>
                      <AlertCircle className='h-4 w-4' />
                      {formData.userType === 'professor' ||
                      formData.userType === 'university'
                        ? 'Please use an institutional email address'
                        : 'Please enter a valid email address'}
                    </p>
                  )}
              </div>

              {/* OTP Verification */}
              {otpSent && !emailVerified && (
                <div className='p-4 bg-blue-50 border border-blue-200 rounded-lg'>
                  <Label htmlFor='otp'>Verification Code</Label>
                  <div className='flex gap-2 mt-2'>
                    <Input
                      id='otp'
                      value={otpCode}
                      onChange={(e) => setOtpCode(e.target.value)}
                      placeholder='Enter 6-digit code'
                      className='border-gray-200 focus:border-[#007BFF] focus:ring-[#007BFF]'
                    />
                    <Button
                      type='button'
                      onClick={handleOtpVerification}
                      className='bg-blue-600 hover:bg-blue-700'
                    >
                      Verify
                    </Button>
                  </div>
                </div>
              )}

              {/* Password Fields */}
              <div className='grid md:grid-cols-2 gap-4'>
                <div>
                  <Label htmlFor='password'>Password *</Label>
                  <div className='relative'>
                    <Input
                      id='password'
                      type={showPassword ? 'text' : 'password'}
                      value={formData.password}
                      onChange={(e) => handlePasswordChange(e.target.value)}
                      required
                      className='border-gray-200 focus:border-[#007BFF] focus:ring-[#007BFF] pr-10'
                    />
                    <Button
                      type='button'
                      variant='ghost'
                      size='sm'
                      className='absolute right-0 top-0 h-full px-3'
                      onClick={() => setShowPassword(!showPassword)}
                    >
                      <Lock className='h-4 w-4' />
                    </Button>
                  </div>
                  <div className='mt-2'>
                    <div className='flex items-center justify-between mb-1'>
                      <span className='text-sm font-medium text-gray-700'>
                        Password Strength
                      </span>
                      <span
                        className={`text-sm font-semibold ${
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
                  <Label htmlFor='confirmPassword'>Confirm Password *</Label>
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
                      className='border-gray-200 focus:border-[#007BFF] focus:ring-[#007BFF] pr-10'
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
                      <Lock className='h-4 w-4' />
                    </Button>
                  </div>
                  {formData.password &&
                    formData.confirmPassword &&
                    formData.password !== formData.confirmPassword && (
                      <p className='text-red-500 text-sm mt-1'>
                        Passwords don't match
                      </p>
                    )}
                </div>
              </div>

              {/* Location */}
              <div className='grid md:grid-cols-2 gap-4'>
                <div>
                  <Label htmlFor='country'>Country/Region *</Label>
                  <Select
                    onValueChange={(value) =>
                      setFormData((prev) => ({ ...prev, country: value }))
                    }
                  >
                    <SelectTrigger className='border-gray-200 focus:border-[#007BFF] focus:ring-[#007BFF]'>
                      <SelectValue placeholder='Select your country' />
                    </SelectTrigger>
                    <SelectContent>
                      {countries.map((country) => (
                        <SelectItem key={country} value={country}>
                          {country}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label htmlFor='city'>City (Optional)</Label>
                  <Input
                    id='city'
                    value={formData.city}
                    onChange={(e) =>
                      setFormData((prev) => ({ ...prev, city: e.target.value }))
                    }
                    className='border-gray-200 focus:border-[#007BFF] focus:ring-[#007BFF]'
                  />
                </div>
              </div>

              {/* Role-specific fields */}
              {formData.userType === 'student' && (
                <div className='space-y-4'>
                  <div>
                    <Label htmlFor='universityName'>University Name *</Label>
                    <Select
                      onValueChange={(value) =>
                        setFormData((prev) => ({
                          ...prev,
                          universityName: value,
                        }))
                      }
                    >
                      <SelectTrigger className='border-gray-200 focus:border-[#007BFF] focus:ring-[#007BFF]'>
                        <SelectValue placeholder='Select your university' />
                      </SelectTrigger>
                      <SelectContent>
                        {universities.map((university) => (
                          <SelectItem key={university} value={university}>
                            {university}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <Label htmlFor='degreeLevel'>Degree Level *</Label>
                    <Select
                      onValueChange={(value) =>
                        setFormData((prev) => ({ ...prev, degreeLevel: value }))
                      }
                    >
                      <SelectTrigger className='border-gray-200 focus:border-[#007BFF] focus:ring-[#007BFF]'>
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
                    <Label className='text-base font-semibold text-gray-700 mb-3 block'>
                      Areas of Interest (Select multiple)
                    </Label>
                    <div className='flex flex-wrap gap-3'>
                      {interestTags.map((interest) => (
                        <Badge
                          key={interest}
                          variant={
                            formData.areasOfInterest.includes(interest)
                              ? 'default'
                              : 'outline'
                          }
                          className={`cursor-pointer px-4 py-2 text-sm font-medium transition-all duration-200 hover:scale-105 ${
                            formData.areasOfInterest.includes(interest)
                              ? 'bg-gradient-to-r from-indigo-500 to-purple-600 text-white shadow-lg'
                              : 'border-2 border-gray-300 hover:border-indigo-400 text-gray-700 hover:text-indigo-600'
                          }`}
                          onClick={() => handleInterestToggle(interest)}
                        >
                          {interest}
                        </Badge>
                      ))}
                    </div>
                  </div>
                </div>
              )}

              {formData.userType === 'professor' && (
                <div className='space-y-4'>
                  <div>
                    <Label htmlFor='institutionAffiliation'>
                      University/Institution Affiliation *
                    </Label>
                    <Select
                      onValueChange={(value) =>
                        setFormData((prev) => ({
                          ...prev,
                          institutionAffiliation: value,
                        }))
                      }
                    >
                      <SelectTrigger className='border-gray-200 focus:border-[#007BFF] focus:ring-[#007BFF]'>
                        <SelectValue placeholder='Select your institution' />
                      </SelectTrigger>
                      <SelectContent>
                        {universities.map((university) => (
                          <SelectItem key={university} value={university}>
                            {university}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  <div className='grid md:grid-cols-2 gap-4'>
                    <div>
                      <Label htmlFor='department'>Department/Field *</Label>
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
                        className='border-gray-200 focus:border-[#007BFF] focus:ring-[#007BFF]'
                      />
                    </div>
                    <div>
                      <Label htmlFor='position'>Position *</Label>
                      <Select
                        onValueChange={(value) =>
                          setFormData((prev) => ({ ...prev, position: value }))
                        }
                      >
                        <SelectTrigger className='border-gray-200 focus:border-[#007BFF] focus:ring-[#007BFF]'>
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
                    <Label className='text-base font-semibold text-gray-700 mb-3 block'>
                      Research Interests (Select multiple)
                    </Label>
                    <div className='flex flex-wrap gap-3'>
                      {researchTags.map((interest) => (
                        <Badge
                          key={interest}
                          variant={
                            formData.researchInterests.includes(interest)
                              ? 'default'
                              : 'outline'
                          }
                          className={`cursor-pointer px-4 py-2 text-sm font-medium transition-all duration-200 hover:scale-105 ${
                            formData.researchInterests.includes(interest)
                              ? 'bg-gradient-to-r from-amber-500 to-orange-600 text-white shadow-lg'
                              : 'border-2 border-gray-300 hover:border-amber-400 text-gray-700 hover:text-amber-600'
                          }`}
                          onClick={() => handleResearchInterestToggle(interest)}
                        >
                          {interest}
                        </Badge>
                      ))}
                    </div>
                  </div>
                </div>
              )}

              {formData.userType === 'university' && (
                <div className='space-y-4'>
                  <div>
                    <Label htmlFor='officialUniversityName'>
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
                      className='border-gray-200 focus:border-[#007BFF] focus:ring-[#007BFF]'
                    />
                  </div>
                  <div className='grid md:grid-cols-2 gap-4'>
                    <div>
                      <Label htmlFor='accreditationNumber'>
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
                        className='border-gray-200 focus:border-[#007BFF] focus:ring-[#007BFF]'
                      />
                    </div>
                    <div>
                      <Label htmlFor='websiteUrl'>Website URL *</Label>
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
                        className='border-gray-200 focus:border-[#007BFF] focus:ring-[#007BFF]'
                      />
                    </div>
                  </div>
                  <div>
                    <Label htmlFor='contactPerson'>
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
                      className='border-gray-200 focus:border-[#007BFF] focus:ring-[#007BFF]'
                    />
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
                <Label htmlFor='terms' className='text-sm'>
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
                className='w-full bg-gradient-to-r from-indigo-500 to-purple-600 hover:from-indigo-600 hover:to-purple-700 px-8 py-3 font-semibold shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-200'
              >
                Create Account
              </Button>
            </form>
          </CardContent>
        </Card>

        <div className='text-center mt-8'>
          <p className='text-lg text-gray-600'>
            Already have an account?{' '}
            <button
              onClick={() => navigate('/login')}
              className='text-indigo-600 hover:text-indigo-700 font-semibold underline hover:no-underline transition-all duration-200'
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
