const mongoose = require('mongoose');
const { Schema } = mongoose;

const productSchema = new Schema(
    {
        title: {
            type: String,
            required: true,
        },
        owner: {
            type: { type: mongoose.Types.ObjectId, ref: "Owner" },
            required: true,
        },
        description: {
            type: String,
            required: false,
        },
        category: {
            type: { type: mongoose.Types.ObjectId, ref: "Category" },
            required: true,
        },
        price: {
            type: Number,
            required: true,
        }
    }
);

module.exports = mongoose.model('Product', productSchema)