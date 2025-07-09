import { useState, useEffect, useCallback } from 'react';

const STORAGE_PREFIX = 'recent_';
const MAX_ITEMS = 5;

/**
 * Save a value to recent values in localStorage
 * @param key - The storage key (will be prefixed with 'recent_')
 * @param value - The value to save
 */
const saveRecentValue = (key: string, value: string) => {
  if (!value.trim()) return;
  
  const storageKey = `${STORAGE_PREFIX}${key}`;
  try {
    const recent = JSON.parse(localStorage.getItem(storageKey) || '[]');
    // Remove if exists and add to the beginning, then limit to MAX_ITEMS
    const updated = [value, ...recent.filter((v: string) => v !== value)].slice(0, MAX_ITEMS);
    localStorage.setItem(storageKey, JSON.stringify(updated));
  } catch (error) {
    console.error(`Failed to save recent value for ${key}:`, error);
  }
};

/**
 * Get recent values from localStorage
 * @param key - The storage key (will be prefixed with 'recent_')
 * @returns Array of recent values
 */
const getRecentValues = (key: string): string[] => {
  const storageKey = `${STORAGE_PREFIX}${key}`;
  try {
    return JSON.parse(localStorage.getItem(storageKey) || '[]');
  } catch (error) {
    console.error(`Failed to get recent values for ${key}:`, error);
    return [];
  }
};

/**
 * Custom hook to manage recent values with localStorage
 * @param key - Unique identifier for the set of values (e.g., 'roasteries', 'origins')
 * @returns [values, addValue] - The current values and a function to add a new value
 */
const useRecentValues = (key: string): [string[], (value: string) => void] => {
  const [values, setValues] = useState<string[]>([]);

  // Load values from localStorage on mount
  useEffect(() => {
    setValues(getRecentValues(key));
  }, [key]);

  // Add a new value to the recent values
  const addValue = useCallback((value: string) => {
    if (!value.trim()) return;
    
    setValues(prevValues => {
      // Update local state
      const updated = [value, ...prevValues.filter(v => v !== value)].slice(0, MAX_ITEMS);
      // Save to localStorage
      saveRecentValue(key, value);
      return updated;
    });
  }, [key]);

  return [values, addValue];
};

export default useRecentValues;
