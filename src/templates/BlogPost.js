import React from 'react'
import { graphql } from 'gatsby'
import { Helmet } from 'react-helmet'

export default function BlogPost({ data }) {
  const { markdownRemark, site } = data
  const { frontmatter, html } = markdownRemark

  return (
    <>
      <Helmet
        title={`${frontmatter.title} - ${site.siteMetadata.title}`}
        defer={false}
      />

      <div className="blog-post-container">
        <div className="blog-post">
          <h1>{frontmatter.title}</h1>
          <h2>{frontmatter.date}</h2>
          <div
            className="blog-post-content"
            dangerouslySetInnerHTML={{ __html: html }}
          />
        </div>
      </div>
    </>
  )
}

export const PostDetail = graphql`
  fragment PostDetail on MarkdownRemark {
    fields {
      slug
    }
    id
    rawMarkdownBody
    timeToRead
    html
    frontmatter {
      date(formatString: "Do MMMM, YYYY")
      title
      externalUrl
    }
    excerpt
  }
`

export const query = graphql`
  query($slug: String!) {
    ...SiteMeta
    markdownRemark(fields: { slug: { eq: $slug } }) {
      ...PostDetail
    }
  }
`
