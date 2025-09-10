import React, {
  createContext,
  useContext,
  useEffect,
  useState,
  useCallback,
  ReactNode,
} from 'react';
import { User } from '@supabase/supabase-js';
import {
  getUserData,
  updateUserData,
  UserData,
  onAuthStateChange,
} from '../lib/auth';

interface AuthContextType {
  user: User | null;
  userData: UserData | null;
  loading: boolean;
  error: string | null;
  setError: (error: string | null) => void;
  refreshUserData: () => Promise<void>;
  syncUserDataToDatabase: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [userData, setUserData] = useState<UserData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const refreshUserData = useCallback(async () => {
    if (user?.id) {
      try {
        const data = await getUserData(user.id);
        setUserData(data);
        console.log('User data refreshed from database:', data);
      } catch (err) {
        console.error('Error refreshing user data:', err);
        setError('Failed to load user data');
      }
    }
  }, [user?.id]);

  const syncUserDataToDatabase = useCallback(async () => {
    if (user?.id && userData) {
      try {
        console.log('Syncing user data to database:', userData);
        const { error } = await updateUserData(user.id, userData);
        if (error) {
          console.error('Error syncing user data:', error);
        } else {
          console.log('User data synced to database successfully');
        }
      } catch (err) {
        console.error('Error syncing user data:', err);
      }
    }
  }, [user?.id, userData]);

  useEffect(() => {
    const {
      data: { subscription },
    } = onAuthStateChange(async (user) => {
      console.log(
        'Auth state changed:',
        user ? 'User logged in' : 'User logged out'
      );
      setLoading(true);
      setError(null);

      if (user) {
        console.log('Setting user data for:', user.id);
        setUser(user);
        try {
          const data = await getUserData(user.id);
          setUserData(data);
          console.log('User data loaded successfully');

          // Sync user data to database to ensure consistency
          setTimeout(() => {
            syncUserDataToDatabase();
          }, 1000);
        } catch (err) {
          console.error('Error loading user data:', err);
          setError('Failed to load user data');
        }
      } else {
        // User signed out
        console.log('Clearing user data - user signed out');
        setUser(null);
        setUserData(null);
      }
      setLoading(false);
    });

    return () => subscription.unsubscribe();
  }, []);

  const value: AuthContextType = {
    user,
    userData,
    loading,
    error,
    setError,
    refreshUserData,
    syncUserDataToDatabase,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
