const path = require(`path`);

const siteConfigDefaults = require(`./src/utils/siteConfigDefaults`);

/**
 * This is the place where you can tell Gatsby which plugins to use
 * and set them up the way you want.
 *
 * Further info 👉🏼 https://www.gatsbyjs.org/docs/gatsby-config/
 *
 */
module.exports = themeOptions => {
  const siteConfig = themeOptions.siteConfig || siteConfigDefaults;
  const wordpressConfig = themeOptions.wordpressConfig;

  return {
    siteMetadata: siteConfig,
    plugins: [
      /**
       *  Content Plugins
       */
      {
        resolve: `gatsby-source-wordpress`,
        options: wordpressConfig
      },
      {
        resolve: `gatsby-source-filesystem`,
        options: {
          path: path.join(__dirname, `src`, `pages`),
          name: `pages`
        }
      },
      // Setup for optimized images.
      // See https://www.gatsbyjs.org/packages/gatsby-image/
      {
        resolve: `gatsby-source-filesystem`,
        options: {
          path: path.join(__dirname, `src`, `images`),
          name: `images`
        }
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
                            slug
                            date
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
                    }`,
          mapping: {
            allWordpressPost: {
              sitemap: `posts`
            },
            allWordpressCategory: {
              sitemap: `tags`
            },
            allWordpressWpUsers: {
              sitemap: `authors`
            }
          },
          exclude: [
            `/dev-404-page`,
            `/404`,
            `/404.html`,
            `/offline-plugin-app-shell-fallback`
          ],
          createLinkInHead: true,
          addUncaughtPages: true
        }
      },
      `gatsby-plugin-catch-links`,
      `gatsby-plugin-react-helmet`,
      `gatsby-plugin-force-trailing-slashes`,
      `gatsby-plugin-offline`
    ]
  };
};
