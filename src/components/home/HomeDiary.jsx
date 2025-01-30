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
}) => {
  const flipBook = useRef();
  const [pagesData, setPagesData] = useState({});
  const [isItemSelected, setIsItemSelected] = useState(false);

  const { activeSpace, spaces } = useContext(SpaceContext);
  const { selectedItem, setSelectedItem } = useItemContext();

  // 1) 서버에서 페이지 데이터를 가져옴
  const fetchPageData = async (pageNum) => {
    try {
      const response = await api.get(`/api/page`, {
        params: { space_id: activeSpace?.id, pageNum }
      });

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
const getImagesForPage = (pageNumber) => {
  // spreadNum 제거
  return pagesData[pageNumber] || [];
};

const handleFlip = (e) => {
  const currentPage = e.data; 

  if (!pagesData[currentPage]) {
    fetchPageData(currentPage);
  }
};

  const handleImageDrop = async (pageNumber, x, y) => {
    const draggedImage = window.draggedImage;
    if (!draggedImage) return;

    const newItem = {
      itemId: draggedImage.id,
      title: draggedImage.alt,
      imageUrl: draggedImage.src,
      contentsUrl: draggedImage.src,
      ctype: "image", 
      positionX: x,
      positionY: y,
      height: draggedImage.height || 100,
      width: draggedImage.width || 100,
      turnover: 0,
      sequence: pageNumber,
      sticker: draggedImage.type === "STICKER"
        ? {
            title: draggedImage.alt,
            src: draggedImage.src,
            alt: draggedImage.alt,
            color: draggedImage.color || "default",
          }
        : null,
    };

    console.log("🚀 드롭한 아이템:", newItem);

    try {
      // 스티커 vs 일반아이템 구분
      if (draggedImage.type === "STICKER") {
        // 스티커 => POST
        const response = await api.post(
          `/api/page/sticker?spaceId=${activeSpace.id}&pageNum=${pageNumber}`,
          [newItem]
        );
        if (response.status === 200) {
          console.log("✅ 스티커 저장 성공:", response.data);
          // pagesData에 즉시 반영
          setPagesData(prev => ({
            ...prev,
            [pageNumber]: [...(prev[pageNumber] || []), newItem],
          }));
        }
      } else {
        // 일반 이미지 => PUT
        const response = await api.put(`/api/page/${activeSpace.id}`, [newItem]);
        if (response.status === 200) {
          console.log("✅ 일반 아이템 저장 성공:", response.data);
          setPagesData(prev => ({
            ...prev,
            [pageNumber]: [...(prev[pageNumber] || []), newItem],
          }));
        }
      }
    } catch (error) {
      console.error("❌ Error saving item:", error);
    }

    window.draggedImage = null;
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
        >
          <PageCover position="top" coverType={activeSpace.coverType} title={activeSpace.title} />
          {[...Array(10)].map((_, i) => (
            <Page
              key={i + 1}
              number={i + 1}
              images={getImagesForPage(i + 1)}
              onImageDrop={handleImageDrop}
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