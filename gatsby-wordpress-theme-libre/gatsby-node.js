/**
 * Implement Gatsby's Node APIs in this file.
 *
 * See: https://www.gatsbyjs.org/docs/node-apis/
 */

const { paginate } = require(`gatsby-awesome-pagination`);
const htmlToText = require("html-to-text");

exports.createSchemaCustomization = ({ actions, schema }) => {
  const { createFieldExtension, createTypes } = actions;
  createFieldExtension({
    name: "plainExcerpt",
    extend(options, prevFieldConfig) {
      return {
        resolve(source) {
          let plainExcerpt = htmlToText
            .fromString(source.excerpt, {
              wordWrap: 155,
              ignoreHref: true
            })
            .slice(0, 156);

          if (plainExcerpt.length > 155) {
            plainExcerpt = plainExcerpt.slice(0, 152) + "...";
          }
          return plainExcerpt;
        }
      };
    }
  });
  createTypes(`
    type wordpress__POST implements Node {
      plainExcerpt: String @plainExcerpt
    }
  `);
};

exports.createPages = async ({ graphql, actions, reporter }) => {
  const indexTemplate = require.resolve("./src/templates/index.js");
  const postTemplate = require.resolve("./src/templates/post.js");
  const authorTemplate = require.resolve("./src/templates/post-by-author.js");
  const categoryTemplate = require.resolve(
    "./src/templates/post-by-category.js"
  );

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

        allWordpressCategory(filter: { count: { gt: 0 } }) {
          edges {
            node {
              name
              slug
            }
          }
        }

        allWordpressWpUsers {
          edges {
            node {
              name
              slug
            }
          }
        }

        site {
          siteMetadata {
            postsPerPage
          }
        }
      }
    `
  );

  if (result.errors) {
    reporter.panicOnBuild(`Error while running GraphQL query.`);
    return;
  }

  const postsPerPage = result.data.site.siteMetadata.postsPerPage;
  const posts = result.data.allWordpressPost.edges;
  const authors = result.data.allWordpressWpUsers.edges;
  const categories = result.data.allWordpressCategory.edges;

  posts.forEach((post, i, arr) => {
    createPage({
      path: `/${post.node.slug}`,
      component: postTemplate,
      context: {
        slug: post.node.slug,
        next: i === arr.length - 1 ? null : arr[i + 1].node.id,
        prev: i !== 0 ? arr[i - 1].node.id : null
      }
    });
  });

  authors.forEach(post => {
    createPage({
      path: `/author/${post.node.slug}`,
      component: authorTemplate,
      context: {
        slug: post.node.slug
      }
    });
  });

  categories.forEach(post => {
    createPage({
      path: `/category/${post.node.slug}`,
      component: categoryTemplate,
      context: {
        slug: post.node.slug
      }
    });
  });

  paginate({
    createPage,
    items: posts,
    itemsPerPage: postsPerPage,
    component: indexTemplate,
    pathPrefix: ({ pageNumber }) => {
      if (pageNumber === 0) {
        return `/`;
      } else {
        return `/page`;
      }
    }
  });
};
