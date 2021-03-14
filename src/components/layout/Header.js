import React, { useState } from 'react'
import { Link } from 'gatsby'
import styled from 'styled-components'

import Logo from '../../img/logo.svg'
import LogoClose from '../../img/logo-close.svg'

import { Section } from './Section'

// TODO: Build menu from pages in gql query
// TODO: Style active links etc (simple underline)
// TODO: Hover effects / animations
// TODO: Favicon

// TODO: Conditionally render footer element if in context of footer
// TODO: Prevent scroll when mobile menu is open
// TODO: render menu itemms programatically: DRY
// TODO: Seperate footer component!

export function Header({ footer }) {
  // Only used on mobile
  const [showNav, setShowNav] = useState(false)

  const scrollToBottom = (e) => {
    e.preventDefault()
    setShowNav(false)
    window.scrollTo({ top: document.body.scrollHeight, behavior: 'smooth' })
  }

  const links = [
    ['/', 'History'],
    ['/projects', 'Projects'],
    ['/blog', 'Blog'],
  ]

  return (
    <HeaderSection footer={footer}>
      <StyledHeader>
        <Link to="/" onClick={() => setShowNav(false)}>
          <img src={footer ? LogoClose : Logo} alt="<MH>" />
        </Link>

        <Nav footer={footer} showNav={showNav}>
          <Burger
            aria-label="show menu"
            onClick={() => setShowNav((state) => !state)}
          >
            {showNav ? 'X' : '☰'}
          </Burger>
          <ul>
            {links.map(([path, linkName]) => (
              <li>
                <Link
                  to={path}
                  onClick={() => setShowNav(false)}
                  activeClassName="active"
                  partiallyActive={path === '/' ? undefined : true}
                >
                  {linkName}
                </Link>
              </li>
            ))}
            {!footer && (
              <li>
                <button onClick={scrollToBottom}>Contact</button>
              </li>
            )}
          </ul>
        </Nav>
      </StyledHeader>
    </HeaderSection>
  )
}

const HeaderSection = styled(Section)`
  margin: ${({ footer }) => (footer ? '0' : '0 0 144px 0')};

  @media ${({ theme }) => theme.layout.mediaQueries.maxSmall} {
    margin: 0;
    position: ${({ footer }) => (footer ? undefined : 'fixed')};
    width: 100%;
    background: ${({ footer, theme }) =>
      footer ? undefined : theme.colors.white};
    height: ${({ footer }) => (footer ? undefined : '70px')};
    top: 0;
    left: 0;
    z-index: 9999;
    display: flex;
    align-items: center;
    overflow: visible;
    border-bottom: 1px solid ${({ theme }) => theme.colors.faint};
  }

  border-bottom: ${({ footer }) => (footer ? 'none !important' : undefined)};
`

// TODO: values from theme
const StyledHeader = styled.header`
  display: flex;
  justify-content: space-between;
  align-items: center;

  img {
    position: relative;
    top: 1px;
  }
`

const Nav = styled.nav`
  order: ${({ footer }) => (footer ? -1 : 1)};

  li {
    display: inline-block;
    margin-left: ${({ footer, theme }) =>
      footer ? 0 : theme.layout.header.navGap};
    margin-right: ${({ footer, theme }) =>
      footer ? theme.layout.header.navGap : 0};
  }

  // TODO: colors from theme and make animation global
  a,
  button {
    text-decoration: none;
    text-transform: capitalize;
    font-size: ${({ theme }) => theme.fonts.sizes.m};
    color: ${({ theme, footer }) =>
      footer ? theme.colors.white : theme.colors.dark};
    position: relative;
    border: none;
    background: none;
    padding: 0;
    outline: none;
    cursor: pointer;

    &:before {
      content: '';
      position: absolute;
      bottom: -2px;
      left: 0;
      width: 0;
      height: 1px;
      opacity: 0;
      background: ${({ theme, footer }) =>
        footer ? theme.colors.white : theme.colors.dark};
      transition: opacity cubic-bezier(0.19, 1, 0.22, 1) 0.5s,
        width cubic-bezier(0.19, 1, 0.22, 1) 1s;
    }

    &:hover:before,
    &.active:before {
      opacity: 1;
      width: 100%;
    }
  }

  @media ${({ theme }) => theme.layout.mediaQueries.maxSmall} {
    display: ${({ footer }) => (footer ? 'none' : 'block')};

    ul {
      transition: height 0.5s;
      position: absolute;
      top: 70px;
      left: 0;
      width: 100%;
      height: ${({ showNav }) => (showNav ? 'calc(100vh - 70px)' : '0')};
      overflow: hidden;
      background: ${({ theme }) => theme.colors.white};
      z-index: 9999;
    }

    li {
      border-bottom: 1px solid ${({ theme }) => theme.colors.faint};
      display: block;
      margin: 0;
    }

    a,
    button {
      padding: 30px 10px;
      display: block;
      width: 100%;
      text-align: left;
    }
  }
`

const Burger = styled.button`
  display: none;
  background: none;
  border: none;
  font-size: ${({ theme }) => theme.fonts.sizes.xl};
  outline: none;
  padding: 0 !important;

  &:hover:before {
    opacity: 0 !important;
  }

  @media ${({ theme }) => theme.layout.mediaQueries.maxSmall} {
    display: ${({ footer }) => (footer ? 'none' : 'block')};
  }
`
