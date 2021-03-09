import React from 'react'
import { graphql } from 'gatsby'
import { Helmet } from 'react-helmet'

export default function Index({ data }) {
  const { site } = data

  return (
    <>
      <Helmet
        title={`${site?.siteMetadata?.title} - Software Engineer & Technical Lead`}
        defer={false}
      />
      <title>Home Page</title>
      <h1>Welcome to my page</h1>
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
  }
`
