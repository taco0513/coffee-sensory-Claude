import { useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import styled from 'styled-components';

const RoasterNotes = () => {
  const navigate = useNavigate();
  const [notes, setNotes] = useState('');

  useEffect(() => {
    // Load any existing notes from local storage
    const savedNotes = localStorage.getItem('roasterNotes');
    if (savedNotes) {
      setNotes(savedNotes);
    }
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    localStorage.setItem('roasterNotes', notes);
    navigate('/taste-select');
  };

  return (
    <div className="container">
      <h1 className="page-title">로스터 노트</h1>
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
          <Button type="submit">다음</Button>
        </ButtonGroup>
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

const TextArea = styled.textarea`
  width: 100%;
  padding: 12px;
  border: 1px solid #ddd;
  border-radius: 8px;
  font-size: 16px;
  resize: none;
  font-family: inherit;
`;

const ButtonGroup = styled.div`
  display: flex;
  gap: 10px;
  width: 100%;
`;

const Button = styled.button<{ secondary?: boolean }>`
  flex: 1;
  padding: 16px;
  font-size: 16px;
  background-color: ${props => props.secondary ? '#f0f0f0' : 'var(--primary)'};
  color: ${props => props.secondary ? '#333' : 'white'};
  border: ${props => props.secondary ? '1px solid #ddd' : 'none'};
`;

export default RoasterNotes;
