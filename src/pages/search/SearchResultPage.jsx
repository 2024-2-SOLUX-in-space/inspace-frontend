import React, { useState, useEffect } from 'react';
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
import { useLocation } from 'react-router-dom';
import axios from 'axios';

const initialHashtags = [
  { id: 1, label: 'image', icon: <FaImage size={16} />, active: true },
  { id: 2, label: 'music', icon: <FaMusic size={16} />, active: true },
  { id: 3, label: 'youtube', icon: <FaYoutube size={16} />, active: true },
];

const ACCESS_TOKEN =
  'eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJpbnNwYWNlMDAzQGdtYWlsLmNvbSIsImlhdCI6MTczODA4OTA1NCwiZXhwIjoxNzM4MDkyNjU0fQ.LpKFP4RDb-CCrEixqCOIe7aE3V_3rG00hc-wF3bBoEU';

const SearchResult = () => {
  const location = useLocation();
  const [hashtags, setHashtags] = useState(initialHashtags);
  const [selectedTags, setSelectedTags] = useState(
    initialHashtags.filter((tag) => tag.active).map((tag) => tag.label),
  );
  const [results, setResults] = useState([]);
  const [selectedImage, setSelectedImage] = useState(null);
  const [imageData, setImageData] = useState({
    username: 'Space',
    title: 'TitleExample',
  });
  const [isFullscreen, setIsFullscreen] = useState(false);

  const transformResponseData = (data) => {
    // 서버 응답 데이터를 배열 형태로 변환
    const results = [];
    if (data.images) results.push(...data.images);
    if (data.music) results.push(...data.music);
    if (data.videos) results.push(...data.videos);
    return results;
  };

  const fetchSearchResults = async (query, filter) => {
    try {
      console.log('API 호출 시작:', query, filter);

      const response = await axios.get(
        `http://3.35.10.158:8080/api/search/results`,
        {
          params: { query, filter: filter.join(',') },
          headers: { Authorization: `Bearer ${ACCESS_TOKEN}` },
        },
      );

      console.log('API 응답:', response.data);

      const results = transformResponseData(response.data); // 응답 데이터 변환
      if (results.length === 0) {
        console.warn('검색 결과 없음');
      }
      setResults(results);
    } catch (error) {
      console.error('API 호출 중 오류:', error.response || error.message);
      setResults([]);
    }
  };

  // 초기 검색어와 필터 값으로 API 호출
  useEffect(() => {
    const query = location.state?.query || '';
    const filter = selectedTags;
    if (query) {
      fetchSearchResults(query, filter);
    } else {
      console.warn('검색어가 전달되지 않았습니다.');
    }
  }, [location.state, selectedTags]);

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
            {Array.isArray(results) && results.length > 0 ? (
              results.map(({ id, title, imageUrl }) => (
                <GridItem key={id} onClick={() => setSelectedImage(imageUrl)}>
                  <img
                    src={imageUrl}
                    alt={title}
                    style={{ width: '100%', borderRadius: '10px' }}
                  />
                </GridItem>
              ))
            ) : (
              <p>검색 결과가 없습니다. 검색어와 필터를 확인하세요.</p>
            )}
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
