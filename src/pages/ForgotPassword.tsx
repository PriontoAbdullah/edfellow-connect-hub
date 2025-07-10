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
import { GraduationCap, ArrowLeft, Mail, CheckCircle } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useToast } from '@/hooks/use-toast';

const ForgotPassword = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [email, setEmail] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    // Simulate API call
    setTimeout(() => {
      setIsLoading(false);
      setIsSubmitted(true);

      toast({
        title: 'Reset Link Sent!',
        description: 'Check your email for password reset instructions.',
      });
    }, 2000);
  };

  const handleBackToLogin = () => {
    navigate('/login');
  };

  return (
    <div className='min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-50 flex items-center justify-center p-4'>
      <div className='w-full max-w-md'>
        {/* Header */}
        <div className='text-center mb-8'>
          <div
            className='flex items-center justify-center mb-4 cursor-pointer hover:opacity-80 transition-opacity'
            onClick={() => navigate('/')}
          >
            <div className='p-2 bg-gradient-to-br from-blue-600 to-indigo-600 rounded-xl shadow-lg mr-3'>
              <GraduationCap className='h-6 w-6 text-white' />
            </div>
            <span className='text-2xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent'>
              Edfellow
            </span>
          </div>
          <h1 className='text-3xl font-bold text-gray-900 mb-2'>
            Reset Password
          </h1>
          <p className='text-gray-600'>
            Enter your email to receive reset instructions
          </p>
        </div>

        <Card className='shadow-xl border-0 bg-white/80 backdrop-blur-sm'>
          <CardHeader>
            <CardTitle className='text-xl'>Forgot Password</CardTitle>
            <CardDescription>
              We'll send you a link to reset your password
            </CardDescription>
          </CardHeader>
          <CardContent>
            {!isSubmitted ? (
              <form onSubmit={handleSubmit} className='space-y-4'>
                <div>
                  <Label htmlFor='email'>Email Address</Label>
                  <Input
                    id='email'
                    type='email'
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    className='border-gray-200 focus:border-blue-500 focus:ring-blue-500'
                    placeholder='Enter your email address'
                  />
                </div>

                <Button
                  type='submit'
                  className='w-full bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 shadow-lg'
                  disabled={isLoading}
                >
                  {isLoading ? (
                    <div className='flex items-center'>
                      <div className='animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2'></div>
                      Sending...
                    </div>
                  ) : (
                    <div className='flex items-center'>
                      <Mail className='h-4 w-4 mr-2' />
                      Send Reset Link
                    </div>
                  )}
                </Button>
              </form>
            ) : (
              <div className='text-center space-y-4'>
                <div className='flex justify-center'>
                  <div className='p-3 bg-green-100 rounded-full'>
                    <CheckCircle className='h-8 w-8 text-green-600' />
                  </div>
                </div>
                <div>
                  <h3 className='text-lg font-semibold text-gray-900 mb-2'>
                    Check Your Email
                  </h3>
                  <p className='text-gray-600 text-sm'>
                    We've sent a password reset link to <strong>{email}</strong>
                  </p>
                </div>
                <div className='text-sm text-gray-500'>
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
                className='text-sm text-blue-600 hover:text-blue-700 font-medium flex items-center justify-center mx-auto'
              >
                <ArrowLeft className='h-4 w-4 mr-1' />
                Back to Sign In
              </button>
            </div>
          </CardContent>
        </Card>

        <div className='text-center mt-6'>
          <p className='text-gray-600'>
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
