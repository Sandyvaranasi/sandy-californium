
const booksModel = require("../models/booksModel");

const createBookInfo= async function (req, res) {
    let data= req.body
    let savedData= await booksModel.create(data)
    res.send({msg: savedData})
}

const getBooksData= async function (req, res) {
    let allBooks= await booksModel.find()
    res.send({msg: allBooks})
}

module.exports.createBookInfo= createBookInfo;
module.exports.getBooksData= getBooksData;