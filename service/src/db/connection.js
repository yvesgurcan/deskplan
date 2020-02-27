import mongoose from 'mongoose';
import updateVersioningPlugin from 'mongoose-update-versioning';

// use the findAndModify() function from MongoDB under the hood instead of the findOneAndUpdate() function from Mongoose;
mongoose.set('useFindAndModify', true);
mongoose.plugin(updateVersioningPlugin);

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
