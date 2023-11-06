import { gql } from '@apollo/client';

import { CartContent, CartItemContent, CustomerContent } from '../fragments/cart';

export const AddToCart = gql`
  mutation AddToCart($productId: Int!, $variationId: Int, $quantity: Int, $extraData: String) {
    addToCart(
      input: {
        productId: $productId
        variationId: $variationId
        quantity: $quantity
        extraData: $extraData
      }
    ) {
      cart {
        ...CartContent
      }
      cartItem {
        ...CartItemContent
      }
    }
  }
  ${CartContent}
  ${CartItemContent}
`;

export const UpdateCartItemQuantities = gql`
  mutation UpdateCartItemQuantities($items: [CartItemQuantityInput]) {
    updateItemQuantities(input: { items: $items }) {
      cart {
        ...CartContent
      }
      items {
        ...CartItemContent
      }
    }
  }
  ${CartContent}
  ${CartItemContent}
`;

export const RemoveItemsFromCart = gql`
  mutation RemoveItemsFromCart($keys: [ID], $all: Boolean) {
    removeItemsFromCart(input: { keys: $keys, all: $all }) {
      cart {
        ...CartContent
      }
      cartItems {
        ...CartItemContent
      }
    }
  }
  ${CartContent}
  ${CartItemContent}
`;

export const ApplyCouponToCart = gql`
  mutation ApplyCouponToCart($code: String!) {
    applyCoupon(input: { code: $code }) {
      cart {
        ...CartContent
      }
    }
  }
  ${CartContent}
`;

export const RemoveCouponFromCart = gql`
  mutation RemoveCouponFromCart($code: String!) {
    removeCoupons(input: { codes: [$code] }) {
      cart {
        ...CartContent
      }
    }
  }
  ${CartContent}
`;

export const RemoveCouponsFromCart = gql`
  mutation RemoveCouponsFromCart($codes: [String!]) {
    removeCoupons(input: { codes: $codes }) {
      cart {
        ...CartContent
      }
    }
  }
  ${CartContent}
`;

export const SetShippingLocale = gql`
  mutation SetShippingLocale(
    $zip: String!
    $state: String
    $city: String
    $country: CountriesEnum
  ) {
    updateCustomer(
      input: { shipping: { postcode: $zip, country: $country, state: $state, city: $city } }
    ) {
      customer {
        ...CustomerContent
      }
    }
  }
  ${CustomerContent}
`;

export const SetShippingMethod = gql`
  mutation SetShippingMethod($shippingMethod: String!) {
    updateShippingMethod(input: { shippingMethods: [$shippingMethod] }) {
      cart {
        ...CartContent
      }
    }
  }
  ${CartContent}
`;
