import React from 'react'
import { useStaticQuery, graphql, Link } from 'gatsby'
import styled from 'styled-components'

export function BlogPostList() {
  const {
    allMarkdownRemark: { nodes: posts },
  } = useStaticQuery(graphql`
    query BlogPosts {
      allMarkdownRemark(
        filter: { frontmatter: { templateKey: { eq: "blog-post" } } }
      ) {
        nodes {
          ...PostDetail
        }
      }
    }
  `)

  return (
    <>
      <Title>From the blog</Title>
      <ul>
        {posts?.map((post) => (
          <li key={post.fields.slug}>
            <span>
              {post.frontmatter.externalUrl ? (
                <a href={post.frontmatter.externalUrl} target="__blank">
                  {post.frontmatter.title}
                </a>
              ) : (
                <Link to={post.fields.slug}>{post.frontmatter.title}</Link>
              )}
              <p>{post.excerpt}</p>
            </span>
          </li>
        ))}
      </ul>
    </>
  )
}

const Title = styled.h2`
  margin-top: 50px;
  color: ${({ theme }) => theme.colors.highlight};
`
