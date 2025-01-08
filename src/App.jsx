import { useState } from 'react'
import GlobalStyle from './styles/GlobalStyle'
import { ThemeProvider } from 'styled-components'
import MenuSidebar from './components/MenuSidebar';

function App() {
  return (
    <ThemeProvider theme={{}}>
      <GlobalStyle />
      <div>
        <MenuSidebar />
      </div>
    </ThemeProvider>
  );
}

export default App