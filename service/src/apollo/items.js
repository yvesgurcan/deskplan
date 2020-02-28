import { connect, close, parseMongooseErrors } from '../db/connection';
import ItemModel from '../db/items';

export async function getItems() {
    connect();
    const result = await ItemModel.find();
    close();
    return result;
}

export async function addItem(_, item) {
    connect();
    try {
        const result = await ItemModel.create(item);
        return result;
    } catch (error) {
        parseMongooseErrors(error);
    }
    close();
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

export async function deleteItem(_, { id }) {
    connect();
    const result = await ItemModel.findOneAndRemove(id);
    close();
    const { _id } = result;
    return _id;
}
