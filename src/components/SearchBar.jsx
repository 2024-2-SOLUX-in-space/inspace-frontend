import React, { useState } from 'react';
import styled from 'styled-components';
import { FiSearch, FiBell, FiUser } from "react-icons/fi";
import { useNavigate } from 'react-router-dom';

const SearchBarContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 15px 20px;
  background-color: #fff;
  border-bottom: 1px solid #ddd;
`;

const Logo = styled.img`
  height: 40px;
  padding-left: 10px;
`;

const SearchInputWrapper = styled.div`
  flex: 1.2;
  display: flex;
  align-items: center;
  margin: 0 30px;
  border-radius: 20px;
  padding: 10px 10px;
  background-color: #f5f5f5;
`;

const SearchInput = styled.input`
  flex: 1;
  border: none;
  outline: none;
  padding: 10px;
  font-size: 1.2rem;
  background-color: #f5f5f5;
`;

const IconContainer = styled.div`
  display: flex;
  gap: 20px;
  margin-right: 30px;
`;

const IconButton = styled.button`
  border: none;
  background: none;
  cursor: pointer;
  padding: 10px;
  border-radius: 20%;
  transition: background-color 0.3s;
  outline: none;
  background-color: ${props => props.isSelected ? '#ececec' : 'transparent'};

  &:hover {
    background-color: #ececec;
  }

  &:focus {
    outline: none;
  }
`;

const SearchBar = () => {
  const [searchText, setSearchText] = useState('');
  const [isBellFilled, setIsBellFilled] = useState(false);
  const [isUserFilled, setIsUserFilled] = useState(false);
  const [isSearchFilled, setIsSearchFilled] = useState(false);
  const navigate = useNavigate();

  const handleSearch = () => {
    setIsSearchFilled(!isSearchFilled);
    if (searchText.trim()) {
      navigate('/search');
    }
  };

  //마이페이지 이동 로직
  const handleUserClick = () => {
    setIsUserFilled(!isUserFilled);
    //navigate('/mypage');
  };

  return (
    <SearchBarContainer>
      <Logo src="/src/img/Logo.png" alt="Logo" />
      <SearchInputWrapper>
        <IconButton 
          onClick={handleSearch} 
          isSelected={isSearchFilled}
        >
          <FiSearch 
            size={24} 
            style={{ marginRight: '10px' }} 
            fill={isSearchFilled ? 'currentColor' : 'none'} 
          />
        </IconButton>
        <SearchInput
          type="text"
          placeholder="검색어를 입력하세요..."
          value={searchText}
          onChange={(e) => setSearchText(e.target.value)}
          onKeyPress={(e) => e.key === 'Enter' && handleSearch()}
        />
      </SearchInputWrapper>
      <IconContainer>
        <IconButton 
          onClick={() => setIsBellFilled(!isBellFilled)} 
          isSelected={isBellFilled}
        >
          <FiBell 
            size={32} 
            fill={isBellFilled ? 'currentColor' : 'none'} 
          />
        </IconButton>
        <IconButton 
          onClick={handleUserClick}
          isSelected={isUserFilled}
        >
          <FiUser 
            size={32} 
            fill={isUserFilled ? 'currentColor' : 'none'} 
          />
        </IconButton>
      </IconContainer>
    </SearchBarContainer>
  );
};

export default SearchBar;