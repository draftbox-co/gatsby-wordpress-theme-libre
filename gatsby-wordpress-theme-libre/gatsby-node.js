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

  createTypes(`
    type wordpress__PAGE implements Node {
      plainExcerpt: String @plainExcerpt
    }
  `);

  const typeDefs = `
  type WPSiteMetaData implements Node {
    siteDescription: String
    siteName: String
  }
`;
  createTypes(typeDefs);
};

exports.createResolvers = async ({
  actions,
  cache,
  createNodeId,
  createResolvers,
  store,
  reporter
}) => {
  const { createNode } = actions;
  console.log("createResolvers called");

  createResolvers({
    Query: {
      wpSiteMetaData: {
        type: `WPSiteMetaData`,
        resolve(source, args, context, info) {
          let title = "";
          let description = "";
          const metadata = context.nodeModel.getAllNodes({
            type: `wordpress__site_metadata`
          });
          const wordPressSetting = context.nodeModel.getAllNodes({
            type: `wordpress__wp_settings`
          });
          title = metadata[0].name
            ? metadata[0].name
            : wordPressSetting[0].title;
          description = metadata[0].description
            ? metadata[0].description
            : wordPressSetting[0].description;
          return {
            siteName: title,
            siteDescription: description
          };
        }
      }
    }
  });
};

exports.createPages = async ({ graphql, actions, reporter }) => {
  const indexTemplate = require.resolve("./src/templates/index.js");
  const postTemplate = require.resolve("./src/templates/post.js");
  const authorTemplate = require.resolve("./src/templates/post-by-author.js");
  const categoryTemplate = require.resolve(
    "./src/templates/post-by-category.js"
  );
  const pageTemplate = require.resolve("./src/templates/page.js");
  const postAmpTemplate = require.resolve("./src/templates/post.amp.js");

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

        allWordpressPage {
          edges {
            node {
              slug
            }
          }
        }

        site {
          siteMetadata {
            postsPerPage
          }
        }

        wpSiteMetaData {
          siteName
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
  const pages = result.data.allWordpressPage.edges;
  const siteTitle = result.data.wpSiteMetaData.siteName;

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

    createPage({
      path: `/${post.node.slug}/amp`,
      component: postAmpTemplate,
      context: {
        slug: post.node.slug,
        amp: true,
        title: siteTitle
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

  pages
    .filter(page => !page.node.slug.startsWith("contact"))
    .forEach(page => {
      createPage({
        path: `/${page.node.slug}`,
        component: pageTemplate,
        context: {
          slug: page.node.slug
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
