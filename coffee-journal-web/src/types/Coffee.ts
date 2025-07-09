export type RoastLevel = 'light' | 'medium' | 'dark';

export interface Coffee {
  id: string;
  name: string;
  origin: string;
  roastLevel: RoastLevel;
  roasterNotes: string;
  tastes: string[];
  feelings: string[];
  createdAt: string;
}

export interface CoffeeFormData {
  name: string;
  origin: string;
  roastLevel: RoastLevel;
  roasterNotes: string;
  tastes: string[];
  feelings: string[];
}

export const TASTE_OPTIONS = [
  { id: 'sweet', name: '단맛' },
  { id: 'sour', name: '신맛' },
  { id: 'bitter', name: '쓴맛' },
  { id: 'salty', name: '짠맛' },
  { id: 'umami', name: '감칠맛' },
  { id: 'fruity', name: '과일' },
  { id: 'floral', name: '꽃향기' },
  { id: 'nutty', name: '견과류' },
  { id: 'chocolate', name: '초콜릿' },
  { id: 'caramel', name: '캐러멜' },
];

export const FEELING_OPTIONS = [
  { id: 'comfortable', name: '편안한' },
  { id: 'energetic', name: '활기찬' },
  { id: 'relaxed', name: '여유로운' },
  { id: 'focused', name: '집중되는' },
  { id: 'happy', name: '행복한' },
  { id: 'nostalgic', name: '추억에 잠기게 하는' },
  { id: 'sophisticated', name: '고급스러운' },
  { id: 'adventurous', name: '모험적인' },
];
