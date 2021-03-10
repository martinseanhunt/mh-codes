import React from 'react'
import { ThemeProvider } from 'styled-components'

import { theme } from '../../styles/theme'
import { GlobalStyle } from '../../styles/GlobalStyle'

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
