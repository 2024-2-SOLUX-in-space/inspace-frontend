import { useState } from 'react'
import GlobalStyle from './styles/GlobalStyle'
import { ThemeProvider } from 'styled-components'
import MenuSidebar from './components/MenuSidebar';
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import SearchResult from './pages/SearchResult';

function App() {
  const [isHomeOpen, setIsHomeOpen] = useState(false);
  const [isArchiveOpen, setIsArchiveOpen] = useState(false);
  const [isAddButtonOpen, setIsAddButtonOpen] = useState(false);
  const [isEditOpen, setIsEditOpen] = useState(false);
  const [isHeartOpen, setIsHeartOpen] = useState(false);

  return (
    <Router>
      <GlobalStyle />
      <div>
        <MenuSidebar 
          isHomeOpen = {isHomeOpen}
          toggleHome = {() => setIsHomeOpen( (prev) => !prev)}

          isArchiveOpen = {isArchiveOpen}
          toggleArchive={() => setIsArchiveOpen((prev) => !prev)}

          isAddButtonOpen = {isAddButtonOpen}
          toggleAddButton={() => setIsAddButtonOpen((prev) => !prev)}

          isEditOpen = {isEditOpen}
          toggleEdit = { () => setIsEditOpen( (prev) => !prev)}
        
          isHeartOpen = {isHeartOpen} 
          toggleHeart = { () => setIsHeartOpen( (prev) => !prev)}
        />
      </div>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/search" element={<SearchResult />} />
      </Routes>

    </Router>
  );
}

export default App;
