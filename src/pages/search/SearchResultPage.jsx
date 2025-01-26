import React, { useState } from 'react';
import { FaImage, FaMusic, FaYoutube, FaTimes } from 'react-icons/fa';
import Header from '../../components/Header';
import {
  SearchResultContainer,
  HashtagContainer,
  Hashtag,
  MasonryGrid,
  GridItem,
  DetailView,
  CloseButton,
} from '../../styles/search/SearchResultStyles';
import axios from 'axios';

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
  const [isFullscreen, setIsFullscreen] = useState(false);

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
    setIsFullscreen(false);
  };

  const toggleFullscreen = () => {
    setIsFullscreen((prev) => !prev);
  };

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
    <>
    <Header iconInside />
    <SearchResultContainer>
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

      <DetailView visible={!!selectedImage} fullscreen={isFullscreen}>
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
            <div className="button-row">
              <img
                className="maximize-button"
                src={
                  isFullscreen
                    ? '/src/assets/img/button/MinimizeButton.png'
                    : '/src/assets/img/button/MaximizeButton.png'
                }
                alt={isFullscreen ? 'Minimize' : 'Maximize'}
                onClick={toggleFullscreen}
              />
              <button className="add-button">+ add</button>
            </div>
          </div>
        )}
      </DetailView>
    </SearchResultContainer>
    </>
  );
};

export default SearchResult;
