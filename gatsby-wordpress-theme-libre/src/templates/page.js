import React from "react";
import Layout from "../components/layout";
import Navbar from "../components/navbar";
import Footer from "../components/footer";

const Page = ({ data, pageContext }) => {
  return (
    <>
      <Layout>
        <div className="home blog wp-embed-responsive">
          <div id="page" className="hfeed site">
            <Navbar />
            <div id="content" className="site-content">
              <div id="primary" className="content-area">
                <main id="main" className="site-main">
                  <article className="post-109 page type-page status-publish hentry">
                    <header class="entry-header">
                      <h1 class="entry-title">{data.wordpressPage.title}</h1>{" "}
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
      slug
      title
      excerpt
      plainExcerpt
      content
    }
  }
`;
