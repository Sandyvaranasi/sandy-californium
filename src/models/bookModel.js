const mongoose = require('mongoose');

const bookSchema = new mongoose.Schema({
    bookName: {
        type: String,
        required: true,
        unique : true
    },
    prices: {
        indianPrice:String,
        europeanPrice: String,
    },
    year: {
        type: Number,
        default: 2021
    },
    tags: [ String ],
    author: String,
    pages: Number,
    stockAvailable: Boolean,

}, { timestamps: true });

module.exports = mongoose.model('Books', bookSchema);

