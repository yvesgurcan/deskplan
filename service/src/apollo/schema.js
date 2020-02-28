import { gql } from 'apollo-server';

const ItemFields = `
    name: String!
    quantity: Int
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
        addItem(${ItemFields}): Item
        updateItems(items: [UpdateItemInput!]!): [Item]
        deleteItem(id: ID!): ID
    }
`;
