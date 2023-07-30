const mongoose = require('mongoose');
const { Schema } = mongoose;

const categorySchema = new Schema(
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
        }
    }
);

module.exports = mongoose.model('Category', categorySchema)