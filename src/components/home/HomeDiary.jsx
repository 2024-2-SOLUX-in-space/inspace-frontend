import React, { useRef, useState, useEffect, useContext } from 'react';
import PropTypes from 'prop-types';
import HTMLFlipBook from 'react-pageflip';
import PageCover from './PageCover';
import Page from './Page';
import { SpaceContext } from '../../context/SpaceContext';
import { DiaryWrapper, BookWrapper } from '../../styles/home/HomeDiaryStyle';
import api from '../../api/api';
import { useItemContext } from '../../context/ItemContext';

const HomeDiary = ({
  isEditMode,
  selectedImageId,
  onImageSelect,
  selectedIcon
}) => {
  const flipBook = useRef();
  const [pagesData, setPagesData] = useState({});
  const [isItemSelected, setIsItemSelected] = useState(false);

  const { activeSpace, spaces } = useContext(SpaceContext);
  const { selectedItem, setSelectedItem } = useItemContext();

  // 1) 서버에서 페이지 데이터를 가져옴
  const fetchPageData = async (pageNum) => {
    try {
      const response = await api.get(`/api/page?space_id=${activeSpace?.id}&pageNum=${pageNum}`);

      const items = Array.isArray(response.data) ? response.data : [];

      setPagesData(prev => ({
        ...prev,
        [pageNum]: items,
      }));
    } catch (error) {
      console.error(`Error fetching data for page ${pageNum}:`, error);
      // 에러 시 해당 페이지 데이터를 빈 배열로 처리
      setPagesData(prev => ({
        ...prev,
        [pageNum]: [],
      }));
    }
  };

  useEffect(() => {
    if (activeSpace?.id) {
      console.log("🚀 페이지 데이터 가져오기 시작", activeSpace.id);
      // 예시로 페이지 1,2만 먼저 로딩
      fetchPageData(1);
      fetchPageData(2);
    } else {
      // activeSpace가 없는 경우
      setPagesData({});
    }
  }, [activeSpace]);

  // 3) pageNumber에 해당하는 데이터 불러오기
  const getImagesForPage = (pageNum) => {
    // spreadNum 제거
    return pagesData[pageNum] || [];
  };

  const handleFlip = (e) => {
    const currentPage = e.data; 

    if (!pagesData[currentPage]) {
      fetchPageData(currentPage);
    }
  };

  const handleDrop = async (e) => {
    if (e.preventDefault) e.preventDefault();
    if (e.stopPropagation) e.stopPropagation();
    const rect = e.currentTarget.getBoundingClientRect();

    if (!window.draggedImage) return; 

    const x = e.clientX - rect.left - (window.draggedImage.positionX || 0);
    const y = e.clientY - rect.top - (window.draggedImage.positionY || 0);

    const newItem = {
      itemId: window.draggedImage.id,
      title: window.draggedImage.title || "No Title",
      imageUrl: window.draggedImage.imageUrl || "No URL",
      contentsUrl: window.draggedImage.contentsUrl || "No URL",
      ctype: window.draggedImage.ctype,
      positionX: x,
      positionY: y,
      height: window.draggedImage.height || 100,
      width: window.draggedImage.width || 100,
      turnover: 0,
      sequence: 0,
      sticker: window.draggedImage.ctype === "sticker" ? {
        title: window.draggedImage.id,
        src: window.draggedImage.src, 
        alt: window.draggedImage.alt,
        color: window.draggedImage.color
      } : null
    };

    console.log("🚀 드롭한 아이템:", newItem);

    try {
      if (newItem.ctype === "sticker") {
        const response = await api.post(`/api/page/sticker?space_id=${activeSpace.id}&pageNum=${pageNum}`, newItem);
        if (response.status === 200) {
          console.log("✅ 스티커 저장 성공:", response.data);
        }
      } else {
        const response = await api.put(`/api/page?space_id=${activeSpace.id}&pageNum=${pageNum}`, newItem);
        if (response.status === 200) {
          console.log("✅ 일반 아이템 저장 성공:1111", response.data);
        }
      }
    } catch (error) {
      console.error("❌ 아이템 저장 실패:111", error);
    }
  };

  // 5) 이미지(아이템) 삭제 시
  const handleDeleteImage = (id) => {
    // 여기선 pagesData만 업데이트
    setPagesData(prev => {
      const updated = { ...prev };
      Object.keys(updated).forEach(pageNum => {
        updated[pageNum] = updated[pageNum].filter(img => img.itemId !== id);
      });
      return updated;
    });
    // 선택된 아이템이 삭제되면 초기화
    if (selectedItem === id) {
      setSelectedItem(null);
    }
  };

  // 6) 이미지(아이템) 업데이트 시
  const handleImageUpdate = (imageId, updates) => {
    console.log("🚀 onUpdate 호출:", imageId, updates);
    setPagesData(prev => {
      const updated = { ...prev };
      Object.keys(updated).forEach(pageNum => {
        updated[pageNum] = updated[pageNum].map(img =>
          img.itemId === imageId ? { ...img, ...updates } : img
        );
      });
      return updated;
    });
  };

  const handleDragStart = (item) => (e) => {
    const rect = e.target.getBoundingClientRect();
    const offsetX = e.clientX - rect.left;
    const offsetY = e.clientY - rect.top;

    window.draggedImage = {
      id: item.id,
      title: item.title || item.alt || "No Title",
      imageUrl: item.src || item.imageUrl || "No URL",
      contentsUrl: item.src || item.contentsUrl || "No URL",
      ctype: selectedIcon, // 선택한 아이콘에 따라 ctype 설정
      positionX: offsetX,
      positionY: offsetY,
      width: item.width || 100,
      height: item.height || 100,
      turnover: item.turnover || 0,
      sequence: 1,
      sticker: selectedIcon === 'sticker' ? {
        title: item.id,
        src: item.src,
        alt: item.alt,
        color: item.color
      } : null,
    };
  };

  // 공간 선택이 안 된 경우
  if (!activeSpace) {
    if (spaces.length === 0) {
      return (
        <DiaryWrapper>
          <p>공간을 추가해주세요!</p>
        </DiaryWrapper>
      );
    } else {
      return (
        <DiaryWrapper>
          <p>공간을 선택해주세요.</p>
        </DiaryWrapper>
      );
    }
  }

  return (
    <DiaryWrapper style={{ pointerEvents: isEditMode ? 'auto' : 'auto' }}>
      <BookWrapper>
        <HTMLFlipBook
          width={400}
          height={500}
          size="stretch"
          minWidth={400}
          maxWidth={1000}
          minHeight={400}
          maxHeight={1533}
          maxShadowOpacity={0.5}
          showCover={true}
          mobileScrollSupport={true}
          useMouseEvents={!isItemSelected}
          drawShadow={true}
          flippingTime={1000}
          className="flip-book"
          ref={flipBook}
          drawOnDemand={false}
          usePortrait={false}
          startPage={0}
          showPageCorners={!isItemSelected}
          disableFlipByClick={true}
          clickEventForward={false}
          swipeDistance={isItemSelected ? 0 : 30}
          cornerCursor={isItemSelected ? 'default' : 'pointer'}
          onFlip={handleFlip}
          onDrop={handleDrop}
        >
          <PageCover position="top" coverType={activeSpace.coverType} title={activeSpace.title} />
          {[...Array(10)].map((_, i) => (
            <Page
              key={i + 1}
              number={i + 1}
              images={getImagesForPage(i + 1)}
              onImageDrop={handleDrop}
              onDeleteImage={handleDeleteImage}
              onImageUpdate={handleImageUpdate}
              isEditMode={isEditMode}
              selectedImageId={selectedImageId}
              onImageSelect={onImageSelect}
              onItemSelectChange={setIsItemSelected}
            />
          ))}
          <PageCover position="bottom" coverType={activeSpace.coverType} /> 
        </HTMLFlipBook>
      </BookWrapper>
    </DiaryWrapper>
  );
};

HomeDiary.propTypes = {
  isEditMode: PropTypes.bool.isRequired,
  selectedImageId: PropTypes.string,
  onImageSelect: PropTypes.func,
};

export default HomeDiary;