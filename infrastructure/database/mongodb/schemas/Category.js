const mongoose = require('mongoose');
const { Schema } = mongoose;

const categorySchema = new Schema(
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
        }
    }
);

module.exports = mongoose.model('Category', categorySchema)