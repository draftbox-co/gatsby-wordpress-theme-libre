import React from "react";
import Layout from "../components/layout";
import Navbar from "../components/navbar";
import PostCard from "../components/post-card";
import Pagination from "../components/pagination";
import Footer from "../components/footer";
import WebsiteMeta from "../components/meta/website-meta";
import propTypes from 'prop-types';

const Index = ({ data, pageContext }) => {
  return (
    <>
      <Layout>
        <WebsiteMeta/>
        <div className="home blog wp-embed-responsive">
          <div id="page" className="hfeed site">
            <Navbar />
            <div id="content" className="site-content">
              <div id="primary" className="content-area">
                <main id="main" className="site-main">
                  {data.allWordpressPost.edges.map(({ node }, index) => (
                    <PostCard key={index} node={node} />
                  ))}
                  <Pagination pageContext={pageContext} />
                </main>
              </div>
            </div>
            <Footer />
          </div>
        </div>
      </Layout>
    </>
  );
};

Index.propTypes = {
  location: propTypes.object.is
}

export default Index;

export const pageQuery = graphql`
  query WordpressQuery($skip: Int!, $limit: Int!) {
    allWordpressPost(
      sort: { fields: date, order: DESC }
      skip: $skip
      limit: $limit
    ) {
      edges {
        node {
          ...WordPressPostData
        }
      }
    }
  }
`;
