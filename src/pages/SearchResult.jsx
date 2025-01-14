import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { FaTimes, FaImage, FaMusic, FaYoutube } from 'react-icons/fa';
import SearchBar from '../components/SearchBar';
import styled from 'styled-components';

const SearchResultContainer = styled.div`
  position: relative;
`;

const HashtagContainer = styled.div`
  width: 100%;
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
  padding: 10px 20px;
  background: white;
  min-height: 60px;
`;

const Hashtag = styled.div`
  cursor: pointer;
  padding: 10px 15px;
  border-radius: 20px;
  background-color: ${(props) => (props.active ? 'black' : '#F5F5F5')};
  color: ${(props) => (props.active ? 'white' : 'black')};
  display: flex;
  align-items: center;
  gap: 8px;
  white-space: nowrap;
`;

const FixedSearchBar = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  background: white;
  z-index: 10;
`;

const MasonryGrid = styled.div`
  column-count: 5;
  column-gap: 10px;
  margin-top: 100px;
  padding: 0 20px;
  width: 100%;
`;

const GridItem = styled.div`
  break-inside: avoid;
  margin-bottom: 10px;
  cursor: pointer;
`;

const DetailView = styled.div`
  position: fixed;
  right: 0;
  top: 0;
  height: 100vh;
  width: 50%;
  background: white;
  padding: 20px;
  z-index: 100;
  transform: ${(props) =>
    props.visible ? 'translateX(0)' : 'translateX(100%)'};
  transition: transform 0.3s ease-in-out;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  text-align: center;

  .image-container {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 20px;
  }

  .user-info {
    position: fixed;
    top: 50px;
    left: 40px;
    display: flex;
    flex-direction: row;
    align-items: center;
    gap: 20px;
    font-size: 1.5rem;
    color: black;
  }

  .title {
    font-size: 2rem;
    color: black;
  }

  img {
    max-width: 40%;
    border-radius: 10px;
  }

  .add-button {
    padding: 10px 20px;
    background: black;
    color: white;
    border: none;
    border-radius: 20px;
    cursor: pointer;
    width: 15%;
    font-size: 1.2rem;
    position: fixed;
    bottom: 20px;
    right: 20px;
  }
`;

const CloseButton = styled(FaTimes)`
  position: absolute;
  top: 10px;
  right: 10px;
  cursor: pointer;
`;

const initialHashtags = [
  { id: 1, label: 'image', icon: <FaImage size={16} />, active: true },
  { id: 2, label: 'music', icon: <FaMusic size={16} />, active: true },
  { id: 3, label: 'youtube', icon: <FaYoutube size={16} />, active: true },
];

const SearchResult = () => {
  const [hashtags, setHashtags] = useState(initialHashtags);
  const [selectedImage, setSelectedImage] = useState(null);
  const [imageData, setImageData] = useState({
    username: 'Unknown User',
    title: 'No Title Available',
  });

  const handleHashtagClick = (id) => {
    setHashtags(
      hashtags.map((tag) =>
        tag.id === id ? { ...tag, active: !tag.active } : tag,
      ),
    );
  };

  const handleImageClick = async (src) => {
    try {
      const response = await axios.get('/api/image-data');
      const { username = 'Space', title = 'Teddy Bear' } = response.data || {};
      setImageData({ username, title });
    } catch (error) {
      console.error('Failed to fetch data from backend:', error);
      setImageData({ username: 'Error', title: 'Failed to load data' });
    }
    setSelectedImage(src);
  };

  const closeDetailView = () => {
    setSelectedImage(null);
    setImageData({ username: 'Unknown User', title: 'No Title Available' });
  };

  return (
    <SearchResultContainer>
      <FixedSearchBar>
        <SearchBar />

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
      </FixedSearchBar>

      <div style={{ overflowY: 'auto', height: 'calc(100vh - 160px)' }}>
        <MasonryGrid>
          {[...Array(30).keys()].map((index) => (
            <GridItem
              key={index}
              onClick={() =>
                handleImageClick(`/src/img/Dummy/image_${index + 1}.png`)
              }
            >
              <img
                src={`/src/img/Dummy/image_${index + 1}.png`}
                alt={`Image ${index + 1}`}
                style={{ width: '100%', borderRadius: '10px' }}
              />
            </GridItem>
          ))}
        </MasonryGrid>
      </div>

      <DetailView visible={!!selectedImage}>
        <CloseButton size={30} onClick={closeDetailView} />
        {selectedImage && (
          <div className="image-container">
            <div className="user-info">
              <img
                className="profile-image"
                src="src/img/ProfileImage.png"
                alt="Profile"
              />
              {imageData.username}
            </div>
            <img src={selectedImage} alt="Detailed view" />
            <div className="title">{imageData.title}</div>
            <button className="add-button">+ add</button>
          </div>
        )}
      </DetailView>
    </SearchResultContainer>
  );
};

export default SearchResult;
