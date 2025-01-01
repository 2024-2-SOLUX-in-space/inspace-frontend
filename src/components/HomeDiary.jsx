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
    
    const imageWidth = 100;
    const imageHeight = 100;
    
    const x = e.clientX - rect.left - (imageWidth / 2);
    const y = e.clientY - rect.top - (imageHeight / 2);
    
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
                top: `${image.position?.y}px`
              }}
            />
          ))}
        </DiaryContent>
      </PageContent>
    </div>
  );
});

const HomeDiary = ({ images = {}, onImageDrop }) => {
  const flipBook = useRef();

  return (
    <DiaryWrapper>
      <BookWrapper>
        <HTMLFlipBook
          width={858}
          height={1144}
          size="stretch"
          minWidth={492}
          maxWidth={1560}
          minHeight={624}
          maxHeight={2392}
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
          <PageCover position="bottom">THE END</PageCover>
        </HTMLFlipBook>
      </BookWrapper>
    </DiaryWrapper>
  );
};

export default HomeDiary;