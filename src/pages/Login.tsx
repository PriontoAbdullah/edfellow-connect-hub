import { useState } from 'react';
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
import { useNavigate, useLocation } from 'react-router-dom';
import { useToast } from '@/hooks/use-toast';
import { signInUser, resetPassword } from '@/lib/auth';
import { Loader2, Eye, EyeOff } from 'lucide-react';

const Login = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [isResettingPassword, setIsResettingPassword] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const { user, error } = await signInUser(
        formData.email,
        formData.password
      );

      if (error) {
        throw error;
      }

      if (user) {
        toast({
          title: 'Login Successful!',
          description: 'Welcome back to Edfellow!',
        });

        // Redirect to intended page or dashboard
        const from = location.state?.from?.pathname || '/dashboard';
        navigate(from, { replace: true });
      }
    } catch (error: any) {
      console.error('Login error:', error);

      let errorMessage = 'An error occurred during login. Please try again.';

      if (error.message?.includes('Invalid login credentials')) {
        errorMessage =
          'Invalid email or password. Please check your credentials.';
      } else if (error.message?.includes('Email not confirmed')) {
        errorMessage = 'Please verify your email address before logging in.';
      } else if (error.message?.includes('Too many requests')) {
        errorMessage = 'Too many failed attempts. Please try again later.';
      } else if (error.message) {
        errorMessage = error.message;
      }

      toast({
        title: 'Login Failed',
        description: errorMessage,
        variant: 'destructive',
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleForgotPassword = async () => {
    if (!formData.email) {
      toast({
        title: 'Email Required',
        description: 'Please enter your email address first.',
        variant: 'destructive',
      });
      return;
    }

    setIsResettingPassword(true);
    try {
      const { error } = await resetPassword(formData.email);

      if (error) {
        throw error;
      }

      toast({
        title: 'Password Reset Email Sent',
        description:
          'Please check your email for instructions to reset your password.',
      });
    } catch (error: any) {
      console.error('Password reset error:', error);

      let errorMessage =
        'Failed to send password reset email. Please try again.';

      if (error.message?.includes('User not found')) {
        errorMessage = 'No account found with this email address.';
      } else if (error.message) {
        errorMessage = error.message;
      }

      toast({
        title: 'Password Reset Failed',
        description: errorMessage,
        variant: 'destructive',
      });
    } finally {
      setIsResettingPassword(false);
    }
  };

  return (
    <div className='min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-50 flex items-center justify-center p-4 pb-20'>
      <div className='w-full max-w-md'>
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
          <h1 className='text-2xl sm:text-3xl font-bold text-gray-900 mb-2'>
            Welcome Back
          </h1>
          <p className='text-sm sm:text-base text-gray-600'>
            Sign in to your account
          </p>
        </div>

        <Card className='shadow-xl border-0 bg-white/80 backdrop-blur-sm'>
          <CardHeader className='pb-4 sm:pb-6'>
            <CardTitle className='text-lg sm:text-xl'>Sign In</CardTitle>
            <CardDescription className='text-sm sm:text-base'>
              Enter your credentials to access your account
            </CardDescription>
          </CardHeader>
          <CardContent className='px-4 sm:px-6'>
            <form onSubmit={handleSubmit} className='space-y-4'>
              <div>
                <Label htmlFor='email' className='text-sm sm:text-base'>
                  Email Address
                </Label>
                <Input
                  id='email'
                  type='email'
                  value={formData.email}
                  onChange={(e) =>
                    setFormData({ ...formData, email: e.target.value })
                  }
                  required
                  className='border-gray-200 focus:border-blue-500 focus:ring-blue-500 text-sm sm:text-base'
                />
              </div>

              <div>
                <Label htmlFor='password' className='text-sm sm:text-base'>
                  Password
                </Label>
                <div className='relative'>
                  <Input
                    id='password'
                    type={showPassword ? 'text' : 'password'}
                    value={formData.password}
                    onChange={(e) =>
                      setFormData({ ...formData, password: e.target.value })
                    }
                    required
                    className='border-gray-200 focus:border-blue-500 focus:ring-blue-500 pr-10 text-sm sm:text-base'
                  />
                  <Button
                    type='button'
                    variant='ghost'
                    size='sm'
                    className='absolute right-0 top-0 h-full px-3'
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    {showPassword ? (
                      <EyeOff className='h-4 w-4' />
                    ) : (
                      <Eye className='h-4 w-4' />
                    )}
                  </Button>
                </div>
              </div>

              <Button
                type='submit'
                disabled={isLoading}
                className='w-full bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 shadow-lg text-sm sm:text-base disabled:opacity-50 disabled:cursor-not-allowed'
              >
                {isLoading ? (
                  <>
                    <Loader2 className='h-4 w-4 mr-2 animate-spin' />
                    Signing In...
                  </>
                ) : (
                  'Sign In'
                )}
              </Button>
            </form>

            <div className='text-center mt-4'>
              <button
                onClick={handleForgotPassword}
                disabled={isResettingPassword}
                className='text-xs sm:text-sm text-blue-600 hover:text-blue-700 font-medium disabled:opacity-50 disabled:cursor-not-allowed'
              >
                {isResettingPassword ? (
                  <>
                    <Loader2 className='h-3 w-3 mr-1 animate-spin inline' />
                    Sending Reset Email...
                  </>
                ) : (
                  'Forgot your password?'
                )}
              </button>
            </div>
          </CardContent>
        </Card>

        <div className='text-center mt-6'>
          <p className='text-sm sm:text-base text-gray-600'>
            Don't have an account?{' '}
            <button
              onClick={() => navigate('/signup')}
              className='text-blue-600 hover:text-blue-700 font-medium'
            >
              Sign up here
            </button>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
