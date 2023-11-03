import imageFragment from './image';
import seoFragment from './seo';

const productFragment = /* GraphQL */ `
  fragment product on Product {
    id
    idType
    slug
    purchasable
    name
    description
    attributes {
      nodes {
        id
        name
        label
        options
      }
    }
    ... on VariableProduct {
      variations(first: 50) {
        nodes {
          id
          name
          price
          purchasable
          rawPrice: price(format: RAW)
          attributes {
            nodes {
              name
              label
              value
            }
          }
        }
    }
    featuredImage {
      node {
        ...image
      }
    }
    galleryImages(first: 20) {
      edges {
        node {
          ...image
        }
      }
    }
    seo {
      ...seo
    }
    productTags {
      edges {
        node {
          name
        }
      }
    }
    modified
  }
  ${imageFragment}
  ${seoFragment}
`;

export default productFragment;
