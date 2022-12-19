const { count } = require("console")
const bookModel = require('../models/bookModel')
const authorModel = require('../models/authorModel')

// book creation
const createBook = async function (req, res) {
    let data = req.body
    let savedData = await bookModel.create(data)
    res.send({ msg: savedData })
}

// author creation
const createAuthor = async function (req, res) {
    let data = req.body
    let savedData = await authorModel.create(data)
    res.send({ msg: savedData })
}

// get book by author id
const getBookById = async function (req, res) {
    let data = req.body;
    let authorId = await authorModel.findOne(data).select({ author_id: 1, _id: 0 });
    let bookById = await bookModel.find(authorId);
    res.send({ books: bookById });
}

// get author name and updated price
const getAuthorName = async function (req, res) {
    let data = req.body;
    let updatedPrice = await bookModel.findOneAndUpdate(data, { $set: { price: 100 }},{new : true} )
    let authorName = await authorModel.findOne({ author_id: { $eq: updatedPrice.author_id } })
    let finalResult = {};
    finalResult.author = authorName.author_name;
    finalResult.changedPrice = updatedPrice.price;
    res.send(finalResult);
}

// find books between 50 and 100
const bookBtwn = async function (req , res) {
    let books = await bookModel.find({ price : { $gte: 50, $lte: 100} })
    let authrs = books.map(x=> x.author_id)
    let xyz = await authorModel.find({author_id : authrs}).select({author_name :1 , _id : 0})
    res.send(xyz)

}




module.exports.createBook = createBook
module.exports.createAuthor = createAuthor
module.exports.getBookById = getBookById
module.exports.getAuthorName = getAuthorName
module.exports.bookBtwn = bookBtwn