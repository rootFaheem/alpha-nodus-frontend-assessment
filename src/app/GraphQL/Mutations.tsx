import { gql } from "@apollo/client";

export const ADD_NEW_LOCATION = gql`
  mutation LocationCreate($requestBody: LocationWriteInput!, $tenant: String!) {
    locationCreate(requestBody: $requestBody, tenant: $tenant) {
      resourceID
    }
  }
`;

export const REMOVE_LOCATION = gql`
  mutation LocationRemove($locationRemoveId: String!, $tenant: String!) {
    locationRemove(id: $locationRemoveId, tenant: $tenant) {
      resourceID
    }
  }
`;

export const PATCH_LOCATION = gql`
  mutation LocationPatch(
    $locationPatchId: String!
    $requestBody: LocationPatchInput!
    $tenant: String!
  ) {
    locationPatch(
      id: $locationPatchId
      requestBody: $requestBody
      tenant: $tenant
    ) {
      resourceID
    }
  }
`;
