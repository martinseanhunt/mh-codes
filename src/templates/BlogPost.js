import React from 'react'
import { graphql } from 'gatsby'
import { Helmet } from 'react-helmet'
import styled from 'styled-components'

import { Section } from '../components/layout/Section'

import GQL from '../img/gql.png'

export default function BlogPost({ data }) {
  const { markdownRemark, site } = data
  const { frontmatter, html } = markdownRemark

  // TODO: Featured image from CMS

  return (
    <>
      <Helmet
        title={`${frontmatter.title} - ${site.siteMetadata.title}`}
        defer={false}
      />

      <Section maxWidth="800px">
        <Post>
          <Title>{frontmatter.title}</Title>
          <Date>{frontmatter.date}</Date>
          <FeaturedImage>
            <img src={GQL} alt="TODO: featured image from CMS" />
          </FeaturedImage>
          <Content
            className="blog-post-content"
            dangerouslySetInnerHTML={{ __html: html }}
          />
        </Post>
      </Section>
    </>
  )
}

const Post = styled.article`
  padding: 0 60px;
`

const Title = styled.h1`
  font-size: ${({ theme }) => theme.fonts.sizes.xxl};
  font-family: ${({ theme }) => theme.fonts.families.sans};
  color: ${({ theme }) => theme.colors.terminalBlack};
  line-height: 3.9rem;
  margin-bottom: 33px;
`

const Date = styled.span`
  font-size: ${({ theme }) => theme.fonts.sizes.s};
  font-family: ${({ theme }) => theme.fonts.families.mono};
  color: ${({ theme }) => theme.colors.slate};
  line-height: 1.7rem;
  margin-bottom: 22px;
  display: block;
`

const FeaturedImage = styled.div`
  width: 800px;
  position: relative;
  left: -60px;
  margin-bottom: 42px;
`

const Content = styled.div`
  font-size: ${({ theme }) => theme.fonts.sizes.m};
  font-family: ${({ theme }) => theme.fonts.families.sans};
  color: ${({ theme }) => theme.colors.slate};
  line-height: 2.4rem;

  p {
    letter-spacing: 0.03em;
  }
`

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
