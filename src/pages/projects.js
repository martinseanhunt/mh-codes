import React from 'react'
import { graphql } from 'gatsby'
import { Helmet } from 'react-helmet'

import { PageHeading } from '../components/PageHeading'

// TODO: Get page ititle and desc from CMS
export default function Projects({ data }) {
  const { site, markdownRemark: page } = data

  return (
    <>
      <Helmet title={`${site?.siteMetadata?.title} - Projects`} defer={false} />
      <PageHeading
        title="Adventures in Code"
        body="Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum."
        tags={['React', 'Node', 'Javascript', 'NextJS', 'Gatsby', 'NetlifyCMS']}
      />
    </>
  )
}

export const query = graphql`
  query {
    ...SiteMeta
    markdownRemark(fileAbsolutePath: { regex: "/pages/home/" }) {
      frontmatter {
        title
        htmlTitle
      }
      html
    }
  }
`
