import { useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import styled from 'styled-components';
import Layout from '../components/Layout';
import { useCoffee } from '../context/CoffeeContext';
import type { Coffee } from '../types/Coffee';
import { TASTE_OPTIONS, FEELING_OPTIONS } from '../types/Coffee';

const ResultPage = () => {
  const navigate = useNavigate();
  const { currentCoffee, submitCoffee, clearCurrentCoffee } = useCoffee();
  const [coffee, setCoffee] = useState<Coffee | null>(null);

  useEffect(() => {
    if (!currentCoffee || !currentCoffee.name || !currentCoffee.origin) {
      navigate('/');
      return;
    }
    
    // When the component mounts, save the coffee entry
    const savedCoffee = submitCoffee();
    if (savedCoffee) {
      setCoffee(savedCoffee);
    } else {
      // If no coffee was saved, navigate back to home
      navigate('/');
    }
  }, [currentCoffee, navigate, submitCoffee]);

  const handleNewTasting = () => {
    clearCurrentCoffee();
    navigate('/');
  };

  if (!coffee) {
    return (
      <Layout>
        <p>데이터를 불러오는 중입니다...</p>
      </Layout>
    );
  }

  // Helper functions to get display names
  const getTasteName = (id: string) => {
    const taste = TASTE_OPTIONS.find(t => t.id === id);
    return taste ? taste.name : id;
  };

  const getFeelingName = (id: string) => {
    const feeling = FEELING_OPTIONS.find(f => f.id === id);
    return feeling ? feeling.name : id;
  };

  const getRoastLevelName = (level: string) => {
    switch(level) {
      case 'light': return '라이트 로스트';
      case 'medium': return '미디엄 로스트';
      case 'dark': return '다크 로스트';
      default: return level;
    }
  };

  return (
    <Layout>
      <Title>테이스팅 완료!</Title>
      <ResultCard>
        <CoffeeName>{coffee.name}</CoffeeName>
        
        <DetailItem>
          <DetailLabel>원산지</DetailLabel>
          <DetailValue>{coffee.origin}</DetailValue>
        </DetailItem>
        
        <DetailItem>
          <DetailLabel>로스팅 정도</DetailLabel>
          <DetailValue>{getRoastLevelName(coffee.roastLevel)}</DetailValue>
        </DetailItem>
        
        <Section>
          <SectionTitle>로스터 노트</SectionTitle>
          <Notes>{coffee.roasterNotes || '로스터 노트가 없습니다.'}</Notes>
        </Section>
        
        <Section>
          <SectionTitle>선택한 맛 카테고리</SectionTitle>
          <Tags>
            {coffee.tastes.length > 0 ? (
              coffee.tastes.map(taste => (
                <Tag key={taste}>{getTasteName(taste)}</Tag>
              ))
            ) : (
              <NoSelection>선택한 맛 카테고리가 없습니다.</NoSelection>
            )}
          </Tags>
        </Section>
        
        <Section>
          <SectionTitle>느낌 태그</SectionTitle>
          <Tags>
            {coffee.feelings.length > 0 ? (
              coffee.feelings.map(feeling => (
                <Tag key={feeling}>{getFeelingName(feeling)}</Tag>
              ))
            ) : (
              <NoSelection>선택한 느낌 태그가 없습니다.</NoSelection>
            )}
          </Tags>
        </Section>
        
        <DetailItem>
          <DetailLabel>테이스팅 일시</DetailLabel>
          <DetailValue>{new Date(coffee.createdAt).toLocaleString()}</DetailValue>
        </DetailItem>
      </ResultCard>
      
      <Button onClick={handleNewTasting}>
        새로운 테이스팅 시작하기
      </Button>
    </Layout>
  );
};

const Title = styled.h1`
  font-size: 24px;
  margin-bottom: 20px;
  color: var(--primary);
  text-align: center;
`;

const ResultCard = styled.div`
  background: white;
  border-radius: 12px;
  padding: 20px;
  width: 100%;
  max-width: 400px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  margin-bottom: 20px;
`;

const CoffeeName = styled.h2`
  font-size: 22px;
  color: var(--primary);
  margin-bottom: 20px;
  text-align: center;
`;

const DetailItem = styled.div`
  margin-bottom: 15px;
`;

const DetailLabel = styled.span`
  font-weight: 500;
  color: #666;
  margin-right: 8px;
`;

const DetailValue = styled.span`
  color: #333;
`;

const Section = styled.div`
  margin: 20px 0;
  padding-top: 15px;
  border-top: 1px solid #eee;
`;

const SectionTitle = styled.h3`
  font-size: 16px;
  color: #666;
  margin-bottom: 10px;
`;

const Notes = styled.div`
  background: #f9f9f9;
  padding: 12px;
  border-radius: 8px;
  line-height: 1.5;
  color: #333;
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

const NoSelection = styled.p`
  color: #999;
  font-style: italic;
`;

const Button = styled.button`
  width: 100%;
  max-width: 400px;
  padding: 16px 24px;
  font-size: 16px;
  background-color: var(--primary);
  color: white;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  transition: opacity 0.2s;
  
  &:active {
    opacity: 0.8;
  }
`;

export default ResultPage;
