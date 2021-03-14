import React from 'react'
import { useStaticQuery, graphql } from 'gatsby'
import styled from 'styled-components'

import { Section } from './layout/Section'
import { AnimatedLink } from './AnimatedLink'
import { WorkHistoryItem } from './WorkHistoryItem'

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
          timeToRead
          html
          autoExcerpt: excerpt(truncate: false, pruneLength: 300)
          frontmatter {
            company
            role
            dates
            excerpt
            acheivements
            linkToDetails
          }
          excerpt
        }
      }
    }
  `)

  return (
    <WorkSection title="The journey so far">
      <ul>
        {history?.map((item) => (
          <WorkHistoryItem item={item} key={item.fields.slug} />
        ))}
        {history?.map((item) => (
          <WorkHistoryItem item={item} key={item.fields.slug} />
        ))}
      </ul>
      <AnimatedLink to="/projects">
        <span>&gt; View personal projects &amp; Code Samples</span>
      </AnimatedLink>
    </WorkSection>
  )
}

const WorkSection = styled(Section)`
  margin-bottom: 72px;

  @media ${({ theme }) => theme.layout.mediaQueries.maxSmall} {
    margin-bottom: 65px;
  }
`
