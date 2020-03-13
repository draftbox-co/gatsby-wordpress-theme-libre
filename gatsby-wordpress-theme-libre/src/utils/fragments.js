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
export const wordPressPostsData = graphql`
  fragment WordPressPostsData on wordpress__POSTConnection {
    edges {
      node {
        title
        excerpt
        slug
        categories {
          name
          slug
        }
        jetpack_featured_media_url {
          localFile {
            childImageSharp {
              fluid {
                srcSet
                src
              }
            }
          }
        }
        author {
          name
          slug
        }
        date(formatString: "MMMM DD YYYY")
      }
    }
  }
`;
