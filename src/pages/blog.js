import React from 'react'
import { graphql } from 'gatsby'
import { Helmet } from 'react-helmet'

import { PageHeading } from '../components/PageHeading'
import { BlogPostList } from '../components/BlogPostList'

// TODO: Get page ititle and desc from CMS

export default function Blog({ data }) {
  const { site, markdownRemark: page } = data

  return (
    <>
      <Helmet title={`${site?.siteMetadata?.title} - Projects`} defer={false} />
      <PageHeading
        title={`${site?.siteMetadata?.title} - sometimes likes to write`}
      />
      <BlogPostList title={'Musings on tech and life'} fullList />
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
