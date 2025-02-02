// App.jsx
import React from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  useLocation,
} from "react-router-dom";
import { AlertProvider } from "./context/AlertContext";
import { UserProvider } from "./context/UserContext";
import { SidebarProvider, useSidebar } from "./context/SidebarContext"; 
import { ItemProvider } from "./context/ItemContext";
import { Provider } from 'react-redux';
import store from './redux/store';
import GlobalStyle from "./styles/GlobalStyle";
import StartPage from "./pages/StartPage";
import SignUpPage from "./pages/user/SignUpPage";
import LogInPage from "./pages/user/LogInPage";
import ForgotPasswordPage from "./pages/user/ForgotPasswordPage";
import MenuSidebar from "./pages/MenuSidebar";
import Home from "./pages/home/Home";
import MyPage from "./pages/user/MyPage";
import EditMyPage from "./pages/user/EditMyPage";
import SearchResult from "./pages/search/SearchResultPage";


function App() {
  return (
    <Provider store={store}>
    <UserProvider>
      <AlertProvider>
        <SidebarProvider> 
            <ItemProvider>
            <Router>
              <GlobalStyle />
              <SidebarWrapper />
              <Routes>
                <Route path="/" element={<StartPage />} />
                <Route path="/signup" element={<SignUpPage />} />
                <Route path="/login" element={<LogInPage />} />
                <Route path="/forgot-password" element={<ForgotPasswordPage />} />
                <Route path="/home" element={<Home />} />
                <Route path="/menusidebar" element={<MenuSidebar />} />
                <Route path="/search" element={<SearchResult />} />
                <Route path="/mypage" element={<MyPage />} />
                <Route path="/mypage-edit" element={<EditMyPage />} />
              </Routes>
            </Router>
            </ItemProvider>
        </SidebarProvider>
      </AlertProvider>
    </UserProvider>
    </Provider>
  );
}

function SidebarWrapper() {
  const location = useLocation();
  const {
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
  } = useSidebar(); 

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