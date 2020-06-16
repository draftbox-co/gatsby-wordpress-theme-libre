import React from "react";
import { Link } from "gatsby";

const PostCard = ({ index, node }) => {
  return (
    <article
      key={index}
      className={
        "post type-post status-publish format-standard hentry " +
        (node.featured_media && node.featured_media.localFile
          ? "featured_media"
          : "")
      }
    >
      <header className="entry-header">
        <h2 className="entry-title">
          <Link
            to={`/${node.slug}`}
            dangerouslySetInnerHTML={{ __html: node.title }}
          ></Link>
        </h2>
        <div className="entry-meta">
          {node.sticky && <div>
            <span className="posted-on">Featured</span> &bull;{" "}
            <span className="readTime">{node.readingTime}</span>
          </div>}

          {!node.sticky && <div>
            <span className="posted-on">{node.date}</span> &bull;{" "}
            <span className="readTime">{node.readingTime}</span>
          </div>}
          
          <span className="byline">
            <div className="author vcard">
              <Link to={`/author/${node.author.slug}`} className="url fn n">
                {node.author.name}
              </Link>
            </div>
          </span>
        </div>
      </header>
      <div className="entry-content">
        {node.featured_media && node.featured_media.localFile && (
          <div className="post-thumbnail">
            <Link
              aria-hidden="true"
              aria-label={node.featured_media.title}
              title={node.featured_media.title}
              to={`/${node.slug}`}
              className="no-line"
            >
              {node.featured_media.localFile.childImageSharp &&
                node.featured_media.localFile.childImageSharp.fluid && (
                  <img
                    width="1088"
                    height="726"
                    src={
                      node.featured_media.localFile.childImageSharp.fluid.src
                    }
                    className="attachment-libre-2-post-thumbnail size-libre-2-post-thumbnail wp-post-image jetpack-lazy-image jetpack-lazy-image--handled"
                    alt={node.featured_media.title}
                    srcSet={
                      node.featured_media.localFile.childImageSharp.fluid.srcSet
                    }
                    data-lazy-loaded="1"
                    sizes="(max-width: 1088px) 100vw, 1088px"
                  />
                )}
              {!node.featured_media.localFile.childImageSharp && (
                <img
                  width="1088"
                  height="726"
                  src={node.featured_media.localFile.publicURL}
                  className="attachment-libre-2-post-thumbnail size-libre-2-post-thumbnail wp-post-image jetpack-lazy-image jetpack-lazy-image--handled"
                  alt={node.featured_media.title}
                  data-lazy-loaded="1"
                  sizes="(max-width: 1088px) 100vw, 1088px"
                />
              )}
            </Link>
          </div>
        )}
        <p dangerouslySetInnerHTML={{ __html: node.plainExcerpt }}></p>
      </div>
      <footer className="entry-footer">
        {node.tags && node.tags.length > 0 && (
          <span className="cat-links">
            Posted in{" "}
            {node.tags.map((tag, index, arr) => {
              return (
                <Link to={`/tag/${tag.slug}`} key={index} rel="tag">
                  {tag.name} {index !== arr.length - 1 && ", "}
                </Link>
              );
            })}
          </span>
        )}
      </footer>
    </article>
  );
};

export default PostCard;
