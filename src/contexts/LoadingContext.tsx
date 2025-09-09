import React, {
  createContext,
  useContext,
  useState,
  useCallback,
  ReactNode,
} from 'react';

// =============================================
// TYPES
// =============================================

export type LoadingType =
  | 'global'
  | 'page'
  | 'data'
  | 'auth'
  | 'feed'
  | 'upload'
  | 'profile'
  | 'search'
  | 'custom';

export interface LoadingState {
  [key: string]: boolean;
}

export interface LoadingMessage {
  [key: string]: string;
}

export interface LoadingContextType {
  // State
  loading: LoadingState;
  messages: LoadingMessage;

  // Actions
  setLoading: (type: LoadingType, isLoading: boolean, message?: string) => void;
  setGlobalLoading: (isLoading: boolean, message?: string) => void;
  setPageLoading: (isLoading: boolean, message?: string) => void;
  setDataLoading: (isLoading: boolean, message?: string) => void;
  clearLoading: (type: LoadingType) => void;
  clearAllLoading: () => void;

  // Getters
  isLoading: (type: LoadingType) => boolean;
  getMessage: (type: LoadingType) => string;
  isAnyLoading: () => boolean;
}

// =============================================
// CONTEXT
// =============================================

const LoadingContext = createContext<LoadingContextType | undefined>(undefined);

// =============================================
// PROVIDER
// =============================================

interface LoadingProviderProps {
  children: ReactNode;
}

export const LoadingProvider: React.FC<LoadingProviderProps> = ({
  children,
}) => {
  const [loading, setLoadingState] = useState<LoadingState>({});
  const [messages, setMessages] = useState<LoadingMessage>({});

  const setLoading = useCallback(
    (type: LoadingType, isLoading: boolean, message?: string) => {
      setLoadingState((prev) => ({
        ...prev,
        [type]: isLoading,
      }));

      if (message !== undefined) {
        setMessages((prev) => ({
          ...prev,
          [type]: message,
        }));
      }
    },
    []
  );

  const setGlobalLoading = useCallback(
    (isLoading: boolean, message?: string) => {
      setLoading('global', isLoading, message);
    },
    [setLoading]
  );

  const setPageLoading = useCallback(
    (isLoading: boolean, message?: string) => {
      setLoading('page', isLoading, message);
    },
    [setLoading]
  );

  const setDataLoading = useCallback(
    (isLoading: boolean, message?: string) => {
      setLoading('data', isLoading, message);
    },
    [setLoading]
  );

  const clearLoading = useCallback((type: LoadingType) => {
    setLoadingState((prev) => {
      const newState = { ...prev };
      delete newState[type];
      return newState;
    });

    setMessages((prev) => {
      const newMessages = { ...prev };
      delete newMessages[type];
      return newMessages;
    });
  }, []);

  const clearAllLoading = useCallback(() => {
    setLoadingState({});
    setMessages({});
  }, []);

  const isLoading = useCallback(
    (type: LoadingType): boolean => {
      return loading[type] || false;
    },
    [loading]
  );

  const getMessage = useCallback(
    (type: LoadingType): string => {
      return messages[type] || '';
    },
    [messages]
  );

  const isAnyLoading = useCallback((): boolean => {
    return Object.values(loading).some(Boolean);
  }, [loading]);

  const value: LoadingContextType = {
    loading,
    messages,
    setLoading,
    setGlobalLoading,
    setPageLoading,
    setDataLoading,
    clearLoading,
    clearAllLoading,
    isLoading,
    getMessage,
    isAnyLoading,
  };

  return (
    <LoadingContext.Provider value={value}>{children}</LoadingContext.Provider>
  );
};

// =============================================
// HOOK
// =============================================

export const useLoading = (): LoadingContextType => {
  const context = useContext(LoadingContext);
  if (context === undefined) {
    throw new Error('useLoading must be used within a LoadingProvider');
  }
  return context;
};

// =============================================
// UTILITY HOOKS
// =============================================

export const useGlobalLoading = () => {
  const { setGlobalLoading, isLoading, getMessage } = useLoading();

  return {
    setGlobalLoading,
    isLoading: isLoading('global'),
    message: getMessage('global'),
  };
};

export const usePageLoading = () => {
  const { setPageLoading, isLoading, getMessage } = useLoading();

  return {
    setPageLoading,
    isLoading: isLoading('page'),
    message: getMessage('page'),
  };
};

export const useDataLoading = () => {
  const { setDataLoading, isLoading, getMessage } = useLoading();

  return {
    setDataLoading,
    isLoading: isLoading('data'),
    message: getMessage('data'),
  };
};
