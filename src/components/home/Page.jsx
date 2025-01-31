// src/components/home/Page.jsx
import React, { forwardRef, useContext } from 'react';
import PropTypes from 'prop-types';
import { PageContent, PageNumber, DiaryContent } from '../../styles/home/HomeDiaryStyle';
import PageItem from './PageItem';
import api from '../../api/api';
import { SpaceContext } from '../../context/SpaceContext';

const Page = forwardRef((props, ref) => {
  const { activeSpace } = useContext(SpaceContext);

  const handleDragOver = (e) => {
    e.preventDefault();
    e.stopPropagation();
  };

  const handleDrop = async (e) => {
    e.preventDefault();
    e.stopPropagation();
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
      sticker: window.draggedImage.sticker
    };


    try {
      const endpoint = newItem.ctype === "sticker" ? "/api/page/sticker" : "/api/page";
      const method = newItem.ctype === "sticker" ? api.post : api.put;
      const response = await method(`${endpoint}?space_id=${activeSpace.id}&pageNum=${props.number}`, [newItem]);
      if (response.status === 200) {
        props.onPageUpdate(props.number);
      }
    } catch (error) {
      console.error("❌ 아이템 저장 실패", error);
    }
  };

  const transformItemToPageItem = (item) => {

    return {
      id: item.itemId,
      title: item.title,
      imageUrl: item.imageUrl,
      contentsUrl: item.contentsUrl,
      ctype: item.ctype,
      position: {
        x: item.positionX || 0,
        y: item.positionY || 0,
      },
      style: {
        width: item.width ? `${item.width}px` : '100px',
        height: item.height ? `${item.height}px` : '100px',
      },
      turnover: item.turnover,
      sequence: item.sequence || 0,
      sticker: item.sticker,
      rotation: item.turnover || 0,
      isSticker: !!item.sticker,
    };
  };

  const handleDragStart = (item) => (e) => {
    const rect = e.target.getBoundingClientRect();
    const offsetX = e.clientX - rect.left;
    const offsetY = e.clientY - rect.top;

    window.draggedImage = {
      id: item.id,
      title: item.title || "string",
      imageUrl: item.src || "string",
      contentsUrl: item.src || "string",
      ctype: item.ctype,
      positionX: offsetX,
      positionY: offsetY,
      width: item.width || 100,
      height: item.height || 100,
      turnover: item.turnover || 0,
      sequence: 1,
      sticker: item.ctype === 'sticker' ? item : null,
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
                pageNum={props.number}
                onUpdate={props.onImageUpdate}
                onDelete={props.onDeleteImage}
                isEditMode={props.isEditMode}
                selectedImageId={props.selectedImageId}
                onImageSelect={props.onImageSelect}
                onItemSelectChange={props.onItemSelectChange}
                handleDragStart={handleDragStart}
                handleDragOver={handleDragOver}
                handleDrop={handleDrop}
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