import React from 'react'
import { graphql } from 'gatsby'
import { Helmet } from 'react-helmet'

import { Section } from '../components/layout/Section'
import { BlogPostList } from '../components/BlogPostList'

export default function Index({ data }) {
  const { site, markdownRemark: page } = data

  return (
    <Section>
      <Helmet
        title={`${site?.siteMetadata?.title} - ${page.frontmatter.htmlTitle}`}
        defer={false}
      />

      <h1>{page.frontmatter.title}</h1>

      <div dangerouslySetInnerHTML={{ __html: page.html }} />

      <BlogPostList />
    </Section>
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
