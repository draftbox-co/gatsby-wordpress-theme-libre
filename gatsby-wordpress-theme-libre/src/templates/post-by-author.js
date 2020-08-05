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
              <header className="page-header">
				        <h1 className="page-title">Author: 
                  <span className="vcard">{" "}Team Draftbox</span>
                </h1>
                <div className="taxonomy-description">Lightning fast, secure front-end for your WordPress or Ghost blog,  without coding.
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

export default PostByAuthor;

export const pageQuery = graphql`
  query($slug: String) {
    allWordpressPost(filter: { author: { slug: { eq: $slug } } }) {
      edges {
        node {
          ...WordPressPostData
        }
      }
    }
  }
`;
