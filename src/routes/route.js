const express = require('express');
const router = express.Router();
const bookInfo= require("../models/booksModel")
const booksController= require("../controllers/booksController")

router.get("/test-me", function (req, res) {
    res.send("My first ever api!")
})

router.post("/createBook", booksController.createBookInfo)

router.get("/getBooksData", booksController.getBooksData)

module.exports = router;