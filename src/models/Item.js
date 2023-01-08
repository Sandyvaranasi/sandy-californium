const mongoose = require('mongoose');


const itemSchema = new mongoose.Schema({
    productName: {
        type : String,
        required : true,
        unique : true
    },
    quantity: {
        type: Number,
        required: true
    },
    sellPrice: {
        type: Number,
        required: true
    },
    stockPrice: {
        type: Number,
        required: true
    },
    isDeleted : {
    type: Boolean,
    default: false
    }
}, { timestamps: true }
)

module.exports = mongoose.model('item', itemSchema)