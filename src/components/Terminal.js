import React, { useContext, useRef } from 'react'
import { Link } from 'gatsby'
import styled, { ThemeContext } from 'styled-components'

import CloseIcon from '../img/icon-close.svg'
import PlusIcon from '../img/icon-plus.svg'
import CloseTerminalIcon from '../img/icon-close-terminal.svg'
import MinimiseTerminalIcon from '../img/icon-minimise-terminal.svg'
import MaximiseTerminalIcon from '../img/icon-maximise-terminal.svg'

import { Section, Inner } from './layout/Section'

// TODO: compose this component
// TODO: Animate component, typing etc
// TODO: cat fullbio.md on bio click
// STRETCH TODO: Make the terminal interactive
//   - close / new tab
//   - minimise terminal
//   - maximise terminal
//   - close terminal
//   - basic commands

export function Terminal() {
  const theme = useContext(ThemeContext)
  const inputRef = useRef()

  const focusInput = () =>
    document.activeElement !== inputRef.current && inputRef.current.focus()

  return (
    <TerminalSection
      maxWidth={theme.layout.terminal.maxWidth}
      sectionPadding={theme.layout.terminal.sectionPadding}
      onClick={focusInput}
    >
      <TerminalContainer>
        <Header>
          <Tab>
            <span>marty@DESKTOP: ~/</span>
            <img src={CloseIcon} alt="Close Tab Icon" />
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
            {/* TODO: Content from CMS */}
            <User>marty@DESKTOP-COQ6V76</User>:<Path>~</Path>$ cd
            sites/martinhunt
            <br />
            <User>marty@DESKTOP-COQ6V76</User>:<Path>~/sites/martinhunt</Path>
            $ cat bio.md <br />
            <Bio>
              <p>Hi, I’m *Martin Hunt*</p>

              <p>
                I’m a **creative**, **passionate** software engineer and
                technical lead\ <br />
                with over a decades worth of experience building production
                websites\ <br />
                and applications...
              </p>

              <p>
                <Link to="/bio">
                  [READ FULL BIO](/bio "Learn more about me")
                </Link>{' '}
              </p>
            </Bio>
            <InputLine>
              <div>
                <User>marty@DESKTOP-COQ6V76</User>:
                <Path>~/sites/martinhunt</Path>$
              </div>
              <Input type="text" ref={inputRef}></Input>
            </InputLine>
          </Inner>
        </Content>
      </TerminalContainer>
    </TerminalSection>
  )
}

const TerminalSection = styled(Section)`
  margin: ${({ theme }) => theme.layout.sectionMargin};
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
  padding: 8px 0 0 38px;
  background: ${({ theme }) => theme.colors.terminalGray};
  border-radius: ${({ theme }) =>
      `${theme.layout.terminal.borderRadius} `.repeat(2)}
    0px 0px;
  box-shadow: 0px 1px 15px ${({ theme }) => theme.colors.shadow};
  display: flex;
`

const Tab = styled.div`
  ${({ theme }) => `
    background: ${theme.colors.terminalBlack};
    border-radius: ${`${theme.layout.terminal.borderRadius} `.repeat(2)} 0 0;
    padding: 0 9px 0 12px;
    display: flex;
    align-items: center;
    font-size: ${theme.fonts.sizes.xs};
  `}

  img {
    margin-left: 12px;
    padding: 3px;

    &:hover {
      cursor: pointer;
      background: ${({ theme }) => theme.colors.terminalGray};
      border-radius: 3px;
    }
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

  img {
    margin-right: 25px;
    cursor: pointer;
  }
`

const Content = styled.div`
  display: flex;
  justify-content: center;
  font-family: ${({ theme }) => theme.fonts.families.mono};
  padding: 30px 30px 50px 30px;
  box-shadow: 0px 1px 15px ${({ theme }) => theme.colors.shadow};
  border-radius: 0px 0px
    ${({ theme }) => `${theme.layout.terminal.borderRadius} `.repeat(2)};
  cursor: auto;
  font-size: ${({ theme }) => theme.fonts.sizes.s};
  line-height: ${({ theme }) => theme.fonts.lineHeight.terminal};

  p {
    margin-bottom: 20px;

    &:last-of-type {
      margin-bottom: 0;
    }
  }

  a {
    color: ${({ theme }) => theme.colors.white};
    text-decoration: none;

    &:hover {
      text-decoration: underline;
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

  div {
    flex-shrink: 0;
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
  margin-left: 8px;
`
