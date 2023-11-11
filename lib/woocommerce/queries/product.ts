import { productFragment } from '../fragments/product';

export const getProductQuery = /* GraphQL */ `
  query getProduct($id: ID!) {
    product(id: $id, idType: SLUG) {
      ...product
    }
  }
  ${productFragment}
`;

export const getProductsQuery = /* GraphQL */ `
query getProducts($sortKey: ProductsOrderByEnum, $order: OrderEnum, $query: String) {
  products(
    first: 100
    where: {orderby: {field: $$sortKey, order: $order}, search: $query}
  ) {
    edges {
      node {
        ...product
      }
    }
  }

}
${productFragment}
`;
