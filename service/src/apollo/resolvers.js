import { getItems, createItems, updateItems, deleteItems } from './items';

export default {
    Query: {
        items: getItems
    },
    Mutation: {
        createItems,
        updateItems,
        deleteItems
    }
};
