import React, { useState } from 'react';
import { FaTimes, FaImage, FaMusic, FaYoutube } from 'react-icons/fa';
import SearchBar from '../components/SearchBar';
import {
  SearchResultContainer,
  Hashtag,
  CenteredImage,
  HashtagContainer,
  FixedSearchBar,
} from '../styles/SearchResultStyles';
import SearchResultImage from '../img/SearchResultImage.png';

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
            style={{
              backgroundColor: tag.active ? 'black' : '#F5F5F5',
              color: tag.active ? 'white' : 'black',
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
              borderRadius: '12px',
            }}
          >
            {tag.icon} {tag.label} {tag.active && <FaTimes size={14} />}
          </Hashtag>
        ))}
      </HashtagContainer>

      <CenteredImage src={SearchResultImage} alt="Search result" />
    </SearchResultContainer>
  );
};

export default SearchResult;
