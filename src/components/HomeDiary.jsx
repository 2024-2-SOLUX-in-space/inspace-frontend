import React, { useRef } from 'react';
import HTMLFlipBook from 'react-pageflip';
import { 
  DiaryWrapper, 
  BookWrapper, 
  PageContent, 
  PageNumber, 
  DiaryContent, 
  DraggableImage 
} from '../styles/HomeDiaryStyle';
import { FiX } from "react-icons/fi";
import { DeleteButton } from '../styles/EditSidebarStyle';

const PageCover = React.forwardRef((props, ref) => {
  const getCoverImage = (position, coverType = 1) => {
    if (position === 'top') {
      switch(coverType) {
        case 1: return '/cover1_front.png';
        case 2: return '/cover2_front.png';
        case 3: return '/cover3_front.png';
        default: return '/cover1_front.png';
      }
    } else {
      switch(coverType) {
        case 1: return '/cover1_back.png';
        case 2: return '/cover2_back.png';
        case 3: return '/cover3_back.png';
        default: return '/cover1_back.png';
      }
    }
  };

  const imageUrl = getCoverImage(props.position, props.coverType);
  
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
          top: '19%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          color: props.textColor || '#000',
          textShadow: '2px 2px 4px rgba(0, 0, 0, 0.3)',
          zIndex: 1,
          fontFamily: 'Arial, sans-serif',
          fontSize: '2em',
          fontWeight: 'bold'
        }}>
          {props.children}
        </h2>
      </div>
    </div>
  );
});

const Page = React.forwardRef((props, ref) => {
  const handleDragOver = (e) => {
    e.preventDefault();
  };

  const handleDrop = (e) => {
    e.preventDefault();
    const rect = e.currentTarget.getBoundingClientRect();
    
    const x = e.clientX - rect.left - (window.draggedImage.offsetX || 0);
    const y = e.clientY - rect.top - (window.draggedImage.offsetY || 0);
    
    if (props.onImageDrop) {
      props.onImageDrop(props.number, x, y);
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
          {props.children}
          {props.images && props.images.map((image) => (
            <div key={image.id} style={{ position: 'relative' }}>
              <DraggableImage 
                src={image.url} 
                alt={image.alt}
                style={{
                  position: 'absolute',
                  left: `${image.position?.x}px`,
                  top: `${image.position?.y}px`,
                  width: image.style?.width,
                  height: image.style?.height
                }}
              />
              {!image.isSticker && (
                <DeleteButton 
                  onClick={() => props.onDeleteImage(image.id)}
                  style={{
                    position: 'absolute',
                    left: `${image.position?.x - 12}px`,
                    top: `${image.position?.y - 12}px`,
                    zIndex: 1001
                  }}
                >
                  <FiX />
                </DeleteButton>
              )}
            </div>
          ))}
        </DiaryContent>
      </PageContent>
    </div>
  );
});

const HomeDiary = ({ diaryData = { images: [], coverType: 1 }, onImageDrop, isModalOpen, setDiaryData }) => {
  console.log('DiaryData:', diaryData);
  const flipBook = useRef();

  const handleDeleteImage = (id) => {
    setDiaryData(prev => ({
      ...prev,
      images: prev.images.filter(img => img.id !== id)
    }));
  };

  // 각 페이지별로 이미지 필터링
  const getImagesForPage = (pageNumber) => {
    return diaryData.images.filter(img => img.pageNumber === pageNumber);
  };

  return (
    <DiaryWrapper style={{ pointerEvents: isModalOpen ? 'none' : 'auto' }}>
      <BookWrapper>
        <HTMLFlipBook
          width={500}
          height={700}
          size="stretch"
          minWidth={400}
          maxWidth={1000}
          minHeight={400}
          maxHeight={1533}
          maxShadowOpacity={0.5}
          showCover={true}
          mobileScrollSupport={true}
          disableFlipByClick={true}
          useMouseEvents={true}
          clickEventForward={false}
          drawShadow={true}
          flippingTime={1000}
          className="flip-book"
          ref={flipBook}
          drawOnDemand={false}
          usePortrait={false}
          startPage={0}
        >
          <PageCover position="top" coverType={2} textColor="#000">
            BOOK TITLE
          </PageCover>
          {[...Array(10)].map((_, i) => (
            <Page 
              key={i + 1}
              number={i + 1}
              images={getImagesForPage(i + 1)}
              onImageDrop={onImageDrop}
              onDeleteImage={handleDeleteImage}
            >
              {`${i + 1}번째 장`}
            </Page>
          ))}
          <PageCover position="bottom" coverType={2} textColor="#000"> 
          </PageCover>
        </HTMLFlipBook>
      </BookWrapper>
    </DiaryWrapper>
  );
};

export default HomeDiary;