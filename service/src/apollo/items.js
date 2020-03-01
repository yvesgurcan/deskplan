import { connect, close, parseMongooseErrors } from '../db/connection';
import ItemModel from '../db/items';

export async function getItems(_, parameters) {
    const {
        sortBy = 'updatedAt',
        sortModifier = 1,
        offset = 0,
        limit = 0
    } = parameters;
    connect();
    try {
        const result = await ItemModel.find()
            .sort({ [sortBy]: sortModifier })
            .skip(offset * limit)
            .limit(limit);
        close();
        return result;
    } catch (error) {
        parseMongooseErrors(error);
    }
}

export async function addItem(_, item) {
    connect();
    try {
        const result = await ItemModel.create(item);
        close();
        return result;
    } catch (error) {
        parseMongooseErrors(error);
    }
}

export async function updateItem(_, item) {
    connect();
    try {
        const { id, ...updatedFields } = item;
        const result = await ItemModel.findByIdAndUpdate(id, updatedFields, {
            new: true,
            runValidators: true
        });
        close();
        return result;
    } catch (error) {
        parseMongooseErrors(error);
    }
}

export async function deleteItem(_, { id }) {
    connect();
    const result = await ItemModel.findOneAndRemove({ _id: id });
    close();
    const { _id } = result;
    return _id;
}

export async function addStarterItems() {
    const TEMPLATE_ITEMS = [
        {
            name: 'Keyboard',
            quantity: 41
        },
        {
            name: 'Mouse',
            quantity: 63
        },
        {
            name: 'Chair',
            quantity: 22
        },
        {
            name: 'Monitor',
            quantity: 23
        },
        {
            name: 'Standing desk',
            quantity: 16
        },
        {
            name: 'Copies of Eloquent JavaScript',
            quantity: 4
        },
        {
            name: 'Espresso machine',
            quantity: 2
        },
        {
            name: 'Yoga ball',
            quantity: 8
        },
        {
            name: 'Fork',
            quantity: 30
        },
        {
            name: 'Knife',
            quantity: 29
        },
        {
            name: 'Spoon',
            quantity: 34
        },
        {
            name: 'Fan',
            quantity: 8
        },
        {
            name: 'Water cooler',
            quantity: 2
        },
        {
            name: 'Printer',
            quantity: 3
        },
        {
            name: '5lb coffee bags',
            quantity: 2
        },
        {
            name: 'Water glasses',
            quantity: 16
        },
        {
            name: 'TV monitor',
            quantity: 3
        }
    ];

    try {
        connect();
        const result = await ItemModel.create(TEMPLATE_ITEMS);
        close();
        return result;
    } catch (error) {
        parseMongooseErrors(error);
    }
}
