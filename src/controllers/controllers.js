
const blogChainModel = require("../models/blogChain");

//======================================GET COIN DETAILS========================================================

const coinDetails = async function (req, res) {
  try {
    let coins = await blogChainModel.find().select({_id:0,isDeleted:0,__v:0})
    let coin = coins.map(x=> x.toObject())   // changing db object to general object to apply js object operations.
    let sortedCoins = coin.sort((a,b)=> b.changePercent24Hr - a.changePercent24Hr) // Sorting in decreasing order.
    for(let i=0;i<sortedCoins.length;i++){
      sortedCoins[i].rank = i+1  // adding rank manually.
    }
    res.status(200).send({data : sortedCoins})
  } catch (error) {
    return res.status(500).send({ status: false, message: error.message });
  }
};
//===================================================================================================

module.exports.coinDetails = coinDetails;






















//==============================CREATE COIN=================================================

// const createCoin = async function (req, res) {
//   try {
//     let data = req.body;
//     let newData = await blogChainModel.create(data);
//     res.send(newData)
//   } catch (error) {
//     return res.status(500).send({ status: false, message: error.message });
//   }
// };
// module.exports.createCoin = createCoin;
