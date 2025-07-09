import { useNavigate } from 'react-router-dom';
import { useState, ChangeEvent, FormEvent } from 'react';
import styled from 'styled-components';
import Layout from '../components/Layout';
import { useCoffee } from '../context/CoffeeContext';
import { RoastLevel } from '../types/Coffee';

const CoffeeInputPage = () => {
  const navigate = useNavigate();
  const { saveCoffee, currentCoffee } = useCoffee();
  
  const [formData, setFormData] = useState({
    name: currentCoffee?.name || '',
    origin: currentCoffee?.origin || '',
    roastLevel: currentCoffee?.roastLevel || 'medium' as RoastLevel,
  });

  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    saveCoffee(formData);
    navigate('/roaster-notes');
  };

  return (
    <Layout>
      <Title>커피 정보 입력</Title>
      <Form onSubmit={handleSubmit}>
        <FormGroup>
          <Label>커피 이름</Label>
          <Input 
            type="text" 
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
            placeholder="예: 에티오피아 시다모"
          />
        </FormGroup>
        
        <FormGroup>
          <Label>원산지</Label>
          <Input 
            type="text" 
            name="origin"
            value={formData.origin}
            onChange={handleChange}
            required
            placeholder="예: 에티오피아"
          />
        </FormGroup>
        
        <FormGroup>
          <Label>로스팅 정도</Label>
          <Select 
            name="roastLevel"
            value={formData.roastLevel}
            onChange={handleChange}
          >
            <option value="light">라이트 로스트</option>
            <option value="medium">미디엄 로스트</option>
            <option value="dark">다크 로스트</option>
          </Select>
        </FormGroup>
        
        <ButtonGroup>
          <Button type="button" onClick={() => navigate(-1)} secondary>
            이전
          </Button>
          <Button type="submit" disabled={!formData.name || !formData.origin}>
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

const Input = styled.input`
  width: 100%;
  padding: 14px;
  border: 1px solid #ddd;
  border-radius: 8px;
  font-size: 16px;
  transition: border-color 0.2s;
  
  &:focus {
    outline: none;
    border-color: var(--primary);
  }
`;

const Select = styled.select`
  width: 100%;
  padding: 14px;
  border: 1px solid #ddd;
  border-radius: 8px;
  font-size: 16px;
  background-color: white;
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
  
  &:disabled {
    background-color: #cccccc;
    cursor: not-allowed;
  }
`;

export default CoffeeInputPage;
