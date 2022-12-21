const authorModel = require("../models/authorModel")
const bookModel = require("../models/bookModel")
const publisherModel = require("../models/publisher")
const objectId = require("objectid")

//============================================================================
const createAuthor = async function (req, res) {
    let data = req.body
    let authorCreated = await authorModel.create(data);
    res.send({ data: authorCreated });
}
//============================================================================
const createPublisher = async function (req, res) {
    let data = req.body
    let publisherCreated = await publisherModel.create(data);
    res.send({ data: publisherCreated });
}
//=========================================================================================
const createBook = async function (req, res) {
    if (!(req.body.author && req.body.publisher)) {
        return res.send("author/publisher is required");
    } else if (!(objectId.isValid(req.body.author) && objectId.isValid(req.body.publisher))) {
        return res.send("author/publisher is not present");
    } else {
        let bookCreated = await bookModel.create(req.body);
        res.send({ msg: bookCreated });
    }
}
//===========================================================================================
const getBooksWithAuthorDetails = async function (req, res) {
    let specificBook = await bookModel.find().populate('author').populate('publisher');
    res.send({ data: specificBook });

}
//============================================================================
const updateCover = async function (req, res) {
    let updatedBooks = await bookModel.updateMany(
        { "publisher": { $in: ["63a3036a57d3e2cac3a80a0b", "63a31811f9b0d386e3155f6f"] } },
        { isHardCover: true },
        { new: true }
    );
    res.send({ msg: updatedBooks });
}
//============================================================================
const getAuthor = async function (req, res) {

    let a = await authorModel.find({ ratings: { $gt: 3.5 } })
    let c = [];
    for (let i = 0; i < a.length; i++) {
        let b = await bookModel.updateMany({ author: a[i]._id }, { $inc: { price: 10 } }, { new: true });
        c.push(b);
    }
    res.send(c);
}
//============================================================================
module.exports.createAuthor = createAuthor;
module.exports.createPublisher = createPublisher;
module.exports.createBook = createBook;
module.exports.getBooksWithAuthorDetails = getBooksWithAuthorDetails;
module.exports.updateCover = updateCover;
module.exports.getAuthor = getAuthor;