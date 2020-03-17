import React from "react";
import Layout from "../components/layout";
import PostCard from "../components/post-card";
import Navbar from "../components/navbar";
import Footer from "../components/footer";
import WebsiteMeta from "../components/meta/website-meta";

const PostByCategory = ({ data, pageContext }) => (
  <Layout>
    <WebsiteMeta />
    <div className="home blog wp-embed-responsive">
      <div id="page" className="hfeed site">
        <Navbar />
        <div id="content" className="site-content">
          <div id="primary" className="content-area">
            <main id="main" className="site-main">
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

export default PostByCategory;

export const pageQuery = graphql`
  query($slug: String) {
    allWordpressPost(
      filter: { categories: { elemMatch: { slug: { eq: $slug } } } }
    ) {
      edges {
        node {
          ...WordPressPostData
        }
      }
    }
  }
`;
