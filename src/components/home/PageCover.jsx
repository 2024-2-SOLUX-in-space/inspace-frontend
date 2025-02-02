import React from 'react';
import { useSelector } from 'react-redux';

const PageCover = React.forwardRef((props, ref) => {
  const activeSpace = useSelector(state => state.space.activeSpace);

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

  const imageUrl = getCoverImage(props.position, activeSpace.coverType);
  
  const getTitleStyle = (coverType) => {
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

  const titleStyle = getTitleStyle(activeSpace.coverType);

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
          {activeSpace.title}
        </h2>
      </div>
    </div>
  );
});

export default PageCover;