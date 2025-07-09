import { useState, useEffect, useRef } from 'react';
import type { KeyboardEvent } from 'react';
import '../App.css';

interface AutoCompleteInputProps {
  label: string;
  value: string;
  onChange: (value: string) => void;
  suggestions: string[];
  placeholder?: string;
  required?: boolean;
}

const STORAGE_KEY_PREFIX = 'autocomplete_history_';
const MAX_RECENT_ITEMS = 5;

export const AutoCompleteInput: React.FC<AutoCompleteInputProps> = ({
  label,
  value,
  onChange,
  suggestions,
  placeholder = '',
  required = false,
}) => {
  const [inputValue, setInputValue] = useState(value);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [filteredSuggestions, setFilteredSuggestions] = useState<string[]>([]);
  const [recentItems, setRecentItems] = useState<string[]>([]);
  const wrapperRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  // Load recent items from localStorage on mount
  useEffect(() => {
    const storageKey = `${STORAGE_KEY_PREFIX}${label}`;
    const savedItems = localStorage.getItem(storageKey);
    if (savedItems) {
      try {
        const parsedItems = JSON.parse(savedItems);
        if (Array.isArray(parsedItems)) {
          setRecentItems(parsedItems);
        }
      } catch (e) {
        console.error('Failed to parse recent items', e);
      }
    }
  }, [label]);

  // Update filtered suggestions when input changes
  useEffect(() => {
    if (inputValue.trim() === '') {
      setFilteredSuggestions(recentItems);
      return;
    }

    const allSuggestions = [...new Set([...suggestions, ...recentItems])];
    const filtered = allSuggestions
      .filter(item => 
        item.toLowerCase().includes(inputValue.toLowerCase())
      )
      .slice(0, 5); // Limit to 5 suggestions
    
    setFilteredSuggestions(filtered);
  }, [inputValue, suggestions, recentItems]);

  // Handle click outside to close suggestions
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (wrapperRef.current && !wrapperRef.current.contains(event.target as Node)) {
        setShowSuggestions(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const saveToRecentItems = (item: string) => {
    if (!item.trim()) return;
    
    const storageKey = `${STORAGE_KEY_PREFIX}${label}`;
    const updatedItems = [
      item,
      ...recentItems.filter(i => i.toLowerCase() !== item.toLowerCase())
    ].slice(0, MAX_RECENT_ITEMS);
    
    setRecentItems(updatedItems);
    localStorage.setItem(storageKey, JSON.stringify(updatedItems));
  };

  const handleSelect = (selectedValue: string) => {
    setInputValue(selectedValue);
    onChange(selectedValue);
    setShowSuggestions(false);
    saveToRecentItems(selectedValue);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = e.target.value;
    setInputValue(newValue);
    onChange(newValue);
    setShowSuggestions(true);
  };

  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && filteredSuggestions.length > 0) {
      handleSelect(filteredSuggestions[0]);
    } else if (e.key === 'Escape') {
      setShowSuggestions(false);
    }
  };

  const handleBlur = () => {
    // Small timeout to allow click events to fire first
    setTimeout(() => setShowSuggestions(false), 200);
  };

  return (
    <div className="form-group" ref={wrapperRef}>
      <label>
        {label}
        {required && <span className="required"> *</span>}
      </label>
      <div className="autocomplete-container">
        <input
          ref={inputRef}
          type="text"
          value={inputValue}
          onChange={handleInputChange}
          onFocus={() => setShowSuggestions(true)}
          onBlur={handleBlur}
          onKeyDown={handleKeyDown}
          placeholder={placeholder}
          className="form-input"
          required={required}
        />
        {showSuggestions && filteredSuggestions.length > 0 && (
          <ul className="suggestions-dropdown">
            {filteredSuggestions.map((suggestion, index) => (
              <li
                key={`${suggestion}-${index}`}
                className="suggestion-item"
                onClick={() => handleSelect(suggestion)}
              >
                {suggestion}
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

export default AutoCompleteInput;
