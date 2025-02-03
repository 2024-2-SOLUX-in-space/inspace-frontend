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
import api from '../../api/api';
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
  const [spaces, setSpaces] = useState([]); // 공간 목록 상태
  const [spaceDetails, setSpaceDetails] = useState(null); // 공간 세부 정보
  const [selectedImage, setSelectedImage] = useState(null);
  const [imageData, setImageData] = useState({
    username: 'Space',
    title: 'TitleExample',
    itemId: null,
    contentUrl: '',
  });
  const [accessToken, setAccessToken] = useState(null);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [showAddModal, setShowAddModal] = useState(false);
  const [showSuccessModal, setShowSuccessModal] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem('access_token');
    if (token) {
      setAccessToken(token);
      fetchSpaces(token); // 공간 목록 조회
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

  const fetchSpaces = async (token) => {
    try {
      const response = await axios.get('http://3.35.10.158:8080/api/spaces', {
        headers: { Authorization: `Bearer ${token}` },
      });
      console.log('공간 목록:', response.data); // 공간 목록을 콘솔에 출력
      setSpaces(
        response.data.map((space) => ({
          spaceId: space.spaceId,
          sname: space.sname,
        })),
      );
    } catch (error) {
      console.error('공간 목록 조회 오류:', error);
    }
  };

  const fetchSpaceDetails = async (spaceId) => {
    if (!accessToken) return;
    try {
      const response = await axios.get(
        `http://3.35.10.158:8080/api/items/space/${spaceId}`,
        {
          headers: { Authorization: `Bearer ${accessToken}` },
        },
      );

      const data = response.data;
    setImageData({
      itemId: data.itemId,
      title: data.title,
      username: data.userName,
      contentUrl: data.contentsUrl,
    });
      console.log('공간 세부 정보:', data); // 아이템 세부 정보를 콘솔에 출력
      setSpaceDetails(setImageData);
    } catch (error) {
      console.error(
        '공간 세부 정보 조회 오류:',
        error.response?.status,
        error.response?.data,
      );
    }
  };

  const transformResponseData = (data) => {
    return [
      ...(data.images || []).map((item) => ({
        ...item,
        imageUrl: item.imageUrl || item.contentUrl, // 이미지 항목에 imageUrl 설정
        ctype: 'image',
        contentUrl: item.contentUrl,
      })),
      ...(data.music || []).map((item) => ({
        ...item,
        imageUrl: item.thumbnail || item.contentUrl, // 음악 항목에 썸네일 설정
        ctype: 'music',
        contentUrl: item.contentUrl,
      })),
      ...(data.videos || []).map((item) => ({
        ...item,
        imageUrl: item.imageUrl || item.contentUrl, // 유튜브 항목에 imageUrl 설정
        ctype: 'youtube',
        contentUrl: item.contentUrl,
      })),
      ...spaces.map((space) => ({
        itemId: `space-${space.spaceId}`,
        title: space.sname,
        ctype: 'space',
        spaceId: space.spaceId,
      })),
    ];
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

  const handleSpaceClick = (spaceId) => {
    console.log('클릭한 spaceId:', spaceId); // 클릭한 공간 ID 출력
    fetchSpaceDetails(spaceId);
  };

  const handleImageClick = (itemId, imageUrl, title, username, contentUrl) => {
    console.log('클릭한 itemId:', itemId); // 클릭한 itemId를 콘솔에 출력
    setSelectedImage(imageUrl);
    setImageData({ title, username, itemId, contentUrl });
  };

  const registerItemToSpace = async (itemId, spaceId, query) => {
    if (!accessToken) return;
    try {
      const response = await axios.post(
        `http://3.35.10.158:8080/api/item/register`,
        {
          itemId: itemId, // 아이템의 고유 ID
          spaceId: spaceId, // 공간 ID
        },
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
            'Content-Type': 'application/json',
            Accept: '*/*',
          },
          params: { query }, // 요청 파라미터로 query 추가
        }
      );
      console.log('아이템 등록 성공:', response.data); // 등록 성공 메시지 출력
    } catch (error) {
      console.error('아이템 등록 오류:', error.response?.status || 'N/A', error.response?.data || 'N/A');
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

        <div style={{ overflowY: 'auto', maxHeight: 'calc(100vh - 150px)' }}>
          <MasonryGrid>
            {results
              .filter((item) => selectedTags.includes(item.ctype))
              .map(
                ({
                  itemId,
                  imageUrl,
                  title,
                  username,
                  ctype,
                  spaceId,
                  contentUrl,
                }) => (
                  <GridItem key={itemId}>
                    {ctype === 'space' ? (
                      <div
                        style={{
                          display: 'flex',
                          flexDirection: 'column',
                          alignItems: 'center',
                          cursor: 'pointer',
                        }}
                        onClick={() => handleSpaceClick(spaceId)}
                      >
                        <img
                          src="/src/assets/img/button/Bookopen.png"
                          alt="Space Icon"
                          style={{ width: '50px', height: '50px' }}
                        />
                        <span>{title}</span>
                      </div>
                    ) : (
                      <img
                        src={imageUrl}
                        alt={title}
                        style={{ width: '100%', borderRadius: '10px' }}
                        onClick={() => handleImageClick(itemId, imageUrl, title, username, contentUrl)}
                      />
                    )}
                  </GridItem>
                ),
              )}
          </MasonryGrid>
        </div>
      </SearchResultContainer>

      <DetailView visible={!!selectedImage} fullscreen={isFullscreen}>
        <CloseButton size={30} onClick={() => setSelectedImage(null)} />
        {selectedImage && (
          <>
            <div
              className="user-info"
              style={{ display: 'flex', alignItems: 'center', gap: '20px' }}
            >
              <img
                className="profile-image"
                src="/src/assets/img/ProfileImage.png"
                alt="Profile"
                style={{ width: '100px', height: '100px', borderRadius: '50%' }}
              />
              <div
                style={{
                  textAlign: 'left',
                  wordBreak: 'break-all',
                  maxWidth: '60%',
                }}
              >
                <p style={{ fontSize: '14px', margin: 0 }}>
                  {imageData.username}
                </p>
                <p style={{ fontSize: '12px', margin: '5px 0', color: '#555' }}>
                  {imageData.contentUrl}
                </p>
              </div>
            </div>
            <img
              src={selectedImage}
              alt="Detailed view"
              style={{ marginTop: '20px' }}
            />
            <div className="title" style={{ marginTop: '10px' }}>
              {imageData.title}
            </div>
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
          onSuccess={(spaceId) => {
            registerItemToSpace(imageData.itemId, spaceId, location.state?.query || ''); // 아이템 등록 호출
            setShowSuccessModal(true);
          }}
          spaces={spaces} // 공간 목록 전달
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
