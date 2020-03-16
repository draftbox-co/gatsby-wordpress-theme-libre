import React from "react";
import Helmet from "react-helmet";
import { graphql, useStaticQuery } from "gatsby";
import url from "url";
import { globalHistory } from "@reach/router";
import capitalize from "../../utils/capitalizeString";

const ArticleMeta = ({ data }) => {
  const {
    wordpressSiteMetadata: { name, url: baseUrl }
  } = useStaticQuery(graphql`
    query {
      wordpressSiteMetadata {
        ...WordpressSiteMetaData
      }
    }
  `);

  const canonicalUrl = url.resolve(baseUrl, globalHistory.location.pathname);

  const feature_image =
    data.jetpack_featured_media_url &&
    data.jetpack_featured_media_url.localFile;

  console.log(feature_image, "feature image is here ");

  return (
    <>
      <Helmet>
        <title>{`${name} | ${capitalize(data.title)}`}</title>
        <meta name="description" content={data.plainExcerpt} />
        <link rel="canonical" href={canonicalUrl} />
        <meta property="og:site_name" content={name} />
        <meta property="og:type" content="website" />
        <meta
          property="og:title"
          content={`${name} | ${capitalize(data.title)}`}
        />
        <meta property="og:description" content={data.plainExcerpt} />
        <meta property="og:url" content={canonicalUrl} />
        {feature_image && (
          <meta
            property="og:image"
            content={feature_image.childImageSharp.fluid.src}
          />
        )}
        <meta
          name="twitter:title"
          content={`${name} | ${capitalize(data.title)}`}
        />
        <meta name="twitter:description" content={data.plainExcerpt} />
        <meta name="twitter:url" content={canonicalUrl} />
        {feature_image && (
          <meta name="twitter:card" content="summary_large_image" />
        )}
        {feature_image && (
          <meta
            name="twitter:image"
            content={feature_image.childImageSharp.fluid.src}
          />
        )}
      </Helmet>
    </>
  );
};

export default ArticleMeta;
