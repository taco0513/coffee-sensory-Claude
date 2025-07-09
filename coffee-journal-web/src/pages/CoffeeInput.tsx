import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import styled from 'styled-components';

const CoffeeInput = () => {
  const navigate = useNavigate();
  const [coffee, setCoffee] = useState({
    name: '',
    origin: '',
    roastLevel: 'medium',
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Save to local storage
    localStorage.setItem('currentCoffee', JSON.stringify(coffee));
    navigate('/roaster-notes');
  };

  return (
    <div className="container">
      <h1 className="page-title">커피 정보 입력</h1>
      <Form onSubmit={handleSubmit}>
        <FormGroup>
          <Label>커피 이름</Label>
          <Input 
            type="text" 
            value={coffee.name}
            onChange={(e) => setCoffee({...coffee, name: e.target.value})}
            required
            placeholder="예: 에티오피아 시다모"
          />
        </FormGroup>
        
        <FormGroup>
          <Label>원산지</Label>
          <Input 
            type="text" 
            value={coffee.origin}
            onChange={(e) => setCoffee({...coffee, origin: e.target.value})}
            required
            placeholder="예: 에티오피아"
          />
        </FormGroup>
        
        <FormGroup>
          <Label>로스팅 정도</Label>
          <Select 
            value={coffee.roastLevel}
            onChange={(e) => setCoffee({...coffee, roastLevel: e.target.value})}
          >
            <option value="light">라이트 로스트</option>
            <option value="medium">미디엄 로스트</option>
            <option value="dark">다크 로스트</option>
          </Select>
        </FormGroup>
        
        <Button type="submit">다음</Button>
      </Form>
    </div>
  );
};

const Form = styled.form`
  width: 100%;
  max-width: 320px;
`;

const FormGroup = styled.div`
  margin-bottom: 20px;
  width: 100%;
`;

const Label = styled.label`
  display: block;
  margin-bottom: 8px;
  font-weight: 500;
`;

const Input = styled.input`
  width: 100%;
  padding: 12px;
  border: 1px solid #ddd;
  border-radius: 8px;
  font-size: 16px;
`;

const Select = styled.select`
  width: 100%;
  padding: 12px;
  border: 1px solid #ddd;
  border-radius: 8px;
  font-size: 16px;
  background-color: white;
`;

const Button = styled.button`
  margin-top: 20px;
  padding: 16px;
  font-size: 18px;
`;

export default CoffeeInput;
