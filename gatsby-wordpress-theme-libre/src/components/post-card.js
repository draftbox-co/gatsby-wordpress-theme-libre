import React from "react";
import { Link } from "gatsby";

const PostCard = ({ index, node }) => {
  return (
    <article
      key={index}
      className={
        "post type-post status-publish format-standard hentry " +
        (node.jetpack_featured_media_url.localFile
          ? "jetpack_featured_media_url"
          : "")
      }
    >
      <header className="entry-header">
        <h2 className="entry-title">
          <Link
            to={node.slug}
            dangerouslySetInnerHTML={{ __html: node.title }}
          ></Link>
        </h2>
        <div className="entry-meta">
          <span className="posted-on">{node.date}</span>
          <span className="byline">
            <div className="author vcard">
              <Link to={`author/${node.author.slug}`} className="url fn n">
                {node.author.name}
              </Link>
            </div>
          </span>
        </div>
      </header>
      <div className="entry-content">
        {node.jetpack_featured_media_url.localFile && (
          <div className="post-thumbnail">
            <Link to={node.slug} className="no-line">
              <img
                width="1088"
                height="726"
                src={
                  node.jetpack_featured_media_url.localFile.childImageSharp
                    .fluid.src
                }
                className="attachment-libre-2-post-thumbnail size-libre-2-post-thumbnail wp-post-image jetpack-lazy-image jetpack-lazy-image--handled"
                alt=""
                srcSet={
                  node.jetpack_featured_media_url.localFile.childImageSharp
                    .fluid.srcSet
                }
                data-lazy-loaded="1"
                sizes="(max-width: 1088px) 100vw, 1088px"
              />
            </Link>
          </div>
        )}
        <p dangerouslySetInnerHTML={{ __html: node.excerpt }}></p>
      </div>
      <footer className="entry-footer">
        <span className="cat-links">
          Posted in{" "}
          {node.categories.map((category, index, arr) => {
            return (
              <Link
                to={`category/${category.slug}`}
                key={index}
                rel="category tag"
              >
                {category.name} {index !== arr.length - 1 && ", "}
              </Link>
            );
          })}
        </span>
      </footer>
    </article>
  );
};

export default PostCard;
