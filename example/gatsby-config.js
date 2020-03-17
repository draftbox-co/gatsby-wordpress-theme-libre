let wordpressConfig;

try {
  wordpressConfig = require(`./.wordpress-config`);
  siteConfig = require("./site-config");
} catch (e) {
  console.log(e);
}

module.exports = {
  plugins: [
    {
      resolve: `@armada-inc/gatsby-wordpress-theme-libre`,
      options: {
        wordpressConfig,
        siteConfig
      }
    }
  ]
};
