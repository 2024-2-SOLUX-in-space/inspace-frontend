import React, { useState } from 'react';
import { FaTimes } from 'react-icons/fa';
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
  { id: 1, label: 'image', active: true },
  { id: 2, label: 'music', active: true },
  { id: 3, label: 'youtube', active: true },
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
            #{tag.label} {tag.active && <FaTimes />}
          </Hashtag>
        ))}
      </HashtagContainer>

      <CenteredImage src={SearchResultImage} alt="Search result" />
    </SearchResultContainer>
  );
};

export default SearchResult;
