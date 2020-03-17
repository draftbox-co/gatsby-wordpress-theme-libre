# gatsby-wordpress-theme-libre

A Gatsby theme plugin for creating blogs from headless WordPress CMS.

Turn your WordPress blog into a lightning fast static website. This Gatsby theme is a frontend replacement of the WordPress engine featuring the standard Libre 2 skin and functionality. All content is sourced from a headless WordPress CMS.

## Demo

Play with the [Demo](https://gatsby-wordpress-libre.netlify.com/) to get a first impression.

## Features

- WordPress Libre 2 skin
- SEO optimized
- Fully responsive
- Composable and extensible

## Installation

> Head over to the [starter repo](https://github.com/armada-inc/gatsby-wordpress-libre-starter) to get up and running quickly!

If you want to add this blog theme to an existing site, follow these instructions:

1. Install the blog theme

   ```bash
   yarn add @armada-inc/gatsby-wordpress-theme-libre
   # or
   npm install @armada-inc/gatsby-wordpress-theme-libre --save
   ```

2. Create following files in your root directory with your desired config.

   - Create siteConfig.js in root directory and configure it as shown below.

```js
//siteConfig.js
module.exports = {
  siteUrl: "http://localhost:9000", // Site domain. Do not include a trailing slash!

  postsPerPage: 2, // Number of posts shown on paginated pages (changes this requires sometimes to delete the cache)

  siteTitleMeta: "Wordpress Gatsby Starter", // This allows an alternative site title for meta data for pages.
  siteDescriptionMeta:
    "A starter template to build amazing static websites with Wordpress and Gatsby", // This allows an alternative site description for meta data for pages.

  shareImageWidth: 1000, // Change to the width of your default share image
  shareImageHeight: 523, // Change to the height of your default share image

  shortTitle: "Wordpress", // Used for App manifest e.g. Mobile Home Screen
  siteIcon: "favicon.png", // Logo in /static dir used for SEO, RSS, and App manifest
  backgroundColor: "#e9e9e9", // Used for Offline Manifest
  themeColor: "#15171A" // Used for Offline Manifest
};
```

In the configuration shown above, the most important fields to be changed are `siteUrl`, `siteTitleMeta` and `siteDescriptionMeta`. Update at least those to fit your needs.

    - Create .wordpress-config.json in root directory and configure it as shown below.

```bash
    {
        "baseUrl": "yourwordpressblog.com",
        "protocol": "https",
        "hostingWPCOM": false,
        "useACF": true,
        "includedRoutes": [
            "**/categories",
            "**/posts",
            "**/pages",
            "**/media",
            "**/tags",
            "**/taxonomies",
            "**/users"
        ]
    }
```

In the configuration shown above, the most important fields to be changed are `baseUrl` and `hostingWPCOM` . Update those with your configuration. example shown above works great for self hosted wordpress.

If your blog is hosted on wordpress.com you will have to add few extra keys for reference check out [wordpress-source-docs](https://www.gatsbyjs.org/packages/gatsby-source-wordpress/).

2. Add the following configuration to your `gatsby-config.js` file

   ```js
   // gatsby-config.js

   let siteConfig;
   let wordpressConfig;

   try {
     siteConfig = require(`./siteConfig`);
     wordpressConfig = require(`./.wordpress-config`);

     console.log(wordpressConfig);
   } catch (e) {
     console.log(e);
   }

   module.exports = {
     plugins: [
       {
         resolve: `@armada-inc/gatsby-wordpress-theme-libre`,
         options: {
           wordpressConfig,
           siteConfig: siteConfig
         }
       }
     ]
   };
   ```

# Copyright & License

Copyright (c) 2020 Armada Intelligence Inc - Released under the [MIT license](LICENSE).
