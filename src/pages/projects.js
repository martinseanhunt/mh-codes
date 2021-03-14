import React from 'react'
import { graphql } from 'gatsby'
import { Helmet } from 'react-helmet'
import styled from 'styled-components'

import { Section } from '../components/layout/Section'
import { PageHeading } from '../components/PageHeading'
import { ProjectItem } from '../components/ProjectItem'
import { BlogPostList } from '../components/BlogPostList'

export default function Projects({ data }) {
  const { site, page, projects } = data

  // TODO: get updated data format for page from CMS

  return (
    <>
      <Helmet
        title={`${page.frontmatter.htmlTitle} - ${site?.siteMetadata?.title}`}
        defer={false}
      />
      <PageHeading
        title={`${site?.siteMetadata?.title} - ${page.frontmatter.heading}`}
        body={page.html}
      />
      <ProjectsSection>
        <ul>
          {projects.nodes.map((project) => (
            <ProjectItem project={project} />
          ))}
        </ul>
      </ProjectsSection>
    </>
  )
}

const ProjectsSection = styled(Section)`
  margin-bottom: 108px;
  @media ${({ theme }) => theme.layout.mediaQueries.maxSmall} {
    margin-bottom: 65px;
  }
`

export const query = graphql`
  query {
    ...SiteMeta
    page: markdownRemark(fileAbsolutePath: { regex: "/pages/projects/" }) {
      frontmatter {
        heading
        htmlTitle
      }
      html
    }
    projects: allMarkdownRemark(
      filter: { frontmatter: { templateKey: { eq: "project" } } }
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
          order
          title
          excerpt
          tags
          github
          liveUrl
          linkToDetails
        }
      }
    }
  }
`
