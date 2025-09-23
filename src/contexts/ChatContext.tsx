import React, { createContext, useContext, ReactNode } from 'react';
import { useChat } from '../hooks/useChat';
import { ChatContextType } from '../types/chat';

const ChatContext = createContext<ChatContextType | undefined>(undefined);

interface ChatProviderProps {
  children: ReactNode;
}

export const ChatProvider: React.FC<ChatProviderProps> = ({ children }) => {
  const chatHook = useChat();

  return (
    <ChatContext.Provider value={chatHook}>{children}</ChatContext.Provider>
  );
};

export const useChatContext = (): ChatContextType => {
  const context = useContext(ChatContext);
  if (context === undefined) {
    throw new Error('useChatContext must be used within a ChatProvider');
  }
  return context;
};
