const mongoose = require('mongoose');

const bookSchema = new mongoose.Schema( {
    bookName: {
        type : String,
         required: true,
          unique : true
        },
    authorName: String,
    bookCategory: {
        type : String,
         required : true
        },
    publishedIn : Number,
    bookPrice : String,
    ratings : String
}, { timestamps: true });

module.exports = mongoose.model('Book', bookSchema)


