const mongoose = require("mongoose");

const blogChainSchema = new mongoose.Schema({
    id : mongoose.Schema.Types.Mixed,
      rank : String,
      symbol: {
        type : String,
        unique : true
    },
      name: {
        type : String,
        unique : true
    },
      supply : String,
      maxSupply: String,
      marketCapUsd: String,
      volumeUsd24Hr: String,
      priceUsd: String,
      changePercent24Hr: String,
      vwap24Hr: String,
    isDeleted :{
        type : Boolean,
        default:false
    }
})

module.exports = mongoose.model("blogChain", blogChainSchema)