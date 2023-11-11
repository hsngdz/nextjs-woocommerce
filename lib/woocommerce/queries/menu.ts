import { menuContentFragment } from '../fragments/menu';

export const getMenuQuery = /* GraphQL */ `
  query getMenu($id: ID!) {
    menu(id: $id, idType: LOCATION) {
      ...menuContent
    }
  }
  ${menuContentFragment}
`;
