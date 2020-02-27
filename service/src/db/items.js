import mongoose from 'mongoose';

const itemSchema = new mongoose.Schema(
    {
        name: String,
        type: String,
        location: String,
        count: Number,
        assignedTo: String,
        orderStatus: String
    },
    {
        timestamps: true,
        versionKey: false
    }
);

itemSchema.virtual('id').get(function() {
    return this._id.toHexString();
});

export default mongoose.model('Item', itemSchema);
