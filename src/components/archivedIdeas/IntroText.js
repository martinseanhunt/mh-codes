import React from 'react'
import styled from 'styled-components'

import { Section } from './layout/Section'

export function IntroText() {
  // TODO: refactor and use syntax hihglighting plugin
  // TODO: Decide which version of this component / style to use

  return (
    <Section
      title="Martin Hunt - Software Engineer & Technical Lead"
      sectionMargin="0 0 85px 0"
    >
      <Code>
        Hi, I'm Martin, a software engineer and techical lead based in Bristol,
        UK.
        <br />
      </Code>
      <Code>
        I'm passionate about technology and how it can be used to change the
        world for the better.
      </Code>
    </Section>
  )
}

const Code = styled.code`
  font-family: ${({ theme }) => theme.fonts.families.sans};
  color: ${({ theme }) => theme.fonts.families.slate};
  letter-spacing: 0.03em;
  font-size: ${({ theme }) => theme.fonts.sizes.m};
  position: relative;
  line-height: 30px;
`
