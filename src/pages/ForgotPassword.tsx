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
import {
  GraduationCap,
  ArrowLeft,
  Mail,
  CheckCircle,
  Loader2,
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useToast } from '@/hooks/use-toast';
import { resetPassword } from '@/lib/auth';

const ForgotPassword = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [email, setEmail] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const { error } = await resetPassword(email);

      if (error) {
        throw error;
      }

      setIsSubmitted(true);
      toast({
        title: 'Reset Link Sent!',
        description: 'Check your email for password reset instructions.',
      });
    } catch (error: any) {
      console.error('Password reset error:', error);

      let errorMessage =
        'Failed to send password reset email. Please try again.';

      if (error.message?.includes('User not found')) {
        errorMessage = 'No account found with this email address.';
      } else if (error.message?.includes('Invalid email')) {
        errorMessage = 'Invalid email address. Please enter a valid email.';
      } else if (error.message) {
        errorMessage = error.message;
      }

      toast({
        title: 'Password Reset Failed',
        description: errorMessage,
        variant: 'destructive',
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleBackToLogin = () => {
    navigate('/login');
  };

  return (
    <div className='min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-50 flex items-center justify-center p-4'>
      <div className='w-full max-w-md'>
        {/* Header */}
        <div className='text-center mb-6 sm:mb-8'>
          <div
            className='flex items-center justify-center mb-3 sm:mb-4 cursor-pointer hover:opacity-80 transition-opacity'
            onClick={() => navigate('/')}
          >
            <div className='p-2 bg-gradient-to-br from-blue-600 to-indigo-600 rounded-xl shadow-lg mr-2 sm:mr-3'>
              <GraduationCap className='h-5 w-5 sm:h-6 sm:w-6 text-white' />
            </div>
            <span className='text-xl sm:text-2xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent'>
              Edfellow
            </span>
          </div>
          <h1 className='text-2xl sm:text-3xl font-bold text-gray-900 mb-2'>
            Reset Password
          </h1>
          <p className='text-sm sm:text-base text-gray-600'>
            Enter your email to receive reset instructions
          </p>
        </div>

        <Card className='shadow-xl border-0 bg-white/80 backdrop-blur-sm'>
          <CardHeader className='pb-4 sm:pb-6'>
            <CardTitle className='text-lg sm:text-xl'>
              Forgot Password
            </CardTitle>
            <CardDescription className='text-sm sm:text-base'>
              We'll send you a link to reset your password
            </CardDescription>
          </CardHeader>
          <CardContent className='px-4 sm:px-6'>
            {!isSubmitted ? (
              <form onSubmit={handleSubmit} className='space-y-4'>
                <div>
                  <Label htmlFor='email' className='text-sm sm:text-base'>
                    Email Address
                  </Label>
                  <Input
                    id='email'
                    type='email'
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    className='border-gray-200 focus:border-blue-500 focus:ring-blue-500 text-sm sm:text-base'
                    placeholder='Enter your email address'
                  />
                </div>

                <Button
                  type='submit'
                  className='w-full bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 shadow-lg text-sm sm:text-base disabled:opacity-50 disabled:cursor-not-allowed'
                  disabled={isLoading}
                >
                  {isLoading ? (
                    <div className='flex items-center'>
                      <Loader2 className='h-3 w-3 sm:h-4 sm:w-4 animate-spin mr-1 sm:mr-2' />
                      Sending...
                    </div>
                  ) : (
                    <div className='flex items-center'>
                      <Mail className='h-3 w-3 sm:h-4 sm:w-4 mr-1 sm:mr-2' />
                      Send Reset Link
                    </div>
                  )}
                </Button>
              </form>
            ) : (
              <div className='text-center space-y-4'>
                <div className='flex justify-center'>
                  <div className='p-2 sm:p-3 bg-green-100 rounded-full'>
                    <CheckCircle className='h-6 w-6 sm:h-8 sm:w-8 text-green-600' />
                  </div>
                </div>
                <div>
                  <h3 className='text-base sm:text-lg font-semibold text-gray-900 mb-2'>
                    Check Your Email
                  </h3>
                  <p className='text-xs sm:text-sm text-gray-600'>
                    We've sent a password reset link to <strong>{email}</strong>
                  </p>
                </div>
                <div className='text-xs sm:text-sm text-gray-500'>
                  <p>Didn't receive the email? Check your spam folder or</p>
                  <button
                    onClick={() => setIsSubmitted(false)}
                    className='text-blue-600 hover:text-blue-700 font-medium'
                  >
                    try again
                  </button>
                </div>
              </div>
            )}

            <div className='text-center mt-6'>
              <button
                onClick={handleBackToLogin}
                className='text-xs sm:text-sm text-blue-600 hover:text-blue-700 font-medium flex items-center justify-center mx-auto'
              >
                <ArrowLeft className='h-3 w-3 sm:h-4 sm:w-4 mr-1' />
                Back to Sign In
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

export default ForgotPassword;
