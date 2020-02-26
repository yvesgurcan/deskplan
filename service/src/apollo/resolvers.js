import { getItems, createItems } from './items';

export default {
    Query: {
        items: getItems
    },
    Mutation: {
        createItems
    }
};
