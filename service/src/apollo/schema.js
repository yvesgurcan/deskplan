import { gql } from 'apollo-server';

const ItemFields = `
    name: String!
    count: Int!
`;

export default gql`
    input ItemInput {
        ${ItemFields}
    }

    input UpdateItemInput {
        id: ID!
        ${ItemFields}
    }

    type Item {
        id: ID
        createdAt: String
        updatedAt: String
        ${ItemFields}
    }

    type Query {
        items: [Item]
    }

    type Mutation {
        createItems(items: [ItemInput!]!): [Item]
        updateItems(items: [UpdateItemInput!]!): [Item]
        deleteItems(itemIds: [ID!]!): [String]
    }
`;
