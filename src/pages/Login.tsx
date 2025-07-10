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
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Login data:', formData);
    // Here you would typically authenticate with backend
    navigate('/dashboard');
  };

  const handleForgotPassword = () => {
    navigate('/forgot-password');
  };

  return (
    <div className='min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-50 flex items-center justify-center p-4 pb-20'>
      <div className='w-full max-w-md'>
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
          <h1 className='text-3xl font-bold text-gray-900 mb-2'>
            Welcome Back
          </h1>
          <p className='text-gray-600'>Sign in to your account</p>
        </div>

        <Card className='shadow-xl border-0 bg-white/80 backdrop-blur-sm'>
          <CardHeader>
            <CardTitle className='text-xl'>Sign In</CardTitle>
            <CardDescription>
              Enter your credentials to access your account
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className='space-y-4'>
              <div>
                <Label htmlFor='email'>Email Address</Label>
                <Input
                  id='email'
                  type='email'
                  value={formData.email}
                  onChange={(e) =>
                    setFormData({ ...formData, email: e.target.value })
                  }
                  required
                  className='border-gray-200 focus:border-blue-500 focus:ring-blue-500'
                />
              </div>

              <div>
                <Label htmlFor='password'>Password</Label>
                <Input
                  id='password'
                  type='password'
                  value={formData.password}
                  onChange={(e) =>
                    setFormData({ ...formData, password: e.target.value })
                  }
                  required
                  className='border-gray-200 focus:border-blue-500 focus:ring-blue-500'
                />
              </div>

              <Button
                type='submit'
                className='w-full bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 shadow-lg'
              >
                Sign In
              </Button>
            </form>

            <div className='text-center mt-4'>
              <button
                onClick={handleForgotPassword}
                className='text-sm text-blue-600 hover:text-blue-700 font-medium'
              >
                Forgot your password?
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

export default Login;
