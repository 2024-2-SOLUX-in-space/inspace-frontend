import { createGlobalStyle } from 'styled-components';
import SejongWoff2 from '../assets/fonts/SejongGeulggot.woff2';
import SejongWoff from '../assets/fonts/SejongGeulggot.woff';

const GlobalStyle = createGlobalStyle`
  @font-face {
    font-family: 'SejongGeulggot';
    src: url(${SejongWoff2}) format('woff2'),
         url(${SejongWoff}) format('woff');
    font-weight: normal;
    font-style: normal;
    font-display: swap;
  }

  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
    font-family: 'SejongGeulggot', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
  }

  html, body {
    width: 100%;
    height: 100%;
  }

  body {
    line-height: 1.5;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
  }
`;

export default GlobalStyle;
