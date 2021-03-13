import React from 'react'
import { ThemeProvider } from 'styled-components'
import Helmet from 'react-helmet'

import { theme } from '../../styles/theme'
import { GlobalStyle } from '../../styles/GlobalStyle'

import { Header } from './Header'
import { Footer } from './Footer'

export function Layout({ children }) {
  return (
    <>
      <Helmet>
        <link rel="stylesheet" href="/webFonts/webFonts.css" />
      </Helmet>
      <ThemeProvider theme={theme}>
        <GlobalStyle />
        <div>
          <Header />
          <main>{children}</main>
          <Footer />
        </div>
      </ThemeProvider>
    </>
  )
}
