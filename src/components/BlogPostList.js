import React from 'react'
import { Link } from 'gatsby'
import styled from 'styled-components'

import { Section } from './layout/Section'
import { AnimatedLink } from './AnimatedLink'

// TODO: Semantic html

export function BlogPostList({ posts, title, noTitle, fullList }) {
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
                &gt; Read More{' '}
                {post.frontmatter.externalUrl && '(external link)'}
              </AnimatedLink>
            </Content>
            <Meta>
              <div>
                <span>~/tags</span>$
              </div>
              <div>
                {post.frontmatter.tags
                  ? post.frontmatter.tags.map(
                      (t, i) =>
                        `${t}${
                          i < post.frontmatter.tags.length - 1 ? ', ' : ''
                        }`
                    )
                  : 'no tags yet'}
              </div>
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
  padding: 20px 30px;
  display: flex;
  min-height: 55px;
  color: ${({ theme }) => theme.colors.white};
  font-family: ${({ theme }) => theme.fonts.families.mono};
  text-transform: lowercase;

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
  max-width: 670px;

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
