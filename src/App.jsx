// App.jsx
// App.jsx
import React, { useState } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  useLocation,
} from "react-router-dom";
import { AlertProvider } from "./context/AlertContext";
import { UserProvider } from "./context/UserContext";
import GlobalStyle from "./styles/GlobalStyle";
import StartPage from "./pages/StartPage";
import SignUpPage from "./pages/user/SignUpPage";
import LogInPage from "./pages/user/LogInPage";
import ForgotPasswordPage from "./pages/user/ForgotPasswordPage";
import MenuSidebar from "./pages/MenuSidebar";
import Home from "./pages/home/HomePage";
import MyPage from "./pages/user/MyPage";
import EditMyPage from "./pages/user/EditMyPage";
import SearchResult from "./pages/search/SearchResultPage";

function App() {
  const [isHomeOpen, setIsHomeOpen] = useState(false);
  const [isArchiveOpen, setIsArchiveOpen] = useState(false);
  const [isAddButtonOpen, setIsAddButtonOpen] = useState(false);
  const [isEditOpen, setIsEditOpen] = useState(false);
  const [isHeartOpen, setIsHeartOpen] = useState(false);

  return (
    <UserProvider>
      <AlertProvider>
        <Router>
          <GlobalStyle />
          <SidebarWrapper
            isHomeOpen={isHomeOpen}
            toggleHome={() => setIsHomeOpen((prev) => !prev)}
            isArchiveOpen={isArchiveOpen}
            toggleArchive={() => setIsArchiveOpen((prev) => !prev)}
            isAddButtonOpen={isAddButtonOpen}
            toggleAddButton={() => setIsAddButtonOpen((prev) => !prev)}
            isEditOpen={isEditOpen}
            toggleEdit={() => setIsEditOpen((prev) => !prev)}
            isHeartOpen={isHeartOpen}
            toggleHeart={() => setIsHeartOpen((prev) => !prev)}
          />
          <Routes>
            <Route path="/" element={<StartPage />} />
            <Route path="/signup" element={<SignUpPage />} />
            <Route path="/login" element={<LogInPage />} />
            <Route path="/forgot-password" element={<ForgotPasswordPage />} />
            <Route path="/home" element={<Home />} />
            <Route path="/search" element={<SearchResult />} />
            <Route path="/mypage" element={<MyPage />} />
            <Route path="/mypage-edit" element={<EditMyPage />} />
          </Routes>
        </Router>
      </AlertProvider>
    </UserProvider>
  );
}

function SidebarWrapper({
  isHomeOpen,
  toggleHome,
  isArchiveOpen,
  toggleArchive,
  isAddButtonOpen,
  toggleAddButton,
  isEditOpen,
  toggleEdit,
  isHeartOpen,
  toggleHeart,
}) {
  const location = useLocation();

  const hideSidebarPaths = [
    "/",
    "/signup",
    "/login",
    "/forgot-password",
    "/mypage",
    "/mypage-edit",
  ];
  const shouldHideSidebar = hideSidebarPaths.includes(location.pathname);

  if (shouldHideSidebar) return null;

  return (
    <MenuSidebar
      isHomeOpen={isHomeOpen}
      toggleHome={toggleHome}
      isArchiveOpen={isArchiveOpen}
      toggleArchive={toggleArchive}
      isAddButtonOpen={isAddButtonOpen}
      toggleAddButton={toggleAddButton}
      isEditOpen={isEditOpen}
      toggleEdit={toggleEdit}
      isHeartOpen={isHeartOpen}
      toggleHeart={toggleHeart}
    />
  );
}

export default App;
