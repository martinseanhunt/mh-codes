import React from 'react'
import styled from 'styled-components'

import { Section } from './layout/Section'

export function IntroTextCode() {
  // TODO: refactor and use syntax hihglighting plugin

  return (
    <Section
      title="Martin Hunt - Software Engineer & Technical Lead"
      sectionMargin="0 0 55px 0"
    >
      <Code>
        <span style={{ color: '#398de6' }}>const </span>
        <span style={{ color: '#ded643' }}>generateIntro </span>=
        <span style={{ color: '#df86eb' }}> (</span>
        <span style={{ color: '#4EBFFF' }}>name</span>
        <span>,</span>
        <span style={{ color: '#4EBFFF' }}> roles</span>
        <span style={{ color: '#df86eb' }}>) </span>
        <span style={{ color: '#398de6' }}>{' => '}</span>
        <span style={{ color: '#d98d45' }}>`Hi I'm </span>
        <span style={{ color: '#398de6' }}>{'${'}</span>
        <span style={{ color: '#4EBFFF' }}>name</span>
        <span style={{ color: '#398de6' }}>{'}'}</span>
        <span style={{ color: '#d98d45' }}> - </span>
        <span style={{ color: '#398de6' }}>{'${'}</span>
        <span style={{ color: '#4EBFFF' }}>roles</span>
        <span style={{ color: '#ded643' }}>.join</span>
        <span style={{ color: '#df86eb' }}>(</span>
        <span style={{ color: '#d98d45' }}>{"' & '"}</span>
        <span style={{ color: '#df86eb' }}>)</span>
        <span style={{ color: '#4EBFFF' }}>{'}'}</span>
        <span style={{ color: '#d98d45' }}>.`</span>
        <br />
        <span style={{ color: '#398de6' }}>const </span>
        <span style={{ color: '#4EBFFF' }}>intro </span>=
        <span style={{ color: '#ded643' }}> generateIntro</span>
        <span style={{ color: '#df86eb' }}>(</span>
        <span style={{ color: '#d98d45' }}>'</span>
        <span style={{ color: '#d98d45', textDecoration: 'none' }}>
          Martin Hunt
        </span>
        <span style={{ color: '#d98d45' }}>'</span>
        <span>, </span>
        <span style={{ color: '#4EBFFF' }}>[</span>
        <span style={{ color: '#d98d45' }}>'</span>
        <span style={{ color: '#d98d45', textDecoration: 'none' }}>
          Software Engineer
        </span>
        <span style={{ color: '#d98d45' }}>'</span>
        <span>, </span>
        <span style={{ color: '#d98d45' }}>'</span>
        <span style={{ color: '#d98d45', textDecoration: 'none' }}>
          Technical Lead
        </span>
        <span style={{ color: '#d98d45' }}>'</span>
        <span style={{ color: '#4EBFFF' }}>]</span>
        <span style={{ color: '#df86eb' }}>) </span>
        <br />
        <br />
        <span style={{ color: '#398de6' }}>console</span>
        <span style={{ color: '#ded643' }}>.log</span>
        <span style={{ color: '#df86eb' }}>(</span>
        <span style={{ color: '#4EBFFF' }}>intro</span>
        <span style={{ color: '#df86eb' }}>) </span>
      </Code>
    </Section>
  )
}

const Code = styled.code`
  font-family: ${({ theme }) => theme.fonts.families.mono};
  font-size: ${({ theme }) => theme.fonts.sizes.s};
  position: relative;
  top: -20px;
  line-height: 30px;
`
