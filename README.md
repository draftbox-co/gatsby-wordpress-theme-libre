[![Draftbox](https://res.cloudinary.com/thinkcdnimages/image/upload/v1589291053/Draftbox/draftbox-for-github.svg)](https://draftbox.co)

# gatsby-wordpress-theme-libre

A Gatsby theme plugin for creating blogs from headless WordPress CMS.

Turn your WordPress blog into a lightning fast static website. This Gatsby theme is a frontend replacement of the WordPress engine featuring the standard Libre 2 skin and functionality. All content is sourced from a headless WordPress CMS.

> This starter is being used at [Draftbox](https://draftbox.co). Get lightning fast, secure front-end for your WordPress or Ghost blog, in 5 minutes or less, without coding. For our fellow devs, we also provide code export feature.

## Demo

Play with the [Demo](https://wp-libre-preview.draftbox.co/) to get a first impression.

## Features

- WordPress Libre 2 skin
- SEO optimized
- Fully responsive
- Gatsby images
- Styled 404 page
- RSS Feed
- AMP Pages
- Sitemap
- Contact Form
- Subscribe Form
- Social Sharing
- Composable and extensible

## Quick Start

Head over to the [starter repo](https://github.com/draftbox-co/gatsby-wordpress-libre-starter) to get up and running quickly! The starter is recommended if you are creating a new site.

## Installation

This repository contains the example code **and** the Gatsby theme. If you are here to install the Gatsby theme plugin in your existing project, check out the [theme specific README](/gatsby-wordpress-theme-libre/README.md) for further details.

In case you want to work with this repository (for local development, pull requests, etc.):

1. Clone or fork this repository:

```bash
git clone https://github.com/draftbox-co/gatsby-wordpress-theme-libre.git
cd gatsby-wordpress-theme-libre
```

create `.wordpress-config.json` in example directory and add your wordpress config.

If your wordpress blog is self hosted it should look like

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

if your blog is hosted on wordpress.com you will have to add few extra keys for reference check out [wordpress-source-docs](https://www.gatsbyjs.org/packages/gatsby-source-wordpress/).

2. Run `yarn` in directory where you cloned theme to install dependencies.

3. Run `yarn workspace example develop` to start the example locally.

## Authors
- Arun Priyadarshi ([@Gunnerforlife](https://github.com/Gunnerforlife)) – [Draftbox](https://draftbox.co)
- Keyur Raval ([@thandaanda](https://github.com/thandaanda)) – [Draftbox](https://draftbox.co)
- Shyam Lohar ([@shyamlohar](https://github.com/shyamlohar)) – [Draftbox](https://draftbox.co)
- Tanmay Desai ([@tanmaydesai89](https://github.com/tanmaydesai89)) – [Draftbox](https://draftbox.co)

## Contributions
PRs are welcome! Consider contributing to this project if you are missing feature that is also useful for others.

# Copyright & License

Copyright (c) 2020 [Draftbox](https://draftbox.co) - Released under the [MIT license](LICENSE).
