import React from "react";
import Helmet from "react-helmet";
import { graphql, useStaticQuery } from "gatsby";
import url from "url";
import { globalHistory } from "@reach/router";
import capitalize from "../../utils/capitalizeString";

const ArticleMeta = ({ data, amp }) => {
  const queryData = useStaticQuery(graphql`
    query {
      wpSiteMetaData {
        ...WordpressSiteMetaData
      }
      site {
        siteMetadata {
          siteUrl
        }
      }
    }
  `);
  const {
    wpSiteMetaData: { name }
  } = queryData;
  const baseUrl = queryData.site.siteMetadata.siteUrl;
  const canonicalUrl = url.resolve(baseUrl, globalHistory.location.pathname);

  const feature_image = data.featured_media && data.featured_media.localFile;

  return (
    <>
      <Helmet htmlAttributes={{"lang": "en"}}>
        <title>{`${name} | ${capitalize(data.title)}`}</title>
        {!amp && <link rel="ampHtml" href={`${canonicalUrl}/amp`} />}
        <meta name="description" content={data.plainExcerpt} />
        {!amp && <link rel="canonical" href={canonicalUrl} />}
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
