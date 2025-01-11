import React, { useState } from 'react';
import { FaTimes, FaImage, FaMusic, FaYoutube } from 'react-icons/fa';
import SearchBar from '../components/SearchBar';
import styled from 'styled-components';

const images = [
  '/src/img/Dummy/image_1.png',
  '/src/img/Dummy/image_2.png',
  '/src/img/Dummy/image_3.png',
  '/src/img/Dummy/image_4.png',
  '/src/img/Dummy/image_5.png',
  '/src/img/Dummy/image_6.png',
  '/src/img/Dummy/image_7.png',
  '/src/img/Dummy/image_8.png',
  '/src/img/Dummy/image_9.png',
  '/src/img/Dummy/image_10.png',
  '/src/img/Dummy/image_11.png',
  '/src/img/Dummy/image_12.png',
  '/src/img/Dummy/image_13.png',
  '/src/img/Dummy/image_14.png',
  '/src/img/Dummy/image_15.png',
  '/src/img/Dummy/image_16.png',
  '/src/img/Dummy/image_17.png',
  '/src/img/Dummy/image_18.png',
  '/src/img/Dummy/image_19.png',
  '/src/img/Dummy/image_20.png',
  '/src/img/Dummy/image_21.png',
  '/src/img/Dummy/image_22.png',
  '/src/img/Dummy/image_23.png',
  '/src/img/Dummy/image_24.png',
  '/src/img/Dummy/image_25.png',
  '/src/img/Dummy/image_26.png',
  '/src/img/Dummy/image_27.png',
  '/src/img/Dummy/image_28.png',
  '/src/img/Dummy/image_29.png',
  '/src/img/Dummy/image_30.png',
];

const SearchResultContainer = styled.div`
  padding: 20px;
  overflow-y: auto;
  height: 100vh;
`;

const HashtagContainer = styled.div`
  position: fixed;
  top: 100px;
  left: 0;
  width: 100%;
  height: 10%;
  display: flex;
  gap: 10px;
  padding: 10px 20px;
  background: white;
  z-index: 9;
  box-shadow: 0px 2px 5px rgba(0, 0, 0, 0.1);
`;

const Hashtag = styled.div`
  cursor: pointer;
  padding: 10px;
  border-radius: 20px;
  background-color: ${(props) => (props.active ? 'black' : '#F5F5F5')};
  color: ${(props) => (props.active ? 'white' : 'black')};
  display: flex;
  align-items: center;
  gap: 8px;
`;

const FixedSearchBar = styled.div`
  position: fixed;
  top: 0;
  width: 100%;
  background: white;
  z-index: 10;
  padding: 10px 0;
`;

const MasonryGrid = styled.div`
  column-count: 5;
  column-gap: 10px;
  margin-top: 160px;
`;

const GridItem = styled.div`
  break-inside: avoid;
  margin-bottom: 10px;
`;

const initialHashtags = [
  { id: 1, label: 'image', icon: <FaImage size={16} />, active: true },
  { id: 2, label: 'music', icon: <FaMusic size={16} />, active: true },
  { id: 3, label: 'youtube', icon: <FaYoutube size={16} />, active: true },
];

const SearchResult = () => {
  const [hashtags, setHashtags] = useState(initialHashtags);

  const handleHashtagClick = (id) => {
    setHashtags(
      hashtags.map((tag) =>
        tag.id === id ? { ...tag, active: !tag.active } : tag,
      ),
    );
  };

  return (
    <SearchResultContainer>
      <FixedSearchBar>
        <SearchBar />
      </FixedSearchBar>

      <HashtagContainer>
        {hashtags.map((tag) => (
          <Hashtag
            key={tag.id}
            active={tag.active}
            onClick={() => handleHashtagClick(tag.id)}
          >
            {tag.icon} {tag.label} {tag.active && <FaTimes size={14} />}
          </Hashtag>
        ))}
      </HashtagContainer>

      {/* Pinterest-Style Masonry Layout */}
      <MasonryGrid>
        {images.map((src, index) => (
          <GridItem key={index}>
            <img
              src={src}
              alt={`Image ${index + 1}`}
              style={{ width: '100%', borderRadius: '8px' }}
            />
          </GridItem>
        ))}
      </MasonryGrid>
    </SearchResultContainer>
  );
};

export default SearchResult;
