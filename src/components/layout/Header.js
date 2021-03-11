import React from 'react'
import { Link } from 'gatsby'
import styled from 'styled-components'

import Logo from '../../img/logo.svg'

import { Section } from './Section'

// TODO: Build menu from pages in gql query
// TODO: Style active links etc
// TODO: Hover effects / animations
// TODO: Favicon

export function Header() {
  return (
    <Section>
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
  margin: ${({ theme }) => theme.layout.sectionMargin};
`

const Nav = styled.nav`
  li {
    display: inline-block;
    margin-left: ${({ theme }) => theme.layout.header.navGap};
  }

  a {
    text-decoration: none;
    text-transform: capitalize;
    font-size: ${({ theme }) => theme.fonts.sizes.l};
  }
`
