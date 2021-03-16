import React from 'react'
import { useStaticQuery, graphql } from 'gatsby'
import styled from 'styled-components'

import { Section } from './layout/Section'
import { AnimatedLink } from './AnimatedLink'
import { WorkHistoryItem } from './WorkHistoryItem'

export function WorkHistory({ title }) {
  const {
    allMarkdownRemark: { nodes: history },
  } = useStaticQuery(graphql`
    query WorkHistory {
      allMarkdownRemark(
        filter: { frontmatter: { templateKey: { eq: "history-item" } } }
        sort: { fields: frontmatter___order, order: [ASC] }
      ) {
        nodes {
          fields {
            slug
          }
          id
          timeToRead
          html
          excerpt(truncate: false, pruneLength: 300)
          frontmatter {
            company
            externalUrl
            role
            dates
            excerpt
            acheivements
            linkToDetails
            testimonial
            testimonialAuthor
            testimonialAvatar {
              childImageSharp {
                gatsbyImageData(width: 40)
              }
            }
          }
        }
      }
    }
  `)

  return (
    <WorkSection title={title || 'the journey so far'}>
      <ul>
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
  margin-bottom: 54px;

  @media ${({ theme }) => theme.layout.mediaQueries.maxSmall} {
    margin-bottom: 65px;
  }
`
