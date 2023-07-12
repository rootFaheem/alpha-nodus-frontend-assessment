import { gql } from "@apollo/client";

export const FETCH_LOCATIONS = gql`
  query fetchLocations(
    $tenant: String!
    $page: Int
    $limit: Int
    $search: String
  ) {
    locationList(tenant: $tenant, page: $page, limit: $limit, search: $search) {
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
