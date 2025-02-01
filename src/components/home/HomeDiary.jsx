import React, { useRef, useState, useEffect, useContext, useCallback } from 'react';
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
  const flipBook = useRef(null);

  const [pagesData, setPagesData] = useState({});
  const [isItemSelected, setIsItemSelected] = useState(false);
  const [isInteracting, setIsInteracting] = useState(false);
  const { activeSpace, spaces } = useContext(SpaceContext);
  const { selectedItem, setSelectedItem } = useItemContext();

  const fetchPageData = async (pageNum) => {
    if (!activeSpace?.id) return;
    try {
      const response = await api.get(`/api/page?space_id=${activeSpace.id}&pageNum=${pageNum}`);
      const items = Array.isArray(response.data) ? response.data : [];
      setPagesData((prev) => ({
        ...prev,
        [pageNum]: items,
      }));
    } catch (error) {
      console.error(`Error fetching data for page ${pageNum}:`, error);
      setPagesData((prev) => ({
        ...prev,
        [pageNum]: [],
      }));
    }
  };

  useEffect(() => {
    if (activeSpace?.id) {
      for (let i = 1; i <= 10; i++) {
        fetchPageData(i);
      }
    } else {
      setPagesData({});
    }
  }, [activeSpace]);

  const getImagesForPage = (pageNum) => {
    return pagesData[pageNum] || [];
  };

  const handleChangeState = (e) => {
    if (isItemSelected) {
      //e.preventDefault(); // 기본 동작 방지
      flipBook.current.pageFlip().setState('read'); // 상태를 "read"로 강제 설정
      return;
    }
  };


  const handleDeleteImage = (id) => {
    setPagesData((prev) => {
      const updated = { ...prev };
      Object.keys(updated).forEach((pageNum) => {
        updated[pageNum] = updated[pageNum].filter((img) => img.itemId !== id);
      });
      return updated;
    });
    if (selectedItem === id) {
      setSelectedItem(null);
    }
  };

  const handleImageUpdate = (imageId, updates) => {
    setPagesData((prev) => {
      const updated = { ...prev };
      Object.keys(updated).forEach((pageNum) => {
        updated[pageNum] = updated[pageNum].map((img) =>
          img.itemId === imageId ? { ...img, ...updates } : img
        );
      });
      return updated;
    });
  };

  if (!activeSpace) {
    return (
      <DiaryWrapper>
        <p>{spaces.length === 0 ? '공간을 추가해주세요!' : '공간을 선택해주세요.'}</p>
      </DiaryWrapper>
    );
  }

  return (
    <DiaryWrapper style={{ pointerEvents: isEditMode ? 'auto' : 'auto' }}>
      <BookWrapper>
        <HTMLFlipBook
          key={activeSpace?.id}
          ref={flipBook}
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
          useMouseEvents={!isItemSelected && !isInteracting}
          drawShadow={true}
          flippingTime={1000}
          className="flip-book"
          drawOnDemand={false}
          usePortrait={false}
          startPage={0}
          showPageCorners={!isItemSelected}
          disableFlipByClick={true}
          clickEventForward={false}
          swipeDistance={isItemSelected ? 0 : 30}
          cornerCursor={isItemSelected ? 'default' : 'pointer'}
          onChangeState={handleChangeState}
        >
          <PageCover
            position="top"
            coverType={activeSpace.coverType}
            title={activeSpace.title}
          />
          {[...Array(10)].map((_, i) => (
            <Page
              key={i + 1}
              number={i + 1}
              images={getImagesForPage(i + 1)}
              onImageUpdate={handleImageUpdate}
              onDeleteImage={handleDeleteImage}
              isEditMode={isEditMode}
              selectedImageId={selectedImageId}
              onImageSelect={onImageSelect}
              onItemSelectChange={setIsItemSelected}
              onPageUpdate={fetchPageData}
              setIsInteracting={setIsInteracting}
            />
          ))}
          <PageCover
            position="bottom"
            coverType={activeSpace.coverType}
          />
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