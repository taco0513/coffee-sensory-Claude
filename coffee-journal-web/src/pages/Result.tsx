import { useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import styled from 'styled-components';

const Result = () => {
  const navigate = useNavigate();
  const [coffeeData, setCoffeeData] = useState<any>(null);
  const [selectedTastes, setSelectedTastes] = useState<string[]>([]);
  const [selectedFeelings, setSelectedFeelings] = useState<string[]>([]);
  const [roasterNotes, setRoasterNotes] = useState('');

  useEffect(() => {
    // Load all saved data from local storage
    const savedCoffee = localStorage.getItem('currentCoffee');
    const savedTastes = localStorage.getItem('selectedTastes');
    const savedFeelings = localStorage.getItem('selectedFeelings');
    const savedNotes = localStorage.getItem('roasterNotes');

    if (savedCoffee) setCoffeeData(JSON.parse(savedCoffee));
    if (savedTastes) setSelectedTastes(JSON.parse(savedTastes));
    if (savedFeelings) setSelectedFeelings(JSON.parse(savedFeelings));
    if (savedNotes) setRoasterNotes(savedNotes);
  }, []);

  const handleNewTasting = () => {
    // Clear the form data
    localStorage.removeItem('currentCoffee');
    localStorage.removeItem('selectedTastes');
    localStorage.removeItem('selectedFeelings');
    localStorage.removeItem('roasterNotes');
    
    // Navigate to home
    navigate('/');
  };

  if (!coffeeData) {
    return (
      <div className="container">
        <p>데이터를 불러오는 중입니다...</p>
        <Button onClick={() => navigate('/')}>홈으로 가기</Button>
      </div>
    );
  }

  // Map taste IDs to display names
  const tasteDisplayNames: { [key: string]: string } = {
    sweet: '단맛',
    sour: '신맛',
    bitter: '쓴맛',
    salty: '짠맛',
    umami: '감칠맛',
    fruity: '과일',
    floral: '꽃향기',
    nutty: '견과류',
    chocolate: '초콜릿',
    caramel: '캐러멜',
  };

  // Map feeling IDs to display names
  const feelingDisplayNames: { [key: string]: string } = {
    comfortable: '편안한',
    energetic: '활기찬',
    relaxed: '여유로운',
    focused: '집중되는',
    happy: '행복한',
    nostalgic: '추억에 잠기게 하는',
    sophisticated: '고급스러운',
    adventurous: '모험적인',
  };

  return (
    <div className="container">
      <h1 className="page-title">테이스팅 결과</h1>
      
      <ResultCard>
        <h2>{coffeeData.name}</h2>
        <DetailItem>
          <strong>원산지:</strong> {coffeeData.origin}
        </DetailItem>
        <DetailItem>
          <strong>로스팅 정도:</strong> {
            coffeeData.roastLevel === 'light' ? '라이트 로스트' :
            coffeeData.roastLevel === 'medium' ? '미디엄 로스트' : '다크 로스트'
          }
        </DetailItem>
        
        <Section>
          <h3>로스터 노트</h3>
          <Notes>{roasterNotes || '로스터 노트가 없습니다.'}</Notes>
        </Section>
        
        <Section>
          <h3>선택한 맛 카테고리</h3>
          <Tags>
            {selectedTastes.length > 0 ? (
              selectedTastes.map(taste => (
                <Tag key={taste}>{tasteDisplayNames[taste] || taste}</Tag>
              ))
            ) : (
              <p>선택한 맛 카테고리가 없습니다.</p>
            )}
          </Tags>
        </Section>
        
        <Section>
          <h3>느낌 태그</h3>
          <Tags>
            {selectedFeelings.length > 0 ? (
              selectedFeelings.map(feeling => (
                <Tag key={feeling}>{feelingDisplayNames[feeling] || feeling}</Tag>
              ))
            ) : (
              <p>선택한 느낌 태그가 없습니다.</p>
            )}
          </Tags>
        </Section>
      </ResultCard>
      
      <ButtonGroup>
        <Button onClick={() => navigate(-1)} secondary>
          이전
        </Button>
        <Button onClick={handleNewTasting}>
          새로운 테이스팅 시작하기
        </Button>
      </ButtonGroup>
    </div>
  );
};

const ResultCard = styled.div`
  background: white;
  border-radius: 12px;
  padding: 20px;
  width: 100%;
  max-width: 400px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  margin-bottom: 20px;
  
  h2 {
    color: var(--primary);
    margin-bottom: 16px;
    font-size: 22px;
  }
`;

const DetailItem = styled.p`
  margin-bottom: 8px;
  font-size: 16px;
`;

const Section = styled.div`
  margin: 20px 0;
  
  h3 {
    font-size: 18px;
    margin-bottom: 10px;
    color: #555;
  }
`;

const Notes = styled.div`
  background: #f9f9f9;
  padding: 12px;
  border-radius: 8px;
  line-height: 1.5;
`;

const Tags = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
`;

const Tag = styled.span`
  background: var(--primary);
  color: white;
  padding: 6px 12px;
  border-radius: 16px;
  font-size: 14px;
`;

const ButtonGroup = styled.div`
  display: flex;
  gap: 10px;
  width: 100%;
  max-width: 400px;
`;

const Button = styled.button<{ secondary?: boolean }>`
  flex: 1;
  padding: 16px;
  font-size: 16px;
  background-color: ${props => props.secondary ? '#f0f0f0' : 'var(--primary)'};
  color: ${props => props.secondary ? '#333' : 'white'};
  border: ${props => props.secondary ? '1px solid #ddd' : 'none'};
  border-radius: 8px;
  
  &:disabled {
    background-color: #cccccc;
    cursor: not-allowed;
  }
`;

export default Result;
