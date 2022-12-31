const mongoose = require('mongoose');

const memeSchema = new mongoose.Schema( {
    memeId : Number,
    memes : mongoose.Schema.Types.Mixed,
    isDeleted : {
        type : Boolean,
        default : false
    }
}, { timestamps: true });

module.exports = mongoose.model('meme', memeSchema)