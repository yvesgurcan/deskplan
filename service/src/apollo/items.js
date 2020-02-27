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

export async function updateItems(_, { items }) {
    connect();
    let result = [];
    for (let i = 0; i < items.length; i++) {
        const item = items[i];
        const { id, ...updatedFields } = item;
        const r = await ItemModel.findByIdAndUpdate(id, updatedFields);
        result.push(r);
    }
    close();
    return result;
}

export async function deleteItems(_, { itemIds }) {
    connect();
    console.log({ itemIds });
    const result = await ItemModel.deleteMany(itemIds);
    close();
    return result;
}
