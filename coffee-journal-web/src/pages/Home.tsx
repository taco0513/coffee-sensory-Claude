import { useNavigate } from 'react-router-dom';
import { FaPlus } from 'react-icons/fa';
import styled from 'styled-components';
import Layout from '../components/Layout';

// Dummy data for recent entries
const recentEntries = [
  { id: 1, name: '에티오피아 시다마', score: 85, date: '오늘' },
  { id: 2, name: '콜롬비아 수프리모', score: 78, date: '어제' },
  { id: 3, name: '케냐 AA', score: 92, date: '2일 전' },
];

const Home = () => {
  const navigate = useNavigate();

  return (
    <Layout>
      <Container>
        <Header>
          <Title>오늘의 커피</Title>
        </Header>

        <MainContent>
          <AddButton onClick={() => navigate('/coffee-input')}>
            <PlusIcon>
              <FaPlus />
            </PlusIcon>
            <ButtonText>새 커피 기록</ButtonText>
          </AddButton>
        </MainContent>

        <RecentSection>
          <SectionTitle>최근 기록</SectionTitle>
          <EntryList>
            {recentEntries.map((entry) => (
              <EntryItem key={entry.id}>
                <EntryName>{entry.name}</EntryName>
                <EntryScore>{entry.score}%</EntryScore>
                <EntryDate>{entry.date}</EntryDate>
              </EntryItem>
            ))}
          </EntryList>
        </RecentSection>
      </Container>
    </Layout>
  );
};

const Container = styled.div`
  display: flex;
  flex-direction: column;
  height: 100%;
  padding: 20px;
`;

const Header = styled.header`
  margin-bottom: 40px;
`;

const Title = styled.h1`
  font-size: 28px;
  font-weight: 700;
  color: var(--primary);
  text-align: center;
  margin: 0;
`;

const MainContent = styled.main`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  flex: 1;
  margin: 20px 0;
`;

const AddButton = styled.button`
  width: 150px;
  height: 150px;
  border-radius: 50%;
  background: var(--primary);
  color: white;
  border: none;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.1);
  transition: transform 0.2s, box-shadow 0.2s;
  margin-bottom: 40px;
  
  &:active {
    transform: scale(0.98);
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  }
`;

const PlusIcon = styled.div`
  font-size: 48px;
  line-height: 1;
  margin-bottom: 8px;
`;

const ButtonText = styled.span`
  font-size: 16px;
  font-weight: 500;
`;

const RecentSection = styled.section`
  width: 100%;
`;

const SectionTitle = styled.h2`
  font-size: 18px;
  font-weight: 600;
  color: var(--text);
  margin-bottom: 16px;
`;

const EntryList = styled.ul`
  list-style: none;
  padding: 0;
  margin: 0;
  background: white;
  border-radius: 12px;
  overflow: hidden;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.05);
`;

const EntryItem = styled.li`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 16px;
  border-bottom: 1px solid var(--border);
  
  &:last-child {
    border-bottom: none;
  }
`;

const EntryName = styled.span`
  flex: 1;
  font-weight: 500;
`;

const EntryScore = styled.span`
  color: var(--primary);
  font-weight: 600;
  margin: 0 12px;
`;

const EntryDate = styled.span`
  color: var(--text-light);
  font-size: 14px;
`;

export default Home;
