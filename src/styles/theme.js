// TODO: Decide how granular to get in theme and whether to move some of this out in to components
// TODO: Use color names from figma
// TODO: Standardise theme and come up with a more comprehensive design system
// TODO: Strip down font sizes

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
    slateLight: '#C1BEC8',
  },
  fonts: {
    sizes: {
      htmlFontBase: '10px',
      xxs: '1.1rem',
      s: '1.3rem',
      m: '1.5rem',
      xl: '2.2rem',
    },
    lineHeight: {
      terminal: '2.34rem',
    },
    families: {
      sans: `"Larsseit-Regular", -apple-system, Roboto, sans-serif`,
      sansLight: `"Larsseit-Light", -apple-system, Roboto, sans-serif`,
      mono: `'PT Mono', sans-serif`,
    },
  },
  layout: {
    maxWidth: '960px',
    bodyPadding: '32px 0 0 0',
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
