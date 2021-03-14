import React from 'react'
import { ThemeProvider } from 'styled-components'
import Helmet from 'react-helmet'
import styled from 'styled-components'

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
        <Container>
          <Header />
          <main>{children}</main>
          <Footer />
        </Container>
      </ThemeProvider>
    </>
  )
}

const Container = styled.div`
  max-width: 100vw;
  overflow-x: hidden;
`
