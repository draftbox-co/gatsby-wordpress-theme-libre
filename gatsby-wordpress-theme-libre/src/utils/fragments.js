import { graphql } from "gatsby";

/**
 * These so called fragments are the fields we query on each template.
 * A fragment make queries a bit more reuseable, so instead of typing and
 * remembering every possible field, you can just use
 *   ...WordPressPostsData
 * for example to load all post fields into your GraphQL query.
 *
 * Further info 👉🏼 https://www.gatsbyjs.org/docs/graphql-reference/#fragments
 *
 */

// Used for site config
export const wordPressPostData = graphql`
  fragment WordPressPostData on wordpress__POST {
    title
    content
    excerpt
    plainExcerpt
    slug
    categories {
      name
      slug
    }
    featured_media {
      localFile {
        childImageSharp {
          fluid {
            srcSet
            src
          }
        }
      }
      title
    }
    author {
      name
      slug
      avatar_urls {
        wordpress_96
      }
      description
    }
    date(formatString: "MMMM DD YYYY")
    readingTime
    tags {
      name
      slug
    }
    plainTitle
  }
`;

export const wordpressSiteMetaData = graphql`
  fragment WordpressSiteMetaData on WPSiteMetaData {
    name: siteName
    description: siteDescription
  }
`;

export const wordpressPageData = graphql`
  fragment wordpressPageData on wordpress__PAGE {
    slug
    title
    excerpt
    plainExcerpt
    content
    plainTitle
  }
`;
