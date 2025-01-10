import { useState } from 'react'
import GlobalStyle from './styles/GlobalStyle'
import { ThemeProvider } from 'styled-components'
import MenuSidebar from './components/MenuSidebar';
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';

function App() {
  const [isArchiveOpen, setIsArchiveOpen] = useState(false);

  return (
    <Router>
      <GlobalStyle />
      <div>
        <MenuSidebar 
          isArchiveOpen = {isArchiveOpen}
          toggleArchive={() => setIsArchiveOpen((prev) => !prev)}
        />
      </div>
      <Routes>
        <Route path="/" element={<Home />} />
      </Routes>

    </Router>
  );
}

export default App;
