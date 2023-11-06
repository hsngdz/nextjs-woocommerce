import { gql } from '@apollo/client';

import {
  cartContentFragment,
  cartItemContentFragment,
  customerContentFragment
} from '../fragments/cart';

export const addToCartMutation = gql`
  mutation addToCart($productId: Int!, $variationId: Int, $quantity: Int, $extraData: String) {
    addToCart(
      input: {
        productId: $productId
        variationId: $variationId
        quantity: $quantity
        extraData: $extraData
      }
    ) {
      cart {
        ...cartContent
      }
      cartItem {
        ...cartItemContent
      }
    }
  }
  ${cartContentFragment}
  ${cartItemContentFragment}
`;

export const updateCartItemQuantitiesMutation = gql`
  mutation updateCartItemQuantities($items: [CartItemQuantityInput]) {
    updateItemQuantities(input: { items: $items }) {
      cart {
        ...cartContent
      }
      items {
        ...cartItemContent
      }
    }
  }
  ${cartContentFragment}
  ${cartItemContentFragment}
`;

export const removeItemsFromCartMutation = gql`
  mutation removeItemsFromCart($keys: [ID], $all: Boolean) {
    removeItemsFromCart(input: { keys: $keys, all: $all }) {
      cart {
        ...cartContent
      }
      cartItems {
        ...cartItemContent
      }
    }
  }
  ${cartContentFragment}
  ${cartItemContentFragment}
`;

export const applyCouponToCartMutation = gql`
  mutation applyCouponToCart($code: String!) {
    applyCoupon(input: { code: $code }) {
      cart {
        ...cartContent
      }
    }
  }
  ${cartContentFragment}
`;

export const removeCouponFromCartMutation = gql`
  mutation removeCouponFromCart($code: String!) {
    removeCoupons(input: { codes: [$code] }) {
      cart {
        ...cartContent
      }
    }
  }
  ${cartContentFragment}
`;

export const removeCouponsFromCartMutation = gql`
  mutation removeCouponsFromCart($codes: [String!]) {
    removeCoupons(input: { codes: $codes }) {
      cart {
        ...cartContent
      }
    }
  }
  ${cartContentFragment}
`;

export const setShippingLocaleMutation = gql`
  mutation setShippingLocale(
    $zip: String!
    $state: String
    $city: String
    $country: CountriesEnum
  ) {
    updateCustomer(
      input: { shipping: { postcode: $zip, country: $country, state: $state, city: $city } }
    ) {
      customer {
        ...customerContent
      }
    }
  }
  ${customerContentFragment}
`;

export const setShippingMethodMutation = gql`
  mutation setShippingMethod($shippingMethod: String!) {
    updateShippingMethod(input: { shippingMethods: [$shippingMethod] }) {
      cart {
        ...cartContent
      }
    }
  }
  ${cartContentFragment}
`;
