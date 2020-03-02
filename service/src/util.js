import { ApolloError } from 'apollo-server';
import mongoose from 'mongoose';

// use the findAndModify() function from MongoDB under the hood instead of the findOneAndUpdate() function from Mongoose;
mongoose.set('useFindAndModify', false);

export async function connect() {
    await mongoose.connect('mongodb://localhost:27017/deskplan', {
        useNewUrlParser: true,
        useUnifiedTopology: true
    });
    // mongoose.connection.db.dropDatabase();
}

export function close(result) {
    mongoose.connection.close();
    return result;
}

export function parseMongooseErrors(error) {
    if (error.errors) {
        const messages = Object.keys(error.errors).map(key => {
            const { message, path } = error.errors[key];
            return { message, path };
        });
        throw new ApolloError('ValidationError', messages);
    }

    if (error) {
        return error;
    }

    return null;
}
