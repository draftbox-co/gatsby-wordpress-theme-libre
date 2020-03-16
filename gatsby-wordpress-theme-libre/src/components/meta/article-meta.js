import React, { useState, useEffect } from "react";
import Helmet from "react-helmet";
import { graphql, useStaticQuery } from "gatsby";
import url from "url";
import { globalHistory } from "@reach/router";

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

  console.log(url, "this is url ");

  const canonicalUrl = url.resolve(baseUrl, globalHistory.location.pathname);

  return (
    <>
      <Helmet>
        <title>{data.title}</title>
        <meta name="description" content={data.plainExcerpt} />
        <link rel="canonical" href={canonicalUrl} />
        <meta property="og:site_name" content={name} />
        <meta property="og:type" content="website" />
        <meta property="og:title" content={name} />
        <meta property="og:description" content={data.plainExcerpt} />
        <meta property="og:url" content={canonicalUrl} />
        <meta name="twitter:title" content={name} />
        <meta name="twitter:description" content={data.plainExcerpt} />
        <meta name="twitter:url" content={canonicalUrl} />
      </Helmet>
    </>
  );
};

export default ArticleMeta;
