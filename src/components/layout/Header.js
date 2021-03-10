import React from 'react'
import { Link } from 'gatsby'
import styled from 'styled-components'

import { Section } from './Section'

// TODO: Build menu from pages in gql query
// TODO: Style active links etc
// TODO: Logo and favicon

export function Header() {
  return (
    <Section>
      <StyledHeader>
        <span role="img" aria-label="wave emoji">
          👋
        </span>
        <ul>
          <li>
            <Link to="/">Home</Link>
          </li>
        </ul>
      </StyledHeader>
    </Section>
  )
}

// TODO: values from theme
const StyledHeader = styled.header`
  margin-bottom: 64px;
`
