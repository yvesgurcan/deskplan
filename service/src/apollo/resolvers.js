import { getUser } from './users';
import {
    getItems,
    addItem,
    addStarterItems,
    updateItem,
    deleteItem
} from './items';

export default {
    Query: {
        user: getUser,
        items: getItems
    },
    Mutation: {
        addItem,
        addStarterItems,
        updateItem,
        deleteItem
    }
};
