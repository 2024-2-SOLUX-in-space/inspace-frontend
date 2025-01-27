// src/components/home/HomeDiary.js
import React, { useRef, useState, useEffect, useContext } from 'react';
import HTMLFlipBook from 'react-pageflip';
import { SpaceContext } from '../../context/SpaceContext';
import { 
  DiaryWrapper, 
  BookWrapper, 
  PageContent, 
  PageNumber, 
  DiaryContent
} from '../../styles/home/HomeDiaryStyle';
import PageItem from '../../components/home/PageItem';
import api from '../../api/api';

const PageCover = React.forwardRef((props, ref) => {
  const getCoverImage = (position, coverType = 1) => {
    if (position === 'top') {
      switch(coverType) {
        case 1: return '/public/home/cover1_front.png';
        case 2: return '/public/home/cover2_front.png';
        case 3: return '/public/home/cover3_front.png';
        default: return '/public/home/cover1_front.png';
      }
    } else {
      switch(coverType) {
        case 1: return '/public/home/cover1_back.png';
        case 2: return '/public/home/cover2_back.png';
        case 3: return '/public/home/cover3_back.png';
        default: return '/public/home/cover1_back.png';
      }
    }
  };

  const imageUrl = getCoverImage(props.position, props.coverType);
  
  const getTitleStyle = (coverType, title) => {
    switch(coverType) {
      case 1:
        return {
          top: '25%',
          left: '50%',
          color: '#C8B695',
          textShadow: '2px 2px 4px rgba(0, 0, 0, 0.3)',
          width: '80%',
          textAlign: 'center'
        };
      case 2:
        return {
          top: '36%',
          left: '48%',
          color: '#000000',
          textShadow: '2px 2px 4px rgba(0, 0, 0, 0.5)',
        };
      case 3:
        return {
          top: '64%',
          left: '50%',
          color: '#000000',
          textShadow: '1px 1px 3px rgba(231, 212, 87, 0.5)',
          backgroundColor: '#E9CBA5',
          padding: '5px 15px',
          width: '60%',
          textAlign: 'center',
          borderRadius: '3px',
        };
      default:
        return {
          top: '25%',
          left: '50%',
          color: 'rgb(227, 197, 141)',
          textShadow: '2px 2px 4px rgba(0, 0, 0, 0.3)',
          width: '80%',
          textAlign: 'center',
        };
    }
  };

  const titleStyle = getTitleStyle(props.coverType, props.title);

  return (
    <div 
      className={`page page-cover ${props.position === 'top' ? 'page-cover-top' : 'page-cover-bottom'}`} 
      ref={ref} 
      data-density="hard"
      style={{
        position: 'relative',
        backgroundColor: '#000'
      }}
    >
      <img 
        src={imageUrl}
        alt="cover"
        style={{
          width: '100%',
          height: '100%',
          objectFit: 'cover',
          position: 'absolute',
          top: 0,
          left: 0
        }}
      />
      <div className="page-content">
        <h2 style={{
          position: 'absolute',
          ...titleStyle,
          transform: 'translate(-50%, -50%)',
          zIndex: 1,
          fontSize: '2em',
          fontWeight: 'bold',
          fontFamily: "'Bodoni MT', 'Times New Roman', serif"
        }}>
          {props.title}
        </h2>
      </div>
    </div>
  );
});

const Page = React.forwardRef((props, ref) => {
  const handleDragOver = (e) => {
    e.preventDefault();
    e.stopPropagation();
  };

  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    const rect = e.currentTarget.getBoundingClientRect();
    
    const x = e.clientX - rect.left - (window.draggedImage.offsetX || 0);
    const y = e.clientY - rect.top - (window.draggedImage.offsetY || 0);
    
    if (props.onImageDrop) {
      props.onImageDrop(props.number, x, y);
    }
  };

  const handleImageUpdate = (imageId, updates) => {
    if (props.onImageUpdate) {
      props.onImageUpdate(imageId, {
        ...updates,
        pageNumber: props.number
      });
    }
  };

  const getSpreadNumber = (pageNumber) => Math.ceil(pageNumber / 2);

  const getPagePair = (pageNumber) => {
    if (pageNumber % 2 === 0) {
      return [pageNumber - 1, pageNumber];
    } else {
      return [pageNumber, pageNumber + 1];
    }
  };

  return (
    <div className="page" ref={ref}>
      <PageContent className="page-content">
        <PageNumber>{props.number}</PageNumber>
        <DiaryContent 
          onDragOver={handleDragOver}
          onDrop={handleDrop}
        >
          {props.images && props.images.map((image) => (
            <PageItem
              key={image.id}
              image={image}
              onUpdate={handleImageUpdate}
              onDelete={props.onDeleteImage}
              isEditMode={props.isEditMode}
              pagePair={getPagePair(props.number)}
              onSelectChange={props.onItemSelectChange}
            />
          ))}
        </DiaryContent>
      </PageContent>
    </div>
  );
});

const HomeDiary = ({ 
  onImageDrop, 
  isModalOpen, 
  isEditMode,
}) => {
  const flipBook = useRef();
  const [isItemSelected, setIsItemSelected] = useState(false);
  const [diaryData, setDiaryData] = useState({ images: [] });
  const { activeSpace, spaces } = useContext(SpaceContext);
  
  useEffect(() => {
    if (activeSpace?.id) {
      const fetchPageData = async () => {
        try {
          const response = await api.get(`/api/page?space_id=${activeSpace.id}&pageNum=${pageNum}`);
          setDiaryData(response.data);
        } catch (error) {
          console.error('Error fetching page data:', error);
          setDiaryData({ images: [] });
        }
      };

      fetchPageData();
    } else {
      setDiaryData({ images: [] });
    }
  }, [activeSpace]);

  const handleDeleteImage = (id) => {
    setDiaryData(prev => ({
      ...prev,
      images: prev.images.filter(img => img.id !== id)
    }));
  };

  const handleImageUpdate = (imageId, updates) => {
    setDiaryData(prev => ({
      ...prev,
      images: prev.images.map(img => 
        img.id === imageId ? { ...img, ...updates } : img
      )
    }));
  };

  const getImagesForPage = (pageNumber) => {
    return diaryData.images ? diaryData.images.filter(img => img.pageNumber === pageNumber) : [];
  };

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
    <DiaryWrapper style={{ pointerEvents: isModalOpen ? 'none' : 'auto' }}>
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
        >
          <PageCover 
            position="top" 
            coverType={activeSpace.coverType} 
            title={activeSpace.title}
          >
            {activeSpace.title}
          </PageCover>
          {[...Array(10)].map((_, i) => (
            <Page 
              key={i + 1} 
              number={i + 1}
              images={getImagesForPage(i + 1)}
              onImageDrop={onImageDrop}
              onDeleteImage={handleDeleteImage}
              onImageUpdate={handleImageUpdate}
              isEditMode={isEditMode}
              onItemSelectChange={setIsItemSelected}
            />
          ))}
          <PageCover 
            position="bottom" 
            coverType={activeSpace.coverType} 
            title="" // 하단 커버에 제목이 없다고 가정
          />
        </HTMLFlipBook>
      </BookWrapper>
    </DiaryWrapper>
  );
};

export default HomeDiary;
