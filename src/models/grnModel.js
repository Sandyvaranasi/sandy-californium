const mongoose = require('mongoose');


const grnSchema = new mongoose.Schema({
    vendorName: {
        type: String,
        required: true
    },
    vendorFullAddress: {
        type: String,
        required: true
    },
    status: {
        type: String,
        enum: ["GENERATED", "COMPLETED", "CANCELLED"],
        default : "GENERATED"
    },
    invoiceNumber: {
        type: String,
        required: true
    },
    grnLineItems: {
        type : mongoose.Schema.Types.ObjectId,
        ref : 'grnLineItem'
    },
    isDeleted : {
    type: Boolean,
    default: false
    }
}, { timestamps: true }
)

module.exports = mongoose.model('grn', grnSchema)