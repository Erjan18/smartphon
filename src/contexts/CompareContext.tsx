import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { useAuth } from './AuthContext';

interface CompareContextType {
  compareItems: string[];
  addToCompare: (id: string) => void;
  removeFromCompare: (id: string) => void;
  clearCompare: () => void;
  isInCompare: (id: string) => boolean;
}

const CompareContext = createContext<CompareContextType | undefined>(undefined);

interface CompareProviderProps {
  children: ReactNode;
}

export const CompareProvider: React.FC<CompareProviderProps> = ({ children }) => {
  const [compareItems, setCompareItems] = useState<string[]>([]);
  const { isAuthenticated, user } = useAuth();
  const MAX_COMPARE_ITEMS = 4;

  // Load compare items from localStorage on mount and when auth state changes
  useEffect(() => {
    let storageKey = 'compare_guest';
    
    if (isAuthenticated && user) {
      storageKey = `compare_${user.id}`;
    }
    
    const storedItems = localStorage.getItem(storageKey);
    if (storedItems) {
      try {
        setCompareItems(JSON.parse(storedItems));
      } catch (error) {
        console.error('Failed to parse compare items from localStorage', error);
        setCompareItems([]);
      }
    }
  }, [isAuthenticated, user]);

  // Save compare items to localStorage whenever they change
  useEffect(() => {
    let storageKey = 'compare_guest';
    
    if (isAuthenticated && user) {
      storageKey = `compare_${user.id}`;
    }
    
    localStorage.setItem(storageKey, JSON.stringify(compareItems));
  }, [compareItems, isAuthenticated, user]);

  const addToCompare = (id: string) => {
    setCompareItems(prev => {
      if (prev.includes(id)) {
        return prev;
      }
      
      if (prev.length >= MAX_COMPARE_ITEMS) {
        return [...prev.slice(1), id]; // Remove oldest item if at max capacity
      }
      
      return [...prev, id];
    });
  };

  const removeFromCompare = (id: string) => {
    setCompareItems(prev => prev.filter(itemId => itemId !== id));
  };

  const clearCompare = () => {
    setCompareItems([]);
  };

  const isInCompare = (id: string) => {
    return compareItems.includes(id);
  };

  return (
    <CompareContext.Provider
      value={{
        compareItems,
        addToCompare,
        removeFromCompare,
        clearCompare,
        isInCompare
      }}
    >
      {children}
    </CompareContext.Provider>
  );
};

export const useCompare = () => {
  const context = useContext(CompareContext);
  if (context === undefined) {
    throw new Error('useCompare must be used within a CompareProvider');
  }
  return context;
};