import React from 'react'
import { ThemeProvider } from 'styled-components'

import '../../styles/webFonts.css'

import { theme } from '../../styles/theme'
import { GlobalStyle } from '../../styles/GlobalStyle'

import { Header } from './Header'
import { Footer } from './Footer'

export function Layout({ children }) {
  return (
    <ThemeProvider theme={theme}>
      <GlobalStyle />
      <div>
        <Header />
        <main>{children}</main>
        <Footer />
      </div>
    </ThemeProvider>
  )
}
