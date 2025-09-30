import React, { useState, useEffect } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { ConnectionManager } from '@/components/connections/ConnectionManager';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Users, UserPlus, UserCheck, Clock } from 'lucide-react';
import { getConnectionStats } from '@/lib/api/connections';

const Connections = () => {
  const { user } = useAuth();
  const [stats, setStats] = useState({
    totalConnections: 0,
    pendingRequests: 0,
    sentRequests: 0,
  });

  useEffect(() => {
    if (user?.id) {
      fetchStats();
    }
  }, [user?.id]);

  const fetchStats = async () => {
    if (!user?.id) return;

    try {
      const { data, error } = await getConnectionStats(user.id);
      if (error) {
        console.error('Error fetching connection stats:', error);
        return;
      }
      if (data) {
        setStats(data);
      }
    } catch (error) {
      console.error('Error fetching connection stats:', error);
    }
  };

  if (!user?.id) {
    return (
      <div className='flex items-center justify-center min-h-[400px]'>
        <div className='text-center'>
          <Users className='h-12 w-12 text-gray-400 mx-auto mb-4' />
          <h3 className='text-lg font-medium text-gray-900 mb-2'>
            Please log in to view your connections
          </h3>
          <p className='text-gray-600'>
            You need to be logged in to access your network.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className='space-y-6'>
      {/* Header Section */}
      <div className='flex items-center justify-between'>
        <div>
          <h1 className='text-2xl font-bold text-gray-900'>My Network</h1>
          <p className='text-gray-600 mt-1'>
            Manage your connections and build your professional network
          </p>
        </div>
        <div className='flex items-center gap-2'>
          <Badge variant='outline' className='flex items-center gap-1'>
            <Users className='h-3 w-3' />
            Network
          </Badge>
        </div>
      </div>

      {/* Quick Stats */}
      <div className='grid grid-cols-1 md:grid-cols-3 gap-4'>
        <Card>
          <CardContent className='p-4'>
            <div className='flex items-center gap-3'>
              <div className='p-2 bg-blue-100 rounded-lg'>
                <Users className='h-5 w-5 text-blue-600' />
              </div>
              <div>
                <p className='text-sm text-gray-600'>Total Connections</p>
                <p className='text-lg font-semibold text-gray-900'>
                  {stats.totalConnections}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className='p-4'>
            <div className='flex items-center gap-3'>
              <div className='p-2 bg-orange-100 rounded-lg'>
                <Clock className='h-5 w-5 text-orange-600' />
              </div>
              <div>
                <p className='text-sm text-gray-600'>Pending Requests</p>
                <p className='text-lg font-semibold text-gray-900'>
                  {stats.pendingRequests}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className='p-4'>
            <div className='flex items-center gap-3'>
              <div className='p-2 bg-green-100 rounded-lg'>
                <UserPlus className='h-5 w-5 text-green-600' />
              </div>
              <div>
                <p className='text-sm text-gray-600'>Sent Requests</p>
                <p className='text-lg font-semibold text-gray-900'>
                  {stats.sentRequests}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Connection Manager */}
      <Card>
        <CardHeader>
          <CardTitle className='flex items-center gap-2'>
            <UserCheck className='h-5 w-5' />
            Connection Management
          </CardTitle>
        </CardHeader>
        <CardContent>
          <ConnectionManager userId={user.id} onStatsUpdate={fetchStats} />
        </CardContent>
      </Card>
    </div>
  );
};

export default Connections;
