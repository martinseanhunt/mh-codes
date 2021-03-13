import React from 'react'
import { graphql } from 'gatsby'
import { Helmet } from 'react-helmet'

import { Terminal } from '../components/Terminal'
import { BlogPostList } from '../components/BlogPostList'

export default function Index({ data }) {
  const { site, markdownRemark: page } = data

  return (
    <>
      <Helmet
        title={`${site?.siteMetadata?.title} - ${page.frontmatter.htmlTitle}`}
        defer={false}
      />
      <Terminal />
      <BlogPostList />
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
        htmlTitle
      }
      html
    }
  }
`
