import { BrowserRouter, Routes, Route } from 'react-router-dom';
import HomePage from './pages/HomePage';
import CoffeeInputPage from './pages/CoffeeInputPage';
import RoasterNotesPage from './pages/RoasterNotesPage';
import TasteSelectPage from './pages/TasteSelectPage';
import FeelingSelectPage from './pages/FeelingSelectPage';
import ResultPage from './pages/ResultPage';
import './App.css';

function App() {
  return (
    <BrowserRouter>
      <div className="app-container">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/coffee-input" element={<CoffeeInputPage />} />
          <Route path="/roaster-notes" element={<RoasterNotesPage />} />
          <Route path="/taste-select" element={<TasteSelectPage />} />
          <Route path="/feeling-select" element={<FeelingSelectPage />} />
          <Route path="/result" element={<ResultPage />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
