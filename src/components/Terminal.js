import React, { useContext, useRef, useEffect, useState } from 'react'
import { Link } from 'gatsby'
import styled, { ThemeContext } from 'styled-components'

import CloseIcon from '../img/icon-close.svg'
import PlusIcon from '../img/icon-plus.svg'
import CloseTerminalIcon from '../img/icon-close-terminal.svg'
import MinimiseTerminalIcon from '../img/icon-minimise-terminal.svg'
import MaximiseTerminalIcon from '../img/icon-maximise-terminal.svg'
import LinuxIcon from '../img/icon-linux.svg'

import { Section, Inner } from './layout/Section'

// TODO: compose this component
// TODO: Add cursor animation to lines where typing
// TODO: cat fullbio.md on bio click
// STRETCH TODO: Make the terminal interactive
//   - close / new tab
//   - minimise terminal
//   - maximise terminal
//   - close terminal
//   - basic commands

// TODO: Decided on section margin for each element
// TODO: Get terminal lines from CMS

export function Terminal() {
  const theme = useContext(ThemeContext)
  const inputRef = useRef()
  const innerRef = useRef()

  const lines = [
    ['~', 'cd sites/martinhunt'],
    ['~/sites/martinhunt', 'cat bio.md'],
    'bio',
    'input',
  ]
  const [terminalLines, setTerminalLines] = useState(lines)
  const [showBio, setShowBio] = useState(true)
  const [showInput, setShowInput] = useState(true)

  const focusInput = () =>
    document.activeElement !== inputRef.current && inputRef.current.focus()

  // TODO: Refactor recursive solution in to helper

  const addChars = (lines, lineIndex = 0, charIndex = 0, init = true) => {
    if (lineIndex === lines.length) return

    if (lines[lineIndex] === 'bio') {
      setShowBio('true')
      return addChars(lines, lineIndex + 1)
    }

    if (lines[lineIndex] === 'input') {
      setShowInput('true')
      return addChars(lines, lineIndex + 1)
    }

    const [path, command] = lines[lineIndex]

    setTerminalLines((lines) => {
      const line = lines[lineIndex]

      if (!line)
        return [...lines.filter((_, index) => index !== lineIndex), [path, '']]

      return [
        ...lines.filter((_, index) => index !== lineIndex),
        [line[0], line[1] + command.charAt(charIndex)],
      ]
    })

    let nextCharIndex = charIndex
    let nextLineIndex = lineIndex
    // TOTO: randRange helper function
    let nextTimeout = Math.floor(Math.random() * (100 - 50 + 1) + 50)
    let nextInit = false

    if (init) {
      nextTimeout = Math.floor(Math.random() * (2000 - 1000 + 1) + 1000)
    } else if (charIndex === command.length - 1) {
      nextCharIndex = 0
      nextLineIndex++
      nextInit = true
      nextTimeout = Math.floor(Math.random() * (500 - 300 + 1) + 300)
    } else {
      nextCharIndex++
    }

    setTimeout(
      () => addChars(lines, nextLineIndex, nextCharIndex, nextInit),
      nextTimeout
    )
  }

  useEffect(() => {
    setShowInput(false)
    setShowBio(false)
    setTerminalLines([])

    addChars(lines)
  }, [])

  useEffect(() => {
    if (showInput) focusInput()
  }, [showInput])

  return (
    <>
      <Section
        title="Martin Hunt - Software Engineer & Technical Lead"
        sectionMargin="0"
      />
      <Section
        maxWidth={theme.layout.terminal.maxWidth}
        sectionPadding={theme.layout.terminal.sectionPadding}
        sectionMargin="0 0 120px 0"
        onClick={() => inputRef.current && focusInput()}
      >
        <TerminalContainer>
          <Header>
            <Tab>
              <span>
                <img src={LinuxIcon} alt="Linux Penguin Icon" />
                marty@DESKTOP: ~/
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
            <Inner ref={innerRef}>
              {terminalLines.map(([path, command], i) => (
                <div key={i}>
                  <User>marty@DESKTOP-COQ6V76</User>:<Path>{path}</Path>${' '}
                  {command}
                </div>
              ))}

              {showBio && (
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
              )}

              {showInput && (
                <InputLine>
                  <div>
                    <User>marty@DESKTOP-COQ6V76</User>:
                    <Path>~/sites/martinhunt</Path>$
                  </div>
                  <Input type="text" ref={inputRef}></Input>
                </InputLine>
              )}
            </Inner>
          </Content>
        </TerminalContainer>
      </Section>
    </>
  )
}

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

  img {
    margin-right: 25px;
    cursor: pointer;
  }
`

const Content = styled.div`
  display: flex;
  justify-content: center;
  font-family: ${({ theme }) => theme.fonts.families.mono};
  padding: 30px 30px 0 30px;
  height: 314px;
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
