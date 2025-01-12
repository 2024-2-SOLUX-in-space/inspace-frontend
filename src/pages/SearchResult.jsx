import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { FaTimes, FaImage, FaMusic, FaYoutube } from 'react-icons/fa';
import SearchBar from '../components/SearchBar';
import styled from 'styled-components';

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
  height: 70px;
  background: white;
  z-index: 1000;
  padding: 10px 0;
  border-bottom: 1px solid #eee;
`;

const MasonryGrid = styled.div`
  column-count: 5;
  column-gap: 10px;
  margin-top: 160px;
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
  box-shadow: -2px 0 5px rgba(0, 0, 0, 0.1);
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
    gap: 10px;
    position: relative;
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

  .profile-image {
    width: 35px;
    height: 35px;
    border-radius: 50%;
  }

  .title {
    position: fixed;
    top: 520px;
    align-items: center;
    font-size: 2rem;
    color: black;
    margin-top: 10px;
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
        <SearchBar iconInside />
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
            <p className="title">{imageData.title}</p>
            <button className="add-button">+ add</button>
          </div>
        )}
      </DetailView>
    </SearchResultContainer>
  );
};

export default SearchResult;
