import React from 'react'
import { graphql } from 'gatsby'
import { Helmet } from 'react-helmet'

import { Terminal } from '../components/Terminal'
import { BlogPostList } from '../components/BlogPostList'
import { WorkHistory } from '../components/WorkHistory'

export default function Index({ data }) {
  const { site, page, blog } = data

  return (
    <>
      <Helmet
        title={`${site?.siteMetadata?.title} - ${page.frontmatter.htmlTitle}`}
        defer={false}
      />
      <Terminal
        title={`${site?.siteMetadata?.title} - ${page.frontmatter.heading}`}
        markdown={page.frontmatter.bio}
        fullBio={page.html}
      />
      <WorkHistory title={page.frontmatter.historyTitle} />
      <BlogPostList posts={blog.nodes} title={page.frontmatter.blogTitle} />
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
    page: markdownRemark(fileAbsolutePath: { regex: "/pages/home/" }) {
      frontmatter {
        heading
        htmlTitle
        bio
        historyTitle
        blogTitle
      }
      html
    }
    blog: allMarkdownRemark(
      filter: { frontmatter: { templateKey: { eq: "blog-post" } } }
      sort: { fields: [frontmatter___date], order: [DESC] }
      limit: 2
    ) {
      nodes {
        ...PostDetail
      }
    }
  }
`
