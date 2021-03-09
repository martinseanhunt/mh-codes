import React from 'react'
import { graphql } from 'gatsby'
import { Helmet } from 'react-helmet'

export default function Index({ data }) {
  console.log(data)

  const { site, markdownRemark: page } = data

  return (
    <>
      <Helmet
        title={`${site?.siteMetadata?.title} - Software Engineer & Technical Lead`}
        defer={false}
      />
      <h1>{page.frontmatter.title}</h1>

      <div dangerouslySetInnerHTML={{ __html: page.html }} />
    </>
  )
}

export const SiteMetaQuery = graphql`
  fragment SiteMeta on Query {
    site {
      siteMetadata {
        title
      }
    }
  }
`

export const query = graphql`
  query {
    ...SiteMeta
    markdownRemark(fileAbsolutePath: { regex: "/pages/home/" }) {
      frontmatter {
        title
      }
      html
    }
  }
`
