const mongoose = require('mongoose');
const { Schema } = mongoose;

const productSchema = new Schema(
    {
        title: {
            type: String,
            required: true,
        },
        ownerID: {
            type: String,
            required: true,
        },
        description: {
            type: String,
            required: false,
        },
        category: {
            type: String,
            required: true,
        },
        price: {
            type: Number,
            required: true,
        }
    }
);

module.exports = mongoose.model('Product', productSchema)