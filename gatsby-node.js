const { createFilePath } = require(`gatsby-source-filesystem`)

// Add slug as field to markdownRemark
exports.onCreateNode = ({ node, getNode, actions }) => {
  const { createNodeField } = actions
  if (node.internal.type === `MarkdownRemark`) {
    const slug = createFilePath({
      node,
      getNode,
      basePath: `src/content`,
      trailingSlash: false,
    })

    createNodeField({
      node,
      name: `slug`,
      value: slug,
    })
  }
}

// Create pages for blog posts that don't have an external url
exports.createPages = async ({ actions, graphql, reporter }) => {
  const { createPage } = actions
  const BlogPost = require.resolve(`./src/templates/BlogPost.js`)

  const result = await graphql(`
    {
      allMarkdownRemark(
        filter: {
          frontmatter: {
            templateKey: { eq: "blog-post" }
            externalUrl: { eq: null }
          }
        }
        sort: { order: DESC, fields: [frontmatter___date] }
        limit: 1000
      ) {
        edges {
          node {
            fields {
              slug
            }
            frontmatter {
              title
            }
          }
        }
      }
    }
  `)

  // Handle errors
  if (result.errors) {
    reporter.panicOnBuild(`Error while running GraphQL query.`)
    return
  }

  const { edges: posts } = result.data.allMarkdownRemark
  posts.forEach(({ node }, i) => {
    const prev = i === 0 ? null : posts[i - 1].node
    const next = i === posts.length - 1 ? null : posts[i + 1].node

    createPage({
      path: node.fields.slug,
      component: BlogPost,
      context: {
        // additional data can be passed via context
        slug: node.fields.slug,
        prev,
        next,
      },
    })
  })
}
