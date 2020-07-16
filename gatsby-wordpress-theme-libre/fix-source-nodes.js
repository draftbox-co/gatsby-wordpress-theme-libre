const { createRemoteFileNode } = require(`gatsby-source-filesystem`);
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

module.exports = async function sourceNodes({
  actions,
  getNodesByType,
  getNodes,
  store,
  cache,
  createNodeId,
  createContentDigest,
  getCache,
  reporter,
}) {
  const { createNode } = actions;

  const wordPressTag = getNodesByType("wordpress__TAG");

  const wordPressTagExists =
    wordPressTag &&
    wordPressTag.length > 0 &&
    wordPressTag[0].internal &&
    wordPressTag[0].internal.owner === "gatsby-source-wordpress";

  if (!wordPressTagExists) {
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

  const wordpressMedia = getNodesByType("wordpress__wp_media");

  const mediaExists =
    wordpressMedia &&
    wordpressMedia.length > 0 &&
    wordpressMedia[0].internal &&
    wordpressMedia[0].internal.owner === "gatsby-source-wordpress";

  if (!mediaExists) {
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
