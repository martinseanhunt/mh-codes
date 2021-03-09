import React from 'react'
import { createGlobalStyle } from 'styled-components'

export function Layout({ children }) {
  return (
    <>
      <GlobalStyle />
      <div>
        <main>{children}</main>
      </div>
    </>
  )
}

const GlobalStyle = createGlobalStyle`
  html,
  body {
    padding: 0;
    margin: 0;
    font-family: -apple-system, Roboto, sans-serif, serif;
    color: #1c1b21;
  }
`
