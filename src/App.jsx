import { useState } from 'react';
import GlobalStyle from './styles/GlobalStyle';
import { ThemeProvider } from 'styled-components';
import MenuSidebar from './components/MenuSidebar';
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import MyPage from './pages/MyPage';
import SearchResult from './pages/SearchResult';

function App() {
  const [isArchiveOpen, setIsArchiveOpen] = useState(false);

  return (
    <Router>
      <GlobalStyle />
      <div>
        <MenuSidebar
          isArchiveOpen={isArchiveOpen}
          toggleArchive={() => setIsArchiveOpen((prev) => !prev)}
        />
      </div>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/search" element={<SearchResult />} />
        <Route path="/mypage" element={<MyPage />} />
      </Routes>
    </Router>
  );
}

export default App;
