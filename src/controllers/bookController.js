const bookModel = require("../models/bookModel")
//====================================================================================
const createBook = async function (req, res) {
    let data = req.body
    let savedBooks = await bookModel.create(data)
    res.send({ msg: savedBooks })
}
//====================================================================================
const getBooksData = async function (req, res) {
    let allBooks = await bookModel.find().select({ bookName: 1, author: 1, _id: 0 })
    res.send({ msg: allBooks })
}
//====================================================================================
const getBooksInYear = async function (req, res) {
    let clientYear = req.body.year
    let booksInYear = await bookModel.find({ year: { $eq: clientYear } })
   res.send({ msg: booksInYear })
}

//====================================================================================
const postByData = async function(req , res){
    const clientData = req.body
    let showBook = await bookModel.find(clientData)
    res.send({msg : showBook})
}
//=======================================================================================

const getXINRBooks = async function (req, res) {
    let INRbooks = await bookModel.find({"prices.indianPrice" : {$in :["300INR","1500INR"]}})
    res.send(INRbooks)
}
//====================================================================================

const getRandomBooks = async function (req, res) {
    let randomBooks = await bookModel.find({ $or: [{ stockAvailable: { $eq: true } }, { pages: { $lt: 500 } }] })
    res.send(randomBooks)
}
//====================================================================================
module.exports.createBook = createBook
module.exports.getBooksData = getBooksData
module.exports.getBooksInYear = getBooksInYear
module.exports.postByData = postByData
module.exports.getXINRBooks = getXINRBooks
module.exports.getRandomBooks = getRandomBooks