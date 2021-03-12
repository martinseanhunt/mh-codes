import React from 'react'
import { Link } from 'gatsby'
import styled from 'styled-components'

import Logo from '../../img/logo.svg'

import { Section } from './Section'

// TODO: Build menu from pages in gql query
// TODO: Style active links etc (simple underline)
// TODO: Hover effects / animations
// TODO: Favicon

export function Header() {
  return (
    <Section sectionMargin="0 0 180px 0">
      <StyledHeader>
        <Link to="/">
          <img src={Logo} alt="<MH>" />
        </Link>

        <Nav>
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
`

const Nav = styled.nav`
  li {
    display: inline-block;
    margin-left: ${({ theme }) => theme.layout.header.navGap};
  }

  // TODO: colors from theme and make animation global
  a {
    text-decoration: none;
    text-transform: capitalize;
    font-size: ${({ theme }) => theme.fonts.sizes.m};
    color: ${({ theme }) => theme.colors.dark};
    position: relative;

    &:before {
      content: '';
      position: absolute;
      bottom: -2px;
      left: 0;
      width: 0;
      height: 1px;
      opacity: 0;
      background: ${({ theme }) => theme.colors.dark};
      transition: opacity cubic-bezier(0.19, 1, 0.22, 1) 0.5s,
        width cubic-bezier(0.19, 1, 0.22, 1) 1s;
    }

    &:hover:before {
      opacity: 1;
      width: 100%;
    }
  }
`
