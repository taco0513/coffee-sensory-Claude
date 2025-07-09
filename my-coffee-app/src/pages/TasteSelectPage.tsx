import { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

interface Taste {
  id: string;
  name: string;
  emoji: string;
}

function TasteSelectPage() {
  const navigate = useNavigate();
  const location = useLocation();
  const coffeeData = location.state || {};
  
  const [selectedTastes, setSelectedTastes] = useState<string[]>([]);
  
  const tastes: Taste[] = [
    { id: 'fruit', name: '과일', emoji: '🍓' },
    { id: 'chocolate', name: '초콜릿', emoji: '🍫' },
    { id: 'floral', name: '꽃', emoji: '🌸' },
    { id: 'nutty', name: '견과', emoji: '🥜' },
    { id: 'sweet', name: '단맛', emoji: '🍯' },
    { id: 'herbal', name: '허브', emoji: '🌿' }
  ];
  
  const toggleTaste = (tasteId: string) => {
    if (selectedTastes.includes(tasteId)) {
      setSelectedTastes(selectedTastes.filter(t => t !== tasteId));
    } else {
      setSelectedTastes([...selectedTastes, tasteId]);
    }
  };
  
  return (
    <div className='page'>
      <div className='header'>
        <button onClick={() => navigate(-1)}>←</button>
        <h1>맛 선택</h1>
      </div>
      
      <div className='coffee-summary' style={{
        padding: '16px',
        margin: '16px',
        backgroundColor: '#f8f8f8',
        borderRadius: '8px',
        textAlign: 'center',
        fontSize: '16px',
        color: '#333'
      }}>
        {coffeeData.name || '커피 이름'} - {coffeeData.roastery || '로스터리'}
      </div>
      
      <div className='form-section' style={{
        padding: '0 16px 120px',
        marginBottom: '20px'
      }}>
        <h2 style={{
          fontSize: '18px',
          marginBottom: '8px',
          color: '#333'
        }}>어떤 맛이 느껴졌나요?</h2>
        <p className='subtitle' style={{
          fontSize: '14px',
          color: '#666',
          marginBottom: '16px'
        }}>느껴진 맛을 모두 선택하세요 (복수 선택 가능)</p>
        
        <div className="selected-count">
          {selectedTastes.length}개 선택됨
        </div>
        
        <div className='taste-grid' style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(2, 1fr)',
          gap: '12px',
          marginTop: '16px'
        }}>
          {tastes.map(taste => (
            <button
              key={taste.id}
              className={`taste-button ${selectedTastes.includes(taste.id) ? 'selected' : ''}`}
              onClick={() => toggleTaste(taste.id)}
              style={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                padding: '16px 8px',
                border: `2px solid ${selectedTastes.includes(taste.id) ? '#000' : '#ddd'}`,
                borderRadius: '12px',
                background: selectedTastes.includes(taste.id) ? '#f5f5f5' : 'white',
                cursor: 'pointer',
                transition: 'all 0.2s',
                position: 'relative'
              }}
            >
              <span className='taste-emoji' style={{
                fontSize: '32px',
                marginBottom: '8px'
              }}>{taste.emoji}</span>
              <span className='taste-name' style={{
                fontSize: '14px',
                color: '#333'
              }}>{taste.name}</span>
              {selectedTastes.includes(taste.id) && (
                <span className="check-mark">✓</span>
              )}
            </button>
          ))}
        </div>
      </div>
      
      <button 
        className='next-button'
        disabled={selectedTastes.length === 0}
        onClick={() => {
          const selectedTasteObjects = selectedTastes.map(id => 
            tastes.find(t => t.id === id)
          ).filter((t): t is Taste => t !== undefined);
          
          navigate('/feeling-select', { 
            state: { 
              ...coffeeData, 
              selectedTastes: selectedTasteObjects
            } 
          });
        }}
        style={{
          position: 'fixed',
          bottom: '20px',
          left: '20px',
          right: '20px',
          padding: '16px',
          backgroundColor: selectedTastes.length > 0 ? '#000' : '#ccc',
          color: 'white',
          border: 'none',
          borderRadius: '8px',
          fontSize: '16px',
          cursor: selectedTastes.length > 0 ? 'pointer' : 'not-allowed'
        }}
      >
        다음
      </button>
    </div>
  );
}

export default TasteSelectPage;
