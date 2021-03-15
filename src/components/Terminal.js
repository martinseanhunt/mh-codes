import React, {
  useContext,
  useRef,
  useEffect,
  useState,
  useCallback,
} from 'react'
import styled, { ThemeContext } from 'styled-components'
import remark from 'remark'
import recommended from 'remark-preset-lint-recommended'
import remarkHtml from 'remark-html'

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
// TODO: implement a more SEO friendly way of hiding bio by default
// TODO: Massively needs a refactor... DRY

const randRange = (min, max) =>
  Math.floor(Math.random() * (max - min + 1) + min)

export function Terminal({ title, markdown, fullBio }) {
  const theme = useContext(ThemeContext)
  const inputRef = useRef()
  const innerRef = useRef()
  // TODO: do this in layout and pass down via context
  const [isMobile, setIsMobile] = useState(false)

  const [terminalLines, setTerminalLines] = useState([])
  const [terminalLines2, setTerminalLines2] = useState([])
  const [showBio, setShowBio] = useState(false)
  const [showFullBio, setShowFullBio] = useState(false)
  const [showInput, setShowInput] = useState(false)
  const [isAnimating, setIsAnimating] = useState(true)

  const focusInput = () =>
    document.activeElement !== inputRef.current && inputRef.current.focus()

  const addChars = useCallback(function (
    lines,
    linesStateSetter,
    initialDelay = null,
    lineIndex = 0,
    charIndex = 0,
    init = true
  ) {
    if (lineIndex === lines.length) return setIsAnimating(false)

    if (lines[lineIndex] === 'bio') {
      setShowBio('true')
      return addChars(lines, linesStateSetter, initialDelay, lineIndex + 1)
    }

    if (lines[lineIndex] === 'fullBio') {
      setShowFullBio('true')
      return addChars(lines, linesStateSetter, initialDelay, lineIndex + 1)
    }

    if (lines[lineIndex] === 'input') {
      setShowInput('true')
      return addChars(lines, linesStateSetter, initialDelay, lineIndex + 1)
    }

    const [path, command] = lines[lineIndex]

    linesStateSetter((lines) => {
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
    let nextTimeout = randRange(50, 100)
    let nextInit = false

    if (init) {
      nextTimeout = initialDelay || randRange(1000, 2000)
    } else if (charIndex === command.length - 1) {
      nextCharIndex = 0
      nextLineIndex++
      nextInit = true
      nextTimeout = randRange(300, 500)
    } else {
      nextCharIndex++
    }

    setTimeout(
      () =>
        addChars(
          lines,
          linesStateSetter,
          initialDelay,
          nextLineIndex,
          nextCharIndex,
          nextInit
        ),
      nextTimeout
    )
  },
  [])

  useEffect(() => {
    const lines = [
      ['~', 'cd sites/martinhunt'],
      ['~/sites/martinhunt', 'cat bio.md'],
      'bio',
      'input',
    ]

    setIsAnimating(true)
    setShowInput(false)
    setShowBio(false)
    setTerminalLines([])
    setTerminalLines2([])
    addChars(lines, setTerminalLines)
  }, [addChars])

  const onClickBio = (e) => {
    e.preventDefault()
    if (showFullBio || e.target.tagName !== 'A' || isAnimating) return false

    const lines = [
      ['~/sites/martinhunt', 'cat full-bio.md'],
      'fullBio',
      'input',
    ]

    setIsAnimating(true)
    setShowInput(false)
    addChars(lines, setTerminalLines2, 50)
  }

  const bp = theme.layout.breakPoints.small.replace('px', '')
  useEffect(() => {
    function checkWidth() {
      if (window.innerWidth <= bp && !isMobile) setIsMobile(true)
      if (window.innerWidth > bp && isMobile) setIsMobile(false)
    }

    window.addEventListener('resize', checkWidth)
    checkWidth()

    return () => {
      window.removeEventListener('resize', checkWidth)
    }
  }, [isMobile, bp])

  const platform = isMobile ? 'MOBILE' : 'DESKTOP'

  const bioHTML = remark()
    .use(recommended)
    .use(remarkHtml)
    .processSync(markdown)
    .toString()

  return (
    <>
      <TitleSection title={title} />
      <TerminalSection
        maxWidth={theme.layout.terminal.maxWidth}
        onClick={() => inputRef.current && focusInput()}
      >
        <TerminalContainer>
          <Header>
            <Tab>
              <span>
                <img src={LinuxIcon} alt="Linux Penguin Icon" />
                marty@{platform}: ~/
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
              {terminalLines.length ? (
                terminalLines.map(([path, command], i) => (
                  <div key={i}>
                    <User>marty@{platform}</User>:<Path>{path}</Path>$ {command}
                  </div>
                ))
              ) : (
                <div>
                  <User>marty@{platform}</User>:<Path>~</Path>${' '}
                </div>
              )}

              {showBio && (
                <Bio
                  dangerouslySetInnerHTML={{ __html: bioHTML }}
                  onClick={onClickBio}
                />
              )}

              {terminalLines2.length
                ? terminalLines2.map(([path, command], i) => (
                    <div key={i}>
                      <User>marty@{platform}</User>:<Path>{path}</Path>${' '}
                      {command}
                    </div>
                  ))
                : undefined}

              {showFullBio && (
                <Bio dangerouslySetInnerHTML={{ __html: fullBio }} />
              )}

              {showInput && (
                <InputLine>
                  <div>
                    <User>marty@{platform}</User>:
                    <Path>~/sites/martinhunt</Path>$
                  </div>
                  <Input type="text" ref={inputRef}></Input>
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
  margin: 0 0 108px 0;
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
    padding-left: 22px;
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
  padding: 30px 30px 45px 30px;
  min-height: 314px;
  box-shadow: 0px 1px 15px ${({ theme }) => theme.colors.shadow};
  border-radius: 0px 0px
    ${({ theme }) => `${theme.layout.terminal.borderRadius} `.repeat(2)};
  cursor: auto;
  font-size: ${({ theme }) => theme.fonts.sizes.s};
  line-height: ${({ theme }) => theme.fonts.lineHeight.terminal};
  word-wrap: break-word;
  max-width: 777px;

  @media ${({ theme }) => theme.layout.mediaQueries.maxSmall} {
    padding: 30px 22px 45px 22px;
  }

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
  flex-wrap: wrap;

  div {
    flex-shrink: 0;
    max-width: 100%;
    word-wrap: break-word;
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

  @media ${({ theme }) => theme.layout.mediaQueries.maxSmall} {
    display: none;
  }
`
