let wordpressConfig;

try {
  wordpressConfig = require(`./.wordpress-config`);
} catch (e) {
  console.log(e);
}

module.exports = {
  plugins: [
    {
      resolve: `gatsby-wordpress-theme-libre`,
      options: {
        wordpressConfig
      }
    }
  ]
};
