import mongoose from 'mongoose';

export function connect() {
    mongoose.connect('mongodb://localhost:27017/deskplan', {
        useNewUrlParser: true,
        useUnifiedTopology: true
    });
    // mongoose.connection.db.dropDatabase();
}

export function close(result) {
    mongoose.connection.close();
    return result;
}
