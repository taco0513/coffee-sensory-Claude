import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import styled from 'styled-components';

type Feeling = {
  id: string;
  name: string;
  selected: boolean;
};

const FeelingSelect = () => {
  const navigate = useNavigate();
  const [feelings, setFeelings] = useState<Feeling[]>([
    { id: 'comfortable', name: '편안한', selected: false },
    { id: 'energetic', name: '활기찬', selected: false },
    { id: 'relaxed', name: '여유로운', selected: false },
    { id: 'focused', name: '집중되는', selected: false },
    { id: 'happy', name: '행복한', selected: false },
    { id: 'nostalgic', name: '추억에 잠기게 하는', selected: false },
    { id: 'sophisticated', name: '고급스러운', selected: false },
    { id: 'adventurous', name: '모험적인', selected: false },
  ]);

  const toggleFeeling = (id: string) => {
    setFeelings(feelings.map(feeling => 
      feeling.id === id ? { ...feeling, selected: !feeling.selected } : feeling
    ));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const selectedFeelings = feelings.filter(f => f.selected).map(f => f.id);
    localStorage.setItem('selectedFeelings', JSON.stringify(selectedFeelings));
    navigate('/result');
  };

  return (
    <div className="container">
      <h1 className="page-title">느낌 태그 선택</h1>
      <Form onSubmit={handleSubmit}>
        <FeelingGrid>
          {feelings.map((feeling) => (
            <FeelingButton
              key={feeling.id}
              type="button"
              selected={feeling.selected}
              onClick={() => toggleFeeling(feeling.id)}
            >
              {feeling.name}
            </FeelingButton>
          ))}
        </FeelingGrid>
        
        <ButtonGroup>
          <Button type="button" onClick={() => navigate(-1)} secondary>
            이전
          </Button>
          <Button 
            type="submit" 
            disabled={!feelings.some(f => f.selected)}
          >
            결과 보기
          </Button>
        </ButtonGroup>
      </Form>
    </div>
  );
};

const Form = styled.form`
  width: 100%;
  max-width: 400px;
`;

const FeelingGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 10px;
  margin-bottom: 20px;
`;

const FeelingButton = styled.button<{ selected: boolean }>`
  padding: 16px;
  border: 1px solid #ddd;
  border-radius: 8px;
  background-color: ${props => props.selected ? 'var(--primary)' : 'white'};
  color: ${props => props.selected ? 'white' : '#333'};
  font-size: 16px;
  transition: all 0.2s;
`;

const ButtonGroup = styled.div`
  display: flex;
  gap: 10px;
  margin-top: 20px;
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

export default FeelingSelect;
