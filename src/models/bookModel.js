const mongoose = require('mongoose');

const bookSchema = new mongoose.Schema({
  title: {
    type : String,
    required:true,
    unique : true,
    lowercase : true,
    trim : true
  },
  excerpt: {
    type : String,
    required:true
  }, 
  userId: {
    type : mongoose.Schema.Types.ObjectId,
    required :true,
    ref : 'userfour'
  },
  ISBN: {
    type : String,
    required:true,
    unique : true
  },
  category: {
    type : String,
    required:true,
    lowercase:true,
    trim : true
  },
  subcategory: {
    type : String,
    required:true,
    lowercase:true,
    trim : true
  },
  reviews: {
    type : Number,
     default: 0
    },
  deletedAt: Date, 
  isDeleted: {
    type : Boolean,
     default: false
    },
  releasedAt: {
    type : Date,
    required : true
  }
},{timestamps:true}
)

module.exports = mongoose.model('bookfour',bookSchema)