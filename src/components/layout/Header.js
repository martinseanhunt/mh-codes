import React from 'react'
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

export function Header({ footer }) {
  return (
    <Section sectionMargin={footer ? '0' : '0 0 179px 0'}>
      <StyledHeader>
        <Link to="/">
          <img src={footer ? LogoClose : Logo} alt="<MH>" />
        </Link>

        <Nav footer={footer}>
          <ul>
            <li>
              <Link to="/">Projects</Link>
            </li>
            <li>
              <Link to="/">Blog</Link>
            </li>
            <li>
              <Link to="/">Contact</Link>
            </li>
          </ul>
        </Nav>
      </StyledHeader>
    </Section>
  )
}

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
  a {
    text-decoration: none;
    text-transform: capitalize;
    font-size: ${({ theme }) => theme.fonts.sizes.m};
    color: ${({ theme, footer }) =>
      footer ? theme.colors.white : theme.colors.dark};
    position: relative;

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

    &:hover:before {
      opacity: 1;
      width: 100%;
    }
  }
`
