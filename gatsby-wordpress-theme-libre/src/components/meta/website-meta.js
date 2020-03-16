import React, { useState, useEffect } from "react";
import Helmet from "react-helmet";
import { graphql, useStaticQuery } from "gatsby";
import url from "url";
import { globalHistory } from "@reach/router";

const WebsiteMeta = () => {
  const {
    wordpressSiteMetadata: { name, description, url: baseUrl }
  } = useStaticQuery(graphql`
    query {
      wordpressSiteMetadata {
        ...WordpressSiteMetaData
      }
    }
  `);

  const canonicalUrl = url.resolve(baseUrl, globalHistory.location.pathname);

  return (
    <>
      <Helmet>
        <title>{name}</title>
        <meta name="description" content={description} />
        <link rel="canonical" href={canonicalUrl} />
        <meta property="og:site_name" content={name} />
        <meta property="og:type" content="website" />
        <meta property="og:title" content={name} />
        <meta property="og:description" content={description} />
        <meta property="og:url" content={canonicalUrl} />
        <meta name="twitter:title" content={name} />
        <meta name="twitter:description" content={description} />
        <meta name="twitter:url" content={canonicalUrl} />
      </Helmet>
    </>
  );
};

export default WebsiteMeta;
