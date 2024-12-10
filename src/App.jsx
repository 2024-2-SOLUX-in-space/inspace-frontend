import { useState } from 'react'
import GlobalStyle from './styles/GlobalStyle'
import { ThemeProvider } from 'styled-components'

function App() {
  return (
    <ThemeProvider theme={{}}>
      <GlobalStyle />
      <div>
        <p>안녕하세요 세종병원체입니다.</p>
        <p>The quick brown fox jumps over the lazy dog.</p>
        <p>1234567890</p>
      </div>
    </ThemeProvider>
  );
}

export default App
