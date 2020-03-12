/**
 * Implement Gatsby's Node APIs in this file.
 *
 * See: https://www.gatsbyjs.org/docs/node-apis/
 */

// You can delete this file if you're not using it
const path = require(`path`);

exports.createPages = async ({ graphql, actions, reporter }) => {
  const postTemplate = require.resolve("./src/templates/post.js");
  console.log(postTemplate, "template");
  const { createPage } = actions;
  const result = await graphql(
    `
      {
        allWordpressPost {
          edges {
            node {
              id
              slug
            }
          }
        }
      }
    `
  );

  if (result.errors) {
    reporter.panicOnBuild(`Error while running GraphQL query.`);
    return;
  }

  const posts = result.data.allWordpressPost.edges;

  posts.forEach((post, i, arr) => {
    createPage({
      path: `/${post.node.slug}`,
      component: postTemplate,
      context: {
        slug: post.node.slug
      }
    });
  });
};
