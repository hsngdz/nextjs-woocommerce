import { gql } from '@apollo/client';

import { productContentFullFragment, variationContentFragment } from '../fragments/product';

export const getProductQuery = gql`
  query getProduct($id: ID!, $idType: ProductIdTypeEnum) {
    product(id: $id, idType: $idType) {
      ...productContentFull
    }
  }
  ${productContentFullFragment}
`;

export const getProductVariationQuery = gql`
  query getProductVariation($id: ID!) {
    productVariation(id: $id, idType: DATABASE_ID) {
      ...variationContent
    }
  }
  ${variationContentFragment}
`;
