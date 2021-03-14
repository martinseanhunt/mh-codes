import React, { useContext } from 'react'
import styled, { ThemeContext } from 'styled-components'

import { Section } from './layout/Section'

// TODO: lines from CMS - update CMS for new format
// TODO: DRY - lots of borrowed styles here. Running out of time now and cutting corners
// TODO: get platform dynamically

export function PageHeading({ title }) {
  const theme = useContext(ThemeContext)

  // TODO: decide whether to maxwidth mini terminal maxWidth={'1008px'}

  return (
    <>
      <TitleSection title={title} />
      <HeadingSection>
        <MiniTerminal>
          <div>
            <User>marty@DESKTOP</User>:<Path>~/sites/martinhunt</Path>$ cd
            projects
            <br />
            <User>marty@DESKTOP</User>
            <Path>~/sites/martinhunt/projects</Path>$ cat projects.md
            <p>Projects hand crafted with love...</p>
          </div>
        </MiniTerminal>
      </HeadingSection>
    </>
  )
}

const TitleSection = styled(Section)`
  margin: 0;
`

const HeadingSection = styled(Section)`
  margin-bottom: 88px;
  padding-left: 48px;
  padding-right: 48px;

  @media ${({ theme }) => theme.layout.mediaQueries.maxSmall} {
    padding-left: calc(
      ${({ theme }) => theme.layout.mobileSectionPadding} - 2px
    );
    padding-right: calc(
      ${({ theme }) => theme.layout.mobileSectionPadding} - 2px
    );
    margin-bottom: 65px;
  }
`

const Body = styled.div`
  font-size: ${({ theme }) => theme.fonts.sizes.m};
  font-family: ${({ theme }) => theme.fonts.families.sansLight};
  color: ${({ theme }) => theme.colors.slate};
  letter-spacing: 0.03em;
  line-height: 2.4rem;
`

const MiniTerminal = styled.ul`
  word-wrap: break-word;
  padding: 33px 22px 33px 22px;
  background: ${({ theme }) => theme.colors.terminalBlack};
  border-radius: 3px;
  filter: drop-shadow(0px 4px 4px ${({ theme }) => theme.colors.shadow});
  color: ${({ theme }) => theme.colors.white};
  font-family: ${({ theme }) => theme.fonts.families.mono};
  display: flex;
  justify-content: center;
  line-height: ${({ theme }) => theme.fonts.lineHeight.terminal};

  div {
    width: 100%;
    max-width: ${({ theme }) => theme.layout.maxWidth};
  }

  li,
  ul {
    display: inline-block;
  }

  li {
    margin-left: 7px;
  }

  a {
    color: ${({ theme }) => theme.colors.white};

    &:hover {
      text-decoration: underline;
    }
  }

  p {
    padding-top: 5px;
  }
`

const User = styled.span`
  color: ${({ theme }) => theme.colors.terminalGreen};
`

const Path = styled.span`
  color: ${({ theme }) => theme.colors.terminalBlue};
`
