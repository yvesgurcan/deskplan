import { gql } from 'apollo-boost';

export const ITEM_FIELDS = `
    id
    createdAt
    updatedAt
    name
    quantity
    link
`;

export const ITEM_FIELDS_INPUT_TYPES = `
    $name: String!,
    $quantity: Int,
    $link: String
`;

export const ITEM_FIELDS_INPUT = `
    name: $name,
    quantity: $quantity,
    link: $link
`;

export const GET_ITEMS = gql`
    query getItems {
        items {
            ${ITEM_FIELDS}
        }
    }
`;

export const ADD_ITEM = gql`
    mutation addItem(${ITEM_FIELDS_INPUT_TYPES}) {
        addItem(${ITEM_FIELDS_INPUT}) {
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
    mutation updateItem($id: ID!, ${ITEM_FIELDS_INPUT_TYPES}) {
        updateItem(id: $id, ${ITEM_FIELDS_INPUT}) {
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
