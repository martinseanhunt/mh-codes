import React, { useState, createContext, useEffect } from 'react'
import { ThemeProvider } from 'styled-components'
import Helmet from 'react-helmet'
import styled from 'styled-components'

import { theme } from '../../styles/theme'
import { GlobalStyle } from '../../styles/GlobalStyle'

import { Header } from './Header'
import { Footer } from './Footer'

export const DeviceContext = createContext()

const devices = {
  desktop: {
    isMobile: false,
    deviceName: 'DESKTOP',
  },
  mobile: {
    isMobile: true,
    deviceName: 'MOBILE',
  },
}

export function Layout({ children }) {
  const [device, setDevice] = useState(devices.desktop)
  const bp = theme.layout.breakPoints.small.replace('px', '')

  const { isMobile } = device
  useEffect(() => {
    function checkWidth() {
      if (window.innerWidth <= bp && !isMobile) setDevice(devices.mobile)
      if (window.innerWidth > bp && isMobile) setDevice(devices.desktop)
    }

    window.addEventListener('resize', checkWidth)
    checkWidth()

    return () => {
      window.removeEventListener('resize', checkWidth)
    }
  }, [isMobile, bp])

  return (
    <>
      <Helmet>
        <link rel="stylesheet" href="/webFonts/webFonts.css" />
      </Helmet>
      <ThemeProvider theme={theme}>
        <GlobalStyle />
        <DeviceContext.Provider value={device}>
          <Container>
            <Header />
            <main>{children}</main>
            <Footer />
          </Container>
        </DeviceContext.Provider>
      </ThemeProvider>
    </>
  )
}

const Container = styled.div`
  max-width: 100vw;
  overflow-x: hidden;
`
