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

This repository contains the example code **and** the Gatsby theme. If you are here to install the Gatsby theme plugin in your existing project, check out the [theme specific README](/gatsby-wordpress-theme-libre/README.md) for further details.

In case you want to work with this repository (for local development, pull requests, etc.):

1. Clone or fork this repository:

```bash
git clone https://github.com/armada-inc/gatsby-wordpress-theme-libre.git
cd gatsby-wordpress-theme-libre
```

create `.wordpress-config.json` in example directory and add your wordpress config.

If your wordpress blog is self hosted it should look like

```json
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

if your blog is hosted on wordpress.com you will have to add few extra keys for reference check out [wordpress-source-docs](https://www.gatsbyjs.org/packages/gatsby-source-wordpress/).

2. Run `yarn` in directory where you cloned theme to install dependencies.

3. Run `yarn workspace example develop` to start the example locally.

# Copyright & License

Copyright (c) 2020 Armada Intelligence Inc - Released under the [MIT license](LICENSE).
