import React from "react";

const Post = ({ data }) => {
  return <div>{JSON.stringify(data, null, 2)}</div>;
};

export default Post;

export const postQuery = graphql`
  query($slug: String) {
    wordpressPost(slug: { eq: $slug }) {
      content
      title
    }
  }
`;
