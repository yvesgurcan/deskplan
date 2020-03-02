import {
    getItems,
    addItem,
    addStarterItems,
    updateItem,
    deleteItem
} from './item.controller';

export default {
    Query: {
        items: getItems
    },
    Mutation: {
        addItem,
        addStarterItems,
        updateItem,
        deleteItem
    }
};
