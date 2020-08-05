import React from "react";
import Layout from "../components/layout";
import PostCard from "../components/post-card";
import Navbar from "../components/navbar";
import Footer from "../components/footer";
import WebsiteMeta from "../components/meta/website-meta";

const PostByAuthor = ({ data }) => (
  <Layout>
    <WebsiteMeta />
    <div className="home blog wp-embed-responsive">
      <div id="page" className="hfeed site">
        <Navbar />
        <div id="content" className="site-content">
          <div id="primary" className="content-area">
            <main id="main" className="site-main">
              {data.wordpressWpUsers &&
                (data.wordpressWpUsers.name ||
                  data.wordpressWpUsers.description) && (
                  <header className="page-header">
                    {data.wordpressWpUsers.name && (
                      <h1 className="page-title">
                        Author:{" "}
                        <span className="vcard">
                          {data.wordpressWpUsers.name}
                        </span>
                      </h1>
                    )}
                    {data.wordpressWpUsers.description && (
                      <div className="taxonomy-description">
                        {data.wordpressWpUsers.description}
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

export default PostByAuthor;

export const pageQuery = graphql`
  query($slug: String) {
    wordpressWpUsers(slug: { eq: $slug }) {
      name
      description
    }
    allWordpressPost(filter: { author: { slug: { eq: $slug } } }) {
      edges {
        node {
          ...WordPressPostData
        }
      }
    }
  }
`;
