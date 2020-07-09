import React from "react";
import Helmet from "react-helmet";
import { graphql, useStaticQuery } from "gatsby";
import url from "url";
import _ from "lodash";

const capitalize = (str) => {
  if (str) {
    return str.charAt(0).toUpperCase() + str.slice(1);
  } else {
    return "";
  }
};

const ArticleMeta = ({ data, amp, location }) => {
  const queryData = useStaticQuery(graphql`
    query {
      site {
        siteMetadata {
          siteUrl
          siteTitle
          metadata {
            title
            description
          }
          twitterCard {
            title
            description
            imageUrl
            username
          }
          facebookCard {
            title
            description
            imageUrl
            appId
          }
          siteDescription
          language
          logoUrl
          iconUrl
          coverUrl
          alternateLogoUrl
          shareImageWidth
          shareImageHeight
        }
      }
    }
  `);
  const baseUrl = queryData.site.siteMetadata.siteUrl;
  const canonicalUrl = url.resolve(baseUrl, location.pathname);

  const feature_image = data.featured_media?.localFile?.seo?.fixed.src;

  const config = queryData.site.siteMetadata;

  const facebookImageUrl = feature_image
    ? url.resolve(config.siteUrl, feature_image)
    : config.facebookCard.imageUrl
    ? url.resolve(config.siteUrl, config.facebookCard.imageUrl)
    : config.coverUrl
    ? url.resolve(config.siteUrl, config.coverUrl)
    : null;

  const twitterImageUrl = feature_image
    ? url.resolve(config.siteUrl, feature_image)
    : config.twitterCard.imageUrl
    ? url.resolve(config.siteUrl, config.twitterCard.imageUrl)
    : config.coverUrl
    ? url.resolve(config.siteUrl, config.coverUrl)
    : null;

  const author = data.author;
  const publicTags = _.map(data.tags, (tag) => tag.name);
  const primaryTag = publicTags[0] || ``;
  const shareImage = feature_image
    ? url.resolve(config.siteUrl, feature_image)
    : config.coverUrl ||
      config.facebookCard.imageUrl ||
      config.twitterCard.imageUrl
    ? url.resolve(
        config.siteUrl,
        config.coverUrl ||
          config.facebookCard.imageUrl ||
          config.twitterCard.imageUrl
      )
    : null;
  const publisherLogo =
    config.logoUrl || config.alternateLogoUrl
      ? url.resolve(config.siteUrl, config.logoUrl || config.alternateLogoUrl)
      : null;

  const jsonLd = {
    "@context": `https://schema.org/`,
    "@type": `Article`,
    author: author
      ? {
          "@type": `Person`,
          name: author.name,
          image: undefined,
          sameAs: undefined,
        }
      : null,
    keywords: publicTags.length ? publicTags.join(`, `) : undefined,
    headline: data.plainTitle || config.siteTitle,
    url: canonicalUrl,
    datePublished: data.date,
    dateModified: data.modified,
    image: shareImage
      ? {
          "@type": `ImageObject`,
          url: shareImage,
          width: config.shareImageWidth,
          height: config.shareImageHeight,
        }
      : undefined,
    publisher: {
      "@type": `Organization`,
      name: config.siteTitle,
      logo: publisherLogo
        ? {
            "@type": `ImageObject`,
            url: publisherLogo,
            width: 60,
            height: 60,
          }
        : undefined,
    },
    description: data.plainExcerpt || config.siteDescription,
    mainEntityOfPage: {
      "@type": `WebPage`,
      "@id": config.siteUrl,
    },
  };

  return (
    <>
      <Helmet htmlAttributes={{ lang: queryData.site.siteMetadata.language }}>
        <title>{capitalize(data.plainTitle)}</title>
        {!amp && <link rel="ampHtml" href={`${canonicalUrl}/amp`} />}
        <meta name="description" content={data.plainExcerpt} />
        {!amp && <link rel="canonical" href={canonicalUrl} />}

        <meta property="og:site_name" content={config.siteTitle} />
        <meta property="og:type" content="article" />
        <meta
          property="og:title"
          content={data.plainTitle || config.siteTitle}
        />
        <meta
          property="og:description"
          content={data.plainExcerpt || config.siteDescription}
        />
        <meta property="og:url" content={canonicalUrl} />
        <meta
          property="article:published_time"
          content={new Date(data.date).toISOString()}
        />
        <meta
          property="article:modified_time"
          content={new Date(data.modified).toISOString()}
        />
        {publicTags.map((keyword, i) => (
          <meta property="article:tag" content={keyword} key={i} />
        ))}

        {author && <meta property="article:author" content={author.name} />}

        <meta
          name="twitter:title"
          content={data.plainTitle || config.siteTitle}
        />
        <meta
          name="twitter:description"
          content={data.plainExcerpt || config.siteDescription}
        />
        <meta name="twitter:url" content={canonicalUrl} />
        {author && <meta name="twitter:label1" content="Written by" />}
        {author && <meta name="twitter:data1" content={author.name} />}
        {primaryTag && <meta name="twitter:label2" content="Filed under" />}
        {primaryTag && <meta name="twitter:data2" content={primaryTag} />}

        {twitterImageUrl && (
          <meta name="twitter:card" content="summary_large_image" />
        )}
        {twitterImageUrl && (
          <meta name="twitter:image" content={twitterImageUrl} />
        )}
        {facebookImageUrl && (
          <meta property="og:image" content={facebookImageUrl} />
        )}
        {config.twitterCard.username && (
          <meta name="twitter:site" content={config.twitterCard.username} />
        )}
        {config.facebookCard.appId !== "" && (
          <meta property="fb:app_id" content={config.facebookCard.appId} />
        )}
        <script type="application/ld+json">
          {JSON.stringify(jsonLd, undefined, 4)}
        </script>
      </Helmet>
    </>
  );
};

export default ArticleMeta;
