import { connect, close } from '../db/connection';
import ItemModel from '../db/items';

export async function getItems() {
    connect();
    const result = await ItemModel.find();
    close();
    return result;
}

export async function createItems(_, { items }) {
    connect();
    const result = await ItemModel.insertMany(items);
    close();
    return result;
}
