const { createRemoteFileNode } = require('gatsby-source-filesystem');
const path = require(`path`)
const { createFilePath } = require(`gatsby-source-filesystem`)

exports.createPages = async ({ graphql, actions }) => {
  const { createPage } = actions
  const result = await graphql(
    `
      {
        allMdx(
          sort: { fields: [frontmatter___order], order: ASC }
          limit: 1000
        ) {
          edges {
            node {
              id
              slug
              frontmatter {
                title
                category
                order
              }
            }
          }
        }
      }
    `
  )

  if (result.errors) {
    throw result.errors
  }
  

  // Create blog posts pages.
  const posts = result.data.allMdx.edges

  posts.forEach((post, index) => {
    const previous = index === posts.length - 1 ? null : posts[index + 1].node
    const next = index === 0 ? null : posts[index - 1].node

    createPage({
      path: post.node.slug,
      component: path.resolve(`./src/components/page-layout.js`),
      context: {
        id: post.node.id,
        previous,
        next,
      },
    })
  })
}



exports.createSchemaCustomization = ({ actions, schema }) => {
  const { createTypes, printTypeDefinitions } = actions;

  createTypes(`
    type Mdx implements Node {
      frontmatter: Frontmatter
    }

    type Frontmatter @dontInfer {
      title: String!
      order: String!
      description: String
      category: String!
      embeddedImagesRemote: [File] @link(by: "url")
      embeddedImagesLocal: [File] @fileByRelativePath
    }
    `);

  /* printTypeDefinitions({ path: './typeDefs.txt' });  */
};

exports.onCreateNode = ({
  node,
  getNode,
  createNodeId,
  actions,
  cache,
  store
}) => {


  if (node.internal.type === `Mdx` )   {
    const { createNodeField } = actions
    const value = createFilePath({ node, getNode })
    createNodeField({
      name: `slug`,
      node,
      value,
    })
  }

  if (
    node.internal.type === 'Mdx' &&
    node.frontmatter &&
    node.frontmatter.embeddedImagesRemote
  ) {
    const { createNode } = actions
    return Promise.all(
      node.frontmatter.embeddedImagesRemote.map((url) => {
        try {
          return createRemoteFileNode({
            url,
            parentNodeId: node.id,
            createNode,
            createNodeId,
            cache,
            store
          });
        } catch (error) {
          console.error(error);
        }
      })
    );
  }
};
