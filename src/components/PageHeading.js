import React, { useContext } from 'react'
import styled from 'styled-components'
import remark from 'remark'
import recommended from 'remark-preset-lint-recommended'
import remarkHtml from 'remark-html'

import { Section } from './layout/Section'
import { DeviceContext } from './layout/Layout'

// TODO: DRY - lots of borrowed styles here. Running out of time now and cutting corners

export function PageHeading({ title, markdown, pageName }) {
  const { deviceName } = useContext(DeviceContext)
  const bodyHTML = remark()
    .use(recommended)
    .use(remarkHtml)
    .processSync(markdown)
    .toString()

  return (
    <>
      <TitleSection title={title} />
      <HeadingSection>
        <MiniTerminal>
          <div>
            <User>marty@{deviceName}</User>:<Path>~/mh-codes</Path>$ cd{' '}
            {pageName}
            <br />
            <User>marty@{deviceName}</User>
            <Path>~/mh-codes/{pageName}</Path>$ cat {pageName}.md
            <div dangerouslySetInnerHTML={{ __html: bodyHTML }} />
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
  margin-bottom: 72px;
  padding-left: 48px;
  padding-right: 48px;

  @media ${({ theme }) => theme.layout.mediaQueries.maxSmall} {
    padding-left: calc(
      ${({ theme }) => theme.layout.mobileSectionPadding} - 2px
    );
    padding-right: calc(
      ${({ theme }) => theme.layout.mobileSectionPadding} - 2px
    );
    margin-bottom: 54px;
  }
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
