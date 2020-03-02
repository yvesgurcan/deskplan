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
        items(sortBy: String!, sortOrderModifier: Int!, offset: Int!, limit: Int!): [Item]
        user: User
    }

    type Mutation {
        addStarterItems: [Item]
        addItem(${ItemFields}): Item
        updateItem(id: ID!, ${ItemFields}): Item
        deleteItem(id: ID!): ID
    }
`;
