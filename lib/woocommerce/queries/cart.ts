import { cartContentFragment, customerContentFragment } from '../fragments/cart';

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
