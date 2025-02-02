import React, { useState, useEffect } from 'react';
import { FaImage, FaMusic, FaYoutube, FaTimes } from 'react-icons/fa';
import Header from '../../components/Header';
import AddItemModal from '../../components/search/AddItemModal';
import AddItemSuccessModal from '../../components/search/AddItemSuccessModal';
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
import { useLocation } from 'react-router-dom';

const initialHashtags = [
  { id: 1, label: 'image', icon: <FaImage size={16} />, active: true },
  { id: 2, label: 'music', icon: <FaMusic size={16} />, active: true },
  { id: 3, label: 'youtube', icon: <FaYoutube size={16} />, active: true },
];

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
    itemId: null,
  });
  const [accessToken, setAccessToken] = useState(null);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [showAddModal, setShowAddModal] = useState(false);
  const [showSuccessModal, setShowSuccessModal] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem('access_token');
    if (token) {
      setAccessToken(token);
    }
  }, []);

  useEffect(() => {
    setSelectedTags(
      hashtags.filter((tag) => tag.active).map((tag) => tag.label),
    );
  }, [hashtags]);

  useEffect(() => {
    if (!accessToken) return;
    const query = location.state?.query || '';
    if (query) {
      fetchSearchResults(query, selectedTags);
    }
  }, [location.state, selectedTags, accessToken]);

  const fetchSearchResults = async (query, filter = []) => {
    if (!accessToken) return;
    try {
      const response = await axios.get(
        'http://3.35.10.158:8080/api/search/results',
        {
          params: { query, filter: filter.join(',') },
          headers: { Authorization: `Bearer ${accessToken}` },
        },
      );
      console.log('검색 결과:', response.data); // 검색 결과를 콘솔에 출력
      setResults(transformResponseData(response.data));
    } catch (error) {
      console.error('검색 오류:', error.response?.status, error.response?.data);
    }
  };

  const transformResponseData = (data) => {
    return [
      ...(data.images || []).map((item) => ({
        ...item,
        imageUrl: item.imageUrl || item.contentUrl, // 이미지 항목에 imageUrl 설정
        ctype: 'image',
      })),
      ...(data.music || []).map((item) => ({
        ...item,
        imageUrl: item.thumbnail || item.contentUrl, // 음악 항목에 썸네일 설정
        ctype: 'music',
      })),
      ...(data.videos || []).map((item) => ({
        ...item,
        imageUrl: item.imageUrl || item.contentUrl, // 유튜브 항목에 imageUrl 설정
        ctype: 'youtube',
      })),
    ].map((item) => ({
      itemId: item.itemId,
      imageUrl: item.imageUrl,
      title: item.title,
      username: item.username || 'Unknown User',
      ctype: item.ctype,
    }));
  };

  const handleHashtagClick = (id) => {
    setHashtags((prevHashtags) =>
      prevHashtags.map((tag) =>
        tag.id === id ? { ...tag, active: !tag.active } : tag,
      ),
    );
  };

  const handleAddClick = () => {
    if (imageData.itemId) {
      console.log('선택한 itemId:', imageData.itemId); // 선택한 itemId를 콘솔에 출력
      setShowAddModal(true);
    } else {
      console.warn('itemId가 없습니다.');
    }
  };

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

        <MasonryGrid>
          {results
            .filter((item) => selectedTags.includes(item.ctype))
            .map(({ itemId, imageUrl, title, username }) => (
              <GridItem key={itemId}>
                <img
                  src={imageUrl}
                  alt={title}
                  style={{ width: '100%', borderRadius: '10px' }}
                  onClick={() => {
                    console.log('클릭한 itemId:', itemId); // 클릭한 itemId를 콘솔에 출력
                    setSelectedImage(imageUrl);
                    setImageData({ title, username, itemId });
                  }}
                />
              </GridItem>
            ))}
        </MasonryGrid>
      </SearchResultContainer>

      <DetailView visible={!!selectedImage} fullscreen={isFullscreen}>
        <CloseButton size={30} onClick={() => setSelectedImage(null)} />
        {selectedImage && (
          <>
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
                onClick={() => setIsFullscreen(!isFullscreen)}
              />
              <button className="add-button" onClick={handleAddClick}>
                + add
              </button>
            </div>
          </>
        )}
      </DetailView>

      {showAddModal && (
        <AddItemModal
          isOpen={showAddModal}
          onClose={() => setShowAddModal(false)}
          onSuccess={() => {
            setShowSuccessModal(true);
          }}
          spaces={['Space 1', 'Space 2', 'Space 3']}
          itemId={imageData.itemId} // AddItemModal에 itemId 전달
        />
      )}

      {showSuccessModal && (
        <AddItemSuccessModal
          isOpen={showSuccessModal}
          onClose={() => setShowSuccessModal(false)}
          itemId={imageData.itemId} // AddItemSuccessModal에 itemId 전달
        />
      )}
    </>
  );
};

export default SearchResult;
