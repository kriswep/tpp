import React, { Component, Suspense } from 'react';
import { createGlobalStyle, ThemeProvider } from 'styled-components/macro';

import ErrorBoundary from './components/ErrorBoundary';
import Nav from './components/Nav';
import Routes from './Routes';

const theme = {
  dark: '#020202',
  light: '#fcfcfc',
  mode: 'dark',
  fontUrl: `${process.env.PUBLIC_URL}/radnikanext-medium-webfont.woff2`,
  small: '0.8rem',
  normal: '1.5rem',
  big: '3rem',
  huge: '5rem',
};

const GlobalStyle = createGlobalStyle`
  @font-face {
    font-family: 'radnika_next';
    src: ${props => `url('${theme.fontUrl}') format('woff2')`};
    font-weight: normal;
    font-style: normal;
  }
  html {
    box-sizing: border-box;
    font-size: 10px;
  }
  *, *:before, *:after {
    box-sizing: inherit;
  }
  body {
    padding: 0;
    margin: 0;
    font-size: ${props => theme.normal};;
    line-height: 2;
    font-family: 'radnika_next', -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen',
    'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue',
    sans-serif;
    background-color: ${props =>
      theme.mode === 'dark' ? theme.dark : theme.light};
  }
`;

class App extends Component {
  render() {
    return (
      <ErrorBoundary>
        <GlobalStyle />
        <Suspense fallback={<div>Loading...</div>}>
          <ThemeProvider theme={theme}>
            <>
              <Nav />
              <Routes />
            </>
          </ThemeProvider>
        </Suspense>
      </ErrorBoundary>
    );
  }
}

export default App;
