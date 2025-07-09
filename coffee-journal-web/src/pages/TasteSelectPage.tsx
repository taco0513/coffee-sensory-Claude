import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import Layout from '../components/Layout';
import { useCoffee } from '../context/CoffeeContext';
import { TASTE_OPTIONS } from '../types/Coffee';

const TasteSelectPage = () => {
  const navigate = useNavigate();
  const { saveCoffee, currentCoffee } = useCoffee();
  
  const [selectedTastes, setSelectedTastes] = useState<string[]>(
    currentCoffee?.tastes || []
  );

  const toggleTaste = (id: string) => {
    setSelectedTastes(prev => 
      prev.includes(id)
        ? prev.filter(taste => taste !== id)
        : [...prev, id]
    );
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    saveCoffee({ tastes: selectedTastes });
    navigate('/feeling-select');
  };

  return (
    <Layout>
      <Title>맛 카테고리 선택</Title>
      <Form onSubmit={handleSubmit}>
        <Instruction>맛을 1개 이상 선택해주세요</Instruction>
        <TasteGrid>
          {TASTE_OPTIONS.map((taste) => (
            <TasteButton
              key={taste.id}
              type="button"
              selected={selectedTastes.includes(taste.id)}
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
          <Button 
            type="submit" 
            disabled={selectedTastes.length === 0}
          >
            다음
          </Button>
        </ButtonGroup>
      </Form>
    </Layout>
  );
};

const Title = styled.h1`
  font-size: 24px;
  margin-bottom: 10px;
  color: var(--primary);
  text-align: center;
`;

const Instruction = styled.p`
  text-align: center;
  margin-bottom: 20px;
  color: #666;
`;

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
  cursor: pointer;
  
  &:active {
    transform: scale(0.98);
  }
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
  border: none;
  border-radius: 8px;
  background-color: ${props => props.secondary ? '#f0f0f0' : 'var(--primary)'};
  color: ${props => props.secondary ? '#333' : 'white'};
  cursor: pointer;
  transition: opacity 0.2s;
  
  &:active {
    opacity: 0.8;
  }
  
  &:disabled {
    background-color: #cccccc;
    cursor: not-allowed;
  }
`;

export default TasteSelectPage;
