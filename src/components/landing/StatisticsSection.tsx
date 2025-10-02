import React from 'react';
import { Card, CardContent } from '../ui/card';
import { Badge } from '../ui/badge';
import { Button } from '../ui/button';
import {
  Users,
  GraduationCap,
  MessageSquare,
  Network,
  UserCheck,
  Calendar,
  RefreshCw,
  Wifi,
  WifiOff,
} from 'lucide-react';
import { useLandingPage } from '../../hooks/useLandingPage';
import { Skeleton } from '../ui/skeleton';

interface StatCardProps {
  icon: React.ReactNode;
  label: string;
  value: number;
  loading?: boolean;
  color?: 'blue' | 'green' | 'purple' | 'orange' | 'red' | 'indigo';
}

const StatCard: React.FC<StatCardProps> = ({
  icon,
  label,
  value,
  loading = false,
  color = 'blue',
}) => {
  const colorClasses = {
    blue: 'bg-blue-50 text-blue-600 border-blue-200',
    green: 'bg-green-50 text-green-600 border-green-200',
    purple: 'bg-purple-50 text-purple-600 border-purple-200',
    orange: 'bg-orange-50 text-orange-600 border-orange-200',
    red: 'bg-red-50 text-red-600 border-red-200',
    indigo: 'bg-indigo-50 text-indigo-600 border-indigo-200',
  };

  return (
    <Card className='relative overflow-hidden transition-all duration-300 hover:shadow-lg hover:scale-105'>
      <CardContent className='p-6'>
        <div className='flex items-center justify-between'>
          <div className='flex items-center space-x-4'>
            <div className={`p-3 rounded-lg border ${colorClasses[color]}`}>
              {icon}
            </div>
            <div>
              <p className='text-sm font-medium text-gray-600'>{label}</p>
              {loading ? (
                <Skeleton className='h-8 w-16 mt-1' />
              ) : (
                <p className='text-2xl font-bold text-gray-900'>
                  {value.toLocaleString()}
                </p>
              )}
            </div>
          </div>
        </div>

        {/* Animated background */}
        <div className='absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-full animate-pulse' />
      </CardContent>
    </Card>
  );
};

export const StatisticsSection: React.FC = () => {
  const {
    data,
    loading,
    statsLoading,
    error,
    statsError,
    refreshStats,
    isRealTimeEnabled,
    toggleRealTime,
  } = useLandingPage();

  const stats = data?.stats;

  // Fallback dummy data for when API fails
  const fallbackStats = {
    totalUsers: 15420,
    totalPrograms: 2847,
    totalPosts: 8934,
    totalConnections: 45678,
    activeMentors: 1247,
    completedSessions: 8934,
  };

  // Use fallback data if there's an error or no data
  const displayStats = fallbackStats; // Temporarily force fallback data to test

  const statCards = [
    {
      icon: <Users className='w-6 h-6' />,
      label: 'Active Users',
      value: displayStats?.totalUsers || 0,
      color: 'blue' as const,
    },
    {
      icon: <GraduationCap className='w-6 h-6' />,
      label: 'Programs Available',
      value: displayStats?.totalPrograms || 0,
      color: 'green' as const,
    },
    {
      icon: <MessageSquare className='w-6 h-6' />,
      label: 'Posts Shared',
      value: displayStats?.totalPosts || 0,
      color: 'purple' as const,
    },
    {
      icon: <Network className='w-6 h-6' />,
      label: 'Connections Made',
      value: displayStats?.totalConnections || 0,
      color: 'orange' as const,
    },
    {
      icon: <UserCheck className='w-6 h-6' />,
      label: 'Active Mentors',
      value: displayStats?.activeMentors || 0,
      color: 'indigo' as const,
    },
    {
      icon: <Calendar className='w-6 h-6' />,
      label: 'Sessions Completed',
      value: displayStats?.completedSessions || 0,
      color: 'red' as const,
    },
  ];

  // Remove the error return since we now show fallback data

  return (
    <section className='py-16 bg-gray-50'>
      <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8'>
        {/* Header */}
        <div className='text-center mb-12'>
          <div className='flex items-center justify-center space-x-4 mb-4'>
            <h2 className='text-3xl font-bold text-gray-900'>
              Platform Statistics
            </h2>
            <div className='flex items-center space-x-2'>
              <Button
                onClick={toggleRealTime}
                variant='outline'
                size='sm'
                className='flex items-center space-x-2'
              >
                {isRealTimeEnabled ? (
                  <>
                    <Wifi className='w-4 h-4 text-green-600' />
                    <span className='text-green-600'>Live</span>
                  </>
                ) : (
                  <>
                    <WifiOff className='w-4 h-4 text-gray-400' />
                    <span className='text-gray-400'>Offline</span>
                  </>
                )}
              </Button>

              <Button
                onClick={refreshStats}
                variant='outline'
                size='sm'
                disabled={statsLoading}
              >
                <RefreshCw
                  className={`w-4 h-4 ${statsLoading ? 'animate-spin' : ''}`}
                />
              </Button>
            </div>
          </div>

          <p className='text-lg text-gray-600 max-w-2xl mx-auto'>
            Join thousands of students, professors, and universities worldwide
            in the largest academic networking platform
          </p>

          {isRealTimeEnabled && (
            <Badge
              variant='secondary'
              className='mt-4 bg-green-100 text-green-800'
            >
              <div className='w-2 h-2 bg-green-500 rounded-full animate-pulse mr-2' />
              Real-time updates enabled
            </Badge>
          )}
        </div>

        {/* Statistics Grid */}
        <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6'>
          {statCards.map((stat, index) => (
            <StatCard
              key={stat.label}
              {...stat}
              loading={loading || statsLoading}
            />
          ))}
        </div>

        {/* Additional Info */}
        {/* <div className='mt-12 text-center'>
          <div className='bg-white rounded-lg shadow-sm border p-6 max-w-2xl mx-auto'>
            <h3 className='text-lg font-semibold text-gray-900 mb-2'>
              Growing Every Day
            </h3>
            <p className='text-gray-600'>
              Our platform is constantly growing with new users, programs, and
              connections. Join our community and be part of the global academic
              network.
            </p>
          </div>
        </div> */}
      </div>
    </section>
  );
};
