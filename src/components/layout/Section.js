import React from 'react'
import styled from 'styled-components'

export function Section({ children }) {
  return (
    <Container>
      <Inner>{children}</Inner>
    </Container>
  )
}

const Container = styled.section`
  display: flex;
  justify-content: center;
`

const Inner = styled.div`
  width: 100%;
  max-width: ${({ theme: { layout } }) => layout.maxWidth};
`
