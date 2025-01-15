// App.jsx

import React from 'react';
import {
  BrowserRouter as Router,
  Routes,
  Route,
  useLocation,
} from 'react-router-dom';
import { useState } from 'react';
import { AlertProvider } from './context/AlertContext';
import { ThemeProvider } from 'styled-components';
import GlobalStyle from './styles/GlobalStyle';
import LandingPage from './pages/LandingPage';
import SignUpPage from './pages/SignUpPage';
import LogInPage from './pages/LogInPage';
import ForgotPasswordPage from './pages/ForgotPasswordPage';
import MenuSidebar from './components/MenuSidebar';
import Home from './pages/Home';
import MyPage from './pages/MyPage';
import SearchResult from './pages/SearchResult';

function App() {
  const [isArchiveOpen, setIsArchiveOpen] = useState(false);

  return (
    <AlertProvider>
      <Router>
        <GlobalStyle />
        <SidebarWrapper
          isArchiveOpen={isArchiveOpen}
          toggleArchive={setIsArchiveOpen}
        />
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/signup" element={<SignUpPage />} />
          <Route path="/login" element={<LogInPage />} />
          <Route path="/forgot-password" element={<ForgotPasswordPage />} />
          <Route path="/home" element={<Home />} />
          <Route path="/search" element={<SearchResult />} />
        </Routes>
      </Router>
    </AlertProvider>
  );
}

export default App;

function SidebarWrapper({ isArchiveOpen, toggleArchive }) {
  const location = useLocation();

  const hideSidebarPaths = ['/', '/signup', '/login', '/forgot-password'];
  const shouldHideSidebar = hideSidebarPaths.includes(location.pathname);

  if (shouldHideSidebar) return null;

  return (
    <MenuSidebar
      isArchiveOpen={isArchiveOpen}
      toggleArchive={() => toggleArchive((prev) => !prev)}
    />
  );
}
