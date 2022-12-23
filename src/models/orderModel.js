const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema( {
	
	userId: {
        type : mongoose.Schema.Types.ObjectId,
        ref : "newUser"
    },
	productId: {
        type : mongoose.Schema.Types.ObjectId,
        ref : "newProduct"
    },
	amount: {
        type : Number,
    default : 0
},
	isFreeAppUser: Boolean, 
	date: String
}, { timestamps: true });


module.exports = mongoose.model('newOrder', orderSchema)