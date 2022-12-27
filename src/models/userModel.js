const mongoose = require('mongoose');

const userSchema = new mongoose.Schema( {
    firstName: String,
    lastName: String,
    mobile: {
        type: Number,
        required: true
    },
    email:{
        type : String,
        required : true,
        unique : true
    },
    password: {
        type : String,
        required : true
    },
    gender: {
        type: String,
        enum: ["male", "female", "other"]
    },
    age: Number,
    isDeleted : {
        type : Boolean,
        default : false
    }
}, { timestamps: true });

module.exports = mongoose.model('authUser', userSchema)
