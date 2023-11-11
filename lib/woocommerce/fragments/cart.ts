export const customerContentFragment = /* GraphQL */ `
  fragment customerContent on Customer {
    id
    sessionToken
    shipping {
      postcode
      state
      city
      country
    }
  }
`;

export const productContentSliceFragment = /* GraphQL */ `
  fragment productContentSlice on Product {
    id
    databaseId
    name
    slug
    type
    image {
      id
      sourceUrl(size: WOOCOMMERCE_THUMBNAIL)
      altText
    }
    ... on SimpleProduct {
      price
      regularPrice
      soldIndividually
    }
    ... on VariableProduct {
      price
      regularPrice
      soldIndividually
    }
  }
`;

export const productVariationContentSliceFragment = /* GraphQL */ `
  fragment productVariationContentSlice on ProductVariation {
    id
    databaseId
    name
    slug
    image {
      id
      sourceUrl(size: WOOCOMMERCE_THUMBNAIL)
      altText
    }
    price
    regularPrice
  }
`;

export const cartItemContentFragment = /* GraphQL */ `
  fragment cartItemContent on CartItem {
    key
    product {
      node {
        ...productContentSlice
      }
    }
    variation {
      node {
        ...productVariationContentSlice
      }
    }
    quantity
    total
    subtotal
    subtotalTax
    extraData {
      key
      value
    }
  }
  ${productContentSliceFragment}
  ${productVariationContentSliceFragment}
`;

export const cartContentFragment = /* GraphQL */ `
  fragment cartContent on Cart {
    contents(first: 100) {
      itemCount
      nodes {
        ...cartItemContent
      }
    }
    appliedCoupons {
      code
      discountAmount
      discountTax
    }
    needsShippingAddress
    availableShippingMethods {
      packageDetails
      supportsShippingCalculator
      rates {
        id
        instanceId
        methodId
        label
        cost
      }
    }
    subtotal
    subtotalTax
    shippingTax
    shippingTotal
    total
    totalTax
    feeTax
    feeTotal
    discountTax
    discountTotal
  }
  ${cartItemContentFragment}
`;
