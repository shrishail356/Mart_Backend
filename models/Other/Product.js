const mongoose = require("mongoose");

const ProductSchema = new mongoose.Schema({
    productTitle: {
        type: String,
        required: true,
    },
    productDescription: {
        type: String,
        required: true,
    },
    imageUrl: {
        type: String,
        required: true,
    },
    price: {
        type: Number,
        required: true,
    },
    discount: {
        type: Number,
        min: 0,
        max: 100,
        default: 0,
    },
    weight: {
        type: Number,
    },
    stockQuantity: {
        type: Number,
        default: 0,
    },
    expiryDate: {
        type: Date,
    },
}, { timestamps: true });

module.exports = mongoose.model("Product", ProductSchema);
