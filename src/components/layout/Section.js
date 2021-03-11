import React from 'react'
import styled from 'styled-components'

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
`
