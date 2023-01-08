const mongoose = require('mongoose');



const orderSchema = new mongoose.Schema({
    customerName: {
        type :String,
        requied : true
    },
    customerFullAddress: {
        type :String,
        requied : true
    },
    status: {
        type: String,
        enum: ["GENERATED", "COMPLETED", "CANCELLED"],
        default : "GENERATED"
    },
    invoiceNumber: {
        type :String,
        requied : true
    },
    orderLineItems: {
        type : mongoose.Schema.Types.ObjectId,
        ref : 'orderLineItem'
    },
    isDeleted: {
        type: Boolean,
        default: false
    }
}, { timestamps: true }
)

module.exports = mongoose.model('order', orderSchema)