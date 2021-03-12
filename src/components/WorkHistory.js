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

  // TODO: Remove secitonpadding and margin as props... Extend the styles in the component

  return (
    <Section title="The journey so far" sectionMargin="0 0 89px 0">
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
    margin-bottom: 12px;
    // TODO: Use leading-trim when it becomes available
  }

  // TODO: This too
  h3 {
    font-size: ${({ theme }) => theme.fonts.sizes.m};
    color: ${({ theme }) => theme.colors.slate};
    font-family: ${({ theme }) => theme.fonts.families.sansLight};
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
  text-decoration: none;
  color: ${({ theme }) => theme.colors.dark};
  font-size: ${({ theme }) => theme.fonts.sizes.s};
  text-transform: uppercase;
  font-family: ${({ theme }) => theme.fonts.families.mono};
  font-weight: 700;
  position: relative;
  transition: all cubic-bezier(0.19, 1, 0.22, 1) 1s;
  display: flex;
  align-items: center;

  &:before {
    content: '>';
    position: absolute;
    bottom: 0;
    left: 0;
    opacity: 0;
    transition: all cubic-bezier(0.19, 1, 0.22, 1) 1s;
  }

  &:hover:before {
    opacity: 1;
  }

  &:hover {
    padding-left: 8px;
  }
`
