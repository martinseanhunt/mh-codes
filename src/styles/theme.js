// TODO: Decide how granular to get in theme and whether to move some of this out in to components
// TODO: Use color names from figma

export const theme = {
  colors: {
    dark: '#1D1335',
    terminalBlack: '#18181D',
    terminalGray: '#27272E',
    terminalGreen: '#86FF1E',
    terminalBlue: '#4EBFFF',
    white: '#FFF',
    shadow: 'rgba(0, 0, 0, 0.25)',
    slate: '#554E67',
    faint: '#E8E7EB',
  },
  fonts: {
    sizes: {
      htmlFontBase: '10px',
      xxs: '1.1rem',
      xs: '1.2rem',
      s: '1.3rem',
      m: '1.5rem',
      l: '1.6rem',
      xl: '2.2rem',
    },
    lineHeight: {
      terminal: '2.34rem',
    },
    families: {
      sans: `"Larsseit-Regular", -apple-system, Roboto, sans-serif`,
      mono: `'PT Mono', sans-serif`,
    },
  },
  layout: {
    maxWidth: '960px',
    bodyPadding: '35px 0 0 0',
    sectionPadding: '0 50px 0 50px',
    sectionMargin: '0 0 150px 0',
    header: {
      navGap: '40px',
    },
    terminal: {
      maxWidth: '1060px',
      borderRadius: '3px',
      sectionPadding: '0 10px 0 10px',
    },
  },
}
