import { createGlobalStyle } from 'styled-components'

import { theme } from './theme'
import { reset } from './reset'

export const GlobalStyle = createGlobalStyle`
  ${reset}

  html { 
    font-size: ${theme.fonts.sizes.htmlFontBase};
  }

  html,
  body {
    font-family: ${theme.fonts.families.sans};
    color: ${theme.colors.dark};
    width: 100vw;
    max-width: 100vw;
    overflow-x: hidden;
  }

  body {
    padding: ${theme.layout.bodyPadding};
    font-size: ${theme.fonts.sizes.s};
    
    @media ${({ theme }) => theme.layout.mediaQueries.maxSmall} {
      padding: ${({ theme }) => theme.layout.mobileBodyPadding};
    }
  }

  a {
    text-decoration: none;
    color: ${theme.colors.dark};
  }
`
