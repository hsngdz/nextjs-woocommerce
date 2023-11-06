import { gql } from '@apollo/client';

import { cartContentFragment, customerContentFragment } from '../fragments/cart';

export const getCartQuery = gql`
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
