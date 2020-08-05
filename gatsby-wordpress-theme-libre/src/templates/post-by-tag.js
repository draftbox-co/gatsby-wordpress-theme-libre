import React from "react";
import Layout from "../components/layout";
import PostCard from "../components/post-card";
import Navbar from "../components/navbar";
import Footer from "../components/footer";
import WebsiteMeta from "../components/meta/website-meta";

const PostByTag = ({ data, pageContext }) => (
  <Layout>
    <WebsiteMeta />
    <div className="home blog wp-embed-responsive">
      <div id="page" className="hfeed site">
        <Navbar />
        <div id="content" className="site-content">
          <div id="primary" className="content-area">
            <main id="main" className="site-main">
              {data.wordpressTag &&
                (data.wordpressTag.name || data.wordpressTag.description) && (
                  <header className="page-header">
                    {data.wordpressTag.name && (
                      <h1 className="page-title">
                        Tag:
                        <span className="vcard"> {data.wordpressTag.name}</span>
                      </h1>
                    )}
                    {data.wordpressTag.description && (
                      <div className="taxonomy-description">
                        <p>{data.wordpressTag.description}</p>
                      </div>
                    )}
                  </header>
                )}
              {data.allWordpressPost.edges.map(({ node }, index) => (
                <PostCard key={index} node={node} />
              ))}
            </main>
          </div>
        </div>
        <Footer />
      </div>
    </div>
  </Layout>
);

export default PostByTag;

export const pageQuery = graphql`
  query($slug: String) {
    wordpressTag(slug: { eq: $slug }) {
      name
      description
    }
    allWordpressPost(
      filter: { tags_custom: { elemMatch: { slug: { eq: $slug } } } }
    ) {
      edges {
        node {
          ...WordPressPostData
        }
      }
    }
  }
`;
