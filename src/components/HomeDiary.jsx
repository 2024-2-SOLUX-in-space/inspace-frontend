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

const PageCover = React.forwardRef((props, ref) => {
  return (
    <div className={`page page-cover ${props.position === 'top' ? 'page-cover-top' : 'page-cover-bottom'}`} 
         ref={ref} 
         data-density="hard">
      <div className="page-content">
        <h2>{props.children}</h2>
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
            <DraggableImage 
              key={image.id} 
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
          ))}
        </DiaryContent>
      </PageContent>
    </div>
  );
});

const HomeDiary = ({ images = {}, onImageDrop, isModalOpen }) => {
  const flipBook = useRef();

  return (
    <DiaryWrapper style={{ pointerEvents: isModalOpen ? 'none' : 'auto' }}>
      <BookWrapper>
        <HTMLFlipBook
          width={500}
          height={700}
          size="stretch"
          minWidth={400}
          maxWidth={1000}
          minHeight={500}
          maxHeight={1500}
          maxShadowOpacity={0.5}
          showCover={true}
          mobileScrollSupport={true}
          className="flip-book"
          ref={flipBook}
          drawOnDemand={false}
          flippingTime={1000}
          usePortrait={false}
          startPage={0}
        >
          <PageCover position="top">BOOK TITLE</PageCover>
          <Page number={1} images={images[1]} onImageDrop={onImageDrop}>첫 장</Page>
          <Page number={2} images={images[2]} onImageDrop={onImageDrop}>두 번째 장</Page>
          <Page number={3} images={images[3]} onImageDrop={onImageDrop}>세 번째 장</Page>
          <Page number={4} images={images[4]} onImageDrop={onImageDrop}>네 번째 장</Page>
          <Page number={5} images={images[5]} onImageDrop={onImageDrop}>다섯 번째 장</Page>
          <Page number={6} images={images[6]} onImageDrop={onImageDrop}>여섯 번째 장</Page>
          <Page number={7} images={images[7]} onImageDrop={onImageDrop}>일곱 번째 장</Page>
          <Page number={8} images={images[8]} onImageDrop={onImageDrop}>여덟 번째 장</Page>
          <Page number={9} images={images[9]} onImageDrop={onImageDrop}>아홉 번째 장</Page>
          <Page number={10} images={images[10]} onImageDrop={onImageDrop}>열 번째 장</Page>        
          <PageCover position="bottom">THE END</PageCover>
        </HTMLFlipBook>
      </BookWrapper>
    </DiaryWrapper>
  );
};

export default HomeDiary;