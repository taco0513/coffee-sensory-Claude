import { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

interface Taste {
  id: string;
  name: string;
  emoji: string;
}

interface CoffeeData {
  name?: string;
  roastery?: string;
  selectedTaste?: Taste; // Keeping for backward compatibility
  selectedTastes?: Taste[];
}

interface Feeling {
  id: string;
  name: string;
  emoji: string;
}

function FeelingSelectPage() {
  const navigate = useNavigate();
  const location = useLocation();
  const coffeeData: CoffeeData = location.state || {};
  
  const [selectedFeelings, setSelectedFeelings] = useState<string[]>([]);
  
  const feelings: Feeling[] = [
    { id: 'bright', name: '터지는', emoji: '💥' },
    { id: 'light', name: '가벼운', emoji: '✨' },
    { id: 'smooth', name: '부드러운', emoji: '🌊' },
    { id: 'heavy', name: '묵직한', emoji: '🪨' },
    { id: 'subtle', name: '은은한', emoji: '💫' },
    { id: 'quick', name: '짧은', emoji: '⚡' }
  ];
  
  const toggleFeeling = (feelingId: string) => {
    if (selectedFeelings.includes(feelingId)) {
      setSelectedFeelings(selectedFeelings.filter(f => f !== feelingId));
    } else if (selectedFeelings.length < 2) {
      setSelectedFeelings([...selectedFeelings, feelingId]);
    }
  };
  
  const getDescription = (): string => {
    if (selectedFeelings.length === 0) return '';
    
    const feelingNames = selectedFeelings.map(id => 
      feelings.find(f => f.id === id)?.name || ''
    );
    
    return `${feelingNames.join(' ')} ${coffeeData.selectedTaste?.name || ''}맛`;
  };
  
  return (
    <div className='page'>
      <div className='header'>
        <button onClick={() => navigate(-1)}>←</button>
        <h1>느낌 선택</h1>
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
        padding: '0 16px 80px',
        marginBottom: '20px'
      }}>
        <h2 style={{
          fontSize: '18px',
          marginBottom: '8px',
          color: '#333'
        }}>
          선택한 맛들은 어떤 느낌이었나요?
        </h2>
        <div className='selected-tastes' style={{
          display: 'flex',
          flexWrap: 'wrap',
          gap: '8px',
          margin: '12px 0',
          justifyContent: 'center'
        }}>
          {coffeeData.selectedTastes?.map((taste: Taste, index: number) => (
            <span key={taste.id} style={{
              display: 'inline-flex',
              alignItems: 'center',
              backgroundColor: '#f0f0f0',
              padding: '4px 12px',
              borderRadius: '16px',
              fontSize: '14px'
            }}>
              {taste.emoji} {taste.name}
              {index < coffeeData.selectedTastes.length - 1 ? ',' : ''}
            </span>
          ))}
        </div>
        <p className='subtitle' style={{
          fontSize: '14px',
          color: '#666',
          marginBottom: '16px'
        }}>최대 2개까지 선택하세요</p>
        
        <div className='feeling-preview' style={{
          padding: '16px',
          margin: '16px 0',
          backgroundColor: '#f8f8f8',
          borderRadius: '8px',
          minHeight: '60px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          fontSize: '16px',
          color: selectedFeelings.length > 0 ? '#333' : '#999',
          textAlign: 'center',
          lineHeight: '1.4'
        }}>
          {getDescription() || '느낌을 선택하면 여기에 표시됩니다'}
        </div>
        
        <div className='feeling-grid' style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(2, 1fr)',
          gap: '12px',
          marginTop: '16px'
        }}>
          {feelings.map(feeling => (
            <button
              key={feeling.id}
              className={`feeling-button ${selectedFeelings.includes(feeling.id) ? 'selected' : ''}`}
              onClick={() => toggleFeeling(feeling.id)}
              disabled={selectedFeelings.length >= 2 && !selectedFeelings.includes(feeling.id)}
              style={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                padding: '16px 8px',
                border: `2px solid ${selectedFeelings.includes(feeling.id) ? '#000' : '#ddd'}`,
                borderRadius: '12px',
                background: selectedFeelings.includes(feeling.id) ? '#f5f5f5' : 'white',
                cursor: (selectedFeelings.length >= 2 && !selectedFeelings.includes(feeling.id)) ? 'not-allowed' : 'pointer',
                opacity: (selectedFeelings.length >= 2 && !selectedFeelings.includes(feeling.id)) ? 0.6 : 1,
                transition: 'all 0.2s'
              }}
            >
              <span className='feeling-emoji' style={{
                fontSize: '32px',
                marginBottom: '8px'
              }}>{feeling.emoji}</span>
              <span className='feeling-name' style={{
                fontSize: '14px',
                color: '#333'
              }}>{feeling.name}</span>
            </button>
          ))}
        </div>
      </div>
      
      <button 
        className='next-button'
        disabled={selectedFeelings.length === 0}
        onClick={() => {
          const selectedFeelingObjects = selectedFeelings.map(id => 
            feelings.find(f => f.id === id)
          ).filter((f): f is Feeling => f !== undefined);
          
          navigate('/result', { 
            state: { 
              ...coffeeData, 
              selectedFeelings: selectedFeelingObjects,
              description: getDescription()
            } 
          });
        }}
        style={{
          position: 'fixed',
          bottom: '20px',
          left: '20px',
          right: '20px',
          padding: '16px',
          backgroundColor: selectedFeelings.length > 0 ? '#000' : '#ccc',
          color: 'white',
          border: 'none',
          borderRadius: '8px',
          fontSize: '16px',
          cursor: selectedFeelings.length > 0 ? 'pointer' : 'not-allowed'
        }}
      >
        완료
      </button>
    </div>
  );
}

export default FeelingSelectPage;
