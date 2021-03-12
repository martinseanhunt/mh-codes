import React from 'react'
import { useStaticQuery, graphql, Link } from 'gatsby'
import styled from 'styled-components'

import { Section } from './layout/Section'
import { AnimatedLink } from './AnimatedLink'

// TODO: Semantic html

export function BlogPostList() {
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
    <Section
      title="From The Blog"
      sectionPadding="72px 50px 120px 50px"
      sectionMargin="0"
      dottedBackground
    >
      <Posts>
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

              <AnimatedLink
                href={post.frontmatter.externalUrl}
                to={!post.frontmatter.externalUrl && post.fields.slug}
                className="rm-animated"
              >
                &gt; Read More
              </AnimatedLink>
            </Content>
            <Meta>
              <span>~/tags</span>$ <a href="#">Tag1</a>,<a href="#">Todo</a>
            </Meta>
          </Post>
        ))}
      </Posts>
    </Section>
  )
}

// TODO: Store grid gap in theme ?
const Posts = styled.ul`
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-gap: 38px;
`

const Post = styled.li`
  border: 1px solid ${({ theme }) => theme.colors.faint};
  border-radius: 3px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  background: ${({ theme }) => theme.colors.white};
  overflow: hidden;
`
const Content = styled.div`
  padding: 30px;
`

const Meta = styled.div`
  background: ${({ theme }) => theme.colors.terminalBlack};
  border-top: 1px solid ${({ theme }) => theme.colors.faint};
  padding: 0 30px;
  display: flex;
  align-items: center;
  height: 55px;
  color: ${({ theme }) => theme.colors.white};
  font-family: ${({ theme }) => theme.fonts.families.mono};

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
`

// TODO: Heading component
const Title = styled.h2`
  font-size: ${({ theme }) => theme.fonts.sizes.xl};
  color: ${({ theme }) => theme.colors.slate};
  line-height: 3.1rem;
  margin-bottom: 31px;
`
