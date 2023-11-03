const imageFragment = /* GraphQL */ `
  fragment image on Image {
    mediaItemUrl
    altText
    mediaDetails {
      width
      height
    }
  }
`;

export default imageFragment;
