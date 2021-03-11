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
    color: ${theme.colors.body};
  }

  body {
    padding: ${theme.layout.bodyPadding};
    font-size: ${theme.fonts.sizes.l};
  }

  * {
    box-sizing: border-box;
  }
`
