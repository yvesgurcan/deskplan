import { gql } from 'apollo-server';

export default gql`
    type User {
        firstName: String
    }

    type Query {
        user: User
    }
`;
