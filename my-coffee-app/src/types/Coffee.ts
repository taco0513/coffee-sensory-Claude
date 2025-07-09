export type ProcessType = 'Natural' | 'Washed' | 'Honey' | 'Other';
export type RoastLevel = 'Light' | 'Medium' | 'Dark';

export interface Coffee {
  id: string;
  name: string;
  roastery: string;
  origin?: string;
  altitude?: string;
  variety?: string;
  process?: ProcessType;
  roastLevel?: RoastLevel;
  roasterNotes: string[];
  myTaste: {
    category: string;
    feelings: string[];
  };
  score: number;
  date: string;
}

// Types for the form data
export interface CoffeeFormData {
  name: string;
  roastery: string;
  origin: string;
  altitude: string;
  variety: string;
  process: ProcessType | '';
  roastLevel: RoastLevel | '';
}

// Default empty form data
export const defaultCoffeeFormData: CoffeeFormData = {
  name: '',
  roastery: '',
  origin: '',
  altitude: '',
  variety: '',
  process: '',
  roastLevel: '',
};
