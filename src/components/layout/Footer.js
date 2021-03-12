import React from 'react'
import styled from 'styled-components'

import { Section } from './Section'

export function Footer() {
  return (
    <FooterSection sectionMargin="0" title="Say Hello">
      <footer>This is a footer</footer>
    </FooterSection>
  )
}

const FooterSection = styled(Section)`
  background: ${({ theme }) => theme.colors.terminalBlack};
  padding-top: 83px;
  color: ${({ theme }) => theme.colors.white};

  h3 {
    color: ${({ theme }) => theme.colors.slateLight};
  }
`
