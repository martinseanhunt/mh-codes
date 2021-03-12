import React from 'react'
import styled from 'styled-components'

import BackgroundDot from '../../img/background-dot.svg'

// TODO Accept bottom margin as prop or use default value from theme

export function Section({
  children,
  maxWidth,
  title,
  sectionMargin,
  sectionPadding,
  ...rest
}) {
  return (
    <Container
      sectionPadding={sectionPadding}
      sectionMargin={sectionMargin}
      {...rest}
    >
      <Inner maxWidth={maxWidth}>
        {title && <Title>&#47;&#47; {title}</Title>}
        {children}
      </Inner>
    </Container>
  )
}

export const Container = styled.section`
  display: flex;
  justify-content: center;
  padding: ${({ theme, sectionPadding }) =>
    sectionPadding || theme.layout.sectionPadding};
  margin: ${({ theme, sectionMargin }) =>
    sectionMargin || theme.layout.sectionMargin};

  // TODO: Delete min height
  ${({ dottedBackground }) =>
    dottedBackground &&
    `
    background-image: url(${BackgroundDot});    
    background-position: 0 -6px;
    background-size: 15px 15px;
  `}
`

export const Inner = styled.div`
  width: 100%;
  max-width: ${({ theme, maxWidth }) => maxWidth || theme.layout.maxWidth};
`

const Title = styled.h3`
  font-family: ${({ theme }) => theme.fonts.families.mono};
  font-size: ${({ theme }) => theme.fonts.sizes.s};
  color: ${({ theme }) => theme.colors.slate};
  // TODO: Theme
  font-weight: 700;
  letter-spacing: 0.1em;
  text-transform: uppercase;
  margin-bottom: 37px;
  line-height: 1;
`
