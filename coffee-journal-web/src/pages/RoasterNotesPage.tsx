import { useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import styled from 'styled-components';
import Layout from '../components/Layout';
import { useCoffee } from '../context/CoffeeContext';

const RoasterNotesPage = () => {
  const navigate = useNavigate();
  const { saveCoffee, currentCoffee } = useCoffee();
  const [notes, setNotes] = useState(currentCoffee?.roasterNotes || '');

  useEffect(() => {
    // Load any existing notes when component mounts
    if (currentCoffee?.roasterNotes) {
      setNotes(currentCoffee.roasterNotes);
    }
  }, [currentCoffee?.roasterNotes]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    saveCoffee({ roasterNotes: notes });
    navigate('/taste-select');
  };

  return (
    <Layout>
      <Title>로스터 노트</Title>
      <Form onSubmit={handleSubmit}>
        <FormGroup>
          <Label>로스터의 노트를 입력해주세요</Label>
          <TextArea 
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
            placeholder="예: 상큼한 레몬, 다크 초콜릿, 캐러멜의 단맛이 느껴집니다."
            rows={8}
          />
        </FormGroup>
        
        <ButtonGroup>
          <Button type="button" onClick={() => navigate(-1)} secondary>
            이전
          </Button>
          <Button type="submit">
            다음
          </Button>
        </ButtonGroup>
      </Form>
    </Layout>
  );
};

const Title = styled.h1`
  font-size: 24px;
  margin-bottom: 30px;
  color: var(--primary);
  text-align: center;
`;

const Form = styled.form`
  width: 100%;
  max-width: 400px;
`;

const FormGroup = styled.div`
  margin-bottom: 20px;
  width: 100%;
`;

const Label = styled.label`
  display: block;
  margin-bottom: 8px;
  font-weight: 500;
  color: #333;
`;

const TextArea = styled.textarea`
  width: 100%;
  padding: 14px;
  border: 1px solid #ddd;
  border-radius: 8px;
  font-size: 16px;
  resize: none;
  font-family: inherit;
  transition: border-color 0.2s;
  
  &:focus {
    outline: none;
    border-color: var(--primary);
  }
`;

const ButtonGroup = styled.div`
  display: flex;
  gap: 10px;
  margin-top: 30px;
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
`;

export default RoasterNotesPage;
