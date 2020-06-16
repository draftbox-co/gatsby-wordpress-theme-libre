module.exports = {
  siteUrl: "https://yourwordpressblog.com", // Site domain. Do not include a trailing slash!

  postsPerPage: 10, // Number of posts shown on paginated pages (changes this requires sometimes to delete the cache)

  siteTitleMeta: "Wordpress Gatsby Starter", // This allows an alternative site title for meta data for pages.
  siteDescriptionMeta:
    "A starter template to build amazing static websites with Wordpress and Gatsby", // This allows an alternative site description for meta data for pages.

  shareImageWidth: 1000, // Change to the width of your default share image
  shareImageHeight: 523, // Change to the height of your default share image

  shortTitle: "Wordpress", // Used for App manifest e.g. Mobile Home Screen
  siteIcon: "favicon.png", // Logo in /static dir used for SEO, RSS, and App manifest
  backgroundColor: "#e9e9e9", // Used for Offline Manifest
  themeColor: "#15171A", // Used for Offline Manifest,
  apiUrl: "https://gatsbylibre2.wordpress.com", 
  subscribeWidget: {
    title: "Subscribe to Draftbox",
    helpText: "Get the latest posts delivered right to your inbox.",
    successMessage: "Thanks for subscribing to Built with Draftbox.",
  },
  header: {
    navigation: [
      {
        label: "Home",
        url: "https://gatsbylibre2.wordpress.com/",
      },
      {
        label: "Contact",
        url: "https://gatsbylibre2.wordpress.com/contact",
      },
      {
        label: "Contact1111",
        url: "https://gatsbylibre2.wordpress.com/contact111",
      },
    ],
  },
  footer: {
    copyright: "Built with Draftbox122",
    navigation: [
      {
        label: "Home",
        url: "https://gatsbylibre2.wordpress.com/",
      },
      {
        label: "Sitemap",
        url: "https://gatsbylibre2.wordpress.com/sitemap.xml",
      },
      {
        label: "RSS",
        url: "https://gatsbylibre2.wordpress.com/rss.xml",
      },
      {
        label: "Contact",
        url: "https://gatsbylibre2.wordpress.com/contact",
      },
      {
        label: "External Link",
        url: "https://spectrum.chat/gatsby-js/themes?tab=posts",
      },
    ],
  },
  socialLinks: {
    twitter: "https://twitter.com/draftboxhq",
    facebook: "https://facebook.com/draftboxhq",
    instagram: "https://www.instagram.com/draftboxhq_uploads",
    linkedin: "https://linkedin.com/",
    github: "https://github.com/draftbox-co",
  },
};
