import { gql } from "@apollo/client";

export const FETCH_LOCATIONS = gql`
  query fetchLocations(
    $tenant: String!
    $page: Int
    $limit: Int
    $search: String
    $order: Order13
  ) {
    locationList(
      tenant: $tenant
      page: $page
      limit: $limit
      search: $search
      order: $order
    ) {
      resources {
        id
        name
        status
        address
        type
        updatedAt
      }
      pages
    }
  }
`;
