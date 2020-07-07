import React from "react";
import Layout from "../components/layout";
import Navbar from "../components/navbar";
import Footer from "../components/footer";
import ArticleMeta from "../components/meta/article-meta";

const Page = ({ data, location }) => {
  return (
    <>
      <Layout>
        <ArticleMeta data={data.wordpressPage} amp={false} location={location} />
        <div className="home blog wp-embed-responsive">
          <div id="page" className="hfeed site">
            <Navbar />
            <div id="content" className="site-content">
              <div id="primary" className="content-area">
                <main id="main" className="site-main">
                  <article className="post-109 page type-page status-publish hentry">
                    <header className="entry-header">
                      <h1 className="entry-title" dangerouslySetInnerHTML={{__html: data.wordpressPage.title}}>
                      </h1>{" "}
                    </header>
                    <div
                      className="entry-content"
                      dangerouslySetInnerHTML={{
                        __html: data.wordpressPage.content
                      }}
                    ></div>
                  </article>
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

export default Page;

export const pageQuery = graphql`
  query($slug: String!) {
    wordpressPage(slug: { eq: $slug }) {
      ...wordpressPageData
    }
  }
`;
