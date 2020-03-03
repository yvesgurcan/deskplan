import mongoose from 'mongoose';

const itemSchema = new mongoose.Schema(
    {
        name: { type: String, required: [true, 'Item name is required'] },
        quantity: {
            type: Number,
            required: [true, 'Quantity is required.'],
            integer: true
        },
        link: String
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
