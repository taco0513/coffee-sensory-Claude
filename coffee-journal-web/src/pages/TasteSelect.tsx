import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import styled from 'styled-components';

type Taste = {
  id: string;
  name: string;
  selected: boolean;
};

const TasteSelect = () => {
  const navigate = useNavigate();
  const [tastes, setTastes] = useState<Taste[]>([
    { id: 'sweet', name: '단맛', selected: false },
    { id: 'sour', name: '신맛', selected: false },
    { id: 'bitter', name: '쓴맛', selected: false },
    { id: 'salty', name: '짠맛', selected: false },
    { id: 'umami', name: '감칠맛', selected: false },
    { id: 'fruity', name: '과일', selected: false },
    { id: 'floral', name: '꽃향기', selected: false },
    { id: 'nutty', name: '견과류', selected: false },
    { id: 'chocolate', name: '초콜릿', selected: false },
    { id: 'caramel', name: '캐러멜', selected: false },
  ]);

  const toggleTaste = (id: string) => {
    setTastes(tastes.map(taste => 
      taste.id === id ? { ...taste, selected: !taste.selected } : taste
    ));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const selectedTastes = tastes.filter(t => t.selected).map(t => t.id);
    localStorage.setItem('selectedTastes', JSON.stringify(selectedTastes));
    navigate('/feeling-select');
  };

  return (
    <div className="container">
      <h1 className="page-title">맛 카테고리 선택</h1>
      <Form onSubmit={handleSubmit}>
        <TasteGrid>
          {tastes.map((taste) => (
            <TasteButton
              key={taste.id}
              type="button"
              selected={taste.selected}
              onClick={() => toggleTaste(taste.id)}
            >
              {taste.name}
            </TasteButton>
          ))}
        </TasteGrid>
        
        <ButtonGroup>
          <Button type="button" onClick={() => navigate(-1)} secondary>
            이전
          </Button>
          <Button type="submit" disabled={!tastes.some(t => t.selected)}>
            다음
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

const TasteGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 10px;
  margin-bottom: 20px;
`;

const TasteButton = styled.button<{ selected: boolean }>`
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

export default TasteSelect;
