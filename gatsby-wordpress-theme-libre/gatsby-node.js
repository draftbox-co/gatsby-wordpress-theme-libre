/**
 * Implement Gatsby's Node APIs in this file.
 *
 * See: https://www.gatsbyjs.org/docs/node-apis/
 */

const { paginate } = require(`gatsby-awesome-pagination`);
const htmlToText = require("html-to-text");
const readingTime = require("reading-time");
const fetch = require("node-fetch");

exports.sourceNodes = require("./fix-source-nodes");

exports.createSchemaCustomization = ({ actions, schema }) => {
  const { createFieldExtension, createTypes } = actions;

  createFieldExtension({
    name: "featured_media_custom",
    extend() {
      return {
        resolve(source, args, context, info) {
          if (source.featured_media___NODE) {
            return context.nodeModel.getNodeById({
              id: source.featured_media___NODE,
              type: "wordpress__wp_media",
            });
          }
          return null;
        },
      };
    },
  });

  createFieldExtension({
    name: "tags_custom",
    extend() {
      return {
        resolve(sources, args, context, info) {
          if (sources.tags___NODE && sources.tags___NODE.length > 0) {
            return sources.tags___NODE.map((tagNode) =>
              context.nodeModel.getNodeById({
                id: tagNode,
                type: `wordpress__TAG`,
              })
            );
          }
          return [];
        },
      };
    },
  });

  createFieldExtension({
    name: "plainExcerpt",
    extend() {
      return {
        resolve(source) {
          let plainExcerpt = htmlToText.fromString(source.excerpt, {
            // wordWrap: 155,
            wordwrap: false,
            ignoreHref: true,
          });
          //.slice(0, 156);

          if (plainExcerpt.includes("Continue reading")) {
            plainExcerpt = plainExcerpt.substring(
              0,
              plainExcerpt.indexOf("Continue reading")
            );
          }
          // if (plainExcerpt.length > 155) {
          //   plainExcerpt = plainExcerpt.slice(0, 152) + "...";
          // }
          return plainExcerpt;
        },
      };
    },
  });

  createFieldExtension({
    name: "readingTime",
    extend() {
      return {
        resolve(source) {
          const readingTimeValue = readingTime(source.content);
          return readingTimeValue.text;
        },
      };
    },
  });

  createFieldExtension({
    name: "plainTitle",
    extend(options, prevFieldConfig) {
      return {
        resolve(source) {
          let plainTitle = htmlToText.fromString(source.title).slice(0, 156);
          return plainTitle;
        },
      };
    },
  });

  createTypes(`
    type wordpress__POST implements Node {
      plainExcerpt: String @plainExcerpt
      readingTime: String @readingTime
      plainTitle: String @plainTitle
      tags_custom: [wordpress__TAG] @tags_custom
      featured_media_custom: wordpress__wp_media @featured_media_custom
    }
  `);

  createTypes(`
    type wordpress__PAGE implements Node {
      plainExcerpt: String @plainExcerpt
      readingTime: String @readingTime
      plainTitle: String @plainTitle
      featured_media_custom: wordpress__wp_media @featured_media_custom
    }
  `);

  const typeDefs = `
  type WPSiteMetaData implements Node {
    siteDescription: String
    siteName: String
    language: String
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
  reporter,
}) => {
  const { createNode } = actions;

  createResolvers({
    Query: {
      wpSiteMetaData: {
        type: `WPSiteMetaData`,
        async resolve(source, args, context, info) {
          let title = "";
          let description = "";
          let language = "auto";

          const metadata = context.nodeModel.getAllNodes({
            type: `wordpress__site_metadata`,
          });
          const wordPressSetting = context.nodeModel.getAllNodes({
            type: `wordpress__wp_settings`,
          });
          if (metadata && metadata.length > 0) {
            title = metadata[0].name;
            description = metadata[0].description;
          }
          if (wordPressSetting && wordPressSetting.length > 0) {
            title = wordPressSetting[0].title;
            description = wordPressSetting[0].description;
            language = wordPressSetting[0].language;
          } else {
            try {
              const response = await fetch(metadata[0].url);
              const responseHTML = await response.text();
              const firstValue = responseHTML.match(
                /(?<=")(?:\\.|[^"\\])*(?=")/
              )[0];
              language = firstValue;
            } catch (error) {
              console.log("fetching html error");
              language = "auto";
            }
          }
          return {
            siteName: title,
            siteDescription: description,
            language: language,
          };
        },
      },
    },
  });
};

exports.createPages = async ({ graphql, actions, reporter }) => {
  const indexTemplate = require.resolve("./src/templates/index.js");
  const postTemplate = require.resolve("./src/templates/post.js");
  const authorTemplate = require.resolve("./src/templates/post-by-author.js");
  const tagTemplate = require.resolve("./src/templates/post-by-tag.js");
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

        allWordpressTag(filter: { count: { gt: 0 } }) {
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
  const tags = result.data.allWordpressTag.edges;
  const pages = result.data.allWordpressPage.edges;
  const siteTitle = result.data.wpSiteMetaData.siteName;

  posts.forEach((post, i, arr) => {
    createPage({
      path: `/${post.node.slug}`,
      component: postTemplate,
      context: {
        slug: post.node.slug,
        next: i === arr.length - 1 ? null : arr[i + 1].node.id,
        prev: i !== 0 ? arr[i - 1].node.id : null,
      },
    });

    createPage({
      path: `/${post.node.slug}/amp`,
      component: postAmpTemplate,
      context: {
        slug: post.node.slug,
        amp: true,
        title: siteTitle,
      },
    });
  });

  authors.forEach((post) => {
    createPage({
      path: `/author/${post.node.slug}`,
      component: authorTemplate,
      context: {
        slug: post.node.slug,
      },
    });
  });

  tags.forEach((tag) => {
    createPage({
      path: `/tag/${tag.node.slug}`,
      component: tagTemplate,
      context: {
        slug: tag.node.slug,
      },
    });
  });

  pages
    .filter((page) => !page.node.slug.startsWith("contact"))
    .forEach((page) => {
      createPage({
        path: `/${page.node.slug}`,
        component: pageTemplate,
        context: {
          slug: page.node.slug,
        },
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
    },
  });
};
