import React from 'react'
import { useStaticQuery, graphql, Link } from 'gatsby'
import styled from 'styled-components'

import { Section } from './layout/Section'

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
      sectionPadding="72px 50px 0 50px"
      dottedBackground
    >
      <Posts>
        {posts?.map((post) => (
          <Post key={post.fields.slug}>
            <Content>
              {post.frontmatter.externalUrl ? (
                <a href={post.frontmatter.externalUrl} target="__blank">
                  {post.frontmatter.title}
                </a>
              ) : (
                <Link to={post.fields.slug}>{post.frontmatter.title}</Link>
              )}
              <p>{post.excerpt}</p>
            </Content>
            <Meta></Meta>
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
  background: ${({ theme }) => theme.colors.white};
  display: flex;
  flex-direction: column;
  justify-content: space-between;
`
const Content = styled.div`
  padding: 30px;
`

const Meta = styled.div`
  background: ${({ theme }) => theme.colors.terminalBlack};
  padding: 20px;
`
