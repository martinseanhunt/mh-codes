import { createGlobalStyle } from 'styled-components'
import { theme } from './theme'

export const GlobalStyle = createGlobalStyle`
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
