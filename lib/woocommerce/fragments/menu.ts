const menuItemContentFragment = /* GraphQL */ `
  fragment menuItemContent on MenuItem {
    id
    uri
    title
    label
    cssClasses
  }
`;

const menuItemRecursiveFragment = /* GraphQL */ `
  fragment menuItemRecursive on MenuItem {
    ...menuItemContent
    childItems {
      nodes {
        ...menuItemContent
      }
    }
  }
  ${menuItemContentFragment}
`;

export const menuContentFragment = /* GraphQL */ `
  fragment menuContent on Menu {
    id
    name
    locations
    slug
    menuItems(first: 20, where: { parentId: 0 }) {
      nodes {
        ...menuItemRecursive
      }
    }
  }
  ${menuItemRecursiveFragment}
`;
