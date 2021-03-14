import React from 'react'
import { useStaticQuery, graphql, Link } from 'gatsby'
import styled from 'styled-components'

import { Section } from './layout/Section'
import { AnimatedLink } from './AnimatedLink'

import GQL from '../img/gql.png'

// TODO: Semantic html

export function BlogPostList({ title, noTitle, fullList }) {
  const {
    allMarkdownRemark: { nodes: posts },
  } = useStaticQuery(graphql`
    query BlogPosts {
      allMarkdownRemark(
        filter: { frontmatter: { templateKey: { eq: "blog-post" } } }
        limit: 2
      ) {
        nodes {
          ...PostDetail
        }
      }
    }
  `)

  return (
    <BlogSection
      title={noTitle ? undefined : title ? title : 'From The Blog'}
      fullList={fullList}
      dottedBackground={fullList ? undefined : true}
    >
      <Posts fullList={fullList}>
        {posts?.map((post) => (
          <Post key={post.fields.slug}>
            <Content>
              <Date>{post.frontmatter.date}</Date>
              <Title>
                {post.frontmatter.externalUrl ? (
                  <a href={post.frontmatter.externalUrl} target="__blank">
                    {post.frontmatter.title}
                  </a>
                ) : (
                  <Link to={post.fields.slug}>{post.frontmatter.title}</Link>
                )}
              </Title>

              {fullList && (
                <Excerpt>
                  {post.frontmatter.excerpt || post.excerpt}
                  {post.frontmatter.excerpt || post.excerpt}
                  {post.frontmatter.excerpt || post.excerpt}
                  {post.frontmatter.excerpt || post.excerpt}
                  {post.frontmatter.excerpt || post.excerpt}
                </Excerpt>
              )}

              <AnimatedLink
                href={post.frontmatter.externalUrl}
                to={post.fields.slug ? post.fields.slug : undefined}
                className="rm-animated"
              >
                &gt; Read More
              </AnimatedLink>
            </Content>
            <Meta>
              <span>~/tags</span>$ <a href="/todo">Tag1</a>,
              <a href="/todo">Todo</a>
            </Meta>
          </Post>
        ))}
      </Posts>
    </BlogSection>
  )
}

const BlogSection = styled(Section)`
  padding-top: ${({ fullList }) => (fullList ? '0' : '72px')};
  padding-bottom: 108px;
  margin: 0;

  @media ${({ theme }) => theme.layout.mediaQueries.maxSmall} {
    padding-top: ${({ fullList }) => (fullList ? '0' : '33px')};
    padding-bottom: 65px;
  }
`

const Posts = styled.ul`
  display: grid;
  grid-template-columns: ${({ fullList }) => (fullList ? '1fr' : '1fr 1fr')};
  grid-gap: ${({ fullList }) => (fullList ? '54px' : '33px')};

  @media ${({ theme }) => theme.layout.mediaQueries.maxMedium} {
    grid-gap: 22px;
  }

  @media ${({ theme }) => theme.layout.mediaQueries.maxSmall} {
    grid-template-columns: 1fr;
    grid-gap: 33px;
  }
`

const Post = styled.li`
  border-radius: 3px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  background: ${({ theme }) => theme.colors.white};
  overflow: hidden;
`
const Content = styled.div`
  padding: 25px 30px 34px 30px;
  border: 1px solid ${({ theme }) => theme.colors.faint};
  border-bottom: none;
  border-radius: 3px 3px 0 0;
  flex: 1;

  @media ${({ theme }) => theme.layout.mediaQueries.maxSmall} {
    padding: 25px 20px;

    & > div a {
      font-size: ${({ theme }) => theme.fonts.sizes.xxs} !important;
    }
  }
`

const Meta = styled.div`
  background: ${({ theme }) => theme.colors.terminalBlack};
  padding: 0 30px;
  display: flex;
  align-items: center;
  height: 55px;
  color: ${({ theme }) => theme.colors.white};
  font-family: ${({ theme }) => theme.fonts.families.mono};

  @media ${({ theme }) => theme.layout.mediaQueries.maxSmall} {
    //font-size: ${({ theme }) => theme.fonts.sizes.xxs};
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

const Date = styled.span`
  font-family: ${({ theme }) => theme.fonts.families.mono};
  display: block;
  margin-bottom: 15px;

  @media ${({ theme }) => theme.layout.mediaQueries.maxSmall} {
    // font-size: ${({ theme }) => theme.fonts.sizes.xxs};
  }
`

// TODO: Heading component
const Title = styled.h2`
  font-size: ${({ theme }) => theme.fonts.sizes.xl};
  color: ${({ theme }) => theme.colors.slate};
  line-height: 3.1rem;
  margin-bottom: 27px;

  @media ${({ theme }) => theme.layout.mediaQueries.maxSmall} {
    // font-size: ${({ theme }) => theme.fonts.sizes.l};
  }
`

const Excerpt = styled.p`
  color: ${({ theme }) => theme.colors.slate};
  font-size: ${({ theme }) => theme.fonts.sizes.m};
  line-height: 2.4rem;
  max-width: 663px;
  font-family: ${({ theme }) => theme.fonts.families.sansLight};
  letter-spacing: 0.03em;
  padding-bottom: 25px;

  @media ${({ theme }) => theme.layout.mediaQueries.maxSmall} {
    font-size: ${({ theme }) => theme.fonts.sizes.s};
  }
`
