// src/components/home/Page.jsx
import React, { forwardRef } from 'react';
import PropTypes from 'prop-types';
import { PageContent, PageNumber, DiaryContent } from '../../styles/home/HomeDiaryStyle';
import PageItem from './PageItem';

const Page = forwardRef((props, ref) => {
  const handleDragOver = (e) => {
    e.preventDefault();
    e.stopPropagation();
  };

  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    const rect = e.currentTarget.getBoundingClientRect();

    if (!window.draggedImage) return; 

    const x = e.clientX - rect.left - (window.draggedImage.offsetX || 0);
    const y = e.clientY - rect.top - (window.draggedImage.offsetY || 0);

    if (props.onImageDrop) {
      props.onImageDrop(props.number, x, y);
    }
  };

  // 서버에서 받은 item => PageItem이 요구하는 형태로 변환
  const transformItemToPageItem = (item) => {
    // 예시로는 item 필드가
    // { itemId, imageUrl, positionX, positionY, turnover, sticker... }
    return {
      id: item.itemId,
      url: item.imageUrl,
      alt: item.title || 'No Title',
      position: {
        x: item.positionX || 0,
        y: item.positionY || 0,
      },
      rotation: item.turnover || 0,
      style: {
        width: item.width ? `${item.width}px` : '100px',
        height: item.height ? `${item.height}px` : '100px',
      },
      isSticker: !!item.sticker,
    };
  };

  return (
    <div className="page" ref={ref}>
      <PageContent className="page-content">
        <PageNumber>{props.number}</PageNumber>
        <DiaryContent onDragOver={handleDragOver} onDrop={handleDrop}>
          {(props.images || []).map((item) => {
            const transformed = transformItemToPageItem(item);
            return (
              <PageItem
                key={transformed.id}
                image={transformed}
                onUpdate={props.onImageUpdate}
                onDelete={props.onDeleteImage}
                isEditMode={props.isEditMode}
                selectedImageId={props.selectedImageId}
                onImageSelect={props.onImageSelect}
                onItemSelectChange={props.onItemSelectChange}
              />
            );
          })}
        </DiaryContent>
      </PageContent>
    </div>
  );
});

Page.propTypes = {
  number: PropTypes.number.isRequired,
  images: PropTypes.array.isRequired,
  onImageDrop: PropTypes.func,
  onDeleteImage: PropTypes.func.isRequired,
  onImageUpdate: PropTypes.func.isRequired,
  isEditMode: PropTypes.bool.isRequired,
  selectedImageId: PropTypes.string,
  onImageSelect: PropTypes.func,
  onItemSelectChange: PropTypes.func,
};

export default Page;