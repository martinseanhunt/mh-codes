import React from 'react'
import styled from 'styled-components'

export function Section({ children, maxWidth, sectionPadding, ...rest }) {
  return (
    <Container sectionPadding={sectionPadding} {...rest}>
      <Inner maxWidth={maxWidth}>{children}</Inner>
    </Container>
  )
}

export const Container = styled.section`
  display: flex;
  justify-content: center;
  padding: ${({ theme, sectionPadding }) =>
    sectionPadding || theme.layout.sectionPadding};
`

export const Inner = styled.div`
  width: 100%;
  max-width: ${({ theme, maxWidth }) => maxWidth || theme.layout.maxWidth};
`
