import React, { useState } from 'react';
import { FaTimes, FaImage, FaMusic, FaYoutube } from 'react-icons/fa';
import Header from '../../components/Header';
import styled from 'styled-components';
import axios from 'axios';

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
  margin-top: 8vh;
`;

const Hashtag = styled.div`
  cursor: pointer;
  padding: 5px 8px;
  border-radius: 15px;
  background-color: ${(props) => (props.active ? 'black' : '#F5F5F5')};
  color: ${(props) => (props.active ? 'white' : 'black')};
  display: flex;
  align-items: center;
  gap: 5px;
  white-space: nowrap;
  font-size: 0.9rem;
`;

const FixedSearchBar = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  background: white;
  z-index: 1010;
  padding: 0.5% 1%;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  height: 8vh;
`;

const MasonryGrid = styled.div`
  column-count: 5;
  column-gap: 10px;
  margin-top: 7vh;
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
  top: 120px;
  height: 100vh;
  width: 40%;
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
  const [selectedTags, setSelectedTags] = useState(
    initialHashtags.filter((tag) => tag.active).map((tag) => tag.label),
  );
  const [selectedImage, setSelectedImage] = useState(null);
  const [imageData, setImageData] = useState({
    username: 'Space',
    title: 'TitleExample',
  });

  // 해시태그 클릭 핸들러
  const handleHashtagClick = (id) => {
    setHashtags((prev) =>
      prev.map((tag) =>
        tag.id === id ? { ...tag, active: !tag.active } : tag,
      ),
    );

    const clickedTag = hashtags.find((tag) => tag.id === id);
    if (clickedTag) {
      if (clickedTag.active) {
        setSelectedTags((prev) =>
          prev.filter((tag) => tag !== clickedTag.label),
        );
      } else {
        setSelectedTags((prev) => [...prev, clickedTag.label]);
      }
    }
  };

  // 이미지 클릭 핸들러
  const handleImageClick = async (src, category) => {
    try {
      let response;
      if (category === 'image') {
        response = await axios.get('/api/image-data');
      } else if (category === 'music') {
        response = await axios.get('/api/music-data');
      } else if (category === 'youtube') {
        response = await axios.get('/api/youtube-data');
      }

      const { username = 'Space', title = 'TitleExample' } =
        response?.data || {};
      setImageData({ username, title });
    } catch (error) {
      console.error('Failed to fetch data from backend:', error);
      setImageData({ username: 'Space', title: 'TitleExample' });
    }
    setSelectedImage(src);
  };

  const closeDetailView = () => {
    setSelectedImage(null);
    setImageData({ username: 'Space', title: 'TitleExample' });
  };

  // 필터링된 이미지 로직
  const filteredImages = [];
  if (selectedTags.includes('image')) {
    filteredImages.push(
      ...Array.from({ length: 30 }, (_, i) => ({
        id: i + 1,
        category: 'image',
      })),
    );
  }
  if (selectedTags.includes('music')) {
    filteredImages.push(
      ...Array.from({ length: 10 }, (_, i) => ({
        id: i + 31,
        category: 'music',
      })),
    );
  }
  if (selectedTags.includes('youtube')) {
    filteredImages.push(
      ...Array.from({ length: 10 }, (_, i) => ({
        id: i + 41,
        category: 'youtube',
      })),
    );
  }

  const shuffledImages = filteredImages.sort(() => Math.random() - 0.5);

  return (
    <SearchResultContainer>
      <FixedSearchBar>
        <div
          style={{
            position: 'fixed',
            top: 0,
            left: 0,
            width: '100%',
            height: '70px',
            backgroundColor: 'white',
            zIndex: 1000,
            borderBottom: '1px solid #eee',
            padding: '10px 0',
          }}
        >
          <Header iconInside />
        </div>
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

      <div
        style={{
          overflowY: 'auto',
          height: 'calc(150vh - 100px)',
          marginTop: '58vh',
        }}
      >
        <MasonryGrid>
          {shuffledImages.map(({ id, category }) => (
            <GridItem
              key={id}
              onClick={() =>
                handleImageClick(
                  `/src/assets/img/Dummy/image_${id}.png`,
                  category,
                )
              }
            >
              <img
                src={`/src/assets/img/Dummy/image_${id}.png`}
                alt={`Image ${id}`}
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
                src="/src/assets/img/ProfileImage.png"
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
