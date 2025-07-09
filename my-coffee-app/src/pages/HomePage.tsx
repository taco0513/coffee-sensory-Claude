import React from 'react';
import { useNavigate } from 'react-router-dom';
import '../App.css';

const HomePage: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className="app-container">
      <div className="page">
        <h1 className="title">오늘의 커피</h1>
        
        <div className="main-button-container">
          <button 
            className="main-button"
            onClick={() => navigate('/coffee-input')}
          >
            <span className="plus-icon">+</span>
            <span>새 커피 기록</span>
          </button>
        </div>
        
        <div className="recent-section">
          <h2>최근 기록</h2>
          <div className="recent-item">
            <span>에티오피아 예가체프</span>
            <span>85%</span>
          </div>
          <div className="recent-item">
            <span>콜롬비아 수프리모</span>
            <span>72%</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomePage;
