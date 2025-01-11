import React, { useState } from 'react';
import styled from 'styled-components';
import { FaSearch, FaBell, FaUser } from 'react-icons/fa';
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
  width: 100%;
  border: none;
  outline: none;
  padding: 10px;
  font-size: 1rem;
  background-color: #f5f5f5;
`;

const IconContainer = styled.div`
  display: flex;
  gap: 20px;
  font-size: 1.4rem;
  margin-right: 5px;
`;

const BellIconButton = styled.button`
  border: none;
  background: none;
  cursor: pointer;
  padding: 6px;
  border-radius: 20%;
  transition: background-color 0.3s;

  &:hover {
    background-color: #ececec;
  }
`;

const IconButton = styled.button`
  border: none;
  background: none;
  cursor: pointer;
  padding: 5px;
  border-radius: 20%;
  transition: background-color 0.3s;

  &:hover {
    background-color: #ececec;
  }
`;

const SearchBar = () => {
  const [searchText, setSearchText] = useState('');
  const navigate = useNavigate();

  const handleSearch = () => {
    if (searchText.trim()) {
      navigate('/search');
    }
  };

  return (
    <SearchBarContainer>
      <Logo src="/src/img/Logo.png" alt="Logo" />
      <SearchInputWrapper>
        <IconButton onClick={handleSearch}>
          <FaSearch style={{ marginRight: '10px' }} />
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
        <BellIconButton>
          <FaBell />
        </BellIconButton>
        <IconButton>
          <FaUser />
        </IconButton>
      </IconContainer>
    </SearchBarContainer>
  );
};

export default SearchBar;
