import React from 'react'
import { useStaticQuery, graphql, Link } from 'gatsby'
import styled from 'styled-components'

import { Section } from './layout/Section'

// TODO: Use fragment for work history detail
export function WorkHistory() {
  const {
    allMarkdownRemark: { nodes: history },
  } = useStaticQuery(graphql`
    query WorkHistory {
      allMarkdownRemark(
        filter: { frontmatter: { templateKey: { eq: "history-item" } } }
      ) {
        nodes {
          fields {
            slug
          }
          id
          rawMarkdownBody
          timeToRead
          html
          frontmatter {
            company
            role
            dates
          }
          excerpt
        }
      }
    }
  `)

  return (
    <Section title="The journey so far">
      <ul>
        {history?.map(({ frontmatter, ...item }) => (
          <Item key={item.fields.slug}>
            <div>
              <h2>{frontmatter.company}</h2>
              <h3>{frontmatter.role}</h3>
            </div>
            <span>{frontmatter.dates}</span>
          </Item>
        ))}
        {history?.map(({ frontmatter, ...item }) => (
          <Item key={item.fields.slug}>
            <div>
              <h2>{frontmatter.company}</h2>
              <h3>{frontmatter.role}</h3>
            </div>
            <span>{frontmatter.dates}</span>
          </Item>
        ))}
      </ul>
      <AnimatedLink to="/projects">
        <span>&gt; View personal projects &amp; Code Samples</span>
      </AnimatedLink>
    </Section>
  )
}

// TODO: Theme
// TODO: What titles etc can be pulle dout in to sensible defaults in global styles
const Item = styled.div`
  border-bottom: 1px solid ${({ theme }) => theme.colors.faint};
  padding-bottom: 31px;
  margin-bottom: 25px;
  cursor: pointer;
  display: flex;
  justify-content: space-between;
  position: relative;

  // see what animation values can live in theme
  &:before {
    content: '^';
    position: absolute;
    top: -8px;
    left: -25px;
    font-size: 22px;
    opacity: 0;
    transform: rotate(90deg) translateY(10px);
    transition: all cubic-bezier(0.19, 1, 0.22, 1) 0.65s;
  }

  &:hover:before {
    opacity: 1;
    transform: rotate(180deg) translateY(0);
  }

  &:after {
    content: '';
    position: absolute;
    bottom: -1px;
    left: 0;
    opacity: 0;
    width: 0;
    height: 1px;
    background: #1d1335;
    z-index: 2;
    transition: all cubic-bezier(0.19, 1, 0.22, 1) 2s;
  }

  &:hover:after {
    width: 100%;
    opacity: 1;
  }

  &:last-of-type {
    margin-bottom: 39px;
  }

  // TODO: This can probably go to global
  h2 {
    font-size: ${({ theme }) => theme.fonts.sizes.xl};
    letter-spacing: 0.01em;
    margin-bottom: 11px;
    // TODO: Use leading-trim when it becomes available
  }

  // TODO: This too
  h3 {
    font-size: ${({ theme }) => theme.fonts.sizes.l};
    color: ${({ theme }) => theme.colors.slate};
    letter-spacing: 0.03em;
  }

  span {
    font-size: ${({ theme }) => theme.fonts.sizes.xxs};
    font-family: ${({ theme }) => theme.fonts.families.mono};
    color: ${({ theme }) => theme.colors.slate};
    text-transform: uppercase;
    line-height: 2.8rem;
  }
`

// TODO: Decide on transition, get values from theme and add to global styles
const AnimatedLink = styled(Link)`
  transition: color cubic-bezier(0.19, 1, 0.22, 1) 1.5s;
  text-decoration: none;
  color: ${({ theme }) => theme.colors.dark};
  font-size: ${({ theme }) => theme.fonts.sizes.xs};
  text-transform: uppercase;
  font-family: ${({ theme }) => theme.fonts.families.mono};
  font-weight: 700;
  position: relative;

  &:before {
    content: '';
    position: absolute;
    background: #18181d;
    top: -5px;
    left: -5px;
    opacity: 0;
    width: calc(100% + 10px);
    height: calc(100% + 10px);
    z-index: 1;
    border-radius: 2px;
    transform: translateY(6px);
    transition: all cubic-bezier(0.19, 1, 0.22, 1) 1s;
  }

  span {
    position: relative;
    z-index: 2;
  }

  &:hover:before {
    opacity: 1;
    transform: translateY(0);
  }

  &:hover {
    color: #86ff1e;
  }
`
