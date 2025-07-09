import { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import '../App.css';

const CoffeeInputPage = () => {
  const navigate = useNavigate();
  const [showSuggestions, setShowSuggestions] = useState({
    roastery: false,
    origin: false,
    variety: false
  });
  
  const suggestionRefs = {
    roastery: useRef<HTMLDivElement>(null),
    origin: useRef<HTMLDivElement>(null),
    variety: useRef<HTMLDivElement>(null)
  };
  
  const [formData, setFormData] = useState({
    name: '',
    roastery: '',
    origin: '',
    altitude: '',
    variety: '',
    process: '',
    roastLevel: ''
  });

  // 자동완성을 위한 최근 값 불러오기
  const getRecentValues = (key: string) => {
    return JSON.parse(localStorage.getItem(key) || '[]');
  };

  // 값 저장
  const saveRecentValue = (key: string, value: string) => {
    if (!value) return;
    const recent = getRecentValues(key);
    const updated = [value, ...recent.filter((v: string) => v !== value)].slice(0, 5);
    localStorage.setItem(key, JSON.stringify(updated));
  };


  // Handle clicks outside suggestion boxes
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as Node;
      
      if (suggestionRefs.roastery.current && !suggestionRefs.roastery.current.contains(target)) {
        setShowSuggestions(prev => ({ ...prev, roastery: false }));
      }
      if (suggestionRefs.origin.current && !suggestionRefs.origin.current.contains(target)) {
        setShowSuggestions(prev => ({ ...prev, origin: false }));
      }
      if (suggestionRefs.variety.current && !suggestionRefs.variety.current.contains(target)) {
        setShowSuggestions(prev => ({ ...prev, variety: false }));
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };
  
  const handleFocus = (field: 'roastery' | 'origin' | 'variety') => {
    setShowSuggestions(prev => ({
      ...prev,
      [field]: true
    }));
  };
  
  const selectSuggestion = (field: 'roastery' | 'origin' | 'variety', value: string) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
    setShowSuggestions(prev => ({
      ...prev,
      [field]: false
    }));
  };

  const handleNext = () => {
    // 최근 값 저장
    saveRecentValue('recent-roasteries', formData.roastery);
    saveRecentValue('recent-origins', formData.origin);
    saveRecentValue('recent-varieties', formData.variety);
    
    // 다음 페이지로 이동
    navigate('/roaster-notes', { state: formData });
  };

  return (
    <div className="page">
      <div className="header">
        <button onClick={() => navigate(-1)}>←</button>
        <h1>커피 정보</h1>
      </div>
      
      <div className="form-section">
        <label>
          커피 이름 *
          <input 
            type="text" 
            name="name"
            value={formData.name}
            onChange={handleChange}
            placeholder="예: 에티오피아 예가체프"
            required
          />
        </label>

        <label>
          로스터리 *
          <div className="autocomplete-container" ref={suggestionRefs.roastery}>
            <input 
              type="text" 
              name="roastery"
              value={formData.roastery}
              onChange={handleChange}
              onFocus={() => handleFocus('roastery')}
              placeholder="예: 블루보틀"
              required
            />
            {showSuggestions.roastery && (
              <div className="suggestions">
                {getRecentValues('recent-roasteries')
                  .filter((r: string) => 
                    r.toLowerCase().includes(formData.roastery.toLowerCase())
                  )
                  .map((item: string) => (
                    <div 
                      key={item}
                      className="suggestion-item"
                      onClick={() => selectSuggestion('roastery', item)}
                    >
                      {item}
                    </div>
                  ))
                }
              </div>
            )}
          </div>
        </label>

        <label>
          원산지
          <div className="autocomplete-container" ref={suggestionRefs.origin}>
            <input 
              type="text" 
              name="origin"
              value={formData.origin}
              onChange={handleChange}
              onFocus={() => handleFocus('origin')}
              placeholder="예: 에티오피아"
            />
            {showSuggestions.origin && (
              <div className="suggestions">
                {getRecentValues('recent-origins')
                  .filter((o: string) => 
                    o.toLowerCase().includes(formData.origin.toLowerCase())
                  )
                  .map((item: string) => (
                    <div 
                      key={item}
                      className="suggestion-item"
                      onClick={() => selectSuggestion('origin', item)}
                    >
                      {item}
                    </div>
                  ))
                }
              </div>
            )}
          </div>
        </label>

        <label>
          재배 고도
          <input 
            type="text" 
            name="altitude"
            value={formData.altitude}
            onChange={handleChange}
            placeholder="예: 1,800m"
          />
        </label>

        <label>
          품종
          <div className="autocomplete-container" ref={suggestionRefs.variety}>
            <input 
              type="text" 
              name="variety"
              value={formData.variety}
              onChange={handleChange}
              onFocus={() => handleFocus('variety')}
              placeholder="예: Bourbon"
            />
            {showSuggestions.variety && (
              <div className="suggestions">
                {getRecentValues('recent-varieties')
                  .filter((v: string) => 
                    v.toLowerCase().includes(formData.variety.toLowerCase())
                  )
                  .map((item: string) => (
                    <div 
                      key={item}
                      className="suggestion-item"
                      onClick={() => selectSuggestion('variety', item)}
                    >
                      {item}
                    </div>
                  ))
                }
              </div>
            )}
          </div>
        </label>

        <label>
          가공 방식
          <select 
            name="process"
            value={formData.process}
            onChange={handleChange}
          >
            <option value="">선택하세요</option>
            <option value="Natural">Natural</option>
            <option value="Washed">Washed</option>
            <option value="Honey">Honey</option>
            <option value="Other">기타</option>
          </select>
        </label>

        <label>
          로스팅 레벨
          <select 
            name="roastLevel"
            value={formData.roastLevel}
            onChange={handleChange}
          >
            <option value="">선택하세요</option>
            <option value="Light">Light</option>
            <option value="Medium">Medium</option>
            <option value="Dark">Dark</option>
          </select>
        </label>
      </div>
      
      <button 
        className="next-button"
        onClick={handleNext}
        disabled={!formData.name || !formData.roastery}
      >
        다음
      </button>
    </div>
  );
};

export default CoffeeInputPage;
