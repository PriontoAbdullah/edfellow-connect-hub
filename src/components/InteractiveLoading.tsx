import React, { useState, useEffect } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import {
  CheckCircle,
  Loader2,
  Sparkles,
  Users,
  BookOpen,
  Globe,
} from 'lucide-react';

interface InteractiveLoadingProps {
  userRole: 'student' | 'professor' | 'university';
  userName: string;
  onComplete?: () => void;
}

const InteractiveLoading: React.FC<InteractiveLoadingProps> = ({
  userRole,
  userName,
  onComplete,
}) => {
  const [currentStep, setCurrentStep] = useState(0);
  const [progress, setProgress] = useState(0);

  const steps = [
    {
      icon: CheckCircle,
      title: 'Account Created',
      description: 'Your account has been successfully created',
      color: 'text-green-500',
      bgColor: 'bg-green-100',
    },
    {
      icon: Users,
      title: 'Setting Up Profile',
      description: 'Preparing your personalized dashboard',
      color: 'text-blue-500',
      bgColor: 'bg-blue-100',
    },
    {
      icon: BookOpen,
      title: 'Loading Resources',
      description: 'Fetching relevant content and opportunities',
      color: 'text-purple-500',
      bgColor: 'bg-purple-100',
    },
    {
      icon: Globe,
      title: 'Connecting Community',
      description: 'Finding peers and mentors in your field',
      color: 'text-orange-500',
      bgColor: 'bg-orange-100',
    },
    {
      icon: Sparkles,
      title: 'Almost Ready!',
      description: 'Finalizing your personalized experience',
      color: 'text-pink-500',
      bgColor: 'bg-pink-100',
    },
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          onComplete?.();
          return 100;
        }
        return prev + 2;
      });
    }, 100);

    const stepInterval = setInterval(() => {
      setCurrentStep((prev) => {
        if (prev >= steps.length - 1) {
          clearInterval(stepInterval);
          return prev;
        }
        return prev + 1;
      });
    }, 800);

    return () => {
      clearInterval(interval);
      clearInterval(stepInterval);
    };
  }, [onComplete, steps.length]);

  const getRoleMessage = () => {
    switch (userRole) {
      case 'student':
        return "We're setting up your student dashboard with personalized learning paths and opportunities.";
      case 'professor':
        return "We're preparing your professor workspace with teaching tools and research collaboration features.";
      case 'university':
        return "We're configuring your university portal with program management and student engagement tools.";
      default:
        return "We're setting up your personalized experience.";
    }
  };

  return (
    <div className='min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 flex items-center justify-center p-4 relative overflow-hidden'>
      {/* Animated background elements */}
      <div className='absolute inset-0 bg-gradient-to-br from-indigo-50/50 via-purple-50/30 to-pink-50/50' />
      <div className='absolute top-0 left-0 w-72 h-72 bg-gradient-to-br from-indigo-400/20 to-purple-400/20 rounded-full blur-3xl animate-pulse' />
      <div className='absolute bottom-0 right-0 w-96 h-96 bg-gradient-to-br from-blue-400/20 to-cyan-400/20 rounded-full blur-3xl animate-pulse' />
      <div className='absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-gradient-to-br from-pink-400/10 to-rose-400/10 rounded-full blur-3xl animate-ping' />

      <div className='w-full max-w-2xl relative z-10'>
        <Card className='shadow-2xl border-0 bg-white/95 backdrop-blur-sm rounded-2xl'>
          <CardContent className='p-8'>
            {/* Header */}
            <div className='text-center mb-8'>
              <div className='w-20 h-20 mx-auto mb-4 rounded-full bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center shadow-lg'>
                <img
                  src='/logo.png'
                  alt='Edfellow'
                  className='w-12 h-12 rounded-full'
                />
              </div>
              <h1 className='text-3xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent mb-2'>
                Welcome, {userName}! 🎉
              </h1>
              <p className='text-lg text-gray-600'>{getRoleMessage()}</p>
            </div>

            {/* Progress Bar */}
            <div className='mb-8'>
              <div className='flex justify-between items-center mb-2'>
                <span className='text-sm font-medium text-gray-700'>
                  Setting up your account...
                </span>
                <span className='text-sm font-medium text-blue-600'>
                  {Math.round(progress)}%
                </span>
              </div>
              <div className='w-full bg-gray-200 rounded-full h-3 shadow-inner'>
                <div
                  className='h-3 rounded-full bg-gradient-to-r from-blue-500 to-indigo-600 transition-all duration-300 ease-out shadow-lg'
                  style={{ width: `${progress}%` }}
                />
              </div>
            </div>

            {/* Current Step */}
            <div className='space-y-4'>
              {steps.map((step, index) => {
                const IconComponent = step.icon;
                const isActive = index === currentStep;
                const isCompleted = index < currentStep;
                const isUpcoming = index > currentStep;

                return (
                  <div
                    key={index}
                    className={`flex items-center space-x-4 p-4 rounded-lg transition-all duration-500 ${
                      isActive
                        ? `${step.bgColor} shadow-md scale-105`
                        : isCompleted
                        ? 'bg-green-50'
                        : 'bg-gray-50'
                    }`}
                  >
                    <div
                      className={`w-10 h-10 rounded-full flex items-center justify-center transition-all duration-300 ${
                        isCompleted
                          ? 'bg-green-500 text-white'
                          : isActive
                          ? `${step.bgColor} ${step.color}`
                          : 'bg-gray-200 text-gray-400'
                      }`}
                    >
                      {isCompleted ? (
                        <CheckCircle className='w-5 h-5' />
                      ) : isActive ? (
                        <Loader2 className='w-5 h-5 animate-spin' />
                      ) : (
                        <IconComponent className='w-5 h-5' />
                      )}
                    </div>
                    <div className='flex-1'>
                      <h3
                        className={`font-semibold transition-colors duration-300 ${
                          isActive
                            ? step.color
                            : isCompleted
                            ? 'text-green-700'
                            : 'text-gray-500'
                        }`}
                      >
                        {step.title}
                      </h3>
                      <p
                        className={`text-sm transition-colors duration-300 ${
                          isActive
                            ? 'text-gray-700'
                            : isCompleted
                            ? 'text-green-600'
                            : 'text-gray-400'
                        }`}
                      >
                        {step.description}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Fun facts or tips */}
            <div className='mt-8 p-4 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-lg border border-blue-200'>
              <div className='flex items-center space-x-2 mb-2'>
                <Sparkles className='w-5 h-5 text-blue-500' />
                <span className='font-semibold text-blue-700'>
                  Did you know?
                </span>
              </div>
              <p className='text-sm text-blue-600'>
                {userRole === 'student' &&
                  'Students who complete their profiles are 3x more likely to find relevant opportunities and mentors.'}
                {userRole === 'professor' &&
                  'Professors with complete profiles receive 5x more collaboration requests from students and peers.'}
                {userRole === 'university' &&
                  'Universities with detailed profiles see 40% more student engagement and program inquiries.'}
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default InteractiveLoading;
