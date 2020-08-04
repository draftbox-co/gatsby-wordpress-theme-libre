const { createRemoteFileNode } = require(`gatsby-source-filesystem`);
const fetch = require("node-fetch");
const FormData = require("form-data");
const currentTimeTag = new Date().getTime();
const createTag = {
  wordpress_id: currentTimeTag,
  count: 0,
  description: currentTimeTag,
  link: `https://wordpress.theasdfghjkl.com/tag/${currentTimeTag}/`,
  name: currentTimeTag.toString(),
  slug: currentTimeTag.toString(),
  meta: [],
  _links: {
    self: [
      {
        href: `https://wordpress.theasdfghjkl.com/wp-json/wp/v2/tags/${currentTimeTag}`,
      },
    ],
    collection: [
      {
        href: "https://wordpress.theasdfghjkl.com/wp-json/wp/v2/tags",
      },
    ],
    about: [
      {
        href:
          "https://wordpress.theasdfghjkl.com/wp-json/wp/v2/taxonomies/post_tag",
      },
    ],
    wp_post_type: [
      {
        href: `https://wordpress.theasdfghjkl.com/wp-json/wp/v2/posts?tags=${currentTimeTag}`,
      },
    ],
    curies: [
      {
        name: "wp",
        href: "https://api.w.org/{rel}",
        templated: true,
      },
    ],
  },
  id: currentTimeTag.toString(),
  taxonomy___NODE: currentTimeTag.toString(),
  path: `/tag/${currentTimeTag}/`,
};

const currentTimeImage = new Date().getTime();
const createImage = {
  wordpress_id: `wordpress-media-placeholder`,
  date: new Date().toISOString(),
  guid:
    "https://wordpress.theasdfghjkl.com/wp-content/uploads/2020/05/wordpress-balsa.png",
  modified: new Date().toISOString(),
  slug: "wordpress-balsa",
  status: "inherit",
  type: "attachment",
  link: "https://wordpress.theasdfghjkl.com/wordpress-balsa/",
  title: "wordpress-balsa",
  comment_status: "open",
  ping_status: "closed",
  template: "",
  meta: [],
  description:
    '<p class="attachment"><a href=\'https://wordpress.theasdfghjkl.com/wp-content/uploads/2020/05/wordpress-balsa.png\'><img width="300" height="228" src="https://wordpress.theasdfghjkl.com/wp-content/uploads/2020/05/wordpress-balsa-300x228.png" class="attachment-medium size-medium" alt="" srcset="https://wordpress.theasdfghjkl.com/wp-content/uploads/2020/05/wordpress-balsa-300x228.png 300w, https://wordpress.theasdfghjkl.com/wp-content/uploads/2020/05/wordpress-balsa-1024x777.png 1024w, https://wordpress.theasdfghjkl.com/wp-content/uploads/2020/05/wordpress-balsa-768x583.png 768w, https://wordpress.theasdfghjkl.com/wp-content/uploads/2020/05/wordpress-balsa.png 1127w" sizes="(max-width: 300px) 100vw, 300px" /></a></p>\n',
  caption: "",
  alt_text: "",
  media_type: "image",
  mime_type: "image/png",
  media_details: {
    width: 1127,
    height: 855,
    file: "2020/05/wordpress-balsa.png",
    image_meta: {
      aperture: "0",
      credit: "",
      camera: "",
      caption: "",
      created_timestamp: "0",
      copyright: "",
      focal_length: "0",
      iso: "0",
      shutter_speed: "0",
      title: "",
      orientation: "0",
      keywords: [],
    },
  },
  post: null,
  source_url:
    "https://draftbox-dev.s3.amazonaws.com/assets/wordpress-balsa.png",
  _links: {
    self: [
      {
        href: `https://wordpress.theasdfghjkl.com/wp-json/wp/v2/media/${currentTimeImage}`,
      },
    ],
    collection: [
      {
        href: "https://wordpress.theasdfghjkl.com/wp-json/wp/v2/media",
      },
    ],
    about: [
      {
        href:
          "https://wordpress.theasdfghjkl.com/wp-json/wp/v2/types/attachment",
      },
    ],
    author: [
      {
        embeddable: true,
        href: "https://wordpress.theasdfghjkl.com/wp-json/wp/v2/users/1",
      },
    ],
    replies: [
      {
        embeddable: true,
        href: `https://wordpress.theasdfghjkl.com/wp-json/wp/v2/comments?post=${currentTimeImage}`,
      },
    ],
  },
  id: `wordpress-media-placeholder`,
  author___NODE: `wordpress-media-placeholder`,
  path: "/wordpress-balsa/",
};

module.exports = async function sourceNodes(
  {
    actions,
    getNodesByType,
    getNodes,
    store,
    cache,
    createNodeId,
    createContentDigest,
    getCache,
    reporter,
  },
  { wordpressConfig }
) {
  const { createNode, deleteNode } = actions;

  let url;

  let accessToken;

  let remoteWordPressTagCount;
  let remoteWordPressMediaCount;

  if (wordpressConfig.hostingWPCOM) {
    url = `https://public-api.wordpress.com/wp/v2/sites/${wordpressConfig.baseUrl}`;
    accessToken = await getWPCOMAccessToken(wordpressConfig.auth);
  } else {
    url = `https://${wordpressConfig.baseUrl}/wp-json/wp/v2`;
  }

  remoteWordPressMediaCount = await getWordPressEntityCount(
    `${url}/media`,
    accessToken
  );
  remoteWordPressTagCount = await getWordPressEntityCount(
    `${url}/tags`,
    accessToken
  );

  const wordPressTags = getNodesByType("wordpress__TAG");

  const originalTagSourceExists = wordPressTags.filter(
    (wordPressTag) => wordPressTag.internal.owner === "gatsby-source-wordpress"
  );

  if (remoteWordPressTagCount == 0 || !originalTagSourceExists) {
    let node = {
      ...createTag,
      children: [],
      parent: null,
      internal: {
        type: "wordpress__TAG",
        contentDigest: createContentDigest(createTag),
      },
    };
    createNode(node);
  }

  const wordpressMedias = getNodesByType("wordpress__wp_media");

  const originalMediaSourceExists = wordpressMedias.filter(
    (wordpressMedia) =>
      wordpressMedia.internal.owner === "gatsby-source-wordpress"
  );

  if (remoteWordPressMediaCount == 0 || !originalMediaSourceExists) {
    const encodedSourceUrl = encodeURI(createImage.source_url);
    const mediaDataCacheKey = `wordpress-media-placeholder`;

    try {
      const cachedFileNode = await cache.get(mediaDataCacheKey);

      if (cachedFileNode) {
        createImage.localFile___NODE = cachedFileNode.fileNodeID;
      } else {
        const fileNode = await createRemoteFileNode({
          url: encodedSourceUrl,
          store,
          cache,
          createNode,
          createNodeId,
          getCache,
          parentNodeId: createImage.id,
          reporter,
        });

        if (fileNode) {
          fileNodeID = fileNode.id;
          await cache.set(mediaDataCacheKey, {
            fileNodeID,
            modified: createImage.modified,
          });
          createImage.localFile___NODE = fileNodeID;
        }
      }

      let node = {
        ...createImage,
        children: [],
        parent: null,
        internal: {
          type: "wordpress__wp_media",
          contentDigest: createContentDigest(createImage),
        },
      };

      createNode(node);
    } catch (e) {
      console.log(e, "error creating remote node");
      // Ignore
    }
  }
};

async function getWPCOMAccessToken(_auth) {
  let result;
  const oauthUrl = `https://public-api.wordpress.com/oauth2/token`;

  try {
    const form = new FormData();
    form.append("client_id", _auth.wpcom_app_clientId);
    form.append("client_secret", _auth.wpcom_app_clientSecret);
    form.append("username", _auth.wpcom_user);
    form.append("password", _auth.wpcom_pass);
    form.append("grant_type", `password`);

    const response = await fetch(oauthUrl, { method: "POST", body: form });
    result = await response.json();
    result = result.access_token;
  } catch (e) {
    console.log(e);
  }

  return result;
}

async function getWordPressEntityCount(url, accessToken) {
  const getOptions = () => {
    let o = {
      method: `get`,
    };

    if (accessToken) {
      o.headers = {
        Authorization: `Bearer ${accessToken}`,
      };
    }

    return o;
  };
  const options = getOptions();
  const response = await fetch(url, options);
  const data = await response.json();

  return data.length;
}
