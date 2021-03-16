import React, { useContext } from 'react'
import { graphql } from 'gatsby'
import { Helmet } from 'react-helmet'
import styled from 'styled-components'

import { DeviceContext } from '../components/layout/Layout'

import { Section } from '../components/layout/Section'
import { PageHeading } from '../components/PageHeading'
import { ProjectItem } from '../components/ProjectItem'

export default function Projects({ data }) {
  const { site, page, projects } = data
  const { isMobile } = useContext(DeviceContext)

  return (
    <>
      <Helmet
        title={`${page.frontmatter.htmlTitle} - ${site?.siteMetadata?.title}`}
        defer={false}
      />
      <PageHeading
        title={
          isMobile
            ? [site?.siteMetadata?.title, page.frontmatter.heading]
            : `${site?.siteMetadata?.title} - ${page.frontmatter.heading}`
        }
        markdown={page.frontmatter.intro}
        pageName="projects"
      />
      <ProjectsSection>
        <ul>
          {projects.nodes.map((project) => (
            <ProjectItem key={project.id} project={project} />
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
        intro
      }
    }
    projects: allMarkdownRemark(
      filter: { frontmatter: { templateKey: { eq: "project" } } }
      sort: { fields: [frontmatter___order], order: [ASC] }
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
          logo {
            childImageSharp {
              gatsbyImageData(width: 35, placeholder: TRACED_SVG)
            }
          }
        }
      }
    }
  }
`
