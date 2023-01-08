const mongoose = require('mongoose');


const grnLineItemSchema = new mongoose.Schema({
    productName: {
        type : String,
        required : true
    },
    quantity: {
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

module.exports = mongoose.model('grnLineItem', grnLineItemSchema)