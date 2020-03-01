import { gql } from 'apollo-boost';

export const ITEM_FIELDS = `
    id
    createdAt
    updatedAt
    name
    quantity
`;

export const GET_ITEMS = gql`
    query getItems {
        items {
            ${ITEM_FIELDS}
        }
    }
`;

export const ADD_ITEM = gql`
    mutation addItem($name: String!, $quantity: Int) {
        addItem(name: $name, quantity: $quantity) {
            ${ITEM_FIELDS}
        }
    }
`;

export const ADD_STARTER_ITEMS = gql`
    mutation addStarterItems {
        addStarterItems {
            ${ITEM_FIELDS}
        }
    }
`;

export const UPDATE_ITEM = gql`
    mutation updateItem($id: ID!, $name: String!, $quantity: Int) {
        updateItem(id: $id, name: $name, quantity: $quantity) {
            id
            ${ITEM_FIELDS}
        }
    }
`;

export const DELETE_ITEM = gql`
    mutation deleteItem($id: ID!) {
        deleteItem(id: $id)
    }
`;
