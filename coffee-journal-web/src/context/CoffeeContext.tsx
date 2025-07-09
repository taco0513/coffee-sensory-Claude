import { createContext, useContext, useState, useEffect } from 'react';
import type { ReactNode } from 'react';
import type { Coffee, CoffeeFormData } from '../types/Coffee';

interface CoffeeContextType {
  currentCoffee: Coffee | null;
  saveCoffee: (data: Partial<CoffeeFormData>) => void;
  submitCoffee: () => void;
  clearCurrentCoffee: () => void;
  coffeeHistory: Coffee[];
}

const CoffeeContext = createContext<CoffeeContextType | undefined>(undefined);

const STORAGE_KEY = 'coffeeJournal';

export const CoffeeProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [currentCoffee, setCurrentCoffee] = useState<Partial<CoffeeFormData>>({
    name: '',
    origin: '',
    roastLevel: 'medium',
    roasterNotes: '',
    tastes: [],
    feelings: [],
  });
  
  const [coffeeHistory, setCoffeeHistory] = useState<Coffee[]>([]);

  // Load saved coffees from localStorage on mount
  useEffect(() => {
    const savedCoffees = localStorage.getItem(STORAGE_KEY);
    if (savedCoffees) {
      setCoffeeHistory(JSON.parse(savedCoffees));
    }
  }, []);

  const saveCoffee = (data: Partial<CoffeeFormData>) => {
    setCurrentCoffee(prev => ({
      ...prev,
      ...data
    }));
  };

  const submitCoffee = (): Coffee | null => {
    if (!currentCoffee.name || !currentCoffee.origin) return null;

    const newCoffee: Coffee = {
      id: Date.now().toString(),
      name: currentCoffee.name,
      origin: currentCoffee.origin,
      roastLevel: currentCoffee.roastLevel || 'medium',
      roasterNotes: currentCoffee.roasterNotes || '',
      tastes: currentCoffee.tastes || [],
      feelings: currentCoffee.feelings || [],
      createdAt: new Date().toISOString(),
    };

    const updatedHistory = [...coffeeHistory, newCoffee];
    setCoffeeHistory(updatedHistory);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(updatedHistory));
    
    // Clear the form after submission
    setCurrentCoffee({
      name: '',
      origin: '',
      roastLevel: 'medium',
      roasterNotes: '',
      tastes: [],
      feelings: [],
    });
    
    return newCoffee;
  };

  const clearCurrentCoffee = () => {
    setCurrentCoffee({
      name: '',
      origin: '',
      roastLevel: 'medium',
      roasterNotes: '',
      tastes: [],
      feelings: [],
    });
  };

  return (
    <CoffeeContext.Provider 
      value={{
        currentCoffee: currentCoffee as Coffee | null,
        saveCoffee,
        submitCoffee,
        clearCurrentCoffee,
        coffeeHistory,
      }}
    >
      {children}
    </CoffeeContext.Provider>
  );
};

export const useCoffee = (): CoffeeContextType => {
  const context = useContext(CoffeeContext);
  if (context === undefined) {
    throw new Error('useCoffee must be used within a CoffeeProvider');
  }
  return context;
};
