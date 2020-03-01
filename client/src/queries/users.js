import { gql } from 'apollo-boost';

export const GET_USER = gql`
    query getUser {
        user {
            firstName
        }
    }
`;
