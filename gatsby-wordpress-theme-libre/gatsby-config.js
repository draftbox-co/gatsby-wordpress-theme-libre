const path = require(`path`);

const siteConfigDefaults = require(`./src/utils/siteConfigDefaults`);

/**
 * This is the place where you can tell Gatsby which plugins to use
 * and set them up the way you want.
 *
 * Further info 👉🏼 https://www.gatsbyjs.org/docs/gatsby-config/
 *
 */
module.exports = (themeOptions) => {
  const siteConfig = themeOptions.siteConfig || siteConfigDefaults;
  const wordpressConfig = themeOptions.wordpressConfig;

  const configOptions = {
    siteMetadata: siteConfig,
    plugins: [
      /**
       *  Content Plugins
       */
      {
        resolve: `gatsby-source-wordpress`,
        options: wordpressConfig,
      },
      {
        resolve: `gatsby-source-filesystem`,
        options: {
          path: path.join(__dirname, `src`, `pages`),
          name: `pages`,
        },
      },
      {
        resolve: `gatsby-source-filesystem`,
        options: {
          path: path.join(__dirname, `static`),
          name: `static`,
        },
      },
      // Setup for optimized images.
      // See https://www.gatsbyjs.org/packages/gatsby-image/
      {
        resolve: `gatsby-source-filesystem`,
        options: {
          path: path.join(__dirname, `src`, `images`),
          name: `images`,
        },
      },
      `gatsby-plugin-sharp`,
      `gatsby-transformer-sharp`,
      {
        resolve: `gatsby-plugin-advanced-sitemap`,
        options: {
          query: `
                    {
                      allWordpressPost {
                        edges {
                          node {
                            id
                            slug:permaLinkSlug
                            date
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
                    }`,
          mapping: {
            allWordpressPost: {
              sitemap: `posts`,
            },
            allWordpressTag: {
              sitemap: `tags`,
            },
            allWordpressWpUsers: {
              sitemap: `authors`,
            },
          },
          exclude: [
            `/dev-404-page`,
            `/404`,
            `/404.html`,
            `/offline-plugin-app-shell-fallback`,
            "/offline",
            "/offline.html",
          ],
          createLinkInHead: true,
          addUncaughtPages: true,
        },
      },
      `gatsby-plugin-catch-links`,
      `gatsby-plugin-react-helmet`,
      `gatsby-plugin-force-trailing-slashes`,
      {
        resolve: `gatsby-plugin-manifest`,
        options: {
          name: siteConfig.siteTitle,
          short_name: siteConfig.shortTitle,
          start_url: `/`,
          background_color: siteConfig.backgroundColor,
          theme_color: siteConfig.themeColor,
          display: `standalone`,
          icon: "static/favicon.png",
        },
      },
      {
        resolve: `gatsby-plugin-feed`,
        options: {
          query: `
            {
              site {
                siteMetadata {
                  siteUrl
                }
              }
            }
          `,
          feeds: [
            {
              serialize: ({ query: { site, allWordpressPost } }) => {
                return allWordpressPost.edges.map((edge) => {
                  return {
                    title: edge.node.title,
                    description: edge.node.excerpt,
                    date: edge.node.date,
                    url: site.siteMetadata.siteUrl + edge.node.slug,
                    guid: site.siteMetadata.siteUrl + edge.node.slug,
                    custom_elements: [{ "content:encoded": edge.node.content }],
                  };
                });
              },
              query: `
                {
                  allWordpressPost(sort: {fields: date, order: DESC}) {
                    edges {
                      node {
                        slug: permaLinkSlug
                        content
                        title
                        excerpt
                        date
                      }
                    }
                  }
                }
              `,
              output: "/rss.xml",
              title: siteConfig.siteTitle,
            },
          ],
        },
      },
      {
        resolve: "@draftbox-co/gatsby-plugin-amp",
        options: {
          canonicalBaseUrl: siteConfig.siteUrl,
          components: [`amp-form`],
          excludedPaths: [`/404*`, `/`, `/offline*`],
          pathIdentifier: `amp/`,
          relAmpHtmlPattern: `{{canonicalBaseUrl}}{{pathname}}{{pathIdentifier}}`,
          useAmpClientIdApi: true,
          dirName: __dirname,
          themePath: `src/amp-styles/post.amp.css`,
        },
      },
      {
        resolve: `gatsby-plugin-remove-generator`,
        options: {
          content: `Draftbox`,
        },
      },
      {
        resolve: `@draftbox-co/gatsby-plugin-css-variables`,
        options: {
          variables: siteConfig.themeConfig.variables,
        },
      },
    ],
  };

  if (siteConfig.themeConfig.fonts && siteConfig.themeConfig.fonts.length > 0) {
    configOptions.plugins.push({
      resolve: `@draftbox-co/gatsby-plugin-webfonts`,
      options: {
        fonts: {
          google: siteConfig.themeConfig.fonts,
        },
        formats: ["woff2", "woff"],
        useMinify: true,
        usePreload: true,
        usePreconnect: true,
        blacklist: ["/amp"],
      },
    });
  }

  return configOptions;
};
