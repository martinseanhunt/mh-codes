import React from 'react'
import { useStaticQuery, graphql } from 'gatsby'

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

  // TODO: Remove secitonpadding and margin as props... Extend the styles in the component

  return (
    <Section title="The journey so far" sectionMargin="0 0 86px 0">
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
    </Section>
  )
}
