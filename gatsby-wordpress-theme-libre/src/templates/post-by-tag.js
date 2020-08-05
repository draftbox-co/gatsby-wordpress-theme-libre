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
              <header class="page-header">
				        <h1 class="page-title">Tag: 
                  <span className="vcard">{" "}Benefits</span>
                </h1>
                <div class="taxonomy-description">
                  <p>Benefits of using Draftbox for your existing WordPress or Ghost blog.</p>
                </div>
              </header>
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
