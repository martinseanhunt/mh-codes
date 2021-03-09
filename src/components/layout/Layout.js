import React from 'react'
import { createGlobalStyle } from 'styled-components'

import { Header } from './Header'

export function Layout({ children }) {
  return (
    <>
      <GlobalStyle />
      <div>
        <Header />
        <main>{children}</main>
      </div>
    </>
  )
}

// TODO: set up theme for colours, font sizes etc
const GlobalStyle = createGlobalStyle`
  html,
  body {
    padding: 0;
    margin: 0;
    font-family: -apple-system, Roboto, sans-serif, serif;
    color: #1c1b21;
  }

  body {
    padding: 50px;
  }

  * {
    box-sizing: border-box;
  }
`
