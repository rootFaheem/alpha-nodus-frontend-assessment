import { gql } from "@apollo/client";


export const FETCH_LOCATIONS = gql`
    query fetchLocations($tenant: String!) {
        locationList(tenant: $tenant) {
        resources {
            id
            name
            address
        }
        }
    }
`