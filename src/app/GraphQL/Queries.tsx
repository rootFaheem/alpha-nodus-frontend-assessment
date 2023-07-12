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

export const FETCH_LOCATIONS_DETAILS = gql`
  query fetchLocationDetails($locationReadId: String!, $tenant: String!) {
    locationRead(id: $locationReadId, tenant: $tenant) {
      id
      resource {
        address
        alias
        description
        id
        managingOrganization
        name
        npi
        partOf
        status
        tag
        taxId
        tenant
        type
        updatedAt
        telecom {
          rank
          system
          use
          value
        }
      }
    }
  }
`;
