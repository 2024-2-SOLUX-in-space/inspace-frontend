import React, { forwardRef, useImperativeHandle } from 'react';
import HTMLFlipBook from 'react-pageflip';
import { DiaryWrapper, BookWrapper } from '../styles/HomeDiaryStyle';

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
  if (props.isCover) {
    return (
      <div className="page" ref={ref}>
        <div className="page-content">
          <h2>{props.children}</h2>
        </div>
      </div>
    );
  }

  return (
    <div className="page" ref={ref}>
      <div className="page-content">
        <h2 className="page-header">Page header - {props.number}</h2>
        <div className="page-image" style={{ backgroundImage: `url(${props.image})` }}></div>
        <div className="page-text">{props.children}</div>
        <div className="page-footer">{props.number}</div>
      </div>
    </div>
  );
});

class HomeDiaryClass extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      page: 0,
      totalPage: 0,
      orientation: 'landscape',
      state: 'read'
    };
    this.flipBook = React.createRef();
  }

  onPage = (e) => {
    this.setState({
      page: e.data,
    });
  };

  onChangeState = (e) => {
    this.setState({
      state: e.data,
    });
  };

  onChangeOrientation = (e) => {
    this.setState({
      orientation: e.data,
    });
  };

  componentDidMount() {
    setTimeout(() => {
      if (this.flipBook.current) {
        this.setState({
          totalPage: this.flipBook.current.pageFlip().getPageCount(),
        });
      }
    }, 100);
  }

  render() {
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
            onFlip={this.onPage}
            onChangeState={this.onChangeState}
            onChangeOrientation={this.onChangeOrientation}
            className="flip-book"
            ref={this.flipBook}
            drawOnDemand={false}
            flippingTime={1000}
            usePortrait={false}
            startPage={0}
          >
            <PageCover position="top">BOOK TITLE</PageCover>
            <Page number={1}>첫 장</Page>
            <Page number={2}>두 번째 장</Page>
            <Page number={3}>세 번째 장</Page>
            <Page number={4}>네 번째 장</Page>
            <PageCover position="bottom">THE END</PageCover>
          </HTMLFlipBook>
        </BookWrapper>
      </DiaryWrapper>
    );
  }
}

export default HomeDiaryClass;