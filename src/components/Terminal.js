import React, { useContext } from 'react'
import styled from 'styled-components'
import remark from 'remark'
import recommended from 'remark-preset-lint-recommended'
import remarkHtml from 'remark-html'

import CloseIcon from '../img/icon-close.svg'
import PlusIcon from '../img/icon-plus.svg'
import CloseTerminalIcon from '../img/icon-close-terminal.svg'
import MinimiseTerminalIcon from '../img/icon-minimise-terminal.svg'
import MaximiseTerminalIcon from '../img/icon-maximise-terminal.svg'
import LinuxIcon from '../img/icon-linux.svg'

import { DeviceContext } from './layout/Layout'
import { Section, Inner } from './layout/Section'

// TODO: compose this component
// TODO: Add cursor animation to lines where typing

// STRETCH TODO: Make the terminal interactive
//   - close / new tab
//   - minimise terminal
//   - maximise terminal
//   - close terminal
//   - basic commands

// TODO: implement a more SEO friendly way of hiding bio by default

export function Terminal({
  title,
  markdown,
  fullBio,
  terminalLines,
  clearTerminalLine,
  showBio,
  showFullBio,
  showInput,
  onClickBio,
  onClickFullBio,
}) {
  const { deviceName } = useContext(DeviceContext)

  const bioHTML = remark()
    .use(recommended)
    .use(remarkHtml)
    .processSync(markdown)
    .toString()

  return (
    <>
      <TitleSection title={title} />
      <TerminalSection maxWidth="1033px">
        <TerminalContainer>
          <Header>
            <Tab>
              <span>
                <img src={LinuxIcon} alt="Linux Penguin Icon" />
                marty@{deviceName}: ~/
              </span>
              <Close src={CloseIcon} alt="Close Tab Icon" />
            </Tab>
            <TabIcon>
              <img src={PlusIcon} alt="New Tab Icon" />
            </TabIcon>
            <Controls>
              <img src={MinimiseTerminalIcon} alt="Minimise Terminal Icon" />
              <img src={MaximiseTerminalIcon} alt="Maximise Terminal Icon" />
              <img src={CloseTerminalIcon} alt="Close Terminal Icon" />
            </Controls>
          </Header>
          <Content>
            <Inner>
              {terminalLines.length ? (
                terminalLines.map(([path, command], i) => (
                  <div key={i}>
                    <User>marty@{deviceName}</User>:<Path>{path}</Path>${' '}
                    {command}
                  </div>
                ))
              ) : (
                <div>
                  <User>marty@{deviceName}</User>:<Path>~</Path>${' '}
                </div>
              )}

              {showBio && (
                <Bio
                  dangerouslySetInnerHTML={{ __html: bioHTML }}
                  onClick={onClickBio}
                />
              )}

              {showFullBio && (
                <Bio
                  dangerouslySetInnerHTML={{ __html: fullBio }}
                  onClick={onClickFullBio}
                />
              )}

              {showInput && (
                <InputLine>
                  <div>
                    <User>marty@{deviceName}</User>:<Path>~/mh-codes</Path>$
                  </div>
                  {clearTerminalLine.length ? (
                    clearTerminalLine[0][1]
                  ) : (
                    <Input type="text" />
                  )}
                </InputLine>
              )}
            </Inner>
          </Content>
        </TerminalContainer>
      </TerminalSection>
    </>
  )
}

const TitleSection = styled(Section)`
  margin: 0;
`

const TerminalSection = styled(Section)`
  margin: 0 0 89px 0;
  // TODO: Remove from theme
  padding: ${({ theme }) => theme.layout.terminal.sectionPadding};

  @media ${({ theme }) => theme.layout.mediaQueries.maxSmall} {
    margin-bottom: 65px;
  }
`

const TerminalContainer = styled.div`
  ${({ theme }) => `
    background: ${theme.colors.terminalBlack};
    color: ${theme.colors.white};
    filter: drop-shadow(0px 4px 4px ${theme.colors.shadow});
    border-radius: ${theme.layout.terminal.borderRadius};
    cursor: default;
  `}
`

// TODO: Reduce padding on non-fullwidth
const Header = styled.div`
  height: 48px;
  padding: 8px 0 0 25px;
  background: ${({ theme }) => theme.colors.terminalGray};
  border-radius: ${({ theme }) =>
      `${theme.layout.terminal.borderRadius} `.repeat(2)}
    0px 0px;
  box-shadow: 0px 1px 15px ${({ theme }) => theme.colors.shadow};
  display: flex;

  @media ${({ theme }) => theme.layout.mediaQueries.maxSmall} {
    padding-left: 20px;
  }
`

const Tab = styled.div`
  ${({ theme }) => `
    background: ${theme.colors.terminalBlack};
    border-radius: ${`${theme.layout.terminal.borderRadius} `.repeat(2)} 0 0;
    padding: 0 9px 0 12px;
    display: flex;
    align-items: center;
    font-size: ${theme.fonts.sizes.xxs};
  `}

  span {
    display: flex;
    align-items: center;

    img {
      height: 20px;
      margin-right: 5px;
      position: relative;
      top: -1px;
    }
  }
`

const Close = styled.img`
  margin-left: 12px;
  padding: 3px;

  &:hover {
    cursor: pointer;
    background: ${({ theme }) => theme.colors.terminalGray};
    border-radius: 3px;
  }
`

const TabIcon = styled(Tab)`
  img {
    margin: 0;
  }
  background: none;
`

const Controls = styled.div`
  display: flex;
  margin-left: auto;
  position: relative;
  top: -3px;

  @media ${({ theme }) => theme.layout.mediaQueries.maxSmall} {
    display: none;
  }

  img {
    margin-right: 25px;
    cursor: pointer;
  }
`

const Content = styled.div`
  display: flex;
  justify-content: center;
  font-family: ${({ theme }) => theme.fonts.families.mono};
  padding: 30px 39px 45px 39px;
  min-height: 314px;
  box-shadow: 0px 1px 15px ${({ theme }) => theme.colors.shadow};
  border-radius: 0px 0px
    ${({ theme }) => `${theme.layout.terminal.borderRadius} `.repeat(2)};
  cursor: auto;
  font-size: ${({ theme }) => theme.fonts.sizes.s};
  line-height: ${({ theme }) => theme.fonts.lineHeight.terminal};
  word-wrap: break-word;

  @media ${({ theme }) => theme.layout.mediaQueries.maxSmall} {
    padding: 30px 22px 45px 22px;
  }

  p {
    margin-bottom: 20px;
    max-width: 777px;

    &:last-of-type {
      margin-bottom: 0;
    }
  }

  // TODO: remove duplications for animation and rely on global for simple underline reveal
  a {
    color: ${({ theme }) => theme.colors.white};
    text-decoration: none;
    position: relative;

    &:before {
      content: '';
      position: absolute;
      bottom: 2px;
      left: 0;
      width: 0;
      height: 1px;
      opacity: 0;
      background: ${({ theme }) => theme.colors.white};
      transition: opacity cubic-bezier(0.19, 1, 0.22, 1) 0.5s,
        width cubic-bezier(0.19, 1, 0.22, 1) 1s;
    }

    &:hover:before {
      opacity: 1;
      width: 100%;
    }
  }
`
const User = styled.span`
  color: ${({ theme }) => theme.colors.terminalGreen};
`

const Path = styled.span`
  color: ${({ theme }) => theme.colors.terminalBlue};
`
const Bio = styled.div`
  padding: 5px 0;
`

const InputLine = styled.div`
  display: flex;
  flex-wrap: wrap;

  div {
    flex-shrink: 0;
    max-width: 100%;
    word-wrap: break-word;
    margin-right: 8px;
  }
`

const Input = styled.input`
  background: none;
  border: none;
  color: ${({ theme }) => theme.colors.white};
  outline: none;
  font-size: ${({ theme }) => theme.fonts.sizes.s};
  line-height: ${({ theme }) => theme.fonts.lineHeight.terminal};
  font-family: ${({ theme }) => theme.fonts.families.mono};
  padding: 0;
  flex: 1;

  @media ${({ theme }) => theme.layout.mediaQueries.maxSmall} {
    display: none;
  }
`
