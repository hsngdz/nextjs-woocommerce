import { gql } from '@apollo/client';

import { cartContentFragment, customerContentFragment } from '../fragments/cart';

export const getCartDocument = gql`
  query {
    customer {
      sessionToken
    }
  }
`;

export const getCartQuery = /* GraphQL */ `
  query getCart($customerId: Int) {
    cart {
      ...cartContent
    }
    customer(customerId: $customerId) {
      ...customerContent
    }
  }
  ${cartContentFragment}
  ${customerContentFragment}
`;
