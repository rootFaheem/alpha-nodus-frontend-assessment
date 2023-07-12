import { gql } from "@apollo/client";


export const FETCH_LOCATIONS = gql`
query fetchLocations($tenant: String!, $page: Int, $limit: Int) {
    locationList(tenant: $tenant, page: $page, limit: $limit) {  
        resources {
            id
            name
            status
            address
            type
            updatedAt
        }
        }
    }
`