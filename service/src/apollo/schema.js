import { gql } from 'apollo-server';

export default gql`
    input ItemInput {
        name: String!
        count: Int!
    }

    type Item {
        name: String
        count: Int
        id: ID
        version: Int
        createdAt: String
        updatedAt: String
    }

    type Query {
        items: [Item]
    }

    type Mutation {
        createItems(items: [ItemInput!]!): [Item]
    }
`;
