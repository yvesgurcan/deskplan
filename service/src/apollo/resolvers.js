import { getItems, addItem, updateItems, deleteItem } from './items';

export default {
    Query: {
        items: getItems
    },
    Mutation: {
        addItem,
        updateItems,
        deleteItem
    }
};
