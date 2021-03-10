import React, { useContext } from 'react'
import styled, { ThemeContext } from 'styled-components'

import CloseIcon from '../img/icon-close.svg'
import PlusIcon from '../img/icon-plus.svg'
import CloseTerminalIcon from '../img/icon-close-terminal.svg'
import MinimiseTerminalIcon from '../img/icon-minimise-terminal.svg'
import MaximiseTerminalIcon from '../img/icon-maximise-terminal.svg'

import { Section, Inner } from './layout/Section'

// TODO: compose this component

export function Terminal() {
  const theme = useContext(ThemeContext)

  return (
    <Section
      maxWidth={theme.layout.terminal.maxWidth}
      sectionPadding={theme.layout.terminal.sectionPadding}
    >
      <TerminalContainer>
        <Header>
          <Tab>
            <span>marty@DESKTOP: ~/</span>
            <img src={CloseIcon} alt="Close Tab Icon" role="button" />
          </Tab>
          <TabIcon>
            <img src={PlusIcon} alt="New Tab Icon" role="button" />
          </TabIcon>
          <Controls>
            <img src={MinimiseTerminalIcon} alt="Minimise Terminal Icon" />
            <img src={MaximiseTerminalIcon} alt="Maximise Terminal Icon" />
            <img src={CloseTerminalIcon} alt="Close Terminal Icon" />
          </Controls>
        </Header>
        <Content>
          <Inner>This is a section</Inner>
        </Content>
      </TerminalContainer>
    </Section>
  )
}

const TerminalContainer = styled.div`
  ${({ theme }) => `
    background: ${theme.colors.terminalBlack};
    color: ${theme.colors.white};
    filter: drop-shadow(0px 4px 4px ${theme.colors.shadow});
    border-radius: ${theme.layout.terminal.borderRadius};
    cursor: default;
    margin: ${theme.layout.sectionMargin};

  `}
`

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
  padding: 30px;
  box-shadow: 0px 1px 15px ${({ theme }) => theme.colors.shadow};
  border-radius: 0px 0px
    ${({ theme }) => `${theme.layout.terminal.borderRadius} `.repeat(2)};
  cursor: auto;
`
