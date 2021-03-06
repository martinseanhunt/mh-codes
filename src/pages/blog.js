import React, { useContext } from 'react'
import { graphql } from 'gatsby'
import { Helmet } from 'react-helmet'

import { DeviceContext } from '../components/layout/Layout'

import { PageHeading } from '../components/PageHeading'
import { BlogPostList } from '../components/BlogPostList'

export default function Blog({ data: { site, blog, page } }) {
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
        pageName="blog"
      />
      <BlogPostList posts={blog.nodes} noTitle fullList />
    </>
  )
}

// TODO: Change blog posts in to fragment with varaible limit
export const query = graphql`
  query {
    ...SiteMeta
    page: markdownRemark(fileAbsolutePath: { regex: "/pages/blog/" }) {
      frontmatter {
        heading
        htmlTitle
        intro
      }
    }
    blog: allMarkdownRemark(
      filter: { frontmatter: { templateKey: { eq: "blog-post" } } }
      sort: { fields: [frontmatter___date], order: [DESC] }
      limit: 9999
    ) {
      nodes {
        ...PostDetail
      }
    }
  }
`
