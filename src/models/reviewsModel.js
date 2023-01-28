const mongoose = require('mongoose');


const reviewsSchema = new mongoose.Schema({

        bookId: {
            type : mongoose.Schema.Types.ObjectId,
            required :true,
            ref : "bookfour"
        },
        reviewedBy: {
            type : String,
            required:true,
            default : 'Guest',
            trim : true,
            lowercase : true
        },
        reviewedAt: {
            type : Date,
            required:true
        },
        rating: {
            type : Number,
             minlength : 1,
              maxlength : 5,
              required:true
            },
        review: String,
        isDeleted: {
            type : Boolean,
             default: false
            },
}
)

module.exports = mongoose.model('reviewfour',reviewsSchema)