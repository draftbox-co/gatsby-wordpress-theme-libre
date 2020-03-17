import React from "react";
import Layout from "../components/layout";
import Navbar from "../components/navbar";
import { graphql, Link } from "gatsby";
import Footer from "../components/footer";
import ArticleMeta from "../components/meta/article-meta";

const Post = ({ data }) => {
  return (
    <Layout>
      <ArticleMeta data={data.wordpressPost} />
      <div
        className="post-template-default single single-post single-format-standard wp-embed-responsive singular"
        style={{ overflowX: "hidden" }}
      >
        <div id="page" className="hfeed site">
          <a className="skip-link screen-reader-text" href="#content">
            Skip to content
          </a>
          <Navbar />
          <div id="content" className="site-content">
            <div id="primary" className="content-area">
              <main id="main" className="site-main" role="main">
                <article className="post type-post status-publish format-standard has-post-thumbnail hentry">
                  <div className="post-thumbnail">
                    <img
                      className="attachment-libre-2-post-thumbnail size-libre-2-post-thumbnail wp-post-image jetpack-lazy-image jetpack-lazy-image--handled"
                      src={
                        data.wordpressPost.jetpack_featured_media_url.localFile
                          .childImageSharp.fluid.src
                      }
                      srcSet={
                        data.wordpressPost.jetpack_featured_media_url.localFile
                          .childImageSharp.fluid.srcSet
                      }
                      alt=""
                    />
                  </div>
                  <header className="entry-header">
                    <h1
                      className="entry-title"
                      dangerouslySetInnerHTML={{
                        __html: data.wordpressPost.title
                      }}
                    ></h1>
                    <div className="entry-meta">
                      {" "}
                      <span className="posted-on">
                        Posted on{" "}
                        <time
                          className="entry-date published"
                          dateTime="2019-09-15T21:16:31+05:30"
                        >
                          {data.wordpressPost.date}
                        </time>
                        <time
                          className="updated"
                          dateTime="2019-09-15T21:25:22+05:30"
                        >
                          {data.wordpressPost.date}
                        </time>
                      </span>
                      <span className="byline">
                        {" "}
                        by{" "}
                        <span className="author vcard">
                          <Link
                            to={`/author/${data.wordpressPost.author.slug}`}
                            className="url fn n"
                          >
                            {data.wordpressPost.author.name}
                          </Link>
                        </span>
                      </span>
                    </div>
                  </header>
                  <div
                    className="entry-content"
                    dangerouslySetInnerHTML={{
                      __html: data.wordpressPost.content
                    }}
                  ></div>
                  <footer className="entry-footer">
                    {" "}
                    <span className="cat-links">
                      Posted in{" "}
                      {data.wordpressPost.categories.map(
                        (category, index, arr) => {
                          return (
                            <Link key={index} to={`/category/${category.slug}`}>
                              {category.name}
                              {index !== arr.length - 1 && ", "}
                            </Link>
                          );
                        }
                      )}
                    </span>
                  </footer>
                  <div className="entry-author">
                    <div className="author-avatar">
                      <img
                        alt=""
                        src={data.wordpressPost.author.avatar_urls.wordpress_96}
                        className="avatar avatar-100 photo jetpack-lazy-image jetpack-lazy-image--handled"
                        height={100}
                        width={100}
                      />
                    </div>
                    <div className="author-heading">
                      <h2 className="author-title">
                        Published by{" "}
                        <span className="author-name">
                          {data.wordpressPost.author.name}
                        </span>
                      </h2>
                    </div>
                    <p className="author-bio">
                      {data.wordpressPost.author.description}
                      <Link
                        className="author-link"
                        to={`/author/${data.wordpressPost.author.slug}`}
                        rel="author"
                      >
                        {" "}
                        View all posts by {data.wordpressPost.author.name}{" "}
                      </Link>
                    </p>
                  </div>
                  <nav className="navigation post-navigation" role="navigation">
                    <h2 className="screen-reader-text">Post navigation</h2>
                    <div className="nav-links">
                      {data.prev && (
                        <div className="nav-previous">
                          <Link to={`/${data.prev.slug}`} rel="prev">
                            <span className="meta-nav">Previous Post</span>{" "}
                            <span
                              dangerouslySetInnerHTML={{
                                __html: data.prev.title
                              }}
                            ></span>
                          </Link>
                        </div>
                      )}

                      {data.next && (
                        <div className="nav-next">
                          <Link to={`/${data.next.slug}`} rel="next">
                            <span className="meta-nav">Next Post</span>{" "}
                            <span
                              dangerouslySetInnerHTML={{
                                __html: data.next.title
                              }}
                            ></span>
                          </Link>
                        </div>
                      )}
                    </div>{" "}
                  </nav>
                </article>
              </main>
            </div>
            <div
              id="secondary"
              className="widget-area"
              role="complementary"
            ></div>
          </div>
          <Footer />
        </div>
      </div>
    </Layout>
  );
};

export default Post;

export const postQuery = graphql`
  query($slug: String, $prev: String, $next: String) {
    wordpressPost(slug: { eq: $slug }) {
      ...WordPressPostData
    }

    prev: wordpressPost(id: { eq: $prev }) {
      title
      slug
    }

    next: wordpressPost(id: { eq: $next }) {
      title
      slug
    }
  }
`;
