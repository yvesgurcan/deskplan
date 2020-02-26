import mongoose from 'mongoose';

const itemSchema = new mongoose.Schema(
    {
        name: String,
        count: Number
    },
    { timestamps: true }
);

itemSchema.virtual('id').get(function() {
    return this._id.toHexString();
});

itemSchema.virtual('version').get(function() {
    return this.__v;
});

export default mongoose.model('Item', itemSchema);
