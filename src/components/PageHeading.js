import React from 'react'
import styled from 'styled-components'
import { Link } from 'gatsby'

import { Section } from './layout/Section'

export function PageHeading({ title, body, tags }) {
  return (
    <Section title={title}>
      <Body>{body}</Body>

      {tags && (
        <Tags>
          <span>~/filter-tags</span>$
          <ul>
            {tags.map((t, i) => (
              <li>
                <Link to={`/projects/tags/${t}`}>
                  {t}
                  {i < tags.length - 1 && ','}
                </Link>
              </li>
            ))}
          </ul>
        </Tags>
      )}
    </Section>
  )
}

const Body = styled.p`
  font-size: ${({ theme }) => theme.fonts.sizes.m};
  font-family: ${({ theme }) => theme.fonts.families.sansLight};
  color: ${({ theme }) => theme.colors.slate};
  letter-spacing: 0.03em;
  line-height: 2.4rem;
`

const Tags = styled.ul`
  margin-top: 54px;
  padding: 22px;
  background: ${({ theme }) => theme.colors.terminalBlack};
  border-radius: 3px;
  filter: drop-shadow(0px 4px 4px ${({ theme }) => theme.colors.shadow});
  color: ${({ theme }) => theme.colors.white};
  font-family: ${({ theme }) => theme.fonts.families.mono};

  span {
    color: ${({ theme }) => theme.colors.terminalBlue};
  }

  li,
  ul {
    display: inline-block;
  }

  li {
    margin-left: 7px;
  }

  a {
    color: ${({ theme }) => theme.colors.white};

    &:hover {
      text-decoration: underline;
    }
  }
`
