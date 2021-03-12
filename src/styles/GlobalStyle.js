import { createGlobalStyle } from 'styled-components'

import { theme } from './theme'
import { reset } from './reset'
import { webFonts } from './webFonts'

export const GlobalStyle = createGlobalStyle`
  ${webFonts}
  ${reset}

  html { 
    font-size: ${theme.fonts.sizes.htmlFontBase};
  }

  html,
  body {
    font-family: ${theme.fonts.families.sans};
    color: ${theme.colors.dark};
  }

  body {
    padding: ${theme.layout.bodyPadding};
    font-size: ${theme.fonts.sizes.s};
  }

  html {
    -webkit-box-sizing: border-box;
    -moz-box-sizing: border-box;
    box-sizing: border-box;
  }

  *, *:before, *:after {
    -webkit-box-sizing: inherit;
    -moz-box-sizing: inherit;
    box-sizing: inherit;
  }
`
