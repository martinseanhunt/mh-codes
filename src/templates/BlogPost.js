import React from 'react'
import { graphql } from 'gatsby'
import { Helmet } from 'react-helmet'
import styled from 'styled-components'
import { defineCustomElements as deckDeckGoHighlightElement } from '@deckdeckgo/highlight-code/dist/loader'
import { GatsbyImage, getImage } from 'gatsby-plugin-image'

import { Section } from '../components/layout/Section'

import { AnimatedLink } from '../components/AnimatedLink'

deckDeckGoHighlightElement()

export default function BlogPost({ data, pageContext }) {
  const {
    post: { frontmatter, html },
    site,
  } = data
  const { next, prev } = pageContext

  const featuredImage = getImage(frontmatter.image)

  const nextPost = prev || next

  // TODO: Ability to add image captions to netlify

  return (
    <>
      <Helmet
        title={`${frontmatter.title} - ${site.siteMetadata.title}`}
        defer={false}
      />

      <PostSection maxWidth="800px">
        <Post>
          <Title>{frontmatter.title}</Title>
          <Date>{frontmatter.date}</Date>
          {featuredImage && (
            <FeaturedImage>
              <GatsbyImage
                image={featuredImage}
                alt={`${frontmatter.title} featured image`}
              />
            </FeaturedImage>
          )}
          <Content
            className="blog-post-content"
            dangerouslySetInnerHTML={{ __html: html }}
          />

          <Meta>
            <div>
              <span>~/tags</span>${' '}
            </div>
            <div>
              {frontmatter.tags
                ? frontmatter.tags.map(
                    (t, i) =>
                      `${t}${i < frontmatter.tags.length - 1 ? ', ' : ''}`
                  )
                : 'no tags yet'}
            </div>
          </Meta>
        </Post>
      </PostSection>

      {nextPost && (
        <NextPost maxWidth="680px" title={prev ? 'Previous Post' : 'Next Post'}>
          <h2>{nextPost.frontmatter.title}</h2>
          <AnimatedLink to={nextPost.fields.slug}>&gt; Read More</AnimatedLink>
        </NextPost>
      )}
    </>
  )
}

const PostSection = styled(Section)`
  margin-bottom: 72px;

  @media ${({ theme }) => theme.layout.mediaQueries.maxSmall} {
    margin-bottom: 65px;
  }
`

const Post = styled.article`
  padding: 0 60px;

  @media ${({ theme }) => theme.layout.mediaQueries.maxSmall} {
    padding: 0;
  }
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
  position: relative;
  margin-bottom: 42px;

  @media ${({ theme }) => theme.layout.mediaQueries.maxSmall} {
    left: -22px;
    width: 100vw;
  }

  @media ${({ theme }) => theme.layout.mediaQueries.minFull} {
    width: 800px;
    left: -60px;
  }
`

const Content = styled.div`
  font-size: ${({ theme }) => theme.fonts.sizes.m};
  font-family: ${({ theme }) => theme.fonts.families.sans};
  color: ${({ theme }) => theme.colors.slate};
  line-height: 2.4rem;

  h1,
  h2,
  h3,
  h4,
  h5 {
    font-size: ${({ theme }) => theme.fonts.sizes.xl};
    line-height: 3.1rem;
    color: ${({ theme }) => theme.colors.dark};
    margin-bottom: 22px;

    &:not(:first-child) {
      padding-top: 9px;
    }
  }

  p {
    letter-spacing: 0.03em;
    margin-bottom: 33px;
  }

  img {
    margin: 0 auto 33px auto;
    max-width: 100%;
  }

  .deckgo-highlight-code-carbon {
    margin-bottom: 33px !important;
    font-size: ${({ theme }) => theme.fonts.sizes.s} !important;
    font-family: ${({ theme }) => theme.fonts.families.mono} !important;
  }
`

const NextPost = styled(Section)`
  h3 {
    margin-bottom: 22px;

    @media ${({ theme }) => theme.layout.mediaQueries.maxSmall} {
      margin-bottom: 18px;
    }
  }

  h2 {
    line-height: 3.1rem;
    font-size: ${({ theme }) => theme.fonts.sizes.xl};
    color: ${({ theme }) => theme.fonts.families.terminalBlack};
    font-family: ${({ theme }) => theme.fonts.families.sans};
    max-width: 600px;
    margin-bottom: 33px;
  }
`

// TODO: Reusable component
const Meta = styled.div`
  background: ${({ theme }) => theme.colors.terminalBlack};
  padding: 20px 30px;
  display: flex;
  min-height: 55px;
  color: ${({ theme }) => theme.colors.white};
  font-family: ${({ theme }) => theme.fonts.families.mono};

  div:first-of-type {
    flex-shrink: 0;
  }

  div:last-of-type {
    padding-left: 7px;
  }

  a {
    color: ${({ theme }) => theme.colors.white};
    margin-left: 5px;
    &:hover {
      text-decoration: underline;
    }
  }

  span {
    color: ${({ theme }) => theme.colors.terminalBlue};
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
      tags
      image {
        childImageSharp {
          gatsbyImageData(width: 800)
        }
      }
    }
    excerpt(truncate: false, pruneLength: 350)
  }
`

export const query = graphql`
  query($slug: String!) {
    ...SiteMeta
    post: markdownRemark(fields: { slug: { eq: $slug } }) {
      ...PostDetail
    }
  }
`
