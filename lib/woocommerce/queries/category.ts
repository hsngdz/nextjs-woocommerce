import { categoryFragment } from '../fragments/category';
import { productFragment } from '../fragments/product';

export const getCategoryQuery = /* GraphQL */ `
  query getCategory($id: ID!) {
    productCategory(id: $id, idType: SLUG) {
      ...category
    }
  }
  ${categoryFragment}
`;

export const getCategoriesQuery = /* GraphQL */ `
  query getCategories {
    productCategories(first: 100, where: { orderby: NAME }) {
      edges {
        node {
          ...category
        }
      }
    }
  }
  ${categoryFragment}
`;

export const getCategoryProductsQuery = /* GraphQL */ `
  query getCategoryProducts($slugIn: [String!], $sortKey: ProductsOrderByEnum, $order: OrderEnum) {
    products(first: 100, where: { slugIn: $slugIn, orderby: { field: $sortKey, order: $order } }) {
      edges {
        node {
          ...product
        }
      }
    }
  }
  ${productFragment}
`;
