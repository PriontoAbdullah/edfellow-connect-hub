import React, {
  createContext,
  useContext,
  useEffect,
  useState,
  ReactNode,
} from 'react';
import { User } from '@supabase/supabase-js';
import { getUserData, UserData, onAuthStateChange } from '../lib/auth';

interface AuthContextType {
  user: User | null;
  userData: UserData | null;
  loading: boolean;
  error: string | null;
  setError: (error: string | null) => void;
  refreshUserData: () => Promise<void>;
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

  const refreshUserData = async () => {
    if (user) {
      try {
        const data = await getUserData(user.id);
        setUserData(data);
      } catch (err) {
        console.error('Error refreshing user data:', err);
        setError('Failed to load user data');
      }
    }
  };

  useEffect(() => {
    const {
      data: { subscription },
    } = onAuthStateChange(async (user) => {
      setUser(null);
      setUserData(null);
      setLoading(true);
      setError(null);

      if (user) {
        setUser(user);
        try {
          const data = await getUserData(user.id);
          setUserData(data);
        } catch (err) {
          console.error('Error loading user data:', err);
          setError('Failed to load user data');
        }
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
