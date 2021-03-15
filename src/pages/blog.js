import React from 'react'
import { graphql } from 'gatsby'
import { Helmet } from 'react-helmet'

import { PageHeading } from '../components/PageHeading'
import { BlogPostList } from '../components/BlogPostList'

// TODO: Get page ititle and desc from CMS

export default function Blog({ data: { site, blog } }) {
  return (
    <>
      <Helmet title={`${site?.siteMetadata?.title} - Projects`} defer={false} />
      <PageHeading
        title={`${site?.siteMetadata?.title} - Technical ramblings`}
      />
      <BlogPostList posts={blog.nodes} noTitle fullList />
    </>
  )
}

export const query = graphql`
  query {
    ...SiteMeta
    page: markdownRemark(fileAbsolutePath: { regex: "/pages/blog/" }) {
      frontmatter {
        title
        htmlTitle
      }
      html
    }
    blog: allMarkdownRemark(
      filter: { frontmatter: { templateKey: { eq: "blog-post" } } }
      sort: { fields: [frontmatter___date], order: [ASC] }
      limit: 9999
    ) {
      nodes {
        ...PostDetail
      }
    }
  }
`
