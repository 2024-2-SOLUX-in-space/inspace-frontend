import styled from 'styled-components';

export const DiaryWrapper = styled.div`
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100%;
`;

export const BookWrapper = styled.div`
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;

  .page {
    padding: 0px;
    background-color: hsl(35, 55%, 98%);
    color: hsl(35, 35%, 35%);
    border: solid 1px hsl(35, 20%, 70%);
    overflow: hidden;

    &.--left {
      border-right: 0;
      box-shadow: inset -7px 0 30px -7px rgba(0, 0, 0, 0.4);
    }

    &.--right {
      border-left: 0;
      box-shadow: inset 7px 0 30px -7px rgba(0, 0, 0, 0.4);
    }

    &.hard {
      background-color: hsl(35, 50%, 90%);
      border: solid 1px hsl(35, 20%, 50%);
    }

    &.page-cover {
      background-color: hsl(35, 45%, 80%);
      color: hsl(35, 35%, 35%);
      border: solid 1px hsl(35, 20%, 50%);

      &.page-cover-top {
        box-shadow:
          inset 0px 0 30px 0px rgba(36, 10, 3, 0.5),
          -2px 0 5px 2px rgba(0, 0, 0, 0.4);
      }

      &.page-cover-bottom {
        box-shadow:
          inset 0px 0 30px 0px rgba(36, 10, 3, 0.5),
          10px 0 8px 0px rgba(0, 0, 0, 0.4);
      }

      h2 {
        text-align: center;
        padding-top: 50%;
        font-size: 210%;
      }
    }
  }

  .page-content {
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    align-items: stretch;

    .page-header {
      height: 30px;
      font-size: 100%;
      text-transform: uppercase;
      text-align: center;
    }

    .page-image {
      height: 100%;
      background-size: contain;
      background-position: center center;
      background-repeat: no-repeat;
    }

    .page-text {
      height: 100%;
      flex-grow: 1;
      font-size: 80%;
      text-align: justify;
      margin-top: 10px;
      padding-top: 10px;
      box-sizing: border-box;
      border-top: solid 1px hsl(35, 55%, 90%);
    }

    .page-footer {
      height: 30px;
      border-top: solid 1px hsl(35, 55%, 90%);
      font-size: 80%;
      color: hsl(35, 20%, 50%);
      text-align: right;
    }
  }
`;
