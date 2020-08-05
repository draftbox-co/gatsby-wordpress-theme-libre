import React, { useState, useEffect } from "react";
import Layout from "../components/layout";
import Navbar from "../components/navbar";
import Footer from "../components/footer";
import ArticleMeta from "../components/meta/article-meta";
import facebookShare from "../images/facebook-share.svg";
import twitterShare from "../images/twitter-share.svg";
import linkedInShare from "../images/linkedin.svg";
import mailShare from "../images/mail.svg";
import CopyLink from "../components/copy-link";
import SubscribeForm from "../components/subscribe-form";
import { graphql, Link } from "gatsby";
import pinterestShare from "../images/pinterest.svg";
import whatsAppShare from "../images/whatsapp-new.svg";

const Page = ({ data, location, pageContext }) => {
  const [href, sethref] = useState("");
  const [origin, setOrigin] = useState("");

  useEffect(() => {
    if (typeof window !== "undefined") {
      sethref(window.location.href);
      setOrigin(window.location.origin);
    }
  }, []);
  const twitterShareUrl = `https://twitter.com/share?text=${data.wordpressPage.plainTitle}&url=${href}`;

  const facebookShareUrl = `https://www.facebook.com/sharer/sharer.php?u=${href}`;

  const linkedInShareUrl = `https://www.linkedin.com/shareArticle?mini=true&url=${href}&title=${data.wordpressPage.plainTitle}`;

  const mailShareUrl = `mailto:?subject=${data.wordpressPage.plainTitle}&body=${href}`;

  let pinterestShareUrl = `https://www.pinterest.com/pin/create/button/?url=${href}&description=${data.wordpressPage.plainTitle}`;

  if (
    data.wordpressPage.featured_media &&
    data.wordpressPage.featured_media.localFile &&
    data.wordpressPage.featured_media.localFile.publicURL
  ) {
    pinterestShareUrl += `&media=${
      origin + data.wordpressPage.featured_media.localFile.publicURL
    }`;
  }

  const whatsAppShareUrl = `https://wa.me/?text=${encodeURIComponent(
    data.wordpressPage.plainTitle + "\n" + href
  )}`;

  return (
    <>
      <Layout>
        <ArticleMeta
          data={data.wordpressPage}
          amp={false}
          location={location}
        />
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
                    {data.wordpressPage.featured_media &&
                      data.wordpressPage.featured_media.localFile && (
                        <div className="post-thumbnail">
                          {data.wordpressPage.featured_media.localFile
                            .childImageSharp &&
                            data.wordpressPage.featured_media.localFile
                              .childImageSharp.fluid && (
                              <img
                                className="attachment-libre-2-post-thumbnail size-libre-2-post-thumbnail wp-post-image jetpack-lazy-image jetpack-lazy-image--handled"
                                src={
                                  data.wordpressPage.featured_media.localFile
                                    .childImageSharp.fluid.src
                                }
                                srcSet={
                                  data.wordpressPage.featured_media.localFile
                                    .childImageSharp.fluid.srcSet
                                }
                                alt={
                                  data.wordpressPage.featured_media.alt_text
                                    ? data.wordpressPage.featured_media.alt_text
                                    : data.wordpressPage.featured_media.title
                                }
                              />
                            )}
                          {!data.wordpressPage.featured_media.localFile
                            .childImageSharp && (
                            <img
                              className="attachment-libre-2-post-thumbnail size-libre-2-post-thumbnail wp-post-image jetpack-lazy-image jetpack-lazy-image--handled"
                              src={
                                data.wordpressPage.featured_media.localFile
                                  .publicURL
                              }
                              alt={
                                data.wordpressPage.featured_media.alt_text
                                  ? data.wordpressPage.featured_media.alt_text
                                  : data.wordpressPage.featured_media.title
                              }
                            />
                          )}
                        </div>
                      )}
                    <header className="entry-header">
                      <h1
                        className="entry-title"
                        dangerouslySetInnerHTML={{
                          __html: data.wordpressPage.title,
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
                            {data.wordpressPage.date}
                          </time>
                          <time
                            className="updated"
                            dateTime="2019-09-15T21:25:22+05:30"
                          >
                            {data.wordpressPage.date}
                          </time>
                        </span>
                        <span className="byline">
                          {" "}
                          by{" "}
                          <span className="author vcard">
                            <Link
                              to={`/author/${data.wordpressPage.author.slug}`}
                              className="url fn n"
                            >
                              {data.wordpressPage.author.name}
                            </Link>
                          </span>
                        </span>{" "}
                        &bull; {data.wordpressPage.readingTime}
                      </div>
                    </header>
                    <div
                      className="entry-content"
                      dangerouslySetInnerHTML={{
                        __html: data.wordpressPage.content,
                      }}
                    ></div>
                    <footer className="entry-footer">
                      {" "}
                      {data.wordpressPage.tags && (
                        <span className="cat-links">
                          Posted in{" "}
                          {data.wordpressPage.tags.map((tag, index, arr) => {
                            return (
                              <Link key={index} to={`/tag/${tag.slug}`}>
                                {tag.name}
                                {index !== arr.length - 1 && ", "}
                              </Link>
                            );
                          })}
                        </span>
                      )}
                    </footer>
                    <div className="social-share social-icons-container flex items-center max-w-3xl mt-8 mx-4 lg:mx-auto">
                      <span className="social-share-label">Share:</span>
                      <div className="social-icons">
                        <ul className="flex">
                          <li>
                            <a
                              href={facebookShareUrl}
                              target="_blank"
                              rel="noopener noreferrer"
                            >
                              <img
                                className="h-4"
                                src={facebookShare}
                                alt="Facebook Share"
                              />
                            </a>
                          </li>
                          <li>
                            <a
                              href={twitterShareUrl}
                              target="_blank"
                              rel="noopener noreferrer"
                            >
                              <img
                                className="h-4"
                                src={twitterShare}
                                alt="Twitter Share"
                              />
                            </a>
                          </li>
                          <li>
                            <a
                              href={linkedInShareUrl}
                              target="_blank"
                              rel="noopener noreferrer"
                            >
                              <img
                                className="h-4"
                                src={linkedInShare}
                                alt="LinkedIn Share"
                              />
                            </a>
                          </li>
                          <li>
                            <a
                              href={pinterestShareUrl}
                              target="_blank"
                              rel="noopener noreferrer"
                            >
                              <img
                                className="h-4"
                                src={pinterestShare}
                                alt="Pinterest Share"
                              />
                            </a>
                          </li>
                          <li>
                            <a
                              href={whatsAppShareUrl}
                              target="_blank"
                              rel="noopener noreferrer"
                            >
                              <img
                                className="h-4"
                                src={whatsAppShare}
                                alt="WhatsApp Share"
                              />
                            </a>
                          </li>
                          <li>
                            <a
                              href={mailShareUrl}
                              target="_blank"
                              rel="noopener noreferrer"
                            >
                              <img
                                className="h-4"
                                src={mailShare}
                                alt="Share via Mail"
                              />
                            </a>
                          </li>
                          <li>
                            <CopyLink textToCopy={href} />
                          </li>
                        </ul>
                      </div>
                    </div>
                    <hr />
                  </article>
                  <SubscribeForm />
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
