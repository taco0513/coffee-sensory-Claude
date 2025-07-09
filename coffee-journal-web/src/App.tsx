import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { ThemeProvider, createGlobalStyle } from 'styled-components';
import { CoffeeProvider } from './context/CoffeeContext';
import Home from './pages/Home';
import CoffeeInput from './pages/CoffeeInput';
import RoasterNotes from './pages/RoasterNotes';
import TasteSelect from './pages/TasteSelect';
import FeelingSelect from './pages/FeelingSelect';
import Result from './pages/Result';

const theme = {
  colors: {
    primary: '#6F4E37', // Coffee brown
    secondary: '#F5F5DC', // Beige
    accent: '#D4A76A', // Light brown
    text: '#333333',
    lightText: '#FFFFFF',
    background: '#F9F6F0',
  },
  breakpoints: {
    mobile: '375px',
    tablet: '768px',
    desktop: '1024px',
  },
};

const GlobalStyle = createGlobalStyle`
  :root {
    --primary: ${theme.colors.primary};
    --secondary: ${theme.colors.secondary};
    --accent: ${theme.colors.accent};
    --text: ${theme.colors.text};
    --light-text: ${theme.colors.lightText};
    --background: ${theme.colors.background};
  }

  * {
    box-sizing: border-box;
    margin: 0;
    padding: 0;
    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, 
      Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
  }
  
  body {
    background-color: var(--background);
    color: var(--text);
    line-height: 1.5;
    max-width: 100vw;
    min-height: 100vh;
    overflow-x: hidden;
  }
  
  button {
    border: none;
    border-radius: 8px;
    font-size: 16px;
    cursor: pointer;
    transition: all 0.2s;
    touch-action: manipulation;
    
    &:active {
      transform: translateY(1px);
    }
    
    &:disabled {
      opacity: 0.6;
      cursor: not-allowed;
    }
  }
`;

function App() {
  return (
    <ThemeProvider theme={theme}>
      <GlobalStyle />
      <CoffeeProvider>
        <Router>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/coffee-input" element={<CoffeeInput />} />
            <Route path="/roaster-notes" element={<RoasterNotes />} />
            <Route path="/taste-select" element={<TasteSelect />} />
            <Route path="/feeling-select" element={<FeelingSelect />} />
            <Route path="/result" element={<Result />} />
            {/* Redirect any unknown paths to home */}
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </Router>
      </CoffeeProvider>
    </ThemeProvider>
  );
}

export default App;
