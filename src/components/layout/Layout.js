import React from 'react'
import { createGlobalStyle, ThemeProvider } from 'styled-components'

import { Header } from './Header'

export function Layout({ children }) {
  return (
    <>
      <GlobalStyle />
      <div>
        <ThemeProvider theme={theme}>
          <Header />
          <main>{children}</main>
        </ThemeProvider>
      </div>
    </>
  )
}

const theme = {
  colors: {
    body: '#1c1b21',
    highlight: '#32a852',
  },
}

const GlobalStyle = createGlobalStyle`
  html,
  body {
    padding: 0;
    margin: 0;
    font-family: -apple-system, Roboto, sans-serif, serif;
    color: ${theme.colors.body};
  }

  body {
    padding: 50px;
  }

  * {
    box-sizing: border-box;
  }
`
